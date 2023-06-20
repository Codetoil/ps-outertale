import { Graphics } from 'pixi.js';
import { CosmosBaseEvents, CosmosMetadata, CosmosSizedObject, CosmosStyle } from './renderer';
export declare class CosmosRectangle<A extends CosmosBaseEvents = CosmosBaseEvents, B extends CosmosMetadata = CosmosMetadata> extends CosmosSizedObject<A, B> {
    $rectangle: {
        graphics: Graphics;
        visible: boolean;
    };
    draw(style: CosmosStyle): void;
}
