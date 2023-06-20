declare const patterns: {
    undynefast(): Promise<void>;
    doge(phase: number, atk: number): Promise<void>;
    muffet: (turn: number, speedstat: number) => Promise<void>;
    radtile(): Promise<void>;
    woshua(cleaners?: boolean, modifier?: "none" | "moldbygg"): Promise<void>;
    moldbygg(modifier?: "none" | "woshua" | "moldsmal"): Promise<void>;
    undyne: (phase: number, turns: number, swing: boolean, maxhp: number) => Promise<void>;
};
export default patterns;
