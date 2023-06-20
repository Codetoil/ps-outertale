import { CosmosHitbox } from '../engine/renderer';
declare const patterns: {
    twinkly(type: number, index?: number, stage?: number): CosmosHitbox;
    froggit(index?: number, modifier?: string): Promise<void>;
    whimsun(index?: number, modifier?: string): Promise<void>;
    loox(index?: number, modifier?: string): Promise<void>;
    migosp(index?: number, modifier?: string): Promise<void>;
    mushy(index?: number): Promise<void>;
    toriel(index: number, hard?: boolean): Promise<void>;
};
export default patterns;
