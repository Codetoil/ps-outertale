import { CosmosUtils } from './engine';

export default {
   b_mercy_assist: '* Assist',
   b_mercy_flee: '* Flee',
   b_mercy_spare: '* Spare',

   b_text1: 'LV',
   b_text2: [ '<20>You cannot give up just yet...', '<20>$(name)!\nStay determined...' ],
   b_text3: [ '<20>Our fate rests upon you...', '<20>$(name)!\nStay determined...' ],
   b_text4: [ "<20>You're going to be alright!", '<20>$(name)!\nStay determined...' ],
   b_text5: [ "<20>Don't lose hope!", '<20>$(name)!\nStay determined...' ],
   b_text6: [ '<20>It cannot end now!', '<20>$(name)!\nStay determined...' ],
   b_text7: '<32>{#p/story}* YOU WON!\n* You earned $(x) EXP and $(y) G.',
   b_text8: '<32>{#p/human}* (Your LOVE increased.)',
   b_text9: "    * I'm outta here.",
   b_text10: "    * I've got better to do.",
   b_text11: "    * Don't slow me down.",
   b_text12: '    * Escaped...',
   b_text13: '    * Ran away with $(x) EXP\n      and $(y) G.',
   b_text15: '* HP fully restored.',
   b_text16: '* You recovered $(x) HP.',
   b_text17: 'INF',

   d_console: {
      tab: 'CONSOLE',
      header: 'OUTPUT',
      altHeader: 'ERROR',
      p_input: {
         header: 'INPUT',
         altHeader: 'RESUME',
         resume: 'Click To Resume'
      },
      blurb: 'An error occured! Please send\nscreenshot to developer.'
   },
   d_control: {
      tab: 'CONTROL',
      headers: [ 'GENERAL', 'BATTLE' ],
      items: [
         [
            'FixMusic',
            'FixPlayer',
            'InfiniteG',
            'Interact',
            'Input',
            'Movement',
            'Noclip',
            'Save',
            'SkipText',
            'Freecam'
         ],
         [
            'CanAssist',
            'ClearBox',
            'Exit',
            'ResetBox',
            'ResetMenu',
            'CanFlee',
            'InfiniteHP',
            'PacifyAll',
            'Suicide',
            'WeakenAll'
         ]
      ],
      p_speed: {
         header: 'GAME SPEED',
         prev: 'Less',
         next: 'More'
      }
   },
   d_editor: {
      delete: 'delete',
      property: {
         active: 'active',
         anchor: 'anchor',
         args: 'args',
         auto: 'auto',
         background: 'background',
         filter: 'filter',
         filters: 'filters',
         frames: 'frames',
         gain: 'gain',
         layer: 'layer',
         music: 'music',
         name: 'name',
         neighbors: 'neighbors',
         objects: 'objects',
         position: 'position',
         preload: 'preload',
         rate: 'rate',
         regionMax: 'region-max',
         regionMin: 'region-min',
         resources: 'resources',
         reverb: 'reverb',
         rotation: 'rotation',
         score: 'score',
         size: 'size',
         spawn: 'spawn',
         steps: 'steps',
         tags: 'tags',
         type: 'type'
      },
      status: {
         creating: 'creating',
         modifying: 'modifying',
         selecting: 'selecting'
      },
      type: {
         object: 'object',
         room: 'room',
         subObject: 'sub-object'
      }
   },
   d_godhome: {
      tab: 'GODHOME',
      p_teleport: {
         header: 'ROOM',
         action: 'Teleport'
      },
      p_encounter: {
         header: 'ENCOUNTER',
         action: 'Start'
      },
      p_menu: {
         header: 'MENU',
         action: 'Switch'
      }
   },
   d_inspect: {
      tab: 'INSPECT',
      headers: [ 'LAYERS', 'TYPES' ],
      switches: [
         [ 'Base', 'Below', 'Main', 'Above', 'Menu' ],
         [ 'Hitbox', 'Sprite', 'Text' ]
      ],
      p_explorer: {
         header: 'EXPLORER',
         layers: [ 'Base (Explorer)', 'Below (Explorer)', 'Main (Explorer)', 'Above (Explorer)', 'Menu (Explorer)' ],
         letters: {
            animation: 'A',
            character: 'C',
            entity: 'E',
            hitbox: 'H',
            object: 'O',
            player: 'P',
            sprite: 'S',
            text: 'T'
         }
      }
   },
   d_savemod: {
      tab: 'SAVEMOD',
      header: 'SAVE EDITOR',
      domains: [
         'Data (Booleans)',
         'Data (Numbers)',
         'Data (Strings)',
         'Flags (Booleans)',
         'Flags (Numbers)',
         'Flags (Strings)'
      ],
      p_page: {
         header: 'NAVIGATION',
         prev: 'Prev',
         next: 'Next'
      }
   },
   d_storage: {
      tab: 'STORAGE',
      header: 'STORAGE EDITOR',
      p_container: { header: 'SELECTION', prev: 'Prev', next: 'Next' },
      display: { inventory: 'Inventory', dimboxA: 'Dim. Box A', dimboxB: 'Dim. Box B' }
   },

   d_prompt_save: 'Download this SAVE file?',
   d_prompt_open: 'Upload this SAVE file?',

   n_footer: `OUTERTALE V4.11 (C) SPACEFLUFF432 2023`,

   n_frontEnd1: [ 'Long ago, {^3}two species ruled the solar system: {^5}HUMANS and MONSTERS.' ],
   n_frontEnd2: [ 'As time passed, {^3}a war broke out between the two species.' ],
   n_frontEnd3: [ "After the MONSTERS' home planet was destroyed, {^3}HUMANS declared victory." ],
   n_frontEnd4: [ 'The remaining MONSTERS were banished to an abandoned outpost.' ],
   n_frontEnd5: [ 'A powerful force field was erected, {^3}and the MONSTERS were sealed in.' ],
   n_frontEnd6: [ 'Many years later.{^8}.{^8}.' ],
   n_frontEnd7: [ 'µµµµ EBOTT SECTOR µµµµ µµµµµµµµ 251X{^20}' ],
   n_frontEnd8: [ 'Tales speak of a place from which spacecraft never return.{^20}' ],
   n_frontEnd9: [ '{^100}' ],
   n_frontEnd10: [ '{^100}' ],
   n_frontEnd11: [ '{^100}' ],

   n_frontEndLoad2: 'Continue',
   n_frontEndLoad3: 'Reset',
   n_frontEndLoad4: '(Demo) True Reset',
   n_frontEndLoad5: 'Settings',

   n_frontEndName0: 'Name the fallen human.',
   n_frontEndName1: 'Name the stranded human.',
   n_frontEndName2: 'Quit',
   n_frontEndName3: 'Backspace',
   n_frontEndName4: 'Done',
   n_frontEndName5: [
      [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
      [ 'H', 'I', 'J', 'K', 'L', 'M', 'N' ],
      [ 'O', 'P', 'Q', 'R', 'S', 'T', 'U' ],
      [ 'V', 'W', 'X', 'Y', 'Z' ],
      [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
      [ 'h', 'i', 'j', 'k', 'l', 'm', 'n' ],
      [ 'o', 'p', 'q', 'r', 's', 't', 'u' ],
      [ 'v', 'w', 'x', 'y', 'z' ]
   ],
   n_frontEndName6: (index: number) => {
      const x = (index % 26) % 7;
      const y = Math.floor((index % 26) / 7);
      if (index < 26) {
         return { x: 120 + x * 64, y: 158 + y * 28 };
      } else {
         return { x: 120 + x * 64, y: 278 + y * 28 };
      }
   },

   n_frontEndNameConfirm1: 'Is this name correct?',
   n_frontEndNameConfirm2: 'A name has already\nbeen chosen.',
   n_frontEndNameConfirm3: 'No',
   n_frontEndNameConfirm4: 'Go back',
   n_frontEndNameConfirm5: 'Yes',
   n_frontEndNameConfirm6: {
      aaaaaa: 'Not very creative...?',
      aaron: 'Is this name correct? ;)',
      alphy: 'Uh.... OK?',
      alphys: "D-don't do that.",
      asgor: 'You... can? Huh.',
      asgore: 'You cannot.',
      asrie: '...fine.',
      asriel: '...',
      blook: "............\nThey're powerless to stop you.",
      blooky: "............\nThey're powerless to stop you.",
      bpants: 'You could come up with something better than that.',
      burgie: "You know that's just a nickname, right?",
      bratty: 'Like, OK I guess.',
      bob: 'A pleasing nomenclature, no?',
      catty: "Bratty! Bratty! That's MY name!",
      cdrake: 'Guh huh huh, nice one.',
      chara: 'The true name.',
      cozmo: 'Alacazam, Hocus Pocus.',
      dgrssa: 'How dare you!?',
      dogamy: "Don't even think about taking my wife's.",
      doggo: "A-Ah! It's moving! I-I-It's shaking!",
      dummy: ".....\nIt doesn't seem much for conversation.",
      erogot: 'It is my name.',
      frisk: 'WARNING: This name will do absolutely nothing. Proceed anyway?',
      gerson: 'Wah ha ha! Why not?',
      glyde: 'Slick choice, homeslice.',
      hapsta: "I don't think so, darling.",
      heats: 'You KNEW!?',
      jerry: 'Jerry.',
      krios: 'It is my world.',
      mdummy: 'What. What! WHAT!',
      mett: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',
      metta: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',
      mtt: 'OOOOH!!! ARE YOU PROMOTING MY BRAND?',
      muffet: "Ahuhuhu, I heard humans love stealing spiders' identities~",
      mushy: 'Saddle up!',
      napsta: "............\nThey're powerless to stop you.",
      papyru: "I'LL ALLOW IT!!!!",
      pyrope: "Now you're on FIRE!!",
      san: 'why?',
      sans: 'nope.',
      sdrake: 'That\'s a pretty "bright" one, heh.',
      shyren: '...?',
      skrub: 'Clean name.',
      skrubb: 'Clean name.',
      temmie: 'hOI!',
      torie: 'Umm... I suppose that works...',
      toriel: 'I think you should think of your own name, my child.',
      twink: 'Really...',
      twinkl: 'Hee hee hee... you THOUGHT.',
      twinky: 'Seriously??',
      twnkly: 'Nice try, idiot.',
      undyn: 'Ngah, okay.',
      undyne: 'Get your OWN name!',
      vulkin: 'Ahh! Thank you~'
   },

   n_frontEndSettings1: 'SETTINGS',
   n_frontEndSettings2: 'EXIT',
   n_frontEndSettings3: 'FX',
   n_frontEndSettings3a: '$(x)%',
   n_frontEndSettings3b: 'DISABLED',
   n_frontEndSettings4: 'MUSIC',
   n_frontEndSettings4a: '$(x)%',
   n_frontEndSettings4b: 'DISABLED',
   /*
   n_frontEndSettings5: 'WINDOWED\nOPACITY',
   n_frontEndSettings5a: '$(x)%',
   */
   n_frontEndSettings6: 'ALIGN\nCONTROLS',
   n_frontEndSettings6a: 'LEFT',
   n_frontEndSettings6b: 'RIGHT',

   n_frontEndStart1: '--- Instruction ---',
   n_frontEndStart2: '[Z or ENTER] - Confirm',
   n_frontEndStart3: '[X or SHIFT] - Cancel',
   n_frontEndStart4: '[C or CTRL] - Menu (In-game)',
   n_frontEndStart5: '[F4] - Fullscreen',
   n_frontEndStart6: '[Hold ESC] - Quit',
   n_frontEndStart7: 'When HP is 0, you lose.',
   n_frontEndStart8: 'Begin Game',
   n_frontEndStart9: 'Settings',

   n_g: 'G',
   n_hp: 'HP',
   n_inf: 'INF',
   n_landing1: '[PRESS Z OR ENTER]',
   n_lv: 'LV',
   n_unknown: '?',

   n_save2: 'Save',
   n_save3: 'File saved.',
   n_save4: 'Return',
   n_save5: '<32>{#p/human}{@fill:#f00}* ($(x) left.)',
   n_save6: '<32>{#p/human}{@fill:#f00}* (Determination.)',
   n_save7: '<32>{#p/human}{@fill:#3f00ff}* ($(x) left.)',
   n_save8: '<32>{#p/human}{@fill:#3f00ff}* (Determination.)',

   n_shop3: 'Yes',
   n_shop4: 'No',

   n_sidebar4: 'ITEM',
   n_sidebar5: 'STAT',
   n_sidebar6: 'CELL',
   n_sidebar7: 'CONF',

   n_sidebarCell1: 'Settings',

   n_sidebarCellBox1: 'INVENTORY',
   n_sidebarCellBox2: 'BOX',
   n_sidebarCellBox3: 'Press [X] to Finish',

   n_sidebarItem1: 'USE',
   n_sidebarItem2: 'EQUIP',
   n_sidebarItem3: 'INFO',
   n_sidebarItem4: 'DROP',

   n_sidebarStat3: 'AT',
   n_sidebarStat4: 'DF',
   n_sidebarStat5: 'WEAPON',
   n_sidebarStat6: 'ARMOR',
   n_sidebarStat7: 'GOLD',
   n_sidebarStat8: 'EXP',
   n_sidebarStat9: 'NEXT',
   n_sidebarStat10: '§fill:#f00§Error.',
   n_sidebarStat12: 'KILLS',
   n_sidebarStat13: 'N/A',
   n_sidebarStat14: 'BULLY',

   x_quitText1: 'Quitting',
   x_quitText2: 'Quitting.',
   x_quitText3: 'Quitting..'
};

CosmosUtils.status(`LOAD MODULE: TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
