declare const patterns: {
    stardrake(vertical?: boolean, jerry?: boolean): Promise<void>;
    doggo(): Promise<void>;
    lesserdog(index?: number): Promise<void>;
    dogs(index?: number, modifier?: 'dogamy' | 'dogaressa'): Promise<void>;
    greatdog(index: number): Promise<void>;
    mouse(): Promise<void>;
    papyrus: (index: number) => Promise<void>;
};
export default patterns;
