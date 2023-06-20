import { PixelateFilter, RGBSplitFilter, ZoomBlurFilter } from 'pixi-filters';
import { Rectangle } from 'pixi.js';
import assets from '../assets';
import { OutertaleOpponent } from '../classes';
import { phish } from '../common';
import commonOpponents, { kiddFight, kiddHandler, kiddTurn } from '../common/opponents';
import commonPatterns from '../common/patterns';
import commonText from '../common/text';
import content, { inventories } from '../content';
import { events, game, keys, random, renderer, speech, timer } from '../core';
import { CosmosInventory } from '../engine/core';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosKeyboardInput } from '../engine/input';
import { CosmosMath, CosmosPoint, CosmosValue } from '../engine/numerics';
import { CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosText } from '../engine/text';
import { CosmosDirection, CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import { battler, heal, oops, sawWaver, sineWaver, world } from '../mantle';
import save from '../save';
import patterns from './patterns';
import text from './text';

const fixfactor = 0.8;

const opponents = {
   doge: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_doge,
      assets: new CosmosInventory(
         content.ibcDoge,
         content.ibcDogeHurt,
         content.ibcDogeSpear,
         content.ibcDogeTail,
         content.amDogerelax,
         content.ibbSpear,
         content.asLanding,
         content.ibbFroggitWarn
      ),
      exp: 150,
      hp: 500 * fixfactor,
      df: 2,
      name: text.b_opponent_doge.name,
      acts: () => [
         [ 'check', text.b_opponent_doge.act_check ],
         [ 'talk', text.b_opponent_doge.act_talk ],
         [ 'flirt', text.b_opponent_doge.act_flirt ],
         [ 'bathe', [] ] /* volatile => (!save.data.b.oops && volatile.vars.turns === 2 ? '#ff0' : '#fff') */,
         [ 'walk', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         let attack = true;
         let status = true;
         volatile.vars.pets ||= 0;
         volatile.vars.astat ||= 1;
         volatile.vars.turns ||= 0;
         let turn = volatile.vars.turns++;
         const talk = (...lines: string[]) =>
            battler.monster(false, volatile.container.position.add(31, -105), battler.bubbles.napstablook, ...lines);
         switch (choice.type) {
            case 'fight':
               volatile.vars.attacked = true;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  battler.g += 80;
                  save.data.n.state_foundry_doge = 1;
                  battler.music?.stop();
                  return;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  if (volatile.sparable) {
                     if (volatile.vars.pet) {
                        await battler.human(...text.b_opponent_doge.fetchTextEpic);
                     } else {
                        await battler.human(...text.b_opponent_doge.fetchTextGarb);
                     }
                  } else {
                     status = false;
                     await battler.human(...text.b_opponent_doge.fetchText());
                     battler.stat.speed.modifiers.push([ 'multiply', 3 / 4, 1 ]);
                     battler.status = text.b_opponent_doge.fetchStatus;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     status = false;
                     if (!volatile.sparable) {
                        if (!world.genocide) {
                           save.data.b.flirt_doge = true;
                           volatile.flirted = true;
                        }
                        battler.status = text.b_opponent_doge.flirtStatus();
                     }
                     break;
                  case 'talk':
                     status = false;
                     if (!volatile.sparable) {
                        battler.status = text.b_opponent_doge.talkStatus();
                     }
                     break;
                  case 'bathe':
                     if (world.genocide || (world.dead_dog && save.data.n.state_starton_lesserdog === 2)) {
                        await battler.human(...text.b_opponent_doge.batheTextGeno);
                     } else if (turn < 2) {
                        await battler.human(...text.b_opponent_doge.batheTextEarly);
                     } else if (turn > 2) {
                        if (volatile.vars.bathe) {
                           await battler.human(...text.b_opponent_doge.batheTextPost);
                        } else {
                           await battler.human(...text.b_opponent_doge.batheTextLate);
                        }
                     } else {
                        await battler.human(...text.b_opponent_doge.batheText);
                        (volatile.vars.astat as number) -= 0.25;
                        volatile.vars.bathe = true;
                        attack = false;
                     }
                     break;
                  case 'walk':
                     if (world.genocide || (world.dead_dog && save.data.n.state_starton_lesserdog === 2)) {
                        await battler.human(...text.b_opponent_doge.walkTextGeno);
                     } else if (turn < 3) {
                        await battler.human(...text.b_opponent_doge.walkTextEarly);
                     } else if (turn > 4) {
                        if (volatile.vars.walk) {
                           await battler.human(...text.b_opponent_doge.walkTextPost);
                        } else {
                           await battler.human(...text.b_opponent_doge.walkTextLate);
                        }
                     } else if (volatile.vars.bathe) {
                        await battler.human(...text.b_opponent_doge.walkText);
                        (volatile.vars.astat as number) -= 0.25;
                        volatile.vars.walk = true;
                        attack = false;
                        if (turn === 3) {
                           turn++;
                           volatile.vars.turns++;
                        }
                     } else {
                        await battler.human(...text.b_opponent_doge.walkTextSus);
                     }
                     break;
                  case 'pet':
                     if (world.genocide || (world.dead_dog && save.data.n.state_starton_lesserdog === 2)) {
                        await battler.human(...text.b_opponent_doge.petTextGeno);
                     } else if (turn < 7) {
                        await battler.human(...text.b_opponent_doge.petTextEarly);
                     } else if (turn > 9) {
                        if (volatile.vars.pet) {
                           await battler.human(
                              ...[
                                 text.b_opponent_doge.petTextPost1,
                                 text.b_opponent_doge.petTextPost2,
                                 text.b_opponent_doge.petTextPost3,
                                 text.b_opponent_doge.petTextPost4,
                                 text.b_opponent_doge.petTextPost5,
                                 text.b_opponent_doge.petTextPost6,
                                 text.b_opponent_doge.petTextPost7
                              ][Math.min((volatile.vars.pets as number)++, 6)]
                           );
                        } else {
                           await battler.human(...text.b_opponent_doge.petTextLate);
                        }
                     } else if (volatile.vars.walk) {
                        battler.music?.stop();
                        await battler.human(...text.b_opponent_doge.petText);
                        const music = (battler.music = assets.music.dogerelax.instance(timer));
                        music.gain.value /= 16;
                        music.gain.modulate(timer, 1000, music.gain.value * 16);
                        volatile.vars.pet = true;
                        attack = false;
                        if (turn === 7) {
                           turn += 2;
                           volatile.vars.turns += 2;
                        } else if (turn === 8) {
                           turn++;
                           volatile.vars.turns++;
                        }
                        volatile.sparable = true;
                        battler.g += 60;
                     } else {
                        await battler.human(...text.b_opponent_doge.petTextSus);
                     }
                     break;
               }
               break;
            case 'spare':
               if (!volatile.sparable) {
                  break;
               }
               battler.spare();
               battler.music?.stop();
               if (volatile.vars.pet) {
                  save.data.n.state_foundry_doge = 2;
               }
               return;
         }
         if (status && battler.hurt.includes(volatile)) {
            status = false;
            battler.status = text.b_opponent_doge.hurtStatus();
         }
         if (!(world.genocide || (world.dead_dog && save.data.n.state_starton_lesserdog === 2))) {
            if (turn === 9) {
               battler.g += 40;
               volatile.sparable = true;
               if (!volatile.vars.pet && !save.data.b.oops) {
                  battler.music?.stop();
               }
            }
         }
         await talk(
            ...[
               text.b_opponent_doge.turnTalk1,
               text.b_opponent_doge.turnTalk2,
               text.b_opponent_doge.turnTalk3,
               text.b_opponent_doge.turnTalk4,
               text.b_opponent_doge.turnTalk5,
               text.b_opponent_doge.turnTalk6,
               text.b_opponent_doge.turnTalk7,
               text.b_opponent_doge.turnTalk8,
               text.b_opponent_doge.turnTalk9,
               text.b_opponent_doge.turnTalk10,
               text.b_opponent_doge.turnTalk11
            ][Math.min(turn as number, 10)]()
         );
         if (status || (save.data.n.exp <= 0 && [ 1, 3, 8 ].includes(turn as number))) {
            battler.status = CosmosUtils.provide(
               world.genocide
                  ? text.b_opponent_doge.status1
                  : [
                       text.b_opponent_doge.turnStatus1,
                       text.b_opponent_doge.turnStatus2,
                       text.b_opponent_doge.turnStatus3,
                       text.b_opponent_doge.turnStatus4,
                       text.b_opponent_doge.turnStatus5,
                       text.b_opponent_doge.turnStatus6,
                       text.b_opponent_doge.turnStatus7,
                       text.b_opponent_doge.turnStatus8,
                       text.b_opponent_doge.turnStatus9,
                       text.b_opponent_doge.turnStatus10
                    ][Math.min(turn as number, 9)]
            );
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await battler.box.size.modulate(timer, 300, { x: 100, y: 65 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               await (attack && (world.genocide || turn < 9)
                  ? patterns.doge(turn < 2 ? 1 : turn < 4 ? 2 : 3, 6 * volatile.vars.astat)
                  : timer.pause(450));
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            scale: 0.5,
            resources: content.ibcDogeTail,
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: -2 },
                  resources: content.ibcDoge
               }).on('tick', function () {
                  const pet = battler.volatile[0].vars.pet;
                  if (pet && this.resources !== content.ibcDogeSpear) {
                     this.use(content.ibcDogeSpear);
                  } else if (!pet && this.resources !== content.ibcDoge) {
                     this.use(content.ibcDoge);
                  }
               })
            ]
         }).on('tick', function () {
            if (world.genocide) {
               this.duration = 20;
            } else {
               const progress = battler.volatile[0].vars.progress;
               if (progress === 3 && this.duration !== 3) {
                  this.duration = 6;
               } else if (progress === 4 && this.duration !== 15) {
                  this.duration = 15;
               }
            }
         }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcDogeHurt ]
         })
   }),
   muffet: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_muffet,
      assets: new CosmosInventory(
         content.ibcMuffetArm1,
         content.ibcMuffetArm2a,
         content.ibcMuffetArm2b,
         content.ibcMuffetArm3,
         content.ibcMuffetCupcake,
         content.ibcMuffetEye1,
         content.ibcMuffetEye2,
         content.ibcMuffetEye3,
         content.ibcMuffetSpider,
         content.ibcMuffetSpiderSign,
         content.ibcMuffetDustrus,
         content.ibcMuffetHair,
         content.ibcMuffetHead,
         content.ibcMuffetHurt,
         content.ibcMuffetLegs,
         content.ibcMuffetPants,
         content.ibcMuffetShirt,
         content.ibcMuffetShoulder,
         content.ibcMuffetSpiderTelegram,
         content.ibcMuffetTeapot,
         content.ibuPurpleSOUL,
         content.amSpiderrelax,
         content.ibbSpider,
         content.ibbDonut,
         content.ibbCrossiant,
         content.ibbSpiderOutline,
         content.ibbDonutOutline,
         content.ibbCrossiantOutline,
         inventories.idcKidd,
         content.avKidd,
         content.ibbCupcakeAttack,
         content.ibbCupcake
      ),
      exp: 300,
      hp: 1250 * fixfactor,
      df: 0,
      name: text.b_opponent_muffet.name,
      acts: [
         [ 'check', text.b_opponent_muffet.act_check ],
         [
            'counter',
            volatile =>
               world.genocide
                  ? text.b_opponent_muffet.counterTextGeno
                  : (volatile.vars.turns ?? 0) < 2
                  ? text.b_opponent_muffet.counterTextEarly
                  : volatile.vars.turns > 2
                  ? volatile.vars.counter
                     ? text.b_opponent_muffet.counterTextPost
                     : text.b_opponent_muffet.counterTextLate
                  : text.b_opponent_muffet.counterText
         ],
         [
            'appease',
            volatile =>
               world.genocide
                  ? text.b_opponent_muffet.appeaseTextGeno
                  : (volatile.vars.turns ?? 0) < 6
                  ? text.b_opponent_muffet.appeaseTextEarly
                  : volatile.vars.turns > 6
                  ? volatile.vars.appease
                     ? text.b_opponent_muffet.appeaseTextPost
                     : text.b_opponent_muffet.appeaseTextLate
                  : volatile.vars.counter
                  ? text.b_opponent_muffet.appeaseText
                  : text.b_opponent_muffet.appeaseTextSus
         ],
         [
            'pay',
            volatile =>
               world.genocide
                  ? text.b_opponent_muffet.payTextGeno
                  : (volatile.vars.turns ?? 0) < 10
                  ? text.b_opponent_muffet.payTextEarly
                  : volatile.vars.turns > 10
                  ? volatile.vars.pay
                     ? text.b_opponent_muffet.payTextPost
                     : text.b_opponent_muffet.payTextLate
                  : volatile.vars.appease
                  ? []
                  : text.b_opponent_muffet.payTextSus
         ],
         [ 'flirt', text.b_opponent_muffet.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         vars: {
            attack: true,
            attacked: false,
            speedstat: 1,
            turns: 0,
            counter: false,
            appease: false,
            pay: false
         },
         bubble: pos => [ pos.add(31, -105), battler.bubbles.napstablook ],
         defaultTalk: state =>
            [
               text.b_opponent_muffet.turnTalk1,
               text.b_opponent_muffet.turnTalk2,
               text.b_opponent_muffet.turnTalk3,
               text.b_opponent_muffet.turnTalk4,
               text.b_opponent_muffet.turnTalk5,
               text.b_opponent_muffet.turnTalk6,
               text.b_opponent_muffet.turnTalk7,
               text.b_opponent_muffet.turnTalk8,
               text.b_opponent_muffet.turnTalk9,
               text.b_opponent_muffet.turnTalk10,
               text.b_opponent_muffet.turnTalk11,
               text.b_opponent_muffet.turnTalk12,
               text.b_opponent_muffet.turnTalk13
            ][Math.min(state.vars.turns, 12)](),
         defaultStatus: state =>
            [
               text.b_opponent_muffet.turnStatus1,
               text.b_opponent_muffet.turnStatus2,
               text.b_opponent_muffet.turnStatus3,
               text.b_opponent_muffet.turnStatus4,
               text.b_opponent_muffet.turnStatus5,
               text.b_opponent_muffet.turnStatus6,
               text.b_opponent_muffet.turnStatus7,
               text.b_opponent_muffet.turnStatus8,
               text.b_opponent_muffet.turnStatus9,
               text.b_opponent_muffet.turnStatus10,
               text.b_opponent_muffet.turnStatus11,
               text.b_opponent_muffet.turnStatus12,
               text.b_opponent_muffet.turnStatus13
            ][Math.min(state.vars.turns, 12)](),
         prechoice (state) {
            state.vars.attack = true;
         },
         act: {
            flirt (state) {
               if (!world.genocide) {
                  save.data.b.flirt_muffet = true;
                  state.volatile.flirted = true;
               }
            },
            counter (state) {
               if (state.vars.turns === 2) {
                  state.vars.counter = true;
                  state.vars.speedstat -= 0.125;
                  state.vars.attack = false;
               }
            },
            appease (state) {
               if (state.vars.turns === 6 && state.vars.counter) {
                  state.vars.appease = true;
                  state.vars.speedstat -= 0.125;
                  state.vars.attack = false;
               }
            },
            pay (state) {
               if (state.vars.pay) {
                  state.talk = text.b_opponent_muffet.payTalkPost;
               } else if (state.vars.turns === 10 && state.vars.appease) {
                  state.vars.pay = true;
                  state.vars.attack = false;
               }
            }
         },
         spare (state) {
            state.volatile.sparable && state.vars.pay && (save.data.n.state_foundry_muffet = 2);
            battler.spare();
         },
         async postchoice (state) {
            if (world.genocide) {
               await kiddHandler(state, 'muffet');
            } else {
               if (state.vars.turns < 10) {
                  await kiddHandler(state, 'muffet');
               } else if (state.vars.turns === 10) {
                  state.pacify = true;
                  battler.music?.stop();
                  if (state.vars.pay) {
                     await battler.human(...text.b_opponent_muffet.payText);
                     const music = assets.music.spiderrelax.instance(timer);
                     music.gain.value /= 16;
                     music.gain.modulate(timer, 1000, music.gain.value * 16);
                     battler.music = music;
                  } else {
                     const rotbase = timer.value;
                     const spideySign = new CosmosSprite({
                        anchor: 1,
                        position: { x: -1, y: -4 },
                        frames: [ content.ibcMuffetSpiderTelegram ]
                     }).on('tick', function () {
                        this.rotation.value = sineWaver(rotbase, 3000, 10, -10);
                     });
                     const spidey = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 325, y: 123 },
                        resources: content.ibcMuffetSpider,
                        objects: [ spideySign ]
                     });
                     renderer.attach('menu', spidey);
                     spidey.enable();
                     await spidey.position.modulate(timer, 1400, { x: 280 }, { x: 260 });
                     spidey.reset();
                     battler.garbage.push([ 'menu', spidey ]);
                     const bbox = battler.box.size.x;
                     timer
                        .when(() => battler.box.size.x < bbox)
                        .then(() => {
                           spidey.enable();
                           spidey.position.modulate(timer, 1400, { x: 280 }, { x: 325 }).then(async () => {
                              renderer.detach('menu', spidey);
                           });
                        });
                  }
               }
            }
            state.dead && (save.data.n.state_foundry_muffet = 1);
         },
         async posttalk (state) {
            if (world.genocide && state.vars.turns === 12) {
               state.volatile.sparable = true;
               battler.spare();
            }
         },
         async poststatus (state) {
            await battler.resume(async () => {
               await Promise.all([
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 67.5 / 2 }),
                  battler.box.size.modulate(timer, 300, { x: 120, y: 67.5 })
               ]);
               battler.line.reset();
               battler.line.pos = { x: 160, y: battler.line.offset + 20 };
               if (state.vars.turns > 0) {
                  battler.line.active = true;
                  battler.SOUL.position.set(battler.line.pos);
               } else {
                  battler.SOUL.position.set(battler.box);
               }
               battler.SOUL.alpha.value = 1;
               if (state.vars.attack && state.vars.turns < (world.genocide ? 12 : 10)) {
                  await patterns.muffet(state.vars.turns, state.vars.speedstat);
                  if (state.vars.turns === 0) {
                     await battler.monster(
                        false,
                        state.volatile.container.position.add(31, -105),
                        battler.bubbles.napstablook,
                        ...text.b_opponent_muffet.turnTalk1a
                     );
                  }
                  const infoElements = [ [ 0 ], [ 0 ], [ 3 ], [ 0, 2 ], [ 1 ], [ 0, 2 ], [ 3 ], [ 0, 2 ], [ 0, 1 ], [ 0, 1, 2 ], [ 3 ] ][
                     state.vars.turns
                  ];
                  if (infoElements) {
                     const attackInfo = new CosmosObject({
                        alpha: 0,
                        position: { y: -34 },
                        objects: infoElements.map(
                           (id, index, arr) =>
                              new CosmosSprite({
                                 anchor: 0,
                                 scale: 0.5,
                                 position: { x: (index + arr.length / -2 + 0.5) * 12.5 },
                                 frames: [
                                    [ content.ibbSpider, content.ibbCrossiant, content.ibbDonut, content.ibbCupcake ][id]
                                 ]
                              })
                        )
                     });
                     const spideySign = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: -1, y: -4 },
                        resources: content.ibcMuffetSpiderSign,
                        objects: [ attackInfo ]
                     }).on('tick', function () {
                        if (!this.reverse && this.active && this.index === this.frames.length - 1) {
                           this.disable();
                           attackInfo.alpha.value = 1;
                        }
                     });
                     const spidey = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 325, y: 123 },
                        resources: content.ibcMuffetSpider,
                        objects: [ spideySign ]
                     });
                     renderer.attach('menu', spidey);
                     spidey.enable();
                     spidey.position.modulate(timer, 500, { x: 280 }, { x: 260 }).then(async () => {
                        spidey.reset();
                        spideySign.enable();
                     });
                     events.on('choice').then(async () => {
                        if (spideySign.index > 0) {
                           attackInfo.alpha.value = 0;
                           spideySign.reverse = true;
                           spideySign.enable();
                           await timer.when(() => spideySign.index === 0);
                           spideySign.reset();
                        }
                        spidey.enable();
                        await spidey.position.modulate(timer, 500, { x: 280 }, { x: 325 });
                        renderer.detach('menu', spidey);
                     });
                  }
               } else {
                  await timer.pause(450);
               }
               battler.line.active = false;
               await Promise.all([
                  battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 }),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 65 / 2 })
               ]);
               state.vars.turns++;
            });
         }
      }),
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMuffetLegs ],
            metadata: { base: timer.value, eyePhase: -1 },
            objects: [
               new CosmosAnimation({
                  metadata: { part: 'arm1' },
                  position: { x: -9, y: -36 },
                  scale: { x: -1 },
                  resources: content.ibcMuffetArm1
               }),
               new CosmosAnimation({
                  metadata: { part: 'arm6' },
                  position: { x: 9, y: -36 },
                  resources: content.ibcMuffetArm1
               }),
               new CosmosSprite({
                  metadata: { part: 'forearm1' },
                  position: { x: -8, y: -44 },
                  scale: { x: -1 },
                  frames: [ content.ibcMuffetArm2a ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm2' },
                        anchor: { y: 1 },
                        position: { x: 13, y: 15 },
                        frames: [ content.ibcMuffetArm2b ],
                        objects: [
                           new CosmosSprite({
                              metadata: { part: 'teapot1' },
                              anchor: { y: 0 },
                              position: { x: 9, y: -12 },
                              frames: [ content.ibcMuffetTeapot ]
                           })
                        ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'forearm2' },
                  position: { x: 8, y: -44 },
                  frames: [ content.ibcMuffetArm2a ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm5' },
                        anchor: { y: 1 },
                        position: { x: 13, y: 15 },
                        frames: [ content.ibcMuffetArm2b ],
                        objects: [
                           new CosmosSprite({
                              metadata: { part: 'teapot2' },
                              anchor: { y: 0 },
                              position: { x: 9, y: -12 },
                              frames: [ content.ibcMuffetTeapot ]
                           })
                        ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'shoulder1' },
                  position: { x: -2, y: -59 },
                  scale: { x: -1 },
                  frames: [ content.ibcMuffetShoulder ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm3' },
                        anchor: { y: 1 },
                        position: { x: 14, y: 16 },
                        frames: [ content.ibcMuffetArm3 ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'shoulder2' },
                  position: { x: 2, y: -59 },
                  frames: [ content.ibcMuffetShoulder ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm4' },
                        anchor: { y: 1 },
                        position: { x: 14, y: 16 },
                        frames: [ content.ibcMuffetArm3 ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'pants' },
                  anchor: { x: 0, y: 1 },
                  position: { y: -20 },
                  frames: [ content.ibcMuffetPants ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'hair1' },
                        anchor: { y: 0 },
                        position: { x: -18, y: -72 },
                        scale: { x: -1 },
                        frames: [ content.ibcMuffetHair ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'hair2' },
                        anchor: { y: 0 },
                        position: { x: 18, y: -72 },
                        frames: [ content.ibcMuffetHair ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'head' },
                        anchor: { x: 0, y: 1 },
                        position: { y: -31 },
                        frames: [ content.ibcMuffetHead ],
                        objects: [
                           new CosmosAnimation({
                              metadata: { part: 'eye1' },
                              position: { x: -11, y: -29 },
                              resources: content.ibcMuffetEye1
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye2' },
                              position: { x: -8, y: -34 },
                              resources: content.ibcMuffetEye3
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              metadata: { part: 'eye3' },
                              position: { y: -31 },
                              resources: content.ibcMuffetEye2
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye4' },
                              position: { x: 8, y: -34 },
                              scale: { x: -1 },
                              resources: content.ibcMuffetEye3
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye5' },
                              position: { x: 11, y: -29 },
                              scale: { x: -1 },
                              resources: content.ibcMuffetEye1
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           })
                        ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'shirt' },
                        anchor: { x: 0, y: 1 },
                        position: { y: -20 },
                        frames: [ content.ibcMuffetShirt ]
                     })
                  ]
               })
            ]
         }).on('tick', function () {
            const phase = ((timer.value - this.metadata.base) % 1000) / 1000;
            const eyePhase = (timer.value - this.metadata.base) % 3000;
            const siner = CosmosMath.wave(phase);
            const bias = (battler.volatile[0].vars.biasNumber as CosmosValue)?.value ?? 0;
            CosmosUtils.chain(this.objects, (objects, next) => {
               for (const sprite of objects as CosmosSprite[]) {
                  next(sprite.objects);
                  switch (sprite.metadata.part) {
                     case 'arm1':
                        sprite.index = phase < 0.5 ? 1 : 0;
                        sprite.rotation.value = CosmosMath.remap(siner, 0, 15);
                        break;
                     case 'arm2':
                        sprite.rotation.value = CosmosMath.remap(
                           CosmosMath.wave(phase + 0.2),
                           CosmosMath.remap(bias, 2, -5),
                           CosmosMath.remap(bias, -2, -5)
                        );
                        break;
                     case 'arm3':
                        sprite.rotation.value = CosmosMath.remap(1 - CosmosMath.wave(phase - 0.1), -5, 5);
                        break;
                     case 'arm4':
                        sprite.rotation.value = CosmosMath.remap(1 - CosmosMath.wave(phase - 0.1), -5, 5);
                        break;
                     case 'arm5':
                        sprite.rotation.value = CosmosMath.remap(
                           CosmosMath.wave(phase + 0.2),
                           CosmosMath.remap(bias, 2, -5),
                           CosmosMath.remap(bias, -2, -5)
                        );
                        break;
                     case 'arm6':
                        sprite.index = phase < 0.5 ? 1 : 0;
                        sprite.rotation.value = CosmosMath.remap(siner, 0, -15);
                        break;
                     case 'teapot1':
                        sprite.rotation.value = CosmosMath.remap(
                           siner,
                           CosmosMath.remap(bias, 15, 25),
                           CosmosMath.remap(bias, -15, 25)
                        );
                        break;
                     case 'teapot2':
                        sprite.rotation.value = CosmosMath.remap(
                           siner,
                           CosmosMath.remap(bias, 15, 25),
                           CosmosMath.remap(bias, -15, 25)
                        );
                        break;
                     case 'eye1': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1500 && eyePhase > 1500) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye2': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1700 && eyePhase > 1700) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye3': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1900 && eyePhase > 1900) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye4': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 2100 && eyePhase > 2100) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye5': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 2300 && eyePhase > 2300) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'head':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        break;
                     case 'hair1':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        sprite.rotation.value = CosmosMath.remap(1 - siner, -10, 20);
                        break;
                     case 'hair2':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        sprite.rotation.value = CosmosMath.remap(1 - siner, 10, -20);
                        break;
                     case 'pants':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner;
                        break;
                     case 'shirt':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner;
                        break;
                     case 'shoulder1':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.wave(phase + 0.1) * 1.5;
                        break;
                     case 'shoulder2':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.wave(phase + 0.1) * 1.5;
                        break;
                     case 'forearm1':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.remap(bias, CosmosMath.wave(phase + 0.2), 1) * 2;
                        break;
                     case 'forearm2':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.remap(bias, CosmosMath.wave(phase + 0.2), 1) * 2;
                        break;
                  }
               }
            });
            this.metadata.eyePhase = eyePhase;
         }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMuffetHurt ] })
   }),
   shyren: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_shyren,
      assets: new CosmosInventory(
         content.ibcShyrenAgent,
         content.ibcShyrenBack,
         content.ibcShyrenFront,
         content.ibcShyrenWave,
         content.ibcShyrenHurt,
         content.asSingBad1,
         content.asSingBad2,
         content.asSingBad3,
         content.asSingBass1,
         content.asSingBass2,
         content.asSingTreble1,
         content.asSingTreble2,
         content.asSingTreble3,
         content.asSingTreble4,
         content.asSingTreble5,
         content.asSingTreble6,
         content.ibbNote
      ),
      bullyable: true,
      bully: () => world.bully(),
      exp: 52,
      hp: 66,
      df: 2,
      name: text.b_opponent_shyren.name,
      acts: () => [
         [ 'check', text.b_opponent_shyren.act_check ],
         [ 'hum', [] ],
         [ 'flirt', [] ],
         [ 'dance', [] ]
      ],
      sparable: false,
      handler: ((
         gold: number,
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: CosmosProvider<string[]>
      ) => {
         return async (choice, target, volatile) => {
            let idle = true;
            let status = true;
            let encourage = false;
            let awkward = false;
            let flirt = false;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            switch (choice.type) {
               case 'fight':
                  if (
                     await battler.attack(
                        volatile,
                        volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                     )
                  ) {
                     volatile.vars.what = true;
                     world.kill();
                     battler.g += gold * 2;
                     battler.music?.stop();
                     save.data.b.killed_shyren = true;
                     return;
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'hum':
                        idle = false;
                        if (volatile.vars.creep) {
                           volatile.vars.facestate = 'front';
                           volatile.vars.creep = false;
                           await battler.human(...text.b_opponent_shyren.hum4);
                           volatile.vars.encourage = 0;
                           awkward = true;
                        } else if (volatile.vars.encourage === 0) {
                           await battler.human(
                              ...[
                                 text.b_opponent_shyren.hum1,
                                 text.b_opponent_shyren.hum2,
                                 text.b_opponent_shyren.hum3
                              ][battler.rand(3)]
                           );
                        } else {
                           await battler.human(
                              ...[
                                 text.b_opponent_shyren.humX1,
                                 text.b_opponent_shyren.humX2,
                                 text.b_opponent_shyren.humX3,
                                 text.b_opponent_shyren.humX4
                              ][volatile.vars.encourage - 1]()
                           );
                        }
                        encourage = true;
                        break;
                     case 'flirt':
                        if (volatile.vars.creep) {
                           await battler.human(...text.b_opponent_shyren.creepText2);
                           volatile.sparable = true;
                           battler.spare();
                           battler.music?.stop();
                           return;
                        } else if (volatile.vars.encourage < 2) {
                           volatile.vars.encourage = 0;
                           volatile.vars.creep = true;
                           volatile.vars.facestate = void 0;
                           await battler.human(...text.b_opponent_shyren.creepText1);
                           status = false;
                           statustext = text.b_opponent_shyren.creepStatus();
                        } else {
                           idle = false;
                           save.data.b.flirt_shyren = true;
                           volatile.flirted = true;
                           await battler.human(...text.b_opponent_shyren.flirtText1);
                           flirt = true;
                        }
                        break;
                     case 'dance':
                        if (volatile.vars.encourage > 1) {
                           await battler.human(...text.b_opponent_shyren.wave2());
                        } else {
                           await battler.human(...text.b_opponent_shyren.wave1);
                        }
                        break;
                  }
                  break;
               case 'spare': {
                  const bull = battler.bullied.includes(volatile);
                  if (!bull && !volatile.sparable) {
                     break;
                  }
                  bull && (save.data.b.bullied_shyren = true);
                  battler.spare();
               }
               case 'flee':
                  choice.type === 'flee' && events.fire('escape');
                  battler.music?.stop();
                  return;
            }
            if (save.data.n.state_foundry_muffet === 1 && !volatile.vars.trauma) {
               volatile.vars.trauma = true;
               await battler.human(...commonText.b_party_kidd.mkNope);
            }
            const turn =
               save.data.n.state_foundry_muffet === 1 ? void 0 : await kiddTurn('shyren', volatile.vars.encourage < 1);
            if (turn === 'fight') {
               if (await kiddFight(volatile)) {
                  world.kill();
                  battler.g += gold * 80;
                  battler.music?.stop();
                  return;
               }
            }
            if (battler.alive.length > 0) {
               if (idle) {
                  await talk(
                     target,
                     ...[ text.b_opponent_shyren.sadtalk1, text.b_opponent_shyren.sadtalk2 ][battler.rand(2)]
                  );
               } else if (awkward) {
                  await talk(target, ...text.b_opponent_shyren.awkwardtoot);
               } else if (encourage) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_shyren.talk3,
                        text.b_opponent_shyren.talk4,
                        text.b_opponent_shyren.talk5,
                        text.b_opponent_shyren.talk6,
                        text.b_opponent_shyren.talk7
                     ][volatile.vars.encourage as number]
                  );
               } else if (flirt) {
                  await talk(target, ...text.b_opponent_shyren.flirttoot);
               }
               if (status && battler.hurt.includes(volatile)) {
                  status = false;
                  statustext = text.b_opponent_shyren.hurtStatus;
               } else if (encourage) {
                  status = false;
                  statustext = [
                     text.b_opponent_shyren.encourage1(),
                     text.b_opponent_shyren.encourage2(),
                     text.b_opponent_shyren.encourage3(),
                     text.b_opponent_shyren.encourage4()
                  ][volatile.vars.encourage];
               }
               let axend = false;
               if (encourage) {
                  volatile.vars.encourage += 1;
                  if (!volatile.sparable && volatile.vars.encourage > 1) {
                     volatile.sparable = true;
                     save.data.b.spared_shyren = true;
                     battler.g += gold;
                  }
                  if (volatile.vars.encourage > 4) {
                     axend = true;
                  }
               }
               battler.status = CosmosUtils.provide(statustext);
               game.movement = true;
               battler.music!.gain.modulate(timer, 600, battler.music!.gain.value / 10);
               await battler.box.size.modulate(timer, 300, { x: 150, y: 95 / 2 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               if (turn === 'skip') {
                  await timer.pause(450);
               } else {
                  if (!volatile.vars.creep && volatile.vars.encourage > 0) {
                     volatile.vars.singturn = true;
                  }
                  await commonPatterns.shyren();
               }
               volatile.vars.singturn = false;
               battler.music!.gain.modulate(timer, 600, battler.music!.gain.value * 10);
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               if (axend) {
                  battler.spare();
                  battler.music?.stop();
               } else {
                  await battler.resume();
               }
            } else {
               battler.music?.stop();
            }
         };
      })(
         25,
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 180, y: 35 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         { encourage: 0, creep: false },
         () =>
            [
               text.b_opponent_shyren.randStatus1,
               text.b_opponent_shyren.randStatus2,
               text.b_opponent_shyren.randStatus3,
               text.b_opponent_shyren.randStatus4,
               text.b_opponent_shyren.randStatus5
            ][battler.rand(5)]()
      ),
      sprite: () =>
         new CosmosAnimation({
            anchor: { y: 1, x: 0 },
            resources: content.ibcShyrenAgent,
            objects: [
               new CosmosAnimation({
                  anchor: { y: 1 },
                  position: { x: -19.5, y: -45 },
                  resources: content.ibcShyrenBack,
                  metadata: { index: 0 }
               }).on('tick', function () {
                  const vol = battler.volatile[0];
                  if ((vol.vars.encourage || 0) < 1 || vol.vars.creep) {
                     if (this.metadata.index !== 0) {
                        this.metadata.index = 0;
                        this.reset().use(content.ibcShyrenBack);
                     }
                  } else if (vol.vars.singturn) {
                     if (this.metadata.index !== 1) {
                        this.metadata.index = 1;
                        this.enable().use(content.ibcShyrenWave);
                     }
                  } else {
                     if (this.metadata.index !== 2) {
                        this.metadata.index = 2;
                        this.enable().use(content.ibcShyrenFront);
                     }
                  }
               })
            ]
         }).on(
            'tick',
            (() => {
               const time = timer.value;
               const shyPositionY = new CosmosValue();
               const listener = function (this: CosmosAnimation) {
                  if (battler.alive.length < 1) {
                     this.off('tick', listener);
                  } else {
                     this.position.y = shyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 4;
                  }
               };
               return listener;
            })()
         ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1 },
            position: { x: -19.5, y: -45 },
            frames: [ content.ibcShyrenHurt ],
            objects: [
               new CosmosAnimation({
                  anchor: { y: 1, x: 0 },
                  position: { x: 19.5, y: 45 },
                  resources: content.ibcShyrenAgent
               }).on('tick', function () {
                  if (battler.volatile[0].vars.what) {
                     this.index = 1;
                  }
               })
            ]
         })
   }),
   moldsmal: commonOpponents.moldsmal,
   fakemoldsmal: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_moldbygg,
      assets: new CosmosInventory(content.ibcMoldsmal, content.ibbOctagon),
      metadata: { arc: true },
      exp: 3,
      hp: 50,
      df: 0,
      name: text.b_opponent_fakemoldsmal.name,
      acts: () => [
         [ 'check', text.b_opponent_fakemoldsmal.act_check ],
         [ 'imitate', text.b_opponent_fakemoldsmal.act_imitate ],
         [ 'slap', text.b_opponent_fakemoldsmal.act_slap ],
         [ 'flirt', text.b_opponent_fakemoldsmal.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(28, -54),
               battler.bubbles.dummy,
               ...text.b_opponent_fakemoldsmal.smalTalk
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let bygg = false;
         const statustext = [
            text.b_opponent_fakemoldsmal.fakeStatus1(),
            text.b_opponent_fakemoldsmal.fakeStatus2(),
            text.b_opponent_fakemoldsmal.fakeStatus3(),
            text.b_opponent_fakemoldsmal.fakeStatus4()
         ];
         const sparing = battler.sparing(choice);
         switch (choice.type) {
            case 'fight':
               if (await battler.attack(volatile, { power: choice.score })) {
                  world.kill();
                  battler.g += 10;
                  await battler.idle1(target);
                  return;
               } else {
                  bygg = true;
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     bygg = true;
                     volatile.flirted = true;
                     break;
                  case 'imitate':
                     bygg = true;
                     break;
                  case 'slap':
                     bygg = true;
                     break;
               }
               break;
            case 'spare':
               if (!volatile.sparable) {
                  break;
               }
            case 'flee':
               return;
         }
         const turn =
            bygg || !world.monty || save.data.n.state_foundry_muffet === 1 ? void 0 : await kiddTurn('moldsmal');
         if (turn === 'fight') {
            if (await kiddFight(volatile)) {
               world.kill();
               battler.g += 10;
               return;
            } else {
               bygg = true;
            }
         }
         sparing || (await battler.idle1(target));
         if (bygg) {
            volatile.alive = false;
            volatile.container.alpha.value = 0;
            const index = battler.add(opponents.moldbygg, { x: volatile.container.x, y: 180 });
            if (volatile.flirted) {
               battler.volatile[index].flirted = true;
            }
            const newcx = battler.volatile[index].container;
            await Promise.all([
               newcx.position.modulate(timer, 1000, { y: 150 }, { y: 130 }, { y: 120 }),
               battler.monster(
                  false,
                  new CosmosPoint({ x: volatile.container.x, y: 120 }).add(28, -64),
                  battler.bubbles.dummy,
                  ...text.b_opponent_moldbygg.idleTalk1
               )
            ]);
            const turn = !world.monty || save.data.n.state_foundry_muffet === 1 ? void 0 : await kiddTurn('moldsmal');
            if (turn === 'fight') {
               if (await kiddFight(volatile)) {
                  world.kill();
                  battler.g += 10;
                  return;
               }
            }
            battler.status = text.b_opponent_moldbygg.status1();
         } else {
            sparing || (await doIdle());
            battler.status = statustext[Math.floor(random.next() * statustext.length)];
         }
         sparing || (await battler.idle2(target));
      },
      sprite: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] })
   }),
   moldbygg: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_moldbygg,
      assets: new CosmosInventory(),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 45,
      hp: 120,
      df: 8,
      g: 35,
      name: text.b_opponent_moldbygg.name,
      acts: () => [
         [ 'check', text.b_opponent_moldbygg.act_check ],
         [ 'handshake', text.b_opponent_moldbygg.act_handshake ],
         [ 'sit', text.b_opponent_moldbygg.act_sit ],
         [ 'flirt', text.b_opponent_moldbygg.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         vars: { new: true, pacified: false },
         bubble: position => [ new CosmosPoint({ x: position.x, y: 120 }).add(28, -64), battler.bubbles.dummy ],
         act: {
            handshake ({ volatile }) {
               volatile.sparable = false;
               for (const subvolatile of battler.alive) {
                  subvolatile.opponent === opponents.woshua && (subvolatile.vars.slimy = true);
               }
            },
            sit (state) {
               if (!state.vars.pacified) {
                  state.pacify = true;
                  save.data.b.spared_moldbygg = true;
                  state.vars.pacified = true;
               }
            },
            flirt (state) {
               save.data.b.flirt_moldbygg = true;
               state.volatile.flirted = true;
            }
         },
         postchoice (state) {
            return kiddHandler(state, 'moldbygg');
         },
         pretalk (state) {
            if (state.vars.new) {
               state.talk = [];
               state.vars.new = false;
            }
         },
         defaultTalk: [
            text.b_opponent_moldbygg.idleTalk1,
            text.b_opponent_moldbygg.idleTalk2,
            text.b_opponent_moldbygg.idleTalk3,
            text.b_opponent_moldbygg.idleTalk4
         ],
         defaultStatus: () => [
            text.b_opponent_moldbygg.randStatus1(),
            text.b_opponent_moldbygg.randStatus2(),
            text.b_opponent_moldbygg.randStatus3(),
            text.b_opponent_moldbygg.randStatus4()
         ]
      }),
      sprite () {
         const time = timer.value;
         const phase = random.next();
         return new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcMoldbyggHead,
            objects: CosmosUtils.populate(4, index => {
               const phase = random.next();
               return new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcMoldbyggPart ],
                  position: { y: index * -14 }
               }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, -4, 4, phase);
               });
            })
         }).on('tick', function () {
            this.position.x = sineWaver(time, 2500, -3, 3, phase);
         });
      },
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldbyggDefeated ] })
   }),
   woshua: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_woshua,
      assets: new CosmosInventory(
         content.ibcWoshuaBody,
         content.ibcWoshuaDuck,
         content.ibcWoshuaFace,
         content.ibcWoshuaHanger,
         content.ibcWoshuaHead,
         content.ibcWoshuaHurt,
         content.ibcWoshuaTail,
         content.ibcWoshuaWater,
         content.ibuBubbleTiny,
         content.ibbGlitter,
         content.ibbSoap,
         content.ibbWater
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 52,
      hp: 70,
      df: 1,
      g: 25,
      name: text.b_opponent_woshua.name,
      acts: [
         [ 'check', text.b_opponent_woshua.act_check ],
         [
            'clean',
            volatile => (volatile.vars.cleantry ? text.b_opponent_woshua.cleanText2 : text.b_opponent_woshua.cleanText1)
         ],
         [
            'joke',
            () =>
               [ text.b_opponent_woshua.jokeText1, text.b_opponent_woshua.jokeText2, text.b_opponent_woshua.jokeText3 ][
                  battler.rand(3)
               ]
         ],
         [
            'flirt',
            volatile => (volatile.vars.clean ? text.b_opponent_woshua.touchText2 : text.b_opponent_woshua.touchText1)
         ]
      ],
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         bubble: position => [ position.subtract(-25, 60), battler.bubbles.dummy ],
         vars: {
            clean: false,
            cleantry: false,
            dub: 0,
            joker: false,
            tweetSprite: new CosmosSprite({
               frames: [ content.ibuBubbleTiny ],
               scale: 0.5,
               objects: [
                  new CosmosText({
                     fill: 'black',
                     position: { x: 7, y: 3 },
                     stroke: 'transparent',
                     priority: 1,
                     scale: new CosmosPoint(2 * 0.9),
                     spacing: { y: 1.5, x: -2.5 },
                     font: speech.state.font2,
                     content: text.b_opponent_woshua.tweet
                  })
               ]
            })
         },
         act: {
            async flirt (state) {
               if (state.vars.clean) {
                  save.data.b.flirt_woshua = true;
                  state.volatile.flirted = true;
                  state.talk = text.b_opponent_woshua.flirtTalk2;
               } else {
                  state.talk = text.b_opponent_woshua.flirtTalk1;
               }
            },
            async clean (state) {
               state.vars.cleantry = true;
               state.talk = text.b_opponent_woshua.cleanTalk;
            },
            async joke (state) {
               if (state.vars.joker) {
                  state.talk = text.b_opponent_woshua.jokeTalk2;
               } else {
                  state.talk = text.b_opponent_woshua.jokeTalk1;
                  state.vars.joker = true;
               }
            }
         },
         postchoice (state) {
            return kiddHandler(state, 'woshua');
         },
         async pretalk ({ volatile }) {
            volatile.vars.tweetSprite.position.set(volatile.container.position.subtract(30, 79).add(29 / 2, 18 / 2));
            renderer.attach('menu', volatile.vars.tweetSprite);
         },
         defaultTalk ({ volatile }) {
            switch (battler.rand(3) as 0 | 1 | 2) {
               case 0:
                  return [
                     text.b_opponent_woshua.idleTalk1a,
                     text.b_opponent_woshua.idleTalk1b,
                     text.b_opponent_woshua.idleTalk1c,
                     text.b_opponent_woshua.idleTalk1d,
                     text.b_opponent_woshua.idleTalk1e
                  ];
               case 1:
                  return [
                     text.b_opponent_woshua.idleTalk2a,
                     text.b_opponent_woshua.idleTalk2b,
                     text.b_opponent_woshua.idleTalk2c
                  ][Math.min(volatile.vars.dub++, 2)];
               case 2:
                  return text.b_opponent_woshua.idleTalk3();
            }
         },
         async posttalk ({ volatile }) {
            renderer.detach('menu', volatile.vars.tweetSprite);
         },
         async prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = text.b_opponent_woshua.hurtStatus);
         },
         defaultStatus: () =>
            world.azzie
               ? text.b_opponent_woshua.status1()
               : [
                    text.b_opponent_woshua.randStatus1,
                    text.b_opponent_woshua.randStatus2,
                    text.b_opponent_woshua.randStatus3,
                    text.b_opponent_woshua.randStatus4,
                    text.b_opponent_woshua.randStatus5
                 ][battler.rand(5)]()
      }),
      sprite () {
         const time = timer.value;
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcWoshuaHanger ],
            objects: [
               new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { x: -1 }, frames: [ content.ibcWoshuaDuck ] }).on(
                  'tick',
                  function () {
                     this.position.y = sawWaver(time, 4000, -2, 2);
                  }
               ),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaWater ] }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, -2, 2);
                  this.position.y = sineWaver(time, 2500 / 2, -1, 1);
               }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaWater ] }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, 2, -2);
                  this.position.y = sineWaver(time, 2500 / 2, 1, -1);
               }),
               new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.ibcWoshuaTail }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaBody ] }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaHead ] }).on('tick', function () {
                  this.position.y = sawWaver(time, 2250, 1.5, -1.5);
               }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaFace ] }).on('tick', function () {
                  this.position.y = -1 + sawWaver(time, 2250, -1.5, 1.5);
               })
            ]
         });
      },
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaHurt ] })
   }),
   radtile: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_radtile,
      assets: new CosmosInventory(content.ibcRadtile, content.ibcRadtileHurt, content.ibcRadtileTail, content.ibbHat),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 52,
      hp: 98,
      df: 2,
      g: 25,
      name: text.b_opponent_radtile.name,
      acts: () => [
         [ 'check', text.b_opponent_radtile.act_check ],
         [ 'praise', text.b_opponent_radtile.act_praise ],
         [ 'insult', text.b_opponent_radtile.act_insult ],
         [ 'flirt', text.b_opponent_radtile.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         vars: { mood: 0, heckled: false },
         act: {
            praise (state) {
               if (state.vars.mood < 0) {
                  state.talk = [
                     text.b_opponent_radtile.complimentPostInsultTalk1,
                     text.b_opponent_radtile.complimentPostInsultTalk2,
                     text.b_opponent_radtile.complimentPostInsultTalk3
                  ];
                  state.status = world.azzie
                     ? text.b_opponent_radtile.status1
                     : text.b_opponent_radtile.complimentPostInsultStatus;
                  state.vars.mood = 0;
               } else if (state.vars.mood < 1) {
                  state.talk = [
                     text.b_opponent_radtile.complimentTalk1,
                     text.b_opponent_radtile.complimentTalk2,
                     text.b_opponent_radtile.complimentTalk3
                  ];
                  state.status = world.azzie
                     ? text.b_opponent_radtile.status1
                     : text.b_opponent_radtile.complimentStatus;
               } else {
                  state.talk = [
                     text.b_opponent_radtile.realTalk1,
                     text.b_opponent_radtile.realTalk2,
                     text.b_opponent_radtile.realTalk3
                  ];
                  state.status = world.azzie ? text.b_opponent_radtile.status1 : text.b_opponent_radtile.realStatus;
                  state.vars.mood = 2;
                  state.pacify = true;
                  save.data.b.spared_radtile = true;
               }
            },
            insult (state) {
               oops();
               state.vars.heckled = true;
            },
            check (state) {
               if (state.vars.mood < 1) {
                  if (state.vars.mood < 0) {
                     state.talk = text.b_opponent_radtile.checkPostInsultTalk;
                     state.status = world.azzie
                        ? text.b_opponent_radtile.status1
                        : text.b_opponent_radtile.checkPostInsultStatus;
                  } else {
                     state.talk = text.b_opponent_radtile.checkTalk;
                  }
                  state.vars.mood = 1;
               }
            },
            flirt (state) {
               save.data.b.flirt_radtile = true;
               state.volatile.flirted = true;
               state.talk = text.b_opponent_radtile.flirtTalk1;
            }
         },
         defaultTalk (state) {
            if (state.vars.mood < 0) {
               return [
                  text.b_opponent_radtile.insultIdleTalk1,
                  text.b_opponent_radtile.insultIdleTalk2,
                  text.b_opponent_radtile.insultIdleTalk3
               ];
            } else if (state.vars.mood < 2) {
               return [
                  text.b_opponent_radtile.idleTalk1,
                  text.b_opponent_radtile.idleTalk2,
                  text.b_opponent_radtile.idleTalk3,
                  text.b_opponent_radtile.idleTalk4
               ];
            } else {
               return [
                  text.b_opponent_radtile.realTalkY1,
                  text.b_opponent_radtile.realTalkY2,
                  text.b_opponent_radtile.realTalkY3
               ];
            }
         },
         prestatus (state) {
            if (state.hurt || state.vars.heckled) {
               if (state.vars.mood > 1) {
                  state.talk = text.b_opponent_radtile.shockTalk1;
                  state.status = world.azzie ? text.b_opponent_radtile.status1 : text.b_opponent_radtile.shockStatus;
               } else if (state.vars.mood > -1) {
                  state.talk = [
                     text.b_opponent_radtile.insultTalk1,
                     text.b_opponent_radtile.insultTalk2,
                     text.b_opponent_radtile.insultTalk3
                  ];
                  state.status = world.azzie ? text.b_opponent_radtile.status1 : text.b_opponent_radtile.insultStatus;
               }
               state.vars.mood = -1;
               state.vars.heckled = false;
            }
            battler.hurt.includes(state.volatile) && (state.status = text.b_opponent_radtile.hurtStatus);
         },
         postchoice (state) {
            return kiddHandler(state, 'radtile');
         },
         defaultStatus: () =>
            world.azzie
               ? text.b_opponent_radtile.status1()
               : [
                    text.b_opponent_radtile.randStatus1(),
                    text.b_opponent_radtile.randStatus2(),
                    text.b_opponent_radtile.randStatus3(),
                    text.b_opponent_radtile.randStatus4()
                 ],
         bubble: position => [ position.subtract(-25, 73), battler.bubbles.dummy ]
      }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcRadtile,
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  resources: content.ibcRadtileTail
               })
            ]
         }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcRadtileHurt ] })
   }),
   undyne: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_undyne,
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcUndyneHurt,
         content.ibcUndyneHurtPain,
         content.ibcUndyneHurtSad,
         content.ibcUndyneHurtEx,
         content.ibcUndyneArm1,
         content.ibcUndyneArm1Ex,
         content.ibcUndyneArm2,
         content.ibcUndyneArm2Ex,
         content.ibcUndyneBoots,
         content.ibcUndyneBootsEx,
         content.ibcUndyneChestplate,
         content.ibcUndyneChestplateEx,
         content.ibcUndyneHair,
         content.ibcUndyneHairEx,
         content.ibcUndyneHead,
         content.ibcUndyneNeutralFinal,
         content.ibcUndyneSheath,
         content.ibcUndyneSheathEx,
         content.ibcUndyneShocked,
         content.ibcUndyneSmear,
         content.ibcUndyneCage,
         content.ibcUndyneShield,
         content.ibuGreenSOUL,
         content.amUndyneboss,
         content.amUndynegenoStart,
         content.amUndynegeno,
         content.ibcUndyneFatal,
         content.asSuperstrike,
         content.asNode,
         content.ibcUndyneArrow,
         content.ibbArrow,
         content.ibbArrowportal,
         content.asBell,
         content.asBomb,
         content.ibcKiddBody,
         content.avUndyneex,
         content.ibcAsrielAssist,
         content.amEndingexcerptIntro,
         content.amEndingexcerptLoop,
         content.ibbRedspear,
         content.asAppear,
         content.asArrow,
         content.asStab,
         content.asLanding,
         content.ibcUndyneLaugh,
         content.ibcUndyneEyebeam
      ),
      exp: 500,
      hp: 1500 * fixfactor,
      df: 0,
      name: text.b_opponent_undyne.name,
      acts: () => [
         [ 'check', text.b_opponent_undyne.act_check ],
         [ 'talk', [] ],
         [ 'challenge', [] ],
         [ 'plead', [] ]
      ],
      sparable: false,
      metadata: { reactArtifact: true },
      handler: (() => {
         function defaultstatus () {
            return world.genocide
               ? []
               : battler.volatile[0].vars.phase === 5
               ? [
                    text.b_opponent_undyne.deterStatus1,
                    text.b_opponent_undyne.deterStatus2,
                    text.b_opponent_undyne.deterStatus3,
                    text.b_opponent_undyne.deterStatus4,
                    text.b_opponent_undyne.deterStatus5
                 ][battler.rand(5)]
               : save.data.n.state_starton_papyrus === 1
               ? [
                    text.b_opponent_undyne.papStatus1,
                    text.b_opponent_undyne.papStatus2,
                    text.b_opponent_undyne.papStatus3,
                    text.b_opponent_undyne.papStatus4,
                    text.b_opponent_undyne.papStatus5
                 ][battler.rand(5)]
               : battler.volatile[0].hp < opponents.undyne.hp / 4
               ? [
                    text.b_opponent_undyne.lowStatus1,
                    text.b_opponent_undyne.lowStatus2,
                    text.b_opponent_undyne.lowStatus3,
                    text.b_opponent_undyne.lowStatus4,
                    text.b_opponent_undyne.lowStatus5
                 ][battler.rand(5)]
               : [
                    text.b_opponent_undyne.randStatus1,
                    text.b_opponent_undyne.randStatus2,
                    text.b_opponent_undyne.randStatus3,
                    text.b_opponent_undyne.randStatus4,
                    text.b_opponent_undyne.randStatus5,
                    text.b_opponent_undyne.randStatus6,
                    text.b_opponent_undyne.randStatus7,
                    text.b_opponent_undyne.randStatus8,
                    text.b_opponent_undyne.randStatus9,
                    text.b_opponent_undyne.randStatus10
                 ][battler.rand(10)];
         }
         async function talk (...lines: string[]) {
            await battler.monster(false, { x: 385 / 2, y: 35 / 2 }, battler.bubbles.twinkly, ...lines);
         }
         const fishBubblePos = { x: 385 / 2, y: 35 / 2 };
         const random3 = random.clone();
         const sspiker = async (
            t1: number,
            t2: number,
            a1: number,
            a2: number,
            p: (time: number, amp: number) => Promise<boolean>
         ) => {
            while (await p(CosmosMath.remap(random3.next(), t1, t2), CosmosMath.remap(random3.next(), a1, a2))) {
               continue;
            }
         };
         return async (choice, target, volatile) => {
            let hardskip = false;
            let statustext: CosmosProvider<string[]> = defaultstatus;
            volatile.vars.speed ??= save.data.n.undyne_speed || 1;
            if (choice.type === 'item') {
               volatile.vars.aktatk ??= 1;
               volatile.vars.aktdef ??= 1;
               if (choice.item === 'spaghetti') {
                  if (save.data.n.state_starton_papyrus === 1) {
                     await battler.human(...text.b_opponent_undyne.spaghetti2());
                     volatile.vars.aktdef *= 0.75;
                     if (world.genocide) {
                        volatile.vars.aktatk *= 1 / 0.75;
                     }
                  } else {
                     await battler.human(...text.b_opponent_undyne.spaghetti1);
                     volatile.vars.aktatk *= 0.75;
                  }
               } else if (choice.item === 'artifact' && !volatile.vars.artifactcheck) {
                  volatile.vars.artifactcheck = true;
                  await battler.human(...text.b_opponent_undyne.artifact1());
                  volatile.vars.aktatk *= 0.75;
                  if (world.genocide) {
                     volatile.vars.aktdef *= 1 / 0.75;
                  } else {
                     volatile.vars.aktdef *= 0.75;
                  }
               }
            }
            if (world.genocide) {
               volatile.vars.finalLoader ??= content.amUndynegenoFinal.load();
               if (choice.type === 'fight') {
                  if (volatile.vars.azzyAssist === 1) {
                     volatile.vars.preswing = true;
                     await volatile.vars.azzyAssistScene();
                  }
                  let xdamage = 1;
                  if (volatile.vars.azzyAssist === 2) {
                     let curr = 0;
                     let subtimer = timer.value + 1600;
                     let whoops = NaN;
                     const dirs = [ 'up', 'left', 'right', 'down' ] as CosmosDirection[];
                     const random3 = random.clone();
                     const arrows = CosmosUtils.populate(7, index => {
                        const rand = Math.floor(random3.next() * 4);
                        return new CosmosSprite({
                           anchor: 0,
                           frames: [ content.ibcUndyneArrow ],
                           position: { x: (index - 3) * 20 },
                           rotation: [ 270, 180, 0, 90 ][rand],
                           metadata: { dir: dirs[rand] }
                        }).on('tick', function () {
                           if (curr === index) {
                              this.scale.x = 1.25;
                              this.scale.y = 1.25;
                           } else {
                              this.scale.x = 1;
                              this.scale.y = 1;
                           }
                           if (whoops === index) {
                              this.tint = 0xff0000;
                           } else if (curr > index) {
                              this.tint = 0x00ff00;
                           } else {
                              this.tint = 0xffffff;
                           }
                        });
                     });
                     const wrapper = new CosmosObject({
                        alpha: 0,
                        position: { x: 160, y: 60 },
                        objects: [
                           new CosmosRectangle({
                              anchor: { x: 0, y: -0.5 },
                              alpha: 0.9,
                              fill: 'black',
                              size: { x: 320, y: 240 }
                           }),
                           ...arrows
                        ]
                     });
                     renderer.attach('menu', wrapper);
                     await wrapper.alpha.modulate(timer, 150, 1);
                     const listener = function (this: CosmosKeyboardInput) {
                        if (isNaN(whoops) && curr < 7) {
                           if (this === keys[`${arrows[curr].metadata.dir as CosmosDirection}Key`]) {
                              xdamage *= 1.5;
                              const p = assets.sounds.purchase.instance(timer);
                              p.rate.value = 2;
                              p.gain.value *= 0.7;
                              curr++;
                              subtimer += 150;
                           } else {
                              assets.sounds.node.instance(timer).rate.value = 1.5;
                              whoops = curr;
                           }
                        }
                     };
                     for (const dir of dirs) {
                        keys[`${dir}Key`].on('down', listener);
                     }
                     await Promise.race([
                        timer.when(() => timer.value > subtimer),
                        timer.when(() => !isNaN(whoops) || curr === 7)
                     ]);
                     for (const dir of dirs) {
                        keys[`${dir}Key`].off('down', listener);
                     }
                     if (!isNaN(whoops)) {
                        xdamage = 1;
                        await timer.pause(250);
                     } else if (curr === 7) {
                        xdamage = 25;
                        await timer.pause(250);
                     }
                     if (!isNaN(whoops)) {
                        wrapper.position.modulate(timer, 200, wrapper.position.value(), {
                           y: wrapper.position.y + 50
                        });
                     } else {
                        const striker = assets.sounds.superstrike.instance(timer);
                        striker.gain.value = CosmosMath.bezier(curr / 7, 0, 0, 0, 0, assets.sounds.superstrike.gain);
                        if (curr === 7) {
                           wrapper.scale.modulate(timer, 200, { x: 2, y: 2 }, { x: 2, y: 2 }).then(async () => {
                              await timer.pause(100);
                              heal(2);
                           });
                        }
                     }
                     wrapper.alpha.modulate(timer, 200, 0, 0).then(() => {
                        renderer.detach('menu', wrapper);
                     });
                  }
                  const OGmultiplier = battler.attackMultiplier;
                  battler.attackMultiplier *= xdamage / (volatile.vars.aktdef ?? 1);
                  const gannadie = volatile.hp <= battler.calculate(volatile, choice.score);
                  if (gannadie) {
                     const e = battler.music!;
                     battler.music = null;
                     e.stop();
                  }
                  await battler.attack(volatile, { power: choice.score }, true, true);
                  battler.attackMultiplier = OGmultiplier;
                  if (gannadie) {
                     await timer.pause(1000);
                     speech.emoters.undyne.index = 24;
                     volatile.container.attach(
                        new CosmosObject({
                           position: { x: 0.5 },
                           objects: [
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 index: 11,
                                 resources: content.ibcUndyneHead
                              }).on('tick', function () {
                                 this.index = speech.emoters.undyne.index;
                              })
                           ]
                        })
                     );
                     const basepos1 = volatile.container.objects[0].position.value();
                     const basepos2 = volatile.container.objects[1].position.value();
                     volatile.container.container.filterArea = renderer.area!;
                     const filter1 = new PixelateFilter(1);
                     const filter2 = new RGBSplitFilter([ 0, 0 ], [ 0, 0 ], [ 0, 0 ]);
                     const filter3 = new ZoomBlurFilter({
                        strength: 0,
                        radius: 500,
                        innerRadius: 0,
                        center: [ 320, 120 ]
                     });
                     const f1v = new CosmosValue();
                     const f2v = new CosmosValue();
                     const f3v = new CosmosValue();
                     const intensity = new CosmosValue(0.001);
                     const ramp = new CosmosValue();
                     const tickah = () => {
                        filter1.size = f1v.value * intensity.value;
                        filter2.red = [ -f2v.value * intensity.value, 0 ];
                        filter2.blue = [ f2v.value * intensity.value, 0 ];
                        filter3.strength = f3v.value;
                        const rando = new CosmosPoint(
                           (Math.random() * 2 - 1) * ramp.value,
                           (Math.random() * 2 - 1) * ramp.value
                        );
                        volatile.container.objects[0].position.set(rando.add(basepos1));
                        volatile.container.objects[1].position.set(rando.add(basepos2));
                     };
                     let dying = true;
                     sspiker(450, 1250, 2, 4, async (t, a) => {
                        await f1v.modulate(timer, t, a * 2 - 1, 1);
                        return dying;
                     });
                     sspiker(450, 1250, 2, 4, async (t, a) => {
                        await f2v.modulate(timer, t, a * 2 - 1, 1);
                        return dying;
                     });
                     const iv1 = 0.25;
                     const iv2 = 1;
                     const iv3 = 2.5;
                     volatile.container.container.filters = [ filter1, filter2, filter3 ];
                     volatile.container.on('tick', tickah);
                     ramp.modulate(timer, 1000, 1);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.genoDeath1
                     );
                     intensity.modulate(timer, 5000, 0, iv1, iv1);
                     await Promise.all([ volatile.vars.finalLoader, timer.pause(450) ]);
                     const t = timer.value;
                     assets.music.undynegenoFinal.instance(timer);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.genoDeath2
                     );
                     intensity.modulate(timer, 5000, iv1, iv2, iv2);
                     await timer.pause(1450);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.genoDeath3
                     );
                     intensity.modulate(timer, 5000, iv2, iv3, iv3);
                     await timer.pause(1150);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.genoDeath4
                     );
                     const trueTime = (26 + 2 / 3) * 1000 - (timer.value - t);
                     f3v.modulate(timer, trueTime - 300, 0, 0.7, 0.7, 0.7);
                     intensity.modulate(timer, trueTime, iv3, iv3, 10);
                     await timer.pause(trueTime - 300);
                     await volatile.container.alpha.modulate(timer, 300, 1, 0);
                     await timer.pause(4000);
                     dying = false;
                     renderer.detach('menu', volatile.vars.armholder);
                     events.fire('victory');
                     return;
                  }
               } else if (choice.type === 'act') {
                  switch (choice.act) {
                     case 'talk':
                        await battler.human(...text.b_opponent_undyne.talkText22);
                        break;
                     case 'plead':
                        await battler.human(...text.b_opponent_undyne.pleadText4);
                        break;
                     case 'challenge':
                        await battler.human(...text.b_opponent_undyne.challengeText1);
                        break;
                  }
               }
            } else {
               let mercy = false;
               volatile.vars.hardmode ??= volatile.vars.hardmode;
               volatile.vars.attackRunoff ??= save.data.n.undyne_attackRunoff;
               volatile.vars.phase ??= [ 0, 2, 3, 4, 4 ][save.data.n.undyne_phase];
               volatile.vars.turns ??= 0;
               volatile.vars.mercyStreak ??= 0;
               volatile.vars.neutralFinalHits ??= 0;
               if (choice.type === 'fight') {
                  volatile.vars.attackRunoff += 3;
                  let earlytick = true;
                  const basepos1 = volatile.container.objects[0].position.value();
                  const basepos2 = { x: 0.5, y: 0 };
                  const hploss = battler.calculate(volatile, choice.score) / (volatile.vars.aktdef ?? 1);
                  const gannadie = volatile.hp <= hploss;
                  if (gannadie && volatile.vars.phase < 5) {
                     battler.music?.stop();
                     speech.emoters.undyne.index = 11;
                     volatile.container.attach(
                        new CosmosObject({
                           position: basepos2,
                           objects: [
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 index: 11,
                                 resources: content.ibcUndyneHead
                              }).on('tick', function () {
                                 this.index = speech.emoters.undyne.index;
                              })
                           ]
                        }).on('tick', function () {
                           if (earlytick) {
                              this.position = volatile.container.objects[0].position.subtract(basepos1).add(basepos2);
                           }
                        })
                     );
                  }
                  const prev = volatile.container.objects[0];
                  await battler.attack(volatile, { operation: 'add', power: -hploss }, true, true);
                  earlytick = false;
                  if (gannadie) {
                     if (volatile.vars.phase < 5) {
                        const c = volatile.vars.c as CosmosValue;
                        c.modulate(timer, 2000, c.value, 0.1, 0.1);
                        await timer.pause(1000);
                        battler.flee = false;
                        save.data.n.state_foundry_undyne = 2;
                        const fancygrid = volatile.vars.fancygrid as CosmosObject;
                        fancygrid.metadata.cutscene = true;
                        fancygrid.alpha.modulate(timer, 3000, 0);
                        await volatile.vars.wt(
                           false,
                           fishBubblePos,
                           battler.bubbles.twinkly,
                           ...text.b_opponent_undyne.death1
                        );
                        await c.modulate(timer, 2500, 0.6, 0.8);
                        await timer.pause(3000);
                        c.modulate(timer, 2500, 0.3, 0.1);
                        await volatile.vars.wt(
                           false,
                           fishBubblePos,
                           battler.bubbles.twinkly,
                           ...text.b_opponent_undyne.death2
                        );
                        await timer.pause(1000);
                        volatile.container.objects = [ prev ];
                        battler.music = (() => {
                           const inst = assets.music.endingexcerptIntro.instance(timer);
                           inst.source.addEventListener('ended', () => {
                              if (battler.music) {
                                 const newinst = assets.music.endingexcerptLoop.instance(timer);
                                 newinst.rate.value = battler.music?.rate.value ?? 1;
                                 battler.music = newinst;
                              }
                           });
                           return inst;
                        })();
                        await talk(...text.b_opponent_undyne.death3());
                        battler.SOUL.metadata.color = 'red';
                        await battler.box.size.modulate(timer, 300, { x: 36, y: 36 });
                        await battler.box.position.modulate(timer, 150, { y: 120 });
                        battler.SOUL.alpha.value = 1;
                        battler.SOUL.position.set(battler.box.position);
                        game.movement = true;
                        volatile.vars.idealcolor = 'green';
                        volatile.vars.armswing = true;
                        await timer.when(() => volatile.vars.armswing === false);
                        await timer.pause(850);
                        await talk(...text.b_opponent_undyne.death4);
                        game.movement = false;
                        battler.SOUL.alpha.value = 0;
                        await battler.box.position.modulate(timer, 150, { y: 160 });
                        await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
                        volatile.vars.phase = 5;
                        volatile.vars.turns = 0;
                        battler.status = text.b_opponent_undyne.neutralFinalStatus;
                        volatile.alive = true;
                        battler.exp = 0;
                        battler.resume();
                        volatile.container.container.filterArea = new Rectangle(0, 0, 640, 240);
                        volatile.vars.k = new CosmosValue(1);
                        let oldtime = (volatile.vars.sb = timer.value);
                        volatile.container.on('tick', () => {
                           const delta = timer.value - oldtime;
                           volatile.vars.sb += delta * volatile.vars.k.value;
                           oldtime += delta;
                        });
                        opponents.undyne.dramatic = false;
                        return;
                     } else {
                        volatile.container.objects[0] = prev;
                        volatile.alive = true;
                        battler.exp = 0;
                     }
                  }
               } else {
                  if (choice.type === 'act') {
                     switch (choice.act) {
                        case 'talk': {
                           if (volatile.vars.phase === 5) {
                              await battler.human(...text.b_opponent_undyne.talkText21);
                           } else {
                              volatile.vars.talkTurns ??= 0;
                              await battler.human(
                                 ...text.b_opponent_undyne.talkText,
                                 ...[
                                    text.b_opponent_undyne.talkText1,
                                    text.b_opponent_undyne.talkText2,
                                    text.b_opponent_undyne.talkText3,
                                    text.b_opponent_undyne.talkText4,
                                    text.b_opponent_undyne.talkText5,
                                    text.b_opponent_undyne.talkText6,
                                    text.b_opponent_undyne.talkText7,
                                    text.b_opponent_undyne.talkText8,
                                    text.b_opponent_undyne.talkText9,
                                    text.b_opponent_undyne.talkText10,
                                    text.b_opponent_undyne.talkText11,
                                    text.b_opponent_undyne.talkText12,
                                    text.b_opponent_undyne.talkText13,
                                    text.b_opponent_undyne.talkText14,
                                    text.b_opponent_undyne.talkText15,
                                    text.b_opponent_undyne.talkText16,
                                    text.b_opponent_undyne.talkText17,
                                    text.b_opponent_undyne.talkText18,
                                    text.b_opponent_undyne.talkText19,
                                    text.b_opponent_undyne.talkText20
                                 ][Math.min(volatile.vars.talkTurns++, 19)]
                              );
                           }
                           break;
                        }
                        case 'plead': {
                           if (volatile.vars.phase === 5) {
                              await battler.human(...text.b_opponent_undyne.pleadText6);
                           } else if (volatile.vars.hardmode) {
                              await battler.human(...text.b_opponent_undyne.pleadText5);
                           } else if (
                              volatile.vars.speed < 1.6 &&
                              0.9 <= volatile.vars.speed &&
                              random.compute() < 0.15
                           ) {
                              await battler.human(...text.b_opponent_undyne.pleadText2);
                              volatile.vars.speed *= 0.8;
                              if (volatile.vars.speed < 0.9) {
                                 volatile.vars.speed = 0.9;
                              }
                           } else if (volatile.vars.attackRunoff < 2) {
                              await battler.human(...text.b_opponent_undyne.pleadText1);
                           } else {
                              await battler.human(...text.b_opponent_undyne.pleadText3);
                           }
                           break;
                        }
                        case 'challenge': {
                           if (volatile.vars.phase === 0 && volatile.vars.turns === 0) {
                              await battler.human(...text.b_opponent_undyne.challengeText4);
                              await talk(...text.b_opponent_undyne.earlyChallenge());
                              volatile.vars.phase = 1;
                              volatile.vars.turns = 1;
                              volatile.vars.speed = 2;
                              volatile.vars.hardmode = true;
                              statustext = text.b_opponent_undyne.earlyChallengeStatus;
                              hardskip = true;
                           } else if (volatile.vars.phase > 3) {
                              await battler.human(...text.b_opponent_undyne.challengeText1);
                           } else if (volatile.vars.speed < 1.6) {
                              volatile.vars.speed *= 1.1;
                              if (volatile.vars.speed < 1.6) {
                                 await battler.human(...text.b_opponent_undyne.challengeText2);
                              } else {
                                 if (volatile.vars.hardmode) {
                                    await battler.human(...text.b_opponent_undyne.challengeText3);
                                 } else {
                                    await battler.human(...text.b_opponent_undyne.challengeText6);
                                 }
                                 volatile.vars.speed = 2;
                              }
                           } else {
                              await battler.human(...text.b_opponent_undyne.challengeText5);
                           }
                           break;
                        }
                     }
                  }
                  volatile.vars.attackRunoff > 0 && volatile.vars.attackRunoff--;
               }
               if (choice.type === 'fake' || choice.type === 'spare') {
                  mercy = true;
                  volatile.vars.mercyStreak++;
               } else {
                  volatile.vars.mercyStreak = 0;
               }
               if (choice.type === 'flee') {
                  save.data.n.undyne_speed = volatile.vars.speed;
                  save.data.b.undyne_hardmode = volatile.vars.hardmode === true;
                  save.data.n.undyne_hp = volatile.hp;
                  renderer.detach('menu', volatile.vars.armholder);
                  events.fire('escape');
                  battler.music?.stop();
                  battler.music = null;
                  if (save.data.n.undyne_phase < 4) {
                     save.data.n.undyne_phase++;
                  }
                  return;
               }
               if (!hardskip) {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...CosmosUtils.provide(
                        [
                           [
                              text.b_opponent_undyne.tutorial1,
                              text.b_opponent_undyne.tutorial2,
                              text.b_opponent_undyne.tutorial3,
                              text.b_opponent_undyne.tutorial4,
                              text.b_opponent_undyne.tutorial5
                           ],
                           [
                              text.b_opponent_undyne.turnTalkA1,
                              text.b_opponent_undyne.turnTalkA2,
                              text.b_opponent_undyne.turnTalkA3,
                              text.b_opponent_undyne.turnTalkA4,
                              text.b_opponent_undyne.turnTalkA5,
                              [ text.b_opponent_undyne.turnTalkA6a, text.b_opponent_undyne.turnTalkA6b ][mercy ? 1 : 0],
                              [ text.b_opponent_undyne.turnTalkA7a, text.b_opponent_undyne.turnTalkA7b ][
                                 volatile.vars.mercyStreak > 1 ? 1 : 0
                              ]
                           ],
                           [
                              text.b_opponent_undyne.turnTalkB1,
                              text.b_opponent_undyne.turnTalkB2,
                              text.b_opponent_undyne.turnTalkB3,
                              text.b_opponent_undyne.turnTalkB4,
                              text.b_opponent_undyne.turnTalkB5,
                              text.b_opponent_undyne.turnTalkB6,
                              [ text.b_opponent_undyne.turnTalkB7a, text.b_opponent_undyne.turnTalkB7b ][
                                 volatile.vars.mercyStreak > 1 ? 1 : 0
                              ],
                              [ text.b_opponent_undyne.turnTalkB8a, text.b_opponent_undyne.turnTalkB8b ][
                                 volatile.vars.mercyStreak > 1 ? 1 : 0
                              ]
                           ],
                           [
                              text.b_opponent_undyne.turnTalkC1,
                              text.b_opponent_undyne.turnTalkC2,
                              text.b_opponent_undyne.turnTalkC3,
                              text.b_opponent_undyne.turnTalkC4,
                              text.b_opponent_undyne.turnTalkC5,
                              text.b_opponent_undyne.turnTalkC6,
                              text.b_opponent_undyne.turnTalkC7,
                              text.b_opponent_undyne.turnTalkC8,
                              [ text.b_opponent_undyne.turnTalkC9a, text.b_opponent_undyne.turnTalkC9b ][
                                 volatile.vars.mercyStreak > 1 ? 1 : 0
                              ],
                              [ text.b_opponent_undyne.turnTalkC10a, text.b_opponent_undyne.turnTalkC10b ][
                                 volatile.vars.mercyStreak > 1 ? 1 : 0
                              ]
                           ],
                           [ text.b_opponent_undyne.turnTalkD ],
                           [
                              text.b_opponent_undyne.determination1,
                              text.b_opponent_undyne.determination2,
                              text.b_opponent_undyne.determination3,
                              text.b_opponent_undyne.determination4,
                              text.b_opponent_undyne.determination5,
                              text.b_opponent_undyne.determination6,
                              text.b_opponent_undyne.determination7,
                              []
                           ]
                        ][volatile.vars.phase][volatile.vars.turns]
                     )
                  );
               }
            }
            volatile.vars.preswing || (battler.status = CosmosUtils.provide(statustext));
            let swing = false;
            const truePhase = volatile.vars.phase;
            const trueTurns = volatile.vars.turns;
            if (!world.genocide) {
               if (volatile.vars.phase < 4) {
                  if (volatile.vars.turns === [ -1, 4, 5, 7 ][volatile.vars.phase]) {
                     swing = true;
                     volatile.vars.idealcolor = 'red';
                  }
                  if (
                     volatile.vars.turns++ ===
                     [ save.data.n.state_starton_papyrus === 1 ? 0 : 4, 6, 7, 9 ][volatile.vars.phase]
                  ) {
                     if (volatile.vars.phase > 0) {
                        if (volatile.vars.phase < 3) {
                           swing = true;
                           volatile.vars.idealcolor = 'green';
                        }
                     } else {
                        volatile.vars.trolled = true;
                        volatile.vars.speed = 1.46;
                        volatile.vars.hardmode = true;
                     }
                     volatile.vars.turns = 0;
                     switch (volatile.vars.phase++) {
                        case 1:
                           volatile.vars.turns = 1;
                           break;
                        case 2:
                           save.data.n.state_starton_papyrus === 1 && (volatile.vars.turns = 1);
                           break;
                     }
                     if (save.data.n.undyne_phase < 4) {
                        save.data.n.undyne_phase++;
                     }
                  }
               } else if (volatile.vars.phase === 5) {
                  ++volatile.vars.turns > 7 && (volatile.vars.turns = 7);
               }
            }
            if (battler.alive.length > 0) {
               game.movement = true;
               if (world.genocide) {
                  volatile.vars.lerp ??= 0;
                  const lerp = ++volatile.vars.lerp as number;
                  if (battler.SOUL.metadata.color === 'red') {
                     if (lerp === 2) {
                        swing = true;
                        volatile.vars.idealcolor = 'green';
                        volatile.vars.lerp = 0;
                     }
                  } else {
                     if (lerp > 6 || (lerp > 4 && random.compute() < 0.5)) {
                        swing = true;
                        volatile.vars.idealcolor = 'red';
                        volatile.vars.lerp = 0;
                     }
                  }
               }
               if (truePhase < 5 || volatile.vars.neutralFinalHits < 7) {
                  await patterns.undyne(truePhase, trueTurns, swing, opponents.undyne.hp);
               }
               if (volatile.vars.preswing) {
                  volatile.vars.preswing = false;
               } else if (world.genocide) {
                  switch (volatile.vars.azzyAssist) {
                     case 0:
                     case 1:
                        volatile.vars.shockTurns ??= 0;
                        battler.status = CosmosUtils.provide(
                           [
                              text.b_opponent_undyne.genoStatus2,
                              text.b_opponent_undyne.genoStatus3,
                              text.b_opponent_undyne.genoStatus4,
                              text.b_opponent_undyne.genoStatus5
                           ][Math.min(volatile.vars.shockTurns++, 3)]
                        );
                        if (volatile.vars.shockTurns === 3) {
                           volatile.vars.azzyAssist = 1;
                        }
                        break;
                     case 2:
                        if (volatile.hp < 1200) {
                           battler.status = text.b_opponent_undyne.trueGenoStatusLow2;
                        } else if (volatile.hp < 2400) {
                           battler.status = text.b_opponent_undyne.trueGenoStatusLow1;
                        } else {
                           battler.status = [
                              text.b_opponent_undyne.trueGenoStatus1,
                              text.b_opponent_undyne.trueGenoStatus2,
                              text.b_opponent_undyne.trueGenoStatus3,
                              text.b_opponent_undyne.trueGenoStatus4,
                              text.b_opponent_undyne.trueGenoStatus5,
                              text.b_opponent_undyne.trueGenoStatus6,
                              text.b_opponent_undyne.trueGenoStatus7,
                              text.b_opponent_undyne.trueGenoStatus8
                           ][battler.rand(8)];
                        }
                        break;
                  }
               } else if (volatile.vars.phase === 5) {
                  const kv = volatile.vars.k.value;
                  volatile.vars.k.modulate(timer, 500, kv, kv * 0.85, kv * 0.85);
                  const cv = volatile.vars.c.value;
                  volatile.vars.c.modulate(timer, 1000, cv, cv + 0.3 / 9, cv + 0.3 / 9);
                  if (++volatile.vars.neutralFinalHits === 8) {
                     await timer.pause(1000);
                     const e = battler.music!;
                     battler.music = null;
                     e.stop();
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death5
                     );
                     const c = volatile.vars.c as CosmosValue;
                     c.modulate(timer, 1000, c.value, 0.5, 0.5);
                     await timer.pause(450);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death6
                     );
                     c.modulate(timer, 1500, c.value, 0.6, 0.6).then(() => c.modulate(timer, 1500, c.value, 1, 1));
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death7
                     );
                     await timer.pause(2000);
                     const neutralFinal = new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        frames: [ content.ibcUndyneNeutralFinal ]
                     });
                     volatile.container.objects = [ neutralFinal ];
                     c.modulate(timer, 2000, c.value, -0.1);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death8a
                     );
                     await timer.pause(500);
                     const filter1 = new PixelateFilter(1);
                     const filter2 = new RGBSplitFilter([ 0, 0 ], [ 0, 0 ], [ 0, 0 ]);
                     const filter3 = new ZoomBlurFilter({
                        strength: 0,
                        radius: 500,
                        innerRadius: 0,
                        center: [ 320, 120 ]
                     });
                     const f1v = new CosmosValue();
                     const f2v = new CosmosValue();
                     const f3v = new CosmosValue();
                     const intensity = new CosmosValue(0.001);
                     const ramp = new CosmosValue();
                     const basepos1 = volatile.container.objects[0].position.value();
                     const tickahNF = () => {
                        filter1.size = f1v.value * intensity.value;
                        filter2.red = [ -f2v.value * intensity.value, 0 ];
                        filter2.blue = [ f2v.value * intensity.value, 0 ];
                        filter3.strength = f3v.value;
                        volatile.container.objects[0].position.set(
                           new CosmosPoint(
                              (Math.random() * 2 - 1) * ramp.value,
                              (Math.random() * 2 - 1) * ramp.value
                           ).add(basepos1)
                        );
                     };
                     let dying = true;
                     sspiker(450, 1250, 2, 4, async (t, a) => {
                        await f1v.modulate(timer, t, a * 2 - 1, 1);
                        return dying;
                     });
                     sspiker(450, 1250, 2, 4, async (t, a) => {
                        await f2v.modulate(timer, t, a * 2 - 1, 1);
                        return dying;
                     });
                     const iv1 = 0.25;
                     const iv2 = 1;
                     const iv3 = 2.5;
                     volatile.container.container.filters = [ filter1, filter2, filter3 ];
                     volatile.container.on('tick', tickahNF);
                     ramp.modulate(timer, 400, 1);
                     await intensity.modulate(timer, 2000, 0, iv1, iv1);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death8b
                     );
                     await intensity.modulate(timer, 2000, iv1, iv2, iv2);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death8c
                     );
                     await intensity.modulate(timer, 2000, iv2, iv3, iv3);
                     await volatile.vars.wt(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...text.b_opponent_undyne.death9
                     );
                     const trueTime = 3000;
                     f3v.modulate(timer, trueTime - 300, 0, 0.7, 0.7, 0.7);
                     intensity.modulate(timer, trueTime, iv3, iv3, 10);
                     await timer.pause(trueTime - 300);
                     await volatile.container.alpha.modulate(timer, 300, 1, 0);
                     await timer.pause(2000);
                     dying = false;
                     renderer.detach('menu', volatile.vars.armholder);
                     battler.exp += 500;
                     events.fire('victory');
                     save.data.n.plot = 48;
                     save.flag.n.genocide_milestone = Math.max(2, save.flag.n.genocide_milestone) as 2;
                     renderer.detach('main', phish);
                     return;
                  }
               }
               game.movement = false;
               await battler.resume();
            } else {
               battler.music!.stop();
            }
         };
      })(),
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { base: timer.value },
            frames: [ world.genocide ? content.ibcUndyneBootsEx : content.ibcUndyneBoots ],
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'hair' },
                  resources: world.genocide ? content.ibcUndyneHairEx : content.ibcUndyneHair,
                  objects: [
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: 0.5,
                        resources: content.ibcUndyneHead,
                        metadata: { part: 'head', savedIndex: void 0 as number | void },
                        objects: world.genocide
                           ? [
                                new CosmosSprite({
                                   active: true,
                                   anchor: { x: -1, y: 0 },
                                   position: { x: 5.5, y: -102 },
                                   frames: [ content.ibcUndyneEyebeam ]
                                }).on('tick', function () {
                                   if (battler.volatile[0].vars.CRAZYHEAD) {
                                      this.alpha.value = 0;
                                   } else {
                                      this.rotation.value = sineWaver(
                                         (this.metadata.rottime ??= timer.value),
                                         2500,
                                         -30,
                                         30
                                      );
                                      const ftr = 1600;
                                      const flashtime = ((this.metadata.flashtime ??= 0) % ftr) / ftr;
                                      this.alpha.value = Math.max(CosmosMath.bezier(flashtime, 1, -0.6), 0);
                                      this.scale.x = CosmosMath.remap(flashtime, 1, 2);
                                      this.metadata.flashtime += 100 / 3;
                                   }
                                })
                             ]
                           : []
                     }).on('tick', function () {
                        const vola = battler.volatile[0];
                        switch (vola.vars.CRAZYHEAD) {
                           case 1:
                              if (this.resources === content.ibcUndyneHead) {
                                 this.metadata.savedIndex = this.index;
                                 this.use(content.ibcUndyneLaugh);
                                 this.active = true;
                              }
                              this.position.y = Math.max(this.position.y - 1, -2);
                              break;
                           case 2:
                              if (this.resources === content.ibcUndyneLaugh) {
                                 this.use(content.ibcUndyneHead);
                                 this.active = false;
                                 this.index = this.metadata.savedIndex!;
                              }
                              this.position.y = Math.min(this.position.y + 1, 2);
                              break;
                           case 3:
                              this.position.y = Math.max(this.position.y - 1, 0);
                              break;
                        }
                     })
                  ]
               }),
               new CosmosObject({
                  position: { y: 1 },
                  metadata: { part: 'chestplate' },
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        metadata: { part: 'arm1' },
                        frames: [ world.genocide ? content.ibcUndyneArm1Ex : content.ibcUndyneArm1 ]
                     }),
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { x: 2 },
                        metadata: { part: 'arm2' },
                        frames: [ world.genocide ? content.ibcUndyneArm2Ex : content.ibcUndyneArm2 ]
                     }).on('tick', function () {
                        if (battler.volatile[0].vars.armswing) {
                           this.alpha.value = 0;
                        } else {
                           this.alpha.value = 1;
                        }
                     }),
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        frames: [ world.genocide ? content.ibcUndyneChestplateEx : content.ibcUndyneChestplate ]
                     })
                  ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { y: 1 },
                  metadata: { part: 'sheath' },
                  frames: [ world.genocide ? content.ibcUndyneSheathEx : content.ibcUndyneSheath ]
               })
            ]
         }).on('tick', function () {
            const vola = battler.volatile[0];
            if (!vola.vars.freeze) {
               const diff = (vola.vars.sb || timer.value) - this.metadata.base;
               const phase = (diff % 1000) / 1000;
               const siner = CosmosMath.wave(phase);
               CosmosUtils.chain(this.objects, (objects, next) => {
                  for (const sprite of objects as CosmosSprite[]) {
                     next(sprite.objects);
                     switch (sprite.metadata.part) {
                        case 'sheath':
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 2.5;
                           break;
                        case 'chestplate':
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 3;
                           break;
                        case 'hair':
                           sprite.position.y =
                              ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 3.5 + 0.25;
                           break;
                        case 'arm1':
                           sprite.position.x =
                              ((sprite.metadata.baseX ??= sprite.position.x) as number) -
                              CosmosMath.wave((diff % 500) / 500);
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 2;
                           break;
                        case 'arm2':
                           sprite.position.x = ((sprite.metadata.baseX ??= sprite.position.x) as number) - siner * 2;
                           break;
                     }
                  }
               });
            }
         }),
      goodbye: () =>
         battler.volatile[0].vars.genostrike
            ? new CosmosAnimation({
                 anchor: { x: 0, y: 1 },
                 metadata: { size: { y: 40 } },
                 resources: content.ibcUndyneFatal
              })
            : new CosmosSprite({
                 anchor: { x: 0, y: 1 },
                 metadata: { size: { y: 40 } },
                 frames: [
                    battler.volatile[0].vars.undying
                       ? content.ibcUndyneHurtEx
                       : battler.volatile[0].vars.phase === 5
                       ? content.ibcUndyneHurtPain
                       : save.data.n.state_starton_papyrus === 1
                       ? content.ibcUndyneHurtSad
                       : content.ibcUndyneHurt
                 ]
              })
   }),
   dateundyne: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_undyne,
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcUndyneHair,
         content.ibcUndyneHead,
         content.amUndyneboss,
         content.ibcUndyneDateArm,
         content.ibcUndyneDateLegs,
         content.ibcUndyneDate,
         content.ibcUndyneDateSpear,
         content.ibcUndyneDateTorso,
         content.asCymbal
      ),
      exp: 0,
      hp: 300,
      df: 0,
      name: text.b_opponent_dateundyne.name,
      acts: () => [
         [ 'check', text.b_opponent_dateundyne.act_check ],
         [ 'flirt', [] ]
      ],
      sparable: false,
      metadata: { reactArtifact: true },
      async handler (choice, target, volatile) {
         let idle = true;
         let endPart = false;
         let fought = false;
         async function talk (...lines: string[]) {
            await battler.monster(false, { x: 185, y: 32.5 }, battler.bubbles.twinkly, ...lines);
         }
         switch (choice.type) {
            case 'fight':
               await volatile.vars.fightPromise;
               volatile.vars.sb = timer.value;
               speech.emoters.undyne.index = 16;
               await battler.attack(volatile, { power: -Math.floor(save.data.n.bully / 5), operation: 'add' });
               await timer.pause(1600);
               await talk(...text.b_opponent_dateundyne.fightTalk);
               await timer.pause(1400);
               endPart = true;
               fought = true;
               break;
            case 'item':
               if (choice.item === 'snack') {
                  idle = false;
                  await talk(...text.b_opponent_dateundyne.snacker);
                  battler.status = text.b_opponent_dateundyne.status1;
               } else if (choice.item === 'artifact') {
                  idle = false;
                  await talk(...text.b_opponent_dateundyne.artichoke);
                  battler.status = text.b_opponent_dateundyne.status1;
               }
               break;
            case 'act':
               if (choice.act === 'flirt') {
                  const flirtValue = (volatile.vars.flirts ??= 0);
                  if (save.data.b.oops) {
                     await battler.human(...text.b_opponent_dateundyne.flirtText0);
                     if (flirtValue === 0) {
                        await talk(...text.b_opponent_dateundyne.flirtTalk0);
                        battler.status = text.b_opponent_dateundyne.flirtStatus0;
                        idle = false;
                     }
                  } else {
                     await battler.human(
                        ...[
                           text.b_opponent_dateundyne.flirtText1,
                           text.b_opponent_dateundyne.flirtText2,
                           text.b_opponent_dateundyne.flirtText3
                        ][flirtValue]
                     );
                     await talk(
                        ...[
                           text.b_opponent_dateundyne.flirtTalk1,
                           text.b_opponent_dateundyne.flirtTalk2,
                           text.b_opponent_dateundyne.flirtTalk3
                        ][flirtValue]
                     );
                     if (flirtValue === 2) {
                        volatile.vars.sb = timer.value;
                        battler.music!.stop();
                        await timer.pause(1800);
                        endPart = true;
                     } else if (flirtValue === 1) {
                        battler.status = text.b_opponent_dateundyne.flirtStatus2;
                     } else {
                        battler.status = text.b_opponent_dateundyne.flirtStatus1;
                     }
                     idle = false;
                  }
                  volatile.vars.flirts++;
               }
               break;
         }
         if (endPart) {
            await talk(...text.b_opponent_dateundyne.cutscene1);
            speech.emoters.undyne.index = 11;
            battler.volatile[0].vars.endPart = true;
            await timer.pause(1500);
            volatile.container.objects[0] = new CosmosSprite({
               objects: [
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.ibcUndyneDate ]
                  }),
                  new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     metadata: { part: 'hair' },
                     position: { y: 16 },
                     resources: content.ibcUndyneHair,
                     objects: [
                        (speech.emoters.undyne = new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           index: 11,
                           resources: content.ibcUndyneHead,
                           metadata: { part: 'head' }
                        }))
                     ]
                  })
               ]
            });
            await timer.pause(1000);
            await talk(
               ...text.b_opponent_dateundyne.cutscene2a,
               ...[ text.b_opponent_dateundyne.cutscene2b1, text.b_opponent_dateundyne.cutscene2b2 ][fought ? 1 : 0],
               ...text.b_opponent_dateundyne.cutscene2c
            );
            events.fire('exit');
         } else {
            if (idle) {
               await talk(
                  ...[
                     text.b_opponent_dateundyne.idleTalk1,
                     text.b_opponent_dateundyne.idleTalk2,
                     text.b_opponent_dateundyne.idleTalk3,
                     text.b_opponent_dateundyne.idleTalk4
                  ][battler.rand(4)]
               );
               battler.status = text.b_opponent_dateundyne.status1;
            }
            await battler.resume(async () => {
               await battler.box.size.modulate(timer, 300, { x: 100, y: 65 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               await timer.pause(450);
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         }
      },
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { size: { y: 100 }, base: timer.value },
            objects: [
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'legs' },
                  frames: [ content.ibcUndyneDateLegs ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'torso' },
                  frames: [ content.ibcUndyneDateTorso ]
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'arm1' },
                  resources: content.ibcUndyneDateArm
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'arm2' },
                  scale: { x: -1 },
                  resources: content.ibcUndyneDateArm
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'spear' },
                  resources: content.ibcUndyneDateSpear
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'hair' },
                  position: { y: 27 },
                  resources: content.ibcUndyneHair,
                  objects: [
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: content.ibcUndyneHead,
                        metadata: { part: 'head' }
                     })
                  ]
               })
            ]
         }).on('tick', function () {
            const diff = (battler.volatile[0].vars.sb || timer.value) - this.metadata.base;
            const phase = (diff % 1000) / 1000;
            const siner = CosmosMath.wave(phase);
            const endPart = battler.volatile[0].vars.endPart;
            CosmosUtils.chain(this.objects, (objects, next) => {
               for (const sprite of objects as CosmosSprite[]) {
                  next(sprite.objects);
                  switch (sprite.metadata.part) {
                     case 'hair':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           CosmosMath.remap(siner, 0, 54 - 54 * 0.88);
                        break;
                     case 'legs':
                        sprite.scale.y = CosmosMath.remap(siner, 1, 0.9);
                        break;
                     case 'torso':
                        sprite.scale.y = CosmosMath.remap(siner, 1, 0.9);
                        break;
                     case 'arm1':
                        if (endPart) {
                           sprite.index = 1;
                        } else {
                           sprite.position.y = CosmosMath.remap(siner, 3, 54 - 54 * 0.85);
                        }
                        break;
                     case 'arm2':
                        if (endPart) {
                           sprite.index = 1;
                        } else {
                           sprite.position.y = CosmosMath.remap(siner, 3, 54 - 54 * 0.85);
                        }
                        break;
                     case 'spear':
                        if (endPart) {
                           sprite.index = 1;
                           if (!sprite.metadata.initfall) {
                              sprite.metadata.initfall = true;
                              sprite.alpha.modulate(timer, 1000, 0);
                              sprite.position.modulate(timer, 1000, sprite.position.add(0, 20));
                              sprite.rotation.modulate(timer, 1000, sprite.rotation.value + 15);
                           }
                        } else if (!battler.volatile[0].vars.sb) {
                           sprite.position.y = CosmosMath.remap(siner, 0, 54 - 54 * 0.9);
                           sprite.rotation.value = sineWaver(this.metadata.base, 1200, -2, 2);
                        }
                        break;
                  }
               }
            });
         })
   })
};

export default opponents;

CosmosUtils.status(`LOAD MODULE: FOUNDRY OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
