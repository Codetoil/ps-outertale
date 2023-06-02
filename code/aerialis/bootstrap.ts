import assets, { effectSetup } from '../assets';
import { OutertaleMap, OutertaleSpeechPreset } from '../classes';
import { quickCall } from '../common';
import content from '../content';
import { atlas, audio, game, image, items, keys, maps, random, renderer, speech, timer, typer } from '../core';
import {
   CosmosBitmap,
   CosmosDaemon,
   CosmosEffect,
   CosmosMath,
   CosmosNavigator,
   CosmosRectangle,
   CosmosSprite,
   CosmosTyper,
   CosmosUtils,
   CosmosValueRandom
} from '../engine';
import { easyRoom, menuBox, menuText, phone, saver, shopper, sidebarrer } from '../mantle';
import save from '../save';
import text, { pms } from './text';

import { AdvancedBloomFilter } from 'pixi-filters';
import imAerialisAOverlay$info from '../../assets/images/maps/aerialis-a-overlay.json?url';
import imAerialisA$info from '../../assets/images/maps/aerialis-a.json?url';
import imAerialisB$info from '../../assets/images/maps/aerialis-b.json?url';
import a_aftershow from '../../assets/rooms/a_aftershow.json';
import a_auditorium from '../../assets/rooms/a_auditorium.json';
import a_barricade1 from '../../assets/rooms/a_barricade1.json';
import a_barricade2 from '../../assets/rooms/a_barricade2.json';
import a_citadelevator from '../../assets/rooms/a_citadelevator.json';
import a_core_battle from '../../assets/rooms/a_core_battle.json';
import a_core_bridge from '../../assets/rooms/a_core_bridge.json';
import a_core_checkpoint from '../../assets/rooms/a_core_checkpoint.json';
import a_core_entry1 from '../../assets/rooms/a_core_entry1.json';
import a_core_entry2 from '../../assets/rooms/a_core_entry2.json';
import a_core_exit1 from '../../assets/rooms/a_core_exit1.json';
import a_core_exit2 from '../../assets/rooms/a_core_exit2.json';
import a_core_left1 from '../../assets/rooms/a_core_left1.json';
import a_core_left2 from '../../assets/rooms/a_core_left2.json';
import a_core_left3 from '../../assets/rooms/a_core_left3.json';
import a_core_main from '../../assets/rooms/a_core_main.json';
import a_core_right1 from '../../assets/rooms/a_core_right1.json';
import a_core_right2 from '../../assets/rooms/a_core_right2.json';
import a_core_right3 from '../../assets/rooms/a_core_right3.json';
import a_core_suspense from '../../assets/rooms/a_core_suspense.json';
import a_dining from '../../assets/rooms/a_dining.json';
import a_elevator1 from '../../assets/rooms/a_elevator1.json';
import a_elevator2 from '../../assets/rooms/a_elevator2.json';
import a_elevator3 from '../../assets/rooms/a_elevator3.json';
import a_elevator4 from '../../assets/rooms/a_elevator4.json';
import a_elevator5 from '../../assets/rooms/a_elevator5.json';
import a_hub1 from '../../assets/rooms/a_hub1.json';
import a_hub2 from '../../assets/rooms/a_hub2.json';
import a_hub3 from '../../assets/rooms/a_hub3.json';
import a_hub4 from '../../assets/rooms/a_hub4.json';
import a_hub5 from '../../assets/rooms/a_hub5.json';
import a_lab_virt from '../../assets/rooms/a_lab_virt.json';
import a_lab_downstairs from '../../assets/rooms/a_lab_downstairs.json';
import a_lab_entry from '../../assets/rooms/a_lab_entry.json';
import a_lab_main from '../../assets/rooms/a_lab_main.json';
import a_lab_upstairs from '../../assets/rooms/a_lab_upstairs.json';
import a_lift from '../../assets/rooms/a_lift.json';
import a_lookout from '../../assets/rooms/a_lookout.json';
import a_mettaton1 from '../../assets/rooms/a_mettaton1.json';
import a_mettaton2 from '../../assets/rooms/a_mettaton2.json';
import a_offshoot1 from '../../assets/rooms/a_offshoot1.json';
import a_offshoot2 from '../../assets/rooms/a_offshoot2.json';
import a_pacing from '../../assets/rooms/a_pacing.json';
import a_path1 from '../../assets/rooms/a_path1.json';
import a_path2 from '../../assets/rooms/a_path2.json';
import a_path3 from '../../assets/rooms/a_path3.json';
import a_path4 from '../../assets/rooms/a_path4.json';
import a_plaza from '../../assets/rooms/a_plaza.json';
import a_prepuzzle from '../../assets/rooms/a_prepuzzle.json';
import a_puzzle1 from '../../assets/rooms/a_puzzle1.json';
import a_puzzle2 from '../../assets/rooms/a_puzzle2.json';
import a_rg1 from '../../assets/rooms/a_rg1.json';
import a_rg2 from '../../assets/rooms/a_rg2.json';
import a_sans from '../../assets/rooms/a_sans.json';
import a_sleeping1 from '../../assets/rooms/a_sleeping1.json';
import a_sleeping2 from '../../assets/rooms/a_sleeping2.json';
import a_sleeping3 from '../../assets/rooms/a_sleeping3.json';
import a_split from '../../assets/rooms/a_split.json';
import a_start from '../../assets/rooms/a_start.json';

const aerialisAMap = new OutertaleMap(imAerialisA$info, content.imAerialisA);
const aerialisAOverlayMap = new OutertaleMap(imAerialisAOverlay$info, content.imAerialisAOverlay);
const aerialisBMap = new OutertaleMap(imAerialisB$info, content.imAerialisB);

export function colormix (c1: number, c2: number, v: number) {
   const [ r1, g1, b1, a1 ] = CosmosBitmap.hex2color(c1);
   const [ r2, g2, b2, a2 ] = CosmosBitmap.hex2color(c2);
   return CosmosBitmap.color2hex([
      CosmosMath.remap(v, r1, r2),
      CosmosMath.remap(v, g1, g2),
      CosmosMath.remap(v, b1, b2),
      CosmosMath.remap(v, a1, a2)
   ]);
}

export const gossiper = {
   cooldown: false,
   text1: '',
   text2: '',
   typer1: new CosmosTyper({ timer })
      .on('text', function (content) {
         content === '' || (gossiper.text1 = content);
         this.mode === 'read' && gossiper.sfx(content);
      })
      .on('header', header => typer.fire('header', header)),
   typer2: new CosmosTyper({ timer })
      .on('text', function (content) {
         content === '' || (gossiper.text2 = content);
         this.mode === 'read' && gossiper.sfx(content);
      })
      .on('header', header => typer.fire('header', header)),
   async dialogue (...lines: (string | { b: string; c: string; s?: boolean })[]) {
      if (lines.length > 0) {
         const prev = atlas.target;
         for (const line of lines) {
            if (typeof line === 'string') {
               atlas.target === 'shopText' || atlas.switch('shopText');
               await typer.text(line);
            } else {
               gossiper.text1 = gossiper.text2 = '';
               gossiper.typer1.interval = gossiper.typer2.interval = speech.presets.of('monster').interval;
               atlas.target === 'shopTextGossip' || atlas.switch('shopTextGossip');
               if (line.s) {
                  await Promise.all([ gossiper.typer1.text(line.b), gossiper.typer2.text(line.c) ]);
               } else {
                  let skip = false;
                  const skipToggle = () => (skip = true);
                  gossiper.typer1.on('skip', skipToggle);
                  await gossiper.typer1.text(`${line.b}{%}`);
                  gossiper.typer1.off('skip', skipToggle);
                  const secondary = gossiper.typer2.text(line.c);
                  skip && gossiper.typer2.skip();
                  await secondary;
               }
            }
         }
         atlas.switch(prev);
      }
   },
   async sfx (content: string) {
      if (!gossiper.cooldown && content.length > 0 && !content[content.length - 1].match(/[\s\µ]/)) {
         speech.presets.of('monster').voices[0]?.[0].instance(timer);
         gossiper.cooldown = true;
         timer.post().then(() => {
            gossiper.cooldown = false;
         });
      }
   }
};

const sources_a = {
   a_start,
   a_lab_entry,
   a_lab_main,
   a_lab_upstairs,
   a_lab_downstairs,
   a_lab_virt,
   a_path1,
   a_path2,
   a_path3,
   a_rg1,
   a_path4,
   a_barricade1,
   a_puzzle1,
   a_mettaton1,
   a_elevator1,
   a_lift,
   a_elevator2,
   a_sans,
   a_pacing,
   a_prepuzzle,
   a_puzzle2,
   a_mettaton2,
   a_rg2,
   a_barricade2,
   a_split,
   a_offshoot1,
   a_offshoot2,
   a_elevator3
};

const sources_b = {
   a_elevator4,
   a_auditorium,
   a_aftershow,
   a_hub1,
   a_dining,
   a_hub2,
   a_lookout,
   a_hub3,
   a_plaza,
   a_elevator5,
   a_hub4,
   a_sleeping1,
   a_sleeping2,
   a_sleeping3,
   a_hub5,
   a_citadelevator,
   a_core_entry1,
   a_core_entry2,
   a_core_main,
   a_core_left1,
   a_core_left2,
   a_core_left3,
   a_core_right1,
   a_core_right2,
   a_core_right3,
   a_core_bridge,
   a_core_checkpoint,
   a_core_suspense,
   a_core_battle,
   a_core_exit1,
   a_core_exit2
};

export const sources = { ...sources_a, ...sources_b };

atlas.navigators.register(
   'shopTextGossip',
   new CosmosNavigator({
      next () {
         gossiper.typer1.read();
         gossiper.typer2.read();
      },
      prev () {
         gossiper.typer1.skip();
         gossiper.typer2.skip();
      },
      objects: [
         menuBox(-2, 240, 628, 226, 8, {
            objects: [
               menuText(26, 16, () => gossiper.text1, {
                  font: '16px DeterminationMono',
                  fill: '#ffbbdc',
                  spacing: { y: 5 }
               }),
               menuText(26 + 320, 16, () => gossiper.text2, {
                  font: '16px DeterminationMono',
                  fill: '#d4bbff',
                  spacing: { y: 5 }
               })
            ]
         }).on('tick', function () {
            if (keys.menuKey.active() && game.interact && game.input && atlas.target === 'shopTextGossip') {
               gossiper.typer1.read();
               gossiper.typer1.skip();
               gossiper.typer2.read();
               gossiper.typer2.skip();
            }
         }),
         new CosmosRectangle({
            position: { x: 160, y: 120 },
            fill: 'white',
            size: { x: 4, y: 120 },
            anchor: { x: 0 }
         })
      ]
   })
      .on('from', () => atlas.attach(renderer, 'menu', 'shopTextGossip'))
      .on('to', to => {
         atlas.detach(renderer, 'menu', 'shopTextGossip');
         gossiper.typer1.skip();
         gossiper.typer2.skip();
         if (to === null) {
            atlas.detach(renderer, 'menu', 'shop');
            shopper.value!.vars = {};
         }
      })
);

atlas.navigators.register(
   'sidebarCellPms',
   new CosmosNavigator({
      prev: null,
      grid: () => [ CosmosUtils.populate(Math.max(pms().length, 1), index => index + 1) ],
      objects: [
         menuBox(16, 16, 598, 438, 6, {
            font: '16px DeterminationSans',
            objects: [
               menuText(300, 16 - 4, text.n_sidebarCellPms1, { anchor: { x: 0 } }),
               menuText(178 + 5, 392 - 4, () => text.n_sidebarCellPms2)
            ]
         }),
         ...CosmosUtils.populate(2 * 3, index => {
            const r = Math.floor(index / 2);
            const y = 80 - 4 + r * 100;
            function idx (r: number) {
               return pms().length - (atlas.navigators.of('sidebarCellPms').selection() as number) - r;
            }
            function info (r: number) {
               return text.n_sidebarCellPms3[pms()[idx(r)] as keyof typeof text.n_sidebarCellPms3];
            }
            if (index % 2 === 0) {
               return menuText(
                  68,
                  y,
                  () => {
                     const i = info(r);
                     if (i) {
                        return (
                           CosmosUtils.provide(i.author) +
                           (save.data.n.plot_pmcheck < idx(r) + 1 ? ` ${text.n_sidebarCellPms4}` : '')
                        );
                     } else {
                        return '';
                     }
                  },
                  { font: '8px CryptOfTomorrow' }
               ).on('tick', function () {
                  this.fill = save.data.n.plot_pmcheck < idx(r) + 1 ? '#ff0' : '#808080';
               });
            } else {
               return menuText(68, y + 15, () => CosmosUtils.format(CosmosUtils.provide(info(r)?.pm ?? ''), 36, true), {
                  font: '16px DeterminationSans'
               }).on('tick', function () {
                  this.fill = save.data.n.plot_pmcheck < idx(r) + 1 ? '#ff0' : '#fff';
               });
            }
         })
      ]
   })
      .on('from', () => {
         atlas.navigators.of('sidebarCellPms').position = { x: 0, y: 0 };
         atlas.attach(renderer, 'menu', 'sidebarCellPms');
         assets.sounds.dimbox.instance(timer);
      })
      .on('to', () => {
         atlas.detach(renderer, 'menu', 'sidebarCellPms');
         game.movement = true;
         save.data.n.plot_pmcheck = pms().length;
      })
      .on('change', () => {
         assets.sounds.menu.instance(timer).rate.value = 1.5;
      })
);

image.filters.register('hexbloom', new AdvancedBloomFilter({ threshold: 0, bloomScale: 1, brightness: 1 }));

items.register('tvm_radio', { type: 'special', value: 0, sell1: 80, sell2: 50, text: text.i_tvm_radio });
items.register('tvm_fireworks', { type: 'special', value: 0, sell1: 250, sell2: 20, text: text.i_tvm_fireworks });
items.register('tvm_mewmew', { type: 'special', value: 0, sell1: 999, sell2: 400, text: text.i_tvm_mewmew });
items.register('starfait', { type: 'consumable', value: 23, sell1: 40, sell2: 15, text: text.i_starfait });
items.register('legendary_hero', { type: 'consumable', value: 40, sell1: 30, sell2: 45, text: text.i_legendary_hero });
items.register('glamburger', { type: 'consumable', value: 34, sell1: 40, sell2: 25, text: text.i_glamburger });
items.register('face_steak', { type: 'consumable', value: 55, sell1: 25, sell2: 65, text: text.i_face_steak });
items.register('starfait_x', { type: 'consumable', value: -23, sell1: 80, sell2: 1, text: text.i_starfait_x });

items.register('legendary_hero_x', {
   type: 'consumable',
   value: -40,
   sell1: 60,
   sell2: 1,
   text: text.i_legendary_hero_x
});

items.register('glamburger_x', { type: 'consumable', value: -34, sell1: 80, sell2: 1, text: text.i_glamburger_x });
items.register('face_steak_x', { type: 'consumable', value: -55, sell1: 50, sell2: 1, text: text.i_face_steak_x });

const trashRando = { c: 0, value: null as CosmosValueRandom | null };

items.register('trash', {
   type: 'consumable',
   get value () {
      trashRando.value ??= random.clone();
      const v = Math.floor(timer.value / 100);
      if (trashRando.c !== v) {
         trashRando.c = v;
         trashRando.value.next();
      }
      return CosmosMath.weigh(
         [
            [ -20, 1 ],
            [ -10, 1 ],
            [ 5, 10 ],
            [ 25, 15 ],
            [ 99, 5 ]
         ],
         trashRando.value.compute()
      )!;
   },
   sell1: 20,
   sell2: 10,
   text: text.i_trash
});

items.register('laser', { type: 'weapon', value: 12, sell1: 40, sell2: 90, text: text.i_laser });
items.register('visor', { type: 'armor', value: 12, sell1: 30, sell2: 90, text: text.i_visor });
items.register('filament', { type: 'consumable', value: 30, sell1: 8, sell2: 40, text: text.i_filament });

items.register('filament_use1', {
   type: 'consumable',
   value: 21,
   sell1: 8,
   sell2: 24,
   text: Object.assign({}, text.i_filament, text.i_filament_use1)
});

items.register('filament_use2', {
   type: 'consumable',
   value: 14,
   sell1: 8,
   sell2: 16,
   text: Object.assign({}, text.i_filament, text.i_filament_use2)
});

items.register('filament_use3', {
   type: 'consumable',
   value: 9,
   sell1: 8,
   sell2: 12,
   text: Object.assign({}, text.i_filament, text.i_filament_use3)
});

items.register('filament_use4', {
   type: 'consumable',
   value: 6,
   sell1: 8,
   sell2: 10,
   text: Object.assign({}, text.i_filament, text.i_filament_use4)
});

items.register('tablaphone', { type: 'weapon', value: 10, sell1: 110, sell2: 90, text: text.i_tablaphone });
items.register('sonic', { type: 'armor', value: 11, sell1: 15, sell2: 110, text: text.i_sonic });
items.register('mystery_food', { type: 'consumable', value: 20, sell1: 10, sell2: 10, text: text.i_mystery_food });
items.register('super_pop', { type: 'consumable', value: 22, sell1: 30, sell2: 120, text: text.i_super_pop });
items.register('old_gun', { type: 'special', value: 0, sell1: 30, sell2: 140, text: text.i_old_gun });
items.register('old_bomb', { type: 'special', value: 0, sell1: 20, sell2: 105, text: text.i_old_bomb });
items.register('old_spray', { type: 'special', value: 0, sell1: 10, sell2: 70, text: text.i_old_spray });
items.register('corndog', { type: 'consumable', value: 10, sell1: 40, sell2: 10, text: text.i_corndog });
items.register('corngoat', { type: 'consumable', value: 20, sell1: 80, sell2: 20, text: text.i_corngoat });
items.register('moon_pie', { type: 'consumable', value: 99, text: text.i_moon_pie });

maps.register('aerialis-a', aerialisAMap);
maps.register('aerialis-a-overlay', aerialisAOverlayMap);
maps.register('aerialis-b', aerialisBMap);

phone.register('puzzle2', {
   display () {
      return (
         save.data.n.bad_lizard < 2 &&
         ((game.room === 'a_puzzle1' && save.data.n.plot < 55) || (game.room === 'a_puzzle2' && save.data.n.plot < 59))
      );
   },
   priority: 3.2,
   async trigger () {
      save.data.b.cell_puzzle_alphys = true;
      if (game.room === 'a_puzzle1') {
         await quickCall(true, ...text.c_puzzle2a());
      } else {
         await quickCall(true, ...text.c_puzzle2b());
      }
   },
   name: text.c_name_puzzle
});

phone.register('dimboxA', {
   display () {
      return save.data.n.bad_lizard < 2 ? save.data.n.plot > 48 : save.data.b.a_state_gotphone;
   },
   priority: 4.1,
   trigger () {
      sidebarrer.dimbox = 'dimboxA';
      atlas.switch('sidebarCellBox');
   },
   name: text.c_name_dimboxA
});

phone.register('dimboxB', {
   display () {
      return save.data.n.bad_lizard < 2 ? save.data.n.plot > 48 : save.data.b.a_state_gotphone;
   },
   priority: 4.2,
   trigger () {
      sidebarrer.dimbox = 'dimboxB';
      atlas.switch('sidebarCellBox');
   },
   name: text.c_name_dimboxB
});

phone.register('pms', {
   display () {
      return save.data.n.bad_lizard < 2 ? save.data.n.plot > 48 : save.data.b.a_state_gotphone;
   },
   priority: 5,
   trigger () {
      atlas.switch('sidebarCellPms');
   },
   name: text.c_name_pms
});

saver.locations.register(text.s_save);

speech.presets.register({
   finalghost: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 40,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context: audio.context,
               gain: 0.6,
               rate: 0.85,
               router: effectSetup(new CosmosEffect(audio.context, assets.conv1100, 0.6), audio.soundRouter)
            })
         ]
      ]
   }),
   hapstablook: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 40,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context: audio.context,
               gain: 0.6,
               rate: 1.3,
               router: effectSetup(new CosmosEffect(audio.context, assets.conv1100, 0.6), audio.soundRouter)
            })
         ]
      ]
   }),
   soriel: new OutertaleSpeechPreset({
      faces: [ new CosmosSprite({ anchor: 0, frames: [ content.idcSansToriel ] }) ],
      interval: 45,
      voices: [ [ new CosmosDaemon(content.avSoriel, { context: audio.context, gain: 0.5, router: audio.soundRouter }) ] ],
      font1: '16px ComicSans',
      font2: '9px ComicSans'
   })
});

for (const [ key, value ] of Object.entries(sources_a)) {
   easyRoom(key, aerialisAMap, value);
}

for (const [ key, value ] of Object.entries(sources_b)) {
   easyRoom(key, aerialisBMap, value);
}

CosmosUtils.status(`LOAD MODULE: AERIALIS BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
