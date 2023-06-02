import './bootstrap';

export * from './index-supplemental';

import Pathfinding, { DiagonalMovement, Grid, Heuristic, JumpPointFinder } from 'pathfinding';
import { AdvancedBloomFilter, CRTFilter, GlitchFilter, GlowFilter, MotionBlurFilter } from 'pixi-filters';
import { BLEND_MODES, BaseTexture, Container, DisplacementFilter, Sprite, WRAP_MODES } from 'pixi.js';
import assets from '../assets';
import { OutertaleGroup } from '../classes';
import { characters, epicgamer, goatbro, madfish, runEncounter } from '../common';
import commonGroups from '../common/groups';
import commonText from '../common/text';
import content, { inventories } from '../content';
import { atlas, audio, events, game, keys, random, renderer, rooms, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosBitmap,
   CosmosCharacter,
   CosmosColor,
   CosmosDirection,
   CosmosHitbox,
   CosmosImage,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueRandom
} from '../engine';
import {
   battler,
   character,
   choicer,
   dialogue,
   fader,
   hash,
   header,
   instance,
   isolate,
   isolates,
   menuBox,
   oops,
   player,
   quickshadow,
   shake,
   shopper,
   sineWaver,
   talkFilter,
   teleport,
   teleporter,
   trivia,
   world
} from '../mantle';
import save from '../save';
import groups from './groups';
import patterns from './patterns';
import { napstamusic, puzzleTarget, script, shops, states, tripper } from './index-supplemental';
import text from './text';

export const asgoreAssets = new CosmosInventory(
   content.iocAsgoreUp,
   content.iocAsgoreUpTalk,
   content.iocAsgoreDown,
   content.iocAsgoreDownTalk,
   content.iocAsgoreLeft,
   content.iocAsgoreLeftTalk,
   content.iocAsgoreRight,
   content.iocAsgoreRightTalk,
   inventories.idcAsgore,
   content.avAsgore,
   content.amPrebattle
);

const dark01tint = 85 / 255;
const dark02tint = 119 / 255;

export function alphaCheck (this: CosmosObject) {
   switch (game.room) {
      case 'w_toriel_asriel':
         for (const obj of renderer.layers.below.objects) {
            if (obj.metadata.darkie) {
               this.tint = tintCalc(0, dark01tint);
               return;
            }
         }
         this.tint = 0xffffff;
         break;
      case 'f_prechase':
         if (this.x < 900) {
            this.tint = tintCalc(0, dark01tint);
         } else {
            this.tint = tintCalc((this.x - 900) / 220, dark01tint);
         }
         break;
      case 'f_abyss':
         if (this.x > 220) {
            this.tint = tintCalc(0, dark01tint);
         } else {
            this.tint = tintCalc(1 - this.x / 220, dark01tint);
         }
         break;
      case 'f_muffet':
         if (this.x < 820) {
            this.tint = tintCalc(0, dark01tint);
         } else {
            this.tint = tintCalc((this.x - 820) / 220, dark01tint);
         }
         break;
      case 'f_dummy':
         if (this.y < 200) {
            this.tint = tintCalc(0, dark02tint);
         } else {
            this.tint = tintCalc((this.y - 200) / 40, dark02tint);
         }
         break;
      case 'f_village':
         if (this.y < 0) {
            this.tint = tintCalc(0, dark02tint);
         } else {
            this.tint = tintCalc(this.y / 60, dark02tint);
         }
         break;
      case 'f_battle':
         if (this.x < 180) {
            this.tint = tintCalc(0, dark01tint);
         } else {
            this.tint = tintCalc((this.x - 180) / 160, dark01tint);
         }
         break;
      case 'a_hub1':
         if (world.genocide) {
            const pZed = 120;
            const pArr = [ 280, 260, 260, 240, 220, 200, 200, 180, 180, 160, 160, 160, 140 ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.y - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr);
            const pRel = Math.min(Math.max(this.x - pVal, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub2':
         if (world.genocide) {
            const pZed = 60;
            const pArr = [
               260, 240, 220, 220, 200, 200, 200, 180, 180, 180, 180, 180, 180, 180, 180, 200, 200, 200, 220, 220, 240,
               260
            ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.x - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr);
            const pRel = Math.min(Math.max(this.y - pVal, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_lookout':
         if (world.genocide) {
            if (this.x < 80) {
               this.tint = tintCalc(1 - Math.min(player.position.x - 60, player.position.y - 20) / 40, 0.6);
            } else if (this.x > 260) {
               this.tint = tintCalc(1 - Math.min(280 - player.position.x, player.position.y - 20) / 40, 0.6);
            } else {
               if (this.y > 60) {
                  this.tint = tintCalc(0, 0.6);
               } else {
                  this.tint = tintCalc((60 - this.y) / 40, 0.6);
               }
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub3':
         if (world.genocide) {
            const pZed = 120;
            const pArr = [ 40, 60, 60, 80, 100, 120, 120, 140, 140, 160, 160, 160, 180 ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.y - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr);
            const pRel = Math.min(Math.max(pVal - this.x, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub4':
         if (world.genocide) {
            if (this.y < 260) {
               const pZed = 140;
               const pArr = [ 340, 320, 320, 300, 300, 280, 260 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.y - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr);
               const pRel = Math.min(Math.max(pVal - this.x, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            } else {
               const pZed = 120;
               const pArr = [ 340, 320, 320, 320, 300, 300, 280, 260 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.x - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr);
               const pRel = Math.min(Math.max(pVal - this.y, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub5':
         if (world.genocide) {
            if (this.y < 240) {
               const pZed = 160;
               const pArr = [ 120, 140, 140, 160, 180, 200 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.y - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr);
               const pRel = Math.min(Math.max(pVal - this.x, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            } else {
               const pZed = 200;
               const pArr = [ 260, 280, 300, 300, 320, 320, 320, 340 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.x - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr);
               const pRel = Math.min(Math.max(pVal - this.y, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
   }
}

export function tintCalc (value: number, target: number) {
   const trueValue = Math.min(Math.max(value, 0), 1);
   if (trueValue === 1) {
      return 0xffffff;
   } else {
      const mult = CosmosMath.remap(Math.max(trueValue, 0), target, 1);
      return CosmosBitmap.color2hex([ 255 * mult, 255 * mult, 255 * mult, 255 ]);
   }
}

epicgamer
   .on('tick', function () {
      if (world.genocide && save.data.n.plot > 42) {
         this.preset = characters.kiddSlave;
      } else if (!this.metadata.holdover && save.data.n.state_foundry_muffet === 1 && save.data.n.plot > 38.01) {
         this.preset = characters.kiddSad;
      } else {
         this.preset = characters.kidd;
      }
      const roomMeta = rooms.of(game.room).metadata;
      if (roomMeta.dark03) {
         this.tint = world.genocide ? assets.tints.dark03 : void 0;
      } else if (roomMeta.dark02) {
         this.tint = assets.tints.dark02;
      } else if (roomMeta.dark01) {
         this.tint = assets.tints.dark01;
      } else {
         this.tint = void 0;
      }
   })
   .on(
      'tick',
      (() => {
         let queue = (epicgamer.metadata.queue ??= []) as {
            face: CosmosDirection;
            position: CosmosPointSimple;
            room: string;
         }[];
         let lastSpot = { x: NaN, y: NaN };
         let lastRoom = '' as string;
         const reposition = () => {
            const f =
               epicgamer.metadata.repositionFace ||
               (game.room !== lastRoom ? player.metadata.tpface || player.face : player.face);
            epicgamer.metadata.repositionFace = void 0;
            if (!epicgamer.metadata.override) {
               const distance = world.goatbro ? 42 : 21;
               epicgamer.position = player.position.add(
                  f === 'left' ? distance : f === 'right' ? -distance : 0,
                  f === 'up' ? distance : f === 'down' ? -distance : 0
               );
            }
            queue = CosmosUtils.populate(world.goatbro ? 14 : 7, index => ({
               face: f,
               room: game.room,
               position: epicgamer.position.endpoint(player.position.angleFrom(epicgamer.position), index * 3).value()
            }));
            lastSpot = { x: NaN, y: NaN };
            lastRoom = game.room;
         };
         return function () {
            if (game.room !== lastRoom || this.metadata.reposition) {
               this.metadata.reposition = false;
               reposition();
            } else if (lastSpot.x !== player.position.x || lastSpot.y !== player.position.y) {
               lastSpot = player.position.value();
               const newSpot = queue.splice(0, 1)[0];
               if (!this.metadata.override) {
                  if (newSpot.room === game.room) {
                     this.face = newSpot.face;
                     this.position.x = newSpot.position.x;
                     this.position.y = newSpot.position.y;
                     this.alpha.value === 0 && this.alpha.modulate(timer, 300, 1);
                  } else {
                     this.alpha.modulate(timer, 0, 0);
                  }
               }
               queue.push({ face: player.face, position: lastSpot, room: game.room });
               if (!this.metadata.override && !this.talk) {
                  for (const sprite of Object.values(this.sprites)) {
                     sprite.duration = 5;
                  }
                  this.sprite.enable();
               }
            } else if (!this.metadata.override && !this.talk) {
               this.sprite.reset();
            }
         };
      })()
   )
   .on('tick', alphaCheck);

goatbro
   .on('tick', function () {
      const roomMeta = rooms.of(game.room).metadata;
      if (roomMeta.dark03) {
         this.tint = world.genocide ? assets.tints.dark03 : void 0;
      } else if (roomMeta.dark02) {
         this.tint = assets.tints.dark02;
      } else if (roomMeta.dark01) {
         this.tint = assets.tints.dark01;
      } else {
         this.tint = void 0;
      }
   })
   .on(
      'tick',
      (() => {
         let queue = [] as { face: CosmosDirection; position: CosmosPointSimple; room: string }[];
         let lastSpot = { x: NaN, y: NaN };
         let lastRoom = '' as string;
         const reposition = () => {
            const f =
               goatbro.metadata.repositionFace ||
               (game.room !== lastRoom ? player.metadata.tpface || player.face : player.face);
            goatbro.metadata.repositionFace = void 0;
            if (!goatbro.metadata.override) {
               goatbro.position = player.position.add(
                  f === 'left' ? 21 : f === 'right' ? -21 : 0,
                  f === 'up' ? 21 : f === 'down' ? -21 : 0
               );
            }
            queue = CosmosUtils.populate(7, index => ({
               face: f,
               room: game.room,
               position: goatbro.position.endpoint(player.position.angleFrom(goatbro.position), index * 3).value()
            }));
            lastSpot = { x: NaN, y: NaN };
            lastRoom = game.room;
            goatbro.metadata.queue = queue;
         };
         return function () {
            if (game.room !== lastRoom || this.metadata.reposition) {
               this.metadata.reposition = false;
               reposition();
            } else if (lastSpot.x !== player.position.x || lastSpot.y !== player.position.y) {
               lastSpot = player.position.value();
               const newSpot = queue.splice(0, 1)[0];
               if (!this.metadata.override) {
                  if (newSpot.room === game.room) {
                     this.face = newSpot.face;
                     this.position.x = newSpot.position.x;
                     this.position.y = newSpot.position.y;
                     this.alpha.value === 0 && this.alpha.modulate(timer, 300, 1);
                  } else {
                     this.alpha.modulate(timer, 0, 0);
                  }
               }
               queue.push({ face: player.face, position: lastSpot, room: game.room });
               if (!this.metadata.override && !this.talk && !this.metadata.static) {
                  for (const sprite of Object.values(this.sprites)) {
                     sprite.duration = 5;
                  }
                  this.sprite.enable();
               }
            } else if (!this.metadata.override && !this.talk && !this.metadata.static) {
               this.sprite.reset();
            }
         };
      })()
   )
   .on('tick', alphaCheck);

madfish
   .on('tick', function () {
      if (save.data.n.state_starton_papyrus === 1) {
         this.preset = characters.undyneStoic;
      } else {
         this.preset = characters.undyne;
      }
      const roomMeta = rooms.of(game.room).metadata;
      if (roomMeta.dark03) {
         this.tint = world.genocide ? assets.tints.dark03 : void 0;
      } else if (roomMeta.dark02) {
         this.tint = assets.tints.dark02;
      } else if (roomMeta.dark01) {
         this.tint = assets.tints.dark01;
      } else {
         this.tint = void 0;
      }
   })
   .on(
      'tick',
      (() => {
         let spawned = false;
         let lastRoom = '' as string;
         let roomTicks = 0;
         const min = new CosmosPoint();
         const max = new CosmosPoint();
         const s = (madfish.metadata.s ??= { grid: void 0, path: [], pathindex: 0 });
         const tileSize = 5;
         const pathfinder = JumpPointFinder({ heuristic: Heuristic.euclidean });
         const computeGrid = () => {
            min.set(new CosmosPoint(renderer.region[0]).subtract(160, 120));
            max.set(new CosmosPoint(renderer.region[1]).add(160, 120));
            const sizeX = max.x - min.x;
            const sizeY = max.y - min.y;
            const columns = Math.ceil(sizeX / tileSize);
            const rows = Math.ceil(sizeY / tileSize);
            const OGpos = madfish.position.value();
            const barriers = [
               ...renderer.calculate('below', hitbox => hitbox.metadata.barrier === true),
               ...renderer.calculate('main', hitbox => hitbox.metadata.barrier === true)
            ];
            renderer.calculate('main', hbox => hbox === madfish);
            s.grid = new Grid(
               CosmosUtils.populate(rows, indexY =>
                  CosmosUtils.populate(columns, indexX => {
                     madfish.position.set(min.add(indexX * tileSize, indexY * tileSize).subtract(tileSize / 2));
                     // @ts-expect-error
                     madfish.$hitbox.vertices = [
                        madfish.position.add(-8, -4),
                        madfish.position.add(8, -4),
                        madfish.position.add(8, 0),
                        madfish.position.add(-8, 0)
                     ];
                     return renderer.detect(void 0, madfish, ...barriers).length > 0 ? 1 : 0;
                  })
               )
            );
            madfish.position.set(OGpos);
         };
         let checked = [] as import('pathfinding').Node[];
         const nearestOpenTile = (thing: CosmosPoint) => {
            checked = [];
            const tile = thing
               .round(1 / tileSize)
               .subtract(min)
               .divide(tileSize)
               .floor();
            let rootNode = null as Pathfinding.Node | null;
            try {
               rootNode = s.grid!.getNodeAt(tile.x, tile.y);
            } catch {}
            if (typeof rootNode?.walkable === 'boolean') {
               return CosmosUtils.chain<Pathfinding.Node, CosmosPointSimple | null>(rootNode, (node, next) => {
                  if (node.walkable) {
                     return node;
                  } else {
                     checked.push(node);
                     const neighbors = s.grid!.getNeighbors(node, DiagonalMovement.Always);
                     for (const neighbor of neighbors) {
                        const result = checked.includes(neighbor) ? null : next(neighbor);
                        if (result) {
                           return result;
                        }
                     }
                     return null;
                  }
               });
            }
         };
         const computePath = () => {
            const selfPos = nearestOpenTile(madfish.position);
            const playerPos = nearestOpenTile(player.position);
            if (selfPos && playerPos) {
               s.path = pathfinder
                  .findPath(selfPos.x, selfPos.y, playerPos.x, playerPos.y, s.grid!.clone())
                  .map(([ x, y ]) => ({
                     x: x * tileSize + min.x,
                     y: y * tileSize + min.y
                  }));
               s.pathindex = s.path.indexOf(
                  s.path
                     .slice()
                     .sort(
                        (pos1, pos2) =>
                           (pos1.x - madfish.position.x) ** 2 +
                           (pos1.y - madfish.position.y) ** 2 -
                           ((pos2.x - madfish.position.x) ** 2 + (pos2.y - madfish.position.y) ** 2)
                     )[0]
               );
            } else {
               s.path = [ player.position.value() ];
               s.pathindex = 0;
            }
         };
         const reposition = () => {
            computeGrid();
            renderer.detach('main', notifier);
            madfish.alpha.value = 0;
            if (madfish.metadata.firstfight) {
               madfish.position.set(player.position.subtract(20, 0));
               madfish.face = 'right';
               madfish.metadata.firstfight = false;
            } else {
               const [ room, face, x, y ] = save.data.s.chasecheckpoint.split(':') as [
                  string,
                  CosmosDirection,
                  string,
                  string
               ];
               madfish.position.set(+x, +y);
               madfish.face = face;
            }
            madfish.alpha.modulate(timer, 300, 1);
            lastRoom = game.room;
            roomTicks = 0;
         };
         const chaseRate = 4;
         const notifier = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibuNotify,
            metadata: { follow: null as CosmosObject | null }
         }).on('tick', function () {
            if (this.metadata.follow) {
               this.position.set(this.metadata.follow.position.subtract(0, 51));
            }
         });
         return async function () {
            if (!spawned) {
               spawned = true;
               if (save.data.n.plot === 47.2) {
                  this.position.set(save.data.n.undyne_chaseX, save.data.n.undyne_chaseY);
               }
               computeGrid();
               computePath();
            }
            if (game.room !== lastRoom || this.metadata.reposition) {
               reposition();
               this.metadata.reposition = false;
            } else if (
               (game.movement ||
                  [ 'save', 'dialoguerBottom', 'dialoguerTop', 'sidebarCellBox' ].includes(atlas.target!)) &&
               !this.metadata.battle
            ) {
               if (roomTicks < 20) {
                  this.move({ x: 0, y: 0 }, renderer, 'main');
               } else if (roomTicks === 20) {
                  assets.sounds.notify.instance(timer);
                  notifier.priority.value = this.position.y;
                  notifier.metadata.follow = this;
                  renderer.attach('main', notifier);
               } else if (roomTicks > 29) {
                  if (roomTicks === 30) {
                     renderer.detach('main', notifier);
                  }
                  const electro = game.room === 'f_battle' && this.position.x > 1200 && this.position.x < 1320;
                  for (const sprite of Object.values(this.sprites)) {
                     sprite.duration = electro ? 6 : 5;
                  }
                  const pos = this.position.clone();
                  const extent = pos.extentOf(player.position);
                  if (extent > 25 && extent < 50) {
                     save.data.s.chasecheckpoint = `${game.room}:${player.face}:${player.position.x}:${player.position.y}`;
                  }
                  if (extent <= 25) {
                     function resumeMoosic () {
                        const score = rooms.of(game.room).score;
                        const daemon = typeof score.music === 'string' ? audio.music.of(score.music) : null;
                        game.music = daemon?.instance(timer) ?? null;
                        game.music?.gain.modulate(timer, 300 - game.music.gain.value * 300, score.gain);
                        audio.musicFilter.value = score.filter;
                        game.music &&
                           (game.music.rate.value =
                              score.rate * (world.population > 0 ? 1 : world.bullied ? 0.8 : 0.5));
                        audio.musicReverb.value = score.reverb;
                     }
                     game.interact = false;
                     if ([ 'dialoguerBottom', 'dialoguerTop' ].includes(atlas.target!)) {
                        typer.text('');
                     }
                     atlas.switch(null);
                     this.metadata.battle = true;
                     game.movement = false;
                     timer.pause(100).then(() => (game.interact = true));
                     let tunnuhFun = false;
                     await battler.encounter(player, groups.undyne, false);
                     if (save.data.n.plot === 48) {
                        game.music?.stop();
                     }
                     if (save.data.n.state_foundry_undyne === 2) {
                        save.data.s.state_foundry_deathroom = game.room;
                        [ 'f_bird', 'f_snail', 'f_tunnel' ].includes(game.room) || (await timer.pause(1150));
                        switch (game.room) {
                           case 'f_asriel': {
                              await dialogue('auto', ...text.a_foundry.deathReaction.f_asriel);
                              break;
                           }
                           case 'f_tunnel': {
                              tunnuhFun = true;
                              resumeMoosic();
                              game.movement = true;
                              await timer.when(() => game.room === 'f_dummy' && game.movement);
                              game.movement = false;
                              game.music!.gain.modulate(timer, 0, 0);
                              await timer.pause(1150);
                           }
                           case 'f_dummy': {
                              const inst = instance('main', 'f_npc86');
                              if (inst) {
                                 const ogx = player.position.clamp(...renderer.region);
                                 const cam = new CosmosObject({ position: ogx });
                                 if (player.position.y > 200) {
                                    game.camera = cam;
                                    await cam.position.modulate(timer, 1000, { y: 200 });
                                 }
                                 await inst.talk('a', talkFilter(), 'auto', ...text.a_foundry.deathReaction.f_dummy);
                                 if (player.position.y > 200) {
                                    await cam.position.modulate(timer, 1000, ogx);
                                    game.camera = player;
                                 }
                              }
                              break;
                           }
                           case 'f_village': {
                              const inst = instance('main', 'f_temmie4');
                              if (inst) {
                                 await inst.talk('a', talkFilter(), 'auto', ...text.a_foundry.deathReaction.f_village);
                              }
                              break;
                           }
                           case 'f_hub': {
                              const inst = instance('main', 'f_clamgirl');
                              if (inst) {
                                 const anim = inst.object.objects.filter(
                                    obj => obj instanceof CosmosAnimation
                                 )[0] as CosmosAnimation;
                                 anim.use(content.ionFClamgirl2);
                                 await inst.talk('a', talkFilter(), 'auto', ...text.a_foundry.deathReaction.f_hub);
                                 anim.use(content.ionFClamgirl1);
                              }
                              break;
                           }
                           case 'f_bird': {
                              const bird = new CosmosHitbox({
                                 anchor: 0,
                                 size: { x: 20, y: 20 },
                                 position: { x: 1320, y: 80 },
                                 metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'birdcheck' ] },
                                 objects: [
                                    new CosmosAnimation({
                                       anchor: { x: 0, y: 1 },
                                       active: true,
                                       resources: content.ionFBirdFly
                                    })
                                 ]
                              });
                              renderer.attach('main', bird);
                              Promise.race([ events.on('teleport'), bird.position.step(timer, 2, { x: 1100 }) ]).then(
                                 () => {
                                    game.room === 'f_bird' && renderer.detach('main', bird);
                                 }
                              );
                              await timer.pause(1150);
                              await dialogue('dialoguerBottom', ...text.a_foundry.deathReaction.f_bird);
                              break;
                           }
                           case 'f_undyne':
                              const inst = instance('main', 'f_dummynpc');
                              if (inst) {
                                 await inst.talk('a', talkFilter(), 'auto', ...text.a_foundry.deathReaction.f_undyne);
                              }
                              break;
                           case 'f_blooky': {
                              const inst1 = instance('main', 'f_snail1');
                              const inst2 = instance('main', 'f_snail2');
                              if (inst1 && inst2) {
                                 let t = 0;
                                 const ogx = player.position.clamp(...renderer.region);
                                 const cam = new CosmosObject({ position: ogx });
                                 if (player.position.x > 160) {
                                    game.camera = cam;
                                    await cam.position.modulate(timer, 1000, { x: 160 });
                                 }
                                 for (const line of text.a_foundry.deathReaction.f_blooky) {
                                    await [ inst1, inst2 ][t].talk('a', talkFilter(), 'auto', line);
                                    t = [ 1, 0 ][t];
                                 }
                                 if (player.position.x > 160) {
                                    await cam.position.modulate(timer, 1000, ogx);
                                    game.camera = player;
                                 }
                              }
                              break;
                           }
                           case 'f_snail': {
                              await timer.pause(650);
                              const snail = new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: player.position.subtract(0, 60).clamp({}, { x: 290 }),
                                 scale: { x: 0, y: 2 },
                                 resources: content.iooFTronsnail2
                              });
                              renderer.attach('main', snail);
                              snail.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 });
                              await timer.pause(1150);
                              speech.targets.add(snail);
                              await dialogue('auto', ...text.a_foundry.deathReaction.f_snail());
                              speech.targets.delete(snail);
                              await timer.pause(1150);
                              await snail.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              renderer.detach('main', snail);
                              break;
                           }
                           case 'f_napstablook':
                              await dialogue('auto', ...text.a_foundry.deathReaction.f_napstablook);
                              break;
                        }
                        if (save.data.b.f_state_oopsprimer) {
                           await dialogue('auto', ...text.a_foundry.truetext.undyne1());
                        }
                     }
                     if (save.data.n.plot === 48) {
                        if (tunnuhFun) {
                           game.music!.gain.value = world.level;
                        } else {
                           resumeMoosic();
                        }
                        game.menu = true;
                     }
                     game.movement = true;
                     this.metadata.battle = false;
                     this.metadata.reposition = true;
                  } else {
                     roomTicks % 10 === 1 && computePath();
                     let target = player.position.value();
                     const modRate = electro ? chaseRate * (5 / 8) : chaseRate;
                     if (extent > 40 && s.pathindex < s.path.length) {
                        target = s.path[s.pathindex] ?? target;
                     }
                     const diffX = target.x - pos.x;
                     const diffY = target.y - pos.y;
                     pos.x += Math.min(Math.max(diffX, -modRate), modRate);
                     pos.y += Math.min(Math.max(diffY, -modRate), modRate);
                     if (extent > 40 && pos.x === target.x && pos.y === target.y && s.pathindex < s.path.length - 1) {
                        const subtarget = s.path[++s.pathindex];
                        const submodRateX = modRate - Math.abs(diffX);
                        const submodRateY = modRate - Math.abs(diffY);
                        pos.x += Math.min(Math.max(subtarget.x - pos.x, -submodRateX), submodRateX);
                        pos.y += Math.min(Math.max(subtarget.y - pos.y, -submodRateY), submodRateY);
                     }
                     const posDiff = pos.subtract(this.position.value());
                     this.position.set(pos);
                     this.face = CosmosMath.cardinal(this.position.angleTo(player));
                     if (posDiff.x === 0 && posDiff.y === 0) {
                        this.move({ x: 0, y: 0 }, renderer, 'main');
                     } else {
                        this.sprite.enable();
                     }
                     save.data.n.undyne_chaseX = this.position.x;
                     save.data.n.undyne_chaseY = this.position.y;
                  }
               }
               roomTicks++;
            }
         };
      })()
   )
   .on('tick', alphaCheck)
   .on('render', async function () {
      if (!this.metadata.battle) {
         if (this.alpha.value > 0 && this.sprite.active && this.sprite.index % 2 === 1 && this.sprite.step === 0) {
            assets.sounds.stomp.instance(timer) as any;
            if (game.room === 'f_battle' && this.position.x > 1200 && this.position.x < 1320) {
               assets.sounds.noise.instance(timer).rate.value = 1.25;
               const filter = new GlowFilter({ color: 0xffffff });
               const filters = (this.sprite.container.filters ??= []);
               filters?.push(filter);
               const mult = new CosmosValue(1);
               const listener = () => {
                  filter.innerStrength = mult.value;
                  filter.outerStrength = mult.value * 2;
               };
               this.on('tick', listener);
               await mult.modulate(timer, 500, 0, 0);
               this.off('tick', listener);
               filters?.splice(filters.indexOf(filter), 1);
            }
         }
      }
   });

events.on('init-overworld', () => {
   if (world.madfish) {
      game.menu = false;
      events.on('teleport').then(async () => {
         game.music = assets.music.undynefast.instance(timer);
         game.music.gain.value = 0;
         game.music.gain.modulate(timer, 1000, assets.music.undynefast.gain);
      });
   }
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         if (args[0] === 'tortoise' || args[0] === 'tem') {
            shopper.open(shops[args[0]], args[1] as CosmosDirection, +args[2], +args[3]);
         }
         break;
      case 'foundry':
         script(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'f') {
            trivia(...CosmosUtils.provide(text.a_foundry.trivia[args[0] as keyof typeof text.a_foundry.trivia]));
         }
         break;
      case 'teleport':
         save.data.s.chasecheckpoint = args.join(':');
         break;
   }
});

events.on('step', () => {
   if (game.movement && save.data.n.plot !== 47.2 && !(world.goatbro && world.epicgamer)) {
      switch (game.room) {
         case 'f_puzzle1':
         case 'f_puzzle2':
         case 'f_story1':
         case 'f_lobby':
         case 'f_telescope':
         case 'f_stand':
         case 'f_abyss':
         case 'f_puzzle3':
         case 'f_story2':
         case 'f_pacing':
            return runEncounter(
               (save.data.n.kills_foundry + save.data.n.bully_foundry) / 9,
               (() => {
                  if (game.room === 'f_puzzle1') {
                     return save.data.n.plot < 36 ? 0 : 1;
                  } else if (game.room === 'f_puzzle2') {
                     return save.data.n.plot < 37 ? 0 : 1;
                  } else if (game.room === 'f_puzzle3') {
                     return save.data.n.plot < 45 ? 0 : 1;
                  } else if (game.room === 'f_story1') {
                     return world.genocide && save.data.n.plot < 37.1 ? 0 : 1;
                  } else if (game.room === 'f_abyss') {
                     return world.genocide && save.data.n.plot < 38.2 ? 0 : 1;
                  } else {
                     return 1;
                  }
               })(),
               [
                  [ commonGroups.moldsmal, 3 ],
                  [ groups.woshua, 4 ],
                  [ groups.moldsmalMoldbygg, 4 ],
                  [ groups.woshuaMoldbygg, 5 ],
                  ...(!save.data.b.spared_radtile && !save.data.b.killed_radtile && !save.data.b.fled_radtile
                     ? [ [ groups.radtile, 5 ] as [OutertaleGroup, number] ]
                     : [])
               ]
            );
      }
   }
});

events.on('teleport', async (from, to) => {
   const roomState = states.rooms[to] || (states.rooms[to] = {});
   if (!roomState.steamgap) {
      roomState.steamgap = [
         ...new Set(
            ((instance('below', 'steamgap')?.object.objects ?? []) as CosmosHitbox[]).flatMap(hitbox => {
               const size = hitbox.size.value();
               const position = hitbox.position.value();
               if (size.x < 0) {
                  size.x *= -1;
                  position.x -= size.x;
               }
               if (size.y < 0) {
                  size.y *= -1;
                  position.y -= size.y;
               }
               return CosmosUtils.populate(size.x / 20, x =>
                  CosmosUtils.populate(size.y / 20, y => `${position.x + x * 20}:${position.y + y * 20}`)
               ).flat();
            })
         )
      ].map(key => ({ x: +key.split(':')[0], y: +key.split(':')[1] }));
   }
   switch (to) {
      case 'f_sans':
         if (world.genocide || world.population < 6) {
            instance('main', 'f_echodude')?.destroy();
         }
         if (!roomState.spawnd) {
            roomState.spawnd = true;
            if (save.data.n.plot < 34 && !world.dead_skeleton && save.data.n.kills_starton < 12) {
               roomState.sand = character('sans', characters.sans, { x: 240, y: 100 }, 'down', {
                  anchor: { x: 0, y: 1 },
                  size: { x: 20, y: 10 },
                  metadata: { interact: true, barrier: true, name: 'foundry', args: [ 'spookydate' ] }
               }).on('tick', function () {
                  if (game.room !== 'f_sans') {
                     renderer.detach('main', this);
                     roomState.spawnd = false;
                  }
               });
            }
         }
         break;
      case 'f_corridor':
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 34) {
               let hover = false;
               const time = timer.value;
               const fishShake = new CosmosValue();
               const fishPosition = new CosmosPoint();
               const alphaI = 0.4;
               const alphaII = 0.6;
               const undyneLoader = content.amUndyne.load();
               const stompLoader = content.asStomp.load();
               await timer.when(() => player.position.x > 419 && game.room === 'f_corridor');
               const fish = character('undyneArmor', characters.undyneArmor, { x: 420, y: 80 }, 'up', {
                  alpha: alphaI
               });
               fishPosition.x = fish.position.x;
               fishPosition.y = fish.position.y;
               const fishListener = () => {
                  fish.position = fishPosition.add(
                     (Math.random() - 0.5) * fishShake.value * 2,
                     (Math.random() - 0.5) * fishShake.value * 2
                  );
                  if (hover) {
                     fish.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                  }
               };
               fish.on('tick', fishListener);
               game.movement = false;
               save.data.n.plot = 34;
               const PX = player.position.x;
               const jetpackLoader = world.genocide ? void 0 : content.asJetpack.load();
               const undynepreLoader = content.amUndynepre.load();
               const spearLoader = world.genocide ? void 0 : content.iocUndyneDownArmorSpear.load();
               const kiddAssets = new CosmosInventory(inventories.idcKidd, content.avKidd);
               const kiddLoader = kiddAssets.load();
               const cam = new CosmosObject({ position: { x: PX, y: 240 } });
               game.camera = cam;
               const OGregion = renderer.region[0].y;
               if (!world.genocide) {
                  await timer.pause(850);
                  renderer.region[0].y = -1000;
                  cam.position.modulate(timer, 2000, { x: PX, y: 140 });
                  if (!world.dead_skeleton) {
                     const paps = character('papyrusStark', characters.papyrusStark, { x: 280, y: 80 }, 'right', {
                        alpha: alphaI
                     });
                     paps.walk(timer, 2, { x: 340 });
                     await Promise.all([ timer.pause(1350), undynepreLoader ]);
                     const premus = assets.music.undynepre.instance(timer);
                     premus.gain.value /= 8;
                     premus.gain.modulate(timer, 1000, premus.gain.value * 8);
                     await dialogue('dialoguerBottom', ...text.a_foundry.undyne1a);
                     timer.pause(350).then(() => {
                        fish.face = 'left';
                     });
                     await timer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_foundry.undyne1b);
                     paps.preset = characters.papyrusSpecial;
                     paps.face = 'right';
                     await dialogue('auto', ...text.a_foundry.undyne1c);
                     await timer.pause(1250);
                     paps.preset = characters.papyrusStark;
                     paps.face = 'down';
                     await dialogue('auto', ...text.a_foundry.undyne1d);
                     await timer.pause(850);
                     paps.face = 'down';
                     await timer.pause(450);
                     await dialogue('auto', ...text.a_foundry.undyne1e);
                     paps.face = 'right';
                     await dialogue('auto', ...text.a_foundry.undyne1f);
                     fish.face = 'up';
                     await timer.pause(750);
                     await dialogue('auto', ...text.a_foundry.undyne1g);
                     paps.walk(timer, 1, { x: 390 });
                     timer.pause(850).then(() => {
                        fish.face = 'left';
                     });
                     await dialogue('auto', ...text.a_foundry.undyne1h);
                     fish.face = 'left';
                     await timer.pause(2150);
                     await dialogue('auto', ...text.a_foundry.undyne1i);
                     paps.face = 'left';
                     await timer.pause(650);
                     paps.walk(timer, 2, { x: 200 }).then(() => {
                        renderer.detach('main', paps);
                     });
                     premus.gain.modulate(timer, 2000, 0).then(() => {
                        premus.stop();
                        content.amUndynepre.unload();
                     });
                     await timer.pause(850);
                  } else {
                     await timer.pause(5350);
                     fish.face = 'left';
                     await timer.pause(1350);
                     fish.face = 'right';
                     await timer.pause(2350);
                     fish.face = 'up';
                  }
                  await cam.position.modulate(timer, 2000, { x: PX, y: 240 });
                  renderer.region[0].y = OGregion;
                  game.camera = player;
                  const yopo = player.position.value();
                  game.menu = false;
                  game.movement = true;
                  await timer.when(() => player.position.x !== yopo.x || player.position.y !== yopo.y);
                  game.movement = false;
                  game.menu = true;
               }
               game.music!.gain.value = 0;
               game.camera = cam;
               renderer.region[0].y = -1000;
               const PX2 = player.position.x;
               await cam.position.modulate(timer, 400, { x: PX2, y: 140 });
               assets.sounds.notify.instance(timer);
               fish.face = 'down';
               await Promise.all([ undyneLoader, timer.pause(650) ]);
               const fishMusic = assets.music.undyne.instance(timer);
               await Promise.all([ stompLoader, timer.pause(650) ]);
               const stepSFX = () => {
                  if (fish.sprite.index % 2 === 1 && fish.sprite.step === 0) {
                     assets.sounds.stomp.instance(timer).gain.value = (Math.min(fish.position.y, 90) / 90) * 0.8;
                  }
               };
               fish.on('tick', stepSFX);
               characters.undyneArmor.walk.down.enable(6);
               while (fishPosition.y < 115) {
                  await renderer.on('tick');
                  fishPosition.y = Math.min(fishPosition.y + 1, 115);
               }
               characters.undyneArmor.walk.down.reset();
               fish.off('tick', stepSFX);
               await Promise.all([ jetpackLoader, timer.pause(world.genocide ? 850 : 1850) ]);
               if (world.genocide) {
                  header('x1').then(() => (goatbro.face = 'up'));
                  header('x2').then(() => (fish.face = 'left'));
                  header('x3').then(() => (fish.face = 'down'));
                  header('x4').then(() => (fish.face = 'up'));
                  header('x5').then(() => (fish.face = 'down'));
                  await dialogue('dialoguerBottom', ...text.a_foundry.madfish1());
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_foundry.madfish2);
               } else {
                  fish.preset = characters.undyneArmorJetpack;
                  assets.sounds.noise.instance(timer).gain.value = 0.5;
                  const flame = assets.sounds.jetpack.instance(timer);
                  flame.gain.value = 0.2;
                  await fishShake.modulate(timer, 350, 1);
                  hover = true;
                  timer.pause(400).then(() => {
                     fishShake.modulate(timer, 700, 0);
                  });
                  fish.alpha.modulate(timer, 800, alphaI, alphaII, alphaII);
                  await fishPosition.modulate(timer, 800, {}, { y: fishPosition.y - 10 }, { y: fishPosition.y - 10 });
                  await Promise.all([ timer.pause(1650), spearLoader ]);
                  fish.alpha.value = 0;
                  const spearFish = new CosmosAnimation({
                     active: true,
                     alpha: 0.7,
                     anchor: { x: 0, y: 1 },
                     resources: content.iocUndyneDownArmorSpear
                  }).on('tick', function () {
                     this.position = fish.position.clone();
                  });
                  renderer.attach('main', spearFish);
                  await timer.when(() => spearFish.index === 56);
                  renderer.detach('main', spearFish);
                  content.iocUndyneDownArmorSpear.unload();
                  fish.alpha.value = alphaII;
                  flame.stop();
                  assets.sounds.noise.instance(timer).gain.value = 0.5;
                  content.asJetpack.unload();
                  fish.alpha.modulate(timer, 1150, alphaI, alphaI);
                  await fishPosition.modulate(timer, 1150, fishPosition.value(), { y: fishPosition.y + 10 });
                  assets.sounds.stomp.instance(timer).gain.value = 0.65;
                  fish.preset = characters.undyneArmor;
                  shake(1, 500);
                  fishPosition.y = fish.position.y;
                  hover = false;
                  await timer.pause(1450);
                  fish.on('tick', stepSFX);
                  characters.undyneArmor.walk.down.enable(6);
                  while (fishPosition.y > 90) {
                     await renderer.on('tick');
                     fishPosition.y = Math.max(fishPosition.y - 1, 90);
                  }
                  characters.undyneArmor.walk.down.reset();
                  fish.off('tick', stepSFX);
               }
               timer.pause(1000).then(() => {
                  fishMusic.gain.modulate(timer, 5000, 0).then(() => {
                     fishMusic.stop();
                     content.amUndyne.unload();
                  });
               });
               await timer.pause(850);
               fish.face = 'up';
               await timer.pause(1150);
               fish.on('tick', stepSFX);
               characters.undyneArmor.walk.up.enable(4);
               while (fishPosition.y > 0) {
                  await renderer.on('tick');
                  fishPosition.y = Math.max(fishPosition.y - 2, 0);
               }
               characters.undyneArmor.walk.up.reset();
               fish.off('tick', stepSFX);
               content.asStomp.unload();
               renderer.detach('main', fish);
               await Promise.all([ kiddLoader, timer.pause(650) ]);
               const kidd = character('kidd', characters.kidd, { x: PX2 - 200, y: player.position.y }, 'left', {
                  key: 'kidd',
                  tint: assets.tints.dark01
               });
               timer.pause(1000).then(() => {
                  goatbro.face = 'left';
               });
               kidd.walk(timer, 4, { x: PX2 - (world.genocide ? 42 : 21) }).then(async () => {
                  characters.kidd.walk.down.enable(5);
                  kidd.face = 'down';
                  await timer.pause(650);
                  characters.kidd.walk.up.enable(5);
                  kidd.face = 'up';
                  await timer.pause(650);
                  characters.kidd.walk.left.enable(5);
                  kidd.face = 'left';
                  await timer.pause(1150);
                  kidd.face = 'right';
                  await dialogue('auto', ...text.a_foundry.undyne1j());
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.undyne1k());
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.undyne1l());
                  await kidd.walk(timer, 4, { x: PX2 + 130 });
                  let passed = false;
                  if (world.genocide) {
                     timer.pause(450).then(async () => {
                        goatbro.face = 'right';
                        await Promise.all([
                           timer.when(() => passed),
                           dialogue('auto', ...text.a_foundry.genotext.asriel31())
                        ]);
                        game.movement = true;
                        game.music!.gain.value = world.level;
                     });
                  }
                  await tripper(kidd, content.iocKiddDarkRightTrip);
                  passed = true;
                  if (!world.genocide) {
                     game.movement = true;
                     game.music!.gain.value = world.level;
                  }
                  await Promise.race([ events.on('teleport'), kidd.walk(timer, 4, { x: PX2 + 500 }) ]);
                  renderer.detach('main', kidd);
                  kiddAssets.unload();
               });
               await cam.position.modulate(timer, 2000, { x: PX2, y: 240 });
               renderer.region[0].y = OGregion;
               game.camera = player;
            }
         }
         break;
      case 'f_shyren':
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 40) {
               await timer.when(() => player.position.x > 260 && game.room === 'f_shyren');
               await battler.encounter(player, groups.shyren);
               save.data.n.plot = 40;
            }
         }
         break;
      case 'f_story1': {
         if (!world.dead_skeleton && save.data.n.plot_call < 5) {
            await timer.when(() => game.movement);
            game.movement = false;
            save.data.n.plot_call = 5;
            atlas.switch('dialoguerBottom');
            assets.sounds.phone.instance(timer);
            await typer.text(...text.a_foundry.plot_call.a);
            if (choicer.result === 0) {
               save.data.b.f_state_papclothes = true;
               await typer.text(...text.a_foundry.plot_call.a1);
            } else {
               await typer.text(...text.a_foundry.plot_call.a2);
            }
            assets.sounds.equip.instance(timer);
            await typer.text(commonText.c_endcall);
            atlas.switch(null);
            game.movement = true;
         }
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 37.1) {
               const asgoreLoader = asgoreAssets.load();
               await timer.when(() => player.position.y < 185 && game.room === 'f_story1');
               save.data.n.plot = 37.1;
               game.movement = false;
               game.music!.gain.value = 0;
               await Promise.all([ asgoreLoader, timer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 160, y: 60 }, 'down', {
                  key: 'asgore1'
               });
               const cam = new CosmosObject({ position: player.position.clone() });
               game.camera = cam;
               await cam.position.modulate(timer, 1500, { y: 120 });
               const jeebs = assets.music.prebattle.instance(timer);
               jeebs.rate.value = 0.25;
               jeebs.gain.value = 0.45;
               await timer.pause(650);
               await dialogue('auto', ...text.a_foundry.genotext.asriel32());
               assets.sounds.phase.instance(timer);
               gorey.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(timer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(timer, 100, 0.8);
               gorey.alpha.value = 0;
               await timer.pause(40);
               gorey.alpha.value = 1;
               await timer.pause(850);
               jeebs.gain.modulate(timer, 1000, 0).then(() => {
                  jeebs.stop();
               });
               await cam.position.modulate(timer, 1500, { y: player.position.y });
               game.camera = player;
               await dialogue('auto', ...text.a_foundry.genotext.asriel33());
               game.movement = true;
               game.music!.gain.value = world.level;
               renderer.detach('main', gorey);
               asgoreAssets.unload();
            }
            break;
         }
         break;
      }
      case 'f_abyss': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 38.2) {
               const asgoreLoader = asgoreAssets.load();
               await timer.when(() => player.position.x > 200 && game.room === 'f_abyss');
               game.movement = false;
               save.data.n.plot = 38.2;
               game.music!.gain.value = 0;
               const OGverb = audio.musicReverb.value;
               audio.musicReverb.value = 0;
               await Promise.all([ asgoreLoader, timer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 410, y: 290 }, 'left', {
                  key: 'asgore1',
                  tint: assets.tints.dark01
               });
               const cam = new CosmosObject({ position: player.position.clone() });
               game.camera = cam;
               await cam.position.modulate(timer, 1500, { x: 300 });
               const jeebs = assets.music.prebattle.instance(timer);
               jeebs.rate.value = 0.25;
               jeebs.gain.value = 0.45;
               await timer.pause(650);
               await dialogue('auto', ...text.a_foundry.genotext.asgoreMK1);
               assets.sounds.phase.instance(timer);
               gorey.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(timer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(timer, 100, 0.8);
               gorey.alpha.value = 0;
               await timer.pause(40);
               gorey.alpha.value = 1;
               await timer.pause(850);
               jeebs.gain.modulate(timer, 1000, 0).then(() => {
                  jeebs.stop();
               });
               await cam.position.modulate(timer, 1500, { x: player.position.x });
               game.camera = player;
               await dialogue('auto', ...text.a_foundry.genotext.asgoreMK2);
               game.movement = true;
               audio.musicReverb.value = OGverb;
               game.music!.gain.value = world.level;
               renderer.detach('main', gorey);
               asgoreAssets.unload();
            }
         }
         break;
      }
      case 'f_puzzle1':
      case 'f_puzzle2':
      case 'f_puzzle3': {
         if (puzzleTarget() <= save.data.n.plot) {
            const objects = [] as CosmosObject[];
            const [ beams, overlays ] = CosmosUtils.parse(save.data.s[`state_foundry_${to}`] || '[[],[]]') as [
               [number, CosmosPointSimple, CosmosPointSimple][],
               [CosmosPointSimple, boolean][]
            ];
            for (const [ cardinal, position, size ] of beams) {
               const face = [ 'up', 'down', 'left', 'right' ][cardinal] as CosmosDirection;
               objects.push(
                  new CosmosRectangle({
                     anchor: {
                        up: { x: 0, y: 1 },
                        down: { x: 0 },
                        left: { x: 1, y: 0 },
                        right: { y: 0 }
                     }[face],
                     position,
                     size,
                     fill: '#6ca4fc'
                  }).on('tick', function () {
                     this.priority.value = this.position.y + (face === 'down' ? this.size.y : 0) + 45;
                  })
               );
            }
            for (const [ position, inverse ] of overlays) {
               objects.push(
                  new CosmosSprite({
                     scale: { x: inverse ? -1 : 1 },
                     position,
                     priority: 1000,
                     frames: [ content.iooFPuzzlepylonOverlay ]
                  })
               );
            }
            renderer.attach('main', ...objects);
            events.on('teleport').then(() => {
               renderer.detach('main', ...objects);
            });
         }
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && game.room === 'f_puzzle3') {
               if (save.data.n.plot < 44) {
                  const asgoreLoader = asgoreAssets.load();
                  await timer.when(() => player.position.x > 210 && game.room === 'f_puzzle3');
                  game.movement = false;
                  save.data.n.plot = 44;
                  game.music!.gain.value = 0;
                  await Promise.all([ asgoreLoader, timer.pause(850) ]);
                  const gorey = character('asgore', characters.asgore, { x: 420, y: 110 }, 'left', {
                     key: 'asgore1'
                  });
                  const cam = new CosmosObject({ position: player.position.clone() });
                  game.camera = cam;
                  await cam.position.modulate(timer, 1500, { x: 300 });
                  const jeebs = assets.music.prebattle.instance(timer);
                  jeebs.rate.value = 0.25;
                  jeebs.gain.value = 0.45;
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal1);
                  assets.sounds.phase.instance(timer);
                  gorey.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                     gorey.scale.modulate(timer, 50, { x: 0, y: 1 });
                  });
                  await gorey.alpha.modulate(timer, 100, 0.8);
                  gorey.alpha.value = 0;
                  await timer.pause(40);
                  gorey.alpha.value = 1;
                  await timer.pause(850);
                  jeebs.gain.modulate(timer, 1000, 0).then(() => {
                     jeebs.stop();
                  });
                  await cam.position.modulate(timer, 1500, { x: player.position.x });
                  game.camera = player;
                  await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal2);
                  game.movement = true;
                  game.music!.gain.value = world.level;
                  renderer.detach('main', gorey);
                  asgoreAssets.unload();
               }

               // puzzle part
               if (save.data.n.plot < 45) {
                  await timer.when(() => player.position.y > 150 && game.room === 'f_puzzle3');
                  game.movement = false;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel39);

                  // kid start walk
                  epicgamer.metadata.override = true;
                  const OGregion = renderer.region[0];
                  renderer.region[0] = game.camera.position.value();
                  game.camera = epicgamer;
                  player.walk(timer, 3, { y: 170 }, { x: 711, y: 170 }).then(async () => {
                     player.face = 'down';
                     await timer.pause(650);
                     goatbro.face = 'down';
                  });

                  // puzzle sequence
                  const pylon3A = instance('main', 'f_puzzlepylon3A')!.object;
                  const pylon3D = instance('main', 'f_puzzlepylon3D')!.object;
                  const pylon3H = instance('main', 'f_puzzlepylon3H')!.object;

                  await timer.pause(850);
                  await epicgamer.walk(timer, 3, { x: 545 }, { x: 570, y: 190 });
                  let index = 0;
                  while (index++ < 2) {
                     pylon3A.position.modulate(timer, 66, pylon3A.position.add(10, 0));
                     await epicgamer.walk(timer, 1.5, epicgamer.position.add(3, 0));
                     await epicgamer.walk(timer, 3, epicgamer.position.add(7, 0));
                  }
                  await timer.pause(950);
                  await epicgamer.walk(timer, 3, { x: 680, y: 190 }, { x: 690 });
                  index = 0;
                  await timer.pause(1150);
                  await epicgamer.walk(timer, 3, { x: 710, y: 190 });
                  index = 0;
                  while (index++ < 6) {
                     pylon3D.position.modulate(timer, 66, pylon3D.position.add(10, 0));
                     await epicgamer.walk(timer, 1.5, epicgamer.position.add(3, 0));
                     await epicgamer.walk(timer, 3, epicgamer.position.add(7, 0));
                  }
                  await timer.pause(450);
                  await epicgamer.walk(timer, 3, { x: 770, y: 280 }, { x: 790, y: 310 });
                  index = 0;
                  while (index++ < 3) {
                     pylon3H.position.modulate(timer, 66, pylon3H.position.subtract(10, 0));
                     await epicgamer.walk(timer, 1.5, epicgamer.position.subtract(3, 0));
                     await epicgamer.walk(timer, 3, epicgamer.position.subtract(7, 0));
                  }

                  // return to sender
                  await epicgamer.walk(
                     timer,
                     3,
                     { y: 280 },
                     { x: goatbro.position.x, y: 280 },
                     goatbro.position.add(0, 21)
                  );

                  // end script
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel40());
                  goatbro.face = 'up';
                  await timer.pause(850);
                  await script('puzzle3', 'cutscene');
                  await timer.pause(450);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel41);
                  const cammie = new CosmosObject({ position: epicgamer.position });
                  game.camera = cammie;
                  await epicgamer.walk(timer, 3, goatbro.position.add(-21, 21), goatbro.position.add(-21, 0));
                  epicgamer.face = 'right';
                  epicgamer.metadata.reposition = true;
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel42);
                  await cammie.position.modulate(timer, 450, player.position.value());
                  game.camera = player;
                  epicgamer.metadata.override = false;
                  renderer.region[0] = OGregion;
                  game.movement = true;
               }
            }
         }
         break;
      }
      case 'f_muffet': {
         if (save.data.n.plot < 39) {
            renderer.attach(
               'main',
               ...CosmosUtils.populate(2, index =>
                  (subject => {
                     let lastPos = { x: NaN, y: NaN };
                     const anim = new CosmosAnimation({ priority: 1000000, anchor: { x: 0, y: 1 } }).on(
                        'tick',
                        function () {
                           if (subject.position.x !== lastPos.x || subject.position.y !== lastPos.y) {
                              lastPos = subject.position.value();
                              this.enable();
                              this.position = subject.position.clone();
                           } else {
                              this.disable();
                           }
                           const distance = Math.abs(500 - subject.position.x);
                           if (distance < 40) {
                              this.alpha.value = 1;
                              subject.metadata.speed = distance < 0.1 ? 0 : 1 / 4;
                              this.resources === content.iooFGunk3 || this.use(content.iooFGunk3);
                           } else if (distance < 110) {
                              this.alpha.value = 1;
                              subject.metadata.speed = 1 / 3;
                              this.resources === content.iooFGunk2 || this.use(content.iooFGunk2);
                           } else if (distance < 180) {
                              this.alpha.value = 1;
                              subject.metadata.speed = 1 / 2;
                              this.resources === content.iooFGunk1 || this.use(content.iooFGunk1);
                           } else {
                              this.alpha.value = 0;
                              subject.metadata.speed = 1;
                           }
                        }
                     );
                     Promise.race([ events.on('teleport'), timer.when(() => save.data.n.plot === 39) ]).then(() => {
                        renderer.detach('main', anim);
                        subject.metadata.speed = 1;
                     });
                     return anim;
                  })([ player, epicgamer ][index])
               )
            );
         }
         if (!roomState.active) {
            roomState.active = true;
            const random3 = new CosmosValueRandom(hash('muffet'));
            const amount = 40;
            const spread = 1000 / amount;
            const obby = new CosmosObject({
               fill: 'white',
               priority: -1000,
               objects: CosmosUtils.populate(amount, index => {
                  const distance = random3.next();
                  return new CosmosRectangle({
                     alpha: distance / 4,
                     parallax: { x: 1 - distance },
                     position: { x: index * spread + random3.next() * spread },
                     size: { x: 1, y: 300 },
                     anchor: { x: 0 },
                     rotation: CosmosMath.remap(random3.next(), -40, 40)
                  });
               })
            });
            renderer.attach('below', obby);
            isolate(obby);
         }
         if (save.data.n.plot < 39) {
            const spiders = CosmosUtils.populate(
               5,
               index =>
                  new CosmosRectangle({
                     alpha: index < save.data.n.state_foundry_spiders ? 0 : 1,
                     anchor: { x: 0, y: 1 },
                     size: { x: 1, y: 240 },
                     fill: '#ffffff7f',
                     position: { y: [ 50, 40, 60, 50, 70 ][index], x: 200 + index * 75 },
                     objects: [ new CosmosAnimation({ active: true, resources: content.ionFSpider, anchor: { x: 0 } }) ]
                  })
            );
            renderer.attach('main', ...spiders);
            if (!world.dead_skeleton && save.data.n.plot_call < 6) {
               teleporter.movement = false;
               save.data.n.plot_call = 6;
               assets.sounds.phone.instance(timer);
               await dialogue('dialoguerBottom', ...text.a_foundry.plot_call.b());
               assets.sounds.equip.instance(timer);
               await dialogue('dialoguerBottom', commonText.c_endcall);
               game.movement = true;
            } else if (save.data.b.papyrus_secret && save.data.n.plot_call < 5) {
               teleporter.movement = false;
               save.data.n.plot_call = 5;
               await dialogue('dialoguerBottom', ...text.a_foundry.secretcall);
               game.movement = true;
            }
            for (const [ index, spider ] of spiders.entries()) {
               await Promise.race([
                  events.on('teleport'),
                  timer.when(() => player.position.x > spider.position.x - 40)
               ]);
               if (game.room === 'f_muffet') {
                  spider.position.modulate(timer, 1000, { y: -10 });
                  save.data.n.state_foundry_spiders = index + 0.5;
               } else {
                  renderer.detach('main', ...spiders);
                  return;
               }
               await Promise.race([ events.on('teleport'), timer.when(() => player.position.x > spider.position.x - 1) ]);
               if (game.room === 'f_muffet') {
                  await timer.when(() => game.movement);
                  index === 4 && (player.position.x = 500);
                  if (save.data.n.state_foundry_spiders < index + 1) {
                     assets.sounds.spiderLaugh.instance(timer);
                     save.data.n.state_foundry_spiders = index + 1;
                     await dialogue(
                        'dialoguerBottom',
                        ...[
                           text.a_foundry.spider1,
                           text.a_foundry.spider2,
                           text.a_foundry.spider3,
                           text.a_foundry.spider4,
                           text.a_foundry.spider5
                        ][index]()
                     );
                  }
               } else {
                  renderer.detach('main', ...spiders);
                  return;
               }
            }
            game.menu = false;
            const battleLoader = battler.load(groups.muffet);
            const mofo = new CosmosAnimation({
               position: { y: -31 },
               anchor: { x: 0, y: 1 },
               resources: content.ionFMuffet
            }).on('tick', function () {
               this.index === 6 && (this.index = 4);
            });
            const platform = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: { x: 500 },
               frames: [ content.iooFWeb3 ],
               objects: [ mofo ]
            });
            renderer.attach('main', platform);
            await platform.position.modulate(timer, 2500, { y: 120 });
            await timer.pause(1000);
            await dialogue('dialoguerBottom', ...text.a_foundry.spider6());
            assets.sounds.spiderLaugh.instance(timer);
            mofo.enable();
            await timer.when(() => mofo.index === 4);
            await timer.pause(1450);
            renderer.detach('main', ...spiders);
            game.movement = false;
            const flowerLoader = content.iooFSpiderflower.load();
            await Promise.all([ battleLoader, battler.battlefall(player) ]);
            epicgamer.metadata.override = true;
            const oopsie = save.data.b.oops;
            await battler.start(groups.muffet);
            player.face = 'right';
            epicgamer.metadata.holdover = true;
            save.data.n.plot = 39;
            epicgamer.metadata.override = false;
            epicgamer.position = player.position.subtract(21, 0);
            // post-battle dialogue
            if (save.data.n.state_foundry_muffet === 1) {
               mofo.alpha.value = 0;
               await Promise.all([
                  flowerLoader,
                  inventories.iocKiddSad.load(),
                  dialogue('auto', ...text.a_foundry.muffetGeno1())
               ]);
               const spider = new CosmosAnimation({
                  priority: 1000,
                  position: { x: platform.position.x + 170, y: platform.position.y + mofo.position.y },
                  resources: content.ionFSpider,
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1.5 },
                        position: { y: 5 },
                        frames: [ content.iooFSpiderflower ]
                     })
                  ]
               });
               renderer.attach('main', spider);
               spider.enable();
               while (spider.position.x > platform.position.x + 5) {
                  spider.position.x -= 2;
                  await renderer.on('tick');
               }
               spider.reset();
               await timer.pause(650);
               const flower = spider.objects[0];
               await Promise.all([
                  flower.position.modulate(
                     timer,
                     700,
                     { x: flower.position.x - 5 },
                     { x: flower.position.x - 5, y: flower.position.y + 3 }
                  ),
                  timer.pause(350).then(async () => {
                     header('x1').then(() => {
                        epicgamer.metadata.holdover = false;
                     });
                     await dialogue('dialoguerTop', ...text.a_foundry.muffetGeno1x);
                     await timer.pause(650);
                  })
               ]);
               spider.objects = [];
               flower.position = spider.position.add(flower.position);
               flower.priority.value = 1000;
               renderer.attach('main', flower);
               timer
                  .when(() => spider.position.x > platform.position.x + 80)
                  .then(async () => {
                     await Promise.all([
                        platform.position.modulate(timer, 2500, { y: 0 }),
                        flower.position.modulate(timer, 2500, { y: flower.position.y - platform.position.y })
                     ]);
                     renderer.detach('main', platform, flower);
                  });
               (async () => {
                  while (spider.position.x < platform.position.x + 170) {
                     spider.position.x += 4;
                     await renderer.on('tick');
                  }
                  renderer.detach('main', spider);
               })();
               await dialogue('dialoguerBottom', ...text.a_foundry.muffetGeno2);
               await timer.pause(1350);
               epicgamer.metadata.reposition = true;
               await dialogue('dialoguerBottom', ...text.a_foundry.muffetGeno3);
            } else {
               epicgamer.metadata.holdover = false;
               mofo.reset();
               await dialogue('auto', ...text.a_foundry.muffet1());
               mofo.enable();
               assets.sounds.spiderLaugh.instance(timer);
               platform.position.modulate(timer, 2500, { y: 0 }).then(() => {
                  renderer.detach('main', platform);
               });
               await timer.pause(850);
               epicgamer.metadata.reposition = true;
               epicgamer.metadata.repositionFace = 'right';
               await dialogue('dialoguerBottom', ...text.a_foundry.muffet2());
               if (!oopsie) {
                  await dialogue('auto', ...text.a_foundry.truetext.muffet());
               }
            }
            game.movement = true;
            game.menu = true;
            events.on('teleport', () => {
               content.iooFSpiderflower.unload();
            });
         }
         break;
      }
      case 'f_artifact': {
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.b.item_artifact) {
               const box = instance('main', 'artifactbox')!;
               const spr = box.object.objects.filter(x => x instanceof CosmosSprite)[0] as CosmosSprite;
               spr.index = 1;
            }
         }
         break;
      }
      case 'f_path': {
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot_kidd < 3) {
               await timer.when(() => game.room === 'f_path' && player.position.x > 300);
               await dialogue('auto', ...text.a_foundry.walktext.path1());
               save.data.n.plot_kidd = 3;
            }
            if (save.data.n.plot_kidd < 3.1) {
               await timer.when(() => game.room === 'f_path' && player.position.x > 700);
               await dialogue('auto', ...text.a_foundry.walktext.path2());
               save.data.n.plot_kidd = 3.1;
            }
            if (save.data.n.plot_kidd < 3.2) {
               await timer.when(() => game.room === 'f_path' && player.position.x > 800);
               await dialogue('auto', ...text.a_foundry.walktext.path3());
               save.data.n.plot_kidd = 3.2;
            }
            if (save.data.n.plot_kidd < 3.3) {
               await timer.when(() => game.room === 'f_path' && player.position.x > 1200);
               await dialogue('auto', ...text.a_foundry.walktext.path4());
               save.data.n.plot_kidd = 3.3;
            }
         }
         break;
      }
      case 'f_prespear': {
         if (save.data.n.plot < 41 && !roomState.active) {
            roomState.active = true;
            await timer.when(() => game.room === 'f_prespear' && player.position.x > 120);
            game.movement = false;
            save.data.n.plot = 41;
            const cam = new CosmosObject({ position: player.position.value() });
            game.camera = cam;
            await dialogue('auto', ...text.a_foundry.walktext.path5);
            epicgamer.metadata.override = true;
            await epicgamer.walk(timer, 3, player.position.add(0, player.position.y > 110 ? -21 : 21), {
               x: 155,
               y: 110
            });
            epicgamer.face = 'right';
            await timer.pause(650);
            epicgamer.face = 'left';
            await timer.pause(1150);
            await dialogue('auto', ...text.a_foundry.walktext.path6());
            epicgamer.face = 'right';
            await timer.pause(850);
            epicgamer.alpha.value = 0;
            const spr = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: epicgamer.position.value(),
               frames: [ content.iocKiddCrouch ]
            });
            renderer.attach('main', spr);
            await timer.pause(1000);
            await dialogue('auto', ...text.a_foundry.walktext.path7());
            await player.walk(timer, 3, epicgamer.position.subtract(21, 0));
            await timer.pause(650);
            await player.position.modulate(timer, 750, epicgamer.position.subtract(0, 15));
            await timer.pause(150);
            timer.pause(650).then(() => {
               renderer.detach('main', spr);
               epicgamer.alpha.value = 1;
            });
            await new Promise<void>(async resolve => {
               const midPoint = player.position.subtract(-37.5, 10).value();
               const endPoint = player.position.add(75, 15).value();
               player.position.modulate(timer, 1000, midPoint, endPoint).then(async () => {
                  resolve();
               });
               while (player.position.x < endPoint.x) {
                  await timer.pause(
                     player.position.y < midPoint.y - 5 ? 133 : player.position.y < midPoint.y - 10 ? 99 : 66
                  );
                  player.face = (
                     { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                        CosmosDirection,
                        CosmosDirection
                     >
                  )[player.face];
               }
            });
            await timer.pause(350);
            player.face = 'left';
            await timer.pause(850);
            await dialogue('auto', ...text.a_foundry.walktext.path8());
            await epicgamer.walk(timer, 3, { x: cam.position.x - 170, y: 110 });
            renderer.detach('main', epicgamer);
            epicgamer.metadata.override = false;
            await cam.position.modulate(timer, 2000, player.position.value());
            game.camera = player;
            game.movement = true;
         }
         break;
      }
      case 'f_spear': {
         if (roomState.active) {
            break;
         }
         roomState.active = true;
         if (save.data.n.plot < 42) {
            game.movement || (await timer.when(() => game.movement));
            game.movement = false;
            const fastAssets = new CosmosInventory(
               inventories.battleAssets,
               content.ibbChasespear,
               content.amUndynefast,
               content.iooFSpearSpawn
            );
            const kickAssets = new CosmosInventory(content.iocUndyneKick, content.asKick);
            const kickLoader = kickAssets.load();
            const fastLoader = fastAssets.load();
            const jetpackAssets = new CosmosInventory(content.asFear, content.asJetpack);
            const jetpackLoader = jetpackAssets.load();
            const stompLoader = content.asStomp.load();
            await player.walk(timer, 3, { y: 50 });
            game.menu = false;
            save.data.n.plot = 42;
            const spears = [] as [CosmosSprite, CosmosAnimation][];
            function appear (...positions: CosmosPointSimple[]) {
               spears.push(
                  ...positions.map(position => {
                     const spr = new CosmosSprite({
                        alpha: 0,
                        anchor: { y: 1 },
                        priority: -1000,
                        position: { x: position.x, y: position.y + 20 },
                        frames: [ content.iooFFloorspearBase ]
                     }).on('tick', function () {
                        if (game.room === 'f_asriel') {
                           renderer.detach('main', this);
                        }
                     });
                     const anim = new CosmosAnimation({
                        alpha: 0,
                        anchor: { y: 1 },
                        position: { x: position.x, y: position.y + 20 },
                        resources: content.iooFFloorspear
                     }).on('tick', function () {
                        if (game.room === 'f_asriel') {
                           renderer.detach('main', this);
                        }
                     });
                     renderer.attach('main', spr, anim);
                     spr.alpha.modulate(timer, 500, 1);
                     anim.alpha.modulate(timer, 500, 1);
                     return [ spr, anim ] as [CosmosSprite, CosmosAnimation];
                  })
               );
               assets.sounds.appear.instance(timer);
            }
            function stab () {
               let battle = false;
               shake(2, 500);
               for (const [ spr, anim ] of spears.splice(0, spears.length)) {
                  anim.index = 1;
                  anim.enable();
                  timer
                     .when(() => anim.index === 3)
                     .then(async () => {
                        anim.disable();
                        await timer.pause(300);
                        await Promise.all([ spr.alpha.modulate(timer, 500, 0), anim.alpha.modulate(timer, 500, 0) ]);
                        renderer.detach('main', spr, anim);
                     });
                  if (game.movement && !battler.active) {
                     const baseX = spr.position.x + 10;
                     if (
                        baseX > player.position.x - 12.5 &&
                        baseX < player.position.x + 12.5 &&
                        spr.position.y > player.position.y - 2.5 &&
                        spr.position.y < player.position.y + 17.5
                     ) {
                        battle = true;
                        game.movement = false;
                        battler.battlefall(player, { x: 160, y: 180 }).then(async () => {
                           await battler.simple(async () => {
                              game.movement = true;
                              await patterns.undynefast();
                              if (save.data.n.hp > 0) {
                                 events.fire('exit');
                              }
                           });
                        });
                     }
                  }
               }
               assets.sounds.stab.instance(timer);
               return battle;
            }
            const spawns = [
               { x: 120, y: 20 },
               { x: 140, y: 20 },
               { x: 160, y: 20 },
               { x: 180, y: 20 },
               { x: 200, y: 20 },
               { x: 120, y: 40 },
               { x: 140, y: 40 },
               { x: 180, y: 40 },
               { x: 200, y: 40 },
               { x: 120, y: 60 },
               { x: 140, y: 60 },
               { x: 160, y: 60 },
               { x: 180, y: 60 },
               { x: 200, y: 60 }
            ];
            while (spawns.length > 0) {
               appear(spawns.splice(Math.floor(random.next() * spawns.length), 1)[0]);
               await timer.pause(spawns.length * 75);
            }
            await Promise.all([ timer.pause(1000), jetpackLoader ]);
            stab();
            shake(1.5, 700);
            const overlay = new CosmosRectangle({ fill: 'white', size: { x: 320, y: 240 } });
            renderer.attach('menu', overlay);
            timer.pause(50).then(async () => {
               await overlay.alpha.modulate(timer, 150, 0);
               renderer.detach('menu', overlay);
            });
            await timer.pause(850);
            assets.sounds.fear.instance(timer);
            let chase = true;
            let hover = true;
            let controller = true;
            const time = timer.value;
            const fishShake = new CosmosValue();
            const fishPosition = player.position.clone();
            let room = '';
            const moveTrail = [] as CosmosPoint[];
            const fish = new CosmosCharacter({
               alpha: 0,
               priority: -100,
               position: fishPosition.value(),
               preset: characters.undyneArmorJetpack,
               key: 'undyneArmorJetpack'
            }).on('tick', function () {
               if (chase) {
                  if (game.room !== room) {
                     room = game.room;
                     moveTrail.splice(0, moveTrail.length);
                  }
                  moveTrail.push(player.position.clone());
                  moveTrail.length > 8 && moveTrail.shift();
                  const truePosition = moveTrail[0].add(0, 80);
                  const dist = fishPosition.extentOf(truePosition);
                  const destPosition =
                     dist < 1.5
                        ? truePosition
                        : dist > 250
                        ? truePosition.endpoint(fishPosition.angleFrom(truePosition), -40)
                        : fishPosition.endpoint(truePosition.angleFrom(fishPosition), Math.min(dist / 3, 15));
                  const diff = destPosition.subtract(fishPosition);
                  if (Math.abs(diff.x) > Math.abs(diff.y)) {
                     this.face = diff.x < 0 ? 'left' : 'right';
                  } else {
                     this.face = 'down';
                  }
                  Object.assign(fishPosition, destPosition.value());
               }
               if (controller) {
                  this.position = fishPosition.add(
                     (Math.random() - 0.5) * fishShake.value * 2,
                     (Math.random() - 0.5) * fishShake.value * 2
                  );
                  if (hover) {
                     this.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                  }
               }
            });

            fish.face = 'down';
            renderer.attach('below', fish);
            renderer.layers.below.modifiers = [];
            fish.alpha.modulate(timer, 800, 1, 1);

            // jetpack sound
            const flame = assets.sounds.jetpack.instance(timer);
            flame.gain.value = 0;
            flame.gain.modulate(timer, 800, 0.2);

            // music & chase start
            await Promise.all([ fastLoader, timer.pause(1000) ]);
            game.movement = true;
            const runMusic = assets.music.undynefast.instance(timer);

            const plankListener = () => {
               if (game.room === 'f_plank') {
                  fish.alpha.value = 0;
                  flame.gain.value = 0;
                  runMusic.gain.value = player.position.x > 200 ? 1 - Math.min((player.position.x - 200) / 300, 1) : 1;
               } else {
                  fish.alpha.value = 1;
                  flame.gain.value = 0.2;
                  runMusic.gain.value = 1;
               }
            };

            renderer.on('tick', plankListener);

            // detect end
            timer
               .when(() => game.room === 'f_plank' && player.position.x > 440)
               .then(async () => {
                  renderer.detach('below', fish);

                  // lock values
                  chase = false;
                  hover = false;
                  controller = false;
                  game.movement = false;
                  firingRate.modulate(timer, 0, firingRate.value);
                  renderer.off('tick', plankListener);
                  runMusic.stop();
                  fastAssets.unload();
                  flame.stop();
                  jetpackAssets.unload();
                  await Promise.all([ stompLoader, player.walk(timer, 3, { x: 500 }) ]);

                  // stop fish (instead of go fish)
                  await timer.pause(1350);
                  fish.preset = characters.undyneArmor;
                  fish.position.x = 320;
                  fish.position.y = player.position.y;
                  fishShake.value = 0;
                  fish.face = 'right';
                  fish.alpha.value = 1;
                  renderer.attach('main', fish);
                  const stepSFX = () => {
                     if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                        assets.sounds.stomp.instance(timer).gain.value = CosmosMath.remap(
                           fish.position.x,
                           0.5,
                           0.8,
                           320,
                           480
                        );
                     }
                  };
                  fish.on('tick', stepSFX);
                  characters.undyneArmor.walk.right.duration = 6;
                  characters.undyneArmor.walk.right.enable();
                  while (fish.position.x < player.position.x - 18) {
                     await renderer.on('tick');
                     fish.position.x = Math.min(fish.position.x + 2, player.position.x - 18);
                  }
                  characters.undyneArmor.walk.right.reset();
                  fish.off('tick', stepSFX);
                  await Promise.all([ kickLoader, timer.pause(1150) ]);
                  fish.alpha.value = 0;
                  const touchie = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     position: fish.position.value(),
                     resources: content.iocUndyneKick
                  });
                  renderer.attach('main', touchie);
                  const touchPromise = timer.when(() => touchie.index === 2);
                  touchPromise.then(async () => {
                     touchie.disable();
                     const kicker = assets.sounds.kick.instance(timer);
                     shake(1.5, 1400);
                     const overlay = new CosmosRectangle({
                        alpha: 0,
                        fill: 'black',
                        size: { x: 320, y: 240 }
                     });
                     renderer.attach('menu', overlay);
                     const cam = new CosmosObject({ position: player.position.value() });
                     game.camera = cam;
                     player.position.y -= 15;
                     player.anchor.y = 0;
                     player.sprite.anchor.y = 0;
                     timer.pause(2350).then(() => (touchie.index = 0));
                     const memoryLoader = content.amMemory.load();
                     await Promise.all([
                        player.position.modulate(timer, 5000, player.position.add(400, -200)),
                        player.rotation.modulate(timer, 5000, 1200),
                        overlay.alpha.modulate(timer, 5000, 1),
                        kicker.gain.modulate(timer, 5000, 1, 0)
                     ]);
                     player.rotation.value = 0;
                     renderer.detach('main', touchie);
                     fish.alpha.value = 1;
                     kicker.stop();
                     kickAssets.unload();
                     player.anchor.y = 1;
                     player.sprite.anchor.y = 1;
                     await Promise.all([ memoryLoader, timer.pause(3000) ]);
                     const musicbox = assets.music.memory.instance(timer);
                     const epic = new CosmosText({
                        fill: '#fff',
                        position: { x: 80, y: 100 },
                        stroke: 'transparent',
                        font: '16px DeterminationMono',
                        spacing: { x: 1, y: 2 }
                     }).on('tick', function () {
                        this.content = game.text;
                     });
                     renderer.attach('menu', epic);
                     let ticko = true;
                     header('x1').then(async () => {
                        overlay.objects.push(
                           new CosmosRectangle({
                              alpha: 0,
                              fill: 'white',
                              size: { x: 320, y: 240 }
                           }).on('tick', function () {
                              if (ticko) {
                                 this.alpha.value += 0.008;
                              } else {
                                 overlay.objects.splice(overlay.objects.indexOf(this), 1);
                              }
                           })
                        );
                        while (ticko) {
                           await renderer.on('tick');
                           musicbox.rate.value += 0.004;
                        }
                     });
                     await dialogue('dialoguerBase', ...text.a_foundry.musicbox);
                     ticko = false;
                     musicbox.stop();
                     content.amMemory.unload();
                     game.camera = player;
                     renderer.detach('menu', epic);
                     renderer.detach('main', fish);
                     await teleport('f_asriel', 'down', 160, 160, { fast: true });
                     game.movement = true;
                     game.menu = true;
                     await overlay.alpha.modulate(timer, 1200, 0);
                     renderer.detach('menu', overlay);
                  });

                  // script end
                  content.asStomp.unload();
               });

            // fish gets angy
            fishShake.modulate(timer, 60e3, 1.5);
            const firingRate = new CosmosValue(2000);
            firingRate.modulate(timer, 60e3, 750);

            // spear chase system
            await timer.pause(500);
            while (chase) {
               let active = true;
               events.on('teleport').then(() => (active = false));
               await renderer.on('tick');
               await timer.pause();
               const tile = player.position.floor(1 / 20);
               const spawns = CosmosUtils.populate(9, index1 =>
                  CosmosUtils.populate(9, index2 => tile.add(-80 + index1 * 20, -80 + index2 * 20))
               ).flat();
               let spawned = 0;
               const trueSpawns = [] as CosmosPoint[];
               while (spawns.length > 0) {
                  const position = spawns.splice(Math.floor(random.next() * spawns.length), 1)[0];
                  if (spawned < 4 || random.next() < 1 / 8) {
                     const source = new CosmosHitbox({ position, size: { x: 20, y: 20 } });
                     renderer.attach('below', source);
                     if (
                        renderer.detect(
                           'below',
                           source,
                           ...renderer.calculate('below', hitbox => hitbox.metadata.barrier === true)
                        ).length === 0 &&
                        (game.room !== 'f_plank' || position.x < 420)
                     ) {
                        trueSpawns.push(position);
                        spawned++;
                     }
                     renderer.detach('below', source);
                  }
               }
               if (active) {
                  appear(...trueSpawns);
                  await timer.pause(CosmosMath.remap(firingRate.value, 1000, 750, 2000, 1000));
                  if (active) {
                     if (stab()) {
                        await timer.when(() => battler.active);
                     }
                  }
               }
               await Promise.all([
                  timer.pause(firingRate.value),
                  battler.active && timer.when(() => !battler.active).then(() => timer.pause(1000))
               ]);
            }
         }
         break;
      }
      case 'f_dummy': {
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 42.1) {
               const bigAssets = new CosmosInventory(
                  content.asDununnn,
                  content.ionODummyMadDark,
                  content.ionODummyMad,
                  content.asShatter,
                  content.ionODummyRage,
                  content.ionODummy,
                  content.asBoom,
                  content.amPredummy,
                  ...(save.data.b.genocide ? [ content.ionODummyGlad, content.ionODummyBlush ] : [])
               );
               const bigLoader = bigAssets.load();
               const dummySprite = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  resources: content.ionODummyDark
               });
               const dummy = new CosmosHitbox({
                  position: { x: 210, y: 120 },
                  anchor: 0,
                  size: { x: 20, y: 10 },
                  objects: [ dummySprite ],
                  metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fakedummy' ] }
               });
               renderer.attach('main', dummy);
               isolate(dummy);
               await timer.when(() => game.room === 'f_dummy' && player.position.y > 300);
               game.movement = false;
               save.data.n.plot = 42.1;
               game.music!.gain.value = 0;
               const battleLoader = save.data.b.toriel_phone ? void 0 : battler.load(commonGroups.maddummy);
               await timer.pause(1150);
               const cam = new CosmosObject({ position: { x: 160, y: player.position.y } });
               game.camera = cam;
               await cam.position.modulate(timer, 850, { x: 160, y: player.position.y - 100 });
               cam.position.x = 160;
               await Promise.all([ bigLoader, timer.pause(850) ]);
               {
                  const target = dummy.position;
                  const zoom = 1.8;
                  const area = new CosmosValue(320);
                  const size = 320 / zoom;
                  const start = cam.position.value();
                  const region = renderer.region;
                  const duration = 266;
                  renderer.region = [
                     { x: -1000, y: -1000 },
                     { x: 1000, y: 1000 }
                  ];
                  cam.position.modulate(timer, duration, target);
                  area.modulate(timer, duration, size);
                  while (area.value > size) {
                     renderer.zoom.value = 320 / area.value;
                     await timer.on('tick');
                  }
                  renderer.zoom.value = zoom;
                  assets.sounds.dununnn.instance(timer);
                  dummySprite.use(content.ionODummyMadDark);
                  await timer.pause(2450);
                  cam.position.modulate(timer, duration, start);
                  area.modulate(timer, duration, 320);
                  while (area.value < 320) {
                     renderer.zoom.value = 320 / area.value;
                     await timer.on('tick');
                  }
                  renderer.zoom.value = 1;
                  renderer.region = region;
               }
               const dummyShake = new CosmosValue();
               const basePos = dummy.position.clone();
               dummy.on('tick', () => {
                  dummy.position = basePos.add(
                     (Math.random() - 0.5) * dummyShake.value * 2,
                     (Math.random() - 0.5) * dummyShake.value * 2
                  );
               });
               dummyShake.modulate(timer, 350, 0, 2);
               await timer.pause(350);
               await Promise.all([
                  dummy.alpha.modulate(timer, 500, 1, 0),
                  dummyShake.modulate(timer, 500, 0, 0),
                  basePos.modulate(timer, 500, basePos.value(), basePos.subtract(0, 60))
               ]);
               await cam.position.modulate(timer, 850, { x: 160, y: player.position.y });
               game.camera = player;
               Object.assign(basePos, player.position.subtract(0, 140).value());
               dummyShake.modulate(timer, 500, 2, 0);
               await timer.pause(350);
               dummySprite.use(content.ionODummyMad);
               const overDummy = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ionODummyMadDark
               });
               dummySprite.attach(overDummy);
               const cover = new CosmosRectangle({
                  fill: 'white',
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', cover);
               assets.sounds.boom.instance(timer);
               shake(2, 800);
               const loop = assets.music.predummy.instance(timer);
               loop.gain.value /= 8;
               await Promise.all([
                  loop.gain.modulate(timer, 500, loop.gain.value * 8),
                  dummy.alpha.modulate(timer, 500, 1, 1),
                  cover.alpha.modulate(timer, 500, 1, 0),
                  basePos.modulate(timer, 500, basePos.add(0, 60), basePos.add(0, 60), basePos.add(0, 60)),
                  overDummy.alpha.modulate(timer, 500, 0)
               ]);
               renderer.detach('menu', cover);
               let wav = 2;
               const time = timer.value;
               dummy.on('tick', () => {
                  dummy.position.y = basePos.y - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * wav;
               });
               if (save.data.b.f_state_dummypunch) {
                  await dialogue('dialoguerBottom', ...text.a_foundry.dummy1c());
               } else if (save.data.b.f_state_dummytalk) {
                  await dialogue('dialoguerBottom', ...text.a_foundry.dummy1b());
               } else {
                  await dialogue('dialoguerBottom', ...text.a_foundry.dummy1a());
               }
               if (save.data.b.toriel_phone) {
                  header('x1').then(() => {
                     loop.stop();
                     assets.sounds.shatter.instance(timer);
                     dummySprite.reset().use(content.ionODummy);
                  });
                  if (!save.data.b.toriel_phone) {
                     header('x2').then(() => {
                        dummySprite.use(content.ionODummyMad).enable();
                     });
                  }
               } else if (save.data.b.genocide) {
                  header('x1').then(() => {
                     dummySprite.reset().use(content.ionODummyRage);
                  });
                  header('x2').then(() => {
                     dummySprite.enable();
                  });
               } else if (save.data.n.state_wastelands_dummy === 4) {
                  header('x1').then(() => {
                     dummySprite.use(content.ionODummy);
                  });
               }
               await dialogue('dialoguerBottom', ...text.a_foundry.dummy2());
               if (save.data.b.toriel_phone) {
                  basePos.y = dummy.position.y;
                  wav = 0;
                  dummyShake.modulate(timer, 350, 0, 2);
                  await timer.pause(350);
                  await Promise.all([
                     dummyShake.modulate(timer, 500, 0, 0),
                     basePos.modulate(timer, 500, basePos.value(), basePos.subtract(0, 180))
                  ]);
               } else {
                  if (save.data.b.genocide) {
                     await timer.pause(1450);
                     loop.stop();
                     assets.sounds.shatter.instance(timer);
                     dummySprite.use(content.ionODummyBlush);
                     await timer.pause(1450);
                     header('x3').then(() => {
                        dummySprite.use(content.ionODummyGlad);
                     });
                     await dialogue('dialoguerBottom', ...text.a_foundry.dummy3);
                  } else {
                     loop.stop();
                     assets.sounds.shatter.instance(timer);
                     dummySprite.use(content.ionODummyRage);
                     await timer.pause(1450);
                  }
                  await Promise.all([ battler.battlefall(player), battleLoader ]);
                  await battler.start(commonGroups.maddummy);
               }
               renderer.detach('main', dummy);
               if (!world.genocide) {
                  const napsta = character(
                     'napstablook',
                     characters.napstablook,
                     { x: 220, y: save.data.b.toriel_phone ? 495 : 395 },
                     'down'
                  );
                  save.data.b.toriel_phone && (await napsta.position.modulate(timer, 1400, { y: 395 }));
                  await dialogue('dialoguerTop', ...text.a_foundry.dummy4());
                  await Promise.race([
                     timer.pause(200).then(async () => {
                        await napsta.position.modulate(timer, 1400, { y: 495 });
                        await napsta.alpha.modulate(timer, 300, 0);
                     }),
                     events.on('teleport')
                  ]);
                  renderer.detach('main', napsta);
               } else {
                  save.data.n.state_foundry_blookdate = 2;
                  while (world.population > 0) {
                     world.bully();
                  }
               }
               game.movement = true;
               game.music!.gain.value = world.level;
               bigAssets.unload();
            }
         }
         break;
      }
      case 'f_hub': {
         (world.genocide || world.population === 0) && instance('main', 'f_clamgirl')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 43) {
               if (world.genocide) {
                  const loder = new CosmosInventory(
                     inventories.iocKiddSlave,
                     inventories.iocKidd,
                     inventories.idcKidd,
                     content.avKidd
                  ).load();
                  await timer.when(() => 400 <= player.position.x && game.room === 'f_hub');
                  game.movement = false;
                  save.data.n.plot = 43;
                  player.position.x = 400;
                  game.music!.gain.value = 0;
                  await timer.pause(450);
                  renderer.attach('main', goatbro);
                  goatbro.metadata.override = true;
                  goatbro.position.set({ x: 200, y: player.position.y });
                  await goatbro.walk(timer, 3, player.position.add(-21, 0));
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel35());
                  await timer.pause(650);
                  goatbro.face = 'left';
                  await Promise.all([ timer.pause(850), loder ]);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel36);
                  renderer.attach('main', epicgamer);
                  epicgamer.metadata.override = true;
                  epicgamer.preset = characters.kiddSlave;
                  epicgamer.position.set({ x: 200, y: player.position.y });
                  epicgamer.sprite.duration = 5;
                  await epicgamer.walk(timer, 3, goatbro.position.add(-21, 0));
                  await timer.pause(1150);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel37());
                  await timer.pause(450);
                  goatbro.face = 'right';
                  await timer.pause(850);
                  goatbro.metadata.reposition = true;
                  epicgamer.metadata.reposition = true;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel38());
                  goatbro.metadata.override = false;
                  epicgamer.metadata.override = false;
                  epicgamer.metadata.barrier = false;
                  epicgamer.metadata.interact = false;
                  game.movement = true;
                  game.music!.gain.value = world.level;
               } else if (save.data.n.state_foundry_blookdate < 0.1) {
                  save.data.n.state_foundry_blookdate = 0.1;
                  const napsta = character('napstablook', characters.napstablook, { x: 220, y: 195 }, 'down');
                  await Promise.race([
                     timer.pause(200).then(async () => {
                        await napsta.walk(timer, 3, { y: 255 });
                        await napsta.alpha.modulate(timer, 300, 0);
                     }),
                     events.on('teleport')
                  ]);
                  renderer.detach('main', napsta);
               }
            }
         }
         break;
      }
      case 'f_blooky': {
         (world.genocide || world.population < 4) && instance('main', 'f_snail1')?.destroy();
         (world.genocide || world.population < 4) && instance('main', 'f_snail2')?.destroy();
         if (!world.genocide && !world.madfish && !save.data.b.a_state_napstadecline) {
            if (save.data.n.state_foundry_blookdate < 2) {
               if (save.data.n.state_foundry_blookdate < 0.2) {
                  save.data.n.state_foundry_blookdate = 0.2;
                  const blooker = character('napstablook', characters.napstablook, { x: 280, y: 200 }, 'right');
                  await Promise.race([
                     timer.pause(200).then(async () => {
                        await blooker.walk(timer, 3, { x: 320, y: 200 }, { x: 390, y: 130 });
                        await blooker.alpha.modulate(timer, 300, 0);
                     }),
                     events.on('teleport')
                  ]);
                  renderer.detach('main', blooker);
               }
               break;
            }
            const blooker = character('napstablook', characters.napstablook, { x: 120, y: 90 }, 'down', {
               anchor: 0,
               metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'blooktouch' ] },
               size: { x: 10, y: 10 }
            }).on('tick', function () {
               this.alpha.value = (player.position.x - 10) / 30;
            });
            events.on('teleport').then(() => {
               renderer.detach('main', blooker);
            });
         }
         break;
      }
      case 'f_asriel': {
         if (!roomState.comcheck && world.goatbro && world.epicgamer) {
            roomState.comcheck = true;
            await timer.when(() => game.movement);
            if (!save.data.b.f_state_kidd_trashcom && world.genocide && world.epicgamer) {
               save.data.b.f_state_kidd_trashcom = true;
               await dialogue('auto', ...text.a_foundry.walktext.trashcom);
            }
         }
         break;
      }
      case 'f_snail': {
         if (!world.genocide && !world.madfish && !save.data.b.a_state_napstadecline) {
            const blooker = character('napstablook', characters.napstablook, { x: 40, y: 190 }, 'right', {
               anchor: 0,
               metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'blooktouch' ] },
               size: { x: 10, y: 10 }
            }).on('tick', function () {
               if (save.data.n.state_foundry_blookdate < 2) {
                  this.alpha.value = 0;
                  this.metadata.barrier = false;
                  this.metadata.interact = false;
               }
            });
            roomState.blookie = blooker;
            events.on('teleport').then(() => {
               renderer.detach('main', blooker);
            });
         } else {
            if (!roomState.comcheck && world.goatbro && world.epicgamer) {
               roomState.comcheck = true;
               if (!save.data.b.f_state_kidd_snailcom && world.genocide && world.epicgamer) {
                  await timer.when(() => player.position.x < 240 && game.room === 'f_snail');
                  save.data.b.f_state_kidd_snailcom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.snailcom);
               }
            }
         }
         break;
      }
      case 'f_napstablook': {
         if (!world.madfish) {
            if (save.data.n.state_foundry_blookmusic > 0) {
               napstamusic(roomState);
            } else {
               !world.genocide || save.data.n.plot < 68 || game.music?.gain.modulate(timer, 0, 0);
            }
            if (roomState.blookie) {
               const napsta = roomState.blookie;
               renderer.attach('main', napsta);
               events.on('teleport').then(() => {
                  renderer.detach('main', napsta);
               });
            }
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide && save.data.n.plot <= 48 && save.data.n.state_foundry_blookdate < 2) {
                  const napsta = character('napstablook', characters.napstablook, { x: 230, y: 100 }, 'down', {
                     anchor: 0,
                     metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'blooktouch' ] },
                     size: { x: 10, y: 10 }
                  });
                  roomState.blookie = napsta;
                  events.on('teleport').then(() => {
                     renderer.detach('main', napsta);
                  });
                  if (save.data.n.state_foundry_blookdate < 1) {
                     save.data.n.state_foundry_blookdate = 1;
                     await timer.when(() => game.movement);
                     game.movement = false;
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_foundry.blookdate1());
                     game.movement = true;
                  }
                  napsta.on('tick', () => {
                     if (world.madfish) {
                        napsta.alpha.value = 0;
                        napsta.metadata.barrier = false;
                        napsta.metadata.interact = false;
                     }
                  });
                  await timer.when(() => roomState.fridge);
                  await timer.pause(350);
                  napsta.face = 'left';
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.blookdate2());
                  await napsta.walk(timer, 3, { x: 130 });
                  player.walk(timer, 3, player.position.add(0, 20)).then(() => {
                     player.face = 'up';
                  });
                  await napsta.walk(timer, 3, { x: 100 }, { y: 85 });
                  await timer.pause(2650);
                  napsta.face = 'down';
                  await timer.pause(350);
                  await dialogue('auto', ...text.a_foundry.blookdate3);
                  if (choicer.result === 1) {
                     napsta.face = 'right';
                  }
                  await dialogue('auto', ...[ text.a_foundry.blookdate4a, text.a_foundry.blookdate4b ][choicer.result]);
                  await timer.pause(1350);
                  napsta.face = 'down';
                  await dialogue('auto', ...text.a_foundry.blookdate5);
                  if (choicer.result === 1) {
                     napsta.face = 'right';
                  }
                  await dialogue('auto', ...[ text.a_foundry.blookdate6a, text.a_foundry.blookdate6b ][choicer.result]);
                  if (choicer.result === 0) {
                     const height = 480;
                     const extent = 200;
                     const synthPromise = CosmosImage.utils.synthesize([
                        CosmosUtils.populate(
                           height,
                           index =>
                              [ Math.round(CosmosMath.wave(index / height - 0.25) * extent), 0, 0, 255 ] as CosmosColor
                        )
                     ]);
                     await Promise.all([
                        content.ieHomeworld.load(),
                        napsta.walk(timer, 3, { x: 140 }, { x: 160, y: 105 }).then(async () => {
                           await timer.pause(450);
                           napsta.face = 'left';
                        }),
                        timer.pause(350).then(() => player.walk(timer, 3, { x: 160, y: 135 }))
                     ]);
                     const synth = await synthPromise;
                     await timer.pause(1250);
                     napsta.alpha.value = 0;
                     const napsta2 = new CosmosSprite({
                        position: napsta.position.subtract(0, 5),
                        anchor: 0,
                        rotation: 90,
                        frames: [ napsta.sprite.frames[0] ]
                     });
                     renderer.attach('main', napsta2);
                     player.rotation.value = -90;
                     player.sprite.anchor.y = 0;
                     player.position.y -= 5;
                     player.face = 'right';
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_foundry.blookdate7);
                     roomState.customsAuto = false;
                     await timer.pause(500);
                     const level = new CosmosValue();
                     renderer.layers.below.modifiers = [];
                     const pc = instance('main', 'f_blookpc')!.object;
                     const bg = renderer.layers.below.objects.filter(
                        obj => obj instanceof CosmosSprite
                     )[0] as CosmosSprite;
                     const moosic = assets.music.napstachords.instance(timer);
                     moosic.rate.value = 0;
                     moosic.gain.value = 0;
                     const template = Sprite.from(BaseTexture.from(synth));
                     template.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
                     const filter = new DisplacementFilter(template);
                     filter.scale.set(25, 1);
                     const offset = new CosmosValue();
                     const fg = new CosmosSprite({
                        alpha: 0,
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        frames: [ content.ieHomeworld ],
                        scale: 0.5,
                        tint: 0x7f7f7f
                     }).on('tick', () => {
                        template.position.set(fg.sprite.position.x, fg.sprite.position.y + offset.value++);
                     });
                     fg.container.addChild(template);
                     fg.sprite.filters = [ filter ];
                     renderer.attach('menu', fg);
                     const normal = game.music!.gain.value;
                     const ticker = () => {
                        pc.alpha.value = 1 - level.value;
                        bg.alpha.value = 1 - level.value;
                        fg.alpha.value = level.value * 0.5;
                        moosic.gain.value = level.value * 0.8;
                        game.music!.gain.value = normal * (1 - level.value);
                        if (roomState.customs) {
                           (roomState.customs as CosmosInstance).gain.value =
                              (1 - level.value) * (roomState.customsLevel as number);
                        }
                     };
                     let activated = false;
                     timer.pause(7000).then(() => {
                        activated = true;
                        moosic.rate.value = 1;
                        level.modulate(timer, 7000, 1);
                     });
                     renderer.on('tick', ticker);
                     renderer.layers.base.container.alpha = 0;
                     await Promise.race([
                        keys.downKey.on('down'),
                        keys.leftKey.on('down'),
                        keys.rightKey.on('down'),
                        keys.upKey.on('down')
                     ]);
                     player.position.y += 5;
                     player.sprite.anchor.y = 1;
                     player.rotation.value = 0;
                     player.face = 'up';
                     await level.modulate(timer, level.value * 2500, 0);
                     renderer.layers.base.container.alpha = 1;
                     renderer.off('tick', ticker);
                     ticker();
                     moosic.stop();
                     renderer.detach('menu', fg);
                     await timer.pause(1000);
                     renderer.detach('main', napsta2);
                     napsta.face = 'down';
                     napsta.alpha.value = 1;
                     await timer.pause(850);
                     await dialogue('auto', ...(activated ? text.a_foundry.blookdate8 : text.a_foundry.blookdate8x));
                     napsta.face = 'up';
                     await timer.pause(850);
                     napsta.face = 'down';
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.blookdate9);
                  }
                  await napsta.walk(timer, 3, { x: 90 }, { y: 235 });
                  save.data.n.state_foundry_blookdate = 2;
                  roomState.blookie = void 0;
                  game.movement = true;
                  await napsta.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', napsta);
               }
            }
         }
         break;
      }
      case 'f_corner': {
         let rendie = false;
         const flowersprite = () =>
            new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iooFEchoflower01, content.iooFEchoflower02 ]
            }).on('render', function () {
               if (rendie) {
                  this.sprite.mask = this.graphics
                     .clear()
                     .beginFill(0, 1)
                     .drawEllipse(
                        player.position.x - this.position.x - this.sprite.position.x,
                        player.position.y - 15 - this.position.y - this.sprite.position.y,
                        20,
                        20
                     )
                     .endFill();
               }
            });
         const flower = new CosmosObject({
            metadata: { tags: 'f_echoCorner' },
            position: { x: 530, y: 150 },
            objects: [
               flowersprite(),
               new CosmosHitbox({
                  anchor: { x: 0, y: -1 },
                  metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'echocorner' ] },
                  size: { x: -20, y: -5 }
               })
            ]
         });
         renderer.attach('main', flower);
         events.on('teleport').then(() => {
            renderer.detach('main', flower);
         });
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 46) {
               if (world.genocide) {
                  await timer.when(() => player.position.x > 100 && game.room === 'f_corner');
                  save.data.n.plot = 46;
                  if (save.flag.n.ga_asrielCorner++ < 1) {
                     await dialogue('dialoguerTop', ...text.a_foundry.genotext.asrielCorner);
                  }
               } else {
                  const twirlAssets = new CosmosInventory(
                     content.iocUndynePullKidd,
                     content.iocUndyneBrandish,
                     content.asGrab,
                     content.asUpgrade
                  );
                  const twirlLoader = twirlAssets.load();
                  const stompLoader = content.asStomp.load();
                  const displayFlower = new CosmosSprite({
                     position: { x: 530, y: 150 },
                     anchor: { x: 0, y: 1 },
                     objects: [ flowersprite() ],
                     frames: [ content.iooFEchoflower01, content.iooFEchoflower02 ]
                  });
                  const sussie = new CosmosHitbox({
                     position: { x: 140, y: 180 },
                     size: { x: 80, y: 20 },
                     metadata: { barrier: true }
                  });
                  const overie = new CosmosSprite({
                     position: { x: 120, y: 180 },
                     frames: [ content.iooFCornerOver ],
                     priority: -2
                  });
                  let manualControl = false;
                  const darkButEpicEEEEEE = new CosmosSprite({
                     alpha: 0,
                     position: { x: 0, y: 40 },
                     frames: [ content.iooFCornerDark ],
                     priority: -1
                  })
                     .on('tick', function () {
                        if (game.room === 'f_corner' && !manualControl) {
                           this.alpha.value = Math.min(
                              Math.max(CosmosMath.bezier((player.position.x - 100) / 300, 0, 0.25, 1), 0),
                              0.95
                           );
                        }
                     })
                     .on('render', function () {
                        this.sprite.mask = this.graphics
                           .clear()
                           .beginFill(0, 1)
                           .drawRect(0, 0, this.sprite.width, this.sprite.height)
                           .endFill()
                           .beginHole()
                           .drawEllipse(
                              player.position.x - this.position.x - this.sprite.position.x,
                              player.position.y - 15 - this.position.y - this.sprite.position.y,
                              20,
                              20
                           )
                           .endHole();
                     });
                  renderer.attach('main', sussie, displayFlower, overie, darkButEpicEEEEEE);
                  rendie = true;
                  isolates([ sussie, displayFlower, overie, darkButEpicEEEEEE ]);
                  await timer.when(() => roomState.trap);
                  await timer.pause(850);
                  renderer.detach('main', sussie, overie);
                  const thatMadFishDoe = character(
                     'undyneArmor',
                     characters.undyneArmor,
                     { x: player.position.x - 240, y: 150 },
                     'right'
                  );
                  const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
                  game.camera = cam;
                  manualControl = true;
                  timer.pause(850).then(() => {
                     player.face = 'left';
                  });
                  await Promise.all([
                     stompLoader,
                     cam.position.modulate(timer, 1650, { x: thatMadFishDoe.position.x + 160 }),
                     darkButEpicEEEEEE.alpha.modulate(timer, 1650, 0)
                  ]);
                  renderer.detach('main', displayFlower, darkButEpicEEEEEE);
                  rendie = false;
                  await timer.pause(1350);
                  let half = false;
                  let fish = thatMadFishDoe.sprite;
                  const stepSFX = () => {
                     if ((half ? fish.index : fish.index % 2) === 1 && fish.step === 0) {
                        assets.sounds.stomp.instance(timer).gain.value = 0.8;
                     }
                  };
                  let endie = false;
                  const movsped = 1;
                  thatMadFishDoe.on('tick', stepSFX);
                  await thatMadFishDoe.walk(timer, movsped, { x: thatMadFishDoe.position.x + 40 });
                  thatMadFishDoe.off('tick', stepSFX);
                  await Promise.all([ timer.pause(850), twirlLoader ]);
                  await dialogue('auto', ...text.a_foundry.cornered1);
                  assets.sounds.grab.instance(timer);
                  const oNoShesAttackinAA = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     resources: content.iocUndyneBrandish,
                     position: thatMadFishDoe.position.value()
                  });
                  half = true;
                  assets.sounds.upgrade.instance(timer);
                  const cover = new CosmosRectangle({
                     alpha: 1,
                     fill: 'white',
                     size: { x: 320, y: 240 }
                  });
                  renderer.attach('main', oNoShesAttackinAA);
                  renderer.attach('menu', cover);
                  fish = oNoShesAttackinAA;
                  thatMadFishDoe.alpha.value = 0;
                  cover.alpha.modulate(timer, 500, 0).then(() => {
                     renderer.detach('menu', cover);
                  });
                  oNoShesAttackinAA.enable();
                  oNoShesAttackinAA.on('tick', stepSFX);
                  while (oNoShesAttackinAA.position.x < 370) {
                     oNoShesAttackinAA.position.x += movsped;
                     await renderer.on('tick');
                  }
                  oNoShesAttackinAA.off('tick', stepSFX);
                  oNoShesAttackinAA.reset();
                  await timer.pause(450);
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_foundry.cornered2);
                  } else if (!endie) {
                     endie = true;
                     await dialogue('auto', ...text.a_foundry.cornered4);
                     await timer.pause(450);
                  }
                  await timer.pause(650);
                  oNoShesAttackinAA.enable();
                  oNoShesAttackinAA.on('tick', stepSFX);
                  while (oNoShesAttackinAA.position.x < 410) {
                     oNoShesAttackinAA.position.x += movsped;
                     await renderer.on('tick');
                  }
                  oNoShesAttackinAA.off('tick', stepSFX);
                  oNoShesAttackinAA.reset();
                  await timer.pause(450);
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_foundry.cornered3);
                     if (choicer.result === 1) {
                        save.data.b.f_state_sacrifice = true;
                        await timer.pause(350);
                     }
                  } else if (!endie) {
                     endie = true;
                     await dialogue('auto', ...text.a_foundry.cornered4);
                     await timer.pause(450);
                  }
                  await timer.pause(650);
                  oNoShesAttackinAA.enable();
                  oNoShesAttackinAA.on('tick', stepSFX);
                  while (oNoShesAttackinAA.position.x < 450) {
                     oNoShesAttackinAA.position.x += movsped;
                     await renderer.on('tick');
                  }
                  oNoShesAttackinAA.off('tick', stepSFX);
                  oNoShesAttackinAA.reset();
                  await timer.pause(450);
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_foundry.cornered3a);
                     if (choicer.result === 1) {
                        save.data.b.f_state_sacrifice = true;
                        await timer.pause(350);
                     }
                  } else if (!endie) {
                     endie = true;
                     await dialogue('auto', ...text.a_foundry.cornered4);
                     await timer.pause(450);
                  }
                  await timer.pause(650);
                  if (choicer.result === 0) {
                     oNoShesAttackinAA.enable();
                     oNoShesAttackinAA.on('tick', stepSFX);
                     while (oNoShesAttackinAA.position.x < 430) {
                        oNoShesAttackinAA.position.x += movsped * 1.5;
                        await renderer.on('tick');
                     }
                     oNoShesAttackinAA.off('tick', stepSFX);
                     oNoShesAttackinAA.reset();
                     {
                        let index = 0;
                        const overlay = new CosmosRectangle({
                           anchor: 0,
                           fill: 'black',
                           size: { x: 1000, y: 1000 },
                           position: renderer.position.clamp(...renderer.region)
                        });
                        renderer.detach('main', player);
                        renderer.attach('above', overlay, player);
                        battler.SOUL.alpha.value = 1;
                        battler.SOUL.position = renderer.projection(player.position.subtract(0, 15));
                        while (index++ < 3) {
                           if (index < 3) {
                              battler.SOUL.alpha.value = 1;
                              assets.sounds.noise.instance(timer);
                              await timer.pause(70 * 3);
                              battler.SOUL.alpha.value = 0;
                              await timer.pause(70 * 3);
                           }
                        }
                        renderer.detach('above', player, overlay);
                        renderer.attach('main', player);
                     }
                  }
                  if (save.data.n.state_foundry_muffet === 1) {
                     assets.sounds.phone.instance(timer);
                     await timer.pause(500);
                     assets.sounds.phone.instance(timer);
                     await timer.pause(1500);
                     Object.assign(thatMadFishDoe.position, oNoShesAttackinAA.position.value());
                     renderer.detach('main', oNoShesAttackinAA);
                     thatMadFishDoe.face = 'right';
                     thatMadFishDoe.alpha.value = 1;
                     await timer.pause(850);
                     thatMadFishDoe.alpha.value = 0;
                     const phoneSpr = new CosmosSprite({
                        position: thatMadFishDoe.position.value(),
                        anchor: { x: 0, y: 1 },
                        frames: [ content.iocUndynePhone ]
                     });
                     renderer.attach('main', phoneSpr);
                     await timer.pause(2500);
                     await dialogue('auto', ...text.a_foundry.cornered9);
                     renderer.detach('main', phoneSpr);
                     thatMadFishDoe.alpha.value = 1;
                     thatMadFishDoe.face = 'up';
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_foundry.cornered10);
                     await timer.pause(350);
                     thatMadFishDoe.face = 'right';
                     await timer.pause(950);
                     await dialogue('auto', ...text.a_foundry.cornered11);
                     thatMadFishDoe.face = 'left';
                     await timer.pause(850);
                     thatMadFishDoe.on('tick', stepSFX);
                     await thatMadFishDoe.walk(timer, movsped * 3, {
                        x: cam.position.clamp(...renderer.region).x - 180
                     });
                  } else {
                     const kidd = character(
                        'kidd',
                        characters.kidd,
                        { x: renderer.position.clamp(...renderer.region).x - 180, y: 150 },
                        'right'
                     );
                     kidd.walk(timer, 4, oNoShesAttackinAA.position.subtract(50, 1));
                     await timer.when(() => kidd.position.x > oNoShesAttackinAA.position.x - 140);
                     await dialogue('auto', ...text.a_foundry.cornered5);
                     await timer.pause(500);
                     half = false;
                     Object.assign(thatMadFishDoe.position, oNoShesAttackinAA.position.value());
                     renderer.detach('main', oNoShesAttackinAA);
                     thatMadFishDoe.alpha.value = 1;
                     await timer.pause(1500);
                     await dialogue('auto', ...text.a_foundry.cornered6);
                     timer.pause(650).then(() => {
                        dialogue('auto', ...text.a_foundry.cornered7);
                        timer.pause(4000).then(() => {
                           typer.text('');
                        });
                     });
                     await thatMadFishDoe.walk(timer, movsped * 2.2, kidd.position.subtract(23.5, 0));
                     oNoShesAttackinAA.use(content.iocUndynePullKidd);
                     Object.assign(oNoShesAttackinAA.position, thatMadFishDoe.position.value());
                     thatMadFishDoe.alpha.value = 0;
                     renderer.detach('main', kidd);
                     renderer.attach('main', oNoShesAttackinAA);
                     oNoShesAttackinAA.enable();
                     oNoShesAttackinAA.on('tick', stepSFX);
                     while (oNoShesAttackinAA.position.x > 200) {
                        oNoShesAttackinAA.position.x -= movsped * 1.7;
                        await renderer.on('tick');
                     }
                  }
                  renderer.detach('main', oNoShesAttackinAA, thatMadFishDoe);
                  await timer.pause(350);
                  await cam.position.modulate(timer, 1650, player.position.clamp(...renderer.region));
                  game.camera = player;
                  game.movement = true;
                  game.music!.gain.value = world.level;
               }
            }
         }
         break;
      }
      case 'f_bridge': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide) {
               if (save.data.n.plot < 47) {
                  await timer.when(() => game.room === 'f_bridge' && player.position.x > 260);
                  save.data.n.plot = 47;
                  await dialogue('auto', ...text.a_foundry.genotext.kiddFinal1());
               }
               if (save.data.n.plot < 47.01) {
                  await timer.when(() => game.room === 'f_bridge' && player.position.x > 460);
                  save.data.n.plot = 47.01;
                  await dialogue('auto', ...text.a_foundry.genotext.kiddFinal2);
               }
            } else if (save.data.n.plot < 47 && save.data.n.state_foundry_muffet !== 1) {
               await timer.when(() => player.position.x > 400 && game.room === 'f_bridge');
               game.movement = false;
               save.data.n.plot = 47;
               game.music && (game.music.gain.value = 0);
               await dialogue('auto', ...text.a_foundry.kiddbridge1);
               const kidd = character('kidd', characters.kidd, { x: 140, y: player.position.y }, 'right', {
                  key: 'kidd',
                  size: { x: 35, y: 100 },
                  anchor: 0,
                  metadata: { interact: true, name: 'foundry', args: [ 'kiddtrip', 'save' ] },
                  tint: assets.tints.dark01
               });
               const OGpos = player.position.clamp(...renderer.region).value();
               const cam = new CosmosObject({ position: OGpos });
               game.camera = cam;
               await cam.position.modulate(timer, 1200, { x: 280, y: OGpos.y });
               await kidd.walk(timer, 2, { x: player.position.x - 200 });
               await timer.pause(1350);
               await kidd.walk(timer, 2, { x: player.position.x - 40 });
               await timer.pause(350);
               kidd.face = 'down';
               await timer.pause(750);
               kidd.face = 'right';
               await timer.pause(1250);
               await dialogue('auto', ...text.a_foundry.kiddbridge2);
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_foundry.kiddbridge3a());
                  if (!save.data.b.oops) {
                     kidd.walk(timer, 4, { x: cam.position.x - 200 });
                     await timer.pause(1250);
                     await cam.position.modulate(timer, 1200, OGpos);
                     renderer.detach('main', kidd);
                     game.camera = player;
                     game.movement = true;
                     game.menu = true;
                     break;
                  }
               } else {
                  if (!save.data.b.oops) {
                     oops();
                     await timer.pause(1000);
                  }
                  await dialogue('auto', ...text.a_foundry.kiddbridge3b);
               }
               kidd.sprite.duration = 5;
               kidd.sprite.enable();
               await kidd.position.modulate(timer, 500, kidd.position.subtract(15, 0));
               kidd.sprite.reset();
               await timer.pause(650);
               kidd.face = 'left';
               await timer.pause(1150);
               await kidd.walk(timer, 4, { x: 300, y: 140 });
               let ruins = 0;
               const tripAnim = new CosmosAnimation({
                  active: true,
                  extrapolate: false,
                  anchor: { x: 0, y: 1 },
                  position: kidd.position.add(-18, 0),
                  resources: content.iocKiddDarkLeftTrip,
                  duration: 6
               }).on('tick', function () {
                  if (this.index === 1 && this.step === this.duration - 1) {
                     if (ruins++ < 2) {
                        this.step = 0;
                        this.index = 0;
                     } else {
                        this.disable();
                     }
                  }
               });
               kidd.position = tripAnim.position.clone();
               kidd.alpha.value = 0;
               renderer.attach('main', tripAnim);
               await timer.when(() => ruins > 2);
               const cover = new CosmosRectangle({
                  alpha: 0,
                  fill: 'white',
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', cover);
               await cover.alpha.modulate(timer, 150, 1);
               kidd.alpha.value = 1;
               renderer.detach('main', tripAnim);
               await timer.pause(550);
               kidd.face = 'up';
               kidd.position.y += 28;
               kidd.sprite.anchor.y = -1;
               kidd.rotation.value = 180;
               cover.alpha.modulate(timer, 150, 0).then(() => {
                  renderer.detach('menu', cover);
               });
               await timer.pause(150);
               await dialogue('auto', ...text.a_foundry.kiddbridge4);
               const epos = cam.position.clone();
               await cam.position.modulate(timer, 1200, player.position.clamp(...renderer.region));
               game.camera = player;
               game.menu = false;
               game.movement = true;
               let hover = true;
               let controller = false;
               const time = timer.value;
               const fishShake = new CosmosValue();
               const fishPosition = new CosmosPoint();
               const fish = character('undyneArmor', characters.undyneArmor, epos.subtract(180, -20), 'right', {
                  size: { x: 35, y: 100 },
                  anchor: 0,
                  metadata: { trigger: true, name: 'foundry', args: [ 'kiddtrip', 'charge' ] },
                  tint: assets.tints.dark01
               }).on('tick', function () {
                  if (controller) {
                     this.position = fishPosition.add(
                        (Math.random() - 0.5) * fishShake.value * 2,
                        (Math.random() - 0.5) * fishShake.value * 2
                     );
                     if (hover) {
                        this.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                     }
                  }
               });
               const stepSFX = () => {
                  if (game.room === 'f_bridge' && fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                     assets.sounds.stomp.instance(timer).gain.value = Math.min(
                        Math.max(CosmosMath.remap(fish.position.x, 0, 0.6, epos.x - 200, epos.x - 140), 0),
                        1
                     );
                  }
               };
               let done = false;
               const donePromise = timer.when(() => done);
               const savedPromise = Promise.race([ donePromise, timer.when(() => roomState.saved) ]).then(async () => {
                  if (!done) {
                     cover.fill = 'black';
                     renderer.attach('menu', cover);
                     await cover.alpha.modulate(timer, 500, 1);
                     await timer.pause(300);
                     fish.position.x = Math.max(160, fish.position.x);
                     kidd.rotation.value = 0;
                     kidd.sprite.anchor.y = 1;
                     kidd.face = 'right';
                     player.face = 'left';
                     Object.assign(kidd.position, player.position.subtract(25, 0));
                     await cover.alpha.modulate(timer, 500, 0);
                     await timer.pause(1150);
                     await kidd.walk(timer, 2, fish.position.add(35, 0));
                     kidd.face = 'left';
                     await dialogue('auto', ...text.a_foundry.kiddbridge5);
                     await timer.pause(150);
                     fish.sprite.duration = 5;
                     fish.sprite.enable();
                     fish.on('tick', stepSFX);
                     await fish.position.modulate(timer, 500, fish.position.add(-10, 0));
                     fish.off('tick', stepSFX);
                     fish.sprite.reset();
                     await timer.pause(1150);
                     fish.sprite.enable();
                     fish.on('tick', stepSFX);
                     await fish.position.modulate(timer, 500, fish.position.add(-10, 0));
                     fish.off('tick', stepSFX);
                     fish.sprite.reset();
                     await timer.pause(1150);
                     fish.on('tick', stepSFX);
                     await fish.walk(timer, 3, { x: epos.x - 200 });
                     fish.off('tick', stepSFX);
                     kidd.face = 'right';
                     await timer.pause(650);
                     kidd.face = 'left';
                     await kidd.walk(timer, 3, {
                        x: Math.max(player.position.x - 30, kidd.position.x)
                     });
                     await dialogue('auto', ...text.a_foundry.kiddbridge6);
                     kidd.face = 'left';
                     await timer.pause(650);
                     await kidd.walk(timer, 1.5, kidd.position.subtract(40, 0));
                     await timer.pause(650);
                     kidd.face = 'right';
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.kiddbridge7);
                     await kidd.walk(timer, 3, {
                        x: player.position.clamp(...renderer.region).x - 200
                     });
                  }
               });
               events.on('teleport').then(async () => {
                  if (!done) {
                     done = true;
                     kidd.sprite.anchor.y = 1;
                     renderer.detach('main', kidd, fish);
                     await timer.when(() => game.movement);
                     game.movement = false;
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.kiddbridge8);
                     game.movement = true;
                     game.menu = true;
                     game.music && (game.music.gain.value = world.level);
                  }
               });
               const chargePromise = timer.when(() => roomState.charged);
               let garb = false;
               let remind = false;
               while (!roomState.saved && game.room === 'f_bridge') {
                  if (roomState.charged || fish.position.x > kidd.position.x - 70) {
                     garb = true;
                     game.movement = false;
                     kidd.sprite.enable();
                     await dialogue('auto', ...text.a_foundry.kiddbridge4b);
                     const sfxAssets = new CosmosInventory(content.asBoom, content.asLanding, content.asJetpack);
                     const sfxLoader = sfxAssets.load();
                     await kidd.position.modulate(timer, 500, { y: kidd.position.y - 5 });
                     await timer.pause(850);
                     kidd.position.modulate(timer, 1500, kidd.position.value(), { y: -30 });
                     await timer.pause(150);
                     assets.sounds.notify.instance(timer);
                     const notifier = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: renderer.projection(fish.position.subtract(0, 56)),
                        resources: content.ibuNotify
                     });
                     renderer.attach('menu', notifier);
                     await timer.pause(350);
                     renderer.detach('menu', notifier);
                     fish.face = 'up';
                     await Promise.all([ timer.pause(650), sfxLoader ]);
                     fish.preset = characters.undyneArmorJetpack;
                     assets.sounds.noise.instance(timer).gain.value = 0.5;
                     const flame = assets.sounds.jetpack.instance(timer);
                     flame.gain.value = 0.2;
                     controller = true;
                     Object.assign(fishPosition, fish.position.value());
                     await fishShake.modulate(timer, 350, 1);
                     hover = true;
                     timer.pause(400).then(() => {
                        fishShake.modulate(timer, 700, 0);
                     });
                     timer.pause(500).then(() => {
                        assets.sounds.boom.instance(timer).rate.value = 0.5;
                     });
                     await fishPosition.modulate(timer, 1000, {}, { y: -50 }, { y: -50 });
                     await timer.pause(1000);
                     assets.sounds.landing.instance(timer);
                     flame.stop();
                     await timer.pause(2150);
                     await dialogue('auto', ...text.a_foundry.kiddbridgeX((states.rooms.f_bridge ??= {}).charged));
                     save.data.b.f_state_kidd_betray = true;
                     await timer.pause(650);
                     sfxAssets.unload();
                     break;
                  } else if (fish.position.x > kidd.position.x - 110) {
                     if (!remind) {
                        remind = true;
                        dialogue('auto', ...text.a_foundry.kiddbridge4a);
                     }
                  }
                  fish.on('tick', stepSFX);
                  fish.face = 'right';
                  fish.sprite.enable();
                  fish.sprite.duration = 5;
                  const targie = fish.position.x + 30;
                  while (game.room === 'f_bridge' && fish.position.x < targie) {
                     fish.position.x += 2;
                     await renderer.on('tick');
                  }
                  fish.sprite.reset();
                  fish.off('tick', stepSFX);
                  if (game.room === 'f_bridge') {
                     await Promise.race([ timer.pause(2650), chargePromise ]);
                  } else {
                     break;
                  }
               }
               if (game.room === 'f_bridge') {
                  garb || (await savedPromise);
                  done = true;
                  renderer.detach('main', kidd, fish);
                  game.movement = true;
                  game.menu = true;
                  game.music && (game.music.gain.value = world.level);
               }
            }
            break;
         }
         break;
      }
      case 'f_pacing': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide) {
               if (save.data.n.plot < 47.02) {
                  await timer.when(() => game.room === 'f_pacing' && player.position.x > 260);
                  save.data.n.plot = 47.02;
                  await dialogue('auto', ...text.a_foundry.genotext.kiddFinal3());
               }
            }
         }
         break;
      }
      case 'f_battle': {
         (world.genocide || 48 <= save.data.n.plot) && instance('main', 'sleepersans')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide) {
               if (save.data.n.plot < 47.1) {
                  const fishAzzets = new CosmosInventory(inventories.iocUndyne, content.avUndyne);
                  const fishLoader = fishAzzets.load();
                  const undyneLoaduh = battler.load(groups.undyne);
                  await timer.when(() => game.room === 'f_battle' && player.position.x > 200 && game.movement);
                  game.movement = false;
                  save.data.n.plot = 47.1;
                  const UF = save.flag.n.undying;
                  await Promise.all([ fishLoader, timer.pause(UF === 0 ? 850 : 350) ]);
                  const fish = character('undyne', characters.undyne, { x: 500, y: 200 }, 'right');
                  isolate(fish);
                  const cam = new CosmosObject({ position: player.position.value() });
                  game.camera = cam;
                  if (UF === 0) {
                     await cam.position.modulate(timer, 1000, { x: 350 });
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_foundry.genotext.kiddFinal4);
                     await timer.pause(650);
                     await cam.position.modulate(timer, 1000, player.position.value());
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.genotext.kiddFinal5);
                     await timer.pause(450);
                  }
                  goatbro.face = 'left';
                  await timer.pause(UF === 0 ? 850 : 650);
                  const impact = assets.sounds.impact.instance(timer);
                  impact.rate.value = 1 / 3;
                  dialogue('auto', ...text.a_foundry.genotext.kiddFinal6);
                  await timer.pause(125);
                  epicgamer.metadata.override = true;
                  epicgamer.face = 'right';
                  assets.sounds.notify.instance(timer);
                  const notifier = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: renderer.projection(epicgamer.position.subtract(0, 29)),
                     resources: content.ibuNotify
                  });
                  renderer.attach('menu', notifier);
                  await timer.pause(450);
                  renderer.detach('menu', notifier);
                  epicgamer.sprites.right.duration = 15;
                  epicgamer.sprites.right.enable();
                  await epicgamer.position.modulate(timer, UF === 0 ? 500 : 350, epicgamer.position.add(-5, 0));
                  epicgamer.sprites.right.disable();
                  await timer.pause(UF === 0 ? 850 : 450);
                  await epicgamer.walk(timer, 3, { y: 230 }, { x: player.position.x, y: 230 });
                  game.camera = epicgamer;
                  await epicgamer.walk(timer, 3, { x: 300 }, { x: 350, y: 220 });
                  UF === 0 && (await timer.pause(950));
                  await epicgamer.walk(timer, UF === 0 ? 1.5 : 3, { x: 440 }, { x: 470, y: 200 });
                  await timer.pause(UF === 0 ? 1150 : 150);
                  assets.sounds.notify.instance(timer);
                  notifier.position.set(renderer.projection(fish.position.subtract(0, 51)));
                  renderer.attach('menu', notifier);
                  await timer.pause(450);
                  renderer.detach('menu', notifier);
                  fish.face = 'left';
                  await timer.pause(UF === 0 ? 850 : 350);
                  UF === 0 && (await dialogue('auto', ...text.a_foundry.genotext.kiddFinal7));
                  const white = new CosmosRectangle({
                     alpha: 0,
                     priority: 10,
                     size: { x: 320, y: 240 },
                     fill: 'white'
                  });
                  const swinger = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     scale: 0.5,
                     resources: content.ibuSwing,
                     position: renderer.projection(fish.position)
                  }).on('tick', function () {
                     if (this.index === 5 && this.step === this.duration - 1) {
                        this.alpha.value = 0;
                     }
                  });
                  const black = new CosmosRectangle({
                     size: { x: 320, y: 240 },
                     fill: 'black',
                     objects: [ white, swinger ]
                  });
                  renderer.attach('menu', black);
                  assets.sounds.swing.instance(timer);
                  const cym = assets.sounds.cymbal.instance(timer, { offset: UF === 0 ? 2.5 : 3.5 });
                  cym.gain.value /= 4;
                  cym.gain.modulate(timer, UF === 0 ? 2500 : 1500, cym.gain.value * 4);
                  await timer.pause(500);
                  await Promise.all([ white.alpha.modulate(timer, UF === 0 ? 2000 : 1000, 1), undyneLoaduh ]);
                  const b = battler.start(groups.undyne);
                  await timer.pause();
                  renderer.detach('menu', black);
                  cym.stop();
                  player.face = 'right';
                  player.position.set(500, 200);
                  renderer.detach('main', fish, epicgamer);
                  goatbro.metadata.reposition = true;
                  game.camera = player;
                  await b;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel43());
                  await timer.pause(2350);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel44);
                  let done = false;
                  goatbro.metadata.override = true;
                  Promise.all([
                     player.walk(timer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1520, y: 220 }),
                     goatbro.walk(timer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1520, y: 220 })
                  ]).then(async () => {
                     const overlay1 = new CosmosRectangle({
                        alpha: 0,
                        fill: 'black',
                        size: { x: 1000, y: 1000 },
                        anchor: 0
                     }).on('tick', function () {
                        this.position.set(player.position);
                     });
                     renderer.attach('main', overlay1);
                     await overlay1.alpha.modulate(timer, 1000, 1);
                     await timer.when(() => done);
                     renderer.detach('main', overlay1);
                  });
                  await timer.pause(850);
                  goatbro.key = '';
                  await dialogue('auto', ...text.a_foundry.genotext.asriel45);
                  goatbro.key = 'asriel2';
                  await timer.pause(650);
                  // get menu container
                  const menu = renderer.layers.menu.container;
                  // remove menu container
                  renderer.application.stage.removeChild(menu);
                  // remove and retrieve other containers
                  const others = renderer.application.stage.removeChildren(
                     0,
                     renderer.application.stage.children.length
                  );
                  // make new subcontainer
                  const subcontainer = new Container();
                  // populate subcontainer
                  subcontainer.addChild(...others);
                  // add subcontainer and (leftover) menu container to stage
                  renderer.application.stage.addChild(subcontainer, menu);
                  // script
                  const CRT = new CRTFilter({
                     curvature: 0,
                     lineContrast: 0.15,
                     lineWidth: 5,
                     noise: 0.15,
                     noiseSize: 1.5,
                     vignetting: 0.1,
                     vignettingAlpha: 0.25,
                     vignettingBlur: 0.75
                  });
                  const tvticker = () => {
                     CRT.time += 0.5;
                  };
                  subcontainer.filters = [ CRT ];
                  renderer.on('tick', tvticker);
                  const overlay2 = new CosmosRectangle({
                     alpha: 0.45,
                     fill: 'black',
                     size: { x: 1000, y: 1000 },
                     anchor: 0
                  }).on('tick', function () {
                     this.position.set(player.position);
                  });
                  renderer.attach('main', overlay2);
                  renderer.zoom.value = 0.7;
                  const regdiff = 160 / renderer.zoom.value - 160;
                  renderer.region[1].x -= regdiff;
                  await timer.pause(1950);
                  await dialogue('auto', ...text.a_foundry.genotext.bombshell1);
                  await timer.pause(1750);
                  await dialogue('auto', ...text.a_foundry.genotext.bombshell2);
                  await timer.pause(1950);
                  await dialogue('auto', ...text.a_foundry.genotext.bombshell3);
                  await timer.pause(1550);
                  await dialogue('auto', ...text.a_foundry.genotext.bombshell4);
                  const overlay3 = new CosmosRectangle({
                     fill: 'black',
                     alpha: 0,
                     size: { x: 320, y: 240 }
                  });
                  renderer.attach('menu', overlay3);
                  await overlay3.alpha.modulate(timer, 3000, 1);
                  // remove all containers again
                  renderer.off('tick', tvticker);
                  renderer.application.stage.removeChildren(0, renderer.application.stage.children.length);
                  // restore original setup
                  renderer.application.stage.addChild(...others, menu);
                  // end cutscene
                  done = true;
                  renderer.detach('main', overlay2);
                  await teleport('a_start', 'right', 20, 280, world);
                  save.data.n.plot = 48;
                  renderer.zoom.value = 1;
                  renderer.detach('menu', overlay3);
                  goatbro.metadata.override = false;
                  goatbro.metadata.reposition = true;
                  game.movement = true;
               }
            }
         }
         break;
      }
      case 'f_undyne': {
         if (save.data.n.plot_date === 1.3) {
            save.data.b.f_state_exitdate = true;
            game.music?.gain.modulate(timer, 0, 0);
            (instance('main', 'f_undyne_door')!.object.objects[0] as CosmosAnimation).index = 7;
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = false;
            barrier.metadata.trigger = true;
            barrier.metadata.name = 'teleport';
            barrier.metadata.args = [ 'f_kitchen', 'up', '160', '230' ];
            save.data.n.plot_date = 1.3;
            events.on('teleport').then(([ f, t ]) => {
               if (t === 'f_hub') {
                  game.music?.gain.modulate(timer, 300, world.level);
               }
            });
         } else if (
            !world.genocide &&
            save.data.n.state_starton_papyrus < 1 &&
            1 <= save.data.n.plot_date &&
            save.data.n.plot_date < 1.3 &&
            save.data.n.plot > 47.2
         ) {
            game.music?.gain.modulate(timer, 0, 0);
            const trueMusic = (roomState.trueMusic = assets.music.undynepiano.instance(timer));
            roomState.papdater && renderer.attach('main', roomState.papdater);
            const papy = (roomState.papdater ??= character('papyrus', characters.papyrus, { x: 160, y: 110 }, 'down', {
               size: { x: 20, y: 5 },
               anchor: { x: 0, y: 1 },
               metadata: {
                  barrier: true,
                  interact: true,
                  name: 'foundry',
                  args: [ 'unddate' ]
               }
            })) as CosmosCharacter;
            papy.on('tick', () => {
               papy.metadata.override || (papy.face = CosmosMath.cardinal(papy.position.angleTo(player.position)));
            });
            events.on('teleport').then(([ f, t ]) => {
               trueMusic.stop();
               renderer.detach('main', papy);
               if (t === 'f_hub') {
                  game.music?.gain.modulate(timer, 300, world.level);
               }
            });
         }
         break;
      }
      case 'f_kitchen': {
         if (roomState.cutsceneInit) {
            break;
         } else {
            roomState.cutsceneInit = true;
         }
         const flamer = instance('main', 'k_flamer')!.object;
         flamer.alpha.value = 0;
         const moosicLoader = content.amDatingfight.load();
         const papy = character('papyrus', characters.papyrus, { x: 140, y: 180 }, 'up');
         const undyne = character('undyneDate', characters.undyneDate, { x: 160, y: 100 }, 'down', {
            key: 'undyne',
            size: { x: 20, y: 5 },
            anchor: 0,
            metadata: { name: 'foundry', args: [ 'unddate', 'fish' ], barrier: true, interact: true }
         }).on('tick', function () {
            if (game.room === 'f_kitchen') {
               this.alpha.value = 1;
               this.metadata.barrier = true;
               this.metadata.interact = true;
            } else {
               this.alpha.value = 0;
               this.metadata.barrier = false;
               this.metadata.interact = false;
            }
         });
         const drawer = instance('main', 'k_bonedrawer')!.object.objects[0] as CosmosAnimation;
         drawer.subcrop.top = 25;
         const broadsword = instance('main', 'k_broadsword')!.object;
         for (const object of broadsword.objects) {
            if (object instanceof CosmosHitbox) {
               object.rotation.value = 45;
               object.metadata.interact = true;
               object.metadata.name = 'trivia';
               object.metadata.args = [ 'k_broadsword' ];
               break;
            }
         }
         await timer.when(() => game.movement);
         game.movement = false;
         player.face = 'up';
         const blocker = new CosmosObject({
            fill: 'black',
            position: { x: 140, y: 200 },
            priority: 1000,
            objects: [
               new CosmosRectangle({ alpha: 0, size: { x: 60, y: 40 }, position: { x: -10 } }),
               new CosmosRectangle({ size: { y: 40 } }),
               new CosmosRectangle({ anchor: { x: 1 }, position: { x: 40 }, size: { y: 40 } }),
               new CosmosHitbox({ size: 40, metadata: { barrier: true } }).on('tick', function () {
                  this.metadata.barrier = game.room === 'f_kitchen';
               })
            ]
         }).on('tick', function () {
            this.alpha.value = game.room === 'f_kitchen' ? 1 : 0;
         });
         player.walk(timer, 3, { x: 160, y: 195 }).then(async () => {
            renderer.attach('main', blocker);
            await Promise.all([
               blocker.objects[0].alpha.modulate(timer, 400, 1),
               (blocker.objects[1] as CosmosRectangle).size.modulate(timer, 400, { x: 20 }),
               (blocker.objects[2] as CosmosRectangle).size.modulate(timer, 400, { x: 20 })
            ]);
            assets.sounds.pathway.instance(timer);
            shake(2, 300);
         });
         await timer.pause(2000);
         if (save.data.b.f_state_exitdate) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate5x);
            await timer.pause(1200);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate5);
            const handout = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusPresent2
            });
            renderer.detach('main', papy);
            renderer.attach('main', handout);
            handout.enable();
            await timer.when(() => handout.index === 4);
            handout.disable();
            await timer.pause(1400);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate6);
            await undyne.walk(timer, 3, { y: 170 });
            handout.index = 5;
            await undyne.walk(timer, 3, { y: 130 });
            undyne.face = 'down';
            renderer.detach('main', handout);
            renderer.attach('main', papy);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate7);
            await undyne.walk(timer, 3, { y: 90 }, { x: 150, y: 90 });
            await timer.pause(1000);
            assets.sounds.noise.instance(timer);
            while (drawer.subcrop.top > 0) {
               await drawer.on('render');
               drawer.subcrop.top -= 2;
            }
            drawer.subcrop.top = 0;
            await timer.pause(800);
            drawer.index = 1;
            await timer.pause(1400);
            while (drawer.subcrop.top < 25) {
               await drawer.on('render');
               drawer.subcrop.top += 2;
            }
            drawer.subcrop.top = 25;
            assets.sounds.noise.instance(timer);
            await timer.pause(1000);
            await undyne.walk(timer, 3, { x: 160 }, { y: 100 });
            undyne.face = 'down';
         }
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate8);
         papy.face = 'left';
         await timer.pause(600);
         papy.face = 'right';
         await timer.pause(600);
         papy.face = 'down';
         await timer.pause(1200);
         papy.face = 'up';
         await timer.pause(1400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate9);
         assets.sounds.equip.instance(timer);
         await timer.pause(500);
         undyne.face = 'left';
         const filter1 = new MotionBlurFilter([ 1, 0 ], 7, -1);
         const filter2 = new AdvancedBloomFilter({
            threshold: 0,
            bloomScale: 0,
            quality: 5
         });
         renderer.detach('main', papy);
         const jumper = new CosmosAnimation({
            area: renderer.area,
            anchor: { x: 0, y: 1 },
            position: papy,
            resources: content.iocPapyrusLeap,
            filters: [ filter1, filter2 ]
         }).on('tick', function () {
            if (this.y < 0) {
               renderer.detach('main', this);
            } else if (this.velocity.y < 0) {
               quickshadow(this, this, 'main');
            }
         });
         renderer.attach('main', jumper);
         let offx = -1;
         const windu = instance('main', 'k_window')!.object.objects[0] as CosmosAnimation;
         jumper.enable();
         await timer.when(() => jumper.index === 2);
         jumper.disable();
         while (filter1.velocity.x < 40) {
            filter1.velocity.x *= 1.15;
            const scalar = Math.min(Math.max(filter1.velocity.x / 40, 0), 1);
            filter2.bloomScale = scalar * 4;
            jumper.position.x += offx / 5;
            offx *= -1;
            if (offx < 0) {
               offx -= 1;
            } else {
               offx += 1;
            }
            await jumper.on('render');
         }
         jumper.alpha.value = 1;
         filter1.velocity.x = 0;
         filter1.velocity.y = 30;
         jumper.index = 3;
         jumper.velocity.y = -20;
         assets.sounds.stab.instance(timer);
         shake(2, 500);
         await timer.pause(66);
         assets.sounds.superstrike.instance(timer).gain.value /= 2;
         await timer.pause(133);
         assets.sounds.glassbreak.instance(timer);
         windu.index = 1;
         shake(4, 1000);
         await timer.pause(1500);
         undyne.face = 'down';
         await timer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate10);
         if (choicer.result === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a);
            if (choicer.result === 0) {
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a1a);
               await timer.pause(1600);
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a1b);
            } else {
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a2);
            }
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate11b);
         }
         const dateOMG = new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            position: undyne.position,
            resources: content.iocUndyneDateOMG
         });
         renderer.detach('main', undyne);
         renderer.attach('main', dateOMG);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate12a);
         renderer.detach('main', dateOMG);
         renderer.attach('main', undyne);
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'left';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate12b);
         dateOMG.active = false;
         await timer.pause(500);
         undyne.face = 'down';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate12c);
         undyne.sprite.reset();
         const datemusic = assets.music.datingstart.instance(timer);
         const snacc = new CosmosSprite({
            position: { x: 90, y: 60 },
            anchor: 0,
            metadata: {
               tags: [ 'snacc' ]
            },
            priority: -1000,
            frames: [ content.iooFSnack ],
            objects: [
               new CosmosHitbox({
                  anchor: { x: 0 },
                  size: { x: 20, y: 20 },
                  metadata: { interact: true, name: 'foundry', args: [ 'unddate', 'snack' ] }
               }).on('tick', function () {
                  this.metadata.interact = game.room === 'f_kitchen';
               })
            ]
         }).on('tick', function () {
            this.alpha.value = game.room === 'f_kitchen' ? 1 : 0;
         });
         game.movement = true;
         timer
            .when(() => roomState.snack || roomState.sittah)
            .then(async () => {
               if (roomState.snack) {
                  undyne.preset = characters.undyneDate;
                  await undyne.walk(timer, 3, { x: 60 }, { x: 60, y: 65 });
                  await timer.pause(2400);
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate13a2);
                  await undyne.walk(timer, 3, { y: 90 }, { x: snacc.position.x, y: 90 });
                  undyne.face = 'up';
                  renderer.attach('main', snacc);
                  await timer.pause(1200);
                  await undyne.walk(timer, 3, { x: 160 }, { x: 160, y: 100 });
                  undyne.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate13a3);
                  undyne.preset = characters.undyneDateSpecial;
                  roomState.snacked = true;
               }
            });
         await timer.when(() => roomState.sittah);
         player.position.y < 160 && (player.priority.value = 1000);
         await player.position.step(timer, 1.5, { x: 210, y: 160 });
         player.priority.value = 1000;
         player.face = 'up';
         await timer.pause(1000);
         if (save.data.b.water) {
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15b);
            save.data.b.water = false;
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15c);
         } else {
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15a);
         }
         undyne.preset = characters.undyneDate;
         await undyne.walk(timer, 3, { x: 260 }, { x: 260, y: 82.5 });
         await timer.pause(2300);
         const drink1 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 230, y: 62 },
            resources: content.iooFDrinkTea
         });
         const drink2 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 210, y: 62 },
            resources: content.iooFDrinkHotchocolate
         });
         const drink3 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 190, y: 62 },
            resources: content.iooFDrinkSoda
         });
         const drink4 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 160, y: 62 },
            resources: content.iooFDrinkSugar
         });
         const drink5 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 130, y: 62 },
            resources: content.iooFDrinkWater
         });
         await undyne.walk(timer, 3, { y: 90 });
         const drinks = [ drink1, drink2, drink3, drink4, drink5 ];
         for (const drink of drinks) {
            await undyne.walk(timer, 3, { x: drink.position.x });
            undyne.face = 'up';
            await timer.pause(900);
            renderer.attach('main', drink);
         }
         await undyne.walk(timer, 3, { x: 115 }, { x: 115, y: 135 });
         undyne.preset = characters.undyneDateSpecial;
         await dialogue('dialoguerTop', ...text.a_foundry.unddate16);
         await Promise.race([
            keys.upKey.on('down'),
            keys.leftKey.on('down'),
            keys.rightKey.on('down'),
            keys.downKey.on('down')
         ]);
         let tut = true;
         let sel = true;
         let curtext = '';
         let targetIndex = -1;
         const OGgain = datemusic.gain.value;
         datemusic.gain.value = 0;
         const thrower = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: undyne.position,
            resources: content.iocUndyneDateThrow
         });
         const stabStart = thrower.position.add(12, -38);
         const stabTarget = new CosmosPoint(215, 125);
         const stabAngle = stabStart.angleTo(stabTarget);
         const stabEnd = stabTarget.endpoint(stabAngle, -44);
         const rotassoc = [ 110, 122, 138, 150, 166, 180, 194, 214, 255 ];
         const stabber = new CosmosSprite({
            frames: [ content.iooFSpear ],
            position: stabStart,
            rotation: stabAngle - 90,
            velocity: new CosmosPoint().endpoint(stabAngle, 12),
            anchor: { x: 0 },
            metadata: { state: 0, hit: void 0 as boolean | void }
         }).on('tick', function () {
            switch (this.metadata.state) {
               case 0:
                  if (this.position.x > stabEnd.x || this.position.y > stabEnd.y) {
                     this.metadata.state = 1;
                     this.metadata.hit = true;
                     this.velocity.set(0);
                     this.position.set(stabEnd);
                     this.frames[0] = content.iooFSpearStab;
                     for (const subobject of instance('main', 'k_table')!.object.objects) {
                        if (subobject instanceof CosmosSprite) {
                           subobject.index = 1;
                           break;
                        }
                     }
                     {
                        const whitefader = new CosmosRectangle({ fill: '#fff', size: { x: 320, y: 240 } });
                        renderer.attach('menu', whitefader);
                        whitefader.alpha.modulate(timer, 300, 0).then(() => {
                           renderer.detach('menu', whitefader);
                        });
                     }
                     assets.sounds.landing.instance(timer);
                     shake(4, 1000);
                  }
                  break;
               case 2:
                  if (sel) {
                     const inc = keys.specialKey.active() ? 2 : 1;
                     keys.leftKey.active() && (this.rotation.value -= inc);
                     keys.rightKey.active() && (this.rotation.value += inc);
                     this.rotation.value = Math.min(Math.max(this.rotation.value, 100), 260);
                     targetIndex = -1;
                     curtext = tut ? text.a_foundry.unddate19x : '';
                     for (const [ index, angle ] of rotassoc.entries()) {
                        if (Math.abs(this.rotation.value - angle) <= 5) {
                           targetIndex = index;
                           curtext = text.a_foundry.unddate19y[index];
                           tut = false;
                           break;
                        }
                     }
                  }
                  break;
            }
         });
         renderer.detach('main', undyne);
         renderer.attach('main', thrower, stabber);
         thrower.enable();
         assets.sounds.arrow.instance(timer);
         stabber.on('render').then(() => {
            stabber.priority.value = 999;
         });
         await timer.when(() => thrower.index === 2);
         renderer.detach('main', thrower);
         renderer.attach('main', undyne);
         undyne.face = 'right';
         await timer.pause(1600);
         await dialogue('dialoguerTop', ...text.a_foundry.unddate17);
         undyne.face = 'down';
         datemusic.gain.value = OGgain;
         await dialogue('dialoguerTop', ...text.a_foundry.unddate18);
         stabber.metadata.state = 1;
         await stabber.alpha.modulate(timer, 300, 0);
         stabber.frames[0] = content.iooFSpear;
         stabber.position.set(210, 148);
         stabber.rotation.value = 135;
         const infobox = menuBox(32, 320 + 38, 566, 140 - 38, 6, {
            objects: [
               new CosmosText({
                  fill: 'white',
                  font: '16px DeterminationMono',
                  position: { x: 11, y: 9 },
                  spacing: { x: 0, y: 5 },
                  stroke: 'transparent'
               }).on('tick', function () {
                  this.content = curtext;
               })
            ]
         });
         renderer.attach('menu', infobox);
         let madeSelection = false;
         let drinkChoice = 0;
         const drinkChoices = [ 2, 4, 5, 6 ];
         const selector = async function () {
            if (sel && targetIndex > -1) {
               sel = false;
               renderer.detach('menu', infobox);
               atlas.switch('dialoguerBottom');
               await typer.text(...text.a_foundry.unddate20[targetIndex]());
               if (drinkChoices.includes(targetIndex)) {
                  await typer.text(...text.a_foundry.unddate21);
                  if (choicer.result === 0) {
                     drinkChoice = drinkChoices.indexOf(targetIndex);
                     await typer.text(...text.a_foundry.unddate22[drinkChoice]);
                     atlas.switch(null);
                     keys.interactKey.off('down', selector);
                     madeSelection = true;
                     return;
                  }
               }
               atlas.switch(null);
               renderer.attach('menu', infobox);
               sel = true;
            }
         };
         stabber.metadata.state = 2;
         stabber.alpha.modulate(timer, 300, 1);
         keys.interactKey.on('down', selector);
         await timer.when(() => madeSelection);
         datemusic.gain.modulate(timer, 2000, 0).then(() => {
            datemusic.stop();
         });
         stabber.alpha.modulate(timer, 1000, 0).then(() => {
            renderer.detach('main', stabber);
         });
         await timer.pause(500);
         const teacup = instance('main', 'k_teacup')!.object;
         undyne.preset = characters.undyneDate;
         await undyne.walk(timer, 3, { y: 90 });
         async function grabTeacup () {
            await undyne.walk(timer, 3, { x: 100 });
            undyne.face = 'up';
            await timer.pause(900);
            teacup.alpha.value = 0;
         }
         const teapot = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 171, y: 64 },
            resources: content.iooFTeapot
         });
         switch (drinkChoice) {
            case 0:
               await grabTeacup();
               await undyne.walk(timer, 3, { x: drink5.position.x });
               break;
            case 1:
               await grabTeacup();
               await undyne.walk(timer, 3, { x: drink3.position.x });
               break;
            case 2:
               await grabTeacup();
               await undyne.walk(timer, 3, { x: 260 });
               undyne.face = 'up';
               await timer.pause(900);
               await undyne.walk(timer, 3, { x: drink2.position.x });
               break;
            case 3:
               await undyne.walk(timer, 3, { x: teapot.position.x });
               undyne.face = 'up';
               await timer.pause(1400);
               assets.sounds.noise.instance(timer);
               renderer.attach('main', teapot);
               await timer.pause(1900);
               undyne.preset = characters.undyneDateSpecial;
               undyne.face = 'down';
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate22x);
               undyne.preset = characters.undyneDate;
               undyne.face = 'up';
               await timer.pause(4400);
               assets.sounds.slidewhistle.instance(timer);
               teapot.enable();
               await timer.pause(1400);
               undyne.preset = characters.undyneDateSpecial;
               undyne.face = 'down';
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate22y);
               undyne.preset = characters.undyneDate;
               await grabTeacup();
               undyne.face = 'up';
               await timer.pause(900);
               await undyne.walk(timer, 3, { x: teapot.position.x });
               break;
         }
         undyne.face = 'up';
         await timer.pause(1300);
         assets.sounds.rustle.instance(timer);
         if (drinkChoice === 3) {
            timer
               .when(() => teapot.index === 0)
               .then(() => {
                  teapot.reset().use(content.iooFDrinkTeapot);
               });
         }
         await timer.pause(700);
         await undyne.walk(timer, 3, { y: 100 }, { x: 160, y: 100 }, { x: 160, y: 175 }, { x: 190, y: 175 });
         undyne.face = 'up';
         await timer.pause(1000);
         teacup.position.set(200, 150);
         teacup.alpha.value = 1;
         teacup.priority.value = 500;
         assets.sounds.noise.instance(timer);
         await timer.pause(1000);
         undyne.face = 'right';
         await dialogue('dialoguerTop', ...text.a_foundry.unddate23);
         await undyne.walk(timer, 3, { x: 160 }, { x: 160, y: 105 }, { x: 210, y: 105 }, { x: 210, y: 115 });
         await timer.pause(850);
         await undyne.walk(timer, 1.5, { y: 120 });
         undyne.position.y += 5;
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'up';
         await timer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate24[drinkChoice]);
         await timer.pause(2400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate25[drinkChoice]);
         if (drinkChoice > 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate25x);
         }
         await timer.pause(1400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate27[drinkChoice], ...text.a_foundry.unddate28);
         const memorymusic = assets.music.memory.instance(timer);
         await timer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate29);
         await timer.pause(2500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate30);
         await memorymusic.gain.modulate(timer, 1500, 0);
         await timer.pause(1000);
         await dialogue(
            'dialoguerBottom',
            ...text.a_foundry.unddate31,
            ...text.a_foundry.unddate32[drinkChoice],
            ...text.a_foundry.unddate33
         );
         undyne.preset = characters.undyneDate;
         undyne.position.y -= 5;
         await undyne.walk(timer, 3, { x: 160 });
         await Promise.all([ moosicLoader, timer.pause(1750) ]);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate34);
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'left';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate35);
         const crazyAnim = new CosmosAnimation({
            position: undyne.position,
            anchor: { x: 0, y: 1 },
            resources: content.iocUndyneDateLeap
         }).on('tick', function () {
            this.resources === content.iocUndyneDateKick && this.active && this.index === 0 && this.reset();
         });
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         const BADADANUNUNUH = assets.music.datingfight.instance(timer);
         async function leap (crazyTarget: CosmosPointSimple, height: number, time: number) {
            const halfTarget = new CosmosPoint(
               (crazyTarget.x + crazyAnim.position.x) / 2,
               height - Math.abs(crazyTarget.y - crazyAnim.position.y)
            );
            await crazyAnim.position.modulate(timer, time, halfTarget, halfTarget, crazyTarget);
            assets.sounds.landing.instance(timer);
            shake(4, 500);
         }
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 2);
         timer
            .when(() => crazyAnim.index === 3)
            .then(async () => {
               crazyAnim.disable();
               await timer.pause(500);
               crazyAnim.index = 1;
            });
         await leap({ x: 90, y: 60 }, 60, 800);
         crazyAnim.index = 0;
         await timer.pause(500);
         crazyAnim.use(content.iocUndyneDownDate);
         await timer.pause(1000);
         const trueDrinks = [ ...drinks, ...(drinkChoice === 3 ? [ teapot ] : []) ];
         for (const [ index, drink ] of trueDrinks.entries()) {
            let kick = false;
            const vx = [ 1.1, 1, 0.6, 1.2, 1, 1.4 ][5 - index];
            const floorY = [ 95, 110, 90, 100, 95, 105 ][5 - index];
            function handler () {
               if (drink.index === 0 && floorY <= drink.position.y) {
                  drink.index = 1;
                  drink.gravity.extent = 0;
                  drink.velocity.set(0);
                  drink.position.y = floorY;
                  drink.acceleration.value = 1;
                  drink.spin.value = 0;
                  drink.priority.value = -1000;
                  assets.sounds.glassbreak.instance(timer);
                  drink.off('tick', handler);
                  shake(4, 250);
               } else if (!kick && drink.position.x <= crazyAnim.position.x + 8) {
                  kick = true;
                  drink.gravity.angle = 90;
                  drink.gravity.extent = 0.6;
                  assets.sounds.noise.instance(timer);
                  crazyAnim.enable();
                  drink.anchor.y = 0;
                  drink.position.y -= drink.compute().y / 2;
                  drink.velocity.set(vx / 1.5, -4);
                  drink.spin.value = vx * 4;
                  drink.acceleration.value = 1 / 1.01;
               }
            }
            drink.on('tick', handler);
         }
         crazyAnim.use(content.iocUndyneDateKick);
         const finalpos = drink1.position.value();
         await crazyAnim.position.modulate(
            timer,
            (Math.abs(finalpos.x - crazyAnim.position.x) / 4) * (1000 / 30),
            finalpos,
            finalpos
         );
         await timer.pause(500);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.preset = characters.undyneDate;
         undyne.position.set(finalpos);
         undyne.face = 'down';
         await timer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate36);
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.use(content.iocUndyneDateLeap);
         crazyAnim.priority.value = 1000;
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 2);
         timer
            .when(() => crazyAnim.index === 3)
            .then(async () => {
               crazyAnim.disable();
               await timer.pause(500);
               crazyAnim.index = 1;
            });
         await leap(player.position.subtract(19.5, 0), 60, 1200);
         crazyAnim.index = 0;
         await timer.pause(500);
         crazyAnim.use(content.iocUndyneDownDate);
         await timer.pause(500);
         crazyAnim.use(content.iocUndyneUpDate);
         await timer.pause(500);
         crazyAnim.use(content.iocUndyneDateGrab);
         crazyAnim.position.set(player.position);
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 1);
         player.alpha.value = 0;
         await timer.when(() => crazyAnim.index === 2);
         assets.sounds.grab.instance(timer);
         await timer.when(() => crazyAnim.index === 4);
         crazyAnim.disable();
         timer.pause(500).then(() => (crazyAnim.index = 3));
         await leap({ x: 230, y: 90 }, 60, 1000);
         crazyAnim.step = 0;
         crazyAnim.reverse = true;
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 0);
         player.position.set(crazyAnim.position);
         player.alpha.value = 1;
         await timer.when(() => crazyAnim.step === crazyAnim.duration - 1);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.position.set(player.position.subtract(19.5, 0));
         undyne.face = 'up';
         await timer.pause(500);
         undyne.face = 'right';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate37);
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.reverse = false;
         crazyAnim.position.set(undyne.position);
         crazyAnim.use(content.iocUndyneDateStomp);
         crazyAnim.priority.value = 0;
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 9);
         crazyAnim.disable();
         assets.sounds.landing.instance(timer);
         shake(4, 1000);
         const veggies = new CosmosAnimation({
            gravity: new CosmosPoint().endpoint({ extent: 0.3, angle: 90 }),
            position: { x: 206, y: -60 },
            resources: content.iooFVeggies
         });
         renderer.attach('main', veggies);
         await Promise.all([
            timer.pause(500).then(() => {
               renderer.detach('main', crazyAnim);
               renderer.attach('main', undyne);
            }),
            timer
               .when(() => 28 <= veggies.position.y)
               .then(() => {
                  veggies.gravity.extent = 0;
                  veggies.velocity.set(0);
                  veggies.position.y = 28;
                  assets.sounds.noise.instance(timer);
               })
         ]);
         await timer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate38);
         header('x1').then(() => {
            undyne.preset = characters.undyneDateSpecial;
            undyne.face = 'left';
         });
         if (choicer.result === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate39a());
         } else {
            save.data.n.bully > 9 || (veggies.index = 2);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate39b());
         }
         if (save.data.n.bully > 9 && choicer.result === 1) {
            const whitefader = fader({ fill: 'white' }, 'menu');
            await whitefader.alpha.modulate(timer, 150, 1);
            veggies.index += 1;
            renderer.detach('main', undyne);
            renderer.attach('main', crazyAnim);
            crazyAnim.use(content.iocUndyneDateTomato);
            assets.sounds.stab.instance(timer);
            shake(4, 800);
            await timer.pause(300);
            whitefader.alpha.modulate(timer, 300, 0).then(() => renderer.detach('menu', whitefader));
            await timer.pause(1500);
         } else {
            renderer.detach('main', undyne);
            renderer.attach('main', crazyAnim);
            crazyAnim.reset().use(content.iocUndyneDateUppercut);
            crazyAnim.enable();
            await timer.when(() => crazyAnim.index === 7);
            {
               const whitefader = new CosmosRectangle({ fill: '#fff', size: { x: 320, y: 240 } });
               renderer.attach('menu', whitefader);
               whitefader.alpha.modulate(timer, 300, 0).then(() => {
                  renderer.detach('menu', whitefader);
               });
            }
            assets.sounds.stab.instance(timer);
            shake(4, 500);
            veggies.index += 1;
            await timer.when(() => crazyAnim.index === 8);
            crazyAnim.disable();
            await timer.pause(500);
            crazyAnim.use(content.iocUndyneDateTomato);
            await timer.pause(1000);
         }
         speech.targets.add(crazyAnim);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate40(choicer.result));
         speech.targets.delete(crazyAnim);
         // final stomp
         crazyAnim.use(content.iocUndyneDateStompTomato);
         crazyAnim.priority.value = 0;
         crazyAnim.enable();
         await timer.when(() => crazyAnim.index === 9);
         crazyAnim.disable();
         assets.sounds.landing.instance(timer);
         shake(4, 1000);
         const cookpot = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 149.5, y: 1 },
            resources: content.iooFCookpotStir
         });
         const spaghetti = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            position: { x: 170.5 },
            frames: [ content.iooFSpaghetti ]
         });
         const chefWrapper = new CosmosObject({
            position: { y: -60 },
            gravity: new CosmosPoint().endpoint({ extent: 0.3, angle: 90 }),
            objects: [ cookpot, spaghetti ]
         }).on('tick', function () {
            64 <= this.y && (this.y = 64);
         });
         renderer.attach('main', chefWrapper);
         await Promise.all([
            timer.pause(500).then(async () => {
               renderer.detach('main', crazyAnim);
               renderer.attach('main', undyne);
               undyne.preset = characters.undyneDate;
               undyne.face = 'down';
            }),
            timer
               .when(() => 64 <= chefWrapper.position.y)
               .then(() => {
                  chefWrapper.gravity.extent = 0;
                  chefWrapper.velocity.set(0);
                  assets.sounds.noise.instance(timer);
                  chefWrapper.position.modulate(timer, 200, { y: 62 }, { y: 62 }, { y: 64 });
               })
         ]);
         await timer.pause(800);
         await undyne.walk(timer, 3, { x: 130 });
         undyne.face = 'right';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41);
         await timer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41x);
         await player.walk(timer, 3, { x: 160 });
         player.face = 'up';
         await timer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41y);
         undyne.face = 'up';
         if (choicer.result === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate42a, ...text.a_foundry.unddate43);
         } else {
            chefWrapper.objects = [ cookpot ];
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate42b, ...text.a_foundry.unddate43);
         }
         undyne.face = 'right';
         await timer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate44);
         undyne.face = 'up';
         curtext = text.a_foundry.unddate45;
         renderer.attach('menu', infobox);
         const zeeListener = () => {
            ++cookpot.index === cookpot.frames.length && (cookpot.index = 0);
         };
         keys.interactKey.on('down', zeeListener);
         await timer.pause(3000);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate46);
         renderer.attach('menu', infobox);
         await timer.pause(1000);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate47);
         renderer.attach('menu', infobox);
         await timer.pause(1000);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate48);
         renderer.attach('menu', infobox);
         await timer.pause(2000);
         renderer.detach('menu', infobox);
         keys.interactKey.off('down', zeeListener);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate49);
         let wave = true;
         const time = timer.value;
         const slammer = new CosmosValue();
         const THATSTHESTUFF = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iooFSpear ]
         }).on('tick', function () {
            wave && this.position.set(cookpot.position.x + sineWaver(time, 1500, -8, 8), slammer.value);
         });
         renderer.attach('main', THATSTHESTUFF);
         let slams = 0;
         while (slams++ < 16) {
            assets.sounds.arrow.instance(timer);
            await slammer.modulate(timer, 125, 62);
            assets.sounds.stab.instance(timer);
            assets.sounds.landing.instance(timer);
            shake(4, 1000);
            switch (slams) {
               case 2:
                  cookpot.use(content.iooFCookpotWrecked);
                  break;
               case 4:
                  cookpot.index = 1;
                  break;
               case 6:
                  cookpot.index = 2;
                  break;
               case 8:
                  cookpot.index = 3;
                  break;
            }
            if (slams < 16) {
               await slammer.modulate(timer, 125, 10);
            }
         }
         wave = false;
         await THATSTHESTUFF.alpha.modulate(timer, 600, 0);
         renderer.detach('main', THATSTHESTUFF);
         await timer.pause(400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate50); // best line ever
         await timer.pause(1200);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate51);
         undyne.face = 'right';
         await timer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate52);
         cookpot.use(content.iooFCookpotHeat);
         cookpot.enable();
         undyne.face = 'up';
         curtext = text.a_foundry.unddate53;
         renderer.attach('menu', infobox);
         let leftChecker = 0;
         const rotspeed = 360 / 60;
         const stoveknob = instance('main', 'k_stoveknob')!.object;
         let baseIndex = 0;
         let heater = true;
         let newTime = timer.value;
         const yeeListener = async () => {
            leftChecker === 1 && (newTime = timer.value);
            if (keys.leftKey.active()) {
               if (leftChecker === 0) {
                  leftChecker = 1;
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate53x);
                  leftChecker = 2;
               }
            } else if (keys.rightKey.active()) {
               heater && (stoveknob.rotation.value += rotspeed);
            }
            baseIndex = Math.min(Math.floor(stoveknob.rotation.value / 180) * 2, 16);
            while (cookpot.index < baseIndex) {
               cookpot.index += 2;
            }
            if (cookpot.index === baseIndex) {
               cookpot.reverse = false;
            } else {
               cookpot.reverse = true;
            }
         };
         renderer.on('tick', yeeListener);
         await timer.when(() => 3000 <= timer.value - newTime);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate54);
         renderer.attach('menu', infobox);
         newTime = timer.value;
         await timer.when(() => 1000 <= timer.value - newTime);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate55);
         renderer.attach('menu', infobox);
         newTime = timer.value;
         await timer.when(() => 1000 <= timer.value - newTime);
         renderer.detach('menu', infobox);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate56);
         leftChecker = 2;
         renderer.attach('menu', infobox);
         newTime = timer.value;
         await timer.when(() => 2000 <= timer.value - newTime);
         renderer.detach('menu', infobox);
         heater = false;
         if (baseIndex < 16) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate57a);
            await stoveknob.rotation.step(timer, rotspeed * 2, 180 * 9);
            BADADANUNUNUH.stop();
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate57b);
         } else {
            BADADANUNUNUH.stop();
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate58);
         }
         content.amDatingfight.unload();
         assets.sounds.swing.instance(timer);
         const cym = assets.sounds.cymbal.instance(timer);
         const exploder = new CosmosRectangle({
            alpha: 0,
            fill: '#fff',
            size: { x: 320, y: 240 },
            priority: -Infinity
         });
         renderer.attach('menu', exploder);
         await exploder.alpha.modulate(timer, 3000, 1);
         renderer.off('tick', yeeListener);
         cookpot.use(content.iooFCookpotBlack);
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.use(content.iocUndyneDateBurnt);
         crazyAnim.position.set(undyne.position);
         flamer.alpha.value = 1;
         let bindex = 0;
         for (const object of flamer.objects as CosmosSprite[]) {
            object.index = bindex++;
         }
         await timer.pause(1000);
         const blackfader = new CosmosRectangle({ alpha: 1, fill: '#000', size: { x: 320, y: 240 } });
         renderer.attach('menu', blackfader);
         cym.stop();
         await timer.pause(2000);
         exploder.fill = '#3f3fff';
         exploder.blend = BLEND_MODES.MULTIPLY;
         const deeploop2 = assets.sounds.deeploop2.instance(timer);
         deeploop2.gain.value /= 8;
         await Promise.all([ deeploop2.gain.modulate(timer, 1000, 1), blackfader.alpha.modulate(timer, 1000, 0) ]);
         renderer.detach('menu', blackfader);
         await timer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate59);
         await timer.pause(3500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate60);
         await timer.pause(2500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate61);
         await timer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate62);
         await timer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate63);
         await timer.pause(1250);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'left';
         deeploop2.stop();
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate64);
         const wasOops = save.data.b.oops;
         await battler.encounter(player, groups.dateundyne, false);
         renderer.alpha.value = 0;
         await teleport('f_undyne', 'up', 140, 160, { fast: true });
         {
            instance('main', 'f_undyne_door')?.destroy();
            const houzz = instance('main', 'f_undynehouse')!.object;
            if (!houzz.metadata.swapped) {
               houzz.metadata.swapped = true;
               for (const object of houzz.objects) {
                  if (object instanceof CosmosAnimation) {
                     object.use(content.iooFUndynehouseWrecked);
                     object.enable();
                     break;
                  }
               }
            }
         }
         player.priority.value = 0;
         renderer.detach('menu', exploder);
         renderer.detach('main', ...trueDrinks, veggies, chefWrapper, blocker);
         undyne.position.set(180, 160);
         undyne.preset = characters.undyneDate;
         undyne.face = 'left';
         await timer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate65);
         await timer.pause(500);
         undyne.face = 'up';
         await timer.pause(1000);
         undyne.face = 'left';
         await timer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate66);
         undyne.walk(timer, 3, { x: 160, y: 240 }).then(async () => {
            await Promise.race([ undyne.alpha.modulate(timer, 300, 0), events.on('teleport') ]);
            renderer.detach('main', undyne);
         });
         if (!wasOops) {
            await dialogue('dialoguerBottom', ...text.a_foundry.truetext.unddate());
         }
         {
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = true;
            barrier.metadata.trigger = false;
            barrier.metadata.name = void 0;
            barrier.metadata.args = void 0;
         }
         save.data.n.plot_date = 2;
         events.on('teleport').then(() => {
            save.data.n.plot_date = 2.1;
         });
         game.movement = true;
         break;
      }
      case 'f_lobby': {
         const cheesetable = instance('main', 'f_cheesetable')!.object;
         if (!cheesetable.metadata.init) {
            cheesetable.metadata.init = true;
            const spr = cheesetable.objects.filter(object => object instanceof CosmosAnimation)[0] as CosmosAnimation;
            const cheeserand = random.clone();
            const glitch = new GlitchFilter({ slices: 100, offset: 5 });
            spr.container.filterArea = renderer.area!;
            spr.on('tick', () => {
               if (spr.index === 0) {
                  if (spr.active) {
                     spr.reset();
                     spr.container.filters = [];
                  } else if (cheeserand.next() < 0.1) {
                     spr.index = 1;
                     spr.enable();
                     spr.container.filters = [ glitch ];
                  }
               }
               if (spr.index === 1) {
                  glitch.refresh();
               }
            });
         }
         break;
      }
      case 'f_exit': {
         if (save.data.n.plot === 48 && save.data.n.state_foundry_undyne === 1) {
            const fallencontainer = new CosmosHitbox({
               objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocUndyneFallen ] }) ],
               anchor: 0,
               position: { x: 60, y: 100 },
               size: { x: 50, y: 100 },
               metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fallenfish2' ] }
            });
            renderer.attach('main', fallencontainer);
            events.on('teleport', () => {
               renderer.detach('main', fallencontainer);
            });
         }
         break;
      }
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'f' && script('tick');
});

events.on('use', {
   priority: -Number.MAX_SAFE_INTEGER,
   async listener (key) {
      switch (key) {
         case 'punchcard':
            if (!battler.active) {
               timer
                  .when(() => game.movement)
                  .then(async () => {
                     await renderer.on('render');
                     game.movement = false;
                     await content.iePunchcard.load();
                     const card = new CosmosSprite({ frames: [ content.iePunchcard ] });
                     renderer.attach('menu', card);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', card);
                     game.movement = true;
                  });
            }
            break;
         case 'tea':
            battler.stat.speed.modifiers.push(
               ...CosmosUtils.populate(3, i => [ 'add', 0.25 / 3, i + 3 ] as ['add', number, number])
            );
            break;
      }
   }
});

player.on('tick', alphaCheck);

CosmosUtils.status(`LOAD MODULE: FOUNDRY AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
