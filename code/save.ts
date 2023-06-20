import { CosmosMath } from './api';
import { OutertaleInventory } from './classes';
import { backend } from './core';
import { CosmosKeyed, CosmosUtils } from './engine/utils';

// SAVE data booleans
type OutertaleDataBooleanBase = typeof dataBoolean;
export interface OutertaleDataBoolean extends OutertaleDataBooleanBase {}

// SAVE flag booleans
type OutertaleDataNumberBase = typeof dataNumber;
export interface OutertaleFlagBoolean extends OutertaleFlagBooleanBase {}

// SAVE data numbers
type OutertaleDataStringBase = typeof dataString;
export interface OutertaleDataNumber extends OutertaleDataNumberBase {}

// SAVE flag numbers
type OutertaleFlagBooleanBase = typeof flagBoolean;
export interface OutertaleFlagNumber extends OutertaleFlagNumberBase {}

// SAVE data strings
type OutertaleFlagNumberBase = typeof flagNumber;
export interface OutertaleDataString extends OutertaleDataStringBase {}

// SAVE flag strings
type OutertaleFlagStringBase = typeof flagString;
export interface OutertaleFlagString extends OutertaleFlagStringBase {}

function createDataStore<A extends object> (prefix: string, fallback: any, entries: any): A {
   return new Proxy(entries, {
      get (target, key) {
         if (typeof key === 'string') {
            return save.state[prefix]?.[key] ?? fallback;
         }
      },
      set (target, key, value) {
         if (typeof key === 'string') {
            (save.state[prefix] ??= {})[key] = value;
            return true;
         } else {
            return false;
         }
      },
      deleteProperty (target, key) {
         if (typeof key === 'string') {
            delete save.state[prefix]?.[key];
            return true;
         } else {
            return false;
         }
      }
   }) as A;
}

function createFlagStore<A extends object> (prefix: string, fallback: any, entries: any): A {
   return new Proxy(entries, {
      get (target, key) {
         if (typeof key === 'string') {
            const item = save.manager.getItem(`${save.namespace}:${prefix}:${key}`);
            if (item) {
               try {
                  return CosmosUtils.parse(item);
               } catch {}
            }
            return fallback;
         }
      },
      set (target, key, value) {
         if (typeof key === 'string') {
            save.manager.setItem(`${save.namespace}:${prefix}:${key}`, CosmosUtils.serialize(value));
            return true;
         } else {
            return false;
         }
      },
      deleteProperty (target, key) {
         if (typeof key === 'string') {
            save.manager.removeItem(`${save.namespace}:${prefix}:${key}`);
            return true;
         } else {
            return false;
         }
      }
   }) as A;
}

function info<A> (): A {
   return null as A;
}

const dataBoolean = {
   /** got pm about electrospear */
   a_state_pm_electrospear: info<boolean>(),

   /** declined to napstablook's game show plea in */
   a_state_napstadecline: info<boolean>(),

   /** mettaton's secret will be revealed */
   a_state_hapstablook: info<boolean>(),

   /** got the new cellphone */
   a_state_gotphone: info<boolean>(),

   /** got told about mew mew doll */
   a_state_m3: info<boolean>(),

   /** eligible for first item in 3rd MTT show */
   a_state_moneyitemA: info<boolean>(),

   /** eligible for 2nd item in 3rd MTT show */
   a_state_moneyitemB: info<boolean>(),

   /** eligible for final item in 3rd MTT show */
   a_state_moneyitemC: info<boolean>(),

   /** broke mett's arms */
   a_state_armwrecker: info<boolean>(),

   /** broke mett's legs */
   a_state_legwrecker: info<boolean>(),

   /** papyrus explained why undyne is missing */
   a_state_fishbetray: info<boolean>(),

   /** puzzle help notifier call */
   a_state_puzzlehelp: info<boolean>(),

   /** backtracked to other side of CORE with azzy */
   a_state_asrielTimewaster: info<boolean>(),

   /** badness increased to one */
   bad_lizard: info<boolean>(),

   /** true if "About Yourself" has been used on the CELL */
   cell_about: info<boolean>(),

   /** true if "Flirt" has been used on the CELL */
   cell_flirt: info<boolean>(),

   /** true if "Call Her Mom" has been used on the CELL */
   cell_mom: info<boolean>(),

   /** true if "Puzzle Help" has been used on the CELL */
   cell_puzzle: info<boolean>(),

   /** true if "Puzzle Help" has been used on the CELL with alphys */
   cell_puzzle_alphys: info<boolean>(),

   /** paid for temmie college */
   colleg: info<boolean>(),

   /** failed to go through with apology */
   f_state_blookbetray: info<boolean>(),

   /** napstablook reacted to spooktune */
   f_state_blookmusic1: info<boolean>(),

   /** napstablook reacted to spookwave */
   f_state_blookmusic2: info<boolean>(),

   /** napstablook reacted to spookwaltz */
   f_state_blookmusic3: info<boolean>(),

   /** monster kid signal star reaction flags */
   f_state_dc_kidd2: info<boolean>(),
   f_state_dc_kidd3: info<boolean>(),
   f_state_dc_kidd4: info<boolean>(),
   f_state_dc_kidd6: info<boolean>(),
   f_state_dc_kidd7: info<boolean>(),
   f_state_dc_kidd10: info<boolean>(),

   /** completed dialogue tree of npc 86 */
   f_state_done86: info<boolean>(),

   /** put a sock in it */
   f_state_dummypunch: info<boolean>(),

   /** put an eye on it */
   f_state_dummytalk: info<boolean>(),

   /** exit date */
   f_state_exitdate: info<boolean>(),

   /** tried to hug napstablook */
   f_state_ghosthug: info<boolean>(),

   /** asked napstablook to sleep over */
   f_state_ghostsleep: info<boolean>(),

   /** true if monster kid acted in battle */
   f_state_kidd_act: info<boolean>(),

   /** true if player didn't save MK */
   f_state_kidd_betray: info<boolean>(),

   /** true if monster kid mentioned the gap */
   f_state_kidd_bird: info<boolean>(),

   /** true if monster kid got nice cream! */
   f_state_kidd_cream: info<boolean>(),

   /** true if monster kid attacked a monster */
   f_state_kidd_fight: info<boolean>(),

   /** true if monster kid used magic in battle */
   f_state_kidd_magic: info<boolean>(),

   /** true if monster kid tried mercy in battle */
   f_state_kidd_mercy: info<boolean>(),

   /** napsta comment */
   f_state_kidd_napstacom: info<boolean>(),

   /** true if monster kid complained about dark area */
   f_state_kidd_prechase: info<boolean>(),

   /** snail comment */
   f_state_kidd_snailcom: info<boolean>(),

   /** true if monster kid explained statue mechanic */
   f_state_kidd_statue: info<boolean>(),

   /** temmie comment */
   f_state_kidd_temmiecom: info<boolean>(),

   /** trash comment */
   f_state_kidd_trashcom: info<boolean>(),

   /** trauma dialogue for encounter */
   f_state_kidd_trauma: info<boolean>(),

   /** undyne comment */
   f_state_kidd_undynecom: info<boolean>(),

   /** mushroom dance, mushroom dance, whatever could it mean */
   f_state_mushroomdance: info<boolean>(),

   /** it means youve lived a life of sin */
   f_state_mushroomdanceGeno: info<boolean>(),

   /** true if narrator said nobody came for other side of bird */
   f_state_narrator_bird: info<boolean>(),

   /** interacted with nice cream guy in foundry */
   f_state_nicecream: info<boolean>(),

   /** nice cream guy reminded you of punch cards */
   f_state_noticard: info<boolean>(),

   /** went into undyne fight with LV 0 */
   f_state_oopsprimer: info<boolean>(),

   /** you told pap what your wearing */
   f_state_papclothes: info<boolean>(),

   /** unlocked the piano puzzle */
   f_state_piano: info<boolean>(),

   /** gave up your soul to undyne (only for monstew kid to show up) */
   f_state_sacrifice: info<boolean>(),

   /** tried sans's "telescope" (big mistake) */
   f_state_telescope: info<boolean>(),

   /** triggered the hidden switch on the tem statue */
   f_state_temstatue: info<boolean>(),

   /** won a game of thundersnail */
   f_state_thundersnail_win: info<boolean>(),

   /** unlocked the hidden secondary piano puzzle */
   f_state_truth: info<boolean>(),

   /** unlocked hapstablook's house with the mystery key */
   f_state_hapstadoor: info<boolean>(),

   /** assist used for madjick */
   assist_madjick: info<boolean>(),

   /** assist used for knightknight */
   assist_knightknight: info<boolean>(),

   // monster flirt states
   flirt_dogamy: info<boolean>(),
   flirt_dogaressa: info<boolean>(),
   flirt_doge: info<boolean>(),
   flirt_doggo: info<boolean>(),
   flirt_froggit: info<boolean>(),
   flirt_greatdog: info<boolean>(),
   flirt_jerry: info<boolean>(),
   flirt_lesserdog: info<boolean>(),
   flirt_loox: info<boolean>(),
   flirt_maddummy: info<boolean>(),
   flirt_mettaton: info<boolean>(),
   flirt_migosp: info<boolean>(),
   flirt_migospel: info<boolean>(),
   flirt_moldbygg: info<boolean>(),
   flirt_moldsmal: info<boolean>(),
   flirt_mouse: info<boolean>(),
   flirt_muffet: info<boolean>(),
   flirt_mushy: info<boolean>(),
   flirt_papyrus: info<boolean>(),
   flirt_radtile: info<boolean>(),
   flirt_rg03: info<boolean>(),
   flirt_rg04: info<boolean>(),
   flirt_shyren: info<boolean>(),
   flirt_spacetop: info<boolean>(),
   flirt_stardrake: info<boolean>(),
   flirt_undyne: info<boolean>(),
   flirt_whimsun: info<boolean>(),
   flirt_woshua: info<boolean>(),
   flirt_perigee: info<boolean>(),
   flirt_pyrope: info<boolean>(),
   flirt_tsundere: info<boolean>(),
   flirt_madjick: info<boolean>(),
   flirt_knightknight: info<boolean>(),
   flirt_froggitex: info<boolean>(),
   flirt_whimsalot: info<boolean>(),
   flirt_glyde: info<boolean>(),
   flirt_astigmatism: info<boolean>(),
   flirt_mushketeer: info<boolean>(),

   /** got fries */
   fryz: info<boolean>(),

   /** true if genocide was started */
   genocide: info<boolean>(),

   /** purchased dimensional bedroom */
   a_state_bedroom: info<boolean>(),

   /** on the line with alphys */
   a_state_corecall: info<boolean>(),

   /** switched sides */
   a_state_flipflopper: info<boolean>(),

   /** backtrack before hitting button */
   a_state_backtracker: info<boolean>(),

   /** killed core warrior path 1 */
   a_state_corekill1: info<boolean>(),

   /** killed core warrior path 2 */
   a_state_corekill2: info<boolean>(),

   /** heard narrator rant */
   heard_narrator: info<boolean>(),

   /** got the LEGENDARY ARTIFACT */
   item_artifact: info<boolean>(),

   /** got napstablook's homemade pie */
   item_blookpie: info<boolean>(),

   /** got the hoverboots */
   item_boots: info<boolean>(),

   /** got the chocolate */
   item_chocolate: info<boolean>(),

   /** got the electrospear */
   item_electrospear: info<boolean>(),

   /** got the augmented eye */
   item_eye: info<boolean>(),

   /** got the power glove */
   item_glove: info<boolean>(),

   /** got the AR goggles */
   item_goggles: info<boolean>(),

   /** got the halo */
   item_halo: info<boolean>(),

   /** got the flight suit */
   item_jumpsuit: info<boolean>(),

   /** got the little dipper */
   item_little_dipper: info<boolean>(),

   /** got the datapad */
   item_padd: info<boolean>(),

   /** got the cheesecake */
   item_quiche: info<boolean>(),

   /** got the temy armor */
   item_temyarmor: info<boolean>(),

   /** got time versus money first show item (radio) */
   item_tvm_radio: info<boolean>(),

   /** got time versus money 2nd show item (fireworks) */
   item_tvm_fireworks: info<boolean>(),

   /** got time versus money final show item (mewmew) */
   item_tvm_mewmew: info<boolean>(),

   /** got that face steak! */
   item_face_steak: info<boolean>(),

   /** got the void key */
   item_voidy: info<boolean>(),

   /** got the arc laser (AOE gun) */
   item_laser: info<boolean>(),

   /** got tac visor */
   item_visor: info<boolean>(),

   /** got the mystery key */
   item_mystery_key: info<boolean>(),

   /** got the mystery food */
   item_mystery_food: info<boolean>(),

   /** got the tablaphone */
   item_tablaphone: info<boolean>(),

   /** got the sonic repulsor */
   item_sonic: info<boolean>(),

   /** got the moon pie */
   item_moonpie: info<boolean>(),

   /** true if coffin key was taken */
   key_coffin: info<boolean>(),

   /** true if sock drawer was messed with */
   cetadel: info<boolean>(),

   /** killed shyren */
   killed_shyren: info<boolean>(),

   /** bullied shyren */
   bullied_shyren: info<boolean>(),

   /** killed glyde */
   killed_glyde: info<boolean>(),

   /** killed madjick */
   killed_madjick: info<boolean>(),

   /** killed knight knight */
   killed_knightknight: info<boolean>(),

   /** papyrus phone call */
   kitchencall: info<boolean>(),

   /** experienced long elevator yet */
   long_elevator: info<boolean>(),

   /** whether or not napstablook has been called about performing */
   napsta_performance: info<boolean>(),

   /** oops */
   oops: info<boolean>(),

   /** failed on papyrus's firewall */
   papyrus_fire: info<boolean>(),

   /** "asked" for piggyback ride */
   papyrus_piggy: info<boolean>(),

   /** do you have redeeming qualities? */
   papyrus_quality: info<boolean>(),

   /** papyrus special attack */
   papyrus_specatk: info<boolean>(),

   /** spared papyrus!?!?!?!?!??!?!?!!!?!?!?!/!/1/1/!?1/1/1/!?!?!?1//!/!/1/1/11//1/1?!?1/1?!?/1/1/1/!/1/1/?!/1/1/1/? */
   papyrus_secret: info<boolean>(),

   /** true if the capstation key was taken */
   s_state_capstation: info<boolean>(),

   /** narrator read you the book */
   s_state_chareader: info<boolean>(),

   /** narrator talked about the telescope */
   s_state_chargazer: info<boolean>(),

   /** true if stardrake is dead */
   s_state_chilldrake: info<boolean>(),

   /** encountered lesser dog */
   s_state_lesser: info<boolean>(),

   /** true if the math puzzle was beat */
   s_state_mathpass: info<boolean>(),

   /** beat sans high score on xtower */
   s_state_million: info<boolean>(),

   /** but u were too edgy */
   s_state_million_garb: info<boolean>(),

   /** true if the coins in papyrus's couch were taken */
   s_state_pilfer: info<boolean>(),

   /** true if you didnt understand the explanation */
   s_state_puzzlenote: info<boolean>(),

   /** redbook */
   s_state_redbook: info<boolean>(),

   /** made a reservation at the start inn */
   s_state_reservation: info<boolean>(),

   /** used papyrus sink */
   s_state_papsink: info<boolean>(),

   /** toriel offers snail pie instead */
   snail_pie: info<boolean>(),

   // monster "spare" states (changed their lives)
   spared_froggit: info<boolean>(),
   spared_jerry: info<boolean>(),
   spared_loox: info<boolean>(),
   spared_migosp: info<boolean>(),
   spared_moldbygg: info<boolean>(),
   spared_moldsmal: info<boolean>(),
   spared_mouse: info<boolean>(),
   spared_mushy: info<boolean>(),
   spared_radtile: info<boolean>(),
   spared_shyren: info<boolean>(),
   spared_spacetop: info<boolean>(),
   spared_stardrake: info<boolean>(),
   spared_whimsun: info<boolean>(),
   spared_woshua: info<boolean>(),
   spared_perigee: info<boolean>(),
   spared_pyrope: info<boolean>(),
   spared_tsundere: info<boolean>(),
   spared_madjick: info<boolean>(),
   spared_knightknight: info<boolean>(),
   spared_froggitex: info<boolean>(),
   spared_whimsalot: info<boolean>(),
   spared_glyde: info<boolean>(),
   spared_astigmatism: info<boolean>(),
   spared_mushketeer: info<boolean>(),

   /** first starbert collectible */
   starbertA: info<boolean>(),

   /** second starbert collectible */
   starbertB: info<boolean>(),

   /** third starbert collectible */
   starbertC: info<boolean>(),

   /** stole from blook shop */
   steal_blook: info<boolean>(),

   /** stole from hare shop */
   steal_hare: info<boolean>(),

   /** stole from tem shop */
   steal_tem: info<boolean>(),

   /** stole from thrift shop */
   steal_gossip: info<boolean>(),

   /** true if toriel was spoken to once */
   toriel_ask: info<boolean>(),

   /** true if asked to go home */
   toriel_home: info<boolean>(),

   /** true if toriel can be called after the battle */
   toriel_phone: info<boolean>(),

   /** whether or not toriel saw twinkly attack frisk */
   toriel_twinkly: info<boolean>(),

   /** made undyne go "hard mode" */
   undyne_hardmode: info<boolean>(),

   /** true if player took last nap */
   w_state_catnap: info<boolean>(),

   /** true if player read 1 page in the diary */
   w_state_diary: info<boolean>(),

   /** left battle room */
   w_state_fightroom: info<boolean>(),

   /** true if soda was taken */
   w_state_soda: info<boolean>(),

   /** true if steak was taken */
   w_state_steak: info<boolean>(),

   /** talked to latetoriel */
   w_state_latetoriel: info<boolean>(),

   /** frisk has the W A T U H */
   water: info<boolean>(),

   /** it's onionsan! onionsan, y'hear! */
   onionsan: info<boolean>(),

   /** ate gumbert :sob: */
   stargum: info<boolean>()
};

const dataNumber = {
   /**
    * alphys opinion of you
    * ```md
    * 0 - doesnt mind at all
    * 1 - sucks but its fine i guess
    * 2 - youre awful (or neutral genocide)
    * 3 - geno
    * ```
    */
   bad_lizard: info<0 | 1 | 2 | 3>(),

   /** random number generator base values */
   base1: info<number>(),

   /** how many times "Say Hello" was used in the CELL */
   cell_hello: info<number>(),

   /**
    * which flavor of pie was chosen
    * ```md
    * 0 - butterscotch
    * 1 - cinnamon
    * ```
    */
   choice_flavor: info<0 | 1>(),

   /** encounters in current room */
   encounters: info<number>(),

   /** current EXP (LV is calculated from this) */
   exp: info<number>(),

   /** electro dampening fluids taken */
   fluids: info<number>(),

   /** current G */
   g: info<number>(),

   /** current HP */
   hp: info<number>(),

   /** kill count */
   kills: info<number>(),

   /** core kill count */
   corekills: info<number>(),

   /** aerialis kill count */
   kills_aerialis: info<number>(),

   /** foundry kill count */
   kills_foundry: info<number>(),

   /** starton kill count */
   kills_starton: info<number>(),

   /** outlands kill count */
   kills_wastelands: info<number>(),

   /** total bullycount */
   bully: info<number>(),

   /** aerialis bullycount */
   bully_aerialis: info<number>(),

   /** foundry bullycount */
   bully_foundry: info<number>(),

   /** starton bullycount */
   bully_starton: info<number>(),

   /** outlands bullycount */
   bully_wastelands: info<number>(),

   /**
    * progress in the outertale story
    * ```md
    * > progress in outlands
    * 0 - new game
    * 1 - met twinkly
    * 2 - was shown first puzzle
    * 2.01 - toriel left first puzzle room
    * 2.1 - was shown second puzzle
    * 2.11 - first rung passed
    * 2.12 - second rung passed
    * 2.2 - third rung passed, second puzzle done
    * 2.21 - toriel left second puzzle room
    * 2.3 - was shown dummy
    * 2.31 - asked toriel about conversation topics
    * 2.32 - went to toriel twice
    * 2.4 - dummy done
    * 2.41 - toriel left dummy room
    * 2.5 - was asked to solve third puzzle
    * 2.6 - encountered froggit
    * 2.601 - interacted with terminal once
    * 2.602 - talked to toriel once
    * 2.603 - interacted with terminal once, talked to toriel once
    * 2.61 - toriel entered password for you
    * 2.62 - toriel left room
    * 2.7 - was asked to be independent
    * 2.71 - left zigzag room before completing test
    * 3 - got cell phone
    * 4 - toriel left the zigzag room
    * 4.1 - what the dog doin?
    * 4.2 - tori got the phone back
    * 5 - entered the next room
    * 5.1 - completed first puzzle
    * 5.2 - completed second puzzle
    * 5.3 - completed third puzzle
    * 5.4 - completed fourth puzzle
    * 6 - encountered napstablook
    * 6.1 - completed ghost battle
    * 6.2 - heard narrator rant about their childhood
    * 7 - met toriel in courtyard
    * 8 - toriel took you to your room
    * 8.1 - slept in the bed (random encounters disabled)
    * 8.2 - talked to toriel in the front room (sidequest enabled)
    * 9 - toriel is preparing breakfast
    * 9.1 - toriel finished prepping the breakfast
    * 10 - spoke to toriel about leaving
    * 11 - met toriel in hallway 1
    * 12 - met toriel in hallway 2
    * 13 - met toriel in hallway 3
    * 14 - battled toriel
    * 15 - met twinkly again
    * 16 - exited the outlands
    *
    * > progress in starton and starton town
    * 16.1 - appeared in starton
    * 17 - intro
    * 17.001 - intro point of no return
    * 17.01 - sans dialogue 1
    * 17.02 - sans dialogue 2
    * 17.03 - sans dialogue 3
    * 17.1 - (geno: asriel gave you the rundown)
    * 18 - met sans and pap again
    * 18.1 - (geno: asriel talked about the sentry station)
    * 19 - crossed doggo
    * 20 - completed papyrus's maze
    * 20.2 - encounter lesser dog
    * 21 - "completed" sans's crossword puzzle
    * 23 - dog marriage
    * 24 - beat papyrus puzzle 1
    * 24.1 - met paps in next room
    * 24.101 - pre puzzle help 1
    * 24.11 - pre puzzle help 2
    * 24.2 - talked to paps for puzzle help
    * 24.3 - got "solution" from pap
    * 25 - beat papyrus puzzle 2
    * 26 - got past papyrus's "jenga" puzzle
    * 27 - beat papyrus puzzle 3
    * 28 - crossed greater dog
    * 29 - the gauntlet of deadly terror!
    * 30 - entered starton town
    * 30.1 - narrator talked before papyrus battle
    * 31 - papyrus battle
    * 32 - exited starton (geno: asgore encounter 1)
    *
    * > progress in foundry
    * 33 - completed first date with sans
    * 35 - crossed doge
    * 36 - solved lazor puzzle 1
    * 37 - solved lazor puzzle 2
    * 37.1 - (geno: asgore encounter 2)
    * 37.11 - saw pap and undyne (geno: just undyne)
    * 37.2 - crossed the bridge
    * 38.01 - chase 1 end
    * 38.1 - (geno: asriel left)
    * 38.2 - (geno: asgore encounter 3)
    * 39 - crossed muffet
    * 40 - shyren
    * 42 - undyne chase 2
    * 42.1 - dummy
    * 43 - (geno: asriel returned with monster kid)
    * 44 - (geno: exit hub, asgore encounter 4)
    * 45 - solved lazor puzzle 3
    * 46 - cornered by undyne
    * 47 - monster kid bridge cutscene (geno: kiddprompt 1)
    * 47.01 - (geno: kiddprompt 2)
    * 47.02 - (geno: kiddprompt 3)
    * 47.03 - (geno: kiddprompt 4)
    * 47.1 - talked to undyne before fight
    * 47.2 - undyne chase active
    * 48 - undyne fight
    *
    * > progress in aerialis
    * 48.1 - updated bad_lizard
    * 49 - met alphys (and first MTT show)
    * 50 - liftgates were explained
    * 51 - RG 01/02
    * 52 - barricades 1
    * 53 - barricades 2
    * 54 - barricades 3
    * 55 - first puzzle complete!
    * 55.1 - second MTT show started
    * 56 - second MTT show
    * 57 - passed sans
    * 58 - napstablook friend request
    * 58.1 - second puzzle (checkpoint 1)
    * 58.2 - second puzzle (checkpoint 2)
    * 59 - second puzzle complete?
    * 59.1 - third MTT show started
    * 60 - third MTT show
    * 61 - RG 03/04
    * 62 - barricades passed
    * 63 - napstablook invited you to the right
    * 64 - alphys appeared at elevator
    *
    * > progress in rec center/core/citadel/archive
    * 64.1 - mtt show started without alphys
    * 65 - passed mtt show (rec center access)
    * 66 - completed second date with sans
    * 66.1 - first mercenary battle
    * 66.2 - second mercenary battle
    * 67 - unlocked the CORE door
    * 67.1 - mushketeer
    * 68 - MTT fight
    * 68.1 - end of alphys conversation
    * 69 - arrived at citadel
    * ```
    */
   plot: info<
      | 0
      | 1
      | 2
      | 2.01
      | 2.1
      | 2.11
      | 2.12
      | 2.2
      | 2.21
      | 2.3
      | 2.31
      | 2.32
      | 2.4
      | 2.41
      | 2.5
      | 2.6
      | 2.601
      | 2.602
      | 2.603
      | 2.61
      | 2.62
      | 2.7
      | 2.71
      | 3
      | 4
      | 4.1
      | 4.2
      | 5
      | 5.1
      | 5.2
      | 5.3
      | 5.4
      | 6
      | 6.1
      | 6.2
      | 7
      | 8
      | 8.1
      | 8.2
      | 9
      | 9.1
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15
      | 16
      | 16.1
      | 17
      | 17.001
      | 17.01
      | 17.02
      | 17.03
      | 17.1
      | 18
      | 18.1
      | 19
      | 20
      | 20.2
      | 21
      | 23
      | 24
      | 24.1
      | 24.101
      | 24.11
      | 24.2
      | 24.3
      | 25
      | 26
      | 27
      | 28
      | 29
      | 30
      | 30.01
      | 30.02
      | 30.1
      | 31
      | 32
      | 33
      | 35
      | 36
      | 37
      | 37.1
      | 37.11
      | 37.2
      | 38.01
      | 38.1
      | 38.2
      | 39
      | 40
      | 42
      | 42.1
      | 43
      | 44
      | 45
      | 46
      | 47
      | 47.01
      | 47.02
      | 47.03
      | 47.1
      | 47.2
      | 48
      | 48.1
      | 49
      | 50
      | 51
      | 52
      | 53
      | 54
      | 55
      | 55.1
      | 56
      | 57
      | 58
      | 58.1
      | 58.2
      | 59
      | 59.1
      | 60
      | 61
      | 62
      | 63
      | 64
      | 64.1
      | 65
      | 66
      | 66.1
      | 66.2
      | 67
      | 67.1
      | 68
      | 68.1
      | 69
   >(),

   /**
    * toriel call count
    * ```md
    * > toriel
    * 0 - no call yet
    * 1 - pie flavor
    * 2 - other pie flavor
    * 3 - allergies
    * 4 - inventory space
    *
    * > papyrus
    * 5 - worn clothing (secret: check in 1)
    * 6 - friends (secret: check in 2)
    *
    * > alphys
    * 7 - entered h_hub5 (saw citadelevator door)
    * 7.1 - saw CORE room
    * 8 - CORE exit
    * ```
    */
   plot_call: info<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 7.1 | 8>(),

   /**
    * date count
    * ```md
    * 0 - no date yet
    * 0.1 - talked to papyrus outside
    * 0.2 - went into papyrus room
    * 1 - papyrus date done
    * 1.1 - left papyrus's room (used for phone calls)
    * 1.2 - talked to papyrus outside the house
    * 1.3 - undyne house accessible
    * 2 - undyne date done
    * 2.1 - left undyne's house
    * ```
    */
   plot_date: info<0 | 0.1 | 0.2 | 1 | 1.1 | 1.2 | 1.3 | 2 | 2.1>(),

   /**
    * monster kid dialogue triggers progress
    * ```md
    * 0 - no dialogue yet
    * 1 - error room dialogue
    * 2 - muffet dialogues
    * 3 - pathway dialogue
    * 3.1 - path dialogue 2
    * 3.2 - path dialogue 3
    * 3.3 - path dialogue 2
    * 3.4 - view dialogue
    * 4 - view exit
    * ```
    */
   plot_kidd: info<0 | 1 | 2 | 3 | 3.1 | 3.2 | 3.3 | 3.4 | 4>(),

   /** hub dialogue (lv0/genocide) */
   plot_approach: info<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(),

   /** outernet messages (checked) */
   plot_pmcheck: info<number>(),

   /** stalker twinkly */
   plot_stalker: info<number>(),

   /** shop talk - undyne (after geno death) */
   shop_deadfish: info<number>(),

   /** shop talk - gerson */
   shop_gerson: info<number>(),

   /** shop talk - homeworld */
   shop_homeworld: info<number>(),

   /** shop talk - life advice (bpants) */
   shop_bpants_advice: info<number>(),

   /** shop talk - the hub (bpants) */
   shop_bpants_hub: info<number>(),

   /** shop talk - alphys (gossip) */
   shop_gossip_alphys: info<number>(),

   /** shop talk - hub (gossip) */
   shop_gossip_hub: info<number>(),

   /** total unforced hits taken in battle */
   hits: info<number>(),

   /** temmie special sell countdown */
   specsell: info<number>(),

   /** number of barricades successfully passed */
   state_aerialis_barricuda: info<number>(),

   /** kills when mtt warned you */
   state_aerialis_basekill: info<number>(),

   /** how many corn dogs purchased (used for corn goat) */
   state_aerialis_corngoat: info<0 | 1 | 2>(),

   /**
    * capstation lockup state
    * ```md
    * 0 - not opened
    * 1 - opened, but untouched
    * 2 - took an item
    * 3 - took another item
    * 4 - cleaned 'er out
    * ```
    */
   state_aerialis_lockup: info<0 | 1 | 2 | 3 | 4>(),

   /** asriel monologues */
   state_aerialis_monologue: info<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(),

   /** times seen monologue 1 */
   state_aerialis_monologue_iteration1: info<number>(),

   /** times seen monologue 2 */
   state_aerialis_monologue_iteration2: info<number>(),

   /** mtt (ex) "quiz" "answer" */
   state_aerialis_mttanswer: info<0 | 1 | 2 | 3 | 4>(),

   /** phase offset */
   state_aerialis_puzzle2os: info<number>(),

   /** times failed on talent show */
   state_aerialis_talentfails: info<number>(),

   /**
    * outcome of the crafting show
    * ```md
    * 0 - didn't use jetpack
    * 1 - used jetpack, but failed to reach end
    * 2 - used jetpack, got kinda far but still failed to reach end
    * 3 - reached end just in time
    * 4 - reached end easily
    * ```
    */
   state_aerialis_crafterresult: info<0 | 1 | 2 | 3 | 4>(),

   /** how close you were to guessing prices exactly */
   state_aerialis_valuediff: info<number>(),

   /**
    * royal guards battle outcome
    * ```md
    * 0 - confession
    * 1 - killed
    * ```
    */
   state_aerialis_royalguards: info<0 | 1>(),

   /** mk spear reaction */
   state_foundry_kiddreaction: info<number>(),

   /** astronaut foods taken */
   state_foundry_astrofood: info<number>(),

   /**
    * napstablook hangout progress
    * ```md
    * 0 - not visited yet
    * 0.1 - blook seen in hub
    * 0.2 - blook seen in blooky room
    * 1 - visited
    * 2 - ate from the fridge (thundersnail unlocked)
    * ```
    */
   state_foundry_blookdate: info<0 | 0.1 | 0.2 | 1 | 2>(),

   /**
    * music playing in napstablook's house
    * ```md
    * 0 - no music playing
    * 1 - spooktune
    * 2 - spookwave
    * 3 - spookwaltz
    * ```
    */
   state_foundry_blookmusic: info<0 | 1 | 2 | 3>(),

   /**
    * doge battle outcome
    * ```md
    * 0 - spared
    * 1 - killed
    * 2 - petted (lv0)
    * ```
    */
   state_foundry_doge: info<0 | 1 | 2>(),

   /** number of deaths witnessed by monster kid */
   state_foundry_kidddeath: info<number>(),

   /** number of battle turns taken by monster kid */
   state_foundry_kiddturns: info<number>(),

   /**
    * outcome of mad dummy battle
    * ```md
    * 0 - spared
    * 1 - killed (glad dummy)
    * 2 - befriended (unused, check toriel_phone instead)
    * 3 - bored
    * 4 - hugged (glad dummy)
    * 5 - slapped (glad dummy)
    * ```
    */
   state_foundry_maddummy: info<0 | 1 | 3 | 4 | 5>(),

   /**
    * muffet battle outcome
    * ```md
    * 0 - spared
    * 1 - killed
    * 2 - bribed (lv0)
    * ```
    */
   state_foundry_muffet: info<0 | 1 | 2>(),

   /**
    * npc86 survey
    * ```md
    * 0 - not surveyed yet
    * 1 - declined survey
    * 2 - accepted survey, answered "red"
    * 3 - accepted survey, answered "green"
    * 4 - accepted survey, answered "blue"
    * 5 - accepted survey, answered "not sure"
    * ```
    */
   state_foundry_npc86: info<0 | 1 | 2 | 3 | 4 | 5>(),

   /**
    * npc86 opinion
    * ```md
    * 0 - not asked yet
    * 1 - replied with "love"
    * 2 - replied with "disgust"
    * 3 - replied with "none"
    * 4 - replied with "not sure"
    * ```
    */
   state_foundry_npc86_feelings: info<0 | 1 | 2 | 3 | 4>(),

   /**
    * npc86 mood
    * ```md
    * 0 - not asked yet
    * 1 - replied with "good"
    * 2 - replied with "neutral"
    * 3 - replied with "bad"
    * 4 - replied with "not sure"
    * ```
    */
   state_foundry_npc86_mood: info<0 | 1 | 2 | 3 | 4>(),

   /** number of punch cards available */
   state_foundry_punchcards: info<number>(),
   // positions of foundry puzzle pylons
   state_foundry_puzzlepylon1Ax: info<number>(),
   state_foundry_puzzlepylon1Ay: info<number>(),
   state_foundry_puzzlepylon1Bx: info<number>(),
   state_foundry_puzzlepylon1By: info<number>(),
   state_foundry_puzzlepylon2Ax: info<number>(),
   state_foundry_puzzlepylon2Ay: info<number>(),
   state_foundry_puzzlepylon2Bx: info<number>(),
   state_foundry_puzzlepylon2By: info<number>(),
   state_foundry_puzzlepylon2Cx: info<number>(),
   state_foundry_puzzlepylon2Cy: info<number>(),
   state_foundry_puzzlepylon2Dx: info<number>(),
   state_foundry_puzzlepylon2Dy: info<number>(),
   state_foundry_puzzlepylon3Ax: info<number>(),
   state_foundry_puzzlepylon3Ay: info<number>(),
   state_foundry_puzzlepylon3Bx: info<number>(),
   state_foundry_puzzlepylon3By: info<number>(),
   state_foundry_puzzlepylon3Cx: info<number>(),
   state_foundry_puzzlepylon3Cy: info<number>(),
   state_foundry_puzzlepylon3Dx: info<number>(),
   state_foundry_puzzlepylon3Dy: info<number>(),
   state_foundry_puzzlepylon3Ex: info<number>(),
   state_foundry_puzzlepylon3Ey: info<number>(),
   state_foundry_puzzlepylon3Fx: info<number>(),
   state_foundry_puzzlepylon3Fy: info<number>(),
   state_foundry_puzzlepylon3Gx: info<number>(),
   state_foundry_puzzlepylon3Gy: info<number>(),
   state_foundry_puzzlepylon3Hx: info<number>(),
   state_foundry_puzzlepylon3Hy: info<number>(),

   /** number of spiders encountered in muffet area */
   state_foundry_spiders: info<number>(),

   /**
    * state of talking to napstablook about music
    * ```md
    * 0 - not talked yet
    * 1 - talked once
    * 2 - was asked about hidden song
    * 3 - approved of hidden song
    * 4 - disapproved of hidden song
    * ```
    */
   state_foundry_swansong: info<0 | 1 | 2 | 3 | 4>(),

   /**
    * temmie pet state
    * ```md
    * 0 - not asked to pet temmie yet
    * 1 - pet temmie
    * 2 - DIDNT PET TEMMIE!??!?!?!?!?!?
    * ```
    */
   state_foundry_tempet: info<0 | 1 | 2>(),

   /** number of times thundersnail was played */
   state_foundry_thundersnail: info<number>(),

   /**
    * final outcome of undyne
    * ```md
    * 0 - spared
    * 1 - left for dead
    * 2 - killed
    * ```
    */
   state_foundry_undyne: info<0 | 1 | 2>(),

   /**
    * times mk bullied
    * ```md
    * 0 - none
    * 1 - once
    * 2 - repeated
    * ```
    */
   state_foundry_kiddbully: info<number>(),

   /** times alphys opened the phone lines */
   state_aerialis_coreenter: info<number>(),

   /** times alphys closed the phone lines */
   state_aerialis_coreleave: info<number>(),

   /**
    * core - puzzler's path state
    * ```md
    * 0 - no puzzle solved
    * 1 - first puzzle solved
    * 2 - second puzzle solved
    * 3 - switch was flipped
    * ```
    */
   state_aerialis_corepath_puzzle: info<0 | 1 | 2 | 3>(),

   /**
    * core - warrior's path state
    * ```md
    * 0 - no battle passed
    * 1 - first battle passed
    * 2 - second battle passed
    * 3 - switch was flipped
    * ```
    */
   state_aerialis_corepath_warrior: info<0 | 1 | 2 | 3>(),

   /**
    * core - path state
    * ```md
    * 0 - no side chosen yet
    * 1 - currently on puzzler's side
    * 2 - currently on warrior's side
    * ```
    */
   state_aerialis_corepath_state: info<0 | 1 | 2>(),

   /**
    *
    */

   /** times captured by papyrus */
   state_papyrus_capture: info<number>(),

   /**
    * WHAT WILL YOU DO WITH THE SPAGHETTI?
    * ```md
    * 0 - not talked yet
    * 1 - said you'd share it
    * 2 - said you'd eat it
    * ```
    */
   state_papyrus_spaghet: info<0 | 1 | 2>(),

   /**
    * papyrus side house
    * ```md
    * 0 - not looked
    * 1 - looked and appreciated
    * 2 - looked and didn't appreciate
    * ```
    */
   state_papyrus_view: info<0 | 1 | 2>(),

   /**
    * state of the pie given by toriel
    * ```md
    * 0 - not given
    * 1 - given
    * 2 - put into inventory
    * ```
    */
   state_pie: info<0 | 1 | 2>(),

   /**
    * asriel bridge wait (defunct)
    * ```md
    * 0 - not talked yet
    * 1 - got told about monsters
    * 2 - was asked to proceed
    * ```
    */
   state_starton_azzybridge: info<0 | 1 | 2>(),

   /**
    * doggo battle outcome
    * ```md
    * 0 - petted
    * 1 - played fetch
    * 2 - killed
    * ```
    */
   state_starton_doggo: info<0 | 1 | 2>(),

   /**
    * dog marriage battle outcome
    * ```md
    * 0 - petted
    * 1 - played fetch
    * 2 - killed
    * ```
    */
   state_starton_dogs: info<0 | 1 | 2>(),

   // number of nicecreams stolen
   state_starton_creamz: info<number>(),

   /**
    * greater dog battle outcome
    * ```md
    * 0 - contented
    * 1 - played fetch
    * 2 - killed
    * 3 - bored out
    * 4 - bully
    * ```
    */
   state_starton_greatdog: info<0 | 1 | 2 | 3 | 4>(),

   /** play fetch later then the start at lv 0 */
   state_starton_latefetch: info<number>(),

   /**
    * lesser dog battle outcome
    * ```md
    * 0 - petted
    * 1 - played fetch
    * 2 - killed
    * 3 - bully
    * ```
    */
   state_starton_lesserdog: info<0 | 1 | 2 | 3>(),

   /**
    * number of nice creams purchased
    * ```md
    * 0.5 - met guy
    * 0.75 - guy gave you free nice cream
    * ```
    */
   state_starton_nicecream: info<number>(),

   /**
    * npc98 state
    * ```md
    * 0 - not met yet
    * 1 - got chip 1
    * 2 - got chip 2
    * 3 - ohno
    * 4 - betrayal
    * 4.1 - late betrayal
    * 5 - stole chip 3
    * ```
    */
   state_starton_npc98: info<0 | 1 | 2 | 3 | 4 | 4.1 | 5>(),

   /**
    * papyrus battle state
    * ```md
    * 0 - friend
    * 1 - dead
    * ```
    */
   state_starton_papyrus: info<0 | 1>(),

   /** puzzle states */
   state_starton_s_puzzle1: info<number>(),
   state_starton_s_puzzle2: info<number>(),
   state_starton_s_puzzle3: info<number>(),

   /**
    * state of the inn
    * ```md
    * 0 - not used
    * 1 - used free
    * 2 - used by paying
    * ```
    */
   state_starton_sleep: info<0 | 1 | 2>(),

   /**
    * HEY YOU TOUCHA MY SPAGHET
    * ```md
    * 0 - not touched
    * 1 - lowered
    * 2 - taken
    * ```
    */
   state_starton_spaghetti: info<0 | 1 | 2>(),

   /** hi-score on the xtower game thing */
   state_starton_xtower: info<number>(),

   /**
    * state of toriel's book
    * ```md
    * 0 - not asked
    * 1 - asked
    * 2 - head the book
    * ```
    */
   state_toriel_book: info<0 | 1 | 2>(),

   /**
    * state of toriel's breakfast
    * ```md
    * 0 - not asked
    * 1 - asked
    * 2 - preparing
    * 3 - prepared
    * 4 - put into inventory
    * ```
    */
   state_toriel_food: info<0 | 1 | 2 | 3 | 4>(),

   /** times the player has "run away" from home ahead of toriel */
   state_toriel_runaway: info<number>(),

   /** items taken from the vending machine (0-4) */
   state_wastelands_candy: info<number>(),

   /**
    * state of the smashed pie
    * ```md
    * 0 - didn't smash
    * 1 - smashed before
    * 2 - smashed after
    * ```
    */
   state_wastelands_mash: info<number>(),

   /**
    * dummy battle state
    * ```md
    * 0 - talk ending
    * 1 - dummy was attacked (and killed)
    * 2 - ran away from the dummy
    * 3 - shenanigans ending
    * 4 - hug ending
    * 5 - slap my nuts
    * 6 - flirt
    * ```
    */
   state_wastelands_dummy: info<0 | 1 | 2 | 3 | 4 | 5 | 6>(),

   /**
    * first froggit battle state
    * ```md
    * 0 - no action yet
    * 1 - compliment
    * 2 - flirt
    * 3 - flee
    * 4 - threaten
    * 5 - fight
    * ```
    */
   state_wastelands_froggit: info<0 | 1 | 2 | 3 | 4 | 5>(),

   /**
    * napstablook battle state
    * ```md
    * 0 - cheer/spare ending
    * 1 - flirt ending
    * 2 - sour ending
    * 3 - awkward
    * 4 - the "nothing personal" ending
    * 5 - skipped battle
    * ```
    */
   state_wastelands_napstablook: info<0 | 1 | 2 | 3 | 4 | 5>(),

   /**
    * toriel battle state
    * ```md
    * 0 - happy
    * 1 - sad
    * 2 - dead
    * 3 - flee ending
    * 4 - early flee ending
    * ```
    */
   state_wastelands_toriel: info<0 | 1 | 2 | 3 | 4>(),

   /** steps in current room */
   steps: info<number>(),

   /** elapsed time in frames */
   time: info<number>(),

   /** undyne attack runoff (turns until she believes your pleas) */
   undyne_attackRunoff: info<number>(),

   /** undyne chaser position x */
   undyne_chaseX: info<number>(),

   /** undyne chaser position y */
   undyne_chaseY: info<number>(),

   /** undyne HP */
   undyne_hp: info<number>(),

   /**
    * undyne fight phase
    * ```md
    * 0 - phase 1 (not encountered yet)
    * 1 - phase 2
    * 2 - phase 3
    * 3 - phase 4
    * 4 - phase 4 (repeat encounter)
    * ```
    */
   undyne_phase: info<0 | 1 | 2 | 3 | 4>(),

   /** undyne fight speed (challenge/plead) */
   undyne_speed: info<number>()
};

const dataString = {
   /** current armor */
   armor: info<string>(),

   /** last used door */
   chasecheckpoint: info<string>(),

   /** name of the first fallen human */
   name: info<string>(),

   /** messages sent by alphys */
   pms: info<string>(),

   /** current room */
   room: info<string>(),

   /** room that undyne dies in */
   state_foundry_deathroom: info<string>(),

   /** laser state in foundry puzzle 1 */
   state_foundry_f_puzzle1: info<string>(),

   /** laser state in foundry puzzle 2 */
   state_foundry_f_puzzle2: info<string>(),

   /** traps set off in chase */
   state_foundry_f_chaseTrap: info<string>(),

   /** holes in chase */
   state_foundry_f_chaseHole: info<string>(),

   /** laser state in foundry puzzle 3 */
   state_foundry_f_puzzle3: info<string>(),

   /** selected pattern in starton puzzle 3 */
   state_starton_s_puzzle3: info<string>(),

   /** monster kid state in town */
   state_starton_s_town1: info<string>(),

   /** pattern in core puzzle 1 */
   state_aerialis_a_core_left1: info<string>(),

   /** pattern in core puzzle 2 */
   state_aerialis_a_core_left2: info<string>(),

   /** current weapon */
   weapon: info<string>()
};

const flagBoolean = {
   /** true if music is disabled */
   option_music: info<boolean>(),

   /** left-handed mobile */
   option_right: info<boolean>(),

   /** true if sfx is disabled */
   option_sfx: info<boolean>(),

   /** true if twinkly hinted at his plan */
   reveal_twinkly: info<boolean>(),

   /** seen core */
   w_state_core: info<boolean>(),

   /** asriel commented on chara landing spot */
   asriel_trashcom: info<boolean>(),

   /** asriel knows you know where the cellphone is. */
   asriel_phone: info<boolean>(),

   /** asriel knows who shorted out the electrics */
   asriel_electrics: info<boolean>(),

   /** asriel commented about burger */
   asriel_bpants: info<boolean>(),

   /** asriel knows his royal access code works */
   asriel_access: info<boolean>(),

   /** seen mtt cutscene */
   legs: info<boolean>(),

   /** true if twinkly post-geno reset end dialogue happened */
   confront_twinkly: info<boolean>(),

   /** true if twinkly post-geno reset end dialogue happened (mad version) */
   enrage_twinkly: info<boolean>(),

   /** completed pacifist ending, unlocked true reset */
   true_reset: info<boolean>()
};

const flagNumber = {
   /** assist realization state (undyne ex) */
   azzy_assist: info<number>(),

   /** times fought mtt neo */
   azzy_neo: info<number>(),

   /** shield pickup thing */
   azzy_neo_pickup: info<number>(),

   /** times died */
   deaths: info<number>(),

   /** how many times twinkly has been met */
   encounter_twinkly: info<number>(),

   // genocide asriel's memory
   ga_asriel0: info<number>(),
   ga_asriel1: info<number>(),
   ga_asriel3: info<number>(),
   ga_asriel6: info<number>(),
   ga_asriel9: info<number>(),
   ga_asriel10: info<number>(),
   ga_asriel17: info<number>(),
   ga_asriel20: info<number>(),
   ga_asriel24: info<number>(),
   ga_asriel26: info<number>(),
   ga_asriel28: info<number>(),
   ga_asriel29: info<number>(),
   ga_asriel30: info<number>(),
   ga_asriel30d: info<number>(),
   ga_asriel30x: info<number>(),
   ga_asriel31: info<number>(),
   ga_asriel32: info<number>(),
   ga_asriel33: info<number>(),
   ga_asriel35: info<number>(),
   ga_asriel38: info<number>(),
   ga_asriel40: info<number>(),
   ga_asriel43: info<number>(),
   ga_asriel46: info<number>(),
   ga_asriel49: info<number>(),
   ga_asriel52: info<number>(),
   ga_asriel53: info<number>(),
   ga_asriel54: info<number>(),
   ga_asriel55: info<number>(),
   ga_asrielMoneyX3: info<number>(),
   ga_asrielMoneyX4: info<number>(),
   ga_asrielBeast: info<number>(),
   ga_asrielCorner: info<number>(),
   ga_asrielDrawing: info<number>(),
   ga_asrielEcho1: info<number>(),
   ga_asrielEcho2: info<number>(),
   ga_asrielEcho3: info<number>(),
   ga_asrielEcho4: info<number>(),
   ga_asrielElite1: info<number>(),
   ga_asrielEpic: info<number>(),
   ga_asrielFetch: info<number>(),
   ga_asrielKidd1: info<number>(),
   ga_asrielKidd2: info<number>(),
   ga_asrielKiddFinal1: info<number>(),
   ga_asrielKiddFinal3a: info<number>(),
   ga_asrielKiddFinal3b: info<number>(),
   ga_asrielKiddWalk: info<number>(),
   ga_asrielNapstakill: info<number>(),
   ga_asrielPapyrus1: info<number>(),
   ga_asrielPuzzleStop1: info<number>(),
   ga_asrielRobo1: info<number>(),
   ga_asrielSpanner: info<number>(),
   ga_asrielStutter: info<number>(),
   ga_asrielUndying: info<number>(),
   ga_asrielUndyneX: info<number>(),
   ga_asrielLab1: info<number>(),
   ga_asrielLab2: info<number>(),
   ga_asrielLab3: info<number>(),
   ga_asrielGate: info<number>(),
   ga_asrielLift: info<number>(),
   ga_asrielSkySign1: info<number>(),
   ga_asrielTerminal1: info<number>(),
   ga_asrielDummy: info<number>(),
   ga_asrielGetThePhone: info<number>(),
   ga_asrielGetThePhone2: info<number>(),
   ga_asrielOutlands1: info<number>(),
   ga_asrielOutlands2: info<number>(),
   ga_asrielOutlands3: info<number>(),
   ga_asrielOutlands4: info<number>(),
   ga_asrielOutlands5: info<number>(),
   ga_asrielOutlands6: info<number>(),
   ga_asrielOutlands7: info<number>(),
   ga_asrielHotel0: info<number>(),
   ga_asrielElectrics0: info<number>(),
   ga_asrielHotel1: info<number>(),
   ga_asrielElectrics1: info<number>(),
   ga_asrielHotel2: info<number>(),
   ga_asrielCore0: info<number>(),
   ga_asrielCore1: info<number>(),
   ga_asrielCore2: info<number>(),
   ga_asrielCore4: info<number>(),
   ga_asrielCore5: info<number>(),
   ga_asrielCore6: info<number>(),
   ga_asrielCore7: info<number>(),
   ga_asrielDrink: info<number>(),
   ga_asrielFireplace: info<number>(),
   ga_asrielSpareketeer: info<number>(),
   ga_asrielSus1: info<number>(),
   ga_asrielXtower: info<number>(),
   ga_asrielCorenote: info<number>(),
   ga_asrielOnion: info<number>(),
   ga_asrielCoffin: info<number>(),
   ga_asrielTimewaster: info<number>(),
   ga_asrielDog: info<number>(),
   ga_asrielWreckage: info<number>(),
   ga_asrielMadfish: info<number>(),
   ga_asrielVirt: info<number>(),

   /**
    * genocide progression milestones
    * ```md
    * 0 - not milestone yet
    * 1 - end starton
    * 2 - end foundry
    * 3 - mtt announces his plan
    * 4 - end aerialis
    * ```
    */
   genocide_milestone: info<0 | 1 | 2 | 3 | 4>(),

   /** number of times the genocide route has started */
   genocide_twinkly: info<number>(),

   /** name hash (used for "easy to change, huh?") */
   hash: info<number>(),

   /** music level */
   option_music: info<number>(),

   /** sfx level */
   option_sfx: info<number>(),

   /**
    * twinkly's encounter state
    * ```md
    * 0 - has not hurt player yet
    * 1 - has hurt player
    * 1.5 - avoided pellets and reset
    * 2 - has hurt player and met them once again
    * 3 - has been burned by toriel
    * 4 - will not show up for some reason
    * ```
    */
   progress_twinkly: info<0 | 1 | 1.5 | 2 | 3 | 4>(),

   /**
    * state of toriel
    * ```md
    * 0 - not killed or spared
    * 1 - killed
    * 2 - killed, then spared
    * 3 - spared
    * 4 - spared, then killed
    * 5 - killed, then spared, then killed again
    * 6 - spared, then killed, then spared again
    * 7 - killed multiple times
    * 7.1 - killed multiple times (repeat dialogue 1)
    * 7.2 - killed multiple times (repeat dialogue 2)
    * 7.3 - killed multiple times (repeat dialogue 3)
    * 8 - spared multiple times
    * 8.1 - spared multiple times (repeat dialogue 1)
    * 8.2 - spared multiple times (repeat dialogue 2)
    * 8.3 - spared multiple times (repeat dialogue 3)
    * 9 - killed multi, then spared
    * 10 - spared multi, then killed
    * 11 - spared, then killed multi
    * 11.1 - spared, then killed multi (repeat dialogue 1)
    * 11.2 - spared, then killed multi (repeat dialogue 2)
    * 11.3 - spared, then killed multi (repeat dialogue 3)
    * 12 - killed, then spared multi
    * 12.1 - killed, then spared multi (repeat dialogue 1)
    * 12.2 - killed, then spared multi (repeat dialogue 2)
    * 12.3 - killed, then spared multi (repeat dialogue 3)
    * 13 - spared multi, then killed multi
    * 13.1 - spared multi, then killed multi (repeat dialogue 1)
    * 13.2 - spared multi, then killed multi (repeat dialogue 2)
    * 13.3 - spared multi, then killed multi (repeat dialogue 3)
    * 14 - killed multi, then spared multi
    * 14.1 - killed multi, then spared multi (repeat dialogue 1)
    * 14.2 - killed multi, then spared multi (repeat dialogue 2)
    * 14.3 - killed multi, then spared multi (repeat dialogue 3)
    * 15 - mix of outcomes
    * 15.1 - mix of outcomes (repeat dialogue 1)
    * 15.2 - mix of outcomes (repeat dialogue 2, twinkly gone)
    * ```
    */
   state_toriel: info<
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 7.1
      | 7.2
      | 7.3
      | 8
      | 8.1
      | 8.2
      | 8.3
      | 9
      | 10
      | 11
      | 11.1
      | 11.2
      | 11.3
      | 12
      | 12.1
      | 12.2
      | 12.3
      | 13
      | 13.1
      | 13.2
      | 13.3
      | 14
      | 14.1
      | 14.2
      | 14.3
      | 15
      | 15.1
      | 15.2
   >(),

   /** number of times undyne the undying has appeared */
   undying: info<number>()
};

const flagString = {} as CosmosKeyed<string>;

const dataBooleanStore = createDataStore<OutertaleDataBoolean>('b', false, dataBoolean);
const dataNumberStore = createDataStore<OutertaleDataNumber>('n', 0, dataNumber);
const dataStringStore = createDataStore<OutertaleDataString>('s', '', dataString);
const flagBooleanStore = createFlagStore<OutertaleFlagBoolean>('b', false, flagBoolean);
const flagNumberStore = createFlagStore<OutertaleFlagNumber>('n', 0, flagNumber);
const flagStringStore = createFlagStore<OutertaleFlagString>('s', '', flagString);

const save = {
   data: { b: dataBooleanStore, n: dataNumberStore, s: dataStringStore },
   dirty: false,
   flag: { b: flagBooleanStore, n: flagNumberStore, s: flagStringStore },
   internal: (() => {
      try {
         return CosmosUtils.parse(backend.data);
      } catch {
         return [];
      }
   })(),
   storage: {
      inventory: new OutertaleInventory(8, dataStringStore, index => `inventory_${index}`),
      dimboxA: new OutertaleInventory(10, dataStringStore, index => `dimboxA_${index}`),
      dimboxB: new OutertaleInventory(10, dataStringStore, index => `dimboxB_${index}`)
   },
   manager: ((): Storage => {
      if (backend.available) {
         return {
            clear () {
               save.internal.splice(0, save.internal.length);
               save.dirty = true;
            },
            getItem (key: string) {
               for (const item of save.internal) {
                  if (key === item[0]) {
                     return item[1];
                  }
               }
               return null;
            },
            key (index: number) {
               return save.internal[index]?.[0] ?? null;
            },
            get length () {
               return save.internal.length;
            },
            removeItem (key: string) {
               for (const [ index, item ] of save.internal.entries()) {
                  if (key === item[0]) {
                     save.internal.splice(index, 1);
                     save.dirty = true;
                     return;
                  }
               }
            },
            setItem (key: string, value: string) {
               for (const item of save.internal) {
                  if (key === item[0]) {
                     item[1] = value;
                     save.dirty = true;
                     return;
                  }
               }
               save.internal.push([ key, value ]);
               save.dirty = true;
            }
         };
      } else {
         return localStorage;
      }
   })(),
   namespace: new URLSearchParams(location.search).get('namespace') ?? 'OUTERTALE',
   state: {} as CosmosKeyed
};

if (backend.available) {
   setInterval(() => {
      if (save.dirty) {
         save.dirty = false;
         backend.file.writeSave(CosmosUtils.serialize(save.internal));
      }
   }, 50);
}

export default save;

CosmosUtils.status(`LOAD MODULE: SAVE (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
