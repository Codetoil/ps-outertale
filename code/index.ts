/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//    ::::::::   ::::::::   ::::::::  ::::::::::::  ::::::::   ::::::::    //
//   :+:    :+: :+:    :+: :+:        :+:  ::  :+: :+:    :+: :+:          //
//   +:+        +:+    +:+ +:+        +:+  ::  +:+ +:+    +:+ +:+          //
//   +#+        +#+    +#+  #++::++#  +#+  ++  +#+ +#+    +#+  #++::++#    //
//   +#+        +#+    +#+        +#+ +#+  ++  +#+ +#+    +#+        +#+   //
//   #+#    #+# #+#    #+#        #+# #+#      #+# #+#    #+#        #+#   //
//    ########   ########   ########  ###      ###  ########   ########    //
//                                                                         //
//// powered by cosmos - highly optimizated /////////////////////////////////

import './common';

import './outlands';

import './starton';

import './foundry';

import './aerialis';

import './citadel';

import { BaseTexture, SCALE_MODES, settings } from 'pixi.js';
import * as api from './api';
import { atlas, backend, events, game, keys, launch, reload, renderer } from './core';
import * as developer from './developer';
import { CosmosUtils } from './engine/utils';
import { battler, saveSelector } from './mantle';
import save from './save';
import './types.d';

export type OutertaleMod = (mod: string, api: typeof import('./api')) => any;

import.meta.hot?.on('vite:beforeFullReload', () => {
   throw developer.logician.viteError;
});

settings.RESOLUTION = 1;
settings.ROUND_PIXELS = true;
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

const respawn = new URLSearchParams(location.search).has('respawn');
const namespace = new URLSearchParams(location.search).has('namespace');

function atlasInput (key = null as string | null) {
   return (
      !keys.altKey.active() &&
      (game.input || (developer.editor.input && [ 'ArrowLeft', 'ArrowRight' ].includes(key!))) &&
      (!game.movement || battler.active) &&
      atlas.target
   );
}

keys.downKey.on('down', () => atlasInput() && atlas.seek('down'));
keys.interactKey.on('down', () => atlasInput() && atlas.next());
keys.leftKey.on('down', key => atlasInput(key) && atlas.seek('left'));
keys.rightKey.on('down', key => atlasInput(key) && atlas.seek('right'));
keys.specialKey.on('down', () => atlasInput() && atlas.prev());
keys.upKey.on('down', () => atlasInput() && atlas.seek('up'));

renderer.on('tick', {
   priority: Infinity,
   listener () {
      this.freecam || this.position.set(game.camera);
   }
});

addEventListener('keydown', event => {
   if (event.code === 'F4') {
      backend.available || (document.fullscreenElement ? document.exitFullscreen() : document.body.requestFullscreen());
   } else if (!game.developer || [ 'Tab', 'F11' ].includes(event.code)) {
      event.preventDefault();
   } else if ((event.ctrlKey || event.altKey) && event.code === 'KeyR') {
      event.preventDefault();
      reload(event.shiftKey);
   }
});

addEventListener('resize', () => {
   game.resize();
});

game.resize();
document.querySelector('#splash')?.removeAttribute('visible');

Promise.race([ renderer.on('tick'), developer.panel.renderer.on('tick') ]).then(() => {
   document.querySelector('#splash')!.remove();
});

(async () => {
   await Promise.all(
      backend.mods.map(async mod => {
         const value = await import(/* @vite-ignore */ `mods:${mod}/index.js?${performance.now()}`);
         await value.default?.(mod, api);
         await Promise.all(events.fire('loaded-mod', mod));
      })
   );
   await Promise.all(events.fire('modded'));
   launch.timeline && save.data.s.name && !namespace && (await saveSelector());
   await Promise.all(events.fire('loaded'));

   launch.intro && !respawn && !namespace && (await Promise.all(events.fire('init-intro')));
   await Promise.all(events.fire('init-between'));
   launch.overworld && (await Promise.all(events.fire('init-overworld')));

   game.input = true;
   game.active = true;
   game.timer = true;

   await Promise.all(events.fire('ready'));
   CosmosUtils.status(`OUTERTALE INITIALIZED (${Math.floor(performance.now()) / 1000})`, { color: '#fff' });
})().catch(console.trace);

CosmosUtils.status(`LOAD MODULE: INDEX (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
