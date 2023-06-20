import './bootstrap';
import { OutertaleLayerKey } from '../classes';
import { CosmosEntity } from '../engine/entity';
import { CosmosSprite } from '../engine/image';
import { CosmosPointSimple } from '../engine/numerics';
import { CosmosObject } from '../engine/renderer';
import { CosmosKeyed } from '../engine/utils';
export declare const states: {
    rooms: Partial<CosmosKeyed<CosmosKeyed<any>>>;
    scripts: Partial<CosmosKeyed<CosmosKeyed<any>>>;
};
export declare const wasGeno: {
    state: boolean;
};
export declare function compat(): void;
export declare function toriSV(): boolean;
export declare function instanceDestroy(tags: string[], layer?: OutertaleLayerKey): void;
export declare function objectsByTag(filter: (tags: string[]) => boolean): CosmosObject<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>[];
export declare function phase(time: number, position: CosmosPointSimple): Promise<void>;
export declare function talkerEngine(key: string, ...talkers: CosmosSprite[]): {
    end(): void;
};
export declare function torielOverride(): void;
export declare function walkHer(entity: CosmosEntity, direction: CosmosPointSimple, threshold: (position: CosmosPointSimple) => boolean): Promise<void>;
export declare function spawnBreakfast(): void;
export declare const script: (subscript: string, ...args: string[]) => Promise<any>;
