import { Graphics } from 'pixi.js';
import { CosmosBaseEvents, CosmosHitbox, CosmosMetadata, CosmosObject, CosmosObjectProperties } from './engine/renderer';
import { CosmosDaemon } from './engine/audio';
import { CosmosArea, CosmosPoint, CosmosPointSimple, CosmosValue } from './engine/numerics';
import { CosmosAnimation, CosmosAnimationResources, CosmosImage, CosmosSprite, CosmosSpriteProperties } from './engine/image';
import { CosmosRectangle } from './engine/shapes';
import { CosmosBasic, CosmosDirection, CosmosKeyed, CosmosProvider } from './engine/utils';
import { CosmosAsset, CosmosInventory } from './engine/core';
export type OutertaleArmor = {
    invulnerability: number;
};
export type OutertaleChildAnimationDecorator = {
    anchor?: Partial<CosmosPointSimple>;
    auto?: boolean;
    position?: Partial<CosmosPointSimple>;
    rotation?: number;
    filters?: string[];
    frames?: undefined;
    resources?: string;
    steps?: undefined;
    type: string;
};
export type OutertaleChildBarrierDecorator = {
    anchor?: Partial<CosmosPointSimple>;
    position?: Partial<CosmosPointSimple>;
    rotation?: number;
    size?: Partial<CosmosPointSimple>;
};
export type OutertaleChildObject = CosmosSprite<CosmosBaseEvents, {
    class: 'attachment';
    decorator: OutertaleSpriteDecorator;
}> | CosmosAnimation<CosmosBaseEvents, {
    class: 'attachment';
    decorator: OutertaleChildAnimationDecorator;
}> | CosmosHitbox<CosmosBaseEvents, {
    class: 'barrier';
    decorator: OutertaleChildBarrierDecorator;
} | {
    args: string[];
    class: 'interact' | 'trigger';
    decorator: OutertaleChildScriptDecorator;
    name: string;
}>;
export type OutertaleChildScriptDecorator = {
    anchor?: Partial<CosmosPointSimple>;
    args?: string[];
    name?: string;
    position?: Partial<CosmosPointSimple>;
    rotation?: number;
    size?: Partial<CosmosPointSimple>;
};
export type OutertaleChoice = {
    type: 'fight';
    score: number;
} | {
    type: 'act';
    act: string;
} | {
    type: 'item';
    item: string;
} | {
    type: 'fake' | 'spare' | 'flee' | 'assist';
} | {
    type: 'none';
};
export type OutertaleEditorContainer = {
    box: CosmosRectangle;
    children: {
        box: CosmosRectangle;
        object: OutertaleChildObject;
        parent: OutertaleEditorContainer;
    }[];
    object: OutertaleParentObject;
};
export type OutertaleLayerKey = 'base' | 'below' | 'main' | 'above' | 'menu';
export type OutertaleSpriteDecorator = {
    anchor?: Partial<CosmosPointSimple>;
    auto?: boolean;
    position?: Partial<CosmosPointSimple>;
    rotation?: number;
    filters?: string[];
    frames?: string[];
    resources?: undefined;
    steps?: number;
    type: string;
};
export type OutertaleParentObject = CosmosObject<CosmosBaseEvents, {
    class: 'object';
    decorator: OutertaleParentObjectDecorator;
    tags: string[];
}> & {
    objects: OutertaleChildObject[];
};
export type OutertaleParentObjectDecorator = {
    attachments?: (OutertaleChildAnimationDecorator | OutertaleSpriteDecorator)[];
    barriers?: OutertaleChildBarrierDecorator[];
    filters?: string[];
    interacts?: OutertaleChildScriptDecorator[];
    position?: Partial<CosmosPointSimple>;
    rotation?: number;
    tags?: string[];
    triggers?: OutertaleChildScriptDecorator[];
};
export type OutertaleRoomDecorator = {
    background?: string;
    face?: string;
    layers?: Partial<CosmosKeyed<OutertaleParentObjectDecorator[], string>>;
    mixins?: Partial<CosmosKeyed<string, string>>;
    metadata?: CosmosKeyed<CosmosBasic>;
    neighbors?: string[];
    preload?: string[];
    region?: CosmosPointSimple[];
    score?: {
        filter?: number;
        gain?: number;
        music?: string | null;
        rate?: number;
        reverb?: number;
    };
    spawn?: CosmosPointSimple;
};
export type OutertaleTurnState<A> = {
    choice: OutertaleChoice;
    target: number;
    volatile: OutertaleVolatile;
    talk: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>;
    status: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>;
    hurt: boolean;
    dead: boolean;
    pacify: boolean;
    opponent: OutertaleOpponent;
    vars: {
        '': {
            reward: boolean;
            hp: number;
        };
    } & A;
    dialogue: (cutscene: boolean, ...lines: string[]) => Promise<void>;
};
export type OutertaleVolatile = {
    alive: boolean;
    container: CosmosObject & {
        objects: CosmosSprite[];
    };
    dead: boolean;
    flirted: boolean;
    opponent: OutertaleOpponent;
    hp: number;
    sparable: boolean;
    vars: CosmosKeyed;
};
export type OutertaleWeapon = {
    arc: boolean;
    targets: number;
    mode: 'simple' | 'volley' | 'multiple';
    speed: number;
    crit: number;
    off?: number;
};
export declare class OutertaleBox extends CosmosObject {
    graphics1: Graphics;
    graphics2: Graphics;
    size: CosmosPoint;
    draw(): void;
    constructor(properties?: CosmosObjectProperties);
}
export declare class OutertaleBypassAnimation extends CosmosAnimation {
    enable(): this;
    actuallyEnable(): this;
    disable(): this;
    actuallyDisable(): this;
    reset(): this;
    actuallyReset(): this;
}
export interface OutertaleGroupProperties {
    assets?: CosmosInventory;
    flee?: boolean;
    grid?: CosmosImage | null;
    init?: () => boolean;
    handler?: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
    music?: CosmosDaemon | null;
    opponents?: [OutertaleOpponent, CosmosPointSimple][];
    status?: string[];
}
export declare class OutertaleGroup {
    assets: CosmosInventory;
    flee: boolean;
    grid: CosmosImage | null;
    init: () => boolean;
    handler: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
    music: CosmosDaemon | null;
    opponents: [OutertaleOpponent, CosmosPointSimple][];
    status: string[];
    constructor({ assets, init, flee, grid, handler, music, opponents, status }?: OutertaleGroupProperties);
}
export declare class OutertaleInventory {
    capacity: number;
    keygen: (index: number) => string;
    store: CosmosKeyed<string>;
    get contents(): string[];
    get size(): number;
    constructor(capacity: number, store: CosmosKeyed<string>, keygen: (index: number) => string);
    add(item: string): boolean;
    count(item: string): number;
    has(item: string): boolean;
    remove(target: number | string): boolean;
    of(index: number): string | null;
    set(index: number, value: string): void;
}
export declare class OutertaleMap extends CosmosAsset<CosmosKeyed<{
    area: CosmosArea;
    offset: CosmosPointSimple;
}>> {
    image: CosmosImage;
    constructor(source: string, image: CosmosImage);
    loader(): Promise<{
        [k: string]: {
            area: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            offset: {
                x: number;
                y: number;
            };
        };
    }>;
    unloader(): void;
}
export declare class OutertaleMultivisualObject extends CosmosObject {
    sprite: CosmosSprite;
    animation: CosmosAnimation;
    constructor(properties?: CosmosObjectProperties, subproperties?: CosmosSpriteProperties);
    use(asset: CosmosImage | CosmosAnimationResources): void;
}
export interface OutertaleOpponentProperties {
    acts?: CosmosProvider<([string, CosmosProvider<string[], [OutertaleVolatile]>] | [string, CosmosProvider<string[], [OutertaleVolatile]>, CosmosProvider<string, [OutertaleVolatile]>])[]>;
    assets?: CosmosInventory;
    bully?: () => void;
    bullyable?: boolean;
    df?: number;
    dramatic?: boolean;
    exp?: number;
    flirted?: () => boolean;
    g?: number;
    ghost?: boolean;
    goodbye?: ((volatile: OutertaleVolatile) => CosmosSprite) | null;
    handler?: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
    hp?: number;
    hurt?: CosmosDaemon | null;
    metadata?: CosmosMetadata;
    name?: CosmosProvider<string>;
    sparable?: boolean;
    sprite?: (volatile: OutertaleVolatile) => CosmosSprite;
}
export declare class OutertaleOpponent {
    acts: CosmosProvider<([string, CosmosProvider<string[], [OutertaleVolatile]>] | [string, CosmosProvider<string[], [OutertaleVolatile]>, CosmosProvider<string, [OutertaleVolatile]>])[]>;
    assets: CosmosInventory;
    bully: () => void;
    bullyable: boolean;
    df: number;
    dramatic: boolean;
    exp: number;
    flirted: () => boolean;
    g: number;
    ghost: boolean;
    goodbye: ((volatile: OutertaleVolatile) => CosmosSprite) | null;
    handler: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
    hp: number;
    hurt: CosmosDaemon | null;
    metadata: CosmosMetadata;
    name: CosmosProvider<string>;
    sparable: boolean;
    sprite: (volatile: OutertaleVolatile) => CosmosSprite;
    constructor({ acts, assets, bully, bullyable, df, dramatic, flirted, exp, g, ghost, goodbye, handler, hp, hurt, name, metadata, sparable, sprite }?: OutertaleOpponentProperties);
}
export interface OutertaleRoomProperties {
    decorator?: OutertaleRoomDecorator | null;
    face?: CosmosDirection;
    layers?: Partial<CosmosKeyed<CosmosObject[], OutertaleLayerKey>>;
    metadata?: CosmosKeyed<CosmosBasic>;
    neighbors?: string[];
    preload?: CosmosInventory;
    region?: [Partial<CosmosPointSimple>, Partial<CosmosPointSimple>] | [];
    score?: {
        filter?: number;
        gain?: number;
        music?: string | null;
        rate?: number;
        reverb?: number;
    };
    spawn?: Partial<CosmosPointSimple>;
}
export declare class OutertaleRoom {
    decorator: OutertaleRoomDecorator | null;
    face: CosmosDirection;
    layers: Partial<CosmosKeyed<CosmosObject[], OutertaleLayerKey>>;
    metadata: CosmosKeyed<CosmosBasic>;
    neighbors: string[];
    preload: CosmosInventory;
    region: [Partial<CosmosPointSimple>, Partial<CosmosPointSimple>] | [];
    score: {
        filter: number;
        gain: number;
        music: string | null;
        rate: number;
        reverb: number;
    };
    spawn: Partial<CosmosPointSimple>;
    constructor({ decorator, face, layers, metadata, neighbors, preload, region, score: { filter, gain, music, rate, reverb }, spawn }?: OutertaleRoomProperties);
}
export interface OutertaleShopProperties {
    background?: CosmosSprite;
    handler?: () => Promise<void> | void;
    keeper?: CosmosSprite;
    music?: CosmosDaemon | null;
    options?: CosmosProvider<string[]>;
    persist?: boolean;
    preset?: (...indices: number[]) => void;
    price?: CosmosProvider<number>;
    prompt?: CosmosProvider<string>;
    purchase?: (buy: boolean) => void | boolean;
    size?: CosmosProvider<number>;
    status?: CosmosProvider<string>;
    tooltip?: CosmosProvider<string | null>;
    vars?: CosmosKeyed<CosmosBasic>;
}
export declare class OutertaleShop {
    background: CosmosSprite;
    handler: () => Promise<void> | void;
    keeper: CosmosSprite;
    music: CosmosDaemon | null;
    options: CosmosProvider<string[]>;
    persist: boolean;
    preset: (...indices: number[]) => void;
    price: CosmosProvider<number>;
    prompt: CosmosProvider<string>;
    purchase: (buy: boolean) => void | boolean;
    size: CosmosProvider<number>;
    status: CosmosProvider<string>;
    tooltip: CosmosProvider<string | null>;
    vars: CosmosKeyed<CosmosBasic>;
    constructor({ background, handler, keeper, music, options, persist, preset, price, prompt, purchase, size, status, tooltip, vars }?: OutertaleShopProperties);
}
export interface OutertaleSpeechPresetProperties {
    faces?: (CosmosSprite | null)[];
    interval?: number;
    voices?: (CosmosDaemon[] | null)[];
    font1?: string;
    font2?: string;
    threshold?: number;
}
export declare class OutertaleSpeechPreset {
    faces: (CosmosSprite | null)[];
    interval: number;
    voices: (CosmosDaemon[] | null)[];
    font1: string;
    font2: string;
    threshold: number;
    constructor({ faces, interval, voices, font1, font2, threshold }?: OutertaleSpeechPresetProperties);
}
export declare class OutertaleStat extends CosmosValue {
    modifiers: ['add' | 'multiply', number, number][];
    compute(): number;
    elapse(): void;
}
