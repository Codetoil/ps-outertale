import { standardSound } from '../assets';
import { OutertaleMap, OutertaleSpeechPreset } from '../classes';
import { quickCall } from '../common';
import commonText from '../common/text';
import content from '../content';
import { atlas, audio, game, items, maps, renderer, speech } from '../core';
import {
   CosmosAnimation,
   CosmosBasic,
   CosmosDaemon,
   CosmosDirection,
   CosmosNavigator,
   CosmosObject,
   CosmosSprite,
   CosmosUtils
} from '../engine';
import { easyRoom, keepActive, phone, portraits, saver } from '../mantle';
import save from '../save';
import text from './text';

import imStarton$info from '../../assets/images/maps/starton.json?url';
import s_alphys from '../../assets/rooms/s_alphys.json';
import s_backrooms from '../../assets/rooms/s_backrooms.json';
import s_battle from '../../assets/rooms/s_battle.json';
import s_beddinng from '../../assets/rooms/s_beddinng.json';
import s_bonehouse from '../../assets/rooms/s_bonehouse.json';
import s_bridge from '../../assets/rooms/s_bridge.json';
import s_bros from '../../assets/rooms/s_bros.json';
import s_capture from '../../assets/rooms/s_capture.json';
import s_crossroads from '../../assets/rooms/s_crossroads.json';
import s_doggo from '../../assets/rooms/s_doggo.json';
import s_dogs from '../../assets/rooms/s_dogs.json';
import s_exit from '../../assets/rooms/s_exit.json';
import s_greater from '../../assets/rooms/s_greater.json';
import s_grillbys from '../../assets/rooms/s_grillbys.json';
import s_human from '../../assets/rooms/s_human.json';
import s_innterior from '../../assets/rooms/s_innterior.json';
import s_jenga from '../../assets/rooms/s_jenga.json';
import s_lesser from '../../assets/rooms/s_lesser.json';
import s_librarby from '../../assets/rooms/s_librarby.json';
import s_lookout from '../../assets/rooms/s_lookout.json';
import s_math from '../../assets/rooms/s_math.json';
import s_maze from '../../assets/rooms/s_maze.json';
import s_pacing from '../../assets/rooms/s_pacing.json';
import s_papyrus from '../../assets/rooms/s_papyrus.json';
import s_papyrusroom from '../../assets/rooms/s_papyrusroom.json';
import s_puzzle1 from '../../assets/rooms/s_puzzle1.json';
import s_puzzle2 from '../../assets/rooms/s_puzzle2.json';
import s_puzzle3 from '../../assets/rooms/s_puzzle3.json';
import s_sans from '../../assets/rooms/s_sans.json';
import s_spaghetti from '../../assets/rooms/s_spaghetti.json';
import s_stand from '../../assets/rooms/s_stand.json';
import s_start from '../../assets/rooms/s_start.json';
import s_taxi from '../../assets/rooms/s_taxi.json';
import s_town1 from '../../assets/rooms/s_town1.json';
import s_town2 from '../../assets/rooms/s_town2.json';

export const faces = {
   alphysCutscene1: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene1 ] }),
   alphysCutscene2: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene2 ] }),
   alphysCutscene3: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene3 ] }),
   alphysDontGetAllDreamyEyedOnMeNow: new CosmosSprite({
      anchor: 0,
      frames: [ content.idcAlphysDontGetAllDreamyEyedOnMeNow ]
   }),
   alphysFR: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysFR ] }),
   alphysGarbo: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysGarbo ] }),
   alphysGarboCenter: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysGarboCenter ] }),
   alphysHaveSomeCompassion: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysHaveSomeCompassion ] }),
   alphysHellYeah: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysHellYeah ] }),
   alphysIDK: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysIDK ] }),
   alphysInquisitive: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysInquisitive ] }),
   alphysNervousLaugh: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysNervousLaugh ] }),
   alphysNeutralSweat: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysNeutralSweat ] }),
   alphysOhGodNo: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysOhGodNo ] }),
   alphysShocked: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysShocked ] }),
   alphysSide: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSide ] }),
   alphysSideSad: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSideSad ] }),
   alphysSmileSweat: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSmileSweat ] }),
   alphysSoAwesome: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSoAwesome ] }),
   alphysThatSucks: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysThatSucks ] }),
   alphysTheFactIs: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysTheFactIs ] }),
   alphysUhButHeresTheDeal: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysUhButHeresTheDeal ] }),
   alphysWelp: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWelp ] }),
   alphysWorried: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWorried ] }),
   alphysWTF: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWTF ] }),
   alphysWTF2: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWTF2 ] }),
   alphysYeahYouKnowWhatsUp: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysYeahYouKnowWhatsUp ] }),
   alphysYeahYouKnowWhatsUpCenter: new CosmosSprite({
      anchor: 0,
      frames: [ content.idcAlphysYeahYouKnowWhatsUpCenter ]
   }),
   asgoreBouttacry: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreBouttacry }),
   asgoreCry1: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreCry1 }),
   asgoreCry2: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreCry2 ] }),
   asgoreCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreCutscene1 }),
   asgoreFunni: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreFunni }),
   asgoreHmph: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHmph }),
   asgoreHmphClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHmphClosed }),
   asgoreHopeful: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHopeful }),
   asgoreHopefulSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHopefulSide }),
   asgoreMad: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreMad }),
   asgoreMadClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreMadClosed }),
   asgorePensive: new CosmosAnimation({ anchor: 0, resources: content.idcAsgorePensive }),
   asgorePensiveSmile: new CosmosAnimation({ anchor: 0, resources: content.idcAsgorePensiveSmile }),
   asgoreSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreSide }),
   asgoreWhatHaveYouDone: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreWhatHaveYouDone }),
   asgoreWhatYouDoin: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreWhatYouDoin }),
   kiddCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcKiddCutscene1 }),
   kiddAww: new CosmosAnimation({ anchor: 0, resources: content.idcKiddAww }),
   kiddHuh: new CosmosAnimation({ anchor: 0, resources: content.idcKiddHuh }),
   kiddHuhSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddHuhSlave }),
   kiddNeutral: new CosmosAnimation({ anchor: 0, resources: content.idcKiddNeutral }),
   kiddNeutralSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddNeutralSlave }),
   kiddSerene: new CosmosAnimation({ anchor: 0, resources: content.idcKiddSerene }),
   kiddShocked: new CosmosAnimation({ anchor: 0, resources: content.idcKiddShocked }),
   kiddShockedSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddShockedSlave }),
   kiddKiller: new CosmosAnimation({ anchor: 0, resources: content.idcKiddKiller }),
   kiddKillerSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddKillerSlave }),
   kiddSide: new CosmosAnimation({ anchor: 0, resources: content.idcKiddSide }),
   mettatonNeo: new CosmosSprite({ anchor: 0, frames: [ content.idcMettatonNeo ] }),
   papyrusAYAYA: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusAYAYA }),
   papyrusAyoo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusAyoo }),
   papyrusBattleAnime: new CosmosAnimation({ resources: content.idcPapyrusBattleAnime }),
   papyrusBattleBlush: new CosmosSprite({ frames: [ content.idcPapyrusBattleBlush ] }),
   papyrusBattleBlushRefuse: new CosmosSprite({ frames: [ content.idcPapyrusBattleBlushRefuse ] }),
   papyrusBattleClosed: new CosmosAnimation({ resources: content.idcPapyrusBattleClosed }),
   papyrusBattleConfident: new CosmosAnimation({ resources: content.idcPapyrusBattleConfident }),
   papyrusBattleDeadpan: new CosmosSprite({ frames: [ content.idcPapyrusBattleDeadpan ] }),
   papyrusBattleDetermined: new CosmosSprite({ frames: [ content.idcPapyrusBattleDetermined ] }),
   papyrusBattleEyeroll: new CosmosSprite({ frames: [ content.idcPapyrusBattleEyeroll ] }),
   papyrusBattleFakeAnger: new CosmosSprite({ frames: [ content.idcPapyrusBattleFakeAnger ] }),
   papyrusBattleHapp: new CosmosAnimation({ resources: content.idcPapyrusBattleHapp }),
   papyrusBattleHappAgain: new CosmosSprite({ frames: [ content.idcPapyrusBattleHappAgain ] }),
   papyrusBattleMad: new CosmosAnimation({ resources: content.idcPapyrusBattleMad }),
   papyrusBattleNooo: new CosmosAnimation({ resources: content.idcPapyrusBattleNooo }),
   papyrusBattleOwwie: new CosmosSprite({ frames: [ content.idcPapyrusBattleOwwie ] }),
   papyrusBattleShock: new CosmosSprite({ frames: [ content.idcPapyrusBattleShock ] }),
   papyrusBattleSide: new CosmosSprite({ frames: [ content.idcPapyrusBattleSide ] }),
   papyrusBattleSly: new CosmosAnimation({ resources: content.idcPapyrusBattleSly }),
   papyrusBattleSus: new CosmosSprite({ frames: [ content.idcPapyrusBattleSus ] }),
   papyrusBattleSweat: new CosmosAnimation({ resources: content.idcPapyrusBattleSweat }),
   papyrusBattleTopBlush: new CosmosSprite({ frames: [ content.idcPapyrusBattleTopBlush ] }),
   papyrusBattleWeary: new CosmosSprite({ frames: [ content.idcPapyrusBattleWeary ] }),
   papyrusCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusCutscene1 }),
   papyrusDisbeef: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusDisbeef }),
   papyrusDisbeefTurnaround: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusDisbeefTurnaround }),
   papyrusIsThatSo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusIsThatSo }),
   papyrusNervousLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNervousLaugh }),
   papyrusNervousSweat: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNervousSweat }),
   papyrusNyeh: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNyeh }),
   papyrusSad: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusSad }),
   papyrusSadSweat: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusSadSweat }),
   papyrusThisIsSoSad: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusThisIsSoSad }),
   papyrusWhatchaGonnaDo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusWhatchaGonnaDo }),
   sansBlink: new CosmosSprite({ anchor: 0, frames: [ content.idcSansBlink ] }),
   sansEmpty: new CosmosSprite({ anchor: 0, frames: [ content.idcSansEmpty ] }),
   sansEye: new CosmosAnimation({ active: true, anchor: 0, resources: content.idcSansEye }).on('tick', keepActive),
   sansLaugh1: new CosmosSprite({ anchor: 0, frames: [ content.idcSansLaugh1 ] }),
   sansLaugh2: new CosmosSprite({ anchor: 0, frames: [ content.idcSansLaugh2 ] }),
   sansNormal: new CosmosSprite({ anchor: 0, frames: [ content.idcSansNormal ] }),
   sansWink: new CosmosSprite({ anchor: 0, frames: [ content.idcSansWink ] })
};

export const navscript = {
   enable (
      handler = (handler: CosmosDirection | 'next' | 'prev') => {},
      grid = [] as CosmosBasic[][],
      objects = [] as CosmosObject[]
   ) {
      navscript.state = { grid, handler, objects };
   },
   disable () {
      navscript.state = { grid: [], handler: () => {}, objects: [] };
   },
   get position () {
      return atlas.navigators.of('navscript').position;
   },
   state: {
      grid: [] as CosmosBasic[][],
      handler: (input: CosmosDirection | 'next' | 'prev') => {},
      objects: [] as CosmosObject[]
   },
   get value () {
      return atlas.navigators.of('navscript').selection();
   }
};

export const sources = {
   s_start,
   s_sans,
   s_crossroads,
   s_alphys,
   s_human,
   s_papyrus,
   s_doggo,
   s_lookout,
   s_maze,
   s_stand,
   s_dogs,
   s_lesser,
   s_bros,
   s_spaghetti,
   s_math,
   s_puzzle1,
   s_puzzle2,
   s_jenga,
   s_pacing,
   s_puzzle3,
   s_greater,
   s_bridge,
   s_town1,
   s_taxi,
   s_town2,
   s_battle,
   s_exit,
   s_grillbys,
   s_backrooms,
   s_bonehouse,
   s_papyrusroom,
   s_innterior,
   s_beddinng,
   s_capture,
   s_librarby
};

const startonMap = new OutertaleMap(imStarton$info, content.imStarton);

atlas.navigators.register({
   navscript: new CosmosNavigator({
      grid: () => navscript.state.grid,
      next: () => void navscript.state.handler('next'),
      prev: () => void navscript.state.handler('prev'),
      objects: [
         new CosmosObject().on('tick', function () {
            this.objects = navscript.state.objects;
         })
      ]
   })
      .on('from', () => atlas.attach(renderer, 'main', 'navscript'))
      .on('to', () => atlas.detach(renderer, 'main', 'navscript'))
});

items.register('chip', { type: 'consumable', value: 45, text: text.i_chip });
items.register('fruit', { type: 'consumable', value: 15, sell1: 25, sell2: 10, text: text.i_fruit });
items.register('nice_cream', { type: 'consumable', value: 15, sell1: 40, sell2: 10, text: text.i_nice_cream });
items.register('spaghetti', { type: 'consumable', value: 16, sell1: 150, sell2: 75, text: text.i_spaghetti });
items.register('berry', { type: 'consumable', value: 9, sell1: 20, sell2: 10, text: text.i_berry });
items.register('pop', { type: 'consumable', value: 11, sell1: 20, sell2: 60, text: text.i_pop });
items.register('glove', { type: 'weapon', value: 5, sell1: 15, sell2: 50, text: text.i_glove });
items.register('eye', { type: 'armor', value: 7, sell1: 15, sell2: 50, text: text.i_eye });
items.register('swirl', { type: 'consumable', value: 22, sell1: 20, sell2: 20, text: text.i_swirl });
items.register('milkshake', { type: 'consumable', value: 18, sell1: 80, sell2: 20, text: text.i_milkshake });
items.register('voidy', { type: 'special', value: 0, text: text.i_voidy });
items.register('blookpie', { type: 'consumable', value: 99, text: text.i_blookpie });

maps.register('starton', startonMap);

phone.register('papyrus', {
   display () {
      return save.data.n.plot_date > 0.2;
   },
   priority: 2.2,
   async trigger () {
      switch (game.room) {
         case 'f_lobby':
         case 'f_error':
         case 'f_telescope':
         case 'f_truth':
            quickCall(false, ...commonText.c_nobody4);
            break;
         default: {
            const papytext = text.p_papyrus[game.room];
            quickCall(!!papytext, ...CosmosUtils.provide(papytext || commonText.c_nobody3));
            break;
         }
      }
   },
   name: text.c_name_papyrus
});

portraits.register(faces);

saver.locations.register(text.s_save);

speech.presets.register({
   kidd: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.kiddCutscene1, // 1
         faces.kiddSide, // 2
         faces.kiddAww, // 3
         faces.kiddHuh, // 4
         faces.kiddNeutral, // 5
         faces.kiddSerene, // 6
         faces.kiddShocked, // 7
         faces.kiddKiller, // 8
         faces.kiddHuhSlave, // 9
         faces.kiddNeutralSlave, // 10
         faces.kiddShockedSlave, // 11
         faces.kiddKillerSlave // 12
      ],
      interval: 35,
      voices: [ [ new CosmosDaemon(content.avKidd, standardSound()) ] ]
   }),
   kidding: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.kiddCutscene1, // 1
         faces.kiddSide, // 2
         faces.kiddAww, // 3
         faces.kiddHuh, // 4
         faces.kiddNeutral, // 5
         faces.kiddSerene, // 6
         faces.kiddShocked, // 7
         faces.kiddKiller, // 8
         faces.kiddHuhSlave, // 9
         faces.kiddNeutralSlave, // 10
         faces.kiddShockedSlave, // 11
         faces.kiddKillerSlave // 12
      ],
      interval: 35,
      voices: [ [ new CosmosDaemon(content.avKidd, standardSound()) ] ]
   }),
   asgore1: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.asgoreCutscene1, // 1
         faces.asgorePensive, // 2
         faces.asgoreWhatHaveYouDone, // 3
         faces.asgorePensiveSmile, // 4
         faces.asgoreSide, // 5
         faces.asgoreHopeful, // 6
         faces.asgoreHopefulSide, // 7
         faces.asgoreFunni, // 8
         faces.asgoreBouttacry, // 9
         faces.asgoreCry1, // 10
         faces.asgoreCry2, // 11
         faces.asgoreWhatYouDoin, // 12
         faces.asgoreMad, // 13
         faces.asgoreMadClosed, // 14
         faces.asgoreHmph, // 15
         faces.asgoreHmphClosed // 16
      ],
      interval: 65,
      voices: [ [ new CosmosDaemon(content.avAsgore, { context: audio.context, gain: 0.55, router: audio.soundRouter }) ] ]
   }),
   mettaton: new OutertaleSpeechPreset({
      faces: [ null, faces.mettatonNeo ],
      interval: 40,
      voices: [
         [
            new CosmosDaemon(content.avMettaton1, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton2, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton3, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton4, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton5, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton6, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton7, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton8, { context: audio.context, router: audio.soundRouter, gain: 0.5 }),
            new CosmosDaemon(content.avMettaton9, { context: audio.context, router: audio.soundRouter, gain: 0.5 })
         ]
      ],
      threshold: 0.8
   }),
   papyrus: new OutertaleSpeechPreset({
      faces: [
         faces.papyrusCutscene1, // 0
         faces.papyrusAYAYA, // 1
         faces.papyrusAyoo, // 2
         faces.papyrusDisbeef, // 3
         faces.papyrusIsThatSo, // 4
         faces.papyrusNervousLaugh, // 5
         faces.papyrusNervousSweat, // 6
         faces.papyrusNyeh, // 7
         faces.papyrusThisIsSoSad, // 8
         faces.papyrusWhatchaGonnaDo, // 9
         faces.papyrusBattleHapp, // 10
         faces.papyrusBattleHappAgain, // 11
         faces.papyrusBattleAnime, // 12
         faces.papyrusBattleBlush, // 13
         faces.papyrusBattleBlushRefuse, // 14
         faces.papyrusBattleConfident, // 15
         faces.papyrusBattleDeadpan, // 16
         faces.papyrusBattleDetermined, // 17
         faces.papyrusBattleEyeroll, // 18
         faces.papyrusBattleFakeAnger, // 19
         faces.papyrusBattleMad, // 20
         faces.papyrusBattleNooo, // 21
         faces.papyrusBattleOwwie, // 22
         faces.papyrusBattleShock, // 23
         faces.papyrusBattleSide, // 24
         faces.papyrusBattleSly, // 25
         faces.papyrusBattleSus, // 26
         faces.papyrusBattleSweat, // 27
         faces.papyrusBattleTopBlush, // 28
         faces.papyrusBattleWeary, // 29
         null, // 30
         faces.papyrusSad, // 31
         faces.papyrusSadSweat, // 32
         faces.papyrusBattleClosed, // 33
         faces.papyrusDisbeefTurnaround // 34
      ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avPapyrus, { context: audio.context, gain: 0.45, router: audio.soundRouter }) ]
      ],
      font1: '17px Papyrus',
      font2: '9px Papyrus'
   }),
   papyrusnt: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avPapyrus, { context: audio.context, gain: 0.45, router: audio.soundRouter }) ]
      ],
      font1: '17px Papyrus',
      font2: '9px Papyrus'
   }),
   alphys: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.alphysCutscene1, // 1
         faces.alphysShocked, // 2
         faces.alphysNervousLaugh, // 3
         faces.alphysWorried, // 4
         faces.alphysYeahYouKnowWhatsUp, // 5
         faces.alphysYeahYouKnowWhatsUpCenter, // 6
         faces.alphysDontGetAllDreamyEyedOnMeNow, // 7
         faces.alphysCutscene2, // 8
         faces.alphysSide, // 9
         faces.alphysSmileSweat, // 10
         faces.alphysSideSad, // 11
         faces.alphysSoAwesome, // 12
         faces.alphysThatSucks, // 13
         faces.alphysHaveSomeCompassion, // 14
         faces.alphysTheFactIs, // 15
         faces.alphysHellYeah, // 16
         faces.alphysWelp, // 17
         faces.alphysUhButHeresTheDeal, // 18
         faces.alphysIDK, // 19
         faces.alphysNeutralSweat, // 20
         faces.alphysWTF, // 21
         faces.alphysWTF2, // 22
         faces.alphysCutscene3, // 23
         faces.alphysGarbo, // 24
         faces.alphysGarboCenter, // 25
         faces.alphysFR, // 26
         faces.alphysInquisitive // 27
      ],
      interval: 35,
      voices: [ [ new CosmosDaemon(content.avAlphys, { context: audio.context, gain: 0.7, router: audio.soundRouter }) ] ]
   }),
   darksans: new OutertaleSpeechPreset({ faces: [ null ], interval: 45, voices: [ null ] }),
   sans: new OutertaleSpeechPreset({
      faces: [
         faces.sansNormal, // 0
         faces.sansEmpty, // 1
         faces.sansWink, // 2
         faces.sansBlink, // 3
         faces.sansLaugh1, // 4
         faces.sansLaugh2, // 5
         faces.sansEye, // 6
         null // 7
      ],
      interval: 45,
      voices: [ [ new CosmosDaemon(content.avSans, { context: audio.context, gain: 0.45, router: audio.soundRouter }) ] ],
      font1: '16px ComicSans',
      font2: '9px ComicSans'
   }),
   without: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 45,
      voices: [ [ new CosmosDaemon(content.avSans, { context: audio.context, gain: 0.45, router: audio.soundRouter }) ] ],
      font1: '16px ComicSans',
      font2: '11px ComicSans'
   })
});

for (const [ key, value ] of Object.entries(sources)) {
   easyRoom(key, startonMap, value);
}

CosmosUtils.status(`LOAD MODULE: STARTON BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
