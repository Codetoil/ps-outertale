import { BLEND_MODES, Filter, Rectangle } from 'pixi.js';
import assets from '../assets';
import { OutertaleChoice, OutertaleGroup, OutertaleVolatile } from '../classes';
import { faces as commonFaces } from '../common/bootstrap';
import {
   defaultSetup,
   endMusic,
   resetBox,
   spareFlee,
   standardMusic,
   standardPos,
   standardSize,
   turnSkip
} from '../common/groups';
import commonPatterns from '../common/patterns';
import content from '../content';
import { atlas, events, game, random, renderer, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosInstance,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../engine';
import { battler, shake, world } from '../mantle';
import save from '../save';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

const groups = {
   doge: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogebattle),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid2;
         battler.status = text.b_opponent_doge.status1();
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.dogebattle.instance(timer);
         battler.music = music;
         return true;
      },
      opponents: [ [ opponents.doge, { x: 160, y: 120 } ] ]
   }),

   muffet: new OutertaleGroup({
      assets: new CosmosInventory(content.amSpiderboss),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid2;
         battler.status = text.b_opponent_muffet.status1;
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.spiderboss.instance(timer);
         battler.music = music;
         return true;
      },
      opponents: [ [ opponents.muffet, { x: 160, y: 120 } ] ]
   }),

   shyren: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_shyren.status1();
         const music = world.genocide ? assets.music.shock.instance(timer) : assets.music.battle1.instance(timer);
         battler.music = music;
         return true;
      },
      handler () {
         battler.alive.length === 0 && battler.music?.stop();
      },
      opponents: [ [ opponents.shyren, { x: 140, y: 120 } ] ]
   }),

   undyne: new OutertaleGroup({
      assets: new CosmosInventory(),
      init () {
         opponents.undyne.df = world.genocide ? 20 : 0;
         const kidd = new CosmosAnimation({
            position: { x: 225, y: 120 },
            anchor: { x: 0, y: 1 },
            resources: content.ibcKiddBody
         });
         const volatile = battler.volatile[0];
         if (!world.genocide) {
            const time = timer.value;
            const fancygrid = new CosmosObject({
               objects: CosmosUtils.populate(6, index =>
                  new CosmosSprite({
                     scale: 0.5,
                     position: { x: 7.5 + 50.5 * index },
                     metadata: { phase: index / 12 },
                     frames: [ content.ibuGrid3 ]
                  }).on('tick', function () {
                     this.position.y =
                        9 / 2 +
                        CosmosMath.remap(
                           CosmosMath.wave(this.metadata.phase + ((timer.value - time) % 5000) / 5000),
                           -1,
                           1
                        ) *
                           10;
                  })
               )
            }).on('tick', function () {
               this.metadata.cutscene || (this.alpha.value = battler.alpha.value);
            });
            volatile.vars.fancygrid = fancygrid;
            battler.overlay.objects = [ fancygrid, ...battler.overlay.objects ];
            battler.box.position.y = 120;
            battler.box.size.x = 36;
            battler.box.size.y = 36;
         }
         if (world.genocide) {
            volatile.vars.genostrike = true;
         }
         const waverPromise = content.sWaver.load().then(() => {
            const [ vert, frag ] = content.sWaver.value!.map(value => value.value!);
            const rd = random.clone();
            const filter = new Filter(vert, frag, {
               size: 6,
               widthTop: 0,
               widthBottom: 0,
               phase: 0
            });
            volatile.container.container.filters = [ filter ];
            volatile.container.container.filterArea = new Rectangle(0, 0, 640, 240);
            volatile.vars.a = 0.003;
            volatile.vars.b = 0.05;
            volatile.vars.c = new CosmosValue();
            volatile.vars.d = 0.1;
            volatile.vars.e = 0.2;
            volatile.container.on('tick', () => {
               const trueValue =
                  volatile.vars.c.value * (1 + CosmosMath.remap(rd.next(), -volatile.vars.e, volatile.vars.e));
               filter.uniforms.widthTop = volatile.vars.a + volatile.vars.b * CosmosMath.remap(trueValue, -1.76, 1);
               filter.uniforms.widthBottom = filter.uniforms.widthTop + volatile.vars.d;
               filter.uniforms.phase = (filter.uniforms.phase + 0.1) % 1;
            });
         });
         volatile.vars.wt = async (
            cutscene: boolean,
            position: CosmosPointSimple,
            bubble: CosmosSprite,
            ...lines: string[]
         ) => {
            const container = new CosmosObject({
               position: new CosmosPoint(position).subtract(volatile.container.position),
               objects: [ bubble ]
            });
            cutscene || atlas.switch('dialoguerBase');
            volatile.container.objects = [ ...volatile.container.objects, container as CosmosSprite ];
            typer.magic = '{#p/monster}{@swirl:0.35,1.4,13.5}';
            await typer.text(...lines);
            cutscene || atlas.switch(null);
            const ieie = volatile.container.objects.indexOf(container);
            volatile.container.objects = [
               ...volatile.container.objects.slice(0, ieie),
               ...volatile.container.objects.slice(ieie + 1)
            ] as CosmosSprite[];
         };
         if (world.genocide) {
            battler.SOUL.metadata.color = 'green';
         } else {
            battler.SOUL.position.set(battler.box.position);
         }
         volatile.vars.face = 0;
         const swinger = new CosmosAnimation({
            blend: BLEND_MODES.ADD,
            alpha: 0,
            active: true,
            position: { x: -89.5, y: -55.5 },
            scale: 0.5,
            resources: content.ibcUndyneSmear
         });
         const arm = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ world.genocide ? content.ibcUndyneArm2Ex : content.ibcUndyneArm2 ]
         }).on('tick', function () {
            this.tint = volatile.container.tint;
         });
         const armholder = (volatile.vars.armholder = new CosmosObject({
            position: volatile.container.position.add(0, 1),
            objects: [ swinger, arm ],
            metadata: { swingin: false }
         }).on('tick', async function () {
            if (volatile.vars.armswing) {
               this.alpha.value = 1;
               if (!this.metadata.swingin) {
                  this.metadata.swingin = true;
                  world.genocide && (volatile.vars.CRAZYHEAD = 1);
                  arm.cast(new CosmosPoint(30, 160).divide(-2));
                  await arm.rotation.modulate(timer, 300, 70, 60, 60);
                  await arm.rotation.modulate(timer, 100, 40, -75);
                  world.genocide && (volatile.vars.CRAZYHEAD = 2);
                  swinger.alpha.value = 0.75;
                  swinger.alpha.modulate(timer, 550, swinger.alpha.value, 0);
                  if (world.genocide) {
                     // set velo to:      (end -              start) / (ms  /    frame)
                     swinger.velocity.y = (240 - swinger.position.y) / (550 / (100 / 3));
                  }
                  if ((battler.SOUL.metadata.color = volatile.vars.idealcolor) === 'red') {
                     world.genocide || (battler.flee = true);
                  } else {
                     battler.flee = false;
                  }
                  await arm.rotation.modulate(timer, 500, -77.5, -80);
                  world.genocide && (volatile.vars.CRAZYHEAD = 3);
                  await arm.rotation.modulate(timer, 200, -75, 0, 0);
                  world.genocide && (volatile.vars.CRAZYHEAD = 0);
                  volatile.vars.armswing = false;
                  this.metadata.swingin = false;
                  swinger.velocity.y = 0;
                  swinger.position.y = -55.5;
               }
            } else {
               this.alpha.value = 0;
               this.metadata.swingin = false;
            }
         }));
         const fishBubblePos = { x: 385 / 2, y: 35 / 2 };
         if (world.genocide) {
            const UF = save.flag.n.undying;
            const pregenoAssets = new CosmosInventory(content.amUndynepregeno, content.amUndynegeno);
            const pregenoLoader = pregenoAssets.load();
            UF === 0 || timer.pause(1600).then(() => (kidd.index = 2));
            battler.alpha.value = 1;
            events.on('battle').then(async () => {
               renderer.attach('menu', kidd, armholder);
               await battler.attack(volatile, { power: 0, operation: 'multiply' }, true, true);
               await timer.pause(450);
               speech.emoters.kidd = kidd;
               speech.emoters.undyne = volatile.container.objects[0];
               const kiddBubblePos = { x: 252.5, y: 61.5 };
               if (UF === 0) {
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene1
                  );
                  await timer.pause(100);
                  kidd.index = 2;
                  await timer.pause(1150);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene2
                  );
                  await timer.pause(1450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene3
                  );
                  await timer.pause(1350);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene4
                  );
                  await timer.pause(850);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene5
                  );
                  await timer.pause(750);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene6
                  );
                  await timer.pause(1250);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene7
                  );
                  await timer.pause(650);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene8
                  );
                  await timer.pause(1450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene9
                  );
                  await timer.pause(850);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene10
                  );
                  await timer.pause(450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene11
                  );
               } else {
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene2
                  );
                  await timer.pause(450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene3x
                  );
               }
               UF === 0 && (await timer.pause(650));
               kidd.index = 9;
               await timer.pause(850);
               if (UF === 0) {
                  await kidd.position.modulate(timer, 600, { x: kidd.position.x + 20 });
                  await timer.pause(1150);
                  await kidd.position.modulate(timer, 600, { x: kidd.position.x + 100 });
               } else {
                  await kidd.position.modulate(timer, 720, { x: kidd.position.x + 120 });
               }
               renderer.detach('menu', kidd);
               await Promise.all([ waverPromise, pregenoLoader, timer.pause(UF === 0 ? 1250 : 850) ]);
               const c = volatile.vars.c as CosmosValue;
               let HEREITCOMES: CosmosInstance | null = null;
               if (UF === 0) {
                  c.modulate(timer, 300, c.value, 0.2, 0.2);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12a
                  );
                  c.modulate(timer, 300, c.value, 0.3, 0.3);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12b
                  );
                  c.modulate(timer, 300, c.value, 0.4, 0.4);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12c
                  );
                  c.modulate(timer, 300, c.value, 0.5, 0.5);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12d
                  );
                  await c.modulate(timer, UF === 0 ? 3000 : 2000, c.value, 0.8, 0.8);
                  await c.modulate(timer, UF === 0 ? 1450 : 1250, c.value, 0.6);
                  c.modulate(timer, UF === 0 ? 1650 : 1350, 0.2, 0.2);
                  speech.emoters.undyne.index = 9;
                  timer.pause(66).then(async () => {
                     speech.emoters.undyne.index = 10;
                     await timer.pause(66);
                     speech.emoters.undyne.index = 11;
                  });
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene13
                  );
                  await timer.pause(1250);
                  HEREITCOMES = assets.music.undynepregeno.instance(timer);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene14
                  );
               } else {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene14x
                  );
               }
               const whitefader = new CosmosRectangle({
                  alpha: 0,
                  fill: 'white',
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', whitefader);
               c.modulate(timer, UF === 0 ? 4500 : 2500, c.value, 1, 1);
               await whitefader.alpha.modulate(timer, UF === 0 ? 4500 : 2500, 1, 1);
               volatile.hp = opponents.undyne.hp = 15000;
               volatile.alive = true;
               volatile.container.objects[0].index = 16;
               await timer.pause(850);
               whitefader.alpha.modulate(timer, UF === 0 ? 1500 : 600, 1, 0).then(() => {
                  renderer.detach('menu', whitefader);
               });
               await c.modulate(timer, UF === 0 ? 1500 : 600, c.value, -0.1);
               await timer.pause(UF === 0 ? 1150 : 750);
               save.flag.n.undying++;
               if (UF === 0) {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene15
                  );
               } else {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene15x
                  );
               }

               // undying sprite
               volatile.vars.genostrike = false;
               volatile.vars.undying = true;
               battler.stat.invulnerability.modifiers.push([ 'multiply', 2 / 3, Infinity ]);
               const usprite = opponents.undyne.sprite(volatile);
               volatile.container.objects[0] = usprite;
               CosmosUtils.chain(usprite.objects, (objects, next) => {
                  for (const object of objects) {
                     if (object.metadata.part === 'head') {
                        (speech.emoters.undyne = object as CosmosSprite).index = 23;
                        break;
                     } else {
                        next(object.objects);
                     }
                  }
               });

               volatile.vars.azzyAssistScene = async () => {
                  const SOULalpha = battler.SOUL.alpha.value;
                  battler.SOUL.alpha.value = 0;
                  const overlay = new CosmosRectangle({ fill: 'black', size: { x: 320, y: 240 } });
                  const OGgain = battler.music?.gain.value ?? 0;
                  if (battler.music) {
                     battler.music.gain.value = 0;
                     battler.music.rate.value = 0;
                  }
                  HEREITCOMES?.stop();
                  renderer.attach('menu', overlay);
                  volatile.vars.freeze = true;
                  assets.sounds.noise.instance(timer);
                  shake(0, 0);
                  await timer.pause(300);
                  speech.state.face = commonFaces.asrielPlain;
                  const goatbro = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: { x: 160, y: 120 },
                     frames: [ content.ibcAsrielAssist ],
                     objects: [
                        new CosmosObject({
                           blend: BLEND_MODES.ADD,
                           position: { x: -0.5, y: -56.5 },
                           metadata: { face: null as CosmosSprite | null }
                        }).on('tick', function () {
                           this.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
                           if (this.metadata.face !== speech.state.face) {
                              this.metadata.face = speech.state.face;
                              typer.mode === 'idle' || (game.text = '');
                           }
                        })
                     ]
                  });
                  overlay.objects = [ goatbro ];
                  renderer.attach('menu', goatbro);
                  assets.sounds.noise.instance(timer);
                  await timer.pause(1500);
                  await battler.monster(
                     false,
                     { x: 180.5, y: 50 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.asrielExplain()
                  );
                  volatile.vars.freeze = false;
                  if (battler.music) {
                     battler.music.rate.value = 1;
                     battler.music.gain.modulate(timer, 1000, OGgain);
                  }
                  await Promise.all([ goatbro.alpha.modulate(timer, 850, 0), overlay.alpha.modulate(timer, 850, 0) ]);
                  renderer.detach('menu', overlay);
                  battler.status = text.b_opponent_undyne.trueGenoStatusX();
                  save.flag.n.azzy_assist = volatile.vars.azzyAssist = 2;
                  battler.SOUL.alpha.value = SOULalpha;
               };

               volatile.vars.speed = 1.46;
               volatile.vars.azzyAssist = save.flag.n.azzy_assist;
               switch (volatile.vars.azzyAssist) {
                  case 0:
                     save.flag.n.azzy_assist = 1;
                     battler.status = text.b_opponent_undyne.genoStatus1;
                     break;
                  case 1:
                     await volatile.vars.azzyAssistScene();
                     break;
                  case 2:
                     battler.status = text.b_opponent_undyne.trueGenoStatusX();
                     break;
               }

               // play unlooped intro first, then move to looped version
               battler.volatile[0].vars.c.value = -1;
               battler.music = (() => {
                  const inst = assets.music.undynegenoStart.instance(timer);
                  inst.source.addEventListener('ended', () => {
                     if (battler.music) {
                        const newinst = assets.music.undynegeno.instance(timer, { offset: 21.81 });
                        battler.music = newinst;
                     }
                  });
                  return inst;
               })();
               await battler.resume();
               await timer.pause(21810);
            });
         } else {
            save.data.n.undyne_hp === 0 || (volatile.hp = save.data.n.undyne_hp);
            battler.alpha.value = 1;
            events.on('battle').then(() => {
               renderer.attach('menu', armholder);
               battler.resume(async () => {
                  const usprite = volatile.container.objects[0];
                  CosmosUtils.chain(usprite.objects, (objects, next) => {
                     for (const object of objects) {
                        if (object.metadata.part === 'head') {
                           (speech.emoters.undyne = object as CosmosSprite).index = world.genocide
                              ? 23
                              : save.data.n.undyne_phase > 3
                              ? 22
                              : save.data.n.undyne_phase > 2
                              ? 6
                              : save.data.n.state_starton_papyrus === 1
                              ? 2
                              : 0;
                           break;
                        } else {
                           next(object.objects);
                        }
                     }
                  });
                  await timer.pause(650);
                  if (save.data.n.undyne_phase < 3) {
                     volatile.vars.idealcolor = 'green';
                     volatile.vars.armswing = true;
                     await timer.when(() => volatile.vars.armswing === false);
                  }
                  await timer.pause(850);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...CosmosUtils.provide(
                        [
                           text.b_opponent_undyne.intro1,
                           text.b_opponent_undyne.intro2,
                           text.b_opponent_undyne.intro3,
                           text.b_opponent_undyne.intro4,
                           text.b_opponent_undyne.intro5
                        ][save.data.n.undyne_phase]
                     )
                  );
                  battler.volatile[0].vars.c.value = -1;
                  battler.music = assets.music.undyneboss.instance(timer);
                  battler.SOUL.alpha.value = 0;
                  await battler.box.position.modulate(timer, 150, { y: 160 });
                  await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
                  battler.status = text.b_opponent_undyne.status1;
               });
            });
         }
         return false;
      },
      opponents: [ [ opponents.undyne, { x: 160, y: 120 } ] ]
   }),

   dateundyne: new OutertaleGroup({
      assets: new CosmosInventory(content.amUndyneboss),
      init () {
         battler.flee = false;
         battler.SOUL.alpha.value = 0;
         battler.music = assets.music.undyneboss.instance(timer);
         battler.music.rate.value = 1.2;
         const volatile = battler.volatile[0];
         battler.alpha.value = 1;
         battler.resume(async () => {
            const usprite = volatile.container.objects[0];
            CosmosUtils.chain(usprite.objects, (objects, next) => {
               for (const object of objects) {
                  if (object.metadata.part === 'head') {
                     (speech.emoters.undyne = object as CosmosSprite).index = 11;
                     break;
                  } else {
                     next(object.objects);
                  }
               }
            });
            await timer.pause(850);
            await battler.monster(
               false,
               { x: 185, y: 32.5 },
               battler.bubbles.twinkly,
               ...text.b_opponent_dateundyne.intro
            );
            battler.status = text.b_opponent_dateundyne.status1;
         });
         events.on('swing').then(() => {
            battler.music!.stop();
            const cym = assets.sounds.cymbal.instance(timer);
            const whitefader = new CosmosRectangle({
               alpha: 0,
               fill: '#fff',
               size: { x: 320, y: 240 }
            });
            renderer.attach('menu', whitefader);
            volatile.vars.fightPromise = whitefader.alpha.modulate(timer, 4000, 1).then(async () => {
               await timer.pause(1000);
               cym.stop();
               renderer.detach('menu', whitefader);
            });
         });
         return false;
      },
      opponents: [ [ opponents.dateundyne, { x: 160, y: 120 } ] ]
   }),

   radtile: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_radtile.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               //renderer.attach('menu', battler.fakebox);
               await Promise.all([
                  standardSize({ x: 100, y: 100 }),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 100 / 2 })
               ]);
               standardPos();
               await patterns.radtile();
               await Promise.all([
                  resetBox(),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 160 })
               ]);
               //renderer.detach('menu', battler.fakebox);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.radtile, { x: 140, y: 120 } ] ]
   }),

   woshua: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_woshua.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               //renderer.attach('menu', battler.fakebox);
               await Promise.all([
                  standardSize({ x: 100, y: 100 }),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 100 / 2 })
               ]);
               standardPos();
               if (await turnSkip()) {
                  await timer.pause(400);
               } else {
                  await patterns.woshua(choice.type === 'act' && choice.act === 'clean', void 0);
               }
               await Promise.all([
                  resetBox(),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 160 })
               ]);
               //renderer.detach('menu', battler.fakebox);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.woshua, { x: 70, y: 120 } ] ]
   }),

   moldbygg: new OutertaleGroup({
      assets: new CosmosInventory(
         content.amBattle1,
         content.ibbOctagon,
         content.ibcMoldbyggHead,
         content.ibcMoldbyggPart,
         content.ibbWorm,
         content.ibbLooxCircle3,
         content.ibcMoldsmal
      ),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_fakemoldsmal.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(
         async (c, t, v) => {
            if (await turnSkip()) {
               await timer.pause(400);
            } else {
               if (battler.opponents.includes(opponents.fakemoldsmal)) {
                  await commonPatterns.moldsmal(void 0, true);
               } else {
                  await patterns.moldbygg();
               }
            }
         },
         { x: 120, y: 65 }
      ),
      opponents: [ [ opponents.fakemoldsmal, { x: 140, y: 120 } ] ]
   }),

   moldsmalMoldbygg: new OutertaleGroup({
      assets: new CosmosInventory(
         content.amBattle1,
         content.ibbOctagon,
         content.ibcMoldbyggHead,
         content.ibcMoldbyggPart,
         content.ibbWorm,
         content.ibbLooxCircle3,
         content.ibcMoldsmal
      ),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_moldsmalMoldbygg1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(
         async (c, t, v) => {
            if (await turnSkip()) {
               await timer.pause(400);
            } else {
               const vars = battler.volatile[0].vars;
               if (battler.alive.length < (vars.enemies ?? 2)) {
                  if (battler.opponents[0] === opponents.fakemoldsmal) {
                     battler.status = text.b_group_moldsmalMoldbygg2c();
                  } else if (battler.opponents[0] === opponents.moldsmal) {
                     battler.status = text.b_group_moldsmalMoldbygg2b();
                  } else {
                     battler.status = text.b_group_moldsmalMoldbygg2a();
                  }
               }
               vars.enemies = battler.alive.length;
               if (battler.alive.length > 1) {
                  if (battler.opponents.includes(opponents.fakemoldsmal)) {
                     await commonPatterns.moldsmal();
                  } else {
                     await Promise.all([ commonPatterns.moldsmal(void 0, void 0, true), patterns.moldbygg('moldsmal') ]);
                  }
               } else if (battler.alive.length > 0) {
                  if (battler.opponents.includes(opponents.moldsmal)) {
                     await commonPatterns.moldsmal();
                  } else if (battler.opponents.includes(opponents.fakemoldsmal)) {
                     await commonPatterns.moldsmal(void 0, true);
                  } else {
                     await patterns.moldbygg();
                  }
               }
            }
         },
         { x: 120, y: 65 }
      ),
      opponents: [
         [ opponents.moldsmal, { x: 100, y: 120 } ],
         [ opponents.fakemoldsmal, { x: 220, y: 120 } ]
      ]
   }),

   woshuaMoldbygg: new OutertaleGroup({
      assets: new CosmosInventory(
         content.amBattle1,
         content.ibbOctagon,
         content.ibcMoldbyggHead,
         content.ibcMoldbyggPart,
         content.ibbWorm,
         content.ibbLooxCircle3,
         content.ibcMoldsmal
      ),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_woshuaMoldbygg2;
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length > 0) {
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < (vars.enemies ?? 2)) {
               if (battler.opponents[0] === opponents.woshua) {
                  battler.status = text.b_group_woshuaMoldbygg2b();
               } else {
                  battler.status = text.b_group_woshuaMoldbygg2a();
               }
            }
            vars.enemies = battler.alive.length;
            await battler.resume(async () => {
               await Promise.all([
                  standardSize({ x: 100, y: 100 }),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 192.5 - 100 / 2 })
               ]);
               standardPos();
               if (await turnSkip()) {
                  await timer.pause(400);
               } else {
                  if (battler.alive.length > 1) {
                     await Promise.all([
                        patterns.woshua(choice.type === 'act' && choice.act === 'clean', 'moldbygg'),
                        patterns.moldbygg('woshua')
                     ]);
                  } else if (battler.opponents.includes(opponents.woshua)) {
                     await patterns.woshua(choice.type === 'act' && choice.act === 'clean', 'moldbygg');
                  } else {
                     await patterns.moldbygg();
                  }
               }
               await Promise.all([
                  resetBox(),
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, { y: 160 })
               ]);
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.woshua, { x: 100, y: 120 } ],
         [ opponents.moldbygg, { x: 220, y: 120 } ]
      ]
   })
};

export default groups;

CosmosUtils.status(`LOAD MODULE: FOUNDRY GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
