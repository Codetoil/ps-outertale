

import imOutlands$info from '../../assets/images/maps/outlands.json?url';
import w_alley1 from '../../assets/rooms/w_alley1.json';
import w_alley2 from '../../assets/rooms/w_alley2.json';
import w_alley3 from '../../assets/rooms/w_alley3.json';
import w_alley4 from '../../assets/rooms/w_alley4.json';
import w_annex from '../../assets/rooms/w_annex.json';
import w_basement from '../../assets/rooms/w_basement.json';
import w_blooky from '../../assets/rooms/w_blooky.json';
import w_bridge from '../../assets/rooms/w_bridge.json';
import w_candy from '../../assets/rooms/w_candy.json';
import w_coffin from '../../assets/rooms/w_coffin.json';
import w_courtyard from '../../assets/rooms/w_courtyard.json';
import w_danger from '../../assets/rooms/w_danger.json';
import w_dummy from '../../assets/rooms/w_dummy.json';
import w_entrance from '../../assets/rooms/w_entrance.json';
import w_exit from '../../assets/rooms/w_exit.json';
import w_froggit from '../../assets/rooms/w_froggit.json';
import w_junction from '../../assets/rooms/w_junction.json';
import w_lobby from '../../assets/rooms/w_lobby.json';
import w_mouse from '../../assets/rooms/w_mouse.json';
import w_pacing from '../../assets/rooms/w_pacing.json';
import w_party from '../../assets/rooms/w_party.json';
import w_puzzle1 from '../../assets/rooms/w_puzzle1.json';
import w_puzzle2 from '../../assets/rooms/w_puzzle2.json';
import w_puzzle3 from '../../assets/rooms/w_puzzle3.json';
import w_puzzle4 from '../../assets/rooms/w_puzzle4.json';
import w_restricted from '../../assets/rooms/w_restricted.json';
import w_stairs from '../../assets/rooms/w_stairs.json';
import w_start from '../../assets/rooms/w_start.json';
import w_storage from '../../assets/rooms/w_storage.json';
import w_toriel_asriel from '../../assets/rooms/w_toriel_asriel.json';
import w_toriel_front from '../../assets/rooms/w_toriel_front.json';
import w_toriel_hallway from '../../assets/rooms/w_toriel_hallway.json';
import w_toriel_kitchen from '../../assets/rooms/w_toriel_kitchen.json';
import w_toriel_living from '../../assets/rooms/w_toriel_living.json';
import w_toriel_toriel from '../../assets/rooms/w_toriel_toriel.json';
import w_tutorial from '../../assets/rooms/w_tutorial.json';
import w_twinkly from '../../assets/rooms/w_twinkly.json';
import w_wonder from '../../assets/rooms/w_wonder.json';
import w_zigzag from '../../assets/rooms/w_zigzag.json';

import assets, { effectSetup, standardSound } from '../assets';
import { OutertaleMap, OutertaleSpeechPreset } from '../classes';
import { quickCall } from '../common';
import { faces as commonFaces } from '../common/bootstrap';
import commonText from '../common/text';
import content from '../content';
import { audio, game, items, maps, speech } from '../core';
import { CosmosDaemon, CosmosEffect } from '../engine/audio';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosUtils } from '../engine/utils';
import { easyRoom, instance, phone, portraits, saver } from '../mantle';
import save from '../save';
import text, { toriCheck } from './text';

export function resetThreshold () {
   switch (save.flag.n.genocide_milestone) {
      case 0:
         return Infinity;
      case 1:
         return 3;
      case 2:
      case 3:
         return 2;
      default:
         return 1;
   }
}

export const faces = {
   asrielCocky: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielCocky }),
   asrielEvil: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvil }),
   asrielEvilClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvilClosed }),
   asrielFear: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFear }),
   asrielFocus: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocus }),
   asrielFocusClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusClosed }),
   asrielFocusSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusSide }),
   asrielFurrow: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFurrow }),
   asrielHuh: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielHuh }),
   asrielOhReally: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReally }),
   asrielOhReallyClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReallyClosed }),
   asrielPlainClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlainClosed }),
   asrielSmirk: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSmirk }),
   torielBlush: new CosmosAnimation({ anchor: 0, resources: content.idcTorielBlush }),
   torielCompassion: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassion }),
   torielCompassionFrown: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassionFrown }),
   torielCompassionSmile: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassionSmile }),
   torielConcern: new CosmosAnimation({ anchor: 0, resources: content.idcTorielConcern }),
   torielCry: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCry }),
   torielCryLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCryLaugh }),
   torielCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCutscene1 }),
   torielCutscene2: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCutscene2 }),
   torielDreamworks: new CosmosAnimation({ anchor: 0, resources: content.idcTorielDreamworks }),
   torielEverythingisfine: new CosmosAnimation({ anchor: 0, resources: content.idcTorielEverythingisfine }),
   torielIsMad: new CosmosAnimation({ anchor: 0, resources: content.idcTorielIsMad }),
   torielLowConcern: new CosmosAnimation({ anchor: 0, resources: content.idcTorielLowConcern }),
   torielSad: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSad }),
   torielShock: new CosmosAnimation({ anchor: 0, resources: content.idcTorielShock }),
   torielSincere: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSincere }),
   torielSmallXD: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSmallXD }),
   torielStraightUp: new CosmosAnimation({ anchor: 0, resources: content.idcTorielStraightUp }),
   torielWTF: new CosmosAnimation({ anchor: 0, resources: content.idcTorielWTF }),
   torielWTF2: new CosmosAnimation({ anchor: 0, resources: content.idcTorielWTF2 }),
   torielXD: new CosmosAnimation({ anchor: 0, resources: content.idcTorielXD }),
   twinklyCapping: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyCapping }),
   twinklyEvil: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyEvil }),
   twinklyGonk: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyGonk }),
   twinklyGrin: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyGrin }),
   twinklyHurt: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyHurt ] }),
   twinklyKawaii: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyKawaii }),
   twinklyLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyLaugh }),
   twinklyNice: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyNice }),
   twinklyPissed: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyPissed }),
   twinklyPlain: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyPlain }),
   twinklySassy: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklySassy }),
   twinklySide: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklySide }),
   twinklyWink: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyWink ] })
};

export const outlandsMap = new OutertaleMap(imOutlands$info, content.imOutlands);

export const sources = {
   w_start,
   w_twinkly,
   w_entrance,
   w_lobby,
   w_tutorial,
   w_dummy,
   w_restricted,
   w_coffin,
   w_danger,
   w_zigzag,
   w_froggit,
   w_candy,
   w_puzzle1,
   w_puzzle2,
   w_puzzle3,
   w_puzzle4,
   w_mouse,
   w_blooky,
   w_stairs,
   w_basement,
   w_party,
   w_storage,
   w_pacing,
   w_junction,
   w_annex,
   w_wonder,
   w_courtyard,
   w_alley1,
   w_alley2,
   w_alley3,
   w_alley4,
   w_bridge,
   w_exit,
   w_toriel_front,
   w_toriel_living,
   w_toriel_kitchen,
   w_toriel_hallway,
   w_toriel_asriel,
   w_toriel_toriel
};

items.register('starbertA', { type: 'special', value: 0, sell1: 10, sell2: 100, text: text.i_starbertA });
items.register('starbertB', { type: 'special', value: 0, sell1: 8, sell2: 200, text: text.i_starbertB });
items.register('starbertC', { type: 'special', value: 0, sell1: 6, sell2: 300, text: text.i_starbertC });
items.register('spacesuit', { type: 'consumable', value: 0, sell1: 100, sell2: 18, text: text.i_spacesuit });
items.register('spanner', { type: 'special', value: 0, sell1: 100, sell2: 15, text: text.i_spanner });
items.register('halo', { type: 'armor', value: 3, sell1: 20, sell2: 100, text: text.i_halo });
items.register('candy', { type: 'consumable', value: 10, sell1: 10, sell2: 4, text: text.i_candy });
items.register('delta', { type: 'consumable', value: 5, sell1: 8, sell2: 34, text: text.i_delta });
items.register('chocolate', { type: 'consumable', value: 19, sell1: 150, sell2: 40, text: text.i_chocolate });
items.register('soda', { type: 'consumable', value: 8, sell1: 1, sell2: 1, text: text.i_soda });
items.register('steak', { type: 'consumable', value: 14, sell1: 1, sell2: 1, text: text.i_steak });
items.register('water', { type: 'consumable', value: 12, sell1: 5, sell2: 5, text: commonText.i_water });
items.register('snails', { type: 'consumable', value: 19, sell1: 10, sell2: 80, text: text.i_snails });
items.register('little_dipper', { type: 'weapon', value: 3, sell1: 25, sell2: 5, text: text.i_little_dipper });
items.register('pie', { type: 'consumable', value: 99, text: text.i_pie });
items.register('pie2', { type: 'consumable', value: 99, text: text.i_pie2 });
items.register('pie3', { type: 'consumable', value: 99, text: text.i_pie3 });

items.register('stargum', {
   type: 'consumable',
   value: 4,
   text: { battle: { description: '', name: '' }, drop: [], info: [], name: '', use: text.a_outlands.stargum3 }
});

maps.register('outlands', outlandsMap);

phone.register('hello', {
   display () {
      return save.data.n.plot < 7;
   },
   priority: 1.1,
   async trigger () {
      if (save.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_nobody5);
      } else {
         quickCall(true, ...text.c_hello[Math.min(save.data.n.cell_hello++, 3)]);
      }
   },
   name: text.c_name_hello
});

phone.register('about', {
   display () {
      return save.data.n.plot < 7;
   },
   priority: 1.2,
   async trigger () {
      if (save.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_nobody5);
      } else if (save.data.b.cell_about) {
         quickCall(true, ...text.c_about2);
      } else {
         save.data.b.cell_about = true;
         quickCall(true, ...text.c_about1);
      }
   },
   name: text.c_name_about
});

phone.register('mom', {
   display () {
      return save.data.n.plot < 7;
   },
   priority: 1.3,
   async trigger () {
      if (save.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_nobody5);
      } else if (save.data.b.cell_mom) {
         if (save.data.b.cell_flirt) {
            quickCall(true, ...text.c_mom3);
         } else {
            quickCall(true, ...text.c_mom2);
         }
      } else {
         save.data.b.cell_mom = true;
         quickCall(true, ...text.c_mom1);
      }
   },
   name: text.c_name_mom
});

phone.register('flirt', {
   display () {
      return save.data.n.plot < 7;
   },
   priority: 1.4,
   async trigger () {
      if (save.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_nobody5);
      } else if (save.data.b.cell_flirt) {
         if (save.data.b.cell_mom) {
            quickCall(true, ...text.c_flirt3);
         } else {
            quickCall(true, ...text.c_flirt2);
         }
      } else {
         save.data.b.cell_flirt = true;
         quickCall(true, ...text.c_flirt1);
      }
   },
   name: text.c_name_flirt
});

phone.register('toriel', {
   display () {
      return save.data.n.plot > 6.2;
   },
   priority: 2.1,
   async trigger () {
      switch (game.room) {
         case 'f_lobby':
         case 'f_error':
         case 'f_telescope':
         case 'f_truth':
            quickCall(false, ...commonText.c_nobody4);
            break;
         default: {
            if (save.data.n.plot === 7 || save.data.n.plot > 9.1) {
               if (save.data.n.state_wastelands_toriel === 2) {
                  quickCall(false, ...commonText.c_nobody2);
                  break;
               } else if (
                  save.data.n.plot < 16 ? save.data.b.oops || save.data.n.plot < 14 : !save.data.b.toriel_phone
               ) {
                  quickCall(false, ...commonText.c_nobody1);
                  break;
               }
            }
            const toritext = text.p_toriel[game.room];
            const chair =
               game.room === 'w_toriel_living' && toritext && toriCheck()
                  ? (instance('main', 'theOneAndOnlyChairiel')?.object.objects[0] as CosmosSprite)
                  : void 0;
            chair && speech.targets.add(chair);
            quickCall(!!toritext, ...CosmosUtils.provide(toritext || commonText.c_nobody3)).then(() => {
               chair && speech.targets.delete(chair);
            });
            break;
         }
      }
   },
   name: text.c_name_toriel
});

phone.register('puzzle1', {
   display () {
      return (
         (game.room === 'w_puzzle1' && save.data.n.plot < 5.1) ||
         (game.room === 'w_puzzle2' && save.data.n.plot < 5.2) ||
         (game.room === 'w_puzzle3' && save.data.n.plot < 5.3) ||
         (game.room === 'w_puzzle4' && save.data.n.plot < 5.4)
      );
   },
   priority: 3.1,
   async trigger () {
      save.data.b.cell_puzzle = true;
      quickCall(true, ...text.c_puzzle1);
   },
   name: text.c_name_puzzle
});

portraits.register(faces);

saver.locations.register(text.s_save);

speech.presets.register({
   napstablook: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 40,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context: audio.context,
               gain: 0.6,
               router: effectSetup(new CosmosEffect(audio.context, assets.conv1100, 0.6), audio.soundRouter)
            })
         ]
      ]
   }),
   twinkly: new OutertaleSpeechPreset({
      faces: [
         faces.twinklyEvil, // 0
         faces.twinklyGonk, // 1
         faces.twinklyGrin, // 2
         faces.twinklyHurt, // 3
         faces.twinklyLaugh, // 4
         faces.twinklyNice, // 5
         faces.twinklyPlain, // 6
         faces.twinklySassy, // 7
         faces.twinklySide, // 8
         faces.twinklyWink, // 9
         faces.twinklyKawaii, // 10
         faces.twinklyCapping, // 11
         faces.twinklyPissed // 12
      ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avTwinkly1, { context: audio.context, gain: 0.6, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avTwinkly2, { context: audio.context, gain: 0.6, router: audio.soundRouter }) ]
      ]
   }),
   asriel1: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avAsriel, { context: audio.context, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avAsriel, { context: audio.context, rate: 1.2, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avAsriel, { context: audio.context, rate: 1.4, router: audio.soundRouter }) ]
      ]
   }),
   asriel2: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.asrielEvil, // 1
         faces.asrielEvilClosed, // 2
         commonFaces.asrielPlain, // 3
         faces.asrielPlainClosed, // 4
         faces.asrielSmirk, // 5
         faces.asrielFocus, // 6
         faces.asrielFocusClosed, // 7
         faces.asrielFocusSide, // 8
         faces.asrielCocky, // 9
         faces.asrielHuh, // 10
         null, // 11
         null, // 12
         faces.asrielOhReally, // 13
         faces.asrielFear, // 14
         faces.asrielFurrow, // 15
         faces.asrielOhReallyClosed // 16
      ],
      interval: 35,
      voices: [ [ new CosmosDaemon(content.avAsriel2, standardSound()) ] ]
   }),
   toriel: new OutertaleSpeechPreset({
      faces: [
         faces.torielCutscene1, // 0
         faces.torielCutscene2, // 1
         faces.torielEverythingisfine, // 2
         faces.torielWTF, // 3
         faces.torielWTF2, // 4
         faces.torielConcern, // 5
         faces.torielSmallXD, // 6
         faces.torielBlush, // 7
         faces.torielXD, // 8
         faces.torielCompassion, // 9
         faces.torielCompassionSmile, // 10
         faces.torielIsMad, // 11
         faces.torielCompassionFrown, // 12
         faces.torielStraightUp, // 13
         faces.torielSincere, // 14
         faces.torielDreamworks, // 15
         faces.torielShock, // 16
         faces.torielLowConcern, // 17
         faces.torielSad, // 18
         faces.torielCry, // 19
         faces.torielCryLaugh, // 20
         null // 21
      ],
      interval: 40,
      voices: [
         [ new CosmosDaemon(content.avToriel, { context: audio.context, gain: 0.6, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avToriel, { context: audio.context, rate: 0.95, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avToriel, { context: audio.context, rate: 0.9, router: audio.soundRouter }) ],
         [ new CosmosDaemon(content.avToriel, { context: audio.context, rate: 0.8, router: audio.soundRouter }) ]
      ]
   })
});

for (const [ key, value ] of Object.entries(sources)) {
   easyRoom(key, outlandsMap, value);
}

CosmosUtils.status(`LOAD MODULE: OUTLANDS BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
