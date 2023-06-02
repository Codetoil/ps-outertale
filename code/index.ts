import './../node_modules/vite/client.d';
import { atlas, backend, events, game, keys, launch, reload, renderer } from './core';
import * as developer from './developer';
import { editor, logician } from './developer';
import { CosmosUtils } from './engine';
import * as global from './global';
import { battler } from './mantle';
import './types.d';

import './common';

import './outlands';

import './starton';

import './foundry';

import './aerialis';

(import.meta.hot || { on: () => {} }).on('vite:beforeFullReload', () => {
   throw logician.viteError;
});

const respawn = new URLSearchParams(location.search).has('respawn');

function atlasInput (key = null as string | null) {
   return (
      !keys.altKey.active() &&
      (game.input || (editor.input && [ 'ArrowLeft', 'ArrowRight' ].includes(key!))) &&
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
   } else if (event.ctrlKey && event.code === 'KeyR') {
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
   Object.assign(globalThis, global, developer);

   await Promise.all(backend.mods.map(name => import(/* @vite-ignore */ name).then(value => void value.default?.())));
   await Promise.all(events.fire('modded'));

   launch.intro && !respawn && (await Promise.all(events.fire('init-intro')));
   await Promise.all(events.fire('init-between'));
   launch.overworld && (await Promise.all(events.fire('init-overworld')));

   game.input = true;
   game.active = true;
   game.timer = true;

   await Promise.all(events.fire('ready'));
   CosmosUtils.status(`OUTERTALE INITIALIZED (${Math.floor(performance.now()) / 1000})`, { color: '#fff' });
})().catch(console.trace);

CosmosUtils.status(`LOAD MODULE: INDEX (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
