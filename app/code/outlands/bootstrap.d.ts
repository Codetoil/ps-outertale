import { OutertaleMap } from '../classes';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
export declare function resetThreshold(): number;
export declare const faces: {
    asrielCocky: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielEvil: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielEvilClosed: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielFear: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielFocus: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielFocusClosed: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielFocusSide: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielFurrow: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielHuh: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielOhReally: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielOhReallyClosed: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielPlainClosed: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    asrielSmirk: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielBlush: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCompassion: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCompassionFrown: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCompassionSmile: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielConcern: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCry: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCryLaugh: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCutscene1: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielCutscene2: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielDreamworks: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielEverythingisfine: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielIsMad: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielLowConcern: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielSad: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielShock: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielSincere: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielSmallXD: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielStraightUp: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielWTF: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielWTF2: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    torielXD: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyCapping: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyEvil: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyGonk: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyGrin: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyHurt: CosmosSprite<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyKawaii: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyLaugh: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyNice: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyPissed: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyPlain: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklySassy: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklySide: CosmosAnimation<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
    twinklyWink: CosmosSprite<import("../api").CosmosBaseEvents, import("../api").CosmosMetadata>;
};
export declare const outlandsMap: OutertaleMap;
export declare const sources: {
    w_start: {
        $schema: string;
        background: string;
        face: string;
        layers: {
            below: {
                barriers: ({
                    position: {
                        x: number;
                        y?: undefined;
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
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        spawn: {
            x: number;
            y: number;
        };
        preload: string[];
    };
    w_twinkly: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                position?: undefined;
            } | {
                barriers: ({
                    position: {
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
                        y?: undefined;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
                position: {
                    y: number;
                    x: number;
                };
                triggers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_entrance: {
        $schema: string;
        preload: string[];
        background: string;
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
                    anchor: {
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
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                position?: undefined;
            })[];
            main: {
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
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        spawn: {
            x: number;
            y: number;
        };
        score: {
            filter: number;
            gain: number;
            music: string;
            reverb: number;
        };
    };
    w_lobby: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: ({
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                    position: {
                        y: number;
                    };
                }[];
            } | {
                tags: string[];
                attachments: {
                    auto: boolean;
                    type: string;
                    resources: string;
                    anchor: {
                        y: number;
                    };
                }[];
                position: {
                    x: number;
                    y: number;
                };
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_tutorial: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                interacts?: undefined;
                triggers?: undefined;
                barriers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
            } | {
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                    position: {
                        y: number;
                    };
                }[];
                barriers?: undefined;
            } | {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                }[];
                barriers?: undefined;
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
                attachments?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_dummy: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
                    x: number;
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
                tags?: undefined;
                interacts?: undefined;
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
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                tags?: undefined;
                interacts?: undefined;
            })[];
            main: {
                tags: string[];
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
                    auto: boolean;
                }[];
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_restricted: {
        $schema: string;
        background: string;
        layers: {
            below: ({
                position: {
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
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
            } | {
                position: {
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                tags?: undefined;
            } | {
                tags: string[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_coffin: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
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
                triggers?: undefined;
                interacts?: undefined;
            } | {
                position: {
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
            reverb: number;
            filter: number;
        };
    };
    w_danger: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
            } | {
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
                tags?: undefined;
                position?: undefined;
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
            })[];
            main: ({
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
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
                interacts?: undefined;
            } | {
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
                    name: string;
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                tags?: undefined;
                attachments?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_zigzag: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            } | {
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
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_froggit: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                    y?: undefined;
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
                    anchor: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                    y?: undefined;
                };
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                barriers?: undefined;
            })[];
            main: ({
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
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    auto: boolean;
                    position: {
                        y: number;
                    };
                    resources: string;
                }[];
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
                    args: string[];
                    name: string;
                }[];
            } | {
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
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        spawn: {
            x: number;
            y: number;
        };
        score: {
            gain: number;
            music: string;
        };
    };
    w_candy: {
        $schema: string;
        preload: string[];
        background: string;
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
                triggers?: undefined;
                interacts?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
            main: {
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
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_puzzle1: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: {
                position: {
                    x: number;
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
            main: ({
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                triggers?: undefined;
                tags?: undefined;
                attachments?: undefined;
                barriers?: undefined;
            } | {
                position: {
                    x: number;
                    y?: undefined;
                };
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                tags?: undefined;
                attachments?: undefined;
                barriers?: undefined;
            } | {
                tags: string[];
                attachments: {
                    auto: boolean;
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
                interacts?: undefined;
                position?: undefined;
                triggers?: undefined;
                barriers?: undefined;
            } | {
                tags: string[];
                attachments: {
                    auto: boolean;
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
                position: {
                    x: number;
                    y: number;
                };
                interacts?: undefined;
                triggers?: undefined;
                barriers?: undefined;
            } | {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
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
                interacts?: undefined;
                triggers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_puzzle2: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
                    x: number;
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_puzzle3: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
                barriers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                barriers?: undefined;
            } | {
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
                interacts?: undefined;
                position?: undefined;
                triggers?: undefined;
            })[];
            main: ({
                tags: string[];
                attachments: {
                    auto: boolean;
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
                position?: undefined;
                barriers?: undefined;
            } | {
                tags: string[];
                attachments: {
                    auto: boolean;
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
            } | {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
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
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_puzzle4: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
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
                tags?: undefined;
                position?: undefined;
                interacts?: undefined;
                triggers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    type: string;
                    resources: string;
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_mouse: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    y: number;
                    x?: undefined;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: {
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
                        y: number;
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
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        spawn: {
            x: number;
            y: number;
        };
        score: {
            gain: number;
            music: string;
        };
    };
    w_blooky: {
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
                triggers?: undefined;
                position?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: ({
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    frames: string[];
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
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
                }[];
            } | {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
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
            gain: number;
            music: string;
        };
    };
    w_stairs: {
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
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
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                position?: undefined;
            })[];
            main: ({
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
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
                interacts: {
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
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    frames: string[];
                    type: string;
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            filter: number;
            reverb: number;
            gain: number;
            music: string;
        };
    };
    w_basement: {
        $schema: string;
        background: string;
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
                triggers?: undefined;
                interacts?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
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
                    anchor?: undefined;
                } | {
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
                })[];
                barriers?: undefined;
            })[];
            main: {
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
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_party: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                interacts?: undefined;
                tags?: undefined;
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
                triggers?: undefined;
            } | {
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
                })[];
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
                tags?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
                    position: {
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
                        y?: undefined;
                    };
                })[];
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
                    size: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                } | {
                    position: {
                        x: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            } | {
                triggers?: undefined;
                position?: undefined;
                barriers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            })[];
            main: ({
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
                interacts?: undefined;
                triggers?: undefined;
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
                triggers?: undefined;
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
                triggers?: undefined;
            } | {
                tags: string[];
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
                attachments: ({
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
                    frames?: undefined;
                } | {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                    resources?: undefined;
                    anchor?: undefined;
                })[];
                position: {
                    x: number;
                    y: number;
                };
                barriers: ({
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
                    frames: string[];
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                barriers?: undefined;
                interacts?: undefined;
                triggers?: undefined;
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
                    size: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
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
                interacts?: undefined;
                triggers?: undefined;
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
                triggers?: undefined;
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
                tags?: undefined;
                barriers?: undefined;
                interacts?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                barriers?: undefined;
                interacts?: undefined;
                triggers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            filter: number;
            reverb: number;
            gain: number;
            music: string;
        };
    };
    w_storage: {
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
                position: {
                    x: number;
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
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
                barriers?: undefined;
                interacts?: undefined;
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
                }[];
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            filter: number;
            reverb: number;
            gain: number;
            music: string;
        };
    };
    w_pacing: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
                interacts?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    y: number;
                    x?: undefined;
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
                attachments?: undefined;
                tags?: undefined;
                interacts?: undefined;
                triggers?: undefined;
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            } | {
                position: {
                    y: number;
                    x?: undefined;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    auto: boolean;
                    position: {
                        y: number;
                    };
                    resources: string;
                }[];
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
                    args: string[];
                    name: string;
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_junction: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
                    x: number;
                };
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
                    anchor: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
                interacts: {
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
                }[];
                triggers?: undefined;
            } | {
                position: {
                    x: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                interacts?: undefined;
            })[];
            main: {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_annex: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
                    x: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            } | {
                position: {
                    x: number;
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
                triggers?: undefined;
            })[];
            main: {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    position: {
                        y: number;
                    };
                    resources: string;
                }[];
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
                    args: string[];
                    name: string;
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_wonder: {
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
                triggers?: undefined;
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                interacts?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
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
            main: ({
                tags: string[];
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
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
                    position: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    size: {
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
            })[];
        };
        preload: string[];
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_courtyard: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
                barriers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
            } | {
                barriers: ({
                    position: {
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
                    size?: undefined;
                })[];
                position: {
                    x: number;
                    y: number;
                };
                attachments?: undefined;
                tags?: undefined;
                triggers?: undefined;
            })[];
            main: {
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
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        spawn: {
            x: number;
            y: number;
        };
    };
    w_alley1: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                position: {
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
            } | {
                position: {
                    y: number;
                };
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_alley2: {
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
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_alley3: {
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
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_alley4: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
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
            } | {
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
                tags?: undefined;
                position?: undefined;
                triggers?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_bridge: {
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_exit: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: {
                barriers: ({
                    position: {
                        x: number;
                        y?: undefined;
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
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                } | {
                    name: string;
                    args: string[];
                    size: {
                        x: number;
                        y: number;
                    };
                    position?: undefined;
                })[];
            }[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    w_toriel_front: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                triggers?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                attachments?: undefined;
                tags?: undefined;
                position?: undefined;
                barriers?: undefined;
                interacts?: undefined;
            } | {
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
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                triggers: {
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
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_toriel_living: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                interacts?: undefined;
            } | {
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
                position?: undefined;
            })[];
            main: ({
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
                attachments?: undefined;
                position?: undefined;
                interacts?: undefined;
                barriers?: undefined;
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
                    position: {
                        x: number;
                        y: number;
                    };
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
                })[];
                tags?: undefined;
                triggers?: undefined;
                barriers?: undefined;
            } | {
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
                tags: string[];
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
                    position: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
                triggers?: undefined;
            } | {
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    resources: string;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
                triggers?: undefined;
                interacts?: undefined;
                barriers?: undefined;
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
                tags?: undefined;
                triggers?: undefined;
                interacts?: undefined;
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_toriel_kitchen: {
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
                triggers?: undefined;
                position?: undefined;
                interacts?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
                position?: undefined;
                interacts?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                interacts: ({
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
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
                })[];
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
                triggers?: undefined;
            })[];
            main: ({
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
                tags: string[];
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
                tags?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_toriel_hallway: {
        $schema: string;
        preload: string[];
        background: string;
        layers: {
            below: ({
                triggers: ({
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                } | {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                    position?: undefined;
                })[];
                barriers?: undefined;
                interacts?: undefined;
                tags?: undefined;
            } | {
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
                interacts?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_toriel_asriel: {
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
                triggers: {
                    size: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            } | {
                interacts: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                barriers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
    w_toriel_toriel: {
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
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    anchor: {
                        y: number;
                    };
                    frames: string[];
                    type: string;
                }[];
                triggers?: undefined;
                tags?: undefined;
            } | {
                triggers: {
                    name: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    args: string[];
                }[];
                position?: undefined;
                attachments?: undefined;
                tags?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
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
                tags: string[];
                triggers?: undefined;
            })[];
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
        score: {
            gain: number;
            music: string;
        };
    };
};
