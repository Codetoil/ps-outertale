import assets from '../assets';
import { OutertaleGroup, OutertaleVolatile } from '../classes';
import { defaultSetup, endMusic, resetBox, standardMusic, standardPos, standardSize } from '../common/groups';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import content from '../content';
import { atlas, events, random, renderer, speech, timer } from '../core';
import { CosmosInventory } from '../engine/core';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosPoint } from '../engine/numerics';
import { CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosUtils } from '../engine/utils';
import { battler, shake, world } from '../mantle';
import save from '../save';
import { faces } from './bootstrap';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

export function saveJerry () {
   if (save.data.b.spared_jerry) {
      timer
         .when(() => battler.alive.length === 1)
         .then(() => {
            for (const volatile of battler.volatile) {
               if (volatile.opponent === opponents.jerry) {
                  volatile.sparable = true;
               }
            }
         });
   }
}

export function active0 () {
   switch (battler.alive[0].opponent) {
      case opponents.stardrake:
         return 'stardrake';
      case commonOpponents.spacetop:
         return 'spacetop';
      case opponents.dogaressa:
         return 'dogaressa';
      case opponents.dogamy:
         return 'dogamy';
   }
}

const groups = {
   stardrake: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.azzie ? text.b_opponent_stardrake.genoStatus() : text.b_opponent_stardrake.status1();
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => patterns.stardrake()),
      opponents: [ [ opponents.stardrake, { x: 140, y: 120 } ] ]
   }),

   mouse: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.azzie ? text.b_opponent_mouse.genoStatus : text.b_opponent_mouse.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => patterns.mouse(), { y: 40, x: 140 }, true),
      opponents: [ [ opponents.mouse, { x: 140, y: 120 } ] ]
   }),

   jerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.azzie ? text.b_opponent_jerry.genoStatus : text.b_opponent_jerry.status1;
         standardMusic();
         saveJerry();
         return true;
      },
      handler: defaultSetup(() => timer.pause(850)),
      opponents: [ [ opponents.jerry, { x: 140, y: 120 } ] ]
   }),

   stardrakeSpacetop: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_stardrakeSpacetop();
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            if (battler.opponents[0] === commonOpponents.space) {
               battler.status = text.b_group_stardrakeSpacetop2c();
            } else if (battler.opponents[0] === commonOpponents.spacetop) {
               battler.status = text.b_group_stardrakeSpacetop2b();
            } else {
               battler.status = text.b_group_stardrakeSpacetop2a();
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               if (battler.alive.length > 1) {
                  const spacetop = battler.opponents.includes(commonOpponents.spacetop);
                  await Promise.all([ patterns.stardrake(spacetop), spacetop ? commonPatterns.spacetop(true) : void 0 ]);
               } else if (battler.alive[0].opponent !== commonOpponents.space) {
                  await (active0() === 'stardrake' ? patterns.stardrake() : commonPatterns.spacetop());
               } else {
                  await timer.pause(450);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.stardrake, { x: 100, y: 120 } ],
         [ commonOpponents.spacetop, { x: 220, y: 120 } ]
      ]
   }),

   spacetopJerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_spacetopJerry();
         standardMusic();
         saveJerry();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            if (battler.opponents[0] === commonOpponents.space) {
               battler.status = text.b_group_stardrakeSpacetop2c();
            } else if (battler.opponents[0] === commonOpponents.spacetop) {
               battler.status = text.b_group_stardrakeSpacetop2b();
            } else {
               battler.status = text.b_group_stardrakeSpacetop2d();
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               if (battler.opponents.includes(commonOpponents.spacetop)) {
                  await commonPatterns.spacetop(false, battler.opponents.includes(opponents.jerry));
               } else {
                  await timer.pause(850);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ commonOpponents.spacetop, { x: 100, y: 120 } ],
         [ opponents.jerry, { x: 220, y: 120 } ]
      ]
   }),

   stardrakeSpacetopJerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_stardrakeSpacetopJerry();
         standardMusic();
         saveJerry();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 3)) {
            if (battler.alive.length === 1) {
               if (battler.opponents[0] === commonOpponents.space) {
                  battler.status = text.b_group_stardrakeSpacetop2c();
               } else if (battler.opponents[0] === commonOpponents.spacetop) {
                  battler.status = text.b_group_stardrakeSpacetop2b();
               } else if (battler.opponents.includes(opponents.jerry)) {
                  battler.status = text.b_group_stardrakeSpacetop2d();
               } else {
                  battler.status = text.b_group_stardrakeSpacetop2a();
               }
            } else if (battler.opponents.includes(opponents.jerry)) {
               if (battler.opponents.includes(opponents.stardrake)) {
                  battler.status = text.b_group_stardrakeSpacetopJerry2c();
               } else {
                  battler.status = text.b_group_stardrakeSpacetopJerry2b();
               }
            } else {
               battler.status = text.b_group_stardrakeSpacetopJerry2a();
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               if (battler.alive.length > 2) {
                  const spacetop = battler.opponents.includes(commonOpponents.spacetop);
                  await Promise.all([
                     patterns.stardrake(spacetop, true),
                     spacetop ? commonPatterns.spacetop(true, true) : void 0
                  ]);
               } else if (battler.alive.length > 1) {
                  if (battler.opponents.includes(opponents.jerry)) {
                     await (battler.opponents.includes(opponents.stardrake)
                        ? patterns.stardrake
                        : commonPatterns.spacetop)(false, true);
                  } else {
                     await Promise.all([ patterns.stardrake(true, false), commonPatterns.spacetop(true, false) ]);
                  }
               } else if (battler.opponents[0] === opponents.jerry) {
                  await timer.pause(850);
               } else if (battler.alive[0].opponent !== commonOpponents.space) {
                  await (active0() === 'stardrake' ? patterns.stardrake() : commonPatterns.spacetop());
               } else {
                  await timer.pause(450);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.stardrake, { x: 33, y: 120 } ],
         [ opponents.jerry, { x: 137, y: 120 } ],
         [ commonOpponents.spacetop, { x: 241, y: 120 } ]
      ]
   }),

   doggo: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_doggo.status1();
         battler.volatile[0].vars.wan = false;
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.battle1.instance(timer);
         battler.music = music;
         return true;
      },
      opponents: [ [ opponents.doggo, { x: 160, y: 120 } ] ]
   }),

   lesserdog: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogsong),
      init () {
         battler.flee = false;
         save.data.b.s_state_lesser = true;
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_lesserdog.status0();
         battler.volatile[0].vars.hurt1 = false;
         battler.volatile[0].vars.hurt2 = false;
         battler.volatile[0].vars.statustext = [ text.b_opponent_lesserdog.status0 ];
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.dogsong.instance(timer);
         battler.music = music;
         return true;
      },
      opponents: [ [ opponents.lesserdog, { x: 160 - 37.5, y: 120 } ] ]
   }),

   dogs: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_dogs();
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.battle1.instance(timer);
         battler.music = music;
         const vola = battler.volatile[0];
         const dao = vola.container.position.value();
         const dogamyaxe = (vola.vars.dogamyaxe = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcDogsAxe ],
            position: dao,
            priority: 200
         }).on('tick', function () {
            const spr = vola.container.objects[0];
            this.x = dao.x + spr.x;
         }));
         battler.garbage.push([ 'menu', dogamyaxe ]);
         renderer.attach('menu', dogamyaxe);
         return true;
      },
      async handler (choice, target, volatile) {
         let statustext = [
            text.b_opponent_dogamy.status1(),
            text.b_opponent_dogamy.status2(),
            text.b_opponent_dogamy.status3(),
            text.b_opponent_dogamy.status4()
         ];
         let monstertext1 = [
            text.b_opponent_dogamy.randTalk1(),
            text.b_opponent_dogamy.randTalk2(),
            text.b_opponent_dogamy.randTalk3(),
            text.b_opponent_dogamy.randTalk4()
         ] as string[][] | null;
         let monstertext2 = [
            text.b_opponent_dogaressa.randTalk1(),
            text.b_opponent_dogaressa.randTalk2(),
            text.b_opponent_dogaressa.randTalk3(),
            text.b_opponent_dogaressa.randTalk4()
         ] as string[][] | null;
         if (battler.alive.length < 2) {
            if (volatile.opponent === opponents.dogamy) {
               statustext = [ text.b_opponent_dogaressa.loneStatus() ];
               monstertext1 = [ text.b_opponent_dogamy.loneTalk1, text.b_opponent_dogamy.loneTalk2 ];
               monstertext2 = null;
            } else {
               statustext = [ text.b_opponent_dogamy.loneStatus() ];
               monstertext1 = null;
               monstertext2 = [ text.b_opponent_dogaressa.loneTalk1, text.b_opponent_dogaressa.loneTalk2 ];
            }
         }
         const GV = battler.volatile[0].vars;
         GV.sequence || (GV.sequence = 0);
         switch (choice.type) {
            case 'fight':
               for (const oppo of battler.alive) {
                  oppo.container.objects[0].reset();
               }
               const isDogamy = volatile.opponent === opponents.dogamy;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score },
                     isDogamy,
                     isDogamy
                  )
               ) {
                  if (isDogamy) {
                     await Promise.all([
                        battler.vaporize(volatile.container.objects[0]),
                        battler.vaporize(volatile.vars.dogamyaxe)
                     ]);
                     if (battler.alive.length === 0) {
                        events.fire('victory');
                     }
                  }
                  GV.dogamy = false;
                  GV.dogaressa = false;
                  GV.fetch = false;
                  battler.g += 50;
                  save.data.n.state_starton_dogs = 2;
                  for (const oppo of battler.alive) {
                     oppo.sparable = false;
                  }
                  if (volatile.opponent === opponents.dogamy) {
                     statustext = [ text.b_opponent_dogamy.loneStatus() ];
                     monstertext2 = [ text.b_opponent_dogaressa.loneTalk1, text.b_opponent_dogaressa.loneTalk2 ];
                  } else {
                     statustext = [ text.b_opponent_dogaressa.loneStatus() ];
                     monstertext1 = [ text.b_opponent_dogamy.loneTalk1, text.b_opponent_dogamy.loneTalk2 ];
                  }
                  if (battler.alive.length < 1) {
                     battler.music?.stop();
                     return;
                  }
               } else {
                  if (battler.alive.length > 1) {
                     if (volatile.opponent === opponents.dogamy) {
                        monstertext1 = [ text.b_opponent_dogamy.petTalk1 ];
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk1 ];
                     } else {
                        monstertext1 = [ text.b_opponent_dogamy.petTalk3 ];
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk3 ];
                     }
                     for (const oppo of battler.alive) {
                        world.genocide || oppo.container.objects[0].enable();
                     }
                  }
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  if (battler.alive.length < 2) {
                     if (volatile.opponent === opponents.dogamy) {
                        await battler.human(...text.b_opponent_dogamy.fetchTextLone());
                     } else {
                        await battler.human(...text.b_opponent_dogaressa.fetchTextLone());
                     }
                     save.storage.inventory.remove('spanner');
                  } else {
                     await battler.human(...text.b_opponent_dogamy.fetchText());
                     statustext = [ text.b_opponent_dogamy.fetchStatus() ];
                     GV.fetch = true;
                     monstertext1 = [ text.b_opponent_dogamy.fetchTalk ];
                     monstertext2 = [ text.b_opponent_dogaressa.fetchTalk ];
                     if (!volatile.sparable) {
                        battler.g += 25;
                        save.data.n.state_starton_dogs = 1;
                     }
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.flirtTextLone);
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.flirtTextLone);
                        }
                     } else if (volatile.opponent === opponents.dogamy) {
                        save.data.b.flirt_dogamy = true;
                        volatile.flirted = true;
                        if (GV.sequence < 2) {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk1 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk1 ];
                        } else {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk2 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk2 ];
                        }
                        await battler.human(...text.b_opponent_dogamy.flirtText());
                     } else {
                        save.data.b.flirt_dogaressa = true;
                        volatile.flirted = true;
                        if (GV.sequence < 2) {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk3 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk3 ];
                        } else {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk4 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk4 ];
                        }
                        await battler.human(...text.b_opponent_dogaressa.flirtText());
                     }
                     break;
                  case 'roll':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.rollTextLone());
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.rollTextLone());
                        }
                     } else {
                        if (GV.sequence < 1) {
                           GV.sequence = 1;
                        }
                        battler.status = text.b_opponent_dogamy.rollStatus();
                        await battler.human(...text.b_opponent_dogamy.rollText());
                     }
                     break;
                  case 'resniff':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           monstertext1 = [ text.b_opponent_dogamy.otherPet ];
                           await battler.human(...text.b_opponent_dogamy.resmellTextLone());
                        } else {
                           monstertext2 = [ text.b_opponent_dogaressa.resmellTalkLone ];
                           await battler.human(...text.b_opponent_dogaressa.resmellTextLone());
                        }
                     } else if (GV.sequence < 1) {
                        monstertext1 = [ text.b_opponent_dogamy.smellTalk1 ];
                        monstertext2 = [ text.b_opponent_dogaressa.smellTalk1 ];
                        await battler.human(...text.b_opponent_dogamy.resmellText1());
                     } else {
                        monstertext1 = [ text.b_opponent_dogamy.smellTalk2 ];
                        monstertext2 = [ text.b_opponent_dogaressa.smellTalk2 ];
                        if (GV.sequence < 2) {
                           GV.sequence = 2;
                           await battler.human(...text.b_opponent_dogamy.resmellText2());
                        } else {
                           await battler.human(...text.b_opponent_dogamy.resmellText3());
                        }
                     }
                     break;
                  case 'pet':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.petTextLone());
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.petTextLone());
                        }
                     } else if (GV.sequence < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           monstertext1 = [ text.b_opponent_dogamy.petTalk1 ];
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk1 ];
                        } else {
                           monstertext1 = [ text.b_opponent_dogamy.petTalk3 ];
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk3 ];
                        }
                        await battler.human(...text.b_opponent_dogamy.susText);
                     } else if (volatile.opponent === opponents.dogamy) {
                        GV.dogamy = true;
                        statustext = [ text.b_opponent_dogamy.petNeedStatus() ];
                        monstertext1 = [ text.b_opponent_dogamy.petTalk2 ];
                        if (GV.dogaressa) {
                           monstertext2 = [ text.b_opponent_dogaressa.otherPet ];
                        } else {
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk2 ];
                        }
                        await battler.human(...text.b_opponent_dogamy.petText);
                     } else {
                        GV.dogaressa = true;
                        statustext = [ text.b_opponent_dogaressa.petNeedStatus() ];
                        if (GV.dogamy) {
                           monstertext1 = [ text.b_opponent_dogamy.otherPet ];
                        } else {
                           monstertext1 = [ text.b_opponent_dogamy.petTalk4 ];
                        }
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk4 ];
                        await battler.human(...text.b_opponent_dogaressa.petText);
                     }
                     if (GV.dogamy && GV.dogaressa) {
                        statustext = [ text.b_opponent_dogamy.petStatus() ];
                        if (!volatile.sparable) {
                           battler.g += 25;
                           save.data.n.state_starton_dogs = 0;
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
               endMusic();
               GV.dogamyaxe.alpha.value = 1 / 3;
               return;
         }
         let randtext = 0;
         if (monstertext1 || monstertext2) {
            randtext = random.next();
         }
         if (monstertext1 && battler.opponents.includes(opponents.dogamy)) {
            await battler.monster(
               false,
               { x: 45, y: 32 },
               battler.bubbles.napstablook2,
               ...monstertext1[Math.floor(randtext * monstertext1.length)]
            );
         }
         if (monstertext2 && battler.opponents.includes(opponents.dogaressa)) {
            await battler.monster(
               false,
               { x: 210, y: 32 },
               battler.bubbles.napstablook,
               ...monstertext2[Math.floor(randtext * monstertext2.length)]
            );
         }
         if (battler.alive.length > 1 && (GV.fetch || (GV.dogamy && GV.dogaressa))) {
            for (const oppo of battler.alive) {
               oppo.sparable = true;
            }
         }
         if (battler.alive.length > 0) {
            battler.status = statustext[Math.floor(random.next() * statustext.length)];
            await battler.resume(async () => {
               const index = Math.floor(random.next() * 2);
               await battler.box.size.modulate(
                  timer,
                  300,
                  [
                     { x: 100, y: 65 },
                     { x: 150, y: 65 }
                  ][index]
               );
               const modifier = battler.alive.length < 2 ? active0() : void 0;
               battler.SOUL.position.set(
                  [ modifier === 'dogaressa' ? { x: 140, y: 180 } : { x: 160, y: 180 }, { x: 160, y: 160 } ][index]
               );
               battler.SOUL.alpha.value = 1;
               if (GV.fetch || (GV.dogamy && GV.dogaressa)) {
                  await timer.pause(300);
               } else {
                  await patterns.dogs(index, modifier as 'dogamy' | 'dogaressa' | undefined);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.dogamy, { x: 112.5 - 17 / 2, y: 120 } ],
         [ opponents.dogaressa, { x: 112.5 + 17 / 2, y: 120 } ]
      ]
   }),

   greatdog: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogsong),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_greatdog.status1();
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.dogsong.instance(timer);
         battler.music = music;
         return true;
      },
      opponents: [ [ opponents.greatdog, { x: 160, y: 120 } ] ]
   }),

   papyrus: new OutertaleGroup({
      assets: new CosmosInventory(content.amPapyrus, content.amPapyrusboss, content.amSpecatk),
      init () {
         battler.flee = false;
         battler.status =
            world.genocide || (world.population === 0 && !world.bullied)
               ? text.b_opponent_papyrus.status1
               : text.b_opponent_papyrus.status2;
         const volatile = battler.volatile[0];
         if (world.genocide) {
            const jeebs = assets.music.shock.instance(timer);
            battler.music = jeebs;
            volatile.sparable = true;
         } else if (world.population === 0 && !world.bullied) {
            volatile.sparable = true;
         } else {
            volatile.vars.zero = !save.data.b.oops;
            if (save.data.n.state_papyrus_capture++ > 0) {
               const jams = assets.music.papyrusboss.instance(timer);
               battler.music = jams;
               volatile.vars.phase = 2;
               battler.SOUL.metadata.color = 'blue';
            } else {
               const ebic = assets.music.papyrus.instance(timer);
               battler.music = ebic;
            }
         }
         return true;
      },
      opponents: [ [ opponents.papyrus, { x: 130, y: 14 } ] ]
   }),

   shockpapyrus: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(),
      init () {
         speech.state.face = faces.papyrusBattleSide;
         battler.SOUL.alpha.value = 0;
         const volatile = battler.volatile[0];
         const diff = new CosmosPoint({ x: 200, y: 20 }).subtract(volatile.container.position);
         volatile.vars.facelock = false;
         battler.alpha.value = 1;
         events.on('battle').then(async () => {
            await battler.monster(
               false,
               volatile.container.position.add(diff),
               battler.bubbles.twinkly,
               ...text.b_opponent_shockpapyrus.idleText1
            );
            volatile.vars.facelock = true;
            battler.status = text.b_opponent_shockpapyrus.status1;
            let escaped = false;
            events.on('escape').then(() => {
               escaped = true;
            });
            events.on('swing').then(async () => {
               if (!escaped) {
                  battler.music && (battler.music.gain.value = 0);
                  atlas.detach(renderer, 'menu', 'battlerAdvancedText');
                  const fader = new CosmosRectangle({
                     position: { x: 0, y: 0 },
                     size: { x: 1000, y: 1000 },
                     fill: 'white',
                     priority: 1,
                     alpha: 0
                  });
                  renderer.attach('menu', fader);
                  timer.pause(450).then(async () => {
                     await battler.monster(
                        false,
                        { x: 250, y: 39 },
                        battler.bubbles.sans,
                        ...text.b_opponent_shockpapyrus.sansText
                     );
                  });
                  await fader.alpha.modulate(timer, 1250, 1);
                  volatile.vars.facelock = false;
                  speech.state.face = faces.papyrusBattleShock;
                  assets.sounds.noise.instance(timer);
                  renderer.alpha.value = 0;
                  renderer.detach('menu', fader);
                  volatile.container.x = 55;
                  const sand = new CosmosAnimation({
                     position: { x: 160, y: 120 },
                     anchor: { x: 0, y: 1 },
                     resources: content.ibcSansDeath
                  });
                  battler.overlay.attach(sand);
                  await timer.pause(300);
                  volatile.vars.facelock = true;
                  assets.sounds.noise.instance(timer);
                  renderer.alpha.value = 1;
                  let iteration = 0;
                  while (iteration++ < 10) {
                     if (sand.index === 0) {
                        sand.index = 1;
                     } else {
                        sand.index = 0;
                     }
                     await timer.pause(66);
                  }
                  const overlay = new CosmosRectangle({
                     priority: 99999,
                     size: { x: 1000, y: 1000 },
                     position: { x: 160, y: 120 },
                     anchor: 0,
                     fill: 'white',
                     stroke: 'transparent'
                  });
                  renderer.attach('menu', overlay);
                  sand.index = 2;
                  overlay.alpha.modulate(timer, 150, 0).then(() => {
                     renderer.detach('menu', overlay);
                  });
                  battler.volatile.push({
                     alive: false,
                     container: new CosmosObject({ objects: [ sand ] }) as OutertaleVolatile['container'],
                     dead: false,
                     flirted: false,
                     opponent: opponents.shocksans,
                     hp: 1,
                     sparable: false,
                     vars: {}
                  });
                  shake(2, 700);
                  await battler.attack(battler.volatile[1], { power: -999999, operation: 'add' }, true, true);
                  await timer.pause(850);
                  assets.sounds.noise.instance(timer);
                  sand.index = 3;
                  sand.position.y += 5;
                  const base = sand.position.x;
                  sand.position.x = base + 3;
                  await timer.pause(70);
                  sand.position.x = base - 3;
                  await timer.pause(70);
                  sand.position.x = base + 2;
                  await timer.pause(70);
                  sand.position.x = base + 1;
                  await timer.pause(70);
                  sand.position.x = base;
                  await battler.alpha.modulate(timer, 850, 0);
                  await timer.pause(550);
                  const textpos = { x: 190, y: 58 };
                  await battler.monster(
                     false,
                     textpos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath1
                  );
                  volatile.vars.facelock = false;
                  await battler.monster(
                     false,
                     volatile.container.position.add(62.5, 5),
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath1a
                  );
                  volatile.vars.facelock = true;
                  await timer.pause(450);
                  sand.index = 4;
                  await timer.pause(1150);
                  await battler.monster(
                     false,
                     textpos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath2
                  );
                  await timer.pause(950);
                  sand.index = 5;
                  await timer.pause(450);
                  volatile.vars.faceoverride = faces.papyrusBattleNooo;
                  await timer.pause(850);
                  battler.music && (battler.music.rate.value = 0.25);
                  battler.music?.gain.modulate(timer, 2e3, 1, 1);
                  await battler.monster(
                     false,
                     textpos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath3
                  );
                  await timer.pause(650);
                  sand.index = 6;
                  await battler.monster(
                     false,
                     textpos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath4
                  );
                  timer.pause(250).then(() => {
                     volatile.vars.faceoverride = faces.papyrusBattleClosed;
                  });
                  await battler.vaporize(sand);
                  save.data.n.exp += 100;
                  await timer.pause(350);
                  await battler.monster(
                     false,
                     volatile.container.position.add(diff),
                     battler.bubbles.twinkly,
                     ...text.b_opponent_shockpapyrus.sansDeath4a
                  );
                  await volatile.container.position.modulate(timer, 1350, {
                     x: 100,
                     y: volatile.container.y
                  });
                  await timer.pause(650);
                  await volatile.container.position.modulate(timer, 1e3, {
                     x: 420,
                     y: volatile.container.y
                  });
                  await timer.pause(1000);
                  events.fire('exit');
               }
            });
            battler.resume();
         });
         return false;
      },
      async handler (choice, target, volatile) {
         if (choice.type !== 'fight') {
            volatile.vars.facelock = false;
            volatile.vars.turns || (volatile.vars.turns = 0);
            const turnValue = volatile.vars.turns++;
            await battler.monster(
               false,
               { x: 200, y: 20 },
               battler.bubbles.twinkly,
               ...(turnValue < 1 ? text.b_opponent_shockpapyrus.idleText2 : text.b_opponent_shockpapyrus.idleText3)
            );
            volatile.vars.facelock = true;
            battler.status = text.b_opponent_shockpapyrus.status2;
            await battler.resume();
         }
      },
      opponents: [ [ opponents.shockpapyrus, { x: 130, y: 14 } ] ]
   }),

   shockasgore: new OutertaleGroup({
      assets: new CosmosInventory(),
      init () {
         battler.flee = false;
         battler.status = [];
         battler.SOUL.alpha.value = 0;
         events.on('battle').then(async () => {
            const volatile = battler.volatile[0];
            const vars = volatile.vars;
            vars.facelock = false;
            await battler.monster(
               false,
               { x: 220, y: 10 },
               battler.bubbles.napstablook,
               ...text.b_opponent_shockasgore.introText
            );
            vars.facelock = true;
            const music = assets.music.shock.instance(timer);
            battler.music = music;
            battler.status = text.b_opponent_shockasgore.status1;
            battler.resume();
         });
         return false;
      },
      opponents: [ [ opponents.shockasgore, { x: 160, y: 122.5 } ] ]
   })
};

export default groups;

CosmosUtils.status(`LOAD MODULE: STARTON GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
