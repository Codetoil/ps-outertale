import { Graphics, Texture } from 'pixi.js';
import {
   CosmosBaseEvents,
   CosmosHitbox,
   CosmosMetadata,
   CosmosObject,
   CosmosObjectProperties
} from './engine/renderer';
import { CosmosDaemon } from './engine/audio';
import { CosmosArea, CosmosPoint, CosmosPointSimple, CosmosValue } from './engine/numerics';
import { CosmosAnimation, CosmosAnimationInfo, CosmosAnimationResources, CosmosImage, CosmosSprite, CosmosSpriteProperties } from './engine/image';
import { CosmosRectangle } from './engine/shapes';
import { CosmosBasic, CosmosDirection, CosmosKeyed, CosmosProvider, CosmosUtils } from './engine/utils';
import { CosmosAsset, CosmosInventory } from './engine/core';

export type OutertaleArmor = { invulnerability: number };

export type OutertaleChildAnimationDecorator = {
   anchor?: Partial<CosmosPointSimple>;
   auto?: boolean;
   position?: Partial<CosmosPointSimple>;
   rotation?: number;
   filters?: string[];
   frames?: undefined;
   resources?: string;
   steps?: undefined;
   type: string;
};

export type OutertaleChildBarrierDecorator = {
   anchor?: Partial<CosmosPointSimple>;
   position?: Partial<CosmosPointSimple>;
   rotation?: number;
   size?: Partial<CosmosPointSimple>;
};

export type OutertaleChildObject =
   | CosmosSprite<CosmosBaseEvents, { class: 'attachment'; decorator: OutertaleSpriteDecorator }>
   | CosmosAnimation<CosmosBaseEvents, { class: 'attachment'; decorator: OutertaleChildAnimationDecorator }>
   | CosmosHitbox<
        CosmosBaseEvents,
        | { class: 'barrier'; decorator: OutertaleChildBarrierDecorator }
        | {
             args: string[];
             class: 'interact' | 'trigger';
             decorator: OutertaleChildScriptDecorator;
             name: string;
          }
     >;

export type OutertaleChildScriptDecorator = {
   anchor?: Partial<CosmosPointSimple>;
   args?: string[];
   name?: string;
   position?: Partial<CosmosPointSimple>;
   rotation?: number;
   size?: Partial<CosmosPointSimple>;
};

export type OutertaleChoice =
   | { type: 'fight'; score: number }
   | { type: 'act'; act: string }
   | { type: 'item'; item: string }
   | { type: 'fake' | 'spare' | 'flee' | 'assist' }
   | { type: 'none' };

export type OutertaleEditorContainer = {
   box: CosmosRectangle;
   children: { box: CosmosRectangle; object: OutertaleChildObject; parent: OutertaleEditorContainer }[];
   object: OutertaleParentObject;
};

export type OutertaleLayerKey = 'base' | 'below' | 'main' | 'above' | 'menu';

export type OutertaleSpriteDecorator = {
   anchor?: Partial<CosmosPointSimple>;
   auto?: boolean;
   position?: Partial<CosmosPointSimple>;
   rotation?: number;
   filters?: string[];
   frames?: string[];
   resources?: undefined;
   steps?: number;
   type: string;
};

export type OutertaleParentObject = CosmosObject<
   CosmosBaseEvents,
   { class: 'object'; decorator: OutertaleParentObjectDecorator; tags: string[] }
> & {
   objects: OutertaleChildObject[];
};

export type OutertaleParentObjectDecorator = {
   attachments?: (OutertaleChildAnimationDecorator | OutertaleSpriteDecorator)[];
   barriers?: OutertaleChildBarrierDecorator[];
   filters?: string[];
   interacts?: OutertaleChildScriptDecorator[];
   position?: Partial<CosmosPointSimple>;
   rotation?: number;
   tags?: string[];
   triggers?: OutertaleChildScriptDecorator[];
};

export type OutertaleRoomDecorator = {
   background?: string;
   face?: string;
   layers?: Partial<CosmosKeyed<OutertaleParentObjectDecorator[], string>>;
   mixins?: Partial<CosmosKeyed<string, string>>;
   metadata?: CosmosKeyed<CosmosBasic>;
   neighbors?: string[];
   preload?: string[];
   region?: CosmosPointSimple[];
   score?: { filter?: number; gain?: number; music?: string | null; rate?: number; reverb?: number };
   spawn?: CosmosPointSimple;
};

export type OutertaleTurnState<A> = {
   choice: OutertaleChoice;
   target: number;
   volatile: OutertaleVolatile;
   talk: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>;
   status: CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>;
   hurt: boolean;
   dead: boolean;
   pacify: boolean;
   opponent: OutertaleOpponent;
   vars: { '': { reward: boolean; hp: number } } & A;
   dialogue: (cutscene: boolean, ...lines: string[]) => Promise<void>;
};

export type OutertaleVolatile = {
   alive: boolean;
   container: CosmosObject & { objects: CosmosSprite[] };
   dead: boolean;
   flirted: boolean;
   opponent: OutertaleOpponent;
   hp: number;
   sparable: boolean;
   vars: CosmosKeyed;
};

export type OutertaleWeapon = {
   arc: boolean;
   targets: number;
   mode: 'simple' | 'volley' | 'multiple';
   speed: number;
   crit: number;
   off?: number;
};

export class OutertaleBox extends CosmosObject {
   graphics1 = new Graphics();
   graphics2 = new Graphics();
   size = new CosmosPoint();
   draw () {
      const half = this.size.divide(2);
      this.graphics1.clear().beginFill(0, 1).drawRect(-half.x, -half.y, this.size.x, this.size.y).endFill();
      this.graphics2
         .clear()
         .lineStyle({ color: 16777215, width: 2.5 })
         .drawRect(-half.x - 1.25, -half.y - 1.25, this.size.x + 2.5, this.size.y + 2.5)
         .endFill();
   }
   constructor (properties: CosmosObjectProperties = {}) {
      super(properties);
      this.container.addChildAt(this.graphics1, 0);
      this.container.addChildAt(this.graphics2, 1);
   }
}

export class OutertaleBypassAnimation extends CosmosAnimation {
   enable () {
      return this;
   }
   actuallyEnable () {
      return super.enable();
   }
   disable () {
      return this;
   }
   actuallyDisable () {
      return super.disable();
   }
   reset () {
      return this;
   }
   actuallyReset () {
      return super.reset();
   }
}

export interface OutertaleGroupProperties {
   assets?: CosmosInventory;
   flee?: boolean;
   grid?: CosmosImage | null;
   init?: () => boolean;
   handler?: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
   music?: CosmosDaemon | null;
   opponents?: [OutertaleOpponent, CosmosPointSimple][];
   status?: string[];
}

export class OutertaleGroup {
   assets: CosmosInventory;
   flee: boolean;
   grid: CosmosImage | null;
   init: () => boolean;
   handler: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
   music: CosmosDaemon | null;
   opponents: [OutertaleOpponent, CosmosPointSimple][];
   status: string[];
   constructor ({
      assets = new CosmosInventory(),
      init = () => true,
      flee = true,
      grid = null,
      handler = null,
      music = null,
      opponents = [],
      status = []
   }: OutertaleGroupProperties = {}) {
      this.assets = assets;
      this.flee = flee;
      this.grid = grid;
      this.init = init;
      this.handler = handler;
      this.music = music;
      this.opponents = opponents;
      this.status = status;
   }
}

export class OutertaleInventory {
   capacity: number;
   keygen: (index: number) => string;
   store: CosmosKeyed<string>;
   get contents () {
      return CosmosUtils.populate(this.size, index => this.store[this.keygen(index)]);
   }
   get size () {
      let index = 0;
      while (this.store[this.keygen(index)]) {
         index++;
      }
      return index;
   }
   constructor (capacity: number, store: CosmosKeyed<string>, keygen: (index: number) => string) {
      this.capacity = capacity;
      this.keygen = keygen;
      this.store = store;
   }
   add (item: string) {
      const size = this.size;
      if (size < this.capacity) {
         this.store[this.keygen(size)] = item;
         return true;
      } else {
         return false;
      }
   }
   count (item: string) {
      let index = 0;
      let value = 0;
      let match: string;
      while ((match = this.store[this.keygen(index++)])) {
         if (match === item) {
            value++;
         }
      }
      return value;
   }
   has (item: string) {
      let index = 0;
      let match: string;
      while ((match = this.store[this.keygen(index++)])) {
         if (match === item) {
            return true;
         }
      }
      return false;
   }
   remove (target: number | string) {
      if (typeof target === 'number') {
         const size = this.size;
         if (target < size) {
            while (target < size) {
               const next = this.store[this.keygen(target + 1)];
               if (next) {
                  this.store[this.keygen(target++)] = next;
               } else {
                  delete this.store[this.keygen(target)];
                  break;
               }
            }
            return true;
         } else {
            return false;
         }
      } else {
         let index = 0;
         let match: string;
         while ((match = this.store[this.keygen(index)])) {
            if (match === target) {
               void this.remove(index);
               return true;
            } else {
               index++;
            }
         }
         return false;
      }
   }
   of (index: number) {
      if (index < this.size) {
         return this.store[this.keygen(index)];
      } else {
         return null;
      }
   }
   set (index: number, value: string) {
      this.store[this.keygen(index)] = value;
   }
}

export class OutertaleMap extends CosmosAsset<CosmosKeyed<{ area: CosmosArea; offset: CosmosPointSimple }>> {
   image: CosmosImage;
   constructor (source: string, image: CosmosImage) {
      super(source);
      this.image = image;
   }
   async loader () {
      const [ data ] = await Promise.all([
         CosmosUtils.import<CosmosAnimationInfo>(this.source),
         this.image.load(this as any)
      ]);
      return Object.fromEntries(
         data.meta.frameTags.map(frameTag => {
            const { frame, spriteSourceSize } = data.frames[frameTag.from];
            return [
               frameTag.name,
               { area: { x: frame.x, y: frame.y, width: frame.w, height: frame.h }, offset: spriteSourceSize }
            ];
         })
      );
   }
   unloader () {
      this.image.unload(this);
   }
}

export class OutertaleMultivisualObject extends CosmosObject {
   sprite: CosmosSprite;
   animation: CosmosAnimation;
   constructor (properties: CosmosObjectProperties = {}, subproperties: CosmosSpriteProperties = {}) {
      super(properties);
      this.sprite = new CosmosSprite(subproperties);
      this.animation = new CosmosAnimation(subproperties);
   }
   use (asset: CosmosImage | CosmosAnimationResources) {
      if (asset.value instanceof Texture) {
         this.sprite.frames = [ asset as CosmosImage ];
         this.objects = [ this.sprite ];
      } else {
         this.animation.use(asset as CosmosAnimationResources);
         this.objects = [ this.animation ];
      }
   }
}
export interface OutertaleOpponentProperties {
   acts?: CosmosProvider<
      (
         | [string, CosmosProvider<string[], [OutertaleVolatile]>]
         | [string, CosmosProvider<string[], [OutertaleVolatile]>, CosmosProvider<string, [OutertaleVolatile]>]
      )[]
   >;
   assets?: CosmosInventory;
   bully?: () => void;
   bullyable?: boolean;
   df?: number;
   dramatic?: boolean;
   exp?: number;
   flirted?: () => boolean;
   g?: number;
   ghost?: boolean;
   goodbye?: ((volatile: OutertaleVolatile) => CosmosSprite) | null;
   handler?: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
   hp?: number;
   hurt?: CosmosDaemon | null;
   metadata?: CosmosMetadata;
   name?: CosmosProvider<string>;
   sparable?: boolean;
   sprite?: (volatile: OutertaleVolatile) => CosmosSprite;
}

export class OutertaleOpponent {
   acts: CosmosProvider<
      (
         | [string, CosmosProvider<string[], [OutertaleVolatile]>]
         | [string, CosmosProvider<string[], [OutertaleVolatile]>, CosmosProvider<string, [OutertaleVolatile]>]
      )[]
   >;
   assets: CosmosInventory;
   bully: () => void;
   bullyable: boolean;
   df: number;
   dramatic: boolean;
   exp: number;
   flirted: () => boolean;
   g: number;
   ghost: boolean;
   goodbye: ((volatile: OutertaleVolatile) => CosmosSprite) | null;
   handler: ((choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void> | void) | null;
   hp: number;
   hurt: CosmosDaemon | null;
   metadata: CosmosMetadata;
   name: CosmosProvider<string>;
   sparable: boolean;
   sprite: (volatile: OutertaleVolatile) => CosmosSprite;
   constructor ({
      acts = [],
      assets = new CosmosInventory(),
      bully = () => {},
      bullyable = false,
      df = 0,
      dramatic = false,
      flirted = () => false,
      exp = 0,
      g = 0,
      ghost = false,
      goodbye = null,
      handler = null,
      hp = 0,
      hurt = null,
      name = '',
      metadata = {},
      sparable = false,
      sprite = () => new CosmosSprite()
   }: OutertaleOpponentProperties = {}) {
      this.acts = acts;
      this.assets = assets;
      this.bully = bully;
      this.bullyable = bullyable;
      this.df = df;
      this.dramatic = dramatic;
      this.exp = exp;
      this.flirted = flirted;
      this.g = g;
      this.ghost = ghost;
      this.goodbye = goodbye;
      this.handler = handler;
      this.hp = hp;
      this.hurt = hurt;
      this.metadata = metadata;
      this.name = name;
      this.sparable = sparable;
      this.sprite = sprite;
   }
}

export interface OutertaleRoomProperties {
   decorator?: OutertaleRoomDecorator | null;
   face?: CosmosDirection;
   layers?: Partial<CosmosKeyed<CosmosObject[], OutertaleLayerKey>>;
   metadata?: CosmosKeyed<CosmosBasic>;
   neighbors?: string[];
   preload?: CosmosInventory;
   region?: [Partial<CosmosPointSimple>, Partial<CosmosPointSimple>] | [];
   score?: {
      filter?: number;
      gain?: number;
      music?: string | null;
      rate?: number;
      reverb?: number;
   };
   spawn?: Partial<CosmosPointSimple>;
}

export class OutertaleRoom {
   decorator: OutertaleRoomDecorator | null;
   face: CosmosDirection;
   layers: Partial<CosmosKeyed<CosmosObject[], OutertaleLayerKey>>;
   metadata: CosmosKeyed<CosmosBasic>;
   neighbors: string[];
   preload: CosmosInventory;
   region: [Partial<CosmosPointSimple>, Partial<CosmosPointSimple>] | [];
   score: { filter: number; gain: number; music: string | null; rate: number; reverb: number };
   spawn: Partial<CosmosPointSimple>;
   constructor ({
      decorator = null,
      face = 'down',
      layers = {},
      metadata = {},
      neighbors = [],
      preload = new CosmosInventory(),
      region = [],
      score: { filter = 0, gain = 1, music = null, rate = 1, reverb = 0 } = {},
      spawn = {}
   }: OutertaleRoomProperties = {}) {
      this.decorator = decorator;
      this.face = face;
      this.layers = layers;
      this.metadata = metadata;
      this.neighbors = neighbors;
      this.preload = preload;
      this.region = region;
      this.score = { filter, gain, music, rate, reverb };
      this.spawn = spawn;
   }
}

export interface OutertaleShopProperties {
   background?: CosmosSprite;
   handler?: () => Promise<void> | void;
   keeper?: CosmosSprite;
   music?: CosmosDaemon | null;
   options?: CosmosProvider<string[]>;
   persist?: boolean;
   preset?: (...indices: number[]) => void;
   price?: CosmosProvider<number>;
   prompt?: CosmosProvider<string>;
   purchase?: (buy: boolean) => void | boolean;
   size?: CosmosProvider<number>;
   status?: CosmosProvider<string>;
   tooltip?: CosmosProvider<string | null>;
   vars?: CosmosKeyed<CosmosBasic>;
}

export class OutertaleShop {
   background: CosmosSprite;
   handler: () => Promise<void> | void;
   keeper: CosmosSprite;
   music: CosmosDaemon | null;
   options: CosmosProvider<string[]>;
   persist: boolean;
   preset: (...indices: number[]) => void;
   price: CosmosProvider<number>;
   prompt: CosmosProvider<string>;
   purchase: (buy: boolean) => void | boolean;
   size: CosmosProvider<number>;
   status: CosmosProvider<string>;
   tooltip: CosmosProvider<string | null>;
   vars: CosmosKeyed<CosmosBasic>;
   constructor ({
      background = new CosmosSprite(),
      handler = () => {},
      keeper = new CosmosSprite(),
      music = null,
      options = [],
      persist = false,
      preset = () => {},
      price = 0,
      prompt = '',
      purchase = () => {},
      size = 0,
      status = '',
      tooltip = null,
      vars = {}
   }: OutertaleShopProperties = {}) {
      this.background = background;
      this.handler = handler;
      this.keeper = keeper;
      this.music = music;
      this.options = options;
      this.persist = persist;
      this.preset = preset;
      this.price = price;
      this.prompt = prompt;
      this.purchase = purchase;
      this.size = size;
      this.status = status;
      this.tooltip = tooltip;
      this.vars = vars;
   }
}

export interface OutertaleSpeechPresetProperties {
   faces?: (CosmosSprite | null)[];
   interval?: number;
   voices?: (CosmosDaemon[] | null)[];
   font1?: string;
   font2?: string;
   threshold?: number;
}

export class OutertaleSpeechPreset {
   faces: (CosmosSprite | null)[];
   interval: number;
   voices: (CosmosDaemon[] | null)[];
   font1: string;
   font2: string;
   threshold: number;
   constructor ({
      faces = [],
      interval = 50,
      voices = [],
      font1 = '16px DeterminationMono',
      font2 = '10px DotumChe',
      threshold = 0
   }: OutertaleSpeechPresetProperties = {}) {
      this.faces = faces;
      this.interval = interval;
      this.voices = voices;
      this.font1 = font1;
      this.font2 = font2;
      this.threshold = threshold;
   }
}

export class OutertaleStat extends CosmosValue {
   modifiers: ['add' | 'multiply', number, number][] = [];
   compute () {
      let v = this.value;
      for (const mod of this.modifiers) {
         if (mod[0] === 'add') {
            v += mod[1];
         } else {
            v *= mod[1];
         }
      }
      return v;
   }
   elapse () {
      for (const mod of this.modifiers.slice()) {
         --mod[2] <= 0 && this.modifiers.splice(this.modifiers.indexOf(mod), 1);
      }
   }
}

CosmosUtils.status(`LOAD MODULE: CLASSES (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
