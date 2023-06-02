import assets from '../assets';
import { OutertaleOpponent } from '../classes';
import { faces as commonFaces } from '../common/bootstrap';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import commonText from '../common/text';
import content, { inventories } from '../content';
import { atlas, events, game, random, renderer, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosInstance,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../engine';
import { battler, header, oops, world } from '../mantle';
import save from '../save';
import { faces, resetThreshold } from './bootstrap';
import patterns from './patterns';
import text from './text';

const opponents = {
   dummy: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcDummy,
         content.ibcDummyDefeated,
         content.ibcDummyHugged,
         content.asSlidewhistle
      ),
      exp: 0,
      hp: 1,
      df: 0,
      name: commonText.b_opponent_dummy.name,
      acts: () => [
         [ 'check', commonText.b_opponent_dummy.act_check ],
         [ 'talk', commonText.b_opponent_dummy.act_talk ],
         [ 'hug', commonText.b_opponent_dummy.act_hug ],
         [ 'slap', commonText.b_opponent_dummy.act_slap ],
         [ 'flirt', commonText.b_opponent_dummy.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         volatile.vars.hugs || (volatile.vars.hugs = 0);
         volatile.vars.slaps || (volatile.vars.slaps = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         let humantext = [] as string[];
         switch (choice.type) {
            case 'fight':
               save.data.n.state_wastelands_dummy = 1;
               await battler.attack(volatile, { power: choice.score });
               battler.music?.stop();
               return;
            case 'flee':
               save.data.n.state_wastelands_dummy = 2;
               events.fire('escape');
               battler.music?.stop();
               return;
            case 'act':
               switch (choice.act) {
                  case 'talk':
                     volatile.sparable = true;
                     save.data.n.state_wastelands_dummy = 0;
                     break;
                  case 'flirt':
                     volatile.sparable = true;
                     save.data.n.state_wastelands_dummy = 6;
                     break;
                  case 'hug':
                     if (++volatile.vars.hugs === 3) {
                        volatile.sparable = true;
                        volatile.container.objects[0].frames = [ content.ibcDummyHugged ];
                        humantext = commonText.b_opponent_dummy.hugged;
                        save.data.n.state_wastelands_dummy = 4;
                     }
                     break;
                  case 'slap':
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     if (++volatile.vars.slaps === 3) {
                        volatile.sparable = true;
                        humantext = commonText.b_opponent_dummy.slapped;
                        save.data.n.state_wastelands_dummy = 5;
                     }
                     break;
               }
               break;
         }
         if (
            (choice.type !== 'act' || ![ 'talk', 'flirt' ].includes(choice.act)) &&
            volatile.vars.slaps < 3 &&
            volatile.vars.hugs < 3 &&
            ++volatile.vars.turns === 10
         ) {
            volatile.sparable = true;
            humantext = commonText.b_opponent_dummy.bored;
            save.data.n.state_wastelands_dummy = 3;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (volatile.vars.slaps === 3) {
            assets.sounds.slidewhistle.instance(timer);
            await volatile.container.position.modulate(timer, 1250, { x: volatile.container.position.x, y: -80 });
            await timer.pause(650);
            await battler.human(...commonText.b_opponent_dummy.slapped2);
         }
         if (volatile.sparable) {
            battler.spare(target);
            battler.music?.stop();
         } else {
            await battler.monster(
               false,
               { x: 295 / 2, y: 134 / 2 },
               battler.bubbles.dummy,
               ...commonText.b_opponent_dummy.talk
            );
            battler.status = [
               commonText.b_opponent_dummy.status2,
               commonText.b_opponent_dummy.status3,
               commonText.b_opponent_dummy.status4
            ][Math.floor(random.next() * 3)];
            battler.resume();
         }
      },
      sprite: () => new CosmosSprite({ frames: [ content.ibcDummy ] }),
      goodbye: () =>
         new CosmosSprite({
            frames: [ save.data.n.state_wastelands_dummy === 1 ? content.ibcDummyDefeated : content.ibcDummy ]
         })
   }),
   froggit: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcFroggitDefeated,
         content.ibcFroggitHead,
         content.ibcFroggitLegs,
         content.ibbFroggitGo,
         content.ibbFroggitWarn,
         content.ibbFroggitFly,
         content.asTwinklyHurt
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 3,
      hp: 30,
      df: 4,
      name: text.b_opponent_froggit.name,
      acts: () => [
         [ 'check', text.b_opponent_froggit.act_check ],
         [ 'compliment', text.b_opponent_froggit.act_compliment ],
         [ 'translate', [] ],
         [ 'flirt', text.b_opponent_froggit.act_flirt ]
      ],
      hurt: assets.sounds.twinklyHurt,
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_froggit.idleText1,
            text.b_opponent_froggit.idleText2,
            text.b_opponent_froggit.idleText3,
            text.b_opponent_froggit.idleText4
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(30, -54),
               battler.bubbles.dummy,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            text.b_opponent_froggit.status2,
            text.b_opponent_froggit.status3,
            text.b_opponent_froggit.status4
         ];
         const sparing = battler.sparing(choice);
         choice.type === 'fight' || sparing || (await battler.idle1(target));
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable
                        ? { power: 0, operation: 'multiply' }
                        : { power: choice.score * (volatile.vars.fake ? 4 : 1) }
                  )
               ) {
                  world.kill();
                  battler.g += 4;
                  await battler.idle1(target);
                  return;
               }
               await battler.idle1(target);
               break;
            case 'act':
               if (choice.act === 'translate') {
                  switch (volatile.vars.lastact) {
                     case 'compliment':
                        save.data.b.spared_froggit = true;
                        if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                           volatile.vars.mercymod = true;
                           battler.g += 2;
                        }
                        volatile.sparable = true;
                        await battler.human(...text.b_opponent_froggit.act_translate1);
                        monstertext = [ text.b_opponent_froggit.niceText ];
                        break;
                     case 'flirt':
                        save.data.b.flirt_froggit = true;
                        save.data.b.spared_froggit = true;
                        if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                           volatile.vars.mercymod = true;
                           battler.g += 2;
                        }
                        volatile.sparable = true;
                        await battler.human(...text.b_opponent_froggit.act_translate2);
                        monstertext = [ text.b_opponent_froggit.flirtText ];
                        break;
                     default:
                        await battler.human(...text.b_opponent_froggit.act_translate0);
                        break;
                  }
               }
               volatile.vars.lastact = choice.act;
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
         choice.type !== 'act' && (volatile.vars.lastact = void 0);
         sparing || (await doIdle());
         if (volatile.sparable) {
            statustext = [ text.b_opponent_froggit.mercyStatus ];
         } else if (battler.hurt.includes(volatile)) {
            statustext = [ text.b_opponent_froggit.perilStatus ];
         }
         battler.status = statustext[Math.floor(random.next() * statustext.length)];
         sparing || (await battler.idle2(target));
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcFroggitDefeated ]
         }),
      sprite: () => {
         const random3 = random.clone();
         return new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            metadata: {
               size: { y: 55 }
            },
            resources: content.ibcFroggitLegs,
            objects: [
               new CosmosAnimation({
                  active: true,
                  position: { x: -2, y: -20 },
                  anchor: { y: 1, x: 0 },
                  resources: content.ibcFroggitHead
               }).on_legacy('tick', self => {
                  let dir = 0;
                  const speed = 1 / 20;
                  const limitvar = 1;
                  const baselimit = 1.5;
                  const basepos = self.position.value();
                  return () => {
                     const destie = self.position.endpoint(dir * 90 + 45, speed);
                     if (destie.extentOf(basepos) > baselimit + (random3.next() - 0.5) * 2 * limitvar) {
                        if (dir++ === 3) {
                           dir = 0;
                        }
                     } else {
                        self.position = destie;
                     }
                  };
               })
            ]
         }).on('tick', function () {
            if (this.index === 0 && random3.next() < 1 / 30 / 10) {
               this.index = 1;
               timer.pause(650).then(() => {
                  this.index = 0;
               });
            }
         });
      }
   }),
   whimsun: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcWhimsun, content.ibcWhimsunDefeated, content.ibbStarfly),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 2,
      hp: 10,
      df: 0,
      name: text.b_opponent_whimsun.name,
      acts: () => [
         [ 'check', text.b_opponent_whimsun.act_check ],
         [ 'guide', text.b_opponent_whimsun.act_console ],
         [ 'mislead', text.b_opponent_whimsun.act_terrorize ],
         [ 'flirt', text.b_opponent_whimsun.act_flirt ]
      ],
      async handler (choice, target, volatile) {
         const monstertext = [
            text.b_opponent_whimsun.idleTalk1,
            text.b_opponent_whimsun.idleTalk2,
            text.b_opponent_whimsun.idleTalk3,
            text.b_opponent_whimsun.idleTalk4,
            text.b_opponent_whimsun.idleTalk5
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(44 - 15, -54),
               battler.bubbles.dummy,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            text.b_opponent_whimsun.status2,
            text.b_opponent_whimsun.status3,
            text.b_opponent_whimsun.status4,
            text.b_opponent_whimsun.status5,
            text.b_opponent_whimsun.status6
         ];
         const sparing = battler.sparing(choice);
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  battler.g += 4;
                  await battler.idle1(target);
                  return;
               }
               await battler.idle1(target);
               break;
            case 'act':
               switch (choice.act) {
                  case 'guide':
                     save.data.b.spared_whimsun = true;
                     if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                        volatile.vars.mercymod = true;
                        battler.g += 2;
                     }
                     volatile.sparable = true;
                     battler.spare(target);
                     return;
                  case 'flirt':
                     save.data.b.flirt_whimsun = true;
                     save.data.b.spared_whimsun = true;
                     if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                        volatile.vars.mercymod = true;
                        battler.g += 2;
                     }
                     volatile.sparable = true;
                     battler.spare(target);
                     return;
                  case 'mislead':
                     volatile.vars.mercymod = true;
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     await battler.idle1(target);
                     break;
                  default:
                     await battler.idle1(target);
                     break;
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  return;
               } else if (!volatile.sparable) {
                  sparing || (await battler.idle1(target));
                  break;
               }
            case 'flee':
               return;
            default:
               await battler.idle1(target);
               break;
         }
         sparing || (await doIdle());
         if (battler.hurt.includes(volatile)) {
            statustext = [ text.b_opponent_whimsun.perilStatus ];
         }
         battler.status = statustext[Math.floor(random.next() * statustext.length)];
         sparing || (await battler.idle2(target));
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcWhimsunDefeated ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcWhimsun
         }).on_legacy('tick', self => {
            let direction = -1;
            let elevation = 0.5;
            return () => {
               self.position.y = (elevation += direction / (30 * 2)) * 12;
               if (elevation < 0 || elevation > 1) {
                  direction *= -1;
               }
            };
         })
   }),
   migosp: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcMigosp,
         content.ibcMigospDefeated,
         content.ibcMigospHappi,
         content.ibbFroggitFly,
         content.ibbRoachfly,
         content.ibbMigosp
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 5,
      hp: 40,
      df: 4,
      g: 4,
      name: text.b_opponent_migosp.name,
      acts: () => [
         [ 'check', text.b_opponent_migosp.act_check ],
         [ 'talk', text.b_opponent_migosp.act_talk ],
         [ 'flirt', text.b_opponent_migosp.act_flirt ],
         [ 'insult', [] ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultTalk: () =>
            battler.alive.length > 1
               ? [
                    text.b_opponent_migosp.groupTalk1,
                    text.b_opponent_migosp.groupTalk2,
                    text.b_opponent_migosp.groupTalk3,
                    text.b_opponent_migosp.groupTalk4,
                    text.b_opponent_migosp.groupTalk5,
                    text.b_opponent_migosp.groupTalk6
                 ]
               : [
                    text.b_opponent_migosp.soloTalk1,
                    text.b_opponent_migosp.soloTalk2,
                    text.b_opponent_migosp.soloTalk3,
                    text.b_opponent_migosp.soloTalk4,
                    text.b_opponent_migosp.soloTalk5
                 ],
         bubble: pos => [ pos.add(17, -54), battler.bubbles.dummy ],
         defaultStatus: state =>
            battler.hurt.includes(state.volatile)
               ? text.b_opponent_migosp.perilStatus
               : battler.alive.length > 1
               ? [ text.b_opponent_migosp.groupStatus1, text.b_opponent_migosp.groupStatus2 ]
               : text.b_opponent_migosp.soloStatus,
         act: {
            talk (state) {
               battler.alive.length === 1 && (state.talk = text.b_opponent_migosp.talkTalk);
            },
            flirt (state) {
               if (battler.alive.length === 1) {
                  save.data.b.flirt_migosp = true;
                  state.talk = text.b_opponent_migosp.flirtTalk;
               }
            },
            async insult () {
               if (!save.data.b.oops) {
                  oops();
                  await timer.pause(1000);
               }
               await battler.human(
                  ...(battler.alive.length > 1 ? text.b_opponent_migosp.groupInsult : text.b_opponent_migosp.soloInsult)
               );
            }
         },
         postact (state, act) {
            if (battler.alive.length === 1 && (act === 'talk' || act === 'flirt')) {
               save.data.b.spared_migosp = true;
               state.pacify = true;
            }
         },
         pretalk ({ volatile }) {
            battler.alive.length === 1 &&
               (volatile.container.objects[0] as CosmosAnimation).use(content.ibcMigospHappi).enable();
         }
      }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMigospDefeated ]
         }),
      sprite: () => {
         const random3 = random.clone();
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcMigosp
         }).on('tick', function () {
            if (this.resources === content.ibcMigosp && this.index === 0 && random3.next() < 1 / 30 / 3) {
               this.index = Math.floor(random3.next() * 2) + 1;
               timer.pause(100 + CosmosMath.bezier(random3.next(), 0, 0, 750, 750)).then(() => {
                  this.index = 0;
               });
            }
         });
      }
   }),
   loox: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcLoox,
         content.ibcLooxDefeated,
         content.ibbLooxCircle1,
         content.ibbLooxCircle2,
         content.ibbLooxCircle3
      ),
      metadata: { arc: true },
      exp: 7,
      hp: 50,
      df: 4,
      name: text.b_opponent_loox.name,
      acts: () => [
         [ 'check', text.b_opponent_loox.act_check ],
         [ 'stare', text.b_opponent_loox.act_dontpick ],
         [ 'annoy', text.b_opponent_loox.act_pick ],
         [ 'flirt', text.b_opponent_loox.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_loox.idleTalk1,
            text.b_opponent_loox.idleTalk2,
            text.b_opponent_loox.idleTalk3,
            text.b_opponent_loox.idleTalk4
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(32, -54),
               battler.bubbles.dummy,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            text.b_opponent_loox.status2,
            text.b_opponent_loox.status3,
            text.b_opponent_loox.status4,
            text.b_opponent_loox.status5,
            text.b_opponent_loox.status6
         ];
         const sparing = battler.sparing(choice);
         choice.type === 'fight' || sparing || (await battler.idle1(target));
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  battler.g += 10;
                  await battler.idle1(target);
                  return;
               }
               await battler.idle1(target);
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     save.data.b.flirt_loox = true;
                     save.data.b.spared_loox = true;
                     if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                        volatile.vars.mercymod = true;
                        battler.g += 5;
                     }
                     volatile.sparable = true;
                     if (volatile.vars.locked) {
                        monstertext = [ text.b_opponent_loox.flirtDeny1 ];
                     } else {
                        monstertext = [ text.b_opponent_loox.flirtTalk1 ];
                     }
                     break;
                  case 'annoy':
                     volatile.vars.mercymod = true;
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     volatile.sparable = false;
                     volatile.vars.locked = true;
                     monstertext = [ text.b_opponent_loox.pickTalk1 ];
                     break;
                  case 'stare':
                     save.data.b.spared_loox = true;
                     if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                        volatile.vars.mercymod = true;
                        battler.g += 5;
                     }
                     volatile.sparable = true;
                     if (volatile.vars.locked) {
                        monstertext = [ text.b_opponent_loox.dontDeny1 ];
                     } else {
                        monstertext = [ text.b_opponent_loox.dontTalk1 ];
                     }
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
         sparing || (await doIdle());
         if (volatile.sparable) {
            statustext = [ text.b_opponent_loox.spareStatus ];
         } else if (battler.hurt.includes(volatile)) {
            statustext = [ text.b_opponent_loox.hurtStatus ];
         }
         battler.status = statustext[Math.floor(random.next() * statustext.length)];
         sparing || (await battler.idle2(target));
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcLooxDefeated ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcLoox
         })
   }),
   mushy: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcMushy,
         content.ibcMushyDefeated,
         content.ibbLiteralBullet,
         content.ibbCrosshair
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 6,
      hp: 72,
      df: 0,
      name: text.b_opponent_mushy.name,
      acts: () => [
         [ 'check', text.b_opponent_mushy.act_check ],
         [ 'challenge', text.b_opponent_mushy.act_challenge ],
         [ 'taunt', text.b_opponent_mushy.act_taunt ],
         [ 'flirt', text.b_opponent_mushy.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_mushy.idleTalk1,
            text.b_opponent_mushy.idleTalk2,
            text.b_opponent_mushy.idleTalk3
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(22, -54),
               battler.bubbles.dummy,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         volatile.vars.challenge || (volatile.vars.challenge = 0);
         let statustext = [] as string[][];
         const sparing = battler.sparing(choice);
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  battler.g += 2;
                  return;
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'taunt':
                     volatile.vars.mercymod = true;
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     monstertext = [ text.b_opponent_mushy.tauntTalk1 ];
                     statustext = [ text.b_opponent_mushy.tauntStatus1 ];
                     break;
                  case 'flirt':
                     save.data.b.flirt_mushy = true;
                     monstertext = [ text.b_opponent_mushy.flirtTalk1 ];
                     statustext = [ text.b_opponent_mushy.flirtStatus1 ];
                     break;
                  case 'challenge':
                     const challengeValue = ++volatile.vars.challenge;
                     if (challengeValue < 2) {
                        monstertext = [ text.b_opponent_mushy.challengeTalk1 ];
                        statustext = [ text.b_opponent_mushy.challengeStatus ];
                     } else {
                        save.data.b.spared_mushy = true;
                        monstertext = [ text.b_opponent_mushy.challengeTalk2 ];
                        statustext = [ text.b_opponent_mushy.spareStatus ];
                        volatile.sparable = true;
                        if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                           volatile.vars.mercymod = true;
                           battler.g += 1;
                        }
                     }
                     break;
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
         sparing || (await doIdle());
         if (statustext.length === 0) {
            if (battler.hurt.includes(volatile)) {
               statustext = [ text.b_opponent_mushy.hurtStatus ];
            } else {
               statustext = [
                  text.b_opponent_mushy.status2,
                  text.b_opponent_mushy.status3,
                  text.b_opponent_mushy.status4,
                  text.b_opponent_mushy.status5
               ];
            }
         }
         battler.status = statustext[Math.floor(random.next() * statustext.length)];
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMushyDefeated ]
         }),
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMushy ]
         }).on_legacy('tick', self => {
            let spinning = false;
            const random3 = random.clone();
            return () => {
               if (!spinning && random3.next() < 1 / 30 / 20) {
                  spinning = true;
                  self.scale.modulate(timer, 150, { x: -1, y: 1 }).then(async () => {
                     await timer.pause(100);
                     await self.scale.modulate(timer, 150, { x: 1, y: 1 });
                     spinning = false;
                  });
               }
            };
         })
   }),
   napstablook: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcNapstablook, content.ibcNapstaSad, content.ibcNapstaHat, content.ibbTear),
      exp: -1,
      hp: 88,
      df: 4,
      name: text.b_opponent_napstablook.name,
      acts: () => [
         [ 'check', text.b_opponent_napstablook.act_check ],
         [ 'flirt', [] ],
         [ 'threat', [] ],
         [ 'cheer', [] ],
         [ 'talk', [] ]
      ],
      sparable: false,
      ghost: true,
      async handler (choice, target, volatile) {
         volatile.vars.talk || (volatile.vars.talk = 0);
         volatile.vars.cheer || (volatile.vars.cheer = 0);
         volatile.vars.flirt || (volatile.vars.flirt = 0);
         volatile.vars.mercy || (volatile.vars.mercy = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         volatile.vars.sourTurns || (volatile.vars.sourTurns = 0);
         volatile.vars.restoreMercy || (volatile.vars.restoreMercy = 0);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as string[][];
         let doCry = false;
         let doHat = false;
         switch (choice.type) {
            case 'act':
               switch (choice.act) {
                  case 'check':
                     if (volatile.vars.sour) {
                        monstertext = [ text.b_opponent_napstablook.silentTalk ];
                     } else {
                        monstertext = [ text.b_opponent_napstablook.checkTalk ];
                     }
                     break;
                  case 'talk':
                     if (volatile.vars.sour) {
                        humantext = text.b_opponent_napstablook.talk0;
                        monstertext = [ text.b_opponent_napstablook.silentTalk ];
                     } else if (volatile.vars.hat) {
                        volatile.sparable = true;
                        humantext = text.b_opponent_napstablook.critic1;
                        monstertext = [ text.b_opponent_napstablook.criticTalk ];
                        save.data.n.state_wastelands_napstablook = 3;
                     } else {
                        const talkValue = volatile.vars.talk++;
                        if (talkValue < 5) {
                           humantext = [
                              text.b_opponent_napstablook.talk1,
                              text.b_opponent_napstablook.talk2,
                              text.b_opponent_napstablook.talk3,
                              text.b_opponent_napstablook.talk4,
                              text.b_opponent_napstablook.talk5
                           ][talkValue];
                           monstertext = [
                              [
                                 text.b_opponent_napstablook.talkTalk1,
                                 text.b_opponent_napstablook.talkTalk2,
                                 text.b_opponent_napstablook.talkTalk3,
                                 text.b_opponent_napstablook.talkTalk4,
                                 text.b_opponent_napstablook.talkTalk5
                              ][talkValue]
                           ];
                        } else if (talkValue === 7 && !save.data.b.oops) {
                           humantext = text.b_opponent_napstablook.talk7;
                           monstertext = [ text.b_opponent_napstablook.talkTalk9 ];
                        } else {
                           humantext = text.b_opponent_napstablook.talk6;
                           monstertext = [
                              text.b_opponent_napstablook.talkTalk6,
                              text.b_opponent_napstablook.talkTalk7,
                              text.b_opponent_napstablook.talkTalk8
                           ];
                        }
                     }
                     break;
                  case 'threat':
                     volatile.vars.mercymod = true;
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                     if (volatile.vars.hat) {
                        humantext = text.b_opponent_napstablook.suck;
                     } else {
                        humantext = text.b_opponent_napstablook.threat;
                     }
                     if (volatile.vars.sour) {
                        monstertext = [
                           text.b_opponent_napstablook.insultTalk2,
                           text.b_opponent_napstablook.insultTalk3,
                           text.b_opponent_napstablook.insultTalk4
                        ];
                        volatile.vars.restoreMercy = 2;
                     } else {
                        volatile.vars.sour = true;
                        doCry = true;
                        monstertext = [ text.b_opponent_napstablook.insultTalk1 ];
                        volatile.vars.restoreMercy = 2;
                     }
                     break;
                  case 'cheer':
                     if (volatile.vars.sour) {
                        humantext = text.b_opponent_napstablook.cheer0;
                        monstertext = [
                           text.b_opponent_napstablook.consoleTalk1,
                           text.b_opponent_napstablook.consoleTalk2,
                           text.b_opponent_napstablook.consoleTalk3
                        ];
                        if (volatile.vars.restoreMercy-- === 0) {
                           volatile.vars.sour = false;
                        }
                     } else {
                        const cheerValue = volatile.vars.cheer++;
                        if (cheerValue === 3) {
                           volatile.sparable = true;
                           doCry = true;
                           save.data.n.state_wastelands_napstablook = 0;
                           if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                              volatile.vars.mercymod = true;
                              battler.g += 10;
                           }
                        } else {
                           cheerValue === 2 && (doHat = true);
                           humantext = [
                              text.b_opponent_napstablook.cheer1,
                              text.b_opponent_napstablook.cheer2,
                              [],
                              text.b_opponent_napstablook.cheer3
                           ][cheerValue];
                           statustext = [
                              [
                                 text.b_opponent_napstablook.status2,
                                 text.b_opponent_napstablook.status3,
                                 text.b_opponent_napstablook.status3a
                              ][cheerValue]
                           ];
                        }
                        monstertext = [
                           [
                              text.b_opponent_napstablook.cheerTalk1,
                              text.b_opponent_napstablook.cheerTalk2,
                              text.b_opponent_napstablook.cheerTalk3,
                              text.b_opponent_napstablook.cheerTalk4
                           ][cheerValue]
                        ];
                     }
                     break;
                  case 'flirt':
                     const flirtValue = volatile.vars.flirt++;
                     if (volatile.vars.hat) {
                        doCry = true;
                        volatile.sparable = true;
                        humantext = text.b_opponent_napstablook.sincere;
                        monstertext = [ text.b_opponent_napstablook.sincereTalk ];
                        save.data.n.state_wastelands_napstablook = flirtValue > 2 ? 1 : 0;
                        if (!volatile.vars.mercymod && volatile.hp === volatile.opponent.hp) {
                           volatile.vars.mercymod = true;
                           battler.g += 10;
                        }
                        break;
                     } else {
                        humantext = [
                           text.b_opponent_napstablook.flirt1,
                           text.b_opponent_napstablook.flirt2,
                           text.b_opponent_napstablook.flirt3,
                           volatile.vars.sour ? text.b_opponent_napstablook.flirt0 : text.b_opponent_napstablook.flirt4
                        ][Math.min(flirtValue, 3)];
                     }
                     if (volatile.vars.sour) {
                        if (volatile.vars.sourTurns < 2) {
                           volatile.sparable = true;
                           monstertext = [ text.b_opponent_napstablook.awkwardTalk ];
                           save.data.n.state_wastelands_napstablook = 3;
                        } else {
                           monstertext = [ text.b_opponent_napstablook.silentTalk ];
                        }
                     } else {
                        monstertext = [
                           [
                              text.b_opponent_napstablook.flirtTalk1,
                              text.b_opponent_napstablook.flirtTalk2,
                              text.b_opponent_napstablook.flirtTalk3,
                              text.b_opponent_napstablook.flirtTalk4
                           ][flirtValue]
                        ];
                        if (flirtValue < 3) {
                           statustext = [
                              [
                                 text.b_opponent_napstablook.status4,
                                 text.b_opponent_napstablook.status5,
                                 text.b_opponent_napstablook.status5a
                              ][flirtValue]
                           ];
                        } else {
                           volatile.sparable = true;
                           save.data.n.state_wastelands_napstablook = 1;
                        }
                     }
                     break;
               }
               break;
            case 'fight':
               if (
                  (!volatile.vars.sour || volatile.vars.restoreMercy === 0) &&
                  (volatile.vars.cheer > 2 || volatile.vars.flirt > 2)
               ) {
                  doCry = true;
                  volatile.vars.sour = true;
                  monstertext = [ text.b_opponent_napstablook.insultTalk1 ];
               } else {
                  monstertext = [
                     text.b_opponent_napstablook.idleTalk1,
                     text.b_opponent_napstablook.idleTalk2,
                     text.b_opponent_napstablook.idleTalk3
                  ];
               }
               if (volatile.vars.sour) {
                  volatile.vars.restoreMercy = 2;
               }
               if (await battler.attack(volatile, { power: choice.score }, true, true)) {
                  volatile.sparable = true;
                  monstertext = [ text.b_opponent_napstablook.deadTalk ];
                  if (volatile.vars.sour) {
                     save.data.n.state_wastelands_napstablook = 2;
                  } else {
                     save.data.n.state_wastelands_napstablook = 4;
                  }
               }
               break;
            case 'spare':
            case 'item':
            case 'fake':
               monstertext = [
                  text.b_opponent_napstablook.idleTalk1,
                  text.b_opponent_napstablook.idleTalk2,
                  text.b_opponent_napstablook.idleTalk3
               ];
               break;
         }
         await battler.human(...humantext);
         if (volatile.sparable) {
            const music = battler.music as CosmosInstance;
            music.gain.modulate(timer, 300, 0).then(() => {
               music.stop();
            });
         }
         if (volatile.vars.hat && choice.type === 'act' && choice.act === 'threat') {
            const list = volatile.container.objects[0].objects;
            list.splice(list.indexOf(volatile.vars.hat), 1);
            volatile.vars.hat = null;
         }
         if (doHat) {
            let stop = false;
            header('x1').then(async () => {
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  commonPatterns.napstablook(3);
                  await timer.pause(500);
                  stop || (await next());
               });
            });
            header('x2').then(async () => {
               const hat = (volatile.vars.hat = new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  position: { x: 10, y: -72 },
                  scale: { x: 1, y: 1 },
                  resources: content.ibcNapstaHat
               }));
               await content.ibcNapstaHat.load();
               volatile.container.objects[0].attach(hat);
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  await renderer.on('tick');
                  hat.index < 5 && (await next());
               });
               hat.disable();
            });
            header('x3').then(() => {
               stop = true;
            });
         }
         if (volatile.vars.sour) {
            volatile.vars.sourTurns++;
            statustext = [
               text.b_opponent_napstablook.status8,
               text.b_opponent_napstablook.status9,
               text.b_opponent_napstablook.status10
            ];
         }
         doCry && commonPatterns.napstablook(4);
         monstertext.length > 0 &&
            (await battler.monster(
               false,
               { x: 385 / 2, y: 85 / 2 },
               battler.bubbles.napstablook,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            ));
         if (volatile.sparable) {
            battler.spare(target, true);
         } else {
            statustext.length > 0 ||
               (statustext = [
                  text.b_opponent_napstablook.status6,
                  text.b_opponent_napstablook.status7,
                  text.b_opponent_napstablook.status8
               ]);
            battler.status = statustext[Math.floor(random.next() * statustext.length)];
            if (volatile.vars.hat) {
               battler.resume();
            } else {
               await battler.box.size.modulate(timer, 300, { x: 120, y: 65 });
               Object.assign(battler.SOUL.position, { x: 160, y: 160 });
               battler.resume(async () => {
                  battler.SOUL.alpha.value = 1;
                  const turn = volatile.vars.turns++;
                  if (turn === 1 || (turn > 1 && random.next() < 0.3)) {
                     await commonPatterns.napstablook(0);
                  } else {
                     await commonPatterns.napstablook(turn === 0 ? 1 : random.next() < 0.3 ? 2 : 1);
                  }
                  battler.SOUL.alpha.value = 0;
                  await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               });
            }
         }
      },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcNapstablook
         }).on_legacy('tick', self => {
            const time = timer.value;
            const blookyPositionY = new CosmosValue();
            return () => {
               self.position.y = blookyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 4;
            };
         })
   }),
   toriel: new OutertaleOpponent({
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcTorielBattle1,
         content.ibcTorielBattle2,
         content.ibuBossSOUL,
         content.ibuBossBreak,
         content.ibuBossShatter,
         content.asTwinklyLaugh,
         content.asLanding,
         content.avTwinkly1,
         content.idcTwinklyCapping,
         content.idcTwinklyLaugh,
         content.ibuBubbleTwinkly,
         content.avAsriel2,
         content.idcAsrielEvil,
         content.idcAsrielEvilClosed,
         content.idcAsrielPlain,
         content.idcAsrielPlainClosed,
         content.idcAsrielSmirk,
         content.ibcAsrielCutscene1,
         content.asCymbal,
         content.ibbPaw,
         content.ibbPawInverted,
         content.ibbFirebol,
         content.ibuMercyDud,
         content.ibcAsrielMagic
      ),
      exp: 0,
      hp: 440,
      df: 1,
      name: text.b_opponent_toriel.name,
      acts: () => [
         [ 'check', text.b_opponent_toriel.act_check ],
         [ 'talk', [] ]
      ],
      metadata: { reactSpanner: true },
      sparable: false,
      async handler (choice, target, volatile) {
         volatile.vars.talk || (volatile.vars.talk = 0);
         volatile.vars.mercy || (volatile.vars.mercy = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as string[][];
         let doEnd = false;
         let stopMusic = false;
         let doSpare = false;
         let doAssist = false;
         switch (choice.type) {
            case 'act':
               switch (choice.act) {
                  case 'talk':
                     if (volatile.vars.vulnerable) {
                        doSpare = true;
                        humantext = text.b_opponent_toriel.talk8;
                     } else {
                        const index = Math.min(volatile.vars.talk++, 6);
                        humantext = [
                           text.b_opponent_toriel.talk1,
                           text.b_opponent_toriel.talk2,
                           text.b_opponent_toriel.talk3,
                           text.b_opponent_toriel.talk4,
                           text.b_opponent_toriel.talk5,
                           text.b_opponent_toriel.talk6,
                           text.b_opponent_toriel.talk7
                        ][index];
                        if (!save.data.b.oops && index === 5 && save.data.b.w_state_diary) {
                           battler.assist = true;
                           humantext.push(...text.b_opponent_toriel.talk6a);
                        }
                     }
                     break;
               }
               break;
            case 'fight':
               if (save.data.b.genocide || volatile.vars.vulnerable || volatile.hp <= opponents.toriel.hp / 3) {
                  const genocideQueue = save.data.b.genocide
                     ? new CosmosInventory(
                          content.avAsriel2,
                          inventories.iocAsriel,
                          inventories.idcAsriel,
                          content.amShock
                       ).load()
                     : void 0;
                  switch (save.flag.n.state_toriel) {
                     case 0:
                        save.flag.n.state_toriel = 1;
                        break;
                     case 1:
                        save.flag.n.state_toriel = 7;
                        break;
                     case 2:
                     case 9:
                        save.flag.n.state_toriel = 5;
                        break;
                     case 3:
                        save.flag.n.state_toriel = 4;
                        break;
                     case 4:
                     case 5:
                        save.flag.n.state_toriel = 11;
                        break;
                     case 6:
                     case 12:
                     case 12.1:
                     case 12.2:
                     case 12.3:
                     case 14:
                     case 14.1:
                     case 14.2:
                     case 14.3:
                        save.flag.n.state_toriel = 15;
                        break;
                     case 8:
                     case 8.1:
                     case 8.2:
                     case 8.3:
                        save.flag.n.state_toriel = 10;
                        break;
                     case 10:
                        save.flag.n.state_toriel = 13;
                        break;
                  }
                  battler.volatile[0].vars.dead = 1;
                  battler.music?.stop();
                  await battler.attack(volatile, { power: -999999, operation: 'add' }, true, true);
                  await timer.pause(350);
                  battler.volatile[0].vars.dead = 2;
                  assets.sounds.noise.instance(timer);
                  const position = battler.volatile[0].container.position;
                  const base = position.x;
                  position.x = base + 3;
                  await timer.pause(70);
                  position.x = base - 3;
                  await timer.pause(70);
                  position.x = base + 2;
                  await timer.pause(70);
                  position.x = base + 1;
                  await timer.pause(70);
                  position.x = base;
                  await battler.alpha.modulate(timer, 850, 0);
                  save.data.n.state_wastelands_toriel = 2;
                  await timer.pause(350);
                  function susky (header: string) {
                     header[0] === 'x' && (battler.volatile[0].vars.dead = +header[1] + 1);
                  }
                  typer.on('header', susky);
                  events.on('exit').then(() => {
                     typer.off('header', susky);
                  });
                  await battler.monster(
                     false,
                     { x: 385 / 2, y: 95 / 2 },
                     battler.bubbles.napstablook,
                     ...(volatile.vars.vulnerable
                        ? text.b_opponent_toriel.death1
                        : save.data.b.genocide
                        ? text.b_opponent_toriel.death2
                        : text.b_opponent_toriel.death3)
                  );
                  await battler.vaporize(volatile.container.objects[0]);
                  save.data.n.exp = 200;
                  const baze = new CosmosPoint({ x: 160, y: 83 });
                  const bossSOUL = new CosmosSprite({
                     alpha: 0,
                     anchor: 0,
                     position: baze,
                     frames: [ content.ibuBossSOUL ],
                     scale: 0.5
                  }).on('tick', function () {
                     this.position = baze.add(Math.random() * 4 - 2, Math.random() * 4 - 2);
                  });
                  renderer.attach('menu', bossSOUL);
                  battler.box.size.x = 1000;
                  battler.box.size.y = 1000;
                  battler.box.position.x = 160;
                  battler.box.position.y = 120;
                  battler.SOUL.position.x = 160;
                  battler.SOUL.position.y = 123;
                  battler.SOUL.alpha.value = 1;
                  battler.stat.speed.value = 0.3;
                  game.movement = true;
                  await bossSOUL.alpha.modulate(timer, 2500, 1);
                  await timer.pause(500);
                  game.movement = false;
                  battler.stat.speed.value = 2;
                  if (save.data.b.genocide && save.flag.n.genocide_twinkly < resetThreshold()) {
                     battler.SOUL.alpha.value = 0;
                     save.flag.n.progress_twinkly = 3;
                     renderer.alpha.value = 0;
                     assets.sounds.noise.instance(timer);
                     const time = timer.value;
                     const battleStar = new CosmosObject({
                        position: { x: 160 }
                     }).on('tick', function () {
                        this.position.y = 80 + CosmosMath.wave(((timer.value - time) % 2500) / 2500) * 5;
                     });
                     battleStar.objects[0] = faces.twinklyCapping;
                     renderer.attach('menu', battleStar);
                     renderer.detach('menu', bossSOUL);
                     await timer.pause(300);
                     renderer.alpha.value = 1;
                     assets.sounds.noise.instance(timer);
                     await timer.pause(1000);
                     await battler.monster(
                        false,
                        { x: 188.5, y: 58 },
                        battler.bubbles.twinkly,
                        ...text.b_opponent_toriel.theft
                     );
                     battleStar.objects[0] = faces.twinklyLaugh.enable();
                     assets.sounds.twinklyLaugh.instance(timer);
                     const sound = assets.sounds.cymbal.instance(timer);
                     const fader = new CosmosRectangle({
                        alpha: 0,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        priority: 1,
                        fill: 'white',
                        stroke: 'transparent'
                     });
                     renderer.attach('menu', fader);
                     await Promise.all([ genocideQueue, fader.alpha.modulate(timer, 5000, 1) ]);
                     sound.stop();
                     renderer.detach('menu', battleStar);
                     speech.state.face = null;
                     const goatbro = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 160, y: 120 },
                        resources: content.ibcAsrielCutscene1,
                        objects: [
                           new CosmosObject({
                              position: { x: -0.5, y: -56.5 },
                              metadata: { face: null as CosmosSprite | null }
                           }).on('tick', function () {
                              this.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                              if (this.metadata.face !== speech.state.face) {
                                 this.metadata.face = speech.state.face;
                                 typer.mode === 'idle' || (game.text = '');
                              }
                           })
                        ]
                     }).on('tick', function () {
                        this.index === 3 && this.active && this.disable();
                     });
                     renderer.attach('menu', goatbro);
                     await timer.pause(1000);
                     await fader.alpha.modulate(timer, 3000, 0);
                     await timer.pause(500);
                     goatbro.enable();
                     renderer.detach('menu', fader);
                     await timer.when(() => !goatbro.active);
                     await timer.pause(1250);
                     speech.state.face = commonFaces.asrielPlain;
                     await battler.monster(
                        false,
                        { x: 180.5, y: 50 },
                        battler.bubbles.twinkly,
                        ...[
                           text.b_opponent_toriel.criminal1,
                           text.b_opponent_toriel.criminal2,
                           text.b_opponent_toriel.criminal3
                        ][Math.min(save.flag.n.genocide_twinkly++, 2)]
                     );
                     const truemercy = new CosmosAnimation({
                        anchor: 0,
                        resources: content.ibuMercy
                     });
                     const fakemercy = new CosmosSprite({
                        alpha: 0,
                        anchor: 0,
                        frames: [ content.ibuMercyDud ]
                     });
                     const shaker = new CosmosValue(2);
                     const buttonPos = new CosmosPoint(160, 160);
                     const random3 = random.clone();
                     const mercybox = new CosmosObject({
                        objects: [ truemercy, fakemercy ]
                     }).on('tick', function () {
                        this.position = buttonPos.add(
                           (random3.next() - 0.5) * shaker.value * 2,
                           (random3.next() - 0.5) * shaker.value * 2
                        );
                     });
                     renderer.attach('menu', mercybox);
                     assets.sounds.landing.instance(timer);
                     mercybox.alpha.value = 1;
                     shaker.modulate(timer, 300, 1, 0);
                     await timer.pause(800);
                     if (save.flag.n.genocide_twinkly < 2) {
                        await battler.monster(
                           false,
                           { x: 180.5, y: 50 },
                           battler.bubbles.twinkly,
                           ...text.b_opponent_toriel.magic1
                        );
                     }
                     await timer.pause(500);
                     const fakeboi = new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { x: 160, y: 120 },
                        frames: [ content.ibcAsrielMagic ]
                     });
                     renderer.detach('menu', goatbro);
                     renderer.attach('menu', fakeboi);
                     await shaker.modulate(timer, 1000, 1, 1);
                     await timer.pause(1000);
                     await Promise.all([ fakemercy.alpha.modulate(timer, 400, 0, 1), shaker.modulate(timer, 600, 1, 0) ]);
                     truemercy.alpha.value = 0;
                     await timer.pause(1700);
                     await battler.vaporize(fakemercy);
                     await timer.pause(1000);
                     await battler.monster(
                        false,
                        { x: 180.5, y: 50 },
                        battler.bubbles.twinkly,
                        ...text.b_opponent_toriel.magic2
                     );
                     battler.garbage.push([ 'menu', fakeboi ], [ 'menu', mercybox ]);
                  } else {
                     save.data.b.genocide = false;
                     const screen = new CosmosObject();
                     renderer.attach('menu', screen);
                     renderer.detach('menu', bossSOUL);
                     screen.objects[0] = new CosmosSprite({
                        anchor: 0,
                        frames: [ content.ibuBossBreak ],
                        position: bossSOUL.position.value(),
                        scale: 0.5
                     });
                     assets.sounds.break.instance(timer);
                     await timer.pause(1250);
                     const random3 = random.clone();
                     screen.objects = CosmosUtils.populate(6, index =>
                        new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           resources: content.ibuBossShatter,
                           position: bossSOUL.position.add(index * 2 - (index < 3 ? 7 : 3), (index % 3) * 3).value(),
                           scale: 0.5,
                           metadata: { g: 0, d: random3.next() * 360 }
                        }).on('tick', function () {
                           this.position = this.position
                              .endpoint(this.metadata.d, 3.5)
                              .add(0, (this.metadata.g += 0.1));
                        })
                     );
                     assets.sounds.shatter.instance(timer);
                     battler.garbage.push([ 'menu', screen ]);
                     await timer.pause(4150);
                  }
                  events.fire('exit');
                  return;
               } else {
                  await battler.attack(
                     volatile,
                     { power: -(choice.score * 100 * (1.25 - volatile.hp / opponents.toriel.hp)), operation: 'add' },
                     true,
                     true
                  );
               }
               break;
            case 'assist':
               doAssist = true;
               stopMusic = true;
               volatile.vars.mercy = 24;
            case 'spare':
            case 'fake':
               doSpare = true;
               break;
            case 'flee':
               if (volatile.vars.vulnerable) {
                  save.data.n.state_wastelands_toriel = 3;
               } else {
                  save.data.n.state_wastelands_toriel = 4;
               }
               events.fire('escape');
               battler.music?.stop();
               return;
            case 'item':
               if (choice.item === 'spanner') {
                  humantext = text.b_opponent_toriel.spannerText;
                  if (volatile.vars.spannerRepeat) {
                     monstertext = [ text.b_opponent_toriel.spannerTalkRepeat ];
                  } else {
                     monstertext = [ text.b_opponent_toriel.spannerTalk ];
                     volatile.vars.spannerRepeat = true;
                  }
               }
               break;
         }
         if (doSpare) {
            const mercyValue = ++volatile.vars.mercy;
            if (mercyValue === 12) {
               volatile.container.objects[0].metadata.sad = true;
            }
            if (mercyValue === 15) {
               volatile.vars.vulnerable = true;
               stopMusic = true;
            }
            if (mercyValue < 25) {
               monstertext = [
                  [
                     text.b_opponent_toriel.spareTalk1,
                     text.b_opponent_toriel.spareTalk2,
                     text.b_opponent_toriel.spareTalk3,
                     text.b_opponent_toriel.spareTalk4,
                     text.b_opponent_toriel.spareTalk5,
                     text.b_opponent_toriel.spareTalk6,
                     text.b_opponent_toriel.spareTalk7,
                     text.b_opponent_toriel.spareTalk8,
                     text.b_opponent_toriel.spareTalk9,
                     text.b_opponent_toriel.spareTalk10,
                     text.b_opponent_toriel.spareTalk11,
                     text.b_opponent_toriel.spareTalk12,
                     text.b_opponent_toriel.spareTalk13,
                     text.b_opponent_toriel.spareTalk14,
                     text.b_opponent_toriel.spareTalk15,
                     text.b_opponent_toriel.spareTalk16,
                     text.b_opponent_toriel.spareTalk17,
                     text.b_opponent_toriel.spareTalk18,
                     text.b_opponent_toriel.spareTalk19,
                     text.b_opponent_toriel.spareTalk20,
                     text.b_opponent_toriel.spareTalk21,
                     text.b_opponent_toriel.spareTalk22,
                     text.b_opponent_toriel.spareTalk23,
                     text.b_opponent_toriel.spareTalk24
                  ][mercyValue - 1]
               ];
            } else {
               doEnd = true;
               if (save.data.b.genocide) {
                  save.data.n.state_wastelands_toriel = 1;
                  monstertext = [ text.b_opponent_toriel.spareTalk28a ];
               } else if (doAssist) {
                  monstertext = [ text.b_opponent_toriel.spareTalk28c ];
               } else {
                  save.data.n.state_wastelands_toriel = 1;
                  monstertext = [ text.b_opponent_toriel.spareTalk28b ];
               }
            }
         }
         await battler.human(...humantext);
         if (stopMusic) {
            const music = battler.music as CosmosInstance;
            music.gain.modulate(timer, 300, 0).then(() => {
               music.stop();
            });
            if (doSpare && !doAssist) {
               await timer.pause(850);
               oops();
               battler.assist = false;
               await timer.pause(1000);
            }
         }
         if (volatile.vars.vulnerable) {
            statustext = [ text.b_opponent_toriel.status5 ];
         }
         volatile.container.objects[0].objects[0].metadata.face = true;
         monstertext.length > 0 &&
            (await battler.monster(
               false,
               { x: 385 / 2, y: 35 / 2 },
               battler.bubbles.napstablook,
               ...monstertext[Math.floor(random.next() * monstertext.length)]
            ));
         if (doAssist) {
            volatile.container.objects[0].metadata.sus = true;
         }
         volatile.container.objects[0].objects[0].metadata.face = false;
         statustext.length > 0 ||
            (statustext = [
               text.b_opponent_toriel.status2,
               text.b_opponent_toriel.status3,
               text.b_opponent_toriel.status4
            ]);
         battler.status = statustext[Math.floor(random.next() * statustext.length)];
         if (doEnd) {
            switch (save.flag.n.state_toriel) {
               case 0:
                  save.flag.n.state_toriel = 3;
                  break;
               case 1:
                  save.flag.n.state_toriel = 2;
                  break;
               case 2:
               case 6:
                  save.flag.n.state_toriel = 12;
                  break;
               case 3:
                  save.flag.n.state_toriel = 8;
                  break;
               case 4:
               case 10:
                  save.flag.n.state_toriel = 6;
                  break;
               case 5:
               case 11:
               case 11.1:
               case 11.2:
               case 11.3:
               case 13:
               case 13.1:
               case 13.2:
               case 13.3:
                  save.flag.n.state_toriel = 15;
                  break;
               case 7:
               case 7.1:
               case 7.2:
               case 7.3:
                  save.flag.n.state_toriel = 9;
                  break;
               case 9:
                  save.flag.n.state_toriel = 14;
                  break;
            }
            if (!save.data.b.oops) {
               const overlay = new CosmosRectangle({
                  alpha: 0,
                  size: { x: 1000, y: 1000 },
                  position: { x: 160, y: 120 },
                  anchor: 0,
                  fill: 'black',
                  stroke: 'transparent'
               });
               renderer.attach('menu', overlay);
               const queue = content.amCharacutscene.load();
               await Promise.all([
                  content.asSavior.load(),
                  overlay.alpha.modulate(timer, 1350, 1).then(() => timer.pause(1000))
               ]);
               assets.sounds.savior.instance(timer);
               await Promise.all([ queue, timer.pause(1350) ]);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.b_opponent_toriel.cutscene1);
               const muzic = assets.music.characutscene.instance(timer);
               muzic.gain.value /= 2;
               muzic.gain.modulate(timer, 300, muzic.gain.value * 2);
               await typer.text(...text.b_opponent_toriel.cutscene2);
               atlas.switch(null);
               await muzic!.gain.modulate(timer, 1500, 0);
               content.asSavior.unload();
               muzic!.stop();
               content.amCharacutscene.unload();
               battler.garbage.push([ 'menu', overlay ]);
            }
            events.fire('exit');
         } else if (!volatile.vars.vulnerable) {
            await battler.box.size.modulate(timer, 300, { x: 100, y: 65 });
            battler.resume(async () => {
               const turnValue = ++volatile.vars.turns;
               battler.SOUL.alpha.value = 1;
               if (save.data.n.hp > 4) {
                  const ats = (volatile.vars.attacktypes ??= []) as number[];
                  let attacktype = -1;
                  while (attacktype === -1 || ats.includes(attacktype)) {
                     attacktype = Math.floor(random.next() * 4);
                  }
                  ats.push(attacktype);
                  ats.length > 2 && ats.splice(0, 2);
                  await patterns.toriel(attacktype + 1, turnValue > 5);
               } else {
                  await patterns.toriel(0);
               }
               battler.SOUL.alpha.value = 0;
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
            });
         } else {
            battler.resume();
         }
      },
      goodbye: () =>
         new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            metadata: { size: { x: 72, y: 102 } },
            resources: content.ibcTorielBattle2,
            objects: [
               new CosmosObject({
                  position: { x: -0.5, y: -84.5 }
               }).on_legacy('tick', self => {
                  let face = null as CosmosSprite | null;
                  return () => {
                     if (self.metadata.face) {
                        self.alpha.value = 1;
                        self.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                        if (face !== speech.state.face) {
                           face = speech.state.face;
                           typer.mode === 'idle' || (game.text = '');
                        }
                     } else {
                        self.objects = [];
                     }
                  };
               })
            ]
         }).on_legacy('tick', self => () => {
            self.index = battler.volatile[0].vars.dead || 0;
         }),
      sprite: () =>
         new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcTorielBattle1,
            objects: [
               new CosmosObject({
                  position: { x: -0.5, y: -84.5 }
               }).on_legacy('tick', self => {
                  let face = null as CosmosSprite | null;
                  return () => {
                     if (self.metadata.face) {
                        self.alpha.value = 1;
                        self.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                        if (face !== speech.state.face) {
                           face = speech.state.face;
                           typer.mode === 'idle' || (game.text = '');
                        }
                     } else {
                        self.objects = [];
                     }
                  };
               })
            ]
         }).on_legacy('tick', self => () => {
            if (self.metadata.sus) {
               self.index = 2;
            } else if (self.metadata.sad) {
               self.index = 1;
            } else {
               self.index = 0;
            }
         })
   })
};

export default opponents;

CosmosUtils.status(`LOAD MODULE: OUTLANDS OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
