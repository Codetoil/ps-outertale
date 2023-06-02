import { CosmosAsset, CosmosCache, CosmosTimer } from './core';
import { CosmosMath, CosmosValue, CosmosValueLinked } from './numerics';

export type CosmosDaemonRouter = (input: GainNode, output: AudioContext) => void;

export class CosmosAudio extends CosmosAsset<AudioBuffer> {
   private static $audio = { context: null as AudioContext | null };
   static cache = new CosmosCache((key: string) =>
      fetch(key).then(value => value.arrayBuffer().then(value => CosmosAudio.context.decodeAudioData(value)))
   );
   static get context () {
      return (this.$audio.context ??= new AudioContext());
   }
   static utils = {
      convolver (context: AudioContext, duration: number, ...pattern: number[]) {
         const convolver = context.createConvolver();
         convolver.buffer = CosmosAudio.utils.impulse(context, duration, ...pattern);
         return convolver;
      },
      delay (context: AudioContext, offset: number, feedback: number, echoes = Infinity) {
         const gain = context.createGain();
         gain.gain.value = feedback;
         const delay = context.createDelay(Math.min(offset * echoes, 60));
         delay.delayTime.value = offset;
         gain.connect(delay);
         delay.connect(gain);
         return gain;
      },
      filter (context: AudioContext, type: BiquadFilterType, frequency: number) {
         const filter = context.createBiquadFilter();
         filter.type = type;
         filter.frequency.value = frequency;
         return filter;
      },
      impulse (context: AudioContext, duration: number, ...pattern: number[]) {
         const size = context.sampleRate * duration;
         const buffer = context.createBuffer(2, size, context.sampleRate);
         let channel = 0;
         while (channel < buffer.numberOfChannels) {
            let index = 0;
            const data = buffer.getChannelData(channel++);
            while (index < size) {
               data[index] = (Math.random() * 2 - 1) * CosmosMath.bezier(index / size, ...pattern);
               data[index] = (Math.random() * 2 - 1) * CosmosMath.bezier(index / size, ...pattern);
               index++;
            }
         }
         return buffer;
      }
   };
   async loader () {
      return await CosmosAudio.cache.of(this.source);
   }
   unloader () {
      CosmosAudio.cache.delete(this.source);
   }
}

export interface CosmosInstance {
   daemon: CosmosDaemon;
   loop: boolean;
   gain: CosmosValueLinked;
   readonly position: number;
   rate: CosmosValueLinked;
   source: AudioBufferSourceNode;
   stop(): void;
}

export interface CosmosDaemonProperties {
   context?: AudioContext;
   gain?: number;
   loop?: boolean;
   rate?: number;
   router?: CosmosDaemonRouter;
}

export class CosmosDaemon {
   audio: CosmosAudio;
   context: AudioContext;
   gain: number;
   readonly instances = [] as CosmosInstance[];
   loop: boolean;
   rate: number;
   router: CosmosDaemonRouter;
   constructor (
      audio: CosmosAudio,
      {
         context = new AudioContext(),
         gain = 1,
         loop = false,
         rate = 1,
         router = (input: GainNode, output: AudioContext) => void input.connect(output.destination)
      }: CosmosDaemonProperties = {}
   ) {
      this.audio = audio;
      this.context = context;
      this.gain = gain;
      this.loop = loop;
      this.rate = rate;
      this.router = router;
   }
   instance (timer: CosmosTimer, { offset = 0, store = false } = {}) {
      const gain = this.context.createGain();
      gain.gain.value = this.gain;
      this.router(gain, this.context);
      const source = this.context.createBufferSource();
      source.buffer = this.audio.value;
      source.loop = this.loop;
      source.connect(gain);
      let pos = 0;
      let rate = this.rate;
      const listener = (delta = timer.speed.value) => {
         pos += delta;
         source.playbackRate.value = rate * timer.speed.value;
      };
      listener(0);
      const instance: CosmosInstance = {
         daemon: this,
         gain: new CosmosValueLinked(gain.gain),
         get loop () {
            return source.loop;
         },
         set loop (value) {
            source.loop = value;
         },
         get position () {
            return source.buffer ? (pos / 1000) % source.buffer.duration : 0;
         },
         rate: new CosmosValueLinked({
            get value () {
               return rate;
            },
            set value (value) {
               rate = value;
               listener(0);
            }
         }),
         source,
         stop: () => {
            timer.off('tick', listener);
            if (source.buffer) {
               store && this.instances.splice(this.instances.indexOf(instance), 1);
               source.stop();
               source.disconnect(gain);
               gain.disconnect();
               source.buffer = null;
            }
         }
      };
      timer.on('tick', listener);
      store && this.instances.push(instance);
      if (source.buffer) {
         source.addEventListener('ended', () => instance.stop());
         source.start(0, offset);
      }
      return instance;
   }
}

export class CosmosEffect extends CosmosValue {
   context: AudioContext;
   input: AudioNode;
   output: GainNode;
   throughput: GainNode;
   get value () {
      return this.output.gain.value;
   }
   set value (value) {
      this.output.gain.value = value;
      this.throughput.gain.value = 1 - value;
   }
   constructor (context: AudioContext, node: AudioNode, value: number) {
      super();
      this.context = context;
      this.input = node;
      this.output = context.createGain();
      this.throughput = context.createGain();
      this.input.connect(this.output);
      this.value = value;
   }
   connect (target: CosmosEffect | AudioNode | AudioContext) {
      if (target instanceof AudioContext) {
         this.output.connect(target.destination);
         this.throughput.connect(target.destination);
      } else if (target instanceof AudioNode) {
         this.output.connect(target);
         this.throughput.connect(target);
      } else {
         this.output.connect(target.input);
         this.throughput.connect(target.throughput);
      }
   }
   disconnect (target?: CosmosEffect | AudioNode | AudioContext) {
      if (target instanceof AudioContext) {
         this.output.disconnect(target.destination);
         this.throughput.disconnect(target.destination);
      } else if (target instanceof AudioNode) {
         this.output.disconnect(target);
         this.throughput.disconnect(target);
      } else if (target) {
         this.output.disconnect(target.input);
         this.throughput.disconnect(target.throughput);
      } else {
         this.output.disconnect();
      }
   }
}

export class CosmosMixer extends CosmosValue {
   private $mixer = {
      effects: new Proxy([] as CosmosEffect[], {
         set: (target, key: `${number}`, value) => {
            const index = +key;
            if (Number.isInteger(index) && index > -1 && index < this.effects.length + 1) {
               this.update(index, value);
            }
            target[key] = value;
            return true;
         },
         deleteProperty: (target, key: `${number}`) => {
            const index = +key;
            if (Number.isInteger(index) && index > -1 && index < this.effects.length + 1) {
               this.update(index);
            }
            delete target[key];
            return true;
         }
      })
   };
   context: AudioContext;
   input: GainNode;
   output: GainNode;
   get effects () {
      return this.$mixer.effects;
   }
   set effects (value) {
      this.$mixer.effects.splice(0, this.$mixer.effects.length);
      this.$mixer.effects.push(...value);
   }
   get value () {
      return this.output.gain.value;
   }
   set value (value) {
      this.output.gain.value = value;
   }
   constructor (context: AudioContext, effects: CosmosEffect[] = []) {
      super();
      this.context = context;
      this.input = context.createGain();
      this.output = context.createGain();
      this.input.connect(this.output);
      this.effects = effects;
   }
   update (index: number, value?: CosmosEffect) {
      const prevValue = (this.effects[index - 1] ?? this.input) as CosmosEffect | GainNode;
      const currValue = this.effects[index];
      const nextValue = (this.effects[index + 1] ?? this.output) as CosmosEffect | GainNode;
      if (currValue) {
         if (prevValue instanceof CosmosEffect) {
            prevValue.disconnect(currValue);
         } else {
            prevValue.disconnect(currValue.input);
            prevValue.disconnect(currValue.throughput);
         }
         currValue.disconnect(nextValue);
      } else {
         prevValue.disconnect(nextValue);
      }
      if (value) {
         if (prevValue instanceof CosmosEffect) {
            prevValue.connect(value);
         } else {
            prevValue.connect(value.input);
            prevValue.connect(value.throughput);
         }
         value.connect(nextValue);
      } else {
         if (prevValue instanceof CosmosEffect) {
            prevValue.connect(nextValue);
         } else if (nextValue instanceof CosmosEffect) {
            prevValue.connect(nextValue.input);
            prevValue.connect(nextValue.throughput);
         } else {
            prevValue.connect(nextValue);
         }
      }
   }
}
