import { AdvancedBloomFilter, OutlineFilter, ZoomBlurFilter } from 'pixi-filters';
import assets from '../assets';
import { OutertaleLayerKey, OutertaleTurnState } from '../classes';
import commonPatterns, { boxCheck, bulletSetup, pastBox, screenCheck, starGenerator } from '../common/patterns';
import content from '../content';
import { audio, events, game, random, renderer, timer } from '../core';
import {
   CosmosAnimation,
   CosmosBaseEvents,
   CosmosBitmap,
   CosmosDaemon,
   CosmosEventHost,
   CosmosHitbox,
   CosmosImage,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRay,
   CosmosRectangle,
   CosmosRegistry,
   CosmosSizedObjectProperties,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueLinked
} from '../engine';
import { battler, heal, quickshadow, sawWaver, shadow, shake, sineWaver } from '../mantle';
import save from '../save';
import text from './text';
import { colormix } from './bootstrap';

type ShootableEvents = CosmosBaseEvents & { shot: [number, number] };

async function b (x: number, y: number, sp = true) {
   await Promise.all([
      battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - y / 2 }),
      battler.box.size.modulate(timer, 300, { x, y })
   ]);
   if (sp) {
      battler.SOUL.position.set(battler.box);
      battler.SOUL.alpha.value = 1;
   }
}

export const box = {
   get x1 () {
      return battler.box.position.x - battler.box.size.x / 2;
   },
   get x2 () {
      return battler.box.position.x + battler.box.size.x / 2;
   },
   get y1 () {
      return battler.box.position.y - battler.box.size.y / 2;
   },
   get y2 () {
      return battler.box.position.y + battler.box.size.y / 2;
   },
   get x () {
      return battler.box.x;
   },
   get y () {
      return battler.box.y;
   },
   get sx () {
      return battler.box.size.x;
   },
   get sy () {
      return battler.box.size.y;
   }
};

const mtaLaserXA = (2 / 15) * 2 - 1;

const bwsp = (x: number) => CosmosMath.remap(x, 0, 1, box.x1, box.x2);

const soundMemz = new CosmosRegistry<string, boolean>(false);

function memzSound (key: string) {
   if (soundMemz.of(key)) {
      return false;
   } else {
      soundMemz.set(key, true);
      timer.post().then(() => soundMemz.set(key, false));
      return true;
   }
}

export const mta = {
   fodder (solid: boolean, props: CosmosSizedObjectProperties = {}, over = true) {
      const spr = solid
         ? new CosmosRectangle({ anchor: 0, size: 22, fill: 'white', stroke: 'black', border: 2 })
         : new CosmosSprite({ anchor: 0, frames: [ content.ibbBoxBullet ], offsets: [ {} ] });
      const bSetup = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            {
               shot: boolean;
               shootable: boolean;
               t: number;
               bullet: boolean;
               damage: number;
               rev: boolean;
               blastable: boolean;
            }
         >(
            Object.assign(
               {
                  anchor: 0,
                  size: 20,
                  metadata: {
                     shot: false,
                     shootable: true,
                     t: timer.value,
                     bullet: true,
                     damage: 5,
                     blastable: solid,
                     rev: false
                  },
                  objects: [ spr ],
                  priority: 10,
                  scale: 1 / 2
               },
               props
            )
         ).on('shot', async function (a, b) {
            if (solid) {
               memzSound('swallow') && assets.sounds.swallow.instance(timer);
               if (battler.SOUL.metadata.color === 'orange') {
                  this.velocity.set(
                     this.velocity.add(
                        // its over nine th........................................... just nine!!!!!111!!11!!!1!
                        new CosmosRay(a, this.velocity.extent > 9 ? this.velocity.extent : 15 / (b / 5))
                     )
                  );
               }
            } else if (!this.metadata.shot) {
               this.metadata.shot = true;
               this.metadata.shootable = false;
               this.metadata.bullet = false;
               memzSound('burst') && assets.sounds.burst.instance(timer);
               const hs = spr.compute().divide(2);
               const es = CosmosUtils.populate(4, index => {
                  const os = hs.multiply(index % 2, Math.floor(index / 2));
                  const rs = os.divide(hs).subtract(0.5).multiply(2);
                  const subspr = new CosmosSprite({
                     frames: [ content.ibbBoxBullet ],
                     anchor: rs.multiply(-1),
                     position: this,
                     scale: 1 / 2,
                     velocity: rs,
                     // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                     crop: CosmosImage.utils.crop({ x: os.x, y: os.y, width: hs.x, height: hs.y })
                  });
                  return {
                     anim: subspr,
                     promise: new Promise<void>(reso => {
                        subspr.on('tick', function () {
                           this.alpha.value -= 0.1;
                           if (this.alpha.value <= 0) {
                              this.alpha.value = 0;
                              renderer.detach('menu', this);
                              reso();
                           }
                        });
                     })
                  };
               });
               renderer.attach('menu', ...es.map(element => element.anim));
               await renderer.on('render');
               this.detach(spr);
               await Promise.all(es.map(element => element.promise));
               bSetup.detach();
            }
         }),
         over,
         null
      );
      return bSetup;
   },
   laser (
      baserot: number,
      spin: number,
      speed: number,
      x: number,
      color: 'blue' | 'orange' | 'white',
      props: CosmosSizedObjectProperties
   ) {
      return new CosmosHitbox(
         Object.assign(
            {
               anchor: 0,
               size: { y: 6, x },
               metadata: { bullet: true, damage: 5, color },
               rotation: baserot,
               objects: [
                  new CosmosRectangle({
                     anchor: 0,
                     fill: color === 'blue' ? '#00a2e8' : color === 'white' ? '#fff' : '#ff993d',
                     size: { y: 6, x }
                  }),
                  new CosmosSprite({
                     anchor: { y: 0, x: mtaLaserXA },
                     position: { x: x / 2 },
                     frames: [ content.ibbLaserEmitter ]
                  }),
                  new CosmosSprite({
                     anchor: { y: 0, x: mtaLaserXA },
                     position: { x: x / -2 },
                     scale: { x: -1 },
                     frames: [ content.ibbLaserEmitter ]
                  })
               ],
               spin,
               velocity: { y: speed }
            },
            props
         )
      );
   }
};

export const mtb = {
   async sideleg (
      side: -1 | 1 = random.next() < 0.5 ? -1 : 1,
      center = box.x,
      centerDistance = 0,
      speed = 2,
      sd = 20,
      sr = 1.5,
      tickOffset = 18 / sr,
      preyellow = false,
      arm = false
   ) {
      const bx = center + centerDistance * side;
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            { shot: boolean; bullet: boolean; damage: number; shootable: boolean; ticks: number }
         >({
            anchor: { x: arm ? 1 : 0, y: 1.005 },
            size: { x: 8, y: 1000 },
            metadata: { bullet: true, damage: 5, shot: preyellow, shootable: true, ticks: tickOffset },
            position: { x: bx, y: -20 },
            velocity: { y: speed },
            scale: { x: side },
            rotation: side === -1 ? 270 : 90,
            tint: preyellow ? 0xffff00 : 0xffffff,
            objects: [
               new CosmosSprite({
                  anchor: { x: arm ? 1 : 0, y: 1 },
                  frames: [ arm ? content.ibbArmBullet : content.ibbLegBullet ]
               })
            ]
         })
            .on('shot', function () {
               if (arm) {
                  if (!this.metadata.shot) {
                     this.metadata.shot = true;
                     assets.sounds.burst.instance(timer);
                     this.velocity.x = side * 10;
                     this.tint = 0xffff00;
                  }
               } else {
                  assets.sounds.swallow.instance(timer);
                  if (this.metadata.shot) {
                     this.metadata.shot = false;
                     this.tint = 0xffffff;
                  } else {
                     this.metadata.shot = true;
                     this.tint = 0xffff00;
                  }
               }
            })
            .on('tick', function () {
               if (screenCheck(this, 20)) {
                  detach();
               } else {
                  if (arm) {
                     const shad = quickshadow(this.objects[0] as CosmosSprite, this);
                     shad.scale.set(this.scale);
                     shad.rotation.value = this.rotation.value;
                  } else {
                     const swing = (this.metadata.shot ? (this.metadata.ticks += sr) : this.metadata.ticks) / 30;
                     this.x = bx + (arm ? CosmosMath.linear(swing % 1, 0, 1, 0) : CosmosMath.wave(swing)) * sd * side;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async sidearm (
      side: -1 | 1 = random.next() < 0.5 ? -1 : 1,
      center = box.x,
      centerDistance = 0,
      speed = 3,
      swingSpeed = 2,
      tickOffset = 0,
      preyellow = false
   ) {
      return mtb.sideleg(side, center, centerDistance, speed, swingSpeed, 0, tickOffset, preyellow, true);
   },
   /** bwsp = box-width-span phase */
   async bomb (bwsp = random.next(), speed = 2, rev: CosmosEventHost<{ rev: [] }> | null = null) {
      const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbBomb });
      const { bullet, detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            { shot: boolean; bullet: boolean; damage: number; shootable: boolean; rev: boolean; bombexempt: boolean }
         >({
            anchor: 0,
            size: 12,
            metadata: { bullet: true, damage: 5, shot: false, shootable: true, rev: false, bombexempt: true },
            position: { x: box.x1 + box.sx * bwsp, y: -10 },
            velocity: { y: speed },
            objects: [ spr ]
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  spr.enable();
                  await timer.when(() => spr.index === 1);
                  assets.sounds.prebomb.instance(timer);
                  await timer.when(() => spr.index === 0);
                  await timer.when(() => spr.index === 1);
                  assets.sounds.prebomb.instance(timer);
                  await timer.when(() => spr.index === 0);
                  await timer.when(() => spr.index === 1);
                  assets.sounds.prebomb.instance(timer);
                  await timer.when(() => spr.index === 0);
                  await timer.when(() => spr.index === 1);
                  assets.sounds.bomb.instance(timer);
                  battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.bomb, 20);
                  shake(2, 500);
                  this.metadata.bullet = false;
                  spr.alpha.value = 0;
                  this.attach(
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        resources: content.ibbExBombBlastCore,
                        objects: [
                           new CosmosHitbox({
                              anchor: 0,
                              metadata: { bullet: true, damage: 7 },
                              size: { x: 10, y: 1000 }
                           }).on('render', function () {
                              this.metadata.bullet = false;
                              for (const object of renderer.detect(
                                 'menu',
                                 this,
                                 ...renderer.calculate('menu', o => o.metadata.shootable === true)
                              )) {
                                 if (!object.metadata.blastable && !object.metadata.bombexempt) {
                                    (object as CosmosHitbox<CosmosBaseEvents & { shot: [] }>).fire('shot');
                                 }
                                 break;
                              }
                           }),
                           new CosmosHitbox({
                              anchor: 0,
                              metadata: { bullet: true, damage: 7 },
                              size: { x: 1000, y: 10 }
                           }).on('render', function () {
                              this.metadata.bullet = false;
                              for (const object of renderer.detect(
                                 'menu',
                                 this,
                                 ...renderer.calculate('menu', o => o.metadata.shootable === true)
                              )) {
                                 if (object.metadata.blastable) {
                                    object.alpha.value = 0;
                                    object.metadata.shootable = false;
                                    object.metadata.bullet = false;
                                 } else if (!object.metadata.bombexempt) {
                                    (object as CosmosHitbox<CosmosBaseEvents & { shot: [] }>).fire('shot');
                                 }
                                 break;
                              }
                           }),
                           ...CosmosUtils.populate(
                              4,
                              index =>
                                 new CosmosAnimation({
                                    anchor: { y: 0 },
                                    position: new CosmosPoint().endpoint(index * 90, 5),
                                    rotation: index * 90,
                                    resources: content.ibbExBombBlastRay
                                 })
                           )
                        ]
                     }).on('tick', function () {
                        for (const c of this.objects as CosmosAnimation[]) {
                           c.index = this.index;
                        }
                        if (this.index === 7) {
                           detach();
                        }
                     })
                  );
               }
            })
            .on('tick', function () {
               this.metadata.rev && this.velocity.y > -speed && (this.velocity.y -= 0.2);
               if (rev) {
                  this.y < -10 && this.velocity.y < 0 && detach();
               } else {
                  this.y > 250 && detach();
               }
            }),
         true,
         null
      );
      rev?.on('rev', () => {
         bullet.metadata.rev = true;
      });
      return detached;
   },
   async parasol (bwsp = random.next(), speed = 3, early = speed * 20) {
      const spr = new CosmosAnimation({
         anchor: 0,
         resources: content.ibbExTiny2,
         metadata: { queueCancel: false }
      }).on('tick', function () {
         this.metadata.queueCancel && this.index === 0 && this.disable();
      });
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<ShootableEvents, { shot: boolean; a1: number; shootable: boolean }>({
            anchor: { x: 0 },
            size: { x: 40, y: 25 },
            metadata: { shot: false, a1: 0, shootable: true },
            position: { x: box.x1 + box.sx * bwsp, y: -10 },
            velocity: { y: speed },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  assets.sounds.burst.instance(timer);
                  battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.hurt, 5);
                  const hs = spr.compute().divide(2);
                  const es = CosmosUtils.populate(4, index => {
                     const os = hs.multiply(index % 2, Math.floor(index / 2));
                     const rs = os.divide(hs).subtract(0.5).multiply(2);
                     const anim = new CosmosAnimation({
                        resources: content.ibbExTiny2,
                        index: spr.index,
                        anchor: rs.multiply(-1),
                        position: this,
                        scale: 1 / 2,
                        velocity: rs,
                        // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                        subcrop: CosmosImage.utils.crop({ x: os.x, y: os.y, width: hs.x, height: hs.y })
                     });
                     return {
                        anim,
                        promise: new Promise<void>(reso => {
                           anim.on('tick', function () {
                              this.alpha.value -= 0.1;
                              if (this.alpha.value <= 0) {
                                 this.alpha.value = 0;
                                 renderer.detach('menu', this);
                                 reso();
                              }
                           });
                        })
                     };
                  });
                  renderer.attach('menu', ...es.map(element => element.anim));
                  await renderer.on('render');
                  this.detach(spr);
                  await Promise.all(es.map(element => element.promise));
                  detach();
               }
            })
            .on('tick', async function () {
               if (!this.metadata.shot) {
                  switch (this.metadata.a1) {
                     case 0:
                        if (this.y > box.y1 - early - 15) {
                           this.metadata.a1 = 1;
                           spr.enable();
                           await timer.when(() => spr.index === 12);
                           spr.metadata.queueCancel = true;
                           renderer.attach(
                              'menu',
                              new CosmosHitbox({
                                 anchor: 0,
                                 position: this,
                                 scale: 0.5,
                                 metadata: { ticks: 0, size: 0.1, bullet: true, damage: 5 },
                                 priority: 4,
                                 size: 16,
                                 velocity: new CosmosRay(this.position.angleTo(battler.SOUL), 2.5),
                                 objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbExKiss ] }) ]
                              }).on('tick', function () {
                                 this.metadata.ticks++;
                                 this.metadata.size < 1 && (this.metadata.size += 0.1);
                                 this.rotation.value = Math.sin(this.metadata.ticks / 4) * 12;
                                 this.scale.set((this.metadata.size + Math.sin(this.metadata.ticks / 2) * 0.1) * 0.5);
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              })
                           );
                        }
                        break;
                     case 1:
                        if (this.velocity.y > 1.5) {
                           this.velocity.y -= 0.15;
                        } else {
                           this.metadata.a1 = 2;
                        }
                        break;
                     case 2:
                        if (this.y > box.y - 10) {
                           this.metadata.a1 = 3;
                           this.gravity.set(this.x < 160 ? 180 : 0, 0.5);
                        }
                        break;
                     case 3:
                        screenCheck(this, 10) && detach();
                        break;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async meteor (bwsp = random.next(), speed = 24, warntime = 600) {
      const x = box.x1 + box.sx * bwsp;
      const warner = new CosmosRectangle({
         area: renderer.area,
         anchor: { x: 0, y: 1 },
         position: { x, y: box.y2 - 1 },
         size: 12,
         stroke: 'white',
         tint: 0xff0000,
         metadata: { ticks: 0 },
         objects: [
            new CosmosText({
               anchor: 0,
               position: { x: 1, y: -6 },
               stroke: 'transparent',
               fill: '#ff0000',
               font: '8px CryptOfTomorrow',
               content: '!'
            })
         ],
         filters: [ battler.clipFilter.value! ]
      }).on('tick', function () {
         if (this.metadata.ticks++ === 1) {
            this.metadata.ticks = 0;
            const red = this.tint === 0xff0000;
            this.tint = red ? 0xffff00 : 0xff0000;
            this.objects[0].fill = red ? '#ffff00' : '#ff0000';
            if (red) {
               assets.sounds.prebomb.instance(timer).rate.value = 1.2;
            }
         }
      });
      renderer.attach('menu', warner);
      await timer.pause(warntime);
      renderer.detach('menu', warner);
      const b = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0.2 });
      await new Promise<void>(res => {
         renderer.attach(
            'menu',
            new CosmosAnimation({
               area: renderer.area,
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.ibbMeteor,
               position: { x, y: -10 },
               velocity: { y: speed },
               filters: [ b ]
            }).on('tick', function () {
               if (this.y < box.y2) {
                  const e = shadow(
                     this,
                     s => {
                        s.alpha.value /= 1.5;
                        if (s.alpha.value < 0.2) {
                           return true;
                        } else {
                           return false;
                        }
                     },
                     { position: this, alpha: 0.6 }
                  );
                  timer.post().then(() => {
                     renderer.attach('menu', e.object);
                     e.promise.then(() => {
                        renderer.detach('menu', e.object);
                     });
                  });
                  if (this.y > box.y) {
                     this.filters!.length < 2 && this.filters?.push(battler.clipFilter.value!);
                  }
               } else {
                  renderer.detach('menu', this);
                  res();
               }
            })
         );
      });
      await renderer.on('render');
      shake(4, 500);
      assets.sounds.bomb.instance(timer);
      assets.sounds.boom.instance(timer, { offset: 0.2 }).rate.value = 1.6;
      const flareViz = new CosmosRectangle({
         area: renderer.area,
         position: { x, y: box.y2 },
         alpha: 0,
         anchor: { x: 0, y: 1 },
         size: { x: 4, y: 1000 },
         fill: 'white',
         filters: [ b, battler.clipFilter.value! ]
      });
      renderer.attach('menu', flareViz);
      flareViz.size.modulate(timer, 300, { x: 15 }, { x: 15 }, { x: 15 }, { x: 15 }).then(() => {
         flareViz.size.modulate(timer, 300, { x: 15 }, { x: 15 }, { x: 15 }, { x: 4 });
      });
      await flareViz.alpha.modulate(timer, 150, 1, 1);
      flareViz.attach(
         new CosmosHitbox({
            size: { x: 11, y: box.sy },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 6 }
         }).on('render', function () {
            this.metadata.bullet = false;
         })
      );
      await flareViz.alpha.modulate(timer, 450, 1, 0);
      renderer.detach('menu', flareViz);
   },
   async rocket (bs = Math.floor(random.next() * 4), bwsp = random.next(), warntime = 600, firetime = 400) {
      const t = timer.value;
      const warnspr = new CosmosAnimation({
         active: true,
         anchor: 0,
         resources: content.ibbWarningreticle,
         area: renderer.area,
         filters: [ battler.clipFilter.value! ],
         tint: 0xff0000,
         position: pastBox(0, bs, bwsp).position,
         metadata: { ticks: 0, silent: false },
         objects: [
            new CosmosText({
               anchor: 0,
               position: { x: 1 },
               stroke: 'transparent',
               fill: '#ff0000',
               font: '8px CryptOfTomorrow',
               content: '!'
            })
         ]
      }).on('tick', function () {
         const s = (timer.value - t) / (warntime + firetime);
         this.scale.set(CosmosMath.bezier(s, 0, 1, 1));
         if (this.metadata.ticks++ === 1) {
            this.metadata.ticks = 0;
            const red = this.tint === 0xff0000;
            this.tint = red ? 0xffff00 : 0xff0000;
            this.objects[0].fill = red ? '#ffff00' : '#ff0000';
            if (!this.metadata.silent && red) {
               const pb = assets.sounds.prebomb.instance(timer);
               pb.rate.value = 1.2;
               pb.gain.value = CosmosMath.remap(s, 0.2, 0.8);
            }
         }
      });
      renderer.attach('menu', warnspr);
      await timer.pause(warntime);
      warnspr.metadata.silent = true;
      const color = random.next() < 0.5 ? 0 : 1;
      const tint = [ 0x00a2e8, 0xff993d ][color];
      const ROCKET = new CosmosAnimation({
         active: true,
         anchor: { x: 0, y: 1 },
         rotation: bs * 90,
         priority: 1,
         resources: content.ibbNeoRocket,
         position: pastBox(140, bs, bwsp).position,
         tint
      }).on('tick', function () {
         const e = shadow(
            this,
            s => {
               s.alpha.value /= 1.3;
               if (s.alpha.value < 0.05) {
                  return true;
               } else {
                  return false;
               }
            },
            { position: this, alpha: 0.6, tint }
         );
         timer.post().then(() => {
            renderer.attach('menu', e.object);
            e.promise.then(() => {
               renderer.detach('menu', e.object);
            });
         });
      });
      renderer.attach('menu', ROCKET);
      await ROCKET.position.modulate(timer, firetime, warnspr);
      await renderer.on('render');
      renderer.detach('menu', ROCKET, warnspr);
      shake(2, 500);
      assets.sounds.bomb.instance(timer);
      const am = 32;
      await Promise.all(
         CosmosUtils.populate(am, index => {
            const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbFroggitWarn });
            const { detached, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 2,
                  position: ROCKET,
                  scale: 1.5,
                  metadata: { bullet: true, damage: 5, color: [ 'blue', 'orange' ][color] },
                  velocity: new CosmosRay(index * (360 / am), 140 / (firetime / (100 / 3)) / 3),
                  objects: [ spr ],
                  tint
               }).on('tick', function () {
                  this.velocity.angle += 2;
                  if (boxCheck(this, 5)) {
                     detach();
                  } else {
                     const e = shadow(
                        spr,
                        s => {
                           s.alpha.value /= 1.3;
                           if (s.alpha.value < 0.05) {
                              return true;
                           } else {
                              return false;
                           }
                        },
                        { position: this, alpha: 0.6, tint, scale: 1.5 }
                     );
                     timer.post().then(() => {
                        battler.bullets.attach(e.object);
                        e.promise.then(() => {
                           battler.bullets.detach(e.object);
                        });
                     });
                  }
               }),
               false,
               null
            );
            return detached;
         })
      );
   },
   async paratrooper (
      side: -1 | 1 = random.next() < 0.5 ? -1 : 1,
      distance = -30,
      speed = 3,
      bulletspeed = 5,
      waversize = 2
   ) {
      const spr = new CosmosAnimation({
         anchor: 0,
         resources: content.ibbNeoTiny1,
         scale: { x: side },
         metadata: { fast: false, t: timer.value },
         offsets: [ {} ]
      }).on('tick', async function () {
         if (this.metadata.fast) {
            const e = shadow(
               this,
               s => {
                  s.alpha.value /= 1.5;
                  if (s.alpha.value < 0.1) {
                     return true;
                  } else {
                     return false;
                  }
               },
               {
                  position: bullet.position.add(this.offsets[0]),
                  alpha: 0.6,
                  scale: 0.5,
                  rotation: bullet.rotation.value
               }
            );
            timer.post().then(() => {
               renderer.attach('menu', e.object);
               e.promise.then(() => {
                  renderer.detach('menu', e.object);
               });
            });
         } else {
            this.offsets[0].x = sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
         }
      });
      const { bullet, detach, detached } = bulletSetup(
         new CosmosHitbox<ShootableEvents, { shot: boolean; a1: number; shootable: boolean }>({
            anchor: { x: 0 },
            size: { x: 40, y: 25 },
            metadata: { shot: false, a1: 0, shootable: true },
            position: { x: box.x + side * (battler.box.size.x * 0.5) + side * distance, y: -10 },
            velocity: { y: speed },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  assets.sounds.burst.instance(timer);
                  const hs = spr.compute().divide(2);
                  const es = CosmosUtils.populate(4, index => {
                     const os = hs.multiply(index % 2, Math.floor(index / 2));
                     const rs = os.divide(hs).subtract(0.5).multiply(2);
                     const anim = new CosmosAnimation({
                        resources: side === 1 ? content.ibbNeoTiny1 : content.ibbNeoTiny1a,
                        index: spr.index,
                        anchor: rs.multiply(-1),
                        position: this,
                        scale: 1 / 2,
                        velocity: rs,
                        // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                        subcrop: CosmosImage.utils.crop({ x: os.x, y: os.y, width: hs.x, height: hs.y })
                     });
                     return {
                        anim,
                        promise: new Promise<void>(reso => {
                           anim.on('tick', function () {
                              this.alpha.value -= 0.1;
                              if (this.alpha.value <= 0) {
                                 this.alpha.value = 0;
                                 renderer.detach('menu', this);
                                 reso();
                              }
                           });
                        })
                     };
                  });
                  renderer.attach('menu', ...es.map(element => element.anim));
                  await renderer.on('render');
                  this.detach(spr);
                  await Promise.all(es.map(element => element.promise));
                  detach();
               }
            })
            .on('tick', async function () {
               if (!this.metadata.shot) {
                  switch (this.metadata.a1) {
                     case 0:
                        if (this.y > battler.SOUL.y - speed / 2) {
                           this.metadata.a1 = 1;
                           assets.sounds.node.instance(timer).gain.value = 0.2;
                           assets.sounds.frypan.instance(timer, { offset: 0.07 }).rate.value = 1.3;
                           spr.index = 1;
                           spr.metadata.fast = true;
                           this.spin.value = 10 * side;
                           this.velocity.x = 10 * side;
                           this.velocity.y = 0;
                           spr.enable();
                           timer.when(() => spr.index === 0).then(() => spr.disable());
                           const parent = new CosmosHitbox<
                              ShootableEvents,
                              {
                                 ticks: number;
                                 size: number;
                                 bullet: boolean;
                                 damage: number;
                                 shootable: boolean;
                                 shot: boolean;
                              }
                           >({
                              anchor: 0,
                              position: this,
                              scale: 0.5,
                              metadata: { ticks: 0, size: 0.1, bullet: true, damage: 6, shootable: true, shot: false },
                              priority: 4,
                              size: 3,
                              velocity: new CosmosRay(side === -1 ? 0 : 180, bulletspeed),
                              objects: [
                                 new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbExShine }).on(
                                    'tick',
                                    function () {
                                       this.index === 4 && this.disable();
                                       const e = shadow(
                                          this,
                                          s => {
                                             s.alpha.value /= 1.5;
                                             if (s.alpha.value < 0.1) {
                                                return true;
                                             } else {
                                                return false;
                                             }
                                          },
                                          { position: parent, alpha: 0.6 }
                                       );
                                       timer.post().then(() => {
                                          renderer.attach('menu', e.object);
                                          e.promise.then(() => {
                                             renderer.detach('menu', e.object);
                                          });
                                       });
                                    }
                                 )
                              ]
                           })
                              .on('shot', async function () {
                                 if (!this.metadata.shot) {
                                    this.metadata.shot = true;
                                    this.alpha.modulate(timer, 300, 0);
                                    renderer.detach('menu', this);
                                 }
                              })
                              .on('tick', function () {
                                 this.metadata.ticks++;
                                 this.metadata.size < 1 && (this.metadata.size += 0.2);
                                 this.scale.set(this.metadata.size);
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              });
                           renderer.attach('menu', parent);
                        }
                        break;
                     case 1:
                        screenCheck(this, 10) && detach();
                        break;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async blaster (side: -1 | 1 = random.next() < 0.5 ? -1 : 1, y = box.y, chargeTime = 5000, blastTime = 500) {
      const blastuh = new CosmosSprite({
         alpha: 0.25,
         anchor: { x: 1, y: 0 },
         frames: [ content.ibbBigblaster ],
         metadata: { time: null as number | null, fire: false },
         scale: { y: 0 }
      }).on('tick', function () {
         if (this.metadata.fire) {
            this.scale.y = sineWaver((this.metadata.time ??= timer.value), 800, 1, 0.8);
         }
      });
      const arm = new CosmosSprite({
         anchor: new CosmosPoint(17, 13).divide(62, 22).multiply(2).subtract(1),
         frames: [ content.ibcMettatonNeoArm1 ],
         offsets: [ {} ],
         metadata: { shake: new CosmosValue() }
      }).on('tick', function () {
         this.offsets[0].set(
            new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(this.metadata.shake.value)
         );
      });
      const holder = new CosmosObject({
         position: { x: side === -1 ? -30 : 350, y },
         scale: { x: side },
         objects: [ blastuh, arm ]
      }).on('tick', function () {
         this.x = Math.min(Math.max(this.x, -30), 350);
      });
      renderer.attach('menu', holder);
      const target = { x: side === -1 ? 0 : 320 };
      await holder.position.modulate(timer, 600, target, target);
      const sfx = assets.sounds.goner_charge.instance(timer, { offset: 1.5 });
      sfx.rate.value = 8500 / chargeTime;
      sfx.gain.value /= 4;
      sfx.gain.modulate(timer, Math.min(500, chargeTime), sfx.gain.value * 4);
      await Promise.all([
         arm.metadata.shake.modulate(timer, chargeTime, 0, 0, 2),
         blastuh.scale.modulate(timer, chargeTime, 1)
      ]);
      sfx.stop();
      new CosmosDaemon(content.avAsriel3, {
         context: audio.context,
         gain: assets.sounds.specout.instance(timer).gain.value * 0.75,
         rate: 1.2,
         router: audio.soundRouter
      }).instance(timer);
      arm.metadata.shake.value = 4;
      blastuh.alpha.value = 1;
      const blastbox = new CosmosHitbox({
         size: { x: 1000, y: 40 },
         anchor: { x: 1, y: 0 },
         metadata: { bullet: true, damage: 10, shootable: true, absorb: true }
      });
      blastuh.attach(blastbox);
      blastuh.metadata.fire = true;
      holder.gravity.set(side === -1 ? 180 : 0, 0.1);
      const permashaker = () => renderer.shake.modulate(timer, 0, 6);
      renderer.on('tick', permashaker);
      await timer.pause(blastTime);
      renderer.off('tick', permashaker);
      renderer.shake.modulate(timer, 600, 0);
      blastuh.detach(blastbox);
      await blastuh.alpha.modulate(timer, 300, 0);
      renderer.detach('menu', holder);
   },
   async fodder (
      bwsp = random.next(),
      solid = false,
      speed = 2,
      waversize = 2,
      rev: CosmosEventHost<{ rev: [] }> | null = null
   ) {
      const x = box.x1 + box.sx * bwsp;
      const { bullet, detach, detached } = mta.fodder(solid, {
         position: { x, y: -10 },
         velocity: { y: speed }
      });
      bullet.on('tick', async function () {
         this.metadata.rev && this.velocity.y > -speed && (this.velocity.y -= 0.2);
         if (!this.metadata.shot) {
            if (screenCheck(this, 10)) {
               (!rev || this.y < 120) && detach();
            } else {
               this.x = x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
            }
         }
      });
      rev?.on('rev', () => {
         bullet.metadata.rev = true;
      });
      return detached;
   },
   async hopbox (bwsp = random.next(), speed = 4, waversize = 0, hoptime = 1000, hopheight = 50) {
      const x = box.x1 + box.sx * bwsp;
      const spr = new CosmosSprite({ anchor: 0, frames: [ content.ibbBoxBulletUp ], offsets: [ {} ] });
      const hopper = new CosmosValue(0);
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            {
               shot: boolean;
               shootable: boolean;
               t: number;
               bullet: boolean;
               absorb: boolean;
               y: number;
               consecutive: number;
            }
         >({
            anchor: 0,
            size: 20,
            metadata: {
               shot: false,
               shootable: true,
               t: timer.value,
               bullet: true,
               absorb: false,
               y: -10,
               consecutive: 0
            },
            position: { x, y: -10 },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               assets.sounds.noise.instance(timer);
               hopper.value === 0 ||
                  battler.target.vars.ratings?.(
                     text.b_opponent_mettaton2.ratings.hopbox,
                     CosmosMath.bezier(Math.min(this.metadata.consecutive++, 20) / 20, 5, 1, 1)
                  );
               await hopper.modulate(timer, hoptime, hopper.value + hopheight * -2, 0);
            })
            .on('tick', async function () {
               if (screenCheck(this, 10)) {
                  detach();
               } else {
                  this.tint = hopper.value < 0 ? 0xffff00 : void 0;
                  this.position.set(
                     x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize,
                     (this.metadata.y += speed) + hopper.value
                  );
               }
            }),
         true,
         null
      );
      return detached;
   },
   async buzzgate (bwsp = random.next(), sep = 10, speed = 2, waversize = 4) {
      return new Promise<void>(res => {
         const x = box.x1 + box.sx * bwsp;
         const bloom = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0 });
         const brightnessMod = new CosmosValueLinked({
            get value () {
               return bloom.bloomScale;
            },
            set value (value) {
               bloom.bloomScale = value;
            }
         });
         const beam = new CosmosAnimation({
            anchor: 0,
            scale: { x: (sep + 6) / 20 },
            position: { y: 2 },
            resources: content.ibbBuzzlightning,
            active: true,
            filters: [ bloom ],
            area: renderer.area,
            objects: [
               new CosmosHitbox<
                  ShootableEvents,
                  { shot: boolean; bullet: boolean; damage: number; shootable: boolean }
               >({
                  anchor: 0,
                  size: { x: sep + 6, y: 4 },
                  metadata: { bullet: true, damage: 6, shootable: true, shot: false }
               }).on('shot', async function (a, b) {
                  if (!this.metadata.shot) {
                     if (b === 0 || b < 30) {
                        this.metadata.shot = true;
                        this.metadata.shootable = false;
                        assets.sounds.retract.instance(timer).rate.value = 2;
                        await brightnessMod.modulate(timer, 150, 5);
                        this.metadata.bullet = false;
                        assets.sounds.node.instance(timer).rate.value = 2;
                        beam.alpha.modulate(timer, 150);
                        pillar1.velocity.x = -16;
                        pillar1.enable();
                        pillar2.velocity.x = 16;
                        pillar2.enable();
                        await timer.when(() => buzzer.x + pillar1.x <= 0 && 320 <= buzzer.x + pillar2.x);
                        renderer.detach('menu', buzzer);
                        res();
                     }
                  }
               })
            ]
         });
         const pillar1 = new CosmosAnimation({
            anchor: { x: 1, y: 0 },
            position: { x: sep / -2 },
            resources: content.ibbBuzzpillar,
            objects: [
               new CosmosHitbox<ShootableEvents>({
                  anchor: { x: 1, y: 0 },
                  size: { x: 1000, y: 12 },
                  position: { x: -1.5 },
                  metadata: { bullet: true, damage: 5, shootable: true, absorb: true }
               }).on('shot', function (a, b) {
                  b === 0 && (buzzer.velocity.y += 0.5);
               })
            ]
         }).on('tick', function () {
            this.index === 2 && this.disable();
            (this.active || this.index > 0) && quickshadow(this, buzzer.position.add(this));
         });
         const pillar2 = new CosmosAnimation({
            anchor: { x: 1, y: 0 },
            position: { x: sep / 2 },
            resources: content.ibbBuzzpillar,
            scale: { x: -1 },
            objects: [
               new CosmosHitbox<ShootableEvents>({
                  position: { x: 1.5 },
                  anchor: { x: 1, y: 0 },
                  size: { x: 1000, y: 12 },
                  metadata: { bullet: true, damage: 5, shootable: true, absorb: true }
               }).on('shot', function (a, b) {
                  b === 0 && (buzzer.velocity.y += 0.5);
               })
            ]
         }).on('tick', function () {
            this.index === 2 && this.disable();
            (this.active || this.index > 0) && quickshadow(this, buzzer.position.add(this));
         });
         const buzzer = new CosmosObject({
            objects: [ beam, pillar1, pillar2 ],
            position: { y: -10 },
            velocity: { y: speed },
            metadata: { t: timer.value }
         }).on('tick', function () {
            if (screenCheck(this, 15)) {
               renderer.detach('menu', this);
               res();
            } else {
               this.x = x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
            }
         });
         renderer.attach('menu', buzzer);
      });
   },
   async laser (
      bwsp = 0.5,
      baserot = CosmosMath.remap(random.next(), -35, 35),
      spin = baserot / -16,
      speed = 4,
      x = box.sx,
      color: 'orange' | 'blue' = random.next() < 0.5 ? 'blue' : 'orange'
   ) {
      const rect = mta.laser(baserot, spin, speed, x, color, {
         position: { x: box.x1 + box.sx * bwsp, y: -10 }
      });
      for (const subr of rect.objects) {
         if (subr instanceof CosmosSprite) {
            subr.on('tick', function () {
               const s = quickshadow(
                  subr,
                  rect.position.add(this).shift(rect.rotation.value, 0, rect.position.value())
               );
               s.rotation.value = rect.rotation.value;
            });
         }
      }
      renderer.attach('menu', rect);
      await timer.when(() => rect.y > 260 + x / 2);
      renderer.detach('menu', rect);
   }
};

const patterns = {
   async mettaton1 (
      turn: number,
      shyren: boolean,
      maddummy: boolean,
      quizzer: CosmosSprite,
      totalFails: number,
      f?: (e: number) => Promise<void>
   ) {
      let fails = 0;
      let otherpattern = true;
      const segments = 5;
      const turnIndex = turn;
      const mode = turn < 4 ? 0 : 1;
      const resources = [ content.ibbNote, content.ibbTheMoves ][mode];
      const amt = [ 5, 9, 12, 12, 9, 12, 16, 1 ][turnIndex];
      const spd = CosmosMath.remap([ 0, 2, 1, 2, 2, 2.5, 3, 3 ][turnIndex] / 4, 1.75, 3);
      const tintColor = CosmosBitmap.color2hex(CosmosImage.utils.color.of('#faff29'));
      const positions = [ 1, 2, 3 ];
      const otherpromises = [] as Promise<void>[];
      const timeIndicator = new CosmosText({
         font: '16px DeterminationSans',
         anchor: { x: 0, y: 1 },
         position: { x: 160 },
         fill: '#fff'
      }).on('tick', function () {
         this.content = text.b_opponent_mettaton1.missIndicator.replace('$(x)', (totalFails + fails).toString());
      });
      renderer.attach('menu', timeIndicator);
      timeIndicator.position.modulate(timer, 400, timeIndicator.position.add(0, 16), timeIndicator.position.add(0, 16));
      otherpromises.push(
         new Promise(async resolve => {
            if (shyren) {
               let i = 0;
               const np =
                  turn === 3 ? (save.data.b.bullied_shyren ? 0.5 : 0.75) : save.data.b.bullied_shyren ? 0.4 : 0.6;
               const delay = (turn === 3 ? 550 : 700) * (save.data.b.bullied_shyren ? 4 : 1);
               const spawner = await commonPatterns.shyren(new CosmosPoint(55, 120), 0, 90, true);
               const otherresolver = timer.when(() => !otherpattern);
               while (otherpattern && save.data.n.hp > 0) {
                  spawner!(otherpromises, i++, Math.floor(random.next() * 6), np);
                  await Promise.race([ timer.pause(delay), otherresolver ]);
               }
            } else if (maddummy) {
               const np = turn === 6 ? 4 : 3;
               const delay = turn === 6 ? 1000 : 1500;
               const otherresolver = timer.when(() => !otherpattern);
               while (otherpattern && save.data.n.hp > 0) {
                  await commonPatterns.maddummy(false, true, np, !save.data.b.toriel_phone && turn === 6);
                  await Promise.race([ timer.pause(delay), otherresolver ]);
               }
            } else if (f) {
               while (otherpattern && save.data.n.hp > 0) {
                  otherpromises.push(
                     patterns.alphys1(
                        1,
                        timer.when(() => ftest)
                     )
                  );
                  await timer.pause(500 + random.next() * 1000);
               }
            }
            resolve();
         })
      );
      let index = 0;
      let ftest = false;
      if (f) {
         timer.pause(2000).then(async () => {
            await f(0);
            await timer.pause(3000);
            await f(1);
            await timer.pause(5000);
            ftest = true;
            await f(2);
         });
      }
      while (index++ < amt) {
         const segmentSize = battler.box.size.x / segments;
         const baseX = box.x1 + segmentSize / 2;
         f && (index = 0);
         let fx = true;
         const top = random.next() < 0.5;
         let lane = NaN;
         while (isNaN(lane) || positions.includes(lane)) {
            lane = Math.floor(random.next() * segments);
         }
         positions.push(lane);
         positions.length > 3 && positions.shift();
         const { bullet, detached, detach } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               size: 10,
               position: { x: baseX + lane * segmentSize, y: top ? box.y1 - 10 : box.y2 + 10 },
               metadata: { bullet: true, color: 'yellow', damage: 1 },
               velocity: { y: spd * (top ? 1 : -1) }
            }).on('tick', function () {
               if (ftest || (top ? this.y > box.y2 + 10 : this.y < box.y1 - 10)) {
                  fx = false;
                  detach();
               }
            })
         );
         let av = true;
         const spr = new CosmosAnimation({
            anchor: 0,
            resources,
            tint: tintColor,
            index: Math.floor(random.next() * 4)
         }).on('tick', function () {
            this.position.set(bullet);
            if (av) {
               this.alpha.value = (top ? box.y2 - this.position.y : this.position.y - box.y1) / battler.box.size.y;
            }
         });
         const last = index === amt;
         renderer.attach('menu', spr);
         await detached.then(async () => {
            av = false;
            if (ftest || fx) {
               spr.active = true;
               spr.extrapolate = false;
               spr.duration = 2;
               ftest ||
                  (assets.sounds.upgrade.instance(timer).rate.value = CosmosMath.remap(spr.alpha.value, 1.2, 1.8));
               spr.scale.modulate(timer, 600, 7);
               spr.alpha.modulate(timer, 600, 0, 0).then(() => {
                  renderer.detach('menu', spr);
               });
               if (last && fails === 0 && save.data.n.bad_lizard < 1) {
                  quizzer.metadata.thumbsup = true;
                  await timer.pause(1000);
               }
            } else {
               fails++;
               if (fails > 2) {
                  quizzer.index = 15;
               } else if (fails > 7) {
                  quizzer.index = 4;
               }
               save.data.n.hp > 0 && shake(2, 500);
               assets.sounds.bomb.instance(timer);
               spr.tint = void 0;
               spr.alpha.value = 0.5;
               spr.alpha.modulate(timer, 300, 1).then(async () => {
                  await timer.pause(300);
                  await spr.alpha.modulate(timer, 300, 0);
                  renderer.detach('menu', spr);
               });
            }
         });
         if (ftest) {
            break;
         } else if (!last && mode === 1) {
            await Promise.all([
               battler.box.rotation.modulate(timer, 150, (random.next() * 2 - 1) * 10),
               battler.box.position.modulate(
                  timer,
                  150,
                  new CosmosPoint(160, 120).add(
                     new CosmosPoint(random.next() - 0.5, random.next() - 0.5).multiply(25 * 2, 5 * 2)
                  )
               ),
               battler.box.size.modulate(
                  timer,
                  150,
                  new CosmosPoint(80, 100).add(random.next() * 40, random.next() * 40)
               )
            ]);
         }
      }
      otherpattern = false;
      ftest || (await Promise.all(otherpromises));
      timeIndicator.position
         .modulate(timer, 400, timeIndicator.position.subtract(0, 16), timeIndicator.position.subtract(0, 16))
         .then(() => {
            renderer.detach('menu', timeIndicator);
         });
      save.data.n.hp > 0 || (await timer.pause(Infinity));
      return [ fails > 2 ? 1 : 0, fails ];
   },
   async mettaton2 (ex: boolean, state: OutertaleTurnState<any>, turns = 0) {
      game.movement = true;
      const promises = [] as Promise<void>[];
      const q = (...p: Promise<void>[]) => void promises.push(...p);
      const r = (amount: number, center: number, spread: number, p: (i: number, x: number) => Promise<void>) => {
         const sp = center - ((amount - 1) * spread) / 2;
         return CosmosUtils.populate(amount, i => p(i, sp + i * spread));
      };
      if (ex) {
         switch (turns) {
            case 1: {
               await b(80, 65);
               q(mtb.sideleg(-1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(300);
               q(mtb.sideleg(-1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(1200);
               q(...r(8, box.x, 15, (i, x) => (i === 5 ? mtb.hopbox(bwsp(x), 2, 1) : mtb.fodder(bwsp(x), true, 2, 1))));
               await renderer.pause(1200);
               q(mtb.sideleg(1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(300);
               q(mtb.sideleg(1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(1200);
               q(...r(8, box.x, 15, (i, x) => (i === 2 ? mtb.hopbox(bwsp(x), 2, 1) : mtb.fodder(bwsp(x), true, 2, 1))));
               break;
            }
            case 2: {
               await b(80, 65);
               q(mtb.buzzgate(0.2));
               await renderer.pause(800);
               q(mtb.buzzgate(0.8));
               await renderer.pause(1400);
               q(...r(2, box.x, 80, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(400);
               q(...r(2, box.x, 60, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(800);
               q(...r(2, box.x, 100, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(1800);
               q(mtb.buzzgate(0.8, 8, void 0, 7));
               await renderer.pause(800);
               q(mtb.buzzgate(0.2, 8, void 0, 7));
               await renderer.pause(1400);
               q(...r(2, box.x, 100, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(400);
               q(...r(2, box.x, 60, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(800);
               q(...r(2, box.x, 80, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(1800);
               q(mtb.buzzgate(0.5, 5, 1, 10));
               break;
            }
            case 3: {
               await b(80, 65);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               await renderer.pause(1200);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(800);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(1600);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               await renderer.pause(1200);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(800);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(1600);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               break;
            }
            case 4: {
               await b(80, 65);
               q(...r(6, box.x, 15, (i, x) => (i === 2 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 1 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 4 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 3 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1600);
               q(mtb.parasol(0.8, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.7, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.6, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.5, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.4, 6));
               await renderer.pause(1000);
               q(mtb.parasol(0.2, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.3, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.4, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.5, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.6, 6));
               break;
            }
            case 5: {
               await b(282.2, 90);
               const qa = text.b_opponent_mettaton2.qa();
               const buttonz = CosmosUtils.populate(4, index => {
                  const vec = new CosmosPoint(index % 2, Math.floor(index / 2)).multiply(2).subtract(1);
                  return new CosmosHitbox({
                     anchor: 0,
                     size: 20,
                     metadata: { buttonz: true, index },
                     position: vec.multiply(25, 15).add(160),
                     objects: [
                        new CosmosAnimation({
                           anchor: 0,
                           resources: content.ibcMettatonQuizbutton,
                           index,
                           scale: 0.5,
                           tint: 0x00ff00
                        }),
                        new CosmosText({
                           position: { x: vec.x * 20 },
                           anchor: { x: vec.x * -1, y: 0 },
                           content: qa[index],
                           fill: 'white',
                           font: '16px DeterminationMono'
                        }).on('tick', function () {
                           this.offsets[0].set(Math.random() * 2 - 1, Math.random() * 2 - 1);
                        })
                     ]
                  });
               });
               const tex = new CosmosText({
                  position: { x: 160, y: box.y1 + 10 },
                  anchor: { x: 0 },
                  content: text.b_opponent_mettaton2.qq(),
                  font: '16px DeterminationMono',
                  fill: 'white'
               });
               renderer.attach('menu', ...buttonz, tex);
               let answer = -1;
               let expire = false;
               await Promise.race([
                  renderer.pause(10000),
                  timer.when(() => {
                     const hit = renderer.detect(
                        'menu',
                        battler.SOUL,
                        ...renderer.calculate('menu', o => o.metadata.buttonz)
                     );
                     if (hit.length > 0) {
                        answer = hit[0].metadata.index;
                        return true;
                     } else {
                        return expire;
                     }
                  })
               ]);
               save.data.n.state_aerialis_mttanswer = (answer + 1) as 0 | 1 | 2 | 3 | 4;
               expire = true;
               tex.fill = answer === -1 ? '#ff0000' : '#ffff00';
               for (const b of buttonz) {
                  b.objects[0].alpha.value = 0;
                  b.objects[1].fill = answer === -1 ? '#ff0000' : answer === b.metadata.index ? '#00ff00' : '#ffff00';
               }
               if (answer === -1) {
                  assets.sounds.shock.instance(timer);
                  battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.nosmooch, -100);
                  await state.dialogue(true, ...text.b_opponent_mettaton2.q0());
               } else {
                  assets.sounds.buhbuhbuhdaadodaa.instance(timer);
                  battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.smooch, 100);
                  await state.dialogue(
                     true,
                     ...[
                        text.b_opponent_mettaton2.q1,
                        text.b_opponent_mettaton2.q2,
                        text.b_opponent_mettaton2.q3,
                        text.b_opponent_mettaton2.q4
                     ][answer]()
                  );
               }
               renderer.detach('menu', ...buttonz, tex);
               break;
            }
            case 6:
            case 12:
            case 18: {
               await b(80, 65);
               const container = state.volatile.container;
               const spr = container.objects[0];
               const [ leftLeg, rightLeg, leftArm, rightArm, body, bodyHeart, head ] = spr.objects as CosmosAnimation[];
               spr.metadata.bodyActive = true;
               await timer.when(() => body.index === 5);
               bodyHeart.index = 1;
               await renderer.pause(100);
               bodyHeart.tint = 0;
               const basePosition = container.position.add(spr).add(bodyHeart).add(0, -8);
               const wt = timer.value;
               const heartAnim = new CosmosAnimation({ anchor: 0, resources: content.ibbExHeart });
               const heart = new CosmosHitbox<
                  ShootableEvents,
                  {
                     shootable: boolean;
                     sploded: boolean;
                     hits: number;
                     rng: CosmosValue;
                     done: boolean;
                     bombexempt: boolean;
                  }
               >({
                  anchor: 0,
                  size: 10,
                  position: basePosition,
                  metadata: {
                     shootable: true,
                     sploded: false,
                     hits: 0,
                     rng: new CosmosValue(),
                     done: false,
                     bombexempt: true
                  },
                  objects: [ heartAnim ],
                  priority: 20
               })
                  .on('shot', async function () {
                     if (this.metadata.sploded) {
                        assets.sounds.swallow.instance(timer);
                     } else {
                        assets.sounds.hit.instance(timer);
                        battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.hurt, 10);
                        if (++this.metadata.hits === 10 + turns / 3) {
                           if (turns > 6) {
                              assets.sounds.noise.instance(timer);
                              if (!save.data.b.a_state_armwrecker) {
                                 spr.metadata.hideArms = true;
                                 save.data.b.a_state_armwrecker = true;
                                 leftArm.gravity.set(90, 0.25);
                                 leftArm.spin.value = 1;
                                 leftArm.priority.value = -10;
                                 rightArm.gravity.set(90, 0.25);
                                 rightArm.spin.value = -1;
                                 rightArm.priority.value = -10;
                              } else {
                                 spr.metadata.hideLegs = true;
                                 save.data.b.a_state_legwrecker = true;
                                 leftLeg.gravity.set(90, 0.25);
                                 leftLeg.spin.value = 1;
                                 rightLeg.gravity.set(90, 0.25);
                                 rightLeg.spin.value = -1;
                              }
                           }
                           head.index = 16;
                           this.metadata.sploded = true;
                           this.metadata.rng.modulate(timer, 0, 2);
                           await this.scale.modulate(timer, 300, 0);
                           assets.sounds.boom.instance(timer);
                           battler.target.vars.ratings?.(text.b_opponent_mettaton2.ratings.hearthurt, 50);
                           renderer.attach(
                              'menu',
                              ...CosmosUtils.populate(13, index => {
                                 const ang = (index / 13) * 360;
                                 return new CosmosSprite({
                                    anchor: 0,
                                    position: heart,
                                    velocity: new CosmosRay(ang, 3),
                                    rotation: ang,
                                    frames: [ content.ibcMettatonExStarburst ],
                                    spin: 4,
                                    acceleration: 0.95
                                 }).on('tick', function () {
                                    this.scale.set(this.scale.multiply(0.95));
                                    if ((this.alpha.value *= 0.95) < 0.05) {
                                       renderer.detach('menu', this);
                                    }
                                 });
                              })
                           );
                           this.metadata.done = true;
                           this.scale.modulate(timer, 150, 2).then(() => {
                              this.scale.modulate(timer, 150, 1);
                              this.metadata.rng.modulate(timer, 150, 0);
                           });
                        } else {
                           this.metadata.rng.value = 2;
                        }
                        this.metadata.rng.modulate(timer, 300, 0);
                     }
                  })
                  .on('tick', function () {
                     const rng = this.metadata.rng.value;
                     heartAnim.offsets[0].set((Math.random() * 2 - 1) * rng, (Math.random() * 2 - 1) * rng);
                     if (!this.metadata.done && !this.metadata.sploded) {
                        const xmove = turns === 6 ? 3 : 6;
                        const ymove = turns === 6 ? 0 : 3;
                        this.position.set(
                           basePosition.add(sineWaver(wt, 3000, -xmove, xmove), sineWaver(wt, 1500, -ymove, ymove))
                        );
                     }
                  });
               renderer.attach('menu', heart);
               let done = false;
               await Promise.all([
                  (async () => {
                     const c = timer.when(() => done);
                     const cFrames = (t: number) => Promise.race([ c, renderer.pause(t) ]);
                     const dBullet = (f: () => void) => done || f();
                     let br = 0;
                     const bl = new CosmosObject({ metadata: { x: 0 } }).on('tick', function () {
                        this.position.set(heart.position);
                        if (this.metadata.x === 0) {
                           this.metadata.x = random.next() < 0.5 ? 2 : 4;
                           renderer.attach(
                              'menu',
                              new CosmosSprite({
                                 alpha: 0.8,
                                 anchor: { x: 0 },
                                 frames: [ content.ibbTear ],
                                 scale: 0.5,
                                 position: bl,
                                 rotation: br,
                                 velocity: new CosmosRay(br + 90, 3),
                                 objects: [
                                    new CosmosHitbox({
                                       anchor: { x: 0 },
                                       size: { x: 8, y: 12 },
                                       metadata: { bullet: true, damage: 1 }
                                    })
                                 ]
                              }).on('tick', function () {
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              }),
                              new CosmosAnimation({
                                 active: true,
                                 anchor: { x: 0 },
                                 resources: content.ibbScribble,
                                 scale: 0.5,
                                 position: bl,
                                 velocity: new CosmosRay(br + 270, 3),
                                 objects: [
                                    new CosmosHitbox({
                                       anchor: { x: 0 },
                                       size: 20,
                                       metadata: { bullet: true, damage: 3 }
                                    })
                                 ]
                              }).on('tick', function () {
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              })
                           );
                           br += 360 / 5 + 4;
                        } else {
                           this.metadata.x--;
                        }
                     });
                     renderer.attach('menu', bl);
                     switch (turns) {
                        case 6: {
                           while (!done) {
                              dBullet(() => q(mtb.buzzgate(random.next(), 12, 2, 4)));
                              await cFrames(3000);
                           }
                           break;
                        }
                        case 12: {
                           await cFrames(1000);
                           while (!done) {
                              dBullet(() => q(mtb.parasol(void 0, 6)));
                              await cFrames(1000);
                           }
                           break;
                        }
                        case 18: {
                           while (!done) {
                              const t = Math.floor(random.next() * 6);
                              dBullet(() =>
                                 q(
                                    ...r(6, box.x, 15, (i, x) =>
                                       i === t ? mtb.bomb(bwsp(x), 3) : mtb.fodder(bwsp(x), true, 3, 0)
                                    )
                                 )
                              );
                              await cFrames(2000);
                           }
                           break;
                        }
                     }
                     renderer.detach('menu', bl);
                  })(),
                  Promise.race([
                     renderer.pause(7000 + turns * 500),
                     timer.when(() => heart.metadata.sploded || heart.metadata.done)
                  ]).then(async () => {
                     done = true;
                     if (heart.metadata.sploded) {
                        await timer.when(() => heart.metadata.done);
                     } else {
                        heart.metadata.done = true;
                     }
                     if (turns > 6) {
                        const susRate = turns === 12 ? 0.9 : 0.8;
                        spr.metadata.tickSpeed.modulate(timer, 600, susRate);
                        battler.music?.rate.modulate(timer, 600, susRate);
                     }
                     await heart.position.modulate(timer, 300, basePosition, basePosition);
                     await renderer.pause(100);
                     renderer.detach('menu', heart);
                     bodyHeart.tint = void 0;
                     await renderer.pause(100);
                     bodyHeart.index = 0;
                     spr.metadata.bodyActive = false;
                     head.index = turns === 6 ? 0 : turns === 12 ? 15 : 14;
                  })
               ]);
               break;
            }
            case 7:
            case 8: {
               await b(80, 65);
               const rotTime = turns === 7 ? 1000 : 750;
               const rotSpread = 45;
               const rotAmount = turns === 7 ? 13 : 26;
               const rotEvents = new CosmosEventHost<{ l: []; r: [] }>();
               const colorRatio = 1 / 2;
               const colorGen = () => (random.next() < colorRatio ? 0 : 1);
               const colorSequences = CosmosUtils.populate(2, () => [ 1, ...CosmosUtils.populate(4, colorGen) ]);
               const spawnpoints = CosmosUtils.populate(2, side => {
                  const rotStep = rotSpread * [ 1, -1 ][side];
                  const rotBase = [ 0, 180 ][side] - rotStep * 2.5;
                  const colorSequence = colorSequences[side];
                  const lasers = new CosmosObject({
                     position: { x: [ -70, 70 ][side], y: 57 },
                     objects: CosmosUtils.populate(6, index =>
                        new CosmosRectangle({
                           alpha: index === 0 ? 0 : 1,
                           size: { x: 1000, y: 2 },
                           anchor: { y: 0 },
                           metadata: { index },
                           fill: '#fff',
                           objects: [
                              new CosmosHitbox({
                                 size: { x: 1000, y: 2 },
                                 metadata: { bullet: true, damage: 5, color: 'white' }
                              }).on('tick', function () {
                                 this.metadata.color = [ 'white', 'blue' ][
                                    (colorSequence[index] + (disco.metadata.shot ? 1 : 0)) % 2
                                 ];
                              })
                           ],
                           rotation: rotBase + rotStep * index
                        }).on('tick', function () {
                           this.fill = [ '#ffffff', '#00a2e8' ][
                              (colorSequence[index] + (disco.metadata.shot ? 1 : 0)) % 2
                           ];
                        })
                     )
                  });
                  rotEvents.on(side === 0 ? 'l' : 'r', async function () {
                     await Promise.all([
                        lasers.objects[0].alpha.modulate(timer, rotTime, 1),
                        lasers.objects[4].alpha.modulate(timer, rotTime, 0),
                        lasers.rotation.modulate(timer, rotTime, 0, rotStep, rotStep)
                     ]);
                     colorSequence.pop();
                     colorSequence.unshift(colorGen());
                     lasers.objects[0].alpha.value = 0;
                     lasers.objects[4].alpha.value = 1;
                     lasers.rotation.value = 0;
                  });
                  return lasers;
               });
               const discoAnim = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0 },
                  resources: content.ibcMettatonDjdisco
               });
               const disco = new CosmosHitbox<ShootableEvents, { shot: boolean; shootable: boolean }>({
                  position: battler.box.position.subtract(0, 57),
                  anchor: { x: 0 },
                  objects: [ ...spawnpoints, discoAnim ],
                  metadata: { shootable: true, shot: false },
                  size: { x: 14, y: 10 }
               }).on('shot', function () {
                  assets.sounds.noise.instance(timer);
                  if (this.metadata.shot) {
                     this.metadata.shot = false;
                     discoAnim.use(content.ibcMettatonDjdisco);
                  } else {
                     this.metadata.shot = true;
                     discoAnim.use(content.ibcMettatonDjdiscoInv);
                  }
               });
               renderer.attach('menu', disco);
               await renderer.pause(1000);
               let i = 0;
               while (i < rotAmount) {
                  await Promise.all(rotEvents.fire(i++ % 2 === 0 ? 'l' : 'r'));
               }
               renderer.detach('menu', disco);
               break;
            }
            case 9:
            case 10: {
               await b(56, 65);
               let index = 0;
               const spede = turns === 9 ? 2.5 : 3;
               const total = turns === 9 ? 5 : 9;
               const thymeAndYesImPurposefullyMisspellingVariablesBecauseImSoPhreakingBoredThanksForAskingOhYoureSoGodDamnWelcomeOkayBye =
                  turns === 9 ? 1250 : 1000;
               while (index < total) {
                  const t = Math.floor(random.next() * 4);
                  q(
                     ...r(4, box.x, 15, (i, x) =>
                        i === t ? mtb.bomb(bwsp(x), spede) : mtb.fodder(bwsp(x), true, spede, 0)
                     )
                  );
                  await renderer.pause(
                     thymeAndYesImPurposefullyMisspellingVariablesBecauseImSoPhreakingBoredThanksForAskingOhYoureSoGodDamnWelcomeOkayBye
                  );
                  index++;
               }
               break;
            }
            case 11: {
               if (save.data.n.bad_lizard < 2) {
                  await b(80, 65);
                  const urb = new CosmosSprite({
                     alpha: 0.7,
                     anchor: 0,
                     scale: 0.5,
                     frames: [ content.ibcMettatonHappybreaktime ],
                     metadata: { tx: 15 },
                     position: box
                  }).on('tick', function () {
                     if (this.metadata.tx === 0) {
                        this.metadata.tx = 15;
                        this.alpha.value = this.alpha.value > 0 ? 0 : 0.7;
                     }
                     this.metadata.tx--;
                  });
                  renderer.attach('menu', urb);
                  await renderer.pause(5000);
                  renderer.detach('menu', urb);
                  break;
               } else {
                  await b(80, 65);
                  let ind = 18;
                  while (ind > 0) {
                     q(mtb.buzzgate(CosmosMath.remap(random.next(), 0.25, 0.75), ind + 5, 2, 2));
                     await renderer.pause(500);
                     ind--;
                  }
                  break;
               }
            }
            case 13:
            case 19:
            case 20: {
               await b(80, 65);
               const cnt = turns === 13 ? 19 : turns === 19 ? 14 : 9;
               const elements = CosmosUtils.populate(cnt, index => index);
               while (elements.length > 0) {
                  if (elements.length % 5 === 0) {
                     if (turns === 13) {
                        q(mtb.buzzgate(random.next(), 8, void 0, 7));
                     } else {
                        q(mtb.laser());
                     }
                  }
                  q(mtb.parasol(elements.splice(random.next() * elements.length, 1)[0] / cnt, 3));
                  await renderer.pause(turns === 13 ? 700 : turns === 19 ? 1400 : 2100);
               }
               break;
            }
            case 14:
            case 15: {
               await b(80, 65);
               const spr = new CosmosAnimation({
                  anchor: 1,
                  scale: 1 / 2,
                  position: { x: box.x2 - 2.5, y: box.y2 - 2.5 },
                  metadata: { tx: 15 },
                  resources: content.ibcMettatonRecbox
               }).on('tick', function () {
                  if (this.metadata.tx === 0) {
                     this.metadata.tx = 15;
                     this.alpha.value = this.alpha.value > 0 ? 0 : 1;
                  }
                  this.metadata.tx--;
               });
               renderer.attach('menu', spr);
               const rev = new CosmosEventHost<{ rev: [] }>();
               const spd = turns === 14 ? 4 : 5;
               const elements = CosmosUtils.populate(6, index => index);
               while (elements.length > 0) {
                  const t = elements.splice(random.next() * elements.length, 1)[0];
                  q(...r(6, box.x, 15, (i, x) => mtb.fodder(bwsp(x), i !== t, spd, 0, rev)));
                  elements.length > 0 && (await renderer.pause(2000));
               }
               rev.fire('rev');
               spr.index = 1;
               Promise.all(promises).then(() => {
                  renderer.detach('menu', spr);
               });
               break;
            }
            case 16:
            case 17: {
               await b(80, 65);
               let elements = turns === 17 ? 20 : 14;
               const sp = turns === 17 ? 4 : 2;
               while (elements > 0) {
                  if (elements % 3 === 0) {
                     q(mtb.laser());
                  }
                  const bb = turns === 17 ? Math.floor(random.next() * 4) : -1;
                  q(...r(4, box.x, 25, (i, x) => (bb === i ? mtb.bomb(bwsp(x), sp) : mtb.fodder(bwsp(x), false, sp))));
                  await renderer.pause(turns === 17 ? 700 : 400);
                  elements--;
               }
               break;
            }
            default:
               await renderer.pause(450);
         }
      } else {
         switch (Math.floor(random.next() * 3)) {
            case 0: {
               await b(80, 65);
               let i = 32;
               while (i > 0) {
                  await renderer.pause(150);
                  q(mtb.fodder(void 0, false, 3, 4));
                  i--;
               }
               break;
            }
            case 1: {
               await b(95, 65);
               let i = 2;
               while (i > 0) {
                  await renderer.pause(1200);
                  q(mtb.buzzgate(void 0, 15, 3, 4));
                  i--;
               }
               break;
            }
            case 2: {
               await b(65, 65);
               let i = 4;
               while (i > 0) {
                  await renderer.pause(1800);
                  const t = Math.floor(random.next() * 4);
                  q(...r(4, box.x, 15, (i, x) => (i === t ? mtb.bomb(bwsp(x), 3) : mtb.fodder(bwsp(x), false, 3, 0))));
                  i--;
               }
               break;
            }
         }
      }
      await Promise.all(promises);
   },
   async mettaton3 (turns: number) {
      game.movement = true;
      let hits = 0;
      let ended = false;
      let boxed = false;
      const promises = [] as Promise<void>[];
      const shielder = (async () => {
         await timer.when(() => boxed);
         const segments = 5;
         const tintColor = CosmosBitmap.color2hex(CosmosImage.utils.color.of('#faff29'));
         const positions = [ 1, 2, 3 ];
         const timeIndicator = new CosmosText({
            font: '16px DeterminationSans',
            anchor: { x: 0, y: 1 },
            position: { x: 160 },
            fill: '#fff',
            filters: [ new OutlineFilter(2, 0, 1, 1, false) ]
         }).on('tick', function () {
            this.content = text.b_opponent_mettaton2.hitIndicator.replace('$(x)', hits.toString());
            if (hits === 10) {
               this.fill = '#faff29';
            }
         });
         renderer.attach('menu', timeIndicator);
         timeIndicator.position.modulate(
            timer,
            400,
            timeIndicator.position.add(0, 16),
            timeIndicator.position.add(0, 16)
         );
         while (!ended && hits < 10) {
            const segmentSize = battler.box.size.x / segments;
            const baseX = box.x1 + segmentSize / 2;
            let fx = true;
            const top = random.next() < 0.5;
            let lane = NaN;
            while (isNaN(lane) || positions.includes(lane)) {
               lane = Math.floor(random.next() * segments);
            }
            positions.push(lane);
            positions.length > 3 && positions.shift();
            const { bullet, detached, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 10,
                  position: { x: baseX + lane * segmentSize, y: top ? box.y1 - 10 : box.y2 + 10 },
                  metadata: { bullet: true, color: 'yellow', damage: 1 },
                  velocity: { y: top ? 1.5 : -1.5 }
               }).on('tick', function () {
                  if (top ? this.y > box.y2 + 10 : this.y < box.y1 - 10) {
                     fx = false;
                     detach();
                  }
               })
            );
            let av = true;
            const spr = new CosmosAnimation({
               anchor: 0,
               resources: content.ibbShield,
               tint: tintColor,
               index: Math.floor(random.next() * 4)
            }).on('tick', function () {
               this.position.set(bullet);
               if (av) {
                  this.alpha.value = (top ? box.y2 - this.position.y : this.position.y - box.y1) / battler.box.size.y;
               }
            });
            renderer.attach('menu', spr);
            await detached;
            av = false;
            if (fx) {
               hits++;
               spr.active = true;
               spr.extrapolate = false;
               spr.duration = 2;
               assets.sounds.upgrade.instance(timer).rate.value = CosmosMath.remap(spr.alpha.value, 1.2, 1.8);
               spr.scale.modulate(timer, 600, 7);
               spr.alpha.modulate(timer, 600, 0, 0).then(() => {
                  renderer.detach('menu', spr);
               });
            } else {
               save.data.n.hp > 0 && shake(2, 500);
               assets.sounds.bomb.instance(timer);
               spr.tint = void 0;
               spr.alpha.value = 0.5;
               spr.alpha.modulate(timer, 300, 1).then(async () => {
                  await timer.pause(300);
                  await spr.alpha.modulate(timer, 300, 0);
                  renderer.detach('menu', spr);
               });
            }
            !ended && box.sy < 65 && (await timer.pause(CosmosMath.remap(box.sy, 0, 1000, 65, 24)));
         }
         ended || (await timer.when(() => ended));
         await timeIndicator.position.modulate(
            timer,
            400,
            timeIndicator.position.subtract(0, 16),
            timeIndicator.position.subtract(0, 16)
         );
         renderer.detach('menu', timeIndicator);
      })();
      const q = (...p: Promise<void>[]) => void promises.push(...p);
      let trueTurns = 0;
      const recentTurns: number[] = (battler.volatile[0].container.metadata.recent ??= []);
      if (turns < 13) {
         trueTurns = turns;
      } else if (turns % 3 === 0) {
         trueTurns = ((turns - 1) % 12) + 1;
      } else {
         while (trueTurns === 0 || recentTurns.includes(trueTurns)) {
            trueTurns = [ 1, 2, 4, 5, 7, 8, 10, 11 ][Math.floor(random.next() * 8)];
         }
      }
      recentTurns.push(trueTurns);
      recentTurns.length > 5 && void recentTurns.shift();
      switch (trueTurns) {
         case 1: {
            await b(80, 65);
            boxed = true;
            let ii = 0;
            while (ii++ < 4) {
               let angle = 0;
               let index = 0;
               const time = timer.value;
               const extent = new CosmosValue(210);
               const detacs = [] as (() => void)[];
               const subpromises = [] as Promise<void>[];
               while (index < 12) {
                  const si = index++;
                  const { bullet, detached, detach } = mta.fodder(false);
                  subpromises.push(detached);
                  detacs.push(detach);
                  bullet.on('tick', function () {
                     this.position.set(
                        battler.box.position.endpoint(
                           angle + (si / 12) * 360,
                           sineWaver(time, 3000, extent.value - 4, extent.value + 4)
                        )
                     );
                  });
               }
               extent.modulate(timer, 3000, 8, 8).then(async () => {
                  await renderer.pause(2000);
                  await extent.modulate(timer, 3000, 8, 210);
                  for (const detach of detacs) {
                     detach();
                  }
               });
               const ticker = () => (angle += 4);
               renderer.on('render', ticker);
               promises.push(...subpromises);
               await Promise.race([
                  timer.pause(1000),
                  Promise.all(subpromises).then(() => {
                     renderer.off('render', ticker);
                  })
               ]);
            }
            break;
         }
         case 2: {
            await b(80, 65);
            boxed = true;
            let i = 5;
            let s = random.next() < 0.5 ? -1 : 1;
            while (i > 0) {
               q(mtb.sidearm(s as 1 | -1, 160, -50, 3, 60, 0));
               await renderer.pause(200);
               q(mtb.sidearm(s as 1 | -1, 160, -50, 3, 60, 0));
               await renderer.pause(1500);
               i--;
               s *= -1;
            }
            break;
         }
         case 3:
         case 9: {
            await b(80, 65);
            boxed = true;
            q(mtb.blaster(void 0, void 0, 9000));
            let i = 15;
            while (i > 0) {
               q(mtb.meteor(random.next(), void 0, 800));
               await renderer.pause(500);
               i--;
            }
            break;
         }
         case 4: {
            await b(80, 65);
            boxed = true;
            let i = 8;
            while (i > 0) {
               q(mtb.rocket());
               await renderer.pause(1000);
               i--;
            }
            break;
         }
         case 5: {
            await b(80, 65);
            boxed = true;
            const cnt = 120;
            const elements = CosmosUtils.populate(cnt, index => index);
            while (elements.length > 0) {
               const { bullet, detach, detached } = mta.fodder(true, {
                  position: {
                     x: box.x1 + box.sx * (elements.splice(random.next() * elements.length, 1)[0] / cnt),
                     y: -10
                  },
                  velocity: { y: 2 },
                  gravity: { angle: 90, extent: 0.02 }
               });
               bullet.on('tick', function () {
                  (this.velocity.x !== 0 || this.y > box.y1) &&
                     boxCheck(this, 10) &&
                     this.velocity.set(this.velocity.multiply(1.1));
                  screenCheck(this, 10) && detach();
               });
               q(detached);
               elements.length % 2 === 0 && (await renderer.pause(150));
            }
            break;
         }
         case 6:
         case 12: {
            await b(80, 65);
            boxed = true;
            const container = battler.volatile[0].container;
            const spr = container.objects[0];
            const body = spr.objects[5] as CosmosAnimation;
            spr.metadata.bodyActive = true;
            await timer.when(() => body.index === 5);
            const basePosition = container.position.add(spr).add(body).add(-1, 56.5);
            const wt = timer.value;
            const heartAnim = new CosmosAnimation({ anchor: 0, resources: content.ibcMettatonNeoHeart });
            const heart = new CosmosHitbox<ShootableEvents, {}>({
               anchor: 0,
               size: 10,
               position: basePosition,
               objects: [ heartAnim ],
               priority: 20
            }).on('tick', function () {
               this.position.set(basePosition.add(sineWaver(wt, 3000, -6, 6), sineWaver(wt, 1500, -3, 3)));
            });
            renderer.attach('menu', heart);
            await timer.pause(100);
            heartAnim.index = 1;
            let done = false;
            await Promise.all([
               (async () => {
                  const c = timer.when(() => done);
                  const cFrames = (t: number) => Promise.race([ c, renderer.pause(t) ]);
                  const dBullet = (f: () => void) => done || f();
                  let br = 0;
                  const bl = new CosmosObject({ metadata: { x: 0 } }).on('tick', function () {
                     this.position.set(heart.position);
                     if (this.metadata.x === 0) {
                        this.metadata.x = random.next() < 0.5 ? 2 : 4;
                        renderer.attach(
                           'menu',
                           ...CosmosUtils.populate(2, index =>
                              new CosmosHitbox<
                                 ShootableEvents,
                                 { bullet: boolean; damage: number; shootable: boolean }
                              >({
                                 anchor: 0,
                                 size: { x: 30, y: 5 },
                                 metadata: { bullet: true, damage: 6, shootable: true },
                                 scale: { x: 1 / 16 },
                                 position: bl,
                                 rotation: br + index * 180,
                                 velocity: new CosmosRay(br + index * 180, 5),
                                 objects: [ new CosmosSprite({ alpha: 0.8, anchor: 0, frames: [ content.ibbDummyknife ] }) ]
                              })
                                 .on('shot', function (a, b) {
                                    this.velocity.set(this.velocity.add(new CosmosRay(a, 15 / (b / 5))));
                                    const { x, y } = new CosmosRay(a, 1);
                                    this.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                                 })
                                 .on('tick', function () {
                                    if (screenCheck(this, 10)) {
                                       renderer.detach('menu', this);
                                    } else {
                                       this.scale.x < 1 && (this.scale.x *= 2);
                                       const e = quickshadow(this.objects[0] as CosmosSprite, this, void 0, 0.4);
                                       e.rotation.value = this.rotation.value;
                                    }
                                 })
                           )
                        );
                        br += 360 / 5 + 4;
                     } else {
                        this.metadata.x--;
                     }
                  });
                  renderer.attach('menu', bl);
                  switch (trueTurns) {
                     case 6: {
                        while (!done) {
                           dBullet(() => q(mtb.meteor()));
                           await cFrames(1000);
                        }
                        break;
                     }
                     case 12: {
                        await cFrames(1000);
                        while (!done) {
                           dBullet(() => q(mtb.paratrooper(void 0, 10)));
                           await cFrames(1000);
                        }
                        break;
                     }
                  }
                  renderer.detach('menu', bl);
               })(),
               renderer.pause(7000 + trueTurns * 500).then(async () => {
                  done = true;
                  await heart.position.modulate(timer, 300, basePosition, basePosition);
                  await renderer.pause(100);
                  heartAnim.index = 0;
                  await renderer.pause(100);
                  spr.metadata.bodyActive = false;
                  await timer.when(() => body.index === 4);
                  renderer.detach('menu', heart);
               })
            ]);
            break;
         }
         case 7: {
            await b(80, 65);
            boxed = true;
            let i = 8;
            while (i > 0) {
               q(mtb.paratrooper(void 0, 10));
               await renderer.pause(300);
               q(mtb.paratrooper(void 0, 10));
               await renderer.pause(300);
               q(mtb.sidearm(void 0, 160, -50, 3, 60, 0));
               await renderer.pause(1200);
               i--;
            }
            break;
         }
         case 8: {
            await b(120, 65);
            boxed = true;
            const cl = 5;
            const sd = box.sx / cl;
            const rex = CosmosUtils.populate(cl - 1, index => {
               const rect = (
                  mta.laser(90, 0, 0, 120, 'white', {
                     position: { x: box.x1 + (index + 1) * sd, y: box.y }
                  }) as CosmosHitbox<ShootableEvents>
               )
                  .on('shot', function (a, b) {
                     new CosmosPoint().endpoint(a, b).abs().x < sd && (this.metadata.shottimer = timer.value);
                  })
                  .on('tick', function () {
                     if (timer.value - 750 > (this.metadata.shottimer ??= -Infinity)) {
                        if (this.metadata.color !== 'white') {
                           this.metadata.color = 'white';
                           this.objects[0].fill = '#fff';
                        }
                     } else if (this.metadata.color !== 'orange') {
                        this.metadata.color = 'orange';
                        this.objects[0].fill = '#ff993d';
                        assets.sounds.noise.instance(timer);
                     }
                  });
               rect.metadata.shootable = true;
               return rect;
            });
            renderer.attach('menu', ...rex);
            await renderer.pause(500);
            let i = 9;
            while (i > 0) {
               const si = Math.floor((battler.SOUL.x - box.x1) / sd);
               q(mtb.meteor(bwsp(box.x1 + sd * (si + 0.5)), void 0, 1000));
               await renderer.pause(200);
               const asi = si + (random.next() < 0.5 ? -1 : 1);
               if (asi > -1 && asi < cl && !(si === 0 && asi === 1) && !(si === cl - 1 && asi === cl - 2)) {
                  q(mtb.meteor(bwsp(box.x1 + sd * (asi + 0.5)), void 0, 1000));
               }
               await renderer.pause(1500);
               i--;
            }
            Promise.all(promises).then(() => {
               renderer.detach('menu', ...rex);
            });
            break;
         }
         case 10: {
            await b(80, 65);
            boxed = true;
            let i = 4;
            while (i > 0) {
               q(mtb.rocket());
               await renderer.pause(1000);
               q(mtb.paratrooper(void 0, 10));
               await renderer.pause(200);
               q(mtb.paratrooper(void 0, 10));
               await renderer.pause(200);
               q(mtb.paratrooper(void 0, 10));
               await renderer.pause(1200);
               i--;
            }
            break;
         }
         case 11: {
            await b(24, 24);
            boxed = true;
            let i = 10;
            while (i > 0) {
               const DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE = CosmosMath.remap(
                  random.next(),
                  60,
                  100
               );
               const sh = new CosmosValue();
               const side = random.next() < 0.5 ? -1 : 1;
               let activated = false;
               const { bullet, detach, detached } = mta.fodder(true, {
                  position: { x: 160 + side * 100, y: 250 }
               });
               const carrier = new CosmosSprite({
                  anchor: { x: 0 },
                  frames: [ content.ibbNeoTiny2 ],
                  position: { x: bullet.x }
               });
               renderer.attach('menu', carrier);
               bullet.on('tick', function () {
                  if (screenCheck(this, 10)) {
                     detach();
                  } else if (!activated) {
                     if (this.y > DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE) {
                        const ramp = CosmosMath.bezier(
                           CosmosMath.remap(
                              this.y,
                              0,
                              1,
                              250,
                              DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
                           ),
                           0,
                           0,
                           1
                        );
                        const diff = CosmosMath.remap(ramp, 6, 2);
                        this.y -= diff;
                        carrier.y = this.y + this.scale.y * 12;
                        sh.value = ramp;
                     } else {
                        activated = true;
                        sh.value = 0;
                        carrier.spin.modulate(timer, 100, side * -16);
                        this.spin.modulate(timer, 50, side * -12);
                        this.velocity.set(new CosmosPoint().endpoint(this.position.angleTo(battler.SOUL), 12));
                        carrier.alpha.modulate(timer, 1000, 0).then(() => {
                           renderer.detach('main', carrier);
                        });
                     }
                     this.offsets[4].set(
                        new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(sh.value)
                     );
                     carrier.offsets[4].set(this.offsets[4]);
                  } else {
                     renderer.attach(
                        'menu',
                        new CosmosRectangle({
                           size: (this.objects[0] as CosmosRectangle).size,
                           scale: this.scale,
                           fill: this.objects[0].fill,
                           stroke: this.objects[0].stroke,
                           border: this.objects[0].border,
                           rotation: this.rotation.value,
                           position: this,
                           alpha: 0.7,
                           anchor: 0
                        }).on('tick', function () {
                           if ((this.alpha.value *= 0.6) < 0.04) {
                              renderer.detach('menu', this);
                           }
                        })
                     );
                  }
               });
               q(detached);
               await timer.pause(1200);
               i--;
            }
            break;
         }
      }
      await Promise.all(promises);
      ended = true;
      await shielder;
      if (hits > 0) {
         const volatile = battler.volatile[0];
         const vars = volatile.vars;
         vars.ap ??= 0;
         const startAP = 1 - vars.ap;
         vars.ap += hits / 200;
         const trueDamage = startAP - (1 - vars.ap);
         vars.ap > 1 && (vars.ap = 1);

         // sprite calculation
         const next = volatile.container.objects[0];
         const half = new CosmosPoint((next.metadata.size as CosmosPointSimple) || next.compute()).divide(2);
         const base = volatile.container.position.add(next.position.subtract(half.add(half.multiply(next.anchor))));

         const barsize = Math.max(half.x * next.scale.x * 2, 60) * 1.25;
         const healthbar = new CosmosRectangle({
            anchor: 0,
            position: base.add(half.x, -7).clamp({ x: -Infinity, y: 25 }, { x: Infinity, y: 215 }),
            stroke: 'black',
            fill: '#404040',
            size: { y: 7.5, x: barsize },
            border: 0.5
         });
         const healthbarFill = new CosmosRectangle({
            anchor: { y: 0 },
            position: { x: barsize / -2 + 0.25 },
            fill: '#007fff',
            stroke: 'transparent',
            size: { y: 7, x: Math.ceil((barsize - 0.5) * startAP) }
         });
         const dmgtext = Math.round(trueDamage * 200).toString();
         const indicator = new CosmosHitbox({
            position: { x: (dmgtext.length * 14 + (dmgtext.length - 1)) / -2 },
            objects: dmgtext.split('').map((value, index) => {
               const anim = new CosmosAnimation({
                  anchor: { y: 1 },
                  scale: 0.5,
                  position: { x: index * 15, y: -3.875 - 0.5 },
                  resources: content.ibuIndicator
               });
               anim.index = +value;
               return anim;
            })
         });
         healthbar.attach(healthbarFill, indicator);

         // strike animations
         volatile.container.objects[0] = next;
         renderer.attach('menu', healthbar);
         indicator.position.modulate(timer, 850, { y: -20 }, { y: -20 }, { y: 2 }).then(() => {
            indicator.position.modulate(timer, 100, {}, { y: 0 });
         });
         healthbarFill.size.modulate(timer, 400, {
            x: Math.ceil((barsize - 0.5) * (1 - vars.ap) * 2) / 2
         });

         // strike sfx
         assets.sounds.strike.instance(timer);
         const striker = assets.sounds.superstrike.instance(timer);
         striker.gain.value = CosmosMath.bezier(hits / 10, 0, 0, 0, 0, assets.sounds.superstrike.gain);
         hits === 10 && timer.pause(300).then(() => heal(4));
         let index = 30;
         const origin = next.position.y;
         const zbf = next.filters![2] as ZoomBlurFilter;
         zbf.strength = 0.25;
         while (index-- > 0) {
            if (index > 0) {
               next.position.y = origin + Math.floor(index / 3) * (Math.floor((index % 4) / 2) * 2 - 1);
            } else {
               next.position.y = origin;
            }
            await renderer.on('tick');
            zbf.strength *= 3 / 4;
         }
         zbf.strength = 0;

         // end animations
         renderer.detach('menu', healthbar);
      }
      return hits;
   },
   async alphys1 (idx: number, ftester = (async () => {})()) {
      switch (idx) {
         case 0: {
            const bloom = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0 });
            const brightnessMod = new CosmosValueLinked({
               get value () {
                  return bloom.bloomScale;
               },
               set value (value) {
                  bloom.bloomScale = value;
               }
            });
            const lighter = new CosmosAnimation({
               alpha: 0,
               scale: { y: 20 },
               resources: content.ibbBluelightning,
               position: 160,
               anchor: 0,
               active: true,
               filters: [ bloom ],
               area: renderer.area
            });
            renderer.detach('menu', battler.SOUL);
            battler.bullets.attach(lighter, battler.SOUL);
            await Promise.all([ lighter.alpha.modulate(timer, 600, 1, 1), lighter.scale.modulate(timer, 600, 1, 1, 1) ]);
            assets.sounds.smallelectroshock.instance(timer);
            const recto = new CosmosRectangle({
               alpha: 0,
               priority: 10000,
               fill: 'white',
               size: { x: 320, y: 240 }
            });
            battler.bullets.attach(recto);
            recto.alpha.modulate(timer, 300, 1, 1);
            await brightnessMod.modulate(timer, 500, 10);
            battler.SOUL.metadata.color = 'cyan';
            lighter.alpha.value = 0;
            await recto.alpha.modulate(timer, 300, 0);
            battler.bullets.objects.splice(0, battler.bullets.objects.length);
            renderer.attach('menu', battler.SOUL);
            await timer.pause(1000);
            break;
         }
         case 1: {
            let st = 0;
            const dir = random.next() < 0.5 ? 0 : 1;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 2 },
                  size: 10,
                  velocity: { x: [ 1, -1 ][dir] },
                  position: pastBox(10, [ 3, 1 ][dir]).position,
                  objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ]
               }).on('tick', function () {
                  switch (st) {
                     case 0:
                        if (Math.abs(box.x - this.x) < box.sx / 2 - 10) {
                           const c = assets.sounds.stab.instance(timer);
                           c.rate.value = 1.3;
                           c.gain.value = 0.3;
                           this.velocity.x = [ 6, -6 ][dir];
                           st = 1;
                        }
                        break;
                     case 1:
                        const e = shadow(
                           this.objects[0] as CosmosSprite,
                           s => {
                              s.alpha.value /= 1.5;
                              if (s.alpha.value < 0.2) {
                                 return true;
                              } else {
                                 return false;
                              }
                           },
                           { position: this, alpha: 0.6 }
                        );
                        timer.post().then(() => {
                           renderer.attach('menu', e.object);
                           e.promise.then(() => {
                              renderer.detach('menu', e.object);
                           });
                        });
                        screenCheck(this, 10) && detach();
                        break;
                  }
               }),
               true
            );
            ftester.then(() => detach());
            await detached;
            break;
         }
      }
   },
   async alphys2 () {
      //
   },
   async rg (
      sparable: boolean,
      progress: 0 | 1 | 2,
      killed: -1 | 0 | 1,
      modifier: 'cf' | 'gr' | null,
      totalTugScore: number
   ) {
      if (sparable || (killed > -1 && progress === 2)) {
         await timer.pause(450);
         return;
      }
      let tugScore = 0;
      const bcount = [ 9, 14, 4 ][killed + 1];
      const bdelay = [ 1000, 500, 1500 ][killed + 1];
      const bdmg = [ 5, 6, 4 ][killed + 1];
      const p = 3000;
      const t = timer.value;
      const maxcolor = colormix(0x00ff00, 0xff0000, 0.8);
      const special = new CosmosHitbox({
         anchor: 0,
         size: 16,
         metadata: { detected: false },
         objects: [
            new CosmosSprite({ anchor: 0, frames: [ content.ibcRGFist ] }).on('tick', function () {
               this.tint = colormix(0x00ff00, maxcolor, Math.min(Math.max(totalTugScore + tugScore, 0), 1));
            })
         ]
      }).on('tick', function () {
         const v = sineWaver(t, p, -1, 1, 1 / 8);
         this.position.set(battler.box.position.add(v * 50, sineWaver(t, p / 2, -1, 1, 1 / 8) * 20));
         this.scale.set(1, CosmosMath.bezier(Math.abs(v), 1, 1, 0.5));
         const detected =
            renderer.detect('menu', battler.SOUL, ...renderer.calculate('menu', hitbox => hitbox === this)).length > 0;
         if (detected !== this.metadata.detected) {
            if ((this.metadata.detected = detected)) {
               assets.sounds.bell.instance(timer);
               tugScore += 1 / 12;
            }
         }
      });
      modifier === 'gr' && renderer.attach('menu', special);
      if (random.next() < 0.5) {
         await battler.sequence(2, async (promises, index1) => {
            if (index1 === killed) {
               return;
            }
            const bshake = index1 === 0 && (killed === 1 || progress === 1);
            const region = new CosmosPoint([ box.x1, box.x ][index1], box.y1);
            promises.push(
               battler.sequence(bcount, async promises => {
                  const yfactor = random.next() * 20;
                  const shad = new CosmosSprite({
                     alpha: 0,
                     anchor: 0,
                     frames: [ content.ibbStardrop ],
                     position: region.add(
                        random.next() * (box.sx / 2),
                        random.next() < 0.5 ? yfactor : box.sy - yfactor
                     )
                  });
                  renderer.attach('menu', shad);
                  promises.push(
                     (async () => {
                        shad.alpha.modulate(timer, 1000, 0.7);
                        await timer.pause(400);
                        const { bullet, detach, detached } = bulletSetup(
                           new CosmosHitbox({
                              area: renderer.area,
                              position: { x: [ -10, 330 ][index1], y: shad.y },
                              anchor: 0,
                              size: 8,
                              rotation: 45,
                              metadata: { bullet: true, damage: bdmg },
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbStardrop ], rotation: -45 }) ]
                           }).on('tick', function () {
                              if (this.spin.value === 0) {
                                 const spr = quickshadow(this.objects[0] as CosmosSprite, this);
                                 spr.rotation.value = this.rotation.value - 45;
                              }
                           })
                        );
                        let de = false;
                        const deify = detached.then(() => (de = true));
                        const bs = [ 600, 300, 900 ][killed + 1];
                        await Promise.race([
                           deify,
                           Promise.all([
                              bullet.position.modulate(timer, bs, shad.position.value()),
                              bullet.rotation.modulate(timer, bs, [ 360 * 2, 360 * -2 ][index1] + 45)
                           ])
                        ]);
                        if (de) {
                           await shad.alpha.modulate(timer, 300, 0);
                        } else {
                           bullet.rotation.value = 45;
                        }
                        renderer.detach('menu', shad);
                        if (!de) {
                           bullet.spin.value = [ 5, -5 ][index1];
                           bullet.filters = [ new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 1 }) ];
                           const am = 6;
                           const r3 = random.clone();
                           await Promise.all([
                              Promise.race([
                                 deify,
                                 Promise.all([
                                    bullet.scale.modulate(timer, 500, 3, 3),
                                    bullet.alpha.modulate(timer, 500, 0)
                                 ])
                              ]).then(() => {
                                 de || detach();
                              }),
                              ...CosmosUtils.populate(am, index => {
                                 const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbFroggitWarn });
                                 const shaker = new CosmosValue();
                                 const { detached, detach } = bulletSetup(
                                    new CosmosHitbox({
                                       anchor: 0,
                                       size: 2,
                                       position: bullet,
                                       scale: 1.5,
                                       metadata: { bullet: true, damage: bdmg, shaken: false },
                                       velocity: new CosmosRay(index * (360 / am), [ 4, 5, 3 ][killed + 1]),
                                       objects: [ spr ],
                                       acceleration: bshake ? 0.975 : 1
                                    }).on('tick', function () {
                                       if (boxCheck(this, 5)) {
                                          detach();
                                       } else {
                                          const threshold = random.next() / 2 + 0.5;
                                          if (bshake && !this.metadata.shaken) {
                                             if ((shaker.value += 1 / 90) > threshold) {
                                                this.metadata.shaken = true;
                                                this.velocity.set(r3.next() * 2 - 1, -0.5 - r3.next() * 0.5);
                                                this.gravity.angle = 90;
                                                this.gravity.extent = 0.2;
                                             } else {
                                                this.offsets[0].set(
                                                   (r3.next() - 0.5) * shaker.value * 3,
                                                   (r3.next() - 0.5) * shaker.value * 3
                                                );
                                             }
                                          }
                                          quickshadow(
                                             spr,
                                             this.position.add(this.offsets[0]),
                                             battler.bullets,
                                             void 0
                                          ).scale.set(1.5);
                                       }
                                    })
                                 );
                                 return detached;
                              })
                           ]);
                        }
                     })()
                  );
                  await timer.pause(bdelay);
               })
            );
         });
      } else {
         let sideIndex = 0;
         await battler.sequence(2, async (promises, index1) => {
            if (index1 === killed) {
               return;
            }
            const bshake = index1 === 0 && (killed === 1 || progress === 1);
            const lsi = sideIndex++;
            promises.push(
               battler.sequence(bcount, async promises => {
                  let bulletIndex = 0;
                  const bulletLimit = [ 2, 4, 1 ][killed + 1];
                  while (bulletIndex < bulletLimit) {
                     const lbi = bulletIndex++;
                     lsi === 0 && lbi === 0 && assets.sounds.appear.instance(timer);
                     const orig = { x: [ box.x1 - 1, box.x2 + 1 ][index1], y: box.y1 + random.next() * box.sy };
                     const shaker = new CosmosValue();
                     const r3 = random.clone();
                     const { bullet, detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           area: renderer.area,
                           position: orig,
                           anchor: { y: 0 },
                           size: { y: 7, x: 1000 },
                           scale: { x: [ -1, 1 ][index1] },
                           metadata: { bullet: true, damage: bdmg },
                           objects: [
                              new CosmosSprite({ anchor: { y: 0 }, frames: [ content.ibbHaymaker ] }).on(
                                 'tick',
                                 function () {
                                    this.offsets[0].set(
                                       shaker.value * (r3.next() * 2 - 1),
                                       shaker.value * (r3.next() * 2 - 1)
                                    );
                                 }
                              )
                           ]
                        })
                     );
                     promises.push(
                        (async () => {
                           let de = false;
                           const deify = detached.then(() => (de = true));
                           const tt1 = [ 500, 350, 650 ][killed + 1];
                           const tt2 = [ 750, 250, 1250 ][killed + 1];
                           const tt3 = [ 1000, 750, 1250 ][killed + 1];
                           await Promise.race([
                              deify,
                              Promise.all([
                                 bullet.position
                                    .modulate(timer, tt1, { x: [ box.x1 + 7, box.x2 - 7 ][index1] })
                                    .then(() => timer.pause(tt2)),
                                 bshake ? shaker.modulate(timer, tt1 + tt2, 2) : void 0
                              ])
                           ]);
                           lsi === 0 && lbi === 0 && assets.sounds.stab.instance(timer);
                           if (!de) {
                              const reachX = { x: [ box.x1 + 90, box.x2 - 90 ][index1] };
                              await Promise.race([
                                 deify,
                                 Promise.all([
                                    bullet.position.modulate(timer, tt3, reachX, reachX, reachX, orig),
                                    bshake ? shaker.modulate(timer, tt3, 4, 4) : void 0
                                 ])
                              ]);
                              de || detach();
                           }
                        })()
                     );
                  }
                  await timer.pause(bdelay);
               })
            );
         });
      }
      modifier === 'gr' && renderer.detach('menu', special);
      return tugScore;
   },
   async glyde () {
      const fadeloop = 800;
      await timer.pause(500);
      await battler.sequence(3 + Math.floor(random.next() * 2), async promises => {
         const position = new CosmosPoint(battler.SOUL.x, box.y1 - 10);
         const baseAngle = position.angleTo({ x: box.x, y: box.y2 }) - 90 + (random.next() * 20 - 20 / 2);
         promises.push(
            battler.sequence(3 + Math.floor(random.next() * 2), async promises => {
               promises.push(
                  battler.sequence(5, async (promises, index) => {
                     const rotation = baseAngle + 18 * (index - 2);
                     const { detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 8,
                           position,
                           rotation,
                           metadata: { bullet: true, damage: 5, t: timer.value },
                           spin: random.next() * 10 - 5,
                           velocity: new CosmosRay(rotation + 90, 4),
                           objects: [
                              new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ] }),
                              new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ], rotation: 45, alpha: 0 })
                           ]
                        }).on('tick', function () {
                           boxCheck(this, 20) && detach();
                           const phase = ((timer.value - this.metadata.t) % fadeloop) / fadeloop;
                           const phasedAlpha = CosmosMath.linear(phase, 1, 1, 1, 1, 0, 0, 0, 0, 1);
                           this.objects[0].alpha.value = phasedAlpha;
                           this.objects[1].alpha.value = 1 - phasedAlpha;
                        }),
                        false
                     );
                     promises.push(detached);
                  })
               );
               await timer.pause(200);
            })
         );
         await timer.pause(1600);
      });
   },
   async pyrope (company: boolean) {
      if (random.next() < 0.5) {
         await battler.sequence(company ? 4 : 8, async (promises, seqIndex) => {
            const ix = seqIndex % 2;
            const bp = new CosmosPoint([ box.x2 + 10, box.x1 - 10 ][ix], box.y);
            const rotation = random.next() * 40 - 40 / 2;
            const yshift = new CosmosValue();
            const trueRotation = rotation - 90;
            const wall1 = bulletSetup(
               new CosmosHitbox({
                  anchor: { x: 0, y: 1 },
                  size: { x: 10, y: 120 },
                  metadata: { damage: 4, bullet: true },
                  rotation,
                  scale: 1 / 2,
                  objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibbRope ] }) ]
               }).on('tick', function () {
                  this.position.set(bp.endpoint(trueRotation, 20 + yshift.value));
               }),
               false,
               null
            );
            const flamez = CosmosUtils.populate(3, index => {
               const ybase = [ -12, 0, 12 ][index];
               return bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     scale: 1 / 2,
                     metadata: { damage: 4, bullet: true, color: 'orange' },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           resources: content.ibbPyropefire,
                           tint: 0xff993d
                        })
                     ]
                  }).on('tick', function () {
                     this.position.set(bp.endpoint(trueRotation, ybase + yshift.value));
                  }),
                  false,
                  null
               );
            });
            const wall2 = bulletSetup(
               new CosmosHitbox({
                  anchor: { x: 0 },
                  size: { x: 10, y: 120 },
                  rotation,
                  metadata: { damage: 4, bullet: true },
                  scale: 1 / 2,
                  objects: [ new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibbRope ] }) ]
               }).on('tick', function () {
                  this.position.set(bp.endpoint(trueRotation, -20 + yshift.value));
               }),
               false,
               null
            );
            const time = timer.value;
            const rand = random.next();
            const xlimit = ix === 0 ? -10 - Math.abs(rotation) * 1.2 : 330 + Math.abs(rotation) * 1.2;
            const tickre = () => {
               bp.x += [ -2, 2 ][ix];
               yshift.value = sawWaver(time, 2000, -30, 30, rand);
               if (ix === 0 ? bp.x < xlimit : bp.x > xlimit) {
                  wall1.detach();
                  wall2.detach();
                  for (const flame of flamez) {
                     flame.detach();
                  }
               }
            };
            renderer.on('tick', tickre);
            promises.push(
               Promise.all([ wall1.detached, ...flamez.map(flame => flame.detached), wall2.detached ]).then(() => {
                  renderer.off('tick', tickre);
               })
            );
            await timer.pause(company ? 2000 : 1000);
         });
      } else {
         await battler.sequence(company ? 3 : 6, async promises => {
            const target = new CosmosPoint(box.x1, box.y1).add(battler.box.size.multiply(random.next(), random.next()));
            const baseE = 160 + box.sx / 2 + 10;
            promises.push(
               Promise.all(
                  CosmosUtils.populate(2, i => {
                     const { detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           metadata: { damage: 4, bullet: true },
                           position: target.add(baseE * [ -1, 1 ][i], 0),
                           velocity: { x: [ 4, -4 ][i] },
                           objects: [ new CosmosAnimation({ resources: content.ibbPyropebomb, anchor: 0, active: true }) ]
                        }).on('tick', function () {
                           if (i === 0 ? target.x <= this.x : this.x <= target.x) {
                              detach();
                           } else {
                              quickshadow(this.objects[0] as CosmosSprite, this);
                           }
                        }),
                        true,
                        null
                     );
                     return detached;
                  })
               ).then(async () => {
                  for (const ob of renderer.layers.menu.objects) {
                     if (ob.metadata.pyExplodable) {
                        ob.metadata.pyExplodable = false;
                        const a = target.angleTo(ob);
                        const b = target.extentOf(ob);
                        ob.velocity.set(new CosmosRay(a, 25 / (b / 3)));
                        const { x, y } = new CosmosRay(a, 1);
                        ob.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                        ob.velocity.extent = Math.max(ob.velocity.extent, 4);
                     }
                  }
                  assets.sounds.bomb.instance(timer);
                  shake(2, 500);
                  const bom = new CosmosHitbox({
                     anchor: 0,
                     position: target,
                     size: { x: 27, y: 35 },
                     metadata: { bullet: true, damage: 7 },
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbPyropebom ] }) ]
                  }).on('tick', function () {
                     this.metadata.bullet = this.scale.x < 1.5;
                  });
                  renderer.attach('menu', bom);
                  await Promise.all([ bom.alpha.modulate(timer, 650, 1, 0), bom.scale.modulate(timer, 650, 2, 2) ]);
                  renderer.detach('menu', bom);
               })
            );
            await timer.pause(company ? 2000 : 1000);
         });
      }
   },
   async tsundere (company: boolean, greenmode: boolean) {
      await battler.sequence(company ? 4 : 12, async promises => {
         const x = random.next() * box.sx + box.x1;
         let trig = false;
         const { bullet, detach, detached } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               metadata: {
                  bullet: true,
                  damage: 5,
                  xt: 0,
                  xtcount: Math.floor(random.next() * 5),
                  pyExplodable: true,
                  moon: true
               },
               position: { x, y: -15 },
               scale: 1 / 2,
               priority: 31,
               size: 24,
               velocity: { y: 3 },
               objects: [
                  new CosmosHitbox({
                     anchor: 0,
                     metadata: { bullet: true, damage: 5 },
                     position: { y: 3 },
                     size: { x: 10, y: 40 }
                  }),
                  greenmode
                     ? new CosmosHitbox({
                          anchor: 0,
                          metadata: { trig: false },
                          scale: 2,
                          size: 24,
                          objects: [
                             new CosmosHitbox({
                                anchor: 0,
                                metadata: { trig: false },
                                position: { y: 3 },
                                size: { x: 10, y: 40 }
                             }),
                             new CosmosAnimation({ anchor: 0, index: 1, resources: content.ibbVertship })
                          ]
                       }).on('tick', function () {
                          if (
                             !trig &&
                             renderer.detect(
                                'menu',
                                battler.SOUL,
                                ...renderer.calculate('menu', hitbox => hitbox === this || hitbox === this.objects[0])
                             ).length > 0
                          ) {
                             trig = true;
                             this.alpha.value = 0;
                             assets.sounds.bell.instance(timer);
                             timer.pause(150).then(() => {
                                heal(1);
                             });
                          }
                       })
                     : new CosmosObject(),
                  new CosmosAnimation({ anchor: 0, resources: content.ibbVertship })
               ]
            }).on('tick', function () {
               if (screenCheck(this, 20)) {
                  detach();
               } else if (this.metadata.pyExplodable) {
                  if (this.metadata.xt === 0) {
                     this.metadata.xt = 2;
                     this.metadata.xtcount++;
                     const spr = new CosmosSprite({
                        anchor: 0,
                        scale: { x: 0.7, y: 0.5 },
                        position: this.position.subtract(0, 8),
                        velocity: { y: -0.25 },
                        priority: 30,
                        frames: [ content.ibbLooxCircle3 ]
                     }).on('tick', function () {
                        if ((this.alpha.value -= 0.15) <= 0) {
                           renderer.detach('menu', this);
                        }
                     });
                     renderer.attach('menu', spr);
                     if (this.metadata.xtcount++ % 3 === 0) {
                        spr.attach(new CosmosHitbox({ anchor: 0, size: 7, metadata: { bullet: true, damage: 4 } }));
                        spr.scale.modulate(timer, 250, { x: box.sx / 20 }, { x: box.sx / 20 });
                     }
                  }
                  this.metadata.xt--;
               } else {
                  const spr = quickshadow(this.objects[2] as CosmosSprite, this);
                  spr.rotation.value = this.rotation.value;
                  spr.scale.set(this.scale);
               }
            }),
            true
         );
         function hurtListener (hb: CosmosHitbox) {
            hb === bullet.objects[0] && detach();
         }
         events.on('hurt', hurtListener);
         promises.push(detached.then(() => void events.off('hurt', hurtListener)));
         await timer.pause(company ? 2000 : 600);
      });
   },
   async perigee () {
      if (random.next() < 0.5) {
         await battler.sequence(10, async promises => {
            const time = timer.value;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { fs: 0 },
                  position: { x: 330, y: box.y1 - 5 - random.next() * 15 },
                  velocity: { x: -4 - random.next() * 2 },
                  priority: 4,
                  objects: [
                     new CosmosAnimation({ active: true, scale: { x: -1 }, anchor: 0, resources: content.ibbBird })
                  ]
               }).on('tick', function () {
                  if (screenCheck(this, 25)) {
                     detach();
                  } else {
                     this.offsets[0].y = sineWaver(time, 1000, -3, 0);
                     if (this.metadata.fs === 0) {
                        this.metadata.fs = 12;
                        const fsway = 30;
                        const fradi = 30;
                        const frate = 1300;
                        const fbase = this.position.subtract(0, fradi);
                        const ftime = timer.value;
                        const { detach, detached } = bulletSetup(
                           new CosmosHitbox({
                              metadata: { damage: 4, bullet: true, size: 0.5 },
                              size: { x: 16, y: 4 },
                              position: this,
                              anchor: 0,
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbFeather ] }) ]
                           }).on('tick', function () {
                              if (screenCheck(this, 20)) {
                                 detach();
                              } else {
                                 this.scale.set(this.metadata.size);
                                 this.metadata.size = Math.min(this.metadata.size + 0.1, 1);
                                 this.rotation.value = sineWaver(ftime, frate, -fsway, fsway);
                                 this.position.set(fbase.endpoint(90 + this.rotation.value, fradi));
                                 fbase.y += 2.5;
                              }
                           }),
                           true
                        );
                        promises.push(detached);
                     }
                     this.metadata.fs--;
                  }
               }),
               true
            );
            promises.push(detached);
            await timer.pause(800);
         });
      } else {
         const featherPromises = [] as Promise<void>[];
         const tioasdbaghadjgbiadgfadhgb = timer.value;
         const { bullet, detached, detach } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               size: { x: 17, y: 8 },
               position: { x: 160, y: -15 },
               metadata: { damage: 5, bullet: true, trig: false, ayo: 0, ayoX: 0 },
               scale: 1.5,
               objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbBirdfront }) ]
            }).on('tick', function () {
               this.offsets[0].y = sineWaver(tioasdbaghadjgbiadgfadhgb, 1500, -3, 3);
               if (this.metadata.trig) {
                  if (this.metadata.ayo === 0) {
                     this.metadata.ayo = ++this.metadata.ayoX % 3 === 0 ? 20 : 10;
                     const ang = this.position.angleTo(battler.SOUL);
                     const spin = random.next() < 0.5 ? 10 : -10;
                     let i = 0;
                     while (i < 3) {
                        const { detach, detached } = bulletSetup(
                           new CosmosHitbox({
                              metadata: { damage: 4, bullet: true, size: 0.5 },
                              size: { x: 16, y: 4 },
                              position: this.position.add(this.offsets[0]),
                              anchor: 0,
                              spin,
                              velocity: new CosmosRay(ang + [ -35, 0, 35 ][i], 5),
                              acceleration: 0.98,
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbFeather ] }) ]
                           }).on('tick', function () {
                              if (boxCheck(this, 20)) {
                                 detach();
                              } else {
                                 this.scale.set(this.metadata.size);
                                 this.metadata.size = Math.min(this.metadata.size + 0.1, 1);
                                 const spr = quickshadow(this.objects[0] as CosmosSprite, this);
                                 spr.rotation.value = this.rotation.value;
                                 spr.scale.set(this.scale);
                              }
                           })
                        );
                        featherPromises.push(detached);
                        i++;
                     }
                  }
                  this.metadata.ayo--;
               }
            }),
            true
         );
         const ayyyyyyyyyyyyyyyyy = { y: box.y1 + box.sy / 4 };
         await Promise.race([
            detached,
            bullet.position.modulate(timer, 1000, ayyyyyyyyyyyyyyyyy, ayyyyyyyyyyyyyyyyy).then(async () => {
               bullet.metadata.trig = true;
               await timer.pause(6000);
               bullet.metadata.trig = false;
               await bullet.position.modulate(timer, 1000, bullet.position.value(), { y: -15 });
               detach();
            })
         ]);
         await Promise.all(featherPromises);
      }
   },
   async madjick (protoattacktype: number, protocrazy: boolean) {
      if (protoattacktype === 3) {
         await timer.pause(450);
         return;
      }
      const attacktype = protocrazy ? 0 : protoattacktype === 0 ? Math.floor(random.next() * 3) : protoattacktype;
      const crazy = protocrazy || protoattacktype > 0;
      switch (attacktype) {
         case 0: {
            const m = crazy ? 1.5 : 3;
            const r = random.clone();
            const sp = new CosmosValue();
            const rad = new CosmosValue(30);
            const rotta = new CosmosValue();
            const cE = () => Math.abs(sp.value) / m;
            const orbs = new CosmosObject({
               position: battler.box,
               objects: CosmosUtils.populate(2, ind => {
                  const ayo = new CosmosHitbox({
                     priority: 10,
                     anchor: 0,
                     size: 10,
                     metadata: { bullet: true, damage: 5, ela: 14 },
                     objects: [
                        new CosmosAnimation({ anchor: 0, active: true, resources: content.ibbOrb, priority: 10 })
                     ],
                     position: new CosmosPoint().endpoint(0, rad.value * [ 1, -1 ][ind])
                  }).on('render', function () {
                     this.position.set(new CosmosPoint().endpoint(rotta.value, rad.value * [ 1, -1 ][ind]));
                     if (ind === 0) {
                        const afac = r.next();
                        const alpha = 0.2 + afac * 0.4;
                        const rotation = r.next() * 360;
                        this.attach(
                           new CosmosRectangle({
                              size: { y: 1, x: 4 + afac * 8 },
                              rotation,
                              anchor: { y: 0, x: 0 },
                              metadata: { lifetime: 0 },
                              fill: 'white',
                              position: new CosmosPoint().endpoint(rotation, 40),
                              velocity: new CosmosPoint().endpoint(rotation + 180, 1)
                           }).on('tick', function () {
                              if (cE() === 0 || Math.abs(this.position.extent) < 5 || cE() === 0) {
                                 ayo.detach(this);
                              } else {
                                 this.velocity.extent = 2 + cE() * 5;
                                 this.alpha.value =
                                    alpha * Math.min(cE() * 3, 1) * Math.min(++this.metadata.lifetime / 4, 1);
                              }
                           })
                        );
                     } else if (this.metadata.ela-- === 0) {
                        this.metadata.ela = crazy ? 9 : 18;
                        const position = orbs.position.add(this);
                        const rotation = position.angleTo(battler.SOUL);
                        const { detach } = bulletSetup(
                           new CosmosHitbox({
                              anchor: 0,
                              metadata: { bullet: true, damage: 5 },
                              size: 7,
                              position,
                              velocity: new CosmosPoint().endpoint(rotation, 3 + sp.value / 2),
                              spin: random.next() < 0.5 ? 12 : -12,
                              rotation,
                              objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ]
                           }).on('tick', function () {
                              if (boxCheck(this, 40) || cE() === 0) {
                                 detach();
                              }
                           }),
                           false
                        );
                     }
                  });
                  return ayo;
               })
            }).on('tick', function () {
               rotta.value += sp.value;
               const pos1 = this.position.add(this.objects[0]);
               battler.SOUL.velocity.set(
                  new CosmosPoint().endpoint(
                     battler.SOUL.position.angleTo(pos1),
                     Math.max(Math.min((100 / (battler.SOUL.position.extentOf(pos1) + 30)) * cE(), 1.5), 0.1)
                  )
               );
            });
            battler.bullets.attach(orbs);
            rad.modulate(timer, 2000, crazy ? 50 : 40, crazy ? 50 : 40);
            await sp.modulate(timer, crazy ? 4000 : 2000, 0, m, m);
            await timer.pause(crazy ? 8000 : 6000);
            rad.modulate(timer, 2000, crazy ? 50 : 40, 30);
            crazy || (await sp.modulate(timer, 2000, m, 0, 0));
            battler.bullets.detach(orbs);
            battler.SOUL.velocity.set(0);
            break;
         }
         case 1: {
            const maxRev = 0.5;
            const baseDist = 30;
            const distanceValue = new CosmosValue(baseDist);
            const revPerSec = new CosmosValue();
            const cE = () => Math.abs(revPerSec.value) / maxRev;
            const r = random.clone();
            const rp = r.next();
            const ayo = new CosmosHitbox({
               priority: 10,
               anchor: 0,
               size: 10,
               scale: 1.5,
               metadata: { bullet: false, damage: 5, waver: 0 },
               objects: [ new CosmosAnimation({ anchor: 0, active: true, resources: content.ibbOrb, priority: 10 }) ]
            }).on('tick', function () {
               const inc = (revPerSec.value / 30) * (crazy ? 1 : 0.7);
               const waver = (this.metadata.waver += inc);
               this.position.set(
                  CosmosMath.remap(CosmosMath.wave(waver + rp), -distanceValue.value, distanceValue.value),
                  CosmosMath.remap(CosmosMath.wave(waver * 1.6 + 0.75), -distanceValue.value, distanceValue.value) / 1.7
               );
               this.metadata.bullet = true;
               const afac = r.next();
               const alpha = 0.2 + afac * 0.4;
               const rotation = r.next() * 360;
               this.attach(
                  new CosmosRectangle({
                     size: { y: 1, x: 4 + afac * 8 },
                     rotation,
                     anchor: { y: 0, x: 0 },
                     metadata: { lifetime: 0 },
                     fill: 'white',
                     position: new CosmosPoint().endpoint(rotation, 40),
                     velocity: new CosmosPoint().endpoint(rotation + 180, 1)
                  }).on('tick', function () {
                     if (cE() === 0 || Math.abs(this.position.extent) < 5 || cE() === 0) {
                        ayo.detach(this);
                     } else {
                        this.velocity.extent = 2 + cE() * 5;
                        this.alpha.value = alpha * Math.min(cE() * 3, 1) * Math.min(++this.metadata.lifetime / 4, 1);
                     }
                  })
               );
            });
            const orbsT = timer.value;
            const orbs = new CosmosObject({ position: battler.box, objects: [ ayo ] }).on('tick', function () {
               this.position.set(battler.box.position.add(0, sineWaver(orbsT, 2000, -1, 1)));
               const pos1 = this.position.add(this.objects[0]);
               battler.SOUL.velocity.set(
                  new CosmosPoint().endpoint(
                     battler.SOUL.position.angleTo(pos1),
                     Math.min((100 / (battler.SOUL.position.extentOf(pos1) + 20)) * cE(), 3) * (crazy ? 1.5 : 1)
                  )
               );
            });
            battler.bullets.attach(orbs);
            distanceValue.modulate(timer, 1000, baseDist, 60, 60);
            await revPerSec.modulate(timer, 2000, 0, maxRev, maxRev);
            await timer.pause(6000);
            revPerSec.modulate(timer, 2000, maxRev, 0, 0);
            await timer.pause(1000);
            await distanceValue.modulate(timer, 1000, 60, baseDist, baseDist);
            battler.bullets.detach(orbs);
            battler.SOUL.velocity.set(0);
            break;
         }
         case 2: {
            const pain = [] as Promise<void>[];
            const orbsper = crazy ? 8 : 16;
            const rows = CosmosUtils.populate(2, index => {
               const row = new CosmosObject({
                  metadata: { t: [ 0, orbsper ][index] },
                  position: { x: [ 335, -15 ][index], y: box.y + 55 * [ -1, 1 ][index] }
               }).on('tick', function () {
                  if (this.metadata.t <= 0) {
                     this.metadata.t = orbsper * 2;
                     const time = timer.value;
                     this.attach(
                        new CosmosAnimation({
                           anchor: 0,
                           active: true,
                           resources: content.ibbOrb,
                           priority: 10,
                           scale: 1.5,
                           metadata: { bullet: false, damage: 5 },
                           velocity: { x: [ -6, 6 ][index] }
                        }).on('tick', function () {
                           const position = row.position.add(this);
                           if (this.gravity.extent > 0) {
                              screenCheck(position, 20) && row.detach(this);
                           } else {
                              if (Math.abs(this.velocity.x) > (crazy ? 3 : 2)) {
                                 this.velocity.x *= 0.98;
                              }
                              if (Math.abs(position.x - battler.SOUL.x) > 5) {
                                 this.y = sineWaver(time, 1000, -1, 1) * (crazy ? 6 : 4);
                              } else {
                                 this.gravity.set([ -90, 90 ][index], 0.5);
                                 const { detach, detached } = bulletSetup(
                                    new CosmosHitbox({
                                       anchor: 0,
                                       metadata: { bullet: true, damage: 5 },
                                       size: 7,
                                       position,
                                       velocity: { y: [ 4, -4 ][index] },
                                       spin: random.next() < 0.5 ? 12 : -12,
                                       objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ]
                                    }).on('tick', function () {
                                       boxCheck(this, 45) && detach();
                                    }),
                                    false
                                 );
                                 pain.push(detached);
                              }
                           }
                        })
                     );
                  }
                  this.metadata.t--;
               });
               return row;
            });
            renderer.attach('menu', ...rows);
            await timer.pause(10000);
            await Promise.all(pain);
            renderer.detach('menu', ...rows);
            break;
         }
      }
   },
   async knightknight (panic = false) {
      const vars = battler.volatile[0].vars;
      if (vars.shakeFactor.value === 0 || vars.result === 1 || vars.result === 2) {
         await timer.pause(450);
         return;
      }
      const r = random.clone();
      const attacktype = Math.floor(random.next() * 2);
      let globalDir = null as number | null;
      const wavetime = timer.value;
      const wave = new CosmosAnimation({
         anchor: { x: 0, y: 1 },
         active: true,
         scale: { x: [ -1, 1 ][attacktype] },
         priority: -100,
         position: { x: box.x, y: [ box.y1, box.y2 ][attacktype] },
         resources: content.ibbWave
      }).on('tick', function () {
         this.offsets[0].y = sineWaver(wavetime, 1000, 0, [ -5, 5 ][attacktype]);
      });
      battler.bullets.attach(wave);
      const spd = panic ? 90 : 60;
      const bol = new CosmosAnimation({
         active: true,
         alpha: 0,
         anchor: 0,
         scale: 2,
         resources: content.ibcKnightknightArmball,
         spin: [ 2, -2 ][attacktype]
      });
      const cE = () => (Math.abs(bol.spin.value) * bol.alpha.value) / spd;
      const bcontainer = new CosmosObject({
         position: { x: 160, y: box.y1 - 30 },
         metadata: {
            t: 0,
            firingrate: [
               [ 15, 8 ],
               [ 10, 6 ]
            ][attacktype][panic ? 1 : 0]
         },
         spin: bol.spin.value,
         objects: [ bol ]
      }).on('tick', function () {
         if (this.metadata.t === 0) {
            this.metadata.t = this.metadata.firingrate;
            const dir = attacktype === 0 ? (globalDir ??= random.next() < 0.5 ? 0 : 1) : random.next() < 0.5 ? 0 : 1;
            const roi = random.next(); // thanks lawler for getting the term "ROI" stick on my head
            const { detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 5 },
                  size: 7,
                  velocity: attacktype === 0 ? { x: [ 3, -3 ][dir], y: 3 } : { y: 2, x: roi * 2 - 1 },
                  position:
                     attacktype === 0
                        ? { x: box.x + [ -1, 1 ][dir] * (box.sx / 2), y: box.y1 + roi * box.sy }
                        : { x: box.x1 + roi * box.sx, y: box.y1 - 10 },
                  spin: random.next() < 0.5 ? 12 : -12,
                  objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ],
                  acceleration: 0.98
               }).on('tick', function () {
                  if (boxCheck(this, 50) || bol.alpha.value === 0) {
                     detach();
                  } else if (attacktype === 0) {
                     this.gravity.set(this.position.angleTo(bcontainer), cE() * 0.4);
                  } else {
                     this.velocity.extent = cE() * 5;
                  }
               }),
               false
            );
         }
         this.metadata.t--;
         const afac = r.next();
         const alpha = 0.2 + afac * 0.4;
         const rotation = 45 + r.next() * 90;
         battler.bullets.attach(
            new CosmosRectangle({
               size: { y: 1, x: 5 + afac * 35 },
               rotation,
               anchor: { y: 0 },
               metadata: { lifetime: 0 },
               fill: 'white',
               position: this.position.endpoint(rotation, 30 + (attacktype === 0 ? box.sy * 1.1 : 0)),
               velocity: new CosmosPoint().endpoint(rotation + (attacktype === 0 ? 180 : 0), 1)
            }).on('tick', function () {
               if (boxCheck(this, 200) || bol.alpha.value === 0) {
                  battler.bullets.detach(this);
               } else {
                  this.velocity.extent = 2 + cE() * 5;
                  this.alpha.value = alpha * bol.alpha.value * Math.min(++this.metadata.lifetime / 10, 1);
               }
            })
         );
         battler.SOUL.velocity.set(
            new CosmosPoint().endpoint(
               battler.SOUL.position.angleTo(this) + (attacktype === 0 ? 0 : 180),
               (attacktype === 0
                  ? box.sy / battler.SOUL.position.extentOf(this)
                  : battler.SOUL.position.extentOf(this) / box.sy) * cE()
            )
         );
         if (attacktype === 0 && battler.SOUL.position.y <= box.y1 + battler.SOUL.size.y / 2) {
            battler.invulnerable || battler.damage(battler.SOUL.sprite, 4);
         } else if (attacktype === 1 && box.y2 - battler.SOUL.size.y / 2 <= battler.SOUL.position.y) {
            battler.invulnerable || battler.damage(battler.SOUL.sprite, 4);
         }
      });
      renderer.attach('menu', bcontainer);
      assets.sounds.appear.instance(timer);
      await bol.alpha.modulate(timer, 500, 1);
      await bol.spin.modulate(timer, panic ? 800 : 4000, attacktype === 0 ? spd : -spd);
      await timer.pause(8000);
      bol.spin.modulate(timer, panic ? 2500 : 1000, attacktype === 0 ? 2 : -2);
      if (panic) {
         battler.volatile[0].vars.shakeFactor.modulate(timer, 2500, 0);
      }
      await bol.alpha.modulate(timer, panic ? 2500 : 1000, 0);
      renderer.detach('menu', bcontainer);
      battler.SOUL.velocity.set(0);
      battler.bullets.detach(wave);
   },
   async froggitex (solo = false) {
      if (random.next() < 0.5) {
         const t = timer.value;
         await battler.sequence(!solo ? 10 : 15, async promises => {
            const s = box.sy * (solo ? 1 : 0.5);
            const bY = box.y - s / 2 + random.next() * s;
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 6,
                  position: { x: box.x1 - 10, y: bY },
                  velocity: { x: solo ? 4 : 3 },
                  metadata: { bullet: true, detach: 'menu', damage: 5 },
                  objects: [
                     new CosmosAnimation({ active: true, anchor: 0, scale: 0.75, resources: content.ibbFroggitFly }).on(
                        'tick',
                        async function () {
                           quickshadow(this, bullet, battler.bullets);
                        }
                     )
                  ]
               }).on('tick', function () {
                  this.y = bY + sawWaver(t, 1000, -8, 8) * (solo ? 1 : 0.8);
                  boxCheck(this, 15) && detach();
               }),
               false
            );
            promises.push(detached);
            await timer.pause(!solo ? 700 : 500);
         });
      } else {
         await battler.sequence(!solo ? 6 : 8, async promises => {
            const rand = { x: battler.SOUL.x, y: 165 - random.next() * 30 };
            const twinkler = new CosmosAnimation({
               alpha: 0.5,
               active: true,
               anchor: 0,
               position: rand,
               resources: content.ibbFroggitWarn
            }).on('tick', function () {
               this.index === 9 && renderer.detach('menu', this);
            });
            renderer.attach('menu', twinkler);
            promises.push(
               timer
                  .when(() => twinkler.index > 6)
                  .then(async () => {
                     const base = 210;
                     const spawnX = rand.x < 160 ? 190 : 130;
                     const frogger = new CosmosSprite({
                        scale: { x: rand.x < 160 ? -0.5 : 0.5, y: 0.5 },
                        anchor: 0,
                        frames: [ content.ibbFroggitGo ]
                     });
                     const { detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           metadata: { bullet: true, damage: 6, launch: false },
                           position: { x: twinkler.x + (spawnX < 160 ? 6 : -6) * (solo ? 3 : 1), y: base + 10 },
                           size: 8,
                           velocity: { y: -9 },
                           gravity: { angle: 90, extent: 0.5 },
                           objects: [ frogger ]
                        }).on('tick', function () {
                           if (this.metadata.launch) {
                              this.y > base && detach();
                           } else if (this.y < base) {
                              this.metadata.launch = true;
                           }
                        })
                     );
                     return detached;
                  })
            );
            await timer.pause(1150);
         });
      }
   },
   async whimsalot (solo = false) {
      if (random.next() < 0.5) {
         const time = timer.value;
         const total = 20;
         const distance = new CosmosValue(30);
         const center = new CosmosPoint(160);
         const centerCenter = new CosmosPoint(160);
         await battler.sequence(total, async (promises, index) => {
            const ang = (index / total) * 360;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 12,
                  metadata: { time: 0, bullet: true, damage: 5 },
                  objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbStarfly, scale: 0.5 }) ]
               }).on('tick', function () {
                  if (index === 0) {
                     center.set(
                        centerCenter.endpoint((((timer.value - time) % 2400) / 2400) * 360, sineWaver(time, 2400, 4, 8))
                     );
                     distance.set(sineWaver(time, 2400, 35, 40));
                  }
                  const offs = (this.metadata.time += 45 / total);
                  this.position = center.add(starGenerator(distance.value * 1.2, 0, 3, ang + offs / 3, offs));
                  this.rotation.value = this.position.angleFrom(center) - 90;
               })
            );
            timer.pause(solo ? 4000 : 8000).then(() => detach());
            promises.push(detached);
         });
      } else {
         const proms = [] as Promise<void>[];
         const rootDist = Math.sqrt(5 ** 2 * 2);
         const tiparrow = new CosmosSprite({
            alpha: 0,
            anchor: 0,
            position: { y: box.y, x: box.x + (box.sx / 1.4) * 2 },
            frames: [ content.ibbTiparrow ],
            metadata: { t: 0 },
            scale: 1 / 2,
            rotation: random.next() * 360
         }).on('tick', function () {
            if (this.metadata.t === 0) {
               this.metadata.t = Math.round(CosmosMath.remap(Math.abs(this.spin.value) / 10, 10, 5));
               let i = 0;
               while (i < 2) {
                  // attack, decay, sustain, release? wohoho
                  const a = this.alpha.value;
                  const d = CosmosMath.remap(a, 0.1, 0);
                  const s = d * 10000;
                  const r = this.rotation.value + (45 + i * 180);
                  const { bullet, detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        size: 16,
                        anchor: 0,
                        scale: 0.1,
                        position: this.position.endpoint(r, rootDist),
                        velocity: new CosmosPoint().endpoint(r, a * 5),
                        rotation: r + 90,
                        metadata: { bullet: true, damage: 5 },
                        objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbStarfly }) ]
                     }).on('tick', function () {
                        if ((this.alpha.value -= d) <= 0 || screenCheck(this, 10)) {
                           detach();
                        }
                     }),
                     true
                  );
                  bullet.scale.modulate(timer, s, a / 2);
                  proms.push(detached);
                  i++;
               }
            }
            this.metadata.t--;
         });
         renderer.attach('menu', tiparrow);
         await Promise.all([
            tiparrow.spin.modulate(timer, 2000, random.next() ? 10 : -10),
            tiparrow.alpha.modulate(timer, 2000, 1)
         ]);
         await timer.pause(5000);
         await Promise.all([ tiparrow.spin.modulate(timer, 2000, 0), tiparrow.alpha.modulate(timer, 2000, 0) ]);
         renderer.detach('menu', tiparrow);
         await Promise.all(proms);
      }
   },
   async astigmatism (solo = false) {
      if (random.next() < 0.5) {
         await battler.sequence(solo ? 12 : 16, promises => {
            const t = timer.value;
            const dY = CosmosMath.remap(random.next(), 5, 15);
            let launched: Promise<void[]> | void = void 0;
            const inv = random.next() < 0.5;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 5,
                  position: {
                     x: Math.min(Math.max(battler.SOUL.x - 30, box.x1), box.x2 - 60) + random.next() * 60,
                     y: inv ? box.y2 + 5 : box.y1 - 5
                  },
                  offsets: [ 0 ],
                  velocity: { y: inv ? -2 : 2 },
                  metadata: { bullet: true, damage: 5 },
                  objects: [ new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbLooxCircle2 ] }) ]
               }).on('tick', function () {
                  this.offsets[0].x = sineWaver(t, 600, -2, 2);
                  const p = (inv ? box.y2 - this.y : this.y - box.y1) / battler.box.size.y;
                  this.scale.set(CosmosMath.remap(p, 1, 0.6));
                  this.alpha.value = CosmosMath.remap(p, 1, 0.8);
                  if (inv ? this.y < box.y1 + dY : this.y > box.y2 - dY) {
                     detach();
                     launched = Promise.all(
                        CosmosUtils.populate(2, ind => {
                           const { detach, detached } = bulletSetup(
                              new CosmosHitbox({
                                 anchor: 0,
                                 size: 4,
                                 position: this,
                                 offsets: [ 0 ],
                                 metadata: { bullet: true, damage: 5 },
                                 objects: [
                                    new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbLooxCircle1 ] })
                                 ],
                                 velocity: new CosmosPoint().endpoint(ind * 180, 4)
                              }).on('tick', function () {
                                 boxCheck(this, 10) && detach();
                                 const { promise, object } = shadow(
                                    this.objects[0] as CosmosSprite,
                                    self => (self.alpha.value *= 0.6) < 0.03,
                                    { alpha: 0.7, position: this }
                                 );
                                 timer.post().then(() => battler.bullets.attach(object));
                                 promise.then(() => battler.bullets.detach(object));
                              })
                           );
                           return detached;
                        })
                     );
                  }
               })
            );
            promises.push(detached.then(async () => void (await launched)));
            return timer.pause(solo ? 600 : 400);
         });
      } else {
         await battler.sequence(solo ? 18 : 24, async promises => {
            const setup1 = bulletSetup(
               new CosmosHitbox({
                  alpha: 0,
                  anchor: 0,
                  size: 7,
                  position: {
                     x: Math.min(Math.max(battler.SOUL.x - 20, box.x1), box.x2 - 40) + random.next() * 40,
                     y: box.y1 - 10
                  },
                  gravity: { angle: 90, extent: 0.45 },
                  metadata: { bullet: true, damage: 5, inbox: false },
                  velocity: { y: -3, x: random.next() * 2 - 1 },
                  objects: [ new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbLooxCircle3 ] }) ]
               }).on('tick', function () {
                  if (this.metadata.inbox) {
                     boxCheck(this, 10) && detach();
                  } else {
                     this.y = Math.min(this.y, box.y2);
                     const bY = this.y + this.size.y / 2;
                     this.scale.y = 1 - Math.min(Math.max(bY - box.y2, 0) / this.size.y, 1);
                     if (this.scale.y < 1) {
                        this.velocity.y = -4;
                     }
                     if (this.velocity.y < 0 && this.y < box.y2 - 10 && this.y > box.y1) {
                        detach();
                     }
                     bY > box.y2 && (this.velocity.y -= 4);
                  }
                  quickshadow(this.objects[0] as CosmosSprite, this, this.y > box.y1 ? battler.bullets : void 0);
               }),
               true
            );
            let detach = setup1.detach;
            setup1.bullet.alpha.modulate(timer, 500, 1);
            promises.push(
               setup1.detached.then(async () => {
                  setup1.bullet.metadata.inbox = true;
                  const setup2 = bulletSetup(setup1.bullet, false);
                  detach = setup2.detach;
                  await setup2.detached;
               })
            );
            await timer.pause(solo ? 600 : 400);
         });
      }
   },
   async mushketeer (travel: number) {
      if (random.next() < 0.5) {
         await battler.sequence([ 8, 12, 16 ][travel], async promises => {
            const area = 40;
            const center = battler.SOUL.position
               .subtract(area / 2)
               .clamp({ x: box.x1, y: box.y1 }, { x: box.x2 - area, y: box.y2 - area })
               .add(random.next() * area, random.next() * area);
            const target = new CosmosSprite({
               alpha: 0,
               scale: new CosmosPoint(0.4),
               position: center,
               anchor: 0,
               frames: [ content.ibbCrosshair ]
            });
            renderer.attach('menu', target);
            target.scale.modulate(timer, 300, 1 / 4, 1 / 4);
            promises.push(
               target.alpha.modulate(timer, 300, 0.7, 0.7).then(async () => {
                  await timer.pause(350);
                  assets.sounds.node.instance(timer).rate.value = 1.2;
                  await Promise.all(
                     CosmosUtils.populate(4, index => {
                        const rotation = 45 + (index / 4) * 360;
                        const position = center.endpoint(rotation + 90, 100);
                        const velocity = new CosmosPoint().endpoint(rotation - 90, 7);
                        const { detach, detached } = bulletSetup(
                           new CosmosHitbox({
                              anchor: 0,
                              size: 20,
                              scale: 1 / 4,
                              position,
                              rotation,
                              velocity,
                              metadata: { time: 0, bullet: true, damage: 5, in: false },
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbLiteralBullet ] }) ]
                           }).on('tick', function () {
                              this.metadata.in
                                 ? boxCheck(this, 10) && detach()
                                 : boxCheck(this, 10) || (this.metadata.in = true);
                              const { object, promise } = shadow(
                                 this.objects[0] as CosmosSprite,
                                 self => (self.alpha.value *= 0.6) < 0.04,
                                 {
                                    alpha: 0.7,
                                    position: this.position,
                                    rotation: this.rotation.value,
                                    scale: this.scale
                                 }
                              );
                              timer.post().then(() => battler.bullets.attach(object));
                              promise.then(() => battler.bullets.detach(object));
                           })
                        );
                        return detached;
                     })
                  ).then(() => {
                     target.scale.modulate(timer, 300, 0.4, 0.4);
                     target.alpha.modulate(timer, 300, 0).then(() => renderer.detach('menu', target));
                  });
               })
            );
            await timer.pause([ 650, 550, 450 ][travel]);
         });
      } else {
         await battler.sequence([ 16, 20, 24 ][travel], async promises => {
            const { position } = pastBox(10);
            const center = battler.box.position.add(random.next() * 20 - 10, random.next() * 20 - 10);
            const rotation = position.angleTo(center);
            const warnRect2 = new CosmosRectangle({
               alpha: 0.7,
               position,
               priority: -5,
               anchor: { y: 0 },
               size: { y: 4 },
               rotation,
               fill: '#fff'
            });
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 20,
                  scale: 1 / 4,
                  position,
                  rotation: rotation + 90,
                  metadata: { time: 0, bullet: true, damage: 5, fired: false },
                  objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbLiteralBullet ] }) ]
               }).on('tick', function () {
                  if (this.metadata.fired) {
                     if (boxCheck(this, 20)) {
                        detach();
                     } else {
                        const shad = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                        shad.scale.set(this.scale);
                        shad.rotation.value = this.rotation.value;
                     }
                  }
               }),
               false
            );
            battler.bullets.attach(warnRect2);
            assets.sounds.arrow.instance(timer).rate.value = 0.75;
            promises.push(detached);
            warnRect2.size.modulate(timer, 600, { x: 200 }, { x: 200 }).then(async () => {
               warnRect2.alpha.value = 1;
               warnRect2.alpha.modulate(timer, 400, 0.75, 0).then(() => battler.bullets.detach(warnRect2));
               bullet.velocity.set(new CosmosPoint().endpoint(rotation, [ 6, 8, 10 ][travel]));
               bullet.metadata.fired = true;
               assets.sounds.node.instance(timer).rate.value = 1.2;
            });
            await timer.pause([ 450, 350, 250 ][travel]);
         });
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: AERIALIS PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
