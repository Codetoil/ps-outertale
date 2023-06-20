import './bootstrap';
import { OutertaleShop } from '../classes';
import { CosmosKeyed } from '../engine/utils';
declare const _default: {
    script: (subscript: string, ...args: string[]) => Promise<any>;
    states: {
        rooms: Partial<CosmosKeyed<CosmosKeyed<any>>>;
        scripts: Partial<CosmosKeyed<CosmosKeyed<any>>>;
    };
    shops: {
        hare: OutertaleShop;
        blook: OutertaleShop;
    };
};
export default _default;
