import { DropShadowFilter, OutlineFilter, ZoomBlurFilter } from 'pixi-filters';
import assets from '../assets';
import { OutertaleChoice, OutertaleOpponent, OutertaleTurnState, OutertaleVolatile } from '../classes';
import commonGroups, { resetBox, standardSize } from '../common/groups';
import commonOpponents, { MadDummyMetadata } from '../common/opponents';
import content, { inventories } from '../content';
import { events, game, items, random, renderer, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosBitmap,
   CosmosColor,
   CosmosEventHost,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueRandom
} from '../engine';
import { battler, calcHP, fader, header, oops, shake, sineWaver, world } from '../mantle';
import save from '../save';
import patterns from './patterns';
import text from './text';

const ratingsgain = save.data.b.a_state_hapstablook ? -0.2 : save.data.n.bad_lizard < 2 ? -0.4 : -0.6;

export const graphMetadata = {
   next: -3,
   offset: 0,
   ratingsbase: 4000,
   ratingstier: 10000,
   ratingscap: 14000,
   ratingsgain,
   eventQueue: [] as { label: string; score: number }[]
};

function rg (type: 0 | 1) {
   let t = type * 10;
   return new CosmosSprite({
      metadata: { timefactor: 1, size: { y: 80 }, spew: false, sB: void 0 as number | void },
      objects: [
         new CosmosSprite({ frames: [ content.ibcRGShoes ], anchor: { x: 0 }, metadata: { part: 'shoes' } }),
         new CosmosSprite({ frames: [ content.ibcRGLegs ], anchor: { x: 0, y: 1 }, metadata: { part: 'legs' } }),
         new CosmosSprite({
            frames: [ content.ibcRGBall ],
            anchor: 0,
            metadata: { part: 'left1' },
            position: { x: -30, y: -45 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRGBall ],
            anchor: 0,
            metadata: { part: 'right1' },
            position: { x: 30, y: -45 }
         }),
         new CosmosAnimation({
            resources: content.ibcRGChestplate,
            anchor: { x: 0, y: 1 },
            metadata: { part: 'chestplate' },
            position: { y: -21 }
         }),
         new CosmosObject({
            metadata: { part: 'head' },
            position: { y: -45 },
            objects: [
               new CosmosObject(),
               new CosmosSprite({
                  frames: [ [ content.ibcRGCatHead, content.ibcRGBugHead ][type] ],
                  anchor: { x: 0, y: 1 }
               })
            ]
         }),
         new CosmosSprite({
            frames: [ content.ibcRGBall ],
            anchor: 0,
            metadata: { part: 'left2' },
            position: { x: -36, y: -34 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRGBall ],
            anchor: 0,
            metadata: { part: 'right2' },
            position: { x: 36, y: -34 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRGFist ],
            anchor: 0,
            metadata: { part: 'fist' },
            position: { x: -38, y: -22 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRGFalchion ],
            anchor: new CosmosPoint(12.5, 54.5).divide(22, 65).multiply(2).subtract(1).value(),
            metadata: { part: 'falchion' },
            position: { x: 38, y: -22 },
            rotation: 45 / 2
         })
      ]
   }).on('tick', function () {
      const v = (t += this.metadata.timefactor) / 4;
      const s = CosmosMath.remap(Math.sin(v), 0, 1, -1, 1);
      if (this.metadata.spew) {
         this.position.x = sineWaver((this.metadata.sB ??= timer.value as number), 200, -1, 1) * 0.5;
      }
      for (const obj of this.objects) {
         switch (obj.metadata.part) {
            case 'shoes':
               obj.scale.set(CosmosMath.remap(s, 0.97, 1.03), CosmosMath.remap(s, 1.03, 0.97));
               break;
            case 'legs':
               obj.scale.set(CosmosMath.remap(s, 0.97, 1.03), CosmosMath.remap(s, 1.03, 0.97));
               break;
            case 'chestplate': {
               const iY = (obj.metadata.iY ??= obj.y);
               obj.y = CosmosMath.remap(s, iY, iY + 2);
               break;
            }
            case 'head': {
               const iY = (obj.metadata.iY ??= obj.y);
               obj.y = CosmosMath.remap(s, iY, iY + 3);
               const iX = (obj.metadata.iX ??= random.clone()) as CosmosValueRandom;
               if (this.metadata.spew && iX.next() < 0.1) {
                  const spw = obj.objects[0];
                  spw.attach(
                     new CosmosSprite({
                        alpha: 0,
                        frames: [ content.ibcRGSweat ],
                        anchor: 0,
                        metadata: { t: 0 },
                        position: { y: iY + 17.5 },
                        scale: 0.5,
                        gravity: { angle: 90 },
                        velocity: new CosmosPoint().endpoint(iX.next() * -180, 1.85)
                     }).on('tick', function () {
                        this.rotation.value = this.velocity.angle;
                        if (this.metadata.t === 0 && this.alpha.value < 1) {
                           this.alpha.value = Math.min(this.alpha.value + 0.1, 1);
                        } else if (this.metadata.t++ < 15) {
                           this.gravity.extent = 0.1;
                        } else {
                           this.alpha.value -= 0.04;
                           if (this.alpha.value < 0.1) {
                              spw.objects.splice(spw.objects.indexOf(this), 1);
                           }
                        }
                     })
                  );
               }
               break;
            }
            case 'left1':
            case 'right1': {
               const iY = (obj.metadata.iY ??= obj.y);
               obj.y = CosmosMath.remap(Math.sin(v - 0.7), iY, iY + 2, -1, 1);
               break;
            }
            case 'left2':
            case 'right2': {
               const iY = (obj.metadata.iY ??= obj.y);
               obj.y = CosmosMath.remap(Math.sin(v - 1.4), iY, iY + 2, -1, 1);
               break;
            }
            case 'fist':
            case 'falchion': {
               const iY = (obj.metadata.iY ??= obj.y);
               const iR = (obj.metadata.iR ??= obj.rotation.value);
               obj.y = CosmosMath.remap(Math.sin(v - 2.1), iY, iY + 2, -1, 1);
               if (obj.metadata.part === 'falchion') {
                  obj.rotation.value = CosmosMath.remap(Math.sin(v - 2.8), iR, iR + 10, -1, 1);
               } else {
                  obj.rotation.value = CosmosMath.remap(Math.sin(v - 2.8), iR, iR - 10, -1, 1);
               }
               break;
            }
         }
      }
   });
}

function useOld (key: string, state: OutertaleTurnState<any>, spare = true) {
   save.storage.inventory.remove(key);
   oops();
   if (spare) {
      state.volatile.sparable = true;
      battler.spare(state.target);
   }
}

function ratings (label: string, score: number) {
   world.genocide || graphMetadata.eventQueue.push({ label, score });
}

export function graphGen (random3 = random.clone()) {
   const rh = 57;
   const rw = 90; // real width
   return new CosmosRectangle({
      fill: 'transparent',
      stroke: 'white',
      size: { x: rw, y: rh },
      border: 1,
      anchor: { y: 1 },
      position: { x: 10, y: rh + 12 },
      metadata: graphMetadata,
      priority: -999,
      objects: [
         new CosmosRectangle({ size: { x: rw, y: 1 }, fill: '#ff0', stroke: 'transparent' }),
         new CosmosText({
            position: { y: 2 },
            fill: '#fff',
            stroke: 'transparent',
            font: '16px DeterminationSans'
         }),
         new CosmosObject(),
         new CosmosObject({ position: { y: 20 } })
      ]
   }).on('tick', function () {
      this.objects[0].y = -3 - (this.metadata.ratingstier / this.metadata.ratingscap) * (this.size.y - 6);
      this.metadata.ratingsbase += this.metadata.ratingsgain;
      this.metadata.ratingsbase < 0 && (this.metadata.ratingsbase = 0);
      const basefloor = Math.floor(this.metadata.ratingsbase);
      (this.objects[1] as CosmosText).content = text.a_aerialis.ratings.replace('$(x)', basefloor.toString());
      if (++this.metadata.offset === 3) {
         this.metadata.offset = 0;
         const pos = new CosmosPoint({ x: this.size.x - 5, y: this.metadata.next });
         const rangeBase = this.size.y * (basefloor / this.metadata.ratingscap);
         const rangeMin = Math.max(rangeBase - 8, 3);
         const rangeMax = Math.min(rangeBase + 8, this.size.y - 3);
         this.metadata.next = -(
            rangeMin +
            CosmosMath.linear(random3.next(), 0, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 1) * (rangeMax - rangeMin)
         );
         const target = { x: pos.x + 5, y: this.metadata.next };
         this.objects[2].attach(
            new CosmosRectangle({
               fill: '#f0f',
               stroke: 'transparent',
               position: pos,
               size: { y: 1, x: pos.extentOf(target) },
               anchor: { y: 0 },
               metadata: { parent: this },
               rotation: pos.angleFrom(target) + 180
            }).on('tick', function () {
               this.position.x -= 5 / 3;
               this.position.x < 2 && timer.post().then(() => this.metadata.parent.objects[2].detach(this));
            })
         );
      }
      for (const { label, score } of this.metadata.eventQueue.splice(0, this.metadata.eventQueue.length)) {
         const displayScore = Math.floor(this.metadata.ratingsbase + score) - Math.floor(this.metadata.ratingsbase);
         this.metadata.ratingsbase += score;
         const parent = this.objects[3];
         const eventText = new CosmosText({
            fill: displayScore < 0 ? '#f00' : displayScore < 1 ? '#7f7f7f' : '#0f0',
            stroke: 'transparent',
            font: '8px DeterminationSans',
            metadata: { wobble: 4 },
            content: `${label} ${displayScore < 0 ? '' : '+'}${displayScore.toString()}`
         }).on('tick', function () {
            this.position.set((random3.next() * 2 - 1) * this.metadata.wobble, parent.objects.indexOf(eventText) * 10);
            this.metadata.wobble *= 0.6;
         });
         parent.objects.unshift(eventText);
         timer.pause(1000).then(async () => {
            await eventText.alpha.modulate(timer, 1000, 0);
            parent.detach(eventText);
         });
      }
   });
}

export function selectMTT () {
   const volatile1 = battler.volatile[1];
   const meta = volatile1.container.objects[0].metadata;
   meta.dance = false;
   meta.dancedelay = [ 25, 25, 25, 25, 25, 25, 21, 18, 15, 12, 9, 6, 3, 60, 100, 140, 180, 220, 300, 300, 300 ][
      volatile1.vars.turns
   ];
   graphMetadata.ratingsgain = 0;
}

const opponents = {
   mettaton1: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcMettatonBody,
         content.ibcMettatonBodySOUL,
         content.ibcMettatonArmsNoticard,
         content.ibcMettatonArmsThonk,
         content.ibcMettatonArmsWelcome,
         content.ibcMettatonArmsWhaaat,
         content.ibcMettatonWheel,
         content.ibcMettatonFlyawaymyroboticfriend,
         inventories.avMettaton,
         content.ibbBluelightning,
         content.avAlphys,
         content.asSmallelectroshock,
         content.ibuCyanSOUL,
         content.ibcMettatonArmsBruh,
         content.ibcMettatonArmsWhatevs,
         content.ibuCyanReticle,
         content.ibcShyrenAgent,
         content.ibcShyrenFront,
         content.ibcShyrenBack,
         content.ibcMettatonRocket,
         content.ibbNote,
         content.ibbTheMoves,
         content.ibbLightning,
         content.asUpgrade,
         content.asBomb,
         content.asDrumroll,
         content.asSingBass1,
         content.asSingBass2,
         content.asSingBad1,
         content.asSingBad2,
         content.asSingBad3,
         content.asSingTreble1,
         content.asSingTreble2,
         content.asSingTreble3,
         content.asSingTreble4,
         content.asSingTreble5,
         content.asSingTreble6,
         content.asStab
      ),
      hp: 1,
      df: 0,
      exp: 0,
      g: 0,
      name: text.b_opponent_mettaton1.name,
      acts: () =>
         save.data.n.plot < 67
            ? [
                 [ 'check', text.b_opponent_mettaton1.act_check ],
                 [ 'flirt', text.b_opponent_mettaton1.act_flirt ]
              ]
            : [
                 [ 'check', text.b_opponent_mettaton1.act_check ],
                 [ 'flirt', text.b_opponent_mettaton1.act_flirt ],
                 [ 'turn', text.b_opponent_mettaton1.act_turn ],
                 [ 'burn', text.b_opponent_mettaton1.act_burn ]
              ],
      metadata: { reactOld: true },
      handler: battler.opponentHandler({
         vars: {
            attacked: false,
            checked: false,
            flirted: false,
            turns: 0,
            turnResults: CosmosUtils.populate(9, () => 0),
            armRezo: null as CosmosAnimationResources | null,
            host: new CosmosEventHost<{ x: [number] }>(),
            async rtext (cutscene: boolean, ar: CosmosPointSimple, ...lines: string[]) {
               const OGpriority = battler.bubbles.twinkly2.priority.value;
               battler.bubbles.twinkly2.priority.value = Infinity;
               await battler.monster(cutscene, new CosmosPoint(-27.5, -70).add(ar), battler.bubbles.twinkly2, ...lines);
               battler.bubbles.twinkly2.priority.value = OGpriority;
            },
            async ltext (cutscene: boolean, al: CosmosPointSimple, ...lines: string[]) {
               await battler.monster(cutscene, new CosmosPoint(27.5, -70).add(al), battler.bubbles.twinkly, ...lines);
            },
            shyren: false,
            maddummy: false,
            totalFails: 0,
            final: { flirt: 0, burn: 0, check: 0, fight: 0, idle: 0 }
         },
         defaultTalk: [],
         bubble: pos =>
            pos.x < 100 ? [ pos.add(35, -70), battler.bubbles.twinkly ] : [ pos.add(-35, -70), battler.bubbles.twinkly2 ],
         async fight ({ volatile, vars }) {
            await battler.attack(volatile, { operation: 'none' });
            vars.attacked = true;
            return false;
         },
         preact ({ vars }) {
            vars.flirted = false;
         },
         act: {
            check ({ vars }) {
               vars.checked = true;
            },
            flirt ({ vars }) {
               vars.flirted = true;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_mettaton1.old_gun_text);
               state.talk = text.b_opponent_mettaton1.old_gun_talk;
               useOld('old_gun', state, false);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mettaton1.old_bomb_text);
               state.talk = text.b_opponent_mettaton1.old_bomb_talk;
               useOld('old_bomb', state, false);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mettaton1.old_spray_text);
               state.talk = text.b_opponent_mettaton1.old_spray_talk;
               useOld('old_spray', state, false);
            }
         },
         async postchoice (state) {
            const container = state.volatile.container;
            const quizzer = container.metadata.ar as CosmosAnimation;
            const body = container.objects[0] as CosmosAnimation;
            const quizzerBody = container.metadata.arBody as CosmosAnimation;
            const mettamover = body.metadata.mettamover as {
               wobble: CosmosValue;
               idealX: number;
               freeze: boolean;
               wobbleRate: CosmosValue;
            };
            const mdpos = { x: 50, y: 120 };
            let idle = true;
            if (state.vars.turns < 1) {
               if (state.vars.checked) {
                  if (save.data.n.plot < 67 || state.vars.final.check++ < 1) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.checkTalk);
                     idle = false;
                  }
               }
               if (state.vars.attacked) {
                  if (save.data.n.plot < 67 || state.vars.final.fight++ < 1) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.attackTalk());
                     idle = false;
                  }
               }
               if (state.vars.flirted) {
                  if (save.data.n.plot < 67) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.flirtTalk);
                  } else if (state.vars.final.flirt < 5) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.flirtTalk1,
                              text.b_opponent_mettaton1.flirtTalk2,
                              text.b_opponent_mettaton1.flirtTalk3,
                              text.b_opponent_mettaton1.flirtTalk4,
                              text.b_opponent_mettaton1.flirtTalk5
                           ][save.data.n.plot < 67 ? 0 : state.vars.final.flirt++]
                        )
                     );
                     idle = false;
                     if (save.data.n.plot < 67) {
                        save.data.b.flirt_mettaton = true;
                     } else {
                        state.vars.flirted = false;
                     }
                  }
               } else if (state.choice.type === 'act') {
                  if (state.choice.act === 'turn') {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk1);
                     body.use(content.ibcMettatonBodyBack);
                     state.vars.armRezo = content.ibcMettatonArmsWelcomeBack;
                     await timer.pause(1650);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk2);
                     body.index = 1;
                     battler.music?.stop();
                     assets.sounds.equip.instance(timer);
                     mettamover.freeze = true;
                     (body.objects[1] as CosmosSprite).disable();
                     await timer.pause(1650);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk3);
                     body.use(content.ibcMettatonBodyTransform);
                     body.enable();
                     mettamover.wobble.value = 0;
                     state.vars.armRezo = content.ibcMettatonArmsWhaaat;
                     mettamover.freeze = false;
                     mettamover.wobble.modulate(timer, 4000, 8, 8);
                     const computer = assets.sounds.computer.instance(timer);
                     await Promise.all([
                        computer.rate.modulate(timer, 5000, 3),
                        mettamover.wobbleRate.modulate(timer, 5000, 9, 9)
                     ]);
                     computer.stop();
                     assets.sounds.swing.instance(timer);
                     const fd = fader({ fill: 'white', alpha: 0, priority: 10 });
                     await fd.alpha.modulate(timer, 1000, 1);
                     await timer.pause(750);
                     assets.sounds.mus_ohyes.instance(timer);
                     await timer.pause(3000);
                     battler.alpha.value = 0;
                     battler.overlay.detach(state.volatile.container);
                     await fd.alpha.modulate(timer, 1000, 0);
                     const light1 = new CosmosAnimation({ resources: content.iooAStagelight, position: { x: -140 } });
                     const light2 = new CosmosAnimation({
                        resources: content.iooAStagelight,
                        position: { x: 140 },
                        scale: { x: -1 }
                     });
                     const lightbox = new CosmosObject({
                        position: { x: 160, y: -45 },
                        objects: [ light1, light2 ],
                        priority: -10
                     });
                     battler.overlay.attach(lightbox);
                     await lightbox.position.modulate(timer, 1650, { y: 0 });
                     assets.sounds.noise.instance(timer);
                     await timer.pause(850);
                     light1.index = 1;
                     light2.index = 1;
                     assets.sounds.noise.instance(timer);
                     state.volatile.alive = false;
                     const random3 = random.clone();
                     lightbox.attach(
                        new CosmosObject({ metadata: { gen: 0 } }).on('tick', async function () {
                           if (this.metadata.gen === 0) {
                              this.metadata.gen = 5;
                              const cloud = new CosmosSprite({
                                 anchor: { x: 0, y: 1 },
                                 frames: [ content.iooAStagecloud ],
                                 velocity: { x: (1 + random3.next() * 2) * (random3.next() < 0.5 ? 1 : -1) },
                                 acceleration: 0.9,
                                 position: { y: 120 }
                              }).on('tick', function () {
                                 this.priority.value += 1;
                              });
                              this.attach(cloud);
                              await cloud.alpha.modulate(timer, 2000, 0, 0);
                              this.detach(cloud);
                           } else {
                              this.metadata.gen--;
                           }
                        })
                     );
                     const volatile2 = battler.volatile[battler.add(opponents.mettaton2, { x: 160, y: 120 })];
                     volatile2.container.alpha.value = 0;
                     volatile2.container.objects[0].tint = 0;
                     await volatile2.container.alpha.modulate(timer, 1000, 1);
                     await timer.pause(1000);
                     const mus3 = assets.music.ohmy.instance(timer);
                     await battler.monster(
                        false,
                        { x: 160, y: 128 },
                        battler.bubbles.mtt,
                        ...text.b_opponent_mettaton1.turnTalk4
                     );
                     await fd.alpha.modulate(timer, 300, 1);
                     battler.overlay.detach(lightbox);
                     volatile2.container.objects[0].tint = 0xffffff;
                     mus3.gain.modulate(timer, 450, 0).then(() => mus3.stop());
                     assets.sounds.upgrade.instance(timer);
                     await timer.pause(300);
                     await fd.alpha.modulate(timer, 300, 0);
                     await timer.pause(1000);
                     save.flag.b.legs = true;
                     await battler.monster(
                        false,
                        { x: 160, y: 128 },
                        battler.bubbles.mtt,
                        ...text.b_opponent_mettaton1.turnTalk5
                     );
                     battler.alpha.value = 1;
                     const graph = graphGen(random3);
                     battler.overlay.attach(graph);
                     state.status = text.b_opponent_mettaton2.statusX;
                     assets.music.legsIntro.instance(timer).source.addEventListener('ended', () => {
                        battler.music = assets.music.legs.instance(timer, { offset: 6.48 });
                     });
                     battler.volatile[0].vars.graph = graph;
                     events.on('select', selectMTT);
                     return;
                  } else if (state.choice.act === 'burn' && state.vars.final.burn < 5) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.burnTalk1,
                              text.b_opponent_mettaton1.burnTalk2,
                              text.b_opponent_mettaton1.burnTalk3,
                              text.b_opponent_mettaton1.burnTalk4,
                              text.b_opponent_mettaton1.burnTalk5
                           ][state.vars.final.burn++]
                        )
                     );
                     idle = false;
                  }
               }
               if (67 <= save.data.n.plot) {
                  if (idle) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.idleTalk1,
                              text.b_opponent_mettaton1.idleTalk2,
                              text.b_opponent_mettaton1.idleTalk3,
                              text.b_opponent_mettaton1.idleTalk4,
                              text.b_opponent_mettaton1.idleTalk5,
                              text.b_opponent_mettaton1.idleTalk6
                           ][Math.min(state.vars.final.idle++, 5)]
                        )
                     );
                  }
                  await patterns.mettaton2(false, state, 0);
                  game.movement = false;
                  battler.SOUL.alpha.value = 0;
                  await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
                  return;
               }
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1);
               mettamover.idealX = 55;
               state.vars.armRezo = content.ibcMettatonArmsThonk;
               body.index = 1;
               quizzer.index = 1;
               await timer.pause(1350);
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1a1);
               body.index = 0;
               body.use(content.ibcMettatonBodySOUL);
               body.enable();
               quizzer.index = 0;
               state.vars.armRezo = content.ibcMettatonArmsNoticard;
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1a2);
               quizzer.index = save.data.n.bad_lizard < 1 ? 3 : 7;
               await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn1b1());
               quizzer.index = save.data.n.bad_lizard < 1 ? 4 : 8;
               await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn1b2());
               await battler.box.size.modulate(timer, 300, { x: 100, y: 65 });
               Object.assign(battler.SOUL.position, { x: 160, y: 160 });
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               quizzer.index = save.data.n.bad_lizard < 1 ? 4 : 7;
               await patterns.alphys1(0);
               quizzer.index = 0;
               await timer.pause(950);
               state.vars.armRezo = content.ibcMettatonArmsWelcome;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1c);
               body.reset();
               body.use(content.ibcMettatonBody);
               await timer.pause(250);
               quizzer.index = save.data.n.bad_lizard < 1 ? 8 : 15;
               await state.vars.rtext(true, quizzerBody, ...text.b_opponent_mettaton1.turn1d());
               await timer.pause(1250);
               quizzer.index = 6;
               state.vars.armRezo = content.ibcMettatonArmsNoticard;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1e);
               quizzer.index = 1;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1f);
               quizzer.index = 2;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1g);
               quizzer.index = 0;
               battler.SOUL.alpha.value = 0;
               mettamover.idealX = 160;
               state.vars.armRezo = content.ibcMettatonArmsWelcome;
               game.movement = false;
               await battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 });
               state.status = text.b_opponent_mettaton1.turn1status;
            } else {
               let skip = false;
               const host = state.vars.host;
               const amspeed = 10;
               switch (state.vars.turns) {
                  case 1:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn2);
                     mettamover.idealX = 55;
                     body.index = 4;
                     break;
                  case 2:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn3);
                     mettamover.idealX = 55;
                     body.index = 4;
                     break;
                  case 3:
                     if (state.vars.turnResults[1] < 1 && state.vars.turnResults[2] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4a2);
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(timer, amspeed, { x: 290 });
                     body.index = 4;
                     state.vars.armRezo = content.ibcMettatonArmsThonk;
                     const shytime = timer.value;
                     const shyPositionY = new CosmosValue(120);
                     const agent = new CosmosAnimation({
                        anchor: { y: 1, x: 0 },
                        resources: content.ibcShyrenAgent,
                        position: { x: -30 },
                        index: save.data.b.killed_shyren ? 1 : 0
                     }).on('tick', function () {
                        this.position.y =
                           shyPositionY.value - CosmosMath.wave(((timer.value - shytime) % 4000) / 4000) * 4;
                     });
                     const shy = new CosmosAnimation({
                        active: true,
                        anchor: { y: 1 },
                        position: { x: -19.5, y: -45 },
                        resources: save.data.b.bullied_shyren ? content.ibcShyrenBack : content.ibcShyrenFront
                     });
                     save.data.b.killed_shyren || agent.attach(shy);
                     battler.overlay.attach(agent);
                     await agent.position.step(timer, 3, { x: 55 });
                     host.on('x', x => {
                        if (x === 2) {
                           save.data.b.bullied_shyren || shy.use(content.ibcShyrenFront);
                        } else if (x === 3 && state.vars.turns === 4) {
                           shy.reset().use(content.ibcShyrenBack);
                           agent.position.step(timer, 3, { x: -30 }).then(() => {
                              battler.overlay.objects.splice(battler.overlay.objects.indexOf(agent), 1);
                           });
                        }
                     });
                     if (save.data.b.killed_shyren) {
                        skip = true;
                        await timer.pause(1650);
                        body.index = 1;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4e);
                        await timer.pause(1150);
                        await state.vars.ltext(
                           false,
                           agent.position.subtract(5, 0),
                           ...text.b_opponent_mettaton1.turn4f
                        );
                        agent.position.step(timer, 3, { x: -30 }).then(() => {
                           battler.overlay.objects.splice(battler.overlay.objects.indexOf(agent), 1);
                        });
                        await timer.pause(1000);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4g);
                        mettamover.idealX = 160;
                        quizzerBody.position.step(timer, amspeed, { x: 265 });
                        body.index = 3;
                        state.vars.armRezo = content.ibcMettatonArmsWhatevs;
                        await timer.pause(850);
                        mettamover.wobble.modulate(timer, 1000, 1, 1);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4h);
                        quizzer.index = 2;
                        const OGgain = battler.music?.gain.value ?? 0;
                        await battler.music?.gain.modulate(timer, 0, 0);
                        await timer.pause(4500);
                        body.index = 0;
                        state.vars.armRezo = content.ibcMettatonArmsWelcome;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4i);
                        battler.music?.gain.modulate(timer, 1000, OGgain, OGgain);
                        await timer.pause(450);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4j);
                        mettamover.wobble.modulate(timer, 1000, 3, 3);
                        quizzer.index = 0;
                     } else {
                        body.index = 4;
                        state.vars.shyren = true;
                     }
                     break;
                  case 4:
                     if (state.vars.turnResults[3] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn5a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn5a2());
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(timer, amspeed, { x: 290 });
                     break;
                  case 5:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn6);
                     mettamover.idealX = 55;
                     break;
                  case 6:
                     await Promise.all([
                        state.vars.turns === 6 && save.data.n.state_foundry_maddummy !== 1
                           ? battler.load(commonGroups.maddummy)
                           : void 0,
                        state.dialogue(false, ...text.b_opponent_mettaton1.turn7a)
                     ]);
                     mettamover.idealX = 235;
                     quizzerBody.position.step(timer, amspeed, { x: 290 });
                     if (save.data.n.state_foundry_maddummy === 1) {
                        skip = true;
                        await timer.pause(2250);
                        body.index = 1;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn7n);
                        await timer.pause(3350);
                        if (save.data.b.killed_shyren) {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7o2);
                        } else {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7o1);
                        }
                     } else {
                        const target = battler.add(commonOpponents.maddummy, { x: -20, y: 100 });
                        const volatyle = battler.volatile[target];
                        volatyle.alive = false;
                        const obj = volatyle.container;
                        const MDM = obj.objects[0].metadata as MadDummyMetadata;
                        volatyle.vars.face = 4;
                        MDM.speed = 1;
                        MDM.multiplier = 0.5;
                        await obj.position.step(timer, 4, { x: 55 });
                        await timer.pause(850);
                        if (save.data.b.toriel_phone) {
                           volatyle.vars.face = 8;
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7h);
                           await timer.pause(1250);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7i);
                           volatyle.vars.face = 7;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7j1);
                           volatyle.vars.face = 6;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7j2);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7k);
                           volatyle.vars.face = 2;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l1);
                           volatyle.vars.face = 6;
                           await timer.pause(650);
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l2);
                           volatyle.vars.face = 8;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l3);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7m);
                        } else {
                           volatyle.vars.face = 0;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b1);
                           MDM.speed = 2.3;
                           MDM.multiplier = 1;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b2);
                           volatyle.vars.face = 3;
                           MDM.speed = 2.6;
                           MDM.multiplier = 3;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b3);
                           await timer.pause(1250);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7c);
                           volatyle.vars.face = 2;
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7d1);
                           volatyle.vars.face = 5;
                           MDM.speed = 2.6;
                           MDM.multiplier = 4;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7d2);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7e);
                           await timer.pause(650);
                           volatyle.vars.face = 7;
                           MDM.speed = 1.65;
                           MDM.multiplier = 1;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7f);
                           await timer.pause(850);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7g1);
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7g2);
                           volatyle.vars.face = 0;
                        }
                        host.on('x', x => {
                           x === 3 && obj.position.step(timer, 4, { x: -20 }).then(() => (obj.alpha.value = 0));
                        });
                        state.vars.maddummy = true;
                     }
                     break;
                  case 7:
                     if (state.vars.turnResults[6] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8a2);
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(timer, amspeed, { x: 290 });
                     break;
                  case 8:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9a);
                     quizzer.index = 9;
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9b());
                     quizzer.index = save.data.n.bad_lizard < 1 ? 11 : 4;
                     mettamover.idealX = 55;
                     break;
               }
               if (skip) {
                  if (state.vars.turns === 3) {
                     state.status = text.b_opponent_mettaton1.turn4statusX;
                     state.vars.turns = 4;
                  } else if (state.vars.turns === 6) {
                     state.status = text.b_opponent_mettaton1.turn7statusX;
                     state.vars.turns = 7;
                  }
                  state.vars.turnResults[state.vars.turns] = 0;
               } else {
                  state.vars.armRezo = content.ibcMettatonArmsThonk;
                  await battler.box.size.modulate(timer, 300, { x: 100, y: 65 });
                  await Promise.all([
                     battler.box.size.modulate(timer, 300, { y: state.vars.turns === 8 ? 100 : 120, x: 100 }),
                     battler.box.position.modulate(timer, CosmosMath.linear, 300, { x: 160, y: 120 }),
                     battler.box.rotation.modulate(timer, 300, 0)
                  ]);
                  battler.SOUL.position.set(battler.box);
                  battler.SOUL.alpha.value = 1;
                  game.movement = true;
                  host.fire('x', 1);
                  const [ score, fails ] = await patterns.mettaton1(
                     state.vars.turns - 1,
                     state.vars.shyren,
                     state.vars.maddummy,
                     quizzer,
                     state.vars.totalFails,
                     state.vars.turns === 8
                        ? async (e: number) => {
                             if (e === 2) {
                                quizzerBody.metadata.noshake = true;
                             }
                             await state.vars.rtext(
                                true,
                                quizzerBody,
                                ...[
                                   text.b_opponent_mettaton1.turn9c,
                                   text.b_opponent_mettaton1.turn9d,
                                   text.b_opponent_mettaton1.turn9e()
                                ][e]
                             );
                          }
                        : void 0
                  );
                  battler.alive.length > 1 && (battler.alive[1].vars.face = 0);
                  state.vars.totalFails += fails;
                  host.fire('x', 2);
                  game.movement = false;
                  battler.SOUL.alpha.value = 0;
                  await Promise.all([
                     battler.box.size.modulate(timer, 300, { y: 65, x: 100 }),
                     battler.box.position.modulate(timer, CosmosMath.linear, 300, { x: 160, y: 192.5 - 65 / 2 }),
                     battler.box.rotation.modulate(timer, 300, 0)
                  ]);
                  if (state.vars.turns < 8) {
                     await state.dialogue(
                        false,
                        ...[
                           [ text.b_opponent_mettaton1.turn2react1, text.b_opponent_mettaton1.turn2react2 ],
                           [ text.b_opponent_mettaton1.turn3react1, text.b_opponent_mettaton1.turn3react2 ],
                           [ text.b_opponent_mettaton1.turn4react1, text.b_opponent_mettaton1.turn4react2 ],
                           [ text.b_opponent_mettaton1.turn5react1, text.b_opponent_mettaton1.turn5react2 ],
                           [ text.b_opponent_mettaton1.turn6react1, text.b_opponent_mettaton1.turn6react2 ],
                           [ text.b_opponent_mettaton1.turn7react1, text.b_opponent_mettaton1.turn7react2 ],
                           [ text.b_opponent_mettaton1.turn8react1, text.b_opponent_mettaton1.turn8react2 ]
                        ][state.vars.turns - 1][score]
                     );
                     state.vars.turnResults[state.vars.turns] = score;
                  } else {
                     await timer.pause(1000);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end1);
                     speech.emoters.alphys = quizzer;
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9end2());
                  }
                  quizzer.metadata.thumbsup = false;
                  quizzer.index = 0;
                  if (state.vars.turns === 4) {
                     state.vars.shyren = false;
                     await timer.pause(450);
                     host.fire('x', 3);
                     await timer.pause(850);
                     mettamover.idealX = 160;
                     quizzerBody.position.step(timer, amspeed, { x: 265 });
                     await timer.pause(1250);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn5end1());
                     state.vars.armRezo = content.ibcMettatonArmsNoticard;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn5end2);
                     state.vars.armRezo = content.ibcMettatonArmsWelcome;
                  } else if (state.vars.turns === 7) {
                     state.vars.maddummy = false;
                     await timer.pause(450);
                     if (save.data.b.toriel_phone) {
                        if (score === 0) {
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD1a);
                        } else {
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD1b);
                        }
                     } else if (score === 0) {
                        await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD2a);
                     } else {
                        await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD2b);
                     }
                     const aggregate = state.vars.turnResults[6] + state.vars.turnResults[7] + score;
                     await timer.pause(450);
                     host.fire('x', 3);
                     await timer.pause(500);
                     mettamover.idealX = 160;
                     quizzerBody.position.step(timer, amspeed, { x: 265 });
                     await timer.pause(450);
                     const lastAggregate =
                        state.vars.turnResults[1] +
                        state.vars.turnResults[2] +
                        state.vars.turnResults[3] +
                        state.vars.turnResults[4];
                     if (aggregate < 2) {
                        if (lastAggregate < 3) {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end1a);
                        } else {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end1b);
                        }
                     } else if (lastAggregate < 3) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end3a);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end3b);
                     }
                     state.vars.armRezo = content.ibcMettatonArmsNoticard;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end4);
                     state.vars.armRezo = content.ibcMettatonArmsWelcome;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end5);
                     assets.sounds.drumroll.instance(timer);
                     await timer.pause(1950);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end6);
                     quizzer.index = 9;
                     const pos = quizzerBody.position.clone();
                     const shaker = () => {
                        if (quizzerBody.metadata.noshake) {
                           quizzerBody.position.set(pos);
                           quizzerBody.off('tick', shaker);
                        } else {
                           quizzerBody.position.set(pos.add(Math.random() - 0.5, Math.random() - 0.5));
                        }
                     };
                     quizzerBody.on('tick', shaker);
                  }
                  if (mettamover.idealX !== 160) {
                     mettamover.idealX = 160;
                     quizzerBody.position.step(timer, amspeed, { x: 265 });
                  }
                  body.index = 0;
                  state.vars.armRezo = content.ibcMettatonArmsWelcome;
                  await battler.box.size.modulate(timer, 300, { x: 282.5 });
                  if (state.vars.turns < 8) {
                     state.status = [
                        text.b_opponent_mettaton1.turn1status,
                        text.b_opponent_mettaton1.turn2status,
                        text.b_opponent_mettaton1.turn3status,
                        text.b_opponent_mettaton1.turn4status,
                        text.b_opponent_mettaton1.turn5status,
                        text.b_opponent_mettaton1.turn6status,
                        text.b_opponent_mettaton1.turn7status,
                        text.b_opponent_mettaton1.turn8status
                     ][state.vars.turns];
                  } else {
                     /*
                     await timer.pause(1500);
                     quizzer.metadata.noshake = true;
                     speech.emoters.alphys = quizzer;
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton.turn10e());
                     */
                     await timer.pause(850);
                     state.vars.armRezo = content.ibcMettatonArmsThonk;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end3);
                     state.vars.armRezo = content.ibcMettatonArmsWhatevs;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end4);
                     state.vars.armRezo = content.ibcMettatonArmsNoticard;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end5);
                     state.vars.armRezo = content.ibcMettatonArmsWelcome;
                     await timer.pause(1000);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end6);
                     delete speech.emoters.alphys;
                     await mettamover.wobble.modulate(timer, 600, 0);
                     body.alpha.value = 0;
                     const anim = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        scale: 1.15,
                        position: container.position.add(0, 24 - 15),
                        resources: content.ibcMettatonFlyawaymyroboticfriend
                     });
                     battler.overlay.attach(anim);
                     await timer.when(() => anim.index === 5);
                     anim.use(content.ibcMettatonRocket);
                     anim.y += 18;
                     const bpos = anim.position.clone();
                     const sh = new CosmosValue(0);
                     const shaker = () => {
                        anim.position.set(
                           bpos.add(new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(sh.value))
                        );
                     };
                     anim.on('tick', shaker);
                     await sh.modulate(timer, 1000, 1, 1);
                     await bpos.modulate(timer, 1500, bpos.value(), { y: 0 });
                     battler.overlay.objects.splice(battler.overlay.objects.indexOf(anim), 1);
                     await timer.pause(650);
                     await quizzerBody.position.step(timer, 3, { x: 160 });
                     await timer.pause(850);
                     quizzer.index = 8;
                     battler.music?.stop();
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9end7);
                     events.fire('exit');
                     state.volatile.alive = false;
                     save.data.n.state_aerialis_talentfails = state.vars.totalFails;
                  }
               }
            }
         },
         async poststatus (state) {
            save.data.n.plot < 67 && state.vars.turns++;
         }
      }),
      sprite (volatile) {
         let time = timer.value;
         const originX = volatile.container.position.x;
         const mettamover = {
            wobble: new CosmosValue(3),
            idealX: 160,
            freeze: false,
            wobbleRate: new CosmosValue()
         };
         function hugoFactor () {
            return mettamover.idealX - volatile.container.x;
         }
         volatile.container.on('tick', function () {
            this.velocity.x = (this.velocity.x + hugoFactor()) / 2;
         });
         const body = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcMettatonBody,
            metadata: { mettamover },
            scale: 1.15,
            objects: [
               new CosmosSprite({ frames: [ content.ibcMettatonWheel ], anchor: 0 }).on('tick', function () {
                  const posX = volatile.container.position.x + body.position.x;
                  this.rotation.value = -body.rotation.value + 360 * ((posX - originX) / 30);
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: 2.5, y: 8 },
                  resources: content.ibcMettatonArmsWelcome
               }).on('tick', function () {
                  if (!mettamover.freeze) {
                     const hv = mettamover.wobble.value / 2;
                     this.position.y = sineWaver(time, 900, 10.5 - hv, 10.5 + hv);
                  }
                  if (volatile.vars.armRezo) {
                     this.use(volatile.vars.armRezo);
                     volatile.vars.armRezo = null;
                  }
               })
            ]
         }).on('tick', function () {
            if (!mettamover.freeze) {
               const wv = mettamover.wobble.value;
               const v = sineWaver(time, 700, -wv, wv);
               this.position.x = v;
               this.rotation.value = -v - volatile.container.velocity.x / 4;
            }
            if (mettamover.freeze || mettamover.wobbleRate.value > 0) {
               time += (100 / 3) * mettamover.wobbleRate.value;
            }
            if (typeof volatile.vars.scrIndex === 'number') {
               this.index = volatile.vars.scrIndex;
               volatile.vars.scrIndex = null;
            }
            if (volatile.vars.screenRezo) {
               this.use(volatile.vars.screenRezo);
               volatile.vars.screenRezo = null;
            }
         });
         return body;
      }
   }),
   mettaton2: new OutertaleOpponent({
      hp: 20000,
      df: 0,
      exp: 2000,
      g: 0,
      name: text.b_opponent_mettaton2.name,
      acts: () =>
         world.genocide
            ? [ [ 'check', [] ] ]
            : [
                 [ 'check', [] ],
                 [ 'pose', [] ], // dramatic pose, more effective on high hp
                 [ 'heel', [] ], // heel turn, audience wants u to get hit
                 [ 'boast', [] ], // say you wont get hit
                 [ 'scream', [] ], // scream, raise audience hype but soul moves slower
                 [ 'flirt', [] ] // flirt, audience reacts differently based on
              ],
      ghost: true,
      dramatic: true,
      metadata: { reactSpanner: true, reactArtifact: true, reactTVM: true, reactOld: true },
      handler: battler.opponentHandler({
         vars: {
            turns: -1,
            items: [] as string[],
            fighto: 0,
            fightprimer: false,
            ap: 0,
            neoTurns: 0,
            boast: { hit: false, origin: 0, value: false },
            villian: { hit: false, value: false },
            spanner: false,
            artifact: false,
            ratings,
            hurtListener () {
               const vars = battler.target.vars;
               save.data.b.a_state_hapstablook && save.data.n.hp < 1 && (save.data.n.hp = 1);
               if (vars.boast.value) {
                  if (vars.boast.hit) {
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast2,
                        (vars.boast.origin - graphMetadata.ratingsbase) / 8
                     );
                  } else {
                     vars.boast.hit = true;
                     graphMetadata.ratingsgain = 0;
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast1,
                        (vars.boast.origin - graphMetadata.ratingsbase) / 2
                     );
                  }
               } else if (vars.villian.value) {
                  if (vars.villian.hit) {
                     ratings(text.b_opponent_mettaton2.ratings.heel2, save.data.b.a_state_hapstablook ? 30 : 40);
                  } else {
                     vars.villian.hit = true;
                     ratings(text.b_opponent_mettaton2.ratings.heel1, save.data.b.a_state_hapstablook ? 60 : 80);
                  }
               } else {
                  ratings(text.b_opponent_mettaton2.ratings.hurt, 10);
               }
            }
         },
         defaultTalk: ({ vars }) =>
            world.genocide
               ? []
               : [
                    () => [],
                    text.b_opponent_mettaton2.turnTalk1,
                    text.b_opponent_mettaton2.turnTalk2,
                    text.b_opponent_mettaton2.turnTalk3,
                    text.b_opponent_mettaton2.turnTalk4,
                    text.b_opponent_mettaton2.turnTalk5,
                    text.b_opponent_mettaton2.turnTalk6,
                    text.b_opponent_mettaton2.turnTalk7,
                    text.b_opponent_mettaton2.turnTalk8,
                    text.b_opponent_mettaton2.turnTalk9,
                    text.b_opponent_mettaton2.turnTalk10,
                    text.b_opponent_mettaton2.turnTalk11,
                    text.b_opponent_mettaton2.turnTalk12,
                    text.b_opponent_mettaton2.turnTalk13,
                    text.b_opponent_mettaton2.turnTalk14,
                    text.b_opponent_mettaton2.turnTalk15,
                    text.b_opponent_mettaton2.turnTalk16,
                    text.b_opponent_mettaton2.turnTalk17,
                    text.b_opponent_mettaton2.turnTalk18,
                    text.b_opponent_mettaton2.turnTalk19,
                    text.b_opponent_mettaton2.turnTalk20
                 ][++vars.turns](),
         defaultStatus: text.b_opponent_mettaton2.statusX,
         bubble: () => [
            world.genocide
               ? { x: 180, y: 25 }
               : { x: 195, y: battler.volatile[1].container.objects[0].metadata.hideLegs ? 60 : 30 },
            battler.bubbles.twinkly
         ],
         async fight ({ volatile, choice, vars, dialogue }) {
            const spr = volatile.container.objects[0];
            const power =
               battler.calculate(volatile, (choice as OutertaleChoice & { type: 'fight' }).score) * vars.ap * 30;
            if (power > 0) {
               spr.index = volatile.hp < volatile.opponent.hp / 4 ? 5 : 3;
               spr.metadata.freeze = true;
               volatile.opponent.ghost = false;
            } else {
               world.genocide && (spr.index = 4);
               const n = assets.sounds.node.instance(timer);
               n.rate.value = 0.867;
               n.gain.value *= 0.7;
            }
            if (world.genocide) {
               spr.metadata.ap = vars.ap;
               if (volatile.hp > power) {
                  spr.metadata.hit = timer.value;
               } else {
                  spr.metadata.dead = true;
                  spr.metadata.hideWings = true;
                  save.flag.n.genocide_milestone = Math.max(4, save.flag.n.genocide_milestone) as 4;
                  battler.music?.stop();
                  spr.index = 8;
                  volatile.container.metadata.ti.metadata.re();
               }
            } else {
               ratings(text.b_opponent_mettaton2.ratings.hurt, 100);
            }
            const result = await battler.attack(volatile, { operation: 'add', power: power * -1 }, true, true);
            if (result) {
               await timer.pause(1600);
               spr.metadata.hit = timer.value;
               spr.metadata.dead = false;
               await timer.pause(2400);
               await spr.position.modulate(timer, 1200, { x: spr.x - 30 });
               const snb = spr.metadata.shakenbake as CosmosValue;
               snb.modulate(timer, 500, 1, 1, 1, 1);
               speech.emoters.mettaton = spr;
               await dialogue(false, ...text.b_opponent_mettaton2.mettahero1);
               await timer.pause(1600);
               snb.value = 0;
               await dialogue(false, ...text.b_opponent_mettaton2.mettahero2);
               spr.metadata.hit = timer.value - 1150;
               const fd = new CosmosRectangle({ alpha: 0, fill: 'white', size: { x: 320, y: 240 }, priority: 1 }).on(
                  'tick',
                  function () {
                     spr.metadata.hit = Math.min(spr.metadata.hit + (100 / 3) * 4, timer.value);
                  }
               );
               renderer.attach('menu', fd);
               snb.modulate(timer, 600, 4, 4);
               await timer.pause(300);
               assets.sounds.boom.instance(timer);
               await fd.alpha.modulate(timer, 300, 1);
               await timer.pause(3000);
               spr.alpha.value = 0;
               fd.alpha.modulate(timer, 3000, 0).then(() => renderer.detach('menu', fd));
               const napstaSprite = new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  resources: content.ibcNapstablookLookdown,
                  metadata: { time: timer.value, blookyPositionY: new CosmosValue() }
               }).on('tick', function () {
                  this.position.y =
                     this.metadata.blookyPositionY.value -
                     CosmosMath.wave(((timer.value - this.metadata.time) % 4000) / 4000) * 4;
               });
               const napstaContainer = new CosmosObject({ position: { x: 160, y: 0 }, objects: [ napstaSprite ] });
               renderer.attach('menu', napstaContainer);
               await napstaContainer.position.modulate(timer, 1500, { y: 120 });
               await battler.monster(
                  false,
                  { x: 195, y: 41 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_mettaton2.napstahero1
               );
               await timer.pause(1600);
               napstaSprite.use(content.ibcNapstablookLookforward);
               await timer.pause(2000);
               await battler.monster(
                  false,
                  { x: 195, y: 41 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_mettaton2.napstahero2
               );
               napstaSprite.use(content.ibcNapstablookLookdeath);
               battler.volatile.push({
                  alive: false,
                  container: napstaContainer as OutertaleVolatile['container'],
                  dead: false,
                  opponent: new OutertaleOpponent({
                     assets: new CosmosInventory(),
                     exp: 0,
                     hp: 1,
                     df: 0,
                     sparable: false,
                     dramatic: true,
                     name: '',
                     acts: [],
                     sprite: () =>
                        new CosmosSprite({
                           anchor: { x: 0, y: 1 },
                           metadata: { size: { y: 93 } },
                           position: { x: 160, y: 125 }
                        })
                  }),
                  hp: 1,
                  sparable: false,
                  vars: {}
               });
               shake(2, 700);
               await battler.attack(battler.volatile[1], { power: -42, operation: 'add' }, false, true);
               await timer.pause(300);
               const goatbro = new CosmosAnimation({
                  alpha: 0,
                  anchor: { x: 0, y: 1 },
                  position: { x: 160, y: 120 },
                  resources: content.ibcAsrielCutscene2
               });
               renderer.attach('menu', goatbro);
               await goatbro.alpha.modulate(timer, 1000, 1);
               await timer.pause(600);
               save.flag.n.ga_asrielNapstakill < 1 && header('x1').then(() => (goatbro.index = 1));
               await battler.monster(
                  false,
                  { x: 185, y: 45 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_mettaton2.napstahero3()
               );
               battler.garbage.push([ 'menu', napstaContainer ], [ 'menu', goatbro ]);
               events.fire('victory');
            } else if (world.genocide) {
               spr.index = volatile.hp < 1000 ? 2 : volatile.hp < volatile.opponent.hp / 4 ? 1 : 0;
               spr.metadata.freeze = false;
               volatile.opponent.ghost = true;
            }
            return result;
         },
         pretalk ({ volatile }) {
            speech.emoters.mettaton = volatile.container.objects[0].objects[6] as CosmosSprite;
         },
         async preitem (state, item) {
            const info = items.of(item);
            if (info.type === 'armor' || info.type === 'weapon') {
               if (state.vars.items.includes(item)) {
                  ratings(text.b_opponent_mettaton2.ratings.item.repeat, -25);
               } else {
                  ratings(text.b_opponent_mettaton2.ratings.item.armor, (info.sell1 ?? 50) + (info.sell2 ?? 50));
                  state.vars.items.push(item);
               }
            } else if ([ 'starfait_x', 'legendary_hero_x', 'glamburger_x', 'face_steak_x' ].includes(item)) {
               ratings(text.b_opponent_mettaton2.ratings.item.pain, 25);
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_mettaton2.old_gun_text());
               useOld('old_gun', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_gun, 100);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mettaton2.old_bomb_text());
               useOld('old_bomb', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_bomb, 100);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mettaton2.old_spray_text());
               useOld('old_spray', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_spray, 100);
            },
            async spanner (state) {
               await battler.human(...text.b_opponent_mettaton2.spannerReaction(state.vars.spanner));
               if (world.genocide) {
                  save.storage.inventory.remove('spanner');
               } else if (state.vars.spanner) {
                  ratings(text.b_opponent_mettaton2.ratings.item.repeat, -10);
               } else {
                  state.vars.spanner = true;
                  ratings(text.b_opponent_mettaton2.ratings.item.spanner, 100);
               }
            },
            async artifact (state) {
               await battler.human(...text.b_opponent_mettaton2.artifactReaction(state.vars.artifact));
               if (state.vars.artifact) {
                  ratings(text.b_opponent_mettaton2.ratings.item.artifact2, 50);
               } else {
                  state.vars.artifact = true;
                  ratings(text.b_opponent_mettaton2.ratings.item.artifact1, 100);
               }
            },
            async tvm_radio () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.radio);
                  save.storage.inventory.remove('tvm_radio');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_mewmew, 100);
               }
            },
            async tvm_fireworks () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.fireworks);
                  save.storage.inventory.remove('tvm_fireworks');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_mewmew, 200);
               }
            },
            async tvm_mewmew () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.mewmew);
                  save.storage.inventory.remove('tvm_mewmew');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_mewmew, 300);
               }
            }
         },
         async poststatus (state) {
            const { vars, dialogue, volatile } = state;
            if (battler.alive.length > 0) {
               state.vars.boast.value && (graphMetadata.ratingsgain = 0.8);
               events.on('hurt', vars.hurtListener);
               await patterns.mettaton2(true, state, vars.turns);
               if (state.vars.boast.value) {
                  state.vars.boast.value = false;
                  if (state.vars.boast.hit) {
                     state.vars.boast.hit = false;
                  } else {
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast3,
                        graphMetadata.ratingsbase - state.vars.boast.origin
                     );
                  }
               } else if (state.vars.villian.value) {
                  state.vars.villian.value = false;
                  if (state.vars.villian.hit) {
                     state.vars.villian.hit = false;
                  } else {
                     ratings(text.b_opponent_mettaton2.ratings.heel3, save.data.b.a_state_hapstablook ? -120 : -160);
                  }
               }
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               events.off('hurt', vars.hurtListener);
               const container = state.volatile.container;
               const spr = container.objects[0];
               switch (vars.turns) {
                  case 19:
                     spr.metadata.tickSpeed.modulate(timer, 1000, 0.7);
                     battler.music?.rate.modulate(timer, 1000, 0.7);
                     break;
                  case 20:
                     spr.metadata.tickSpeed.modulate(timer, 2000, 0).then(() => {
                        spr.metadata.doTick = false;
                     });
                     battler.music?.rate.modulate(timer, 2000, 0).then(() => {
                        battler.music!.stop();
                     });
                     const graph = battler.volatile[0].vars.graph as CosmosObject;
                     graph.alpha.modulate(timer, 1000, 0).then(() => {
                        battler.overlay.detach(graph);
                     });
                     break;
               }
               await Promise.all([
                  battler.box.position.modulate(timer, CosmosMath.linear, 300, 160),
                  battler.box.size.modulate(timer, 300, { x: 282.5, y: 65 })
               ]);
               if (vars.turns === 20) {
                  events.off('select', selectMTT);
                  await timer.pause(1200);
                  const [ leftLeg, rightLeg, leftArm, rightArm ] = spr.objects as CosmosAnimation[];
                  let sfx = false;
                  if (!spr.metadata.hideArms) {
                     sfx = true;
                     spr.metadata.hideArms = true;
                     leftArm.gravity.set(90, 0.25);
                     leftArm.spin.value = 1;
                     leftArm.priority.value = -10;
                     rightArm.gravity.set(90, 0.25);
                     rightArm.spin.value = -1;
                     rightArm.priority.value = -10;
                  }
                  if (!spr.metadata.hideLegs) {
                     sfx = true;
                     spr.metadata.hideLegs = true;
                     leftLeg.gravity.set(90, 0.25);
                     leftLeg.spin.value = 1;
                     rightLeg.gravity.set(90, 0.25);
                     rightLeg.spin.value = -1;
                  }
                  if (sfx) {
                     assets.sounds.noise.instance(timer);
                     await timer.pause(300);
                     assets.sounds.boom.instance(timer);
                     await timer.pause(2000);
                  } else {
                     await timer.pause(1000);
                  }
                  await dialogue(false, ...text.b_opponent_mettaton2.turnTalk21());
                  const fans = assets.music.forthefans.instance(timer);
                  await timer.pause(500);
                  assets.sounds.phone.instance(timer);
                  await battler.monster(
                     false,
                     { x: 250, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec1()
                  );
                  await dialogue(false, ...text.b_opponent_mettaton2.audienceRec2);
                  assets.sounds.phone.instance(timer);
                  await battler.monster(
                     false,
                     { x: 240, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3a
                  );
                  assets.sounds.phone.instance(timer);
                  await battler.monster(
                     false,
                     { x: 260, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3b
                  );
                  assets.sounds.phone.instance(timer);
                  await battler.monster(
                     false,
                     { x: 250, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3c
                  );
                  await timer.pause(1600);
                  fans.gain.modulate(timer, 2000, 0).then(() => fans.stop());
                  await dialogue(false, ...text.b_opponent_mettaton2.audienceRec4);
                  volatile.alive = false;
                  events.fire('exit');
               } else {
                  volatile.container.objects[0].metadata.dance = true;
                  graphMetadata.ratingsgain = ratingsgain;
               }
            }
         },
         act: {
            async check () {
               await battler.human(...text.b_opponent_mettaton2.act_check());
            },
            async pose () {
               await battler.human(
                  ...(save.data.n.hp > calcHP() / 2
                     ? text.b_opponent_mettaton2.act_pose1
                     : save.data.n.hp > calcHP() / 4
                     ? text.b_opponent_mettaton2.act_pose2
                     : save.data.n.hp > 3
                     ? text.b_opponent_mettaton2.act_pose3
                     : text.b_opponent_mettaton2.act_pose4)
               );
               const level =
                  save.data.n.hp > calcHP() / 2 ? 0 : save.data.n.hp > calcHP() / 4 ? 1 : save.data.n.hp > 3 ? 2 : 3;
               ratings(
                  [
                     text.b_opponent_mettaton2.ratings.pose1,
                     text.b_opponent_mettaton2.ratings.pose2,
                     text.b_opponent_mettaton2.ratings.pose3,
                     text.b_opponent_mettaton2.ratings.pose4
                  ][level],
                  [ 25, 50, 100, 200 ][level]
               );
            },
            async flirt () {
               await battler.human(
                  ...(world.flirt < 10
                     ? text.b_opponent_mettaton2.act_flirt1
                     : world.flirt < 15
                     ? text.b_opponent_mettaton2.act_flirt2
                     : world.flirt < 20
                     ? text.b_opponent_mettaton2.act_flirt3
                     : text.b_opponent_mettaton2.act_flirt4)
               );
               const level = world.flirt < 10 ? 0 : world.flirt < 15 ? 1 : world.flirt < 20 ? 2 : 3;
               ratings(
                  [
                     text.b_opponent_mettaton2.ratings.flirt1,
                     text.b_opponent_mettaton2.ratings.flirt2,
                     text.b_opponent_mettaton2.ratings.flirt3,
                     text.b_opponent_mettaton2.ratings.flirt4
                  ][level],
                  [ 20, 40, 80, 160 ][level]
               );
            },
            async boast (state) {
               await battler.human(...text.b_opponent_mettaton2.act_boast);
               state.vars.boast.value = true;
               state.vars.boast.origin = graphMetadata.ratingsbase;
            },
            async heel (state) {
               await battler.human(...text.b_opponent_mettaton2.act_heel);
               state.vars.villian.value = true;
            },
            async scream () {
               await battler.human(...text.b_opponent_mettaton2.act_scream);
               ratings(text.b_opponent_mettaton2.ratings.scream, 10 + random.next() * 90);
               battler.stat.speed.modifiers.push([ 'multiply', 0.75, 1 ]);
            }
         }
      }),
      sprite () {
         const { abs, sin } = Math;
         function display (
            sprite: CosmosSprite,
            index: number,
            x: number,
            y: number,
            sx: number = 2,
            sy: number = 2,
            r: number = 0,
            a: number = 1
         ) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x / 2, (y - 240) / 2);
            sprite.scale.set(sx / 2, sy / 2);
            sprite.rotation.value = -r;
            sprite.alpha.value = a;
         }
         if (world.genocide) {
            const wing1 = new CosmosSprite({
               offsets: [ { y: 33.5 } ],
               frames: [ content.ibcMettatonNeoWings ]
            });
            const wing2 = new CosmosSprite({
               offsets: [ { y: 33.5 } ],
               frames: [ content.ibcMettatonNeoWings ]
            });
            const legs = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.ibcMettatonNeoLegs ],
               offsets: [ { y: 30 } ]
            });
            const arm1 = new CosmosSprite({
               anchor: { x: 0 },
               frames: [ content.ibcMettatonNeoArm2 ],
               offsets: [ { x: 32, y: 32 } ]
            });
            const arm2 = new CosmosSprite({
               anchor: { x: 0 },
               frames: [ content.ibcMettatonNeoArm1 ],
               offsets: [ { x: -32, y: 32 } ]
            });
            const body = new CosmosAnimation({
               anchor: { x: 0 },
               resources: content.ibcMettatonNeoBody
            });
            const head = new CosmosAnimation({
               anchor: { x: 0 },
               resources: content.ibcMettatonNeoHead,
               offsets: [ { y: 14.5 } ]
            });
            return new CosmosSprite({
               tint: 0xffffff,
               anchor: { y: 1 },
               metadata: {
                  ap: 0,
                  ticks: 0,
                  freeze: false,
                  shakenbake: new CosmosValue(),
                  size: { y: 100 },
                  hit: -Infinity,
                  dead: false,
                  hideWings: false,
                  bodyActive: false,
                  tintmatrix: CosmosBitmap.hex2color(0xff007f)
               },
               area: renderer.area,
               objects: [ wing1, wing2, legs, arm1, arm2, body, head ],
               filters: [
                  new OutlineFilter(1, 0xff007f, 1, 1),
                  new DropShadowFilter({ quality: 1, blur: 1, color: 0xff007f, alpha: 0, offset: { x: 0, y: 0 } }),
                  new ZoomBlurFilter({ strength: 0, radius: 250, innerRadius: 0, center: [ 320, 120 ] })
               ]
            }).on('tick', async function () {
               const { x, y } = this;
               const { freeze, ticks, dead, bodyActive } = this.metadata;
               freeze || this.metadata.ticks++;
               dead && (this.metadata.ticks = 0);
               const snbv = this.metadata.shakenbake.value;
               snbv > 0 && this.offsets[0].set((Math.random() * 2 - 1) * snbv, (Math.random() * 2 - 1) * snbv);
               if (bodyActive) {
                  body.reverse = false;
                  body.index < 5 ? body.enable() : body.disable();
               } else {
                  body.reverse = true;
                  body.index > 0 ? body.enable() : body.disable();
               }
               display(
                  wing1,
                  0,
                  x - 26,
                  y + 18 + sin(ticks / 3) * 1,
                  -2,
                  2,
                  sin(ticks / 6) * 2,
                  this.metadata.hideWings ? 0 : abs(sin(ticks * 0.3)) * 0.5 + 0.4
               );
               display(
                  wing2,
                  0,
                  x + 26,
                  y + 18 + sin(ticks / 3) * 1,
                  2,
                  2,
                  -sin(ticks / 6) * 2,
                  this.metadata.hideWings ? 0 : abs(sin(ticks * 0.3)) * 0.5 + 0.4
               );
               display(legs, 0, x, y + 84 + 112, 2, 2 - sin(ticks / 3) * 0.05, 0, 1);
               display(arm1, 0, x + 26 + sin(ticks / 3) * 2, y + 40, 2, 2, sin(ticks / 6) * 2, 1);
               display(arm2, 0, x - 26 - sin(ticks / 3) * 2, y + 40, 2, 2, -sin(ticks / 6) * 2, 1);
               display(body, body.index || 0, x, y + 36 + sin(ticks / 3) * 2, 2, 2, 0, 1);
               display(head, this.index, x, y + sin(ticks / 3) * 3, 2, 2, 0, 1);
               const timephase = dead
                  ? 1
                  : 1 -
                    Math.min(
                       Math.max((timer.value - this.metadata.hit) / CosmosMath.remap(this.metadata.ap, 300, 1200), 0),
                       1
                    );
               this.tint = CosmosBitmap.color2hex(
                  this.metadata.tintmatrix.map(x => CosmosMath.remap(timephase, 255, x)) as CosmosColor
               );
               (this.filters![0] as OutlineFilter).alpha = timephase;
               const shad = this.filters![1] as DropShadowFilter;
               shad.alpha = timephase;
               shad.blur = timephase * 2;
            });
         } else {
            const legOffsets = [ 42, 12, 65, 33, 47 ];
            const body = new CosmosAnimation({
               resources: content.ibcMettatonExBody,
               anchor: { x: 0 },
               offsets: [ { y: 20 } ]
            });
            const bodyHeart = new CosmosAnimation({
               resources: content.ibcMettatonExBodyHeart,
               anchor: { x: 0, y: 1 },
               offsets: [ { y: -3 } ]
            });
            const head = new CosmosAnimation({
               resources: content.ibcMettatonExFace,
               anchor: { x: 0 },
               offsets: [ { y: 35 } ]
            });
            const leftArm = new CosmosAnimation({
               resources: content.ibcMettatonExArm,
               anchor: { x: 1 },
               offsets: [ { x: 19, y: -4 } ]
            });
            const leftLeg = new CosmosAnimation({
               resources: content.ibcMettatonExLeg,
               offsets: [ { x: 10, y: 48 } ],
               priority: -2
            });
            const rightArm = new CosmosAnimation({
               resources: content.ibcMettatonExArm,
               anchor: { x: 1 },
               offsets: [ { x: -19, y: -4 } ]
            });
            const rightLeg = new CosmosAnimation({
               resources: content.ibcMettatonExLeg,
               offsets: [ { x: -10, y: 48 } ],
               priority: -2
            });
            const random3 = random.clone();
            return new CosmosSprite({
               tint: 0xffffff,
               anchor: { y: 1 },
               metadata: {
                  bodyActive: false,
                  dance: false,
                  dancedelay: 25,
                  dancetimer: 0,
                  doTick: true,
                  fallTicks: null as number | null,
                  fallTicksRate: 1,
                  hideArms: false,
                  hideHeart: false,
                  hideLegs: false,
                  leftArmIndex: 0,
                  leftLegIndex: 0,
                  leftLegTicks: 0,
                  rightArmIndex: 0,
                  rightLegIndex: 0,
                  rightLegTicks: 0,
                  ticks: 0,
                  tickSpeed: new CosmosValue(1),
                  size: { y: 100 }
               },
               objects: [ leftLeg, rightLeg, leftArm, rightArm, body, bodyHeart, head ],
               position: { y: 5 }
            }).on('tick', async function () {
               if (this.metadata.dance) {
                  if (this.metadata.dancedelay <= ++this.metadata.dancetimer) {
                     this.metadata.leftArmIndex = Math.floor(random3.next() * 8);
                     this.metadata.leftLegIndex = Math.floor(random3.next() * 5);
                     this.metadata.rightArmIndex = Math.floor(random3.next() * 8);
                     this.metadata.rightLegIndex = Math.floor(random3.next() * 5);
                     head.index < 9 && (head.index = Math.floor(random3.next() * 9));
                     this.metadata.dancetimer = 0;
                  }
               } else {
                  this.metadata.dancetimer = 0;
               }
               const { x, y } = this;
               const { sin, cos, max } = Math;
               const {
                  bodyActive,
                  doTick,
                  hideArms,
                  hideHeart,
                  hideLegs,
                  leftArmIndex,
                  leftLegIndex,
                  rightArmIndex,
                  rightLegIndex,
                  tickSpeed
               } = this.metadata;

               const leftLegDepth = legOffsets[leftLegIndex];
               const rightLegDepth = legOffsets[rightLegIndex];

               const legAngle = 0;
               let legDepth = 0;

               if (hideLegs) {
                  this.metadata.fallTicks ??= max(leftLegDepth, rightLegDepth) * 2;
                  if (this.metadata.fallTicks > 0) {
                     legDepth = this.metadata.fallTicks -= this.metadata.fallTicksRate++;
                     if (this.metadata.fallTicks <= 0) {
                        this.metadata.fallTicks = 0;
                        assets.sounds.landing.instance(timer);
                        shake(2, 1000);
                     }
                  }
               } else {
                  if (doTick) {
                     this.metadata.leftLegTicks += tickSpeed.value;
                     this.metadata.rightLegTicks += tickSpeed.value;
                     if (leftLegIndex !== 1 || rightLegIndex !== 1) {
                        this.metadata.ticks += tickSpeed.value;
                     }
                  }
                  if (leftLegDepth > rightLegDepth) {
                     legDepth = leftLegDepth * 2;
                     this.metadata.leftLegTicks = 0;
                  } else {
                     legDepth = rightLegDepth * 2;
                     this.metadata.rightLegTicks = 0;
                  }
                  if (abs(leftLegDepth - rightLegDepth) < 5) {
                     this.metadata.leftLegTicks = 0;
                     this.metadata.rightLegTicks = 0;
                  }
               }

               if (bodyActive) {
                  body.reverse = false;
                  body.index < 5 ? body.enable() : body.disable();
               } else {
                  body.reverse = true;
                  body.index > 0 ? body.enable() : body.disable();
               }

               const sin2 = sin(this.metadata.ticks / 2);
               const sin3_5 = sin(this.metadata.ticks / 3.5);
               const cos3_5 = cos(this.metadata.ticks / 3.5);

               if (!hideLegs) {
                  display(
                     leftLeg,
                     leftLegIndex,
                     x - 14,
                     y + 130 - legDepth - sin2 * 0.05,
                     -2,
                     2 - sin3_5 * 0.05,
                     sin(this.metadata.leftLegTicks / 7) * 10
                  );
                  display(
                     rightLeg,
                     rightLegIndex,
                     x + 14,
                     y + 130 - legDepth - sin2 * 0.05,
                     2,
                     2 - sin3_5 * 0.05,
                     sin(this.metadata.rightLegTicks / 7) * 10 - legAngle
                  );
               }

               if (!hideArms) {
                  display(leftArm, leftArmIndex, x - 37 + sin3_5, y - legDepth + 80 + cos3_5 * 2);
                  display(rightArm, rightArmIndex, x + 37 + sin3_5, y - legDepth + 80 + cos3_5 * 2, -2);
                  leftArm.priority.value = leftArmIndex === 5 ? 1 : -1;
                  rightArm.priority.value = rightArmIndex === 5 ? 1 : -1;
               }

               display(body, body.index || 0, x + sin3_5, y - legDepth + 134 + cos3_5 * 2);
               hideHeart ||
                  display(
                     bodyHeart,
                     bodyHeart.index || 0,
                     x + sin3_5,
                     y - legDepth + 134 + cos3_5 * 2 + 108 + bodyHeart.index
                  );
               display(head, head.index || 0, x, y + 40 - legDepth + cos3_5 * 3, 2, 2, 0, 1);
            });
         }
      }
   }),
   rg03: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcRGCatHead, content.ibcRGCatHurt),
      hp: 350,
      df: 4,
      exp: 110,
      g: 60,
      name: text.b_opponent_rg03.name,
      acts: [
         [ 'check', text.b_opponent_rg03.act_check ],
         [ 'tug', [] ],
         [ 'whisper', [] ],
         [ 'flirt', [] ]
      ],
      sprite: () => rg(0),
      goodbye: () =>
         new CosmosSprite({
            metadata: { size: { y: 80 } },
            anchor: { x: 0, y: (164 / 198) * 2 - 1 },
            frames: [ content.ibcRGCatHurt ],
            scale: 1 / 2
         })
   }),
   rg04: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcRGBugHead, content.ibcRGBugHurt),
      hp: 350,
      df: 4,
      exp: 110,
      g: 60,
      name: text.b_opponent_rg04.name,
      acts: [
         [ 'check', text.b_opponent_rg04.act_check ],
         [ 'tug', [] ],
         [ 'whisper', [] ],
         [ 'flirt', [] ]
      ],
      sprite: () => rg(1),
      goodbye: () =>
         new CosmosSprite({
            metadata: { size: { y: 80 } },
            anchor: { x: 0, y: (164 / 198) * 2 - 1 },
            frames: [ content.ibcRGBugHurt ],
            scale: 1 / 2
         })
   }),
   glyde: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcGlydeAntenna,
         content.ibcGlydeBody,
         content.ibcGlydeWingLeft,
         content.ibcGlydeWingRight,
         content.ibcMettatonBody,
         content.ibcMettatonArmsWhatevs,
         content.ibcMettatonArmsThonk,
         content.ibcMettatonArmsNoticard,
         content.ibcMettatonWheel,
         content.ibcBurgerpantsBody,
         content.ibbYarn,
         content.asArrow,
         content.ibcGlydeHurt,
         content.ibbPlusSign
      ),
      hp: 800,
      df: 0,
      exp: 100,
      g: 120,
      name: text.b_opponent_glyde.name,
      acts: [
         [ 'check', text.b_opponent_glyde.act_check ],
         [ 'flirt', [] ],
         [ 'secret', text.b_opponent_glyde.act_secret ]
      ],
      handler: battler.opponentHandler({
         vars: {
            turns: 0,
            flirted: false,
            secreted: false,
            checked: false,
            itemcount: 0,
            async rtext (cutscene: boolean, ar: CosmosPointSimple, ...lines: string[]) {
               await battler.monster(cutscene, new CosmosPoint(27.5, -70).add(ar), battler.bubbles.twinkly, ...lines);
            }
         },
         bubble: [ { x: 195, y: 13 }, battler.bubbles.twinkly ],
         act: {
            async flirt (state) {
               state.vars.flirted = true;
               if (state.vars.turns === 0) {
                  save.data.b.flirt_glyde = true;
                  await battler.human(...text.b_opponent_glyde.act_flirt1);
               } else {
                  await battler.human(...text.b_opponent_glyde.act_flirt2);
               }
            },
            secret (state) {
               if (save.data.b.w_state_steak && save.data.b.w_state_soda) {
                  state.vars.secreted = true;
               }
            },
            check (state) {
               state.vars.checked = true;
            }
         },
         item: {
            steak (state) {
               state.vars.itemcount++;
            },
            soda (state) {
               state.vars.itemcount++;
            }
         },
         pretalk (state) {
            if (state.vars.secreted || state.vars.itemcount === 2) {
               state.pacify = true;
               return;
            }
            const talkText = [] as string[];
            if (state.vars.itemcount === 1) {
               talkText.push(...text.b_opponent_glyde.fightItem1);
            }
            switch (state.vars.turns) {
               case 0:
                  if (state.vars.checked) {
                     talkText.push(...text.b_opponent_glyde.turn1d);
                  } else if (state.vars.flirted) {
                     talkText.push(...text.b_opponent_glyde.turn1c);
                  } else if (state.hurt) {
                     talkText.push(...text.b_opponent_glyde.turn1b);
                  } else {
                     talkText.push(...text.b_opponent_glyde.turn1a);
                  }
                  talkText.push(...text.b_opponent_glyde.turn1e);
                  state.status = text.b_opponent_glyde.turnStatus1;
                  break;
               case 1:
                  talkText.push(...text.b_opponent_glyde.turn2);
                  state.status = text.b_opponent_glyde.turnStatus2;
                  break;
               case 2:
                  talkText.push(...text.b_opponent_glyde.turn3);
                  state.status = text.b_opponent_glyde.turnStatus3;
                  break;
               case 3:
                  talkText.push(...text.b_opponent_glyde.turn4);
                  state.status = text.b_opponent_glyde.turnStatus4;
                  break;
               case 4:
                  talkText.push(...text.b_opponent_glyde.turn5);
                  state.status = text.b_opponent_glyde.turnStatus5;
                  break;
               case 5:
                  talkText.push(...text.b_opponent_glyde.turn6a);
                  break;
            }
            state.talk = talkText;
         },
         postfight (state) {
            state.dead && (save.data.b.killed_glyde = true);
         },
         posttalk (state) {
            if (state.vars.turns === 5) {
               speech.emoters.glyde.index = 7;
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = [ text.b_opponent_glyde.hurtStatus ]);
         },
         async poststatus (state) {
            const container = state.volatile.container;
            const quizzer = container.metadata.ar as CosmosAnimation | void;
            const body = container.objects[0] as CosmosObject;
            const quizzerBody = container.metadata.arBody as CosmosAnimation | void;
            if (state.vars.secreted) {
               await battler.monster(
                  false,
                  { x: 195, y: 13 },
                  battler.bubbles.twinkly,
                  ...(state.vars.itemcount === 1
                     ? text.b_opponent_glyde.fightEnder1
                     : text.b_opponent_glyde.fightEnder2),
                  ...text.b_opponent_glyde.fightEnder3
               );
               save.data.b.spared_glyde = true;
               state.volatile.sparable = true;
               battler.spare();
               return;
            } else if (state.vars.itemcount === 2) {
               await battler.monster(
                  false,
                  { x: 195, y: 13 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.fightItem2
               );
               await body.position.step(timer, 5, { x: -80 });
               save.data.b.spared_glyde = true;
               state.volatile.sparable = true;
               battler.spare();
               return;
            } else if (state.vars.turns === 4) {
               if (save.data.n.bad_lizard < 2) {
                  quizzer!.index = 6;
                  await quizzerBody!.position.step(timer, 4, { x: 10 });
                  await state.vars.rtext(false, quizzerBody!, ...text.b_opponent_glyde.turn5a);
                  await timer.pause(850);
                  header('x1').then(() => (quizzer!.index = 23));
                  await battler.monster(
                     false,
                     { x: 195, y: 13 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_glyde.turn5b
                  );
                  await timer.pause(350);
                  quizzerBody!.position.step(timer, 3, { x: -25 });
                  await timer.pause(850);
                  await battler.monster(
                     false,
                     { x: 195, y: 13 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_glyde.turn5c
                  );
               }
            } else if (state.vars.turns === 5) {
               battler.music?.stop();
               await timer.pause(100);
               const newCenterPos = body.position.add(36, 49);
               const yarrrrn = new CosmosAnimation({
                  active: true,
                  anchor: { x: (12 / 69) * 2 - 1, y: 0 },
                  position: { x: 300, y: newCenterPos.y + 5 },
                  resources: content.ibbYarn
               });
               renderer.attach('menu', yarrrrn);
               timer.pause(450).then(() => {
                  speech.emoters.glyde.index = 11;
                  battler.monster(true, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.turn6b);
               });
               let flash = 0;
               while (flash++ < 8) {
                  yarrrrn.alpha.value = 0;
                  await timer.pause(50);
                  yarrrrn.alpha.value = 1;
                  await timer.pause(50);
               }
               assets.sounds.arrow.instance(timer);
               await yarrrrn.position.modulate(timer, 300, { x: 160 });
               body.objects = [ speech.emoters.glyde ];
               (speech.emoters.glyde as CosmosAnimation).use(content.ibcGlydeHurt);
               speech.emoters.glyde.anchor.set(0, 0);
               body.position.set(newCenterPos);
               assets.sounds.strike.instance(timer);
               renderer.detach('menu', yarrrrn);
               typer.text('');
               await Promise.all([
                  body.scale.modulate(timer, 900, { x: 0.5 * 0.7, y: 0.5 * 0.7 }),
                  body.rotation.modulate(timer, 900, -150),
                  body.position.modulate(timer, 900, { x: -180, y: 20 })
               ]);
               renderer.detach('menu', body);
               const bpants = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 360, y: 123 },
                  resources: content.ibcBurgerpantsBody
               });
               renderer.attach('menu', bpants);
               battler.garbage.push([ 'menu', bpants ]);
               await timer.pause(850);
               await bpants.position.modulate(timer, 1600, { x: 160 });
               speech.emoters.bpants = bpants;
               battler.music = assets.music.wrongenemy.instance(timer);
               battler.music.rate.value = 0.75;
               await battler.monster(
                  false,
                  { x: bpants.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6c()
               );
               await timer.pause(450);
               speech.emoters.bpants.index = 6;
               await timer.pause(650);
               await bpants.position.modulate(timer, 1000, { x: 265 });
               const metta = battler.volatile[battler.add(opponents.mettaton1, { x: -50, y: 115 })];
               metta.vars.armRezo = content.ibcMettatonArmsWhatevs;
               const mettaBody = metta.container.objects[0];
               const mettamover = mettaBody.metadata.mettamover as {
                  wobble: CosmosValue;
                  idealX: number;
               };
               mettamover.idealX = 70;
               if (save.data.n.bad_lizard < 2) {
                  quizzer!.index = 0;
                  quizzerBody!.position.step(timer, 3, { x: 15 });
               }
               await timer.pause(1250);
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6d
               );
               await timer.pause(350);
               await battler.monster(
                  false,
                  { x: bpants.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6e
               );
               await timer.pause(850);
               metta.vars.armRezo = content.ibcMettatonArmsThonk;
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6f
               );
               await timer.pause(650);
               await battler.monster(
                  false,
                  { x: bpants.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6g
               );
               metta.vars.armRezo = content.ibcMettatonArmsNoticard;
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6h
               );
               await timer.pause(650);
               bpants.index = 10;
               battler.music.stop();
               await timer.pause(850);
               bpants.position.step(timer, 7, { x: 360 });
               await timer.pause(1150);
               events.fire('exit');
               return;
            }
            await battler.resume(async () => {
               await standardSize({ x: 100, y: 100 }, true);
               Object.assign(battler.SOUL.position, { x: 160, y: 160 });
               battler.SOUL.alpha.value = 1;
               await patterns.glyde();
               battler.SOUL.alpha.value = 0;
               await resetBox(true);
            });
            // after all
            state.vars.turns++;
         }
      }),
      sprite (v) {
         let siner = 0;
         let ticks = 0;
         const wingLeft = new CosmosSprite({ frames: [ content.ibcGlydeWingLeft ], anchor: 1 });
         const body = new CosmosAnimation({ resources: content.ibcGlydeBody });
         const wingRight = new CosmosSprite({ frames: [ content.ibcGlydeWingRight ], anchor: { x: -1, y: 1 } });
         const antenna = new CosmosSprite({ frames: [ content.ibcGlydeAntenna ], anchor: { x: -0.55, y: 0.15 } });
         function display (spr: CosmosSprite, x: number, y: number, scaX: number, scaY: number, rot: number) {
            spr.position.set(x, y);
            spr.scale.set(scaX, scaY);
            spr.rotation.value = -rot;
         }
         return new CosmosSprite({ objects: [ wingRight, body, wingLeft, antenna ], offsets: [ 0 ], scale: 0.5 }).on(
            'tick',
            function () {
               ticks++;
               siner += Math.cos(ticks / 24) * 2;
               this.offsets[0].y = Math.sin(siner / 12) * 8;
               const mod1 = Math.sin(siner / 6);
               const mod2 = Math.sin(siner / 12);
               display(wingRight, 46, 106 + mod1 * 2, 2, 1.7 - mod1 * 0.3, 0);
               display(body, 0, 0, 2, 2, 0);
               display(wingLeft, 82, 174, 1.95 - mod1 * 0.05, 1.8 - mod1 * 0.2, 0);
               display(antenna, 54 + mod2 * 2, 4, 2, 2, 20 - mod2 * 20);
               speech.emoters.glyde = body;
            }
         );
      },
      goodbye: () =>
         new CosmosAnimation({
            resources: content.ibcGlydeHurt,
            anchor: { x: 0 },
            position: { x: -38 + 118 / 2, y: -11 },
            metadata: { size: { y: 95 } }
         })
   }),
   pyrope: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbPyropefire,
         content.ibbRope,
         content.ibbPyropebomb,
         content.ibbPyropebom,
         content.asBomb,
         content.ibcDummy,
         content.ibcPyropeRing,
         content.ibcPyropeDrip,
         content.ibcPyropeHead,
         content.ibcPyropeHurt
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      g: 160,
      hp: 110,
      df: 1,
      exp: 80,
      name: text.b_opponent_pyrope.name,
      acts: [
         [ 'check', text.b_opponent_pyrope.act_check ],
         [
            'rap',
            ({ vars }) =>
               [ text.b_opponent_pyrope.rapText1, text.b_opponent_pyrope.rapText2, text.b_opponent_pyrope.rapText3 ][
                  vars.charge ?? 0
               ]
         ],
         [
            'spark',
            ({ vars }) =>
               [
                  text.b_opponent_pyrope.sparkText1,
                  text.b_opponent_pyrope.sparkText2,
                  text.b_opponent_pyrope.sparkText3
               ][vars.charge ?? 0]
         ],
         [ 'flirt', text.b_opponent_pyrope.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: ({ vars }) =>
            [
               [
                  text.b_opponent_pyrope.status1,
                  text.b_opponent_pyrope.status2,
                  text.b_opponent_pyrope.status3,
                  text.b_opponent_pyrope.status4,
                  text.b_opponent_pyrope.status5
               ],
               [
                  text.b_opponent_pyrope.sparkStatus1A,
                  text.b_opponent_pyrope.sparkStatus2A,
                  text.b_opponent_pyrope.sparkStatus3A
               ],
               [
                  text.b_opponent_pyrope.sparkStatus1B,
                  text.b_opponent_pyrope.sparkStatus2B,
                  text.b_opponent_pyrope.sparkStatus3B
               ]
            ][vars.charge],
         defaultTalk: ({ vars }) =>
            [
               [
                  text.b_opponent_pyrope.idleTalk1,
                  text.b_opponent_pyrope.idleTalk2,
                  text.b_opponent_pyrope.idleTalk3,
                  text.b_opponent_pyrope.idleTalk4,
                  text.b_opponent_pyrope.idleTalk5
               ],
               [
                  text.b_opponent_pyrope.sparkTalk1A,
                  text.b_opponent_pyrope.sparkTalk2A,
                  text.b_opponent_pyrope.sparkTalk3A
               ],
               [
                  text.b_opponent_pyrope.sparkTalk1B,
                  text.b_opponent_pyrope.sparkTalk2B,
                  text.b_opponent_pyrope.sparkTalk3B
               ]
            ][vars.charge],
         bubble: pos => [ pos.add(25, -92), battler.bubbles.dummy ],
         vars: { charge: 0 },
         act: {
            flirt (state) {
               save.data.b.flirt_pyrope = true;
               state.talk = [
                  text.b_opponent_pyrope.flirtTalk,
                  text.b_opponent_pyrope.sparkFlirtTalkA,
                  text.b_opponent_pyrope.sparkFlirtTalkB
               ][state.vars.charge];
            },
            spark (state) {
               if (state.vars.charge < 2 && ++state.vars.charge === 2) {
                  state.pacify = true;
                  save.data.b.spared_pyrope = true;
               }
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = [ text.b_opponent_pyrope.hurtStatus ]);
         }
      }),
      sprite () {
         const t = timer.value;
         const baseLift = -8;
         const ringSpread = 1.5;
         const timeRate = 2000;
         return new CosmosSprite({
            position: { y: -50 },
            objects: [
               ...CosmosUtils.populate(6, index =>
                  new CosmosAnimation({ anchor: { x: 0 }, index, resources: content.ibcPyropeRing }).on(
                     'tick',
                     function () {
                        const d = baseLift - (index + 0.5) * ringSpread;
                        this.offsets[0].y = -Math.abs(sineWaver(t, timeRate, d, -d, -0.05 - index * 0.005));
                     }
                  )
               ),
               ...CosmosUtils.populate(2, index =>
                  new CosmosSprite({
                     anchor: new CosmosPoint(5.5, 5).divide(22, 13).multiply(2).subtract(1),
                     scale: { x: [ 1, -1 ][index] },
                     position: { x: 6.5 * [ 1, -1 ][index], y: 43 },
                     frames: [ content.ibcPyropeDrip ]
                  }).on('tick', function () {
                     this.offsets[0].y = -Math.abs(sineWaver(t, timeRate, baseLift, -baseLift));
                     this.rotation.value = Math.abs(sineWaver(t, timeRate, 25, -25)) * this.scale.x;
                  })
               ),
               new CosmosAnimation({
                  active: true,
                  anchor: 0,
                  position: { y: -16 },
                  resources: content.ibcPyropeHead
               }).on('tick', function () {
                  const d = baseLift - 6.5 * ringSpread;
                  this.offsets[0].y = -Math.abs(sineWaver(t, timeRate, d, -d, -0.05 - 6.5 * 0.005));
                  this.rotation.value = sineWaver(t, timeRate / 1.5, -4, 4, 1 / 8);
               })
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcPyropeHurt ] });
      }
   }),
   tsundere: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcTsundereBody,
         content.ibcTsundereExhaust,
         content.ibcTsundereBlush,
         content.ibcTsundereHurt,
         content.ibbVertship,
         content.asBell,
         content.ibbLooxCircle3
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      g: 45,
      hp: 80,
      df: 6,
      exp: 95,
      name: text.b_opponent_tsundere.name,
      acts: [
         [ 'check', text.b_opponent_tsundere.act_check ],
         [
            'upgrade',
            ({ vars }) =>
               [
                  text.b_opponent_tsundere.upgradeText1,
                  text.b_opponent_tsundere.upgradeText2,
                  text.b_opponent_tsundere.upgradeText3,
                  text.b_opponent_tsundere.upgradeText3
               ][vars.upgrade ?? 0]
         ],
         [ 'steal', text.b_opponent_tsundere.stealText ],
         [
            'flirt',
            () =>
               [
                  text.b_opponent_tsundere.flirtText1,
                  text.b_opponent_tsundere.flirtText2,
                  text.b_opponent_tsundere.flirtText3,
                  text.b_opponent_tsundere.flirtText4,
                  text.b_opponent_tsundere.flirtText5
               ][battler.rand(5)]
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: () => [
            text.b_opponent_tsundere.status1(),
            text.b_opponent_tsundere.status2(),
            text.b_opponent_tsundere.status3(),
            text.b_opponent_tsundere.status4(),
            text.b_opponent_tsundere.status5()
         ],
         defaultTalk: [
            text.b_opponent_tsundere.idleTalk1,
            text.b_opponent_tsundere.idleTalk2,
            text.b_opponent_tsundere.idleTalk3,
            text.b_opponent_tsundere.idleTalk4,
            text.b_opponent_tsundere.idleTalk5
         ],
         bubble: pos => [ pos.add(33, -52), battler.bubbles.dummy ],
         vars: { upgrade: 0, greenmode: false },
         preact (s) {
            s.vars.greenmode = false;
         },
         act: {
            flirt (state) {
               save.data.b.flirt_tsundere = true;
               state.talk = [
                  text.b_opponent_tsundere.flirtTalk1,
                  text.b_opponent_tsundere.flirtTalk2,
                  text.b_opponent_tsundere.flirtTalk3,
                  text.b_opponent_tsundere.flirtTalk4
               ][state.vars.upgrade];
            },
            upgrade (state) {
               if (state.vars.upgrade < 3) {
                  state.talk = [
                     text.b_opponent_tsundere.upgradeTalk1,
                     text.b_opponent_tsundere.upgradeTalk2,
                     text.b_opponent_tsundere.upgradeTalk3
                  ][state.vars.upgrade];
                  state.status = [
                     text.b_opponent_tsundere.upgradeStatus1(),
                     text.b_opponent_tsundere.upgradeStatus2(),
                     text.b_opponent_tsundere.upgradeStatus3()
                  ];
                  if (++state.vars.upgrade === 3) {
                     state.pacify = true;
                     save.data.b.spared_tsundere = true;
                  }
                  state.volatile.container.objects[0].metadata.blushFactor = state.vars.upgrade / 3;
               }
            },
            steal (state) {
               oops();
               state.vars.greenmode = true;
               state.talk = [
                  text.b_opponent_tsundere.stealTalk1,
                  text.b_opponent_tsundere.stealTalk2,
                  text.b_opponent_tsundere.stealTalk3
               ];
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = [ text.b_opponent_tsundere.hurtStatus() ]);
         }
      }),
      sprite () {
         return new CosmosSprite({
            metadata: { blushFactor: 0, ticks: 0 },
            objects: [
               new CosmosObject({ position: -30 }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcTsundereBody ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        resources: content.ibcTsundereBlush,
                        position: { x: 23, y: -9 }
                     })
                  ],
                  metadata: { time: timer.value }
               }).on('tick', function () {
                  this.y = CosmosMath.bezier(sineWaver(this.metadata.time, 1500, 0, 1), -1, -1, 1);
               })
            ]
         }).on('tick', function () {
            this.objects[1].objects[0].alpha.value = this.metadata.blushFactor;
            if (this.metadata.ticks-- === 0) {
               this.metadata.ticks = 4;
               const exhaustContainer = this.objects[0];
               exhaustContainer.attach(
                  new CosmosSprite({
                     frames: [ content.ibcTsundereExhaust ],
                     velocity: { x: -2, y: -1 },
                     metadata: { ticks: 0 },
                     position: this.objects[1],
                     anchor: 0
                  }).on('tick', async function () {
                     switch (++this.metadata.ticks) {
                        case 2:
                           this.scale.modulate(timer, 1000, 0.5);
                           break;
                        case 5:
                           await this.alpha.modulate(timer, 500, 0);
                           exhaustContainer.detach(this);
                           break;
                     }
                  })
               );
            }
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcTsundereHurt ] });
      }
   }),
   perigee: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcPerigeeBody,
         content.ibcPerigeeHurt,
         content.ibbBird,
         content.ibbFeather,
         content.ibbBirdfront
      ),
      metadata: { arc: true },
      bullyable: true,
      bully: () => world.bully(),
      g: 50,
      hp: 20,
      df: 0,
      exp: 70,
      name: text.b_opponent_perigee.name,
      acts: [
         [ 'check', text.b_opponent_perigee.act_check ],
         [ 'bow', ({ vars }) => (vars.whistle ? text.b_opponent_perigee.act_bow2 : text.b_opponent_perigee.act_bow1) ],
         [ 'whistle', text.b_opponent_perigee.act_whistle ],
         [ 'flirt', text.b_opponent_perigee.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: state =>
            state.volatile.sparable
               ? [ text.b_opponent_perigee.status6 ]
               : [
                    text.b_opponent_perigee.status1,
                    text.b_opponent_perigee.status2,
                    text.b_opponent_perigee.status3,
                    text.b_opponent_perigee.status4,
                    text.b_opponent_perigee.status5
                 ],
         defaultTalk: [
            text.b_opponent_perigee.idleTalk1,
            text.b_opponent_perigee.idleTalk2,
            text.b_opponent_perigee.idleTalk3,
            text.b_opponent_perigee.idleTalk4,
            text.b_opponent_perigee.idleTalk5
         ],
         bubble: pos => [ pos.add(25, -52), battler.bubbles.dummy ],
         vars: { whistle: false },
         act: {
            flirt (state) {
               save.data.b.flirt_perigee = true;
               state.talk = text.b_opponent_perigee.flirtTalk;
            },
            whistle (state) {
               state.talk = text.b_opponent_perigee.whistleTalk;
               state.status = text.b_opponent_perigee.whistleStatus;
            },
            bow (state) {
               state.vars.whistle && (state.pacify = true);
            }
         },
         postact ({ choice, vars }) {
            vars.whistle = choice.type === 'act' && choice.act === 'whistle';
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = [ text.b_opponent_perigee.hurtStatus ]);
         }
      }),
      sprite () {
         return new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcPerigeeBody, active: true });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcPerigeeHurt ] });
      }
   }),
   madjick: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbOrb,
         content.ibbLightning,
         content.ibcMadjickBoot,
         content.ibcMadjickCape,
         content.ibcMadjickLapel,
         content.ibcMadjickHat,
         content.ibcMadjickHead,
         content.ibcMadjickDress,
         content.ibcMadjickHurt,
         content.ibbFroggitWarn
      ),
      g: 120,
      hp: 590,
      df: 0,
      exp: 150,
      name: text.b_opponent_madjick.name,
      acts: [
         [ 'check', text.b_opponent_madjick.act_check ],
         [
            'playdead',
            ({ vars }) =>
               vars.result ? text.b_opponent_madjick.playdeadText2 : text.b_opponent_madjick.playdeadText1()
         ],
         [
            'dance',
            ({ vars }) =>
               vars.result
                  ? text.b_opponent_madjick.danceText3
                  : [ text.b_opponent_madjick.danceText1, text.b_opponent_madjick.danceText2() ][vars.danceProgress || 0]
         ],
         [
            'flirt',
            ({ vars }) =>
               (world.flirt < 15
                  ? text.b_opponent_madjick.flirtText0
                  : vars.result
                  ? text.b_opponent_madjick.flirtText3
                  : [ text.b_opponent_madjick.flirtText1, text.b_opponent_madjick.flirtText2 ][vars.flirtProgress || 0])()
         ]
      ],
      metadata: { reactOld: true },
      handler: battler.opponentHandler({
         vars: { result: 0, flirtProgress: 0, danceProgress: 0, attacktype: 0, crazy: false },
         defaultStatus: () => [
            text.b_opponent_madjick.idleStatus1(),
            text.b_opponent_madjick.idleStatus2(),
            text.b_opponent_madjick.idleStatus3(),
            text.b_opponent_madjick.idleStatus4(),
            text.b_opponent_madjick.idleStatus5()
         ],
         defaultTalk: [
            text.b_opponent_madjick.idleTalk1,
            text.b_opponent_madjick.idleTalk2,
            text.b_opponent_madjick.idleTalk3,
            text.b_opponent_madjick.idleTalk4,
            text.b_opponent_madjick.idleTalk5
         ],
         bubble: pos => [ pos.add(22, -52), battler.bubbles.twinkly ],
         prechoice (state) {
            state.vars.attacktype = state.vars.result < 1 ? 0 : 3;
            state.vars.crazy = false;
         },
         preact (state) {
            switch (state.vars.result) {
               case 1:
                  state.talk = [
                     text.b_opponent_madjick.flirtIdleTalk1,
                     text.b_opponent_madjick.flirtIdleTalk2,
                     text.b_opponent_madjick.flirtIdleTalk3
                  ][battler.rand(3)];
                  state.status = text.b_opponent_madjick.playdeadStatus;
                  break;
               case 2:
                  state.talk = [
                     text.b_opponent_madjick.danceIdleTalk1,
                     text.b_opponent_madjick.danceIdleTalk2,
                     text.b_opponent_madjick.danceIdleTalk3
                  ][battler.rand(3)];
                  state.status = text.b_opponent_madjick.danceStatus3;
                  break;
               case 3:
                  state.talk = [
                     text.b_opponent_madjick.playdeadIdleTalk1,
                     text.b_opponent_madjick.playdeadIdleTalk2,
                     text.b_opponent_madjick.playdeadIdleTalk3
                  ][battler.rand(3)];
                  state.status = text.b_opponent_madjick.flirtStatus2;
                  break;
            }
         },
         act: {
            flirt (state) {
               if (!state.vars.result && !(world.flirt < 15)) {
                  save.data.b.flirt_madjick = true;
                  switch (++state.vars.flirtProgress) {
                     case 1:
                        state.talk = text.b_opponent_madjick.flirtTalk1;
                        state.status = text.b_opponent_madjick.flirtStatus1;
                        break;
                     case 2:
                        state.talk = text.b_opponent_madjick.flirtTalk2;
                        state.status = text.b_opponent_madjick.flirtStatus2;
                        state.vars.result = 1;
                        state.pacify = true;
                        break;
                  }
               }
            },
            dance (state) {
               if (!state.vars.result) {
                  switch (++state.vars.danceProgress) {
                     case 1:
                        state.talk = text.b_opponent_madjick.danceTalk1;
                        state.status = text.b_opponent_madjick.danceStatus1;
                        state.vars.attacktype = 1;
                        break;
                     case 2:
                        state.talk = text.b_opponent_madjick.danceTalk2;
                        state.status = text.b_opponent_madjick.danceStatus2;
                        state.vars.attacktype = 2;
                        state.vars.result = 2;
                        state.pacify = true;
                        save.data.b.spared_madjick = true;
                        break;
                  }
               }
            },
            playdead (state) {
               if (!state.vars.result) {
                  state.talk = text.b_opponent_madjick.playdeadTalk;
                  state.status = text.b_opponent_madjick.playdeadStatus;
                  state.vars.result = 3;
                  state.vars.crazy = true;
                  state.pacify = true;
               }
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_madjick.old_gun_text);
               useOld('old_gun', state, false);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_madjick.old_bomb_text);
               useOld('old_bomb', state, false);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_madjick.old_spray_text);
               useOld('old_spray', state);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = text.b_opponent_madjick.perilStatus();
            }
         },
         poststatus (state) {
            if (state.dead) {
               save.data.b.killed_madjick = true;
            }
         }
      }),
      sprite () {
         const { sin, cos } = Math;
         function display (
            sprite: CosmosSprite,
            index: number,
            x: number,
            y: number,
            sx: number = 2,
            sy: number = 2,
            r: number = 0,
            a: number = 1
         ) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x / 2, (y - 240) / 2);
            sprite.scale.set(sx / 2, sy / 2);
            sprite.rotation.value = -r;
            sprite.alpha.value = a;
         }
         const cape = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickCape ], offsets: [ { y: -8 } ] });
         const boot1 = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickBoot ] });
         const boot2 = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickBoot ] });
         const lapel1 = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcMadjickLapel ],
            offsets: [ { x: 2, y: -2 } ]
         });
         const lapel2 = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcMadjickLapel ],
            offsets: [ { x: -2, y: -2 } ]
         });
         const dress = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickDress ], offsets: [ { y: -8 } ] });
         const head = new CosmosSprite({ anchor: { x: -0.5, y: -0.25 }, frames: [ content.ibcMadjickHead ] });
         const hat = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMadjickHat ],
            offsets: [ { y: 1.5 } ]
         });
         const rng3 = random.clone();
         function particlegen (this: CosmosObject) {
            if (this.metadata.gen) {
               const container = battler.volatile[0].container;
               const spr = new CosmosAnimation({
                  anchor: 0,
                  resources: content.ibbFroggitWarn,
                  velocity: { y: -3 },
                  position: container.position
                     .add(container.objects[0])
                     .add(this)
                     .add((rng3.next() * 2 - 1) * 7, 0)
               }).on('tick', function () {
                  this.alpha.value *= 0.9;
                  if (this.alpha.value < 0.05) {
                     renderer.detach('menu', this);
                     battler.garbage.splice(battler.garbage.indexOf(garbo), 1);
                  }
               });
               renderer.attach('menu', spr);
               const garbo = [ 'menu', spr ] as ['menu', CosmosAnimation];
               battler.garbage.push(garbo);
            }
         }
         const orb1 = new CosmosAnimation({
            active: true,
            anchor: 0,
            resources: content.ibbOrb,
            metadata: { gen: true }
         }).on('tick', particlegen);
         const orb2 = new CosmosAnimation({
            active: true,
            anchor: 0,
            resources: content.ibbOrb,
            metadata: { gen: true }
         }).on('tick', particlegen);
         return new CosmosSprite({
            metadata: { time: 0, orb1, orb2 },
            objects: [ cape, boot1, boot2, dress, lapel1, lapel2, head, hat, orb1, orb2 ]
         }).on('tick', function () {
            const sin5 = sin(this.metadata.time / 5);
            const cos5 = cos(this.metadata.time / 5);
            this.y = 57 + sin((this.metadata.time + 4) / 5) * 10;
            display(cape, 0, 0, 52 + sin5, 2, 1.9 - sin5 * 0.1);
            display(boot1, 0, -24 - sin5 * 5, 80 - sin5 * 6, 2, 2, -30 - sin5 * 8);
            display(boot2, 0, 22 + sin5 * 5, 80 - sin5 * 6, -2, 2, 30 + sin5 * 8);
            display(dress, 0, 0, 52 + sin5, 2, 1.8 - sin5 * 0.2);
            display(lapel1, 0, 0, 52 + sin5 / 2, 2, 2, -sin5 * 5);
            display(lapel2, 0, 0, 52 + sin5 / 2, -2, 2, sin5 * 5);
            display(head, 0, -6, 2 + sin5 * 8);
            display(hat, 0, 2 + cos5, 4 + sin5 * 10);
            display(orb1, 0, -62, 16 + cos5 * 5);
            display(orb2, 0, 62, 6 + cos5 * 5);
            this.metadata.time++;
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMadjickHurt ] });
      }
   }),
   knightknight: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcKnightknightArmball,
         content.asAppear,
         content.ibbLightning,
         content.ibcKnightknightArmstaff,
         content.ibcKnightknightBase,
         content.ibcKnightknightDragonfur,
         content.ibcKnightknightEyes,
         content.ibcKnightknightHeadpiece,
         content.ibcKnightknightMouthpiece,
         content.ibcKnightknightHurt,
         content.ibbWave
      ),
      g: 150,
      hp: 630,
      df: 2,
      exp: 180,
      name: text.b_opponent_knightknight.name,
      acts: [
         [ 'check', text.b_opponent_knightknight.act_check ],
         [
            'flash',
            ({ vars }) =>
               vars.result
                  ? [
                       text.b_opponent_knightknight.flashText2a,
                       text.b_opponent_knightknight.flashText2b,
                       text.b_opponent_knightknight.flashText2c
                    ][vars.result - 1]
                  : text.b_opponent_knightknight.flashText1()
         ],
         [
            'comfort',
            ({ vars }) =>
               vars.result
                  ? vars.result === 3
                     ? text.b_opponent_knightknight.comfortText4
                     : text.b_opponent_knightknight.comfortText3
                  : [ text.b_opponent_knightknight.comfortText1, text.b_opponent_knightknight.comfortText2 ][
                       vars.comfortProgress || 0
                    ]()
         ],
         [
            'flirt',
            ({ vars }) =>
               (world.flirt < 15
                  ? text.b_opponent_knightknight.flirtText0
                  : vars.result
                  ? text.b_opponent_knightknight.flirtText3
                  : [ text.b_opponent_knightknight.flirtText1, text.b_opponent_knightknight.flirtText2 ][
                       vars.flirtProgress || 0
                    ])()
         ]
      ],
      metadata: { reactOld: true },
      handler: battler.opponentHandler({
         defaultStatus: () => [
            text.b_opponent_knightknight.idleStatus1(),
            text.b_opponent_knightknight.idleStatus2(),
            text.b_opponent_knightknight.idleStatus3(),
            text.b_opponent_knightknight.idleStatus4(),
            text.b_opponent_knightknight.idleStatus5()
         ],
         defaultTalk: [
            text.b_opponent_knightknight.idleTalk1,
            text.b_opponent_knightknight.idleTalk2,
            text.b_opponent_knightknight.idleTalk3,
            text.b_opponent_knightknight.idleTalk4,
            text.b_opponent_knightknight.idleTalk5
         ],
         vars: { result: 0, flirtProgress: 0, comfortProgress: 0, shakeFactor: new CosmosValue(1), instaSpare: false },
         bubble: [ { x: 202, y: 11 }, battler.bubbles.twinkly ],
         preact (state) {
            switch (state.vars.result) {
               case 1:
                  state.talk = [
                     text.b_opponent_knightknight.flirtIdleTalk1,
                     text.b_opponent_knightknight.flirtIdleTalk2,
                     text.b_opponent_knightknight.flirtIdleTalk3
                  ];
                  state.status = text.b_opponent_knightknight.flirtStatus2;
                  break;
               case 2:
                  state.talk = [
                     text.b_opponent_knightknight.comfortIdleTalk1,
                     text.b_opponent_knightknight.comfortIdleTalk2,
                     text.b_opponent_knightknight.comfortIdleTalk3
                  ];
                  state.status = text.b_opponent_knightknight.comfortStatus4;
                  break;
               case 3:
                  state.talk = [
                     text.b_opponent_knightknight.flashIdleTalk1,
                     text.b_opponent_knightknight.flashIdleTalk2,
                     text.b_opponent_knightknight.flashIdleTalk3
                  ];
                  state.status = text.b_opponent_knightknight.flashStatus;
                  break;
            }
         },
         act: {
            flirt (state) {
               if (!state.vars.result && !(world.flirt < 15)) {
                  save.data.b.flirt_knightknight = true;
                  switch (++state.vars.flirtProgress) {
                     case 1:
                        state.talk = text.b_opponent_knightknight.flirtTalk1;
                        state.status = text.b_opponent_knightknight.flirtStatus1;
                        break;
                     case 2:
                        state.talk = text.b_opponent_knightknight.flirtTalk2;
                        state.status = text.b_opponent_knightknight.flirtStatus2;
                        state.vars.result = 1;
                        state.pacify = true;
                        break;
                  }
               }
            },
            comfort (state) {
               let spare = false;
               if (state.vars.result === 3) {
                  state.talk = text.b_opponent_knightknight.comfortTalk3;
                  state.status = text.b_opponent_knightknight.comfortStatus3;
                  spare = true;
                  state.vars.instaSpare = true;
               } else if (!state.vars.result) {
                  switch (++state.vars.comfortProgress) {
                     case 1:
                        state.talk = text.b_opponent_knightknight.comfortTalk1;
                        state.status = text.b_opponent_knightknight.comfortStatus1;
                        break;
                     case 2:
                        state.talk = text.b_opponent_knightknight.comfortTalk2;
                        state.status = text.b_opponent_knightknight.comfortStatus2;
                        spare = true;
                        break;
                  }
               }
               if (spare) {
                  state.vars.result = 2;
                  state.pacify = true;
                  save.data.b.spared_knightknight = true;
               }
            },
            flash (state) {
               if (!state.vars.result) {
                  state.talk = text.b_opponent_knightknight.flashTalk;
                  state.status = text.b_opponent_knightknight.flashStatus;
                  state.vars.result = 3;
                  state.pacify = true;
               }
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_knightknight.old_gun_text);
               useOld('old_gun', state, false);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_knightknight.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_knightknight.old_spray_text);
               useOld('old_spray', state, false);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = text.b_opponent_knightknight.perilStatus();
            }
         },
         poststatus (state) {
            if (state.dead) {
               save.data.b.killed_madjick = true;
            } else if (state.vars.instaSpare) {
               battler.spare(state.target);
            }
         }
      }),
      sprite () {
         const random3 = random.clone();
         return new CosmosSprite({
            objects: [
               new CosmosSprite({
                  frames: [ content.ibcKnightknightArmstaff ],
                  position: { x: -77, y: -85 },
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        position: { x: 8, y: 62 },
                        resources: content.ibcKnightknightArmball
                     })
                  ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcKnightknightBase ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        position: { x: -18, y: -66 },
                        resources: content.ibcKnightknightEyes
                     }).on('tick', {
                        priority: 200,
                        listener () {
                           if (battler.volatile[0].vars.result === 3) {
                              this.extrapolate = false;
                              this.duration = Math.round(
                                 (this.resources!.data.value.frames[this.index]!.duration / (1000 / 30)) *
                                    CosmosMath.remap(battler.volatile[0].vars.shakeFactor.value, 2, 0.25)
                              );
                           }
                        }
                     }),
                     new CosmosAnimation({
                        active: true,
                        position: { x: -28, y: -55 },
                        resources: content.ibcKnightknightDragonfur
                     })
                  ]
               }),
               new CosmosAnimation({
                  position: { x: -23, y: -111 },
                  metadata: { blinkTimer: null as number | null },
                  resources: content.ibcKnightknightHeadpiece
               }).on('tick', function () {
                  if (this.active) {
                     this.index === 2 && this.reset();
                  } else if (this.metadata.blinkTimer === null) {
                     this.metadata.blinkTimer =
                        timer.value +
                        (2 + random3.next() * 5) *
                           (battler.volatile[0].vars.result === 3
                              ? CosmosMath.remap(battler.volatile[0].vars.shakeFactor.value, 2000, 250)
                              : 1000);
                  } else if (timer.value > this.metadata.blinkTimer) {
                     this.metadata.blinkTimer = null;
                     this.enable();
                  }
               }),
               new CosmosAnimation({
                  active: true,
                  position: { x: -12, y: -60 },
                  resources: content.ibcKnightknightMouthpiece
               })
            ]
         }).on('tick', function () {
            if (battler.volatile[0].vars.result === 3) {
               this.offsets[0].set(
                  new CosmosPoint(battler.volatile[0].vars.shakeFactor.value).multiply(
                     Math.random() * 1 - 1 / 2,
                     Math.random() * 1 - 1 / 2
                  )
               );
            }
         });
      },
      goodbye () {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcKnightknightHurt ]
         });
      }
   }),
   froggitex: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbFroggitGo,
         content.ibbFroggitWarn,
         content.ibbFroggitFly,
         content.asTwinklyHurt,
         content.asArrow,
         content.ibcFroggitexDefeated,
         content.ibcFroggitexHead,
         content.ibcFroggitexLegs
      ),
      metadata: { arc: true, reactOld: true },
      bullyable: true,
      bully: () => world.bully(),
      g: 80,
      hp: 100 * 3,
      df: 0,
      exp: 120,
      name: text.b_opponent_froggitex.name,
      acts: [
         [ 'check', text.b_opponent_froggitex.act_check ],
         [
            'translate',
            vola =>
               vola.vars.message ? text.b_opponent_froggitex.act_translate2 : text.b_opponent_froggitex.act_translate2
         ],
         [ 'mystify', text.b_opponent_froggitex.act_mystify ],
         [ 'flirt', text.b_opponent_froggitex.act_flirt ]
      ],
      hurt: assets.sounds.twinklyHurt,
      sparable: false,
      handler: battler.opponentHandler({
         defaultStatus: () => [
            text.b_opponent_froggitex.status1(),
            text.b_opponent_froggitex.status2(),
            text.b_opponent_froggitex.status3()
         ],
         defaultTalk: [
            text.b_opponent_froggitex.idleText1,
            text.b_opponent_froggitex.idleText2,
            text.b_opponent_froggitex.idleText3,
            text.b_opponent_froggitex.idleText4
         ],
         bubble: p => [ p.add(28, -56), battler.bubbles.dummy ],
         vars: { message: false, hit: false },
         preact (state) {
            state.vars.message = true;
         },
         act: {
            flirt (state) {
               state.talk = text.b_opponent_froggitex.flirtText;
               save.data.b.flirt_froggitex = true;
               state.vars.message = false;
            },
            translate (state) {
               state.talk = [
                  text.b_opponent_froggitex.translateText1(),
                  text.b_opponent_froggitex.translateText2(),
                  text.b_opponent_froggitex.translateText3(),
                  text.b_opponent_froggitex.translateText4(),
                  text.b_opponent_froggitex.translateText5()
               ];
               state.status = text.b_opponent_froggitex.mercyStatus;
               save.data.b.spared_froggitex = true;
               state.vars.message = false;
               state.pacify = true;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_froggitex.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_froggitex.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_froggitex.old_spray_text);
               useOld('old_spray', state);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = text.b_opponent_froggitex.perilStatus();
            }
         }
      }),
      sprite () {
         const random3 = random.clone();
         return new CosmosSprite({
            metadata: { size: { y: 55 } },
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  metadata: { t: timer.value },
                  resources: content.ibcFroggitexLegs
               }).on('tick', function () {
                  this.scale.y = sineWaver(this.metadata.t, 1000, 1, 1.1);
                  if (this.index === 0 && random3.next() < 1 / 30 / 10) {
                     this.index = 1;
                     timer.pause(650).then(() => {
                        this.index = 0;
                     });
                  }
               }),
               new CosmosAnimation({
                  active: true,
                  position: { x: -2, y: -20 },
                  anchor: { y: 1, x: 0 },
                  resources: content.ibcFroggitexHead,
                  metadata: { t: timer.value }
               }).on('tick', function () {
                  this.offsets[0].set(sineWaver(this.metadata.t, 3000, -3, 3), sineWaver(this.metadata.t, 1000, 0, -3));
               })
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({ frames: [ content.ibcFroggitexDefeated ], anchor: { y: 1, x: 0 } });
      }
   }),
   whimsalot: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbStarfly,
         content.ibcWhimsalot,
         content.ibcWhimsalotDefeated,
         content.ibbTiparrow
      ),
      metadata: { arc: true, reactOld: true },
      bullyable: true,
      bully: () => world.bully(),
      g: 80,
      hp: 95 * 3,
      df: 0,
      exp: 110,
      sparable: false,
      name: text.b_opponent_whimsalot.name,
      acts: [
         [ 'check', text.b_opponent_whimsalot.act_check ],
         [
            'perch',
            vola =>
               [
                  text.b_opponent_whimsalot.act_perch1,
                  text.b_opponent_whimsalot.act_perch2,
                  text.b_opponent_whimsalot.act_perch3
               ][vola.vars.perch ?? 0]()
         ],
         [
            'shove',
            vola =>
               (battler.hurt.includes(vola)
                  ? text.b_opponent_whimsalot.act_poke2
                  : text.b_opponent_whimsalot.act_poke1)()
         ],
         [ 'flirt', text.b_opponent_whimsalot.act_flirt ]
      ],
      handler: battler.opponentHandler({
         defaultStatus: () => [
            text.b_opponent_whimsalot.status1(),
            text.b_opponent_whimsalot.status2(),
            text.b_opponent_whimsalot.status3(),
            text.b_opponent_whimsalot.status4(),
            text.b_opponent_whimsalot.status5()
         ],
         defaultTalk: [
            text.b_opponent_whimsalot.idleTalk1,
            text.b_opponent_whimsalot.idleTalk2,
            text.b_opponent_whimsalot.idleTalk3,
            text.b_opponent_whimsalot.idleTalk4
         ],
         vars: { perch: 0 },
         bubble: p => [ p.add(27, -48), battler.bubbles.dummy ],
         preact (state) {
            if (state.choice.type !== 'act' || state.choice.act !== 'perch') {
               state.vars.perch = 0;
            }
         },
         act: {
            flirt (state) {
               state.talk = text.b_opponent_whimsalot.flirtTalk;
               save.data.b.flirt_whimsalot = true;
               state.vars.perch = 0;
            },
            perch (state) {
               switch (++state.vars.perch) {
                  case 1:
                     state.talk = [
                        text.b_opponent_whimsalot.preperchText1,
                        text.b_opponent_whimsalot.preperchText2,
                        text.b_opponent_whimsalot.preperchText3
                     ];
                     break;
                  case 2:
                     state.talk = [
                        text.b_opponent_whimsalot.perchText1,
                        text.b_opponent_whimsalot.perchText2,
                        text.b_opponent_whimsalot.perchText3,
                        text.b_opponent_whimsalot.perchText4,
                        text.b_opponent_whimsalot.perchText5
                     ];
                     state.status = text.b_opponent_whimsalot.spareStatus;
                     save.data.b.spared_whimsalot = true;
                     state.pacify = true;
                     break;
                  case 3:
                     battler.spare(state.target);
                     break;
               }
            },
            shove (state) {
               if (battler.hurt.includes(state.volatile)) {
                  battler.spare(state.target);
               }
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_whimsalot.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_whimsalot.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_whimsalot.old_spray_text);
               useOld('old_spray', state);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = text.b_opponent_whimsalot.perilStatus;
            }
         }
      }),
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWhimsalotDefeated ] });
      },
      sprite () {
         return new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            metadata: { dir: -1, ele: 0.5 },
            resources: content.ibcWhimsalot
         }).on('tick', function () {
            this.position.y = (this.metadata.ele += this.metadata.dir / (30 * 2)) * 12;
            if (this.metadata.ele < 0 || this.metadata.ele > 1) {
               this.metadata.dir *= -1;
            }
         });
      }
   }),
   astigmatism: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbLooxCircle1,
         content.ibbLooxCircle2,
         content.ibbLooxCircle3,
         content.ibcAstigmatismArm,
         content.ibcAstigmatismBody,
         content.ibcAstigmatismLeg,
         content.ibcAstigmatismHurt
      ),
      metadata: { arc: true, reactOld: true },
      g: 85,
      hp: 120 * 3,
      df: 0,
      exp: 130,
      name: text.b_opponent_astigmatism.name,
      acts: [
         [ 'check', text.b_opponent_astigmatism.act_check ],
         [ 'stare', text.b_opponent_astigmatism.act_stare ],
         [ 'grin', text.b_opponent_astigmatism.act_smile ],
         [ 'flirt', text.b_opponent_astigmatism.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         defaultStatus: ({ vars }) =>
            [
               [
                  text.b_opponent_astigmatism.status1(),
                  text.b_opponent_astigmatism.status2(),
                  text.b_opponent_astigmatism.status3(),
                  text.b_opponent_astigmatism.status4(),
                  text.b_opponent_astigmatism.status5()
               ],
               [
                  text.b_opponent_astigmatism.partialStatus1(),
                  text.b_opponent_astigmatism.partialStatus2(),
                  text.b_opponent_astigmatism.partialStatus3()
               ],
               text.b_opponent_astigmatism.fullStatus()
            ][vars.prog ?? 0],
         bubble: pos => [ pos.add(31, -54), battler.bubbles.dummy ],
         defaultTalk: ({ vars }) =>
            [
               [
                  text.b_opponent_astigmatism.idleTalk1,
                  text.b_opponent_astigmatism.idleTalk2,
                  text.b_opponent_astigmatism.idleTalk3,
                  text.b_opponent_astigmatism.idleTalk4,
                  text.b_opponent_astigmatism.idleTalk5
               ],
               [
                  text.b_opponent_astigmatism.partialIdleTalk1,
                  text.b_opponent_astigmatism.partialIdleTalk2,
                  text.b_opponent_astigmatism.partialIdleTalk3
               ],
               [
                  text.b_opponent_astigmatism.fullIdleTalk1,
                  text.b_opponent_astigmatism.fullIdleTalk2,
                  text.b_opponent_astigmatism.fullIdleTalk3
               ]
            ][vars.prog ?? 0],
         vars: { prog: 0, stare: false, grin: false },
         act: {
            stare (state) {
               if (!state.vars.stare) {
                  state.vars.stare = true;
                  state.vars.prog++;
                  if (state.vars.prog < 2) {
                     state.talk = [
                        text.b_opponent_astigmatism.partialTalk1,
                        text.b_opponent_astigmatism.partialTalk2,
                        text.b_opponent_astigmatism.partialTalk3
                     ];
                  } else {
                     state.pacify = true;
                     save.data.b.spared_astigmatism = true;
                  }
               }
            },
            grin (state) {
               if (!state.vars.grin) {
                  state.vars.grin = true;
                  state.vars.prog++;
                  if (state.vars.prog < 2) {
                     state.talk = [
                        text.b_opponent_astigmatism.partialTalk1,
                        text.b_opponent_astigmatism.partialTalk2,
                        text.b_opponent_astigmatism.partialTalk3
                     ];
                  } else {
                     state.pacify = true;
                     save.data.b.spared_astigmatism = true;
                  }
               }
            },
            flirt (state) {
               if (state.vars.prog < 2) {
                  state.talk = text.b_opponent_astigmatism.flirtTalk;
               } else {
                  save.data.b.flirt_astigmatism = true;
                  state.talk = text.b_opponent_astigmatism.flirtTalkFull;
               }
            }
         },
         pretalk (state) {
            if (state.hurt && state.vars.prog > 0) {
               state.vars.prog = 0;
               state.vars.grin = false;
               state.vars.stare = false;
               state.talk = text.b_opponent_astigmatism.hurtTalk;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_astigmatism.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_astigmatism.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_astigmatism.old_spray_text);
               useOld('old_spray', state);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = text.b_opponent_astigmatism.perilStatus;
            }
         }
      }),
      sprite () {
         const ex = new CosmosValue();
         const er = new CosmosValue();
         const body = new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            metadata: { delta: 0, move: false },
            position: { y: -10 },
            resources: content.ibcAstigmatismBody
         }).on('tick', function () {
            if (this.index === 10 && !this.metadata.move) {
               this.metadata.move = true;
               ex.modulate(timer, 1000, 0, 1.3, 1.3);
               er.modulate(timer, 3000, 0, 1, 1);
            } else if (this.index !== 10 && this.metadata.move) {
               this.metadata.move = false;
               ex.modulate(timer, 1000, 1, 0, 0);
               er.modulate(timer, 3000, 1, 0, 0);
            }
            this.metadata.delta += ex.value * 5;
         });
         return new CosmosSprite({
            metadata: { cycle: 0 },
            objects: [
               new CosmosSprite({
                  position: { x: 2, y: -13 },
                  frames: [ content.ibcAstigmatismLeg ]
               }).on('tick', function () {
                  this.offsets[0].set(new CosmosPoint().endpoint(body.metadata.delta % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: -2, y: -13 },
                  scale: { x: -1 },
                  frames: [ content.ibcAstigmatismLeg ]
               }).on('tick', function () {
                  this.offsets[0].set(new CosmosPoint().endpoint((body.metadata.delta + 180) % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: 16, y: -24 },
                  frames: [ content.ibcAstigmatismArm ]
               }).on('tick', function () {
                  this.offsets[0].set(new CosmosPoint().endpoint((body.metadata.delta + 180) % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: -16, y: -24 },
                  scale: { x: -1 },
                  frames: [ content.ibcAstigmatismArm ]
               }).on('tick', function () {
                  this.offsets[0].set(new CosmosPoint().endpoint(body.metadata.delta % 360, er.value));
               }),
               body
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            position: { y: 2 },
            frames: [ content.ibcAstigmatismHurt ],
            scale: 0.5
         });
      }
   }),
   migospel: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbMigosp,
         content.ibcMigospel,
         content.ibcMigospelHurt,
         content.ibcMigospelLegs,
         content.ibcMigospelHappi
      ),
      metadata: { arc: true, reactOld: true },
      g: 100,
      hp: 150 * 3,
      df: 3,
      exp: 150,
      name: text.b_opponent_migospel.name,
      acts: () => [
         [ 'check', text.b_opponent_migospel.act_check ],
         [ 'talk', text.b_opponent_migospel.act_talk ],
         [ 'flirt', text.b_opponent_migospel.act_flirt ],
         [ 'insult', [] ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         defaultTalk: () =>
            battler.alive.length > 1
               ? [
                    text.b_opponent_migospel.groupTalk1,
                    text.b_opponent_migospel.groupTalk2,
                    text.b_opponent_migospel.groupTalk3,
                    text.b_opponent_migospel.groupTalk4,
                    text.b_opponent_migospel.groupTalk5,
                    text.b_opponent_migospel.groupTalk6
                 ]
               : [
                    text.b_opponent_migospel.soloTalk1,
                    text.b_opponent_migospel.soloTalk2,
                    text.b_opponent_migospel.soloTalk3,
                    text.b_opponent_migospel.soloTalk4,
                    text.b_opponent_migospel.soloTalk5
                 ],
         bubble: pos => [ pos.add(17, -54), battler.bubbles.dummy ],
         defaultStatus: () =>
            battler.alive.length > 1
               ? [ text.b_opponent_migospel.groupStatus1(), text.b_opponent_migospel.groupStatus2() ]
               : text.b_opponent_migospel.soloStatus(),
         act: {
            talk (state) {
               battler.alive.length === 1 && (state.talk = text.b_opponent_migospel.talkTalk);
            },
            flirt (state) {
               if (battler.alive.length === 1) {
                  save.data.b.flirt_migospel = true;
                  state.talk = text.b_opponent_migospel.flirtTalk;
               }
            },
            async insult () {
               if (!save.data.b.oops) {
                  oops();
                  await timer.pause(1000);
               }
               await battler.human(
                  ...(battler.alive.length > 1
                     ? text.b_opponent_migospel.groupInsult
                     : text.b_opponent_migospel.soloInsult)
               );
            }
         },
         postact (state, act) {
            if (battler.alive.length === 1 && (act === 'talk' || act === 'flirt')) {
               save.data.b.spared_migosp = true;
               state.pacify = true;
            }
         },
         pretalk (state) {
            if (!state.dead) {
               if (battler.hurt.includes(state.volatile)) {
                  state.talk = text.b_opponent_migospel.perilTalk;
               } else if (battler.alive.length === 1) {
                  (state.volatile.container.objects[0].objects[1] as CosmosAnimation)
                     .use(content.ibcMigospelHappi)
                     .enable();
               }
            }
         },
         posttalk (state) {
            if (battler.hurt.includes(state.volatile) && !state.dead) {
               state.volatile.sparable = true;
               battler.spare(state.target);
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_migospel.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_migospel.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_migospel.old_spray_text);
               useOld('old_spray', state);
            }
         }
      }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMigospelHurt ] }),
      sprite: () => {
         const t = timer.value;
         const random3 = random.clone();
         return new CosmosSprite({
            objects: [
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMigospelLegs ] }),
               new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcMigospel }).on('tick', function () {
                  if (this.resources === content.ibcMigospel && this.index === 0 && random3.next() < 1 / 30 / 3) {
                     this.index = Math.floor(random3.next() * 2) + 1;
                     timer.pause(100 + CosmosMath.bezier(random3.next(), 0, 0, 750, 750)).then(() => {
                        this.index = 0;
                     });
                  }
               })
            ]
         }).on('tick', function () {
            this.scale.y = sineWaver(t, 2000, 1.04, 0.96);
         });
      }
   }),
   mushketeer: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibbLiteralBullet,
         content.ibbCrosshair,
         content.asNode,
         content.asArrow,
         content.ibcMushketeer,
         content.ibcMushketeerDefeated
      ),
      metadata: { arc: true, reactOld: true },
      g: 100,
      hp: 160 * 2,
      df: 0,
      exp: 150,
      name: text.b_opponent_mushketeer.name,
      acts: [
         [ 'check', text.b_opponent_mushketeer.act_check ],
         [
            'disarm',
            ({ vars }) =>
               [
                  text.b_opponent_mushketeer.act_disarm1,
                  text.b_opponent_mushketeer.act_disarm2,
                  text.b_opponent_mushketeer.act_disarm3
               ][vars.travel ?? 0]()
         ],
         [
            'travel',
            ({ vars }) =>
               [
                  text.b_opponent_mushketeer.act_travel1,
                  text.b_opponent_mushketeer.act_travel2,
                  text.b_opponent_mushketeer.act_travel3
               ][vars.travel ?? 0]()
         ],
         [ 'flirt', text.b_opponent_mushketeer.act_flirt ]
      ],
      handler: battler.opponentHandler({
         defaultStatus: ({ vars }) =>
            world.genocide
               ? text.b_opponent_mushketeer.genoStatus
               : vars.travel < 1
               ? [
                    text.b_opponent_mushketeer.status1(),
                    text.b_opponent_mushketeer.status2(),
                    text.b_opponent_mushketeer.status3(),
                    text.b_opponent_mushketeer.status4(),
                    text.b_opponent_mushketeer.status5()
                 ]
               : [
                    text.b_opponent_mushketeer.travelStatus1(),
                    text.b_opponent_mushketeer.travelStatus2(),
                    text.b_opponent_mushketeer.travelStatus3()
                 ],
         defaultTalk: ({ vars }) =>
            vars.travel < 1
               ? [
                    text.b_opponent_mushketeer.idleTalk1(),
                    text.b_opponent_mushketeer.idleTalk2(),
                    text.b_opponent_mushketeer.idleTalk3()
                 ]
               : [ text.b_opponent_mushketeer.travelTalk1, text.b_opponent_mushketeer.travelTalk2 ],
         vars: { travel: 0, disarm: false },
         bubble: pos => [ pos.add(35, -57), battler.bubbles.dummy ],
         act: {
            flirt (state) {
               state.talk = text.b_opponent_mushketeer.flirtTalk;
               save.data.b.flirt_mushketeer = true;
            },
            travel (state) {
               state.vars.travel < 2 && ++state.vars.travel;
            },
            disarm (state) {
               if (state.vars.travel) {
                  state.talk = text.b_opponent_mushketeer.disarmTalk;
                  state.vars.disarm = true;
                  save.data.b.spared_mushketeer = true;
               }
            }
         },
         posttalk (state) {
            if (state.vars.disarm) {
               state.volatile.sparable = true;
               battler.spare(state.target);
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_mushketeer.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mushketeer.old_bomb_text);
               useOld('old_bomb', state, false);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mushketeer.old_spray_text);
               useOld('old_spray', state, false);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = [ text.b_opponent_mushketeer.hurtStatus() ];
            }
         }
      }),
      sprite () {
         const random3 = random.clone();
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMushketeer ],
            metadata: { spinning: false, spinScale: new CosmosValue(1) }
         }).on('tick', function () {
            if (!this.metadata.spinning && random3.next() < 1 / 30 / 20) {
               this.metadata.spinning = true;
               this.metadata.spinScale.modulate(timer, 150, -1).then(async () => {
                  await timer.pause(100);
                  await this.metadata.spinScale.modulate(timer, 150, 1);
                  await timer.pause(100);
                  await this.metadata.spinScale.modulate(timer, 150, -1);
                  await timer.pause(100);
                  await this.metadata.spinScale.modulate(timer, 150, 1);
                  this.metadata.spinning = false;
               });
            }
            this.scale.set(
               new CosmosPoint([ 1, 1.5, 2 ][(battler.volatile[0].vars.travel as number) ?? 0]).multiply(
                  this.metadata.spinScale.value,
                  1
               )
            );
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMushketeerDefeated ] }).on(
            'tick',
            function () {
               this.scale.set([ 1, 1.5, 2 ][(battler.volatile[0].vars.travel as number) ?? 0]);
            }
         );
      }
   })
};

export default opponents;

CosmosUtils.status(`LOAD MODULE: AERIALIS OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
