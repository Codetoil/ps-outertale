import './bootstrap';
import { OutertaleShop } from '../classes';
import { CosmosInventory } from '../engine/core';
import { CosmosCharacter } from '../engine/entity';
import { CosmosAnimation, CosmosImage, CosmosSprite } from '../engine/image';
import { CosmosPointSimple } from '../engine/numerics';
import { CosmosHitbox, CosmosObject } from '../engine/renderer';
import { CosmosRectangle } from '../engine/shapes';
import { CosmosDirection, CosmosKeyed } from '../engine/utils';
export declare const kiddAssets: CosmosInventory<[CosmosInventory<[import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources]>, CosmosInventory<[import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources]>, CosmosInventory<[import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources]>, CosmosInventory<[import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources]>, import("../engine/audio").CosmosAudio]>;
export declare const asgoreAssets: CosmosInventory<[import("../engine/image").CosmosAnimationResources, CosmosImage, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, CosmosInventory<[import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, import("../engine/image").CosmosAnimationResources, CosmosImage]>, import("../engine/audio").CosmosAudio, import("../engine/audio").CosmosAudio]>;
export declare function alphaCheck(this: CosmosObject): void;
export declare function tintCalc(value: number, target: number): number;
export declare const states: {
    rooms: Partial<CosmosKeyed<CosmosKeyed<any>>>;
    scripts: Partial<CosmosKeyed<CosmosKeyed<any>>>;
};
/** tem shop armor price */
export declare function armorprice(): number;
export declare function puzzleTarget(): 45 | 36 | 37;
export declare function tripper(kidd: CosmosCharacter, resources?: import("../engine/image").CosmosAnimationResources): Promise<void>;
export declare function pulsetestGenOver(owner: CosmosObject): CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>[];
export declare function pulsetest(instances: CosmosObject[], pylon: CosmosObject): void;
export declare function beamcast(stage: {
    mirrors: [CosmosObject, string, CosmosPointSimple][];
    discovery: CosmosObject[];
    beamwalls: CosmosHitbox[];
    rects: CosmosRectangle[];
    anims: CosmosAnimation[];
    overs: CosmosSprite[];
}, position: CosmosPointSimple, valid?: {
    state: boolean;
}, face?: CosmosDirection): Promise<boolean>;
export declare function napstamusic(roomState: any): void;
export declare const failPuzzle: (rects: CosmosRectangle[], pylons: CosmosAnimation[], semi?: boolean) => Promise<void>;
export declare const passPuzzle: (rects: CosmosRectangle[], pylons: CosmosAnimation[]) => Promise<void>;
export declare function stabbie(earlyExit?: boolean, ...positions: CosmosPointSimple[]): Promise<{
    sprs: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>[];
    anims: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>[];
} | undefined>;
export declare function stabbieHole(position: CosmosPointSimple, append?: boolean): void;
export declare const script: (subscript: string, ...args: string[]) => Promise<any>;
export declare const shops: {
    tortoise: OutertaleShop;
    tem: OutertaleShop;
};
