import { OutertaleOpponent } from '../classes';
import { CosmosValueRandom } from '../engine/numerics';
import { CosmosRectangle } from '../engine/shapes';
export declare const graphMetadata: {
    next: number;
    offset: number;
    ratingsbase: number;
    ratingstier: number;
    ratingscap: number;
    ratingsgain: number | null;
    eventQueue: {
        label: string;
        score: number;
    }[];
};
export declare function graphGen(random3?: CosmosValueRandom): CosmosRectangle<import("../engine/renderer").CosmosBaseEvents, {
    next: number;
    offset: number;
    ratingsbase: number;
    ratingstier: number;
    ratingscap: number;
    ratingsgain: number | null;
    eventQueue: {
        label: string;
        score: number;
    }[];
}>;
export declare function selectMTT(): void;
declare const opponents: {
    mettaton1: OutertaleOpponent;
    mettaton2: OutertaleOpponent;
    rg03: OutertaleOpponent;
    rg04: OutertaleOpponent;
    glyde: OutertaleOpponent;
    pyrope: OutertaleOpponent;
    tsundere: OutertaleOpponent;
    perigee: OutertaleOpponent;
    madjick: OutertaleOpponent;
    knightknight: OutertaleOpponent;
    froggitex: OutertaleOpponent;
    whimsalot: OutertaleOpponent;
    astigmatism: OutertaleOpponent;
    migospel: OutertaleOpponent;
    mushketeer: OutertaleOpponent;
};
export default opponents;
