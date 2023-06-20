import { Filter } from 'pixi.js';
import { OutertaleBox, OutertaleChoice, OutertaleGroup, OutertaleLayerKey, OutertaleMap, OutertaleOpponent, OutertaleRoomDecorator, OutertaleShop, OutertaleStat, OutertaleTurnState, OutertaleVolatile, OutertaleWeapon } from './classes';
import { CosmosDaemon, CosmosInstance } from './engine/audio';
import { CosmosCache, CosmosInventory, CosmosRegistry, CosmosTimer } from './engine/core';
import { CosmosCharacter, CosmosCharacterPreset, CosmosCharacterProperties, CosmosEntity, CosmosPlayer } from './engine/entity';
import { CosmosAnimation, CosmosColor, CosmosImage, CosmosSprite, CosmosSpriteProperties } from './engine/image';
import { CosmosPoint, CosmosPointSimple, CosmosValue } from './engine/numerics';
import { CosmosBaseEvents, CosmosHitbox, CosmosObject, CosmosSizedObjectProperties } from './engine/renderer';
import { CosmosRectangle } from './engine/shapes';
import { CosmosText, CosmosTextProperties, CosmosTyper } from './engine/text';
import { CosmosBasic, CosmosDirection, CosmosKeyed, CosmosNot, CosmosProvider } from './engine/utils';
export declare const deathContext: AudioContext;
export declare const deathTimer: CosmosTimer<import("./engine/core").CosmosTimerEvents>;
export declare const deathToggle: GainNode;
export declare function deathRouter(input: GainNode, context: AudioContext): void;
export declare const battler: {
    /** in battle screen */
    active: boolean;
    /** nomore act keys! */
    acts: CosmosRegistry<string, string>;
    add(opponent: OutertaleOpponent, position: CosmosPointSimple): number;
    readonly alive: OutertaleVolatile[];
    alpha: CosmosValue;
    /** whether the assist option is present */
    assist: boolean;
    attack(volatile: OutertaleVolatile, { item, power, operation }: {
        item?: string | undefined;
        power?: number | undefined;
        operation?: "none" | "add" | "multiply" | "calculate" | undefined;
    }, noEffects?: boolean, noVictory?: boolean, noArc?: boolean): Promise<boolean>;
    /** damage multiplier for next attack */
    attackMultiplier: number;
    battlefall(player: CosmosPlayer, target?: CosmosPointSimple | null): Promise<void>;
    box: OutertaleBox;
    btext: {
        victory(): Promise<void>;
        death(): Promise<void>;
        escape(): void;
    };
    bubbles: {
        dummy: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        napstablook: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        napstablook2: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        sans: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        twinkly: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        twinkly2: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        mtt: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
        mttphone: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    };
    readonly bullied: OutertaleVolatile[];
    buttons: CosmosAnimation<CosmosBaseEvents, {
        button: string;
    }>[];
    calculate(volatile: OutertaleVolatile, power: number, item?: string): number;
    cleanup(): void;
    clipFilter: {
        value: Filter | null;
    };
    damage(sprite: CosmosSprite, damage: number, modifier?: number | null, inv?: boolean, bullet?: CosmosHitbox<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>, papyrus?: boolean, override?: boolean): void;
    /** damage multiplier for next bullets */
    damageMultiplier: number;
    deadeye: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    deadeyeScale: {
        x: number;
        y: number;
    };
    deathText: string;
    deathTimer: CosmosTimer<import("./engine/core").CosmosTimerEvents>;
    deathTyper: CosmosTyper;
    defeat(): Promise<void>;
    encounter(player: CosmosPlayer, group: OutertaleGroup, notify?: boolean, persistmusic?: boolean, target?: CosmosPointSimple | null): Promise<void>;
    encounter_state: {
        movement: boolean;
    };
    exp: number;
    fight(): Promise<void>;
    /** whether the flee option is present */
    flee: boolean;
    g: number;
    garbage: [CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata> | OutertaleLayerKey, CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>][];
    /** battler grid backdrop */
    grid: CosmosImage | null;
    gridder: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    human(...lines: string[]): Promise<void>;
    readonly hurt: OutertaleVolatile[];
    idle1(target: number): Promise<void>;
    idle2(target: number): Promise<void>;
    readonly indexes: number[];
    readonly involna: number;
    invulnerable: boolean;
    load(group: OutertaleGroup): Promise<[void, ...void[]]>;
    line: {
        active: boolean;
        readonly amount: number;
        offset: number;
        loop: number;
        sticky: boolean;
        swap: number;
        width: number;
        pos: {
            x: number;
            y: number;
        };
        maxY: number | null;
        minY: number | null;
        reset(): void;
    };
    love(): boolean;
    readonly modifier: number;
    monster(cutscene: boolean, position: CosmosPointSimple, bubble: CosmosSprite, ...lines: string[]): Promise<void>;
    music: CosmosInstance | null;
    opponentHandler<A extends CosmosKeyed>({ bubble, defaultTalk, defaultStatus, vars, prechoice, prefight, fight, postfight, fake, preact, act, kill, postact, preitem, item, postitem, spare, flee, assist, postchoice, pretalk, posttalk, prestatus, poststatus }?: {
        bubble?: CosmosProvider<[CosmosPointSimple, CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>], [CosmosPoint]> | undefined;
        defaultTalk?: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]> | undefined;
        defaultStatus?: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]> | undefined;
        vars?: A | undefined;
        prechoice?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        prefight?: ((state: OutertaleTurnState<A>, power: number) => Promise<void> | void) | undefined;
        fight?: (({ volatile }: OutertaleTurnState<A>, power: number) => Promise<boolean>) | undefined;
        postfight?: ((state: OutertaleTurnState<A>, power: number) => Promise<void> | void) | undefined;
        fake?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        preact?: ((state: OutertaleTurnState<A>, act: string) => Promise<void> | void) | undefined;
        act?: Partial<CosmosKeyed<(state: OutertaleTurnState<A>) => Promise<void> | void, string>> | undefined;
        kill?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        postact?: ((state: OutertaleTurnState<A>, act: string) => Promise<void> | void) | undefined;
        preitem?: ((state: OutertaleTurnState<A>, item: string) => Promise<void> | void) | undefined;
        item?: Partial<CosmosKeyed<(state: OutertaleTurnState<A>) => Promise<void> | void, string>> | undefined;
        postitem?: ((state: OutertaleTurnState<A>, item: string) => Promise<void> | void) | undefined;
        spare?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        flee?: ((state: OutertaleTurnState<A>) => Promise<boolean> | boolean) | undefined;
        assist?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        postchoice?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        pretalk?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        posttalk?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        prestatus?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
        poststatus?: ((state: OutertaleTurnState<A>) => Promise<void> | void) | undefined;
    }): OutertaleOpponent['handler'];
    readonly opponents: OutertaleOpponent[];
    overlay: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    rand(limit: number, compute?: boolean): number;
    refocus(): void;
    reset(): void;
    resume(script?: () => Promise<void>): Promise<void>;
    sequence(count: number, generator: (promises: Promise<void>[], index: number) => Promise<void>): Promise<void>;
    shadow: CosmosSprite<CosmosBaseEvents, {
        cooldown: number;
        jumptimer: number;
        tinyColor: number;
    }>;
    simple(script: () => Promise<void>): Promise<void>;
    SOUL: CosmosEntity<CosmosBaseEvents, {
        color: "red" | "blue" | "cyan" | "green" | "purple" | "orange" | "yellow";
        collision: boolean;
        cyanMover: boolean;
        cyanLeap: boolean;
        shota: boolean;
        shotb: boolean;
    }>;
    spare(target?: number, noEffects?: boolean, noVictory?: boolean): boolean;
    sparing(choice: OutertaleChoice): boolean;
    start(group: OutertaleGroup): Promise<void>;
    stat: {
        invulnerability: OutertaleStat;
        speed: OutertaleStat;
        monsterdef: OutertaleStat;
        monsteratk: OutertaleStat;
    };
    status: string[];
    readonly target: void | OutertaleVolatile;
    time: number;
    unload(group: OutertaleGroup): Promise<[void, ...void[]]>;
    readonly bullets: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    vaporize(sprite: CosmosSprite, { rate, sound, spread, filter, handler }?: {
        rate?: number | undefined;
        sound?: boolean | undefined;
        spread?: number | undefined;
        filter?: ((color: CosmosColor) => boolean) | undefined;
        handler?: ((increment: number) => void) | null | undefined;
    }): Promise<void>;
    volatile: OutertaleVolatile[];
    weapons: CosmosRegistry<string, OutertaleWeapon>;
};
/** choicer (seperate from battle choice system) */
export declare const choicer: {
    /** rows available in choicer */
    type: number;
    /** spacing from the left edge to the left choicer options */
    marginA: number;
    /** spacing from the center to the right choicer options */
    marginB: number;
    /** position (row of text where the choicer appears) */
    navigator: string | null;
    /** result (what the player selects) */
    result: number;
    /** create choicer */
    create(header: string, margin1: number, margin2: number, ...options: [string, string] | [string, string, string, string] | [string, string, string, string, string, string]): string;
};
export declare const controller: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare const controls: {
    active: boolean;
    readonly base: CosmosPoint;
    object: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    readonly positions: CosmosKeyed<CosmosPointSimple>;
    size: CosmosPoint;
    target: void | "menuKey" | "specialKey" | "interactKey" | "altKey" | "backspaceKey" | "downKey" | "editorKey" | "freecamKey" | "leftKey" | "noclipKey" | "openKey" | "quitKey" | "rightKey" | "saveKey" | "shiftKey" | "upKey";
    touches: number[];
}[];
export declare const dialoguer: {
    display: boolean;
    objects(): CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>[];
};
export declare const dialogueSession: {
    active: boolean;
    movement: boolean;
    state: boolean;
};
export declare const expLevels: number[];
export declare const frontEnder: {
    testSFX(music: boolean): void;
    trueReset: boolean;
    index: number;
    introMusic: CosmosInstance | null;
    impactNoise: CosmosInstance | null;
    menuMusic: CosmosInstance | null;
    /** correct menu music to play */
    readonly menuMusicResource: {
        asset: import("./engine/audio").CosmosAudio;
        daemon: CosmosDaemon;
    };
    name: {
        blacklist: string[];
        shake: CosmosValue;
        value: string;
    };
    createBackground(): CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    updateOptions(): void;
};
export declare const hashes: CosmosCache<string, number>;
export declare const mobile: {
    /** mobile mode assets */
    assets: CosmosInventory<[CosmosImage, CosmosImage, CosmosImage, CosmosImage]>;
    /** renderer canvas bounds (for mobile touch position calculation) */
    bounds: {
        x: number;
        y: number;
    };
};
export declare const mobileLoader: false | Promise<void>;
export declare const pager: {
    /** pager storage */
    storage: CosmosValue[];
    /** create pager */
    create<A extends any[]>(type: 'sequence' | 'random' | 'limit', ...pages: CosmosProvider<string[], A>[]): (...args: A) => string[] | (((...args: A) => string[]) extends infer T ? T extends (...args: A) => string[] ? T extends CosmosProvider<infer B, any[]> ? B : never : never : never);
};
export declare const phone: CosmosRegistry<string, {
    display: () => boolean;
    trigger: () => Promise<void> | void;
    priority?: CosmosProvider<number> | undefined;
    name: CosmosProvider<string>;
}>;
export declare const player: CosmosPlayer<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare const portraits: CosmosRegistry<string, CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>>;
export declare const quitText: CosmosText<CosmosBaseEvents, {
    state: number;
}>;
export declare const saver: {
    display(): Promise<void>;
    load(): void;
    locations: CosmosRegistry<string, {
        name: string;
        text: CosmosProvider<string[]>;
    }>;
    protected: string[];
    reset(trueReset?: boolean, oversave?: boolean, clearTimelines?: boolean): void;
    save(): void;
    savedTime: number;
    transfer(target: Storage): void;
    yellow: boolean;
};
export declare const shopper: {
    readonly index: number;
    readonly listIndex: number;
    open(shop: OutertaleShop, face: CosmosDirection, x: number, y: number, keeper?: boolean): Promise<void>;
    text(...lines: string[]): Promise<void>;
    value: OutertaleShop | null;
};
export declare const sidebarrer: {
    dimbox: "dimboxA" | "dimboxB";
    readonly item: string;
    readonly use: boolean;
    openSettings(): Promise<void>;
};
export declare const spanMin = 3;
export declare const spanBase = 22;
export declare const spanRange = 138;
export declare const teleporter: {
    hot: boolean;
    movement: boolean;
    timer: boolean;
};
export declare const world: {
    /** ambient pitch level for game music */
    readonly ambiance: number;
    bully(): void;
    readonly bullied: boolean;
    /** any active cutscene spanning multiple rooms */
    cutscene(): boolean;
    /** force cutscene mode */
    cutscene_override: boolean;
    /** true if all dogs except lesser dog is dead */
    readonly dead_dog: boolean;
    /** true if papyrus or sans is dead */
    readonly dead_skeleton: boolean;
    /** true if monster kid should be spawned */
    readonly monty: boolean;
    /** whether monsters have been flirted with */
    readonly flirt: number;
    /** current room defualt music gain */
    gain(room: string): number;
    /** genocide route calculator */
    readonly genocide: boolean;
    /** true if goatbro should be spawned */
    readonly azzie: boolean;
    /** kill script */
    kill(): void;
    readonly level: number;
    /** undyne chaser is active */
    readonly phish: boolean;
    /** local monster population */
    readonly population: number;
    rate(music?: string | CosmosDaemon): number;
    /** if napsta isnt happy with u */
    readonly sad_ghost: boolean;
    /** player tracker */
    /** true kill counter */
    readonly trueKills: number;
};
export declare function activate(source: CosmosHitbox, filter: (hitbox: CosmosHitbox) => boolean, interact?: boolean): void;
export declare function backSprite(map: OutertaleMap, name: string): CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare function calcAT(): number;
export declare function calcDF(): number;
export declare function calcHP(): number;
export declare function calcLV(): number;
export declare function calcNX(): number | null;
/** quick character */
export declare function character(key: string, preset: CosmosCharacterPreset, position: CosmosPointSimple, face: CosmosDirection, override?: CosmosNot<CosmosCharacterProperties, "position" | "preset">): CosmosCharacter<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare function colormix(c1: number, c2: number, v: number): number;
export declare function displayTime(value: number): string;
export declare function distanceGravity(v: number, d: number): number;
/** all loaded characters */
export declare function fetchCharacters(): CosmosCharacter<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>[];
/** smart dialogue system */
export declare function dialogue(nav: string, ...lines: string[]): Promise<void>;
export declare function easyRoom(name: string, map: OutertaleMap, decorator: OutertaleRoomDecorator): void;
export declare function fader(properties?: CosmosSizedObjectProperties, layer?: OutertaleLayerKey | null): CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
/** listen for specific header */
export declare function header(target: string): Promise<void>;
export declare function heal(amount?: number, sfx?: boolean): void;
/** get a single instance */
export declare function instance(layer: OutertaleLayerKey, tag: string): void | {
    destroy: () => void;
    talk: (tag: string, provider: (top: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>) => CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>, navigator: string, ...lines: string[]) => Promise<void>;
    tags: any[];
    object: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
};
/** get instances */
export declare function instances(layer: OutertaleLayerKey, tag: string): Generator<{
    destroy: () => void;
    talk: (tag: string, provider: (top: CosmosObject) => CosmosSprite, navigator: string, ...lines: string[]) => Promise<void>;
    tags: any[];
    object: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
}, void, unknown>;
/** isolate an object */
export declare function isolate(self: CosmosObject, room?: string): () => void;
/** isolate multiple objects */
export declare function isolates(selves: CosmosObject[], room?: string): (() => void)[];
export declare function keepActive(this: CosmosSprite): void;
export declare function menuText(x: number, y: number, c: CosmosProvider<string>, properties?: CosmosTextProperties, white?: boolean): CosmosText<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare function menuBox(x: number, y: number, w: number, h: number, b: number, properties?: CosmosSizedObjectProperties): CosmosRectangle<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare function menuFilter(nav: string, navX: CosmosProvider<CosmosBasic>, navY?: CosmosProvider<number>): true | undefined;
export declare function menuSOUL(x: number, y: number, nav: string, navX: CosmosProvider<CosmosBasic>, navY?: CosmosProvider<number>): CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
/** quick notifier */
export declare function notifier(entity: CosmosEntity, time: number, hy?: number): Promise<void>;
/** oops */
export declare function oops(): void;
/** resume music */
export declare function resume({ gain, rate, fade }: {
    gain?: number | undefined;
    rate?: number | undefined;
    fade?: boolean | undefined;
}): void;
/** saw mapper */
export declare function sawWaver(time: number, period: number, from: number, to: number, phase?: number): number;
/** sine mapper */
export declare function sineWaver(time: number, period: number, from: number, to: number, phase?: number): number;
/** sprite echo */
export declare function shadow(sprite: CosmosSprite, ticker: (self: CosmosSprite) => boolean, properties?: CosmosSpriteProperties): {
    object: CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
    promise: Promise<void>;
};
/** quicker shadow func */
export declare function quickshadow(spr: CosmosSprite, position: Partial<CosmosPointSimple> | number, parent?: CosmosObject<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata> | OutertaleLayerKey, alpha?: number, alphaDecay?: number, alphaThreshold?: number): CosmosSprite<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
export declare function saveSelector(): Promise<void>;
/** quick screen-shake */
export declare function shake(value: number, runoff: number, hold?: number, ...points: number[]): Promise<void>;
/** trivia provider */
export declare function trivia(...lines: string[]): Promise<void>;
/** quick talker filter */
export declare function talkFilter(index?: number): (top: CosmosObject) => CosmosAnimation<CosmosBaseEvents, import("./engine/renderer").CosmosMetadata>;
/** room teleporter */
export declare function teleport(dest: string, face: CosmosDirection, x: number, y: number, { fade, fast, gain, rate, cutscene }: {
    fade?: boolean | undefined;
    fast?: boolean | undefined;
    gain?: CosmosProvider<number, [string]> | undefined;
    rate?: CosmosProvider<number, [string]> | undefined;
    cutscene?: CosmosProvider<boolean, [string]> | undefined;
}): Promise<void>;
export declare function temporary<X extends CosmosObject>(object: X, parent: OutertaleLayerKey | CosmosObject, callback?: () => void): X;
export declare function ultraPosition(room: string): {
    face: CosmosDirection;
    position: CosmosPointSimple;
};
/** item handling */
export declare function use(key: string, index: number): Promise<void>;
export declare function validName(): boolean;
