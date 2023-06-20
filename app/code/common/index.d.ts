import './bootstrap';
import { OutertaleGroup } from '../classes';
import { CosmosAsset, CosmosInventory } from '../engine/core';
import { CosmosCharacter } from '../engine/entity';
import { CosmosAnimation, CosmosSprite } from '../engine/image';
import { CosmosPointSimple } from '../engine/numerics';
import { CosmosDirection, CosmosProvider } from '../engine/utils';
export declare const backdropLoader: Promise<CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>>;
export declare const blue: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
export declare const characters: {
    alphys: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    asgore: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    asriel: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    finalghost: {
        talk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
        };
        walk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
        };
    };
    kidd: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    kiddSad: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    kiddSlave: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    napstablook: {
        talk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
        };
        walk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
                time: number;
            }>;
        };
    };
    none: {
        talk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    papyrus: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    papyrusMad: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    papyrusSpecial: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    papyrusStark: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    sans: {
        talk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    sansSpecial: {
        talk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    tem: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    toriel: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    torielHandhold: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    torielSpecial: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyne: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyneArmor: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyneArmorJetpack: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyneDate: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyneDateSpecial: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
    undyneStoic: {
        talk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
        walk: {
            down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
            up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        };
    };
};
export declare const monty: CosmosCharacter<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
export declare const frisk: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const friskWater: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const galaxy: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
export declare const azzie: CosmosCharacter<import("../engine/renderer").CosmosBaseEvents, {
    name: string | void;
    args: void | string[];
    barrier: boolean | void;
    interact: boolean | void;
    battle: boolean | void;
    firstfight: boolean | void;
    reposition: boolean | void;
    override: boolean | void;
    repositionFace: void | CosmosDirection;
    static: boolean | void;
    queue: void | {
        face: CosmosDirection;
        position: CosmosPointSimple;
        room: string;
    }[];
}>;
export declare const grey: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
export declare const lazyLoader: Promise<void>;
export declare const phish: CosmosCharacter<import("../engine/renderer").CosmosBaseEvents, {
    battle: boolean | void;
    firstfight: boolean | void;
    reposition: boolean;
    static: boolean | void;
    s: void | {
        grid: import('pathfinding').Grid | void;
        path: CosmosPointSimple[];
        pathindex: number;
    };
}>;
export declare const musicOverrides: ["battle1" | "bgbeat" | "blookShop" | "chara" | "characutscene" | "datingfight" | "datingstart" | "datingtense" | "djbeat" | "dogbass" | "dogbeat" | "dogdance" | "dogebattle" | "dogerelax" | "dogsigh" | "dogsong" | "dummyboss" | "endingexcerptIntro" | "endingexcerptLoop" | "factory" | "factoryEmpty" | "factoryquiet" | "factoryquietEmpty" | "generator" | "ghostbattle" | "home" | "homeAlt" | "memory" | "menu0" | "menu1" | "menu2" | "menu3" | "menu4" | "muscle" | "mushroomdance" | "napstachords" | "napstahouse" | "outlands" | "papyrus" | "papyrusboss" | "prebattle" | "predummy" | "preshock" | "redacted" | "rise" | "secretsong" | "shock" | "shop" | "specatk" | "spiderboss" | "spiderrelax" | "splendor" | "spooktune" | "spookwaltz" | "spookwave" | "spookydate" | "starton" | "startonEmpty" | "startonTown" | "startonTownEmpty" | "story" | "temmie" | "temShop" | "tension" | "thundersnail" | "toriel" | "torielboss" | "twinkly" | "undyne" | "undyneboss" | "undynefast" | "undynegeno" | "undynegenoFinal" | "undynegenoStart" | "undynepiano" | "undynepre" | "undynepreboss" | "undynepregeno" | "wonder" | "youscreweduppal" | "aerialis" | "aerialisEmpty" | "arms" | "armsIntro" | "CORE" | "confession" | "drone" | "forthefans" | "grandfinale" | "gameshow" | "knightknightSting" | "lab" | "legs" | "legsIntro" | "letsflyajetpackwhydontwe" | "letsmakeabombwhydontwe" | "madjickSting" | "mall" | "mettsuspense" | "ohmy" | "opera" | "operaAlt" | "sansdate" | "sexyrectangle" | "thriftShop" | "wrongenemy" | null, "battle1" | "bgbeat" | "blookShop" | "chara" | "characutscene" | "datingfight" | "datingstart" | "datingtense" | "djbeat" | "dogbass" | "dogbeat" | "dogdance" | "dogebattle" | "dogerelax" | "dogsigh" | "dogsong" | "dummyboss" | "endingexcerptIntro" | "endingexcerptLoop" | "factory" | "factoryEmpty" | "factoryquiet" | "factoryquietEmpty" | "generator" | "ghostbattle" | "home" | "homeAlt" | "memory" | "menu0" | "menu1" | "menu2" | "menu3" | "menu4" | "muscle" | "mushroomdance" | "napstachords" | "napstahouse" | "outlands" | "papyrus" | "papyrusboss" | "prebattle" | "predummy" | "preshock" | "redacted" | "rise" | "secretsong" | "shock" | "shop" | "specatk" | "spiderboss" | "spiderrelax" | "splendor" | "spooktune" | "spookwaltz" | "spookwave" | "spookydate" | "starton" | "startonEmpty" | "startonTown" | "startonTownEmpty" | "story" | "temmie" | "temShop" | "tension" | "thundersnail" | "toriel" | "torielboss" | "twinkly" | "undyne" | "undyneboss" | "undynefast" | "undynegeno" | "undynegenoFinal" | "undynegenoStart" | "undynepiano" | "undynepre" | "undynepreboss" | "undynepregeno" | "wonder" | "youscreweduppal" | "aerialis" | "aerialisEmpty" | "arms" | "armsIntro" | "CORE" | "confession" | "drone" | "forthefans" | "grandfinale" | "gameshow" | "knightknightSting" | "lab" | "legs" | "legsIntro" | "letsflyajetpackwhydontwe" | "letsmakeabombwhydontwe" | "madjickSting" | "mall" | "mettsuspense" | "ohmy" | "opera" | "operaAlt" | "sansdate" | "sexyrectangle" | "thriftShop" | "wrongenemy" | null][];
export declare const queue: {
    state: {
        loader: Promise<any> | null;
    };
    assets: CosmosAsset<any>[];
    load(): Promise<any>;
};
export declare const menuAssets: CosmosInventory<[import("../api").CosmosAudio, import("../engine/image").CosmosAnimationResources, import("../api").CosmosAudio, import("../api").CosmosAudio, import("../api").CosmosAudio, import("../engine/image").CosmosImage, import("../engine/image").CosmosImage, import("../api").CosmosAudio]>;
export declare function endCall(t: string): Promise<void>;
export declare function genCB(): void;
export declare function quickCall(end: boolean, ...lines: string[]): Promise<void>;
export declare function runEncounter(populationfactor: number, puzzlefactor: number, chances: [OutertaleGroup, number][]): false | Promise<void>;
export declare function stalkerSetup(plot: number, check?: CosmosProvider<boolean>, liveCondition?: CosmosProvider<boolean>): void;
