import assets from '../assets';
import { OutertaleOpponent, OutertaleTurnState, OutertaleVolatile } from '../classes';
import commonPatterns from '../common/patterns';
import commonText from '../common/text';
import content from '../content';
import { atlas, events, game, random, renderer, timer, typer } from '../core';
import { CosmosInventory } from '../engine/core';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue, CosmosValueRandom } from '../engine/numerics';
import { CosmosHitbox, CosmosObject } from '../engine/renderer';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import { battler, choicer, dialogue, heal, oops, world } from '../mantle';
import save from '../save';
import patterns from './patterns';
import text from './text';

export type MadDummyMetadata = {
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
   random3: CosmosValueRandom;
};

export async function kiddTurn (opkey: string, allowpac = true) {
   await battler.human(
      ...[ text.b_party_kidd.mkTurn1, text.b_party_kidd.mkTurn2, text.b_party_kidd.mkTurn3, [] ][
         Math.min(save.data.n.state_foundry_kiddturns++, 3)
      ],
      ...text.b_party_kidd.mkTurnX
   );
   switch (choicer.result) {
      case 0:
         if (!save.data.b.f_state_kidd_mercy) {
            save.data.b.f_state_kidd_mercy = true;
            await battler.human(...text.b_party_kidd.mkTurnMercy1);
         }
         battler.spare();
         return 'pacify';
      case 1:
         if (!save.data.b.f_state_kidd_act) {
            save.data.b.f_state_kidd_act = true;
            await battler.human(...text.b_party_kidd.mkTurnAct1);
         }
         const act = CosmosMath.weigh([
            [ 0, 4 ],
            [ 1, 4 ],
            [ 2, 3 ],
            [ 3, 1 ]
         ]) as 0 | 1 | 2 | 3;
         typer.variables.x = CosmosUtils.provide(battler.target!.opponent.name).slice(2);
         await battler.human(
            ...[
               text.b_party_kidd.mkTurnActRand1,
               text.b_party_kidd.mkTurnActRand2,
               text.b_party_kidd.mkTurnActRand3,
               text.b_party_kidd.mkTurnActRand4
            ][act](opkey)[battler.rand(act === 3 ? 1 : 3)]
         );
         if (opkey !== 'muffet') {
            await battler.human(
               ...[
                  text.b_party_kidd.mkTurnActResult1(opkey),
                  text.b_party_kidd.mkTurnActResult2(opkey),
                  text.b_party_kidd.mkTurnActResult3(opkey, battler.alive.length > 1),
                  text.b_party_kidd.mkTurnActResult4(opkey, battler.alive.length > 1, allowpac)
               ][act]
            );
            switch (act) {
               case 0:
                  battler.stat.monsterdef.modifiers.push([ 'add', -0.5, 1 ]);
                  return 'defdown';
               case 1:
                  battler.stat.monsteratk.modifiers.push([ 'add', -0.5, 1 ]);
                  return 'atkdown';
               case 2:
                  return 'skip';
               case 3:
                  const active = battler.target!;
                  active.sparable = true;
                  battler.spare(battler.volatile.indexOf(active));
                  return 'pacify';
            }
         } else {
            await battler.human(...text.b_party_kidd.mkTurnActResult0);
            return void 0;
         }
      case 2:
         if (!save.data.b.f_state_kidd_magic) {
            save.data.b.f_state_kidd_magic = true;
            await battler.human(...text.b_party_kidd.mkMagic1);
         } else {
            await battler.human(
               ...[ text.b_party_kidd.mkMagic2a, text.b_party_kidd.mkMagic2b, text.b_party_kidd.mkMagic2c ][
                  battler.rand(3)
               ]
            );
         }
         heal(2);
         return void 0;
      case 3:
         if (!save.data.b.f_state_kidd_fight) {
            await battler.human(...text.b_party_kidd.mkTurnFight1);
            if ((choicer.result as number) === 1) {
               if (!save.data.b.oops) {
                  oops();
                  await timer.pause(1000);
               }
               await battler.human(...text.b_party_kidd.mkTurnFight2a);
               save.data.b.f_state_kidd_fight = true;
            } else {
               await battler.human(...text.b_party_kidd.mkTurnFight2b);
               return void 0;
            }
         }
         if (battler.bullied.includes(battler.target!)) {
            await battler.human(
               ...(save.data.n.state_foundry_kiddbully < 2
                  ? [ text.b_party_kidd.mkWeaken1, text.b_party_kidd.mkWeaken2 ][save.data.n.state_foundry_kiddbully++]
                  : [ text.b_party_kidd.mkWeaken3a, text.b_party_kidd.mkWeaken3b, text.b_party_kidd.mkWeaken3c ][
                       battler.rand(3)
                    ])
            );
         } else {
            await battler.human(
               ...[ text.b_party_kidd.mkTurnFight3a, text.b_party_kidd.mkTurnFight3b, text.b_party_kidd.mkTurnFight3c ][
                  battler.rand(3)
               ]
            );
         }
         return 'fight';
   }
}

export async function kiddFight (volatile: OutertaleVolatile) {
   return await battler.attack(
      volatile,
      volatile.sparable ? { power: 0, operation: 'multiply' } : { item: 'spanner', power: 0.2 + random.compute() * 0.6 }
   );
}

export async function kiddHandler (state: OutertaleTurnState<any>, opkey: string, allowpac = true) {
   if (world.monty && battler.alive.length > 0 && state.volatile.alive) {
      if (save.data.n.state_foundry_muffet === 1) {
         if (!save.data.b.f_state_kidd_trauma) {
            await battler.human(...text.b_party_kidd.mkNope);
            save.data.b.f_state_kidd_trauma = true;
         }
      } else {
         if (!state.dead) {
            switch (await kiddTurn(opkey, allowpac)) {
               case 'fight': {
                  if (await kiddFight(state.volatile)) {
                     world.kill();
                     battler.g += (state.opponent.g ?? 0) * 2;
                     state.dead = true;
                  } else {
                     state.hurt = true;
                  }
                  break;
               }
               case 'skip': {
                  state.vars.kidskip = true;
                  break;
               }
            }
         }
         if (state.dead) {
            if (battler.alive.length > 0) {
               await battler.human(
                  ...[
                     text.b_party_kidd.mkDeath1,
                     text.b_party_kidd.mkDeath2,
                     text.b_party_kidd.mkDeath3,
                     text.b_party_kidd.mkDeath4
                  ][Math.min(save.data.n.state_foundry_kidddeath++, 3)]
               );
            } else {
               opkey === 'muffet' ||
                  events.on('battle-exit').then(async () => {
                     const move = battler.encounter_state.movement;
                     battler.encounter_state.movement = false;
                     await dialogue(
                        'dialoguerBottom',
                        ...[
                           text.b_party_kidd.mkDeath1OW,
                           text.b_party_kidd.mkDeath2OW,
                           text.b_party_kidd.mkDeath3OW,
                           text.b_party_kidd.mkDeath4OW
                        ][Math.min(save.data.n.state_foundry_kidddeath++, 3)]
                     );
                     move && (game.movement = true);
                  });
            }
         }
      }
   }
}

export const opponents = {
   maddummy: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_maddummy,
      assets: new CosmosInventory(
         content.ibcDummy,
         content.ibcDummyGlad,
         content.ibcDummyShock,
         content.ibcDummyGladHugged,
         content.ibcDummyMadBase,
         content.ibcDummyMadBody,
         content.ibcDummyMadHead,
         content.ibcDummyMadTorso,
         content.ibcNapstablook,
         content.ibbTear,
         content.asLanding,
         content.ibbMissile,
         content.ibbDummy,
         content.ibbDummyknife,
         content.ibbScribble,
         content.asArrow,
         content.asBell,
         content.asSlidewhistle
      ),
      exp: 42,
      hp: 200,
      df: 0,
      name: text.b_opponent_maddummy.name,
      acts: () => [
         [ 'check', text.b_opponent_maddummy.act_check ],
         [ 'talk', text.b_opponent_maddummy.act_talk ],
         [ 'hug', text.b_opponent_maddummy.act_hug ],
         [ 'slap', text.b_opponent_maddummy.act_slap ],
         [ 'flirt', text.b_opponent_maddummy.act_flirt ]
      ],
      ghost: true,
      sparable: false,
      handler: ((
         gold: number,
         talkie: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: CosmosProvider<string[]>
      ) => {
         const dialogueListener = (header: string) => {
            switch (header) {
               case 'x1':
                  battler.volatile[0].vars.face = 0;
                  break;
               case 'x2':
                  battler.volatile[0].vars.face = 1;
                  break;
               case 'x3':
                  battler.volatile[0].vars.face = 2;
                  break;
               case 'x4':
                  battler.volatile[0].vars.face = 3;
                  break;
               case 'x5':
                  battler.volatile[0].vars.face = 4;
                  break;
               case 'x6':
                  battler.volatile[0].vars.face = 5;
                  break;
            }
         };
         const talk = async (target: number, ...lines: string[]) => {
            await talkie(target, ...lines);
            battler.volatile[0].vars.face = 0;
         };
         return async (choice, target, volatile) => {
            let idle = true;
            let statustext = defaultStatus;
            volatile.vars.pauseact = 0;
            const MDM = volatile.container.objects[0].metadata as MadDummyMetadata;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            if (!save.data.b.genocide && volatile.vars.activate < 1) {
               volatile.vars.activate = 1;
               typer.on('header', dialogueListener);
            }
            switch (choice.type) {
               case 'fight':
                  if (save.data.b.genocide) {
                     volatile.container.objects[0].frames = [ content.ibcDummyShock ];
                     if (await battler.attack(volatile, { power: 0, operation: 'multiply' })) {
                        world.kill();
                        battler.exp += 42;
                        save.data.n.state_foundry_maddummy = 1;
                        battler.music?.stop();
                        return;
                     }
                  } else {
                     MDM.ragdolled = true;
                     volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                     assets.sounds.strike.instance(timer);
                     MDM.mode = 'ragdoll';
                     volatile.vars.attak || (battler.music && (battler.music.rate.value = 0));
                     await battler.attack(volatile, { operation: 'none' }, true, true);
                     await timer.pause(volatile.vars.attak ? 500 : 2000);
                     MDM.mode = 'restore';
                     MDM.ragdolled = false;
                     volatile.vars.attak || battler.music?.rate.modulate(timer, 500, 1);
                     if (!volatile.vars.attak) {
                        await timer.pause(1500);
                        idle = false;
                        volatile.vars.attak = true;
                        await talk(target, ...text.b_opponent_maddummy.fightFail);
                        statustext = text.b_opponent_maddummy.fightFailStatus;
                     }
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt': {
                        save.data.b.flirt_maddummy = true;
                        volatile.flirted = true;
                        break;
                     }
                     case 'hug':
                        if (save.data.b.genocide) {
                           volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                        }
                        if (volatile.vars.phase < 3) {
                           idle = false;
                           volatile.vars.pauseact = 1;
                           if (save.data.b.genocide && volatile.vars.hugs === 2) {
                              volatile.container.objects[0].frames = [ content.ibcDummyGladHugged ];
                              save.data.n.state_foundry_maddummy = 4;
                              volatile.sparable = true;
                           }
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.hugTalk1(),
                                 text.b_opponent_maddummy.hugTalk2(),
                                 text.b_opponent_maddummy.hugTalk3(),
                                 text.b_opponent_maddummy.hugTalk4
                              ][Math.min(volatile.vars.hugs++, 3)]
                           );
                           if (save.data.b.genocide && volatile.vars.hugs === 3) {
                              battler.music?.stop();
                              battler.spare();
                              return;
                           }
                        }
                        break;
                     case 'slap':
                        if (save.data.b.genocide) {
                           battler.music?.stop();
                           save.data.n.state_foundry_maddummy = 5;
                           assets.sounds.slidewhistle.instance(timer);
                           await volatile.container.position.modulate(timer, 1250, {
                              x: volatile.container.x,
                              y: -80
                           });
                           await timer.pause(650);
                           await battler.human(...text.b_opponent_dummy.slapped2);
                           battler.spare();
                           return;
                        } else {
                           volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                           if (volatile.vars.phase < 3) {
                              idle = false;
                              volatile.vars.pauseact = 1;
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_maddummy.slapTalk1,
                                    text.b_opponent_maddummy.slapTalk2,
                                    text.b_opponent_maddummy.slapTalk3,
                                    text.b_opponent_maddummy.slapTalk4
                                 ][Math.min(volatile.vars.slaps++, 3)]
                              );
                           }
                        }
                        break;
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable) {
                     break;
                  }
                  battler.spare();
                  return;
            }
            if (volatile.vars.phase === 1 && ++volatile.vars.turns === 5) {
               battler.music?.stop();
               if (save.data.b.genocide) {
                  await battler.human(...text.b_opponent_dummy.bored);
               } else {
                  await talk(target, ...text.b_opponent_maddummy.boredTalk);
               }
               volatile.sparable = true;
               battler.spare();
               save.data.n.state_foundry_maddummy = 3;
               typer.off('header', dialogueListener);
            }
            if (battler.alive.length > 0) {
               if (save.data.b.genocide) {
                  if (idle) {
                     await talk(
                        target,
                        ...[
                           text.b_opponent_maddummy.gladTalk1,
                           text.b_opponent_maddummy.gladTalk2,
                           text.b_opponent_maddummy.gladTalk3,
                           text.b_opponent_maddummy.gladTalk4,
                           text.b_opponent_maddummy.gladTalk5,
                           text.b_opponent_maddummy.gladTalk6
                        ][Math.min(volatile.vars.gratitude++, 6)]
                     );
                  }
                  battler.status = CosmosUtils.provide(statustext);
                  battler.resume();
               } else {
                  if (idle) {
                     switch (volatile.vars.phase) {
                        case 1:
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.randTalk1,
                                 text.b_opponent_maddummy.randTalk2,
                                 text.b_opponent_maddummy.randTalk3,
                                 text.b_opponent_maddummy.randTalk4
                              ][battler.rand(4)]
                           );
                           break;
                        case 2:
                           const t = volatile.vars.turns++;
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.phase2Talk1,
                                 text.b_opponent_maddummy.phase2Talk2,
                                 text.b_opponent_maddummy.phase2Talk3,
                                 text.b_opponent_maddummy.phase2Talk4,
                                 text.b_opponent_maddummy.phase2Talk5,
                                 text.b_opponent_maddummy.phase2Talk6,
                                 text.b_opponent_maddummy.phase2Talk7,
                                 text.b_opponent_maddummy.phase2Talk8
                              ][Math.min(t, 7)]
                           );
                           if (t > 2) {
                              MDM.movement.intensity = 2;
                              MDM.movement.sineRate.y = 2;
                              MDM.movement.sinePower.y = 10;
                              MDM.speed = 2;
                              MDM.multiplier = 1.5;
                           }
                           break;
                        case 3:
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.phase3Talk1,
                                 text.b_opponent_maddummy.phase3Talk2,
                                 text.b_opponent_maddummy.phase3Talk3,
                                 text.b_opponent_maddummy.phase3Talk4
                              ][Math.min(volatile.vars.turns++, 3)]
                           );
                           break;
                     }
                  }
                  await battler.resume(async () => {
                     await Promise.all([
                        battler.box.size.modulate(timer, 300, { x: 90, y: 92.5 }),
                        battler.box.position.modulate(timer, 300, { y: 192 - 92.5 / 2 })
                     ]);
                     battler.SOUL.position.set(160);
                     battler.SOUL.alpha.value = 1;
                     await patterns.maddummy();
                     if (volatile.vars.phase === 3 && volatile.vars.turns === 4) {
                        MDM.movement.center.x = 0;
                        MDM.movement.center.y = 0;
                        MDM.movement.intensity = 0;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3a1);
                        MDM.speed = 3;
                        MDM.multiplier = 1.75;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3a2);
                        MDM.speed = 1;
                        MDM.multiplier = 1.25;
                        assets.sounds.bell.instance(timer);
                        const knife = new CosmosHitbox({
                           anchor: 0,
                           size: { x: 30, y: 10 },
                           rotation: 160,
                           position: { x: 240 / 2, y: 120 / 2 },
                           metadata: { bullet: true, damage: 6 },
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbDummyknife ] }) ]
                        });
                        renderer.attach('menu', knife);
                        knife.alpha.modulate(timer, 300, 1, 1);
                        await knife.rotation.modulate(timer, 300, 110, 110);
                        MDM.speed = 4;
                        MDM.multiplier = 2;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3b);
                        assets.sounds.arrow.instance(timer);
                        knife.rotation.value = battler.SOUL.position.angleFrom(knife.position);
                        knife.velocity.set(new CosmosPoint().endpoint(knife.rotation.value, 6));
                        await timer.when(() => knife.position.y > 240);
                        if (save.data.n.hp > 0) {
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await timer.pause(1000);
                           renderer.detach('menu', knife);
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c1);
                           MDM.speed = 4;
                           MDM.multiplier = 2;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c2);
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c3);
                           MDM.speed = 4;
                           MDM.multiplier = 2;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c4);
                           MDM.speed = 3.5;
                           MDM.multiplier = 6;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c5);
                           MDM.speed = 3;
                           MDM.multiplier = 10;
                           let napsta = false;
                           (async () => {
                              while (!napsta) {
                                 await talk(target, ...text.b_opponent_maddummy.phaseChange3d);
                              }
                           })();
                           commonPatterns.napstablook(999);
                           await timer.when(() => volatile.vars.finalhit);
                           napsta = true;
                           typer.skip(true);
                           await timer.pause(1000);
                           save.data.n.hp === 0 && (await timer.pause(Infinity));
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3e);
                           battler.music?.stop();
                           await volatile.container.position.modulate(timer, 1450, { y: -40 });
                           await timer.pause(1650);
                           const time = timer.value;
                           const blookyPositionY = new CosmosValue();
                           const napstaSprite = new CosmosAnimation({
                              active: true,
                              anchor: { y: 1, x: 0 },
                              resources: content.ibcNapstablook
                           }).on('tick', function () {
                              this.position.y =
                                 blookyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 4;
                           });
                           const napstaContainer = new CosmosObject({
                              position: { x: 160, y: 0 },
                              objects: [ napstaSprite ]
                           });
                           renderer.attach('menu', napstaContainer);
                           await napstaContainer.position.modulate(timer, 2500, { y: 94 });
                           if (!save.data.b.genocide && volatile.vars.activate < 2) {
                              volatile.vars.activate = 2;
                              typer.off('header', dialogueListener);
                           }
                           save.data.n.hp === 0 && (await timer.pause(Infinity));
                           await battler.monster(
                              false,
                              { x: 385 / 2, y: 16.5 },
                              battler.bubbles.napstablook,
                              ...text.b_opponent_maddummy.final1()
                           );
                           await napstaContainer.position.modulate(timer, 2000, { y: 0 });
                           renderer.detach('menu', napstaContainer);
                           save.data.n.hp === 0 && (await timer.pause(Infinity));
                           events.fire('exit');
                        }
                        await timer.pause(Infinity);
                     } else {
                        if (volatile.vars.phase === 1 && volatile.vars.hits > 0) {
                           volatile.vars.turns = 0;
                           volatile.vars.phase = 2;
                           MDM.multiplier = 0.5;
                           MDM.speed = 1.5;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange1);
                           statustext = text.b_opponent_maddummy.changeStatus1;
                        } else if (volatile.vars.phase === 2) {
                           if (volatile.vars.hits > 10) {
                              MDM.movement.rate = 0.325;
                           }
                           if (volatile.vars.turns > 3) {
                              MDM.movement.intensity = 2;
                           }
                           if (volatile.vars.hits > 40) {
                              volatile.vars.turns = 0;
                              volatile.vars.phase = 3;
                              const int = MDM.movement.intensity;
                              MDM.movement.center.x = 0;
                              MDM.movement.center.y = 0;
                              MDM.movement.intensity = 0;
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2a);
                              patterns.maddummy(true);
                              await timer.pause(2000);
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2b1);
                              volatile.vars.dudShock = true;
                              const OGspeed = MDM.speed;
                              const OGmultiplier = MDM.multiplier;
                              MDM.speed = 4;
                              MDM.multiplier = 2;
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2b2);
                              MDM.speed = OGspeed;
                              MDM.multiplier = OGmultiplier;
                              volatile.vars.dudSad = true;
                              await timer.pause(2000);
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2c);
                              statustext = text.b_opponent_maddummy.changeStatus2;
                              MDM.movement.center.x = 0;
                              MDM.movement.center.y = 0;
                              MDM.movement.intensity = int;
                           }
                        }
                        await Promise.all([
                           battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 }),
                           battler.box.position.modulate(timer, 300, { y: 160 })
                        ]);
                     }
                     battler.status = CosmosUtils.provide(statustext);
                  });
               }
            } else {
               battler.music?.stop();
            }
         };
      })(
         NaN,
         async (target, ...lines) =>
            save.data.b.genocide
               ? battler.monster(false, { x: 295 / 2, y: 134 / 2 }, battler.bubbles.dummy, ...lines)
               : (async () => {
                    const MDM = battler.volatile[target].container.objects[0].metadata as MadDummyMetadata;
                    const cx = MDM.movement.center.x;
                    const cy = MDM.movement.center.y;
                    const int = MDM.movement.intensity;
                    MDM.movement.center.x = 0;
                    MDM.movement.center.y = 0;
                    MDM.movement.intensity = 0;
                    await battler.monster(
                       false,
                       battler.volatile[target].container.position.add(18, -53),
                       battler.bubbles.napstablook,
                       ...lines
                    );
                    MDM.movement.center.x = cx;
                    MDM.movement.center.y = cy;
                    MDM.movement.intensity = int;
                 })(),
         { turns: 0, slaps: 0, hugs: 0, gratitude: 0, phase: 1, hits: 0, face: 0, activate: 0 },
         () =>
            save.data.b.genocide
               ? [
                    commonText.b_opponent_dummy.status2,
                    commonText.b_opponent_dummy.status3,
                    commonText.b_opponent_dummy.status4
                 ][battler.rand(3)]
               : [
                    text.b_opponent_maddummy.randStatus1,
                    text.b_opponent_maddummy.randStatus2,
                    text.b_opponent_maddummy.randStatus3,
                    text.b_opponent_maddummy.randStatus4,
                    text.b_opponent_maddummy.randStatus5
                 ][battler.rand(5)]
      ),
      sprite: volatyle =>
         save.data.b.genocide
            ? new CosmosSprite({ frames: [ content.ibcDummyGlad ] })
            : new CosmosSprite({
                 anchor: { x: 0, y: 1 },
                 metadata: {
                    size: { y: 48 },
                    speed: 0.5,
                    multiplier: 0.1,
                    time: 0,
                    ragdolled: false,
                    mode: 'normal',
                    movement: {
                       rate: 0.5,
                       intensity: 0,
                       center: new CosmosPoint({ x: 0, y: 0 }),
                       sineRate: { x: 1, y: 4 },
                       sinePower: { x: 45, y: 5 }
                    },
                    random3: random.clone()
                 } as MadDummyMetadata,
                 objects: [
                    new CosmosObject({
                       objects: [
                          new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcDummyMadBase ] }),
                          new CosmosSprite({ anchor: 0, frames: [ content.ibcDummyMadTorso ] }),
                          new CosmosSprite({ anchor: 0, frames: [ content.ibcDummyMadBody ] }),
                          new CosmosAnimation({ anchor: 0, resources: content.ibcDummyMadHead }).on(
                             'tick',
                             function () {
                                this.index = volatyle.vars.face ?? 0;
                             }
                          )
                       ]
                    }),
                    new CosmosHitbox({
                       anchor: { x: 0, y: 1 },
                       size: { x: 59 / 2 + 10, y: 118 / 2 + 10 },
                       position: { x: -2.5, y: 15.5 }
                    })
                 ]
              }).on(
                 'tick',
                 (() => {
                    let rot = 0;
                    let dingus = 0;
                    let fakegrav = 0.5;
                    let lastmode = 'normal';
                    let lastRate = 0.5;
                    let lastCenterX = 0;
                    let lastCenterY = 0;
                    let lastIntensity = 0;
                    let lastSinePowerX = 45;
                    let lastSinePowerY = 5;
                    const movement = {
                       time: 0,
                       intensity: 0,
                       center: { x: 0, y: 0 },
                       rate: 0.5,
                       sinePower: { x: 45, y: 5 }
                    };
                    let trueSpeed = 0.5;
                    let trueMultiplier = 0.1;
                    const base = [
                       { x: 0, y: 0, r: 0 },
                       { x: -3, y: -19.5, r: 0 },
                       { x: 0, y: -5, r: 0 },
                       { x: -3, y: -40, r: 0 }
                    ];
                    const states = [] as typeof base;
                    function reset () {
                       for (const [ index, origin ] of base.entries()) {
                          states[index] = { x: origin.x, y: origin.y, r: origin.r };
                       }
                    }
                    reset();
                    return function () {
                       let hit = false;
                       const meta = this.metadata as MadDummyMetadata;
                       for (const garbo of renderer.detect(
                          this.objects[1] as CosmosHitbox,
                          ...renderer.calculate(
                             'menu',
                             garbo =>
                                !garbo.metadata.hit &&
                                garbo.metadata.dummybullet === true &&
                                garbo.position.y < battler.box.y - battler.box.size.y / 2
                          )
                       )) {
                          if (garbo.metadata.finalhit) {
                             volatyle.vars.finalhit = true;
                             garbo.alpha.value = 0;
                             garbo.metadata.bullet = false;
                          }
                          meta.multiplier = 0.4;
                          meta.speed = 2;
                          garbo.metadata.hit = true;
                          volatyle.vars.hits++;
                          if (!hit) {
                             hit = true;
                             assets.sounds.strike.instance(timer);
                             meta.mode = 'random';
                             this.velocity.set(0, 0);
                             atlas.target === 'dialoguerBase' || (volatyle.vars.face = 1);
                          }
                          if (volatyle.vars.phase < 3 && 10 <= volatyle.vars.hits && volatyle.vars.turns < 4) {
                             meta.movement.rate = 0.325;
                             meta.movement.intensity = 1;
                          }
                       }

                       if (dingus > 20) {
                          dingus = 0;
                          reset();
                          meta.mode = 'normal';
                          atlas.target === 'dialoguerBase' ||
                             (volatyle.vars.face = save.data.n.plot < 48 || !save.data.b.toriel_phone ? 0 : 8);
                       }

                       const {
                          speed,
                          multiplier,
                          time,
                          mode,
                          movement: { rate, intensity, center, sineRate, sinePower },
                          random3
                       } = meta;

                       if (meta.ragdolled || battler.alive.length === 0) {
                          this.velocity.set(0, 0);
                       } else {
                          const pseudoRate = movement.rate - (movement.rate - lastRate) / 8;
                          const psuedoTime = movement.time + pseudoRate / 30;
                          const pseudoCenterX = movement.center.x - (movement.center.x - lastCenterX) / 8;
                          const pseudoCenterY = movement.center.y - (movement.center.y - lastCenterY) / 8;
                          const pseudoIntensity = movement.intensity - (movement.intensity - lastIntensity) / 8;
                          const pseudoSinePowerX = movement.sinePower.x - (movement.sinePower.x - lastSinePowerX) / 8;
                          const pseudoSinePowerY = movement.sinePower.y - (movement.sinePower.y - lastSinePowerY) / 8;

                          const projectedVelocity = new CosmosPoint(
                             (CosmosMath.wave((psuedoTime * sineRate.x) % 1) * 2 - 1) * pseudoSinePowerX,
                             (CosmosMath.wave((psuedoTime * sineRate.y) % 1) * 2 - 1) * pseudoSinePowerY
                          )
                             .multiply(pseudoIntensity)
                             .add(pseudoCenterX, pseudoCenterY)
                             .subtract(this.position);

                          movement.rate -= (movement.rate - rate) / 8;
                          movement.time += movement.rate / 30;
                          movement.center.x -= (movement.center.x - center.x) / 8;
                          movement.center.y -= (movement.center.y - center.y) / 8;
                          movement.intensity -= (movement.intensity - intensity) / 8;
                          movement.sinePower.x -= (movement.sinePower.x - sinePower.x) / 8;
                          movement.sinePower.y -= (movement.sinePower.y - sinePower.y) / 8;

                          lastRate = rate;
                          lastCenterX = center.x;
                          lastCenterY = center.y;
                          lastIntensity = intensity;
                          lastSinePowerX = sinePower.x;
                          lastSinePowerY = sinePower.y;

                          const trueVelocity = new CosmosPoint(
                             (CosmosMath.wave((movement.time * sineRate.x) % 1) * 2 - 1) * movement.sinePower.x,
                             (CosmosMath.wave((movement.time * sineRate.y) % 1) * 2 - 1) * movement.sinePower.y
                          )
                             .multiply(movement.intensity)
                             .add(movement.center)
                             .subtract(this.position);

                          this.velocity.set(trueVelocity.subtract(trueVelocity.subtract(projectedVelocity).divide(4)));
                       }

                       if (battler.alive.length > 0 && (mode === 'normal' || (mode === 'restore' && dingus > -1))) {
                          trueSpeed -= (trueSpeed - speed) / 4;
                          trueMultiplier -= (trueMultiplier - multiplier) / 4;
                          rot = Math.sin((meta.time = time + trueSpeed) / 6) * trueMultiplier * 30;
                       }

                       if (mode === 'ragdoll') {
                          if (lastmode === mode) {
                             fakegrav += 0.5;
                          } else {
                             fakegrav = 0.5;
                          }
                       } else if (mode === 'restore') {
                          lastmode === mode && dingus++;
                       }
                       lastmode === mode || (lastmode = mode);
                       for (const [ index, object ] of this.objects[0].objects.entries()) {
                          const state = states[index];
                          if (mode === 'ragdoll') {
                             const bottom = 300 - this.position.y - volatyle.container.position.y;
                             if (state.y < bottom) {
                                if (state.y + fakegrav < bottom) {
                                   state.y += fakegrav;
                                } else {
                                   state.y = bottom;
                                }
                                switch (index) {
                                   case 0:
                                      state.x++;
                                      state.r += 2;
                                      break;
                                   case 1:
                                      state.x += 2;
                                      state.r += 5;
                                      break;
                                   case 2:
                                      state.x -= 0.5;
                                      state.r -= 3;
                                      break;
                                   case 3:
                                      state.x -= 1.5;
                                      state.r -= 9;
                                      break;
                                }
                             } else if (state.y > bottom) {
                                state.y = bottom;
                             }
                          } else if (mode === 'random') {
                             const origin = base[index];
                             state.r = origin.r + random3.next() * 180 - 90;
                             state.x = origin.x + random3.next() * 20 - 10;
                             state.y = origin.y + random3.next() * 10 - 5;
                          } else if (mode === 'restore' && dingus > -1) {
                             const origin = base[index];
                             state.r -= (state.r - origin.r) / 4;
                             state.x -= (state.x - origin.x) / 4;
                             state.y -= (state.y - origin.y) / 4;
                          }
                          switch (index) {
                             case 0:
                                object.position.set(state.x, state.y);
                                object.rotation.value = state.r + -rot;
                                break;
                             case 1:
                                object.position.set(state.x, state.y - rot / 8);
                                object.rotation.value = state.r + rot / 2;
                                break;
                             case 2:
                                object.position.set(state.x, state.y);
                                object.rotation.value = state.r + rot / 3;
                                break;
                             case 3:
                                object.position.set(state.x + rot / 6, state.y - rot / 6);
                                object.rotation.value = state.r + rot;
                                break;
                          }
                       }
                       if (meta.mode === 'random') {
                          meta.mode = 'restore';
                          dingus = -5;
                       }
                    };
                 })()
              )
   }),
   moldsmal: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_moldsmal,
      assets: new CosmosInventory(content.ibcMoldsmal, content.ibbOctagon),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 3,
      hp: 50,
      df: 0,
      g: 3,
      name: text.b_opponent_moldsmal.name,
      acts: [
         [ 'check', text.b_opponent_moldsmal.act_check ],
         [ 'pat', text.b_opponent_moldsmal.act_imitate ],
         [ 'slap', text.b_opponent_moldsmal.act_slap ],
         [ 'flirt', text.b_opponent_moldsmal.act_flirt ]
      ],
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultTalk: [
            text.b_opponent_moldsmal.idleTalk1,
            text.b_opponent_moldsmal.idleTalk2,
            text.b_opponent_moldsmal.idleTalk3
         ],
         defaultStatus: () => [
            text.b_opponent_moldsmal.status2(),
            text.b_opponent_moldsmal.status3(),
            text.b_opponent_moldsmal.status4(),
            text.b_opponent_moldsmal.status5()
         ],
         bubble: position => [ position.add(28, -54), battler.bubbles.dummy ],
         vars: { mercymod: false },
         act: {
            flirt (state) {
               save.data.b.flirt_moldsmal = true;
               state.volatile.flirted = true;
               state.talk = text.b_opponent_moldsmal.sexyChat;
            },
            async slap () {
               if (!save.data.b.oops) {
                  oops();
                  await timer.pause(1000);
               }
            }
         },
         postact (state, act) {
            if (act === 'flirt' || act === 'pat') {
               save.data.b.spared_moldsmal = true;
               if (!state.vars.mercymod && state.volatile.hp === state.opponent.hp) {
                  state.vars.mercymod = true;
                  state.pacify = true;
               }
               state.volatile.sparable = true;
            } else if (act === 'slap') {
               state.volatile.sparable = false;
               state.vars.mercymod = true;
            }
         },
         postchoice (state) {
            return kiddHandler(state, 'moldsmal');
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = text.b_opponent_moldsmal.perilStatus);
         }
      }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] }),
      sprite () {
         const time = timer.value;
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] }).on('tick', function () {
            this.scale.y = 0.9 + CosmosMath.wave(((timer.value - time) % 3000) / 3000) * 0.1;
         });
      }
   }),
   spacetop: new OutertaleOpponent({
      flirted: () => save.data.b.flirt_spacetop,
      assets: new CosmosInventory(
         content.ibcSpacetop,
         content.ibcSpacetopHurt,
         content.ibcSpacetopCrystal,
         content.asGrab,
         content.ibbLithium,
         content.asBomb
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 17,
      hp: 48,
      df: 0,
      name: text.b_opponent_spacetop.name,
      acts: () => [
         [ 'check', text.b_opponent_spacetop.act_check ],
         [ 'compliment', text.b_opponent_spacetop.act_compliment ],
         [ 'create', text.b_opponent_spacetop.act_create ],
         [ 'steal', text.b_opponent_spacetop.act_steal ],
         [ 'flirt', text.b_opponent_spacetop.act_flirt ]
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
               await talk(
                  target,
                  ...[
                     text.b_opponent_spacetop.idleTalk1,
                     text.b_opponent_spacetop.idleTalk2,
                     text.b_opponent_spacetop.idleTalk3,
                     text.b_opponent_spacetop.idleTalk4,
                     text.b_opponent_spacetop.idleTalk5
                  ][battler.rand(5)]
               );
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
            let justice = false;
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
                     await battler.idle1(target);
                     return;
                  }
                  await battler.idle1(target);
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'compliment':
                        idle = false;
                        await talk(
                           target,
                           ...[ text.b_opponent_spacetop.complimentTalk1, text.b_opponent_spacetop.complimentTalk2 ][
                              battler.rand(2)
                           ]
                        );
                        break;
                     case 'steal':
                        idle = false;
                        if (battler.hurt.includes(volatile)) {
                           assets.sounds.grab.instance(timer);
                           volatile.alive = false;
                           volatile.container.alpha.value = 0;
                           const index = battler.add(opponents.space, volatile.container.position.value());
                           const vola = battler.volatile[index];
                           vola.vars.tookit = true;
                           const position = vola.container.position;
                           const base = position.x;
                           position.x = base + 3;
                           timer.pause(70).then(async () => {
                              position.x = base - 3;
                              await timer.pause(70);
                              position.x = base + 2;
                              await timer.pause(70);
                              position.x = base + 1;
                              await timer.pause(70);
                              position.x = base;
                           });
                           statustext = text.b_opponent_space.randStatus1;
                           justice = true;
                        } else {
                           if (!save.data.b.oops) {
                              oops();
                              await timer.pause(1000);
                           }
                           await talk(
                              target,
                              ...[ text.b_opponent_spacetop.stealTalk1, text.b_opponent_spacetop.stealTalk2 ][
                                 battler.rand(2)
                              ]
                           );
                        }
                        break;
                     case 'create':
                        idle = false;
                        switch (volatile.vars.create++) {
                           case 0:
                              await talk(
                                 target,
                                 ...[ text.b_opponent_spacetop.createTalk1, text.b_opponent_spacetop.createTalk2 ][
                                    battler.rand(2)
                                 ]
                              );
                              statustext = text.b_opponent_spacetop.createStatus1;
                              break;
                           case 1:
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_spacetop.createTalk3,
                                    text.b_opponent_spacetop.createTalk4,
                                    text.b_opponent_spacetop.createTalk5
                                 ][battler.rand(3)]
                              );
                              statustext = text.b_opponent_spacetop.createStatus2;
                              save.data.b.spared_spacetop = true;
                              if (!volatile.sparable) {
                                 volatile.sparable = true;
                                 battler.g += gold;
                              }
                              break;
                           case 2:
                              volatile.sparable = true;
                              battler.spare(target);
                              return;
                        }
                        break;
                     case 'flirt':
                        idle = false;
                        if (volatile.vars.create < 2) {
                           await talk(target, ...text.b_opponent_spacetop.flirtTalk1);
                           statustext = text.b_opponent_spacetop.flirtStatus1;
                        } else {
                           save.data.b.flirt_spacetop = true;
                           volatile.flirted = true;
                           await talk(target, ...text.b_opponent_spacetop.flirtTalk2);
                           statustext = text.b_opponent_spacetop.flirtStatus2;
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
            if (idle) {
               sparing || (await doIdle());
            }
            if (justice) {
               await talk(target, ...text.b_opponent_spacetop.justiceTalk);
            } else if (battler.hurt.includes(volatile)) {
               statustext = text.b_opponent_spacetop.hurtStatus;
            }
            battler.status = CosmosUtils.provide(statustext);
            sparing || (await battler.idle2(target));
         };
      })(
         17,
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 165, y: 60 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         { create: 0 },
         () =>
            world.azzie
               ? text.b_opponent_spacetop.genoStatus
               : [
                    text.b_opponent_spacetop.randStatus1,
                    text.b_opponent_spacetop.randStatus2,
                    text.b_opponent_spacetop.randStatus3,
                    text.b_opponent_spacetop.randStatus4
                 ][battler.rand(4)]
      ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcSpacetopHurt ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcSpacetop
         })
   }),
   space: new OutertaleOpponent({
      assets: new CosmosInventory(),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      exp: 25,
      hp: 48,
      df: 0,
      name: text.b_opponent_space.name,
      acts: () => [
         [ 'check', text.b_opponent_space.act_check ],
         [ 'reassure', text.b_opponent_space.act_reassure ]
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
               if (volatile.vars.happy) {
                  statustext = text.b_opponent_space.happyStatus;
                  await talk(
                     target,
                     ...[
                        text.b_opponent_space.happyTalk1,
                        text.b_opponent_space.happyTalk2,
                        text.b_opponent_space.happyTalk3,
                        text.b_opponent_space.happyTalk4
                     ][battler.rand(4)]
                  );
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_space.idleTalk1,
                        text.b_opponent_space.idleTalk2,
                        text.b_opponent_space.idleTalk3,
                        text.b_opponent_space.idleTalk4
                     ][battler.rand(4)]
                  );
               }
            }
            if (choice.type === 'none') {
               volatile.vars.tookit || (await doIdle());
               return;
            }
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            volatile.vars.tookit = false;
            const sparing = battler.sparing(choice);
            choice.type === 'fight' || sparing || (await battler.idle1(target));
            switch (choice.type) {
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     battler.g += gold * 2;
                     battler.idle1(target);
                     return;
                  }
                  battler.idle1(target);
                  break;
               case 'act':
                  if (choice.act === 'reassure') {
                     volatile.vars.happy = true;
                     save.data.b.spared_spacetop = true;
                     if (!volatile.sparable) {
                        volatile.sparable = true;
                        battler.g += gold;
                     }
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
            battler.status = CosmosUtils.provide(statustext);
            sparing || (await battler.idle2(target));
         };
      })(
         40,
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
               ? text.b_opponent_space.genoStatus
               : [ text.b_opponent_space.randStatus1, text.b_opponent_space.randStatus2 ][battler.rand(2)]
      ),
      sprite: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcSpacetopCrystal ]
         })
   })
};

export default opponents;

CosmosUtils.status(`LOAD MODULE: COMMON OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
