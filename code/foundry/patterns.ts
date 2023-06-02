import assets from '../assets';
import { boxCheck, bulletSetup, legacy, pastBox, screenCheck, starGenerator } from '../common/patterns';
import content from '../content';
import { events, keys, random, renderer, timer } from '../core';
import {
   CosmosAnimation,
   CosmosBitmap,
   CosmosColor,
   CosmosDirection,
   CosmosHitbox,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSizedObjectProperties,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../engine';
import { battler, distanceGravity, shadow, shake, sineWaver, world } from '../mantle';
import save from '../save';

const patterns = {
   undynefast: async () => {
      await battler.sequence(15, async promises => {
         assets.sounds.arrow.instance(timer);
         const posx = battler.box.position.x;
         const half = battler.box.size.x / 2;
         const { detach, detached } = bulletSetup(
            new CosmosHitbox({
               position: {
                  x: CosmosMath.remap(random.next(), posx - half, posx + half),
                  y: battler.box.position.y - battler.box.size.y / 2 - 10
               },
               metadata: { bullet: true, damage: 5 },
               scale: 0.5,
               anchor: { x: 0, y: 1 },
               velocity: { x: CosmosMath.remap(random.next(), -2, 2), y: 4 },
               size: { x: 13, y: 74 },
               objects: [
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: { y: 7 },
                     frames: [ content.ibbChasespear ]
                  })
               ]
            }),
            false,
            null
         );
         timer.pause(1250).then(() => detach());
         promises.push(detached);
         await timer.pause(100);
      });
      battler.bullets.objects.splice(0, battler.bullets.objects.length);
   },
   async doge (phase: number, atk: number) {
      function yoSpeer (extra: CosmosSizedObjectProperties = {}) {
         const anchorValue = extra!.anchor ?? 0;
         const anchor =
            typeof anchorValue === 'number'
               ? new CosmosPoint(anchorValue)
               : new CosmosPoint(anchorValue.x ?? 0, anchorValue.y ?? 0);
         return new CosmosHitbox(
            Object.assign(
               {
                  size: { x: 6, y: 84 },
                  anchor,
                  metadata: { damage: atk, bullet: true },
                  scale: 0.5,
                  objects: [
                     new CosmosAnimation({
                        anchor,
                        resources: content.ibbSpear
                     })
                  ]
               },
               extra
            )
         );
      }
      if ((phase === 3 && random.next() < 1 / 4) || phase === 1) {
         const total = 7;
         const baseAngle = random.next() * 360;
         const angleSpeed = new CosmosValue(2);
         const distance = new CosmosValue(150);
         const speers = CosmosUtils.populate(total, index => {
            let angle = (index / total) * 360 + baseAngle;
            const speer = yoSpeer({
               anchor: { x: 0, y: -1 },
               size: { x: 4, y: 84 },
               rotation: angle,
               position: battler.box.position.endpoint(angle + 90, 150)
            }).on('tick', () => {
               angle += angleSpeed.value;
               speer.position = battler.box.position.endpoint(angle + 90, distance.value);
               speer.rotation.value = angle;
            });
            return { speer, d: legacy.wrapper(battler.bullets, speer) };
         });
         timer.pause(600).then(async () => {
            const oragne = Math.floor(random.next() * total);
            const spr = speers[oragne].speer.objects[0] as CosmosSprite;
            spr.index = 1;
            speers[oragne].speer.metadata.color = 'orange';
            await timer.pause(350);
            spr.index = 0;
            speers[oragne].speer.metadata.color = void 0;
            await timer.pause(350);
            speers[oragne].speer.metadata.color = 'orange';
            spr.index = 1;
         });
         await distance.modulate(timer, 1000, 15, 15);
         angleSpeed.modulate(timer, 1400, 1, 1, 4);
         await timer.pause(1500);
         angleSpeed.modulate(timer, 600, 0.5, 0.5);
         await distance.modulate(timer, 1200, 60, 60, -150);
         for (const speer of speers) {
            speer.d();
         }
      } else if ((phase === 3 && random.next() < 1 / 3) || phase === 2) {
         let index = 0;
         let side = random.next() < 0.5 ? -1 : 1;
         const twinkler = new CosmosAnimation({
            alpha: 0.5,
            active: true,
            anchor: 0,
            position: new CosmosPoint(side === -1 ? 40 : 280, battler.box.position.y),
            resources: content.ibbFroggitWarn,
            spin: side * 5
         });
         renderer.attach('menu', twinkler);
         await timer.when(() => twinkler.index === 9);
         renderer.detach('menu', twinkler);
         const lim = 5;
         while (index++ < lim) {
            const speerz = new CosmosObject({
               gravity: { angle: 0, extent: 0.5 * -side },
               position: new CosmosPoint(side === -1 ? -10 : 330, battler.box.position.y),
               objects: CosmosUtils.populate(4, index =>
                  yoSpeer({
                     size: { x: 50, y: 84 },
                     rotation: side === -1 ? 90 : -90,
                     anchor: { x: 0, y: -1 },
                     position: { y: battler.box.size.y / 10 + (battler.box.size.y / 5) * (index - 2) }
                  })
               )
            });
            renderer.attach('menu', speerz);
            const speerzX = battler.box.position.x + battler.box.size.x * 0.45 * side;
            await CosmosUtils.chain(void 0 as void, async (n, next) => {
               await renderer.on('tick');
               if ((side === -1 && speerz.position.x > speerzX) || (side === 1 && speerz.position.x < speerzX)) {
                  speerz.position.x = speerzX;
                  shake(2, 800);
                  assets.sounds.boxpush.instance(timer);
                  speerz.gravity.extent = 0;
                  speerz.velocity.set(4 * -side, 0);
                  speerz.acceleration.value = 1 / 1.005;
                  const boxX = battler.box.position.x;
                  let mov = true;
                  speerz.on('tick', () => {
                     mov && (battler.box.position.x = boxX + Math.abs(speerz.position.x - speerzX) * -side);
                  });
                  await timer.when(() => Math.abs(160 - battler.box.position.x) < 40);
                  if (index === lim) {
                     await timer.when(() => Math.abs(160 - battler.box.position.x) < 5);
                     speerz.position.x += 160 - battler.box.position.x;
                     battler.box.position.x = 160;
                  } else {
                     await Promise.race([
                        timer.pause(random.next() * 1000 + 500),
                        timer.when(() => Math.abs(160 - battler.box.position.x) > 60)
                     ]);
                  }
                  mov = false;
                  speerz.velocity.set(0, 0);
                  for (const ob of speerz.objects) {
                     ob.metadata.bullet = false;
                  }
                  await speerz.alpha.modulate(timer, 800, 0);
                  renderer.detach('menu', speerz);
                  side *= -1;
               } else {
                  await next();
               }
            });
         }
      } else {
         let last = 0;
         const centre = battler.box.position.value();
         await battler.sequence(4, async promises => {
            let svx = (random.next() * 2 - 1) * 2;
            while (Math.abs(0 - svx) < 0.2 && Math.abs(last - svx) > 2.4) {
               svx = (random.next() * 2 - 1) * 2;
            }
            last = svx;
            const supervelo = new CosmosPoint(svx, -2);
            promises.push(
               battler.sequence(2, async (promises, index) => {
                  const speer = yoSpeer({
                     rotation: [ 90, -90 ][index],
                     position: battler.box.position.add(
                        battler.box.size.divide([ -2.75, 2.75 ][index] * (1 + random.next() * 0.2), -2).subtract(0, 20)
                     )
                  });
                  const shaker = new CosmosValue();
                  const wrapper = new CosmosObject({
                     objects: [ speer ]
                  }).on('tick', () => {
                     wrapper.position.x = (Math.random() * 2 - 1) * shaker.value;
                     wrapper.position.y = (Math.random() * 2 - 1) * shaker.value;
                  });
                  const detachie = legacy.wrapper(battler.bullets, wrapper, speer);
                  timer.pause(450).then(async () => {
                     const warningRect = new CosmosRectangle({
                        alpha: 0.5,
                        position: centre,
                        anchor: 0,
                        size: { x: 4, y: 150 },
                        fill: '#fff'
                     });
                     battler.bullets.attach(warningRect);
                     await timer.pause(50);
                     warningRect.alpha.value = 0;
                     await timer.pause(50);
                     warningRect.alpha.value = 0.5;
                     const e = warningRect.position.add(supervelo.x * 30, 0);
                     warningRect.alpha.modulate(timer, 400, 1, 0);
                     await warningRect.position.modulate(timer, 450, e, e);
                     const index = battler.bullets.objects.indexOf(warningRect);
                     battler.bullets.objects = [
                        ...battler.bullets.objects.slice(0, index),
                        ...battler.bullets.objects.slice(index + 1)
                     ];
                  });
                  promises.push(
                     speer.position
                        .modulate(timer, 650, speer.position.add(0, 30), speer.position.add(0, 30))
                        .then(async () => {
                           await shaker.modulate(timer, 450, 1);
                           shaker.value = 0;
                           speer.velocity = supervelo.clone();
                           speer.gravity.angle = 90;
                           speer.gravity.extent = 0.2;
                           speer.acceleration.value = 1 / 1.002;
                           speer.spin.value = 5 * (random.next() < 0.5 ? 1 : -1);
                           await timer.pause(2000);
                           detachie();
                        })
                  );
               })
            );
            await timer.pause(1500);
         });
         battler.bullets.objects = [];
      }
   },
   muffet: (() => {
      async function pattern (
         speedstat: number,
         gen: (
            spawn: (id: 0 | 1 | 2, row: number, side?: -1 | 1, speed?: number, vert?: -1 | 0 | 1) => Promise<void>,
            pause: (t: number) => Promise<void>,
            cupcake: (p1: number, p2: number, callback: () => Promise<void> | void) => Promise<void>
         ) => Promise<void>
      ) {
         let end = false;
         const promies = [] as Promise<void>[];
         const spawn = async (id: 0 | 1 | 2, row: number, side: -1 | 1 = 1, speed = 5, vert: -1 | 0 | 1 = 0) => {
            let tick = 0;
            let line = battler.box.size.y / -2 + battler.line.offset + row * 20;
            let sy = 0;
            let vy = vert * speed * speedstat * 0.75;
            const sx = battler.box.position.x + side * (battler.box.size.x / 2 + 45);
            const vx = -side * speed * speedstat * [ 1, 1.5, 1.25 ][id];
            const { bullet, detached, detach } = bulletSetup(
               new CosmosHitbox({
                  size: [ 20, { x: 12, y: 20 }, 16 ][id],
                  anchor: 0,
                  scale: 0.5,
                  velocity: { x: vx },
                  spin: id === 1 ? side * 4 * speedstat : void 0,
                  gravity:
                     id === 1
                        ? {
                             extent:
                                side *
                                distanceGravity(
                                   Math.abs(vx),
                                   Math.abs(battler.box.position.x - side * (battler.box.size.x / 2 - 15) - sx)
                                )
                          }
                        : void 0,
                  position: { x: sx, y: battler.box.position.y + line },
                  metadata: { bullet: true, damage: 5 },
                  objects: [
                     new CosmosSprite({
                        anchor: 0,
                        frames: [ [ content.ibbSpider, content.ibbCrossiant, content.ibbDonut ][id] ]
                     })
                  ]
               }).on('tick', function () {
                  this.position.y = battler.box.position.y + (line += battler.line.loop) + (sy += vy);
                  if (id === 2) {
                     const checkBase = battler.box.position.y - battler.box.size.y / 2 + battler.line.offset;
                     if (this.position.y <= checkBase) {
                        vy = Math.abs(vy);
                     } else if (checkBase + 40 <= this.position.y) {
                        vy = -Math.abs(vy);
                     }
                  }
                  if (
                     end ||
                     (tick++ > 120 / speed &&
                        Math.abs(this.position.x - battler.box.position.x) > battler.box.size.x / 2 + 24)
                  ) {
                     detach();
                  }
               }),
               false,
               null
            );
            let done = false;
            const shadow = new CosmosSprite({
               anchor: 0,
               scale: 0.5,
               frames: [ [ content.ibbSpiderOutline, content.ibbCrossiantOutline, content.ibbDonutOutline ][id] ]
            }).on('tick', function () {
               this.position.set(bullet.position);
               this.rotation.value = bullet.rotation.value;
               if (done || Math.abs(shadow.position.x - battler.box.position.x) < battler.box.size.x / 3) {
                  battler.overlay.objects.splice(battler.overlay.objects.indexOf(this), 1);
               }
            });
            battler.overlay.attach(shadow);
            promies.push(detached);
            await detached;
            done = true;
         };
         await gen(
            spawn,
            async t => renderer.pause(t / speedstat),
            async (p1, p2, callback) => {
               renderer.detach('menu', battler.SOUL);
               battler.box.objects[2].objects = [ battler.SOUL ];
               const pos = battler.box.position;
               const baseY = pos.y;
               await pos.modulate(timer, 600, pos.value(), { x: 90 }, { x: 90 });
               callback();
               let unit = 0;
               const units = Math.ceil(p1 / 1250);
               while (unit++ < units) {
                  const endX = CosmosMath.remap(unit / units, 90, 160);
                  const halfwayX = (pos.x + endX) / 2;
                  await pos.modulate(
                     timer,
                     1250 / speedstat,
                     { x: halfwayX, y: baseY + 30 },
                     { x: halfwayX, y: baseY - 30 },
                     { x: endX, y: baseY }
                  );
               }
               const cakePos1 = new CosmosPoint({ x: 235, y: 195 });
               const cupcakeSprite1 = new CosmosAnimation({
                  anchor: { y: 1 },
                  scale: 1 / 2,
                  resources: content.ibcMuffetCupcake
               }).on('tick', function () {
                  this.position.set(cakePos1.add(Math.random() * 2 - 1, Math.random() * 2 - 1));
               });
               battler.bullets.attach(cupcakeSprite1);
               battler.line.sticky = false;
               const m = 60;
               await Promise.all([
                  pos.modulate(timer, 600, { x: pos.x + m / 2 }),
                  battler.box.size.modulate(timer, 600, { x: battler.box.size.x + m }),
                  battler.box.objects[0].position.modulate(timer, 600, {
                     x: battler.box.objects[0].position.x - m / 2
                  })
               ]);
               await renderer.pause(1000);
               cupcakeSprite1.index = 1;
               await renderer.pause(1000);
               await Promise.all([
                  pos.modulate(timer, 600, { x: pos.x - m / 2 }),
                  battler.box.size.modulate(timer, 600, { x: battler.box.size.x - m }),
                  battler.box.objects[0].position.modulate(timer, 600, {
                     x: battler.box.objects[0].position.x + m / 2
                  })
               ]);
               battler.bullets.objects.splice(battler.bullets.objects.indexOf(cupcakeSprite1), 1);
               const n = 100;
               battler.line.sticky = true;
               const endPosY = pos.y - n / 2;
               const endSizeY = battler.box.size.y + n;
               const time1 = timer.value;
               const i = new CosmosValue(5);
               const rotter = () => {
                  battler.box.rotation.value = sineWaver(time1, 3000, -i.value, i.value, 0.25);
               };
               battler.box.on('tick', rotter);
               let ebic = true;
               Promise.all([ pos.step(timer, 3, { y: endPosY }), battler.box.size.step(timer, 3, { y: endSizeY }) ]).then(
                  async () => {
                     battler.line.loop = 1.5;
                     const rows = {} as CosmosKeyed<boolean>;
                     while (ebic) {
                        const possible = CosmosUtils.populate(battler.line.amount, index => index - 2);
                        const middle = Math.ceil((battler.line.position.y - battler.line.offset) / 20) - 1;
                        for (const possibility of possible) {
                           if (rows[possibility] || Math.abs(possibility - middle) > 2) {
                              possible.splice(possible.indexOf(possibility), 1);
                           }
                        }
                        if (possible.length > 0) {
                           const row = possible[Math.floor(random.next() * possible.length)];
                           rows[row] = true;
                           spawn(1, row, random.next() < 0.5 ? -1 : 1, 3.5).then(async () => {
                              await renderer.pause(850);
                              rows[row] = false;
                           });
                        }
                        await renderer.pause(350);
                     }
                  }
               );
               await renderer.pause(1000);
               battler.line.maxY = endPosY + endSizeY / 3;
               const time2 = timer.value;
               const cakePos2 = new CosmosPoint({ x: 160, y: endPosY + endSizeY / 2 + 30 });
               const cupcakeSprite2 = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  scale: 1 / 2,
                  resources: content.ibbCupcakeAttack
               }).on('tick', function () {
                  this.position.set(cakePos2.add(0, sineWaver(time2, 2500, 0, 25, 0.5)));
               });
               battler.bullets.attach(cupcakeSprite2);
               cakePos2.modulate(timer, 1000, cakePos2.subtract(0, 30), cakePos2.subtract(0, 30));
               await renderer.pause(p2 / speedstat);
               ebic = false;
               await Promise.all([
                  i.modulate(timer, 800, 1, 0, 0).then(() => {
                     battler.box.off('tick', rotter);
                     battler.box.rotation.value = 0;
                  }),
                  cakePos2.modulate(timer, 1000, cakePos2.value(), { y: cakePos2.y + 60 })
               ]);
               battler.bullets.objects.splice(battler.bullets.objects.indexOf(cupcakeSprite2), 1);
               battler.box.objects[2].objects = [];
               renderer.attach('menu', battler.SOUL);
               end = true;
            }
         );
         await Promise.all(promies);
      }
      return async (turn: number, speedstat: number) => {
         switch (turn) {
            case 0:
               const biasNumber = new CosmosValue();
               battler.volatile[0].vars.biasNumber = biasNumber;
               await biasNumber.modulate(timer, 1000, 0.9, 0.9);
               const purpleRect = new CosmosRectangle({
                  fill: '#c000c0',
                  position: { x: 160, y: 193 },
                  anchor: { x: 0, y: 1 },
                  size: { x: battler.box.size.x },
                  priority: 2000
               });
               renderer.attach('menu', purpleRect);
               renderer.detach('menu', battler.SOUL);
               battler.bullets.attach(battler.SOUL);
               battler.SOUL.position.y = Math.round(battler.SOUL.position.y);
               const amt = 12;
               await battler.sequence(amt, async (promises, superindex) => {
                  const droplets = CosmosUtils.populate(2, index => {
                     const sc = new CosmosValue(0.25);
                     const sm = [ -1, 1 ][index];
                     let pos = { x: 160 + 55 * sm, y: 90 };
                     const sprite = new CosmosSprite({
                        anchor: 0,
                        position: pos,
                        frames: [ content.ibcMuffetDustrus ],
                        rotation: -4 * sm
                     }).on('tick', function () {
                        this.scale.set(sc.value * sm, sc.value);
                        this.rotation.value = this.position.angleFrom(pos) - 90;
                        pos = this.position.value();
                     });
                     sc.modulate(timer, 1600, 0.5, 0.5);
                     sprite.position.modulate(
                        timer,
                        1600,
                        sprite.position.add(8 * sm, 16),
                        purpleRect.position.add(20 * sm, 7)
                     );
                     return sprite;
                  });
                  timer.post().then(() => renderer.attach('menu', ...droplets));
                  promises.push(
                     timer
                        .when(() => droplets[0].position.y > battler.box.position.y - 20)
                        .then(async () => {
                           await timer.post();
                           renderer.detach('menu', ...droplets);
                           battler.bullets.attach(...droplets);
                           await timer.when(
                              () => droplets[0].position.y > purpleRect.position.y - purpleRect.size.y + 6
                           );
                           await timer.post();
                           for (const droplet of droplets) {
                              battler.bullets.objects.splice(battler.bullets.objects.indexOf(droplet), 1);
                           }
                           const sY = purpleRect.size.y + battler.box.size.y / amt;
                           purpleRect.size.modulate(timer, 66, { y: sY }, { y: sY });
                        })
                  );
                  await timer.pause(250);
                  superindex === 19 && biasNumber.modulate(timer, 1000, -0.1, -0.1);
               });
               battler.bullets.objects = [];
               renderer.attach('menu', battler.SOUL);
               battler.SOUL.metadata.color = 'purple';
               battler.line.active = true;
               Object.assign(battler.SOUL.position, battler.line.position);
               await timer.pause(1000);
               await purpleRect.alpha.modulate(timer, 1000, 1, 0);
               renderer.detach('main', purpleRect);
               await renderer.pause(450);
               break;
            case 1:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(0, 0);
                  await pause(450);
                  spawn(0, 2);
                  await pause(450);
                  spawn(0, 1);
                  await pause(450);
                  spawn(0, 2);
                  await pause(450);
                  spawn(0, 0, -1);
                  await pause(450);
                  spawn(0, 1, -1);
                  await pause(450);
                  spawn(0, 2, -1);
                  await pause(450);
                  spawn(0, 0, -1);
                  await pause(450);
                  spawn(0, 1, -1);
               });
               break;
            case 2:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(0, 0);
                  spawn(0, 2);
                  spawn(0, 0, -1);
                  spawn(0, 2, -1);
                  await pause(650);
                  spawn(0, 1);
                  await pause(350);
                  spawn(0, 2);
                  await pause(350);
                  spawn(0, 1, -1);
                  await pause(350);
                  spawn(0, 0, -1);
                  await pause(350);
                  spawn(0, 2);
                  await pause(350);
                  spawn(0, 0);
                  await pause(350);
                  spawn(0, 2);
                  await pause(350);
                  spawn(0, 1, -1);
                  await pause(350);
                  spawn(0, 2, -1);
               });
               break;
            case 3:
               await pattern(speedstat, async (spawn, pause, cupcake) => {
                  await cupcake(8000, 12000, async () => {
                     let et = 0;
                     while (et < 7500) {
                        spawn(0, 1, -1);
                        const time = CosmosMath.remap(et / 7500, 650, 400);
                        await pause(time);
                        et += time;
                        if (et < 8000) {
                           spawn(0, 0, -1);
                           spawn(0, 2, -1);
                           const time = CosmosMath.remap(et / 7000, 650, 400);
                           await pause(time);
                           et += time;
                        }
                     }
                  });
               });
               break;
            case 4:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(2, 0, 1, 3, 1);
                  spawn(2, 2, 1, 3, -1);
                  await pause(1250);
                  spawn(2, 0, -1, 3, 1);
                  spawn(2, 2, -1, 3, -1);
                  await pause(1250);
                  spawn(0, 1);
                  await pause(350);
                  spawn(0, 0, -1);
                  spawn(0, 2, -1);
                  await pause(350);
                  spawn(0, 1);
                  await pause(350);
                  spawn(0, 0, -1);
                  spawn(0, 2, -1);
                  await pause(350);
                  spawn(0, 1);
                  await pause(350);
                  spawn(0, 0, -1);
                  spawn(0, 2, -1);
                  await pause(350);
                  spawn(0, 1);
               });
               break;
            case 5:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(1, 0, -1);
                  spawn(1, 2, -1);
                  await pause(450);
                  spawn(1, 1, -1);
                  await pause(450);
                  spawn(1, 1, -1);
                  await pause(1850);
                  spawn(1, 2);
                  spawn(1, 0);
                  await pause(450);
                  spawn(1, 1);
                  await pause(450);
                  spawn(1, 1);
               });
               break;
            case 6:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(0, 0, 1, 4);
                  spawn(0, 2, 1, 4);
                  await pause(450);
                  spawn(0, 1, 1, 4);
                  spawn(0, 2, 1, 4);
                  await pause(650);
                  spawn(0, 0, 1, 4);
                  spawn(0, 1, 1, 4);
                  await pause(450);
                  spawn(0, 0, 1, 4);
                  spawn(0, 2, 1, 4);
                  await pause(450);
                  spawn(0, 0, 1, 4);
                  spawn(0, 1, 1, 4);
                  await pause(650);
                  spawn(0, 1, 1, 4);
                  spawn(0, 2, 1, 4);
                  await pause(450);
                  spawn(0, 0, 1, 4);
                  spawn(0, 2, 1, 4);
                  await pause(850);
                  spawn(2, 1, 1, 3, 1);
                  spawn(2, 1, 1, 3, -1);
                  await pause(650);
                  spawn(2, 1, -1, 3, 1);
                  spawn(2, 1, -1, 3, -1);
               });
               break;
            case 7:
               await pattern(speedstat, async (spawn, pause, cupcake) => {
                  await cupcake(8000, 12000, async () => {
                     let et = 0;
                     while (et < 7500) {
                        spawn(0, 0, -1, 3);
                        spawn(0, 1, -1, 3);
                        const time = CosmosMath.remap(et / 7500, 750, 500);
                        await pause(time);
                        et += time;
                        if (et < 8000) {
                           spawn(0, 1, -1, 3);
                           spawn(0, 2, -1, 3);
                           const time = CosmosMath.remap(et / 7000, 750, 500);
                           await pause(time);
                           et += time;
                        }
                     }
                  });
               });
               break;
            case 8:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(0, 0);
                  await pause(350);
                  spawn(0, 1, -1);
                  await pause(450);
                  spawn(0, 2);
                  await pause(650);
                  spawn(2, 1, 1, 3, 1);
                  spawn(2, 1, 1, 3, -1);
                  await pause(650);
                  spawn(2, 1, -1, 3, 1);
                  spawn(2, 1, -1, 3, -1);
                  await pause(650);
                  spawn(0, 1);
                  await pause(250);
                  spawn(0, 1);
                  await pause(250);
                  spawn(0, 1);
                  await pause(650);
                  spawn(0, 2, -1);
                  spawn(0, 0, -1);
                  await pause(650);
                  spawn(0, 1);
               });
               break;
            case 9:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(0, 0);
                  spawn(0, 1);
                  await pause(350);
                  spawn(0, 0);
                  spawn(0, 1);
                  await pause(550);
                  spawn(1, 2);
                  await pause(650);
                  spawn(1, 1);
                  await pause(650);
                  spawn(1, 0);
                  await pause(1450);
                  spawn(0, 0);
                  await pause(450);
                  spawn(0, 2, 1, 5.5);
                  await pause(450);
                  spawn(0, 1, 1, 5.5);
                  await pause(450);
                  spawn(0, 0, 1, 5.5);
                  await pause(450);
                  spawn(0, 1, 1, 6);
                  await pause(450);
                  spawn(0, 0, 1, 6);
                  await pause(450);
                  spawn(0, 2, 1, 6.5);
                  await pause(450);
                  spawn(0, 1, 1, 6.5);
                  await pause(450);
                  spawn(0, 0, 1, 6.5);
                  await pause(450);
                  spawn(0, 1, 1, 6.5);
                  await pause(450);
                  spawn(0, 2, 1, 6);
                  spawn(0, 0, 1, 6);
                  await pause(550);
                  spawn(0, 1, 1, 6);
                  await pause(550);
                  spawn(0, 0, 1, 5.5);
                  spawn(0, 1, 1, 5.5);
                  await pause(650);
                  spawn(0, 0, 1, 5.5);
                  spawn(0, 2, 1, 5.5);
                  await pause(750);
                  spawn(0, 1);
                  spawn(0, 2);
               });
               break;
            case 10:
               await pattern(speedstat, async (spawn, pause) => {
                  spawn(1, 0);
                  spawn(1, 0, -1);
                  spawn(1, 2);
                  spawn(1, 2, -1);
                  await pause(650);
                  spawn(0, 1, -1);
                  await pause(350);
                  spawn(0, 1, -1);
                  await pause(850);
                  spawn(2, 1, 1, 3, 1);
                  spawn(2, 1, 1, 3, -1);
                  await pause(650);
                  spawn(2, 1, -1, 3, 1);
                  spawn(2, 1, -1, 3, -1);
                  await pause(350);
                  spawn(0, 2, -1);
                  spawn(0, 2, 1);
                  await pause(450);
                  spawn(0, 1, -1);
                  spawn(0, 1, 1);
                  await pause(450);
                  spawn(0, 0, -1);
                  spawn(0, 0, 1);
                  spawn(0, 2, -1);
                  spawn(0, 2, 1);
                  await pause(450);
                  spawn(0, 1, -1);
                  spawn(0, 1, 1);
                  await pause(1050);
                  spawn(0, 1, -1, 6.5);
                  await pause(350);
                  spawn(0, 0, -1, 6.5);
                  await pause(350);
                  spawn(0, 1, 1, 6.5);
                  await pause(350);
                  spawn(0, 2, 1, 6.5);
                  await pause(350);
                  spawn(0, 1, -1, 6.5);
                  await pause(350);
                  spawn(0, 0, -1, 6.5);
                  await pause(350);
                  spawn(0, 1, 1, 6.5);
                  await pause(350);
                  spawn(0, 2, 1, 6.5);
                  await pause(350);
                  spawn(2, 0, -1, 3, 1);
                  spawn(2, 2, -1, 3, -1);
                  await pause(850);
                  spawn(2, 0, 1, 3, 1);
                  spawn(2, 2, 1, 3, -1);
                  await pause(850);
                  spawn(2, 0, -1, 3, 1);
                  spawn(2, 2, -1, 3, -1);
                  await pause(1250);
                  spawn(1, 0);
                  spawn(1, 0, -1);
                  spawn(1, 2);
                  spawn(1, 2, -1);
                  await pause(650);
                  spawn(1, 1);
                  spawn(1, 1, -1);
                  await pause(1250);
                  spawn(1, 1);
                  spawn(1, 1, -1);
                  await pause(650);
                  spawn(1, 0);
                  spawn(1, 0, -1);
                  spawn(1, 2);
                  spawn(1, 2, -1);
               });
               break;
            case 11:
               await pattern(speedstat, async (spawn, pause, cupcake) => {
                  await cupcake(8000, 12000, async () => {
                     let et = 0;
                     const cts = [ 0, 0, 0 ];
                     while (et < 7500) {
                        const row = Math.floor(random.next() * 3);
                        if (cts[row]++ < 2) {
                           spawn(0, row, -1, 6);
                           const time = CosmosMath.remap(et / 7500, 550, 300);
                           await pause(time);
                           et += time;
                           for (const idx of cts.keys()) {
                              idx === row || (cts[idx] = 0);
                           }
                        }
                     }
                  });
               });
               break;
         }
      };
   })(),
   async radtile () {
      if (random.next() < 0.5) {
         const mro = 20;
         const baseAngle = -90 - mro * 2;
         await battler.sequence(5, async (promises, index) => {
            let rotations = 0;
            const distance = new CosmosValue(90);
            const startAngle = new CosmosValue(baseAngle + index * mro);
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  size: { x: 19, y: 3 },
                  anchor: { y: 0, x: -0.1428571428571429 },
                  metadata: { bullet: true, damage: 4 },
                  objects: [ new CosmosSprite({ anchor: { y: 0, x: -0.1428571428571429 }, frames: [ content.ibbHat ] }) ]
               }).on('tick', function () {
                  this.rotation.value = startAngle.value;
                  this.position.set(battler.box.position.endpoint(startAngle.value, distance.value));
               }),
               false,
               null
            );
            (async () => {
               while (rotations++ < 5) {
                  await distance.modulate(timer, 1200, 2, 2);
                  const finalAngle = startAngle.value + (90 + random.next() * 180);
                  await startAngle.modulate(timer, 900, startAngle.value, finalAngle, finalAngle);
                  await timer.pause(350);
                  await distance.modulate(timer, 600, distance.value, 90);
                  await timer.pause(250);
               }
               detach();
            })();
            promises.push(detached);
         });
      } else {
         const limY = battler.box.position.y + battler.box.size.y / 2 + 15;
         await battler.sequence(12, async promises => {
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  scale: 1.25,
                  size: { x: 19, y: 3 },
                  anchor: { y: 0, x: -0.1428571428571429 },
                  position: pastBox(15, 0).position,
                  metadata: { bullet: true, damage: 4 },
                  spin: random.next() < 0.5 ? -8 : 8,
                  gravity: { angle: 90, extent: 0.05 },
                  objects: [ new CosmosSprite({ anchor: { y: 0, x: -0.1428571428571429 }, frames: [ content.ibbHat ] }) ]
               }).on('tick', function () {
                  if (this.position.y > limY) {
                     detach();
                  }
               })
            );
            promises.push(detached);
            await timer.pause(400);
         });
      }
   },
   async woshua (cleaners = false, modifier = 'none' as 'none' | 'moldbygg') {
      let attack = 0;
      cleaners || (attack = random.next() < 0.5 ? 0 : 1);
      if (attack === 0) {
         let cleansed = false;
         const healListener = () => {
            if (!cleansed) {
               cleansed = true;
               for (const volatile of battler.volatile) {
                  if (volatile.vars.clean === false && !volatile.sparable) {
                     volatile.sparable = true;
                     battler.g += 35;
                     save.data.b.spared_woshua = true;
                     volatile.vars.clean = true;
                  }
               }
            }
         };
         const tl = 30;
         const ti = modifier === 'moldbygg' ? 7000 : 5000;
         battler.SOUL.position.y = 170;
         cleaners && events.on('heal', healListener);
         const growhFactor = 1.25;
         const boxX = battler.box.position.x;
         const spawnCoord = (e: number) => (e - boxX) * growhFactor + boxX;
         const minX = boxX - battler.box.size.x / 2;
         const maxX = boxX + battler.box.size.x / 2;
         const minSpawnX = spawnCoord(minX);
         const maxSpawnX = spawnCoord(maxX);
         const bY = battler.box.position.y - battler.box.size.y / 2 - 10;
         const dY = battler.box.position.y + battler.box.size.y / 2 + 10;
         await battler.sequence(tl, async (promises, index) => {
            const r = random.next();
            const green = cleaners && index % 10 === 0;
            const pos = new CosmosPoint(minSpawnX + r * (maxSpawnX - minSpawnX), bY);
            const angle = pos.angleTo({ x: minX + r * (maxX - minX), y: dY });
            const { detached, detach } = bulletSetup(
               new CosmosHitbox({
                  size: { x: 9, y: 11 },
                  anchor: 0,
                  position: pos,
                  rotation: angle - 90,
                  scale: 0.125,
                  gravity: { angle, extent: 0.05 },
                  metadata: { damage: green ? 2 : 4, bullet: true, color: green ? 'green' : 'white' },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        position: { y: -3 },
                        resources: content.ibbWater,
                        index: green ? 1 : 0
                     })
                  ]
               }).on('tick', function () {
                  if (this.position.y < dY) {
                     this.scale.set(CosmosMath.remap((dY - this.position.y) / (dY - bY), 1, 0.125));
                  } else {
                     detach();
                  }
               })
            );
            promises.push(detached);
            await timer.pause(ti / tl);
         });
         cleaners && events.off('heal', healListener);
      } else {
         let stage = 0;
         let ticks = 0;
         const speed = modifier === 'moldbygg' ? 2 : 3;
         const speedinc = modifier === 'moldbygg' ? 0.1 : 0.2;
         const minX = battler.box.position.x - battler.box.size.x / 2;
         const maxX = battler.box.position.x + battler.box.size.x / 2;
         const minY = battler.box.position.y - battler.box.size.y / 2;
         const maxY = battler.box.position.y + battler.box.size.y / 2;
         const size = new CosmosPoint({ x: 11, y: 18 });
         const half = size.divide(2);
         const angle = 45;
         const sparklebox = new CosmosObject();
         battler.bullets.attach(sparklebox);
         const random3 = random.clone();
         const { detach, detached } = bulletSetup(
            new CosmosHitbox({
               priority: 10,
               anchor: 0,
               size,
               position: new CosmosPoint(
                  random.next() < 0.5 ? maxX - 10 : minX + 10,
                  random.next() < 0.5 ? maxY - 10 : minY + 10
               ),
               metadata: { bullet: true, damage: 4, ae: 0 },
               velocity: new CosmosPoint().endpoint(
                  [ 90 - angle, 90 + angle, 270 - angle, 270 + angle ][Math.floor(random.next() * 4)],
                  speed
               ),
               objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbSoap ] }) ]
            }).on('tick', function () {
               const ae = this.metadata.ae++;
               if (ae % 4 === 0) {
                  const sparkler = new CosmosAnimation({
                     active: true,
                     priority: -10,
                     anchor: 0,
                     scale: 0.5,
                     position: this.position.add(random3.next() * size.x - half.x, random3.next() * size.y - half.y),
                     resources: content.ibbGlitter
                  });
                  sparklebox.attach(sparkler);
                  sparkler.scale.modulate(timer, 1250, { x: 0.1, y: 0.1 }).then(() => {
                     sparklebox.objects.splice(sparklebox.objects.indexOf(sparkler), 1);
                  });
               }
               if (stage === 0) {
                  let rotate = false;
                  if (this.position.x + half.x > maxX) {
                     this.velocity.x *= -1;
                     this.position.x = maxX - half.x;
                     rotate = true;
                  }
                  if (this.position.x - half.x < minX) {
                     this.velocity.x *= -1;
                     this.position.x = minX + half.x;
                     rotate = true;
                  }
                  if (this.position.y + half.y > maxY) {
                     this.velocity.y *= -1;
                     this.position.y = maxY - half.y;
                     rotate = true;
                  }
                  if (this.position.y - half.y < minY) {
                     this.velocity.y *= -1;
                     this.position.y = minY + half.y;
                     rotate = true;
                  }
                  if (rotate) {
                     this.velocity.extent += speedinc;
                  }
                  if (++ticks === 30 * (modifier === 'moldbygg' ? 12 : 8)) {
                     ticks = 0;
                     stage = 1;
                  }
               } else if (this.position.extentOf(battler.box.position) > 60) {
                  detach();
               }
            }),
            false,
            null
         );
         await detached;
         battler.bullets.objects.splice(battler.bullets.objects.indexOf(sparklebox), 1);
      }
   },
   async moldbygg (modifier = 'none' as 'none' | 'woshua' | 'moldsmal') {
      if (random.next() < 0.5) {
         await battler.sequence(5, async promises => {
            const step = 11;
            const time = timer.value;
            const OGpos = pastBox(8, 2).position;
            const basePos = OGpos.clone();
            const topPart = new CosmosHitbox({
               size: 12,
               anchor: 0,
               metadata: { bullet: true, damage: 5 },
               objects: [ new CosmosAnimation({ anchor: 0, scale: 0.5, resources: content.ibbWorm, index: 1 }) ]
            }).on('tick', function () {
               this.position.set(basePos.add(sineWaver(time, 3500, -2, 2), 0));
            });
            const middlePart = new CosmosHitbox({
               size: 12,
               anchor: 0,
               metadata: { bullet: true, damage: 5 },
               objects: [ new CosmosAnimation({ anchor: 0, scale: 0.5, resources: content.ibbWorm }) ]
            }).on('tick', function () {
               this.position.set(basePos.add(-sineWaver(time, 3500, -2, 2), step));
            });
            const bottomPart = new CosmosHitbox({
               size: 12,
               anchor: 0,
               metadata: { bullet: true, damage: 5 },
               objects: [ new CosmosAnimation({ anchor: 0, scale: 0.5, resources: content.ibbWorm }) ]
            }).on('tick', function () {
               this.position.set(basePos.add(sineWaver(time, 3500, -2, 2), step * 2));
            });
            const bullet1 = bulletSetup(bottomPart);
            const bullet2 = bulletSetup(middlePart);
            const bullet3 = bulletSetup(topPart);
            let itsAllOgre = false;
            promises.push(
               Promise.race([
                  bullet3.detached,
                  basePos.modulate(timer, 1500, basePos.subtract(0, 32), basePos.subtract(0, 32)).then(async () => {
                     let index = 0;
                     while (index++ < 3) {
                        if (!itsAllOgre) {
                           const { bullet, detach, detached } = bulletSetup(
                              new CosmosHitbox({
                                 anchor: 0,
                                 size: 17 / 2,
                                 position: basePos,
                                 scale: 0.75,
                                 metadata: { bullet: true, damage: 4 },
                                 velocity: new CosmosPoint().endpoint(basePos.angleTo(battler.SOUL.position), 2),
                                 objects: [
                                    new CosmosSprite({
                                       anchor: 0,
                                       scale: 0.5,
                                       frames: [ content.ibbLooxCircle3 ]
                                    })
                                 ]
                              })
                           );
                           bullet.scale.modulate(timer, 1500, { x: 1.5, y: 1.5 }).then(async () => {
                              await bullet.alpha.modulate(timer, 1000, 0);
                              detach();
                           });
                           promises.push(detached);
                           await timer.pause(250);
                        }
                     }
                     itsAllOgre || (await timer.pause(1500));
                  })
               ]).then(async () => {
                  itsAllOgre = true;
                  await basePos.modulate(timer, 1500, basePos, OGpos);
                  bullet1.detach();
                  bullet2.detach();
                  bullet3.detach();
               })
            );
            await timer.pause(2000);
         });
      } else {
         const ea = 32;
         const dvPleaseDontDeleteThisViteKthx = ea / 2;
         const mi = battler.box.position.x - battler.box.size.x / 4;
         const ma = mi + battler.box.size.x / 2;
         const gs = 15;
         const sep = 7;
         const bY = battler.box.position.y - battler.box.size.y / 2 - 5;
         const rY = modifier === 'woshua' ? 1.5 : 2;
         await battler.sequence(modifier === 'woshua' ? 4 : 6, async promises => {
            let cx = mi + random.next() * (ma - mi);
            let direc = random.next() < 0.5 ? -1 : 1;
            promises.push(
               battler.sequence(ea, async (promises, i) => {
                  const { detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: 4,
                        scale: 0.5,
                        metadata: { bullet: true, damage: 4 },
                        position: { y: bY },
                        objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbOctagon ] }) ]
                     }).on('tick', function () {
                        if (i === 0) {
                           cx += direc;
                           if (cx <= mi || ma <= cx) {
                              direc *= -1;
                              cx += direc;
                           }
                        }
                        this.position.x =
                           cx +
                           (i < dvPleaseDontDeleteThisViteKthx
                              ? -gs - i * sep
                              : gs + (i - dvPleaseDontDeleteThisViteKthx) * sep);
                        this.position.y += rY;
                        if (this.position.y > 160 && boxCheck(this, 10)) {
                           detach();
                        }
                     })
                  );
                  promises.push(detached);
               })
            );
            await timer.pause(modifier === 'woshua' ? 2000 : 1000);
         });
      }
   },
   undyne: (() => {
      let time: number;
      let belltimer = 0;
      const dirs = [ 'up', 'left', 'right', 'down' ] as CosmosDirection[];
      const colors = { blue: 0, yellow: 2, purple: 3, green: 4 };
      const cage = new CosmosSprite({
         alpha: 0,
         scale: 0.5,
         anchor: 0,
         frames: [ content.ibcUndyneCage ],
         objects: [
            new CosmosAnimation({
               anchor: 0,
               resources: content.ibcUndyneShield
            }).on('tick', function () {
               if (belltimer === 0) {
                  this.index = 0;
               } else {
                  this.index = 1;
                  belltimer--;
               }
            })
         ]
      }).on('tick', function () {
         this.position.set(battler.box.position);
      });
      const spawned = [] as { sprite: CosmosSprite; time: number }[];
      function spawncheck () {
         spawned.sort((spawnee1, spawnee2) => spawnee1.time - spawnee2.time);
         for (const [ index, { sprite } ] of spawned.entries()) {
            if (index === 0) {
               sprite.index = 1;
            } else {
               sprite.index = 0;
            }
         }
      }
      async function spear (color: keyof typeof colors, direction = 'up' as CosmosDirection, speed: number, damage = 5) {
         const vector = new CosmosPoint(
            [ 'up', 'down' ].includes(direction)
               ? { x: 0, y: direction === 'up' ? -1 : 1 }
               : { x: direction === 'left' ? -1 : 1, y: 0 }
         );
         const spawnPosition = new CosmosPoint(160, 120).add(new CosmosPoint(160, 160).multiply(vector));
         const distanceToCenter = spawnPosition.extentOf(160, 120);
         return new Promise<boolean>(resolve => {
            const sprite = new CosmosAnimation({
               scale: 1 / 2,
               index: colors[color],
               anchor: { x: 1, y: 0 },
               rotation: { up: 90, left: 0, right: 180, down: 270 }[direction] + (color === 'yellow' ? 180 : 0),
               resources: content.ibbArrow,
               position: spawnPosition,
               velocity: new CosmosPoint(vector).multiply(-speed),
               metadata: { stage: 0, active: color !== 'yellow', trig1: false, trig2: false, cooked: false },
               priority: 3
            }).on('tick', async function () {
               if (this.metadata.cooked) {
                  return;
               }
               const DESTIE = this.position.extentOf(battler.SOUL.position);
               switch (color) {
                  case 'green':
                     if (this.metadata.stage === 0) {
                        if (DESTIE < 96) {
                           this.metadata.stage = 1;
                           await this.alpha.modulate(timer, 200, 0);
                           this.index = 5;
                           this.metadata.stage = 2;
                        }
                     } else if (this.metadata.stage === 2) {
                        const echo = shadow(
                           sprite,
                           echoSpr => this.metadata.cooked === true || (echoSpr.alpha.value /= 1.5) < 0.001,
                           {
                              alpha: Math.min(Math.max(CosmosMath.remap(DESTIE, 0, 0.4, 96, 28), 0), 0.4),
                              priority: 2
                           }
                        );
                        timer.post().then(() => {
                           renderer.attach('menu', echo.object);
                           echo.promise.then(() => {
                              renderer.detach('menu', echo.object);
                           });
                        });
                     } else if (this.metadata.stage === 3) {
                        if (DESTIE > 48) {
                           this.metadata.stage = 4;
                           this.index = 4;
                           this.alpha.value = 0;
                           timer.post().then(() => {
                              renderer.detach('menu', this);
                           });
                           resolve(true);
                        } else {
                           const echo = shadow(
                              sprite,
                              echoSpr => this.metadata.cooked === true || (echoSpr.alpha.value /= 1.5) < 0.001,
                              {
                                 alpha: Math.min(Math.max(CosmosMath.remap(DESTIE, 0, 0.4, 48, 14), 0), 0.4),
                                 priority: 2
                              }
                           );
                           timer.post().then(() => {
                              renderer.attach('menu', echo.object);
                              echo.promise.then(() => {
                                 renderer.detach('menu', echo.object);
                              });
                           });
                        }
                     }
                     break;
                  case 'purple':
                     this.metadata.active = true;
                     if (this.metadata.stage === 0) {
                        if (DESTIE < 72) {
                           this.metadata.stage = 1;
                           const ideal = this.velocity.clone();
                           const disappear = this.position.value();
                           const OMGItsAPortal = new CosmosAnimation({
                              active: true,
                              rotation: this.rotation.value,
                              position: disappear,
                              anchor: { x: 1, y: 0 },
                              priority: 20,
                              scale: 0.5,
                              resources: content.ibbArrowportal
                           });
                           this.velocity.set(0);
                           renderer.attach('menu', OMGItsAPortal);
                           const portalSpeed = vector.multiply(-1).extent;
                           while ((this.subcrop.right += portalSpeed) < 25) {
                              await this.on('tick');
                           }
                           this.alpha.value = 0;
                           this.subcrop.right = 0;
                           OMGItsAPortal.alpha.value = 0;
                           await renderer.pause(3000 / speed);
                           this.index = 6;
                           OMGItsAPortal.rotation.value += 180;
                           OMGItsAPortal.alpha.value = 1;
                           this.velocity.set(ideal.divide(2));
                           this.subcrop.left = 25;
                           this.alpha.value = 1;
                           while ((this.subcrop.left -= ideal.extent) > 0) {
                              await this.on('tick');
                           }
                           this.subcrop.left = 0;
                           renderer.detach('menu', OMGItsAPortal);
                           this.velocity.set(ideal);
                        }
                     }
                     break;
                  case 'yellow':
                     if (this.metadata.stage === 0) {
                        if (DESTIE < 28) {
                           this.metadata.stage = 1;
                           const ideal = this.velocity.multiply(-1);
                           this.velocity.set(0, 0);
                           await this.position.modulate(
                              timer,
                              400,
                              this.position.shift(115, 45, battler.SOUL.position),
                              this.position.shift(180, 20, battler.SOUL.position)
                           );
                           this.velocity.set(ideal);
                           this.metadata.active = true;
                        }
                     }
                     break;
               }
               if (this.metadata.active) {
                  if (!this.metadata.trig1) {
                     if (
                        color === 'yellow'
                           ? spawnPosition.extentOf(this) < distanceToCenter + 14
                           : spawnPosition.extentOf(this) > distanceToCenter - 14
                     ) {
                        this.metadata.trig1 = true;
                        if (
                           battler.volatile[0].vars.shield ===
                           (color === 'yellow'
                              ? { up: 'down', down: 'up', left: 'right', right: 'left' }[direction]
                              : direction)
                        ) {
                           (cage.objects[0] as CosmosSprite).index = 1;
                           belltimer = 3;
                           this.metadata.cooked = true;
                           if (color === 'green') {
                              this.velocity.set(0);
                              this.anchor.x = 0;
                              this.position.set(this.position.add(vector.multiply(this.compute().divide(2))));
                              this.alpha.value = 0.75;
                              this.alpha.modulate(timer, 200, 0, 0);
                              this.scale.modulate(timer, 200, { x: 2.5, y: 2.5 }, { x: 2.5, y: 2.5 });
                              assets.sounds.bomb.instance(timer);
                              await timer.pause(150);
                              battler.invulnerable || battler.damage(battler.SOUL.sprite, damage);
                              await timer.pause(50);
                              timer.post().then(() => {
                                 renderer.detach('menu', this);
                              });
                              resolve(false);
                           } else {
                              assets.sounds.bell.instance(timer);
                              this.alpha.value = 0;
                              timer.post().then(() => {
                                 renderer.detach('menu', this);
                              });
                              if (color === 'blue') {
                                 spawned.shift();
                                 spawncheck();
                              }
                              resolve(true);
                           }
                        }
                     }
                  }
                  if (!this.metadata.trig2) {
                     if (
                        color === 'yellow'
                           ? spawnPosition.extentOf(this) < distanceToCenter + 4
                           : spawnPosition.extentOf(this) > distanceToCenter - 4
                     ) {
                        this.metadata.trig2 = true;
                        if (color === 'green') {
                           this.metadata.stage = 3;
                        } else {
                           this.metadata.cooked = true;
                           battler.invulnerable || battler.damage(battler.SOUL.sprite, damage);
                           timer.post().then(() => {
                              renderer.detach('menu', this);
                           });
                           if (color === 'blue') {
                              spawned.shift();
                              spawncheck();
                           }
                           resolve(false);
                        }
                     }
                  }
               }
            });
            if (color === 'blue') {
               spawned.push({ sprite, time: time + 145 / speed });
               spawncheck();
            }
            renderer.attach('menu', sprite);
         });
      }
      const ticker = () => {
         time += 1;
         battler.volatile[0].container.tint = CosmosBitmap.color2hex(
            CosmosUtils.populate(4, () => Math.round(255 * battler.alpha.value)) as CosmosColor
         );
      };
      let cooldown = false;
      const keyHandler = async function (this: CosmosKeyboardInput) {
         if (!cooldown) {
            const curDur = battler.volatile[0].vars.shield;
            if (curDur) {
               let newDir: CosmosDirection;
               switch (this) {
                  case keys.upKey:
                     newDir = 'up';
                     break;
                  case keys.leftKey:
                     newDir = 'left';
                     break;
                  case keys.rightKey:
                     newDir = 'right';
                     break;
                  default:
                     newDir = 'down';
                     break;
               }
               if (curDur !== newDir) {
                  cooldown = true;
                  const fr = cage.objects[0].rotation.value;
                  const to = { up: 270, left: 180, right: 0, down: 90 }[newDir];
                  const di = [ to - fr, to + 360 - fr, to - 360 - fr, to + 720 - fr, to - 720 - fr ].sort(
                     (a, b) => Math.abs(a) - Math.abs(b)
                  )[0];
                  const rotspeed = CosmosMath.remap(battler.stat.speed.compute(), 25, 0, 2, 3);
                  await cage.objects[0].rotation.modulate(timer, rotspeed, fr + di / 2);
                  battler.volatile[0].vars.shield = newDir;
                  await cage.objects[0].rotation.modulate(timer, rotspeed, fr + di);
                  cage.objects[0].rotation.value = to;
                  cooldown = false;
               }
            }
         }
      };
      async function sequence (
         swing: boolean,
         generator: (spawn: typeof spear, pause: (time: number) => Promise<void>) => Promise<void>
      ) {
         const vola = battler.volatile[0];
         time = 0;
         belltimer = 0;
         battler.box.metadata.alpha = 1;
         renderer.on('tick', ticker);
         vola.vars.shield = 'up';
         cage.objects[0].rotation.value = 270;
         battler.alpha.modulate(timer, 300, 0.2);
         await battler.box.size.modulate(timer, 300, { x: 36, y: 36 });
         renderer.attach('menu', cage);
         cage.alpha.modulate(timer, 150, 1);
         await battler.box.position.modulate(timer, 150, { y: 120 });
         battler.SOUL.position.set(battler.box.position);
         battler.SOUL.alpha.value = 1;
         for (const dir of dirs) {
            keys[`${dir}Key`].on('down', keyHandler);
         }
         const promises = [] as Promise<boolean>[];
         const speedo = (vola.vars.speed - 1) * 0.75 + 1;
         await generator(
            (color, direction, speed, damage = 5) => {
               const subpromise = spear(color, direction, speed * speedo, damage * (vola.vars.aktatk ?? 1));
               promises.push(subpromise);
               return subpromise;
            },
            time => renderer.pause(time / speedo)
         );
         const results = await Promise.all(promises);
         if (vola.vars.phase === 0 && !results.includes(false)) {
            vola.vars.phase = 1;
            vola.vars.turns = 0;
         }
         for (const dir of dirs) {
            keys[`${dir}Key`].off('down', keyHandler);
         }
         cage.alpha.modulate(timer, 150, 0).then(() => {
            renderer.detach('menu', cage);
         });
         if (swing) {
            await timer.pause(250);
            vola.vars.armswing = true;
            await timer.when(() => vola.vars.armswing === false);
            if (world.genocide || vola.vars.phase === 5) {
               battler.flee = false;
            }
         }
         battler.SOUL.alpha.value = 0;
         await battler.box.position.modulate(timer, 150, { y: 160 });
         battler.alpha.modulate(timer, 300, 1);
         await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
         renderer.off('tick', ticker);
         battler.box.metadata.alpha = void 0;
      }
      async function boxTo (x: number, y: number, p = true) {
         await Promise.all([
            battler.box.size.modulate(timer, 300, { x, y }),
            battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - y / 2 })
         ]);
         p && battler.SOUL.position.set(battler.box.position);
         battler.SOUL.alpha.value = 1;
      }
      async function boxRe (swing: boolean) {
         battler.box.size.y > 100 && (await boxTo(battler.box.size.x, 65, false));
         const vola = battler.volatile[0];
         if (swing) {
            await timer.pause(250);
            vola.vars.armswing = true;
            await timer.when(() => vola.vars.armswing === false);
            if (world.genocide || vola.vars.phase === 5) {
               battler.flee = false;
            }
         }
         battler.SOUL.alpha.value = 0;
         await Promise.all([
            battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 }),
            battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 160 })
         ]);
      }
      function redspear (atk = 1, prop: CosmosSizedObjectProperties = {}) {
         return new CosmosHitbox(
            Object.assign(
               {
                  metadata: { bullet: true, damage: 5 * atk },
                  anchor: 0,
                  size: { x: 27, y: 4 },
                  objects: [ new CosmosSprite({ anchor: prop.anchor ?? 0, frames: [ content.ibbRedspear ] }) ]
               },
               prop
            )
         );
      }
      async function standard (swing: boolean) {
         const vola = battler.volatile[0];
         const geno = world.genocide;
         const ats = (vola.vars.attacktypes ??= []) as number[];
         let attacktype = -1;
         while (attacktype === -1 || ats.includes(attacktype)) {
            attacktype = Math.floor(random.next() * 4);
         }
         ats.push(attacktype);
         ats.length > 2 && ats.splice(0, 2);
         switch (attacktype as number) {
            case 0:
               if (geno) {
                  // small box attack
                  await boxTo(16, 65);
                  await Promise.all([
                     battler.box.size.modulate(timer, 150, { y: 16 }),
                     battler.box.position.modulate(timer, CosmosMath.linear, 150, {
                        y: battler.box.position.y - battler.box.size.y / 2 + 8
                     })
                  ]);
                  const ds = 4;
                  const de = 140;
                  const bx = battler.box.x;
                  const by = battler.box.y;
                  const startset = [
                     [ bx - de, by - ds, 0 ],
                     [ bx - de, by + ds, 0 ],
                     [ bx - ds, by - de, 90 ],
                     [ bx + ds, by - de, 90 ],
                     [ bx + de, by - ds, 180 ],
                     [ bx + de, by + ds, 180 ],
                     [ bx - ds, by + de, 270 ],
                     [ bx + ds, by + de, 270 ]
                  ];
                  await battler.sequence(14, async promises => {
                     const [ x, y, rotation ] = startset[Math.floor(random.next() * startset.length)];
                     const spear = redspear(vola.vars.aktatk ?? 1, {
                        alpha: 0,
                        position: { x, y },
                        rotation,
                        velocity: new CosmosPoint().endpoint(rotation, 5)
                     }).on('tick', function () {
                        screenCheck(this, 10) && detach();
                     });
                     const { detach, detached } = bulletSetup(spear, true, null);
                     promises.push(detached);
                     assets.sounds.appear.instance(timer);
                     spear.alpha.modulate(timer, 150, 1);
                     await timer.pause(450);
                  });
                  await Promise.all([
                     battler.box.size.modulate(timer, 150, { y: 65 }),
                     battler.box.position.modulate(timer, CosmosMath.linear, 150, { y: 160 })
                  ]);
                  await battler.box.size.modulate(timer, 150, { y: 65 });
                  await boxRe(swing);
               } else {
                  // moving gap attack
                  await boxTo(282.5, 65);
                  const amt = 25;
                  const unit = battler.box.size.x / amt;
                  const base = battler.box.position.x - battler.box.size.x / 2 + unit / 2;
                  const gap = new CosmosValue(battler.box.position.x);
                  const ext = new CosmosValue(0);
                  const spears = CosmosUtils.populate(amt * 2, index => {
                     const top = index < amt;
                     return bulletSetup(
                        redspear(vola.vars.aktatk ?? 1, {
                           position: { x: base + (index % amt) * unit },
                           anchor: { x: 1, y: 0 },
                           rotation: top ? 90 : -90
                        }).on('tick', function () {
                           this.alpha.value = ext.value;
                           this.position.y =
                              battler.box.position.y +
                              (top ? -1 : 1) *
                                 CosmosMath.remap(Math.min(Math.abs(gap.value - this.position.x), 40), 25, 1, 0, 40);
                        }),
                        false,
                        null
                     );
                  });
                  assets.sounds.appear.instance(timer);
                  await ext.modulate(timer, 300, 1);
                  let rounds = 8;
                  while (rounds-- > 0) {
                     let nx = gap.value;
                     while (Math.abs(nx - gap.value) < 80) {
                        nx = battler.box.position.x + (random.next() - 0.5) * battler.box.size.x;
                     }
                     await gap.step(timer, 1.6, nx);
                  }
                  for (const spear of spears) {
                     spear.detach();
                  }
                  await boxRe(swing);
               }
               break;
            case 1:
               if (geno) {
                  // enclosing circles attack
                  await boxTo(282.5, 120);
                  await battler.sequence(8, async (promises, index) => {
                     const a = new CosmosValue();
                     const rad = new CosmosValue(70);
                     const rot = new CosmosValue();
                     const amt = 8;
                     const ctr = battler.SOUL.position.clone();
                     const sd = random.next() < 0.5 ? -180 : 180;
                     const spears = CosmosUtils.populate(amt, index => {
                        const ba = (index / amt) * 360;
                        return bulletSetup(
                           redspear().on('tick', function () {
                              const selfrot = rot.value + ba;
                              this.position = ctr.endpoint(selfrot, rad.value);
                              this.rotation.value = selfrot + 180;
                              this.alpha.value = a.value;
                           }),
                           true,
                           null
                        );
                     });
                     a.modulate(timer, 300, 1);
                     rot.modulate(timer, 1800, sd, sd, sd, sd);
                     rad.modulate(timer, 1800, rad.value, rad.value, 10, 10);
                     promises.push(
                        timer.pause(1500).then(async () => {
                           await a.modulate(timer, 300, 0);
                           for (const spear of spears) {
                              spear.detach();
                           }
                        })
                     );
                     index === 7 || (await timer.pause(1200));
                  });
                  await boxRe(swing);
               } else {
                  // spear volley attack
                  await boxTo(100, 100);
                  const units = 10;
                  const unitX = battler.box.size.x / units;
                  const baseX = battler.box.position.x - battler.box.size.x / 2;
                  const botto = battler.box.position.y + battler.box.size.y / 2 + 15;
                  await battler.sequence(3, async (promises, round) => {
                     const times = CosmosUtils.populate(10, index => index);
                     await battler.sequence(10, async (subpromises, index) => {
                        const time = times.splice(Math.floor(random.next() * times.length), 1)[0];
                        const pos = { x: baseX + unitX / 2 + index * unitX, y: botto };
                        const spear = redspear(vola.vars.aktatk ?? 1, { position: pos, rotation: -90 }).on(
                           'tick',
                           function () {
                              this.position.y < battler.box.position.y && boxCheck(this, 25) && detach();
                           }
                        );
                        const { detach, detached } = bulletSetup(spear, false, null);
                        promises.push(detached);
                        subpromises.push(
                           timer.pause(time * 250).then(async () => {
                              assets.sounds.arrow.instance(timer);
                              spear.velocity.set(
                                 new CosmosPoint().endpoint(
                                    spear.rotation.value,
                                    CosmosMath.remap(random.next(), 2, 4.5)
                                 )
                              );
                           })
                        );
                     });
                     if (round < 2) {
                        await timer.pause(250);
                     }
                  });
                  await boxRe(swing);
               }
               break;
            case 2:
               if (geno) {
                  // random direction spears
                  await boxTo(120, 120);
                  await battler.sequence(20, async promises => {
                     const pos = pastBox(20).position;
                     const offie = new CosmosValue(360);
                     let fired = false;
                     const spear = redspear(vola.vars.aktatk ?? 1, { alpha: 0, position: pos }).on('tick', function () {
                        if (fired) {
                           screenCheck(this, 10) && detach();
                        } else {
                           this.rotation.value = pos.angleTo(battler.SOUL.position) - offie.value;
                        }
                     });
                     const { detach, detached } = bulletSetup(spear, true, null);
                     assets.sounds.appear.instance(timer);
                     promises.push(detached);
                     Promise.all([ offie.modulate(timer, 800, 0, 0), spear.alpha.modulate(timer, 800, 1) ]).then(
                        async () => {
                           fired = true;
                           assets.sounds.arrow.instance(timer);
                           spear.velocity.set(new CosmosPoint().endpoint(spear.rotation.value, 5));
                        }
                     );
                     await timer.pause(650 / vola.vars.speed);
                  });
                  await boxRe(swing);
               } else {
                  // star attack
                  await boxTo(100, 100);
                  const spokes = 5;
                  const spokeDiv = 360 / spokes;
                  const spearDiv = spokeDiv / 2;
                  const mRad = new CosmosValue(25);
                  const mPos = new CosmosPoint(battler.box.position);
                  const mAng = new CosmosValue();
                  const aAlp = new CosmosValue(0);
                  const aOff = new CosmosValue(1);
                  const spears = CosmosUtils.populate(spokes * 2, i => {
                     return bulletSetup(
                        redspear().on('tick', function () {
                           const lineAng = spearDiv / 2 + i * spearDiv;
                           const linePos = mPos.add(starGenerator(mRad.value, mRad.value, spokes, lineAng, mAng.value));
                           this.position.set(linePos.endpoint(lineAng - 90, 100 * aOff.value));
                           const lineRot = Math.floor(i / 2) * spokeDiv + (spokeDiv - (i % 2) * spokeDiv);
                           this.rotation.value = lineRot - 90 * aOff.value + mAng.value;
                           this.alpha.value = aAlp.value;
                        }),
                        true,
                        null
                     );
                  });
                  const ticker = () => (mAng.value += 1);
                  assets.sounds.appear.instance(timer);
                  renderer.on('tick', ticker);
                  await Promise.all([ aAlp.modulate(timer, 1000, 1, 1), aOff.modulate(timer, 1000, 0, 0) ]);
                  await battler.sequence(10, async promises => {
                     const rev = random.next() < 0.5;
                     const x = rev ? -10 : 330;
                     const y = battler.box.position.y + (random.next() * 2 - 1) * 10;
                     const { detach, detached } = bulletSetup(
                        redspear(vola.vars.aktatk ?? 1, {
                           position: { x, y },
                           velocity: { x: rev ? 6 : -6 },
                           rotation: rev ? 0 : 180
                        }).on('tick', function () {
                           screenCheck(this, 20) && detach();
                        }),
                        true,
                        null
                     );
                     assets.sounds.arrow.instance(timer);
                     promises.push(detached);
                     await timer.pause(450);
                  });
                  await timer.pause(600);
                  renderer.off('tick', ticker);
                  for (const spear of spears) {
                     spear.detach();
                  }
                  await boxRe(swing);
               }
               break;
            case 3:
               if (geno) {
                  await boxTo(90, 90);
                  const count = 16;
                  const div = 360 / count;
                  const mainRot = new CosmosValue();
                  const mainDist = new CosmosValue(55);
                  let targetspear = null as number | null;
                  const sd = new CosmosValue(random.next() < 0.5 ? -2 : 2);
                  const sp = CosmosUtils.populate(count, index => {
                     const ang = index * div;
                     const targetspearDist = new CosmosValue();
                     const targetspearShake = new CosmosValue();
                     return bulletSetup(
                        redspear().on('tick', async function () {
                           index === 0 && (mainRot.value += sd.value);
                           this.rotation.value = ang + mainRot.value + 180;
                           if (index === targetspear || this.metadata.targeted) {
                              this.position = battler.box.position.endpoint(
                                 ang + mainRot.value,
                                 mainDist.value - targetspearDist.value
                              );
                              if (targetspearShake.value > 0) {
                                 this.position.set(
                                    this.position.add(
                                       new CosmosPoint(Math.random(), Math.random())
                                          .multiply(2)
                                          .subtract(1)
                                          .multiply(targetspearShake.value)
                                    )
                                 );
                              }
                              if (!this.metadata.targeted) {
                                 this.metadata.targeted = true;
                                 this.tint = 0xff0000;
                                 await targetspearShake.modulate(timer, 850, 0, 3, 3);
                                 shake(1, 300);
                                 assets.sounds.stab.instance(timer);
                                 targetspearShake.modulate(timer, 166, 0);
                                 this.tint = void 0;
                                 await targetspearDist.modulate(timer, 200, 50, 50, 50);
                                 await timer.pause(300);
                                 await targetspearDist.modulate(timer, 100, 50, 0, 0);
                                 await timer.pause(500);
                                 this.metadata.targeted = false;
                              }
                           } else {
                              this.position = battler.box.position.endpoint(ang + mainRot.value, mainDist.value);
                           }
                        }),
                        false,
                        null
                     );
                  });
                  await mainDist.modulate(timer, 700, 48, 48);
                  mainDist.modulate(timer, (400 + 700) * 12, 40);
                  sd.modulate(timer, (400 + 700) * 12, sd.value * (3 / 2));
                  let i = 0;
                  while (i++ < 15) {
                     await timer.pause(400);
                     while (!targetspear || sp[targetspear].bullet.metadata.targeted) {
                        targetspear = Math.floor(random.next() * count);
                     }
                     await timer.pause(700);
                     targetspear = null;
                  }
                  await timer.when(() => sp.filter(spx => spx.bullet.metadata.targeted).length === 0);
                  for (const b of sp) {
                     b.detach();
                  }
                  await boxRe(swing);
               } else {
                  await boxTo(115, 165);
                  battler.SOUL.position.set(160, 160);
                  const b = battler.box.position.y - battler.box.size.y / 2;
                  await battler.sequence(19, async promises => {
                     let stage = 0;
                     const { side, position } = pastBox(5, random.next() < 0.5 ? 1 : 3);
                     position.y = CosmosMath.remap(position.y, b + 15, b + 45, b, b + battler.box.size.y);
                     const { detach, detached } = bulletSetup(
                        redspear(vola.vars.aktatk ?? 1, {
                           alpha: 0.75,
                           anchor: { x: 1, y: 0 },
                           position,
                           velocity: { x: side === 3 ? 7 : -7, y: 0 },
                           spin: side === 3 ? 1 : -1,
                           rotation: side === 1 ? 184 : -4,
                           gravity: { angle: 90, extent: -0.01 }
                        }).on('tick', function () {
                           if (stage === 0) {
                              this.metadata.bullet = false;
                              const spr = this.objects[0] as CosmosSprite;
                              const echo = shadow(spr, echoSpr => (echoSpr.alpha.value /= 1.5) < 0.001, {
                                 alpha: 0.4,
                                 priority: 2,
                                 position: this.position,
                                 rotation: this.rotation.value
                              });
                              timer.post().then(() => {
                                 battler.bullets.attach(echo.object);
                                 echo.promise.then(() => {
                                    battler.bullets.detach(echo.object);
                                 });
                              });
                              if (side === 1 && this.position.x <= battler.box.x - battler.box.size.x / 2) {
                                 stage = 1;
                                 this.position.x += this.size.x / 2;
                              } else if (side === 3 && battler.box.x + battler.box.size.x / 2 <= this.position.x) {
                                 stage = 1;
                                 this.position.x -= this.size.x / 2;
                              }
                              if (stage === 1) {
                                 this.alpha.value = 1;
                                 this.anchor.x = 0;
                                 spr.anchor.x = 0;
                                 const rando = random.next();
                                 this.velocity.x *= CosmosMath.remap(rando, -0.5, -0.25);
                                 this.velocity.y = -4;
                                 this.gravity.extent = 0.5;
                                 this.spin.value *= -14;
                                 assets.sounds.landing.instance(timer);
                              }
                           } else if (stage === 1) {
                              this.metadata.bullet = true;
                              boxCheck(this, 10) && detach();
                           }
                        }),
                        false,
                        null
                     );
                     assets.sounds.arrow.instance(timer);
                     promises.push(detached);
                     await timer.pause(random.next() * 200 + 400);
                  });
                  await boxRe(swing);
               }
               break;
         }
      }
      function rando<A extends CosmosDirection | number> (...options: A[]): A {
         return options[Math.floor(random.next() * options.length)];
      }
      type A = (time: number) => Promise<void>;
      type B = typeof spear;
      type Q = [keyof typeof patterns, number][];
      type R = Promise<Q>;
      const genoDamage = 10;
      const patterns = {
         async b (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'b', 3 ],
               [ 'bSU', 1 ],
               [ 'bSD', 1 ],
               [ 'bSR', 1 ],
               [ 'bSL', 1 ],
               [ 'bpbb', CosmosMath.remap(difficulty, 1, 2) ],
               [ 'bppbb', CosmosMath.remap(difficulty, 1, 2) ],
               [ 'gH', 1 ],
               [ 'gV', 1 ]
            ];
         },
         async bSU (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', 'up', rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
               [ 'bSU', CosmosMath.remap(difficulty, 3, 1) ],
               [ 'bSR', 6 ],
               [ 'bSL', 6 ]
            ];
         },
         async bSR (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', 'right', rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
               [ 'bSR', CosmosMath.remap(difficulty, 3, 1) ],
               [ 'bSU', 6 ],
               [ 'bSD', 6 ]
            ];
         },
         async bSL (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', 'left', rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
               [ 'bSL', CosmosMath.remap(difficulty, 3, 1) ],
               [ 'bSU', 6 ],
               [ 'bSD', 6 ]
            ];
         },
         async bSD (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', 'down', rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
               [ 'bSD', CosmosMath.remap(difficulty, 3, 1) ],
               [ 'bSL', 6 ],
               [ 'bSR', 6 ]
            ];
         },
         async bpbb (pause: A, spawn: B, difficulty: number): R {
            const bluedirs = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
            const purpdir = rando(...bluedirs);
            bluedirs.splice(bluedirs.indexOf(purpdir), 1);
            spawn('purple', purpdir, 4, genoDamage);
            spawn('blue', rando(...bluedirs), 4, genoDamage);
            await pause(rando(450, 450, 450, 450, 350));
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 350, 350, 350, 450));
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 350, 350, 350, 450));
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(1350);
            return [
               [ 'b', 9 ],
               [ 'gH', CosmosMath.remap(difficulty, 1, 3) ],
               [ 'gV', CosmosMath.remap(difficulty, 1, 3) ]
            ];
         },
         async bppbb (pause: A, spawn: B, difficulty: number): R {
            const bluedirs1 = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
            const purpdir1 = rando(...bluedirs1);
            bluedirs1.splice(bluedirs1.indexOf(purpdir1), 1);
            spawn('purple', purpdir1, 4, genoDamage);
            spawn('blue', rando(...bluedirs1), 4, genoDamage);
            await pause(rando(450, 450, 450, 450, 350));
            const bluedirs2 = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
            const purpdir2 = rando(...bluedirs2);
            bluedirs2.splice(bluedirs2.indexOf(purpdir2), 1);
            spawn('purple', purpdir2, 4, genoDamage);
            spawn('blue', rando(...bluedirs2), 4, genoDamage);
            await pause(rando(450, 450, 450, 450, 350));
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(rando(350, 350, 350, 350, 450));
            spawn('blue', rando('up', 'down', 'left', 'right'), rando(4, 4, 4, 4.25, 4.25), genoDamage);
            await pause(1550);
            return [
               [ 'b', 9 ],
               [ 'gH', CosmosMath.remap(difficulty, 1, 3) ],
               [ 'gV', CosmosMath.remap(difficulty, 1, 3) ]
            ];
         },
         async gH (pause: A, spawn: B, difficulty: number): R {
            spawn('green', rando('left', 'right'), 4, genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'gH', CosmosMath.remap(difficulty, 6, 1) ],
               [ 'gV', CosmosMath.remap(difficulty, 1, 6) ],
               [ 'g2b', 4 ]
            ];
         },
         async gV (pause: A, spawn: B, difficulty: number): R {
            spawn('green', rando('up', 'down'), 4, genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'gV', CosmosMath.remap(difficulty, 6, 1) ],
               [ 'gH', CosmosMath.remap(difficulty, 1, 6) ],
               [ 'g2b', 4 ]
            ];
         },
         async g2b (pause: A): R {
            await pause(850);
            return [ [ 'b', 1 ] ];
         },
         async sl (pause: A, spawn: B): R {
            spawn('blue', rando('up', 'down', 'left', 'right'), 2, genoDamage);
            await pause(rando(400, 400, 400, 400, 400, 400, 350, 350, 300));
            return [ [ 'sl', 1 ] ];
         },
         async fa (pause: A, spawn: B): R {
            spawn('blue', rando('up', 'down', 'left', 'right'), 5.25, genoDamage);
            await pause(rando(500, 500, 500, 500, 500, 500, 450, 450, 400));
            return [ [ 'fa', 1 ] ];
         },
         async bH (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', rando('left', 'right'), rando(4, 4.25, 4.25, 4.5), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'bH', CosmosMath.remap(difficulty, 8, 5) ],
               [ 'bV', CosmosMath.remap(difficulty, 1, 4) ]
            ];
         },
         async bV (pause: A, spawn: B, difficulty: number): R {
            spawn('blue', rando('up', 'down'), rando(4, 4.25, 4.25, 4.5), genoDamage);
            await pause(rando(350, 450, 450, 450));
            return [
               [ 'bV', CosmosMath.remap(difficulty, 8, 5) ],
               [ 'bH', CosmosMath.remap(difficulty, 1, 4) ]
            ];
         },
         async bF (pause: A, spawn: B): R {
            const finalspear = spawn('blue', rando('up', 'down', 'left', 'right'), 1, genoDamage);
            await pause(1000);
            let i = 6;
            while (i-- > 0) {
               spawn('blue', rando('up', 'down', 'left', 'right'), 6, genoDamage);
               await pause(rando(500, 500, 500, 500, 500, 500, 450, 450, 400));
            }
            await finalspear;
            return [ [ 'bFX', 1 ] ];
         },
         async bFX (): R {
            return [ [ 'bFX', 1 ] ];
         }
      };
      const genospear = {
         patterns,
         init: [
            // hyperspeed pattern
            [ 'fa', 8 ],
            // "slow" pattern
            [ 'sl', 8 ],
            // "slow" fake-out pattern
            [ 'bF', 6 ],
            // blue vertical alternating pattern
            [ 'bV', 1 ],
            // blue horizontal alternating pattern
            [ 'bH', 2 ],
            // standard pattern
            [ 'b', 8 ],
            // standard pattern (green vertical start)
            [ 'gV', 4 ],
            // standard pattern (green horizontal start)
            [ 'gH', 2 ]
         ] as [keyof typeof patterns, number][],
         endb: [ 'g2b' ] as (keyof typeof patterns)[]
      };
      return async function (phase: number, turns: number, swing: boolean, maxhp: number) {
         const vola = battler.volatile[0];
         if (world.genocide || phase === 5) {
            if (battler.SOUL.metadata.color === 'red') {
               await standard(swing);
            } else {
               let r = world.genocide
                  ? 9 + Math.floor(CosmosMath.bezier(random.next(), 0, 0, 1, 1) * 7)
                  : 1 + CosmosMath.remap(Math.min(turns - 1, 8) / 8, 12, 0);
               const difficulty = world.genocide
                  ? CosmosMath.bezier(vola.hp / maxhp, 1, 0.25, 0)
                  : 1 - Math.min(turns - 1, 8) / 8;
               if (!world.genocide) {
                  vola.vars.speed = Math.max(vola.vars.speed - 0.1, 0.1);
               }
               await sequence(swing, (spawn, pause) =>
                  CosmosUtils.chain<Q, Promise<any>>(
                     world.genocide || turns < 6 ? genospear.init : [ [ 'b', 1 ] ],
                     async (patterns, next) => {
                        const pattern = CosmosMath.weigh(patterns, random.next())!;
                        if (genospear.endb.includes(pattern) || r-- > 0) {
                           await next(await genospear.patterns[pattern](pause, spawn, difficulty));
                        }
                     }
                  )
               );
            }
         } else {
            switch (phase) {
               case 0:
                  {
                     switch (turns) {
                        case 0:
                           vola.vars.turns++;
                        case 1:
                           await sequence(swing, async (spawn, pause) => {
                              spawn('blue', 'up', 2);
                              await pause(750);
                              spawn('blue', 'up', 2);
                              await pause(750);
                              spawn('blue', 'up', 2);
                           });
                           break;
                        case 2:
                           await sequence(swing, async (spawn, pause) => {
                              spawn('blue', 'up', 1.5, 4);
                           });
                           break;
                        case 3:
                           await sequence(swing, async (spawn, pause) => {
                              spawn('blue', 'up', 3, 4);
                           });
                           break;
                        case 4:
                           await sequence(swing, async (spawn, pause) => {
                              spawn('blue', 'right', 3);
                              await pause(350);
                              spawn('blue', 'left', 3);
                              await pause(350);
                              spawn('blue', 'right', 3);
                              await pause(350);
                              spawn('blue', 'left', 3);
                              await pause(350);
                              spawn('blue', 'down', 3);
                              await pause(350);
                              spawn('blue', 'right', 3);
                              await pause(350);
                              spawn('blue', 'up', 3);
                              await pause(350);
                              spawn('blue', 'left', 3);
                              await pause(350);
                              spawn('blue', 'down', 3);
                              await pause(350);
                              spawn('blue', 'up', 3);
                              await pause(350);
                              spawn('blue', 'down', 4);
                              await pause(350);
                              spawn('blue', 'up', 4);
                              await pause(450);
                              spawn('blue', 'down', 5);
                              await pause(450);
                              spawn('blue', 'up', 5);
                              await pause(550);
                              spawn('blue', 'down', 6);
                              await pause(550);
                              spawn('blue', 'up', 6);
                              await pause(650);
                              spawn('blue', 'down', 7);
                           });
                     }
                  }
                  break;
               case 1: {
                  switch (turns) {
                     case 0:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 3);
                           await pause(350);
                           spawn('blue', 'up', 3);
                           await pause(550);
                           spawn('blue', 'left', 3);
                           await pause(350);
                           spawn('blue', 'left', 3);
                           await pause(550);
                           spawn('blue', 'right', 3);
                           await pause(350);
                           spawn('blue', 'right', 3);
                        });
                        break;
                     case 1:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                        });
                        break;
                     case 2:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'down', 3);
                           await pause(650);
                           spawn('blue', 'right', 3);
                           await pause(650);
                           spawn('blue', 'up', 3);
                           await pause(650);
                           spawn('blue', 'left', 3);
                           await pause(650);
                           spawn('blue', 'down', 3);
                           await pause(550);
                           spawn('blue', 'right', 3);
                           await pause(550);
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('blue', 'down', 3);
                           await pause(350);
                           spawn('blue', 'right', 3);
                           await pause(350);
                           spawn('blue', 'up', 3);
                        });
                        break;
                     case 3:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'down', 3.5);
                           spawn('blue', 'right', 5);
                           await pause(1450);
                           spawn('blue', 'up', 3.5);
                           spawn('blue', 'left', 5);
                           await pause(1450);
                           spawn('blue', 'down', 5);
                           spawn('blue', 'left', 3.5);
                           await pause(1450);
                           spawn('blue', 'up', 5);
                           spawn('blue', 'right', 3.5);
                        });
                        break;
                     case 4:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'down', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'up', 4);
                           await pause(450);
                           spawn('blue', 'down', 4);
                           await pause(450);
                           spawn('purple', 'right', 4);
                        });
                        break;
                     case 5:
                        await standard(swing);
                        break;
                     case 6:
                        await standard(swing);
                        break;
                  }
                  break;
               }
               case 2: {
                  switch (turns) {
                     case 0:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 4);
                           await pause(650);
                           spawn('blue', 'down', 4);
                           await pause(650);
                           spawn('blue', 'left', 4);
                           await pause(650);
                           spawn('blue', 'right', 4);
                           await pause(650);
                           spawn('purple', 'left', 3);
                           await pause(650);
                           spawn('blue', 'right', 4);
                        });
                        break;
                     case 1:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 4);
                           await pause(550);
                           spawn('blue', 'right', 4);
                           await pause(550);
                           spawn('blue', 'right', 4);
                           spawn('purple', 'left', 3);
                           await pause(550);
                           spawn('blue', 'right', 4);
                           await pause(550);
                           spawn('blue', 'right', 4);
                           await pause(550);
                           spawn('blue', 'up', 4);
                        });
                        break;
                     case 2:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('purple', 'left', 2);
                           await pause(350);
                           spawn('purple', 'right', 2);
                           await pause(350);
                           spawn('purple', 'left', 2);
                           await pause(350);
                           spawn('blue', 'up', 4);
                           await pause(550);
                           spawn('blue', 'down', 4);
                           await pause(550);
                           spawn('blue', 'up', 4);
                           await pause(550);
                           spawn('blue', 'down', 4);
                        });
                        break;
                     case 3:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 4);
                           await pause(350);
                           spawn('blue', 'right', 4);
                           await pause(350);
                           spawn('blue', 'down', 4);
                           await pause(350);
                           spawn('blue', 'left', 4);
                           await pause(350);
                           spawn('blue', 'up', 4);
                           await pause(350);
                           spawn('purple', 'right', 4);
                           spawn('blue', 'down', 4);
                           await pause(350);
                           spawn('blue', 'down', 4);
                           await pause(350);
                           spawn('blue', 'left', 4);
                           await pause(1450);
                           spawn('blue', 'up', 4);
                        });
                        break;
                     case 4:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'up', 5);
                           await pause(450);
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'up', 5);
                           await pause(450);
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'up', 5);
                           await pause(450);
                           spawn('blue', 'up', 5);
                           await pause(450);
                           spawn('blue', 'down', 5);
                        });
                        break;
                     case 5:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('green', 'up', 4);
                           spawn('green', 'down', 4);
                        });
                        break;
                     case 6:
                        await standard(swing);
                        break;
                     case 7:
                        await standard(swing);
                        break;
                  }
                  break;
               }
               case 3: {
                  switch (turns) {
                     case 0:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                           await pause(450);
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('green', 'right', 3);
                           await pause(450);
                           spawn('purple', 'left', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                        });
                        break;
                     case 1:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(650);
                           spawn('blue', 'down', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(950);
                           spawn('green', 'right', 5);
                           await pause(350);
                           spawn('green', 'left', 5);
                           await pause(350);
                           spawn('green', 'right', 5);
                        });
                        break;
                     case 2:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'left', 4);
                           spawn('green', 'right', 4);
                           await pause(650);
                           spawn('blue', 'right', 4);
                           spawn('green', 'left', 4);
                           await pause(650);
                           spawn('blue', 'left', 4);
                           spawn('green', 'right', 4);
                           await pause(650);
                           spawn('blue', 'right', 4);
                           spawn('green', 'left', 4);
                           await pause(650);
                           spawn('blue', 'left', 4);
                           spawn('green', 'right', 4);
                           await pause(650);
                           spawn('blue', 'right', 4);
                           spawn('green', 'left', 4);
                        });
                        break;
                     case 3:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('green', 'up', 3);
                           spawn('green', 'down', 3);
                           await pause(850);
                           spawn('green', 'left', 3);
                           spawn('green', 'right', 3);
                           await pause(1550);
                           spawn('blue', 'up', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                           await pause(450);
                           spawn('blue', 'down', 3);
                           await pause(450);
                           spawn('blue', 'right', 3);
                           await pause(450);
                           spawn('blue', 'down', 3);
                           await pause(450);
                           spawn('blue', 'left', 3);
                           await pause(450);
                           spawn('green', 'left', 3);
                        });
                        break;
                     case 4:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('green', 'right', 3);
                           spawn('green', 'down', 3);
                           spawn('green', 'left', 3);
                           await pause(1450);
                           spawn('green', 'up', 3);
                           spawn('green', 'left', 3);
                           spawn('green', 'down', 3);
                           await pause(1450);
                           spawn('green', 'up', 3);
                           spawn('green', 'left', 3);
                           spawn('green', 'right', 3);
                           await pause(1450);
                           spawn('green', 'up', 3);
                           spawn('green', 'right', 3);
                           spawn('green', 'down', 3);
                        });
                        break;
                     case 5:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('green', 'right', 3);
                           spawn('green', 'down', 3);
                           await pause(850);
                           spawn('green', 'up', 3);
                           spawn('green', 'left', 3);
                           await pause(850);
                           spawn('blue', 'left', 4);
                           await pause(350);
                           spawn('blue', 'right', 4);
                           await pause(350);
                           spawn('blue', 'left', 4);
                           await pause(350);
                           spawn('blue', 'right', 4);
                           await pause(350);
                           spawn('blue', 'left', 4);
                        });
                        break;
                     case 6:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 0.75);
                           await pause(850);
                           spawn('blue', 'left', 5);
                           await pause(450);
                           spawn('blue', 'right', 5);
                           await pause(450);
                           spawn('blue', 'right', 5);
                           await pause(450);
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'right', 5);
                           await pause(450);
                           spawn('blue', 'left', 5);
                           await pause(750);
                           spawn('green', 'left', 4);
                           await pause(450);
                           spawn('green', 'right', 4);
                        });
                        break;
                     case 7:
                        await sequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 4);
                           await pause(650);
                           spawn('blue', 'right', 4);
                           await pause(650);
                           spawn('blue', 'down', 4);
                           await pause(650);
                           spawn('blue', 'left', 4);
                           await pause(650);
                           spawn('blue', 'up', 4);
                           await pause(450);
                           spawn('blue', 'right', 4);
                           await pause(450);
                           spawn('blue', 'down', 4);
                           await pause(450);
                           spawn('blue', 'left', 4);
                           await pause(450);
                           spawn('blue', 'up', 4);
                           await pause(350);
                           spawn('blue', 'right', 4);
                           await pause(350);
                           spawn('blue', 'down', 4);
                           await pause(350);
                           spawn('blue', 'left', 4);
                           await pause(350);
                           spawn('blue', 'up', 4);
                           await pause(300);
                           spawn('blue', 'right', 4);
                           await pause(300);
                           spawn('blue', 'down', 4);
                           await pause(300);
                           spawn('blue', 'left', 4);
                           await pause(300);
                           spawn('blue', 'up', 4);
                           await pause(300);
                           spawn('blue', 'right', 4);
                           await pause(300);
                           spawn('blue', 'down', 4);
                           await pause(300);
                           spawn('blue', 'left', 4);
                           await pause(300);
                           spawn('blue', 'up', 4);
                           await pause(300);
                           spawn('blue', 'right', 4);
                           await pause(300);
                           spawn('blue', 'down', 4);
                           await pause(300);
                           spawn('blue', 'left', 4);
                           await pause(300);
                           spawn('blue', 'up', 4);
                           spawn('green', 'left', 4);
                           await pause(450);
                           spawn('blue', 'down', 4);
                           spawn('green', 'left', 4);
                           await pause(450);
                           spawn('blue', 'up', 4);
                           spawn('green', 'right', 4);
                           await pause(450);
                           spawn('blue', 'down', 4);
                           spawn('green', 'right', 4);
                           await pause(750);
                           spawn('blue', 'up', 2);
                        });
                        break;
                     case 8:
                        await standard(swing);
                        break;
                     case 9:
                        await standard(swing);
                        break;
                  }
                  break;
               }
               case 4: {
                  await standard(swing);
                  break;
               }
            }
         }
      };
   })()
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: FOUNDRY PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
