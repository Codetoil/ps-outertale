import { OutertaleGroup } from '../classes';
import { CosmosUtils } from '../engine/utils';

const groups = {
   placeholder: new OutertaleGroup()
};

export default groups;

CosmosUtils.status(`LOAD MODULE: CITADEL GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
