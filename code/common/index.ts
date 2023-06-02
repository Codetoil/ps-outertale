import './bootstrap';

import { Filter } from 'pixi.js';
import assets from '../assets';
import { OutertaleGroup } from '../classes';
import content, { inventories } from '../content';
import { atlas, audio, events, fontLoader, game, init, random, reload, renderer, rooms, timer, typer } from '../core';
import {
   CosmosAnimation,
   CosmosAsset,
   CosmosCharacter,
   CosmosDirection,
   CosmosHitbox,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils
} from '../engine';
import {
   battler,
   dialogue,
   frontEnder,
   hash,
   heal,
   instance,
   keepActive,
   player,
   resume,
   saver,
   teleport,
   temporary,
   trivia,
   world
} from '../mantle';
import save from '../save';
import groups from './groups';
import text from './text';
export { dialoguer, frontEnder, phone, player, portraits, saver, shopper, sidebarrer, world } from '../mantle';

export const backdropLoader = events
   .on('modded')
   .then(() => content.backdrop.load())
   .then(() => new CosmosSprite({ active: true, frames: content.backdrop.assets, scale: 0.5 }));

const blue = new CosmosAnimation({ alpha: 0.02, scale: 0.5, resources: content.ibBlue });

export const characters = (() => {
   const finalghost = (() => {
      return {
         down: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookDownAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         left: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookLeftAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         right: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookRightAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         up: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookUpAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         })
      };
   })();

   const napstablook = (() => {
      return {
         down: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookDown ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         left: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookLeft ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         right: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookRight ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
         }),
         up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocNapstablookUp ], metadata: { time: 0 } }).on(
            'tick',
            function () {
               this.y = CosmosMath.wave(((this.metadata.time += 100 / 3) % 4000) / 4000) * -2;
            }
         )
      };
   })();

   const nobody = {
      down: new CosmosSprite(),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite()
   };

   const papyrusSpecial = {
      down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusStomp }),
      left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusCape }),
      right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusCapeStark }),
      up: new CosmosSprite()
   };

   const sansSpecial = {
      down: new CosmosSprite({ active: true, anchor: { x: 0, y: 1 }, frames: [ content.iocSansWink ] }),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite({ active: true, anchor: { x: 0, y: 1 }, frames: [ content.iocSansShrug ] })
   };

   const torielHandhold = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielHandholdDown }),
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielHandholdLeft }),
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielHandholdRight }),
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielHandholdUp })
   };

   const undyneArmorJetpack = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownArmor }).on(
         'tick',
         keepActive
      ),
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftArmorJetpack }).on(
         'tick',
         keepActive
      ),
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightArmorJetpack }).on(
         'tick',
         keepActive
      ),
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpArmorJetpack }).on(
         'tick',
         keepActive
      )
   };

   const undyneDateSpecial = {
      down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateNamaste }),
      left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateFlex }),
      right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateThrowTalk }),
      up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateSit })
   };

   return {
      alphys: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAlphysUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysUp })
         }
      },
      asgore: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsgoreUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreLeft, extrapolate: false }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsgoreRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreUp, extrapolate: false })
         }
      },
      asriel: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielUpTalk ], crop: { right: -16 } })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielLeft, extrapolate: false }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUp, extrapolate: false })
         }
      },
      finalghost: { talk: finalghost, walk: finalghost },
      kidd: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeft, extrapolate: false }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRight, extrapolate: false }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      kiddSad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalkSad }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalkSad }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalkSad }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddDownSad,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddLeftSad,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddRightSad,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      kiddSlave: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalkSlave }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalkSlave }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalkSlave }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddDownSlave,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddLeftSlave,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddRightSlave,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      napstablook: { talk: napstablook, walk: napstablook },
      none: { talk: nobody, walk: nobody },
      papyrus: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocPapyrusUpTalk ], crop: { right: -25 } })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusDown,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusLeft,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusUp, extrapolate: false })
         }
      },
      papyrusMad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownMadTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftMadTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightMadTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocPapyrusUpTalk ], crop: { right: -25 } })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusDownMad,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusLeftMad,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusRightMad,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusUp, extrapolate: false })
         }
      },
      papyrusSpecial: { talk: papyrusSpecial, walk: papyrusSpecial },
      papyrusStark: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownStarkTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftStarkTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightStarkTalk }),
            up: new CosmosSprite()
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownStark }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftStark }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightStark }),
            up: new CosmosSprite()
         }
      },
      sans: {
         talk: {
            down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansDownTalk ], crop: { right: -23 } }),
            left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansLeftTalk ], crop: { right: -17 } }),
            right: new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iocSansRightTalk ],
               crop: { right: -17 }
            }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansUpTalk ], crop: { right: -23 } })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansLeft, extrapolate: false }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansRight, extrapolate: false }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansUp, extrapolate: false })
         }
      },
      sansSpecial: { talk: sansSpecial, walk: sansSpecial },
      tem: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieRightTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieLeftTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieRight }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTemmieLeft })
         }
      },
      toriel: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocTorielUpTalk ], crop: { right: -25 } })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielUp })
         }
      },
      torielHandhold: { talk: torielHandhold, walk: torielHandhold },
      torielSpecial: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielPhoneTalk }),
            left: new CosmosSprite(),
            right: new CosmosSprite(),
            up: new CosmosSprite()
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielPhone }),
            left: new CosmosSprite(),
            right: new CosmosSprite(),
            up: new CosmosSprite()
         }
      },
      undyne: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUp })
         }
      },
      undyneArmor: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownArmor }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftArmor }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightArmor }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpArmor })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneDownArmorWalk,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneLeftArmorWalk,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneRightArmorWalk,
               extrapolate: false
            }),
            up: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneUpArmorWalk,
               extrapolate: false
            })
         }
      },
      undyneArmorJetpack: { talk: undyneArmorJetpack, walk: undyneArmorJetpack },
      undyneDate: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownDateTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftDateTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightDateTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpDateTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownDate }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftDate }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightDate }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpDate })
         }
      },
      undyneDateSpecial: { talk: undyneDateSpecial, walk: undyneDateSpecial },
      undyneStoic: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownStoicTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftStoicTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightStoicTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownStoic }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftStoic }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightStoic }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUp })
         }
      }
   };
})();

export const epicgamer = new CosmosCharacter({
   preset: characters.kidd,
   key: 'kidd',
   anchor: 0,
   size: { x: 20, y: 10 }
});

export const frisk = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRight }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUp })
};

export const friskWater = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownWater }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftWater }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightWater }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpWater })
};

export const galaxy = new CosmosAnimation({ alpha: 0.05, scale: 0.5, resources: content.ibGalaxy });

export const goatbro = new CosmosCharacter({
   preset: characters.asriel,
   key: 'asriel2',
   metadata: {
      name: void 0 as string | void,
      args: void 0 as string[] | void,
      barrier: void 0 as boolean | void,
      interact: void 0 as boolean | void,
      battle: void 0 as boolean | void,
      firstfight: void 0 as boolean | void,
      reposition: void 0 as boolean | void,
      override: void 0 as boolean | void,
      repositionFace: void 0 as CosmosDirection | void,
      static: void 0 as boolean | void,
      queue: void 0 as
         | {
              face: CosmosDirection;
              position: CosmosPointSimple;
              room: string;
           }[]
         | void
   }
});

const grey = new CosmosAnimation({ scale: 0.5, resources: content.ibGrey }).on('tick', function () {
   this.alpha.value = 0.96 + Math.random() * 0.04;
});

export const lazyLoader = events.on('modded').then(() =>
   Promise.all([
      // load clipper shaders
      content.sClipper.load().then(() => {
         const [ vert, frag ] = content.sClipper.value!.map(value => value.value!);
         battler.clipFilter.value = new Filter(vert, frag, {
            minX: 0,
            medX: 320,
            maxX: 640,
            minY: 0,
            medY: 240,
            maxY: 480
         });
      })
   ])
);

export const madfish = new CosmosCharacter({
   preset: characters.undyne,
   key: 'undyne',
   metadata: {
      battle: void 0 as boolean | void,
      firstfight: void 0 as boolean | void,
      reposition: true,
      static: void 0 as boolean | void,
      s: void 0 as {
         grid: import('pathfinding').Grid | void;
         path: CosmosPointSimple[];
         pathindex: number;
      } | void
   }
});

const mercy = battler.buttons[3];

const overrides = [
   [ 'muscle', null ],
   [ 'factory', 'factoryEmpty' ],
   [ 'starton', 'startonEmpty' ],
   [ 'startonTown', 'startonTownEmpty' ],
   [ 'factoryquiet', 'factoryquietEmpty' ],
   [ 'aerialis', 'aerialisEmpty' ],
   [ 'mall', 'youscreweduppal' ],
   [ 'CORE', 'youscreweduppal' ]
] as [keyof typeof assets.music | null, keyof typeof assets.music | null][];

export const queue = {
   state: { loader: null as Promise<any> | null },
   assets: [] as CosmosAsset[],
   load () {
      return (queue.state.loader ??= new CosmosInventory<CosmosAsset[]>(
         ...queue.assets,
         content.amMenu0,
         content.amMenu1,
         content.amMenu2,
         content.amMenu3,
         content.amMenu4,
         rooms.of(save.data.s.room).preload,
         inventories.overworldAssets,
         ...(save.data.b.genocide && save.data.n.state_wastelands_toriel === 2
            ? [ content.avAsriel2, inventories.iocAsriel, inventories.idcAsriel, content.amShock ]
            : []),
         ...(world.epicgamer
            ? [
                 inventories.iocKidd,
                 inventories.iocKiddSad,
                 inventories.iocKiddSlave,
                 inventories.idcKidd,
                 content.avKidd
              ]
            : []),
         ...(world.madfish ? [ inventories.iocUndyne, content.asStomp, content.amUndynefast ] : [])
      ).load());
   }
};

export const menuAssets = new CosmosInventory(
   content.amStory,
   content.ieStory,
   content.asImpact,
   content.asCymbal,
   content.avStoryteller,
   content.ieSplashBackground,
   content.ieSplashForeground,
   frontEnder.menuMusicResource.asset
);

export async function endCall (t: string) {
   assets.sounds.equip.instance(timer);
   await dialogue(t, text.c_endcall);
}

export function genCB () {
   const cornerbarrier = instance('below', 'cornerbarrier');
   if (cornerbarrier) {
      const truebarrier = temporary(new CosmosObject({ position: cornerbarrier.object.position }), 'below');
      for (const object of cornerbarrier.object.objects as CosmosHitbox[]) {
         const px = object.position.add(object.size.x, 0);
         const py = object.position.add(0, object.size.y);
         const md = px.add(py).divide(2);
         const ps = truebarrier.position.add(object);
         truebarrier.attach(
            new CosmosHitbox({
               anchor: { x: 0 },
               rotation: md.angleFrom(object) - 90,
               position: object,
               size: { x: px.extentOf(py), y: md.extentOf(object) }
            }).on('tick', function () {
               let barrier = true;
               if (object.size.x > 0) {
                  player.x < ps.x && (barrier = false);
               } else {
                  player.x > ps.x && (barrier = false);
               }
               if (object.size.y > 0) {
                  player.y < ps.y && (barrier = false);
               } else {
                  player.y > ps.y && (barrier = false);
               }
               this.metadata.barrier = barrier;
            })
         );
      }
   }
}

export async function quickCall (end: boolean, ...lines: string[]) {
   atlas.switch('dialoguerBottom');
   assets.sounds.phone.instance(timer);
   await typer.text(text.c_call, ...lines);
   if (end) {
      assets.sounds.equip.instance(timer);
      await typer.text(text.c_endcall);
   }
   atlas.switch(null);
   atlas.detach(renderer, 'menu', 'sidebar');
   game.movement = true;
}

export function runEncounter (populationfactor: number, puzzlefactor: number, chances: [OutertaleGroup, number][]) {
   const threshold = save.data.n.encounters < 1 ? 3 * 30 : 12 * 30;
   const steps = save.data.n.steps * puzzlefactor;
   if (
      steps <= threshold ||
      random.next() >
         CosmosMath.bezier(populationfactor, 1, 1 / 30 / 10, 1 / 30 / 10) *
            CosmosMath.bezier(Math.min(steps - threshold, 12 * 30) / (12 * 30), 1 / 30 / 10, 1 / 30 / 10, 1)
   ) {
      return false;
   } else {
      renderer.on('render').then(() => {
         if (game.movement) {
            save.data.n.steps = 0;
            save.data.n.encounters++;
            battler.encounter(player, world.population > 0 ? CosmosMath.weigh(chances, random.next())! : groups.nobody);
         }
      });
      return true;
   }
}

// intro init script
events.on('init-intro', async function () {
   queue.load();
   await Promise.all([ fontLoader, menuAssets.load() ]);
   init();
   audio.soundToggle.gain.value = save.flag.b.option_sfx ? 0 : 1;
   audio.musicToggle.gain.value = save.flag.b.option_music ? 0 : 1;
   atlas.switch('frontEnd');
   await Promise.race([
      atlas.navigators.of('frontEndLoad').on('from'),
      atlas.navigators.of('frontEndStart').on('from')
   ]);
   frontEnder.impactNoise?.stop();
   frontEnder.menuMusic = frontEnder.menuMusicResource.daemon.instance(timer);
   (world.genocide || world.population === 0) && (frontEnder.menuMusic!.rate.value = world.bullied ? 0.4375 : 0.1);
   await events.on('spawn');
   game.input = false;
   renderer.alpha.value = 0;
   atlas.switch(null);
});

events.on('init-between', async function () {
   await Promise.all([ fontLoader, queue.load() ]);
   init();
   save.data.s.armor ||= 'spacesuit';
   save.data.n.hp ||= 20;
   save.data.s.weapon ||= 'spanner';
   typer.variables.name = save.data.s.name || text.x_unknown;
   random.value = save.data.n.base1 || save.flag.n.hash;
   renderer.attach('menu', battler.SOUL);
   game.room = save.data.s.room || 'w_start';
   game.camera = player;
});

events.on('init-overworld', async function () {
   renderer.attach('base', grey, galaxy, blue, await backdropLoader);
   const room = rooms.of(game.room);
   renderer.alpha.value = 0;
   await teleport(game.room, room.face, room.spawn.x ?? 0, room.spawn.y ?? 0, { fast: true });
   renderer.attach(
      'main',
      player,
      ...(world.goatbro ? [ goatbro ] : []),
      ...(world.epicgamer ? [ epicgamer ] : []),
      ...(world.madfish ? [ madfish ] : [])
   );
   renderer.alpha.modulate(timer, 300, 1);
   world.cutscene() || resume({ gain: world.level, rate: world.ambiance });
   events.on('teleport', () => {
      save.data.n.steps = 0;
      save.data.n.encounters = 0;
   });
   game.movement = true;
});

events.on('script', async (name, ...args) => {
   switch (name) {
      case '_':
         game.movement = false;
         const sound = assets.sounds.cymbal.instance(timer);
         const fader = new CosmosRectangle({
            alpha: 0,
            fill: 'white',
            stroke: 'transparent',
            size: { x: 320, y: 240 }
         });
         renderer.attach('menu', fader);
         const loader = content.amRedacted.load();
         await fader.alpha.modulate(timer, 5000, 1).then(() => {
            sound.stop();
            fader.fill = 'black';
         });
         await Promise.all([ loader, timer.pause(1e3) ]);
         const mus = assets.music.redacted.instance(timer);
         atlas.switch('dialoguerBase');
         atlas.navigators.of('frontEnd').objects.splice(0, 1);
         atlas.attach(renderer, 'menu', 'frontEnd');
         await typer.text(
            ...[ text._1, text._2, text._3, text._4, text._5, text._6, text._7, text._8, text._9, text._10 ].map(
               text => `{*}{#p/story}${CosmosUtils.format(text, 24, true)}`
            )
         );
         mus.stop();
         heal();
         atlas.attach(renderer, 'menu', 'save');
         reload();
         break;
      case '_void':
         const { room, face, position } = player.metadata.voidkey as {
            room: string;
            face: CosmosDirection;
            position: CosmosPointSimple;
         };
         teleport(room, face, position.x, position.y, world).then(() => {
            save.storage.inventory.add('voidy');
         });
         break;
      case 'save':
         game.movement && saver.display();
         break;
      case 'teleport':
         teleport(args[0] as string, args[1] as CosmosDirection, +args[2], +args[3], world);
         break;
      case 'trivia':
         if (game.movement && game.room[0] === '_') {
            trivia(
               ...text._11[args[0] as keyof typeof text._11](
                  renderer.layers.main.objects.includes(epicgamer) && !epicgamer.metadata.override
               )
            );
         }
         break;
   }
});

events.on('teleport', (from, to) => {
   grey.index = Math.floor(hash(to)) % grey.frames.length;
   blue.index = Math.floor(hash(to.split('').reverse().join(''))) % blue.frames.length;
});

player.on('tick', function () {
   if (save.data.b.water) {
      this.sprites = friskWater;
   } else {
      this.sprites = frisk;
   }
   const roomMeta = rooms.of(game.room).metadata;
   if (roomMeta.dark03) {
      this.tint = world.genocide ? assets.tints.dark03 : void 0;
   } else if (roomMeta.dark02) {
      this.tint = assets.tints.dark02;
   } else if (roomMeta.dark01) {
      this.tint = assets.tints.dark01;
   } else {
      this.tint = void 0;
   }
});

renderer.on('tick', () => {
   const trueGenocide = save.data.b.genocide && save.data.n.state_wastelands_toriel === 2;
   if (trueGenocide && battler.buttons.length === 4) {
      battler.buttons.splice(3, 1);
      for (const [ index, button ] of battler.buttons.entries()) {
         button.position = button.position.add(Math.round(38 + index * 0.25), 0);
      }
      for (const room of rooms.values()) {
         for (const [ from, to ] of overrides) {
            if (room.score.music === from) {
               room.metadata.restoreMuzak = room.score.music;
               room.score.music = to;
               break;
            }
         }
         const spr = room.layers.below?.[0] as CosmosSprite;
         spr && spr.frames[0] === content.imAerialisB && (spr.frames = [ content.imAerialisBDark ]);
      }
   } else if (!trueGenocide && battler.buttons.length === 3) {
      for (const [ index, button ] of battler.buttons.entries()) {
         button.position = button.position.subtract(Math.round(38 + index * 0.25), 0);
      }
      battler.buttons.push(mercy);
      for (const room of rooms.values()) {
         if (room.metadata.restoreMuzak !== void 0) {
            room.score.music = room.metadata.restoreMuzak as string | null;
            room.metadata.restoreMuzak = void 0;
            const spr = room.layers.below?.[0] as CosmosSprite;
            spr && spr.frames[0] === content.imAerialisBDark && (spr.frames = [ content.imAerialisB ]);
         }
      }
   }
});

saver.load();

CosmosUtils.status(`LOAD MODULE: COMMON AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
