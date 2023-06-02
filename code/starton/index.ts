import './bootstrap';

import { BLEND_MODES } from 'pixi.js';
import assets from '../assets';
import { OutertaleGroup, OutertaleShop } from '../classes';
import { characters, epicgamer, goatbro, runEncounter } from '../common';
import commonGroups from '../common/groups';
import content, { inventories } from '../content';
import { atlas, events, game, items, keys, random, renderer, rooms, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosCharacter,
   CosmosDirection,
   CosmosEntity,
   CosmosHitbox,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
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
import {
   battler,
   calcHP,
   character,
   choicer,
   dialogue,
   dialoguer,
   header,
   heal,
   instance,
   instances,
   isolate,
   oops,
   player,
   resume,
   shake,
   shopper,
   talkFilter,
   teleport,
   temporary,
   trivia,
   world
} from '../mantle';
import save from '../save';
import { faces, navscript } from './bootstrap';
import groups from './groups';
import text, { edgy } from './text';

const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

function sas (position: CosmosPointSimple, plot = 32) {
   if (!world.genocide && save.data.n.plot < plot) {
      return temporary(
         new CosmosHitbox({
            position,
            anchor: { x: 0, y: 1 },
            size: { x: 25, y: 5 },
            objects: [
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iocSansDownStatic ],
                  crop: { right: -23 }
               })
            ],
            metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
         }).on('tick', function () {
            plot <= save.data.n.plot && renderer.detach('main', this);
         }),
         'main'
      );
   }
}

async function depower () {
   assets.sounds.depower.instance(timer);
   const field = instance('main', 'lasercheckpoint')!.object.objects.filter(
      object => object instanceof CosmosAnimation
   )[0] as CosmosAnimation;
   await timer.pause(280);
   field.alpha.value = 0;
   await timer.pause(420 - 320);
   field.alpha.value = 1;
   await timer.pause(570 - 420);
   field.alpha.value = 0;
   await timer.pause(650 - 570);
   field.alpha.value = 1;
   await timer.pause(720 - 650);
   field.alpha.value = 0;
}

function leap (entity: CosmosEntity, time: number, height: number, destie?: number, inverse?: boolean) {
   return new Promise<CosmosEntity>(async resolve => {
      await entity.walk(timer, 3, { x: inverse ? 285 : 235 });
      const midPoint = entity.position.subtract(inverse ? 27.5 : -27.5, height).value();
      const endPoint = entity.position.add(inverse ? -55 : 55, 0).value();
      entity.position.modulate(timer, time, midPoint, endPoint).then(async () => {
         if (typeof destie === 'number') {
            await entity.walk(timer, 3, { x: 340 }, { x: 380, y: 100 }, { x: destie });
         }
         resolve(entity);
      });
      while (inverse ? entity.position.x > endPoint.x : entity.position.x < endPoint.x) {
         await timer.pause(player.position.y < midPoint.y - 20 ? 133 : player.position.y < midPoint.y - 10 ? 99 : 66);
         entity.face = (
            { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<CosmosDirection, CosmosDirection>
         )[entity.face];
      }
   });
}

function papyrusEmotes (paps: CosmosCharacter) {
   return (header: string) => {
      switch (header) {
         case 'x1':
         case 'p/papyrus':
            paps.preset = characters.papyrus;
            paps.face = 'left';
            paps.talk = true;
            break;
         case 'x2':
            paps.preset = characters.papyrusMad;
            paps.face = 'left';
            paps.talk = true;
            break;
         case 'x3':
            paps.preset = characters.papyrusSpecial;
            paps.face = 'down';
            paps.talk = false;
            paps.sprite.enable();
            speech.targets.delete(paps.sprite);
            break;
         case 'x4':
            paps.preset = characters.papyrusSpecial;
            paps.face = 'left';
            paps.talk = false;
            paps.sprite.enable();
            speech.targets.delete(paps.sprite);
            break;
      }
   };
}

const biorooms = {
   w_bridge: 100,
   w_exit: 100,
   s_start: 100,
   s_sans: 1100,
   s_crossroads: 1720,
   s_alphys: 2040,
   s_human: 1720,
   s_papyrus: 1720,
   s_doggo: 2040,
   s_lookout: 2020,
   s_maze: 2540,
   s_stand: 2860,
   s_dogs: 3180,
   s_lesser: 2940,
   s_bros: 3160,
   s_spaghetti: 3180,
   s_math: 3380,
   s_puzzle1: 3560,
   s_puzzle2: 4160,
   s_jenga: 4660,
   s_pacing: 4980,
   s_puzzle3: 5400,
   s_greater: 5800,
   s_bridge: 6240,
   s_town1: 7240,
   s_taxi: 8240,
   s_town2: 7240,
   s_battle: 8240,
   s_exit: 9040
} as CosmosKeyed<number, string>;

const biodome = new CosmosSprite({
   anchor: 0,
   parallax: { x: 1, y: 0 },
   frames: [ content.ieBiodome ],
   metadata: { last: '', init: false, list: void 0 as string | void },
   priority: -999999
}).on('tick', function () {
   if (game.room in biorooms && game.camera) {
      const clampedPos = game.camera.position.clamp(...renderer.region);
      this.alpha.value = game.room === 'w_bridge' ? 0.245 : game.room === 'w_exit' ? 0.35 : 0.5;
      this.position.x = 40 + ((biorooms[game.room] - (160 - renderer.region[0].x) + clampedPos.x) / 9200) * -80;
      this.position.y = clampedPos.y || 120;
      if (game.room !== this.metadata.list) {
         this.metadata.list = game.room;
      }
   }
});

const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = states.rooms[game.room] || (states.rooms[game.room] = {});
   if (subscript === 'tick') {
      if (game.room.startsWith('s_puzzle')) {
         if (game.room === 's_puzzle3') {
            world.genocide && instance('main', 's_spagnote')?.destroy();
            const p3 = save.data.s.state_starton_s_puzzle3;
            if (p3 || save.data.n.state_starton_s_puzzle3 > 0) {
               function p3activate (tag: string, state: number, tag2?: string) {
                  for (const { object } of instances('main', tag)) {
                     if (!tag2 || (object.metadata.tags as string[]).includes(tag2)) {
                        (object.objects[0] as CosmosAnimation).index = state;
                     }
                  }
               }
               p3 && p3activate(p3, 1);
               if (save.data.n.state_starton_s_puzzle3 > 0) {
                  for (const [ a, b ] of (world.genocide
                     ? [
                          [ 'r1', 'c1' ],
                          [ 'r1', 'c4' ],
                          [ 'r2', 'c3' ],
                          [ 'r3', 'c2' ],
                          [ 'r4', 'c1' ],
                          [ 'r4', 'c4' ]
                       ]
                     : [
                          [ 'r1', 'c3' ],
                          [ 'r2', 'c4' ],
                          [ 'r3', 'c3' ],
                          [ 'r4', 'c2' ],
                          [ 'r2', 'c1' ],
                          [ 'r2', 'c2' ]
                       ]
                  ).slice(0, save.data.n.state_starton_s_puzzle3 as number)) {
                     p3activate(a, 2, b);
                  }
               }
            }
         } else if (roomState.puzzleticker) {
            const puzzle = instance('main', 'puzzlechip')?.object.objects[0] as CosmosAnimation;
            if (puzzle) {
               save.data.n[`state_starton_${game.room as `s_puzzle${1 | 2 | 3}`}`] = puzzle.index;
            }
         }
      }
      switch (game.room) {
         case 's_start':
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 16.1) {
                  save.data.n.plot = 16.1;
                  const jeebs = assets.music.preshock.instance(timer);
                  jeebs.gain.value = 0;
                  jeebs.rate.value = 0.73;
                  jeebs.gain.modulate(timer, 1000, 1, 1);
                  async function shadowyboi () {
                     const subbie = world.genocide ? goatbro : player;
                     const shadowsan = character('sans', characters.sans, subbie.position.add(170, 0), 'right', {
                        tint: 0
                     });
                     await Promise.race([
                        timer.pause(200).then(() => shadowsan.walk(timer, 4, subbie.position.add(240, 0))),
                        events.on('teleport')
                     ]);
                     renderer.detach('main', shadowsan);
                  }
                  const comedy = async (target: CosmosPointSimple) => {
                     const zoom = 1.8;
                     const area = new CosmosValue(320);
                     const size = 320 / zoom;
                     const start = renderer.position.clamp(...renderer.region);
                     const region = renderer.region;
                     const duration = 266;
                     renderer.region = [
                        { x: -1000, y: -1000 },
                        { x: 1000, y: 1000 }
                     ];
                     game.camera = new CosmosObject({ position: start });
                     game.camera.position.modulate(timer, duration, target);
                     area.modulate(timer, duration, size);
                     while (area.value > size) {
                        renderer.zoom.value = 320 / area.value;
                        await timer.on('tick');
                     }
                     renderer.zoom.value = zoom;
                     assets.sounds.rimshot.instance(timer);
                     await timer.pause(850);
                     game.camera.position.modulate(timer, duration, start);
                     area.modulate(timer, duration, 320);
                     while (area.value < 320) {
                        renderer.zoom.value = 320 / area.value;
                        await timer.on('tick');
                     }
                     renderer.zoom.value = 1;
                     renderer.region = region;
                     game.camera = player;
                  };
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 520, y: 100 }
                  });
                  paps.face = 'right';
                  const papyturn = async () => {
                     assets.sounds.notify.instance(timer);
                     const notifier = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: renderer.projection(paps.position.subtract(0, 45)),
                        resources: content.ibuNotify
                     });
                     renderer.attach('menu', notifier);
                     paps.face = 'left';
                     await timer.pause(450);
                     renderer.detach('menu', notifier);
                  };
                  function cancel () {
                     if (game.room === 'w_exit') {
                        save.data.n.plot = 16;
                        roomState.active = false;
                        jeebs.gain.modulate(timer, 300, 0).then(() => jeebs.stop());
                        return true;
                     } else {
                        return false;
                     }
                  }
                  const stepLoader = content.asStep.load();
                  timer
                     .when(() => game.room === 'w_exit' || (game.room === 's_start' && player.position.x > 360))
                     .then(async () => {
                        if (cancel()) {
                           return;
                        }
                        shadowyboi();
                        jeebs.rate.modulate(timer, 500, 0.77);
                        await timer.when(
                           () => game.room === 'w_exit' || (game.room === 's_start' && player.position.x > 700)
                        );
                        if (cancel()) {
                           return;
                        }
                        shadowyboi();
                        jeebs.rate.modulate(timer, 500, 0.81);
                        await timer.when(() => game.room === 'w_exit' || game.room === 's_sans');
                        if (cancel()) {
                           return;
                        }
                        jeebs.rate.modulate(timer, 500, 0.85);
                        if (world.genocide) {
                           await timer.when(() => player.position.x > 190);
                           await timer.pause(650);
                        } else {
                           await timer.when(
                              () => game.room === 'w_exit' || (game.room === 's_sans' && player.position.x > 220)
                           );
                           if (cancel()) {
                              return;
                           }
                           game.movement = false;
                           jeebs.gain.modulate(timer, 200, 0);
                           jeebs.stop();
                        }
                        const sand = new CosmosCharacter({
                           preset: characters.sans,
                           tint: 0,
                           key: 'sans',
                           position: { x: 50, y: player.position.y },
                           anchor: { x: 0, y: 1 },
                           size: { x: 25, y: 5 },
                           metadata: {
                              name: 'starton',
                              args: [ 'sandinter' ],
                              barrier: void 0 as boolean | void,
                              interact: void 0 as boolean | void
                           }
                        });
                        renderer.attach('main', sand);
                        await Promise.all([ renderer.on('tick'), stepLoader ]);
                        if (world.genocide) {
                           await sand.walk(timer, 1, { x: 70 });
                           assets.sounds.notify.instance(timer).gain.value /= 3;
                           const notifier = new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              position: renderer.projection(sand.position.subtract(0, 32)),
                              resources: content.ibuNotify
                           });
                           renderer.attach('menu', notifier);
                           await timer.pause(450);
                           renderer.detach('menu', notifier);
                           sand.sprites.right.duration = 15;
                           sand.sprites.right.enable();
                           await sand.position.modulate(timer, 1e3, sand.position.subtract(10, 0));
                           sand.sprites.right.disable();
                           await timer.pause(650);
                           await sand.walk(timer, 4, { x: 35 });
                           renderer.detach('main', sand);
                        } else {
                           const whoopeeLoader = content.asWhoopee.load();
                           const muscleLoader = content.amMuscle.load();
                           const papyrusLoader = content.amPapyrus.load();
                           let lastFrame = 0;
                           const rightSprite = sand.sprites.right;
                           const animListener = () => {
                              rightSprite.index === lastFrame ||
                                 (lastFrame = rightSprite.index) % 2 > 0 ||
                                 assets.sounds.step.instance(timer);
                           };
                           sand.sprites.right.on('tick', animListener);
                           await sand.walk(timer, 1, { x: player.position.x - 23 });
                           sand.sprites.right.off('tick', animListener);
                           save.data.n.plot = 17.001;
                           await dialogue('auto', ...text.a_starton.sans1);
                           player.face = 'up';
                           await timer.pause(1e3);
                           player.face = 'left';
                           await timer.pause(350);
                           sand.alpha.value = 0;
                           const handshake = new CosmosAnimation({
                              anchor: { y: 1 },
                              position: { x: sand.position.x - 8.5, y: player.position.y },
                              resources: content.iocSansHandshake
                           });
                           renderer.attach('main', handshake);
                           await Promise.all([ whoopeeLoader, timer.pause(1150) ]);
                           player.alpha.value = 0;
                           handshake.index = 1;
                           assets.sounds.whoopee.instance(timer);
                           await Promise.all([ timer.pause(5750), muscleLoader ]);
                           renderer.detach('main', handshake);
                           sand.tint = void 0;
                           player.alpha.value = 1;
                           sand.alpha.value = 1;
                           const sansMusic = assets.music.muscle.instance(timer);
                           await dialogue('auto', ...text.a_starton.sans2);
                           renderer.attach('main', paps);
                           await Promise.all([
                              leap(sand, 850, 30, 410 - (player.position.x - sand.position.x)),
                              leap(player, 850, 30, 410)
                           ]);
                           content.asWhoopee.unload();
                           await timer.pause(350);
                           await dialogue('auto', ...text.a_starton.sans3);
                           await player.walk(timer, 3, { x: 415.5, y: 41 });
                           await timer.pause(450);
                           await player.walk(timer, 1, { y: 29.5 });
                           await timer.pause(300);
                           sand.face = 'up';
                           await timer.pause(150);
                           assets.sounds.equip.instance(timer).rate.value = 1.25;
                           player.position.y -= 15;
                           player.anchor.y = 0;
                           (player.objects[0] as CosmosAnimation).anchor.y = 0;
                           const destie1 = { x: player.position.x, y: -90 };
                           player.position.modulate(
                              timer,
                              1750,
                              player.position.value(),
                              player.position.value(),
                              destie1,
                              destie1,
                              destie1
                           );
                           timer.pause(150).then(async () => {
                              await player.rotation.modulate(timer, 1100, 0, 0, 0, 185);
                              await player.rotation.modulate(timer, 250, 185, 178);
                              await player.rotation.modulate(timer, 100, 178, 180);
                           });
                           sansMusic.gain.modulate(timer, 1500, 0).then(() => {
                              sansMusic.stop();
                              content.amMuscle.unload();
                           });
                           await timer.pause(1450);
                           sand.face = 'right';
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_starton.sans4);
                           const rimshotLoader = content.asRimshot.load();
                           await Promise.all([ papyturn(), papyrusLoader ]);
                           const papsMusic = assets.music.papyrus.instance(timer);
                           const listener = papyrusEmotes(paps);
                           typer.on('header', listener);
                           await Promise.all([ dialogue('auto', ...text.a_starton.sans5), rimshotLoader ]);
                           sand.preset = characters.sansSpecial;
                           sand.face = 'down';
                           await comedy(sand.position);
                           sand.preset = characters.sans;
                           sand.face = 'right';
                           await dialogue('auto', ...text.a_starton.sans6);
                           sand.preset = characters.sansSpecial;
                           sand.face = 'up';
                           await comedy(sand.position);
                           sand.preset = characters.sans;
                           sand.face = 'right';
                           await dialogue('auto', ...text.a_starton.sans7);
                           paps.talk = false;
                           await paps.walk(timer, 4, { x: 540 }, { x: 560, y: 80 }, { x: 590 });
                           await timer.pause(1e3);
                           await paps.walk(timer, 2, { x: 570 });
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_starton.sans8);
                           content.asRimshot.unload();
                           paps.talk = false;
                           paps.face = 'right';
                           papsMusic.gain.modulate(timer, 500, 0).then(() => {
                              papsMusic.stop();
                              content.amPapyrus.unload();
                           });
                           await timer.pause(150);
                           await paps.walk(timer, 4, { x: 600 });
                           renderer.detach('main', paps);
                           typer.off('header', listener);
                           await timer.pause(450);
                           await dialogue('auto', ...text.a_starton.sans9);
                           sand.face = 'up';
                           await timer.pause(150);
                           assets.sounds.equip.instance(timer).rate.value = 1.25;
                           const destie2 = { x: player.position.x, y: 27 };
                           timer
                              .pause(350)
                              .then(() =>
                                 player.position.modulate(
                                    timer,
                                    1750,
                                    player.position.value(),
                                    player.position.value(),
                                    destie2,
                                    destie2,
                                    destie2
                                 )
                              );
                           await player.rotation.modulate(timer, 1100, 180, 180, 180, -5);
                           await player.rotation.modulate(timer, 250, -5, 2);
                           await player.rotation.modulate(timer, 100, 2, 0);
                           await timer.pause(650);
                           timer.pause(200).then(async () => {
                              player.position.y += 15;
                              player.anchor.y = 1;
                              (player.objects[0] as CosmosAnimation).anchor.y = 1;
                              player.face = 'down';
                              if (!save.data.b.oops) {
                                 await dialogue('auto', ...text.a_starton.truetext.sans1);
                              }
                              game.movement = true;
                              resume({ gain: world.level, rate: world.ambiance });
                              isolate(sand);
                              sand.on('tick', function () {
                                 this.preset = game.room === 's_sans' ? characters.sans : characters.none;
                              });
                           });
                           await sand.walk(timer, 3, { x: 380, y: 40 });
                           sand.face = 'down';
                           sand.metadata.barrier = true;
                           sand.metadata.interact = true;
                           await timer.when(() => game.room === 's_sans' && player.position.x > 580);
                           game.movement = false;
                           await dialogue('auto', ...text.a_starton.sans10);
                           game.movement = true;
                           await Promise.race([
                              sand.walk(timer, 3, {
                                 x: renderer.projection(game.camera.position).x - 172.5,
                                 y: 60
                              }),
                              events.on('teleport')
                           ]);
                           renderer.detach('main', sand);
                        }
                     });
                  if (world.genocide) {
                     renderer.attach('main', goatbro);
                     const battleLoader = battler.load(groups.shockpapyrus);
                     game.movement = false;
                     goatbro.metadata.override = true;
                     goatbro.position = new CosmosPoint({ x: 60, y: 60 });
                     goatbro.face = 'down';
                     await timer.pause(1150);
                     await dialogue('auto', ...text.a_starton.genotext.asriel1());
                     await player.walk(timer, 3, { y: 90 });
                     goatbro.walk(timer, 3, { x: 990 }).then(() => {
                        goatbro.alpha.modulate(timer, 300, 0);
                     });
                     await player.walk(timer, 3, { y: 60 }, { x: 990 });
                     await teleport('s_sans', 'right', 20, 60, world);
                     goatbro.position = player.position.add(21, 0);
                     goatbro.alpha.value = 1;
                     await Promise.all([ player.walk(timer, 3, { x: 230 - 21 }), goatbro.walk(timer, 3, { x: 230 }) ]);
                     goatbro.face = 'left';
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_starton.genotext.asriel2);
                     await timer.pause(550);
                     jeebs.stop();
                     save.data.n.plot = 17.001;
                     await dialogue('auto', ...text.a_starton.genotext.asriel3());
                     const jams = assets.music.shock.instance(timer);
                     renderer.attach('main', paps);
                     await Promise.all([ leap(player, 550, 10, 490 - 21), leap(goatbro, 550, 10, 490) ]);
                     await timer.pause(750);
                     await dialogue('auto', ...text.a_starton.genotext.asriel4);
                     assets.sounds.notify.instance(timer);
                     const notifier = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: renderer.projection(paps.position.subtract(0, 45)),
                        resources: content.ibuNotify
                     });
                     renderer.attach('menu', notifier);
                     paps.face = 'left';
                     await timer.pause(450);
                     renderer.detach('menu', notifier);
                     await dialogue('auto', ...text.a_starton.genotext.asriel5);
                     await Promise.all([ battler.battlefall(player), battleLoader ]);
                     renderer.on('tick').then(() => {
                        battler.music = jams;
                     });
                     battler.start(groups.shockpapyrus);
                     await events.on('exit');
                     renderer.detach('main', paps);
                     await timer.pause(1350);
                     await dialogue('auto', ...text.a_starton.genotext.asriel6());
                     await goatbro.walk(
                        timer,
                        3,
                        { x: player.position.x, y: player.position.y + 21 },
                        { x: player.position.x - 21, y: player.position.y }
                     );
                     goatbro.face = 'right';
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.asriel7);
                     goatbro.metadata.override = false;
                     game.movement = true;
                     await timer.when(() => game.room === 's_sans' && player.position.x > 600);
                     game.movement = false;
                     if (save.data.n.plot < 17.1) {
                        save.data.n.plot = 17.1;
                        jams.gain.modulate(timer, 300, 0).then(() => {
                           jams.stop();
                        });
                        await teleport('s_crossroads', 'right', 20, 60, world);
                        game.movement = true;
                        game.music!.gain.modulate(timer, 300, world.level);
                     }
                  }
               }
            }
            break;
         case 's_sans':
            if (game.movement && player.metadata.s_jumptrap) {
               game.movement = false;
               const inverse = player.position.x > 260;
               await leap(player, 850, 30, void 0, inverse);
               player.metadata.s_jumptrap = false;
               game.movement = true;
            }
            break;
         case 's_human':
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 18) {
                  const papyrusLoader = content.amPapyrus.load();
                  if (world.genocide) {
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 60, y: 190 }
                     }).on('tick', function () {
                        if (save.data.n.plot < 18) {
                           this.preset = game.room === 's_human' ? characters.papyrus : characters.none;
                        }
                     });
                     isolate(paps);
                     paps.face = 'down';
                     renderer.attach('main', paps);
                     await timer.when(() => game.room === 's_human' && player.position.y > 50);
                     game.movement = false;
                     save.data.n.plot = 18;
                     if (save.flag.n.ga_asriel9++ < 1) {
                        await dialogue('auto', ...text.a_starton.genotext.asriel9);
                     }
                     game.music!.gain.value = 0;
                     assets.sounds.notify.instance(timer);
                     const notifier = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: renderer.projection(paps.position.subtract(0, 45)),
                        resources: content.ibuNotify
                     });
                     renderer.attach('menu', notifier);
                     paps.face = 'up';
                     await Promise.all([ timer.pause(450), papyrusLoader ]);
                     renderer.detach('menu', notifier);
                     const papsMusic = assets.music.papyrus.instance(timer);
                     papsMusic.rate.value = 0.325;
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo1a());
                     papsMusic.gain.modulate(timer, 1500, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     paps.walk(timer, 4, { y: 230 }).then(async () => {
                        await paps.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_starton.genotext.asriel10());
                     game.movement = true;
                     game.music!.gain.value = world.level;
                  } else {
                     let spin = false;
                     const swapSpeed = new CosmosValue();
                     const random3 = random.clone();
                     const spinnerListener = () => {
                        let tick = 0;
                        return function (this: CosmosEntity) {
                           if (spin) {
                              if (random3.next() < 0.6) {
                                 this.face = [ 'left', 'down', 'right', 'up' ][
                                    Math.floor(random3.next() * 4)
                                 ] as CosmosDirection;
                              }
                           } else if (swapSpeed.value > 0) {
                              if (tick++ > CosmosMath.remap(swapSpeed.value, 30, 0)) {
                                 tick = 0;
                                 this.face = (
                                    {
                                       up: this === sand ? 'right' : 'left',
                                       left: 'up',
                                       right: 'up'
                                    } as CosmosKeyed<CosmosDirection, CosmosDirection>
                                 )[this.face];
                              }
                           }
                        };
                     };
                     const sand = new CosmosCharacter({
                        preset: characters.sans,
                        key: 'sans',
                        position: { x: 55, y: 190 }
                     })
                        .on('tick', spinnerListener())
                        .on('tick', function () {
                           if (save.data.n.plot < 18) {
                              this.preset = game.room === 's_human' ? characters.sans : characters.none;
                           }
                        });
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 85, y: 190 }
                     })
                        .on('tick', spinnerListener())
                        .on('tick', function () {
                           if (save.data.n.plot < 18) {
                              this.preset = game.room === 's_human' ? characters.papyrus : characters.none;
                           }
                        });
                     isolate(sand);
                     isolate(paps);
                     sand.face = 'right';
                     paps.face = 'left';
                     renderer.attach('main', sand);
                     renderer.attach('main', paps);
                     await timer.when(() => game.room === 's_human' && player.position.y > 50);
                     game.movement = false;
                     save.data.n.plot = 18;
                     game.music!.gain.modulate(timer, 300, 0);
                     await Promise.all([ dialogue('auto', ...text.a_starton.papyrus1), papyrusLoader ]);
                     const papsMusic = assets.music.papyrus.instance(timer);
                     sand.face = 'up';
                     await swapSpeed.modulate(timer, 6e3, 1);
                     spin = true;
                     await timer.pause(2500);
                     spin = false;
                     swapSpeed.value = 0;
                     sand.face = 'up';
                     paps.face = 'up';
                     await timer.pause(650);
                     paps.face = 'left';
                     sand.face = 'right';
                     await timer.pause(450);
                     await dialogue('auto', ...text.a_starton.papyrus2);
                     sand.face = 'up';
                     paps.face = 'up';
                     await timer.pause(950);
                     await dialogue('auto', ...text.a_starton.papyrus3);
                     papsMusic.gain.modulate(timer, 1500, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     paps.walk(timer, 4, { y: 230 }).then(async () => {
                        await paps.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     await dialogue('auto', ...text.a_starton.papyrus4);
                     await sand.walk(timer, 3, player.position.add(0, 20));
                     await dialogue('auto', ...text.a_starton.papyrus5);
                     sand
                        .walk(timer, 4, { x: player.position.x + (player.position.x < 70 ? 25 : -25) }, { y: 5 })
                        .then(async () => {
                           await sand.alpha.modulate(timer, 300, 0);
                        })
                        .then(() => {
                           renderer.detach('main', sand);
                        });
                     game.movement = true;
                     game.music!.gain.value = world.level;
                  }
               }
            }
            break;
         case 's_papyrus':
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && save.data.n.plot < 18.1 && save.flag.n.ga_asriel11 < 3) {
                  await timer.when(() => game.room === 's_papyrus' && player.position.y > 120);
                  game.movement = false;
                  save.data.n.plot = 18.1;
                  await timer.pause(650);
                  switch (save.flag.n.ga_asriel11++) {
                     case 0:
                        await dialogue('auto', ...text.a_starton.genotext.asriel11);
                        break;
                     case 1:
                        await dialogue('auto', ...text.a_starton.genotext.asriel11a);
                        break;
                     case 2:
                        await dialogue('auto', ...text.a_starton.genotext.asriel11b);
                        break;
                  }
                  game.movement = true;
                  game.music!.gain.value = world.level;
               }
            }
            break;
         case 's_doggo':
            sas({ x: 40, y: 40 }, 19);
            break;
         case 's_maze': {
            if (!instance('main', 'papfire')?.object.metadata.active) {
               if (save.data.n.plot < 20 || world.genocide) {
                  let frame = 0;
                  let previousGen: number;
                  const cycles = CosmosUtils.populate(7, () => {
                     if (typeof previousGen === 'number') {
                        return (previousGen = (previousGen + Math.floor(random.next() * 5) + 12) % 14);
                     } else {
                        return (previousGen = Math.floor(random.next() * 14));
                     }
                  });
                  roomState.cycles = cycles;
                  for (const fire of instances('main', 'papfire')) {
                     fire.object.metadata.active = true;
                     const anim = fire.object.objects[0] as CosmosAnimation;
                     anim.index = (frame += 4) % 5;
                     const indicies = fire.object.position.subtract(100, 35).divide(20, 10);
                     anim.on('tick', () => {
                        anim.alpha.value =
                           roomState.fail ||
                           !roomState.ablaze ||
                           [ 0, 1, 13 ].includes(Math.abs(cycles[indicies.x] - indicies.y))
                              ? 0
                              : 1;
                     });
                     if (indicies.y === 0) {
                        let shift = 0;
                        fire.object.on('tick', () => {
                           if (++shift === 15) {
                              shift = 0;
                              if (indicies.x % 2 === 0) {
                                 if (++cycles[indicies.x] === 14) {
                                    cycles[indicies.x] = 0;
                                 }
                              } else {
                                 if (--cycles[indicies.x] === -1) {
                                    cycles[indicies.x] = 13;
                                 }
                              }
                           }
                        });
                     }
                  }
               } else {
                  for (const fire of instances('main', 'papfire')) {
                     fire.object.metadata.active = true;
                     fire.object.objects = [];
                  }
               }
            }
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 20 && !world.genocide) {
                  const papyrusLoader = content.amPapyrus.load();
                  const rimshotLoader = content.asRimshot.load();
                  let idle = true;
                  const sand = new CosmosCharacter({
                     preset: characters.sans,
                     key: 'sans',
                     position: { x: 270, y: 80 }
                  }).on('tick', function () {
                     if (idle) {
                        this.preset = game.room === 's_maze' ? characters.sans : characters.none;
                     }
                  });
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 270, y: 120 }
                  }).on('tick', function () {
                     if (idle) {
                        this.preset = game.room === 's_maze' ? characters.papyrus : characters.none;
                     }
                  });
                  isolate(sand);
                  isolate(paps);
                  sand.face = 'right';
                  paps.face = 'right';
                  renderer.attach('main', sand, paps);
                  await timer.when(() => game.room === 's_maze' && player.position.x > 60);
                  idle = false;
                  game.movement = false;
                  game.music!.gain.modulate(timer, 300, 0);
                  await timer.pause(450);
                  sand.face = 'left';
                  paps.face = 'left';
                  await Promise.all([ timer.pause(850), papyrusLoader ]);
                  const papsMusic = assets.music.papyrus.instance(timer);
                  const papListener = papyrusEmotes(paps);
                  typer.on('header', papListener);
                  await dialogue('auto', ...text.a_starton.maze1);
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.maze2a, text.a_starton.maze2b ][choicer.result],
                     ...text.a_starton.maze3
                  );
                  await timer.pause(450);
                  assets.sounds.noise.instance(timer);
                  roomState.ablaze = true;
                  await timer.pause(850);
                  await Promise.all([ rimshotLoader, dialogue('auto', ...text.a_starton.maze3a) ]);
                  sand.preset = characters.sansSpecial;
                  sand.face = 'down';
                  {
                     const target = sand.position;
                     const zoom = 1.8;
                     const area = new CosmosValue(320);
                     const size = 320 / zoom;
                     const start = renderer.position.clamp(...renderer.region);
                     const region = renderer.region;
                     const duration = 266;
                     renderer.region = [
                        { x: -1000, y: -1000 },
                        { x: 1000, y: 1000 }
                     ];
                     game.camera = new CosmosObject({ position: start });
                     game.camera.position.modulate(timer, duration, target);
                     area.modulate(timer, duration, size);
                     while (area.value > size) {
                        renderer.zoom.value = 320 / area.value;
                        await timer.on('tick');
                     }
                     renderer.zoom.value = zoom;
                     const rimmer = assets.sounds.rimshot.instance(timer);
                     await timer.pause(450);
                     rimmer.stop();
                     content.asRimshot.unload();
                     renderer.zoom.value = 1;
                     renderer.region = region;
                     game.camera = player;
                  }
                  await dialogue('auto', ...text.a_starton.maze4);
                  sand.preset = characters.sans;
                  sand.face = 'left';
                  await dialogue('auto', ...text.a_starton.maze5);
                  game.movement = true;
                  let targetTime = timer.value + 5e3;
                  const exitStopper = async () => {
                     if (game.movement && player.position.x < 25) {
                        targetTime = Infinity;
                        await dialogue('auto', ...text.a_starton.maze6());
                        targetTime = timer.value + 3e3;
                        {
                           paps.preset = characters.papyrus;
                           paps.face = 'left';
                           paps.talk = true;
                        }
                        player.position.x += 3;
                        player.face = 'right';
                     }
                  };
                  renderer.on('tick', exitStopper);
                  (async () => {
                     let waits = 0;
                     while (waits < text.a_starton.maze7.length) {
                        await timer.when(() => timer.value > targetTime);
                        if (roomState.ablaze && !roomState.step) {
                           await timer.when(() => game.movement);
                           await dialogue('auto', ...text.a_starton.maze7[waits++]);
                           targetTime = timer.value + 5e3;
                        }
                     }
                  })();
                  await timer.when(() => roomState.fail || player.position.x > 240);
                  if (roomState.fail) {
                     save.data.b.papyrus_fire = true;
                  }
                  game.movement = false;
                  save.data.n.plot = 20;
                  assets.sounds.noise.instance(timer);
                  roomState.ablaze = false;
                  await dialogue(
                     'auto',
                     ...(roomState.fail ? text.a_starton.maze8 : text.a_starton.maze9),
                     ...text.a_starton.maze10
                  );
                  paps.preset = characters.papyrus;
                  renderer.off('tick', exitStopper);
                  typer.off('header', papListener);
                  papsMusic.gain.modulate(timer, 1000, 0).then(() => {
                     papsMusic.stop();
                     content.amPapyrus.unload();
                  });
                  await paps.walk(timer, 4, { x: 340 });
                  await timer.pause(1e3);
                  paps.preset = characters.papyrusMad;
                  await paps.walk(timer, 2, { x: 300 });
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_starton.maze11);
                  await timer.pause(150);
                  Promise.all([ paps.walk(timer, 4, { x: 340 }), sand.walk(timer, 4, { x: 340 }) ]).then(() => {
                     renderer.detach('main', sand, paps);
                  });
                  if (!save.data.b.oops) {
                     await dialogue(
                        'auto',
                        ...(roomState.fail ? text.a_starton.truetext.sans3 : text.a_starton.truetext.sans4)
                     );
                  }
                  game.movement = true;
                  game.music!.gain.value = world.level;
               }
            }
            break;
         }
         case 's_stand': {
            {
               const inst = instance('main', 's_nicecream');
               // moved to next area
               if (save.data.n.plot > 37) {
                  inst?.destroy();
                  instance('below', 'xtrabarrier')?.destroy();
               } else if (inst && !inst.object.metadata.active) {
                  inst.object.metadata.active = true;
                  const guyanim = inst.object.objects[0] as CosmosAnimation;
                  // fled from current area
                  if (world.genocide || save.data.n.kills_starton + save.data.n.bully_starton > 2) {
                     guyanim.index = 3;
                  } else {
                     // purchased a nice cream
                     save.data.n.state_starton_nicecream < 1 || (guyanim.index = 2);
                  }
               }
            }
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && save.data.n.plot < 20.1 && save.flag.n.ga_asriel11 < 1) {
                  await timer.when(() => game.room === 's_stand' && player.position.x > 80);
                  game.movement = false;
                  save.data.n.plot = 20.1;
                  await dialogue('auto', ...text.a_starton.genotext.asriel14);
                  goatbro.metadata.override = true;
                  goatbro.face = 'left';
                  goatbro.sprite.disable();
                  await timer.pause(350);
                  goatbro.face = 'down';
                  goatbro.sprite.disable();
                  await timer.pause(650);
                  goatbro.face = 'up';
                  goatbro.sprite.disable();
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_starton.genotext.asriel15a);
                  goatbro.face = 'right';
                  goatbro.sprite.disable();
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_starton.genotext.asriel15b);
                  goatbro.metadata.override = false;
                  game.movement = true;
               }
            }
            break;
         }
         case 's_dogs': {
            sas({ x: 35, y: 65 }, 20.2);
            break;
         }
         case 's_lesser': {
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 20.2) {
                  let enc = null as Promise<void> | null;
                  await timer.when(() => {
                     if (save.data.b.s_state_lesser) {
                        enc = timer.when(() => !battler.active && game.movement);
                        return true;
                     } else if (game.room === 's_lesser' && player.position.y > 210) {
                        enc = battler.encounter(player, groups.lesserdog);
                        return true;
                     } else {
                        return false;
                     }
                  });
                  await enc;
                  save.data.n.plot = 20.2;
                  if (!save.data.b.oops) {
                     if (save.data.n.state_starton_doggo < 1 || save.data.n.state_starton_lesserdog < 1) {
                        if (save.data.n.state_starton_lesserdog === 0) {
                           await dialogue('auto', ...text.a_starton.truetext.lesser1());
                        } else {
                           await dialogue('auto', ...text.a_starton.truetext.fetch());
                        }
                     } else {
                        await dialogue('auto', ...text.a_starton.truetext.lesser2);
                     }
                  }
                  game.music!.gain.modulate(timer, 300, world.level);
               }
            }
            break;
         }
         case 's_bros':
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 21) {
                  const muscleLoader = content.amPapyrus.load();
                  if (world.genocide) {
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 60, y: 150 }
                     }).on('tick', function () {
                        if (save.data.n.plot < 21) {
                           this.preset = game.room === 's_bros' ? characters.papyrus : characters.none;
                        }
                     });
                     isolate(paps);
                     paps.face = 'up';
                     renderer.attach('main', paps);
                     await timer.when(() => game.room === 's_bros' && player.position.y > 50);
                     game.movement = false;
                     save.data.n.plot = 21;
                     game.music && game.music.gain.modulate(timer, 300, 0);
                     await Promise.all([ timer.pause(650), muscleLoader ]);
                     const papsMusic = assets.music.papyrus.instance(timer);
                     papsMusic.rate.value = 0.325;
                     await timer.pause(450);
                     await dialogue('dialoguerBottom', ...text.a_starton.genotext.papyrusSolo2a);
                     paps.preset = characters.papyrusMad;
                     paps.walk(timer, 4, { y: 230 }).then(async () => {
                        await paps.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     papsMusic.gain.modulate(timer, 1500, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     await timer.pause(1150);
                     await dialogue('dialoguerBottom', ...text.a_starton.genotext.asriel17());
                     game.movement = true;
                     game.music!.gain.value = world.level;
                     save.data.n.plot = 21.1;
                  } else {
                     const sand = new CosmosCharacter({
                        preset: characters.sans,
                        key: 'sans',
                        position: { x: 45, y: 190 },
                        anchor: { x: 0, y: 1 },
                        size: { x: 25, y: 5 },
                        metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                     }).on('tick', function () {
                        if (save.data.n.plot < 21) {
                           this.preset = game.room === 's_bros' ? characters.sans : characters.none;
                        }
                     });
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 75, y: 190 }
                     }).on('tick', function () {
                        if (save.data.n.plot < 21) {
                           this.preset = game.room === 's_bros' ? characters.papyrus : characters.none;
                        }
                     });
                     const crossword = new CosmosHitbox({
                        anchor: 0,
                        size: { x: 15, y: 20 },
                        metadata: { interact: true, name: 'starton', args: [ 'crossword' ] },
                        position: { x: 60, y: 120 },
                        priority: -9999,
                        objects: [
                           new CosmosSprite({ anchor: 0, frames: [ content.iooSCrossword ] }).on('tick', function () {
                              if (save.data.n.plot < 21) {
                                 this.frames = game.room === 's_bros' ? [ content.iooSCrossword ] : [];
                              }
                           })
                        ]
                     });
                     isolate(sand);
                     isolate(paps);
                     isolate(crossword);
                     sand.face = 'up';
                     paps.face = 'up';
                     renderer.attach('main', sand, paps, crossword);
                     await timer.when(() => game.room === 's_bros' && player.position.y > 50);
                     game.movement = false;
                     save.data.n.plot = 21;
                     await game.music!.gain.modulate(timer, 850, 0);
                     await dialogue('auto', ...text.a_starton.crossword0);
                     await Promise.all([ timer.pause(450), muscleLoader ]);
                     paps.face = 'left';
                     sand.face = 'right';
                     const sansMusic = assets.music.papyrus.instance(timer);
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_starton.crossword1);
                     sand.face = 'up';
                     paps.face = 'up';
                     const exitStopper = async () => {
                        if (game.movement && player.position.y < 25) {
                           await dialogue('auto', ...text.a_starton.crossword4());
                           player.position.y += 3;
                           player.face = 'down';
                        }
                     };
                     renderer.on('tick', exitStopper);
                     game.movement = true;
                     await timer.when(() => player.position.y > 165);
                     renderer.off('tick', exitStopper);
                     game.movement = false;
                     await dialogue('auto', ...text.a_starton.crossword2);
                     await dialogue(
                        'auto',
                        ...[ text.a_starton.crossword3a, text.a_starton.crossword3b ][choicer.result]
                     );
                     sansMusic.gain.modulate(timer, 650, 0).then(() => {
                        sansMusic.stop();
                        content.amMuscle.unload();
                     });
                     paps.walk(timer, 4, { y: 230 }).then(async () => {
                        await paps.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     await timer.pause(850);
                     if (!save.data.b.oops) {
                        await dialogue(
                           'auto',
                           ...(roomState.checked ? text.a_starton.truetext.sans6 : text.a_starton.truetext.sans5)
                        );
                        if (!roomState.checked) {
                           timer
                              .when(() => game.movement && roomState.checked)
                              .then(() => {
                                 dialogue('auto', ...text.a_starton.truetext.sans6);
                              });
                        }
                     }
                     roomState.choice = choicer.result;
                     game.movement = true;
                     game.music!.gain.value = world.level;
                     sand.walk(timer, 3, { x: 40, y: 25 }).then(() => {
                        sand.face = 'down';
                     });
                     await events.on('teleport');
                     renderer.detach('main', crossword, sand);
                  }
               }
            }
            break;
         case 's_spaghetti':
            world.genocide && instance('main', 's_spagnote')?.destroy();
            const spag = instance('main', 'spagheddy');
            if (spag && !spag.object.metadata.active) {
               spag.object.metadata.active = true;
               const theEpic = spag.object.objects[0] as CosmosSprite;
               const baseY = theEpic.position.y;
               if (world.genocide) {
                  theEpic.alpha.value = 0;
               } else if (save.data.n.state_starton_spaghetti < 1) {
                  const time = timer.value;
                  theEpic.on('tick', () => {
                     if (save.data.n.state_starton_spaghetti > 0) {
                        if (!theEpic.metadata.falling) {
                           theEpic.metadata.falling = true;
                           theEpic.position
                              .modulate(timer, 450, theEpic.position.value(), theEpic.position.value(), {
                                 x: theEpic.position.x,
                                 y: baseY + 4
                              })
                              .then(async () => {
                                 assets.sounds.landing.instance(timer);
                                 await shake(2, 500);
                              });
                           timer
                              .when(() => save.data.n.state_starton_spaghetti > 1)
                              .then(() => {
                                 theEpic.alpha.value = 0;
                              });
                        }
                     } else {
                        theEpic.position.y = baseY - 2 - CosmosMath.wave(((timer.value - time) % 3500) / 3500) * 4;
                     }
                  });
               } else if (save.data.n.state_starton_spaghetti < 2) {
                  theEpic.position.y = baseY + 4;
                  timer
                     .when(() => save.data.n.state_starton_spaghetti > 1)
                     .then(() => {
                        theEpic.alpha.value = 0;
                     });
               } else {
                  theEpic.alpha.value = 0;
               }
            }
            break;
         case 's_math':
            if (save.data.n.plot > 21.2 && !roomState.unlocked) {
               roomState.unlocked = true;
               const parent = instance('main', 'lasercheckpoint')!.object;
               for (const object of parent.objects) {
                  if (object instanceof CosmosAnimation) {
                     object.alpha.value = 0;
                  } else if (object.metadata.barrier === true) {
                     object.metadata.barrier = false;
                  }
               }
               break;
            }
            break;
         case 's_puzzle1': {
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 23) {
                  const bassLoader = world.genocide ? content.amDogbeat.load() : content.amDogbass.load();
                  const battleLoader = battler.load(groups.dogs);
                  game.music!.gain.modulate(timer, 300, 0);
                  game.movement = false;
                  save.data.n.plot = 23;
                  player.walk(timer, 3, { x: 80, y: 80 }).then(async () => {
                     const mandog = new CosmosEntity({
                        alpha: 0,
                        sprites: {
                           down: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogamy,
                              extrapolate: false
                           }),
                           left: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogamy,
                              extrapolate: false
                           }),
                           right: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogamy,
                              extrapolate: false
                           }),
                           up: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogamy,
                              extrapolate: false
                           })
                        },
                        position: { x: 220, y: 90 }
                     });
                     const womandog = new CosmosEntity({
                        alpha: 0,
                        sprites: {
                           down: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogaressa,
                              extrapolate: false
                           }),
                           left: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogaressa,
                              extrapolate: false
                           }),
                           right: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogaressa,
                              extrapolate: false
                           }),
                           up: new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              resources: content.ionSDogaressa,
                              extrapolate: false
                           })
                        },
                        position: { x: 220, y: 70 }
                     });
                     renderer.attach('main', mandog, womandog);
                     await Promise.all([
                        mandog.alpha.modulate(timer, 300, 1).then(async () => {
                           await mandog.walk(timer, 4, { x: 80 });
                           await mandog.walk(timer, 2, { x: 60 }, { x: 50, y: 80 });
                        }),
                        womandog.alpha.modulate(timer, 300, 1).then(async () => {
                           await womandog.walk(timer, 4, { x: 80 });
                           await womandog.walk(timer, 2, { x: 100 }, { x: 110, y: 80 });
                        })
                     ]);
                     await Promise.all([
                        bassLoader,
                        dialogue('auto', ...(world.genocide ? text.a_starton.marriage4 : text.a_starton.marriage1))
                     ]);
                     world.genocide ? assets.music.dogbeat.instance(timer) : assets.music.dogbass.instance(timer);
                     await Promise.all([
                        mandog.walk(
                           timer,
                           3,
                           { y: 60 },
                           { x: 30 },
                           { y: 80 },
                           { x: 50, y: 60 },
                           { x: 110 },
                           { y: 110 },
                           { x: 30 },
                           { x: 10, y: 80 },
                           { x: 50, y: 40 },
                           { y: 80 }
                        ),
                        womandog.walk(
                           timer,
                           3,
                           { x: 150 },
                           { y: 100 },
                           { x: 110, y: 80 },
                           { y: 110 },
                           { x: 70 },
                           { y: 40 },
                           { x: 90 },
                           { y: 20 },
                           { x: 100 },
                           { y: 40 },
                           { x: 120 },
                           { y: 60 },
                           { x: 110 },
                           { y: 80 }
                        )
                     ]);
                     await dialogue('auto', ...(world.genocide ? text.a_starton.marriage5 : text.a_starton.marriage2));
                     await Promise.all([ battler.battlefall(player), battleLoader ]);
                     world.genocide ? content.amDogbeat.unload() : content.amDogbass.unload();
                     await battler.start(groups.dogs);
                     if (save.data.n.state_starton_dogs < 2) {
                        if (save.data.n.state_starton_dogs === 0) {
                           await dialogue('auto', ...text.a_starton.marriage3a);
                        } else {
                           await dialogue('auto', ...text.a_starton.marriage3b);
                        }
                        isolate(mandog);
                        isolate(womandog);
                        (async () => {
                           if (!save.data.b.oops) {
                              if (
                                 save.data.n.state_starton_doggo < 1 ||
                                 save.data.n.state_starton_lesserdog < 1 ||
                                 save.data.n.state_starton_dogs < 1
                              ) {
                                 if (save.data.n.state_starton_dogs === 0) {
                                    await dialogue('auto', ...text.a_starton.truetext.dogs1);
                                 } else {
                                    await dialogue('auto', ...text.a_starton.truetext.fetch());
                                 }
                              } else {
                                 await dialogue('auto', ...text.a_starton.truetext.dogs2);
                              }
                           }
                           game.movement = true;
                           await events.on('teleport');
                           game.music!.gain.modulate(timer, 300, world.level);
                        })();
                        await Promise.race([
                           events.on('teleport'),
                           Promise.all([
                              mandog.walk(timer, 4, { x: 62.5, y: 255 }).then(async () => {
                                 await mandog.alpha.modulate(timer, 300, 0);
                              }),
                              womandog.walk(timer, 4, { x: 97.5, y: 255 }).then(async () => {
                                 await womandog.alpha.modulate(timer, 300, 0);
                              })
                           ])
                        ]);
                     } else {
                        game.movement = true;
                     }
                     game.music!.gain.modulate(timer, 300, world.level);
                     renderer.detach('main', mandog);
                     renderer.detach('main', womandog);
                  });
               }
            }
            if (!world.genocide && !roomState.papyrus && save.data.n.state_papyrus_spaghet < 1) {
               roomState.papyrus = true;
               const paps = new CosmosCharacter({
                  preset: characters.papyrus,
                  key: 'papyrus',
                  position: { x: 565, y: 80 },
                  face: 'right'
               }).on('tick', function () {
                  this.preset = game.room === 's_puzzle1' ? characters.papyrus : characters.none;
               });
               isolate(paps);
               renderer.attach('main', paps);
               await timer.when(
                  () => game.room === 's_puzzle1' && player.position.extentOf(paps.position) < 50 && game.movement
               );
               game.movement = false;
               assets.sounds.notify.instance(timer);
               const notifier = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: renderer.projection(paps.position.subtract(0, 45)),
                  resources: content.ibuNotify
               });
               renderer.attach('menu', notifier);
               paps.face = 'left';
               await timer.pause(450);
               renderer.detach('menu', notifier);
               if (save.storage.inventory.contents.includes('spaghetti')) {
                  await dialogue('auto', ...text.a_starton.papspaghet1a);
               } else {
                  await dialogue('auto', ...text.a_starton.papspaghet1);
               }
               save.data.n.state_papyrus_spaghet = (choicer.result + 1) as 1 | 2;
               await dialogue('auto', ...[ text.a_starton.papspaghet2a, text.a_starton.papspaghet2b ][choicer.result]);
               paps.walk(timer, 4, { x: 590 }).then(async () => {
                  await paps.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', paps);
               });
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_starton.truetext.papyrus1);
               }
               game.movement = true;
            }
         }
         case 's_puzzle2': {
            if (game.room === 's_puzzle2' && !world.genocide) {
               let paps: CosmosCharacter;
               if (!roomState.papyrus) {
                  const sand = new CosmosCharacter({
                     preset: characters.sans,
                     key: 'sans',
                     position: { x: 220, y: 65 },
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                  }).on('tick', function () {
                     this.preset = game.room === 's_puzzle2' ? characters.sans : characters.none;
                  });
                  roomState.papyrus = true;
                  if (save.data.n.plot < 25) {
                     paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: save.data.n.plot < 24.1 ? { x: 75, y: 100 } : { x: 230, y: 25 },
                        anchor: { x: 0, y: 1 },
                        size: { x: 25, y: 5 },
                        metadata: { interact: true, barrier: true, name: 'starton', args: [ 'papsinter' ] }
                     }).on('tick', function () {
                        this.preset = game.room === 's_puzzle2' ? characters.papyrus : characters.none;
                     });
                  } else {
                     break;
                  }
                  paps.face = save.data.n.plot < 24.1 ? 'left' : 'down';
                  isolate(paps);
                  renderer.attach('main', paps);
                  if (save.data.n.plot < 24.1) {
                     await timer.when(() => game.room === 's_puzzle2' && player.position.x > 75);
                     game.movement = false;
                     save.data.n.plot = 24.1;
                     await paps.walk(timer, 4, { x: 230, y: 25 });
                     paps.face = 'down';
                     await dialogue('dialoguerBottom', ...text.a_starton.pappuzzle1);
                     game.movement = true;
                  }
                  let prevplot = save.data.n.plot;
                  await timer.when(() => {
                     if (save.data.n.plot < 25) {
                        prevplot = save.data.n.plot;
                        return false;
                     } else {
                        return true;
                     }
                  });
                  game.movement = false;
                  await dialogue('auto', ...text.a_starton.pappuzzle2);
                  if (prevplot > 24.11 && roomState.trickswitch) {
                     await dialogue('auto', ...text.a_starton.pappuzzle2b);
                  } else {
                     await dialogue('auto', ...text.a_starton.pappuzzle2a);
                  }
                  await dialogue('auto', ...text.a_starton.pappuzzle2c);
                  paps.walk(timer, 4, { x: 490, y: 100 }).then(async () => {
                     await paps.alpha.modulate(timer, 300, 0);
                     renderer.detach('main', paps);
                  });
                  game.movement = true;
                  events.on('teleport').then(() => {
                     renderer.detach('main', sand);
                  });
               }
            }
         }
         case 's_puzzle3': {
            if (
               roomState.unlocked ||
               save.data.n.plot < (game.room === 's_puzzle1' ? 24 : game.room === 's_puzzle2' ? 25 : 27)
            ) {
               return;
            }
            roomState.unlocked = true;
            const parent = instance('main', 'lasercheckpoint')!.object;
            for (const object of parent.objects) {
               if (object instanceof CosmosAnimation) {
                  object.alpha.value = 0;
               } else if (object.metadata.barrier === true) {
                  object.metadata.barrier = false;
               }
            }
            if (!roomState.bypass && game.room !== 's_puzzle3') {
               const puzzle = instance('main', 'puzzlechip')?.object.objects[0] as CosmosAnimation;
               if (puzzle) {
                  roomState.bypass = true;
                  await puzzle.on('tick');
                  puzzle.index = puzzle.frames.length - 3;
               }
            }
            break;
         }
         case 's_jenga': {
            const puzzlenote = instance('main', 'puzzlenote')!.object;
            if (!puzzlenote.metadata.active) {
               puzzlenote.metadata.active = true;
               puzzlenote.on('tick', () => {
                  if (save.data.b.s_state_puzzlenote) {
                     puzzlenote.position.y = 0;
                  } else {
                     puzzlenote.position.y = -1000;
                  }
               });
            }
            if (!roomState.active && save.data.n.plot < 26) {
               roomState.active = true;
               const thePuzzle = async (paps: CosmosCharacter, papsMusic: CosmosInstance, xdiag = true) => {
                  const random3 = random.clone();
                  const compooterLoader = content.asComputer.load();
                  xdiag && (await dialogue('auto', ...text.a_starton.papyrus9));
                  await paps.walk(timer, 4, { x: 160 });
                  paps.face = 'up';
                  await Promise.all([ timer.pause(650), compooterLoader ]);
                  assets.sounds.equip.instance(timer).rate.value = 1.25;
                  timer.pause(950).then(async () => {
                     await paps.walk(timer, 4, { x: 220 });
                     paps.face = 'left';
                  });
                  const textie = new CosmosText({
                     fill: 'white',
                     alpha: 0.8,
                     charset: '0123456789',
                     anchor: 0,
                     spacing: { x: -2 },
                     font: '20px Papyrus',
                     position: { x: 21, y: 6.25 }
                  });
                  const smol = new CosmosSprite({
                     priority: 9999,
                     position: { x: 141, y: -29 },
                     frames: [ content.iooSSmallscreen ],
                     objects: [ textie ]
                  });
                  renderer.attach('main', smol);
                  const compooter = assets.sounds.computer.instance(timer);
                  const power = new CosmosValue();
                  papsMusic.gain.value /= 2;
                  power.modulate(timer, 10e3, 10);
                  while (power.value < 10) {
                     textie.content = Math.floor(random3.next() * 999).toString();
                     compooter.rate.value = 1 + power.value / 20;
                     await timer.pause(1e3 / (Math.max(power.value, 1) * 3));
                  }
                  compooter.stop();
                  content.asComputer.unload();
                  textie.content = '0';
                  papsMusic.stop();
                  content.amPapyrus.unload();
                  await timer.pause(1650);
                  events.on('teleport').then(() => {
                     renderer.detach('main', smol);
                  });
               };
               const papyrusLoader = content.amPapyrus.load();
               if (world.genocide) {
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 220, y: 80 }
                  }).on('tick', function () {
                     if (save.data.n.plot < 26) {
                        this.preset = game.room === 's_jenga' ? characters.papyrus : characters.none;
                     }
                  });
                  isolate(paps);
                  paps.face = 'left';
                  renderer.attach('main', paps);
                  await timer.when(() => game.room === 's_jenga' && player.position.x > 100);
                  game.movement = false;
                  save.data.n.plot = 26;
                  await Promise.all([ game.music!.gain.modulate(timer, 300, 0), papyrusLoader ]);
                  const papsMusic = assets.music.papyrus.instance(timer);
                  papsMusic.rate.value = 0.325;
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_starton.genotext.papyrusSolo3a);
                  await thePuzzle(paps, papsMusic, false);
                  CosmosUtils.chain(void 0, async (none, next) => {
                     if (paps.position.x < 310) {
                        paps.face = (
                           { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                              CosmosDirection,
                              CosmosDirection
                           >
                        )[paps.face];
                        await timer.pause(100);
                        next(void 0);
                     }
                  });
                  while (paps.position.y < 80) {
                     paps.position.y += 2;
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  while (paps.position.x < 310) {
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  await paps.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', paps);
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_starton.genotext.asriel24());
                  game.movement = true;
                  game.music!.gain.value = world.level;
               } else {
                  const sand = new CosmosCharacter({
                     preset: characters.sans,
                     key: 'sans',
                     position: { x: 220, y: 65 },
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                  }).on('tick', function () {
                     if (save.data.n.plot < 26) {
                        this.preset = game.room === 's_jenga' ? characters.sans : characters.none;
                     }
                  });
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 220, y: 105 }
                  }).on('tick', function () {
                     if (save.data.n.plot < 26) {
                        this.preset = game.room === 's_jenga' ? characters.papyrus : characters.none;
                     }
                  });
                  isolate(sand);
                  isolate(paps);
                  sand.face = 'left';
                  paps.face = 'left';
                  renderer.attach('main', sand);
                  renderer.attach('main', paps);
                  await timer.when(() => game.room === 's_jenga' && player.position.x > 100);
                  game.movement = false;
                  save.data.n.plot = 26;
                  await Promise.all([ game.music!.gain.modulate(timer, 300, 0), papyrusLoader ]);
                  const papsMusic = assets.music.papyrus.instance(timer);
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_starton.papyrus6);
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_starton.papyrus7);
                  }
                  papsMusic.gain.modulate(timer, 1500, 0).then(() => {
                     papsMusic.stop();
                     content.amPapyrus.unload();
                  });
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_starton.papyrus8);
                     save.data.b.s_state_puzzlenote = true;
                  } else {
                     await thePuzzle(paps, papsMusic);
                  }
                  CosmosUtils.chain(void 0, async (none, next) => {
                     if (paps.position.x < 310) {
                        paps.face = (
                           { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                              CosmosDirection,
                              CosmosDirection
                           >
                        )[paps.face];
                        await timer.pause(100);
                        next(void 0);
                     }
                  });
                  while (paps.position.y < 80) {
                     paps.position.y += 2;
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  sand.face = 'right';
                  while (paps.position.x < 310) {
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  await paps.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', paps);
                  await timer.pause(650);
                  sand.face = 'left';
                  await timer.pause(450);
                  await sand.walk(timer, 3, { x: 160, y: 40 });
                  sand.face = 'down';
                  if (!save.data.b.oops) {
                     await dialogue(
                        'auto',
                        ...[ text.a_starton.truetext.sans7, text.a_starton.truetext.sans8 ][choicer.result]
                     );
                  }
                  game.movement = true;
                  game.music!.gain.value = world.level;
                  await events.on('teleport');
                  renderer.detach('main', sand);
               }
            }
            break;
         }
         case 's_pacing': {
            (world.population < 10 || world.genocide) && instance('main', 's_moonrocks1')?.destroy();
            (world.population < 10 || world.genocide) && instance('main', 's_moonrocks2')?.destroy();
            break;
         }
         case 's_greater': {
            (world.population < 6 || world.genocide) && instance('main', 's_faun')?.destroy();
            let stopgote = false;
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 28) {
                  const loader = battler.load(groups.greatdog);
                  const lickLoader = content.ionSGreatdogLick.load();
                  await timer.when(() => game.room === 's_greater' && player.position.x > 300);
                  game.movement = false;
                  const greatdog = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: { x: 480, y: player.position.y },
                     priority: player.face === 'down' ? player.position.y + 1 : player.position.y - 1,
                     resources: content.ionSGreatdog
                  });
                  renderer.attach('main', greatdog);
                  greatdog.enable();
                  while ((greatdog.position.x -= 2) > 410) {
                     await renderer.on('tick');
                  }
                  greatdog.disable().reset();
                  assets.sounds.notify.instance(timer);
                  game.music!.gain.value = 0;
                  const notifier = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: renderer.projection(greatdog.position.subtract(0, 57)),
                     resources: content.ibuNotify
                  });
                  renderer.attach('menu', notifier);
                  await timer.pause(450);
                  renderer.detach('menu', notifier);
                  greatdog.enable();
                  while (
                     (greatdog.position.x -= 4) >
                     player.position.x + 31.5 + (player.face === 'right' ? 8.5 : 0.5)
                  ) {
                     await renderer.on('tick');
                  }
                  greatdog.disable().reset();
                  await Promise.all([ loader, timer.pause(950) ]);
                  await battler.battlefall(player);
                  await Promise.all([ lickLoader, battler.start(groups.greatdog) ]);
                  save.data.n.plot = 28;
                  if (save.data.n.state_starton_greatdog < 1) {
                     await timer.pause(450);
                     greatdog.resources = content.ionSGreatdogLick;
                     greatdog.enable();
                     await timer.when(() => greatdog.index === 29);
                     greatdog.disable();
                     await timer.pause(650);
                     greatdog.resources = content.ionSGreatdog;
                     greatdog.reset();
                     greatdog.anchor.x = 0;
                  }
                  if (save.data.n.state_starton_greatdog !== 2) {
                     await timer.pause(350);
                     greatdog.scale.x = -1;
                     await timer.pause(save.data.n.state_starton_greatdog * 1150);
                     greatdog.enable();
                     while ((greatdog.position.x += 3) < 480) {
                        await renderer.on('tick');
                     }
                  }
                  renderer.detach('main', greatdog);
                  if (world.genocide) {
                     await dialogue('auto', ...text.a_starton.genotext.asriel26());
                     goatbro.metadata.override = true;
                     await goatbro.walk(timer, 3, { x: 420, y: 195 });
                     stopgote = true;
                  } else if (!save.data.b.oops) {
                     if (
                        save.data.n.state_starton_doggo !== 1 ||
                        save.data.n.state_starton_lesserdog !== 1 ||
                        save.data.n.state_starton_dogs !== 1 ||
                        save.data.n.state_starton_greatdog !== 1
                     ) {
                        if (save.data.n.state_starton_greatdog === 3) {
                           await dialogue('auto', ...text.a_starton.truetext.great3);
                        } else {
                           if (save.data.n.state_starton_lesserdog === 0) {
                              await dialogue('auto', ...text.a_starton.truetext.great1);
                           } else {
                              await dialogue('auto', ...text.a_starton.truetext.fetch());
                           }
                        }
                     } else {
                        await dialogue('auto', ...text.a_starton.truetext.great2);
                     }
                  }
                  game.movement = true;
                  game.music!.gain.value = world.level;
               } else if (save.data.n.plot === 28 && world.genocide) {
                  renderer.attach('main', goatbro);
                  goatbro.metadata.override = true;
                  goatbro.position = new CosmosPoint({ x: 420, y: 195 });
                  stopgote = true;
               }
               if (stopgote) {
                  goatbro.face = 'left';
                  goatbro.anchor = new CosmosPoint(0);
                  goatbro.size = new CosmosPoint(20, 100);
                  goatbro.metadata.barrier = true;
                  goatbro.metadata.interact = true;
                  goatbro.metadata.name = 'starton';
                  goatbro.metadata.args = [ 'proceed' ];
                  const iso = isolate(goatbro);
                  await timer.when(() => roomState.lessgo);
                  iso();
                  game.movement = false;
                  goatbro.anchor = new CosmosPoint(-1);
                  goatbro.size = new CosmosPoint(0);
                  goatbro.metadata.barrier = void 0;
                  goatbro.metadata.interact = void 0;
                  goatbro.metadata.name = void 0;
                  goatbro.metadata.args = void 0;
                  goatbro.walk(timer, 3, { x: 430 }).then(async () => {
                     await goatbro.alpha.modulate(timer, 300, 0);
                  });
                  player.walk(timer, 3, { x: 430 }).then(async () => {
                     await teleport('s_bridge', 'right', 20, 50, world);
                     script('tick');
                  });
               }
            }
            break;
         }
         case 's_bridge': {
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 29) {
                  const papyrusLoader = content.amPapyrus.load();
                  if (world.genocide) {
                     save.data.n.plot = 29;
                     const impactLoader = content.asImpact.load();
                     renderer.on('tick').then(() => {
                        goatbro.alpha.modulate(timer, 0, 1);
                     });
                     goatbro.position = player.position.add(21, 0);
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 925, y: player.position.y }
                     });
                     isolate(paps);
                     paps.face = 'left';
                     renderer.attach('main', paps);
                     game.movement = false;
                     await Promise.all([
                        goatbro.walk(timer, 3, { x: 680 }),
                        player.walk(timer, 3, { x: 660 }),
                        papyrusLoader
                     ]);
                     game.movement = false;
                     timer.post().then(() => {
                        game.movement = false;
                     });
                     await timer.pause(650);
                     const cam = new CosmosObject({ position: player.position });
                     game.camera = cam;
                     await cam.position.modulate(timer, 1350, { x: 790, y: player.position.y });
                     const papsMusic = assets.music.papyrus.instance(timer);
                     papsMusic.rate.value = 0.325;
                     await timer.pause(1250);
                     game.movement = false;
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4a);
                     game.movement = false;
                     timer.post().then(() => {
                        game.movement = false;
                     });
                     const trueGain = papsMusic.gain.value;
                     await papsMusic.gain.modulate(timer, 1000, 0);
                     await Promise.all([ timer.pause(1000), impactLoader ]);
                     const impact = assets.sounds.impact.instance(timer);
                     impact.rate.value = 1 / 3;
                     timer.pause(125).then(async () => {
                        assets.sounds.notify.instance(timer).gain.value /= 1.5;
                        const notifier = new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: renderer.projection(paps.position.subtract(0, 45)),
                           resources: content.ibuNotify
                        });
                        renderer.attach('menu', notifier);
                        await timer.pause(450);
                        renderer.detach('menu', notifier);
                        paps.sprites.left.duration = 15;
                        paps.sprites.left.enable();
                        await paps.position.modulate(timer, 500, paps.position.add(5, 0));
                        paps.sprites.left.disable();
                     });
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4b);
                     typer.fire('skip');
                     paps.face = 'right';
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4c);
                     await timer.pause(850);
                     paps.preset = characters.papyrusMad;
                     await timer.pause(350);
                     paps.face = 'left';
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4d);
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4e);
                     papsMusic.rate.value = 0.65;
                     papsMusic.gain.value = trueGain;
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4f);
                     papsMusic.gain.modulate(timer, 300, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     await paps.walk(timer, 4, { x: 990 });
                     await paps.alpha.modulate(timer, 300, 0);
                     renderer.detach('main', paps);
                     await timer.pause(350);
                     await cam.position.modulate(timer, 1350, player.position);
                     game.camera = player;
                     await timer.pause(850);
                     player.walk(timer, 3, { x: 990 }).then(async () => {
                        while (world.population > 0) {
                           world.bully();
                        }
                        await teleport('s_town1', 'right', 20, 150, world);
                        script('tick');
                     });
                     goatbro.walk(timer, 3, { x: 990 }).then(async () => {
                        await goatbro.alpha.modulate(timer, 300, 0);
                     });
                  } else {
                     const sand = new CosmosCharacter({
                        preset: characters.sans,
                        key: 'sans',
                        position: { x: 925, y: 35 },
                        anchor: { x: 0, y: 1 },
                        size: { x: 25, y: 5 },
                        metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                     }).on('tick', function () {
                        if (save.data.n.plot < 29) {
                           this.preset = game.room === 's_bridge' ? characters.sans : characters.none;
                        }
                     });
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 925, y: 95 }
                     }).on('tick', function () {
                        if (save.data.n.plot < 29) {
                           this.preset = game.room === 's_bridge' ? characters.papyrus : characters.none;
                        }
                     });
                     isolate(sand);
                     isolate(paps);
                     sand.face = 'left';
                     paps.face = 'left';
                     renderer.attach('main', sand);
                     renderer.attach('main', paps);
                     await Promise.all([
                        timer
                           .when(() => game.room === 's_bridge' && player.position.x > 670)
                           .then(() => {
                              game.movement = false;
                           }),
                        papyrusLoader
                     ]);
                     save.data.n.plot = 29;
                     await timer.pause(650);
                     const cam = new CosmosObject({ position: player.position });
                     game.camera = cam;
                     await cam.position.modulate(timer, 1350, { x: 790, y: player.position.y });
                     const papsMusic = assets.music.papyrus.instance(timer);
                     await timer.pause(1250);
                     await dialogue('auto', ...text.a_starton.papyrus10);
                     const extent = new CosmosValue();
                     const gauntlet = new CosmosObject({
                        position: { x: 790 },
                        objects: [
                           new CosmosObject({
                              objects: [
                                 new CosmosSprite({
                                    position: { x: -90 },
                                    anchor: { x: 0, y: 1 },
                                    parallax: { y: -0.75 },
                                    frames: [ content.iooSGauntletTesla ]
                                 }),
                                 new CosmosSprite({
                                    anchor: { x: 0, y: 1 },
                                    scale: { y: 1 },
                                    parallax: { y: -0.25 },
                                    frames: [ content.iooSGauntletCollarsword ]
                                 }),
                                 new CosmosAnimation({
                                    active: true,
                                    position: { x: 90 },
                                    anchor: { x: 0, y: 1 },
                                    parallax: { y: -0.5 },
                                    resources: content.iooSGauntletDog
                                 })
                              ]
                           }).on_legacy('tick', self => () => {
                              self.position.y = -60 + extent.value;
                           }),
                           new CosmosObject({
                              objects: [
                                 new CosmosSprite({
                                    position: { x: -90 },
                                    anchor: { x: 0, y: 1 },
                                    scale: { y: -1 },
                                    parallax: { y: 0.75 },
                                    frames: [ content.iooSGauntletTesla ]
                                 }),
                                 new CosmosAnimation({
                                    active: true,
                                    anchor: { x: 0 },
                                    resources: content.iooSGauntletFire
                                 }),
                                 new CosmosSprite({
                                    position: { x: 75 },
                                    anchor: { x: 0 },
                                    rotation: -22.5,
                                    parallax: { y: 0.5 },
                                    frames: [ content.iooSGauntletBlaster ]
                                 })
                              ]
                           }).on_legacy('tick', self => () => {
                              self.position.y = 180 - extent.value;
                           })
                        ]
                     });
                     renderer.attach('main', gauntlet);
                     await extent.modulate(timer, 2e3, 85);
                     await timer.pause(850);
                     await dialogue('auto', ...text.a_starton.papyrus11);
                     await timer.pause(3850);
                     sand.face = 'down';
                     paps.face = 'up';
                     await dialogue('auto', ...text.a_starton.papyrus12);
                     sand.face = 'left';
                     paps.face = 'left';
                     await timer.pause(3850);
                     sand.face = 'down';
                     paps.face = 'up';
                     await dialogue('auto', ...text.a_starton.papyrus13);
                     sand.face = 'left';
                     paps.face = 'left';
                     await extent.modulate(timer, 2e3, 0);
                     renderer.detach('main', gauntlet);
                     paps.face = 'right';
                     await timer.pause(650);
                     assets.sounds.notify.instance(timer);
                     const notifier = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: renderer.projection(paps.position.subtract(0, 45)),
                        resources: content.ibuNotify
                     });
                     renderer.attach('menu', notifier);
                     await timer.pause(450);
                     paps.face = 'left';
                     renderer.detach('menu', notifier);
                     await dialogue('auto', ...text.a_starton.papyrus14);
                     papsMusic.gain.modulate(timer, 650, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     paps.walk(timer, 4, { x: 990 }).then(async () => {
                        await paps.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     sand.walk(timer, 3, { y: 20 }).then(() => {
                        sand.face = 'down';
                     });
                     events.on('teleport').then(() => {
                        renderer.detach('main', sand);
                     });
                     await cam.position.modulate(timer, 1350, player.position);
                     game.camera = player;
                     if (!save.data.b.oops) {
                        await dialogue('auto', ...text.a_starton.truetext.sans9);
                     }
                     game.movement = true;
                  }
               }
            }
            break;
         }
         case 's_backrooms': {
            if (save.data.n.state_starton_lesserdog === 2 || world.population === 0) {
               const lesser = instance('main', 'lesser');
               if (lesser && !lesser.object.metadata.active) {
                  lesser.object.metadata.active = true;
                  for (const object of lesser.object.objects) {
                     if (object instanceof CosmosAnimation) {
                        object.index = 1;
                        break;
                     }
                  }
               }
            }
            break;
         }
         case 's_grillbys': {
            if (!player.metadata.fryz && save.data.n.plot === 33) {
               player.metadata.fryz = true;
               const food = new CosmosSprite({
                  position: { x: 197.5, y: 87.5 },
                  priority: 105,
                  anchor: { x: 0, y: 1 },
                  frames: [ save.data.b.fryz ? content.iooFFries : content.iooFBurger ]
               });
               const food2 = new CosmosSprite({
                  position: food.position.add(26, 0),
                  priority: 105,
                  anchor: { x: 0, y: 1 },
                  frames: [ save.data.b.fryz ? content.iooFFries : content.iooFBurger ]
               });
               renderer.attach('main', food, food2);
               isolate(food);
               isolate(food2);
               await timer.when(() => save.data.n.plot > 33);
               renderer.detach('main', food, food2);
            }
            break;
         }
         case 's_innterior': {
            if (world.population === 0) {
               instance('main', 'i_innkeep')?.destroy();
               if (!roomState.bunbox) {
                  roomState.bunbox = true;
                  const bunbox = new CosmosRectangle({
                     position: { x: 221, y: 92 },
                     fill: '#0c36ae',
                     size: { x: 14, y: 8 },
                     objects: [ new CosmosRectangle({ fill: '#062d9e', position: { y: 2 }, size: { x: 14, y: 2 } }) ]
                  });
                  isolate(bunbox);
                  renderer.attach('main', bunbox);
               }
            }
            break;
         }
         case 's_town2': {
            const bloc = instance('main', 'housebloc')?.object;
            if (bloc && !bloc.metadata.active) {
               bloc.metadata.active = true;
               for (const object of bloc.objects) {
                  if (object.metadata.barrier) {
                     object.metadata.bloc = true;
                  } else if (object.metadata.trigger && save.data.n.plot < 31) {
                     const listener = () => {
                        if (save.data.n.plot < 31) {
                           object.metadata.barrier = true;
                           object.metadata.interact = true;
                           object.metadata.trigger = false;
                           object.metadata.name = 'starton';
                           object.metadata.args = [ 'housebloc' ];
                        } else {
                           object.off('tick', listener);
                           object.metadata.barrier = false;
                           object.metadata.interact = false;
                           object.metadata.trigger = true;
                           object.metadata.name = 'starton';
                           object.metadata.args = [ 'bonehouse' ];
                        }
                     };
                     object.on('tick', listener);
                  }
               }
            }
            if (world.population < 12) {
               instance('main', 's_joey')?.destroy();
            }
            if (world.population < 6) {
               instance('main', 't_icewolf')?.destroy();
            }
            if (world.population < 4) {
               instance('main', 't_loverboy')?.destroy();
            }
            if (!roomState.papdater && save.data.n.plot > 30.1 && save.data.n.plot_date < 0.1) {
               roomState.papdater = true;
               if (save.data.n.state_starton_papyrus !== 1) {
                  renderer.attach(
                     'main',
                     (roomState.paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        position: { x: 575, y: 205 },
                        size: { x: 20, y: 5 },
                        anchor: { x: 0, y: 1 },
                        metadata: {
                           name: 'starton',
                           args: [ 'papdate' ],
                           barrier: true,
                           interact: true,
                           override: void 0 as boolean | void
                        },
                        face: 'down'
                     }).on('tick', function () {
                        if (!this.metadata.override) {
                           if (player.position.extentOf(this.position) > 100) {
                              this.face = 'down';
                           } else {
                              this.face = CosmosMath.cardinal(this.position.angleTo(player.position));
                           }
                           if (game.room !== 's_town2') {
                              renderer.detach('main', this);
                              roomState.papdater = false;
                           }
                        }
                     }))
                  );
               }
            }
            world.genocide || (world.population === 0 && !world.bullied) || instance('main', 's_genokid')?.destroy();
         }
         case 's_town1': {
            if (game.room === 's_town1') {
               if (world.population < 10) {
                  instance('main', 't_rabbit')?.destroy();
                  instance('main', 't_bunny')?.destroy();
               }
               if (world.population < 8) {
                  instance('main', 't_kabakk')?.destroy();
                  instance('main', 't_zorren')?.destroy();
               }
               if (world.population < 6) {
                  instance('main', 't_politics')?.destroy();
               }
               if (world.population < 4) {
                  instance('main', 't_smileguy')?.destroy();
                  instance('main', 't_imafraidjumitebeinagang')?.destroy();
               }
               if (world.population < 2) {
                  instance('main', 't_wisconsin')?.destroy();
               }
               if (!roomState.active) {
                  roomState.active = true;
                  if (save.data.n.plot < 30) {
                     save.data.n.plot = 30;
                     if (world.genocide) {
                        goatbro.alpha.modulate(timer, 0, 1);
                        goatbro.position = player.position.add(21, 0);
                        goatbro.face = 'left';
                        await timer.pause(1050);
                        await dialogue('auto', ...text.a_starton.genotext.asriel28());
                        game.movement = true;
                        await goatbro.walk(timer, 3.5, { x: 660 }, { x: 750, y: 240 }, { y: 370 });
                        await goatbro.alpha.modulate(timer, 300, 0);
                        renderer.detach('main', goatbro);
                     }
                  } else if (save.data.n.plot !== 30 && world.genocide) {
                     renderer.attach('main', goatbro);
                  }
               }
            }
            break;
         }
         case 's_librarby':
            if (world.population < 10) {
               instance('main', 'l_cupjake')?.destroy();
            }
            if (world.population < 8) {
               instance('main', 'l_kakurolady')?.destroy();
            }
            if (world.population === 0) {
               instance('main', 'l_librarian')?.destroy();
            }
            if (world.genocide) {
               instance('main', 'l_sweetie')?.destroy();
            }
            break;
         case 's_battle': {
            // TODO: recode this whole damn thing (especially the staticfx, maybe even resprite that)
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 31) {
                  const asgoreAssets = new CosmosInventory(
                     content.iocAsgoreLeft,
                     content.iocAsgoreLeftTalk,
                     content.iocAsgoreRight,
                     content.iocAsgoreRightTalk,
                     inventories.idcAsgore,
                     content.avAsgore,
                     content.amPrebattle
                  );
                  const asgoreLoader = world.genocide ? asgoreAssets.load() : void 0;
                  const battleLoader = battler.load(groups.papyrus);
                  const noisestorm = new CosmosAnimation({
                     active: true,
                     alpha: 0,
                     priority: -1000,
                     anchor: 0,
                     scale: { x: 2, y: 2 },
                     metadata: { in: true, lock: false },
                     resources: content.iooSNoise
                  }).on('tick', function () {
                     const pos = game.camera!.position;
                     noisestorm.position = pos.clamp(...renderer.region);
                     if (game.room !== 's_battle') {
                        this.alpha.value = 0;
                        if (this.metadata.in) {
                           this.metadata.in = false;
                           this.use(null);
                        }
                     } else {
                        if (!this.metadata.in) {
                           this.metadata.in = true;
                           this.use(content.iooSNoise);
                        }
                        if (pos.x > 300 || this.metadata.lock) {
                           this.alpha.value = 1;
                        } else if (pos.x > 160) {
                           this.alpha.value = (pos.x - 160) / 140;
                        } else {
                           this.alpha.value = 0;
                        }
                     }
                  });
                  if (save.data.n.state_papyrus_capture < 1) {
                     renderer.attach('main', noisestorm);
                  }
                  if (!save.data.b.oops && save.data.n.plot < 30.1) {
                     if (save.data.n.plot < 30.01) {
                        timer
                           .when(() => game.room === 's_battle' && player.position.x > 100)
                           .then(() => {
                              dialogue('auto', ...text.a_starton.truetext.papyrus3);
                              save.data.n.plot = 30.01;
                           });
                     }
                     if (save.data.n.plot < 30.02) {
                        timer
                           .when(() => game.room === 's_battle' && player.position.x > 200)
                           .then(() => {
                              dialogue('auto', ...text.a_starton.truetext.papyrus4);
                              save.data.n.plot = 30.02;
                           });
                     }
                     timer
                        .when(() => game.room === 's_battle' && player.position.x > 300)
                        .then(() => {
                           dialogue('auto', ...text.a_starton.truetext.papyrus5);
                           save.data.n.plot = 30.1;
                        });
                  }
                  await timer.when(() => game.room === 's_battle' && player.position.x > 310);
                  game.movement = false;
                  if (save.data.n.state_papyrus_capture < 1) {
                     noisestorm.metadata.lock = true;
                  }
                  const paps = new CosmosCharacter({
                     alpha: save.data.n.state_papyrus_capture < 1 ? 0 : 1,
                     priority: 1000,
                     position: { x: 490, y: player.position.y },
                     tint: save.data.n.state_papyrus_capture < 1 ? 0 : void 0,
                     preset: characters.papyrus,
                     key: save.data.n.state_papyrus_capture < 1 ? 'papyrusDark' : 'papyrus'
                  });
                  paps.face = 'left';
                  renderer.attach('main', paps);
                  const cam = new CosmosObject({ position: player.position });
                  game.camera = cam;
                  while (cam.position.x < 397) {
                     cam.position.x += 3;
                     await renderer.on('tick');
                  }
                  cam.position.x = 400;
                  await timer.pause(650);
                  if (save.data.n.state_papyrus_capture < 1) {
                     await paps.alpha.modulate(timer, 450, 1);
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.papyrusFinal1, ...text.a_starton.papyrusFinal2());
                     const overlay = new CosmosRectangle({
                        alpha: 0,
                        priority: -1,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        fill: 'white',
                        stroke: 'transparent'
                     });
                     paps.face = 'left';
                     renderer.attach('menu', overlay);
                     await overlay.alpha.modulate(timer, 300, 1);
                     renderer.detach('main', noisestorm);
                     paps.tint = void 0;
                     paps.key = 'papyrus';
                     await overlay.alpha.modulate(timer, 300, 0);
                     renderer.detach('menu', overlay);
                     await timer.pause(850);
                     header('x1').then(() => {
                        paps.face = 'right';
                     });
                     header('x2').then(() => {
                        paps.face = 'left';
                     });
                     await dialogue('auto', ...text.a_starton.papyrusFinal3());
                  } else {
                     await timer.pause(450);
                     switch (save.data.n.state_papyrus_capture) {
                        case 1:
                           await dialogue('auto', ...text.a_starton.papyrusFinal5);
                           break;
                        case 2:
                           await dialogue('auto', ...text.a_starton.papyrusFinal6);
                           break;
                        case 3:
                           await dialogue('auto', ...text.a_starton.papyrusFinal7);
                           await dialogue(
                              'auto',
                              ...[ text.a_starton.papyrusFinal7a, text.a_starton.papyrusFinal7b ][choicer.result]
                           );
                           break;
                        case 4:
                           await dialogue('auto', ...text.a_starton.papyrusFinal8);
                           await dialogue(
                              'auto',
                              ...[ text.a_starton.papyrusFinal7a, text.a_starton.papyrusFinal8a ][choicer.result]
                           );
                           break;
                     }
                  }
                  let fail = false;
                  if (save.data.n.state_papyrus_capture < 3 || choicer.result === 1) {
                     await Promise.all([ battleLoader, battler.battlefall(player) ]);
                     timer
                        .when(() => battler.volatile.length > 0 && battler.volatile[0].vars.fail === true)
                        .then(() => {
                           fail = true;
                        });
                     heal(void 0, false);
                     await battler.start(groups.papyrus);
                     battler.SOUL.metadata.color = 'red';
                     battler.SOUL.velocity.y = 0;
                  }
                  if (fail) {
                     game.movement = false;
                     renderer.detach('main', paps);
                     renderer.alpha.modulate(timer, 0, 0);
                     game.camera = player;
                     await teleport('s_capture', 'down', 182, 92, world);
                     roomState.active = false;
                     game.movement = true;
                  } else {
                     save.data.n.plot = 31;
                     if (save.data.n.state_starton_papyrus < 1) {
                        game.movement = false;
                        let muzic: CosmosInstance;
                        world.population === 0 && !world.bullied && (muzic = assets.music.papyrus.instance(timer));
                        await timer.pause(650);
                        await dialogue('auto', ...text.a_starton.papyrusFinal4());
                        if (world.population > 0 || world.bullied) {
                           if (choicer.result === 1 && !save.data.b.oops) {
                              oops();
                              await timer.pause(1000);
                           }
                           muzic = assets.music.papyrus.instance(timer);
                           await dialogue(
                              'auto',
                              ...[ text.a_starton.papyrusFinal4a1, text.a_starton.papyrusFinal4a2 ][choicer.result],
                              ...[ text.a_starton.papyrusFinal4b1, text.a_starton.papyrusFinal4b2 ][
                                 save.data.b.flirt_papyrus ? 1 : 0
                              ],
                              ...text.a_starton.papyrusFinal4c1
                           );
                        }
                        await dialogue('auto', ...text.a_starton.papyrusFinal4c2);
                        const OG = muzic!.gain.value;
                        await muzic!.gain.modulate(timer, 750, 0);
                        await timer.pause(250);
                        await dialogue('auto', ...text.a_starton.papyrusFinal4d);
                        muzic!.gain.value = OG;
                        await dialogue(
                           'auto',
                           ...text.a_starton.papyrusFinal4e,
                           ...[ text.a_starton.papyrusFinal4f1, text.a_starton.papyrusFinal4f2 ][
                              save.data.b.flirt_papyrus ? 1 : 0
                           ],
                           ...text.a_starton.papyrusFinal4g
                        );
                        if (player.position.y < 50) {
                           paps.priority.value = 100000;
                        } else {
                           paps.priority.value = -100000;
                        }
                        await paps.walk(timer, 4, {
                           x: player.position.x - 80,
                           y: player.position.y < 50 ? player.position.y + 20 : player.position.y - 20
                        });
                        renderer.detach('main', paps);
                        muzic!.gain.modulate(timer, 1250, 0).then(() => {
                           muzic.stop();
                           content.amPapyrus.unload();
                        });
                        while (cam.position.x > player.position.x + 3) {
                           cam.position.x -= 3;
                           await renderer.on('tick');
                        }
                        game.camera = player;
                        game.movement = true;
                     } else {
                        renderer.detach('main', paps);
                        await timer.pause(650);
                        if (world.genocide) {
                           const battleQueue = battler.load(groups.shockasgore);
                           goatbro.metadata.override = true;
                           goatbro.position = new CosmosPoint(paps.position.x + 60, player.position.y);
                           renderer.attach('main', goatbro);
                           const alphaticker = () => {
                              goatbro.alpha.modulate(timer, 0, 1);
                           };
                           goatbro.on('tick', alphaticker);
                           await Promise.all([ goatbro.walk(timer, 3, { x: player.position.x + 21 }) ]);
                           await timer.pause(650);
                           await dialogue(
                              'auto',
                              ...(save.data.b.papyrus_secret
                                 ? text.a_starton.genotext.asriel29b
                                 : text.a_starton.genotext.asriel29)()
                           );
                           await Promise.all([
                              asgoreLoader,
                              player.walk(timer, 3, { x: cam.position.x }),
                              goatbro.walk(timer, 3, { x: cam.position.x + 21 })
                           ]);
                           const gorey = new CosmosCharacter({
                              position: { x: 960, y: player.position.y },
                              preset: characters.asgore,
                              key: 'asgore1'
                           });
                           gorey.face = 'right';
                           renderer.attach('main', gorey);
                           game.camera = player;
                           await Promise.all([ player.walk(timer, 3, { x: 720 }), goatbro.walk(timer, 3, { x: 741 }) ]);
                           if (save.flag.n.ga_asriel30++ < 1) {
                              assets.sounds.notify.instance(timer);
                              const notifier = new CosmosAnimation({
                                 anchor: { x: 0, y: 1 },
                                 position: renderer.projection(goatbro.position.subtract(0, 31)),
                                 resources: content.ibuNotify
                              });
                              renderer.attach('menu', notifier);
                              await timer.pause(450);
                              renderer.detach('menu', notifier);
                           }
                           await timer.pause(850);
                           cam.position = player.position.clone();
                           game.camera = cam;
                           await cam.position.modulate(timer, 1350, {
                              x: 840,
                              y: player.position.y
                           });
                           const jeebs = assets.music.prebattle.instance(timer);
                           jeebs.rate.value = 0.25;
                           jeebs.gain.value = 0.45;
                           await timer.pause(650);
                           gorey.face = 'left';
                           await timer.pause(1150);
                           await dialogue('auto', ...text.a_starton.genotext.asriel30());
                           if (save.flag.n.ga_asriel30x < 1) {
                              jeebs.gain.value = 0;
                              assets.sounds.noise.instance(timer);
                              renderer.alpha.value = 0;
                              speech.state.face = faces.asgorePensive;
                              await Promise.all([ battleQueue, timer.pause(300) ]);
                              battler.SOUL.alpha.value = 1;
                              renderer.alpha.value = 1;
                              assets.sounds.noise.instance(timer);
                              await battler.start(groups.shockasgore);
                              jeebs.gain.modulate(timer, 300, 0.45);
                              await timer.pause(1000);
                              await dialogue('auto', ...text.a_starton.genotext.asriel30a);
                           } else {
                              save.flag.n.ga_asriel30x++;
                           }
                           await timer.pause(650);
                           await dialogue('auto', ...text.a_starton.genotext.asriel30b);
                           jeebs.stop();
                           dialogue('auto', ...text.a_starton.genotext.asriel30c);
                           player.walk(timer, 3, { x: 980 }).then(async () => {
                              await teleport('s_exit', 'right', 20, 170, world);
                              game.movement = false;
                              game.camera = player;
                              goatbro.position = player.position.add(21, 0);
                              renderer.detach('main', gorey);
                              await Promise.all([
                                 player.walk(timer, 3, { x: 200 }, { y: 120 }),
                                 goatbro.walk(timer, 3, { x: 200 }, { y: 110 }, { x: 220 }).then(() => {
                                    goatbro.face = 'left';
                                 })
                              ]);
                              await timer.pause(1150);
                              await dialogue('auto', ...text.a_starton.genotext.asriel30d());
                              await player.walk(timer, 1.5, { y: 100 });
                              await teleport('f_start', 'up', 160, 490, world);
                              goatbro.metadata.override = false;
                              goatbro.metadata.reposition = true;
                              game.movement = true;
                           });
                           goatbro.walk(timer, 3, { x: 1000 });
                           await timer.when(() => goatbro.position.x > gorey.position.x - 25);
                           atlas.switch(null);
                           typer.text('');
                           assets.sounds.phase.instance(timer);
                           gorey.scale.modulate(timer, 125, { x: 1.05, y: 1 }).then(() => {
                              gorey.scale.modulate(timer, 50, { x: 0, y: 1 });
                           });
                           await gorey.alpha.modulate(timer, 100, 0.8);
                           gorey.alpha.value = 0;
                           await timer.pause(40);
                           gorey.alpha.value = 1;
                           await timer.pause(35);
                           save.data.n.plot = 32;
                           save.flag.n.genocide_milestone = Math.max(1, save.flag.n.genocide_milestone) as 1;
                        } else {
                           while (cam.position.x > player.position.x + 3) {
                              cam.position.x -= 3;
                              await renderer.on('tick');
                           }
                           game.camera = player;
                        }
                        save.data.n.exp += 200;
                        game.movement = true;
                     }
                  }
               }
            }
            break;
         }
         case 's_lookout':
            if (!roomState.active) {
               roomState.active = true;
               instance('main', 's_npc98')?.object.on_legacy('tick', self => {
                  const anim = self.objects.filter(object => object instanceof CosmosAnimation)[0] as CosmosAnimation;
                  return () => {
                     switch (save.data.n.state_starton_npc98) {
                        case 0:
                           anim.index = 0;
                           break;
                        case 1:
                        case 4:
                           anim.index = 1;
                           break;
                        case 2:
                        case 3:
                        case 4.1:
                           anim.index = 2;
                           break;
                        case 5:
                           anim.index = 3;
                           break;
                     }
                  };
               });
            }
            break;
         case 's_capture':
            (world.genocide || save.data.n.state_papyrus_capture > 3) && instance('main', 's_trapnote')?.destroy();
            break;
         case 's_bonehouse':
            if (!roomState.active) {
               roomState.active = true;
               instance('main', 'couch')!.object.priority.value = 42000;
               for (const botto of instances('main', 'botto')) {
                  botto.object!.priority.value = -5000;
               }
               for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
                  if (sussy.metadata.barrier) {
                     sussy.metadata.barrier = false;
                     sussy.metadata.restore = 'barrier';
                  } else if (sussy.metadata.interact) {
                     sussy.metadata.interact = false;
                     sussy.metadata.restore = 'interact';
                  }
               }
               if (save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0) {
                  for (const sprite of Object.values(characters.papyrus.walk)) {
                     sprite.duration = 4;
                  }
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 35, y: 185 },
                     size: { x: 20, y: 5 },
                     anchor: { x: 0, y: 1 },
                     metadata: {
                        name: 'starton',
                        args: [ 'papdate' ],
                        barrier: true,
                        interact: true,
                        override: void 0 as boolean | void,
                        exhausted: void 0 as boolean | void,
                        tired: void 0 as boolean | void
                     }
                  })
                     .on_legacy('tick', () => {
                        let speed = 4;
                        let kitchenstate = false;
                        return () => {
                           if (paps.metadata.override) {
                              return;
                           }
                           if (roomState.kitchen !== kitchenstate) {
                              kitchenstate = roomState.kitchen;
                              speed = Math.min(8, speed + 0.25);
                              if (speed === 8) {
                                 paps.metadata.exhausted = true;
                              } else if (speed > 6) {
                                 paps.metadata.tired = true;
                              }
                           }
                           if (roomState.kitchen) {
                              if (paps.position.x < 215 - speed) {
                                 if (paps.face !== 'right') {
                                    paps.sprite.reset();
                                    paps.face = 'right';
                                    paps.sprite.reset().enable();
                                 } else if (!paps.sprite.active) {
                                    paps.sprite.reset().enable();
                                 }
                                 paps.position.x += speed;
                              } else {
                                 if (paps.face !== 'up') {
                                    paps.sprite.reset();
                                    paps.face = 'up';
                                    paps.sprite.reset();
                                 }
                                 paps.position.x = 215;
                              }
                           } else if (paps.position.x > 35 + speed) {
                              if (paps.face !== 'left') {
                                 paps.sprite.reset();
                                 paps.face = 'left';
                                 paps.sprite.reset().enable();
                              } else if (!paps.sprite.active) {
                                 paps.sprite.reset().enable();
                              }
                              paps.position.x -= speed;
                           } else {
                              if (paps.face !== 'right') {
                                 paps.sprite.reset();
                                 paps.face = 'right';
                                 paps.sprite.reset();
                              }
                              paps.position.x = 35;
                           }
                        };
                     })
                     .on('tick', function () {
                        this.preset = game.room === 's_bonehouse' ? characters.papyrus : characters.none;
                     });
                  paps.face = 'right';
                  renderer.attach('main', paps);
                  roomState.paps = paps;
                  roomState.papsResettiUpsettiSpaghetti = isolate(paps);
               }
            }
            break;
         case 's_papyrusroom': {
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot_date < 1 && save.data.n.state_starton_papyrus === 0) {
                  roomState.dateAssets = new CosmosInventory(
                     content.ibcPapyrusBattle,
                     content.amDatingstart,
                     inventories.battleAssets,
                     inventories.idcPapyrusBattle
                  );
                  roomState.dateLoader = roomState.dateAssets.load();
                  const paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 145, y: 140 },
                     size: { x: 20, y: 5 },
                     anchor: { x: 0, y: 1 },
                     metadata: { name: 'starton', args: [ 'papdate' ], barrier: true, interact: true }
                  }).on('tick', function () {
                     this.preset = game.room === 's_papyrusroom' ? characters.papyrus : characters.none;
                  });
                  paps.face = 'down';
                  isolate(paps);
                  renderer.attach('main', paps);
                  paps.on('tick', () => {
                     paps.face = CosmosMath.cardinal(paps.position.angleTo(player.position));
                  });
                  roomState.paps = paps;
               }
            }
            break;
         }
         case 's_taxi': {
            world.genocide && ((instance('main', 's_vegetoid')!.object.objects[0] as CosmosAnimation).index = 3);
            break;
         }
      }
   } else {
      const scriptState = states.scripts[subscript] || (states.scripts[subscript] = {});
      switch (subscript) {
         case 'townswap': {
            const xtarget = player.position.x < 500 ? 250 : 750;
            switch (game.room) {
               case 's_town1':
                  await teleport('s_town2', 'down', xtarget, 10, world);
                  break;
               case 's_town2':
                  await teleport('s_town1', 'up', xtarget, 370, world);
                  break;
            }
            break;
         }
         case 'jumptrap':
            player.metadata.s_jumptrap = true;
            break;
         case 'sandinter':
            if (!game.movement) {
               break;
            }
            switch (game.room) {
               case 's_sans':
                  if (save.data.n.plot < 17.01) {
                     save.data.n.plot = 17.01;
                     await dialogue('auto', ...text.a_starton.sansinter.a1);
                  } else if (save.data.n.plot < 17.02) {
                     save.data.n.plot = 17.02;
                     await dialogue('auto', ...text.a_starton.sansinter.a2);
                  } else {
                     save.data.n.plot = 17.03;
                     await dialogue('auto', ...text.a_starton.sansinter.a3);
                  }
                  break;
               case 's_doggo':
               case 's_dogs':
               case 's_puzzle2':
               case 's_jenga':
               case 's_bridge':
                  await dialogue('auto', ...text.a_starton.sansinter[game.room]());
                  break;
               case 's_bros':
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.crossword5a, text.a_starton.crossword5b ][roomState.choice],
                     ...text.a_starton.crossword6(roomState.choice)
                  );
                  break;
            }
            break;
         case 'sentry':
            switch (game.room) {
               case 's_sans':
                  if (player.face === 'down' && player.position.y > 30) {
                     await dialogue('auto', ...text.a_starton.sentrySans2());
                  } else {
                     await dialogue('auto', ...text.a_starton.sentrySans1());
                  }
                  break;
               case 's_papyrus':
                  if (player.face === 'down') {
                     await dialogue('auto', ...text.a_starton.sentryPapyrus2());
                  } else {
                     await dialogue('auto', ...text.a_starton.sentryPapyrus1());
                  }
                  break;
            }
            break;
         case 'doggo':
            if (save.data.n.plot < 19) {
               save.data.n.plot = 19;
               if (world.genocide) {
                  game.movement = false;
                  goatbro.metadata.override = true;
                  await goatbro.walk(timer, 3, { x: 422.5, y: 135 });
                  goatbro.face = 'up';
                  await timer.pause(650);
                  await dialogue('auto', ...text.a_starton.genotext.asriel12);
                  timer
                     .when(() => scriptState.resumeGeno)
                     .then(async () => {
                        await goatbro.walk(timer, 3, {
                           x: player.position.x - 21,
                           y: player.position.y
                        });
                        goatbro.face = 'right';
                        goatbro.metadata.override = false;
                        game.movement = true;
                        game.music!.gain.value = world.level;
                     });
               }
            } else {
               break;
            }
         case 'dogbell':
            if (save.data.n.state_starton_doggo === 2) {
               await dialogue('auto', ...text.a_starton.gonezo());
               break;
            }
            game.movement = false;
            scriptState.riser = true;
            game.music && (game.music.gain.value = 0);
            if (subscript === 'dogbell') {
               assets.sounds.bell.instance(timer);
               await timer.pause(600);
               assets.sounds.bell.instance(timer);
            }
            {
               const battleLoader = subscript === 'doggo' ? battler.load(groups.doggo) : void 0;
               const doggopoggo = (scriptState.dog ||= new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: 422.5, y: 108 },
                  subcrop: { bottom: -1 },
                  resources: content.ionSDoggo
               }) as CosmosAnimation);
               if (!doggopoggo.metadata.isolated) {
                  doggopoggo.metadata.isolated = true;
                  isolate(doggopoggo);
               }
               renderer.layers.main.objects.includes(doggopoggo) || renderer.attach('main', doggopoggo);
               while (doggopoggo.subcrop.bottom > -25) {
                  await renderer.on('tick');
                  doggopoggo.subcrop.bottom -= 0.5;
               }
               let narrachara = false;
               if (subscript === 'doggo') {
                  await dialogue('auto', ...text.a_starton.doggo1());
                  await Promise.all([ battleLoader, battler.battlefall(player) ]);
                  await battler.start(groups.doggo);
                  if (save.data.n.state_starton_doggo < 2) {
                     await dialogue('auto', ...text.a_starton.doggo2[save.data.n.state_starton_doggo]);
                     if (!save.data.b.oops) {
                        narrachara = true;
                     }
                  } else {
                     renderer.detach('main', doggopoggo);
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.doggo3());
               }
               if (world.genocide) {
                  scriptState.resumeGeno = true;
               } else {
                  if (narrachara) {
                     dialogue(
                        'auto',
                        ...[ text.a_starton.truetext.doggo1, text.a_starton.truetext.doggo2 ][
                           save.data.n.state_starton_doggo
                        ]
                     ).then(() => {
                        game.movement = true;
                        game.music!.gain.value = world.level;
                     });
                  } else {
                     game.movement = true;
                     game.music!.gain.value = world.level;
                  }
               }
               if (save.data.n.state_starton_doggo < 2) {
                  scriptState.riser = false;
                  while (doggopoggo.subcrop.bottom < -1) {
                     doggopoggo.subcrop.bottom += 0.5;
                     await renderer.on('tick');
                     if (scriptState.riser) {
                        return;
                     }
                  }
                  renderer.detach('main', doggopoggo);
               }
            }
            break;
         case 'dimbox': {
            if (!game.movement) {
               break;
            }
            const dimbox = instance('main', 'dimbox');
            if (dimbox) {
               const anim = dimbox.object.objects[0] as CosmosAnimation;
               if (anim.index > 0) {
                  break;
               }
               game.movement = false;
               anim.enable();
               await timer.when(() => anim.index === 3);
               anim.disable();
               atlas.navigators.of('sidebarCell').position = { x: 0, y: 0 };
               atlas.switch('sidebarCellBox');
               await timer.when(() => atlas.target === null);
               anim.index = 4;
               anim.enable();
               await timer.when(() => anim.index === 6);
               anim.disable().reset();
            }
            break;
         }
         case 'papfire': {
            if (!roomState.fail && save.data.n.plot < 20) {
               const cycles = roomState.cycles as number[];
               const indicies = player.position.subtract(100, 35).divide(20, 10).clamp({ x: 0, y: 0 }, { x: 6, y: 13 });
               if (![ 0, 1, 2, 13 ].includes(Math.abs(cycles[Math.round(indicies.x)] - Math.round(indicies.y)))) {
                  roomState.fail = true;
               } else {
                  roomState.step = true;
               }
            }
            break;
         }
         case 'joey': {
            instance('main', 's_joey')?.talk('a', talkFilter(), 'auto', ...text.a_starton.joey1());
            break;
         }
         case 'nicecream': {
            const inst = instance('main', 's_nicecream');
            if (inst) {
               const guyanim = inst.object.objects[0] as CosmosAnimation;
               if (guyanim.index === 3) {
                  if (args[0] === 'geno') {
                     if (save.storage.inventory.size < 8) {
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('nice_cream');
                        await dialogue('auto', ...text.a_starton.cream_get);
                        save.data.n.state_starton_creamz++;
                     } else {
                        await dialogue('auto', ...text.a_starton.cream_full);
                     }
                  }
               } else if (args[0] !== 'geno') {
                  game.movement = false;
                  switch (game.room) {
                     case 's_stand': {
                        if (save.data.n.state_starton_nicecream > 0) {
                           guyanim.index = 2;
                           await dialogue('auto', ...text.a_starton.nicecream3);
                        } else {
                           save.data.n.state_starton_nicecream = 0.1;
                           await dialogue('auto', ...text.a_starton.nicecream1);
                           guyanim.index = 1;
                           await timer.pause(850);
                           guyanim.index = 2;
                           await dialogue('auto', ...text.a_starton.nicecream2);
                        }
                        if (choicer.result === 0) {
                           if (save.storage.inventory.size < 8) {
                              if (save.data.n.g < 12) {
                                 guyanim.index = 1;
                                 await dialogue('auto', ...text.a_starton.nicecream5);
                                 if (save.data.n.state_starton_nicecream < 0.2) {
                                    save.data.n.state_starton_nicecream = 0.2;
                                    guyanim.index = 2;
                                    await dialogue('auto', ...text.a_starton.nicecream6);
                                 } else {
                                    guyanim.index = 0;
                                    await dialogue('auto', ...text.a_starton.nicecream7);
                                    game.movement = true;
                                    break;
                                 }
                              } else {
                                 save.data.n.g -= 12;
                                 if (save.data.n.state_starton_nicecream < 1) {
                                    save.data.n.state_starton_nicecream = 1;
                                 } else {
                                    save.data.n.state_starton_nicecream++;
                                 }
                              }
                              assets.sounds.equip.instance(timer);
                              save.storage.inventory.add('nice_cream');
                              await dialogue('auto', ...text.a_starton.nicecream4);
                           } else {
                              guyanim.index = 1;
                              await dialogue('auto', ...text.a_starton.nicecream10);
                              guyanim.index = 0;
                           }
                        } else {
                           if (save.data.n.state_starton_nicecream < 1) {
                              guyanim.index = 0;
                              await dialogue('auto', ...text.a_starton.nicecream8);
                           } else {
                              await dialogue('auto', ...text.a_starton.nicecream9);
                           }
                        }
                        break;
                     }
                     case 'f_stand': {
                        const free = save.storage.inventory.count('punchcard') > 2;
                        if (save.data.b.f_state_nicecream) {
                           guyanim.index = 2;
                           if (free) {
                              await dialogue('auto', ...text.a_starton.nicecreamF5);
                           } else {
                              await dialogue('auto', ...text.a_starton.nicecreamF6);
                           }
                        } else {
                           save.data.b.f_state_nicecream = true;
                           if (save.data.n.state_starton_nicecream < 0.1) {
                              save.data.n.state_starton_nicecream = 0.1;
                           }
                           await dialogue('auto', ...text.a_starton.nicecreamF1);
                           guyanim.index < 1 && (guyanim.index = 1);
                           await timer.pause(850);
                           guyanim.index = 2;
                           await dialogue('auto', ...text.a_starton.nicecreamF2);
                        }
                        if (choicer.result === 0) {
                           if (save.storage.inventory.size < 8) {
                              if (!free && save.data.n.g < 10) {
                                 guyanim.index = 1;
                                 await dialogue('auto', ...text.a_starton.nicecream5);
                                 guyanim.index = 0;
                                 await dialogue('auto', ...text.a_starton.nicecream7);
                                 if (!save.data.b.f_state_kidd_cream && world.epicgamer) {
                                    save.data.b.f_state_kidd_cream = true;
                                    await dialogue('auto', ...text.a_starton.nicecreamK1);
                                    guyanim.index < 1 && (guyanim.index = 1);
                                    await timer.pause(850);
                                    await dialogue('auto', ...text.a_starton.nicecreamK2);
                                    guyanim.index = 2;
                                    await dialogue('auto', ...text.a_starton.nicecreamK3);
                                    save.data.n.state_starton_nicecream = Math.max(
                                       save.data.n.state_starton_nicecream,
                                       1
                                    );
                                 }
                                 game.movement = true;
                                 break;
                              } else {
                                 if (free) {
                                    save.storage.inventory.remove('punchcard');
                                    save.storage.inventory.remove('punchcard');
                                    save.storage.inventory.remove('punchcard');
                                 } else {
                                    save.data.n.g -= 10;
                                    save.data.n.state_foundry_punchcards++;
                                 }
                                 if (save.data.n.state_starton_nicecream < 1) {
                                    save.data.n.state_starton_nicecream = 1;
                                 } else {
                                    save.data.n.state_starton_nicecream++;
                                 }
                              }
                              assets.sounds.equip.instance(timer);
                              save.storage.inventory.add('nice_cream');
                              await dialogue('auto', ...text.a_starton.nicecream4);
                              if (!save.data.b.f_state_noticard) {
                                 save.data.b.f_state_noticard = true;
                                 await dialogue('auto', ...text.a_starton.nicecreamF4);
                              }
                           } else {
                              guyanim.index = 1;
                              await dialogue('auto', ...text.a_starton.nicecream10);
                              guyanim.index = 0;
                           }
                        } else {
                           if (save.data.n.state_starton_nicecream < 1) {
                              guyanim.index = 0;
                              await dialogue('auto', ...text.a_starton.nicecreamF3);
                           } else {
                              await dialogue('auto', ...text.a_starton.nicecream9);
                           }
                        }
                        if (!save.data.b.f_state_kidd_cream && world.epicgamer) {
                           save.data.b.f_state_kidd_cream = true;
                           await dialogue('auto', ...text.a_starton.nicecreamK1);
                           guyanim.index = 1;
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_starton.nicecreamK2);
                           guyanim.index = 2;
                           await dialogue('auto', ...text.a_starton.nicecreamK3);
                           save.data.n.state_starton_nicecream = Math.max(save.data.n.state_starton_nicecream, 1);
                        }
                        break;
                     }
                     case 'a_hub4': {
                        await dialogue('auto', ...text.a_starton.nicecreamE());
                        break;
                     }
                  }
                  game.movement = true;
               }
            }
            break;
         }
         case 'crossword': {
            game.movement = false;
            const sprite = new CosmosSprite({
               position: { x: 160, y: 120 },
               anchor: 0,
               frames: [ content.ieCrossword ]
            });
            const overlay = new CosmosObject({
               objects: [
                  new CosmosRectangle({
                     alpha: 0.7,
                     fill: 'black',
                     size: { x: 320, y: 240 }
                  }),
                  sprite
               ]
            });
            renderer.attach('menu', overlay);
            roomState.checked = true;
            await keys.specialKey.on('down');
            renderer.detach('menu', overlay);
            game.movement = true;
            break;
         }
         case 'spagtable': {
            if (world.genocide) {
               await dialogue('auto', ...text.a_starton.objinter.spagtable0);
            } else if (save.data.n.state_starton_spaghetti < 1) {
               await dialogue('auto', ...text.a_starton.objinter.spagtable1);
            } else if (save.data.n.state_starton_spaghetti < 2) {
               if (save.storage.inventory.size < 8) {
                  save.data.n.state_starton_spaghetti = 2;
                  assets.sounds.equip.instance(timer);
                  save.storage.inventory.add('spaghetti');
                  await dialogue('auto', ...text.a_starton.objinter.spagtable2);
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.spagtable2b);
               }
            } else {
               await dialogue('auto', ...text.a_starton.objinter.spagtable3());
            }
            break;
         }
         case 'microwave': {
            if (player.face === 'down') {
               if (world.genocide) {
                  await dialogue('auto', ...text.a_starton.objinter.microwave0);
               } else if (save.data.n.state_starton_spaghetti < 1) {
                  header('s/equip').then(() => {
                     save.data.n.state_starton_spaghetti = 1;
                  });
                  await dialogue('auto', ...text.a_starton.objinter.microwave1);
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.microwave2);
               }
            } else {
               await dialogue('auto', ...text.a_starton.objinter.microwave3);
               if (!save.data.b.oops && save.data.n.state_starton_spaghetti < 1) {
                  await dialogue('auto', ...text.a_starton.objinter.microwave4);
               }
            }
            break;
         }
         case 'ctower': {
            if (player.face === 'up') {
               if (save.data.n.plot < 21.2) {
                  game.movement = false;
                  let inputs = 0;
                  let number = 500 + Math.floor(random.next() * 9500);
                  const operations = [] as { type: '-' | '+'; value: number }[];
                  const random3 = new CosmosValueRandom(number);
                  const generate = () => {
                     let index = 0;
                     while (index < 4) {
                        const power = 10 ** (3 - index);
                        while (true) {
                           const type = random3.next() < 0.8 ? (number > 0 ? '-' : '+') : number > 0 ? '+' : '-';
                           const value = Math.floor(random3.next() * 9) + 1;
                           const result = number + (type === '-' ? -value : value) * power;
                           if (
                              result > -1000 &&
                              result < 10000 &&
                              (Math.abs(number) > 9 || result === 0 || random3.next() < 0.2)
                           ) {
                              operations[index++] = { type, value };
                              break;
                           }
                        }
                     }
                  };
                  generate();
                  await dialogue('auto', ...text.a_starton.objinter.ctower0);
                  assets.sounds.menu.instance(timer).rate.value = 1.5;
                  navscript.enable(
                     input => {
                        switch (input) {
                           case 'left':
                           case 'right':
                              assets.sounds.menu.instance(timer).rate.value = 1.5;
                              break;
                           case 'next':
                              assets.sounds.dimbox.instance(timer).rate.value = 1.5;
                              const operation = operations[navscript.position.x];
                              number +=
                                 (operation.type === '-' ? -operation.value : operation.value) *
                                 10 ** (3 - navscript.position.x);
                              if (number === 0 || inputs++ === 20) {
                                 if (number !== 0) {
                                    save.data.b.s_state_mathcrash = true;
                                 }
                                 atlas.switch(null);
                                 navscript.disable();
                                 assets.sounds.noise.instance(timer);
                                 save.data.n.plot = 21.2;
                                 player.face = 'down';
                                 timer.pause(250).then(async () => {
                                    await depower();
                                    save.data.n.plot = 22;
                                    if (world.genocide) {
                                       await dialogue('auto', ...text.a_starton.genotext.asriel20());
                                    } else if (!save.data.b.oops && number === 0) {
                                       await dialogue('auto', ...text.a_starton.truetext.puzzle1);
                                    }
                                    game.movement = true;
                                 });
                              } else {
                                 generate();
                              }
                              break;
                           case 'prev':
                              navscript.disable();
                              atlas.switch(null);
                              game.movement = true;
                              break;
                        }
                     },
                     CosmosUtils.populate(4, index => [ index ]),
                     [
                        ...CosmosUtils.populate(
                           4,
                           index =>
                              new CosmosSprite({
                                 anchor: 0,
                                 frames: [ content.iooSScreenon ],
                                 position: { y: 100, x: 60 + index * 60 },
                                 objects: [
                                    new CosmosText({
                                       fill: 'white',
                                       alpha: 0.8,
                                       charset: '0123456789+-',
                                       anchor: 0,
                                       position: { y: -2.25 },
                                       font: '32px Papyrus'
                                    }).on_legacy('tick', self => () => {
                                       if (number < 0) {
                                          self.content = `-${(-number).toString().padStart(3, '0')}`[index];
                                       } else {
                                          self.content = number.toString().padStart(4, '0')[index];
                                       }
                                    })
                                 ]
                              })
                        ),
                        new CosmosSprite({
                           anchor: 0,
                           priority: 10000,
                           position: { y: 160 },
                           frames: [ content.iooSScreenon ],
                           objects: [
                              new CosmosText({
                                 fill: 'white',
                                 alpha: 0.8,
                                 charset: '0123456789+-',
                                 anchor: 0,
                                 position: { y: -2.25 },
                                 font: '32px Papyrus'
                              }).on_legacy('tick', self => () => {
                                 const operation = operations[navscript.position.x];
                                 self.content = operation.type + operation.value.toString();
                              })
                           ]
                        }).on_legacy('tick', self => () => {
                           self.position.x = 60 + navscript.position.x * 60;
                        })
                     ]
                  );
                  await renderer.on('tick');
                  await timer.pause();
                  atlas.switch('navscript');
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.ctower1());
               }
            }
            break;
         }
         case 'xtower': {
            if (player.face === 'up') {
               game.movement = false;
               await dialogue('auto', ...text.a_starton.objinter.xtower1);
               let score = 0;
               let collateral = 1;
               let ended = false;
               const time = timer.value;
               const targetContainer = new CosmosObject();
               const bulletContainer = new CosmosObject();
               const scorecard = new CosmosText({
                  fill: 'white',
                  alpha: 0.8,
                  charset: 'score:0123456789',
                  anchor: 0,
                  position: { x: 160, y: 75 },
                  font: '14px DeterminationMono'
               });
               const updateScore = (score: number) => {
                  scorecard.content = text.a_starton.xtowerScore.replace('$(x)', Math.min(score, 1000000).toString());
                  if (collateral > 1) {
                     scorecard.content += ` (x${collateral})`;
                  }
                  if (score > 999999) {
                     endGame();
                     if (!save.data.b.s_state_million) {
                        save.data.b.s_state_million = true;
                        timer
                           .when(() => game.movement)
                           .then(() => {
                              assets.sounds.phone.instance(timer);
                              dialogue('auto', ...text.a_starton.xtowerSans());
                              if (!world.genocide) {
                                 if (edgy()) {
                                    save.data.b.s_state_million_garb = true;
                                 } else {
                                    save.data.n.g += 10000;
                                 }
                              } else {
                                 save.data.n.g = 0;
                              }
                           });
                     }
                  }
               };
               const endGame = () => {
                  ended = true;
                  keys.interactKey.off('down', spawnBullet);
                  arrow.alpha.value = 0;
                  Promise.all(
                     targets.map(anim =>
                        Promise.race([
                           anim.alpha.modulate(timer, 300, 0),
                           anim.scale.modulate(timer, 300, { x: 0.5, y: 0.5 }),
                           anim.rotation.modulate(timer, 300, 0, -135),
                           anim.position.modulate(timer, 300, anim.position, anim.position.add(0, 10))
                        ])
                           .then(() => timer.post())
                           .then(() => {
                              const index = targets.indexOf(anim);
                              targetContainer.objects = [ ...targets.slice(0, index), ...targets.slice(index + 1) ];
                           })
                     )
                  ).then(() => {
                     const trueScore = Math.min(Math.max(save.data.n.state_starton_xtower, score), 1000000);
                     save.data.n.state_starton_xtower = trueScore;
                     const scores = {
                        sans: 999999,
                        kidd: 121975,
                        papyrus: 42732,
                        napstablook: 9440,
                        undyne: 1987,
                        you: trueScore
                     } as Partial<CosmosKeyed<number, keyof typeof text.a_starton.xtowerHiscoreNames & string>>;
                     scorecard.font = '14px DeterminationMono';
                     scorecard.position.y = 120;
                     scorecard.spacing.y = 1;
                     const max = Math.max(...Object.values(text.a_starton.xtowerHiscoreNames).map(x => x.length));
                     scorecard.content = `${text.a_starton.xtowerHiscoreHeader}\n\n${Object.entries(scores)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(
                           ([ key, score ]) =>
                              `${CosmosUtils.provide(
                                 text.a_starton.xtowerHiscoreNames[key as keyof typeof scores]
                              ).padEnd(max, ' ')}  -  ${score}`
                        )
                        .join('\n')}\n\n${
                        score > save.data.n.state_starton_xtower
                           ? text.a_starton.xtowerMessage1
                           : text.a_starton.xtowerMessage2
                     }`;
                     keys.specialKey.on('down').then(() => {
                        renderer.detach('main', container);
                        game.movement = true;
                     });
                  });
               };
               keys.specialKey.on('down').then(() => {
                  ended || endGame();
               });
               updateScore(0);
               const arrow = new CosmosAnimation({
                  priority: -10,
                  resources: content.iooSWidescreenPlayer,
                  anchor: 0
               }).on('tick', () => {
                  const left = keys.leftKey.active();
                  const right = keys.rightKey.active();
                  const up = keys.upKey.active();
                  const down = keys.downKey.active();
                  left && (arrow.position.x -= 2);
                  right && (arrow.position.x += 2);
                  up && (arrow.position.y -= 2);
                  down && (arrow.position.y += 2);
                  if (up) {
                     arrow.rotation.value = 0;
                  } else if (down) {
                     arrow.rotation.value = 180;
                  } else if (left) {
                     arrow.rotation.value = 270;
                  } else if (right) {
                     arrow.rotation.value = 90;
                  }
                  arrow.position.x = Math.min(Math.max(arrow.position.x, -105), 105);
                  arrow.position.y = Math.min(Math.max(arrow.position.y, -50), 50);
               });
               const widescreen = new CosmosSprite({
                  anchor: 0,
                  position: { x: 160, y: 120 },
                  frames: [ content.iooSWidescreen ],
                  objects: [ targetContainer, bulletContainer, arrow ]
               });
               const targets = targetContainer.objects as CosmosSprite[];
               const spawnTarget = () => {
                  let hit = false;
                  const base = new CosmosPoint((random.next() - 0.5) * 95 * 2, (random.next() - 0.5) * 40 * 2);
                  const anim = new CosmosAnimation({
                     alpha: 0,
                     scale: 0.5,
                     rotation: -135,
                     anchor: 0,
                     metadata: { hit: false, lifetime: 150 },
                     position: base.add(0, 10),
                     resources: content.iooSWidescreenReticle
                  }).on('tick', () => {
                     anim.metadata.lifetime = Math.max((anim.metadata.lifetime as number) - 1, 0);
                     if (anim.metadata.hit && !hit) {
                        hit = true;
                        assets.sounds.gunshot.instance(timer).rate.value = CosmosMath.remap(
                           anim.metadata.lifetime,
                           0.8,
                           1.2,
                           0,
                           150
                        );
                        Promise.all([
                           anim.alpha.modulate(timer, 300, 0),
                           anim.scale.modulate(timer, 300, { x: 2, y: 2 }),
                           anim.rotation.modulate(timer, 300, 0, 135)
                        ])
                           .then(() => timer.post())
                           .then(() => {
                              const index = targets.indexOf(anim);
                              targetContainer.objects = [ ...targets.slice(0, index), ...targets.slice(index + 1) ];
                           });
                     }
                  });
                  anim.alpha.modulate(timer, 300, 1);
                  anim.scale.modulate(timer, 300, { x: 1, y: 1 });
                  anim.rotation.modulate(timer, 300, 0, 0);
                  anim.position.modulate(timer, 300, base, base);
                  timer.pause(2e3).then(async () => {
                     let index = 0;
                     while (index++ < 1) {
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        assets.sounds.noise.instance(timer).gain.value = 0.2;
                        anim.alpha.value = 0.5;
                        await timer.pause(500);
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        anim.alpha.value = 1;
                        await timer.pause(500);
                     }
                     index = 0;
                     while (index++ < 2) {
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        assets.sounds.noise.instance(timer).gain.value = 0.2;
                        anim.alpha.value = 0.5;
                        await timer.pause(250);
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        anim.alpha.value = 1;
                        await timer.pause(250);
                     }
                     index = 0;
                     while (index++ < 4) {
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        assets.sounds.noise.instance(timer).gain.value = 0.2;
                        anim.alpha.value = 0.5;
                        await timer.pause(125);
                        if (anim.metadata.hit || ended) {
                           return;
                        }
                        anim.alpha.value = 1;
                        await timer.pause(125);
                     }
                     if (!ended && !anim.metadata.hit) {
                        endGame();
                     }
                  });
                  targets.push(anim);
               };
               const bullets = bulletContainer.objects as CosmosSprite[];
               const spawnBullet = () => {
                  if (arrow.index === 0) {
                     assets.sounds.frypan.instance(timer).rate.value = 2;
                     arrow.index = 1;
                     timer.pause(400).then(() => {
                        arrow.index = 0;
                     });
                     let active = true;
                     let atLeastOneHit = false;
                     const base = arrow.position.endpoint(arrow.rotation.value - 90, 5);
                     const offset = base.subtract(arrow.position).divide(5);
                     const anim = new CosmosSprite({
                        alpha: 0,
                        scale: 0.5,
                        anchor: 0,
                        position: base,
                        frames: [ content.iooSWidescreenBullet ]
                     }).on('tick', () => {
                        if (active) {
                           let index = 0;
                           let distance = 8;
                           while (index++ < 7) {
                              active && (anim.position = anim.position.add(offset));
                              let match = false;
                              for (const target of targets) {
                                 if (
                                    !target.metadata.hit &&
                                    Math.abs(anim.position.x - target.position.x) < distance &&
                                    Math.abs(anim.position.y - target.position.y) < distance
                                 ) {
                                    distance -= 2;
                                    match = true;
                                    target.metadata.hit = true;
                                    if (atLeastOneHit) {
                                       const current = (collateral += 0.25);
                                       timer.pause(750).then(() => {
                                          if (collateral === current) {
                                             collateral = 1;
                                             Promise.all([
                                                scorecard.scale.modulate(timer, 150, { x: 1.25, y: 1.25 }),
                                                scorecard.alpha.modulate(timer, 150, 0.5)
                                             ]).then(() => {
                                                updateScore((score = Math.ceil(score * current)));
                                                scorecard.scale.modulate(timer, 150, { x: 1, y: 1 });
                                                scorecard.alpha.modulate(timer, 150, 1);
                                             });
                                          }
                                       });
                                    } else {
                                       atLeastOneHit = true;
                                    }
                                    updateScore((score += Math.ceil(target.metadata.lifetime as number)));
                                    break;
                                 }
                              }
                              if (
                                 active &&
                                 (match ||
                                    anim.position.x < -110 ||
                                    anim.position.x > 110 ||
                                    anim.position.y < -55 ||
                                    anim.position.y > 55)
                              ) {
                                 if (!match) {
                                    active = false;
                                    const bomb = assets.sounds.bomb.instance(timer);
                                    bomb.rate.value = 1.25;
                                    bomb.gain.value = 0.2;
                                 }
                                 if (!anim.metadata.fading) {
                                    anim.metadata.fading = true;
                                    Promise.all([
                                       anim.alpha.modulate(timer, 300, 0),
                                       anim.scale.modulate(timer, 300, { x: 0.5, y: 0.5 })
                                    ])
                                       .then(() => timer.post())
                                       .then(() => {
                                          const index = bullets.indexOf(anim);
                                          bulletContainer.objects = [
                                             ...bullets.slice(0, index),
                                             ...bullets.slice(index + 1)
                                          ];
                                       });
                                 }
                              }
                           }
                        }
                     });
                     anim.alpha.modulate(timer, 300, 1);
                     anim.scale.modulate(timer, 300, { x: 1, y: 1 });
                     bullets.push(anim);
                  }
               };
               assets.sounds.menu.instance(timer).rate.value = 1.5;
               const container = new CosmosObject({
                  priority: -10000,
                  objects: [ widescreen, scorecard ]
               });
               renderer.attach('main', container);
               keys.interactKey.on('down', spawnBullet);
               while (!ended) {
                  spawnTarget();
                  await timer.pause(CosmosMath.bezier(Math.min(timer.value - time, 15e4) / 15e4, 2500, 600));
               }
            }
            break;
         }
         case 'puzzlechip': {
            if (!roomState.activating) {
               roomState.activating = true;
               const target = game.room === 's_puzzle1' ? 24 : 25;
               if (save.data.n.plot < target) {
                  assets.sounds.menu.instance(timer).rate.value = 1.5;
                  const id = +args[0];
                  const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
                  if (id === puzzle.index + 1) {
                     puzzle.index = id;
                     if (id === puzzle.frames.length - 7) {
                        const move = game.movement;
                        move && (game.movement = false);
                        puzzle.enable();
                        await timer.when(() => puzzle.index === puzzle.frames.length - 3);
                        puzzle.disable();
                        await timer.pause(166);
                        puzzle.index = puzzle.frames.length - 4;
                        assets.sounds.menu.instance(timer).rate.value = 1;
                        await timer.pause(66);
                        puzzle.index = puzzle.frames.length - 3;
                        assets.sounds.menu.instance(timer).rate.value = 1.25;
                        await timer.pause(66);
                        puzzle.index = puzzle.frames.length - 4;
                        assets.sounds.menu.instance(timer).rate.value = 1.5;
                        await timer.pause(266);
                        puzzle.index = puzzle.frames.length - 3;
                        assets.sounds.menu.instance(timer).rate.value = 1;
                        if (world.genocide || target !== 25) {
                           move && (game.movement = true);
                        }
                        await depower();
                        save.data.n.plot = target;
                     }
                  } else {
                     const move = game.movement;
                     move && (game.movement = false);
                     puzzle.index = puzzle.frames.length - 2;
                     await timer.pause(166);
                     puzzle.index = puzzle.frames.length - 1;
                     assets.sounds.menu.instance(timer).rate.value = 1;
                     await timer.pause(66);
                     puzzle.index = puzzle.frames.length - 2;
                     assets.sounds.menu.instance(timer).rate.value = 0.75;
                     await timer.pause(66);
                     puzzle.index = puzzle.frames.length - 1;
                     assets.sounds.menu.instance(timer).rate.value = 0.625;
                     await timer.pause(266);
                     assets.sounds.menu.instance(timer).rate.value = 0.5;
                     puzzle.index = 0;
                     move && (game.movement = true);
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.puzzlechip);
               }
               roomState.activating = false;
            }
            break;
         }
         case 'puzzle3': {
            game.movement = false;
            const sets = world.genocide
               ? [
                    [ 'r1', 'c1' ],
                    [ 'r1', 'c4' ],
                    [ 'r2', 'c3' ],
                    [ 'r3', 'c2' ],
                    [ 'r4', 'c1' ],
                    [ 'r4', 'c4' ]
                 ]
               : [
                    [ 'r1', 'c3' ],
                    [ 'r2', 'c4' ],
                    [ 'r3', 'c3' ],
                    [ 'r4', 'c2' ],
                    [ 'r2', 'c1' ],
                    [ 'r2', 'c2' ]
                 ];
            const activate = (tag: string, state: number, tag2?: string) => {
               for (const { object } of instances('main', tag)) {
                  if (!tag2 || (object.metadata.tags as string[]).includes(tag2)) {
                     const anim = object.objects[0] as CosmosAnimation;
                     anim.index = state;
                  }
               }
            };
            if (save.data.n.plot < 27) {
               if (args.length > 0) {
                  if (!save.data.s.state_starton_s_puzzle3) {
                     assets.sounds.menu.instance(timer).rate.value = 1.2;
                     activate((save.data.s.state_starton_s_puzzle3 = args[0]), 1);
                  } else if (save.data.s.state_starton_s_puzzle3[0] === args[0][0]) {
                     activate(save.data.s.state_starton_s_puzzle3, 0);
                     if (save.data.s.state_starton_s_puzzle3[1] !== args[0][1]) {
                        assets.sounds.menu.instance(timer);
                        activate((save.data.s.state_starton_s_puzzle3 = args[0]), 1);
                     } else {
                        save.data.s.state_starton_s_puzzle3 = '';
                        assets.sounds.menu.instance(timer).rate.value = 0.8;
                     }
                  } else {
                     assets.sounds.menu.instance(timer).rate.value = 1.2;
                     activate(args[0], 1);
                     await timer.pause(100);
                     const r = args[0][0] === 'r' ? args[0] : save.data.s.state_starton_s_puzzle3;
                     const c = args[0][0] === 'c' ? args[0] : save.data.s.state_starton_s_puzzle3;
                     const correctSet = sets[(save.data.n.state_starton_s_puzzle3 ||= 0)];
                     save.data.n.state_starton_s_puzzle3++;
                     if (correctSet[0] === r && correctSet[1] === c) {
                        assets.sounds.menu.instance(timer).rate.value = 1.2;
                        activate(args[0], 2, save.data.s.state_starton_s_puzzle3);
                        await timer.pause(100);
                        assets.sounds.menu.instance(timer).rate.value = 1.4;
                        activate('puzzle3tile', 0);
                        for (const [ a, b ] of sets.slice(0, save.data.n.state_starton_s_puzzle3 as number)) {
                           activate(a, 2, b);
                        }
                        if (save.data.n.state_starton_s_puzzle3 === sets.length) {
                           await timer.pause(100);
                           activate('puzzle3tile', 0);
                           await timer.pause(200);
                           assets.sounds.menu.instance(timer).rate.value = 1.4;
                           activate('puzzle3tile', 0);
                           for (const [ a, b ] of sets.slice(0, save.data.n.state_starton_s_puzzle3 as number)) {
                              activate(a, 2, b);
                           }
                           await timer.pause(100);
                           activate('puzzle3tile', 0);
                           await timer.pause(200);
                           assets.sounds.menu.instance(timer).rate.value = 1.4;
                           activate('puzzle3tile', 0);
                           for (const [ a, b ] of sets.slice(0, save.data.n.state_starton_s_puzzle3 as number)) {
                              activate(a, 2, b);
                           }
                           await timer.pause(600);
                           await depower();
                           save.data.n.plot = 27;
                        }
                     } else {
                        save.data.n.state_starton_s_puzzle3 = 0;
                        assets.sounds.menu.instance(timer);
                        activate(args[0], 3, save.data.s.state_starton_s_puzzle3);
                        await timer.pause(200);
                        assets.sounds.menu.instance(timer).rate.value = 0.6;
                        activate(args[0], 4, save.data.s.state_starton_s_puzzle3);
                        await timer.pause(400);
                        activate('puzzle3tile', 0);
                     }
                     save.data.s.state_starton_s_puzzle3 = '';
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.puzzle3());
                  if (choicer.result === 0) {
                     await timer.pause(300);
                     if (save.data.s.state_starton_s_puzzle3 || save.data.n.state_starton_s_puzzle3) {
                        assets.sounds.menu.instance(timer).rate.value = 0.8;
                        save.data.s.state_starton_s_puzzle3 = '';
                        activate('puzzle3tile', 0);
                        await timer.pause(700);
                     }
                     for (const [ a, b ] of sets) {
                        assets.sounds.menu.instance(timer).rate.value = 1.2;
                        activate(a, 1);
                        activate(b, 1);
                        activate(a, 2, b);
                        await timer.pause(700);
                        activate('puzzle3tile', 0);
                     }
                  }
               }
            } else if (args.length > 0) {
               await dialogue('auto', ...text.a_starton.objinter.puzzlechip);
            } else {
               await dialogue('auto', ...text.a_starton.objinter.puzzle3);
            }
            game.movement = true;
            break;
         }
         case 'papsinter': {
            if (game.room === 's_puzzle2') {
               if (save.data.n.plot < 24.1) {
                  await dialogue('auto', ...text.a_starton.papsolution0);
                  break;
               } else if (save.data.n.plot < 24.101) {
                  await dialogue('auto', ...text.a_starton.papsolution999);
                  save.data.n.plot = 24.101;
               } else if (save.data.n.plot < 24.11) {
                  await dialogue('auto', ...text.a_starton.papsolution999a);
                  save.data.n.plot = 24.11;
               } else if (save.data.n.plot < 24.2) {
                  await dialogue('auto', ...text.a_starton.papsolution1);
                  save.data.n.plot = 24.2;
               }
               if (save.data.n.plot < 24.3) {
                  await dialogue('auto', ...text.a_starton.papsolution1a);
                  switch (choicer.result) {
                     case 0:
                        await dialogue('auto', ...text.a_starton.papsolution2b);
                        break;
                     case 1:
                        await dialogue('auto', ...text.a_starton.papsolution2a);
                        save.data.n.plot = 24.3;
                        break;
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.papsolution2c);
               }
               break;
            }
         }
         case 'trickswitch': {
            if (save.data.n.plot < 25) {
               roomState.trickswitch = true;
               const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
               puzzle.index = puzzle.frames.length - 8;
            }
            break;
         }
         case 'kitchen': {
            if (!roomState.kitchen && (player.position.y < 140 || roomState.forcedY)) {
               roomState.forcedY = false;
               roomState.kitchen = true;
               const trashie = instance('main', 'paptrashie')!.object;
               const wallie = instance('below', 'kitchenwallv2electricboogaloo')!.object.objects[0];
               trashie.priority.value = trashie.objects[0].y;
               roomState.paps && (roomState.paps.priority.value = 4100);
               for (const toppo of instances('main', 'toppo')) {
                  toppo.object!.priority.value = 4000;
               }
               for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
                  sussy.metadata[sussy.metadata.restore as string] = true;
               }
               const top = instance('main', 'bonetop')!.object;
               top.priority.value = 2000;
               wallie.metadata.barrier = false;
               top.alpha.modulate(timer, top.alpha.value * 300, 0);
               await timer.when(() => player.position.y > 140 || roomState.forcedY);
               trashie.priority.value = 0;
               roomState.kitchen = false;
               top.priority.value = 0;
               wallie.metadata.barrier = true;
               for (const toppo of instances('main', 'toppo')) {
                  toppo.object!.priority.value = 0;
               }
               roomState.paps && !roomState.forcedY && (roomState.paps.priority.value = 0);
               for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
                  sussy.metadata[sussy.metadata.restore as string] = false;
               }
               top.alpha.modulate(timer, (1 - top.alpha.value) * 300, 1);
            }
            break;
         }
         case 'bonehouse': {
            if (save.data.n.plot_date < 0.1 && !save.data.b.papyrus_secret) {
               await dialogue('auto', ...text.a_starton.papdate0());
               player.position.y += 3;
               player.face = 'down';
            } else {
               await teleport('s_bonehouse', 'up', 240, 230, world);
            }
            break;
         }
         case 'balcony': {
            await teleport('s_town2', 'right', 720, 114, world);
            function pticker (this: CosmosObject) {
               this.priority.value = this.y + 175;
            }
            const bloc = instance('main', 'housebloc')!.object;
            const barriers = new CosmosObject({
               position: { x: 740, y: 102 },
               objects: [
                  new CosmosHitbox({ metadata: { barrier: true }, size: { x: -20, y: -20 } }),
                  new CosmosHitbox({ metadata: { barrier: true }, size: { x: 20, y: 26 } }),
                  new CosmosHitbox({ metadata: { barrier: true }, position: { y: 26 }, size: { x: -20, y: 20 } })
               ]
            });
            renderer.attach('main', barriers);
            for (const object of bloc.objects) {
               if (object.metadata.bloc) {
                  object.metadata.barrier = false;
               }
            }
            player.on('tick', pticker);
            goatbro.on('tick', pticker);
            await timer.when(() => player.position.x < 715);
            player.off('tick', pticker);
            goatbro.off('tick', pticker);
            renderer.detach('main', barriers);
            for (const object of bloc.objects) {
               if (object.metadata.bloc) {
                  object.metadata.barrier = true;
               }
            }
            game.movement = false;
            await teleport('s_bonehouse', 'left', 300, 74, world);
            if (save.data.n.plot_date < 0.2 && !roomState.walkin && save.data.n.state_starton_papyrus === 0) {
               roomState.walkin = true;
               await dialogue('auto', ...text.a_starton.balcony0);
               save.data.n.state_papyrus_view = (choicer.result + 1) as 1 | 2;
               await dialogue('auto', ...[ text.a_starton.balcony1, text.a_starton.balcony2 ][choicer.result]);
            } else {
               await renderer.on('render');
               await renderer.on('render');
            }
            player.priority.value = 0;
            goatbro.priority.value = 0;
            game.movement = true;
            break;
         }
         case 'kiddTalk': {
            const kidd = instance('main', 's_pacikid')!.object;
            scriptState.cooldown ??= 0;
            if (
               kidd.metadata.barrier &&
               player.x > kidd.x - 10 &&
               player.x < kidd.x + 10 &&
               player.y > kidd.y - 5 &&
               player.y < kidd.y + 3
            ) {
               player.y = player.y > kidd.y ? kidd.y + 3 : kidd.y - 5;
            } else if (game.movement && scriptState.cooldown <= timer.value) {
               kidd.metadata.pause = true;
               if (kidd.metadata.wait) {
                  await dialogue('auto', ...text.a_starton.kidd2());
               } else {
                  await dialogue('auto', ...text.a_starton.kidd1());
               }
               kidd.metadata.pause = false;
               scriptState.cooldown = timer.value + 1000;
            }
            break;
         }
         case 'npc': {
            if (!game.movement) {
               break;
            }
            instance('main', args[0] === 'g_grillby' ? 'g_redbird' : args[0])?.talk(
               'a',
               talkFilter(),
               'auto',
               ...CosmosUtils.provide(text.a_starton.npcinter[args[0] as keyof typeof text.a_starton.npcinter])
            );
            break;
         }
         case 'papmail': {
            if (!game.movement) {
               break;
            }
            await dialogue('auto', ...text.a_starton.objinter.papmail1);
            if (choicer.result === 0) {
               await dialogue('auto', ...text.a_starton.objinter.papmail2());
            } else {
               await dialogue('auto', ...text.a_starton.objinter.papmail3);
            }
            break;
         }
         case 'beddoor': {
            if (world.population === 0) {
               await teleport('s_beddinng', 'up', 150, 230, world);
            } else if (save.data.n.state_starton_sleep === 0) {
               await dialogue('auto', ...text.a_starton.beddoor1);
            } else {
               await dialogue('auto', ...text.a_starton.beddoor2);
            }
            player.position.y += 3;
            player.face = 'down';
            break;
         }
         case 'bedbook': {
            await dialogue('auto', ...text.a_starton.bedbook1);
            if (save.data.b.oops) {
               await dialogue('auto', ...text.a_starton.bedbook2);
            } else {
               await dialogue(
                  'auto',
                  ...[ text.a_starton.bedbook3a, text.a_starton.bedbook3b ][save.data.b.s_state_chareader ? 1 : 0]
               );
               await dialogue('auto', ...text.a_starton.bedbook4);
               if (choicer.result === 0) {
                  save.data.b.s_state_chareader = true;
                  await dialogue('auto', ...text.a_starton.bedbook5);
               } else {
                  await dialogue('auto', ...text.a_starton.bedbook6);
               }
            }
            break;
         }
         case 'innkeep': {
            if (args[0] === 'geno') {
               if (world.population === 0) {
                  await dialogue('auto', ...text.a_starton.gonezo());
               }
               break;
            }
            game.movement = false;
            const speak = async (...lines: string[]) => {
               await instance('main', 'i_innkeep')?.talk('a', talkFilter(), 'auto', ...lines);
            };
            if (args[0] === 'sleep' || args[0] === 'leave') {
               if (args[0] === 'sleep') {
                  const bedcover = new CosmosSprite({
                     position: { x: 113, y: 112 },
                     priority: 1000,
                     frames: [ content.iooSBedcover ]
                  });
                  renderer.attach('main', bedcover);
                  await player.position.modulate(timer, 1450, { x: 132, y: player.position.y });
                  await renderer.alpha.modulate(timer, 1850, 0);
                  renderer.detach('main', bedcover);
                  await timer.pause(1850);
                  save.data.n.hp = Math.max(save.data.n.hp, Math.min(calcHP() + 10, 99));
               } else {
                  if (world.population > 0) {
                     await renderer.alpha.modulate(timer, 500, 0);
                  }
               }
               if (world.population > 0) {
                  await timer.pause(650);
               }
               await teleport('s_innterior', 'down', 90, 80, world);
               if (world.population > 0) {
                  await timer.pause(650);
                  await speak(...text.a_starton.innkeep3a);
                  if (args[0] === 'sleep') {
                     await speak(...text.a_starton.innkeep5);
                  } else {
                     await speak(...text.a_starton.innkeep3b);
                     if (save.data.n.state_starton_sleep % 2 === 0) {
                        await speak(...text.a_starton.innkeep3d);
                        save.data.n.g += 80;
                     } else {
                        await speak(...text.a_starton.innkeep3c);
                     }
                  }
               }
               game.movement = true;
               break;
            }
            let sleep = false;
            switch (save.data.n.state_starton_sleep) {
               case 0:
                  await speak(...text.a_starton.innkeep1a());
                  if (choicer.result === 0) {
                     sleep = true;
                     if (save.data.n.g < 80) {
                        save.data.n.state_starton_sleep = 1;
                        await speak(...text.a_starton.innkeep2a);
                     } else {
                        save.data.n.g -= 80;
                        save.data.n.state_starton_sleep = 2;
                        await speak(...text.a_starton.innkeep2b);
                     }
                  } else {
                     await speak(...text.a_starton.innkeep4);
                  }
                  break;
               case 1:
                  await speak(...text.a_starton.innkeep1c());
                  if (save.data.n.state_starton_sleep === 1 && choicer.result === 0) {
                     sleep = true;
                     await speak(...text.a_starton.innkeep2b);
                  } else {
                     await speak(...text.a_starton.innkeep4);
                  }
                  break;
               case 2:
                  await speak(...text.a_starton.innkeep1b());
                  if (save.data.n.state_starton_sleep === 2 && choicer.result === 0) {
                     if (save.data.n.g < 80) {
                        await speak(...text.a_starton.innkeep2c);
                     } else {
                        sleep = true;
                        save.data.n.g -= 80;
                        await speak(...text.a_starton.innkeep2b);
                     }
                  } else {
                     await speak(...text.a_starton.innkeep4);
                  }
                  break;
            }
            if (sleep) {
               await renderer.alpha.modulate(timer, 500, 0);
               await timer.pause(500);
               await teleport('s_beddinng', 'up', 150, 230, world);
            }
            game.movement = true;
            break;
         }
         case 'jukebox': {
            // TODO: jukebox menu
            break;
         }
         case 'stool': {
            instance('main', args[0]) || (await dialogue('auto', ...text.a_starton.gonezo()));
            break;
         }
         case 'housebloc': {
            await dialogue('auto', ...text.a_starton.housebloc);
            break;
         }
         case 'npc98': {
            if (world.genocide && save.data.n.state_starton_npc98 < 3) {
               if (save.storage.inventory.size < 8) {
                  switch (save.data.n.state_starton_npc98) {
                     case 0:
                        await dialogue('auto', ...text.a_starton.robotTake1);
                        save.data.n.state_starton_npc98 = 1;
                        break;
                     case 1:
                        await dialogue('auto', ...text.a_starton.robotTake2);
                        save.data.n.state_starton_npc98 = 2;
                        break;
                     case 2:
                        await dialogue('auto', ...text.a_starton.robotTake3);
                        save.data.n.state_starton_npc98 = 5;
                        break;
                  }
                  assets.sounds.equip.instance(timer);
                  save.storage.inventory.add('chip');
                  await dialogue('auto', ...text.a_starton.robotTake4);
               } else {
                  await dialogue('auto', ...text.a_starton.robotTake0);
               }
            } else if (save.data.n.state_starton_npc98 === 5) {
               await dialogue('auto', ...text.a_starton.robotDead);
            } else {
               switch (save.data.n.state_starton_npc98) {
                  case 0:
                     await dialogue('auto', ...text.a_starton.robot1());
                     if (choicer.result === 1) {
                        await dialogue('auto', ...text.a_starton.robot4);
                     } else if (save.storage.inventory.size < 8) {
                        save.data.n.state_starton_npc98 = 1;
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('chip');
                        await dialogue('auto', ...text.a_starton.robot2);
                     } else {
                        await dialogue('auto', ...text.a_starton.robot3);
                     }
                     break;
                  case 1:
                     if (
                        save.storage.inventory.has('chip') ||
                        save.storage.dimboxA.has('chip') ||
                        save.storage.dimboxB.has('chip')
                     ) {
                        await dialogue('auto', ...text.a_starton.robot5);
                     } else {
                        await dialogue('auto', ...text.a_starton.robot6);
                        if (choicer.result === 1) {
                           await dialogue('auto', ...text.a_starton.robot8);
                        } else if (save.storage.inventory.size < 8) {
                           save.data.n.state_starton_npc98 = 2;
                           assets.sounds.equip.instance(timer);
                           save.storage.inventory.add('chip');
                           await dialogue('auto', ...text.a_starton.robot7);
                        } else {
                           await dialogue('auto', ...text.a_starton.robot3);
                        }
                     }
                     break;
                  case 2:
                     if (
                        save.storage.inventory.has('chip') ||
                        save.storage.dimboxA.has('chip') ||
                        save.storage.dimboxB.has('chip')
                     ) {
                        await dialogue('auto', ...text.a_starton.robot9);
                     } else {
                        save.data.n.state_starton_npc98 = 3;
                        await dialogue('auto', ...text.a_starton.robot10);
                     }
                     break;
                  case 3:
                     await dialogue('auto', ...text.a_starton.robot11);
                     break;
                  case 4:
                  case 4.1:
                     await dialogue('auto', ...text.a_starton.robot12);
                     break;
               }
            }
            break;
         }
         case 'candy': {
            if (game.movement) {
               await dialogue('auto', ...text.a_starton.candy1());
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     if (save.data.n.g < 15) {
                        await dialogue('auto', ...text.a_starton.candy2);
                     } else {
                        assets.sounds.equip.instance(timer);
                        save.data.n.g -= 15;
                        save.storage.inventory.add('berry');
                        await dialogue('auto', ...text.a_starton.candy4);
                     }
                  } else {
                     await dialogue('auto', ...text.a_starton.candy3);
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.candy5);
               }
            }
            break;
         }
         case 'house': {
            if (world.population < 10) {
               await dialogue('auto', ...text.a_starton.gonezo());
            }
            break;
         }
         case 'capstation': {
            if (world.population < 8) {
               if (player.face === 'down') {
                  if (save.data.b.s_state_capstation) {
                     await dialogue('auto', ...text.a_starton.capstation2);
                  } else {
                     await dialogue('auto', ...text.a_starton.capstation1);
                     save.data.b.s_state_capstation = true;
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.gonezo());
               }
            }
            break;
         }
         case 'proceed': {
            game.movement = false;
            if (save.data.n.state_starton_azzybridge < 2) {
               await dialogue('auto', ...text.a_starton.genotext.asrielX1);
               save.data.n.state_starton_azzybridge = 2;
            } else {
               await dialogue('auto', ...text.a_starton.genotext.asrielX2);
            }
            if (choicer.result === 0) {
               await dialogue('auto', ...text.a_starton.genotext.asrielX5);
               game.movement = true;
            } else {
               await dialogue('auto', ...text.a_starton.genotext.asrielX6);
               roomState.lessgo = true;
            }
            break;
         }
         case 'paptv': {
            game.movement = false;
            const tv = instance('main', 'paptv')!.object;
            const tvsprite = tv.objects[0] as CosmosSprite;
            const tvanim = new CosmosAnimation({
               active: true,
               anchor: tvsprite.anchor.value(),
               position: tvsprite.position.value(),
               resources: content.iooSTVOn
            });
            tv.attach(tvanim);
            game.music && (game.music.gain.value = 0);
            const tvmusic = assets.sounds.tv.instance(timer);
            if (!roomState.tvdelay) {
               roomState.tvdelay = true;
               await timer.pause(850);
            }
            await dialogue('auto', ...text.a_starton.paptv());
            const index = tv.objects.indexOf(tvanim);
            tv.objects = [ ...tv.objects.slice(0, index), ...tv.objects.slice(index + 1) ];
            tvmusic.stop();
            game.music && (game.music.gain.value = world.level);
            game.movement = true;
            break;
         }
         case 'papcouch': {
            if (save.data.b.s_state_pilfer) {
               await dialogue('auto', ...text.a_starton.papcouch0);
            } else {
               await dialogue('auto', ...text.a_starton.papcouch1());
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_starton.papcouch2);
               } else {
                  await dialogue('auto', ...text.a_starton.papcouch3);
                  save.data.n.g += 20;
                  save.data.b.s_state_pilfer = true;
                  if (!save.data.b.oops) {
                     await dialogue('auto', ...text.a_starton.papcouch4);
                  }
               }
            }
            break;
         }
         case 'papsink': {
            game.movement = false;
            await dialogue('auto', ...text.a_starton.papsink0);
            if (!roomState.sink && save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0) {
               roomState.sink = true;
               const mus1 = content.amDogsigh.load();
               const mus2 = content.amDogdance.load();
               const grab = content.asGrab.load();
               const sprite1 = content.iooSToby3.load();
               const sprite2 = content.iooSToby2.load();
               const sprite3 = content.iooSToby1.load();
               const specatk = content.ibbSpecatkBone.load();
               const present = content.iocPapyrusPresent.load();
               const sallow = content.asSwallow.load();
               const trombone = content.iocSansTrombone.load();
               const boner = content.asTrombone.load();
               await dialogue('auto', ...text.a_starton.papsink1);
               await Promise.all([ sprite1, timer.pause(350) ]);
               const toby = new CosmosAnimation({
                  active: true,
                  priority: -6666,
                  anchor: { x: 0, y: 1 },
                  position: { x: 226, y: 72 },
                  resources: content.iooSToby3
               });
               renderer.attach('main', toby);
               const sink = instance('main', 'papsink')!.object.objects[0] as CosmosAnimation;
               sink.index = 1;
               assets.sounds.door.instance(timer);
               game.music!.gain.value = 0;
               await Promise.all([ mus1, timer.pause(650) ]);
               const sigh = assets.music.dogsigh.instance(timer);
               await timer.pause(1150);
               await dialogue('auto', ...text.a_starton.papsink2);
               const paps = roomState.paps as CosmosCharacter;
               paps.metadata.override = true;
               timer
                  .when(() => paps.position.y < 100)
                  .then(async () => {
                     await player.walk(timer, 3, { x: 245 });
                     player.face = 'left';
                  });
               await paps.walk(timer, 4, { x: 224, y: 85 });
               await timer.pause(650);
               await Promise.all([ present, sallow, grab, specatk, dialogue('auto', ...text.a_starton.papsink3) ]);
               renderer.detach('main', paps);
               const handout = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  priority: 10000,
                  position: paps.position.value(),
                  resources: content.iocPapyrusPresent
               });
               renderer.attach('main', handout);
               await timer.when(() => handout.index === 3);
               const sfx = assets.sounds.grab.instance(timer);
               await timer.when(() => handout.index === 5);
               handout.disable();
               timer.pause(850).then(async () => {
                  renderer.detach('main', handout);
                  content.iocPapyrusPresent.unload();
                  renderer.attach('main', paps);
                  await paps.walk(timer, 4, { y: 120 });
                  paps.face = 'up';
                  sfx.stop();
                  content.asGrab.unload();
               });
               const gift = new CosmosSprite({
                  anchor: 0,
                  position: paps.position.add(17, -30.5),
                  priority: 9999,
                  rotation: 90,
                  frames: [ content.ibbSpecatkBone ]
               });
               renderer.attach('main', gift);
               const dest = toby.position.subtract(8, 4.5);
               const arcTop = new CosmosPoint(dest.x + (gift.position.x - dest.x), -50);
               await Promise.all([
                  gift.position.modulate(timer, 4000, arcTop, arcTop, arcTop, arcTop, dest),
                  gift.rotation.modulate(timer, 4000, 360 * 7)
               ]);
               sigh.stop();
               content.amDogsigh.unload();
               assets.sounds.swallow.instance(timer);
               renderer.detach('main', gift);
               content.ibbSpecatkBone.unload();
               toby.use(content.iooSToby2);
               content.iooSToby3.unload();
               await Promise.all([ mus2, sprite3, timer.pause(1150) ]);
               const dance = assets.music.dogdance.instance(timer);
               toby.use(content.iooSToby1);
               content.iooSToby2.unload();
               await timer.pause(650);
               await Promise.all([ sprite2, trombone, dialogue('auto', ...text.a_starton.papsink4) ]);
               const top = instance('main', 'bonetop')!.object;
               const door = new CosmosSprite({
                  position: { x: 253, y: 12 },
                  priority: 6500,
                  frames: [ content.iooSSansdoor ]
               }).on('tick', function () {
                  this.alpha.value = top.alpha.value;
               });
               const sand = new CosmosAnimation({
                  anchor: { x: 1 },
                  priority: 6499,
                  position: door.position.add(30, 10),
                  resources: content.iocSansTrombone
               }).on('tick', function () {
                  this.alpha.value = top.alpha.value;
               });
               const oldp1 = player.priority.value;
               player.priority.value = -9000;
               const oldp2 = paps.priority.value;
               paps.priority.value = -8000;
               renderer.attach('main', sand, door);
               assets.sounds.door.instance(timer);
               roomState.forcedY = true;
               dance.gain.modulate(timer, 500, 0).then(() => {
                  dance.stop();
                  content.amDogdance.unload();
               });
               await Promise.all([ sand.position.modulate(timer, 650, sand.position.add(37, 0)), boner ]);
               const dumbvictory = assets.sounds.trombone.instance(timer);
               sink.index = 0;
               renderer.detach('main', toby);
               content.iooSToby1.unload();
               paps.preset = characters.papyrusMad;
               const noterate = (6 / 11 / 4) * 1000;
               CosmosUtils.populate(
                  6,
                  index => index++ === 4 || timer.pause(noterate * index).then(() => (sand.index = [ 1, 0 ][sand.index]))
               );
               await Promise.all([
                  paps.walk(timer, 4, { y: 185 }).then(async () => {
                     await timer.pause(850);
                     paps.preset = characters.papyrus;
                     paps.face = 'up';
                     paps.metadata.override = false;
                     await timer.pause(650);
                     await dialogue('auto', ...text.a_starton.papsink5);
                  }),
                  timer.pause(noterate * 12).then(async () => {
                     sand.index = 0;
                     script('kitchen');
                     await sand.position.modulate(timer, 650, sand.position.subtract(37, 0));
                     renderer.detach('main', sand, door);
                     content.iocSansTrombone.unload();
                     assets.sounds.doorClose.instance(timer);
                     dumbvictory.stop();
                     content.asTrombone.unload();
                     player.priority.value = oldp1;
                     paps.priority.value = oldp2;
                  })
               ]);
               game.music!.gain.modulate(timer, 300, world.level);
            }
            game.movement = true;
            break;
         }
         case 'sansbook': {
            await dialogue('auto', ...text.a_starton.sansbook1, ...text.a_starton.sansbook2);
            let looks = 0;
            while (choicer.result === 0) {
               await dialogue(
                  'auto',
                  ...text.a_starton.sansbook3,
                  ...[
                     text.a_starton.sansbook4,
                     text.a_starton.sansbook5,
                     text.a_starton.sansbook6,
                     text.a_starton.sansbook7,
                     text.a_starton.sansbook8
                  ][looks++],
                  ...text.a_starton.sansbook2
               );
               looks === 5 && (looks = 3);
            }
            await dialogue('auto', ...text.a_starton.sansbook9);
            break;
         }
         case 'papdate': {
            if (!game.movement) {
               break;
            }
            if (game.room === 's_bonehouse') {
               const paps = roomState.paps as CosmosCharacter;
               if (paps.metadata.exhausted) {
                  await dialogue('auto', ...text.a_starton.papdate3b);
               } else if (paps.metadata.tired) {
                  await dialogue('auto', ...text.a_starton.papdate3a);
               } else {
                  await dialogue('auto', ...text.a_starton.papdate3());
               }
               break;
            } else if (game.room === 's_papyrusroom') {
               game.movement = false;
               await dialogue('auto', ...text.a_starton.papdate5());
               if ((choicer.result as number) === 0) {
                  save.data.n.plot_date = 1;
                  const swipeAssets = new CosmosInventory(
                     content.asGrab,
                     content.ibcPapyrusBattleBlackoutA,
                     content.ibcPapyrusDateSwipe
                  );
                  const swipeLoader = swipeAssets.load();
                  await dialogue('auto', ...text.a_starton.papdate5a());
                  await Promise.all([ roomState.dateLoader, battler.battlefall(player, { x: 160, y: 160 }) ]);
                  battler.alpha.value = 1;
                  battler.SOUL.alpha.value = 0;
                  battler.reset();
                  atlas.switch('battlerSimple');
                  battler.active = true;
                  renderer.detach('main', roomState.paps);
                  let override = null as null | CosmosSprite;
                  const datepaps = new CosmosAnimation({
                     active: true,
                     position: { x: 130, y: 14 },
                     resources: content.ibcPapyrusBattle,
                     objects: [
                        new CosmosObject({ position: { x: 19, y: 3 } }).on('tick', function () {
                           if (override) {
                              this.objects = [ override ];
                           } else if (speech.state.face) {
                              this.objects = [ speech.state.face ];
                           } else {
                              this.objects = [ faces.papyrusBattleHapp ];
                           }
                        })
                     ]
                  });
                  renderer.attach('menu', datepaps);
                  const papchat = async (...lines: string[]) => {
                     override = null;
                     await battler.monster(false, { x: 200, y: 20 }, battler.bubbles.twinkly, ...lines);
                     override = speech.state.face;
                  };
                  const whoops = async () => {
                     if (!save.data.b.oops) {
                        oops();
                        await timer.pause(1000);
                     }
                  };
                  const sstriker = async () => {
                     assets.sounds.strike.instance(timer);
                     const overlay = new CosmosRectangle({
                        priority: 99999,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        fill: 'white',
                        stroke: 'transparent'
                     });
                     renderer.attach('menu', overlay);
                     overlay.alpha.modulate(timer, 300, 0).then(() => {
                        renderer.detach('menu', overlay);
                     });
                     const origin = datepaps.position.x;
                     let index = 30;
                     while (index-- > 0) {
                        if (index > 0) {
                           datepaps.position.x = origin + Math.floor(index / 3) * (Math.floor((index % 4) / 2) * 2 - 1);
                        } else {
                           datepaps.position.x = origin;
                        }
                        await renderer.on('tick');
                     }
                  };
                  events.fire('battle');
                  await battler.human(...text.a_starton.papdate6());
                  const datemusic1 = assets.music.datingstart.instance(timer);
                  await Promise.all([ papchat(...text.a_starton.papdate7()), swipeLoader ]);
                  const readAssets = new CosmosInventory(
                     content.asSwallow,
                     content.ibcPapyrusDateRead,
                     content.ibcPapyrusBattleBlackoutB
                  );
                  const readLoader = readAssets.load();
                  assets.sounds.grab.instance(timer);
                  const topAnim = new CosmosAnimation({
                     active: true,
                     resources: content.ibcPapyrusDateSwipe
                  });
                  datepaps.resources = content.ibcPapyrusBattleBlackoutA;
                  datepaps.attach(topAnim);
                  await timer.when(() => topAnim.index === 2);
                  topAnim.disable();
                  await timer.pause(850);
                  await Promise.all([ readLoader, papchat(...text.a_starton.papdate8()) ]);
                  const OMGLoader = content.ibcPapyrusDateOMG.load();
                  const tenseLoader = content.amDatingtense.load();
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateRead);
                  await papchat(...text.a_starton.papdate9());
                  let hud = null as null | CosmosObject;
                  let expired = false;
                  const hudPhase = new CosmosValue(0);
                  const random3 = random.clone();
                  const hudPromise = keys.menuKey.on('down').then(async () => {
                     if (!expired) {
                        assets.sounds.swallow.instance(timer);
                        const time = timer.value;
                        const timeIndicator = new CosmosText({
                           font: '16px DeterminationSans',
                           anchor: { x: 0, y: 1 },
                           position: { x: 160 },
                           content: text.a_starton.papdate41.c,
                           fill: '#fff',
                           objects: [
                              new CosmosRectangle({
                                 anchor: { x: 0, y: 1 },
                                 blend: BLEND_MODES.MULTIPLY,
                                 size: { x: 90, y: 20 },
                                 position: { y: -2 }
                              }).on('tick', function () {
                                 this.fill = `hsl(${((timer.value - time) % 1e3) * 0.25}, 100%, 50%)`;
                              })
                           ]
                        });
                        hud = new CosmosObject({
                           font: '16px DeterminationSans',
                           objects: [
                              timeIndicator,
                              new CosmosObject({
                                 position: { y: 90 },
                                 border: 1,
                                 objects: [
                                    new CosmosRectangle({
                                       fill: 'transparent',
                                       stroke: 'white',
                                       size: { x: 42, y: 50 },
                                       anchor: { x: 1, y: 1 }
                                    }),
                                    ...CosmosUtils.populate(4, index => {
                                       let mode = random3.next() < 0.5 ? 0 : 1;
                                       const generate = () => {
                                          const offset = Math.floor(random.next() * 10);
                                          return (mode = [ 1, 0 ][mode]) === 0 ? 5 + offset : 45 - offset;
                                       };
                                       let ideal = generate();
                                       return new CosmosRectangle({
                                          anchor: { x: 1, y: 1 },
                                          position: { x: -3 - index * 10, y: -1 },
                                          size: { x: 6, y: generate() },
                                          fill: '#ff0'
                                       }).on('tick', function () {
                                          if (Math.abs(this.size.y - ideal) < 1) {
                                             ideal = generate();
                                          } else {
                                             this.size.y += this.size.y < ideal ? 0.5 : -0.5;
                                          }
                                       });
                                    }),
                                    new CosmosText({
                                       position: { x: -42, y: 2 },
                                       fill: '#fff',
                                       content: text.a_starton.papdate41.b
                                    })
                                 ]
                              }).on('tick', function () {
                                 this.position.x = -5 + hudPhase.value * 65;
                              }),
                              new CosmosRectangle({
                                 fill: '#ffffff',
                                 size: { x: 73, y: 29 / 2 },
                                 anchor: 0,
                                 position: { y: 27.5 },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: '#000000',
                                       size: { x: 71, y: 26 / 2 },
                                       anchor: 0,
                                       objects: [
                                          new CosmosRectangle({
                                             fill: '#808080',
                                             size: { x: 70, y: 24 / 2 },
                                             anchor: 0,
                                             objects: [
                                                new CosmosRectangle({
                                                   fill: '#808080',
                                                   size: { y: 24 / 2 },
                                                   anchor: { y: 0 },
                                                   position: { x: -70 / 2 },
                                                   objects: [
                                                      new CosmosText({
                                                         fill: '#ffffff',
                                                         position: { y: -24 },
                                                         font: '16px DeterminationSans',
                                                         content: text.a_starton.papdate41.d
                                                      })
                                                   ]
                                                }).on_legacy('tick', self => {
                                                   let mode = 0;
                                                   const max = 70;
                                                   const halfPoint = 35;
                                                   return () => {
                                                      const movementFactor =
                                                         1 + (1 - Math.abs(halfPoint - self.size.x) / 35) * 5;
                                                      if (self.size.x === max) {
                                                         mode = 1;
                                                      } else if (self.size.x === 0) {
                                                         mode = 0;
                                                      }
                                                      if (mode === 0) {
                                                         self.size.x += movementFactor;
                                                      } else if (mode === 1) {
                                                         self.size.x -= movementFactor;
                                                      }
                                                      self.size.x = Math.min(Math.max(self.size.x, 0), 70);
                                                      self.fill = `hsl(225.88, 100%, ${CosmosMath.remap(
                                                         movementFactor,
                                                         40,
                                                         60,
                                                         1,
                                                         6
                                                      )}%)`;
                                                   };
                                                })
                                             ]
                                          })
                                       ]
                                    })
                                 ]
                              }).on('tick', function () {
                                 this.position.x = -75 + hudPhase.value * 129;
                              }),
                              new CosmosRectangle({
                                 anchor: 0,
                                 size: { x: 45, y: 45 },
                                 fill: 'black',
                                 stroke: 'white',
                                 border: 1,
                                 position: { y: 97.5 },
                                 objects: [
                                    new CosmosText({
                                       fill: 'white',
                                       stroke: 'transparent',
                                       anchor: { x: 1, y: 1 },
                                       position: { x: -27, y: 22.5 },
                                       font: '16px DeterminationSans',
                                       content: text.a_starton.papdate41.e
                                    })
                                 ]
                              }).on_legacy('tick', self => {
                                 let frames = 0;
                                 return async () => {
                                    self.position.x = 400 - hudPhase.value * 120;
                                    if (frames-- === 0) {
                                       frames = Math.floor(random3.next() * 3);
                                       const speed = CosmosMath.remap(random3.next(), 1, 4);
                                       const spawnPos = random3.next();
                                       const object = new CosmosRectangle({
                                          alpha: speed / 4,
                                          size: { x: speed / 2, y: speed / 2 },
                                          fill: 'white',
                                          stroke: 'transparent',
                                          position: new CosmosPoint(-22.5, -22.5).add(
                                             Math.min(spawnPos, 0.5) * 90,
                                             Math.min(1 - spawnPos, 0.5) * 90
                                          )
                                       }).on('tick', () => {
                                          object.position.x -= speed / 3;
                                          object.position.y -= speed / 3;
                                          if (object.position.x < -22.5 || object.position.y < -22.5) {
                                             object.alpha.value = 0;
                                             timer.post().then(() => {
                                                const index = self.objects.indexOf(object);
                                                self.objects = [
                                                   ...self.objects.slice(0, index),
                                                   ...self.objects.slice(index + 1)
                                                ];
                                             });
                                          }
                                       });
                                       self.attach(object);
                                    }
                                 };
                              })
                           ]
                        });
                        renderer.attach('menu', hud);
                        await timeIndicator.position.modulate(
                           timer,
                           1000,
                           timeIndicator.position.add(0, 16),
                           timeIndicator.position.add(0, 16)
                        );
                        await hudPhase.modulate(timer, 2000, 1, 1);
                     }
                  });
                  await Promise.race([ hudPromise, timer.pause(5000).then(() => (expired = true)) ]);
                  if (hud) {
                     await hudPromise;
                     await papchat(...text.a_starton.papdate12);
                  } else {
                     await papchat(...text.a_starton.papdate11);
                  }
                  await timer.pause(500);
                  await papchat(...text.a_starton.papdate13());
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  await papchat(...text.a_starton.papdate13a());
                  await Promise.all([ battler.human(...text.a_starton.papdate14), OMGLoader ]);
                  if (choicer.result === 0) {
                     datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                     topAnim.use(content.ibcPapyrusDateOMG);
                     topAnim.alpha.value = 1;
                  } else {
                     await whoops();
                  }
                  await papchat(...[ text.a_starton.papdate15a, text.a_starton.papdate15b ][choicer.result]);
                  if (choicer.result === 0) {
                     datepaps.resources = content.ibcPapyrusBattle;
                     topAnim.alpha.value = 0;
                     await papchat(...text.a_starton.papdate15a1);
                  }
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateRead);
                  topAnim.alpha.value = 1;
                  await papchat(...text.a_starton.papdate16);
                  await datemusic1.gain.modulate(timer, 850, 0);
                  datemusic1.stop();
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  await timer.pause(450);
                  await Promise.all([ tenseLoader, papchat(...text.a_starton.papdate16a) ]);
                  const styleAssets = new CosmosInventory(
                     content.ibcPapyrusSecretStyle,
                     content.ibcPapyrusCoolHat,
                     content.ibcPapyrusSpagBox
                  );
                  const styleLoader = styleAssets.load();
                  const fightLoader = content.amDatingfight.load();
                  const datemusic2 = assets.music.datingtense.instance(timer);
                  await papchat(...text.a_starton.papdate17());
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateOMG);
                  topAnim.alpha.value = 1;
                  await papchat(...text.a_starton.papdate17a());
                  await battler.human(...text.a_starton.papdate14);
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  datemusic2.stop();
                  if (choicer.result === 0) {
                     hud && renderer.detach('menu', hud);
                     override = faces.papyrusBattleOwwie;
                     await sstriker();
                     override = null;
                  } else if (hud) {
                     hudPhase.modulate(timer, 1500, 0).then(() => {
                        renderer.detach('menu', hud!);
                     });
                  }
                  await papchat(...[ text.a_starton.papdate18a, text.a_starton.papdate18b ][choicer.result]());
                  const sizeX = new CosmosValue();
                  const datePower = new CosmosRectangle({
                     fill: '#ffffff',
                     size: { x: 146 / 2, y: 29 / 2 },
                     anchor: 0,
                     objects: [
                        new CosmosRectangle({
                           fill: '#000000',
                           size: { x: 142 / 2, y: 26 / 2 },
                           anchor: 0,
                           objects: [
                              new CosmosRectangle({
                                 fill: '#808080',
                                 size: { x: 140 / 2, y: 24 / 2 },
                                 anchor: 0,
                                 objects: [
                                    new CosmosRectangle({
                                       fill: '#808080',
                                       size: { y: 24 / 2 },
                                       anchor: { y: 0 },
                                       position: { x: -70 / 2 },
                                       objects: [
                                          new CosmosText({
                                             fill: '#ffffff',
                                             position: { y: -24 },
                                             font: '16px DeterminationSans',
                                             content: text.a_starton.papdate41.a()
                                          })
                                       ]
                                    }).on_legacy('tick', self => {
                                       let sin = 0;
                                       const max = 70;
                                       return () => {
                                          self.size.x = sizeX.value;
                                          self.fill = `hsl(225.88, 100%, ${CosmosMath.remap(
                                             Math.min(
                                                Math.max(
                                                   200 +
                                                      Math.sin((++sin * 10 * sizeX.value * 2) / max / 10) *
                                                         (20 + (35 * sizeX.value * 2) / max),
                                                   180
                                                ),
                                                255
                                             ),
                                             0,
                                             50,
                                             0,
                                             255
                                          )}%)`;
                                       };
                                    })
                                 ]
                              })
                           ]
                        })
                     ]
                  });
                  renderer.attach('menu', datePower);
                  datePower.position = new CosmosPoint(54, 27.5);
                  sizeX.modulate(timer, 2000, 50 / 2);
                  override = faces.papyrusBattleOwwie;
                  await sstriker();
                  override = null;
                  await timer.pause(450);
                  datePower.position.modulate(timer, 2000, { x: -75, y: 27.5 }, { x: -75, y: 27.5 });
                  await timer.pause(250);
                  await Promise.all([ fightLoader, papchat(...text.a_starton.papdate19) ]);
                  const datemusic3 = assets.music.datingfight.instance(timer);
                  const tensionBox = new CosmosRectangle({
                     fill: 'transparent',
                     stroke: 'white',
                     size: { x: 42, y: 63 },
                     border: 1,
                     anchor: { x: 1, y: 1 },
                     position: { x: -5, y: 103 },
                     metadata: { next: 0, offset: 0 },
                     objects: [
                        new CosmosText({
                           position: { x: -42, y: 2 },
                           fill: '#fff',
                           stroke: 'transparent',
                           font: '16px DeterminationSans',
                           content: text.a_starton.papdate41.f
                        })
                     ]
                  }).on('tick', function () {
                     if (++this.metadata.offset === 3) {
                        this.metadata.offset = 0;
                        const pos = new CosmosPoint({ x: -5, y: this.metadata.next });
                        this.metadata.next = random3.next() * -this.size.y;
                        const target = { x: pos.x + 5, y: this.metadata.next };
                        this.attach(
                           new CosmosRectangle({
                              fill: '#f00',
                              stroke: 'transparent',
                              position: pos,
                              size: { y: 1, x: pos.extentOf(target) },
                              anchor: { y: 0 },
                              metadata: { d: false, parent: this },
                              rotation: pos.angleFrom(target) + 180
                           }).on('tick', function () {
                              this.position.x -= 5 / 3;
                              this.position.x < -40 && this.metadata.parent.detach(this);
                           })
                        );
                     }
                  });
                  renderer.attach('menu', tensionBox);
                  tensionBox.position.modulate(
                     timer,
                     2000,
                     tensionBox.position.add(65, 0),
                     tensionBox.position.add(65, 0)
                  );
                  await Promise.all([ styleLoader, papchat(...text.a_starton.papdate20()) ]);
                  const bellLoader = content.asBell.load();
                  while ((datepaps.position.x += 10) < 320) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 330;
                  datepaps.use(content.ibcPapyrusSecretStyle);
                  topAnim.alpha.value = 0;
                  const gifty = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     resources: content.ibcPapyrusSpagBox
                  });
                  const hatty = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.ibcPapyrusCoolHat ]
                  });
                  const gifthat = new CosmosObject({ position: { x: 37, y: 12 }, objects: [ gifty, hatty ] });
                  datepaps.attach(gifthat);
                  await timer.pause(850);
                  datepaps.position.x = 320;
                  while ((datepaps.position.x -= 10) > 130) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 130;
                  await papchat(...text.a_starton.papdate21);
                  await battler.human(...text.a_starton.papdate22);
                  if (choicer.result === 0) {
                     override = faces.papyrusBattleOwwie;
                     await sstriker();
                     override = null;
                  } else {
                     await whoops();
                  }
                  await papchat(...[ text.a_starton.papdate23a, text.a_starton.papdate23b ][choicer.result]);
                  datePower.position = new CosmosPoint(54, 27.5);
                  sizeX.modulate(timer, 2000, 100 / 2);
                  tensionBox.position
                     .modulate(timer, 2000, tensionBox.position.subtract(65, 0), tensionBox.position.subtract(65, 0))
                     .then(() => {
                        renderer.detach('menu', tensionBox);
                     });
                  override = faces.papyrusBattleOwwie;
                  await Promise.all([ sstriker(), datemusic3.gain.modulate(timer, 2500, 0) ]);
                  override = null;
                  datemusic3.stop();
                  await papchat(...text.a_starton.papdate24);
                  const datemusic4 = assets.music.datingtense.instance(timer);
                  sizeX.modulate(timer, 1000, 80 / 2);
                  await Promise.all([ bellLoader, papchat(...text.a_starton.papdate24a()) ]);
                  datePower.position.modulate(timer, 2000, { x: -75, y: 27.5 }, { x: -75, y: 27.5 });
                  await timer.pause(250);
                  atlas.navigators.of('battlerSimple').objects[1].priority.value = 1;
                  atlas.navigators.of('battlerSimple').objects[2].priority.value = 1;
                  battler.box.size.modulate(timer, 1000, { x: 325, y: 245 });
                  battler.box.position.modulate(timer, 1000, { x: 160, y: 120 });
                  game.movement = true;
                  battler.SOUL.alpha.value = 1;
                  const hitboxes = [
                     [ 'hat', { x: 150, y: 15 }, { x: 33, y: 10 } ],
                     [ 'face', { x: 150, y: 25 }, { x: 20, y: 24 } ],
                     [ 'shoulders', { x: 171, y: 44 }, { x: 13, y: 14 } ],
                     [ 'shoulders', { x: 134, y: 47 }, { x: 8, y: 15 } ],
                     [ 'shirt', { x: 144, y: 50 }, { x: 26, y: 18 } ],
                     [ 'arms', { x: 175, y: 58 }, { x: 6, y: 8 } ],
                     [ 'arms', { x: 175, y: 66 }, { x: 3, y: 22 } ],
                     [ 'arms', { x: 131, y: 63 }, { x: 6, y: 9 } ],
                     [ 'arms', { x: 137, y: 69 }, { x: 18, y: 6 } ],
                     [ 'gloves', { x: 179, y: 87 }, { x: 12, y: 10 } ],
                     [ 'gloves', { x: 191, y: 85 }, { x: 8, y: 7 } ],
                     [ 'gloves', { x: 139, y: 76 }, { x: 14, y: 5 } ],
                     [ 'gloves', { x: 142, y: 81 }, { x: 8, y: 3 } ],
                     [ 'amogus', { x: 150, y: 84 }, { x: 15, y: 7 } ],
                     [ 'legs', { x: 147, y: 86 }, { x: 7, y: 24 } ],
                     [ 'legs', { x: 168, y: 100 }, { x: 7, y: 10 } ],
                     [ 'legs', { x: 163, y: 88 }, { x: 7, y: 13 } ],
                     [ 'shoes', { x: 139, y: 111 }, { x: 20, y: 10 } ],
                     [ 'shoes', { x: 171, y: 111 }, { x: 21, y: 10 } ],
                     [ 'lv', { x: 100, y: 201 }, { x: 26, y: 8 } ],
                     [ 'hp', { x: 137, y: 200 }, { x: 85, y: 10 } ]
                  ] as [string, CosmosPointSimple, CosmosPointSimple][];
                  const checked = [] as string[];
                  checker: while (true) {
                     await keys.interactKey.on('down');
                     for (const subject of hitboxes) {
                        const [ key, position, size ] = subject;
                        if (
                           !checked.includes(key) &&
                           battler.SOUL.position.x > position.x &&
                           battler.SOUL.position.y > position.y &&
                           battler.SOUL.position.x < position.x + size.x &&
                           battler.SOUL.position.y < position.y + size.y
                        ) {
                           checked.push(key);
                           assets.sounds.bell.instance(timer);
                           game.movement = false;
                           battler.SOUL.alpha.value = 0;
                           if (key === 'hat') {
                              break checker;
                           } else {
                              switch (key) {
                                 case 'face':
                                    await papchat(...text.a_starton.papdate25i);
                                    break;
                                 case 'shoulders':
                                    await papchat(...text.a_starton.papdate25h());
                                    save.data.b.papyrus_piggy = true;
                                    break;
                                 case 'shirt':
                                    await papchat(...text.a_starton.papdate25b);
                                    break;
                                 case 'arms':
                                    await papchat(...text.a_starton.papdate25c);
                                    break;
                                 case 'gloves':
                                    await papchat(...text.a_starton.papdate25d);
                                    break;
                                 case 'amogus':
                                    await papchat(...text.a_starton.papdate25g);
                                    break;
                                 case 'legs':
                                    await papchat(...text.a_starton.papdate25e);
                                    break;
                                 case 'shoes':
                                    await papchat(...text.a_starton.papdate25f);
                                    break;
                                 case 'lv':
                                    await papchat(...text.a_starton.papdate25j());
                                    break;
                                 case 'hp':
                                    await papchat(...text.a_starton.papdate25k);
                                    break;
                              }
                           }
                           game.movement = true;
                           battler.SOUL.alpha.value = 1;
                           break;
                        }
                     }
                  }
                  await papchat(...text.a_starton.papdate25);
                  await Promise.all([
                     hatty.position.modulate(timer, 500, hatty.position.subtract(0, 9)),
                     battler.box.size.modulate(timer, 1000, { x: 282.5, y: 65 }),
                     battler.box.position.modulate(timer, 1000, { x: 160, y: 160 })
                  ]);
                  atlas.navigators.of('battlerSimple').objects[1].priority.value = 0;
                  atlas.navigators.of('battlerSimple').objects[2].priority.value = 0;
                  await papchat(...text.a_starton.papdate26());
                  await battler.human(...text.a_starton.papdate27);
                  if (choicer.result === 1) {
                     await papchat(...text.a_starton.papdate28);
                  }
                  gifty.index = 1;
                  assets.sounds.equip.instance(timer);
                  await timer.pause(850);
                  await papchat(...text.a_starton.papdate29);
                  await battler.human(...text.a_starton.papdate30);
                  datemusic4.gain.modulate(timer, 1500, 0).then(() => {
                     datemusic4.stop();
                     content.amDatingtense.unload();
                  });
                  await papchat(...[ text.a_starton.papdate31a, text.a_starton.papdate31b ][choicer.result]);
                  const datemusic5 = assets.music.datingfight.instance(timer);
                  datePower.position = new CosmosPoint(300, 100);
                  datePower.position.modulate(timer, 2000, { x: 260, y: 100 }, { x: 260, y: 100 });
                  await papchat(...text.a_starton.papdate32());
                  await battler.human(...text.a_starton.papdate33);
                  if (choicer.result === 0) {
                     await battler.human(...text.a_starton.papdate33a());
                  }
                  await papchat(...[ text.a_starton.papdate34a, text.a_starton.papdate34b ][choicer.result]());
                  sizeX.modulate(timer, 1000, 100 / 2);
                  override = faces.papyrusBattleOwwie;
                  sstriker();
                  papchat(...text.a_starton.papdate35);
                  await timer.pause(1650);
                  sizeX.modulate(timer, 1000, 120 / 2);
                  sstriker();
                  papchat(...text.a_starton.papdate36);
                  sizeX.modulate(timer, 4000, 200 / 2);
                  await timer.pause(1650);
                  sstriker();
                  papchat(...text.a_starton.papdate37);
                  const fader = new CosmosRectangle({
                     alpha: 0,
                     fill: '#fff',
                     priority: 2,
                     size: { x: 320, y: 240 },
                     stroke: 'transparent',
                     objects: [
                        new CosmosText({
                           alpha: 0,
                           fill: '#000',
                           position: { x: 70, y: 100 },
                           stroke: 'transparent',
                           font: '14px Papyrus',
                           spacing: { x: 1, y: 2 }
                        }).on('tick', function () {
                           this.content = game.text;
                        })
                     ]
                  });
                  renderer.attach('menu', fader);
                  datemusic5.gain.modulate(timer, 3500, 0).then(() => {
                     datemusic5.stop();
                     content.amDatingfight.unload();
                  });
                  await fader.alpha.modulate(timer, 4500, 1);
                  await timer.pause(500);
                  if (save.data.b.flirt_papyrus) {
                     override = faces.papyrusBattleNooo;
                  } else {
                     override = faces.papyrusBattleSide;
                  }
                  fader.objects[0].alpha.value = 1;
                  renderer.detach('menu', datePower);
                  atlas.switch('dialoguerBase');
                  await typer.text(...text.a_starton.papdate38());
                  hatty.position.y += 9;
                  gifty.alpha.value = 0;
                  fader.objects[0].alpha.value = 0;
                  atlas.switch('battlerSimple');
                  await fader.alpha.modulate(timer, 3000, 0);
                  await timer.pause(500);
                  await papchat(...text.a_starton.papdate39());
                  const datemusic6 = assets.music.datingstart.instance(timer);
                  await papchat(...text.a_starton.papdate39a());
                  datemusic6.gain.modulate(timer, 1500, 0).then(() => {
                     datemusic6.stop();
                     content.amDatingstart.unload();
                  });
                  while ((datepaps.position.x += 10) < 320) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 330;
                  datepaps.use(content.ibcPapyrusBattle);
                  topAnim.alpha.value = 0;
                  gifthat.alpha.value = 0;
                  await timer.pause(850);
                  datepaps.position.x = 320;
                  while ((datepaps.position.x -= 10) > 130) {
                     await renderer.on('tick');
                  }
                  await papchat(...text.a_starton.papdate40());
                  while ((datepaps.position.x += 10) < 320) {
                     await renderer.on('tick');
                  }
                  fader.fill = '#000';
                  await fader.alpha.modulate(timer, 300, 1);
                  renderer.detach('menu', datepaps);
                  atlas.switch(null);
                  atlas.detach(renderer, 'menu', 'battlerSimple');
                  battler.active = false;
                  fader.alpha.modulate(timer, 300, 0).then(() => {
                     renderer.detach('menu', fader);
                  });
                  readAssets.unload();
                  if (!save.data.b.oops) {
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_starton.truetext.papdate);
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.papdate5b);
               }
               game.movement = true;
               break;
            }
            game.movement = false;
            const opener = content.asDoorClose.load();
            await dialogue('auto', ...text.a_starton.papdate1());
            const paps = roomState.paps as CosmosCharacter;
            paps.metadata.override = true;
            if (player.face === 'up') {
               await paps.walk(timer, 4, { x: paps.position.x - 21 });
            }
            await Promise.all([
               timer
                  .when(() => player.position.x - paps.position.x > 30)
                  .then(async () => {
                     await player.walk(timer, 4, { x: 250, y: 230 }, { y: 10 });
                  }),
               paps.walk(timer, 4, { x: 250, y: 230 }, { y: 10 }).then(async () => {
                  await paps.alpha.modulate(timer, 300, 0);
                  paps.alpha.value = 0;
               })
            ]);
            await script('townswap');
            script('tick');
            paps.alpha.value = 1;
            paps.position = new CosmosPoint(player.position.subtract(0, 30));
            await Promise.all([
               player.walk(timer, 4, { y: 150 }, { x: 750 }, { y: 370 }),
               paps.walk(timer, 4, { y: 150 }, { x: 750 }, { y: 370 }).then(async () => {
                  await paps.alpha.modulate(timer, 300, 0);
                  paps.alpha.value = 0;
               })
            ]);
            await script('townswap');
            script('tick');
            paps.alpha.value = 1;
            paps.position = new CosmosPoint(player.position.add(0, 30));
            await Promise.all([
               player.walk(timer, 4, { y: 230 }, { x: 665 }),
               paps.walk(timer, 4, { y: 230 }, { x: 635 })
            ]);
            await timer.pause(850);
            await Promise.all([ opener, dialogue('auto', ...text.a_starton.papdate2) ]);
            save.data.n.plot_date = 0.1;
            game.movement = true;
            await paps.walk(timer, 5, { y: 185 });
            assets.sounds.doorClose.instance(timer);
            await Promise.race([ paps.alpha.modulate(timer, 300, 0), events.on('teleport') ]);
            renderer.detach('main', paps);
            break;
         }
         case 'paproom': {
            game.movement = false;
            const paps = roomState.paps as CosmosCharacter;
            if (save.data.n.plot_date < 0.2 && save.data.n.state_starton_papyrus === 0) {
               await dialogue('auto', ...text.a_starton.papdate4());
               if (choicer.result === 0) {
                  roomState.papsResettiUpsettiSpaghetti();
                  save.data.n.plot_date = 0.2;
                  await dialogue('auto', ...text.a_starton.papdate4a);
                  paps.metadata.override = true;
                  player.walk(timer, 3, { x: 80, y: 75 }).then(() => {
                     player.face = 'left';
                  });
                  await paps.walk(timer, 4, { x: 50, y: 60 });
                  assets.sounds.doorClose.instance(timer);
                  Promise.race([ paps.alpha.modulate(timer, 300, 0), events.on('teleport') ]).then(() => {
                     renderer.detach('main', paps);
                  });
               } else {
                  await dialogue('auto', ...text.a_starton.papdate4b);
                  player.position.y += 3;
                  player.face = 'down';
               }
            } else {
               await teleport('s_papyrusroom', 'up', 220, 230, world);
               assets.sounds.doorClose.instance(timer);
            }
            game.movement = true;
            break;
         }
         case 'papexit': {
            if (save.data.n.plot_date === 1) {
               save.data.n.plot_date = 1.1;
            }
            await teleport('s_bonehouse', 'down', 52, 65, world);
            assets.sounds.doorClose.instance(timer);
            break;
         }
         case 'papbooks': {
            await dialogue('auto', ...text.a_starton.papbooks1());
            await dialogue('auto', ...text.a_starton.papbooks2());
            break;
         }
         case 'papcomputer': {
            game.movement = false;
            for (const object of instance('main', 'papcomputer')!.object.objects) {
               if (object instanceof CosmosAnimation) {
                  object.index = 1;
                  assets.sounds.select.instance(timer).rate.value = 0.6;
                  await dialogue('auto', ...text.a_starton.papcomputer1());
                  if (choicer.result === 0) {
                     const outernet = new CosmosObject({
                        fill: 'white',
                        stroke: 'transparent',
                        font: '8px CryptOfTomorrow',
                        objects: [
                           new CosmosSprite({ scale: 0.5, frames: [ content.ieOuternet ] }),
                           new CosmosAnimation({
                              position: new CosmosPoint({ x: 44, y: 37 }).divide(2),
                              resources: content.idcPapyrusAyoo
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              position: new CosmosPoint({ x: 99, y: 161 }).divide(2),
                              content: text.a_starton.papcomputer3.a
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              fill: '#808080',
                              position: new CosmosPoint({ x: 99, y: 176 }).divide(2),
                              content: text.a_starton.papcomputer3.b
                           }),
                           new CosmosText({
                              position: new CosmosPoint({ x: 66, y: 234 }).divide(2),
                              font: '6.666px CryptOfTomorrow',
                              spacing: { x: -0.125 },
                              content: text.a_starton.papcomputer3.c
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              position: new CosmosPoint({ x: 541, y: 123 }).divide(2),
                              font: '10px CryptOfTomorrow',
                              content: text.a_starton.papcomputer3.d
                           }),
                           new CosmosText({
                              fill: '#808080',
                              position: new CosmosPoint({ x: 470, y: 142 }).divide(2),
                              font: '8px CryptOfTomorrow',
                              spacing: { x: 0.125, y: 0.5 },
                              content: text.a_starton.papcomputer3.e
                           }),
                           ...CosmosUtils.populate(
                              4,
                              index =>
                                 new CosmosText({
                                    anchor: 0,
                                    position: { x: 260.5, y: 136.5 + index * 22.5 },
                                    font: '8px CryptOfTomorrow',
                                    content: text.a_starton.papcomputer5[index]
                                 })
                           ),
                           ...CosmosUtils.populate(
                              4,
                              index =>
                                 new CosmosObject({
                                    position: { x: 104, y: Math.max(16 + index * 60, 36) + 2 },
                                    objects: [
                                       new CosmosText({
                                          font: '10px DiaryOfAn8BitMage',
                                          position: { y: 1 },
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).a
                                       }),
                                       new CosmosText({
                                          fill: '#808080',
                                          position: { y: 10, x: -1 },
                                          font: '8px CryptOfTomorrow',
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).b
                                       }),
                                       new CosmosText({
                                          position: { y: 20, x: -1 },
                                          font: '8px MarsNeedsCunnilingus',
                                          spacing: { x: -0.12, y: 2 },
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).c
                                       })
                                    ]
                                 })
                           )
                        ]
                     });
                     renderer.attach('menu', outernet);
                     object.index = 0;
                     await timer.pause(500);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', outernet);
                  } else {
                     object.index = 0;
                     await dialogue('auto', ...text.a_starton.papcomputer2);
                  }
                  break;
               }
            }
            game.movement = true;
            break;
         }
         case 'exit': {
            if (save.data.n.plot < 32) {
               save.data.n.plot = 32;
            }
            teleport('f_start', 'up', 160, 490, world);
            break;
         }
         case 'greatdog': {
            game.movement = false;
            const doggie = instance('main', 'g_greatdog')?.object.objects[0] as CosmosAnimation;
            doggie.index += 1;
            game.music!.gain.value = 0;
            await timer.pause(450);
            doggie.index += 1;
            assets.sounds.boing.instance(timer);
            await timer.pause(850);
            doggie.index -= 2;
            game.music!.gain.value = world.level;
            game.movement = true;
            break;
         }
         case 'emptytable': {
            if (game.room === 's_librarby' && world.population < 8) {
               await dialogue('auto', ...text.a_starton.emptytable1);
            } else if (game.room === 's_grillbys' && world.population < 8) {
               await dialogue('auto', ...text.a_starton.emptytable2);
            }
            break;
         }
         case 'bunbun': {
            game.movement && world.population > 0 && (await dialogue('auto', ...text.a_starton.bunbun()));
            break;
         }
         case 'vegetoid': {
            if (game.movement) {
               game.movement = false;
               const ani = instance('main', 's_vegetoid')!.object.objects[0] as CosmosAnimation;
               if (ani.index === 3) {
                  await dialogue('auto', ...text.a_starton.vegetoidx());
               } else {
                  ani.reverse = false;
                  ani.enable();
                  await timer.when(() => ani.index === 2);
                  ani.disable();
                  ani.step = 0;
                  await dialogue('auto', ...text.a_starton.vegetoid());
                  ani.reverse = true;
                  ani.enable();
                  timer
                     .when(() => ani.index === 1)
                     .then(async () => {
                        await timer.when(() => ani.index !== 1);
                        ani.index === 0 && ani.reset();
                     });
               }
               game.movement = true;
            }
            break;
         }
      }
   }
};

const shops = {
   hare: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.ishBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.hare.vars.sell || save.data.b.steal_hare) {
                  await shopper.text(...text.n_shop_hare.sell2());
               } else {
                  shops.hare.vars.sell = true;
                  if (world.population === 0) {
                     save.data.n.g += 758;
                     save.data.b.steal_hare = true;
                  }
                  await shopper.text(...text.n_shop_hare.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.n_shop_hare.exit());
               const music = shops.hare.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else if (world.population === 0 && shopper.index === 2) {
               await shopper.text(...text.n_shop_hare.note);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (shopper.listIndex === 0 || (shopper.listIndex === 1 && save.data.b.item_eye)) {
                  typer.text(text.n_shop_hare.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.n_shop_hare.talkText[shopper.listIndex]);
            }
         }
      },
      keeper: new CosmosAnimation({
         position: { x: 160, y: 120 },
         anchor: { x: 0, y: 1 },
         resources: content.ishKeeper
      }),
      music: assets.music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_hare.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_hare.item();
         } else {
            return text.n_shop_hare.talk;
         }
      },
      preset (index) {
         shops.hare.keeper.index = index;
      },
      price () {
         return [ 50, 50, 35, 20 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_hare.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8) {
               if (world.population === 0) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.hare.price);
                  if (save.data.n.g < price) {
                     shops.hare.vars.purchase = 3;
                  } else {
                     shops.hare.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.hare.vars.purchase = 4;
            }
         } else if (world.population > 0) {
            shops.hare.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'glove', 'eye', 'pop', 'swirl' ][shopper.listIndex];
            save.storage.inventory.add(item);
            if (item === 'glove' || item === 'eye') {
               save.data.b[`item_${item}`] = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.hare.vars.purchase || 0 > 0) {
            const purchaseValue = shops.hare.vars.purchase as number;
            shops.hare.vars.purchase = 0;
            if (world.population === 0 && purchaseValue < 4) {
               return text.n_shop_hare.zeroPrompt;
            } else {
               return text.n_shop_hare.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.population === 0) {
               return text.n_shop_hare.menuPrompt3();
            } else if (shops.hare.vars.idle) {
               return text.n_shop_hare.menuPrompt2;
            } else {
               shops.hare.vars.idle = true;
               return text.n_shop_hare.menuPrompt1;
            }
         } else if (world.population === 0) {
            return text.n_shop_hare.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_hare.itemPrompt;
         } else {
            return text.n_shop_hare.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 0 && save.data.b.item_glove) {
                  return null;
               }
               if (shopper.listIndex === 1 && save.data.b.item_eye) {
                  return null;
               }
               const info = items.of([ 'glove', 'eye', 'pop', 'swirl' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.n_shop_hare.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   blook: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isbBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.blook.vars.sell || save.data.b.steal_blook) {
                  await shopper.text(...text.n_shop_blook.sell2());
               } else {
                  shops.blook.vars.sell = true;
                  if (world.genocide || (world.population === 0 && !world.bullied)) {
                     save.data.n.g += 125;
                     save.data.b.steal_blook = true;
                  }
                  await shopper.text(...text.n_shop_blook.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.n_shop_blook.exit());
               const music = shops.blook.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else if ((world.genocide || (world.population === 0 && !world.bullied)) && shopper.index === 2) {
               await shopper.text(...text.n_shop_blook.note());
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (
                  (shopper.listIndex === 0 && (world.genocide || (world.population === 0 && !world.bullied))) ||
                  (shopper.listIndex < 2 &&
                     save.data.b[`item_${[ 'voidy', 'blookpie' ][shopper.listIndex] as 'voidy' | 'blookpie'}`])
               ) {
                  typer.text(text.n_shop_blook.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...CosmosUtils.provide(text.n_shop_blook.talkText[shopper.listIndex]));
            }
         }
      },
      keeper: new CosmosAnimation({
         position: { x: 160, y: 140 },
         anchor: { x: 0, y: 1 },
         scale: { x: 1.5, y: 1.5 },
         resources: content.isbKeeper,
         objects: [
            new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.isbEyes
            })
         ]
      }).on_legacy('tick', self => {
         const time = timer.value;
         const blookyPositionY = new CosmosValue(self.position.y);
         return () => {
            self.position.y = blookyPositionY.value - CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 2;
         };
      }),
      music: assets.music.blookShop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_blook.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_blook.item();
         } else {
            return text.n_shop_blook.talk();
         }
      },
      preset (index) {
         shops.blook.keeper.index = index;
      },
      price () {
         return [ 1000, 50, 14, 19 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_blook.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8) {
               if (world.genocide || (world.population === 0 && !world.bullied)) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.blook.price);
                  if (save.data.n.g < price) {
                     shops.blook.vars.purchase = 3;
                  } else {
                     shops.blook.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.blook.vars.purchase = 4;
            }
         } else if (world.population > 0 || world.bullied) {
            shops.blook.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'voidy', 'blookpie', 'fruit', 'milkshake' ][shopper.listIndex];
            save.storage.inventory.add(item);
            if (item === 'voidy' || item === 'blookpie') {
               save.data.b[`item_${item}`] = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.blook.vars.purchase || 0 > 0) {
            const purchaseValue = shops.blook.vars.purchase as number;
            shops.blook.vars.purchase = 0;
            if ((world.genocide || (world.population === 0 && !world.bullied)) && purchaseValue < 4) {
               return text.n_shop_blook.zeroPrompt;
            } else {
               return text.n_shop_blook.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.genocide || (world.population === 0 && !world.bullied)) {
               return text.n_shop_blook.menuPrompt3();
            } else if (shops.blook.vars.idle) {
               return text.n_shop_blook.menuPrompt2;
            } else {
               shops.blook.vars.idle = true;
               return text.n_shop_blook.menuPrompt1();
            }
         } else if (world.genocide || (world.population === 0 && !world.bullied)) {
            return text.n_shop_blook.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_blook.itemPrompt;
         } else {
            return text.n_shop_blook.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 0 && save.data.b.item_voidy) {
                  return null;
               }
               if (shopper.listIndex === 1 && save.data.b.item_blookpie) {
                  return null;
               }
               const info = items.of([ 'voidy', 'blookpie', 'fruit', 'milkshake' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.n_shop_blook.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

events.on('drop', async key => {
   await renderer.on('tick');
   if (game.room === 's_lookout' && key === 'chip') {
      if (save.data.n.state_starton_npc98 === 1) {
         world.genocide || (save.data.n.state_starton_npc98 = 4);
      } else if (save.data.n.state_starton_npc98 === 2) {
         world.genocide || (save.data.n.state_starton_npc98 = 4.1);
      }
      if (!world.genocide) {
         await dialogue('auto', ...text.a_starton.drop_chip);
         oops();
      }
   } else if (game.room === 's_stand' && key === 'nice_cream' && world.population > 9) {
      await dialogue('auto', ...text.a_starton.drop_cream);
      if (!save.data.b.oops) {
         await dialogue('auto', ...text.a_starton.drop_fail);
         oops();
      }
   }
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         if (args[0] === 'hare' || args[0] === 'blook') {
            shopper.open(
               shops[args[0]],
               args[1] as CosmosDirection,
               +args[2],
               +args[3],
               args[0] === 'hare' ? world.population > 0 : !world.genocide && (world.population > 0 || world.bullied)
            );
         }
         break;
      case 'starton':
         script(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 's') {
            trivia(...CosmosUtils.provide(text.a_starton.trivia[args[0] as keyof typeof text.a_starton.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement) {
      const populationfactor = (save.data.n.kills_starton + save.data.n.bully_starton) / 12;
      switch (game.room) {
         case 's_lesser':
            if (!save.data.b.s_state_lesser) {
               return runEncounter(populationfactor, 1, [ [ groups.lesserdog, 1 ] ]);
            }
            break;
         case 's_crossroads':
         case 's_alphys':
         case 's_papyrus':
         case 's_lookout':
         case 's_stand':
         case 's_dogs':
         case 's_math':
         case 's_puzzle1':
         case 's_puzzle2':
         case 's_pacing':
         case 's_puzzle3':
            return runEncounter(
               populationfactor,
               (() => {
                  if (game.room === 's_puzzle1') {
                     return save.data.n.plot < 24 ? 0 : 1;
                  } else if (game.room === 's_puzzle2') {
                     return save.data.n.plot < 25 ? 0 : 1;
                  } else if (game.room === 's_puzzle3') {
                     return save.data.n.plot < 27 ? 0 : 1;
                  } else {
                     return 1;
                  }
               })(),
               [
                  [ groups.jerry, 4 ],
                  [ groups.stardrake, 4 ],
                  [ commonGroups.spacetop, 4 ],
                  [ groups.stardrakeSpacetopJerry, 5 ],
                  [ groups.stardrakeSpacetop, 5 ],
                  [ groups.spacetopJerry, 5 ],
                  ...(!save.data.b.spared_mouse && !save.data.b.killed_mouse && !save.data.b.fled_mouse
                     ? [ [ groups.mouse, 5 ] as [OutertaleGroup, number] ]
                     : [])
               ]
            );
            break;
      }
   }
});

events.on('teleport', (from, to) => {
   if (!biodome.metadata.init) {
      biodome.metadata.init = true;
      if (game.room in biorooms) {
         renderer.attach('below', biodome);
      }
   }
   if (!(from in biorooms) && to in biorooms) {
      renderer.attach('below', biodome);
   } else if (from in biorooms && !(to in biorooms)) {
      renderer.detach('below', biodome);
   }
   let index = 0;
   for (const { object } of instances('main', 's_lamp')) {
      if (!object.metadata.randomized) {
         object.metadata.randomized = true;
         (object.objects[0] as CosmosAnimation).index = index++ % 6;
      }
   }
   const both = [ to, from ];
   if (
      [
         'w_toriel_asriel',
         'w_toriel_toriel',
         's_backrooms',
         'f_napstablook',
         'f_hapstablook',
         'a_sleeping2',
         'a_sleeping3'
      ]
         .map(x => both.includes(x))
         .includes(true)
   ) {
      both.includes('_void') || (assets.sounds.doorClose.instance(timer).gain.value *= 0.5);
   }
   if (to === 's_puzzle1' || to === 's_puzzle2') {
      const puzzle = instance('main', 'puzzlechip')?.object.objects[0] as CosmosAnimation;
      const roomState = (states.rooms[to] ||= {});
      if (!roomState.puzzleticker) {
         roomState.puzzleticker = true;
         puzzle.index = save.data.n[`state_starton_${game.room as `s_puzzle${1 | 2 | 3}`}`];
      }
   } else {
      switch (to) {
         case 's_grillbys': {
            const roomState = (states.rooms.s_grillbys ??= {});
            if (save.data.n.state_starton_doggo === 2 || world.population < 2) {
               instance('main', 'g_doggo')?.destroy();
            }
            if (
               save.data.n.state_starton_greatdog === 2 ||
               save.data.n.state_starton_greatdog === 4 ||
               world.population < 2
            ) {
               instance('main', 'g_greatdog')?.destroy();
            } else if (save.data.n.state_starton_greatdog === 3 && !roomState.dogger) {
               roomState.dogger = true;
               (instance('main', 'g_greatdog')?.object.objects[0] as CosmosAnimation).index = 3;
            }
            if (save.data.n.state_starton_dogs === 2 || world.population < 2) {
               instance('main', 'g_dogamy')?.destroy();
               instance('main', 'g_dogaressa')?.destroy();
            }
            if (world.population < 10) {
               instance('main', 'g_beautifulfish')?.destroy();
            }
            if (world.population < 8) {
               instance('main', 'g_bunbun')?.destroy();
            }
            if (world.population < 6) {
               instance('main', 'g_bigmouth')?.destroy();
            }
            if (world.population < 4) {
               instance('main', 'g_punkhamster')?.destroy();
            }
            if (world.genocide || (world.population === 0 && !world.bullied)) {
               instance('main', 'g_grillby')?.destroy();
               instance('main', 'g_redbird')?.destroy();
            }
            break;
         }
         case 's_town1':
         case 's_town2': {
            const roomState = (states.rooms.s_town1 ||= {});
            if (
               !roomState.spawnedThaKid &&
               save.data.n.plot < 31 &&
               !world.genocide &&
               (world.population > 0 || world.bullied)
            ) {
               roomState.spawnedThaKid = true;
               const kiddState = (CosmosUtils.parse(save.data.s.state_starton_s_town1 || 'null') ?? {
                  anim: { active: true, index: 0, step: 0 },
                  face: 'right',
                  room: 's_town1',
                  state: 'walk',
                  trip: 0,
                  volatile: true,
                  wait: 0,
                  x: 420,
                  y: 150
               }) as {
                  anim: { active: boolean; index: number; step: number };
                  face: CosmosDirection;
                  volatile: boolean;
                  room: 's_town1' | 's_town2';
                  state: 'wait' | 'walk' | 'trip';
                  trip: number;
                  wait: number;
                  x: number;
                  y: number;
               };
               const anim = new CosmosAnimation({
                  active: kiddState.anim.active,
                  anchor: { x: 0, y: 1 },
                  index: kiddState.anim.index,
                  resources:
                     kiddState.state === 'wait'
                        ? content.iocKiddDownTalk
                        : kiddState.state === 'walk'
                        ? {
                             down: content.iocKiddDown,
                             left: content.iocKiddLeft,
                             right: content.iocKiddRight,
                             up: content.iocKiddUp
                          }[kiddState.face]
                        : kiddState.face === 'left'
                        ? content.iocKiddLeftTrip
                        : content.iocKiddRightTrip,
                  step: kiddState.anim.step
               }).on('tick', function () {
                  this.alpha.value = game.room === kiddState.room ? 1 : 0;
                  if (kiddState.state === 'trip' && this.index === 19) {
                     if (kiddState.trip++ === 0) {
                        this.active = false;
                     } else if (kiddState.trip === 15) {
                        kiddState.state = 'walk';
                        kiddState.trip = 0;
                        this.reset().use(kiddState.face === 'left' ? content.iocKiddLeft : content.iocKiddRight);
                        this.y = 0;
                     }
                  }
                  kiddState.anim.active = this.active;
                  kiddState.anim.index = this.index;
                  kiddState.anim.step = this.step;
                  save.data.s.state_starton_s_town1 = CosmosUtils.serialize(kiddState);
               });
               anim.frames = CosmosUtils.populate(20, null);
               function move (direction: CosmosDirection, limit: number, speed = 4) {
                  switch (direction) {
                     case 'down':
                        kiddState.y += speed;
                        kiddState.y > limit && (kiddState.y = limit);
                        break;
                     case 'left':
                        kiddState.x -= speed;
                        kiddState.x < limit && (kiddState.x = limit);
                        break;
                     case 'right':
                        kiddState.x += speed;
                        kiddState.x > limit && (kiddState.x = limit);
                        break;
                     case 'up':
                        kiddState.y -= speed;
                        kiddState.y < limit && (kiddState.y = limit);
                        break;
                  }
                  const rez = {
                     down: content.iocKiddDown,
                     left: content.iocKiddLeft,
                     right: content.iocKiddRight,
                     up: content.iocKiddUp
                  }[direction];
                  if (anim.resources !== rez) {
                     kiddState.face = direction;
                     anim.use(rez);
                  }
                  anim.active = true;
               }
               function trip () {
                  kiddState.state = 'trip';
                  if (kiddState.face === 'left') {
                     kiddState.x -= 18;
                     anim.use(content.iocKiddLeftTrip);
                  } else {
                     kiddState.x += 18;
                     anim.use(content.iocKiddRightTrip);
                  }
                  anim.active = true;
                  anim.y = -1;
               }
               function wait () {
                  kiddState.face = 'down';
                  kiddState.state = 'wait';
                  kiddState.wait = 20 * 30;
                  anim.reset().use(content.iocKiddDownTalk);
               }
               function fade (kidd: CosmosHitbox) {
                  kidd.metadata.fade = true;
                  anim.reset();
                  kidd.alpha.modulate(timer, 300, 0).then(() => {
                     kidd.metadata.fade = false;
                     if (kiddState.room === 's_town1') {
                        kiddState.room = 's_town2';
                        kiddState.y = 10;
                     } else {
                        kiddState.room = 's_town1';
                        kiddState.y = 370;
                     }
                     timer.post().then(() => (kidd.alpha.value = 1));
                  });
               }
               renderer.attach(
                  'main',
                  new CosmosHitbox({
                     anchor: { x: 0 },
                     metadata: {
                        args: [ 'kiddTalk' ],
                        barrier: false,
                        fade: false,
                        interact: false,
                        locked: true,
                        name: 'starton',
                        pause: false,
                        tags: [ 's_pacikid' ],
                        paused: false,
                        trigger: false,
                        wait: false
                     },
                     size: { x: 20 },
                     objects: [ anim ]
                  }).on('tick', function () {
                     if (save.data.n.plot > 30.1 || ![ 's_town1', 's_town2' ].includes(game.room)) {
                        renderer.detach('main', this);
                        roomState.spawnedThaKid = false;
                     } else if (this.metadata.pause) {
                        if (!this.metadata.paused) {
                           this.metadata.paused = true;
                           speech.targets.add(
                              anim.reset().use(
                                 {
                                    down: content.iocKiddDownTalk,
                                    left: content.iocKiddLeftTalk,
                                    right: content.iocKiddRightTalk,
                                    up: content.iocKiddUpTalk
                                 }[CosmosMath.cardinal(this.position.angleTo(player))]
                              )
                           );
                        }
                     } else {
                        this.metadata.paused = false;
                        speech.targets.delete(anim);
                        if (kiddState.state !== 'walk') {
                           kiddState.state === 'wait' && kiddState.wait-- === 0 && (kiddState.state = 'walk');
                        } else if (kiddState.room === 's_town1') {
                           if (kiddState.x < 580) {
                              kiddState.y > 150 ? move('up', 150) : move('right', kiddState.x < 500 ? 500 : 580);
                              kiddState.x === 500 && trip();
                           } else if (kiddState.x === 580 && !(kiddState.y === 150 && kiddState.face === 'down')) {
                              kiddState.volatile = false;
                              kiddState.face === 'down' ? move('down', 150) : move('up', 115);
                              kiddState.y === 115 && wait();
                           } else if (kiddState.y < 370) {
                              kiddState.volatile = true;
                              kiddState.x < 750 ? move('right', 750) : move('down', 370);
                           } else {
                              this.metadata.fade || fade(this);
                           }
                        } else {
                           if (kiddState.x > 450) {
                              kiddState.y < 230 ? move('down', 230) : move('left', kiddState.x > 500 ? 500 : 450);
                              kiddState.x === 500 && trip();
                           } else if (kiddState.x === 450 && !(kiddState.y === 230 && kiddState.face === 'down')) {
                              kiddState.volatile = false;
                              kiddState.face === 'down' ? move('down', 230) : move('up', 195);
                              kiddState.y === 195 && wait();
                           } else if (10 < kiddState.y) {
                              kiddState.volatile = true;
                              kiddState.x > 250 ? move('left', 250) : move('up', 10);
                           } else {
                              this.metadata.fade || fade(this);
                           }
                        }
                     }
                     this.anchor.y = kiddState.state === 'wait' ? 1 : 0;
                     this.size.y = kiddState.state === 'wait' ? 5 : 40;
                     this.metadata.barrier = game.room === kiddState.room && kiddState.state === 'wait';
                     this.metadata.interact = game.room === kiddState.room && kiddState.state === 'wait';
                     this.metadata.trigger =
                        game.room === kiddState.room &&
                        (kiddState.state === 'wait' || (kiddState.state !== 'trip' && kiddState.volatile));
                     this.metadata.wait = kiddState.state === 'wait';
                     this.position.set(kiddState);
                  })
               );
            }
            break;
         }
      }
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 's' && script('tick');
});

events.on('use', async key => {
   if (game.room === 's_lookout' && key === 'chip') {
      if (save.data.n.state_starton_npc98 === 1) {
         world.genocide || (save.data.n.state_starton_npc98 = 4);
      } else if (save.data.n.state_starton_npc98 === 2) {
         world.genocide || (save.data.n.state_starton_npc98 = 4.1);
      }
      if (!world.genocide) {
         await dialogue('auto', ...text.a_starton.eat_chip);
         oops();
      }
   } else if (game.room === 's_stand' && key === 'nice_cream' && world.population > 9) {
      await dialogue('auto', ...text.a_starton.eat_cream);
   }
});

events.on('use', {
   priority: -Number.MAX_SAFE_INTEGER,
   async listener (key) {
      switch (key) {
         case 'voidy':
            if (!battler.active) {
               save.storage.inventory.remove(save.storage.inventory.contents.indexOf('voidy'));
               player.metadata.voidkey = {
                  room: (rooms.of('_void').neighbors = [ game.room ])[0],
                  face: player.face,
                  position: player.position.value()
               };
               await teleport('_void', 'up', 140, 230, world);
            }
            break;
         case 'pop':
         case 'super_pop':
            if (!game.vortex) {
               const factor = key === 'super_pop' ? 0.7 : 0.85;
               timer.speed.modulate(timer, 300, timer.speed.value * factor);
               game.vortex = true;
               let insta = false;
               Promise.race(
                  battler.active
                     ? [
                          timer
                             .when(() => game.movement)
                             .then(() => timer.when(() => !game.movement))
                             .then(() => timer.when(() => game.movement))
                             .then(() => timer.when(() => !game.movement)),
                          events.on('escape').then(() => (insta = true)),
                          events.on('victory').then(() => (insta = true)),
                          events.on('defeat').then(() => (insta = true)),
                          events.on('exit').then(() => (insta = true))
                       ]
                     : [
                          events.on('teleport').then(() => events.on('teleport')),
                          events.on('battle').then(() => (insta = true))
                       ]
               ).then(() => {
                  game.vortex = false;
                  timer.speed.modulate(timer, insta ? 0 : 300, timer.speed.value / factor);
                  insta && (timer.speed.value = timer.speed.value / factor);
               });
            }
            break;
      }
   }
});

keys.downKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript') {
      navscript.state.handler('down');
   }
});

keys.leftKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript') {
      navscript.state.handler('left');
   }
});

keys.rightKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript') {
      navscript.state.handler('right');
   }
});

keys.upKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript') {
      navscript.state.handler('up');
   }
});

export default { script, states, shops };

CosmosUtils.status(`LOAD MODULE: STARTON AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
