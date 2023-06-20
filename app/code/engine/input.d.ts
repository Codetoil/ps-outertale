import { CosmosEventHost } from './core';
export declare class CosmosKeyboardInput extends CosmosEventHost<{
    down: [string | null];
    up: [string | null];
}> {
    private $input;
    get force(): boolean;
    set force(value: boolean);
    constructor(target: HTMLElement | null, ...codes: string[]);
    active(): boolean;
    reset(): void;
}
