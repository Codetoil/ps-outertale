import { OutertaleTurnState } from '../classes';
import { CosmosEventHost } from '../engine/core';
import { CosmosSprite } from '../engine/image';
import { CosmosBaseEvents, CosmosHitbox, CosmosSizedObjectProperties } from '../engine/renderer';
export type ShootableEvents = CosmosBaseEvents & {
    shot: [number, number];
};
export declare function brez(x: number, y: number, sp?: boolean): Promise<void>;
export declare const box: {
    readonly x1: number;
    readonly x2: number;
    readonly y1: number;
    readonly y2: number;
    readonly x: number;
    readonly y: number;
    readonly sx: number;
    readonly sy: number;
};
export declare const mta: {
    fodder(solid: boolean, props?: CosmosSizedObjectProperties, over?: boolean): {
        bullet: CosmosHitbox<ShootableEvents, {
            shot: boolean;
            shootable: boolean;
            t: number;
            bullet: boolean;
            damage: number;
            rev: boolean;
            blastable: boolean;
        }>;
        detached: Promise<void>;
        detach: (value: void | PromiseLike<void>) => void;
    };
    laser(baserot: number, spin: number, speed: number, x: number, color: 'blue' | 'orange' | 'white', props: CosmosSizedObjectProperties): CosmosHitbox<CosmosBaseEvents, {
        bullet: boolean;
        damage: number;
        color: "white" | "blue" | "orange";
    } & import("../engine/renderer").CosmosMetadata>;
};
export declare const mtb: {
    sideleg(side?: -1 | 1, center?: number, centerDistance?: number, speed?: number, sd?: number, sr?: number, tickOffset?: number, preyellow?: boolean, arm?: boolean): Promise<void>;
    sidearm(side?: -1 | 1, center?: number, centerDistance?: number, speed?: number, swingSpeed?: number, tickOffset?: number, preyellow?: boolean): Promise<void>;
    /** bwsp = box-width-span phase */
    bomb(bwsp?: number, speed?: number, rev?: CosmosEventHost<{
        rev: [];
    }> | null): Promise<void>;
    parasol(bwsp?: number, speed?: number, early?: number): Promise<void>;
    meteor(bwsp?: number, speed?: number, warntime?: number): Promise<void>;
    rocket(bs?: number, bwsp?: number, warntime?: number, firetime?: number): Promise<void>;
    paratrooper(side?: -1 | 1, distance?: number, speed?: number, bulletspeed?: number, waversize?: number): Promise<void>;
    blaster(side?: -1 | 1, y?: number, chargeTime?: number, blastTime?: number): Promise<void>;
    fodder(bwsp?: number, solid?: boolean, speed?: number, waversize?: number, rev?: CosmosEventHost<{
        rev: [];
    }> | null): Promise<void>;
    hopbox(bwsp?: number, speed?: number, waversize?: number, hoptime?: number, hopheight?: number): Promise<void>;
    buzzgate(bwsp?: number, sep?: number, speed?: number, waversize?: number): Promise<void>;
    laser(bwsp?: number, baserot?: number, spin?: number, speed?: number, x?: number, color?: 'orange' | 'blue'): Promise<void>;
};
declare const patterns: {
    mettaton1(turn: number, shyren: boolean, maddummy: boolean, quizzer: CosmosSprite, totalFails: number, f?: ((e: number) => Promise<void>) | undefined): Promise<number[]>;
    mettaton2(ex: boolean, state: OutertaleTurnState<any>, turns?: number): Promise<void>;
    mettaton3(turns: number): Promise<void>;
    alphys1(idx: number, ftester?: Promise<void>): Promise<void>;
    alphys2(): Promise<void>;
    rg(sparable: boolean, progress: 0 | 1 | 2, killed: -1 | 0 | 1, modifier: 'cf' | 'gr' | null, totalTugScore: number): Promise<number | undefined>;
    glyde(): Promise<void>;
    pyrope(company: boolean): Promise<void>;
    tsundere(company: boolean, greenmode: boolean): Promise<void>;
    perigee(): Promise<void>;
    madjick(protoattacktype: number, protocrazy: boolean): Promise<void>;
    knightknight(panic?: boolean): Promise<void>;
    froggitex(solo?: boolean): Promise<void>;
    whimsalot(solo?: boolean): Promise<void>;
    astigmatism(solo?: boolean): Promise<void>;
    mushketeer(travel: number): Promise<void>;
};
export default patterns;
