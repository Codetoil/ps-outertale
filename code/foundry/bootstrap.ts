import { standardSound } from '../assets';
import { OutertaleMap, OutertaleSpeechPreset } from '../classes';
import content from '../content';
import { audio, items, maps, speech } from '../core';
import { CosmosDaemon, CosmosImage, CosmosSprite, CosmosUtils } from '../engine';
import { easyRoom, saver } from '../mantle';
import save from '../save';
import text from './text';

import imFoundryOverlay$info from '../../assets/images/maps/foundry-overlay.json?url';
import imFoundry$info from '../../assets/images/maps/foundry.json?url';
import f_abyss from '../../assets/rooms/f_abyss.json';
import f_armor from '../../assets/rooms/f_armor.json';
import f_artifact from '../../assets/rooms/f_artifact.json';
import f_asriel from '../../assets/rooms/f_asriel.json';
import f_battle from '../../assets/rooms/f_battle.json';
import f_bird from '../../assets/rooms/f_bird.json';
import f_blooky from '../../assets/rooms/f_blooky.json';
import f_bridge from '../../assets/rooms/f_bridge.json';
import f_chase from '../../assets/rooms/f_chase.json';
import f_corner from '../../assets/rooms/f_corner.json';
import f_corridor from '../../assets/rooms/f_corridor.json';
import f_doge from '../../assets/rooms/f_doge.json';
import f_dummy from '../../assets/rooms/f_dummy.json';
import f_entrance from '../../assets/rooms/f_entrance.json';
import f_error from '../../assets/rooms/f_error.json';
import f_exit from '../../assets/rooms/f_exit.json';
import f_hapstablook from '../../assets/rooms/f_hapstablook.json';
import f_hub from '../../assets/rooms/f_hub.json';
import f_kitchen from '../../assets/rooms/f_kitchen.json';
import f_lobby from '../../assets/rooms/f_lobby.json';
import f_muffet from '../../assets/rooms/f_muffet.json';
import f_napstablook from '../../assets/rooms/f_napstablook.json';
import f_pacing from '../../assets/rooms/f_pacing.json';
import f_path from '../../assets/rooms/f_path.json';
import f_piano from '../../assets/rooms/f_piano.json';
import f_plank from '../../assets/rooms/f_plank.json';
import f_prechase from '../../assets/rooms/f_prechase.json';
import f_prespear from '../../assets/rooms/f_prespear.json';
import f_puzzle1 from '../../assets/rooms/f_puzzle1.json';
import f_puzzle2 from '../../assets/rooms/f_puzzle2.json';
import f_puzzle3 from '../../assets/rooms/f_puzzle3.json';
import f_quiche from '../../assets/rooms/f_quiche.json';
import f_sans from '../../assets/rooms/f_sans.json';
import f_shyren from '../../assets/rooms/f_shyren.json';
import f_snail from '../../assets/rooms/f_snail.json';
import f_spear from '../../assets/rooms/f_spear.json';
import f_stand from '../../assets/rooms/f_stand.json';
import f_start from '../../assets/rooms/f_start.json';
import f_statue from '../../assets/rooms/f_statue.json';
import f_story1 from '../../assets/rooms/f_story1.json';
import f_story2 from '../../assets/rooms/f_story2.json';
import f_taxi from '../../assets/rooms/f_taxi.json';
import f_telescope from '../../assets/rooms/f_telescope.json';
import f_truth from '../../assets/rooms/f_truth.json';
import f_tunnel from '../../assets/rooms/f_tunnel.json';
import f_undyne from '../../assets/rooms/f_undyne.json';
import f_view from '../../assets/rooms/f_view.json';
import f_village from '../../assets/rooms/f_village.json';

const foundryMap = new OutertaleMap(imFoundry$info, content.imFoundry);
const foundryOverlayMap = new OutertaleMap(imFoundryOverlay$info, content.imFoundryOverlay);

export const sources = {
   f_start,
   f_sans,
   f_corridor,
   f_armor,
   f_doge,
   f_puzzle1,
   f_quiche,
   f_bird,
   f_puzzle2,
   f_story1,
   f_prechase,
   f_chase,
   f_entrance,
   f_lobby,
   f_error,
   f_telescope,
   f_stand,
   f_abyss,
   f_muffet,
   f_shyren,
   f_statue,
   f_piano,
   f_artifact,
   f_truth,
   f_path,
   f_view,
   f_prespear,
   f_spear,
   f_plank,
   f_asriel,
   f_tunnel,
   f_dummy,
   f_hub,
   f_undyne,
   f_blooky,
   f_snail,
   f_village,
   f_puzzle3,
   f_taxi,
   f_corner,
   f_story2,
   f_bridge,
   f_pacing,
   f_battle,
   f_exit,
   f_napstablook,
   f_kitchen,
   f_hapstablook
};

function undyneDialogue (image: CosmosImage) {
   return new CosmosSprite({
      anchor: 0,
      objects: [
         new CosmosSprite({ anchor: 0 }).on('tick', function () {
            this.frames = save.data.n.plot < 48 ? [] : [ content.idcUndyneDateTorsoBody ];
         }),
         new CosmosSprite({ anchor: 0, frames: [ image ] })
      ]
   }).on('tick', function () {
      this.frames = save.data.n.plot < 48 ? [ content.idcUndyneBattleTorso ] : [ content.idcUndyneDateTorso ];
   });
}

items.register('artifact', { type: 'special', value: 0, sell1: 5, sell2: 999, text: text.i_artifact });
items.register('punchcard', { type: 'special', value: 0, sell1: 2, sell2: 10, text: text.i_punchcard });
items.register('goggles', { type: 'armor', value: 6, sell1: 15, sell2: 50, text: text.i_goggles });
items.register('padd', { type: 'weapon', value: 2, sell1: 15, sell2: 50, text: text.i_padd });
items.register('astrofood', { type: 'consumable', value: 24, sell1: 60, sell2: 25, text: text.i_astrofood });
items.register('tzn', { type: 'consumable', value: 20, sell1: 8, sell2: 26, text: text.i_tzn });
items.register('sap', { type: 'consumable', value: 25, sell1: 14, sell2: 14, text: text.i_sap });
items.register('rations', { type: 'consumable', value: 30, sell1: 7, sell2: 7, text: text.i_rations });
items.register('quiche', { type: 'consumable', value: 45, sell1: 24, sell2: 48, text: text.i_quiche });
items.register('tea', { type: 'consumable', value: 15, sell1: 12, sell2: 24, text: text.i_tea });
items.register('boots', { type: 'weapon', value: 7, sell1: 30, sell2: 60, text: text.i_boots });
items.register('flight_suit', { type: 'armor', value: 10, sell1: 45, sell2: 4, text: text.i_flight_suit });
items.register('flakes', { type: 'consumable', value: 2, text: text.i_flakes });
items.register('temyarmor', { type: 'armor', value: 20, text: text.i_temyarmor });
items.register('snack', { type: 'consumable', value: 15, sell1: 30, sell2: 5, text: text.i_snack });

maps.register('foundry', foundryMap);
maps.register('foundry-overlay', foundryOverlayMap);

saver.locations.register(text.s_save);

speech.presets.register({
   radio: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [
            new CosmosDaemon(content.avAlphys, {
               context: audio.context,
               gain: 0.7,
               rate: 0.8,
               router: audio.soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avPapyrus, {
               context: audio.context,
               gain: 0.45,
               rate: 1.8,
               router: audio.soundRouter
            })
         ]
      ]
   }),
   erogot: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 65,
      voices: [
         [
            new CosmosDaemon(content.avAsgore, {
               context: audio.context,
               gain: 0.55,
               rate: 0.9,
               router: audio.soundRouter
            })
         ]
      ]
   }),
   tem: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [
            new CosmosDaemon(content.avTem1, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avTem2, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avTem3, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avTem4, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avTem5, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avTem6, { context: audio.context, router: audio.soundRouter, gain: 0.5 })
         ]
      ]
   }),
   asriel3: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [ [ new CosmosDaemon(content.avAsriel4, { context: audio.context, rate: 1, router: audio.soundRouter }) ] ]
   }),
   undyne: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         undyneDialogue(content.idcUndyneCutscene1), // 1
         undyneDialogue(content.idcUndyneAngryTomato), // 2
         undyneDialogue(content.idcUndyneDafuq), // 3
         undyneDialogue(content.idcUndyneGrr), // 4
         undyneDialogue(content.idcUndyneGrrSide), // 5
         undyneDialogue(content.idcUndyneHappyTomato), // 6
         undyneDialogue(content.idcUndyneImOntoYouPunk), // 7
         undyneDialogue(content.idcUndyneLaughcrazy), // 8
         undyneDialogue(content.idcUndynePensive), // 9
         undyneDialogue(content.idcUndyneSquidgames), // 10
         undyneDialogue(content.idcUndyneSus), // 11
         undyneDialogue(content.idcUndyneSweating), // 12
         undyneDialogue(content.idcUndynetheHell), // 13
         undyneDialogue(content.idcUndyneBeingAwesomeForTenMinutesStraight), // 14
         undyneDialogue(content.idcUndyneUWU), // 15
         undyneDialogue(content.idcUndyneWhatevs), // 16
         undyneDialogue(content.idcUndyneWTFBro), // 17
         undyneDialogue(content.idcUndyneYouKilledHim), // 18
         undyneDialogue(content.idcUndyneYouKilledHimPensive), // 19
         undyneDialogue(content.idcUndyneYouKilledHimSide), // 20
         undyneDialogue(content.idcUndyneYouKilledHimSmile), // 21
         undyneDialogue(content.idcUndyneYouKilledHimStare) // 22
      ],
      interval: 40,
      voices: [
         [ new CosmosDaemon(content.avUndyne, standardSound()) ],
         [ new CosmosDaemon(content.avUndyneex, standardSound()) ]
      ]
   })
});

for (const [ key, value ] of Object.entries(sources)) {
   easyRoom(key, foundryMap, value);
}

CosmosUtils.status(`LOAD MODULE: FOUNDRY BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
