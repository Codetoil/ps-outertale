import { AdvancedBloomFilter } from 'pixi-filters';
import content from './content';
import { audio, image } from './core';
import { CosmosAudio, CosmosDaemon, CosmosDaemonRouter, CosmosEffect } from './engine/audio';
import { CosmosUtils } from './engine/utils';

const conv1100 = CosmosAudio.utils.convolver(audio.context, 1, 1, 0, 0);

const filters = {
   bloom20: new AdvancedBloomFilter({ threshold: 0.2, bloomScale: 1, quality: 5 }),
   bloom80: new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 1, quality: 5 })
};

export function standardMusic (gain = 0.5, rate = 1) {
   return { context: audio.context, gain, loop: true, rate, router: audio.musicRouter };
}

export function standardSound (gain = 0.5, rate = 1) {
   return { context: audio.context, gain, rate, router: audio.soundRouter };
}

export function effectSetup (effect: CosmosEffect, router: CosmosDaemonRouter): CosmosDaemonRouter {
   const target = audio.context.createGain();
   effect.connect(target);
   return (input, context) => {
      input.connect(effect.input);
      input.connect(effect.throughput);
      router(target, context);
   };
}

const music = {
   aerialis: new CosmosDaemon(content.amAerialis, standardMusic()),
   aerialisEmpty: new CosmosDaemon(content.amAerialisEmpty, standardMusic()),
   arms: new CosmosDaemon(content.amArms, standardMusic()),
   armsIntro: new CosmosDaemon(content.amArmsIntro, {
      context: audio.context,
      router: audio.musicRouter,
      gain: 0.5
   }),
   battle1: new CosmosDaemon(content.amBattle1, { context: audio.context, loop: true, router: audio.musicRouter }),
   bgbeat: new CosmosDaemon(content.amBGBeat, { context: audio.context, loop: true, router: audio.musicRouter }),
   blookShop: new CosmosDaemon(content.amBlookShop, { context: audio.context, loop: true, router: audio.musicRouter }),
   chara: new CosmosDaemon(content.amChara, {
      context: audio.context,
      loop: true,
      rate: 0.9,
      router: audio.musicRouter
   }),
   characutscene: new CosmosDaemon(content.amCharacutscene, {
      context: audio.context,
      loop: true,
      rate: 0.9,
      router: audio.musicRouter
   }),
   CORE: new CosmosDaemon(content.amCore, {
      context: audio.context,
      loop: true,
      gain: 0.16384,
      router: audio.musicRouter
   }),
   confession: new CosmosDaemon(content.amConfession, {
      context: audio.context,
      loop: true,
      gain: 0.5,
      router: audio.musicRouter
   }),
   datingfight: new CosmosDaemon(content.amDatingfight, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   datingstart: new CosmosDaemon(content.amDatingstart, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   datingtense: new CosmosDaemon(content.amDatingtense, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   djbeat: new CosmosDaemon(content.amDJBeat, { context: audio.context, gain: 1, router: audio.musicRouter }),
   dogbass: new CosmosDaemon(content.amDogbass, { context: audio.context, router: audio.musicRouter }),
   dogbeat: new CosmosDaemon(content.amDogbeat, { context: audio.context, router: audio.musicRouter }),
   dogdance: new CosmosDaemon(content.amDogdance, standardMusic()),
   dogebattle: new CosmosDaemon(content.amDogebattle, standardMusic()),
   dogerelax: new CosmosDaemon(content.amDogerelax, standardMusic()),
   dogsigh: new CosmosDaemon(content.amDogsigh, standardMusic()),
   dogsong: new CosmosDaemon(content.amDogsong, standardMusic()),
   drone: new CosmosDaemon(content.amDrone, {
      context: audio.context,
      loop: true,
      router: audio.soundRouter,
      gain: 0.05,
      rate: 0.5
   }),
   dummyboss: new CosmosDaemon(content.amDummyboss, standardMusic()),
   endingexcerptIntro: new CosmosDaemon(content.amEndingexcerptIntro, {
      context: audio.context,
      router: audio.musicRouter
   }),
   endingexcerptLoop: new CosmosDaemon(content.amEndingexcerptLoop, standardMusic()),
   factory: new CosmosDaemon(content.amFactory, standardMusic()),
   factoryEmpty: new CosmosDaemon(content.amFactoryEmpty, standardMusic()),
   factoryquiet: new CosmosDaemon(content.amFactoryquiet, standardMusic()),
   factoryquietEmpty: new CosmosDaemon(content.amFactoryquietEmpty, standardMusic()),
   forthefans: new CosmosDaemon(content.amForthefans, { context: audio.context, router: audio.musicRouter, gain: 0.5 }),
   grandfinale: new CosmosDaemon(content.amGrandfinale, {
      context: audio.context,
      router: audio.musicRouter,
      gain: 0.35
   }),
   gameshow: new CosmosDaemon(content.amGameshow, standardMusic(0.3)),
   generator: new CosmosDaemon(content.amGenerator, {
      context: audio.context,
      loop: true,
      router: audio.soundRouter,
      gain: 0.5
   }),
   ghostbattle: new CosmosDaemon(content.amGhostbattle, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   home: new CosmosDaemon(content.amHome, standardMusic()),
   homeAlt: new CosmosDaemon(content.amHomeAlt, {
      context: audio.context,
      loop: true,
      gain: 0,
      router: audio.musicRouter
   }),
   knightknightSting: new CosmosDaemon(content.amKnightknightSting, {
      context: audio.context,
      router: audio.musicRouter,
      gain: 0.5
   }),
   lab: new CosmosDaemon(content.amLab, standardMusic(0.4)),
   legs: new CosmosDaemon(content.amLegs, standardMusic()),
   legsIntro: new CosmosDaemon(content.amLegsIntro, { context: audio.context, router: audio.musicRouter, gain: 0.5 }),
   letsflyajetpackwhydontwe: new CosmosDaemon(content.amLetsflyajetpackwhydontwe, standardMusic()),
   letsmakeabombwhydontwe: new CosmosDaemon(content.amLetsmakeabombwhydontwe, standardMusic()),
   madjickSting: new CosmosDaemon(content.amMadjickSting, {
      context: audio.context,
      router: audio.musicRouter,
      gain: 0.5
   }),
   mall: new CosmosDaemon(content.amMall, standardMusic(0.2)),
   memory: new CosmosDaemon(content.amMemory, { context: audio.context, loop: true, router: audio.musicRouter }),
   menu0: new CosmosDaemon(content.amMenu0, {
      context: audio.context,
      loop: true,
      rate: 432 / 440,
      router: audio.musicRouter
   }),
   menu1: new CosmosDaemon(content.amMenu1, {
      context: audio.context,
      loop: true,
      rate: 432 / 440,
      router: audio.musicRouter
   }),
   menu2: new CosmosDaemon(content.amMenu2, {
      context: audio.context,
      loop: true,
      rate: 432 / 440,
      router: audio.musicRouter
   }),
   menu3: new CosmosDaemon(content.amMenu3, {
      context: audio.context,
      loop: true,
      rate: 432 / 440,
      router: audio.musicRouter
   }),
   menu4: new CosmosDaemon(content.amMenu4, {
      context: audio.context,
      loop: true,
      rate: 432 / 440,
      router: audio.musicRouter
   }),
   muscle: new CosmosDaemon(content.amMuscle, { context: audio.context, loop: true, router: audio.musicRouter }),
   mushroomdance: new CosmosDaemon(content.amMushroomdance, standardMusic()),
   mettsuspense: new CosmosDaemon(content.amMettsuspense, standardMusic()),
   napstachords: new CosmosDaemon(content.amNapstachords, standardMusic()),
   napstahouse: new CosmosDaemon(content.amNapstahouse, standardMusic()),
   ohmy: new CosmosDaemon(content.amOhmy, standardMusic()),
   opera: new CosmosDaemon(content.amOpera, { context: audio.context, router: audio.musicRouter }),
   operaAlt: new CosmosDaemon(content.amOperaAlt, { context: audio.context, router: audio.musicRouter }),
   outlands: new CosmosDaemon(content.amOutlands, { context: audio.context, loop: true, router: audio.musicRouter }),
   papyrus: new CosmosDaemon(content.amPapyrus, { context: audio.context, loop: true, router: audio.musicRouter }),
   papyrusboss: new CosmosDaemon(content.amPapyrusboss, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   prebattle: new CosmosDaemon(content.amPrebattle, { context: audio.context, loop: true, router: audio.musicRouter }),
   predummy: new CosmosDaemon(content.amPredummy, standardMusic()),
   preshock: new CosmosDaemon(content.amPreshock, { context: audio.context, loop: true, router: audio.musicRouter }),
   redacted: new CosmosDaemon(content.amRedacted, standardMusic()),
   rise: new CosmosDaemon(content.amRise, standardMusic()),
   sansdate: new CosmosDaemon(content.amSansdate, standardMusic(void 0, 0.92)),
   secretsong: new CosmosDaemon(content.amSecretsong, { context: audio.context, router: audio.musicRouter }),
   sexyrectangle: new CosmosDaemon(content.amSexyrectangle, standardMusic(0.5)),
   shock: new CosmosDaemon(content.amShock, { context: audio.context, loop: true, router: audio.musicRouter }),
   shop: new CosmosDaemon(content.amShop, standardMusic()),
   specatk: new CosmosDaemon(content.amSpecatk, { context: audio.context, loop: true, router: audio.musicRouter }),
   spiderboss: new CosmosDaemon(content.amSpiderboss, standardMusic()),
   spiderrelax: new CosmosDaemon(content.amSpiderrelax, standardMusic()),
   splendor: new CosmosDaemon(content.amSplendor, {
      context: audio.context,
      loop: true,
      gain: 0,
      router: audio.musicRouter
   }),
   spooktune: new CosmosDaemon(content.amSpooktune, { context: audio.context, loop: true, router: audio.musicRouter }),
   spookwaltz: new CosmosDaemon(content.amSpookwaltz, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   spookwave: new CosmosDaemon(content.amSpookwave, { context: audio.context, loop: true, router: audio.musicRouter }),
   spookydate: new CosmosDaemon(content.amSpookydate, standardMusic()),
   starton: new CosmosDaemon(content.amStarton, { context: audio.context, loop: true, router: audio.musicRouter }),
   startonEmpty: new CosmosDaemon(content.amStartonEmpty, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   startonTown: new CosmosDaemon(content.amStartonTown, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   startonTownEmpty: new CosmosDaemon(content.amStartonTownEmpty, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   story: new CosmosDaemon(content.amStory, {
      context: audio.context,
      rate: 0.875,
      router: audio.musicRouter
   }),
   temmie: new CosmosDaemon(content.amTemmie, standardMusic()),
   temShop: new CosmosDaemon(content.amTemShop, standardMusic()),
   tension: new CosmosDaemon(content.amTension, { context: audio.context, loop: true, router: audio.musicRouter }),
   thriftShop: new CosmosDaemon(content.amThriftShop, standardMusic()),
   thundersnail: new CosmosDaemon(content.amThundersnail, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   toriel: new CosmosDaemon(content.amToriel, {
      context: audio.context,
      loop: true,
      rate: 0.925,
      router: audio.musicRouter
   }),
   torielboss: new CosmosDaemon(content.amTorielboss, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   twinkly: new CosmosDaemon(content.amTwinkly, { context: audio.context, loop: true, router: audio.musicRouter }),
   undyne: new CosmosDaemon(content.amUndyne, standardMusic()),
   undyneboss: new CosmosDaemon(content.amUndyneboss, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   undynefast: new CosmosDaemon(content.amUndynefast, standardMusic(4)),
   undynegeno: new CosmosDaemon(content.amUndynegeno, standardMusic()),
   undynegenoFinal: new CosmosDaemon(content.amUndynegenoFinal, { context: audio.context, router: audio.musicRouter }),
   undynegenoStart: new CosmosDaemon(content.amUndynegenoStart, { context: audio.context, router: audio.musicRouter }),
   undynepiano: new CosmosDaemon(content.amUndynepiano, standardMusic()),
   undynepre: new CosmosDaemon(content.amUndynepre, standardMusic()),
   undynepreboss: new CosmosDaemon(content.amUndynepreboss, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter
   }),
   undynepregeno: new CosmosDaemon(content.amUndynepregeno, { context: audio.context, router: audio.musicRouter }),
   wonder: new CosmosDaemon(content.amWonder, {
      context: audio.context,
      loop: true,
      router: audio.musicRouter,
      gain: 0
   }),
   wrongenemy: new CosmosDaemon(content.amWrongenemy, standardMusic(0.35)),
   youscreweduppal: new CosmosDaemon(content.amYouscreweduppal, standardMusic())
};

const sounds = {
   alphysfix: new CosmosDaemon(content.asAlphysfix, standardSound()),
   appear: new CosmosDaemon(content.asAppear, standardSound()),
   applause: new CosmosDaemon(content.asApplause, standardSound()),
   arrow: new CosmosDaemon(content.asArrow, standardSound()),
   bad: new CosmosDaemon(content.asBad, {
      context: audio.context,
      gain: 0.5,
      loop: true,
      router: audio.soundRouter
   }),
   bahbye: new CosmosDaemon(content.asBahbye, standardSound()),
   bark: new CosmosDaemon(content.asBark, { context: audio.context, gain: 0.4, router: audio.soundRouter }),
   battlefall: new CosmosDaemon(content.asBattlefall, {
      context: audio.context,
      gain: 0.35,
      router: audio.soundRouter
   }),
   bell: new CosmosDaemon(content.asBell, standardSound(0.35)),
   boing: new CosmosDaemon(content.asBoing, { context: audio.context, gain: 0.5, router: audio.soundRouter }),
   bomb: new CosmosDaemon(content.asBomb, standardSound()),
   bookspin: new CosmosDaemon(content.asBookspin, standardSound()),
   boom: new CosmosDaemon(content.asBoom, { context: audio.context, gain: 0.25, router: audio.soundRouter }),
   boxpush: new CosmosDaemon(content.asLanding, {
      context: audio.context,
      gain: 0.5,
      router: (() => {
         const effect = new CosmosEffect(audio.context, CosmosAudio.utils.delay(audio.context, 0.2, 0.6), 0.6);
         const target = audio.context.createGain();
         effect.connect(target);
         return (input, context) => {
            input.connect(effect.input);
            input.connect(effect.throughput);
            audio.soundRouter(target, context);
         };
      })()
   }),
   break: new CosmosDaemon(content.asBreak, { context: audio.context, router: audio.soundRouter }),
   buhbuhbuhdaadodaa: new CosmosDaemon(content.asBuhbuhbuhdaadodaa, standardSound()),
   burst: new CosmosDaemon(content.asBurst, standardSound()),
   clap: new CosmosDaemon(content.asClap, standardSound()),
   computer: new CosmosDaemon(content.asComputer, {
      context: audio.context,
      gain: 0.5,
      loop: true,
      router: audio.soundRouter
   }),
   crit: new CosmosDaemon(content.asCrit, standardSound()),
   cymbal: new CosmosDaemon(content.asCymbal, standardSound()),
   deeploop2: new CosmosDaemon(content.asDeeploop2, {
      context: audio.context,
      gain: 0.5,
      loop: true,
      router: audio.soundRouter
   }),
   dephase: new CosmosDaemon(content.asDephase, { context: audio.context, gain: 0.4, router: audio.soundRouter }),
   depower: new CosmosDaemon(content.asDepower, { context: audio.context, gain: 0.45, router: audio.soundRouter }),
   dimbox: new CosmosDaemon(content.asDimbox, { context: audio.context, gain: 0.2, router: audio.soundRouter }),
   door: new CosmosDaemon(content.asDoor, standardSound()),
   doorClose: new CosmosDaemon(content.asDoorClose, standardSound()),
   drumroll: new CosmosDaemon(content.asDrumroll, standardSound()),
   dununnn: new CosmosDaemon(content.asDununnn, standardSound()),
   echostop: new CosmosDaemon(content.asNoise, {
      context: audio.context,
      rate: 1.4,
      gain: 0.2,
      router: audio.soundRouter
   }),
   electrodoor: new CosmosDaemon(content.asElectrodoor, standardSound()),
   electrodoorClose: new CosmosDaemon(content.asElectrodoorClose, standardSound()),
   elevator: new CosmosDaemon(content.asElevator, standardSound()),
   equip: new CosmosDaemon(content.asEquip, { context: audio.context, gain: 0.45, router: audio.soundRouter }),
   fear: new CosmosDaemon(content.asFear, standardSound()),
   frypan: new CosmosDaemon(content.asFrypan, standardSound()),
   glassbreak: new CosmosDaemon(content.asGlassbreak, standardSound()),
   goner_charge: new CosmosDaemon(content.asGonerCharge, standardSound()),
   goodbye: new CosmosDaemon(content.asGoodbye, { context: audio.context, gain: 0.3, router: audio.soundRouter }),
   grab: new CosmosDaemon(content.asGrab, standardSound()),
   gunshot: new CosmosDaemon(content.asGunshot, standardSound()),
   heal: new CosmosDaemon(content.asHeal, standardSound()),
   heartshot: new CosmosDaemon(content.asHeartshot, standardSound(0.35)),
   hit: new CosmosDaemon(content.asHit, standardSound()),
   hurt: new CosmosDaemon(content.asHurt, standardSound()),
   impact: new CosmosDaemon(content.asImpact, { context: audio.context, gain: 0.8, router: audio.soundRouter }),
   indicator: new CosmosDaemon(content.asIndicator, standardSound()),
   jetpack: new CosmosDaemon(content.asJetpack, {
      context: audio.context,
      gain: 0.5,
      loop: true,
      router: audio.soundRouter
   }),
   kick: new CosmosDaemon(content.asKick, standardSound()),
   knock: new CosmosDaemon(content.asKnock, standardSound()),
   landing: new CosmosDaemon(content.asLanding, standardSound()),
   long_elevator: new CosmosDaemon(content.asLongElevator, standardSound()),
   love: new CosmosDaemon(content.asLove, { context: audio.context, gain: 0.2, router: audio.soundRouter }),
   menu: new CosmosDaemon(content.asMenu, standardSound()),
   menuMusic: new CosmosDaemon(content.asMenu, { context: audio.context, gain: 0.5, router: audio.musicRouter }),
   metapproach: new CosmosDaemon(content.asMetapproach, standardSound()),
   monsterHurt1: new CosmosDaemon(content.asMonsterHurt1, standardSound()),
   monsterHurt2: new CosmosDaemon(content.asMonsterHurt2, standardSound()),
   monsterHurt3: new CosmosDaemon(content.asMonsterHurt3, standardSound()),
   monsterHurt4: new CosmosDaemon(content.asMonsterHurt4, standardSound()),
   multitarget: new CosmosDaemon(content.asMultitarget, standardSound()),
   mus_ohyes: new CosmosDaemon(content.asMusOhyes, standardSound()),
   node: new CosmosDaemon(content.asNode, standardSound()),
   noise: new CosmosDaemon(content.asNoise, { context: audio.context, gain: 0.25, router: audio.soundRouter }),
   note: new CosmosDaemon(content.asNote, standardSound()),
   notify: new CosmosDaemon(content.asNotify, standardSound()),
   orchhit: new CosmosDaemon(content.asOrchhit, standardSound()),
   pathway: new CosmosDaemon(content.asPathway, { context: audio.context, gain: 0.75, router: audio.soundRouter }),
   phase: new CosmosDaemon(content.asPhase, { context: audio.context, gain: 0.4, router: audio.soundRouter }),
   phone: new CosmosDaemon(content.asPhone, { context: audio.context, gain: 0.4, router: audio.soundRouter }),
   prebomb: new CosmosDaemon(content.asPrebomb, standardSound()),
   punch1: new CosmosDaemon(content.asPunch1, standardSound()),
   punch2: new CosmosDaemon(content.asPunch2, standardSound()),
   purchase: new CosmosDaemon(content.asPurchase, standardSound()),
   retract: new CosmosDaemon(content.asRetract, { context: audio.context, gain: 0.45, router: audio.soundRouter }),
   rimshot: new CosmosDaemon(content.asRimshot, standardSound()),
   run: new CosmosDaemon(content.asRun, { context: audio.context, gain: 0.6, router: audio.soundRouter }),
   rustle: new CosmosDaemon(content.asRustle, standardSound()),
   saber3: new CosmosDaemon(content.asSaber3, standardSound()),
   save: new CosmosDaemon(content.asSave, { context: audio.context, gain: 0.45, router: audio.soundRouter }),
   savior: new CosmosDaemon(content.asSavior, { context: audio.context, gain: 0.4, router: audio.soundRouter }),
   select: new CosmosDaemon(content.asSelect, { context: audio.context, gain: 0.7, router: audio.soundRouter }),
   shake: new CosmosDaemon(content.asShake, {
      context: audio.context,
      gain: 1,
      router: effectSetup(new CosmosEffect(audio.context, conv1100, 0.4), audio.soundRouter)
   }),
   shakein: new CosmosDaemon(content.asShakein, standardSound()),
   shock: new CosmosDaemon(content.asShock, standardSound()),
   shatter: new CosmosDaemon(content.asShatter, { context: audio.context, router: audio.soundRouter }),
   singBad1: new CosmosDaemon(content.asSingBad1, standardSound()),
   singBad2: new CosmosDaemon(content.asSingBad2, standardSound()),
   singBad3: new CosmosDaemon(content.asSingBad3, standardSound()),
   singBass1: new CosmosDaemon(content.asSingBass1, standardSound()),
   singBass2: new CosmosDaemon(content.asSingBass2, standardSound()),
   singTreble1: new CosmosDaemon(content.asSingTreble1, standardSound()),
   singTreble2: new CosmosDaemon(content.asSingTreble2, standardSound()),
   singTreble3: new CosmosDaemon(content.asSingTreble3, standardSound()),
   singTreble4: new CosmosDaemon(content.asSingTreble4, standardSound()),
   singTreble5: new CosmosDaemon(content.asSingTreble5, standardSound()),
   singTreble6: new CosmosDaemon(content.asSingTreble6, standardSound()),
   slidewhistle: new CosmosDaemon(content.asSlidewhistle, standardSound()),
   smallelectroshock: new CosmosDaemon(content.asSmallelectroshock, standardSound()),
   sparkle: new CosmosDaemon(content.asSparkle, standardSound()),
   specin: new CosmosDaemon(content.asSpecin, {
      context: audio.context,
      gain: 0.4,
      rate: 1.2,
      router: audio.soundRouter
   }),
   specout: new CosmosDaemon(content.asSpecout, {
      context: audio.context,
      gain: 0.4,
      rate: 1.2,
      router: audio.soundRouter
   }),
   speed: new CosmosDaemon(content.asSpeed, standardSound()),
   spiderLaugh: new CosmosDaemon(content.asSpiderLaugh, {
      context: audio.context,
      gain: 0.4,
      router: audio.soundRouter
   }),
   splash: new CosmosDaemon(content.asSplash, { context: audio.context, router: audio.soundRouter }),
   squeak: new CosmosDaemon(content.asSqueak, { context: audio.context, gain: 0.15, router: audio.soundRouter }),
   stab: new CosmosDaemon(content.asStab, standardSound()),
   step: new CosmosDaemon(content.asStep, standardSound()),
   stomp: new CosmosDaemon(content.asStomp, standardSound()),
   strike: new CosmosDaemon(content.asStrike, standardSound()),
   superstrike: new CosmosDaemon(content.asSuperstrike, standardSound()),
   swallow: new CosmosDaemon(content.asSwallow, standardSound()),
   swing: new CosmosDaemon(content.asSwing, { context: audio.context, gain: 0.6, router: audio.soundRouter }),
   switch: new CosmosDaemon(content.asSwitch, standardSound()),
   textnoise: new CosmosDaemon(content.asTextnoise, standardSound()),
   trombone: new CosmosDaemon(content.asTrombone, { context: audio.context, gain: 0.8, router: audio.soundRouter }),
   tv: new CosmosDaemon(content.asTV, { context: audio.context, gain: 0.8, loop: true, router: audio.soundRouter }),
   twinklyHurt: new CosmosDaemon(content.asTwinklyHurt, {
      context: audio.context,
      gain: 0.8,
      router: audio.soundRouter
   }),
   twinklyLaugh: new CosmosDaemon(content.asTwinklyLaugh, {
      context: audio.context,
      gain: 0.8,
      router: audio.soundRouter
   }),
   upgrade: new CosmosDaemon(content.asUpgrade, {
      context: audio.context,
      gain: 0.45,
      rate: 0.8,
      router: audio.soundRouter
   }),
   whimper: new CosmosDaemon(content.asWhimper, standardSound()),
   whipcrack: new CosmosDaemon(content.asWhipcrack, standardSound()),
   whoopee: new CosmosDaemon(content.asWhoopee, standardSound())
};

const tints = { dark01: 0x555555, dark02: 0x757575, dark03: 0x959595 };

for (const [ key, value ] of Object.entries({
   battle1: 0.95,
   bgbeat: 0.75,
   blookShop: 0.95,
   chara: 0.95,
   characutscene: 0.95,
   datingfight: 0.45,
   datingstart: 0.6,
   datingtense: 0.55,
   djbeat: 0.9,
   dogbass: 0.45,
   dogbeat: 0.65,
   dogdance: 0.75,
   dogebattle: 0.5,
   dogerelax: 0.8,
   dogsigh: 0.95,
   dogsong: 1,
   dummyboss: 0.75,
   endingexcerptIntro: 0.7,
   endingexcerptLoop: 0.7,
   factory: 0.95,
   factoryEmpty: 0.7,
   factoryquiet: 0.45,
   factoryquietEmpty: 0.6,
   gameover: 0.65,
   generator: 0.65,
   ghostbattle: 0.75,
   home: 0.5,
   homeAlt: 0,
   memory: 0.8,
   menu0: 0.8,
   menu1: 0.8,
   menu2: 0.8,
   menu3: 0.8,
   menu4: 0.8,
   muscle: 0.9,
   mushroomdance: 0.5,
   napstachords: 0.65,
   napstahouse: 0.45,
   outlands: 0.5,
   papyrus: 0.65,
   papyrusboss: 0.65,
   prebattle: 0.95,
   predummy: 0.9,
   preshock: 1,
   redacted: 0.95,
   rise: 0.55,
   secretsong: 0.95,
   shock: 0.75,
   shop: 0.35,
   specatk: 0.65,
   spiderboss: 0.8,
   spiderrelax: 0.35,
   splendor: 0,
   spooktune: 0.8,
   spookwaltz: 0.95,
   spookwave: 0.75,
   spookydate: 0.9,
   starton: 0.85,
   startonEmpty: 0.9,
   startonTown: 0.7,
   startonTownEmpty: 0.75,
   story: 0.45,
   temmie: 1,
   temShop: 0.8,
   tension: 0.55,
   thundersnail: 0.85,
   toriel: 0.75,
   torielboss: 1,
   truth: 0.4,
   twinkly: 0.95,
   undyne: 0.6,
   undyneboss: 0.65,
   undynefast: 0.75,
   undynegeno: 0.8,
   undynegenoFinal: 0.9,
   undynegenoStart: 0.8,
   undynepiano: 0.45,
   undynepre: 0.45,
   undynepreboss: 0.55,
   undynepregeno: 0.75,
   wonder: 0.45,
   youscreweduppal: 0.7
})) {
   key in music && (music[key as keyof typeof music].gain = (value ?? 0.5) * 0.6);
}

audio.music.register(music);
audio.sounds.register(sounds);
image.filters.register(filters);
image.tints.register(tints);

export default { conv1100, filters, music, sounds, tints };

CosmosUtils.status(`LOAD MODULE: ASSETS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
