import { CosmosTimer } from './core';
import { CosmosObject, CosmosTransform } from './renderer';
import { CosmosDirection, CosmosProvider } from './utils';
export type CosmosArea = CosmosPointSimple & CosmosDimensions;
export interface CosmosDimensions {
    height: number;
    width: number;
}
export interface CosmosPointSimple {
    x: number;
    y: number;
}
export interface CosmosRaySimple {
    angle: number;
    extent: number;
}
export interface CosmosValueSimple {
    value: number;
}
export declare class CosmosPoint implements CosmosPointSimple, CosmosRaySimple {
    private $point;
    get angle(): number;
    set angle(value: number);
    get extent(): number;
    set extent(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor();
    constructor(a: number, b: number);
    constructor(a: Partial<CosmosPointSimple> | number);
    abs(): CosmosPoint;
    add(a: number, b: number): CosmosPoint;
    add(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    angleFrom(a: number, b: number): number;
    angleFrom(a: Partial<CosmosPointSimple> | number): number;
    angleTo(a: number, b: number): number;
    angleTo(a: Partial<CosmosPointSimple> | number): number;
    ceil(): CosmosPoint;
    ceil(a: number, b: number): CosmosPoint;
    ceil(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    clamp(min: Partial<CosmosPointSimple> | number, max: Partial<CosmosPointSimple> | number): CosmosPoint;
    clone(): CosmosPoint;
    divide(a: number, b: number): CosmosPoint;
    divide(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    endpoint(a: number, b: number): CosmosPoint;
    endpoint(a: {
        angle?: number;
        extent?: number;
    } | number): CosmosPoint;
    extentOf(a: number, b: number): number;
    extentOf(a: Partial<CosmosPointSimple> | number): number;
    floor(): CosmosPoint;
    floor(a: number, b: number): CosmosPoint;
    floor(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    modulate(timer: CosmosTimer, duration: number, ...points: (Partial<CosmosPointSimple> | number)[]): Promise<void>;
    modulate(timer: CosmosTimer, interpolator: (value: number, ...points: number[]) => number, duration: number, ...points: (Partial<CosmosPointSimple> | number)[]): Promise<void>;
    multiply(a: number, b: number): CosmosPoint;
    multiply(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    round(): CosmosPoint;
    round(a: number, b: number): CosmosPoint;
    round(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    set(a: number, b: number): CosmosPoint;
    set(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    shift(angle: number, extent?: number, origin?: Partial<CosmosPointSimple> | number): CosmosPoint;
    step(timer: CosmosTimer, speed: number, ...targets: (Partial<CosmosPointSimple> | number)[]): Promise<void>;
    step_legacy(timer: CosmosTimer, speed: number, target: Partial<CosmosPointSimple> | number): Promise<void>;
    step_legacy(timer: CosmosTimer, interpolator: (value: number, ...points: number[]) => number, speed: number, target: Partial<CosmosPointSimple> | number): Promise<void>;
    subtract(a: number, b: number): CosmosPoint;
    subtract(a: Partial<CosmosPointSimple> | number): CosmosPoint;
    value(): {
        x: number;
        y: number;
    };
}
export declare class CosmosPointLinked extends CosmosPoint {
    target: CosmosPointSimple;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor(target: CosmosPointSimple);
}
export declare class CosmosRay implements CosmosPointSimple, CosmosRaySimple {
    private $ray;
    get angle(): number;
    set angle(value: number);
    get extent(): number;
    set extent(value: number);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor();
    constructor(a: number, b: number);
    constructor(a: Partial<CosmosRaySimple> | number);
    abs(): CosmosRay;
    add(a: number, b: number): CosmosRay;
    add(a: Partial<CosmosRaySimple> | number): CosmosRay;
    ceil(): CosmosRay;
    ceil(a: number, b: number): CosmosRay;
    ceil(a: Partial<CosmosRaySimple> | number): CosmosRay;
    clamp(min: Partial<CosmosRaySimple> | number, max: Partial<CosmosRaySimple> | number): CosmosRay;
    clone(): CosmosRay;
    divide(a: number, b: number): CosmosRay;
    divide(a: Partial<CosmosRaySimple> | number): CosmosRay;
    floor(): CosmosRay;
    floor(a: number, b: number): CosmosRay;
    floor(a: Partial<CosmosRaySimple> | number): CosmosRay;
    modulate(timer: CosmosTimer, duration: number, ...points: (Partial<CosmosRaySimple> | number)[]): Promise<void>;
    modulate(timer: CosmosTimer, interpolator: (value: number, ...points: number[]) => number, duration: number, ...points: (Partial<CosmosRaySimple> | number)[]): Promise<void>;
    multiply(a: number, b: number): CosmosRay;
    multiply(a: Partial<CosmosRaySimple> | number): CosmosRay;
    round(): CosmosRay;
    round(a: number, b: number): CosmosRay;
    round(a: Partial<CosmosRaySimple> | number): CosmosRay;
    set(a: number, b: number): CosmosRay;
    set(a: Partial<CosmosRaySimple> | number): CosmosRay;
    subtract(a: number, b: number): CosmosRay;
    subtract(a: Partial<CosmosRaySimple> | number): CosmosRay;
    value(): {
        angle: number;
        extent: number;
    };
}
export declare class CosmosRayLinked extends CosmosRay {
    target: CosmosRaySimple;
    get angle(): number;
    set angle(value: number);
    get extent(): number;
    set extent(value: number);
    constructor(target: CosmosRaySimple);
}
export declare class CosmosValue implements CosmosValueSimple {
    private $value;
    get value(): number;
    set value(value: number);
    constructor(value?: CosmosValueSimple | number);
    modulate(timer: CosmosTimer, duration: number, ...points: number[]): Promise<void>;
    modulate(timer: CosmosTimer, interpolator: (value: number, ...points: number[]) => number, duration: number, ...points: number[]): Promise<void>;
    set(a: CosmosValueSimple | number): CosmosValue;
    step(timer: CosmosTimer, speed: number, ...targets: number[]): Promise<void>;
}
export declare class CosmosValueRandom extends CosmosValue {
    clone(): CosmosValueRandom;
    compute(): number;
    next(threshold?: number): number;
}
export declare class CosmosValueLinked extends CosmosValue {
    target: CosmosValueSimple;
    get value(): number;
    set value(value: number);
    constructor(target: CosmosValueSimple);
}
export declare const CosmosMath: {
    FRAME: number;
    bezier(value: number, ...points: number[]): number;
    cardinal(angle: number): CosmosDirection;
    intersection(a1: CosmosPointSimple, a2: CosmosPointSimple, b1: CosmosPointSimple, b2: CosmosPointSimple): boolean;
    rotation(a1: CosmosPointSimple, a2: CosmosPointSimple, a3: CosmosPointSimple): boolean;
    linear(value: number, ...points: number[]): number;
    remap(value: number, min2: number, max2: number, min1?: number, max1?: number): number;
    transform(transform: CosmosTransform, object: CosmosObject, camera?: {
        x: number;
        y: number;
    }, zoom?: number): CosmosTransform;
    wave(value: number): number;
    weigh<A>(input: CosmosProvider<[A, number][]>, modifier?: number): A | undefined;
};
