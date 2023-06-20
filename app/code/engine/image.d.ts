import { Extract, Graphics, Sprite, Texture } from 'pixi.js';
import { CosmosAsset, CosmosCache, CosmosData, CosmosInventory } from './core';
import { CosmosArea, CosmosDimensions, CosmosPoint, CosmosPointSimple } from './numerics';
import { CosmosAnchoredObject, CosmosAnchoredObjectProperties, CosmosBaseEvents, CosmosMetadata, CosmosStyle } from './renderer';
import { CosmosFace, CosmosNot } from './utils';
export type CosmosColor = [number, number, number, number];
export type CosmosCrop = {
    [x in CosmosFace]: number;
};
export type CosmosPixelShader = (color: CosmosColor, position: CosmosPointSimple, pixels: Uint8Array) => CosmosColor;
export type CosmosAnimationInfo = {
    frames: {
        duration: number;
        frame: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        spriteSourceSize: {
            x: number;
            y: number;
        };
    }[];
    meta: {
        frameTags: {
            name: string;
            from: number;
            to: number;
        }[];
    };
};
export declare class CosmosImage extends CosmosAsset<Texture> {
    private static $image;
    static cache: CosmosCache<string, Promise<Texture<import("pixi.js").Resource>>>;
    static default: Texture<import("pixi.js").Resource>;
    static get extract(): Extract;
    static utils: {
        area(source: CosmosDimensions, crop: CosmosCrop): CosmosArea;
        color: CosmosCache<string, CosmosColor>;
        crop(area: CosmosArea): CosmosCrop;
        synthesize(colors: CosmosColor[][]): Promise<ImageBitmap>;
    };
    shader: CosmosPixelShader | null;
    sprites: Set<Sprite>;
    constructor(source: string, shader?: CosmosPixelShader | null);
    loader(): Promise<Texture<import("pixi.js").Resource>>;
    unloader(): void;
}
export interface CosmosSpriteProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObjectProperties<A> {
    active?: boolean;
    crop?: Partial<CosmosCrop>;
    duration?: number;
    frames?: (CosmosImage | null)[];
    index?: number;
    reverse?: boolean;
    step?: number;
}
export declare class CosmosSprite<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObject<A, B> {
    private $sprite;
    active: boolean;
    crop: CosmosCrop;
    duration: number;
    frames: (CosmosImage | null)[];
    readonly graphics: Graphics;
    index: number;
    reverse: boolean;
    readonly sprite: Sprite;
    step: number;
    constructor(properties?: CosmosSpriteProperties<B>);
    advance(): void;
    compute(): CosmosPoint;
    disable(): this;
    draw(style: CosmosStyle): void;
    enable(duration?: number): this;
    read(): CosmosColor[][];
    reset(): this;
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
}
export declare class CosmosAnimationResources extends CosmosInventory<[CosmosImage, CosmosData<CosmosAnimationInfo>]> {
    image: CosmosImage;
    data: CosmosData<CosmosAnimationInfo>;
    constructor(image: CosmosImage, data: CosmosData<CosmosAnimationInfo>);
}
export type CosmosAnimationProperties<A extends CosmosMetadata = CosmosMetadata> = CosmosNot<CosmosSpriteProperties<A>, 'crop' | 'frames'> & {
    extrapolate?: boolean;
    resources?: CosmosAnimationResources | null;
    subcrop?: Partial<CosmosCrop>;
};
export declare class CosmosAnimation<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosSprite<A, B> {
    private $animation;
    extrapolate: boolean;
    resources: CosmosAnimationResources | null;
    subcrop: CosmosCrop;
    constructor(properties?: CosmosAnimationProperties<B>);
    draw(style: CosmosStyle): void;
    populate(): void;
    use(resources: CosmosAnimationResources | null): this;
}
export declare const CosmosBitmap: {
    base2texture(base: string): Promise<Texture<import("pixi.js").Resource>>;
    base2pixels(base: string): Promise<Uint8Array>;
    base2colors(base: string): Promise<CosmosColor[][]>;
    color2hex(color: CosmosColor): number;
    colors2base(colors: CosmosColor[][], crop?: CosmosCrop): Promise<string>;
    colors2pixels(colors: CosmosColor[][], crop?: CosmosCrop): Uint8Array;
    colors2texture(colors: CosmosColor[][], crop?: CosmosCrop): Texture<import("pixi.js").BufferResource>;
    hex2color(hex: number): CosmosColor;
    merge(items: CosmosColor[][][], cols?: number): [CosmosColor[][], CosmosArea[]];
    split(page: CosmosColor[][], info: CosmosArea[]): CosmosColor[][][];
    pixels2base(pixels: Uint8Array, dimensions: CosmosDimensions): Promise<string>;
    pixels2colors(pixels: Uint8Array, dimensions: CosmosDimensions, crop?: CosmosCrop): CosmosColor[][];
    pixels2texture(pixels: Uint8Array, dimensions: CosmosDimensions): Texture<import("pixi.js").BufferResource>;
    texture2base(texture: Texture): Promise<string>;
    texture2colors(texture: Texture, crop?: CosmosCrop): CosmosColor[][];
    texture2pixels(texture: Texture): Uint8Array;
};
