import { Application, BLEND_MODES, Container, Filter, Rectangle } from 'pixi.js';
import { CosmosEventHost, CosmosTimer } from './core';
import { CosmosPoint, CosmosPointSimple, CosmosRay, CosmosRaySimple, CosmosValue } from './numerics';
import { CosmosProvider } from './utils';
export type CosmosBaseEvents = {
    tick: [];
    render: [];
};
export type CosmosMetadata = {
    [k: string]: any;
};
export type CosmosRegion = [CosmosPointSimple, CosmosPointSimple];
export type CosmosRendererLayerModifier = 'fixed' | 'vertical';
export type CosmosTransform = [CosmosPoint, number, CosmosPoint];
export interface CosmosAnchoredObjectProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosObjectProperties<A> {
    anchor?: Partial<CosmosPointSimple> | number;
}
export interface CosmosBaseProperties extends Partial<CosmosStyle> {
    alpha?: number;
    area?: Rectangle | null;
    filters?: Filter[] | null;
    position?: Partial<CosmosPointSimple> | number;
    rotation?: number;
    scale?: Partial<CosmosPointSimple> | number;
}
export interface CosmosObjectProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosBaseProperties {
    acceleration?: number;
    gravity?: Partial<CosmosRaySimple> | number;
    metadata?: A;
    offsets?: (Partial<CosmosPointSimple> | number)[];
    objects?: CosmosObject[];
    parallax?: Partial<CosmosPointSimple> | number;
    priority?: number;
    spin?: number;
    velocity?: Partial<CosmosPointSimple> | number;
}
export interface CosmosRendererLayer {
    active: boolean;
    container: Container;
    modifiers: CosmosRendererLayerModifier[];
    objects: CosmosObject[];
}
export interface CosmosSizedObjectProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObjectProperties<A> {
    size?: Partial<CosmosPointSimple> | number;
}
export interface CosmosStyle {
    blend: BLEND_MODES;
    border: number;
    fill: string;
    font: string;
    stroke: string;
    tint: number;
}
export interface CosmosRendererProperties<A extends string = string> extends CosmosBaseProperties {
    active?: boolean;
    freecam?: boolean;
    layers?: {
        [x in A]: CosmosRendererLayerModifier[];
    };
    size?: Partial<CosmosPointSimple> | number;
    shake?: number;
    timer?: CosmosTimer;
    wrapper?: HTMLElement | string | null;
    zoom?: number;
}
export declare class CosmosBase<A extends CosmosBaseEvents = CosmosBaseEvents> extends CosmosEventHost<A> implements CosmosPointSimple, Partial<CosmosStyle> {
    alpha: CosmosValue;
    blend: BLEND_MODES | undefined;
    border: number | undefined;
    readonly container: Container<import("pixi.js").DisplayObject>;
    fill: string | undefined;
    font: string | undefined;
    position: CosmosPoint;
    rotation: CosmosValue;
    scale: CosmosPoint;
    stroke: string | undefined;
    tint: number | undefined;
    get area(): Rectangle | null;
    set area(value: Rectangle | null);
    get filters(): Filter[] | null;
    set filters(value: Filter[] | null);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor({ alpha, area, blend, border, fill, filters, font, position, rotation, scale, stroke, tint }?: CosmosBaseProperties);
}
export declare class CosmosObject<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosBase<A> {
    private $object;
    acceleration: CosmosValue;
    gravity: CosmosRay;
    metadata: B;
    parallax: CosmosPoint;
    priority: CosmosValue;
    spin: CosmosValue;
    velocity: CosmosPoint;
    get objects(): CosmosObject<CosmosBaseEvents, CosmosMetadata>[];
    set objects(value: CosmosObject<CosmosBaseEvents, CosmosMetadata>[]);
    get offsets(): CosmosPoint[];
    set offsets(value: CosmosPoint[]);
    constructor(properties?: CosmosObjectProperties<B>);
    attach(...objects: CosmosObject[]): this;
    detach(...objects: CosmosObject[]): this;
    draw(style: CosmosStyle): void;
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
    transform(renderer: CosmosRenderer, camera?: CosmosPoint): CosmosTransform;
    update(index: number): void;
}
export declare class CosmosAnchoredObject<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosObject<A, B> {
    anchor: CosmosPoint;
    constructor(properties?: CosmosAnchoredObjectProperties<B>);
    cast(position: CosmosPointSimple): void;
    compute(): CosmosPoint;
}
export declare class CosmosSizedObject<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosAnchoredObject<A, B> {
    size: CosmosPoint;
    constructor(properties?: CosmosSizedObjectProperties<B>);
    compute(): CosmosPoint;
}
export declare class CosmosHitbox<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosSizedObject<A, B> {
    private $hitbox;
    calculate(renderer: CosmosRenderer, [position, rotation, scale]?: CosmosTransform): this;
    detect(hitbox: CosmosHitbox, [min1, max1]?: CosmosRegion): boolean;
    region(): CosmosRegion;
    vertices(): [CosmosPoint, CosmosPoint, CosmosPoint, CosmosPoint];
}
export declare class CosmosRenderer<A extends string = string, B extends CosmosBaseEvents = CosmosBaseEvents> extends CosmosBase<B> {
    static style: {
        blend: BLEND_MODES;
        border: number;
        fill: string;
        font: string;
        stroke: string;
        tint: number;
    };
    private $renderer;
    application: Application<import("pixi.js").ICanvas>;
    freecam: boolean;
    layers: {
        [x in A]: CosmosRendererLayer;
    };
    region: CosmosRegion;
    shake: CosmosValue;
    size: CosmosPoint;
    timer: CosmosTimer;
    wrapper: HTMLElement | null;
    zoom: CosmosValue;
    get active(): boolean;
    set active(value: boolean);
    get canvas(): HTMLCanvasElement;
    constructor(properties?: CosmosRendererProperties<A>);
    attach(key: A, ...objects: CosmosObject[]): void;
    calculate(source: A | CosmosObject | CosmosObject[], filter?: CosmosProvider<boolean, [CosmosHitbox]>, camera?: CosmosPoint): CosmosHitbox<CosmosBaseEvents, CosmosMetadata>[];
    clear(key: A): void;
    detach(key: A, ...objects: CosmosObject[]): void;
    detect(source: CosmosHitbox, ...targets: CosmosHitbox[]): CosmosHitbox<CosmosBaseEvents, CosmosMetadata>[];
    pause(time: number): Promise<void>;
    projection(position: CosmosPointSimple): CosmosPoint;
    tick(): void;
}
