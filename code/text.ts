import { CosmosUtils } from "./engine/utils";

export default {
   b_death1: [ '<20>You cannot give up just yet...', '<20>$(name)!\nStay determined...' ],
   b_death2: [ '<20>Our fate rests upon you...', '<20>$(name)!\nStay determined...' ],
   b_death3: [ "<20>You're going to be alright!", '<20>$(name)!\nStay determined...' ],
   b_death4: [ "<20>Don't lose hope!", '<20>$(name)!\nStay determined...' ],
   b_death5: [ '<20>It cannot end now!', '<20>$(name)!\nStay determined...' ],

   b_flee1: "    * I'm outta here.",
   b_flee2: "    * I've got better to do.",
   b_flee3: "    * Don't slow me down.",
   b_flee4: '    * Escaped...',
   b_flee5: '    * Ran away with $(x) EXP\n      and $(y) G.',

   b_heal1: '* HP fully restored.',
   b_heal2: '* You recovered $(x) HP.',

   b_mercy_assist: '* Assist',
   b_mercy_flee: '* Flee',
   b_mercy_spare: '* Spare',

   b_victory1: '<32>{#p/story}* YOU WON!\n* You earned $(x) EXP and $(y) G.',
   b_victory2: '<32>{#p/human}* (Your LOVE increased.)',

   d_console: {
      header: 'ERROR',
      p_resume: {
         header: 'RESUME',
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

   t_main: 'Resume Canon Timeline',
   t_timelines: 'Other Slots',
   t_bisect: 'Bisect',
   t_delete: 'Delete',
   t_launch: 'Launch',
   t_rename: 'Rename',
   t_create: 'Create New',
   t_placeholder: 'Enter Timeline Name',
   t_confirm: 'Are You Sure?',

   g_disabled: 'DISABLED',
   g_g: 'G',
   g_hp: 'HP',
   g_inf: 'INF',
   g_landing1: '[PRESS Z OR ENTER]',
   g_lv: 'LV',
   g_mystery1: '§mystify:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify:§',
   g_mystery2: '{@mystify:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify:}',
   g_no: 'No',
   g_percent: '$(x)%',
   g_settings: 'Settings',
   g_unknown: '?',
   g_yes: 'Yes',

   n_footer: `OUTERTALE V4.42 (C) SPACEFLUFF432 2023`,

   m_box1: 'INVENTORY',
   m_box2: 'BOX',
   m_box3: 'Press [X] to Finish',
   m_confirm1: 'Is this name correct?',

   m_confirm2: 'A name has already\nbeen chosen.',
   m_confirm3: 'Go back',
   m_confirm4: {
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

   m_item1: 'USE',
   m_item2: 'EQUIP',
   m_item3: 'INFO',
   m_item4: 'DROP',

   m_load1: 'Continue',
   m_load2: 'Reset',
   m_load3: 'True Reset',

   m_name1: 'Name the stranded human.',
   m_name2: 'Quit',
   m_name3: 'Backspace',
   m_name4: 'Done',
   m_name5: [
      [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ],
      [ 'H', 'I', 'J', 'K', 'L', 'M', 'N' ],
      [ 'O', 'P', 'Q', 'R', 'S', 'T', 'U' ],
      [ 'V', 'W', 'X', 'Y', 'Z' ],
      [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
      [ 'h', 'i', 'j', 'k', 'l', 'm', 'n' ],
      [ 'o', 'p', 'q', 'r', 's', 't', 'u' ],
      [ 'v', 'w', 'x', 'y', 'z' ]
   ],
   m_name6: (index: number) => {
      const x = (index % 26) % 7;
      const y = Math.floor((index % 26) / 7);
      if (index < 26) {
         return { x: 120 + x * 64, y: 158 + y * 28 };
      } else {
         return { x: 120 + x * 64, y: 278 + y * 28 };
      }
   },

   m_save1: 'Save',
   m_save2: 'Return',
   m_save3: 'File saved.',
   m_save4: '<32>{#p/human}{@fill:#f00}* ($(x) left.)',
   m_save5: '<32>{#p/human}{@fill:#f00}* (Determination.)',
   m_save6: '<32>{#p/human}{@fill:#3f00ff}* ($(x) left.)',
   m_save7: '<32>{#p/human}{@fill:#3f00ff}* (Determination.)',

   m_settings1: 'SETTINGS',
   m_settings2: 'EXIT',
   m_settings3: 'FX',
   m_settings4: 'MUSIC',
   m_settings5: 'ALIGN\nCONTROLS',
   m_settings5_left: 'LEFT',
   m_settings5_right: 'RIGHT',

   m_sidebar1: 'ITEM',
   m_sidebar2: 'STAT',
   m_sidebar3: 'CELL',
   m_sidebar4: 'CONF',

   m_start1: [
      '--- Instruction ---',
      '[Z or ENTER] - Confirm',
      '[X or SHIFT] - Cancel',
      '[C or CTRL] - Menu (In-game)',
      '[F4] - Fullscreen',
      '[Hold ESC] - Quit',
      'When HP is 0, you lose.'
   ],
   m_start2: 'Begin Game',

   m_stat1: 'AT',
   m_stat2: 'DF',
   m_stat3: 'WEAPON',
   m_stat4: 'ARMOR',
   m_stat5: 'GOLD',
   m_stat6: 'EXP',
   m_stat7: 'NEXT',
   m_stat8: '§fill:#ff0§Warning:\nSAVE file\ninvalid.',
   m_stat9: 'KILLS',
   m_stat10: 'N/A',
   m_stat11: 'BULLY',

   m_story1: [ 'Long ago, {^3}two species ruled the solar system: {^5}HUMANS and MONSTERS.' ],
   m_story2: [ 'As time passed, {^3}a war broke out between the two species.' ],
   m_story3: [ "After the MONSTERS' home planet was destroyed, {^3}HUMANS declared victory." ],
   m_story4: [ 'The remaining MONSTERS were banished to an abandoned outpost.' ],
   m_story5: [ 'A powerful force field was erected, {^3}and the MONSTERS were sealed in.' ],
   m_story6: [ 'Many years later.{^8}.{^8}.' ],
   m_story7: [ 'µµµµ EBOTT SECTOR µµµµ µµµµµµµµ 251X{^20}' ],
   m_story8: [ 'Tales speak of a place from which spacecraft never return.{^20}' ],
   m_story9: [ '{^100}' ],
   m_story10: [ '{^100}' ],
   m_story11: [ '{^100}' ],

   x_quitText1: 'Quitting',
   x_quitText2: 'Quitting.',
   x_quitText3: 'Quitting..'
};

CosmosUtils.status(`LOAD MODULE: TEXT (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
