import { GlitchFilter, GlowFilter } from 'pixi-filters';
import { Graphics } from 'pixi.js';
import assets from '../assets';
import { OutertaleShop } from '../classes';
import { characters, epicgamer, goatbro, madfish } from '../common';
import commonText from '../common/text';
import content, { inventories } from '../content';
import { atlas, audio, events, game, items, keys, random, renderer, rooms, speech, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosCharacter,
   CosmosDirection,
   CosmosHitbox,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosRegion,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueRandom
} from '../engine';
import {
   battler,
   character,
   choicer,
   dialogue,
   dialogueSession,
   fetchCharacters,
   header,
   instance,
   instances,
   isolate,
   isolates,
   oops,
   player,
   shadow,
   shake,
   shopper,
   talkFilter,
   teleport,
   teleporter,
   world
} from '../mantle';
import save, { OutertaleDataNumber } from '../save';
import groups from './groups';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

export const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

/** tem shop armor price */
export function armorprice () {
   const d = save.flag.n.deaths;
   return d === 0
      ? 9999
      : d < 6
      ? 10000 - d * 1000
      : d < 10
      ? 5000 - (d - 5) * 500
      : d < 18
      ? 3000 - (d - 9) * 200
      : d < 20
      ? 1400 - (d - 17) * 150
      : d < 25
      ? 1000
      : d < 30
      ? 750
      : 500;
}

export function puzzleTarget () {
   return game.room === 'f_puzzle1' ? 36 : game.room === 'f_puzzle2' ? 37 : 45;
}

export async function tripper (kidd: CosmosCharacter, resources = content.iocKiddRightTrip) {
   const tripAnim = new CosmosAnimation({
      active: true,
      anchor: { x: 0, y: 1 },
      position: kidd.position.add(
         [
            //
            content.iocKiddRightTrip,
            content.iocKiddDarkRightTrip
         ].includes(resources)
            ? 18
            : -18,
         0
      ),
      resources
   });
   kidd.position = tripAnim.position.clone();
   kidd.alpha.value = 0;
   renderer.attach('main', tripAnim);
   await timer.when(() => tripAnim.index === 19);
   tripAnim.disable();
   tripAnim.index = 19;
   await timer.pause(500);
   kidd.alpha.value = 1;
   renderer.detach('main', tripAnim);
}

function pulsetestGenOver (owner: CosmosObject) {
   return CosmosUtils.populate(
      2,
      side =>
         new CosmosSprite({
            scale: { x: [ 1, -1 ][side] },
            position: owner.position.subtract([ 6, -6 ][side], 47),
            frames: [ content.iooFPuzzlepylonOverlay ],
            priority: 1000
         })
   );
}

function pulsetest (instances: CosmosObject[], pylon: CosmosObject) {
   const objects = [] as CosmosObject[];
   checker: for (const other of instances) {
      if (other === pylon) {
         continue;
      }
      const closeX = Math.abs(other.x - pylon.x) < 12;
      const closeY = Math.abs(other.y - pylon.y) < 12;
      if (closeX === closeY) {
         continue;
      } else {
         objects.push(...(objects.length === 0 ? pulsetestGenOver(pylon) : []), ...pulsetestGenOver(other));
         const targets = [] as number[];
         if (closeX) {
            if (other.y < pylon.y) {
               other.x <= pylon.x && targets.push(0);
               pylon.x <= other.x && targets.push(1);
            } else {
               other.x <= pylon.x && targets.push(5);
               pylon.x <= other.x && targets.push(4);
            }
         } else if (other.x < pylon.x) {
            other.y <= pylon.y && targets.push(7);
            pylon.y <= other.y && targets.push(6);
         } else {
            other.y <= pylon.y && targets.push(2);
            pylon.y <= other.y && targets.push(3);
         }
         for (const target of targets) {
            const o1 = target < 4 ? pylon : other;
            const o2 = target < 4 ? other : pylon;
            const p1 = o1.position.value();
            const p2 = o2.position.value();
            const wT = target % 4;
            const distance = Math.abs(wT < 2 ? o2.y - o1.y : o2.x - o1.x);
            for (const obj of objects) {
               if (obj.metadata.target === target) {
                  if (obj.metadata.distance < distance) {
                     continue checker;
                  } else {
                     objects.splice(objects.indexOf(obj), 1);
                  }
               }
            }
            objects.push(
               new CosmosRectangle({
                  alpha: 0.75,
                  fill: 'white',
                  metadata: { target, distance },
                  position: o1.position.add(wT === 0 ? -7 : 3, wT === 2 ? -57 : -47),
                  size: { x: wT < 2 ? 4 : o2.x - o1.x - 6, y: wT < 2 ? o2.y - o1.y : 4 },
                  priority: wT === 3 ? o1.y + 5 : o1.y - 5
               }).on('tick', function () {
                  if (this.alpha.value > 0) {
                     this.alpha.value -= 1 / 30;
                     if (this.alpha.value <= 0 || o1.x !== p1.x || o2.x !== p2.x || o1.y !== p1.y || o2.y !== p2.y) {
                        renderer.detach('main', ...objects);
                        for (const obj of objects) {
                           obj.alpha.value = 0;
                           // ensures disappearance before render
                           obj.container.alpha = 0;
                        }
                     }
                  }
               })
            );
         }
      }
   }
   renderer.attach('main', ...objects);
   objects.length > 0 && (assets.sounds.indicator.instance(timer).rate.value = 1.3);
}

async function beamcast (
   stage: {
      mirrors: [CosmosObject, string, CosmosPointSimple][];
      discovery: CosmosObject[];
      beamwalls: CosmosHitbox[];
      rects: CosmosRectangle[];
      anims: CosmosAnimation[];
      overs: CosmosSprite[];
   },
   position: CosmosPointSimple,
   valid = { state: true },
   face = 'down' as CosmosDirection
): Promise<boolean> {
   let step = 0;
   let next = 'wall';
   let anim = null as null | CosmosAnimation;
   const seek = new CosmosPoint(position).add(0, 39);
   const increment = { up: { y: -1 }, down: { y: 1 }, left: { x: -1 }, right: { x: 1 } }[face];
   const { mirrors, discovery, beamwalls, rects, anims, overs } = stage;
   top: while (step++ < 1000) {
      seek.x += increment.x ?? 0;
      seek.y += increment.y ?? 0;
      if (step > 8) {
         for (const [ pylon, action, position ] of mirrors) {
            if (seek.x === position.x && seek.y === position.y) {
               next = action;
               anim = pylon.objects.filter(sub => sub instanceof CosmosAnimation)[0] as CosmosAnimation;
               discovery.includes(pylon) || discovery.push(pylon);
               if (next === 'pylon-c' || next === 'pylon-d') {
                  const over = new CosmosSprite({
                     scale: { x: next === 'pylon-c' ? 1 : -1 },
                     position: { x: pylon.position.x - (next === 'pylon-c' ? 6 : -6), y: pylon.position.y - 47 },
                     frames: [ content.iooFPuzzlepylonOverlay ],
                     priority: 1000
                  });
                  overs.push(over);
                  renderer.attach('main', over);
               }
               break top;
            }
         }
         for (const beamwall of beamwalls) {
            const [ min, max ] = beamwall.region();
            if (seek.x > min.x && seek.x < max.x && seek.y > min.y && seek.y < max.y) {
               if (beamwall.metadata.barrier) {
                  next = 'wall';
                  break top;
               } else if (beamwall.metadata.trigger) {
                  next = 'endpoint';
                  break top;
               }
            }
         }
      }
   }
   const rect = new CosmosRectangle({
      position,
      fill: '#cfcfcf',
      metadata: { face },
      size: { x: 5, y: 5 },
      anchor: { up: { x: 0, y: 1 }, down: { x: 0 }, left: { x: 1, y: 0 }, right: { y: 0 } }[face]
   }).on('tick', function () {
      this.priority.value = this.position.y + (face === 'down' ? this.size.y : 0) + 45;
   });
   renderer.attach('main', rect);
   rects.push(rect);
   let moving = true;
   const target = rect.size
      .add(new CosmosPoint({ x: Math.abs(increment.x ?? 0), y: Math.abs(increment.y ?? 0) }).multiply(step))
      .subtract(
         next.startsWith('pylon')
            ? { up: 1, down: 1, left: 5, right: 5 }[face]
            : { up: 1, down: 1, left: 7, right: 7 }[face],
         next.startsWith('pylon')
            ? { up: 5, down: 0, left: 1, right: 1 }[face]
            : { up: 5, down: -32, left: 1, right: 1 }[face]
      );
   await Promise.race([
      rect.size.modulate(timer, step * 2, rect.size.add(target.subtract(rect.size).multiply(0.75)), target),
      timer.when(() => !valid.state).then(() => (moving ? rect.size.modulate(timer, 0, rect.size.value()) : void 0))
   ]);
   moving = false;
   if (valid.state) {
      if (anim) {
         anims.includes(anim) || anims.push(anim);
         assets.sounds.indicator.instance(timer);
         anim.index = 2;
      }
      switch (next) {
         case 'endpoint':
            return true;
         case 'pylon-a':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'up' : 'left'
            );
         case 'pylon-b':
            return await beamcast(
               stage,
               face === 'left' ? seek.add(0, -37) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'up' : 'right'
            );
         case 'pylon-c':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -41) : seek.add(2, -39),
               valid,
               face === 'right' ? 'down' : 'left'
            );
         case 'pylon-d':
            return await beamcast(
               stage,
               face === 'left' ? seek.add(0, -41) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'down' : 'right'
            );
         default:
            return false;
      }
   } else {
      return false;
   }
}

export function napstamusic (roomState: any) {
   game.music!.gain.modulate(timer, 0, 0);
   timer.pause().then(() => {
      game.music!.gain.modulate(timer, 0, 0);
   });
   const music = audio.music
      .of([ 'spooktune', 'spookwave', 'spookwaltz', 'swansong' ][save.data.n.state_foundry_blookmusic - 1])
      .instance(timer);
   roomState.customs = music;
   roomState.customsLevel = music.gain.value;
   music.gain.value /= 4;
   music.gain.modulate(timer, 600, music.gain.value * 4).then(() => {
      roomState.customsAuto = true;
   });
   events.on('teleport').then(() => {
      music.stop();
      roomState.customs = void 0;
      roomState.customsLevel = void 0;
      roomState.customsAuto = void 0;
   });
}

const failPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[], semi?: boolean) => {
   semi ? assets.sounds.indicator.instance(timer) : assets.sounds.noise.instance(timer);
   for (const rect of rects) {
      rect.fill = semi ? '#fcea72' : '#f00';
   }
   for (const pylon of pylons) {
      pylon.index = semi ? 4 : 3;
   }
   await timer.pause(100);
   for (const rect of rects) {
      rect.fill = '#000';
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await timer.pause(200);
   assets.sounds.noise.instance(timer);
   for (const rect of rects) {
      rect.fill = '#f00';
   }
   for (const pylon of pylons) {
      pylon.index = 3;
   }
   await timer.pause(400);
   for (const rect of rects) {
      renderer.detach('main', rect);
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
};

const passPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[]) => {
   assets.sounds.indicator.instance(timer);
   for (const rect of rects) {
      rect.fill = '#6ca4fc';
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await timer.pause(100);
   for (const rect of rects) {
      rect.fill = '#000';
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await timer.pause(200);
   assets.sounds.indicator.instance(timer);
   for (const rect of rects) {
      rect.fill = '#6ca4fc';
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await timer.pause(400);
};

export const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = states.rooms[game.room] || (states.rooms[game.room] = {});
   if (subscript === 'tick') {
      save.data.b.oops || save.data.n.plot_date < 2 || (save.data.b.flirt_undyne = true);
      if (!states.scripts.steamgap || !states.scripts.steamgap.init) {
         (states.scripts.steamgap ||= {}).init = true;
         CosmosUtils.chain(random.clone(), async (rand, next) => {
            await timer.pause(CosmosMath.remap(rand.next(), 500, 5000));
            if (renderer.alpha.value === 1 && !battler.active) {
               const steamgap = states.rooms[game.room]?.steamgap as CosmosPointSimple[];
               if (steamgap && steamgap.length > 0) {
                  const scale = rand.next();
                  const trueScale = CosmosMath.remap(scale, 0.5, 0.9);
                  const position = new CosmosPoint(rand.next() * 20, rand.next() * 20).add(
                     steamgap[Math.floor(rand.next() * steamgap.length)]
                  );
                  const sprite = new CosmosSprite({
                     alpha: 0.5,
                     anchor: 0,
                     scale: new CosmosPoint(trueScale),
                     position,
                     priority: position.y,
                     rotation: Math.round(rand.next() * 360),
                     frames: [ content.iooFSteam ]
                  });
                  renderer.attach('main', sprite);
                  sprite.rotation.modulate(
                     timer,
                     1000,
                     sprite.rotation.value + CosmosMath.remap(rand.next(), 45, 135) * (rand.next() < 0.5 ? 1 : -1)
                  );
                  sprite.position.modulate(
                     timer,
                     1000,
                     sprite.position.subtract(0, trueScale * 30),
                     sprite.position.subtract(0, trueScale * 45)
                  );
                  sprite.scale.modulate(timer, 500, sprite.scale.multiply(CosmosMath.remap(rand.next(), 1.1, 1.3)));
                  Promise.race([ sprite.alpha.modulate(timer, 1000, 0), events.on('teleport') ]).then(() => {
                     renderer.detach('main', sprite);
                  });
               }
            }
            next(rand);
         });
      }
      switch (game.room) {
         case 'f_armor':
            save.data.b.item_jumpsuit && instance('main', 'jumpsuit_item')?.destroy();
            break;
         case 'f_sans':
            save.data.n.plot < 34 || instance('main', 'f_kidd')?.destroy();
            break;
         case 'f_view': {
            if (save.data.n.state_foundry_muffet !== 1) {
               const hist = (roomState.hist ??= []) as CosmosPointSimple[];
               hist.push(player.position.value()) > 7 && hist.shift();
               roomState.mode ??= 'follow';
               const proximity = Math.abs(500 - player.position.x) < 140;
               if (save.data.n.plot_kidd < 4) {
                  if ((proximity && roomState.mode === 'follow') || (!proximity && roomState.mode === 'onlook')) {
                     roomState.mode = 'transition';
                     epicgamer.metadata.barrier = false;
                     epicgamer.metadata.override = true;
                     if (player.position.x > 500 && !proximity) {
                        save.data.n.plot_kidd = 4;
                     }
                  }
               }
               if (roomState.mode === 'transition') {
                  if (proximity) {
                     const target = { x: 500, y: 85 };
                     for (const sprite of Object.values(epicgamer.sprites)) {
                        sprite.duration = Math.round(15 / 4);
                     }
                     const x = target.x;
                     const y = target.y;
                     const diffX = Math.abs(x - epicgamer.position.x);
                     const diffY = Math.abs(y - epicgamer.position.y);
                     if (diffX > 0 || diffY > 0) {
                        const dirX = x - epicgamer.position.x < 0 ? -1 : 1;
                        const dirY = y - epicgamer.position.y < 0 ? -1 : 1;
                        epicgamer.move(
                           {
                              x: (diffX === 0 ? 0 : diffX < 4 ? diffX : 4) * dirX,
                              y: (diffY === 0 ? 0 : diffY < 4 ? diffY : 4) * dirY
                           },
                           renderer,
                           'main'
                        );
                     } else {
                        epicgamer.face = 'up';
                        roomState.mode = 'onlook';
                        epicgamer.metadata.barrier = true;
                        epicgamer.metadata.interact = true;
                        epicgamer.metadata.name = 'trivia';
                        epicgamer.metadata.args = [ 'f_view' ];
                        epicgamer.move({ x: 0, y: 0 }, renderer, 'main');
                        if (renderer.detect('main', epicgamer, player).length > 0) {
                           if (player.position.x < epicgamer.position.x) {
                              player.position.x = epicgamer.position.x - epicgamer.size.x / 2 - player.size.x / 2;
                           } else {
                              player.position.x = epicgamer.position.x + epicgamer.size.x / 2 + player.size.x / 2;
                           }
                        }
                     }
                  } else {
                     const pos = epicgamer.position.clone();
                     const extent = pos.extentOf(player.position);
                     const modRate = 4.5;
                     if (extent <= 21 + modRate) {
                        epicgamer.face = player.face;
                        roomState.mode = 'follow';
                        epicgamer.metadata.barrier = false;
                        epicgamer.metadata.interact = false;
                        epicgamer.metadata.name = void 0;
                        epicgamer.metadata.args = void 0;
                        epicgamer.metadata.override = false;
                     } else {
                        const target = hist[0];
                        pos.x += Math.min(Math.max(target.x - pos.x, -modRate), modRate);
                        pos.y += Math.min(Math.max(target.y - pos.y, -modRate), modRate);
                        epicgamer.move(
                           pos.subtract(epicgamer.position.value()),
                           renderer,
                           'main',
                           [ 'below', 'main' ],
                           hitbox => hitbox !== epicgamer && hitbox.metadata.barrier === true
                        );
                     }
                  }
               }
            }
            if (!roomState.view) {
               roomState.view = true;
               const scale = 0.5;
               const width = 700 * scale;
               const maxPos = renderer.region[1].x;
               const parallax = (maxPos - (width - 320)) / maxPos;
               const castle = new CosmosSprite({
                  alpha: 0.65,
                  anchor: { x: 0, y: 1 },
                  scale: { x: scale, y: scale },
                  position: { x: width / 2 - renderer.region[0].x * parallax, y: 20 },
                  parallax: { x: parallax },
                  frames: [ content.iooFViewBackdrop ]
               }).on('tick', function () {
                  this.alpha.value = CosmosMath.remap(
                     CosmosMath.bezier(Math.min(Math.abs(500 - player.position.x), 400) / 400, 0.95, 1, 1),
                     0,
                     0.65 + Math.random() * 0.1,
                     1,
                     0.95
                  );
               });
               renderer.attach('main', castle);
               const music = assets.music.splendor.instance(timer);
               roomState.music = music;
               events.on('teleport').then(() => {
                  renderer.detach('main', castle);
                  roomState.view = false;
                  music.gain.modulate(timer, 300, 0).then(() => {
                     roomState.music = null;
                     music.stop();
                  });
               });
            }
            if (roomState.music) {
               roomState.music.gain.value =
                  Math.min(Math.max(300 - Math.abs(500 - player.position.x), 0) / 250, 1) * 0.5;
            }
            break;
         }
         case 'f_puzzle1':
         case 'f_puzzle2':
         case 'f_puzzle3': {
            const multi = [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ];
            const target = puzzleTarget();
            if (!roomState.restore) {
               roomState.restore = true;
               for (const { object: pylon } of instances('main', 'pylon')) {
                  const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
                  const x = save.data.n[`state_foundry_${name.slice(2)}x` as keyof OutertaleDataNumber];
                  const y = save.data.n[`state_foundry_${name.slice(2)}y` as keyof OutertaleDataNumber];
                  x > 0 && (pylon.position.x = x);
                  y > 0 && (pylon.position.y = y);
               }
            }
            if (save.data.n.plot < target) {
               if (!roomState.init) {
                  roomState.init = true;
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position:
                        game.room === 'f_puzzle1'
                           ? { x: 220, y: 0 }
                           : game.room === 'f_puzzle2'
                           ? { x: 420, y: 140 }
                           : { x: 840, y: 0 },
                     frames: [
                        game.room === 'f_puzzle1'
                           ? content.iooFPuzzle1Over
                           : game.room === 'f_puzzle2'
                           ? content.iooFPuzzle2Over
                           : content.iooFPuzzle3Over
                     ]
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position:
                        game.room === 'f_puzzle1'
                           ? { x: 220, y: 80 }
                           : game.room === 'f_puzzle2'
                           ? { x: 420, y: 220 }
                           : { x: 840, y: 80 },
                     size: { x: 20, y: game.room === 'f_puzzle2' ? 40 : 60 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  await timer.when(() => save.data.n.plot === target);
                  renderer.detach('main', cover, barrier);
               }
               const pylonz = [ ...instances('main', 'pylon') ].map(instance => instance.object);
               hyperloop: for (const pylon of pylonz) {
                  if (timer.tasks.has(pylon.position)) {
                     continue;
                  }
                  const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
                  save.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}x`] = pylon.position.x;
                  save.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}y`] = pylon.position.y;
                  const minX = pylon.position.x - 10;
                  const maxX = pylon.position.x + 10;
                  const minY = pylon.position.y - 20;
                  const maxY = pylon.position.y;
                  if (player.position.x > minX && player.position.x < maxX) {
                     if (
                        [ 'f_puzzlepylon1B', 'f_puzzlepylon2B', 'f_puzzlepylon3F', 'f_puzzlepylon3H' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.x !== 310) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.x !== 350) ||
                        ([ 'f_puzzlepylon3A', 'f_puzzlepylon3B' ].includes(name) &&
                           ![ 590, 650 ].includes(pylon.position.x)) ||
                        ([ 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(name) &&
                           ![ 730, 790 ].includes(pylon.position.x))
                     ) {
                        continue;
                     }
                     if (player.position.y < pylon.position.y) {
                        if (keys.downKey.active() && player.position.y > minY) {
                           if (name === 'f_puzzlepylon1A' && pylon.position.y === 260) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.y === 200) {
                              continue;
                           }
                           if ([ 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) && pylon.position.y === 160) {
                              continue;
                           }
                           if (multi && pylon.position.y === 260) {
                              continue;
                           }
                           const targetpos = pylon.position.add(0, 10);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.position.y -= 1.5;
                        }
                     } else if (keys.upKey.active() && player.position.y < maxY + 5) {
                        if (name === 'f_puzzlepylon1A' && pylon.position.y === 180) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon2A', 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) &&
                           pylon.position.y === 120
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(
                              name
                           ) &&
                           pylon.position.y === 200
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(0, -10);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.position.y += 1.5;
                     }
                  } else if (player.position.y > minY && player.position.y < maxY) {
                     if (
                        [ 'f_puzzlepylon1A', 'f_puzzlepylon2C' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.y !== 200) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.y !== 120) ||
                        (multi.includes(name) && ![ 200, 260 ].includes(pylon.position.y))
                     ) {
                        continue;
                     }
                     if (player.position.x < pylon.position.x) {
                        if (keys.rightKey.active() && player.position.x > minX - 10) {
                           if (name === 'f_puzzlepylon1B' && pylon.position.x === 190) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.x === 350) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2B' && pylon.position.x === 270) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2D' && pylon.position.x === 390) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                              pylon.position.x === 650
                           ) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                              pylon.position.x === 790
                           ) {
                              continue;
                           }
                           const targetpos = pylon.position.add(10, 0);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.position.x -= 1.5;
                        }
                     } else if (keys.leftKey.active() && player.position.x < maxX + 10) {
                        if (name === 'f_puzzlepylon1B' && pylon.position.x === 130) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2A' && pylon.position.x === 310) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2B' && pylon.position.x === 230) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2D' && pylon.position.x === 350) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                           pylon.position.x === 590
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                           pylon.position.x === 730
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(-10, 0);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(timer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.position.x += 1.5;
                     }
                  }
               }
            } else {
               for (const { object: pylon } of instances('main', 'pylon')) {
                  if (!pylon.metadata.active) {
                     pylon.metadata.active = true;
                     (pylon.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation).index = 1;
                  }
               }
            }
            break;
         }
         case 'f_prechase': {
            if (save.data.n.plot < 48 || world.genocide) {
               for (const inst of instances('below', 'bridge')) {
                  inst.destroy();
               }
               for (const inst of instances('main', 'bridge')) {
                  inst.destroy();
               }
            } else {
               instance('below', 'bridgeblocker')?.destroy();
            }
            if (!roomState.active) {
               roomState.active = true;
               if (save.data.n.plot < 37.2) {
                  const ebar = instance('below', 'ebar')!.object.objects[0] as CosmosHitbox;
                  ebar.metadata.barrier = false;
                  const raftblock = new CosmosHitbox({
                     anchor: 1,
                     position: { x: -10 },
                     size: 20
                  });
                  const platform = new CosmosSprite({
                     position: { x: 250, y: 130 },
                     anchor: { x: 0, y: 1 },
                     priority: -18937659153,
                     frames: [ content.iooFRaft ],
                     objects: [ raftblock ]
                  });
                  renderer.attach('main', platform);
                  isolate(platform);
                  timer
                     .when(() => 255 <= player.position.x && game.room === 'f_prechase')
                     .then(async () => {
                        save.data.n.plot = 37.2;
                        player.position.x = 255;
                        game.movement = false;
                        if (world.genocide) {
                           await timer.pause(450);
                           player.face = 'left';
                           await timer.pause(1000);
                           goatbro.metadata.override = true;
                           goatbro.priority.value = player.position.y - 1;
                           await goatbro.walk(timer, 1, player.position.subtract(4.5, 0));
                           goatbro.face = 'right';
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_foundry.genotext.asrielHug1);
                           await Promise.all([
                              player.position.step(timer, 3, { x: player.position.x + 640 }),
                              platform.position.step(timer, 3, { x: platform.position.x + 640 }),
                              goatbro.position.step(timer, 3, { x: goatbro.position.x + 640 }),
                              timer.pause(1950).then(async () => {
                                 player.alpha.value = 0;
                                 const hugger = new CosmosAnimation({
                                    active: true,
                                    anchor: { x: 0, y: 1 },
                                    resources: content.iocAsrielHug1,
                                    priority: player.position.y + 10,
                                    position: player.position
                                 }).on('tick', function () {
                                    this.position.set(player.position);
                                 });
                                 renderer.attach('main', hugger);
                                 await timer.when(() => hugger.index === 1);
                                 hugger.disable();
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.genotext.asrielHug2);
                                 await timer.pause(2150);
                                 keys.interactKey.active() && (await keys.interactKey.on('up'));
                                 hugger.index = 0;
                                 await timer.pause(600);
                                 renderer.detach('main', hugger);
                                 player.alpha.value = 1;
                                 await timer.pause(1650);
                                 player.face = 'right';
                              })
                           ]);
                           await player.walk(timer, 3, { x: goatbro.position.x + 21 });
                           await Promise.all([
                              player.walk(timer, 3, { x: player.position.x + 8.5 + 10 }),
                              goatbro.walk(timer, 3, {
                                 x: goatbro.position.x + 8.5 + 10
                              })
                           ]);
                           goatbro.metadata.override = false;
                           goatbro.priority.value = 0;
                           await timer.pause(850);
                           dialogue('auto', ...text.a_foundry.genotext.asrielHug3).then(() => {
                              game.movement = true;
                           });
                        } else {
                           await Promise.all([
                              player.position.step(timer, 3, { x: 890 }),
                              platform.position.step(timer, 3, { x: 890 })
                           ]);
                           raftblock.metadata.barrier = true;
                           game.movement = true;
                           const base = player.position.x;
                           await timer.when(() => player.position.x > base + 25);
                        }
                        ebar.metadata.barrier = true;
                        await Promise.race([ events.on('teleport'), platform.position.step(timer, 3, { x: 0 }) ]);
                        renderer.detach('main', platform);
                     });
               }
               if (!save.data.b.f_state_kidd_prechase) {
                  await timer.when(
                     () =>
                        world.epicgamer &&
                        game.room === 'f_prechase' &&
                        save.data.n.plot > 37.2 &&
                        player.position.x < 960 &&
                        renderer.layers.main.objects.includes(epicgamer)
                  );
                  await dialogue('auto', ...text.a_foundry.walktext.prechase);
                  save.data.b.f_state_kidd_prechase = true;
               }
            }
            break;
         }
         case 'f_entrance': {
            let sound = true;
            for (const tallgrass of instances('main', 'tallgrass')) {
               const obby = tallgrass.object;
               const anim = obby.objects.filter(subobby => subobby instanceof CosmosAnimation)[0] as CosmosAnimation;
               const contact = [ player, ...fetchCharacters() ]
                  .map(
                     susser =>
                        susser.position.y > obby.position.y - 10 &&
                        susser.position.y < obby.position.y + 5 &&
                        Math.abs(obby.position.x - susser.position.x) < 25
                  )
                  .includes(true);
               if (contact && anim.index === 0) {
                  if (sound) {
                     sound = false;
                     assets.sounds.rustle.instance(timer);
                  }
                  anim.index = 1;
               } else if (!contact && anim.index === 1) {
                  anim.index = 0;
               }
            }
            break;
         }
         case 'f_stand': {
            (48 <= save.data.n.plot || world.genocide) && instance('main', 'f_shortsy')?.destroy();
            (48 <= save.data.n.plot || world.genocide) && instance('main', 'f_longsy')?.destroy();
            {
               const inst = instance('main', 's_nicecream');
               // fled from previous area
               if (world.genocide || save.data.n.kills_starton + save.data.n.bully_starton > 2) {
                  inst?.destroy();
                  instance('main', 'dimbox')?.destroy();
                  instance('below', 'xtrabarrier')?.destroy();
                  (
                     instance('below', '21flavors')!.object.objects.filter(
                        obj => obj instanceof CosmosSprite
                     )[0] as CosmosSprite
                  ).frames = [ content.iooFWallsign ];
               }
               // moved to next area
               else if (save.data.n.plot > 59) {
                  inst?.destroy();
                  instance('below', 'xtrabarrier')?.destroy();
                  instance('below', '21flavors')?.destroy();
               } else if (inst && !inst.object.metadata.active) {
                  inst.object.metadata.active = true;
                  const guyanim = inst.object.objects[0] as CosmosAnimation;
                  // fled from current area
                  if (save.data.n.kills_foundry + save.data.n.bully_foundry > 2) {
                     guyanim.index = 3;
                  } else {
                     // purchased a nice cream
                     save.data.b.f_state_nicecream && (guyanim.index = 2);
                  }
               }
            }
            break;
         }
         case 'f_error': {
            if (!roomState.active) {
               roomState.active = true;
               let st = 0;
               const ppos = { x: NaN, y: NaN };
               const cheeserand = random.clone();
               const glitch = new GlitchFilter({ slices: 20, offset: 25 });
               renderer.attach(
                  'main',
                  new CosmosSprite({
                     area: renderer.area,
                     alpha: 0,
                     frames: [ content.iooFErrorTrue ],
                     priority: -1000
                  }).on('tick', function () {
                     if (game.room === 'f_error') {
                        if (player.position.x !== ppos.x || player.position.y !== ppos.y) {
                           ppos.x = player.position.x;
                           ppos.y = player.position.y;
                           st = 0;
                        } else {
                           st++;
                        }
                        if (this.alpha.value === 0 && st > 30 * 10 && cheeserand.next() < 0.1) {
                           this.alpha.value = CosmosMath.remap(
                              Math.min(Math.max((st - 30 * 10) / (30 * 5), 0), 1),
                              0,
                              0.1
                           );
                           this.container.filters = [ glitch ];
                           timer.pause(200).then(() => {
                              this.alpha.value = 0;
                              this.container.filters = [];
                           });
                        }
                        if (this.alpha.value > 0) {
                           glitch.refresh();
                        }
                     } else {
                        this.alpha.value = 0;
                        st = 0;
                     }
                  })
               );
               if (save.data.n.plot_kidd < 1) {
                  await timer.when(() => game.room === 'f_error' && player.position.y > 160);
                  save.data.n.plot_kidd = 1;
                  await dialogue('auto', ...text.a_foundry.walktext.kidd1());
               }
            }
            break;
         }
         case 'f_telescope': {
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && save.data.n.plot < 38.1) {
                  await timer.when(() => game.room === 'f_telescope' && player.position.x > 300);
                  game.movement = false;
                  save.data.n.plot = 38.1;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34x);
                  goatbro.metadata.override = true;
                  await goatbro.walk(
                     timer,
                     3,
                     player.position.add(0, player.position.y > 140 ? -21 : 21),
                     player.position.add(21, 0)
                  );
                  await timer.pause(450);
                  goatbro.face = 'left';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34);
                  await goatbro.walk(timer, 3, { x: 440, y: 140 });
                  renderer.detach('main', goatbro);
                  epicgamer.metadata.override = true;
                  await Promise.all([
                     dialogue('auto', ...text.a_foundry.genotext.kidd1),
                     epicgamer.walk(timer, 2, player.position.subtract(21, 0)).then(() => {
                        epicgamer.metadata.reposition = true;
                     })
                  ]);
                  epicgamer.metadata.override = false;
                  game.movement = true;
               }
            }
            if (!roomState.sandy) {
               roomState.sandy = true;
               if (!world.dead_skeleton && save.data.n.plot < 39) {
                  const sand = character('sans', characters.sans, { x: 135, y: 105 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'foundry', args: [ 'sandinter' ] }
                  });
                  await events.on('teleport');
                  roomState.sandy = false;
                  renderer.detach('main', sand);
               }
            }
            break;
         }
         case 'f_bird': {
            if (!world.madfish) {
               if (
                  !roomState.bird &&
                  save.data.n.plot > 42 &&
                  !world.genocide &&
                  save.data.s.state_foundry_deathroom !== 'f_bird'
               ) {
                  const bird = new CosmosHitbox({
                     anchor: 0,
                     size: { x: 20, y: 20 },
                     position: { x: player.position.x > 750 ? 1360 : 140, y: 140 },
                     metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'birdcheck' ] },
                     objects: [
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           active: true,
                           resources: content.ionFBird
                        })
                     ]
                  });
                  renderer.attach('main', (roomState.bird = bird));
                  bird.on('tick', () => {
                     if (save.data.s.state_foundry_deathroom === 'f_bird') {
                        renderer.detach('main', roomState.bird);
                        roomState.bird = void 0;
                     } else if (world.madfish) {
                        bird.alpha.value = 0;
                        bird.metadata.barrier = false;
                        bird.metadata.interact = false;
                     }
                  });
                  await events.on('teleport');
                  renderer.detach('main', roomState.bird);
                  roomState.bird = void 0;
                  break;
               }
               if (!roomState.active) {
                  roomState.active = true;
                  if (!save.data.b.f_state_kidd_bird && save.data.n.plot < 42 && world.epicgamer) {
                     await timer.when(() => game.room === 'f_bird' && player.position.x > 135);
                     if (save.data.n.plot < 42) {
                        save.data.b.f_state_kidd_bird = true;
                        await dialogue('auto', ...text.a_foundry.walktext.bird());
                     }
                  }
               }
               if (save.data.n.plot > 42 && !roomState.subercheck) {
                  roomState.subercheck = true;
                  if (!save.data.b.f_state_narrator_bird && world.genocide) {
                     await timer.when(() => game.room === 'f_bird' && player.position.x < 1365);
                     game.movement = false;
                     save.data.b.f_state_narrator_bird = true;
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.walktext.birdx);
                     game.movement = true;
                  }
               }
            }
            break;
         }
         case 'f_piano': {
            if (!roomState.active) {
               roomState.active = true;
               if (!save.data.b.f_state_piano) {
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position: { x: 40, y: 100 },
                     frames: [ content.iooFPianoOver1 ]
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 40 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  timer
                     .when(() => save.data.b.f_state_piano)
                     .then(() => {
                        renderer.detach('main', cover, barrier);
                     });
               }
               if (!save.data.b.f_state_truth) {
                  const cover = new CosmosSprite({
                     priority: 8000,
                     position: { x: 240, y: 100 },
                     frames: [ content.iooFPianoOver2 ]
                  });
                  const barrier = new CosmosHitbox({
                     metadata: { barrier: true },
                     position: { x: 240, y: 180 },
                     size: { x: 20, y: 40 }
                  });
                  renderer.attach('main', cover, barrier);
                  isolates([ cover, barrier ]);
                  timer
                     .when(() => save.data.b.f_state_truth)
                     .then(() => {
                        renderer.detach('main', cover, barrier);
                     });
               }
            }
            break;
         }
         case 'f_lobby': {
            save.data.b.item_boots && instance('main', 'f_booties')?.destroy();
            break;
         }
         case 'f_statue': {
            if (!roomState.init) {
               roomState.init = true;
               const overhead = new CosmosSprite({
                  alpha: 0.15,
                  position: { x: 200, y: 0 },
                  anchor: { x: 0 },
                  priority: 10000,
                  frames: [ content.iooFOverhead ]
               });
               const statue = instance('main', 'statue')!.object.objects[0] as CosmosAnimation;
               const switches = instance('main', 'lightswitch')!;
               let music = null as CosmosInstance | null;
               const OGfilter = audio.musicFilter.value;
               const solu = new CosmosAnimation({
                  active: true,
                  alpha: 0,
                  anchor: 0,
                  position: { x: 200, y: 180 },
                  resources: content.iooFPianosolution
               });
               for (const subobj of switches.object.objects as CosmosSprite[]) {
                  subobj.index = 1;
                  subobj.on('tick', function () {
                     let stepped = false;
                     for (const subject of [ player, epicgamer ]) {
                        if (
                           renderer.layers.main.objects.includes(subject) &&
                           Math.abs(this.position.x - subject.position.x) < 8 &&
                           Math.abs(this.position.y - subject.position.y) < 8
                        ) {
                           stepped = true;
                           break;
                        }
                     }
                     if (stepped && subobj.index === 1) {
                        subobj.index = 0;
                        assets.sounds.noise.instance(timer);
                        if (world.epicgamer && subobj.position.x < 200 && save.data.n.state_foundry_muffet !== 1) {
                           game.menu = false;
                           statue.index = 1;
                           renderer.attach('main', overhead, solu);
                           solu.alpha.modulate(timer, 2000, 0).then(() => {
                              solu.alpha.modulate(timer, 2000, 0.3);
                           });
                           music = assets.music.memory.instance(timer, { store: true });
                           music!.gain.value = 0;
                           Promise.all([
                              game.music!.gain.modulate(timer, 500, 0),
                              audio.musicFilter.modulate(timer, 500, 0)
                           ]).then(() => {
                              music!.gain.modulate(timer, 1000, assets.music.memory.gain);
                           });
                        }
                     } else if (!stepped && subobj.index === 0) {
                        if (subobj.position.x < 200 && save.data.n.state_foundry_muffet !== 1) {
                           game.menu = true;
                           statue.index = 0;
                           renderer.detach('main', overhead, solu);
                           solu.alpha.modulate(timer, 0, 0);
                           music?.stop();
                           audio.musicFilter.value = OGfilter;
                           game.music!.gain.modulate(timer, 500, world.level);
                        }
                        subobj.index = 1;
                        renderer.alpha.value > 0 && (assets.sounds.noise.instance(timer).rate.value = 1.25);
                     }
                  });
               }
            }
            if (!roomState.activated) {
               roomState.activated = true;
               if (world.epicgamer && save.data.n.state_foundry_muffet !== 1) {
                  epicgamer.metadata.barrier = true;
                  epicgamer.metadata.override = true;
                  epicgamer.position.set(player.position.subtract(0, 21));
                  epicgamer.alpha.value = 1;
                  epicgamer.alpha.modulate(timer, 0, 1);
                  await timer.when(() => game.movement);
                  if (!save.data.b.f_state_kidd_statue) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.kiddStatue);
                     save.data.b.f_state_kidd_statue = true;
                  }
                  let schmovin = true;
                  for (const sprite of Object.values(epicgamer.sprites)) {
                     sprite.duration = Math.round(15 / 2);
                  }
                  const dirX = 230 - epicgamer.position.x < 0 ? -1 : 1;
                  const dirY = 110 - epicgamer.position.y < 0 ? -1 : 1;
                  CosmosUtils.chain<void, Promise<void>>(void 0, async (z, next) => {
                     const diffX = Math.abs(230 - epicgamer.position.x);
                     const diffY = Math.abs(110 - epicgamer.position.y);
                     epicgamer.move(
                        {
                           x: (diffX === 0 ? 0 : diffX < 2 ? diffX : 2) * dirX,
                           y: (diffY === 0 ? 0 : diffY < 2 ? diffY : 2) * dirY
                        },
                        renderer,
                        'main'
                     );
                     if (schmovin && (diffX > 0 || diffY > 0)) {
                        await renderer.on('tick');
                        await next();
                     }
                  }).then(() => {
                     if (schmovin) {
                        epicgamer.face = 'down';
                        epicgamer.metadata.interact = true;
                        epicgamer.metadata.name = 'trivia';
                        epicgamer.metadata.args = [ 'f_statue_kidd' ];
                        if (renderer.detect('main', epicgamer, player).length > 0) {
                           player.position.y = epicgamer.position.y + epicgamer.size.y;
                        }
                     }
                  });
                  await events.on('teleport');
                  schmovin = false;
                  epicgamer.metadata.barrier = false;
                  epicgamer.metadata.interact = false;
                  epicgamer.metadata.name = void 0;
                  epicgamer.metadata.args = void 0;
                  epicgamer.metadata.override = false;
                  epicgamer.metadata.reposition = true;
                  await timer.when(() => game.movement);
                  roomState.activated = false;
               }
            }
            break;
         }
         case 'f_napstablook': {
            if (roomState.customsAuto) {
               (roomState.customs as CosmosInstance).gain.value =
                  (roomState.customsLevel as number) * renderer.alpha.value;
            }
            break;
         }
         case 'f_undyne': {
            if (2 <= save.data.n.plot_date) {
               instance('main', 'f_undyne_door')?.destroy();
               const houzz = instance('main', 'f_undynehouse')!.object;
               if (!houzz.metadata.swapped) {
                  houzz.metadata.swapped = true;
                  for (const object of houzz.objects) {
                     if (object instanceof CosmosAnimation) {
                        object.use(content.iooFUndynehouseWrecked);
                        object.enable();
                        break;
                     }
                  }
               }
            }
            [ 1, 4, 5 ].includes(save.data.n.state_foundry_maddummy) && instance('main', 'f_dummynpc')?.destroy();
            if (!roomState.comcheck && world.goatbro && world.epicgamer) {
               roomState.comcheck = true;
               await timer.when(() => game.movement);
               if (!save.data.b.f_state_kidd_undynecom && world.genocide && world.epicgamer) {
                  save.data.b.f_state_kidd_undynecom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.undynecom);
               }
            }
            break;
         }
         case 'f_village': {
            if (world.genocide || world.population === 0) {
               instance('main', 'f_temmie1')?.destroy();
               instance('main', 'f_temmie2')?.destroy();
               instance('main', 'f_temmie3')?.destroy();
               instance('main', 'f_temmie5')?.destroy();
               instance('main', 'f_temmie6')?.destroy();
               instance('main', 'f_temmie7')?.destroy();
               world.bullied || instance('main', 'f_mushroomdance')?.destroy();
               instance('main', 'f_eggo')?.destroy();
               instance('main', 'f_genohole')!.object.position.y = 0;
            }
            break;
         }
         case 'f_story2': {
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && save.data.n.plot < 46) {
                  game.movement = false;
                  save.data.n.plot = 46;
                  const fish = character('undyneArmor', characters.undyneArmor, { x: 160, y: 220 }, 'down');
                  const stepSFX = () => {
                     if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                        assets.sounds.stomp.instance(timer).gain.value = Math.min(
                           Math.max(CosmosMath.remap(fish.position.y, 0.5, 0, 220, 280), 0),
                           1
                        );
                     }
                  };
                  fish.on('tick', stepSFX);
                  fish.walk(timer, 3, fish.position.add(0, 60)).then(() => {
                     fish.off('tick', stepSFX);
                     renderer.detach('main', fish);
                  });
                  await timer.pause(550);
                  await dialogue('auto', ...text.a_foundry.genotext.kidd2);
                  fish.alpha.value = 0;
                  game.movement = true;
               }
            }
            break;
         }
         case 'f_exit': {
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide && save.data.n.plot < 48) {
                  renderer.detach('main', madfish);
                  await timer.when(() => game.movement);
                  game.movement = false;
                  game.music!.gain.modulate(timer, 3000, 0);
                  await player.walk(timer, 3, { x: 160, y: 100 });
                  const filter = new GlowFilter({ color: 0xffffff });
                  const shaker = new CosmosValue();
                  let soundreduce = false;
                  const key = save.data.n.state_starton_papyrus === 1 ? 'undyneStoic' : 'undyne';
                  const finalfish = character(key, characters[key], { x: -20, y: 100 }, 'right', {
                     filters: [ filter ]
                  }).on('tick', {
                     priority: Infinity,
                     listener () {
                        filter.innerStrength = shaker.value / 2;
                        filter.outerStrength = (shaker.value / 2) * 3;
                        this.sprite.duration = 8;
                        if (!this.talk && this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                           const st = assets.sounds.stomp.instance(timer);
                           if (soundreduce) {
                              st.gain.value *= Math.min(Math.max((finalfish.position.x + 15) / 70, 0), 1);
                           }
                        }
                     }
                  });
                  let yee = false;
                  let basepos = finalfish.position.x;
                  finalfish.on('tick', () => {
                     yee && (finalfish.position.x = basepos + (Math.random() * 2 - 1) * shaker.value);
                  });
                  await finalfish.walk(timer, 2, { x: 40 });
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(timer, 1500, 2, 0);
                  yee = false;
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.finalfish1);
                  await timer.pause(1000);
                  await finalfish.walk(timer, 1, { x: 60 });
                  await dialogue('auto', ...text.a_foundry.finalfish2);
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(timer, 500, 2, 2);
                  yee = false;
                  renderer.detach('main', finalfish);
                  shaker.value = 0;
                  const fallenfish = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iocUndyneFallen ]
                  });
                  const fallencontainer = new CosmosHitbox({
                     objects: [ fallenfish ],
                     anchor: 0,
                     position: finalfish.position,
                     size: { x: 50, y: 100 },
                     metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fallenfish' ] }
                  });
                  renderer.attach('main', fallencontainer);
                  game.menu = false;
                  game.interact = true;
                  game.movement = true;
                  assets.sounds.noise.instance(timer);
                  (async () => {
                     const position = fallenfish.position;
                     const base = position.x;
                     position.x = base + 3;
                     await timer.pause(70);
                     position.x = base - 3;
                     await timer.pause(70);
                     position.x = base + 2;
                     await timer.pause(70);
                     position.x = base + 1;
                     await timer.pause(70);
                     position.x = base;
                  })();
                  await Promise.race([ events.on('teleport'), timer.when(() => roomState.water) ]);
                  save.data.n.plot = 48;
                  if (game.room === 'f_exit') {
                     await script('waterpour');
                     await timer.pause(250);
                     {
                        const position = fallenfish.position;
                        const base = position.x;
                        position.x = base + 1;
                        await timer.pause(70);
                        position.x = base - 2;
                        await timer.pause(70);
                        position.x = base + 3;
                        await timer.pause(70);
                        position.x = base + 3;
                        await timer.pause(70);
                        position.x = base;
                     }
                     renderer.detach('main', fallencontainer);
                     assets.sounds.noise.instance(timer);
                     shaker.value = 2;
                     renderer.attach('main', finalfish);
                     await shaker.modulate(timer, 500, 0, 0);
                     await timer.pause(2250);
                     finalfish.face = 'left';
                     await timer.pause(1250);
                     finalfish.face = 'down';
                     await timer.pause(1750);
                     finalfish.face = 'up';
                     await timer.pause(2250);
                     soundreduce = true;
                     renderer.detach('main', finalfish);
                     let hover = false;
                     const a = new CosmosValue();
                     const time = timer.value;
                     const fishShake = new CosmosValue();
                     const fishPosition = finalfish.position.clone();
                     const finalfish2 = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        resources: content.iocUndyneUpJetpack
                     }).on('tick', function () {
                        this.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                        if (hover) {
                           this.position.y += CosmosMath.remap(
                              a.value,
                              0,
                              CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2
                           );
                        }
                     });
                     renderer.attach('main', finalfish2);
                     assets.sounds.noise.instance(timer).gain.value = 0.5;
                     const flame = assets.sounds.jetpack.instance(timer);
                     flame.gain.value = 0.2;
                     await timer.pause(1100);
                     await fishShake.modulate(timer, 350, 1);
                     hover = true;
                     a.modulate(timer, 1000, 1);
                     timer.pause(400).then(() => {
                        fishShake.modulate(timer, 700, 0);
                     });
                     flame.gain.modulate(timer, 3200, flame.gain.value, 0).then(() => {
                        flame.stop();
                     });
                     await fishPosition.modulate(timer, 1800, {}, { y: -60 });
                     await timer.pause(1000);
                     renderer.detach('main', finalfish2);
                     if (!save.data.b.oops) {
                        roomState.charabeg && (await dialogue('auto', ...text.a_foundry.truetext.undyne1x));
                        await dialogue('auto', ...text.a_foundry.truetext.undyne1());
                     }
                     game.movement = true;
                     game.menu = true;
                  } else {
                     renderer.detach('main', fallencontainer);
                     save.data.n.state_foundry_undyne = 1;
                  }
               }
            }
            break;
         }
         case 'f_battle': {
            roomState.lastSpot ??= 0;
            if (
               roomState.lastSpot <= 1000 &&
               player.position.x > 1000 &&
               save.data.n.undyne_phase < 3 &&
               save.data.n.plot < 48
            ) {
               const di = Math.ceil((player.position.x - 1000) / 20) * 20;
               player.position.x -= di;
               madfish.position.x -= di;
               for (const n of madfish.metadata.s?.path ?? []) {
                  n.x -= di;
               }
            }
            roomState.lastSpot = player.position.x;
            break;
         }
      }
   } else {
      const scriptState = states.scripts[subscript] || (states.scripts[subscript] = {});
      switch (subscript) {
         case 'npc': {
            if (!game.movement) {
               break;
            }
            const inst = instance('main', args[0]);
            if (inst) {
               const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
               args[0] === 'f_clamgirl' && anim.use(content.ionFClamgirl2);
               await inst.talk(
                  'a',
                  talkFilter(),
                  'auto',
                  ...CosmosUtils.provide(text.a_foundry.npcinter[args[0] as keyof typeof text.a_foundry.npcinter])
               );
               args[0] === 'f_clamgirl' && anim.use(content.ionFClamgirl1);
            }
            break;
         }
         case 'spookydate': {
            if (player.face !== 'up') {
               break;
            }
            game.movement = false;
            if (save.data.n.plot < 33) {
               await dialogue('auto', ...text.a_foundry.spookydate1());
               if (choicer.result === 0) {
                  game.music!.gain.value = 0;
               }
               await dialogue('auto', ...[ text.a_foundry.spookydate2a, text.a_foundry.spookydate2b ][choicer.result]);
               if (choicer.result === 0) {
                  save.data.n.plot = 33;
                  const rimshotLoader = content.asRimshot.load();
                  const whoopeeLoader = content.asWhoopee.load();
                  const premonitionLoader = content.amSpookydate.load();
                  const stoolAssets = new CosmosInventory(
                     content.iocSansStool,
                     content.iocSansStoolComb,
                     content.iocSansStoolLeft,
                     content.iocSansStoolScratch
                  );
                  const grillbyAssets = new CosmosInventory(content.iocGrillbyUp, content.iocGrillbyDown);
                  const stoolLoader = stoolAssets.load();
                  const grillbyLoader = grillbyAssets.load();
                  const roomSans = roomState.sand as CosmosCharacter;
                  await roomSans.walk(timer, 3, { x: 200 }, { y: 160 }, { x: 280 });
                  roomSans.face = 'left';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate3);
                  await Promise.all([
                     roomSans.walk(timer, 3, { x: 340 }, { y: 280 }),
                     player.walk(timer, 3, { y: 160 }, { x: 340 }, { y: 240 })
                  ]);
                  await teleport('s_grillbys', 'up', 177.5, 230, world);
                  game.music!.gain.modulate(timer, 300, world.level);
                  const sand = character('sans', characters.sans, { x: 177.5, y: 200 }, 'down');
                  await timer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.spookydate4);
                  sand.face = 'up';
                  await dialogue('auto', ...text.a_foundry.spookydate5);
                  await sand.walk(timer, 3, { y: 200, x: 156.5 });
                  if (save.data.n.state_starton_dogs === 2 || world.population < 2) {
                     await timer.pause(450);
                  } else {
                     const dogamy = instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation;
                     const dogaressa = instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(dogamy);
                     header('x1').then(() => {
                        speech.targets.delete(dogamy);
                        dogamy.reset();
                        speech.targets.add(dogaressa);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate7);
                     speech.targets.delete(dogaressa);
                     dogaressa.reset();
                  }
                  await sand.walk(timer, 3, { x: 213.5 });
                  if (world.population < 8) {
                     await timer.pause(450);
                  } else {
                     const bunbun = instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation;
                     const bigmouth = instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(bigmouth);
                     header('x1').then(() => {
                        speech.targets.delete(bigmouth);
                        bigmouth.reset();
                        speech.targets.add(bunbun);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate6);
                     speech.targets.delete(bunbun);
                     bunbun.reset();
                  }
                  await sand.walk(timer, 3, { y: 130 });
                  if (world.population < 2) {
                     await timer.pause(650);
                     sand.face = 'left';
                     await timer.pause(1350);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9x);
                     await instance('main', 'g_redbird')?.talk(
                        'a',
                        talkFilter(),
                        'dialoguerBottom',
                        ...CosmosUtils.provide(text.a_foundry.spookydate9y)
                     );
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9z);
                     await timer.pause(1250);
                  } else if (world.population < 10) {
                     await timer.pause(850);
                  } else {
                     sand.face = 'left';
                     const beautifulfish = instance('main', 'g_beautifulfish')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(beautifulfish);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate8);
                     speech.targets.delete(beautifulfish);
                     await rimshotLoader;
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9);
                     sand.preset = characters.sansSpecial;
                     sand.face = 'down';
                     const NPCs = [
                        beautifulfish,
                        instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation,
                        instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation,
                        ...(save.data.n.state_starton_dogs === 2
                           ? []
                           : [
                                instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation,
                                instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation
                             ])
                     ];
                     for (const guy of NPCs) {
                        guy.duration = 2;
                        guy.enable();
                     }
                     const rimmer = assets.sounds.rimshot.instance(timer);
                     await timer.pause(3000);
                     rimmer.stop();
                     for (const guy of NPCs) {
                        guy.reset();
                     }
                     sand.preset = characters.sans;
                  }
                  content.asRimshot.unload();
                  await stoolLoader;
                  await dialogue('auto', ...text.a_foundry.spookydate10);
                  let mode = 0;
                  const stoolsand = new CosmosObject({
                     priority: 10000,
                     objects: [
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStool ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 0 ? 1 : 0;
                        }),
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStoolLeft ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 1 ? 1 : 0;
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolComb
                        }).on('tick', function () {
                           this.alpha.value = mode === 2 ? 1 : 0;
                           if (mode === 2 && !this.active) {
                              this.enable();
                           } else if (mode !== 2 && this.active) {
                              this.reset();
                           }
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolScratch
                        }).on('tick', function () {
                           this.alpha.value = mode === 3 ? 1 : 0;
                           if (mode === 3 && !this.active) {
                              this.enable();
                           } else if (mode !== 3 && this.active) {
                              this.reset();
                           }
                        })
                     ]
                  });
                  sand.walk(timer, 2, { y: 116 }).then(() => {
                     sand.preset = characters.none;
                     renderer.attach('main', stoolsand);
                  });
                  await Promise.all([ whoopeeLoader, player.walk(timer, 3, { x: 187.5, y: 127 }) ]);
                  await player.walk(timer, 1.5, { y: 106.5 });
                  const whooper = assets.sounds.whoopee.instance(timer);
                  whooper.rate.value = 1.25;
                  await Promise.all([ grillbyLoader, timer.pause(2500) ]);
                  await dialogue('auto', ...text.a_foundry.spookydate11);
                  const fries = choicer.result === 0;
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate12a, text.a_foundry.spookydate12b ][choicer.result]
                  );
                  const grillbz = instance('main', 'g_grillby')!.object;
                  grillbz.alpha.value = 0;
                  const grillbzWalk = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     priority: -999,
                     position: grillbz.position.add(11.5, 0),
                     resources: content.iocGrillbyUp
                  });
                  renderer.attach('main', grillbzWalk);
                  grillbzWalk.enable();
                  grillbzWalk.position
                     .modulate(timer, ((1e3 / 30) * 15) / 2, {
                        x: grillbzWalk.position.x,
                        y: grillbzWalk.position.y - 15
                     })
                     .then(async () => {
                        grillbzWalk.reset();
                        grillbzWalk.use(content.iocGrillbyDown);
                        grillbzWalk.enable();
                        const baseY = grillbzWalk.position.y;
                        const listener = () => {
                           grillbzWalk.position.y = baseY - (grillbzWalk.index % 2 ? 1 : 0);
                        };
                        grillbzWalk.on('tick', listener);
                        await timer.pause(650);
                        while (grillbzWalk.subcrop.bottom < 55) {
                           grillbzWalk.subcrop.bottom++;
                           await renderer.on('tick');
                        }
                        grillbzWalk.off('tick', listener);
                     });
                  mode = 2;
                  await timer.pause(4500);
                  whooper.stop();
                  content.asWhoopee.unload();
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate13);
                  if ((choicer.result as number) === 1 && !save.data.b.oops) {
                     oops();
                     await timer.pause(1e3);
                  }
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate14a, text.a_foundry.spookydate14b ][choicer.result]()
                  );
                  await timer.pause(1650);
                  const food = new CosmosSprite({
                     position: { y: 0 },
                     anchor: { x: 0, y: 1 },
                     frames: [ fries ? content.iooFFries : content.iooFBurger ]
                  });
                  grillbzWalk.attach(food);
                  const baseY = grillbzWalk.position.y;
                  const listener = () => {
                     grillbzWalk.position.y = baseY - (grillbzWalk.index % 2 ? 1 : 0);
                     food.position.y = -Math.max(22 - grillbzWalk.subcrop.bottom, 0) + (grillbzWalk.index % 2 ? 1 : 0);
                  };
                  grillbzWalk.on('tick', listener);
                  while (grillbzWalk.subcrop.bottom > 0) {
                     grillbzWalk.subcrop.bottom--;
                     await renderer.on('tick');
                  }
                  await timer.pause(350);
                  grillbzWalk.off('tick', listener);
                  grillbzWalk.enable();
                  grillbzWalk.position
                     .modulate(timer, ((1e3 / 30) * 15) / 2, {
                        x: grillbzWalk.position.x,
                        y: grillbzWalk.position.y + 15
                     })
                     .then(() => {
                        food.position.x = player.position.x + 10;
                        food.position.y = 87.5;
                        food.priority.value = 105;
                        const food2 = new CosmosSprite({
                           position: food.position.add(sand.position.x - player.position.x, 0),
                           anchor: { x: 0, y: 1 },
                           frames: [ fries ? content.iooFFries : content.iooFBurger ],
                           priority: 105
                        });
                        renderer.attach('main', food, food2);
                        isolates([ food, food2 ]);
                        grillbz.alpha.value = 1;
                        renderer.on('tick').then(() => {
                           grillbzWalk.alpha.value = 0;
                           renderer.detach('main', grillbzWalk);
                           grillbyAssets.unload();
                        });
                     });
                  await timer.pause(150);
                  await dialogue('auto', ...text.a_foundry.spookydate15);
                  mode = 3;
                  await timer.pause(3000);
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate16);
                  mode = 0;
                  await game.music!.gain.modulate(timer, 2500, 0);
                  await timer.pause(1500);
                  await dialogue('auto', ...text.a_foundry.spookydate17);
                  await Promise.all([ timer.pause(850), premonitionLoader ]);
                  const path = new CosmosObject({ alpha: 0.8 });
                  path.container.addChild(
                     new Graphics()
                        .beginFill(0, path.alpha.value)
                        .drawRect(0, 0, 320, 240)
                        .endFill()
                        .beginHole()
                        .drawEllipse(200, 92, 55 / 2, 61 / 2)
                        .endHole()
                  );
                  (grillbz.objects[0] as CosmosAnimation).disable();
                  renderer.attach('menu', path);
                  assets.sounds.noise.instance(timer);
                  await timer.pause(1150);
                  const spooky = assets.music.spookydate.instance(timer);
                  await dialogue('auto', ...text.a_foundry.spookydate18);
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate19a, text.a_foundry.spookydate19b ][choicer.result],
                     ...text.a_foundry.spookydate20()
                  );
                  spooky.gain.modulate(timer, 1000, 0).then(() => {
                     spooky.stop();
                     content.amSpookydate.unload();
                  });
                  await timer.pause(450);
                  game.music!.gain.modulate(timer, 1000, world.level);
                  (grillbz.objects[0] as CosmosAnimation).enable();
                  await path.alpha.modulate(timer, 850, 0);
                  renderer.detach('menu', path);
                  await timer.pause(1000);
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate21());
                  renderer.detach('main', stoolsand);
                  sand.preset = characters.sans;
                  await sand.walk(timer, 2, { y: 130 });
                  player.face = 'down';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate22);
                  player.walk(timer, 1.5, { y: 127 });
                  await sand.walk(timer, 3, { x: 177.5, y: 230 });
                  await timer.pause(650);
                  sand.face = 'up';
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate23());
                  await timer.pause(850);
                  await sand.walk(timer, 3, { y: 240 });
                  await sand.alpha.modulate(timer, 300, 0);
                  renderer.detach('main', sand);
                  save.data.b.fryz = fries;
                  player.metadata.fryz = true;
                  stoolAssets.unload();
               }
            } else {
               await dialogue('auto', ...text.a_foundry.spookydate0);
            }
            game.movement = true;
            break;
         }
         case 'doge': {
            if (save.data.n.plot < 35) {
               save.data.n.plot = 35;
               let attacked = false;
               const oopsie = save.data.b.oops;
               timer
                  .when(() => battler.volatile[0]?.vars.attacked)
                  .then(() => {
                     attacked = true;
                  });
               await battler.encounter(player, groups.doge);
               if (world.genocide) {
                  await dialogue('auto', ...text.a_foundry.genotext.asrielElite1());
               } else if (!oopsie && !attacked) {
                  await dialogue('auto', ...text.a_foundry.truetext.doge1());
               }
            }
            break;
         }
         case 'puzzle1':
         case 'puzzle2':
         case 'puzzle3': {
            const target = puzzleTarget();
            if (target <= save.data.n.plot) {
               await dialogue('auto', ...text.a_foundry[`${subscript}switch`]);
               break;
            }
            game.movement = false;
            const swit = instance('main', `f_${subscript}_switch`)!.object.objects.filter(
               obj => obj instanceof CosmosAnimation
            )[0] as CosmosAnimation;
            swit.index = 1;
            assets.sounds.noise.instance(timer);
            const anims = [] as CosmosAnimation[];
            const rects = [] as CosmosRectangle[];
            const pylons = [ ...instances('main', 'pylon') ];
            const overs = [] as CosmosSprite[];
            const stage = {
               mirrors: pylons.flatMap(
                  ({ object: pylon }) =>
                     [
                        [ pylon, 'pylon-a', pylon.position.add(-5, -15) ],
                        [ pylon, 'pylon-b', pylon.position.add(5, -15) ],
                        [ pylon, 'pylon-c', pylon.position.add(-5, -5) ],
                        [ pylon, 'pylon-d', pylon.position.add(5, -5) ]
                     ] as [CosmosObject, string, CosmosPointSimple][]
               ),
               discovery: [],
               beamwalls: (() => {
                  const beamwalls = [
                     ...instance('below', 'beamwall')!.object.objects,
                     ...renderer.layers.below.objects.flatMap(object =>
                        object.objects.filter(object => object.metadata.barrier)
                     )
                  ];
                  return renderer.calculate('below', hitbox => beamwalls.includes(hitbox));
               })(),
               rects,
               anims,
               overs
            };
            if (
               await (async () => {
                  if (subscript === 'puzzle3') {
                     const valid1 = { state: true };
                     const valid2 = { state: true };
                     return await Promise.all([
                        beamcast(stage, { x: 655, y: 121 }, valid1).then(result => {
                           result || (valid1.state && (valid1.state = false));
                           return result;
                        }),
                        beamcast(stage, { x: 735, y: 121 }, valid2).then(result_1 => {
                           result_1 || (valid2.state && (valid2.state = false));
                           return result_1;
                        })
                     ]).then(([ result1, result2 ]) => result1 && result2);
                  } else {
                     return beamcast(stage, subscript === 'puzzle1' ? { x: 75, y: 101 } : { x: 315, y: 41 });
                  }
               })()
            ) {
               if (stage.discovery.length === pylons.length) {
                  save.data.s[`state_foundry_f_${subscript}`] = CosmosUtils.serialize([
                     rects.map(rect => [
                        [ 'up', 'down', 'left', 'right' ].indexOf(rect.metadata.face as string),
                        rect.position.value(),
                        rect.size.value()
                     ]),
                     overs.map(over => [ over.position.value(), over.scale.x === -1 ])
                  ] as [[number, CosmosPointSimple, CosmosPointSimple][], [CosmosPointSimple, boolean][]]);
                  await passPuzzle(rects, anims);
                  for (const { object: pylon } of instances('main', 'pylon')) {
                     pylon.metadata.active = true;
                  }
                  events.on('teleport').then(() => {
                     renderer.detach('main', ...rects, ...overs);
                  });
                  save.data.n.plot = target;
                  assets.sounds.pathway.instance(timer);
                  shake(2, 1000);
               } else {
                  await failPuzzle(rects, anims, true);
                  renderer.detach('main', ...overs);
               }
            } else {
               await failPuzzle(rects, anims);
               renderer.detach('main', ...overs);
            }
            swit.index = 0;
            args[0] === 'cutscene' || (game.movement = true);
            break;
         }
         case 'run1': {
            if (save.data.n.plot < 38) {
               save.data.n.plot = world.genocide ? 38.01 : 38;

               // script start
               game.movement = false;

               // asset loaders
               const kiddLoader = new CosmosInventory(inventories.iocKidd, inventories.idcKidd, content.avKidd).load();

               if (world.genocide) {
                  await kiddLoader;
                  const kidd = character('kidd', characters.kidd, player.position.add(180, 0), 'right');
                  await kidd.walk(timer, 4, { x: player.position.x + 100 });
                  await tripper(kidd, content.iocKiddLeftTrip);
                  await kidd.walk(timer, 4, { x: player.position.x + 21 });
                  await dialogue('auto', ...text.a_foundry.undyne2ax);
                  await kidd.walk(
                     timer,
                     2,
                     goatbro.position.add(0, player.position.y > 440 ? -14 : 14),
                     goatbro.position.subtract(21, 0)
                  );
                  await timer.pause(350);
                  epicgamer.face = 'right';
                  epicgamer.position = kidd.position;
                  epicgamer.metadata.reposition = true;
                  epicgamer.metadata.repositionFace = 'right';
                  renderer.detach('main', kidd);
                  renderer.attach('main', epicgamer);
                  await timer.pause(850);
                  await dialogue('auto', ...text.a_foundry.undyne2bx);
                  game.movement = true;
                  await timer.when(() => game.room === 'f_chase' && player.position.y < 140);
                  await dialogue('auto', ...text.a_foundry.undyne2cx());
                  await timer.when(() => game.room === 'f_chase' && player.position.x > 550 && player.position.y > 380);
                  await dialogue('auto', ...text.a_foundry.undyne2dx());
                  await timer.when(
                     () => game.room === 'f_chase' && player.position.x > 1070 && player.position.y < 380
                  );
                  await dialogue('auto', ...text.a_foundry.undyne2ex);
                  await timer.when(() => game.room === 'f_chase' && player.position.x > 1420);
                  await dialogue('auto', ...text.a_foundry.undyne2fx);
               } else {
                  game.menu = false;
                  const fastAssets = new CosmosInventory(
                     inventories.battleAssets,
                     content.ibbChasespear,
                     content.amUndynefast,
                     content.iooFSpearSpawn
                  );
                  const grabAssets = new CosmosInventory(content.iocUndyneGrabKidd, content.asGrab);
                  const grabLoader = grabAssets.load();
                  const fastLoader = fastAssets.load();
                  const jetpackAssets = new CosmosInventory(content.asFear, content.asJetpack);
                  const jetpackLoader = jetpackAssets.load();
                  const stompLoader = content.asStomp.load();

                  // pre-chase cutscene
                  {
                     const fearSpear = new CosmosSprite({
                        position: { x: 160 },
                        anchor: { x: 0, y: 1 },
                        frames: [ content.iooFSpear ]
                     });
                     renderer.attach('main', fearSpear);
                     assets.sounds.arrow.instance(timer);
                     await fearSpear.position.modulate(timer, 400, { x: 160, y: player.position.y });
                     const overlay = new CosmosRectangle({
                        fill: 'white',
                        size: { x: 320, y: 240 }
                     });
                     renderer.attach('menu', overlay);
                     fearSpear.frames = [ content.iooFSpearStab ];
                     shake(1.5, 700);
                     assets.sounds.landing.instance(timer);
                     await timer.pause(50);
                     await overlay.alpha.modulate(timer, 150, 0);
                     renderer.detach('menu', overlay);
                     await timer.pause(450);
                     fearSpear.alpha.modulate(timer, 1000, 0).then(() => {
                        renderer.detach('main', fearSpear);
                     });
                  }

                  // adjust camera
                  const cam = new CosmosObject({ position: player.position });
                  game.camera = cam;
                  await Promise.all([ cam.position.modulate(timer, 500, { x: cam.position.x, y: 360 }), jetpackLoader ]);
                  const diff = player.position.y - cam.position.y;
                  const cameraTicker = () => {
                     if (game.room === 'f_chase') {
                        game.camera = cam;
                        renderer.region[0].y = -1000;
                        cam.position = player.position.subtract(0, diff);
                     } else {
                        game.camera = player;
                     }
                  };
                  renderer.on('tick', cameraTicker);

                  // spawn undyne
                  assets.sounds.fear.instance(timer);
                  let chase = true;
                  let hover = true;
                  let controller = true;
                  const time = timer.value;
                  const fishShake = new CosmosValue();
                  const fishPosition = new CosmosPoint({ x: 160, y: player.position.y - 160 });
                  let room = '';
                  const moveTrail = [] as CosmosPoint[];
                  const fish = character(
                     'undyneArmorJetpack',
                     characters.undyneArmorJetpack,
                     fishPosition.value(),
                     'down',
                     { alpha: 0 }
                  ).on('tick', function () {
                     if (chase) {
                        if (game.room !== room) {
                           room = game.room;
                           moveTrail.splice(0, moveTrail.length);
                        }
                        moveTrail.push(player.position.clone());
                        moveTrail.length > 8 && moveTrail.shift();
                        const truePosition = moveTrail[0].subtract(0, 160);
                        const dist = fishPosition.extentOf(truePosition);
                        const destPosition =
                           dist < 1.5
                              ? truePosition
                              : dist > 250
                              ? truePosition.endpoint(fishPosition.angleFrom(truePosition), -40)
                              : fishPosition.endpoint(truePosition.angleFrom(fishPosition), Math.min(dist / 3, 15));
                        const diff = destPosition.subtract(fishPosition);
                        if (Math.abs(diff.x) > Math.abs(diff.y)) {
                           this.face = diff.x < 0 ? 'left' : 'right';
                        } else {
                           this.face = 'down';
                        }
                        Object.assign(fishPosition, destPosition.value());
                     }
                     if (controller) {
                        this.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                        if (hover) {
                           this.position.y += CosmosMath.wave(((timer.value - time) % 1200) / 1200) * 2;
                        }
                     }
                  });

                  fish.alpha.modulate(timer, 800, 1, 1);

                  // jetpack sound
                  const flame = assets.sounds.jetpack.instance(timer);
                  flame.gain.value = 0;
                  flame.gain.modulate(timer, 800, 0.2);

                  // music & chase start
                  await Promise.all([ fastLoader, timer.pause(1000) ]);
                  game.movement = true;
                  const runMusic = assets.music.undynefast.instance(timer);

                  // detect end
                  timer
                     .when(() => game.room === 'f_entrance')
                     .then(async () => {
                        // lock values
                        chase = false;
                        teleporter.movement = false;
                        firingRate.modulate(timer, 0, firingRate.value);
                        fish.on('tick', () => {
                           script('tick');
                        });

                        // stop fish (instead of go fish)
                        fishPosition.x = 20;
                        fishPosition.y = player.position.y - 160;
                        await player.walk(timer, 3, { x: 140 });

                        // disable camera
                        game.camera = player;
                        renderer.off('tick', cameraTicker);

                        // fade out music & restore score
                        runMusic.gain.modulate(timer, 5000, 0).then(() => {
                           runMusic.stop();
                           fastAssets.unload();
                        });

                        // fish stops being mad
                        await timer.pause(1350);
                        fish.face = 'down';
                        await Promise.all([ stompLoader, fishShake.modulate(timer, 1000, 0) ]);
                        timer
                           .when(() => fish.position.y > player.position.y - 15)
                           .then(() => {
                              fish.preset = characters.undyneArmor;
                              assets.sounds.noise.instance(timer).gain.value = 0.5;
                              flame.stop();
                              jetpackAssets.unload();
                           });
                        await fishPosition.modulate(
                           timer,
                           1150,
                           fishPosition.value(),
                           { y: player.position.y },
                           { y: player.position.y }
                        );
                        hover = false;
                        fishPosition.y = fish.position.y;
                        assets.sounds.stomp.instance(timer).gain.value = 0.9;
                        shake(1.25, 500);
                        await timer.pause(650);

                        // fish walks towards player
                        const stepSFX = () => {
                           if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                              assets.sounds.stomp.instance(timer).gain.value = CosmosMath.remap(
                                 fish.position.x,
                                 0.5,
                                 0.8,
                                 20,
                                 120
                              );
                           }
                        };

                        // walk to player Y
                        {
                           fish.on('tick', stepSFX);
                           fish.face = fishPosition.y < player.position.y ? 'down' : 'up';
                           characters.undyneArmor.walk[fish.face].duration = 6;
                           characters.undyneArmor.walk[fish.face].enable();
                           while (Math.abs(fishPosition.y - player.position.y) > 0.5) {
                              await renderer.on('tick');
                              fishPosition.x += 1;
                              fishPosition.y += Math.min(Math.max(player.position.y - fishPosition.y, -1), 1);
                           }
                           characters.undyneArmor.walk[fish.face].reset();
                           fishPosition.y = player.position.y;
                        }

                        // walk towards player X
                        {
                           fish.face = 'right';
                           characters.undyneArmor.walk.right.duration = 6;
                           characters.undyneArmor.walk.right.enable();
                           while (fishPosition.x < player.position.x - 19) {
                              await renderer.on('tick');
                              fishPosition.x = Math.min(fishPosition.x + 1, player.position.x - 19);
                           }
                           characters.undyneArmor.walk.right.reset();
                           fish.off('tick', stepSFX);
                        }

                        // fish grabs the... oh wait it's monster kid
                        await Promise.all([ grabLoader, timer.pause(2150) ]);
                        fish.alpha.value = 0;
                        const touchie = new CosmosAnimation({
                           active: true,
                           anchor: { x: 0, y: 1 },
                           priority: 101,
                           position: fish.position.value(),
                           resources: content.iocUndyneGrabKidd
                        });
                        renderer.attach('main', touchie);
                        timer
                           .when(() => touchie.index === 1)
                           .then(() => {
                              assets.sounds.grab.instance(timer);
                           });
                        await timer.when(() => touchie.index === 29);
                        renderer.detach('main', touchie);
                        fish.alpha.value = 1;
                        await timer.pause(850);
                        fish.face = 'left';
                        await Promise.all([ timer.pause(1350), kiddLoader ]);

                        // the fish ran away
                        {
                           characters.undyneArmor.walk.left.duration = 4;
                           characters.undyneArmor.walk.left.step = 1;
                           controller = false;
                           fish.on('tick', stepSFX);
                           await fish.walk(timer, 2, { x: -20 });
                           fish.off('tick', stepSFX);
                           characters.undyneArmor.walk.left.reset();
                           renderer.detach('main', fish);
                        }
                        // script end
                        content.asStomp.unload();

                        // just KIDding it's monster KID!!
                        const kidd = character('kidd', characters.kidd, player.position.value(), 'right').on(
                           'tick',
                           () => {
                              script('tick');
                           }
                        );
                        await kidd.walk(timer, 4, { x: 240 });
                        await tripper(kidd);
                        await timer.pause(500);
                        kidd.face = 'left';
                        await timer.pause(500);
                        kidd.face = 'up';
                        await timer.pause(500);
                        kidd.face = 'down';
                        await timer.pause(1150);
                        await dialogue('auto', ...text.a_foundry.undyne2a);
                        await timer.pause(850);
                        kidd.face = 'left';
                        await timer.pause(1150);
                        await dialogue('auto', ...text.a_foundry.undyne2b);
                        await player.walk(timer, 3, kidd.position.subtract(21, 0));
                        await timer.pause(1000);
                        await dialogue('auto', ...text.a_foundry.undyne2c);
                        await kidd.walk(timer, 2, player.position.add(0, 14), player.position.subtract(21, 0));
                        await timer.pause(350);
                        kidd.face = 'right';
                        await timer.pause(850);
                        await dialogue('auto', ...text.a_foundry.undyne2d);
                        renderer.detach('main', kidd);
                        player.face = 'right';
                        renderer.attach('main', epicgamer);

                        // restore game music
                        {
                           const score = rooms.of('f_entrance').score;
                           const daemon = audio.music.of(score.music!);
                           audio.musicFilter.value = score.filter;
                           audio.musicMixer.value = score.gain;
                           audio.musicReverb.value = score.reverb;
                           game.music = daemon.instance(timer);
                           game.music.rate.value = score.rate * world.ambiance;
                        }

                        // script end (for real this time)
                        save.data.n.plot = 38.01;
                        game.movement = true;
                        game.menu = true;
                     });

                  // fish gets angy
                  fishShake.modulate(timer, 120e3, 1.5);
                  const firingRate = new CosmosValue(3000);
                  firingRate.modulate(timer, 120e3, 1000);

                  // spear chase system
                  while (chase) {
                     let active = true;
                     const teleport = events.on('teleport').then(() => (active = false));

                     // spawn sprite
                     const spawnOrigin = fish.position.subtract(0, 40).endpoint(random.next() * 360, 15);
                     const spawnSprite = new CosmosAnimation({
                        active: true,
                        position: spawnOrigin,
                        resources: content.iooFSpearSpawn,
                        anchor: 0,
                        rotation: random.next() * 360
                     });
                     renderer.attach('main', spawnSprite);
                     const scaTarget = { x: 2, y: 2 };
                     spawnSprite.scale.modulate(timer, 800, scaTarget, scaTarget);
                     const rotTarget = spawnSprite.rotation.value + 120;
                     spawnSprite.rotation.modulate(timer, 800, rotTarget, rotTarget);
                     Promise.race([ teleport, spawnSprite.alpha.modulate(timer, 1000, 1, 1, 0) ]).then(() => {
                        renderer.detach('main', spawnSprite);
                     });

                     // spawn spear
                     timer.pause(300).then(async () => {
                        let fire = false;
                        const shaker = new CosmosValue();
                        const spearSide = random.next() < 0.5 ? -1 : 1;
                        let index = 0;
                        while (index++ < 5) {
                           const pos = spawnOrigin.endpoint(random.next() * 360, 20);
                           const rot = new CosmosValue(CosmosMath.remap(random.next(), 600, 250) * spearSide);
                           const rotExt = -10 + random.next() * 20;
                           const spearSprite = new CosmosSprite({
                              anchor: 0,
                              alpha: 0,
                              frames: [ content.iooFSpear ],
                              metadata: { primed: true }
                           }).on('tick', async function () {
                              if (fire) {
                                 if (battler.active || this.position.y > player.position.y + 200) {
                                    renderer.detach('main', this);
                                 } else {
                                    if (this.metadata.primed) {
                                       this.metadata.primed = false;
                                       this.position = pos.clone();
                                       this.velocity = new CosmosPoint().endpoint(
                                          pos.angleFrom(player.position) + 180 + rotExt,
                                          8
                                       );
                                    }

                                    // detect spear hitting player
                                    if (game.movement && !battler.active) {
                                       const tip = this.position.endpoint(this.rotation.value + 90, 27);
                                       if (
                                          tip.x > player.position.x - 6.25 &&
                                          tip.x < player.position.x + 6.25 &&
                                          tip.y > player.position.y - 25 &&
                                          tip.y < player.position.y
                                       ) {
                                          game.movement = false;
                                          await battler.battlefall(player, { x: 160, y: 180 });
                                          await battler.simple(async () => {
                                             game.movement = true;
                                             await patterns.undynefast();
                                             if (save.data.n.hp > 0) {
                                                events.fire('exit');
                                             }
                                          });
                                       }
                                    }
                                 }
                              } else {
                                 this.position = pos.add(
                                    (Math.random() - 0.5) * shaker.value * 2,
                                    (Math.random() - 0.5) * shaker.value * 2
                                 );
                                 this.rotation.value = pos.angleFrom(player.position) + rot.value + 90 + rotExt;
                              }
                           });
                           timer.post().then(() => {
                              renderer.attach('main', spearSprite);
                              rot.modulate(timer, 900, 0, 0);
                              spearSprite.alpha.modulate(timer, 800, 1);
                              teleport.then(() => {
                                 renderer.detach('main', spearSprite);
                              });
                           });
                        }
                        await shaker.modulate(timer, 1000, 0, 2);
                        shaker.value = 0;
                        if (active) {
                           fire = true;
                           assets.sounds.arrow.instance(timer);
                        }
                     });
                     await Promise.all([ timer.pause(firingRate.value), timer.when(() => !battler.active) ]);
                  }
               }
            }
            break;
         }
         case 'quiche': {
            if (save.data.b.item_quiche) {
               await dialogue('auto', ...text.a_foundry.quiche4);
            } else {
               await dialogue('auto', ...text.a_foundry.quiche1);
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     save.data.b.item_quiche = true;
                     save.storage.inventory.add('quiche');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_foundry.quiche3);
                  } else {
                     await dialogue('auto', ...text.a_foundry.quiche2);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.quiche5);
               }
            }
            break;
         }
         case 'cardbox': {
            if (!game.movement) {
               break;
            }
            const dimbox = instance('main', 'dimbox');
            if (dimbox) {
               game.movement = false;
               const anim = dimbox.object.objects[0] as CosmosAnimation;
               anim.enable();
               await timer.when(() => anim.index === 3);
               anim.disable();
               if (save.data.n.state_foundry_punchcards > 0) {
                  if (save.data.n.state_foundry_punchcards > 1) {
                     typer.variables.x = save.data.n.state_foundry_punchcards.toString();
                     await dialogue('auto', ...text.a_foundry.punchcard2);
                  } else {
                     await dialogue('auto', ...text.a_foundry.punchcard1);
                  }
                  await dialogue('auto', ...text.a_foundry.punchcard3);
                  if (choicer.result === 0) {
                     if (save.storage.inventory.size < 8) {
                        assets.sounds.equip.instance(timer);
                        save.storage.inventory.add('punchcard');
                        await dialogue('auto', ...text.a_foundry.punchcard4);
                        save.data.n.state_foundry_punchcards--;
                     } else {
                        await dialogue('auto', ...text.a_foundry.quiche2);
                     }
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.punchcard0);
               }
               await timer.when(() => atlas.target === null);
               anim.index = 4;
               anim.enable();
               await timer.when(() => anim.index === 6);
               anim.disable().reset();
               game.movement = true;
            }
            break;
         }
         case 'sentry': {
            if (save.data.n.plot > 33) {
               if (player.face === 'down') {
                  await dialogue('auto', ...text.a_foundry.sansSentryBack());
               } else {
                  await dialogue('auto', ...text.a_foundry.sansSentry());
               }
            }
            break;
         }
         case 'artifact': {
            if (save.data.b.item_artifact) {
               await dialogue('auto', ...text.a_foundry.artifact3);
            } else {
               if (save.storage.inventory.size < 8) {
                  const box = instance('main', 'artifactbox')!;
                  const spr = box.object.objects.filter(x => x instanceof CosmosSprite)[0] as CosmosSprite;
                  spr.index = 1;
                  save.data.b.item_artifact = true;
                  save.storage.inventory.add('artifact');
                  assets.sounds.equip.instance(timer);
                  await dialogue('auto', ...text.a_foundry.artifact1);
               } else {
                  await dialogue('auto', ...text.a_foundry.artifact2);
               }
            }
            break;
         }
         case 'piano': {
            let keyX = 0;
            let keyY = 0;
            let keyZ = '11';
            let active = true;
            let portamento = null as number | null;
            const ratio = 2 ** (1 / 12);
            const position = { x: 0, y: 0 };
            const sequences = [
               [ 0, 7, 5, 0, 4, 4, 5 ],
               [ 3, 12, 10, 12, 9, 10, 7, 10, 9, 5, 3, 5, 0 ]
            ];
            const ticker = () => {
               if (active) {
                  keyX = (keys.leftKey.active() ? -1 : 0) + (keys.rightKey.active() ? 1 : 0);
                  keyY = (keys.downKey.active() ? 1 : 0) + (keys.upKey.active() ? -1 : 0);
                  keyZ = `k${[ 0, 1, 2 ][keyX + 1]}${[ 0, 1, 2 ][keyY + 1]}`;
                  for (const instance of instances('main', 'pianoarrow')) {
                     const focus = instance.tags.includes(keyZ) ? (keys.interactKey.active() ? 2 : 1) : 0;
                     if (instance.object.metadata.active !== focus) {
                        instance.object.metadata.active = focus || void 0;
                        for (const subobj of instance.object.objects as CosmosAnimation[]) {
                           subobj.index = focus;
                        }
                     }
                  }
               }
            };
            const listener = () => {
               if (active) {
                  const tags = instance('main', keyZ)!.tags as string[];
                  for (const tag of tags) {
                     if (tag !== 'pianoarrow' && tag !== keyZ) {
                        const step = +tag;
                        if (position.y === 0) {
                           for (const [ index, sequence ] of sequences.entries()) {
                              if (sequence[0] === step) {
                                 position.x = index;
                                 position.y = 1;
                                 break;
                              }
                           }
                        } else if (sequences[position.x][position.y] === step) {
                           if (++position.y === sequences[position.x].length) {
                              if (position.x === 0) {
                                 if (save.data.b.f_state_piano) {
                                    break;
                                 }
                              } else {
                                 if (save.data.b.f_state_truth) {
                                    break;
                                 }
                              }
                              active = false;
                              timer.pause(750).then(() => {
                                 if (position.x === 0) {
                                    save.data.b.f_state_piano = true;
                                 } else {
                                    save.data.b.f_state_truth = true;
                                 }
                                 deactivate();
                                 assets.sounds.pathway.instance(timer);
                                 shake(2, 1000);
                              });
                           }
                        } else {
                           position.y = 0;
                        }
                        const note = assets.sounds.note.instance(timer, { store: true });
                        const rate = ratio ** step;
                        note.rate.value = Math.min(Math.max(portamento ?? rate, rate / 1.25), rate * 1.25);
                        note.rate.modulate(timer, 50, (portamento = rate));
                        break;
                     }
                  }
               }
            };
            const deactivate = () => {
               renderer.off('tick', ticker);
               keys.interactKey.off('down', listener);
               for (const instance of instances('main', 'pianoarrow')) {
                  if (instance.object.metadata.active) {
                     instance.object.metadata.active = void 0;
                     for (const subobj of instance.object.objects as CosmosAnimation[]) {
                        subobj.index = 0;
                     }
                  }
               }
               for (const instance of assets.sounds.note.instances) {
                  instance.stop();
               }
               game.movement = true;
            };
            game.movement = false;
            renderer.on('tick', ticker);
            keys.interactKey.on('down', listener);
            ticker();
            await timer.pause(500);
            await timer.when(() => active && keys.specialKey.active());
            deactivate();
            /*
            // if you know what you're doing, this could sound really cool.
            const a = 2 ** (1 / 12);
            const b = ((60 / 180) / 4) * 1000;
            for (const c of [0,-4,-3,-1].flatMap((x,i)=>[12,x,x,null,x,null,x,null,14,x,x,null,x,null,x,null,15,x,x,null,x, null,14,null,null,null,...(i<3?[x,null,x,null,x,null]:[])])) {
               c === null || (assets.sounds.note.instance(timer).rate.value = a ** c);
               await timer.pause(b);
            }
            */
            break;
         }
         case 'candy': {
            if (game.movement) {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.candy1);
               if (choicer.result < 3) {
                  const item = [ 'rations', 'water', 'tzn' ][choicer.result] as 'rations' | 'water' | 'tzn';
                  const price = [ 20, 10, 15 ][choicer.result];
                  if (item === 'water') {
                     typer.variables.x = commonText.i_water.name;
                  } else {
                     typer.variables.x = text[`i_${item}`].name;
                  }
                  typer.variables.y = price.toString();
                  await dialogue('auto', ...text.a_foundry.candy3);
                  if (choicer.result === 0) {
                     if (save.storage.inventory.size < 8) {
                        if (save.data.n.g < price) {
                           await dialogue('auto', ...text.a_foundry.candy4);
                        } else {
                           save.storage.inventory.add(item);
                           assets.sounds.equip.instance(timer);
                           await dialogue('auto', ...text.a_foundry.candy2);
                        }
                     } else {
                        await dialogue('auto', ...text.a_foundry.candy6);
                     }
                  } else {
                     await dialogue('auto', ...text.a_foundry.candy5);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.candy7);
               }
               game.movement = true;
            }
            break;
         }
         case 'fakedummy': {
            game.movement = false;
            if (save.data.b.f_state_dummypunch) {
               await dialogue('auto', ...text.a_foundry.dummypunch3);
            } else {
               save.data.b.f_state_dummytalk = true;
               await dialogue('auto', ...text.a_foundry.dummypunch1);
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_foundry.dummypunch2a);
               } else {
                  save.data.b.f_state_dummypunch = true;
                  if (!save.data.b.oops) {
                     oops();
                     await timer.pause(1000);
                  }
                  await dialogue('auto', ...text.a_foundry.dummypunch2b());
               }
            }
            game.movement = true;
            break;
         }
         case 'sandinter': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (save.data.b.f_state_telescope) {
               await dialogue('auto', ...text.a_foundry.telescopeY);
            } else {
               await dialogue('auto', ...text.a_foundry.telescopeX());
               if (choicer.result === 0) {
                  let x = 160;
                  let y = 120;
                  save.data.b.f_state_telescope = true;
                  const graphik = new Graphics();
                  const recto = new CosmosRectangle({
                     fill: 'black',
                     size: { x: 320, y: 240 }
                  }).on('tick', () => {
                     graphik.clear().beginFill(0xffffff, 1).drawEllipse(x, y, 40, 33).endFill();
                  });
                  recto.container.addChild(graphik);
                  renderer.attach('menu', recto);
                  await timer.pause(500);
                  const keyListener = () => {
                     x = Math.min(
                        Math.max(x + (keys.leftKey.active() ? -4 : 0) + (keys.rightKey.active() ? 4 : 0), 0),
                        320
                     );
                     y = Math.min(
                        Math.max(y + (keys.upKey.active() ? -4 : 0) + (keys.downKey.active() ? 4 : 0), 0),
                        240
                     );
                  };
                  renderer.on('tick', keyListener);
                  await keys.specialKey.on('down');
                  renderer.detach('menu', recto);
                  renderer.off('tick', keyListener);
                  player.metadata.pranked = true;
                  events.on('teleport').then(() => {
                     player.metadata.pranked = false;
                  });
               }
            }
            game.movement = true;
            break;
         }
         case 'birdcheck': {
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.bird1);
            const bird = roomState.bird as CosmosHitbox;
            const birdSprite = bird.objects[0] as CosmosAnimation;
            if (choicer.result === 0) {
               birdSprite.use(content.ionFBird);
               const speed1 = 1;
               const speed2 = 0.8;
               const speed3 = 10;
               const bazeTime = timer.value;
               const shaker = new CosmosValue(1.2);
               const birdPos = birdSprite.position.clone();
               const playerPos = player.sprite.position.clone();
               const shakeListener = () => {
                  birdSprite.position = birdPos.add(
                     (Math.random() - 0.5) * shaker.value,
                     (Math.random() - 0.5) * shaker.value
                  );
                  player.sprite.position = playerPos.add(
                     (Math.random() - 0.5) * shaker.value,
                     (Math.random() - 0.5) * shaker.value
                  );
               };
               const side = player.position.x < 750 ? 1 : -1;
               const targetX = side === 1 ? 1385 : 115;
               const echoAlpha = new CosmosValue(1);
               const echoListener = () => {
                  for (const [ subject, sprite ] of [
                     [ bird, birdSprite ],
                     [ player, player.sprite ]
                  ] as [CosmosHitbox, CosmosAnimation][]) {
                     const echo = shadow(sprite, echo => (echo.alpha.value /= 1.5) < 0.00001, {
                        alpha: CosmosMath.remap(Math.abs(subject.velocity.x), 0, 0.2, speed2, speed3) * echoAlpha.value,
                        priority: subject.position.y - 1,
                        position: subject.position.add(sprite.position),
                        velocity: { x: subject.velocity.x / 5 }
                     });
                     renderer.attach('main', echo.object);
                     echo.promise.then(() => {
                        renderer.detach('main', echo.object);
                     });
                  }
               };

               // init delay
               game.music!.gain.value = 0;
               const rise = assets.music.rise.instance(timer);
               const OGgain = rise.gain.value;
               rise.gain.value = 0;
               rise.gain.modulate(timer, 2000, OGgain);
               await timer.pause(350);

               // move to player
               birdSprite.use(content.ionFBirdFly);
               await bird.position.step(timer, speed1, player.position.subtract(0, 20));
               await timer.pause(500);

               // lift
               renderer.on('tick', shakeListener);
               await bird.position.step(timer, speed2, player.position.subtract(0, 25));
               await Promise.all([
                  bird.position.step(timer, speed2, bird.position.subtract(0, 40)),
                  player.position.step(timer, speed2, player.position.subtract(0, 40))
               ]);
               await timer.pause(500);

               // set initial velocity
               bird.velocity.x = speed2 * side;
               player.velocity.x = speed2 * side;

               // speed up
               shaker.modulate(timer, 1000, 0.8);
               timer.pause(6270 - (timer.value - bazeTime)).then(() => {
                  renderer.on('tick', echoListener);
                  const cover = new CosmosRectangle({
                     alpha: 0.8,
                     fill: 'white',
                     size: { x: 320, y: 240 }
                  });
                  renderer.attach('menu', cover);
                  cover.alpha.modulate(timer, 1000, 0).then(() => {
                     renderer.detach('menu', cover);
                  });
               });
               Promise.all([
                  bird.velocity.modulate(timer, 2000, { x: speed2 * side }, { x: speed3 * 0.8 * side }),
                  player.velocity.modulate(timer, 2000, { x: speed2 * side }, { x: speed3 * 0.8 * side })
               ]).then(() => {
                  assets.sounds.boom.instance(timer).rate.value = 0.5;
                  bird.velocity.modulate(
                     timer,
                     15000 - (timer.value - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
                  player.velocity.modulate(
                     timer,
                     15000 - (timer.value - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
               });

               timer.pause(17500 - (timer.value - bazeTime)).then(async () => {
                  await echoAlpha.modulate(timer, 3000, 0);
                  renderer.off('tick', echoListener);
               });
               while (timer.value - bazeTime < 18500) {
                  await timer.when(() => Math.abs(targetX - player.position.x) < 500);
                  for (const object of renderer.layers.main.objects) {
                     object.position.x -= side * 100;
                  }
               }

               await timer.when(() => Math.abs(targetX - player.position.x) < 200);

               // slow down
               shaker.modulate(timer, 1000, 1.2);
               bird.velocity.modulate(timer, 1000, { x: speed2 * side });
               player.velocity.modulate(timer, 1000, { x: speed2 * side });
               await timer.when(() => Math.abs(targetX - player.position.x) < 10);

               // cancel velocity
               bird.velocity.x = 0;
               player.velocity.x = 0;

               // manually move the remaining distance
               await Promise.all([
                  bird.position.step(timer, speed2, { x: targetX }),
                  player.position.step(timer, speed2, { x: targetX })
               ]);
               await timer.pause(500);

               // beging dropdown
               rise.gain.modulate(timer, 4000, 0, 0).then(() => {
                  rise.stop();
               });
               const dropOffset = player.position
                  .add(0, 40)
                  .clamp({ x: -Infinity, y: 125 }, { x: Infinity, y: 155 })
                  .subtract(player.position);
               await Promise.all([
                  bird.position.step(timer, speed2, bird.position.add(dropOffset)),
                  player.position.step(timer, speed2, player.position.add(dropOffset))
               ]);
               await timer.pause(500);

               // end dropdown
               await bird.position.step(timer, speed2, player.position.subtract(0, 20));
               renderer.off('tick', shakeListener);

               // move to start spot
               await bird.position.step(timer, speed1, { x: player.position.x > 750 ? 1360 : 140, y: 140 });
               birdSprite.use(content.ionFBird);

               // end delay
               await timer.pause(350);
               game.music!.gain.value = world.level;
            } else {
               birdSprite.use(content.ionFBirdCry);
            }
            game.movement = true;
            break;
         }
         case 'astrofood': {
            if (save.data.n.state_foundry_astrofood < 3) {
               await dialogue('auto', ...text.a_foundry.astrofood1());
               if (choicer.result === 0) {
                  if (save.storage.inventory.size < 8) {
                     save.storage.inventory.add('astrofood');
                     assets.sounds.equip.instance(timer);
                     await dialogue('auto', ...text.a_foundry.astrofood2);
                     save.data.n.state_foundry_astrofood++;
                  } else {
                     await dialogue('auto', ...text.a_foundry.astrofood3);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.astrofood4());
               }
            } else {
               await dialogue('auto', ...text.a_foundry.astrofood5);
            }
            break;
         }
         case 'ladder': {
            scriptState.time = timer.value;
            if (!scriptState.active) {
               scriptState.active = true;
               player.metadata.speed = 0.5;
               timer
                  .when(() => timer.value > scriptState.time + 40)
                  .then(() => {
                     player.metadata.speed = 1;
                     scriptState.active = false;
                  });
            }
            break;
         }
         case 'blookmusic': {
            if (game.movement) {
               game.movement = false;
               if (save.data.n.state_foundry_blookmusic === 0) {
                  if (world.madfish) {
                     await dialogue('auto', ...text.a_foundry.blookmusic1x);
                  } else {
                     await dialogue('auto', ...text.a_foundry.blookmusic1());
                     if (choicer.result < 3) {
                        assets.sounds.equip.instance(timer).rate.value = 1.25;
                        save.data.n.state_foundry_blookmusic = (choicer.result + 1) as 1 | 2 | 3;
                        napstamusic(roomState);
                        const precount = [
                           save.data.b.f_state_blookmusic1,
                           save.data.b.f_state_blookmusic2,
                           save.data.b.f_state_blookmusic3
                        ].filter(value => value).length;
                        const blooky = roomState.blookie as CosmosCharacter;
                        switch (choicer.result) {
                           case 0:
                              if (save.data.b.f_state_blookmusic1 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic1 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3a);
                              }
                              break;
                           case 1:
                              if (save.data.b.f_state_blookmusic2 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic2 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3b);
                              }
                              break;
                           case 2:
                              if (save.data.b.f_state_blookmusic3 || save.data.n.state_foundry_blookdate === 2) {
                                 break;
                              }
                              save.data.b.f_state_blookmusic3 = true;
                              if (world.sad_ghost) {
                                 break;
                              }
                              if (blooky) {
                                 blooky.face = 'left';
                                 await timer.pause(850);
                                 await dialogue('auto', ...text.a_foundry.blookmusic3c);
                              }
                              break;
                        }
                        if (
                           blooky &&
                           precount === 2 &&
                           save.data.b.f_state_blookmusic1 &&
                           save.data.b.f_state_blookmusic2 &&
                           save.data.b.f_state_blookmusic3
                        ) {
                           blooky.face = 'left';
                           await timer.pause(850);
                           await dialogue('auto', ...text.a_foundry.blookmusic3d);
                        }
                        blooky && (blooky.face = 'down');
                     }
                  }
               } else if (world.madfish) {
                  await dialogue('auto', ...text.a_foundry.blookmusic2x());
               } else {
                  await dialogue('auto', ...text.a_foundry.blookmusic2());
                  if (choicer.result < 1) {
                     assets.sounds.equip.instance(timer).rate.value = 1.25;
                     save.data.n.state_foundry_blookmusic = 0;
                     (roomState.customs as CosmosInstance).stop();
                     roomState.customs = void 0;
                     roomState.customsAuto = void 0;
                     roomState.customsLevel = void 0;
                     (!world.genocide || save.data.n.plot < 68) && game.music!.gain.modulate(timer, 600, world.level);
                  }
               }
               game.movement = true;
            }
            break;
         }
         case 'blookfridge': {
            if (game.movement) {
               if (player.face === 'up') {
                  game.movement = false;
                  await dialogue('auto', ...text.a_foundry.blookdate2x);
                  if (!world.madfish && save.data.n.state_foundry_blookdate === 1) {
                     roomState.fridge = true;
                  } else {
                     game.movement = true;
                  }
               }
            }
            break;
         }
         case 'blooktouch': {
            if (game.movement && game.menu) {
               switch (game.room) {
                  case 'f_napstablook':
                     if (save.data.n.state_foundry_blookdate < 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blooktouch1());
                        if (world.sad_ghost) {
                           if (choicer.result === 0) {
                              if (save.data.b.f_state_blookbetray) {
                                 await dialogue('auto', ...text.a_foundry.blooksorryY);
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksorry1);
                                 if (choicer.result === 0) {
                                    await dialogue('auto', ...text.a_foundry.blooksorry2);
                                    if (choicer.result === 0) {
                                       save.data.n.state_wastelands_napstablook = 3;
                                       await dialogue('auto', ...text.a_foundry.blooksorry3);
                                    } else {
                                       save.data.b.f_state_blookbetray = true;
                                       await dialogue('auto', ...text.a_foundry.blooksorryX);
                                    }
                                 } else {
                                    save.data.b.f_state_blookbetray = true;
                                    await dialogue('auto', ...text.a_foundry.blooksorryX);
                                 }
                              }
                           }
                        } else {
                           switch (choicer.result) {
                              case 0:
                                 if (save.data.b.f_state_ghosthug) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a2);
                                 } else {
                                    save.data.b.f_state_ghosthug = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a1);
                                 }
                                 break;
                              case 1:
                                 if (save.data.b.f_state_ghostsleep) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b2);
                                 } else {
                                    save.data.b.f_state_ghostsleep = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b1);
                                 }
                                 break;
                              case 2:
                                 switch (save.data.n.state_foundry_swansong) {
                                    case 0:
                                       await dialogue('auto', ...text.a_foundry.blooktouch2c1);
                                       save.data.n.state_foundry_swansong = 1;
                                       break;
                                    case 1:
                                    case 2:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2c2, text.a_foundry.blooktouch2c2x ][
                                             save.data.n.state_foundry_swansong - 1
                                          ]
                                       );
                                       if ((choicer.result as number) === 0) {
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3b);
                                          if (player.position.y < 120 && player.position.x > 200) {
                                             player.walk(timer, 3, { x: 200 }).then(() => {
                                                player.face = 'right';
                                             });
                                          }
                                          const blooky = roomState.blookie as CosmosCharacter;
                                          await blooky.walk(timer, 3, { y: 85 });
                                          await timer.pause(350);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(650);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(1150);
                                          assets.sounds.equip.instance(timer).rate.value = 1.25;
                                          (roomState.customs || game.music).gain.modulate(timer, 0, 0);
                                          timer.pause().then(() => {
                                             (roomState.customs || game.music).gain.modulate(timer, 0, 0);
                                          });
                                          const music = assets.music.secretsong.instance(timer);
                                          music.gain.value /= 4;
                                          music.gain.modulate(timer, 600, music.gain.value * 4);
                                          timer.pause(850).then(() => {
                                             blooky.face = CosmosMath.cardinal(
                                                blooky.position.angleFrom(player.position)
                                             );
                                          });
                                          await new Promise<void>(resolve =>
                                             music.source.addEventListener('ended', () => resolve())
                                          );
                                          await timer.pause(500);
                                          (roomState.customs || game.music).gain.modulate(
                                             timer,
                                             600,
                                             roomState.customsLevel
                                          );
                                          await timer.pause(650);
                                          blooky.face = 'up';
                                          await timer.pause(1650);
                                          assets.sounds.menu.instance(timer).rate.value = 1.25;
                                          await timer.pause(1250);
                                          await blooky.walk(timer, 3, { y: 100 });
                                          blooky.face = CosmosMath.cardinal(blooky.position.angleFrom(player.position));
                                          await timer.pause(850);
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c4);
                                          if ((choicer.result as number) === 0) {
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5a);
                                             save.data.n.state_foundry_swansong = 3;
                                          } else {
                                             if (!save.data.b.oops) {
                                                oops();
                                                await timer.pause(1000);
                                             }
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5b);
                                             save.data.n.state_foundry_swansong = 4;
                                          }
                                       } else {
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3a);
                                          save.data.n.state_foundry_swansong = 2;
                                       }
                                       break;
                                    case 3:
                                    case 4:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2d1, text.a_foundry.blooktouch2d2 ][
                                             save.data.n.state_foundry_swansong - 3
                                          ]
                                       );
                                       break;
                                 }
                                 break;
                           }
                        }
                        game.movement = true;
                     }
                     break;
                  case 'f_blooky':
                     if (save.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blookyard1());
                        game.movement = true;
                     }
                     break;
                  case 'f_snail':
                     if (save.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        if (save.data.n.state_foundry_thundersnail < 1) {
                           await dialogue('auto', ...text.a_foundry.blooksnail1());
                        } else {
                           await dialogue('auto', ...text.a_foundry.blooksnail1i);
                        }
                        if (choicer.result === 0) {
                           const blooky = roomState.blookie as CosmosCharacter;
                           blooky.face = 'up';
                           if (save.data.n.g < 10) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2a);
                           } else {
                              save.data.n.g -= 10;
                           }
                           if (save.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail3);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail3i);
                           }
                           game.music!.gain.modulate(timer, 0, 0);
                           game.menu = false;
                           game.movement = true;
                           const cam = new CosmosObject({
                              position: player.position.value()
                           });
                           game.camera = cam;
                           const anim = new CosmosAnimation({
                              active: true,
                              position: { x: 20, y: 80 },
                              resources: content.iooFThundertron
                           }).on('tick', () => {
                              player.position.x > 340 && (player.position.x = 340);
                           });
                           renderer.attach('main', anim);
                           let index = 0;
                           while (anim.index < 12) {
                              await renderer.on('tick');
                              if (anim.index !== index) {
                                 if ((index = anim.index) < 3) {
                                    assets.sounds.menu.instance(timer);
                                 } else {
                                    assets.sounds.menu.instance(timer).rate.value = 2;
                                 }
                              }
                           }
                           anim.disable();
                           const snail1 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 20),
                              scale: { x: 0, y: 2 },
                              priority: 81,
                              resources: content.iooFTronsnail1
                           });
                           let origin1 = snail1.position.x;
                           const trail1 = new CosmosRectangle({
                              fill: '#05070d',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 77,
                              position: snail1.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#1c2a4f',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#618fde',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail1.position.x - origin1);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail1.position.x - origin1);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail1.position.x - origin1);
                           });
                           const snail2 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 40),
                              scale: { x: 0, y: 2 },
                              priority: 82,
                              resources: content.iooFTronsnail2
                           });
                           let origin2 = snail2.position.x;
                           const trail2 = new CosmosRectangle({
                              fill: '#0d0606',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 78,
                              position: snail2.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#4d2723',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#cacaca',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail2.position.x - origin2);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail2.position.x - origin2);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail2.position.x - origin2);
                           });
                           const snail3 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 60),
                              scale: { x: 0, y: 2 },
                              priority: 83,
                              resources: content.iooFTronsnail3
                           });
                           let origin3 = snail3.position.x;
                           const trail3 = new CosmosRectangle({
                              fill: '#0d0c05',
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 79,
                              position: snail3.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#4d471d',
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: '#d8cf67',
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail3.position.x - origin3);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail3.position.x - origin3);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail3.position.x - origin3);
                           });
                           await timer.pause(500);
                           renderer.attach('main', snail1, snail2, snail3);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           snail1.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail1.anchor.x = 1;
                              snail1.position.x += 9;
                           });
                           await timer.pause(500);
                           snail2.anchor.x = 0;
                           snail2.position.x -= 9;
                           snail2.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail2.anchor.x = 1;
                              snail2.position.x += 9;
                           });
                           await timer.pause(500);
                           snail3.anchor.x = 0;
                           snail3.position.x -= 9;
                           snail3.scale.modulate(timer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail3.anchor.x = 1;
                              snail3.position.x += 9;
                           });
                           await timer.pause(1000);
                           const raceText = new CosmosText({
                              fill: 'white',
                              position: { x: 160, y: 50 },
                              anchor: 0,
                              font: '10px MarsNeedsCunnilingus'
                           });
                           renderer.attach('main', raceText);
                           raceText.content = text.a_foundry.blooksnailX.a;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.b;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.c;
                           await timer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.d;
                           timer.pause(2500).then(() => {
                              raceText.content = '';
                           });
                           assets.sounds.boom.instance(timer).rate.value = 1.25;
                           const muzak = assets.music.thundersnail.instance(timer);
                           renderer.attach('main', trail1, trail2, trail3);
                           snail1.enable();
                           snail1.velocity.x = 0.17;
                           snail2.enable();
                           snail2.velocity.x = 0.18;
                           snail3.enable();
                           snail3.velocity.x = 0.13;
                           // oh no no no no KEKW
                           if (save.data.s.state_foundry_deathroom === 'f_snail') {
                              snail1.velocity.x *= 2;
                              snail2.velocity.x *= 2;
                           }
                           let sad = 0;
                           let hits = 0;
                           let timerr = 0;
                           const interactListener = () => {
                              if (game.movement) {
                                 hits++;
                                 assets.sounds.notify.instance(timer);
                                 if (timerr === 0) {
                                    const notifier = new CosmosAnimation({
                                       anchor: { x: 0, y: 1 },
                                       position: renderer.projection(snail3.position.subtract(9, 14)),
                                       resources: content.ibuNotify
                                    });
                                    renderer.attach('menu', notifier);
                                    const oldspeed = snail3.velocity.x;
                                    snail3.velocity.x = 0;
                                    timer
                                       .when(() => timerr <= 0)
                                       .then(() => {
                                          renderer.detach('menu', notifier);
                                          if (game.movement && sad === 0) {
                                             if (hits < 2) {
                                                snail3.velocity.x = oldspeed + 0.01;
                                             } else if (hits === 2) {
                                                snail3.velocity.x = oldspeed;
                                             } else if (hits > 2) {
                                                snail3.velocity.x = Math.max(oldspeed - 0.01 * hits, 0);
                                             }
                                             hits = 0;
                                          }
                                       });
                                 }
                                 timerr = save.data.b.oops
                                    ? 22 + Math.floor(random.next() * 16)
                                    : 11 + Math.floor(random.next() * 8);
                                 if (hits > 90) {
                                    snail1.velocity.x = 0.4;
                                    snail2.velocity.x = 0.44;
                                 } else if (hits > 70) {
                                    sad = 3;
                                    snail3.alpha.modulate(timer, 300, 1, 0);
                                 } else if (hits > 50) {
                                    sad = 2;
                                    snail3.scale.modulate(timer, 300, { x: 1.1, y: -0.8 }, { x: 1.1, y: -0.8 });
                                 } else if (hits > 30) {
                                    sad = 1;
                                    snail3.anchor.y = -1;
                                    snail3.scale.y = -1;
                                 }
                              }
                           };
                           keys.interactKey.on('down', interactListener);
                           let win1 = false;
                           snail3.on('tick', () => {
                              timerr = Math.max(timerr - 1, 0);
                              if (target - 10 <= snail3.position.x) {
                                 win1 = true;
                              }
                           });
                           const target = anim.position.x + 260;
                           await timer.when(
                              () => target <= Math.max(snail1.position.x, snail2.position.x, snail3.position.x)
                           );
                           const win2 = target <= snail3.position.x;
                           muzak.stop();
                           game.movement = false;
                           assets.sounds.noise.instance(timer);
                           keys.interactKey.off('down', interactListener);
                           snail1.reset();
                           snail1.velocity.x = 0;
                           snail2.reset();
                           snail2.velocity.x = 0;
                           snail3.reset();
                           snail3.velocity.x = 0;
                           raceText.content = text.a_foundry.blooksnailX.e;
                           await timer.pause(2500);
                           renderer.detach('main', raceText);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           origin1 -= 9;
                           snail1.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                           timer.pause(500).then(async () => {
                              snail2.anchor.x = 0;
                              snail2.position.x -= 9;
                              origin2 -= 9;
                              snail2.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              await timer.pause(500);
                              snail3.anchor.x = 0;
                              snail3.position.x -= 9;
                              origin3 -= 9;
                              await snail3.scale.modulate(timer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              renderer.detach('main', snail1, snail2, snail3);
                              assets.sounds.depower.instance(timer);
                              await timer.pause(280);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await timer.pause(420 - 320);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await timer.pause(570 - 420);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await timer.pause(650 - 570);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await timer.pause(720 - 650);
                              renderer.detach('main', anim, trail1, trail2, trail3);
                           });
                           await timer.pause(500);
                           if (sad === 0) {
                              if (win1) {
                                 if (win2) {
                                    save.data.b.f_state_thundersnail_win = true;
                                    await dialogue('auto', ...text.a_foundry.blooksnail4a);
                                    save.data.n.g += 15;
                                 } else {
                                    await dialogue('auto', ...text.a_foundry.blooksnail4b);
                                    save.data.n.g += 30;
                                 }
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksnail4c);
                              }
                           } else if (sad === 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4d);
                           } else if (sad === 2) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4e);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail4f);
                           }
                           save.data.n.state_foundry_thundersnail += 1;
                           cam.position.set(cam.position.clamp(...renderer.region));
                           await cam.position.step(timer, 3, player.position.clamp(...renderer.region));
                           game.camera = player;
                           game.menu = true;
                           game.music!.gain.modulate(timer, 600, world.level);
                        } else {
                           if (save.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b0);
                           }
                        }
                        game.movement = true;
                     }
                     break;
               }
            }
            break;
         }
         case 'echocorner': {
            if (!world.genocide && save.data.n.plot < 46) {
               game.movement = false;
               save.data.n.plot = 46;
               game.music!.gain.value = 0;
               await dialogue('auto', ...text.a_foundry.cornered0);
               roomState.trap = true;
            } else {
               await dialogue('auto', ...text.a_foundry.cornered8());
            }
            break;
         }
         case 'kiddtrip': {
            if (args[0] === 'save') {
               roomState.saved = true;
               game.movement = false;
            } else if (args[0] === 'charge') {
               roomState.charged = true;
               game.movement = false;
            }
            break;
         }
         case 'undyneboss': {
            if (!game.movement || save.data.n.plot > 47) {
               return;
            }
            game.movement = false;
            player.position.x = 500;
            const fishAssets = new CosmosInventory(
               inventories.iocUndyne,
               content.iocUndyneTurn,
               content.iooFAsteroid1,
               content.asStrike
            );
            const undyne = new CosmosCharacter({
               position: { y: 5 },
               key: 'undyne',
               preset: characters.undyneArmor
            });
            undyne.face = 'up';
            const funni = new CosmosSprite({
               anchor: { x: 0 },
               objects: [ undyne ],
               frames: [ content.iooFAsteroid1 ]
            });
            const asteroid = new CosmosObject({
               position: { x: player.position.x, y: player.position.y - 500 },
               objects: [ funni ]
            });
            const time = timer.value;
            funni.on('tick', () => {
               funni.position.y = CosmosMath.wave(((timer.value - time) % 4000) / 4000) * 2;
            });
            const papyrusKiller = world.dead_skeleton;
            const moosicLoader = papyrusKiller ? content.amYouscreweduppal.load() : content.amUndynepreboss.load();
            header('x1').then(() => {
               undyne.face = 'right';
            });
            header('x2').then(() => {
               undyne.face = 'up';
            });
            header('x3').then(() => {
               undyne.face = 'down';
            });
            header('x4').then(() => {
               undyne.face = 'right';
            });
            header('x5').then(() => {
               undyne.face = 'down';
            });
            await Promise.all([ timer.pause(1000), fishAssets.load() ]);
            renderer.attach('main', asteroid);
            const ayo = player.position.clamp(...renderer.region);
            const cam = new CosmosObject({ position: ayo });
            game.camera = cam;
            const OGregion = renderer.region[0].y;
            renderer.region[0].y = asteroid.position.y + 40;
            await cam.position.modulate(timer, 3000, { x: player.position.x, y: asteroid.position.y + 40 });
            await timer.pause(2000);
            await dialogue('auto', ...text.a_foundry.undynefinal1a);
            await Promise.all([ timer.pause(1000), moosicLoader ]);
            if (papyrusKiller) {
               undyne.face = 'right';
               await timer.pause(850);
               await dialogue('auto', ...text.a_foundry.undynefinal2c1);
               assets.sounds.noise.instance(timer);
               undyne.preset = characters.undyneStoic;
               const bossmusic = assets.music.youscreweduppal.instance(timer);
               bossmusic.gain.value /= 4;
               bossmusic.gain.modulate(timer, 500, bossmusic.gain.value * 4);
               await timer.pause(1000);
               for (const [ key, face ] of [
                  [ 'x1', 'down' ],
                  [ 'x2', 'right' ],
                  [ 'x3', 'down' ],
                  [ 'x4', 'right' ],
                  [ 'x5', 'down' ],
                  [ 'x6', 'right' ],
                  [ 'x7', 'left' ],
                  [ 'x8', 'down' ],
                  [ 'x9', 'left' ],
                  [ 'x10', 'up' ],
                  [ 'x11', 'down' ]
               ] as [string, CosmosDirection][]) {
                  header(key).then(() => {
                     undyne.face = face;
                  });
               }
               await dialogue('auto', ...text.a_foundry.undynefinal2c2);
               Promise.race([ events.on('teleport'), timer.when(() => scriptState.battlefall) ]).then(async () => {
                  await bossmusic.gain.modulate(timer, 300, 0);
                  bossmusic.stop();
                  content.amYouscreweduppal.unload();
               });
            } else {
               await dialogue('auto', ...text.a_foundry.undynefinal1b);
               dialogueSession.active = true;
               atlas.switch(null);
               atlas.attach(renderer, 'menu', 'dialoguerBottom');
               const overtop = new CosmosRectangle({
                  alpha: 0,
                  fill: 'white',
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', overtop);
               const bpm = 180;
               const beatsPer = 4;
               const measureTime = (1 / (bpm / (60 * beatsPer))) * 1000;
               const bossmusic = assets.music.undynepreboss.instance(timer);
               Promise.race([ events.on('teleport'), timer.when(() => scriptState.battlefall) ]).then(async () => {
                  await bossmusic.gain.modulate(timer, 300, 0);
                  bossmusic.stop();
                  content.amUndynepreboss.unload();
               });
               renderer.layers.below.modifiers = [];
               renderer.layers.above.modifiers = [];
               const OG2 = renderer.region.slice() as CosmosRegion;
               const halv = cam.position.clamp(...renderer.region);
               const allObjects = [
                  cam,
                  ...renderer.layers.below.objects,
                  ...renderer.layers.main.objects,
                  ...renderer.layers.above.objects
               ];
               renderer.region = [
                  { x: -Infinity, y: -Infinity },
                  { x: Infinity, y: Infinity }
               ];
               asteroid.position.y += 30;
               for (const object of allObjects) {
                  Object.assign(object.position, object.position.subtract(halv));
               }
               renderer.zoom.value = 1.6;
               renderer.rotation.value = 15;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1c);
               await timer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = -20;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1d);
               await timer.pause(measureTime);
               renderer.zoom.value = 2.0;
               renderer.rotation.value = 25;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0);
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1e);
               await timer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = 0;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(timer, 250, 0).then(async () => {
                  await overtop.alpha.modulate(timer, measureTime - 250, 1);
                  await timer.pause(measureTime / 2);
                  await overtop.alpha.modulate(timer, measureTime - 250, 0);
                  renderer.detach('menu', overtop);
               });
               assets.sounds.strike.instance(timer);
               typer.text(...text.a_foundry.undynefinal1f);
               await timer.pause(measureTime);
               renderer.zoom.value = 1;
               for (const object of allObjects) {
                  Object.assign(object.position, object.position.add(halv));
               }
               asteroid.position.y -= 30;
               renderer.region = OG2;
               atlas.detach(renderer, 'menu', 'dialoguerBottom');
               typer.text('');
               dialogueSession.active = false;
               const turner = new CosmosAnimation({
                  position: undyne.position.value(),
                  anchor: { x: 0, y: 1 },
                  resources: content.iocUndyneTurn
               });
               funni.objects[0] = turner;
               timer
                  .when(() => turner.index === 8)
                  .then(() => {
                     turner.disable();
                  });
               await timer.pause(measureTime * 2);
               turner.enable();
               await timer.pause(measureTime * 2);
               funni.objects[0] = undyne;
               undyne.preset = characters.undyne;
               undyne.face = 'down';
               await dialogue('auto', ...text.a_foundry.undynefinal1g);
               if (world.trueKills > 0) {
                  await dialogue('auto', ...text.a_foundry.undynefinal2b1);
                  const torielKiller = save.data.n.state_wastelands_toriel === 2;
                  const outlandsKiller = world.trueKills === save.data.n.kills_wastelands + (torielKiller ? 1 : 0);
                  if (outlandsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b1b);
                  } else {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b1a);
                  }
                  await dialogue('auto', ...text.a_foundry.undynefinal2b2());
                  const dogeKiller = save.data.n.state_foundry_doge === 1;
                  const muffetKiller = save.data.n.state_foundry_muffet === 1;
                  const eliteKiller = dogeKiller && muffetKiller;
                  const dogsKiller = save.data.n.state_starton_dogs === 2;
                  const greatdogKiller = save.data.n.state_starton_greatdog === 2;
                  const lesserdogKiller = save.data.n.state_starton_lesserdog === 2;
                  const doggoKiller = save.data.n.state_starton_doggo === 2;
                  const canineKiller = dogsKiller && greatdogKiller && lesserdogKiller && doggoKiller;
                  const dummyKiller = save.data.n.state_foundry_maddummy === 1;
                  if (eliteKiller && canineKiller) {
                     if (world.trueKills - 7 > 6) {
                        await dialogue('auto', ...text.a_foundry.undynefinal2b2a);
                     } else {
                        await dialogue('auto', ...text.a_foundry.undynefinal2b2b);
                     }
                  } else if (eliteKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2c);
                  } else if (canineKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2d);
                  } else if (dummyKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2e);
                  } else if (muffetKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2f);
                  } else if (dogeKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2g);
                  } else if (greatdogKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2h);
                  } else if (dogsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2i);
                  } else if (lesserdogKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2j);
                  } else if (doggoKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2k);
                  } else if (torielKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2l);
                  } else if (save.data.n.kills_foundry === 9) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2m);
                  } else if (save.data.n.kills_starton === 12) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2n);
                  } else if (save.data.n.kills_foundry > 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2o);
                  } else if (save.data.n.kills_starton > 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2p);
                  } else if (
                     save.data.n.kills_foundry === 1 &&
                     save.data.n.kills_starton === 1 &&
                     save.data.n.kills_wastelands === 1
                  ) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2q);
                  } else if (outlandsKiller) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2r());
                  } else if (world.trueKills === 1) {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2s);
                  } else {
                     await dialogue('auto', ...text.a_foundry.undynefinal2b2t);
                  }
                  await dialogue('auto', ...text.a_foundry.undynefinal2b3);
               } else {
                  await dialogue('auto', ...text.a_foundry.undynefinal2a());
               }
            }
            save.data.n.plot = 47.1;
            await cam.position.modulate(timer, 3000, ayo);
            renderer.detach('main', asteroid);
            fishAssets.unload();
            renderer.region[0].y = OGregion;
            game.camera = player;
            if (!save.data.b.oops) {
               await dialogue('dialoguerTop', ...text.a_foundry.truetext.preundyne);
            }
            game.movement = true;
            break;
         }
         case 'undynefight': {
            if (args[0] === 'truetp') {
               scriptState.truetp = true;
               scriptState.truetpPromise = teleport('f_exit', 'right', 20, 100, world);
               return;
            }
            const eggo = new CosmosInventory(
               inventories.battleAssets,
               groups.undyne.assets!,
               opponents.undyne.assets,
               inventories.iocUndyne,
               content.asStomp,
               content.amUndynefast
            ).load();
            if (!game.movement || save.data.n.plot > 47.1) {
               return;
            }
            game.movement = false;
            await dialogue('dialoguerTop', ...text.a_foundry.undynefinal3());
            (states.scripts.undyneboss ??= {}).battlefall = true;
            dialogue('dialoguerTop', ...text.a_foundry.undynefinal3x);
            await header('x1');
            typer.text('');
            const diver = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: player.position.subtract(0, 200),
               resources: content.iocUndyneDive
            }).on('tick', async () => {
               diver.position.y += 240 / 30;
               await timer.pause();
               const echo = shadow(diver, echo => (echo.alpha.value /= 2) < 0.00001, {
                  alpha: 0.5,
                  priority: -100,
                  position: diver.position
               });
               renderer.attach('main', echo.object);
               echo.promise.then(() => {
                  renderer.detach('main', echo.object);
               });
            });
            renderer.attach('main', diver);
            await timer.when(() => diver.position.y > player.position.y - 30);
            renderer.detach('main', diver);
            if (!save.data.b.oops) {
               save.data.b.f_state_oopsprimer = true;
            }
            await Promise.all([ eggo, battler.encounter(player, groups.undyne, false).then(() => (game.menu = false)) ]);
            if (save.data.n.plot < 48) {
               save.data.n.plot = 47.2;
               save.data.s.chasecheckpoint = `${game.room}:${player.face}:${player.position.x}:${player.position.y}`;
               game.music = assets.music.undynefast.instance(timer);
               game.music.gain.value = 0;
               game.music.gain.modulate(timer, 0, 0).then(() => {
                  game.music!.gain.modulate(timer, 1000, assets.music.undynefast.gain);
               });
               game.movement = true;
               madfish.metadata.firstfight = true;
               madfish.metadata.reposition = true;
               renderer.attach('main', madfish);
            } else {
               game.movement = true;
               game.menu = true;
            }
            break;
         }
         case 'viewchat': {
            scriptState.ticks ??= 0;
            if (save.data.n.plot_kidd < 4 && !save.data.b.oops) {
               const dist = Math.abs(500 - player.position.x);
               if (dist < 120 && player.face === 'up' && player.position.y < 110) {
                  if (scriptState.ticks++ === 30 * 3) {
                     if (save.data.n.plot_kidd < 3.4) {
                        dialogue('dialoguerBottom', ...text.a_foundry.truetext.view1, ...text.a_foundry.truetext.view2);
                        save.data.n.plot_kidd = 3.4;
                     }
                  }
               } else {
                  scriptState.ticks = 0;
               }
            }
            break;
         }
         /*
               case 'temmietourguide': {
                  const TTG = extras.instance('main', 'temmietourguide')!;
                  await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmietourguide);
                  if (choicer.result === 0) {
                     await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmietourguide1);
                     const amon = TTG.object.objects[0] as XAnimation;
                     amon.use(content.iocTemmieLeft);
                  } else {
                     await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmietourguide2);
                  }
                  break;
               }
               */
         case 'temmiepat': {
            game.movement = false;
            const TTG = instance('main', 'f_temmie7')!;
            if (save.data.n.state_foundry_tempet === 0) {
               await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat1);
               if (choicer.result === 0) {
                  await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat2a);
                  save.data.n.state_foundry_tempet = 1;
               } else {
                  if (!save.data.b.oops) {
                     oops();
                     await timer.pause(1000);
                  }
                  await TTG.talk('a', talkFilter(), 'auto', ...text.a_foundry.temmiepat2b);
                  save.data.n.state_foundry_tempet = 2;
               }
            } else {
               await TTG.talk(
                  'a',
                  talkFilter(),
                  'auto',
                  ...[ text.a_foundry.temmiepat3a, text.a_foundry.temmiepat3b ][save.data.n.state_foundry_tempet - 1]
               );
            }
            game.movement = true;
            break;
         }
         case 'mirror': {
            if (player.face === 'down') {
               if (save.data.b.f_state_temstatue) {
                  await dialogue('auto', ...text.a_foundry.temstatueAftuh);
               } else {
                  save.data.b.f_state_temstatue = true;
                  assets.sounds.switch.instance(timer);
                  await dialogue('auto', ...text.a_foundry.temstatue);
               }
            } else {
               await dialogue('auto', ...text.a_foundry.temstatueNormuh);
            }
            break;
         }
         case 'mushroomdance': {
            const mushguy = instance('main', 'f_mushroomdance');
            if (mushguy) {
               game.movement = false;
               game.music!.gain.value = 0;
               const anim = mushguy.object.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation;
               anim.enable();
               await timer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               atlas.attach(renderer, 'menu', 'dialoguerTop');
               typer.text(...text.a_foundry.mushroomdance1);
               let x = 0;
               let end = false;
               const musiiiiiii = assets.music.mushroomdance.instance(timer);
               const ticker = () => {
                  anim.position.x = Math.sin(++x / 6) * 2;
                  if (end && Math.abs(anim.position.x - 0) < 0.5) {
                     anim.off('tick', ticker);
                  }
               };
               anim.on('tick', ticker);
               anim.reset().use(content.ionFMushroomdance2).enable();
               await timer.pause(4000);
               await timer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               end = true;
               musiiiiiii.stop();
               atlas.detach(renderer, 'menu', 'dialoguerTop');
               anim.reset().use(content.ionFMushroomdance3).enable();
               await timer.when(() => anim.index === anim.frames.length - 1);
               anim.disable();
               await timer.pause(1000);
               await dialogue('auto', ...text.a_foundry.mushroomdance2());
               anim.reverse = true;
               anim.enable();
               await timer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.reset().use(content.ionFMushroomdance1).enable();
               anim.index = anim.frames.length - 1;
               await timer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.disable();
               anim.reverse = false;
               if (world.trueKills > 9 || world.population === 0) {
                  save.data.b.f_state_mushroomdanceGeno = true;
               } else {
                  save.data.b.f_state_mushroomdance = true;
               }
               game.movement = true;
               game.music!.gain.value = world.level;
            }
            break;
         }
         case 'shop': {
            if (game.movement) {
               switch (args[0]) {
                  case 'tortoise':
                     if (world.madfish) {
                        game.movement = false;
                        atlas.switch('dialoguerBottom');
                        typer.text(...text.a_foundry.noTortoise);
                        await timer.when(() => battler.active);
                        player.position.set(520, 105);
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tortoise, 'down', 520, 105);
                     }
                     break;
                  case 'tem':
                     if (world.madfish) {
                        game.movement = false;
                        atlas.switch('dialoguerBottom');
                        typer.text(...text.a_foundry.noTem());
                        await timer.when(() => battler.active);
                        player.position.set(320, 170);
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tem, 'down', 320, 170);
                     }
                     break;
               }
            }
            break;
         }
         case 'fallenfish': {
            if (player.face === 'left') {
               if (save.data.b.water) {
                  game.movement = false;
                  roomState.water = true;
               } else {
                  await dialogue('auto', ...text.a_foundry.fallenfish);
               }
            }
            break;
         }
         case 'fallenfish2': {
            if (player.face === 'left') {
               await dialogue('auto', ...text.a_foundry.fallenfish2);
            }
            break;
         }
         case 'watercooler': {
            if (save.data.b.water) {
               await dialogue('auto', ...text.a_foundry.watercooler3);
            } else {
               await dialogue('auto', ...text.a_foundry.watercooler1);
               if (choicer.result === 0) {
                  save.data.b.water = true;
                  assets.sounds.equip.instance(timer);
                  await dialogue('auto', ...text.a_foundry.watercooler2a);
               } else {
                  await dialogue('auto', ...text.a_foundry.watercooler2b);
               }
            }
            break;
         }
         case 'waterpour': {
            player.alpha.value = 0;
            player.face = 'left';
            const spiller = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: player.position,
               resources: content.iocFriskLeftWaterPour
            });
            renderer.attach('main', spiller);
            await timer.when(() => spiller.index === 8);
            spiller.disable();
            save.data.b.water = false;
            await timer.pause(650);
            renderer.detach('main', spiller);
            player.alpha.value = 1;
            break;
         }
         case 'jumpsuit_item': {
            if (!save.data.b.item_jumpsuit) {
               if (save.storage.inventory.size < 8) {
                  save.data.b.item_jumpsuit = true;
                  save.storage.inventory.add('flight_suit');
                  assets.sounds.equip.instance(timer);
                  instance('main', 'jumpsuit_item')?.destroy();
                  await dialogue('auto', ...text.a_foundry.jumpsuit1);
               } else {
                  await dialogue('auto', ...text.a_foundry.jumpsuit2);
               }
            }
            break;
         }
         case 'boots': {
            if (!save.data.b.item_boots) {
               if (save.storage.inventory.size < 8) {
                  save.data.b.item_boots = true;
                  save.storage.inventory.add('boots');
                  assets.sounds.equip.instance(timer);
                  instance('main', 'f_booties')?.destroy();
                  await dialogue('auto', ...text.a_foundry.boots1);
               } else {
                  await dialogue('auto', ...text.a_foundry.boots2);
               }
            }
            break;
         }
         case 'exit': {
            game.movement = false;
            if (save.data.n.plot < 48) {
               if (!save.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.undyne2());
                  roomState.charabeg = true;
               }
               await dialogue('auto', ...text.a_foundry.finalpre);
            } else {
               await teleport('a_start', 'right', 20, 280, world);
               game.movement = true;
               break;
            }
            if (choicer.result === (save.data.n.plot < 48 ? 1 : 0)) {
               if (save.data.n.plot < 48) {
                  const x = !save.data.b.oops;
                  oops();
                  await teleport('a_start', 'right', 20, 280, world);
                  if (x) {
                     teleporter.movement = false;
                     game.movement = false;
                     await timer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.truetext.undyne3);
                     game.movement = true;
                     game.menu = true;
                  }
                  save.data.n.exp += 500;
               }
            } else {
               player.position.x -= 3;
               player.face = 'left';
            }
            game.movement = true;
            break;
         }
         case 'kitchencall': {
            if (!save.data.b.kitchencall) {
               save.data.b.kitchencall = true;
               if (!world.genocide && save.data.n.state_starton_papyrus < 1 && 1 <= save.data.n.plot_date) {
                  assets.sounds.phone.instance(timer);
                  await dialogue('auto', ...text.a_foundry.kitchencall());
               }
            }
            break;
         }
         case 'unddate': {
            if (args[0] === 'sit') {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate14);
               if (choicer.result === 0) {
                  roomState.sittah = true;
               } else {
                  game.movement = true;
               }
               break;
            } else if (args[0] === 'fish') {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate13);
               if (choicer.result === 0) {
                  if (roomState.snacked) {
                     await dialogue('auto', ...text.a_foundry.unddate13a5);
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a1);
                     roomState.snack = true;
                     await timer.when(() => roomState.snacked);
                  }
               } else {
                  await dialogue(
                     'auto',
                     ...CosmosUtils.provide(
                        [ text.a_foundry.unddate13b, text.a_foundry.unddate13c, text.a_foundry.unddate13d ][
                           choicer.result - 1
                        ]
                     )
                  );
               }
               game.movement = true;
               break;
            } else if (args[0] === 'snack') {
               if (game.movement) {
                  if (save.storage.inventory.size < 8) {
                     assets.sounds.equip.instance(timer);
                     save.storage.inventory.add('snack');
                     instance('main', 'snacc')?.destroy();
                     await dialogue('auto', ...text.a_foundry.unddate13a4b);
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a4a);
                  }
               }
               break;
            }
            if (roomState.entered) {
               break;
            }
            game.movement = false;
            if (save.data.n.plot_date < 1.2) {
               await dialogue('auto', ...text.a_foundry.unddate0());
               save.data.n.plot_date = 1.2;
            } else {
               await dialogue('auto', ...text.a_foundry.unddate0x());
            }
            if (world.trueKills === 0 && save.data.n.state_foundry_undyne === 0) {
               if (choicer.result === 0) {
                  roomState.entered = true;
                  await dialogue('auto', ...text.a_foundry.unddate1a);
               } else {
                  await dialogue('auto', ...text.a_foundry.unddate1b());
                  game.movement = true;
                  break;
               }
            } else {
               game.movement = true;
               break;
            }
            const papy = roomState.papdater as CosmosCharacter;
            papy.metadata.override = true;
            papy.face = 'up';
            {
               if (player.position.y > papy.position.y + 10) {
                  if (Math.abs(player.position.x - papy.position.x) < 20) {
                     await player.walk(timer, 3, {
                        x: papy.position.x + (player.position.x < papy.position.x ? -20 : 20)
                     });
                  }
                  await player.walk(timer, 3, { y: papy.position.y + 10 });
               }
               await player.walk(timer, 3, { x: papy.position.x });
               if (player.position.y < papy.position.y + 10) {
                  await player.walk(timer, 3, { y: papy.position.y + 10 });
               }
               player.position.set(papy.position.add(0, 10));
               player.face = 'up';
            }
            await timer.pause(1400);
            const handout = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusPresent2
            });
            renderer.detach('main', papy);
            renderer.attach('main', handout);
            await dialogue('auto', ...text.a_foundry.unddate2a);
            handout.enable();
            await timer.when(() => handout.index === 4);
            handout.disable();
            await timer.pause(1400);
            await dialogue('auto', ...text.a_foundry.unddate2b);
            while (handout.index > 0) {
               handout.index--;
               await timer.pause(250);
            }
            renderer.detach('main', handout);
            renderer.attach('main', papy);
            await timer.pause(1400);
            const knocker = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusKnock
            });
            renderer.detach('main', papy);
            renderer.attach('main', knocker);
            assets.sounds.knock.instance(timer);
            await timer.pause(1000);
            renderer.detach('main', knocker);
            renderer.attach('main', papy);
            await timer.pause(600);
            const trueMusic = roomState.trueMusic as CosmosInstance;
            await trueMusic.gain.modulate(timer, 300, 0);
            await timer.pause(2000);
            const undyne = character('undyneDate', characters.undyneDate, { x: 160, y: 95 }, 'down');
            const door = instance('main', 'f_undyne_door')!.object;
            const anim = door.objects[0] as CosmosAnimation;
            anim.enable();
            await timer.when(() => anim.index === 3);
            assets.sounds.electrodoor.instance(timer);
            await timer.when(() => anim.index === 7);
            anim.disable();
            await timer.pause(1200);
            await dialogue('auto', ...text.a_foundry.unddate3);
            await papy.walk(timer, 3, papy.position.subtract(30, 0));
            papy.face = 'right';
            await dialogue('auto', ...text.a_foundry.unddate4);
            undyne.face = 'up';
            undyne.alpha.modulate(timer, 300, 0);
            await papy.walk(timer, 3, papy.position.add(30, 0));
            await papy.walk(timer, 3, door.position);
            papy.metadata.barrier = false;
            papy.alpha.modulate(timer, 300, 0);
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = false;
            barrier.metadata.trigger = true;
            barrier.metadata.name = 'teleport';
            barrier.metadata.args = [ 'f_kitchen', 'up', '160', '230' ];
            save.data.n.plot_date = 1.3;
            events.on('teleport').then(() => {
               renderer.detach('main', undyne);
            });
            game.movement = true;
            break;
         }
         case 'undynehouse': {
            if (game.movement) {
               if (2 <= save.data.n.plot_date) {
                  await dialogue('auto', ...text.a_foundry.undynehouse2);
               } else if (!roomState.papdater) {
                  await dialogue('auto', ...text.a_foundry.undynehouse1);
               }
            }
            break;
         }
         case 'npc86': {
            const inst = instance('main', 'f_npc86');
            if (inst) {
               const talk = (...lines: string[]) => inst.talk('a', talkFilter(), 'auto', ...lines);
               if (save.data.n.state_foundry_npc86 === 0) {
                  await talk(...text.a_foundry.npc86a());
                  if (choicer.result === 0) {
                     await talk(...text.a_foundry.npc86b);
                     save.data.n.state_foundry_npc86 = (choicer.result + 2) as 2 | 3 | 4 | 5;
                  } else {
                     save.data.n.state_foundry_npc86 = 1;
                  }
                  await talk(...text.a_foundry.npc86c);
               } else if (save.data.n.state_foundry_npc86_mood === 0) {
                  await talk(...text.a_foundry.npc86d());
                  save.data.n.state_foundry_npc86_mood = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86e());
               } else if (save.data.n.state_foundry_npc86_feelings === 0) {
                  await talk(...text.a_foundry.npc86f());
                  save.data.n.state_foundry_npc86_feelings = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86g());
               } else {
                  await talk(...text.a_foundry.npc86h());
                  save.data.b.f_state_done86 = true;
               }
            }
            break;
         }
         case 'sleeper': {
            if (instance('main', 'sleepersans')) {
               world.madfish || (await dialogue('auto', ...text.a_foundry.sleepersans));
            } else {
               await dialogue('auto', ...text.a_foundry.sleeper);
            }
            break;
         }
         case 'hapstadoor': {
            if (!save.data.b.f_state_hapstadoor) {
               if (!save.data.b.item_mystery_key) {
                  await dialogue('auto', ...text.a_foundry.hapstadoor1);
                  player.y += 3;
                  player.face = 'down';
                  break;
               } else {
                  save.data.b.f_state_hapstadoor = true;
                  await dialogue('auto', ...text.a_foundry.hapstadoor2);
               }
            }
            await teleport('f_hapstablook', 'up', 170, 230, world);
            break;
         }
         case 'napcomputer': {
            if (!world.genocide && save.data.n.state_foundry_blookdate !== 2) {
               break;
            }
            game.movement = false;
            for (const object of instance('main', 'f_blookpc')!.object.objects) {
               if (object instanceof CosmosAnimation) {
                  object.index = 1;
                  assets.sounds.select.instance(timer).rate.value = 0.6;
                  await dialogue('auto', ...text.a_foundry.napcomputer1());
                  if (choicer.result === 0) {
                     const p1 = [ 100, 80, 35, 25, 20, 5 ];
                     const p2 = [ 100, 40 ];
                     const napster = new CosmosObject({
                        fill: 'white',
                        stroke: 'transparent',
                        font: '8px DeterminationSans',
                        objects: [
                           new CosmosSprite({ scale: 0.5, frames: [ content.ieNapster ] }),
                           ...CosmosUtils.populate(8, div => {
                              const index = div % 6;
                              const downloaded = div < 6;
                              const textsource = downloaded ? text.a_foundry.napcomputer3 : text.a_foundry.napcomputer4;
                              return new CosmosText({
                                 anchor: { y: 0 },
                                 position: { x: 40, y: ((downloaded ? 101 : 371) + index * 25) / 2 },
                                 content: CosmosUtils.provide(textsource.a[index]),
                                 objects: [
                                    new CosmosText({
                                       anchor: { y: 0 },
                                       position: { x: 247 / 2 },
                                       content: textsource.b[index],
                                       objects: [
                                          new CosmosRectangle({
                                             anchor: { y: 0 },
                                             position: { x: 178 / 2 },
                                             size: { y: 9, x: ((downloaded ? p1 : p2)[index] / 100) * 35 },
                                             fill: `rgba(${downloaded ? '0, 86, 255' : '255, 229, 0'}, ${105 / 255})`
                                          })
                                       ]
                                    })
                                 ]
                              });
                           })
                        ]
                     });
                     renderer.attach('menu', napster);
                     object.index = 0;
                     await timer.pause(500);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', napster);
                  } else {
                     object.index = 0;
                     await dialogue('auto', ...text.a_foundry.napcomputer2);
                  }
                  break;
               }
            }
            game.movement = true;
            break;
         }
      }
   }
};

export const shops = {
   tortoise: new OutertaleShop({
      persist: true,
      background: new CosmosSprite({ frames: [ content.istBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.tortoise.vars.sell) {
                  await shopper.text(...text.s_tortoise.sell2());
               } else {
                  shops.tortoise.vars.sell = true;
                  await shopper.text(...text.s_tortoise.sell1());
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.s_tortoise.exit());
               const music = shops.tortoise.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (
                  shopper.listIndex < 2 &&
                  save.data.b[`item_${[ 'padd', 'goggles' ][shopper.listIndex] as 'padd' | 'goggles'}`]
               ) {
                  typer.text(text.s_tortoise.itemUnavailable);
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.s_tortoise.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: (() => {
         const arm = new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.istArm ] });
         const head = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.istKeeper });
         const spr = new CosmosSprite({
            position: { x: 160, y: 120 },
            metadata: { tickx: 0 },
            objects: [ arm, new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.istBody ] }), head ]
         }).on('tick', function () {
            if (typer.mode === 'read') {
               const x = [ 0, 2, 4, 2 ][Math.floor(this.metadata.tickx / 3)];
               arm.position.set(x, x / 2);
               head.position.set(0, x);
               if (++this.metadata.tickx === 12) {
                  this.metadata.tickx = 0;
               }
            }
         });
         return spr;
      })(),
      music: assets.music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.s_tortoise.menu;
         } else if (shopper.index === 0) {
            return text.s_tortoise.item();
         } else {
            return text.s_tortoise.talk();
         }
      },
      preset (index) {
         (shops.tortoise.keeper.objects[2] as CosmosAnimation).index = index;
      },
      price () {
         return [ 55, 30, 25, 25 ][shopper.listIndex];
      },
      prompt () {
         return text.s_tortoise.itemPurchasePrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (save.storage.inventory.size < 8) {
               const price = CosmosUtils.provide(shops.tortoise.price);
               if (save.data.n.g < price) {
                  shops.tortoise.vars.purchase = 3;
               } else {
                  shops.tortoise.vars.purchase = 1;
                  save.data.n.g -= price;
                  success = true;
               }
            } else {
               shops.tortoise.vars.purchase = 4;
            }
         } else {
            shops.tortoise.vars.purchase = 2;
         }
         if (success) {
            assets.sounds.purchase.instance(timer);
            const item = [ 'padd', 'goggles', 'tea', 'sap' ][shopper.listIndex];
            save.storage.inventory.add(item);
            if (item === 'padd' || item === 'goggles') {
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
         if (shops.tortoise.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tortoise.vars.purchase as number;
            shops.tortoise.vars.purchase = 0;
            return text.s_tortoise.itemPurchase()[purchaseValue - 1];
         } else if (atlas.target === 'shop') {
            if (world.genocide || (world.population === 0 && !world.bullied)) {
               return text.s_tortoise.menuPrompt3();
            } else if (shops.tortoise.vars.idle) {
               return text.s_tortoise.menuPrompt2;
            } else {
               shops.tortoise.vars.idle = true;
               return text.s_tortoise.menuPrompt1;
            }
         } else if (shopper.index === 0) {
            return text.s_tortoise.itemPrompt();
         } else {
            return text.s_tortoise.talkPrompt();
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 0 && save.data.b.item_padd) {
                  return null;
               }
               if (shopper.listIndex === 1 && save.data.b.item_goggles) {
                  return null;
               }
               const info = items.of([ 'padd', 'goggles', 'tea', 'sap' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.s_tortoise.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   tem: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.istcBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (world.population === 0) {
                  if (shops.tem.vars.sell || save.data.b.steal_tem) {
                     await shopper.text(...text.s_tem.sell2);
                  } else {
                     shops.tem.vars.sell = true;
                     if (world.population === 0) {
                        save.data.n.g += 758;
                        save.data.b.steal_tem = true;
                     }
                     await shopper.text(...text.s_tem.sell1);
                  }
               } else {
                  atlas.switch('shopList');
               }
            } else if (shopper.index === 3) {
               atlas.switch('shopText');
               await typer.text(...text.s_tem.exit());
               const music = shops.tem.music!.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(timer, 300, 0),
                  music.gain.modulate(timer, 300, 0).then(() => {
                     music.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(timer, 300, 1);
            } else if (world.population === 0 && shopper.index === 2) {
               await shopper.text(...text.s_tem.note);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.index === 1) {
               if (shopper.listIndex === CosmosUtils.provide(shops.tem.size) - 1) {
                  atlas.switch('shop');
               } else {
                  const item = save.storage.inventory.contents[shopper.listIndex];
                  if ((save.data.b.colleg ? 'sell2' : 'sell1') in items.of(item)) {
                     if (save.data.n.specsell === 0) {
                        save.data.n.specsell = 7;
                        typer.variables.x = items.of(item).text.battle.name;
                        atlas.switch('shopText');
                        await typer.text(...text.s_tem.sellStory1());
                        shops.tem.vars.attempt = 1;
                     }
                     atlas.switch('shopPurchase');
                  } else {
                     typer.text(text.s_tem.itemRestricted);
                  }
               }
            } else if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (shopper.listIndex === 3 && (world.population === 0 || save.data.b.item_temyarmor)) {
                  typer.text(text.s_tem.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.s_tem.talkText[shopper.listIndex]);
            }
         }
      },
      keeper: (() => {
         let ox = 0;
         let crfx = 0;
         let timerr = 0;
         let siner = 0;
         let random3: CosmosValueRandom;
         const body = { x: 0, y: 0 };
         const face = { x: 0, y: 0 };
         const offset1 = { x: 0, y: 0 };
         const offset2 = { x: 0, y: 0 };
         const offset3 = { x: 0, y: 0 };

         const bodyS = new CosmosSprite({ frames: [ content.istcBody ] });
         const eyebrowsS = new CosmosSprite({ frames: [ content.istcEyebrows ] });
         const eyesS = new CosmosSprite({ active: true });
         const eyesA = new CosmosAnimation({ active: true });
         const mouthS = new CosmosSprite({ active: true });
         const mouthA = new CosmosAnimation({ active: true });
         const sweatA = new CosmosSprite({ frames: [ content.istcSweat ] });
         const hatS = new CosmosSprite({ frames: [ content.istcHat ], alpha: 0 });
         const boxS = new CosmosSprite({ frames: [ content.istcBox ] });
         const coffeeA = new CosmosAnimation({ resources: content.istcCoffee });

         function display (sprite: CosmosSprite, index: number, x: number, y: number, alpha = 1) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x, y);
            sprite.alpha.value = alpha;
         }

         return new CosmosSprite({
            objects: [
               bodyS,
               eyebrowsS,
               new CosmosObject({ objects: [ eyesS, eyesA ] }),
               new CosmosObject({ objects: [ mouthS, mouthA ] }),
               sweatA,
               hatS,
               boxS,
               coffeeA
            ]
         }).on('tick', function () {
            random3 ??= random.clone();
            eyebrowsS.alpha.value = 0;
            eyesS.alpha.value = 0;
            eyesA.alpha.value = 0;
            mouthS.alpha.value = 0;
            mouthA.alpha.value = 0;
            sweatA.alpha.value = 0;
            const fx = this.metadata.face as number;
            if (fx !== crfx) {
               timerr = 0;
               face.x = 0;
               face.y = 0;
               body.x = 0;
               body.y = 0;
               crfx = fx;
            }
            siner++;
            display(coffeeA, Math.floor(siner / 8), 178 + ox, Math.floor(62 + Math.sin(siner / 4) * 1.5));
            display(bodyS, 0, 99 + body.x + ox, 1 + body.y);
            switch (fx) {
               case 0:
                  eyesA.use(content.istcEyes1);
                  mouthA.use(content.istcMouth1);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesA, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  timerr++;
                  if ((timerr > 90 && timerr < 110) || (timerr > 130 && timerr < 150)) {
                     face.x += Math.sin(timerr / 10) * 0.8;
                  } else if (timerr > 190 && timerr < 230) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  }
                  timerr > 290 && timerr < 310 && (face.y += Math.sin(timerr / 10) * 0.8);
                  timerr > 326 && timerr < 345 && (face.y += Math.sin(timerr / 10) * 1.5);
                  if (timerr > 390 && timerr < 430) {
                     face.y *= 0.9;
                     face.y <= 0.5 && (face.x = 0);
                  } else if (timerr == 460) {
                     timerr = 0;
                  }
                  break;
               case 1:
                  eyesS.frames = [ content.istcEyes2 ];
                  mouthA.use(content.istcMouth1);
                  display(
                     eyebrowsS,
                     0,
                     Math.floor(138 + offset1.x),
                     Math.floor(32 + offset1.y + face.y / 2 - Math.sin(timerr / 2))
                  );
                  display(
                     eyesS,
                     0,
                     Math.floor(135 + offset2.x + face.x + (random3.next() * 0.8 - random3.next() * 0.8)),
                     Math.floor(38 + offset2.y + face.y + (random3.next() * 0.8 - random3.next() * 0.8))
                  );
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  break;
               case 2:
                  eyesS.frames = [ content.istcEyes3 ];
                  mouthA.use(content.istcMouth2);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesS, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(
                     mouthA,
                     Math.floor(siner / 3),
                     Math.floor(141 + offset3.x + face.x),
                     Math.floor(48 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  if ((timerr > 45 && timerr < 55) || (timerr > 65 && timerr < 75)) {
                     face.x += Math.sin(timerr / 5) * 0.8;
                  } else if (timerr > 95 && timerr < 115) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  } else if (timerr == 140) {
                     timerr = 0;
                  }
                  break;
               case 3:
                  eyesS.frames = [ content.istcEyes4 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  face.x = 2;
                  face.y = -2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(146 + offset3.x + face.x),
                     Math.floor(42 + offset3.y + face.y)
                  );
                  break;
               case 4:
                  eyesS.frames = [ content.istcEyes5 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  face.y = Math.sin(timerr / 5) * 1.5;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner / 1.5) * 1.5),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  break;
               case 5:
                  eyesS.frames = [ content.istcEyes6 ];
                  mouthS.frames = [ content.istcMouth3 ];
                  body.x = random3.next() - random3.next();
                  body.y = random3.next() - random3.next();
                  face.y = Math.sin(timerr / 3) * 2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(31 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner) * 2),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 2) * 2, 1 + Math.sin(siner / 2));
                  break;
               case 6:
                  mouthA.use(content.istcMouth4);
                  display(
                     mouthA,
                     Math.floor(siner / 2),
                     Math.floor(139 + offset2.x + face.x) + ox,
                     Math.floor(25 + offset2.y + face.y)
                  );
                  break;
            }
            fx > 0 && timerr++;
            display(boxS, 0, 80 + ox, 68);
            save.data.b.colleg && display(hatS, 0, 99 + body.x + 37 + ox, 1 + body.y);
            ox = Math.max(ox + (this.metadata.colleg ? 3 : -3), 0);
         });
      })(),
      music: assets.music.temShop,
      options () {
         if (atlas.target === 'shop') {
            return text.s_tem.menu();
         } else if (shopper.index === 0) {
            return text.s_tem.item(armorprice());
         } else if (world.population > 0 && shopper.index === 1) {
            const prop = save.data.b.colleg ? 'sell2' : 'sell1';
            return [
               ...save.storage.inventory.contents.map(key => {
                  const item = items.of(key);
                  const price = item[prop];
                  if (price === void 0) {
                     return `§fill:#808080§${item.text.battle.name}`;
                  } else {
                     return `${item.text.battle.name} - ${text.s_tem.sellValue.replace('$(x)', price.toString())}`;
                  }
               }),
               text.s_tem.sellExit
            ];
         } else {
            return text.s_tem.talk;
         }
      },
      preset (index) {
         shops.tem.keeper.metadata.face = index;
      },
      price () {
         if (shopper.index === 0) {
            return [ 4, 2, 20, save.data.b.colleg ? armorprice() : 1000 ][shopper.listIndex];
         } else {
            return items.of(save.storage.inventory.contents[shopper.listIndex])[
               save.data.b.colleg ? 'sell2' : 'sell1'
            ]!;
         }
      },
      prompt () {
         return shopper.index === 0 ? text.s_tem.itemPurchasePrompt() : text.s_tem.itemSellPrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (shopper.index === 1) {
               shops.tem.vars.purchase = 1;
               save.data.n.g += CosmosUtils.provide(shops.tem.price);
               success = true;
            } else if (save.storage.inventory.size < 8) {
               if (world.population === 0) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.tem.price);
                  if (save.data.n.g < price) {
                     shops.tem.vars.purchase = 3;
                  } else {
                     shops.tem.vars.purchase = 1;
                     save.data.n.g -= price;
                     success = true;
                  }
               }
            } else {
               shops.tem.vars.purchase = 4;
            }
         } else if (world.population > 0) {
            shops.tem.vars.purchase = 2;
         }
         if (success) {
            if (shopper.index === 1) {
               shops.tem.vars.attempt = void 0;
               assets.sounds.purchase.instance(timer);
               save.storage.inventory.remove(shopper.listIndex);
               save.data.n.specsell > 0 && save.data.n.specsell--;
            } else if (shopper.listIndex === 3 && !save.data.b.colleg) {
               shops.tem.vars.purchase = 0;
               assets.sounds.select.instance(timer);
               atlas.switch('shopText');
               typer.text(...text.s_tem.colleg1).then(async () => {
                  game.input = false;
                  shops.tem.keeper.metadata.colleg = true;
                  await timer.pause(3500);
                  save.data.b.colleg = true;
                  shops.tem.keeper.metadata.colleg = false;
                  await timer.pause(3500);
                  game.input = true;
                  await typer.text(...text.s_tem.colleg2);
                  atlas.switch('shop');
               });
               return true;
            } else {
               assets.sounds.purchase.instance(timer);
               const item = [ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex];
               save.storage.inventory.add(item);
               if (item === 'temyarmor') {
                  save.data.b.item_temyarmor = true;
               }
            }
         } else if (shops.tem.vars.attempt === 1) {
            shops.tem.vars.purchase = 0;
            atlas.switch('shopText');
            typer.text(...text.s_tem.sellStory2).then(() => {
               shops.tem.vars.attempt = 2;
               atlas.switch('shopPurchase');
            });
            return true;
         } else if (shops.tem.vars.attempt === 2) {
            shops.tem.vars.purchase = 0;
            const inst = assets.music.temShop.instances[0];
            const gain = inst.gain.value;
            inst.gain.value = 0;
            atlas.switch('shopText');
            typer.text(...text.s_tem.sellStory3).then(() => {
               shops.tem.vars.attempt = void 0;
               inst.gain.value = gain;
               atlas.switch('shopList');
            });
            return true;
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else if (shopper.index === 1) {
            return save.storage.inventory.contents.length + 1;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.tem.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tem.vars.purchase as number;
            shops.tem.vars.purchase = 0;
            if (world.population === 0 && purchaseValue < 4) {
               return text.s_tem.zeroPrompt;
            } else {
               return text.s_tem.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.population === 0) {
               return text.s_tem.menuPrompt3();
            } else {
               return text.s_tem.menuPrompt1;
            }
         } else if (world.population === 0) {
            return text.s_tem.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.s_tem.itemPrompt;
         } else {
            return text.s_tem.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && save.data.b.item_temyarmor) {
                  return null;
               }
               const info = items.of([ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(save.data.s[info.type]).value);
               return text.s_tem.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};
