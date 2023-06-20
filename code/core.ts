import fonts$info from '../assets/fonts.json';
import ComicSans from '../assets/fonts/ComicSans.png?url';
import CryptOfTomorrow from '../assets/fonts/CryptOfTomorrow.png?url';
import DeterminationMono from '../assets/fonts/DeterminationMono.png?url';
import DeterminationSans from '../assets/fonts/DeterminationSans.png?url';
import DiaryOfAn8BitMage from '../assets/fonts/DiaryOfAn8BitMage.png?url';
import DotumChe from '../assets/fonts/DotumChe.png?url';
import MarsNeedsCunnilingus from '../assets/fonts/MarsNeedsCunnilingus.png?url';
import Papyrus from '../assets/fonts/Papyrus.png?url';

import { Filter, Rectangle } from 'pixi.js';
import { OutertaleChoice, OutertaleLayerKey, OutertaleMap, OutertaleRoom, OutertaleSpeechPreset } from './classes';
import { CosmosAtlas } from './engine/atlas';
import { CosmosAudio, CosmosDaemon, CosmosEffect, CosmosInstance, CosmosMixer } from './engine/audio';
import { CosmosEventHost, CosmosRegistry } from './engine/core';
import { CosmosImage, CosmosSprite } from './engine/image';
import { CosmosKeyboardInput } from './engine/input';
import { CosmosPointSimple, CosmosValueRandom } from './engine/numerics';
import { CosmosHitbox, CosmosObject, CosmosRenderer } from './engine/renderer';
import { CosmosFont, CosmosTyper } from './engine/text';
import { CosmosDirection, CosmosKeyed, CosmosProvider, CosmosUtils } from './engine/utils';

declare const ___spacetime___: {
   data: () => string | null;
   exec: {
      (a: 'dialog.open'): Promise<string | null>;
      (a: 'dialog.save', b: string): Promise<boolean>;
      (a: 'reload', b?: boolean): Promise<void>;
      (a: 'toggle.panel', b?: boolean): Promise<void>;
   };
   mods: () => string[] | null;
   writeRoom: (name: string, data: string) => Promise<boolean>;
   writeSave: (data: string) => Promise<boolean>;
};

export const atlas = new CosmosAtlas();

export const audio = (() => {
   const context = new AudioContext();
   const musicFilter = new CosmosEffect(context, CosmosAudio.utils.filter(context, 'lowpass', 500), 0);
   const musicReverb = new CosmosEffect(context, CosmosAudio.utils.convolver(context, 1, 1, 1, 0, 0), 0);
   const musicMixer = new CosmosMixer(context, [ musicFilter, musicReverb ]);
   const musicToggle = context.createGain();
   const soundToggle = context.createGain();
   return {
      context,
      music: new CosmosRegistry(new CosmosDaemon(new CosmosAudio(''), { context })),
      musicFilter,
      musicReverb,
      musicRouter (input: GainNode, context: AudioContext) {
         input.connect(musicToggle).connect(musicMixer.input);
         musicMixer.output.connect(context.destination);
      },
      musicToggle,
      musicMixer,
      soundRouter (input: GainNode, context: AudioContext) {
         input.connect(soundToggle).connect(context.destination);
      },
      sounds: new CosmosRegistry(new CosmosDaemon(new CosmosAudio(''), { context })),
      soundToggle
   };
})();

export const backend = (() => {
   const spacetime = typeof ___spacetime___ === 'object' ? ___spacetime___ : null;
   return {
      available: spacetime !== null,
      get data () {
         return spacetime?.data() ?? '[]';
      },
      dialog: {
         async open (): Promise<string | null> {
            return (await spacetime?.exec('dialog.open')) ?? null;
         },
         async save (content: string): Promise<boolean> {
            return (await spacetime?.exec('dialog.save', content)) ?? false;
         }
      },
      file: {
         async writeRoom (room: string, content: string) {
            return (await spacetime?.writeRoom(room, content)) ?? false;
         },
         async writeSave (content: string): Promise<boolean> {
            return (await spacetime?.writeSave(content)) ?? false;
         }
      },
      get mods () {
         return spacetime?.mods() ?? [];
      },
      reload (respawn = false) {
         spacetime?.exec('reload', respawn);
      },
      toggle: {
         async panel (state?: boolean): Promise<void> {
            await spacetime?.exec('toggle.panel', state);
         }
      }
   };
})();

export function exit () {
   backend.available ? close() : (location.href = 'about:blank');
}

export const launch = { intro: true, overworld: true, timeline: true };

export const events = new CosmosEventHost<{
   // when battle is initiated, before screen unfade
   battle: [];
   // use for post-battle pre-movement event
   'battle-exit': [];
   // when the player makes a choice in the battle screen
   choice: [OutertaleChoice];
   // when the player is killed in battle
   defeat: [];
   // when the player drops an item
   drop: [string];
   // when the player successfully flees an encounter
   escape: [];
   // event fired to exit battle
   exit: [];
   // when the player is healed
   heal: [CosmosHitbox, number];
   // when the player is hurt
   hurt: [CosmosHitbox, number];
   // fired when the game is initialized
   init: [];
   // fired to wait for any intro sequences
   'init-intro': [];
   // fired after the intro phase and before the overworld phase
   'init-between': [];
   // initializes the overworld
   'init-overworld': [];
   // when the cyan soul leaps
   leap: [];
   // when the game is loaded fully
   loaded: [];
   // when a mod is loaded fully
   'loaded-mod': [string];
   // when the mods are loaded
   modded: [];
   // ready or not, here he comes!!!
   ready: [];
   // when the save data is reset
   reset: [];
   // when battle screen returns to menu
   resume: [];
   // when a battle option is selected
   select: ['fight' | 'spare' | 'flee' | 'assist'] | ['act' | 'item', string];
   // when a script is fired
   script: [string, ...string[]];
   // when the current speaker is not spekaing
   shut: [];
   // when the player first spawns in
   spawn: [];
   // fired when the player moves (before a movement tick)
   step: [];
   // when the player swings or uses their weapon
   swing: [];
   // when the screen is tap-dragged (swiped)
   swipe: [number, CosmosPointSimple];
   // when the current speaker is speaking
   talk: [];
   // fired on every game tick where player movement is enabled
   tick: [];
   // when the player changes rooms
   teleport: [string, string];
   // when the player changes rooms (early)
   'teleport-start': [string, string];
   // directly after the room value is changed in a teleport
   'teleport-update': [CosmosDirection, CosmosPointSimple];
   // when the screen is touched
   touch: [number, CosmosPointSimple?];
   // when an item is used (can be in-battle or not)
   use: [string];
   // when the player spares or slays all opp.
   victory: [];
}>();

export const fonts = {
   ComicSans,
   CryptOfTomorrow,
   DeterminationMono,
   DeterminationSans,
   DiaryOfAn8BitMage,
   DotumChe,
   MarsNeedsCunnilingus,
   Papyrus
};

export const fontLoader = Promise.all(
   fonts$info.map(font => CosmosFont.import(fonts[font.name as keyof typeof fonts], font))
).then(list => {
   for (const { name, font } of list) {
      CosmosFont.register(name, font);
   }
});

export const game = {
   /** whether the player has loaded into the world or not */
   active: false,
   /** game camera director */
   camera: new CosmosObject(),
   /** some developer menu is active */
   developer: false,
   /** fullscreen state */
   get fullscreen () {
      return new URLSearchParams(location.search).has('fullscreen');
   },
   /** game initialized */
   init: false,
   /** enable or disable all input */
   input: true,
   /** allow interactions (automatic value) */
   interact: true,
   /** allow opening overworld menu */
   menu: true,
   /** enable or disable overworld movement */
   movement: false,
   /** current music */
   music: null as CosmosInstance | null,
   /** disable player hitbox from interacting with the overworld */
   noclip: false,
   /** get ratio'd */
   ratio: 1,
   /** handle resizing */
   resize () {
      const width = game.developer ? 960 : 640;
      const height = 480;
      const frame = document.querySelector('#frame') as HTMLElement;
      const wrapper = document.querySelector('#wrapper') as HTMLElement;
      let ratio: number;
      if (frame.clientWidth / frame.clientHeight < width / height) {
         ratio = frame.clientWidth / width;
      } else {
         ratio = frame.clientHeight / height;
      }
      game.ratio = ratio;
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.transform = `scale(${ratio})`;
   },
   /** current room */
   room: '',
   /** true if player has spawned */
   spawned: false,
   /** the current dialoguer text */
   text: '',
   /** game timer */
   timer: false,
   // slow mode
   vortex: false
};

export const image = {
   filters: new CosmosRegistry(new Filter()),
   tints: new CosmosRegistry(0xffffff)
};

export function init () {
   if (!game.init) {
      game.init = true;
      renderer.active = true;
      events.fire('init');
      timer.start();
   }
}

export const items = new CosmosRegistry<
   string,
   {
      type: 'consumable' | 'armor' | 'weapon' | 'special';
      value: number;
      sell1?: number;
      sell2?: number;
      text: {
         battle: { description: CosmosProvider<string>; name: CosmosProvider<string> };
         drop: CosmosProvider<string[]>;
         info: CosmosProvider<string[]>;
         name: CosmosProvider<string>;
         use: CosmosProvider<string[]>;
      };
   }
>({
   type: 'consumable',
   value: 0,
   text: { battle: { description: '', name: '' }, drop: [], info: [], name: '', use: [] }
});

export const keys = {
   altKey: new CosmosKeyboardInput(null, 'AltLeft', 'AltRight'),
   backspaceKey: new CosmosKeyboardInput(null, 'Backspace'),
   downKey: new CosmosKeyboardInput(null, 'ArrowDown', 'KeyS', 'Numpad5'),
   editorKey: new CosmosKeyboardInput(null, 'Tab'),
   freecamKey: new CosmosKeyboardInput(null, 'KeyE'),
   interactKey: new CosmosKeyboardInput(null, 'KeyZ', 'Enter', 'Numpad1'),
   leftKey: new CosmosKeyboardInput(null, 'ArrowLeft', 'KeyA', 'Numpad4'),
   menuKey: new CosmosKeyboardInput(null, 'KeyC', 'ControlLeft', 'ControlRight', 'Numpad3'),
   noclipKey: new CosmosKeyboardInput(null, 'KeyQ'),
   openKey: new CosmosKeyboardInput(null, 'KeyO'),
   quitKey: new CosmosKeyboardInput(null, 'Escape'),
   rightKey: new CosmosKeyboardInput(null, 'ArrowRight', 'KeyD', 'Numpad6'),
   saveKey: new CosmosKeyboardInput(null, 'KeyS'),
   shiftKey: new CosmosKeyboardInput(null, 'ShiftLeft', 'ShiftRight'),
   specialKey: new CosmosKeyboardInput(null, 'KeyX', 'ShiftLeft', 'ShiftRight', 'Numpad2'),
   upKey: new CosmosKeyboardInput(null, 'ArrowUp', 'KeyW', 'Numpad8')
};

export const maps = new CosmosRegistry<string, OutertaleMap>(new OutertaleMap('', new CosmosImage('')));

export function param (key: string, value: string | null = null) {
   const params = new URLSearchParams(location.search);
   value === null ? params.delete(key) : params.set(key, value);
   history.replaceState(null, '', `${location.origin + location.pathname}?${params.toString()}${location.hash}`);
}

export const random = new CosmosValueRandom();

/** reload the game */
export async function reload (respawn = false) {
   param('respawn', respawn ? '' : null);
   backend.available ? backend.reload(respawn) : location.reload();
   await new Promise(() => {});
}

export const renderer = new CosmosRenderer<OutertaleLayerKey>({
   area: new Rectangle(0, 0, 640, 480),
   active: false,
   wrapper: '#wrapper',
   layers: { base: [ 'fixed' ], below: [], main: [ 'vertical' ], above: [], menu: [ 'fixed' ] },
   size: { x: 640, y: 480 },
   scale: 2
});

export const rooms = new CosmosRegistry<string, OutertaleRoom>(new OutertaleRoom());

export const speech = {
   emoters: {} as CosmosKeyed<CosmosSprite>,
   state: {
      face: null as CosmosSprite | null,
      get font1 () {
         return speech.state.preset.font1;
      },
      get font2 () {
         return speech.state.preset.font2;
      },
      preset: new OutertaleSpeechPreset()
   },
   presets: new CosmosRegistry<string, OutertaleSpeechPreset>(new OutertaleSpeechPreset()),
   targets: new Set<CosmosSprite>()
};

export const timer = renderer.timer;
export const typer = new CosmosTyper({ timer });

CosmosUtils.status(`LOAD MODULE: CORE (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
