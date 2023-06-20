import { Graphics } from 'pixi.js';
import { OutertaleChildObject, OutertaleEditorContainer, OutertaleGroup, OutertaleLayerKey, OutertaleParentObject } from './classes';
import { CosmosBaseEvents, CosmosHitbox, CosmosObject, CosmosRenderer, CosmosRendererLayer } from './engine/renderer';
import { CosmosRectangle } from './engine/shapes';
import { CosmosText } from './engine/text';
import { CosmosKeyed } from './engine/utils';
export declare class OutertaleDeveloperHitbox extends CosmosHitbox<CosmosBaseEvents & {
    click: [];
    wheel: [1 | -1];
}> {
}
export declare const zoomFactor: number;
export declare const speedValues: number[];
export declare const pallete: {
    c0: string;
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c7: string;
    ca: string;
    cf: string;
};
export declare function editorProperty(property: string): "§fill:#fff§" | "§fill:#0ff§" | "§fill:#ff0§";
export declare function editorValue(property: string, index: number): "§fill:#fff§" | "§fill:#0ff§" | "§fill:#ff0§" | "§fill:#f00§";
export declare function historianInfo<A extends string, B extends CosmosKeyed>(domain: A, store: B, ...exclude: string[]): {
    domain: A;
    key: keyof B & string;
}[];
export declare function decreaseSpeed(): void;
export declare function increaseSpeed(): void;
export declare function prevRoom(): void;
export declare function nextRoom(): void;
export declare function prevGroup(): void;
export declare function nextGroup(): void;
export declare function prevContainer(): void;
export declare function nextContainer(): void;
export declare const editor: {
    active: boolean;
    associations: Map<OutertaleChildObject | OutertaleParentObject, CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>>;
    box(parent: OutertaleParentObject, child?: OutertaleChildObject): CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    containers: OutertaleEditorContainer[];
    depth: number;
    disable(): void;
    editTime: number;
    enable(): void;
    index: number;
    input: boolean;
    generate(): void;
    readonly group: string | undefined;
    groups: {
        array: string[];
        boolean: string[];
        number: string[];
        string: string[];
        vector: string[];
    };
    layers: OutertaleLayerKey[];
    readonly parent: OutertaleEditorContainer;
    pos: {
        x: number;
        y: number;
    };
    readonly property: string;
    readonly room: import("./classes").OutertaleRoomDecorator;
    readonly target: OutertaleEditorContainer | {
        box: CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        object: OutertaleChildObject;
        parent: OutertaleEditorContainer;
    } | null;
    save(): Promise<void>;
    savers: CosmosKeyed<number>;
    text: CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    types: string[];
    wrapper: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
};
export declare const godhome: {
    room: string;
    rooms: string[];
    group: [string, OutertaleGroup];
    groups: [string, OutertaleGroup][];
    menu: string | null;
    menus: (string | null)[];
};
export declare const historian: {
    page: number;
    input: boolean;
    domain: string | null;
    index: number | null;
    numericValue: string | null;
    restoreInput: boolean;
    info: {
        dataBoolean: {
            domain: "dataBoolean";
            key: "item_laser" | "item_visor" | "item_mystery_key" | "kitchencall" | "starbertA" | "starbertB" | "starbertC" | "water" | "stargum" | "a_state_pm_electrospear" | "a_state_napstadecline" | "a_state_hapstablook" | "a_state_gotphone" | "a_state_m3" | "a_state_moneyitemA" | "a_state_moneyitemB" | "a_state_moneyitemC" | "a_state_armwrecker" | "a_state_legwrecker" | "a_state_fishbetray" | "a_state_puzzlehelp" | "a_state_asrielTimewaster" | "bad_lizard" | "cell_about" | "cell_flirt" | "cell_mom" | "cell_puzzle" | "cell_puzzle_alphys" | "colleg" | "f_state_blookbetray" | "f_state_blookmusic1" | "f_state_blookmusic2" | "f_state_blookmusic3" | "f_state_dc_kidd2" | "f_state_dc_kidd3" | "f_state_dc_kidd4" | "f_state_dc_kidd6" | "f_state_dc_kidd7" | "f_state_dc_kidd10" | "f_state_done86" | "f_state_dummypunch" | "f_state_dummytalk" | "f_state_exitdate" | "f_state_ghosthug" | "f_state_ghostsleep" | "f_state_kidd_act" | "f_state_kidd_betray" | "f_state_kidd_bird" | "f_state_kidd_cream" | "f_state_kidd_fight" | "f_state_kidd_magic" | "f_state_kidd_mercy" | "f_state_kidd_napstacom" | "f_state_kidd_prechase" | "f_state_kidd_snailcom" | "f_state_kidd_statue" | "f_state_kidd_temmiecom" | "f_state_kidd_trashcom" | "f_state_kidd_trauma" | "f_state_kidd_undynecom" | "f_state_mushroomdance" | "f_state_mushroomdanceGeno" | "f_state_narrator_bird" | "f_state_nicecream" | "f_state_noticard" | "f_state_oopsprimer" | "f_state_papclothes" | "f_state_piano" | "f_state_sacrifice" | "f_state_telescope" | "f_state_temstatue" | "f_state_thundersnail_win" | "f_state_truth" | "f_state_hapstadoor" | "assist_madjick" | "assist_knightknight" | "flirt_dogamy" | "flirt_dogaressa" | "flirt_doge" | "flirt_doggo" | "flirt_froggit" | "flirt_greatdog" | "flirt_jerry" | "flirt_lesserdog" | "flirt_loox" | "flirt_maddummy" | "flirt_mettaton" | "flirt_migosp" | "flirt_migospel" | "flirt_moldbygg" | "flirt_moldsmal" | "flirt_mouse" | "flirt_muffet" | "flirt_mushy" | "flirt_papyrus" | "flirt_radtile" | "flirt_rg03" | "flirt_rg04" | "flirt_shyren" | "flirt_spacetop" | "flirt_stardrake" | "flirt_undyne" | "flirt_whimsun" | "flirt_woshua" | "flirt_perigee" | "flirt_pyrope" | "flirt_tsundere" | "flirt_madjick" | "flirt_knightknight" | "flirt_froggitex" | "flirt_whimsalot" | "flirt_glyde" | "flirt_astigmatism" | "flirt_mushketeer" | "fryz" | "genocide" | "a_state_bedroom" | "a_state_corecall" | "a_state_flipflopper" | "a_state_backtracker" | "a_state_corekill1" | "a_state_corekill2" | "heard_narrator" | "item_artifact" | "item_blookpie" | "item_boots" | "item_chocolate" | "item_electrospear" | "item_eye" | "item_glove" | "item_goggles" | "item_halo" | "item_jumpsuit" | "item_little_dipper" | "item_padd" | "item_quiche" | "item_temyarmor" | "item_tvm_radio" | "item_tvm_fireworks" | "item_tvm_mewmew" | "item_face_steak" | "item_voidy" | "item_mystery_food" | "item_tablaphone" | "item_sonic" | "item_moonpie" | "key_coffin" | "cetadel" | "killed_shyren" | "bullied_shyren" | "killed_glyde" | "killed_madjick" | "killed_knightknight" | "napsta_performance" | "oops" | "papyrus_fire" | "papyrus_piggy" | "papyrus_quality" | "papyrus_specatk" | "papyrus_secret" | "s_state_capstation" | "s_state_chareader" | "s_state_chargazer" | "s_state_chilldrake" | "s_state_lesser" | "s_state_mathpass" | "s_state_million" | "s_state_million_garb" | "s_state_pilfer" | "s_state_puzzlenote" | "s_state_redbook" | "s_state_reservation" | "s_state_papsink" | "snail_pie" | "spared_froggit" | "spared_jerry" | "spared_loox" | "spared_migosp" | "spared_moldbygg" | "spared_moldsmal" | "spared_mouse" | "spared_mushy" | "spared_radtile" | "spared_shyren" | "spared_spacetop" | "spared_stardrake" | "spared_whimsun" | "spared_woshua" | "spared_perigee" | "spared_pyrope" | "spared_tsundere" | "spared_madjick" | "spared_knightknight" | "spared_froggitex" | "spared_whimsalot" | "spared_glyde" | "spared_astigmatism" | "spared_mushketeer" | "steal_blook" | "steal_hare" | "steal_tem" | "steal_gossip" | "toriel_ask" | "toriel_home" | "toriel_phone" | "toriel_twinkly" | "undyne_hardmode" | "w_state_catnap" | "w_state_diary" | "w_state_fightroom" | "w_state_soda" | "w_state_steak" | "w_state_latetoriel" | "onionsan";
        }[];
        dataNumber: {
            domain: "dataNumber";
            key: "time" | "g" | "bully" | "exp" | "hp" | "state_starton_s_puzzle3" | "steps" | "hits" | "bad_lizard" | "base1" | "cell_hello" | "choice_flavor" | "encounters" | "fluids" | "kills" | "corekills" | "kills_aerialis" | "kills_foundry" | "kills_starton" | "kills_wastelands" | "bully_aerialis" | "bully_foundry" | "bully_starton" | "bully_wastelands" | "plot" | "plot_call" | "plot_date" | "plot_kidd" | "plot_approach" | "plot_pmcheck" | "plot_stalker" | "shop_deadfish" | "shop_gerson" | "shop_homeworld" | "shop_bpants_advice" | "shop_bpants_hub" | "shop_gossip_alphys" | "shop_gossip_hub" | "specsell" | "state_aerialis_barricuda" | "state_aerialis_basekill" | "state_aerialis_corngoat" | "state_aerialis_lockup" | "state_aerialis_monologue" | "state_aerialis_monologue_iteration1" | "state_aerialis_monologue_iteration2" | "state_aerialis_mttanswer" | "state_aerialis_puzzle2os" | "state_aerialis_talentfails" | "state_aerialis_crafterresult" | "state_aerialis_valuediff" | "state_aerialis_royalguards" | "state_foundry_kiddreaction" | "state_foundry_astrofood" | "state_foundry_blookdate" | "state_foundry_blookmusic" | "state_foundry_doge" | "state_foundry_kidddeath" | "state_foundry_kiddturns" | "state_foundry_maddummy" | "state_foundry_muffet" | "state_foundry_npc86" | "state_foundry_npc86_feelings" | "state_foundry_npc86_mood" | "state_foundry_punchcards" | "state_foundry_puzzlepylon1Ax" | "state_foundry_puzzlepylon1Ay" | "state_foundry_puzzlepylon1Bx" | "state_foundry_puzzlepylon1By" | "state_foundry_puzzlepylon2Ax" | "state_foundry_puzzlepylon2Ay" | "state_foundry_puzzlepylon2Bx" | "state_foundry_puzzlepylon2By" | "state_foundry_puzzlepylon2Cx" | "state_foundry_puzzlepylon2Cy" | "state_foundry_puzzlepylon2Dx" | "state_foundry_puzzlepylon2Dy" | "state_foundry_puzzlepylon3Ax" | "state_foundry_puzzlepylon3Ay" | "state_foundry_puzzlepylon3Bx" | "state_foundry_puzzlepylon3By" | "state_foundry_puzzlepylon3Cx" | "state_foundry_puzzlepylon3Cy" | "state_foundry_puzzlepylon3Dx" | "state_foundry_puzzlepylon3Dy" | "state_foundry_puzzlepylon3Ex" | "state_foundry_puzzlepylon3Ey" | "state_foundry_puzzlepylon3Fx" | "state_foundry_puzzlepylon3Fy" | "state_foundry_puzzlepylon3Gx" | "state_foundry_puzzlepylon3Gy" | "state_foundry_puzzlepylon3Hx" | "state_foundry_puzzlepylon3Hy" | "state_foundry_spiders" | "state_foundry_swansong" | "state_foundry_tempet" | "state_foundry_thundersnail" | "state_foundry_undyne" | "state_foundry_kiddbully" | "state_aerialis_coreenter" | "state_aerialis_coreleave" | "state_aerialis_corepath_puzzle" | "state_aerialis_corepath_warrior" | "state_aerialis_corepath_state" | "state_papyrus_capture" | "state_papyrus_spaghet" | "state_papyrus_view" | "state_pie" | "state_starton_azzybridge" | "state_starton_doggo" | "state_starton_dogs" | "state_starton_creamz" | "state_starton_greatdog" | "state_starton_latefetch" | "state_starton_lesserdog" | "state_starton_nicecream" | "state_starton_npc98" | "state_starton_papyrus" | "state_starton_s_puzzle1" | "state_starton_s_puzzle2" | "state_starton_sleep" | "state_starton_spaghetti" | "state_starton_xtower" | "state_toriel_book" | "state_toriel_food" | "state_toriel_runaway" | "state_wastelands_candy" | "state_wastelands_mash" | "state_wastelands_dummy" | "state_wastelands_froggit" | "state_wastelands_napstablook" | "state_wastelands_toriel" | "undyne_attackRunoff" | "undyne_chaseX" | "undyne_chaseY" | "undyne_hp" | "undyne_phase" | "undyne_speed";
        }[];
        dataString: {
            domain: "dataString";
            key: "name" | "armor" | "weapon" | "chasecheckpoint" | "pms" | "room" | "state_foundry_deathroom" | "state_foundry_f_puzzle1" | "state_foundry_f_puzzle2" | "state_foundry_f_chaseTrap" | "state_foundry_f_chaseHole" | "state_foundry_f_puzzle3" | "state_starton_s_puzzle3" | "state_starton_s_town1" | "state_aerialis_a_core_left1" | "state_aerialis_a_core_left2";
        }[];
        flagBoolean: {
            domain: "flagBoolean";
            key: "legs" | "option_music" | "option_sfx" | "option_right" | "reveal_twinkly" | "w_state_core" | "asriel_trashcom" | "asriel_phone" | "asriel_electrics" | "asriel_bpants" | "asriel_access" | "confront_twinkly" | "enrage_twinkly" | "demo_complete";
        }[];
        flagNumber: {
            domain: "flagNumber";
            key: "option_music" | "option_sfx" | "undying" | "hash" | "azzy_assist" | "azzy_neo" | "azzy_neo_pickup" | "deaths" | "encounter_twinkly" | "ga_asriel0" | "ga_asriel1" | "ga_asriel3" | "ga_asriel6" | "ga_asriel9" | "ga_asriel10" | "ga_asriel17" | "ga_asriel20" | "ga_asriel24" | "ga_asriel26" | "ga_asriel28" | "ga_asriel29" | "ga_asriel30" | "ga_asriel30d" | "ga_asriel30x" | "ga_asriel31" | "ga_asriel32" | "ga_asriel33" | "ga_asriel35" | "ga_asriel38" | "ga_asriel40" | "ga_asriel43" | "ga_asriel46" | "ga_asriel49" | "ga_asriel52" | "ga_asriel53" | "ga_asriel54" | "ga_asriel55" | "ga_asrielMoneyX3" | "ga_asrielMoneyX4" | "ga_asrielBeast" | "ga_asrielCorner" | "ga_asrielDrawing" | "ga_asrielEcho1" | "ga_asrielEcho2" | "ga_asrielEcho3" | "ga_asrielEcho4" | "ga_asrielElite1" | "ga_asrielEpic" | "ga_asrielFetch" | "ga_asrielKidd1" | "ga_asrielKidd2" | "ga_asrielKiddFinal1" | "ga_asrielKiddFinal3a" | "ga_asrielKiddFinal3b" | "ga_asrielKiddWalk" | "ga_asrielNapstakill" | "ga_asrielPapyrus1" | "ga_asrielPuzzleStop1" | "ga_asrielRobo1" | "ga_asrielSpanner" | "ga_asrielStutter" | "ga_asrielUndying" | "ga_asrielUndyneX" | "ga_asrielLab1" | "ga_asrielLab2" | "ga_asrielLab3" | "ga_asrielGate" | "ga_asrielLift" | "ga_asrielSkySign1" | "ga_asrielTerminal1" | "ga_asrielDummy" | "ga_asrielGetThePhone" | "ga_asrielGetThePhone2" | "ga_asrielOutlands1" | "ga_asrielOutlands2" | "ga_asrielOutlands3" | "ga_asrielOutlands4" | "ga_asrielOutlands5" | "ga_asrielOutlands6" | "ga_asrielOutlands7" | "ga_asrielHotel0" | "ga_asrielElectrics0" | "ga_asrielHotel1" | "ga_asrielElectrics1" | "ga_asrielHotel2" | "ga_asrielCore0" | "ga_asrielCore1" | "ga_asrielCore2" | "ga_asrielCore4" | "ga_asrielCore5" | "ga_asrielCore6" | "ga_asrielCore7" | "ga_asrielDrink" | "ga_asrielFireplace" | "ga_asrielSpareketeer" | "ga_asrielSus1" | "ga_asrielXtower" | "ga_asrielCorenote" | "ga_asrielOnion" | "ga_asrielCoffin" | "ga_asrielTimewaster" | "ga_asrielDog" | "ga_asrielWreckage" | "ga_asrielMadfish" | "genocide_milestone" | "genocide_twinkly" | "progress_twinkly" | "state_toriel";
        }[];
        flagString: {
            domain: "flagString";
            key: string;
        }[];
    };
    readonly entries: {
        domain: "dataBoolean";
        key: "item_laser" | "item_visor" | "item_mystery_key" | "kitchencall" | "starbertA" | "starbertB" | "starbertC" | "water" | "stargum" | "a_state_pm_electrospear" | "a_state_napstadecline" | "a_state_hapstablook" | "a_state_gotphone" | "a_state_m3" | "a_state_moneyitemA" | "a_state_moneyitemB" | "a_state_moneyitemC" | "a_state_armwrecker" | "a_state_legwrecker" | "a_state_fishbetray" | "a_state_puzzlehelp" | "a_state_asrielTimewaster" | "bad_lizard" | "cell_about" | "cell_flirt" | "cell_mom" | "cell_puzzle" | "cell_puzzle_alphys" | "colleg" | "f_state_blookbetray" | "f_state_blookmusic1" | "f_state_blookmusic2" | "f_state_blookmusic3" | "f_state_dc_kidd2" | "f_state_dc_kidd3" | "f_state_dc_kidd4" | "f_state_dc_kidd6" | "f_state_dc_kidd7" | "f_state_dc_kidd10" | "f_state_done86" | "f_state_dummypunch" | "f_state_dummytalk" | "f_state_exitdate" | "f_state_ghosthug" | "f_state_ghostsleep" | "f_state_kidd_act" | "f_state_kidd_betray" | "f_state_kidd_bird" | "f_state_kidd_cream" | "f_state_kidd_fight" | "f_state_kidd_magic" | "f_state_kidd_mercy" | "f_state_kidd_napstacom" | "f_state_kidd_prechase" | "f_state_kidd_snailcom" | "f_state_kidd_statue" | "f_state_kidd_temmiecom" | "f_state_kidd_trashcom" | "f_state_kidd_trauma" | "f_state_kidd_undynecom" | "f_state_mushroomdance" | "f_state_mushroomdanceGeno" | "f_state_narrator_bird" | "f_state_nicecream" | "f_state_noticard" | "f_state_oopsprimer" | "f_state_papclothes" | "f_state_piano" | "f_state_sacrifice" | "f_state_telescope" | "f_state_temstatue" | "f_state_thundersnail_win" | "f_state_truth" | "f_state_hapstadoor" | "assist_madjick" | "assist_knightknight" | "flirt_dogamy" | "flirt_dogaressa" | "flirt_doge" | "flirt_doggo" | "flirt_froggit" | "flirt_greatdog" | "flirt_jerry" | "flirt_lesserdog" | "flirt_loox" | "flirt_maddummy" | "flirt_mettaton" | "flirt_migosp" | "flirt_migospel" | "flirt_moldbygg" | "flirt_moldsmal" | "flirt_mouse" | "flirt_muffet" | "flirt_mushy" | "flirt_papyrus" | "flirt_radtile" | "flirt_rg03" | "flirt_rg04" | "flirt_shyren" | "flirt_spacetop" | "flirt_stardrake" | "flirt_undyne" | "flirt_whimsun" | "flirt_woshua" | "flirt_perigee" | "flirt_pyrope" | "flirt_tsundere" | "flirt_madjick" | "flirt_knightknight" | "flirt_froggitex" | "flirt_whimsalot" | "flirt_glyde" | "flirt_astigmatism" | "flirt_mushketeer" | "fryz" | "genocide" | "a_state_bedroom" | "a_state_corecall" | "a_state_flipflopper" | "a_state_backtracker" | "a_state_corekill1" | "a_state_corekill2" | "heard_narrator" | "item_artifact" | "item_blookpie" | "item_boots" | "item_chocolate" | "item_electrospear" | "item_eye" | "item_glove" | "item_goggles" | "item_halo" | "item_jumpsuit" | "item_little_dipper" | "item_padd" | "item_quiche" | "item_temyarmor" | "item_tvm_radio" | "item_tvm_fireworks" | "item_tvm_mewmew" | "item_face_steak" | "item_voidy" | "item_mystery_food" | "item_tablaphone" | "item_sonic" | "item_moonpie" | "key_coffin" | "cetadel" | "killed_shyren" | "bullied_shyren" | "killed_glyde" | "killed_madjick" | "killed_knightknight" | "napsta_performance" | "oops" | "papyrus_fire" | "papyrus_piggy" | "papyrus_quality" | "papyrus_specatk" | "papyrus_secret" | "s_state_capstation" | "s_state_chareader" | "s_state_chargazer" | "s_state_chilldrake" | "s_state_lesser" | "s_state_mathpass" | "s_state_million" | "s_state_million_garb" | "s_state_pilfer" | "s_state_puzzlenote" | "s_state_redbook" | "s_state_reservation" | "s_state_papsink" | "snail_pie" | "spared_froggit" | "spared_jerry" | "spared_loox" | "spared_migosp" | "spared_moldbygg" | "spared_moldsmal" | "spared_mouse" | "spared_mushy" | "spared_radtile" | "spared_shyren" | "spared_spacetop" | "spared_stardrake" | "spared_whimsun" | "spared_woshua" | "spared_perigee" | "spared_pyrope" | "spared_tsundere" | "spared_madjick" | "spared_knightknight" | "spared_froggitex" | "spared_whimsalot" | "spared_glyde" | "spared_astigmatism" | "spared_mushketeer" | "steal_blook" | "steal_hare" | "steal_tem" | "steal_gossip" | "toriel_ask" | "toriel_home" | "toriel_phone" | "toriel_twinkly" | "undyne_hardmode" | "w_state_catnap" | "w_state_diary" | "w_state_fightroom" | "w_state_soda" | "w_state_steak" | "w_state_latetoriel" | "onionsan";
    }[] | {
        domain: "dataNumber";
        key: "time" | "g" | "bully" | "exp" | "hp" | "state_starton_s_puzzle3" | "steps" | "hits" | "bad_lizard" | "base1" | "cell_hello" | "choice_flavor" | "encounters" | "fluids" | "kills" | "corekills" | "kills_aerialis" | "kills_foundry" | "kills_starton" | "kills_wastelands" | "bully_aerialis" | "bully_foundry" | "bully_starton" | "bully_wastelands" | "plot" | "plot_call" | "plot_date" | "plot_kidd" | "plot_approach" | "plot_pmcheck" | "plot_stalker" | "shop_deadfish" | "shop_gerson" | "shop_homeworld" | "shop_bpants_advice" | "shop_bpants_hub" | "shop_gossip_alphys" | "shop_gossip_hub" | "specsell" | "state_aerialis_barricuda" | "state_aerialis_basekill" | "state_aerialis_corngoat" | "state_aerialis_lockup" | "state_aerialis_monologue" | "state_aerialis_monologue_iteration1" | "state_aerialis_monologue_iteration2" | "state_aerialis_mttanswer" | "state_aerialis_puzzle2os" | "state_aerialis_talentfails" | "state_aerialis_crafterresult" | "state_aerialis_valuediff" | "state_aerialis_royalguards" | "state_foundry_kiddreaction" | "state_foundry_astrofood" | "state_foundry_blookdate" | "state_foundry_blookmusic" | "state_foundry_doge" | "state_foundry_kidddeath" | "state_foundry_kiddturns" | "state_foundry_maddummy" | "state_foundry_muffet" | "state_foundry_npc86" | "state_foundry_npc86_feelings" | "state_foundry_npc86_mood" | "state_foundry_punchcards" | "state_foundry_puzzlepylon1Ax" | "state_foundry_puzzlepylon1Ay" | "state_foundry_puzzlepylon1Bx" | "state_foundry_puzzlepylon1By" | "state_foundry_puzzlepylon2Ax" | "state_foundry_puzzlepylon2Ay" | "state_foundry_puzzlepylon2Bx" | "state_foundry_puzzlepylon2By" | "state_foundry_puzzlepylon2Cx" | "state_foundry_puzzlepylon2Cy" | "state_foundry_puzzlepylon2Dx" | "state_foundry_puzzlepylon2Dy" | "state_foundry_puzzlepylon3Ax" | "state_foundry_puzzlepylon3Ay" | "state_foundry_puzzlepylon3Bx" | "state_foundry_puzzlepylon3By" | "state_foundry_puzzlepylon3Cx" | "state_foundry_puzzlepylon3Cy" | "state_foundry_puzzlepylon3Dx" | "state_foundry_puzzlepylon3Dy" | "state_foundry_puzzlepylon3Ex" | "state_foundry_puzzlepylon3Ey" | "state_foundry_puzzlepylon3Fx" | "state_foundry_puzzlepylon3Fy" | "state_foundry_puzzlepylon3Gx" | "state_foundry_puzzlepylon3Gy" | "state_foundry_puzzlepylon3Hx" | "state_foundry_puzzlepylon3Hy" | "state_foundry_spiders" | "state_foundry_swansong" | "state_foundry_tempet" | "state_foundry_thundersnail" | "state_foundry_undyne" | "state_foundry_kiddbully" | "state_aerialis_coreenter" | "state_aerialis_coreleave" | "state_aerialis_corepath_puzzle" | "state_aerialis_corepath_warrior" | "state_aerialis_corepath_state" | "state_papyrus_capture" | "state_papyrus_spaghet" | "state_papyrus_view" | "state_pie" | "state_starton_azzybridge" | "state_starton_doggo" | "state_starton_dogs" | "state_starton_creamz" | "state_starton_greatdog" | "state_starton_latefetch" | "state_starton_lesserdog" | "state_starton_nicecream" | "state_starton_npc98" | "state_starton_papyrus" | "state_starton_s_puzzle1" | "state_starton_s_puzzle2" | "state_starton_sleep" | "state_starton_spaghetti" | "state_starton_xtower" | "state_toriel_book" | "state_toriel_food" | "state_toriel_runaway" | "state_wastelands_candy" | "state_wastelands_mash" | "state_wastelands_dummy" | "state_wastelands_froggit" | "state_wastelands_napstablook" | "state_wastelands_toriel" | "undyne_attackRunoff" | "undyne_chaseX" | "undyne_chaseY" | "undyne_hp" | "undyne_phase" | "undyne_speed";
    }[] | {
        domain: "dataString";
        key: "name" | "armor" | "weapon" | "chasecheckpoint" | "pms" | "room" | "state_foundry_deathroom" | "state_foundry_f_puzzle1" | "state_foundry_f_puzzle2" | "state_foundry_f_chaseTrap" | "state_foundry_f_chaseHole" | "state_foundry_f_puzzle3" | "state_starton_s_puzzle3" | "state_starton_s_town1" | "state_aerialis_a_core_left1" | "state_aerialis_a_core_left2";
    }[] | {
        domain: "flagBoolean";
        key: "legs" | "option_music" | "option_sfx" | "option_right" | "reveal_twinkly" | "w_state_core" | "asriel_trashcom" | "asriel_phone" | "asriel_electrics" | "asriel_bpants" | "asriel_access" | "confront_twinkly" | "enrage_twinkly" | "demo_complete";
    }[] | {
        domain: "flagNumber";
        key: "option_music" | "option_sfx" | "undying" | "hash" | "azzy_assist" | "azzy_neo" | "azzy_neo_pickup" | "deaths" | "encounter_twinkly" | "ga_asriel0" | "ga_asriel1" | "ga_asriel3" | "ga_asriel6" | "ga_asriel9" | "ga_asriel10" | "ga_asriel17" | "ga_asriel20" | "ga_asriel24" | "ga_asriel26" | "ga_asriel28" | "ga_asriel29" | "ga_asriel30" | "ga_asriel30d" | "ga_asriel30x" | "ga_asriel31" | "ga_asriel32" | "ga_asriel33" | "ga_asriel35" | "ga_asriel38" | "ga_asriel40" | "ga_asriel43" | "ga_asriel46" | "ga_asriel49" | "ga_asriel52" | "ga_asriel53" | "ga_asriel54" | "ga_asriel55" | "ga_asrielMoneyX3" | "ga_asrielMoneyX4" | "ga_asrielBeast" | "ga_asrielCorner" | "ga_asrielDrawing" | "ga_asrielEcho1" | "ga_asrielEcho2" | "ga_asrielEcho3" | "ga_asrielEcho4" | "ga_asrielElite1" | "ga_asrielEpic" | "ga_asrielFetch" | "ga_asrielKidd1" | "ga_asrielKidd2" | "ga_asrielKiddFinal1" | "ga_asrielKiddFinal3a" | "ga_asrielKiddFinal3b" | "ga_asrielKiddWalk" | "ga_asrielNapstakill" | "ga_asrielPapyrus1" | "ga_asrielPuzzleStop1" | "ga_asrielRobo1" | "ga_asrielSpanner" | "ga_asrielStutter" | "ga_asrielUndying" | "ga_asrielUndyneX" | "ga_asrielLab1" | "ga_asrielLab2" | "ga_asrielLab3" | "ga_asrielGate" | "ga_asrielLift" | "ga_asrielSkySign1" | "ga_asrielTerminal1" | "ga_asrielDummy" | "ga_asrielGetThePhone" | "ga_asrielGetThePhone2" | "ga_asrielOutlands1" | "ga_asrielOutlands2" | "ga_asrielOutlands3" | "ga_asrielOutlands4" | "ga_asrielOutlands5" | "ga_asrielOutlands6" | "ga_asrielOutlands7" | "ga_asrielHotel0" | "ga_asrielElectrics0" | "ga_asrielHotel1" | "ga_asrielElectrics1" | "ga_asrielHotel2" | "ga_asrielCore0" | "ga_asrielCore1" | "ga_asrielCore2" | "ga_asrielCore4" | "ga_asrielCore5" | "ga_asrielCore6" | "ga_asrielCore7" | "ga_asrielDrink" | "ga_asrielFireplace" | "ga_asrielSpareketeer" | "ga_asrielSus1" | "ga_asrielXtower" | "ga_asrielCorenote" | "ga_asrielOnion" | "ga_asrielCoffin" | "ga_asrielTimewaster" | "ga_asrielDog" | "ga_asrielWreckage" | "ga_asrielMadfish" | "genocide_milestone" | "genocide_twinkly" | "progress_twinkly" | "state_toriel";
    }[] | {
        domain: "flagString";
        key: string;
    }[];
    readonly pages: number;
    clearIndex(): void;
    clearInput(): void;
};
export declare const inspector: {
    index: number | null;
    switches: {
        base: boolean;
        below: boolean;
        main: boolean;
        above: boolean;
        menu: boolean;
        hitbox: boolean;
        sprite: boolean;
        text: boolean;
    };
    hitboxGraphics: Graphics;
    hitboxTint: number;
    target: {
        objects: CosmosObject[];
    } | null;
    rootNode: {
        objects: CosmosObject[];
    }[];
    path: number[];
    resolvePath(): {
        objects: CosmosObject[];
    }[];
    reportText: CosmosText<CosmosBaseEvents, {
        __debug__: boolean;
    }>;
    generateReport(target: CosmosRendererLayer | CosmosObject, index: number): string;
};
export declare const logician: {
    error: any;
    errored: boolean;
    scroll: number;
    tab: number;
    viteError: symbol;
    inspect(value: any): string;
    process(value: string): string;
    suspend(error: any): void;
    resume(): void;
};
export declare const storage: {
    index: number;
    container: "dimboxA" | "dimboxB" | "inventory";
    restoreInput: boolean;
    disable(): void;
};
export declare const panel: {
    dragger: {
        state: boolean;
        origin: {
            x: number;
            y: number;
        };
        offset: {
            x: number;
            y: number;
        };
    };
    object: CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    renderer: CosmosRenderer<"main", CosmosBaseEvents>;
    serializeSAVE(): string;
    start(): void;
    stop(): void;
    tab: {
        objects: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>[];
        switch(tab: number): void;
        readonly value: number;
    };
    readonly timer: import("./api").CosmosTimer<import("./api").CosmosTimerEvents>;
    userError: boolean;
};
