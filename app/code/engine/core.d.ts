import { CosmosValue } from './numerics';
import { CosmosBasic, CosmosKeyed } from './utils';
export type CosmosTimerEvents = {
    tick: [number];
};
export declare class CosmosAsset<A = any> {
    private $asset;
    source: string;
    constructor(source: string);
    get value(): A & ({} | undefined);
    load(owner?: CosmosAsset): Promise<void>;
    loader(): Promise<A>;
    unload(owner?: CosmosAsset): void;
    unloader(): void;
}
export declare class CosmosCache<A, B> extends Map<A, B> {
    compute: (key: A) => B;
    constructor(compute: (key: A) => B);
    of(key: A): NonNullable<B>;
}
export declare class CosmosStringData<A extends string = string> extends CosmosAsset<A> {
    loader(): Promise<A>;
}
export declare class CosmosData<A extends CosmosBasic = CosmosBasic> extends CosmosAsset<A> {
    loader(): Promise<A>;
}
export type CosmosEventHandler<A extends any, B extends any[] = any> = CosmosEventListener<A, B> | {
    listener: CosmosEventListener<A, B>;
    priority: number;
};
export type CosmosEventListener<A extends any, B extends any[]> = (this: A, ...data: B) => any;
export declare class CosmosEventHost<A extends {
    [x in string]: any[];
} = {}> {
    events: {
        [x in keyof A]?: {
            handlers: CosmosEventHandler<any, A[x]>[];
            priorities: number;
        };
    };
    fire<B extends keyof A>(name: B, ...data: A[B]): any[];
    off<B extends keyof A>(name: B, handler: CosmosEventHandler<this, A[B]>): this;
    on<B extends keyof A>(name: B): Promise<A[B]>;
    on<B extends keyof A>(name: B, priority: number): Promise<A[B]>;
    on<B extends keyof A>(name: B, listener: CosmosEventHandler<this, A[B]>): this;
    /** @deprecated */
    on_legacy<B extends keyof A>(name: B, provider: (host: this) => CosmosEventHandler<this, A[B]>): this;
}
export declare class CosmosInventory<A extends CosmosAsset[] = CosmosAsset[]> extends CosmosAsset<A> {
    assets: A;
    constructor(...assets: A);
    loader(): Promise<A>;
    unloader(): void;
}
export declare class CosmosRegistry<A extends string, B> extends Map<A, B> {
    placeholder: B;
    constructor(placeholder: B);
    of(key: A): B;
    register<C extends B>(key: A, value: C): C;
    register<C extends B>(properties: CosmosKeyed<C, A>): this;
}
export declare class CosmosTimer<A extends CosmosTimerEvents = CosmosTimerEvents> extends CosmosEventHost<A> {
    private $timer;
    posts: (() => void)[];
    speed: CosmosValue;
    tasks: Map<any, () => void>;
    value: number;
    whens: {
        condition: () => boolean;
        resolve: () => void;
    }[];
    pause(duration?: number): Promise<void>;
    post(): Promise<void>;
    start(value?: number): void;
    stop(): void;
    when(condition: () => boolean): Promise<void>;
}
