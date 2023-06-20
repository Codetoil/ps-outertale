import { Texture } from 'pixi.js';
import { CosmosDaemon } from './audio';
import { CosmosEventHost, CosmosTimer } from './core';
import { CosmosColor } from './image';
import { CosmosArea, CosmosPoint, CosmosPointSimple } from './numerics';
import { CosmosAnchoredObject, CosmosAnchoredObjectProperties, CosmosBaseEvents, CosmosMetadata, CosmosStyle } from './renderer';
import { CosmosKeyed } from './utils';
export type CosmosFont = {
    glyphs: {
        [x in string]: CosmosGlyph;
    };
    shift: CosmosPointSimple;
    size: number;
};
export type CosmosFontData = {
    name: string;
    glyphs: CosmosGlyphData[];
    shift: CosmosPointSimple;
    size: number;
};
export type CosmosGlyph = {
    margin: number;
    metrics: CosmosArea;
    texture: Texture;
};
export type CosmosGlyphData = {
    area: CosmosArea;
    code: string;
    margin: number;
    metrics: CosmosArea;
};
export interface CosmosTextProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObjectProperties<A> {
    charset?: string;
    content?: string;
    phase?: number;
    plain?: boolean;
    spacing?: Partial<CosmosPointSimple> | number;
}
export declare class CosmosText<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObject<A, B> {
    private $text;
    static charset: string;
    charset: string;
    content: string;
    phase: number;
    plain: boolean;
    spacing: CosmosPointSimple;
    constructor(properties?: CosmosTextProperties<B>);
    compute(): CosmosPoint;
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
    draw(style: CosmosStyle): void;
}
export interface CosmosTyperProperties {
    interval?: number;
    magic?: string;
    sounds?: CosmosDaemon[];
    threshold?: number;
    timer?: CosmosTimer;
    variables?: CosmosKeyed;
}
export declare class CosmosTyper extends CosmosEventHost<{
    [x in 'char' | 'code' | 'header' | 'text']: [string];
} & {
    [x in 'empty' | 'idle' | 'read' | 'skip']: [];
}> {
    private $typer;
    content: string;
    interval: number;
    magic: string;
    mode: 'empty' | 'idle' | 'read' | 'skip';
    sounds: CosmosDaemon[];
    threshold: number;
    timer: CosmosTimer;
    variables: CosmosKeyed;
    constructor({ interval, magic, sounds, threshold, timer, variables }?: CosmosTyperProperties);
    emit(content: string): void;
    read(force?: boolean): void;
    skip(force?: boolean): void;
    text(...lines: string[]): Promise<void>;
}
export declare const CosmosFont: {
    create(name: string, size: number, shift: CosmosPointSimple, chars: string, resolution: number, cols?: number, preprocessor?: (code: string, colors: CosmosColor[][]) => CosmosColor[][]): Promise<{
        data: CosmosFontData;
        source: string;
    }>;
    import(source: string, { name, glyphs, shift, size }: CosmosFontData): Promise<{
        name: string;
        font: {
            glyphs: {
                [k: string]: CosmosGlyph;
            };
            shift: CosmosPointSimple;
            size: number;
        };
    }>;
    load(fonts: string[], time?: number): Promise<void>;
    metrics(name: string, content: string, scale: number): CosmosPoint;
    register(name: string, font: CosmosFont): void;
    storage: {
        [x: string]: CosmosFont;
    };
    unregister(name: string): void;
};
