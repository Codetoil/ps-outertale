import { CosmosTimer } from './core';
import { CosmosSprite } from './image';
import { CosmosPoint, CosmosPointSimple } from './numerics';
import {
   CosmosBaseEvents,
   CosmosHitbox,
   CosmosMetadata,
   CosmosRenderer,
   CosmosSizedObjectProperties,
   CosmosStyle
} from './renderer';
import { CosmosDirection, CosmosNot, CosmosProvider } from './utils';

export type CosmosCharacterPreset = { [x in 'walk' | 'talk']: { [y in CosmosDirection]: CosmosSprite } };

export interface CosmosEntityProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosSizedObjectProperties {
   face?: CosmosDirection;
   metadata?: A;
   sprites?: { [x in CosmosDirection]?: CosmosSprite };
   step?: number;
}

export class CosmosEntity<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosHitbox<A, B> {
   face: CosmosDirection;
   sprites: { [x in CosmosDirection]: CosmosSprite };
   step: number;
   get sprite () {
      return this.sprites[this.face];
   }
   constructor (properties: CosmosEntityProperties<B> = {}) {
      super(properties);
      (({
         face = 'down',
         sprites: {
            down = new CosmosSprite(),
            left = new CosmosSprite(),
            right = new CosmosSprite(),
            up = new CosmosSprite()
         } = {},
         step = 1
      }: CosmosEntityProperties<B> = {}) => {
         this.face = face;
         this.sprites = { down, left, right, up };
         this.step = step;
      })(properties);
   }
   move<B extends string> (
      offset: CosmosPointSimple,
      renderer?: CosmosRenderer<B>,
      key?: B,
      keys: B[] = [],
      filter?: CosmosProvider<boolean, [CosmosHitbox]>
   ) {
      const source = this.position.value();
      const hitboxes = filter && renderer ? keys.flatMap(key => renderer.calculate(key, filter)) : [];
      for (const axis of [ 'x', 'y' ] as ['x', 'y']) {
         const distance = offset[axis];
         if (distance !== 0) {
            this.position[axis] += distance;
            const hits = renderer ? renderer.detect(key, this, ...hitboxes) : [];
            if (hits.length > 0) {
               const single = (distance / Math.abs(distance)) * this.step;
               while (this.position[axis] !== source[axis] && renderer!.detect(key, this, ...hits).length > 0) {
                  this.position[axis] -= single;
               }
            }
         }
      }
      if (this.position.x === source.x && this.position.y === source.y) {
         if (offset.y < 0) {
            this.face = 'up';
         } else if (offset.y > 0) {
            this.face = 'down';
         } else if (offset.x < 0) {
            this.face = 'left';
         } else if (offset.x > 0) {
            this.face = 'right';
         }
         for (const sprite of Object.values(this.sprites)) {
            sprite.reset();
         }
         return false;
      } else {
         if (this.position.y < source.y) {
            this.face = 'up';
         } else if (this.position.y > source.y) {
            this.face = 'down';
         } else if (this.position.x < source.x) {
            this.face = 'left';
         } else if (this.position.x > source.x) {
            this.face = 'right';
         }
         this.sprite.enable();
         return true;
      }
   }
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      this.objects[0] = this.sprite;
      super.tick(camera, scale, style);
   }
   async walk (timer: CosmosTimer, speed: number, ...points: Partial<CosmosPointSimple>[]) {
      const duration = Math.round(15 / speed);
      for (const { x = this.position.x, y = this.position.y } of points) {
         await new Promise<void>(resolve => {
            const ticker = () => {
               const dx = Math.min(Math.max(x - this.x, -speed), speed);
               const dy = Math.min(Math.max(y - this.y, -speed), speed);
               this.move({ x: dx, y: dy });
               this.sprite.duration = duration;
               if (Math.abs(x - this.x) < 0.000001 && Math.abs(y - this.y) < 0.000001) {
                  this.off('tick', ticker);
                  this.move({ x: 0, y: 0 });
                  this.position.set(x, y);
                  resolve();
               }
            };
            this.on('tick', ticker);
         });
      }
   }
}

export type CosmosCharacterProperties<A extends CosmosMetadata = CosmosMetadata> = CosmosNot<
   CosmosEntityProperties<A>,
   'sprites'
> & {
   key: string;
   preset: CosmosCharacterPreset;
};

export class CosmosCharacter<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosEntity<A, B> {
   key: string;
   preset: CosmosCharacterPreset;
   talk = false;
   get sprite () {
      return (this.talk ? this.preset.talk : this.preset.walk)[this.face];
   }
   constructor (properties: CosmosCharacterProperties<B>) {
      super(properties);
      (({ key, preset }: CosmosCharacterProperties<B>) => {
         this.key = key;
         this.preset = preset;
      })(properties);
   }
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      this.sprites = this.talk ? this.preset.talk : this.preset.walk;
      super.tick(camera, scale, style);
   }
}

export interface CosmosPlayerProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosEntityProperties<A> {
   extent?: Partial<CosmosPointSimple> | number;
}

export class CosmosPlayer<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosEntity<A, B> {
   private $player = { face: null as CosmosDirection | null };
   readonly funni = new CosmosHitbox();
   extent = new CosmosPoint();
   puppet = false;
   constructor (properties: CosmosPlayerProperties<B> = {}) {
      super(properties);
      this.extent = new CosmosPoint(properties.extent ?? -1);
   }
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      if (this.face !== this.$player.face) {
         this.$player.face = this.face;
         this.funni.anchor.set(
            this.face === 'left' ? 1 : this.face === 'right' ? -1 : 0,
            this.face === 'up' ? 1 : this.face === 'down' ? -1 : 0
         );
         this.funni.size.set(
            this.face === 'left' || this.face === 'right' ? this.extent.y : this.extent.x,
            this.face === 'down' || this.face === 'up' ? this.extent.y : this.extent.x
         );
      }
      this.objects[1] = this.funni;
      super.tick(camera, scale, style);
   }
   async walk (timer: CosmosTimer, speed: number, ...targets: Partial<CosmosPointSimple>[]) {
      this.puppet = true;
      await super.walk(timer, speed, ...targets);
      this.puppet = false;
   }
}
