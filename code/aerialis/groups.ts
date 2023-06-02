import { OutlineFilter } from 'pixi-filters';
import assets from '../assets';
import { OutertaleGroup, OutertaleOpponent } from '../classes';
import { defaultSetup, endMusic, spareFlee, standardMusic } from '../common/groups';
import commonOpponents from '../common/opponents';
import commonPatterns, { screenCheck } from '../common/patterns';
import content, { inventories } from '../content';
import { events, game, random, renderer, speech, timer } from '../core';
import {
   CosmosAnimation,
   CosmosHitbox,
   CosmosInventory,
   CosmosMath,
   CosmosPointSimple,
   CosmosSprite,
   CosmosText,
   CosmosUtils
} from '../engine';
import { battler, header, world } from '../mantle';
import save from '../save';
import opponents, { graphGen, selectMTT } from './opponents';
import patterns from './patterns';
import text from './text';

async function switchColor (orange = false) {
   const mtt31 = CosmosUtils.populate(2, ind1 => {
      const e = ind1 * 2 - 1;
      return new CosmosAnimation({
         position: { y: 240, x: 160 + e * 50 },
         anchor: { x: 0 },
         metadata: { sparkle: false, flash: false },
         resources: content.ibbExTiny3,
         velocity: { y: -4 },
         scale: 0.5
      }).on('tick', async function () {
         if (this.y < 0) {
            renderer.detach('menu', this);
         } else if (this.y < 144) {
            this.velocity.y > -4 && (this.velocity.y -= 0.2);
         } else if (this.y < 164) {
            if (!this.metadata.sparkle) {
               this.metadata.sparkle = true;
               this.enable();
               await timer.when(() => this.index === 2);
               const amount = 7;
               const spread = 0.2;
               const bvalue = ((amount - 1) * spread) / -2;
               assets.sounds.sparkle.instance(timer).rate.value = 0.69; // funni
               renderer.attach(
                  'menu',
                  ...CosmosUtils.populate(amount, ind2 => {
                     return new CosmosAnimation({
                        active: true,
                        resources: content.ibbExShine,
                        anchor: 0,
                        position: this,
                        velocity: {
                           x: e * -CosmosMath.remap(random.next(), 0.8, 1.2),
                           y: bvalue + ind2 * spread
                        }
                     }).on('tick', function () {
                        this.alpha.value *= 0.95;
                        screenCheck(this, 10) && renderer.detach('menu', this);
                     });
                  })
               );
            }
         } else if (this.y < 200) {
            this.velocity.y < -1 && (this.velocity.y += 0.2);
         }
      });
   });
   renderer.attach('menu', ...mtt31);
   await timer.when(() => mtt31[0].metadata.sparkle && mtt31[1].metadata.sparkle);
   await timer.pause(3500);
   battler.SOUL.metadata.color = orange ? 'orange' : 'yellow';
   const shad = new CosmosAnimation({
      anchor: 0,
      resources: orange ? content.ibuOrangeSOUL : content.ibuYellowSOUL,
      scale: 0.5,
      alpha: 0.8
   });
   battler.SOUL.attach(shad);
   assets.sounds.bell.instance(timer);
   await Promise.all([ shad.scale.modulate(timer, 500, 1, 1), shad.alpha.modulate(timer, 500, 1, 0) ]);
   battler.SOUL.detach(shad);
   await timer.pause(850);
}

function spawnAlphys (p: CosmosPointSimple) {
   let isThumbsup = false;
   const cc = battler.volatile[0].container;
   const ar = (cc.metadata.ar = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      position: { x: -1, y: 1 },
      metadata: { thumbsup: false },
      resources: content.ibcAlphysHead
   })).on('tick', async function () {
      if (this.metadata.thumbsup) {
         if (!isThumbsup) {
            isThumbsup = true;
            let a = 0;
            while (this.metadata.thumbsup) {
               this.index = [ 13, 14 ][a];
               a = 1 - a;
               await timer.pause(233);
            }
         }
      } else if (isThumbsup) {
         isThumbsup = false;
      }
   });
   const arBody = (cc.metadata.arBody = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      priority: -1,
      position: p,
      resources: content.ibcAlphysBody,
      objects: [ ar ]
   }).on('tick', function () {
      this.index = [ 13, 14 ].includes(ar.index) ? ar.index - 11 : [ 9, 11 ].includes(ar.index) ? 1 : 0;
   }));
   battler.overlay.objects.unshift(arBody);
   battler.garbage.push([ battler.overlay, arBody ]);
}

const groups = {
   glyde: new OutertaleGroup({
      assets: new CosmosInventory(
         content.ibcAlphysHead,
         content.ibcAlphysBody,
         content.amWrongenemy,
         inventories.avMettaton
      ),
      flee: false,
      grid: content.ibuGrid2,
      music: assets.music.wrongenemy,
      init () {
         if (save.data.n.bad_lizard < 2) {
            spawnAlphys({ x: -25, y: 122 });
         } else {
            opponents.glyde.hp = 400;
            battler.volatile[0].hp = 400;
         }
         battler.SOUL.alpha.value = 0;
         battler.alpha.value = 1;
         timer.pause(450).then(async () => {
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro1);
            await timer.pause(250);
            const mettaAnim = new CosmosAnimation({
               resources: content.ibcMettatonBody,
               anchor: { x: 0 },
               rotation: 45,
               position: { x: -30 }
            });
            renderer.attach('menu', mettaAnim);
            await mettaAnim.position.step(timer, 2, { x: 5 });
            await battler.monster(false, { x: 5, y: 40 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2a());
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2b);
            await timer.pause(650);
            await battler.monster(false, { x: 5, y: 40 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2c);
            await timer.pause(250);
            mettaAnim.position.step(timer, 2, { x: -20 }).then(() => {
               renderer.detach('menu', mettaAnim);
            });
            await timer.pause(1450);
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro3);
            battler.status = text.b_opponent_glyde.status1;
            battler.resume();
         });
         return false;
      },
      opponents: [ [ opponents.glyde, { x: 135, y: 20 } ] ]
   }),
   mettaton1: new OutertaleGroup({
      assets: new CosmosInventory(
         content.ibcAlphysHead,
         content.ibcAlphysBody,
         content.amSexyrectangle,
         content.ibbExTiny3,
         content.ibbExShine,
         content.asSparkle,
         content.asBell
      ),
      init () {
         battler.flee = false;
         battler.status = text.b_opponent_mettaton1.status1();
         const music = assets.music.sexyrectangle.instance(timer);
         battler.music = music;
         if (save.data.n.plot < 67) {
            spawnAlphys({ x: 265, y: 122 });
            return true;
         } else {
            const container = battler.volatile[0].container;
            const body = container.objects[0] as CosmosAnimation;
            const arms = body.objects[1] as CosmosAnimation;
            battler.box.size.set(40);
            battler.SOUL.position.set(battler.box);
            game.movement = true;
            battler.alpha.value = 1;
            timer.pause(850).then(async () => {
               arms.use(content.ibcMettatonArmsNoticard);
               header('x1').then(() => {
                  body.use(content.ibcMettatonBodySOUL);
                  body.enable();
               });
               await battler.monster(
                  true,
                  container.position.add(-35, -70),
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_mettaton1.yellow1
               );
               await switchColor();
               body.use(content.ibcMettatonBody);
               arms.use(content.ibcMettatonArmsWhatevs);
               body.reset();
               await battler.monster(
                  true,
                  battler.volatile[0].container.position.add(-35, -70),
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_mettaton1.yellow2
               );
               arms.use(content.ibcMettatonArmsWelcome);
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               battler.resume();
            });
            return false;
         }
      },
      handler () {
         battler.alive.length > 0 && battler.resume();
      },
      opponents: [ [ opponents.mettaton1, { x: 160, y: 115 } ] ]
   }),
   mettaton2: new OutertaleGroup({
      assets: new CosmosInventory(
         content.asNode,
         content.amArms,
         content.amArmsIntro,
         content.ibcMettatonNeoArm1,
         content.ibcMettatonNeoArm2,
         content.ibcMettatonNeoBody,
         content.ibcMettatonNeoHead,
         content.ibcMettatonNeoLegs,
         content.ibcMettatonNeoWings,
         content.ibbBomb,
         content.ibbBoxBullet,
         content.ibbBoxBulletUp,
         content.ibbNeoRocket,
         content.ibbNeoTiny1,
         content.ibuYellowSOUL,
         content.ibuYellowShot,
         content.asPrebomb,
         content.asBomb,
         content.asBoom,
         content.asSuperstrike,
         content.ibcNapstablookLookdown,
         content.ibcNapstablookLookforward,
         content.ibcNapstablookLookdeath,
         content.ibbMeteor,
         content.asBurst,
         content.ibbWarningreticle,
         content.ibbFroggitWarn,
         content.ibbNeoTiny1a,
         content.asFrypan,
         content.ibbExShine,
         content.ibbBigblaster,
         content.ibbArmBullet,
         content.ibuOrangeSOUL,
         content.ibcAsrielCutscene2,
         content.avNapstablook,
         content.ibbShield,
         content.asSparkle,
         content.asBell,
         content.ibcMettatonNeoHeart,
         content.asGonerCharge,
         content.asSpecout,
         content.avAsriel3,
         content.ibbDummyknife,
         content.ibbNeoTiny2,
         content.ibbExTiny3,
         content.ibbExBombBlastCore,
         content.ibbExBombBlastRay,
         content.asSwallow,
         content.asUpgrade,
         content.ibbLaserEmitter
      ),
      init () {
         assets.music.armsIntro.instance(timer).source.addEventListener('ended', () => {
            battler.music = assets.music.arms.instance(timer, { offset: 6.76 });
         });
         function ti () {
            battler.status = text.b_opponent_mettaton2.status1();
            const timeIndicator = new CosmosText({
               font: '16px DeterminationSans',
               anchor: { x: 0, y: 1 },
               position: { x: 160 },
               priority: 1,
               metadata: {
                  ex () {
                     renderer.attach('menu', timeIndicator);
                     timeIndicator.position.modulate(
                        timer,
                        400,
                        timeIndicator.position.add(0, 16),
                        timeIndicator.position.add(0, 16)
                     );
                  },
                  async re () {
                     await timeIndicator.position.modulate(
                        timer,
                        400,
                        timeIndicator.position.subtract(0, 16),
                        timeIndicator.position.subtract(0, 16)
                     );
                     renderer.detach('menu', timeIndicator);
                  }
               },
               fill: '#fff',
               filters: [ new OutlineFilter(2, 0, 1, 1, false) ]
            }).on('tick', function () {
               const ap = 1 - (battler.volatile[0].vars.ap ?? 0);
               this.content = text.b_opponent_mettaton2.shieldIndicator.replace('$(x)', Math.ceil(ap * 100).toString());
               if (ap <= 0) {
                  this.fill = '#3f3f3f';
               } else if (ap < 1 / 4) {
                  this.fill = '#ff0000';
               }
            });
            battler.volatile[0].container.metadata.ti = timeIndicator;
            timeIndicator.metadata.ex();
         }
         if (save.flag.n.azzy_neo < 1) {
            battler.box.size.set(40);
            battler.SOUL.position.set(battler.box);
            game.movement = true;
            battler.alpha.value = 1;
            timer.pause(450).then(async () => {
               await switchColor(true);
               const spr = battler.volatile[0].container.objects[0];
               await spr.position.modulate(timer, 600, { x: spr.x - 30 });
               speech.emoters.mettaton = spr;
               await battler.monster(
                  false,
                  { x: 180, y: 25 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_mettaton2.neointro
               );
               await spr.position.modulate(timer, 600, { x: spr.x + 30 });
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               ti();
               battler.resume();
            });
            return false;
         } else {
            ti();
            battler.SOUL.metadata.color = 'orange';
            return true;
         }
      },
      async handler (c, t, v) {
         if (spareFlee(c)) {
            return;
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               if (world.genocide) {
                  battler.damageMultiplier = (9 + Math.floor((battler.volatile[0].vars.ap ?? 0) * 10)) / 3;
                  const timeIndicator = battler.volatile[0].container.metadata.ti;
                  await timeIndicator?.metadata.re();
                  await patterns.mettaton3(++v.vars.neoTurns);
                  timeIndicator?.metadata.ex();
                  await Promise.all([
                     battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 65 / 2 }),
                     battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 })
                  ]);
                  battler.damageMultiplier = 1;
               }
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.mettaton2, { x: 160, y: 115 } ] ]
   }),
   mettaton3: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(content.ibbExTiny3, content.ibbExShine, content.asSparkle, content.asBell),
      init () {
         battler.SOUL.metadata.color = 'yellow';
         battler.overlay.detach(battler.volatile[0].container);
         battler.volatile[0].alive = false;
         battler.status = text.b_opponent_mettaton2.statusX();
         assets.music.legsIntro.instance(timer).source.addEventListener('ended', () => {
            battler.music = assets.music.legs.instance(timer, { offset: 6.48 });
         });
         const graph = graphGen();
         battler.overlay.attach(graph);
         battler.volatile[0].vars.graph = graph;
         events.on('select', selectMTT);
         events.fire('choice', { type: 'none' });
         return true;
      },
      handler () {
         battler.alive.length > 0 && battler.resume();
      },
      opponents: [
         [ new OutertaleOpponent(), { x: 0, y: 0 } ],
         [ opponents.mettaton2, { x: 160, y: 120 } ]
      ]
   }),
   rg: new OutertaleGroup({
      assets: new CosmosInventory(
         content.ibcRGBall,
         content.ibcRGBugFist,
         content.ibcRGBugHead,
         content.ibcRGCatFist,
         content.ibcRGCatHead,
         content.ibcRGChestplate,
         content.ibcRGLegs,
         content.ibcRGShoes,
         content.ibcRGFist,
         content.ibcRGFalchion,
         content.ibcRGSweat,
         content.amConfession,
         content.asGrab,
         content.amBattle1,
         content.ibbStardrop,
         content.ibbFroggitWarn,
         content.ibbHaymaker,
         content.asStab,
         content.asBell,
         content.asAppear
      ),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_rg();
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.battle1.instance(timer);
         battler.music = music;
         const vars = (battler.volatile[0].vars = {
            flirts: 0,
            progress: 0,
            glove1: true,
            glove2: true,
            totalTugScore: 0,
            pull1 () {
               if (vars.glove1) {
                  vars.glove1 = false;
                  assets.sounds.grab.instance(timer);
                  const x = battler.volatile[0].container.objects[0].objects.filter(
                     obj => obj.metadata.part === 'fist'
                  )[0] as CosmosSprite;
                  x.frames[0] = content.ibcRGCatFist;
                  x.position.x = -40;
                  x.metadata.iY = -23;
               }
            },
            pull2 () {
               if (vars.glove2) {
                  vars.glove2 = false;
                  assets.sounds.grab.instance(timer);
                  const x = battler.volatile[1].container.objects[0].objects.filter(
                     obj => obj.metadata.part === 'fist'
                  )[0] as CosmosSprite;
                  x.frames[0] = content.ibcRGBugFist;
                  x.position.x = -37.5;
                  x.metadata.iY = -27;
               }
            },
            get killed () {
               return battler.alive.length < 2 ? 1 - battler.volatile.indexOf(battler.alive[0]) : -1;
            }
         });
         return true;
      },
      handler: (() => {
         function monster1 (...lines: string[]) {
            return battler.monster(false, { x: 120, y: 12 }, battler.bubbles.napstablook, ...lines);
         }
         function monster2 (...lines: string[]) {
            return battler.monster(false, { x: 140, y: 12 }, battler.bubbles.napstablook2, ...lines);
         }
         return async function (choice, target, volatile) {
            let cf = false; // confession
            let gr = false; // tug sequence
            let t1 = null as string[] | null; // talk 1
            let t2 = null as string[] | null; // talk 2
            let t3 = null as string[] | null; // statustext
            const vars = battler.volatile[0].vars;
            let killer = false;
            switch (choice.type) {
               case 'fight':
                  volatile.sparable && battler.music?.stop();
                  if (
                     await battler.attack(
                        volatile,
                        volatile.sparable || vars.progress === 2
                           ? { power: 0, operation: 'multiply' }
                           : { power: choice.score }
                     )
                  ) {
                     battler.g += 200;
                     save.data.n.state_aerialis_royalguards = 1;
                     for (const e of battler.alive) {
                        e.sparable = false;
                     }
                     killer = true;
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt':
                        if (volatile.sparable) {
                           await battler.human(
                              ...[ text.b_opponent_rg03.act_flirt_happy, text.b_opponent_rg04.act_flirt_happy ][target]
                           );
                        } else {
                           if (vars.killed === -1) {
                              const r = Math.floor(random.next() * 4);
                              if (vars.progress === 1) {
                                 t1 = [ text.b_opponent_rg03.flirtTalk1, text.b_opponent_rg03.flirtTalk2 ][r % 2];
                                 t2 = [ text.b_opponent_rg04.flirtTalk1, text.b_opponent_rg04.flirtTalk2 ][r % 2];
                                 t3 = text.b_opponent_rg03.flirtStatus;
                              } else {
                                 t1 = [ text.b_opponent_rg03.flirtTalkNervy1, text.b_opponent_rg03.flirtTalkNervy2 ][
                                    r % 2
                                 ];
                                 t2 = [ text.b_opponent_rg04.flirtTalkNervy1, text.b_opponent_rg04.flirtTalkNervy2 ][
                                    r % 2
                                 ];
                                 t3 = text.b_opponent_rg03.flirtStatusNervy;
                              }
                              if (target === 0) {
                                 save.data.b.flirt_rg03 = true;
                              } else {
                                 save.data.b.flirt_rg04 = true;
                              }
                           } else if (vars.killed === 0) {
                              t2 = text.b_opponent_rg04.flirtTalkLone;
                              if (vars.progress < 2) {
                                 t3 = text.b_opponent_rg04.flirtStatusLone;
                              }
                           } else {
                              t1 = text.b_opponent_rg03.flirtTalkLone;
                              if (vars.progress < 2) {
                                 t3 = text.b_opponent_rg03.flirtStatusLone;
                              }
                           }
                           await battler.human(
                              ...[ text.b_opponent_rg03.act_flirt, text.b_opponent_rg04.act_flirt ][target]
                           );
                        }
                        break;
                     case 'tug':
                        if (volatile.sparable) {
                           await battler.human(
                              ...[ text.b_opponent_rg03.act_tug_happy, text.b_opponent_rg04.act_tug_happy ][target]
                           );
                        } else if (vars.killed === -1) {
                           if (target === 0) {
                              t1 = [
                                 text.b_opponent_rg03.tugTalk1,
                                 text.b_opponent_rg03.tugTalk2,
                                 text.b_opponent_rg03.tugTalk3,
                                 text.b_opponent_rg03.tugTalk4
                              ][Math.floor(random.next() * 4)];
                              t2 = text.b_opponent_rg04.tugTalkLone;
                              t3 = text.b_opponent_rg03.tugStatus;
                              await battler.human(...text.b_opponent_rg03.act_tug);
                           } else {
                              t1 = text.b_opponent_rg03.tugTalkLone;
                              if (vars.glove2) {
                                 t2 = [
                                    text.b_opponent_rg04.tugTalk1,
                                    text.b_opponent_rg04.tugTalk2,
                                    text.b_opponent_rg04.tugTalk3,
                                    text.b_opponent_rg04.tugTalk4
                                 ][Math.floor(random.next() * 4)];
                                 t3 = text.b_opponent_rg04.tugStatus;
                                 await battler.human(...text.b_opponent_rg04.act_tug);
                                 gr = true;
                              } else if (!world.genocide) {
                                 t2 = text.b_opponent_rg04.holdTalk;
                                 t3 = text.b_opponent_rg04.holdStatus;
                                 await battler.human(...text.b_opponent_rg04.act_tug_hold);
                              } else {
                                 await battler.human(...text.b_opponent_rg04.act_tug_geno);
                                 t3 = text.b_opponent_rg04.tugGenoStatus;
                              }
                           }
                        } else if (vars.killed === 0) {
                           t2 = text.b_opponent_rg04.tugTalkLone;
                           if (vars.glove2) {
                              if (vars.progress < 2) {
                                 t3 = text.b_opponent_rg04.tugStatusLone;
                              }
                              await battler.human(...text.b_opponent_rg04.act_tug_lone);
                              vars.pull2();
                           } else {
                              await battler.human(...text.b_opponent_rg04.act_tug_hold_lone);
                           }
                        } else {
                           t1 = text.b_opponent_rg03.tugTalkLone;
                           if (vars.progress < 2) {
                              t3 = text.b_opponent_rg03.tugStatusLone;
                           }
                           await battler.human(...text.b_opponent_rg03.act_tug_lone);
                        }
                        break;
                     case 'whisper':
                        if (vars.killed === -1) {
                           if (target === 0) {
                              if (vars.progress === 1) {
                                 await battler.human(...text.b_opponent_rg03.act_whisper);
                                 cf = true;
                              } else {
                                 await battler.human(...text.b_opponent_rg03.act_whisper_alt);
                              }
                           } else if (vars.progress < 2) {
                              await battler.human(...text.b_opponent_rg04.act_whisper);
                           } else {
                              await battler.human(...text.b_opponent_rg04.act_whisper_alt);
                           }
                        } else if (target === 0) {
                           await battler.human(...text.b_opponent_rg03.act_whisper_alt);
                        } else {
                           await battler.human(...text.b_opponent_rg04.act_whisper_alt);
                        }
                        break;
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable) {
                     break;
                  }
                  battler.spare();
                  break;
            }
            if (battler.alive.length > 0) {
               if (t1 === null && t2 === null) {
                  const r = Math.floor(random.next() * 4);
                  if (vars.killed === -1) {
                     if (vars.progress < 1) {
                        t1 = [
                           text.b_opponent_rg03.randTalk1,
                           text.b_opponent_rg03.randTalk2,
                           text.b_opponent_rg03.randTalk3,
                           text.b_opponent_rg03.randTalk4
                        ][r]();
                        t2 = [
                           text.b_opponent_rg04.randTalk1,
                           text.b_opponent_rg04.randTalk2(),
                           text.b_opponent_rg04.randTalk3(),
                           text.b_opponent_rg04.randTalk4
                        ][r];
                     } else if (vars.progress < 2) {
                        t1 = [
                           text.b_opponent_rg03.nervyTalk1,
                           text.b_opponent_rg03.nervyTalk2,
                           text.b_opponent_rg03.nervyTalk3,
                           text.b_opponent_rg03.nervyTalk4
                        ][r];
                        t2 = [
                           text.b_opponent_rg04.nervyTalk1,
                           text.b_opponent_rg04.nervyTalk2,
                           text.b_opponent_rg04.nervyTalk3,
                           text.b_opponent_rg04.nervyTalk4
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg03.happyTalk1,
                           text.b_opponent_rg03.happyTalk2,
                           text.b_opponent_rg03.happyTalk3,
                           text.b_opponent_rg03.happyTalk4
                        ][r];
                        t2 = [
                           text.b_opponent_rg04.happyTalk1,
                           text.b_opponent_rg04.happyTalk2,
                           text.b_opponent_rg04.happyTalk3,
                           text.b_opponent_rg04.happyTalk4
                        ][r];
                     }
                  } else if (vars.progress < 2) {
                     if (vars.killed === 0) {
                        t2 = [
                           text.b_opponent_rg04.randTalkLone1(),
                           text.b_opponent_rg04.randTalkLone2(),
                           text.b_opponent_rg04.randTalkLone3(),
                           text.b_opponent_rg04.randTalkLone4()
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg03.randTalkLone1,
                           text.b_opponent_rg03.randTalkLone2,
                           text.b_opponent_rg03.randTalkLone3,
                           text.b_opponent_rg03.randTalkLone4
                        ][r]();
                     }
                  } else {
                     if (vars.killed === 0) {
                        t2 = [
                           text.b_opponent_rg04.horrorTalk1,
                           text.b_opponent_rg04.horrorTalk2,
                           text.b_opponent_rg04.horrorTalk3,
                           text.b_opponent_rg04.horrorTalk4
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg03.horrorTalk1,
                           text.b_opponent_rg03.horrorTalk2,
                           text.b_opponent_rg03.horrorTalk3,
                           text.b_opponent_rg03.horrorTalk4
                        ][r];
                     }
                  }
               }
               let generic = true;
               if (t3 === null) {
                  if (vars.killed === -1) {
                     if (vars.progress < 1) {
                        if (world.goatbro) {
                           t3 = text.b_group_rg();
                        } else {
                           t3 = [
                              text.b_opponent_rg03.randStatus1,
                              text.b_opponent_rg03.randStatus2,
                              text.b_opponent_rg03.randStatus3,
                              text.b_opponent_rg03.randStatus4,
                              text.b_opponent_rg03.randStatus5
                           ][Math.floor(random.next() * 5)];
                        }
                     } else if (vars.progress < 2) {
                        t3 = text.b_opponent_rg03.nervyStatus;
                     } else {
                        t3 = text.b_opponent_rg03.happyStatus;
                        generic = false;
                     }
                  } else if (vars.progress < 2) {
                     if (vars.killed === 0) {
                        t3 = text.b_opponent_rg04.randStatusLone();
                        killer && (generic = false);
                     } else {
                        t3 = text.b_opponent_rg03.randStatusLone();
                        killer && (generic = false);
                     }
                  } else {
                     t3 = text.b_opponent_rg03.horrorStatus;
                     world.genocide || (generic = false);
                  }
               }
               if (generic && battler.hurt.includes(volatile)) {
                  if (target === 0) {
                     t3 = text.b_opponent_rg03.dangerStatus();
                  } else {
                     t3 = text.b_opponent_rg04.dangerStatus();
                  }
               }
               t1 && (await monster1(...t1));
               t2 && (await monster2(...t2));
               await battler.box.size.modulate(timer, 300, { x: 80, y: 65 });
               await Promise.all([
                  battler.box.size.modulate(timer, 450, { y: 160 }),
                  battler.box.position.modulate(timer, 450, { y: 100 })
               ]);
               battler.SOUL.position.set(battler.box);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               const tugScore = await patterns.rg(
                  volatile.sparable,
                  vars.progress,
                  vars.killed,
                  cf ? 'cf' : gr ? 'gr' : null,
                  vars.totalTugScore
               );
               battler.SOUL.alpha.value = 0;
               game.movement = false;
               await Promise.all([
                  battler.box.size.modulate(timer, 450, { y: 65 }),
                  battler.box.position.modulate(timer, 450, { y: 192.5 - 65 / 2 })
               ]);
               if (vars.progress < 1) {
                  vars.totalTugScore += tugScore;
                  if (1 <= vars.totalTugScore) {
                     await monster2(...text.b_opponent_rg04.tugShock);
                     await timer.pause(850);
                     vars.pull2();
                     await timer.pause(850);
                     await monster1(...text.b_opponent_rg03.tugShock);
                     vars.progress = 1;
                     t3 = text.b_opponent_rg04.tugSuccessStatus;
                     battler.volatile[0].container.objects[0].metadata.timefactor = 1.5;
                     battler.volatile[0].container.objects[0].metadata.spew = true;
                     battler.music?.rate.modulate(timer, 500, 1.15);
                  }
               } else if (cf) {
                  await battler.music?.rate.modulate(timer, 1500, 1.4);
                  battler.music?.stop();
                  await timer.pause(1000);
                  battler.volatile[0].container.objects[0].metadata.timefactor = 1;
                  battler.volatile[0].container.objects[0].metadata.spew = false;
                  await monster1(...text.b_opponent_rg03.confess1);
                  await timer.pause(1000);
                  await monster2(...text.b_opponent_rg03.confess2);
                  await timer.pause(1200);
                  await monster1(...text.b_opponent_rg03.confess3);
                  await timer.pause(650);
                  vars.pull1();
                  await timer.pause(1350);
                  await monster2(...text.b_opponent_rg03.confess4);
                  await monster1(...text.b_opponent_rg03.confess5a);
                  await timer.pause(850);
                  await monster1(...text.b_opponent_rg03.confess5b);
                  await timer.pause(1150);
                  await monster1(...text.b_opponent_rg03.confess5c);
                  battler.music = assets.music.confession.instance(timer);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 1.5;
                  battler.volatile[1].container.objects[0].metadata.spew = true;
                  await timer.pause(1250);
                  await monster2(...text.b_opponent_rg03.confess6);
                  await timer.pause(850);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 1;
                  battler.volatile[1].container.objects[0].metadata.spew = false;
                  await monster1(...text.b_opponent_rg03.confess7);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 0.5;
                  await timer.pause(950);
                  await monster2(...text.b_opponent_rg03.confess8);
                  battler.volatile[0].container.objects[0].metadata.timefactor = 0.5;
                  await timer.pause(1650);
                  await monster1(...text.b_opponent_rg03.confess9);
                  await monster2(...text.b_opponent_rg03.confess10);
                  await monster1(...text.b_opponent_rg03.confess11);
                  for (const v of battler.volatile) {
                     v.sparable = true;
                  }
                  vars.progress = 2;
                  t3 = text.b_opponent_rg03.happyStatus;
                  battler.g += 200;
               }
               await battler.box.size.modulate(timer, 300, { x: 282.5 });
               battler.status = t3 ?? [];
               battler.resume();
            } else {
               battler.music?.stop();
            }
         };
      })(),
      opponents: [
         [ opponents.rg03, { x: 80, y: 104 } ],
         [ opponents.rg04, { x: 240, y: 104 } ]
      ]
   }),
   pyrope: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.goatbro ? text.b_opponent_pyrope.genoStatus : text.b_opponent_pyrope.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() =>
         battler.opponents.includes(opponents.pyrope) ? patterns.pyrope(false) : timer.pause(450)
      ),
      opponents: [ [ opponents.pyrope, { x: 140, y: 120 } ] ]
   }),
   perigee: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.goatbro ? text.b_opponent_perigee.genoStatus : text.b_opponent_perigee.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(
         () => (battler.opponents.includes(opponents.perigee) ? patterns.perigee() : timer.pause(450)),
         { x: 100, y: 130 },
         true
      ),
      opponents: [ [ opponents.perigee, { x: 140, y: 120 } ] ]
   }),
   spacetopTsundere: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_spacetopTsundere();
         standardMusic();
         return true;
      },
      handler: defaultSetup(async (c, t, v) => {
         const spacetop = battler.opponents.includes(commonOpponents.spacetop);
         const tsundere = battler.opponents.includes(opponents.tsundere);
         await Promise.all([
            spacetop && commonPatterns.spacetop(),
            tsundere && patterns.tsundere(spacetop, v.vars.greenmode)
         ]);
         v.vars.groupDead ??= battler.alive.length;
         if (battler.alive.length < v.vars.groupDead) {
            v.vars.groupDead = battler.alive.length;
            battler.alive.length === 1 && (battler.status = text.b_group_spacetopTsundereX(spacetop));
         }
      }),
      opponents: [
         [ commonOpponents.spacetop, { x: 100, y: 120 } ],
         [ opponents.tsundere, { x: 220, y: 60 } ]
      ]
   }),
   pyropeTsundere: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_pyropeTsundere();
         standardMusic();
         return true;
      },
      handler: defaultSetup(async (c, t, v) => {
         const pyrope = battler.opponents.includes(opponents.pyrope);
         const tsundere = battler.opponents.includes(opponents.tsundere);
         await Promise.all([
            pyrope && patterns.pyrope(tsundere),
            tsundere && patterns.tsundere(pyrope, v.vars.greenmode)
         ]);
         v.vars.groupDead ??= battler.alive.length;
         if (battler.alive.length < v.vars.groupDead) {
            v.vars.groupDead = battler.alive.length;
            battler.alive.length === 1 && (battler.status = text.b_group_pyropeTsundereX(pyrope));
         }
      }),
      opponents: [
         [ opponents.pyrope, { x: 100, y: 120 } ],
         [ opponents.tsundere, { x: 220, y: 60 } ]
      ]
   }),
   madjick: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      init () {
         battler.status = text.b_opponent_madjick.status1();
         return true;
      },
      opponents: [ [ opponents.madjick, { x: 160, y: 120 } ] ],
      handler: defaultSetup(
         async (c, t, v) => {
            const attacktype = v.vars.attacktype;
            await patterns.madjick(attacktype, v.vars.crazy);
            if (attacktype === 1) {
               const spr = v.container.objects[0].metadata.orb1 as CosmosSprite;
               spr.active = false;
               spr.metadata.gen = false;
            } else if (attacktype === 2) {
               const spr = v.container.objects[0].metadata.orb2 as CosmosSprite;
               spr.active = false;
               spr.metadata.gen = false;
            }
         },
         { x: 120, y: 100 },
         true
      )
   }),
   knightknight: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      init () {
         battler.status = text.b_opponent_knightknight.status1();
         return true;
      },
      opponents: [ [ opponents.knightknight, { x: 160, y: 120 } ] ],
      handler: defaultSetup((c, t, v) => patterns.knightknight(v.vars.result === 3), { x: 100, y: 100 }, true)
   }),
   froggitexWhimsalot: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.status = text.b_group_froggitexWhimsalot();
         return true;
      },
      opponents: [
         [ opponents.froggitex, { x: 100, y: 120 } ],
         [ opponents.whimsalot, { x: 220, y: 80 } ]
      ],
      handler: defaultSetup(
         async () => {
            const solo = battler.alive.length < 2;
            const froggitex = battler.alive.find(x => x.opponent === opponents.froggitex);
            await Promise.all([
               froggitex && patterns.froggitex(solo),
               battler.alive.find(x => x.opponent === opponents.whimsalot) && patterns.whimsalot(solo)
            ]);
            const vars = battler.volatile[0].vars;
            vars.groupDead ??= 2;
            if (battler.alive.length < vars.groupDead) {
               vars.groupDead = battler.alive.length;
               battler.alive.length === 1 && (battler.status = text.b_group_froggitexWhimsalotX(!!froggitex));
            }
         },
         { x: 80, y: 80 },
         true
      )
   }),
   astigmatismMigospel: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.status = text.b_group_astigmatism();
         if (world.genocide) {
            battler.volatile[1].alive = false;
            battler.volatile[1].container.alpha.value = 0;
         }
         return true;
      },
      opponents: [
         [ opponents.astigmatism, { x: 100, y: 120 } ],
         [ opponents.migospel, { x: 220, y: 120 } ]
      ],
      handler: defaultSetup(
         async () => {
            if (battler.opponents.includes(opponents.astigmatism)) {
               await patterns.astigmatism(battler.alive.length < 2);
               const vars = battler.volatile[0].vars;
               if (battler.alive.length < 2 && !vars.gonSolo) {
                  vars.gonSolo = true;
                  battler.status = text.b_group_astigmatismMigospelX;
               }
            } else if (battler.alive.length > 0) {
               if (!battler.alive[0].container.metadata.happi) {
                  battler.alive[0].container.metadata.happi = true;
                  battler.status = text.b_opponent_migospel.soloStatus();
                  const volatile = battler.alive[0];
                  volatile.sparable = true;
                  const anim = volatile.container.objects[0] as CosmosAnimation;
                  anim.index = 0;
                  anim.resources = content.ibcMigospelHappi;
                  anim.enable();
               }
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
         },
         { x: 100, y: 100 },
         true
      )
   }),
   mushketeer: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.status = text.b_opponent_mushketeer.status0();
         return true;
      },
      opponents: [ [ opponents.mushketeer, { x: 160, y: 120 } ] ],
      handler: defaultSetup((c, t, v) => patterns.mushketeer(v.vars.travel ?? 0), { x: 60, y: 60 }, true)
   })
};

export default groups;

CosmosUtils.status(`LOAD MODULE: AERIALIS GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
