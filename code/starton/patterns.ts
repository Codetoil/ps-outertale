import assets from '../assets';
import { bulletSetup, legacy, pastBox, starGenerator } from '../common/patterns';
import content from '../content';
import { audio, random, renderer, timer } from '../core';
import { CosmosDaemon, CosmosInstance } from '../engine/audio';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue } from '../engine/numerics';
import { CosmosHitbox, CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosUtils } from '../engine/utils';
import { battler, shake } from '../mantle';
import save from '../save';

const patterns = {
   async stardrake (vertical = false, jerry = false) {
      let swap = false;
      if (vertical) {
         await timer.when(() => battler.volatile[0].vars.bombfall);
         if (battler.volatile[0].vars.bombfall === 2) {
            swap = true;
         }
         battler.volatile[0].vars.bombfall = false;
      }
      return battler.sequence(jerry ? 8 : 6, async promises => {
         while (true) {
            const { position, side } = pastBox(
               10,
               vertical ? (random.next() < 0.5 ? 0 : 2) + (swap ? 1 : 0) : undefined
            );
            if (position.extentOf(battler.SOUL.position) > 35) {
               const speed = 1.2;
               const distance = side % 0 ? battler.box.size.y + 30 : battler.box.size.x + 30;
               await timer.pause(vertical ? 1000 : 0);
               promises.push(
                  battler.sequence(vertical ? 3 : 4, async (promises, index) => {
                     const drift = (random.next() - 0.5) / 4;
                     const bullet = new CosmosHitbox({
                        anchor: 0,
                        position: position.value(),
                        size: { x: 8, y: 8 },
                        metadata: { bullet: true, damage: 4, moon: true },
                        velocity: {
                           x: side % 2 === 0 ? drift : side === 1 ? -speed : speed,
                           y: side % 2 === 1 ? drift : side === 0 ? speed : -speed
                        },
                        acceleration: 1 / 0.98,
                        objects: [
                           new CosmosSprite({
                              anchor: 0,
                              scale: 0.5,
                              frames: [ content.ibbMoon ]
                           }).on_legacy('tick', self => {
                              let index = 0;
                              return () => {
                                 if (7 <= (index += 1)) {
                                    index = 0;
                                    self.rotation.value = (self.rotation.value + 90) % 360;
                                 }
                              };
                           })
                        ]
                     }).on('tick', () => {
                        bullet.position.extentOf(position) > distance && detachie();
                     });
                     const detachie = legacy.wrapper(battler.bullets, bullet);
                     promises.push(timer.when(() => !battler.bullets.objects.includes(bullet)));
                     await timer.pause(180);
                  })
               );
               await timer.pause(vertical ? 400 : 1000);
               break;
            }
         }
      });
   },
   async doggo () {
      const center = battler.SOUL.position.clone();
      const distance = new CosmosValue(100);
      const angleOffset = new CosmosValue(0);
      const angleSpeed = new CosmosValue(2);
      let index = 0;
      let done = false;
      while (index < 5) {
         const angle = index++ * (360 / 5);
         const bullet = new CosmosHitbox({
            size: { x: 11, y: 95 },
            anchor: { x: 0, y: 1 },
            scale: 0.5,
            metadata: { bullet: true, damage: 5, color: 'blue' },
            rotation: angle,
            objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibbSword ], tint: 0x00a2e8 }) ]
         }).on('tick', () => {
            bullet.rotation.value = angle + angleOffset.value + 90;
            bullet.position = center.endpoint(angle + angleOffset.value, distance.value);
            if (done) {
               detacher();
            }
         });
         const detacher = legacy.wrapper(battler.bullets, bullet);
      }
      const ticker = () => {
         angleOffset.value += angleSpeed.value;
      };
      renderer.on('tick', ticker);
      await distance.modulate(timer, 1000, 10, 10);
      angleSpeed.modulate(timer, 1400, 2, 2, 5);
      await timer.pause(1500);
      angleSpeed.modulate(timer, 600, 1);
      await distance.modulate(timer, 1200, 40, 40, -150);
      done = true;
      renderer.off('tick', ticker);
   },
   lesserdog (index?: number) {
      return legacy.pattern(index, () => {
         let flip = false;
         return battler.sequence(7, async promises => {
            const extent = CosmosMath.remap(random.next(), 4, 9);
            const spear = new CosmosHitbox({
               size: { x: 11, y: 95 },
               anchor: { x: 0 },
               metadata: { damage: 5, bullet: true },
               velocity: { x: -CosmosMath.remap(random.next(), 2, 3) },
               scale: 0.5,
               position: {
                  x: battler.box.x + battler.box.size.x / 1.9,
                  y: battler.box.y + (flip ? extent : -extent)
               },
               objects: [
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: { y: -3 },
                     scale: { y: -1 },
                     frames: [ content.ibbSword ]
                  })
               ],
               rotation: flip ? 180 : 0
            });
            const detachie = legacy.wrapper(battler.bullets, spear);
            if (random.next() < 0.75) {
               flip = !flip;
            }
            promises.push(
               Promise.race([
                  timer.when(() => spear.position.x < 30).then(() => detachie()),
                  timer.when(() => !battler.bullets.objects.includes(spear))
               ])
            );
            await timer.pause(850 + random.next() * 350);
         });
      });
   },
   dogs (index?: number, modifier?: 'dogamy' | 'dogaressa') {
      return legacy.pattern(
         index,
         () =>
            battler.sequence(modifier ? 1 : 2, async (promises, index) => {
               promises.push(
                  (async () => {
                     const axeSize = new CosmosPoint(304, 80);
                     const anchorOffset = new CosmosPoint(28, 27);
                     const anim = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: content.ibbAx
                     });
                     const trueBox = new CosmosHitbox({
                        size: { x: 66, y: 80 },
                        anchor: { y: 1, x: 0 },
                        scale: 0.5,
                        position: axeSize.multiply(0.5, 1).subtract(anchorOffset),
                        metadata: { damage: 5, bullet: true },
                        objects: [ anim ]
                     });
                     anim.index = modifier === 'dogaressa' ? 1 : index;
                     battler.bullets.attach(trueBox);
                     if (modifier === 'dogaressa') {
                        let runs = 0;
                        const maxRuns = 5 + Math.floor(random.next() * 5);
                        while (runs++ < maxRuns) {
                           trueBox.position = new CosmosPoint(240, 198);
                           await trueBox.position.modulate(
                              timer,
                              250,
                              { x: 240, y: 170 },
                              { x: 180, y: 170 },
                              { x: 180, y: 170 }
                           );
                           await timer.pause(75);
                           await trueBox.position.modulate(timer, 75, { x: 170, y: 180 }, { x: 180, y: 198 });
                           assets.sounds.bomb.instance(timer);
                           assets.sounds.noise.instance(timer);
                           shake(2, 800, 0, 1);
                           await timer.pause(75);
                           trueBox.gravity.extent = 0.2;
                           await timer.when(() => trueBox.position.x > 240);
                           trueBox.position.x = 240;
                           trueBox.gravity.extent = 0;
                           trueBox.velocity = new CosmosPoint();
                        }
                     } else {
                        let runs = 0;
                        const baseY = 195;
                        while (runs++ < (modifier === 'dogamy' ? 2 : 3)) {
                           if (index === 0) {
                              trueBox.position = new CosmosPoint(80, baseY);
                              await trueBox.position.modulate(
                                 timer,
                                 modifier === 'dogamy' ? 2000 : 1000,
                                 { x: 80, y: 170 },
                                 { x: 140, y: 170 },
                                 { x: 140, y: 170 }
                              );
                              await timer.pause(modifier === 'dogamy' ? 600 : 300);
                              await trueBox.position.modulate(
                                 timer,
                                 modifier === 'dogamy' ? 600 : 300,
                                 { x: 150, y: 180 },
                                 { x: 140, y: baseY }
                              );
                              assets.sounds.bomb.instance(timer);
                              assets.sounds.noise.instance(timer);
                              shake(2, 800, 0, 2);
                              // TODO: add a small tear shed sprite when it drops (aka right here)
                              await timer.pause(modifier === 'dogamy' ? 1200 : 600);
                              trueBox.gravity.extent = modifier === 'dogamy' ? -0.05 : -0.1;
                              await timer.when(() => trueBox.position.x < 80);
                              trueBox.position.x = 80;
                              trueBox.gravity.extent = 0;
                              trueBox.velocity = new CosmosPoint();
                           } else {
                              trueBox.position = new CosmosPoint(240, baseY);
                              await trueBox.position.modulate(
                                 timer,
                                 1000,
                                 { x: 240, y: 170 },
                                 { x: 180, y: 170 },
                                 { x: 180, y: 170 }
                              );
                              await timer.pause(300);
                              await trueBox.position.modulate(timer, 300, { x: 170, y: 180 }, { x: 180, y: baseY });

                              assets.sounds.bomb.instance(timer);
                              assets.sounds.noise.instance(timer);
                              shake(2, 800, 0, 2);
                              await timer.pause(600);
                              trueBox.gravity.extent = 0.1;
                              await timer.when(() => trueBox.position.x > 240);
                              trueBox.position.x = 240;
                              trueBox.gravity.extent = 0;
                              trueBox.velocity = new CosmosPoint();
                           }
                        }
                     }
                     {
                        const index = battler.bullets.objects.indexOf(trueBox);
                        battler.bullets.objects = [
                           ...battler.bullets.objects.slice(0, index),
                           ...battler.bullets.objects.slice(index + 1)
                        ];
                     }
                  })()
               );
               await timer.pause(1500);
            }),
         async () => {
            const doggies = CosmosUtils.populate(modifier ? 1 : 2, index => {
               const trueIndex = modifier === 'dogaressa' ? 1 : index;
               const doggie1 = new CosmosAnimation({
                  alpha: modifier === 'dogamy' ? 0 : 1,
                  active: true,
                  anchor: { x: 0, y: 1 },
                  scale: 0.5,
                  position: { x: 0, y: 1 },
                  resources: modifier === 'dogaressa' ? content.ibbPomWalk : content.ibbPomWag
               });
               const doggie2 = new CosmosSprite({
                  alpha: modifier === 'dogamy' ? 1 : 0,
                  anchor: { x: 0, y: 1 },
                  scale: 0.5,
                  position: { x: 0, y: 1 },
                  frames: [
                     modifier === 'dogamy'
                        ? content.ibbPomSad
                        : modifier === 'dogaressa'
                        ? content.ibbPomJump
                        : content.ibbPomBark
                  ]
               });
               const bullet = new CosmosHitbox({
                  size: { x: 17, y: 15 },
                  anchor: { x: 0, y: 1 },
                  position: { x: [ 40, 280 ][trueIndex], y: 180 },
                  metadata: { bullet: true, damage: 3 },
                  scale: { x: trueIndex === 0 ? -1 : 1 },
                  objects: [ doggie1, doggie2 ]
               });
               return {
                  bullet,
                  async bark () {
                     assets.sounds.bark.instance(timer);
                     if (modifier === 'dogamy') {
                        doggie2.frames[0] = content.ibbPomBarkSad;
                        await timer.pause(150);
                        doggie2.frames[0] = content.ibbPomSad;
                     } else {
                        doggie1.alpha.value = 0;
                        doggie2.alpha.value = 1;
                        await timer.pause(150);
                        doggie1.alpha.value = 1;
                        doggie2.alpha.value = 0;
                     }
                  }
               };
            });
            if (modifier === 'dogaressa') {
               const susser = doggies[0].bullet;
               battler.bullets.attach(susser);
               let dashing = false;
               const truePosition = susser.position.clone();
               susser.on_legacy('tick', self => {
                  const random3 = random.clone();
                  return () => {
                     if (dashing) {
                        self.position = truePosition.clone();
                     } else {
                        self.position = truePosition.add((random3.next() - 0.5) * 2, (random3.next() - 0.5) * 2);
                     }
                  };
               });
               let runs = 0;
               const anime = susser.objects[0] as CosmosAnimation;
               const spritee = susser.objects[1] as CosmosAnimation;
               while (runs++ < 5 + random.next() * 3) {
                  await timer.pause(200);
                  assets.sounds.bark.instance(timer);
                  dashing = true;
                  anime.alpha.value = 0;
                  spritee.alpha.value = 1;
                  timer.pause(400).then(() => {
                     dashing = false;
                     anime.alpha.value = 1;
                     spritee.alpha.value = 0;
                  });
                  const target = battler.SOUL.position.clone();
                  await truePosition.modulate(timer, 700, target, target);
               }
               const index = battler.bullets.objects.indexOf(susser);
               battler.bullets.objects = [
                  ...battler.bullets.objects.slice(0, index),
                  ...battler.bullets.objects.slice(index + 1)
               ];
            } else {
               await timer.pause(500);
               renderer.attach('menu', doggies[0].bullet);
               const promie = battler.sequence(modifier ? 1 : 3, async (promises, index) => {
                  promises.push(
                     (async () => {
                        doggies[0].bark();
                        const shaker = new CosmosValue();
                        modifier && shaker.modulate(timer, 6000, 0, 0, 1);
                        let colorValue = 0;
                        const hearts = CosmosUtils.populate(30, index => {
                           return new CosmosHitbox({
                              priority: 1000,
                              anchor: 0,
                              size: { x: 9, y: 9 },
                              scale: 0.5,
                              metadata: { bullet: true, damage: 2, color: void 0 as string | void },
                              objects: [
                                 (() => {
                                    const spr = new CosmosAnimation({
                                       anchor: 0,
                                       resources: content.ibbHeart
                                    });
                                    return spr;
                                 })()
                              ]
                           }).on_legacy('tick', self => {
                              let shaken = false;
                              const threshold = random.next();
                              const random3 = random.clone();
                              return () => {
                                 if (!shaken) {
                                    if (shaker.value > threshold) {
                                       shaken = true;
                                       self.velocity = new CosmosPoint(
                                          random3.next() * 2 - 1,
                                          0.5 + random3.next() * -0.5
                                       );
                                       self.gravity.angle = 90;
                                       self.gravity.extent = 0.2;
                                    } else {
                                       self.metadata.color = [ 'white', 'orange' ][colorValue];
                                       (self.objects[0] as CosmosAnimation).index = colorValue * 2;
                                       self.position = controller.position
                                          .add(
                                             starGenerator(
                                                controller.size.value,
                                                controller.size.value,
                                                5,
                                                (index / 30) * 360,
                                                controller.rotation.value
                                             )
                                          )
                                          .add(
                                             (random3.next() - 0.5) * shaker.value * 3,
                                             (random3.next() - 0.5) * shaker.value * 3
                                          );
                                    }
                                 }
                              };
                           });
                        });
                        const controller = {
                           size: new CosmosValue(),
                           position: new CosmosPoint(45, 170),
                           rotation: new CosmosValue(random.next() * 360)
                        };
                        renderer.attach('menu', ...hearts);
                        timer.pause(500).then(async () => {
                           assets.sounds.noise.instance(timer);
                           colorValue = 1;
                           await timer.pause(100);
                           colorValue = 0;
                           await timer.pause(100);
                           assets.sounds.noise.instance(timer);
                           colorValue = 1;
                           if (!modifier) {
                              await timer.pause(600);
                              colorValue = 0;
                              await timer.pause(600);
                              colorValue = 1;
                              await timer.pause(600);
                              colorValue = 0;
                              await timer.pause(600);
                              colorValue = 1;
                              await timer.pause(600);
                              colorValue = 0;
                           }
                        });
                        controller.size.modulate(timer, modifier ? 1500 : 750, 20).then(async () => {
                           if (!modifier) {
                              await timer.pause(2500);
                              controller.size.modulate(timer, 750, 0);
                           }
                        });
                        controller.rotation.modulate(timer, 8000, controller.rotation.value + (modifier ? 180 : 360));
                        await controller.position.modulate(timer, modifier ? 8000 : 4000, { x: 275, y: 170 });
                        renderer.detach('menu', ...hearts);
                     })()
                  );
                  await timer.pause(modifier ? 2000 : 4000);
               });
               if (!modifier) {
                  renderer.attach('menu', doggies[1].bullet);
               }
               await promie;
               renderer.detach('menu', ...doggies.map(doggie => doggie.bullet));
            }
         }
      );
   },
   async greatdog (index: number) {
      if (index === 0) {
         const trueDoggie = new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibbPomSleep
         });
         const { bullet: doggie, detached: doggieDetached } = bulletSetup(
            new CosmosHitbox({
               anchor: { x: 0, y: 1 },
               size: { x: 29, y: 15 },
               metadata: { damage: 3, bullet: true },
               position: { x: 160, y: battler.box.y + battler.box.size.y / 2 },
               objects: [ trueDoggie ]
            }),
            false
         );
         const sayonaras = [] as (() => void)[];
         const spawnBullet = () => {
            const detacher = legacy.wrapper(
               battler.bullets,
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 19, y: 7 },
                  metadata: { damage: 1, bullet: true },
                  position: doggie.position,
                  velocity: new CosmosPoint().endpoint(battler.SOUL.position.angleFrom(doggie.position), 5),
                  objects: [
                     new CosmosSprite({
                        anchor: 0,
                        frames: [ content.ibbBark ]
                     })
                  ]
               }).on('tick', function () {
                  if (this.position.x < 10 || this.position.x > 310 || this.position.y < 40) {
                     reallyDetach();
                  }
               })
            );
            let detached = false;
            const reallyDetach = () => {
               if (!detached) {
                  detached = true;
                  detacher();
               }
            };
            sayonaras.push(reallyDetach);
         };
         let active = true;
         (async () => {
            while (active) {
               const pos = battler.SOUL.position.value();
               await timer.when(() => battler.SOUL.x !== pos.x || battler.SOUL.y !== pos.y);
               if (active) {
                  assets.sounds.bark.instance(timer);
                  trueDoggie.resources = content.ibbPomWake;
                  spawnBullet();
                  await Promise.race([
                     timer.when(() => !active),
                     timer.pause(500).then(() => {
                        trueDoggie.resources = content.ibbPomSleep;
                     })
                  ]);
               }
            }
         })();
         await Promise.race([ timer.pause(6000), doggieDetached ]);
         active = false;
         const index = battler.bullets.objects.indexOf(doggie);
         battler.bullets.objects = [
            ...battler.bullets.objects.slice(0, index),
            ...battler.bullets.objects.slice(index + 1)
         ];
         for (const sayonara of sayonaras) {
            sayonara();
         }
      } else {
         const doggie1 = new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            scale: 0.5,
            position: { x: 0, y: 1 },
            resources: content.ibbPomWag
         });
         const doggie2 = new CosmosSprite({
            alpha: 0,
            anchor: { x: 0, y: 1 },
            scale: 0.5,
            position: { x: 0, y: 1 },
            frames: [ content.ibbPomBark ]
         });
         const bullet = new CosmosHitbox({
            size: { x: 17, y: 15 },
            anchor: { x: 0, y: 1 },
            position: battler.box.position.add(120, battler.box.size.y / 2),
            metadata: { bullet: true, damage: 3 },
            objects: [ doggie1, doggie2 ]
         });
         battler.bullets.attach(bullet);
         let barks = 0;
         await timer.pause(250);
         while (barks++ < 2) {
            assets.sounds.bark.instance(timer);
            doggie1.alpha.value = 0;
            doggie2.alpha.value = 1;
            await timer.pause(150);
            doggie1.alpha.value = 1;
            doggie2.alpha.value = 0;
            await timer.pause(350);
         }
         doggie1.use(content.ibbPomWalk);
         bullet.velocity.x = -0.2;
         bullet.gravity.angle = 180;
         bullet.gravity.extent = 0.15;
         bullet.scale.modulate(timer, 2000, { x: 1.5, y: 0.8 });
         timer
            .when(() => bullet.position.x - battler.SOUL.x < 50 && battler.SOUL.y < bullet.position.y - 15)
            .then(() => {
               bullet.scale.modulate(timer, 1500, { x: 1.5, y: 1.5 }, { x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 });
               bullet.gravity.angle = 90;
               bullet.gravity.extent = 0.1;
               bullet.velocity = bullet.velocity
                  .divide(2.5)
                  .add(new CosmosPoint().endpoint(battler.SOUL.position.angleFrom(bullet.position), 3).add(1, -1));
               doggie1.alpha.value = 0;
               doggie2.alpha.value = 1;
               doggie2.frames[0] = content.ibbPomJump;
            });
         const edge = battler.box.position.add(battler.box.size.multiply(-0.5, 0.5));
         await timer.when(() => bullet.position.x < edge.x - 30 || bullet.position.y > edge.y + 30);
         const index = battler.bullets.objects.indexOf(bullet);
         battler.bullets.objects = [
            ...battler.bullets.objects.slice(0, index),
            ...battler.bullets.objects.slice(index + 1)
         ];
      }
   },
   async mouse () {
      if (random.next() < 0.5) {
         await battler.sequence(Math.floor(CosmosMath.remap(random.next(), 4, 7)), async (promises, index) => {
            const center = 160 + (random.next() - 0.5) * 70;
            const bottom = battler.box.y + battler.box.size.y / 1.95;
            const shaker = new CosmosValue();
            const random3 = random.clone();
            const anim1 = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.ibbMouse
            }).on('tick', () => {
               anim1.position = new CosmosPoint(random3.next() * shaker.value, random3.next() * shaker.value);
            });
            const anim2 = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.ibbMouse
            }).on('tick', () => {
               anim2.position = new CosmosPoint(random3.next() * shaker.value, random3.next() * shaker.value);
            });
            const initialSep = 130;
            const mouz1 = new CosmosHitbox({
               size: { x: 20, y: 20 },
               anchor: { x: 0, y: 1 },
               scale: { x: -2, y: 2 },
               metadata: { bullet: true, damage: 4 },
               position: { x: center - initialSep, y: bottom },
               objects: [ anim1 ]
            });
            const mouz2 = new CosmosHitbox({
               size: { x: 20, y: 20 },
               anchor: { x: 0, y: 1 },
               scale: { x: 2, y: 2 },
               metadata: { bullet: true, damage: 4 },
               position: { x: center + initialSep, y: bottom },
               objects: [ anim2 ]
            });
            const detacher1 = legacy.wrapper(battler.bullets, mouz1);
            const detacher2 = legacy.wrapper(battler.bullets, mouz2);
            const seperation = 40;
            const endY = 240;
            promises.push(
               Promise.all([
                  mouz1.position.modulate(
                     timer,
                     1450,
                     { x: center - seperation, y: bottom },
                     { x: center - seperation, y: bottom }
                  ),
                  mouz2.position.modulate(
                     timer,
                     1450,
                     { x: center + seperation, y: bottom },
                     { x: center + seperation, y: bottom }
                  )
               ]).then(async () => {
                  await shaker.modulate(timer, 400, 2);
                  await Promise.all([
                     mouz1.position
                        .modulate(timer, 450, { x: center - seperation, y: endY }, { x: center - seperation, y: endY })
                        .then(() => {
                           detacher1();
                        }),
                     mouz2.position
                        .modulate(timer, 450, { x: center + seperation, y: endY }, { x: center + seperation, y: endY })
                        .then(() => {
                           detacher2();
                        })
                  ]);
               })
            );
            await timer.pause(2150);
         });
      } else {
         const size = 14;
         await battler.sequence(Math.floor(CosmosMath.remap(random.next(), 3, 5)), async (promises, index) => {
            let active = false;
            const theGap = Math.floor(random.next() * 6);
            const sequin = battler.sequence(6, async (promises, index) => {
               if (index !== theGap) {
                  const center = 101 + 2 / 3 + index * (140 / 6);
                  const bottom = battler.box.y + battler.box.size.y / 1.95;
                  const anim = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     resources: content.ibbMouse
                  });
                  const rect = new CosmosRectangle({
                     alpha: 0.4,
                     anchor: { x: 0 },
                     size: { x: size, y: 100 },
                     fill: 'white'
                  });
                  const mouz1 = new CosmosHitbox({
                     size: { x: size, y: 100 },
                     anchor: { x: 0 },
                     scale: { x: 1, y: 0.75 },
                     metadata: { damage: 4, bullet: void 0 as boolean | void },
                     position: { x: center, y: bottom },
                     objects: [ rect, anim ]
                  });
                  const detacher1 = legacy.wrapper(battler.bullets, mouz1);
                  mouz1.scale.modulate(timer, 1000, { x: 0.75, y: 0.75 });
                  promises.push(
                     mouz1.position.modulate(timer, 600, mouz1.position.value(), mouz1.position.value(), {
                        x: center,
                        y: battler.box.y - battler.box.size.y / 2
                     })
                  );
                  timer
                     .when(() => active)
                     .then(async () => {
                        rect.alpha.value = 1;
                        assets.sounds.bomb.instance(timer).gain.value = 0.1;
                        shake(2, 500);
                        mouz1.metadata.bullet = true;
                        await Promise.all([
                           mouz1.alpha.modulate(timer, 500, 1, 1, 0),
                           rect.scale.modulate(timer, 500, { x: 2, y: 1 }, { x: 2, y: 1 })
                        ]);
                        detacher1();
                     });
               }
               await timer.pause(200);
            });
            promises.push(sequin);
            await sequin;
            await timer.pause(1000);
            active = true;
            await timer.pause(1000);
         });
      }
   },
   papyrus: (() => {
      const scale = 0.6;
      const pattern = async (
         script: (
            factory: (
               type: number,
               size: number,
               speed: number,
               damage?: number,
               despawn?: (self: CosmosHitbox) => boolean
            ) => CosmosHitbox
         ) => Promise<void>
      ) => {
         const promises = [] as Promise<void>[];
         await script(
            (
               type,
               size,
               speed,
               damage = 4,
               despawn = self => Math.abs(battler.box.x - self.x) > 150 || Math.abs(battler.box.y - self.y) > 190
            ) => {
               if (save.data.n.hp === 1) {
                  return new CosmosHitbox();
               }
               const { bullet, detach, detached } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     metadata: {
                        bullet: true,
                        damage,
                        color: [ 'white', 'blue', 'orange', 'green' ][type],
                        papyrus: true,
                        size: size * scale,
                        alter: null
                     },
                     size: { x: 3.5 },
                     position: { x: battler.box.x + (battler.box.size.x / 2 + 7) * (speed < 0 ? -1 : 1) },
                     velocity: { x: speed * -1 },
                     objects: [
                        new CosmosRectangle({
                           anchor: 0,
                           fill: [ '#ffffff', '#00a2e8', '#ff993d', '#00ff5e' ][type],
                           size: { x: 3.5 }
                        }),
                        new CosmosObject({
                           objects: [
                              new CosmosAnimation({ anchor: { x: 0 }, resources: content.ibbBone, index: type })
                           ],
                           scale: { x: 0.5, y: -scale }
                        }),
                        new CosmosObject({
                           objects: [
                              new CosmosAnimation({ anchor: { x: 0 }, resources: content.ibbBone, index: type })
                           ],
                           scale: { x: 0.5, y: scale }
                        })
                     ]
                  }).on('tick', function () {
                     if (save.data.n.hp <= 1 || despawn(this)) {
                        detach();
                     } else {
                        const size = this.metadata.size;
                        if (size < 0) {
                           this.y = battler.box.y - battler.box.size.y / 2 - (size + 8 * scale) / 2;
                        } else {
                           this.y = battler.box.y + battler.box.size.y / 2 - (size + 8 * scale) / 2;
                        }
                        const trueSize = Math.abs(size);
                        this.size.y = trueSize + 6;
                        (this.objects[0] as CosmosRectangle).size.y = trueSize;
                        this.objects[1].y = trueSize / -2;
                        this.objects[2].y = trueSize / 2;
                     }
                  })
               );
               promises.push(detached);
               return bullet;
            }
         );
         await Promise.all(promises);
      };

      const waver = function (speed: number, min: number, max: number, alter = false) {
         return {
            priority: 100,
            listener (this: CosmosHitbox) {
               this.metadata.alter ??= alter;
               if (this.metadata.alter) {
                  if (((this.metadata.size as number) -= speed * scale) < min * scale) {
                     this.metadata.alter = false;
                  }
               } else if (((this.metadata.size as number) += speed * scale) > max * scale) {
                  this.metadata.alter = true;
               }
            }
         };
      };

      let sound1 = true;
      let sound2 = true;
      async function blaster (
         position: Partial<CosmosPointSimple>,
         rotation: number,
         targetPosition: Partial<CosmosPointSimple>,
         targetRotation: number,
         scale: Partial<CosmosPointSimple> = { x: 1, y: 1 },
         duration = 350,
         delay = 350
      ) {
         if (save.data.n.hp === 1) {
            return;
         }
         const time = timer.value;
         const scax = new CosmosValue();
         const rect = new CosmosRectangle({
            anchor: { x: 0 },
            fill: '#fff',
            size: { x: 20, y: 1000 }
         });
         const anim = new CosmosAnimation({
            anchor: 0,
            resources: content.ibbSpecatk
         });
         const hitbox = new CosmosHitbox({
            anchor: { x: 0 },
            gravity: { angle: targetRotation - 90 },
            position,
            rotation,
            scale,
            size: { x: 22 },
            metadata: { bullet: true, damage: 6, papyrus: true },
            objects: [ rect, anim ]
         }).on('tick', function () {
            rect.alpha.value = scax.value;
            const multiplier = scax.value + CosmosMath.wave(((timer.value - time) % 200) / 200) * (24 / 20 - 1);
            this.size.x = 18 * multiplier;
            rect.scale.x = multiplier;
            if (anim.index === 6) {
               anim.index = 4;
            }
         });
         if (sound1) {
            assets.sounds.specin.instance(timer);
            sound1 = false;
            renderer.on('tick').then(() => {
               sound1 = true;
            });
         }
         renderer.attach('menu', hitbox);
         const trueTarget = { x: targetPosition.x ?? hitbox.x, y: targetPosition.y ?? hitbox.y };
         await Promise.all([
            hitbox.position.modulate(timer, duration, trueTarget, trueTarget),
            hitbox.rotation.modulate(timer, duration, targetRotation, targetRotation)
         ]);
         await timer.pause(delay);
         anim.enable();
         await timer.when(() => anim.index === 3);
         if (sound2) {
            new CosmosDaemon(content.avAsriel3, {
               context: audio.context,
               gain: assets.sounds.specout.instance(timer).gain.value * 0.75,
               rate: 1.2,
               router: audio.soundRouter
            }).instance(timer);
            sound2 = false;
            renderer.on('tick').then(() => {
               sound2 = true;
            });
         }
         scax.modulate(timer, 200, 1);
         hitbox.size.y = 1000;
         hitbox.gravity.extent = 1;
         shake(2, 1000);
         await timer.when(() => Math.abs(160 - hitbox.position.x) > 320 || Math.abs(120 - hitbox.position.y) > 240);
         timer.pause(200).then(() => {
            hitbox.size.y = 0;
         });
         await scax.modulate(timer, 500, 0);
         renderer.detach('menu', hitbox);
      }

      return async (index: number) => {
         if (battler.SOUL.metadata.color === 'blue') {
            battler.SOUL.velocity.y = -1;
         }
         switch (index) {
            case -1:
               // I THOUGHT ABOUT USING SOME HARMLESS "PREVIEW" BONES HERE, BUT DECIDED IT'D BE...
               // YEAH, IT'D BE TOO AWKWARD IF AN ATTACK DIDN'T ACTUALLY DO ANYTHING.
               await renderer.pause(850);
               /*
               await bones(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     factory(0, CosmosMath.remap(random1.next(), 10, 25), 2, 0);
                     await frames(1000);
                  }
               });
               */
               break;
            case 0:
               // MY RENOWN "BLUE ATTACK!"
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 40) {
                     const top = random.next() < 0.5;
                     factory(1, (top ? -20 : 20) + random.next() * (top ? -60 : 60), (1 + random.next() * 2) * 1.6, 1);
                     await renderer.pause((200 + random.next() * 600) / 1.6);
                  }
                  await (battler.music as CosmosInstance).gain.modulate(timer, 2000, 0);
               });
               if (save.data.n.hp > 1) {
                  assets.sounds.bell.instance(timer);
                  battler.SOUL.metadata.color = 'blue';
                  if (battler.SOUL.y < 188) {
                     battler.SOUL.velocity.y = -1;
                  }
               }
               await timer.when(() => battler.SOUL.y > 168);
               await pattern(async factory => void factory(0, 13, 4));
               await renderer.pause(1000);
               break;
            case 1:
               // THIS ONE'S PRETTY BASIC. JUST A STARTER PATTERN.
               await pattern(async factory => {
                  await renderer.pause(300);
                  factory(0, 10, 2);
                  await renderer.pause(1500);
                  factory(0, 20, 2);
                  await renderer.pause(1500);
                  factory(0, 10, 2);
               });
               break;
            case 2:
               // I TOOK THE STARTER PATTERN AND UPGRADED IT! NYEH!
               await pattern(async factory => {
                  await renderer.pause(600);
                  factory(0, 10, 3);
                  await renderer.pause(1200);
                  factory(0, 20, 3);
                  await renderer.pause(1200);
                  factory(0, 30, 3);
                  await renderer.pause(1200);
                  factory(0, 20, 3);
                  await renderer.pause(1200);
                  factory(0, 10, 3);
               });
               break;
            case 3:
               // THIS ONE MAKES YOU JUMP IN A SATISFYING WAY.
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     await renderer.pause(700);
                     factory(0, -80, 2.5);
                     await renderer.pause(700);
                     factory(0, 10, 2.5).on('tick', waver(0.6, 10, 20));
                     await renderer.pause(150);
                     factory(0, 10, 2.5).on('tick', waver(0.6, 10, 20));
                  }
               });
               break;
            case 4:
               // AND THIS ONE DOES THAT BUT BETTER!!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     await renderer.pause(600);
                     factory(0, -80, 3.5);
                     await renderer.pause(120);
                     factory(0, -80, 3.5);
                     await renderer.pause(600);
                     factory(0, 10, 3.5).on('tick', waver(1.2, 10, 30));
                     await renderer.pause(120);
                     /a/g;
                     factory(0, 10, 3.5).on('tick', waver(1.2, 10, 30));
                     await renderer.pause(120);
                     factory(0, 10, 3.5).on('tick', waver(1.2, 10, 30));
                  }
               });
               break;
            case 5:
               // MY FIRST (?) BLUE BONE ATTACK! SPLENDID!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     await renderer.pause(600);
                     factory(1, 80, 4);
                     await renderer.pause(400);
                     factory(0, 20, 3.5);
                     if (index < 3) {
                        await renderer.pause(800);
                     }
                  }
               });
               break;
            case 6:
               // SHIMMY! SHAKE! FIT THROUGH THESE FOUR TIGHT GAPS!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 4) {
                     await renderer.pause(600);
                     factory(0, -40, 3);
                     factory(0, 30, 3);
                     if (index < 4) {
                        await renderer.pause(900);
                     }
                  }
               });
               break;
            case 7:
               // THE FIRST BLUE ATTACK AGAIN, BUT TWICE!!
               await pattern(async factory => {
                  let superindex = 0;
                  while (superindex++ < 2) {
                     let index = 0;
                     while (index++ < 2) {
                        await renderer.pause(600);
                        factory(1, 80, [ 4, -4 ][superindex - 1]);
                        await renderer.pause(400);
                        factory(0, 20, [ 3.5, -3.5 ][superindex - 1]);
                        if (superindex < 2 || index < 2) {
                           await renderer.pause(800);
                        }
                     }
                  }
               });
               break;
            case 8:
               // THOUGHT JUMPING THROUGH A 1-BONE GAP WAS TOUGH? GET A LOAD OF THIS!!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 2) {
                     await renderer.pause(600);
                     factory(0, -50, 3);
                     factory(0, 15, 3);
                     await renderer.pause(133);
                     factory(0, -40, 3);
                     factory(0, 25, 3);
                     await renderer.pause(133);
                     factory(0, -30, 3);
                     factory(0, 35, 3);
                     await renderer.pause(1300);
                     factory(0, -30, 3);
                     factory(0, 35, 3);
                     await renderer.pause(133);
                     factory(0, -35, 3);
                     factory(0, 30, 3);
                     await renderer.pause(133);
                     factory(0, -40, 3);
                     factory(0, 25, 3);
                     if (index < 2) {
                        await renderer.pause(500);
                     }
                  }
               });
               break;
            case 9:
               // INTRODUCING: ORANGE!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 4) {
                     await renderer.pause(600);
                     factory(0, -40, 3);
                     factory(0, 30, 3);
                     await renderer.pause(600);
                     factory(1, 80, 2);
                     await renderer.pause(300);
                     factory(2, 80, 5);
                     if (index < 4) {
                        await renderer.pause(700);
                     }
                  }
               });
               break;
            case 10:
               // BONE PYRAMIDS. JUMP TO THE RIGHT, THEN BACK TO THE LEFT!
               // IT'S LIKE A SEE-SAW OF SERENDIPITY!
               await pattern(async factory => {
                  await renderer.pause(600);
                  factory(0, 15, 3);
                  await renderer.pause(100);
                  factory(0, 25, 3);
                  await renderer.pause(100);
                  factory(0, 35, 3);
                  await renderer.pause(100);
                  factory(0, 40, 3);
                  await renderer.pause(100);
                  factory(0, 35, 3);
                  await renderer.pause(100);
                  factory(0, 25, 3);
                  await renderer.pause(100);
                  factory(0, 15, 3);
                  await renderer.pause(1000);
                  factory(0, 15, -3);
                  await renderer.pause(100);
                  factory(0, 25, -3);
                  await renderer.pause(100);
                  factory(0, 35, -3);
                  await renderer.pause(100);
                  factory(0, 40, -3);
                  await renderer.pause(100);
                  factory(0, 35, -3);
                  await renderer.pause(100);
                  factory(0, 25, -3);
                  await renderer.pause(100);
                  factory(0, 15, -3);
               });
               await pattern(async factory => {
                  factory(0, 15, 4);
                  await renderer.pause(133);
                  factory(0, 25, 4);
                  await renderer.pause(133);
                  factory(0, 35, 4);
                  await renderer.pause(133);
                  factory(0, 40, 4);
                  await renderer.pause(133);
                  factory(0, 35, 4);
                  await renderer.pause(133);
                  factory(0, 25, 4);
                  await renderer.pause(133);
                  factory(0, 15, 4);
                  await renderer.pause(1000);
                  factory(0, 15, -4);
                  await renderer.pause(133);
                  factory(0, 25, -4);
                  await renderer.pause(133);
                  factory(0, 35, -4);
                  await renderer.pause(133);
                  factory(0, 40, -4);
                  await renderer.pause(133);
                  factory(0, 35, -4);
                  await renderer.pause(133);
                  factory(0, 25, -4);
                  await renderer.pause(133);
                  factory(0, 15, -4);
               });
               break;
            case 11:
               // SANS TOLD ME TO PUT THIS ONE IN HERE.
               // IT FEELS WEIRD SOMEHOW.
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     await renderer.pause(600);
                     factory(0, 10, 3);
                     factory(0, -60, 3);
                     factory(0, 10, -3);
                     factory(0, -60, -3);
                     if (index < 3) {
                        await renderer.pause(700);
                     }
                  }
               });
               break;
            case 12:
               // BONE CHEMISTRY: DON'T TRY IT AT HOME.
               await renderer.pause(600);
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 4) {
                     await renderer.pause(600);
                     factory(0, -30, -3);
                     factory(0, 40, -3);
                     await renderer.pause(600);
                     factory(1, 80, -2);
                     await renderer.pause(300);
                     factory(2, 80, -5);
                     if (index < 4) {
                        await renderer.pause(500);
                     }
                  }
               });
               break;
            case 13:
               // AND NOW IT'S GOT BLUE -AND- ORANGE BONES!!!
               await pattern(async factory => {
                  await renderer.pause(600);
                  factory(1, 80, 5);
                  await renderer.pause(200);
                  factory(2, 80, 3);
                  await renderer.pause(400);
                  factory(0, 15, 2.5);
                  await renderer.pause(200);
                  factory(0, 30, 2.5);
                  await renderer.pause(200);
                  factory(0, 40, 2.5);
                  await renderer.pause(200);
                  factory(0, 30, 2.5);
                  await renderer.pause(200);
                  factory(0, 15, 2.5);
                  await renderer.pause(1400);
                  factory(1, 80, -5);
                  await renderer.pause(200);
                  factory(2, 80, -3);
                  await renderer.pause(400);
                  factory(0, 15, -2.5);
                  await renderer.pause(200);
                  factory(0, 30, -2.5);
                  await renderer.pause(200);
                  factory(0, 40, -2.5);
                  await renderer.pause(200);
                  factory(0, 30, -2.5);
                  await renderer.pause(200);
                  factory(0, 15, -2.5);
               });
               break;
            case 14:
               // SANS UPGRADED HIS ATTACK!? HE'S NOT LAZY AFTER ALL!?
               // THIS IS IMPOSSIBLE!!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 5) {
                     await renderer.pause(600);
                     factory(0, 5, 3.5);
                     factory(0, -65, 3.5);
                     factory(0, 5, -3.5);
                     factory(0, -65, -3.5);
                     if (index < 5) {
                        await renderer.pause(300);
                     }
                  }
               });
               break;
            case 15:
               // THE SATISFYING PATTERNS RETURN!!!
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 3) {
                     await renderer.pause(700);
                     factory(0, -30, 3.5);
                     factory(0, 30, 3.5);
                     await renderer.pause(150);
                     factory(0, -30, 3.5);
                     factory(0, 30, 3.5);
                     await renderer.pause(1000);
                     factory(0, -50, 3.5).on('tick', waver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', waver(2, 10, 30));
                     await renderer.pause(125);
                     factory(0, -50, 3.5).on('tick', waver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', waver(2, 10, 30));
                     await renderer.pause(125);
                     factory(0, -50, 3.5).on('tick', waver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', waver(2, 10, 30));
                     await renderer.pause(125);
                     factory(0, -50, 3.5).on('tick', waver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', waver(2, 10, 30));
                     if (index < 3) {
                        await renderer.pause(800);
                     }
                  }
               });
               break;
            case 16:
               // HEY, IT'S THAT TINY GAP ATTACK AGAIN.
               // OH YEAH, I ADDED BLUE AND ORANGE BONES TO MAKE IT COOLER.
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 2) {
                     await renderer.pause(600);
                     factory(0, -50, 3);
                     factory(0, 15, 3);
                     await renderer.pause(133);
                     factory(0, -40, 3);
                     factory(0, 25, 3);
                     await renderer.pause(133);
                     factory(0, -30, 3);
                     factory(0, 35, 3);
                     await renderer.pause(333);
                     factory(2, -60, 3);
                     factory(0, 40, 3);
                     await renderer.pause(1300);
                     factory(0, -30, 3);
                     factory(0, 35, 3);
                     await renderer.pause(133);
                     factory(0, -35, 3);
                     factory(0, 30, 3);
                     await renderer.pause(133);
                     factory(0, -40, 3);
                     factory(0, 25, 3);
                     await renderer.pause(566);
                     factory(0, -80, 3);
                     factory(1, 20, 3);
                     if (index < 2) {
                        await renderer.pause(500);
                     }
                  }
               });
               break;
            case 17:
               // THIS ATTACK IS A TRUE ROLLERCOASTER OF (E)MOTION!
               // DEPENDING ON HOW YOU GET THROUGH IT.
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 5) {
                     await renderer.pause(700);
                     factory(1, 20, 1.25);
                     factory(0, -80, 1.25);
                     await renderer.pause(700);
                     factory(0, 20, 1.25);
                     factory(2, -80, 1.25);
                     if (index < 5) {
                        await renderer.pause(300);
                     }
                  }
               });
               break;
            case 18:
               // I CALL THIS ONE "THE TRICKSTER."
               // SOMETIMES, ALL YOU NEED IS JUST ONE BONE...
               await pattern(async factory => {
                  await renderer.pause(1400);
                  const trickster = factory(0, 30, 3);
                  await timer.when(() => trickster.position.x < battler.SOUL.x + 20);
                  trickster.velocity.x = 0;
                  const listener = () => {
                     if (trickster.position.x < battler.SOUL.x + 20) {
                        trickster.position.x = battler.SOUL.x + 20;
                     }
                  };
                  trickster.on('tick', listener);
                  await renderer.pause(1500);
                  trickster.off('tick', listener);
                  trickster.velocity.x = -6;
               });
               await timer.pause(800);
               break;
            case 19:
               const volatile = battler.volatile[0];
               (battler.music as CosmosInstance).gain.modulate(timer, 2000, 0);
               const cx = volatile.container.x;
               const cy = volatile.container.y;
               await timer.pause(500);
               await volatile.container.position.modulate(
                  timer,
                  750,
                  { x: 40, y: cy },
                  { x: 40, y: cy },
                  { x: 40, y: cy }
               );
               await timer.pause(250);
               const specatk = new CosmosSprite({
                  anchor: 0,
                  frames: [ content.ibbSpecatkBone ],
                  position: { x: 160, y: 260 },
                  priority: -1
               }).on('tick', function () {
                  this.rotation.value += 15;
               });
               battler.overlay.attach(specatk);
               await specatk.position.modulate(timer, 2000, { x: 160, y: -60 }, { x: 160, y: 60 });
               assets.sounds.landing.instance(timer);
               shake(2, 750);
               await timer.pause(250);
               const overlay = new CosmosRectangle({
                  alpha: 0,
                  fill: '#fff',
                  priority: 999,
                  size: { x: 1000, y: 1000 }
               });
               renderer.attach('menu', overlay);
               assets.sounds.upgrade.instance(timer);
               await overlay.alpha.modulate(timer, 150, 1);
               battler.overlay.objects.splice(battler.overlay.objects.indexOf(specatk), 1);
               const trueSpec = blaster({ x: 160, y: 60 }, 0, { x: 160, y: 60 }, 0, { x: 1.5, y: 1.5 }, 0, 1000);
               await overlay.alpha.modulate(timer, 150, 0);
               renderer.detach('menu', overlay);
               await trueSpec;
               await timer.pause(500);
               await volatile.container.position.modulate(
                  timer,
                  750,
                  { x: cx, y: cy },
                  { x: cx, y: cy },
                  { x: cx, y: cy }
               );
               break;
            case 20:
               await pattern(async factory => {
                  blaster({ x: 85, y: -30 }, 90, { x: 85, y: 80 }, -45, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: 235, y: -30 }, -90, { x: 235, y: 80 }, 45, { x: 1, y: 1.5 }, 500, 150);
                  await timer.pause(2000);
                  factory(0, 10, 2.5).on('tick', waver(1, 10, 20));
                  factory(0, 10, -2.5).on('tick', waver(1, 10, 20));
                  await renderer.pause(600);
                  blaster({ x: 160 - 95, y: -30 }, 45, { x: 160 - 95, y: 147 }, -90, { x: 1, y: 1.5 }, 500, 350);
                  await renderer.pause(600);
                  factory(0, 10, 2.5).on('tick', waver(1, 10, 20));
                  factory(0, 10, -2.5).on('tick', waver(1, 10, 20));
                  await renderer.pause(600);
                  blaster({ x: 160 + 95, y: -30 }, -45, { x: 160 + 95, y: 142 }, 90, { x: 1, y: 1.5 }, 500, 350);
                  await renderer.pause(600);
                  factory(0, 20, 2.5).on('tick', waver(1, 20, 30));
                  factory(0, 20, -2.5).on('tick', waver(1, 20, 30));
               });
               break;
            case 21:
               pattern(async factory => {
                  await renderer.pause(900);
                  factory(0, 10, 3).on('tick', waver(1, 10, 20));
                  factory(0, -60, 3).on('tick', waver(1, -60, -50));
                  factory(0, 10, -3).on('tick', waver(1, 10, 20));
                  factory(0, -60, -3).on('tick', waver(1, -60, -50));
                  await renderer.pause(600);
                  blaster({ x: -30, y: 100 }, 90, { x: 80, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: 160, y: -30 }, 180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
                  blaster({ x: 350, y: 100 }, -90, { x: 240, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  factory(2, 80, 4);
                  await renderer.pause(1400);
                  factory(0, 20, 1).on('tick', waver(1, 10, 20));
                  factory(0, -50, 1).on('tick', waver(1, -50, -40));
                  factory(0, 20, -1).on('tick', waver(1, 10, 20));
                  factory(0, -50, -1).on('tick', waver(1, -50, -40));
                  await renderer.pause(400);
                  blaster({ x: -30, y: 100 }, 90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: 350, y: 100 }, -90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  factory(2, 80, -4);
                  factory(2, 80, 4);
                  await renderer.pause(900);
                  blaster({ x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
               });
               await renderer.pause(7500);
               battler.bullets.objects = [];
               break;
            case 22:
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 4) {
                     await renderer.pause(600);
                     factory(0, -75, 1.5).on('tick', waver(1.3, -95, -75));
                     factory(0, -75, -1.5).on('tick', waver(1, -95, -75));
                     await renderer.pause(400);
                     if (index % 2 === 0) {
                        blaster({ x: 160 - 95, y: -30 }, 45, { x: 160 - 95, y: 195 }, -90, { x: 1, y: 1.5 }, 500, 150);
                     } else {
                        blaster({ x: 160 + 95, y: -30 }, -45, { x: 160 + 95, y: 200 }, 90, { x: 1, y: 1.5 }, 500, 150);
                     }
                     await renderer.pause(700);
                     blaster({ x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
                     if (index < 4) {
                        await renderer.pause(1500);
                     }
                  }
               });
               break;
            case 23:
               await renderer.pause(600);
               await pattern(async factory => {
                  let index = 0;
                  while (index++ < 7) {
                     factory(0, 10, 1.5);
                     await renderer.pause(500);
                     factory(0, 10, 1.5);
                     const subindex = [ 1, 0, 2, 1, 2, 0, 2, 1, 1, 0 ][index];
                     if (subindex === 0) {
                        blaster({ x: -30, y: 100 }, 90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     } else if (subindex === 1) {
                        blaster({ x: 160, y: -30 }, 180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
                     } else if (subindex === 2) {
                        blaster({ x: 350, y: 100 }, -90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     }
                     if (index < 7) {
                        await renderer.pause(1000);
                     }
                  }
               });
               break;
            case 24:
               await renderer.pause(600);
               await pattern(async factory => {
                  factory(0, 10, 3);
                  factory(0, -60, 3);
                  factory(0, 10, -3);
                  factory(0, -60, -3);
                  await renderer.pause(900);
                  factory(0, 10, 3);
                  factory(0, -60, 3);
                  factory(0, 10, -3);
                  factory(0, -60, -3);
                  await renderer.pause(900);
                  blaster({ x: 160, y: -30 }, 180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
                  await renderer.pause(900);
                  const left = async () => {
                     blaster({ x: 350, y: 100 }, -90, { x: 100, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(600);
                     blaster({ x: 350, y: 100 }, -90, { x: 120, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: 350, y: 100 }, -90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: 350, y: 100 }, -90, { x: 160, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: 350, y: 100 }, -90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: 350, y: 100 }, -90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(1150);
                  };
                  const right = async () => {
                     blaster({ x: -30, y: 100 }, 90, { x: 220, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(600);
                     blaster({ x: -30, y: 100 }, 90, { x: 200, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: -30, y: 100 }, 90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: -30, y: 100 }, 90, { x: 160, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: -30, y: 100 }, 90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(250);
                     blaster({ x: -30, y: 100 }, 90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                     await renderer.pause(1150);
                  };
                  let index = 0;
                  if (battler.SOUL.x > 160) {
                     factory(1, 80, -4);
                     await renderer.pause(300);
                     await right();
                     await left();
                     while (index++ < 3) {
                        factory(0, 10, -3);
                        factory(0, -60, -3);
                        await renderer.pause(700);
                        blaster(
                           { x: -30, y: 100 },
                           90,
                           { x: 220 - (index - 1) * 10, y: 100 },
                           0,
                           { x: 1, y: 1.5 },
                           500,
                           150
                        );
                        await renderer.pause(200);
                     }
                  } else {
                     factory(1, 80, 4);
                     await renderer.pause(300);
                     await left();
                     await right();
                     while (index++ < 3) {
                        factory(0, 10, 3);
                        factory(0, -60, 3);
                        await renderer.pause(700);
                        blaster(
                           { x: 350, y: 100 },
                           -90,
                           { x: 100 + (index - 1) * 10, y: 100 },
                           0,
                           { x: 1, y: 1.5 },
                           500,
                           150
                        );
                        await renderer.pause(200);
                     }
                  }
                  await renderer.pause(1000);
                  index = 0;
                  while (index++ < 4) {
                     await renderer.pause(600);
                     if (index % 2 === 0) {
                        blaster({ x: 160 + 95, y: -30 }, -45, { x: 160 + 95, y: 202 }, 90, { x: 1, y: 1.5 }, 500, 150);
                     } else {
                        blaster({ x: 160 - 95, y: -30 }, 45, { x: 160 - 95, y: 202 }, -90, { x: 1, y: 1.5 }, 500, 150);
                     }
                     await renderer.pause(500);
                     factory(0, 30, 3);
                     factory(0, -40, 3);
                     factory(0, 30, -3);
                     factory(0, -40, -3);
                     await renderer.pause(400);
                  }
                  await renderer.pause(1000);
                  blaster({ x: 85, y: -30 }, 90, { x: 85, y: 80 }, -45, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: 235, y: -30 }, -90, { x: 235, y: 80 }, 45, { x: 1, y: 1.5 }, 500, 150);
                  await timer.pause(1500);
                  factory(0, 15, 3);
                  factory(0, 15, -3);
                  factory(0, -55, 3);
                  factory(0, -55, -3);
                  await renderer.pause(1000);
                  blaster({ x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  blaster({ x: 350, y: 100 }, -90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: -30, y: 100 }, 90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(400);
                  blaster({ x: 350, y: 100 }, -90, { x: 120, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: -30, y: 100 }, 90, { x: 200, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(1600);
                  blaster({ x: 350, y: 100 }, -90, { x: 100, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: -30, y: 100 }, 90, { x: 220, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  blaster({ x: 350, y: 100 }, -90, { x: 120, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: -30, y: 100 }, 90, { x: 200, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(400);
                  blaster({ x: 350, y: 100 }, -90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  blaster({ x: -30, y: 100 }, 90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  await blaster({ x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 2.5, y: 2.5 }, 1200, 300);
               });
               await (battler.music as CosmosInstance).gain.modulate(timer, 2000, 0);
               break;
            case 25:
               await timer.pause(500);
               break;
         }
      };
   })()
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: STARTON PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
