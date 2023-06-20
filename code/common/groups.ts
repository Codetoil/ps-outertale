import assets from '../assets';
import { OutertaleChoice, OutertaleGroup, OutertaleVolatile } from '../classes';
import content from '../content';
import { atlas, events, game, keys, renderer, timer } from '../core';
import { CosmosInventory } from '../engine/core';
import { CosmosPointSimple } from '../engine/numerics';
import { CosmosUtils } from '../engine/utils';
import { battler, world } from '../mantle';
import save from '../save';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

export function standardMusic () {
   battler.music = assets.music.battle1.instance(timer);
}

export function endMusic () {
   battler.music?.stop();
}

export function spareFlee (choice: OutertaleChoice) {
   switch (choice.type) {
      case 'spare':
         battler.spare();
         break;
      case 'flee':
         events.fire('escape');
         endMusic();
         return true;
   }
   return false;
}

export function standardPos (basedbox = false) {
   battler.SOUL.position.set(basedbox ? battler.box : 160);
   battler.SOUL.alpha.value = 1;
}

export function standardSize (size = { x: 100, y: 65 }, basedbox = false) {
   return Promise.all([
      battler.box.size.modulate(timer, 300, size),
      basedbox ? battler.box.position.modulate(timer, 300, { y: 192.5 - size.y / 2 }) : void 0
   ]);
}

export function resetBox (basedbox = false) {
   battler.SOUL.alpha.value = 0;
   return standardSize({ x: 282.5, y: 65 }, basedbox);
}

export function defaultSetup (
   pattern: (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void>,
   size?: CosmosPointSimple,
   basedbox = false
) {
   return async (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => {
      if (spareFlee(choice)) {
         return;
      }
      if (battler.alive.length > 0) {
         await battler.resume(async () => {
            await standardSize(size, basedbox);
            standardPos(basedbox);
            await pattern(choice, target, volatile);
            await resetBox(basedbox);
         });
      } else {
         endMusic();
      }
   };
}

export async function turnSkip () {
   let skip = false;
   for (const v of battler.alive) {
      if (v.vars.kidskip) {
         skip = true;
         v.vars.kidskip = false;
      }
   }
   return skip;
}

const groups = {
   maddummy: new OutertaleGroup({
      assets: new CosmosInventory(content.amDummyboss, content.amPrebattle),
      init () {
         battler.flee = false;
         battler.grid = save.data.b.genocide ? content.ibuGrid1 : content.ibuGrid2;
         battler.status = text.b_opponent_maddummy.status1();
         const music = world.genocide ? assets.music.prebattle.instance(timer) : assets.music.dummyboss.instance(timer);
         battler.music = music;
         if (save.data.b.genocide) {
            opponents.maddummy.ghost = false;
            battler.volatile[0].sparable = true;
         } else {
            battler.volatile[0].container.position.x = 163.5;
            battler.volatile[0].container.position.y = 82.5;
         }
         return true;
      },
      opponents: [ [ opponents.maddummy, { x: 216 / 2, y: 136 / 2 } ] ]
   }),

   moldsmal: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_moldsmal.status1();
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'fight':
               if (battler.alive.length < (vars.enemies || 2)) {
                  battler.status =
                     battler.alive.length > 1 ? text.b_opponent_moldsmal.status6() : text.b_opponent_moldsmal.status7();
               }
               break;
            case 'spare':
               if (battler.spare()) {
                  battler.status =
                     battler.alive.length > 1 ? text.b_opponent_moldsmal.status6() : text.b_opponent_moldsmal.status7();
               }
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               if (await turnSkip()) {
                  await timer.pause(400);
               } else {
                  if (battler.alive.length > 1) {
                     await Promise.all([ patterns.moldsmal(), patterns.moldsmal() ]);
                  } else {
                     await patterns.moldsmal();
                  }
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.moldsmal, { x: 82, y: 120 } ],
         [ opponents.moldsmal, { x: 186, y: 120 } ]
      ]
   }),

   spacetop: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = world.azzie ? text.b_opponent_spacetop.genoStatus : text.b_opponent_spacetop.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() =>
         battler.opponents.includes(opponents.spacetop) ? patterns.spacetop() : timer.pause(450)
      ),
      opponents: [ [ opponents.spacetop, { x: 140, y: 120 } ] ]
   }),

   nobody: new OutertaleGroup({
      assets: new CosmosInventory(content.amPrebattle),
      init () {
         const jeebs = assets.music.prebattle.instance(timer);
         jeebs.rate.value = 0.25;
         jeebs.gain.value = 0;
         jeebs.gain.modulate(timer, 300, 0.45);
         battler.SOUL.alpha.value = 0;
         game.text = text.b_group_nobody();
         atlas.attach(renderer, 'menu', 'battlerAdvancedText');
         battler.alpha.value = 1;
         keys.interactKey.on('down').then(() => {
            game.text = '';
            atlas.detach(renderer, 'menu', 'battlerAdvancedText');
            jeebs.gain.modulate(timer, 300, 0).then(() => {
               jeebs.stop();
            });
            events.fire('exit');
         });
         return false;
      },
      opponents: []
   })
};

export default groups;

CosmosUtils.status(`LOAD MODULE: COMMON GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
