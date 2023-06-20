import { OutertaleMap } from '../classes';
import { CosmosImage, CosmosSprite } from '../engine/image';
export declare const foundryMap: OutertaleMap;
export declare const foundryOverlayMap: OutertaleMap;
export declare const sources: {
    f_start: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark02: boolean;
        };
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
                    args: string[];
                }[];
            }[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
        };
        spawn: {
            x: number;
            y: number;
        };
    };
    f_sans: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                } | {
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
                })[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                triggers?: undefined;
                barriers?: undefined;
            })[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags: string[];
            })[];
        };
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
    };
    f_corridor: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark02: boolean;
        };
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
            }[];
            main: ({
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags: string[];
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        score: {
            music: string;
            gain: number;
            reverb: number;
        };
    };
    f_doge: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
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
                    args: string[];
                }[];
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
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                attachments?: undefined;
                triggers?: undefined;
                position?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        score: {
            music: string;
            gain: number;
        };
    };
    f_puzzle1: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            } | {
                tags: string[];
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
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: ({
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    name: string;
                    args: string[];
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
                }[];
                barriers?: undefined;
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
    };
    f_quiche: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark02: boolean;
        };
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
                    args: string[];
                }[];
            }[];
            above: never[];
            main: ({
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            })[];
        };
        neighbors: string[];
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
    };
    f_bird: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                } | {
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
                })[];
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
                    args: string[];
                }[];
                position?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_puzzle2: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            } | {
                tags: string[];
                triggers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: ({
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    name: string;
                    args: string[];
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
                }[];
                barriers?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
    };
    f_story1: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_prechase: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
                attachments?: undefined;
            } | {
                tags: string[];
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
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
                attachments?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
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
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
        metadata: {
            dark02: boolean;
        };
    };
    f_chase: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
            } | {
                tags: string[];
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
                    args: string[];
                }[];
                barriers?: undefined;
                position?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        metadata: {
            dark02: boolean;
        };
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
    };
    f_entrance: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: {
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
            }[];
            above: never[];
            main: {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
            }[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
        neighbors: string[];
    };
    f_lobby: {
        $schema: string;
        background: string;
        preload: string[];
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
                    args: string[];
                }[];
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
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        y: number;
                        x: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
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
                tags: string[];
                barriers?: undefined;
            })[];
        };
        spawn: {
            x: number;
            y: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_error: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_telescope: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_stand: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
                interacts?: undefined;
                attachments?: undefined;
                tags?: undefined;
            } | {
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
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                }[];
                tags: string[];
                barriers?: undefined;
                triggers?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            } | {
                tags: string[];
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
                position?: undefined;
                triggers?: undefined;
                interacts?: undefined;
                attachments?: undefined;
            })[];
            main: ({
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
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
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: ({
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
                    anchor?: undefined;
                } | {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                })[];
                position: {
                    x: number;
                    y: number;
                };
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
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_abyss: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: {
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
            }[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
    };
    f_muffet: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                attachments?: undefined;
                position?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: {
                attachments: ({
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                } | {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                })[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    f_shyren: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    auto: boolean;
                    resources: string;
                    anchor: {
                        y: number;
                    };
                }[];
                barriers: {
                    size: {
                        y: number;
                        x: number;
                    };
                }[];
                interacts: {
                    name: string;
                    size: {
                        y: number;
                        x: number;
                    };
                    args: string[];
                }[];
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
    };
    f_statue: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark02: boolean;
        };
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
                    args: string[];
                }[];
            }[];
            main: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: ({
                    type: string;
                    resources: string;
                    auto: boolean;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                } | {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    auto?: undefined;
                })[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
        };
    };
    f_piano: {
        $schema: string;
        background: string;
        preload: string[];
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
                    args: string[];
                }[];
            }[];
            main: ({
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_artifact: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags: string[];
            }[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
    };
    f_truth: {
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
                    args: string[];
                }[];
            }[];
        };
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
        neighbors: string[];
        score: {
            music: string;
            gain: number;
        };
    };
    f_path: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_view: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: {
                barriers: ({
                    position: {
                        y: number;
                        x?: undefined;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
                triggers: ({
                    position: {
                        y: number;
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    anchor?: undefined;
                } | {
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
                    args: string[];
                })[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    f_prespear: {
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
                    args: string[];
                }[];
            }[];
        };
        metadata: {
            dark02: boolean;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
        preload: string[];
        neighbors: string[];
    };
    f_spear: {
        $schema: string;
        background: string;
        metadata: {
            dark02: boolean;
        };
        layers: {
            below: {
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
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
        };
        preload: string[];
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
    };
    f_plank: {
        $schema: string;
        background: string;
        layers: {
            below: ({
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
                    args: string[];
                }[];
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
                tags?: undefined;
                attachments?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    frames: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        preload: string[];
    };
    f_asriel: {
        $schema: string;
        background: string;
        metadata: {
            dark01: boolean;
        };
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
                    args: string[];
                }[];
            }[];
            main: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                filters: string[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                filters?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
    };
    f_tunnel: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark01: boolean;
        };
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
                    args: string[];
                }[];
            }[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
            } | {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
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
                barriers?: undefined;
            })[];
        };
        spawn: {
            x: number;
            y: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
        };
        neighbors: string[];
    };
    f_dummy: {
        $schema: string;
        background: string;
        preload: string[];
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
                    args: string[];
                }[];
            }[];
            above: never[];
            main: ({
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
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
                barriers?: undefined;
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags: string[];
            })[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_hub: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
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
                tags?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
                barriers?: undefined;
                position?: undefined;
                tags?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        spawn: {
            x: number;
            y: number;
        };
        neighbors: string[];
    };
    f_undyne: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
                position?: undefined;
            })[];
            main: ({
                tags: string[];
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
                attachments?: undefined;
                position?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
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
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                })[];
                tags: string[];
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    filters: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_blooky: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                })[];
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
                    args: string[];
                }[];
                interacts?: undefined;
                tags?: undefined;
            } | {
                attachments: ({
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                } | {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                } | {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                })[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            } | {
                attachments: ({
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                } | {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                })[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags: string[];
                triggers?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags: string[];
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_snail: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: {
                attachments: ({
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                } | {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                })[];
                position: {
                    x: number;
                    y: number;
                };
            }[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_village: {
        $schema: string;
        background: string;
        preload: string[];
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
                    args: string[];
                }[];
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
                position: {
                    x: number;
                    y: number;
                };
            }[];
            main: ({
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    args: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    args: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
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
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
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
                tags: string[];
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_puzzle3: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                tags?: undefined;
                position?: undefined;
                attachments?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                triggers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                attachments?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                tags?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
                position?: undefined;
                attachments?: undefined;
            })[];
            main: ({
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    name: string;
                    args: string[];
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
                }[];
                barriers?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
            })[];
            above: never[];
        };
        mixins: {
            above: string;
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_taxi: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
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
                triggers?: undefined;
            } | {
                tags: string[];
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
                triggers?: undefined;
                attachments?: undefined;
                position?: undefined;
                interacts?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    f_corner: {
        $schema: string;
        background: string;
        preload: string[];
        metadata: {
            dark02: boolean;
        };
        layers: {
            below: {
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
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
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
            reverb: number;
            filter: number;
        };
        neighbors: string[];
    };
    f_story2: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                    args: string[];
                }[];
                attachments: {
                    type: string;
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
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
                tags?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            })[];
            main: {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_pacing: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
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
                    args: string[];
                }[];
                tags?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                interacts: {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
    };
    f_battle: {
        $schema: string;
        background: string;
        face: string;
        preload: string[];
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
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
            }[];
            main: ({
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers: {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
            } | {
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                interacts: {
                    anchor: {
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
                barriers?: undefined;
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                interacts?: undefined;
                barriers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        spawn: {
            x: number;
            y: number;
        };
    };
    f_exit: {
        $schema: string;
        background: string;
        preload: string[];
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
                    args: string[];
                }[];
            }[];
            main: {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    f_napstablook: {
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
                    args: string[];
                }[];
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
            main: {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags: string[];
            }[];
        };
        neighbors: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
    };
    f_kitchen: {
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
                position: {
                    x: number;
                    y: number;
                };
            }[];
            main: ({
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor?: undefined;
                })[];
                interacts: ({
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position?: undefined;
                } | {
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
                    anchor?: undefined;
                })[];
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    filters: string[];
                    frames: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
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
                }[];
                tags: string[];
                interacts?: undefined;
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                interacts?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
    };
    f_hapstablook: {
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
                    args: string[];
                }[];
                interacts: ({
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
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args?: undefined;
                })[];
            }[];
            main: ({
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
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
            } | {
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts: {
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
    };
};
export declare function undyneDialogue(image: CosmosImage): CosmosSprite<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
