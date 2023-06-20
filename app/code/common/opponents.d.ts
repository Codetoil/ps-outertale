import { OutertaleOpponent, OutertaleTurnState, OutertaleVolatile } from '../classes';
import { CosmosPoint, CosmosPointSimple, CosmosValueRandom } from '../engine/numerics';
export type MadDummyMetadata = {
    speed: number;
    multiplier: number;
    time: number;
    mode: 'normal' | 'ragdoll' | 'random' | 'restore';
    movement: {
        rate: number;
        intensity: number;
        center: CosmosPoint;
        sineRate: CosmosPointSimple;
        sinePower: CosmosPointSimple;
    };
    ragdolled: boolean;
    random3: CosmosValueRandom;
};
export declare function kiddTurn(opkey: string, allowpac?: boolean): Promise<"fight" | "skip" | "pacify" | "defdown" | "atkdown" | undefined>;
export declare function kiddFight(volatile: OutertaleVolatile): Promise<boolean>;
export declare function kiddHandler(state: OutertaleTurnState<any>, opkey: string, allowpac?: boolean): Promise<void>;
export declare const opponents: {
    maddummy: OutertaleOpponent;
    moldsmal: OutertaleOpponent;
    spacetop: OutertaleOpponent;
    space: OutertaleOpponent;
};
export default opponents;
