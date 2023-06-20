import './bootstrap';

import { BLEND_MODES, Graphics } from 'pixi.js';
import assets from '../assets';
import { OutertaleLayerKey } from '../classes';
import { characters, azzie, runEncounter, stalkerSetup } from '../common';
import commonGroups from '../common/groups';
import commonText from '../common/text';
import content, { inventories } from '../content';
import {
   atlas,
   audio,
   events,
   game,
   items,
   keys,
   random,
   reload,
   renderer,
   rooms,
   speech,
   timer,
   typer
} from '../core';
import { CosmosInstance } from '../engine/audio';
import { CosmosInventory } from '../engine/core';
import { CosmosCharacter, CosmosEntity } from '../engine/entity';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue } from '../engine/numerics';
import { CosmosHitbox, CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import {
   battler,
   calcHP,
   character,
   choicer,
   dialogue,
   fader,
   header,
   heal,
   instance,
   isolate,
   oops,
   player,
   saver,
   shake,
   sineWaver,
   talkFilter,
   teleport,
   teleporter,
   temporary,
   trivia,
   use,
   world
} from '../mantle';
import save from '../save';
import { faces, resetThreshold } from './bootstrap';
import groups from './groups';
import patterns from './patterns';
import text, { areaKills, toriCheck } from './text';

export const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export const wasGeno = { state: false };

export function compat () {
   save.data.b.toriel_phone = !save.data.b.oops;
   save.data.n.kills_wastelands = save.data.n.kills;
   save.data.n.plot = 16;
   save.storage.dimboxA.add('glove');
}

export function toriSV () {
   return save.data.n.plot < 16 ? save.data.b.oops : !save.data.b.toriel_phone;
}

export function instanceDestroy (tags: string[], layer = 'main' as OutertaleLayerKey) {
   renderer.detach(
      layer,
      ...objectsByTag(objectTags => {
         for (const tag of tags) {
            if (!objectTags.includes(tag)) {
               return false;
            }
         }
         return true;
      })
   );
}

export function objectsByTag (filter: (tags: string[]) => boolean) {
   const objects = [] as CosmosObject[];
   Object.values(renderer.layers).map(layer =>
      CosmosUtils.chain(layer as { objects: CosmosObject[] }, (layer, next) => {
         for (const object of layer.objects) {
            const tags = object.metadata.tags;
            if (tags instanceof Array && filter(tags.filter(tag => typeof tag === 'string') as string[])) {
               objects.push(object);
            }
            next(object);
         }
      })
   );
   return objects;
}

export async function phase (time: number, position: CosmosPointSimple) {
   assets.sounds.phase.instance(timer);
   player.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
      player.scale.modulate(timer, 50, { x: 0, y: 1 });
   });
   await player.alpha.modulate(timer, 100, 0.8);
   player.alpha.value = 0;
   await timer.pause(40);
   player.alpha.value = 1;
   await timer.pause(35);
   await player.position.modulate(timer, time, position);
   assets.sounds.dephase.instance(timer);
   player.scale.modulate(timer, 50, { x: 1.05, y: 1 }).then(() => {
      player.scale.modulate(timer, 125, { x: 1, y: 1 });
   });
   await timer.pause(35);
   player.alpha.value = 0;
   await timer.pause(40);
   player.alpha.value = 0.8;
   await player.alpha.modulate(timer, 100, 1);
}

export function talkerEngine (key: string, ...talkers: CosmosSprite[]) {
   let state = true;
   CosmosUtils.chain(void 0 as void, (none, next) => {
      header(key).then(() => {
         if (state) {
            next();
            for (const talker of talkers) {
               speech.targets.add(talker);
            }
         }
      });
   });
   CosmosUtils.chain(void 0 as void, (none, next) => {
      header(`${key}!`).then(() => {
         if (state) {
            next();
            for (const talker of talkers) {
               speech.targets.delete(talker);
            }
         }
      });
   });
   return {
      end () {
         state = false;
         for (const talker of talkers) {
            speech.targets.delete(talker);
         }
      }
   };
}

export function torielOverride () {
   for (const room of rooms.values()) {
      if (room.score.music === 'home') {
         const old = Object.assign({}, room.score);
         room.score.music = 'toriel';
         room.score.rate = 0.775;
         room.score.gain = 0.4;
         events.on('reset').then(() => Object.assign(room.score, old));
      }
   }
}

export function walkHer (
   entity: CosmosEntity,
   direction: CosmosPointSimple,
   threshold: (position: CosmosPointSimple) => boolean
) {
   return CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
      await renderer.on('tick');
      entity.move(direction, renderer);
      if (threshold(entity.position)) {
         await next();
      } else {
         entity.move({ x: 0, y: 0 }, renderer);
      }
   });
}

export function spawnBreakfast () {
   temporary(
      new CosmosHitbox({
         anchor: 0,
         position: { x: 90, y: 155 },
         metadata: {
            interact: true,
            name: 'outlands',
            tags: [ 'aClassicDreemurrBreakfast' ],
            args: [ 'breakfast' ]
         },
         priority: 9999,
         objects: [ new CosmosSprite({ anchor: 0, frames: [ content.iooOBreakfast ] }) ],
         size: { x: 12, y: 14 }
      }),
      'main'
   );
}

export const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = states.rooms[game.room] || (states.rooms[game.room] = {});
   if (subscript === 'tick') {
      switch (game.room) {
         case 'w_twinkly':
            if (!roomState.goated) {
               roomState.goated = true;
               if (world.azzie && save.flag.n.ga_asrielOutlands7 < 1) {
                  await timer.when(() => game.room === 'w_twinkly' && player.y > 60 && game.movement);
                  save.flag.n.ga_asrielOutlands7 = 1;
                  await dialogue('auto', ...text.a_outlands.noticestart);
               }
            }
            break;
         case 'w_puzzle1': {
            if (save.data.n.plot < 6 && save.data.n.plot_call < 1 && game.movement) {
               game.movement = false;
               save.data.n.plot_call = 1;
               atlas.switch('dialoguerBottom');
               assets.sounds.phone.instance(timer);
               await typer.text(...text.a_outlands.plot_call.a, commonText.c_call2);
               atlas.switch(null);
               save.data.n.choice_flavor = choicer.result as 0 | 1;
               game.movement = true;
            }
            break;
         }
         case 'w_puzzle2': {
            if (save.data.n.plot_call < 2 && game.movement) {
               game.movement = false;
               save.data.n.plot_call = 2;
               atlas.switch('dialoguerBottom');
               assets.sounds.phone.instance(timer);
               await typer.text(...text.a_outlands.plot_call.b());
               if (choicer.result === 0) {
                  await typer.text(...text.a_outlands.plot_call.b1);
               } else {
                  await typer.text(...text.a_outlands.plot_call.b2);
                  save.data.b.snail_pie = true;
               }
               await typer.text(commonText.c_call2);
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'w_puzzle3': {
            if (save.data.n.plot_call < 3 && game.movement) {
               game.movement = false;
               save.data.n.plot_call = 3;
               atlas.switch('dialoguerBottom');
               assets.sounds.phone.instance(timer);
               await typer.text(...text.a_outlands.plot_call.c, commonText.c_call2);
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'w_pacing': {
            if (save.data.n.plot_call < 4 && game.movement) {
               game.movement = false;
               save.data.n.plot_call = 4;
               atlas.switch('dialoguerBottom');
               assets.sounds.phone.instance(timer);
               await typer.text(...text.a_outlands.plot_call.d, commonText.c_call2);
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'w_basement': {
            areaKills() > 6 && instanceDestroy([ 'w_manana' ]);
            break;
         }
         case 'w_froggit': {
            areaKills() > 2 && instanceDestroy([ 'w_loox' ]);
            break;
         }
         case 'w_stairs':
            (world.population === 0 || save.data.n.plot > 64.1) && instanceDestroy([ 'w_silencio' ]);
            save.data.b.item_halo && instanceDestroy([ 'w_halo' ]);
            break;
         case 'w_party':
            save.data.b.genocide && instanceDestroy([ 'w_soupguy' ]);
            save.data.b.genocide && instanceDestroy([ 'w_supervisor' ]);
            save.data.b.genocide && instanceDestroy([ 'w_bpatron' ]);
            save.data.b.genocide && instanceDestroy([ 'w2_steaksalesman' ]);
            if (!save.data.b.genocide && (save.data.n.plot > 17 || save.data.b.w_state_catnap)) {
               instanceDestroy([ 'w_supervisor' ]);
               instanceDestroy([ 'w_bpatron' ]);
               instanceDestroy([ 'w2_steaksalesman' ]);
               instanceDestroy([ 'w2_steakitem' ]);
               instanceDestroy([ 'w2_sodaitem' ]);
               instanceDestroy([ 'w_tomcryme' ]);
               instanceDestroy([ 'w2_table' ]);
               instanceDestroy([ 'w2_tablebarrier' ], 'below');
            }
            const steakitem = objectsByTag(tags => tags.includes('w2_steakitem'))[0];
            if (steakitem && !steakitem.metadata.active) {
               steakitem.metadata.active = true;
               steakitem.on('tick', () => {
                  steakitem.alpha.value = save.data.b.w_state_steak ? 0 : 1;
               });
            }
            const sodaitem = objectsByTag(tags => tags.includes('w2_sodaitem'))[0];
            if (sodaitem && !sodaitem.metadata.active) {
               sodaitem.metadata.active = true;
               sodaitem.on('tick', () => {
                  sodaitem.alpha.value = save.data.b.w_state_soda ? 0 : 1;
               });
            }
            const cryme = objectsByTag(tags => tags.includes('w_tomcryme'))[0];
            if (cryme && !cryme.metadata.active) {
               cryme.metadata.active = true;
               cryme.on('tick', () => {
                  for (const object of cryme.objects) {
                     if (object instanceof CosmosAnimation) {
                        if (save.data.b.genocide) {
                           if (save.data.n.plot > 13) {
                              object.alpha.value = 0;
                           } else {
                              object.resources === content.ionOTomCryme && object.use(content.ionOTomCrymeGeno);
                              object.alpha.value = 1;
                           }
                        } else {
                           object.resources === content.ionOTomCrymeGeno && object.use(content.ionOTomCryme);
                           object.alpha.value = 1;
                        }
                     } else if (object instanceof CosmosSprite) {
                        object.alpha.value = save.data.b.genocide ? 1 : 0;
                     } else if (object instanceof CosmosHitbox) {
                        if (typeof object.metadata.trigger === 'boolean') {
                           object.metadata.trigger = save.data.b.genocide;
                        } else if (typeof object.metadata.barrier === 'boolean' && object.anchor.x > 1) {
                           object.metadata.barrier = save.data.b.genocide;
                        } else if (save.data.b.genocide && save.data.n.plot > 13) {
                           typeof object.metadata.barrier === 'boolean' && (object.metadata.barrier = false);
                           typeof object.metadata.interact === 'boolean' && (object.metadata.interact = false);
                           object.alpha.value = 0;
                        } else {
                           typeof object.metadata.barrier === 'boolean' && (object.metadata.barrier = true);
                           typeof object.metadata.interact === 'boolean' && (object.metadata.interact = true);
                           object.alpha.value = 1;
                        }
                     }
                  }
               });
            }
            break;
         case 'w_alley4':
            if (!roomState.goated) {
               roomState.goated = true;
               if (world.azzie && save.flag.n.ga_asrielOutlands6++ < 1) {
                  dialogue('auto', ...text.a_outlands.noticereturn);
               }
            }
            break;
      }
      if (game.room === 'w_alley4' && save.data.n.plot > 13 && world.genocide && !roomState.active2) {
         roomState.active2 = true;
         const jeebs = assets.music.prebattle.instance(timer);
         jeebs.rate.value = 0.25;
         jeebs.gain.value = 0;
         jeebs.gain.modulate(timer, 300, 0.45);
         CosmosUtils.chain<void, Promise<void>>(void 0, async (value, next) => {
            const [ from, to ] = await events.on('teleport');
            if (save.data.n.plot < 16) {
               if (from === 'w_alley4' && to === 'w_alley3') {
                  jeebs.gain.modulate(timer, 300, 0);
               } else if (from === 'w_alley3' && to === 'w_alley4') {
                  jeebs.gain.modulate(timer, (jeebs.gain.value / 0.45) * 300, 0.45);
               }
               next();
            } else {
               jeebs.stop();
            }
         });
      }
   } else {
      const scriptState = states.scripts[subscript] || (states.scripts[subscript] = {});
      switch (subscript) {
         case 'breakfast': {
            if (player.face !== 'down') {
               break;
            }
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (save.storage.inventory.size === 8) {
               await typer.text(...text.a_outlands.breakslow);
            } else {
               save.data.n.state_toriel_food = 4;
               save.storage.inventory.add('snails');
               assets.sounds.equip.instance(timer);
               instanceDestroy([ 'aClassicDreemurrBreakfast' ], 'main');
               await typer.text(...text.a_outlands.breakfast);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'piecheck': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_outlands.piecheck());
            if (save.data.n.plot > 7 && world.population < 7 && save.data.n.state_wastelands_mash < 1) {
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_outlands.piesmash1);
               } else {
                  save.data.n.state_wastelands_mash = save.data.n.plot < 8.1 ? 1 : 2;
                  await dialogue('auto', ...text.a_outlands.piesmash2);
                  const whitefader = fader({ fill: 'white' }, 'menu');
                  await whitefader.alpha.modulate(timer, 150, 1);
                  (objectsByTag(tags => tags.includes('w_piepan'))[0].objects[0] as CosmosAnimation).index = 2;
                  assets.sounds.stab.instance(timer);
                  shake(4, 800);
                  await timer.pause(300);
                  whitefader.alpha.modulate(timer, 300, 0).then(() => renderer.detach('menu', whitefader));
                  await timer.pause(1500);
                  await dialogue('auto', ...text.a_outlands.piesmash3);
               }
            }
            game.movement = true;
            break;
         }
         case 'latetoriel': {
            if (!game.movement) {
               return;
            }
            instance('main', 'latetoriel')?.talk(
               'a',
               talkFilter(),
               'auto',
               ...(save.data.b.w_state_latetoriel ? text.a_outlands.latetoriel2 : text.a_outlands.latetoriel1)
            );
            save.data.b.w_state_latetoriel = true;
            break;
         }
         case 'fireplace': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_outlands.fireplace1);
            if (choicer.result === 0) {
               azzie.metadata.override = true;
               const promo = Promise.all([
                  world.azzie ? azzie.walk(timer, 1, { x: 168, y: 101 }).then(() => (azzie.face = 'down')) : void 0,
                  player.walk(timer, 1, { x: 168 }, { x: 168, y: 72 })
               ]);
               await dialogue('auto', ...text.a_outlands.fireplace2b());
               if (toriCheck()) {
                  await instance('main', 'theOneAndOnlyChairiel')!.talk(
                     'a',
                     talkFilter(),
                     'auto',
                     ...text.a_outlands.fireplace2c
                  );
               } else {
                  await dialogue('auto', ...text.a_outlands.fireplace2d);
               }
               await promo;
               await keys.interactKey.on('down');
               await player.walk(timer, 1, { y: 80 });
               azzie.metadata.override = false;
               azzie.metadata.reposition = true;
               azzie.metadata.repositionFace = 'up';
            } else {
               await dialogue('auto', ...text.a_outlands.fireplace2a);
            }
            game.movement = true;
            break;
         }
         case 'twinkly': {
            if (!game.movement) {
               return;
            }
            if (save.data.n.plot > 0) {
               return;
            } else {
               save.data.n.plot = 1;
            }
            const progress = save.flag.n.progress_twinkly;
            const torielMusic = content.amToriel.load();
            const twinklyMusic = content.amTwinkly.load();
            const twinklyAssets = new CosmosInventory(
               content.idcTwinklyNice,
               content.idcTwinklySide,
               content.idcTwinklyKawaii,
               content.idcTwinklyCapping,
               content.idcTwinklySassy,
               content.idcTwinklyPlain,
               content.idcTwinklyPissed,
               content.idcTwinklyWink,
               content.avTwinkly1
            );
            const twinklyQueue = progress < 4 ? twinklyAssets.load() : timer.pause();
            const battleAssets = new CosmosInventory(
               content.ibcTorielCutscene1,
               content.ibcTorielCutscene2,
               content.asTwinklyHurt,
               content.asTwinklyLaugh,
               content.idcTwinklyGonk,
               content.avTwinkly2,
               content.idcTwinklyGrin,
               content.idcTwinklyEvil,
               content.idcTwinklyLaugh,
               content.idcTwinklyHurt,
               content.ibbFirebol,
               content.ibbPellet,
               content.ibuBubbleTwinkly,
               content.idcTwinklyPissed,
               content.idcTwinklyNice
            );
            const battleQueue = progress < 3 ? battleAssets.load() : timer.pause();
            game.movement = false;
            let vibes: CosmosInstance;
            if (progress < 4) {
               const time = timer.value;
               const beamScaleX = new CosmosValue();
               const beam = new CosmosRectangle({
                  anchor: 0,
                  position: { x: player.x, y: renderer.position.clamp(...renderer.region).y },
                  size: { x: 40, y: 240 },
                  priority: -10,
                  fill: '#fff7',
                  stroke: 'transparent',
                  objects: [ new CosmosRectangle({ fill: '#fffc', anchor: 0, size: { x: 35, y: 240 } }) ]
               }).on('tick', () => {
                  beam.scale.x = beamScaleX.value + CosmosMath.wave(((timer.value - time) % 250) / 250) * 0.1;
               });
               const starPositionY = new CosmosValue();
               const star = new CosmosAnimation({
                  alpha: 0,
                  priority: -1,
                  anchor: { x: 0, y: 1 },
                  position: { x: player.x },
                  resources: content.iocTwinkly
               }).on('tick', function () {
                  this.position.y = starPositionY.value + CosmosMath.wave(((timer.value - time) % 2500) / 2500) * 5;
               });
               await timer.pause(250);
               renderer.attach('main', beam);
               await beamScaleX.modulate(timer, 350, 0, 1);
               await timer.pause(400);
               await content.iocTwinkly.load();
               renderer.attach('main', star);
               await Promise.all([
                  star.alpha.modulate(timer, 800, 0, 1),
                  starPositionY.modulate(timer, 800, 140, 140, 140),
                  timer
                     .pause(300)
                     .then(() => beamScaleX.modulate(timer, 350, 1, 0))
                     .then(() => renderer.detach('main', beam))
               ]);
               const timesMet = save.flag.n.encounter_twinkly++;
               await twinklyMusic;
               const music = assets.music.twinkly.instance(timer);
               if (progress === 3 || timesMet > 1) {
                  music.gain.value = 0;
               }
               await twinklyQueue;
               speech.targets.add(star);
               atlas.switch('dialoguerBottom');
               if (progress % 2 === 1) {
                  save.flag.n.progress_twinkly++;
               } else if (progress === 1.5) {
                  save.flag.n.progress_twinkly = 2;
               }
               await typer.text(
                  ...(progress === 3
                     ? save.flag.n.genocide_twinkly > 0
                        ? [
                             ...text.a_outlands.twinkly9a,
                             ...[
                                text.a_outlands.twinkly9a1,
                                text.a_outlands.twinkly9a2,
                                text.a_outlands.twinkly9a3,
                                text.a_outlands.twinkly9a4,
                                text.a_outlands.twinkly9a5,
                                text.a_outlands.twinkly9a6,
                                text.a_outlands.twinkly9a7
                             ][save.flag.n.genocide_milestone || 0],
                             ...text.a_outlands.twinkly9a8
                          ]
                        : text.a_outlands.twinkly9
                     : progress === 0
                     ? [
                          ...(timesMet < 2 ? text.a_outlands.twinkly1 : []),
                          ...[
                             text.a_outlands.twinkly2,
                             text.a_outlands.twinkly3,
                             text.a_outlands.twinkly4,
                             text.a_outlands.twinkly5
                          ][Math.min(timesMet, 3)]
                       ]
                     : [
                          ...(progress === 1
                             ? text.a_outlands.twinkly6
                             : progress === 1.5
                             ? text.a_outlands.twinkly6a
                             : text.a_outlands.twinkly7),
                          ...text.a_outlands.twinkly8
                       ])
               );
               atlas.switch(null);
               speech.targets.delete(star);
               if (progress === 3) {
                  await Promise.all([
                     music.gain.modulate(timer, 800, 0),
                     star.alpha.modulate(timer, 800, 1, 1, 0),
                     starPositionY.modulate(timer, 800, starPositionY.value, starPositionY.value, 0)
                  ]);
                  music.stop();
                  renderer.detach('main', star);
                  content.iocTwinkly.unload();
               } else {
                  const twinklyText = async (...lines: string[]) => {
                     renderer.attach('menu', scriptState.speech!);
                     await typer.text(...lines);
                     renderer.detach('menu', scriptState.speech!);
                  };
                  if (progress === 0) {
                     await battleQueue;
                     await battler.battlefall(player, { x: 160, y: 160 });
                     speech.state.face = faces.twinklyPlain;
                     music.gain.modulate(timer, 300, 0.3);
                  } else {
                     music.stop();
                     assets.sounds.noise.instance(timer);
                     renderer.alpha.value = 0;
                     speech.state.face = faces.twinklyEvil;
                     await Promise.all([ battleQueue, timer.pause(300) ]);
                     assets.sounds.noise.instance(timer);
                     renderer.attach('menu', battler.SOUL);
                     battler.SOUL.alpha.value = 1;
                     battler.SOUL.position.set(160);
                     renderer.alpha.value = 1;
                  }
                  const battleStar = new CosmosObject({
                     priority: 1,
                     position: { x: 160, y: 80 }
                  }).on('tick', function () {
                     this.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                     this.position.y = starPositionY.value + CosmosMath.wave(((timer.value - time) % 2500) / 2500) * 5;
                  });
                  battler.box.size.x = 155 / 2;
                  battler.box.size.y = 130 / 2;
                  battler.box.x = 160;
                  battler.box.y = 160;
                  atlas.switch('battlerSimple');
                  starPositionY.value = 85;
                  renderer.detach('main', star);
                  renderer.attach('menu', battleStar);
                  content.iocTwinkly.unload();
                  battler.active = true;
                  game.movement = true;
                  events.fire('battle');
                  await timer.pause(1000);
                  scriptState.speech ||= new CosmosObject({
                     position: { x: 375 / 2, y: 134 / 2 },
                     objects: [ battler.bubbles.twinkly ]
                  });
                  if (save.flag.n.progress_twinkly === 0) {
                     await twinklyText(...text.a_outlands.twinkly10);
                     speech.state.face = faces.twinklyWink;
                     await timer.pause(1350);
                     let stage = 0;
                     while (stage++ < 3) {
                        const pellets = CosmosUtils.populate(5, index => patterns.twinkly(0, index, stage));
                        header('x2').then(() => {
                           for (const pellet of pellets) {
                              pellet.alpha.modulate(timer, 40, 1);
                           }
                        });
                        twinklyText(
                           ...[ text.a_outlands.twinkly11, text.a_outlands.twinkly12, text.a_outlands.twinkly13 ][
                              stage - 1
                           ]
                        );
                        await header('x1');
                        if (stage === 3) {
                           speech.state.face = faces.twinklySide;
                           await timer.pause(1250);
                           game.text = CosmosUtils.format(text.a_outlands.twinkly14, 20, true);
                           speech.state.face = faces.twinklyNice;
                           timer.pause(1500).then(() => {
                              typer.read(true);
                              timer.pause().then(() => {
                                 game.text = '';
                              });
                           });
                        }
                        for (const [ index, pellet ] of pellets.entries()) {
                           pellet.position.modulate(
                              timer,
                              6000,
                              pellet.position.endpoint(
                                 battler.SOUL.position.angleFrom(pellet.position) + (index - 2) * 2,
                                 400
                              )
                           );
                        }
                        if (
                           await Promise.race([ events.on('hurt').then(() => true), timer.pause(3200).then(() => false) ])
                        ) {
                           stage = 3;
                           music.stop();
                           typer.text();
                           speech.state.face = faces.twinklyEvil;
                           save.flag.n.progress_twinkly = 1;
                           save.data.n.hp = 1;
                           shake(2, 500);
                           await timer.pause(1500);
                           await twinklyText(...text.a_outlands.twinkly15);
                        } else if (stage === 3) {
                           save.flag.n.progress_twinkly = 1.5;
                           await Promise.all([
                              music.rate.modulate(timer, 1250, 0.5),
                              music.gain.modulate(timer, 1250, 0)
                           ]);
                           await timer.pause(350);
                           speech.state.face = faces.twinklyEvil;
                           await timer.pause(1350);
                           await twinklyText(...text.a_outlands.twinkly16);
                        } else {
                           music.rate.value -= 0.05;
                           await timer.pause(1000);
                        }
                     }
                  } else {
                     await twinklyText(...text.a_outlands.twinkly17);
                  }
                  const pellets = CosmosUtils.populate(40, index => patterns.twinkly(1, index));
                  await timer.pause(1800);
                  await twinklyText(...text.a_outlands.twinkly18);
                  speech.state.face = faces.twinklyLaugh;
                  speech.state.face.enable();
                  const laugh = assets.sounds.twinklyLaugh.instance(timer);
                  for (const pellet of pellets) {
                     pellet.metadata.active = true;
                  }
                  await events.on('heal');
                  laugh.stop();
                  shake(2, 1000);
                  await timer.pause(400);
                  speech.state.face.disable().reset();
                  speech.state.face = faces.twinklyPlain;
                  await timer.pause(850);
                  speech.state.face = faces.twinklySide;
                  await timer.pause(350);
                  const firebol = patterns.twinkly(2);
                  let flash = 0;
                  while (flash++ < 6) {
                     firebol.alpha.value = 0;
                     await timer.pause(50);
                     firebol.alpha.value = 1;
                     await timer.pause(50);
                  }
                  save.flag.n.progress_twinkly = 3;
                  speech.state.face = faces.twinklyGonk;
                  await firebol.position.modulate(timer, 400, { x: 160, y: 82 });
                  speech.state.face = faces.twinklyHurt;
                  assets.sounds.twinklyHurt.instance(timer);
                  renderer.detach('menu', firebol);
                  await Promise.all([
                     battleStar.scale.modulate(timer, 700, { x: 0.7, y: 0.7 }),
                     battleStar.rotation.modulate(timer, 700, -150),
                     battleStar.position.modulate(timer, 700, { x: -20, y: 0 }),
                     starPositionY.modulate(timer, 700, 10)
                  ]);
                  renderer.detach('menu', battleStar);
                  const battleTori = new CosmosAnimation({
                     blend: BLEND_MODES.ADD,
                     anchor: { x: 0, y: 1 },
                     position: { x: 360, y: 115 },
                     resources: content.ibcTorielCutscene2
                  });
                  speech.targets.add(battleTori);
                  renderer.attach('menu', battleTori);
                  await battleTori.position.modulate(timer, 1200, { x: 160, y: 115 });
                  await torielMusic;
                  vibes = assets.music.toriel.instance(timer);
                  vibes.gain.value /= 4;
                  vibes.gain.modulate(timer, 300, vibes.gain.value * 4);
                  scriptState.speech.position.y = (44 + 12) / 2 + 6;
                  await twinklyText(...text.a_outlands.twinkly19);
                  await timer.pause(650);
                  battleTori.resources = content.ibcTorielCutscene1;
                  await twinklyText(...text.a_outlands.twinkly20);
                  await renderer.alpha.modulate(timer, 300, 0);
                  battler.active = false;
                  game.movement = false;
                  speech.targets.delete(battleTori);
                  renderer.detach('menu', battleTori);
                  battler.SOUL.alpha.value = 0;
                  battleAssets.unload();
               }
               content.amTwinkly.unload();
            }
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: 120, y: 140 },
               preset: characters.toriel,
               key: 'toriel'
            });
            renderer.attach('main', tori);
            if (progress > 2) {
               tori.position.y = 5;
               await walkHer(tori, { x: 0, y: 3 }, position => position.y < 140);
               await torielMusic;
               vibes = assets.music.toriel.instance(timer);
               vibes.gain.value /= 4;
               vibes.gain.modulate(timer, 300, vibes.gain.value * 4);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.twinkly21);
               atlas.switch(null);
            } else {
               tori.face = 'up';
               atlas.switch('dialoguerBottom');
               renderer.alpha.modulate(timer, 300, 1);
               await typer.text(...text.a_outlands.twinkly22);
               atlas.switch(null);
            }
            game.movement = true;
            walkHer(tori, { x: 0, y: -3 }, position => position.y > 5).then(() => {
               renderer.detach('main', tori);
            });
            events.on('teleport').then(async () => {
               await vibes.gain.modulate(timer, 600, 0);
               vibes.stop();
            });
            content.amToriel.unload();
            twinklyAssets.unload();
            break;
         }
         case 'tutorial_puzzle': {
            if (args[0] === 'encourage') {
               if (save.data.n.plot < 2.2) {
                  if (!game.movement || !game.menu) {
                     return;
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.tutorial_puzzle8);
                  atlas.switch(null);
                  game.movement = true;
               }
               return;
            }
            let stage = 0;
            if (!scriptState.active && save.data.n.plot < 2.2) {
               for (const button of objectsByTag(tags => tags.includes('t_button'))) {
                  (button.objects[0] as CosmosAnimation).index = 1;
               }
            }
            if (save.data.n.plot > 2.1) {
               scriptState.clear ||
                  (scriptState.clear = (tag: string) => {
                     instanceDestroy([ 'barrier', tag ]);
                     for (const button of objectsByTag(
                        tags => tags.includes('t_button') && (tags.includes(`${tag}0`) || tags.includes(`${tag}1`))
                     )) {
                        (button.objects[0] as CosmosAnimation).index = 0;
                     }
                     for (const object of objectsByTag(tags => tags.includes('gate') && tags.includes(tag))) {
                        const gate = object.objects[0] as CosmosAnimation;
                        gate.index = 5;
                        if (gate.position.y === 0) {
                           gate.position.y = object.position.y;
                           object.position.y = 0;
                        }
                     }
                  });
               scriptState.clear('0');
               scriptState.active || (stage += 2);
               if (save.data.n.plot > 2.11) {
                  scriptState.clear('1');
                  scriptState.active || (stage += 2);
                  if (save.data.n.plot > 2.12) {
                     scriptState.clear('2');
                     scriptState.active || (stage += 2);
                  }
               }
            }
            if (scriptState.active || save.data.n.plot > 2.2) {
               return;
            } else if (save.data.n.plot < 2.2) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            if (save.data.n.plot < 2.21) {
               scriptState.active = true;
               const tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  size: { x: 25, y: 15 },
                  metadata: { barrier: true, interact: true, name: 'outlands', args: [ 'tutorial_puzzle', 'encourage' ] },
                  position:
                     save.data.n.plot < 2.1
                        ? { x: 90, y: 110 }
                        : save.data.n.plot < 2.2
                        ? { x: 280, y: 130 }
                        : { x: 280, y: 390 },
                  preset: characters.toriel,
                  key: 'toriel'
               }).on('tick', async function () {
                  if (save.data.n.plot > 2.2) {
                     return;
                  }
                  tori.preset = game.room === 'w_tutorial' ? characters.toriel : characters.none;
                  tori.metadata.barrier = game.room === 'w_tutorial';
                  tori.metadata.interact = game.room === 'w_tutorial';
                  if (
                     game.room === 'w_tutorial' &&
                     save.data.n.plot === 2.2 &&
                     (player.y > this.position.y || player.position.extentOf(this.position) < 60)
                  ) {
                     save.data.n.plot = 2.21;
                     await Promise.race([
                        events.on('teleport'),
                        walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 420).then(async () => {
                           await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 315);
                           await tori.alpha.modulate(timer, 300, 0);
                        })
                     ]);
                     renderer.detach('main', tori);
                  }
               });
               if (save.data.n.plot < 2.1) {
                  tori.face = 'down';
               } else {
                  tori.face = 'left';
               }
               renderer.attach('main', tori);
               if (save.data.n.plot < 2.2) {
                  const buttons = Object.fromEntries(
                     objectsByTag(tags => tags.includes('t_button')).map(object => [
                        (object.metadata.tags as string[])[0],
                        [ object, object.objects[0] ]
                     ])
                  ) as CosmosKeyed<[CosmosObject, CosmosAnimation], `${0 | 1 | 2}${0 | 1 | 2}`>;
                  for (const self of [ tori, player ]) {
                     (self as CosmosEntity).on('tick', async () => {
                        if (stage < 6 && game.room === 'w_tutorial') {
                           for (const [ button, animation ] of Object.values(buttons)) {
                              if (
                                 animation.index === 1 &&
                                 self.position.extentOf({ x: button.position.x, y: animation.position.y }) < 10 &&
                                 self.position.y > animation.position.y - 2
                              ) {
                                 animation.index = 0;
                                 assets.sounds.noise.instance(timer);
                                 if (++stage % 2 === 0) {
                                    game.movement = false;
                                    const tag = (stage / 2 - 1).toString();
                                    timer.pause(50).then(() => {
                                       assets.sounds.retract.instance(timer).rate.value = 1.25;
                                    });
                                    objectsByTag(tags => tags.includes('gate') && tags.includes(tag)).map(
                                       async object => {
                                          const gate = object.objects[0] as CosmosAnimation;
                                          gate.step = 0;
                                          gate.index = 1;
                                          gate.enable();
                                          await timer.when(() => gate.index === 5);
                                          gate.disable();
                                          instanceDestroy([ 'barrier', tag ]);
                                          if (gate.position.y === 0) {
                                             gate.position.y = object.position.y;
                                             object.position.y = 0;
                                          }
                                       }
                                    );
                                    await timer.pause(300);
                                 } else {
                                    await timer.pause(150);
                                 }
                                 atlas.switch('dialoguerBottom');
                                 switch (stage) {
                                    case 1:
                                       if (save.data.n.plot === 2.1) {
                                          await typer.text(...text.a_outlands.tutorial_puzzle2a);
                                       } else {
                                          await typer.text(...text.a_outlands.tutorial_puzzle2);
                                          save.data.n.plot = 2.1;
                                       }
                                       game.movement = true;
                                       break;
                                    case 2:
                                       await typer.text(...text.a_outlands.tutorial_puzzle3);
                                       atlas.switch(null);
                                       game.movement = true;
                                       game.menu = false;
                                       walkHer(tori, { x: 0, y: 4 }, position => position.y < 250).then(() => {
                                          game.movement = false;
                                          game.menu = true;
                                       });
                                       break;
                                    case 3:
                                       if (save.data.n.plot === 2.11) {
                                          await typer.text(...text.a_outlands.tutorial_puzzle4a);
                                       } else {
                                          await typer.text(...text.a_outlands.tutorial_puzzle4);
                                          save.data.n.plot = 2.11;
                                       }
                                       game.movement = true;
                                       break;
                                    case 4:
                                       await typer.text(...text.a_outlands.tutorial_puzzle5);
                                       atlas.switch(null);
                                       game.movement = true;
                                       game.menu = false;
                                       walkHer(tori, { x: 0, y: 4 }, position => position.y < 330).then(() => {
                                          game.movement = false;
                                          game.menu = true;
                                       });
                                       break;
                                    case 5:
                                       tori.face = 'left';
                                       save.data.n.plot = 2.12;
                                       game.movement = true;
                                       break;
                                    case 6:
                                       await typer.text(...text.a_outlands.tutorial_puzzle6);
                                       atlas.switch(null);
                                       await walkHer(tori, { x: 0, y: 3 }, position => position.y < 390);
                                       await walkHer(tori, { x: 3, y: 0 }, position => position.x < 280);
                                       tori.face = 'left';
                                       await timer.pause(650);
                                       atlas.switch('dialoguerBottom');
                                       await typer.text(...text.a_outlands.tutorial_puzzle7);
                                       save.data.n.plot = 2.2;
                                       tori.metadata.interact = false;
                                       tori.metadata.barrier = false;
                                       game.movement = true;
                                       break;
                                 }
                                 atlas.switch(null);
                              }
                           }
                        }
                     });
                  }
                  if (save.data.n.plot < 2.1) {
                     await timer.pause(850);
                     atlas.switch('dialoguerBottom');
                     await typer.text(...text.a_outlands.tutorial_puzzle1);
                     atlas.switch(null);
                     await walkHer(tori, { x: 4, y: 0 }, position => position.x < 270);
                     await walkHer(tori, { x: 0, y: 4 }, position => position.y < 170);
                  } else {
                     await timer.pause(350);
                     await walkHer(tori, { x: -4, y: 0 }, position => position.x > 270);
                     await walkHer(
                        tori,
                        { x: 0, y: 4 },
                        position =>
                           position.y < (save.data.n.plot === 2.1 ? 170 : save.data.n.plot === 2.11 ? 250 : 330)
                     );
                  }
               }
            }
            break;
         }
         case 'dummy': {
            if (args[0] === 'prompt') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (save.data.n.plot < 2.31) {
                  await typer.text(...text.a_outlands.dummy3);
                  save.data.n.plot = 2.31;
               } else if (save.data.n.plot < 2.32) {
                  await typer.text(...text.a_outlands.dummy4);
                  save.data.n.plot = 2.32;
               } else {
                  await typer.text(...text.a_outlands.dummy5);
               }
               atlas.switch(null);
               game.movement = true;
               return;
            } else if (args[0] === 'dummybody') {
               if (!game.movement) {
                  return;
               }
               if (save.data.n.plot < 2.4) {
                  game.music!.gain.value = 0;
                  game.movement = false;
                  await Promise.all([ battler.load(groups.dummy), battler.battlefall(player) ]);
                  await battler.start(groups.dummy);
                  game.music!.gain.modulate(timer, 300, world.level);
                  if (save.data.n.state_wastelands_dummy === 1 || save.data.n.state_wastelands_dummy === 5) {
                     instanceDestroy([ 'dummybody' ]);
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  switch (save.data.n.state_wastelands_dummy) {
                     case 0:
                        await typer.text(...text.a_outlands.dummy7);
                        break;
                     case 1:
                        await typer.text(...text.a_outlands.dummy6);
                        break;
                     case 2:
                        await typer.text(...text.a_outlands.dummy8);
                        break;
                     case 3:
                        await typer.text(...text.a_outlands.dummy9);
                        break;
                     case 4:
                        await typer.text(...text.a_outlands.dummy10);
                        break;
                     case 5:
                        await typer.text(...text.a_outlands.dummy12);
                        break;
                     case 6:
                        await typer.text(...text.a_outlands.dummy9a);
                        break;
                  }
                  atlas.switch(null);
                  game.movement = true;
                  save.data.n.plot = 2.4;
               } else {
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.w_dummy1);
                  atlas.switch(null);
                  game.movement = true;
               }
               return;
            }
            if (save.data.n.plot > 2.32) {
               instanceDestroy([ 'toribarrier' ], 'below');
            }
            const dgone = save.data.n.state_wastelands_dummy === 1 || save.data.n.state_wastelands_dummy === 5;
            const dflee = world.genocide && save.data.n.plot > 13;
            (dgone || dflee) && instanceDestroy([ 'dummybody' ]);
            if (!dgone && dflee && world.azzie && !scriptState.goated) {
               scriptState.goated = true;
               timer
                  .when(() => player.y > 40 && game.room === 'w_dummy' && game.movement)
                  .then(async () => {
                     if (save.flag.n.ga_asrielOutlands5++ < 1) {
                        await dialogue('auto', ...text.a_outlands.noticedummy);
                     }
                  });
            }
            if (scriptState.active) {
               return;
            } else if (save.data.n.plot < 2.3) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            if (save.data.n.plot < 2.41) {
               scriptState.active = true;
               const tori = (scriptState.tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: save.data.n.plot < 2.3 ? { x: 120, y: 160 } : { x: 200, y: 110 },
                  preset: characters.toriel,
                  key: 'toriel'
               }).on('tick', async function () {
                  if (save.data.n.plot > 2.4) {
                     return;
                  }
                  this.preset = !this.metadata.hide && game.room === 'w_dummy' ? characters.toriel : characters.none;
                  this.metadata.barrier = !this.metadata.hide && game.room === 'w_dummy';
                  this.metadata.interact = !this.metadata.hide && game.room === 'w_dummy';
                  if (save.data.n.plot === 2.4) {
                     save.data.n.plot = 2.41;
                     await Promise.race([
                        events.on('teleport'),
                        walkHer(this, { x: 0, y: -4 }, pos => pos.y > 95).then(async () => {
                           await this.alpha.modulate(timer, 300, 0);
                        })
                     ]);
                     renderer.detach('main', this);
                  }
               }));
               if (save.data.n.plot < 2.3) {
                  tori.face = 'left';
               } else {
                  tori.face = 'down';
               }
               renderer.attach('main', tori);
               if (save.data.n.plot < 2.3) {
                  await timer.pause(350);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.dummy1);
                  atlas.switch(null);
                  await walkHer(tori, { x: 4, y: 0 }, position => position.x < 200);
                  tori.position.x = 200;
                  await walkHer(tori, { x: 0, y: -4 }, position => position.y > 110);
                  tori.position.y = 110;
                  tori.face = 'down';
                  await timer.pause(650);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.dummy2);
                  atlas.switch(null);
                  game.movement = true;
                  save.data.n.plot = 2.3;
               }
            }
            break;
         }
         case 'danger_puzzle': {
            if (args[0] === 'froggit') {
               if (!game.movement) {
                  return;
               }
               if (save.data.n.plot < 2.6) {
                  save.data.n.plot = 2.6;
                  game.music!.gain.value = 0;
                  game.movement = false;
                  await Promise.all([
                     battler.load(groups.froggit),
                     content.amBattle1.load(),
                     await battler.battlefall(player)
                  ]);
                  await battler.start(groups.fakefroggit);
                  game.movement = true;
                  game.music!.gain.modulate(timer, 300, world.level);
               }
            } else if (args[0] === 'terminal') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.danger_puzzle2);
               switch (save.data.n.plot) {
                  case 2.6:
                     save.data.n.plot = 2.601;
                     break;
                  case 2.602:
                     save.data.n.plot = 2.603;
                     break;
                  case 2.601:
                  case 2.603: {
                     scriptState.tori.face = 'down';
                     atlas.switch('dialoguerBottom');
                     await typer.text(...text.a_outlands.danger_puzzle3);
                     atlas.switch(null);
                     await walkHer(scriptState.tori!, { x: 0, y: 3 }, position => position.y < 170);
                     await walkHer(scriptState.tori!, { x: 3, y: 0 }, position => position.x < 130);
                     await timer.pause(850);
                     atlas.switch('dialoguerBottom');
                     await typer.text(...text.a_outlands.danger_puzzle4);
                     await typer.text(
                        ...[ text.a_outlands.danger_puzzle5a, text.a_outlands.danger_puzzle5e ][choicer.result]
                     );
                     atlas.switch(null);
                     walkHer(player, { x: 0, y: 3 }, position => position.y < 200).then(() => {
                        player.face = 'up';
                     });
                     await walkHer(scriptState.tori!, { x: 3, y: 0 }, position => position.x < 160);
                     await walkHer(scriptState.tori!, { x: 0, y: -3 }, position => position.y > 170);
                     await timer.pause(1250);
                     if (choicer.result === 0) {
                        scriptState.tori!.face = 'down';
                        await timer.pause(650);
                        atlas.switch('dialoguerBottom');
                        await typer.text(
                           ...[
                              ...text.a_outlands.danger_puzzle5b,
                              ...[ text.a_outlands.danger_puzzle5c, text.a_outlands.danger_puzzle5d ][
                                 save.data.b.oops ? 1 : 0
                              ]
                           ]
                        );
                        atlas.switch(null);
                        await timer.pause(250);
                        scriptState.tori!.face = 'up';
                        await timer.pause(1150);
                     } else {
                        await timer.pause(1150);
                     }
                     header('x1').then(() => {
                        assets.sounds.retract.instance(timer).rate.value = 1.25;
                        for (const object of objectsByTag(tags => tags.includes('dangerPylon'))) {
                           const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                           anim.enable();
                           anim.on('tick', () => {
                              if (anim.active && anim.index === 5) {
                                 anim.disable();
                                 object.objects.splice(1, 1);
                              }
                           });
                        }
                     });
                     atlas.switch('dialoguerBottom');
                     await typer.text(...text.a_outlands.danger_puzzle6);
                     atlas.switch(null);
                     await walkHer(scriptState.tori!, { x: -3, y: 0 }, position => position.x > 100);
                     await walkHer(scriptState.tori!, { x: 0, y: -3 }, position => position.y > 150);
                     await walkHer(scriptState.tori!, { x: -3, y: 0 }, position => position.x > 40);
                     scriptState.tori!.face = 'right';
                     save.data.n.plot = 2.61;
                     await timer.pause(650);
                     atlas.switch('dialoguerBottom');
                     await typer.text(...text.a_outlands.danger_puzzle7);
                     atlas.switch(null);
                  }
               }
               atlas.switch(null);
               game.movement = true;
               break;
            } else if (args[0] === 'tori') {
               scriptState.tori.face = 'down';
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.danger_puzzle6);
               atlas.switch(null);
            }
            if (save.data.n.plot > 2.603) {
               for (const object of objectsByTag(tags => tags.includes('dangerPylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
            }
            if (scriptState.active || save.data.n.plot > 2.61) {
               return;
            } else if (save.data.n.plot < 2.5) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            scriptState.active = true;
            const tori = (scriptState.tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               size: { x: 25, y: 5 },
               metadata: { barrier: true, args: [ 'torieldanger' ], interact: true, name: 'outlands' },
               position:
                  save.data.n.plot < 2.5
                     ? { x: 100, y: 340 }
                     : save.data.n.plot < 2.61
                     ? { x: 100, y: 140 }
                     : { x: 40, y: 150 },
               preset: characters.toriel,
               key: 'toriel'
            }).on('tick', async function () {
               if (save.data.n.plot > 2.61) {
                  return;
               }
               this.preset = game.room === 'w_danger' ? characters.toriel : characters.none;
               this.metadata.barrier = game.room === 'w_danger';
               this.metadata.interact = game.room === 'w_danger';
               if (
                  game.room === 'w_danger' &&
                  save.data.n.plot === 2.61 &&
                  player.position.extentOf(tori.position) < 45
               ) {
                  save.data.n.plot = 2.62;
                  this.metadata.barrier = false;
                  this.metadata.interact = false;
                  await Promise.race([
                     events.on('teleport'),
                     walkHer(this, { x: -3, y: 0 }, pos => pos.x > 20).then(() => this.alpha.modulate(timer, 300, 0))
                  ]);
                  renderer.detach('main', this);
               }
            }));
            if (save.data.n.plot < 2.61) {
               tori.face = 'left';
            } else {
               tori.face = 'right';
            }
            renderer.attach('main', tori);
            if (save.data.n.plot < 2.5) {
               tori.face = 'down';
               await timer.pause(350);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.danger_puzzle1);
               atlas.switch(null);
               save.data.n.plot = 2.5;
               game.movement = true;
               await walkHer(tori, { x: 0, y: -4 }, position => position.y > 140).then(() => {
                  tori.face = 'left';
               });
            }
            break;
         }
         case 'zigzag_test': {
            if (player.x < 320 && player.y > 400) {
               renderer.region[0].x = 160;
               renderer.region[1].x = 160;
            } else if (player.x > 760 && player.y < 340) {
               renderer.region[0].x = 920;
               renderer.region[1].x = 920;
            } else {
               renderer.region[0].x = 160;
               renderer.region[1].x = 920;
            }
            if (scriptState.active || save.data.n.plot > 2.71) {
               return;
            } else {
               scriptState.active = true;
            }
            let cutscene = false;
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               size: { x: 25, y: 5 },
               position: save.data.n.plot < 2.7 ? { x: 245, y: 580 } : { x: 810, y: 105 },
               preset: characters.toriel,
               key: 'toriel'
            }).on('tick', async function () {
               if (!cutscene) {
                  this.preset = game.room === 'w_zigzag' ? characters.toriel : characters.none;
                  this.metadata.barrier = game.room === 'w_zigzag';
                  this.metadata.interact = game.room === 'w_zigzag';
               }
            });
            if (save.data.n.plot < 2.7) {
               tori.face = 'right';
            } else {
               tori.face = 'down';
            }
            renderer.attach('main', tori);
            const destiePromise = CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
               await renderer.on('tick');
               (game.room === 'w_zigzag' && player.position.extentOf({ x: 810, y: 105 }) < 50) || (await next());
            });
            if (save.data.n.plot < 2.7) {
               await timer.when(() => game.movement);
               game.movement = false;
               await timer.pause(350);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.indie1);
               if (choicer.result === 1) {
                  await typer.text(...text.a_outlands.indie1a);
                  if (choicer.result === 1) {
                     await typer.text(...text.a_outlands.indie1b);
                     if (choicer.result === 1) {
                        atlas.switch(null);
                        game.music!.gain.value = 0;
                        await timer.pause(1e3);
                        atlas.switch('dialoguerBottom');
                        await typer.text(...text.a_outlands.indie2b);
                        const feels = assets.music.toriel.instance(timer);
                        feels.gain.value /= 4;
                        feels.gain.modulate(timer, 300, (feels.gain.value * 4) / rooms.of(game.room).score.gain);
                        await typer.text(...text.a_outlands.indie2b1);
                        atlas.switch(null);
                        const handholder = new CosmosCharacter({
                           anchor: { x: 0, y: 1 },
                           position: { x: 260, y: 580 },
                           preset: characters.torielHandhold,
                           key: 'toriel'
                        });
                        handholder.face = 'left';
                        player.alpha.value = 0;
                        renderer.detach('main', tori);
                        renderer.attach('main', handholder);
                        const overlay = new CosmosRectangle({
                           alpha: 0,
                           size: { x: 1000, y: 1000 },
                           position: { x: 160, y: 120 },
                           anchor: 0,
                           fill: 'black',
                           stroke: 'transparent'
                        });
                        renderer.attach('menu', overlay);
                        const fader = overlay.alpha.modulate(timer, 3000, 1);
                        timer.pause(1850).then(() => {
                           feels.gain.modulate(timer, 1150, 1);
                           feels.rate.modulate(timer, 1150, 0.875);
                           audio.musicReverb.modulate(timer, 1150, 0.8);
                        });
                        await Promise.race([
                           fader,
                           walkHer(player, { x: -1.5, y: -1.5 }, position => position.x > 60),
                           walkHer(handholder, { x: -1.5, y: -1.5 }, position => position.x > 60)
                        ]).then(() => {
                           renderer.detach('main', handholder);
                        });
                        await fader;
                        await timer.pause(1150);
                        atlas.switch('dialoguerBottom');
                        await typer.text(
                           ...text.a_outlands.indie2c,
                           ...text.a_outlands.indie2e,
                           ...text.a_outlands.indie2f
                        );
                        atlas.switch(null);
                        renderer.alpha.value = 0;
                        feels!.gain.modulate(timer, 1500, 0).then(() => {
                           feels.stop();
                           audio.musicReverb.value = 0;
                           audio.musicMixer.value = 0;
                        });
                        await timer.pause(1350);
                        await teleport('w_toriel_asriel', 'left', 221, 139, world);
                        teleporter.movement = false;
                        game.movement = false;
                        game.music!.gain.value = 0;
                        (states.scripts.toriel_asriel_lamp || {}).active || script('toriel_asriel_lamp', 'silent');
                        await renderer.alpha.modulate(timer, 0, 0);
                        renderer.detach('menu', overlay);
                        const bedcover = new CosmosSprite({
                           position: { x: 206, y: 119 },
                           frames: [ content.iooOTorielAsrielOver ]
                        });
                        renderer.attach('above', bedcover);
                        player.alpha.value = 1;
                        player.face = 'left';
                        save.data.n.plot = 8.1;
                        save.data.n.plot_call = 4;
                        save.data.n.state_pie = 1;
                        save.data.n.state_wastelands_napstablook = 5;
                        script('pie', 'spawn');
                        renderer.alpha.modulate(timer, 300, 1);
                        audio.musicMixer.value = 1;
                        await timer.pause(850);
                        await player.position.modulate(timer, 850, { x: 195, y: 139 });
                        renderer.detach('above', bedcover);
                        game.movement = true;
                        return;
                     }
                  }
               }
               save.data.n.plot = 2.7;
               const queue = content.amTension.load();
               atlas.switch(null);
               game.music!.gain.value = 0;
               await timer.pause(650);
               atlas.switch('dialoguerBottom');
               await Promise.all([ queue, typer.text(...text.a_outlands.indie2a) ]);
               atlas.switch(null);
               game.movement = true;
               const tension = assets.music.tension.instance(timer);
               Promise.race([ destiePromise, events.on('teleport') ]).then(async () => {
                  await tension.gain.modulate(timer, 300, 0);
                  tension.stop();
                  content.amTension.unload();
               });
               walkHer(tori, { x: 0, y: -4.5 }, position => position.y > 555).then(async () => {
                  await walkHer(tori, { x: -4.5, y: -4.5 }, position => position.y > 380);
                  await walkHer(tori, { x: 4.5, y: -4.5 }, position => position.x < 320);
                  await walkHer(tori, { x: 4.5, y: 4.5 }, position => position.x < 760);
                  await walkHer(tori, { x: 4.5, y: -4.5 }, position => position.y > 320);
                  await walkHer(tori, { x: -4.5, y: -4.5 }, position => position.x > 820);
                  tori.position.x = 810;
                  tori.position.y = 105;
                  tori.face = 'down';
               });
            }
            await destiePromise;
            game.movement = false;
            await timer.pause(450);
            if (tori.position.angleFrom(player.position) > 45) {
               tori.face = 'down';
            }
            game.music!.gain.modulate(timer, 650, world.level);
            cutscene = true;
            atlas.switch('dialoguerBottom');
            if (save.data.n.plot < 2.71) {
               await typer.text(...text.a_outlands.indie3a);
            } else {
               await typer.text(...text.a_outlands.indie3b);
            }
            save.data.n.plot = 3;
            await typer.text(...text.a_outlands.indie4);
            atlas.switch(null);
            await walkHer(tori, { x: -3, y: 0 }, position => position.x > 775);
            await tori.alpha.modulate(timer, 300, 0);
            renderer.detach('main', tori);
            game.movement = true;
            save.data.n.plot = 4;
            let garbo = 0;
            let valid = true;
            events.on('teleport').then(async () => {
               script('froggit');
               if (valid) {
                  valid = false;
                  save.data.n.plot = 5;
                  teleporter.movement = false;
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await typer.text(commonText.c_call1, ...text.a_outlands.indie6, commonText.c_call2);
                  if (garbo < 1) {
                     await typer.text(...text.a_outlands.indie6a);
                  } else {
                     await typer.text(...text.a_outlands.indie6b);
                  }
                  atlas.switch(null);
                  game.movement = true;
               }
            });
            while (valid) {
               await timer.pause(60e3 * 5);
               if (!valid) {
                  break;
               }
               await timer.when(() => game.movement);
               game.movement = false;
               atlas.switch('dialoguerBottom');
               switch (garbo) {
                  case 2:
                     save.data.n.plot = 4.1;
                     break;
                  case 5:
                     save.data.n.plot = 4.2;
                     break;
               }
               await typer.text(commonText.c_call1, ...text.a_outlands.indie5[garbo++], commonText.c_call2);
               atlas.switch(null);
               if (garbo === text.a_outlands.indie5.length) {
                  valid = false;
                  const queue3 = content.amToriel.load();
                  const overlay = new CosmosRectangle({
                     alpha: 0,
                     size: { x: 1000, y: 1000 },
                     position: { x: 160, y: 120 },
                     anchor: 0,
                     fill: 'black',
                     stroke: 'transparent'
                  });
                  renderer.attach('menu', overlay);
                  await Promise.all([
                     game.music!.gain.modulate(timer, 1150, 0),
                     overlay.alpha.modulate(timer, 1150, 1)
                  ]);
                  await timer.pause(450);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.indie7);
                  atlas.switch(null);
                  tori.face = 'down';
                  tori.position.x = 810;
                  tori.position.y = 105;
                  player.face = 'up';
                  player.x = 810;
                  player.y = 135;
                  renderer.attach('main', tori);
                  tori.alpha.value = 1;
                  await queue3;
                  const feels = assets.music.toriel.instance(timer);
                  feels.gain.value /= 4;
                  await Promise.all([
                     feels.gain.modulate(timer, 850, feels.gain.value * 4),
                     overlay.alpha.modulate(timer, 850, 0)
                  ]);
                  renderer.detach('menu', overlay);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.indie8);
                  atlas.switch(null);
                  renderer.attach('menu', overlay);
                  await overlay.alpha.modulate(timer, 850, 1);
                  await timer.pause(650);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.indie2c);
                  if (save.data.b.oops) {
                     await typer.text(...text.a_outlands.indie2e);
                  } else {
                     await typer.text(...text.a_outlands.indie2d);
                  }
                  atlas.switch(null);
                  save.data.n.plot = 7;
                  save.data.n.plot_call = 4;
                  save.data.n.state_wastelands_napstablook = 5;
                  await feels.gain.modulate(timer, 650, 0);
                  feels.stop();
                  content.amToriel.unload();
                  renderer.alpha.value = 0;
                  renderer.detach('menu', overlay);
                  await teleport('w_toriel_front', 'up', 159, 230, world);
                  tori.position = new CosmosPoint(159, 200);
                  tori.face = 'down';
                  await timer.pause(650);
                  atlas.switch('dialoguerTop');
                  await typer.text(...text.a_outlands.return4());
                  atlas.switch(null);
                  game.movement = true;
                  await Promise.race([
                     events.on('teleport'),
                     walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 300).then(() => tori.alpha.modulate(timer, 300, 0))
                  ]);
                  renderer.detach('main', tori);
               } else {
                  game.movement = true;
               }
            }
            break;
         }
         case 'froggit': {
            areaKills() > 0 && instanceDestroy([ 'w_mfrog' ]);
            break;
         }
         case 'toriel_asriel_lamp': {
            if (!scriptState.sprite) {
               scriptState.sprite = new CosmosSprite({
                  metadata: { darkie: true },
                  frames: [ content.iooOTorielAsrielDark ]
               });
            }
            args[0] === 'silent' || assets.sounds.noise.instance(timer);
            scriptState.active = !scriptState.active;
            if (scriptState.active) {
               if (save.data.n.state_wastelands_toriel !== 2) {
                  scriptState.music = assets.music.homeAlt.instance(timer, {
                     offset: game.music!.position
                  });
                  scriptState.music!.rate.value = game.music!.rate.value;
                  game.music!.gain.modulate(timer, args[0] === 'silent' ? 0 : 300, 0);
                  scriptState.music!.gain.modulate(timer, 300, world.level);
               }
               renderer.attach('below', scriptState.sprite);
            } else {
               if (save.data.n.state_wastelands_toriel !== 2) {
                  game.music!.gain.modulate(timer, 300, world.level);
                  const instance = scriptState.music!;
                  instance.gain.modulate(timer, 300, 0).then(() => {
                     instance.stop();
                  });
               }
               renderer.detach('below', scriptState.sprite);
            }
            break;
         }
         case 'toriel_asriel_exit': {
            const otherState = states.scripts.toriel_asriel_lamp || {};
            if (otherState.active) {
               game.music!.gain.modulate(timer, 300, world.level);
               otherState.music?.gain.modulate(timer, 300, 0);
               events.on('teleport').then(() => {
                  otherState.active = false;
                  renderer.detach('below', otherState.sprite!);
               });
            }
            break;
         }
         case 'goner': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerTop');
            await typer.text(...lines.a1);
            atlas.switch(null);
            (objectsByTag(tags => tags.includes('w_goner'))[0].objects[0] as CosmosAnimation).index = 1;
            await timer.pause(1000);
            atlas.switch('dialoguerTop');
            await typer.text(...lines.a2);
            atlas.switch(null);
            save.flag.b.w_state_core = true;
            instanceDestroy([ 'w_goner' ]);
            assets.sounds.bahbye.instance(timer);
            game.movement = true;
            break;
         }
         case 'coffin': {
            if (!game.movement) {
               return;
            }
            let page = 0;
            game.movement = false;
            atlas.switch('dialoguerTop');
            if (save.data.b.oops) {
               await typer.text(...text.a_outlands.w_coffin1());
            } else {
               await typer.text(...text.a_outlands.w_coffin2());
               while (page < 12 && choicer.result === 0) {
                  save.data.b.w_state_diary = true;
                  await typer.text(...text.a_outlands.asrielDiary[page++]);
                  if (page < 12) {
                     await typer.text(...text.a_outlands.w_coffin3);
                  }
               }
               if (page === 12) {
                  await typer.text(...text.a_outlands.w_coffin4);
               }
               await typer.text(...text.a_outlands.w_coffin5);
            }
            game.movement = true;
            atlas.switch(null);
            break;
         }
         case 'puzzle1': {
            scriptState.pressed || (scriptState.pressed = []);
            scriptState.buttons || (scriptState.buttons = []);
            scriptState.sequence || (scriptState.sequence = []);
            if (args[0] === 'switch') {
               if (save.data.n.plot > 5) {
                  if (!game.movement) {
                     return;
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.puzzle1A);
                  atlas.switch(null);
                  game.movement = true;
                  return;
               }
               const anim = objectsByTag(tags => tags.includes('w_puzzle1_switch'))[0].objects[0] as CosmosAnimation;
               if (anim.index === 0) {
                  anim.index = 1;
                  assets.sounds.noise.instance(timer);
                  for (const button of scriptState.pressed.splice(0, scriptState.pressed.length)) {
                     button.index = 6;
                  }
                  if (scriptState.alter) {
                     scriptState.sequence = CosmosUtils.populate(4, () => Math.floor(random.next() * 4));
                  } else {
                     scriptState.alter = true;
                  }
                  await timer.pause(100);
                  for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     assets.sounds.noise.instance(timer).rate.value = 1.2;
                     for (const [ index2, button ] of objects.entries()) {
                        if (button.index === 6) {
                           if (scriptState.sequence[index1] === index2) {
                              button.index = 1;
                              timer.pause(250).then(() => {
                                 button.index = 6;
                              });
                           }
                        } else {
                           return;
                        }
                     }
                     await timer.pause(250);
                  }
                  anim.index = 0;
                  const beepout = assets.sounds.noise.instance(timer);
                  beepout.rate.value = 0.85;
                  beepout.gain.value /= 1.5;
               }
               return;
            }
            if (scriptState.active) {
               return;
            }
            scriptState.active = true;
            if (save.data.n.plot > 5) {
               for (const object of objectsByTag(tags => tags.includes('w_puzzle1_pylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
               return;
            }
            scriptState.buttons = CosmosUtils.populate(4, index =>
               objectsByTag(tags => {
                  if (tags.includes('w_puzzle1_button')) {
                     for (const tag of tags) {
                        if (tag[0] === index.toString()) {
                           return true;
                        }
                     }
                  }
                  return false;
               }).map(object => {
                  const anim = object.objects[0] as CosmosAnimation;
                  anim.index = 6;
                  return anim;
               })
            );
            scriptState.sequence = CosmosUtils.populate(4, () => Math.floor(random.next() * 4));
            CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
               if (save.data.n.plot < 5.1) {
                  await renderer.on('tick');
                  await timer.pause();
                  if (game.room !== 'w_puzzle1') {
                     next();
                     return;
                  }
                  top: for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     for (const [ index2, anim ] of objects.entries()) {
                        if (
                           Math.abs(anim.position.x - player.x) < 7 &&
                           Math.abs(anim.position.y - player.y) <= 10 &&
                           game.movement
                        ) {
                           if (anim.index === 6) {
                              scriptState.pressed.push(anim);
                              assets.sounds.noise.instance(timer);
                              if (scriptState.sequence[index1] === index2) {
                                 if (scriptState.pressed.length === 4) {
                                    game.movement = false;
                                    save.data.n.plot = 5.1;
                                    for (const [ index, button ] of scriptState.pressed
                                       .splice(0, scriptState.pressed.length)
                                       .entries()) {
                                       button.index = 3;
                                       timer.pause(650).then(async () => {
                                          button.index = 6;
                                          if (index === 0) {
                                             assets.sounds.retract.instance(timer).rate.value = 1.25;
                                             for (const object of objectsByTag(tags =>
                                                tags.includes('w_puzzle1_pylon')
                                             )) {
                                                const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                                                anim.enable();
                                                anim.on('tick', () => {
                                                   if (anim.active && anim.index === 5) {
                                                      anim.disable();
                                                      object.objects.splice(1, 1);
                                                   }
                                                });
                                             }
                                             const sound1 = assets.sounds.noise.instance(timer);
                                             sound1.rate.value = 1.2;
                                             sound1.gain.value /= 1.5;
                                             await timer.pause(350);
                                             assets.sounds.noise.instance(timer);
                                             for (const kidanim of scriptState.buttons.flat()) {
                                                kidanim.index = 0;
                                             }
                                             if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                                game.movement = true;
                                             }
                                          }
                                       });
                                    }
                                 } else {
                                    anim.index = 2;
                                 }
                              } else {
                                 game.movement = false;
                                 for (const [ index, button ] of scriptState.pressed
                                    .splice(0, scriptState.pressed.length)
                                    .entries()) {
                                    button.index = 4;
                                    timer.pause(200).then(async () => {
                                       button.index = 5;
                                       await timer.pause(75);
                                       button.index = 4;
                                       await timer.pause(75);
                                       button.index = 5;
                                       await timer.pause(75);
                                       button.index = 4;
                                       await timer.pause(350);
                                       button.index = 6;
                                       if (index === 0) {
                                          assets.sounds.noise.instance(timer);
                                       }
                                    });
                                 }
                                 await phase(850, { x: 60, y: 160 });
                                 if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                    game.movement = true;
                                 }
                              }
                           }
                           break top;
                        }
                     }
                  }
                  next();
               }
            });
            break;
         }
         case 'puzzle2': {
            if (scriptState.active || save.data.n.plot > 5.1) {
               return;
            }
            scriptState.active = true;
            const pads = objectsByTag(tags => tags.includes('w_puzzle2_pad'));
            for (const [ index, obj ] of pads.entries()) {
               const anim = obj.objects[0] as CosmosAnimation;
               anim.index = 16;
               anim.y = -10;
               anim.on('tick', () => {
                  if (anim.active && anim.index === 13 && anim.step === anim.duration - 1) {
                     anim.index = 2;
                  }
               });
               obj.on('tick', async function () {
                  if (save.data.n.plot > 5.1 || scriptState.fail || !game.movement) {
                     return;
                  }
                  this.metadata.runs ??= 0;
                  this.metadata.state ??= 0;
                  this.metadata.lastspot ??= player.position.value();
                  switch (this.metadata.state) {
                     case 2:
                        if (player.y > this.y - 3) {
                           break;
                        }
                     case 0:
                        if (player.y > this.y - 15 && Math.abs(player.x - this.x) <= 20) {
                           this.metadata.state = 1;
                           const run = ++this.metadata.runs;
                           if (!this.metadata.resound) {
                              this.metadata.resound = true;
                              assets.sounds.noise.instance(timer);
                           }
                           anim.index = 2;
                           anim.enable();
                           await timer.pause(2e3 + random.next() * 2e3);
                           let round = 0;
                           while (this.metadata.state === 1 && this.metadata.runs === run && round++ < 5) {
                              if (round === 5) {
                                 this.metadata.state = 0;
                              } else {
                                 anim.disable();
                                 anim.index = 14;
                                 await timer.pause(133);
                                 if (this.metadata.state === 1 && this.metadata.runs === run) {
                                    anim.index = 0;
                                    await timer.pause(133);
                                 }
                              }
                           }
                        } else {
                           anim.index = 16;
                           this.metadata.resound = false;
                        }
                        break;
                     case 1:
                        if (player.y > this.y - 3) {
                           if (anim.active || player.position.extentOf(this.metadata.lastspot) === 0) {
                              game.menu = false;
                              scriptState.fail = true;
                              game.movement = false;
                              anim.disable();
                              anim.index = 15;
                              timer.pause(200).then(async () => {
                                 anim.index = 1;
                                 await timer.pause(75);
                                 anim.index = 15;
                                 await timer.pause(75);
                                 anim.index = 1;
                                 await timer.pause(75);
                                 anim.index = 15;
                                 await timer.pause(350);
                                 anim.index = 16;
                                 this.metadata.resound = false;
                                 assets.sounds.noise.instance(timer);
                              });
                              this.metadata.state = -1;
                              await phase(850, { x: 190, y: 120 });
                              this.metadata.state = 0;
                              game.movement = true;
                              scriptState.fail = false;
                              game.menu = true;
                           }
                        }
                        break;
                  }
                  if (this.metadata.state < 2 && player.y > this.y + 3) {
                     this.metadata.state = 2;
                     anim.index = 16;
                     assets.sounds.noise.instance(timer).rate.value = 1;
                     if (index === 2) {
                        game.movement = false;
                        await timer.pause(650);
                        for (const other of pads.map(pad => pad.objects[0] as CosmosAnimation)) {
                           other.index = 0;
                        }
                        save.data.n.plot = 5.2;
                        game.movement = true;
                        assets.sounds.noise.instance(timer).rate.value = 1;
                     }
                  }
                  this.metadata.lastspot = player.position.value();
               });
            }
            break;
         }
         case 'puzzle3': {
            scriptState.pressed || (scriptState.pressed = []);
            scriptState.buttons || (scriptState.buttons = []);
            scriptState.sequence || (scriptState.sequence = []);
            if (args[0] === 'switch') {
               if (save.data.n.plot > 5.2) {
                  if (!game.movement) {
                     return;
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.puzzle3A);
                  atlas.switch(null);
                  game.movement = true;
                  return;
               }
               const anim = objectsByTag(tags => tags.includes('w_puzzle3_switch'))[0].objects[0] as CosmosAnimation;
               if (anim.index === 0) {
                  anim.index = 1;
                  assets.sounds.noise.instance(timer);
                  for (const button of scriptState.pressed.splice(0, scriptState.pressed.length)) {
                     button.index = 6;
                  }
                  if (scriptState.alter) {
                     scriptState.sequence = CosmosUtils.populate(5, () => Math.floor(random.next() * 4));
                  } else {
                     scriptState.alter = true;
                  }
                  await timer.pause(100);
                  for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     assets.sounds.noise.instance(timer).rate.value = 1.2;
                     for (const [ index2, button ] of objects.entries()) {
                        if (button.index === 6) {
                           if (scriptState.sequence[index1] === index2) {
                              button.index = 1;
                              timer.pause(250).then(() => {
                                 button.index = 6;
                              });
                           }
                        } else {
                           return;
                        }
                     }
                     await timer.pause(450);
                  }
                  anim.index = 0;
                  const beepout = assets.sounds.noise.instance(timer);
                  beepout.rate.value = 0.85;
                  beepout.gain.value /= 1.5;
               }
               return;
            }
            if (scriptState.active) {
               return;
            }
            scriptState.active = true;
            if (save.data.n.plot > 5.2) {
               for (const object of objectsByTag(tags => tags.includes('w_puzzle3_pylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
               return;
            }
            scriptState.buttons = CosmosUtils.populate(5, index =>
               objectsByTag(tags => {
                  if (tags.includes('w_puzzle3_button')) {
                     for (const tag of tags) {
                        if (tag[0] === index.toString()) {
                           return true;
                        }
                     }
                  }
                  return false;
               }).map(object => {
                  const anim = object.objects[0] as CosmosAnimation;
                  anim.index = 6;
                  return anim;
               })
            );
            scriptState.sequence = CosmosUtils.populate(5, () => Math.floor(random.next() * 4));
            CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
               if (save.data.n.plot < 5.3) {
                  await renderer.on('tick');
                  await timer.pause();
                  if (game.room !== 'w_puzzle3') {
                     next();
                     return;
                  }
                  top: for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     for (const [ index2, anim ] of objects.entries()) {
                        if (
                           Math.abs(anim.position.x - player.x) < 7 &&
                           Math.abs(anim.position.y - player.y) <= 10 &&
                           game.movement
                        ) {
                           if (anim.index === 6) {
                              scriptState.pressed.push(anim);
                              assets.sounds.noise.instance(timer);
                              if (scriptState.sequence[index1] === index2) {
                                 if (scriptState.pressed.length === 5) {
                                    game.movement = false;
                                    save.data.n.plot = 5.3;
                                    for (const [ index, button ] of scriptState.pressed
                                       .splice(0, scriptState.pressed.length)
                                       .entries()) {
                                       button.index = 3;
                                       timer.pause(650).then(async () => {
                                          button.index = 6;
                                          if (index === 0) {
                                             assets.sounds.retract.instance(timer).rate.value = 1.25;
                                             for (const object of objectsByTag(tags =>
                                                tags.includes('w_puzzle3_pylon')
                                             )) {
                                                const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                                                anim.enable();
                                                anim.on('tick', () => {
                                                   if (anim.active && anim.index === 5) {
                                                      anim.disable();
                                                      object.objects.splice(1, 1);
                                                   }
                                                });
                                             }
                                             const sound1 = assets.sounds.noise.instance(timer);
                                             sound1.rate.value = 1.2;
                                             sound1.gain.value /= 1.5;
                                             await timer.pause(350);
                                             assets.sounds.noise.instance(timer);
                                             for (const kidanim of scriptState.buttons.flat()) {
                                                kidanim.index = 0;
                                             }
                                             if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                                game.movement = true;
                                             }
                                          }
                                       });
                                    }
                                 } else {
                                    anim.index = 2;
                                 }
                              } else {
                                 game.movement = false;
                                 for (const [ index, button ] of scriptState.pressed
                                    .splice(0, scriptState.pressed.length)
                                    .entries()) {
                                    button.index = 4;
                                    timer.pause(200).then(async () => {
                                       button.index = 5;
                                       await timer.pause(75);
                                       button.index = 4;
                                       await timer.pause(75);
                                       button.index = 5;
                                       await timer.pause(75);
                                       button.index = 4;
                                       await timer.pause(350);
                                       button.index = 6;
                                       if (index === 0) {
                                          assets.sounds.noise.instance(timer);
                                       }
                                    });
                                 }
                                 await phase(850, { x: 60, y: 200 });
                                 if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                    game.movement = true;
                                 }
                              }
                           }
                           break top;
                        }
                     }
                  }
                  next();
               }
            });
            break;
         }
         case 'puzzle4': {
            if (scriptState.active || save.data.n.plot > 5.3) {
               return;
            }
            scriptState.active = true;
            const pads = objectsByTag(tags => tags.includes('w_puzzle4_pad'));
            for (const [ index, obj ] of pads.entries()) {
               obj.y += 10;
               const anim = obj.objects[0] as CosmosAnimation;
               anim.index = 16;
               anim.y = -10;
               anim.on('tick', () => {
                  if (anim.active && anim.index === 13 && anim.step === anim.duration - 1) {
                     anim.index = 2;
                  }
               });
               obj.on('tick', async function () {
                  if (save.data.n.plot > 5.3 || scriptState.fail || !game.movement) {
                     return;
                  }
                  this.metadata.runs ??= 0;
                  this.metadata.state ??= 0;
                  this.metadata.lastspot ??= player.position.value();
                  switch (this.metadata.state) {
                     case 2:
                        if (player.y < this.y + 3) {
                           break;
                        }
                     case 0:
                        if (player.y < this.y + 15 && Math.abs(player.x - this.x) <= 20) {
                           this.metadata.state = 1;
                           const run = ++this.metadata.runs;
                           if (!this.metadata.resound) {
                              this.metadata.resound = true;
                              assets.sounds.noise.instance(timer);
                           }
                           anim.index = 2;
                           anim.enable();
                           await timer.pause(2e3 + random.next() * 2e3);
                           let round = 0;
                           while (this.metadata.state === 1 && this.metadata.runs === run && round++ < 5) {
                              if (round === 5) {
                                 this.metadata.state = 0;
                              } else {
                                 anim.disable();
                                 anim.index = 14;
                                 await timer.pause(133);
                                 if (this.metadata.state === 1 && this.metadata.runs === run) {
                                    anim.index = 0;
                                    await timer.pause(133);
                                 }
                              }
                           }
                        } else {
                           anim.index = 16;
                           this.metadata.resound = false;
                        }
                        break;
                     case 1:
                        if (player.y < this.y + 3) {
                           if (anim.active || player.position.extentOf(this.metadata.lastspot) === 0) {
                              game.menu = false;
                              scriptState.fail = true;
                              game.movement = false;
                              anim.disable();
                              anim.index = 15;
                              timer.pause(200).then(async () => {
                                 anim.index = 1;
                                 await timer.pause(75);
                                 anim.index = 15;
                                 await timer.pause(75);
                                 anim.index = 1;
                                 await timer.pause(75);
                                 anim.index = 15;
                                 await timer.pause(350);
                                 anim.index = 16;
                                 this.metadata.resound = false;
                                 assets.sounds.noise.instance(timer);
                              });
                              this.metadata.state = -1;
                              await phase(850, { x: 210, y: 380 });
                              this.metadata.state = 0;
                              game.movement = true;
                              scriptState.fail = false;
                              game.menu = true;
                           }
                        }
                        break;
                  }
                  if (this.metadata.state < 2 && player.y < this.y - 3) {
                     this.metadata.state = 2;
                     anim.index = 16;
                     assets.sounds.noise.instance(timer).rate.value = 1;
                     if (index === 0) {
                        game.movement = false;
                        await timer.pause(650);
                        for (const other of pads.map(pad => pad.objects[0] as CosmosAnimation)) {
                           other.index = 0;
                        }
                        save.data.n.plot = 5.4;
                        game.movement = true;
                        assets.sounds.noise.instance(timer).rate.value = 1;
                     }
                  }
                  this.metadata.lastspot = player.position.value();
               });
            }
            break;
         }
         case 'blooky': {
            if (args[0] === 'talk') {
               if (!game.movement) {
                  return;
               }
               const loader = battler.load(groups.napstablook);
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (save.data.n.plot < 6) {
                  await typer.text(...text.a_outlands.blooky1);
                  save.data.n.plot = 6;
               } else {
                  await typer.text(...text.a_outlands.blooky2);
               }
               atlas.switch(null);
               if (choicer.result === 0) {
                  game.music!.gain.value = 0;
                  await Promise.all([ loader, battler.battlefall(player) ]);
                  await battler.start(groups.napstablook);
                  const blooky = objectsByTag(tags => tags.includes('napstablookBody'))[0];
                  blooky.alpha.value = 0;
                  const blooky2 = character('napstablook', characters.napstablook, blooky, 'left');
                  game.music!.gain.modulate(timer, 300, world.level);
                  atlas.switch('dialoguerBottom');
                  await typer.text(
                     ...[
                        text.a_outlands.blooky3,
                        text.a_outlands.blooky4,
                        text.a_outlands.blooky5,
                        text.a_outlands.blooky6,
                        text.a_outlands.blooky7
                     ][save.data.n.state_wastelands_napstablook]
                  );
                  atlas.switch(null);
                  Promise.race([ events.on('teleport'), blooky2.alpha.modulate(timer, 850, 0) ]).then(() => {
                     renderer.detach('main', blooky2);
                  });
                  save.data.n.plot = 6.1;
               }
               game.movement = true;
               return;
            }
            if (save.data.n.plot > 6) {
               instanceDestroy([ 'napstablookBody' ]);
               return;
            }
            if (scriptState.active) {
               return;
            }
            scriptState.active = true;
            const time = timer.value;
            const blooky = objectsByTag(tags => tags.includes('napstablookBody'))[0];
            const blookyBody = blooky.objects[1] as CosmosSprite;
            const blookyPositionY = new CosmosValue();
            blookyBody.on('tick', () => {
               blookyBody.position.y =
                  blookyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 2;
            });
            break;
         }
         case 'pacing': {
            if (save.data.b.oops) {
               instanceDestroy([ 'w_xfrog' ]);
            }
            if (save.data.b.genocide) {
               instanceDestroy([ 'w_ifrog' ]);
            }
            break;
         }
         case 'annex': {
            save.data.b.genocide && instanceDestroy([ 'w_afrog' ]);
            break;
         }
         case 'mouse': {
            save.data.b.genocide || assets.sounds.squeak.instance(timer);
            break;
         }
         case 'wonder': {
            if (game.room === 'w_wonder') {
               if (!scriptState.music) {
                  scriptState.music = true;
                  await timer.when(() => save.flag.b.w_state_core);
                  if (!save.data.b.oops && save.data.n.plot < 6.2) {
                     for (const [ lines, time ] of [
                        [ text.a_outlands.wonder1, 4e3 ],
                        [ text.a_outlands.wonder2, 7e3 ],
                        [ text.a_outlands.wonder3, 4e3 ],
                        [ text.a_outlands.wonder4, 3e3 ],
                        [ text.a_outlands.wonder5, 6e3 ],
                        [ text.a_outlands.wonder6, 3e3 ]
                     ] as [string[], number][]) {
                        await Promise.race([ timer.pause(time), events.on('teleport') ]);
                        if (game.room === 'w_wonder') {
                           await timer.when(() => game.movement);
                           save.data.n.plot = 6.2;
                           save.data.b.heard_narrator = true;
                           atlas.switch('dialoguerTop');
                           game.movement = false;
                           await typer.text(...lines);
                           atlas.switch(null);
                           game.movement = true;
                        } else {
                           break;
                        }
                     }
                  }
               }
            } else if (scriptState.music) {
               scriptState.music = false;
            }
            break;
         }
         case 'home': {
            if (save.data.n.plot > 6.2) {
               return;
            } else {
               if (!game.movement) {
                  return;
               }
               save.data.n.plot = 7;
            }
            game.movement = false;
            const vibesPromise = content.amToriel.load();
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: 270, y: 200 },
               preset: characters.toriel,
               key: 'toriel'
            });
            renderer.attach('main', tori);
            await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < player.y);
            assets.sounds.notify.instance(timer);
            const notifier = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: renderer.projection(tori.position.subtract(0, 55)),
               resources: content.ibuNotify
            });
            renderer.attach('menu', notifier);
            await timer.pause(450);
            renderer.detach('menu', notifier);
            await Promise.all([ vibesPromise, walkHer(tori, { x: -4, y: 0 }, pos => pos.x > player.x + 25) ]);
            const feels = assets.music.toriel.instance(timer);
            feels.gain.value /= 4;
            feels.gain.modulate(timer, 300, (feels.gain.value * 4) / rooms.of(game.room).score.gain);
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands.return1);
            atlas.switch(null);
            await walkHer(tori, { x: -1, y: 0 }, pos => pos.x > player.x + 20);
            await timer.pause(450);
            atlas.switch('dialoguerBottom');
            if (save.data.n.hp < 5) {
               await typer.text(...text.a_outlands.return2c);
               save.data.b.genocide && (await typer.text(...text.a_outlands.return2e));
            } else if (save.data.b.genocide) {
               await typer.text(...text.a_outlands.return2d);
            } else if (save.data.n.hp < calcHP()) {
               await typer.text(...text.a_outlands.return2b);
            } else {
               await typer.text(...text.a_outlands.return2a);
            }
            atlas.switch(null);
            await timer.pause(550);
            if (save.data.n.hp < calcHP()) {
               heal();
               await timer.pause(950);
            }
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands.return3);
            atlas.switch(null);
            await timer.pause(450);
            const handholder = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: player.x + 12.5, y: player.y },
               preset: characters.torielHandhold,
               key: 'toriel'
            }).on('tick', function () {
               game.room === 'w_courtyard' && player.position.set(this.position.subtract(12.5, 0));
            });
            handholder.face = 'right';
            player.alpha.value = 0;
            renderer.detach('main', tori);
            renderer.attach('main', handholder);
            await walkHer(handholder, { x: 3, y: 0 }, pos => pos.x < 270);
            await walkHer(handholder, { x: 0, y: -3 }, pos => pos.y > 120);
            feels.gain.modulate(timer, 300, 0).then(() => {
               feels.stop();
               timer.pause(1000).then(() => {
                  content.amToriel.unload();
               });
            });
            await teleport('w_toriel_front', 'up', 159, 230, world);
            tori.position = new CosmosPoint(159, 200);
            player.alpha.value = 1;
            renderer.detach('main', handholder);
            renderer.attach('main', tori);
            tori.face = 'down';
            await timer.pause(650);
            atlas.switch('dialoguerTop');
            await typer.text(...text.a_outlands.return4());
            atlas.switch(null);
            game.movement = true;
            await Promise.race([
               events.on('teleport'),
               walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 300).then(() => tori.alpha.modulate(timer, 300, 0))
            ]);
            renderer.detach('main', tori);
            break;
         }
         case 'room': {
            if (save.data.n.plot < 8) {
               if (!game.movement) {
                  return;
               }
               save.data.n.plot = 8;
               game.movement = false;
               const handholder = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: { x: player.x + 12.5, y: player.y },
                  preset: characters.torielHandhold,
                  key: 'toriel'
               }).on('tick', () => {
                  player.position.set(handholder.position.subtract(12.5, 0));
               });
               handholder.face = 'right';
               player.alpha.value = 0;
               renderer.attach('main', handholder);
               await walkHer(handholder, { x: 3, y: 0 }, pos => pos.x < 170);
               renderer.detach('main', handholder);
               const tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: { x: player.x + 24, y: player.y },
                  preset: characters.toriel,
                  key: 'toriel'
               });
               tori.face = 'up';
               player.face = 'up';
               player.alpha.value = 1;
               renderer.attach('main', tori);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.return5);
               atlas.switch(null);
               const ruffler = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: player.x + 13.5, y: player.y },
                  resources: content.iocTorielRuffle
               });
               player.alpha.value = 0;
               renderer.detach('main', tori);
               renderer.attach('main', ruffler);
               await timer.pause(3000);
               player.alpha.value = 1;
               renderer.detach('main', ruffler);
               renderer.attach('main', tori);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.return6);
               atlas.switch(null);
               game.movement = true;
               await Promise.race([
                  events.on('teleport'),
                  walkHer(tori, { x: 0, y: 3 }, pos => pos.y < player.y + 10).then(async () => {
                     await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 15);
                     await tori.alpha.modulate(timer, 300, 0);
                  })
               ]);
               renderer.detach('main', tori);
            }

            if (!scriptState.active) {
               scriptState.active = true;
               objectsByTag(tags => tags.includes('w_toriwall'))[0].objects[0].on('tick', function () {
                  if (save.data.n.plot < 14 || save.data.n.state_wastelands_toriel === 2 || areaKills() > 12) {
                     this.metadata.trigger = false; // before battle or :cold_face:
                  } else if (toriSV()) {
                     this.metadata.trigger = save.data.n.plot < 48; // toriel is in her room on LV1 or above
                  } else if (save.data.n.plot < 17.001) {
                     this.metadata.trigger = !save.data.b.w_state_catnap; // toriel is alive, just after battle completes
                  } else {
                     this.metadata.trigger = false; // LV0
                  }
               });
            }
            break;
         }
         case 'front': {
            if (!game.movement) {
               break;
            }
            if (save.data.n.plot === 8.1) {
               game.movement = false;
               save.data.n.plot = 8.2;
               const tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: { x: 220, y: 70 },
                  preset: characters.torielSpecial,
                  key: 'toriel'
               });
               tori.face = 'down';
               renderer.attach('main', tori);
               if (areaKills() < 7) {
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.front1);
                  atlas.switch(null);
               }
               await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 145);
               assets.sounds.notify.instance(timer);
               const notifier = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: renderer.projection(tori.position.subtract(0, 55)),
                  resources: content.ibuNotify
               });
               renderer.attach('menu', notifier);
               await timer.pause(1e3);
               renderer.detach('menu', notifier);
               tori.preset = characters.toriel;
               await walkHer(tori, { x: 3, y: 3 }, pos => pos.y < player.y);
               await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < player.x - 25);
               atlas.switch('dialoguerBottom');
               if (save.data.b.genocide) {
                  await typer.text(...text.a_outlands.front4());
               } else if (areaKills() > 6) {
                  await typer.text(...text.a_outlands.front3());
               } else {
                  await typer.text(...text.a_outlands.front2());
               }
               atlas.switch(null);
               game.movement = true;
               await Promise.race([
                  events.on('teleport'),
                  walkHer(tori, { x: -4, y: 0 }, pos => pos.x > 10).then(() => tori.alpha.modulate(timer, 300, 0))
               ]);
               renderer.detach('main', tori);
            }
            break;
         }
         case 'bed': {
            if (game.movement) {
               game.movement = false;
               const fd = new CosmosRectangle({ alpha: 0, size: { x: 320, y: 240 }, fill: 'black' });
               renderer.attach('menu', fd);
               const dark = (states.scripts.toriel_asriel_lamp || {}).active;
               const bedcover = new CosmosSprite({
                  position: { x: 206, y: 119 },
                  frames: [ dark ? content.iooOTorielAsrielOver : content.iooOTorielAsrielOverLight ]
               });
               renderer.attach('main', bedcover);
               player.priority.value = 118;
               azzie.priority.value = 118;
               await player.position.modulate(timer, 1450, {
                  x: bedcover.x + bedcover.compute().x / 2,
                  y: player.y
               });
               await Promise.all([ fd.alpha.modulate(timer, 1850, 1), audio.musicMixer.modulate(timer, 1850, 0) ]);
               player.priority.value = 0;
               azzie.priority.value = 0;
               renderer.detach('main', bedcover);
               player.position.set({ x: 195, y: 145 });
               player.face = 'down';
               world.azzie && (azzie.metadata.reposition = true);
               await timer.pause(950);
               let sleep = true;
               if ((save.data.b.genocide || save.data.n.plot > 8) && save.data.n.plot > 9.1) {
                  if (save.data.n.plot < 14) {
                     sleep = false;
                     await dialogue('auto', ...text.a_outlands.bedfailAsgore);
                  } else if (save.data.n.plot < 17.001 && !toriSV() && !save.data.b.w_state_catnap) {
                     save.data.b.w_state_catnap = true;
                     await dialogue('auto', ...text.a_outlands.bedfailToriel);
                  }
               }
               await timer.pause(900);
               if (sleep) {
                  dark || script('toriel_asriel_lamp', 'silent');
                  if (save.data.n.plot < 8.1) {
                     save.data.n.plot = 8.1;
                     save.data.n.state_pie = 1;
                     script('pie', 'spawn');
                  }
                  save.data.n.hp = Math.max(save.data.n.hp, Math.min(calcHP() + 10, 99));
               }
               game.movement = true;
               await Promise.all([ fd.alpha.modulate(timer, 300, 0), audio.musicMixer.modulate(timer, 300, 1) ]);
               renderer.detach('menu', fd);
            }
            break;
         }
         case 'pie': {
            if (args[0] === 'spawn') {
               if (scriptState.spawned || save.data.n.state_pie !== 1) {
                  return;
               }
               scriptState.spawned = true;
               const pieSprite = new CosmosSprite({ anchor: 0 }).on('tick', function () {
                  this.frames[0] = save.data.n.state_wastelands_mash === 1 ? content.iooOPieBowl : content.iooOPie;
                  this.tint = (states.scripts.toriel_asriel_lamp || {}).active ? 5592405 : 0xffffff;
               });
               const pieHitbox = new CosmosHitbox({
                  anchor: 0,
                  position: { x: 160, y: 140 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     tags: [ 'theOneAndOnlyButterscotchCinnamon' ],
                     args: [ 'pie' ]
                  },
                  priority: 10,
                  size: { x: 12, y: 14 }
               }).on('tick', function () {
                  if (game.room === 'w_toriel_asriel') {
                     if (this.objects.length === 0) {
                        this.metadata.barrier = true;
                        this.metadata.interact = true;
                        this.objects[0] = pieSprite;
                     }
                  } else if (this.objects.length > 0) {
                     this.metadata.barrier = false;
                     this.metadata.interact = false;
                     this.objects.splice(0, this.objects.length);
                  }
               });
               renderer.attach('below', pieHitbox);
            } else {
               if (!game.movement) {
                  break;
               }
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (save.storage.inventory.size === 8) {
                  await typer.text(...text.a_outlands.denie);
               } else {
                  save.data.n.state_pie = 2;
                  save.storage.inventory.add(
                     save.data.n.state_wastelands_mash === 1 ? 'pie3' : save.data.b.snail_pie ? 'pie2' : 'pie'
                  );
                  assets.sounds.equip.instance(timer);
                  instanceDestroy([ 'theOneAndOnlyButterscotchCinnamon' ], 'below');
                  await typer.text(...text.a_outlands.pie());
               }
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'socks': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            let coffin = false;
            if (save.data.b.cetadel) {
               if (!save.data.b.oops && !save.data.b.key_coffin) {
                  await typer.text(...text.a_outlands.socks3);
                  coffin = true;
               } else {
                  await typer.text(...text.a_outlands.socks7);
               }
            } else {
               await typer.text(...text.a_outlands.socks1());
               if (choicer.result === (world.population < 7 ? 1 : 0)) {
                  save.data.b.cetadel = true;
                  await typer.text(...text.a_outlands.socks2());
                  if (!save.data.b.oops) {
                     coffin = true;
                  }
               } else {
                  await typer.text(...text.a_outlands.socks4);
               }
            }
            if (coffin) {
               if (choicer.result === 0) {
                  shake(1, 400);
                  assets.sounds.shake.instance(timer);
                  await typer.text(...text.a_outlands.socks5);
                  save.data.b.key_coffin = true;
               } else {
                  await typer.text(...text.a_outlands.socks6);
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'restricted': {
            if (save.data.b.key_coffin) {
               instanceDestroy([ 'coffinbarrier' ], 'below');
            }
            break;
         }
         case 'chairiel': {
            if (!game.movement) {
               return;
            }
            if (!toriCheck()) {
               await dialogue('dialoguerBottom', ...text.a_outlands.chair3);
               break;
            }
            game.movement = false;
            const chair = instance('main', 'theOneAndOnlyChairiel')!.object;
            const chairAnim = chair.objects[0] as CosmosAnimation;
            const talker = talkerEngine('n1', chairAnim);
            atlas.switch('dialoguerBottom');
            if (!toriSV() && (save.data.b.w_state_catnap || save.data.n.plot > 17)) {
               await typer.text(...text.a_outlands.chair1f());
            } else if (save.data.n.plot === 8) {
               if (save.data.n.state_toriel_book < 1) {
                  save.data.n.state_toriel_book = 1;
                  await typer.text(...text.a_outlands.chair1e);
               } else {
                  await typer.text(...text.a_outlands.chair2c3);
               }
               if (choicer.result === 0) {
                  save.data.n.state_toriel_book = 2;
                  await typer.text(...text.a_outlands.chair2c2, ...text.a_outlands.chair2c6.slice(0, 2));
                  atlas.switch(null);
                  atlas.attach(renderer, 'menu', 'dialoguerBottom');
                  const voicie = speech.presets.of('toriel').voices![0]![0];
                  const voicieGain = voicie.gain;
                  typer.text(text.a_outlands.chair2c6[2]);
                  const ticker = () => {
                     voicie.gain = voicieGain * renderer.alpha.value;
                  };
                  renderer.on('tick', ticker);
                  timer.pause(1850).then(() => {
                     game.music!.gain.modulate(timer, 1150, world.level);
                     game.music!.rate.modulate(timer, 1150, game.music!.rate.value * 0.875);
                     audio.musicReverb.modulate(timer, 1150, 0.8);
                  });
                  await renderer.alpha.modulate(timer, 3000, 0);
                  talker.end();
                  renderer.off('tick', ticker);
                  voicie.gain = voicieGain;
                  atlas.detach(renderer, 'menu', 'dialoguerBottom');
                  const overlay = new CosmosRectangle({
                     size: { x: 1000, y: 1000 },
                     position: { x: 160, y: 120 },
                     anchor: 0,
                     fill: 'black',
                     stroke: 'transparent'
                  });
                  renderer.attach('menu', overlay);
                  renderer.alpha.value = 1;
                  await timer.pause(1150);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.book1);
                  if (save.data.b.oops) {
                     await typer.text(...text.a_outlands.book3);
                  } else {
                     await typer.text(...text.a_outlands.book2);
                  }
                  await typer.text(...text.a_outlands.book4);
                  atlas.switch(null);
                  renderer.alpha.value = 0;
                  game.music!.gain.modulate(timer, 1500, 0).then(() => {
                     audio.musicReverb.value = 0;
                  });
                  await timer.pause(1350);
                  await teleport('w_toriel_asriel', 'left', 221, 139, world);
                  teleporter.movement = false;
                  game.movement = false;
                  (states.scripts.toriel_asriel_lamp || {}).active || script('toriel_asriel_lamp', 'silent');
                  await renderer.alpha.modulate(timer, 0, 0);
                  renderer.detach('menu', overlay);
                  const bedcover = new CosmosSprite({
                     position: { x: 206, y: 119 },
                     frames: [ content.iooOTorielAsrielOver ]
                  });
                  renderer.attach('above', bedcover);
                  player.alpha.value = 1;
                  player.face = 'left';
                  save.data.n.plot = 8.1;
                  save.data.n.state_pie = 1;
                  script('pie', 'spawn');
                  renderer.alpha.modulate(timer, 300, 1);
                  await timer.pause(850);
                  await player.position.modulate(timer, 850, { x: 195, y: 139 });
                  renderer.detach('above', bedcover);
                  game.movement = true;
                  return;
               } else {
                  await typer.text(...text.a_outlands.chair1d);
               }
            } else {
               if (save.data.b.toriel_ask) {
                  await typer.text(...text.a_outlands.chair1b);
               } else {
                  save.data.b.toriel_ask = true;
                  await typer.text(...text.a_outlands.chair1a);
                  talker.end();
               }
               const result = choicer.result;
               switch (result) {
                  case 0:
                     if (save.data.n.state_toriel_food < 2) {
                        if (save.data.n.state_toriel_food < 1) {
                           save.data.n.state_toriel_food = 1;
                           await typer.text(...text.a_outlands.chair2a1);
                        } else {
                           await typer.text(...text.a_outlands.chair2a3);
                        }
                        if (choicer.result === 0) {
                           await typer.text(...text.a_outlands.chair2a2);
                           atlas.switch(null);
                           chairAnim.reset().use(content.ionOChairiel);
                           chairAnim.enable();
                           await timer.when(() => chairAnim.index === 4);
                           chairAnim.disable();
                           await timer.pause(133);
                           chairAnim.index = 5;
                           const tori = character('toriel', characters.toriel, { x: 134, y: 96 }, 'right');
                           Promise.race([
                              events.on('teleport'),
                              walkHer(tori, { x: 4, y: 0 }, pos => pos.x < chair.position.x + 30).then(async () => {
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 120);
                                 await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 105);
                                 await walkHer(tori, { x: -3, y: -3 }, pos => pos.x > 65);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 20);
                                 await tori.alpha.modulate(timer, 300, 0);
                              })
                           ]).then(async () => {
                              renderer.detach('main', tori);
                              await timer.pause(save.data.n.state_wastelands_mash ? 30e3 : 20e3);
                              await timer.when(() => game.movement);
                              if (game.room === 'w_toriel_living') {
                                 game.movement = false;
                                 tori.alpha.value = 1;
                                 tori.alpha.modulate(timer, 0, 1);
                                 tori.position.set(66.5, 15);
                                 tori.face = 'down';
                                 const breakfast = new CosmosSprite({
                                    anchor: { x: 0, y: 1 },
                                    priority: 999,
                                    frames: [ content.iooOBreakfast ]
                                 }).on('tick', function () {
                                    this.position.set(tori.position.subtract(0, 15));
                                 });
                                 renderer.attach('main', tori, breakfast);
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 100);
                                 atlas.switch('dialoguerBottom');
                                 await typer.text(...text.a_outlands.food());
                                 atlas.switch(null);
                                 await walkHer(tori, { x: 3, y: 3 }, pos => pos.x < 90);
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 155);
                                 await timer.pause(350);
                                 renderer.detach('main', breakfast);
                                 spawnBreakfast();
                                 await timer.pause(650);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 135);
                                 await walkHer(tori, { x: 3, y: -3 }, pos => pos.y > 105);
                                 await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 134);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 96);
                                 renderer.detach('main', tori);
                                 chairAnim.index = 4;
                                 chairAnim.step = 0;
                                 chairAnim.reverse = true;
                                 chairAnim.enable();
                                 await timer.when(() => chairAnim.index === 0);
                                 chairAnim.reverse = false;
                                 chairAnim.reset().use(content.ionOChairielTalk);
                                 save.data.n.plot = 9.1;
                                 game.movement = true;
                              }
                              save.data.n.state_toriel_food = 3;
                           });
                           save.data.n.state_toriel_food = 2;
                           save.data.n.plot = 9;
                        } else {
                           await typer.text(...text.a_outlands.chair1d);
                        }
                     } else {
                        await typer.text(...text.a_outlands.chair2a4);
                     }
                     break;
                  case 1:
                     if (save.data.n.state_toriel_book < 2) {
                        if (save.data.n.state_toriel_book < 1) {
                           save.data.n.state_toriel_book = 1;
                           await typer.text(...text.a_outlands.chair2c1);
                        } else {
                           await typer.text(...text.a_outlands.chair2c3);
                        }
                        if (choicer.result === 0) {
                           save.data.n.state_toriel_book = 2;
                           await typer.text(
                              ...text.a_outlands.chair2c2,
                              ...text.a_outlands.chair2c6,
                              ...text.a_outlands.chair2c7
                           );
                        }
                     } else {
                        await typer.text(...text.a_outlands.chair2c4);
                        if (choicer.result === 0) {
                           await typer.text(
                              ...text.a_outlands.chair2c5,
                              ...text.a_outlands.chair2c6,
                              ...text.a_outlands.chair2c8
                           );
                        }
                     }
                     if (choicer.result === 1) {
                        await typer.text(...text.a_outlands.chair1d);
                     }
                     break;
                  case 2: {
                     let nomove = false;
                     if (save.data.b.toriel_home) {
                        await typer.text(...text.a_outlands.chair2d4);
                        if (choicer.result === 0) {
                           await typer.text(...text.a_outlands.chair2d5);
                        } else {
                           await typer.text(...text.a_outlands.chair2d6);
                           nomove = true;
                        }
                     } else {
                        await typer.text(...text.a_outlands.chair2d1);
                        if (choicer.result === 0) {
                           await typer.text(...text.a_outlands.chair1c);
                        } else {
                           save.data.b.toriel_home = true;
                           await typer.text(...text.a_outlands.chair2d2);
                           if (choicer.result === 0) {
                              await typer.text(...text.a_outlands.chair2d3);
                           } else {
                              await typer.text(...text.a_outlands.chair2d6);
                              nomove = true;
                           }
                        }
                     }
                     if (nomove) {
                        atlas.switch(null);
                        chairAnim.reset().use(content.ionOChairiel);
                        chairAnim.enable();
                        await timer.when(() => chairAnim.index === 4);
                        chairAnim.disable();
                        await timer.pause(133);
                        chairAnim.index = 5;
                        const tori = character('toriel', characters.toriel, { x: 134, y: 96 }, 'right');
                        Promise.race([
                           events.on('teleport'),
                           walkHer(tori, { x: 3, y: 0 }, pos => pos.x < chair.position.x + 60).then(async () => {
                              await walkHer(tori, { x: 4, y: 4 }, pos => pos.y < 173.5);
                              await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 300);
                              await tori.alpha.modulate(timer, 300, 0);
                           })
                        ]).then(() => {
                           renderer.detach('main', tori);
                        });
                        save.data.n.plot = 10;
                     }
                     break;
                  }
                  case 3:
                     await typer.text(...text.a_outlands.chair1c);
                     break;
               }
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'runaway': {
            if (!game.movement) {
               return;
            }
            if (save.data.n.plot < 10) {
               game.movement = false;
               const tori = new CosmosCharacter({
                  alpha: 0,
                  anchor: { x: 0, y: 1 },
                  position: { x: 40, y: player.y },
                  preset: characters.toriel,
                  key: 'toriel'
               });
               tori.face = 'right';
               renderer.attach('main', tori);
               await tori.alpha.modulate(timer, 300, 1);
               await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < player.x - 24);
               atlas.switch('dialoguerBottom');
               if (save.data.n.plot < 8) {
                  await typer.text(...text.a_outlands.runaway2);
               } else {
                  await typer.text(
                     ...text.a_outlands.runaway1[
                        Math.min(save.data.n.state_toriel_runaway++, text.a_outlands.runaway1.length - 1)
                     ]
                  );
               }
               atlas.switch(null);
               tori.preset = characters.torielHandhold;
               tori.face = 'left';
               tori.position.x += 12;
               player.alpha.value = 0;
               await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 16);
               await teleport('w_courtyard', 'left', 520, 170, world);
               tori.position.x = 520 - 12;
               tori.position.y = 170;
               const ticker = () => {
                  player.x = tori.position.x + 12;
                  player.y = tori.position.y;
               };
               renderer.on('tick', ticker);
               await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 465);
               await walkHer(tori, { x: -3, y: 3 }, pos => pos.y < 220);
               await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 340);
               tori.preset = characters.toriel;
               player.alpha.value = 1;
               renderer.off('tick', ticker);
               game.movement = true;
               await Promise.race([
                  events.on('teleport'),
                  walkHer(tori, { x: -3, y: -3 }, pos => pos.x > 270).then(async () => {
                     await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 100);
                     await tori.alpha.modulate(timer, 300, 0);
                  })
               ]);
               renderer.detach('main', tori);
            }
            break;
         }
         case 'partner': {
            if (args[0] === 'talk') {
               if (!game.movement) {
                  return;
               }
               (roomState.goatbro as CosmosEntity).face = 'down';
               game.movement = false;
               await scriptState.assetQueue!;
               atlas.switch('dialoguerBottom');
               if (save.data.n.plot < 15 && save.flag.n.ga_asriel0++ < 1) {
                  await typer.text(...text.a_outlands.asriel2);
               } else {
                  await typer.text(...text.a_outlands.asriel2b);
               }
               save.data.n.plot = 15;
               if (choicer.result === 1) {
                  const splashQueue = new CosmosInventory(content.asSplash, content.ieSplashForeground).load();
                  await typer.text(...text.a_outlands.asriel3);
                  (roomState.goatbro as CosmosEntity).face = 'up';
                  atlas.switch(null);
                  scriptState.proceed = true;
                  const overlay = new CosmosRectangle({
                     alpha: 0,
                     size: { x: 1000, y: 1000 },
                     position: { x: 160, y: 120 },
                     anchor: 0,
                     fill: 'black',
                     stroke: 'transparent'
                  });
                  renderer.attach('menu', overlay);
                  await Promise.all([
                     overlay.alpha.modulate(timer, 3000, 1),
                     audio.musicMixer.modulate(timer, 3000, 0)
                  ]);
                  compat();
                  await Promise.all([ splashQueue, timer.pause(1000) ]);
                  await script('splash');
                  renderer.detach('menu', overlay);
               } else {
                  await typer.text(...text.a_outlands.asriel4);
                  (roomState.goatbro as CosmosEntity).face = 'up';
               }
               atlas.switch(null);
               game.movement = true;
               return;
            }
            if (!scriptState.active && world.genocide && save.data.n.plot < 16) {
               scriptState.active = true;
               scriptState.assetQueue = new CosmosInventory(
                  content.avAsriel2,
                  content.idcAsrielEvil,
                  content.idcAsrielEvilClosed,
                  content.idcAsrielPlain,
                  content.idcAsrielPlainClosed,
                  content.idcAsrielSmirk
               ).load();
               const goatbro = new CosmosCharacter({
                  anchor: 0,
                  position: { x: 120, y: 30 },
                  size: { x: 40, y: 20 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     args: [ 'partner', 'talk' ],
                     sus: void 0 as boolean | void
                  },
                  preset: characters.asriel,
                  key: 'asriel'
               }).on('tick', async () => {
                  if (!scriptState.proceed) {
                     goatbro.preset = game.room === 'w_exit' ? characters.asriel : characters.none;
                     goatbro.metadata.barrier = game.room === 'w_exit';
                     goatbro.metadata.interact = game.room === 'w_exit';
                  } else if (!goatbro.metadata.sus) {
                     goatbro.metadata.sus = true;
                     await Promise.all([ player.walk(timer, 1.5, { y: 0 }), goatbro.walk(timer, 1.5, { y: 0 }) ]);
                     renderer.detach('main', goatbro);
                  }
               });
               goatbro.face = 'up';
               renderer.attach('main', goatbro);
               roomState.goatbro = goatbro;
            }
            break;
         }
         case 'candy': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (save.data.n.state_wastelands_candy < 4) {
               await typer.text(...text.a_outlands.candy1);
               if (choicer.result < 3) {
                  if (save.storage.inventory.size < 8) {
                     const item = [ 'candy', 'water', 'delta' ][choicer.result] as 'candy' | 'water' | 'delta';
                     if (item === 'water') {
                        typer.variables.x = commonText.i_water.name;
                     } else {
                        typer.variables.x = text[`i_${item}`].name;
                     }
                     save.storage.inventory.add(item);
                     assets.sounds.equip.instance(timer);
                     await typer.text(
                        ...[
                           text.a_outlands.candy2,
                           text.a_outlands.candy3,
                           text.a_outlands.candy4,
                           text.a_outlands.candy5
                        ][save.data.n.state_wastelands_candy++]
                     );
                     if (save.data.n.state_wastelands_candy === 4) {
                        (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
                     }
                  } else {
                     await typer.text(...text.a_outlands.candy8);
                  }
               } else {
                  await typer.text(...text.a_outlands.candy7);
               }
            } else {
               await typer.text(...text.a_outlands.candy6);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'fridgetrap': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerTop');
            if (save.data.b.item_chocolate) {
               await typer.text(...text.a_outlands.fridgetrap.c);
            } else {
               await typer.text(...text.a_outlands.fridgetrap.a);
               if (!save.data.b.oops) {
                  await typer.text(...text.a_outlands.fridgetrap.b);
                  if (choicer.result === 0) {
                     if (save.storage.inventory.size < 8) {
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('chocolate');
                        save.data.b.item_chocolate = true;
                        await typer.text(...text.a_outlands.fridgetrap.b2);
                     } else {
                        await typer.text(...text.a_outlands.fridgetrap.d);
                     }
                  } else {
                     await typer.text(...text.a_outlands.fridgetrap.b1);
                  }
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'endtwinkly': {
            if (
               world.genocide ||
               save.data.n.plot > 14 ||
               save.flag.b.confront_twinkly ||
               (save.flag.b.enrage_twinkly && save.flag.n.genocide_twinkly <= resetThreshold()) ||
               [ 7.3, 8.3, 11.3, 12.3, 13.3, 14.3, 15.2 ].includes(save.flag.n.state_toriel)
            ) {
               return;
            } else {
               if (!game.movement) {
                  return;
               }
               save.data.n.plot = 15;
            }
            const twinklyAssets = new CosmosInventory(
               content.idcTwinklyNice,
               content.idcTwinklySide,
               content.idcTwinklyKawaii,
               content.idcTwinklyCapping,
               content.idcTwinklySassy,
               content.idcTwinklyPlain,
               content.idcTwinklyPissed,
               content.idcTwinklyWink,
               content.idcTwinklyGrin,
               content.idcTwinklyEvil,
               content.idcTwinklyLaugh,
               content.iocTwinkly,
               content.avTwinkly1,
               content.avTwinkly2
            );
            const twinklyQueue = twinklyAssets.load();
            const time = timer.value;
            const beamScaleX = new CosmosValue();
            const beam = new CosmosRectangle({
               anchor: 0,
               position: { x: player.x, y: renderer.position.clamp(...renderer.region).y },
               size: { x: 40, y: 240 },
               priority: -10,
               fill: '#fff7',
               stroke: 'transparent',
               objects: [ new CosmosRectangle({ fill: '#fffc', anchor: 0, size: { x: 35, y: 240 } }) ]
            }).on('tick', () => {
               beam.scale.x = beamScaleX.value + CosmosMath.wave(((timer.value - time) % 250) / 250) * 0.1;
            });
            const starPositionY = new CosmosValue();
            const star = new CosmosAnimation({
               alpha: 0,
               priority: -1,
               anchor: { x: 0, y: 1 },
               position: { x: player.x },
               resources: content.iocTwinkly
            }).on('tick', function () {
               this.position.y = starPositionY.value + CosmosMath.wave(((timer.value - time) % 2500) / 2500) * 5;
            });
            game.movement = false;
            await timer.pause(250);
            renderer.attach('main', beam);
            await beamScaleX.modulate(timer, 350, 0, 1);
            await timer.pause(400);
            await content.iocTwinkly.load();
            renderer.attach('main', star);
            await Promise.all([
               star.alpha.modulate(timer, 800, 0, 1),
               starPositionY.modulate(timer, 800, 140, 140, 140),
               timer
                  .pause(300)
                  .then(() => beamScaleX.modulate(timer, 350, 1, 0))
                  .then(() => renderer.detach('main', beam))
            ]);
            await twinklyQueue;
            const outcomeX = save.flag.n.state_toriel;
            const outcomeY = areaKills() + (save.data.n.state_wastelands_toriel === 2 ? 1 : 0);
            const reveal = save.flag.b.reveal_twinkly;
            atlas.switch('dialoguerBottom');
            if (outcomeY > 11) {
               save.flag.b.reveal_twinkly = true;
            }
            if (!save.data.b.oops) {
               await typer.text(...text.a_outlands.endtwinkly1);
            }
            speech.targets.add(star);
            let confront = false;
            if (save.flag.n.genocide_twinkly <= resetThreshold()) {
               if (save.flag.n.genocide_twinkly > 0) {
                  confront = true;
                  save.flag.b.enrage_twinkly = true;
                  await typer.text(...text.a_outlands.endtwinklyA1);
               } else {
                  switch (outcomeX) {
                     case 1:
                        await typer.text(
                           ...text.a_outlands.endtwinklyI,
                           ...(!reveal && outcomeY > 11
                              ? [
                                   ...text.a_outlands.endtwinklyIB,
                                   ...(outcomeY < 15 ? text.a_outlands.endtwinklyB2 : text.a_outlands.endtwinklyB3)
                                ]
                              : text.a_outlands.endtwinklyIA)
                        );
                        break;
                     case 2:
                     case 3:
                        await typer.text(
                           ...(world.bullied && save.data.n.bully_wastelands > 4
                              ? text.a_outlands.endtwinklyD
                              : text.a_outlands.endtwinklyB),
                           ...(outcomeX === 2
                              ? text.a_outlands.endtwinklyBC
                              : !reveal && outcomeY > 15
                              ? text.a_outlands.endtwinklyB3
                              : !reveal && outcomeY > 11
                              ? text.a_outlands.endtwinklyB2
                              : outcomeY > 0
                              ? [
                                   ...text.a_outlands.endtwinklyBB,
                                   ...(outcomeY > 1 ? text.a_outlands.endtwinklyBBB : text.a_outlands.endtwinklyBBA)
                                ]
                              : text.a_outlands.endtwinklyBA())
                        );
                        break;
                     case 4:
                        await typer.text(
                           ...text.a_outlands.endtwinklyE,
                           ...(!reveal && outcomeY > 11
                              ? [
                                   ...text.a_outlands.endtwinklyEB,
                                   ...(outcomeY < 15 ? text.a_outlands.endtwinklyB2 : text.a_outlands.endtwinklyB3)
                                ]
                              : [ ...text.a_outlands.endtwinklyEA, ...text.a_outlands.endtwinklyC ])
                        );
                        break;
                     case 5:
                     case 6:
                        await typer.text(
                           ...text.a_outlands.endtwinklyF,
                           ...[ text.a_outlands.endtwinklyFA, text.a_outlands.endtwinklyFB ][outcomeX - 5],
                           ...text.a_outlands.endtwinklyFXA
                        );
                        break;
                     case 15:
                        save.flag.n.state_toriel = 15.1;
                        await typer.text(...text.a_outlands.endtwinklyL);
                        break;
                     case 15.1:
                        save.flag.n.state_toriel = 15.2;
                        await typer.text(...text.a_outlands.endtwinklyL1);
                        break;
                     case 7:
                        save.flag.n.state_toriel = 7.1;
                        await typer.text(...text.a_outlands.endtwinklyG);
                        break;
                     case 11:
                        save.flag.n.state_toriel = 11.1;
                        await typer.text(...text.a_outlands.endtwinklyG);
                        break;
                     case 13:
                        save.flag.n.state_toriel = 13.1;
                        await typer.text(...text.a_outlands.endtwinklyG);
                        break;
                     case 7.1:
                        save.flag.n.state_toriel = 7.2;
                        await typer.text(...text.a_outlands.endtwinklyG1);
                        break;
                     case 11.1:
                        save.flag.n.state_toriel = 11.2;
                        await typer.text(...text.a_outlands.endtwinklyG1);
                        break;
                     case 13.1:
                        save.flag.n.state_toriel = 13.2;
                        await typer.text(...text.a_outlands.endtwinklyG1);
                        break;
                     case 7.2:
                        save.flag.n.state_toriel = 7.3;
                        await typer.text(...text.a_outlands.endtwinklyG2);
                        break;
                     case 11.2:
                        save.flag.n.state_toriel = 11.3;
                        await typer.text(...text.a_outlands.endtwinklyG2);
                        break;
                     case 13.2:
                        save.flag.n.state_toriel = 13.3;
                        await typer.text(...text.a_outlands.endtwinklyG2);
                        break;
                     case 8:
                        save.flag.n.state_toriel = 8.1;
                        await typer.text(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 12:
                        save.flag.n.state_toriel = 12.1;
                        await typer.text(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 14:
                        save.flag.n.state_toriel = 14.1;
                        await typer.text(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 8.1:
                        save.flag.n.state_toriel = 8.2;
                        await typer.text(...text.a_outlands.endtwinklyK1);
                        break;
                     case 12.1:
                        save.flag.n.state_toriel = 12.2;
                        await typer.text(...text.a_outlands.endtwinklyK1);
                        break;
                     case 14.1:
                        save.flag.n.state_toriel = 14.2;
                        await typer.text(...text.a_outlands.endtwinklyK1);
                        break;
                     case 8.2:
                        save.flag.n.state_toriel = 8.3;
                        await typer.text(...text.a_outlands.endtwinklyK2);
                        break;
                     case 12.2:
                        save.flag.n.state_toriel = 12.3;
                        await typer.text(...text.a_outlands.endtwinklyK2);
                        break;
                     case 14.2:
                        save.flag.n.state_toriel = 14.3;
                        await typer.text(...text.a_outlands.endtwinklyK2);
                        break;
                     case 9:
                        await typer.text(...text.a_outlands.endtwinklyH, ...text.a_outlands.endtwinklyC);
                        break;
                     case 10:
                        await typer.text(...text.a_outlands.endtwinklyJ, ...text.a_outlands.endtwinklyC);
                        break;
                  }
               }
            } else {
               confront = true;
               save.flag.b.confront_twinkly = true;
               if (wasGeno.state && saver.savedTime === -Infinity) {
                  saver.save();
                  wasGeno.state = false;
               }
               await typer.text(...text.a_outlands.endtwinklyA2);
            }
            atlas.switch(null);
            speech.targets.delete(star);
            await Promise.all([
               star.alpha.modulate(timer, 800, 1, 1, 0),
               starPositionY.modulate(timer, 800, starPositionY.value, starPositionY.value, 0)
            ]);
            renderer.detach('main', star);
            content.iocTwinkly.unload();
            twinklyAssets.unload();
            if (!save.data.b.oops) {
               atlas.switch('dialoguerBottom');
               await typer.text(...(confront ? text.a_outlands.endtwinklyAreaction : text.a_outlands.endtwinkly2));
               atlas.switch(null);
            }
            game.movement = true;
            break;
         }
         case 'exit': {
            if (!game.movement) {
               return;
            }
            if (save.data.n.plot < 16) {
               game.movement = false;
               const splashQueue = new CosmosInventory(content.asSplash, content.ieSplashForeground).load();
               compat();
               const overlay = new CosmosRectangle({
                  alpha: 0,
                  size: { x: 1000, y: 1000 },
                  position: { x: 160, y: 120 },
                  anchor: 0,
                  fill: 'black',
                  stroke: 'transparent'
               });
               renderer.attach('menu', overlay);
               await overlay.alpha.modulate(timer, 3000, 1);
               await Promise.all([ splashQueue, timer.pause(1000) ]);
               await script('splash');
               renderer.detach('menu', overlay);
               game.movement = true;
            } else {
               await teleport('s_start', 'up', 60, 130, world);
            }
            break;
         }
         case 'torieldanger': {
            if (!game.movement) {
               return;
            }
            if (save.data.n.plot < 2.61) {
               (states.scripts.danger_puzzle ??= {}).tori.face = 'down';
               const lines = text.a_outlands[subscript];
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await typer.text(...[ lines.a, lines.b ][save.data.n.plot < 2.602 ? 0 : 1]);
               switch (save.data.n.plot) {
                  case 2.6:
                     save.data.n.plot = 2.602;
                     break;
                  case 2.601:
                     save.data.n.plot = 2.603;
                     break;
               }
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'cryme': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_tomcryme'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (save.data.b.genocide) {
               await typer.text(...lines.b());
            } else {
               await typer.text(...lines.a());
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'afrog': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_afrog'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (save.data.n.plot < 8.1) {
               await typer.text(...lines.a);
            } else {
               await typer.text(...lines.b);
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'patron': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_bpatron'))[0].objects[0] as CosmosAnimation
            );
            const talker2 = talkerEngine(
               'n2',
               objectsByTag(tags => tags.includes('w2_steaksalesman'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            await typer.text(...lines.a());
            talker.end();
            talker2.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'loox': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_loox'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (world.bullied) {
               await typer.text(...lines.d);
            } else if (save.data.n.state_wastelands_dummy === 6 || save.data.b.flirt_froggit) {
               await typer.text(...lines.a);
            } else if (save.data.n.plot > 5.1 && world.flirt > 0) {
               await typer.text(...lines.c);
            } else {
               await typer.text(...lines.b);
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'manana': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_manana'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (save.data.b.starbertB) {
               await typer.text(...lines.e);
            } else {
               await typer.text(...lines.a());
               if (choicer.result === 0) {
                  if (save.data.n.g < 15) {
                     await typer.text(...lines.b);
                  } else {
                     if (save.storage.inventory.size < 8) {
                        save.data.n.g -= 15;
                        save.data.b.starbertB = true;
                        save.storage.inventory.add('starbertB');
                        assets.sounds.equip.instance(timer);
                        await typer.text(...lines.d);
                     } else {
                        await typer.text(...lines.f);
                     }
                  }
               } else {
                  await typer.text(...lines.c);
               }
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'doorRed': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (save.data.b.genocide) {
               await typer.text(...lines.a3());
            } else if (areaKills() > 6) {
               await typer.text(...lines.a2);
            } else {
               await typer.text(...lines.a);
               if (choicer.result === 0) {
                  if (save.data.b.oops) {
                     await typer.text(...lines.b);
                  } else {
                     await typer.text(...lines.c);
                  }
               } else {
                  await typer.text(...lines.d);
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'doorYellow': {
            if (!game.movement) {
               return;
            }
            if (areaKills() > 6) {
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.doorYellow());
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'supervisor': {
            if (!game.movement) {
               return;
            }
            const imthesupervisor = objectsByTag(tags => tags.includes('w_supervisor'))[0];
            if (!imthesupervisor) {
               break;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine('n1', imthesupervisor.objects[0] as CosmosAnimation);
            atlas.switch('dialoguerBottom');
            if (save.data.b.napsta_performance) {
               await typer.text(...lines.a2);
            } else if (save.data.n.plot < 14) {
               if (save.data.n.state_wastelands_napstablook === 5) {
                  await typer.text(...lines.a5());
               } else {
                  await typer.text(...lines.a());
                  switch (choicer.result) {
                     case 0:
                        save.data.b.napsta_performance = true;
                        const outcome = save.data.n.state_wastelands_napstablook;
                        await typer.text(...lines.aa, ...lines.aa1[outcome]);
                        if (outcome === 2 || outcome === 4) {
                           await typer.text(...lines.aa1a);
                        } else {
                           await typer.text(...lines.aa1b);
                           talker.end();
                           atlas.switch(null);

                           const djtable = objectsByTag(tags => tags.includes('w_djtable'))[0]
                              .objects[0] as CosmosAnimation;
                           const soupguy = objectsByTag(tags => tags.includes('w_soupguy'))[0]
                              .objects[0] as CosmosAnimation;
                           const tomcryme = objectsByTag(tags => tags.includes('w_tomcryme'))[0]
                              .objects[0] as CosmosAnimation;
                           const steaksalesman = objectsByTag(tags => tags.includes('w2_steaksalesman'))[0]
                              .objects[0] as CosmosAnimation;
                           const bpatron = objectsByTag(tags => tags.includes('w_bpatron'))[0]
                              .objects[0] as CosmosAnimation;

                           const loader1 = new CosmosInventory(
                              content.iocTorielUp,
                              content.iocNapstablookBody,
                              content.ionOSoupBack,
                              content.ionOMananaBack,
                              content.ionOSilencioBack,
                              content.ionOSteaksalesmanBack,
                              content.ionOPlugbellyBack
                           );
                           const queue1 = loader1.load();
                           const loader2 = content.amDJBeat;
                           const queue2 = loader2.load();

                           const overlay = new CosmosRectangle({
                              alpha: 0,
                              size: { x: 1000, y: 1000 },
                              position: { x: 0, y: 0 },
                              fill: 'black',
                              stroke: 'transparent'
                           });
                           renderer.attach('menu', overlay);
                           await Promise.all([
                              overlay.alpha.modulate(timer, 1250, 1),
                              game.music!.gain.modulate(timer, 1250, 0)
                           ]);
                           await timer.pause(850);
                           atlas.switch('dialoguerBottom');
                           await typer.text(...lines.aa1c);
                           atlas.switch(null);

                           soupguy.alpha.value = 0;
                           tomcryme.alpha.value = 0;
                           steaksalesman.alpha.value = 0;
                           bpatron.alpha.value = 0;
                           player.alpha.value = 0;
                           player.y = 210;

                           const time = timer.value;
                           const blookyPositionY = new CosmosValue(152);
                           const napsta = new CosmosSprite({
                              anchor: { y: 0 },
                              rotation: -90,
                              position: { x: 140 },
                              frames: [ content.iocNapstablookBody ]
                           }).on('tick', function () {
                              this.position.y =
                                 blookyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 2;
                           });
                           const peeps = [
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 180, y: 158 },
                                 resources: content.iocFriskDown
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 139, y: 242 },
                                 resources: content.iocTorielUp
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 211, y: 226 },
                                 resources: content.ionOPlugbellyBack
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 111, y: 229 },
                                 resources: content.ionOSteaksalesmanBack
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 184, y: 225 },
                                 resources: content.ionOMananaBack
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 119, y: 311 },
                                 resources: content.ionOSoupBack
                              }),
                              new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: { x: 160, y: 326 },
                                 resources: content.ionOSilencioBack
                              })
                           ];
                           const crowd = new CosmosObject({ objects: [ napsta, ...peeps ] });

                           await queue1;
                           renderer.attach('main', crowd);
                           await overlay.alpha.modulate(timer, 1250, 0);
                           await timer.pause(850);

                           renderer.detach('menu', overlay);
                           const overlay2 = new CosmosObject({ alpha: 0.8, priority: -10 });
                           overlay2.container.addChild(
                              new Graphics()
                                 .beginFill(0, 1)
                                 .drawRect(0, 0, 320, 240)
                                 .endFill()
                                 .beginHole()
                                 .drawEllipse(140, 50, 60, 45)
                                 .endHole()
                           );
                           renderer.attach('menu', overlay2);
                           assets.sounds.noise.instance(timer);

                           await timer.pause(1250);
                           atlas.switch('dialoguerBottom');
                           await typer.text(...lines.b);
                           atlas.switch(null);

                           await queue2;
                           djtable.enable();
                           const muzic = assets.music.djbeat.instance(timer);
                           const beatUnit = (120 / 65) * 1e3;
                           muzic.gain.value /= 4;
                           muzic.gain.modulate(timer, 300, muzic.gain.value * 4);
                           header('x1').then(() => peeps[3].enable());
                           header('x2').then(() => peeps[2].enable());
                           header('x3').then(() => peeps[6].enable());
                           header('x4').then(() => peeps[5].enable());
                           header('x5').then(() => peeps[4].enable());
                           header('x6').then(() => peeps[2].enable());
                           header('x7').then(() => peeps[2].disable().reset());
                           for (const [ index, multi ] of [
                              4.25, 8.25, 12.75, 20.75, 24.5, 28.5, 32.25, 36.75, 39.25
                           ].entries()) {
                              timer.pause(beatUnit * multi).then(async () => {
                                 atlas.switch('dialoguerTop');
                                 await typer.text(...lines.c[index]);
                                 atlas.switch(null);
                              });
                           }

                           await timer.pause(6e4);
                           const random3 = random.clone();
                           for (const sprite of peeps) {
                              sprite.disable().reset();
                              await timer.pause(20 + random3.next() * 40);
                           }

                           await timer.pause(2e4);
                           djtable.disable();
                           atlas.switch('dialoguerBottom');
                           await typer.text(...lines.d);
                           atlas.switch(null);
                           napsta.alpha.modulate(timer, 1250, 0);

                           await timer.pause(350);
                           renderer.detach('menu', overlay2);
                           assets.sounds.noise.instance(timer).rate.value = 1.2;
                           await timer.pause(150);
                           await timer.pause(350);
                           atlas.switch('dialoguerTop');
                           await typer.text(...lines.e);
                           atlas.switch(null);

                           renderer.attach('menu', overlay);
                           await overlay.alpha.modulate(timer, 1250, 1);
                           renderer.detach('main', crowd);
                           loader1.unload();
                           loader2.unload();
                           await timer.pause(1250);
                           soupguy.alpha.value = 1;
                           player.alpha.value = 1;
                           tomcryme.alpha.value = 1;
                           steaksalesman.alpha.value = 1;
                           bpatron.alpha.value = 1;
                           player.x = 180;
                           player.y = 158;
                           player.face = 'down';
                           Promise.all([
                              overlay.alpha.modulate(timer, 300, 0),
                              game.music!.gain.modulate(timer, 300, world.level)
                           ]).then(() => {
                              renderer.detach('menu', overlay);
                           });
                           game.movement = true;
                           return;
                        }
                        break;
                     case 1:
                        await typer.text(...lines.ab);
                        break;
                  }
               }
            } else {
               await typer.text(...lines.a4);
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'terminal': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const container = objectsByTag(tags => tags.includes('w_term'))[0].objects[0] as CosmosSprite;
            assets.sounds.equip.instance(timer).rate.value = 1.2;
            container.frames = [ content.iooOTerminalScreen ];
            atlas.switch('dialoguerBottom');
            switch (game.room) {
               case 'w_froggit':
                  await typer.text(...lines.a);
                  break;
               case 'w_blooky':
                  await typer.text(...lines.b);
                  break;
               case 'w_junction':
                  await typer.text(...lines.c());
                  break;
               case 'w_party':
                  await typer.text(...lines.d());
                  break;
            }
            atlas.switch(null);
            container.frames = [];
            game.movement = true;
            break;
         }
         case 'dipper': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (save.storage.inventory.size === 8) {
               await typer.text(...lines.b);
            } else {
               assets.sounds.equip.instance(timer);
               save.storage.inventory.add('little_dipper');
               save.data.b.item_little_dipper = true;
               instanceDestroy([ 'w_dipper' ]);
               await typer.text(...lines.a);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'halo': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (save.storage.inventory.size === 8) {
               await typer.text(...lines.b);
            } else {
               assets.sounds.equip.instance(timer);
               save.storage.inventory.add('halo');
               save.data.b.item_halo = true;
               instanceDestroy([ 'w_halo' ]);
               await typer.text(...lines.a);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'backdesk': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (!save.data.b.starbertA) {
               if (save.storage.inventory.size < 8) {
                  save.data.b.starbertA = true;
                  save.storage.inventory.add('starbertA');
                  await typer.text(...lines.b);
               } else {
                  await typer.text(...lines.b2);
               }
            } else {
               await typer.text(...lines.a);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'closetrocket': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (player.face === 'down') {
               if (!save.data.b.starbertC) {
                  if (save.storage.inventory.size < 8) {
                     save.data.b.starbertC = true;
                     save.storage.inventory.add('starbertC');
                     await typer.text(...lines.b);
                  } else {
                     await typer.text(...lines.b2);
                  }
               } else {
                  await typer.text(...lines.a);
               }
            } else {
               await typer.text(...lines.c);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'silencio': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_silencio'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (areaKills() > 6) {
               await typer.text(...lines.b());
            } else {
               await typer.text(...lines.a());
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'soupguy': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_soupguy'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (save.data.n.plot > 13 || save.data.b.w_state_catnap) {
               await typer.text(...lines.c());
            } else if (save.data.b.napsta_performance) {
               await typer.text(...lines.a());
            } else {
               await typer.text(...lines.b());
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'steaksale': {
            if (!game.movement) {
               return;
            }
            if (player.face !== 'up') {
               break;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (areaKills() > 12) {
               switch (args[0]) {
                  case 'steak':
                     if (!save.data.b.w_state_steak) {
                        if (save.storage.inventory.size === 8) {
                           await typer.text(...lines.h);
                        } else {
                           save.data.b.w_state_steak = true;
                           assets.sounds.equip.instance(timer);
                           save.storage.inventory.add('steak');
                           await typer.text(...lines.f);
                        }
                     }
                     break;
                  case 'soda':
                     if (!save.data.b.w_state_soda) {
                        if (save.storage.inventory.size === 8) {
                           await typer.text(...lines.h);
                        } else {
                           save.data.b.w_state_soda = true;
                           assets.sounds.equip.instance(timer);
                           save.storage.inventory.add('soda');
                           await typer.text(...lines.g);
                        }
                     }
                     break;
               }
            } else {
               const talker = talkerEngine(
                  'n1',
                  objectsByTag(tags => tags.includes('w2_steaksalesman'))[0]?.objects[0] as CosmosAnimation
               );
               atlas.switch('dialoguerBottom');
               switch (args[0]) {
                  case 'steak':
                     if (!save.data.b.w_state_steak) {
                        await typer.text(...lines.b);
                        if (choicer.result === 0) {
                           if (save.data.n.g < 30) {
                              await typer.text(...lines.d());
                           } else if (save.storage.inventory.size === 8) {
                              await typer.text(...lines.e());
                           } else {
                              save.data.n.g -= 30;
                              save.data.b.w_state_steak = true;
                              assets.sounds.equip.instance(timer);
                              save.storage.inventory.add('steak');
                              await typer.text(...lines.b1());
                              if (save.data.b.w_state_soda) {
                                 await typer.text(...lines.i);
                              }
                           }
                        } else {
                           await typer.text(...lines.b2);
                        }
                     }
                     break;
                  case 'soda':
                     if (!save.data.b.w_state_soda) {
                        await typer.text(...lines.c);
                        if (choicer.result === 0) {
                           if (save.data.n.g < 15) {
                              await typer.text(...lines.d());
                           } else if (save.storage.inventory.size === 8) {
                              await typer.text(...lines.e());
                           } else {
                              save.data.n.g -= 15;
                              save.data.b.w_state_soda = true;
                              assets.sounds.equip.instance(timer);
                              save.storage.inventory.add('soda');
                              await typer.text(...lines.c1());
                              if (save.data.b.w_state_steak) {
                                 await typer.text(...lines.i);
                              }
                           }
                        } else {
                           await typer.text(...lines.c2);
                        }
                     }
                     break;
                  default:
                     if (save.data.b.w_state_soda && save.data.b.w_state_steak) {
                        await typer.text(...lines.a1);
                     } else {
                        await typer.text(...lines.a());
                     }
                     break;
               }
               talker.end();
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'sludge': {
            if (!scriptState.sus) {
               scriptState.sus = true;
               player.metadata.speed = 0.5;
               scriptState.time = 0;
               const sludgespr = new CosmosAnimation({
                  anchor: 0,
                  priority: 10000,
                  resources: content.iooOSludge
               });
               let oldpos = { x: 0, y: 0 } as CosmosPointSimple;
               sludgespr.on('tick', () => {
                  if (scriptState.time > 2) {
                     player.metadata.speed = 1;
                     scriptState.sus = false;
                     timer.post().then(() => {
                        renderer.detach('main', sludgespr);
                     });
                  } else {
                     game.movement && scriptState.time++;
                     sludgespr.position = player.position.clone();
                     timer.post().then(() => {
                        if (player.x !== oldpos.x || player.y !== oldpos.y) {
                           oldpos = player.position.value();
                           sludgespr.enable();
                        } else {
                           sludgespr.disable();
                        }
                     });
                  }
               });
               renderer.attach('main', sludgespr);
            } else {
               scriptState.time = 0;
            }
            break;
         }
         case 'partydoor': {
            if (!game.movement) {
               return;
            }
            if (!save.data.b.genocide && (save.data.n.plot < 8.2 || areaKills() > 6)) {
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.guard.a());
               atlas.switch(null);
               player.y += 3;
               player.face = 'down';
               game.movement = true;
            } else {
               teleport('w_party', 'up', 160, 330, world);
            }
            break;
         }
         case 'splash': {
            const foreground = new CosmosSprite({
               alpha: 0,
               blend: BLEND_MODES.ADD,
               frames: [ content.ieSplashForeground ],
               position: { x: 0, y: -60 },
               priority: 1
            });
            const background = new CosmosSprite({
               anchor: 0,
               position: { x: 160, y: 120 },
               alpha: 0,
               frames: [ content.ieSplashBackground ]
            });
            const fader = new CosmosRectangle({
               alpha: 0,
               fill: '#fff',
               priority: 2,
               size: { x: 320, y: 240 },
               stroke: 'transparent'
            });
            assets.sounds.splash.instance(timer);
            renderer.attach('menu', foreground);
            await Promise.all([
               foreground.alpha.modulate(timer, 1000, 0, 0, 1),
               foreground.position.modulate(timer, 1000, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 })
            ]);
            renderer.attach('menu', background);
            background.alpha.modulate(timer, 2000, 0, 1, 1);
            await timer.pause(1400);
            renderer.attach('menu', fader);
            await fader.alpha.modulate(timer, 2500, 0, 0, 1);
            renderer.detach('menu', foreground, background);
            content.ieSplashForeground.unload();
            const loader = content.avAsriel.load();
            await fader.alpha.modulate(timer, 300, 0);
            renderer.detach('menu', fader);
            await Promise.all([ loader, timer.pause(1000) ]);
            if (args[0] !== 'noteleport') {
               await teleport('s_start', 'up', 60, 130, world);
               audio.musicMixer.modulate(timer, 0, 1);
            }
            content.asSplash.unload();
            break;
         }
         case 'triviabarrier': {
            await trivia(
               ...CosmosUtils.provide(text.a_outlands.trivia[args[0] as keyof typeof text.a_outlands.trivia])
            );
            player.move({ x: +args[1], y: +args[2] }, renderer);
            break;
         }
         case 'x-elevation': {
            const pos = player.position;
            if (scriptState.wsPosition && +args[1] <= pos.x && pos.x <= +args[2]) {
               const diff = pos.x - (scriptState.wsPosition as CosmosPointSimple).x;
               if (Math.abs(diff) > 0) {
                  player.move(
                     { x: 0, y: +args[0] * diff },
                     renderer,
                     [ 'below', 'main' ],
                     hitbox => hitbox.metadata.barrier === true
                  );
               }
            }
            scriptState.wsPosition = pos.value();
            break;
         }
         case 'backtracker': {
            await teleport('w_alley4', 'down', 230, 165, world);
            break;
         }
      }
   }
};

events.on('drop', async key => {
   if (game.room === 'w_toriel_living' && save.data.n.plot < 10 && save.data.n.plot !== 9) {
      switch (key) {
         case 'pie':
         case 'pie2':
         case 'snails':
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands[`drop_${key === 'snails' ? 'snails' : 'pie'}`]);
            if (!save.data.b.oops) {
               await typer.text(...text.a_outlands.drop_fail);
               oops();
            }
            atlas.switch(null);
            break;
      }
   }
   if (game.room === 'w_party' && areaKills() < 13) {
      switch (key) {
         case 'soda':
         case 'steak':
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w2_steaksalesman'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands[`drop_${key}`]);
            if (!save.data.b.oops) {
               await typer.text(...text.a_outlands.drop_fail);
               oops();
            }
            atlas.switch(null);
            talker.end();
            break;
      }
   }
});

events.on('init-overworld', () => {
   save.data.n.state_wastelands_toriel === 2 && torielOverride();
   save.data.s.armor === 'spacesuit' || (items.of('spacesuit').value = 10);
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'outlands':
         script(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'w') {
            trivia(...CosmosUtils.provide(text.a_outlands.trivia[args[0] as keyof typeof text.a_outlands.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && save.data.n.plot <= 8) {
      switch (game.room) {
         case 'w_froggit':
         case 'w_candy':
         case 'w_puzzle1':
         case 'w_puzzle2':
         case 'w_puzzle3':
         case 'w_puzzle4':
         case 'w_mouse':
         case 'w_pacing':
         case 'w_junction':
         case 'w_annex':
            return !!runEncounter(
               (areaKills() + save.data.n.bully_wastelands) / 16,
               (() => {
                  switch (game.room) {
                     case 'w_puzzle1':
                        return save.data.n.plot < 5.1
                           ? save.data.n.encounters < 1 && save.data.n.steps < 60 && player.x < 90
                              ? 3
                              : 0
                           : 1;
                     case 'w_puzzle2':
                        return save.data.n.plot < 5.2
                           ? save.data.n.encounters < 1 && save.data.n.steps < 60 && player.y < 180
                              ? 3
                              : 0
                           : 1;
                     case 'w_puzzle3':
                        return save.data.n.plot < 5.3
                           ? save.data.n.encounters < 1 && save.data.n.steps < 60 && player.x < 90
                              ? 3
                              : 0
                           : 1;
                     case 'w_puzzle4':
                        return save.data.n.plot < 5.4
                           ? save.data.n.encounters < 1 && save.data.n.steps < 60 && player.y > 360
                              ? 3
                              : 0
                           : 1;
                     default:
                        return 1;
                  }
               })(),
               [
                  [ groups.froggit, 3 ],
                  [ groups.whimsun, 3 ],
                  [ groups.froggitWhimsun, 3 ],
                  [ commonGroups.moldsmal, 2 ],
                  [ groups.moldsmalMigosp, 3 ],
                  [ groups.loox, 2 ],
                  [ groups.mushy, 2 ],
                  [ groups.looxMigospMushy, 1 ]
               ]
            );
      }
   }
});

events.on('loaded').then(() => {
   if (world.genocide && save.data.n.plot > 13) {
      wasGeno.state = true;
   }
});

events.on('teleport', async (from, to) => {
   if (from === 'w_zigzag' && save.data.n.plot === 2.7) {
      save.data.n.plot = 2.71;
   }
   switch (to) {
      case 'w_candy': {
         if (save.data.n.state_wastelands_candy === 4) {
            (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
         }
         break;
      }
      case 'w_toriel_kitchen': {
         const piepan = objectsByTag(tags => tags.includes('w_piepan'))[0].objects[0] as CosmosAnimation;
         piepan.alpha.value = save.data.n.plot < 8 ? 0 : 1;
         piepan.index = save.data.n.state_wastelands_mash > 0 ? 2 : save.data.n.plot < 8.1 ? 1 : 0;
         break;
      }
      case 'w_lobby': {
         stalkerSetup(1);
         const scriptState = (states.scripts.lobby_puzzle ||= {});
         if (save.data.n.plot > 1) {
            instanceDestroy([ 'security_field' ]);
         }
         if (scriptState.active) {
            return;
         } else if (save.data.n.plot < 2) {
            teleporter.movement = false;
         }
         if (save.data.n.plot < 2.01) {
            scriptState.active = true;
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: save.data.n.plot < 2 ? { x: 140, y: 110 } : { x: 240, y: 150 },
               preset: characters.toriel,
               key: 'toriel'
            }).on('tick', async function () {
               if (
                  game.room === 'w_lobby' &&
                  save.data.n.plot === 2 &&
                  (player.x > this.position.x || player.position.extentOf(this.position) < 60)
               ) {
                  save.data.n.plot = 2.01;
                  await Promise.race([
                     events.on('teleport'),
                     walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 290).then(async () => {
                        await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 140);
                        await tori.alpha.modulate(timer, 300, 0);
                     })
                  ]);
                  renderer.detach('main', tori);
               }
            });
            tori.face = 'down';
            renderer.attach('main', tori);
            if (save.data.n.plot < 2) {
               let stage = 0;
               const buttons = Object.fromEntries(
                  objectsByTag(tags => tags.includes('l_button')).map(object => [
                     (object.metadata.tags as string[])[0],
                     [ object, object.objects[0] ]
                  ])
               ) as CosmosKeyed<[CosmosObject, CosmosAnimation], `${0 | 1 | 2}${0 | 1 | 2}`>;
               for (const [ x, animation ] of Object.values(buttons)) {
                  animation.index = 1;
               }
               tori.on('tick', async function () {
                  if (save.data.n.plot > 2) {
                     return;
                  }
                  tori.preset = game.room === 'w_lobby' ? characters.toriel : characters.none;
                  tori.metadata.barrier = game.room === 'w_lobby';
                  tori.metadata.interact = game.room === 'w_lobby';
                  if (stage === 2) {
                     return;
                  }
                  for (const [ tag, [ button, animation ] ] of Object.entries(buttons)) {
                     if (stage === 2) {
                        break;
                     }
                     if (this.position.extentOf({ x: button.position.x, y: animation.position.y }) < 10) {
                        if (animation.index === 1) {
                           animation.index = 0;
                           assets.sounds.noise.instance(timer);
                           if (tag === '22') {
                              stage = 1;
                           }
                        }
                     } else if (tag === '22' && stage === 1) {
                        stage = 2;
                        const sound1 = assets.sounds.noise.instance(timer);
                        sound1.rate.value = 1.2;
                        sound1.gain.value /= 1.5;
                        for (const [ x, animation ] of Object.values(buttons)) {
                           animation.index = 1;
                        }
                        await timer.pause(350);
                        for (const [ x, animation ] of Object.values(buttons)) {
                           animation.index = 0;
                        }
                        const field = objectsByTag(tags => tags.includes('security_field'))[0];
                        assets.sounds.depower.instance(timer);
                        await timer.pause(280);
                        field.alpha.value = 0;
                        await timer.pause(420 - 320);
                        field.alpha.value = 1;
                        await timer.pause(570 - 420);
                        field.alpha.value = 0;
                        await timer.pause(650 - 570);
                        field.alpha.value = 1;
                        await timer.pause(720 - 650);
                        renderer.detach('main', field);
                        break;
                     }
                  }
               });
               await walkHer(tori, { x: 0, y: 4 }, pos => pos.y < 130);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.lobby_puzzle1);
               atlas.switch(null);
               await walkHer(tori, { x: -2, y: 0 }, pos => pos.x > 120);
               await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 160);
               await walkHer(tori, { x: 2, y: 0 }, pos => pos.x < 140);
               await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 200);
               await walkHer(tori, { x: 2, y: 0 }, pos => pos.x < 160);
               await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 230);
               await walkHer(tori, { x: -2, y: 0 }, pos => pos.x > 140);
               await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 250);
               tori.face = 'down';
               atlas.switch('dialoguerTop');
               await typer.text(...text.a_outlands.lobby_puzzle2);
               atlas.switch(null);
               await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 216);
               await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 240);
               await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 150);
               tori.face = 'down';
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_outlands.lobby_puzzle3);
               atlas.switch(null);
               save.data.n.plot = 2;
               game.movement = true;
            } else if (save.data.n.plot === 2) {
               isolate(tori);
            }
         }
         break;
      }
      case 'w_tutorial':
         stalkerSetup(
            2,
            () => save.data.n.plot === 2.2,
            () => game.room === 'w_tutorial'
         );
         break;
      case 'w_danger':
         stalkerSetup(3);
         break;
      case 'w_froggit':
         stalkerSetup(4);
         break;
      case 'w_puzzle4':
         stalkerSetup(5);
         break;
      case 'w_pacing':
         stalkerSetup(6);
         break;
      case 'w_courtyard':
         stalkerSetup(7);
         break;
      case 'w_toriel_front':
         stalkerSetup(
            8,
            () => save.data.n.plot === 8.1,
            () => game.room === 'w_toriel_front'
         );
         break;
      case 'w_wonder': {
         save.flag.b.w_state_core && instanceDestroy([ 'w_goner' ]);
         save.data.b.item_little_dipper && instanceDestroy([ 'w_dipper' ]);
         from === 'w_annex' && script('wonder');
         break;
      }
      case 'w_annex': {
         from === 'w_wonder' && script('wonder');
         break;
      }
      case 'w_coffin': {
         temporary(
            new CosmosRectangle({
               alpha: 0.4,
               stroke: 'transparent',
               fill: 'black',
               priority: -9999,
               position: { x: 0, y: 0 },
               size: { x: 1000, y: 1000 }
            }),
            'menu'
         );
         break;
      }
      case 'w_storage': {
         temporary(
            new CosmosRectangle({
               alpha: 0.6,
               stroke: 'transparent',
               fill: 'black',
               priority: -9999,
               position: { x: 0, y: 0 },
               size: { x: 1000, y: 1000 }
            }),
            'menu'
         );
         break;
      }
      case 'w_start': {
         if (
            save.data.b.oops &&
            save.data.n.state_wastelands_toriel !== 2 &&
            areaKills() < 13 &&
            save.data.n.plot > 47.2
         ) {
            temporary(
               new CosmosHitbox({
                  size: { x: 25, y: 5 },
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     args: [ 'latetoriel' ],
                     tags: [ 'latetoriel' ]
                  },
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielSad }) ],
                  position: { x: 160, y: 295 }
               }),
               'main'
            );
         }
         break;
      }
      case 'w_toriel_hallway': {
         temporary(
            new CosmosObject({
               priority: 10,
               objects: [
                  new CosmosSprite({ frames: [ content.iooOMirrorBackdrop ] }).on('tick', function () {
                     this.position = renderer.projection({ x: 647, y: 80 });
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('tick', function () {
                     this.position = renderer.projection({
                        x: player.x,
                        y: 116.5 - (player.y - 116.5)
                     });
                     const source = player.sprites[
                        player.face === 'up' ? 'down' : player.face === 'down' ? 'up' : player.face
                     ] as CosmosAnimation;
                     this.use(source.resources);
                     this.index = source.index;
                  })
               ]
            }),
            'base'
         );
         break;
      }
      case 'w_alley4':
         stalkerSetup(9, true, () => save.flag.n.genocide_twinkly < resetThreshold());
      case 'w_alley3':
      case 'w_alley2':
      case 'w_alley1': {
         const toriTarget = to === 'w_alley1' ? 10 : to === 'w_alley2' ? 11 : to === 'w_alley3' ? 12 : 13;
         if (save.data.n.plot !== toriTarget) {
            break;
         }
         temporary(
            character(
               'toriel',
               characters.toriel,
               to === 'w_alley4' ? { x: 230, y: 170 } : { x: 180, y: to === 'w_alley1' ? 170 : 190 },
               to === 'w_alley4' ? 'up' : 'right',
               {
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     name: 'outlands',
                     args: [ 'alley' ],
                     tags: [ 'toriButNotGarb' ],
                     battle: false
                  }
               }
            ).on('tick', async function () {
               if (
                  game.room === to &&
                  save.data.n.plot === toriTarget &&
                  (to === 'w_alley4'
                     ? player.y < 180 || (player.x > 160 && player.x < 320 && player.y < 210)
                     : player.x > this.x - 30) &&
                  game.movement
               ) {
                  save.data.n.plot++;
                  game.movement = false;
                  await dialogue(
                     'dialoguerBottom',
                     ...CosmosUtils.provide(
                        to === 'w_alley1'
                           ? text.a_outlands.exit1
                           : to === 'w_alley2'
                           ? text.a_outlands.exit2
                           : to === 'w_alley3' ? text.a_outlands.exit3 :  text.a_outlands.exit4
                     )
                  );
                  if (to === 'w_alley4') {
                     game.movement = false;
                     const overlay = new CosmosRectangle({
                        alpha: 0,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        priority: -1,
                        fill: 'black',
                        stroke: 'transparent'
                     });
                     renderer.attach('main', overlay);
                     await Promise.all([
                        battler.load(groups.toriel),
                        CosmosUtils.chain<number, Promise<void>>(0, async (value, next) => {
                           assets.sounds.noise.instance(timer);
                           overlay.alpha.value += 0.25;
                           if (value < 3) {
                              await timer.pause(350);
                              await next(value + 1);
                           } else {
                              await timer.pause(850);
                              await battler.battlefall(player);
                           }
                        })
                     ]);
                     await battler.start(groups.toriel);
                     battler.unload(groups.toriel);
                     if (save.data.n.state_wastelands_toriel > 2) {
                        save.flag.b.true_reset = true;
                     } else if (save.data.n.state_wastelands_toriel === 2) {
                        torielOverride();
                     }
                     renderer.detach('main', overlay);
                     save.data.n.plot = 14;
                     player.x = 230;
                     player.y = 240;
                     player.face = 'up';
                     if (save.data.n.state_wastelands_toriel === 2) {
                        if (save.data.b.genocide) {
                           this.preset = characters.asriel;
                           this.position.y = 200;
                           this.face = 'down';
                           script('tick');
                           atlas.switch('dialoguerBottom');
                           await typer.text(...text.a_outlands.asriel1);
                           Promise.race([
                              events.on('teleport'),
                              this.walk(timer, 4, { y: 160 }).then(() => this.alpha.modulate(timer, 300, 0))
                           ]).then(() => {
                              renderer.detach('main', this);
                           });
                           await typer.text(...text.a_outlands.asriel1b);
                           atlas.switch(null);
                           game.movement = true;
                        } else {
                           game.movement = true;
                           renderer.detach('main', this);
                        }
                     } else {
                        this.face = 'down';
                        const feels = assets.music.toriel.instance(timer);
                        feels.gain.value /= 4;
                        feels.gain.modulate(timer, 300, feels.gain.value * 4);
                        events.on('teleport').then(async () => {
                           await feels.gain.modulate(timer, 300, 0);
                           feels.stop();
                           content.amToriel.unload();
                        });
                        atlas.switch('dialoguerBottom');
                        if (save.data.n.state_wastelands_toriel > 2) {
                           save.flag.b.true_reset = true;
                           const splashQueue = inventories.splashAssets.load();
                           await typer.text(
                              ...[ text.a_outlands.goodbye5a, text.a_outlands.goodbye5b ][save.data.n.state_wastelands_toriel - 3]
                           );
                           atlas.switch(null);
                           const overlay = new CosmosRectangle({
                              alpha: 0,
                              size: { x: 1000, y: 1000 },
                              position: { x: 160, y: 120 },
                              anchor: 0,
                              fill: 'black',
                              stroke: 'transparent'
                           });
                           renderer.attach('menu', overlay);
                           await Promise.all([
                              feels.gain.modulate(timer, 3000, feels.gain.value, feels.gain.value / 2, feels.gain.value / 2),
                              overlay.alpha.modulate(timer, 3000, 1).then(() => timer.pause(850))
                           ]);
                           atlas.switch('dialoguerBottom');
                           await typer.text(...text.a_outlands.exitfail1());
                           atlas.switch(null);
                           game.timer = false;
                           await Promise.all([ splashQueue, feels.gain.modulate(timer, 2000, 0) ]);
                           await script('splash', 'noteleport');
                           atlas.switch('dialoguerBottom');
                           await typer.text(...commonText.x_credits());
                           atlas.switch(null);
                           await timer.pause(1000);
                           await reload(!save.data.s.name);
                        } else {
                           await typer.text(...(save.data.b.oops ? text.a_outlands.goodbye1a : text.a_outlands.goodbye1));
                           atlas.switch(null);
                           const midpoint = player.y - (player.y - this.position.y) / 2;
                           await Promise.all([
                              walkHer(this, { x: 0, y: 3 }, pos => pos.y < midpoint - 0.5),
                              walkHer(player, { x: 0, y: -3 }, pos => pos.y > midpoint + 0.5)
                           ]);
                           this.position.y = midpoint - 0.5;
                           player.y = midpoint + 0.5;
                           const hugger = new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              position: player.position.value(),
                              resources: content.iocTorielHug
                           });
                           player.alpha.value = 0;
                           this.alpha.value = 0;
                           renderer.attach('main', hugger);
                           await timer.pause(60);
                           hugger.index = 1;
                           await timer.pause(120);
                           hugger.index = 2;
                           await timer.pause(4150);
                           keys.interactKey.active() && (await keys.interactKey.on('up'));
                           hugger.index = 1;
                           await timer.pause(120);
                           hugger.index = 0;
                           await timer.pause(850);
                           renderer.detach('main', hugger);
                           player.alpha.value = 1;
                           this.alpha.value = 1;
                           atlas.switch('dialoguerBottom');
                           if (save.data.b.oops) {
                              await typer.text(...text.a_outlands.goodbye3);
                           } else {
                              await typer.text(...text.a_outlands.goodbye2);
                           }
                        }
                        atlas.switch(null);
                        const speed = save.data.b.oops ? 4 : 3;
                        await Promise.race([
                           events.on('teleport').then(() => {
                              save.data.b.w_state_fightroom = true;
                           }),
                           walkHer(this, { x: -speed, y: 0 }, pos => pos.x > 180).then(async () => {
                              await walkHer(this, { x: 0, y: speed }, pos => pos.y < 240);
                              await walkHer(this, { x: -speed, y: 0 }, pos => pos.x > 100);
                              await timer.pause(450);
                              this.face = 'right';
                              await timer.pause(950);
                              if (!save.data.b.oops) {
                                 atlas.switch('dialoguerBottom');
                                 await typer.text(...text.a_outlands.goodbye4);
                                 atlas.switch(null);
                              }
                              await timer.pause(750);
                              game.movement = true;
                              await walkHer(this, { x: -speed, y: 0 }, pos => pos.x > 35);
                              await this.alpha.modulate(timer, 300, 0);
                           })
                        ]);
                        renderer.detach('main', this);
                     }
                  } else {
                     game.movement = true;
                     await Promise.race([
                        events.on('teleport'),
                        this.walk(timer, 4, { x: 360 }).then(() => this.alpha.modulate(timer, 300, 0))
                     ]);
                  }
                  renderer.detach('main', this);
               }
            }),
            'main'
         );
         break;
      }
      case 'w_toriel_living': {
         const roomState = (states.rooms.w_toriel_living ||= {});
         if (!roomState.active) {
            roomState.active = true;
            save.data.n.state_toriel_food === 2 && (save.data.n.state_toriel_food = 3);
            objectsByTag(tags => tags.includes('w_kitchenwall'))[0].objects[0].on('tick', function () {
               this.metadata.trigger = save.data.n.plot === 9;
            });
         }
         const chairAnim = instance('main', 'theOneAndOnlyChairiel')!.object.objects[0] as CosmosAnimation;
         if (toriCheck() || (save.data.n.plot === 9 && save.data.n.state_toriel_food === 3)) {
            chairAnim.reset().use(content.ionOChairielTalk);
            if (save.data.n.state_toriel_food === 3) {
               spawnBreakfast();
               if (save.data.n.plot < 9.1) {
                  save.data.n.plot = 9.1;
                  game.movement = false;
                  teleporter.movement = false;
                  const talker = talkerEngine('n1', chairAnim);
                  atlas.switch('dialoguerBottom');
                  await typer.text(...text.a_outlands.chair4);
                  talker.end();
                  atlas.switch(null);
                  game.movement = true;
               }
            }
         } else {
            chairAnim.reset().use(content.ionOChairiel);
            chairAnim.index = 5;
         }
         break;
      }
   }
   if (
      save.data.n.plot < 14 &&
      ((from === 'w_courtyard' && to === 'w_alley1') ||
         (from === 'w_alley1' && to === 'w_alley2') ||
         (from === 'w_alley2' && to === 'w_alley3') ||
         (from === 'w_alley3' && to === 'w_alley4'))
   ) {
      const impact = assets.sounds.impact.instance(timer);
      impact.rate.value = 1 / 3;
      events.on('teleport').then(() => {
         impact.gain.modulate(timer, 300, 0).then(() => {
            impact.stop();
         });
      });
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'w' && script('tick');
});

events.on('use', async key => {
   save.data.s.armor === 'spacesuit' || (items.of('spacesuit').value = 10);
   if (game.room === 'w_toriel_living' && save.data.n.plot < 10 && save.data.n.plot !== 9) {
      switch (key) {
         case 'pie':
         case 'pie2':
         case 'snails':
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands[`eat_${key === 'snails' ? 'snails' : 'pie'}`]);
            atlas.switch(null);
            game.movement = true;
            break;
      }
   } else if (game.room === 'w_party' && areaKills() < 13) {
      switch (key) {
         case 'soda':
         case 'steak':
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w2_steaksalesman'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            await typer.text(...text.a_outlands[`eat_${key}`]);
            atlas.switch(null);
            talker.end();
            game.movement = true;
            break;
      }
   }
});

events.on('use', {
   priority: -Number.MAX_SAFE_INTEGER,
   async listener (key) {
      switch (key) {
         case 'starbertA':
         case 'starbertB':
            // case 'starbertC':
            if (!battler.active) {
               let done = false;
               const view = new CosmosAnimation({
                  anchor: 0,
                  resources: key === 'starbertA' ? content.ieStarbertA : content.ieStarbertB,
                  objects:
                     key === 'starbertB' && !save.data.b.stargum
                        ? [
                             new CosmosSprite({ anchor: 0, frames: [ content.ieStarbertBGum ] }).on('tick', function () {
                                this.alpha.value = view.index === 0 ? 1 : 0;
                             })
                          ]
                        : []
               });
               const overlay = new CosmosObject({
                  objects: [
                     new CosmosRectangle({
                        alpha: 0.7,
                        fill: 'black',
                        size: { x: 320, y: 240 }
                     }),
                     new CosmosRectangle({
                        fill: 'white',
                        size: { x: 89, y: 206 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        objects: [ view ]
                     })
                  ]
               });
               renderer.attach('menu', overlay);
               const leftListener = () => {
                  assets.sounds.menu.instance(timer);
                  if (--view.index === -1) {
                     view.index = view.frames.length - 1;
                  }
               };
               const rightListener = () => {
                  assets.sounds.menu.instance(timer);
                  if (++view.index === view.frames.length) {
                     view.index = 0;
                  }
               };
               keys.leftKey.on('down', leftListener);
               keys.rightKey.on('down', rightListener);
               keys.specialKey.on('down').then(() => {
                  done = true;
               });
               await timer.when(() => done);
               keys.leftKey.off('down', leftListener);
               keys.rightKey.off('down', rightListener);
               renderer.detach('menu', overlay);
               if (key === 'starbertB' && !save.data.b.stargum) {
                  await dialogue('auto', ...text.a_outlands.stargum1);
                  if (choicer.result === 0) {
                     save.data.b.stargum = true;
                     await dialogue('auto', ...text.a_outlands.stargum3);
                     await use('stargum', Infinity);
                  } else {
                     await dialogue('auto', ...text.a_outlands.stargum2);
                  }
               }
            } else if (key === 'starbertB' && !save.data.b.stargum) {
               if (choicer.result === 0) {
                  save.data.b.stargum = true;
                  await use('stargum', Infinity);
               } else {
                  await dialogue('battlerAdvancedText', ...text.a_outlands.stargum2);
               }
            }
            break;
      }
   }
});

CosmosUtils.status(`LOAD MODULE: OUTLANDS AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
