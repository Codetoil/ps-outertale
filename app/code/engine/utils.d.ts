export type CosmosDefined<A> = Exclude<A, null | undefined | void>;
export type CosmosDirection = 'down' | 'left' | 'right' | 'up';
export type CosmosFace = 'bottom' | 'left' | 'right' | 'top';
export type CosmosKeyed<A = any, B extends string = any> = {
    [x in B]: A;
};
export type CosmosNot<A, B extends string> = {
    [x in Exclude<keyof CosmosDefined<A>, B>]?: CosmosDefined<A>[x];
};
export type CosmosProvider<A, B extends any[] = []> = A | ((...args: B) => A);
export type CosmosResult<A> = A extends () => Promise<infer B> ? B : never;
export type CosmosBasic = {
    [k: string | number]: CosmosBasic;
} | CosmosBasic[] | string | number | boolean | null | undefined | void;
export declare class CosmosModule<A, B extends any[]> {
    name: string;
    script: (...args: B) => Promise<A>;
    promise: Promise<A> | null;
    constructor(name: string, script: (...args: B) => Promise<A>);
    import(...args: B): Promise<A>;
}
export declare const CosmosUtils: {
    chain<A, B>(input: A, handler: (input: A, loop: (input: A) => B) => B): B;
    format(text: string, length?: number, plain?: boolean): string;
    hyperpromise<A_1 = void>(): {
        promise: Promise<A_1>;
        resolve: (value: A_1 | PromiseLike<A_1>) => void;
    };
    import<A_2 = any>(source: string): Promise<A_2>;
    parse<A_3 = any>(text: string): A_3;
    populate: {
        <A_4 extends (index: number) => unknown>(size: number, provider: A_4): ReturnType<A_4>[];
        <A_5>(size: number, provider: A_5): A_5[];
    };
    provide<A_6 extends unknown>(provider: A_6, ...args: A_6 extends CosmosProvider<infer _, infer C extends any[]> ? C : never): A_6 extends CosmosProvider<infer B_1, any[]> ? B_1 : never;
    raw(text: string): string;
    serialize(value: any): string;
    status(text: string, { backgroundColor, color, fontFamily, fontSize, fontStyle, fontWeight, padding }?: {
        backgroundColor?: string | undefined;
        color?: string | undefined;
        fontFamily?: string | undefined;
        fontSize?: string | undefined;
        fontStyle?: string | undefined;
        fontWeight?: string | undefined;
        padding?: string | undefined;
    }): void;
};
