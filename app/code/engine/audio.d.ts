import { CosmosAsset, CosmosCache, CosmosTimer } from './core';
import { CosmosValue, CosmosValueLinked } from './numerics';
export type CosmosDaemonRouter = (input: GainNode, output: AudioContext) => void;
export declare class CosmosAudio extends CosmosAsset<AudioBuffer> {
    private static $audio;
    static cache: CosmosCache<string, Promise<AudioBuffer>>;
    static get context(): AudioContext;
    static utils: {
        convolver(context: AudioContext, duration: number, ...pattern: number[]): ConvolverNode;
        delay(context: AudioContext, offset: number, feedback: number, echoes?: number): GainNode;
        filter(context: AudioContext, type: BiquadFilterType, frequency: number): BiquadFilterNode;
        impulse(context: AudioContext, duration: number, ...pattern: number[]): AudioBuffer;
    };
    loader(): Promise<AudioBuffer>;
    unloader(): void;
}
export interface CosmosInstance {
    daemon: CosmosDaemon;
    loop: boolean;
    gain: CosmosValueLinked;
    readonly position: number;
    rate: CosmosValueLinked;
    source: AudioBufferSourceNode;
    stop(): void;
}
export interface CosmosDaemonProperties {
    context?: AudioContext;
    gain?: number;
    loop?: boolean;
    rate?: number;
    router?: CosmosDaemonRouter;
}
export declare class CosmosDaemon {
    audio: CosmosAudio;
    context: AudioContext;
    gain: number;
    readonly instances: CosmosInstance[];
    loop: boolean;
    rate: number;
    router: CosmosDaemonRouter;
    constructor(audio: CosmosAudio, { context, gain, loop, rate, router }?: CosmosDaemonProperties);
    instance(timer: CosmosTimer, { offset, store }?: {
        offset?: number | undefined;
        store?: boolean | undefined;
    }): CosmosInstance;
}
export declare class CosmosEffect extends CosmosValue {
    context: AudioContext;
    input: AudioNode;
    output: GainNode;
    throughput: GainNode;
    get value(): number;
    set value(value: number);
    constructor(context: AudioContext, node: AudioNode, value: number);
    connect(target: CosmosEffect | AudioNode | AudioContext): void;
    disconnect(target?: CosmosEffect | AudioNode | AudioContext): void;
}
export declare class CosmosMixer extends CosmosValue {
    private $mixer;
    context: AudioContext;
    input: GainNode;
    output: GainNode;
    get effects(): CosmosEffect[];
    set effects(value: CosmosEffect[]);
    get value(): number;
    set value(value: number);
    constructor(context: AudioContext, effects?: CosmosEffect[]);
    update(index: number, value?: CosmosEffect): void;
}
