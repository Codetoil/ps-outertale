import assets from '../assets';
import { OutertaleLayerKey } from '../classes';
import content from '../content';
import { events, game, random, renderer, timer } from '../core';
import {
   CosmosAnimation,
   CosmosAnimationProperties,
   CosmosDaemon,
   CosmosDefined,
   CosmosFace,
   CosmosHitbox,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRay,
   CosmosRectangle,
   CosmosSizedObjectProperties,
   CosmosSprite,
   CosmosSpriteProperties,
   CosmosUtils
} from '../engine';
import { battler, shake, sineWaver } from '../mantle';
import save from '../save';
import { voices } from './bootstrap';

export function starGenerator (radius: number, extent: number, spokes: number, angle: number, offset = 0) {
   const phase = ((angle % 360) + 360) % 360;
   const segments = spokes * 2;
   const segmentDiv = 360 / segments;
   const segment = Math.floor(phase / segmentDiv);
   const segmentAngle = offset - 90 + segment * segmentDiv;
   const segmentStart = new CosmosPoint().endpoint(segmentAngle, radius + (segment % 2 === 0 ? extent : 0));
   const segmentEnd = new CosmosPoint().endpoint(segmentAngle + segmentDiv, radius + (segment % 2 === 0 ? 0 : extent));
   const segmentPhase = (phase % segmentDiv) / segmentDiv;
   return new CosmosPoint(
      CosmosMath.remap(segmentPhase, segmentStart.x, segmentEnd.x),
      CosmosMath.remap(segmentPhase, segmentStart.y, segmentEnd.y)
   );
}

function bulletFactory (
   daemon: CosmosDaemon | null,
   hitboxProperties:
      | {
           [x in Exclude<
              keyof CosmosDefined<CosmosSizedObjectProperties>,
              'objects'
           >]?: CosmosDefined<CosmosSizedObjectProperties>[x];
        }
      | void,
   spriteProperties: Exclude<CosmosSpriteProperties | CosmosAnimationProperties, void>,
   ticker = (self: CosmosHitbox) => {}
): (
   properties: CosmosSizedObjectProperties &
      Partial<{
         color: 'orange' | 'blue' | 'white' | 'green';
         damage: number;
         detach: string | null;
         type: 0 | 1 | 2 | 3;
      }> & {
         autoAttach?: boolean;
         autoDetach?: boolean;
         autoEnable?: boolean;
         handler?: (bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>;
         layer?: OutertaleLayerKey;
         sound?: boolean;
      }
) => CosmosHitbox {
   let played = false;
   return (properties = {}) => {
      const {
         autoAttach = true,
         autoDetach = true,
         autoEnable = true,
         handler = async () => {},
         layer = 'menu',
         sound = false
      } = properties;
      const sprite =
         'resources' in spriteProperties ? new CosmosAnimation(spriteProperties) : new CosmosSprite(spriteProperties);
      const bullet = new CosmosHitbox(Object.assign(hitboxProperties!, { objects: [ sprite ] }, properties)).on(
         'tick',
         function () {
            ticker(this);
         }
      );
      autoAttach && renderer.attach(layer, bullet);
      autoEnable && sprite.enable();
      if (!played) {
         sound && daemon?.instance(timer);
         played = true;
         renderer.on('tick').then(() => {
            played = false;
         });
      }
      handler(bullet, sprite).then(() => {
         autoDetach && renderer.detach(layer, bullet);
      });
      return bullet;
   };
}

export const legacy = {
   bullets: {
      firebol: bulletFactory(
         assets.sounds.noise,
         { anchor: { x: 0, y: 1 }, size: { x: 13, y: -13 } },
         {
            anchor: 0,
            duration: 5,
            resources: content.ibbFirebol
         }
      ),
      octagon: bulletFactory(null, { anchor: 0, size: { x: 4, y: 4 } }, { anchor: 0, frames: [ content.ibbOctagon ] }),
      literalBullet: bulletFactory(
         null,
         { anchor: 0, size: { x: 15, y: 35 } },
         { anchor: 0, frames: [ content.ibbLiteralBullet ] }
      ),
      pellet: bulletFactory(
         voices.storyteller[0],
         { anchor: 0, size: { x: 16, y: 16 } },
         { anchor: 0, frames: [ content.ibbPellet ] },
         self => {
            // 12 is equivalent to 1 RPM (except second not minute get trolled xd)
            self.rotation.value += 12 * 3;
         }
      ),
      starfly: bulletFactory(null, { anchor: 0, size: { x: 12, y: 12 } }, { anchor: 0, resources: content.ibbStarfly })
   },
   pattern (index?: number, ...patterns: (() => Promise<void>)[]) {
      return patterns[typeof index === 'number' ? index : Math.floor(random.next() * patterns.length)]();
   },
   wrapper (parent: CosmosObject, object: CosmosObject, detachee = object) {
      function detacher () {
         events.off('hurt', handler);
         parent.detach(detachee);
      }
      function handler (hitbox: CosmosHitbox) {
         hitbox === detachee && detacher();
      }
      events.on('hurt', handler);
      parent.attach(object);
      return detacher;
   }
};

/** sides: 0 = top, 1 = right, 2 = bottom, 3 = left */
export function pastBox (distance: number, side = Math.floor(random.next() * 3), phase = random.next()) {
   const even = side % 2 === 0;
   return {
      side,
      position: battler.box.position[side === 1 || side === 2 ? 'add' : 'subtract'](
         even ? battler.box.size.x * phase - battler.box.size.x / 2 : battler.box.size.x / 2 + distance,
         even ? battler.box.size.y / 2 + distance : battler.box.size.y * phase - battler.box.size.y / 2
      ),
      vector: { x: even ? 0 : side === 1 ? 1 : -1, y: even ? (side === 0 ? -1 : 1) : 0 }
   };
}

export function bulletSetup<A extends CosmosObject> (
   bullet: A,
   over = false as boolean | CosmosObject,
   detector: CosmosObject | null = bullet
) {
   const { promise, resolve } = CosmosUtils.hyperpromise();
   const list = over === true ? renderer.layers.menu.objects : over ? over.objects : battler.bullets.objects;
   function handler (hitbox: CosmosHitbox) {
      hitbox === detector && resolve();
   }
   events.on('hurt', handler);
   events.on('heal', handler);
   const detached = promise.then(() => {
      events.off('hurt', handler);
      events.off('heal', handler);
      list.includes(bullet) && over === true ? renderer.detach('menu', bullet) : list.splice(list.indexOf(bullet), 1);
   });
   over === true ? renderer.attach('menu', bullet) : list.push(bullet);
   return { bullet, detached, detach: resolve };
}

export function screenCheck (object: CosmosPointSimple, distance: number) {
   return object.x < -distance || object.x > 320 + distance || object.y < -distance || object.y > 240 + distance;
}

export function boxCheck (object: CosmosPointSimple, distance: number) {
   return (
      object.x < battler.box.position.x - battler.box.size.x / 2 - distance ||
      object.x > battler.box.position.x + battler.box.size.x / 2 + distance ||
      object.y < battler.box.position.y - battler.box.size.y / 2 - distance ||
      object.y > battler.box.position.y + battler.box.size.y / 2 + distance
   );
}

export function pastScreen (distance: number, side = Math.floor(random.next() * 3), phase = random.next()) {
   const even = side % 2 === 0;
   return {
      side,
      position: new CosmosPoint(160, 120)[side === 1 || side === 2 ? 'add' : 'subtract'](
         even ? 320 * phase - 320 / 2 : 320 / 2 + distance,
         even ? 240 / 2 + distance : 240 * phase - 240 / 2
      ),
      vector: { x: even ? 0 : side === 1 ? 1 : -1, y: even ? (side === 0 ? -1 : 1) : 0 }
   };
}

export default {
   maddummy: (() => {
      type DummyGenerator = (type: number, side: number, phase: number, dud?: boolean, alt?: boolean) => void;
      async function pattern (generate: (d: DummyGenerator) => Promise<void>) {
         const promises = [] as Promise<void>[];
         await generate((type, side, phase, dud = false, alt = false) => {
            const { position, vector } = pastBox(10, side, phase);
            const anim = new CosmosAnimation({
               anchor: 0,
               rotation: [ -180, -90, 0, 90 ][side],
               resources: content.ibbDummy
            });
            anim.index = type === 2 ? 4 : 0;
            const hbox = new CosmosHitbox({
               size: { x: 15, y: 15 },
               anchor: 0,
               scale: 0.5,
               metadata: { bullet: true, damage: 5 /* papyrus: alt */ },
               position,
               objects: [ anim ]
            });
            const detach = legacy.wrapper(battler.bullets, hbox);
            const OGpos = hbox.position.value();
            const targetPosition = hbox.position.subtract(new CosmosPoint(vector).multiply(15));
            promises.push(
               hbox.position
                  .modulate(timer, 450, targetPosition, ...(type === 2 ? [] : [ targetPosition ]))
                  .then(async () => {
                     if (dud) {
                        await timer.when(() => battler.volatile[0].vars.dudShock);
                        anim.index = 3;
                        await timer.when(() => battler.volatile[0].vars.dudSad);
                        anim.index = 2;
                        hbox.position.modulate(timer, 1250, OGpos, ...(type === 2 ? [] : [ OGpos ])).then(() => detach());
                     } else {
                        await timer.pause(300);
                        if (type === 1) {
                           anim.index = 1;
                           await timer.pause(150);
                           anim.index = 0;
                           await timer.pause(150);
                           anim.index = 1;
                           hbox.gravity.angle = [ 90, 180, 270, 0 ][side];
                           hbox.gravity.extent = 0.3;
                           await timer.when(
                              () =>
                                 !battler.bullets.objects.includes(hbox) ||
                                 battler.box.position.extentOf(hbox.position) > 60
                           );
                           detach();
                        } else {
                           hbox.position
                              .modulate(timer, 450, OGpos, ...(type === 2 ? [] : [ OGpos ]))
                              .then(() => detach());
                           const anim2 = new CosmosAnimation({
                              active: true,
                              anchor: 0,
                              resources: type === 2 ? content.ibbMissile : content.ibbScribble
                           });
                           const hbox2 = new CosmosHitbox({
                              size: type === 2 ? { x: 25, y: 15 } : { x: 15, y: 15 },
                              anchor: 0,
                              metadata: {
                                 bullet: true,
                                 damage: type === 2 ? (alt ? 6 : 2) : alt ? 3 : 1,
                                 dummybullet: true,
                                 hit: void 0 as boolean | void
                              },
                              position: hbox.position,
                              scale: 0.5,
                              objects: [ anim2 ]
                           });
                           function ideal () {
                              return battler.SOUL.position.angleFrom(hbox2.position);
                           }
                           renderer.attach('menu', hbox2);
                           if (type === 2) {
                              // funni
                              let s = 1.5;
                              let juice = true;
                              anim2.rotation.value = ideal();
                              hbox2.velocity.set(new CosmosPoint().endpoint(anim2.rotation.value, s));
                              hbox2.on('tick', () => {
                                 s += 0.5 / 60;
                                 if (juice) {
                                    const fr = anim2.rotation.value;
                                    const to = ideal();
                                    const di = [
                                       to - fr,
                                       to + 360 - fr,
                                       to - 360 - fr,
                                       to + 720 - fr,
                                       to - 720 - fr
                                    ].sort((a, b) => Math.abs(a) - Math.abs(b))[0];
                                    if (Math.abs(di) > 4) {
                                       anim2.rotation.value =
                                          (anim2.rotation.value + Math.min(Math.ceil(di / 10), 11)) % 360;
                                       hbox2.velocity.set(
                                          new CosmosPoint().endpoint(anim2.rotation.value, Math.min(s, 2))
                                       );
                                    }
                                 }
                                 if (anim2.index === 9) {
                                    juice = false;
                                    anim2.disable();
                                 }
                              });
                           } else {
                              hbox2.velocity.set(new CosmosPoint().endpoint(ideal(), 1));
                              hbox2.gravity.angle = ideal();
                              hbox2.gravity.extent = 0.03;
                           }
                           const hurtListener = async (hurter: CosmosHitbox) => {
                              if (hurter === hbox2) {
                                 hbox2.metadata.hit = true;
                                 events.off('hurt', hurtListener);
                                 hbox2.metadata.bullet = false;
                                 renderer.detach('menu', hbox2);
                              }
                           };
                           events.on('hurt', hurtListener);
                           await timer.when(
                              () => hbox2.metadata.hit === true || hbox2.position.extentOf({ x: 160, y: 120 }) > 170
                           );
                           events.off('hurt', hurtListener);
                           renderer.detach('menu', hbox2);
                           if (type === 2 && hbox2.metadata.hit) {
                              renderer.attach('menu', anim2);
                              anim2.scale.set(hbox2.scale);
                              anim2.position.set(hbox2.position);
                              anim2.reset();
                              anim2.index = 3;
                              assets.sounds.strike.instance(timer);
                              while (true) {
                                 await timer.pause(33);
                                 if (anim2.index === 0) {
                                    break;
                                 }
                                 anim2.index--;
                              }
                              renderer.detach('menu', anim2);
                           }
                        }
                     }
                  })
            );
         });
         await Promise.all(promises);
      }
      async function simple (
         generator: (
            e: (
               type: 'dummy' | 'charge' | 'robot',
               side: CosmosFace,
               from: number,
               to: number,
               count?: number,
               delay?: number,
               dud?: boolean
            ) => Promise<void>
         ) => Promise<void>,
         alt = false
      ) {
         return await pattern(async d => {
            await generator(async (type, side, from, to, count = 1, delay = 0, dud = false) => {
               let index = 0;
               while (index++ < count) {
                  d(
                     type === 'dummy' ? 0 : type === 'charge' ? 1 : 2,
                     side === 'bottom' ? 2 : side === 'left' ? 3 : side === 'right' ? 1 : 0,
                     CosmosMath.remap(random.next(), from, to),
                     dud,
                     alt
                  );
                  if (delay > 0) {
                     await renderer.pause(delay);
                  }
               }
            });
         });
      }
      return async (dud = false, alt = false, nc = 0, ncmod = false) => {
         const volatile = battler.volatile[0];
         if (alt) {
            await simple(
               e => e(ncmod ? 'robot' : 'dummy', random.next() < 0.5 ? 'top' : 'bottom', 0.1, 0.9, nc, 400),
               alt
            );
         } else if (dud) {
            simple(async e => {
               e('dummy', 'top', 0.1, 0.9, 8, 0, true);
               e('dummy', 'left', 0.1, 0.9, 8, 0, true);
               e('dummy', 'bottom', 0.1, 0.9, 8, 0, true);
               e('dummy', 'right', 0.1, 0.9, 8, 0, true);
            });
         } else {
            const MDM = volatile.container.objects[0].metadata as {
               speed: number;
               multiplier: number;
               time: number;
               mode: 'normal' | 'ragdoll' | 'random' | 'restore';
               movement: {
                  rate: number;
                  intensity: number;
                  center: CosmosPoint;
                  sineRate: CosmosPointSimple;
                  sinePower: CosmosPointSimple;
               };
               ragdolled: boolean;
            };
            let s = false;
            const cx = MDM.movement.center.x;
            const cy = MDM.movement.center.y;
            function halt () {
               s = true;
               const target = {
                  x: MDM.movement.center.x + (random.next() < 0.5 ? -100 : 100),
                  y: MDM.movement.center.y + (random.next() < 0.5 ? -20 : 20)
               };
               MDM.movement.center.modulate(timer, 500, target, target);
               MDM.movement.intensity = 0;
            }
            await simple(async e => {
               switch (volatile.vars.pauseact || volatile.vars.phase) {
                  case 1:
                     switch (Math.floor(random.next() * 3)) {
                        case 0:
                           await e('dummy', 'top', 0.1, 0.9, 5, 100);
                           break;
                        case 1:
                           await e('dummy', 'top', 0.7, 0.9, 2, 20);
                           await renderer.pause(800);
                           await e('dummy', 'top', 0.4, 0.6, 2, 20);
                           await renderer.pause(800);
                           await e('dummy', 'top', 0.1, 0.3, 2, 20);
                           break;
                        case 2:
                           await e('dummy', 'left', 0.1, 0.6, 4, 10);
                           await renderer.pause(1600);
                           await e('dummy', 'right', 0.1, 0.6, 4, 10);
                           break;
                     }
                     await renderer.pause(2000);
                     await e('dummy', 'bottom', 0.1, 0.9, 3, 100);
                     break;
                  case 2:
                     switch (volatile.vars.turns) {
                        case 1:
                           await e('dummy', 'top', 0.7, 0.9, 2, 20);
                           await renderer.pause(800);
                           await e('dummy', 'top', 0.4, 0.6, 2, 20);
                           await renderer.pause(800);
                           await e('dummy', 'top', 0.1, 0.3, 2, 20);
                           await renderer.pause(1600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 2:
                           await e('dummy', 'left', 0.6, 0.9, 6, 70);
                           await renderer.pause(1600);
                           await e('dummy', 'right', 0.1, 0.4, 6, 70);
                           await renderer.pause(1600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 3:
                           await e('dummy', 'left', 0.1, 0.9, 6, 80);
                           await renderer.pause(1000);
                           await e('dummy', 'top', 0.1, 0.9, 5, 80);
                           await renderer.pause(1000);
                           await e('dummy', 'right', 0.1, 0.9, 6, 80);
                           await renderer.pause(1600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 4:
                           await e('dummy', 'left', 0.1, 0.2, 2, 70);
                           await renderer.pause(600);
                           await e('dummy', 'right', 0.8, 0.9, 2, 70);
                           await renderer.pause(600);
                           await e('dummy', 'left', 0.1, 0.2, 2, 70);
                           await renderer.pause(600);
                           await e('dummy', 'right', 0.8, 0.9, 2, 70);
                           await renderer.pause(1500);
                           await e('charge', 'top', 0.3, 0.3);
                           await e('charge', 'top', 0.7, 0.7);
                           await renderer.pause(800);
                           halt();
                           await renderer.pause(800);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 5:
                           await e('charge', 'left', 0.2, 0.2);
                           await renderer.pause(300);
                           await e('charge', 'left', 0.4, 0.4);
                           await renderer.pause(300);
                           await e('charge', 'left', 0.6, 0.6);
                           await renderer.pause(300);
                           await e('charge', 'right', 0.2, 0.2);
                           await renderer.pause(300);
                           await e('charge', 'right', 0.4, 0.4);
                           await renderer.pause(300);
                           await e('charge', 'right', 0.6, 0.6);
                           await renderer.pause(1500);
                           await e('charge', 'top', 0.3, 0.3);
                           await e('charge', 'top', 0.7, 0.7);
                           await renderer.pause(800);
                           halt();
                           await renderer.pause(800);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 6:
                           await e('charge', 'left', 0.1, 0.1);
                           await renderer.pause(120);
                           await e('charge', 'top', 0.9, 0.9);
                           await renderer.pause(120);
                           await e('charge', 'right', 0.1, 0.1);
                           await renderer.pause(120);
                           await e('charge', 'bottom', 0.9, 0.9);
                           await renderer.pause(240);
                           await e('charge', 'left', 0.2, 0.2);
                           await renderer.pause(120);
                           await e('charge', 'top', 0.8, 0.8);
                           await renderer.pause(120);
                           await e('charge', 'right', 0.2, 0.2);
                           await renderer.pause(120);
                           await e('charge', 'bottom', 0.8, 0.8);
                           await renderer.pause(240);
                           await e('charge', 'left', 0.3, 0.3);
                           await renderer.pause(120);
                           await e('charge', 'top', 0.7, 0.7);
                           await renderer.pause(120);
                           await e('charge', 'right', 0.3, 0.3);
                           await renderer.pause(120);
                           await e('charge', 'bottom', 0.7, 0.7);
                           await renderer.pause(920);
                           await Promise.all([
                              e('dummy', 'left', 0.2, 0.8, 6, 100),
                              e('dummy', 'right', 0.2, 0.8, 6, 100)
                           ]);
                           await renderer.pause(800);
                           halt();
                           await renderer.pause(800);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        case 7:
                           e('dummy', 'left', 0.9, 0.9);
                           e('dummy', 'right', 0.1, 0.1);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.7, 0.7);
                           e('dummy', 'right', 0.3, 0.3);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.5, 0.5);
                           e('dummy', 'right', 0.5, 0.5);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.3, 0.3);
                           e('dummy', 'right', 0.7, 0.7);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.1, 0.1);
                           e('dummy', 'right', 0.9, 0.9);
                           await renderer.pause(1000);
                           e('dummy', 'left', 0.1, 0.1);
                           e('dummy', 'right', 0.9, 0.9);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.3, 0.3);
                           e('dummy', 'right', 0.7, 0.7);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.5, 0.5);
                           e('dummy', 'right', 0.5, 0.5);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.7, 0.7);
                           e('dummy', 'right', 0.3, 0.3);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.9, 0.9);
                           e('dummy', 'right', 0.1, 0.1);
                           await renderer.pause(1000);
                           e('dummy', 'left', 0.9, 0.9);
                           e('dummy', 'right', 0.1, 0.1);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.7, 0.7);
                           e('dummy', 'right', 0.3, 0.3);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.5, 0.5);
                           e('dummy', 'right', 0.5, 0.5);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.3, 0.3);
                           e('dummy', 'right', 0.7, 0.7);
                           await renderer.pause(66);
                           e('dummy', 'left', 0.1, 0.1);
                           e('dummy', 'right', 0.9, 0.9);
                           await renderer.pause(800);
                           halt();
                           await renderer.pause(800);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                        default:
                           let index = 0;
                           while (index++ < 4) {
                              switch (Math.floor(random.next() * 3)) {
                                 case 0:
                                    await e('dummy', 'left', 0.3, 0.7, 3, 66);
                                    break;
                                 case 1:
                                    await e('dummy', 'right', 0.3, 0.7, 3, 66);
                                    break;
                                 case 2:
                                    await e('charge', 'top', 0.3, 0.7, 3, 66);
                                    break;
                              }
                              await timer.pause(600);
                           }
                           await renderer.pause(800);
                           halt();
                           await renderer.pause(800);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           await renderer.pause(600);
                           await e('dummy', 'bottom', 0.1, 0.9, 3, 20);
                           break;
                     }
                     break;
                  case 3:
                     switch (volatile.vars.turns) {
                        case 1:
                           await e('robot', 'top', 0.1, 0.9, 15, 100);
                           break;
                        case 2:
                           await e('robot', 'left', 0.1, 0.9, 5, 100);
                           await e('robot', 'top', 0.1, 0.9, 5, 100);
                           await e('robot', 'right', 0.1, 0.9, 5, 100);
                           break;
                        case 3:
                           e('robot', 'top', 0.3, 0.3);
                           e('robot', 'top', 0.7, 0.7);
                           e('robot', 'left', 0.3, 0.3);
                           e('robot', 'left', 0.7, 0.7);
                           await renderer.pause(3000);
                           e('robot', 'bottom', 0.3, 0.3);
                           e('robot', 'bottom', 0.7, 0.7);
                           e('robot', 'right', 0.3, 0.3);
                           e('robot', 'right', 0.7, 0.7);
                           await renderer.pause(3000);
                           e('robot', 'top', 0.3, 0.3);
                           e('robot', 'top', 0.7, 0.7);
                           e('robot', 'left', 0.3, 0.3);
                           e('robot', 'left', 0.7, 0.7);
                           await renderer.pause(3000);
                           e('robot', 'bottom', 0.3, 0.3);
                           e('robot', 'bottom', 0.7, 0.7);
                           e('robot', 'right', 0.3, 0.3);
                           e('robot', 'right', 0.7, 0.7);
                           break;
                        case 4:
                           e('robot', 'bottom', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'right', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'right', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'right', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'right', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'right', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'top', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'top', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'top', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'top', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'top', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'left', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'left', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'left', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'left', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'left', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.3, 0.3);
                           await renderer.pause(150);

                           e('charge', 'top', 0.3, 0.3);
                           e('charge', 'top', 0.7, 0.7);
                           await renderer.pause(2000);

                           e('charge', 'bottom', 0.3, 0.3);
                           e('charge', 'bottom', 0.7, 0.7);
                           await renderer.pause(2000);

                           e('robot', 'bottom', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'left', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'left', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'left', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'left', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'left', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'top', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'top', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'top', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'top', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'top', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'right', 0.1, 0.1);
                           await renderer.pause(150);
                           e('robot', 'right', 0.3, 0.3);
                           await renderer.pause(150);
                           e('robot', 'right', 0.5, 0.5);
                           await renderer.pause(150);
                           e('robot', 'right', 0.7, 0.7);
                           await renderer.pause(150);
                           e('robot', 'right', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.9, 0.9);
                           await renderer.pause(150);
                           e('robot', 'bottom', 0.7, 0.7);
                           await renderer.pause(150);

                           e('charge', 'top', 0.3, 0.3);
                           e('charge', 'top', 0.7, 0.7);
                           await renderer.pause(2000);

                           e('charge', 'bottom', 0.3, 0.3);
                           e('charge', 'bottom', 0.7, 0.7);
                           break;
                     }
                     break;
               }
            });
            s && MDM.movement.center.modulate(timer, 500, { x: cx, y: cy }, { x: cx, y: cy });
         }
      };
   })(),
   moldsmal (index?: number, bygg = false, extend = false) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(extend ? 19 : bygg ? 3 : 11, async promises => {
               await timer.pause(random.next() * 150);
               const howTo = 170 + battler.box.size.y / 2;
               const spawnie = new CosmosPoint(
                  160 + (random.next() - 0.5) * battler.box.size.x,
                  150 - battler.box.size.y / 2
               );
               const pellet = legacy.bullets.octagon({
                  autoAttach: false,
                  autoDetach: false,
                  metadata: { bullet: true, damage: 2, detach: 'menu' },
                  position: spawnie,
                  scale: 0.5,
                  async handler (bullet) {
                     promises.push(
                        bullet.position
                           .modulate(timer, 2000, bullet.position.value(), bullet.position.value(), {
                              x: bullet.position.x,
                              y: howTo
                           })
                           .then(() => {
                              detacher();
                           })
                     );
                  }
               });
               const detacher = legacy.wrapper(battler.bullets, pellet);
               await timer.pause(350);
            });
         },
         async () => {
            await battler.sequence(extend ? 9 : bygg ? 1 : 5, async promises => {
               await timer.pause(random.next() * 950);
               const spawnie = new CosmosPoint(
                  160 + (random.next() < 0.5 ? 0.5 : -0.5) * (battler.box.size.x + 20),
                  160 + (random.next() - 0.5) * (battler.box.size.y / 1.5)
               );
               const pellet = legacy.bullets.octagon({
                  autoAttach: false,
                  autoDetach: false,
                  metadata: { bullet: true, damage: 2, detach: 'menu' },
                  position: spawnie,
                  scale: { x: 0.7, y: 0.7 },
                  gravity: { angle: 90, extent: 0.05 },
                  velocity: { x: spawnie.x < 160 ? 2 : -2, y: -1 },
                  async handler (bullet) {
                     promises.push(
                        Promise.race([
                           CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                              bullet === (await Promise.race([ events.on('heal'), events.on('hurt') ]))[0] ||
                                 (await next());
                           }),
                           new Promise<void>(resolve => {
                              bullet.on('tick', async () => {
                                 if (
                                    bullet.metadata.impact ||
                                    bullet.position.y > battler.box.position.y + battler.box.size.y / 2 + 10
                                 ) {
                                    detacher();
                                    resolve();
                                 }
                              });
                           })
                        ])
                     );
                  }
               });
               const detacher = legacy.wrapper(battler.bullets, pellet);
               await timer.pause(950);
            });
         }
      );
   },
   napstablook: (() => {
      const spawnTears = (reverse = false, bullet = false, trueY = 60) => {
         const baseX = battler.volatile[0].container.position.x;
         for (const index of new Array(2).keys()) {
            const velocity = new CosmosPoint(
               (random.next() * 2 - (reverse ? 0 : 1)) * (reverse ? 0.2 : 3),
               reverse ? 0.5 : 4
            );
            const tearSpr = new CosmosSprite({
               position: { y: -1.5 },
               anchor: 0,
               frames: [ content.ibbTear ]
            });
            const tear = new CosmosHitbox({
               anchor: 0,
               position: { x: baseX + index * 15, y: trueY },
               metadata: { bullet, damage: 1, detach: 'menu', dummybullet: true, finalhit: true },
               scale: 0.5,
               size: { x: 6, y: 8 },
               objects: [ tearSpr ]
            }).on('tick', () => {
               const oldpos = tear.position;
               tear.position = tear.position.add(velocity);
               tearSpr.rotation.value = oldpos.angleFrom(tear.position) + 90;
            });
            renderer.attach('menu', tear);
            const garbo = [ 'menu', tear ] as [OutertaleLayerKey, CosmosHitbox];
            battler.garbage.push(garbo);
            timer.pause(50).then(() => {
               velocity.modulate(
                  timer,
                  2000,
                  {
                     x: velocity.x / (reverse ? 2 : 4),
                     y: reverse ? random.next() * -0.6 - 1.2 : 1.4
                  },
                  {
                     x: velocity.x / (reverse ? 2 : 8),
                     y: reverse ? random.next() * -0.6 - 1.2 : 1.4
                  }
               );
               let despawned = false;
               Promise.race([
                  timer.pause(reverse ? 1400 : 5000),
                  timer.when(() => tear.position.y > battler.box.position.y + battler.box.size.y / 2 || despawned)
               ]).then(() => {
                  despawned = true;
                  tear.alpha.modulate(timer, 300, 0).then(() => {
                     renderer.detach('menu', tear);
                     if (battler.garbage.includes(garbo)) {
                        battler.garbage.splice(battler.garbage.indexOf(garbo), 1);
                     }
                  });
               });
            });
         }
      };
      return async (index: number) => {
         if (index === 999) {
            let aeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeae = 0;
            while (
               aeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeae++ <
               15
            ) {
               spawnTears(false, true, -20);
               await timer.pause(700);
            }
         } else {
            if (index === 0) {
               const blurb = new CosmosSprite({
                  anchor: 0,
                  scale: 0.5,
                  frames: [ content.ibcNapstaSad ]
               }).on('tick', () => {
                  blurb.position = new CosmosPoint(160).add(
                     (Math.random() - 0.5) * 2 * 1.5,
                     (Math.random() - 0.5) * 2 * 1.5
                  );
               });
               renderer.attach('menu', blurb);
               await timer.pause(3000);
               renderer.detach('menu', blurb);
            } else {
               if (index === 1) {
                  let tears = 0;
                  while (tears++ < 10) {
                     spawnTears(false, true);
                     await timer.pause(550);
                  }
                  await timer.pause(1500);
               } else if (index === 2) {
                  let times = 0;
                  while (times++ < 5) {
                     spawnTears(false, true);
                     await timer.pause(200);
                     spawnTears(false, true);
                     await timer.pause(400);
                     spawnTears(false, true);
                     await timer.pause(200);
                     const volatile = battler.volatile[0];
                     await volatile.container.alpha.modulate(timer, 300, 0);
                     if (times < 5) {
                        const possie = [ 100, 160, 220 ].filter(
                           x => x !== volatile.container.position.x && (times !== 7 || x !== 160)
                        );
                        const target = possie[Math.floor(random.next() * possie.length)];
                        volatile.container.position.x = target;
                        const reduced = (target - 160) * 0.5 + 160;
                        battler.box.position.modulate(timer, 500, {
                           x: reduced,
                           y: battler.box.position.y
                        });
                     } else {
                        volatile.container.position.x = 160;
                        battler.box.position.modulate(timer, 500, {
                           x: 160,
                           y: battler.box.position.y
                        });
                     }
                     await volatile.container.alpha.modulate(timer, 300, 1);
                  }
               } else if (index === 3) {
                  spawnTears(true);
               } else {
                  spawnTears();
               }
            }
         }
      };
   })(),
   async shyren (originpos = battler.volatile[0].container.position, anga = 45, angb = 70, alt = false) {
      const mouthPos = originpos.subtract({ x: -0.5, y: 64.5 });
      async function spawnNote (v = 1) {
         const fv = CosmosMath.remap(random.next(), 2, 4) * v;
         const hitbox = new CosmosHitbox({
            metadata: { bullet: true, damage: 4 /* papyrus: alt */ },
            anchor: 0,
            size: 10,
            position: mouthPos.add(random.next() * 4 - 2, random.next() * 4 - 2),
            velocity: new CosmosPoint().endpoint(anga + random.next() * angb, fv),
            objects: [ new CosmosAnimation({ active: true, resources: content.ibbNote, anchor: 0 }) ]
         });
         const { detached, detach } = bulletSetup(
            new CosmosObject({ objects: [ hitbox ] }).on(
               'tick',
               (() => {
                  const time = timer.value;
                  const phase = random.next();
                  return function () {
                     this.position.x = sineWaver(time, 1000 / fv, -0.7, 0.7, phase);
                  };
               })()
            ),
            true,
            hitbox
         );
         await Promise.race([ detached, timer.when(() => screenCheck(hitbox, 10)) ]);
         detach();
      }
      function spawnNoteWithSnd (promises: Promise<void>[], index: number, note: number, notepower: number) {
         if (save.data.b.bullied_shyren) {
            [ assets.sounds.singBad1, assets.sounds.singBad2, assets.sounds.singBad3 ][
               Math.floor(random.next() * 3)
            ].instance(timer);
            promises.push(spawnNote(notepower));
         } else {
            if (index % 8 === 0) {
               [ assets.sounds.singBass1, assets.sounds.singBass2 ][index % 16 === 0 ? 0 : 1].instance(timer);
            }
            [
               assets.sounds.singTreble1,
               assets.sounds.singTreble2,
               assets.sounds.singTreble3,
               assets.sounds.singTreble4,
               assets.sounds.singTreble5,
               assets.sounds.singTreble6
            ][note].instance(timer);
            promises.push(spawnNote(notepower));
         }
      }
      const vars = battler.volatile[0].vars;
      if (alt) {
         return spawnNoteWithSnd;
      } else if (vars.encourage > 0) {
         const notes = [
            [ 1, 5, 4, 5, 3, 4, 2, 4, 3, 2, 1, 2, 0 ],
            [ 0, 4, 3, 0, 2, 0, 2, 3, 0, 0, 3, 0, 2, 0, 2, 3 ],
            [ 0, 0, 5, 0, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 1, 2, 0, 0, 5, 0, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 2, 1 ],
            [ 0, 0, 0, 0, 5, 0, 3, 0, 2, 0, 1, 0, 2, 3, 0, 4, 0, 0, 3, 0, 2, 1, 0, 1, 0, 0, 3, 0, 2, 1, 2, 1 ],
            [
               3, 4, 3, 4, 5, 3, 5, 4, 5, 0, 4, 5, 2, 4, 3, 4, 0, 0, 5, 5, 3, 4, 1, 0, 4, 0, 2, 2, 0, 4, 1, 1, 2, 2, 4,
               4, 2, 5, 3, 5, 4, 2, 1, 4, 1, 4, 5, 2, 5, 0, 0, 1, 3, 1, 3, 0, 3, 2, 4, 0, 3, 3, 4, 2, 4, 4, 1, 5, 4, 4,
               3
            ]
         ][vars.encourage - 1];
         const notepower = [ 1, 1, 1.1, 1.2, 1.5 ][vars.encourage - 1];
         const timedelay = [ 250, 250, 240, 220, 190 ][vars.encourage - 1];
         await battler.sequence(notes.length, async (promises, index) => {
            spawnNoteWithSnd(promises, index, notes[index], notepower);
            if (index === notes.length - 1) {
               vars.singturn = false;
            } else {
               await timer.pause(timedelay);
            }
         });
      } else {
         [ assets.sounds.singBad1, assets.sounds.singBad2, assets.sounds.singBad3 ][
            Math.floor(random.next() * 3)
         ].instance(timer);
         await spawnNote(0.5);
      }
   },
   async spacetop (vertical = false, jerry = false) {
      return random.next() < 0.5
         ? battler.sequence((jerry ? 8 : 6) - (vertical ? 1 : 0), async (promises, index) => {
              if (vertical && index === 0) {
                 battler.volatile[0].vars.bombfall = 1;
              }
              while (true) {
                 const side = random.next() < 0.5 ? 1 : 3;
                 const { position } = pastBox(10, side);
                 if (position.extentOf(battler.SOUL.position) > 20) {
                    const line = new CosmosRectangle({
                       anchor: { y: 0 },
                       position: { x: 0, y: position.y },
                       size: { x: 320, y: 4 },
                       fill: 'white',
                       alpha: 0.5
                    });
                    battler.bullets.attach(line);
                    await timer.pause(100);
                    line.alpha.value = 0;
                    await timer.pause(100);
                    line.alpha.value = 0.5;
                    await timer.pause(300);
                    line.alpha.value = 0;
                    timer
                       .when(() => !game.movement)
                       .then(() => {
                          const index = battler.bullets.objects.indexOf(line);
                          battler.bullets.objects = [
                             ...battler.bullets.objects.slice(0, index),
                             ...battler.bullets.objects.slice(index + 1)
                          ];
                       });
                    const bullet = new CosmosHitbox({
                       anchor: 0,
                       position: position.value(),
                       size: { x: 5, y: 13 },
                       scale: { x: 0.75, y: 0.75 },
                       metadata: { bullet: true, damage: 4 },
                       velocity: {
                          x: (side === 1 ? -1 : 1) * Math.min(CosmosMath.remap(random.next(), 4, 10), 8, 5)
                       },
                       acceleration: 1 / 1.1,
                       rotation: side === 1 ? 90 : 270,
                       objects: [
                          new CosmosAnimation({
                             anchor: 0,
                             resources: content.ibbLithium,
                             index: Math.floor(random.next() * 4),
                             metadata: { trig: false }
                          }).on('tick', function () {
                             if (
                                !this.metadata.trig &&
                                (bullet.velocity.extentOf(new CosmosPoint()) < 0.5 ||
                                   (side === 1 ? bullet.position.x < 140 : bullet.position.x > 180))
                             ) {
                                this.metadata.trig = true;
                                bullet.metadata.damage = 6;
                                assets.sounds.bomb.instance(timer);
                                for (const sussy of battler.bullets.objects) {
                                   if (sussy.metadata.moon) {
                                      sussy.velocity = sussy.velocity.add(
                                         new CosmosPoint().endpoint(
                                            sussy.position.angleFrom(bullet.position),
                                            10 / (sussy.position.extentOf(bullet.position) / 4)
                                         )
                                      );
                                   }
                                }
                                for (const ob of renderer.layers.menu.objects) {
                                   if (ob.metadata.pyExplodable) {
                                      const b = bullet.position.extentOf(ob);
                                      if (b < 40) {
                                         ob.metadata.pyExplodable = false;
                                         const a = bullet.position.angleTo(ob);
                                         ob.velocity.set(new CosmosRay(a, 25 / (b / 3)));
                                         const { x, y } = new CosmosRay(a, 1);
                                         ob.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                                         ob.velocity.extent = Math.max(ob.velocity.extent, 4);
                                      }
                                   }
                                }
                                shake(2, 850, 0, 1);
                                // bullet.size.modulate(300, bullet.size.multiply(1.4));
                                bullet.scale.modulate(timer, 300, { x: 5, y: 5 });
                                this.alpha.modulate(timer, 300, 0).then(() => {
                                   detachie();
                                });
                             }
                          })
                       ]
                    });
                    const detachie = legacy.wrapper(battler.bullets, bullet);
                    promises.push(timer.when(() => !battler.bullets.objects.includes(bullet)));
                    await timer.pause(vertical ? 1400 : 1000);
                    break;
                 }
              }
           })
         : battler.sequence((jerry ? 8 : 6) + (vertical ? 1 : 0), async (promises, index) => {
              if (vertical && index === 0) {
                 battler.volatile[0].vars.bombfall = 2;
              }
              while (true) {
                 const { position } = pastBox(10, 0);
                 if (position.extentOf(battler.SOUL.position) > 20) {
                    let rotspeed = 2;
                    const bullet = new CosmosHitbox({
                       anchor: 0,
                       position: position.value(),
                       size: { x: 5, y: 10 },
                       scale: { x: 0.75, y: 0.75 },
                       metadata: { bullet: true, damage: 4 },
                       velocity: { y: CosmosMath.remap(random.next(), 0.1, 0.4) * 0.7 },
                       acceleration: 1 / 0.92,
                       objects: [
                          new CosmosAnimation({
                             anchor: 0,
                             resources: content.ibbLithium,
                             metadata: { trig: false },
                             index: Math.floor(random.next() * 4)
                          }).on('tick', function () {
                             rotspeed = 0;
                             if (
                                !this.metadata.trig &&
                                bullet.position.y > battler.box.position.y + battler.box.size.y / 2
                             ) {
                                this.metadata.trig = true;
                                bullet.acceleration.value = 1;
                                bullet.velocity.y = 0;
                                bullet.metadata.damage = 6;
                                assets.sounds.bomb.instance(timer);
                                for (const sussy of battler.bullets.objects) {
                                   if (sussy.metadata.moon) {
                                      sussy.velocity = sussy.velocity.add(
                                         new CosmosPoint().endpoint(
                                            sussy.position.angleFrom(bullet.position),
                                            10 / (sussy.position.extentOf(bullet.position) / 4)
                                         )
                                      );
                                   }
                                }
                                for (const ob of renderer.layers.menu.objects) {
                                   if (ob.metadata.pyExplodable) {
                                      const b = bullet.position.extentOf(ob);
                                      if (b < 40) {
                                         ob.metadata.pyExplodable = false;
                                         const a = bullet.position.angleTo(ob);
                                         ob.velocity.set(new CosmosRay(a, 25 / (b / 3)));
                                         const { x, y } = new CosmosRay(a, 1);
                                         ob.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                                         ob.velocity.extent = Math.max(ob.velocity.extent, 4);
                                      }
                                   }
                                }
                                shake(2, 850, 0, 1);
                                // bullet.size.modulate(300, bullet.size.multiply(1.4));
                                bullet.scale.modulate(timer, 300, { x: 5, y: 5 });
                                this.alpha.modulate(timer, 300, 0).then(() => {
                                   detachie();
                                });
                             }
                          })
                       ]
                    }).on('tick', () => {
                       bullet.rotation.value += rotspeed /= 1 + 0.1;
                    });
                    const detachie = legacy.wrapper(battler.bullets, bullet);
                    promises.push(timer.when(() => !battler.bullets.objects.includes(bullet)));
                    await timer.pause(vertical ? 1400 : 1000);
                    break;
                 }
              }
           });
   }
};
