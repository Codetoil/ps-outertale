import assets from '../assets';
import { OutertaleGroup } from '../classes';
import { defaultSetup, endMusic, resetBox, standardMusic, standardPos, standardSize } from '../common/groups';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import commonText from '../common/text';
import content from '../content';
import { events, random, renderer, timer } from '../core';
import { CosmosAnimation, CosmosInventory, CosmosUtils } from '../engine';
import { battler, world } from '../mantle';
import save from '../save';
import opponents from './opponents';
import patterns from './patterns';
import text from './text';

function fixMigosp () {
   battler.status = text.b_opponent_migosp.soloStatus;
   const volatile = battler.alive[0];
   volatile.sparable = true;
   const anim = volatile.container.objects[0] as CosmosAnimation;
   anim.index = 0;
   anim.resources = content.ibcMigospHappi;
   anim.enable();
}

function active0 () {
   switch (battler.alive[0].opponent) {
      case opponents.froggit:
         return 'froggit';
      case opponents.whimsun:
         return 'whimsun';
      case opponents.migosp:
         return 'migosp';
      case commonOpponents.moldsmal:
         return 'moldsmal';
   }
}

const groups = {
   dummy: new OutertaleGroup({
      assets: new CosmosInventory(content.amPrebattle),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = commonText.b_opponent_dummy.status1;
         battler.music = assets.music.prebattle.instance(timer);
         return true;
      },
      opponents: [ [ opponents.dummy, { x: 216 / 2, y: 136 / 2 } ] ]
   }),

   fakefroggit: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_froggit.status1;
         standardMusic();
         battler.volatile[0].vars.fake = true;
         return true;
      },
      async handler (choice, target, volatile) {
         switch (choice.type) {
            case 'act':
               switch (choice.act) {
                  case 'compliment':
                     save.data.n.state_wastelands_froggit = 1;
                     break;
                  case 'flirt':
                     save.data.n.state_wastelands_froggit = 2;
                     break;
                  case 'threat':
                     save.data.n.state_wastelands_froggit = 4;
                     break;
               }
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               save.data.n.state_wastelands_froggit = 3;
               return;
            case 'fight':
               battler.music?.stop();
               if (save.data.n.kills > 0) {
                  save.data.n.state_wastelands_froggit = 5;
                  return;
               } else if (battler.hurt.includes(volatile)) {
                  world.bully();
                  save.data.n.state_wastelands_froggit = 4;
                  break;
               }
         }
         endMusic();
         const tori = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { y: 120, x: 360 },
            resources: content.ibcTorielScram
         });
         renderer.attach('menu', tori);
         battler.garbage.push([ 'menu', tori ]);
         await tori.position.modulate(timer, 950, { x: 260, y: 120 });
         await timer.pause(350);
         tori.index = 1;
         const frogger = new CosmosAnimation({
            anchor: { y: 1, x: 0 },
            resources: content.ibcFakeFroggit,
            position: { y: -2 }
         });
         battler.volatile[target].container.objects[0] = frogger;
         await timer.pause(850);
         frogger.index = 1;
         timer.pause(1250).then(() => {
            tori.index = 0;
         });
         await battler.volatile[target].container.position.modulate(timer, 2500, { x: -70, y: 120 });
         battler.volatile[target].sparable = true;
         battler.spare(target);
      },
      opponents: [ [ opponents.froggit, { x: 140, y: 120 } ] ]
   }),

   froggit: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_froggit.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => patterns.froggit()),
      opponents: [ [ opponents.froggit, { x: 140, y: 120 } ] ]
   }),

   whimsun: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_whimsun.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => patterns.whimsun()),
      opponents: [ [ opponents.whimsun, { x: 140, y: 80 } ] ]
   }),

   froggitWhimsun: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_froggitWhimsun;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'fight':
               if (battler.alive.length < (vars.enemies || 2)) {
                  battler.status = text.b_group_froggitWhimsun;
               }
               break;
            case 'spare':
               if (battler.spare()) {
                  battler.status = text.b_group_froggitWhimsun;
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
               if (battler.alive.length > 1) {
                  await Promise.all([ patterns.froggit(void 0, 'whimsun'), patterns.whimsun(1, '5600') ]);
               } else {
                  await patterns[active0() as 'froggit' | 'whimsun']();
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.froggit, { x: 100, y: 120 } ],
         [ opponents.whimsun, { x: 220, y: 80 } ]
      ]
   }),

   moldsmalMigosp: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_moldsmalMigosp;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
               fixMigosp();
            } else {
               battler.status = commonText.b_opponent_moldsmal.status8;
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               if (battler.alive.length > 1) {
                  await Promise.all([
                     random.next() < 0.15 ? patterns.froggit(1, 'whimsun') : patterns.migosp(0),
                     commonPatterns.moldsmal()
                  ]);
               } else {
                  await (active0() === 'moldsmal' ? commonPatterns.moldsmal : patterns.migosp)(
                     active0() === 'migosp' ? 1 : 0
                  );
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ commonOpponents.moldsmal, { x: 100, y: 120 } ],
         [ opponents.migosp, { x: 220, y: 120 } ]
      ]
   }),

   loox: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_loox.status1;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'fight':
               if (battler.alive.length < (vars.enemies || 2)) {
                  battler.status = text.b_opponent_loox.status7;
               }
               break;
            case 'spare':
               if (battler.spare()) {
                  battler.status = text.b_opponent_loox.status7;
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
               await patterns.loox(void 0, battler.alive.length > 1 ? 'loox' : void 0);
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.loox, { x: 100, y: 120 } ],
         [ opponents.loox, { x: 220, y: 120 } ]
      ]
   }),

   mushy: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_opponent_mushy.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(choice => patterns.mushy(choice.type === 'act' && choice.act === 'challenge' ? 0 : 1)),
      opponents: [ [ opponents.mushy, { x: 140, y: 120 } ] ]
   }),

   looxMigospMushy: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = text.b_group_looxMigospMushy;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 3)) {
            if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
               fixMigosp();
            } else {
               battler.status =
                  battler.alive.length > 1 ? text.b_group_looxMigospMushy2 : text.b_group_looxMigospMushy3;
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length > 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               const promies = [] as Promise<void>[];
               if (battler.opponents.includes(opponents.loox)) {
                  promies.push(patterns.loox(battler.alive.length > 2 ? 0 : void 0));
               }
               if (battler.opponents.includes(opponents.migosp)) {
                  if (battler.alive.length > 1 && random.next() < 0.15) {
                     promies.push(patterns.froggit(1, 'whimsun'));
                  } else {
                     promies.push(
                        patterns.migosp(battler.alive.length > 1 ? 0 : 1, battler.alive.length > 2 ? 'reduced' : void 0)
                     );
                  }
               }
               if (battler.opponents.includes(opponents.whimsun)) {
                  promies.push(
                     patterns.whimsun(battler.alive.length > 1 ? 1 : void 0, battler.alive.length > 1 ? '6500' : void 0)
                  );
               }
               await Promise.all(promies);
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.loox, { x: 33, y: 120 } ],
         [ opponents.migosp, { x: 137, y: 120 } ],
         [ opponents.whimsun, { x: 241, y: 80 } ]
      ]
   }),

   napstablook: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      status: text.b_opponent_napstablook.status1,
      music: assets.music.ghostbattle,
      assets: new CosmosInventory(content.amGhostbattle),
      opponents: [ [ opponents.napstablook, { x: 160, y: 120 } ] ]
   }),

   toriel: new OutertaleGroup({
      grid: content.ibuGrid2,
      status: text.b_opponent_toriel.status1,
      music: assets.music.torielboss,
      assets: new CosmosInventory(content.amTorielboss),
      opponents: [ [ opponents.toriel, { x: 160, y: 120 } ] ]
   })
};

export default groups;

CosmosUtils.status(`LOAD MODULE: OUTLANDS GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
