import { OutertaleInventory } from './classes';
import { CosmosKeyed } from './engine/utils';
type OutertaleDataBooleanBase = typeof dataBoolean;
export interface OutertaleDataBoolean extends OutertaleDataBooleanBase {
}
type OutertaleDataNumberBase = typeof dataNumber;
export interface OutertaleFlagBoolean extends OutertaleFlagBooleanBase {
}
type OutertaleDataStringBase = typeof dataString;
export interface OutertaleDataNumber extends OutertaleDataNumberBase {
}
type OutertaleFlagBooleanBase = typeof flagBoolean;
export interface OutertaleFlagNumber extends OutertaleFlagNumberBase {
}
type OutertaleFlagNumberBase = typeof flagNumber;
export interface OutertaleDataString extends OutertaleDataStringBase {
}
type OutertaleFlagStringBase = typeof flagString;
export interface OutertaleFlagString extends OutertaleFlagStringBase {
}
declare const dataBoolean: {
    /** got pm about electrospear */
    a_state_pm_electrospear: boolean;
    /** declined to napstablook's game show plea in */
    a_state_napstadecline: boolean;
    /** mettaton's secret will be revealed */
    a_state_hapstablook: boolean;
    /** got the new cellphone */
    a_state_gotphone: boolean;
    /** got told about mew mew doll */
    a_state_m3: boolean;
    /** eligible for first item in 3rd MTT show */
    a_state_moneyitemA: boolean;
    /** eligible for 2nd item in 3rd MTT show */
    a_state_moneyitemB: boolean;
    /** eligible for final item in 3rd MTT show */
    a_state_moneyitemC: boolean;
    /** broke mett's arms */
    a_state_armwrecker: boolean;
    /** broke mett's legs */
    a_state_legwrecker: boolean;
    /** papyrus explained why undyne is missing */
    a_state_fishbetray: boolean;
    /** puzzle help notifier call */
    a_state_puzzlehelp: boolean;
    /** backtracked to other side of CORE with azzy */
    a_state_asrielTimewaster: boolean;
    /** badness increased to one */
    bad_lizard: boolean;
    /** true if "About Yourself" has been used on the CELL */
    cell_about: boolean;
    /** true if "Flirt" has been used on the CELL */
    cell_flirt: boolean;
    /** true if "Call Her Mom" has been used on the CELL */
    cell_mom: boolean;
    /** true if "Puzzle Help" has been used on the CELL */
    cell_puzzle: boolean;
    /** true if "Puzzle Help" has been used on the CELL with alphys */
    cell_puzzle_alphys: boolean;
    /** paid for temmie college */
    colleg: boolean;
    /** failed to go through with apology */
    f_state_blookbetray: boolean;
    /** napstablook reacted to spooktune */
    f_state_blookmusic1: boolean;
    /** napstablook reacted to spookwave */
    f_state_blookmusic2: boolean;
    /** napstablook reacted to spookwaltz */
    f_state_blookmusic3: boolean;
    /** monster kid signal star reaction flags */
    f_state_dc_kidd2: boolean;
    f_state_dc_kidd3: boolean;
    f_state_dc_kidd4: boolean;
    f_state_dc_kidd6: boolean;
    f_state_dc_kidd7: boolean;
    f_state_dc_kidd10: boolean;
    /** completed dialogue tree of npc 86 */
    f_state_done86: boolean;
    /** put a sock in it */
    f_state_dummypunch: boolean;
    /** put an eye on it */
    f_state_dummytalk: boolean;
    /** exit date */
    f_state_exitdate: boolean;
    /** tried to hug napstablook */
    f_state_ghosthug: boolean;
    /** asked napstablook to sleep over */
    f_state_ghostsleep: boolean;
    /** true if monster kid acted in battle */
    f_state_kidd_act: boolean;
    /** true if player didn't save MK */
    f_state_kidd_betray: boolean;
    /** true if monster kid mentioned the gap */
    f_state_kidd_bird: boolean;
    /** true if monster kid got nice cream! */
    f_state_kidd_cream: boolean;
    /** true if monster kid attacked a monster */
    f_state_kidd_fight: boolean;
    /** true if monster kid used magic in battle */
    f_state_kidd_magic: boolean;
    /** true if monster kid tried mercy in battle */
    f_state_kidd_mercy: boolean;
    /** napsta comment */
    f_state_kidd_napstacom: boolean;
    /** true if monster kid complained about dark area */
    f_state_kidd_prechase: boolean;
    /** snail comment */
    f_state_kidd_snailcom: boolean;
    /** true if monster kid explained statue mechanic */
    f_state_kidd_statue: boolean;
    /** temmie comment */
    f_state_kidd_temmiecom: boolean;
    /** trash comment */
    f_state_kidd_trashcom: boolean;
    /** trauma dialogue for encounter */
    f_state_kidd_trauma: boolean;
    /** undyne comment */
    f_state_kidd_undynecom: boolean;
    /** mushroom dance, mushroom dance, whatever could it mean */
    f_state_mushroomdance: boolean;
    /** it means youve lived a life of sin */
    f_state_mushroomdanceGeno: boolean;
    /** true if narrator said nobody came for other side of bird */
    f_state_narrator_bird: boolean;
    /** interacted with nice cream guy in foundry */
    f_state_nicecream: boolean;
    /** nice cream guy reminded you of punch cards */
    f_state_noticard: boolean;
    /** went into undyne fight with LV 0 */
    f_state_oopsprimer: boolean;
    /** you told pap what your wearing */
    f_state_papclothes: boolean;
    /** unlocked the piano puzzle */
    f_state_piano: boolean;
    /** gave up your soul to undyne (only for monstew kid to show up) */
    f_state_sacrifice: boolean;
    /** tried sans's "telescope" (big mistake) */
    f_state_telescope: boolean;
    /** triggered the hidden switch on the tem statue */
    f_state_temstatue: boolean;
    /** won a game of thundersnail */
    f_state_thundersnail_win: boolean;
    /** unlocked the hidden secondary piano puzzle */
    f_state_truth: boolean;
    /** unlocked hapstablook's house with the mystery key */
    f_state_hapstadoor: boolean;
    /** assist used for madjick */
    assist_madjick: boolean;
    /** assist used for knightknight */
    assist_knightknight: boolean;
    flirt_dogamy: boolean;
    flirt_dogaressa: boolean;
    flirt_doge: boolean;
    flirt_doggo: boolean;
    flirt_froggit: boolean;
    flirt_greatdog: boolean;
    flirt_jerry: boolean;
    flirt_lesserdog: boolean;
    flirt_loox: boolean;
    flirt_maddummy: boolean;
    flirt_mettaton: boolean;
    flirt_migosp: boolean;
    flirt_migospel: boolean;
    flirt_moldbygg: boolean;
    flirt_moldsmal: boolean;
    flirt_mouse: boolean;
    flirt_muffet: boolean;
    flirt_mushy: boolean;
    flirt_papyrus: boolean;
    flirt_radtile: boolean;
    flirt_rg03: boolean;
    flirt_rg04: boolean;
    flirt_shyren: boolean;
    flirt_spacetop: boolean;
    flirt_stardrake: boolean;
    flirt_undyne: boolean;
    flirt_whimsun: boolean;
    flirt_woshua: boolean;
    flirt_perigee: boolean;
    flirt_pyrope: boolean;
    flirt_tsundere: boolean;
    flirt_madjick: boolean;
    flirt_knightknight: boolean;
    flirt_froggitex: boolean;
    flirt_whimsalot: boolean;
    flirt_glyde: boolean;
    flirt_astigmatism: boolean;
    flirt_mushketeer: boolean;
    /** got fries */
    fryz: boolean;
    /** true if genocide was started */
    genocide: boolean;
    /** purchased dimensional bedroom */
    a_state_bedroom: boolean;
    /** on the line with alphys */
    a_state_corecall: boolean;
    /** switched sides */
    a_state_flipflopper: boolean;
    /** backtrack before hitting button */
    a_state_backtracker: boolean;
    /** killed core warrior path 1 */
    a_state_corekill1: boolean;
    /** killed core warrior path 2 */
    a_state_corekill2: boolean;
    /** heard narrator rant */
    heard_narrator: boolean;
    /** got the LEGENDARY ARTIFACT */
    item_artifact: boolean;
    /** got napstablook's homemade pie */
    item_blookpie: boolean;
    /** got the hoverboots */
    item_boots: boolean;
    /** got the chocolate */
    item_chocolate: boolean;
    /** got the electrospear */
    item_electrospear: boolean;
    /** got the augmented eye */
    item_eye: boolean;
    /** got the power glove */
    item_glove: boolean;
    /** got the AR goggles */
    item_goggles: boolean;
    /** got the halo */
    item_halo: boolean;
    /** got the flight suit */
    item_jumpsuit: boolean;
    /** got the little dipper */
    item_little_dipper: boolean;
    /** got the datapad */
    item_padd: boolean;
    /** got the cheesecake */
    item_quiche: boolean;
    /** got the temy armor */
    item_temyarmor: boolean;
    /** got time versus money first show item (radio) */
    item_tvm_radio: boolean;
    /** got time versus money 2nd show item (fireworks) */
    item_tvm_fireworks: boolean;
    /** got time versus money final show item (mewmew) */
    item_tvm_mewmew: boolean;
    /** got that face steak! */
    item_face_steak: boolean;
    /** got the void key */
    item_voidy: boolean;
    /** got the arc laser (AOE gun) */
    item_laser: boolean;
    /** got tac visor */
    item_visor: boolean;
    /** got the mystery key */
    item_mystery_key: boolean;
    /** got the mystery food */
    item_mystery_food: boolean;
    /** got the tablaphone */
    item_tablaphone: boolean;
    /** got the sonic repulsor */
    item_sonic: boolean;
    /** got the moon pie */
    item_moonpie: boolean;
    /** true if coffin key was taken */
    key_coffin: boolean;
    /** true if sock drawer was messed with */
    cetadel: boolean;
    /** killed shyren */
    killed_shyren: boolean;
    /** bullied shyren */
    bullied_shyren: boolean;
    /** killed glyde */
    killed_glyde: boolean;
    /** killed madjick */
    killed_madjick: boolean;
    /** killed knight knight */
    killed_knightknight: boolean;
    /** papyrus phone call */
    kitchencall: boolean;
    /** whether or not napstablook has been called about performing */
    napsta_performance: boolean;
    /** oops */
    oops: boolean;
    /** failed on papyrus's firewall */
    papyrus_fire: boolean;
    /** "asked" for piggyback ride */
    papyrus_piggy: boolean;
    /** do you have redeeming qualities? */
    papyrus_quality: boolean;
    /** papyrus special attack */
    papyrus_specatk: boolean;
    /** spared papyrus!?!?!?!?!??!?!?!!!?!?!?!/!/1/1/!?1/1/1/!?!?!?1//!/!/1/1/11//1/1?!?1/1?!?/1/1/1/!/1/1/?!/1/1/1/? */
    papyrus_secret: boolean;
    /** true if the capstation key was taken */
    s_state_capstation: boolean;
    /** narrator read you the book */
    s_state_chareader: boolean;
    /** narrator talked about the telescope */
    s_state_chargazer: boolean;
    /** true if stardrake is dead */
    s_state_chilldrake: boolean;
    /** encountered lesser dog */
    s_state_lesser: boolean;
    /** true if the math puzzle was beat */
    s_state_mathpass: boolean;
    /** beat sans high score on xtower */
    s_state_million: boolean;
    /** but u were too edgy */
    s_state_million_garb: boolean;
    /** true if the coins in papyrus's couch were taken */
    s_state_pilfer: boolean;
    /** true if you didnt understand the explanation */
    s_state_puzzlenote: boolean;
    /** redbook */
    s_state_redbook: boolean;
    /** made a reservation at the start inn */
    s_state_reservation: boolean;
    /** used papyrus sink */
    s_state_papsink: boolean;
    /** toriel offers snail pie instead */
    snail_pie: boolean;
    spared_froggit: boolean;
    spared_jerry: boolean;
    spared_loox: boolean;
    spared_migosp: boolean;
    spared_moldbygg: boolean;
    spared_moldsmal: boolean;
    spared_mouse: boolean;
    spared_mushy: boolean;
    spared_radtile: boolean;
    spared_shyren: boolean;
    spared_spacetop: boolean;
    spared_stardrake: boolean;
    spared_whimsun: boolean;
    spared_woshua: boolean;
    spared_perigee: boolean;
    spared_pyrope: boolean;
    spared_tsundere: boolean;
    spared_madjick: boolean;
    spared_knightknight: boolean;
    spared_froggitex: boolean;
    spared_whimsalot: boolean;
    spared_glyde: boolean;
    spared_astigmatism: boolean;
    spared_mushketeer: boolean;
    /** first starbert collectible */
    starbertA: boolean;
    /** second starbert collectible */
    starbertB: boolean;
    /** third starbert collectible */
    starbertC: boolean;
    /** stole from blook shop */
    steal_blook: boolean;
    /** stole from hare shop */
    steal_hare: boolean;
    /** stole from tem shop */
    steal_tem: boolean;
    /** stole from thrift shop */
    steal_gossip: boolean;
    /** true if toriel was spoken to once */
    toriel_ask: boolean;
    /** true if asked to go home */
    toriel_home: boolean;
    /** true if toriel can be called after the battle */
    toriel_phone: boolean;
    /** whether or not toriel saw twinkly attack frisk */
    toriel_twinkly: boolean;
    /** made undyne go "hard mode" */
    undyne_hardmode: boolean;
    /** true if player took last nap */
    w_state_catnap: boolean;
    /** true if player read 1 page in the diary */
    w_state_diary: boolean;
    /** left battle room */
    w_state_fightroom: boolean;
    /** true if soda was taken */
    w_state_soda: boolean;
    /** true if steak was taken */
    w_state_steak: boolean;
    /** talked to latetoriel */
    w_state_latetoriel: boolean;
    /** frisk has the W A T U H */
    water: boolean;
    /** it's onionsan! onionsan, y'hear! */
    onionsan: boolean;
    /** ate gumbert :sob: */
    stargum: boolean;
};
declare const dataNumber: {
    /**
     * alphys opinion of you
     * ```md
     * 0 - doesnt mind at all
     * 1 - sucks but its fine i guess
     * 2 - youre awful (or neutral genocide)
     * 3 - geno
     * ```
     */
    bad_lizard: 0 | 1 | 2 | 3;
    /** random number generator base values */
    base1: number;
    /** how many times "Say Hello" was used in the CELL */
    cell_hello: number;
    /**
     * which flavor of pie was chosen
     * ```md
     * 0 - butterscotch
     * 1 - cinnamon
     * ```
     */
    choice_flavor: 0 | 1;
    /** encounters in current room */
    encounters: number;
    /** current EXP (LV is calculated from this) */
    exp: number;
    /** electro dampening fluids taken */
    fluids: number;
    /** current G */
    g: number;
    /** current HP */
    hp: number;
    /** kill count */
    kills: number;
    /** core kill count */
    corekills: number;
    /** aerialis kill count */
    kills_aerialis: number;
    /** foundry kill count */
    kills_foundry: number;
    /** starton kill count */
    kills_starton: number;
    /** outlands kill count */
    kills_wastelands: number;
    /** total bullycount */
    bully: number;
    /** aerialis bullycount */
    bully_aerialis: number;
    /** foundry bullycount */
    bully_foundry: number;
    /** starton bullycount */
    bully_starton: number;
    /** outlands bullycount */
    bully_wastelands: number;
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
    plot: 0 | 1 | 2 | 3 | 9 | 4 | 5 | 6 | 7 | 8 | 10 | 11 | 12 | 16 | 32 | 30 | 15 | 45 | 60 | 13 | 14 | 17 | 18 | 19 | 20 | 25 | 50 | 21 | 23 | 24 | 26 | 27 | 28 | 29 | 31 | 33 | 35 | 36 | 37 | 39 | 40 | 42 | 43 | 44 | 46 | 47 | 48 | 49 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 2.5 | 2.01 | 2.1 | 2.11 | 2.12 | 2.2 | 2.21 | 2.3 | 2.31 | 2.32 | 2.4 | 2.41 | 2.6 | 2.601 | 2.602 | 2.603 | 2.61 | 2.62 | 2.7 | 2.71 | 4.1 | 4.2 | 5.1 | 5.2 | 5.3 | 5.4 | 6.1 | 6.2 | 8.1 | 8.2 | 9.1 | 16.1 | 17.001 | 17.01 | 17.02 | 17.03 | 17.1 | 18.1 | 20.2 | 24.1 | 24.101 | 24.11 | 24.2 | 24.3 | 30.01 | 30.02 | 30.1 | 37.1 | 37.11 | 37.2 | 38.01 | 38.1 | 38.2 | 42.1 | 47.01 | 47.02 | 47.03 | 47.1 | 47.2 | 55.1 | 58.1 | 58.2 | 59.1 | 64.1 | 66.1 | 66.2 | 67.1 | 68.1;
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
    plot_call: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 7.1;
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
    plot_date: 0 | 1 | 2 | 0.2 | 1.2 | 2.1 | 0.1 | 1.1 | 1.3;
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
    plot_kidd: 0 | 1 | 2 | 3 | 4 | 3.1 | 3.2 | 3.3 | 3.4;
    /** hub dialogue (lv0/genocide) */
    plot_approach: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** outernet messages (checked) */
    plot_pmcheck: number;
    /** stalker twinkly */
    plot_stalker: number;
    /** shop talk - undyne (after geno death) */
    shop_deadfish: number;
    /** shop talk - gerson */
    shop_gerson: number;
    /** shop talk - homeworld */
    shop_homeworld: number;
    /** shop talk - life advice (bpants) */
    shop_bpants_advice: number;
    /** shop talk - the hub (bpants) */
    shop_bpants_hub: number;
    /** shop talk - alphys (gossip) */
    shop_gossip_alphys: number;
    /** shop talk - hub (gossip) */
    shop_gossip_hub: number;
    /** total unforced hits taken in battle */
    hits: number;
    /** temmie special sell countdown */
    specsell: number;
    /** number of barricades successfully passed */
    state_aerialis_barricuda: number;
    /** kills when mtt warned you */
    state_aerialis_basekill: number;
    /** how many corn dogs purchased (used for corn goat) */
    state_aerialis_corngoat: 0 | 1 | 2;
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
    state_aerialis_lockup: 0 | 1 | 2 | 3 | 4;
    /** asriel monologues */
    state_aerialis_monologue: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    /** times seen monologue 1 */
    state_aerialis_monologue_iteration1: number;
    /** times seen monologue 2 */
    state_aerialis_monologue_iteration2: number;
    /** mtt (ex) "quiz" "answer" */
    state_aerialis_mttanswer: 0 | 1 | 2 | 3 | 4;
    /** phase offset */
    state_aerialis_puzzle2os: number;
    /** times failed on talent show */
    state_aerialis_talentfails: number;
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
    state_aerialis_crafterresult: 0 | 1 | 2 | 3 | 4;
    /** how close you were to guessing prices exactly */
    state_aerialis_valuediff: number;
    /**
     * royal guards battle outcome
     * ```md
     * 0 - confession
     * 1 - killed
     * ```
     */
    state_aerialis_royalguards: 0 | 1;
    /** mk spear reaction */
    state_foundry_kiddreaction: number;
    /** astronaut foods taken */
    state_foundry_astrofood: number;
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
    state_foundry_blookdate: 0 | 1 | 2 | 0.2 | 0.1;
    /**
     * music playing in napstablook's house
     * ```md
     * 0 - no music playing
     * 1 - spooktune
     * 2 - spookwave
     * 3 - spookwaltz
     * ```
     */
    state_foundry_blookmusic: 0 | 1 | 2 | 3;
    /**
     * doge battle outcome
     * ```md
     * 0 - spared
     * 1 - killed
     * 2 - petted (lv0)
     * ```
     */
    state_foundry_doge: 0 | 1 | 2;
    /** number of deaths witnessed by monster kid */
    state_foundry_kidddeath: number;
    /** number of battle turns taken by monster kid */
    state_foundry_kiddturns: number;
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
    state_foundry_maddummy: 0 | 1 | 3 | 4 | 5;
    /**
     * muffet battle outcome
     * ```md
     * 0 - spared
     * 1 - killed
     * 2 - bribed (lv0)
     * ```
     */
    state_foundry_muffet: 0 | 1 | 2;
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
    state_foundry_npc86: 0 | 1 | 2 | 3 | 4 | 5;
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
    state_foundry_npc86_feelings: 0 | 1 | 2 | 3 | 4;
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
    state_foundry_npc86_mood: 0 | 1 | 2 | 3 | 4;
    /** number of punch cards available */
    state_foundry_punchcards: number;
    state_foundry_puzzlepylon1Ax: number;
    state_foundry_puzzlepylon1Ay: number;
    state_foundry_puzzlepylon1Bx: number;
    state_foundry_puzzlepylon1By: number;
    state_foundry_puzzlepylon2Ax: number;
    state_foundry_puzzlepylon2Ay: number;
    state_foundry_puzzlepylon2Bx: number;
    state_foundry_puzzlepylon2By: number;
    state_foundry_puzzlepylon2Cx: number;
    state_foundry_puzzlepylon2Cy: number;
    state_foundry_puzzlepylon2Dx: number;
    state_foundry_puzzlepylon2Dy: number;
    state_foundry_puzzlepylon3Ax: number;
    state_foundry_puzzlepylon3Ay: number;
    state_foundry_puzzlepylon3Bx: number;
    state_foundry_puzzlepylon3By: number;
    state_foundry_puzzlepylon3Cx: number;
    state_foundry_puzzlepylon3Cy: number;
    state_foundry_puzzlepylon3Dx: number;
    state_foundry_puzzlepylon3Dy: number;
    state_foundry_puzzlepylon3Ex: number;
    state_foundry_puzzlepylon3Ey: number;
    state_foundry_puzzlepylon3Fx: number;
    state_foundry_puzzlepylon3Fy: number;
    state_foundry_puzzlepylon3Gx: number;
    state_foundry_puzzlepylon3Gy: number;
    state_foundry_puzzlepylon3Hx: number;
    state_foundry_puzzlepylon3Hy: number;
    /** number of spiders encountered in muffet area */
    state_foundry_spiders: number;
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
    state_foundry_swansong: 0 | 1 | 2 | 3 | 4;
    /**
     * temmie pet state
     * ```md
     * 0 - not asked to pet temmie yet
     * 1 - pet temmie
     * 2 - DIDNT PET TEMMIE!??!?!?!?!?!?
     * ```
     */
    state_foundry_tempet: 0 | 1 | 2;
    /** number of times thundersnail was played */
    state_foundry_thundersnail: number;
    /**
     * final outcome of undyne
     * ```md
     * 0 - spared
     * 1 - left for dead
     * 2 - killed
     * ```
     */
    state_foundry_undyne: 0 | 1 | 2;
    /**
     * times mk bullied
     * ```md
     * 0 - none
     * 1 - once
     * 2 - repeated
     * ```
     */
    state_foundry_kiddbully: number;
    /** times alphys opened the phone lines */
    state_aerialis_coreenter: number;
    /** times alphys closed the phone lines */
    state_aerialis_coreleave: number;
    /**
     * core - puzzler's path state
     * ```md
     * 0 - no puzzle solved
     * 1 - first puzzle solved
     * 2 - second puzzle solved
     * 3 - switch was flipped
     * ```
     */
    state_aerialis_corepath_puzzle: 0 | 1 | 2 | 3;
    /**
     * core - warrior's path state
     * ```md
     * 0 - no battle passed
     * 1 - first battle passed
     * 2 - second battle passed
     * 3 - switch was flipped
     * ```
     */
    state_aerialis_corepath_warrior: 0 | 1 | 2 | 3;
    /**
     * core - path state
     * ```md
     * 0 - no side chosen yet
     * 1 - currently on puzzler's side
     * 2 - currently on warrior's side
     * ```
     */
    state_aerialis_corepath_state: 0 | 1 | 2;
    /**
     *
     */
    /** times captured by papyrus */
    state_papyrus_capture: number;
    /**
     * WHAT WILL YOU DO WITH THE SPAGHETTI?
     * ```md
     * 0 - not talked yet
     * 1 - said you'd share it
     * 2 - said you'd eat it
     * ```
     */
    state_papyrus_spaghet: 0 | 1 | 2;
    /**
     * papyrus side house
     * ```md
     * 0 - not looked
     * 1 - looked and appreciated
     * 2 - looked and didn't appreciate
     * ```
     */
    state_papyrus_view: 0 | 1 | 2;
    /**
     * state of the pie given by toriel
     * ```md
     * 0 - not given
     * 1 - given
     * 2 - put into inventory
     * ```
     */
    state_pie: 0 | 1 | 2;
    /**
     * asriel bridge wait (defunct)
     * ```md
     * 0 - not talked yet
     * 1 - got told about monsters
     * 2 - was asked to proceed
     * ```
     */
    state_starton_azzybridge: 0 | 1 | 2;
    /**
     * doggo battle outcome
     * ```md
     * 0 - petted
     * 1 - played fetch
     * 2 - killed
     * ```
     */
    state_starton_doggo: 0 | 1 | 2;
    /**
     * dog marriage battle outcome
     * ```md
     * 0 - petted
     * 1 - played fetch
     * 2 - killed
     * ```
     */
    state_starton_dogs: 0 | 1 | 2;
    state_starton_creamz: number;
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
    state_starton_greatdog: 0 | 1 | 2 | 3 | 4;
    /** play fetch later then the start at lv 0 */
    state_starton_latefetch: number;
    /**
     * lesser dog battle outcome
     * ```md
     * 0 - petted
     * 1 - played fetch
     * 2 - killed
     * 3 - bully
     * ```
     */
    state_starton_lesserdog: 0 | 1 | 2 | 3;
    /**
     * number of nice creams purchased
     * ```md
     * 0.5 - met guy
     * 0.75 - guy gave you free nice cream
     * ```
     */
    state_starton_nicecream: number;
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
    state_starton_npc98: 0 | 1 | 2 | 3 | 4 | 5 | 4.1;
    /**
     * papyrus battle state
     * ```md
     * 0 - friend
     * 1 - dead
     * ```
     */
    state_starton_papyrus: 0 | 1;
    /** puzzle states */
    state_starton_s_puzzle1: number;
    state_starton_s_puzzle2: number;
    state_starton_s_puzzle3: number;
    /**
     * state of the inn
     * ```md
     * 0 - not used
     * 1 - used free
     * 2 - used by paying
     * ```
     */
    state_starton_sleep: 0 | 1 | 2;
    /**
     * HEY YOU TOUCHA MY SPAGHET
     * ```md
     * 0 - not touched
     * 1 - lowered
     * 2 - taken
     * ```
     */
    state_starton_spaghetti: 0 | 1 | 2;
    /** hi-score on the xtower game thing */
    state_starton_xtower: number;
    /**
     * state of toriel's book
     * ```md
     * 0 - not asked
     * 1 - asked
     * 2 - head the book
     * ```
     */
    state_toriel_book: 0 | 1 | 2;
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
    state_toriel_food: 0 | 1 | 2 | 3 | 4;
    /** times the player has "run away" from home ahead of toriel */
    state_toriel_runaway: number;
    /** items taken from the vending machine (0-4) */
    state_wastelands_candy: number;
    /**
     * state of the smashed pie
     * ```md
     * 0 - didn't smash
     * 1 - smashed before
     * 2 - smashed after
     * ```
     */
    state_wastelands_mash: number;
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
    state_wastelands_dummy: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
    state_wastelands_froggit: 0 | 1 | 2 | 3 | 4 | 5;
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
    state_wastelands_napstablook: 0 | 1 | 2 | 3 | 4 | 5;
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
    state_wastelands_toriel: 0 | 1 | 2 | 3 | 4;
    /** steps in current room */
    steps: number;
    /** elapsed time in frames */
    time: number;
    /** undyne attack runoff (turns until she believes your pleas) */
    undyne_attackRunoff: number;
    /** undyne chaser position x */
    undyne_chaseX: number;
    /** undyne chaser position y */
    undyne_chaseY: number;
    /** undyne HP */
    undyne_hp: number;
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
    undyne_phase: 0 | 1 | 2 | 3 | 4;
    /** undyne fight speed (challenge/plead) */
    undyne_speed: number;
};
declare const dataString: {
    /** current armor */
    armor: string;
    /** last used door */
    chasecheckpoint: string;
    /** name of the first fallen human */
    name: string;
    /** messages sent by alphys */
    pms: string;
    /** current room */
    room: string;
    /** room that undyne dies in */
    state_foundry_deathroom: string;
    /** laser state in foundry puzzle 1 */
    state_foundry_f_puzzle1: string;
    /** laser state in foundry puzzle 2 */
    state_foundry_f_puzzle2: string;
    /** traps set off in chase */
    state_foundry_f_chaseTrap: string;
    /** holes in chase */
    state_foundry_f_chaseHole: string;
    /** laser state in foundry puzzle 3 */
    state_foundry_f_puzzle3: string;
    /** selected pattern in starton puzzle 3 */
    state_starton_s_puzzle3: string;
    /** monster kid state in town */
    state_starton_s_town1: string;
    /** pattern in core puzzle 1 */
    state_aerialis_a_core_left1: string;
    /** pattern in core puzzle 2 */
    state_aerialis_a_core_left2: string;
    /** current weapon */
    weapon: string;
};
declare const flagBoolean: {
    /** true if music is disabled */
    option_music: boolean;
    /** left-handed mobile */
    option_right: boolean;
    /** true if sfx is disabled */
    option_sfx: boolean;
    /** true if twinkly hinted at his plan */
    reveal_twinkly: boolean;
    /** seen core */
    w_state_core: boolean;
    /** asriel commented on chara landing spot */
    asriel_trashcom: boolean;
    /** asriel knows you know where the cellphone is. */
    asriel_phone: boolean;
    /** asriel knows who shorted out the electrics */
    asriel_electrics: boolean;
    /** asriel commented about burger */
    asriel_bpants: boolean;
    /** asriel knows his royal access code works */
    asriel_access: boolean;
    /** seen mtt cutscene */
    legs: boolean;
    /** true if twinkly post-geno reset end dialogue happened */
    confront_twinkly: boolean;
    /** true if twinkly post-geno reset end dialogue happened (mad version) */
    enrage_twinkly: boolean;
    /** (temporary) true if reached the end of any route */
    demo_complete: boolean;
};
declare const flagNumber: {
    /** assist realization state (undyne ex) */
    azzy_assist: number;
    /** times fought mtt neo */
    azzy_neo: number;
    /** shield pickup thing */
    azzy_neo_pickup: number;
    /** times died */
    deaths: number;
    /** how many times twinkly has been met */
    encounter_twinkly: number;
    ga_asriel0: number;
    ga_asriel1: number;
    ga_asriel3: number;
    ga_asriel6: number;
    ga_asriel9: number;
    ga_asriel10: number;
    ga_asriel17: number;
    ga_asriel20: number;
    ga_asriel24: number;
    ga_asriel26: number;
    ga_asriel28: number;
    ga_asriel29: number;
    ga_asriel30: number;
    ga_asriel30d: number;
    ga_asriel30x: number;
    ga_asriel31: number;
    ga_asriel32: number;
    ga_asriel33: number;
    ga_asriel35: number;
    ga_asriel38: number;
    ga_asriel40: number;
    ga_asriel43: number;
    ga_asriel46: number;
    ga_asriel49: number;
    ga_asriel52: number;
    ga_asriel53: number;
    ga_asriel54: number;
    ga_asriel55: number;
    ga_asrielMoneyX3: number;
    ga_asrielMoneyX4: number;
    ga_asrielBeast: number;
    ga_asrielCorner: number;
    ga_asrielDrawing: number;
    ga_asrielEcho1: number;
    ga_asrielEcho2: number;
    ga_asrielEcho3: number;
    ga_asrielEcho4: number;
    ga_asrielElite1: number;
    ga_asrielEpic: number;
    ga_asrielFetch: number;
    ga_asrielKidd1: number;
    ga_asrielKidd2: number;
    ga_asrielKiddFinal1: number;
    ga_asrielKiddFinal3a: number;
    ga_asrielKiddFinal3b: number;
    ga_asrielKiddWalk: number;
    ga_asrielNapstakill: number;
    ga_asrielPapyrus1: number;
    ga_asrielPuzzleStop1: number;
    ga_asrielRobo1: number;
    ga_asrielSpanner: number;
    ga_asrielStutter: number;
    ga_asrielUndying: number;
    ga_asrielUndyneX: number;
    ga_asrielLab1: number;
    ga_asrielLab2: number;
    ga_asrielLab3: number;
    ga_asrielGate: number;
    ga_asrielLift: number;
    ga_asrielSkySign1: number;
    ga_asrielTerminal1: number;
    ga_asrielDummy: number;
    ga_asrielGetThePhone: number;
    ga_asrielGetThePhone2: number;
    ga_asrielOutlands1: number;
    ga_asrielOutlands2: number;
    ga_asrielOutlands3: number;
    ga_asrielOutlands4: number;
    ga_asrielOutlands5: number;
    ga_asrielOutlands6: number;
    ga_asrielOutlands7: number;
    ga_asrielHotel0: number;
    ga_asrielElectrics0: number;
    ga_asrielHotel1: number;
    ga_asrielElectrics1: number;
    ga_asrielHotel2: number;
    ga_asrielCore0: number;
    ga_asrielCore1: number;
    ga_asrielCore2: number;
    ga_asrielCore4: number;
    ga_asrielCore5: number;
    ga_asrielCore6: number;
    ga_asrielCore7: number;
    ga_asrielDrink: number;
    ga_asrielFireplace: number;
    ga_asrielSpareketeer: number;
    ga_asrielSus1: number;
    ga_asrielXtower: number;
    ga_asrielCorenote: number;
    ga_asrielOnion: number;
    ga_asrielCoffin: number;
    ga_asrielTimewaster: number;
    ga_asrielDog: number;
    ga_asrielWreckage: number;
    ga_asrielMadfish: number;
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
    genocide_milestone: 0 | 1 | 2 | 3 | 4;
    /** number of times the genocide route has started */
    genocide_twinkly: number;
    /** name hash (used for "easy to change, huh?") */
    hash: number;
    /** music level */
    option_music: number;
    /** sfx level */
    option_sfx: number;
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
    progress_twinkly: 0 | 1 | 2 | 3 | 4 | 1.5;
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
    state_toriel: 0 | 1 | 2 | 3 | 9 | 4 | 5 | 6 | 7 | 8 | 10 | 11 | 12 | 15 | 13 | 14 | 8.1 | 8.2 | 7.1 | 7.2 | 7.3 | 8.3 | 11.1 | 11.2 | 11.3 | 12.1 | 12.2 | 12.3 | 13.1 | 13.2 | 13.3 | 14.1 | 14.2 | 14.3 | 15.1 | 15.2;
    /** number of times undyne the undying has appeared */
    undying: number;
};
declare const flagString: CosmosKeyed<string>;
declare const save: {
    data: {
        b: OutertaleDataBoolean;
        n: OutertaleDataNumber;
        s: OutertaleDataString;
    };
    dirty: boolean;
    flag: {
        b: OutertaleFlagBoolean;
        n: OutertaleFlagNumber;
        s: OutertaleFlagString;
    };
    internal: any;
    storage: {
        inventory: OutertaleInventory;
        dimboxA: OutertaleInventory;
        dimboxB: OutertaleInventory;
    };
    manager: Storage;
    namespace: string;
    state: CosmosKeyed;
};
export default save;
