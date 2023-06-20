import { CosmosTimer } from './core';
import { CosmosSprite } from './image';
import { CosmosPoint, CosmosPointSimple } from './numerics';
import { CosmosBaseEvents, CosmosHitbox, CosmosMetadata, CosmosRenderer, CosmosSizedObjectProperties, CosmosStyle } from './renderer';
import { CosmosDirection, CosmosNot, CosmosProvider } from './utils';
export type CosmosCharacterPreset = {
    [x in 'walk' | 'talk']: {
        [y in CosmosDirection]: CosmosSprite;
    };
};
export interface CosmosEntityProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosSizedObjectProperties {
    face?: CosmosDirection;
    metadata?: A;
    sprites?: {
        [x in CosmosDirection]?: CosmosSprite;
    };
    step?: number;
}
export declare class CosmosEntity<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosHitbox<A, B> {
    private $entity;
    face: CosmosDirection;
    sprites: {
        [x in CosmosDirection]: CosmosSprite;
    };
    step: number;
    get sprite(): CosmosSprite<CosmosBaseEvents, CosmosMetadata>;
    constructor(properties?: CosmosEntityProperties<B>);
    move<B extends string>(offset: CosmosPointSimple, renderer?: CosmosRenderer<B>, keys?: B[], filter?: CosmosProvider<boolean, [CosmosHitbox]>): boolean;
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
    walk(timer: CosmosTimer, speed: number, ...points: Partial<CosmosPointSimple>[]): Promise<void>;
}
export type CosmosCharacterProperties<A extends CosmosMetadata = CosmosMetadata> = CosmosNot<CosmosEntityProperties<A>, 'sprites'> & {
    key: string;
    preset: CosmosCharacterPreset;
};
export declare class CosmosCharacter<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosEntity<A, B> {
    key: string;
    preset: CosmosCharacterPreset;
    talk: boolean;
    get sprite(): CosmosSprite<CosmosBaseEvents, CosmosMetadata>;
    constructor(properties: CosmosCharacterProperties<B>);
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
}
export interface CosmosPlayerProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosEntityProperties<A> {
    extent?: Partial<CosmosPointSimple> | number;
}
export declare class CosmosPlayer<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosEntity<A, B> {
    private $player;
    readonly funni: CosmosHitbox<CosmosBaseEvents, CosmosMetadata>;
    extent: CosmosPoint;
    puppet: boolean;
    constructor(properties?: CosmosPlayerProperties<B>);
    tick(camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle): void;
    walk(timer: CosmosTimer, speed: number, ...targets: Partial<CosmosPointSimple>[]): Promise<void>;
}
