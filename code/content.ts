import {
   CosmosAnimationResources,
   CosmosAudio,
   CosmosColor,
   CosmosData,
   CosmosImage,
   CosmosInventory,
   CosmosMath,
   CosmosStringData,
   CosmosUtils
} from './engine';

import amAerialis from '../assets/audio/music/aerialis.ogg?url';
import amAerialisEmpty from '../assets/audio/music/aerialisEmpty.ogg?url';
import amArms from '../assets/audio/music/arms.ogg?url';
import amArmsIntro from '../assets/audio/music/armsIntro.ogg?url';
import amBattle1 from '../assets/audio/music/battle1.ogg?url';
import amBGBeat from '../assets/audio/music/bgbeat.ogg?url';
import amBlookShop from '../assets/audio/music/blookShop.ogg?url';
import amChara from '../assets/audio/music/chara.ogg?url';
import amCharacutscene from '../assets/audio/music/characutscene.ogg?url';
import amConfession from '../assets/audio/music/confession.ogg?url';
import amCore from '../assets/audio/music/core.ogg?url';
import amDatingfight from '../assets/audio/music/datingfight.ogg?url';
import amDatingstart from '../assets/audio/music/datingstart.ogg?url';
import amDatingtense from '../assets/audio/music/datingtense.ogg?url';
import amDJBeat from '../assets/audio/music/djbeat.ogg?url';
import amDogbass from '../assets/audio/music/dogbass.ogg?url';
import amDogbeat from '../assets/audio/music/dogbeat.ogg?url';
import amDogdance from '../assets/audio/music/dogdance.ogg?url';
import amDogebattle from '../assets/audio/music/dogebattle.ogg?url';
import amDogerelax from '../assets/audio/music/dogerelax.ogg?url';
import amDogsigh from '../assets/audio/music/dogsigh.ogg?url';
import amDogsong from '../assets/audio/music/dogsong.ogg?url';
import amDrone from '../assets/audio/music/drone.ogg?url';
import amDummyboss from '../assets/audio/music/dummyboss.ogg?url';
import amEndingexcerptIntro from '../assets/audio/music/endingexcerptIntro.ogg?url';
import amEndingexcerptLoop from '../assets/audio/music/endingexcerptLoop.ogg?url';
import amFactory from '../assets/audio/music/factory.ogg?url';
import amFactoryEmpty from '../assets/audio/music/factoryEmpty.ogg?url';
import amFactoryquiet from '../assets/audio/music/factoryquiet.ogg?url';
import amFactoryquietEmpty from '../assets/audio/music/factoryquietEmpty.ogg?url';
import amTwinkly from '../assets/audio/music/flowey.ogg?url';
import amForthefans from '../assets/audio/music/forthefans.ogg?url';
import amGameover from '../assets/audio/music/gameover.ogg?url';
import amGameshow from '../assets/audio/music/gameshow.ogg?url';
import amGenerator from '../assets/audio/music/generator.ogg?url';
import amGhostbattle from '../assets/audio/music/ghostbattle.ogg?url';
import amGrandfinale from '../assets/audio/music/grandfinale.ogg?url';
import amHome from '../assets/audio/music/home.ogg?url';
import amHomeAlt from '../assets/audio/music/home_alt.ogg?url';
import amHope from '../assets/audio/music/hope.ogg?url';
import amLab from '../assets/audio/music/lab.ogg?url';
import amLegs from '../assets/audio/music/legs.ogg?url';
import amLegsIntro from '../assets/audio/music/legsIntro.ogg?url';
import amLetsflyajetpackwhydontwe from '../assets/audio/music/letsflyajetpackwhydontwe.ogg?url';
import amLetsmakeabombwhydontwe from '../assets/audio/music/letsmakeabombwhydontwe.ogg?url';
import amMall from '../assets/audio/music/mall.ogg?url';
import amMemory from '../assets/audio/music/memory.ogg?url';
import amMenu0 from '../assets/audio/music/menu0.ogg?url';
import amMenu1 from '../assets/audio/music/menu1.ogg?url';
import amMenu2 from '../assets/audio/music/menu2.ogg?url';
import amMenu3 from '../assets/audio/music/menu3.ogg?url';
import amMenu4 from '../assets/audio/music/menu4.ogg?url';
import amMettsuspense from '../assets/audio/music/mettsuspense.ogg?url';
import amMuscle from '../assets/audio/music/muscle.ogg?url';
import amMushroomdance from '../assets/audio/music/mushroomdance.ogg?url';
import amNapstachords from '../assets/audio/music/napstachords.ogg?url';
import amNapstahouse from '../assets/audio/music/napstahouse.ogg?url';
import amOhmy from '../assets/audio/music/ohmy.ogg?url';
import amOpera from '../assets/audio/music/opera.ogg?url';
import amOperaAlt from '../assets/audio/music/opera_alt.ogg?url';
import amOutlands from '../assets/audio/music/outlands.ogg?url';
import amPapyrus from '../assets/audio/music/papyrus.ogg?url';
import amPapyrusboss from '../assets/audio/music/papyrusboss.ogg?url';
import amPrebattle from '../assets/audio/music/prebattle.ogg?url';
import amPredummy from '../assets/audio/music/predummy.ogg?url';
import amPreshock from '../assets/audio/music/preshock.ogg?url';
import amRedacted from '../assets/audio/music/redacted.ogg?url';
import amRise from '../assets/audio/music/rise.ogg?url';
import amSansdate from '../assets/audio/music/sansdate.ogg?url';
import amSecretsong from '../assets/audio/music/secretsong.ogg?url';
import amSexyrectangle from '../assets/audio/music/sexyrectangle.ogg?url';
import amShock from '../assets/audio/music/shock.ogg?url';
import amShop from '../assets/audio/music/shop.ogg?url';
import amSpecatk from '../assets/audio/music/specatk.ogg?url';
import amSpiderboss from '../assets/audio/music/spiderboss.ogg?url';
import amSpiderrelax from '../assets/audio/music/spiderrelax.ogg?url';
import amSplendor from '../assets/audio/music/splendor.ogg?url';
import amSpooktune from '../assets/audio/music/spooktune.ogg?url';
import amSpookwaltz from '../assets/audio/music/spookwaltz.ogg?url';
import amSpookwave from '../assets/audio/music/spookwave.ogg?url';
import amSpookydate from '../assets/audio/music/spookydate.ogg?url';
import amStarton from '../assets/audio/music/starton.ogg?url';
import amStartonEmpty from '../assets/audio/music/startonEmpty.ogg?url';
import amStartonTown from '../assets/audio/music/startonTown.ogg?url';
import amStartonTownEmpty from '../assets/audio/music/startonTownEmpty.ogg?url';
import amStory from '../assets/audio/music/story.ogg?url';
import amTemShop from '../assets/audio/music/temShop.ogg?url';
import amTemmie from '../assets/audio/music/temmie.ogg?url';
import amTension from '../assets/audio/music/tension.ogg?url';
import amThriftShop from '../assets/audio/music/thriftShop.ogg?url';
import amThundersnail from '../assets/audio/music/thundersnail.ogg?url';
import amToriel from '../assets/audio/music/toriel.ogg?url';
import amTorielboss from '../assets/audio/music/torielboss.ogg?url';
import amUndyne from '../assets/audio/music/undyne.ogg?url';
import amUndyneboss from '../assets/audio/music/undyneboss.ogg?url';
import amUndynefast from '../assets/audio/music/undynefast.ogg?url';
import amUndynegeno from '../assets/audio/music/undynegeno.ogg?url';
import amUndynegenoFinal from '../assets/audio/music/undynegenoFinal.ogg?url';
import amUndynegenoStart from '../assets/audio/music/undynegenoStart.ogg?url';
import amUndynepiano from '../assets/audio/music/undynepiano.ogg?url';
import amUndynepre from '../assets/audio/music/undynepre.ogg?url';
import amUndynepreboss from '../assets/audio/music/undynepreboss.ogg?url';
import amUndynepregeno from '../assets/audio/music/undynepregeno.ogg?url';
import amWonder from '../assets/audio/music/wonder.ogg?url';
import amWrongenemy from '../assets/audio/music/wrongenemy.ogg?url';
import amYouscreweduppal from '../assets/audio/music/youscreweduppal.ogg?url';
import asAlphysfix from '../assets/audio/sounds/alphysfix.ogg?url';
import asAppear from '../assets/audio/sounds/appear.ogg?url';
import asApplause from '../assets/audio/sounds/applause.ogg?url';
import asArrow from '../assets/audio/sounds/arrow.ogg?url';
import asBad from '../assets/audio/sounds/bad.ogg?url';
import asBahbye from '../assets/audio/sounds/bahbye.ogg?url';
import asBark from '../assets/audio/sounds/bark.ogg?url';
import asBattlefall from '../assets/audio/sounds/battlefall.ogg?url';
import asBell from '../assets/audio/sounds/bell.ogg?url';
import asBoing from '../assets/audio/sounds/boing.ogg?url';
import asBomb from '../assets/audio/sounds/bomb.ogg?url';
import asBookspin from '../assets/audio/sounds/bookspin.wav?url';
import asBoom from '../assets/audio/sounds/boom.ogg?url';
import asBreak from '../assets/audio/sounds/break.ogg?url';
import asBuhbuhbuhdaadodaa from '../assets/audio/sounds/buhbuhbuhdaadodaa.wav?url';
import asBurst from '../assets/audio/sounds/burst.wav?url';
import asClap from '../assets/audio/sounds/clap.ogg?url';
import asComputer from '../assets/audio/sounds/computer.ogg?url';
import asCrit from '../assets/audio/sounds/crit.wav?url';
import asCymbal from '../assets/audio/sounds/cymbal.ogg?url';
import asDeeploop2 from '../assets/audio/sounds/deeploop2.ogg?url';
import asDephase from '../assets/audio/sounds/dephase.ogg?url';
import asDepower from '../assets/audio/sounds/depower.ogg?url';
import asDimbox from '../assets/audio/sounds/dimbox.ogg?url';
import asDoor from '../assets/audio/sounds/door.ogg?url';
import asDoorClose from '../assets/audio/sounds/doorClose.ogg?url';
import asDrumroll from '../assets/audio/sounds/drumroll.wav?url';
import asDununnn from '../assets/audio/sounds/dununnn.ogg?url';
import asElectrodoor from '../assets/audio/sounds/electrodoor.wav?url';
import asElectrodoorClose from '../assets/audio/sounds/electrodoorClose.wav?url';
import asElevator from '../assets/audio/sounds/elevator.ogg?url';
import asEquip from '../assets/audio/sounds/equip.ogg?url';
import asFear from '../assets/audio/sounds/fear.ogg?url';
import asFrypan from '../assets/audio/sounds/frypan.ogg?url';
import asGlassbreak from '../assets/audio/sounds/glassbreak.wav?url';
import asGonerCharge from '../assets/audio/sounds/goner_charge.ogg?url';
import asGoodbye from '../assets/audio/sounds/goodbye.ogg?url';
import asGrab from '../assets/audio/sounds/grab.ogg?url';
import asGunshot from '../assets/audio/sounds/gunshot.ogg?url';
import asHeal from '../assets/audio/sounds/heal.ogg?url';
import asHeartshot from '../assets/audio/sounds/heartshot.wav?url';
import asHit from '../assets/audio/sounds/hit.wav?url';
import asHurt from '../assets/audio/sounds/hurt.ogg?url';
import asImpact from '../assets/audio/sounds/impact.ogg?url';
import asIndicator from '../assets/audio/sounds/indicator.ogg?url';
import asJetpack from '../assets/audio/sounds/jetpack.ogg?url';
import asKick from '../assets/audio/sounds/kick.ogg?url';
import asKnock from '../assets/audio/sounds/knock.wav?url';
import asLanding from '../assets/audio/sounds/landing.ogg?url';
import asLove from '../assets/audio/sounds/love.ogg?url';
import asMenu from '../assets/audio/sounds/menu.ogg?url';
import asMetapproach from '../assets/audio/sounds/metapproach.wav?url';
import asMonsterHurt1 from '../assets/audio/sounds/monster_hurt1.ogg?url';
import asMonsterHurt2 from '../assets/audio/sounds/monster_hurt2.ogg?url';
import asMonsterHurt3 from '../assets/audio/sounds/monster_hurt3.ogg?url';
import asMonsterHurt4 from '../assets/audio/sounds/monster_hurt4.ogg?url';
import asMultitarget from '../assets/audio/sounds/multitarget.wav?url';
import asMusOhyes from '../assets/audio/sounds/mus_ohyes.ogg?url';
import asNode from '../assets/audio/sounds/node.ogg?url';
import asNoise from '../assets/audio/sounds/noise.ogg?url';
import asNote from '../assets/audio/sounds/note.ogg?url';
import asNotify from '../assets/audio/sounds/notify.ogg?url';
import asOops from '../assets/audio/sounds/oops.ogg?url';
import asOrchhit from '../assets/audio/sounds/orchhit.ogg?url';
import asPathway from '../assets/audio/sounds/pathway.ogg?url';
import asPhase from '../assets/audio/sounds/phase.ogg?url';
import asPhone from '../assets/audio/sounds/phone.ogg?url';
import asPrebomb from '../assets/audio/sounds/prebomb.wav?url';
import asPunch1 from '../assets/audio/sounds/punch1.ogg?url';
import asPunch2 from '../assets/audio/sounds/punch2.ogg?url';
import asPurchase from '../assets/audio/sounds/purchase.ogg?url';
import asSmallelectroshock from '../assets/audio/sounds/quickelectroshock.ogg?url';
import asRetract from '../assets/audio/sounds/retract.ogg?url';
import asRimshot from '../assets/audio/sounds/rimshot.ogg?url';
import asRun from '../assets/audio/sounds/run.ogg?url';
import asRustle from '../assets/audio/sounds/rustle.ogg?url';
import asSaber3 from '../assets/audio/sounds/saber3.wav?url';
import asSave from '../assets/audio/sounds/save.ogg?url';
import asSavior from '../assets/audio/sounds/savior.ogg?url';
import asSelect from '../assets/audio/sounds/select.ogg?url';
import asShake from '../assets/audio/sounds/shake.ogg?url';
import asShakein from '../assets/audio/sounds/shakein.wav?url';
import asShatter from '../assets/audio/sounds/shatter.ogg?url';
import asShock from '../assets/audio/sounds/shock.wav?url';
import asSingBad1 from '../assets/audio/sounds/sing_bad1.wav?url';
import asSingBad2 from '../assets/audio/sounds/sing_bad2.wav?url';
import asSingBad3 from '../assets/audio/sounds/sing_bad3.wav?url';
import asSingBass1 from '../assets/audio/sounds/sing_bass1.wav?url';
import asSingBass2 from '../assets/audio/sounds/sing_bass2.wav?url';
import asSingTreble1 from '../assets/audio/sounds/sing_treble1.wav?url';
import asSingTreble2 from '../assets/audio/sounds/sing_treble2.wav?url';
import asSingTreble3 from '../assets/audio/sounds/sing_treble3.wav?url';
import asSingTreble4 from '../assets/audio/sounds/sing_treble4.wav?url';
import asSingTreble5 from '../assets/audio/sounds/sing_treble5.wav?url';
import asSingTreble6 from '../assets/audio/sounds/sing_treble6.wav?url';
import asSlidewhistle from '../assets/audio/sounds/slidewhistle.wav?url';
import asSparkle from '../assets/audio/sounds/sparkle.wav?url';
import asSpecin from '../assets/audio/sounds/specin.ogg?url';
import asSpecout from '../assets/audio/sounds/specout.ogg?url';
import asSpeed from '../assets/audio/sounds/speed.wav?url';
import asSpiderLaugh from '../assets/audio/sounds/spider_laugh.ogg?url';
import asSplash from '../assets/audio/sounds/splash.ogg?url';
import asSqueak from '../assets/audio/sounds/squeak.ogg?url';
import asStab from '../assets/audio/sounds/stab.ogg?url';
import asStep from '../assets/audio/sounds/step.ogg?url';
import asStomp from '../assets/audio/sounds/stomp.ogg?url';
import asStrike from '../assets/audio/sounds/strike.ogg?url';
import asSuperstrike from '../assets/audio/sounds/superstrike.ogg?url';
import asSwallow from '../assets/audio/sounds/swallow.ogg?url';
import asSwing from '../assets/audio/sounds/swing.ogg?url';
import asSwitch from '../assets/audio/sounds/switch.ogg?url';
import asTextnoise from '../assets/audio/sounds/textnoise.wav?url';
import asTrombone from '../assets/audio/sounds/trombone.ogg?url';
import asTV from '../assets/audio/sounds/tv.ogg?url';
import asTwinklyHurt from '../assets/audio/sounds/twinkly_hurt.ogg?url';
import asTwinklyLaugh from '../assets/audio/sounds/twinkly_laugh.ogg?url';
import asUpgrade from '../assets/audio/sounds/upgrade.ogg?url';
import asWhimper from '../assets/audio/sounds/whimper.ogg?url';
import asWhipcrack from '../assets/audio/sounds/whipcrack.ogg?url';
import asWhoopee from '../assets/audio/sounds/whoopee.ogg?url';
import avAlphys from '../assets/audio/voices/alphys.ogg?url';
import avAsgore from '../assets/audio/voices/asgore.ogg?url';
import avAsriel from '../assets/audio/voices/asriel.ogg?url';
import avAsriel2 from '../assets/audio/voices/asriel2.ogg?url';
import avAsriel3 from '../assets/audio/voices/asriel3.ogg?url';
import avAsriel4 from '../assets/audio/voices/asriel4.ogg?url';
import avKidd from '../assets/audio/voices/kidd.ogg?url';
import avMettaton1 from '../assets/audio/voices/mettaton1.ogg?url';
import avMettaton2 from '../assets/audio/voices/mettaton2.ogg?url';
import avMettaton3 from '../assets/audio/voices/mettaton3.ogg?url';
import avMettaton4 from '../assets/audio/voices/mettaton4.ogg?url';
import avMettaton5 from '../assets/audio/voices/mettaton5.ogg?url';
import avMettaton6 from '../assets/audio/voices/mettaton6.ogg?url';
import avMettaton7 from '../assets/audio/voices/mettaton7.ogg?url';
import avMettaton8 from '../assets/audio/voices/mettaton8.ogg?url';
import avMettaton9 from '../assets/audio/voices/mettaton9.ogg?url';
import avNapstablook from '../assets/audio/voices/napstablook.ogg?url';
import avNarrator from '../assets/audio/voices/narrator.ogg?url';
import avPapyrus from '../assets/audio/voices/papyrus.ogg?url';
import avSans from '../assets/audio/voices/sans.ogg?url';
import avSoriel from '../assets/audio/voices/soriel.wav?url';
import avStoryteller from '../assets/audio/voices/storyteller.ogg?url';
import avTem1 from '../assets/audio/voices/tem1.ogg?url';
import avTem2 from '../assets/audio/voices/tem2.ogg?url';
import avTem3 from '../assets/audio/voices/tem3.ogg?url';
import avTem4 from '../assets/audio/voices/tem4.ogg?url';
import avTem5 from '../assets/audio/voices/tem5.ogg?url';
import avTem6 from '../assets/audio/voices/tem6.ogg?url';
import avToriel from '../assets/audio/voices/toriel.ogg?url';
import avTwinkly1 from '../assets/audio/voices/twinkly1.ogg?url';
import avTwinkly2 from '../assets/audio/voices/twinkly2.ogg?url';
import avUndyne from '../assets/audio/voices/undyne.ogg?url';
import avUndyneex from '../assets/audio/voices/undyneex.wav?url';
import backdrop from '../assets/backdrop.json';
import ibBlue$info from '../assets/images/backdrops/blue.json?url';
import ibBlue from '../assets/images/backdrops/blue.png?url';
import ibGalaxy$info from '../assets/images/backdrops/galaxy.json?url';
import ibGalaxy from '../assets/images/backdrops/galaxy.png?url';
import ibGrey$info from '../assets/images/backdrops/grey.json?url';
import ibGrey from '../assets/images/backdrops/grey.png?url';
import ibbArmBullet from '../assets/images/battleBullets/armBullet.png?url';
import ibbArrow$info from '../assets/images/battleBullets/arrow.json?url';
import ibbArrow from '../assets/images/battleBullets/arrow.png?url';
import ibbArrowportal$info from '../assets/images/battleBullets/arrowportal.json?url';
import ibbArrowportal from '../assets/images/battleBullets/arrowportal.png?url';
import ibbAx$info from '../assets/images/battleBullets/ax.json?url';
import ibbAx from '../assets/images/battleBullets/ax.png?url';
import ibbBark from '../assets/images/battleBullets/bark.png?url';
import ibbBigblaster from '../assets/images/battleBullets/bigblaster.png?url';
import ibbBird$info from '../assets/images/battleBullets/bird.json?url';
import ibbBird from '../assets/images/battleBullets/bird.png?url';
import ibbBirdfront$info from '../assets/images/battleBullets/birdfront.json?url';
import ibbBirdfront from '../assets/images/battleBullets/birdfront.png?url';
import ibbBluelightning$info from '../assets/images/battleBullets/bluelightning.json?url';
import ibbBluelightning from '../assets/images/battleBullets/bluelightning.png?url';
import ibbBomb$info from '../assets/images/battleBullets/bomb.json?url';
import ibbBomb from '../assets/images/battleBullets/bomb.png?url';
import ibbBone$info from '../assets/images/battleBullets/bone.json?url';
import ibbBone from '../assets/images/battleBullets/bone.png?url';
import ibbBoxBullet from '../assets/images/battleBullets/boxBullet.png?url';
import ibbBoxBulletUp from '../assets/images/battleBullets/boxBulletUp.png?url';
import ibbBuzzlightning$info from '../assets/images/battleBullets/buzzlightning.json?url';
import ibbBuzzlightning from '../assets/images/battleBullets/buzzlightning.png?url';
import ibbBuzzpillar$info from '../assets/images/battleBullets/buzzpillar.json?url';
import ibbBuzzpillar from '../assets/images/battleBullets/buzzpillar.png?url';
import ibbChasespear from '../assets/images/battleBullets/chasespear.png?url';
import ibbLooxCircle1 from '../assets/images/battleBullets/circle1.png?url';
import ibbLooxCircle2 from '../assets/images/battleBullets/circle2.png?url';
import ibbLooxCircle3 from '../assets/images/battleBullets/circle3.png?url';
import ibbCrosshair from '../assets/images/battleBullets/crosshair.png?url';
import ibbCrossiant from '../assets/images/battleBullets/crossiant.png?url';
import ibbCrossiantOutline from '../assets/images/battleBullets/crossiantOutline.png?url';
import ibbCupcake from '../assets/images/battleBullets/cupcake.png?url';
import ibbCupcakeAttack$info from '../assets/images/battleBullets/cupcakeAttack.json?url';
import ibbCupcakeAttack from '../assets/images/battleBullets/cupcakeAttack.png?url';
import ibbDonut from '../assets/images/battleBullets/donut.png?url';
import ibbDonutOutline from '../assets/images/battleBullets/donutOutline.png?url';
import ibbDummy$info from '../assets/images/battleBullets/dummy.json?url';
import ibbDummy from '../assets/images/battleBullets/dummy.png?url';
import ibbDummyknife from '../assets/images/battleBullets/dummyknife.png?url';
import ibbExBombBlastCore$info from '../assets/images/battleBullets/exBombBlastCore.json?url';
import ibbExBombBlastCore from '../assets/images/battleBullets/exBombBlastCore.png?url';
import ibbExBombBlastRay$info from '../assets/images/battleBullets/exBombBlastRay.json?url';
import ibbExBombBlastRay from '../assets/images/battleBullets/exBombBlastRay.png?url';
import ibbExHeart$info from '../assets/images/battleBullets/exHeart.json?url';
import ibbExHeart from '../assets/images/battleBullets/exHeart.png?url';
import ibbExKiss from '../assets/images/battleBullets/exKiss.png?url';
import ibbExShine$info from '../assets/images/battleBullets/exShine.json?url';
import ibbExShine from '../assets/images/battleBullets/exShine.png?url';
import ibbExTiny1$info from '../assets/images/battleBullets/exTiny1.json?url';
import ibbExTiny1 from '../assets/images/battleBullets/exTiny1.png?url';
import ibbExTiny2$info from '../assets/images/battleBullets/exTiny2.json?url';
import ibbExTiny2 from '../assets/images/battleBullets/exTiny2.png?url';
import ibbExTiny3$info from '../assets/images/battleBullets/exTiny3.json?url';
import ibbExTiny3 from '../assets/images/battleBullets/exTiny3.png?url';
import ibbFeather from '../assets/images/battleBullets/feather.png?url';
import ibbFirebol$info from '../assets/images/battleBullets/firebol.json?url';
import ibbFirebol from '../assets/images/battleBullets/firebol.png?url';
import ibbFroggitFly$info from '../assets/images/battleBullets/frogfly.json?url';
import ibbFroggitFly from '../assets/images/battleBullets/frogfly.png?url';
import ibbFroggitGo from '../assets/images/battleBullets/froglegs.png?url';
import ibbFroggitWarn$info from '../assets/images/battleBullets/frogstar.json?url';
import ibbFroggitWarn from '../assets/images/battleBullets/frogstar.png?url';
import ibbGlitter$info from '../assets/images/battleBullets/glitter.json?url';
import ibbGlitter from '../assets/images/battleBullets/glitter.png?url';
import ibbHat from '../assets/images/battleBullets/hat.png?url';
import ibbHaymaker from '../assets/images/battleBullets/haymaker.png?url';
import ibbHeart$info from '../assets/images/battleBullets/heart.json?url';
import ibbHeart from '../assets/images/battleBullets/heart.png?url';
import ibbLaserEmitter from '../assets/images/battleBullets/laser_emitter.png?url';
import ibbLegBullet from '../assets/images/battleBullets/legBullet.png?url';
import ibbLightning$info from '../assets/images/battleBullets/lightning.json?url';
import ibbLightning from '../assets/images/battleBullets/lightning.png?url';
import ibbLiteralBullet from '../assets/images/battleBullets/literalBullet.png?url';
import ibbLithium$info from '../assets/images/battleBullets/lithium.json?url';
import ibbLithium from '../assets/images/battleBullets/lithium.png?url';
import ibbMeteor$info from '../assets/images/battleBullets/meteor.json?url';
import ibbMeteor from '../assets/images/battleBullets/meteor.png?url';
import ibbMigosp$info from '../assets/images/battleBullets/migosp.json?url';
import ibbMigosp from '../assets/images/battleBullets/migosp.png?url';
import ibbMissile$info from '../assets/images/battleBullets/missile.json?url';
import ibbMissile from '../assets/images/battleBullets/missile.png?url';
import ibbMoon from '../assets/images/battleBullets/moon.png?url';
import ibbMouse$info from '../assets/images/battleBullets/mouse.json?url';
import ibbMouse from '../assets/images/battleBullets/mouse.png?url';
import ibbNeoRocket$info from '../assets/images/battleBullets/neoRocket.json?url';
import ibbNeoRocket from '../assets/images/battleBullets/neoRocket.png?url';
import ibbNeoTiny1$info from '../assets/images/battleBullets/neoTiny1.json?url';
import ibbNeoTiny1 from '../assets/images/battleBullets/neoTiny1.png?url';
import ibbNeoTiny1a$info from '../assets/images/battleBullets/neoTiny1a.json?url';
import ibbNeoTiny1a from '../assets/images/battleBullets/neoTiny1a.png?url';
import ibbNeoTiny2 from '../assets/images/battleBullets/neoTiny2.png?url';
import ibbNote$info from '../assets/images/battleBullets/note.json?url';
import ibbNote from '../assets/images/battleBullets/note.png?url';
import ibbOctagon from '../assets/images/battleBullets/octagon.png?url';
import ibbOrb$info from '../assets/images/battleBullets/orb.json?url';
import ibbOrb from '../assets/images/battleBullets/orb.png?url';
import ibbPaw from '../assets/images/battleBullets/paw.png?url';
import ibbPawInverted from '../assets/images/battleBullets/paw_inverted.png?url';
import ibbPellet from '../assets/images/battleBullets/pellet.png?url';
import ibbPlusSign from '../assets/images/battleBullets/plusSign.png?url';
import ibbPomSad from '../assets/images/battleBullets/pomSad.png?url';
import ibbPomBark from '../assets/images/battleBullets/pombark.png?url';
import ibbPomBarkSad from '../assets/images/battleBullets/pombarkSad.png?url';
import ibbPomJump from '../assets/images/battleBullets/pomjump.png?url';
import ibbPomSleep$info from '../assets/images/battleBullets/pomsleep.json?url';
import ibbPomSleep from '../assets/images/battleBullets/pomsleep.png?url';
import ibbPomWag$info from '../assets/images/battleBullets/pomwag.json?url';
import ibbPomWag from '../assets/images/battleBullets/pomwag.png?url';
import ibbPomWake$info from '../assets/images/battleBullets/pomwake.json?url';
import ibbPomWake from '../assets/images/battleBullets/pomwake.png?url';
import ibbPomWalk$info from '../assets/images/battleBullets/pomwalk.json?url';
import ibbPomWalk from '../assets/images/battleBullets/pomwalk.png?url';
import ibbPyropebom from '../assets/images/battleBullets/pyropebom.png?url';
import ibbPyropebomb$info from '../assets/images/battleBullets/pyropebomb.json?url';
import ibbPyropebomb from '../assets/images/battleBullets/pyropebomb.png?url';
import ibbPyropefire$info from '../assets/images/battleBullets/pyropefire.json?url';
import ibbPyropefire from '../assets/images/battleBullets/pyropefire.png?url';
import ibbRedspear from '../assets/images/battleBullets/redspear.png?url';
import ibbRoachfly$info from '../assets/images/battleBullets/roachfly.json?url';
import ibbRoachfly from '../assets/images/battleBullets/roachfly.png?url';
import ibbRope from '../assets/images/battleBullets/rope.png?url';
import ibbScribble$info from '../assets/images/battleBullets/scribble.json?url';
import ibbScribble from '../assets/images/battleBullets/scribble.png?url';
import ibbShield$info from '../assets/images/battleBullets/shield.json?url';
import ibbShield from '../assets/images/battleBullets/shield.png?url';
import ibbSoap from '../assets/images/battleBullets/soap.png?url';
import ibbSpear$info from '../assets/images/battleBullets/spear.json?url';
import ibbSpear from '../assets/images/battleBullets/spear.png?url';
import ibbSpearBlue$info from '../assets/images/battleBullets/spearBlue.json?url';
import ibbSpearBlue from '../assets/images/battleBullets/spearBlue.png?url';
import ibbSpecatk$info from '../assets/images/battleBullets/specatk.json?url';
import ibbSpecatk from '../assets/images/battleBullets/specatk.png?url';
import ibbSpecatkBone from '../assets/images/battleBullets/specatkBone.png?url';
import ibbSpider from '../assets/images/battleBullets/spider.png?url';
import ibbSpiderOutline from '../assets/images/battleBullets/spiderOutline.png?url';
import ibbStardrop from '../assets/images/battleBullets/stardrop.png?url';
import ibbStarfly$info from '../assets/images/battleBullets/starfly.json?url';
import ibbStarfly from '../assets/images/battleBullets/starfly.png?url';
import ibbSword from '../assets/images/battleBullets/sword.png?url';
import ibbTear from '../assets/images/battleBullets/tear.png?url';
import ibbTheMoves$info from '../assets/images/battleBullets/theMoves.json?url';
import ibbTheMoves from '../assets/images/battleBullets/theMoves.png?url';
import ibbTiparrow from '../assets/images/battleBullets/tiparrow.png?url';
import ibbVertship$info from '../assets/images/battleBullets/vertship.json?url';
import ibbVertship from '../assets/images/battleBullets/vertship.png?url';
import ibbWarningreticle$info from '../assets/images/battleBullets/warningreticle.json?url';
import ibbWarningreticle from '../assets/images/battleBullets/warningreticle.png?url';
import ibbWater$info from '../assets/images/battleBullets/water.json?url';
import ibbWater from '../assets/images/battleBullets/water.png?url';
import ibbWave$info from '../assets/images/battleBullets/wave.json?url';
import ibbWave from '../assets/images/battleBullets/wave.png?url';
import ibbWorm$info from '../assets/images/battleBullets/worm.json?url';
import ibbWorm from '../assets/images/battleBullets/worm.png?url';
import ibbYarn$info from '../assets/images/battleBullets/yarn.json?url';
import ibbYarn from '../assets/images/battleBullets/yarn.png?url';
import ibcAlphysBody$info from '../assets/images/battleCharacters/alphys/body.json?url';
import ibcAlphysBody from '../assets/images/battleCharacters/alphys/body.png?url';
import ibcAlphysHead$info from '../assets/images/battleCharacters/alphys/head.json?url';
import ibcAlphysHead from '../assets/images/battleCharacters/alphys/head.png?url';
import ibcAsgoreStatic$info from '../assets/images/battleCharacters/asgore/static.json?url';
import ibcAsgoreStatic from '../assets/images/battleCharacters/asgore/static.png?url';
import ibcAsrielAssist from '../assets/images/battleCharacters/asriel/assist.png?url';
import ibcAsrielCutscene1$info from '../assets/images/battleCharacters/asriel/cutscene1.json?url';
import ibcAsrielCutscene1 from '../assets/images/battleCharacters/asriel/cutscene1.png?url';
import ibcAsrielCutscene2$info from '../assets/images/battleCharacters/asriel/cutscene2.json?url';
import ibcAsrielCutscene2 from '../assets/images/battleCharacters/asriel/cutscene2.png?url';
import ibcAsrielMagic from '../assets/images/battleCharacters/asriel/magic.png?url';
import ibcAstigmatismArm from '../assets/images/battleCharacters/astigmatism/arm.png?url';
import ibcAstigmatismBody$info from '../assets/images/battleCharacters/astigmatism/body.json?url';
import ibcAstigmatismBody from '../assets/images/battleCharacters/astigmatism/body.png?url';
import ibcAstigmatismHurt from '../assets/images/battleCharacters/astigmatism/hurt.png?url';
import ibcAstigmatismLeg from '../assets/images/battleCharacters/astigmatism/leg.png?url';
import ibcBurgerpantsBody$info from '../assets/images/battleCharacters/burgerpants/body.json?url';
import ibcBurgerpantsBody from '../assets/images/battleCharacters/burgerpants/body.png?url';
import ibcDoge$info from '../assets/images/battleCharacters/doge/doge.json?url';
import ibcDoge from '../assets/images/battleCharacters/doge/doge.png?url';
import ibcDogeHurt from '../assets/images/battleCharacters/doge/dogeHurt.png?url';
import ibcDogeSpear$info from '../assets/images/battleCharacters/doge/dogeSpear.json?url';
import ibcDogeSpear from '../assets/images/battleCharacters/doge/dogeSpear.png?url';
import ibcDogeTail$info from '../assets/images/battleCharacters/doge/dogeTail.json?url';
import ibcDogeTail from '../assets/images/battleCharacters/doge/dogeTail.png?url';
import ibcDoggoArms from '../assets/images/battleCharacters/doggo/arms.png?url';
import ibcDoggoBody from '../assets/images/battleCharacters/doggo/body.png?url';
import ibcDoggoBodyHurt from '../assets/images/battleCharacters/doggo/bodyHurt.png?url';
import ibcDoggoHead$info from '../assets/images/battleCharacters/doggo/head.json?url';
import ibcDoggoHead from '../assets/images/battleCharacters/doggo/head.png?url';
import ibcDoggoHeadWan$info from '../assets/images/battleCharacters/doggo/headWan.json?url';
import ibcDoggoHeadWan from '../assets/images/battleCharacters/doggo/headWan.png?url';
import ibcDogsAxe from '../assets/images/battleCharacters/dogs/axe.png?url';
import ibcDogsDogamy$info from '../assets/images/battleCharacters/dogs/dogamy.json?url';
import ibcDogsDogamy from '../assets/images/battleCharacters/dogs/dogamy.png?url';
import ibcDogsDogamyHurt from '../assets/images/battleCharacters/dogs/dogamyHurt.png?url';
import ibcDogsDogaressa$info from '../assets/images/battleCharacters/dogs/dogaressa.json?url';
import ibcDogsDogaressa from '../assets/images/battleCharacters/dogs/dogaressa.png?url';
import ibcDogsDogaressaHurt from '../assets/images/battleCharacters/dogs/dogaressaHurt.png?url';
import ibcDummyDefeated from '../assets/images/battleCharacters/dummy/defeated.png?url';
import ibcDummy from '../assets/images/battleCharacters/dummy/dummy.png?url';
import ibcDummyMadBase from '../assets/images/battleCharacters/dummy/dummyMadBase.png?url';
import ibcDummyMadBody from '../assets/images/battleCharacters/dummy/dummyMadBody.png?url';
import ibcDummyMadHead$info from '../assets/images/battleCharacters/dummy/dummyMadHead.json?url';
import ibcDummyMadHead from '../assets/images/battleCharacters/dummy/dummyMadHead.png?url';
import ibcDummyMadTorso from '../assets/images/battleCharacters/dummy/dummyMadTorso.png?url';
import ibcDummyGlad from '../assets/images/battleCharacters/dummy/glad.png?url';
import ibcDummyGladHugged from '../assets/images/battleCharacters/dummy/gladHugged.png?url';
import ibcDummyHugged from '../assets/images/battleCharacters/dummy/hugged.png?url';
import ibcDummyShock from '../assets/images/battleCharacters/dummy/shock.png?url';
import ibcFakeFroggit$info from '../assets/images/battleCharacters/froggit/body.json?url';
import ibcFakeFroggit from '../assets/images/battleCharacters/froggit/body.png?url';
import ibcFroggitDefeated from '../assets/images/battleCharacters/froggit/gone.png?url';
import ibcFroggitHead$info from '../assets/images/battleCharacters/froggit/head.json?url';
import ibcFroggitHead from '../assets/images/battleCharacters/froggit/head.png?url';
import ibcFroggitLegs$info from '../assets/images/battleCharacters/froggit/legs.json?url';
import ibcFroggitLegs from '../assets/images/battleCharacters/froggit/legs.png?url';
import ibcFroggitexDefeated from '../assets/images/battleCharacters/froggitex/gone.png?url';
import ibcFroggitexHead$info from '../assets/images/battleCharacters/froggitex/head.json?url';
import ibcFroggitexHead from '../assets/images/battleCharacters/froggitex/head.png?url';
import ibcFroggitexLegs$info from '../assets/images/battleCharacters/froggitex/legs.json?url';
import ibcFroggitexLegs from '../assets/images/battleCharacters/froggitex/legs.png?url';
import ibcGlydeAntenna from '../assets/images/battleCharacters/glyde/antenna.png?url';
import ibcGlydeBody$info from '../assets/images/battleCharacters/glyde/body.json?url';
import ibcGlydeBody from '../assets/images/battleCharacters/glyde/body.png?url';
import ibcGlydeHurt$info from '../assets/images/battleCharacters/glyde/hurt.json?url';
import ibcGlydeHurt from '../assets/images/battleCharacters/glyde/hurt.png?url';
import ibcGlydeWingLeft from '../assets/images/battleCharacters/glyde/wingLeft.png?url';
import ibcGlydeWingRight from '../assets/images/battleCharacters/glyde/wingRight.png?url';
import ibcGreatdog$info from '../assets/images/battleCharacters/greatdog/greatdog.json?url';
import ibcGreatdog from '../assets/images/battleCharacters/greatdog/greatdog.png?url';
import ibcGreatdogSleep from '../assets/images/battleCharacters/greatdog/greatdogSleep.png?url';
import ibcJerryHurt from '../assets/images/battleCharacters/jerry/hurt.png?url';
import ibcJerry$info from '../assets/images/battleCharacters/jerry/main.json?url';
import ibcJerry from '../assets/images/battleCharacters/jerry/main.png?url';
import ibcKiddBody$info from '../assets/images/battleCharacters/kidd/body.json?url';
import ibcKiddBody from '../assets/images/battleCharacters/kidd/body.png?url';
import ibcKnightknightArmball$info from '../assets/images/battleCharacters/knightknight/armball.json?url';
import ibcKnightknightArmball from '../assets/images/battleCharacters/knightknight/armball.png?url';
import ibcKnightknightArmstaff from '../assets/images/battleCharacters/knightknight/armstaff.png?url';
import ibcKnightknightBase from '../assets/images/battleCharacters/knightknight/base.png?url';
import ibcKnightknightDragonfur$info from '../assets/images/battleCharacters/knightknight/dragonfur.json?url';
import ibcKnightknightDragonfur from '../assets/images/battleCharacters/knightknight/dragonfur.png?url';
import ibcKnightknightEyes$info from '../assets/images/battleCharacters/knightknight/eyes.json?url';
import ibcKnightknightEyes from '../assets/images/battleCharacters/knightknight/eyes.png?url';
import ibcKnightknightHeadpiece$info from '../assets/images/battleCharacters/knightknight/headpiece.json?url';
import ibcKnightknightHeadpiece from '../assets/images/battleCharacters/knightknight/headpiece.png?url';
import ibcKnightknightHurt from '../assets/images/battleCharacters/knightknight/hurt.png?url';
import ibcKnightknightMouthpiece$info from '../assets/images/battleCharacters/knightknight/mouthpiece.json?url';
import ibcKnightknightMouthpiece from '../assets/images/battleCharacters/knightknight/mouthpiece.png?url';
import ibcLesserBody$info from '../assets/images/battleCharacters/lesserdog/body.json?url';
import ibcLesserBody from '../assets/images/battleCharacters/lesserdog/body.png?url';
import ibcLesserHead$info from '../assets/images/battleCharacters/lesserdog/head.json?url';
import ibcLesserHead from '../assets/images/battleCharacters/lesserdog/head.png?url';
import ibcLesserHurt$info from '../assets/images/battleCharacters/lesserdog/hurt.json?url';
import ibcLesserHurt from '../assets/images/battleCharacters/lesserdog/hurt.png?url';
import ibcLesserHurtHead$info from '../assets/images/battleCharacters/lesserdog/hurtHead.json?url';
import ibcLesserHurtHead from '../assets/images/battleCharacters/lesserdog/hurtHead.png?url';
import ibcLesserTail$info from '../assets/images/battleCharacters/lesserdog/tail.json?url';
import ibcLesserTail from '../assets/images/battleCharacters/lesserdog/tail.png?url';
import ibcLoox$info from '../assets/images/battleCharacters/loox/body.json?url';
import ibcLoox from '../assets/images/battleCharacters/loox/body.png?url';
import ibcLooxDefeated from '../assets/images/battleCharacters/loox/hit.png?url';
import ibcMadjickBoot from '../assets/images/battleCharacters/madjick/boot.png?url';
import ibcMadjickCape from '../assets/images/battleCharacters/madjick/cape.png?url';
import ibcMadjickDress from '../assets/images/battleCharacters/madjick/dress.png?url';
import ibcMadjickHat from '../assets/images/battleCharacters/madjick/hat.png?url';
import ibcMadjickHead from '../assets/images/battleCharacters/madjick/head.png?url';
import ibcMadjickLapel from '../assets/images/battleCharacters/madjick/lapel.png?url';
import ibcMadjickHurt from '../assets/images/battleCharacters/madjick/hurt.png?url';
import ibcMettatonArmsBruh$info from '../assets/images/battleCharacters/mettaton/armsBruh.json?url';
import ibcMettatonArmsBruh from '../assets/images/battleCharacters/mettaton/armsBruh.png?url';
import ibcMettatonArmsNoticard$info from '../assets/images/battleCharacters/mettaton/armsNoticard.json?url';
import ibcMettatonArmsNoticard from '../assets/images/battleCharacters/mettaton/armsNoticard.png?url';
import ibcMettatonArmsThonk$info from '../assets/images/battleCharacters/mettaton/armsThonk.json?url';
import ibcMettatonArmsThonk from '../assets/images/battleCharacters/mettaton/armsThonk.png?url';
import ibcMettatonArmsWelcome$info from '../assets/images/battleCharacters/mettaton/armsWelcome.json?url';
import ibcMettatonArmsWelcome from '../assets/images/battleCharacters/mettaton/armsWelcome.png?url';
import ibcMettatonArmsWelcomeBack$info from '../assets/images/battleCharacters/mettaton/armsWelcomeBack.json?url';
import ibcMettatonArmsWelcomeBack from '../assets/images/battleCharacters/mettaton/armsWelcomeBack.png?url';
import ibcMettatonArmsWhaaat$info from '../assets/images/battleCharacters/mettaton/armsWhaaat.json?url';
import ibcMettatonArmsWhaaat from '../assets/images/battleCharacters/mettaton/armsWhaaat.png?url';
import ibcMettatonArmsWhatevs$info from '../assets/images/battleCharacters/mettaton/armsWhatevs.json?url';
import ibcMettatonArmsWhatevs from '../assets/images/battleCharacters/mettaton/armsWhatevs.png?url';
import ibcMettatonBody$info from '../assets/images/battleCharacters/mettaton/body.json?url';
import ibcMettatonBody from '../assets/images/battleCharacters/mettaton/body.png?url';
import ibcMettatonBodyBack$info from '../assets/images/battleCharacters/mettaton/bodyBack.json?url';
import ibcMettatonBodyBack from '../assets/images/battleCharacters/mettaton/bodyBack.png?url';
import ibcMettatonBodySOUL$info from '../assets/images/battleCharacters/mettaton/bodySOUL.json?url';
import ibcMettatonBodySOUL from '../assets/images/battleCharacters/mettaton/bodySOUL.png?url';
import ibcMettatonBodyTransform$info from '../assets/images/battleCharacters/mettaton/bodyTransform.json?url';
import ibcMettatonBodyTransform from '../assets/images/battleCharacters/mettaton/bodyTransform.png?url';
import ibcMettatonDjdisco$info from '../assets/images/battleCharacters/mettaton/djdisco.json?url';
import ibcMettatonDjdisco from '../assets/images/battleCharacters/mettaton/djdisco.png?url';
import ibcMettatonDjdiscoInv$info from '../assets/images/battleCharacters/mettaton/djdiscoInv.json?url';
import ibcMettatonDjdiscoInv from '../assets/images/battleCharacters/mettaton/djdiscoInv.png?url';
import ibcMettatonExArm$info from '../assets/images/battleCharacters/mettaton/exArm.json?url';
import ibcMettatonExArm from '../assets/images/battleCharacters/mettaton/exArm.png?url';
import ibcMettatonExBody$info from '../assets/images/battleCharacters/mettaton/exBody.json?url';
import ibcMettatonExBody from '../assets/images/battleCharacters/mettaton/exBody.png?url';
import ibcMettatonExBodyHeart$info from '../assets/images/battleCharacters/mettaton/exBodyHeart.json?url';
import ibcMettatonExBodyHeart from '../assets/images/battleCharacters/mettaton/exBodyHeart.png?url';
import ibcMettatonExFace$info from '../assets/images/battleCharacters/mettaton/exFace.json?url';
import ibcMettatonExFace from '../assets/images/battleCharacters/mettaton/exFace.png?url';
import ibcMettatonExLeg$info from '../assets/images/battleCharacters/mettaton/exLeg.json?url';
import ibcMettatonExLeg from '../assets/images/battleCharacters/mettaton/exLeg.png?url';
import ibcMettatonExStarburst from '../assets/images/battleCharacters/mettaton/exStarburst.png?url';
import ibcMettatonFlyawaymyroboticfriend$info from '../assets/images/battleCharacters/mettaton/flyawaymyroboticfriend.json?url';
import ibcMettatonFlyawaymyroboticfriend from '../assets/images/battleCharacters/mettaton/flyawaymyroboticfriend.png?url';
import ibcMettatonHappybreaktime from '../assets/images/battleCharacters/mettaton/happybreaktime.png?url';
import ibcMettatonNeoArm1 from '../assets/images/battleCharacters/mettaton/neoArm1.png?url';
import ibcMettatonNeoArm2 from '../assets/images/battleCharacters/mettaton/neoArm2.png?url';
import ibcMettatonNeoBody$info from '../assets/images/battleCharacters/mettaton/neoBody.json?url';
import ibcMettatonNeoBody from '../assets/images/battleCharacters/mettaton/neoBody.png?url';
import ibcMettatonNeoHead$info from '../assets/images/battleCharacters/mettaton/neoHead.json?url';
import ibcMettatonNeoHead from '../assets/images/battleCharacters/mettaton/neoHead.png?url';
import ibcMettatonNeoHeart$info from '../assets/images/battleCharacters/mettaton/neoHeart.json?url';
import ibcMettatonNeoHeart from '../assets/images/battleCharacters/mettaton/neoHeart.png?url';
import ibcMettatonNeoLegs from '../assets/images/battleCharacters/mettaton/neoLegs.png?url';
import ibcMettatonNeoWings from '../assets/images/battleCharacters/mettaton/neoWings.png?url';
import ibcMettatonQuizbutton$info from '../assets/images/battleCharacters/mettaton/quizbutton.json?url';
import ibcMettatonQuizbutton from '../assets/images/battleCharacters/mettaton/quizbutton.png?url';
import ibcMettatonRecbox$info from '../assets/images/battleCharacters/mettaton/recbox.json?url';
import ibcMettatonRecbox from '../assets/images/battleCharacters/mettaton/recbox.png?url';
import ibcMettatonRocket$info from '../assets/images/battleCharacters/mettaton/rocket.json?url';
import ibcMettatonRocket from '../assets/images/battleCharacters/mettaton/rocket.png?url';
import ibcMettatonWheel from '../assets/images/battleCharacters/mettaton/wheel.png?url';
import ibcMigospHappi$info from '../assets/images/battleCharacters/migosp/happi.json?url';
import ibcMigospHappi from '../assets/images/battleCharacters/migosp/happi.png?url';
import ibcMigospDefeated from '../assets/images/battleCharacters/migosp/hit.png?url';
import ibcMigosp$info from '../assets/images/battleCharacters/migosp/migosp.json?url';
import ibcMigosp from '../assets/images/battleCharacters/migosp/migosp.png?url';
import ibcMigospel$info from '../assets/images/battleCharacters/migospel/migospel.json?url';
import ibcMigospel from '../assets/images/battleCharacters/migospel/migospel.png?url';
import ibcMigospelHappi$info from '../assets/images/battleCharacters/migospel/migospelHappi.json?url';
import ibcMigospelHappi from '../assets/images/battleCharacters/migospel/migospelHappi.png?url';
import ibcMigospelHurt from '../assets/images/battleCharacters/migospel/migospelHurt.png?url';
import ibcMigospelLegs from '../assets/images/battleCharacters/migospel/migospelLegs.png?url';
import ibcMoldbyggHead$info from '../assets/images/battleCharacters/moldbygg/head.json?url';
import ibcMoldbyggHead from '../assets/images/battleCharacters/moldbygg/head.png?url';
import ibcMoldbyggPart from '../assets/images/battleCharacters/moldbygg/part.png?url';
import ibcMoldsmal from '../assets/images/battleCharacters/moldsmal/moldsmal.png?url';
import ibcMouseBody from '../assets/images/battleCharacters/mouse/body.png?url';
import ibcMouse$info from '../assets/images/battleCharacters/mouse/head.json?url';
import ibcMouse from '../assets/images/battleCharacters/mouse/head.png?url';
import ibcMouseHurt from '../assets/images/battleCharacters/mouse/hurt.png?url';
import ibcMuffetArm1$info from '../assets/images/battleCharacters/muffet/arm1.json?url';
import ibcMuffetArm1 from '../assets/images/battleCharacters/muffet/arm1.png?url';
import ibcMuffetArm2a from '../assets/images/battleCharacters/muffet/arm2a.png?url';
import ibcMuffetArm2b from '../assets/images/battleCharacters/muffet/arm2b.png?url';
import ibcMuffetArm3 from '../assets/images/battleCharacters/muffet/arm3.png?url';
import ibcMuffetCupcake$info from '../assets/images/battleCharacters/muffet/cupcake.json?url';
import ibcMuffetCupcake from '../assets/images/battleCharacters/muffet/cupcake.png?url';
import ibcMuffetDustrus from '../assets/images/battleCharacters/muffet/dustrus.png?url';
import ibcMuffetEye1$info from '../assets/images/battleCharacters/muffet/eye1.json?url';
import ibcMuffetEye1 from '../assets/images/battleCharacters/muffet/eye1.png?url';
import ibcMuffetEye2$info from '../assets/images/battleCharacters/muffet/eye2.json?url';
import ibcMuffetEye2 from '../assets/images/battleCharacters/muffet/eye2.png?url';
import ibcMuffetEye3$info from '../assets/images/battleCharacters/muffet/eye3.json?url';
import ibcMuffetEye3 from '../assets/images/battleCharacters/muffet/eye3.png?url';
import ibcMuffetHair from '../assets/images/battleCharacters/muffet/hair.png?url';
import ibcMuffetHead from '../assets/images/battleCharacters/muffet/head.png?url';
import ibcMuffetHurt from '../assets/images/battleCharacters/muffet/hurt.png?url';
import ibcMuffetLegs from '../assets/images/battleCharacters/muffet/legs.png?url';
import ibcMuffetPants from '../assets/images/battleCharacters/muffet/pants.png?url';
import ibcMuffetShirt from '../assets/images/battleCharacters/muffet/shirt.png?url';
import ibcMuffetShoulder from '../assets/images/battleCharacters/muffet/shoulder.png?url';
import ibcMuffetSpider$info from '../assets/images/battleCharacters/muffet/spider.json?url';
import ibcMuffetSpider from '../assets/images/battleCharacters/muffet/spider.png?url';
import ibcMuffetSpiderSign$info from '../assets/images/battleCharacters/muffet/spiderSign.json?url';
import ibcMuffetSpiderSign from '../assets/images/battleCharacters/muffet/spiderSign.png?url';
import ibcMuffetSpiderTelegram from '../assets/images/battleCharacters/muffet/spiderTelegram.png?url';
import ibcMuffetTeapot from '../assets/images/battleCharacters/muffet/teapot.png?url';
import ibcMushketeer from '../assets/images/battleCharacters/mushketeer/body.png?url';
import ibcMushketeerDefeated from '../assets/images/battleCharacters/mushketeer/hurt.png?url';
import ibcMushy from '../assets/images/battleCharacters/mushy/body.png?url';
import ibcMushyDefeated from '../assets/images/battleCharacters/mushy/hit.png?url';
import ibcNapstablook$info from '../assets/images/battleCharacters/napstablook/battle.json?url';
import ibcNapstablook from '../assets/images/battleCharacters/napstablook/battle.png?url';
import ibcNapstablookLookdeath$info from '../assets/images/battleCharacters/napstablook/battleLookdeath.json?url';
import ibcNapstablookLookdeath from '../assets/images/battleCharacters/napstablook/battleLookdeath.png?url';
import ibcNapstablookLookdown$info from '../assets/images/battleCharacters/napstablook/battleLookdown.json?url';
import ibcNapstablookLookdown from '../assets/images/battleCharacters/napstablook/battleLookdown.png?url';
import ibcNapstablookLookforward$info from '../assets/images/battleCharacters/napstablook/battleLookforward.json?url';
import ibcNapstablookLookforward from '../assets/images/battleCharacters/napstablook/battleLookforward.png?url';
import ibcNapstaHat$info from '../assets/images/battleCharacters/napstablook/hat.json?url';
import ibcNapstaHat from '../assets/images/battleCharacters/napstablook/hat.png?url';
import ibcNapstaSad from '../assets/images/battleCharacters/napstablook/sad.png?url';
import ibcPapyrusBattle$info from '../assets/images/battleCharacters/papyrus/battle.json?url';
import ibcPapyrusBattle from '../assets/images/battleCharacters/papyrus/battle.png?url';
import ibcPapyrusBattleBlackoutA$info from '../assets/images/battleCharacters/papyrus/battleBlackoutA.json?url';
import ibcPapyrusBattleBlackoutA from '../assets/images/battleCharacters/papyrus/battleBlackoutA.png?url';
import ibcPapyrusBattleBlackoutB$info from '../assets/images/battleCharacters/papyrus/battleBlackoutB.json?url';
import ibcPapyrusBattleBlackoutB from '../assets/images/battleCharacters/papyrus/battleBlackoutB.png?url';
import ibcPapyrusBattleOpen$info from '../assets/images/battleCharacters/papyrus/battleOpen.json?url';
import ibcPapyrusBattleOpen from '../assets/images/battleCharacters/papyrus/battleOpen.png?url';
import ibcPapyrusCoolHat from '../assets/images/battleCharacters/papyrus/coolhat.png?url';
import ibcPapyrusDateOMG$info from '../assets/images/battleCharacters/papyrus/dateOMG.json?url';
import ibcPapyrusDateOMG from '../assets/images/battleCharacters/papyrus/dateOMG.png?url';
import ibcPapyrusDateRead$info from '../assets/images/battleCharacters/papyrus/dateRead.json?url';
import ibcPapyrusDateRead from '../assets/images/battleCharacters/papyrus/dateRead.png?url';
import ibcPapyrusDateSwipe$info from '../assets/images/battleCharacters/papyrus/dateSwipe.json?url';
import ibcPapyrusDateSwipe from '../assets/images/battleCharacters/papyrus/dateSwipe.png?url';
import ibcPapyrusBattleHeadless from '../assets/images/battleCharacters/papyrus/headless.png?url';
import ibcPapyrusSecretStyle$info from '../assets/images/battleCharacters/papyrus/secretStyle.json?url';
import ibcPapyrusSecretStyle from '../assets/images/battleCharacters/papyrus/secretStyle.png?url';
import ibcPapyrusSpagBox$info from '../assets/images/battleCharacters/papyrus/spagbox.json?url';
import ibcPapyrusSpagBox from '../assets/images/battleCharacters/papyrus/spagbox.png?url';
import ibcPerigeeBody$info from '../assets/images/battleCharacters/perigee/body.json?url';
import ibcPerigeeBody from '../assets/images/battleCharacters/perigee/body.png?url';
import ibcPerigeeHurt from '../assets/images/battleCharacters/perigee/hurt.png?url';
import ibcPyropeDrip from '../assets/images/battleCharacters/pyrope/drip.png?url';
import ibcPyropeHead$info from '../assets/images/battleCharacters/pyrope/head.json?url';
import ibcPyropeHead from '../assets/images/battleCharacters/pyrope/head.png?url';
import ibcPyropeHurt from '../assets/images/battleCharacters/pyrope/hurt.png?url';
import ibcPyropeRing$info from '../assets/images/battleCharacters/pyrope/ring.json?url';
import ibcPyropeRing from '../assets/images/battleCharacters/pyrope/ring.png?url';
import ibcRadtile$info from '../assets/images/battleCharacters/radtile/radtile.json?url';
import ibcRadtile from '../assets/images/battleCharacters/radtile/radtile.png?url';
import ibcRadtileHurt from '../assets/images/battleCharacters/radtile/radtileHurt.png?url';
import ibcRadtileTail$info from '../assets/images/battleCharacters/radtile/radtileTail.json?url';
import ibcRadtileTail from '../assets/images/battleCharacters/radtile/radtileTail.png?url';
import ibcRGBall from '../assets/images/battleCharacters/royalguard/ball.png?url';
import ibcRGBugFist from '../assets/images/battleCharacters/royalguard/bugFist.png?url';
import ibcRGBugHead from '../assets/images/battleCharacters/royalguard/bugHead.png?url';
import ibcRGBugHurt from '../assets/images/battleCharacters/royalguard/bugHurt.png?url';
import ibcRGCatFist from '../assets/images/battleCharacters/royalguard/catFist.png?url';
import ibcRGCatHead from '../assets/images/battleCharacters/royalguard/catHead.png?url';
import ibcRGCatHurt from '../assets/images/battleCharacters/royalguard/catHurt.png?url';
import ibcRGChestplate$info from '../assets/images/battleCharacters/royalguard/chestplate.json?url';
import ibcRGChestplate from '../assets/images/battleCharacters/royalguard/chestplate.png?url';
import ibcRGFalchion from '../assets/images/battleCharacters/royalguard/falchion.png?url';
import ibcRGFist from '../assets/images/battleCharacters/royalguard/fist.png?url';
import ibcRGLegs from '../assets/images/battleCharacters/royalguard/legs.png?url';
import ibcRGShoes from '../assets/images/battleCharacters/royalguard/shoes.png?url';
import ibcRGSweat from '../assets/images/battleCharacters/royalguard/sweat.png?url';
import ibcSansDeath$info from '../assets/images/battleCharacters/sans/death.json?url';
import ibcSansDeath from '../assets/images/battleCharacters/sans/death.png?url';
import ibcShyrenAgent$info from '../assets/images/battleCharacters/shyren/battleAgent.json?url';
import ibcShyrenAgent from '../assets/images/battleCharacters/shyren/battleAgent.png?url';
import ibcShyrenBack$info from '../assets/images/battleCharacters/shyren/battleBack.json?url';
import ibcShyrenBack from '../assets/images/battleCharacters/shyren/battleBack.png?url';
import ibcShyrenFront$info from '../assets/images/battleCharacters/shyren/battleFront.json?url';
import ibcShyrenFront from '../assets/images/battleCharacters/shyren/battleFront.png?url';
import ibcShyrenHurt from '../assets/images/battleCharacters/shyren/battleHurt.png?url';
import ibcShyrenWave$info from '../assets/images/battleCharacters/shyren/battleWave.json?url';
import ibcShyrenWave from '../assets/images/battleCharacters/shyren/battleWave.png?url';
import ibcSpacetopCrystal from '../assets/images/battleCharacters/spacetop/crystal.png?url';
import ibcSpacetopHurt from '../assets/images/battleCharacters/spacetop/hurt.png?url';
import ibcSpacetop$info from '../assets/images/battleCharacters/spacetop/spacetop.json?url';
import ibcSpacetop from '../assets/images/battleCharacters/spacetop/spacetop.png?url';
import ibcStardrakeBody from '../assets/images/battleCharacters/stardrake/body.png?url';
import ibcStardrakeChilldrake from '../assets/images/battleCharacters/stardrake/chilldrake.png?url';
import ibcStardrakeChilldrakeHurt from '../assets/images/battleCharacters/stardrake/chilldrakeHurt.png?url';
import ibcStardrakeHead$info from '../assets/images/battleCharacters/stardrake/head.json?url';
import ibcStardrakeHead from '../assets/images/battleCharacters/stardrake/head.png?url';
import ibcStardrakeHurt from '../assets/images/battleCharacters/stardrake/hurt.png?url';
import ibcStardrakeLegs from '../assets/images/battleCharacters/stardrake/legs.png?url';
import ibcStardrakeLegsOver from '../assets/images/battleCharacters/stardrake/legsOver.png?url';
import ibcTorielBattle1$info from '../assets/images/battleCharacters/toriel/battle1.json?url';
import ibcTorielBattle1 from '../assets/images/battleCharacters/toriel/battle1.png?url';
import ibcTorielBattle2$info from '../assets/images/battleCharacters/toriel/battle2.json?url';
import ibcTorielBattle2 from '../assets/images/battleCharacters/toriel/battle2.png?url';
import ibcTorielCutscene1$info from '../assets/images/battleCharacters/toriel/cutscene1.json?url';
import ibcTorielCutscene1 from '../assets/images/battleCharacters/toriel/cutscene1.png?url';
import ibcTorielCutscene2$info from '../assets/images/battleCharacters/toriel/cutscene2.json?url';
import ibcTorielCutscene2 from '../assets/images/battleCharacters/toriel/cutscene2.png?url';
import ibcTorielScram$info from '../assets/images/battleCharacters/toriel/scram.json?url';
import ibcTorielScram from '../assets/images/battleCharacters/toriel/scram.png?url';
import ibcTsundereBlush$info from '../assets/images/battleCharacters/tsundere/blush.json?url';
import ibcTsundereBlush from '../assets/images/battleCharacters/tsundere/blush.png?url';
import ibcTsundereBody from '../assets/images/battleCharacters/tsundere/body.png?url';
import ibcTsundereHurt from '../assets/images/battleCharacters/tsundere/hurt.png?url';
import ibcTsundereExhaust from '../assets/images/battleCharacters/tsundere/exhaust.png?url';
import ibcUndyneArm1 from '../assets/images/battleCharacters/undyne/arm1.png?url';
import ibcUndyneArm1Ex from '../assets/images/battleCharacters/undyne/arm1Ex.png?url';
import ibcUndyneArm2 from '../assets/images/battleCharacters/undyne/arm2.png?url';
import ibcUndyneArm2Ex from '../assets/images/battleCharacters/undyne/arm2Ex.png?url';
import ibcUndyneArrow from '../assets/images/battleCharacters/undyne/arrow.png?url';
import ibcUndyneBoots from '../assets/images/battleCharacters/undyne/boots.png?url';
import ibcUndyneBootsEx from '../assets/images/battleCharacters/undyne/bootsEx.png?url';
import ibcUndyneCage from '../assets/images/battleCharacters/undyne/cage.png?url';
import ibcUndyneChestplate from '../assets/images/battleCharacters/undyne/chestplate.png?url';
import ibcUndyneChestplateEx from '../assets/images/battleCharacters/undyne/chestplateEx.png?url';
import ibcUndyneDate from '../assets/images/battleCharacters/undyne/date.png?url';
import ibcUndyneDateArm$info from '../assets/images/battleCharacters/undyne/dateArm.json?url';
import ibcUndyneDateArm from '../assets/images/battleCharacters/undyne/dateArm.png?url';
import ibcUndyneDateLegs from '../assets/images/battleCharacters/undyne/dateLegs.png?url';
import ibcUndyneDateSpear$info from '../assets/images/battleCharacters/undyne/dateSpear.json?url';
import ibcUndyneDateSpear from '../assets/images/battleCharacters/undyne/dateSpear.png?url';
import ibcUndyneDateTorso from '../assets/images/battleCharacters/undyne/dateTorso.png?url';
import ibcUndyneEyebeam from '../assets/images/battleCharacters/undyne/eyebeam.png?url';
import ibcUndyneFatal$info from '../assets/images/battleCharacters/undyne/fatal.json?url';
import ibcUndyneFatal from '../assets/images/battleCharacters/undyne/fatal.png?url';
import ibcUndyneHair$info from '../assets/images/battleCharacters/undyne/hair.json?url';
import ibcUndyneHair from '../assets/images/battleCharacters/undyne/hair.png?url';
import ibcUndyneHairEx$info from '../assets/images/battleCharacters/undyne/hairEx.json?url';
import ibcUndyneHairEx from '../assets/images/battleCharacters/undyne/hairEx.png?url';
import ibcUndyneHead$info from '../assets/images/battleCharacters/undyne/head.json?url';
import ibcUndyneHead from '../assets/images/battleCharacters/undyne/head.png?url';
import ibcUndyneLaugh$info from '../assets/images/battleCharacters/undyne/laugh.json?url';
import ibcUndyneLaugh from '../assets/images/battleCharacters/undyne/laugh.png?url';
import ibcUndyneHurt from '../assets/images/battleCharacters/undyne/main.png?url';
import ibcUndyneHurtEx from '../assets/images/battleCharacters/undyne/mainEx.png?url';
import ibcUndyneHurtPain from '../assets/images/battleCharacters/undyne/mainPain.png?url';
import ibcUndyneHurtSad from '../assets/images/battleCharacters/undyne/mainSad.png?url';
import ibcUndyneNeutralFinal from '../assets/images/battleCharacters/undyne/neutralFinal.png?url';
import ibcUndyneSheath from '../assets/images/battleCharacters/undyne/sheath.png?url';
import ibcUndyneSheathEx from '../assets/images/battleCharacters/undyne/sheathEx.png?url';
import ibcUndyneShield$info from '../assets/images/battleCharacters/undyne/shield.json?url';
import ibcUndyneShield from '../assets/images/battleCharacters/undyne/shield.png?url';
import ibcUndyneShocked from '../assets/images/battleCharacters/undyne/shocked.png?url';
import ibcUndyneSmear$info from '../assets/images/battleCharacters/undyne/smear.json?url';
import ibcUndyneSmear from '../assets/images/battleCharacters/undyne/smear.png?url';
import ibcWhimsalot$info from '../assets/images/battleCharacters/whimsalot/body.json?url';
import ibcWhimsalot from '../assets/images/battleCharacters/whimsalot/body.png?url';
import ibcWhimsalotDefeated from '../assets/images/battleCharacters/whimsalot/hit.png?url';
import ibcWhimsunDefeated from '../assets/images/battleCharacters/whimsun/hit.png?url';
import ibcWhimsun$info from '../assets/images/battleCharacters/whimsun/whimsun.json?url';
import ibcWhimsun from '../assets/images/battleCharacters/whimsun/whimsun.png?url';
import ibcWoshuaBody from '../assets/images/battleCharacters/woshua/body.png?url';
import ibcWoshuaDuck from '../assets/images/battleCharacters/woshua/duck.png?url';
import ibcWoshuaFace from '../assets/images/battleCharacters/woshua/face.png?url';
import ibcWoshuaHanger from '../assets/images/battleCharacters/woshua/hanger.png?url';
import ibcWoshuaHead from '../assets/images/battleCharacters/woshua/head.png?url';
import ibcWoshuaHurt from '../assets/images/battleCharacters/woshua/hurt.png?url';
import ibcWoshuaTail$info from '../assets/images/battleCharacters/woshua/tail.json?url';
import ibcWoshuaTail from '../assets/images/battleCharacters/woshua/tail.png?url';
import ibcWoshuaWater from '../assets/images/battleCharacters/woshua/water.png?url';
import ibuHP from '../assets/images/battleUI/HP.png?url';
import ibuSOUL$info from '../assets/images/battleUI/SOUL.json?url';
import ibuSOUL from '../assets/images/battleUI/SOUL.png?url';
import ibuAct$info from '../assets/images/battleUI/act.json?url';
import ibuAct from '../assets/images/battleUI/act.png?url';
import ibuBlueSOUL$info from '../assets/images/battleUI/blueSOUL.json?url';
import ibuBlueSOUL from '../assets/images/battleUI/blueSOUL.png?url';
import ibuBoot1$info from '../assets/images/battleUI/boot1.json?url';
import ibuBoot1 from '../assets/images/battleUI/boot1.png?url';
import ibuBoot2$info from '../assets/images/battleUI/boot2.json?url';
import ibuBoot2 from '../assets/images/battleUI/boot2.png?url';
import ibuBossSOUL from '../assets/images/battleUI/bossSOUL.png?url';
import ibuBossBreak from '../assets/images/battleUI/bossbreak.png?url';
import ibuBossShatter$info from '../assets/images/battleUI/bossshatter.json?url';
import ibuBossShatter from '../assets/images/battleUI/bossshatter.png?url';
import ibuBreak from '../assets/images/battleUI/break.png?url';
import ibuBubbleDummy from '../assets/images/battleUI/bubbleDummy.png?url';
import ibuBubbleMTT from '../assets/images/battleUI/bubbleMTT.png?url';
import ibuBubbleShock from '../assets/images/battleUI/bubbleShock.png?url';
import ibuBubbleTiny from '../assets/images/battleUI/bubbleTiny.png?url';
import ibuBubbleTwinkly from '../assets/images/battleUI/bubbleTwinkly.png?url';
import ibuCyanReticle from '../assets/images/battleUI/cyanReticle.png?url';
import ibuCyanSOUL$info from '../assets/images/battleUI/cyanSOUL.json?url';
import ibuCyanSOUL from '../assets/images/battleUI/cyanSOUL.png?url';
import ibuDeadeye from '../assets/images/battleUI/deadeye.png?url';
import ibuDefeat from '../assets/images/battleUI/defeat.png?url';
import ibuFight$info from '../assets/images/battleUI/fight.json?url';
import ibuFight from '../assets/images/battleUI/fight.png?url';
import ibuFist1$info from '../assets/images/battleUI/fist1.json?url';
import ibuFist1 from '../assets/images/battleUI/fist1.png?url';
import ibuFist2$info from '../assets/images/battleUI/fist2.json?url';
import ibuFist2 from '../assets/images/battleUI/fist2.png?url';
import ibuFrypan1$info from '../assets/images/battleUI/frypan1.json?url';
import ibuFrypan1 from '../assets/images/battleUI/frypan1.png?url';
import ibuFrypan2 from '../assets/images/battleUI/frypan2.png?url';
import ibuGreenSOUL$info from '../assets/images/battleUI/greenSOUL.json?url';
import ibuGreenSOUL from '../assets/images/battleUI/greenSOUL.png?url';
import ibuGrid1 from '../assets/images/battleUI/grid1.png?url';
import ibuGrid2 from '../assets/images/battleUI/grid2.png?url';
import ibuGrid3 from '../assets/images/battleUI/grid3.png?url';
import ibuGunshot1$info from '../assets/images/battleUI/gunshot1.json?url';
import ibuGunshot1 from '../assets/images/battleUI/gunshot1.png?url';
import ibuGunshot2 from '../assets/images/battleUI/gunshot2.png?url';
import ibuIndicator$info from '../assets/images/battleUI/indicator.json?url';
import ibuIndicator from '../assets/images/battleUI/indicator.png?url';
import ibuItem$info from '../assets/images/battleUI/item.json?url';
import ibuItem from '../assets/images/battleUI/item.png?url';
import ibuMercy$info from '../assets/images/battleUI/mercy.json?url';
import ibuMercy from '../assets/images/battleUI/mercy.png?url';
import ibuMercyDud from '../assets/images/battleUI/mercydud.png?url';
import ibuNotebook from '../assets/images/battleUI/notebook.png?url';
import ibuNotify$info from '../assets/images/battleUI/notify.json?url';
import ibuNotify from '../assets/images/battleUI/notify.png?url';
import ibuOrangeSOUL$info from '../assets/images/battleUI/orangeSOUL.json?url';
import ibuOrangeSOUL from '../assets/images/battleUI/orangeSOUL.png?url';
import ibuPurpleSOUL$info from '../assets/images/battleUI/purpleSOUL.json?url';
import ibuPurpleSOUL from '../assets/images/battleUI/purpleSOUL.png?url';
import ibuRun$info from '../assets/images/battleUI/run.json?url';
import ibuRun from '../assets/images/battleUI/run.png?url';
import ibuShatter$info from '../assets/images/battleUI/shatter.json?url';
import ibuShatter from '../assets/images/battleUI/shatter.png?url';
import ibuStar$info from '../assets/images/battleUI/star.json?url';
import ibuStar from '../assets/images/battleUI/star.png?url';
import ibuSwing$info from '../assets/images/battleUI/swing.json?url';
import ibuSwing from '../assets/images/battleUI/swing.png?url';
import ibuYellowSOUL$info from '../assets/images/battleUI/yellowSOUL.json?url';
import ibuYellowSOUL from '../assets/images/battleUI/yellowSOUL.png?url';
import ibuYellowShot$info from '../assets/images/battleUI/yellowShot.json?url';
import ibuYellowShot from '../assets/images/battleUI/yellowShot.png?url';
import idcAlphysCutscene1 from '../assets/images/dialogueCharacters/alphys/cutscene1.png?url';
import idcAlphysCutscene2 from '../assets/images/dialogueCharacters/alphys/cutscene2.png?url';
import idcAlphysCutscene3 from '../assets/images/dialogueCharacters/alphys/cutscene3.png?url';
import idcAlphysDontGetAllDreamyEyedOnMeNow from '../assets/images/dialogueCharacters/alphys/dontGetAllDreamyEyedOnMeNow.png?url';
import idcAlphysFR from '../assets/images/dialogueCharacters/alphys/fr.png?url';
import idcAlphysGarbo from '../assets/images/dialogueCharacters/alphys/garbo.png?url';
import idcAlphysGarboCenter from '../assets/images/dialogueCharacters/alphys/garboCenter.png?url';
import idcAlphysHaveSomeCompassion from '../assets/images/dialogueCharacters/alphys/haveSomeCompassion.png?url';
import idcAlphysHellYeah from '../assets/images/dialogueCharacters/alphys/hellYeah.png?url';
import idcAlphysIDK from '../assets/images/dialogueCharacters/alphys/idk.png?url';
import idcAlphysInquisitive from '../assets/images/dialogueCharacters/alphys/inquisitive.png?url';
import idcAlphysNervousLaugh from '../assets/images/dialogueCharacters/alphys/nervousLaugh.png?url';
import idcAlphysNeutralSweat from '../assets/images/dialogueCharacters/alphys/neutralSweat.png?url';
import idcAlphysOhGodNo from '../assets/images/dialogueCharacters/alphys/ohGodNo.png?url';
import idcAlphysShocked from '../assets/images/dialogueCharacters/alphys/shocked.png?url';
import idcAlphysSide from '../assets/images/dialogueCharacters/alphys/side.png?url';
import idcAlphysSideSad from '../assets/images/dialogueCharacters/alphys/sideSad.png?url';
import idcAlphysSmileSweat from '../assets/images/dialogueCharacters/alphys/smileSweat.png?url';
import idcAlphysSoAwesome from '../assets/images/dialogueCharacters/alphys/soAwesome.png?url';
import idcAlphysThatSucks from '../assets/images/dialogueCharacters/alphys/thatSucks.png?url';
import idcAlphysTheFactIs from '../assets/images/dialogueCharacters/alphys/theFactIs.png?url';
import idcAlphysUhButHeresTheDeal from '../assets/images/dialogueCharacters/alphys/uhButHeresTheDeal.png?url';
import idcAlphysWelp from '../assets/images/dialogueCharacters/alphys/welp.png?url';
import idcAlphysWorried from '../assets/images/dialogueCharacters/alphys/worried.png?url';
import idcAlphysWTF from '../assets/images/dialogueCharacters/alphys/wtf.png?url';
import idcAlphysWTF2 from '../assets/images/dialogueCharacters/alphys/wtf2.png?url';
import idcAlphysYeahYouKnowWhatsUp from '../assets/images/dialogueCharacters/alphys/yeahYouKnowWhatsUp.png?url';
import idcAlphysYeahYouKnowWhatsUpCenter from '../assets/images/dialogueCharacters/alphys/yeahYouKnowWhatsUpCenter.png?url';
import idcAsgoreBouttacry$info from '../assets/images/dialogueCharacters/asgore/bouttacry.json?url';
import idcAsgoreBouttacry from '../assets/images/dialogueCharacters/asgore/bouttacry.png?url';
import idcAsgoreCry1$info from '../assets/images/dialogueCharacters/asgore/cry1.json?url';
import idcAsgoreCry1 from '../assets/images/dialogueCharacters/asgore/cry1.png?url';
import idcAsgoreCry2 from '../assets/images/dialogueCharacters/asgore/cry2.png?url';
import idcAsgoreCutscene1$info from '../assets/images/dialogueCharacters/asgore/cutscene1.json?url';
import idcAsgoreCutscene1 from '../assets/images/dialogueCharacters/asgore/cutscene1.png?url';
import idcAsgoreFunni$info from '../assets/images/dialogueCharacters/asgore/funni.json?url';
import idcAsgoreFunni from '../assets/images/dialogueCharacters/asgore/funni.png?url';
import idcAsgoreHmph$info from '../assets/images/dialogueCharacters/asgore/hmph.json?url';
import idcAsgoreHmph from '../assets/images/dialogueCharacters/asgore/hmph.png?url';
import idcAsgoreHmphClosed$info from '../assets/images/dialogueCharacters/asgore/hmphClosed.json?url';
import idcAsgoreHmphClosed from '../assets/images/dialogueCharacters/asgore/hmphClosed.png?url';
import idcAsgoreHopeful$info from '../assets/images/dialogueCharacters/asgore/hopeful.json?url';
import idcAsgoreHopeful from '../assets/images/dialogueCharacters/asgore/hopeful.png?url';
import idcAsgoreHopefulSide$info from '../assets/images/dialogueCharacters/asgore/hopefulSide.json?url';
import idcAsgoreHopefulSide from '../assets/images/dialogueCharacters/asgore/hopefulSide.png?url';
import idcAsgoreMad$info from '../assets/images/dialogueCharacters/asgore/mad.json?url';
import idcAsgoreMad from '../assets/images/dialogueCharacters/asgore/mad.png?url';
import idcAsgoreMadClosed$info from '../assets/images/dialogueCharacters/asgore/madClosed.json?url';
import idcAsgoreMadClosed from '../assets/images/dialogueCharacters/asgore/madClosed.png?url';
import idcAsgorePensive$info from '../assets/images/dialogueCharacters/asgore/pensive.json?url';
import idcAsgorePensive from '../assets/images/dialogueCharacters/asgore/pensive.png?url';
import idcAsgorePensiveSmile$info from '../assets/images/dialogueCharacters/asgore/pensiveSmile.json?url';
import idcAsgorePensiveSmile from '../assets/images/dialogueCharacters/asgore/pensiveSmile.png?url';
import idcAsgoreSide$info from '../assets/images/dialogueCharacters/asgore/side.json?url';
import idcAsgoreSide from '../assets/images/dialogueCharacters/asgore/side.png?url';
import idcAsgoreWhatHaveYouDone$info from '../assets/images/dialogueCharacters/asgore/whatHaveYouDone.json?url';
import idcAsgoreWhatHaveYouDone from '../assets/images/dialogueCharacters/asgore/whatHaveYouDone.png?url';
import idcAsgoreWhatYouDoin$info from '../assets/images/dialogueCharacters/asgore/whatYouDoin.json?url';
import idcAsgoreWhatYouDoin from '../assets/images/dialogueCharacters/asgore/whatYouDoin.png?url';
import idcAsrielCocky$info from '../assets/images/dialogueCharacters/asriel/cocky.json?url';
import idcAsrielCocky from '../assets/images/dialogueCharacters/asriel/cocky.png?url';
import idcAsrielEvil$info from '../assets/images/dialogueCharacters/asriel/evil.json?url';
import idcAsrielEvil from '../assets/images/dialogueCharacters/asriel/evil.png?url';
import idcAsrielEvilClosed$info from '../assets/images/dialogueCharacters/asriel/evilClosed.json?url';
import idcAsrielEvilClosed from '../assets/images/dialogueCharacters/asriel/evilClosed.png?url';
import idcAsrielFear$info from '../assets/images/dialogueCharacters/asriel/fear.json?url';
import idcAsrielFear from '../assets/images/dialogueCharacters/asriel/fear.png?url';
import idcAsrielFocus$info from '../assets/images/dialogueCharacters/asriel/focus.json?url';
import idcAsrielFocus from '../assets/images/dialogueCharacters/asriel/focus.png?url';
import idcAsrielFocusClosed$info from '../assets/images/dialogueCharacters/asriel/focusClosed.json?url';
import idcAsrielFocusClosed from '../assets/images/dialogueCharacters/asriel/focusClosed.png?url';
import idcAsrielFocusSide$info from '../assets/images/dialogueCharacters/asriel/focusSide.json?url';
import idcAsrielFocusSide from '../assets/images/dialogueCharacters/asriel/focusSide.png?url';
import idcAsrielFurrow$info from '../assets/images/dialogueCharacters/asriel/furrow.json?url';
import idcAsrielFurrow from '../assets/images/dialogueCharacters/asriel/furrow.png?url';
import idcAsrielHuh$info from '../assets/images/dialogueCharacters/asriel/huh.json?url';
import idcAsrielHuh from '../assets/images/dialogueCharacters/asriel/huh.png?url';
import idcAsrielOhReally$info from '../assets/images/dialogueCharacters/asriel/ohReally.json?url';
import idcAsrielOhReally from '../assets/images/dialogueCharacters/asriel/ohReally.png?url';
import idcAsrielOhReallyClosed$info from '../assets/images/dialogueCharacters/asriel/ohReallyClosed.json?url';
import idcAsrielOhReallyClosed from '../assets/images/dialogueCharacters/asriel/ohReallyClosed.png?url';
import idcAsrielPlain$info from '../assets/images/dialogueCharacters/asriel/plain.json?url';
import idcAsrielPlain from '../assets/images/dialogueCharacters/asriel/plain.png?url';
import idcAsrielPlainClosed$info from '../assets/images/dialogueCharacters/asriel/plainClosed.json?url';
import idcAsrielPlainClosed from '../assets/images/dialogueCharacters/asriel/plainClosed.png?url';
import idcAsrielSmirk$info from '../assets/images/dialogueCharacters/asriel/smirk.json?url';
import idcAsrielSmirk from '../assets/images/dialogueCharacters/asriel/smirk.png?url';
import idcKiddAww$info from '../assets/images/dialogueCharacters/kidd/aww.json?url';
import idcKiddAww from '../assets/images/dialogueCharacters/kidd/aww.png?url';
import idcKiddCutscene1$info from '../assets/images/dialogueCharacters/kidd/cutscene1.json?url';
import idcKiddCutscene1 from '../assets/images/dialogueCharacters/kidd/cutscene1.png?url';
import idcKiddHuh$info from '../assets/images/dialogueCharacters/kidd/huh.json?url';
import idcKiddHuh from '../assets/images/dialogueCharacters/kidd/huh.png?url';
import idcKiddHuhSlave$info from '../assets/images/dialogueCharacters/kidd/huhSlave.json?url';
import idcKiddHuhSlave from '../assets/images/dialogueCharacters/kidd/huhSlave.png?url';
import idcKiddKiller$info from '../assets/images/dialogueCharacters/kidd/killer.json?url';
import idcKiddKiller from '../assets/images/dialogueCharacters/kidd/killer.png?url';
import idcKiddKillerSlave$info from '../assets/images/dialogueCharacters/kidd/killerSlave.json?url';
import idcKiddKillerSlave from '../assets/images/dialogueCharacters/kidd/killerSlave.png?url';
import idcKiddNeutral$info from '../assets/images/dialogueCharacters/kidd/neutral.json?url';
import idcKiddNeutral from '../assets/images/dialogueCharacters/kidd/neutral.png?url';
import idcKiddNeutralSlave$info from '../assets/images/dialogueCharacters/kidd/neutralSlave.json?url';
import idcKiddNeutralSlave from '../assets/images/dialogueCharacters/kidd/neutralSlave.png?url';
import idcKiddSerene$info from '../assets/images/dialogueCharacters/kidd/serene.json?url';
import idcKiddSerene from '../assets/images/dialogueCharacters/kidd/serene.png?url';
import idcKiddShocked$info from '../assets/images/dialogueCharacters/kidd/shocked.json?url';
import idcKiddShocked from '../assets/images/dialogueCharacters/kidd/shocked.png?url';
import idcKiddShockedSlave$info from '../assets/images/dialogueCharacters/kidd/shockedSlave.json?url';
import idcKiddShockedSlave from '../assets/images/dialogueCharacters/kidd/shockedSlave.png?url';
import idcKiddSide$info from '../assets/images/dialogueCharacters/kidd/side.json?url';
import idcKiddSide from '../assets/images/dialogueCharacters/kidd/side.png?url';
import idcMettatonNeo from '../assets/images/dialogueCharacters/mettaton/neo.png?url';
import idcPapyrusAYAYA$info from '../assets/images/dialogueCharacters/papyrus/AYAYA.json?url';
import idcPapyrusAYAYA from '../assets/images/dialogueCharacters/papyrus/AYAYA.png?url';
import idcPapyrusAyoo$info from '../assets/images/dialogueCharacters/papyrus/ayoo.json?url';
import idcPapyrusAyoo from '../assets/images/dialogueCharacters/papyrus/ayoo.png?url';
import idcPapyrusCutscene1$info from '../assets/images/dialogueCharacters/papyrus/cutscene1.json?url';
import idcPapyrusCutscene1 from '../assets/images/dialogueCharacters/papyrus/cutscene1.png?url';
import idcPapyrusDisbeef$info from '../assets/images/dialogueCharacters/papyrus/disbeef.json?url';
import idcPapyrusDisbeef from '../assets/images/dialogueCharacters/papyrus/disbeef.png?url';
import idcPapyrusDisbeefTurnaround$info from '../assets/images/dialogueCharacters/papyrus/disbeefTurnaround.json?url';
import idcPapyrusDisbeefTurnaround from '../assets/images/dialogueCharacters/papyrus/disbeefTurnaround.png?url';
import idcPapyrusIsThatSo$info from '../assets/images/dialogueCharacters/papyrus/isthatso.json?url';
import idcPapyrusIsThatSo from '../assets/images/dialogueCharacters/papyrus/isthatso.png?url';
import idcPapyrusNervousLaugh$info from '../assets/images/dialogueCharacters/papyrus/nervousLaugh.json?url';
import idcPapyrusNervousLaugh from '../assets/images/dialogueCharacters/papyrus/nervousLaugh.png?url';
import idcPapyrusNervousSweat$info from '../assets/images/dialogueCharacters/papyrus/nervousSweat.json?url';
import idcPapyrusNervousSweat from '../assets/images/dialogueCharacters/papyrus/nervousSweat.png?url';
import idcPapyrusNyeh$info from '../assets/images/dialogueCharacters/papyrus/nyeh.json?url';
import idcPapyrusNyeh from '../assets/images/dialogueCharacters/papyrus/nyeh.png?url';
import idcPapyrusSad$info from '../assets/images/dialogueCharacters/papyrus/sad.json?url';
import idcPapyrusSad from '../assets/images/dialogueCharacters/papyrus/sad.png?url';
import idcPapyrusSadSweat$info from '../assets/images/dialogueCharacters/papyrus/sadSweat.json?url';
import idcPapyrusSadSweat from '../assets/images/dialogueCharacters/papyrus/sadSweat.png?url';
import idcPapyrusThisIsSoSad$info from '../assets/images/dialogueCharacters/papyrus/thisissosad.json?url';
import idcPapyrusThisIsSoSad from '../assets/images/dialogueCharacters/papyrus/thisissosad.png?url';
import idcPapyrusWhatchaGonnaDo$info from '../assets/images/dialogueCharacters/papyrus/whatchagonnado.json?url';
import idcPapyrusWhatchaGonnaDo from '../assets/images/dialogueCharacters/papyrus/whatchagonnado.png?url';
import idcPapyrusBattleAnime$info from '../assets/images/dialogueCharacters/papyrusBattle/anime.json?url';
import idcPapyrusBattleAnime from '../assets/images/dialogueCharacters/papyrusBattle/anime.png?url';
import idcPapyrusBattleBlush from '../assets/images/dialogueCharacters/papyrusBattle/blush.png?url';
import idcPapyrusBattleBlushRefuse from '../assets/images/dialogueCharacters/papyrusBattle/blushRefuse.png?url';
import idcPapyrusBattleClosed$info from '../assets/images/dialogueCharacters/papyrusBattle/closed.json?url';
import idcPapyrusBattleClosed from '../assets/images/dialogueCharacters/papyrusBattle/closed.png?url';
import idcPapyrusBattleConfident$info from '../assets/images/dialogueCharacters/papyrusBattle/confident.json?url';
import idcPapyrusBattleConfident from '../assets/images/dialogueCharacters/papyrusBattle/confident.png?url';
import idcPapyrusBattleDeadpan from '../assets/images/dialogueCharacters/papyrusBattle/deadpan.png?url';
import idcPapyrusBattleDetermined from '../assets/images/dialogueCharacters/papyrusBattle/determined.png?url';
import idcPapyrusBattleEyeroll from '../assets/images/dialogueCharacters/papyrusBattle/eyeroll.png?url';
import idcPapyrusBattleFakeAnger from '../assets/images/dialogueCharacters/papyrusBattle/fakeAnger.png?url';
import idcPapyrusBattleHapp$info from '../assets/images/dialogueCharacters/papyrusBattle/happ.json?url';
import idcPapyrusBattleHapp from '../assets/images/dialogueCharacters/papyrusBattle/happ.png?url';
import idcPapyrusBattleHappAgain from '../assets/images/dialogueCharacters/papyrusBattle/happAgain.png?url';
import idcPapyrusBattleMad$info from '../assets/images/dialogueCharacters/papyrusBattle/mad.json?url';
import idcPapyrusBattleMad from '../assets/images/dialogueCharacters/papyrusBattle/mad.png?url';
import idcPapyrusBattleNooo$info from '../assets/images/dialogueCharacters/papyrusBattle/nooo.json?url';
import idcPapyrusBattleNooo from '../assets/images/dialogueCharacters/papyrusBattle/nooo.png?url';
import idcPapyrusBattleOwwie from '../assets/images/dialogueCharacters/papyrusBattle/owwie.png?url';
import idcPapyrusBattleShock from '../assets/images/dialogueCharacters/papyrusBattle/shock.png?url';
import idcPapyrusBattleSide from '../assets/images/dialogueCharacters/papyrusBattle/side.png?url';
import idcPapyrusBattleSly$info from '../assets/images/dialogueCharacters/papyrusBattle/sly.json?url';
import idcPapyrusBattleSly from '../assets/images/dialogueCharacters/papyrusBattle/sly.png?url';
import idcPapyrusBattleSus from '../assets/images/dialogueCharacters/papyrusBattle/sus.png?url';
import idcPapyrusBattleSweat$info from '../assets/images/dialogueCharacters/papyrusBattle/sweat.json?url';
import idcPapyrusBattleSweat from '../assets/images/dialogueCharacters/papyrusBattle/sweat.png?url';
import idcPapyrusBattleTopBlush from '../assets/images/dialogueCharacters/papyrusBattle/topBlush.png?url';
import idcPapyrusBattleWeary from '../assets/images/dialogueCharacters/papyrusBattle/weary.png?url';
import idcSansBlink from '../assets/images/dialogueCharacters/sans/blink.png?url';
import idcSansEmpty from '../assets/images/dialogueCharacters/sans/empty.png?url';
import idcSansEye$info from '../assets/images/dialogueCharacters/sans/eye.json?url';
import idcSansEye from '../assets/images/dialogueCharacters/sans/eye.png?url';
import idcSansLaugh1 from '../assets/images/dialogueCharacters/sans/laugh1.png?url';
import idcSansLaugh2 from '../assets/images/dialogueCharacters/sans/laugh2.png?url';
import idcSansNormal from '../assets/images/dialogueCharacters/sans/normal.png?url';
import idcSansToriel from '../assets/images/dialogueCharacters/sans/toriel.png?url';
import idcSansWink from '../assets/images/dialogueCharacters/sans/wink.png?url';
import idcTorielBlush$info from '../assets/images/dialogueCharacters/toriel/blush.json?url';
import idcTorielBlush from '../assets/images/dialogueCharacters/toriel/blush.png?url';
import idcTorielCompassion$info from '../assets/images/dialogueCharacters/toriel/compassion.json?url';
import idcTorielCompassion from '../assets/images/dialogueCharacters/toriel/compassion.png?url';
import idcTorielCompassionFrown$info from '../assets/images/dialogueCharacters/toriel/compassionfrown.json?url';
import idcTorielCompassionFrown from '../assets/images/dialogueCharacters/toriel/compassionfrown.png?url';
import idcTorielCompassionSmile$info from '../assets/images/dialogueCharacters/toriel/compassionsmile.json?url';
import idcTorielCompassionSmile from '../assets/images/dialogueCharacters/toriel/compassionsmile.png?url';
import idcTorielConcern$info from '../assets/images/dialogueCharacters/toriel/concern.json?url';
import idcTorielConcern from '../assets/images/dialogueCharacters/toriel/concern.png?url';
import idcTorielCry$info from '../assets/images/dialogueCharacters/toriel/cry.json?url';
import idcTorielCry from '../assets/images/dialogueCharacters/toriel/cry.png?url';
import idcTorielCryLaugh$info from '../assets/images/dialogueCharacters/toriel/crylaugh.json?url';
import idcTorielCryLaugh from '../assets/images/dialogueCharacters/toriel/crylaugh.png?url';
import idcTorielCutscene1$info from '../assets/images/dialogueCharacters/toriel/cutscene1.json?url';
import idcTorielCutscene1 from '../assets/images/dialogueCharacters/toriel/cutscene1.png?url';
import idcTorielCutscene2$info from '../assets/images/dialogueCharacters/toriel/cutscene2.json?url';
import idcTorielCutscene2 from '../assets/images/dialogueCharacters/toriel/cutscene2.png?url';
import idcTorielDreamworks$info from '../assets/images/dialogueCharacters/toriel/dreamworks.json?url';
import idcTorielDreamworks from '../assets/images/dialogueCharacters/toriel/dreamworks.png?url';
import idcTorielEverythingisfine$info from '../assets/images/dialogueCharacters/toriel/everythingisfine.json?url';
import idcTorielEverythingisfine from '../assets/images/dialogueCharacters/toriel/everythingisfine.png?url';
import idcTorielLowConcern$info from '../assets/images/dialogueCharacters/toriel/lowconcern.json?url';
import idcTorielLowConcern from '../assets/images/dialogueCharacters/toriel/lowconcern.png?url';
import idcTorielIsMad$info from '../assets/images/dialogueCharacters/toriel/mad.json?url';
import idcTorielIsMad from '../assets/images/dialogueCharacters/toriel/mad.png?url';
import idcTorielSad$info from '../assets/images/dialogueCharacters/toriel/sad.json?url';
import idcTorielSad from '../assets/images/dialogueCharacters/toriel/sad.png?url';
import idcTorielShock$info from '../assets/images/dialogueCharacters/toriel/shock.json?url';
import idcTorielShock from '../assets/images/dialogueCharacters/toriel/shock.png?url';
import idcTorielSincere$info from '../assets/images/dialogueCharacters/toriel/sincere.json?url';
import idcTorielSincere from '../assets/images/dialogueCharacters/toriel/sincere.png?url';
import idcTorielSmallXD$info from '../assets/images/dialogueCharacters/toriel/smallxd.json?url';
import idcTorielSmallXD from '../assets/images/dialogueCharacters/toriel/smallxd.png?url';
import idcTorielStraightUp$info from '../assets/images/dialogueCharacters/toriel/straightup.json?url';
import idcTorielStraightUp from '../assets/images/dialogueCharacters/toriel/straightup.png?url';
import idcTorielWTF$info from '../assets/images/dialogueCharacters/toriel/wtf.json?url';
import idcTorielWTF from '../assets/images/dialogueCharacters/toriel/wtf.png?url';
import idcTorielWTF2$info from '../assets/images/dialogueCharacters/toriel/wtf2.json?url';
import idcTorielWTF2 from '../assets/images/dialogueCharacters/toriel/wtf2.png?url';
import idcTorielXD$info from '../assets/images/dialogueCharacters/toriel/xd.json?url';
import idcTorielXD from '../assets/images/dialogueCharacters/toriel/xd.png?url';
import idcTwinklyCapping$info from '../assets/images/dialogueCharacters/twinkly/capping.json?url';
import idcTwinklyCapping from '../assets/images/dialogueCharacters/twinkly/capping.png?url';
import idcTwinklyEvil$info from '../assets/images/dialogueCharacters/twinkly/evil.json?url';
import idcTwinklyEvil from '../assets/images/dialogueCharacters/twinkly/evil.png?url';
import idcTwinklyGonk$info from '../assets/images/dialogueCharacters/twinkly/gonk.json?url';
import idcTwinklyGonk from '../assets/images/dialogueCharacters/twinkly/gonk.png?url';
import idcTwinklyGrin$info from '../assets/images/dialogueCharacters/twinkly/grin.json?url';
import idcTwinklyGrin from '../assets/images/dialogueCharacters/twinkly/grin.png?url';
import idcTwinklyHurt from '../assets/images/dialogueCharacters/twinkly/hurt.png?url';
import idcTwinklyKawaii$info from '../assets/images/dialogueCharacters/twinkly/kawaii.json?url';
import idcTwinklyKawaii from '../assets/images/dialogueCharacters/twinkly/kawaii.png?url';
import idcTwinklyLaugh$info from '../assets/images/dialogueCharacters/twinkly/laugh.json?url';
import idcTwinklyLaugh from '../assets/images/dialogueCharacters/twinkly/laugh.png?url';
import idcTwinklyNice$info from '../assets/images/dialogueCharacters/twinkly/nice.json?url';
import idcTwinklyNice from '../assets/images/dialogueCharacters/twinkly/nice.png?url';
import idcTwinklyPissed$info from '../assets/images/dialogueCharacters/twinkly/pissed.json?url';
import idcTwinklyPissed from '../assets/images/dialogueCharacters/twinkly/pissed.png?url';
import idcTwinklyPlain$info from '../assets/images/dialogueCharacters/twinkly/plain.json?url';
import idcTwinklyPlain from '../assets/images/dialogueCharacters/twinkly/plain.png?url';
import idcTwinklySassy$info from '../assets/images/dialogueCharacters/twinkly/sassy.json?url';
import idcTwinklySassy from '../assets/images/dialogueCharacters/twinkly/sassy.png?url';
import idcTwinklySide$info from '../assets/images/dialogueCharacters/twinkly/side.json?url';
import idcTwinklySide from '../assets/images/dialogueCharacters/twinkly/side.png?url';
import idcTwinklyWink from '../assets/images/dialogueCharacters/twinkly/wink.png?url';
import idcUndyneAngryTomato from '../assets/images/dialogueCharacters/undyne/angryTomato.png?url';
import idcUndyneBattleTorso from '../assets/images/dialogueCharacters/undyne/battle_torso.png?url';
import idcUndyneCutscene1 from '../assets/images/dialogueCharacters/undyne/cutscene1.png?url';
import idcUndyneDafuq from '../assets/images/dialogueCharacters/undyne/dafuq.png?url';
import idcUndyneDateTorso from '../assets/images/dialogueCharacters/undyne/date_torso.png?url';
import idcUndyneDateTorsoBody from '../assets/images/dialogueCharacters/undyne/date_torso_body.png?url';
import idcUndyneGrr from '../assets/images/dialogueCharacters/undyne/grr.png?url';
import idcUndyneGrrSide from '../assets/images/dialogueCharacters/undyne/grrSide.png?url';
import idcUndyneHappyTomato from '../assets/images/dialogueCharacters/undyne/happyTomato.png?url';
import idcUndyneImOntoYouPunk from '../assets/images/dialogueCharacters/undyne/imOntoYouPunk.png?url';
import idcUndyneLaughcrazy from '../assets/images/dialogueCharacters/undyne/laughcrazy.png?url';
import idcUndynePensive from '../assets/images/dialogueCharacters/undyne/pensive.png?url';
import idcUndyneSquidgames from '../assets/images/dialogueCharacters/undyne/squidgames.png?url';
import idcUndyneSus from '../assets/images/dialogueCharacters/undyne/sus.png?url';
import idcUndyneSweating from '../assets/images/dialogueCharacters/undyne/sweating.png?url';
import idcUndynetheHell from '../assets/images/dialogueCharacters/undyne/theHell.png?url';
import idcUndyneBeingAwesomeForTenMinutesStraight from '../assets/images/dialogueCharacters/undyne/undyneBeingAwesomeForTenMinutesStraight.png?url';
import idcUndyneUWU from '../assets/images/dialogueCharacters/undyne/uwu.png?url';
import idcUndyneWhatevs from '../assets/images/dialogueCharacters/undyne/whatevs.png?url';
import idcUndyneWTFBro from '../assets/images/dialogueCharacters/undyne/wtfbro.png?url';
import idcUndyneYouKilledHim from '../assets/images/dialogueCharacters/undyne/youKilledHim.png?url';
import idcUndyneYouKilledHimPensive from '../assets/images/dialogueCharacters/undyne/youKilledHimPensive.png?url';
import idcUndyneYouKilledHimSide from '../assets/images/dialogueCharacters/undyne/youKilledHimSide.png?url';
import idcUndyneYouKilledHimSmile from '../assets/images/dialogueCharacters/undyne/youKilledHimSmile.png?url';
import idcUndyneYouKilledHimStare from '../assets/images/dialogueCharacters/undyne/youKilledHimStare.png?url';
import ieSOUL from '../assets/images/extras/SOUL.png?url';
import ieArtsncrafts from '../assets/images/extras/artsncrafts.png?url';
import ieBiodome from '../assets/images/extras/biodome.png?url';
import ieButtonC from '../assets/images/extras/buttonC.png?url';
import ieButtonM from '../assets/images/extras/buttonM.png?url';
import ieButtonX from '../assets/images/extras/buttonX.png?url';
import ieButtonZ from '../assets/images/extras/buttonZ.png?url';
import ieCrossword from '../assets/images/extras/crossword.png?url';
import ieHomeworld from '../assets/images/extras/homeworld.png?url';
import ieMonitorguy$info from '../assets/images/extras/monitorguy.json?url';
import ieMonitorguy from '../assets/images/extras/monitorguy.png?url';
import ieMonitorguyWater$info from '../assets/images/extras/monitorguyWater.json?url';
import ieMonitorguyWater from '../assets/images/extras/monitorguyWater.png?url';
import ieNapster from '../assets/images/extras/napster.png?url';
import ieOuternet from '../assets/images/extras/outernet.png?url';
import iePunchcard from '../assets/images/extras/punchcard.png?url';
import ieSplashBackground from '../assets/images/extras/splash-background.png?url';
import ieSplashForeground from '../assets/images/extras/splash-foreground.png?url';
import ieStarbertA$info from '../assets/images/extras/starbertA.json?url';
import ieStarbertA from '../assets/images/extras/starbertA.png?url';
import ieStarbertB$info from '../assets/images/extras/starbertB.json?url';
import ieStarbertB from '../assets/images/extras/starbertB.png?url';
import ieStarbertBGum from '../assets/images/extras/starbertB_gum.png?url';
import ieStory$info from '../assets/images/extras/story.json?url';
import ieStory from '../assets/images/extras/story.png?url';
import im_ from '../assets/images/maps/_.png?url';
import imAerialisAOverlay from '../assets/images/maps/aerialis-a-overlay.png?url';
import imAerialisA from '../assets/images/maps/aerialis-a.png?url';
import imAerialisBDark from '../assets/images/maps/aerialis-b-dark.png?url';
import imAerialisB from '../assets/images/maps/aerialis-b.png?url';
import imFoundryOverlay from '../assets/images/maps/foundry-overlay.png?url';
import imFoundry from '../assets/images/maps/foundry.png?url';
import imOutlands from '../assets/images/maps/outlands.png?url';
import imStarton from '../assets/images/maps/starton.png?url';
import iocAlphysDown$info from '../assets/images/overworldCharacters/alphys/down.json?url';
import iocAlphysDown from '../assets/images/overworldCharacters/alphys/down.png?url';
import iocAlphysDownTalk$info from '../assets/images/overworldCharacters/alphys/downTalk.json?url';
import iocAlphysDownTalk from '../assets/images/overworldCharacters/alphys/downTalk.png?url';
import iocAlphysShocked from '../assets/images/overworldCharacters/alphys/freaked.png?url';
import iocAlphysLeft$info from '../assets/images/overworldCharacters/alphys/left.json?url';
import iocAlphysLeft from '../assets/images/overworldCharacters/alphys/left.png?url';
import iocAlphysLeftTalk$info from '../assets/images/overworldCharacters/alphys/leftTalk.json?url';
import iocAlphysLeftTalk from '../assets/images/overworldCharacters/alphys/leftTalk.png?url';
import iocAlphysRight$info from '../assets/images/overworldCharacters/alphys/right.json?url';
import iocAlphysRight from '../assets/images/overworldCharacters/alphys/right.png?url';
import iocAlphysRightTalk$info from '../assets/images/overworldCharacters/alphys/rightTalk.json?url';
import iocAlphysRightTalk from '../assets/images/overworldCharacters/alphys/rightTalk.png?url';
import iocAlphysUp$info from '../assets/images/overworldCharacters/alphys/up.json?url';
import iocAlphysUp from '../assets/images/overworldCharacters/alphys/up.png?url';
import iocAlphysUpTalk from '../assets/images/overworldCharacters/alphys/upTalk.png?url';
import iocAsgoreDown$info from '../assets/images/overworldCharacters/asgore/down.json?url';
import iocAsgoreDown from '../assets/images/overworldCharacters/asgore/down.png?url';
import iocAsgoreDownTalk$info from '../assets/images/overworldCharacters/asgore/downTalk.json?url';
import iocAsgoreDownTalk from '../assets/images/overworldCharacters/asgore/downTalk.png?url';
import iocAsgoreLeft$info from '../assets/images/overworldCharacters/asgore/left.json?url';
import iocAsgoreLeft from '../assets/images/overworldCharacters/asgore/left.png?url';
import iocAsgoreLeftTalk$info from '../assets/images/overworldCharacters/asgore/leftTalk.json?url';
import iocAsgoreLeftTalk from '../assets/images/overworldCharacters/asgore/leftTalk.png?url';
import iocAsgoreRight$info from '../assets/images/overworldCharacters/asgore/right.json?url';
import iocAsgoreRight from '../assets/images/overworldCharacters/asgore/right.png?url';
import iocAsgoreRightTalk$info from '../assets/images/overworldCharacters/asgore/rightTalk.json?url';
import iocAsgoreRightTalk from '../assets/images/overworldCharacters/asgore/rightTalk.png?url';
import iocAsgoreUp$info from '../assets/images/overworldCharacters/asgore/up.json?url';
import iocAsgoreUp from '../assets/images/overworldCharacters/asgore/up.png?url';
import iocAsgoreUpTalk from '../assets/images/overworldCharacters/asgore/upTalk.png?url';
import iocAsrielDown$info from '../assets/images/overworldCharacters/asriel/down.json?url';
import iocAsrielDown from '../assets/images/overworldCharacters/asriel/down.png?url';
import iocAsrielDownTalk$info from '../assets/images/overworldCharacters/asriel/downTalk.json?url';
import iocAsrielDownTalk from '../assets/images/overworldCharacters/asriel/downTalk.png?url';
import iocAsrielEarTug$info from '../assets/images/overworldCharacters/asriel/earTug.json?url';
import iocAsrielEarTug from '../assets/images/overworldCharacters/asriel/earTug.png?url';
import iocAsrielEarTugWater$info from '../assets/images/overworldCharacters/asriel/earTugWater.json?url';
import iocAsrielEarTugWater from '../assets/images/overworldCharacters/asriel/earTugWater.png?url';
import iocAsrielHug1$info from '../assets/images/overworldCharacters/asriel/hug1.json?url';
import iocAsrielHug1 from '../assets/images/overworldCharacters/asriel/hug1.png?url';
import iocAsrielHug1Water$info from '../assets/images/overworldCharacters/asriel/hug1_water.json?url';
import iocAsrielHug1Water from '../assets/images/overworldCharacters/asriel/hug1_water.png?url';
import iocAsrielKneel from '../assets/images/overworldCharacters/asriel/kneel.png?url';
import iocAsrielLeft$info from '../assets/images/overworldCharacters/asriel/left.json?url';
import iocAsrielLeft from '../assets/images/overworldCharacters/asriel/left.png?url';
import iocAsrielLeftTalk$info from '../assets/images/overworldCharacters/asriel/leftTalk.json?url';
import iocAsrielLeftTalk from '../assets/images/overworldCharacters/asriel/leftTalk.png?url';
import iocAsrielPet$info from '../assets/images/overworldCharacters/asriel/pet.json?url';
import iocAsrielPet from '../assets/images/overworldCharacters/asriel/pet.png?url';
import iocAsrielPetWater$info from '../assets/images/overworldCharacters/asriel/petWater.json?url';
import iocAsrielPetWater from '../assets/images/overworldCharacters/asriel/petWater.png?url';
import iocAsrielRight$info from '../assets/images/overworldCharacters/asriel/right.json?url';
import iocAsrielRight from '../assets/images/overworldCharacters/asriel/right.png?url';
import iocAsrielRightTalk$info from '../assets/images/overworldCharacters/asriel/rightTalk.json?url';
import iocAsrielRightTalk from '../assets/images/overworldCharacters/asriel/rightTalk.png?url';
import iocAsrielUp$info from '../assets/images/overworldCharacters/asriel/up.json?url';
import iocAsrielUp from '../assets/images/overworldCharacters/asriel/up.png?url';
import iocFriskDown$info from '../assets/images/overworldCharacters/frisk/down.json?url';
import iocFriskDown from '../assets/images/overworldCharacters/frisk/down.png?url';
import iocFriskDownJetpack$info from '../assets/images/overworldCharacters/frisk/downJetpack.json?url';
import iocFriskDownJetpack from '../assets/images/overworldCharacters/frisk/downJetpack.png?url';
import iocFriskDownJetpackOff from '../assets/images/overworldCharacters/frisk/downJetpackOff.png?url';
import iocFriskDownWater$info from '../assets/images/overworldCharacters/frisk/downWater.json?url';
import iocFriskDownWater from '../assets/images/overworldCharacters/frisk/downWater.png?url';
import iocFriskDownWaterJetpack$info from '../assets/images/overworldCharacters/frisk/downWaterJetpack.json?url';
import iocFriskDownWaterJetpack from '../assets/images/overworldCharacters/frisk/downWaterJetpack.png?url';
import iocFriskDownWaterJetpackOff from '../assets/images/overworldCharacters/frisk/downWaterJetpackOff.png?url';
import iocFriskLeft$info from '../assets/images/overworldCharacters/frisk/left.json?url';
import iocFriskLeft from '../assets/images/overworldCharacters/frisk/left.png?url';
import iocFriskLeftJetpack$info from '../assets/images/overworldCharacters/frisk/leftJetpack.json?url';
import iocFriskLeftJetpack from '../assets/images/overworldCharacters/frisk/leftJetpack.png?url';
import iocFriskLeftJetpackOff from '../assets/images/overworldCharacters/frisk/leftJetpackOff.png?url';
import iocFriskLeftWater$info from '../assets/images/overworldCharacters/frisk/leftWater.json?url';
import iocFriskLeftWater from '../assets/images/overworldCharacters/frisk/leftWater.png?url';
import iocFriskLeftWaterJetpack$info from '../assets/images/overworldCharacters/frisk/leftWaterJetpack.json?url';
import iocFriskLeftWaterJetpack from '../assets/images/overworldCharacters/frisk/leftWaterJetpack.png?url';
import iocFriskLeftWaterJetpackOff from '../assets/images/overworldCharacters/frisk/leftWaterJetpackOff.png?url';
import iocFriskLeftWaterPour$info from '../assets/images/overworldCharacters/frisk/leftWaterPour.json?url';
import iocFriskLeftWaterPour from '../assets/images/overworldCharacters/frisk/leftWaterPour.png?url';
import iocFriskRight$info from '../assets/images/overworldCharacters/frisk/right.json?url';
import iocFriskRight from '../assets/images/overworldCharacters/frisk/right.png?url';
import iocFriskRightJetpack$info from '../assets/images/overworldCharacters/frisk/rightJetpack.json?url';
import iocFriskRightJetpack from '../assets/images/overworldCharacters/frisk/rightJetpack.png?url';
import iocFriskRightJetpackOff from '../assets/images/overworldCharacters/frisk/rightJetpackOff.png?url';
import iocFriskRightWater$info from '../assets/images/overworldCharacters/frisk/rightWater.json?url';
import iocFriskRightWater from '../assets/images/overworldCharacters/frisk/rightWater.png?url';
import iocFriskRightWaterJetpack$info from '../assets/images/overworldCharacters/frisk/rightWaterJetpack.json?url';
import iocFriskRightWaterJetpack from '../assets/images/overworldCharacters/frisk/rightWaterJetpack.png?url';
import iocFriskRightWaterJetpackOff from '../assets/images/overworldCharacters/frisk/rightWaterJetpackOff.png?url';
import iocFriskUp$info from '../assets/images/overworldCharacters/frisk/up.json?url';
import iocFriskUp from '../assets/images/overworldCharacters/frisk/up.png?url';
import iocFriskUpJetpack$info from '../assets/images/overworldCharacters/frisk/upJetpack.json?url';
import iocFriskUpJetpack from '../assets/images/overworldCharacters/frisk/upJetpack.png?url';
import iocFriskUpJetpackOff from '../assets/images/overworldCharacters/frisk/upJetpackOff.png?url';
import iocFriskUpWater$info from '../assets/images/overworldCharacters/frisk/upWater.json?url';
import iocFriskUpWater from '../assets/images/overworldCharacters/frisk/upWater.png?url';
import iocFriskUpWaterJetpack$info from '../assets/images/overworldCharacters/frisk/upWaterJetpack.json?url';
import iocFriskUpWaterJetpack from '../assets/images/overworldCharacters/frisk/upWaterJetpack.png?url';
import iocFriskUpWaterJetpackOff from '../assets/images/overworldCharacters/frisk/upWaterJetpackOff.png?url';
import iocGrillbyDown$info from '../assets/images/overworldCharacters/grillby/down.json?url';
import iocGrillbyDown from '../assets/images/overworldCharacters/grillby/down.png?url';
import iocGrillbyUp$info from '../assets/images/overworldCharacters/grillby/up.json?url';
import iocGrillbyUp from '../assets/images/overworldCharacters/grillby/up.png?url';
import iocKiddCrouch from '../assets/images/overworldCharacters/kidd/crouch.png?url';
import iocKiddDown$info from '../assets/images/overworldCharacters/kidd/down.json?url';
import iocKiddDown from '../assets/images/overworldCharacters/kidd/down.png?url';
import iocKiddDownSad$info from '../assets/images/overworldCharacters/kidd/downSad.json?url';
import iocKiddDownSad from '../assets/images/overworldCharacters/kidd/downSad.png?url';
import iocKiddDownSlave$info from '../assets/images/overworldCharacters/kidd/downSlave.json?url';
import iocKiddDownSlave from '../assets/images/overworldCharacters/kidd/downSlave.png?url';
import iocKiddDownTalk$info from '../assets/images/overworldCharacters/kidd/downTalk.json?url';
import iocKiddDownTalk from '../assets/images/overworldCharacters/kidd/downTalk.png?url';
import iocKiddDownTalkSad$info from '../assets/images/overworldCharacters/kidd/downTalkSad.json?url';
import iocKiddDownTalkSad from '../assets/images/overworldCharacters/kidd/downTalkSad.png?url';
import iocKiddDownTalkSlave$info from '../assets/images/overworldCharacters/kidd/downTalkSlave.json?url';
import iocKiddDownTalkSlave from '../assets/images/overworldCharacters/kidd/downTalkSlave.png?url';
import iocKiddLeft$info from '../assets/images/overworldCharacters/kidd/left.json?url';
import iocKiddLeft from '../assets/images/overworldCharacters/kidd/left.png?url';
import iocKiddLeftSad$info from '../assets/images/overworldCharacters/kidd/leftSad.json?url';
import iocKiddLeftSad from '../assets/images/overworldCharacters/kidd/leftSad.png?url';
import iocKiddLeftSlave$info from '../assets/images/overworldCharacters/kidd/leftSlave.json?url';
import iocKiddLeftSlave from '../assets/images/overworldCharacters/kidd/leftSlave.png?url';
import iocKiddLeftTalk$info from '../assets/images/overworldCharacters/kidd/leftTalk.json?url';
import iocKiddLeftTalk from '../assets/images/overworldCharacters/kidd/leftTalk.png?url';
import iocKiddLeftTalkSad$info from '../assets/images/overworldCharacters/kidd/leftTalkSad.json?url';
import iocKiddLeftTalkSad from '../assets/images/overworldCharacters/kidd/leftTalkSad.png?url';
import iocKiddLeftTalkSlave$info from '../assets/images/overworldCharacters/kidd/leftTalkSlave.json?url';
import iocKiddLeftTalkSlave from '../assets/images/overworldCharacters/kidd/leftTalkSlave.png?url';
import iocKiddLeftTrip$info from '../assets/images/overworldCharacters/kidd/leftTrip.json?url';
import iocKiddLeftTrip from '../assets/images/overworldCharacters/kidd/leftTrip.png?url';
import iocKiddRight$info from '../assets/images/overworldCharacters/kidd/right.json?url';
import iocKiddRight from '../assets/images/overworldCharacters/kidd/right.png?url';
import iocKiddRightSad$info from '../assets/images/overworldCharacters/kidd/rightSad.json?url';
import iocKiddRightSad from '../assets/images/overworldCharacters/kidd/rightSad.png?url';
import iocKiddRightSlave$info from '../assets/images/overworldCharacters/kidd/rightSlave.json?url';
import iocKiddRightSlave from '../assets/images/overworldCharacters/kidd/rightSlave.png?url';
import iocKiddRightTalk$info from '../assets/images/overworldCharacters/kidd/rightTalk.json?url';
import iocKiddRightTalk from '../assets/images/overworldCharacters/kidd/rightTalk.png?url';
import iocKiddRightTalkSad$info from '../assets/images/overworldCharacters/kidd/rightTalkSad.json?url';
import iocKiddRightTalkSad from '../assets/images/overworldCharacters/kidd/rightTalkSad.png?url';
import iocKiddRightTalkSlave$info from '../assets/images/overworldCharacters/kidd/rightTalkSlave.json?url';
import iocKiddRightTalkSlave from '../assets/images/overworldCharacters/kidd/rightTalkSlave.png?url';
import iocKiddRightTrip$info from '../assets/images/overworldCharacters/kidd/rightTrip.json?url';
import iocKiddRightTrip from '../assets/images/overworldCharacters/kidd/rightTrip.png?url';
import iocKiddUp$info from '../assets/images/overworldCharacters/kidd/up.json?url';
import iocKiddUp from '../assets/images/overworldCharacters/kidd/up.png?url';
import iocKiddUpTalk$info from '../assets/images/overworldCharacters/kidd/upTalk.json?url';
import iocKiddUpTalk from '../assets/images/overworldCharacters/kidd/upTalk.png?url';
import iocMettatonAnchorDotdotdot$info from '../assets/images/overworldCharacters/mettaton/anchorDotdotdot.json?url';
import iocMettatonAnchorDotdotdot from '../assets/images/overworldCharacters/mettaton/anchorDotdotdot.png?url';
import iocMettatonAnchorFlyer$info from '../assets/images/overworldCharacters/mettaton/anchorFlyer.json?url';
import iocMettatonAnchorFlyer from '../assets/images/overworldCharacters/mettaton/anchorFlyer.png?url';
import iocMettatonAnchorG$info from '../assets/images/overworldCharacters/mettaton/anchorG.json?url';
import iocMettatonAnchorG from '../assets/images/overworldCharacters/mettaton/anchorG.png?url';
import iocMettatonAnchorLaugh$info from '../assets/images/overworldCharacters/mettaton/anchorLaugh.json?url';
import iocMettatonAnchorLaugh from '../assets/images/overworldCharacters/mettaton/anchorLaugh.png?url';
import iocMettatonAnchorOMG$info from '../assets/images/overworldCharacters/mettaton/anchorOMG.json?url';
import iocMettatonAnchorOMG from '../assets/images/overworldCharacters/mettaton/anchorOMG.png?url';
import iocMettatonAnchorPoint$info from '../assets/images/overworldCharacters/mettaton/anchorPoint.json?url';
import iocMettatonAnchorPoint from '../assets/images/overworldCharacters/mettaton/anchorPoint.png?url';
import iocMettatonBackhands$info from '../assets/images/overworldCharacters/mettaton/backhands.json?url';
import iocMettatonBackhands from '../assets/images/overworldCharacters/mettaton/backhands.png?url';
import iocMettatonBro from '../assets/images/overworldCharacters/mettaton/bro.png?url';
import iocMettatonClap$info from '../assets/images/overworldCharacters/mettaton/clap.json?url';
import iocMettatonClap from '../assets/images/overworldCharacters/mettaton/clap.png?url';
import iocMettatonConfused$info from '../assets/images/overworldCharacters/mettaton/confused.json?url';
import iocMettatonConfused from '../assets/images/overworldCharacters/mettaton/confused.png?url';
import iocMettatonDotdotdot from '../assets/images/overworldCharacters/mettaton/dotdotdot.png?url';
import iocMettatonDressIdle$info from '../assets/images/overworldCharacters/mettaton/dressIdle.json?url';
import iocMettatonDressIdle from '../assets/images/overworldCharacters/mettaton/dressIdle.png?url';
import iocMettatonDressPull$info from '../assets/images/overworldCharacters/mettaton/dressPull.json?url';
import iocMettatonDressPull from '../assets/images/overworldCharacters/mettaton/dressPull.png?url';
import iocMettatonDressRoll from '../assets/images/overworldCharacters/mettaton/dressRoll.png?url';
import iocMettatonFlyer$info from '../assets/images/overworldCharacters/mettaton/flyer.json?url';
import iocMettatonFlyer from '../assets/images/overworldCharacters/mettaton/flyer.png?url';
import iocMettatonLaugh$info from '../assets/images/overworldCharacters/mettaton/laugh.json?url';
import iocMettatonLaugh from '../assets/images/overworldCharacters/mettaton/laugh.png?url';
import iocMettatonMicrophone$info from '../assets/images/overworldCharacters/mettaton/microphone.json?url';
import iocMettatonMicrophone from '../assets/images/overworldCharacters/mettaton/microphone.png?url';
import iocMettatonNeo$info from '../assets/images/overworldCharacters/mettaton/neo.json?url';
import iocMettatonNeo from '../assets/images/overworldCharacters/mettaton/neo.png?url';
import iocMettatonPoint$info from '../assets/images/overworldCharacters/mettaton/point.json?url';
import iocMettatonPoint from '../assets/images/overworldCharacters/mettaton/point.png?url';
import iocMettatonPointthree$info from '../assets/images/overworldCharacters/mettaton/pointthree.json?url';
import iocMettatonPointthree from '../assets/images/overworldCharacters/mettaton/pointthree.png?url';
import iocMettatonRollLeft$info from '../assets/images/overworldCharacters/mettaton/rollLeft.json?url';
import iocMettatonRollLeft from '../assets/images/overworldCharacters/mettaton/rollLeft.png?url';
import iocMettatonRollRight$info from '../assets/images/overworldCharacters/mettaton/rollRight.json?url';
import iocMettatonRollRight from '../assets/images/overworldCharacters/mettaton/rollRight.png?url';
import iocMettatonSeriouspose$info from '../assets/images/overworldCharacters/mettaton/seriouspose.json?url';
import iocMettatonSeriouspose from '../assets/images/overworldCharacters/mettaton/seriouspose.png?url';
import iocMettatonShrug$info from '../assets/images/overworldCharacters/mettaton/shrug.json?url';
import iocMettatonShrug from '../assets/images/overworldCharacters/mettaton/shrug.png?url';
import iocMettatonWave$info from '../assets/images/overworldCharacters/mettaton/wave.json?url';
import iocMettatonWave from '../assets/images/overworldCharacters/mettaton/wave.png?url';
import iocNapstablookBody from '../assets/images/overworldCharacters/napstablook/body.png?url';
import iocNapstablookDown from '../assets/images/overworldCharacters/napstablook/down.png?url';
import iocNapstablookDownAlter from '../assets/images/overworldCharacters/napstablook/downAlter.png?url';
import iocNapstablookLeft from '../assets/images/overworldCharacters/napstablook/left.png?url';
import iocNapstablookLeftAlter from '../assets/images/overworldCharacters/napstablook/leftAlter.png?url';
import iocNapstablookRight from '../assets/images/overworldCharacters/napstablook/right.png?url';
import iocNapstablookRightAlter from '../assets/images/overworldCharacters/napstablook/rightAlter.png?url';
import iocNapstablookShadow from '../assets/images/overworldCharacters/napstablook/shadow.png?url';
import iocNapstablookUp from '../assets/images/overworldCharacters/napstablook/up.png?url';
import iocNapstablookUpAlter from '../assets/images/overworldCharacters/napstablook/upAlter.png?url';
import iocPapyrusCapeStark$info from '../assets/images/overworldCharacters/papyrus/cakeStarp.json?url';
import iocPapyrusCapeStark from '../assets/images/overworldCharacters/papyrus/cakeStarp.png?url';
import iocPapyrusCape$info from '../assets/images/overworldCharacters/papyrus/cape.json?url';
import iocPapyrusCape from '../assets/images/overworldCharacters/papyrus/cape.png?url';
import iocPapyrusDownStark$info from '../assets/images/overworldCharacters/papyrus/doknStarw.json?url';
import iocPapyrusDownStark from '../assets/images/overworldCharacters/papyrus/doknStarw.png?url';
import iocPapyrusDownStarkTalk$info from '../assets/images/overworldCharacters/papyrus/doknStarwTalk.json?url';
import iocPapyrusDownStarkTalk from '../assets/images/overworldCharacters/papyrus/doknStarwTalk.png?url';
import iocPapyrusDown$info from '../assets/images/overworldCharacters/papyrus/down.json?url';
import iocPapyrusDown from '../assets/images/overworldCharacters/papyrus/down.png?url';
import iocPapyrusDownMad$info from '../assets/images/overworldCharacters/papyrus/downMad.json?url';
import iocPapyrusDownMad from '../assets/images/overworldCharacters/papyrus/downMad.png?url';
import iocPapyrusDownMadTalk$info from '../assets/images/overworldCharacters/papyrus/downMadTalk.json?url';
import iocPapyrusDownMadTalk from '../assets/images/overworldCharacters/papyrus/downMadTalk.png?url';
import iocPapyrusDownTalk$info from '../assets/images/overworldCharacters/papyrus/downTalk.json?url';
import iocPapyrusDownTalk from '../assets/images/overworldCharacters/papyrus/downTalk.png?url';
import iocPapyrusKnock$info from '../assets/images/overworldCharacters/papyrus/knock.json?url';
import iocPapyrusKnock from '../assets/images/overworldCharacters/papyrus/knock.png?url';
import iocPapyrusLeap$info from '../assets/images/overworldCharacters/papyrus/leap.json?url';
import iocPapyrusLeap from '../assets/images/overworldCharacters/papyrus/leap.png?url';
import iocPapyrusLeft$info from '../assets/images/overworldCharacters/papyrus/left.json?url';
import iocPapyrusLeft from '../assets/images/overworldCharacters/papyrus/left.png?url';
import iocPapyrusLeftMad$info from '../assets/images/overworldCharacters/papyrus/leftMad.json?url';
import iocPapyrusLeftMad from '../assets/images/overworldCharacters/papyrus/leftMad.png?url';
import iocPapyrusLeftMadTalk$info from '../assets/images/overworldCharacters/papyrus/leftMadTalk.json?url';
import iocPapyrusLeftMadTalk from '../assets/images/overworldCharacters/papyrus/leftMadTalk.png?url';
import iocPapyrusLeftTalk$info from '../assets/images/overworldCharacters/papyrus/leftTalk.json?url';
import iocPapyrusLeftTalk from '../assets/images/overworldCharacters/papyrus/leftTalk.png?url';
import iocPapyrusLeftStark$info from '../assets/images/overworldCharacters/papyrus/lektStarf.json?url';
import iocPapyrusLeftStark from '../assets/images/overworldCharacters/papyrus/lektStarf.png?url';
import iocPapyrusLeftStarkTalk$info from '../assets/images/overworldCharacters/papyrus/lektStarfTalk.json?url';
import iocPapyrusLeftStarkTalk from '../assets/images/overworldCharacters/papyrus/lektStarfTalk.png?url';
import iocPapyrusPresent$info from '../assets/images/overworldCharacters/papyrus/present.json?url';
import iocPapyrusPresent from '../assets/images/overworldCharacters/papyrus/present.png?url';
import iocPapyrusPresent2$info from '../assets/images/overworldCharacters/papyrus/present2.json?url';
import iocPapyrusPresent2 from '../assets/images/overworldCharacters/papyrus/present2.png?url';
import iocPapyrusRight$info from '../assets/images/overworldCharacters/papyrus/right.json?url';
import iocPapyrusRight from '../assets/images/overworldCharacters/papyrus/right.png?url';
import iocPapyrusRightMad$info from '../assets/images/overworldCharacters/papyrus/rightMad.json?url';
import iocPapyrusRightMad from '../assets/images/overworldCharacters/papyrus/rightMad.png?url';
import iocPapyrusRightMadTalk$info from '../assets/images/overworldCharacters/papyrus/rightMadTalk.json?url';
import iocPapyrusRightMadTalk from '../assets/images/overworldCharacters/papyrus/rightMadTalk.png?url';
import iocPapyrusRightTalk$info from '../assets/images/overworldCharacters/papyrus/rightTalk.json?url';
import iocPapyrusRightTalk from '../assets/images/overworldCharacters/papyrus/rightTalk.png?url';
import iocPapyrusRightStark$info from '../assets/images/overworldCharacters/papyrus/rikhtStarg.json?url';
import iocPapyrusRightStark from '../assets/images/overworldCharacters/papyrus/rikhtStarg.png?url';
import iocPapyrusRightStarkTalk$info from '../assets/images/overworldCharacters/papyrus/rikhtStargTalk.json?url';
import iocPapyrusRightStarkTalk from '../assets/images/overworldCharacters/papyrus/rikhtStargTalk.png?url';
import iocPapyrusStomp$info from '../assets/images/overworldCharacters/papyrus/stomp.json?url';
import iocPapyrusStomp from '../assets/images/overworldCharacters/papyrus/stomp.png?url';
import iocPapyrusUp$info from '../assets/images/overworldCharacters/papyrus/up.json?url';
import iocPapyrusUp from '../assets/images/overworldCharacters/papyrus/up.png?url';
import iocSansDown$info from '../assets/images/overworldCharacters/sans/down.json?url';
import iocSansDown from '../assets/images/overworldCharacters/sans/down.png?url';
import iocSansHandshake$info from '../assets/images/overworldCharacters/sans/handshake.json?url';
import iocSansHandshake from '../assets/images/overworldCharacters/sans/handshake.png?url';
import iocSansLeft$info from '../assets/images/overworldCharacters/sans/left.json?url';
import iocSansLeft from '../assets/images/overworldCharacters/sans/left.png?url';
import iocSansRight$info from '../assets/images/overworldCharacters/sans/right.json?url';
import iocSansRight from '../assets/images/overworldCharacters/sans/right.png?url';
import iocSansShrug from '../assets/images/overworldCharacters/sans/shrug.png?url';
import iocSansSleep$info from '../assets/images/overworldCharacters/sans/sleep.json?url';
import iocSansSleep from '../assets/images/overworldCharacters/sans/sleep.png?url';
import iocSansStool from '../assets/images/overworldCharacters/sans/stool.png?url';
import iocSansStoolComb$info from '../assets/images/overworldCharacters/sans/stoolComb.json?url';
import iocSansStoolComb from '../assets/images/overworldCharacters/sans/stoolComb.png?url';
import iocSansStoolLeft from '../assets/images/overworldCharacters/sans/stoolLeft.png?url';
import iocSansStoolScratch$info from '../assets/images/overworldCharacters/sans/stoolScratch.json?url';
import iocSansStoolScratch from '../assets/images/overworldCharacters/sans/stoolScratch.png?url';
import iocSansTrombone$info from '../assets/images/overworldCharacters/sans/trombone.json?url';
import iocSansTrombone from '../assets/images/overworldCharacters/sans/trombone.png?url';
import iocSansUp$info from '../assets/images/overworldCharacters/sans/up.json?url';
import iocSansUp from '../assets/images/overworldCharacters/sans/up.png?url';
import iocSansWink from '../assets/images/overworldCharacters/sans/wink.png?url';
import iocTemmieLeft$info from '../assets/images/overworldCharacters/temmie/temmieLeft.json?url';
import iocTemmieLeft from '../assets/images/overworldCharacters/temmie/temmieLeft.png?url';
import iocTemmieLeftTalk$info from '../assets/images/overworldCharacters/temmie/temmieLeftTalk.json?url';
import iocTemmieLeftTalk from '../assets/images/overworldCharacters/temmie/temmieLeftTalk.png?url';
import iocTemmieRight$info from '../assets/images/overworldCharacters/temmie/temmieRight.json?url';
import iocTemmieRight from '../assets/images/overworldCharacters/temmie/temmieRight.png?url';
import iocTemmieRightTalk$info from '../assets/images/overworldCharacters/temmie/temmieRightTalk.json?url';
import iocTemmieRightTalk from '../assets/images/overworldCharacters/temmie/temmieRightTalk.png?url';
import iocTorielDown$info from '../assets/images/overworldCharacters/toriel/down.json?url';
import iocTorielDown from '../assets/images/overworldCharacters/toriel/down.png?url';
import iocTorielHandholdDown$info from '../assets/images/overworldCharacters/toriel/downHandhold.json?url';
import iocTorielHandholdDown from '../assets/images/overworldCharacters/toriel/downHandhold.png?url';
import iocTorielDownTalk$info from '../assets/images/overworldCharacters/toriel/downTalk.json?url';
import iocTorielDownTalk from '../assets/images/overworldCharacters/toriel/downTalk.png?url';
import iocTorielHug$info from '../assets/images/overworldCharacters/toriel/hug.json?url';
import iocTorielHug from '../assets/images/overworldCharacters/toriel/hug.png?url';
import iocTorielLeft$info from '../assets/images/overworldCharacters/toriel/left.json?url';
import iocTorielLeft from '../assets/images/overworldCharacters/toriel/left.png?url';
import iocTorielHandholdLeft$info from '../assets/images/overworldCharacters/toriel/leftHandhold.json?url';
import iocTorielHandholdLeft from '../assets/images/overworldCharacters/toriel/leftHandhold.png?url';
import iocTorielLeftTalk$info from '../assets/images/overworldCharacters/toriel/leftTalk.json?url';
import iocTorielLeftTalk from '../assets/images/overworldCharacters/toriel/leftTalk.png?url';
import iocTorielPhone$info from '../assets/images/overworldCharacters/toriel/phone.json?url';
import iocTorielPhone from '../assets/images/overworldCharacters/toriel/phone.png?url';
import iocTorielPhoneTalk$info from '../assets/images/overworldCharacters/toriel/phoneTalk.json?url';
import iocTorielPhoneTalk from '../assets/images/overworldCharacters/toriel/phoneTalk.png?url';
import iocTorielRight$info from '../assets/images/overworldCharacters/toriel/right.json?url';
import iocTorielRight from '../assets/images/overworldCharacters/toriel/right.png?url';
import iocTorielHandholdRight$info from '../assets/images/overworldCharacters/toriel/rightHandhold.json?url';
import iocTorielHandholdRight from '../assets/images/overworldCharacters/toriel/rightHandhold.png?url';
import iocTorielRightTalk$info from '../assets/images/overworldCharacters/toriel/rightTalk.json?url';
import iocTorielRightTalk from '../assets/images/overworldCharacters/toriel/rightTalk.png?url';
import iocTorielRuffle$info from '../assets/images/overworldCharacters/toriel/ruffle.json?url';
import iocTorielRuffle from '../assets/images/overworldCharacters/toriel/ruffle.png?url';
import iocTorielSad$info from '../assets/images/overworldCharacters/toriel/sad.json?url';
import iocTorielSad from '../assets/images/overworldCharacters/toriel/sad.png?url';
import iocTorielUp$info from '../assets/images/overworldCharacters/toriel/up.json?url';
import iocTorielUp from '../assets/images/overworldCharacters/toriel/up.png?url';
import iocTorielHandholdUp$info from '../assets/images/overworldCharacters/toriel/upHandhold.json?url';
import iocTorielHandholdUp from '../assets/images/overworldCharacters/toriel/upHandhold.png?url';
import iocTwinkly$info from '../assets/images/overworldCharacters/twinkly/main.json?url';
import iocTwinkly from '../assets/images/overworldCharacters/twinkly/main.png?url';
import iocUndyneDateBurnt$info from '../assets/images/overworldCharacters/undyne/dateBurnt.json?url';
import iocUndyneDateBurnt from '../assets/images/overworldCharacters/undyne/dateBurnt.png?url';
import iocUndyneDateFlex$info from '../assets/images/overworldCharacters/undyne/dateFlex.json?url';
import iocUndyneDateFlex from '../assets/images/overworldCharacters/undyne/dateFlex.png?url';
import iocUndyneDateGrab$info from '../assets/images/overworldCharacters/undyne/dateGrab.json?url';
import iocUndyneDateGrab from '../assets/images/overworldCharacters/undyne/dateGrab.png?url';
import iocUndyneDateKick$info from '../assets/images/overworldCharacters/undyne/dateKick.json?url';
import iocUndyneDateKick from '../assets/images/overworldCharacters/undyne/dateKick.png?url';
import iocUndyneDateLeap$info from '../assets/images/overworldCharacters/undyne/dateLeap.json?url';
import iocUndyneDateLeap from '../assets/images/overworldCharacters/undyne/dateLeap.png?url';
import iocUndyneDateNamaste$info from '../assets/images/overworldCharacters/undyne/dateNamaste.json?url';
import iocUndyneDateNamaste from '../assets/images/overworldCharacters/undyne/dateNamaste.png?url';
import iocUndyneDateOMG$info from '../assets/images/overworldCharacters/undyne/dateOMG.json?url';
import iocUndyneDateOMG from '../assets/images/overworldCharacters/undyne/dateOMG.png?url';
import iocUndyneDateSit$info from '../assets/images/overworldCharacters/undyne/dateSit.json?url';
import iocUndyneDateSit from '../assets/images/overworldCharacters/undyne/dateSit.png?url';
import iocUndyneDateStomp$info from '../assets/images/overworldCharacters/undyne/dateStomp.json?url';
import iocUndyneDateStomp from '../assets/images/overworldCharacters/undyne/dateStomp.png?url';
import iocUndyneDateStompTomato$info from '../assets/images/overworldCharacters/undyne/dateStompTomato.json?url';
import iocUndyneDateStompTomato from '../assets/images/overworldCharacters/undyne/dateStompTomato.png?url';
import iocUndyneDateThrow$info from '../assets/images/overworldCharacters/undyne/dateThrow.json?url';
import iocUndyneDateThrow from '../assets/images/overworldCharacters/undyne/dateThrow.png?url';
import iocUndyneDateThrowTalk$info from '../assets/images/overworldCharacters/undyne/dateThrowTalk.json?url';
import iocUndyneDateThrowTalk from '../assets/images/overworldCharacters/undyne/dateThrowTalk.png?url';
import iocUndyneDateTomato$info from '../assets/images/overworldCharacters/undyne/dateTomato.json?url';
import iocUndyneDateTomato from '../assets/images/overworldCharacters/undyne/dateTomato.png?url';
import iocUndyneDateUppercut$info from '../assets/images/overworldCharacters/undyne/dateUppercut.json?url';
import iocUndyneDateUppercut from '../assets/images/overworldCharacters/undyne/dateUppercut.png?url';
import iocUndyneDive$info from '../assets/images/overworldCharacters/undyne/dive.json?url';
import iocUndyneDive from '../assets/images/overworldCharacters/undyne/dive.png?url';
import iocUndyneDown$info from '../assets/images/overworldCharacters/undyne/down.json?url';
import iocUndyneDown from '../assets/images/overworldCharacters/undyne/down.png?url';
import iocUndyneDownArmor$info from '../assets/images/overworldCharacters/undyne/downArmor.json?url';
import iocUndyneDownArmor from '../assets/images/overworldCharacters/undyne/downArmor.png?url';
import iocUndyneDownArmorSpear$info from '../assets/images/overworldCharacters/undyne/downArmorSpear.json?url';
import iocUndyneDownArmorSpear from '../assets/images/overworldCharacters/undyne/downArmorSpear.png?url';
import iocUndyneDownArmorWalk$info from '../assets/images/overworldCharacters/undyne/downArmorWalk.json?url';
import iocUndyneDownArmorWalk from '../assets/images/overworldCharacters/undyne/downArmorWalk.png?url';
import iocUndyneDownDate$info from '../assets/images/overworldCharacters/undyne/downDate.json?url';
import iocUndyneDownDate from '../assets/images/overworldCharacters/undyne/downDate.png?url';
import iocUndyneDownDateTalk$info from '../assets/images/overworldCharacters/undyne/downDateTalk.json?url';
import iocUndyneDownDateTalk from '../assets/images/overworldCharacters/undyne/downDateTalk.png?url';
import iocUndyneDownStoic$info from '../assets/images/overworldCharacters/undyne/downStoic.json?url';
import iocUndyneDownStoic from '../assets/images/overworldCharacters/undyne/downStoic.png?url';
import iocUndyneDownStoicTalk$info from '../assets/images/overworldCharacters/undyne/downStoicTalk.json?url';
import iocUndyneDownStoicTalk from '../assets/images/overworldCharacters/undyne/downStoicTalk.png?url';
import iocUndyneDownTalk$info from '../assets/images/overworldCharacters/undyne/downTalk.json?url';
import iocUndyneDownTalk from '../assets/images/overworldCharacters/undyne/downTalk.png?url';
import iocUndyneFallen from '../assets/images/overworldCharacters/undyne/fallen.png?url';
import iocUndyneGrabKidd$info from '../assets/images/overworldCharacters/undyne/grabKidd.json?url';
import iocUndyneGrabKidd from '../assets/images/overworldCharacters/undyne/grabKidd.png?url';
import iocUndyneKick$info from '../assets/images/overworldCharacters/undyne/kick.json?url';
import iocUndyneKick from '../assets/images/overworldCharacters/undyne/kick.png?url';
import iocUndyneLeft$info from '../assets/images/overworldCharacters/undyne/left.json?url';
import iocUndyneLeft from '../assets/images/overworldCharacters/undyne/left.png?url';
import iocUndyneLeftArmor$info from '../assets/images/overworldCharacters/undyne/leftArmor.json?url';
import iocUndyneLeftArmor from '../assets/images/overworldCharacters/undyne/leftArmor.png?url';
import iocUndyneLeftArmorJetpack$info from '../assets/images/overworldCharacters/undyne/leftArmorJetpack.json?url';
import iocUndyneLeftArmorJetpack from '../assets/images/overworldCharacters/undyne/leftArmorJetpack.png?url';
import iocUndyneLeftArmorWalk$info from '../assets/images/overworldCharacters/undyne/leftArmorWalk.json?url';
import iocUndyneLeftArmorWalk from '../assets/images/overworldCharacters/undyne/leftArmorWalk.png?url';
import iocUndyneLeftDate$info from '../assets/images/overworldCharacters/undyne/leftDate.json?url';
import iocUndyneLeftDate from '../assets/images/overworldCharacters/undyne/leftDate.png?url';
import iocUndyneLeftDateTalk$info from '../assets/images/overworldCharacters/undyne/leftDateTalk.json?url';
import iocUndyneLeftDateTalk from '../assets/images/overworldCharacters/undyne/leftDateTalk.png?url';
import iocUndyneLeftStoic$info from '../assets/images/overworldCharacters/undyne/leftStoic.json?url';
import iocUndyneLeftStoic from '../assets/images/overworldCharacters/undyne/leftStoic.png?url';
import iocUndyneLeftStoicTalk$info from '../assets/images/overworldCharacters/undyne/leftStoicTalk.json?url';
import iocUndyneLeftStoicTalk from '../assets/images/overworldCharacters/undyne/leftStoicTalk.png?url';
import iocUndyneLeftTalk$info from '../assets/images/overworldCharacters/undyne/leftTalk.json?url';
import iocUndyneLeftTalk from '../assets/images/overworldCharacters/undyne/leftTalk.png?url';
import iocUndynePhone from '../assets/images/overworldCharacters/undyne/phone.png?url';
import iocUndynePullKidd$info from '../assets/images/overworldCharacters/undyne/pullKidd.json?url';
import iocUndynePullKidd from '../assets/images/overworldCharacters/undyne/pullKidd.png?url';
import iocUndyneRight$info from '../assets/images/overworldCharacters/undyne/right.json?url';
import iocUndyneRight from '../assets/images/overworldCharacters/undyne/right.png?url';
import iocUndyneRightArmor$info from '../assets/images/overworldCharacters/undyne/rightArmor.json?url';
import iocUndyneRightArmor from '../assets/images/overworldCharacters/undyne/rightArmor.png?url';
import iocUndyneRightArmorJetpack$info from '../assets/images/overworldCharacters/undyne/rightArmorJetpack.json?url';
import iocUndyneRightArmorJetpack from '../assets/images/overworldCharacters/undyne/rightArmorJetpack.png?url';
import iocUndyneRightArmorWalk$info from '../assets/images/overworldCharacters/undyne/rightArmorWalk.json?url';
import iocUndyneRightArmorWalk from '../assets/images/overworldCharacters/undyne/rightArmorWalk.png?url';
import iocUndyneRightDate$info from '../assets/images/overworldCharacters/undyne/rightDate.json?url';
import iocUndyneRightDate from '../assets/images/overworldCharacters/undyne/rightDate.png?url';
import iocUndyneRightDateTalk$info from '../assets/images/overworldCharacters/undyne/rightDateTalk.json?url';
import iocUndyneRightDateTalk from '../assets/images/overworldCharacters/undyne/rightDateTalk.png?url';
import iocUndyneRightStoic$info from '../assets/images/overworldCharacters/undyne/rightStoic.json?url';
import iocUndyneRightStoic from '../assets/images/overworldCharacters/undyne/rightStoic.png?url';
import iocUndyneRightStoicTalk$info from '../assets/images/overworldCharacters/undyne/rightStoicTalk.json?url';
import iocUndyneRightStoicTalk from '../assets/images/overworldCharacters/undyne/rightStoicTalk.png?url';
import iocUndyneRightTalk$info from '../assets/images/overworldCharacters/undyne/rightTalk.json?url';
import iocUndyneRightTalk from '../assets/images/overworldCharacters/undyne/rightTalk.png?url';
import iocUndyneBrandish$info from '../assets/images/overworldCharacters/undyne/undyneBrandish.json?url';
import iocUndyneBrandish from '../assets/images/overworldCharacters/undyne/undyneBrandish.png?url';
import iocUndyneTurn$info from '../assets/images/overworldCharacters/undyne/undyneTurn.json?url';
import iocUndyneTurn from '../assets/images/overworldCharacters/undyne/undyneTurn.png?url';
import iocUndyneUp$info from '../assets/images/overworldCharacters/undyne/up.json?url';
import iocUndyneUp from '../assets/images/overworldCharacters/undyne/up.png?url';
import iocUndyneUpArmor$info from '../assets/images/overworldCharacters/undyne/upArmor.json?url';
import iocUndyneUpArmor from '../assets/images/overworldCharacters/undyne/upArmor.png?url';
import iocUndyneUpArmorJetpack$info from '../assets/images/overworldCharacters/undyne/upArmorJetpack.json?url';
import iocUndyneUpArmorJetpack from '../assets/images/overworldCharacters/undyne/upArmorJetpack.png?url';
import iocUndyneUpArmorWalk$info from '../assets/images/overworldCharacters/undyne/upArmorWalk.json?url';
import iocUndyneUpArmorWalk from '../assets/images/overworldCharacters/undyne/upArmorWalk.png?url';
import iocUndyneUpDate$info from '../assets/images/overworldCharacters/undyne/upDate.json?url';
import iocUndyneUpDate from '../assets/images/overworldCharacters/undyne/upDate.png?url';
import iocUndyneUpDateTalk$info from '../assets/images/overworldCharacters/undyne/upDateTalk.json?url';
import iocUndyneUpDateTalk from '../assets/images/overworldCharacters/undyne/upDateTalk.png?url';
import iocUndyneUpJetpack$info from '../assets/images/overworldCharacters/undyne/upJetpack.json?url';
import iocUndyneUpJetpack from '../assets/images/overworldCharacters/undyne/upJetpack.png?url';
import iocUndyneUpTalk$info from '../assets/images/overworldCharacters/undyne/upTalk.json?url';
import iocUndyneUpTalk from '../assets/images/overworldCharacters/undyne/upTalk.png?url';
import ionAAngery$info from '../assets/images/overworldNPCs/aerialis/angery.json?url';
import ionAAngery from '../assets/images/overworldNPCs/aerialis/angery.png?url';
import ionAArtgirl$info from '../assets/images/overworldNPCs/aerialis/artgirl.json?url';
import ionAArtgirl from '../assets/images/overworldNPCs/aerialis/artgirl.png?url';
import ionABedreceptionist$info from '../assets/images/overworldNPCs/aerialis/bedreceptionist.json?url';
import ionABedreceptionist from '../assets/images/overworldNPCs/aerialis/bedreceptionist.png?url';
import ionABlack$info from '../assets/images/overworldNPCs/aerialis/black.json?url';
import ionABlack from '../assets/images/overworldNPCs/aerialis/black.png?url';
import ionABlackfire$info from '../assets/images/overworldNPCs/aerialis/blackfire.json?url';
import ionABlackfire from '../assets/images/overworldNPCs/aerialis/blackfire.png?url';
import ionABoomer$info from '../assets/images/overworldNPCs/aerialis/boomer.json?url';
import ionABoomer from '../assets/images/overworldNPCs/aerialis/boomer.png?url';
import ionABowtie$info from '../assets/images/overworldNPCs/aerialis/bowtie.json?url';
import ionABowtie from '../assets/images/overworldNPCs/aerialis/bowtie.png?url';
import ionABusinessdude$info from '../assets/images/overworldNPCs/aerialis/businessdude.json?url';
import ionABusinessdude from '../assets/images/overworldNPCs/aerialis/businessdude.png?url';
import ionACharles$info from '../assets/images/overworldNPCs/aerialis/charles.json?url';
import ionACharles from '../assets/images/overworldNPCs/aerialis/charles.png?url';
import ionAClamguyBack$info from '../assets/images/overworldNPCs/aerialis/clamguyBack.json?url';
import ionAClamguyBack from '../assets/images/overworldNPCs/aerialis/clamguyBack.png?url';
import ionAClamguyFront$info from '../assets/images/overworldNPCs/aerialis/clamguyFront.json?url';
import ionAClamguyFront from '../assets/images/overworldNPCs/aerialis/clamguyFront.png?url';
import ionADarkman$info from '../assets/images/overworldNPCs/aerialis/darkman.json?url';
import ionADarkman from '../assets/images/overworldNPCs/aerialis/darkman.png?url';
import ionADiamond1$info from '../assets/images/overworldNPCs/aerialis/diamond1.json?url';
import ionADiamond1 from '../assets/images/overworldNPCs/aerialis/diamond1.png?url';
import ionADiamond2$info from '../assets/images/overworldNPCs/aerialis/diamond2.json?url';
import ionADiamond2 from '../assets/images/overworldNPCs/aerialis/diamond2.png?url';
import ionADragon$info from '../assets/images/overworldNPCs/aerialis/dragon.json?url';
import ionADragon from '../assets/images/overworldNPCs/aerialis/dragon.png?url';
import ionADrakedad$info from '../assets/images/overworldNPCs/aerialis/drakedad.json?url';
import ionADrakedad from '../assets/images/overworldNPCs/aerialis/drakedad.png?url';
import ionADrakemom$info from '../assets/images/overworldNPCs/aerialis/drakemom.json?url';
import ionADrakemom from '../assets/images/overworldNPCs/aerialis/drakemom.png?url';
import ionAFoodreceptionist$info from '../assets/images/overworldNPCs/aerialis/foodreceptionist.json?url';
import ionAFoodreceptionist from '../assets/images/overworldNPCs/aerialis/foodreceptionist.png?url';
import ionAGiftbear$info from '../assets/images/overworldNPCs/aerialis/giftbear.json?url';
import ionAGiftbear from '../assets/images/overworldNPCs/aerialis/giftbear.png?url';
import ionAGreenfire$info from '../assets/images/overworldNPCs/aerialis/greenfire.json?url';
import ionAGreenfire from '../assets/images/overworldNPCs/aerialis/greenfire.png?url';
import ionAGyftrot$info from '../assets/images/overworldNPCs/aerialis/gyftrot.json?url';
import ionAGyftrot from '../assets/images/overworldNPCs/aerialis/gyftrot.png?url';
import ionAHarpy$info from '../assets/images/overworldNPCs/aerialis/harpy.json?url';
import ionAHarpy from '../assets/images/overworldNPCs/aerialis/harpy.png?url';
import ionAHeats$info from '../assets/images/overworldNPCs/aerialis/heats.json?url';
import ionAHeats from '../assets/images/overworldNPCs/aerialis/heats.png?url';
import ionAMoon$info from '../assets/images/overworldNPCs/aerialis/moon.json?url';
import ionAMoon from '../assets/images/overworldNPCs/aerialis/moon.png?url';
import ionAOni$info from '../assets/images/overworldNPCs/aerialis/oni.json?url';
import ionAOni from '../assets/images/overworldNPCs/aerialis/oni.png?url';
import ionAOnionsanArmLeft from '../assets/images/overworldNPCs/aerialis/onionsanArmLeft.png?url';
import ionAOnionsanArmOut from '../assets/images/overworldNPCs/aerialis/onionsanArmOut.png?url';
import ionAOnionsanArmWave from '../assets/images/overworldNPCs/aerialis/onionsanArmWave.png?url';
import ionAOnionsanKawaii$info from '../assets/images/overworldNPCs/aerialis/onionsanKawaii.json?url';
import ionAOnionsanKawaii from '../assets/images/overworldNPCs/aerialis/onionsanKawaii.png?url';
import ionAOnionsanWistful from '../assets/images/overworldNPCs/aerialis/onionsanWistful.png?url';
import ionAOnionsanYhear from '../assets/images/overworldNPCs/aerialis/onionsanYhear.png?url';
import ionAProskater$info from '../assets/images/overworldNPCs/aerialis/proskater.json?url';
import ionAProskater from '../assets/images/overworldNPCs/aerialis/proskater.png?url';
import ionAPyrope$info from '../assets/images/overworldNPCs/aerialis/pyrope.json?url';
import ionAPyrope from '../assets/images/overworldNPCs/aerialis/pyrope.png?url';
import ionAReg$info from '../assets/images/overworldNPCs/aerialis/reg.json?url';
import ionAReg from '../assets/images/overworldNPCs/aerialis/reg.png?url';
import ionARgbugDown$info from '../assets/images/overworldNPCs/aerialis/rgbugDown.json?url';
import ionARgbugDown from '../assets/images/overworldNPCs/aerialis/rgbugDown.png?url';
import ionARgbugLeft$info from '../assets/images/overworldNPCs/aerialis/rgbugLeft.json?url';
import ionARgbugLeft from '../assets/images/overworldNPCs/aerialis/rgbugLeft.png?url';
import ionARgbugRight$info from '../assets/images/overworldNPCs/aerialis/rgbugRight.json?url';
import ionARgbugRight from '../assets/images/overworldNPCs/aerialis/rgbugRight.png?url';
import ionARgcatDown$info from '../assets/images/overworldNPCs/aerialis/rgcatDown.json?url';
import ionARgcatDown from '../assets/images/overworldNPCs/aerialis/rgcatDown.png?url';
import ionARgcatLeft$info from '../assets/images/overworldNPCs/aerialis/rgcatLeft.json?url';
import ionARgcatLeft from '../assets/images/overworldNPCs/aerialis/rgcatLeft.png?url';
import ionARgcatRight$info from '../assets/images/overworldNPCs/aerialis/rgcatRight.json?url';
import ionARgcatRight from '../assets/images/overworldNPCs/aerialis/rgcatRight.png?url';
import ionARgdragonDown$info from '../assets/images/overworldNPCs/aerialis/rgdragonDown.json?url';
import ionARgdragonDown from '../assets/images/overworldNPCs/aerialis/rgdragonDown.png?url';
import ionARgdragonLeft$info from '../assets/images/overworldNPCs/aerialis/rgdragonLeft.json?url';
import ionARgdragonLeft from '../assets/images/overworldNPCs/aerialis/rgdragonLeft.png?url';
import ionARgdragonRight$info from '../assets/images/overworldNPCs/aerialis/rgdragonRight.json?url';
import ionARgdragonRight from '../assets/images/overworldNPCs/aerialis/rgdragonRight.png?url';
import ionARgrabbitDown$info from '../assets/images/overworldNPCs/aerialis/rgrabbitDown.json?url';
import ionARgrabbitDown from '../assets/images/overworldNPCs/aerialis/rgrabbitDown.png?url';
import ionARgrabbitLeft$info from '../assets/images/overworldNPCs/aerialis/rgrabbitLeft.json?url';
import ionARgrabbitLeft from '../assets/images/overworldNPCs/aerialis/rgrabbitLeft.png?url';
import ionARgrabbitRight$info from '../assets/images/overworldNPCs/aerialis/rgrabbitRight.json?url';
import ionARgrabbitRight from '../assets/images/overworldNPCs/aerialis/rgrabbitRight.png?url';
import ionARinger$info from '../assets/images/overworldNPCs/aerialis/ringer.json?url';
import ionARinger from '../assets/images/overworldNPCs/aerialis/ringer.png?url';
import ionASlimeFather$info from '../assets/images/overworldNPCs/aerialis/slime_father.json?url';
import ionASlimeFather from '../assets/images/overworldNPCs/aerialis/slime_father.png?url';
import ionASlimeKid1$info from '../assets/images/overworldNPCs/aerialis/slime_kid1.json?url';
import ionASlimeKid1 from '../assets/images/overworldNPCs/aerialis/slime_kid1.png?url';
import ionASlimeKid2$info from '../assets/images/overworldNPCs/aerialis/slime_kid2.json?url';
import ionASlimeKid2 from '../assets/images/overworldNPCs/aerialis/slime_kid2.png?url';
import ionASlimeMother$info from '../assets/images/overworldNPCs/aerialis/slime_mother.json?url';
import ionASlimeMother from '../assets/images/overworldNPCs/aerialis/slime_mother.png?url';
import ionASosorryBack$info from '../assets/images/overworldNPCs/aerialis/sosorryBack.json?url';
import ionASosorryBack from '../assets/images/overworldNPCs/aerialis/sosorryBack.png?url';
import ionASosorryFront$info from '../assets/images/overworldNPCs/aerialis/sosorryFront.json?url';
import ionASosorryFront from '../assets/images/overworldNPCs/aerialis/sosorryFront.png?url';
import ionAThisisnotabomb$info from '../assets/images/overworldNPCs/aerialis/thisisnotabomb.json?url';
import ionAThisisnotabomb from '../assets/images/overworldNPCs/aerialis/thisisnotabomb.png?url';
import ionAVulkin$info from '../assets/images/overworldNPCs/aerialis/vulkin.json?url';
import ionAVulkin from '../assets/images/overworldNPCs/aerialis/vulkin.png?url';
import ionAWoshua$info from '../assets/images/overworldNPCs/aerialis/woshua.json?url';
import ionAWoshua from '../assets/images/overworldNPCs/aerialis/woshua.png?url';
import ionF86$info from '../assets/images/overworldNPCs/foundry/86.json?url';
import ionF86 from '../assets/images/overworldNPCs/foundry/86.png?url';
import ionFBird$info from '../assets/images/overworldNPCs/foundry/bird.json?url';
import ionFBird from '../assets/images/overworldNPCs/foundry/bird.png?url';
import ionFBirdCry$info from '../assets/images/overworldNPCs/foundry/birdCry.json?url';
import ionFBirdCry from '../assets/images/overworldNPCs/foundry/birdCry.png?url';
import ionFBirdFly$info from '../assets/images/overworldNPCs/foundry/birdFly.json?url';
import ionFBirdFly from '../assets/images/overworldNPCs/foundry/birdFly.png?url';
import ionFClamgirl1$info from '../assets/images/overworldNPCs/foundry/clamgirl1.json?url';
import ionFClamgirl1 from '../assets/images/overworldNPCs/foundry/clamgirl1.png?url';
import ionFClamgirl2$info from '../assets/images/overworldNPCs/foundry/clamgirl2.json?url';
import ionFClamgirl2 from '../assets/images/overworldNPCs/foundry/clamgirl2.png?url';
import ionFEchodude$info from '../assets/images/overworldNPCs/foundry/echodude.json?url';
import ionFEchodude from '../assets/images/overworldNPCs/foundry/echodude.png?url';
import ionFLongsy$info from '../assets/images/overworldNPCs/foundry/longsy.json?url';
import ionFLongsy from '../assets/images/overworldNPCs/foundry/longsy.png?url';
import ionFMuffet$info from '../assets/images/overworldNPCs/foundry/muffet.json?url';
import ionFMuffet from '../assets/images/overworldNPCs/foundry/muffet.png?url';
import ionFMushroomdance1$info from '../assets/images/overworldNPCs/foundry/mushroomdance1.json?url';
import ionFMushroomdance1 from '../assets/images/overworldNPCs/foundry/mushroomdance1.png?url';
import ionFMushroomdance2$info from '../assets/images/overworldNPCs/foundry/mushroomdance2.json?url';
import ionFMushroomdance2 from '../assets/images/overworldNPCs/foundry/mushroomdance2.png?url';
import ionFMushroomdance3$info from '../assets/images/overworldNPCs/foundry/mushroomdance3.json?url';
import ionFMushroomdance3 from '../assets/images/overworldNPCs/foundry/mushroomdance3.png?url';
import ionFShortsy$info from '../assets/images/overworldNPCs/foundry/shortsy.json?url';
import ionFShortsy from '../assets/images/overworldNPCs/foundry/shortsy.png?url';
import ionFSnail1$info from '../assets/images/overworldNPCs/foundry/snail1.json?url';
import ionFSnail1 from '../assets/images/overworldNPCs/foundry/snail1.png?url';
import ionFSnail2$info from '../assets/images/overworldNPCs/foundry/snail2.json?url';
import ionFSnail2 from '../assets/images/overworldNPCs/foundry/snail2.png?url';
import ionFSnail3 from '../assets/images/overworldNPCs/foundry/snail3.png?url';
import ionFSpider$info from '../assets/images/overworldNPCs/foundry/spider.json?url';
import ionFSpider from '../assets/images/overworldNPCs/foundry/spider.png?url';
import ionFStarkiller$info from '../assets/images/overworldNPCs/foundry/starkiller.json?url';
import ionFStarkiller from '../assets/images/overworldNPCs/foundry/starkiller.png?url';
import ionOChairiel$info from '../assets/images/overworldNPCs/outlands/chairiel.json?url';
import ionOChairiel from '../assets/images/overworldNPCs/outlands/chairiel.png?url';
import ionOChairielTalk$info from '../assets/images/overworldNPCs/outlands/chairielTalk.json?url';
import ionOChairielTalk from '../assets/images/overworldNPCs/outlands/chairielTalk.png?url';
import ionODummy$info from '../assets/images/overworldNPCs/outlands/dummy.json?url';
import ionODummy from '../assets/images/overworldNPCs/outlands/dummy.png?url';
import ionODummyBlush$info from '../assets/images/overworldNPCs/outlands/dummyBlush.json?url';
import ionODummyBlush from '../assets/images/overworldNPCs/outlands/dummyBlush.png?url';
import ionODummyGlad$info from '../assets/images/overworldNPCs/outlands/dummyGlad.json?url';
import ionODummyGlad from '../assets/images/overworldNPCs/outlands/dummyGlad.png?url';
import ionODummyMad$info from '../assets/images/overworldNPCs/outlands/dummyMad.json?url';
import ionODummyMad from '../assets/images/overworldNPCs/outlands/dummyMad.png?url';
import ionODummyRage$info from '../assets/images/overworldNPCs/outlands/dummyRage.json?url';
import ionODummyRage from '../assets/images/overworldNPCs/outlands/dummyRage.png?url';
import ionOFroggit$info from '../assets/images/overworldNPCs/outlands/froggit.json?url';
import ionOFroggit from '../assets/images/overworldNPCs/outlands/froggit.png?url';
import ionOGonerfrisk$info from '../assets/images/overworldNPCs/outlands/gonerfrisk.json?url';
import ionOGonerfrisk from '../assets/images/overworldNPCs/outlands/gonerfrisk.png?url';
import ionOLoox$info from '../assets/images/overworldNPCs/outlands/loox.json?url';
import ionOLoox from '../assets/images/overworldNPCs/outlands/loox.png?url';
import ionOManana$info from '../assets/images/overworldNPCs/outlands/manana.json?url';
import ionOManana from '../assets/images/overworldNPCs/outlands/manana.png?url';
import ionOMananaBack$info from '../assets/images/overworldNPCs/outlands/mananaBack.json?url';
import ionOMananaBack from '../assets/images/overworldNPCs/outlands/mananaBack.png?url';
import ionOMushy$info from '../assets/images/overworldNPCs/outlands/mushy.json?url';
import ionOMushy from '../assets/images/overworldNPCs/outlands/mushy.png?url';
import ionOPartysupervisor$info from '../assets/images/overworldNPCs/outlands/partysupervisor.json?url';
import ionOPartysupervisor from '../assets/images/overworldNPCs/outlands/partysupervisor.png?url';
import ionOPlugbelly$info from '../assets/images/overworldNPCs/outlands/plugbelly.json?url';
import ionOPlugbelly from '../assets/images/overworldNPCs/outlands/plugbelly.png?url';
import ionOPlugbellyBack$info from '../assets/images/overworldNPCs/outlands/plugbellyBack.json?url';
import ionOPlugbellyBack from '../assets/images/overworldNPCs/outlands/plugbellyBack.png?url';
import ionOSilencio$info from '../assets/images/overworldNPCs/outlands/silencio.json?url';
import ionOSilencio from '../assets/images/overworldNPCs/outlands/silencio.png?url';
import ionOSilencioBack$info from '../assets/images/overworldNPCs/outlands/silencioBack.json?url';
import ionOSilencioBack from '../assets/images/overworldNPCs/outlands/silencioBack.png?url';
import ionOSoup$info from '../assets/images/overworldNPCs/outlands/soup.json?url';
import ionOSoup from '../assets/images/overworldNPCs/outlands/soup.png?url';
import ionOSoupBack$info from '../assets/images/overworldNPCs/outlands/soupBack.json?url';
import ionOSoupBack from '../assets/images/overworldNPCs/outlands/soupBack.png?url';
import ionOSteaksalesman$info from '../assets/images/overworldNPCs/outlands/steaksalesman.json?url';
import ionOSteaksalesman from '../assets/images/overworldNPCs/outlands/steaksalesman.png?url';
import ionOSteaksalesmanBack$info from '../assets/images/overworldNPCs/outlands/steaksalesmanBack.json?url';
import ionOSteaksalesmanBack from '../assets/images/overworldNPCs/outlands/steaksalesmanBack.png?url';
import ionOTomCryme$info from '../assets/images/overworldNPCs/outlands/tom_cryme.json?url';
import ionOTomCryme from '../assets/images/overworldNPCs/outlands/tom_cryme.png?url';
import ionOTomCrymeGeno$info from '../assets/images/overworldNPCs/outlands/tom_cryme_geno.json?url';
import ionOTomCrymeGeno from '../assets/images/overworldNPCs/outlands/tom_cryme_geno.png?url';
import ionS98$info from '../assets/images/overworldNPCs/starton/98.json?url';
import ionS98 from '../assets/images/overworldNPCs/starton/98.png?url';
import ionSBeautifulfish$info from '../assets/images/overworldNPCs/starton/beautifulfish.json?url';
import ionSBeautifulfish from '../assets/images/overworldNPCs/starton/beautifulfish.png?url';
import ionSBigmouth$info from '../assets/images/overworldNPCs/starton/bigmouth.json?url';
import ionSBigmouth from '../assets/images/overworldNPCs/starton/bigmouth.png?url';
import ionSBunbun$info from '../assets/images/overworldNPCs/starton/bunbun.json?url';
import ionSBunbun from '../assets/images/overworldNPCs/starton/bunbun.png?url';
import ionSBunny$info from '../assets/images/overworldNPCs/starton/bunny.json?url';
import ionSBunny from '../assets/images/overworldNPCs/starton/bunny.png?url';
import ionSCupjake$info from '../assets/images/overworldNPCs/starton/cupjake.json?url';
import ionSCupjake from '../assets/images/overworldNPCs/starton/cupjake.png?url';
import ionSDogamy$info from '../assets/images/overworldNPCs/starton/dogamy.json?url';
import ionSDogamy from '../assets/images/overworldNPCs/starton/dogamy.png?url';
import ionSDogaressa$info from '../assets/images/overworldNPCs/starton/dogaressa.json?url';
import ionSDogaressa from '../assets/images/overworldNPCs/starton/dogaressa.png?url';
import ionSDoggo$info from '../assets/images/overworldNPCs/starton/doggo.json?url';
import ionSDoggo from '../assets/images/overworldNPCs/starton/doggo.png?url';
import ionSFaun$info from '../assets/images/overworldNPCs/starton/faun.json?url';
import ionSFaun from '../assets/images/overworldNPCs/starton/faun.png?url';
import ionSGreatdog$info from '../assets/images/overworldNPCs/starton/greatdog.json?url';
import ionSGreatdog from '../assets/images/overworldNPCs/starton/greatdog.png?url';
import ionSGreatdogHapp$info from '../assets/images/overworldNPCs/starton/greatdogHapp.json?url';
import ionSGreatdogHapp from '../assets/images/overworldNPCs/starton/greatdogHapp.png?url';
import ionSGreatdogLick$info from '../assets/images/overworldNPCs/starton/greatdogLick.json?url';
import ionSGreatdogLick from '../assets/images/overworldNPCs/starton/greatdogLick.png?url';
import ionSGrillby$info from '../assets/images/overworldNPCs/starton/grillby.json?url';
import ionSGrillby from '../assets/images/overworldNPCs/starton/grillby.png?url';
import ionSHappy$info from '../assets/images/overworldNPCs/starton/happy.json?url';
import ionSHappy from '../assets/images/overworldNPCs/starton/happy.png?url';
import ionSIcewolf$info from '../assets/images/overworldNPCs/starton/icewolf.json?url';
import ionSIcewolf from '../assets/images/overworldNPCs/starton/icewolf.png?url';
import ionSImafraidjumitebeinagang$info from '../assets/images/overworldNPCs/starton/imafraidjumitebeinagang.json?url';
import ionSImafraidjumitebeinagang from '../assets/images/overworldNPCs/starton/imafraidjumitebeinagang.png?url';
import ionSInnkeep$info from '../assets/images/overworldNPCs/starton/innkeep.json?url';
import ionSInnkeep from '../assets/images/overworldNPCs/starton/innkeep.png?url';
import ionSJoey$info from '../assets/images/overworldNPCs/starton/joey.json?url';
import ionSJoey from '../assets/images/overworldNPCs/starton/joey.png?url';
import ionSKabakk$info from '../assets/images/overworldNPCs/starton/kabakk.json?url';
import ionSKabakk from '../assets/images/overworldNPCs/starton/kabakk.png?url';
import ionSKakurolady$info from '../assets/images/overworldNPCs/starton/kakurolady.json?url';
import ionSKakurolady from '../assets/images/overworldNPCs/starton/kakurolady.png?url';
import ionSLibrarian$info from '../assets/images/overworldNPCs/starton/librarian.json?url';
import ionSLibrarian from '../assets/images/overworldNPCs/starton/librarian.png?url';
import ionSLoverboy$info from '../assets/images/overworldNPCs/starton/loverboy.json?url';
import ionSLoverboy from '../assets/images/overworldNPCs/starton/loverboy.png?url';
import ionSMoonrocks1$info from '../assets/images/overworldNPCs/starton/moonrocks1.json?url';
import ionSMoonrocks1 from '../assets/images/overworldNPCs/starton/moonrocks1.png?url';
import ionSMoonrocks2$info from '../assets/images/overworldNPCs/starton/moonrocks2.json?url';
import ionSMoonrocks2 from '../assets/images/overworldNPCs/starton/moonrocks2.png?url';
import ionSNicecream$info from '../assets/images/overworldNPCs/starton/nicecream.json?url';
import ionSNicecream from '../assets/images/overworldNPCs/starton/nicecream.png?url';
import ionSPolitics$info from '../assets/images/overworldNPCs/starton/politics.json?url';
import ionSPolitics from '../assets/images/overworldNPCs/starton/politics.png?url';
import ionSPunkhamster$info from '../assets/images/overworldNPCs/starton/punkhamster.json?url';
import ionSPunkhamster from '../assets/images/overworldNPCs/starton/punkhamster.png?url';
import ionSRabbit$info from '../assets/images/overworldNPCs/starton/rabbit.json?url';
import ionSRabbit from '../assets/images/overworldNPCs/starton/rabbit.png?url';
import ionSRedbird$info from '../assets/images/overworldNPCs/starton/redbird.json?url';
import ionSRedbird from '../assets/images/overworldNPCs/starton/redbird.png?url';
import ionRiverboi$info from '../assets/images/overworldNPCs/riverboi.json?url';
import ionRiverboi from '../assets/images/overworldNPCs/riverboi.png?url';
import ionSSnakeboi$info from '../assets/images/overworldNPCs/starton/snakeboi.json?url';
import ionSSnakeboi from '../assets/images/overworldNPCs/starton/snakeboi.png?url';
import ionSSweetie$info from '../assets/images/overworldNPCs/starton/sweetie.json?url';
import ionSSweetie from '../assets/images/overworldNPCs/starton/sweetie.png?url';
import ionSVegetoid$info from '../assets/images/overworldNPCs/starton/vegetoid.json?url';
import ionSVegetoid from '../assets/images/overworldNPCs/starton/vegetoid.png?url';
import ionSWisconsin$info from '../assets/images/overworldNPCs/starton/wisconsin.json?url';
import ionSWisconsin from '../assets/images/overworldNPCs/starton/wisconsin.png?url';
import iooACORE$info from '../assets/images/overworldObjects/aerialis/CORE.json?url';
import iooACORE from '../assets/images/overworldObjects/aerialis/CORE.png?url';
import iooABarricade$info from '../assets/images/overworldObjects/aerialis/barricade.json?url';
import iooABarricade from '../assets/images/overworldObjects/aerialis/barricade.png?url';
import iooABeaker from '../assets/images/overworldObjects/aerialis/beaker.png?url';
import iooABeam from '../assets/images/overworldObjects/aerialis/beam.png?url';
import iooABedcounter from '../assets/images/overworldObjects/aerialis/bedcounter.png?url';
import iooABigAssDoor from '../assets/images/overworldObjects/aerialis/bigAssDoor.png?url';
import iooABom from '../assets/images/overworldObjects/aerialis/bom.png?url';
import iooABomburst$info from '../assets/images/overworldObjects/aerialis/bomburst.json?url';
import iooABomburst from '../assets/images/overworldObjects/aerialis/bomburst.png?url';
import iooABooster$info from '../assets/images/overworldObjects/aerialis/booster.json?url';
import iooABooster from '../assets/images/overworldObjects/aerialis/booster.png?url';
import iooABoosterBad$info from '../assets/images/overworldObjects/aerialis/boosterBad.json?url';
import iooABoosterBad from '../assets/images/overworldObjects/aerialis/boosterBad.png?url';
import iooABoosterStrut$info from '../assets/images/overworldObjects/aerialis/booster_strut.json?url';
import iooABoosterStrut from '../assets/images/overworldObjects/aerialis/booster_strut.png?url';
import iooACardboard from '../assets/images/overworldObjects/aerialis/cardboard.png?url';
import iooACarrier$info from '../assets/images/overworldObjects/aerialis/carrier.json?url';
import iooACarrier from '../assets/images/overworldObjects/aerialis/carrier.png?url';
import iooACheckpointOver from '../assets/images/overworldObjects/aerialis/checkpointOver.png?url';
import iooACheckpointUnder from '../assets/images/overworldObjects/aerialis/checkpointUnder.png?url';
import iooAChesstable from '../assets/images/overworldObjects/aerialis/chesstable.png?url';
import iooACompactlazerdeluxe from '../assets/images/overworldObjects/aerialis/compactlazerdeluxe.png?url';
import iooAConveyor$info from '../assets/images/overworldObjects/aerialis/conveyor.json?url';
import iooAConveyor from '../assets/images/overworldObjects/aerialis/conveyor.png?url';
import iooACorecolumn$info from '../assets/images/overworldObjects/aerialis/corecolumn.json?url';
import iooACorecolumn from '../assets/images/overworldObjects/aerialis/corecolumn.png?url';
import iooACoreswitch$info from '../assets/images/overworldObjects/aerialis/coreswitch.json?url';
import iooACoreswitch from '../assets/images/overworldObjects/aerialis/coreswitch.png?url';
import iooACorndog from '../assets/images/overworldObjects/aerialis/corndog.png?url';
import iooADeadLeaf from '../assets/images/overworldObjects/aerialis/deadLeaf.png?url';
import iooADinnertable from '../assets/images/overworldObjects/aerialis/dinnertable.png?url';
import iooADiscoball$info from '../assets/images/overworldObjects/aerialis/discoball.json?url';
import iooADiscoball from '../assets/images/overworldObjects/aerialis/discoball.png?url';
import iooADrawbridge from '../assets/images/overworldObjects/aerialis/drawbridge.png?url';
import iooADTTubes$info from '../assets/images/overworldObjects/aerialis/dt_tubes.json?url';
import iooADTTubes from '../assets/images/overworldObjects/aerialis/dt_tubes.png?url';
import iooAFakeFireStation$info from '../assets/images/overworldObjects/aerialis/fakeFireStation.json?url';
import iooAFakeFireStation from '../assets/images/overworldObjects/aerialis/fakeFireStation.png?url';
import iooAFloorsegment$info from '../assets/images/overworldObjects/aerialis/floorsegment.json?url';
import iooAFloorsegment from '../assets/images/overworldObjects/aerialis/floorsegment.png?url';
import iooAFlowertable from '../assets/images/overworldObjects/aerialis/flowertable.png?url';
import iooAFoodcounter from '../assets/images/overworldObjects/aerialis/foodcounter.png?url';
import iooAGlobe from '../assets/images/overworldObjects/aerialis/globe.png?url';
import iooAHexogen from '../assets/images/overworldObjects/aerialis/hexogen.png?url';
import iooAHotelfood$info from '../assets/images/overworldObjects/aerialis/hotelfood.json?url';
import iooAHotelfood from '../assets/images/overworldObjects/aerialis/hotelfood.png?url';
import iooALabcounter from '../assets/images/overworldObjects/aerialis/labcounter.png?url';
import iooALabtable$info from '../assets/images/overworldObjects/aerialis/labtable.json?url';
import iooALabtable from '../assets/images/overworldObjects/aerialis/labtable.png?url';
import iooALaunchpad$info from '../assets/images/overworldObjects/aerialis/launchpad.json?url';
import iooALaunchpad from '../assets/images/overworldObjects/aerialis/launchpad.png?url';
import iooALaunchpadAbove$info from '../assets/images/overworldObjects/aerialis/launchpadAbove.json?url';
import iooALaunchpadAbove from '../assets/images/overworldObjects/aerialis/launchpadAbove.png?url';
import iooAMegacarrier$info from '../assets/images/overworldObjects/aerialis/megacarrier.json?url';
import iooAMegacarrier from '../assets/images/overworldObjects/aerialis/megacarrier.png?url';
import iooAMewposter$info from '../assets/images/overworldObjects/aerialis/mewposter.json?url';
import iooAMewposter from '../assets/images/overworldObjects/aerialis/mewposter.png?url';
import iooAMirrortableShort from '../assets/images/overworldObjects/aerialis/mirrortableShort.png?url';
import iooAMoneyFireworks from '../assets/images/overworldObjects/aerialis/moneyFireworks.png?url';
import iooAMoneyMew from '../assets/images/overworldObjects/aerialis/moneyMew.png?url';
import iooAMoneyRadio from '../assets/images/overworldObjects/aerialis/moneyRadio.png?url';
import iooAMoonPie from '../assets/images/overworldObjects/aerialis/moon_pie.png?url';
import iooAOneOilyBoi from '../assets/images/overworldObjects/aerialis/oneOilyBoi.png?url';
import iooAPathtile from '../assets/images/overworldObjects/aerialis/pathtile.png?url';
import iooAPedastal from '../assets/images/overworldObjects/aerialis/pedastal.png?url';
import iooAPedastalReverse$info from '../assets/images/overworldObjects/aerialis/pedastalReverse.json?url';
import iooAPedastalReverse from '../assets/images/overworldObjects/aerialis/pedastalReverse.png?url';
import iooAPottedtable from '../assets/images/overworldObjects/aerialis/pottedtable.png?url';
import iooAPrimespire from '../assets/images/overworldObjects/aerialis/primespire.png?url';
import iooAProgresser from '../assets/images/overworldObjects/aerialis/progresser.png?url';
import iooAPterm$info from '../assets/images/overworldObjects/aerialis/pterm.json?url';
import iooAPterm from '../assets/images/overworldObjects/aerialis/pterm.png?url';
import iooAPuzzledoor$info from '../assets/images/overworldObjects/aerialis/puzzledoor.json?url';
import iooAPuzzledoor from '../assets/images/overworldObjects/aerialis/puzzledoor.png?url';
import iooAPuzzlenode$info from '../assets/images/overworldObjects/aerialis/puzzlenode.json?url';
import iooAPuzzlenode from '../assets/images/overworldObjects/aerialis/puzzlenode.png?url';
import iooAPuzzlenodeDark$info from '../assets/images/overworldObjects/aerialis/puzzlenodeDark.json?url';
import iooAPuzzlenodeDark from '../assets/images/overworldObjects/aerialis/puzzlenodeDark.png?url';
import iooAReccolumn$info from '../assets/images/overworldObjects/aerialis/reccolumn.json?url';
import iooAReccolumn from '../assets/images/overworldObjects/aerialis/reccolumn.png?url';
import iooAReccolumnLeft$info from '../assets/images/overworldObjects/aerialis/reccolumnLeft.json?url';
import iooAReccolumnLeft from '../assets/images/overworldObjects/aerialis/reccolumnLeft.png?url';
import iooAReccolumnRight$info from '../assets/images/overworldObjects/aerialis/reccolumnRight.json?url';
import iooAReccolumnRight from '../assets/images/overworldObjects/aerialis/reccolumnRight.png?url';
import iooARecycler from '../assets/images/overworldObjects/aerialis/recycler.png?url';
import iooFRedcouch from '../assets/images/overworldObjects/foundry/redcouch.png?url';
import iooARoombed from '../assets/images/overworldObjects/aerialis/roombed.png?url';
import iooARoombedCover from '../assets/images/overworldObjects/aerialis/roombedCover.png?url';
import iooARoomtable from '../assets/images/overworldObjects/aerialis/roomtable.png?url';
import iooASakuraLeaf from '../assets/images/overworldObjects/aerialis/sakuraLeaf.png?url';
import iooAShowbarrier$info from '../assets/images/overworldObjects/aerialis/showbarrier.json?url';
import iooAShowbarrier from '../assets/images/overworldObjects/aerialis/showbarrier.png?url';
import iooAShowglow$info from '../assets/images/overworldObjects/aerialis/showglow.json?url';
import iooAShowglow from '../assets/images/overworldObjects/aerialis/showglow.png?url';
import iooASign from '../assets/images/overworldObjects/aerialis/sign.png?url';
import iooASlantedSecurityField$info from '../assets/images/overworldObjects/aerialis/slantedSecurityField.json?url';
import iooASlantedSecurityField from '../assets/images/overworldObjects/aerialis/slantedSecurityField.png?url';
import iooASonic from '../assets/images/overworldObjects/aerialis/sonic.png?url';
import iooASparkler$info from '../assets/images/overworldObjects/aerialis/sparkler.json?url';
import iooASparkler from '../assets/images/overworldObjects/aerialis/sparkler.png?url';
import iooASpeedline from '../assets/images/overworldObjects/aerialis/speedline.png?url';
import iooASpotlight from '../assets/images/overworldObjects/aerialis/spotlight.png?url';
import iooASpotlightAlt from '../assets/images/overworldObjects/aerialis/spotlightAlt.png?url';
import iooAStage from '../assets/images/overworldObjects/aerialis/stage.png?url';
import iooAStagecloud from '../assets/images/overworldObjects/aerialis/stagecloud.png?url';
import iooAStagelight$info from '../assets/images/overworldObjects/aerialis/stagelight.json?url';
import iooAStagelight from '../assets/images/overworldObjects/aerialis/stagelight.png?url';
import iooAStageoverlay from '../assets/images/overworldObjects/aerialis/stageoverlay.png?url';
import iooAStatue$info from '../assets/images/overworldObjects/aerialis/statue.json?url';
import iooAStatue from '../assets/images/overworldObjects/aerialis/statue.png?url';
import iooATablaphone from '../assets/images/overworldObjects/aerialis/tablaphone.png?url';
import iooATimer from '../assets/images/overworldObjects/aerialis/timer.png?url';
import iooAVender$info from '../assets/images/overworldObjects/aerialis/vender.json?url';
import iooAVender from '../assets/images/overworldObjects/aerialis/vender.png?url';
import iooAWishflower from '../assets/images/overworldObjects/aerialis/wishflower.png?url';
import iooAWorkstation$info from '../assets/images/overworldObjects/aerialis/workstation.json?url';
import iooAWorkstation from '../assets/images/overworldObjects/aerialis/workstation.png?url';
import iooAXterm from '../assets/images/overworldObjects/aerialis/xterm.png?url';
import iooDimbox$info from '../assets/images/overworldObjects/dimbox.json?url';
import iooDimbox from '../assets/images/overworldObjects/dimbox.png?url';
import iooFCookpotWrecked$info from '../assets/images/overworldObjects/foundry/THATSTHESTUFF.json?url';
import iooFCookpotWrecked from '../assets/images/overworldObjects/foundry/THATSTHESTUFF.png?url';
import iooFArtifact$info from '../assets/images/overworldObjects/foundry/artifact.json?url';
import iooFArtifact from '../assets/images/overworldObjects/foundry/artifact.png?url';
import iooFAsteroid1 from '../assets/images/overworldObjects/foundry/asteroid1.png?url';
import iooFBench from '../assets/images/overworldObjects/foundry/bench.png?url';
import iooFBlookComputer$info from '../assets/images/overworldObjects/foundry/blook_computer.json?url';
import iooFBlookComputer from '../assets/images/overworldObjects/foundry/blook_computer.png?url';
import iooFBlookhouse from '../assets/images/overworldObjects/foundry/blookhouse.png?url';
import iooFBook from '../assets/images/overworldObjects/foundry/book.png?url';
import iooFBoots from '../assets/images/overworldObjects/foundry/boots.png?url';
import iooFBurger from '../assets/images/overworldObjects/foundry/burger.png?url';
import iooFCheesetable$info from '../assets/images/overworldObjects/foundry/cheesetable.json?url';
import iooFCheesetable from '../assets/images/overworldObjects/foundry/cheesetable.png?url';
import iooFCookpotBlack$info from '../assets/images/overworldObjects/foundry/cookpot_black.json?url';
import iooFCookpotBlack from '../assets/images/overworldObjects/foundry/cookpot_black.png?url';
import iooFCookpotHeat$info from '../assets/images/overworldObjects/foundry/cookpot_heat.json?url';
import iooFCookpotHeat from '../assets/images/overworldObjects/foundry/cookpot_heat.png?url';
import iooFCookpotStir$info from '../assets/images/overworldObjects/foundry/cookpot_stir.json?url';
import iooFCookpotStir from '../assets/images/overworldObjects/foundry/cookpot_stir.png?url';
import iooFCooler from '../assets/images/overworldObjects/foundry/cooler.png?url';
import iooFCornerDark from '../assets/images/overworldObjects/foundry/corner_dark.png?url';
import iooFCornerOver from '../assets/images/overworldObjects/foundry/corner_over.png?url';
import iooFDrinkHotchocolate$info from '../assets/images/overworldObjects/foundry/drink_hotchocolate.json?url';
import iooFDrinkHotchocolate from '../assets/images/overworldObjects/foundry/drink_hotchocolate.png?url';
import iooFDrinkSoda$info from '../assets/images/overworldObjects/foundry/drink_soda.json?url';
import iooFDrinkSoda from '../assets/images/overworldObjects/foundry/drink_soda.png?url';
import iooFDrinkSugar$info from '../assets/images/overworldObjects/foundry/drink_sugar.json?url';
import iooFDrinkSugar from '../assets/images/overworldObjects/foundry/drink_sugar.png?url';
import iooFDrinkTea$info from '../assets/images/overworldObjects/foundry/drink_tea.json?url';
import iooFDrinkTea from '../assets/images/overworldObjects/foundry/drink_tea.png?url';
import iooFDrinkTeapot$info from '../assets/images/overworldObjects/foundry/drink_teapot.json?url';
import iooFDrinkTeapot from '../assets/images/overworldObjects/foundry/drink_teapot.png?url';
import iooFDrinkWater$info from '../assets/images/overworldObjects/foundry/drink_water.json?url';
import iooFDrinkWater from '../assets/images/overworldObjects/foundry/drink_water.png?url';
import iooFEchoflower$info from '../assets/images/overworldObjects/foundry/echoflower.json?url';
import iooFEchoflower from '../assets/images/overworldObjects/foundry/echoflower.png?url';
import iooFEchoflower01 from '../assets/images/overworldObjects/foundry/echoflower_01.png?url';
import iooFEchoflower02 from '../assets/images/overworldObjects/foundry/echoflower_02.png?url';
import iooFEggo from '../assets/images/overworldObjects/foundry/eggo.png?url';
import iooFErrorTrue from '../assets/images/overworldObjects/foundry/error_true.png?url';
import iooFFenceBottomleft from '../assets/images/overworldObjects/foundry/fence_bottomleft.png?url';
import iooFFenceBottomleftcap from '../assets/images/overworldObjects/foundry/fence_bottomleftcap.png?url';
import iooFFenceBottomright from '../assets/images/overworldObjects/foundry/fence_bottomright.png?url';
import iooFFenceBottomrightcap from '../assets/images/overworldObjects/foundry/fence_bottomrightcap.png?url';
import iooFFenceMidcenter from '../assets/images/overworldObjects/foundry/fence_midcenter.png?url';
import iooFFenceMidleft from '../assets/images/overworldObjects/foundry/fence_midleft.png?url';
import iooFFenceMidright from '../assets/images/overworldObjects/foundry/fence_midright.png?url';
import iooFFenceTopleft from '../assets/images/overworldObjects/foundry/fence_topleft.png?url';
import iooFFenceTopleftcap from '../assets/images/overworldObjects/foundry/fence_topleftcap.png?url';
import iooFFenceTopright from '../assets/images/overworldObjects/foundry/fence_topright.png?url';
import iooFFenceToprightcap from '../assets/images/overworldObjects/foundry/fence_toprightcap.png?url';
import iooFFenceVertleft from '../assets/images/overworldObjects/foundry/fence_vertleft.png?url';
import iooFFenceVertright from '../assets/images/overworldObjects/foundry/fence_vertright.png?url';
import iooFFloorspear$info from '../assets/images/overworldObjects/foundry/floorspear.json?url';
import iooFFloorspear from '../assets/images/overworldObjects/foundry/floorspear.png?url';
import iooFFloorspearBase from '../assets/images/overworldObjects/foundry/floorspear_base.png?url';
import iooFFries from '../assets/images/overworldObjects/foundry/fries.png?url';
import iooFGenohole from '../assets/images/overworldObjects/foundry/genohole.png?url';
import iooFGunk1$info from '../assets/images/overworldObjects/foundry/gunk1.json?url';
import iooFGunk1 from '../assets/images/overworldObjects/foundry/gunk1.png?url';
import iooFGunk2$info from '../assets/images/overworldObjects/foundry/gunk2.json?url';
import iooFGunk2 from '../assets/images/overworldObjects/foundry/gunk2.png?url';
import iooFGunk3$info from '../assets/images/overworldObjects/foundry/gunk3.json?url';
import iooFGunk3 from '../assets/images/overworldObjects/foundry/gunk3.png?url';
import iooFJumpsuit from '../assets/images/overworldObjects/foundry/jumpsuit.png?url';
import iooFOverhead from '../assets/images/overworldObjects/foundry/overhead.png?url';
import iooFPiano from '../assets/images/overworldObjects/foundry/piano.png?url';
import iooFPianoOver1 from '../assets/images/overworldObjects/foundry/piano_over1.png?url';
import iooFPianoOver2 from '../assets/images/overworldObjects/foundry/piano_over2.png?url';
import iooFPianoarrowDot$info from '../assets/images/overworldObjects/foundry/pianoarrow_dot.json?url';
import iooFPianoarrowDot from '../assets/images/overworldObjects/foundry/pianoarrow_dot.png?url';
import iooFPianoarrowDown$info from '../assets/images/overworldObjects/foundry/pianoarrow_down.json?url';
import iooFPianoarrowDown from '../assets/images/overworldObjects/foundry/pianoarrow_down.png?url';
import iooFPianoarrowLeft$info from '../assets/images/overworldObjects/foundry/pianoarrow_left.json?url';
import iooFPianoarrowLeft from '../assets/images/overworldObjects/foundry/pianoarrow_left.png?url';
import iooFPianoarrowRight$info from '../assets/images/overworldObjects/foundry/pianoarrow_right.json?url';
import iooFPianoarrowRight from '../assets/images/overworldObjects/foundry/pianoarrow_right.png?url';
import iooFPianoarrowUp$info from '../assets/images/overworldObjects/foundry/pianoarrow_up.json?url';
import iooFPianoarrowUp from '../assets/images/overworldObjects/foundry/pianoarrow_up.png?url';
import iooFPianosolution$info from '../assets/images/overworldObjects/foundry/pianosolution.json?url';
import iooFPianosolution from '../assets/images/overworldObjects/foundry/pianosolution.png?url';
import iooFPrechaseBridge from '../assets/images/overworldObjects/foundry/prechase_bridge.png?url';
import iooFPuzzle1Over from '../assets/images/overworldObjects/foundry/puzzle1_over.png?url';
import iooFPuzzle2Over from '../assets/images/overworldObjects/foundry/puzzle2_over.png?url';
import iooFPuzzle3Over from '../assets/images/overworldObjects/foundry/puzzle3_over.png?url';
import iooFPuzzlepylon$info from '../assets/images/overworldObjects/foundry/puzzlepylon.json?url';
import iooFPuzzlepylon from '../assets/images/overworldObjects/foundry/puzzlepylon.png?url';
import iooFPuzzlepylonOverlay from '../assets/images/overworldObjects/foundry/puzzlepylon_overlay.png?url';
import iooFRaft from '../assets/images/overworldObjects/foundry/raft.png?url';
import iooFRedsword from '../assets/images/overworldObjects/foundry/redsword.png?url';
import iooFRug from '../assets/images/overworldObjects/foundry/rug.png?url';
import iooFSign from '../assets/images/overworldObjects/foundry/sign.png?url';
import iooFSnack from '../assets/images/overworldObjects/foundry/snack.png?url';
import iooFSpaghetti from '../assets/images/overworldObjects/foundry/spaghetti.png?url';
import iooFSpear from '../assets/images/overworldObjects/foundry/spear.png?url';
import iooFSpearSpawn$info from '../assets/images/overworldObjects/foundry/spear_spawn.json?url';
import iooFSpearSpawn from '../assets/images/overworldObjects/foundry/spear_spawn.png?url';
import iooFSpearStab from '../assets/images/overworldObjects/foundry/spear_stab.png?url';
import iooFSpiderflower from '../assets/images/overworldObjects/foundry/spiderflower.png?url';
import iooFSpidertable from '../assets/images/overworldObjects/foundry/spidertable.png?url';
import iooFStatue$info from '../assets/images/overworldObjects/foundry/statue.json?url';
import iooFStatue from '../assets/images/overworldObjects/foundry/statue.png?url';
import iooFSteam from '../assets/images/overworldObjects/foundry/steam.png?url';
import iooFStoveknob from '../assets/images/overworldObjects/foundry/stoveknob.png?url';
import iooFTallgrass$info from '../assets/images/overworldObjects/foundry/tallgrass.json?url';
import iooFTallgrass from '../assets/images/overworldObjects/foundry/tallgrass.png?url';
import iooFTeacup from '../assets/images/overworldObjects/foundry/teacup.png?url';
import iooFTeapot$info from '../assets/images/overworldObjects/foundry/teapot.json?url';
import iooFTeapot from '../assets/images/overworldObjects/foundry/teapot.png?url';
import iooFTemstatue from '../assets/images/overworldObjects/foundry/temstatue.png?url';
import iooFThundertron$info from '../assets/images/overworldObjects/foundry/thundertron.json?url';
import iooFThundertron from '../assets/images/overworldObjects/foundry/thundertron.png?url';
import iooFTinychair from '../assets/images/overworldObjects/foundry/tinychair.png?url';
import iooFTrash from '../assets/images/overworldObjects/foundry/trash.png?url';
import iooFTronsnail1$info from '../assets/images/overworldObjects/foundry/tronsnail1.json?url';
import iooFTronsnail1 from '../assets/images/overworldObjects/foundry/tronsnail1.png?url';
import iooFTronsnail2$info from '../assets/images/overworldObjects/foundry/tronsnail2.json?url';
import iooFTronsnail2 from '../assets/images/overworldObjects/foundry/tronsnail2.png?url';
import iooFTronsnail3$info from '../assets/images/overworldObjects/foundry/tronsnail3.json?url';
import iooFTronsnail3 from '../assets/images/overworldObjects/foundry/tronsnail3.png?url';
import iooFTruth$info from '../assets/images/overworldObjects/foundry/truth.json?url';
import iooFTruth from '../assets/images/overworldObjects/foundry/truth.png?url';
import iooFUndyneDoor$info from '../assets/images/overworldObjects/foundry/undyne_door.json?url';
import iooFUndyneDoor from '../assets/images/overworldObjects/foundry/undyne_door.png?url';
import iooFUndyneDrawer$info from '../assets/images/overworldObjects/foundry/undyne_drawer.json?url';
import iooFUndyneDrawer from '../assets/images/overworldObjects/foundry/undyne_drawer.png?url';
import iooFUndynePiano from '../assets/images/overworldObjects/foundry/undyne_piano.png?url';
import iooFUndyneTable$info from '../assets/images/overworldObjects/foundry/undyne_table.json?url';
import iooFUndyneTable from '../assets/images/overworldObjects/foundry/undyne_table.png?url';
import iooFUndyneWindow$info from '../assets/images/overworldObjects/foundry/undyne_window.json?url';
import iooFUndyneWindow from '../assets/images/overworldObjects/foundry/undyne_window.png?url';
import iooFUndynehouse$info from '../assets/images/overworldObjects/foundry/undynehouse.json?url';
import iooFUndynehouse from '../assets/images/overworldObjects/foundry/undynehouse.png?url';
import iooFUndynehouseWrecked$info from '../assets/images/overworldObjects/foundry/undynehouse_wrecked.json?url';
import iooFUndynehouseWrecked from '../assets/images/overworldObjects/foundry/undynehouse_wrecked.png?url';
import iooFVeggies$info from '../assets/images/overworldObjects/foundry/veggies.json?url';
import iooFVeggies from '../assets/images/overworldObjects/foundry/veggies.png?url';
import iooFVendingMachine$info from '../assets/images/overworldObjects/foundry/vending_machine.json?url';
import iooFVendingMachine from '../assets/images/overworldObjects/foundry/vending_machine.png?url';
import iooFViewBackdrop from '../assets/images/overworldObjects/foundry/view_backdrop.png?url';
import iooFWallsign from '../assets/images/overworldObjects/foundry/wallsign.png?url';
import iooFWallsignPainted from '../assets/images/overworldObjects/foundry/wallsign_painted.png?url';
import iooFWatercooler$info from '../assets/images/overworldObjects/foundry/watercooler.json?url';
import iooFWatercooler from '../assets/images/overworldObjects/foundry/watercooler.png?url';
import iooFWeb1 from '../assets/images/overworldObjects/foundry/web1.png?url';
import iooFWeb2 from '../assets/images/overworldObjects/foundry/web2.png?url';
import iooFWeb3 from '../assets/images/overworldObjects/foundry/web3.png?url';
import iooFWebcube from '../assets/images/overworldObjects/foundry/webcube.png?url';
import iooFWebcuboid from '../assets/images/overworldObjects/foundry/webcuboid.png?url';
import iooOBreakfast from '../assets/images/overworldObjects/outlands/breakfast.png?url';
import iooOBucket from '../assets/images/overworldObjects/outlands/bucket.png?url';
import iooOButton$info from '../assets/images/overworldObjects/outlands/button.json?url';
import iooOButton from '../assets/images/overworldObjects/outlands/button.png?url';
import iooOChairiel$info from '../assets/images/overworldObjects/outlands/chairiel.json?url';
import iooOChairiel from '../assets/images/overworldObjects/outlands/chairiel.png?url';
import iooOCoatrack from '../assets/images/overworldObjects/outlands/coatrack.png?url';
import iooODesk from '../assets/images/overworldObjects/outlands/desk.png?url';
import iooODiningTable from '../assets/images/overworldObjects/outlands/dining_table.png?url';
import iooOSpoon from '../assets/images/overworldObjects/outlands/dipper.png?url';
import iooODJTable$info from '../assets/images/overworldObjects/outlands/djtable.json?url';
import iooODJTable from '../assets/images/overworldObjects/outlands/djtable.png?url';
import iooOFirecover from '../assets/images/overworldObjects/outlands/firecover.png?url';
import iooOFireplace$info from '../assets/images/overworldObjects/outlands/fireplace.json?url';
import iooOFireplace from '../assets/images/overworldObjects/outlands/fireplace.png?url';
import iooOGate$info from '../assets/images/overworldObjects/outlands/gate.json?url';
import iooOGate from '../assets/images/overworldObjects/outlands/gate.png?url';
import iooORing from '../assets/images/overworldObjects/outlands/halo.png?url';
import iooOIndicatorButton$info from '../assets/images/overworldObjects/outlands/indicator_button.json?url';
import iooOIndicatorButton from '../assets/images/overworldObjects/outlands/indicator_button.png?url';
import iooOMirrorBackdrop from '../assets/images/overworldObjects/outlands/mirror_backdrop.png?url';
import iooOPaintBlaster$info from '../assets/images/overworldObjects/outlands/paintblaster.json?url';
import iooOPaintBlaster from '../assets/images/overworldObjects/outlands/paintblaster.png?url';
import iooOPan$info from '../assets/images/overworldObjects/outlands/pan.json?url';
import iooOPan from '../assets/images/overworldObjects/outlands/pan.png?url';
import iooOPartyOver from '../assets/images/overworldObjects/outlands/party_over.png?url';
import iooOPie from '../assets/images/overworldObjects/outlands/pie.png?url';
import iooOPieBowl from '../assets/images/overworldObjects/outlands/pie_bowl.png?url';
import iooOPylon$info from '../assets/images/overworldObjects/outlands/pylon.json?url';
import iooOPylon from '../assets/images/overworldObjects/outlands/pylon.png?url';
import iooOQuantumpad$info from '../assets/images/overworldObjects/outlands/quantumpad.json?url';
import iooOQuantumpad from '../assets/images/overworldObjects/outlands/quantumpad.png?url';
import iooOSecurityField$info from '../assets/images/overworldObjects/outlands/security_field.json?url';
import iooOSecurityField from '../assets/images/overworldObjects/outlands/security_field.png?url';
import iooOSludge$info from '../assets/images/overworldObjects/outlands/sludge.json?url';
import iooOSludge from '../assets/images/overworldObjects/outlands/sludge.png?url';
import iooOSodaitem from '../assets/images/overworldObjects/outlands/sodaitem.png?url';
import iooOStairsOver from '../assets/images/overworldObjects/outlands/stairs_over.png?url';
import iooOSteakitem from '../assets/images/overworldObjects/outlands/steakitem.png?url';
import iooOSteaktable from '../assets/images/overworldObjects/outlands/steaktable.png?url';
import iooOSwitch$info from '../assets/images/overworldObjects/outlands/switch.json?url';
import iooOSwitch from '../assets/images/overworldObjects/outlands/switch.png?url';
import iooOTerminalScreen from '../assets/images/overworldObjects/outlands/terminal_screen.png?url';
import iooOTorielAsrielDark from '../assets/images/overworldObjects/outlands/toriel_asriel_dark.png?url';
import iooOTorielAsrielOver from '../assets/images/overworldObjects/outlands/toriel_asriel_over.png?url';
import iooOTorielAsrielOverLight from '../assets/images/overworldObjects/outlands/toriel_asriel_over_light.png?url';
import iooOTorielTorielChair from '../assets/images/overworldObjects/outlands/toriel_toriel_chair.png?url';
import iooOTorielTorielPlant from '../assets/images/overworldObjects/outlands/toriel_toriel_plant.png?url';
import iooOTorielTrash from '../assets/images/overworldObjects/outlands/toriel_trash.png?url';
import iooOVendingMachine$info from '../assets/images/overworldObjects/outlands/vending_machine.json?url';
import iooOVendingMachine from '../assets/images/overworldObjects/outlands/vending_machine.png?url';
import iooOWreckage from '../assets/images/overworldObjects/outlands/wreckage.png?url';
import iooSavePoint$info from '../assets/images/overworldObjects/save_point.json?url';
import iooSavePoint from '../assets/images/overworldObjects/save_point.png?url';
import iooStarling from '../assets/images/overworldObjects/starling.png?url';
import iooStarlingPotted from '../assets/images/overworldObjects/starling_potted.png?url';
import iooSBarski from '../assets/images/overworldObjects/starton/barski.png?url';
import iooSBedcover from '../assets/images/overworldObjects/starton/bedcover.png?url';
import iooSBonehouseTop from '../assets/images/overworldObjects/starton/bonehouse_top.png?url';
import iooSBookdesk from '../assets/images/overworldObjects/starton/bookdesk.png?url';
import iooSBooktable from '../assets/images/overworldObjects/starton/booktable.png?url';
import iooSChew from '../assets/images/overworldObjects/starton/chew.png?url';
import iooSCottonball from '../assets/images/overworldObjects/starton/cottonball.png?url';
import iooSCouch from '../assets/images/overworldObjects/starton/couch.png?url';
import iooSCrossword from '../assets/images/overworldObjects/starton/crossword.png?url';
import iooSCtower from '../assets/images/overworldObjects/starton/ctower.png?url';
import iooSCtowerback from '../assets/images/overworldObjects/starton/ctowerback.png?url';
import iooSCtowerleft from '../assets/images/overworldObjects/starton/ctowerleft.png?url';
import iooSCtowerright from '../assets/images/overworldObjects/starton/ctowerright.png?url';
import iooSDogtreat from '../assets/images/overworldObjects/starton/dogtreat.png?url';
import iooSEndtable from '../assets/images/overworldObjects/starton/endtable.png?url';
import iooSFlower from '../assets/images/overworldObjects/starton/flower.png?url';
import iooSGauntletBlaster from '../assets/images/overworldObjects/starton/gauntlet_blaster.png?url';
import iooSGauntletCollarsword from '../assets/images/overworldObjects/starton/gauntlet_collarsword.png?url';
import iooSGauntletDog$info from '../assets/images/overworldObjects/starton/gauntlet_dog.json?url';
import iooSGauntletDog from '../assets/images/overworldObjects/starton/gauntlet_dog.png?url';
import iooSGauntletFire$info from '../assets/images/overworldObjects/starton/gauntlet_fire.json?url';
import iooSGauntletFire from '../assets/images/overworldObjects/starton/gauntlet_fire.png?url';
import iooSGauntletTesla from '../assets/images/overworldObjects/starton/gauntlet_tesla.png?url';
import iooSGravo from '../assets/images/overworldObjects/starton/gravo.png?url';
import iooSInteriorBar from '../assets/images/overworldObjects/starton/interior_bar.png?url';
import iooSInteriorBooth from '../assets/images/overworldObjects/starton/interior_booth.png?url';
import iooSInteriorDrinks from '../assets/images/overworldObjects/starton/interior_drinks.png?url';
import iooSInteriorLesser$info from '../assets/images/overworldObjects/starton/interior_lesser.json?url';
import iooSInteriorLesser from '../assets/images/overworldObjects/starton/interior_lesser.png?url';
import iooSInteriorPoker from '../assets/images/overworldObjects/starton/interior_poker.png?url';
import iooSInteriorStool from '../assets/images/overworldObjects/starton/interior_stool.png?url';
import iooSLamp$info from '../assets/images/overworldObjects/starton/lamp.json?url';
import iooSLamp from '../assets/images/overworldObjects/starton/lamp.png?url';
import iooSLasercheckpoint$info from '../assets/images/overworldObjects/starton/lasercheckpoint.json?url';
import iooSLasercheckpoint from '../assets/images/overworldObjects/starton/lasercheckpoint.png?url';
import iooSLasercheckpointOpen from '../assets/images/overworldObjects/starton/lasercheckpointOpen.png?url';
import iooSLasercheckpointOpenSide from '../assets/images/overworldObjects/starton/lasercheckpointOpenSide.png?url';
import iooSLasercheckpointOpenSide2 from '../assets/images/overworldObjects/starton/lasercheckpointOpenSide2.png?url';
import iooSLasercheckpointSide$info from '../assets/images/overworldObjects/starton/lasercheckpointSide.json?url';
import iooSLasercheckpointSide from '../assets/images/overworldObjects/starton/lasercheckpointSide.png?url';
import iooSMailbox from '../assets/images/overworldObjects/starton/mailbox.png?url';
import iooSMicrowave from '../assets/images/overworldObjects/starton/microwave.png?url';
import iooSNoise$info from '../assets/images/overworldObjects/starton/noise.json?url';
import iooSNoise from '../assets/images/overworldObjects/starton/noise.png?url';
import iooSNtower from '../assets/images/overworldObjects/starton/ntower.png?url';
import iooSPapBed from '../assets/images/overworldObjects/starton/pap_bed.png?url';
import iooSPapBones from '../assets/images/overworldObjects/starton/pap_bones.png?url';
import iooSPapComputer$info from '../assets/images/overworldObjects/starton/pap_computer.json?url';
import iooSPapComputer from '../assets/images/overworldObjects/starton/pap_computer.png?url';
import iooSPapTable from '../assets/images/overworldObjects/starton/pap_table.png?url';
import iooSPole from '../assets/images/overworldObjects/starton/pole.png?url';
import iooSPuzzle1$info from '../assets/images/overworldObjects/starton/puzzle1.json?url';
import iooSPuzzle1 from '../assets/images/overworldObjects/starton/puzzle1.png?url';
import iooSPuzzle2$info from '../assets/images/overworldObjects/starton/puzzle2.json?url';
import iooSPuzzle2 from '../assets/images/overworldObjects/starton/puzzle2.png?url';
import iooSPuzzle3Tile$info from '../assets/images/overworldObjects/starton/puzzle3_tile.json?url';
import iooSPuzzle3Tile from '../assets/images/overworldObjects/starton/puzzle3_tile.png?url';
import iooSRocktable from '../assets/images/overworldObjects/starton/rocktable.png?url';
import iooSSansdoor from '../assets/images/overworldObjects/starton/sansdoor.png?url';
import iooSScreenon from '../assets/images/overworldObjects/starton/screenon.png?url';
import iooSSentry from '../assets/images/overworldObjects/starton/sentry.png?url';
import iooSSentry2 from '../assets/images/overworldObjects/starton/sentry2.png?url';
import iooSSentry3 from '../assets/images/overworldObjects/starton/sentry3.png?url';
import iooSSentry4 from '../assets/images/overworldObjects/starton/sentry4.png?url';
import iooSSentryBack from '../assets/images/overworldObjects/starton/sentryBack.png?url';
import iooSSentryBack2 from '../assets/images/overworldObjects/starton/sentryBack2.png?url';
import iooSSentryBack3 from '../assets/images/overworldObjects/starton/sentryBack3.png?url';
import iooSSign from '../assets/images/overworldObjects/starton/sign.png?url';
import iooSSink$info from '../assets/images/overworldObjects/starton/sink.json?url';
import iooSSink from '../assets/images/overworldObjects/starton/sink.png?url';
import iooSSlew from '../assets/images/overworldObjects/starton/slew.png?url';
import iooSSmallscreen from '../assets/images/overworldObjects/starton/smallscreen.png?url';
import iooSSpaghetti from '../assets/images/overworldObjects/starton/spaghetti.png?url';
import iooSSpaghettitable from '../assets/images/overworldObjects/starton/spaghettitable.png?url';
import iooSTelescope from '../assets/images/overworldObjects/starton/telescope.png?url';
import iooSTownBlookshop from '../assets/images/overworldObjects/starton/town_blookshop.png?url';
import iooSTownBonehouse from '../assets/images/overworldObjects/starton/town_bonehouse.png?url';
import iooSTownBonerail from '../assets/images/overworldObjects/starton/town_bonerail.png?url';
import iooSTownCapture from '../assets/images/overworldObjects/starton/town_capture.png?url';
import iooSTownGrillbys from '../assets/images/overworldObjects/starton/town_grillbys.png?url';
import iooSTownHouse from '../assets/images/overworldObjects/starton/town_house.png?url';
import iooSTownInnshop from '../assets/images/overworldObjects/starton/town_innshop.png?url';
import iooSTownLibrarby from '../assets/images/overworldObjects/starton/town_librarby.png?url';
import iooSTownPolice from '../assets/images/overworldObjects/starton/town_police.png?url';
import iooSTrash from '../assets/images/overworldObjects/starton/trash.png?url';
import iooSTree from '../assets/images/overworldObjects/starton/tree.png?url';
import iooSTVOff from '../assets/images/overworldObjects/starton/tv_off.png?url';
import iooSTVOn$info from '../assets/images/overworldObjects/starton/tv_on.json?url';
import iooSTVOn from '../assets/images/overworldObjects/starton/tv_on.png?url';
import iooSVendingMachine$info from '../assets/images/overworldObjects/starton/vending_machine.json?url';
import iooSVendingMachine from '../assets/images/overworldObjects/starton/vending_machine.png?url';
import iooSWhew from '../assets/images/overworldObjects/starton/whew.png?url';
import iooSWidescreen from '../assets/images/overworldObjects/starton/widescreen.png?url';
import iooSWidescreenBullet from '../assets/images/overworldObjects/starton/widescreen_bullet.png?url';
import iooSWidescreenPlayer$info from '../assets/images/overworldObjects/starton/widescreen_player.json?url';
import iooSWidescreenPlayer from '../assets/images/overworldObjects/starton/widescreen_player.png?url';
import iooSWidescreenReticle$info from '../assets/images/overworldObjects/starton/widescreen_reticle.json?url';
import iooSWidescreenReticle from '../assets/images/overworldObjects/starton/widescreen_reticle.png?url';
import iooTaxi$info from '../assets/images/overworldObjects/taxi.json?url';
import iooTaxi from '../assets/images/overworldObjects/taxi.png?url';
import iooTaxiOverlay$info from '../assets/images/overworldObjects/taxi-overlay.json?url';
import iooTaxiOverlay from '../assets/images/overworldObjects/taxi-overlay.png?url';
import iooToby1$info from '../assets/images/overworldObjects/toby1.json?url';
import iooToby1 from '../assets/images/overworldObjects/toby1.png?url';
import iooToby2$info from '../assets/images/overworldObjects/toby2.json?url';
import iooToby2 from '../assets/images/overworldObjects/toby2.png?url';
import iooToby3$info from '../assets/images/overworldObjects/toby3.json?url';
import iooToby3 from '../assets/images/overworldObjects/toby3.png?url';
import isbBackground from '../assets/images/shops/blook/background.png?url';
import isbEyes$info from '../assets/images/shops/blook/eyes.json?url';
import isbEyes from '../assets/images/shops/blook/eyes.png?url';
import isbKeeper$info from '../assets/images/shops/blook/keeper.json?url';
import isbKeeper from '../assets/images/shops/blook/keeper.png?url';
import isbpArms from '../assets/images/shops/bpants/arms.png?url';
import isbpBackground from '../assets/images/shops/bpants/background.png?url';
import isbpCloud$info from '../assets/images/shops/bpants/cloud.json?url';
import isbpCloud from '../assets/images/shops/bpants/cloud.png?url';
import isbpKeeper$info from '../assets/images/shops/bpants/keeper.json?url';
import isbpKeeper from '../assets/images/shops/bpants/keeper.png?url';
import isgArm1$info from '../assets/images/shops/gossip/arm1.json?url';
import isgArm1 from '../assets/images/shops/gossip/arm1.png?url';
import isgArm2 from '../assets/images/shops/gossip/arm2.png?url';
import isgBackground from '../assets/images/shops/gossip/background.png?url';
import isgKeeper1$info from '../assets/images/shops/gossip/keeper1.json?url';
import isgKeeper1 from '../assets/images/shops/gossip/keeper1.png?url';
import isgKeeper2$info from '../assets/images/shops/gossip/keeper2.json?url';
import isgKeeper2 from '../assets/images/shops/gossip/keeper2.png?url';
import ishBackground from '../assets/images/shops/hare/background.png?url';
import ishKeeper$info from '../assets/images/shops/hare/keeper.json?url';
import ishKeeper from '../assets/images/shops/hare/keeper.png?url';
import istcBackground from '../assets/images/shops/tem/background.png?url';
import istcBody from '../assets/images/shops/tem/body.png?url';
import istcBox from '../assets/images/shops/tem/box.png?url';
import istcCoffee$info from '../assets/images/shops/tem/coffee.json?url';
import istcCoffee from '../assets/images/shops/tem/coffee.png?url';
import istcEyebrows from '../assets/images/shops/tem/eyebrows.png?url';
import istcEyes1$info from '../assets/images/shops/tem/eyes1.json?url';
import istcEyes1 from '../assets/images/shops/tem/eyes1.png?url';
import istcEyes2 from '../assets/images/shops/tem/eyes2.png?url';
import istcEyes3 from '../assets/images/shops/tem/eyes3.png?url';
import istcEyes4 from '../assets/images/shops/tem/eyes4.png?url';
import istcEyes5 from '../assets/images/shops/tem/eyes5.png?url';
import istcEyes6 from '../assets/images/shops/tem/eyes6.png?url';
import istcHat from '../assets/images/shops/tem/hat.png?url';
import istcMouth1$info from '../assets/images/shops/tem/mouth1.json?url';
import istcMouth1 from '../assets/images/shops/tem/mouth1.png?url';
import istcMouth2$info from '../assets/images/shops/tem/mouth2.json?url';
import istcMouth2 from '../assets/images/shops/tem/mouth2.png?url';
import istcMouth3 from '../assets/images/shops/tem/mouth3.png?url';
import istcMouth4$info from '../assets/images/shops/tem/mouth4.json?url';
import istcMouth4 from '../assets/images/shops/tem/mouth4.png?url';
import istcSweat from '../assets/images/shops/tem/sweat.png?url';
import istArm from '../assets/images/shops/tortoise/arm.png?url';
import istBackground from '../assets/images/shops/tortoise/background.png?url';
import istBody from '../assets/images/shops/tortoise/body.png?url';
import istKeeper$info from '../assets/images/shops/tortoise/keeper.json?url';
import istKeeper from '../assets/images/shops/tortoise/keeper.png?url';
import sClipper$frag from '../assets/shaders/clipper.frag?url';
import sClipper$vert from '../assets/shaders/clipper.vert?url';
import sWaver$frag from '../assets/shaders/waver.frag?url';
import sWaver$vert from '../assets/shaders/waver.vert?url';

const dark01 = (color: CosmosColor) =>
   [ color[0] * (1 / 3), color[1] * (1 / 3), color[2] * (1 / 3), color[3] ] as CosmosColor;
const dark02 = (color: CosmosColor) => [ color[0] * 0.55, color[1] * 0.55, color[2] * 0.55, color[3] ] as CosmosColor;
const contrast = (color: CosmosColor): CosmosColor => [
   CosmosMath.bezier(color[0] / 256, 0, 0, 256, 256),
   CosmosMath.bezier(color[1] / 256, 0, 0, 256, 256),
   CosmosMath.bezier(color[2] / 256, 0, 0, 256, 256),
   color[3]
];

/**
 * ```ts
 * // mismatched assets
 * imports.split('\n').map(x=>x.split(' ')).map(x=>[x[1],x[3]]).filter(x=>x[1].endsWith("?url';")).map(x=>[x[0],x[1].slice(11, -6).split('/').map((y,i,a)=>i===a.length-1?y[0].toUpperCase()+y.slice(1).split('.').slice(0, -1).join('.')+(y.endsWith('.json')?'$info':y.endsWith('.frag')?'$frag':y.endsWith('.vert')?'$vert':''):i===2?y[0].toUpperCase()+y.slice(1):y.split('').filter((z,j)=>j===0||z===z.toUpperCase()).join('').toLowerCase()).map((y,i,a)=>y==='onpc'?'on':i===2?a[3]?.startsWith(y)?'':i!==a.length-1&&['Outlands','Starton','Foundry','Aerialis'].includes(y)?y[0]:y:y).join('').split('').map((y,i,a)=>y==='_'||y==='-'?'':a[i-1]==='_'||a[i-1]==='-'?y.toUpperCase():y).join('')]).filter(x=>x[0]!==x[1])
 * ```
 */
const content = {
   amAerialis: new CosmosAudio(amAerialis),
   amAerialisEmpty: new CosmosAudio(amAerialisEmpty),
   amArms: new CosmosAudio(amArms),
   amArmsIntro: new CosmosAudio(amArmsIntro),
   amBattle1: new CosmosAudio(amBattle1),
   amBGBeat: new CosmosAudio(amBGBeat),
   amBlookShop: new CosmosAudio(amBlookShop),
   amChara: new CosmosAudio(amChara),
   amCharacutscene: new CosmosAudio(amCharacutscene),
   amConfession: new CosmosAudio(amConfession),
   amCore: new CosmosAudio(amCore),
   amDatingfight: new CosmosAudio(amDatingfight),
   amDatingstart: new CosmosAudio(amDatingstart),
   amDatingtense: new CosmosAudio(amDatingtense),
   amDJBeat: new CosmosAudio(amDJBeat),
   amDogbass: new CosmosAudio(amDogbass),
   amDogbeat: new CosmosAudio(amDogbeat),
   amDogdance: new CosmosAudio(amDogdance),
   amDogebattle: new CosmosAudio(amDogebattle),
   amDogerelax: new CosmosAudio(amDogerelax),
   amDogsigh: new CosmosAudio(amDogsigh),
   amDogsong: new CosmosAudio(amDogsong),
   amDrone: new CosmosAudio(amDrone),
   amDummyboss: new CosmosAudio(amDummyboss),
   amEndingexcerptIntro: new CosmosAudio(amEndingexcerptIntro),
   amEndingexcerptLoop: new CosmosAudio(amEndingexcerptLoop),
   amFactory: new CosmosAudio(amFactory),
   amFactoryEmpty: new CosmosAudio(amFactoryEmpty),
   amFactoryquiet: new CosmosAudio(amFactoryquiet),
   amFactoryquietEmpty: new CosmosAudio(amFactoryquietEmpty),
   amForthefans: new CosmosAudio(amForthefans),
   amGameover: new CosmosAudio(amGameover),
   amGameshow: new CosmosAudio(amGameshow),
   amGenerator: new CosmosAudio(amGenerator),
   amGhostbattle: new CosmosAudio(amGhostbattle),
   amGrandfinale: new CosmosAudio(amGrandfinale),
   amHome: new CosmosAudio(amHome),
   amHomeAlt: new CosmosAudio(amHomeAlt),
   amHope: new CosmosAudio(amHope),
   amLab: new CosmosAudio(amLab),
   amLegs: new CosmosAudio(amLegs),
   amLegsIntro: new CosmosAudio(amLegsIntro),
   amLetsflyajetpackwhydontwe: new CosmosAudio(amLetsflyajetpackwhydontwe),
   amLetsmakeabombwhydontwe: new CosmosAudio(amLetsmakeabombwhydontwe),
   amMall: new CosmosAudio(amMall),
   amMemory: new CosmosAudio(amMemory),
   amMenu0: new CosmosAudio(amMenu0),
   amMenu1: new CosmosAudio(amMenu1),
   amMenu2: new CosmosAudio(amMenu2),
   amMenu3: new CosmosAudio(amMenu3),
   amMenu4: new CosmosAudio(amMenu4),
   amMettsuspense: new CosmosAudio(amMettsuspense),
   amMuscle: new CosmosAudio(amMuscle),
   amMushroomdance: new CosmosAudio(amMushroomdance),
   amNapstachords: new CosmosAudio(amNapstachords),
   amNapstahouse: new CosmosAudio(amNapstahouse),
   amOhmy: new CosmosAudio(amOhmy),
   amOpera: new CosmosAudio(amOpera),
   amOperaAlt: new CosmosAudio(amOperaAlt),
   amOutlands: new CosmosAudio(amOutlands),
   amPapyrus: new CosmosAudio(amPapyrus),
   amPapyrusboss: new CosmosAudio(amPapyrusboss),
   amPrebattle: new CosmosAudio(amPrebattle),
   amPredummy: new CosmosAudio(amPredummy),
   amPreshock: new CosmosAudio(amPreshock),
   amRedacted: new CosmosAudio(amRedacted),
   amRise: new CosmosAudio(amRise),
   amSansdate: new CosmosAudio(amSansdate),
   amSecretsong: new CosmosAudio(amSecretsong),
   amSexyrectangle: new CosmosAudio(amSexyrectangle),
   amShock: new CosmosAudio(amShock),
   amShop: new CosmosAudio(amShop),
   amSpecatk: new CosmosAudio(amSpecatk),
   amSpiderboss: new CosmosAudio(amSpiderboss),
   amSpiderrelax: new CosmosAudio(amSpiderrelax),
   amSplendor: new CosmosAudio(amSplendor),
   amSpooktune: new CosmosAudio(amSpooktune),
   amSpookwaltz: new CosmosAudio(amSpookwaltz),
   amSpookwave: new CosmosAudio(amSpookwave),
   amSpookydate: new CosmosAudio(amSpookydate),
   amStarton: new CosmosAudio(amStarton),
   amStartonEmpty: new CosmosAudio(amStartonEmpty),
   amStartonTown: new CosmosAudio(amStartonTown),
   amStartonTownEmpty: new CosmosAudio(amStartonTownEmpty),
   amStory: new CosmosAudio(amStory),
   amTemmie: new CosmosAudio(amTemmie),
   amTemShop: new CosmosAudio(amTemShop),
   amTension: new CosmosAudio(amTension),
   amThriftShop: new CosmosAudio(amThriftShop),
   amThundersnail: new CosmosAudio(amThundersnail),
   amToriel: new CosmosAudio(amToriel),
   amTorielboss: new CosmosAudio(amTorielboss),
   amTwinkly: new CosmosAudio(amTwinkly),
   amUndyne: new CosmosAudio(amUndyne),
   amUndyneboss: new CosmosAudio(amUndyneboss),
   amUndynefast: new CosmosAudio(amUndynefast),
   amUndynegeno: new CosmosAudio(amUndynegeno),
   amUndynegenoFinal: new CosmosAudio(amUndynegenoFinal),
   amUndynegenoStart: new CosmosAudio(amUndynegenoStart),
   amUndynepiano: new CosmosAudio(amUndynepiano),
   amUndynepre: new CosmosAudio(amUndynepre),
   amUndynepreboss: new CosmosAudio(amUndynepreboss),
   amUndynepregeno: new CosmosAudio(amUndynepregeno),
   amWonder: new CosmosAudio(amWonder),
   amWrongenemy: new CosmosAudio(amWrongenemy),
   amYouscreweduppal: new CosmosAudio(amYouscreweduppal),
   asAlphysfix: new CosmosAudio(asAlphysfix),
   asAppear: new CosmosAudio(asAppear),
   asApplause: new CosmosAudio(asApplause),
   asArrow: new CosmosAudio(asArrow),
   asBad: new CosmosAudio(asBad),
   asBahbye: new CosmosAudio(asBahbye),
   asBark: new CosmosAudio(asBark),
   asBattlefall: new CosmosAudio(asBattlefall),
   asBell: new CosmosAudio(asBell),
   asBoing: new CosmosAudio(asBoing),
   asBomb: new CosmosAudio(asBomb),
   asBookspin: new CosmosAudio(asBookspin),
   asBoom: new CosmosAudio(asBoom),
   asBreak: new CosmosAudio(asBreak),
   asBuhbuhbuhdaadodaa: new CosmosAudio(asBuhbuhbuhdaadodaa),
   asBurst: new CosmosAudio(asBurst),
   asClap: new CosmosAudio(asClap),
   asComputer: new CosmosAudio(asComputer),
   asCrit: new CosmosAudio(asCrit),
   asCymbal: new CosmosAudio(asCymbal),
   asDeeploop2: new CosmosAudio(asDeeploop2),
   asDephase: new CosmosAudio(asDephase),
   asDepower: new CosmosAudio(asDepower),
   asDimbox: new CosmosAudio(asDimbox),
   asDoor: new CosmosAudio(asDoor),
   asDoorClose: new CosmosAudio(asDoorClose),
   asDrumroll: new CosmosAudio(asDrumroll),
   asDununnn: new CosmosAudio(asDununnn),
   asElectrodoor: new CosmosAudio(asElectrodoor),
   asElectrodoorClose: new CosmosAudio(asElectrodoorClose),
   asElevator: new CosmosAudio(asElevator),
   asEquip: new CosmosAudio(asEquip),
   asFear: new CosmosAudio(asFear),
   asFrypan: new CosmosAudio(asFrypan),
   asGlassbreak: new CosmosAudio(asGlassbreak),
   asGonerCharge: new CosmosAudio(asGonerCharge),
   asGoodbye: new CosmosAudio(asGoodbye),
   asGrab: new CosmosAudio(asGrab),
   asGunshot: new CosmosAudio(asGunshot),
   asHeal: new CosmosAudio(asHeal),
   asHeartshot: new CosmosAudio(asHeartshot),
   asHit: new CosmosAudio(asHit),
   asHurt: new CosmosAudio(asHurt),
   asImpact: new CosmosAudio(asImpact),
   asIndicator: new CosmosAudio(asIndicator),
   asJetpack: new CosmosAudio(asJetpack),
   asKick: new CosmosAudio(asKick),
   asKnock: new CosmosAudio(asKnock),
   asLanding: new CosmosAudio(asLanding),
   asLove: new CosmosAudio(asLove),
   asMenu: new CosmosAudio(asMenu),
   asMetapproach: new CosmosAudio(asMetapproach),
   asMonsterHurt1: new CosmosAudio(asMonsterHurt1),
   asMonsterHurt2: new CosmosAudio(asMonsterHurt2),
   asMonsterHurt3: new CosmosAudio(asMonsterHurt3),
   asMonsterHurt4: new CosmosAudio(asMonsterHurt4),
   asMultitarget: new CosmosAudio(asMultitarget),
   asMusOhyes: new CosmosAudio(asMusOhyes),
   asNode: new CosmosAudio(asNode),
   asNoise: new CosmosAudio(asNoise),
   asNote: new CosmosAudio(asNote),
   asNotify: new CosmosAudio(asNotify),
   asOops: new CosmosAudio(asOops),
   asOrchhit: new CosmosAudio(asOrchhit),
   asPathway: new CosmosAudio(asPathway),
   asPhase: new CosmosAudio(asPhase),
   asPhone: new CosmosAudio(asPhone),
   asPrebomb: new CosmosAudio(asPrebomb),
   asPunch1: new CosmosAudio(asPunch1),
   asPunch2: new CosmosAudio(asPunch2),
   asPurchase: new CosmosAudio(asPurchase),
   asRetract: new CosmosAudio(asRetract),
   asRimshot: new CosmosAudio(asRimshot),
   asRun: new CosmosAudio(asRun),
   asRustle: new CosmosAudio(asRustle),
   asSaber3: new CosmosAudio(asSaber3),
   asSave: new CosmosAudio(asSave),
   asSavior: new CosmosAudio(asSavior),
   asSelect: new CosmosAudio(asSelect),
   asShake: new CosmosAudio(asShake),
   asShakein: new CosmosAudio(asShakein),
   asShatter: new CosmosAudio(asShatter),
   asShock: new CosmosAudio(asShock),
   asSingBad1: new CosmosAudio(asSingBad1),
   asSingBad2: new CosmosAudio(asSingBad2),
   asSingBad3: new CosmosAudio(asSingBad3),
   asSingBass1: new CosmosAudio(asSingBass1),
   asSingBass2: new CosmosAudio(asSingBass2),
   asSingTreble1: new CosmosAudio(asSingTreble1),
   asSingTreble2: new CosmosAudio(asSingTreble2),
   asSingTreble3: new CosmosAudio(asSingTreble3),
   asSingTreble4: new CosmosAudio(asSingTreble4),
   asSingTreble5: new CosmosAudio(asSingTreble5),
   asSingTreble6: new CosmosAudio(asSingTreble6),
   asSlidewhistle: new CosmosAudio(asSlidewhistle),
   asSmallelectroshock: new CosmosAudio(asSmallelectroshock),
   asSparkle: new CosmosAudio(asSparkle),
   asSpecin: new CosmosAudio(asSpecin),
   asSpecout: new CosmosAudio(asSpecout),
   asSpeed: new CosmosAudio(asSpeed),
   asSpiderLaugh: new CosmosAudio(asSpiderLaugh),
   asSplash: new CosmosAudio(asSplash),
   asSqueak: new CosmosAudio(asSqueak),
   asStab: new CosmosAudio(asStab),
   asStep: new CosmosAudio(asStep),
   asStomp: new CosmosAudio(asStomp),
   asStrike: new CosmosAudio(asStrike),
   asSuperstrike: new CosmosAudio(asSuperstrike),
   asSwallow: new CosmosAudio(asSwallow),
   asSwing: new CosmosAudio(asSwing),
   asSwitch: new CosmosAudio(asSwitch),
   asTextnoise: new CosmosAudio(asTextnoise),
   asTrombone: new CosmosAudio(asTrombone),
   asTV: new CosmosAudio(asTV),
   asTwinklyHurt: new CosmosAudio(asTwinklyHurt),
   asTwinklyLaugh: new CosmosAudio(asTwinklyLaugh),
   asUpgrade: new CosmosAudio(asUpgrade),
   asWhimper: new CosmosAudio(asWhimper),
   asWhipcrack: new CosmosAudio(asWhipcrack),
   asWhoopee: new CosmosAudio(asWhoopee),
   avAlphys: new CosmosAudio(avAlphys),
   avAsgore: new CosmosAudio(avAsgore),
   avAsriel: new CosmosAudio(avAsriel),
   avAsriel2: new CosmosAudio(avAsriel2),
   avAsriel3: new CosmosAudio(avAsriel3),
   avAsriel4: new CosmosAudio(avAsriel4),
   avKidd: new CosmosAudio(avKidd),
   avMettaton1: new CosmosAudio(avMettaton1),
   avMettaton2: new CosmosAudio(avMettaton2),
   avMettaton3: new CosmosAudio(avMettaton3),
   avMettaton4: new CosmosAudio(avMettaton4),
   avMettaton5: new CosmosAudio(avMettaton5),
   avMettaton6: new CosmosAudio(avMettaton6),
   avMettaton7: new CosmosAudio(avMettaton7),
   avMettaton8: new CosmosAudio(avMettaton8),
   avMettaton9: new CosmosAudio(avMettaton9),
   avNapstablook: new CosmosAudio(avNapstablook),
   avNarrator: new CosmosAudio(avNarrator),
   avPapyrus: new CosmosAudio(avPapyrus),
   avSans: new CosmosAudio(avSans),
   avSoriel: new CosmosAudio(avSoriel),
   avStoryteller: new CosmosAudio(avStoryteller),
   avTem1: new CosmosAudio(avTem1),
   avTem2: new CosmosAudio(avTem2),
   avTem3: new CosmosAudio(avTem3),
   avTem4: new CosmosAudio(avTem4),
   avTem5: new CosmosAudio(avTem5),
   avTem6: new CosmosAudio(avTem6),
   avToriel: new CosmosAudio(avToriel),
   avTwinkly1: new CosmosAudio(avTwinkly1),
   avTwinkly2: new CosmosAudio(avTwinkly2),
   avUndyne: new CosmosAudio(avUndyne),
   avUndyneex: new CosmosAudio(avUndyneex),
   backdrop: (() => {
      const data = backdrop as {
         header: string;
         content: string[];
      };
      return new CosmosInventory(...data.content.map(source => new CosmosImage(`${data.header}${source}`)));
   })(),
   ibbArmBullet: new CosmosImage(ibbArmBullet, (color, position) => [
      color[0],
      color[1],
      color[2],
      color[3] * Math.min(position.y / 25, 1)
   ]),
   ibbArrow: new CosmosAnimationResources(new CosmosImage(ibbArrow), new CosmosData(ibbArrow$info)),
   ibbArrowportal: new CosmosAnimationResources(new CosmosImage(ibbArrowportal), new CosmosData(ibbArrowportal$info)),
   ibbAx: new CosmosAnimationResources(new CosmosImage(ibbAx), new CosmosData(ibbAx$info)),
   ibbBark: new CosmosImage(ibbBark),
   ibbBigblaster: new CosmosImage(ibbBigblaster),
   ibbBird: new CosmosAnimationResources(new CosmosImage(ibbBird), new CosmosData(ibbBird$info)),
   ibbBirdfront: new CosmosAnimationResources(new CosmosImage(ibbBirdfront), new CosmosData(ibbBirdfront$info)),
   ibbBluelightning: new CosmosAnimationResources(
      new CosmosImage(ibbBluelightning),
      new CosmosData(ibbBluelightning$info)
   ),
   ibbBomb: new CosmosAnimationResources(new CosmosImage(ibbBomb), new CosmosData(ibbBomb$info)),
   ibbBone: new CosmosAnimationResources(new CosmosImage(ibbBone), new CosmosData(ibbBone$info)),
   ibbBoxBullet: new CosmosImage(ibbBoxBullet),
   ibbBoxBulletUp: new CosmosImage(ibbBoxBulletUp),
   ibbBuzzlightning: new CosmosAnimationResources(
      new CosmosImage(ibbBuzzlightning),
      new CosmosData(ibbBuzzlightning$info)
   ),
   ibbBuzzpillar: new CosmosAnimationResources(new CosmosImage(ibbBuzzpillar), new CosmosData(ibbBuzzpillar$info)),
   ibbChasespear: new CosmosImage(ibbChasespear),
   ibbCrosshair: new CosmosImage(ibbCrosshair),
   ibbCrossiant: new CosmosImage(ibbCrossiant),
   ibbCrossiantOutline: new CosmosImage(ibbCrossiantOutline),
   ibbCupcake: new CosmosImage(ibbCupcake),
   ibbCupcakeAttack: new CosmosAnimationResources(
      new CosmosImage(ibbCupcakeAttack),
      new CosmosData(ibbCupcakeAttack$info)
   ),
   ibbDonut: new CosmosImage(ibbDonut),
   ibbDonutOutline: new CosmosImage(ibbDonutOutline),
   ibbDummy: new CosmosAnimationResources(new CosmosImage(ibbDummy), new CosmosData(ibbDummy$info)),
   ibbDummyknife: new CosmosImage(ibbDummyknife),
   ibbExBombBlastCore: new CosmosAnimationResources(
      new CosmosImage(ibbExBombBlastCore),
      new CosmosData(ibbExBombBlastCore$info)
   ),
   ibbExBombBlastRay: new CosmosAnimationResources(
      new CosmosImage(ibbExBombBlastRay),
      new CosmosData(ibbExBombBlastRay$info)
   ),
   ibbExHeart: new CosmosAnimationResources(new CosmosImage(ibbExHeart), new CosmosData(ibbExHeart$info)),
   ibbExKiss: new CosmosImage(ibbExKiss),
   ibbExShine: new CosmosAnimationResources(new CosmosImage(ibbExShine), new CosmosData(ibbExShine$info)),
   ibbExTiny1: new CosmosAnimationResources(new CosmosImage(ibbExTiny1), new CosmosData(ibbExTiny1$info)),
   ibbExTiny2: new CosmosAnimationResources(new CosmosImage(ibbExTiny2), new CosmosData(ibbExTiny2$info)),
   ibbExTiny3: new CosmosAnimationResources(new CosmosImage(ibbExTiny3), new CosmosData(ibbExTiny3$info)),
   ibbFeather: new CosmosImage(ibbFeather),
   ibbFirebol: new CosmosAnimationResources(new CosmosImage(ibbFirebol), new CosmosData(ibbFirebol$info)),
   ibbFroggitFly: new CosmosAnimationResources(new CosmosImage(ibbFroggitFly), new CosmosData(ibbFroggitFly$info)),
   ibbFroggitGo: new CosmosImage(ibbFroggitGo),
   ibbFroggitWarn: new CosmosAnimationResources(new CosmosImage(ibbFroggitWarn), new CosmosData(ibbFroggitWarn$info)),
   ibbGlitter: new CosmosAnimationResources(new CosmosImage(ibbGlitter), new CosmosData(ibbGlitter$info)),
   ibbHat: new CosmosImage(ibbHat),
   ibbHaymaker: new CosmosImage(ibbHaymaker),
   ibbHeart: new CosmosAnimationResources(new CosmosImage(ibbHeart), new CosmosData(ibbHeart$info)),
   ibbLaserEmitter: new CosmosImage(ibbLaserEmitter),
   ibbLegBullet: new CosmosImage(ibbLegBullet, (color, position) => [
      color[0],
      color[1],
      color[2],
      color[3] * Math.min(position.y / 50, 1)
   ]),
   ibbLightning: new CosmosAnimationResources(new CosmosImage(ibbLightning), new CosmosData(ibbLightning$info)),
   ibbLiteralBullet: new CosmosImage(ibbLiteralBullet),
   ibbLithium: new CosmosAnimationResources(new CosmosImage(ibbLithium), new CosmosData(ibbLithium$info)),
   ibbLooxCircle1: new CosmosImage(ibbLooxCircle1),
   ibbLooxCircle2: new CosmosImage(ibbLooxCircle2),
   ibbLooxCircle3: new CosmosImage(ibbLooxCircle3),
   ibBlue: new CosmosAnimationResources(new CosmosImage(ibBlue), new CosmosData(ibBlue$info)),
   ibbMeteor: new CosmosAnimationResources(new CosmosImage(ibbMeteor), new CosmosData(ibbMeteor$info)),
   ibbMigosp: new CosmosAnimationResources(new CosmosImage(ibbMigosp), new CosmosData(ibbMigosp$info)),
   ibbMissile: new CosmosAnimationResources(new CosmosImage(ibbMissile), new CosmosData(ibbMissile$info)),
   ibbMoon: new CosmosImage(ibbMoon),
   ibbMouse: new CosmosAnimationResources(new CosmosImage(ibbMouse), new CosmosData(ibbMouse$info)),
   ibbNeoRocket: new CosmosAnimationResources(new CosmosImage(ibbNeoRocket), new CosmosData(ibbNeoRocket$info)),
   ibbNeoTiny1: new CosmosAnimationResources(new CosmosImage(ibbNeoTiny1), new CosmosData(ibbNeoTiny1$info)),
   ibbNeoTiny1a: new CosmosAnimationResources(new CosmosImage(ibbNeoTiny1a), new CosmosData(ibbNeoTiny1a$info)),
   ibbNeoTiny2: new CosmosImage(ibbNeoTiny2),
   ibbNote: new CosmosAnimationResources(new CosmosImage(ibbNote), new CosmosData(ibbNote$info)),
   ibbOctagon: new CosmosImage(ibbOctagon),
   ibbOrb: new CosmosAnimationResources(new CosmosImage(ibbOrb), new CosmosData(ibbOrb$info)),
   ibbPaw: new CosmosImage(ibbPaw),
   ibbPawInverted: new CosmosImage(ibbPawInverted),
   ibbPellet: new CosmosImage(ibbPellet),
   ibbPlusSign: new CosmosImage(ibbPlusSign),
   ibbPomBark: new CosmosImage(ibbPomBark),
   ibbPomBarkSad: new CosmosImage(ibbPomBarkSad),
   ibbPomJump: new CosmosImage(ibbPomJump),
   ibbPomSad: new CosmosImage(ibbPomSad),
   ibbPomSleep: new CosmosAnimationResources(new CosmosImage(ibbPomSleep), new CosmosData(ibbPomSleep$info)),
   ibbPomWag: new CosmosAnimationResources(new CosmosImage(ibbPomWag), new CosmosData(ibbPomWag$info)),
   ibbPomWake: new CosmosAnimationResources(new CosmosImage(ibbPomWake), new CosmosData(ibbPomWake$info)),
   ibbPomWalk: new CosmosAnimationResources(new CosmosImage(ibbPomWalk), new CosmosData(ibbPomWalk$info)),
   ibbPyropebom: new CosmosImage(ibbPyropebom),
   ibbPyropebomb: new CosmosAnimationResources(new CosmosImage(ibbPyropebomb), new CosmosData(ibbPyropebomb$info)),
   ibbPyropefire: new CosmosAnimationResources(new CosmosImage(ibbPyropefire), new CosmosData(ibbPyropefire$info)),
   ibbRedspear: new CosmosImage(ibbRedspear),
   ibbRoachfly: new CosmosAnimationResources(new CosmosImage(ibbRoachfly), new CosmosData(ibbRoachfly$info)),
   ibbRope: new CosmosImage(ibbRope),
   ibbScribble: new CosmosAnimationResources(new CosmosImage(ibbScribble), new CosmosData(ibbScribble$info)),
   ibbShield: new CosmosAnimationResources(new CosmosImage(ibbShield), new CosmosData(ibbShield$info)),
   ibbSoap: new CosmosImage(ibbSoap),
   ibbSpear: new CosmosAnimationResources(new CosmosImage(ibbSpear), new CosmosData(ibbSpear$info)),
   ibbSpearBlue: new CosmosAnimationResources(new CosmosImage(ibbSpearBlue), new CosmosData(ibbSpearBlue$info)),
   ibbSpecatk: new CosmosAnimationResources(new CosmosImage(ibbSpecatk), new CosmosData(ibbSpecatk$info)),
   ibbSpecatkBone: new CosmosImage(ibbSpecatkBone),
   ibbSpider: new CosmosImage(ibbSpider),
   ibbSpiderOutline: new CosmosImage(ibbSpiderOutline),
   ibbStardrop: new CosmosImage(ibbStardrop),
   ibbStarfly: new CosmosAnimationResources(new CosmosImage(ibbStarfly), new CosmosData(ibbStarfly$info)),
   ibbSword: new CosmosImage(ibbSword),
   ibbTear: new CosmosImage(ibbTear),
   ibbTheMoves: new CosmosAnimationResources(new CosmosImage(ibbTheMoves), new CosmosData(ibbTheMoves$info)),
   ibbTiparrow: new CosmosImage(ibbTiparrow),
   ibbVertship: new CosmosAnimationResources(new CosmosImage(ibbVertship), new CosmosData(ibbVertship$info)),
   ibbWarningreticle: new CosmosAnimationResources(
      new CosmosImage(ibbWarningreticle),
      new CosmosData(ibbWarningreticle$info)
   ),
   ibbWater: new CosmosAnimationResources(new CosmosImage(ibbWater), new CosmosData(ibbWater$info)),
   ibbWave: new CosmosAnimationResources(new CosmosImage(ibbWave), new CosmosData(ibbWave$info)),
   ibbWorm: new CosmosAnimationResources(new CosmosImage(ibbWorm), new CosmosData(ibbWorm$info)),
   ibbYarn: new CosmosAnimationResources(new CosmosImage(ibbYarn), new CosmosData(ibbYarn$info)),
   ibcAlphysBody: new CosmosAnimationResources(new CosmosImage(ibcAlphysBody), new CosmosData(ibcAlphysBody$info)),
   ibcAlphysHead: new CosmosAnimationResources(new CosmosImage(ibcAlphysHead), new CosmosData(ibcAlphysHead$info)),
   ibcAsgoreStatic: new CosmosAnimationResources(
      new CosmosImage(ibcAsgoreStatic),
      new CosmosData(ibcAsgoreStatic$info)
   ),
   ibcAsrielAssist: new CosmosImage(ibcAsrielAssist),
   ibcAsrielCutscene1: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielCutscene1),
      new CosmosData(ibcAsrielCutscene1$info)
   ),
   ibcAsrielCutscene2: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielCutscene2),
      new CosmosData(ibcAsrielCutscene2$info)
   ),
   ibcAsrielMagic: new CosmosImage(ibcAsrielMagic),
   ibcAstigmatismArm: new CosmosImage(ibcAstigmatismArm),
   ibcAstigmatismBody: new CosmosAnimationResources(
      new CosmosImage(ibcAstigmatismBody),
      new CosmosData(ibcAstigmatismBody$info)
   ),
   ibcAstigmatismHurt: new CosmosImage(ibcAstigmatismHurt),
   ibcAstigmatismLeg: new CosmosImage(ibcAstigmatismLeg),
   ibcBurgerpantsBody: new CosmosAnimationResources(
      new CosmosImage(ibcBurgerpantsBody),
      new CosmosData(ibcBurgerpantsBody$info)
   ),
   ibcDoge: new CosmosAnimationResources(new CosmosImage(ibcDoge), new CosmosData(ibcDoge$info)),
   ibcDogeHurt: new CosmosImage(ibcDogeHurt),
   ibcDogeSpear: new CosmosAnimationResources(new CosmosImage(ibcDogeSpear), new CosmosData(ibcDogeSpear$info)),
   ibcDogeTail: new CosmosAnimationResources(new CosmosImage(ibcDogeTail), new CosmosData(ibcDogeTail$info)),
   ibcDoggoArms: new CosmosImage(ibcDoggoArms),
   ibcDoggoBody: new CosmosImage(ibcDoggoBody),
   ibcDoggoBodyHurt: new CosmosImage(ibcDoggoBodyHurt),
   ibcDoggoHead: new CosmosAnimationResources(new CosmosImage(ibcDoggoHead), new CosmosData(ibcDoggoHead$info)),
   ibcDoggoHeadWan: new CosmosAnimationResources(
      new CosmosImage(ibcDoggoHeadWan),
      new CosmosData(ibcDoggoHeadWan$info)
   ),
   ibcDogsAxe: new CosmosImage(ibcDogsAxe),
   ibcDogsDogamy: new CosmosAnimationResources(new CosmosImage(ibcDogsDogamy), new CosmosData(ibcDogsDogamy$info)),
   ibcDogsDogamyHurt: new CosmosImage(ibcDogsDogamyHurt),
   ibcDogsDogaressa: new CosmosAnimationResources(
      new CosmosImage(ibcDogsDogaressa),
      new CosmosData(ibcDogsDogaressa$info)
   ),
   ibcDogsDogaressaHurt: new CosmosImage(ibcDogsDogaressaHurt),
   ibcDummy: new CosmosImage(ibcDummy),
   ibcDummyDefeated: new CosmosImage(ibcDummyDefeated),
   ibcDummyGlad: new CosmosImage(ibcDummyGlad),
   ibcDummyGladHugged: new CosmosImage(ibcDummyGladHugged),
   ibcDummyHugged: new CosmosImage(ibcDummyHugged),
   ibcDummyMadBase: new CosmosImage(ibcDummyMadBase),
   ibcDummyMadBody: new CosmosImage(ibcDummyMadBody),
   ibcDummyMadHead: new CosmosAnimationResources(
      new CosmosImage(ibcDummyMadHead),
      new CosmosData(ibcDummyMadHead$info)
   ),
   ibcDummyMadTorso: new CosmosImage(ibcDummyMadTorso),
   ibcDummyShock: new CosmosImage(ibcDummyShock),
   ibcFakeFroggit: new CosmosAnimationResources(new CosmosImage(ibcFakeFroggit), new CosmosData(ibcFakeFroggit$info)),
   ibcFroggitDefeated: new CosmosImage(ibcFroggitDefeated),
   ibcFroggitexDefeated: new CosmosImage(ibcFroggitexDefeated),
   ibcFroggitexHead: new CosmosAnimationResources(
      new CosmosImage(ibcFroggitexHead),
      new CosmosData(ibcFroggitexHead$info)
   ),
   ibcFroggitexLegs: new CosmosAnimationResources(
      new CosmosImage(ibcFroggitexLegs),
      new CosmosData(ibcFroggitexLegs$info)
   ),
   ibcFroggitHead: new CosmosAnimationResources(new CosmosImage(ibcFroggitHead), new CosmosData(ibcFroggitHead$info)),
   ibcFroggitLegs: new CosmosAnimationResources(new CosmosImage(ibcFroggitLegs), new CosmosData(ibcFroggitLegs$info)),
   ibcGlydeAntenna: new CosmosImage(ibcGlydeAntenna),
   ibcGlydeBody: new CosmosAnimationResources(new CosmosImage(ibcGlydeBody), new CosmosData(ibcGlydeBody$info)),
   ibcGlydeHurt: new CosmosAnimationResources(new CosmosImage(ibcGlydeHurt), new CosmosData(ibcGlydeHurt$info)),
   ibcGlydeWingLeft: new CosmosImage(ibcGlydeWingLeft),
   ibcGlydeWingRight: new CosmosImage(ibcGlydeWingRight),
   ibcGreatdog: new CosmosAnimationResources(new CosmosImage(ibcGreatdog), new CosmosData(ibcGreatdog$info)),
   ibcGreatdogSleep: new CosmosImage(ibcGreatdogSleep),
   ibcJerry: new CosmosAnimationResources(new CosmosImage(ibcJerry), new CosmosData(ibcJerry$info)),
   ibcJerryHurt: new CosmosImage(ibcJerryHurt),
   ibcKiddBody: new CosmosAnimationResources(new CosmosImage(ibcKiddBody), new CosmosData(ibcKiddBody$info)),
   ibcKnightknightArmball: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightArmball),
      new CosmosData(ibcKnightknightArmball$info)
   ),
   ibcKnightknightArmstaff: new CosmosImage(ibcKnightknightArmstaff),
   ibcKnightknightBase: new CosmosImage(ibcKnightknightBase),
   ibcKnightknightDragonfur: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightDragonfur),
      new CosmosData(ibcKnightknightDragonfur$info)
   ),
   ibcKnightknightEyes: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightEyes),
      new CosmosData(ibcKnightknightEyes$info)
   ),
   ibcKnightknightHeadpiece: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightHeadpiece),
      new CosmosData(ibcKnightknightHeadpiece$info)
   ),
   ibcKnightknightHurt: new CosmosImage(ibcKnightknightHurt),
   ibcKnightknightMouthpiece: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightMouthpiece),
      new CosmosData(ibcKnightknightMouthpiece$info)
   ),
   ibcLesserBody: new CosmosAnimationResources(new CosmosImage(ibcLesserBody), new CosmosData(ibcLesserBody$info)),
   ibcLesserHead: new CosmosAnimationResources(new CosmosImage(ibcLesserHead), new CosmosData(ibcLesserHead$info)),
   ibcLesserHurt: new CosmosAnimationResources(new CosmosImage(ibcLesserHurt), new CosmosData(ibcLesserHurt$info)),
   ibcLesserHurtHead: new CosmosAnimationResources(
      new CosmosImage(ibcLesserHurtHead),
      new CosmosData(ibcLesserHurtHead$info)
   ),
   ibcLesserTail: new CosmosAnimationResources(new CosmosImage(ibcLesserTail), new CosmosData(ibcLesserTail$info)),
   ibcLoox: new CosmosAnimationResources(new CosmosImage(ibcLoox), new CosmosData(ibcLoox$info)),
   ibcLooxDefeated: new CosmosImage(ibcLooxDefeated),
   ibcMadjickBoot: new CosmosImage(ibcMadjickBoot),
   ibcMadjickCape: new CosmosImage(ibcMadjickCape),
   ibcMadjickDress: new CosmosImage(ibcMadjickDress),
   ibcMadjickHat: new CosmosImage(ibcMadjickHat),
   ibcMadjickHead: new CosmosImage(ibcMadjickHead),
   ibcMadjickLapel: new CosmosImage(ibcMadjickLapel),
   ibcMadjickHurt: new CosmosImage(ibcMadjickHurt),
   ibcMettatonArmsBruh: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsBruh),
      new CosmosData(ibcMettatonArmsBruh$info)
   ),
   ibcMettatonArmsNoticard: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsNoticard),
      new CosmosData(ibcMettatonArmsNoticard$info)
   ),
   ibcMettatonArmsThonk: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsThonk),
      new CosmosData(ibcMettatonArmsThonk$info)
   ),
   ibcMettatonArmsWelcome: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWelcome),
      new CosmosData(ibcMettatonArmsWelcome$info)
   ),
   ibcMettatonArmsWelcomeBack: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWelcomeBack),
      new CosmosData(ibcMettatonArmsWelcomeBack$info)
   ),
   ibcMettatonArmsWhaaat: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWhaaat),
      new CosmosData(ibcMettatonArmsWhaaat$info)
   ),
   ibcMettatonArmsWhatevs: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWhatevs),
      new CosmosData(ibcMettatonArmsWhatevs$info)
   ),
   ibcMettatonBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBody),
      new CosmosData(ibcMettatonBody$info)
   ),
   ibcMettatonBodyBack: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBodyBack),
      new CosmosData(ibcMettatonBodyBack$info)
   ),
   ibcMettatonBodySOUL: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBodySOUL),
      new CosmosData(ibcMettatonBodySOUL$info)
   ),
   ibcMettatonBodyTransform: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBodyTransform),
      new CosmosData(ibcMettatonBodyTransform$info)
   ),
   ibcMettatonDjdisco: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonDjdisco),
      new CosmosData(ibcMettatonDjdisco$info)
   ),
   ibcMettatonDjdiscoInv: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonDjdiscoInv),
      new CosmosData(ibcMettatonDjdiscoInv$info)
   ),
   ibcMettatonExArm: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExArm),
      new CosmosData(ibcMettatonExArm$info)
   ),
   ibcMettatonExBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExBody),
      new CosmosData(ibcMettatonExBody$info)
   ),
   ibcMettatonExBodyHeart: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExBodyHeart),
      new CosmosData(ibcMettatonExBodyHeart$info)
   ),
   ibcMettatonExFace: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExFace),
      new CosmosData(ibcMettatonExFace$info)
   ),
   ibcMettatonExLeg: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExLeg),
      new CosmosData(ibcMettatonExLeg$info)
   ),
   ibcMettatonExStarburst: new CosmosImage(ibcMettatonExStarburst),
   ibcMettatonFlyawaymyroboticfriend: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonFlyawaymyroboticfriend),
      new CosmosData(ibcMettatonFlyawaymyroboticfriend$info)
   ),
   ibcMettatonHappybreaktime: new CosmosImage(ibcMettatonHappybreaktime),
   ibcMettatonNeoArm1: new CosmosImage(ibcMettatonNeoArm1),
   ibcMettatonNeoArm2: new CosmosImage(ibcMettatonNeoArm2),
   ibcMettatonNeoBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoBody),
      new CosmosData(ibcMettatonNeoBody$info)
   ),
   ibcMettatonNeoHead: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoHead),
      new CosmosData(ibcMettatonNeoHead$info)
   ),
   ibcMettatonNeoHeart: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoHeart),
      new CosmosData(ibcMettatonNeoHeart$info)
   ),
   ibcMettatonNeoLegs: new CosmosImage(ibcMettatonNeoLegs),
   ibcMettatonNeoWings: new CosmosImage(ibcMettatonNeoWings),
   ibcMettatonQuizbutton: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonQuizbutton),
      new CosmosData(ibcMettatonQuizbutton$info)
   ),
   ibcMettatonRecbox: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonRecbox),
      new CosmosData(ibcMettatonRecbox$info)
   ),
   ibcMettatonRocket: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonRocket),
      new CosmosData(ibcMettatonRocket$info)
   ),
   ibcMettatonWheel: new CosmosImage(ibcMettatonWheel),
   ibcMigosp: new CosmosAnimationResources(new CosmosImage(ibcMigosp), new CosmosData(ibcMigosp$info)),
   ibcMigospDefeated: new CosmosImage(ibcMigospDefeated),
   ibcMigospel: new CosmosAnimationResources(new CosmosImage(ibcMigospel), new CosmosData(ibcMigospel$info)),
   ibcMigospelHappi: new CosmosAnimationResources(
      new CosmosImage(ibcMigospelHappi),
      new CosmosData(ibcMigospelHappi$info)
   ),
   ibcMigospelHurt: new CosmosImage(ibcMigospelHurt),
   ibcMigospelLegs: new CosmosImage(ibcMigospelLegs),
   ibcMigospHappi: new CosmosAnimationResources(new CosmosImage(ibcMigospHappi), new CosmosData(ibcMigospHappi$info)),
   ibcMoldbyggHead: new CosmosAnimationResources(
      new CosmosImage(ibcMoldbyggHead),
      new CosmosData(ibcMoldbyggHead$info)
   ),
   ibcMoldbyggPart: new CosmosImage(ibcMoldbyggPart),
   ibcMoldsmal: new CosmosImage(ibcMoldsmal),
   ibcMouse: new CosmosAnimationResources(new CosmosImage(ibcMouse), new CosmosData(ibcMouse$info)),
   ibcMouseBody: new CosmosImage(ibcMouseBody),
   ibcMouseHurt: new CosmosImage(ibcMouseHurt),
   ibcMuffetArm1: new CosmosAnimationResources(new CosmosImage(ibcMuffetArm1), new CosmosData(ibcMuffetArm1$info)),
   ibcMuffetArm2a: new CosmosImage(ibcMuffetArm2a),
   ibcMuffetArm2b: new CosmosImage(ibcMuffetArm2b),
   ibcMuffetArm3: new CosmosImage(ibcMuffetArm3),
   ibcMuffetCupcake: new CosmosAnimationResources(
      new CosmosImage(ibcMuffetCupcake),
      new CosmosData(ibcMuffetCupcake$info)
   ),
   ibcMuffetDustrus: new CosmosImage(ibcMuffetDustrus),
   ibcMuffetEye1: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye1), new CosmosData(ibcMuffetEye1$info)),
   ibcMuffetEye2: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye2), new CosmosData(ibcMuffetEye2$info)),
   ibcMuffetEye3: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye3), new CosmosData(ibcMuffetEye3$info)),
   ibcMuffetHair: new CosmosImage(ibcMuffetHair),
   ibcMuffetHead: new CosmosImage(ibcMuffetHead),
   ibcMuffetHurt: new CosmosImage(ibcMuffetHurt),
   ibcMuffetLegs: new CosmosImage(ibcMuffetLegs),
   ibcMuffetPants: new CosmosImage(ibcMuffetPants),
   ibcMuffetShirt: new CosmosImage(ibcMuffetShirt),
   ibcMuffetShoulder: new CosmosImage(ibcMuffetShoulder),
   ibcMuffetSpider: new CosmosAnimationResources(
      new CosmosImage(ibcMuffetSpider),
      new CosmosData(ibcMuffetSpider$info)
   ),
   ibcMuffetSpiderSign: new CosmosAnimationResources(
      new CosmosImage(ibcMuffetSpiderSign),
      new CosmosData(ibcMuffetSpiderSign$info)
   ),
   ibcMuffetSpiderTelegram: new CosmosImage(ibcMuffetSpiderTelegram),
   ibcMuffetTeapot: new CosmosImage(ibcMuffetTeapot),
   ibcMushketeer: new CosmosImage(ibcMushketeer),
   ibcMushketeerDefeated: new CosmosImage(ibcMushketeerDefeated),
   ibcMushy: new CosmosImage(ibcMushy),
   ibcMushyDefeated: new CosmosImage(ibcMushyDefeated),
   ibcNapstablook: new CosmosAnimationResources(new CosmosImage(ibcNapstablook), new CosmosData(ibcNapstablook$info)),
   ibcNapstablookLookdeath: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookLookdeath),
      new CosmosData(ibcNapstablookLookdeath$info)
   ),
   ibcNapstablookLookdown: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookLookdown),
      new CosmosData(ibcNapstablookLookdown$info)
   ),
   ibcNapstablookLookforward: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookLookforward),
      new CosmosData(ibcNapstablookLookforward$info)
   ),
   ibcNapstaHat: new CosmosAnimationResources(new CosmosImage(ibcNapstaHat), new CosmosData(ibcNapstaHat$info)),
   ibcNapstaSad: new CosmosImage(ibcNapstaSad),
   ibcPapyrusBattle: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattle),
      new CosmosData(ibcPapyrusBattle$info)
   ),
   ibcPapyrusBattleBlackoutA: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleBlackoutA),
      new CosmosData(ibcPapyrusBattleBlackoutA$info)
   ),
   ibcPapyrusBattleBlackoutB: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleBlackoutB),
      new CosmosData(ibcPapyrusBattleBlackoutB$info)
   ),
   ibcPapyrusBattleHeadless: new CosmosImage(ibcPapyrusBattleHeadless),
   ibcPapyrusBattleOpen: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleOpen),
      new CosmosData(ibcPapyrusBattleOpen$info)
   ),
   ibcPapyrusCoolHat: new CosmosImage(ibcPapyrusCoolHat),
   ibcPapyrusDateOMG: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateOMG),
      new CosmosData(ibcPapyrusDateOMG$info)
   ),
   ibcPapyrusDateRead: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateRead),
      new CosmosData(ibcPapyrusDateRead$info)
   ),
   ibcPapyrusDateSwipe: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateSwipe),
      new CosmosData(ibcPapyrusDateSwipe$info)
   ),
   ibcPapyrusSecretStyle: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusSecretStyle),
      new CosmosData(ibcPapyrusSecretStyle$info)
   ),
   ibcPapyrusSpagBox: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusSpagBox),
      new CosmosData(ibcPapyrusSpagBox$info)
   ),
   ibcPerigeeBody: new CosmosAnimationResources(new CosmosImage(ibcPerigeeBody), new CosmosData(ibcPerigeeBody$info)),
   ibcPerigeeHurt: new CosmosImage(ibcPerigeeHurt),
   ibcPyropeDrip: new CosmosImage(ibcPyropeDrip),
   ibcPyropeHead: new CosmosAnimationResources(new CosmosImage(ibcPyropeHead), new CosmosData(ibcPyropeHead$info)),
   ibcPyropeHurt: new CosmosImage(ibcPyropeHurt),
   ibcPyropeRing: new CosmosAnimationResources(new CosmosImage(ibcPyropeRing), new CosmosData(ibcPyropeRing$info)),
   ibcRadtile: new CosmosAnimationResources(new CosmosImage(ibcRadtile), new CosmosData(ibcRadtile$info)),
   ibcRadtileHurt: new CosmosImage(ibcRadtileHurt),
   ibcRadtileTail: new CosmosAnimationResources(new CosmosImage(ibcRadtileTail), new CosmosData(ibcRadtileTail$info)),
   ibcRGBall: new CosmosImage(ibcRGBall),
   ibcRGBugFist: new CosmosImage(ibcRGBugFist),
   ibcRGBugHead: new CosmosImage(ibcRGBugHead),
   ibcRGBugHurt: new CosmosImage(ibcRGBugHurt),
   ibcRGCatFist: new CosmosImage(ibcRGCatFist),
   ibcRGCatHead: new CosmosImage(ibcRGCatHead),
   ibcRGCatHurt: new CosmosImage(ibcRGCatHurt),
   ibcRGChestplate: new CosmosAnimationResources(
      new CosmosImage(ibcRGChestplate),
      new CosmosData(ibcRGChestplate$info)
   ),
   ibcRGFalchion: new CosmosImage(ibcRGFalchion),
   ibcRGFist: new CosmosImage(ibcRGFist),
   ibcRGLegs: new CosmosImage(ibcRGLegs),
   ibcRGShoes: new CosmosImage(ibcRGShoes),
   ibcRGSweat: new CosmosImage(ibcRGSweat),
   ibcSansDeath: new CosmosAnimationResources(new CosmosImage(ibcSansDeath), new CosmosData(ibcSansDeath$info)),
   ibcShyrenAgent: new CosmosAnimationResources(new CosmosImage(ibcShyrenAgent), new CosmosData(ibcShyrenAgent$info)),
   ibcShyrenBack: new CosmosAnimationResources(new CosmosImage(ibcShyrenBack), new CosmosData(ibcShyrenBack$info)),
   ibcShyrenFront: new CosmosAnimationResources(new CosmosImage(ibcShyrenFront), new CosmosData(ibcShyrenFront$info)),
   ibcShyrenHurt: new CosmosImage(ibcShyrenHurt),
   ibcShyrenWave: new CosmosAnimationResources(new CosmosImage(ibcShyrenWave), new CosmosData(ibcShyrenWave$info)),
   ibcSpacetop: new CosmosAnimationResources(new CosmosImage(ibcSpacetop), new CosmosData(ibcSpacetop$info)),
   ibcSpacetopCrystal: new CosmosImage(ibcSpacetopCrystal),
   ibcSpacetopHurt: new CosmosImage(ibcSpacetopHurt),
   ibcStardrakeBody: new CosmosImage(ibcStardrakeBody),
   ibcStardrakeChilldrake: new CosmosImage(ibcStardrakeChilldrake),
   ibcStardrakeChilldrakeHurt: new CosmosImage(ibcStardrakeChilldrakeHurt),
   ibcStardrakeHead: new CosmosAnimationResources(
      new CosmosImage(ibcStardrakeHead),
      new CosmosData(ibcStardrakeHead$info)
   ),
   ibcStardrakeHurt: new CosmosImage(ibcStardrakeHurt),
   ibcStardrakeLegs: new CosmosImage(ibcStardrakeLegs),
   ibcStardrakeLegsOver: new CosmosImage(ibcStardrakeLegsOver),
   ibcTorielBattle1: new CosmosAnimationResources(
      new CosmosImage(ibcTorielBattle1),
      new CosmosData(ibcTorielBattle1$info)
   ),
   ibcTorielBattle2: new CosmosAnimationResources(
      new CosmosImage(ibcTorielBattle2),
      new CosmosData(ibcTorielBattle2$info)
   ),
   ibcTorielCutscene1: new CosmosAnimationResources(
      new CosmosImage(ibcTorielCutscene1),
      new CosmosData(ibcTorielCutscene1$info)
   ),
   ibcTorielCutscene2: new CosmosAnimationResources(
      new CosmosImage(ibcTorielCutscene2),
      new CosmosData(ibcTorielCutscene2$info)
   ),
   ibcTorielScram: new CosmosAnimationResources(new CosmosImage(ibcTorielScram), new CosmosData(ibcTorielScram$info)),
   ibcTsundereBlush: new CosmosAnimationResources(
      new CosmosImage(ibcTsundereBlush),
      new CosmosData(ibcTsundereBlush$info)
   ),
   ibcTsundereHurt: new CosmosImage(ibcTsundereHurt),
   ibcTsundereBody: new CosmosImage(ibcTsundereBody),
   ibcTsundereExhaust: new CosmosImage(ibcTsundereExhaust),
   ibcUndyneArm1: new CosmosImage(ibcUndyneArm1),
   ibcUndyneArm1Ex: new CosmosImage(ibcUndyneArm1Ex),
   ibcUndyneArm2: new CosmosImage(ibcUndyneArm2),
   ibcUndyneArm2Ex: new CosmosImage(ibcUndyneArm2Ex),
   ibcUndyneArrow: new CosmosImage(ibcUndyneArrow),
   ibcUndyneBoots: new CosmosImage(ibcUndyneBoots),
   ibcUndyneBootsEx: new CosmosImage(ibcUndyneBootsEx),
   ibcUndyneCage: new CosmosImage(ibcUndyneCage),
   ibcUndyneChestplate: new CosmosImage(ibcUndyneChestplate),
   ibcUndyneChestplateEx: new CosmosImage(ibcUndyneChestplateEx),
   ibcUndyneDate: new CosmosImage(ibcUndyneDate),
   ibcUndyneDateArm: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneDateArm),
      new CosmosData(ibcUndyneDateArm$info)
   ),
   ibcUndyneDateLegs: new CosmosImage(ibcUndyneDateLegs),
   ibcUndyneDateSpear: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneDateSpear),
      new CosmosData(ibcUndyneDateSpear$info)
   ),
   ibcUndyneDateTorso: new CosmosImage(ibcUndyneDateTorso),
   ibcUndyneEyebeam: new CosmosImage(ibcUndyneEyebeam),
   ibcUndyneFatal: new CosmosAnimationResources(new CosmosImage(ibcUndyneFatal), new CosmosData(ibcUndyneFatal$info)),
   ibcUndyneHair: new CosmosAnimationResources(new CosmosImage(ibcUndyneHair), new CosmosData(ibcUndyneHair$info)),
   ibcUndyneHairEx: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneHairEx),
      new CosmosData(ibcUndyneHairEx$info)
   ),
   ibcUndyneHead: new CosmosAnimationResources(new CosmosImage(ibcUndyneHead), new CosmosData(ibcUndyneHead$info)),
   ibcUndyneHurt: new CosmosImage(ibcUndyneHurt),
   ibcUndyneHurtEx: new CosmosImage(ibcUndyneHurtEx),
   ibcUndyneHurtPain: new CosmosImage(ibcUndyneHurtPain),
   ibcUndyneHurtSad: new CosmosImage(ibcUndyneHurtSad),
   ibcUndyneLaugh: new CosmosAnimationResources(new CosmosImage(ibcUndyneLaugh), new CosmosData(ibcUndyneLaugh$info)),
   ibcUndyneNeutralFinal: new CosmosImage(ibcUndyneNeutralFinal),
   ibcUndyneSheath: new CosmosImage(ibcUndyneSheath),
   ibcUndyneSheathEx: new CosmosImage(ibcUndyneSheathEx),
   ibcUndyneShield: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneShield),
      new CosmosData(ibcUndyneShield$info)
   ),
   ibcUndyneShocked: new CosmosImage(ibcUndyneShocked),
   ibcUndyneSmear: new CosmosAnimationResources(new CosmosImage(ibcUndyneSmear), new CosmosData(ibcUndyneSmear$info)),
   ibcWhimsalot: new CosmosAnimationResources(new CosmosImage(ibcWhimsalot), new CosmosData(ibcWhimsalot$info)),
   ibcWhimsalotDefeated: new CosmosImage(ibcWhimsalotDefeated),
   ibcWhimsun: new CosmosAnimationResources(new CosmosImage(ibcWhimsun), new CosmosData(ibcWhimsun$info)),
   ibcWhimsunDefeated: new CosmosImage(ibcWhimsunDefeated),
   ibcWoshuaBody: new CosmosImage(ibcWoshuaBody),
   ibcWoshuaDuck: new CosmosImage(ibcWoshuaDuck),
   ibcWoshuaFace: new CosmosImage(ibcWoshuaFace),
   ibcWoshuaHanger: new CosmosImage(ibcWoshuaHanger),
   ibcWoshuaHead: new CosmosImage(ibcWoshuaHead),
   ibcWoshuaHurt: new CosmosImage(ibcWoshuaHurt),
   ibcWoshuaTail: new CosmosAnimationResources(new CosmosImage(ibcWoshuaTail), new CosmosData(ibcWoshuaTail$info)),
   ibcWoshuaWater: new CosmosImage(ibcWoshuaWater),
   ibGalaxy: new CosmosAnimationResources(new CosmosImage(ibGalaxy), new CosmosData(ibGalaxy$info)),
   ibGrey: new CosmosAnimationResources(new CosmosImage(ibGrey), new CosmosData(ibGrey$info)),
   ibuAct: new CosmosAnimationResources(new CosmosImage(ibuAct), new CosmosData(ibuAct$info)),
   ibuBlueSOUL: new CosmosAnimationResources(new CosmosImage(ibuBlueSOUL), new CosmosData(ibuBlueSOUL$info)),
   ibuBoot1: new CosmosAnimationResources(new CosmosImage(ibuBoot1), new CosmosData(ibuBoot1$info)),
   ibuBoot2: new CosmosAnimationResources(new CosmosImage(ibuBoot2), new CosmosData(ibuBoot2$info)),
   ibuBossBreak: new CosmosImage(ibuBossBreak),
   ibuBossShatter: new CosmosAnimationResources(new CosmosImage(ibuBossShatter), new CosmosData(ibuBossShatter$info)),
   ibuBossSOUL: new CosmosImage(ibuBossSOUL),
   ibuBreak: new CosmosImage(ibuBreak),
   ibuBubbleDummy: new CosmosImage(ibuBubbleDummy),
   ibuBubbleMTT: new CosmosImage(ibuBubbleMTT),
   ibuBubbleShock: new CosmosImage(ibuBubbleShock),
   ibuBubbleTiny: new CosmosImage(ibuBubbleTiny),
   ibuBubbleTwinkly: new CosmosImage(ibuBubbleTwinkly),
   ibuCyanReticle: new CosmosImage(ibuCyanReticle),
   ibuCyanSOUL: new CosmosAnimationResources(new CosmosImage(ibuCyanSOUL), new CosmosData(ibuCyanSOUL$info)),
   ibuDeadeye: new CosmosImage(ibuDeadeye),
   ibuDefeat: new CosmosImage(ibuDefeat),
   ibuFight: new CosmosAnimationResources(new CosmosImage(ibuFight), new CosmosData(ibuFight$info)),
   ibuFist1: new CosmosAnimationResources(new CosmosImage(ibuFist1), new CosmosData(ibuFist1$info)),
   ibuFist2: new CosmosAnimationResources(new CosmosImage(ibuFist2), new CosmosData(ibuFist2$info)),
   ibuFrypan1: new CosmosAnimationResources(new CosmosImage(ibuFrypan1), new CosmosData(ibuFrypan1$info)),
   ibuFrypan2: new CosmosImage(ibuFrypan2),
   ibuGreenSOUL: new CosmosAnimationResources(new CosmosImage(ibuGreenSOUL), new CosmosData(ibuGreenSOUL$info)),
   ibuGrid1: new CosmosImage(ibuGrid1),
   ibuGrid2: new CosmosImage(ibuGrid2),
   ibuGrid3: new CosmosImage(ibuGrid3),
   ibuGunshot1: new CosmosAnimationResources(new CosmosImage(ibuGunshot1), new CosmosData(ibuGunshot1$info)),
   ibuGunshot2: new CosmosImage(ibuGunshot2),
   ibuHP: new CosmosImage(ibuHP),
   ibuIndicator: new CosmosAnimationResources(new CosmosImage(ibuIndicator), new CosmosData(ibuIndicator$info)),
   ibuItem: new CosmosAnimationResources(new CosmosImage(ibuItem), new CosmosData(ibuItem$info)),
   ibuMercy: new CosmosAnimationResources(new CosmosImage(ibuMercy), new CosmosData(ibuMercy$info)),
   ibuMercyDud: new CosmosImage(ibuMercyDud),
   ibuNotebook: new CosmosImage(ibuNotebook),
   ibuNotify: new CosmosAnimationResources(new CosmosImage(ibuNotify), new CosmosData(ibuNotify$info)),
   ibuOrangeSOUL: new CosmosAnimationResources(new CosmosImage(ibuOrangeSOUL), new CosmosData(ibuOrangeSOUL$info)),
   ibuPurpleSOUL: new CosmosAnimationResources(new CosmosImage(ibuPurpleSOUL), new CosmosData(ibuPurpleSOUL$info)),
   ibuRun: new CosmosAnimationResources(new CosmosImage(ibuRun), new CosmosData(ibuRun$info)),
   ibuShatter: new CosmosAnimationResources(new CosmosImage(ibuShatter), new CosmosData(ibuShatter$info)),
   ibuSOUL: new CosmosAnimationResources(new CosmosImage(ibuSOUL), new CosmosData(ibuSOUL$info)),
   ibuStar: new CosmosAnimationResources(new CosmosImage(ibuStar), new CosmosData(ibuStar$info)),
   ibuSwing: new CosmosAnimationResources(new CosmosImage(ibuSwing), new CosmosData(ibuSwing$info)),
   ibuYellowShot: new CosmosAnimationResources(new CosmosImage(ibuYellowShot), new CosmosData(ibuYellowShot$info)),
   ibuYellowSOUL: new CosmosAnimationResources(new CosmosImage(ibuYellowSOUL), new CosmosData(ibuYellowSOUL$info)),
   idcAlphysCutscene1: new CosmosImage(idcAlphysCutscene1),
   idcAlphysCutscene2: new CosmosImage(idcAlphysCutscene2),
   idcAlphysCutscene3: new CosmosImage(idcAlphysCutscene3),
   idcAlphysDontGetAllDreamyEyedOnMeNow: new CosmosImage(idcAlphysDontGetAllDreamyEyedOnMeNow),
   idcAlphysFR: new CosmosImage(idcAlphysFR),
   idcAlphysGarbo: new CosmosImage(idcAlphysGarbo),
   idcAlphysGarboCenter: new CosmosImage(idcAlphysGarboCenter),
   idcAlphysHaveSomeCompassion: new CosmosImage(idcAlphysHaveSomeCompassion),
   idcAlphysHellYeah: new CosmosImage(idcAlphysHellYeah),
   idcAlphysIDK: new CosmosImage(idcAlphysIDK),
   idcAlphysInquisitive: new CosmosImage(idcAlphysInquisitive),
   idcAlphysNervousLaugh: new CosmosImage(idcAlphysNervousLaugh),
   idcAlphysNeutralSweat: new CosmosImage(idcAlphysNeutralSweat),
   idcAlphysOhGodNo: new CosmosImage(idcAlphysOhGodNo),
   idcAlphysShocked: new CosmosImage(idcAlphysShocked),
   idcAlphysSide: new CosmosImage(idcAlphysSide),
   idcAlphysSideSad: new CosmosImage(idcAlphysSideSad),
   idcAlphysSmileSweat: new CosmosImage(idcAlphysSmileSweat),
   idcAlphysSoAwesome: new CosmosImage(idcAlphysSoAwesome),
   idcAlphysThatSucks: new CosmosImage(idcAlphysThatSucks),
   idcAlphysTheFactIs: new CosmosImage(idcAlphysTheFactIs),
   idcAlphysUhButHeresTheDeal: new CosmosImage(idcAlphysUhButHeresTheDeal),
   idcAlphysWelp: new CosmosImage(idcAlphysWelp),
   idcAlphysWorried: new CosmosImage(idcAlphysWorried),
   idcAlphysWTF: new CosmosImage(idcAlphysWTF),
   idcAlphysWTF2: new CosmosImage(idcAlphysWTF2),
   idcAlphysYeahYouKnowWhatsUp: new CosmosImage(idcAlphysYeahYouKnowWhatsUp),
   idcAlphysYeahYouKnowWhatsUpCenter: new CosmosImage(idcAlphysYeahYouKnowWhatsUpCenter),
   idcAsgoreBouttacry: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreBouttacry),
      new CosmosData(idcAsgoreBouttacry$info)
   ),
   idcAsgoreCry1: new CosmosAnimationResources(new CosmosImage(idcAsgoreCry1), new CosmosData(idcAsgoreCry1$info)),
   idcAsgoreCry2: new CosmosImage(idcAsgoreCry2),
   idcAsgoreCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreCutscene1),
      new CosmosData(idcAsgoreCutscene1$info)
   ),
   idcAsgoreFunni: new CosmosAnimationResources(new CosmosImage(idcAsgoreFunni), new CosmosData(idcAsgoreFunni$info)),
   idcAsgoreHmph: new CosmosAnimationResources(new CosmosImage(idcAsgoreHmph), new CosmosData(idcAsgoreHmph$info)),
   idcAsgoreHmphClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHmphClosed),
      new CosmosData(idcAsgoreHmphClosed$info)
   ),
   idcAsgoreHopeful: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHopeful),
      new CosmosData(idcAsgoreHopeful$info)
   ),
   idcAsgoreHopefulSide: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHopefulSide),
      new CosmosData(idcAsgoreHopefulSide$info)
   ),
   idcAsgoreMad: new CosmosAnimationResources(new CosmosImage(idcAsgoreMad), new CosmosData(idcAsgoreMad$info)),
   idcAsgoreMadClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreMadClosed),
      new CosmosData(idcAsgoreMadClosed$info)
   ),
   idcAsgorePensive: new CosmosAnimationResources(
      new CosmosImage(idcAsgorePensive),
      new CosmosData(idcAsgorePensive$info)
   ),
   idcAsgorePensiveSmile: new CosmosAnimationResources(
      new CosmosImage(idcAsgorePensiveSmile),
      new CosmosData(idcAsgorePensiveSmile$info)
   ),
   idcAsgoreSide: new CosmosAnimationResources(new CosmosImage(idcAsgoreSide), new CosmosData(idcAsgoreSide$info)),
   idcAsgoreWhatHaveYouDone: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreWhatHaveYouDone),
      new CosmosData(idcAsgoreWhatHaveYouDone$info)
   ),
   idcAsgoreWhatYouDoin: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreWhatYouDoin),
      new CosmosData(idcAsgoreWhatYouDoin$info)
   ),
   idcAsrielCocky: new CosmosAnimationResources(new CosmosImage(idcAsrielCocky), new CosmosData(idcAsrielCocky$info)),
   idcAsrielEvil: new CosmosAnimationResources(new CosmosImage(idcAsrielEvil), new CosmosData(idcAsrielEvil$info)),
   idcAsrielEvilClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielEvilClosed),
      new CosmosData(idcAsrielEvilClosed$info)
   ),
   idcAsrielFear: new CosmosAnimationResources(new CosmosImage(idcAsrielFear), new CosmosData(idcAsrielFear$info)),
   idcAsrielFocus: new CosmosAnimationResources(new CosmosImage(idcAsrielFocus), new CosmosData(idcAsrielFocus$info)),
   idcAsrielFocusClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusClosed),
      new CosmosData(idcAsrielFocusClosed$info)
   ),
   idcAsrielFocusSide: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusSide),
      new CosmosData(idcAsrielFocusSide$info)
   ),
   idcAsrielFurrow: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFurrow),
      new CosmosData(idcAsrielFurrow$info)
   ),
   idcAsrielHuh: new CosmosAnimationResources(new CosmosImage(idcAsrielHuh), new CosmosData(idcAsrielHuh$info)),
   idcAsrielOhReally: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReally),
      new CosmosData(idcAsrielOhReally$info)
   ),
   idcAsrielOhReallyClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReallyClosed),
      new CosmosData(idcAsrielOhReallyClosed$info)
   ),
   idcAsrielPlain: new CosmosAnimationResources(new CosmosImage(idcAsrielPlain), new CosmosData(idcAsrielPlain$info)),
   idcAsrielPlainClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielPlainClosed),
      new CosmosData(idcAsrielPlainClosed$info)
   ),
   idcAsrielSmirk: new CosmosAnimationResources(new CosmosImage(idcAsrielSmirk), new CosmosData(idcAsrielSmirk$info)),
   idcKiddAww: new CosmosAnimationResources(new CosmosImage(idcKiddAww), new CosmosData(idcKiddAww$info)),
   idcKiddCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcKiddCutscene1),
      new CosmosData(idcKiddCutscene1$info)
   ),
   idcKiddHuh: new CosmosAnimationResources(new CosmosImage(idcKiddHuh), new CosmosData(idcKiddHuh$info)),
   idcKiddHuhSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddHuhSlave),
      new CosmosData(idcKiddHuhSlave$info)
   ),
   idcKiddKiller: new CosmosAnimationResources(new CosmosImage(idcKiddKiller), new CosmosData(idcKiddKiller$info)),
   idcKiddKillerSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddKillerSlave),
      new CosmosData(idcKiddKillerSlave$info)
   ),
   idcKiddNeutral: new CosmosAnimationResources(new CosmosImage(idcKiddNeutral), new CosmosData(idcKiddNeutral$info)),
   idcKiddNeutralSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddNeutralSlave),
      new CosmosData(idcKiddNeutralSlave$info)
   ),
   idcKiddSerene: new CosmosAnimationResources(new CosmosImage(idcKiddSerene), new CosmosData(idcKiddSerene$info)),
   idcKiddShocked: new CosmosAnimationResources(new CosmosImage(idcKiddShocked), new CosmosData(idcKiddShocked$info)),
   idcKiddShockedSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddShockedSlave),
      new CosmosData(idcKiddShockedSlave$info)
   ),
   idcKiddSide: new CosmosAnimationResources(new CosmosImage(idcKiddSide), new CosmosData(idcKiddSide$info)),
   idcMettatonNeo: new CosmosImage(idcMettatonNeo),
   idcPapyrusAYAYA: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusAYAYA),
      new CosmosData(idcPapyrusAYAYA$info)
   ),
   idcPapyrusAyoo: new CosmosAnimationResources(new CosmosImage(idcPapyrusAyoo), new CosmosData(idcPapyrusAyoo$info)),
   idcPapyrusBattleAnime: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleAnime),
      new CosmosData(idcPapyrusBattleAnime$info)
   ),
   idcPapyrusBattleBlush: new CosmosImage(idcPapyrusBattleBlush),
   idcPapyrusBattleBlushRefuse: new CosmosImage(idcPapyrusBattleBlushRefuse),
   idcPapyrusBattleClosed: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleClosed),
      new CosmosData(idcPapyrusBattleClosed$info)
   ),
   idcPapyrusBattleConfident: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleConfident),
      new CosmosData(idcPapyrusBattleConfident$info)
   ),
   idcPapyrusBattleDeadpan: new CosmosImage(idcPapyrusBattleDeadpan),
   idcPapyrusBattleDetermined: new CosmosImage(idcPapyrusBattleDetermined),
   idcPapyrusBattleEyeroll: new CosmosImage(idcPapyrusBattleEyeroll),
   idcPapyrusBattleFakeAnger: new CosmosImage(idcPapyrusBattleFakeAnger),
   idcPapyrusBattleHapp: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleHapp),
      new CosmosData(idcPapyrusBattleHapp$info)
   ),
   idcPapyrusBattleHappAgain: new CosmosImage(idcPapyrusBattleHappAgain),
   idcPapyrusBattleMad: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleMad),
      new CosmosData(idcPapyrusBattleMad$info)
   ),
   idcPapyrusBattleNooo: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleNooo),
      new CosmosData(idcPapyrusBattleNooo$info)
   ),
   idcPapyrusBattleOwwie: new CosmosImage(idcPapyrusBattleOwwie),
   idcPapyrusBattleShock: new CosmosImage(idcPapyrusBattleShock),
   idcPapyrusBattleSide: new CosmosImage(idcPapyrusBattleSide),
   idcPapyrusBattleSly: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleSly),
      new CosmosData(idcPapyrusBattleSly$info)
   ),
   idcPapyrusBattleSus: new CosmosImage(idcPapyrusBattleSus),
   idcPapyrusBattleSweat: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusBattleSweat),
      new CosmosData(idcPapyrusBattleSweat$info)
   ),
   idcPapyrusBattleTopBlush: new CosmosImage(idcPapyrusBattleTopBlush),
   idcPapyrusBattleWeary: new CosmosImage(idcPapyrusBattleWeary),
   idcPapyrusCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusCutscene1),
      new CosmosData(idcPapyrusCutscene1$info)
   ),
   idcPapyrusDisbeef: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusDisbeef),
      new CosmosData(idcPapyrusDisbeef$info)
   ),
   idcPapyrusDisbeefTurnaround: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusDisbeefTurnaround),
      new CosmosData(idcPapyrusDisbeefTurnaround$info)
   ),
   idcPapyrusIsThatSo: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusIsThatSo),
      new CosmosData(idcPapyrusIsThatSo$info)
   ),
   idcPapyrusNervousLaugh: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusNervousLaugh),
      new CosmosData(idcPapyrusNervousLaugh$info)
   ),
   idcPapyrusNervousSweat: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusNervousSweat),
      new CosmosData(idcPapyrusNervousSweat$info)
   ),
   idcPapyrusNyeh: new CosmosAnimationResources(new CosmosImage(idcPapyrusNyeh), new CosmosData(idcPapyrusNyeh$info)),
   idcPapyrusSad: new CosmosAnimationResources(new CosmosImage(idcPapyrusSad), new CosmosData(idcPapyrusSad$info)),
   idcPapyrusSadSweat: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusSadSweat),
      new CosmosData(idcPapyrusSadSweat$info)
   ),
   idcPapyrusThisIsSoSad: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusThisIsSoSad),
      new CosmosData(idcPapyrusThisIsSoSad$info)
   ),
   idcPapyrusWhatchaGonnaDo: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusWhatchaGonnaDo),
      new CosmosData(idcPapyrusWhatchaGonnaDo$info)
   ),
   idcSansBlink: new CosmosImage(idcSansBlink),
   idcSansEmpty: new CosmosImage(idcSansEmpty),
   idcSansEye: new CosmosAnimationResources(new CosmosImage(idcSansEye), new CosmosData(idcSansEye$info)),
   idcSansLaugh1: new CosmosImage(idcSansLaugh1),
   idcSansLaugh2: new CosmosImage(idcSansLaugh2),
   idcSansNormal: new CosmosImage(idcSansNormal),
   idcSansToriel: new CosmosImage(idcSansToriel),
   idcSansWink: new CosmosImage(idcSansWink),
   idcTorielBlush: new CosmosAnimationResources(new CosmosImage(idcTorielBlush), new CosmosData(idcTorielBlush$info)),
   idcTorielCompassion: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassion),
      new CosmosData(idcTorielCompassion$info)
   ),
   idcTorielCompassionFrown: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassionFrown),
      new CosmosData(idcTorielCompassionFrown$info)
   ),
   idcTorielCompassionSmile: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassionSmile),
      new CosmosData(idcTorielCompassionSmile$info)
   ),
   idcTorielConcern: new CosmosAnimationResources(
      new CosmosImage(idcTorielConcern),
      new CosmosData(idcTorielConcern$info)
   ),
   idcTorielCry: new CosmosAnimationResources(new CosmosImage(idcTorielCry), new CosmosData(idcTorielCry$info)),
   idcTorielCryLaugh: new CosmosAnimationResources(
      new CosmosImage(idcTorielCryLaugh),
      new CosmosData(idcTorielCryLaugh$info)
   ),
   idcTorielCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcTorielCutscene1),
      new CosmosData(idcTorielCutscene1$info)
   ),
   idcTorielCutscene2: new CosmosAnimationResources(
      new CosmosImage(idcTorielCutscene2),
      new CosmosData(idcTorielCutscene2$info)
   ),
   idcTorielDreamworks: new CosmosAnimationResources(
      new CosmosImage(idcTorielDreamworks),
      new CosmosData(idcTorielDreamworks$info)
   ),
   idcTorielEverythingisfine: new CosmosAnimationResources(
      new CosmosImage(idcTorielEverythingisfine),
      new CosmosData(idcTorielEverythingisfine$info)
   ),
   idcTorielIsMad: new CosmosAnimationResources(new CosmosImage(idcTorielIsMad), new CosmosData(idcTorielIsMad$info)),
   idcTorielLowConcern: new CosmosAnimationResources(
      new CosmosImage(idcTorielLowConcern),
      new CosmosData(idcTorielLowConcern$info)
   ),
   idcTorielSad: new CosmosAnimationResources(new CosmosImage(idcTorielSad), new CosmosData(idcTorielSad$info)),
   idcTorielShock: new CosmosAnimationResources(new CosmosImage(idcTorielShock), new CosmosData(idcTorielShock$info)),
   idcTorielSincere: new CosmosAnimationResources(
      new CosmosImage(idcTorielSincere),
      new CosmosData(idcTorielSincere$info)
   ),
   idcTorielSmallXD: new CosmosAnimationResources(
      new CosmosImage(idcTorielSmallXD),
      new CosmosData(idcTorielSmallXD$info)
   ),
   idcTorielStraightUp: new CosmosAnimationResources(
      new CosmosImage(idcTorielStraightUp),
      new CosmosData(idcTorielStraightUp$info)
   ),
   idcTorielWTF: new CosmosAnimationResources(new CosmosImage(idcTorielWTF), new CosmosData(idcTorielWTF$info)),
   idcTorielWTF2: new CosmosAnimationResources(new CosmosImage(idcTorielWTF2), new CosmosData(idcTorielWTF2$info)),
   idcTorielXD: new CosmosAnimationResources(new CosmosImage(idcTorielXD), new CosmosData(idcTorielXD$info)),
   idcTwinklyCapping: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyCapping),
      new CosmosData(idcTwinklyCapping$info)
   ),
   idcTwinklyEvil: new CosmosAnimationResources(new CosmosImage(idcTwinklyEvil), new CosmosData(idcTwinklyEvil$info)),
   idcTwinklyGonk: new CosmosAnimationResources(new CosmosImage(idcTwinklyGonk), new CosmosData(idcTwinklyGonk$info)),
   idcTwinklyGrin: new CosmosAnimationResources(new CosmosImage(idcTwinklyGrin), new CosmosData(idcTwinklyGrin$info)),
   idcTwinklyHurt: new CosmosImage(idcTwinklyHurt),
   idcTwinklyKawaii: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyKawaii),
      new CosmosData(idcTwinklyKawaii$info)
   ),
   idcTwinklyLaugh: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyLaugh),
      new CosmosData(idcTwinklyLaugh$info)
   ),
   idcTwinklyNice: new CosmosAnimationResources(new CosmosImage(idcTwinklyNice), new CosmosData(idcTwinklyNice$info)),
   idcTwinklyPissed: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyPissed),
      new CosmosData(idcTwinklyPissed$info)
   ),
   idcTwinklyPlain: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyPlain),
      new CosmosData(idcTwinklyPlain$info)
   ),
   idcTwinklySassy: new CosmosAnimationResources(
      new CosmosImage(idcTwinklySassy),
      new CosmosData(idcTwinklySassy$info)
   ),
   idcTwinklySide: new CosmosAnimationResources(new CosmosImage(idcTwinklySide), new CosmosData(idcTwinklySide$info)),
   idcTwinklyWink: new CosmosImage(idcTwinklyWink),
   idcUndyneAngryTomato: new CosmosImage(idcUndyneAngryTomato),
   idcUndyneBattleTorso: new CosmosImage(idcUndyneBattleTorso),
   idcUndyneBeingAwesomeForTenMinutesStraight: new CosmosImage(idcUndyneBeingAwesomeForTenMinutesStraight),
   idcUndyneCutscene1: new CosmosImage(idcUndyneCutscene1),
   idcUndyneDafuq: new CosmosImage(idcUndyneDafuq),
   idcUndyneDateTorso: new CosmosImage(idcUndyneDateTorso),
   idcUndyneDateTorsoBody: new CosmosImage(idcUndyneDateTorsoBody),
   idcUndyneGrr: new CosmosImage(idcUndyneGrr),
   idcUndyneGrrSide: new CosmosImage(idcUndyneGrrSide),
   idcUndyneHappyTomato: new CosmosImage(idcUndyneHappyTomato),
   idcUndyneImOntoYouPunk: new CosmosImage(idcUndyneImOntoYouPunk),
   idcUndyneLaughcrazy: new CosmosImage(idcUndyneLaughcrazy),
   idcUndynePensive: new CosmosImage(idcUndynePensive),
   idcUndyneSquidgames: new CosmosImage(idcUndyneSquidgames),
   idcUndyneSus: new CosmosImage(idcUndyneSus),
   idcUndyneSweating: new CosmosImage(idcUndyneSweating),
   idcUndynetheHell: new CosmosImage(idcUndynetheHell),
   idcUndyneUWU: new CosmosImage(idcUndyneUWU),
   idcUndyneWhatevs: new CosmosImage(idcUndyneWhatevs),
   idcUndyneWTFBro: new CosmosImage(idcUndyneWTFBro),
   idcUndyneYouKilledHim: new CosmosImage(idcUndyneYouKilledHim),
   idcUndyneYouKilledHimPensive: new CosmosImage(idcUndyneYouKilledHimPensive),
   idcUndyneYouKilledHimSide: new CosmosImage(idcUndyneYouKilledHimSide),
   idcUndyneYouKilledHimSmile: new CosmosImage(idcUndyneYouKilledHimSmile),
   idcUndyneYouKilledHimStare: new CosmosImage(idcUndyneYouKilledHimStare),
   ieArtsncrafts: new CosmosImage(ieArtsncrafts),
   ieBiodome: new CosmosImage(ieBiodome),
   ieButtonC: new CosmosImage(ieButtonC),
   ieButtonM: new CosmosImage(ieButtonM),
   ieButtonX: new CosmosImage(ieButtonX),
   ieButtonZ: new CosmosImage(ieButtonZ),
   ieCrossword: new CosmosImage(ieCrossword),
   ieHomeworld: new CosmosImage(ieHomeworld),
   ieMonitorguy: new CosmosAnimationResources(new CosmosImage(ieMonitorguy), new CosmosData(ieMonitorguy$info)),
   ieMonitorguyWater: new CosmosAnimationResources(
      new CosmosImage(ieMonitorguyWater),
      new CosmosData(ieMonitorguyWater$info)
   ),
   ieNapster: new CosmosImage(ieNapster),
   ieOuternet: new CosmosImage(ieOuternet),
   iePunchcard: new CosmosImage(iePunchcard),
   ieSOUL: new CosmosImage(ieSOUL),
   ieSplashBackground: new CosmosImage(ieSplashBackground),
   ieSplashForeground: new CosmosImage(ieSplashForeground),
   ieStarbertA: new CosmosAnimationResources(new CosmosImage(ieStarbertA), new CosmosData(ieStarbertA$info)),
   ieStarbertB: new CosmosAnimationResources(new CosmosImage(ieStarbertB), new CosmosData(ieStarbertB$info)),
   ieStarbertBGum: new CosmosImage(ieStarbertBGum),
   ieStory: new CosmosAnimationResources(new CosmosImage(ieStory), new CosmosData(ieStory$info)),
   im_: new CosmosImage(im_),
   imAerialisA: new CosmosImage(imAerialisA),
   imAerialisAOverlay: new CosmosImage(imAerialisAOverlay),
   imAerialisB: new CosmosImage(imAerialisB),
   imAerialisBDark: new CosmosImage(imAerialisBDark),
   imFoundry: new CosmosImage(imFoundry),
   imFoundryOverlay: new CosmosImage(imFoundryOverlay),
   imOutlands: new CosmosImage(imOutlands),
   imStarton: new CosmosImage(imStarton),
   iocAlphysDown: new CosmosAnimationResources(new CosmosImage(iocAlphysDown), new CosmosData(iocAlphysDown$info)),
   iocAlphysDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysDownTalk),
      new CosmosData(iocAlphysDownTalk$info)
   ),
   iocAlphysLeft: new CosmosAnimationResources(new CosmosImage(iocAlphysLeft), new CosmosData(iocAlphysLeft$info)),
   iocAlphysLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysLeftTalk),
      new CosmosData(iocAlphysLeftTalk$info)
   ),
   iocAlphysRight: new CosmosAnimationResources(new CosmosImage(iocAlphysRight), new CosmosData(iocAlphysRight$info)),
   iocAlphysRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysRightTalk),
      new CosmosData(iocAlphysRightTalk$info)
   ),
   iocAlphysShocked: new CosmosImage(iocAlphysShocked),
   iocAlphysUp: new CosmosAnimationResources(new CosmosImage(iocAlphysUp), new CosmosData(iocAlphysUp$info)),
   iocAlphysUpTalk: new CosmosImage(iocAlphysUpTalk),
   iocAsgoreDown: new CosmosAnimationResources(new CosmosImage(iocAsgoreDown), new CosmosData(iocAsgoreDown$info)),
   iocAsgoreDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreDownTalk),
      new CosmosData(iocAsgoreDownTalk$info)
   ),
   iocAsgoreLeft: new CosmosAnimationResources(new CosmosImage(iocAsgoreLeft), new CosmosData(iocAsgoreLeft$info)),
   iocAsgoreLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreLeftTalk),
      new CosmosData(iocAsgoreLeftTalk$info)
   ),
   iocAsgoreRight: new CosmosAnimationResources(new CosmosImage(iocAsgoreRight), new CosmosData(iocAsgoreRight$info)),
   iocAsgoreRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreRightTalk),
      new CosmosData(iocAsgoreRightTalk$info)
   ),
   iocAsgoreUp: new CosmosAnimationResources(new CosmosImage(iocAsgoreUp), new CosmosData(iocAsgoreUp$info)),
   iocAsgoreUpTalk: new CosmosImage(iocAsgoreUpTalk),
   iocAsrielDown: new CosmosAnimationResources(new CosmosImage(iocAsrielDown), new CosmosData(iocAsrielDown$info)),
   iocAsrielDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielDownTalk),
      new CosmosData(iocAsrielDownTalk$info)
   ),
   iocAsrielEarTug: new CosmosAnimationResources(
      new CosmosImage(iocAsrielEarTug),
      new CosmosData(iocAsrielEarTug$info)
   ),
   iocAsrielEarTugWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielEarTugWater),
      new CosmosData(iocAsrielEarTugWater$info)
   ),
   iocAsrielHug1: new CosmosAnimationResources(
      new CosmosImage(iocAsrielHug1, dark01),
      new CosmosData(iocAsrielHug1$info)
   ),
   iocAsrielHug1Normal: new CosmosAnimationResources(
      new CosmosImage(iocAsrielHug1),
      new CosmosData(iocAsrielHug1$info)
   ),
   iocAsrielHug1NormalWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielHug1Water),
      new CosmosData(iocAsrielHug1Water$info)
   ),
   iocAsrielKneel: new CosmosImage(iocAsrielKneel),
   iocAsrielLeft: new CosmosAnimationResources(new CosmosImage(iocAsrielLeft), new CosmosData(iocAsrielLeft$info)),
   iocAsrielLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielLeftTalk),
      new CosmosData(iocAsrielLeftTalk$info)
   ),
   iocAsrielPet: new CosmosAnimationResources(new CosmosImage(iocAsrielPet), new CosmosData(iocAsrielPet$info)),
   iocAsrielPetWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielPetWater),
      new CosmosData(iocAsrielPetWater$info)
   ),
   iocAsrielRight: new CosmosAnimationResources(new CosmosImage(iocAsrielRight), new CosmosData(iocAsrielRight$info)),
   iocAsrielRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielRightTalk),
      new CosmosData(iocAsrielRightTalk$info)
   ),
   iocAsrielUp: new CosmosAnimationResources(new CosmosImage(iocAsrielUp), new CosmosData(iocAsrielUp$info)),
   iocAsrielUpTalk: new CosmosImage(iocAsrielUp),
   iocFriskDown: new CosmosAnimationResources(new CosmosImage(iocFriskDown), new CosmosData(iocFriskDown$info)),
   iocFriskDownJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownJetpack),
      new CosmosData(iocFriskDownJetpack$info)
   ),
   iocFriskDownJetpackOff: new CosmosImage(iocFriskDownJetpackOff),
   iocFriskDownWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownWater),
      new CosmosData(iocFriskDownWater$info)
   ),
   iocFriskDownWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownWaterJetpack),
      new CosmosData(iocFriskDownWaterJetpack$info)
   ),
   iocFriskDownWaterJetpackOff: new CosmosImage(iocFriskDownWaterJetpackOff),
   iocFriskLeft: new CosmosAnimationResources(new CosmosImage(iocFriskLeft), new CosmosData(iocFriskLeft$info)),
   iocFriskLeftJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftJetpack),
      new CosmosData(iocFriskLeftJetpack$info)
   ),
   iocFriskLeftJetpackOff: new CosmosImage(iocFriskLeftJetpackOff),
   iocFriskLeftWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWater),
      new CosmosData(iocFriskLeftWater$info)
   ),
   iocFriskLeftWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWaterJetpack),
      new CosmosData(iocFriskLeftWaterJetpack$info)
   ),
   iocFriskLeftWaterJetpackOff: new CosmosImage(iocFriskLeftWaterJetpackOff),
   iocFriskLeftWaterPour: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWaterPour),
      new CosmosData(iocFriskLeftWaterPour$info)
   ),
   iocFriskRight: new CosmosAnimationResources(new CosmosImage(iocFriskRight), new CosmosData(iocFriskRight$info)),
   iocFriskRightJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightJetpack),
      new CosmosData(iocFriskRightJetpack$info)
   ),
   iocFriskRightJetpackOff: new CosmosImage(iocFriskRightJetpackOff),
   iocFriskRightWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightWater),
      new CosmosData(iocFriskRightWater$info)
   ),
   iocFriskRightWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightWaterJetpack),
      new CosmosData(iocFriskRightWaterJetpack$info)
   ),
   iocFriskRightWaterJetpackOff: new CosmosImage(iocFriskRightWaterJetpackOff),
   iocFriskUp: new CosmosAnimationResources(new CosmosImage(iocFriskUp), new CosmosData(iocFriskUp$info)),
   iocFriskUpJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpJetpack),
      new CosmosData(iocFriskUpJetpack$info)
   ),
   iocFriskUpJetpackOff: new CosmosImage(iocFriskUpJetpackOff),
   iocFriskUpWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpWater),
      new CosmosData(iocFriskUpWater$info)
   ),
   iocFriskUpWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpWaterJetpack),
      new CosmosData(iocFriskUpWaterJetpack$info)
   ),
   iocFriskUpWaterJetpackOff: new CosmosImage(iocFriskUpWaterJetpackOff),
   iocGrillbyDown: new CosmosAnimationResources(new CosmosImage(iocGrillbyDown), new CosmosData(iocGrillbyDown$info)),
   iocGrillbyUp: new CosmosAnimationResources(new CosmosImage(iocGrillbyUp), new CosmosData(iocGrillbyUp$info)),
   iocKiddCrouch: new CosmosImage(iocKiddCrouch),
   iocKiddDarkLeftTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTrip, dark01),
      new CosmosData(iocKiddLeftTrip$info)
   ),
   iocKiddDarkRightTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTrip, dark01),
      new CosmosData(iocKiddRightTrip$info)
   ),
   iocKiddDown: new CosmosAnimationResources(new CosmosImage(iocKiddDown), new CosmosData(iocKiddDown$info)),
   iocKiddDownSad: new CosmosAnimationResources(new CosmosImage(iocKiddDownSad), new CosmosData(iocKiddDownSad$info)),
   iocKiddDownSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownSlave),
      new CosmosData(iocKiddDownSlave$info)
   ),
   iocKiddDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalk),
      new CosmosData(iocKiddDownTalk$info)
   ),
   iocKiddDownTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalkSad),
      new CosmosData(iocKiddDownTalkSad$info)
   ),
   iocKiddDownTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalkSlave),
      new CosmosData(iocKiddDownTalkSlave$info)
   ),
   iocKiddLeft: new CosmosAnimationResources(new CosmosImage(iocKiddLeft), new CosmosData(iocKiddLeft$info)),
   iocKiddLeftSad: new CosmosAnimationResources(new CosmosImage(iocKiddLeftSad), new CosmosData(iocKiddLeftSad$info)),
   iocKiddLeftSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftSlave),
      new CosmosData(iocKiddLeftSlave$info)
   ),
   iocKiddLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalk),
      new CosmosData(iocKiddLeftTalk$info)
   ),
   iocKiddLeftTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalkSad),
      new CosmosData(iocKiddLeftTalkSad$info)
   ),
   iocKiddLeftTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalkSlave),
      new CosmosData(iocKiddLeftTalkSlave$info)
   ),
   iocKiddLeftTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTrip),
      new CosmosData(iocKiddLeftTrip$info)
   ),
   iocKiddRight: new CosmosAnimationResources(new CosmosImage(iocKiddRight), new CosmosData(iocKiddRight$info)),
   iocKiddRightSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightSad),
      new CosmosData(iocKiddRightSad$info)
   ),
   iocKiddRightSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightSlave),
      new CosmosData(iocKiddRightSlave$info)
   ),
   iocKiddRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalk),
      new CosmosData(iocKiddRightTalk$info)
   ),
   iocKiddRightTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalkSad),
      new CosmosData(iocKiddRightTalkSad$info)
   ),
   iocKiddRightTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalkSlave),
      new CosmosData(iocKiddRightTalkSlave$info)
   ),
   iocKiddRightTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTrip),
      new CosmosData(iocKiddRightTrip$info)
   ),
   iocKiddUp: new CosmosAnimationResources(new CosmosImage(iocKiddUp), new CosmosData(iocKiddUp$info)),
   iocKiddUpTalk: new CosmosAnimationResources(new CosmosImage(iocKiddUpTalk), new CosmosData(iocKiddUpTalk$info)),
   iocMettatonAnchorDotdotdot: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorDotdotdot),
      new CosmosData(iocMettatonAnchorDotdotdot$info)
   ),
   iocMettatonAnchorFlyer: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorFlyer),
      new CosmosData(iocMettatonAnchorFlyer$info)
   ),
   iocMettatonAnchorG: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorG),
      new CosmosData(iocMettatonAnchorG$info)
   ),
   iocMettatonAnchorLaugh: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorLaugh),
      new CosmosData(iocMettatonAnchorLaugh$info)
   ),
   iocMettatonAnchorOMG: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorOMG),
      new CosmosData(iocMettatonAnchorOMG$info)
   ),
   iocMettatonAnchorPoint: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorPoint),
      new CosmosData(iocMettatonAnchorPoint$info)
   ),
   iocMettatonBackhands: new CosmosAnimationResources(
      new CosmosImage(iocMettatonBackhands),
      new CosmosData(iocMettatonBackhands$info)
   ),
   iocMettatonBro: new CosmosImage(iocMettatonBro),
   iocMettatonClap: new CosmosAnimationResources(
      new CosmosImage(iocMettatonClap),
      new CosmosData(iocMettatonClap$info)
   ),
   iocMettatonConfused: new CosmosAnimationResources(
      new CosmosImage(iocMettatonConfused),
      new CosmosData(iocMettatonConfused$info)
   ),
   iocMettatonDotdotdot: new CosmosImage(iocMettatonDotdotdot),
   iocMettatonDressIdle: new CosmosAnimationResources(
      new CosmosImage(iocMettatonDressIdle),
      new CosmosData(iocMettatonDressIdle$info)
   ),
   iocMettatonDressPull: new CosmosAnimationResources(
      new CosmosImage(iocMettatonDressPull),
      new CosmosData(iocMettatonDressPull$info)
   ),
   iocMettatonDressRoll: new CosmosImage(iocMettatonDressRoll),
   iocMettatonFlyer: new CosmosAnimationResources(
      new CosmosImage(iocMettatonFlyer),
      new CosmosData(iocMettatonFlyer$info)
   ),
   iocMettatonLaugh: new CosmosAnimationResources(
      new CosmosImage(iocMettatonLaugh),
      new CosmosData(iocMettatonLaugh$info)
   ),
   iocMettatonMicrophone: new CosmosAnimationResources(
      new CosmosImage(iocMettatonMicrophone),
      new CosmosData(iocMettatonMicrophone$info)
   ),
   iocMettatonNeo: new CosmosAnimationResources(new CosmosImage(iocMettatonNeo), new CosmosData(iocMettatonNeo$info)),
   iocMettatonPoint: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPoint),
      new CosmosData(iocMettatonPoint$info)
   ),
   iocMettatonPointthree: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointthree),
      new CosmosData(iocMettatonPointthree$info)
   ),
   iocMettatonRollLeft: new CosmosAnimationResources(
      new CosmosImage(iocMettatonRollLeft),
      new CosmosData(iocMettatonRollLeft$info)
   ),
   iocMettatonRollRight: new CosmosAnimationResources(
      new CosmosImage(iocMettatonRollRight),
      new CosmosData(iocMettatonRollRight$info)
   ),
   iocMettatonSeriouspose: new CosmosAnimationResources(
      new CosmosImage(iocMettatonSeriouspose),
      new CosmosData(iocMettatonSeriouspose$info)
   ),
   iocMettatonShrug: new CosmosAnimationResources(
      new CosmosImage(iocMettatonShrug),
      new CosmosData(iocMettatonShrug$info)
   ),
   iocMettatonWave: new CosmosAnimationResources(
      new CosmosImage(iocMettatonWave),
      new CosmosData(iocMettatonWave$info)
   ),
   iocNapstablookBody: new CosmosImage(iocNapstablookBody),
   iocNapstablookDown: new CosmosImage(iocNapstablookDown),
   iocNapstablookDownAlter: new CosmosImage(iocNapstablookDownAlter),
   iocNapstablookLeft: new CosmosImage(iocNapstablookLeft),
   iocNapstablookLeftAlter: new CosmosImage(iocNapstablookLeftAlter),
   iocNapstablookRight: new CosmosImage(iocNapstablookRight),
   iocNapstablookRightAlter: new CosmosImage(iocNapstablookRightAlter),
   iocNapstablookShadow: new CosmosImage(iocNapstablookShadow),
   iocNapstablookUp: new CosmosImage(iocNapstablookUp),
   iocNapstablookUpAlter: new CosmosImage(iocNapstablookUpAlter),
   iocPapyrusCape: new CosmosAnimationResources(new CosmosImage(iocPapyrusCape), new CosmosData(iocPapyrusCape$info)),
   iocPapyrusCapeStark: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusCapeStark),
      new CosmosData(iocPapyrusCapeStark$info)
   ),
   iocPapyrusDown: new CosmosAnimationResources(new CosmosImage(iocPapyrusDown), new CosmosData(iocPapyrusDown$info)),
   iocPapyrusDownMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownMad),
      new CosmosData(iocPapyrusDownMad$info)
   ),
   iocPapyrusDownMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownMadTalk),
      new CosmosData(iocPapyrusDownMadTalk$info)
   ),
   iocPapyrusDownStark: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownStark),
      new CosmosData(iocPapyrusDownStark$info)
   ),
   iocPapyrusDownStarkTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownStarkTalk),
      new CosmosData(iocPapyrusDownStarkTalk$info)
   ),
   iocPapyrusDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownTalk),
      new CosmosData(iocPapyrusDownTalk$info)
   ),
   iocPapyrusKnock: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusKnock),
      new CosmosData(iocPapyrusKnock$info)
   ),
   iocPapyrusLeap: new CosmosAnimationResources(new CosmosImage(iocPapyrusLeap), new CosmosData(iocPapyrusLeap$info)),
   iocPapyrusLeft: new CosmosAnimationResources(new CosmosImage(iocPapyrusLeft), new CosmosData(iocPapyrusLeft$info)),
   iocPapyrusLeftMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftMad),
      new CosmosData(iocPapyrusLeftMad$info)
   ),
   iocPapyrusLeftMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftMadTalk),
      new CosmosData(iocPapyrusLeftMadTalk$info)
   ),
   iocPapyrusLeftStark: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftStark),
      new CosmosData(iocPapyrusLeftStark$info)
   ),
   iocPapyrusLeftStarkTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftStarkTalk),
      new CosmosData(iocPapyrusLeftStarkTalk$info)
   ),
   iocPapyrusLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftTalk),
      new CosmosData(iocPapyrusLeftTalk$info)
   ),
   iocPapyrusPresent: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusPresent),
      new CosmosData(iocPapyrusPresent$info)
   ),
   iocPapyrusPresent2: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusPresent2),
      new CosmosData(iocPapyrusPresent2$info)
   ),
   iocPapyrusRight: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRight),
      new CosmosData(iocPapyrusRight$info)
   ),
   iocPapyrusRightMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightMad),
      new CosmosData(iocPapyrusRightMad$info)
   ),
   iocPapyrusRightMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightMadTalk),
      new CosmosData(iocPapyrusRightMadTalk$info)
   ),
   iocPapyrusRightStark: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightStark),
      new CosmosData(iocPapyrusRightStark$info)
   ),
   iocPapyrusRightStarkTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightStarkTalk),
      new CosmosData(iocPapyrusRightStarkTalk$info)
   ),
   iocPapyrusRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightTalk),
      new CosmosData(iocPapyrusRightTalk$info)
   ),
   iocPapyrusStomp: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusStomp),
      new CosmosData(iocPapyrusStomp$info)
   ),
   iocPapyrusUp: new CosmosAnimationResources(new CosmosImage(iocPapyrusUp), new CosmosData(iocPapyrusUp$info)),
   iocPapyrusUpTalk: new CosmosImage(iocPapyrusUp),
   iocSansDown: new CosmosAnimationResources(new CosmosImage(iocSansDown), new CosmosData(iocSansDown$info)),
   iocSansDownStatic: new CosmosImage(iocSansDown),
   iocSansDownTalk: new CosmosImage(iocSansDown),
   iocSansHandshake: new CosmosAnimationResources(
      new CosmosImage(iocSansHandshake),
      new CosmosData(iocSansHandshake$info)
   ),
   iocSansLeft: new CosmosAnimationResources(new CosmosImage(iocSansLeft), new CosmosData(iocSansLeft$info)),
   iocSansLeftTalk: new CosmosImage(iocSansLeft),
   iocSansRight: new CosmosAnimationResources(new CosmosImage(iocSansRight), new CosmosData(iocSansRight$info)),
   iocSansRightTalk: new CosmosImage(iocSansRight),
   iocSansShrug: new CosmosImage(iocSansShrug),
   iocSansSleep: new CosmosAnimationResources(new CosmosImage(iocSansSleep), new CosmosData(iocSansSleep$info)),
   iocSansStool: new CosmosImage(iocSansStool),
   iocSansStoolComb: new CosmosAnimationResources(
      new CosmosImage(iocSansStoolComb),
      new CosmosData(iocSansStoolComb$info)
   ),
   iocSansStoolLeft: new CosmosImage(iocSansStoolLeft),
   iocSansStoolScratch: new CosmosAnimationResources(
      new CosmosImage(iocSansStoolScratch),
      new CosmosData(iocSansStoolScratch$info)
   ),
   iocSansTrombone: new CosmosAnimationResources(
      new CosmosImage(iocSansTrombone),
      new CosmosData(iocSansTrombone$info)
   ),
   iocSansUp: new CosmosAnimationResources(new CosmosImage(iocSansUp), new CosmosData(iocSansUp$info)),
   iocSansUpTalk: new CosmosImage(iocSansUp),
   iocSansWink: new CosmosImage(iocSansWink),
   iocTemmieLeft: new CosmosAnimationResources(new CosmosImage(iocTemmieLeft), new CosmosData(iocTemmieLeft$info)),
   iocTemmieLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocTemmieLeftTalk),
      new CosmosData(iocTemmieLeftTalk$info)
   ),
   iocTemmieRight: new CosmosAnimationResources(new CosmosImage(iocTemmieRight), new CosmosData(iocTemmieRight$info)),
   iocTemmieRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocTemmieRightTalk),
      new CosmosData(iocTemmieRightTalk$info)
   ),
   iocTorielDown: new CosmosAnimationResources(new CosmosImage(iocTorielDown), new CosmosData(iocTorielDown$info)),
   iocTorielDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielDownTalk),
      new CosmosData(iocTorielDownTalk$info)
   ),
   iocTorielHandholdDown: new CosmosAnimationResources(
      new CosmosImage(iocTorielHandholdDown),
      new CosmosData(iocTorielHandholdDown$info)
   ),
   iocTorielHandholdLeft: new CosmosAnimationResources(
      new CosmosImage(iocTorielHandholdLeft),
      new CosmosData(iocTorielHandholdLeft$info)
   ),
   iocTorielHandholdRight: new CosmosAnimationResources(
      new CosmosImage(iocTorielHandholdRight),
      new CosmosData(iocTorielHandholdRight$info)
   ),
   iocTorielHandholdUp: new CosmosAnimationResources(
      new CosmosImage(iocTorielHandholdUp),
      new CosmosData(iocTorielHandholdUp$info)
   ),
   iocTorielHug: new CosmosAnimationResources(new CosmosImage(iocTorielHug), new CosmosData(iocTorielHug$info)),
   iocTorielLeft: new CosmosAnimationResources(new CosmosImage(iocTorielLeft), new CosmosData(iocTorielLeft$info)),
   iocTorielLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielLeftTalk),
      new CosmosData(iocTorielLeftTalk$info)
   ),
   iocTorielPhone: new CosmosAnimationResources(new CosmosImage(iocTorielPhone), new CosmosData(iocTorielPhone$info)),
   iocTorielPhoneTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielPhoneTalk),
      new CosmosData(iocTorielPhoneTalk$info)
   ),
   iocTorielRight: new CosmosAnimationResources(new CosmosImage(iocTorielRight), new CosmosData(iocTorielRight$info)),
   iocTorielRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielRightTalk),
      new CosmosData(iocTorielRightTalk$info)
   ),
   iocTorielRuffle: new CosmosAnimationResources(
      new CosmosImage(iocTorielRuffle),
      new CosmosData(iocTorielRuffle$info)
   ),
   iocTorielSad: new CosmosAnimationResources(new CosmosImage(iocTorielSad), new CosmosData(iocTorielSad$info)),
   iocTorielUp: new CosmosAnimationResources(new CosmosImage(iocTorielUp), new CosmosData(iocTorielUp$info)),
   iocTorielUpTalk: new CosmosImage(iocTorielUp),
   iocTwinkly: new CosmosAnimationResources(new CosmosImage(iocTwinkly), new CosmosData(iocTwinkly$info)),
   iocUndyneBrandish: new CosmosAnimationResources(
      new CosmosImage(iocUndyneBrandish),
      new CosmosData(iocUndyneBrandish$info)
   ),
   iocUndyneDateBurnt: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateBurnt),
      new CosmosData(iocUndyneDateBurnt$info)
   ),
   iocUndyneDateFlex: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateFlex),
      new CosmosData(iocUndyneDateFlex$info)
   ),
   iocUndyneDateGrab: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateGrab),
      new CosmosData(iocUndyneDateGrab$info)
   ),
   iocUndyneDateKick: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateKick),
      new CosmosData(iocUndyneDateKick$info)
   ),
   iocUndyneDateLeap: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateLeap),
      new CosmosData(iocUndyneDateLeap$info)
   ),
   iocUndyneDateNamaste: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateNamaste),
      new CosmosData(iocUndyneDateNamaste$info)
   ),
   iocUndyneDateOMG: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateOMG),
      new CosmosData(iocUndyneDateOMG$info)
   ),
   iocUndyneDateSit: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateSit),
      new CosmosData(iocUndyneDateSit$info)
   ),
   iocUndyneDateStomp: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateStomp),
      new CosmosData(iocUndyneDateStomp$info)
   ),
   iocUndyneDateStompTomato: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateStompTomato),
      new CosmosData(iocUndyneDateStompTomato$info)
   ),
   iocUndyneDateThrow: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateThrow),
      new CosmosData(iocUndyneDateThrow$info)
   ),
   iocUndyneDateThrowTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateThrowTalk),
      new CosmosData(iocUndyneDateThrowTalk$info)
   ),
   iocUndyneDateTomato: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateTomato),
      new CosmosData(iocUndyneDateTomato$info)
   ),
   iocUndyneDateUppercut: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateUppercut),
      new CosmosData(iocUndyneDateUppercut$info)
   ),
   iocUndyneDive: new CosmosAnimationResources(new CosmosImage(iocUndyneDive), new CosmosData(iocUndyneDive$info)),
   iocUndyneDown: new CosmosAnimationResources(new CosmosImage(iocUndyneDown), new CosmosData(iocUndyneDown$info)),
   iocUndyneDownArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmor),
      new CosmosData(iocUndyneDownArmor$info)
   ),
   iocUndyneDownArmorSpear: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmorSpear),
      new CosmosData(iocUndyneDownArmorSpear$info)
   ),
   iocUndyneDownArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmorWalk),
      new CosmosData(iocUndyneDownArmorWalk$info)
   ),
   iocUndyneDownDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownDate),
      new CosmosData(iocUndyneDownDate$info)
   ),
   iocUndyneDownDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownDateTalk),
      new CosmosData(iocUndyneDownDateTalk$info)
   ),
   iocUndyneDownStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownStoic),
      new CosmosData(iocUndyneDownStoic$info)
   ),
   iocUndyneDownStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownStoicTalk),
      new CosmosData(iocUndyneDownStoicTalk$info)
   ),
   iocUndyneDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownTalk),
      new CosmosData(iocUndyneDownTalk$info)
   ),
   iocUndyneFallen: new CosmosImage(iocUndyneFallen),
   iocUndyneGrabKidd: new CosmosAnimationResources(
      new CosmosImage(iocUndyneGrabKidd),
      new CosmosData(iocUndyneGrabKidd$info)
   ),
   iocUndyneKick: new CosmosAnimationResources(new CosmosImage(iocUndyneKick), new CosmosData(iocUndyneKick$info)),
   iocUndyneLeft: new CosmosAnimationResources(new CosmosImage(iocUndyneLeft), new CosmosData(iocUndyneLeft$info)),
   iocUndyneLeftArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmor),
      new CosmosData(iocUndyneLeftArmor$info)
   ),
   iocUndyneLeftArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmorJetpack),
      new CosmosData(iocUndyneLeftArmorJetpack$info)
   ),
   iocUndyneLeftArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmorWalk),
      new CosmosData(iocUndyneLeftArmorWalk$info)
   ),
   iocUndyneLeftDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftDate),
      new CosmosData(iocUndyneLeftDate$info)
   ),
   iocUndyneLeftDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftDateTalk),
      new CosmosData(iocUndyneLeftDateTalk$info)
   ),
   iocUndyneLeftStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftStoic),
      new CosmosData(iocUndyneLeftStoic$info)
   ),
   iocUndyneLeftStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftStoicTalk),
      new CosmosData(iocUndyneLeftStoicTalk$info)
   ),
   iocUndyneLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftTalk),
      new CosmosData(iocUndyneLeftTalk$info)
   ),
   iocUndynePhone: new CosmosImage(iocUndynePhone),
   iocUndynePullKidd: new CosmosAnimationResources(
      new CosmosImage(iocUndynePullKidd),
      new CosmosData(iocUndynePullKidd$info)
   ),
   iocUndyneRight: new CosmosAnimationResources(new CosmosImage(iocUndyneRight), new CosmosData(iocUndyneRight$info)),
   iocUndyneRightArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmor),
      new CosmosData(iocUndyneRightArmor$info)
   ),
   iocUndyneRightArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmorJetpack),
      new CosmosData(iocUndyneRightArmorJetpack$info)
   ),
   iocUndyneRightArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmorWalk),
      new CosmosData(iocUndyneRightArmorWalk$info)
   ),
   iocUndyneRightDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightDate),
      new CosmosData(iocUndyneRightDate$info)
   ),
   iocUndyneRightDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightDateTalk),
      new CosmosData(iocUndyneRightDateTalk$info)
   ),
   iocUndyneRightStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightStoic),
      new CosmosData(iocUndyneRightStoic$info)
   ),
   iocUndyneRightStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightStoicTalk),
      new CosmosData(iocUndyneRightStoicTalk$info)
   ),
   iocUndyneRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightTalk),
      new CosmosData(iocUndyneRightTalk$info)
   ),
   iocUndyneTurn: new CosmosAnimationResources(new CosmosImage(iocUndyneTurn), new CosmosData(iocUndyneTurn$info)),
   iocUndyneUp: new CosmosAnimationResources(new CosmosImage(iocUndyneUp), new CosmosData(iocUndyneUp$info)),
   iocUndyneUpArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmor),
      new CosmosData(iocUndyneUpArmor$info)
   ),
   iocUndyneUpArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmorJetpack),
      new CosmosData(iocUndyneUpArmorJetpack$info)
   ),
   iocUndyneUpArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmorWalk),
      new CosmosData(iocUndyneUpArmorWalk$info)
   ),
   iocUndyneUpDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpDate),
      new CosmosData(iocUndyneUpDate$info)
   ),
   iocUndyneUpDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpDateTalk),
      new CosmosData(iocUndyneUpDateTalk$info)
   ),
   iocUndyneUpJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpJetpack),
      new CosmosData(iocUndyneUpJetpack$info)
   ),
   iocUndyneUpTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpTalk),
      new CosmosData(iocUndyneUpTalk$info)
   ),
   ionAAngery: new CosmosAnimationResources(new CosmosImage(ionAAngery), new CosmosData(ionAAngery$info)),
   ionAArtgirl: new CosmosAnimationResources(new CosmosImage(ionAArtgirl), new CosmosData(ionAArtgirl$info)),
   ionABedreceptionist: new CosmosAnimationResources(
      new CosmosImage(ionABedreceptionist),
      new CosmosData(ionABedreceptionist$info)
   ),
   ionABlack: new CosmosAnimationResources(new CosmosImage(ionABlack), new CosmosData(ionABlack$info)),
   ionABlackfire: new CosmosAnimationResources(new CosmosImage(ionABlackfire), new CosmosData(ionABlackfire$info)),
   ionABoomer: new CosmosAnimationResources(new CosmosImage(ionABoomer), new CosmosData(ionABoomer$info)),
   ionABowtie: new CosmosAnimationResources(new CosmosImage(ionABowtie), new CosmosData(ionABowtie$info)),
   ionABusinessdude: new CosmosAnimationResources(
      new CosmosImage(ionABusinessdude),
      new CosmosData(ionABusinessdude$info)
   ),
   ionACharles: new CosmosAnimationResources(new CosmosImage(ionACharles), new CosmosData(ionACharles$info)),
   ionAClamguyBack: new CosmosAnimationResources(
      new CosmosImage(ionAClamguyBack),
      new CosmosData(ionAClamguyBack$info)
   ),
   ionAClamguyFront: new CosmosAnimationResources(
      new CosmosImage(ionAClamguyFront),
      new CosmosData(ionAClamguyFront$info)
   ),
   ionADarkman: new CosmosAnimationResources(new CosmosImage(ionADarkman), new CosmosData(ionADarkman$info)),
   ionADiamond1: new CosmosAnimationResources(new CosmosImage(ionADiamond1), new CosmosData(ionADiamond1$info)),
   ionADiamond2: new CosmosAnimationResources(new CosmosImage(ionADiamond2), new CosmosData(ionADiamond2$info)),
   ionADragon: new CosmosAnimationResources(new CosmosImage(ionADragon), new CosmosData(ionADragon$info)),
   ionADrakedad: new CosmosAnimationResources(new CosmosImage(ionADrakedad), new CosmosData(ionADrakedad$info)),
   ionADrakemom: new CosmosAnimationResources(new CosmosImage(ionADrakemom), new CosmosData(ionADrakemom$info)),
   ionAFoodreceptionist: new CosmosAnimationResources(
      new CosmosImage(ionAFoodreceptionist),
      new CosmosData(ionAFoodreceptionist$info)
   ),
   ionAGiftbear: new CosmosAnimationResources(new CosmosImage(ionAGiftbear), new CosmosData(ionAGiftbear$info)),
   ionAGreenfire: new CosmosAnimationResources(new CosmosImage(ionAGreenfire), new CosmosData(ionAGreenfire$info)),
   ionAGyftrot: new CosmosAnimationResources(new CosmosImage(ionAGyftrot), new CosmosData(ionAGyftrot$info)),
   ionAHarpy: new CosmosAnimationResources(new CosmosImage(ionAHarpy), new CosmosData(ionAHarpy$info)),
   ionAHeats: new CosmosAnimationResources(new CosmosImage(ionAHeats), new CosmosData(ionAHeats$info)),
   ionAMoon: new CosmosAnimationResources(new CosmosImage(ionAMoon), new CosmosData(ionAMoon$info)),
   ionAOni: new CosmosAnimationResources(new CosmosImage(ionAOni), new CosmosData(ionAOni$info)),
   ionAOnionsanArmLeft: new CosmosImage(ionAOnionsanArmLeft),
   ionAOnionsanArmOut: new CosmosImage(ionAOnionsanArmOut),
   ionAOnionsanArmWave: new CosmosImage(ionAOnionsanArmWave),
   ionAOnionsanKawaii: new CosmosAnimationResources(
      new CosmosImage(ionAOnionsanKawaii),
      new CosmosData(ionAOnionsanKawaii$info)
   ),
   ionAOnionsanWistful: new CosmosImage(ionAOnionsanWistful),
   ionAOnionsanYhear: new CosmosImage(ionAOnionsanYhear),
   ionAProskater: new CosmosAnimationResources(new CosmosImage(ionAProskater), new CosmosData(ionAProskater$info)),
   ionAPyrope: new CosmosAnimationResources(new CosmosImage(ionAPyrope), new CosmosData(ionAPyrope$info)),
   ionAReg: new CosmosAnimationResources(new CosmosImage(ionAReg), new CosmosData(ionAReg$info)),
   ionARgbugDown: new CosmosAnimationResources(new CosmosImage(ionARgbugDown), new CosmosData(ionARgbugDown$info)),
   ionARgbugLeft: new CosmosAnimationResources(new CosmosImage(ionARgbugLeft), new CosmosData(ionARgbugLeft$info)),
   ionARgbugRight: new CosmosAnimationResources(new CosmosImage(ionARgbugRight), new CosmosData(ionARgbugRight$info)),
   ionARgcatDown: new CosmosAnimationResources(new CosmosImage(ionARgcatDown), new CosmosData(ionARgcatDown$info)),
   ionARgcatLeft: new CosmosAnimationResources(new CosmosImage(ionARgcatLeft), new CosmosData(ionARgcatLeft$info)),
   ionARgcatRight: new CosmosAnimationResources(new CosmosImage(ionARgcatRight), new CosmosData(ionARgcatRight$info)),
   ionARgdragonDown: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonDown),
      new CosmosData(ionARgdragonDown$info)
   ),
   ionARgdragonLeft: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonLeft),
      new CosmosData(ionARgdragonLeft$info)
   ),
   ionARgdragonRight: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonRight),
      new CosmosData(ionARgdragonRight$info)
   ),
   ionARgrabbitDown: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitDown),
      new CosmosData(ionARgrabbitDown$info)
   ),
   ionARgrabbitLeft: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitLeft),
      new CosmosData(ionARgrabbitLeft$info)
   ),
   ionARgrabbitRight: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitRight),
      new CosmosData(ionARgrabbitRight$info)
   ),
   ionARinger: new CosmosAnimationResources(new CosmosImage(ionARinger), new CosmosData(ionARinger$info)),
   ionASlimeFather: new CosmosAnimationResources(
      new CosmosImage(ionASlimeFather),
      new CosmosData(ionASlimeFather$info)
   ),
   ionASlimeKid1: new CosmosAnimationResources(new CosmosImage(ionASlimeKid1), new CosmosData(ionASlimeKid1$info)),
   ionASlimeKid2: new CosmosAnimationResources(new CosmosImage(ionASlimeKid2), new CosmosData(ionASlimeKid2$info)),
   ionASlimeMother: new CosmosAnimationResources(
      new CosmosImage(ionASlimeMother),
      new CosmosData(ionASlimeMother$info)
   ),
   ionASosorryBack: new CosmosAnimationResources(
      new CosmosImage(ionASosorryBack),
      new CosmosData(ionASosorryBack$info)
   ),
   ionASosorryFront: new CosmosAnimationResources(
      new CosmosImage(ionASosorryFront),
      new CosmosData(ionASosorryFront$info)
   ),
   ionAThisisnotabomb: new CosmosAnimationResources(
      new CosmosImage(ionAThisisnotabomb),
      new CosmosData(ionAThisisnotabomb$info)
   ),
   ionAVulkin: new CosmosAnimationResources(new CosmosImage(ionAVulkin), new CosmosData(ionAVulkin$info)),
   ionAWoshua: new CosmosAnimationResources(new CosmosImage(ionAWoshua), new CosmosData(ionAWoshua$info)),
   ionF86: new CosmosAnimationResources(new CosmosImage(ionF86, dark02), new CosmosData(ionF86$info)),
   ionFBird: new CosmosAnimationResources(new CosmosImage(ionFBird), new CosmosData(ionFBird$info)),
   ionFBirdCry: new CosmosAnimationResources(new CosmosImage(ionFBirdCry), new CosmosData(ionFBirdCry$info)),
   ionFBirdFly: new CosmosAnimationResources(new CosmosImage(ionFBirdFly), new CosmosData(ionFBirdFly$info)),
   ionFClamgirl1: new CosmosAnimationResources(new CosmosImage(ionFClamgirl1), new CosmosData(ionFClamgirl1$info)),
   ionFClamgirl2: new CosmosAnimationResources(new CosmosImage(ionFClamgirl2), new CosmosData(ionFClamgirl2$info)),
   ionFEchodude: new CosmosAnimationResources(new CosmosImage(ionFEchodude), new CosmosData(ionFEchodude$info)),
   ionFLongsy: new CosmosAnimationResources(new CosmosImage(ionFLongsy), new CosmosData(ionFLongsy$info)),
   ionFLongsyDark: new CosmosAnimationResources(new CosmosImage(ionFLongsy, dark02), new CosmosData(ionFLongsy$info)),
   ionFMuffet: new CosmosAnimationResources(new CosmosImage(ionFMuffet), new CosmosData(ionFMuffet$info)),
   ionFMushroomdance1: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance1),
      new CosmosData(ionFMushroomdance1$info)
   ),
   ionFMushroomdance2: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance2),
      new CosmosData(ionFMushroomdance2$info)
   ),
   ionFMushroomdance3: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance3),
      new CosmosData(ionFMushroomdance3$info)
   ),
   ionFShortsy: new CosmosAnimationResources(new CosmosImage(ionFShortsy), new CosmosData(ionFShortsy$info)),
   ionFShortsyDark: new CosmosAnimationResources(
      new CosmosImage(ionFShortsy, dark02),
      new CosmosData(ionFShortsy$info)
   ),
   ionFSnail1: new CosmosAnimationResources(new CosmosImage(ionFSnail1), new CosmosData(ionFSnail1$info)),
   ionFSnail2: new CosmosAnimationResources(new CosmosImage(ionFSnail2), new CosmosData(ionFSnail2$info)),
   ionFSnail3: new CosmosImage(ionFSnail3),
   ionFSpider: new CosmosAnimationResources(new CosmosImage(ionFSpider), new CosmosData(ionFSpider$info)),
   ionFStarkiller: new CosmosAnimationResources(new CosmosImage(ionFStarkiller), new CosmosData(ionFStarkiller$info)),
   ionOChairiel: new CosmosAnimationResources(new CosmosImage(ionOChairiel), new CosmosData(ionOChairiel$info)),
   ionOChairielTalk: new CosmosAnimationResources(
      new CosmosImage(ionOChairielTalk),
      new CosmosData(ionOChairielTalk$info)
   ),
   ionODummy: new CosmosAnimationResources(new CosmosImage(ionODummy), new CosmosData(ionODummy$info)),
   ionODummyBlush: new CosmosAnimationResources(new CosmosImage(ionODummyBlush), new CosmosData(ionODummyBlush$info)),
   ionODummyDark: new CosmosAnimationResources(new CosmosImage(ionODummy, dark02), new CosmosData(ionODummy$info)),
   ionODummyGlad: new CosmosAnimationResources(new CosmosImage(ionODummyGlad), new CosmosData(ionODummyGlad$info)),
   ionODummyMad: new CosmosAnimationResources(new CosmosImage(ionODummyMad), new CosmosData(ionODummyMad$info)),
   ionODummyMadDark: new CosmosAnimationResources(
      new CosmosImage(ionODummyMad, dark02),
      new CosmosData(ionODummyMad$info)
   ),
   ionODummyRage: new CosmosAnimationResources(new CosmosImage(ionODummyRage), new CosmosData(ionODummyRage$info)),
   ionOFroggit: new CosmosAnimationResources(new CosmosImage(ionOFroggit), new CosmosData(ionOFroggit$info)),
   ionOGonerfrisk: new CosmosAnimationResources(new CosmosImage(ionOGonerfrisk), new CosmosData(ionOGonerfrisk$info)),
   ionOLoox: new CosmosAnimationResources(new CosmosImage(ionOLoox), new CosmosData(ionOLoox$info)),
   ionOManana: new CosmosAnimationResources(new CosmosImage(ionOManana), new CosmosData(ionOManana$info)),
   ionOMananaBack: new CosmosAnimationResources(new CosmosImage(ionOMananaBack), new CosmosData(ionOMananaBack$info)),
   ionOMushy: new CosmosAnimationResources(new CosmosImage(ionOMushy), new CosmosData(ionOMushy$info)),
   ionOPartysupervisor: new CosmosAnimationResources(
      new CosmosImage(ionOPartysupervisor),
      new CosmosData(ionOPartysupervisor$info)
   ),
   ionOPlugbelly: new CosmosAnimationResources(new CosmosImage(ionOPlugbelly), new CosmosData(ionOPlugbelly$info)),
   ionOPlugbellyBack: new CosmosAnimationResources(
      new CosmosImage(ionOPlugbellyBack),
      new CosmosData(ionOPlugbellyBack$info)
   ),
   ionOSilencio: new CosmosAnimationResources(new CosmosImage(ionOSilencio), new CosmosData(ionOSilencio$info)),
   ionOSilencioBack: new CosmosAnimationResources(
      new CosmosImage(ionOSilencioBack),
      new CosmosData(ionOSilencioBack$info)
   ),
   ionOSoup: new CosmosAnimationResources(new CosmosImage(ionOSoup), new CosmosData(ionOSoup$info)),
   ionOSoupBack: new CosmosAnimationResources(new CosmosImage(ionOSoupBack), new CosmosData(ionOSoupBack$info)),
   ionOSteaksalesman: new CosmosAnimationResources(
      new CosmosImage(ionOSteaksalesman),
      new CosmosData(ionOSteaksalesman$info)
   ),
   ionOSteaksalesmanBack: new CosmosAnimationResources(
      new CosmosImage(ionOSteaksalesmanBack),
      new CosmosData(ionOSteaksalesmanBack$info)
   ),
   ionOTomCryme: new CosmosAnimationResources(new CosmosImage(ionOTomCryme), new CosmosData(ionOTomCryme$info)),
   ionOTomCrymeGeno: new CosmosAnimationResources(
      new CosmosImage(ionOTomCrymeGeno),
      new CosmosData(ionOTomCrymeGeno$info)
   ),
   ionS98: new CosmosAnimationResources(new CosmosImage(ionS98), new CosmosData(ionS98$info)),
   ionSBeautifulfish: new CosmosAnimationResources(
      new CosmosImage(ionSBeautifulfish),
      new CosmosData(ionSBeautifulfish$info)
   ),
   ionSBigmouth: new CosmosAnimationResources(new CosmosImage(ionSBigmouth), new CosmosData(ionSBigmouth$info)),
   ionSBunbun: new CosmosAnimationResources(new CosmosImage(ionSBunbun), new CosmosData(ionSBunbun$info)),
   ionSBunny: new CosmosAnimationResources(new CosmosImage(ionSBunny), new CosmosData(ionSBunny$info)),
   ionSCupjake: new CosmosAnimationResources(new CosmosImage(ionSCupjake), new CosmosData(ionSCupjake$info)),
   ionSDogamy: new CosmosAnimationResources(new CosmosImage(ionSDogamy), new CosmosData(ionSDogamy$info)),
   ionSDogaressa: new CosmosAnimationResources(new CosmosImage(ionSDogaressa), new CosmosData(ionSDogaressa$info)),
   ionSDoggo: new CosmosAnimationResources(new CosmosImage(ionSDoggo), new CosmosData(ionSDoggo$info)),
   ionSFaun: new CosmosAnimationResources(new CosmosImage(ionSFaun), new CosmosData(ionSFaun$info)),
   ionSGreatdog: new CosmosAnimationResources(new CosmosImage(ionSGreatdog), new CosmosData(ionSGreatdog$info)),
   ionSGreatdogHapp: new CosmosAnimationResources(
      new CosmosImage(ionSGreatdogHapp),
      new CosmosData(ionSGreatdogHapp$info)
   ),
   ionSGreatdogLick: new CosmosAnimationResources(
      new CosmosImage(ionSGreatdogLick),
      new CosmosData(ionSGreatdogLick$info)
   ),
   ionSGrillby: new CosmosAnimationResources(new CosmosImage(ionSGrillby), new CosmosData(ionSGrillby$info)),
   ionSHappy: new CosmosAnimationResources(new CosmosImage(ionSHappy), new CosmosData(ionSHappy$info)),
   ionSIcewolf: new CosmosAnimationResources(new CosmosImage(ionSIcewolf), new CosmosData(ionSIcewolf$info)),
   ionSImafraidjumitebeinagang: new CosmosAnimationResources(
      new CosmosImage(ionSImafraidjumitebeinagang),
      new CosmosData(ionSImafraidjumitebeinagang$info)
   ),
   ionSInnkeep: new CosmosAnimationResources(new CosmosImage(ionSInnkeep), new CosmosData(ionSInnkeep$info)),
   ionSJoey: new CosmosAnimationResources(new CosmosImage(ionSJoey), new CosmosData(ionSJoey$info)),
   ionSKabakk: new CosmosAnimationResources(new CosmosImage(ionSKabakk), new CosmosData(ionSKabakk$info)),
   ionSKakurolady: new CosmosAnimationResources(new CosmosImage(ionSKakurolady), new CosmosData(ionSKakurolady$info)),
   ionSLibrarian: new CosmosAnimationResources(new CosmosImage(ionSLibrarian), new CosmosData(ionSLibrarian$info)),
   ionSLoverboy: new CosmosAnimationResources(new CosmosImage(ionSLoverboy), new CosmosData(ionSLoverboy$info)),
   ionSMoonrocks1: new CosmosAnimationResources(new CosmosImage(ionSMoonrocks1), new CosmosData(ionSMoonrocks1$info)),
   ionSMoonrocks2: new CosmosAnimationResources(new CosmosImage(ionSMoonrocks2), new CosmosData(ionSMoonrocks2$info)),
   ionSNicecream: new CosmosAnimationResources(new CosmosImage(ionSNicecream), new CosmosData(ionSNicecream$info)),
   ionSPolitics: new CosmosAnimationResources(new CosmosImage(ionSPolitics), new CosmosData(ionSPolitics$info)),
   ionSPunkhamster: new CosmosAnimationResources(
      new CosmosImage(ionSPunkhamster),
      new CosmosData(ionSPunkhamster$info)
   ),
   ionSRabbit: new CosmosAnimationResources(new CosmosImage(ionSRabbit), new CosmosData(ionSRabbit$info)),
   ionSRedbird: new CosmosAnimationResources(new CosmosImage(ionSRedbird), new CosmosData(ionSRedbird$info)),
   ionRiverboi: new CosmosAnimationResources(new CosmosImage(ionRiverboi), new CosmosData(ionRiverboi$info)),
   ionSSnakeboi: new CosmosAnimationResources(new CosmosImage(ionSSnakeboi), new CosmosData(ionSSnakeboi$info)),
   ionSSweetie: new CosmosAnimationResources(new CosmosImage(ionSSweetie), new CosmosData(ionSSweetie$info)),
   ionSVegetoid: new CosmosAnimationResources(new CosmosImage(ionSVegetoid), new CosmosData(ionSVegetoid$info)),
   ionSWisconsin: new CosmosAnimationResources(new CosmosImage(ionSWisconsin), new CosmosData(ionSWisconsin$info)),
   iooABarricade: new CosmosAnimationResources(new CosmosImage(iooABarricade), new CosmosData(iooABarricade$info)),
   iooABeaker: new CosmosImage(iooABeaker),
   iooABeam: new CosmosImage(iooABeam, c => [ 255, 255, 255, c[0] ]),
   iooABedcounter: new CosmosImage(iooABedcounter),
   iooABigAssDoor: new CosmosImage(iooABigAssDoor),
   iooABom: new CosmosImage(iooABom),
   iooABomburst: new CosmosAnimationResources(new CosmosImage(iooABomburst), new CosmosData(iooABomburst$info)),
   iooABooster: new CosmosAnimationResources(new CosmosImage(iooABooster), new CosmosData(iooABooster$info)),
   iooABoosterBad: new CosmosAnimationResources(new CosmosImage(iooABoosterBad), new CosmosData(iooABoosterBad$info)),
   iooABoosterStrut: new CosmosAnimationResources(
      new CosmosImage(iooABoosterStrut),
      new CosmosData(iooABoosterStrut$info)
   ),
   iooACardboard: new CosmosImage(iooACardboard),
   iooACarrier: new CosmosAnimationResources(new CosmosImage(iooACarrier), new CosmosData(iooACarrier$info)),
   iooACheckpointOver: new CosmosImage(iooACheckpointOver),
   iooACheckpointUnder: new CosmosImage(iooACheckpointUnder),
   iooAChesstable: new CosmosImage(iooAChesstable),
   iooACompactlazerdeluxe: new CosmosImage(iooACompactlazerdeluxe),
   iooAConveyor: new CosmosAnimationResources(new CosmosImage(iooAConveyor), new CosmosData(iooAConveyor$info)),
   iooACORE: new CosmosAnimationResources(new CosmosImage(iooACORE), new CosmosData(iooACORE$info)),
   iooACorecolumn: new CosmosAnimationResources(new CosmosImage(iooACorecolumn), new CosmosData(iooACorecolumn$info)),
   iooACoreswitch: new CosmosAnimationResources(new CosmosImage(iooACoreswitch), new CosmosData(iooACoreswitch$info)),
   iooACorndog: new CosmosImage(iooACorndog),
   iooADeadLeaf: new CosmosImage(iooADeadLeaf),
   iooADinnertable: new CosmosImage(iooADinnertable),
   iooADiscoball: new CosmosAnimationResources(new CosmosImage(iooADiscoball), new CosmosData(iooADiscoball$info)),
   iooADrawbridge: new CosmosImage(iooADrawbridge),
   iooADTTubes: new CosmosAnimationResources(new CosmosImage(iooADTTubes), new CosmosData(iooADTTubes$info)),
   iooAFakeFireStation: new CosmosAnimationResources(
      new CosmosImage(iooAFakeFireStation),
      new CosmosData(iooAFakeFireStation$info)
   ),
   iooAFloorsegment: new CosmosAnimationResources(
      new CosmosImage(iooAFloorsegment),
      new CosmosData(iooAFloorsegment$info)
   ),
   iooAFlowertable: new CosmosImage(iooAFlowertable),
   iooAFoodcounter: new CosmosImage(iooAFoodcounter),
   iooAGlobe: new CosmosImage(iooAGlobe),
   iooAHexogen: new CosmosImage(iooAHexogen),
   iooAHotelfood: new CosmosAnimationResources(new CosmosImage(iooAHotelfood), new CosmosData(iooAHotelfood$info)),
   iooALabCounter: new CosmosImage(iooALabcounter),
   iooALabtable: new CosmosAnimationResources(new CosmosImage(iooALabtable), new CosmosData(iooALabtable$info)),
   iooALaunchpad: new CosmosAnimationResources(new CosmosImage(iooALaunchpad), new CosmosData(iooALaunchpad$info)),
   iooALaunchpadAbove: new CosmosAnimationResources(
      new CosmosImage(iooALaunchpadAbove),
      new CosmosData(iooALaunchpadAbove$info)
   ),
   iooAMegacarrier: new CosmosAnimationResources(
      new CosmosImage(iooAMegacarrier),
      new CosmosData(iooAMegacarrier$info)
   ),
   iooAMewposter: new CosmosAnimationResources(new CosmosImage(iooAMewposter), new CosmosData(iooAMewposter$info)),
   iooAMirrortableShort: new CosmosImage(iooAMirrortableShort),
   iooAMoneyFireworks: new CosmosImage(iooAMoneyFireworks),
   iooAMoneyMew: new CosmosImage(iooAMoneyMew),
   iooAMoneyRadio: new CosmosImage(iooAMoneyRadio),
   iooAMoonPie: new CosmosImage(iooAMoonPie),
   iooAOneOilyBoi: new CosmosImage(iooAOneOilyBoi),
   iooAPathtile: new CosmosImage(iooAPathtile),
   iooAPedastal: new CosmosImage(iooAPedastal),
   iooAPedastalReverse: new CosmosAnimationResources(
      new CosmosImage(iooAPedastalReverse),
      new CosmosData(iooAPedastalReverse$info)
   ),
   iooAPottedtable: new CosmosImage(iooAPottedtable),
   iooAPrimespire: new CosmosImage(iooAPrimespire),
   iooAProgresser: new CosmosImage(iooAProgresser),
   iooAPterm: new CosmosAnimationResources(new CosmosImage(iooAPterm), new CosmosData(iooAPterm$info)),
   iooAPuzzledoor: new CosmosAnimationResources(new CosmosImage(iooAPuzzledoor), new CosmosData(iooAPuzzledoor$info)),
   iooAPuzzlenode: new CosmosAnimationResources(new CosmosImage(iooAPuzzlenode), new CosmosData(iooAPuzzlenode$info)),
   iooAPuzzlenodeDark: new CosmosAnimationResources(
      new CosmosImage(iooAPuzzlenodeDark),
      new CosmosData(iooAPuzzlenodeDark$info)
   ),
   iooAReccolumn: new CosmosAnimationResources(new CosmosImage(iooAReccolumn), new CosmosData(iooAReccolumn$info)),
   iooAReccolumnLeft: new CosmosAnimationResources(
      new CosmosImage(iooAReccolumnLeft),
      new CosmosData(iooAReccolumnLeft$info)
   ),
   iooAReccolumnRight: new CosmosAnimationResources(
      new CosmosImage(iooAReccolumnRight),
      new CosmosData(iooAReccolumnRight$info)
   ),
   iooARecycler: new CosmosImage(iooARecycler),
   iooFRedcouch: new CosmosImage(iooFRedcouch),
   iooARoombed: new CosmosImage(iooARoombed),
   iooARoombedCover: new CosmosImage(iooARoombedCover),
   iooARoomtable: new CosmosImage(iooARoomtable),
   iooASakuraLeaf: new CosmosImage(iooASakuraLeaf),
   iooAShowbarrier: new CosmosAnimationResources(
      new CosmosImage(iooAShowbarrier),
      new CosmosData(iooAShowbarrier$info)
   ),
   iooAShowglow: new CosmosAnimationResources(new CosmosImage(iooAShowglow), new CosmosData(iooAShowglow$info)),
   iooASign: new CosmosImage(iooASign),
   iooASlantedSecurityField: new CosmosAnimationResources(
      new CosmosImage(iooASlantedSecurityField),
      new CosmosData(iooASlantedSecurityField$info)
   ),
   iooASonic: new CosmosImage(iooASonic),
   iooASparkler: new CosmosAnimationResources(new CosmosImage(iooASparkler), new CosmosData(iooASparkler$info)),
   iooASpeedline: new CosmosImage(iooASpeedline),
   iooASpotlight: new CosmosImage(iooASpotlight),
   iooASpotlightAlt: new CosmosImage(iooASpotlightAlt),
   iooAStage: new CosmosImage(iooAStage),
   iooAStagecloud: new CosmosImage(iooAStagecloud),
   iooAStagelight: new CosmosAnimationResources(new CosmosImage(iooAStagelight), new CosmosData(iooAStagelight$info)),
   iooAStageoverlay: new CosmosImage(iooAStageoverlay),
   iooAStatue: new CosmosAnimationResources(new CosmosImage(iooAStatue), new CosmosData(iooAStatue$info)),
   iooATablaphone: new CosmosImage(iooATablaphone),
   iooATimer: new CosmosImage(iooATimer),
   iooAVender: new CosmosAnimationResources(new CosmosImage(iooAVender), new CosmosData(iooAVender$info)),
   iooAWishflower: new CosmosImage(iooAWishflower),
   iooAWorkstation: new CosmosAnimationResources(
      new CosmosImage(iooAWorkstation),
      new CosmosData(iooAWorkstation$info)
   ),
   iooAXterm: new CosmosImage(iooAXterm),
   iooDimbox: new CosmosAnimationResources(new CosmosImage(iooDimbox), new CosmosData(iooDimbox$info)),
   iooFArtifact: new CosmosAnimationResources(new CosmosImage(iooFArtifact), new CosmosData(iooFArtifact$info)),
   iooFAsteroid1: new CosmosImage(iooFAsteroid1, contrast),
   iooFBench: new CosmosImage(iooFBench, dark01),
   iooFBlookComputer: new CosmosAnimationResources(
      new CosmosImage(iooFBlookComputer),
      new CosmosData(iooFBlookComputer$info)
   ),
   iooFBlookhouse: new CosmosImage(iooFBlookhouse),
   iooFBook: new CosmosImage(iooFBook),
   iooFBoots: new CosmosImage(iooFBoots),
   iooFBurger: new CosmosImage(iooFBurger),
   iooFCheesetable: new CosmosAnimationResources(
      new CosmosImage(iooFCheesetable),
      new CosmosData(iooFCheesetable$info)
   ),
   iooFCookpotBlack: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotBlack),
      new CosmosData(iooFCookpotBlack$info)
   ),
   iooFCookpotHeat: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotHeat),
      new CosmosData(iooFCookpotHeat$info)
   ),
   iooFCookpotStir: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotStir),
      new CosmosData(iooFCookpotStir$info)
   ),
   iooFCookpotWrecked: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotWrecked),
      new CosmosData(iooFCookpotWrecked$info)
   ),
   iooFCooler: new CosmosImage(iooFCooler, dark01),
   iooFCornerDark: new CosmosImage(iooFCornerDark),
   iooFCornerOver: new CosmosImage(iooFCornerOver),
   iooFDrinkHotchocolate: new CosmosAnimationResources(
      new CosmosImage(iooFDrinkHotchocolate),
      new CosmosData(iooFDrinkHotchocolate$info)
   ),
   iooFDrinkSoda: new CosmosAnimationResources(new CosmosImage(iooFDrinkSoda), new CosmosData(iooFDrinkSoda$info)),
   iooFDrinkSugar: new CosmosAnimationResources(new CosmosImage(iooFDrinkSugar), new CosmosData(iooFDrinkSugar$info)),
   iooFDrinkTea: new CosmosAnimationResources(new CosmosImage(iooFDrinkTea), new CosmosData(iooFDrinkTea$info)),
   iooFDrinkTeapot: new CosmosAnimationResources(
      new CosmosImage(iooFDrinkTeapot),
      new CosmosData(iooFDrinkTeapot$info)
   ),
   iooFDrinkWater: new CosmosAnimationResources(new CosmosImage(iooFDrinkWater), new CosmosData(iooFDrinkWater$info)),
   iooFEchoflower: new CosmosAnimationResources(new CosmosImage(iooFEchoflower), new CosmosData(iooFEchoflower$info)),
   iooFEchoflower01: new CosmosImage(iooFEchoflower01),
   iooFEchoflower02: new CosmosImage(iooFEchoflower02),
   iooFEchoflowerDark: new CosmosAnimationResources(
      new CosmosImage(iooFEchoflower, contrast),
      new CosmosData(iooFEchoflower$info)
   ),
   iooFEggo: new CosmosImage(iooFEggo),
   iooFErrorTrue: new CosmosImage(iooFErrorTrue),
   iooFFenceBottomleft: new CosmosImage(iooFFenceBottomleft),
   iooFFenceBottomleftcap: new CosmosImage(iooFFenceBottomleftcap),
   iooFFenceBottomright: new CosmosImage(iooFFenceBottomright),
   iooFFenceBottomrightcap: new CosmosImage(iooFFenceBottomrightcap),
   iooFFenceMidcenter: new CosmosImage(iooFFenceMidcenter),
   iooFFenceMidleft: new CosmosImage(iooFFenceMidleft),
   iooFFenceMidright: new CosmosImage(iooFFenceMidright),
   iooFFenceTopleft: new CosmosImage(iooFFenceTopleft),
   iooFFenceTopleftcap: new CosmosImage(iooFFenceTopleftcap),
   iooFFenceTopright: new CosmosImage(iooFFenceTopright),
   iooFFenceToprightcap: new CosmosImage(iooFFenceToprightcap),
   iooFFenceVertleft: new CosmosImage(iooFFenceVertleft),
   iooFFenceVertright: new CosmosImage(iooFFenceVertright),
   iooFFloorspear: new CosmosAnimationResources(new CosmosImage(iooFFloorspear), new CosmosData(iooFFloorspear$info)),
   iooFFloorspearBase: new CosmosImage(iooFFloorspearBase),
   iooFFries: new CosmosImage(iooFFries),
   iooFGenohole: new CosmosImage(iooFGenohole),
   iooFGunk1: new CosmosAnimationResources(new CosmosImage(iooFGunk1, dark02), new CosmosData(iooFGunk1$info)),
   iooFGunk2: new CosmosAnimationResources(new CosmosImage(iooFGunk2, dark02), new CosmosData(iooFGunk2$info)),
   iooFGunk3: new CosmosAnimationResources(new CosmosImage(iooFGunk3, dark02), new CosmosData(iooFGunk3$info)),
   iooFJumpsuit: new CosmosImage(iooFJumpsuit),
   iooFOverhead: new CosmosImage(iooFOverhead),
   iooFPiano: new CosmosImage(iooFPiano),
   iooFPianoarrowDot: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowDot),
      new CosmosData(iooFPianoarrowDot$info)
   ),
   iooFPianoarrowDown: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowDown),
      new CosmosData(iooFPianoarrowDown$info)
   ),
   iooFPianoarrowLeft: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowLeft),
      new CosmosData(iooFPianoarrowLeft$info)
   ),
   iooFPianoarrowRight: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowRight),
      new CosmosData(iooFPianoarrowRight$info)
   ),
   iooFPianoarrowUp: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowUp),
      new CosmosData(iooFPianoarrowUp$info)
   ),
   iooFPianoOver1: new CosmosImage(iooFPianoOver1),
   iooFPianoOver2: new CosmosImage(iooFPianoOver2),
   iooFPianosolution: new CosmosAnimationResources(
      new CosmosImage(iooFPianosolution),
      new CosmosData(iooFPianosolution$info)
   ),
   iooFPrechaseBridge: new CosmosImage(iooFPrechaseBridge),
   iooFPuzzle1Over: new CosmosImage(iooFPuzzle1Over),
   iooFPuzzle2Over: new CosmosImage(iooFPuzzle2Over),
   iooFPuzzle3Over: new CosmosImage(iooFPuzzle3Over),
   iooFPuzzlepylon: new CosmosAnimationResources(
      new CosmosImage(iooFPuzzlepylon),
      new CosmosData(iooFPuzzlepylon$info)
   ),
   iooFPuzzlepylonOverlay: new CosmosImage(iooFPuzzlepylonOverlay),
   iooFRaft: new CosmosImage(iooFRaft, dark02),
   iooFRedsword: new CosmosImage(iooFRedsword),
   iooFRug: new CosmosImage(iooFRug),
   iooFSign: new CosmosImage(iooFSign),
   iooFSnack: new CosmosImage(iooFSnack),
   iooFSpaghetti: new CosmosImage(iooFSpaghetti),
   iooFSpear: new CosmosImage(iooFSpear),
   iooFSpearSpawn: new CosmosAnimationResources(new CosmosImage(iooFSpearSpawn), new CosmosData(iooFSpearSpawn$info)),
   iooFSpearStab: new CosmosImage(iooFSpearStab),
   iooFSpiderflower: new CosmosImage(iooFSpiderflower),
   iooFSpidertable: new CosmosImage(iooFSpidertable),
   iooFStatue: new CosmosAnimationResources(new CosmosImage(iooFStatue, dark02), new CosmosData(iooFStatue$info)),
   iooFSteam: new CosmosImage(iooFSteam),
   iooFStoveknob: new CosmosImage(iooFStoveknob),
   iooFTallgrass: new CosmosAnimationResources(new CosmosImage(iooFTallgrass), new CosmosData(iooFTallgrass$info)),
   iooFTeacup: new CosmosImage(iooFTeacup),
   iooFTeapot: new CosmosAnimationResources(new CosmosImage(iooFTeapot), new CosmosData(iooFTeapot$info)),
   iooFTemstatue: new CosmosImage(iooFTemstatue),
   iooFThundertron: new CosmosAnimationResources(
      new CosmosImage(iooFThundertron),
      new CosmosData(iooFThundertron$info)
   ),
   iooFTinychair: new CosmosImage(iooFTinychair),
   iooFTrash: new CosmosImage(iooFTrash),
   iooFTronsnail1: new CosmosAnimationResources(new CosmosImage(iooFTronsnail1), new CosmosData(iooFTronsnail1$info)),
   iooFTronsnail2: new CosmosAnimationResources(new CosmosImage(iooFTronsnail2), new CosmosData(iooFTronsnail2$info)),
   iooFTronsnail3: new CosmosAnimationResources(new CosmosImage(iooFTronsnail3), new CosmosData(iooFTronsnail3$info)),
   iooFTruth: new CosmosAnimationResources(new CosmosImage(iooFTruth), new CosmosData(iooFTruth$info)),
   iooFUndyneDoor: new CosmosAnimationResources(new CosmosImage(iooFUndyneDoor), new CosmosData(iooFUndyneDoor$info)),
   iooFUndyneDrawer: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneDrawer),
      new CosmosData(iooFUndyneDrawer$info)
   ),
   iooFUndynehouse: new CosmosAnimationResources(
      new CosmosImage(iooFUndynehouse),
      new CosmosData(iooFUndynehouse$info)
   ),
   iooFUndynehouseWrecked: new CosmosAnimationResources(
      new CosmosImage(iooFUndynehouseWrecked),
      new CosmosData(iooFUndynehouseWrecked$info)
   ),
   iooFUndynePiano: new CosmosImage(iooFUndynePiano),
   iooFUndyneTable: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneTable),
      new CosmosData(iooFUndyneTable$info)
   ),
   iooFUndyneWindow: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneWindow),
      new CosmosData(iooFUndyneWindow$info)
   ),
   iooFVeggies: new CosmosAnimationResources(new CosmosImage(iooFVeggies), new CosmosData(iooFVeggies$info)),
   iooFVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooFVendingMachine),
      new CosmosData(iooFVendingMachine$info)
   ),
   iooFViewBackdrop: new CosmosImage(iooFViewBackdrop),
   iooFWallsign: new CosmosImage(iooFWallsign),
   iooFWallsignPainted: new CosmosImage(iooFWallsignPainted),
   iooFWatercooler: new CosmosAnimationResources(
      new CosmosImage(iooFWatercooler),
      new CosmosData(iooFWatercooler$info)
   ),
   iooFWeb1: new CosmosImage(iooFWeb1, dark02),
   iooFWeb2: new CosmosImage(iooFWeb2, dark02),
   iooFWeb3: new CosmosImage(iooFWeb3, dark02),
   iooFWebcube: new CosmosImage(iooFWebcube),
   iooFWebcuboid: new CosmosImage(iooFWebcuboid),
   iooOBreakfast: new CosmosImage(iooOBreakfast),
   iooOBucket: new CosmosImage(iooOBucket),
   iooOButton: new CosmosAnimationResources(new CosmosImage(iooOButton), new CosmosData(iooOButton$info)),
   iooOButtonDark: new CosmosAnimationResources(new CosmosImage(iooOButton, dark01), new CosmosData(iooOButton$info)),
   iooOChairiel: new CosmosAnimationResources(new CosmosImage(iooOChairiel), new CosmosData(iooOChairiel$info)),
   iooOCoatrack: new CosmosImage(iooOCoatrack),
   iooODesk: new CosmosImage(iooODesk),
   iooODiningTable: new CosmosImage(iooODiningTable),
   iooODJTable: new CosmosAnimationResources(new CosmosImage(iooODJTable), new CosmosData(iooODJTable$info)),
   iooOFirecover: new CosmosImage(iooOFirecover),
   iooOFireplace: new CosmosAnimationResources(new CosmosImage(iooOFireplace), new CosmosData(iooOFireplace$info)),
   iooOGate: new CosmosAnimationResources(new CosmosImage(iooOGate), new CosmosData(iooOGate$info)),
   iooOIndicatorButton: new CosmosAnimationResources(
      new CosmosImage(iooOIndicatorButton),
      new CosmosData(iooOIndicatorButton$info)
   ),
   iooOMirrorBackdrop: new CosmosImage(iooOMirrorBackdrop),
   iooOPaintBlaster: new CosmosAnimationResources(
      new CosmosImage(iooOPaintBlaster),
      new CosmosData(iooOPaintBlaster$info)
   ),
   iooOPaintBlasterDark: new CosmosAnimationResources(
      new CosmosImage(iooOPaintBlaster, dark02),
      new CosmosData(iooOPaintBlaster$info)
   ),
   iooOPan: new CosmosAnimationResources(new CosmosImage(iooOPan), new CosmosData(iooOPan$info)),
   iooOPartyOver: new CosmosImage(iooOPartyOver),
   iooOPie: new CosmosImage(iooOPie),
   iooOPieBowl: new CosmosImage(iooOPieBowl),
   iooOPylon: new CosmosAnimationResources(new CosmosImage(iooOPylon), new CosmosData(iooOPylon$info)),
   iooOQuantumpad: new CosmosAnimationResources(new CosmosImage(iooOQuantumpad), new CosmosData(iooOQuantumpad$info)),
   iooORing: new CosmosImage(iooORing),
   iooOSecurityField: new CosmosAnimationResources(
      new CosmosImage(iooOSecurityField),
      new CosmosData(iooOSecurityField$info)
   ),
   iooOSludge: new CosmosAnimationResources(new CosmosImage(iooOSludge), new CosmosData(iooOSludge$info)),
   iooOSodaitem: new CosmosImage(iooOSodaitem),
   iooOSpoon: new CosmosImage(iooOSpoon),
   iooOStairsOver: new CosmosImage(iooOStairsOver),
   iooOSteakitem: new CosmosImage(iooOSteakitem),
   iooOSteaktable: new CosmosImage(iooOSteaktable),
   iooOSwitch: new CosmosAnimationResources(new CosmosImage(iooOSwitch), new CosmosData(iooOSwitch$info)),
   iooOTerminalScreen: new CosmosImage(iooOTerminalScreen),
   iooOTorielAsrielDark: new CosmosImage(iooOTorielAsrielDark),
   iooOTorielAsrielOver: new CosmosImage(iooOTorielAsrielOver),
   iooOTorielAsrielOverLight: new CosmosImage(iooOTorielAsrielOverLight),
   iooOTorielTorielChair: new CosmosImage(iooOTorielTorielChair),
   iooOTorielTorielPlant: new CosmosImage(iooOTorielTorielPlant),
   iooOTorielTrash: new CosmosImage(iooOTorielTrash),
   iooOVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooOVendingMachine),
      new CosmosData(iooOVendingMachine$info)
   ),
   iooOWreckage: new CosmosImage(iooOWreckage),
   iooSavePoint: new CosmosAnimationResources(new CosmosImage(iooSavePoint), new CosmosData(iooSavePoint$info)),
   iooSavePointDark: new CosmosAnimationResources(
      new CosmosImage(iooSavePoint, dark01),
      new CosmosData(iooSavePoint$info)
   ),
   iooSavePointSemiDark: new CosmosAnimationResources(
      new CosmosImage(iooSavePoint, dark02),
      new CosmosData(iooSavePoint$info)
   ),
   iooSBarski: new CosmosImage(iooSBarski),
   iooSBedcover: new CosmosImage(iooSBedcover),
   iooSBonehouseTop: new CosmosImage(iooSBonehouseTop),
   iooSBookdesk: new CosmosImage(iooSBookdesk),
   iooSBooktable: new CosmosImage(iooSBooktable),
   iooSChew: new CosmosImage(iooSChew),
   iooSCottonball: new CosmosImage(iooSCottonball),
   iooSCouch: new CosmosImage(iooSCouch),
   iooSCrossword: new CosmosImage(iooSCrossword),
   iooSCrosswordDark: new CosmosImage(iooSCrossword, dark02),
   iooSCtower: new CosmosImage(iooSCtower),
   iooSCtowerback: new CosmosImage(iooSCtowerback),
   iooSCtowerleft: new CosmosImage(iooSCtowerleft),
   iooSCtowerright: new CosmosImage(iooSCtowerright),
   iooSDogtreat: new CosmosImage(iooSDogtreat),
   iooSEndtable: new CosmosImage(iooSEndtable),
   iooSFlower: new CosmosImage(iooSFlower),
   iooSGauntletBlaster: new CosmosImage(iooSGauntletBlaster),
   iooSGauntletCollarsword: new CosmosImage(iooSGauntletCollarsword),
   iooSGauntletDog: new CosmosAnimationResources(
      new CosmosImage(iooSGauntletDog),
      new CosmosData(iooSGauntletDog$info)
   ),
   iooSGauntletFire: new CosmosAnimationResources(
      new CosmosImage(iooSGauntletFire),
      new CosmosData(iooSGauntletFire$info)
   ),
   iooSGauntletTesla: new CosmosImage(iooSGauntletTesla),
   iooSGravo: new CosmosImage(iooSGravo),
   iooSInteriorBar: new CosmosImage(iooSInteriorBar),
   iooSInteriorBooth: new CosmosImage(iooSInteriorBooth),
   iooSInteriorDrinks: new CosmosImage(iooSInteriorDrinks),
   iooSInteriorLesser: new CosmosAnimationResources(
      new CosmosImage(iooSInteriorLesser),
      new CosmosData(iooSInteriorLesser$info)
   ),
   iooSInteriorPoker: new CosmosImage(iooSInteriorPoker),
   iooSInteriorStool: new CosmosImage(iooSInteriorStool),
   iooSLamp: new CosmosAnimationResources(new CosmosImage(iooSLamp), new CosmosData(iooSLamp$info)),
   iooSLasercheckpoint: new CosmosAnimationResources(
      new CosmosImage(iooSLasercheckpoint),
      new CosmosData(iooSLasercheckpoint$info)
   ),
   iooSLasercheckpointOpen: new CosmosImage(iooSLasercheckpointOpen),
   iooSLasercheckpointOpenSide: new CosmosImage(iooSLasercheckpointOpenSide),
   iooSLasercheckpointOpenSide2: new CosmosImage(iooSLasercheckpointOpenSide2),
   iooSLasercheckpointSide: new CosmosAnimationResources(
      new CosmosImage(iooSLasercheckpointSide),
      new CosmosData(iooSLasercheckpointSide$info)
   ),
   iooSMailbox: new CosmosImage(iooSMailbox),
   iooSMicrowave: new CosmosImage(iooSMicrowave),
   iooSNoise: new CosmosAnimationResources(new CosmosImage(iooSNoise), new CosmosData(iooSNoise$info)),
   iooSNtower: new CosmosImage(iooSNtower),
   iooSPapBed: new CosmosImage(iooSPapBed),
   iooSPapBones: new CosmosImage(iooSPapBones),
   iooSPapComputer: new CosmosAnimationResources(
      new CosmosImage(iooSPapComputer),
      new CosmosData(iooSPapComputer$info)
   ),
   iooSPapTable: new CosmosImage(iooSPapTable),
   iooSPole: new CosmosImage(iooSPole),
   iooSPuzzle1: new CosmosAnimationResources(new CosmosImage(iooSPuzzle1), new CosmosData(iooSPuzzle1$info)),
   iooSPuzzle2: new CosmosAnimationResources(new CosmosImage(iooSPuzzle2), new CosmosData(iooSPuzzle2$info)),
   iooSPuzzle3Tile: new CosmosAnimationResources(
      new CosmosImage(iooSPuzzle3Tile),
      new CosmosData(iooSPuzzle3Tile$info)
   ),
   iooSRocktable: new CosmosImage(iooSRocktable),
   iooSSansdoor: new CosmosImage(iooSSansdoor),
   iooSScreenon: new CosmosImage(iooSScreenon),
   iooSSentry: new CosmosImage(iooSSentry),
   iooSSentry2: new CosmosImage(iooSSentry2),
   iooSSentry3: new CosmosImage(iooSSentry3),
   iooSSentry4: new CosmosImage(iooSSentry4),
   iooSSentryBack: new CosmosImage(iooSSentryBack),
   iooSSentryBack2: new CosmosImage(iooSSentryBack2),
   iooSSentryBack3: new CosmosImage(iooSSentryBack3),
   iooSSign: new CosmosImage(iooSSign),
   iooSSink: new CosmosAnimationResources(new CosmosImage(iooSSink), new CosmosData(iooSSink$info)),
   iooSSlew: new CosmosImage(iooSSlew),
   iooSSmallscreen: new CosmosImage(iooSSmallscreen),
   iooSSpaghetti: new CosmosImage(iooSSpaghetti),
   iooSSpaghettitable: new CosmosImage(iooSSpaghettitable),
   iooStarling: new CosmosImage(iooStarling),
   iooStarlingPotted: new CosmosImage(iooStarlingPotted),
   iooSTelescope: new CosmosImage(iooSTelescope),
   iooSToby1: new CosmosAnimationResources(new CosmosImage(iooToby1), new CosmosData(iooToby1$info)),
   iooSToby2: new CosmosAnimationResources(new CosmosImage(iooToby2), new CosmosData(iooToby2$info)),
   iooSToby3: new CosmosAnimationResources(new CosmosImage(iooToby3), new CosmosData(iooToby3$info)),
   iooSTownBlookshop: new CosmosImage(iooSTownBlookshop),
   iooSTownBonehouse: new CosmosImage(iooSTownBonehouse),
   iooSTownBonerail: new CosmosImage(iooSTownBonerail),
   iooSTownCapture: new CosmosImage(iooSTownCapture),
   iooSTownGrillbys: new CosmosImage(iooSTownGrillbys),
   iooSTownHouse: new CosmosImage(iooSTownHouse),
   iooSTownInnshop: new CosmosImage(iooSTownInnshop),
   iooSTownLibrarby: new CosmosImage(iooSTownLibrarby),
   iooSTownPolice: new CosmosImage(iooSTownPolice),
   iooSTrash: new CosmosImage(iooSTrash),
   iooSTree: new CosmosImage(iooSTree),
   iooSTVOff: new CosmosImage(iooSTVOff),
   iooSTVOn: new CosmosAnimationResources(new CosmosImage(iooSTVOn), new CosmosData(iooSTVOn$info)),
   iooSVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooSVendingMachine),
      new CosmosData(iooSVendingMachine$info)
   ),
   iooSWhew: new CosmosImage(iooSWhew),
   iooSWidescreen: new CosmosImage(iooSWidescreen),
   iooSWidescreenBullet: new CosmosImage(iooSWidescreenBullet),
   iooSWidescreenPlayer: new CosmosAnimationResources(
      new CosmosImage(iooSWidescreenPlayer),
      new CosmosData(iooSWidescreenPlayer$info)
   ),
   iooSWidescreenReticle: new CosmosAnimationResources(
      new CosmosImage(iooSWidescreenReticle),
      new CosmosData(iooSWidescreenReticle$info)
   ),
   iooTaxi: new CosmosAnimationResources(new CosmosImage(iooTaxi), new CosmosData(iooTaxi$info)),
   iooTaxiOverlay: new CosmosAnimationResources(new CosmosImage(iooTaxiOverlay), new CosmosData(iooTaxiOverlay$info)),
   isbBackground: new CosmosImage(isbBackground),
   isbEyes: new CosmosAnimationResources(new CosmosImage(isbEyes), new CosmosData(isbEyes$info)),
   isbKeeper: new CosmosAnimationResources(new CosmosImage(isbKeeper), new CosmosData(isbKeeper$info)),
   isbpArms: new CosmosImage(isbpArms),
   isbpBackground: new CosmosImage(isbpBackground),
   isbpCloud: new CosmosAnimationResources(new CosmosImage(isbpCloud), new CosmosData(isbpCloud$info)),
   isbpKeeper: new CosmosAnimationResources(new CosmosImage(isbpKeeper), new CosmosData(isbpKeeper$info)),
   isgArm1: new CosmosAnimationResources(new CosmosImage(isgArm1), new CosmosData(isgArm1$info)),
   isgArm2: new CosmosImage(isgArm2),
   isgBackground: new CosmosImage(isgBackground),
   isgKeeper1: new CosmosAnimationResources(new CosmosImage(isgKeeper1), new CosmosData(isgKeeper1$info)),
   isgKeeper2: new CosmosAnimationResources(new CosmosImage(isgKeeper2), new CosmosData(isgKeeper2$info)),
   ishBackground: new CosmosImage(ishBackground),
   ishKeeper: new CosmosAnimationResources(new CosmosImage(ishKeeper), new CosmosData(ishKeeper$info)),
   istArm: new CosmosImage(istArm),
   istBackground: new CosmosImage(istBackground),
   istBody: new CosmosImage(istBody),
   istcBackground: new CosmosImage(istcBackground),
   istcBody: new CosmosImage(istcBody),
   istcBox: new CosmosImage(istcBox),
   istcCoffee: new CosmosAnimationResources(new CosmosImage(istcCoffee), new CosmosData(istcCoffee$info)),
   istcEyebrows: new CosmosImage(istcEyebrows),
   istcEyes1: new CosmosAnimationResources(new CosmosImage(istcEyes1), new CosmosData(istcEyes1$info)),
   istcEyes2: new CosmosImage(istcEyes2),
   istcEyes3: new CosmosImage(istcEyes3),
   istcEyes4: new CosmosImage(istcEyes4),
   istcEyes5: new CosmosImage(istcEyes5),
   istcEyes6: new CosmosImage(istcEyes6),
   istcHat: new CosmosImage(istcHat),
   istcMouth1: new CosmosAnimationResources(new CosmosImage(istcMouth1), new CosmosData(istcMouth1$info)),
   istcMouth2: new CosmosAnimationResources(new CosmosImage(istcMouth2), new CosmosData(istcMouth2$info)),
   istcMouth3: new CosmosImage(istcMouth3),
   istcMouth4: new CosmosAnimationResources(new CosmosImage(istcMouth4), new CosmosData(istcMouth4$info)),
   istcSweat: new CosmosImage(istcSweat),
   istKeeper: new CosmosAnimationResources(new CosmosImage(istKeeper), new CosmosData(istKeeper$info)),
   sClipper: new CosmosInventory(new CosmosStringData(sClipper$vert), new CosmosStringData(sClipper$frag)),
   sWaver: new CosmosInventory(new CosmosStringData(sWaver$vert), new CosmosStringData(sWaver$frag))
};

export const inventories = {
   avMettaton: new CosmosInventory(
      content.avMettaton1,
      content.avMettaton2,
      content.avMettaton3,
      content.avMettaton4,
      content.avMettaton5,
      content.avMettaton6,
      content.avMettaton7,
      content.avMettaton8,
      content.avMettaton9
   ),
   avTem: new CosmosInventory(
      content.avTem1,
      content.avTem2,
      content.avTem3,
      content.avTem4,
      content.avTem5,
      content.avTem6
   ),
   battleAssets: new CosmosInventory(
      content.asArrow,
      content.asGoodbye,
      content.asPunch1,
      content.asPunch2,
      content.asGunshot,
      content.asMultitarget,
      content.asCrit,
      content.asBookspin,
      content.asLove,
      content.asRun,
      content.asSaber3,
      content.asSpeed,
      content.asStrike,
      content.asSwing,
      content.asShatter,
      content.ibuFight,
      content.ibuAct,
      content.ibuItem,
      content.ibuMercy,
      content.ibuDeadeye,
      content.ibuGrid1,
      content.ibuGrid2,
      content.ibuGrid3,
      content.ibuHP,
      content.ibuIndicator,
      content.ibuRun,
      content.ibuSwing,
      content.ibuFist1,
      content.ibuFist2,
      content.ibuBoot1,
      content.ibuBoot2,
      content.ibuNotebook,
      content.ibuStar,
      content.ibuBubbleDummy,
      content.ibuBubbleShock,
      content.ibuBubbleTwinkly,
      content.ibuFrypan1,
      content.ibuFrypan2,
      content.asFrypan,
      content.ibuGunshot1,
      content.ibuGunshot2
   ),
   exAssets: new CosmosInventory(
      content.ibbExBombBlastCore,
      content.ibbExBombBlastRay,
      content.ibbExTiny1,
      content.ibbExTiny2,
      content.ibbExTiny3,
      content.ibbExKiss,
      content.ibbBomb,
      content.ibbBoxBullet,
      content.ibbBoxBulletUp,
      content.ibuYellowSOUL,
      content.ibuYellowShot,
      content.ibcMettatonExLeg,
      content.ibcMettatonExArm,
      content.ibcMettatonExFace,
      content.ibcMettatonExBody,
      content.ibcMettatonExBodyHeart,
      content.ibbLegBullet,
      content.ibcMettatonBodyBack,
      content.ibcMettatonBodyTransform,
      content.ibcMettatonDjdisco,
      content.ibcMettatonDjdiscoInv,
      content.ibcMettatonArmsWelcomeBack,
      content.ibcMettatonQuizbutton,
      content.ibuBubbleMTT,
      content.iooAStagelight,
      content.iooAStagecloud,
      content.ibbExShine,
      content.ibcMettatonHappybreaktime,
      content.ibbBuzzpillar,
      content.ibbBuzzlightning,
      content.ibcMettatonExStarburst,
      content.ibbExHeart,
      content.ibbTear,
      content.ibbScribble,
      content.ibbLaserEmitter,
      content.ibcMettatonRecbox,
      content.asPrebomb,
      content.asBomb,
      content.asBoom,
      content.asSuperstrike,
      content.asComputer,
      content.asMusOhyes,
      content.amLegs,
      content.amLegsIntro,
      content.asSwing,
      content.asStab,
      content.asHeartshot,
      content.asHit,
      content.asLanding,
      content.asShatter,
      content.amGrandfinale,
      content.asUpgrade,
      content.asSwallow,
      content.asRetract,
      content.asBuhbuhbuhdaadodaa,
      content.asShock,
      content.asBurst,
      content.asNode,
      content.avNapstablook,
      content.amOhmy,
      content.amForthefans
   ),
   idcAlphys: new CosmosInventory(
      content.idcAlphysCutscene1,
      content.idcAlphysShocked,
      content.idcAlphysNervousLaugh,
      content.idcAlphysWorried,
      content.idcAlphysYeahYouKnowWhatsUp,
      content.idcAlphysYeahYouKnowWhatsUpCenter,
      content.idcAlphysDontGetAllDreamyEyedOnMeNow,
      content.idcAlphysCutscene2,
      content.idcAlphysSide,
      content.idcAlphysSmileSweat,
      content.idcAlphysSideSad,
      content.idcAlphysSoAwesome,
      content.idcAlphysThatSucks,
      content.idcAlphysHaveSomeCompassion,
      content.idcAlphysTheFactIs,
      content.idcAlphysWelp,
      content.idcAlphysHellYeah,
      content.idcAlphysUhButHeresTheDeal,
      content.idcAlphysNeutralSweat,
      content.idcAlphysWTF,
      content.idcAlphysWTF2,
      content.idcAlphysCutscene3,
      content.idcAlphysGarbo,
      content.idcAlphysGarboCenter,
      content.idcAlphysFR,
      content.idcAlphysInquisitive,
      content.idcAlphysOhGodNo,
      content.idcAlphysIDK
   ),
   idcAsgore: new CosmosInventory(
      content.idcAsgoreCutscene1,
      content.idcAsgorePensive,
      content.idcAsgoreWhatHaveYouDone,
      content.idcAsgorePensiveSmile,
      content.idcAsgoreSide,
      content.idcAsgoreHmph,
      content.idcAsgoreHmphClosed,
      content.idcAsgoreHopeful,
      content.idcAsgoreHopefulSide,
      content.idcAsgoreMad,
      content.idcAsgoreWhatYouDoin,
      content.idcAsgoreFunni,
      content.idcAsgoreBouttacry,
      content.idcAsgoreCry1,
      content.idcAsgoreCry2
   ),
   idcAsriel: new CosmosInventory(
      content.idcAsrielEvil,
      content.idcAsrielEvilClosed,
      content.idcAsrielPlain,
      content.idcAsrielPlainClosed,
      content.idcAsrielSmirk,
      content.idcAsrielFocus,
      content.idcAsrielFocusClosed,
      content.idcAsrielFocusSide,
      content.idcAsrielCocky,
      content.idcAsrielHuh,
      content.idcAsrielOhReally,
      content.idcAsrielOhReallyClosed,
      content.idcAsrielFear,
      content.idcAsrielFurrow
   ),
   idcKidd: new CosmosInventory(
      content.idcKiddCutscene1,
      content.idcKiddAww,
      content.idcKiddHuh,
      content.idcKiddHuhSlave,
      content.idcKiddNeutral,
      content.idcKiddNeutralSlave,
      content.idcKiddSerene,
      content.idcKiddShocked,
      content.idcKiddShockedSlave,
      content.idcKiddKiller,
      content.idcKiddKillerSlave,
      content.idcKiddSide
   ),
   idcPapyrusBattle: new CosmosInventory(
      content.idcPapyrusBattleHapp,
      content.idcPapyrusBattleHappAgain,
      content.idcPapyrusBattleAnime,
      content.idcPapyrusBattleBlush,
      content.idcPapyrusBattleBlushRefuse,
      content.idcPapyrusBattleConfident,
      content.idcPapyrusBattleDeadpan,
      content.idcPapyrusBattleDetermined,
      content.idcPapyrusBattleEyeroll,
      content.idcPapyrusBattleFakeAnger,
      content.idcPapyrusBattleMad,
      content.idcPapyrusBattleNooo,
      content.idcPapyrusBattleOwwie,
      content.idcPapyrusBattleShock,
      content.idcPapyrusBattleSide,
      content.idcPapyrusBattleSly,
      content.idcPapyrusBattleSus,
      content.idcPapyrusBattleSweat,
      content.idcPapyrusBattleTopBlush,
      content.idcPapyrusBattleWeary,
      content.idcPapyrusBattleClosed
   ),
   idcSans: new CosmosInventory(
      content.idcSansToriel,
      content.idcSansNormal,
      content.idcSansEmpty,
      content.idcSansWink,
      content.idcSansBlink,
      content.idcSansLaugh1,
      content.idcSansLaugh2,
      content.idcSansEye
   ),
   iocAlphys: new CosmosInventory(
      content.iocAlphysDown,
      content.iocAlphysDownTalk,
      content.iocAlphysLeft,
      content.iocAlphysLeftTalk,
      content.iocAlphysRight,
      content.iocAlphysRightTalk,
      content.iocAlphysUp,
      content.iocAlphysUpTalk,
      content.iocAlphysShocked
   ),
   iocAsriel: new CosmosInventory(
      content.iocAsrielDown,
      content.iocAsrielLeft,
      content.iocAsrielRight,
      content.iocAsrielUp,
      content.iocAsrielDownTalk,
      content.iocAsrielLeftTalk,
      content.iocAsrielRightTalk,
      content.iocAsrielUpTalk
   ),
   iocFriskJetpack: new CosmosInventory(
      content.iocFriskDownJetpack,
      content.iocFriskLeftJetpack,
      content.iocFriskRightJetpack,
      content.iocFriskUpJetpack,
      content.iocFriskDownWaterJetpack,
      content.iocFriskLeftWaterJetpack,
      content.iocFriskRightWaterJetpack,
      content.iocFriskUpWaterJetpack,
      content.iocFriskDownJetpackOff,
      content.iocFriskLeftJetpackOff,
      content.iocFriskRightJetpackOff,
      content.iocFriskUpJetpackOff,
      content.iocFriskDownWaterJetpackOff,
      content.iocFriskLeftWaterJetpackOff,
      content.iocFriskRightWaterJetpackOff,
      content.iocFriskUpWaterJetpackOff
   ),
   iocKidd: new CosmosInventory(
      content.iocKiddDown,
      content.iocKiddLeft,
      content.iocKiddRight,
      content.iocKiddUp,
      content.iocKiddDownTalk,
      content.iocKiddLeftTalk,
      content.iocKiddRightTalk,
      content.iocKiddUpTalk,
      content.iocKiddLeftTrip,
      content.iocKiddRightTrip
   ),
   iocKiddSad: new CosmosInventory(
      content.iocKiddDownSad,
      content.iocKiddLeftSad,
      content.iocKiddRightSad,
      content.iocKiddDownTalkSad,
      content.iocKiddLeftTalkSad,
      content.iocKiddRightTalkSad
   ),
   iocKiddSlave: new CosmosInventory(
      content.iocKiddDownSlave,
      content.iocKiddLeftSlave,
      content.iocKiddRightSlave,
      content.iocKiddDownTalkSlave,
      content.iocKiddLeftTalkSlave,
      content.iocKiddRightTalkSlave
   ),
   iocMettaton: new CosmosInventory(
      content.iocMettatonLaugh,
      content.iocMettatonMicrophone,
      content.iocMettatonPoint,
      content.iocMettatonPointthree,
      content.iocMettatonWave,
      content.iocMettatonClap,
      content.iocMettatonRollLeft,
      content.iocMettatonRollRight,
      content.iocMettatonDotdotdot,
      content.iocMettatonConfused
   ),
   iocMettatonAnchor: new CosmosInventory(
      content.iocMettatonAnchorFlyer,
      content.iocMettatonAnchorLaugh,
      content.iocMettatonAnchorOMG,
      content.iocMettatonAnchorDotdotdot,
      content.iocMettatonAnchorG,
      content.iocMettatonAnchorPoint
   ),
   iocNapstablook: new CosmosInventory(
      content.iocNapstablookBody,
      content.iocNapstablookShadow,
      content.iocNapstablookDown,
      content.iocNapstablookLeft,
      content.iocNapstablookRight,
      content.iocNapstablookUp
   ),
   iocNapstablookAlter: new CosmosInventory(
      content.iocNapstablookDownAlter,
      content.iocNapstablookLeftAlter,
      content.iocNapstablookRightAlter,
      content.iocNapstablookUpAlter
   ),
   iocPapyrus: new CosmosInventory(
      content.iocPapyrusDown,
      content.iocPapyrusDownMad,
      content.iocPapyrusDownMadTalk,
      content.iocPapyrusDownTalk,
      content.iocPapyrusLeap,
      content.iocPapyrusLeft,
      content.iocPapyrusLeftMad,
      content.iocPapyrusLeftMadTalk,
      content.iocPapyrusLeftTalk,
      content.iocPapyrusRight,
      content.iocPapyrusRightMad,
      content.iocPapyrusRightMadTalk,
      content.iocPapyrusRightTalk,
      content.iocPapyrusUp,
      content.iocPapyrusUpTalk,
      content.iocPapyrusCape,
      content.iocPapyrusStomp
   ),
   iocPapyrusStark: new CosmosInventory(
      content.iocPapyrusCapeStark,
      content.iocPapyrusDownStark,
      content.iocPapyrusRightStark,
      content.iocPapyrusLeftStark,
      content.iocPapyrusDownStarkTalk,
      content.iocPapyrusRightStarkTalk,
      content.iocPapyrusLeftStarkTalk
   ),
   iocSans: new CosmosInventory(
      content.iocSansDown,
      content.iocSansLeft,
      content.iocSansRight,
      content.iocSansUp,
      content.iocSansDownTalk,
      content.iocSansLeftTalk,
      content.iocSansRightTalk,
      content.iocSansUpTalk,
      content.iocSansHandshake,
      content.iocSansWink,
      content.iocSansShrug
   ),
   iocUndyne: new CosmosInventory(
      content.iocUndyneDown,
      content.iocUndyneLeft,
      content.iocUndyneRight,
      content.iocUndyneUp,
      content.iocUndyneDownTalk,
      content.iocUndyneLeftTalk,
      content.iocUndyneRightTalk,
      content.iocUndyneUpTalk,
      content.iocUndyneDownArmor,
      content.iocUndyneDownArmorWalk,
      content.iocUndyneLeftArmor,
      content.iocUndyneLeftArmorWalk,
      content.iocUndyneLeftArmorJetpack,
      content.iocUndyneRightArmor,
      content.iocUndyneRightArmorWalk,
      content.iocUndyneRightArmorJetpack,
      content.iocUndyneUpArmor,
      content.iocUndyneUpArmorWalk,
      content.iocUndyneUpArmorJetpack,
      content.iocUndyneDownStoic,
      content.iocUndyneLeftStoic,
      content.iocUndyneRightStoic,
      content.iocUndyneDownStoicTalk,
      content.iocUndyneLeftStoicTalk,
      content.iocUndyneRightStoicTalk
   ),
   iocUndyneDate: new CosmosInventory(
      content.iocUndyneDownDate,
      content.iocUndyneLeftDate,
      content.iocUndyneRightDate,
      content.iocUndyneUpDate,
      content.iocUndyneDownDateTalk,
      content.iocUndyneLeftDateTalk,
      content.iocUndyneRightDateTalk,
      content.iocUndyneUpDateTalk,
      content.iocUndyneDateKick,
      content.iocUndyneDateLeap,
      content.iocUndyneDateSit,
      content.iocUndyneDateStomp,
      content.iocUndyneDateNamaste,
      content.iocUndyneDateGrab,
      content.iocUndyneDateBurnt,
      content.iocUndyneDateUppercut,
      content.iocUndyneDateThrow,
      content.iocUndyneDateThrowTalk,
      content.iocUndyneDateFlex,
      content.iocUndyneDateTomato,
      content.iocUndyneDateStompTomato,
      content.iocUndyneDateOMG
   ),
   ionARg: new CosmosInventory(
      content.ionARgbugDown,
      content.ionARgbugLeft,
      content.ionARgbugRight,
      content.ionARgcatDown,
      content.ionARgcatLeft,
      content.ionARgcatRight,
      content.ionARgdragonDown,
      content.ionARgdragonLeft,
      content.ionARgdragonRight,
      content.ionARgrabbitDown,
      content.ionARgrabbitLeft,
      content.ionARgrabbitRight
   ),
   iooSGauntlet: new CosmosInventory(
      content.iooSGauntletBlaster,
      content.iooSGauntletCollarsword,
      content.iooSGauntletFire,
      content.iooSGauntletTesla,
      content.iooSGauntletDog
   ),
   overworldAssets: new CosmosInventory(
      content.avNarrator,
      content.avStoryteller,
      content.asEquip,
      content.asHeal,
      content.asSelect,
      content.asMenu,
      content.asNoise,
      content.ibuSOUL,
      content.asNotify,
      content.ibuNotify,
      content.ieSOUL,
      content.asSave,
      content.ibGrey,
      content.ibBlue,
      content.ibGalaxy,
      content.asSave,
      content.asOops,
      content.asPhone,
      content.asBattlefall,
      content.ieStarbertA,
      content.ieStarbertB,
      content.ieStarbertBGum,
      content.avToriel,
      content.idcTorielCutscene1,
      content.idcTorielCutscene2,
      content.idcTorielEverythingisfine,
      content.idcTorielWTF,
      content.idcTorielWTF2,
      content.idcTorielBlush,
      content.idcTorielConcern,
      content.idcTorielXD,
      content.idcTorielSmallXD,
      content.idcTorielCompassion,
      content.idcTorielCompassionSmile,
      content.idcTorielIsMad,
      content.idcTorielCompassionFrown,
      content.idcTorielStraightUp,
      content.idcTorielSincere,
      content.idcTorielDreamworks,
      content.idcTorielShock,
      content.idcTorielLowConcern,
      content.idcTorielSad,
      content.idcTorielCry,
      content.idcTorielCryLaugh,
      content.avPapyrus,
      content.idcPapyrusAYAYA,
      content.idcPapyrusAyoo,
      content.idcPapyrusCutscene1,
      content.idcPapyrusDisbeef,
      content.idcPapyrusDisbeefTurnaround,
      content.idcPapyrusIsThatSo,
      content.idcPapyrusNervousLaugh,
      content.idcPapyrusNervousSweat,
      content.idcPapyrusNyeh,
      content.idcPapyrusThisIsSoSad,
      content.idcPapyrusWhatchaGonnaDo,
      content.idcPapyrusSad,
      content.idcPapyrusSadSweat,
      content.avUndyne,
      content.idcUndyneCutscene1,
      content.idcUndyneAngryTomato,
      content.idcUndyneBattleTorso,
      content.idcUndyneDateTorso,
      content.idcUndyneDateTorsoBody,
      content.idcUndyneDafuq,
      content.idcUndyneGrr,
      content.idcUndyneGrrSide,
      content.idcUndyneHappyTomato,
      content.idcUndyneImOntoYouPunk,
      content.idcUndyneLaughcrazy,
      content.idcUndynePensive,
      content.idcUndyneSquidgames,
      content.idcUndyneSus,
      content.idcUndyneSweating,
      content.idcUndynetheHell,
      content.idcUndyneBeingAwesomeForTenMinutesStraight,
      content.idcUndyneUWU,
      content.idcUndyneWhatevs,
      content.idcUndyneWTFBro,
      content.idcUndyneYouKilledHim,
      content.idcUndyneYouKilledHimPensive,
      content.idcUndyneYouKilledHimSide,
      content.idcUndyneYouKilledHimSmile,
      content.idcUndyneYouKilledHimStare,
      content.asTextnoise,
      content.asDimbox,
      content.asBreak,
      content.ibuBreak,
      content.asHurt,
      content.iocFriskDown,
      content.iocFriskLeft,
      content.iocFriskRight,
      content.iocFriskUp,
      content.iocFriskDownWater,
      content.iocFriskLeftWater,
      content.iocFriskRightWater,
      content.iocFriskUpWater,
      content.asPurchase,
      content.ieSplashBackground
   ),
   splashAssets: new CosmosInventory(content.asSplash, content.ieSplashForeground, content.avAsriel),
   ionAOnionsan: new CosmosInventory(
      content.ionAOnionsanArmLeft,
      content.ionAOnionsanArmOut,
      content.ionAOnionsanArmWave,
      content.ionAOnionsanKawaii,
      content.ionAOnionsanWistful,
      content.ionAOnionsanYhear
   )
};

export default content;

CosmosUtils.status(`LOAD MODULE: CONTENT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
