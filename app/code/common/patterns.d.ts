import { OutertaleLayerKey } from '../classes';
import { CosmosSprite } from '../engine/image';
import { CosmosPoint, CosmosPointSimple } from '../engine/numerics';
import { CosmosHitbox, CosmosObject, CosmosSizedObjectProperties } from '../engine/renderer';
export declare function starGenerator(radius: number, extent: number, spokes: number, angle: number, offset?: number): CosmosPoint;
export declare const legacy: {
    bullets: {
        firebol: (properties: CosmosSizedObjectProperties<import("../engine/renderer").CosmosMetadata> & Partial<{
            color: 'orange' | 'blue' | 'white' | 'green';
            damage: number;
            detach: string | null;
            type: 0 | 1 | 2 | 3;
        }> & {
            autoAttach?: boolean | undefined;
            autoDetach?: boolean | undefined;
            autoEnable?: boolean | undefined;
            handler?: ((bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>) | undefined;
            layer?: OutertaleLayerKey | undefined;
            sound?: boolean | undefined;
        }) => CosmosHitbox;
        octagon: (properties: CosmosSizedObjectProperties<import("../engine/renderer").CosmosMetadata> & Partial<{
            color: 'orange' | 'blue' | 'white' | 'green';
            damage: number;
            detach: string | null;
            type: 0 | 1 | 2 | 3;
        }> & {
            autoAttach?: boolean | undefined;
            autoDetach?: boolean | undefined;
            autoEnable?: boolean | undefined;
            handler?: ((bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>) | undefined;
            layer?: OutertaleLayerKey | undefined;
            sound?: boolean | undefined;
        }) => CosmosHitbox;
        literalBullet: (properties: CosmosSizedObjectProperties<import("../engine/renderer").CosmosMetadata> & Partial<{
            color: 'orange' | 'blue' | 'white' | 'green';
            damage: number;
            detach: string | null;
            type: 0 | 1 | 2 | 3;
        }> & {
            autoAttach?: boolean | undefined;
            autoDetach?: boolean | undefined;
            autoEnable?: boolean | undefined;
            handler?: ((bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>) | undefined;
            layer?: OutertaleLayerKey | undefined;
            sound?: boolean | undefined;
        }) => CosmosHitbox;
        pellet: (properties: CosmosSizedObjectProperties<import("../engine/renderer").CosmosMetadata> & Partial<{
            color: 'orange' | 'blue' | 'white' | 'green';
            damage: number;
            detach: string | null;
            type: 0 | 1 | 2 | 3;
        }> & {
            autoAttach?: boolean | undefined;
            autoDetach?: boolean | undefined;
            autoEnable?: boolean | undefined;
            handler?: ((bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>) | undefined;
            layer?: OutertaleLayerKey | undefined;
            sound?: boolean | undefined;
        }) => CosmosHitbox;
        starfly: (properties: CosmosSizedObjectProperties<import("../engine/renderer").CosmosMetadata> & Partial<{
            color: 'orange' | 'blue' | 'white' | 'green';
            damage: number;
            detach: string | null;
            type: 0 | 1 | 2 | 3;
        }> & {
            autoAttach?: boolean | undefined;
            autoDetach?: boolean | undefined;
            autoEnable?: boolean | undefined;
            handler?: ((bullet: CosmosHitbox, sprite: CosmosSprite) => Promise<void>) | undefined;
            layer?: OutertaleLayerKey | undefined;
            sound?: boolean | undefined;
        }) => CosmosHitbox;
    };
    pattern(index?: number, ...patterns: (() => Promise<void>)[]): Promise<void>;
    wrapper(parent: CosmosObject, object: CosmosObject, detachee?: CosmosObject<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>): () => void;
};
/** sides: 0 = top, 1 = right, 2 = bottom, 3 = left */
export declare function pastBox(distance: number, side?: number, phase?: number): {
    side: number;
    position: CosmosPoint;
    vector: {
        x: number;
        y: number;
    };
};
export declare function bulletSetup<A extends CosmosObject>(bullet: A, over?: boolean | CosmosObject<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>, detector?: CosmosObject | null): {
    bullet: A;
    detached: Promise<void>;
    detach: (value: void | PromiseLike<void>) => void;
};
export declare function screenCheck(object: CosmosPointSimple, distance: number): boolean;
export declare function boxCheck(object: CosmosPointSimple, distance: number): boolean;
export declare function pastScreen(distance: number, side?: number, phase?: number): {
    side: number;
    position: CosmosPoint;
    vector: {
        x: number;
        y: number;
    };
};
declare const _default: {
    maddummy: (dud?: boolean, alt?: boolean, nc?: number, ncmod?: boolean) => Promise<void>;
    moldsmal(index?: number, bygg?: boolean, extend?: boolean): Promise<void>;
    napstablook: (index: number) => Promise<void>;
    shyren(originpos?: CosmosPoint, anga?: number, angb?: number, alt?: boolean): Promise<((promises: Promise<void>[], index: number, note: number, notepower: number) => void) | undefined>;
    spacetop(vertical?: boolean, jerry?: boolean): Promise<void>;
};
export default _default;
