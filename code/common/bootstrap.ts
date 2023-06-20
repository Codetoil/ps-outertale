import im_$info from '../../assets/images/maps/_.json?url';
import _ from '../../assets/rooms/_.json';
import _taxi from '../../assets/rooms/_taxi.json';
import _void from '../../assets/rooms/_void.json';

import { standardSound } from '../assets';
import { OutertaleMap, OutertaleSpeechPreset } from '../classes';
import content from '../content';
import { audio, maps, speech } from '../core';
import { CosmosDaemon } from '../engine/audio';
import { CosmosAnimation } from '../engine/image';
import { CosmosMath } from '../engine/numerics';
import { CosmosUtils } from '../engine/utils';
import { battler, easyRoom, portraits } from '../mantle';
import text from './text';

export const _map = new OutertaleMap(im_$info, content.im_);

export const faces = {
   asrielPlain: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlain })
};

export const sources = { _, _taxi, _void };

export const voices = {
   storyteller: [ new CosmosDaemon(content.avStoryteller, standardSound()) ]
};

battler.acts.register(text.b_act);

battler.weapons.register({
   spanner: { arc: false, targets: 1, mode: 'simple', speed: 1, crit: 2 },
   little_dipper: { arc: false, targets: 1, mode: 'simple', speed: 1, crit: 2.2 },
   glove: { arc: false, targets: 1, mode: 'volley', speed: 1, crit: 2.3 },
   boots: { arc: false, targets: 3, mode: 'multiple', speed: 1, crit: 2.5 },
   padd: { arc: false, targets: 4, mode: 'multiple', speed: 1, crit: 2.6 },
   tablaphone: { arc: false, targets: 4, mode: 'multiple', speed: 1, crit: 2.7 },
   laser: { arc: true, targets: 4, mode: 'multiple', speed: 1.25, crit: 2.8, off: 2 }
});

portraits.register(faces);

speech.presets.register({
   _: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: CosmosMath.FRAME,
      voices: [ [ new CosmosDaemon(content.avAsgore, { context: audio.context, router: audio.soundRouter, rate: 5 / 3 }) ] ]
   }),
   event: new OutertaleSpeechPreset({ faces: [ null ], interval: 30, voices: [ null ] }),
   human: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avNarrator, { context: audio.context, gain: 0.92, router: audio.soundRouter }) ]
      ]
   }),
   narrator: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 35,
      voices: [
         [ new CosmosDaemon(content.avNarrator, { context: audio.context, rate: 0.92, router: audio.soundRouter }) ]
      ]
   }),
   monster: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 40,
      voices: [ [ new CosmosDaemon(content.avNarrator, { context: audio.context, rate: 1, router: audio.soundRouter }) ] ]
   }),
   spacefluff432: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 25,
      voices: [ [ new CosmosDaemon(content.avAsriel, { context: audio.context, rate: 0.85, router: audio.soundRouter }) ] ]
   }),
   story: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 30,
      voices: [ voices.storyteller ],
      threshold: 0.019
   })
});

maps.register('_', _map);

for (const [ key, value ] of Object.entries(sources)) {
   easyRoom(key, _map, value);
}

CosmosUtils.status(`LOAD MODULE: COMMON BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
