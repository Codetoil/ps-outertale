import { GlitchFilter } from 'pixi-filters';
import assets from '../assets';
import { OutertaleOpponent } from '../classes';
import content, { inventories } from '../content';
import { events, random, renderer, speech, timer } from '../core';
import { CosmosInventory } from '../engine/core';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosValue } from '../engine/numerics';
import { CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import { battler, choicer, oops, shake, world } from '../mantle';
import save from '../save';
import { faces } from './bootstrap';
import patterns from './patterns';
import text from './text';

const opponents = {
   stardrake: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_stardrake && !save.data.b.s_state_chilldrake,
      assets: new CosmosInventory(
         content.ibcStardrakeChilldrakeHurt,
         content.ibcStardrakeChilldrake,
         content.ibcStardrakeHead,
         content.ibcStardrakeBody,
         content.ibcStardrakeLegs,
         content.ibcStardrakeLegsOver,
         content.ibcStardrakeHurt,
         content.ibbMoon,
         content.asMonsterHurt4
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 22,
      hp: 74,
      df: 2,
      name: text.b_opponent_stardrake.name,
      acts: () => [
         [ 'check', text.b_opponent_stardrake.act_check ],
         [ 'joke', [] ],
         [ save.data.b.s_state_chilldrake ? 'agree' : 'laugh', [] ],
         [ save.data.b.s_state_chilldrake ? 'telloff' : 'heckle', [] ],
         [ 'flirt', text.b_opponent_stardrake.act_flirt ]
      ],
      hurt: assets.sounds.monsterHurt4,
      sparable: false,
      handler: ((
         gold: number,
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: CosmosProvider<string[]>
      ) => {
         return async (choice, target, volatile) => {
            let idle = true;
            async function doIdle () {
               if (volatile.vars.heckled) {
                  statustext = text.b_opponent_stardrake.heckleStatus;
                  await talk(
                     target,
                     ...[
                        text.b_opponent_stardrake.heckleTalk1,
                        text.b_opponent_stardrake.heckleTalk2,
                        text.b_opponent_stardrake.heckleTalk3
                     ][battler.rand(3)]()
                  );
                  volatile.vars.heckledTurns ??= 0;
                  if (++volatile.vars.heckledTurns === 3) {
                     volatile.vars.heckled = false;
                  }
               } else if (idle) {
                  volatile.vars.joke = true;
                  await talk(
                     target,
                     ...[
                        text.b_opponent_stardrake.idleTalk1,
                        text.b_opponent_stardrake.idleTalk2,
                        text.b_opponent_stardrake.idleTalk3,
                        text.b_opponent_stardrake.idleTalk4,
                        text.b_opponent_stardrake.idleTalk5,
                        text.b_opponent_stardrake.idleTalk6,
                        text.b_opponent_stardrake.idleTalk7
                     ][battler.rand(7)]()
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let done = false;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            const sparing = battler.sparing(choice);
            choice.type === 'fight' || sparing || (await battler.idle1(target));
            switch (choice.type) {
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     battler.g += gold * 2;
                     save.data.b.s_state_chilldrake = true;
                     return;
                  }
                  await battler.idle1(target);
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'joke':
                        idle = false;
                        await battler.human(...text.b_opponent_stardrake.punText1);
                        await talk(
                           target,
                           ...[
                              text.b_opponent_stardrake.punTalk1,
                              text.b_opponent_stardrake.punTalk2,
                              text.b_opponent_stardrake.punTalk3
                           ][battler.rand(3)]()
                        );
                        break;
                     case 'laugh':
                     case 'agree':
                        idle = false;
                        if (!volatile.vars.joke || volatile.vars.heckled) {
                           await battler.human(...text.b_opponent_stardrake.jokeText1());
                           await talk(target, ...text.b_opponent_stardrake.jokeTalk1());
                        } else {
                           if (!volatile.sparable) {
                              volatile.sparable = true;
                              if (!volatile.vars.hadSpared) {
                                 battler.g += gold;
                                 volatile.vars.hadSpared = true;
                                 save.data.b.spared_stardrake = true;
                              }
                           }
                           statustext = text.b_opponent_stardrake.jokeStatus;
                           if (volatile.vars.laughed) {
                              await battler.human(...text.b_opponent_stardrake.jokeText3());
                           } else {
                              volatile.vars.laughed = true;
                              await battler.human(...text.b_opponent_stardrake.jokeText2());
                           }
                           if (!volatile.vars.daddyissues) {
                              volatile.vars.daddyissues = true;
                              await talk(target, ...text.b_opponent_stardrake.jokeTalk2());
                           } else {
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_stardrake.jokeTalk2,
                                    text.b_opponent_stardrake.jokeTalk3,
                                    text.b_opponent_stardrake.jokeTalk4
                                 ][battler.rand(3)]()
                              );
                           }
                        }
                        break;
                     case 'heckle':
                     case 'telloff':
                        if (!save.data.b.oops) {
                           oops();
                           await timer.pause(1000);
                        }
                        volatile.sparable = false;
                        volatile.vars.heckled = true;
                        idle = false;
                        volatile.vars.heckledTurns = 0;
                        switch (Math.floor(random.next() * 6)) {
                           case 0:
                              if (!volatile.sparable) {
                                 volatile.sparable = true;
                                 battler.g += gold;
                              }
                              await battler.human(...text.b_opponent_stardrake.heckleText3());
                              battler.spare();
                              done = true;
                              break;
                           case 1:
                           case 2:
                              await battler.human(...text.b_opponent_stardrake.heckleText2());
                              break;
                           default:
                              await battler.human(...text.b_opponent_stardrake.heckleText1());
                        }
                        break;
                     case 'flirt':
                        idle = false;
                        if (!volatile.vars.heckled && !save.data.b.s_state_chilldrake) {
                           save.data.b.flirt_stardrake = true;
                           volatile.flirted = true;
                           await talk(target, ...text.b_opponent_stardrake.flirtTalk1);
                        }
                        break;
                  }
                  break;
               case 'spare':
                  if (battler.bullied.includes(volatile)) {
                     save.data.b.s_state_chilldrake = true;
                     return;
                  } else if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (!done) {
               sparing || (await doIdle());
            }
            if (battler.hurt.includes(volatile)) {
               statustext = text.b_opponent_stardrake.hurtStatus;
            }
            battler.status = CosmosUtils.provide(statustext);
            sparing || (await battler.idle2(target));
         };
      })(
         18,
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 180, y: 35 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         { joke: false, heckled: false, daddyissues: false },
         () =>
            world.azzie
               ? text.b_opponent_stardrake.genoStatus()
               : [
                    text.b_opponent_stardrake.randStatus1,
                    text.b_opponent_stardrake.randStatus2,
                    text.b_opponent_stardrake.randStatus3,
                    text.b_opponent_stardrake.randStatus4,
                    text.b_opponent_stardrake.randStatus5
                 ][battler.rand(5)]()
      ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ save.data.b.s_state_chilldrake ? content.ibcStardrakeChilldrakeHurt : content.ibcStardrakeHurt ]
         }),
      sprite: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcStardrakeLegs ],
            objects: [
               new CosmosSprite({
                  anchor: { y: 1, x: 0 },
                  frames: [ content.ibcStardrakeBody ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1, x: 0 },
                        resources: content.ibcStardrakeHead
                     }).on_legacy('tick', self => {
                        const time = timer.value;
                        if (save.data.b.s_state_chilldrake) {
                           self.attach(
                              new CosmosSprite({
                                 anchor: { y: 1, x: 0 },
                                 frames: [ content.ibcStardrakeChilldrake ]
                              })
                           );
                        }
                        return () => {
                           self.position.y =
                              CosmosMath.bezier(
                                 CosmosMath.wave(((timer.value - time) % 2500) / 2500),
                                 0,
                                 0.1,
                                 0.4,
                                 0.75,
                                 1
                              ) * 3;
                        };
                     })
                  ]
               }).on_legacy('tick', self => {
                  const time = timer.value;
                  return () => {
                     self.position.y =
                        CosmosMath.bezier(CosmosMath.wave(((timer.value - time) % 2500) / 2500), 0, 0.1, 0.4, 0.75, 1) *
                        3;
                  };
               }),
               new CosmosSprite({
                  anchor: { y: 1, x: 0 },
                  frames: [ content.ibcStardrakeLegsOver ]
               })
            ]
         })
   }),
   jerry: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_jerry,
      assets: new CosmosInventory(content.ibcJerry, content.ibcJerryHurt),
      metadata: { arc: true },
      exp: 1,
      hp: 80,
      df: 8,
      name: text.b_opponent_jerry.name,
      acts: () => [
         [ 'check', text.b_opponent_jerry.act_check ],
         [ 'ditch', [] ],
         [ 'flirt', text.b_opponent_jerry.act_flirt ]
      ],
      sparable: false,
      handler: ((
         gold: number,
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: CosmosProvider<string[]>
      ) => {
         return async (choice, target, volatile) => {
            async function doIdle () {
               if (battler.alive.length > 1) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_jerry.idleTalk1,
                        text.b_opponent_jerry.idleTalk2,
                        text.b_opponent_jerry.idleTalk3,
                        text.b_opponent_jerry.idleTalk4
                     ][battler.rand(4)]()
                  );
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_jerry.idleTalkSolo1,
                        text.b_opponent_jerry.idleTalkSolo2,
                        text.b_opponent_jerry.idleTalkSolo3,
                        text.b_opponent_jerry.idleTalkSolo4
                     ][battler.rand(4)]()
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            const sparing = battler.sparing(choice);
            choice.type === 'fight' || sparing || (await battler.idle1(target));
            switch (choice.type) {
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     battler.g += gold * 2;
                     return;
                  }
                  await battler.idle1(target);
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt':
                        if (!volatile.sparable && (!save.data.b.oops || world.flirt > 5)) {
                           save.data.b.flirt_jerry = true;
                           volatile.flirted = true;
                           volatile.sparable = true;
                           idle = false;
                           save.data.b.spared_jerry = true;
                           await talk(target, ...text.b_opponent_jerry.flirtTalk);
                           statustext = text.b_opponent_jerry.flirtStatus;
                           battler.g += gold;
                        }
                        break;
                     case 'ditch':
                        if (!save.data.b.oops) {
                           oops();
                           await timer.pause(1000);
                        }
                        await battler.human(...text.b_opponent_jerry.ditchText1);
                        if (battler.alive.length > 1) {
                           await battler.human(...text.b_opponent_jerry.ditchText1x());
                        }
                        volatile.sparable = true;
                        battler.spare(target);
                        return;
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (idle) {
               sparing || (await doIdle());
            }
            if (battler.hurt.includes(volatile)) {
               statustext = text.b_opponent_jerry.hurtStatus;
            }
            battler.status = CosmosUtils.provide(statustext);
            sparing || (await battler.idle2(target));
         };
      })(
         55,
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 165, y: 60 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         {},
         () =>
            world.azzie
               ? text.b_opponent_jerry.genoStatus
               : [
                    text.b_opponent_jerry.randStatus1,
                    text.b_opponent_jerry.randStatus2,
                    text.b_opponent_jerry.randStatus3,
                    text.b_opponent_jerry.randStatus4
                 ][battler.rand(4)]()
      ),
      sprite: () => new CosmosAnimation({ active: true, anchor: { y: 1, x: 0 }, resources: content.ibcJerry }),
      goodbye: () => new CosmosSprite({ anchor: { y: 1, x: 0 }, frames: [ content.ibcJerryHurt ] })
   }),
   mouse: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_mouse,
      assets: new CosmosInventory(
         content.ibcMouse,
         content.ibcMouseBody,
         content.ibcMouseHurt,
         content.ibbMouse,
         content.asBomb
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 35,
      hp: 114,
      df: 3,
      name: text.b_opponent_mouse.name,
      acts: () => [
         [ 'check', text.b_opponent_mouse.act_check ],
         [ 'disown', text.b_opponent_mouse.act_disown ],
         [ 'direct', text.b_opponent_mouse.act_direct ],
         [ 'flirt', text.b_opponent_mouse.act_flirt ]
      ],
      sparable: false,
      handler: ((
         gold: number,
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: CosmosProvider<string[]>
      ) => {
         return async (choice, target, volatile) => {
            async function doIdle () {
               if (volatile.sparable) {
                  await talk(
                     target,
                     ...[ text.b_opponent_mouse.safeTalk1, text.b_opponent_mouse.safeTalk2 ][battler.rand(2)]
                  );
                  statustext = text.b_opponent_mouse.safeStatus;
               } else if (volatile.vars.disown > 0) {
                  await talk(
                     target,
                     ...[ text.b_opponent_mouse.disownTalk1, text.b_opponent_mouse.disownTalk2 ][battler.rand(2)]
                  );
                  statustext = text.b_opponent_mouse.disownStatus;
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_mouse.idleTalk1,
                        text.b_opponent_mouse.idleTalk2,
                        text.b_opponent_mouse.idleTalk3,
                        text.b_opponent_mouse.idleTalk4
                     ][battler.rand(4)]
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
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
                     world.kill();
                     battler.g += gold * 2;
                     return;
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt':
                        idle = false;
                        save.data.b.flirt_mouse = true;
                        volatile.flirted = true;
                        await talk(target, ...text.b_opponent_mouse.flirtTalk);
                        break;
                     case 'direct':
                        if (volatile.vars.disown > 0) {
                           await battler.human(...text.b_opponent_mouse.distrusted());
                           volatile.vars.disown = 0;
                        } else {
                           if (volatile.vars.remind++ === 1) {
                              if (!volatile.sparable && volatile.hp === volatile.opponent.hp) {
                                 save.data.b.spared_mouse = true;
                                 volatile.sparable = true;
                                 battler.g += gold;
                              }
                           } else {
                              idle = false;
                              await talk(
                                 target,
                                 ...[ text.b_opponent_mouse.remindTalk1, text.b_opponent_mouse.remindTalk2 ][
                                    battler.rand(2)
                                 ]
                              );
                              statustext = text.b_opponent_mouse.remindStatus;
                           }
                        }
                        break;
                     case 'disown':
                        if (!save.data.b.oops) {
                           oops();
                           await timer.pause(1000);
                        }
                        if (volatile.sparable) {
                           await battler.human(...text.b_opponent_mouse.disowned);
                           if (!volatile.sparable && volatile.hp === volatile.opponent.hp) {
                              volatile.sparable = true;
                              battler.g += gold;
                           }
                           battler.spare(target);
                        } else {
                           volatile.vars.remind = 0;
                           if (volatile.vars.disown++ === 1) {
                              await battler.human(...text.b_opponent_mouse.disowned);
                              if (!volatile.sparable && volatile.hp === volatile.opponent.hp) {
                                 volatile.sparable = true;
                                 battler.g += gold;
                              }
                              battler.spare(target);
                              return;
                           } else {
                              idle = false;
                              await talk(
                                 target,
                                 ...[ text.b_opponent_mouse.disownTalk1, text.b_opponent_mouse.disownTalk2 ][
                                    battler.rand(2)
                                 ]
                              );
                              statustext = text.b_opponent_mouse.disownStatus;
                           }
                        }
                        return;
                  }
                  break;
               case 'spare':
                  if (battler.bullied.includes(volatile)) {
                     return;
                  } else if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (idle) {
               await doIdle();
            }
            if (battler.hurt.includes(volatile)) {
               statustext = text.b_opponent_mouse.hurtStatus;
            }
            battler.status = CosmosUtils.provide(statustext);
         };
      })(
         30,
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 130, y: 120 }).subtract({ x: 165, y: 60 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         {
            disown: 0,
            safe: 0,
            remind: 0
         },
         () =>
            world.azzie
               ? text.b_opponent_mouse.genoStatus
               : [
                    text.b_opponent_mouse.randStatus1,
                    text.b_opponent_mouse.randStatus2,
                    text.b_opponent_mouse.randStatus3,
                    text.b_opponent_mouse.randStatus4
                 ][battler.rand(4)]
      ),
      sprite: () => {
         const random3 = random.clone();
         return new CosmosAnimation({
            anchor: { y: 1, x: 0 },
            resources: content.ibcMouse,
            objects: [
               new CosmosSprite({
                  anchor: { y: 1, x: 0 },
                  frames: [ content.ibcMouseBody ]
               })
            ]
         }).on_legacy('tick', self => () => {
            if (self.index === 0 && random3.next() < 1 / 30 / 5) {
               self.index = 1;
               timer.pause(100).then(() => {
                  self.index = 0;
               });
            }
         });
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcMouseHurt ]
         })
   }),
   doggo: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_doggo,
      assets: new CosmosInventory(
         content.ibcDoggoArms,
         content.ibcDoggoBody,
         content.ibcDoggoBodyHurt,
         content.ibcDoggoHead,
         content.ibcDoggoHeadWan,
         content.ibbSword,
         content.asWhimper,
         content.ibbMoon
      ),
      exp: 30,
      hp: 70,
      df: 1,
      hurt: assets.sounds.whimper,
      name: text.b_opponent_doggo.name,
      acts: () => [
         [ 'check', text.b_opponent_doggo.act_check ],
         [ 'talk', text.b_opponent_doggo.act_talk ],
         [ 'flirt', text.b_opponent_doggo.act_flirt ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         volatile.vars.invisible || (volatile.vars.invisible = false);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as string[][];
         volatile.vars.pet || (volatile.vars.pet = 0);
         if (volatile.vars.invisiblePrev !== volatile.vars.invisible) {
            volatile.vars.talk = 0;
            volatile.vars.invisiblePrev = volatile.vars.invisible;
         }
         let overrideStatus = false;
         let stick = false;
         let tempWan = false;
         switch (choice.type) {
            case 'fight':
               volatile.vars.wan = false;
               const invis = volatile.vars.invisible;
               volatile.vars.invisible = false;
               if (
                  await battler.attack(volatile, invis ? { power: 0, operation: 'multiply' } : { power: choice.score })
               ) {
                  world.kill();
                  battler.g += 40;
                  save.data.n.state_starton_doggo = 2;
                  battler.music?.stop();
                  return;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  humantext = text.b_opponent_doggo.fetch();
                  monstertext = [ text.b_opponent_doggo.fetchTalk ];
                  if (!volatile.vars.sparedOnce) {
                     volatile.vars.sparedOnce = true;
                     battler.g += 20;
                     save.data.n.state_starton_doggo = 1;
                  }
                  volatile.sparable = true;
                  statustext = [ text.b_opponent_doggo.fetchStatus() ];
                  overrideStatus = true;
                  stick = true;
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'pet':
                     if (volatile.vars.invisible) {
                        const petValue = Math.min(volatile.vars.pet++, 13);
                        if (!volatile.vars.sparedOnce) {
                           volatile.vars.sparedOnce = true;
                           battler.g += 20;
                           save.data.n.state_starton_doggo = 0;
                        }
                        volatile.sparable = true;
                        humantext = text.b_opponent_doggo.pet();
                        monstertext = [
                           [
                              text.b_opponent_doggo.petTalk1,
                              text.b_opponent_doggo.petTalk2,
                              text.b_opponent_doggo.petTalk3,
                              text.b_opponent_doggo.petTalk4,
                              text.b_opponent_doggo.petTalk5,
                              text.b_opponent_doggo.petTalk6,
                              text.b_opponent_doggo.petTalk7,
                              text.b_opponent_doggo.petTalk8,
                              text.b_opponent_doggo.petTalk9,
                              text.b_opponent_doggo.petTalk10,
                              text.b_opponent_doggo.petTalk11,
                              text.b_opponent_doggo.petTalk12,
                              text.b_opponent_doggo.petTalk13,
                              text.b_opponent_doggo.petTalk14
                           ][petValue]
                        ];
                        volatile.vars.wan = petValue < 9 || petValue > 10;
                        statustext = [ text.b_opponent_doggo.petStatus() ];
                        overrideStatus = true;
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
                     }
                     break;
                  case 'talk':
                     const talkValue = Math.min(volatile.vars.talk++, 2);
                     if (volatile.vars.invisible) {
                        tempWan = !volatile.vars.wan;
                        volatile.vars.wan = true;
                        monstertext = [
                           [ text.b_opponent_doggo.talk1, text.b_opponent_doggo.talk2, text.b_opponent_doggo.talk3 ][
                              talkValue
                           ]
                        ];
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
                     }
                     break;
                  case 'flirt':
                     if (volatile.vars.invisible) {
                        tempWan = !volatile.vars.wan;
                        volatile.vars.wan = true;
                        save.data.b.flirt_doggo = true;
                        volatile.flirted = true;
                        monstertext = [ text.b_opponent_doggo.flirt1 ];
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
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
               return;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (monstertext.length === 0) {
            if (!volatile.vars.queried) {
               monstertext = [ text.b_opponent_doggo.query1 ];
               volatile.vars.queried = true;
            } else {
               monstertext = [ text.b_opponent_doggo.query3 ];
            }
         }
         await battler.monster(
            false,
            volatile.container.position.add(34, -95),
            battler.bubbles.napstablook,
            ...monstertext[Math.floor(random.next() * monstertext.length)]
         );
         if (tempWan) {
            volatile.vars.wan = false;
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await battler.box.size.modulate(timer, 300, { x: 150, y: 95 / 2 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               volatile.vars.invisible = true;
               if (volatile.vars.sparedOnce) {
                  volatile.sparable = true;
               }
               if (stick) {
                  await timer.pause(300);
               } else {
                  let reactionPromise = void 0 as Promise<void> | void;
                  const listener = () => {
                     events.off('hurt', listener);
                     volatile.vars.wan = false;
                     volatile.vars.invisible = false;
                     volatile.sparable = false;
                     overrideStatus = false;
                     reactionPromise = battler.monster(
                        true,
                        volatile.container.position.add(34, -95),
                        battler.bubbles.napstablook,
                        ...text.b_opponent_doggo.query2
                     );
                  };
                  events.on('hurt', listener);
                  if (random.next() < 1 / 200) {
                     await patterns.stardrake();
                  } else {
                     await patterns.doggo();
                  }
                  events.off('hurt', listener);
                  await reactionPromise;
               }
               if (!overrideStatus) {
                  if (volatile.vars.invisible) {
                     statustext = [ text.b_opponent_doggo.invisStatus() ];
                  } else {
                     statustext = [ text.b_opponent_doggo.normaStatus() ];
                  }
               }
               battler.status = statustext[Math.floor(random.next() * statustext.length)];
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { size: { y: 95 } },
            objects: [
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { y: -34 + 3 },
                  frames: [ content.ibcDoggoArms ]
               }).on_legacy('tick', self => {
                  let up = true;
                  return () => {
                     if (up) {
                        if ((self.position.y -= 0.1) < -35.5 + 3) {
                           up = false;
                        }
                     } else if ((self.position.y += 0.1) > -32.5 + 3) {
                        up = true;
                     }
                  };
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcDoggoBody ]
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { y: -62 },
                  resources: content.ibcDoggoHead
               }).on_legacy('tick', self => {
                  let wan = false;
                  return () => {
                     if (battler.volatile[0].vars.wan !== wan) {
                        self.use((wan = !wan) ? content.ibcDoggoHeadWan : content.ibcDoggoHead);
                     }
                  };
               })
            ]
         }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcDoggoBodyHurt ]
         })
   }),
   lesserdog: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_lesserdog,
      assets: new CosmosInventory(
         content.ibcLesserBody,
         content.ibcLesserHead,
         content.ibcLesserTail,
         content.ibcLesserHurt,
         content.ibcLesserHurtHead,
         content.ibbSword,
         content.asWhimper
      ),
      bullyable: true,
      bully: () => world.bully(),
      exp: 18,
      hp: 60,
      df: 0,
      hurt: assets.sounds.whimper,
      name: text.b_opponent_lesserdog.name,
      acts: () => [
         [ 'check', text.b_opponent_lesserdog.act_check ],
         [ 'talk', [] ],
         [ 'flirt', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as string[][];
         let overridable = true;
         let dontSetTextPlsThx = false;
         let stick = false;
         volatile.vars.mercymod || (volatile.vars.mercymod = 0);
         switch (choice.type) {
            case 'fight':
               volatile.vars.hurt2 = true;
               const ded = volatile.vars.mercymod > 0 || volatile.hp <= battler.calculate(volatile, choice.score);
               const punch = battler.attack(
                  volatile,
                  volatile.vars.mercymod > 0 ? { power: 0, operation: 'multiply' } : { power: choice.score },
                  true,
                  true
               );
               await timer.when(() => (volatile.vars.mercymod = Math.max(volatile.vars.mercymod - 15, 0)) === 0);
               if (ded) {
                  volatile.vars.hurt1 = true;
               }
               if (await punch) {
                  await renderer.on('tick');
                  await battler.vaporize(volatile.container.objects[0]);
                  battler.g += 30;
                  save.data.n.state_starton_lesserdog = 2;
                  events.fire('victory');
                  battler.music?.stop();
                  return;
               } else {
                  volatile.vars.hurt2 = false;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  stick = true;
                  humantext = text.b_opponent_lesserdog.fetch();
                  monstertext = [ text.b_opponent_lesserdog.fetchTalk ];
                  dontSetTextPlsThx = true;
                  if (!volatile.sparable) {
                     battler.g += 15;
                     save.data.n.state_starton_lesserdog = 1;
                  }
                  if (volatile.vars.mercymod < 50) {
                     volatile.vars.mercymod = 50;
                  }
                  volatile.sparable = true;
               }
               break;
            case 'act':
               if (choice.act !== 'check') {
                  if (volatile.vars.mercymod > 2740) {
                     humantext = text.b_opponent_lesserdog.petText20();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2690) {
                     humantext = text.b_opponent_lesserdog.petText19();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2240) {
                     humantext = text.b_opponent_lesserdog.petText18();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2190) {
                     humantext = text.b_opponent_lesserdog.petText17();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 1640) {
                     humantext = text.b_opponent_lesserdog.petText16();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 890) {
                     humantext = text.b_opponent_lesserdog.petText15();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 640) {
                     humantext = text.b_opponent_lesserdog.petText14();
                  } else if (volatile.vars.mercymod > 590) {
                     humantext = text.b_opponent_lesserdog.petText13();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 540) {
                     humantext = text.b_opponent_lesserdog.petText12();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 490) {
                     humantext = text.b_opponent_lesserdog.petText11();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 440) {
                     humantext = text.b_opponent_lesserdog.petText10();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 390) {
                     humantext = text.b_opponent_lesserdog.petText9();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 340) {
                     humantext = text.b_opponent_lesserdog.petText8();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 290) {
                     humantext = text.b_opponent_lesserdog.petText7();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 240) {
                     humantext = text.b_opponent_lesserdog.petText6();
                  } else if (volatile.vars.mercymod > 190) {
                     humantext = text.b_opponent_lesserdog.petText5();
                  } else if (volatile.vars.mercymod > 140) {
                     humantext = text.b_opponent_lesserdog.petText4();
                     if (!volatile.sparable) {
                        battler.g += 15;
                        save.data.n.state_starton_doggo = 0;
                     }
                     volatile.sparable = true;
                  } else if (volatile.vars.mercymod > 90) {
                     humantext = text.b_opponent_lesserdog.petText3();
                  } else if (volatile.vars.mercymod > 40) {
                     humantext = text.b_opponent_lesserdog.petText2();
                  } else {
                     humantext = text.b_opponent_lesserdog.petText1();
                  }
                  if (overridable && choice.act !== 'pet') {
                     if (choice.act === 'flirt') {
                        humantext = text.b_opponent_lesserdog.act_flirt();
                     } else {
                        humantext = text.b_opponent_lesserdog.act_talk();
                     }
                  }
                  volatile.vars.mercymod += 50;
               }
               if (choice.act === 'flirt') {
                  save.data.b.flirt_lesserdog = true;
                  volatile.flirted = true;
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  save.data.n.state_starton_lesserdog = 3;
               } else if (!volatile.sparable) {
                  break;
               }
               battler.spare();
               volatile.vars.hurt2 = true;
               volatile.container.objects[0].reset();
               (volatile.container.objects[0].objects[2] as CosmosSprite).reset();
               battler.music?.stop();
               return;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (!dontSetTextPlsThx) {
            if (volatile.vars.mercymod > 690) {
               monstertext = [ text.b_opponent_lesserdog.petTalk1 ];
            } else if (volatile.vars.mercymod > 640) {
               monstertext = [ text.b_opponent_lesserdog.petTalk12 ];
            } else if (volatile.vars.mercymod > 590) {
               monstertext = [ text.b_opponent_lesserdog.petTalk10 ];
            } else if (volatile.vars.mercymod > 540) {
               monstertext = [ text.b_opponent_lesserdog.petTalk11 ];
            } else if (volatile.vars.mercymod > 490) {
               monstertext = [ text.b_opponent_lesserdog.petTalk10 ];
            } else if (volatile.vars.mercymod > 440) {
               monstertext = [ text.b_opponent_lesserdog.petTalk9 ];
            } else if (volatile.vars.mercymod > 390) {
               monstertext = [ text.b_opponent_lesserdog.petTalk8 ];
            } else if (volatile.vars.mercymod > 340) {
               monstertext = [ text.b_opponent_lesserdog.petTalk7 ];
            } else if (volatile.vars.mercymod > 190) {
               monstertext = [ text.b_opponent_lesserdog.petTalk6 ];
            } else if (volatile.vars.mercymod > 90) {
               monstertext = [ text.b_opponent_lesserdog.petTalk5 ];
            } else {
               monstertext = [
                  text.b_opponent_lesserdog.petTalk1,
                  text.b_opponent_lesserdog.petTalk2,
                  text.b_opponent_lesserdog.petTalk3,
                  text.b_opponent_lesserdog.petTalk4
               ];
            }
         }
         await battler.monster(
            false,
            { x: 60, y: 35 },
            battler.bubbles.napstablook2,
            ...monstertext[Math.floor(random.next() * monstertext.length)]
         );
         if (volatile.sparable && world.genocide) {
            statustext = [ text.b_opponent_lesserdog.statusX ];
         } else if (battler.hurt.includes(volatile)) {
            statustext = [ text.b_opponent_lesserdog.hurtStatus() ];
         } else if (volatile.vars.mercymod > 2690) {
            statustext = [ text.b_opponent_lesserdog.status13() ];
         } else if (volatile.vars.mercymod > 2340) {
            statustext = [ text.b_opponent_lesserdog.status12() ];
         } else if (volatile.vars.mercymod > 2190) {
            statustext = [ text.b_opponent_lesserdog.status11() ];
         } else if (volatile.vars.mercymod > 1740) {
            statustext = [ text.b_opponent_lesserdog.status10() ];
         } else if (volatile.vars.mercymod > 1640) {
            statustext = [ text.b_opponent_lesserdog.status9() ];
         } else if (volatile.vars.mercymod > 740) {
            statustext = [ text.b_opponent_lesserdog.status8() ];
         } else if (volatile.vars.mercymod > 440) {
            statustext = [ text.b_opponent_lesserdog.status7() ];
         } else if (volatile.vars.mercymod > 240) {
            statustext = [ text.b_opponent_lesserdog.status6() ];
         } else if (volatile.vars.mercymod > 40) {
            statustext = [ text.b_opponent_lesserdog.status5() ];
         } else {
            statustext = [
               text.b_opponent_lesserdog.status1(),
               text.b_opponent_lesserdog.status2(),
               text.b_opponent_lesserdog.status3(),
               text.b_opponent_lesserdog.status4()
            ];
         }
         if (battler.alive.length > 0) {
            if (volatile.vars.mercymod > 290) {
               await battler.resume();
            } else {
               await battler.resume(async () => {
                  await battler.box.size.modulate(timer, 300, { x: 240, y: 65 });
                  battler.SOUL.position.set(80, 160);
                  battler.SOUL.alpha.value = 1;
                  if (stick) {
                     await timer.pause(300);
                  } else {
                     await patterns.lesserdog();
                  }
                  battler.status = statustext[Math.floor(random.next() * statustext.length)];
                  await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               });
            }
         } else {
            battler.music?.stop();
         }
      },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            extrapolate: false,
            anchor: { y: 1 },
            resources: content.ibcLesserTail,
            objects: [
               new CosmosRectangle({
                  anchor: { y: 1 },
                  position: { x: 23, y: -50 },
                  size: { x: 18 },
                  fill: '#fff',
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1 },
                        position: { x: -1, y: -5 },
                        resources: content.ibcLesserHead
                     }).on_legacy('tick', self => {
                        let hurt = false;
                        return () => {
                           if (battler.volatile[0].vars.hurt2 !== hurt) {
                              self.use((hurt = !hurt) ? content.ibcLesserHurtHead : content.ibcLesserHead);
                           }
                        };
                     })
                  ]
               }).on('tick', function () {
                  const mercymod = battler.volatile[0].vars.mercymod || 0;
                  this.size.y = mercymod / 8 + 5;
                  this.objects[0].position.y = mercymod / -8 - 5;
               }),
               new CosmosRectangle({
                  position: { x: 61, y: -120 },
                  size: { x: 18 },
                  fill: '#fff',
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1, x: 1 },
                        position: { x: -1, y: -5 },
                        rotation: 180,
                        resources: content.ibcLesserHead
                     }).on_legacy('tick', self => {
                        let hurt = false;
                        return () => {
                           if (battler.volatile[0].vars.hurt2 !== hurt) {
                              self.use((hurt = !hurt) ? content.ibcLesserHurtHead : content.ibcLesserHead);
                           }
                        };
                     })
                  ]
               }).on('tick', function () {
                  const mercymod = (battler.volatile[0].vars.mercymod || 0) - 520;
                  this.size.y = mercymod / 8 + 5 - 25;
                  this.objects[0].position.y = mercymod / 8 - 5 - 25;
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { y: 1 },
                  resources: content.ibcLesserBody
               })
            ]
         }).on_legacy('tick', self => {
            let hurt = false;
            return () => {
               self.duration = 8 - Math.min(((battler.volatile[0].vars.mercymod || 0) / 1000) * 7, 7);
               if (battler.volatile[0].vars.hurt1 && !hurt) {
                  hurt = true;
                  self.objects = [];
                  self.resources = content.ibcLesserHurt;
                  self.reset();
               }
            };
         })
   }),
   dogamy: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_dogamy,
      assets: new CosmosInventory(
         content.ibbAx,
         content.ibcDogsAxe,
         content.ibcDogsDogamy,
         content.ibcDogsDogamyHurt,
         content.ibbPomSad,
         content.ibbPomBarkSad,
         content.asBomb,
         content.asWhimper
      ),
      exp: 30,
      hp: 108,
      df: 4,
      hurt: assets.sounds.whimper,
      name: text.b_opponent_dogamy.name,
      acts: () => [
         [ 'check', text.b_opponent_dogamy.act_check ],
         [ 'talk', text.b_opponent_dogamy.act_talk ],
         [ 'flirt', [] ],
         [ 'roll', [] ],
         [ 'resniff', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      sprite: () =>
         new CosmosAnimation({
            active: !world.genocide,
            anchor: { y: 1 },
            resources: content.ibcDogsDogamy
         }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcDogsDogamyHurt ]
         })
   }),
   dogaressa: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_dogaressa,
      assets: new CosmosInventory(
         content.ibcDogsDogaressa,
         content.ibcDogsDogaressaHurt,
         content.ibbHeart,
         content.ibbPomBark,
         content.ibbPomWag,
         content.asBark,
         content.ibbPomJump,
         content.ibbPomWalk
      ),
      exp: 30,
      hp: 108,
      df: 4,
      hurt: assets.sounds.whimper,
      name: text.b_opponent_dogaressa.name,
      metadata: { reactSpanner: true },
      acts: () => [
         [ 'check', text.b_opponent_dogaressa.act_check ],
         [ 'talk', text.b_opponent_dogaressa.act_talk ],
         [ 'flirt', [] ],
         [ 'roll', [] ],
         [ 'resniff', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      sprite: () =>
         new CosmosAnimation({
            active: !world.genocide,
            anchor: { y: 1 },
            resources: content.ibcDogsDogaressa
         }),
      goodbye: () =>
         new CosmosSprite({
            active: true,
            anchor: { y: 1 },
            frames: [ content.ibcDogsDogaressaHurt ]
         })
   }),
   greatdog: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_greatdog,
      assets: new CosmosInventory(
         content.ibbPomWake,
         content.ibbPomSleep,
         content.ibbPomWalk,
         content.ibbPomBark,
         content.ibbPomWag,
         content.ibbPomJump,
         content.ibcGreatdog,
         content.ibcGreatdogSleep,
         content.ibbSpearBlue,
         content.ibbBark,
         content.asBark,
         content.ibbSpear,
         content.asWhimper
      ),
      bullyable: true,
      bully: () => world.bully(),
      exp: 80,
      hp: 105,
      df: 4,
      hurt: assets.sounds.whimper,
      name: text.b_opponent_greatdog.name,
      acts: () => [
         [ 'check', text.b_opponent_greatdog.act_check ],
         [ 'talk', text.b_opponent_greatdog.act_talk ],
         [ 'flirt', text.b_opponent_greatdog.act_flirt ],
         [ 'beckon', [] ],
         [ 'play', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         let statustext = [
            text.b_opponent_greatdog.status1(),
            text.b_opponent_greatdog.status2(),
            text.b_opponent_greatdog.status3()
         ];
         let ignore = false;
         volatile.vars.pets ||= 0;
         volatile.vars.ignores ||= 0;
         let stick = false;
         switch (choice.type) {
            case 'fight':
               volatile.vars.ignores = 0;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  battler.g += 120;
                  save.data.n.state_starton_greatdog = 2;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  stick = true;
                  await battler.human(...text.b_opponent_greatdog.fetch());
                  battler.status = text.b_opponent_greatdog.fetchStatus();
                  if (!volatile.sparable) {
                     battler.g += 60;
                     save.data.n.state_starton_greatdog = 1;
                     volatile.sparable = true;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'check':
                     ignore = true;
                     break;
                  case 'beckon':
                     if (volatile.vars.close) {
                        await battler.human(...text.b_opponent_greatdog.closeText);
                     } else {
                        await battler.human(...text.b_opponent_greatdog.beckonText);
                        volatile.vars.close = true;
                     }
                     break;
                  case 'play':
                     if (volatile.vars.pets < 1) {
                        ignore = true;
                        await battler.human(...text.b_opponent_greatdog.playText1);
                     } else if (volatile.vars.pets > 1) {
                        await battler.human(...text.b_opponent_greatdog.playText3);
                     } else {
                        await battler.human(...text.b_opponent_greatdog.playText2);
                        volatile.vars.pets = 2;
                     }
                     break;
                  case 'pet':
                     if (!volatile.vars.close) {
                        ignore = true;
                        await battler.human(...text.b_opponent_greatdog.petText0);
                     } else if (volatile.vars.pets < 1) {
                        await battler.human(...text.b_opponent_greatdog.petText1);
                        volatile.vars.pets++;
                        volatile.vars.ignores = 0;
                     } else if (volatile.vars.pets > 1) {
                        await battler.human(
                           ...[
                              text.b_opponent_greatdog.petText3,
                              text.b_opponent_greatdog.petText4,
                              text.b_opponent_greatdog.petText5
                           ][Math.min(volatile.vars.pets, 4) - 2]
                        );
                        switch (volatile.vars.pets++) {
                           case 2:
                              battler.stat.speed.value = 1.5;
                              break;
                           case 3:
                              if (!volatile.sparable) {
                                 battler.g += 60;
                                 volatile.sparable = true;
                              }
                              break;
                        }
                     }
                     break;
                  case 'flirt':
                     save.data.b.flirt_greatdog = true;
                     volatile.flirted = true;
                     break;
               }
               break;
            case 'spare':
               ignore = true;
               if (battler.bullied.includes(volatile)) {
                  save.data.n.state_starton_greatdog = 4;
               } else if (!volatile.sparable) {
                  break;
               } else {
                  save.data.n.state_starton_greatdog = 0;
               }
               battler.music?.stop();
               battler.spare();
               return;
            case 'fake':
               ignore = true;
               break;
         }
         if (world.genocide) {
            ignore = false;
         }
         if (volatile.vars.pets < 1 && ignore) {
            volatile.vars.ignores++;
            volatile.vars.close = true;
            if (volatile.vars.ignores < 4) {
               await battler.human(...text.b_opponent_greatdog.waitText);
            } else {
               await battler.human(...text.b_opponent_greatdog.doneText);
               battler.music?.stop();
               save.data.n.state_starton_greatdog = 3;
               volatile.sparable = true;
               battler.spare(-1, false, world.genocide);
               return;
            }
         }
         if (battler.hurt.includes(volatile)) {
            statustext = [ text.b_opponent_greatdog.hurtStatus() ];
         } else if (volatile.vars.ignores > 0) {
            if (volatile.vars.close) {
               statustext = [
                  [ text.b_opponent_greatdog.ignoreStatus1, text.b_opponent_greatdog.ignoreStatus2 ][
                     Math.max(Math.min(volatile.vars.ignores, 3) - 2, 0)
                  ]()
               ];
            }
         } else if (volatile.vars.pets > 0) {
            statustext = [
               [
                  text.b_opponent_greatdog.petStatus1,
                  text.b_opponent_greatdog.petStatus2,
                  text.b_opponent_greatdog.petStatus3,
                  text.b_opponent_greatdog.petStatus4
               ][Math.min(volatile.vars.pets, 4) - 1]()
            ];
         } else if (volatile.vars.close) {
            statustext = [ text.b_opponent_greatdog.closeStatus() ];
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               const attackIndex = random.next() < 0.5 ? 0 : 1;
               await battler.box.size.modulate(
                  timer,
                  300,
                  [
                     { x: 100, y: 65 },
                     { x: 250, y: 45 }
                  ][attackIndex]
               );
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               if (stick) {
                  await timer.pause(300);
               } else {
                  await patterns.greatdog(attackIndex);
               }
               battler.status = statustext[Math.floor(random.next() * statustext.length)];
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcGreatdog
         }).on('tick', function () {
            const vars = battler.volatile[0].vars;
            const ignores = Math.max((vars.ignores as number) || 0, vars.close ? 1 : 0) % 4;
            this.scale = new CosmosPoint([ 1, 1.2, 1.44, 1.728 ][ignores]);
            this.subcrop.bottom = [ 0, 15, 30, 45 ][ignores];
         }),
      goodbye: () => new CosmosSprite({ active: true, anchor: { y: 1, x: 0 }, frames: [ content.ibcGreatdogSleep ] })
   }),
   papyrus: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_papyrus,
      dramatic: true,
      assets: new CosmosInventory(
         content.asBell,
         content.ibbBone,
         content.ibcPapyrusBattle,
         inventories.idcPapyrusBattle,
         content.ibuBlueSOUL,
         content.asLanding,
         content.ibcPapyrusBattleOpen,
         content.ibcPapyrusBattleHeadless
      ),
      bullyable: true,
      bully: () => world.bully(),
      exp: 0,
      hp: 680,
      df: 2,
      metadata: { reactSpanner: true },
      acts: () =>
         world.genocide || (world.population === 0 && !world.bullied)
            ? [
                 [ 'check', text.b_opponent_papyrus.act_check() ],
                 [ 'talk', [] ]
              ]
            : [
                 [ 'check', text.b_opponent_papyrus.act_check() ],
                 [ 'talk', [] ],
                 [ 'flirt', [] ],
                 [ 'insult', [] ]
              ],
      sparable: false,
      name: text.b_opponent_papyrus.name,
      async handler (choice, target, volatile) {
         const vars = {
            get phase (): number {
               return volatile.vars.phase || 0;
            },
            set phase (value) {
               volatile.vars.phase = value;
            },
            get turns (): number {
               return volatile.vars.turns || 0;
            },
            set turns (value) {
               volatile.vars.turns = value;
            },
            get epic (): number {
               return volatile.vars.epic || 0;
            },
            set epic (value) {
               volatile.vars.epic = value;
            },
            get spannerCatch (): number {
               return volatile.vars.spannerCatch || 0;
            },
            set spannerCatch (value) {
               volatile.vars.spannerCatch = value;
            },
            get sparableSpannerCatch (): number {
               return volatile.vars.sparableSpannerCatch || 0;
            },
            set sparableSpannerCatch (value) {
               volatile.vars.sparableSpannerCatch = value;
            },
            get sparableFlirt (): number {
               return volatile.vars.sparableFlirt || 0;
            },
            set sparableFlirt (value) {
               volatile.vars.sparableFlirt = value;
            },
            get sparableInsult (): number {
               return volatile.vars.sparableInsult || 0;
            },
            set sparableInsult (value) {
               volatile.vars.sparableInsult = value;
            },
            get facelock (): boolean {
               return volatile.vars.facelock || false;
            },
            set facelock (value) {
               volatile.vars.facelock = value;
            },
            get flirted (): boolean {
               return volatile.vars.flirted || false;
            },
            set flirted (value) {
               volatile.vars.flirted = value;
            },
            get insulted (): boolean {
               return volatile.vars.insulted || false;
            },
            set talked (value) {
               volatile.vars.talked = value;
            },
            get talked (): boolean {
               return volatile.vars.talked || false;
            },
            set insulted (value) {
               volatile.vars.insulted = value;
            },
            get vulnerable (): boolean {
               return volatile.vars.vulnerable || false;
            },
            set vulnerable (value) {
               volatile.vars.vulnerable = value;
            }
         };
         const papchat = async (...lines: string[]) => {
            vars.facelock = false;
            await battler.monster(false, { x: 200, y: 20 }, battler.bubbles.twinkly, ...lines);
            vars.facelock = true;
         };
         let epic = false;
         let dustrus = false;
         let dotties = false;
         volatile.vars.specatkQueue ||= new CosmosInventory(
            content.ibbSpecatk,
            content.ibbSpecatkBone,
            content.asSpecin,
            content.asSpecout,
            content.avAsriel3,
            content.asUpgrade
         ).load();
         switch (choice.type) {
            case 'fight':
               if (volatile.sparable || volatile.hp <= battler.calculate(volatile, choice.score)) {
                  battler.music?.stop();
               }
               volatile.vars.hit = true;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: -999999, operation: 'add' } : { power: choice.score },
                     true,
                     true
                  )
               ) {
                  speech.state.face = faces.papyrusBattleOwwie;
                  volatile.vars.hit = false;
                  save.data.n.state_starton_papyrus = 1;
                  await timer.pause(350);
                  await papchat(...text.b_opponent_papyrus.death1());
                  await timer.pause(350);
                  const sprite = volatile.container.objects[0] as CosmosAnimation;
                  const facebox = sprite.objects[0];
                  await battler.vaporize(sprite, {
                     handler (unit) {
                        facebox.position.y -= unit;
                     }
                  });
                  await facebox.position.modulate(
                     timer,
                     1000,
                     facebox.position.add({ x: 5, y: -30 }),
                     facebox.position.add({ x: 10, y: 75 })
                  );
                  assets.sounds.landing.instance(timer);
                  shake(2, 750);
                  await timer.pause(650);
                  vars.facelock = false;
                  await battler.monster(
                     false,
                     { x: 190, y: 90 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_papyrus.death2()
                  );
                  vars.facelock = true;
                  await timer.pause(650);
                  await battler.vaporize(facebox.objects[0] as CosmosSprite, { rate: 1 });
                  await timer.pause(world.genocide || (world.population === 0 && !world.bullied) ? 1650 : 850);
                  events.fire('exit');
                  return;
               } else {
                  volatile.vars.hit = false;
                  if (vars.phase < 2) {
                     await papchat(...text.b_opponent_papyrus.turnTalk0a, ...text.b_opponent_papyrus.turnTalk0c);
                     dustrus = true;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'check':
                     if (!(world.genocide || (world.population === 0 && !world.bullied)) && vars.phase < 2) {
                        await papchat(...text.b_opponent_papyrus.checkTalk);
                     }
                     break;
                  case 'talk':
                     epic = true;
                     if (volatile.sparable) {
                        dotties = true;
                     } else if (vars.phase < 1) {
                        if (vars.talked) {
                           vars.phase = 1;
                           await papchat(...text.b_opponent_papyrus.talk2);
                        } else {
                           vars.talked = true;
                           await papchat(...text.b_opponent_papyrus.talk1);
                           if (!save.data.b.oops) {
                              await battler.human(...text.b_opponent_papyrus.talk1x);
                           }
                        }
                     } else if (vars.phase < 2) {
                        await battler.human(...text.b_opponent_papyrus.talk3);
                     } else {
                        await battler.human(...text.b_opponent_papyrus.talk4);
                     }
                     break;
                  case 'flirt':
                     if (volatile.sparable) {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableFlirt1,
                              text.b_opponent_papyrus.sparableFlirt2,
                              text.b_opponent_papyrus.sparableFlirt3
                           ][Math.min(vars.sparableFlirt++, 2)]
                        );
                     } else if (vars.phase < 1) {
                        if (vars.flirted) {
                           vars.phase = 1;
                           await papchat(...text.b_opponent_papyrus.flirt5);
                        } else {
                           vars.flirted = true;
                           if (!save.data.b.oops) {
                              await battler.human(...text.b_opponent_papyrus.flirt0);
                           }
                           await papchat(...text.b_opponent_papyrus.flirt1);
                           await battler.human(...text.b_opponent_papyrus.flirt2);
                           await papchat(
                              ...[ text.b_opponent_papyrus.flirt3a, text.b_opponent_papyrus.flirt3b ][choicer.result],
                              ...text.b_opponent_papyrus.flirt4
                           );
                           save.data.b.papyrus_quality = choicer.result === 0;
                        }
                     } else if (vars.phase < 2) {
                        await battler.human(...text.b_opponent_papyrus.flirt6);
                     } else {
                        await battler.human(...text.b_opponent_papyrus.flirt7);
                     }
                     break;
                  case 'insult':
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     if (volatile.sparable) {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableInsult1,
                              text.b_opponent_papyrus.sparableInsult2,
                              text.b_opponent_papyrus.sparableInsult3
                           ][Math.min(vars.sparableInsult++, 2)]
                        );
                     } else if (vars.phase < 1) {
                        if (vars.insulted) {
                           vars.phase = 1;
                           await papchat(...text.b_opponent_papyrus.insult2);
                        } else {
                           vars.insulted = true;
                           await papchat(...text.b_opponent_papyrus.insult1);
                        }
                     } else if (vars.phase < 2) {
                        await battler.human(...text.b_opponent_papyrus.insult3);
                     } else {
                        await battler.human(...text.b_opponent_papyrus.insult4);
                     }
                     break;
               }
               break;
            case 'item':
               if (choice.item === 'spaghetti') {
                  if (vars.phase < 2) {
                     await papchat(...text.b_opponent_papyrus.spaghetti1());
                  } else {
                     await battler.human(...text.b_opponent_papyrus.spaghetti2);
                  }
               } else if (choice.item === 'spanner') {
                  await battler.human(...text.b_opponent_papyrus.spanner);
                  if (vars.phase < 2 || volatile.sparable) {
                     if (volatile.sparable) {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableSpannerTalk1,
                              text.b_opponent_papyrus.sparableSpannerTalk2
                           ][Math.min(vars.sparableSpannerCatch++, 1)]
                        );
                     } else {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.spannerTalk1,
                              text.b_opponent_papyrus.spannerTalk2,
                              text.b_opponent_papyrus.spannerTalk3,
                              text.b_opponent_papyrus.spannerTalk4
                           ][Math.min(vars.spannerCatch++, 3)]
                        );
                     }
                  }
               }
               break;
            case 'spare':
               if (vars.phase < 2 && (world.population > 0 || world.bullied)) {
                  await papchat(...text.b_opponent_papyrus.turnTalk0b, ...text.b_opponent_papyrus.turnTalk0c);
                  dustrus = true;
               }
               if (!battler.bullied.includes(volatile) && !volatile.sparable) {
                  break;
               }
               battler.music?.stop();
               events.fire('exit');
               return;
         }
         if (world.genocide || (world.population === 0 && !world.bullied) || dotties || vars.turns > 23) {
            if (epic) {
               vars.epic === 5 && battler.music?.stop();
               await papchat(
                  ...[
                     text.b_opponent_papyrus.turnTalk25,
                     text.b_opponent_papyrus.secretTalk2,
                     text.b_opponent_papyrus.secretTalk3,
                     text.b_opponent_papyrus.secretTalk4,
                     text.b_opponent_papyrus.secretTalk5,
                     text.b_opponent_papyrus.secretTalk6
                  ][vars.epic++]
               );
            } else {
               await papchat(...text.b_opponent_papyrus.turnTalk25);
            }
         } else if (vars.phase < 2) {
            if (dustrus) {
               vars.phase = 2;
               if (vars.flirted) {
                  save.data.b.flirt_papyrus = true;
                  volatile.flirted = true;
               }
            }
         } else {
            await papchat(
               ...[
                  [ text.b_opponent_papyrus.turnTalk1a, text.b_opponent_papyrus.turnTalk1b ][
                     save.data.b.flirt_papyrus ? 1 : 0
                  ],
                  [ text.b_opponent_papyrus.turnTalk2a, text.b_opponent_papyrus.turnTalk2b ][
                     save.data.b.flirt_papyrus ? 1 : 0
                  ],
                  text.b_opponent_papyrus.turnTalk3,
                  text.b_opponent_papyrus.turnTalk4,
                  text.b_opponent_papyrus.turnTalk5,
                  text.b_opponent_papyrus.turnTalk6,
                  text.b_opponent_papyrus.turnTalk7,
                  text.b_opponent_papyrus.turnTalk8,
                  text.b_opponent_papyrus.turnTalk9,
                  text.b_opponent_papyrus.turnTalk10,
                  [ text.b_opponent_papyrus.turnTalk11a, text.b_opponent_papyrus.turnTalk11b ][
                     save.data.b.flirt_papyrus ? 1 : 0
                  ],
                  text.b_opponent_papyrus.turnTalk12,
                  [ text.b_opponent_papyrus.turnTalk13a, text.b_opponent_papyrus.turnTalk13b ][
                     save.data.b.flirt_papyrus ? 1 : 0
                  ],
                  text.b_opponent_papyrus.turnTalk14,
                  text.b_opponent_papyrus.turnTalk15,
                  text.b_opponent_papyrus.turnTalk16,
                  text.b_opponent_papyrus.turnTalk17,
                  text.b_opponent_papyrus.turnTalk18,
                  text.b_opponent_papyrus.turnTalk19,
                  text.b_opponent_papyrus.turnTalk20,
                  text.b_opponent_papyrus.turnTalk21,
                  text.b_opponent_papyrus.turnTalk22,
                  text.b_opponent_papyrus.turnTalk23,
                  text.b_opponent_papyrus.turnTalk24,
                  text.b_opponent_papyrus.turnTalk25
               ][vars.turns++]
            );
            if (vars.turns > 23) {
               volatile.sparable = true;
            }
         }
         if (world.genocide || (world.population === 0 && !world.bullied) || vars.epic === 6) {
            if (vars.epic < 6) {
               await battler.resume();
            } else if (!world.genocide) {
               await papchat(...text.b_opponent_papyrus.secretTalk7x);
               events.fire('exit');
            } else {
               const cont = volatile.container;
               const anim = cont.objects[0] as CosmosAnimation;
               anim.use(content.ibcPapyrusBattle);
               anim.x = 0;
               anim.objects[0].x = 19;
               await timer.pause(1400);
               await papchat(...text.b_opponent_papyrus.secretTalk7);
               await cont.position.modulate(timer, 1000, { x: -80 });
               save.data.b.papyrus_secret = true;
               save.data.n.state_starton_papyrus = 1;
               events.fire('exit');
            }
         } else {
            await battler.resume(async () => {
               await battler.box.size.modulate(timer, 300, { x: 125, y: 65 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               let pattern: Promise<void>;
               if (vars.phase < 2) {
                  pattern = patterns.papyrus(-1);
               } else {
                  pattern = patterns.papyrus(vars.turns).then(async () => {
                     if (save.data.n.hp === 1) {
                        return;
                     }
                     if (battler.bullied.includes(volatile)) {
                        await papchat(...text.b_opponent_papyrus.bullySpareTalk);
                        battler.music?.rate.modulate(timer, 300, 0.8);
                        vars.turns = 25;
                     } else {
                        switch (vars.turns) {
                           case 0:
                              await papchat(...text.b_opponent_papyrus.turnTalk0x);
                              battler.music?.stop();
                              battler.music = assets.music.papyrusboss.instance(timer);
                              break;
                           case 19:
                              save.data.b.papyrus_specatk = true;
                              await Promise.all([
                                 volatile.vars.specatkQueue,
                                 papchat(...text.b_opponent_papyrus.turnTalk19x)
                              ]);
                              battler.music?.stop();
                              battler.music = assets.music.specatk.instance(timer);
                              break;
                           case 24:
                              await papchat(...text.b_opponent_papyrus.turnTalk24x);
                              vars.turns = 25;
                              break;
                        }
                     }
                  });
               }
               await Promise.race([
                  pattern,
                  timer
                     .when(() => save.data.n.hp === 1)
                     .then(() => {
                        battler.music?.gain.modulate(timer, 1500, 0).then(() => {
                           battler.music!.stop();
                        });
                     })
               ]);
               if (save.data.n.hp === 1) {
                  volatile.vars.fail = true;
                  await timer.pause(850);
                  if (save.data.n.state_papyrus_capture < 4) {
                     await papchat(
                        ...[
                           text.b_opponent_papyrus.capture1,
                           text.b_opponent_papyrus.capture2,
                           text.b_opponent_papyrus.capture3,
                           text.b_opponent_papyrus.capture4,
                           text.b_opponent_papyrus.capture5
                        ][Math.min(save.data.n.state_papyrus_capture - 1, 4)]
                     );
                  }
                  events.fire('exit');
                  await timer.pause(Infinity);
               }
               if (volatile.sparable) {
                  battler.status = text.b_opponent_papyrus.status1;
               } else if (vars.phase < 2) {
                  battler.status = text.b_opponent_papyrus.status2;
               } else if (battler.hurt.includes(volatile)) {
                  battler.status = text.b_opponent_papyrus.hurtStatus;
               } else if (save.data.b.flirt_papyrus && vars.turns < 11) {
                  battler.status = [
                     text.b_opponent_papyrus.flirtStatus1,
                     text.b_opponent_papyrus.flirtStatus2,
                     text.b_opponent_papyrus.flirtStatus3,
                     text.b_opponent_papyrus.flirtStatus4,
                     text.b_opponent_papyrus.flirtStatus5,
                     text.b_opponent_papyrus.flirtStatus6,
                     text.b_opponent_papyrus.flirtStatus7,
                     text.b_opponent_papyrus.flirtStatus8,
                     text.b_opponent_papyrus.flirtStatus9,
                     text.b_opponent_papyrus.flirtStatus10,
                     text.b_opponent_papyrus.flirtStatus11
                  ][vars.turns];
               } else if (vars.turns < 19) {
                  battler.status = [
                     text.b_opponent_papyrus.randomStatus1,
                     text.b_opponent_papyrus.randomStatus2,
                     text.b_opponent_papyrus.randomStatus3,
                     text.b_opponent_papyrus.randomStatus4,
                     text.b_opponent_papyrus.randomStatus5,
                     text.b_opponent_papyrus.randomStatus6,
                     text.b_opponent_papyrus.randomStatus7,
                     text.b_opponent_papyrus.randomStatus8,
                     text.b_opponent_papyrus.randomStatus9
                  ][Math.floor(random.next() * 9)];
               } else {
                  battler.status = [
                     text.b_opponent_papyrus.specialStatus1,
                     text.b_opponent_papyrus.specialStatus2,
                     text.b_opponent_papyrus.specialStatus3,
                     text.b_opponent_papyrus.specialStatus4,
                     text.b_opponent_papyrus.specialStatus5,
                     text.b_opponent_papyrus.specialStatus6
                  ][vars.turns - 19];
               }
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         }
      },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            position: { x: world.genocide || (world.population === 0 && !world.bullied) ? -14 : 0 },
            resources:
               world.genocide || (world.population === 0 && !world.bullied)
                  ? content.ibcPapyrusBattleOpen
                  : content.ibcPapyrusBattle,
            objects: [
               new CosmosObject({
                  position: { x: world.genocide || (world.population === 0 && !world.bullied) ? 33 : 19, y: 3 }
               }).on('tick', function () {
                  const vars = battler.volatile[0].vars;
                  if (!vars.facelock) {
                     this.alpha.value = 1;
                     this.objects = [
                        ...(vars.hit
                           ? [ faces.papyrusBattleOwwie ]
                           : speech.state.face
                           ? [ speech.state.face ]
                           : [ faces.papyrusBattleMad ])
                     ];
                  } else if (vars.faceoverride) {
                     this.objects = [ vars.faceoverride ];
                  }
               }),
               new CosmosSprite({
                  alpha: 0,
                  frames: [ content.ibcPapyrusBattleHeadless ],
                  position: { x: world.genocide || (world.population === 0 && !world.bullied) ? 14 : 0 }
               })
            ]
         })
   }),
   shockpapyrus: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcPapyrusBattle, content.ibcSansDeath, inventories.idcPapyrusBattle),
      exp: 0,
      hp: 1,
      df: 0,
      acts: () => [ [ 'check', text.b_opponent_shockpapyrus.act_check ] ],
      sparable: false,
      name: text.b_opponent_shockpapyrus.name,
      sprite: () =>
         new CosmosAnimation({
            active: true,
            resources: content.ibcPapyrusBattle,
            objects: [
               new CosmosObject({
                  position: { x: 19, y: 3 }
               }).on('tick', function () {
                  const vars = battler.volatile[0].vars;
                  if (!vars.facelock) {
                     this.alpha.value = 1;
                     this.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                  } else if (vars.faceoverride) {
                     this.objects = [ vars.faceoverride ];
                  }
               })
            ]
         })
   }),
   shocksans: new OutertaleOpponent({
      assets: new CosmosInventory(),
      exp: 0,
      hp: 1,
      df: 0,
      sparable: false,
      dramatic: true,
      name: '',
      acts: [],
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { size: { x: 72, y: 73 } },
            position: { x: 160, y: 125 }
         })
   }),
   shockasgore: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcAsgoreStatic),
      exp: 0,
      hp: 1,
      df: 0,
      ghost: true,
      name: text.b_opponent_shockasgore.name,
      acts: () => [ [ 'check', text.b_opponent_shockasgore.act_check ] ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         const vars = volatile.vars;
         const goreyChat = async (...lines: string[]) => {
            vars.facelock = false;
            await battler.monster(false, { x: 220, y: 10 }, battler.bubbles.napstablook, ...lines);
            vars.facelock = true;
         };
         if (choice.type === 'fight') {
            battler.music?.stop();
            const gorey = battler.alive[0].container;
            const filter = new GlitchFilter({
               slices: 20,
               offset: 0
            });
            gorey.container.filters = [ filter ];
            const trueOffset = new CosmosValue();
            const ticker = () => {
               filter.offset = trueOffset.value;
               filter.refresh();
            };
            renderer.on('tick', ticker);
            trueOffset.value = 40;
            trueOffset.modulate(timer, 1000, 6, 2).then(async () => {
               await trueOffset.modulate(timer, 1000, 2, 0, 0);
               renderer.off('tick', ticker);
               gorey.container.filters = [];
            });
            await battler.attack(volatile, { power: 0, operation: 'add' }, true, true);

            save.flag.n.ga_asriel30x++;
            await timer.pause(1000);
            await goreyChat(...text.b_opponent_shockasgore.miss);
            events.fire('exit');
         } else {
            const foods = [ 'pie', 'pie2', 'snails' ];
            if (choice.type === 'item' && foods.includes(choice.item)) {
               if (choice.item === 'snails') {
                  await goreyChat(...text.b_opponent_shockasgore.foodText2);
               } else {
                  await goreyChat(...text.b_opponent_shockasgore.foodText1);
               }
               battler.status = text.b_opponent_shockasgore.foodStatus;
            } else if (choice.type === 'item' && choice.item === 'spanner') {
               const gorey = battler.alive[0].container;
               const filter = new GlitchFilter({ slices: 20, offset: 0 });
               gorey.container.filters = [ filter ];
               const trueOffset = new CosmosValue();
               const ticker = () => {
                  filter.offset = trueOffset.value;
                  filter.refresh();
               };
               renderer.on('tick', ticker);
               trueOffset.value = 20;
               await trueOffset.modulate(timer, 500, 3, 1);
               await trueOffset.modulate(timer, 500, 1, 0, 0);
               renderer.off('tick', ticker);
               gorey.container.filters = [];
               await battler.human(...text.b_opponent_shockasgore.stickText);
               await goreyChat(...text.b_opponent_shockasgore.stickTalk);
               battler.status = text.b_opponent_shockasgore.status3;
               save.storage.inventory.remove('spanner');
            } else {
               await goreyChat(...text.b_opponent_shockasgore.idleText);
               battler.status = text.b_opponent_shockasgore.status2;
            }
            battler.resume();
         }
      },
      sprite: () =>
         new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcAsgoreStatic,
            objects: [
               new CosmosObject({ position: { x: 2, y: -92.5 } }).on('tick', function () {
                  const vars = battler.volatile[0].vars;
                  if (!vars.facelock) {
                     this.alpha.value = 1;
                     this.objects = [ speech.state.face || faces.asgoreCutscene1 ];
                  } else if (vars.faceoverride) {
                     this.objects = [ vars.faceoverride ];
                  }
               })
            ]
         })
   })
};

export default opponents;

CosmosUtils.status(`LOAD MODULE: STARTON OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
