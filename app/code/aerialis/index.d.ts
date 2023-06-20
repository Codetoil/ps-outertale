import './bootstrap';
import { Container } from 'pixi.js';
import { OutertaleShop } from '../classes';
import { CosmosCharacter } from '../engine/entity';
import { CosmosAnimation, CosmosColor, CosmosSprite } from '../engine/image';
import { CosmosPointLinked, CosmosPointSimple, CosmosValueRandom } from '../engine/numerics';
import { CosmosObject } from '../engine/renderer';
import { CosmosDirection, CosmosKeyed } from '../engine/utils';
import { sources } from './bootstrap';
export type AerialisRoomKey = keyof typeof sources;
export type DefinedRoomStates = {
    a_lift: {
        location: 'a_start' | 'a_elevator1' | 'a_elevator2' | 'a_elevator3' | 'a_elevator4' | 'a_elevator5' | 'a_hub5' | 'a_core_entry1' | 'a_core_exit2' | 'e_elevator';
        elevating: boolean;
    };
    a_lab_main: {
        cutscene: boolean;
        monitor: boolean;
        monitorObject: CosmosObject;
        subcontainer: Container;
        alph: CosmosCharacter;
    };
    a_puzzle1: {
        offset: number;
        check: boolean;
        crash: boolean;
    };
    a_puzzle2: {
        offset: number;
        check: boolean;
        crash: boolean;
    };
    a_barricade1: {
        trig1: boolean;
        trig2: boolean;
        trig3: boolean;
    };
    a_mettaton1: {
        active: boolean;
        ingredient1: number;
        ingredient2: number;
        ingredient3: number;
        danger: boolean;
        metta: boolean;
    };
    a_mettaton2: {
        active: boolean;
        killswitch: boolean;
        climber: boolean;
    };
    a_split: {
        active: boolean;
        napsta: CosmosCharacter;
    };
    a_elevator3: {
        active: boolean;
    };
    a_lookout: {
        active: boolean;
    };
    a_hub5: {
        active: boolean;
    };
    a_elevator4: {
        active: boolean;
    };
    a_core_entry1: {
        active: boolean;
    };
    a_core_entry2: {
        active: boolean;
    };
    a_core_left1: {
        active: boolean;
        active_puzzle: boolean;
        switches: number[];
        solved: boolean;
    };
    a_core_left2: {
        active: boolean;
        active_puzzle: boolean;
        switches: number[];
        solved: boolean;
    };
    a_core_left3: {
        active: boolean;
    };
    a_core_right1: {
        active: boolean;
    };
    a_core_right2: {
        active: boolean;
    };
    a_core_right3: {
        active: boolean;
    };
    a_core_bridge: {
        active: boolean;
    };
    a_core_checkpoint: {
        active: boolean;
    };
    a_core_battle: {
        active: boolean;
    };
    a_sans: {
        toppler: boolean;
    };
};
export type RoomStates = {
    [k in AerialisRoomKey]: k extends keyof DefinedRoomStates ? Partial<DefinedRoomStates[k]> : {};
};
export declare const childEvac: () => boolean;
export declare const babyEvac: () => boolean;
export declare const teenEvac: () => boolean;
export declare const darkmansSprites: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const puzzler: {
    templates: {
        a_core_left1: number[][];
        a_core_left2: number[][];
    };
    resmaps: {
        a_core_left1: number[];
        a_core_left2: number[];
    };
    update(roomState: RoomStates['a_core_left1'] | RoomStates['a_core_left2'], targets: number[], restore?: boolean): void;
};
export declare const exteriors: Partial<CosmosKeyed<{
    height: number;
    x: number;
}, "a_lookout" | "a_auditorium" | "a_hub1" | "a_elevator4" | "a_aftershow" | "a_path4" | "a_puzzle1" | "a_split" | "a_rg2" | "a_hub5" | "a_core_exit1" | "a_core_suspense" | "a_core_main" | "a_core_checkpoint" | "a_core_bridge" | "a_citadelevator" | "a_core_entry2" | "a_core_entry1" | "a_core_battle" | "a_core_exit2" | "a_core_left2" | "a_core_left3" | "a_core_left1" | "a_core_right1" | "a_core_right2" | "a_core_right3" | "a_lift" | "a_mettaton1" | "a_sans" | "a_offshoot1" | "a_plaza" | "a_dining" | "a_hub2" | "a_hub3" | "a_hub4" | "a_sleeping1" | "a_lab_virt" | "a_lab_main" | "a_start" | "a_lab_entry" | "a_lab_upstairs" | "a_lab_downstairs" | "a_path1" | "a_elevator1" | "a_elevator2" | "a_elevator3" | "a_elevator5" | "a_puzzle2" | "a_offshoot2" | "a_prepuzzle" | "a_path2" | "a_path3" | "a_rg1" | "a_barricade1" | "a_pacing" | "a_mettaton2" | "a_barricade2" | "a_sleeping2" | "a_sleeping3" | "f_exit" | "f_battle">>;
export declare const hex: {
    delay: {
        baseTile: number;
        baseRate: number;
    };
    dtime: number;
    fader: number;
    paths: (number | {
        x: number;
        y: number;
    })[][];
    rand: CosmosValueRandom | null;
    sets: number[][];
    tint: number;
    valid(hexfloor: CosmosPointSimple[], position: CosmosPointSimple): boolean;
};
export declare function rgHeaders(rg1: CosmosObject, rg2: CosmosObject): (h: string) => void;
export declare function onionArm(x: number, scaleX: 1 | -1, frame: 'left' | 'out' | 'wave'): CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
    frame: "left" | "out" | "wave";
}>;
export declare function endarea(): Promise<void>;
export declare function updateBadLizard(): Promise<void>;
export declare const friskJetpack: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const friskJetpackOff: {
    down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const friskWaterJetpack: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const friskWaterJetpackOff: {
    down: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const mettaton1: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const mettaton2: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const mettaton3: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const rgdragon: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const rgrabbit: {
    down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    left: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    up: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
};
export declare const mettaton1C: {
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
export declare const mettaton2C: {
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
export declare const mettaton3C: {
    talk: {
        down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    };
    walk: {
        down: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        left: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        right: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
        up: CosmosAnimation<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
    };
};
export declare const states: {
    rooms: Partial<CosmosKeyed<CosmosKeyed<any>>>;
    scripts: Partial<CosmosKeyed<CosmosKeyed<any>>>;
};
export declare const puzzle1target = 7;
export declare const puzzle2target: CosmosPointLinked;
export declare let flowersampler: CosmosColor[][];
export declare function operaShow(lizard: CosmosCharacter): Promise<void>;
export declare function rampup(): void;
export declare function elevate(): Promise<void>;
export declare function lizard(pos: CosmosPointSimple, face: CosmosDirection, { barrier, interact, script, args }?: {
    barrier?: boolean | undefined;
    interact?: boolean | undefined;
    script?: string | undefined;
    args?: string[] | undefined;
}): CosmosCharacter<import("../engine/renderer").CosmosBaseEvents, import("../engine/renderer").CosmosMetadata>;
export declare function calcBadLizard(): 0 | 1 | 3 | 2;
export declare function partyShift({ x, y }: {
    x?: number | undefined;
    y?: number | undefined;
}): void;
export declare function barricadeFail1(): Promise<void>;
export declare const spire: CosmosSprite<import("../engine/renderer").CosmosBaseEvents, {
    min: number;
    max: number;
}>;
export declare const area: {
    tick(): void;
    scripts: Partial<CosmosKeyed<(roomState: any, scriptState: any, ...args: string[]) => any>>;
    tickers: {
        a_lookout?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_auditorium?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_hub1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_elevator4?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_aftershow?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_path4?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_puzzle1?: ((roomState: Partial<{
            offset: number;
            check: boolean;
            crash: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_split?: ((roomState: Partial<{
            active: boolean;
            napsta: CosmosCharacter;
        }>, ...args: string[]) => any) | undefined;
        a_rg2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_hub5?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_exit1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_core_suspense?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_core_main?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_core_checkpoint?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_bridge?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_citadelevator?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_core_entry2?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_entry1?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_battle?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_exit2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_core_left2?: ((roomState: Partial<{
            active: boolean;
            active_puzzle: boolean;
            switches: number[];
            solved: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_left3?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_left1?: ((roomState: Partial<{
            active: boolean;
            active_puzzle: boolean;
            switches: number[];
            solved: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_right1?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_right2?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_core_right3?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_lift?: ((roomState: Partial<{
            location: 'a_start' | 'a_elevator1' | 'a_elevator2' | 'a_elevator3' | 'a_elevator4' | 'a_elevator5' | 'a_hub5' | 'a_core_entry1' | 'a_core_exit2' | 'e_elevator';
            elevating: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_mettaton1?: ((roomState: Partial<{
            active: boolean;
            ingredient1: number;
            ingredient2: number;
            ingredient3: number;
            danger: boolean;
            metta: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_sans?: ((roomState: Partial<{
            toppler: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_offshoot1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_plaza?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_dining?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_hub2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_hub3?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_hub4?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_sleeping1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_lab_virt?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_lab_main?: ((roomState: Partial<{
            cutscene: boolean;
            monitor: boolean;
            monitorObject: CosmosObject;
            subcontainer: Container;
            alph: CosmosCharacter;
        }>, ...args: string[]) => any) | undefined;
        a_start?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_lab_entry?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_lab_upstairs?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_lab_downstairs?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_path1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_elevator1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_elevator2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_elevator3?: ((roomState: Partial<{
            active: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_elevator5?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_puzzle2?: ((roomState: Partial<{
            offset: number;
            check: boolean;
            crash: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_offshoot2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_prepuzzle?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_path2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_path3?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_rg1?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_barricade1?: ((roomState: Partial<{
            trig1: boolean;
            trig2: boolean;
            trig3: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_pacing?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_mettaton2?: ((roomState: Partial<{
            active: boolean;
            killswitch: boolean;
            climber: boolean;
        }>, ...args: string[]) => any) | undefined;
        a_barricade2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_sleeping2?: ((roomState: {}, ...args: string[]) => any) | undefined;
        a_sleeping3?: ((roomState: {}, ...args: string[]) => any) | undefined;
    };
    teleports: {
        a_lookout?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_auditorium?: ((roomState: {}, from: string) => any) | undefined;
        a_hub1?: ((roomState: {}, from: string) => any) | undefined;
        a_elevator4?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_aftershow?: ((roomState: {}, from: string) => any) | undefined;
        a_path4?: ((roomState: {}, from: string) => any) | undefined;
        a_puzzle1?: ((roomState: Partial<{
            offset: number;
            check: boolean;
            crash: boolean;
        }>, from: string) => any) | undefined;
        a_split?: ((roomState: Partial<{
            active: boolean;
            napsta: CosmosCharacter;
        }>, from: string) => any) | undefined;
        a_rg2?: ((roomState: {}, from: string) => any) | undefined;
        a_hub5?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_exit1?: ((roomState: {}, from: string) => any) | undefined;
        a_core_suspense?: ((roomState: {}, from: string) => any) | undefined;
        a_core_main?: ((roomState: {}, from: string) => any) | undefined;
        a_core_checkpoint?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_bridge?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_citadelevator?: ((roomState: {}, from: string) => any) | undefined;
        a_core_entry2?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_entry1?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_battle?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_exit2?: ((roomState: {}, from: string) => any) | undefined;
        a_core_left2?: ((roomState: Partial<{
            active: boolean;
            active_puzzle: boolean;
            switches: number[];
            solved: boolean;
        }>, from: string) => any) | undefined;
        a_core_left3?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_left1?: ((roomState: Partial<{
            active: boolean;
            active_puzzle: boolean;
            switches: number[];
            solved: boolean;
        }>, from: string) => any) | undefined;
        a_core_right1?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_right2?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_core_right3?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_lift?: ((roomState: Partial<{
            location: 'a_start' | 'a_elevator1' | 'a_elevator2' | 'a_elevator3' | 'a_elevator4' | 'a_elevator5' | 'a_hub5' | 'a_core_entry1' | 'a_core_exit2' | 'e_elevator';
            elevating: boolean;
        }>, from: string) => any) | undefined;
        a_mettaton1?: ((roomState: Partial<{
            active: boolean;
            ingredient1: number;
            ingredient2: number;
            ingredient3: number;
            danger: boolean;
            metta: boolean;
        }>, from: string) => any) | undefined;
        a_sans?: ((roomState: Partial<{
            toppler: boolean;
        }>, from: string) => any) | undefined;
        a_offshoot1?: ((roomState: {}, from: string) => any) | undefined;
        a_plaza?: ((roomState: {}, from: string) => any) | undefined;
        a_dining?: ((roomState: {}, from: string) => any) | undefined;
        a_hub2?: ((roomState: {}, from: string) => any) | undefined;
        a_hub3?: ((roomState: {}, from: string) => any) | undefined;
        a_hub4?: ((roomState: {}, from: string) => any) | undefined;
        a_sleeping1?: ((roomState: {}, from: string) => any) | undefined;
        a_lab_virt?: ((roomState: {}, from: string) => any) | undefined;
        a_lab_main?: ((roomState: Partial<{
            cutscene: boolean;
            monitor: boolean;
            monitorObject: CosmosObject;
            subcontainer: Container;
            alph: CosmosCharacter;
        }>, from: string) => any) | undefined;
        a_start?: ((roomState: {}, from: string) => any) | undefined;
        a_lab_entry?: ((roomState: {}, from: string) => any) | undefined;
        a_lab_upstairs?: ((roomState: {}, from: string) => any) | undefined;
        a_lab_downstairs?: ((roomState: {}, from: string) => any) | undefined;
        a_path1?: ((roomState: {}, from: string) => any) | undefined;
        a_elevator1?: ((roomState: {}, from: string) => any) | undefined;
        a_elevator2?: ((roomState: {}, from: string) => any) | undefined;
        a_elevator3?: ((roomState: Partial<{
            active: boolean;
        }>, from: string) => any) | undefined;
        a_elevator5?: ((roomState: {}, from: string) => any) | undefined;
        a_puzzle2?: ((roomState: Partial<{
            offset: number;
            check: boolean;
            crash: boolean;
        }>, from: string) => any) | undefined;
        a_offshoot2?: ((roomState: {}, from: string) => any) | undefined;
        a_prepuzzle?: ((roomState: {}, from: string) => any) | undefined;
        a_path2?: ((roomState: {}, from: string) => any) | undefined;
        a_path3?: ((roomState: {}, from: string) => any) | undefined;
        a_rg1?: ((roomState: {}, from: string) => any) | undefined;
        a_barricade1?: ((roomState: Partial<{
            trig1: boolean;
            trig2: boolean;
            trig3: boolean;
        }>, from: string) => any) | undefined;
        a_pacing?: ((roomState: {}, from: string) => any) | undefined;
        a_mettaton2?: ((roomState: Partial<{
            active: boolean;
            killswitch: boolean;
            climber: boolean;
        }>, from: string) => any) | undefined;
        a_barricade2?: ((roomState: {}, from: string) => any) | undefined;
        a_sleeping2?: ((roomState: {}, from: string) => any) | undefined;
        a_sleeping3?: ((roomState: {}, from: string) => any) | undefined;
    };
};
export declare const script: (subscript: string, ...args: string[]) => Promise<any>;
export declare const shops: {
    bpants: OutertaleShop;
    gossip: OutertaleShop;
};
