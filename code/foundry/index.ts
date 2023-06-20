import './bootstrap';

import Pathfinding, { DiagonalMovement, Grid, Heuristic, JumpPointFinder } from 'pathfinding';
import { AdvancedBloomFilter, CRTFilter, GlitchFilter, GlowFilter, MotionBlurFilter } from 'pixi-filters';
import { BLEND_MODES, BaseTexture, Container, DisplacementFilter, Graphics, Sprite, WRAP_MODES } from 'pixi.js';
import assets from '../assets';
import { OutertaleShop } from '../classes';
import { azzie, characters, monty, phish, runEncounter } from '../common';
import commonGroups from '../common/groups';
import commonText from '../common/text';
import content, { inventories, ratio01, ratio02 } from '../content';
import { atlas, audio, events, game, items, keys, random, renderer, rooms, speech, timer, typer } from '../core';
import { CosmosInstance } from '../engine/audio';
import { CosmosInventory } from '../engine/core';
import { CosmosCharacter } from '../engine/entity';
import { CosmosAnimation, CosmosBitmap, CosmosColor, CosmosImage, CosmosSprite } from '../engine/image';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue, CosmosValueRandom } from '../engine/numerics';
import { CosmosHitbox, CosmosObject, CosmosRegion } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosText } from '../engine/text';
import { CosmosDirection, CosmosKeyed, CosmosUtils } from '../engine/utils';
import {
   battler,
   character,
   choicer,
   colormix,
   dialogue,
   dialogueSession,
   fader,
   fetchCharacters,
   hashes,
   header,
   instance,
   instances,
   isolate,
   isolates,
   menuBox,
   notifier,
   oops,
   player,
   quickshadow,
   resume,
   shadow,
   shake,
   shopper,
   sineWaver,
   talkFilter,
   teleport,
   teleporter,
   temporary,
   trivia,
   world
} from '../mantle';
import save, { OutertaleDataNumber } from '../save';
import groups from './groups';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

export const kiddAssets = new CosmosInventory(
   inventories.iocKidd,
   inventories.iocKiddSad,
   inventories.iocKiddSlave,
   inventories.idcKidd,
   content.avKidd
);

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

export function alphaCheck (this: CosmosObject) {
   switch (game.room) {
      case 'w_toriel_asriel':
         for (const obj of renderer.layers.below.objects) {
            if (obj.metadata.darkie) {
               this.tint = tintCalc(0, ratio02);
               return;
            }
         }
         this.tint = 0xffffff;
         break;
      case 'f_entrance':
         if (this.x > 100) {
            this.tint = tintCalc((this.x - 100) / 200, ratio02);
         } else {
            this.tint = tintCalc(0, ratio02);
         }
         break;
      case 'f_abyss':
         if (this.x > 220) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(1 - this.x / 200, ratio02);
         }
         break;
      case 'f_muffet':
         if (this.x < 820) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc((this.x - 820) / 200, ratio02);
         }
         break;
      case 'f_plank':
         if (this.x > 420) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(1 - (this.x - 220) / 200, ratio02);
         }
         break;
      case 'f_dummy':
         if (this.y < 200) {
            this.tint = tintCalc(0, ratio01);
         } else {
            this.tint = tintCalc((this.y - 200) / 40, ratio01);
         }
         break;
      case 'f_village':
         if (this.y < 0) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(this.y / 60, ratio02);
         }
         break;
      case 'f_battle':
         if (this.x < 180) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc((this.x - 180) / 160, ratio02);
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
               this.tint = tintCalc(1 - Math.min(player.x - 60, player.y - 20) / 40, 0.6);
            } else if (this.x > 260) {
               this.tint = tintCalc(1 - Math.min(280 - player.x, player.y - 20) / 40, 0.6);
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

export const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

/** tem shop armor price */
export function armorprice () {
   const d = save.flag.n.deaths;
   return d === 0
      ? 9999
      : d < 6
      ? 10000 - d * 1000
      : d < 10
      ? 5000 - (d - 5) * 500
      : d < 18
      ? 3000 - (d - 9) * 200
      : d < 20
      ? 1400 - (d - 17) * 150
      : d < 25
      ? 1000
      : d < 30
      ? 750
      : 500;
}

export function puzzleTarget () {
   return game.room === 'f_puzzle1' ? 36 : game.room === 'f_puzzle2' ? 37 : 45;
}

export async function tripper (kidd: CosmosCharacter, resources = content.iocKiddRightTrip) {
   const tripAnim = new CosmosAnimation({
      active: true,
      anchor: { x: 0, y: 1 },
      position: kidd.position.add(resources === content.iocKiddRightTrip ? 18 : -18, 0),
      resources
   });
   kidd.position = tripAnim.position.clone();
   kidd.alpha.value = 0;
   renderer.attach('main', tripAnim);
   await timer.when(() => tripAnim.index === 19);
   tripAnim.disable();
   tripAnim.index = 19;
   await timer.pause(500);
   kidd.alpha.value = 1;
   renderer.detach('main', tripAnim);
}

export function pulsetestGenOver (owner: CosmosObject) {
   return CosmosUtils.populate(
      2,
      side =>
         new CosmosSprite({
            scale: { x: [ 1, -1 ][side] },
            position: owner.position.subtract([ 6, -6 ][side], 47),
            frames: [ content.iooFPuzzlepylonOverlay ],
            priority: 1000
         })
   );
}

export function pulsetest (instances: CosmosObject[], pylon: CosmosObject) {
   const objects = [] as CosmosObject[];
   checker: for (const other of instances) {
      if (other === pylon) {
         continue;
      }
      const closeX = Math.abs(other.x - pylon.x) < 12;
      const closeY = Math.abs(other.y - pylon.y) < 12;
      if (closeX === closeY) {
         continue;
      } else {
         objects.push(...(objects.length === 0 ? pulsetestGenOver(pylon) : []), ...pulsetestGenOver(other));
         const targets = [] as number[];
         if (closeX) {
            if (other.y < pylon.y) {
               other.x <= pylon.x && targets.push(0);
               pylon.x <= other.x && targets.push(1);
            } else {
               other.x <= pylon.x && targets.push(5);
               pylon.x <= other.x && targets.push(4);
            }
         } else if (other.x < pylon.x) {
            other.y <= pylon.y && targets.push(7);
            pylon.y <= other.y && targets.push(6);
         } else {
            other.y <= pylon.y && targets.push(2);
            pylon.y <= other.y && targets.push(3);
         }
         for (const target of targets) {
            const o1 = target < 4 ? pylon : other;
            const o2 = target < 4 ? other : pylon;
            const p1 = o1.position.value();
            const p2 = o2.position.value();
            const wT = target % 4;
            const distance = Math.abs(wT < 2 ? o2.y - o1.y : o2.x - o1.x);
            for (const obj of objects) {
               if (obj.metadata.target === target) {
                  if (obj.metadata.distance < distance) {
                     continue checker;
                  } else {
                     objects.splice(objects.indexOf(obj), 1);
                  }
               }
            }
            objects.push(
               new CosmosRectangle({
                  alpha: 0.75,
                  fill: 'white',
                  metadata: { target, distance },
                  position: o1.position.add(wT === 0 ? -7 : 3, wT === 2 ? -57 : -47),
                  size: { x: wT < 2 ? 4 : o2.x - o1.x - 6, y: wT < 2 ? o2.y - o1.y : 4 },
                  priority: wT === 3 ? o1.y + 5 : o1.y - 5
               }).on('tick', function () {
                  if (this.alpha.value > 0) {
                     this.alpha.value -= 1 / 30;
                     if (this.alpha.value <= 0 || o1.x !== p1.x || o2.x !== p2.x || o1.y !== p1.y || o2.y !== p2.y) {
                        renderer.detach('main', ...objects);
                        for (const obj of objects) {
                           obj.alpha.value = 0;
                           // ensures disappearance before render
                           obj.container.alpha = 0;
                        }
                     }
                  }
               })
            );
         }
      }
   }
   renderer.attach('main', ...objects);
   objects.length > 0 && (assets.sounds.indicator.instance(timer).rate.value = 1.3);
}

export async function beamcast (
   stage: {
      mirrors: [CosmosObject, string, CosmosPointSimple][];
      discovery: CosmosObject[];
      beamwalls: CosmosHitbox[];
      rects: CosmosRectangle[];
      anims: CosmosAnimation[];
      overs: CosmosSprite[];
   },
   position: CosmosPointSimple,
   valid = { state: true },
   face = 'down' as CosmosDirection
): Promise<boolean> {
   let step = 0;
   let next = 'wall';
   let anim = null as null | CosmosAnimation;
   const seek = new CosmosPoint(position).add(0, 39);
   const increment = { up: { y: -1 }, down: { y: 1 }, left: { x: -1 }, right: { x: 1 } }[face];
   const { mirrors, discovery, beamwalls, rects, anims, overs } = stage;
   top: while (step++ < 1000) {
      seek.x += increment.x ?? 0;
      seek.y += increment.y ?? 0;
      if (step > 8) {
         for (const [ pylon, action, position ] of mirrors) {
            if (seek.x === position.x && seek.y === position.y) {
               next = action;
               anim = pylon.objects.filter(sub => sub instanceof CosmosAnimation)[0] as CosmosAnimation;
               discovery.includes(pylon) || discovery.push(pylon);
               if (next === 'pylon-c' || next === 'pylon-d') {
                  const over = new CosmosSprite({
                     scale: { x: next === 'pylon-c' ? 1 : -1 },
                     position: { x: pylon.position.x - (next === 'pylon-c' ? 6 : -6), y: pylon.position.y - 47 },
                     frames: [ content.iooFPuzzlepylonOverlay ],
                     priority: 1000
                  });
                  overs.push(over);
                  renderer.attach('main', over);
               }
               break top;
            }
         }
         for (const beamwall of beamwalls) {
            const [ min, max ] = beamwall.region();
            if (seek.x > min.x && seek.x < max.x && seek.y > min.y && seek.y < max.y) {
               if (beamwall.metadata.barrier) {
                  next = 'wall';
                  break top;
               } else if (beamwall.metadata.trigger) {
                  next = 'endpoint';
                  break top;
               }
            }
         }
      }
   }
   const rect = new CosmosRectangle({
      position,
      fill: '#cfcfcf',
      metadata: { face },
      size: { x: 5, y: 5 },
      anchor: { up: { x: 0, y: 1 }, down: { x: 0 }, left: { x: 1, y: 0 }, right: { y: 0 } }[face]
   }).on('tick', function () {
      this.priority.value = this.position.y + (face === 'down' ? this.size.y : 0) + 45;
   });
   renderer.attach('main', rect);
   rects.push(rect);
   let moving = true;
   const target = rect.size
      .add(new CosmosPoint({ x: Math.abs(increment.x ?? 0), y: Math.abs(increment.y ?? 0) }).multiply(step))
      .subtract(
         next.startsWith('pylon')
            ? { up: 1, down: 1, left: 5, right: 5 }[face]
            : { up: 1, down: 1, left: 7, right: 7 }[face],
         next.startsWith('pylon')
            ? { up: 5, down: 0, left: 1, right: 1 }[face]
            : { up: 5, down: -32, left: 1, right: 1 }[face]
      );
   await Promise.race([
      rect.size.modulate(timer, step * 2, rect.size.add(target.subtract(rect.size).multiply(0.75)), target),
      timer.when(() => !valid.state).then(() => (moving ? rect.size.modulate(timer, 0, rect.size.value()) : void 0))
   ]);
   moving = false;
   if (valid.state) {
      if (anim) {
         anims.includes(anim) || anims.push(anim);
         assets.sounds.indicator.instance(timer);
         anim.index = 2;
      }
      switch (next) {
         case 'endpoint':
            return true;
         case 'pylon-a':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'up' : 'left'
            );
         case 'pylon-b':
            return await beamcast(
               stage,
               face === 'left' ? seek.add(0, -37) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'up' : 'right'
            );
         case 'pylon-c':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -41) : seek.add(2, -39),
               valid,
               face === 'right' ? 'down' : 'left'
            );
         case 'pylon-d':
            return await beamcast(
               stage,
               face === 'left' ? seek.add(0, -41) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'down' : 'right'
            );
         default:
            return false;
      }
   } else {
      return false;
   }
}

export function napstamusic (roomState: any) {
   game.music!.gain.modulate(timer, 0, 0);
   timer.pause().then(() => {
      game.music!.gain.modulate(timer, 0, 0);
   });
   const music = audio.music
      .of([ 'spooktune', 'spookwave', 'spookwaltz', 'swansong' ][save.data.n.state_foundry_blookmusic - 1])
      .instance(timer);
   roomState.customs = music;
   roomState.customsLevel = music.gain.value;
   music.gain.value /= 4;
   music.gain.modulate(timer, 600, music.gain.value * 4).then(() => {
      roomState.customsAuto = true;
   });
   events.on('teleport').then(() => {
      music.stop();
      roomState.customs = void 0;
      roomState.customsLevel = void 0;
      roomState.customsAuto = void 0;
   });
}

export const failPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[], semi?: boolean) => {
   semi ? assets.sounds.indicator.instance(timer) : assets.sounds.noise.instance(timer);
   for (const rect of rects) {
      rect.fill = semi ? '#fcea72' : '#f00';
   }
   for (const pylon of pylons) {
      pylon.index = semi ? 4 : 3;
   }
   await timer.pause(100);
   for (const rect of rects) {
      rect.fill = '#000';
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await timer.pause(200);
   assets.sounds.noise.instance(timer);
   for (const rect of rects) {
      rect.fill = '#f00';
   }
   for (const pylon of pylons) {
      pylon.index = 3;
   }
   await timer.pause(400);
   for (const rect of rects) {
      renderer.detach('main', rect);
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
};

export const passPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[]) => {
   assets.sounds.indicator.instance(timer);
   for (const rect of rects) {
      rect.fill = '#6ca4fc';
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await timer.pause(100);
   for (const rect of rects) {
      rect.fill = '#000';
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await timer.pause(200);
   assets.sounds.indicator.instance(timer);
   for (const rect of rects) {
      rect.fill = '#6ca4fc';
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await timer.pause(400);
};

export async function stabbie (earlyExit = false, ...positions: CosmosPointSimple[]) {
   const r = game.room;
   const sprs = [] as CosmosSprite[];
   for (const position of positions) {
      const y = position.y + 20;
      const spr = temporary(
         new CosmosSprite({
            alpha: 0,
            anchor: { y: 1 },
            priority: y,
            position: { x: position.x, y },
            frames: [ content.iooFFloorspearBase ]
         }),
         'below'
      );
      sprs.push(spr);
      spr.alpha.modulate(timer, 400, 1);
   }
   assets.sounds.appear.instance(timer);
   await timer.pause(300);
   if (game.room !== r) {
      return;
   }
   const anims = [] as CosmosAnimation[];
   for (const spr of sprs) {
      const anim = temporary(
         new CosmosAnimation({
            active: true,
            anchor: { y: 1 },
            position: spr,
            resources: content.iooFFloorspear
         }).on('tick', function () {
            this.index === 2 && this.disable();
         }),
         'main'
      );
      anims.push(anim);
      stabbieHole(spr, !earlyExit);
   }
   assets.sounds.stab.instance(timer);
   if (!earlyExit) {
      for (const spr of sprs) {
         if (
            game.movement &&
            spr.x > player.x - 22.5 &&
            spr.x < player.x + 2.5 &&
            spr.y > player.y - 2.5 &&
            spr.y < player.y + 17.5
         ) {
            game.movement = false;
            battler.battlefall(player, { x: 160, y: 180 }).then(() =>
               battler.simple(async () => {
                  game.movement = true;
                  await patterns.undynefast();
                  if (save.data.n.hp > 0) {
                     events.on('battle-exit').then(async () => {
                        if (renderer.layers.main.objects.includes(monty)) {
                           await dialogue('auto', ...text.a_foundry.epicreaction());
                        }
                        if (renderer.layers.main.objects.includes(azzie)) {
                           await dialogue('auto', ...text.a_foundry.goatreaction());
                        }
                     });
                     events.fire('exit');
                  }
               })
            );
            break;
         }
      }
      if (game.room !== r) {
         return;
      }
      await timer.pause(300);
      if (game.room !== r) {
         return;
      }
      await Promise.all([ ...sprs, ...anims ].map(o => o.alpha.modulate(timer, 500, 0)));
      renderer.detach('below', ...sprs);
      renderer.detach('main', ...anims);
   }
   return { sprs, anims };
}

export function stabbieHole (position: CosmosPointSimple, append = false) {
   temporary(
      new CosmosSprite({ anchor: { y: 1 }, position, frames: [ content.iooFSpearHole ], priority: position.y - 1 }),
      'below'
   );
   if (append) {
      save.data.s.state_foundry_f_chaseHole = CosmosUtils.serialize([
         ...(CosmosUtils.parse(save.data.s.state_foundry_f_chaseHole || '[]') as CosmosPointSimple[]),
         { x: position.x, y: position.y }
      ]);
   }
}

export const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = states.rooms[game.room] || (states.rooms[game.room] = {});
   if (subscript === 'tick') {
      save.data.b.oops || save.data.n.plot_date < 2 || (save.data.b.flirt_undyne = true);
      if (!states.scripts.steamgap || !states.scripts.steamgap.init) {
         (states.scripts.steamgap ||= {}).init = true;
         CosmosUtils.chain(random.clone(), async (rand, next) => {
            await timer.pause(CosmosMath.remap(rand.next(), 500, 5000));
            if (renderer.alpha.value === 1 && !battler.active) {
               const steamgap = states.rooms[game.room]?.steamgap as CosmosPointSimple[];
               if (steamgap && steamgap.length > 0) {
                  const scale = rand.next();
                  const trueScale = CosmosMath.remap(scale, 0.5, 0.9);
                  const position = new CosmosPoint(rand.next() * 20, rand.next() * 20).add(
                     steamgap[Math.floor(rand.next() * steamgap.length)]
                  );
                  const sprite = new CosmosSprite({
                     alpha: 0.5,
                     anchor: 0,
                     scale: new CosmosPoint(trueScale),
                     position,
                     priority: position.y,
                     rotation: Math.round(rand.next() * 360),
                     frames: [ content.iooFSteam ]
                  });
                  renderer.attach('main', sprite);
                  sprite.rotation.modulate(
                     timer,
                     1000,
                     sprite.rotation.value + CosmosMath.remap(rand.next(), 45, 135) * (rand.next() < 0.5 ? 1 : -1)
                  );
                  sprite.position.modulate(
                     timer,
                     1000,
                     sprite.position.subtract(0, trueScale * 30),
                     sprite.position.subtract(0, trueScale * 45)
                  );
                  sprite.scale.modulate(timer, 500, sprite.scale.multiply(CosmosMath.remap(rand.next(), 1.1, 1.3)));
                  Promise.race([ sprite.alpha.modulate(timer, 1000, 0), events.on('teleport') ]).then(() => {
                     renderer.detach('main', sprite);
                  });
               }
            }
            next(rand);
         });
      }
      switch (game.room) {
         case 'f_quiche':
            save.data.b.item_jumpsuit && instance('main', 'jumpsuit_item')?.destroy();
            break;
         case 'f_sans':
            save.data.n.plot < 34 || instance('main', 'f_kidd')?.destroy();
            break;
         case 'f_view': {
            if (save.data.n.state_foundry_muffet !== 1) {
               const hist = (roomState.hist ??= []) as CosmosPointSimple[];
               hist.push(player.position.value()) > 7 && hist.shift();
               roomState.mode ??= 'follow';
               const proximity = Math.abs(500 - player.x) < 140;
               if (save.data.n.plot_kidd < 4) {
                  if ((proximity && roomState.mode === 'follow') || (!proximity && roomState.mode === 'onlook')) {
                     roomState.mode = 'transition';
                     monty.metadata.barrier = false;
                     monty.metadata.override = true;
                     if (player.x > 500 && !proximity) {
                        save.data.n.plot_kidd = 4;
                     }
                  }
               }
               if (roomState.mode === 'transition') {
                  if (proximity) {
                     const target = { x: 500, y: 85 };
                     for (const sprite of Object.values(monty.sprites)) {
                        sprite.duration = Math.round(15 / 4);
                     }
                     const x = target.x;
                     const y = target.y;
                     const diffX = Math.abs(x - monty.x);
                     const diffY = Math.abs(y - monty.y);
                     if (diffX > 0 || diffY > 0) {
                        const dirX = x - monty.x < 0 ? -1 : 1;
                        const dirY = y - monty.y < 0 ? -1 : 1;
                        monty.move(
                           {
                              x: (diffX === 0 ? 0 : diffX < 4 ? diffX : 4) * dirX,
                              y: (diffY === 0 ? 0 : diffY < 4 ? diffY : 4) * dirY
                           },
                           renderer
                        );
                     } else {
                        monty.face = 'up';
                        roomState.mode = 'onlook';
                        monty.metadata.barrier = true;
                        monty.metadata.interact = true;
                        monty.metadata.name = 'trivia';
                        monty.metadata.args = [ 'f_view' ];
                        monty.move({ x: 0, y: 0 }, renderer);
                        if (renderer.detect(monty, player).length > 0) {
                           if (player.x < monty.x) {
                              player.x = monty.x - monty.size.x / 2 - player.size.x / 2;
                           } else {
                              player.x = monty.x + monty.size.x / 2 + player.size.x / 2;
                           }
                        }
                     }
                  } else {
                     const pos = monty.position.clone();
                     const extent = pos.extentOf(player.position);
                     const modRate = 4.5;
                     if (extent <= 21 + modRate) {
                        monty.face = player.face;
                        roomState.mode = 'follow';
                        monty.metadata.barrier = false;
                        monty.metadata.interact = false;
                        monty.metadata.name = void 0;
                        monty.metadata.args = void 0;
                        monty.metadata.override = false;
                     } else {
                        const target = hist[0];
                        pos.x += Math.min(Math.max(target.x - pos.x, -modRate), modRate);
                        pos.y += Math.min(Math.max(target.y - pos.y, -modRate), modRate);
                        monty.move(
                           pos.subtract(monty.position.value()),
                           renderer,
                           [ 'below', 'main' ],
                           hitbox => hitbox !== monty && hitbox.metadata.barrier === true
                        );
                     }
                  }
               }
            }
            if (!roomState.view) {
               roomState.view = true;
               const scale = 0.5;
               const width = 700 * scale;
               const maxPos = renderer.region[1].x;
               const parallax = (maxPos - (width - 320)) / maxPos;
               const castle = new CosmosSprite({
                  area: renderer.area,
                  alpha: 0.65,
                  anchor: { x: 0, y: 1 },
                  scale: { x: scale, y: scale },
                  position: { x: width / 2 - renderer.region[0].x * parallax, y: 20 },
                  parallax: { x: parallax },
                  frames: [ content.iooFViewBackdrop ],
                  filters: [ assets.filters.bloom20 ]
               }).on('tick', function () {
                  this.alpha.value = CosmosMath.remap(
                     CosmosMath.bezier(Math.min(Math.abs(500 - player.x), 400) / 400, 0.95, 1, 1),
                     0,
                     0.65 + Math.random() * 0.1,
                     1,
                     0.95
                  );
               });
               renderer.attach('main', castle);
               const music = assets.music.splendor.instance(timer);
               roomState.music = music;
               events.on('teleport').then(() => {
                  renderer.detach('main', castle);
                  roomState.view = false;
                  music.gain.modulate(timer, 300, 0).then(() => {
                     roomState.music = null;
                     music.stop();
                  });
               });
            }
            if (roomState.music) {
               const value = Math.min(Math.max(300 - Math.abs(500 - player.x), 0) / 250, 1);
               roomState.music.gain.value = value * 0.5;
               const tintValue = colormix(0xffffff, 0x353535, value);
               monty.tint = tintValue;
               player.tint = tintValue;
               renderer.layers.below.objects[0].tint = tintValue;
            }
            break;
         }
         case 'f_puzzle1':
         case 'f_puzzle2':
         case 'f_puzzle3': {
            const multi = [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ];
            const target = puzzleTarget();
            if (!roomState.restore) {
               roomState.restore = true;
               for (const { object: pylon } of instances('main', 'pylon')) {
                  const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
                  const x = save.data.n[`state_foundry_${name.slice(2)}x` as keyof OutertaleDataNumber];
                  const y = save.data.n[`state_foundry_${name.slice(2)}y` as keyof OutertaleDataNumber];
                  x > 0 && (pylon.position.x = x);
                  y > 0 && (pylon.position.y = y);
               }
            }
            if (save.data.n.plot < target) {
               if (!roomState.init) {
                  roomState.init = true;
                  const nf =
                     game.room === 'f_puzzle1'
                        ? content.iooFPuzzle1Over
                        : game.room === 'f_puzzle2'
                        ? content.iooFPuzzle2Over
                        : content.iooFPuzzle3Over;
                  const origin = game.room;
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position:
                        game.room === 'f_puzzle1'
                           ? { x: 220, y: 0 }
                           : game.room === 'f_puzzle2'
                           ? { x: 420, y: 140 }
                           : { x: 840, y: 0 },
                     frames: [ nf ]
                  }).on('tick', function () {
                     this.frames = game.room === origin ? [ nf ] : [];
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position:
                        game.room === 'f_puzzle1'
                           ? { x: 220, y: 80 }
                           : game.room === 'f_puzzle2'
                           ? { x: 420, y: 220 }
                           : { x: 840, y: 80 },
                     size: { x: 20, y: game.room === 'f_puzzle2' ? 40 : 60 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  await timer.when(() => save.data.n.plot === target);
                  renderer.detach('main', cover, barrier);
               }
               const pylonz = [ ...instances('main', 'pylon') ].map(instance => instance.object);
               hyperloop: for (const pylon of pylonz) {
                  if (timer.tasks.has(pylon.position)) {
                     continue;
                  }
                  const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
                  save.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}x`] = pylon.position.x;
                  save.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}y`] = pylon.position.y;
                  const minX = pylon.position.x - 10;
                  const maxX = pylon.position.x + 10;
                  const minY = pylon.position.y - 20;
                  const maxY = pylon.position.y;
                  if (player.x > minX && player.x < maxX) {
                     if (
                        [ 'f_puzzlepylon1B', 'f_puzzlepylon2B', 'f_puzzlepylon3F', 'f_puzzlepylon3H' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.x !== 310) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.x !== 350) ||
                        ([ 'f_puzzlepylon3A', 'f_puzzlepylon3B' ].includes(name) &&
                           ![ 590, 650 ].includes(pylon.position.x)) ||
                        ([ 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(name) &&
                           ![ 730, 790 ].includes(pylon.position.x))
                     ) {
                        continue;
                     }
                     if (player.y < pylon.position.y) {
                        if (keys.downKey.active() && player.y > minY) {
                           if (name === 'f_puzzlepylon1A' && pylon.position.y === 260) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.y === 200) {
                              continue;
                           }
                           if ([ 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) && pylon.position.y === 160) {
                              continue;
                           }
                           if (multi && pylon.position.y === 260) {
                              continue;
                           }
                           const targetpos = pylon.position.add(0, 10);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.y -= 1.5;
                        }
                     } else if (keys.upKey.active() && player.y < maxY + 5) {
                        if (name === 'f_puzzlepylon1A' && pylon.position.y === 180) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon2A', 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) &&
                           pylon.position.y === 120
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(
                              name
                           ) &&
                           pylon.position.y === 200
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(0, -10);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.y += 1.5;
                     }
                  } else if (player.y > minY && player.y < maxY) {
                     if (
                        [ 'f_puzzlepylon1A', 'f_puzzlepylon2C' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.y !== 200) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.y !== 120) ||
                        (multi.includes(name) && ![ 200, 260 ].includes(pylon.position.y))
                     ) {
                        continue;
                     }
                     if (player.x < pylon.position.x) {
                        if (keys.rightKey.active() && player.x > minX - 10) {
                           if (name === 'f_puzzlepylon1B' && pylon.position.x === 190) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.x === 350) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2B' && pylon.position.x === 270) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2D' && pylon.position.x === 390) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                              pylon.position.x === 650
                           ) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                              pylon.position.x === 790
                           ) {
                              continue;
                           }
                           const targetpos = pylon.position.add(10, 0);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.x -= 1.5;
                        }
                     } else if (keys.leftKey.active() && player.x < maxX + 10) {
                        if (name === 'f_puzzlepylon1B' && pylon.position.x === 130) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2A' && pylon.position.x === 310) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2B' && pylon.position.x === 230) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2D' && pylon.position.x === 350) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                           pylon.position.x === 590
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                           pylon.position.x === 730
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(-10, 0);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.x += 1.5;
                     }
                  }
               }
            } else {
               for (const { object: pylon } of instances('main', 'pylon')) {
                  if (!pylon.metadata.active) {
                     pylon.metadata.active = true;
                     (pylon.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation).index = 1;
                  }
               }
            }
            break;
         }
         case 'f_prechase': {
            if (save.data.n.plot < 48 || world.genocide) {
               for (const inst of instances('below', 'bridge')) {
                  inst.destroy();
               }
               for (const inst of instances('main', 'bridge')) {
                  inst.destroy();
               }
            } else {
               instance('below', 'bridgeblocker')?.destroy();
            }
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 37.11) {
                  let hover = false;
                  let controller = true;
                  const time = timer.value;
                  const fishShake = new CosmosValue();
                  const fishPosition = new CosmosPoint();
                  await timer.when(() => player.x > 419 && game.room === 'f_prechase' && game.movement);
                  // ensuring MK assets are loaded
                  const kiddLoader = kiddAssets.load();
                  const tinter = new CosmosValue(0);
                  const fish = character('undyneArmor', characters.undyneArmor, { x: 420, y: 80 }, 'up', {
                     tint: assets.tints.dark02
                  }).on('tick', function () {
                     if (tinter.value !== -1) {
                        this.tint = colormix(assets.tints.dark02, assets.tints.dark03, tinter.value);
                     }
                  });
                  fishPosition.x = fish.position.x;
                  fishPosition.y = fish.position.y;
                  const fishListener = () => {
                     if (controller) {
                        fish.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                     }
                     if (hover) {
                        fish.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                     }
                  };
                  fish.on('tick', fishListener);
                  game.movement = false;
                  save.data.n.plot = 37.11;
                  const PX = player.x;
                  const cam = new CosmosObject({ position: { x: PX, y: 260 } });
                  game.camera = cam;
                  const OGregion = renderer.region[0].y;
                  const kidd = world.genocide
                     ? new CosmosCharacter({ preset: characters.none, key: 'mogus420' })
                     : character('kidd', characters.kidd, { x: player.x + 200, y: player.y }, 'down', {
                          key: 'kidd',
                          tint: assets.tints.dark02
                       });
                  if (!world.genocide) {
                     await timer.pause(850);
                     renderer.region[0].y = -1000;
                     cam.position.modulate(timer, 2000, { x: PX, y: 140 });
                     if (!world.dead_skeleton) {
                        const paps = character('papyrusStark', characters.papyrusStark, { x: 280, y: 80 }, 'right', {
                           tint: assets.tints.dark02
                        });
                        paps.walk(timer, 2, { x: 340 });
                        await timer.pause(1350);
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
                        await dialogue('auto', ...text.a_foundry.undyne1c());
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
                        await dialogue('auto', ...text.a_foundry.undyne1g());
                        paps.walk(timer, 1, { x: 390 });
                        timer.pause(850).then(() => {
                           fish.face = 'left';
                        });
                        await dialogue('auto', ...text.a_foundry.undyne1h());
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
                     cam.position.modulate(timer, 2000, { x: PX, y: 260 });
                     await kidd.walk(timer, 4, { x: player.x + 21 });
                     characters.kidd.walk.down.enable(5);
                     kidd.face = 'down';
                     await timer.pause(650);
                     characters.kidd.walk.up.enable(5);
                     kidd.face = 'up';
                     await timer.pause(650);
                     characters.kidd.walk.right.enable(5);
                     kidd.face = 'right';
                     await timer.pause(1150);
                     kidd.face = 'left';
                     await dialogue('auto', ...text.a_foundry.undyne1j);
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                  }
                  game.music!.gain.value = 0;
                  game.camera = cam;
                  renderer.region[0].y = -1000;
                  audio.musicReverb.value = 0;
                  await cam.position.modulate(timer, 400, { x: PX, y: 140 });
                  assets.sounds.notify.instance(timer);
                  fish.face = 'down';
                  await timer.pause(650);
                  const fishMusic = assets.music.undyne.instance(timer);
                  const stepSFX = () => {
                     if (fish.sprite.index % 2 === 1 && fish.sprite.step === 0) {
                        assets.sounds.stomp.instance(timer).gain.value = (Math.min(fish.position.y, 90) / 90) * 0.8;
                     }
                  };
                  await Promise.all([
                     (async () => {
                        fish.on('tick', stepSFX);
                        characters.undyneArmor.walk.down.enable(6);
                        while (fishPosition.y < 115) {
                           await renderer.on('tick');
                           fishPosition.y = Math.min(fishPosition.y + 1, 115);
                        }
                        characters.undyneArmor.walk.down.reset();
                        fish.off('tick', stepSFX);
                     })(),
                     world.genocide || dialogue('auto', ...text.a_foundry.undyne1k)
                  ]);
                  await timer.pause(world.genocide ? 850 : 1850);
                  if (world.genocide) {
                     header('x1').then(() => (azzie.face = 'up'));
                     header('x2').then(() => (fish.face = 'left'));
                     header('x3').then(() => (fish.face = 'down'));
                     header('x4').then(() => (fish.face = 'up'));
                     header('x5').then(() => (fish.face = 'down'));
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish1());
                     await timer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish2);
                     timer.pause(1000).then(() => {
                        fishMusic.gain.modulate(timer, 5000, 0).then(() => {
                           fishMusic.stop();
                           content.amUndyne.unload();
                           audio.musicReverb.value = rooms.of(game.room).score.reverb;
                           resume({ gain: world.level, rate: world.ambiance });
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
                     await timer.pause(650);
                     await cam.position.modulate(timer, 2000, { x: PX, y: 260 });
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish3());
                     game.movement = true;
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
                     tinter.modulate(timer, 800, 0, 1, 1);
                     fishPosition
                        .modulate(timer, 800, {}, { y: fishPosition.y - 10 }, { y: fishPosition.y - 10 })
                        .then(async () => {
                           await timer.pause(1650);
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
                           await timer.when(() => player.x > fish.position.x + 320);
                           renderer.detach('main', spearFish);
                           content.iocUndyneDownArmorSpear.unload();
                           assets.sounds.noise.instance(timer).gain.value = 0.1;
                           flame.gain.modulate(timer, 0, 0);
                           await timer.pause(1150);
                           assets.sounds.stomp.instance(timer).gain.value = 0.2;
                           shake(1, 500);
                        });
                     await timer.pause(450);
                     dialogue('auto', ...text.a_foundry.undyne1l);
                     await cam.position.modulate(timer, 1000, { x: PX, y: 260 });
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                     const raftblock = new CosmosHitbox({
                        anchor: 1,
                        position: { x: -10 },
                        size: 20
                     });
                     const platform = new CosmosSprite({
                        position: { x: 250 + 360, y: 130 + 140 },
                        anchor: { x: 0, y: 1 },
                        priority: -18937659153,
                        frames: [ content.iooFRaft ],
                        objects: [ raftblock ]
                     });
                     renderer.attach('main', platform);
                     await Promise.all([
                        player.walk(timer, 3, { x: 605, y: 260 }),
                        kidd.walk(timer, 4, { x: 615, y: 260 })
                     ]);
                     save.data.n.plot = 37.2;
                     timer.pause(3000).then(() => {
                        flame.gain.modulate(timer, 5000, 0);
                        fishMusic.gain.modulate(timer, 5000, 0).then(() => {
                           fishMusic.stop();
                        });
                     });
                     renderer.region[1].x = 1260;
                     await Promise.all([
                        player.position.step(timer, 3, { x: 885 + 360 }),
                        platform.position.step(timer, 3, { x: 890 + 360 }),
                        kidd.position.step(timer, 3, { x: 895 + 360 })
                     ]);
                     await kidd.walk(timer, 2, { x: kidd.x + 20 }, { x: kidd.x + 20, y: kidd.y - 10 });
                     kidd.face = 'down';
                     await dialogue('auto', ...text.a_foundry.undyne1m);
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.undyne1n);
                     const base = player.x;
                     timer
                        .when(() => player.x > base + 25)
                        .then(async () => {
                           await Promise.race([ events.on('teleport'), platform.position.step(timer, 3, { x: 0 }) ]);
                           renderer.detach('main', platform);
                        });
                     await player.walk(timer, 3, { x: kidd.x + 21 });
                     await kidd.walk(timer, 3, { y: player.y });
                     await timer.pause(650);
                     kidd.face = 'left';
                     await timer.pause(1250);
                     kidd.face = 'right';
                     await dialogue('auto', ...text.a_foundry.undyne1o);
                     renderer.detach('main', kidd);
                     renderer.attach('main', monty);
                     monty.position.set(kidd);
                     monty.face = 'right';
                     monty.metadata.reposition = true;
                     monty.metadata.repositionFace = 'right';
                     raftblock.metadata.barrier = true;
                     game.movement = true;
                     game.menu = false;
                     resume({ gain: world.level, rate: world.ambiance });
                     await timer.when(() => player.x > 1360 && game.movement);
                     game.music!.gain.value = 0;
                     audio.musicReverb.value = 0;
                     game.movement = false;
                     await dialogue('auto', ...text.a_foundry.undyne1p);
                     cam.position.set(player.position.clamp(...renderer.region));
                     renderer.region[1].x = Infinity;
                     game.camera = cam;
                     renderer.attach('main', fish);
                     fishPosition.set({ x: 1470, y: 260 });
                     fish.face = 'right';
                     fish.preset = characters.undyneArmorJetpack;
                     fish.tint = assets.tints.dark03;
                     fish.alpha.value = 0;
                     await cam.position.modulate(timer, 400, { x: 1340 });
                     await timer.pause(250);
                     fish.alpha.modulate(timer, 450, 1);
                     flame.gain.modulate(timer, 450, 0.1);
                     assets.sounds.fear.instance(timer);
                     await timer.pause(1000);
                     const runMusic = assets.music.undynefast.instance(timer);
                     runMusic.gain.value = 0.8;
                     await timer.pause(1650);
                     await dialogue('auto', ...text.a_foundry.undyne1q);
                     game.movement = true;
                     world.cutscene_override = true;
                     await events.on('teleport');
                     renderer.detach('main', fish);
                     flame.stop();
                     game.camera = player;
                     game.movement = false;
                     teleporter.movement = false;
                     await timer.pause(1250);
                     await dialogue('auto', ...text.a_foundry.undyne1r);
                     game.movement = true;
                     await timer.when(() => game.room === 'f_entrance' && player.x > 220 && game.movement);
                     game.movement = false;
                     fishPosition.x = 280;
                     fishPosition.y = player.y - 160;
                     fish.alpha.value = 1;
                     tinter.value = -1;
                     fish.tint = void 0;
                     renderer.attach('main', fish);
                     fish.on('tick', () => void script('tick'));
                     await dialogue('auto', ...text.a_foundry.undyne1s);
                     await player.walk(timer, 3, { x: 400 });
                     monty.walk(timer, 3, { x: 400 });

                     // fade out music & restore score
                     runMusic.gain.modulate(timer, 5000, 0).then(() => {
                        runMusic.stop();
                     });

                     // fish stops being mad
                     await timer.pause(1350);
                     fish.face = 'down';
                     await fishShake.modulate(timer, 1000, 0);
                     timer
                        .when(() => fish.position.y > player.y - 15)
                        .then(() => {
                           fish.preset = characters.undyneArmor;
                           assets.sounds.noise.instance(timer).gain.value = 0.5;
                        });
                     await fishPosition.modulate(timer, 1150, fishPosition.value(), { y: player.y }, { y: player.y });
                     hover = false;
                     assets.sounds.stomp.instance(timer).gain.value = 0.9;
                     shake(1.25, 500);
                     await timer.pause(650);

                     // fish walks towards player
                     const stepSFX = () => {
                        if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                           assets.sounds.stomp.instance(timer).gain.value = CosmosMath.remap(
                              fish.position.x,
                              0,
                              0.8,
                              120,
                              400
                           );
                        }
                     };

                     // walk towards player X
                     fish.face = 'right';
                     characters.undyneArmor.walk.right.duration = 6;
                     characters.undyneArmor.walk.right.enable();
                     while (fishPosition.x < monty.x - 19) {
                        await renderer.on('tick');
                        fishPosition.x = Math.min(fishPosition.x + 1, monty.x - 19);
                     }
                     characters.undyneArmor.walk.right.reset();
                     fish.off('tick', stepSFX);

                     // fish grabs the... oh wait it's monster kid
                     await timer.pause(2150);
                     fish.alpha.value = 0;
                     const touchie = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        priority: 121,
                        position: fish.position.value(),
                        resources: content.iocUndyneGrabKidd
                     });
                     renderer.attach('main', touchie);
                     timer
                        .when(() => touchie.index === 1)
                        .then(() => {
                           assets.sounds.grab.instance(timer);
                        });
                     await timer.when(() => touchie.index === 29);
                     renderer.detach('main', touchie);
                     fish.alpha.value = 1;
                     await timer.pause(850);
                     fish.face = 'left';
                     await timer.pause(1350);
                     controller = false;

                     // the fish ran away
                     characters.undyneArmor.walk.left.duration = 4;
                     characters.undyneArmor.walk.left.step = 1;
                     fish.on('tick', stepSFX);
                     await fish.walk(timer, 2, { x: 120 });
                     fish.off('tick', stepSFX);
                     characters.undyneArmor.walk.left.reset();
                     fish.alpha.value = 0;

                     // script end... just KIDding it's monster KID!!
                     monty.metadata.override = true;
                     await monty.walk(timer, 4, { x: 500 });
                     await tripper(monty);
                     await timer.pause(500);
                     monty.face = 'left';
                     await timer.pause(500);
                     monty.face = 'up';
                     await timer.pause(500);
                     monty.face = 'down';
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.undyne2a);
                     await timer.pause(850);
                     monty.face = 'left';
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.undyne2b);
                     await player.walk(timer, 3, monty.position.subtract(21, 0));
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.undyne2c);
                     await monty.walk(timer, 2, player.position.add(0, 14), player.position.subtract(21, 0));
                     await timer.pause(350);
                     monty.face = 'right';
                     await Promise.all([ kiddLoader, timer.pause(850) ]);
                     await dialogue('auto', ...text.a_foundry.undyne2d);
                     player.face = 'right';
                     monty.metadata.override = false;
                     monty.metadata.reposition = true;
                     monty.metadata.repositionFace = 'right';

                     // restore game music
                     const score = rooms.of('f_entrance').score;
                     const daemon = audio.music.of(score.music!);
                     audio.musicFilter.value = score.filter;
                     audio.musicMixer.value = score.gain;
                     audio.musicReverb.value = score.reverb;
                     game.music = daemon.instance(timer);
                     game.music.rate.value = score.rate * world.ambiance;

                     // script end (for real this time)
                     renderer.detach('main', fish);
                     world.cutscene_override = false;
                     save.data.n.plot = 38.01;
                     game.movement = true;
                     game.menu = true;
                  }
               }
               if (save.data.n.plot < 37.2) {
                  const ebar = instance('below', 'ebar')!.object.objects[0] as CosmosHitbox;
                  ebar.metadata.barrier = false;
                  const raftblock = new CosmosHitbox({
                     anchor: 1,
                     position: { x: -10 },
                     size: 20
                  });
                  const platform = new CosmosSprite({
                     position: { x: 250 + 360, y: 130 + 140 },
                     anchor: { x: 0, y: 1 },
                     priority: -18937659153,
                     frames: [ content.iooFRaft ],
                     objects: [ raftblock ]
                  });
                  renderer.attach('main', platform);
                  isolate(platform);
                  timer
                     .when(() => 255 + 360 <= player.x && game.room === 'f_prechase' && game.movement)
                     .then(async () => {
                        save.data.n.plot = 37.2;
                        player.x = 255 + 360;
                        game.movement = false;
                        if (world.genocide) {
                           await timer.pause(450);
                           player.face = 'left';
                           await timer.pause(1000);
                           azzie.metadata.override = true;
                           azzie.priority.value = player.y - 1;
                           await azzie.walk(timer, 1, player.position.subtract(4.5, 0));
                           azzie.face = 'right';
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_foundry.genotext.asrielHug1);
                           await Promise.all([
                              player.position.step(timer, 3, { x: player.x + 640 }),
                              platform.position.step(timer, 3, { x: platform.position.x + 640 }),
                              azzie.position.step(timer, 3, { x: azzie.x + 640 }),
                              timer.pause(1950).then(async () => {
                                 player.alpha.value = 0;
                                 const hugger = new CosmosAnimation({
                                    active: true,
                                    anchor: { x: 0, y: 1 },
                                    resources: content.iocAsrielHug1,
                                    priority: player.y + 10,
                                    position: player.position,
                                    tint: assets.tints.dark02
                                 }).on('tick', function () {
                                    this.position.set(player.position);
                                 });
                                 renderer.attach('main', hugger);
                                 await timer.when(() => hugger.index === 1);
                                 hugger.disable();
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.genotext.asrielHug2);
                                 await timer.pause(2150);
                                 keys.interactKey.active() && (await keys.interactKey.on('up'));
                                 hugger.index = 0;
                                 await timer.pause(600);
                                 renderer.detach('main', hugger);
                                 player.alpha.value = 1;
                                 await timer.pause(1650);
                                 player.face = 'right';
                              })
                           ]);
                           await player.walk(timer, 3, { x: azzie.x + 21 });
                           await Promise.all([
                              player.walk(timer, 3, { x: player.x + 8.5 + 10 }),
                              azzie.walk(timer, 3, {
                                 x: azzie.x + 8.5 + 10
                              })
                           ]);
                           azzie.metadata.override = false;
                           azzie.priority.value = 0;
                           await timer.pause(850);
                           dialogue('auto', ...text.a_foundry.genotext.asrielHug3).then(() => {
                              game.movement = true;
                           });
                        } else {
                           await Promise.all([
                              player.position.step(timer, 3, { x: 890 + 360 }),
                              platform.position.step(timer, 3, { x: 890 + 360 })
                           ]);
                           raftblock.metadata.barrier = true;
                           game.movement = true;
                           const base = player.x;
                           await timer.when(() => player.x > base + 25);
                        }
                        ebar.metadata.barrier = true;
                        await Promise.race([ events.on('teleport'), platform.position.step(timer, 3, { x: 0 }) ]);
                        renderer.detach('main', platform);
                     });
               }
            }
            break;
         }
         case 'f_spear': {
            let sh = 0;
            const LIM = save.data.n.plot > 45 || world.genocide ? 0 : 12;
            roomState.phaser ??= 0;
            if (player.y < 100) {
               roomState.phaser = 0;
            } else if (player.y > 300) {
               roomState.phaser = LIM;
            } else if (player.y < 120) {
               if (roomState.phaser > 0) {
                  roomState.phaser--;
                  sh = 160;
               }
            } else if (player.y > 280) {
               if (roomState.phaser < LIM) {
                  roomState.phaser++;
                  sh = -160;
               }
            }
            if (sh) {
               for (const obj of renderer.layers.main.objects) {
                  if (obj === player || obj === azzie || obj === monty || obj.metadata.shiftable) {
                     obj.y += sh;
                  }
               }
            }
            break;
         }
         case 'f_entrance': {
            let sound = true;
            for (const tallgrass of instances('main', 'tallgrass')) {
               const obby = tallgrass.object;
               const anim = obby.objects.filter(subobby => subobby instanceof CosmosAnimation)[0] as CosmosAnimation;
               const contact = [ player, ...fetchCharacters() ]
                  .map(
                     susser =>
                        susser.position.y > obby.position.y - 10 &&
                        susser.position.y < obby.position.y + 5 &&
                        Math.abs(obby.position.x - susser.position.x) < 25
                  )
                  .includes(true);
               if (contact && anim.index === 0) {
                  if (sound) {
                     sound = false;
                     assets.sounds.rustle.instance(timer);
                  }
                  anim.index = 1;
               } else if (!contact && anim.index === 1) {
                  anim.index = 0;
               }
            }
            if (!roomState.meetMK) {
               roomState.meetMK = true;
               if (world.genocide && save.data.n.plot < 38.01) {
                  await timer.when(() => game.room === 'f_entrance' && player.x > 100 && game.movement);
                  // ensuring MK assets are loaded
                  const kiddLoader = kiddAssets.load();
                  game.movement = false;
                  save.data.n.plot = 38.01;
                  monty.position.set(340, player.y);
                  monty.metadata.override = true;
                  monty.face = 'left';
                  renderer.attach('main', monty);
                  await monty.walk(timer, 4, { x: player.x + 100 });
                  await tripper(monty, content.iocKiddLeftTrip);
                  await monty.walk(timer, 4, { x: player.x + 21 });
                  await dialogue('auto', ...text.a_foundry.undyne2ax);
                  await monty.walk(
                     timer,
                     2,
                     azzie.position.add(0, player.y > 440 ? -14 : 14),
                     azzie.position.subtract(21, 0)
                  );
                  await timer.pause(350);
                  monty.face = 'right';
                  monty.position = monty.position;
                  monty.metadata.reposition = true;
                  monty.metadata.repositionFace = 'right';
                  monty.metadata.override = false;
                  await Promise.all([ kiddLoader, timer.pause(850) ]);
                  await dialogue('auto', ...text.a_foundry.undyne2bx);
                  game.movement = true;
                  await timer.when(() => game.room === 'f_entrance' && player.x > 280 && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2cx);
                  await timer.when(() => game.room === 'f_entrance' && player.x > 520 && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2dx());
                  await timer.when(() => game.room === 'f_lobby' && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2ex);
               }
            }
            break;
         }
         case 'f_stand': {
            (48 <= save.data.n.plot || world.genocide) && instance('main', 'f_shortsy')?.destroy();
            (48 <= save.data.n.plot || world.genocide) && instance('main', 'f_longsy')?.destroy();
            {
               const inst = instance('main', 's_nicecream');
               // fled from previous area
               if (world.genocide || save.data.n.kills_starton + save.data.n.bully_starton > 2) {
                  inst?.destroy();
                  instance('main', 'dimbox')?.destroy();
                  instance('below', 'xtrabarrier')?.destroy();
                  (
                     instance('below', '21flavors')!.object.objects.filter(
                        obj => obj instanceof CosmosSprite
                     )[0] as CosmosSprite
                  ).frames = [ content.iooFWallsign ];
               }
               // moved to next area
               else if (save.data.n.plot > 59) {
                  inst?.destroy();
                  instance('below', 'xtrabarrier')?.destroy();
                  instance('below', '21flavors')?.destroy();
               } else if (inst && !inst.object.metadata.active) {
                  inst.object.metadata.active = true;
                  const guyanim = inst.object.objects[0] as CosmosAnimation;
                  // fled from current area
                  if (save.data.n.kills_foundry + save.data.n.bully_foundry > 2) {
                     guyanim.index = 3;
                  } else {
                     // purchased a nice cream
                     save.data.b.f_state_nicecream && (guyanim.index = 2);
                  }
               }
            }
            break;
         }
         case 'f_telescope': {
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && save.data.n.plot < 38.1) {
                  await timer.when(() => game.room === 'f_telescope' && player.x > 300 && game.movement);
                  game.movement = false;
                  save.data.n.plot = 38.1;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34x);
                  azzie.metadata.override = true;
                  await azzie.walk(
                     timer,
                     3,
                     player.position.add(0, player.y > 140 ? -21 : 21),
                     player.position.add(21, 0)
                  );
                  await timer.pause(450);
                  azzie.face = 'left';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34);
                  await azzie.walk(timer, 3, { x: 440, y: 140 });
                  renderer.detach('main', azzie);
                  monty.metadata.override = true;
                  await Promise.all([
                     dialogue('auto', ...text.a_foundry.genotext.kidd1),
                     monty.walk(timer, 2, player.position.subtract(21, 0)).then(() => {
                        monty.metadata.reposition = true;
                     })
                  ]);
                  monty.metadata.override = false;
                  game.movement = true;
               }
            }
            if (!roomState.sandy) {
               roomState.sandy = true;
               if (!world.dead_skeleton && save.data.n.plot < 39) {
                  const sand = character('sans', characters.sans, { x: 135, y: 105 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'foundry', args: [ 'sandinter' ] }
                  });
                  await events.on('teleport');
                  roomState.sandy = false;
                  renderer.detach('main', sand);
               }
            }
            break;
         }
         case 'f_bird': {
            if (!world.phish) {
               if (
                  !roomState.bird &&
                  save.data.n.plot > 42 &&
                  !world.genocide &&
                  save.data.s.state_foundry_deathroom !== 'f_bird'
               ) {
                  const bird = new CosmosHitbox({
                     anchor: 0,
                     size: { x: 20, y: 20 },
                     position: { x: player.x > 750 ? 1360 : 140, y: 140 },
                     metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'birdcheck' ] },
                     objects: [
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           active: true,
                           resources: content.ionFBird
                        })
                     ]
                  });
                  renderer.attach('main', (roomState.bird = bird));
                  bird.on('tick', () => {
                     if (save.data.s.state_foundry_deathroom === 'f_bird') {
                        renderer.detach('main', roomState.bird);
                        roomState.bird = void 0;
                     } else if (world.phish) {
                        bird.alpha.value = 0;
                        bird.metadata.barrier = false;
                        bird.metadata.interact = false;
                     }
                  });
                  await events.on('teleport');
                  renderer.detach('main', roomState.bird);
                  roomState.bird = void 0;
                  break;
               }
               if (!roomState.active) {
                  roomState.active = true;
                  if (!save.data.b.f_state_kidd_bird && save.data.n.plot < 42 && world.monty) {
                     await timer.when(() => game.room === 'f_bird' && player.x > 135 && game.movement);
                     if (save.data.n.plot < 42) {
                        save.data.b.f_state_kidd_bird = true;
                        await dialogue('auto', ...text.a_foundry.walktext.bird());
                     }
                  }
               }
               if (save.data.n.plot > 42 && !roomState.subercheck) {
                  roomState.subercheck = true;
                  if (!save.data.b.f_state_narrator_bird && world.genocide) {
                     await timer.when(() => game.room === 'f_bird' && player.x < 1365 && game.movement);
                     game.movement = false;
                     save.data.b.f_state_narrator_bird = true;
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.walktext.birdx);
                     game.movement = true;
                  }
               }
            }
            break;
         }
         case 'f_piano': {
            if (!roomState.active) {
               roomState.active = true;
               if (!save.data.b.f_state_piano) {
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position: { x: 40, y: 100 },
                     frames: [ content.iooFPianoOver1 ]
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 40 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  timer
                     .when(() => save.data.b.f_state_piano)
                     .then(() => {
                        renderer.detach('main', cover, barrier);
                     });
               }
               if (!save.data.b.f_state_truth) {
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position: { x: 240, y: 100 },
                     frames: [ content.iooFPianoOver2 ]
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position: { x: 240, y: 180 },
                     size: { x: 20, y: 40 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  timer
                     .when(() => save.data.b.f_state_truth)
                     .then(() => {
                        renderer.detach('main', cover, barrier);
                     });
               }
            }
            break;
         }
         case 'f_lobby': {
            save.data.b.item_boots && instance('main', 'f_booties')?.destroy();
            break;
         }
         case 'f_statue': {
            if (!roomState.init) {
               roomState.init = true;
               const overhead = new CosmosSprite({
                  alpha: 0.15,
                  position: { x: 200, y: 0 },
                  anchor: { x: 0 },
                  priority: 10000,
                  frames: [ content.iooFOverhead ]
               });
               const statue = instance('main', 'statue')!.object.objects[0] as CosmosAnimation;
               const switches = instance('main', 'lightswitch')!;
               let music = null as CosmosInstance | null;
               const OGfilter = audio.musicFilter.value;
               const solu = new CosmosAnimation({
                  active: true,
                  alpha: 0,
                  anchor: 0,
                  position: { x: 200, y: 180 },
                  resources: content.iooFPianosolution
               });
               for (const subobj of switches.object.objects as CosmosSprite[]) {
                  subobj.index = 1;
                  subobj.on('tick', function () {
                     let stepped = false;
                     for (const subject of [ player, monty ]) {
                        if (
                           renderer.layers.main.objects.includes(subject) &&
                           Math.abs(this.position.x - subject.position.x) < 8 &&
                           Math.abs(this.position.y - subject.position.y) < 8
                        ) {
                           stepped = true;
                           break;
                        }
                     }
                     if (stepped && subobj.index === 1) {
                        subobj.index = 0;
                        assets.sounds.noise.instance(timer);
                        if (world.monty && subobj.position.x < 200 && save.data.n.state_foundry_muffet !== 1) {
                           game.menu = false;
                           statue.index = 1;
                           renderer.attach('main', overhead, solu);
                           solu.alpha.modulate(timer, 2000, 0).then(() => {
                              solu.alpha.modulate(timer, 2000, 0.3);
                           });
                           music = assets.music.memory.instance(timer, { store: true });
                           music!.gain.value = 0;
                           Promise.all([
                              game.music!.gain.modulate(timer, 500, 0),
                              audio.musicFilter.modulate(timer, 500, 0)
                           ]).then(() => {
                              music!.gain.modulate(timer, 1000, assets.music.memory.gain);
                           });
                        }
                     } else if (!stepped && subobj.index === 0) {
                        if (subobj.position.x < 200 && save.data.n.state_foundry_muffet !== 1) {
                           game.menu = true;
                           statue.index = 0;
                           renderer.detach('main', overhead, solu);
                           solu.alpha.modulate(timer, 0, 0);
                           music?.stop();
                           audio.musicFilter.value = OGfilter;
                           game.music!.gain.modulate(timer, 500, world.level);
                        }
                        subobj.index = 1;
                        renderer.alpha.value > 0 && (assets.sounds.noise.instance(timer).rate.value = 1.25);
                     }
                  });
               }
            }
            if (!roomState.activated) {
               roomState.activated = true;
               if (world.monty && save.data.n.state_foundry_muffet !== 1) {
                  monty.metadata.barrier = true;
                  monty.metadata.override = true;
                  monty.position.set(player.position.subtract(0, 21));
                  monty.alpha.value = 1;
                  monty.alpha.modulate(timer, 0, 1);
                  await timer.when(() => game.movement);
                  if (!save.data.b.f_state_kidd_statue) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.kiddStatue);
                     save.data.b.f_state_kidd_statue = true;
                  }
                  let schmovin = true;
                  for (const sprite of Object.values(monty.sprites)) {
                     sprite.duration = Math.round(15 / 2);
                  }
                  const dirX = 230 - monty.x < 0 ? -1 : 1;
                  const dirY = 110 - monty.y < 0 ? -1 : 1;
                  CosmosUtils.chain<void, Promise<void>>(void 0, async (z, next) => {
                     const diffX = Math.abs(230 - monty.x);
                     const diffY = Math.abs(110 - monty.y);
                     monty.move(
                        {
                           x: (diffX === 0 ? 0 : diffX < 2 ? diffX : 2) * dirX,
                           y: (diffY === 0 ? 0 : diffY < 2 ? diffY : 2) * dirY
                        },
                        renderer
                     );
                     if (schmovin && (diffX > 0 || diffY > 0)) {
                        await renderer.on('tick');
                        await next();
                     }
                  }).then(() => {
                     if (schmovin) {
                        monty.face = 'down';
                        monty.metadata.interact = true;
                        monty.metadata.name = 'trivia';
                        monty.metadata.args = [ 'f_statue_kidd' ];
                        if (renderer.detect(monty, player).length > 0) {
                           player.y = monty.y + monty.size.y;
                        }
                     }
                  });
                  await events.on('teleport');
                  schmovin = false;
                  monty.metadata.barrier = false;
                  monty.metadata.interact = false;
                  monty.metadata.name = void 0;
                  monty.metadata.args = void 0;
                  monty.metadata.override = false;
                  monty.metadata.reposition = true;
                  await timer.when(() => game.movement);
                  roomState.activated = false;
               }
            }
            break;
         }
         case 'f_napstablook': {
            if (roomState.customsAuto) {
               (roomState.customs as CosmosInstance).gain.value =
                  (roomState.customsLevel as number) * renderer.alpha.value;
            }
            break;
         }
         case 'f_undyne': {
            if (2 <= save.data.n.plot_date) {
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
            [ 1, 4, 5 ].includes(save.data.n.state_foundry_maddummy) && instance('main', 'f_dummynpc')?.destroy();
            if (!roomState.comcheck && world.azzie && world.monty) {
               roomState.comcheck = true;
               await timer.when(() => game.movement);
               if (!save.data.b.f_state_kidd_undynecom && world.genocide && world.monty) {
                  save.data.b.f_state_kidd_undynecom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.undynecom);
               }
            }
            break;
         }
         case 'f_village': {
            if (world.genocide || world.population === 0) {
               instance('main', 'f_temmie1')?.destroy();
               instance('main', 'f_temmie2')?.destroy();
               instance('main', 'f_temmie3')?.destroy();
               instance('main', 'f_temmie5')?.destroy();
               instance('main', 'f_temmie6')?.destroy();
               instance('main', 'f_temmie7')?.destroy();
               world.bullied || instance('main', 'f_mushroomdance')?.destroy();
               instance('main', 'f_eggo')?.destroy();
               instance('main', 'f_genohole')!.object.position.y = 0;
            }
            break;
         }
         case 'f_exit': {
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide && save.data.n.plot < 48) {
                  renderer.detach('main', phish);
                  await timer.when(() => game.movement);
                  game.movement = false;
                  game.music!.gain.modulate(timer, 3000, 0);
                  await player.walk(timer, 3, { x: 160, y: 100 });
                  const filter = new GlowFilter({ color: 0xffffff });
                  const shaker = new CosmosValue();
                  let soundreduce = false;
                  const key = save.data.n.state_starton_papyrus === 1 ? 'undyneStoic' : 'undyne';
                  const finalfish = character(key, characters[key], { x: -20, y: 100 }, 'right', {
                     filters: [ filter ]
                  }).on('tick', {
                     priority: Infinity,
                     listener () {
                        filter.innerStrength = shaker.value / 2;
                        filter.outerStrength = (shaker.value / 2) * 3;
                        this.sprite.duration = 8;
                        if (!this.talk && this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                           const st = assets.sounds.stomp.instance(timer);
                           if (soundreduce) {
                              st.gain.value *= Math.min(Math.max((finalfish.position.x + 15) / 70, 0), 1);
                           }
                        }
                     }
                  });
                  let yee = false;
                  let basepos = finalfish.position.x;
                  finalfish.on('tick', () => {
                     yee && (finalfish.position.x = basepos + (Math.random() * 2 - 1) * shaker.value);
                  });
                  await finalfish.walk(timer, 2, { x: 40 });
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(timer, 1500, 2, 0);
                  yee = false;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.finalfish1);
                  await timer.pause(1000);
                  await finalfish.walk(timer, 1, { x: 60 });
                  await dialogue('auto', ...text.a_foundry.finalfish2);
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(timer, 500, 2, 2);
                  yee = false;
                  renderer.detach('main', finalfish);
                  shaker.value = 0;
                  const fallenfish = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iocUndyneFallen ]
                  });
                  const fallencontainer = new CosmosHitbox({
                     objects: [ fallenfish ],
                     anchor: 0,
                     position: finalfish.position,
                     size: { x: 50, y: 100 },
                     metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fallenfish' ] }
                  });
                  renderer.attach('main', fallencontainer);
                  game.menu = false;
                  game.interact = true;
                  game.movement = true;
                  assets.sounds.noise.instance(timer);
                  (async () => {
                     const position = fallenfish.position;
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
                  })();
                  await Promise.race([ events.on('teleport'), timer.when(() => roomState.water) ]);
                  save.data.n.plot = 48;
                  if (game.room === 'f_exit') {
                     await script('waterpour');
                     await timer.pause(250);
                     {
                        const position = fallenfish.position;
                        const base = position.x;
                        position.x = base + 1;
                        await timer.pause(70);
                        position.x = base - 2;
                        await timer.pause(70);
                        position.x = base + 3;
                        await timer.pause(70);
                        position.x = base + 3;
                        await timer.pause(70);
                        position.x = base;
                     }
                     renderer.detach('main', fallencontainer);
                     assets.sounds.noise.instance(timer);
                     shaker.value = 2;
                     renderer.attach('main', finalfish);
                     await shaker.modulate(timer, 500, 0, 0);
                     await timer.pause(2250);
                     finalfish.face = 'left';
                     await timer.pause(1250);
                     finalfish.face = 'down';
                     await timer.pause(1750);
                     finalfish.face = 'up';
                     await timer.pause(2250);
                     soundreduce = true;
                     renderer.detach('main', finalfish);
                     let hover = false;
                     const a = new CosmosValue();
                     const time = timer.value;
                     const fishShake = new CosmosValue();
                     const fishPosition = finalfish.position.clone();
                     const finalfish2 = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        resources: content.iocUndyneUpJetpack
                     }).on('tick', function () {
                        this.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                        if (hover) {
                           this.position.y += CosmosMath.remap(
                              a.value,
                              0,
                              CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2
                           );
                        }
                     });
                     renderer.attach('main', finalfish2);
                     assets.sounds.noise.instance(timer).gain.value = 0.5;
                     const flame = assets.sounds.jetpack.instance(timer);
                     flame.gain.value = 0.2;
                     await timer.pause(1100);
                     await fishShake.modulate(timer, 350, 1);
                     hover = true;
                     a.modulate(timer, 1000, 1);
                     timer.pause(400).then(() => {
                        fishShake.modulate(timer, 700, 0);
                     });
                     flame.gain.modulate(timer, 3200, flame.gain.value, 0).then(() => {
                        flame.stop();
                     });
                     await fishPosition.modulate(timer, 1800, {}, { y: -60 });
                     await timer.pause(1000);
                     renderer.detach('main', finalfish2);
                     if (!save.data.b.oops) {
                        roomState.charabeg && (await dialogue('auto', ...text.a_foundry.truetext.undyne1x));
                        await dialogue('auto', ...text.a_foundry.truetext.undyne1());
                     }
                     game.movement = true;
                     game.menu = true;
                  } else {
                     renderer.detach('main', fallencontainer);
                     save.data.n.state_foundry_undyne = 1;
                  }
               }
            }
            break;
         }
         case 'f_battle': {
            roomState.lastSpot ??= 0;
            if (
               roomState.lastSpot <= 1000 &&
               player.x > 1000 &&
               save.data.n.undyne_phase < 3 &&
               save.data.n.plot < 48
            ) {
               const di = Math.ceil((player.x - 1000) / 20) * 20;
               player.x -= di;
               phish.position.x -= di;
               for (const n of phish.metadata.s?.path ?? []) {
                  n.x -= di;
               }
            }
            roomState.lastSpot = player.x;
            break;
         }
      }
   } else {
      const scriptState = states.scripts[subscript] || (states.scripts[subscript] = {});
      switch (subscript) {
         case 'mazetrap': {
            if (game.movement) {
               const mazetrap = instance('below', 'mazetrap');
               if (mazetrap) {
                  for (const [ ind, obj ] of mazetrap.object.objects.entries()) {
                     if (player.detect(obj as CosmosHitbox)) {
                        const traps = CosmosUtils.parse(save.data.s.state_foundry_f_chaseTrap || '[]') as number[];
                        if (!traps.includes(ind)) {
                           traps.push(ind);
                           save.data.s.state_foundry_f_chaseTrap = CosmosUtils.serialize(traps);
                           const pos = obj.position;
                           stabbie(false, pos, pos.add(0, 20), pos.add(20, 0), pos.add(20, 20));
                        }
                        break;
                     }
                  }
               }
            }
            break;
         }
         case 'npc': {
            if (!game.movement) {
               break;
            }
            const inst = instance('main', args[0]);
            if (inst) {
               const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
               args[0] === 'f_clamgirl' && anim.use(content.ionFClamgirl2);
               await inst.talk(
                  'a',
                  talkFilter(),
                  'auto',
                  ...CosmosUtils.provide(text.a_foundry.npcinter[args[0] as keyof typeof text.a_foundry.npcinter])
               );
               args[0] === 'f_clamgirl' && anim.use(content.ionFClamgirl1);
            }
            break;
         }
         case 'spookydate': {
            if (player.face !== 'up' || !game.movement) {
               break;
            }
            game.movement = false;
            if (save.data.n.plot < 33) {
               await dialogue('auto', ...text.a_foundry.spookydate1());
               if (choicer.result === 0) {
                  game.music!.gain.value = 0;
               }
               await dialogue('auto', ...[ text.a_foundry.spookydate2a, text.a_foundry.spookydate2b ][choicer.result]);
               if (choicer.result === 0) {
                  save.data.n.plot = 33;
                  const rimshotLoader = content.asRimshot.load();
                  const whoopeeLoader = content.asWhoopee.load();
                  const premonitionLoader = content.amSpookydate.load();
                  const stoolAssets = new CosmosInventory(
                     content.iocSansStool,
                     content.iocSansStoolComb,
                     content.iocSansStoolLeft,
                     content.iocSansStoolScratch
                  );
                  const grillbyAssets = new CosmosInventory(content.iocGrillbyUp, content.iocGrillbyDown);
                  const stoolLoader = stoolAssets.load();
                  const grillbyLoader = grillbyAssets.load();
                  const roomSans = roomState.sand as CosmosCharacter;
                  await roomSans.walk(timer, 3, { x: 200 }, { y: 160 }, { x: 280 });
                  roomSans.face = 'left';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate3);
                  await Promise.all([
                     roomSans.walk(timer, 3, { x: 340 }, { y: 280 }),
                     player.walk(timer, 3, { y: 160 }, { x: 340 }, { y: 240 })
                  ]);
                  await teleport('s_grillbys', 'up', 177.5, 230, world);
                  game.music!.gain.modulate(timer, 300, world.level);
                  const sand = character('sans', characters.sans, { x: 177.5, y: 200 }, 'down');
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.spookydate4);
                  sand.face = 'up';
                  await dialogue('auto', ...text.a_foundry.spookydate5);
                  await sand.walk(timer, 3, { y: 200, x: 156.5 });
                  if (save.data.n.state_starton_dogs === 2 || world.population < 2) {
                     await timer.pause(450);
                  } else {
                     const dogamy = instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation;
                     const dogaressa = instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(dogamy);
                     header('x1').then(() => {
                        speech.targets.delete(dogamy);
                        dogamy.reset();
                        speech.targets.add(dogaressa);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate7);
                     speech.targets.delete(dogaressa);
                     dogaressa.reset();
                  }
                  await sand.walk(timer, 3, { x: 213.5 });
                  if (world.population < 8) {
                     await timer.pause(450);
                  } else {
                     const bunbun = instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation;
                     const bigmouth = instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(bigmouth);
                     header('x1').then(() => {
                        speech.targets.delete(bigmouth);
                        bigmouth.reset();
                        speech.targets.add(bunbun);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate6);
                     speech.targets.delete(bunbun);
                     bunbun.reset();
                  }
                  await sand.walk(timer, 3, { y: 130 });
                  if (world.population < 2) {
                     await timer.pause(650);
                     sand.face = 'left';
                     await timer.pause(1350);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9x);
                     await instance('main', 'g_redbird')?.talk(
                        'a',
                        talkFilter(),
                        'dialoguerBottom',
                        ...CosmosUtils.provide(text.a_foundry.spookydate9y)
                     );
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9z);
                     await timer.pause(1250);
                  } else if (world.population < 10) {
                     await timer.pause(850);
                  } else {
                     sand.face = 'left';
                     const beautifulfish = instance('main', 'g_beautifulfish')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(beautifulfish);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate8);
                     speech.targets.delete(beautifulfish);
                     await rimshotLoader;
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9);
                     sand.preset = characters.sansSpecial;
                     sand.face = 'down';
                     const NPCs = [
                        beautifulfish,
                        instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation,
                        instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation,
                        ...(save.data.n.state_starton_dogs === 2
                           ? []
                           : [
                                instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation,
                                instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation
                             ])
                     ];
                     for (const guy of NPCs) {
                        guy.duration = 2;
                        guy.enable();
                     }
                     const rimmer = assets.sounds.rimshot.instance(timer);
                     await timer.pause(3000);
                     rimmer.stop();
                     for (const guy of NPCs) {
                        guy.reset();
                     }
                     sand.preset = characters.sans;
                  }
                  content.asRimshot.unload();
                  await stoolLoader;
                  await dialogue('auto', ...text.a_foundry.spookydate10);
                  let mode = 0;
                  const stoolsand = new CosmosObject({
                     priority: 10000,
                     objects: [
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStool ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 0 ? 1 : 0;
                        }),
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStoolLeft ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 1 ? 1 : 0;
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolComb
                        }).on('tick', function () {
                           this.alpha.value = mode === 2 ? 1 : 0;
                           if (mode === 2 && !this.active) {
                              this.enable();
                           } else if (mode !== 2 && this.active) {
                              this.reset();
                           }
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolScratch
                        }).on('tick', function () {
                           this.alpha.value = mode === 3 ? 1 : 0;
                           if (mode === 3 && !this.active) {
                              this.enable();
                           } else if (mode !== 3 && this.active) {
                              this.reset();
                           }
                        })
                     ]
                  });
                  sand.walk(timer, 2, { y: 116 }).then(() => {
                     sand.preset = characters.none;
                     renderer.attach('main', stoolsand);
                  });
                  await Promise.all([ whoopeeLoader, player.walk(timer, 3, { x: 187.5, y: 127 }) ]);
                  await player.walk(timer, 1.5, { y: 106.5 });
                  const whooper = assets.sounds.whoopee.instance(timer);
                  whooper.rate.value = 1.25;
                  await Promise.all([ grillbyLoader, timer.pause(2500) ]);
                  await dialogue('auto', ...text.a_foundry.spookydate11);
                  const fries = choicer.result === 0;
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate12a, text.a_foundry.spookydate12b ][choicer.result]
                  );
                  const grillbz = instance('main', 'g_grillby')!.object;
                  grillbz.alpha.value = 0;
                  const grillbzWalk = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     priority: -999,
                     position: grillbz.position.add(11.5, 0),
                     resources: content.iocGrillbyUp
                  });
                  renderer.attach('main', grillbzWalk);
                  grillbzWalk.enable();
                  grillbzWalk.position
                     .modulate(timer, ((1e3 / 30) * 15) / 2, {
                        x: grillbzWalk.position.x,
                        y: grillbzWalk.position.y - 15
                     })
                     .then(async () => {
                        grillbzWalk.reset();
                        grillbzWalk.use(content.iocGrillbyDown);
                        grillbzWalk.enable();
                        const baseY = grillbzWalk.position.y;
                        const listener = () => {
                           grillbzWalk.position.y = baseY - (grillbzWalk.index % 2 ? 1 : 0);
                        };
                        grillbzWalk.on('tick', listener);
                        await timer.pause(650);
                        while (grillbzWalk.subcrop.bottom < 55) {
                           grillbzWalk.subcrop.bottom++;
                           await renderer.on('tick');
                        }
                        grillbzWalk.off('tick', listener);
                     });
                  mode = 2;
                  await timer.pause(4500);
                  whooper.stop();
                  content.asWhoopee.unload();
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate13);
                  if ((choicer.result as number) === 1 && !save.data.b.oops) {
                     oops();
                     await timer.pause(1e3);
                  }
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate14a, text.a_foundry.spookydate14b ][choicer.result]()
                  );
                  await timer.pause(1650);
                  const food = new CosmosSprite({
                     position: { y: 0 },
                     anchor: { x: 0, y: 1 },
                     frames: [ fries ? content.iooFFries : content.iooFBurger ]
                  });
                  grillbzWalk.attach(food);
                  const baseY = grillbzWalk.position.y;
                  const listener = () => {
                     grillbzWalk.position.y = baseY - (grillbzWalk.index % 2 ? 1 : 0);
                     food.position.y = -Math.max(22 - grillbzWalk.subcrop.bottom, 0) + (grillbzWalk.index % 2 ? 1 : 0);
                  };
                  grillbzWalk.on('tick', listener);
                  while (grillbzWalk.subcrop.bottom > 0) {
                     grillbzWalk.subcrop.bottom--;
                     await renderer.on('tick');
                  }
                  await timer.pause(350);
                  grillbzWalk.off('tick', listener);
                  grillbzWalk.enable();
                  grillbzWalk.position
                     .modulate(timer, ((1e3 / 30) * 15) / 2, {
                        x: grillbzWalk.position.x,
                        y: grillbzWalk.position.y + 15
                     })
                     .then(() => {
                        food.position.x = player.x + 10;
                        food.position.y = 87.5;
                        food.priority.value = 105;
                        const food2 = new CosmosSprite({
                           position: food.position.add(sand.position.x - player.x, 0),
                           anchor: { x: 0, y: 1 },
                           frames: [ fries ? content.iooFFries : content.iooFBurger ],
                           priority: 105
                        });
                        renderer.attach('main', food, food2);
                        isolates([ food, food2 ]);
                        grillbz.alpha.value = 1;
                        renderer.on('tick').then(() => {
                           grillbzWalk.alpha.value = 0;
                           renderer.detach('main', grillbzWalk);
                           grillbyAssets.unload();
                        });
                     });
                  await timer.pause(150);
                  await dialogue('auto', ...text.a_foundry.spookydate15);
                  mode = 3;
                  await timer.pause(3000);
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate16);
                  mode = 0;
                  await game.music!.gain.modulate(timer, 2500, 0);
                  await timer.pause(1500);
                  await dialogue('auto', ...text.a_foundry.spookydate17);
                  await Promise.all([ timer.pause(850), premonitionLoader ]);
                  const path = new CosmosObject({ alpha: 0.8 });
                  path.container.addChild(
                     new Graphics()
                        .beginFill(0, path.alpha.value)
                        .drawRect(0, 0, 320, 240)
                        .endFill()
                        .beginHole()
                        .drawEllipse(200, 92, 55 / 2, 61 / 2)
                        .endHole()
                  );
                  (grillbz.objects[0] as CosmosAnimation).disable();
                  renderer.attach('menu', path);
                  assets.sounds.noise.instance(timer);
                  await timer.pause(1150);
                  const spooky = assets.music.spookydate.instance(timer);
                  await dialogue('auto', ...text.a_foundry.spookydate18);
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate19a, text.a_foundry.spookydate19b ][choicer.result],
                     ...text.a_foundry.spookydate20()
                  );
                  spooky.gain.modulate(timer, 1000, 0).then(() => {
                     spooky.stop();
                     content.amSpookydate.unload();
                  });
                  await timer.pause(450);
                  game.music!.gain.modulate(timer, 1000, world.level);
                  (grillbz.objects[0] as CosmosAnimation).enable();
                  await path.alpha.modulate(timer, 850, 0);
                  renderer.detach('menu', path);
                  await timer.pause(1000);
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate21());
                  renderer.detach('main', stoolsand);
                  sand.preset = characters.sans;
                  await sand.walk(timer, 2, { y: 130 });
                  player.face = 'down';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate22);
                  player.walk(timer, 1.5, { y: 127 });
                  await sand.walk(timer, 3, { x: 177.5, y: 230 });
                  await timer.pause(650);
                  sand.face = 'up';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate23());
                  await timer.pause(850);
                  await sand.walk(timer, 3, { y: 240 });
                  await sand.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', sand);
                  save.data.b.fryz = fries;
                  player.metadata.fryz = true;
                  stoolAssets.unload();
               }
            } else {
               await dialogue('auto', ...text.a_foundry.spookydate0);
            }
            game.movement = true;
            break;
         }
         case 'doge': {
            if (save.data.n.plot < 35) {
               save.data.n.plot = 35;
               await battler.encounter(player, groups.doge);
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.doge1);
               }
            }
            break;
         }
         case 'puzzle1':
         case 'puzzle2':
         case 'puzzle3': {
            if (!game.movement && args[0] !== 'cutscene') {
               break;
            }
            const target = puzzleTarget();
            if (target <= save.data.n.plot) {
               await dialogue('auto', ...text.a_foundry[`${subscript}switch`]);
               break;
            }
            game.movement = false;
            const swit = instance('main', `f_${subscript}_switch`)!.object.objects.filter(
               obj => obj instanceof CosmosAnimation
            )[0] as CosmosAnimation;
            swit.index = 1;
            assets.sounds.noise.instance(timer);
            const anims = [] as CosmosAnimation[];
            const rects = [] as CosmosRectangle[];
            const pylons = [ ...instances('main', 'pylon') ];
            const overs = [] as CosmosSprite[];
            const stage = {
               mirrors: pylons.flatMap(
                  ({ object: pylon }) =>
                     [
                        [ pylon, 'pylon-a', pylon.position.add(-5, -15) ],
                        [ pylon, 'pylon-b', pylon.position.add(5, -15) ],
                        [ pylon, 'pylon-c', pylon.position.add(-5, -5) ],
                        [ pylon, 'pylon-d', pylon.position.add(5, -5) ]
                     ] as [CosmosObject, string, CosmosPointSimple][]
               ),
               discovery: [],
               beamwalls: [
                  ...instance('below', 'beamwall')!.object.objects,
                  ...renderer.layers.below.objects.flatMap(object =>
                     object.objects.filter(object => object.metadata.barrier)
                  )
               ].filter(b => {
                  if (b instanceof CosmosHitbox) {
                     b.calculate(renderer);
                     return true;
                  } else {
                     return false;
                  }
               }) as CosmosHitbox[],
               rects,
               anims,
               overs
            };
            if (
               await (async () => {
                  if (subscript === 'puzzle3') {
                     const valid1 = { state: true };
                     const valid2 = { state: true };
                     return await Promise.all([
                        beamcast(stage, { x: 655, y: 121 }, valid1).then(result => {
                           result || (valid1.state && (valid1.state = false));
                           return result;
                        }),
                        beamcast(stage, { x: 735, y: 121 }, valid2).then(result_1 => {
                           result_1 || (valid2.state && (valid2.state = false));
                           return result_1;
                        })
                     ]).then(([ result1, result2 ]) => result1 && result2);
                  } else {
                     return beamcast(stage, subscript === 'puzzle1' ? { x: 75, y: 101 } : { x: 315, y: 41 });
                  }
               })()
            ) {
               if (stage.discovery.length === pylons.length) {
                  save.data.s[`state_foundry_f_${subscript}`] = CosmosUtils.serialize([
                     rects.map(rect => [
                        [ 'up', 'down', 'left', 'right' ].indexOf(rect.metadata.face as string),
                        rect.position.value(),
                        rect.size.value()
                     ]),
                     overs.map(over => [ over.position.value(), over.scale.x === -1 ])
                  ] as [[number, CosmosPointSimple, CosmosPointSimple][], [CosmosPointSimple, boolean][]]);
                  await passPuzzle(rects, anims);
                  for (const { object: pylon } of instances('main', 'pylon')) {
                     pylon.metadata.active = true;
                  }
                  events.on('teleport').then(() => {
                     renderer.detach('main', ...rects, ...overs);
                  });
                  save.data.n.plot = target;
                  assets.sounds.pathway.instance(timer);
                  shake(2, 1000);
               } else {
                  await failPuzzle(rects, anims, true);
                  renderer.detach('main', ...overs);
               }
            } else {
               await failPuzzle(rects, anims);
               renderer.detach('main', ...overs);
            }
            swit.index = 0;
            args[0] === 'cutscene' || (game.movement = true);
            break;
         }
         case 'quiche': {
            if (save.data.b.item_quiche) {
               await dialogue('auto', ...text.a_foundry.quiche4);
            } else {
               await dialogue('auto', ...text.a_foundry.quiche1);
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     save.data.b.item_quiche = true;
                     save.storage.inventory.add('quiche');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_foundry.quiche3);
                  } else {
                     await dialogue('auto', ...text.a_foundry.quiche2);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.quiche5);
               }
            }
            break;
         }
         case 'cardbox': {
            if (!game.movement) {
               break;
            }
            const dimbox = instance('main', 'dimbox');
            if (dimbox) {
               game.movement = false;
               const anim = dimbox.object.objects[0] as CosmosAnimation;
               anim.enable();
               await timer.when(() => anim.index === 3);
               anim.disable();
               if (save.data.n.state_foundry_punchcards > 0) {
                  if (save.data.n.state_foundry_punchcards > 1) {
                     typer.variables.x = save.data.n.state_foundry_punchcards.toString();
                     await dialogue('auto', ...text.a_foundry.punchcard2);
                  } else {
                     await dialogue('auto', ...text.a_foundry.punchcard1);
                  }
                  await dialogue('auto', ...text.a_foundry.punchcard3);
                  if (choicer.result === 0) {
                     if (save.storage.inventory.size < 8) {
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('punchcard');
                        await dialogue('auto', ...text.a_foundry.punchcard4);
                        save.data.n.state_foundry_punchcards--;
                     } else {
                        await dialogue('auto', ...text.a_foundry.quiche2);
                     }
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.punchcard0);
               }
               await timer.when(() => atlas.target === null);
               anim.index = 4;
               anim.enable();
               await timer.when(() => anim.index === 6);
               anim.disable().reset();
               game.movement = true;
            }
            break;
         }
         case 'sentry': {
            if (save.data.n.plot > 33) {
               if (player.face === 'down') {
                  await dialogue('auto', ...text.a_foundry.sansSentryBack());
               } else {
                  await dialogue('auto', ...text.a_foundry.sansSentry());
               }
            }
            break;
         }
         case 'artifact': {
            if (save.data.b.item_artifact) {
               await dialogue('auto', ...text.a_foundry.artifact3);
            } else {
               if (save.storage.inventory.size < 8) {
                  const box = instance('main', 'artifactbox')!;
                  const spr = box.object.objects.filter(x => x instanceof CosmosSprite)[0] as CosmosSprite;
                  spr.index = 1;
                  save.data.b.item_artifact = true;
                  save.storage.inventory.add('artifact');
                  assets.sounds.equip.instance(timer);
                  await dialogue('auto', ...text.a_foundry.artifact1);
               } else {
                  await dialogue('auto', ...text.a_foundry.artifact2);
               }
            }
            break;
         }
         case 'piano': {
            if (!game.movement) {
               return;
            }
            let keyX = 0;
            let keyY = 0;
            let keyZ = '11';
            let active = true;
            let portamento = null as number | null;
            const ratio = 2 ** (1 / 12);
            const position = { x: 0, y: 0 };
            const sequences = [
               [ 0, 7, 5, 0, 4, 4, 5 ],
               [ 3, 12, 10, 12, 9, 10, 7, 10, 9, 5, 3, 5, 0 ]
            ];
            const ticker = () => {
               if (active) {
                  keyX = (keys.leftKey.active() ? -1 : 0) + (keys.rightKey.active() ? 1 : 0);
                  keyY = (keys.downKey.active() ? 1 : 0) + (keys.upKey.active() ? -1 : 0);
                  keyZ = `k${[ 0, 1, 2 ][keyX + 1]}${[ 0, 1, 2 ][keyY + 1]}`;
                  for (const instance of instances('main', 'pianoarrow')) {
                     const focus = instance.tags.includes(keyZ) ? (keys.interactKey.active() ? 2 : 1) : 0;
                     if (instance.object.metadata.active !== focus) {
                        instance.object.metadata.active = focus || void 0;
                        for (const subobj of instance.object.objects as CosmosAnimation[]) {
                           subobj.index = focus;
                        }
                     }
                  }
               }
            };
            const listener = () => {
               if (active) {
                  const tags = instance('main', keyZ)!.tags as string[];
                  for (const tag of tags) {
                     if (tag !== 'pianoarrow' && tag !== keyZ) {
                        const step = +tag;
                        if (position.y === 0) {
                           for (const [ index, sequence ] of sequences.entries()) {
                              if (sequence[0] === step) {
                                 position.x = index;
                                 position.y = 1;
                                 break;
                              }
                           }
                        } else if (sequences[position.x][position.y] === step) {
                           if (++position.y === sequences[position.x].length) {
                              if (position.x === 0) {
                                 if (save.data.b.f_state_piano) {
                                    break;
                                 }
                              } else {
                                 if (save.data.b.f_state_truth) {
                                    break;
                                 }
                              }
                              active = false;
                              timer.pause(750).then(() => {
                                 if (position.x === 0) {
                                    save.data.b.f_state_piano = true;
                                 } else {
                                    save.data.b.f_state_truth = true;
                                 }
                                 deactivate();
                                 assets.sounds.pathway.instance(timer);
                                 shake(2, 1000);
                              });
                           }
                        } else {
                           position.y = 0;
                        }
                        const note = assets.sounds.note.instance(timer, { store: true });
                        const rate = ratio ** step;
                        note.rate.value = Math.min(Math.max(portamento ?? rate, rate / 1.25), rate * 1.25);
                        note.rate.modulate(timer, 50, (portamento = rate));
                        break;
                     }
                  }
               }
            };
            const deactivate = () => {
               renderer.off('tick', ticker);
               keys.interactKey.off('down', listener);
               for (const instance of instances('main', 'pianoarrow')) {
                  if (instance.object.metadata.active) {
                     instance.object.metadata.active = void 0;
                     for (const subobj of instance.object.objects as CosmosAnimation[]) {
                        subobj.index = 0;
                     }
                  }
               }
               for (const instance of assets.sounds.note.instances) {
                  instance.stop();
               }
               game.movement = true;
            };
            game.movement = false;
            renderer.on('tick', ticker);
            keys.interactKey.on('down', listener);
            ticker();
            await timer.pause(500);
            await timer.when(() => active && keys.specialKey.active());
            deactivate();
            /* if you know what you're doing, this could sound really cool.
            const a = 2 ** (1 / 12);
            const b = ((60 / 180) / 4) * 1000;
            for (const c of [0,-4,-3,-1].flatMap((x,i)=>[12,x,x,null,x,null,x,null,14,x,x,null,x,null,x,null,15,x,x,null,x, null,14,null,null,null,...(i<3?[x,null,x,null,x,null]:[])])) {
               c === null || (assets.sounds.note.instance(timer).rate.value = a ** c);
               await timer.pause(b);
            } */
            break;
         }
         case 'candy': {
            if (game.movement) {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.candy1);
               if (choicer.result < 3) {
                  const item = [ 'rations', 'water', 'tzn' ][choicer.result] as 'rations' | 'water' | 'tzn';
                  const price = [ 20, 10, 15 ][choicer.result];
                  if (item === 'water') {
                     typer.variables.x = commonText.i_water.name;
                  } else {
                     typer.variables.x = text[`i_${item}`].name;
                  }
                  typer.variables.y = price.toString();
                  await dialogue('auto', ...text.a_foundry.candy3);
                  if (choicer.result === 0) {
                     if (save.storage.inventory.size < 8) {
                        if (save.data.n.g < price) {
                           await dialogue('auto', ...text.a_foundry.candy4);
                        } else {
                           save.data.n.g -= price;
                           save.storage.inventory.add(item);
                           assets.sounds.equip.instance(timer);
                           await dialogue('auto', ...text.a_foundry.candy2);
                        }
                     } else {
                        await dialogue('auto', ...text.a_foundry.candy6);
                     }
                  } else {
                     await dialogue('auto', ...text.a_foundry.candy5);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.candy7);
               }
               game.movement = true;
            }
            break;
         }
         case 'fakedummy': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (save.data.b.f_state_dummypunch) {
               await dialogue('auto', ...text.a_foundry.dummypunch3);
            } else {
               save.data.b.f_state_dummytalk = true;
               await dialogue('auto', ...text.a_foundry.dummypunch1);
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_foundry.dummypunch2a);
               } else {
                  save.data.b.f_state_dummypunch = true;
                  if (!save.data.b.oops) {
                     oops();
                     await timer.pause(1000);
                  }
                  await dialogue('auto', ...text.a_foundry.dummypunch2b());
               }
            }
            game.movement = true;
            break;
         }
         case 'sandinter': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (save.data.b.f_state_telescope) {
               await dialogue('auto', ...text.a_foundry.telescopeY);
            } else {
               await dialogue('auto', ...text.a_foundry.telescopeX());
               if (choicer.result === 0) {
                  let x = 160;
                  let y = 120;
                  save.data.b.f_state_telescope = true;
                  const graphik = new Graphics();
                  const recto = new CosmosRectangle({
                     fill: 'black',
                     size: { x: 320, y: 240 }
                  }).on('tick', () => {
                     graphik.clear().beginFill(0xffffff, 1).drawEllipse(x, y, 40, 33).endFill();
                  });
                  recto.container.addChild(graphik);
                  renderer.attach('menu', recto);
                  await timer.pause(500);
                  const keyListener = () => {
                     x = Math.min(
                        Math.max(x + (keys.leftKey.active() ? -4 : 0) + (keys.rightKey.active() ? 4 : 0), 0),
                        320
                     );
                     y = Math.min(
                        Math.max(y + (keys.upKey.active() ? -4 : 0) + (keys.downKey.active() ? 4 : 0), 0),
                        240
                     );
                  };
                  renderer.on('tick', keyListener);
                  await keys.specialKey.on('down');
                  renderer.detach('menu', recto);
                  renderer.off('tick', keyListener);
                  player.metadata.pranked = true;
                  events.on('teleport').then(() => {
                     player.metadata.pranked = false;
                  });
               }
            }
            game.movement = true;
            break;
         }
         case 'birdcheck': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.bird1);
            const bird = roomState.bird as CosmosHitbox;
            const birdSprite = bird.objects[0] as CosmosAnimation;
            if (choicer.result === 0) {
               birdSprite.use(content.ionFBird);
               const speed1 = 1;
               const speed2 = 0.8;
               const speed3 = 10;
               const bazeTime = timer.value;
               const shaker = new CosmosValue(1.2);
               const birdPos = birdSprite.position.clone();
               const playerPos = player.sprite.position.clone();
               const shakeListener = () => {
                  birdSprite.position = birdPos.add(
                     (Math.random() - 0.5) * shaker.value,
                     (Math.random() - 0.5) * shaker.value
                  );
                  player.sprite.position = playerPos.add(
                     (Math.random() - 0.5) * shaker.value,
                     (Math.random() - 0.5) * shaker.value
                  );
               };
               const side = player.x < 750 ? 1 : -1;
               const targetX = side === 1 ? 1385 : 115;
               const echoAlpha = new CosmosValue(1);
               const echoListener = () => {
                  for (const [ subject, sprite ] of [
                     [ bird, birdSprite ],
                     [ player, player.sprite ]
                  ] as [CosmosHitbox, CosmosAnimation][]) {
                     const echo = shadow(sprite, echo => (echo.alpha.value /= 1.5) < 0.00001, {
                        alpha: CosmosMath.remap(Math.abs(subject.velocity.x), 0, 0.2, speed2, speed3) * echoAlpha.value,
                        priority: subject.position.y - 1,
                        position: subject.position.add(sprite.position),
                        velocity: { x: subject.velocity.x / 5 }
                     });
                     renderer.attach('main', echo.object);
                     echo.promise.then(() => {
                        renderer.detach('main', echo.object);
                     });
                  }
               };

               // init delay
               game.music!.gain.value = 0;
               const rise = assets.music.rise.instance(timer);
               const OGgain = rise.gain.value;
               rise.gain.value = 0;
               rise.gain.modulate(timer, 2000, OGgain);
               await timer.pause(350);

               // move to player
               birdSprite.use(content.ionFBirdFly);
               await bird.position.step(timer, speed1, player.position.subtract(0, 20));
               await timer.pause(500);

               // lift
               renderer.on('tick', shakeListener);
               await bird.position.step(timer, speed2, player.position.subtract(0, 25));
               await Promise.all([
                  bird.position.step(timer, speed2, bird.position.subtract(0, 40)),
                  player.position.step(timer, speed2, player.position.subtract(0, 40))
               ]);
               await timer.pause(500);

               // set initial velocity
               bird.velocity.x = speed2 * side;
               player.velocity.x = speed2 * side;

               // speed up
               shaker.modulate(timer, 1000, 0.8);
               timer.pause(6270 - (timer.value - bazeTime)).then(() => {
                  renderer.on('tick', echoListener);
                  const cover = new CosmosRectangle({
                     alpha: 0.8,
                     fill: 'white',
                     size: { x: 320, y: 240 }
                  });
                  renderer.attach('menu', cover);
                  cover.alpha.modulate(timer, 1000, 0).then(() => {
                     renderer.detach('menu', cover);
                  });
               });
               Promise.all([
                  bird.velocity.modulate(timer, 2000, { x: speed2 * side }, { x: speed3 * 0.8 * side }),
                  player.velocity.modulate(timer, 2000, { x: speed2 * side }, { x: speed3 * 0.8 * side })
               ]).then(() => {
                  assets.sounds.boom.instance(timer).rate.value = 0.5;
                  bird.velocity.modulate(
                     timer,
                     15000 - (timer.value - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
                  player.velocity.modulate(
                     timer,
                     15000 - (timer.value - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
               });

               timer.pause(17500 - (timer.value - bazeTime)).then(async () => {
                  await echoAlpha.modulate(timer, 3000, 0);
                  renderer.off('tick', echoListener);
               });
               while (timer.value - bazeTime < 18500) {
                  await timer.when(() => Math.abs(targetX - player.x) < 500);
                  for (const object of renderer.layers.main.objects) {
                     object.position.x -= side * 100;
                  }
               }

               await timer.when(() => Math.abs(targetX - player.x) < 200);

               // slow down
               shaker.modulate(timer, 1000, 1.2);
               bird.velocity.modulate(timer, 1000, { x: speed2 * side });
               player.velocity.modulate(timer, 1000, { x: speed2 * side });
               await timer.when(() => Math.abs(targetX - player.x) < 10);

               // cancel velocity
               bird.velocity.x = 0;
               player.velocity.x = 0;

               // manually move the remaining distance
               await Promise.all([
                  bird.position.step_legacy(timer, speed2, { x: targetX }),
                  player.position.step_legacy(timer, speed2, { x: targetX })
               ]);
               await timer.pause(500);

               // beging dropdown
               rise.gain.modulate(timer, 4000, 0, 0).then(() => {
                  rise.stop();
               });
               const dropOffset = player.position
                  .add(0, 40)
                  .clamp({ x: -Infinity, y: 125 }, { x: Infinity, y: 155 })
                  .subtract(player.position);
               await Promise.all([
                  bird.position.step(timer, speed2, bird.position.add(dropOffset)),
                  player.position.step(timer, speed2, player.position.add(dropOffset))
               ]);
               await timer.pause(500);

               // end dropdown
               await bird.position.step(timer, speed2, player.position.subtract(0, 20));
               renderer.off('tick', shakeListener);

               // move to start spot
               await bird.position.step(timer, speed1, { x: player.x > 750 ? 1360 : 140, y: 140 });
               birdSprite.use(content.ionFBird);

               // end delay
               await timer.pause(350);
               game.music!.gain.value = world.level;
            } else {
               birdSprite.use(content.ionFBirdCry);
            }
            game.movement = true;
            break;
         }
         case 'astrofood': {
            if (save.data.n.state_foundry_astrofood < 3) {
               await dialogue('auto', ...text.a_foundry.astrofood1());
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     save.storage.inventory.add('astrofood');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_foundry.astrofood2);
                     save.data.n.state_foundry_astrofood++;
                  } else {
                     await dialogue('auto', ...text.a_foundry.astrofood3);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.astrofood4());
               }
            } else {
               await dialogue('auto', ...text.a_foundry.astrofood5);
            }
            break;
         }
         case 'ladder': {
            scriptState.time = timer.value;
            if (!scriptState.active) {
               scriptState.active = true;
               player.metadata.speed = 0.5;
               timer
                  .when(() => timer.value > scriptState.time + 40)
                  .then(() => {
                     player.metadata.speed = 1;
                     scriptState.active = false;
                  });
            }
            break;
         }
         case 'blookmusic': {
            if (game.movement) {
               game.movement = false;
               if (save.data.n.state_foundry_blookmusic === 0) {
                  if (world.phish) {
                     await dialogue('auto', ...text.a_foundry.blookmusic1x);
                  } else {
                     await dialogue('auto', ...text.a_foundry.blookmusic1());
                     if (choicer.result < 3) {
                        assets.sounds.equip.instance(timer).rate.value = 1.25;
                        save.data.n.state_foundry_blookmusic = (choicer.result + 1) as 1 | 2 | 3;
                        napstamusic(roomState);
                        const precount = [
                           save.data.b.f_state_blookmusic1,
                           save.data.b.f_state_blookmusic2,
                           save.data.b.f_state_blookmusic3
                        ].filter(value => value).length;
                        const blooky = roomState.blookie as CosmosCharacter;
                        switch (choicer.result) {
                           case 0:
                              if (save.data.b.f_state_blookmusic1 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic1 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3a);
                              }
                              break;
                           case 1:
                              if (save.data.b.f_state_blookmusic2 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic2 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3b);
                              }
                              break;
                           case 2:
                              if (save.data.b.f_state_blookmusic3 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic3 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3c);
                              }
                              break;
                        }
                        if (
                           blooky &&
                           precount === 2 &&
                           save.data.b.f_state_blookmusic1 &&
                           save.data.b.f_state_blookmusic2 &&
                           save.data.b.f_state_blookmusic3
                        ) {
                           blooky.face = 'left';
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_foundry.blookmusic3d);
                        }
                        blooky && (blooky.face = 'down');
                     }
                  }
               } else if (world.phish) {
                  await dialogue('auto', ...text.a_foundry.blookmusic2x());
               } else {
                  await dialogue('auto', ...text.a_foundry.blookmusic2());
                  if (choicer.result < 1) {
                     assets.sounds.equip.instance(timer).rate.value = 1.25;
                     save.data.n.state_foundry_blookmusic = 0;
                     (roomState.customs as CosmosInstance).stop();
                     roomState.customs = void 0;
                     roomState.customsAuto = void 0;
                     roomState.customsLevel = void 0;
                     (!world.genocide || save.data.n.plot < 68) && game.music!.gain.modulate(timer, 600, world.level);
                  }
               }
               game.movement = true;
            }
            break;
         }
         case 'blookfridge': {
            if (game.movement && player.face === 'up') {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.blookdate2x);
               if (!world.phish && save.data.n.state_foundry_blookdate === 1) {
                  roomState.fridge = true;
               } else {
                  game.movement = true;
               }
            }
            break;
         }
         case 'blooktouch': {
            if (game.movement && game.menu) {
               switch (game.room) {
                  case 'f_napstablook':
                     if (save.data.n.state_foundry_blookdate < 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blooktouch1());
                        if (world.sad_ghost) {
                           if (choicer.result === 0) {
                              if (save.data.b.f_state_blookbetray) {
                                 await dialogue('auto', ...text.a_foundry.blooksorryY);
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksorry1);
                                 if (choicer.result === 0) {
                                    await dialogue('auto', ...text.a_foundry.blooksorry2);
                                    if (choicer.result === 0) {
                                       save.data.n.state_wastelands_napstablook = 3;
                                       await dialogue('auto', ...text.a_foundry.blooksorry3);
                                    } else {
                                       save.data.b.f_state_blookbetray = true;
                                       await dialogue('auto', ...text.a_foundry.blooksorryX);
                                    }
                                 } else {
                                    save.data.b.f_state_blookbetray = true;
                                    await dialogue('auto', ...text.a_foundry.blooksorryX);
                                 }
                              }
                           }
                        } else {
                           switch (choicer.result) {
                              case 0:
                                 if (save.data.b.f_state_ghosthug) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a2);
                                 } else {
                                    save.data.b.f_state_ghosthug = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a1);
                                 }
                                 break;
                              case 1:
                                 if (save.data.b.f_state_ghostsleep) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b2);
                                 } else {
                                    save.data.b.f_state_ghostsleep = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b1);
                                 }
                                 break;
                              case 2:
                                 switch (save.data.n.state_foundry_swansong) {
                                    case 0:
                                       await dialogue('auto', ...text.a_foundry.blooktouch2c1);
                                       save.data.n.state_foundry_swansong = 1;
                                       break;
                                    case 1:
                                    case 2:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2c2, text.a_foundry.blooktouch2c2x ][
                                             save.data.n.state_foundry_swansong - 1
                                          ]
                                       );
                                       if ((choicer.result as number) === 0) {
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3b);
                                          if (player.y < 120 && player.x > 200) {
                                             player.walk(timer, 3, { x: 200 }).then(() => {
                                                player.face = 'right';
                                             });
                                          }
                                          const blooky = roomState.blookie as CosmosCharacter;
                                          await blooky.walk(timer, 3, { y: 85 });
                                          await timer.pause(350);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(650);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(1150);
                                          assets.sounds.equip.instance(timer).rate.value = 1.25;
                                          (roomState.customs || game.music).gain.modulate(timer, 0, 0);
                                          timer.pause().then(() => {
                                             (roomState.customs || game.music).gain.modulate(timer, 0, 0);
                                          });
                                          await timer.pause(1450);
                                          const music = assets.music.secretsong.instance(timer);
                                          music.rate.value = 1.42;
                                          music.gain.value /= 4;
                                          music.gain.modulate(timer, 600, music.gain.value * 4);
                                          timer.pause(850).then(() => {
                                             blooky.face = CosmosMath.cardinal(
                                                blooky.position.angleFrom(player.position)
                                             );
                                          });
                                          await new Promise<void>(resolve =>
                                             music.source.addEventListener('ended', () => resolve())
                                          );
                                          await timer.pause(500);
                                          (roomState.customs || game.music).gain.modulate(
                                             timer,
                                             600,
                                             roomState.customs ? roomState.customsLevel : world.level
                                          );
                                          await timer.pause(650);
                                          blooky.face = 'up';
                                          await timer.pause(1650);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(1250);
                                          await blooky.walk(timer, 3, { y: 100 });
                                          blooky.face = CosmosMath.cardinal(blooky.position.angleFrom(player.position));
                                          await timer.pause(850);
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c4);
                                          if ((choicer.result as number) === 0) {
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5a);
                                             save.data.n.state_foundry_swansong = 3;
                                          } else {
                                             if (!save.data.b.oops) {
                                                oops();
                                                await timer.pause(1000);
                                             }
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5b);
                                             save.data.n.state_foundry_swansong = 4;
                                          }
                                       } else {
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3a);
                                          save.data.n.state_foundry_swansong = 2;
                                       }
                                       break;
                                    case 3:
                                    case 4:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2d1, text.a_foundry.blooktouch2d2 ][
                                             save.data.n.state_foundry_swansong - 3
                                          ]
                                       );
                                       break;
                                 }
                                 break;
                           }
                        }
                        game.movement = true;
                     }
                     break;
                  case 'f_blooky':
                     if (!game.movement) {
                        return;
                     }
                     if (save.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blookyard1());
                        game.movement = true;
                     }
                     break;
                  case 'f_snail':
                     if (!game.movement) {
                        return;
                     }
                     if (save.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        if (save.data.n.state_foundry_thundersnail < 1) {
                           await dialogue('auto', ...text.a_foundry.blooksnail1());
                        } else {
                           await dialogue('auto', ...text.a_foundry.blooksnail1i);
                        }
                        if (choicer.result === 0) {
                           const blooky = roomState.blookie as CosmosCharacter;
                           blooky.face = 'up';
                           if (save.data.n.g < 10) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2a);
                           } else {
                              save.data.n.g -= 10;
                           }
                           if (save.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail3);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail3i);
                           }
                           game.music!.gain.modulate(timer, 0, 0);
                           game.menu = false;
                           game.movement = true;
                           const cam = new CosmosObject({
                              position: player.position.value()
                           });
                           game.camera = cam;
                           const anim = new CosmosAnimation({
                              active: true,
                              position: { x: 20, y: 80 },
                              resources: content.iooFThundertron
                           }).on('tick', () => {
                              player.x > 340 && (player.x = 340);
                           });
                           renderer.attach('main', anim);
                           let index = 0;
                           while (anim.index < 12) {
                              await renderer.on('tick');
                              if (anim.index !== index) {
                                 if ((index = anim.index) < 3) {
                                    assets.sounds.menu.instance(timer);
                                 } else {
                                    assets.sounds.menu.instance(timer).rate.value = 2;
                                 }
                              }
                           }
                           anim.disable();
                           const snail1 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 20),
                              scale: { x: 0, y: 2 },
                              priority: 81,
                              resources: content.iooFTronsnail1
                           });
                           let origin1 = snail1.position.x;
                           const trail1 = new CosmosRectangle({
                              fill: '#05070d',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 77,
                              position: snail1.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#1c2a4f',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#618fde',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail1.position.x - origin1);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail1.position.x - origin1);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail1.position.x - origin1);
                           });
                           const snail2 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 40),
                              scale: { x: 0, y: 2 },
                              priority: 82,
                              resources: content.iooFTronsnail2
                           });
                           let origin2 = snail2.position.x;
                           const trail2 = new CosmosRectangle({
                              fill: '#0d0606',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 78,
                              position: snail2.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#4d2723',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#cacaca',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail2.position.x - origin2);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail2.position.x - origin2);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail2.position.x - origin2);
                           });
                           const snail3 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 60),
                              scale: { x: 0, y: 2 },
                              priority: 83,
                              resources: content.iooFTronsnail3
                           });
                           let origin3 = snail3.position.x;
                           const trail3 = new CosmosRectangle({
                              fill: '#0d0c05',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 79,
                              position: snail3.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#4d471d',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#d8cf67',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail3.position.x - origin3);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail3.position.x - origin3);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail3.position.x - origin3);
                           });
                           await timer.pause(500);
                           renderer.attach('main', snail1, snail2, snail3);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           snail1.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail1.anchor.x = 1;
                              snail1.position.x += 9;
                           });
                           await timer.pause(500);
                           snail2.anchor.x = 0;
                           snail2.position.x -= 9;
                           snail2.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail2.anchor.x = 1;
                              snail2.position.x += 9;
                           });
                           await timer.pause(500);
                           snail3.anchor.x = 0;
                           snail3.position.x -= 9;
                           snail3.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail3.anchor.x = 1;
                              snail3.position.x += 9;
                           });
                           await timer.pause(1000);
                           const raceText = new CosmosText({
                              fill: 'white',
                              position: { x: 160, y: 50 },
                              anchor: 0,
                              font: '10px MarsNeedsCunnilingus'
                           });
                           renderer.attach('main', raceText);
                           raceText.content = text.a_foundry.blooksnailX.a;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.b;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.c;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.d;
                           timer.pause(2500).then(() => {
                              raceText.content = '';
                           });
                           assets.sounds.boom.instance(timer).rate.value = 1.25;
                           const muzak = assets.music.thundersnail.instance(timer);
                           renderer.attach('main', trail1, trail2, trail3);
                           snail1.enable();
                           snail1.velocity.x = 0.17;
                           snail2.enable();
                           snail2.velocity.x = 0.18;
                           snail3.enable();
                           snail3.velocity.x = 0.13;
                           // oh no no no no KEKW
                           if (save.data.s.state_foundry_deathroom === 'f_snail') {
                              snail1.velocity.x *= 2;
                              snail2.velocity.x *= 2;
                           }
                           let sad = 0;
                           let hits = 0;
                           let timerr = 0;
                           const interactListener = () => {
                              if (game.movement) {
                                 hits++;
                                 assets.sounds.notify.instance(timer);
                                 if (timerr === 0) {
                                    const notifier = new CosmosAnimation({
                                       anchor: { x: 0, y: 1 },
                                       position: renderer.projection(snail3.position.subtract(9, 14)),
                                       resources: content.ibuNotify
                                    });
                                    renderer.attach('menu', notifier);
                                    const oldspeed = snail3.velocity.x;
                                    snail3.velocity.x = 0;
                                    timer
                                       .when(() => timerr <= 0)
                                       .then(() => {
                                          renderer.detach('menu', notifier);
                                          if (game.movement && sad === 0) {
                                             if (hits < 2) {
                                                snail3.velocity.x = oldspeed + 0.01;
                                             } else if (hits === 2) {
                                                snail3.velocity.x = oldspeed;
                                             } else if (hits > 2) {
                                                snail3.velocity.x = Math.max(oldspeed - 0.01 * hits, 0);
                                             }
                                             hits = 0;
                                          }
                                       });
                                 }
                                 timerr = save.data.b.oops
                                    ? 22 + Math.floor(random.next() * 16)
                                    : 11 + Math.floor(random.next() * 8);
                                 if (hits > 90) {
                                    snail1.velocity.x = 0.4;
                                    snail2.velocity.x = 0.44;
                                 } else if (hits > 70) {
                                    sad = 3;
                                    snail3.alpha.modulate(timer, 300, 1, 0);
                                 } else if (hits > 50) {
                                    sad = 2;
                                    snail3.scale.modulate(timer, 300, { x: 1.1, y: -0.8 }, { x: 1.1, y: -0.8 });
                                 } else if (hits > 30) {
                                    sad = 1;
                                    snail3.anchor.y = -1;
                                    snail3.scale.y = -1;
                                 }
                              }
                           };
                           keys.interactKey.on('down', interactListener);
                           let win1 = false;
                           snail3.on('tick', () => {
                              timerr = Math.max(timerr - 1, 0);
                              if (target - 10 <= snail3.position.x) {
                                 win1 = true;
                              }
                           });
                           const target = anim.position.x + 260;
                           await timer.when(
                              () => target <= Math.max(snail1.position.x, snail2.position.x, snail3.position.x)
                           );
                           const win2 = target <= snail3.position.x;
                           muzak.stop();
                           assets.sounds.noise.instance(timer);
                           keys.interactKey.off('down', interactListener);
                           snail1.reset();
                           snail1.velocity.x = 0;
                           snail2.reset();
                           snail2.velocity.x = 0;
                           snail3.reset();
                           snail3.velocity.x = 0;
                           raceText.content = text.a_foundry.blooksnailX.e;
                           game.movement || (await timer.when(() => game.movement));
                           game.movement = false;
                           await timer.pause(2500);
                           renderer.detach('main', raceText);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           origin1 -= 9;
                           snail1.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                           timer.pause(500).then(async () => {
                              snail2.anchor.x = 0;
                              snail2.position.x -= 9;
                              origin2 -= 9;
                              snail2.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              await timer.pause(500);
                              snail3.anchor.x = 0;
                              snail3.position.x -= 9;
                              origin3 -= 9;
                              await snail3.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              renderer.detach('main', snail1, snail2, snail3);
                              assets.sounds.depower.instance(timer);
                              await timer.pause(280);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await timer.pause(420 - 320);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await timer.pause(570 - 420);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await timer.pause(650 - 570);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await timer.pause(720 - 650);
                              renderer.detach('main', anim, trail1, trail2, trail3);
                           });
                           await timer.pause(500);
                           if (sad === 0) {
                              if (win1) {
                                 if (win2) {
                                    save.data.b.f_state_thundersnail_win = true;
                                    await dialogue('auto', ...text.a_foundry.blooksnail4a);
                                    save.data.n.g += 15;
                                 } else {
                                    await dialogue('auto', ...text.a_foundry.blooksnail4b);
                                    save.data.n.g += 30;
                                 }
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksnail4c);
                              }
                           } else if (sad === 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4d);
                           } else if (sad === 2) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4e);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail4f);
                           }
                           save.data.n.state_foundry_thundersnail += 1;
                           cam.position.set(cam.position.clamp(...renderer.region));
                           await cam.position.step(timer, 3, player.position.clamp(...renderer.region));
                           game.camera = player;
                           game.menu = true;
                           game.music!.gain.modulate(timer, 600, world.level);
                        } else {
                           if (save.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b0);
                           }
                        }
                        game.movement = true;
                     }
                     break;
               }
            }
            break;
         }
         case 'saver': {
            if (!game.movement || !roomState.canSaveMK) {
               return;
            }
            roomState.rescue = true;
            game.movement = false;
            break;
         }
         case 'undyneboss': {
            if (!game.movement || save.data.n.plot > 47) {
               return;
            }
            game.movement = false;
            player.x = 500;
            const fishAssets = new CosmosInventory(
               inventories.iocUndyne,
               content.iocUndyneTurn,
               content.iooFAsteroid1,
               content.asStrike
            );
            const undyne = new CosmosCharacter({
               position: { y: 5 },
               key: 'undyne',
               preset: characters.undyneArmor
            });
            undyne.face = 'up';
            const funni = new CosmosSprite({
               anchor: { x: 0 },
               objects: [ undyne ],
               frames: [ content.iooFAsteroid1 ]
            });
            const asteroid = new CosmosObject({
               position: { x: player.x, y: player.y - 500 },
               objects: [ funni ]
            });
            const time = timer.value;
            funni.on('tick', () => {
               funni.position.y = CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 2;
            });
            const papyrusKiller = world.dead_skeleton;
            const moosicLoader = papyrusKiller ? content.amYouscreweduppal.load() : content.amUndynepreboss.load();
            header('x1').then(() => {
               undyne.face = 'right';
            });
            header('x2').then(() => {
               undyne.face = 'up';
            });
            header('x3').then(() => {
               undyne.face = 'down';
            });
            header('x4').then(() => {
               undyne.face = 'right';
            });
            header('x5').then(() => {
               undyne.face = 'down';
            });
            await Promise.all([ timer.pause(1000), fishAssets.load() ]);
            renderer.attach('main', asteroid);
            const ayo = player.position.clamp(...renderer.region);
            const cam = new CosmosObject({ position: ayo });
            game.camera = cam;
            const OGregion = renderer.region[0].y;
            renderer.region[0].y = asteroid.position.y + 40;
            await cam.position.modulate(timer, 3000, { x: player.x, y: asteroid.position.y + 40 });
            await timer.pause(2000);
            await dialogue('auto', ...text.a_foundry.undynefinal1a);
            await Promise.all([ timer.pause(1000), moosicLoader ]);
            if (papyrusKiller) {
               undyne.face = 'right';
               await timer.pause(850);
               await dialogue('auto', ...text.a_foundry.undynefinal2c1);
               assets.sounds.noise.instance(timer);
               undyne.preset = characters.undyneStoic;
               const bossmusic = assets.music.youscreweduppal.instance(timer);
               bossmusic.gain.value /= 4;
               bossmusic.gain.modulate(timer, 500, bossmusic.gain.value * 4);
               await timer.pause(1000);
               for (const [ key, face ] of [
                  [ 'x1', 'down' ],
                  [ 'x2', 'right' ],
                  [ 'x3', 'down' ],
                  [ 'x4', 'right' ],
                  [ 'x5', 'down' ],
                  [ 'x6', 'right' ],
                  [ 'x7', 'left' ],
                  [ 'x8', 'down' ],
                  [ 'x9', 'left' ],
                  [ 'x10', 'up' ],
                  [ 'x11', 'down' ]
               ] as [string, CosmosDirection][]) {
                  header(key).then(() => {
                     undyne.face = face;
                  });
               }
               await dialogue('auto', ...text.a_foundry.undynefinal2c2);
               Promise.race([ events.on('teleport'), timer.when(() => scriptState.battlefall) ]).then(async () => {
                  await bossmusic.gain.modulate(timer, 300, 0);
                  bossmusic.stop();
                  content.amYouscreweduppal.unload();
               });
            } else {
               await dialogue('auto', ...text.a_foundry.undynefinal1b);
               dialogueSession.active = true;
               atlas.switch(null);
               atlas.attach(renderer, 'menu', 'dialoguerBottom');
               const overtop = new CosmosRectangle({
                  alpha: 0,
                  fill: 'white',
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', overtop);
               const bpm = 180;
               const beatsPer = 4;
               const measureTime = (1 / (bpm / (60 * beatsPer))) * 1000;
               const bossmusic = assets.music.undynepreboss.instance(timer);
               Promise.race([ events.on('teleport'), timer.when(() => scriptState.battlefall) ]).then(async () => {
                  await bossmusic.gain.modulate(timer, 300, 0);
                  bossmusic.stop();
                  content.amUndynepreboss.unload();
               });
               renderer.layers.below.modifiers = [];
               renderer.layers.above.modifiers = [];
               const OG2 = renderer.region.slice() as CosmosRegion;
               const halv = cam.position.clamp(...renderer.region);
               const allObjects = [
                  cam,
                  ...renderer.layers.below.objects,
                  ...renderer.layers.main.objects,
                  ...renderer.layers.above.objects
               ];
               renderer.region = [
                  { x: -Infinity, y: -Infinity },
                  { x: Infinity, y: Infinity }
               ];
               asteroid.position.y += 30;
               for (const object of allObjects) {
                  object.position.set(object.position.subtract(halv));
               }
               renderer.zoom.value = 1.6;
               renderer.rotation.value = 15;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1c);
               await timer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = -20;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1d);
               await timer.pause(measureTime);
               renderer.zoom.value = 2.0;
               renderer.rotation.value = 25;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1e);
               await timer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = 0;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0).then(async () => {
                  await overtop.alpha.modulate(timer, measureTime - 250, 1);
                  await timer.pause(measureTime / 2);
                  await overtop.alpha.modulate(timer, measureTime - 250, 0);
                  renderer.detach('menu', overtop);
               });
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1f);
               await timer.pause(measureTime);
               renderer.zoom.value = 1;
               for (const object of allObjects) {
                  object.position.set(object.position.add(halv));
               }
               asteroid.position.y -= 30;
               renderer.region = OG2;
               atlas.detach(renderer, 'menu', 'dialoguerBottom');
               typer.text('');
               dialogueSession.active = false;
               const turner = new CosmosAnimation({
                  position: undyne.position.value(),
                  anchor: { x: 0, y: 1 },
                  resources: content.iocUndyneTurn
               });
               funni.objects[0] = turner;
               timer
                  .when(() => turner.index === 8)
                  .then(() => {
                     turner.disable();
                  });
               await timer.pause(measureTime * 2);
               turner.enable();
               await timer.pause(measureTime * 2);
               funni.objects[0] = undyne;
               undyne.preset = characters.undyne;
               undyne.face = 'down';
               await dialogue('auto', ...text.a_foundry.undynefinal1g);
               if (world.trueKills > 0) {
                  await dialogue('auto', ...text.a_foundry.undynefinal2b1);
                  const torielKiller = save.data.n.state_wastelands_toriel === 2;
                  const outlandsKiller = world.trueKills === save.data.n.kills_wastelands + (torielKiller ? 1 : 0);
                  if (outlandsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b1b);
                  } else {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b1a);
                  }
                  await dialogue('auto', ...text.a_foundry.undynefinal2b2());
                  const dogeKiller = save.data.n.state_foundry_doge === 1;
                  const muffetKiller = save.data.n.state_foundry_muffet === 1;
                  const eliteKiller = dogeKiller && muffetKiller;
                  const dogsKiller = save.data.n.state_starton_dogs === 2;
                  const greatdogKiller = save.data.n.state_starton_greatdog === 2;
                  const lesserdogKiller = save.data.n.state_starton_lesserdog === 2;
                  const doggoKiller = save.data.n.state_starton_doggo === 2;
                  const canineKiller = dogsKiller && greatdogKiller && lesserdogKiller && doggoKiller;
                  const dummyKiller = save.data.n.state_foundry_maddummy === 1;
                  if (eliteKiller && canineKiller) {
                     if (world.trueKills - 7 > 6) {
                        await dialogue('auto', ...text.a_foundry.undynefinal2b2a);
                     } else {
                        await dialogue('auto', ...text.a_foundry.undynefinal2b2b);
                     }
                  } else if (eliteKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2c);
                  } else if (canineKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2d);
                  } else if (dummyKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2e);
                  } else if (muffetKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2f);
                  } else if (dogeKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2g);
                  } else if (greatdogKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2h);
                  } else if (dogsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2i);
                  } else if (lesserdogKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2j);
                  } else if (doggoKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2k);
                  } else if (torielKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2l);
                  } else if (save.data.n.kills_foundry === 9) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2m);
                  } else if (save.data.n.kills_starton === 12) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2n);
                  } else if (save.data.n.kills_foundry > 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2o);
                  } else if (save.data.n.kills_starton > 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2p);
                  } else if (
                     save.data.n.kills_foundry === 1 &&
                     save.data.n.kills_starton === 1 &&
                     save.data.n.kills_wastelands === 1
                  ) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2q);
                  } else if (outlandsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2r());
                  } else if (world.trueKills === 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2s);
                  } else {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2t);
                  }
                  await dialogue('auto', ...text.a_foundry.undynefinal2b3);
               } else {
                  await dialogue('auto', ...text.a_foundry.undynefinal2a());
               }
            }
            save.data.n.plot = 47.1;
            await cam.position.modulate(timer, 3000, ayo);
            renderer.detach('main', asteroid);
            fishAssets.unload();
            renderer.region[0].y = OGregion;
            game.camera = player;
            if (!save.data.b.oops) {
               await dialogue('dialoguerTop', ...text.a_foundry.truetext.preundyne);
            }
            game.movement = true;
            break;
         }
         case 'undynefight': {
            if (args[0] === 'truetp') {
               scriptState.truetp = true;
               scriptState.truetpPromise = teleport('f_exit', 'right', 20, 100, world);
               return;
            }
            if (!game.movement || save.data.n.plot > 47.1) {
               return;
            }
            const eggo = new CosmosInventory(
               groups.undyne.assets!,
               opponents.undyne.assets,
               inventories.iocUndyne,
               content.asStomp,
               content.amUndynefast
            ).load();
            game.movement = false;
            await dialogue('dialoguerTop', ...text.a_foundry.undynefinal3());
            (states.scripts.undyneboss ??= {}).battlefall = true;
            dialogue('dialoguerTop', ...text.a_foundry.undynefinal3x);
            await header('x1');
            typer.text('');
            const diver = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: player.position.subtract(0, 200),
               resources: content.iocUndyneDive
            }).on('tick', async () => {
               diver.position.y += 240 / 30;
               await timer.pause();
               const echo = shadow(diver, echo => (echo.alpha.value /= 2) < 0.00001, {
                  alpha: 0.5,
                  priority: -100,
                  position: diver.position
               });
               renderer.attach('main', echo.object);
               echo.promise.then(() => {
                  renderer.detach('main', echo.object);
               });
            });
            renderer.attach('main', diver);
            await timer.when(() => diver.position.y > player.y - 30);
            renderer.detach('main', diver);
            if (!save.data.b.oops) {
               save.data.b.f_state_oopsprimer = true;
            }
            await Promise.all([ eggo, battler.encounter(player, groups.undyne, false).then(() => (game.menu = false)) ]);
            if (save.data.n.plot < 48) {
               save.data.n.plot = 47.2;
               save.data.s.chasecheckpoint = `${game.room}:${player.face}:${player.x}:${player.y}`;
               game.music = assets.music.undynefast.instance(timer);
               game.music.gain.value = 0;
               game.music.gain.modulate(timer, 0, 0).then(() => {
                  game.music!.gain.modulate(timer, 1000, assets.music.undynefast.gain);
               });
               game.movement = true;
               phish.metadata.firstfight = true;
               phish.metadata.reposition = true;
               renderer.attach('main', phish);
            } else {
               game.movement = true;
               game.menu = true;
            }
            break;
         }
         case 'viewchat': {
            scriptState.ticks ??= 0;
            if (save.data.n.plot_kidd < 4 && !save.data.b.oops) {
               const dist = Math.abs(500 - player.x);
               if (dist < 120 && player.face === 'up' && player.y < 110) {
                  if (scriptState.ticks++ === 30 * 3) {
                     if (save.data.n.plot_kidd < 3.4) {
                        dialogue('dialoguerBottom', ...text.a_foundry.truetext.view1, ...text.a_foundry.truetext.view2);
                        save.data.n.plot_kidd = 3.4;
                     }
                  }
               } else {
                  scriptState.ticks = 0;
               }
            }
            break;
         }
         case 'temmiepat': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const TTG = instance('main', 'f_temmie7')!;
            if (save.data.n.state_foundry_tempet === 0) {
               await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat1);
               if (choicer.result === 0) {
                  await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat2a);
                  save.data.n.state_foundry_tempet = 1;
               } else {
                  if (!save.data.b.oops) {
                     oops();
                     await timer.pause(1000);
                  }
                  await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat2b);
                  save.data.n.state_foundry_tempet = 2;
               }
            } else {
               await TTG.talk(
                  'a',
                  talkFilter(),
                  'auto',
                  ...[ text.a_foundry.temmiepat3a, text.a_foundry.temmiepat3b ][save.data.n.state_foundry_tempet - 1]
               );
            }
            game.movement = true;
            break;
         }
         case 'mirror': {
            if (player.face === 'down') {
               if (save.data.b.f_state_temstatue) {
                  await dialogue('auto', ...text.a_foundry.temstatueAftuh);
               } else {
                  save.data.b.f_state_temstatue = true;
                  assets.sounds.switch.instance(timer);
                  await dialogue('auto', ...text.a_foundry.temstatue);
               }
            } else {
               await dialogue('auto', ...text.a_foundry.temstatueNormuh);
            }
            break;
         }
         case 'mushroomdance': {
            if (!game.movement) {
               return;
            }
            const mushguy = instance('main', 'f_mushroomdance');
            if (mushguy) {
               game.movement = false;
               game.music!.gain.value = 0;
               const anim = mushguy.object.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation;
               anim.enable();
               await timer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               atlas.attach(renderer, 'menu', 'dialoguerTop');
               typer.text(...text.a_foundry.mushroomdance1);
               let x = 0;
               let end = false;
               const musiiiiiii = assets.music.mushroomdance.instance(timer);
               const ticker = () => {
                  anim.position.x = Math.sin(++x / 6) * 2;
                  if (end && Math.abs(anim.position.x - 0) < 0.5) {
                     anim.off('tick', ticker);
                  }
               };
               anim.on('tick', ticker);
               anim.reset().use(content.ionFMushroomdance2).enable();
               await timer.pause(4000);
               await timer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               end = true;
               musiiiiiii.stop();
               atlas.detach(renderer, 'menu', 'dialoguerTop');
               anim.reset().use(content.ionFMushroomdance3).enable();
               await timer.when(() => anim.index === anim.frames.length - 1);
               anim.disable();
               await timer.pause(1000);
               await dialogue('auto', ...text.a_foundry.mushroomdance2());
               anim.reverse = true;
               anim.enable();
               await timer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.reset().use(content.ionFMushroomdance1).enable();
               anim.index = anim.frames.length - 1;
               await timer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.disable();
               anim.reverse = false;
               if (world.trueKills > 9 || world.population === 0) {
                  save.data.b.f_state_mushroomdanceGeno = true;
               } else {
                  save.data.b.f_state_mushroomdance = true;
               }
               game.movement = true;
               game.music!.gain.value = world.level;
            }
            break;
         }
         case 'shop': {
            if (game.movement) {
               switch (args[0]) {
                  case 'tortoise':
                     if (world.phish) {
                        game.movement = false;
                        atlas.switch('dialoguerBottom');
                        typer.text(...text.a_foundry.noTortoise);
                        await timer.when(() => battler.active);
                        player.position.set(520, 105);
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tortoise, 'down', 520, 105);
                     }
                     break;
                  case 'tem':
                     if (world.phish) {
                        game.movement = false;
                        atlas.switch('dialoguerBottom');
                        typer.text(...text.a_foundry.noTem());
                        await timer.when(() => battler.active);
                        player.position.set(320, 170);
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tem, 'down', 320, 170);
                     }
                     break;
               }
            }
            break;
         }
         case 'fallenfish': {
            if (!game.movement) {
               return;
            }
            if (player.face === 'left') {
               if (save.data.b.water) {
                  game.movement = false;
                  roomState.water = true;
               } else {
                  await dialogue('auto', ...text.a_foundry.fallenfish);
               }
            }
            break;
         }
         case 'fallenfish2': {
            if (!game.movement) {
               return;
            }
            if (player.face === 'left') {
               await dialogue('auto', ...text.a_foundry.fallenfish2);
            }
            break;
         }
         case 'watercooler': {
            if (!game.movement) {
               return;
            }
            if (save.data.b.water) {
               await dialogue('auto', ...text.a_foundry.watercooler3);
            } else {
               await dialogue('auto', ...text.a_foundry.watercooler1);
               if (choicer.result === 0) {
                  save.data.b.water = true;
                  assets.sounds.equip.instance(timer);
                  await dialogue('auto', ...text.a_foundry.watercooler2a);
               } else {
                  await dialogue('auto', ...text.a_foundry.watercooler2b);
               }
            }
            break;
         }
         case 'waterpour': {
            player.alpha.value = 0;
            player.face = 'left';
            const spiller = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: player.position,
               resources: content.iocFriskLeftWaterPour
            });
            renderer.attach('main', spiller);
            await timer.when(() => spiller.index === 8);
            spiller.disable();
            save.data.b.water = false;
            await timer.pause(650);
            renderer.detach('main', spiller);
            player.alpha.value = 1;
            break;
         }
         case 'jumpsuit_item': {
            if (!save.data.b.item_jumpsuit) {
               if (save.storage.inventory.size < 8) {
                  save.data.b.item_jumpsuit = true;
                  save.storage.inventory.add('flight_suit');
                  assets.sounds.equip.instance(timer);
                  instance('main', 'jumpsuit_item')?.destroy();
                  await dialogue('auto', ...text.a_foundry.jumpsuit1);
               } else {
                  await dialogue('auto', ...text.a_foundry.jumpsuit2);
               }
            }
            break;
         }
         case 'boots': {
            if (!save.data.b.item_boots) {
               if (save.storage.inventory.size < 8) {
                  save.data.b.item_boots = true;
                  save.storage.inventory.add('boots');
                  assets.sounds.equip.instance(timer);
                  instance('main', 'f_booties')?.destroy();
                  await dialogue('auto', ...text.a_foundry.boots1);
               } else {
                  await dialogue('auto', ...text.a_foundry.boots2);
               }
            }
            break;
         }
         case 'exit': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (save.data.n.plot < 48) {
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.undyne2());
                  roomState.charabeg = true;
               }
               await dialogue('auto', ...text.a_foundry.finalpre);
            } else {
               await teleport('a_start', 'right', 20, 280, world);
               game.movement = true;
               break;
            }
            if (choicer.result === (save.data.n.plot < 48 ? 1 : 0)) {
               if (save.data.n.plot < 48) {
                  const x = !save.data.b.oops;
                  oops();
                  await teleport('a_start', 'right', 20, 280, world);
                  if (x) {
                     teleporter.movement = false;
                     game.movement = false;
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.truetext.undyne3);
                     game.movement = true;
                     game.menu = true;
                  }
                  save.data.n.exp += 500;
               }
            } else {
               player.x -= 3;
               player.face = 'left';
            }
            game.movement = true;
            break;
         }
         case 'kitchencall': {
            if (!save.data.b.kitchencall) {
               save.data.b.kitchencall = true;
               if (!world.genocide && save.data.n.state_starton_papyrus < 1 && 1 <= save.data.n.plot_date) {
                  assets.sounds.phone.instance(timer);
                  await dialogue('auto', ...text.a_foundry.kitchencall());
               }
            }
            break;
         }
         case 'unddate': {
            if (args[0] === 'sit') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate14);
               if (choicer.result === 0) {
                  roomState.sittah = true;
               } else {
                  game.movement = true;
               }
               break;
            } else if (args[0] === 'fish') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate13);
               if (choicer.result === 0) {
                  if (roomState.snacked) {
                     await dialogue('auto', ...text.a_foundry.unddate13a5);
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a1);
                     roomState.snack = true;
                     await timer.when(() => roomState.snacked);
                  }
               } else {
                  await dialogue(
                     'auto',
                     ...CosmosUtils.provide(
                        [ text.a_foundry.unddate13b, text.a_foundry.unddate13c, text.a_foundry.unddate13d ][
                           choicer.result - 1
                        ]
                     )
                  );
               }
               game.movement = true;
               break;
            } else if (args[0] === 'snack') {
               if (game.movement) {
                  if (save.storage.inventory.size < 8) {
                     assets.sounds.equip.instance(timer);
                     save.storage.inventory.add('snack');
                     instance('main', 'snacc')?.destroy();
                     await dialogue('auto', ...text.a_foundry.unddate13a4b);
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a4a);
                  }
               }
               break;
            }
            if (!game.movement || roomState.entered) {
               break;
            }
            game.movement = false;
            if (save.data.n.plot_date < 1.2) {
               await dialogue('auto', ...text.a_foundry.unddate0());
               save.data.n.plot_date = 1.2;
            } else {
               await dialogue('auto', ...text.a_foundry.unddate0x());
            }
            if (world.trueKills === 0 && save.data.n.state_foundry_undyne === 0) {
               if (choicer.result === 0) {
                  roomState.entered = true;
                  await dialogue('auto', ...text.a_foundry.unddate1a);
               } else {
                  await dialogue('auto', ...text.a_foundry.unddate1b());
                  game.movement = true;
                  break;
               }
            } else {
               game.movement = true;
               break;
            }
            const papy = roomState.papdater as CosmosCharacter;
            papy.metadata.override = true;
            papy.face = 'up';
            {
               if (player.y > papy.position.y + 10) {
                  if (Math.abs(player.x - papy.position.x) < 20) {
                     await player.walk(timer, 3, {
                        x: papy.position.x + (player.x < papy.position.x ? -20 : 20)
                     });
                  }
                  await player.walk(timer, 3, { y: papy.position.y + 10 });
               }
               await player.walk(timer, 3, { x: papy.position.x });
               if (player.y < papy.position.y + 10) {
                  await player.walk(timer, 3, { y: papy.position.y + 10 });
               }
               player.position.set(papy.position.add(0, 10));
               player.face = 'up';
            }
            await timer.pause(1400);
            const handout = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusPresent2
            });
            renderer.detach('main', papy);
            renderer.attach('main', handout);
            await dialogue('auto', ...text.a_foundry.unddate2a);
            handout.enable();
            await timer.when(() => handout.index === 4);
            handout.disable();
            await timer.pause(1400);
            await dialogue('auto', ...text.a_foundry.unddate2b);
            while (handout.index > 0) {
               handout.index--;
               await timer.pause(250);
            }
            renderer.detach('main', handout);
            renderer.attach('main', papy);
            await timer.pause(1400);
            const knocker = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusKnock
            });
            renderer.detach('main', papy);
            renderer.attach('main', knocker);
            assets.sounds.knock.instance(timer);
            await timer.pause(1000);
            renderer.detach('main', knocker);
            renderer.attach('main', papy);
            await timer.pause(600);
            const trueMusic = roomState.trueMusic as CosmosInstance;
            await trueMusic.gain.modulate(timer, 300, 0);
            await timer.pause(2000);
            const undyne = character('undyneDate', characters.undyneDate, { x: 160, y: 95 }, 'down');
            const door = instance('main', 'f_undyne_door')!.object;
            const anim = door.objects[0] as CosmosAnimation;
            anim.enable();
            await timer.when(() => anim.index === 3);
            assets.sounds.electrodoor.instance(timer);
            await timer.when(() => anim.index === 7);
            anim.disable();
            await timer.pause(1200);
            await dialogue('auto', ...text.a_foundry.unddate3);
            await papy.walk(timer, 3, papy.position.subtract(30, 0));
            papy.face = 'right';
            await dialogue('auto', ...text.a_foundry.unddate4);
            undyne.face = 'up';
            undyne.alpha.modulate(timer, 300, 0);
            await papy.walk(timer, 3, papy.position.add(30, 0));
            await papy.walk(timer, 3, door.position);
            papy.metadata.barrier = false;
            papy.alpha.modulate(timer, 300, 0);
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = false;
            barrier.metadata.trigger = true;
            barrier.metadata.name = 'teleport';
            barrier.metadata.args = [ 'f_kitchen', 'up', '160', '230' ];
            save.data.n.plot_date = 1.3;
            events.on('teleport').then(() => {
               renderer.detach('main', undyne);
            });
            game.movement = true;
            break;
         }
         case 'undynehouse': {
            if (game.movement) {
               if (2 <= save.data.n.plot_date) {
                  await dialogue('auto', ...text.a_foundry.undynehouse2);
               } else if (!roomState.papdater) {
                  await dialogue('auto', ...text.a_foundry.undynehouse1);
               }
            }
            break;
         }
         case 'npc86': {
            const inst = instance('main', 'f_npc86');
            if (inst) {
               const talk = (...lines: string[]) => inst.talk('a', talkFilter(), 'auto', ...lines);
               if (save.data.n.state_foundry_npc86 === 0) {
                  await talk(...text.a_foundry.npc86a());
                  if (choicer.result === 0) {
                     await talk(...text.a_foundry.npc86b);
                     save.data.n.state_foundry_npc86 = (choicer.result + 2) as 2 | 3 | 4 | 5;
                  } else {
                     save.data.n.state_foundry_npc86 = 1;
                  }
                  await talk(...text.a_foundry.npc86c);
               } else if (save.data.n.state_foundry_npc86_mood === 0) {
                  await talk(...text.a_foundry.npc86d());
                  save.data.n.state_foundry_npc86_mood = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86e());
               } else if (save.data.n.state_foundry_npc86_feelings === 0) {
                  await talk(...text.a_foundry.npc86f());
                  save.data.n.state_foundry_npc86_feelings = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86g());
               } else {
                  await talk(...text.a_foundry.npc86h());
                  save.data.b.f_state_done86 = true;
               }
            }
            break;
         }
         case 'sleeper': {
            if (instance('main', 'sleepersans')) {
               world.phish || (await dialogue('auto', ...text.a_foundry.sleepersans));
            } else {
               await dialogue('auto', ...text.a_foundry.sleeper);
            }
            break;
         }
         case 'hapstadoor': {
            if (!save.data.b.f_state_hapstadoor) {
               if (!save.data.b.item_mystery_key) {
                  await dialogue('auto', ...text.a_foundry.hapstadoor1);
                  player.y += 3;
                  player.face = 'down';
                  break;
               } else {
                  save.data.b.f_state_hapstadoor = true;
                  await dialogue('auto', ...text.a_foundry.hapstadoor2);
               }
            }
            await teleport('f_hapstablook', 'up', 170, 230, world);
            break;
         }
         case 'napcomputer': {
            if (!world.genocide && save.data.n.state_foundry_blookdate !== 2) {
               break;
            }
            if (!game.movement) {
               return;
            }
            game.movement = false;
            for (const object of instance('main', 'f_blookpc')!.object.objects) {
               if (object instanceof CosmosAnimation) {
                  object.index = 1;
                  assets.sounds.select.instance(timer).rate.value = 0.6;
                  await dialogue('auto', ...text.a_foundry.napcomputer1());
                  if (choicer.result === 0) {
                     const p1 = [ 100, 80, 35, 25, 20, 5 ];
                     const p2 = [ 100, 40 ];
                     const napster = new CosmosObject({
                        fill: 'white',
                        stroke: 'transparent',
                        font: '8px DeterminationSans',
                        objects: [
                           new CosmosSprite({ scale: 0.5, frames: [ content.iooFNapster ] }),
                           ...CosmosUtils.populate(8, div => {
                              const index = div % 6;
                              const downloaded = div < 6;
                              const textsource = downloaded ? text.a_foundry.napcomputer3 : text.a_foundry.napcomputer4;
                              return new CosmosText({
                                 anchor: { y: 0 },
                                 position: { x: 40, y: ((downloaded ? 101 : 371) + index * 25) / 2 },
                                 content: CosmosUtils.provide(textsource.a[index]),
                                 objects: [
                                    new CosmosText({
                                       anchor: { y: 0 },
                                       position: { x: 247 / 2 },
                                       content: textsource.b[index],
                                       objects: [
                                          new CosmosRectangle({
                                             anchor: { y: 0 },
                                             position: { x: 178 / 2 },
                                             size: { y: 9, x: ((downloaded ? p1 : p2)[index] / 100) * 35 },
                                             fill: `rgba(${downloaded ? '0, 86, 255' : '255, 229, 0'}, ${105 / 255})`
                                          })
                                       ]
                                    })
                                 ]
                              });
                           })
                        ]
                     });
                     renderer.attach('menu', napster);
                     object.index = 0;
                     await timer.pause(500);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', napster);
                  } else {
                     object.index = 0;
                     await dialogue('auto', ...text.a_foundry.napcomputer2);
                  }
                  break;
               }
            }
            game.movement = true;
            break;
         }
      }
   }
};

export const shops = {
   tortoise: new OutertaleShop({
      persist: true,
      background: new CosmosSprite({ frames: [ content.istBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.tortoise.vars.sell) {
                  await shopper.text(...text.s_tortoise.sell2());
               } else {
                  shops.tortoise.vars.sell = true;
                  await shopper.text(...text.s_tortoise.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.s_tortoise.exit());
               const music = shops.tortoise.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (
                  shopper.listIndex < 2 &&
                  save.data.b[`item_${[ 'padd', 'goggles' ][shopper.listIndex] as 'padd' | 'goggles'}`]
               ) {
                  typer.text(text.s_tortoise.itemUnavailable);
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.s_tortoise.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: (() => {
         const arm = new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.istArm ] });
         const head = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.istKeeper });
         const spr = new CosmosSprite({
            position: { x: 160, y: 120 },
            metadata: { tickx: 0 },
            objects: [ arm, new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.istBody ] }), head ]
         }).on('tick', function () {
            if (typer.mode === 'read') {
               const x = [ 0, 2, 4, 2 ][Math.floor(this.metadata.tickx / 3)];
               arm.position.set(x, x / 2);
               head.position.set(0, x);
               if (++this.metadata.tickx === 12) {
                  this.metadata.tickx = 0;
               }
            }
         });
         return spr;
      })(),
      music: assets.music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.s_tortoise.menu;
         } else if (shopper.index === 0) {
            return text.s_tortoise.item();
         } else {
            return text.s_tortoise.talk();
         }
      },
      preset (index) {
         (shops.tortoise.keeper.objects[2] as CosmosAnimation).index = index;
      },
      price () {
         return [ 55, 30, 25, 25 ][shopper.listIndex];
      },
      prompt () {
         return text.s_tortoise.itemPurchasePrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8) {
               const price = CosmosUtils.provide(shops.tortoise.price);
               if (save.data.n.g < price) {
                  shops.tortoise.vars.purchase = 3;
               } else {
                  shops.tortoise.vars.purchase = 1;
                  save.data.n.g -= price;
                  success = true;
               }
            } else {
               shops.tortoise.vars.purchase = 4;
            }
         } else {
            shops.tortoise.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'padd', 'goggles', 'tea', 'sap' ][shopper.listIndex];
            save.storage.inventory.add(item);
            if (item === 'padd' || item === 'goggles') {
               save.data.b[`item_${item}`] = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.tortoise.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tortoise.vars.purchase as number;
            shops.tortoise.vars.purchase = 0;
            return text.s_tortoise.itemPurchase()[purchaseValue - 1];
         } else if (atlas.target === 'shop') {
            if (world.genocide || (world.population === 0 && !world.bullied)) {
               return text.s_tortoise.menuPrompt3();
            } else if (shops.tortoise.vars.idle) {
               return text.s_tortoise.menuPrompt2;
            } else {
               shops.tortoise.vars.idle = true;
               return text.s_tortoise.menuPrompt1;
            }
         } else if (shopper.index === 0) {
            return text.s_tortoise.itemPrompt();
         } else {
            return text.s_tortoise.talkPrompt();
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 0 && save.data.b.item_padd) {
                  return null;
               }
               if (shopper.listIndex === 1 && save.data.b.item_goggles) {
                  return null;
               }
               const info = items.of([ 'padd', 'goggles', 'tea', 'sap' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.s_tortoise.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   tem: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.istcBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (world.population === 0) {
                  if (shops.tem.vars.sell || save.data.b.steal_tem) {
                     await shopper.text(...text.s_tem.sell2);
                  } else {
                     shops.tem.vars.sell = true;
                     if (world.population === 0) {
                        save.data.n.g += 758;
                        save.data.b.steal_tem = true;
                     }
                     await shopper.text(...text.s_tem.sell1);
                  }
               } else {
                  atlas.switch('shopList');
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.s_tem.exit());
               const music = shops.tem.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else if (world.population === 0 && shopper.index === 2) {
               await shopper.text(...text.s_tem.note);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.index === 1) {
               if (shopper.listIndex === CosmosUtils.provide(shops.tem.size) - 1) {
                  atlas.switch('shop');
               } else {
                  const item = save.storage.inventory.contents[shopper.listIndex];
                  if ((save.data.b.colleg ? 'sell2' : 'sell1') in items.of(item)) {
                     if (save.data.n.specsell === 0) {
                        save.data.n.specsell = 7;
                        typer.variables.x = items.of(item).text.battle.name;
                        atlas.switch('shopText');
                        await typer.text(...text.s_tem.sellStory1());
                        shops.tem.vars.attempt = 1;
                     }
                     atlas.switch('shopPurchase');
                  } else {
                     typer.text(text.s_tem.itemRestricted);
                  }
               }
            } else if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (shopper.listIndex === 3 && (world.population === 0 || save.data.b.item_temyarmor)) {
                  typer.text(text.s_tem.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.s_tem.talkText[shopper.listIndex]);
            }
         }
      },
      keeper: (() => {
         let ox = 0;
         let crfx = 0;
         let timerr = 0;
         let siner = 0;
         let random3: CosmosValueRandom;
         const body = { x: 0, y: 0 };
         const face = { x: 0, y: 0 };
         const offset1 = { x: 0, y: 0 };
         const offset2 = { x: 0, y: 0 };
         const offset3 = { x: 0, y: 0 };

         const bodyS = new CosmosSprite({ frames: [ content.istcBody ] });
         const eyebrowsS = new CosmosSprite({ frames: [ content.istcEyebrows ] });
         const eyesS = new CosmosSprite({ active: true });
         const eyesA = new CosmosAnimation({ active: true });
         const mouthS = new CosmosSprite({ active: true });
         const mouthA = new CosmosAnimation({ active: true });
         const sweatA = new CosmosSprite({ frames: [ content.istcSweat ] });
         const hatS = new CosmosSprite({ frames: [ content.istcHat ], alpha: 0 });
         const boxS = new CosmosSprite({ frames: [ content.istcBox ] });
         const coffeeA = new CosmosAnimation({ resources: content.istcCoffee });

         function display (sprite: CosmosSprite, index: number, x: number, y: number, alpha = 1) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x, y);
            sprite.alpha.value = alpha;
         }

         return new CosmosSprite({
            objects: [
               bodyS,
               eyebrowsS,
               new CosmosObject({ objects: [ eyesS, eyesA ] }),
               new CosmosObject({ objects: [ mouthS, mouthA ] }),
               sweatA,
               hatS,
               boxS,
               coffeeA
            ]
         }).on('tick', function () {
            random3 ??= random.clone();
            eyebrowsS.alpha.value = 0;
            eyesS.alpha.value = 0;
            eyesA.alpha.value = 0;
            mouthS.alpha.value = 0;
            mouthA.alpha.value = 0;
            sweatA.alpha.value = 0;
            const fx = this.metadata.face as number;
            if (fx !== crfx) {
               timerr = 0;
               face.x = 0;
               face.y = 0;
               body.x = 0;
               body.y = 0;
               crfx = fx;
            }
            siner++;
            display(coffeeA, Math.floor(siner / 8), 178 + ox, Math.floor(62 + Math.sin(siner / 4) * 1.5));
            display(bodyS, 0, 99 + body.x + ox, 1 + body.y);
            switch (fx) {
               case 0:
                  eyesA.use(content.istcEyes1);
                  mouthA.use(content.istcMouth1);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesA, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  timerr++;
                  if ((timerr > 90 && timerr < 110) || (timerr > 130 && timerr < 150)) {
                     face.x += Math.sin(timerr / 10) * 0.8;
                  } else if (timerr > 190 && timerr < 230) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  }
                  timerr > 290 && timerr < 310 && (face.y += Math.sin(timerr / 10) * 0.8);
                  timerr > 326 && timerr < 345 && (face.y += Math.sin(timerr / 10) * 1.5);
                  if (timerr > 390 && timerr < 430) {
                     face.y *= 0.9;
                     face.y <= 0.5 && (face.x = 0);
                  } else if (timerr == 460) {
                     timerr = 0;
                  }
                  break;
               case 1:
                  eyesS.frames = [ content.istcEyes2 ];
                  mouthA.use(content.istcMouth1);
                  display(
                     eyebrowsS,
                     0,
                     Math.floor(138 + offset1.x),
                     Math.floor(32 + offset1.y + face.y / 2 - Math.sin(timerr / 2))
                  );
                  display(
                     eyesS,
                     0,
                     Math.floor(135 + offset2.x + face.x + (random3.next() * 0.8 - random3.next() * 0.8)),
                     Math.floor(38 + offset2.y + face.y + (random3.next() * 0.8 - random3.next() * 0.8))
                  );
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  break;
               case 2:
                  eyesS.frames = [ content.istcEyes3 ];
                  mouthA.use(content.istcMouth2);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesS, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(
                     mouthA,
                     Math.floor(siner / 3),
                     Math.floor(141 + offset3.x + face.x),
                     Math.floor(48 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  if ((timerr > 45 && timerr < 55) || (timerr > 65 && timerr < 75)) {
                     face.x += Math.sin(timerr / 5) * 0.8;
                  } else if (timerr > 95 && timerr < 115) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  } else if (timerr == 140) {
                     timerr = 0;
                  }
                  break;
               case 3:
                  eyesS.frames = [ content.istcEyes4 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  face.x = 2;
                  face.y = -2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(146 + offset3.x + face.x),
                     Math.floor(42 + offset3.y + face.y)
                  );
                  break;
               case 4:
                  eyesS.frames = [ content.istcEyes5 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  face.y = Math.sin(timerr / 5) * 1.5;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner / 1.5) * 1.5),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  break;
               case 5:
                  eyesS.frames = [ content.istcEyes6 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  body.x = random3.next() - random3.next();
                  body.y = random3.next() - random3.next();
                  face.y = Math.sin(timerr / 3) * 2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(31 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner) * 2),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 2) * 2, 1 + Math.sin(siner / 2));
                  break;
               case 6:
                  mouthA.use(content.istcMouth4);
                  display(
                     mouthA,
                     Math.floor(siner / 2),
                     Math.floor(139 + offset2.x + face.x) + ox,
                     Math.floor(25 + offset2.y + face.y)
                  );
                  break;
            }
            fx > 0 && timerr++;
            display(boxS, 0, 80 + ox, 68);
            save.data.b.colleg && display(hatS, 0, 99 + body.x + 37 + ox, 1 + body.y);
            ox = Math.max(ox + (this.metadata.colleg ? 3 : -3), 0);
         });
      })(),
      music: assets.music.temShop,
      options () {
         if (atlas.target === 'shop') {
            return text.s_tem.menu();
         } else if (shopper.index === 0) {
            return text.s_tem.item(armorprice());
         } else if (world.population > 0 && shopper.index === 1) {
            const prop = save.data.b.colleg ? 'sell2' : 'sell1';
            return [
               ...save.storage.inventory.contents.map(key => {
                  const item = items.of(key);
                  const price = item[prop];
                  if (price === void 0) {
                     return `§fill:#808080§${item.text.battle.name}`;
                  } else {
                     return `${item.text.battle.name} - ${text.s_tem.sellValue.replace('$(x)', price.toString())}`;
                  }
               }),
               text.s_tem.sellExit
            ];
         } else {
            return text.s_tem.talk;
         }
      },
      preset (index) {
         shops.tem.keeper.metadata.face = index;
      },
      price () {
         if (shopper.index === 0) {
            return [ 4, 2, 20, save.data.b.colleg ? armorprice() : 1000 ][shopper.listIndex];
         } else {
            return items.of(save.storage.inventory.contents[shopper.listIndex])[
               save.data.b.colleg ? 'sell2' : 'sell1'
            ]!;
         }
      },
      prompt () {
         return shopper.index === 0 ? text.s_tem.itemPurchasePrompt() : text.s_tem.itemSellPrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (shopper.index === 1) {
               shops.tem.vars.purchase = 1;
               save.data.n.g += CosmosUtils.provide(shops.tem.price);
               success = true;
            } else if (save.storage.inventory.size < 8) {
               if (world.population === 0) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.tem.price);
                  if (save.data.n.g < price) {
                     shops.tem.vars.purchase = 3;
                  } else {
                     shops.tem.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.tem.vars.purchase = 4;
            }
         } else if (world.population > 0) {
            shops.tem.vars.purchase = 2;
         }
         if (success) {
            if (shopper.index === 1) {
               shops.tem.vars.attempt = void 0;
               assets.sounds.purchase.instance(timer);
               save.storage.inventory.remove(shopper.listIndex);
               save.data.n.specsell > 0 && save.data.n.specsell--;
            } else if (shopper.listIndex === 3 && !save.data.b.colleg) {
               shops.tem.vars.purchase = 0;
               assets.sounds.select.instance(timer);
               atlas.switch('shopText');
               typer.text(...text.s_tem.colleg1).then(async () => {
                  game.input = false;
                  shops.tem.keeper.metadata.colleg = true;
                  await timer.pause(3500);
                  save.data.b.colleg = true;
                  shops.tem.keeper.metadata.colleg = false;
                  await timer.pause(3500);
                  game.input = true;
                  await typer.text(...text.s_tem.colleg2);
                  atlas.switch('shop');
               });
               return true;
            } else {
               assets.sounds.purchase.instance(timer);
               const item = [ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex];
               save.storage.inventory.add(item);
               if (item === 'temyarmor') {
                  save.data.b.item_temyarmor = true;
               }
            }
         } else if (shops.tem.vars.attempt === 1) {
            shops.tem.vars.purchase = 0;
            atlas.switch('shopText');
            typer.text(...text.s_tem.sellStory2).then(() => {
               shops.tem.vars.attempt = 2;
               atlas.switch('shopPurchase');
            });
            return true;
         } else if (shops.tem.vars.attempt === 2) {
            shops.tem.vars.purchase = 0;
            const inst = assets.music.temShop.instances[0];
            const gain = inst.gain.value;
            inst.gain.value = 0;
            atlas.switch('shopText');
            typer.text(...text.s_tem.sellStory3).then(() => {
               shops.tem.vars.attempt = void 0;
               inst.gain.value = gain;
               atlas.switch('shopList');
            });
            return true;
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else if (shopper.index === 1) {
            return save.storage.inventory.contents.length + 1;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.tem.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tem.vars.purchase as number;
            shops.tem.vars.purchase = 0;
            if (world.population === 0 && purchaseValue < 4) {
               return text.s_tem.zeroPrompt;
            } else {
               return text.s_tem.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.population === 0) {
               return text.s_tem.menuPrompt3();
            } else {
               return text.s_tem.menuPrompt1;
            }
         } else if (world.population === 0) {
            return text.s_tem.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.s_tem.itemPrompt;
         } else {
            return text.s_tem.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && save.data.b.item_temyarmor) {
                  return null;
               }
               const info = items.of([ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.s_tem.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

monty
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
         if (game.room === 'f_view') {
            return;
         }
         this.tint = void 0;
      }
   })
   .on(
      'tick',
      (() => {
         let queue = (monty.metadata.queue ??= []) as {
            face: CosmosDirection;
            position: CosmosPointSimple;
            room: string;
         }[];
         let lastSpot = { x: NaN, y: NaN };
         let lastRoom = '' as string;
         const reposition = () => {
            const f =
               monty.metadata.repositionFace ||
               (game.room !== lastRoom ? player.metadata.tpface || player.face : player.face);
            monty.metadata.repositionFace = void 0;
            if (!monty.metadata.override) {
               const distance = world.azzie ? 42 : 21;
               monty.position = player.position.add(
                  f === 'left' ? distance : f === 'right' ? -distance : 0,
                  f === 'up' ? distance : f === 'down' ? -distance : 0
               );
            }
            queue = CosmosUtils.populate(world.azzie ? 14 : 7, index => ({
               face: f,
               room: game.room,
               position: monty.position.endpoint(player.position.angleFrom(monty.position), index * 3).value()
            }));
            lastSpot = { x: NaN, y: NaN };
            lastRoom = game.room;
         };
         return function () {
            if (game.room !== lastRoom || this.metadata.reposition) {
               this.metadata.reposition = false;
               reposition();
            } else if (lastSpot.x !== player.x || lastSpot.y !== player.y) {
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

azzie
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
               azzie.metadata.repositionFace ||
               (game.room !== lastRoom ? player.metadata.tpface || player.face : player.face);
            azzie.metadata.repositionFace = void 0;
            if (!azzie.metadata.override) {
               azzie.position = player.position.add(
                  f === 'left' ? 21 : f === 'right' ? -21 : 0,
                  f === 'up' ? 21 : f === 'down' ? -21 : 0
               );
            }
            queue = CosmosUtils.populate(7, index => ({
               face: f,
               room: game.room,
               position: azzie.position.endpoint(player.position.angleFrom(azzie.position), index * 3).value()
            }));
            lastSpot = { x: NaN, y: NaN };
            lastRoom = game.room;
            azzie.metadata.queue = queue;
         };
         return function () {
            if (game.room !== lastRoom || this.metadata.reposition) {
               this.metadata.reposition = false;
               reposition();
            } else if (lastSpot.x !== player.x || lastSpot.y !== player.y) {
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

phish
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
         const s = (phish.metadata.s ??= { grid: void 0, path: [], pathindex: 0 });
         const tileSize = 5;
         const pathfinder = JumpPointFinder({ heuristic: Heuristic.euclidean });
         const computeGrid = () => {
            min.set(new CosmosPoint(renderer.region[0]).subtract(160, 120));
            max.set(new CosmosPoint(renderer.region[1]).add(160, 120));
            const sizeX = max.x - min.x;
            const sizeY = max.y - min.y;
            const columns = Math.ceil(sizeX / tileSize);
            const rows = Math.ceil(sizeY / tileSize);
            const OGpos = phish.position.value();
            const barriers = [
               ...renderer.calculate('below', hitbox => hitbox.metadata.barrier === true),
               ...renderer.calculate('main', hitbox => hitbox.metadata.barrier === true)
            ];
            phish.calculate(renderer);
            s.grid = new Grid(
               CosmosUtils.populate(rows, indexY =>
                  CosmosUtils.populate(columns, indexX => {
                     phish.position.set(min.add(indexX * tileSize, indexY * tileSize).subtract(tileSize / 2));
                     // @ts-expect-error
                     phish.$hitbox.vertices = [
                        phish.position.add(-8, -4),
                        phish.position.add(8, -4),
                        phish.position.add(8, 0),
                        phish.position.add(-8, 0)
                     ];
                     return renderer.detect(phish, ...barriers).length > 0 ? 1 : 0;
                  })
               )
            );
            phish.position.set(OGpos);
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
            const selfPos = nearestOpenTile(phish.position);
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
                           (pos1.x - phish.position.x) ** 2 +
                           (pos1.y - phish.position.y) ** 2 -
                           ((pos2.x - phish.position.x) ** 2 + (pos2.y - phish.position.y) ** 2)
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
            phish.alpha.value = 0;
            if (phish.metadata.firstfight) {
               phish.position.set(player.position.subtract(20, 0));
               phish.face = 'right';
               phish.metadata.firstfight = false;
            } else {
               const [ room, face, x, y ] = save.data.s.chasecheckpoint.split(':') as [
                  string,
                  CosmosDirection,
                  string,
                  string
               ];
               phish.position.set(+x, +y);
               phish.face = face;
            }
            phish.alpha.modulate(timer, 300, 1);
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
               if (world.phish) {
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
                  this.move({ x: 0, y: 0 }, renderer);
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
                     save.data.s.chasecheckpoint = `${game.room}:${player.face}:${player.x}:${player.y}`;
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
                        dialogueSession.movement = false;
                        await typer.text('');
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
                                 if (player.y > 200) {
                                    game.camera = cam;
                                    await cam.position.modulate(timer, 1000, { y: 200 });
                                 }
                                 await inst.talk('a', talkFilter(), 'auto', ...text.a_foundry.deathReaction.f_dummy);
                                 if (player.y > 200) {
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
                              Promise.race([
                                 events.on('teleport'),
                                 bird.position.step_legacy(timer, 2, { x: 1100 })
                              ]).then(() => {
                                 game.room === 'f_bird' && renderer.detach('main', bird);
                              });
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
                                 if (player.x > 160) {
                                    game.camera = cam;
                                    await cam.position.modulate(timer, 1000, { x: 160 });
                                 }
                                 for (const line of text.a_foundry.deathReaction.f_blooky) {
                                    await [ inst1, inst2 ][t].talk('a', talkFilter(), 'auto', line);
                                    t = [ 1, 0 ][t];
                                 }
                                 if (player.x > 160) {
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
                        this.move({ x: 0, y: 0 }, renderer);
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
   if (world.phish) {
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
   if (game.movement && save.data.n.plot < 47.2 && !(world.azzie && world.monty)) {
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
            return !!runEncounter(
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
                  [ groups.radtile, 5 ]
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
      case 'f_corridor': {
         for (const inst of instances('main', 'dark2')) {
            inst.object.tint = assets.tints.dark02;
         }
         break;
      }
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
      case 'f_shyren':
         if (!roomState.active) {
            roomState.active = true;
            if (save.data.n.plot < 40) {
               await timer.when(() => player.x > 260 && game.room === 'f_shyren' && game.movement);
               await battler.encounter(player, groups.shyren);
               save.data.n.plot = 40;
            }
         }
         break;
      case 'f_story1': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 37.1) {
               const asgoreLoader = asgoreAssets.load();
               await timer.when(() => player.y < 185 && game.room === 'f_story1' && game.movement);
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
               await dialogue('auto', ...text.a_foundry.genotext.asriel32);
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
               await cam.position.modulate(timer, 1500, { y: player.y });
               game.camera = player;
               save.flag.n.ga_asriel33++ < 1 && (await dialogue('auto', ...text.a_foundry.genotext.asriel33));
               game.movement = true;
               game.music!.gain.value = world.level;
               renderer.detach('main', gorey);
               asgoreAssets.unload();
            }
            break;
         }
         break;
      }
      case 'f_chase': {
         temporary(
            new CosmosAnimation({ active: true, anchor: 0, resources: content.iooFMazeshadow }).on('tick', function () {
               this.position.set(player.x, player.y - 15);
            }),
            'above'
         );
         for (const pos of CosmosUtils.parse(save.data.s.state_foundry_f_chaseHole || '[]') as CosmosPointSimple[]) {
            stabbieHole(pos);
         }
         if (
            !save.data.b.f_state_kidd_prechase &&
            save.data.n.plot > 37.2 &&
            renderer.layers.main.objects.includes(monty)
         ) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_foundry.walktext.prechase);
            save.data.b.f_state_kidd_prechase = true;
            game.movement = true;
         }
         break;
      }
      case 'f_abyss': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 38.2) {
               const asgoreLoader = asgoreAssets.load();
               await timer.when(() => player.x > 200 && game.room === 'f_abyss' && game.movement);
               game.movement = false;
               save.data.n.plot = 38.2;
               game.music!.gain.value = 0;
               const OGverb = audio.musicReverb.value;
               audio.musicReverb.value = 0;
               await Promise.all([ asgoreLoader, timer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 410, y: 290 }, 'left', {
                  key: 'asgore1',
                  tint: assets.tints.dark02
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
               await cam.position.modulate(timer, 1500, { x: player.x });
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
      case 'f_prespear': {
         if (save.data.n.plot < 46 && !world.genocide) {
            if (roomState.awaituh) {
               return;
            }
            roomState.awaituh = true;
            await timer.when(() => game.movement && game.room === 'f_prespear' && 210 <= player.x);
            game.movement = false;
            await player.walk(timer, 3, { x: 240 });
            const r = rooms.of('f_prespear').region!;
            const OGX1 = r[0]!.x;
            const OGX2 = r[1]!.x;
            r[0]!.x = renderer.region[0].x = player.x;
            r[1]!.x = renderer.region[1].x = player.x;
            const sp1 = (await stabbie(true, { x: 180, y: 100 }, { x: 180, y: 120 }, { x: 180, y: 140 }))!;
            const barryR = new CosmosHitbox({
               metadata: { barrier: true },
               position: { x: 180, y: 100 },
               size: { x: 20, y: 60 }
            }).on('tick', function () {
               this.metadata.barrier = game.room === 'f_prespear';
            });
            renderer.attach('below', barryR);
            for (const obj of [ ...sp1.sprs, ...sp1.anims ]) {
               obj.on('tick', function () {
                  this.alpha.value = game.room === 'f_prespear' ? 1 : 0;
               });
            }
            await timer.pause(1000);
            let hover = false;
            let controller = false;
            const time = timer.value;
            const fishShake = new CosmosValue();
            const fishPosition = new CosmosPoint();
            const fish = character('undyneSUSSSSSSSSSSSSSSSSSSSSSS', characters.undyneArmor, { x: 240, y: 0 }, 'down', {
               tint: assets.tints.dark02
            }).on('tick', function () {
               if (controller) {
                  this.position = fishPosition.add(
                     (Math.random() - 0.5) * fishShake.value * 2,
                     (Math.random() - 0.5) * fishShake.value * 2
                  );
                  if (hover) {
                     this.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                  }
               } else if (this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                  assets.sounds.stomp.instance(timer).gain.value = 0.8;
               }
            });
            await fish.walk(timer, 2, { y: 35 });
            await timer.pause(1250);
            game.music!.gain.value = 0;
            audio.musicReverb.value = 0;
            world.cutscene_override = true;
            await dialogue('auto', ...text.a_foundry.run1);
            fish.walk(timer, 2, { y: 0 }).then(() => {
               renderer.detach('main', fish);
            });
            const runMusic = assets.music.undynefast.instance(timer);
            runMusic.gain.value = 1.2;
            game.movement = true;
            game.menu = false;
            const tspeed = new CosmosValue(1600);
            tspeed.modulate(timer, 30000, 800);
            let ttime = timer.value - tspeed.value / 2;
            await timer.when(() => {
               if (game.room === 'f_corner') {
                  if (220 <= player.y && game.movement) {
                     game.movement = false;
                     game.menu = true;
                     return true;
                  }
               } else if (timer.value - ttime > tspeed.value && game.movement && !battler.active) {
                  ttime = timer.value;
                  const sr = game.room;
                  const bx = sr === 'f_prespear' ? 210 : 130;
                  const sf = Math.floor(random.next() * 4);
                  let i = 0;
                  while (i < 4) {
                     if (sf !== i) {
                        const spawnSprite = temporary(
                           new CosmosAnimation({
                              active: true,
                              position: { x: 130 + i * 20, y: 10 },
                              resources: content.iooFSpearSpawn,
                              anchor: 0,
                              scale: 0.5,
                              alpha: 1,
                              rotation: random.next() * 360
                           }),
                           'menu'
                        );
                        spawnSprite.scale.modulate(timer, 700, 1.5, 1.5).then(() => {
                           spawnSprite.scale.modulate(timer, 400, 1.5, 0);
                        });
                        const rotTarget = spawnSprite.rotation.value + 120;
                        spawnSprite.rotation.modulate(timer, 1000, rotTarget, rotTarget);
                        spawnSprite.alpha.modulate(timer, 1000, 1, 1, 0).then(() => {
                           renderer.detach('menu', spawnSprite);
                        });
                     }
                     i++;
                  }
                  assets.sounds.arrow.instance(timer);
                  timer.pause(800).then(async () => {
                     if (game.room !== sr || battler.active) {
                        return;
                     }
                     temporary(
                        new CosmosObject({
                           metadata: { landed: false, shiftable: true },
                           position: { x: bx, y: player.position.clamp(...renderer.region).y - 120 },
                           velocity: { y: 16 },
                           objects: CosmosUtils.populate(
                              4,
                              i =>
                                 new CosmosSprite({
                                    alpha: i === sf ? 0 : 1,
                                    anchor: { x: 0, y: 1 },
                                    frames: [ content.iooFSpear ],
                                    position: { x: i * 20 }
                                 })
                           )
                        }),
                        'main'
                     ).on('tick', async function () {
                        if (this.metadata.landed || player.y > this.y) {
                           return;
                        }
                        this.metadata.landed = true;
                        if (battler.active) {
                           renderer.detach('main', this);
                           return;
                        }
                        this.y = player.y;
                        this.velocity.y = 0;
                        for (const obj of this.objects) {
                           if (obj instanceof CosmosSprite) {
                              obj.frames[0] = content.iooFSpearStab;
                           }
                        }
                        assets.sounds.landing.instance(timer);
                        shake(2, 500).then(async () => {
                           await this.alpha.modulate(timer, 500, 0);
                           renderer.detach('main', this);
                        });
                        if (game.movement && !battler.active && Math.abs(bx + sf * 20 - player.x) > 10) {
                           game.movement = false;
                           ttime = Infinity;
                           await battler.battlefall(player, { x: 160, y: 180 });
                           battler.simple(async () => {
                              game.movement = true;
                              renderer.detach('main', this);
                              await patterns.undynefast();
                              if (save.data.n.hp > 0) {
                                 events.on('battle-exit').then(() => {
                                    ttime = timer.value;
                                 });
                                 events.fire('exit');
                              }
                           });
                        }
                     });
                  });
               }
               return false;
            });
            r[0]!.x = OGX1;
            r[1]!.x = OGX2;
            renderer.detach('below', ...sp1.sprs, barryR);
            renderer.detach('main', ...sp1.anims);
            const sp2 = (await stabbie(
               true,
               { x: 120, y: 220 },
               { x: 140, y: 220 },
               { x: 160, y: 220 },
               { x: 180, y: 220 }
            ))!;
            for (const spr of sp2.sprs) {
               temporary(spr, 'below');
            }
            for (const anim of sp2.anims) {
               temporary(anim, 'main');
            }
            renderer.attach('main', fish);
            fish.alpha.value = 0;
            fish.position.set(160, 10);
            fish.face = 'down';
            runMusic.stop();
            await fish.alpha.modulate(timer, 300, 1);
            await fish.walk(timer, 1.5, { y: 80 });
            if (save.data.n.state_foundry_muffet === 1) {
               await timer.pause(850);
               assets.sounds.phone.instance(timer);
               await timer.pause(500);
               assets.sounds.phone.instance(timer);
               await timer.pause(1500);
               fish.alpha.value = 0;
               const phoneSpr = new CosmosSprite({
                  position: { x: fish.x, y: fish.y - 1 },
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iocUndynePhone ],
                  tint: assets.tints.dark02
               });
               renderer.attach('main', phoneSpr);
               await timer.pause(2500);
               await dialogue('auto', ...text.a_foundry.run2a);
               assets.sounds.equip.instance(timer);
               renderer.detach('main', phoneSpr);
               fish.alpha.value = 1;
               fish.face = 'up';
               await timer.pause(850);
               await dialogue('auto', ...text.a_foundry.run2b);
               await timer.pause(350);
               fish.face = 'down';
               await timer.pause(950);
               await dialogue('auto', ...text.a_foundry.run2c);
               fish.face = 'up';
               await timer.pause(850);
               Promise.all([ ...sp2.sprs, ...sp2.anims ].map(o => o.alpha.modulate(timer, 500, 0))).then(() => {
                  renderer.detach('below', ...sp2.sprs);
                  renderer.detach('main', ...sp2.anims);
               });
               await fish.walk(timer, 3, { y: 5 });
               Promise.race([ events.on('teleport'), fish.alpha.modulate(timer, 300, 0) ]).then(() => {
                  renderer.detach('main', fish);
               });
            } else {
               const bp = new CosmosValue(200);
               const sh = new CosmosValue();
               const time2 = timer.value;
               const jetpacker = new CosmosAnimation({
                  area: renderer.area,
                  position: { x: 160 },
                  resources: content.iocKiddDownTalk,
                  metadata: { fly: false },
                  tint: assets.tints.dark03,
                  anchor: { x: 0, y: 1 },
                  objects: [
                     new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocKiddJetpack })
                  ],
                  filters: [ assets.filters.bloom20 ]
               }).on('tick', function () {
                  if (this.metadata.fly) {
                     quickshadow(this, this);
                     quickshadow(this.objects[0] as CosmosSprite, this);
                  } else {
                     this.position.set(
                        new CosmosPoint(sh.value)
                           .multiply(Math.random() - 0.5, Math.random() - 0.5)
                           .add(160, bp.value + 15 + sineWaver(time2, 1000, 0, 5))
                     );
                     this.priority.value = this.y > 140 ? -3715619835 : 120;
                  }
               });
               const hlister = (h: string) => {
                  if (h === 'x1') {
                     speech.targets.add(jetpacker);
                  } else if (h === 'x2') {
                     speech.targets.delete(jetpacker);
                  }
               };
               typer.on('header', hlister);
               renderer.attach('below', jetpacker);
               const gas = assets.sounds.jetpack.instance(timer);
               gas.rate.value = 0.8;
               gas.gain.value = 0;
               gas.gain.modulate(timer, 650, 0.1);
               timer.pause(200).then(async () => {
                  await notifier(fish, 500, fish.sprite.compute().y);
                  fish.sprite.duration = 6;
                  fish.sprite.enable();
                  await fish.position.modulate(timer, 1000, { y: fish.y - 40 });
                  fish.sprite.reset();
                  Promise.all([ ...sp2.sprs, ...sp2.anims ].map(o => o.alpha.modulate(timer, 500, 0))).then(() => {
                     renderer.detach('below', ...sp2.sprs);
                     renderer.detach('main', ...sp2.anims);
                  });
               });
               dialogue('dialoguerBottom', ...text.a_foundry.run3);
               await bp.modulate(timer, 2000, 80, 80);
               await bp.modulate(timer, 1000, bp.value, 120, 120);
               await bp.modulate(timer, 500, bp.value, 100, 100);
               await dialogue('dialoguerBottom', ...text.a_foundry.run4);
               await timer.pause(1000);
               sh.modulate(timer, 4000, 4, 4, 1);
               await timer.pause(1000);
               await dialogue('dialoguerBottom', ...text.a_foundry.run5);
               await timer.pause(650);
               jetpacker.use(content.iocKiddDownTalkSad);
               await timer.pause(850);
               await dialogue('dialoguerBottom', ...text.a_foundry.run6);
               renderer.detach('below', jetpacker);
               renderer.attach('main', jetpacker);
               states.rooms.f_corner ??= {};
               let res = -1;
               const max = 15e3;
               const time3 = timer.value;
               timer.pause(5000).then(() => {
                  if (res === -1) {
                     bp.modulate(timer, 750, bp.value, 92.5);
                     sh.modulate(timer, 1000, 1, 2, 2);
                     dialogue('dialoguerBottom', ...text.a_foundry.run6a);
                  }
               });
               timer.pause(10e3).then(() => {
                  if (res === -1) {
                     bp.modulate(timer, 750, bp.value, 85);
                     sh.modulate(timer, 1000, 2, 3, 3);
                     dialogue('dialoguerBottom', ...text.a_foundry.run6b);
                  }
               });
               const tension = assets.music.tension.instance(timer);
               tension.gain.value = 1.2;
               game.movement = true;
               game.menu = false;
               const rs = (states.rooms.f_corner ??= {});
               rs.canSaveMK = true;
               await timer.when(() => {
                  if (rs.rescue) {
                     res = 0;
                     return true;
                  } else if (player.y < 60) {
                     res = 1;
                     return game.movement;
                  } else if (time3 + max <= timer.value || game.room !== 'f_corner') {
                     res = 2;
                     return game.movement;
                  }
                  return false;
               });
               rs.canSaveMK = false;
               tension.gain.modulate(timer, 300, 0);
               game.movement = false;
               game.menu = true;
               if (res === 0) {
                  const fd = fader();
                  await fd.alpha.modulate(timer, 600, 1);
                  await timer.pause(850);
                  assets.sounds.noise.instance(timer);
                  gas.stop();
                  await timer.pause(1250);
                  renderer.detach('main', jetpacker);
                  const kiddo = character('kidd', characters.kidd, { x: 160, y: 80 }, 'up', {
                     tint: assets.tints.dark02
                  });
                  await fd.alpha.modulate(timer, 300, 0);
                  renderer.detach('menu', fd);
                  await timer.pause(1000);
                  kiddo.walk(timer, 1, fish.position.add(0, 20));
                  await dialogue('dialoguerBottom', ...text.a_foundry.run7);
                  await timer.pause(150);
                  fish.sprite.duration = 5;
                  fish.sprite.enable();
                  await fish.position.modulate(timer, 500, fish.position.add(0, -5));
                  fish.sprite.reset();
                  await timer.pause(1150);
                  fish.sprite.enable();
                  await fish.position.modulate(timer, 500, fish.position.add(0, -5));
                  fish.sprite.reset();
                  await timer.pause(1150);
                  fish.face = 'up';
                  fish.sprites.up.duration = 6;
                  fish.sprites.up.enable();
                  await fish.position.step(timer, 2, { y: 5 });
                  fish.alpha.modulate(timer, 300, 0).then(() => {
                     renderer.detach('main', fish);
                     fish.sprites.up.reset();
                  });
                  await timer.pause(650);
                  await kiddo.walk(timer, 2, { y: 80 });
                  await dialogue('dialoguerBottom', ...text.a_foundry.run8);
                  kiddo.face = 'up';
                  await timer.pause(650);
                  await kiddo.walk(timer, 1.5, { y: 30 });
                  await timer.pause(650);
                  kiddo.face = 'down';
                  await timer.pause(1150);
                  await dialogue('dialoguerBottom', ...text.a_foundry.run9);
                  await kiddo.walk(timer, 2, { y: 5 });
                  await kiddo.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', kiddo);
               } else if (game.room === 'f_corner') {
                  await dialogue('dialoguerBottom', ...[ text.a_foundry.run6d, text.a_foundry.run6c ][res - 1]);
                  await sh.modulate(timer, 500, 6);
                  const sfxAssets = new CosmosInventory(content.asBoom, content.asLanding, content.asJetpack);
                  const sfxLoader = sfxAssets.load();
                  jetpacker.metadata.fly = true;
                  jetpacker.x = 160;
                  jetpacker.velocity.y = -10;
                  assets.sounds.stab.instance(timer);
                  gas.stop();
                  shake(2, 500);
                  await timer.pause(66);
                  assets.sounds.superstrike.instance(timer).gain.value /= 2;
                  await timer.pause(200);
                  assets.sounds.notify.instance(timer);
                  await notifier(fish, 500, fish.sprite.compute().y);
                  await Promise.all([ timer.pause(650), sfxLoader ]);
                  fish.preset = characters.undyneArmorJetpack;
                  assets.sounds.noise.instance(timer).gain.value = 0.5;
                  const flame = assets.sounds.jetpack.instance(timer);
                  flame.gain.value = 0.2;
                  controller = true;
                  fishPosition.set(fish);
                  await fishShake.modulate(timer, 350, 1);
                  hover = true;
                  timer.pause(400).then(() => {
                     fishShake.modulate(timer, 700, 0);
                  });
                  timer.pause(500).then(() => {
                     assets.sounds.boom.instance(timer).rate.value = 0.5;
                  });
                  await fishPosition.modulate(timer, 1000, {}, { y: -50 });
                  await timer.pause(1000);
                  assets.sounds.landing.instance(timer);
                  flame.stop();
                  await timer.pause(2150);
                  await dialogue('auto', ...text.a_foundry.run11(res === 1));
                  save.data.b.f_state_kidd_betray = true;
                  await timer.pause(650);
                  sfxAssets.unload();
                  renderer.detach('main', fish, jetpacker);
               } else {
                  renderer.detach('main', fish, jetpacker);
                  gas.stop();
                  teleporter.movement = false;
                  await timer.pause(1150);
                  await dialogue('auto', ...text.a_foundry.run10);
                  save.data.b.f_state_kidd_betray = true;
                  game.movement = true;
                  game.menu = true;
                  game.music && (game.music.gain.value = world.level);
               }
               typer.off('header', hlister);
               renderer.detach('below', jetpacker);
            }
            world.cutscene_override = false;
            audio.musicReverb.value = rooms.of('f_corner').score.reverb;
            save.data.n.plot = 46;
            game.movement = true;
            resume({ gain: world.level, rate: world.ambiance });
         } else if (!world.genocide) {
            for (const pos of [
               { x: 180, y: 120 },
               { x: 180, y: 140 },
               { x: 180, y: 160 }
            ]) {
               stabbieHole(pos);
            }
         }
         break;
      }
      case 'f_spear':
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 46) {
               game.movement = false;
               teleporter.movement = false;
               save.data.n.plot = 46;
               const fish = character('undyneArmor', characters.undyneArmor, { x: 160, y: 200 }, 'down', {
                  tint: assets.tints.dark02
               });
               const stepSFX = () => {
                  if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                     assets.sounds.stomp.instance(timer).gain.value = Math.min(
                        Math.max(CosmosMath.remap(fish.position.y, 0.5, 0, 220, 280), 0),
                        1
                     );
                  }
               };
               fish.on('tick', stepSFX);
               fish.walk(timer, 3, fish.position.add(0, 60)).then(() => {
                  fish.off('tick', stepSFX);
                  renderer.detach('main', fish);
               });
               await timer.pause(550);
               await dialogue('auto', ...text.a_foundry.genotext.kidd2);
               fish.alpha.value = 0;
               game.movement = true;
            }
         }
         break;
      case 'f_corner': {
         if (save.data.n.plot > 45 && !world.genocide) {
            for (const pos of [
               { x: 120, y: 240 },
               { x: 140, y: 240 },
               { x: 160, y: 240 },
               { x: 180, y: 240 }
            ]) {
               stabbieHole(pos);
            }
         }
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 47) {
               await timer.when(() => game.room === 'f_corner' && player.y > 180 && game.movement);
               save.data.n.plot = 47;
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal1());
            }
         }
         break;
      }
      case 'f_story2':
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 47.01) {
               await timer.when(() => game.room === 'f_story2' && player.x > 240 && game.movement);
               save.data.n.plot = 47.01;
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal2);
            }
         }
         break;
      case 'f_pacing':
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.data.n.plot < 47.02) {
               await timer.when(() => game.room === 'f_pacing' && player.x > 260 && game.movement);
               save.data.n.plot = 47.02;
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal3());
            }
         }
         break;
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
                  await timer.when(() => player.x > 210 && game.room === 'f_puzzle3' && game.movement);
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
                  save.flag.n.ga_asrielStutter < 1 && header('x1').then(() => (save.flag.n.ga_asrielStutter = 1));
                  await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal1());
                  assets.sounds.phase.instance(timer);
                  gorey.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                     gorey.scale.modulate(timer, 50, { x: 0, y: 1 });
                  });
                  await gorey.alpha.modulate(timer, 100, 0.8);
                  gorey.alpha.value = 0;
                  await timer.pause(40);
                  gorey.alpha.value = 1;
                  const alphy = character('alphys', characters.alphys, gorey, 'left', { scale: { x: 0 } });
                  assets.sounds.dephase.instance(timer);
                  alphy.scale.modulate(timer, 50, { x: 1.05, y: 1 }).then(() => {
                     alphy.scale.modulate(timer, 125, { x: 1, y: 1 });
                  });
                  timer.pause(35).then(async () => {
                     alphy.alpha.value = 0;
                     await timer.pause(40);
                     alphy.alpha.value = 0.8;
                     await alphy.alpha.modulate(timer, 100, 1);
                  });
                  await timer.pause(850);
                  renderer.detach('main', gorey);
                  await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal2);
                  assets.sounds.phase.instance(timer);
                  alphy.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                     alphy.scale.modulate(timer, 50, { x: 0, y: 1 });
                  });
                  await alphy.alpha.modulate(timer, 100, 0.8);
                  alphy.alpha.value = 0;
                  await timer.pause(40);
                  alphy.alpha.value = 1;
                  jeebs.gain.modulate(timer, 1000, 0).then(() => {
                     jeebs.stop();
                  });
                  await cam.position.modulate(timer, 1500, { x: player.x });
                  game.camera = player;
                  await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal3);
                  game.movement = true;
                  game.music!.gain.value = world.level;
                  renderer.detach('main', alphy);
                  asgoreAssets.unload();
               }

               // puzzle part
               if (save.data.n.plot < 45) {
                  await timer.when(() => player.y > 150 && game.room === 'f_puzzle3' && game.movement);
                  game.movement = false;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel39);

                  // kid start walk
                  monty.metadata.override = true;
                  const OGregion = renderer.region[0];
                  renderer.region[0] = game.camera.position.value();
                  game.camera = monty;
                  player.walk(timer, 3, { y: 170 }, { x: 711, y: 170 }).then(async () => {
                     player.face = 'down';
                     await timer.pause(650);
                     azzie.face = 'down';
                  });

                  // puzzle sequence
                  const pylon3A = instance('main', 'f_puzzlepylon3A')!.object;
                  const pylon3D = instance('main', 'f_puzzlepylon3D')!.object;
                  const pylon3H = instance('main', 'f_puzzlepylon3H')!.object;

                  await timer.pause(850);
                  await monty.walk(timer, 3, { x: 545 }, { x: 570, y: 190 });
                  let index = 0;
                  while (index++ < 2) {
                     pylon3A.position.modulate(timer, 66, pylon3A.position.add(10, 0));
                     await monty.walk(timer, 1.5, monty.position.add(3, 0));
                     await monty.walk(timer, 3, monty.position.add(7, 0));
                  }
                  await timer.pause(950);
                  await monty.walk(timer, 3, { x: 680, y: 190 }, { x: 690 });
                  index = 0;
                  await timer.pause(1150);
                  await monty.walk(timer, 3, { x: 710, y: 190 });
                  index = 0;
                  while (index++ < 6) {
                     pylon3D.position.modulate(timer, 66, pylon3D.position.add(10, 0));
                     await monty.walk(timer, 1.5, monty.position.add(3, 0));
                     await monty.walk(timer, 3, monty.position.add(7, 0));
                  }
                  await timer.pause(450);
                  await monty.walk(timer, 3, { x: 770, y: 280 }, { x: 790, y: 310 });
                  index = 0;
                  while (index++ < 3) {
                     pylon3H.position.modulate(timer, 66, pylon3H.position.subtract(10, 0));
                     await monty.walk(timer, 1.5, monty.position.subtract(3, 0));
                     await monty.walk(timer, 3, monty.position.subtract(7, 0));
                  }

                  // return to sender
                  await monty.walk(timer, 3, { y: 280 }, { x: azzie.x, y: 280 }, azzie.position.add(0, 21));

                  // end script
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel40());
                  azzie.face = 'up';
                  await timer.pause(850);
                  await script('puzzle3', 'cutscene');
                  await timer.pause(450);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel41);
                  const cammie = new CosmosObject({ position: monty.position });
                  game.camera = cammie;
                  await monty.walk(timer, 3, azzie.position.add(-21, 21), azzie.position.add(-21, 0));
                  monty.face = 'right';
                  monty.metadata.reposition = true;
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel42);
                  await cammie.position.modulate(timer, 450, player.position.value());
                  game.camera = player;
                  monty.metadata.override = false;
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
                  })([ player, monty ][index])
               )
            );
         }
         if (!roomState.active) {
            roomState.active = true;
            const random3 = new CosmosValueRandom(hashes.of(save.data.s.name));
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
            if (save.data.b.papyrus_secret && save.data.n.plot_call < 5) {
               teleporter.movement = false;
               save.data.n.plot_call = 5;
               await dialogue('dialoguerBottom', ...text.a_foundry.secretcall);
               game.movement = true;
            }
            for (const [ index, spider ] of spiders.entries()) {
               await Promise.race([ events.on('teleport'), timer.when(() => player.x > spider.position.x - 40) ]);
               if (game.room === 'f_muffet') {
                  spider.position.modulate(timer, 1000, { y: -10 });
                  save.data.n.state_foundry_spiders = index + 0.5;
               } else {
                  renderer.detach('main', ...spiders);
                  return;
               }
               await Promise.race([ events.on('teleport'), timer.when(() => player.x > spider.position.x - 1) ]);
               if (game.room === 'f_muffet') {
                  await timer.when(() => game.movement);
                  index === 4 && (player.x = 500);
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
            monty.metadata.override = true;
            await battler.start(groups.muffet);
            player.face = 'right';
            monty.metadata.holdover = true;
            save.data.n.plot = 39;
            monty.metadata.override = false;
            monty.position = player.position.subtract(21, 0);
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
                        monty.metadata.holdover = false;
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
               monty.metadata.reposition = true;
               await dialogue('dialoguerBottom', ...text.a_foundry.muffetGeno3);
            } else {
               monty.metadata.holdover = false;
               mofo.reset();
               await dialogue('auto', ...text.a_foundry.muffet1());
               mofo.enable();
               assets.sounds.spiderLaugh.instance(timer);
               platform.position.modulate(timer, 2500, { y: 0 }).then(() => {
                  renderer.detach('main', platform);
               });
               await timer.pause(850);
               monty.metadata.reposition = true;
               monty.metadata.repositionFace = 'right';
               await dialogue('dialoguerBottom', ...text.a_foundry.muffet2());
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.muffet);
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
               await timer.when(() => game.room === 'f_path' && player.x > 300 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path1());
               save.data.n.plot_kidd = 3;
            }
            if (save.data.n.plot_kidd < 3.1) {
               await timer.when(() => game.room === 'f_path' && player.x > 700 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path2());
               save.data.n.plot_kidd = 3.1;
            }
            if (save.data.n.plot_kidd < 3.2) {
               await timer.when(() => game.room === 'f_path' && player.x > 800 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path3());
               save.data.n.plot_kidd = 3.2;
            }
            if (save.data.n.plot_kidd < 3.3) {
               await timer.when(() => game.room === 'f_path' && player.x > 1200 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path4());
               save.data.n.plot_kidd = 3.3;
            }
         }
         break;
      }
      case 'f_plank': {
         if (save.data.n.plot < 42) {
            if (roomState.active) {
               return;
            }
            // normal MK part
            roomState.active = true;
            await timer.when(() => game.room === 'f_plank' && player.x > 120 && game.movement);
            game.movement = false;
            const cam = new CosmosObject({ position: player.position.value() });
            game.camera = cam;
            await dialogue('auto', ...text.a_foundry.walktext.path5);
            monty.metadata.override = true;
            await monty.walk(timer, 3, player.position.add(0, player.y > 110 ? -21 : 21), {
               x: 155,
               y: 110
            });
            monty.face = 'right';
            await timer.pause(650);
            monty.face = 'left';
            await timer.pause(1150);
            await dialogue('auto', ...text.a_foundry.walktext.path6());
            monty.face = 'right';
            await timer.pause(850);
            monty.alpha.value = 0;
            const spr = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: monty.position.value(),
               frames: [ content.iocKiddCrouch ]
            });
            renderer.attach('main', spr);
            await timer.pause(1000);
            await dialogue('auto', ...text.a_foundry.walktext.path7());
            await player.walk(timer, 3, monty.position.subtract(21, 0));
            await timer.pause(650);
            await player.position.modulate(timer, 750, monty.position.subtract(0, 15));
            await timer.pause(150);
            timer.pause(650).then(() => {
               renderer.detach('main', spr);
               monty.alpha.value = 1;
            });
            await new Promise<void>(async resolve => {
               const midPoint = player.position.subtract(-37.5, 10).value();
               const endPoint = player.position.add(75, 15).value();
               player.position.modulate(timer, 1000, midPoint, endPoint).then(async () => {
                  resolve();
               });
               while (player.x < endPoint.x) {
                  await timer.pause(player.y < midPoint.y - 5 ? 133 : player.y < midPoint.y - 10 ? 99 : 66);
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
            monty.walk(timer, 3, { x: 30, y: 110 }).then(() => {
               renderer.detach('main', monty);
            });
            await cam.position.modulate(timer, 2000, player.position.value());
            game.camera = player;
            game.movement = true;
            game.menu = false;

            // wait for player to enter trap zone
            await timer.when(() => player.x > 400 && game.movement);
            player.face = 'right';
            game.movement = false;
            game.menu = true;
            const spearSpr = new CosmosSprite({
               position: { x: 420, y: -110 },
               frames: [ content.iooFSpear ], // fear spear
               anchor: { x: 0, y: 1 }
            });
            renderer.attach('above', spearSpr);
            assets.sounds.arrow.instance(timer);
            await spearSpr.position.modulate(timer, 300, { y: 110 });
            const fd = fader({ fill: 'white', alpha: 1 });
            renderer.detach('above', spearSpr);
            spearSpr.priority.value = -294867948;
            renderer.attach('below', spearSpr);
            spearSpr.position.modulate(timer, 450, { y: 330 }).then(() => {
               renderer.detach('below', spearSpr);
            });
            shake(4, 1000);
            assets.sounds.landing.instance(timer);

            // bridgefall
            const faker = instance('below', 'fakebridge')!.object;
            faker.velocity.set(2, -7);
            faker.gravity.set(90, 0.5);
            faker.spin.value = -0.5;
            await fd.alpha.modulate(timer, 300, 0);
            await timer.pause(300);
            cam.position.set(player);
            game.camera = cam;

            const fakekid = character('mogus2', characters.kiddSad, monty, 'right');

            // start kidd walkback if applicable
            if (save.data.n.state_foundry_muffet === 1) {
               renderer.detach('main', fakekid);
            }

            // spawn chaser undyne
            let hover = true;
            const time = timer.value;
            const fishPosition = new CosmosPoint({ x: 260, y: cam.y - 120 });
            const fish = character('undyneArmorJetpack', characters.undyneArmorJetpack, fishPosition.value(), 'down')
               .on('tick', function () {
                  this.position.set(fishPosition);
                  if (hover) {
                     this.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                  }
               })
               .on('tick', alphaCheck);

            // make fish fall
            const flame = assets.sounds.jetpack.instance(timer);
            timer
               .when(() => fish.position.y > player.y - 15)
               .then(() => {
                  assets.sounds.noise.instance(timer).gain.value = 0.5;
                  fish.preset = characters.undyneArmor;
                  flame.stop();
               });
            flame.gain.modulate(timer, 1150, 0.2);
            await fishPosition.modulate(timer, 1150, fishPosition.value(), { y: player.y }, { y: player.y });
            hover = false;
            assets.sounds.stomp.instance(timer).gain.value = 0.9;
            shake(2.5, 500);
            await timer.pause(650);

            // face da music
            fish.face = 'right';
            await timer.pause(1250);
            if (save.data.n.state_foundry_muffet !== 1) {
               timer.pause(500).then(() => (fish.face = 'left'));
               await cam.position.modulate(timer, 1000, { x: 280 });
               fakekid.walk(timer, 3, { x: 140 });
               await dialogue('auto', ...text.a_foundry.walktext.rescue1);
               await timer.pause(500);
               fish.face = 'right';
               await timer.pause(650);
               fakekid.key = 'kidd';
               header('x1').then(() => fakekid.sprite.disable());
               await dialogue('auto', ...text.a_foundry.walktext.rescue2);
               await cam.position.modulate(timer, 1000, { x: player.x });
               renderer.detach('main', fakekid);
               timer.pause(850).then(async () => {
                  await dialogue('auto', ...text.a_foundry.walktext.rescue3);
               });
            }

            // fish walks towards player
            const stepSFX = () => {
               if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                  assets.sounds.stomp.instance(timer).gain.value = 0.8;
               }
            };

            // walk towards player X
            fish.on('tick', stepSFX);
            fish.face = 'right';
            characters.undyneArmor.walk.right.duration = 6;
            characters.undyneArmor.walk.right.enable();
            while (fishPosition.x < player.x - 18) {
               await renderer.on('tick');
               fishPosition.x = Math.min(fishPosition.x + 1, player.x - 18);
            }
            characters.undyneArmor.walk.right.reset();
            fish.off('tick', stepSFX);
            await timer.pause(save.data.n.state_foundry_muffet !== 1 ? 2850 : 1150);

            // stop fish (instead of go fish)
            await dialogue('auto', ...text.a_foundry.bruh);
            fish.alpha.value = 0;
            const touchie = new CosmosAnimation({
               active: true,
               tint: fish.tint,
               anchor: { x: 0, y: 1 },
               position: fish.position.value(),
               resources: content.iocUndyneKick
            });
            renderer.attach('main', touchie);
            await timer.when(() => touchie.index === 2);
            touchie.disable();
            const kicker = assets.sounds.kick.instance(timer);
            shake(1.5, 1400);
            const overlay = new CosmosRectangle({ alpha: 0, fill: 'black', size: { x: 320, y: 240 } });
            renderer.attach('menu', overlay);
            cam.position.set(player.position.value());
            player.y -= 15;
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

            // reset player
            player.rotation.value = 0;
            renderer.detach('main', touchie, fish);
            kicker.stop();
            player.anchor.y = 1;
            player.sprite.anchor.y = 1;

            // wait and play memory
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

            // end memory and tp to landing zone
            ticko = false;
            musicbox.stop();
            content.amMemory.unload();
            game.camera = player;
            renderer.detach('menu', epic);
            await teleport('f_asriel', 'down', 160, 150, { fast: true });
            await timer.pause(1000);
            save.data.n.plot = 42;
            game.movement = true;
            game.menu = true;
            await overlay.alpha.modulate(timer, 600, 0);
            renderer.detach('menu', overlay);
         } else {
            instance('below', 'fakebridge')?.destroy();
         }
         break;
      }
      case 'f_dummy': {
         if (!world.dead_skeleton && save.data.n.plot_call < 6) {
            teleporter.movement = false;
            save.data.n.plot_call = 6;
            assets.sounds.phone.instance(timer);
            await dialogue('dialoguerBottom', ...text.a_foundry.plot_call.b());
            await dialogue('dialoguerBottom', commonText.c_call2);
            game.movement = true;
         }
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
               await timer.when(() => game.room === 'f_dummy' && player.y > 300 && game.movement);
               game.movement = false;
               save.data.n.plot = 42.1;
               game.music!.gain.value = 0;
               const battleLoader = save.data.b.toriel_phone ? void 0 : battler.load(commonGroups.maddummy);
               await timer.pause(1150);
               const cam = new CosmosObject({ position: { x: 160, y: player.y } });
               game.camera = cam;
               await cam.position.modulate(timer, 850, { x: 160, y: player.y - 100 });
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
                     await renderer.on('tick');
                  }
                  renderer.zoom.value = zoom;
                  assets.sounds.dununnn.instance(timer);
                  dummySprite.use(content.ionODummyMadDark);
                  await timer.pause(2450);
                  cam.position.modulate(timer, duration, start);
                  area.modulate(timer, duration, 320);
                  while (area.value < 320) {
                     renderer.zoom.value = 320 / area.value;
                     await renderer.on('tick');
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
               await cam.position.modulate(timer, 850, { x: 160, y: player.y });
               game.camera = player;
               basePos.set(player.position.subtract(0, 140));
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
                  const loder = kiddAssets.load();
                  await timer.when(() => 400 <= player.x && game.room === 'f_hub' && game.movement);
                  game.movement = false;
                  save.data.n.plot = 43;
                  player.x = 400;
                  game.music!.gain.value = 0;
                  await timer.pause(450);
                  renderer.attach('main', azzie);
                  azzie.metadata.override = true;
                  azzie.position.set({ x: 200, y: player.y });
                  await azzie.walk(timer, 3, player.position.add(-21, 0));
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel35());
                  await timer.pause(650);
                  azzie.face = 'left';
                  await Promise.all([ timer.pause(850), loder ]);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel36);
                  renderer.attach('main', monty);
                  monty.metadata.override = true;
                  monty.preset = characters.kiddSlave;
                  monty.position.set({ x: 200, y: player.y });
                  monty.sprite.duration = 5;
                  await monty.walk(timer, 3, azzie.position.add(-21, 0));
                  await timer.pause(1150);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel37());
                  await timer.pause(450);
                  azzie.face = 'right';
                  await timer.pause(850);
                  azzie.metadata.reposition = true;
                  monty.metadata.reposition = true;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel38());
                  azzie.metadata.override = false;
                  monty.metadata.override = false;
                  monty.metadata.barrier = false;
                  monty.metadata.interact = false;
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
         if (!world.genocide && !world.phish && !save.data.b.a_state_napstadecline) {
            if (save.data.n.state_foundry_blookdate < 2) {
               if (save.data.n.state_foundry_blookdate < 0.2 && save.data.n.plot <= 48) {
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
               this.alpha.value = (player.x - 10) / 30;
            });
            events.on('teleport').then(() => {
               renderer.detach('main', blooker);
            });
         }
         break;
      }
      case 'f_asriel': {
         if (!roomState.comcheck && world.azzie && world.monty) {
            roomState.comcheck = true;
            await timer.when(() => game.movement);
            if (!save.flag.b.asriel_trashcom && world.genocide && world.monty) {
               save.flag.b.asriel_trashcom = true;
               await dialogue('auto', ...text.a_foundry.walktext.trashcom);
            }
         }
         break;
      }
      case 'f_snail': {
         if (!world.genocide && !world.phish && !save.data.b.a_state_napstadecline) {
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
            if (!roomState.comcheck && world.azzie && world.monty) {
               roomState.comcheck = true;
               if (!save.data.b.f_state_kidd_snailcom && world.genocide && world.monty) {
                  await timer.when(() => player.x < 240 && game.room === 'f_snail' && game.movement);
                  save.data.b.f_state_kidd_snailcom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.snailcom);
               }
            }
         }
         break;
      }
      case 'f_napstablook': {
         if (!world.phish) {
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
                     if (world.phish) {
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
                     player.y -= 5;
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
                     player.y += 5;
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
      case 'f_battle': {
         (world.genocide || 48 <= save.data.n.plot || save.data.n.state_starton_papyrus === 1) &&
            instance('main', 'sleepersans')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide) {
               if (save.data.n.plot < 47.1) {
                  const fishAzzets = new CosmosInventory(inventories.iocUndyne, content.avUndyne);
                  const fishLoader = fishAzzets.load();
                  const undyneLoaduh = battler.load(groups.undyne);
                  await timer.when(() => game.room === 'f_battle' && player.x > 200 && game.movement);
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
                  azzie.face = 'left';
                  await timer.pause(UF === 0 ? 850 : 650);
                  const impact = assets.sounds.impact.instance(timer);
                  impact.rate.value = 1 / 3;
                  dialogue('auto', ...text.a_foundry.genotext.kiddFinal6);
                  await timer.pause(125);
                  monty.metadata.override = true;
                  monty.face = 'right';
                  assets.sounds.notify.instance(timer);
                  const notifier = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: renderer.projection(monty.position.subtract(0, 29)),
                     resources: content.ibuNotify
                  });
                  renderer.attach('menu', notifier);
                  await timer.pause(450);
                  renderer.detach('menu', notifier);
                  monty.sprites.right.duration = 15;
                  monty.sprites.right.enable();
                  await monty.position.modulate(timer, UF === 0 ? 500 : 350, monty.position.add(-5, 0));
                  monty.sprites.right.disable();
                  await timer.pause(UF === 0 ? 850 : 450);
                  await monty.walk(timer, 3, { y: 230 }, { x: player.x, y: 230 });
                  game.camera = monty;
                  await monty.walk(timer, 3, { x: 300 }, { x: 350, y: 220 });
                  UF === 0 && (await timer.pause(950));
                  await monty.walk(timer, UF === 0 ? 1.5 : 3, { x: 440 }, { x: 470, y: 200 });
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
                  renderer.detach('main', fish, monty);
                  azzie.metadata.reposition = true;
                  game.camera = player;
                  await b;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel43());
                  await timer.pause(2350);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel44);
                  let done = false;
                  azzie.metadata.override = true;
                  Promise.all([
                     player.walk(timer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1520, y: 220 }),
                     azzie.walk(timer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1520, y: 220 })
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
                  azzie.key = '';
                  await dialogue('auto', ...text.a_foundry.genotext.asriel45);
                  azzie.key = 'asriel2';
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
                  azzie.metadata.override = false;
                  azzie.metadata.reposition = true;
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
         player.y < 160 && (player.priority.value = 1000);
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
         if (!world.dead_skeleton && save.data.n.plot_call < 5) {
            teleporter.movement = false;
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
            await typer.text(commonText.c_call2);
            atlas.switch(null);
            game.movement = true;
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
            if (battler.active) {
               battler.stat.speed.modifiers.push(
                  ...CosmosUtils.populate(3, i => [ 'add', 0.25 / 3, i + 3 ] as ['add', number, number])
               );
            }
            break;
      }
   }
});

player.on('tick', alphaCheck);

CosmosUtils.status(`LOAD MODULE: FOUNDRY AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
