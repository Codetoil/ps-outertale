import { OutertaleChoice, OutertaleGroup, OutertaleVolatile } from '../classes';
import { CosmosPointSimple } from '../engine/numerics';
export declare function standardMusic(): void;
export declare function endMusic(): void;
export declare function spareFlee(choice: OutertaleChoice): boolean;
export declare function standardPos(basedbox?: boolean): void;
export declare function standardSize(size?: {
    x: number;
    y: number;
}, basedbox?: boolean): Promise<[void, void | undefined]>;
export declare function resetBox(basedbox?: boolean): Promise<[void, void | undefined]>;
export declare function defaultSetup(pattern: (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void>, size?: CosmosPointSimple, basedbox?: boolean): (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void>;
export declare function turnSkip(): Promise<boolean>;
declare const groups: {
    maddummy: OutertaleGroup;
    moldsmal: OutertaleGroup;
    spacetop: OutertaleGroup;
    nobody: OutertaleGroup;
};
export default groups;
