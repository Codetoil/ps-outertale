import imCitadel$info from '../../assets/images/maps/citadel.json?url';
import c_alley from '../../assets/rooms/c_alley.json';
import c_asgore_asgore from '../../assets/rooms/c_asgore_asgore.json';
import c_asgore_asriel from '../../assets/rooms/c_asgore_asriel.json';
import c_asgore_front from '../../assets/rooms/c_asgore_front.json';
import c_asgore_hallway from '../../assets/rooms/c_asgore_hallway.json';
import c_asgore_kitchen from '../../assets/rooms/c_asgore_kitchen.json';
import c_asgore_living from '../../assets/rooms/c_asgore_living.json';
import c_barrier from '../../assets/rooms/c_barrier.json';
import c_courtroom from '../../assets/rooms/c_courtroom.json';
import c_courtyard from '../../assets/rooms/c_courtyard.json';
import c_elevator1 from '../../assets/rooms/c_elevator1.json';
import c_elevator2 from '../../assets/rooms/c_elevator2.json';
import c_exit from '../../assets/rooms/c_exit.json';
import c_pacing from '../../assets/rooms/c_pacing.json';
import c_road1 from '../../assets/rooms/c_road1.json';
import c_road2 from '../../assets/rooms/c_road2.json';
import c_start from '../../assets/rooms/c_start.json';
import c_story from '../../assets/rooms/c_story.json';

import { OutertaleMap } from '../classes';
import content from '../content';
import { CosmosUtils } from '../engine/utils';
import { easyRoom, saver } from '../mantle';
import text from './text';

export const sources = {
   c_start,
   c_road1,
   c_elevator1,
   c_pacing,
   c_courtyard,
   c_alley,
   c_story,
   c_elevator2,
   c_courtroom,
   c_road2,
   c_barrier,
   c_exit,
   c_asgore_front,
   c_asgore_living,
   c_asgore_kitchen,
   c_asgore_hallway,
   c_asgore_asriel,
   c_asgore_asgore
};

export const citadelMap = new OutertaleMap(imCitadel$info, content.imCitadel);

saver.locations.register(text.s_save);

for (const [ key, value ] of Object.entries(sources)) {
   easyRoom(key, citadelMap, value);
}

CosmosUtils.status(`LOAD MODULE: CITADEL BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
