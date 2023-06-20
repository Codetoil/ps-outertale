import { Filter } from 'pixi.js';
import { OutertaleChoice, OutertaleLayerKey, OutertaleMap, OutertaleRoom, OutertaleSpeechPreset } from './classes';
import { CosmosAtlas } from './engine/atlas';
import { CosmosDaemon, CosmosEffect, CosmosInstance, CosmosMixer } from './engine/audio';
import { CosmosEventHost, CosmosRegistry } from './engine/core';
import { CosmosSprite } from './engine/image';
import { CosmosKeyboardInput } from './engine/input';
import { CosmosPointSimple, CosmosValueRandom } from './engine/numerics';
import { CosmosHitbox, CosmosObject, CosmosRenderer } from './engine/renderer';
import { CosmosTyper } from './engine/text';
import { CosmosDirection, CosmosKeyed, CosmosProvider } from './engine/utils';
export declare const atlas: CosmosAtlas<string>;
export declare const audio: {
    context: AudioContext;
    music: CosmosRegistry<string, CosmosDaemon>;
    musicFilter: CosmosEffect;
    musicReverb: CosmosEffect;
    musicRouter(input: GainNode, context: AudioContext): void;
    musicToggle: GainNode;
    musicMixer: CosmosMixer;
    soundRouter(input: GainNode, context: AudioContext): void;
    sounds: CosmosRegistry<string, CosmosDaemon>;
    soundToggle: GainNode;
};
export declare const backend: {
    available: boolean;
    readonly data: string;
    dialog: {
        open(): Promise<string | null>;
        save(content: string): Promise<boolean>;
    };
    file: {
        writeRoom(room: string, content: string): Promise<boolean>;
        writeSave(content: string): Promise<boolean>;
    };
    readonly mods: string[];
    reload(respawn?: boolean): void;
    toggle: {
        panel(state?: boolean): Promise<void>;
    };
};
export declare function exit(): void;
export declare const launch: {
    intro: boolean;
    overworld: boolean;
    timeline: boolean;
};
export declare const events: CosmosEventHost<{
    battle: [];
    'battle-exit': [];
    choice: [OutertaleChoice];
    defeat: [];
    drop: [string];
    escape: [];
    exit: [];
    heal: [CosmosHitbox, number];
    hurt: [CosmosHitbox, number];
    init: [];
    'init-intro': [];
    'init-between': [];
    'init-overworld': [];
    leap: [];
    loaded: [];
    'loaded-mod': [string];
    modded: [];
    ready: [];
    reset: [];
    resume: [];
    select: ['fight' | 'spare' | 'flee' | 'assist'] | ['act' | 'item', string];
    script: [string, ...string[]];
    shut: [];
    spawn: [];
    step: [];
    swing: [];
    swipe: [number, CosmosPointSimple];
    talk: [];
    tick: [];
    teleport: [string, string];
    'teleport-start': [string, string];
    'teleport-update': [CosmosDirection, CosmosPointSimple];
    touch: [number, CosmosPointSimple?];
    use: [string];
    victory: [];
}>;
export declare const fonts: {
    ComicSans: string;
    CryptOfTomorrow: string;
    DeterminationMono: string;
    DeterminationSans: string;
    DiaryOfAn8BitMage: string;
    DotumChe: string;
    MarsNeedsCunnilingus: string;
    Papyrus: string;
};
export declare const fontLoader: Promise<void>;
export declare const game: {
    /** whether the player has loaded into the world or not */
    active: boolean;
    /** game camera director */
    camera: CosmosObject<import("./engine/renderer").CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    /** some developer menu is active */
    developer: boolean;
    /** fullscreen state */
    readonly fullscreen: boolean;
    /** game initialized */
    init: boolean;
    /** enable or disable all input */
    input: boolean;
    /** allow interactions (automatic value) */
    interact: boolean;
    /** allow opening overworld menu */
    menu: boolean;
    /** enable or disable overworld movement */
    movement: boolean;
    /** current music */
    music: CosmosInstance | null;
    /** disable player hitbox from interacting with the overworld */
    noclip: boolean;
    /** get ratio'd */
    ratio: number;
    /** handle resizing */
    resize(): void;
    /** current room */
    room: string;
    /** true if player has spawned */
    spawned: boolean;
    /** the current dialoguer text */
    text: string;
    /** game timer */
    timer: boolean;
    vortex: boolean;
};
export declare const image: {
    filters: CosmosRegistry<string, Filter>;
    tints: CosmosRegistry<string, number>;
};
export declare function init(): void;
export declare const items: CosmosRegistry<string, {
    type: 'consumable' | 'armor' | 'weapon' | 'special';
    value: number;
    sell1?: number | undefined;
    sell2?: number | undefined;
    text: {
        battle: {
            description: CosmosProvider<string>;
            name: CosmosProvider<string>;
        };
        drop: CosmosProvider<string[]>;
        info: CosmosProvider<string[]>;
        name: CosmosProvider<string>;
        use: CosmosProvider<string[]>;
    };
}>;
export declare const keys: {
    altKey: CosmosKeyboardInput;
    backspaceKey: CosmosKeyboardInput;
    downKey: CosmosKeyboardInput;
    editorKey: CosmosKeyboardInput;
    freecamKey: CosmosKeyboardInput;
    interactKey: CosmosKeyboardInput;
    leftKey: CosmosKeyboardInput;
    menuKey: CosmosKeyboardInput;
    noclipKey: CosmosKeyboardInput;
    openKey: CosmosKeyboardInput;
    quitKey: CosmosKeyboardInput;
    rightKey: CosmosKeyboardInput;
    saveKey: CosmosKeyboardInput;
    shiftKey: CosmosKeyboardInput;
    specialKey: CosmosKeyboardInput;
    upKey: CosmosKeyboardInput;
};
export declare const maps: CosmosRegistry<string, OutertaleMap>;
export declare function param(key: string, value?: string | null): void;
export declare const random: CosmosValueRandom;
/** reload the game */
export declare function reload(respawn?: boolean): Promise<void>;
export declare const renderer: CosmosRenderer<OutertaleLayerKey, import("./engine/renderer").CosmosBaseEvents>;
export declare const rooms: CosmosRegistry<string, OutertaleRoom>;
export declare const speech: {
    emoters: CosmosKeyed<CosmosSprite<import("./engine/renderer").CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>>;
    state: {
        face: CosmosSprite<import("./engine/renderer").CosmosBaseEvents, import("./engine/renderer").CosmosMetadata> | null;
        readonly font1: string;
        readonly font2: string;
        preset: OutertaleSpeechPreset;
    };
    presets: CosmosRegistry<string, OutertaleSpeechPreset>;
    targets: Set<CosmosSprite<import("./engine/renderer").CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>>;
};
export declare const timer: import("./engine/core").CosmosTimer<import("./engine/core").CosmosTimerEvents>;
export declare const typer: CosmosTyper;
