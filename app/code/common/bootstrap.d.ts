import { OutertaleMap } from '../classes';
import { CosmosDaemon } from '../engine/audio';
import { CosmosAnimation } from '../engine/image';
export declare const _map: OutertaleMap;
export declare const faces: {
    asrielPlain: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
};
export declare const sources: {
    _: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: {
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
            }[];
            main: {
                position: {
                    x: number;
                    y: number;
                };
                triggers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                }[];
            }[];
        };
        spawn: {
            x: number;
            y: number;
        };
        region: {
            x: number;
            y: number;
        }[];
    };
    _taxi: {
        $schema: string;
        preload: string[];
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    _void: {
        $schema: string;
        background: string;
        layers: {
            below: {
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                triggers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            }[];
        };
        spawn: {
            x: number;
            y: number;
        };
        region: {
            x: number;
            y: number;
        }[];
    };
};
export declare const voices: {
    storyteller: CosmosDaemon[];
};
