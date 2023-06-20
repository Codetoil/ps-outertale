import './bootstrap';

import { AdvancedBloomFilter, CRTFilter, GlitchFilter, GlowFilter, MotionBlurFilter } from 'pixi-filters';
import { BLEND_MODES, Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import assets from '../assets';
import { OutertaleMultivisualObject, OutertaleShop } from '../classes';
import { azzie, characters, endCall, genCB, runEncounter } from '../common';
import commonGroups from '../common/groups';
import content, { inventories } from '../content';
import { atlas, audio, events, exit, game, items, keys, random, renderer, rooms, speech, timer, typer } from '../core';
import { CosmosDaemon, CosmosInstance } from '../engine/audio';
import { CosmosInventory, CosmosTimer } from '../engine/core';
import { CosmosCharacter, CosmosEntity } from '../engine/entity';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosBitmap,
   CosmosColor,
   CosmosImage,
   CosmosSprite
} from '../engine/image';
import {
   CosmosMath,
   CosmosPoint,
   CosmosPointLinked,
   CosmosPointSimple,
   CosmosValue,
   CosmosValueRandom
} from '../engine/numerics';
import { CosmosHitbox, CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosText } from '../engine/text';
import { CosmosDirection, CosmosKeyed, CosmosProvider, CosmosUtils } from '../engine/utils';
import {
   battler,
   calcHP,
   character,
   choicer,
   colormix,
   dialogue,
   dialogueSession,
   distanceGravity,
   fader,
   header,
   heal,
   instance,
   instances,
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
import save from '../save';
import { gossiper, sources } from './bootstrap';
import groups from './groups';
import text, { evac, pms, trueLizard } from './text';

export type AerialisRoomKey = keyof typeof sources;

export type DefinedRoomStates = {
   a_lift: {
      location:
         | 'a_start'
         | 'a_elevator1'
         | 'a_elevator2'
         | 'a_elevator3'
         | 'a_elevator4'
         | 'a_elevator5'
         | 'a_hub5'
         | 'a_core_entry1'
         | 'a_core_exit2'
         | 'c_start';
      elevating: boolean;
   };
   a_lab_main: {
      cutscene: boolean;
      monitor: boolean;
      monitorObject: CosmosObject;
      subcontainer: Container;
      alph: CosmosCharacter;
   };
   a_puzzle1: { offset: number; check: boolean; crash: boolean };
   a_puzzle2: { offset: number; check: boolean; crash: boolean };
   a_barricade1: { trig1: boolean; trig2: boolean; trig3: boolean };
   a_mettaton1: {
      active: boolean;
      ingredient1: number;
      ingredient2: number;
      ingredient3: number;
      danger: boolean;
      metta: boolean;
   };
   a_mettaton2: { active: boolean; killswitch: boolean; climber: boolean };
   a_split: { active: boolean; napsta: CosmosCharacter };
   a_elevator3: { active: boolean };
   a_lookout: { active: boolean };
   a_hub5: { active: boolean };
   a_elevator4: { active: boolean };
   a_core_entry1: { active: boolean };
   a_core_entry2: { active: boolean };
   a_core_left1: { active: boolean; active_puzzle: boolean; switches: number[]; solved: boolean };
   a_core_left2: { active: boolean; active_puzzle: boolean; switches: number[]; solved: boolean };
   a_core_left3: { active: boolean };
   a_core_right1: { active: boolean };
   a_core_right2: { active: boolean };
   a_core_right3: { active: boolean };
   a_core_bridge: { active: boolean };
   a_core_checkpoint: { active: boolean };
   a_core_battle: { active: boolean };
   a_sans: { toppler: boolean };
};

export type RoomStates = {
   [k in AerialisRoomKey]: k extends keyof DefinedRoomStates ? Partial<DefinedRoomStates[k]> : {};
};

export const childEvac = () => world.genocide || world.population === 0 || (trueLizard() > 1 && world.population < 5);
export const babyEvac = () => world.genocide || world.population === 0 || trueLizard() > 1;
export const teenEvac = () => world.genocide || (world.population === 0 && (!world.bullied || trueLizard() > 1));

export const darkmansSprites = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionADarkman })
};

export const puzzler = {
   templates: {
      a_core_left1: [
         [ 1, 1, 0, 0, 0, 0, 0, 1, 1 ], //
         [ 0, 0, 1, 0, 0, 0, 1, 0, 0 ], //
         [ 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
         [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ] //
      ],
      a_core_left2: [
         [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, /**/ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], //
         [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ], //
         [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, /**/ 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
         [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ], //
         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, /**/ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ], //
         [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ], //
         [ 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, /**/ 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1 ]
      ]
   },
   resmaps: {
      a_core_left1: [ 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
      a_core_left2: [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
   },
   update (roomState: RoomStates['a_core_left1'] | RoomStates['a_core_left2'], targets: number[], restore = false) {
      const switches = roomState.switches!;

      for (const t of targets) {
         switches.includes(t) ? switches.splice(switches.indexOf(t), 1) : switches.push(t);
      }

      const room = game.room as 'a_core_left1' | 'a_core_left2';
      const template = puzzler.templates[room];
      const layout = CosmosUtils.populate(template[0].length, 0);
      for (const id of switches) {
         for (const [ index, value ] of template[id].entries()) {
            layout[index] = ((layout[index] + value) % 2) as 0 | 1;
         }
      }
      const absolute = !layout.includes(0);

      const instList = [ ...instances('below', 'switch') ];
      for (const inst of instList) {
         (inst.object.objects[0] as CosmosAnimation).index = switches.includes(+inst.tags[1]) ? 1 : 0;
      }

      const existing = [] as number[];
      const holderObjects1 = instance('main', 'puzzleholder1')?.object.objects ?? [];
      for (const object of holderObjects1) {
         const position = object.metadata.position;
         layout[position] === 1 && existing.push(position);
         object.metadata.mode = absolute ? 2 : layout[position];
      }
      const holderObjects2 = instance('main', 'puzzleholder2')?.object.objects ?? [];
      for (const object of holderObjects2) {
         const position = object.metadata.position;
         layout[position] === 1 && existing.push(position);
         object.metadata.mode = absolute ? 2 : layout[position];
      }

      for (const [ position, value ] of layout.entries()) {
         if (value === 1 && !existing.includes(position)) {
            const holderObjects = [ holderObjects1, holderObjects2 ][Math.floor(position / 13)]!;
            holderObjects.push(
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  index: restore ? (absolute ? 6 : 5) : 0,
                  metadata: { mode: absolute ? 2 : 1, position },
                  position: { x: (position % 13) * 20, y: 2 },
                  resources: [ content.iooAPuzzlenode, content.iooAPuzzlenodeDark ][puzzler.resmaps[room][position]],
                  objects: [
                     new CosmosHitbox({ anchor: { x: 0, y: 1 }, size: { x: 10, y: 9 }, metadata: { barrier: true } })
                  ]
               }).on('tick', async function () {
                  if (this.metadata.mode === 0) {
                     this.index > 0 && --this.index;
                     if (this.index === 0) {
                        this.alpha.value = 0;
                        holderObjects.splice(holderObjects.indexOf(this), 1);
                     }
                  } else {
                     this.index < 5 && ++this.index;
                     if (this.index === 5 && this.metadata.mode === 2) {
                        this.index = 6;
                     }
                  }
               })
            );
         }
      }

      if (absolute) {
         roomState.solved = true;
         const [ anim, box ] = instance('below', 'puzzledoor')!.object.objects as [CosmosAnimation, CosmosHitbox];
         if (restore) {
            anim.index = 4;
            box.metadata.barrier = false;
         } else {
            anim.enable();
            timer
               .when(() => anim.index === 4)
               .then(async () => {
                  anim.disable();
                  box.metadata.barrier = false;
                  assets.sounds.pathway.instance(timer);
                  shake(2, 500);
                  await timer.pause(650);
                  await timer.when(() => game.movement);
                  const puzzletarget = room === 'a_core_left1' ? 1 : 2;
                  if (save.data.n.state_aerialis_corepath_puzzle < puzzletarget) {
                     save.data.n.state_aerialis_corepath_puzzle = puzzletarget;
                  }
               });
         }
      }

      save.data.s[`state_aerialis_${room}`] = switches.length > 0 ? switches.join(',') : '';
   }
};

export const exteriors = {
   f_battle: { height: 0, x: 0 },
   f_exit: { height: 0, x: 1500 },
   a_start: { height: 0, x: 1820 },
   a_path1: { height: 0, x: 2680 },
   a_path2: { height: 0, x: 2820 },
   a_path3: { height: 0, x: 3020 },
   a_rg1: { height: 0, x: 4020 },
   a_path4: { height: 0, x: 4520 },
   a_barricade1: { height: 0, x: 4800 },
   a_puzzle1: { height: 0, x: 4800 },
   a_mettaton1: { height: 0, x: 5160 },
   a_elevator1: { height: 0, x: 6160 },
   a_elevator2: { height: 1, x: 6120 },
   a_sans: { height: 1, x: 5800 },
   a_pacing: { height: 1, x: 5040 },
   a_prepuzzle: { height: 1, x: 4040 },
   a_puzzle2: { height: 1, x: 3640 },
   a_mettaton2: { height: 1, x: 2900 },
   a_rg2: { height: 1, x: 2560 },
   a_barricade2: { height: 1, x: 2600 },
   a_split: { height: 1, x: 2540 },
   a_offshoot1: { height: 1, x: 2980 },
   a_elevator3: { height: 1, x: 2220 },
   a_lookout: { height: 2, x: 3690 }
} as Partial<CosmosKeyed<{ height: number; x: number }, AerialisRoomKey | 'f_battle' | 'f_exit'>>;

export const hex = {
   delay: { baseTile: 150, baseRate: 1000 },
   dtime: -Infinity,
   fader: 10,
   paths: [
      [ 0, 1, 2, 3, 4, { x: 0, y: -10 }, 9, 8, 7, { x: 20, y: 0 }, 0 ],
      [ 0, 11, 10, { x: 0, y: 10 }, 3, 4, 5, 6, 7, { x: 20, y: 0 }, 0 ],
      [ 5, 6, 8, 9, { x: 0, y: 10 }, 5, /**/ 10, 11, 1, 2, { x: 0, y: -10 }, 10 ]
   ],
   rand: null as CosmosValueRandom | null,
   sets: [
      [ 0, 1, 2, 3, 4, 7, 8, 9 ],
      [ 0, 3, 4, 5, 6, 7, 10, 11 ],
      [ 1, 2, 5, 6, 8, 9, 10, 11 ]
   ],
   tint: 0x232854,
   valid (hexfloor: CosmosPointSimple[], position: CosmosPointSimple) {
      for (const tile of hexfloor) {
         if (tile.x === position.x && (tile.y === position.y || tile.y === position.y - 10)) {
            return true;
         }
      }
      return false;
   }
};

export function rgHeaders (rg1: CosmosObject, rg2: CosmosObject) {
   let t = 0;
   const waver = function (this: CosmosObject) {
      this.scale.set(sineWaver(t, 1000, 0.9, 1.1), sineWaver(t, 1000, 1.1, 0.9));
   };
   return (h: string) => {
      switch (h) {
         case 'x1':
            t = timer.value;
            rg1.on('tick', waver);
            break;
         case 'x2':
            t = timer.value;
            rg2.on('tick', waver);
            break;
         case 'x3':
            rg1.off('tick', waver);
            rg2.off('tick', waver);
            rg1.scale.set(1);
            rg2.scale.set(1);
            break;
      }
   };
}

export function onionArm (x: number, scaleX: 1 | -1, frame: 'left' | 'out' | 'wave') {
   return new CosmosSprite({
      anchor: 1,
      metadata: { frame },
      scale: { x: scaleX },
      position: { x }
   }).on('tick', function () {
      switch (this.metadata.frame) {
         case 'left':
            this.frames[0] = content.ionAOnionsanArmLeft;
            break;
         case 'out':
            this.frames[0] = content.ionAOnionsanArmOut;
            break;
         case 'wave':
            this.frames[0] = content.ionAOnionsanArmWave;
            break;
      }
   });
}

export async function updateBadLizard () {
   if (trueLizard() < 1 && save.data.n.kills_aerialis + (save.data.n.state_aerialis_royalguards === 1 ? 1 : 0) > 2) {
      save.data.b.bad_lizard = true;
      await area.scripts.notifier!(
         (states.rooms[game.room] ??= {}),
         (states.scripts.notifier ??= {}),
         'alphysBadLizard'
      );
   }
}

export const friskJetpack = {
   down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskDownJetpack }),
   left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftJetpack }),
   right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskRightJetpack }),
   up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskUpJetpack })
};

export const friskJetpackOff = {
   down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskDownJetpackOff ] }),
   left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskLeftJetpackOff ] }),
   right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskRightJetpackOff ] }),
   up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskUpJetpackOff ] })
};

export const friskWaterJetpack = {
   down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskDownWaterJetpack }),
   left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftWaterJetpack }),
   right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskRightWaterJetpack }),
   up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskUpWaterJetpack })
};

export const friskWaterJetpackOff = {
   down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskDownWaterJetpackOff ] }),
   left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskLeftWaterJetpackOff ] }),
   right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskRightWaterJetpackOff ] }),
   up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskUpWaterJetpackOff ] })
};

export const mettaton1 = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonMicrophone }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonWave }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonLaugh }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonPoint })
};

export const mettaton2 = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonClap }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollRight }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonPointthree })
};

export const mettaton3 = {
   down: new CosmosAnimation(),
   left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocMettatonDotdotdot ] }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonConfused }),
   up: new CosmosAnimation()
};

export const rgdragon = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonRight }),
   up: new CosmosSprite()
};

export const rgrabbit = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitRight }),
   up: new CosmosSprite()
};

export const mettaton1C = { talk: mettaton1, walk: mettaton1 };
export const mettaton2C = { talk: mettaton2, walk: mettaton2 };
export const mettaton3C = { talk: mettaton3, walk: mettaton3 };

export const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export const puzzle1target = 7;
export const puzzle2target = new CosmosPointLinked({
   get x () {
      return save.data.n.plot < 58.1 ? 4 : save.data.n.plot < 58.2 ? 7 : 5;
   },
   set x (value) {},
   get y () {
      return save.data.n.plot < 58.1 ? 1 : save.data.n.plot < 58.2 ? -1 : -2;
   },
   set y (value) {}
});

export let flowersampler = [] as CosmosColor[][];
events.on('modded').then(async () => {
   await content.iooStarling.load();
   flowersampler = CosmosBitmap.texture2colors(content.iooStarling.value!);
});

export async function operaShow (lizard: CosmosCharacter) {
   const cam = new CosmosObject({ position: renderer.region[0] });
   game.camera = cam;
   const lowOver = new CosmosAnimation({ resources: content.iooAShowglow, blend: BLEND_MODES.MULTIPLY });
   renderer.attach('above', lowOver);
   if (trueLizard() < 2) {
      lizard.alpha.value = 1;
      lizard.position.set(20, 200);
      player.alpha.value = 1;
      await timer.pause(1900);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera13);
   } else if (trueLizard() === 2) {
      await timer.pause(850);
   } else {
      await timer.pause(850);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.operaX1());
      await timer.pause(450);
   }
   lowOver.index = 1;
   assets.sounds.noise.instance(timer);
   if (trueLizard() < 2) {
      await timer.pause(1650);
      timer.pause(850).then(async () => {
         lizard.face = 'down';
      });
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera14a);
      await timer.pause(650);
   } else {
      await timer.pause(1250);
   }
   await dialogue(
      'dialoguerTop',
      ...(world.genocide ? text.a_aerialis.story.operaX2() : text.a_aerialis.story.opera14b)
   );
   timer.pause(450).then(async () => {
      lizard.face = 'right';
   });
   world.genocide && (azzie.metadata.override = true);
   await Promise.all([
      trueLizard() > 1 ? player.walk(timer, 3, { x: world.genocide ? 247.5 : 240 }) : void 0,
      world.genocide ? azzie.walk(timer, 3, { x: 226.5 }) : void 0,
      cam.position.modulate(timer, 2000, { x: 240 }),
      world.genocide ? void 0 : dialogue('dialoguerTop', ...text.a_aerialis.story.opera14c)
   ]);
   const metta = new OutertaleMultivisualObject(
      { position: { x: 355, y: player.y } },
      { anchor: { x: 0, y: 1 }, tint: world.genocide ? 0x959595 : void 0 }
   );
   metta.use(content.iocMettatonDressIdle);
   renderer.attach('main', metta);
   await timer.pause(650);
   lowOver.index = 2;
   assets.sounds.noise.instance(timer);
   world.genocide && timer.pause(850).then(() => (azzie.face = 'down'));
   await timer.pause(1250);
   await dialogue('dialoguerTop', ...(world.genocide ? text.a_aerialis.story.operaX3 : text.a_aerialis.story.opera15));
   const operaMusic = (world.genocide ? assets.music.operaAlt : assets.music.opera).instance(timer);
   lowOver.alpha.modulate(timer, 1350, 0).then(() => {
      renderer.detach('above', lowOver);
   });
   metta.use(content.iocMettatonDressPull);
   await timer.pause(450);
   metta.animation.enable();
   await metta.position.step(timer, 1, player.position.add(40, 0));
   metta.animation.reset();
   metta.use(content.iocMettatonDressIdle);
   metta.animation.index = 0;
   await timer.pause(850);
   if (trueLizard() < 2) {
      await lizard.walk(timer, 3, { x: game.camera.x - 160 });
   } else {
      await timer.pause(450);
   }
   header('x1').then(() => (metta.animation.index = 6));
   header('x2').then(() => (metta.animation.index = 7));
   if (trueLizard() === 2) {
      await timer.pause(1850);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera16b);
   } else {
      await dialogue(
         'dialoguerTop',
         ...(world.genocide ? text.a_aerialis.story.operaX4() : text.a_aerialis.story.opera16)
      );
   }
   trueLizard() < 2 && lizard.walk(timer, 3, { x: game.camera.x - 180 });
   timer.pause(450).then(() => (metta.animation.index = 0));
   const operaText = new CosmosText({
      alpha: 0,
      position: { y: 60 },
      fill: '#fff',
      priority: -2,
      font: '32px DeterminationSans'
   }).on('tick', function () {
      this.x += 0.1;
   });
   let syl = 0;
   let syllables = [] as string[];
   function updateSyllables (value: CosmosProvider<string[]>) {
      operaText.content = '';
      syl = 0;
      syllables = CosmosUtils.provide(value);
      operaText.x = 40;
      operaText.alpha.modulate(timer, 500, 1);
   }
   async function showSyllable (value: string) {
      operaText.alpha.modulate(timer, 0, 1);
      let ch = 0;
      while (ch < value.length) {
         operaText.content += value[ch];
         await timer.pause(40);
         ch++;
      }
   }
   let seconds = 16;
   let romance = true;
   const sakuraPos = new CosmosPoint({ y: 0, x: -180 });
   const sakuraAngle = sakuraPos.angleTo({ x: 0, y: 240 });
   const sakuraRNG = random.clone();
   const sakuraGen = new CosmosObject({ position: sakuraPos, priority: -1 }).on('tick', function () {
      if (romance && sakuraRNG.next() < 0.4) {
         const sakuraLeaf = new CosmosSprite({
            anchor: 0,
            frames: [ world.genocide ? content.iooADeadLeaf : content.iooASakuraLeaf ],
            spin: 3,
            position: { x: CosmosMath.remap(sakuraRNG.next(), 0, sakuraPos.x * -1 + 320), y: -5 },
            velocity: new CosmosPoint().endpoint(sakuraAngle, CosmosMath.remap(sakuraRNG.next(), 2, 3)),
            tint: world.genocide ? 0x959595 : void 0
         }).on('tick', () => {
            if (sakuraLeaf.y > 245) {
               this.objects.splice(this.objects.indexOf(sakuraLeaf), 1);
            }
         });
         this.attach(sakuraLeaf);
      }
   });
   const pulley = new CosmosAnimation({
      active: true,
      resources: save.data.b.water ? content.iocAsrielEarTugWater : content.iocAsrielEarTug,
      position: azzie,
      anchor: { x: 0, y: 1 },
      tint: 0x959595
   });
   while (seconds <= 80) {
      await timer.when(() => seconds <= operaMusic.position);
      const trueSeconds = (seconds - 16) * 2;
      switch (trueSeconds % 16) {
         case 0:
            switch (Math.floor(trueSeconds / 16)) {
               case 0:
                  renderer.attach('menu', operaText);
                  updateSyllables(text.a_aerialis.story.opera17);
                  metta.animation.index = 0;
                  world.genocide && timer.pause(650).then(() => (player.face = 'down'));
                  metta.position.modulate(timer, 2000, player.position.add(40, 30));
                  break;
               case 1:
                  updateSyllables(text.a_aerialis.story.opera19);
                  metta.animation.index = 0;
                  metta.position.modulate(timer, 2000, player.position.add(40, -20));
                  break;
               case 2:
                  updateSyllables(text.a_aerialis.story.opera21);
                  metta.animation.index = 0;
                  metta.position.modulate(timer, 2500, player.position.add(-60, -30));
                  break;
               case 3:
                  updateSyllables(text.a_aerialis.story.opera23);
                  metta.animation.index = 0;
                  metta.position.modulate(timer, 2500, player.position.add(-60, 25));
                  break;
               case 4:
                  renderer.attach('menu', sakuraGen);
                  updateSyllables(text.a_aerialis.story.opera25);
                  metta.animation.index = world.genocide ? 10 : 0;
                  metta.position.modulate(timer, 3000, player.position.add(-50, 35));
                  trueLizard() === 2 ||
                     timer.pause(500).then(async () => {
                        if (trueLizard() < 2) {
                           dialogue('dialoguerBottom', ...text.a_aerialis.story.opera25a);
                        } else {
                           player.walk(timer, 0.25, { x: 240 });
                           await timer.pause(350);
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY1);
                           renderer.detach('main', player, azzie);
                           renderer.attach('main', pulley);
                           player.face = 'down';
                        }
                     });
                  break;
               case 5:
                  updateSyllables(text.a_aerialis.story.opera27);
                  metta.animation.index = world.genocide ? 3 : 6;
                  metta.position.modulate(timer, 1500, player.position.add(45, 30));
                  world.genocide &&
                     timer.pause(1000).then(async () => {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY2);
                     });
                  break;
               case 6:
                  updateSyllables(text.a_aerialis.story.opera29);
                  metta.animation.index = 8;
                  metta.position.modulate(timer, 2000, player.position.add(30, -20));
                  world.genocide &&
                     timer.pause(1000).then(async () => {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY3);
                        renderer.detach('main', pulley);
                        renderer.attach('main', player, azzie);
                        await azzie.walk(timer, 1, { x: player.x - 21 });
                        await timer.pause(1450);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY4);
                        azzie.face = 'down';
                     });
                  break;
               case 7:
                  updateSyllables(text.a_aerialis.story.opera31);
                  metta.position.modulate(timer, 2000, player.position.add(35, 0));
                  trueLizard() < 2 &&
                     timer.pause(1500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera31a);
                     });
                  break;
            }
            break;
         case 7:
            switch (Math.floor(trueSeconds / 16)) {
               case 0:
                  updateSyllables(text.a_aerialis.story.opera18);
                  metta.animation.index = world.genocide ? 3 : 10;
                  metta.position.modulate(timer, 3000, player.position.add(70, 0));
                  break;
               case 1:
                  updateSyllables(text.a_aerialis.story.opera20);
                  metta.animation.index = world.genocide ? 7 : 3;
                  metta.position.modulate(timer, 2500, player.position.add(20, -10));
                  trueLizard() < 2 &&
                     timer.pause(500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera20a);
                     });
                  break;
               case 2:
                  updateSyllables(text.a_aerialis.story.opera22);
                  metta.animation.index = world.genocide ? 6 : 10;
                  metta.position.modulate(timer, 3000, player.position.add(-80, 25));
                  break;
               case 3:
                  updateSyllables(text.a_aerialis.story.opera24);
                  metta.animation.index = world.genocide ? 6 : 2;
                  metta.position.modulate(timer, 3500, player.position.add(-40, 15));
                  break;
               case 4:
                  updateSyllables(text.a_aerialis.story.opera26);
                  metta.animation.index = 10;
                  metta.position.modulate(timer, 3000, player.position.add(20, 35));
                  break;
               case 5:
                  updateSyllables(text.a_aerialis.story.opera28);
                  metta.animation.index = world.genocide ? 2 : 7;
                  metta.position.modulate(timer, 3500, player.position.add(70, -20));
                  trueLizard() < 2 &&
                     timer.pause(3500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera28a);
                     });
                  break;
               case 6:
                  updateSyllables(text.a_aerialis.story.opera30);
                  metta.animation.index = 9;
                  metta.position.modulate(timer, 2000, player.position.add(50, 0));
                  break;
               case 7:
                  updateSyllables(text.a_aerialis.story.opera32);
                  metta.animation.index = 1;
                  break;
            }
            break;
         case 5:
         case 14:
            operaText.alpha.modulate(timer, 1000, 0);
            break;
      }
      syl < syllables.length && showSyllable(syllables[syl++]);
      seconds += 0.5;
   }
   romance = false;
   await timer.pause(3000);
   renderer.detach('menu', operaText);
   if (world.genocide) {
      metta.animation.index = 0;
      header('x1').then(() => (metta.animation.index = 7));
      header('x2').then(() => (metta.animation.index = 6));
   }
   if (world.genocide) {
      metta.animation.index = 0;
      await metta.position.step(timer, 1, metta.position.add(10, 0));
   }
   await dialogue(
      'dialoguerTop',
      ...(world.genocide ? text.a_aerialis.story.operaX5() : text.a_aerialis.story.opera33)
   );
   if (trueLizard() < 2) {
      lizard.walk(timer, 3, { x: game.camera.x - 140 });
      header('x1').then(() => (metta.animation.index = 5));
      header('x2').then(() => (metta.animation.index = 4));
   }
   if (world.genocide) {
      renderer.detach('main', metta);
      assets.sounds.noise.instance(timer);
      temporary(
         new CosmosHitbox({
            position: { x: 285, y: 180 },
            tint: 0x959595,
            anchor: { x: 0, y: 1 },
            size: { x: 57, y: 6 },
            metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'deadbot' ] },
            objects: [
               new CosmosAnimation({ resources: content.iocMettatonDressIdle, index: 12, anchor: { x: 0, y: 1 } })
            ]
         }),
         'main'
      );
      await timer.pause(1950);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.operaX7);
      azzie.metadata.override = false;
      azzie.metadata.reposition = true;
      azzie.metadata.repositionFace = 'right';
      while (world.population > 0) {
         world.bully();
      }
   } else {
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera34());
      const fd = fader({ fill: '#fff' });
      assets.sounds.boom.instance(timer);
      await fd.alpha.modulate(timer, 150, 1);
      await timer.pause(1000);
      fd.fill = '#000';
      await battler.encounter(player, groups.glyde, false);
      metta.use(content.iocMettatonMicrophone);
      renderer.detach('menu', fd);
      await timer.pause(2000);
      let escaped = false;
      const headerListener = (h: string) => {
         switch (h) {
            case 'x0':
               speech.targets.add(metta.animation);
               metta.use(content.iocMettatonShrug);
               break;
            case 'x1':
               metta.use(content.iocMettatonDotdotdot);
               break;
            case 'x2':
               metta.use(content.iocMettatonLaugh);
               break;
            case 'x3':
               metta.use(content.iocMettatonPoint);
               break;
            case 'x4':
               speech.targets.delete(metta.animation);
               metta.use(content.iocMettatonRollRight);
               metta.animation.enable();
               const baseX = game.camera.position.clamp(...renderer.region).x;
               if (save.data.b.a_state_hapstablook) {
                  metta.position.step_legacy(timer, 6, { x: baseX + 135 }).then(async () => {
                     metta.animation.reset();
                     assets.sounds.notify.instance(timer);
                     await notifier(new CosmosEntity({ position: metta }), 650, metta.sprite.compute().y);
                     metta.metadata.sus = true;
                  });
               } else {
                  metta.position.step_legacy(timer, 6, { x: baseX + 195 }).then(() => {
                     renderer.detach('main', metta);
                     escaped = true;
                  });
               }
               break;
            case 'x5':
               lizard.face = 'up';
               break;
            case 'x6':
               lizard.face = 'down';
               break;
         }
      };
      typer.on('header', headerListener);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera35());
      let finalghost: CosmosCharacter;
      if (save.data.b.a_state_hapstablook) {
         typer.off('header', headerListener);
         const azzets = new CosmosInventory(
            inventories.iocNapstablook,
            inventories.iocNapstablookAlter,
            content.avNapstablook,
            content.ionODummy,
            content.ionODummyMad,
            content.ionODummyGlad,
            content.ionODummyRage,
            content.ionODummyBlush,
            save.data.b.oops ? content.amLab : content.amCharacutscene,
            content.iocMettatonSeriouspose
         );
         const prom = azzets.load();
         await timer.when(() => metta.metadata.sus);
         await Promise.all([ prom, timer.pause(850) ]);
         metta.use(content.iocMettatonSeriouspose);
         speech.emoters.mettaton = metta.animation;
         metta.animation.index = 0;
         const napsta = character('napstablook', characters.napstablook, { x: 440, y: 180 }, 'left');
         await cam.position.modulate(timer, 800, { x: 320 });
         await timer.pause(1000);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta36);
         await timer.pause(650);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta37);
         await timer.pause(1000);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta38);
         await timer.pause(850);
         napsta.face = 'left';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta39);
         await timer.pause(1250);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta40);
         await timer.pause(450);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta41);
         await timer.pause(650);
         metta.position.modulate(timer, 1000, { x: metta.x - 30 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta42);
         finalghost = character('finalghost', characters.finalghost, { x: 470, y: 205 }, 'left', {
            alpha: 0
         });
         finalghost.alpha.modulate(timer, 300, 1).then(() => finalghost.walk(timer, 3, { x: 410 }));
         await timer.pause(450);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta43);
         napsta.face = 'left';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta44);
         await timer.pause(850);
         lizard.walk(timer, 3, { x: 185 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta45);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta46);
         lizard.face = 'up';
         const time = timer.value;
         const dummy = new CosmosAnimation({
            index: 0,
            anchor: { x: 0, y: 1 },
            resources: content.ionODummyMad,
            position: { x: 150, y: 155 },
            scale: { x: -1 },
            offsets: [ 0 ]
         }).on('tick', () => {
            dummy.offsets[0].y = CosmosMath.wave(((timer.value - time) % 4000) / 4000) * -2;
         });
         renderer.attach('main', dummy);
         dummy.position.step(timer, 2, dummy.position.add(60, 0));
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta47);
         lizard.face = 'down';
         await timer.pause(850);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta48);
         await timer.pause(1250);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta49a);
         await Promise.all([
            metta.position.step(timer, 1, metta.position.subtract(50, 0)),
            dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta49b)
         ]);
         napsta.walk(timer, 2, { x: napsta.x - 40 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta50);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta51a);
         lizard.face = 'right';
         metta.position.step(timer, 1, metta.position.add(0, 30));
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta51b);
         await timer.pause(850);
         napsta.walk(timer, 2, { x: metta.x + 50 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta52);
         dummy.use(content.ionODummy);
         await timer.pause(650);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta53);
         await timer.pause(850);
         napsta.face = 'left';
         finalghost.walk(timer, 2, { x: 380 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta54);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta55a);
         finalghost.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta55b);
         await timer.pause(850);
         napsta.face = 'right';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta56);
         await timer.pause(450);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta57a);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta57b);
         await timer.pause(650);
         finalghost.walk(timer, 1, { x: 360 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta58);
         napsta.face = 'left';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta59);
         await timer.pause(850);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta60);
         dummy.position.step(timer, 2, { y: (player.y + lizard.y) / 2 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta61);
         finalghost.face = 'down';
         await timer.pause(1250);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta62);
         await timer.pause(2250);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta63);
         dummy.use(content.ionODummyBlush);
         await timer.pause(1250);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta64);
         finalghost.face = 'up';
         await timer.pause(850);
         timer.pause(650).then(() => (finalghost.face = 'left'));
         await Promise.all([
            napsta.walk(timer, 1, { x: napsta.x + 40 }),
            dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65a)
         ]);
         napsta.face = 'up';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65b);
         napsta.walk(timer, 1, { x: napsta.x - 40 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65c);
         await timer.pause(1250);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta66a);
         dummy.use(content.ionODummy);
         dummy.scale.x = 1;
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta66b);
         await timer.pause(650);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta67);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68a);
         napsta.face = 'left';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68b);
         dummy.scale.x = -1;
         dummy.use(content.ionODummyMad);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68c);
         metta.position.step(timer, 3, { y: 160 }).then(async () => {
            await metta.position.step(timer, 3, { x: 470 });
            await metta.alpha.modulate(timer, 300, 0);
            renderer.detach('main', metta);
         });
         await timer.pause(650);
         dummy.position.step(timer, 2, { x: finalghost.x - 50 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta69);
         await timer.pause(1650);
         finalghost.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta70);
         await timer.pause(650);
         napsta.walk(timer, 1, { x: 320 });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta71);
         await timer.pause(650);
         dummy.scale.x = 1;
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta72);
         dummy.position.step(timer, 3, { x: 150 }).then(async () => {
            await dummy.alpha.modulate(timer, 300, 0);
            renderer.detach('main', dummy);
         });
         await timer.pause(350);
         finalghost.face = 'left';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta73);
         finalghost.face = 'down';
         await timer.pause(650);
         finalghost.walk(timer, 3, { x: 470 }).then(async () => {
            await finalghost.alpha.modulate(timer, 300, 0);
            renderer.detach('main', finalghost);
         });
         await timer.pause(850);
         napsta.walk(timer, 2, { y: lizard.y });
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta74);
         if (save.data.b.oops) {
            lizard.walk(timer, 3, { x: napsta.x - 30 });
            await timer.pause(350);
         } else {
            await timer.pause(850);
         }
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta75());
         await timer.pause(850);
         napsta.face = 'left';
         save.data.b.oops || (await napsta.walk(timer, 3, { x: lizard.x + 30 }));
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta76);
         await timer.pause(850);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta77);
         await napsta.walk(timer, 3, { x: 460 }).then(async () => {
            await napsta.alpha.modulate(timer, 300, 0);
            renderer.detach('main', napsta);
         });
         cam.position.modulate(timer, 1600, { x: player.x });
         typer.on('header', headerListener);
      } else {
         finalghost = new CosmosCharacter({ preset: characters.none, key: 'sus' });
      }
      if (trueLizard() < 2) {
         await timer.pause(1450);
         await lizard.walk(timer, 3, { x: player.x });
         if (trueLizard() < 1) {
            await lizard.walk(timer, 3, { y: player.y + 25 });
            lizard.face = 'up';
            typer.off('header', headerListener);
         } else {
            await timer.pause(1000);
         }
         await dialogue('dialoguerTop', ...text.a_aerialis.story.opera36());
      } else {
         await timer.when(() => escaped);
      }
      typer.off('header', headerListener);
      if (trueLizard() < 2) {
         if (trueLizard() === 1) {
            await timer.pause(450);
            lizard.face = 'left';
            await timer.pause(750);
         } else {
            lizard.face = 'left';
         }
         if (trueLizard() < 1) {
            await lizard.walk(timer, 3, { x: game.camera.position.clamp(...renderer.region).x - 140 });
            await timer.pause(450);
            lizard.face = 'right';
            await timer.pause(750);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.opera37);
            await timer.pause(1150);
            if (!save.data.b.oops) {
               await dialogue('dialoguerTop', ...text.a_aerialis.story.opera38);
            }
         }
      }
   }
   game.movement = true;
   game.music = null;
   save.data.n.plot = 65;
   game.camera = player;
   resume({ gain: world.level, rate: world.ambiance, fade: false });
}

export function rampup () {
   for (const RAMpup of instances('below', 'rampup')) {
      for (const obbie of RAMpup.object.objects) {
         if (obbie instanceof CosmosAnimation) {
            obbie.reverse = true;
         }
      }
   }
}

export async function elevate (long = false) {
   assets.sounds.bell.instance(timer);
   const blockbox = new CosmosHitbox({ metadata: { barrier: true }, size: { x: 40, y: 20 } });
   const blocker = new CosmosObject({
      fill: 'black',
      position: { x: 140, y: 220 },
      priority: 1000,
      objects: [
         new CosmosRectangle({ alpha: 0, size: { x: 40, y: 20 } }),
         new CosmosRectangle({ size: { y: 20 } }),
         new CosmosRectangle({ anchor: { x: 1 }, position: { x: 40 }, size: { y: 20 } }),
         blockbox
      ]
   });
   renderer.attach('main', blocker);
   await Promise.all([
      blocker.objects[0].alpha.modulate(timer, 400, 1),
      (blocker.objects[1] as CosmosRectangle).size.modulate(timer, 400, { x: 20 }),
      (blocker.objects[2] as CosmosRectangle).size.modulate(timer, 400, { x: 20 })
   ]);
   assets.sounds.pathway.instance(timer);
   shake(1, 300);
   await timer.pause(400);
   long ? assets.sounds.long_elevator.instance(timer) : assets.sounds.elevator.instance(timer);
   await renderer.shake.modulate(timer, long ? 600 : 300, 0.5);
   await renderer.shake.modulate(timer, long ? 16400 : 2400, 1.5);
   await renderer.shake.modulate(timer, long ? 1600 : 800, renderer.shake.value, 0);
   await timer.pause(400);
   assets.sounds.bell.instance(timer);
   await Promise.all([
      blocker.objects[0].alpha.modulate(timer, 400, 0),
      (blocker.objects[1] as CosmosRectangle).size.modulate(timer, 400, { x: 0 }),
      (blocker.objects[2] as CosmosRectangle).size.modulate(timer, 400, { x: 0 })
   ]);
   renderer.detach('main', blocker);
   assets.sounds.pathway.instance(timer);
   blockbox.metadata.barrier = false;
   shake(1, 300);
   if (long) {
      save.data.b.long_elevator = true;
   }
}

export function lizard (
   pos: CosmosPointSimple,
   face: CosmosDirection,
   { barrier = true, interact = true, script = 'lablizard', args = [] as string[] } = {}
) {
   return temporary(
      character('alphys', characters.alphys, pos, face, {
         metadata: { barrier, interact, name: 'aerialis', args: [ script, ...args ] },
         size: { x: 18, y: 20 },
         anchor: { x: 0, y: 1 }
      }),
      'main'
   );
}

export function calcBadLizard () {
   if (world.genocide) {
      return 3;
   } else {
      let score = 0;
      const aKills = save.data.n.kills_starton + save.data.n.kills_foundry;
      if (aKills > 24) {
         score += 1;
      } else if (aKills > 19) {
         score += 0.9;
      } else if (aKills > 14) {
         score += 0.7;
      } else if (aKills > 9) {
         score += 0.4;
      } else if (aKills > 4) {
         score += 0.2;
      }
      if (save.data.n.state_foundry_undyne === 2) {
         score += 0.8;
      } else if (save.data.n.state_foundry_undyne === 1) {
         score += 0.6;
      }
      if (save.data.n.state_starton_papyrus === 1) {
         score += 0.5;
      }
      if (save.data.n.state_starton_doggo === 2) {
         score += 0.2;
      }
      if (save.data.n.state_starton_dogs === 2) {
         score += 0.25;
      }
      if (save.data.n.state_starton_lesserdog === 2) {
         score += 0.2;
      }
      if (save.data.n.state_starton_greatdog === 2) {
         score += 0.2;
      }
      if (save.data.n.state_foundry_doge === 1) {
         score += 0.1;
      }
      if (save.data.n.state_foundry_muffet === 1) {
         score += 0.1;
      }
      if (save.data.b.killed_shyren) {
         score += 0.1;
      }
      if (score < 0.5) {
         return 0;
      } else if (score < 1.25) {
         return 1;
      } else {
         return 2;
      }
   }
}

export function partyShift ({ x = 0, y = 0 }) {
   player.x += x;
   player.y += y;
   azzie.x += x;
   azzie.y += y;
   for (const { position } of azzie.metadata.queue || []) {
      position.x += x;
      position.y += y;
   }
}

export async function barricadeFail1 () {
   Promise.race([ timer.pause(20e3), timer.when(() => game.room === 'a_path3') ]).then(async () => {
      save.data.n.plot = 54;
      await timer.when(() => game.movement && !battler.active && game.room !== '_void');
      assets.sounds.phone.instance(timer);
      await dialogue(
         'auto',
         ...text.a_aerialis.story.barricadeFail2,
         ...(game.room === 'a_barricade1' ? [] : text.a_aerialis.story.barricadeFail2x),
         ...text.a_aerialis.story.barricadeFail3
      );
   });
}

export const spire = new CosmosSprite({
   anchor: { y: 0 },
   frames: [ content.iooAPrimespire ],
   priority: -99999,
   metadata: { min: -Infinity, max: Infinity },
   parallax: 1,
   tint: 0x5f5f5f
}).on('tick', function () {
   const exterior = exteriors[game.room as AerialisRoomKey];
   if (exterior) {
      const gc = game.camera.position.clamp(...renderer.region);
      gc.x = Math.min(Math.max(gc.x, this.metadata.min), this.metadata.max);
      this.alpha.value = game.room === 'f_battle' ? 0.2 : game.room === 'f_exit' ? 0.3 : 0.4;
      this.scale.set(1 / renderer.zoom.value);
      this.position.set(
         this.scale.multiply(CosmosMath.remap(exterior.x + gc.x, 0, -80, 0, 6400) - 160, [ -60, 0, 60 ][exterior.height])
      );
   } else {
      renderer.detach('below', this);
   }
});

export const area = {
   tick () {},
   scripts: {
      async riverboi () {
         if (!game.movement || player.face !== 'left') {
            return;
         }
         const inst = instance('below', 'riverboi_x')!;
         game.movement = false;
         await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.riverboi1());
         const targie = [ 'w_wonder', 's_taxi', 'f_taxi', 'a_lookout' ][choicer.result];
         if (game.room !== targie) {
            const origin = inst.object.position.value();
            let vert = 1;
            const instRealY = renderer.projection(inst.object).y;
            const filter1 = new MotionBlurFilter([ 0, 0 ], 7, 0);
            const filter2 = new AdvancedBloomFilter({
               threshold: 0,
               bloomScale: 0,
               quality: 5
            });
            const shaker = new CosmosValue();
            const taxitop = inst.object.metadata.taxitop as CosmosSprite;
            const tickie1 = () => {
               const oY = shaker.value * vert;
               inst.object.objects[0].offsets[0].y = oY;
               taxitop.offsets[0].y = oY;
               player.sprite.offsets[0].y = oY;
               vert *= -1;
               filter1.velocity.y = shaker.value * 4;
               const scalar = Math.min(Math.max(filter1.velocity.y / 40, 0), 1);
               filter2.bloomScale = scalar * 4;
            };
            await renderer.on('tick');
            renderer.detach('main', player);
            player.position.set(player.position.subtract(inst.object));
            inst.object.attach(player);
            inst.object.filters = [ filter1, filter2 ];
            inst.object.on('tick', tickie1);
            renderer.detach('main', taxitop);
            renderer.attach('below', taxitop);
            taxitop.priority.value = -1;
            shaker.modulate(timer, 3000, 0, 2, 10);
            await timer.pause(2700);
            const fd = fader({ fill: 'white' });
            await fd.alpha.modulate(timer, 300, 1);
            inst.object.off('tick', tickie1);
            renderer.detach('below', taxitop);
            inst.object.filters = null;
            inst.object.objects[0].offsets[0].y = 0;
            taxitop.offsets[0].y = 0;
            player.sprite.offsets[0].y = 0;
            await teleport('_taxi', player.face, player.x, player.y, { fade: false, fast: true });
            const basefd = fader({ alpha: 1 }, 'base');
            const shadbox = temporary(new CosmosObject({ priority: -7000 }), 'below');
            const basefaze = new CosmosValue();
            const basestar1 = new CosmosSprite({
               frames: content.backdrop.value,
               priority: -40000,
               area: renderer.area,
               filters: [
                  new MotionBlurFilter([ 10, 0 ], 7, 0),
                  new AdvancedBloomFilter({ threshold: 0, bloomScale: 5, quality: 5 })
               ]
            }).on('tick', function () {
               this.index = (renderer.layers.base.objects[3] as CosmosSprite).index;
               this.x = basefaze.value - 320;
            });
            const basestar2 = new CosmosSprite({
               frames: content.backdrop.value,
               priority: -40000,
               area: renderer.area,
               filters: [
                  new MotionBlurFilter([ 10, 0 ], 7, 0),
                  new AdvancedBloomFilter({ threshold: 0, bloomScale: 5, quality: 5 })
               ]
            }).on('tick', function () {
               this.index = (renderer.layers.base.objects[3] as CosmosSprite).index;
               this.x = basefaze.value;
            });
            renderer.attach('below', basestar1, basestar2, inst.object);
            renderer.attach('main', taxitop);
            inst.object.position.set(160, instRealY);
            taxitop.position.set(160, instRealY);
            const mr = 10;
            const time = timer.value;
            const tickie2 = () => {
               inst.object.y = sineWaver(time, 1000, instRealY, instRealY + 10);
               quickshadow(inst.object.objects[0] as CosmosSprite, inst.object, shadbox, void 0, 1.1, 0.05).velocity.x =
                  mr;
               quickshadow(player.sprite, inst.object.position.add(player), shadbox, void 0, 1.1, 0.05).velocity.x = mr;
               quickshadow(taxitop, inst.object, shadbox, void 0, 1.1, 0.05).velocity.x = mr;
               basefaze.value += mr;
               if (320 <= basefaze.value) {
                  basefaze.value = 0;
               }
            };
            inst.object.on('tick', tickie2);
            await timer.pause(500);
            await fd.alpha.modulate(timer, 300, 0);
            await timer.pause(2500);
            await dialogue('auto', ...text.a_aerialis.riverboi3());
            await timer.pause(2500);
            await fd.alpha.modulate(timer, 500, 1);
            inst.object.detach(player);
            inst.object.off('tick', tickie2);
            renderer.detach('below', basestar1, basestar2, inst.object);
            inst.object.position.set(origin);
            renderer.detach('main', taxitop);
            renderer.detach('base', basefd);
            teleport(targie, player.face, player.x, player.y, { fade: false, fast: true });
            await events.on('teleport-update');
            switch (game.room) {
               case 'w_wonder':
                  instance('main', 'w_goner')?.destroy();
                  break;
               case 'a_lookout':
                  instance('main', 'warpmarker')?.destroy();
                  break;
            }
            await events.on('teleport', 9999999);
            const finalinst = instance('below', 'riverboi_x')!;
            const finaltaxitop = finalinst.object.metadata.taxitop;
            renderer.detach('main', finaltaxitop);
            renderer.attach('below', finaltaxitop);
            finaltaxitop.priority.value = -1;
            const tickie3 = () => {
               const oY = shaker.value * vert;
               finalinst.object.objects[0].offsets[0].y = oY;
               finaltaxitop.offsets[0].y = oY;
               player.sprite.offsets[0].y = oY;
               vert *= -1;
               filter1.velocity.y = shaker.value * 4;
               const scalar = Math.min(Math.max(filter1.velocity.y / 40, 0), 1);
               filter2.bloomScale = scalar * 4;
            };
            renderer.attach('below', player);
            player.priority.value = finalinst.object.priority.value + 1;
            player.position.set(player.position.add(finalinst.object));
            finalinst.object.filters = [ filter1, filter2 ];
            finalinst.object.on('tick', tickie3);
            fd.alpha.modulate(timer, 300, 0).then(() => {
               renderer.detach('menu', fd);
            });
            await shaker.modulate(timer, 1500, 2, 0, 0);
            finalinst.object.off('tick', tickie3);
            finalinst.object.filters = null;
            finalinst.object.objects[0].offsets[0].y = 0;
            finaltaxitop.offsets[0].y = 0;
            player.sprite.offsets[0].y = 0;
            renderer.detach('below', player, finaltaxitop);
            renderer.attach('main', player, finaltaxitop);
            player.priority.value = 0;
            finaltaxitop.priority.value = 0;
         }
         game.movement = true;
      },
      async taxicouch () {
         await dialogue('auto', ...text.a_aerialis.riverboi2);
      },
      async mtttrivia (roomState: RoomStates['a_mettaton1'], scriptState, key) {
         await trivia(
            ...text.a_aerialis.trivia[key as keyof typeof text.a_aerialis.trivia & `lab${string}`](
               save.data.n.plot === 55.1 && !roomState.danger && !scriptState[key] && !world.genocide
            )
         );
         scriptState[key] = true;
      },
      async moonpie () {
         if (!game.movement) {
            return;
         }
         if (save.storage.inventory.size < 8) {
            assets.sounds.equip.instance(timer);
            save.storage.inventory.add('moon_pie');
            save.data.b.item_moonpie = true;
            instance('main', 'moonpie')?.destroy();
            await dialogue('auto', ...text.a_aerialis.moonpie1());
         } else {
            await dialogue('auto', ...text.a_aerialis.moonpie2);
         }
      },
      async bedsleeper () {
         if (game.movement) {
            game.movement = false;
            const fd = fader();
            const bedcover = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iooARoombedCover ],
               position: instance('main', 'roombed')!.object,
               priority: 10000,
               tint: world.genocide ? 0x999999 : 0xffffff
            });
            renderer.attach('main', bedcover);
            player.priority.value = 183;
            azzie.priority.value = 183;
            await player.position.modulate(timer, 1450, { x: bedcover.x, y: player.y });
            await fd.alpha.modulate(timer, 1850, 1);
            player.priority.value = 0;
            azzie.priority.value = 0;
            renderer.detach('main', bedcover);
            save.data.n.hp = Math.max(save.data.n.hp, Math.min(calcHP() + 10, 99));
            player.position.set(player.face === 'left' ? 207 : 133, 165);
            player.face = 'down';
            world.azzie && (azzie.metadata.reposition = true);
            await timer.pause(1850);
            game.movement = true;
            await fd.alpha.modulate(timer, 300, 0);
            renderer.detach('menu', fd);
         }
      },
      async tvm_radio () {
         if (save.storage.inventory.size < 8) {
            save.data.b.item_tvm_radio = true;
            instance('main', 'tvm_radio')?.destroy();
            assets.sounds.equip.instance(timer);
            save.storage.inventory.add('tvm_radio');
            await instance('main', 'ringerNPC')?.talk('a', talkFilter(), 'auto', ...text.a_aerialis.tvm1);
         } else {
            await dialogue('auto', ...text.a_aerialis.tvm3);
         }
      },
      async tvm_fireworks () {
         if (save.storage.inventory.size < 8) {
            save.data.b.item_tvm_fireworks = true;
            instance('main', 'tvm_fireworks')?.destroy();
            assets.sounds.equip.instance(timer);
            save.storage.inventory.add('tvm_fireworks');
            await instance('main', 'ringerNPC')?.talk('a', talkFilter(), 'auto', ...text.a_aerialis.tvm2);
         } else {
            await dialogue('auto', ...text.a_aerialis.tvm3);
         }
      },
      async ringer () {
         const npc = instance('main', 'ringerNPC');
         if (save.data.b.a_state_moneyitemC && !save.data.b.item_tvm_mewmew && !save.data.b.a_state_m3) {
            if (npc) {
               save.data.b.a_state_m3 = true;
               save.data.n.g += 999;
               await npc?.talk('a', talkFilter(), 'auto', ...text.a_aerialis.tvm6());
            } else {
               await dialogue('auto', ...text.a_aerialis.tvm7);
            }
         } else if (npc) {
            if (
               (save.data.b.a_state_moneyitemA && !save.data.b.item_tvm_radio) ||
               (save.data.b.a_state_moneyitemB && !save.data.b.item_tvm_fireworks)
            ) {
               await npc?.talk('a', talkFilter(), 'auto', ...text.a_aerialis.tvm4());
            } else {
               await npc?.talk('a', talkFilter(), 'auto', ...text.a_aerialis.tvm5());
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.gonezo());
         }
      },
      async spidershop () {
         if (world.genocide) {
            await dialogue('auto', ...text.a_aerialis.gonezo());
         } else {
            await dialogue('auto', ...text.a_aerialis.spidershop1);
            if (choicer.result === 0) {
               if (save.data.n.g < 40) {
                  await dialogue('auto', ...text.a_aerialis.spidershop4);
               } else if (save.storage.inventory.size < 8) {
                  save.data.n.g -= 40;
                  save.storage.inventory.add('super_pop');
                  instance('main', 'spidershop')?.destroy();
                  await dialogue('auto', ...text.a_aerialis.spidershop2);
               } else {
                  await dialogue('auto', ...text.a_aerialis.spidershop3);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.spidershop5);
            }
         }
      },
      async hotelfood () {
         await dialogue('auto', ...text.a_aerialis.hotelfood0);
         if (choicer.result === 0) {
            if (save.storage.inventory.size < 8) {
               save.data.b.item_mystery_food = true;
               save.storage.inventory.add('mystery_food');
               assets.sounds.equip.instance(timer);
               instance('main', 'hotelfood')?.destroy();
               await dialogue('auto', ...text.a_aerialis.hotelfood1);
            } else {
               await dialogue('auto', ...text.a_aerialis.hotelfood2);
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.hotelfood3);
         }
      },
      async sonic () {
         if (!save.data.b.item_sonic) {
            if (save.storage.inventory.size < 8) {
               save.data.b.item_sonic = true;
               save.storage.inventory.add('sonic');
               assets.sounds.equip.instance(timer);
               instance('below', 'sonic')?.destroy();
               await dialogue('auto', ...text.a_aerialis.sonic1);
            } else {
               await dialogue('auto', ...text.a_aerialis.sonic2);
            }
         }
      },
      async tablaphone () {
         if (!save.data.b.item_tablaphone) {
            if (save.storage.inventory.size < 8) {
               save.data.b.item_tablaphone = true;
               save.storage.inventory.add('tablaphone');
               assets.sounds.equip.instance(timer);
               instance('below', 'tablaphone')?.destroy();
               await dialogue('auto', ...text.a_aerialis.tablaphone1);
            } else {
               await dialogue('auto', ...text.a_aerialis.tablaphone2);
            }
         }
      },
      async exofountain () {
         await dialogue('auto', ...text.a_aerialis.overworld.exofountain1);
         if (choicer.result === 0) {
            heal();
            await dialogue('auto', ...text.a_aerialis.overworld.exofountain2b());
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.exofountain2a);
         }
      },
      async phonegrabber () {
         await dialogue('auto', ...text.a_aerialis.story.phonegrabber1());
         world.genocide && (save.flag.b.asriel_phone = true);
         save.data.b.a_state_gotphone = true;
         instance('main', 'compactlazerdeluxe')?.destroy();
         assets.sounds.equip.instance(timer);
         await dialogue('auto', ...text.a_aerialis.story.phonegrabber2);
         if (world.genocide) {
            await dialogue('auto', ...text.a_aerialis.story.phonegrabber3());
         }
      },
      async npc (roomState, scriptState, key) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', key);
         if (inst) {
            const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            key === 'f_clamguy' && anim.use(content.ionAClamguyFront);
            await inst.talk(
               'a',
               talkFilter(),
               'auto',
               ...CosmosUtils.provide(text.a_aerialis.npc[key as keyof typeof text.a_aerialis.npc])
            );
            key === 'f_clamguy' && anim.use(content.ionAClamguyBack);
         }
      },
      async sosorry () {
         const sosorry = instance('main', 'sosorry')!.object.objects[0] as CosmosAnimation;
         speech.targets.add(sosorry);
         await dialogue('dialoguerBottom', ...text.a_aerialis.story.sosorry);
         speech.targets.delete(sosorry);
      },
      async topdesk () {
         if (
            !(
               save.data.n.plot > 48 &&
               (save.data.n.plot < 60 || (save.data.n.plot > 64.1 && save.data.n.plot < 68)) &&
               trueLizard() < 2
            )
         ) {
            const inst = instance('below', 'labdesk')!;
            const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            await dialogue('auto', ...text.a_aerialis.overworld.topdesk1);
            if (choicer.result === 0) {
               anim.index = 1;
               assets.sounds.select.instance(timer).rate.value = 0.6;
               await dialogue('auto', ...text.a_aerialis.overworld.topdesk3);
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.topdesk2);
            }
            anim.index = 0;
         }
      },
      elevator (roomState: RoomStates['a_lift']) {
         switch (roomState.location) {
            case 'a_start':
               teleport('a_start', 'down', 900, 250, world);
               break;
            case 'a_elevator1':
               teleport('a_elevator1', 'down', 200, 150, world);
               break;
            case 'a_elevator2':
               teleport('a_elevator2', 'down', 240, 150, world);
               break;
            case 'a_elevator3':
               teleport('a_elevator3', 'down', 160, 150, world);
               break;
            case 'a_elevator4':
               teleport('a_elevator4', 'down', 70, 110, world);
               break;
            case 'a_elevator5':
               teleport('a_elevator5', 'down', 290, 110, world);
               break;
            case 'a_hub5':
               teleport('a_hub5', 'down', 100, 170, world);
               break;
            case 'a_core_entry1':
               teleport('a_core_entry1', 'down', 60, 530, world);
               break;
            case 'a_core_exit2':
               teleport('a_core_exit2', 'down', 580, 90, world);
               break;
            case 'c_start':
               teleport('c_start', 'down', 110, 150, world);
               break;
         }
      },
      async lift (roomState: RoomStates['a_lift']) {
         if (!roomState.elevating && game.movement) {
            game.movement = false;
            const prev = roomState.location;
            let citadelevator = false;
            if (save.data.n.plot < 68.1) {
               switch (roomState.location) {
                  case 'a_hub5':
                     citadelevator = true;
                     await dialogue('auto', ...text.a_aerialis.elevatorStory1);
                     roomState.location = [ 'a_core_entry1', 'a_hub5' ][
                        choicer.result
                     ] as RoomStates['a_lift']['location'];
                     break;
                  case 'a_core_entry1':
                     citadelevator = true;
                     await dialogue('auto', ...text.a_aerialis.elevatorStory2);
                     roomState.location = [ 'a_hub5', 'a_core_entry1' ][
                        choicer.result
                     ] as RoomStates['a_lift']['location'];
                     break;
               }
            }
            if (!citadelevator) {
               if (save.data.n.plot < 65) {
                  switch (roomState.location) {
                     case 'a_elevator1':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory1());
                        roomState.location = (
                           save.data.n.plot < 64
                              ? [ 'a_elevator2', 'a_elevator1' ]
                              : [ 'a_elevator2', 'a_elevator3', 'a_elevator4', 'a_elevator1' ]
                        )[choicer.result] as RoomStates['a_lift']['location'];
                        break;
                     case 'a_elevator2':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory2());
                        roomState.location = (
                           save.data.n.plot < 64
                              ? [ 'a_elevator1', 'a_elevator2' ]
                              : [ 'a_elevator1', 'a_elevator3', 'a_elevator4', 'a_elevator2' ]
                        )[choicer.result] as RoomStates['a_lift']['location'];
                        break;
                     case 'a_elevator3':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory3);
                        roomState.location = [ 'a_elevator4', 'a_elevator1', 'a_elevator3', 'a_elevator3' ][
                           choicer.result
                        ] as RoomStates['a_lift']['location'];
                        break;
                     case 'a_elevator4':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory4);
                        roomState.location = [ 'a_elevator3', 'a_elevator1', 'a_elevator3', 'a_elevator4' ][
                           choicer.result
                        ] as RoomStates['a_lift']['location'];
                        break;
                     case 'a_start':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6());
                        break;
                  }
               } else {
                  switch (roomState.location) {
                     case 'a_elevator1':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator1);
                        break;
                     case 'a_elevator2':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator2);
                        break;
                     case 'a_elevator3':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator3);
                        break;
                     case 'a_elevator4':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator4);
                        break;
                     case 'a_elevator5':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator5);
                        break;
                     case 'a_start':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator6);
                        break;
                     case 'a_hub5':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator1);
                        break;
                     case 'a_core_entry1':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator2);
                        break;
                     case 'a_core_exit2':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator3);
                        break;
                     case 'c_start':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator4);
                        break;
                  }
                  if (citadelevator) {
                     roomState.location = [ 'a_hub5', 'a_core_entry1', 'a_core_exit2', 'c_start' ][
                        choicer.result
                     ] as RoomStates['a_lift']['location'];
                  } else {
                     roomState.location = [
                        'a_start',
                        'a_elevator1',
                        'a_elevator3',
                        'a_elevator2',
                        'a_elevator4',
                        'a_elevator5'
                     ][choicer.result] as RoomStates['a_lift']['location'];
                  }
               }
            }
            if (roomState.location !== prev) {
               roomState.elevating = true;
               game.menu = false;
               elevate(roomState.location === 'c_start' && !save.data.b.long_elevator).then(() => {
                  roomState.elevating = false;
                  game.menu = true;
               });
            }
            game.movement = true;
         }
      },
      p1teleport () {
         if (save.data.n.plot < 55) {
            const r = rooms.of('a_puzzle1');
            r.region[0]!.x = 160;
            r.region[1]!.x = 160;
            teleport('a_puzzle1', 'up', 160, 490, world);
         } else {
            teleport('a_puzzle1', 'up', 500, 490, world);
         }
      },
      p2teleport () {
         if (save.data.n.plot < 59) {
            rooms.of('a_puzzle2').region[1]!.x = 860;
            teleport('a_puzzle2', 'left', 1000, 240, world);
         } else {
            teleport('a_puzzle2', 'left', 380, 240, world);
         }
      },
      p2return () {
         save.data.n.plot < 59 || teleport('a_prepuzzle', 'left', 20, 60, world);
      },
      async labstation () {
         const left = player.x < 410;
         const inst = instance('below', left ? 'leftbrain' : 'rightbrain')!;
         const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
         await dialogue('auto', ...text.a_aerialis.overworld.topdesk1);
         if (choicer.result === 0) {
            anim.index = 1;
            assets.sounds.select.instance(timer).rate.value = 0.6;
            await dialogue(
               'auto',
               ...(left ? text.a_aerialis.overworld.labstationA : text.a_aerialis.overworld.labstationB)
            );
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.topdesk2);
         }
         anim.index = 0;
      },
      async conveyor (r, s, a) {
         if (a === 'up') {
            player.y -= 3;
         } else {
            player.y += 3;
         }
      },
      async terminal (r, s, a) {
         assets.sounds.equip.instance(timer).rate.value = 1.2;
         let term = null as null | CosmosSprite;
         function xterm (x: number, y: number) {
            term = new CosmosSprite({
               position: { x, y },
               priority: -20,
               frames: [ content.iooAXterm ]
            });
            renderer.attach('main', term);
         }
         switch (a) {
            case '1':
               xterm(219, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal1());
               break;
            case '2':
               xterm(629, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal2());
               break;
            case '3':
               xterm(189, 88);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal3());
               break;
            case '4':
               xterm(159, 148);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal4());
               break;
            case '5':
               xterm(119, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal5());
               break;
            case '-1':
               xterm(119, 68);
               return term;
         }
         term && renderer.detach('main', term);
      },
      async recycler () {
         if (save.data.b.water) {
            save.data.b.water = false;
            assets.sounds.rustle.instance(timer);
            await dialogue('auto', ...text.a_aerialis.overworld.recyclerX);
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.recycler);
         }
      },
      async wallswitch () {
         await dialogue('auto', ...text.a_aerialis.overworld.wallswitch1);
      },
      async notifier (roomState, scriptState: { infobox: CosmosObject | void }, key) {
         if (!pms().includes(key) && trueLizard() < 2) {
            assets.sounds.textnoise.instance(timer);
            save.data.s.pms += `${save.data.s.pms === '' ? '' : ','}${key}`;
            scriptState.infobox && renderer.detach('menu', scriptState.infobox);
            const infobox = menuBox(32, 10, 566, 140 - 38 * 2, 6, {
               objects: [
                  new CosmosText({
                     fill: 'white',
                     font: '16px DeterminationMono',
                     position: { x: 11, y: 9 },
                     spacing: { x: 0, y: 5 },
                     stroke: 'transparent',
                     content: text.a_aerialis.story.status
                        .replace(
                           '$(x)',
                           CosmosUtils.provide(
                              text.n_sidebarCellPms3[key as keyof typeof text.n_sidebarCellPms3].author
                           )
                        )
                        .slice(0, 33)
                  })
               ]
            });
            const OGY = infobox.y;
            infobox.y = -infobox.size.y;
            renderer.attach('menu', infobox);
            scriptState.infobox = infobox;
            await Promise.race([
               infobox.position.modulate(timer, 900, { y: OGY }, { y: OGY }).then(async () => {
                  await timer.pause(2000);
                  await infobox.position.modulate(timer, 900, { y: OGY }, { y: -infobox.size.y });
               }),
               events.on('teleport'),
               events.on('battle'),
               timer.when(() => atlas.target?.includes('sidebar') ?? false)
            ]);
            scriptState.infobox = void 0;
            renderer.detach('menu', infobox);
         }
      },
      async labcamera2 () {
         await dialogue('auto', ...text.a_aerialis.overworld.labcamera2);
      },
      async launchpad () {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            if (save.data.n.plot < 49) {
               await dialogue('auto', ...text.a_aerialis.overworld.platformDeny());
            } else if (trueLizard() > 1 && !save.data.b.a_state_gotphone) {
               await dialogue(
                  'auto',
                  ...text.a_aerialis.overworld.platformDeny(),
                  ...(world.genocide ? text.a_aerialis.story.phonewarn1() : [])
               );
            } else {
               game.movement = false;
               azzie.metadata.static = true;
               for (const spr of Object.values(characters.asriel.walk)) {
                  spr.reset();
               }
               const obs = renderer.layers.above.objects.filter(x => x instanceof CosmosSprite);
               const liftgates = [ ...instances('below', 'a_launchpad') ]
                  .map(x => x.object)
                  .sort((a, b) => a.position.extentOf(player) - b.position.extentOf(player));
               const base = liftgates.map(x => x.position.subtract(0, 22));
               const apex = base.map(x => x.subtract(0, 40));
               const str = new CosmosValue();
               const glow = new GlowFilter({ color: 0xffffff, innerStrength: 0, outerStrength: 0 });
               const filterTicker = () => {
                  glow.innerStrength = str.value / 2;
                  glow.outerStrength = (str.value / 2) * 3;
               };
               await player.position.step(timer, 1, base[0]);
               await timer.pause(300);
               assets.sounds.equip.instance(timer).rate.value = 1.25;
               const hum = new CosmosDaemon(content.amDrone, {
                  context: audio.context,
                  router: audio.soundRouter,
                  rate: 0.8,
                  gain: 0
               }).instance(timer);
               player.filters = [ glow ];
               azzie.filters = [ glow ];
               player.on('tick', filterTicker);
               str.modulate(timer, 500, 2, 2);
               hum.gain.modulate(timer, 500, 0.25, 0.25);
               await timer.pause(300);
               renderer.detach('above', ...obs);
               renderer.attach('main', ...obs);
               await player.position.modulate(timer, 1000, {}, apex[0], apex[0]);
               await timer.pause(300);
               renderer.detach('main', player);
               renderer.attach('above', player);
               player.priority.value = 1000;
               await player.position.modulate(timer, 1000, {}, apex[1], apex[1]);
               renderer.detach('above', player);
               renderer.attach('main', player);
               player.priority.value = 0;
               await player.position.modulate(timer, 1000, {}, base[1], base[1]);
               renderer.detach('main', ...obs);
               renderer.attach('above', ...obs);
               player.face = 'down';
               hum.stop();
               await timer.pause(300);
               assets.sounds.noise.instance(timer).rate.value = 1.3;
               str.modulate(timer, 500, 0, 0);
               await timer.pause(300);
               await player.position.step(timer, 1, liftgates[1].position.add(0, 5));
               player.filters = null;
               azzie.filters = null;
               player.off('tick', filterTicker);
               game.movement = true;
               azzie.metadata.static = false;
            }
         }
      },
      async lablizard () {
         await dialogue('auto', ...text.a_aerialis.overworld.lablizard.a());
      },
      async barricade1 (roomState: RoomStates['a_barricade1']) {
         if (save.data.n.plot < 52 && !roomState.trig1) {
            roomState.trig1 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            assets.sounds.phone.instance(timer);
            await dialogue('auto', ...text.a_aerialis.story.barricade1);
            const pass = choicer.result === 2;
            pass && header('x1').then(() => (save.data.n.plot = 52));
            await dialogue(
               'auto',
               ...[
                  text.a_aerialis.story.barricade1b1,
                  text.a_aerialis.story.barricade1b2,
                  text.a_aerialis.story.barricade1b3,
                  text.a_aerialis.story.barricade1b4
               ][choicer.result]
            );
            if (!pass) {
               await dialogue('auto', ...text.a_aerialis.story.barricadeFail1);
            }
            await endCall('auto');
            if (pass) {
               save.data.n.state_aerialis_barricuda = 1;
            } else {
               await barricadeFail1();
            }
         }
      },
      async barricade2 (roomState: RoomStates['a_barricade1']) {
         if (save.data.n.plot < 53 && !roomState.trig2) {
            roomState.trig2 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            assets.sounds.phone.instance(timer);
            await dialogue('auto', ...text.a_aerialis.story.barricade2);
            const pass = choicer.result === 3;
            pass && header('x1').then(() => (save.data.n.plot = 53));
            await dialogue(
               'auto',
               ...[
                  text.a_aerialis.story.barricade2b1,
                  text.a_aerialis.story.barricade2b2,
                  text.a_aerialis.story.barricade2b3,
                  text.a_aerialis.story.barricade2b4
               ][choicer.result]
            );
            if (!pass) {
               await dialogue('auto', ...text.a_aerialis.story.barricadeFail1);
            }
            await endCall('auto');
            if (pass) {
               save.data.n.state_aerialis_barricuda = 2;
            } else {
               await barricadeFail1();
            }
         }
      },
      async barricade3 (roomState: RoomStates['a_barricade1']) {
         if (save.data.n.plot < 54 && !roomState.trig3) {
            roomState.trig3 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            assets.sounds.phone.instance(timer);
            await dialogue('auto', ...text.a_aerialis.story.barricade3);
            header('x1').then(() => (save.data.n.plot = 54));
            await dialogue(
               'auto',
               ...[
                  text.a_aerialis.story.barricade3b1,
                  text.a_aerialis.story.barricade3b2,
                  text.a_aerialis.story.barricade3b3,
                  text.a_aerialis.story.barricade3b4
               ][choicer.result]
            );
            const pass = choicer.result === 1;
            pass || (await dialogue('auto', ...text.a_aerialis.story.barricade3c));
            await endCall('auto');
            if (pass) {
               save.data.n.state_aerialis_barricuda = 3;
            }
         }
      },
      async barricade4 () {
         if (save.data.n.plot < 62 && game.movement) {
            game.movement = false;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            assets.sounds.phone.instance(timer);
            header('x1').then(() => (save.data.n.plot = 62));
            await dialogue('auto', ...text.a_aerialis.story.barricade4);
            game.movement = true;
         }
      },
      async puzzle1 (roomState: RoomStates['a_puzzle1']) {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            game.movement = false;
            const pterm = instance('main', 'pterm')!.object;
            if (save.data.n.plot < 55) {
               roomState.check = true;
               const anim = pterm.objects.filter(o => o instanceof CosmosAnimation)[0] as CosmosAnimation;
               if ((roomState.offset ?? 0) - puzzle1target === 0) {
                  let i = 0;
                  while (i++ < 3) {
                     await timer.pause(200);
                     anim.index = 4;
                     assets.sounds.menu.instance(timer).rate.value = 1.4;
                     await timer.pause(100);
                     i < 3 && (anim.index = 3);
                  }
                  const obj = fader({ fill: '#fff' });
                  await obj.alpha.modulate(timer, 1000, 1);
                  await timer.pause(400);
                  anim.index = 0;
                  save.data.n.plot = 55;
                  const r = rooms.of('a_puzzle1');
                  r.region[0]!.x = 540;
                  r.region[1]!.x = 540;
                  partyShift({ x: 340 });
                  if (!pterm.metadata.shifted) {
                     pterm.metadata.shifted = true;
                     pterm.x += 340;
                  }
                  renderer.region[0].x = 540;
                  renderer.region[1].x = 540;
                  spire.metadata.min = -Infinity;
                  spire.metadata.max = Infinity;
                  obj.alpha.modulate(timer, 600, 0).then(() => renderer.detach('menu', obj));
                  roomState.check = false;
                  if (trueLizard() < 2) {
                     assets.sounds.phone.instance(timer);
                     await dialogue('auto', ...text.a_aerialis.story.puzzleReaction1);
                     await endCall('auto');
                  }
               } else {
                  await timer.pause(200);
                  anim.index = 2;
                  assets.sounds.menu.instance(timer).rate.value = 1.2;
                  await timer.pause(100);
                  anim.index = 1;
                  await timer.pause(100);
                  anim.index = 2;
                  assets.sounds.menu.instance(timer).rate.value = 1.2;
                  await timer.pause(400);
                  anim.index = 0;
                  roomState.check = false;
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.puzzle1done);
            }
            game.movement = true;
         }
      },
      async puzzle2 (roomState: RoomStates['a_puzzle2']) {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            game.movement = false;
            const pterm = instance('main', 'pterm')!.object;
            if (save.data.n.plot < 59) {
               roomState.check = true;
               const anim = pterm.objects.filter(o => o instanceof CosmosAnimation)[0] as CosmosAnimation;
               if (puzzle2target.subtract(roomState.offset ?? 0, save.data.n.state_aerialis_puzzle2os).extent === 0) {
                  let i = 0;
                  const n = save.data.n.plot < 58.2 ? 2 : 3;
                  while (i++ < n) {
                     await timer.pause(200);
                     anim.index = 4;
                     assets.sounds.menu.instance(timer).rate.value = 1.4;
                     await timer.pause(100);
                     i < n && (anim.index = 3);
                  }
                  const obj = fader({ fill: '#fff' });
                  await obj.alpha.modulate(timer, 1000, 1);
                  await timer.pause(400);
                  anim.index = 0;
                  if (save.data.n.plot < 58.1) {
                     save.data.n.plot = 58.1;
                  } else if (save.data.n.plot < 58.2) {
                     save.data.n.plot = 58.2;
                  } else {
                     save.data.n.plot = 59;
                     rooms.of('a_puzzle2').region[1]!.x = 240;
                     partyShift({ x: -620 });
                     if (!pterm.metadata.shifted) {
                        pterm.metadata.shifted = true;
                        pterm.x -= 620;
                     }
                     renderer.region[0].x = 160;
                     renderer.region[1].x = 240;
                     spire.metadata.min = -Infinity;
                     spire.metadata.max = Infinity;
                  }
                  obj.alpha.modulate(timer, 600, 0).then(() => renderer.detach('menu', obj));
                  roomState.check = false;
                  if (trueLizard() < 2) {
                     assets.sounds.phone.instance(timer);
                     if (save.data.n.plot > 58.2) {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2c);
                        await endCall('auto');
                     } else if (save.data.n.plot > 58.1) {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2b);
                        await endCall('auto');
                     } else {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2a);
                        await endCall('auto');
                     }
                  }
               } else {
                  await timer.pause(200);
                  anim.index = 2;
                  assets.sounds.menu.instance(timer).rate.value = 1.2;
                  await timer.pause(100);
                  anim.index = 1;
                  await timer.pause(100);
                  anim.index = 2;
                  assets.sounds.menu.instance(timer).rate.value = 1.2;
                  await timer.pause(400);
                  anim.index = 0;
                  roomState.check = false;
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.puzzle1done);
            }
            game.movement = true;
         }
      },
      async ingredient (roomState: RoomStates['a_mettaton1'], s, ingredient) {
         let ing = false;
         for (const inst of instances('main', 'ingredient')) {
            if (inst.tags.includes(ingredient)) {
               inst.destroy();
               ing = true;
               break;
            }
         }
         if (ing) {
            assets.sounds.equip.instance(timer);
            switch (ingredient) {
               case 'hexogen':
                  roomState.ingredient1 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient1);
                  break;
               case 'beaker':
                  roomState.ingredient2 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient2);
                  break;
               case 'oil':
                  roomState.ingredient3 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient3);
                  break;
            }
         }
      },
      async labcounter (roomState: RoomStates['a_mettaton1']) {
         let ing = false;
         if (save.data.n.plot === 55.1 && !roomState.danger) {
            if (roomState.ingredient1 === 1) {
               ing = true;
               roomState.ingredient1 = 2;
            }
            if (roomState.ingredient2 === 1) {
               ing = true;
               roomState.ingredient2 = 2;
            }
            if (roomState.ingredient3 === 1) {
               ing = true;
               roomState.ingredient3 = 2;
            }
         }
         if (ing) {
            assets.sounds.noise.instance(timer);
         } else {
            await area.scripts.mtttrivia!(roomState, (states.scripts.mtttrivia ??= {}), 'labcounter');
         }
      },
      async mettacrafter (roomState: RoomStates['a_mettaton1']) {
         if (!game.movement) {
            return;
         }
         const i1 = roomState.ingredient1 ?? 0;
         const i2 = roomState.ingredient2 ?? 0;
         const i3 = roomState.ingredient3 ?? 0;
         const findAmt = (i1 === 0 ? 0 : 1) + (i2 === 0 ? 0 : 1) + (i3 === 0 ? 0 : 1);
         if (findAmt < 3) {
            await dialogue(
               'dialoguerBottom',
               ...[
                  text.a_aerialis.overworld.mettacrafter1a,
                  text.a_aerialis.overworld.mettacrafter1b,
                  text.a_aerialis.overworld.mettacrafter1c
               ][findAmt]
            );
         } else {
            const placeAmt = (i1 === 2 ? 1 : 0) + (i2 === 2 ? 1 : 0) + (i3 === 2 ? 1 : 0);
            await dialogue(
               'dialoguerBottom',
               ...[
                  text.a_aerialis.overworld.mettacrafter2a,
                  text.a_aerialis.overworld.mettacrafter2b,
                  text.a_aerialis.overworld.mettacrafter2c
               ][placeAmt]
            );
         }
      },
      async laserbarrrier (roomState: RoomStates['a_mettaton1']) {
         if (roomState.danger) {
            await dialogue('auto', ...text.a_aerialis.overworld.laserbarrrier2());
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.laserbarrrier1());
         }
      },
      async rg1 (roomState: RoomStates['a_rg1']) {
         if (save.data.n.plot < 51) {
            save.data.n.plot = 51;
            if (!world.genocide && game.movement) {
               game.movement = false;
               game.music!.gain.value = 0;
               const camX = player.position.clamp(...renderer.region).x - 160;
               const npc01 = character(
                  'rgdragon',
                  { talk: rgdragon, walk: rgdragon },
                  { x: camX - 20, y: 150 },
                  'right'
               ).on('tick', function () {
                  if (this.sprite.index % 2 === 1 && this.sprite.step === this.sprite.duration - 1) {
                     assets.sounds.stomp.instance(timer).rate.value = 1.2;
                  }
               });
               const npc02 = character(
                  'rgrabbit',
                  { talk: rgrabbit, walk: rgrabbit },
                  { x: camX - 60, y: 170 },
                  'right'
               );
               await Promise.all([
                  npc01.walk(timer, 3, { x: player.x - 120 }),
                  npc02.walk(timer, 3, { x: player.x - 160 })
               ]);
               await dialogue('auto', ...text.a_aerialis.story.rg1a);
               await Promise.all([
                  npc01.walk(timer, 3, { x: player.x - 40 }),
                  npc02.walk(timer, 3, { x: player.x - 80 })
               ]);
               await timer.pause(850);
               const headers = rgHeaders(npc01, npc02);
               typer.on('header', headers);
               await dialogue('auto', ...text.a_aerialis.story.rg1b1);
               await Promise.all([
                  timer.pause(350).then(async () => {
                     npc02.face = 'left';
                     await timer.pause(850);
                     npc02.face = 'right';
                  }),
                  dialogue('auto', ...text.a_aerialis.story.rg1b2).then(() => timer.pause(3150))
               ]);
               await dialogue('auto', ...text.a_aerialis.story.rg1c);
               await timer.pause(850);
               // credits to ehe!
               npc01.face = 'down';
               await timer.pause(1450);
               npc01.face = 'right';
               await timer.pause(1850);
               await dialogue('auto', ...text.a_aerialis.story.rg1d1);
               npc02.face = 'down';
               await dialogue('auto', ...text.a_aerialis.story.rg1d2);
               npc02.face = 'right';
               await dialogue('auto', ...text.a_aerialis.story.rg1d3);
               npc01.face = 'left';
               npc02.face = 'left';
               await timer.pause(850);
               await Promise.all([
                  npc01.walk(timer, 3, { x: player.x - 100 }),
                  npc02.walk(timer, 3, { x: player.x - 140 })
               ]);
               await timer.pause(650);
               npc01.face = 'right';
               await timer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.story.rg1e);
               typer.off('header', headers);
               await timer.pause(1450);
               await Promise.all([ npc01.walk(timer, 3, { x: camX - 40 }), npc02.walk(timer, 3, { x: camX - 40 }) ]);
               renderer.detach('main', npc01, npc02);
               await timer.pause(1500);
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_aerialis.story.rgcc);
               }
               game.movement = true;
               game.music!.gain.value = world.level;
            }
         }
      },
      async rg2 (roomState: RoomStates['a_rg2']) {
         if (save.data.n.plot < 61) {
            if (game.movement) {
               game.movement = false;
               game.music!.gain.value = 0;
               save.data.n.plot = 61;
               const xpos = player.position.clamp(...renderer.region).x + 180;
               const npc01 = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ionARgcatLeft,
                  position: { y: 140 }
               }).on('tick', function () {
                  if (this.index % 2 === 1 && this.step === this.duration - 1) {
                     assets.sounds.stomp.instance(timer).rate.value = 1.2;
                  }
               });
               const npc02 = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ionARgbugLeft,
                  position: { x: 40, y: 180 }
               });
               const obj = new CosmosObject({ objects: [ npc01, npc02 ], position: { x: xpos }, priority: 100000 });
               renderer.attach('main', obj);
               npc01.enable();
               npc02.enable();
               const offsetterX = Math.max(player.x, ...(world.azzie ? [ azzie.x ] : []));
               await obj.position.step_legacy(timer, 3, { x: offsetterX + 120 });
               npc01.reset();
               npc02.reset();
               const headers = rgHeaders(npc01, npc02);
               typer.on('header', headers);
               await dialogue('auto', ...text.a_aerialis.story.rg2a);
               npc01.enable();
               npc02.enable();
               await obj.position.step_legacy(timer, 3, { x: offsetterX + 30 });
               npc01.reset();
               npc02.reset();
               await dialogue('auto', ...text.a_aerialis.story.rg2b());
               await timer.pause(450);
               npc01.use(content.ionARgcatRight);
               await timer.pause(850);
               npc01.use(content.ionARgcatLeft);
               if (world.genocide) {
                  await dialogue('auto', ...text.a_aerialis.story.rg2c3);
               } else {
                  await timer.pause(1450);
                  await dialogue('auto', ...text.a_aerialis.story.rg2c1);
                  npc02.use(content.ionARgbugDown);
                  await timer.pause(1450);
                  await dialogue('auto', ...text.a_aerialis.story.rg2c2);
                  await timer.pause(650);
                  npc02.use(content.ionARgbugLeft);
               }
               await timer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.story.rg2d());
               typer.off('header', headers);
               await battler.encounter(player, groups.rg);
               game.movement = false;
               if (save.data.n.state_aerialis_royalguards === 1) {
                  updateBadLizard();
               } else {
                  npc01.use(content.ionARgcatRight);
                  npc02.use(content.ionARgbugRight);
                  npc01.enable();
                  npc02.enable();
                  await obj.position.step_legacy(timer, 3, { x: xpos });
               }
               renderer.detach('main', obj);
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_aerialis.story.rg2e);
               }
               game.movement = true;
               game.music!.gain.value = world.level;
               if (trueLizard() > 1) {
                  save.data.n.plot = 64;
               }
            }
         }
      },
      async sentrystation (roomState: RoomStates['a_sans']) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'sentryskeleton');
         if (inst) {
            let dog = false;
            if (roomState.toppler) {
               await dialogue('auto', ...text.a_aerialis.corndog2b);
               dog = true;
            } else {
               await dialogue('auto', ...text.a_aerialis.corndog1());
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     if (save.data.n.g < 10) {
                        await dialogue('auto', ...text.a_aerialis.corndog3);
                     } else {
                        save.data.n.g -= 10;
                        assets.sounds.equip.instance(timer);
                        if (save.data.n.state_aerialis_corngoat === 1) {
                           save.storage.inventory.add('corngoat');
                        } else {
                           save.storage.inventory.add('corndog');
                        }
                        await dialogue('auto', ...text.a_aerialis.corndog4());
                     }
                  } else {
                     roomState.toppler = true;
                     events.on('teleport').then(() => (roomState.toppler = false));
                     await dialogue('auto', ...text.a_aerialis.corndog2);
                     dog = true;
                  }
               } else {
                  await dialogue('auto', ...text.a_aerialis.corndog5);
               }
            }
            if (dog) {
               renderer.attach(
                  'main',
                  new CosmosSprite({
                     anchor: 0,
                     frames: [ content.iooACorndog ],
                     position: player.position.subtract(0, 28),
                     gravity: { angle: -90, extent: 0.05 },
                     spin: random.next() < 0.5 ? -0.1 : 0.1,
                     acceleration: 1.05,
                     priority: player.y + 1
                  }).on('tick', function () {
                     (this.y <= -10 || game.room !== 'a_sans') && renderer.detach('main', this);
                  })
               );
            }
         }
      },
      async m2switch (roomState: RoomStates['a_mettaton2']) {
         if (player.face === 'down') {
            roomState.killswitch = true;
         }
      },
      async m2climber (roomState: RoomStates['a_mettaton2']) {
         if (game.movement) {
            game.movement = false;
            roomState.climber = true;
         }
      },
      async rg1chat () {
         const headers = rgHeaders(
            instance('main', 'securityGuard1')!.object.objects[0],
            instance('main', 'securityGuard2')!.object.objects[0]
         );
         typer.on('header', headers);
         await dialogue('dialoguerTop', ...text.a_aerialis.rg1chat());
         typer.off('header', headers);
      },
      async rg2chat () {
         const headers = rgHeaders(
            instance('main', 'securityGuard1')!.object.objects[0],
            instance('main', 'securityGuard2')!.object.objects[0]
         );
         typer.on('header', headers);
         await dialogue('dialoguerTop', ...text.a_aerialis.rg2chat());
         typer.off('header', headers);
      },
      async bedcounter () {
         if (!evac()) {
            const inst = instance('main', 'a_bedreceptionist')!;
            if (save.data.b.a_state_bedroom) {
               await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.bedreceptionist4);
            } else {
               await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.bedreceptionist1());
               if (choicer.result === 0) {
                  if (save.data.n.g < 400) {
                     await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.bedreceptionist3);
                  } else {
                     await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.bedreceptionist2a);
                     save.data.n.g -= 400;
                     save.data.b.a_state_bedroom = true;
                  }
               } else {
                  await inst.talk('a', talkFilter(), 'auto', ...text.a_aerialis.bedreceptionist2b);
               }
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.gonezo());
         }
      },
      async sleeping2 () {
         if (evac() || save.data.b.a_state_bedroom) {
            await teleport('a_sleeping2', 'up', 190, 230, world);
         } else {
            await dialogue('auto', ...text.a_aerialis.nosleep);
            player.y += 3;
            player.face = 'down';
         }
      },
      async sleeping3 () {
         if (evac()) {
            await teleport('a_sleeping3', 'up', 150, 230, world);
         } else {
            await dialogue('auto', ...text.a_aerialis.nosleep);
            player.y += 3;
            player.face = 'down';
         }
      },
      async sansdate () {
         if (!game.movement) {
            return;
         }
         const sas = instance('main', 'datesans');
         if (sas) {
            game.movement = false;
            await dialogue('auto', ...text.a_aerialis.dinnerdate1());
            if (choicer.result === 0) {
               game.music!.gain.value = 0;
               await dialogue('auto', ...text.a_aerialis.dinnerdate2b);
               sas.destroy();
               const dat = character('sans', characters.sans, sas.object, 'down');
               if (player.x > 219) {
                  await dat.walk(timer, 3, { x: 190 });
               } else {
                  await dat.walk(timer, 3, { y: 160 });
               }
               dat.sprites.down.duration = Math.round(15 / 3);
               await dat.walk(timer, 3, { x: 190, y: 160 });
               await timer.pause(1000);
               await dialogue('auto', ...text.a_aerialis.dinnerdate3);
               await Promise.all([
                  dat.walk(timer, 3, { x: 10 }).then(() => dat.alpha.modulate(timer, 300, 0)),
                  player.walk(timer, 3, { y: 160 }, { y: 160, x: 10 })
               ]);
               await teleport('a_dining', 'right', 20, 110, { cutscene: true });
               const mus = assets.music.sansdate.instance(timer);
               dat.face = 'right';
               dat.position.set(45, 110);
               dat.alpha.value = 1;
               await timer.pause(950);
               dat.face = 'left';
               await timer.pause(750);
               await dialogue('auto', ...text.a_aerialis.dinnerdate4);
               await Promise.all([
                  player.walk(timer, 3, { x: 60 }, { x: 60, y: 185 }),
                  dat.walk(timer, 3, { x: 60 }, { x: 60, y: 210 })
               ]);
               await timer.pause(850);
               await dialogue('auto', ...text.a_aerialis.dinnerdate5);
               dat.face = 'up';
               await dialogue('auto', ...text.a_aerialis.dinnerdate5b);
               await Promise.all([ player.walk(timer, 3, { y: 205 }), dat.walk(timer, 3, { y: 230 }) ]);
               dat.face = 'up';
               await dialogue('auto', ...text.a_aerialis.dinnerdate6);
               await Promise.all([
                  player.walk(timer, 3, { x: 160 }, { x: 160, y: 240 }).then(() => {
                     player.face = 'left';
                  }),
                  dat.walk(timer, 3, { y: 240 }).then(() => {
                     dat.face = 'right';
                  }),
                  dialogue('dialoguerTop', ...text.a_aerialis.dinnerdate7)
               ]);
               await timer.pause(1500);
               await dialogue('auto', ...text.a_aerialis.dinnerdate8());
               dat.face = 'up';
               await timer.pause(2250);
               await dialogue('auto', ...text.a_aerialis.dinnerdate10);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate11());
               dat.face = 'up';
               await timer.pause(1450);
               await dialogue('auto', ...text.a_aerialis.dinnerdate13);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate14);
               mus.gain.modulate(timer, 4000, 0);
               await dat.walk(timer, 3, { y: 105 }, { x: 170, y: 105 }, { x: 170, y: 90 });
               await timer.pause(3e3);
               await dialogue('auto', ...text.a_aerialis.dinnerdate14comment());
               await timer.pause(1e3);
               await dat.walk(
                  timer,
                  3,
                  { y: 105 },
                  { x: 60, y: 105 },
                  { x: 60, y: 200 },
                  { x: 110, y: 200 },
                  { x: 110, y: 215 }
               );
               await timer.pause(850);
               const fud = new CosmosAnimation({
                  active: true,
                  metadata: { tags: [ 'hotelfood' ] },
                  anchor: { x: 0, y: 1 },
                  resources: content.iooAHotelfood,
                  position: { x: 129, y: 231 },
                  priority: 271,
                  objects: [
                     new CosmosHitbox({
                        anchor: 0,
                        size: { x: 7, y: 30 },
                        position: { y: 15 },
                        metadata: { interact: true, name: 'aerialis', args: [ 'hotelfood' ] }
                     })
                  ]
               });
               renderer.attach('main', fud);
               assets.sounds.noise.instance(timer);
               await timer.pause(1250);
               await dialogue('auto', ...text.a_aerialis.dinnerdate15());
               mus.gain.modulate(timer, 1000, mus.daemon.gain);
               await dat.walk(timer, 3, { y: 200 }, { x: 60, y: 200 }, { x: 60, y: 240 });
               await timer.pause(850);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate16());
               await timer.pause(850);
               dat.face = 'down';
               await timer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.dinnerdate18);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate19());
               save.data.n.plot = 66;
               game.movement = true;
               Promise.race([
                  dat.walk(timer, 3, { y: 110 }, { x: 10, y: 110 }).then(() => dat.alpha.modulate(timer, 300, 0)),
                  events.on('teleport').then(() => renderer.detach('main', dat, fud))
               ]).then(() => {
                  dat.alpha.modulate(timer, 0, 0);
               });
               await events.on('teleport-start');
               await mus.gain.modulate(timer, 300, 0);
               mus.stop();
            } else {
               await dialogue('auto', ...text.a_aerialis.dinnerdate2a());
            }
            game.movement = true;
         }
      },
      async lockup () {
         const anim = instance('main', 'lockup')!.object.objects[0] as CosmosAnimation;
         if (save.data.b.s_state_capstation) {
            switch (save.data.n.state_aerialis_lockup) {
               case 0:
                  save.data.n.state_aerialis_lockup = 1;
                  assets.sounds.equip.instance(timer);
                  await dialogue('auto', ...text.a_aerialis.lockup1);
                  break;
               case 1:
                  if (save.storage.inventory.size < 8) {
                     save.data.n.state_aerialis_lockup = 2;
                     save.storage.inventory.add('old_gun');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_aerialis.lockup2);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.lockup6);
                  }
                  break;
               case 2:
                  if (save.storage.inventory.size < 8) {
                     save.data.n.state_aerialis_lockup = 3;
                     save.storage.inventory.add('old_bomb');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_aerialis.lockup3);
                  }
                  break;
               case 3:
                  if (save.storage.inventory.size < 8) {
                     save.data.n.state_aerialis_lockup = 4;
                     save.storage.inventory.add('old_spray');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_aerialis.lockup4);
                  }
                  break;
               case 4:
                  await dialogue('auto', ...text.a_aerialis.lockup5);
                  break;
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.lockup0);
         }
      },
      async vender () {
         if (game.movement) {
            await dialogue('auto', ...text.a_aerialis.candy1());
            if (choicer.result === 0) {
               if (save.storage.inventory.size < 8) {
                  if (save.data.n.g < 40) {
                     await dialogue('auto', ...text.a_aerialis.candy2);
                  } else {
                     assets.sounds.equip.instance(timer);
                     save.data.n.g -= 40;
                     save.storage.inventory.add('filament');
                     await dialogue('auto', ...text.a_aerialis.candy4);
                  }
               } else {
                  await dialogue('auto', ...text.a_aerialis.candy3);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.candy5);
            }
         }
      },
      async papinter () {
         if (game.movement) {
            if (save.data.n.exp > 0 && !save.data.b.a_state_fishbetray) {
               save.data.b.a_state_fishbetray = true;
               await dialogue('auto', ...text.a_aerialis.papinter2);
            } else {
               await dialogue('auto', ...text.a_aerialis.papinter1());
            }
         }
      },
      async undinter () {
         game.movement && (await dialogue('auto', ...text.a_aerialis.undinter()));
      },
      async corepuzzle (roomState: RoomStates['a_core_left1'] | RoomStates['a_core_left2'], scriptState, sw) {
         if (roomState.solved) {
            await dialogue('auto', ...text.a_aerialis.puzzlesolved);
         } else if (!scriptState.activated) {
            scriptState.activated = true;
            puzzler.update(roomState, [ +sw ]);
            assets.sounds.noise.instance(timer);
            const ret = assets.sounds.retract.instance(timer);
            ret.rate.value = 2;
            ret.gain.value /= 3;
            await timer.post();
            scriptState.activated = false;
         }
      },
      coreswitch () {
         let solve = false;
         const left = game.room === 'a_core_left3';
         if (left) {
            if (save.data.n.state_aerialis_corepath_puzzle < 3) {
               solve = true;
               if (save.data.n.state_aerialis_corepath_warrior < 3) {
                  shake(1, 400);
                  assets.sounds.shake.instance(timer);
               } else {
                  assets.sounds.noise.instance(timer);
               }
               timer.pause(650).then(async () => {
                  await timer.when(() => game.movement);
                  save.data.n.state_aerialis_corepath_puzzle = 3;
               });
            }
         } else if (save.data.n.state_aerialis_corepath_warrior < 3) {
            solve = true;
            if (save.data.n.state_aerialis_corepath_puzzle < 3) {
               shake(1, 400);
               assets.sounds.shake.instance(timer);
            } else {
               assets.sounds.noise.instance(timer);
            }
            timer.pause(650).then(async () => {
               await timer.when(() => game.movement);
               save.data.n.state_aerialis_corepath_warrior = 3;
            });
         }
         if (solve) {
            (instance('below', 'exitswitch')!.object.objects[0] as CosmosAnimation).index = 1;
         } else {
            dialogue('auto', ...text.a_aerialis.coreswitched);
         }
         if (save.data.n.plot < 67) {
            if (world.genocide) {
               CosmosUtils.chain<void, Promise<void>>(void 0, async (v, n) => {
                  const [ from, to ] = await events.on('teleport');
                  to === 'a_core_main' || (await n());
               }).then(async () => {
                  teleporter.movement = false;
                  game.movement = false;
                  if (left) {
                     azzie.face = 'left';
                     azzie.position.set(80, 460);
                     await azzie.walk(
                        timer,
                        3,
                        { x: 60, y: 440 },
                        { x: 60, y: 420 },
                        { x: 40, y: 400 },
                        { x: 40, y: 380 }
                     );
                  } else {
                     azzie.face = 'right';
                     azzie.position.set(440, 460);
                     await azzie.walk(
                        timer,
                        3,
                        { x: 460, y: 440 },
                        { x: 460, y: 420 },
                        { x: 480, y: 400 },
                        { x: 480, y: 380 }
                     );
                  }
                  await dialogue('auto', ...text.a_aerialis.genotext.core6a());
                  await azzie.walk(timer, 3, { y: player.y + 10 });
                  if (left) {
                     await azzie.walk(timer, 3, { x: player.x - 21 });
                  } else {
                     await azzie.walk(timer, 3, { x: player.x + 21 });
                  }
                  await azzie.walk(timer, 3, { y: player.y });
                  azzie.metadata.override = false;
                  azzie.metadata.reposition = true;
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_aerialis.genotext.core6b);
                  game.movement = true;
               });
            }
            save.data.n.plot = 67;
         }
      },
      async alphys5 () {
         if (save.data.n.plot < 55 && trueLizard() < 2 && !save.data.b.a_state_puzzlehelp) {
            save.data.b.a_state_puzzlehelp = true;
            await dialogue('auto', ...text.a_aerialis.puzzlehelp);
         }
      }
   } as Partial<CosmosKeyed<(roomState: any, scriptState: any, ...args: string[]) => any>>,
   tickers: {
      a_hub2 () {
         const lockup = instance('main', 'lockup');
         if (lockup) {
            (lockup.object.objects[0] as CosmosAnimation).index = save.data.n.state_aerialis_lockup;
         }
      },
      async a_lab_entry () {
         if (world.genocide && player.y < 420 && save.data.n.state_aerialis_monologue < 1) {
            save.data.n.state_aerialis_monologue = 1;
            save.data.n.state_aerialis_monologue_iteration1 = save.flag.n.ga_asriel46++;
            if (save.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel46);
            }
         }
         if (world.genocide && player.y < 280 && save.data.n.state_aerialis_monologue < 2) {
            save.data.n.state_aerialis_monologue = 2;
            if (save.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel47);
            }
         }
         if (world.genocide && player.x > 280 && save.data.n.state_aerialis_monologue < 3) {
            save.data.n.state_aerialis_monologue = 3;
            if (save.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel48);
            }
         }
      },
      async a_lab_main (roomState) {
         if (!roomState.cutscene) {
            roomState.cutscene = true;
            if (save.data.n.plot < 49) {
               await timer.when(() => game.room === 'a_lab_main' && player.x > 450 && game.movement);
               game.movement = false;
               save.data.n.plot = 49;
               game.music!.gain.value = 0;
               await timer.pause(850);
               const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
               game.camera = cam;
               if (trueLizard() < 2) {
                  cam.position.modulate(timer, 1250, { x: 550 });
                  const alph = lizard({ x: 800, y: player.y }, 'left');
                  await alph.walk(timer, 3, { x: 650 });
                  const shocker = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: alph.position,
                     frames: [ content.iocAlphysShocked ]
                  });
                  alph.alpha.value = 0;
                  renderer.attach('main', shocker);
                  assets.sounds.notify.instance(timer);
                  await notifier(alph, 850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys1);
                  renderer.detach('main', shocker);
                  alph.alpha.value = 1;
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys2);
                  await timer.pause(550);
                  alph.face = 'down';
                  await timer.pause(850);
                  alph.face = 'left';
                  await timer.pause(1150);
                  const labMusic = assets.music.lab.instance(timer);
                  function slam () {
                     assets.sounds.metapproach.instance(timer);
                     shake(2, 500);
                  }
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys3());
                  assets.sounds.metapproach.instance(timer);
                  shake(2, 500);
                  labMusic.stop();
                  await timer.pause(1950);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys4);
                  await timer.pause(1750);
                  slam();
                  await timer.pause(1550);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys5);
                  await timer.pause(1350);
                  slam();
                  await timer.pause(1550);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys6);
                  await timer.pause(1150);
                  slam();
                  await timer.pause(550);
                  slam();
                  await timer.pause(550);
                  slam();
                  await timer.pause(550);
                  slam();
                  await timer.pause(1950);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys7);
                  assets.sounds.swing.instance(timer);
                  const exploder = new CosmosRectangle({
                     alpha: 0,
                     fill: '#fff',
                     size: { x: 320, y: 240 },
                     priority: -Infinity
                  });
                  renderer.attach('menu', exploder);
                  await exploder.alpha.modulate(timer, 1000, 1);
                  const blackfader = new CosmosRectangle({ alpha: 0, fill: '#000', size: { x: 320, y: 240 } });
                  renderer.attach('menu', blackfader);
                  await blackfader.alpha.modulate(timer, 2000, 1);
                  await timer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys8);
                  await timer.pause(350);
                  assets.sounds.drumroll.instance(timer);
                  await timer.pause(1450);
                  assets.sounds.noise.instance(timer);
                  alph.face = 'up';
                  player.face = 'up';
                  alph.y = 160;
                  player.y = 160;
                  renderer.detach('menu', exploder, blackfader);
                  const metta = character('mettaton', mettaton1C, { x: 550, y: 135 }, 'down');
                  const over = new CosmosSprite({ blend: BLEND_MODES.MULTIPLY, frames: [ content.iooASpotlight ] });
                  renderer.attach('menu', over);
                  await timer.pause(950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys9);
                  metta.face = 'left';
                  metta.sprite.enable();
                  assets.sounds.applause.instance(timer);
                  over.alpha.modulate(timer, 1500, 0.5);
                  const showtime = assets.music.gameshow.instance(timer);
                  const discospr = new CosmosAnimation({
                     active: true,
                     position: { x: cam.x },
                     anchor: { x: 0, y: 1 },
                     resources: content.iooADiscoball,
                     priority: 1000
                  });
                  renderer.attach('main', discospr);
                  discospr.position.modulate(timer, 3000, { y: 37 });
                  await timer.pause(2000);
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys10);
                  metta.preset = mettaton2C;
                  metta.face = 'down';
                  metta.sprite.enable();
                  assets.sounds.clap.instance(timer);
                  await timer.pause(2250);
                  metta.preset = mettaton1C;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys11);
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys11b);
                  await timer.pause(850);
                  metta.face = 'right';
                  showtime.stop();
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys12);
                  await battler.encounter(player, groups.mettaton1, false);
                  renderer.detach('main', metta, discospr);
                  renderer.detach('menu', over);
                  alph.face = 'left';
                  await alph.walk(timer, 3, player.position.add(40, 0));
                  await timer.pause(1250);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys13());
                  await alph.walk(timer, 1.5, player.position.add(30, 0));
                  await timer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys14);
                  await alph.walk(timer, 3, { x: game.camera.x + 180, y: player.y });
                  await timer.pause(1650);
                  assets.sounds.alphysfix.instance(timer);
                  await timer.pause(3450);
                  await alph.walk(timer, 3, player.position.add(30, 0));
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys15());
                  alph.face = 'right';
                  await timer.pause(650);
                  alph.face = 'left';
                  await timer.pause(1150);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys16);
                  alph.metadata.barrier = true;
                  alph.metadata.interact = true;
                  alph.metadata.name = 'aerialis';
                  alph.metadata.args = [ 'lablizard' ];
                  alph.size.set(18, 20);
                  alph.anchor.set(0, 1);
                  alph
                     .walk(timer, 3, { x: 324, y: player.y > 150 && player.y < 170 ? 180 : 160 }, { y: 145 })
                     .then(() => {
                        assets.sounds.select.instance(timer).rate.value = 0.6;
                        (instance('below', 'labdesk')!.object.objects[0] as CosmosAnimation).index = 1;
                     });
                  await timer.pause(450);
                  await cam.position.modulate(timer, 1250, { x: player.x });
                  if (!save.data.b.oops) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys17);
                  }
               } else {
                  const metta = character('mettaton', mettaton1C, { x: 650, y: player.y }, 'down');
                  await cam.position.modulate(timer, 1250, { x: 550 });
                  azzie.face = 'right';
                  await timer.pause(650);
                  function mettaEmotes (h: string) {
                     if (h[0] === 'z') {
                        metta.preset = [ mettaton1C, mettaton2C, mettaton3C ][+h[1]];
                        metta.face = [ 'down', 'left', 'right', 'up' ][+h[2]] as CosmosDirection;
                     }
                  }
                  typer.on('header', mettaEmotes);
                  save.data.n.state_aerialis_basekill = world.trueKills;
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller1());
                  if (world.genocide) {
                     save.flag.n.genocide_milestone = Math.max(3, save.flag.n.genocide_milestone) as 3;
                     metta.preset = mettaton1C;
                     metta.face = 'down';
                     await timer.pause(650);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller1x);
                     await timer.pause(850);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller2);
                  }
                  typer.off('header', mettaEmotes);
                  metta.walk(timer, 4, { x: game.camera.x + 180, y: player.y }).then(() => {
                     renderer.detach('main', metta);
                  });
                  await cam.position.modulate(timer, 1250, { x: player.x });
                  if (world.genocide && save.flag.n.ga_asrielRobo1++ < 1) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller2x);
                  }
               }
               game.camera = player;
               game.music!.gain.value = world.level;
               game.movement = true;
            }
         }
      },
      async a_path3 () {
         (world.genocide || world.population < 7) && instance('main', 'a_greenfire')?.destroy();
         if (world.genocide && player.y < 240 && save.data.n.state_aerialis_monologue < 4) {
            save.data.n.state_aerialis_monologue = 4;
            save.data.n.state_aerialis_monologue_iteration2 = save.flag.n.ga_asriel49++;
            if (save.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel49);
            }
         }
      },
      async a_path4 () {
         save.data.b.item_sonic && instance('below', 'sonic')?.destroy();
      },
      async a_rg1 () {
         if (world.genocide && player.x > 140 && save.data.n.state_aerialis_monologue < 5) {
            save.data.n.state_aerialis_monologue = 5;
            if (save.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel50);
            }
         }
         if (world.genocide && player.x > 440 && save.data.n.state_aerialis_monologue < 6) {
            save.data.n.state_aerialis_monologue = 6;
            if (save.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel51);
            }
         }
      },
      async a_puzzle1 (roomState) {
         if (save.data.n.plot < 55 && game.movement) {
            let di = 0;
            roomState.offset ??= 0;
            if (player.y <= 180) {
               di = 200;
               roomState.offset++;
            } else if (roomState.offset > 0 && player.y > 380) {
               di = -200;
               roomState.offset--;
            }
            partyShift({ y: di });
            if (roomState.offset === 25) {
               if (trueLizard() < 2) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1a());
                  const obj = fader({ fill: '#fff' });
                  await obj.alpha.modulate(timer, 1000, 1);
                  await timer.pause(400);
                  roomState.offset -= 10;
                  obj.alpha.modulate(timer, 600, 0).then(() => renderer.detach('menu', obj));
                  game.movement = true;
               } else if (world.genocide) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1b());
                  player.y += 3;
                  player.face = 'down';
                  game.movement = true;
               }
            } else if (roomState.offset === 30) {
               game.movement = false;
               fader({ fill: 'white', priority: Infinity, alpha: 1 });
               roomState.offset = 100;
               await timer.pause(3000);
               exit();
            }
         }
      },
      async a_sans () {
         (world.genocide || world.population < 5) && instance('main', 'a_harpy')?.destroy();
      },
      async a_pacing () {
         (world.genocide || (world.population === 0 && !world.bullied)) && instance('main', 'a_black')?.destroy();
      },
      async a_puzzle2 (roomState) {
         (world.genocide || world.population < 2) && instance('main', 'a_proskater')?.destroy();
         (world.genocide || world.population === 0) && instance('main', 'a_clamguy')?.destroy();
         if (save.data.n.plot < 59 && game.movement) {
            const di = { x: 0, y: 0 };
            roomState.offset ??= 0;
            if (player.y <= 120) {
               di.y = 240;
               save.data.n.state_aerialis_puzzle2os++;
            } else if (player.y > 360) {
               di.y = -240;
               save.data.n.state_aerialis_puzzle2os--;
            }
            if (player.x <= 670) {
               di.x = 300;
               roomState.offset++;
               renderer.region[1].x = Infinity;
            } else if (roomState.offset > 0 && player.x > 970) {
               di.x = -300;
               roomState.offset--;
               if (roomState.offset === 0) {
                  renderer.region[1].x = 860;
               }
            }
            partyShift(di);
            const o1 = roomState.offset === 25;
            const o2 = save.data.n.state_aerialis_puzzle2os === 25;
            const o3 = save.data.n.state_aerialis_puzzle2os === -25;
            if (o1 || o2 || o3) {
               if (trueLizard() < 2) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1a());
                  const obj = fader({ fill: '#fff' });
                  await obj.alpha.modulate(timer, 1000, 1);
                  await timer.pause(400);
                  o1 && (roomState.offset -= 10);
                  o2 && (save.data.n.state_aerialis_puzzle2os -= 10);
                  o3 && (save.data.n.state_aerialis_puzzle2os += 10);
                  obj.alpha.modulate(timer, 600, 0).then(() => renderer.detach('menu', obj));
                  game.movement = true;
               } else if (world.genocide) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1b());
                  o1 && (player.x += 3);
                  o2 && (player.y += 3);
                  o3 && (player.y -= 3);
                  player.face = 'down';
                  game.movement = true;
               }
            } else if (
               roomState.offset === 30 ||
               save.data.n.state_aerialis_puzzle2os === 30 ||
               save.data.n.state_aerialis_puzzle2os === -30
            ) {
               game.movement = false;
               fader({ fill: 'white', priority: Infinity, alpha: 1 });
               roomState.offset = 100;
               await timer.pause(3000);
               exit();
            }
         }
      },
      async a_split () {
         const car = instance('main', 'megacarrier')?.object;
         if (car && !car.metadata.init) {
            car.metadata.init = true;
            const carryTime = timer.value;
            const carryY = car.y;
            car.on('tick', function () {
               this.y = sineWaver(carryTime, 4000, carryY, carryY - 5);
            });
         }
         save.data.b.a_state_hapstablook || instance('main', 'napstaseeker')?.destroy();
         (world.genocide || world.population < 2) && instance('main', 'a_madguy')?.destroy();
      }
   } as { [k in AerialisRoomKey]?: (roomState: RoomStates[k], ...args: string[]) => any },
   teleports: {
      a_start () {
         (world.genocide || world.population < 4) && instance('main', 'a_blackfire')?.destroy();
      },
      a_lift (roomState, from) {
         from === '_void' || (roomState.location = from as RoomStates['a_lift']['location']);
      },
      a_citadelevator (roomState: RoomStates['a_lift'], from) {
         from === '_void' || (roomState.location = from as RoomStates['a_lift']['location']);
      },
      a_lab_downstairs () {
         rampup();
      },
      a_lab_main (roomState) {
         rampup();
         if (save.data.n.plot < 48.1) {
            save.data.n.bad_lizard = calcBadLizard();
            save.data.n.plot = 48.1;
         }
         (trueLizard() < 2 || save.data.b.a_state_gotphone) && instance('main', 'compactlazerdeluxe')?.destroy();
         // monitor setup
         {
            const w = 240;
            const h = 160;
            const subcontainer = (roomState.subcontainer ??= new Container());
            const monitorObject = (roomState.monitorObject ??= new CosmosObject({
               scale: new CosmosPoint(60, 40).divide(w, h)
            }));
            if (!roomState.monitor) {
               roomState.monitor = true;
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
               monitorObject.filters = [ CRT ];
               const monitor = new Sprite();
               monitorObject.container.addChild(monitor);
               monitorObject.on('tick', async function () {
                  CRT.time += 0.5;
                  this.position.set(renderer.projection(new CosmosPoint(100, 47)));
                  await renderer.on('render');
                  if (player.x < 324) {
                     const pos = renderer
                        .projection(player.position.subtract(0, 25).clamp({ x: 60, y: 40 }, { y: 200 }))
                        .multiply(2);
                     const old = monitor.texture;
                     monitor.texture = CosmosBitmap.pixels2texture(
                        CosmosImage.extract.pixels(subcontainer, new Rectangle(pos.x - w / 2, pos.y - h / 2, w, h)),
                        { width: w, height: h }
                     );
                     old?.destroy(true);
                  }
               });
            }
            // get menu container
            const menu = renderer.layers.menu.container;
            // remove menu container
            renderer.application.stage.removeChild(menu);
            // remove and retrieve other containers
            const others = renderer.application.stage.removeChildren(0, renderer.application.stage.children.length);
            // populate subcontainer
            subcontainer.addChild(...others);
            // add subcontainer and (leftover) menu container to stage
            renderer.application.stage.addChild(subcontainer, menu);
            // script
            renderer.attach('base', monitorObject);
            events.on('teleport').then(() => {
               renderer.detach('base', monitorObject);
               // remove all containers again
               renderer.application.stage.removeChildren(0, renderer.application.stage.children.length);
               // restore original setup
               renderer.application.stage.addChild(...others, menu);
            });
         }
         if (
            save.data.n.plot > 48 &&
            (save.data.n.plot < 60 || (save.data.n.plot > 64.1 && save.data.n.plot < 68)) &&
            trueLizard() < 2
         ) {
            roomState.alph = lizard({ x: 324, y: 145 }, 'up');
            (instance('below', 'labdesk')!.object.objects[0] as CosmosAnimation).index = 1;
         } else {
            (instance('below', 'labdesk')!.object.objects[0] as CosmosAnimation).index = 0;
         }
         temporary(
            new CosmosText({
               alpha: 0.8,
               font: '8px DeterminationMono',
               fill: 'white',
               position: { x: 185, y: 50 },
               objects: [
                  new CosmosAnimation({ anchor: { x: 0, y: 1 }, position: { x: 45, y: 35 } }).on('tick', function () {
                     this.resources = save.data.b.water ? content.iooAMonitorguyWater : content.iooAMonitorguy;
                     player.sprite.active ? this.enable() : this.reset();
                  })
               ],
               filters: [
                  new CRTFilter({
                     curvature: 0,
                     lineContrast: 0.15,
                     lineWidth: 5,
                     noise: 0.15,
                     noiseSize: 1.5,
                     vignetting: 0.1,
                     vignettingAlpha: 0.25,
                     vignettingBlur: 0.75
                  })
               ]
            }).on('tick', function () {
               this.content = text.a_aerialis.overworld.labdisplay
                  .replace('$(x)', Math.min(save.data.n.exp, 99999).toString())
                  .replace('$(y)', Math.min(save.data.n.hp, 99999).toString())
                  .replace('$(z)', Math.min(save.data.n.g, 99999).toString())
                  .replace('$(w)', Math.floor(player.position.extentOf({ x: 210, y: 123 }) / 20).toString());
               (this.filters![0] as CRTFilter).time += 0.5;
            }),
            'below'
         );
      },
      a_lab_upstairs () {
         rampup();
      },
      a_barricade1 () {
         const b = { barricade1: 52, barricade2: 53, barricade3: 54 };
         for (const tag of Object.keys(b)) {
            const barr = instance('main', tag);
            if (barr) {
               const p = b[tag as keyof typeof b];
               if (save.data.n.plot < p && trueLizard() < 2) {
                  const m = barr.object.metadata;
                  if (!m.active) {
                     const time = timer.value;
                     m.active = true;
                     barr.object.on('tick', function () {
                        if (p <= save.data.n.plot && !this.metadata.up) {
                           this.metadata.up = true;
                           this.gravity.angle = -90;
                           this.gravity.extent = 0.8;
                           Promise.race([ timer.when(() => this.position.y <= 0), events.on('teleport') ]).then(() =>
                              barr.destroy()
                           );
                        }
                     });
                     for (const subobj of barr.object.objects) {
                        if (subobj instanceof CosmosSprite) {
                           subobj.on('tick', function () {
                              this.y = sineWaver(time, 4000, 0, -3);
                           });
                           break;
                        }
                     }
                  }
               } else {
                  barr.destroy();
               }
            }
         }
      },
      a_barricade2 () {
         const b = { barricade4: 62, barricade5: 62 };
         for (const tag of Object.keys(b)) {
            const barr = instance('main', tag);
            if (barr) {
               const p = b[tag as keyof typeof b];
               if (save.data.n.plot < p && trueLizard() < 2) {
                  const m = barr.object.metadata;
                  if (!m.active) {
                     const time = timer.value;
                     m.active = true;
                     barr.object.on('tick', function () {
                        if (p <= save.data.n.plot && !this.metadata.up) {
                           this.metadata.up = true;
                           this.gravity.angle = -90;
                           this.gravity.extent = 0.8;
                           Promise.race([ timer.when(() => this.position.y <= 0), events.on('teleport') ]).then(() =>
                              barr.destroy()
                           );
                        }
                     });
                     for (const subobj of barr.object.objects) {
                        if (subobj instanceof CosmosSprite) {
                           subobj.on('tick', function () {
                              this.y = sineWaver(time, 4000, 0, -3);
                           });
                           break;
                        }
                     }
                  }
               } else {
                  barr.destroy();
               }
            }
         }
      },
      a_puzzle1 (roomState) {
         if (save.data.n.plot < 55) {
            const ohHELLnaw = assets.sounds.deeploop2.instance(timer);
            ohHELLnaw.rate.value = 0.5;
            ohHELLnaw.gain.value = 0;
            temporary(
               new CosmosRectangle({ fill: '#fff', size: { x: 320, y: 240 } }).on('tick', function () {
                  if (save.data.n.plot < 55) {
                     const diff = (roomState.offset ?? 0) - puzzle1target;
                     const trueValue = Math.max(diff, 0) / (25 - puzzle1target);
                     this.alpha.value = trueValue * (2 / 3);
                     ohHELLnaw.gain.value = CosmosMath.bezier(trueValue, 0, 0, 1) * (1 / 2);
                     game.music!.rate.value = world.ambiance - trueValue * (1 / 10);
                     renderer.shake.value = CosmosMath.bezier(trueValue, 0, 0, 2);
                  } else {
                     this.alpha.value = 0;
                     ohHELLnaw.gain.value = 0;
                     game.music!.rate.value = world.ambiance;
                     renderer.shake.value = 0;
                  }
               }),
               'base',
               () => ohHELLnaw.stop()
            );
            const glitch = new GlitchFilter({ slices: 100, offset: 5 });
            for (const i of [ 111, 311 ]) {
               temporary(
                  new CosmosText({
                     area: renderer.area,
                     fill: '#fff',
                     anchor: 0,
                     position: { x: 160, y: i },
                     priority: i + 40,
                     font: '16px DeterminationMono',
                     metadata: { offset: roomState.offset ?? 0, gt: 0 }
                  }).on('tick', async function () {
                     if (roomState.check) {
                        this.content = '';
                     } else {
                        const diff = (roomState.offset ?? 0) - puzzle1target;
                        this.content = diff < 0 ? diff.toString() : diff > 0 ? `+${diff}` : '0';
                     }
                     if (this.metadata.offset !== roomState.offset) {
                        this.metadata.offset = roomState.offset!;
                        this.metadata.gt = timer.value + 200;
                     }
                     if (this.metadata.gt > timer.value) {
                        this.filters = [ glitch ];
                        glitch.refresh();
                     } else {
                        this.filters = null;
                     }
                  }),
                  'main'
               );
            }
            spire.metadata.min = 540;
            spire.metadata.max = 540;
            events.on('teleport').then(() => {
               spire.metadata.min = -Infinity;
               spire.metadata.max = Infinity;
            });
         } else {
            const pterm = instance('main', 'pterm')!.object;
            if (!pterm.metadata.shifted) {
               pterm.metadata.shifted = true;
               pterm.x += 340;
            }
         }
      },
      a_puzzle2 (roomState) {
         if (save.data.n.plot < 59) {
            const ohHELLnaw = assets.sounds.deeploop2.instance(timer);
            ohHELLnaw.rate.value = 0.5;
            ohHELLnaw.gain.value = 0;
            let active = true;
            temporary(
               new CosmosRectangle({ fill: '#fff', size: { x: 320, y: 240 } }).on('tick', function () {
                  if (active && save.data.n.plot < 59) {
                     // using puzzle1target is intentional here
                     const diffX = (roomState.offset ?? 0) - puzzle1target;
                     const diffY = Math.abs(save.data.n.state_aerialis_puzzle2os) - puzzle1target;
                     const trueValue = Math.max(diffX, diffY, 0) / (25 - puzzle1target);
                     this.alpha.value = trueValue * (2 / 3);
                     ohHELLnaw.gain.value = CosmosMath.bezier(trueValue, 0, 0, 1) * (1 / 2);
                     game.music!.rate.value = world.ambiance - trueValue * (1 / 10);
                     renderer.shake.value = CosmosMath.bezier(trueValue, 0, 0, 2);
                  } else {
                     this.alpha.value = 0;
                     ohHELLnaw.gain.value = 0;
                     game.music!.rate.value = world.ambiance;
                     renderer.shake.value = 0;
                  }
               }),
               'base',
               () => {
                  ohHELLnaw.stop();
                  renderer.shake.value = 0;
               }
            );
            const glitch = new GlitchFilter({ slices: 100, offset: 5 });
            for (const i of [
               { x: 1120, y: 191 },
               { x: 520, y: 191 },
               { x: 820, y: 191 },
               { x: 820, y: 431 }
            ]) {
               temporary(
                  new CosmosText({
                     area: renderer.area,
                     fill: '#fff',
                     anchor: 0,
                     position: i,
                     priority: i.y + 40,
                     metadata: { offset: { x: 0, y: save.data.n.state_aerialis_puzzle2os }, gt: 0 }
                  }).on('tick', async function () {
                     if (roomState.check) {
                        this.content = '';
                     } else {
                        const diffX = (roomState.offset ?? 0) - puzzle2target.x;
                        const diffY = save.data.n.state_aerialis_puzzle2os - puzzle2target.y;
                        this.content =
                           `${diffX < 0 ? diffX.toString() : diffX > 0 ? `+${diffX}` : ''}${
                              diffY < 0 ? diffY.toString() : diffY > 0 ? `+${diffY}` : ''
                           }` || '0';
                        if (this.content.length < 6) {
                           this.font = `${16 - Math.max(this.content.length - 2, 0)}px DeterminationMono`;
                        } else {
                           this.font = `11px DeterminationMono`;
                        }
                     }
                     if (
                        this.metadata.offset.x !== roomState.offset ||
                        this.metadata.offset.y !== save.data.n.state_aerialis_puzzle2os
                     ) {
                        this.metadata.offset.x = roomState.offset!;
                        this.metadata.offset.y = save.data.n.state_aerialis_puzzle2os;
                        this.metadata.gt = timer.value + 200;
                     }
                     if (this.metadata.gt > timer.value) {
                        this.filters = [ glitch ];
                        glitch.refresh();
                     } else {
                        this.filters = null;
                     }
                  }),
                  'main'
               );
            }
            events.on('teleport-start').then(() => {
               active = false;
               ohHELLnaw.gain.modulate(timer, 300, 0);
            });
            spire.metadata.min = 160;
            spire.metadata.max = 240;
            events.on('teleport').then(() => {
               spire.metadata.min = -Infinity;
               spire.metadata.max = Infinity;
            });
         } else {
            const pterm = instance('main', 'pterm')!.object;
            if (!pterm.metadata.shifted) {
               pterm.metadata.shifted = true;
               pterm.x -= 620;
            }
         }
      },
      async a_mettaton1 (roomState) {
         (world.genocide && save.data.n.plot < 55.1) || instance('main', 'sosorry')?.destroy();
         if (world.genocide || save.data.n.plot > 55.1) {
            for (const inst of instances('main', 'ingredient')) {
               inst.destroy();
            }
         }
         if (!world.genocide) {
            for (const inst of instances('below', 'tempgate')) {
               inst.destroy();
            }
            for (const inst of instances('above', 'tempgate')) {
               inst.destroy();
            }
         }
         if (save.data.n.plot < 55.1) {
            if (!roomState.active) {
               roomState.active = true;
               await timer.when(() => game.room === 'a_mettaton1' && player.x > 165 && game.movement);
               save.data.n.plot = 55.1;
               game.movement = false;
               game.menu = false;
               game.music?.gain.modulate(timer, 0, 0);
               if (!world.genocide) {
                  const metta = character('mettaton', mettaton1C, { x: 275, y: 235 }, 'down', {
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'mettacrafter' ] },
                     size: { x: 20, y: 15 },
                     anchor: { x: 0, y: 1 }
                  });
                  const d = metta.sprite as CosmosAnimation;
                  d.subcrop.bottom = 25;
                  await timer.when(() => {
                     d.subcrop.bottom -= 1 / 10;
                     if (d.subcrop.bottom <= 0) {
                        d.subcrop.bottom = 0;
                        return true;
                     } else {
                        return false;
                     }
                  });
                  await timer.pause(450);
                  const cam = new CosmosObject({ position: metta });
                  game.camera = cam;
                  renderer.zoom.value = 1.7;
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker1a);
                  renderer.zoom.modulate(timer, 150, 1, 1);
                  cam.position.modulate(timer, 150, { x: 230 });
                  metta.face = 'left';
                  metta.sprite.enable();
                  const random3 = random.clone();
                  const sign = new CosmosSprite({
                     anchor: 0,
                     frames: [ content.iooAArtsncrafts ],
                     position: { x: 160, y: 80 },
                     metadata: { spark: true }
                  }).on('tick', async function () {
                     if (this.metadata.spark) {
                        const size = this.compute();
                        const sx = size.x;
                        const bx = sx / -2;
                        const by = size.y / -2;
                        const ty = size.y / 2;
                        const sparkle = new CosmosAnimation({
                           active: true,
                           alpha: 0,
                           duration: 3 + Math.floor(random3.next() * 6),
                           extrapolate: false,
                           position: { x: bx + random3.next() * sx, y: size.y / -2 },
                           velocity: { y: 2 },
                           scale: 0.5 + random3.next() * 0.5,
                           resources: content.iooASparkler
                        }).on('tick', function () {
                           this.alpha.value = CosmosMath.linear(
                              CosmosMath.remap(this.y, 0, 1, by, ty),
                              0,
                              1,
                              1,
                              1,
                              1,
                              0
                           );
                        });
                        timer.post().then(() => void this.attach(sparkle));
                     }
                  });
                  const signcontainer = new CosmosRectangle({
                     alpha: 0,
                     size: { x: 320, y: 240 },
                     objects: [ sign ]
                  });
                  renderer.attach('menu', signcontainer);
                  signcontainer.alpha.modulate(timer, 1000, 1);
                  assets.sounds.sparkle.instance(timer);
                  assets.sounds.whipcrack.instance(timer);
                  const muzik = assets.music.letsmakeabombwhydontwe.instance(timer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker1b);
                  sign.metadata.spark = false;
                  await signcontainer.alpha.modulate(timer, 1000, 0);
                  renderer.detach('menu', signcontainer);
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2a1);
                  metta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2a2);
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2b);
                  metta.preset = mettaton2C;
                  metta.face = 'down';
                  metta.sprite.enable();
                  assets.sounds.clap.instance(timer);
                  await timer.pause(2250);
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker3a);
                  metta.preset = mettaton1C;
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker3b);
                  const laserbarrier1 = new CosmosHitbox({
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.x + 10 - player.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  const laserbarrier2 = new CosmosHitbox({
                     position: { x: 380, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.x + 10 - player.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  renderer.attach('main', laserbarrier1, laserbarrier2);
                  game.movement = true;
                  const ingredient1 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 214, y: 226 },
                     anchor: { y: 1 },
                     priority: 251,
                     frames: [ content.iooAHexogen ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient1 === 2 ? 1 : 0;
                  });
                  const ingredient2 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 231, y: 222 },
                     anchor: { y: 1 },
                     priority: 250.5,
                     frames: [ content.iooABeaker ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient2 === 2 ? 1 : 0;
                  });
                  const ingredient3 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 198, y: 222 },
                     anchor: { y: 1 },
                     priority: 251,
                     frames: [ content.iooAOneOilyBoi ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient3 === 2 ? 1 : 0;
                  });
                  renderer.attach('main', ingredient1, ingredient2, ingredient3);
                  await timer.when(
                     () =>
                        roomState.ingredient1 === 2 &&
                        roomState.ingredient2 === 2 &&
                        roomState.ingredient3 === 2 &&
                        game.movement
                  );
                  game.movement = false;
                  renderer.detach('main', laserbarrier2);
                  muzik.gain.modulate(timer, 3000, 0).then(() => muzik.stop());
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker4a);
                  const tpos = ingredient1.x + 27 / 2;
                  if (player.x > tpos - 30 && player.y < 250) {
                     player.walk(timer, 1.5, { x: tpos - 30 }).then(() => (player.face = 'down'));
                  }
                  await metta.position.step_legacy(timer, 6, { x: tpos });
                  await timer.pause(1250);
                  assets.sounds.rustle.instance(timer);
                  await timer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker4b);
                  assets.sounds.drumroll.instance(timer);
                  await timer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker5);
                  metta.preset = mettaton1C;
                  metta.face = 'down';
                  const bad = assets.sounds.bad.instance(timer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker6);
                  metta.face = 'right';
                  metta.sprite.enable();
                  const faduh = new CosmosRectangle({ fill: 'white', size: { x: 320, y: 240 }, alpha: 0 });
                  renderer.attach('menu', faduh);
                  assets.sounds.swing.instance(timer);
                  const cym = assets.sounds.cymbal.instance(timer);
                  await faduh.alpha.modulate(timer, 3000, 3 / 5);
                  cym.stop();
                  metta.sprite.disable();
                  // i broke the bad
                  bad.stop();
                  if (trueLizard() < 2) {
                     assets.sounds.phone.instance(timer);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7a);
                     metta.face = 'down';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7c);
                  }
                  faduh.alpha.modulate(timer, 500, 0).then(() => {
                     renderer.detach('menu', faduh);
                  });
                  await timer.pause(350);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8a1);
                  let flight = false;
                  const ba = 0.12;
                  const avol = new CosmosValue(ba);
                  const timer2 = new CosmosTimer();
                  timer2.start();
                  const minY = game.camera.position.clamp(...renderer.region).y - 120;
                  const maxY = game.camera.position.clamp(...renderer.region).y + 120 + 30;
                  const bp = new CosmosPoint({ x: 700 - 120, y: 200 - 120 });
                  const f = {
                     shift: 1,
                     thrust: 2,
                     sus: 0.1,
                     restex: 6,
                     leftX: -4,
                     rightX: 8,
                     upY: -6,
                     downY: 12,
                     drop: 0.5,
                     lt: 27.5,
                     ideal: 0.95
                  };
                  const fakepos = new CosmosPoint();
                  const fakevelo = new CosmosPoint();
                  let gas = null as null | CosmosInstance;
                  const echoAlpha = new CosmosValue(1);
                  let swit = false;
                  let dropper = false;
                  let forceDrop = false;
                  let ovu = false;
                  let ovr = false;
                  let buzzer = false;
                  const endX = 12000;
                  let stopfollow = false;
                  let stopdropandcalm = false;
                  const roombg = rooms.of(game.room).layers.below![0];
                  const OGregion = renderer.region[1].x;
                  spire.metadata.max = OGregion;
                  const jetpackSprites = save.data.b.water ? friskWaterJetpack : friskJetpack;
                  const fakeplayer = new CosmosEntity({ metadata: { f }, sprites: jetpackSprites })
                     .on('tick', {
                        priority: Infinity,
                        listener () {
                           fakevelo.set(fakevelo.clamp(-16, 16));
                           fakepos.set(fakepos.add(fakevelo));
                           if (flight) {
                              let ad = false;
                              const down = !buzzer && keys.downKey.active();
                              const up = !forceDrop && (buzzer ? ovu : keys.upKey.active());
                              const left = !buzzer && keys.leftKey.active();
                              const right = !forceDrop && (buzzer ? ovr : keys.rightKey.active());
                              if (dropper) {
                                 (down ? false : up || left || right) && (ad = true);
                                 if (stopdropandcalm) {
                                    stopdropandcalm = false;
                                    ad = true;
                                 }
                              } else {
                                 down && !swit && (ad = true);
                              }
                              if (forceDrop && !dropper) {
                                 ad = true;
                              }
                              swit === down || (swit = down);
                              if (ad) {
                                 assets.sounds.noise.instance(timer).gain.value /= 3;
                                 if ((dropper = !dropper)) {
                                    this.sprites = save.data.b.water ? friskWaterJetpackOff : friskJetpackOff;
                                 } else {
                                    this.sprites = jetpackSprites;
                                 }
                              }
                              gas && (gas.rate.value = dropper ? 0 : up ? 1.2 : left || right ? 1 : 0.8);
                              const restExL = left ? f.restex : 0;
                              const restExR = right ? f.restex : 0;
                              if (fakevelo.x > restExR) {
                                 fakevelo.x = Math.max(fakevelo.x - f.sus, restExR);
                              }
                              if (fakevelo.x < -restExL) {
                                 fakevelo.x = Math.min(fakevelo.x + f.sus, -restExL);
                              }
                              if (left && fakevelo.x > f.leftX) {
                                 fakevelo.x = Math.max(fakevelo.x - f.shift, f.leftX);
                              }
                              if (right && fakevelo.x < f.rightX) {
                                 fakevelo.x = Math.min(fakevelo.x + f.shift, f.rightX);
                              }
                              if (up && fakevelo.y > f.upY) {
                                 fakevelo.y = Math.max(fakevelo.y - f.thrust, f.upY);
                              }
                              if (dropper && fakevelo.y < f.downY) {
                                 fakevelo.y = Math.min(fakevelo.y + f.drop, f.downY);
                              }
                              if (!up && !dropper) {
                                 fakevelo.y *= f.ideal;
                              }
                              if (!buzzer || fail) {
                                 if (fakepos.y > maxY) {
                                    fakepos.y -= maxY - minY;
                                 } else if (fakepos.y < minY) {
                                    fakepos.y += maxY - minY;
                                 }
                              }
                              if (Math.abs(fakevelo.x) < 1.5) {
                                 this.face = fakevelo.y < 0 ? 'up' : 'down';
                              } else {
                                 this.face = fakevelo.x < 0 ? 'left' : 'right';
                              }
                           } else {
                              this.face = 'down';
                           }
                           fakepos.set(fakepos.clamp({ x: player.x - 20 }, {}));
                           this.position.set(fakepos.add(0, sineWaver(0, 1500, 0, -3 / (1 + Math.abs(fakevelo.y)))));
                           const echo = shadow(this.sprite, echo => (echo.alpha.value /= 1.5) < 0.00001, {
                              alpha:
                                 Math.min(CosmosMath.remap(Math.abs(fakevelo.extent), 0, 0.2, 0, f.restex), 1) *
                                 echoAlpha.value,
                              priority: -60,
                              position: this,
                              anchor: { x: 0, y: 1 },
                              velocity: { x: fakevelo.x / 5 }
                           });
                           echo.object.on('tick', function () {
                              if (!buzzer || fail) {
                                 if (this.y > maxY) {
                                    this.y -= maxY - minY;
                                 } else if (this.y < minY) {
                                    this.y += maxY - minY;
                                 }
                              }
                           });
                           renderer.attach('main', echo.object);
                           echo.promise.then(() => {
                              renderer.detach('main', echo.object);
                           });
                        }
                     })
                     .on('render', function () {
                        bp.x = Math.min(Math.max(this.x - 160, 600), endX) + fakevelo.x * f.lt;
                        if (!stopfollow) {
                           roombg.x = Math.max(this.x - 700, 0);
                        }
                     });
                  let bomspawn = 0;
                  const keepalive = 12;
                  const boosters = 16;
                  const boosterStartX = 1000;
                  const boosterTotalSpan = endX - boosterStartX * 2;
                  const boosterSep = boosterTotalSpan / boosters;
                  const boosterField = new CosmosObject({
                     priority: -500,
                     objects: CosmosUtils.populate(boosters, i => {
                        let lockY = 0;
                        const x = boosterStartX + boosterSep * i;
                        const y = game.camera.position.clamp(...renderer.region).y + (random.next() * 40 - 20);
                        const type = random.next() < 3 / 4 ? 0 : 1;
                        return new CosmosAnimation({
                           resources: content.iooABoosterStrut,
                           anchor: 0,
                           index: y <= 160 ? 0 : 1,
                           position: { x, y },
                           objects: [
                              new CosmosAnimation({
                                 resources: [ content.iooABooster, content.iooABoosterBad ][type],
                                 active: true,
                                 anchor: 0
                              })
                           ]
                        }).on('tick', function () {
                           if (Math.abs(this.x - fakepos.x) < 42 && Math.abs(this.y - (fakepos.y - 15)) < 18) {
                              fakevelo.x += [ 2, -2 ][type];
                              if (!this.metadata.thrustie) {
                                 this.metadata.thrustie = true;
                                 this.extrapolate = false;
                                 this.duration = 2;
                                 this.objects[0].filters = [ assets.filters.bloom20 ];
                                 lockY = fakepos.y;
                              }
                              fakepos.y = lockY;
                              fakevelo.y = 0;
                           } else if (this.metadata.thrustie) {
                              this.metadata.thrustie = false;
                              this.extrapolate = true;
                              this.duration = 6;
                              this.objects[0].filters = null;
                           }
                        });
                     })
                  });
                  const bomfield = new CosmosObject().on('tick', function () {
                     if (!buzzer && keepalive <= (bomspawn += 1)) {
                        bomspawn = 0;
                        const spin = random3.next() < 0.5 ? -1 : 1;
                        const bom = new OutertaleMultivisualObject(
                           {
                              spin: 2.5 * spin,
                              position: bp.add({ x: random3.next() * 320, y: -10 }),
                              gravity: { angle: 90, extent: 0.07 },
                              rotation: random3.next() * 360,
                              velocity: { y: 4 }
                           },
                           { anchor: 0 }
                        ).on('tick', async function () {
                           let rm = false;
                           if (!this.metadata.sploded) {
                              const trueplayer = fakepos.subtract(0, 16.5);
                              const diz = this.position.extentOf(trueplayer);
                              if (this.metadata.splode || (!buzzer && diz < 15)) {
                                 this.metadata.sploded = true;
                                 this.use(content.iooABomburst);
                                 this.animation.enable();
                                 this.velocity.set(0);
                                 this.spin.value = 0;
                                 this.rotation.value = 0;
                                 assets.sounds.bomb.instance(timer);
                                 buzzer ||
                                    fakevelo.set(
                                       fakevelo.add(
                                          new CosmosPoint().endpoint(
                                             this.position.add(4, 0).angleTo(trueplayer),
                                             10 / ((Math.max(diz, 15) - 10) / 10)
                                          )
                                       )
                                    );
                                 this.scale.modulate(timer, 500, 2, 2);
                                 await this.alpha.modulate(timer, 500, 0);
                                 rm = true;
                              } else if (this.y > 360) {
                                 rm = true;
                              }
                           }
                           rm && bomfield.objects.splice(bomfield.objects.indexOf(bom), 1);
                        });
                        bom.use(content.iooABom);
                        this.attach(bom);
                        const d = Math.min(Math.max(CosmosMath.remap(550 - game.camera.x, 0, 1, 160, 0), 0), 1);
                        if (d > 0) {
                           const ar = assets.sounds.arrow.instance(timer2, { store: true });
                           ar.rate.value = 0.7;
                           ar.gain.value = avol.value * d;
                        }
                     }
                  });
                  renderer.attach('below', boosterField);
                  renderer.attach('above', bomfield);
                  cam.position.step_legacy(timer, 6, { x: 600 });
                  metta.preset = mettaton2C;
                  metta.face = 'down';
                  await metta.walk(timer, 3, { x: 480 });
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8a2);
                  metta.preset = mettaton1C;
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8b);
                  metta.face = 'right';
                  const supriseurdeadWHAT = assets.music.gameshow.instance(timer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker9);
                  let t = 90;
                  let fail = false;
                  const timertext = new CosmosText({
                     fill: 'white',
                     font: '14px MarsNeedsCunnilingus',
                     position: { x: 66, y: 5 }
                  }).on('tick', async function () {
                     if (!buzzer) {
                        const prex = Math.floor(t);
                        t -= 1 / 30;
                        const postx = Math.floor(t);
                        if (postx < prex && prex > 0) {
                           assets.sounds.select.instance(timer).rate.value = 1.7;
                           if (postx <= 10) {
                              this.fill = postx <= 5 ? (this.fill = '#f00') : '#ff0';
                              await timer.pause(133);
                              assets.sounds.select.instance(timer).rate.value = 1.7;
                              if (postx <= 5) {
                                 await timer.pause(133);
                                 if (postx === 0) {
                                    if (!buzzer) {
                                       fail = true;
                                       buzzer = true;
                                    }
                                 } else {
                                    assets.sounds.select.instance(timer).rate.value = 1.7;
                                 }
                              }
                           }
                           this.content = text.a_aerialis.story.cooker14.replace(
                              '$(x)',
                              postx.toString().padStart(2, '0')
                           );
                        }
                     }
                  });
                  const timersprite = new CosmosSprite({
                     position: { x: -101 },
                     frames: [ content.iooATimer ],
                     objects: [ timertext ]
                  });
                  const startX = 530;
                  function pd () {
                     return Math.round(((Math.max(fakepos.x, startX) - startX) / (endX - startX)) * 100);
                  }
                  const distancesprite = new CosmosSprite({
                     position: { x: 320 },
                     frames: [ content.iooAProgresser ],
                     objects: [
                        new CosmosText({
                           fill: 'white',
                           font: '14px MarsNeedsCunnilingus',
                           position: { x: 8, y: 5 }
                        }).on('tick', async function () {
                           if (!buzzer) {
                              this.content = text.a_aerialis.story.cooker15.replace(
                                 '$(x)',
                                 pd().toString().padStart(2, '0')
                              );
                           }
                        })
                     ]
                  });
                  renderer.attach('menu', timersprite, distancesprite);
                  timersprite.position.modulate(timer, 1200, { x: 0 }, { x: 0 });
                  distancesprite.position.modulate(timer, 1200, { x: 320 - 101 }, { x: 320 - 101 });
                  await Promise.all([
                     cam.position.step_legacy(timer, 9, { x: player.x }).then(() => {
                        game.camera = player;
                     }),
                     dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker10)
                  ]);
                  renderer.detach('main', metta);
                  roomState.danger = true;
                  game.movement = true;
                  await timer.when(() => t <= 10 || player.x > 500);
                  if (atlas.navigator !== null) {
                     await typer.text('');
                  }
                  const progress = player.x > 500;
                  if (progress) {
                     game.movement = false;
                     renderer.detach('main', laserbarrier1);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker11);
                     if (trueLizard() < 2) {
                        assets.sounds.phone.instance(timer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker12());
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker12x);
                     }
                     let spintick = 0;
                     function spinHandler () {
                        if (spintick++ === 2) {
                           spintick = 0;
                           player.face = (
                              { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                                 CosmosDirection,
                                 CosmosDirection
                              >
                           )[player.face];
                        }
                     }
                     player.on('tick', spinHandler);
                     const dy = player.y;
                     player.velocity.set(1.5, -7);
                     player.gravity.angle = 90;
                     player.gravity.extent = 0.3;
                     timer.speed.modulate(timer, 1350, 0.1);
                     timer2.speed.modulate(timer, 1350, 0.1);
                     await timer.when(() => player.velocity.y > 0);
                     const fader = new CosmosRectangle({ size: { x: 320, y: 240 }, fill: '#fff', alpha: 0 });
                     renderer.attach('menu', fader);
                     fader.alpha.modulate(timer, 450, 1);
                     avol.modulate(timer, 450, 0);
                     supriseurdeadWHAT.gain.modulate(timer, 450, 0).then(() => {
                        supriseurdeadWHAT.stop();
                     });
                     await timer.when(() => player.y > dy - 40);
                     player.gravity.angle = 0;
                     player.gravity.extent = 0;
                     player.velocity.set(0, 0);
                     timer.speed.modulate(timer, 0, 1);
                     await timer.pause(450);
                     assets.sounds.upgrade.instance(timer);
                     fakepos.set(player);
                     fakeplayer.face = 'right';
                     player.off('tick', spinHandler);
                     renderer.detach('main', player);
                     renderer.attach('main', fakeplayer);
                     game.camera = fakeplayer;
                     await timer.pause(350);
                     timer2.speed.modulate(timer2, 0, 1);
                     gas = assets.sounds.jetpack.instance(timer);
                     gas.rate.value = 0.8;
                     gas.gain.value = 0;
                     avol.modulate(timer, 650, ba);
                     gas.gain.modulate(timer, 650, 0.1);
                     await fader.alpha.modulate(timer, 650, 0);
                     renderer.detach('menu', fader);
                     await timer.pause(850);
                     if (trueLizard() < 2) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker13());
                        assets.sounds.equip.instance(timer);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker13x);
                     }
                     game.interact = false;
                     const muzak = assets.music.letsflyajetpackwhydontwe.instance(timer);
                     muzak.gain.value /= 3;
                     muzak.gain.modulate(timer, 500, muzak.gain.value * 3);
                     flight = true;
                     renderer.region[1].x = Infinity;
                     await timer.when(() => buzzer || endX <= fakepos.x);
                     buzzer = true;
                     game.movement = false;
                     stopdropandcalm = true;
                     muzak.gain.modulate(timer, 2000, 0).then(() => muzak.stop());
                     if (fail) {
                        await timer.pause(133);
                        timertext.alpha.value = 0;
                        await timer.pause(133);
                        timertext.alpha.value = 1;
                        assets.sounds.select.instance(timer).rate.value = 1.7;
                        await timer.pause(133);
                        timertext.alpha.value = 0;
                        await timer.pause(133);
                        timertext.alpha.value = 1;
                        assets.sounds.select.instance(timer).rate.value = 1.7;
                        await timer.pause(133 * 6);
                     }
                  } else {
                     buzzer = true;
                  }
                  Promise.all([
                     timersprite.position.modulate(timer, 1200, timersprite.position.value(), { x: -101 }),
                     distancesprite.position.modulate(timer, 1200, distancesprite.position.value(), { x: 320 })
                  ]).then(() => {
                     renderer.detach('menu', timersprite, distancesprite);
                  });
                  function r2p () {
                     game.camera = player;
                     stopfollow = true;
                     roombg.x = 0;
                     renderer.region[1].x = OGregion;
                     spire.metadata.max = Infinity;
                     player.face = fakeplayer.face;
                     renderer.detach('main', fakeplayer);
                     renderer.attach('main', player);
                  }
                  const mettpos = new CosmosPoint({ x: 660, y: 80 });
                  const flymet = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     resources: content.iocMettatonFlyer
                  }).on('tick', function () {
                     this.position.set(mettpos.add(0, sineWaver(0, 1500, 0, -3)));
                  });
                  const mttarget1 = { x: 840, y: 160 };
                  const mttarget2 = { y: 80 };
                  async function fd () {
                     const r = fader();
                     await r.alpha.modulate(timer, 600, 1);
                     await timer.pause(1000);
                     await renderer.on('render');
                     player.position.set(900, 220);
                     r2p();
                     renderer.detach('below', boosterField);
                     renderer.detach('above', bomfield);
                     renderer.attach('main', flymet);
                     mettpos.set(mttarget1);
                     await r.alpha.modulate(timer, 600, 0);
                     renderer.detach('menu', r);
                     await timer.pause(450);
                  }
                  async function flyaway () {
                     await mettpos.modulate(timer, 1100, mettpos.value(), mttarget2);
                     renderer.detach('main', flymet);
                     await timer.pause(650);
                     assets.sounds.phone.instance(timer);
                  }
                  if (fail) {
                     await timer.pause(133);
                     for (const bom of bomfield.objects) {
                        bom.metadata.splode = true;
                        await renderer.on('tick');
                     }
                     await timer.pause(1333);
                     game.interact = true;
                     if (pd() < 50) {
                        save.data.n.state_aerialis_crafterresult = 1;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17a);
                     } else {
                        save.data.n.state_aerialis_crafterresult = 2;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17b);
                     }
                     gas?.gain.modulate(timer, 600, 0).then(() => {
                        gas!.stop();
                     });
                     await fd();
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17c);
                     await flyaway();
                     if (!save.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17e);
                     }
                     if (trueLizard() < 2) {
                        assets.sounds.phone.instance(timer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19b);
                     }
                  } else if (progress) {
                     ovr = true;
                     await Promise.all([
                        (async () => {
                           if (fakevelo.x < 6.5) {
                              await timer.when(() => 6.5 <= fakevelo.x);
                           }
                        })(),
                        (async () => {
                           if (fakepos.y > 200) {
                              ovu = true;
                              await Promise.all([ timer.pause(70), timer.when(() => fakepos.y < 220) ]);
                              ovu = false;
                           }
                           await timer.when(() => Math.abs(fakevelo.y) < 0.5);
                        })()
                     ]);
                     ovr = false;
                     stopfollow = true;
                     renderer.region[1].x = OGregion + roombg.x;
                     await timer.when(() => fakepos.x - roombg.x > CosmosMath.remap(fakepos.y, 820, 870, 80, 180));
                     forceDrop = true;
                     await timer.when(() => 220 <= fakepos.y);
                     fakepos.y = 220;
                     renderer.detach('below', boosterField);
                     renderer.detach('above', bomfield);
                     player.position.set(fakepos.subtract(roombg.x, 0));
                     r2p();
                     gas?.stop();
                     assets.sounds.landing.instance(timer);
                     shake(1, 500);
                     await timer.pause(350);
                     renderer.attach('main', flymet);
                     await mettpos.modulate(
                        timer,
                        1500,
                        { x: mettpos.x, y: (160 + mttarget1.y) / 2 },
                        mttarget1,
                        mttarget1
                     );
                     game.interact = true;
                     if (Math.floor(t) <= 5) {
                        save.data.n.state_aerialis_crafterresult = 3;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18b);
                     } else {
                        save.data.n.state_aerialis_crafterresult = 4;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18a);
                     }
                     await timer.pause(1500);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18c);
                     mettpos.modulate(timer, 1100, mettpos.value(), mttarget2).then(() => {
                        renderer.detach('main', flymet);
                     });
                     if (!save.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17d);
                     }
                     if (trueLizard() < 2) {
                        assets.sounds.phone.instance(timer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19a);
                     }
                  } else {
                     supriseurdeadWHAT.stop();
                     game.movement = false;
                     renderer.attach('main', metta);
                     metta.preset = mettaton2C;
                     if (player.x < 270) {
                        metta.position.set(player.position.add(180, 0));
                        await metta.walk(timer, 3, player.position.add(40, 0));
                     } else {
                        metta.position.set(player.position.subtract(180, 0));
                        await metta.walk(timer, 3, player.position.subtract(40, 0));
                     }
                     metta.preset = mettaton3C;
                     metta.face = 'right';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16a);
                     await timer.pause(1000);
                     metta.preset = mettaton3C;
                     metta.face = 'left';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16b);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16c);
                     metta.preset = mettaton2C;
                     metta.face = 'right';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16d);
                     await fd();
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16e);
                     await flyaway();
                     if (!save.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16f);
                     }
                     if (trueLizard() < 2) {
                        assets.sounds.phone.instance(timer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19c);
                     }
                  }
                  renderer.detach('main', metta, laserbarrier1, laserbarrier2, ingredient1, ingredient2, ingredient3);
                  save.data.n.plot = 56;
               } else {
                  assets.sounds.phone.instance(timer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller3);
                  const supriseurdeadWHAT = assets.music.gameshow.instance(timer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller4);
                  await endCall('dialoguerBottom');
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller4x);
                  const laserbarrier1 = new CosmosHitbox({
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.x + 10 - player.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  renderer.attach('main', laserbarrier1);
                  game.movement = true;
                  await timer.when(() => player.x > 290 && game.movement);
                  game.movement = false;
                  supriseurdeadWHAT.stop();
                  await timer.pause(950);
                  const cam = new CosmosObject({ position: player });
                  game.camera = cam;
                  await cam.position.modulate(timer, 850, { x: 370 });
                  await timer.pause(1150);
                  const sosorry = instance('main', 'sosorry')!.object.objects[0] as CosmosAnimation;
                  speech.targets.add(sosorry);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX1);
                  speech.targets.delete(sosorry);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX2);
                  sosorry.use(content.ionASosorryBack);
                  speech.targets.add(sosorry);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX3);
                  sosorry.use(content.ionASosorryFront);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX4);
                  speech.targets.delete(sosorry);
                  await timer.pause(950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX5a);
                  sosorry.use(content.ionASosorryBack);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX5b);
                  await timer.pause(650);
                  sosorry.use(content.ionASosorryFront);
                  await timer.pause(850);
                  speech.targets.add(sosorry);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX6);
                  speech.targets.delete(sosorry);
                  await timer.pause(450);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX7);
                  await cam.position.modulate(timer, 850, { x: player.x });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX8);
                  game.movement = true;
                  game.camera = player;
                  await timer.when(() => player.x > 800 && game.movement);
                  game.movement = false;
                  assets.sounds.phone.instance(timer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX9);
                  renderer.detach('main', laserbarrier1);
                  save.data.n.plot = 56;
                  instance('main', 'sosorry')?.destroy();
               }
               await endCall('dialoguerBottom');
               game.music!.gain.value = world.level;
               game.movement = true;
               game.menu = true;
            }
         }
      },
      async a_mettaton2 (roomState) {
         if (save.data.n.plot < 59.1) {
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide) {
                  const mettpos = new CosmosPoint({ x: 500, y: 80 });
                  const metta = new OutertaleMultivisualObject({}, { active: true, anchor: { x: 0, y: 1 } }).on(
                     'tick',
                     function () {
                        this.position.set(mettpos.add(0, sineWaver(0, 1500, 0, -3)));
                     }
                  );
                  renderer.attach('main', metta);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await timer.when(() => (game.room !== 'a_mettaton2' || player.x <= 680) && game.movement);
                  if (game.room !== 'a_mettaton2') {
                     roomState.active = false;
                     renderer.detach('main', metta);
                     return;
                  }
                  save.data.n.plot = 59.1;
                  game.menu = false;
                  game.movement = false;
                  game.music?.gain.modulate(timer, 0, 0);
                  const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
                  game.camera = cam;
                  await timer.pause(650);
                  await cam.position.modulate(timer, 1200, { x: 500 });
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre1());
                  metta.use(content.iocMettatonAnchorDotdotdot);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre2);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre3);
                  const over = fader();
                  await Promise.all([
                     player.walk(timer, 3, { x: player.x - 3 * (1500 / (100 / 3)) }),
                     over.alpha.modulate(timer, 1500, 1)
                  ]);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre4);
                  const startpos = { x: 330, y: 150 };
                  player.position.set(startpos);
                  await over.alpha.modulate(timer, 1000, 0);
                  await timer.pause(850);
                  const baserot = -90;
                  const lights = new CosmosObject({
                     position: { y: 130 },
                     priority: -9999,
                     objects: [
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 390 },
                           rotation: baserot - 10,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 450 },
                           rotation: baserot,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 550 },
                           rotation: baserot,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 610 },
                           rotation: baserot + 10,
                           frames: [ content.iooABeam ]
                        })
                     ]
                  });
                  renderer.attach('below', lights);
                  const ratio = 2 ** (1 / 12);
                  header('x1').then(() => {
                     lights.objects[0].alpha.value = 1;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 1;
                  });
                  header('x2').then(() => {
                     lights.objects[1].alpha.value = 1;
                     lights.objects[2].alpha.value = 1;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 2;
                  });
                  header('x3').then(() => {
                     lights.objects[3].alpha.value = 1;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 3;
                  });
                  function mettaEmotes (h: string) {
                     if (h[0] === 'z') {
                        metta.use(
                           [
                              content.iocMettatonAnchorFlyer,
                              content.iocMettatonAnchorDotdotdot,
                              content.iocMettatonAnchorPoint,
                              content.iocMettatonAnchorG,
                              content.iocMettatonAnchorLaugh,
                              content.iocMettatonAnchorOMG
                           ][+h[1]]
                        );
                     }
                  }
                  typer.on('header', mettaEmotes);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro1);
                  const showmus = assets.music.gameshow.instance(timer);
                  assets.sounds.applause.instance(timer);
                  await timer.pause(1350);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro2);
                  assets.sounds.drumroll.instance(timer);
                  await timer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro3a);
                  assets.sounds.applause.instance(timer);
                  const sand = character('sans', characters.sans, startpos, 'right');
                  await sand.walk(timer, 3, { x: 400 });
                  await timer.pause(350);
                  sand.preset = characters.sansSpecial;
                  sand.face = 'down';
                  await timer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro3b());
                  sand.preset = characters.sans;
                  sand.walk(timer, 3, { y: 195 }, { x: 440, y: 195 }, { x: 440, y: 185 });
                  await timer.pause(1250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro4a);
                  assets.sounds.clap.instance(timer);
                  const napsta = character('napstablook', characters.napstablook, startpos, 'right');
                  napsta.walk(timer, 3, { x: 390 }, { x: 390, y: 195 }, { x: 480, y: 195 }, { x: 480, y: 185 });
                  await timer.pause(250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro4b);
                  await timer.pause(1250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro5a);
                  player.walk(timer, 3, { x: 400 }, { x: 400, y: 195 }, { x: 520, y: 195 }, { x: 520, y: 185 });
                  await timer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro6a);
                  assets.sounds.clap.instance(timer);
                  const zad = save.data.n.state_foundry_muffet === 1;
                  if (zad) {
                     await timer.pause(2850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro8);
                  } else {
                     metta.use(content.iocMettatonAnchorFlyer);
                  }
                  const key = zad ? 'tem' : 'kidd';
                  const kidd = character(key, characters[key], startpos, 'right');
                  await kidd.walk(timer, 4, { x: 400 });
                  if (zad) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro9);
                  } else {
                     for (const spr of Object.values(kidd.sprites)) {
                        spr.duration = 4;
                     }
                     kidd.sprite.enable();
                     await timer.pause(450);
                     kidd.face = 'left';
                     kidd.sprite.enable();
                     await timer.pause(450);
                     kidd.face = 'up';
                     kidd.sprite.enable();
                     await timer.pause(450);
                     kidd.face = 'down';
                     kidd.sprite.enable();
                     await timer.pause(650);
                     kidd.sprite.disable();
                     await timer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro6b());
                  }
                  showmus.gain.modulate(timer, 2000, 0).then(() => showmus.stop());
                  kidd.walk(timer, 4, { x: 400, y: 195 }, { x: 560, y: 195 }, { x: 560, y: 185 });
                  if (zad) {
                     await timer.pause(450);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro10);
                  }
                  await timer.pause(1650);
                  zad && (await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro11));
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro7);
                  await Promise.all([
                     lights.objects[0].rotation.modulate(timer, 1000, baserot - 10, baserot - 60, baserot - 60),
                     lights.objects[1].rotation.modulate(timer, 1000, baserot, baserot - 20, baserot - 20),
                     lights.objects[2].rotation.modulate(timer, 1000, baserot, baserot + 20, baserot + 20),
                     lights.objects[3].rotation.modulate(timer, 1000, baserot + 10, baserot + 60, baserot + 60)
                  ]);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await timer.pause(150);
                  const overlay2 = new CosmosObject({ alpha: 0.7, priority: -10 });
                  const spotlightgraphics = new Graphics();
                  function spotlightpos (pos: CosmosPointSimple) {
                     assets.sounds.noise.instance(timer);
                     spotlightgraphics
                        .clear()
                        .beginFill(0, 1)
                        .drawRect(0, 0, 320, 240)
                        .endFill()
                        .beginHole()
                        .drawEllipse(renderer.projection(pos).x, 170, 20, 30)
                        .endHole();
                  }
                  overlay2.container.addChild(spotlightgraphics);
                  renderer.attach('menu', overlay2);
                  function lightState (...indexes: number[]) {
                     let i = 0;
                     while (i < 4) {
                        lights.objects[i].alpha.value = indexes.includes(i) ? 1 : 0;
                        i++;
                     }
                  }
                  lightState(0);
                  const gterm1 = instance('main', 'gterm1')!.object;
                  spotlightpos(gterm1);
                  await timer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat1());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat1a());
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat1b());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat1c());
                  await timer.pause(950);
                  lightState(1);
                  const gterm2 = instance('main', 'gterm2')!.object;
                  spotlightpos(gterm2);
                  await timer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2);
                  sand.face = 'right';
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2a());
                  timer.pause(850).then(() => (sand.face = 'up'));
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2b());
                  await timer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat2c);
                  await timer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2d);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat2e);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await timer.pause(950);
                  lightState(2);
                  const gterm3 = instance('main', 'gterm3')!.object;
                  spotlightpos(gterm3);
                  await timer.pause(2650);
                  napsta.face = 'right';
                  await timer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat3);
                  await timer.pause(850);
                  napsta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat3a);
                  await timer.pause(650);
                  lightState(3);
                  const gterm4 = instance('main', 'gterm4')!.object;
                  spotlightpos(gterm4);
                  await timer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat4a());
                  await timer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4b());
                  await timer.pause(1250);
                  if (save.data.n.state_foundry_muffet === 1) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4c1);
                  } else {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4c2());
                  }
                  overlay2.alpha.modulate(timer, 1500, 0);
                  await Promise.all([
                     lights.objects[0].alpha.modulate(timer, 1000, 1),
                     lights.objects[1].alpha.modulate(timer, 1000, 1),
                     lights.objects[2].alpha.modulate(timer, 1000, 1)
                  ]);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat5());
                  //const introsong = assets.music.weakestlinkIntro.instance(timer);
                  //introsong.gain.value /= 8;
                  //introsong.gain.modulate(timer, 1000, introsong.gain.value * 8);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr1);
                  //assets.music.weakestlinkSting.instance(timer);
                  lights.objects[0].rotation.modulate(timer, 1500, baserot - 60, baserot + 20, baserot + 20);
                  lights.objects[1].rotation.modulate(timer, 1500, baserot - 20, baserot + 10, baserot + 10);
                  lights.objects[2].rotation.modulate(timer, 1500, baserot + 20, baserot - 10, baserot - 10);
                  lights.objects[3].rotation.modulate(timer, 1500, baserot + 60, baserot - 20, baserot - 20);
                  await timer.pause(850);
                  //await introsong.gain.modulate(timer, 3000, 0).then(() => introsong.stop());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr2);
                  header('x1').then(() => {
                     lights.objects[0].alpha.value = 0;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 4;
                  });
                  header('x2').then(() => {
                     lights.objects[1].alpha.value = 0;
                     lights.objects[2].alpha.value = 0;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 5;
                  });
                  header('x3').then(() => {
                     lights.objects[3].alpha.value = 0;
                     assets.sounds.orchhit.instance(timer).rate.value = ratio ** 6;
                  });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr3);
                  await timer.pause(1000);
                  lights.objects[0].rotation.value = baserot - 60;
                  lights.objects[1].rotation.value = baserot - 20;
                  lights.objects[2].rotation.value = baserot + 20;
                  lights.objects[3].rotation.value = baserot + 60;
                  //assets.music.weakestlinkHit.instance(timer);
                  const gterm1anim = gterm1.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm2anim = gterm2.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm3anim = gterm3.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm4anim = gterm4.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;

                  const carryY = new CosmosValue(-20);
                  const carryTime = timer.value;
                  const itemcarrier = new CosmosAnimation({
                     active: true,
                     position: { x: 500 },
                     priority: 100,
                     resources: content.iooACarrier,
                     anchor: { x: 0 }
                  }).on('tick', function () {
                     this.y = sineWaver(carryTime, 4000, carryY.value, carryY.value - 5);
                  });
                  renderer.attach('main', itemcarrier);

                  async function moneyRound (
                     resour: CosmosImage | CosmosAnimationResources,
                     texts: CosmosKeyed<CosmosProvider<string[]>, 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'>,
                     c1time: number,
                     c1guess: number,
                     c2time: number,
                     c2guess: number,
                     c4time: number,
                     c4guess: number,
                     turnTime: number,
                     trueValue: number,
                     special = false
                  ) {
                     let v = 0;
                     let t = turnTime;
                     const spr = new OutertaleMultivisualObject({ position: { y: 8 } }, { anchor: { x: 0, y: 1 } });
                     spr.use(resour);
                     itemcarrier.objects = [ spr ];
                     carryY.modulate(timer, 2000, 100, 100);
                     await timer.pause(500);
                     const hy = CosmosUtils.hyperpromise();
                     if (special) {
                        await timer.pause(1200);
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyFinal2);
                        await timer.pause(850);
                        if (trueLizard() < 2) {
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal3);
                           assets.sounds.phone.instance(timer);
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal4);
                           await endCall('dialoguerBottom');
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal5);
                        } else {
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal6);
                        }
                     }
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.a));
                     let done = false;
                     const guessermusic = assets.music.letsmakeabombwhydontwe.instance(timer, { offset: 42.25 });
                     guessermusic.rate.value = 1.1;
                     guessermusic.gain.value /= 10;
                     guessermusic.gain.modulate(timer, 1500, guessermusic.gain.value * 10);
                     await Promise.all([
                        c1time > 0 && lights.objects[0].alpha.modulate(timer, 1000, 0.5),
                        lights.objects[1].alpha.modulate(timer, 1000, 0.5),
                        lights.objects[2].alpha.modulate(timer, 1000, 0.5),
                        c4time > 0 && lights.objects[3].alpha.modulate(timer, 1000, 0.5)
                     ]);
                     const timertext = new CosmosText({
                        fill: 'white',
                        font: '14px MarsNeedsCunnilingus',
                        position: { x: 379 + 66, y: 22 + 5 }
                     }).on('tick', async function () {
                        if (!done) {
                           const prex = Math.floor(t);
                           t -= 1 / 30;
                           const postx = Math.floor(t);
                           if (postx < prex && prex > 0) {
                              assets.sounds.select.instance(timer).rate.value = 1.7;
                              if (postx <= 10) {
                                 this.fill = postx <= 5 ? (this.fill = '#f00') : '#ff0';
                                 await timer.pause(133);
                                 assets.sounds.select.instance(timer).rate.value = 1.7;
                                 if (postx <= 5) {
                                    await timer.pause(133);
                                    if (postx === 0) {
                                       assets.sounds.select.instance(timer).rate.value = 1.7;
                                       await timer.pause(133);
                                       timertext.alpha.value = 0;
                                       await timer.pause(133);
                                       timertext.alpha.value = 1;
                                       assets.sounds.select.instance(timer).rate.value = 1.7;
                                       await timer.pause(133);
                                       timertext.alpha.value = 0;
                                       await timer.pause(133);
                                       timertext.alpha.value = 1;
                                       assets.sounds.select.instance(timer).rate.value = 1.7;
                                       hy.resolve();
                                    } else {
                                       assets.sounds.select.instance(timer).rate.value = 1.7;
                                    }
                                 }
                              }
                              this.content = text.a_aerialis.story.cooker14.replace(
                                 '$(x)',
                                 postx.toString().padStart(2, '0')
                              );
                           }
                        }
                     });
                     let hchoose = false;
                     const infobox = menuBox(32, 320 + 38, 566, 140 - 38, 6, {
                        objects: [
                           new CosmosText({
                              fill: 'white',
                              font: '16px DeterminationMono',
                              position: { x: 11, y: 9 },
                              spacing: { x: 0, y: 5 },
                              stroke: 'transparent'
                           }).on('tick', function () {
                              this.content = (
                                 hchoose
                                    ? text.a_aerialis.story.moneyHelperConfirmed
                                    : text.a_aerialis.story.moneyHelper
                              ).replace('$(x)', v.toString());
                           })
                        ]
                     });
                     if (special && trueLizard() < 2) {
                        napsta.face = 'right';
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper1());
                        if (choicer.result === 0) {
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper2a);
                        } else {
                           save.data.b.a_state_napstadecline = true;
                           if (!save.data.b.oops) {
                              oops();
                              await timer.pause(1000);
                           }
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper2b);
                        }
                        await timer.pause(450);
                        napsta.face = 'up';
                        await timer.pause(850);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyWhisper3);
                        await timer.pause(650);
                        if (choicer.result === 0) {
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper4);
                        } else {
                           await timer.pause(1000);
                        }
                     }
                     renderer.attach('menu', infobox);
                     turnTime > 0 && renderer.attach('main', timertext);
                     let presstimer = 0;
                     let pr = null as 'left' | 'right' | null;
                     function bump (amount: number) {
                        const pre_v = v;
                        v = Math.min(Math.max(v + amount, 0), 10000);
                        v === pre_v || assets.sounds.menu.instance(timer);
                     }
                     const lefty1 = () => {
                        pr = 'left';
                        presstimer = timer.value;
                        bump(-1);
                     };
                     const lefty2 = () => pr === 'left' && (pr = null);
                     const righty1 = () => {
                        pr = 'right';
                        presstimer = timer.value;
                        bump(1);
                     };
                     const righty2 = () => pr === 'right' && (pr = null);
                     const ticky = () => {
                        const offset = timer.value - presstimer;
                        if (pr === 'left') {
                           if (offset > 3000) {
                              bump(-8);
                           } else if (offset > 2000) {
                              bump(-4);
                           } else if (offset > 1000) {
                              bump(-2);
                           } else if (offset > 400) {
                              bump(-1);
                           }
                        } else if (pr === 'right') {
                           if (offset > 3000) {
                              bump(8);
                           } else if (offset > 2000) {
                              bump(4);
                           } else if (offset > 1000) {
                              bump(2);
                           } else if (offset > 400) {
                              bump(1);
                           }
                        }
                     };
                     keys.leftKey.on('down', lefty1);
                     keys.leftKey.on('up', lefty2);
                     keys.rightKey.on('down', righty1);
                     keys.rightKey.on('up', righty2);
                     renderer.on('tick', ticky);
                     let finalValue = 0;
                     const [ chosenContestant, winningValue ] = [
                        ...[ c1guess, save.data.b.a_state_napstadecline ? 500 : c2guess, 0, c4guess ].entries()
                     ]
                        .filter(([ i, v ]) => v <= trueValue)
                        .sort((a, b) => b[1] - a[1])[0];
                     let monsterTime = 0;
                     let humanTime = 0;
                     await Promise.all([
                        c1time > 0 &&
                           timer.pause(c1time).then(() => {
                              gterm1anim.index = 4;
                              assets.sounds.purchase.instance(timer).rate.value = 1.5;
                              lights.objects[0].tint = 0xff0000;
                              if (chosenContestant === 0) {
                                 monsterTime = timer.value;
                              }
                           }),
                        timer.pause(save.data.b.a_state_napstadecline ? 18600 : c2time).then(() => {
                           gterm2anim.index = 4;
                           assets.sounds.purchase.instance(timer).rate.value = 1.5;
                           lights.objects[1].tint = 0xff0000;
                           if (chosenContestant === 1) {
                              monsterTime = timer.value;
                           }
                        }),
                        Promise.race([ keys.interactKey.on('down'), hy.promise ]).then(() => {
                           hy.resolve();
                           gterm3anim.index = 4;
                           assets.sounds.purchase.instance(timer).rate.value = 1.5;
                           lights.objects[2].tint = 0xff0000;
                           renderer.detach('menu', infobox);
                           keys.leftKey.off('down', lefty1);
                           keys.leftKey.off('up', lefty2);
                           keys.rightKey.off('down', righty1);
                           keys.rightKey.off('up', righty2);
                           renderer.off('tick', ticky);
                           finalValue = v;
                           humanTime = timer.value;
                           hchoose = true;
                        }),
                        c4time > 0 &&
                           timer.pause(c4time).then(() => {
                              gterm4anim.index = 4;
                              assets.sounds.purchase.instance(timer).rate.value = 1.5;
                              lights.objects[3].tint = 0xff0000;
                              if (chosenContestant === 3) {
                                 monsterTime = timer.value;
                              }
                           })
                     ]);
                     done = true;
                     await timer.pause(500);
                     guessermusic.gain.modulate(timer, 2500, 0).then(() => guessermusic.stop());
                     lights.alpha.modulate(timer, 1000, 0).then(() => {
                        lights.objects[0].alpha.value = 0;
                        lights.objects[1].alpha.value = 0;
                        lights.objects[2].alpha.value = 0;
                        lights.objects[3].alpha.value = 0;
                        lights.objects[0].tint = void 0;
                        lights.objects[1].tint = void 0;
                        lights.objects[2].tint = void 0;
                        lights.objects[3].tint = void 0;
                        lights.alpha.value = 1;
                     });
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.b));
                     assets.sounds.drumroll.instance(timer);
                     await timer.pause(1450);
                     const moneytext = new CosmosText({
                        anchor: 0,
                        fill: 'white',
                        font: '14px MarsNeedsCunnilingus',
                        position: { x: 540, y: 32 },
                        scale: 0,
                        content: trueValue.toString()
                     });
                     renderer.attach('main', moneytext);
                     moneytext.scale.modulate(timer, 200, 1);
                     await timer.pause(950);
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.c));
                     timertext.alpha.modulate(timer, 600, 0).then(() => {
                        renderer.detach('main', timertext);
                     });
                     moneytext.alpha.modulate(timer, 600, 0).then(() => {
                        renderer.detach('main', moneytext);
                     });
                     carryY.modulate(timer, 2000, carryY.value, -20).then(() => {
                        itemcarrier.objects = [];
                     });
                     await timer.pause(450);
                     let x: boolean;
                     if (finalValue === winningValue) {
                        if (monsterTime <= humanTime) {
                           await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.f));
                           x = true;
                        } else {
                           await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.g));
                           x = false;
                        }
                     } else if (finalValue > winningValue && finalValue <= trueValue) {
                        await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.e));
                        x = false;
                     } else {
                        await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.d));
                        x = true;
                     }
                     gterm1anim.index = 0;
                     gterm2anim.index = 0;
                     gterm3anim.index = 0;
                     gterm4anim.index = 0;
                     save.data.n.state_aerialis_valuediff += Math.abs(trueValue - finalValue);
                     return x;
                  }
                  let noitem = false;
                  if (
                     (save.data.b.a_state_moneyitemA = !(await moneyRound(
                        content.iooAMoneyRadio, // item sprite
                        text.a_aerialis.story.moneyItem1, // text
                        9100, // sans guess timer (ms)
                        70, // sans price
                        3700, // napstablook guess timer (ms)
                        40, // napstablook price
                        8100, // monty guess timer (ms)
                        150, // monty price
                        20, // human guess timer (sec)
                        80 // true price
                     )))
                  ) {
                     if (save.storage.inventory.size < 8) {
                        save.data.b.item_tvm_radio = true;
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('tvm_radio');
                        await dialogue('auto', ...text.a_aerialis.story.moneyItemPut1);
                     } else if (!noitem) {
                        noitem = true;
                        await dialogue('auto', ...text.a_aerialis.story.moneyItemPut4);
                     }
                  }
                  await timer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote1);
                  await timer.pause(1250);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote2());
                  await timer.pause(950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote2a());
                  await timer.pause(950);
                  let hv = 0;
                  let sv = 0;
                  async function comedy () {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyPun1);
                     sand.preset = characters.sansSpecial;
                     sand.face = 'up';
                     const zoom = 1.8;
                     const area = new CosmosValue(320);
                     const size = 320 / zoom;
                     const start = renderer.position.clamp(...renderer.region);
                     const region = renderer.region;
                     const duration = 266;
                     renderer.region = [
                        { x: -1000, y: -1000 },
                        { x: 1000, y: 1000 }
                     ];
                     game.camera = new CosmosObject({ position: start });
                     game.camera.position.modulate(timer, duration, sand.position.value());
                     area.modulate(timer, duration, size);
                     while (area.value > size) {
                        renderer.zoom.value = 320 / area.value;
                        await renderer.on('tick');
                     }
                     renderer.zoom.value = zoom;
                     assets.sounds.rimshot.instance(timer);
                     await timer.pause(850);
                     game.camera.position.modulate(timer, duration, start);
                     area.modulate(timer, duration, 320);
                     while (area.value < 320) {
                        renderer.zoom.value = 320 / area.value;
                        await renderer.on('tick');
                     }
                     renderer.zoom.value = 1;
                     renderer.region = region;
                     game.camera = cam;
                     sand.preset = characters.sans;
                     sand.face = 'up';
                  }

                  if (world.sad_ghost || save.data.b.f_state_blookbetray) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote3x);
                     hv++;
                  } else {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote3());
                     sv++;
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4());
                  choicer.result === 0 && sv++;
                  if (choicer.result < 3) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4a1());
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4a2());
                  }
                  if (save.data.n.state_foundry_muffet !== 1 && save.data.b.f_state_kidd_betray) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5x);
                     await timer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote5x1);
                     hv++;
                     if (hv > sv) {
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5x2b);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote5x2a);
                     }
                  } else {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5());
                     await timer.pause(850);
                     sv++;
                     if (sv > hv) {
                        await comedy();
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPun1a);
                     }
                  }
                  let m1c = false;
                  let failshow = false;
                  let dolly = false;
                  if (hv > sv) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote8);
                     failshow = true;
                  } else {
                     if (sv === hv) {
                        await dialogue('auto', ...text.a_aerialis.story.moneyVote7);
                        await comedy();
                        await dialogue('auto', ...text.a_aerialis.story.moneyPun1b);
                     }
                     await dialogue('auto', ...text.a_aerialis.story.moneyVote6());
                     sand
                        .walk(timer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                        .then(() => {
                           renderer.detach('main', sand);
                        });
                     await timer.pause(1000);
                     const m1b = await moneyRound(
                        content.iooAMoneyFireworks, // item sprite
                        text.a_aerialis.story.moneyItem2, // text
                        0, // sans guess timer (ms)
                        0, // sans price
                        3500, // napstablook guess timer (ms)
                        40, // napstablook price
                        5800, // monty guess timer (ms)
                        200, // monty price
                        20, // human guess timer (sec)
                        250 // true price
                     );
                     if ((save.data.b.a_state_moneyitemB = !m1b)) {
                        if (save.storage.inventory.size < 8) {
                           save.data.b.item_tvm_fireworks = true;
                           assets.sounds.equip.instance(timer);
                           save.storage.inventory.add('tvm_fireworks');
                           await dialogue('auto', ...text.a_aerialis.story.moneyItemPut2);
                        } else if (!noitem) {
                           noitem = true;
                           await dialogue('auto', ...text.a_aerialis.story.moneyItemPut4);
                        }
                     }
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_aerialis.story.moneyFinal0());
                     kidd
                        .walk(timer, 4, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                        .then(() => {
                           renderer.detach('main', kidd);
                        });
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_aerialis.story.moneyFinal1());
                     m1c = await moneyRound(
                        content.iooAMoneyMew, // item sprite
                        text.a_aerialis.story.moneyItem3, // text
                        0, // sans guess timer (ms)
                        0, // sans price
                        1000, // napstablook guess timer (ms)
                        0, // napstablook price
                        0, // monty guess timer (ms)
                        0, // monty price
                        0, // human guess timer (sec)
                        999, // true price
                        true // cutscene
                     );
                     if (save.data.b.a_state_napstadecline) {
                        napsta
                           .walk(timer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', napsta);
                           });
                        await timer.pause(850);
                        await dialogue('auto', ...text.a_aerialis.story.moneyTrash1);
                        await timer.pause(1450);
                        await dialogue('auto', ...text.a_aerialis.story.moneyTrash2);
                     }
                     if ((save.data.b.a_state_moneyitemC = !m1c)) {
                        if (
                           save.storage.inventory.size < 8 ||
                           (!save.data.b.a_state_napstadecline && trueLizard() < 2)
                        ) {
                           dolly = true;
                           assets.sounds.equip.instance(timer);
                           await dialogue('auto', ...text.a_aerialis.story.moneyItemPut3);
                        } else if (!noitem) {
                           noitem = true;
                           await dialogue('auto', ...text.a_aerialis.story.moneyItemPut4);
                        }
                     }
                     await over.alpha.modulate(timer, 1000, 1);
                  }
                  await over.alpha.modulate(timer, 1000, 1);
                  await timer.pause(1000);
                  player.position.set(330, 150);
                  player.face = 'left';
                  const napcondition = !failshow && !save.data.b.a_state_napstadecline && trueLizard() < 2;
                  if (napcondition) {
                     napsta.position.set({ x: 300, y: 150 });
                     napsta.face = 'right';
                  } else {
                     renderer.detach('main', sand, kidd, napsta);
                  }
                  renderer.detach('main', itemcarrier);
                  await over.alpha.modulate(timer, 1000, 0);
                  renderer.detach('menu', over);
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_aerialis.story.moneyOutro1);
                  mettpos.modulate(timer, 1100, mettpos.value(), { y: 0 }).then(() => {
                     renderer.detach('main', metta);
                  });
                  await timer.pause(1000);
                  await cam.position.modulate(timer, 2000, player.position.clamp(...renderer.region));
                  if (napcondition) {
                     await timer.pause(1500);
                     if (!m1c) {
                        save.data.b.a_state_moneyitemC = false;
                        await dialogue('auto', ...text.a_aerialis.story.napchat0);
                     }
                     await dialogue('auto', ...text.a_aerialis.story.napchat1);
                     await timer.pause(850);
                     napsta.face = 'left';
                     await timer.pause(650);
                     napsta.face = 'right';
                     await timer.pause(1350);
                     if (!save.data.b.oops) {
                        await dialogue('auto', ...text.a_aerialis.story.napchat2b);
                        save.data.b.a_state_hapstablook = true;
                     } else {
                        await dialogue('auto', ...text.a_aerialis.story.napchat2a);
                     }
                     napsta.alpha.modulate(timer, 300, 0).then(() => {
                        renderer.detach('main', napsta);
                     });
                     if (!save.data.b.oops) {
                        await dialogue('auto', ...text.a_aerialis.story.truemtt3);
                     }
                  } else if (dolly) {
                     save.data.b.item_tvm_mewmew = true;
                     save.storage.inventory.add('tvm_mewmew');
                  }
                  game.camera = player;
                  save.data.n.plot = 60;
               } else {
                  await timer.when(() => game.room === 'a_mettaton2' && player.x <= 580 && game.movement);
                  save.data.n.plot = 59.1;
                  game.menu = false;
                  game.movement = false;
                  game.music?.gain.modulate(timer, 0, 0);
                  const p1 = instance('below', 'pathtile1')!.object;
                  const p2 = instance('below', 'pathtile2')!.object;
                  p1.priority.value = -9000;
                  p2.priority.value = -9000;
                  shake(1, 300);
                  assets.sounds.pathway.instance(timer);
                  p1.y += 10;
                  await p2.position.modulate(timer, 300, { y: p2.y + 10 });
                  shake(1, 300);
                  assets.sounds.pathway.instance(timer);
                  p1.x += 60;
                  await p2.position.modulate(timer, 300, { x: p2.x - 60 });
                  assets.sounds.landing.instance(timer);
                  await timer.pause(1550);
                  assets.sounds.phone.instance(timer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX1);
                  const supriseurdeadWHAT = assets.music.gameshow.instance(timer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX2a);
                  let t = 999;
                  let done = false;
                  const timertext = new CosmosText({
                     fill: 'white',
                     font: '14px MarsNeedsCunnilingus',
                     position: { x: 379 + 66, y: 22 + 5 }
                  }).on('tick', async function () {
                     if (!done) {
                        const prex = Math.floor(t);
                        t -= 1 / 30;
                        const postx = Math.floor(t);
                        if (postx < prex && prex > 0) {
                           assets.sounds.select.instance(timer).rate.value = 1.7;
                           if (postx <= 10) {
                              this.fill = postx <= 5 ? (this.fill = '#f00') : '#ff0';
                              await timer.pause(133);
                              assets.sounds.select.instance(timer).rate.value = 1.7;
                              if (postx <= 5) {
                                 await timer.pause(133);
                                 if (postx === 0) {
                                    assets.sounds.select.instance(timer).rate.value = 1.7;
                                    await timer.pause(133);
                                    timertext.alpha.value = 0;
                                    await timer.pause(133);
                                    timertext.alpha.value = 1;
                                    assets.sounds.select.instance(timer).rate.value = 1.7;
                                    await timer.pause(133);
                                    timertext.alpha.value = 0;
                                    await timer.pause(133);
                                    timertext.alpha.value = 1;
                                    assets.sounds.select.instance(timer).rate.value = 1.7;
                                    done = true;
                                 } else {
                                    assets.sounds.select.instance(timer).rate.value = 1.7;
                                 }
                              }
                           }
                           this.content = text.a_aerialis.story.cooker14.replace(
                              '$(x)',
                              postx.toString().padStart(3, '0')
                           );
                        }
                     }
                  });
                  renderer.attach('main', timertext);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX2b);
                  await timer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX3());
                  azzie.metadata.override = true;
                  await azzie.walk(timer, 3, { y: player.y < 140 ? player.y + 21 : player.y - 21 });
                  await azzie.walk(timer, 3, { x: 540 }, { x: 540, y: 123 });
                  await timer.pause(650);
                  azzie.alpha.value = 0;
                  const kneelerSprite = new OutertaleMultivisualObject({}, { anchor: { x: 0, y: 1 } });
                  kneelerSprite.use(content.iocAsrielDown);
                  const kneeler = new CosmosHitbox({
                     position: azzie,
                     priority: -10,
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'm2climber' ] },
                     size: { x: 20, y: 5 },
                     anchor: 0,
                     objects: [ kneelerSprite ]
                  });
                  renderer.attach('main', kneeler);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4());
                  const bbarrier = new CosmosObject({
                     objects: [
                        new CosmosHitbox({
                           position: { x: 340, y: 120 },
                           size: { x: 20, y: 60 },
                           metadata: { barrier: true }
                        }),
                        new CosmosHitbox({
                           position: { x: 640, y: 120 },
                           size: { x: 20, y: 60 },
                           metadata: { barrier: true }
                        })
                     ]
                  });
                  renderer.attach('below', bbarrier);
                  game.movement = true;
                  await timer.when(() => done || roomState.climber === true);
                  function endkneel () {
                     timer.pause(350).then(async () => {
                        renderer.detach('main', kneeler);
                        azzie.alpha.value = 1;
                        await timer.pause(450);
                        azzie.face = 'down';
                     });
                  }
                  if (!done) {
                     kneelerSprite.use(content.iocAsrielKneel);
                     await timer.pause(1600);
                     if (player.x > azzie.x - 21 && player.y < azzie.y) {
                        await player.walk(timer, 3, { y: azzie.y + 21 });
                     }
                     await player.walk(timer, 3, { x: azzie.x - 21 }, { x: azzie.x - 21, y: azzie.y });
                     await timer.pause(650);
                     await player.walk(timer, 1, { x: azzie.x - 14 });
                     player.face = 'right';
                     await timer.pause(850);
                     const hugguhRecs = save.data.b.water
                        ? content.iocAsrielHug1NormalWater
                        : content.iocAsrielHug1Normal;
                     const hugguh = new CosmosAnimation({
                        position: player,
                        scale: { x: -1 },
                        anchor: { x: 0, y: 1 },
                        resources: hugguhRecs
                     });
                     renderer.attach('main', hugguh);
                     player.alpha.value = 0;
                     await timer.pause(600);
                     hugguh.index = 1;
                     await timer.pause(600);
                     hugguh.reset().use(save.data.b.water ? content.iocAsrielPetWater : content.iocAsrielPet);
                     hugguh.index = 0;
                     await timer.pause(800);
                     hugguh.index = 1;
                     hugguh.enable();
                     await timer.pause(800);
                     await dialogue('auto', ...text.a_aerialis.overworld.kneeler);
                     await timer.pause(400);
                     await timer.when(() => hugguh.index === 0);
                     hugguh.disable();
                     await timer.pause(600);
                     hugguh.use(hugguhRecs);
                     hugguh.index = 1;
                     await timer.pause(600);
                     hugguh.index = 0;
                     await timer.pause(600);
                     renderer.detach('main', hugguh);
                     player.alpha.value = 1;
                     await player.position.modulate(timer, 750, kneeler.position.subtract(0, 15));
                     player.face = 'up';
                     await timer.pause(650);
                     endkneel();
                     await player.position.modulate(timer, 750, { x: 540, y: 90 });
                     await dialogue('auto', ...text.a_aerialis.overworld.kneeler2);
                     game.movement = true;
                  }
                  await timer.when(() => done || roomState.killswitch === true);
                  if (atlas.navigator !== null) {
                     await typer.text('');
                  } else {
                     game.movement || (await timer.when(() => game.movement));
                  }
                  const youReallyJustWaitedFor15AndAHalfMinutes = done;
                  done = true;
                  game.movement = false;
                  if (youReallyJustWaitedFor15AndAHalfMinutes) {
                     await supriseurdeadWHAT.gain.modulate(timer, 600, 0);
                     supriseurdeadWHAT.stop();
                  } else {
                     supriseurdeadWHAT.stop();
                  }
                  assets.sounds.noise.instance(timer);
                  timertext.alpha.modulate(timer, 600, 0).then(() => {
                     renderer.detach('main', timertext);
                  });
                  await Promise.all([
                     p1.position.modulate(timer, 300, { x: p1.x - 60 }),
                     p2.position.modulate(timer, 300, { x: p2.x + 60 })
                  ]);
                  shake(1, 300);
                  assets.sounds.pathway.instance(timer);
                  await Promise.all([
                     p1.position.modulate(timer, 300, { y: p1.y - 10 }),
                     p2.position.modulate(timer, 300, { y: p2.y - 10 })
                  ]);
                  shake(1, 300);
                  assets.sounds.pathway.instance(timer);
                  renderer.detach('below', bbarrier);
                  roomState.climber || endkneel();
                  await timer.pause(1450);
                  if (youReallyJustWaitedFor15AndAHalfMinutes) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4a);
                  }
                  assets.sounds.phone.instance(timer);
                  if (youReallyJustWaitedFor15AndAHalfMinutes) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5a);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5c);
                  await endCall('dialoguerBottom');
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX6a);
                  await timer.pause(450 + 850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX6b);
                  await timer.pause(800);
                  azzie.face = 'left';
                  if (roomState.climber) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX7);
                     await player.walk(timer, 3, { x: 460 }, { x: 460, y: 100 });
                     await new Promise<void>(async resolve => {
                        const midPoint = player.position.subtract(0, 10).value();
                        const endPoint = player.position.add(0, 30).value();
                        player.position.modulate(timer, 1000, midPoint, endPoint).then(async () => {
                           resolve();
                        });
                        while (player.y < endPoint.y) {
                           await timer.pause(99);
                           player.face = (
                              { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                                 CosmosDirection,
                                 CosmosDirection
                              >
                           )[player.face];
                        }
                     });
                     await timer.pause(350);
                     player.face = 'down';
                     await timer.pause(850);
                  }
                  const idealX = player.x > 600 ? player.x - 21 : player.x + 21;
                  if (Math.abs(idealX - player.x) < Math.abs(idealX - azzie.x)) {
                     await azzie.walk(timer, 3, {
                        y: player.y < 140 ? player.y + 21 : player.y - 21
                     });
                     await azzie.walk(timer, 3, { x: idealX });
                     await azzie.walk(timer, 3, { y: player.y });
                  } else {
                     await azzie.walk(timer, 3, { y: player.y }, { x: idealX, y: player.y });
                  }
                  azzie.face = player.x > 600 ? 'right' : 'left';
                  azzie.metadata.repositionFace = azzie.face;
                  azzie.metadata.override = false;
                  azzie.metadata.reposition = true;
                  await timer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX8);
                  save.data.n.plot = 60;
               }
               game.movement = true;
               game.menu = true;
               game.music!.gain.value = world.level;
            }
         }
      },
      a_sans (roomState) {
         (world.dead_skeleton || (world.population === 0 && !world.bullied)) &&
            instance('main', 'sentryskeleton')?.destroy();
      },
      async a_pacing (roomState) {
         save.data.b.item_tablaphone && instance('below', 'tablaphone')?.destroy();
         if (save.data.n.plot < 57) {
            save.data.n.plot = 57;
         }
         if (!world.genocide && save.data.n.plot < 58) {
            await timer.when(() => (player.y > 380 || player.x < 180) && game.movement);
            if (save.data.n.plot < 58) {
               save.data.n.plot = 58;
               await area.scripts.notifier!(roomState, (states.scripts.notifier ??= {}), 'napsta');
            }
         }
      },
      async a_split (roomState) {
         if (!roomState.active && !world.genocide && save.data.n.plot < 63) {
            roomState.active = true;
            if (save.data.b.a_state_hapstablook) {
               const napsta = character('napstablook', characters.napstablook, { x: 250, y: 170 }, 'up');
               roomState.napsta = napsta;
               await Promise.race([
                  events.on('teleport'),
                  timer.when(() => game.room === 'a_split' && player.y < 240 && game.movement)
               ]);
               if (game.room === 'a_split') {
                  game.movement = false;
                  await timer.pause(650);
                  napsta.face = 'down';
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta1);
                  await napsta.walk(timer, 3, { x: 300 });
                  const fd = fader();
                  await Promise.all([
                     player.walk(timer, 3, { x: 420, y: 160 }),
                     napsta.walk(timer, 3, { x: 420, y: 160 }).then(() => napsta.alpha.modulate(timer, 300, 0)),
                     fd.alpha.modulate(timer, 2000, 1).then(() => timer.pause(1400)),
                     game.music?.gain.modulate(timer, 2000, 0)
                  ]);
                  await teleport('a_offshoot2', 'right', 20, 160, { fast: true });
                  game.movement = false;
                  napsta.position.set(100, 160);
                  napsta.face = 'left';
                  napsta.alpha.value = 1;
                  resume({ gain: world.level, rate: world.ambiance });
                  await timer.pause(1000);
                  await fd.alpha.modulate(timer, 300, 0);
                  await timer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta2);
                  await timer.pause(650);
                  napsta.face = 'down';
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta3a);
                  napsta.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta3b);
                  await napsta.walk(timer, 3, { x: 160 }, { x: 160, y: 130 });
                  await timer.pause(650);
                  const term: CosmosSprite = await area.scripts.terminal?.({}, {}, '-1');
                  await timer.pause(850);
                  napsta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta4);
                  await player.walk(timer, 3, { x: 130 }, { x: 130, y: 130 });
                  await timer.pause(650);
                  napsta.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta5);
                  await Promise.all([ game.music?.gain.modulate(timer, 1000, 0), fd.alpha.modulate(timer, 1000, 1) ]);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta6);
                  renderer.detach('main', term);
                  player.face = 'down';
                  await Promise.all([
                     game.music?.gain.modulate(timer, 600, world.level),
                     fd.alpha.modulate(timer, 600, 0)
                  ]);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta7);
                  napsta.face = 'down';
                  const finalghost = character('finalghost', characters.finalghost, { x: 20, y: 160 }, 'right', {
                     alpha: 0
                  });
                  await finalghost.alpha.modulate(timer, 300, 1);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta8);
                  await finalghost.walk(timer, 3, { x: 50 });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta9);
                  await finalghost.walk(timer, 3, { x: 160 }, { x: 160, y: 150 });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta10);
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta11);
                  await timer.pause(650);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta12a());
                  finalghost.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta12b);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta13);
                  napsta.face = 'left';
                  finalghost.face = 'left';
                  const time = timer.value;
                  const dummy = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     resources: content.ionODummyMad,
                     position: { x: -20, y: 160 },
                     scale: { x: -1 },
                     offsets: [ 0 ]
                  }).on('tick', () => {
                     dummy.offsets[0].y = CosmosMath.wave(((timer.value - time) % 4000) / 4000) * -2;
                  });
                  renderer.attach('main', dummy);
                  const cover = new CosmosRectangle({ fill: 'white', size: { x: 320, y: 240 } });
                  renderer.attach('menu', cover);
                  assets.sounds.boom.instance(timer);
                  shake(2, 800);
                  const loop = assets.music.predummy.instance(timer);
                  loop.gain.value /= 8;
                  const t = dummy.position.add(60, 0);
                  await Promise.all([
                     loop.gain.modulate(timer, 500, loop.gain.value * 8),
                     cover.alpha.modulate(timer, 500, 1, 0),
                     dummy.position.modulate(timer, 500, t, t, t)
                  ]);
                  renderer.detach('menu', cover);
                  await timer.pause(450);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta14);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta15);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta16);
                  finalghost.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta17);
                  loop.stop();
                  assets.sounds.shatter.instance(timer).gain.value *= 0.7;
                  dummy.scale.x = 1;
                  dummy.use(content.ionODummy);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta18);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta19);
                  dummy.scale.x = -1;
                  await finalghost.walk(timer, 3, { y: 190 }, { x: 140, y: 190 });
                  await timer.pause(1150);
                  finalghost.face = 'up';
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta20);
                  await timer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta21);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta22);
                  await timer.pause(850);
                  napsta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta23);
                  await timer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta24);
                  await timer.pause(850);
                  assets.sounds.phone.instance(timer);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta25);
                  await timer.pause(650);
                  napsta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta26);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta27);
                  await timer.pause(850);
                  napsta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta28);
                  await endCall('dialoguerBottom');
                  napsta.face = 'down';
                  await timer.pause(650);
                  dummy.scale.x = 1;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta29);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta30);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta31);
                  dummy.position.step_legacy(timer, 3, { x: 10 }).then(async () => {
                     await dummy.alpha.modulate(timer, 300, 0);
                     renderer.detach('main', dummy);
                  });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta32());
                  finalghost.walk(timer, 3, { x: 20, y: 160 }).then(async () => {
                     await finalghost.alpha.modulate(timer, 300, 0);
                     renderer.detach('main', finalghost);
                  });
                  await timer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta34());
                  await Promise.all([
                     save.data.b.oops || dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta35),
                     napsta.alpha.modulate(timer, 300, 0).then(() => {
                        renderer.detach('main', napsta);
                     })
                  ]);
                  game.movement = true;
               } else {
                  renderer.detach('main', napsta);
                  roomState.active = false;
                  return;
               }
            }
            save.data.n.plot = 63;
         }
      },
      async a_elevator1 () {
         (world.genocide || world.population < 6) && instance('main', 'a_businessdude')?.destroy();
      },
      async a_elevator2 () {
         if (world.genocide && save.data.n.state_aerialis_monologue < 7) {
            await timer.when(() => game.movement);
            save.data.n.state_aerialis_monologue = 7;
            await dialogue('auto', ...text.a_aerialis.genotext.asriel52());
         }
      },
      async a_elevator3 (roomState) {
         if (roomState.active) {
            return;
         }
         roomState.active = true;
         if (save.data.n.plot < 64) {
            if (trueLizard() < 2) {
               await timer.when(() => game.room === 'a_elevator3' && player.x < 280 && game.movement);
               game.movement = false;
               game.music!.stop();
               save.data.n.plot = 64;
               const lizard = character('alphys', characters.alphys, { x: 160, y: 150 }, 'down', { alpha: 0 });
               await lizard.alpha.modulate(timer, 300, 1);
               await lizard.walk(timer, 3, { y: player.y }, player.position.subtract(50, 0));
               await timer.pause(850);
               await dialogue('auto', ...text.a_aerialis.story.opera1());
               await lizard.walk(timer, 3, { x: 180 });
               await timer.pause(850);
               lizard.face = 'right';
               await timer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.story.opera2);
               await Promise.all([
                  lizard.walk(timer, 3, { x: 160 }, { x: 160, y: 150 }).then(() => {
                     lizard.alpha.modulate(timer, 300, 0);
                  }),
                  player.walk(timer, 3, { x: 160 }, { x: 160, y: 150 })
               ]);
               await teleport('a_lift', 'up', 160, 230, world);
               resume({ gain: world.level, rate: world.ambiance });
               lizard.position.set(160, 180);
               lizard.face = 'down';
               lizard.alpha.value = 1;
               player.walk(timer, 3, { y: 215 });
               await timer.pause(850);
               lizard.face = 'up';
               await timer.pause(1150);
               const vator = elevate();
               await timer.pause(450);
               lizard.face = 'down';
               await timer.pause(850);
               await dialogue('auto', ...text.a_aerialis.story.opera3);
               await Promise.all([ vator, timer.pause(950) ]);
               await timer.pause(800);
               await dialogue('auto', ...text.a_aerialis.story.opera4());
               await player.walk(timer, 3, { y: 210 });
               player.walk(timer, 3, { x: 130 }).then(() => (player.face = 'up'));
               await lizard.walk(timer, 3, { y: 235 });
               lizard.alpha.modulate(timer, 300, 0);
               await player.walk(timer, 3, { x: 160 }, { x: 160, y: 235 });
               game.music?.gain.modulate(timer, 300, 0).then(() => game.music?.stop());
               await teleport('a_elevator4', 'down', 60, 110, world);
               lizard.position.set(player.position.add(0, 30));
               lizard.face = 'down';
               lizard.alpha.value = 1;
               player.walk(timer, 3, { y: 260 }, { x: 150, y: 260 });
               await lizard.walk(timer, 3, { y: 260 }, { x: 180, y: 260 });
               await timer.pause(1400);
               const rg1 = instance('main', 'securityGuard1')?.object.objects[0] as CosmosAnimation | void;
               const rg2 = instance('main', 'securityGuard2')?.object.objects[0] as CosmosAnimation | void;
               let t = 0;
               const waver = function (this: CosmosAnimation) {
                  this.scale.set(sineWaver(t, 1000, 0.9, 1.1), sineWaver(t, 1000, 1.1, 0.9));
               };
               const rgHeaders = (h: string) => {
                  switch (h) {
                     case 'x1':
                        t = timer.value;
                        rg1!.on('tick', waver);
                        break;
                     case 'x2':
                        t = timer.value;
                        rg2!.on('tick', waver);
                        break;
                     case 'x3':
                        rg1!.off('tick', waver);
                        rg2!.off('tick', waver);
                        rg1!.scale.set(1);
                        rg2!.scale.set(1);
                        break;
                  }
               };
               const rge = rg1 !== void 0 && rg2 !== void 0;
               if (rge) {
                  typer.on('header', rgHeaders);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera5);
                  await timer.pause(150);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera6);
                  await timer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera7());
                  await timer.pause(1250);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera8);
                  await timer.pause(350);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera9);
                  const field = instance('below', 'securityField')!.object;
                  assets.sounds.depower.instance(timer);
                  timer.pause(280).then(async () => {
                     field.alpha.value = 0;
                     await timer.pause(420 - 320);
                     field.alpha.value = 1;
                     await timer.pause(570 - 420);
                     field.alpha.value = 0;
                     await timer.pause(650 - 570);
                     field.alpha.value = 1;
                     await timer.pause(720 - 650);
                     renderer.detach('below', field);
                  });
                  await timer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera10);
               } else {
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera5b);
               }
               const walkPromise = Promise.all([
                  lizard.walk(timer, 3, { y: 260 }, { x: 340, y: 260 }).then(() => {
                     lizard.alpha.modulate(timer, 300, 0);
                  }),
                  player.walk(timer, 3, { x: 260 }, { x: 340, y: 260 }).then(() => {
                     player.alpha.modulate(timer, 300, 0);
                  })
               ]);
               await timer.pause(1000);
               if (rge) {
                  rg1.use(content.ionARgdragonDown);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera11);
                  typer.off('header', rgHeaders);
               }
               const ov = fader();
               if (rge) {
                  timer.pause(650).then(() => {
                     rg1.use(content.ionARgdragonLeft);
                  });
               }
               await ov.alpha.modulate(timer, 1250, 1);
               await timer.pause(1000);
               await Promise.all([
                  dialogue('dialoguerBottom', ...text.a_aerialis.story.opera12),
                  walkPromise.then(() =>
                     teleport('a_auditorium', 'down', 240, 180, { fade: false, fast: true, cutscene: true })
                  )
               ]);
               ov.alpha.modulate(timer, 1250, 0).then(() => renderer.detach('menu', ov));
               await operaShow(lizard);
               await Promise.race([
                  lizard
                     .walk(timer, trueLizard() === 1 ? 4 : 3, { x: 10 })
                     .then(() => lizard.alpha.modulate(timer, 300, 0)),
                  events.on('teleport')
               ]);
               renderer.detach('main', lizard);
            }
         }
      },
      async a_elevator4 (roomState) {
         if (save.data.n.plot > 64 || evac()) {
            instance('below', 'securityField')?.destroy();
         }
         if (evac()) {
            instance('main', 'securityGuard1')?.destroy();
            instance('main', 'securityGuard2')?.destroy();
         }
         if (world.genocide) {
            if (save.data.n.plot_approach < 1) {
               teleporter.movement = false;
               await dialogue('auto', ...text.a_aerialis.genotext.hotel0());
               save.data.n.plot_approach = 1;
               game.movement = true;
            }
            if (!roomState.active) {
               roomState.active = true;
               if (
                  (save.flag.b.asriel_electrics ? save.flag.n.ga_asrielElectrics1 : save.flag.n.ga_asrielHotel1) < 1 &&
                  save.data.n.plot_approach < 2
               ) {
                  await timer.when(() => game.room === 'a_elevator4' && player.x > 300 && game.movement);
                  game.movement = false;
                  const goatface = azzie.face;
                  header('x1').then(() => (azzie.face = 'left'));
                  if (save.flag.b.asriel_electrics) {
                     save.flag.n.ga_asrielElectrics1++;
                  } else {
                     save.flag.n.ga_asrielHotel1++;
                  }
                  await dialogue('auto', ...text.a_aerialis.genotext.hotel1());
                  save.data.n.plot_approach = 2;
                  azzie.face = goatface;
                  game.movement = true;
               }
            }
         }
      },
      a_auditorium () {
         if (save.data.n.plot > 64.1 && world.genocide) {
            temporary(
               new CosmosHitbox({
                  position: { x: 285, y: 180 },
                  tint: 0x959595,
                  anchor: { x: 0, y: 1 },
                  size: { x: 57, y: 6 },
                  metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'deadbot' ] },
                  objects: [
                     new CosmosAnimation({ resources: content.iocMettatonDressIdle, index: 12, anchor: { x: 0, y: 1 } })
                  ]
               }),
               'main'
            );
         }
      },
      a_aftershow () {
         if (world.dead_skeleton || save.data.n.plot > 65 || evac()) {
            instance('main', 'datesans')?.destroy();
         }
      },
      async a_lookout (roomState) {
         if (!roomState.active && !save.data.b.onionsan && !!instance('main', 'warpmarker') && player.y > 40) {
            roomState.active = true;
            await timer.when(() => game.room === 'a_lookout' && player.y < 50 && game.movement);
            game.movement = false;
            const onionB = new OutertaleMultivisualObject({}, { anchor: { x: 0, y: 1 }, active: true });
            const onionA1 = onionArm(-12, 1, 'out');
            const onionA2 = onionArm(25, -1, 'left');
            const tV = timer.value;
            const tY = 120;
            const onion = new CosmosObject({
               position: { x: 170, y: tY },
               priority: -5,
               area: renderer.area,
               objects: [ onionB, onionA1, onionA2 ],
               offsets: [ 0 ],
               filters: [ new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 0.3, quality: 5 }) ]
            }).on('tick', function () {
               this.offsets[0].y = sineWaver(tV, 4000, 0, 5);
            });
            onionB.use(content.ionAOnionsanKawaii);
            renderer.attach('below', onion);
            await onion.position.modulate(timer, 2500, { y: 20 });
            await timer.pause(750);
            const OGY = renderer.region[0].y;
            renderer.region[0].y = renderer.region[1].y = -10;
            renderer.zoom.value = 3;
            await timer.pause(1000);
            await dialogue('auto', ...text.a_aerialis.onionsan1);
            onionB.use(content.ionAOnionsanYhear);
            onionA1.x = -12.5;
            onionA1.y += 10;
            onionA1.metadata.frame = 'wave';
            onionA1.position.modulate(timer, 750, { y: 50 });
            onionA2.x = 12.5;
            onionA2.y += 10;
            onionA2.metadata.frame = 'wave';
            onionA2.position.modulate(timer, 750, { y: 50 });
            await dialogue('auto', ...text.a_aerialis.onionsan1a);
            await timer.pause(1000);
            onionB.use(content.ionAOnionsanWistful);
            await timer.pause(2000);
            await dialogue('auto', ...text.a_aerialis.onionsan2());
            onionB.use(content.ionAOnionsanKawaii);
            await dialogue('auto', ...text.a_aerialis.onionsan2a());
            await timer.pause(1000);
            onionB.use(content.ionAOnionsanWistful);
            await dialogue('auto', ...text.a_aerialis.onionsan3);
            await timer.pause(1000);
            onionB.use(content.ionAOnionsanYhear);
            await dialogue('auto', ...text.a_aerialis.onionsan3a());
            onionB.use(content.ionAOnionsanWistful);
            await dialogue('auto', ...text.a_aerialis.onionsan4);
            onionA2.x = -25;
            dialogue('auto', ...text.a_aerialis.onionsan4a);
            await onionA2.position.modulate(timer, 1000, { y: 0 });
            await onion.position.modulate(timer, 2500, { y: tY });
            typer.text('');
            renderer.detach('below', onion);
            await timer.pause(1500);
            game.camera = new CosmosObject({ position: { y: renderer.region[0].y } });
            renderer.region[0].y = -Infinity;
            renderer.region[1].y = Infinity;
            const zoom = 1;
            const time = 500;
            const area = new CosmosValue(320 / renderer.zoom.value);
            function zoomerTicker () {
               renderer.zoom.value = 320 / area.value;
            }
            renderer.on('tick', zoomerTicker);
            await Promise.all([
               area.modulate(timer, time, 320 / zoom),
               game.camera.position.modulate(timer, time, { y: OGY })
            ]);
            renderer.off('tick', zoomerTicker);
            renderer.zoom.value = zoom;
            game.camera = player;
            renderer.region[0].y = renderer.region[1].y = OGY;
            if (world.azzie && save.flag.n.ga_asrielOnion++ < 1) {
               await timer.pause(500);
               await dialogue('auto', ...text.a_aerialis.onionsan4x);
            }
            game.movement = true;
            save.data.b.onionsan = true;
         }
      },
      async a_hub1 () {
         if (babyEvac()) {
            instance('main', 'a_heats')?.destroy();
         }
         if (teenEvac()) {
            instance('main', 'a_vulkin')?.destroy();
            instance('main', 'a_pyrope')?.destroy();
         }
         if (world.genocide && save.data.n.plot_approach < 3) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.hotel2());
            save.data.n.plot_approach = 3;
            game.movement = true;
         }
      },
      a_dining () {
         if (babyEvac()) {
            instance('main', 'a_charles')?.destroy();
         }
         if (childEvac()) {
            instance('main', 'a_drakedad')?.destroy();
         }
         if (evac()) {
            instance('main', 'a_oni')?.destroy();
         }
         instance('main', 'a_foodreceptionist')!.object.objects[0].alpha.value = evac() ? 0 : 1;
      },
      a_sleeping1 () {
         instance('main', 'a_bedreceptionist')!.object.objects[0].alpha.value = evac() ? 0 : 1;
      },
      a_hub2 () {
         if (childEvac()) {
            instance('main', 'a_slime_kid1')?.destroy();
            instance('main', 'a_slime_kid2')?.destroy();
            instance('main', 'a_diamond1')?.destroy();
            instance('main', 'a_diamond2')?.destroy();
         }
         if (teenEvac()) {
            instance('main', 'a_slime_kid1')?.destroy();
            instance('main', 'a_slime_kid2')?.destroy();
         }
         if (evac()) {
            instance('main', 'a_slime_mother')?.destroy();
            instance('main', 'a_slime_father')?.destroy();
         }
         // badass ;)
         if (world.genocide || (world.population === 0 && !world.bullied)) {
            instance('main', 'a_drakemom')?.destroy();
         }
      },
      async a_hub3 () {
         if (teenEvac()) {
            instance('main', 'a_gyftrot')?.destroy();
            instance('main', 'a_giftbear')?.destroy();
         }
         if (evac()) {
            instance('main', 'a_dragon')?.destroy();
         }
         if (world.genocide && save.data.n.plot_approach < 3) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.hotel2());
            save.data.n.plot_approach = 3;
            game.movement = true;
         }
      },
      a_plaza () {
         // for correct layering
         instance('main', 'pottedtable')!.object.priority.value = 208;
         if (childEvac()) {
            instance('main', 'a_artgirl')?.destroy();
            instance('main', 'a_sorry')?.destroy();
         }
         if (evac()) {
            instance('main', 'a_thisisnotabomb')?.destroy();
            instance('main', 'ringerNPC')?.destroy();
         }
         if (save.data.b.item_moonpie) {
            instance('main', 'moonpie')?.destroy();
         }
         if (!save.data.b.a_state_moneyitemA || save.data.b.item_tvm_radio) {
            instance('main', 'tvm_radio')?.destroy();
         }
         if (!save.data.b.a_state_moneyitemB || save.data.b.item_tvm_fireworks) {
            instance('main', 'tvm_fireworks')?.destroy();
         }
      },
      a_hub4 () {
         if (childEvac()) {
            instance('main', 's_nicecream')?.destroy();
            instance('below', 'xtrabarrier')?.destroy();
         } else {
            (instance('main', 's_nicecream')!.object.objects[0] as CosmosAnimation).index = 2;
         }
         if (evac()) {
            instance('main', 'a_bowtie')?.destroy();
            instance('main', 'a_boomer')?.destroy();
         }
         if (2 <= save.data.n.plot_date) {
            (save.data.n.plot < 68 || save.data.b.a_state_hapstablook) &&
               temporary(
                  character('papyrus', characters.papyrus, { x: 245, y: 190 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 20, y: 5 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'papinter' ] }
                  }),
                  'main'
               );
            save.data.n.exp <= 0 &&
               temporary(
                  character('undyneDate', characters.undyneDate, { x: 215, y: 220 }, 'down', {
                     key: 'undyne',
                     anchor: { x: 0, y: 1 },
                     size: { x: 20, y: 5 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'undinter' ] }
                  }),
                  'main'
               );
         }
      },
      async a_hub5 (roomState) {
         if (trueLizard() < 2 && save.data.b.a_state_corecall && save.data.n.plot < 68) {
            teleporter.movement = false;
            save.data.b.a_state_corecall = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core2b());
            await endCall('dialoguerBottom');
            game.movement = true;
         }
         if (!roomState.active) {
            roomState.active = true;
            if (trueLizard() < 2 && save.data.n.plot_call < 7) {
               await timer.when(() => game.room === 'a_hub5' && player.x < 200 && player.y < 200 && game.movement);
               save.data.n.plot_call = 7;
               assets.sounds.phone.instance(timer);
               await dialogue('dialoguerBottom', ...text.a_aerialis.core1);
               await endCall('dialoguerBottom');
               save.data.n.plot = 66;
            }
         }
      },
      async a_core_entry1 (roomState) {
         if (trueLizard() < 2 && !save.data.b.a_state_corecall && save.data.n.plot < 68) {
            teleporter.movement = false;
            save.data.b.a_state_corecall = true;
            assets.sounds.phone.instance(timer);
            await dialogue('dialoguerBottom', ...text.a_aerialis.core2a());
            game.movement = true;
         } else if (world.genocide && save.data.n.plot_approach < 4) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.core0());
            save.data.n.plot_approach = 4;
            game.movement = true;
         }
         if (!roomState.active) {
            roomState.active = true;
            if (!world.genocide && save.data.n.plot < 66.1) {
               await timer.when(() => game.room === 'a_core_entry1' && player.y < 360 && game.movement);
               game.movement = false;
               const darkmans = new CosmosEntity({
                  position: { x: 340, y: 240 },
                  sprites: darkmansSprites,
                  face: 'down'
               });
               renderer.attach('main', darkmans);
               trueLizard() < 2 && dialogue('dialoguerBottom', ...text.a_aerialis.core3);
               await darkmans.walk(timer, 3, { y: player.y - 60 });
               dialogueSession.movement = false;
               typer.text('');
               await battler.encounter(player, groups.madjick, false, true);
               game.movement = false;
               renderer.detach('main', darkmans);
               trueLizard() < 2 && (await dialogue('dialoguerBottom', ...text.a_aerialis.core4()));
               save.data.n.plot = 66.1;
               game.movement = true;
            }
         }
      },
      async a_core_entry2 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (save.data.n.plot < 66.2) {
            const darkmans = world.genocide
               ? new CosmosEntity()
               : temporary(
                    new CosmosEntity({ position: { x: 160, y: 60 }, sprites: darkmansSprites, face: 'down' }),
                    'main'
                 );
            if (!roomState.active) {
               roomState.active = true;
               await timer.when(
                  () => game.room === 'a_core_entry2' && player.y < (world.genocide ? 170 : 190) && game.movement
               );
               if (world.genocide) {
                  if (save.data.n.plot_approach < 5 && save.flag.n.ga_asrielCore1++ < 1) {
                     await dialogue('auto', ...text.a_aerialis.genotext.core1);
                     save.data.n.plot_approach = 5;
                  }
               } else {
                  game.movement = false;
                  trueLizard() < 2 && dialogue('dialoguerBottom', ...text.a_aerialis.core5);
                  await darkmans.walk(timer, 3, { y: player.y - 60 });
                  dialogueSession.movement = false;
                  typer.text('');
                  await battler.encounter(player, groups.knightknight, false, true);
                  game.movement = false;
                  renderer.detach('main', darkmans);
                  trueLizard() < 2 && (await dialogue('dialoguerBottom', ...text.a_aerialis.core6()));
                  save.data.n.plot = 66.2;
                  game.movement = true;
               }
            }
         }
      },
      async a_core_main () {
         instance('below', 'CORE')!.object.priority.value = -1000;
         if (67 <= save.data.n.plot) {
            instance('below', 'coredoor')?.destroy();
         }
         if (trueLizard() < 2 && save.data.n.plot_call < 7.1) {
            teleporter.movement = false;
            save.data.n.plot_call = 7.1;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core7);
            game.movement = true;
         } else if (
            trueLizard() < 2 &&
            !save.data.b.a_state_backtracker &&
            ((save.data.n.state_aerialis_corepath_state === 1 && save.data.n.state_aerialis_corepath_puzzle === 2) ||
               (save.data.n.state_aerialis_corepath_state === 2 && save.data.n.state_aerialis_corepath_warrior === 2))
         ) {
            save.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core8c1);
            game.movement = true;
         } else if (world.genocide && save.data.n.plot_approach < 6) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.core2());
            azzie.metadata.override = true;
            await azzie.walk(timer, 3, { x: player.x - 21 }, { x: player.x - 21, y: 531 });
            await timer.pause(1500);
            typer.variables.x = CosmosUtils.populate(8, () => Math.floor(random.next() * 10)).join('-');
            await dialogue('auto', ...text.a_aerialis.genotext.core3());
            const access = save.flag.b.asriel_access;
            if (access) {
               await timer.pause(800);
            } else {
               save.flag.b.asriel_access = true;
            }
            shake(1, 500);
            assets.sounds.pathway.instance(timer).rate.value = 1.3;
            const drawbridge = new CosmosSprite({
               anchor: { x: 0 },
               crop: { top: -4 },
               frames: [ content.iooADrawbridge ],
               position: { x: 260, y: 480 },
               priority: -10
            });
            renderer.attach('below', drawbridge);
            const h = drawbridge.frames[0]!.value!.height;
            await new Promise<void>(resolve => {
               const ticker = () => {
                  drawbridge.crop.top -= 3;
                  if (drawbridge.crop.top <= -h) {
                     drawbridge.crop.top = -h;
                     drawbridge.off('tick', ticker);
                     resolve();
                  }
               };
               drawbridge.on('tick', ticker);
            });
            shake(1, 500);
            assets.sounds.pathway.instance(timer).rate.value = 1.3;
            await timer.pause(1000);
            access || (await dialogue('auto', ...text.a_aerialis.genotext.core4a));
            timer
               .when(() => azzie.y < 460)
               .then(async () => {
                  shake(1, 500);
                  assets.sounds.pathway.instance(timer).rate.value = 1.3;
                  await new Promise<void>(resolve => {
                     const ticker = () => {
                        drawbridge.crop.top += 3;
                        if (-4 <= drawbridge.crop.top) {
                           drawbridge.off('tick', ticker);
                           resolve();
                        }
                     };
                     drawbridge.on('tick', ticker);
                  });
                  renderer.detach('below', drawbridge);
                  shake(1, 500);
                  assets.sounds.pathway.instance(timer).rate.value = 1.3;
               });
            await azzie.walk(timer, 3, { x: player.x }, { x: player.x, y: 440 });
            await dialogue('auto', ...text.a_aerialis.genotext.core4b());
            save.data.n.plot_approach = 6;
            game.movement = true;
            timer.when(() => {
               if (game.movement && player.y > 570) {
                  dialogue('auto', ...text.a_aerialis.genotext.core5).then(() => {
                     player.y -= 3;
                     player.face = 'up';
                  });
               }
               return 67 <= save.data.n.plot;
            });
         }
      },
      async a_core_left1 (roomState) {
         if (!roomState.active_puzzle) {
            roomState.active_puzzle = true;
            roomState.switches = [];
            const state = save.data.s.state_aerialis_a_core_left1;
            puzzler.update(roomState, state === '' ? [] : state.split(',').map(id => +id), true);
            instance('main', 'puzzleholder1')!.object.area = renderer.area;
         }
         if (68 <= save.data.n.plot) {
            return;
         }
         if (trueLizard() < 2) {
            if (save.data.n.state_aerialis_corepath_state === 0) {
               save.data.n.state_aerialis_corepath_state = 1;
               teleporter.movement = false;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8a);
               game.movement = true;
            } else if (!save.data.b.a_state_flipflopper && save.data.n.state_aerialis_corepath_state === 2) {
               save.data.b.a_state_flipflopper = true;
               save.data.n.state_aerialis_corepath_state = 1;
               teleporter.movement = false;
               await dialogue(
                  'dialoguerBottom',
                  ...CosmosUtils.provide(
                     [
                        text.a_aerialis.core9a1,
                        text.a_aerialis.core9b1,
                        text.a_aerialis.core8c2,
                        text.a_aerialis.core11
                     ][save.data.n.state_aerialis_corepath_warrior]
                  )
               );
               game.movement = true;
            }
         } else if (save.data.b.papyrus_secret && save.data.n.plot_call < 6) {
            teleporter.movement = false;
            save.data.n.plot_call = 6;
            await dialogue('dialoguerBottom', ...text.a_aerialis.secretcall);
            game.movement = true;
         } else if (
            save.data.n.plot > 66.2 &&
            world.genocide &&
            !azzie.metadata.override &&
            !save.data.b.a_state_asrielTimewaster
         ) {
            save.data.b.a_state_asrielTimewaster = true;
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.timewaster());
            game.movement = true;
         }
         if (
            !roomState.active &&
            trueLizard() < 2 &&
            save.data.n.state_aerialis_corepath_warrior < 2 &&
            save.data.n.state_aerialis_corepath_puzzle < 1
         ) {
            roomState.active = true;
            await timer.when(() => 68 <= save.data.n.plot || save.data.n.state_aerialis_corepath_puzzle === 1);
            if (68 <= save.data.n.plot) {
               roomState.active = false;
               return;
            }
            save.data.b.a_state_flipflopper = false;
            save.data.n.state_aerialis_corepath_state = 1;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core8b);
            roomState.active = false;
         }
      },
      async a_core_left2 (roomState) {
         if (!roomState.active_puzzle) {
            roomState.active_puzzle = true;
            roomState.switches = [];
            const state = save.data.s.state_aerialis_a_core_left2;
            puzzler.update(roomState, state === '' ? [] : state.split(',').map(id => +id), true);
            instance('main', 'puzzleholder1')!.object.area = renderer.area;
            instance('main', 'puzzleholder2')!.object.area = renderer.area;
         }
         if (68 <= save.data.n.plot) {
            return;
         }
         if (
            !roomState.active &&
            trueLizard() < 2 &&
            save.data.n.state_aerialis_corepath_warrior < 3 &&
            save.data.n.state_aerialis_corepath_puzzle < 2
         ) {
            roomState.active = true;
            await timer.when(() => 68 <= save.data.n.plot || save.data.n.state_aerialis_corepath_puzzle === 2);
            if (68 <= save.data.n.plot) {
               roomState.active = false;
               return;
            }
            save.data.n.state_aerialis_corepath_state = 1;
            if (save.data.n.state_aerialis_corepath_warrior < 2) {
               save.data.b.a_state_flipflopper = false;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8c);
            } else {
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8c3);
               await timer.when(() => game.room === 'a_core_left1' && game.movement);
               if (save.data.n.state_aerialis_corepath_puzzle < 3) {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core8c4);
               }
            }
            roomState.active = false;
         } else if (
            !save.data.b.a_state_backtracker &&
            trueLizard() < 2 &&
            save.data.n.state_aerialis_corepath_warrior === 3 &&
            save.data.n.state_aerialis_corepath_puzzle < 3
         ) {
            save.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core12);
            game.movement = true;
         }
      },
      async a_core_left3 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (save.data.n.state_aerialis_corepath_puzzle === 3) {
            (instance('below', 'exitswitch')!.object.objects[0] as CosmosAnimation).index = 1;
         } else {
            if (68 <= save.data.n.plot) {
               return;
            }
            if (!roomState.active && trueLizard() < 2 && save.data.n.state_aerialis_corepath_puzzle < 3) {
               roomState.active = true;
               await timer.when(() => 68 <= save.data.n.plot || save.data.n.state_aerialis_corepath_puzzle === 3);
               if (68 <= save.data.n.plot) {
                  roomState.active = false;
                  return;
               }
               if (save.data.n.state_aerialis_corepath_warrior < 3) {
                  if (save.data.b.a_state_backtracker) {
                     if (save.data.n.state_aerialis_corepath_state === 1) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10b);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10c);
                     }
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core10a);
                  }
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core13);
               }
               roomState.active = false;
            }
         }
      },
      async a_core_right1 (roomState) {
         if (68 <= save.data.n.plot) {
            return;
         }
         if (trueLizard() < 2) {
            if (save.data.n.state_aerialis_corepath_state === 0) {
               save.data.n.state_aerialis_corepath_state = 2;
               teleporter.movement = false;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core9a());
               game.movement = true;
            } else if (!save.data.b.a_state_flipflopper && save.data.n.state_aerialis_corepath_state === 1) {
               save.data.b.a_state_flipflopper = true;
               save.data.n.state_aerialis_corepath_state = 2;
               teleporter.movement = false;
               await dialogue(
                  'dialoguerBottom',
                  ...[
                     text.a_aerialis.core8a1,
                     text.a_aerialis.core8b1,
                     text.a_aerialis.core8c2,
                     text.a_aerialis.core11
                  ][save.data.n.state_aerialis_corepath_puzzle]
               );
               game.movement = true;
            }
         } else if (save.data.b.papyrus_secret && save.data.n.plot_call < 6) {
            teleporter.movement = false;
            save.data.n.plot_call = 6;
            await dialogue('dialoguerBottom', ...text.a_aerialis.secretcall);
            game.movement = true;
         } else if (
            save.data.n.plot > 66.2 &&
            world.genocide &&
            !azzie.metadata.override &&
            !save.data.b.a_state_asrielTimewaster
         ) {
            save.data.b.a_state_asrielTimewaster = true;
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.timewaster());
            game.movement = true;
         }
         if (!roomState.active && save.data.n.state_aerialis_corepath_warrior < 1) {
            roomState.active = true;
            const dialogueCondition = trueLizard() < 2 && save.data.n.state_aerialis_corepath_puzzle < 2;
            await timer.when(
               () => 68 <= save.data.n.plot || (game.movement && game.room === 'a_core_right1' && 160 <= player.x)
            );
            if (68 <= save.data.n.plot) {
               roomState.active = false;
               return;
            }
            await battler.encounter(player, groups.froggitexWhimsalot, true, true);
            save.data.n.state_aerialis_corepath_warrior = 1;
            if (dialogueCondition) {
               save.data.b.a_state_flipflopper = false;
               save.data.n.state_aerialis_corepath_state = 2;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core9b());
            }
            roomState.active = false;
         }
      },
      async a_core_right2 (roomState) {
         if (68 <= save.data.n.plot) {
            return;
         }
         if (!roomState.active && save.data.n.state_aerialis_corepath_warrior < 2) {
            const dialogueCondition = trueLizard() < 2 && save.data.n.state_aerialis_corepath_puzzle < 3;
            roomState.active = true;
            await timer.when(
               () => 68 <= save.data.n.plot || (game.movement && game.room === 'a_core_right2' && 160 <= player.x)
            );
            if (68 <= save.data.n.plot) {
               roomState.active = false;
               return;
            }
            await battler.encounter(player, groups.astigmatismMigospel, true, true);
            save.data.n.state_aerialis_corepath_warrior = 2;
            save.data.n.state_aerialis_corepath_state = 2;
            if (dialogueCondition) {
               if (save.data.n.state_aerialis_corepath_puzzle < 2) {
                  save.data.b.a_state_flipflopper = false;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core9c());
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core8c3);
                  await timer.when(() => game.room === 'a_core_right1' && game.movement);
                  if (save.data.n.state_aerialis_corepath_warrior < 3) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core8c4);
                  }
               }
            }
            roomState.active = false;
         } else if (
            !save.data.b.a_state_backtracker &&
            trueLizard() < 2 &&
            save.data.n.state_aerialis_corepath_puzzle === 3 &&
            save.data.n.state_aerialis_corepath_warrior < 3
         ) {
            save.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core12);
            game.movement = true;
         }
      },
      async a_core_right3 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (68 <= save.data.n.plot) {
            return;
         }
         if (!roomState.active && trueLizard() < 2 && save.data.n.state_aerialis_corepath_warrior < 3) {
            roomState.active = true;
            await timer.when(() => 68 <= save.data.n.plot || save.data.n.state_aerialis_corepath_warrior === 3);
            if (68 <= save.data.n.plot) {
               roomState.active = false;
               return;
            }
            if (save.data.n.state_aerialis_corepath_puzzle < 3) {
               if (save.data.b.a_state_backtracker) {
                  if (save.data.n.state_aerialis_corepath_state === 2) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core10b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core10c);
                  }
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core10a);
               }
            } else {
               await dialogue('dialoguerBottom', ...text.a_aerialis.core13);
            }
            roomState.active = false;
         }
      },
      async a_core_bridge (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (trueLizard() < 2 && save.data.n.plot_call < 8) {
               await timer.when(() => game.room === 'a_core_bridge' && player.x > 220 && game.movement);
               save.data.n.plot_call = 8;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core14);
            }
            if (save.data.n.plot < 67.1) {
               await timer.when(() => game.movement && game.room === 'a_core_bridge' && player.x > 560);
               await battler.encounter(player, groups.mushketeer, true, true);
               save.data.n.plot = 67.1;
               if (trueLizard() < 2) {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core15);
               } else if (world.genocide && save.data.b.spared_mushketeer && save.flag.n.ga_asrielSpareketeer++ < 1) {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.genotext.spareketeer);
               }
            }
         }
      },
      async a_core_checkpoint (roomState) {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && save.flag.n.ga_asrielCore6 < 1 && save.data.n.plot_approach < 7) {
               await timer.when(() => game.room === 'a_core_checkpoint' && player.x > 40 && game.movement);
               save.flag.n.ga_asrielCore6++;
               game.movement = false;
               save.data.n.plot_approach = 7;
               await dialogue('auto', ...text.a_aerialis.genotext.core7a);
               await timer.pause(650);
               azzie.metadata.override = true;
               const ox = azzie.x;
               await azzie.walk(timer, 3, { y: player.y + 21 }, { y: player.y + 21, x: 160 });
               await timer.pause(800);
               azzie.face = 'up';
               await timer.pause(1950);
               azzie.face = 'left';
               await dialogue('auto', ...text.a_aerialis.genotext.core7b);
               await azzie.walk(timer, 3, { x: ox }, { x: ox, y: player.y });
               await timer.pause(650);
               azzie.face = 'right';
               await timer.pause(850);
               await dialogue('auto', ...text.a_aerialis.genotext.core7c);
               azzie.metadata.override = false;
               azzie.metadata.reposition = true;
               game.movement = true;
            }
         }
      },
      async a_core_battle (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         const stageoverlay = instance('below', 'stageoverlay')!.object;
         stageoverlay.priority.value = 9999;
         if (save.data.n.plot < 68) {
            const neo = temporary(
               new CosmosAnimation({
                  alpha: world.genocide ? 1 : 0,
                  position: { x: 160, y: 120 },
                  resources: world.genocide ? content.iocMettatonNeo : content.iocMettatonSeriouspose,
                  anchor: { x: 0, y: 1 },
                  index: world.genocide ? 0 : 32
               }),
               'main'
            );
            events.on('teleport').then(() => renderer.detach('main', neo));
            if (!roomState.active) {
               roomState.active = true;
               await timer.when(() => game.room === 'a_core_battle' && player.y < 190 && game.movement);
               game.movement = false;
               save.data.n.plot = 68;
               const playerY = player.y;
               const overlayY = stageoverlay.y;
               const roomBG = rooms.of(game.room).layers.below![0];
               if (world.genocide) {
                  groups.mettaton2.assets.load();
                  if (save.flag.n.azzy_neo < 1) {
                     await dialogue('auto', ...text.a_aerialis.genotext.core8a);
                     await timer.pause(2350);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8b);
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8c);
                     await timer.pause(1650);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8d);
                     await timer.pause(1950);
                     neo.index = 1;
                     await dialogue('auto', ...text.a_aerialis.genotext.core8e);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.genotext.core8aX());
                  }
               } else {
                  game.music!.gain.value = 0;
                  const exLoader = inventories.exAssets.load();
                  save.flag.b.legs || (await timer.pause(850));
                  const cam = new CosmosObject({ position: player });
                  game.camera = cam;
                  if (!save.flag.b.legs) {
                     await cam.position.modulate(timer, 2000, { y: 140 });
                     await timer.pause(1400);
                  }
                  assets.sounds.shake.instance(timer);
                  shake(1, 400);
                  await renderer.alpha.modulate(timer, save.flag.b.legs ? 1000 : 2000, 0);
                  cam.y = 140;
                  await timer.pause(save.flag.b.legs ? 1000 : 2000);
                  renderer.alpha.value = 1;
                  const over = new CosmosSprite({ frames: [ content.iooASpotlightAlt ] });
                  renderer.attach('menu', over);
                  neo.alpha.value = 1;
                  assets.sounds.noise.instance(timer);
                  await timer.pause(save.flag.b.legs ? 1000 : 2000);
                  const bv = -7;
                  speech.emoters.mettaton = neo;
                  const ms = assets.music.mettsuspense.instance(timer);
                  ms.gain.value /= 10;
                  ms.gain.modulate(timer, 3000, ms.gain.value * 10);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end1());
                  ms.gain.modulate(timer, 1500, 0).then(() => {
                     ms.stop();
                  });
                  await over.alpha.modulate(timer, 750, 0);
                  renderer.detach('menu', over);
                  const distancePlayer = player.y - 80;
                  const distanceNeo = neo.y - 80;
                  const stage = new CosmosSprite({
                     alpha: 0,
                     anchor: { x: 0 },
                     position: { x: 160, y: 80 },
                     frames: [ content.iooAStage ],
                     gravity: { angle: 90 }
                  }).on('tick', function () {
                     this.y > 80 && (this.velocity.y = bv / 2);
                     player.y = this.y + distancePlayer;
                     neo.y = this.y + distanceNeo;
                  });
                  renderer.attach('below', stage);
                  assets.sounds.appear.instance(timer);
                  stage.alpha.modulate(timer, 1000, 1);
                  await timer.pause(1200);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end2);
                  assets.sounds.appear.instance(timer);
                  await Promise.all([ exLoader, stage.position.modulate(timer, 600, stage.position.subtract(0, 20)) ]);
                  assets.sounds.landing.instance(timer);
                  shake(1, 500);
                  await timer.pause(1300);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end3());
                  if (!save.flag.b.legs) {
                     assets.sounds.stab.instance(timer);
                     stage.velocity.y = bv;
                     stage.gravity.extent = distanceGravity(-stage.velocity.y, 120);
                     stageoverlay.position.modulate(timer, 500, { y: overlayY }, { y: 520 });
                     timer
                        .when(() => stage.position.y < 0)
                        .then(() => {
                           roomBG.alpha.modulate(timer, 600, 0);
                        });
                     const r = random.clone();
                     const speedline = new CosmosObject({ priority: -69420 }).on('tick', async function () {
                        this.position.set(renderer.projection({ x: 0, y: 0 }));
                        const c = Math.floor(r.next() * 3);
                        const x = ([ 2, 18, 30 ][c] + r.next() * [ 18, 18, 40 ][c]) / 2;
                        const s = new CosmosSprite({
                           anchor: { x: 0 },
                           position: { x: r.next() < 0.5 ? x : 320 - x, y: [ -100, -70, -40 ][c] },
                           velocity: { y: [ 26, 22, 15 ][c] },
                           scale: { y: [ 6, 4, 3 ][c] },
                           alpha: [ 0.9, 0.7, 0.3 ][c],
                           frames: [ content.iooASpeedline ],
                           tint: colormix(colormix(255, 65535, r.next()), 16777215, r.next() / 2)
                        }).on('tick', () => {
                           s.y > 240 && this.detach(s);
                        });
                        this.attach(s);
                     });
                     timer
                        .when(() => stage.velocity.y > 0)
                        .then(() => {
                           renderer.attach('main', speedline);
                        });
                     await timer.pause(1400);
                     assets.music.grandfinale.instance(timer);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end4);
                     await timer.pause(1000);
                     assets.sounds.shatter.instance(timer).gain.value *= 0.7;
                     await timer.pause(1000);
                     battler.garbage.push([ 'main', speedline ]);
                  }
                  battler.garbage.push([ 'below', stage ]);
               }
               await battler.encounter(
                  player,
                  world.genocide ? groups.mettaton2 : save.flag.b.legs ? groups.mettaton3 : groups.mettaton1,
                  false,
                  void 0,
                  { x: 160, y: 160 }
               );
               world.genocide || (player.x = 160);
               inventories.exAssets.unload();
               groups.mettaton2.assets.unload();
               player.y = playerY;
               stageoverlay.y = overlayY;
               roomBG.alpha.value = 1;
               game.camera = player;
               renderer.detach('main', neo);
               if (!world.genocide) {
                  game.movement = false;
                  const mtt2 = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iocMettatonBro ],
                     position: { x: 160, y: 120 },
                     objects: [
                        new CosmosHitbox({
                           anchor: { x: 0, y: 1 },
                           size: { x: 20, y: 5 },
                           metadata: { name: 'trivia', args: [ 'deadbot' ], barrier: true, interact: true }
                        })
                     ]
                  });
                  renderer.attach('main', mtt2);
                  const lizard = character(
                     'alphys',
                     characters.alphys,
                     { x: 160, y: trueLizard() < 2 ? 360 : 0 },
                     'down'
                  );
                  if (trueLizard() < 2) {
                     await lizard.walk(timer, 3, { y: player.y + 40 });
                  } else {
                     await lizard.walk(timer, 3, { y: player.y - 100 });
                     await timer.pause(2500);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end5());
                  if (trueLizard() < 2) {
                     await lizard.walk(timer, 3, { x: player.x - 30 }, { x: player.x - 30, y: mtt2.y });
                     lizard.face = 'right';
                     await timer.pause(850);
                     lizard.face = 'down';
                     await timer.pause(1200);
                  } else {
                     await timer.pause(800);
                     lizard.face = 'right';
                     await timer.pause(1800);
                     lizard.face = 'down';
                     await timer.pause(2700);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end6());
                  if (trueLizard() < 2) {
                     await lizard.walk(
                        timer,
                        3,
                        { y: mtt2.y + 10 },
                        { x: player.x, y: mtt2.y + 10 },
                        player.position.subtract(0, 30)
                     );
                     header('x1').then(() => (lizard.face = 'right'));
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end7());
                     await timer.pause(1500);
                     lizard.face = 'down';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end8);
                     await timer.pause(1500);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end9);
                     await timer.pause(1200);
                     await lizard.walk(
                        timer,
                        3,
                        { x: mtt2.x - 30 },
                        { x: mtt2.x - 30, y: mtt2.y - 20 },
                        { x: mtt2.x, y: mtt2.y - 20 }
                     );
                  } else {
                     await timer.pause(1200);
                  }
                  await lizard.walk(timer, 3, { y: 0 });
                  renderer.detach('main', lizard);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end10());
                  if (!save.data.b.oops) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end11);
                  }
                  events.on('teleport').then(() => renderer.detach('main', mtt2));
               }
               game.movement = true;
            }
         } else if (save.data.n.plot < 68.1 && !world.genocide) {
            temporary(
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iocMettatonBro ],
                  position: { x: 160, y: 120 },
                  objects: [
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 20, y: 5 },
                        metadata: { name: 'trivia', args: [ 'deadbot' ], barrier: true, interact: true }
                     })
                  ]
               }),
               'main'
            );
         }
      },
      async a_core_exit1 () {
         if (!world.genocide && save.data.n.plot < 68.1) {
            save.data.n.plot = 68.1;
            const di = 30;
            const lizard = character('alphys', characters.alphys, { x: 40, y: 140 }, 'down');
            teleporter.movement = false;
            game.movement = false;
            await timer.pause(1300);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk0());
            await player.walk(timer, 3, lizard.position.add(0, di));
            await Promise.all([ lizard.walk(timer, 3, { x: 220 }), player.walk(timer, 3, { y: 140 }, { x: 220 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk1());
            await Promise.all([ lizard.walk(timer, 3, { x: 540 }), player.walk(timer, 3, { x: 540 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk2());
            lizard.walk(timer, 3, { x: 620 }).then(() => lizard.alpha.modulate(timer, 300, 0));
            await player.walk(timer, 3, { x: 610 });
            await teleport('a_core_exit2', 'right', 20, 120, world);
            game.movement = false;
            lizard.alpha.value = 1;
            lizard.position.set({ x: 20 + di, y: 120 });
            lizard.alpha.modulate(timer, 0, 1);
            await Promise.all([ lizard.walk(timer, 3, { x: 160 }), player.walk(timer, 3, { x: 160 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk3);
            await Promise.all([ lizard.walk(timer, 3, { x: 540 }), player.walk(timer, 3, { x: 540 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk4());
            await lizard.walk(
               timer,
               3,
               { y: 140 },
               { x: game.camera.position.clamp(...renderer.region).x - 180, y: 140 }
            );
            renderer.detach('main', lizard);
            game.movement = true;
         }
      },
      async a_core_exit2 () {
         world.genocide || instance('main', 'deathnote')?.destroy();
      }
   } as { [k in AerialisRoomKey]?: (roomState: RoomStates[k], from: string) => any }
};

export const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (states.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      area.tickers[game.room as AerialisRoomKey]?.(roomState);
   } else {
      area.scripts[subscript]?.(roomState, (states.scripts[subscript] ??= {}), ...args);
   }
};

events.on('choice', choice => {
   if (save.data.s.armor === 'sonic' && choice.type === 'fight' && 0.98 <= choice.score) {
      battler.stat.monsteratk.modifiers.push([ 'multiply', 0.5, 1 ]);
   }
});

events.on('init-overworld', () => {
   game.room in exteriors && renderer.attach('below', spire);
   save.data.s.room === 'w_start' && (save.flag.b.legs = false);
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         switch (args[0]) {
            case 'bpants':
               shopper.open(shops.bpants, args[1] as CosmosDirection, +args[2], +args[3], true);
               if (world.genocide && !save.flag.b.asriel_bpants) {
                  save.flag.b.asriel_bpants = true;
                  timer
                     .when(() => atlas.target === null && game.movement)
                     .then(() => dialogue('auto', ...text.a_aerialis.genotext.azzyBpants));
               }
               break;
            case 'gossip':
               shopper.open(shops.gossip, args[1] as CosmosDirection, +args[2], +args[3], !evac());
               break;
         }
         break;
      case 'aerialis':
         script(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'a') {
            trivia(...CosmosUtils.provide(text.a_aerialis.trivia[args[0] as keyof typeof text.a_aerialis.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && save.data.n.plot < 65) {
      switch (game.room) {
         case 'a_path2':
         case 'a_path3':
         case 'a_path4':
         case 'a_puzzle1':
         case 'a_pacing':
         case 'a_prepuzzle':
         case 'a_puzzle2':
            const enc = runEncounter(
               (save.data.n.kills_aerialis + save.data.n.bully_aerialis) / 7,
               (() => {
                  if (game.room === 'a_puzzle1') {
                     return save.data.n.plot < 55 ? 0 : 1;
                  } else if (game.room === 'a_puzzle2') {
                     return save.data.n.plot < 59 ? 0 : 1;
                  } else {
                     return 1;
                  }
               })(),
               [
                  [ commonGroups.spacetop, 3 ],
                  [ groups.pyrope, 4 ],
                  [ groups.spacetopTsundere, 4 ],
                  [ groups.pyropeTsundere, 5 ],
                  [ groups.perigee, 5 ]
               ]
            );
            enc && enc.then(() => updateBadLizard());
            return !!enc;
      }
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'a' && script('tick');
});

events.on('teleport', (from, to) => {
   to in exteriors && renderer.attach('below', spire);
   const roomState = (states.rooms[to] ??= {});
   genCB();
   const random3 = random.clone();
   for (const { object } of instances('main', 'starflower')) {
      if (!object.metadata.active) {
         object.metadata.active = true;
         for (const sub of object.objects) {
            if (sub instanceof CosmosSprite) {
               const size = sub.compute();
               const half = size.divide(2);
               const offset = half.add(half.multiply(sub.anchor));
               const minRF = 0.01;
               let simulatedParticles = Math.floor(1 / minRF);
               async function spawnParticle () {
                  let simulationTicks = simulatedParticles--;
                  if (random3.next() < 1 / 2) {
                     const rando = size.multiply(random3.next(), random3.next()).floor();
                     const color = flowersampler[rando.x][rando.y];
                     if (color[0] > 0) {
                        const particle = new Graphics();
                        const alpha = new CosmosValue(0.8);
                        const position = rando.subtract(offset);
                        const slant = random3.next() * 2 - 1;
                        const upSpeed = (0.5 + random3.next() * 0.75) / 2;
                        const reductionFactor = (minRF + random3.next() * 0.02) * alpha.value;
                        sub.container.addChild(
                           particle.beginFill(CosmosBitmap.color2hex(color), 1).drawRect(0, 0, 1, 1).endFill()
                        );
                        while (alpha.value > 0) {
                           if (simulationTicks > 0) {
                              simulationTicks--;
                           } else {
                              particle.alpha = alpha.value;
                              particle.position.set(position.x, position.y);
                              await sub.on('render');
                           }
                           position.x += slant / 4;
                           position.y -= upSpeed;
                           alpha.value -= reductionFactor;
                        }
                        sub.container.removeChild(particle);
                        particle.destroy();
                     }
                  }
               }
               sub.on('tick', async function () {
                  if (flowersampler.length > 0) {
                     while (simulatedParticles > 0) {
                        spawnParticle();
                        simulatedParticles--;
                     }
                     spawnParticle();
                  }
               });
               break;
            }
         }
      }
   }
   for (const inst of instances('main', 'darkable')) {
      inst.object.tint = world.genocide ? 0x999999 : 0xffffff;
   }
   const inst = instance('below', 'riverboi_x');
   if (inst) {
      if (
         save.data.n.plot < 65 ||
         world.genocide ||
         (game.room === 'a_lookout' && !save.data.b.onionsan && !!instance('main', 'warpmarker')) ||
         (game.room === 'w_wonder' && !save.flag.b.w_state_core && player.y > 0)
      ) {
         inst.destroy();
      } else {
         instance('below', 'taxibarrier')?.destroy();
         inst.object.priority.value = -1000;
         inst.object.metadata.taxitop = temporary(
            new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iooTaxiOverlay }).on('tick', function () {
               this.index = (inst.object.objects[0] as CosmosSprite).index;
               this.position.set(inst.object);
            }),
            'main'
         );
      }
      const wonder = assets.music.wonder.instance(timer);
      wonder.gain.value = 0;
      wonder.gain.modulate(timer, 20000, 0.05);
      events.on('teleport-start').then(() => {
         wonder.gain.modulate(timer, 300, 0);
      });
   }
   area.teleports[to as AerialisRoomKey]?.(roomState, from);
});

events.on('teleport-start', async (a, to) => {
   if (to === 'a_auditorium' && save.data.n.plot < 65 && trueLizard() > 1) {
      save.data.n.plot = 64.1;
      game.music?.gain.modulate(timer, 300, 0);
      game.movement = false;
      events.on('teleport').then(() => {
         operaShow(world.genocide ? azzie : new CosmosCharacter({ preset: characters.none, key: 'amogus' }));
      });
   }
});

events.on('use', key => {
   switch (key) {
      case 'filament':
         save.storage.inventory.add('filament_use1');
         break;
      case 'filament_use1':
         save.storage.inventory.add('filament_use2');
         break;
      case 'filament_use2':
         save.storage.inventory.add('filament_use3');
         break;
      case 'filament_use3':
         save.storage.inventory.add('filament_use4');
         break;
   }
});

renderer.on('tick', () => {
   if (game.room[0] === 'a' && renderer.layers.below.active && game.room.startsWith('a_core')) {
      const roomState = (states.rooms[game.room] ??= {});
      roomState.hexfloor ??= [
         ...new Set(
            ((instance('below', 'hexfloor')?.object.objects ?? []) as CosmosHitbox[]).flatMap(hitbox => {
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
      if (roomState.hexfloor.length > 0 && hex.dtime <= timer.value) {
         const parent = instance('below', 'hexfloor')!.object;
         const rand = (hex.rand ??= random.clone()) as CosmosValueRandom;
         const direction = Math.floor(rand.next() * 3);
         const reverse = rand.next() < 0.5 ? false : true;
         let path = hex.paths[direction];
         const sprite = new CosmosAnimation({
            alpha: 1 / hex.fader,
            index: hex.sets[direction][Math.floor(rand.next() * 8)],
            metadata: { tick: 1 },
            priority: 2,
            resources: content.iooAFloorsegment,
            position: new CosmosPoint(
               roomState.hexfloor[Math.floor(rand.next() * roomState.hexfloor.length)] as CosmosPointSimple
            ).add(0, rand.next() < 0.5 ? 0 : 10),
            tint: hex.tint
         }).on('render', async function () {
            let rounds = 0;
            while (rounds++ < 2) {
               if (rand.next() < 0.33) {
                  const otherdir = (direction + Math.floor(rand.next() * 2)) % 3;
                  if (hex.paths[otherdir].includes(this.index)) {
                     path = hex.paths[otherdir];
                  }
               }
               const position = reverse ? path.lastIndexOf(this.index) - 1 : path.indexOf(this.index) + 1;
               const target = path[position];
               if (typeof target === 'number') {
                  this.index = target;
               } else {
                  const targetPosition = this.position[reverse ? 'subtract' : 'add'](target);
                  if (hex.valid(roomState.hexfloor, targetPosition)) {
                     this.position.set(targetPosition);
                     this.index = path[reverse ? position - 1 : position + 1] as number;
                  } else {
                     this.alpha.value = 0;
                     timer.pause(3).then(() => {
                        parent.objects.splice(parent.objects.indexOf(this), 1);
                     });
                     return;
                  }
               }
               const echo = new CosmosAnimation({
                  alpha: this.alpha.value,
                  index: this.index,
                  position: this.position.value(),
                  priority: 1,
                  resources: content.iooAFloorsegment,
                  tint: hex.tint
               }).on('tick', function () {
                  if ((this.alpha.value *= 0.8) < 0.04) {
                     timer.pause(3).then(() => {
                        parent.objects.splice(parent.objects.indexOf(this), 1);
                     });
                  }
               });
               timer.pause(3).then(() => parent.attach(echo));
               this.alpha.value = Math.min(++this.metadata.tick / hex.fader, 1);
               rounds < 2 && (await timer.pause(100 / 6));
            }
         });
         hex.dtime = timer.value + hex.delay.baseRate / (roomState.hexfloor.length / hex.delay.baseTile);
         parent.attach(sprite);
         if (!parent.metadata.active) {
            parent.metadata.active = true;
            events.on('teleport').then(() => {
               parent.metadata.active = false;
               parent.objects = [];
               hex.dtime = -Infinity;
            });
         }
      }
   }
});

const tabla = { hp: NaN };

events.on('defeat', () => (tabla.hp = NaN));
events.on('escape', () => (tabla.hp = NaN));
events.on('exit', () => (tabla.hp = NaN));
events.on('victory', () => (tabla.hp = NaN));

events.on('resume', async () => {
   if (save.data.s.weapon === 'tablaphone' && !isNaN(tabla.hp)) {
      const loss = tabla.hp - save.data.n.hp;
      loss > 0 && heal(Math.ceil(loss / 7), true);
   }
   tabla.hp = save.data.n.hp;
});

export const shops = {
   bpants: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isbpBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.bpants.vars.sell) {
                  await shopper.text(...text.n_shop_bpants.sell2);
               } else {
                  shops.bpants.vars.sell = true;
                  await shopper.text(...text.n_shop_bpants.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.n_shop_bpants.exit());
               const music = shops.bpants.music!.instances.slice(-1)[0];
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
               if (shopper.listIndex === 3 && save.data.b.item_face_steak) {
                  typer.text(text.n_shop_bpants.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.n_shop_bpants.talkText(shopper.listIndex));
            }
         }
      },
      keeper: new CosmosAnimation({
         anchor: { x: 0, y: 1 },
         position: { x: 160, y: 120 },
         resources: content.isbpKeeper,
         objects: [
            new CosmosSprite({
               anchor: { x: 0, y: 1 },
               alpha: 0,
               frames: [ content.isbpArms ],
               offsets: [ {} ],
               position: { x: -48, y: 2 }
            }).on('tick', function () {
               const r: CosmosValueRandom = (this.metadata.random3 ??= random.clone());
               this.offsets[0].set((r.next() * 0.6 - r.next() * 0.6) * 1.1, (r.next() * 0.6 - r.next() * 0.6) * 1.1);
            }),
            new CosmosAnimation({
               anchor: 1,
               alpha: 0,
               active: true,
               resources: content.isbpCloud,
               position: { x: -31, y: -41 }
            })
         ]
      }).on('tick', function () {
         this.objects[0].alpha.value = [ 3 ].includes(this.index) ? 1 : 0;
         this.objects[1].alpha.value = this.index === 6 ? 1 : 0;
      }),
      music: assets.music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_bpants.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_bpants.item();
         } else {
            return text.n_shop_bpants.talk();
         }
      },
      preset (index) {
         shops.bpants.keeper.index = index;
      },
      price () {
         return [ 19, 40, 25, 100 ][shopper.listIndex] * (world.population === 0 && !world.bullied ? 2 : 1);
      },
      prompt () {
         return text.n_shop_bpants.itemPurchasePrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8) {
               if (world.genocide) {
                  shops.bpants.vars.purchase = 1;
                  save.data.n.g = Math.max(save.data.n.g - CosmosUtils.provide(shops.bpants.price), 0);
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.bpants.price);
                  if (save.data.n.g < price) {
                     shops.bpants.vars.purchase = 3;
                  } else {
                     shops.bpants.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.bpants.vars.purchase = 4;
            }
         } else if (trueLizard() < 2) {
            shops.bpants.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'starfait', 'legendary_hero', 'glamburger', 'face_steak' ][shopper.listIndex];
            if (world.genocide || (world.population === 0 && !world.bullied)) {
               save.storage.inventory.add(`${item}_x`);
            } else {
               save.storage.inventory.add(item);
            }
            item === 'face_steak' && (save.data.b.item_face_steak = true);
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
         if (shops.bpants.vars.purchase || 0 > 0) {
            const purchaseValue = shops.bpants.vars.purchase as number;
            shops.bpants.vars.purchase = 0;
            return text.n_shop_bpants.itemPurchase()[purchaseValue - 1];
         } else if (atlas.target === 'shop') {
            if (shops.bpants.vars.idle) {
               return text.n_shop_bpants.menuPrompt2();
            } else {
               shops.bpants.vars.idle = true;
               return text.n_shop_bpants.menuPrompt1();
            }
         } else if (shopper.index === 0) {
            return text.n_shop_bpants.itemPrompt();
         } else {
            return text.n_shop_bpants.talkPrompt();
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && save.data.b.item_face_steak) {
                  return null;
               }
               const info = items.of([ 'starfait', 'legendary_hero', 'glamburger', 'face_steak' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.n_shop_bpants.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   gossip: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isgBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.gossip.vars.sell || save.data.b.steal_gossip) {
                  await gossiper.dialogue(...text.n_shop_gossip.sell2());
               } else {
                  shops.gossip.vars.sell = true;
                  if (evac()) {
                     save.data.n.g += 137;
                     save.data.b.steal_gossip = true;
                  }
                  await gossiper.dialogue(...text.n_shop_gossip.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch(trueLizard() < 2 ? 'shopTextGossip' : 'shopText');
               await gossiper.dialogue(...text.n_shop_gossip.exit());
               const music = shops.gossip.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else if (evac() && shopper.index === 2) {
               await gossiper.dialogue(...text.n_shop_gossip.note());
               if (world.genocide && !save.flag.b.asriel_electrics) {
                  save.flag.b.asriel_electrics = true;
                  await timer.when(() => atlas.target === null && game.movement);
                  await dialogue('auto', ...text.a_aerialis.genotext.hotelElectrics);
               }
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (
                  shopper.listIndex > 0 &&
                  save.data.b[`item_${[ 'laser', 'visor', 'mystery_key' ][shopper.listIndex - 1] as 'laser'}`]
               ) {
                  typer.text(text.n_shop_gossip.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await gossiper.dialogue(...text.n_shop_gossip.talkText(shopper.listIndex));
            }
         }
      },
      keeper: new CosmosSprite({
         objects: [
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               metadata: { angle3: 0, time5: null as number | null },
               resources: content.isgKeeper2,
               position: { x: 60, y: 130 },
               offsets: [ 0 ],
               objects: [
                  new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.isgArm2 ] }),
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     scale: { x: -1 },
                     frames: [ content.isgArm2 ],
                     offsets: [ 0 ]
                  })
               ]
            }).on('tick', function () {
               const [ arm1, arm2 ] = this.objects as CosmosSprite[];
               if (this.index === 3) {
                  (this.metadata.angle3 -= 12) < 0 && (this.metadata.angle3 += 360);
               } else {
                  this.metadata.angle3 = 0;
               }
               if (this.index === 5) {
                  this.metadata.time5 ??= timer.value;
                  this.offsets[0].y = sineWaver(this.metadata.time5, 250, -2, 1);
                  arm1.alpha.value = 0;
                  arm2.offsets[0].y = sineWaver(this.metadata.time5, 250, 2.5, -1.5, 0.15);
               } else {
                  this.metadata.time5 = null;
                  this.offsets[0].y = 0;
                  arm1.alpha.value = 1;
                  arm2.offsets[0].y = 0;
               }
               switch (this.index) {
                  case 0:
                  case 1:
                  case 4:
                     arm1.position.set({ x: -17, y: 67 });
                     arm2.position.set({ x: -3, y: 64 });
                     break;
                  case 2:
                     arm1.position.set({ x: -17, y: 57 });
                     arm2.position.set({ x: -3, y: 54 });
                     break;
                  case 3:
                     arm1.position.set(new CosmosPoint({ x: -17, y: 49 }).endpoint(this.metadata.angle3, 2));
                     arm2.position.set(new CosmosPoint({ x: -3, y: 46 }).endpoint(this.metadata.angle3, 2));
                     break;
                  case 5:
                     arm2.position.set({ x: 42, y: 18 });
                     break;
               }
            }),
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.isgKeeper1,
               metadata: {
                  angle1: 0,
                  angle2: 0,
                  angle9: 0,
                  time7: null as number | null,
                  time8: null as number | null
               },
               position: { x: 160, y: 130 },
               offsets: [ 0, 0 ],
               objects: [
                  new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.isgArm1, offsets: [ 0, 0 ] }),
                  new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     scale: { x: -1 },
                     resources: content.isgArm1,
                     offsets: [ 0, 0 ]
                  })
               ]
            }).on('tick', function () {
               const [ arm1, arm2 ] = this.objects as CosmosAnimation[];
               if (this.index === 1) {
                  (this.metadata.angle1 -= 12) < 0 && (this.metadata.angle1 += 360);
               } else {
                  this.metadata.angle1 = 0;
               }
               if (this.index === 2) {
                  (this.metadata.angle2 -= 24) < 0 && (this.metadata.angle2 += 360);
               } else {
                  this.metadata.angle2 = 0;
               }
               if (this.index === 7) {
                  this.metadata.time7 ??= timer.value;
                  this.offsets[0].x = sineWaver(this.metadata.time7, 600, 2, -2);
                  const x = sineWaver(this.metadata.time7, 600, -8, 8, 0.05);
                  const y = (1 - Math.abs(x) / 8) * -3;
                  arm1.offsets[0].set(x, y);
                  arm2.offsets[0].set(x, y);
               } else {
                  this.metadata.time7 = null;
                  this.offsets[0].x = 0;
                  arm1.offsets[0].set(0, 0);
                  arm2.offsets[0].set(0, 0);
               }
               if (this.index === 8) {
                  this.metadata.time8 ??= timer.value;
                  this.offsets[1].y = sineWaver(this.metadata.time8, 250, -2, 1);
                  const y = sineWaver(this.metadata.time8, 250, 2.5, -1.5, 0.15);
                  arm1.offsets[1].y = y;
                  arm2.offsets[1].y = y;
               } else {
                  this.metadata.time8 = null;
                  this.offsets[1].y = 0;
                  arm1.offsets[1].y = 0;
                  arm2.offsets[1].y = 0;
               }
               if (this.index === 9) {
                  (this.metadata.angle9 -= 12) < 0 && (this.metadata.angle9 += 360);
               } else {
                  this.metadata.angle9 = 0;
               }
               switch (this.index) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                     arm1.alpha.value = 0;
                     arm2.alpha.value = 0;
                     break;
                  case 1:
                  case 7:
                  case 8:
                  case 9:
                     arm1.alpha.value = 1;
                     arm2.alpha.value = 1;
                     break;
                  case 2:
                  case 4:
                     arm1.alpha.value = 1;
                     arm2.alpha.value = 0;
                     break;
               }
               switch (this.index) {
                  case 1:
                     arm1.index = 2;
                     arm1.position.set(new CosmosPoint({ x: 9, y: 20 }).endpoint(this.metadata.angle1, 3));
                     arm2.index = 2;
                     arm2.position.set(new CosmosPoint({ x: -10, y: 14 }).endpoint(this.metadata.angle1, 3));
                     break;
                  case 2:
                     arm1.index = 2;
                     arm1.position.set(new CosmosPoint({ x: 22, y: 12 }).endpoint(this.metadata.angle2, 4));
                     break;
                  case 4:
                     arm1.index = 1;
                     arm1.position.set({ x: 7, y: 12 });
                     break;
                  case 7:
                     arm1.index = 1;
                     arm1.position.set({ x: 23, y: 16 });
                     arm2.index = 1;
                     arm2.position.set({ x: -23, y: 16 });
                     break;
                  case 8:
                     arm1.index = 1;
                     arm1.position.set({ x: 21, y: 16 });
                     arm2.index = 1;
                     arm2.position.set({ x: -21, y: 16 });
                     break;
                  case 9:
                     arm1.index = 0;
                     arm1.position.set(new CosmosPoint({ x: 25, y: 16 }).endpoint(this.metadata.angle9, 1.5));
                     arm2.index = 0;
                     arm2.position.set(new CosmosPoint({ x: -25, y: 16 }).endpoint(this.metadata.angle9, 1.5));
                     break;
               }
            })
         ]
      }),
      music: assets.music.thriftShop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_gossip.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_gossip.item();
         } else {
            return text.n_shop_gossip.talk();
         }
      },
      preset (index1 = 0, index2 = 0, index3 = -1) {
         index1 > -1 && ((shops.gossip.keeper.objects[0] as CosmosAnimation).index = index1);
         index2 > -1 && ((shops.gossip.keeper.objects[1] as CosmosAnimation).index = index2);
         index3 > -1 && (assets.music.thriftShop.instances[0].gain.value = assets.music.thriftShop.gain * index3);
      },
      price () {
         return [ 10, 180, 180, 400 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_gossip.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8 || shopper.listIndex === 3) {
               if (evac()) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.gossip.price);
                  if (save.data.n.g < price) {
                     shops.gossip.vars.purchase = 3;
                  } else {
                     shops.gossip.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.gossip.vars.purchase = 4;
            }
         } else if (trueLizard() < 2) {
            shops.gossip.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'trash', 'laser', 'visor', 'mystery_key' ][shopper.listIndex];
            shopper.listIndex < 3 && save.storage.inventory.add(item);
            if (item === 'laser' || item === 'visor' || item === 'mystery_key') {
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
         if (shops.gossip.vars.purchase || 0 > 0) {
            const purchaseValue = shops.gossip.vars.purchase as number;
            shops.gossip.vars.purchase = 0;
            if (evac() && purchaseValue < 4) {
               return text.n_shop_gossip.zeroPrompt;
            } else {
               return text.n_shop_gossip.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (evac()) {
               return text.n_shop_gossip.menuPrompt3();
            } else if (shops.gossip.vars.idle) {
               return text.n_shop_gossip.menuPrompt2;
            } else {
               shops.gossip.vars.idle = true;
               return text.n_shop_gossip.menuPrompt1;
            }
         } else if (evac()) {
            return text.n_shop_gossip.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_gossip.itemPrompt;
         } else {
            return text.n_shop_gossip.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && save.data.b.item_face_steak) {
                  return null;
               }
               const info = items.of([ 'trash', 'laser', 'visor', 'mystery_key' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.n_shop_gossip.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

CosmosUtils.status(`LOAD MODULE: AERIALIS AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
