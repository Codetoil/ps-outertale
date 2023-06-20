import { legacy, starGenerator } from '../common/patterns';
import content from '../content';
import { events, random, renderer, speech, timer } from '../core';
import { CosmosEventHost } from '../engine/core';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue } from '../engine/numerics';
import { CosmosHitbox } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosUtils } from '../engine/utils';
import { battler } from '../mantle';
import save from '../save';

const patterns = {
   twinkly (type: number, index = 0, stage = 0): CosmosHitbox {
      if (type === 0) {
         return legacy.bullets.pellet({
            alpha: stage === 1 ? 1 : 0,
            scale: { x: 0.1, y: 0.1 },
            metadata: { bullet: true, type: 1 },
            position: { x: 160, y: 90 },
            rotation: index * 15,
            async handler (pellet) {
               renderer.attach('menu', pellet);
               pellet.scale.modulate(timer, stage === 1 ? 1250 : 0, { x: 0.25, y: 0.25 });
               pellet.position.modulate(
                  timer,
                  stage === 1 ? 1250 : 0,
                  pellet.position.subtract(0, 20).endpoint((index - 2) * 30 - 90, 50)
               );
               await Promise.race([ events.on('heal'), events.on('hurt') ]);
            }
         });
      } else if (type === 1) {
         const dist = new CosmosValue(1);
         return legacy.bullets
            .pellet({
               alpha: 0,
               scale: { x: 0.25, y: 0.25 },
               metadata: { bullet: true, damage: 20, type: 1, color: 'green' },
               rotation: index * 15,
               async handler (pellet) {
                  await timer.pause((index / 30) * 1000);
                  pellet.alpha.value = 1;
                  speech.presets.of('story').voices![0]![0]!.instance(timer);
                  await events.on('heal');
               }
            })
            .on('tick', function () {
               if (!this.metadata.wasActive && this.metadata.active) {
                  this.metadata.wasActive = true;
                  dist.modulate(timer, 3000, 0);
               }
               this.position.set(
                  battler.box.position.add(
                     starGenerator(
                        dist.value * 60,
                        dist.value * 40,
                        5,
                        (index / 40) * 360,
                        CosmosMath.remap(dist.value, 0, 90, 1, 0)
                     )
                  )
               );
            });
      } else {
         return legacy.bullets.firebol({ autoDetach: false, position: { x: 260, y: 82 } });
      }
   },
   froggit (index?: number, modifier?: string) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(modifier === 'whimsun' ? 3 : 4, async () => {
               const baseR = (random.next() * 2 - 1) * 30;
               const rand = { x: (baseR < 0 ? 150 : 170) + baseR, y: 160 - random.next() * 20 };
               const twinkler = new CosmosAnimation({
                  alpha: 0.5,
                  active: true,
                  anchor: 0,
                  position: rand,
                  resources: content.ibbFroggitWarn
               });
               renderer.attach('menu', twinkler);
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (value, next) => {
                  await renderer.on('tick');
                  twinkler.index === 9 || (await next());
               });
               renderer.detach('menu', twinkler);
               const base = twinkler.position.y + 70;
               const closeEdge = rand.x < 160 ? 220 : 100;
               const farEdge = rand.x < 160 ? 100 : 220;
               const frogger = new CosmosSprite({
                  scale: { x: rand.x < 160 ? 0.5 : -0.5, y: 0.5 },
                  anchor: 0,
                  frames: [ content.ibbFroggitGo ]
               });
               const bullet = new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 4 },
                  position: { x: closeEdge, y: twinkler.position.y },
                  size: { x: 8, y: 8 },
                  objects: [ frogger ]
               });
               await timer.pause(150);
               const detacher = legacy.wrapper(battler.bullets, bullet);
               await bullet.position.modulate(
                  timer,
                  850,
                  { x: baseR < 160 ? 140 : 180, y: base - 100 },
                  { x: farEdge, y: base }
               );
               detacher();
               await timer.pause(350);
            });
         },
         async () => {
            await battler.sequence(modifier === 'whimsun' ? 4 : 8, async promises => {
               const rand = battler.box.position.subtract(
                  (random.next() - 0.5) * (battler.box.size.x / 1.5),
                  battler.box.size.y / 2
               );
               const starfly = new CosmosAnimation({
                  anchor: 0,
                  scale: { x: 0.75, y: 0.75 },
                  resources: content.ibbFroggitFly
               });
               const bullet = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 6, y: 6 },
                  position: rand,
                  metadata: { bullet: true, detach: 'menu', damage: 2 },
                  objects: [ starfly ]
               });
               const detacher = legacy.wrapper(battler.bullets, bullet);
               promises.push(
                  timer.pause(750).then(async () => {
                     starfly.enable();
                     await bullet.position.modulate(
                        timer,
                        750,
                        bullet.position.endpoint(
                           battler.SOUL.position.angleFrom(bullet.position),
                           modifier === 'whimsun' ? 25 : 40
                        )
                     );
                     starfly.disable().reset();
                     await timer.pause(750);
                     starfly.enable();
                     bullet.position.modulate(
                        timer,
                        750,
                        bullet.position.endpoint(
                           battler.SOUL.position.angleFrom(bullet.position),
                           modifier === 'whimsun' ? 25 : 40
                        )
                     );
                     await timer.pause(450);
                     await Promise.all([
                        bullet.size.modulate(timer, 300, { x: 0, y: 0 }),
                        starfly.alpha.modulate(timer, 300, 0)
                     ]);
                     detacher();
                  })
               );
               await timer.pause(modifier === 'whimsun' ? 850 : 650);
            });
         }
      );
   },
   whimsun (index?: number, modifier?: string) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(15, async (promises, index) => {
               for (const index of new Array(2).keys()) {
                  const endie = timer.pause(1000);
                  promises.push(endie);
                  const bullet = legacy.bullets.starfly({
                     autoAttach: false,
                     autoDetach: false,
                     metadata: { bullet: true, damage: 2, detach: 'menu' },
                     position: { x: battler.SOUL.x + (index - 0.5) * 2 * 20, y: 190 },
                     scale: 0.5,
                     async handler (self) {
                        let velo = 0;
                        self.on('tick', () => {
                           self.position.y -= velo += 0.09;
                        });
                        await timer.pause(2000);
                        detacher();
                     }
                  });
                  const detacher = legacy.wrapper(battler.bullets, bullet);
               }
               await timer.pause(350);
            });
         },
         async () => {
            const total = 15;
            const distance = 30;
            const center = new CosmosPoint(160);
            await battler.sequence(total, async (promises, index) => {
               const endie = timer.pause(modifier ? +modifier : 4500);
               legacy.bullets.starfly({
                  autoDetach: false,
                  metadata: { bullet: true, damage: 2, detach: 'menu' },
                  position: center.endpoint((index / total) * 360, distance),
                  scale: 0.5,
                  async handler (self, spr) {
                     let time = 0;
                     spr.step = index % spr.duration;
                     self.on('tick', () => {
                        self.position = center.endpoint((index / total) * 360 + (time += 2), distance);
                        self.rotation.value = self.position.angleFrom(center) + 180;
                     });
                     await endie;
                     renderer.detach('menu', self);
                  }
               });
               promises.push(endie);
            });
         }
      );
   },
   loox (index?: number, modifier?: string) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(10, async (promises, index) => {
               const seed = random.next();
               const side = Math.floor(seed * 4);
               const vertical = side % 2 === 1;
               if (!vertical || modifier === 'loox') {
                  const time = timer.value;
                  const inverter = Math.floor(side / 2) === 1 ? -1 : 1;
                  const phase = (seed - side * 0.25) * 4;
                  const basePos = new CosmosPoint({
                     x: vertical ? 140 + phase * 40 : 160 + 60 * inverter,
                     y: vertical ? 160 + 42.5 * inverter : 132.5 + phase * 55
                  });
                  const positions = [] as CosmosPointSimple[];
                  const bullet1 = new CosmosHitbox({
                     anchor: 0,
                     size: { x: 7, y: 7 },
                     fill: '#f0f',
                     position: basePos.value(),
                     metadata: { bullet: true, damage: 3 },
                     objects: [
                        new CosmosSprite({
                           scale: 0.5,
                           anchor: 0,
                           frames: [ content.ibbLooxCircle3 ]
                        })
                     ]
                  });
                  const bullet2 = new CosmosHitbox({
                     anchor: 0,
                     size: { x: 5, y: 5 },
                     fill: '#f0f',
                     metadata: { bullet: true, damage: 3 },
                     position: basePos.value(),
                     objects: [
                        new CosmosSprite({
                           scale: 0.5,
                           anchor: 0,
                           frames: [ content.ibbLooxCircle2 ]
                        })
                     ]
                  });
                  const bullet3 = new CosmosHitbox({
                     anchor: 0,
                     size: { x: 4, y: 4 },
                     fill: '#f0f',
                     metadata: { bullet: true, damage: 3 },
                     position: basePos.value(),
                     objects: [
                        new CosmosSprite({
                           scale: 0.5,
                           anchor: 0,
                           frames: [ content.ibbLooxCircle1 ]
                        })
                     ]
                  });
                  let tick = true;
                  CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                     await renderer.on('tick');
                     if (tick) {
                        const waveValue =
                           (CosmosMath.wave((timer.value - time) / 450) * 2 - 0.5) * (modifier === 'loox' ? 1 : 1.6);
                        bullet1.position.set(
                           basePos.x + (vertical ? waveValue * 2 : 0),
                           basePos.y + (vertical ? 0 : waveValue * 1.5)
                        );
                        positions.unshift(bullet1.position.value());
                        if (positions.length > 3) {
                           bullet2.position.set(positions[3]);
                           if (positions.length > 5) {
                              bullet3.position.set(positions.splice(5, 1)[0]);
                           }
                        }
                        next();
                     }
                  });
                  const detacher1 = legacy.wrapper(battler.bullets, bullet1);
                  const detacher2 = legacy.wrapper(battler.bullets, bullet2);
                  const detacher3 = legacy.wrapper(battler.bullets, bullet3);
                  promises.push(
                     Promise.all([
                        basePos
                           .modulate(timer, modifier === 'loox' ? 3000 : 2500, basePos.endpoint(side * 90 + 180, 135))
                           .then(() => {
                              detacher1();
                              detacher2();
                              detacher3();
                              tick = false;
                           })
                     ]).then()
                  );
                  await timer.pause(650);
               } else {
                  await timer.pause(350);
               }
            });
         },
         async () => {
            const box = battler.box;
            const minX = box.position.x - box.size.x / 2 + 4;
            const maxX = box.position.x + box.size.x / 2 - 4;
            const minY = box.position.y - box.size.y / 2 + 4;
            const maxY = box.position.y + box.size.y / 2 - 4;
            await battler.sequence(modifier === 'loox' ? 2 : 1, async promises => {
               let angle = Math.floor(random.next() * 4) * 90 + 45;
               let basePos = new CosmosPoint(
                  random.next() < 0.5 ? maxX - 10 : minX + 10,
                  random.next() < 0.5 ? maxY - 10 : minY + 10
               );
               const positions = [] as CosmosPointSimple[];
               const bullet1 = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 7, y: 7 },
                  fill: '#f0f',
                  position: basePos.value(),
                  metadata: { bullet: true, damage: 3 },
                  objects: [
                     new CosmosSprite({
                        scale: 0.5,
                        anchor: 0,
                        frames: [ content.ibbLooxCircle3 ]
                     })
                  ]
               });
               const bullet2 = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 5, y: 5 },
                  fill: '#f0f',
                  metadata: { bullet: true, damage: 2 },
                  position: basePos.value(),
                  objects: [
                     new CosmosSprite({
                        scale: 0.5,
                        anchor: 0,
                        frames: [ content.ibbLooxCircle2 ]
                     })
                  ]
               });
               const bullet3 = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 4, y: 4 },
                  fill: '#f0f',
                  metadata: { bullet: true, damage: 1 },
                  position: basePos.value(),
                  objects: [
                     new CosmosSprite({
                        scale: 0.5,
                        anchor: 0,
                        frames: [ content.ibbLooxCircle1 ]
                     })
                  ]
               });
               let stage = 0;
               CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  await renderer.on('tick');
                  basePos = basePos.endpoint(angle, modifier === 'loox' ? 2.5 : 3.25);
                  if (stage === 0) {
                     const trueDestie = basePos.value();
                     basePos = basePos.clamp({ x: minX, y: minY }, { x: maxX, y: maxY });
                     let rotate = 0;
                     angle = angle % 360;
                     if (basePos.x === minX) {
                        angle -= (180 - angle) * 2;
                     } else if (basePos.x === maxX) {
                        angle -= (0 - angle) * 2;
                     } else if (basePos.y === minY) {
                        angle -= (-90 - angle) * 2;
                     } else if (basePos.y === maxY) {
                        angle -= (90 - angle) * 2;
                     } else {
                        rotate = 1;
                     }
                     if (rotate === 0) {
                        const remainder = basePos.extentOf(trueDestie);
                        basePos = basePos.endpoint(angle, remainder);
                     }
                  }
                  bullet1.position.set(basePos);
                  positions.unshift(bullet1.position.value());
                  if (positions.length > 3) {
                     bullet2.position.set(positions[3]);
                     if (positions.length > 5) {
                        const finalPos = positions.splice(5, 1)[0];
                        bullet3.position.set(finalPos);
                        if (
                           stage === 1 &&
                           (finalPos.x < minX || finalPos.x > maxX || finalPos.y < minY || finalPos.y > maxY)
                        ) {
                           stage = 2;
                           timer.pause(150).then(() => {
                              stage = 3;
                           });
                        }
                     }
                  }
                  next();
               });
               const detacher1 = legacy.wrapper(battler.bullets, bullet1);
               const detacher2 = legacy.wrapper(battler.bullets, bullet2);
               const detacher3 = legacy.wrapper(battler.bullets, bullet3);
               timer.pause(modifier === 'loox' ? 6000 : 7500).then(() => {
                  stage = 1;
               });
               promises.push(
                  CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                     await renderer.on('tick');
                     if (stage === 3) {
                        detacher1();
                        detacher2();
                        detacher3();
                     } else {
                        await next();
                     }
                  })
               );
               await timer.pause(350);
            });
         }
      );
   },
   migosp (index?: number, modifier?: string) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(modifier === 'reduced' ? 6 : 10, async promises => {
               const fly = new CosmosHitbox({
                  size: { x: 3, y: 3 },
                  anchor: 0,
                  metadata: { bullet: true, damage: 2 },
                  position: { y: 200, x: 160 + (random.next() * 2 - 1) * 40 },
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        scale: 0.5,
                        anchor: 0,
                        resources: content.ibbRoachfly
                     })
                  ]
               });
               const detacher = legacy.wrapper(battler.bullets, fly);
               promises.push(
                  CosmosUtils.chain<void, Promise<void>>(void 0, async (value, next) => {
                     const height = 25 + random.next() * 15;
                     const destie = { x: fly.position.x, y: fly.position.y - height };
                     const origin = fly.position.value();
                     await fly.position.modulate(timer, 850, origin, destie, destie, {
                        x: fly.position.x,
                        y: fly.position.y - height + 5
                     });
                     if (destie.y <= 120) {
                        detacher();
                     } else {
                        await next();
                     }
                  })
               );
               await timer.pause(modifier === 'reduced' ? 750 : 585);
            });
         },
         async () => {
            const roach = new CosmosHitbox({
               size: { x: 8, y: 11 },
               anchor: { x: 0, y: 1 },
               metadata: { bullet: true, damage: 4 },
               position: { y: 192.5, x: 160 },
               objects: [
                  new CosmosAnimation({
                     active: true,
                     scale: 0.5,
                     anchor: { x: 0, y: 1 },
                     resources: content.ibbMigosp
                  })
               ]
            });
            renderer.attach('menu', roach);
            await Promise.race([ timer.pause(4000), events.on('hurt') ]);
            renderer.detach('menu', roach);
         }
      );
   },
   mushy (index?: number) {
      return legacy.pattern(
         index,
         async () => {
            await battler.sequence(7, async promises => {
               const angle = random.next() * 360;
               const target = new CosmosSprite({
                  alpha: 0,
                  scale: new CosmosPoint(0.25),
                  position: battler.box.position.add(
                     ((random.next() - 0.5) * battler.box.size.x) / 3,
                     ((random.next() - 0.5) * battler.box.size.y) / 3
                  ),
                  anchor: 0,
                  frames: [ content.ibbCrosshair ]
               });
               renderer.attach('menu', target);
               const destie = target.position.endpoint(angle, 20);
               await Promise.all([
                  target.alpha.modulate(timer, 350, 0.7, 0.7),
                  target.position.modulate(timer, 350, destie, destie)
               ]);
               await timer.pause(350);
               const detacher = legacy.wrapper(
                  battler.bullets,
                  legacy.bullets.literalBullet({
                     scale: new CosmosPoint(0.25),
                     autoAttach: false,
                     autoDetach: false,
                     size: { x: 20, y: 20 },
                     position: target.position.endpoint(angle + 180, 70),
                     velocity: new CosmosPoint().endpoint(angle, 5),
                     metadata: { bullet: true, damage: 3, detach: 'menu' },
                     async handler (bull, spr) {
                        spr.rotation.value = angle + 180;
                        promises.push(
                           Promise.race([
                              CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                                 bull === (await Promise.race([ events.on('heal'), events.on('hurt') ]))[0] ||
                                    (await next());
                              }),
                              new Promise<void>(resolve2 => {
                                 bull.on('tick', () => {
                                    if (bull.position.extentOf(target.position) > 80) {
                                       detacher();
                                       resolve2();
                                    }
                                 });
                              })
                           ])
                        );
                        await timer.pause(350);
                        await target.alpha.modulate(timer, 300, 0);
                        renderer.detach('menu', target);
                     }
                  })
               );
               await timer.pause(250);
            });
         },
         async () => {
            let seq = 0;
            while (seq++ < 4) {
               const hole = Math.floor(random.next() * 7);
               const side = random.next() < 0.5 ? -1 : 1;
               const boxSize = battler.box.size;
               const firer = new CosmosEventHost<{ launch: [] }>();
               timer.pause(1150).then(() => {
                  firer.fire('launch');
               });
               await battler.sequence(7, async (promises, index) => {
                  if (index !== hole) {
                     const spawnPos = {
                        x: side < 0 ? 160 - 10 - boxSize.x / 2 : 160 + 10 + boxSize.x / 2,
                        y: 160 + ((3 - index) / 3) * (battler.box.size.y / 2.15)
                     };
                     const bullet = legacy.bullets.literalBullet({
                        autoAttach: false,
                        autoDetach: false,
                        scale: new CosmosPoint(0.35),
                        position: spawnPos,
                        rotation: side < 0 ? 90 : 270,
                        metadata: { bullet: true, damage: 3, detach: 'menu' },
                        gravity: { angle: 0, extent: 0 },
                        acceleration: 1,
                        velocity: { x: 0, y: 0 },
                        async handler (bull) {
                           const pos = bull.position.clone();
                           const destie = pos.add(side < 0 ? 10 : -10, 0);
                           const promie = bull.position.modulate(timer, 450, destie).then(async () => {
                              await firer.on('launch');
                              await bull.position.modulate(timer, 650, pos.add(-side * (battler.box.size.x + 10), 0));
                           });
                           promises.push(promie);
                           await promie;
                           detachie();
                        }
                     });
                     const detachie = legacy.wrapper(battler.bullets, bullet);
                  }
                  index === 6 && (await timer.post());
               });
            }
         }
      );
   },
   async toriel (index: number, hard = false) {
      if (index === 0) {
         battler.SOUL.position.set(160);
         let state = true;
         const bas = battler.box.y + battler.box.size.y + 20;
         const corner = battler.box.position.subtract(battler.box.size.divide(2));
         const random3 = random.clone();
         await battler.sequence(40, async () => {
            const speedY = new CosmosValue(1.5);
            const offsetX = (random3.next() - 0.5) * 50;
            speedY.modulate(timer, 1550, 3);
            const firebol = legacy.bullets.firebol({
               autoAttach: false,
               autoDetach: false,
               metadata: { detach: 'menu' },
               position: corner.add(random3.next() * battler.box.size.x, -15).value(),
               scale: 0.5,
               async handler (self) {
                  self.on('tick', () => {
                     if (state && self.position.y < bas) {
                        self.position.y += speedY.value;
                        if (self.position.extentOf({ x: self.position.x, y: battler.SOUL.y }) < 50) {
                           self.position.x +=
                              ((180 /
                                 (self.position.extentOf({
                                    x: battler.SOUL.x,
                                    y: self.position.y
                                 }) +
                                    10) -
                                 1) *
                                 (battler.SOUL.x > self.position.x ? -1 : 1)) /
                              4;
                        } else {
                           self.position.x += offsetX / speedY.value / 12;
                        }
                     } else {
                        detachie();
                     }
                  });
               }
            });
            const detachie = legacy.wrapper(battler.bullets, firebol);
            await timer.pause(5e3 / 40);
         });
         state = false;
      } else {
         let valid = true;
         await Promise.race([
            timer
               .when(() => save.data.n.hp <= 4)
               .then(() => {
                  if (valid) {
                     battler.bullets.objects = [];
                  }
               }),
            [
               async () => {
                  battler.SOUL.position.set(160);
                  const corner1 = battler.box.position.subtract(battler.box.size.divide(2));
                  const corner2 = corner1.add(battler.box.size.x, 0);
                  const corner3 = corner1.add(battler.box.size);
                  const corner4 = corner1.add(0, battler.box.size.y);
                  await battler.sequence(save.data.b.genocide || hard ? 2 : 1, async (promises, index) => {
                     const paw = new CosmosHitbox({
                        anchor: { x: 0, y: index === 0 ? -0.25 : 0.25 },
                        position: index === 0 ? corner1 : corner3,
                        size: { x: 32, y: 20 },
                        metadata: { bullet: true, damage: 2, detach: 'menu' },
                        objects: [
                           new CosmosSprite({
                              scale: 0.5,
                              anchor: { x: 0, y: index === 0 ? -0.25 : 0.25 },
                              frames: [ index === 0 ? content.ibbPaw : content.ibbPawInverted ]
                           })
                        ]
                     });
                     const detacho = legacy.wrapper(battler.bullets, paw);
                     const midpoint = paw.position[index === 0 ? 'add' : 'subtract'](battler.box.size.x / 2, 7);
                     promises.push(
                        timer.pause(650).then(async () => {
                           await Promise.all([
                              paw.position
                                 .modulate(
                                    timer,
                                    1350,
                                    index === 0 ? corner1 : corner3,
                                    midpoint,
                                    index === 0 ? corner2 : corner4
                                 )
                                 .then(async () => {
                                    await timer.pause(350);
                                    detacho();
                                 }),
                              battler.sequence(5, async promises => {
                                 await timer.pause(165);
                                 if (battler.bullets.objects.includes(paw)) {
                                    const firebol = legacy.bullets.firebol({
                                       sound: true,
                                       autoAttach: false,
                                       autoDetach: false,
                                       metadata: { bullet: true, damage: save.data.b.genocide ? 5 : 4, detach: 'menu' },
                                       position: paw.position,
                                       scale: 0.5,
                                       async handler (self) {
                                          const destie = self.position.endpoint(
                                             battler.SOUL.position.angleFrom(self.position),
                                             130
                                          );
                                          const promie = timer
                                             .pause(650)
                                             .then(() => self.position.modulate(timer, hard ? 1950 : 1550, destie));
                                          promises.push(promie);
                                          await promie;
                                          detachie();
                                       }
                                    });
                                    const detachie = legacy.wrapper(battler.bullets, firebol);
                                    await timer.pause(105);
                                 }
                              })
                           ]);
                        })
                     );
                  });
               },
               async () => {
                  battler.SOUL.position.set(160 + (random.next() < 0.5 ? 25 : -25), 160);
                  let done = false;
                  let angle = 0;
                  const angleChangeRate = new CosmosValue(0);
                  const reverse = random.next() < 0.5;
                  function ticker () {
                     angle += angleChangeRate.value * (reverse ? -1 : 1);
                  }
                  renderer.on('tick', ticker);
                  const center = new CosmosPoint(160);
                  await battler.sequence(6, async (promises, index1) => {
                     battler.sequence(2, async (x, index2) => {
                        const basePos = center[index2 === 0 ? 'subtract' : 'add'](
                           CosmosMath.bezier(index1 / 6, 0, 0, 1) * 25,
                           60 / 12 + index1 * (60 / 6)
                        );
                        function adjustedPos (angle: number) {
                           return center.endpoint(center.angleFrom(basePos) + angle, center.extentOf(basePos));
                        }
                        const firebol = legacy.bullets.firebol({
                           sound: true,
                           autoAttach: false,
                           autoDetach: false,
                           metadata: { bullet: true, damage: save.data.b.genocide ? 5 : 4, detach: 'menu' },
                           position: basePos,
                           scale: 0.5,
                           async handler (self) {
                              self.on('tick', () => {
                                 if (done) {
                                    detachie();
                                 } else {
                                    self.position = adjustedPos(angle);
                                 }
                              });
                           }
                        });
                        const detachie = legacy.wrapper(battler.bullets, firebol);
                        await timer.pause();
                     });
                     await timer.pause(650 / 6);
                  });
                  await timer.pause(350);
                  await angleChangeRate.modulate(timer, 1500, save.data.b.genocide ? 7 : 6);
                  await timer.pause(save.data.b.genocide ? 6000 : 4000);
                  await angleChangeRate.modulate(timer, 1500, 0);
                  renderer.off('tick', ticker);
                  done = true;
               },
               async () => {
                  battler.SOUL.position.set(160);
                  await battler.sequence(save.data.b.genocide ? 7 : 5, async promises => {
                     if (save.data.n.hp > 4) {
                        const seed = random.next();
                        const side = Math.floor(seed * 4);
                        const vertical = side % 2 === 1;
                        const inverter = Math.floor(side / 2) === 1 ? -1 : 1;
                        const phase = (seed - side * 0.25) * 4;
                        let centre = new CosmosPoint(
                           vertical ? 140 + phase * 40 : 160 + 60 * inverter,
                           vertical ? 160 + 42.5 * inverter : 132.5 + phase * 55
                        );
                        if (centre.extentOf(battler.SOUL.position) < 25) {
                           centre = centre.endpoint(
                              battler.box.position.angleFrom(centre),
                              battler.box.position.extentOf(centre) * 2
                           );
                        }
                        const warningRect = new CosmosRectangle({
                           alpha: 0.7,
                           position: centre,
                           anchor: { x: 0, y: 1 },
                           size: { x: 0, y: 150 },
                           rotation: battler.box.position.angleFrom(centre) + 90,
                           fill: '#fff'
                        });
                        battler.bullets.attach(warningRect);
                        await warningRect.size.modulate(timer, 150, { x: 4, y: 150 });
                        timer.pause(650).then(async () => {
                           warningRect.alpha.modulate(timer, 250, 0, 0);
                           await warningRect.size.modulate(timer, 350, { x: 25, y: 150 });
                           const index = battler.bullets.objects.indexOf(warningRect);
                           battler.bullets.objects = [
                              ...battler.bullets.objects.slice(0, index),
                              ...battler.bullets.objects.slice(index + 1)
                           ];
                        });
                        await battler.sequence(save.data.b.genocide ? 4 : 3, async () => {
                           const firebol = legacy.bullets.firebol({
                              sound: true,
                              autoAttach: false,
                              autoDetach: false,
                              metadata: {
                                 bullet: true,
                                 damage: save.data.b.genocide ? 5 : 4,
                                 detach: 'menu'
                              },
                              position: centre.add((random.next() - 0.5) * 7, (random.next() - 0.5) * 7),
                              scale: 0.5,
                              async handler (self) {
                                 const promie = self.position.modulate(
                                    timer,
                                    save.data.b.genocide ? 1450 : 1650,
                                    self.position.endpoint(
                                       battler.box.position
                                          .add(
                                             (random.next() - 0.5) * (save.data.b.genocide ? 20 : 30),
                                             (random.next() - 0.5) * (save.data.b.genocide ? 20 : 30)
                                          )
                                          .angleFrom(self.position),
                                       110
                                    )
                                 );
                                 promises.push(promie);
                                 await promie;
                                 detachie();
                              }
                           });
                           const detachie = legacy.wrapper(battler.bullets, firebol);
                           await timer.pause(100);
                        });
                        await timer.pause(850);
                     }
                  });
               },
               async () => {
                  battler.SOUL.position.set(160);
                  await battler.sequence(save.data.b.genocide ? 8 : 6, async promises => {
                     if (save.data.n.hp > 4) {
                        legacy.bullets.firebol({
                           metadata: { detach: 'menu' },
                           position: new CosmosPoint(
                              160 + (random.next() * 10 + 70) * (random.next() < 0.5 ? 1 : -1),
                              -10
                           ),
                           autoAttach: true,
                           autoDetach: false,
                           scale: { x: 0.75, y: 0.75 },
                           async handler (firework) {
                              const offset = random.next() * 360;
                              promises.push(
                                 firework.position
                                    .modulate(timer, save.data.b.genocide ? 950 : 1250, {
                                       x: firework.position.x,
                                       y: 150 + random.next() * 20
                                    })
                                    .then(() => {
                                       renderer.detach('menu', firework);
                                       return battler.sequence(15, async (promises, index) => {
                                          legacy.bullets.firebol({
                                             sound: index === 0,
                                             autoAttach: true,
                                             autoDetach: false,
                                             position: firework.position.value(),
                                             scale: 0.5,
                                             metadata: {
                                                bullet: true,
                                                damage: save.data.b.genocide ? 5 : 4,
                                                detach: 'menu'
                                             },
                                             async handler (self) {
                                                const destie = self.position.endpoint(
                                                   offset + (index / 15) * 360,
                                                   150 + random.next() * 50
                                                );
                                                const promie = self.position.modulate(
                                                   timer,
                                                   save.data.b.genocide ? 1750 : 1950,
                                                   self.position.add(destie.subtract(self.position).multiply(0.75)),
                                                   destie
                                                );
                                                promises.push(promie);
                                                await promie;
                                                renderer.detach('menu', self);
                                             }
                                          });
                                          index === 11 && (await timer.post());
                                       });
                                    })
                              );
                           }
                        });
                        await timer.pause((save.data.b.genocide ? 950 : 1250) + 500);
                     }
                  });
               }
            ][index - 1]()
         ]);
         valid = false;
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: OUTLANDS PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
