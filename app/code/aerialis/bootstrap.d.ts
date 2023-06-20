import { OutertaleMap } from '../classes';
import { CosmosTyper } from '../engine/text';
export declare const aerialisAMap: OutertaleMap;
export declare const aerialisAOverlayMap: OutertaleMap;
export declare const aerialisBMap: OutertaleMap;
export declare const gossiper: {
    cooldown: boolean;
    text1: string;
    text2: string;
    typer1: CosmosTyper;
    typer2: CosmosTyper;
    dialogue(...lines: (string | {
        b: string;
        c: string;
        s?: boolean;
    })[]): Promise<void>;
    sfx(content: string): Promise<void>;
};
export declare const sources: {
    a_elevator4: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
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
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation?: undefined;
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
                triggers?: undefined;
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
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
            })[];
            above: {
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
                tags: string[];
            }[];
            main: ({
                tags: string[];
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
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    a_auditorium: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
            }[];
        };
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    a_aftershow: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
        preload: string[];
        layers: {
            below: {
                triggers: ({
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
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
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
                tags: string[];
            } | {
                tags: string[];
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
        spawn: {
            x: number;
            y: number;
        };
    };
    a_hub1: {
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
                triggers: ({
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
                    rotation?: undefined;
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
                    name: string;
                    args: string[];
                })[];
                attachments: {
                    type: string;
                    auto: boolean;
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
                attachments?: undefined;
                position?: undefined;
            })[];
            main: ({
                tags: string[];
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
                tags: string[];
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
                    position: {
                        x: number;
                        y: number;
                    };
                    name: string;
                    args: string[];
                }[];
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_dining: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                    resources?: undefined;
                    position?: undefined;
                })[];
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
                barriers?: undefined;
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
                    position: {
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
                tags: string[];
                interacts?: undefined;
            } | {
                tags: string[];
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
                interacts?: undefined;
            } | {
                tags: string[];
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
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_hub2: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
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
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                }[];
                triggers: ({
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
                    rotation?: undefined;
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
                    name: string;
                    args: string[];
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
                position?: undefined;
                attachments?: undefined;
                barriers?: undefined;
                triggers?: undefined;
            })[];
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
                tags: string[];
            } | {
                tags: string[];
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
                }[];
                tags?: undefined;
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_lookout: {
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
                attachments?: undefined;
                position?: undefined;
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
                position?: undefined;
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
                interacts?: undefined;
                attachments?: undefined;
                position?: undefined;
            })[];
            main: {
                tags: string[];
            }[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_hub3: {
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
                triggers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
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
                    args: string[];
                    rotation?: undefined;
                })[];
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                interacts?: undefined;
                tags?: undefined;
            } | {
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
                tags: string[];
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            })[];
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
            } | {
                tags: string[];
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
                interacts?: undefined;
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_plaza: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
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
            main: ({
                tags: string[];
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
                interacts?: undefined;
                filters?: undefined;
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
                filters?: undefined;
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
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags: string[];
                filters?: undefined;
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
                }[];
                tags: string[];
                interacts?: undefined;
                filters?: undefined;
            } | {
                tags: string[];
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
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
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                filters?: undefined;
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
                filters?: undefined;
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
                interacts?: undefined;
                filters?: undefined;
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
                filters?: undefined;
            } | {
                tags: string[];
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
                barriers?: undefined;
                filters?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
                    name: string;
                    args: string[];
                }[];
                barriers?: undefined;
                filters?: undefined;
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
                filters: string[];
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
                tags: string[];
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
                tags: string[];
                barriers?: undefined;
                filters?: undefined;
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_elevator5: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
        preload: string[];
        layers: {
            below: ({
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
                tags: string[];
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation?: undefined;
                } | {
                    position: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
                    size: {
                        x: number;
                        y: number;
                    };
                })[];
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
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                position?: undefined;
                tags?: undefined;
            })[];
            above: {
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
                tags: string[];
            }[];
            main: ({
                tags: string[];
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
        score: {
            music: string;
            gain: number;
        };
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    a_hub4: {
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
                position?: undefined;
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
                interacts?: undefined;
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
                    auto: boolean;
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
            } | {
                tags: string[];
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
                interacts?: undefined;
            })[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_sleeping1: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
            main: {
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
                    anchor: {
                        x: number;
                        y: number;
                    };
                    frames: string[];
                    resources?: undefined;
                    position?: undefined;
                })[];
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
            }[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_sleeping2: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
                tags: string[];
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
            } | {
                tags: string[];
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
                })[];
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
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    a_sleeping3: {
        $schema: string;
        background: string;
        metadata: {
            dark03: boolean;
        };
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
        neighbors: string[];
        region: {
            x: number;
            y: number;
        }[];
    };
    a_hub5: {
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
                attachments: {
                    type: string;
                    auto: boolean;
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            })[];
            main: {
                tags: string[];
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
            }[];
        };
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_citadelevator: {
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
        };
        region: {
            x: number;
            y: number;
        }[];
        score: {
            music: string;
            filter: number;
        };
        neighbors: string[];
    };
    a_core_entry1: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
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
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
                filters?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
        preload: string[];
        score: {
            music: string;
            gain: number;
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
    a_core_entry2: {
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
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                    anchor: {
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
        preload: string[];
        score: {
            music: string;
            gain: number;
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
    a_core_main: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                position?: undefined;
            } | {
                tags: string[];
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
                triggers?: undefined;
                filters?: undefined;
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
                    auto: boolean;
                }[];
                tags: string[];
                barriers?: undefined;
                triggers?: undefined;
                filters?: undefined;
                interacts?: undefined;
            })[];
        };
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_left1: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                position?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
                interacts?: undefined;
            })[];
            main: {
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
            }[];
        };
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_left2: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                position?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
                interacts?: undefined;
            })[];
            main: {
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
            }[];
        };
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_left3: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                position?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
            })[];
            main: {
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
                    anchor: {
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
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_right1: {
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
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
        };
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_right2: {
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
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
        };
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_right3: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    position: {
                        x: number;
                        y: number;
                    };
                }[];
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
                position?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
                position?: undefined;
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
                triggers?: undefined;
                filters?: undefined;
            })[];
            main: {
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
                    anchor: {
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
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_bridge: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
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
                    name: string;
                    args: string[];
                }[];
                tags?: undefined;
                filters?: undefined;
            } | {
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
                tags: string[];
                filters: string[];
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            })[];
            main: {
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
                    anchor: {
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
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
    };
    a_core_checkpoint: {
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
                tags?: undefined;
                filters?: undefined;
                interacts?: undefined;
            } | {
                tags: string[];
                filters: string[];
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
        preload: string[];
        score: {
            music: string;
            gain: number;
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
    a_core_suspense: {
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
        preload: string[];
        score: {
            music: string;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
    };
    a_core_battle: {
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
                tags: string[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: {
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
                    anchor: {
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
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        score: {
            music: string;
        };
    };
    a_core_exit1: {
        $schema: string;
        background: string;
        layers: {
            below: ({
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
                filters?: undefined;
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
                filters: string[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        preload: string[];
    };
    a_core_exit2: {
        $schema: string;
        background: string;
        layers: {
            below: ({
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
                    anchor: {
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
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
        neighbors: string[];
    };
    a_start: {
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
                tags?: undefined;
                attachments?: undefined;
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
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
                interacts?: undefined;
                barriers?: undefined;
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
        mixins: {
            above: string;
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
        preload: string[];
    };
    a_lab_entry: {
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
        };
        region: {
            x: number;
            y: number;
        }[];
        neighbors: string[];
        preload: string[];
        score: {
            music: string;
            rate: number;
        };
    };
    a_lab_main: {
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
                attachments?: undefined;
                tags?: undefined;
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
                    resources: string;
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
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
                    resources: string;
                    auto: boolean;
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
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
                triggers?: undefined;
                interacts?: undefined;
            })[];
            main: {
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
            filter: number;
        };
    };
    a_lab_upstairs: {
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
                attachments?: undefined;
                position?: undefined;
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    auto: boolean;
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
                interacts?: undefined;
                tags?: undefined;
            } | {
                attachments: {
                    type: string;
                    position: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                    auto: boolean;
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
                interacts?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    auto: boolean;
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                }[];
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
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
                triggers?: undefined;
            })[];
        };
        region: {
            x: number;
            y: number;
        }[];
        preload: string[];
        neighbors: string[];
        score: {
            music: string;
        };
    };
    a_lab_downstairs: {
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
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
                    position: {
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
                position?: undefined;
                tags?: undefined;
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
                    resources: string;
                    auto: boolean;
                }[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
                tags?: undefined;
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
                    resources: string;
                    auto: boolean;
                }[];
                tags: string[];
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                interacts?: undefined;
            })[];
            main: {
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
            rate: number;
            gain: number;
        };
    };
    a_lab_virt: {
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
    };
    a_path1: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
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
                position?: undefined;
                triggers?: undefined;
                barriers?: undefined;
            })[];
            main: {
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
            }[];
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
        };
    };
    a_path2: {
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
                attachments?: undefined;
                position?: undefined;
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
                position?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
            main: {
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
            }[];
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
        };
    };
    a_path3: {
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
                position: {
                    x: number;
                    y: number;
                };
                tags?: undefined;
                attachments?: undefined;
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
            main: ({
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
                interacts?: undefined;
                barriers?: undefined;
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
            })[];
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
        };
        spawn: {
            x: number;
            y: number;
        };
    };
    a_rg1: {
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
        };
        mixins: {
            above: string;
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
    };
    a_path4: {
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
                attachments?: undefined;
                position?: undefined;
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
                position?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
                tags: string[];
                barriers?: undefined;
                triggers?: undefined;
            })[];
            main: ({
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
                barriers?: undefined;
                interacts?: undefined;
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
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
        };
    };
    a_barricade1: {
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
                    auto: boolean;
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
        };
    };
    a_puzzle1: {
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
                position?: undefined;
            })[];
            above: never[];
            main: ({
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
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
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
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
                barriers?: undefined;
                interacts?: undefined;
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
                barriers?: undefined;
                interacts?: undefined;
            })[];
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
        };
    };
    a_mettaton1: {
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
                attachments?: undefined;
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
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
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
                tags: string[];
                interacts: {
                    size: {
                        x: number;
                        y: number;
                    };
                    position: {
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
                barriers?: undefined;
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
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
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
        };
    };
    a_elevator1: {
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
        spawn: {
            x: number;
            y: number;
        };
    };
    a_lift: {
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
            filter: number;
        };
    };
    a_elevator2: {
        $schema: string;
        background: string;
        preload: string[];
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
            main: {
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
        };
    };
    a_sans: {
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
                position: {
                    x: number;
                    y: number;
                };
            }[];
            above: never[];
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
                barriers?: undefined;
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
                interacts?: undefined;
                barriers?: undefined;
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
        neighbors: string[];
        score: {
            music: string;
            gain: number;
        };
    };
    a_pacing: {
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
                tags: string[];
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
                triggers?: undefined;
            })[];
            main: ({
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
                barriers?: undefined;
                interacts?: undefined;
            } | {
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
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
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
    a_prepuzzle: {
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
                position: {
                    x: number;
                    y: number;
                };
                barriers?: undefined;
                triggers?: undefined;
                attachments?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            main: {
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
            }[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
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
        };
    };
    a_puzzle2: {
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
                position?: undefined;
            })[];
            main: ({
                tags: string[];
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
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
                position: {
                    x: number;
                    y: number;
                };
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    resources: string;
                }[];
                tags?: undefined;
                barriers?: undefined;
                interacts?: undefined;
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
                barriers?: undefined;
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
        };
        neighbors: string[];
    };
    a_mettaton2: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: ({
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                attachments: {
                    type: string;
                    frames: string[];
                }[];
                triggers?: undefined;
                barriers?: undefined;
            } | {
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
                attachments: {
                    type: string;
                    anchor: {
                        x: number;
                    };
                    frames: string[];
                }[];
                triggers?: undefined;
                barriers?: undefined;
            } | {
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
                tags?: undefined;
                attachments?: undefined;
            })[];
            above: never[];
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
                }[];
                tags?: undefined;
            })[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        score: {
            music: string;
            gain: number;
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
    a_rg2: {
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
            main: {
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
            }[];
            above: never[];
        };
        mixins: {
            above: string;
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
    };
    a_barricade2: {
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
                    resources: string;
                    auto: boolean;
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
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    auto: boolean;
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
            })[];
            above: never[];
        };
        mixins: {
            above: string;
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
    };
    a_split: {
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
                rotation: number;
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
                rotation?: undefined;
            })[];
            above: never[];
            main: ({
                attachments: {
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
            })[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        score: {
            music: string;
            gain: number;
            rate: number;
            filter: number;
        };
        region: {
            x: number;
            y: number;
        }[];
    };
    a_offshoot1: {
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
                position?: undefined;
            } | {
                attachments: {
                    type: string;
                    resources: string;
                    anchor: {
                        x: number;
                        y: number;
                    };
                    auto: boolean;
                    filters: string[];
                }[];
                position: {
                    x: number;
                    y: number;
                };
                tags: string[];
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
            })[];
            main: {
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
            }[];
            above: {
                position: {
                    x: number;
                    y: number;
                };
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
                    filters: string[];
                }[];
            }[];
        };
        mixins: {
            above: string;
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
    };
    a_offshoot2: {
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
            above: never[];
        };
        mixins: {
            above: string;
        };
        neighbors: string[];
        score: {
            music: string;
            rate: number;
            gain: number;
        };
        region: {
            x: number;
            y: number;
        }[];
    };
    a_elevator3: {
        $schema: string;
        background: string;
        preload: string[];
        layers: {
            below: {
                barriers: ({
                    position: {
                        x: number;
                        y: number;
                    };
                    size: {
                        x: number;
                        y: number;
                    };
                    rotation: number;
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
                    rotation?: undefined;
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
                    rotation: number;
                }[];
                rotation: number;
            }[];
            above: never[];
        };
        mixins: {
            above: string;
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
    };
};
