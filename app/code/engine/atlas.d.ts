import { CosmosEventHost, CosmosRegistry } from './core';
import { CosmosPointSimple } from './numerics';
import { CosmosObject, CosmosRenderer } from './renderer';
import { CosmosDirection, CosmosProvider } from './utils';
export declare class CosmosAtlas<A extends string = string> {
    navigators: CosmosRegistry<string, CosmosNavigator<A, any>>;
    target: A | null;
    constructor(map?: {
        [x in A]: CosmosNavigator<A>;
    });
    attach<B extends CosmosRenderer<any>>(renderer: B, layer: B extends CosmosRenderer<infer C> ? C : never, ...targets: A[]): void;
    detach<B extends CosmosRenderer<any>>(renderer: B, layer: B extends CosmosRenderer<infer C> ? C : never, ...targets: A[]): void;
    next(): void;
    prev(): void;
    navigator(): CosmosNavigator<A, any> | null;
    seek(direction: CosmosDirection): void;
    switch(target: A | null): void;
}
export declare class CosmosNavigator<A extends string = string, B extends any = any> extends CosmosEventHost<{
    [x in 'from' | 'to']: [A | null | void, CosmosNavigator<A, B> | null];
} & {
    change: [B, B];
}> {
    flip: boolean;
    grid: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
    next: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
    objects: CosmosObject[];
    position: CosmosPointSimple;
    prev: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
    constructor({ flip, grid, next, objects, position: { x, y }, prev }?: {
        flip?: boolean;
        grid?: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
        next?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
        objects?: CosmosObject[];
        position?: Partial<CosmosPointSimple>;
        prev?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
    });
    selection(): B;
}
