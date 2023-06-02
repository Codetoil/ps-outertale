import { Application, BLEND_MODES, Container, Filter, Rectangle } from 'pixi.js';
import { CosmosEventHost, CosmosTimer } from './core';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosRay, CosmosRaySimple, CosmosValue } from './numerics';
import { CosmosProvider, CosmosUtils } from './utils';

export type CosmosBaseEvents = { tick: []; render: [] };
export type CosmosMetadata = { [k: string]: any };
export type CosmosRegion = [CosmosPointSimple, CosmosPointSimple];
export type CosmosRendererLayerModifier = 'fixed' | 'vertical';
export type CosmosTransform = [CosmosPoint, number, CosmosPoint];

export interface CosmosAnchoredObjectProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosObjectProperties<A> {
   anchor?: Partial<CosmosPointSimple> | number;
}

export interface CosmosBaseProperties extends Partial<CosmosStyle> {
   alpha?: number;
   area?: Rectangle | null;
   filters?: Filter[] | null;
   position?: Partial<CosmosPointSimple> | number;
   rotation?: number;
   scale?: Partial<CosmosPointSimple> | number;
}

export interface CosmosObjectProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosBaseProperties {
   acceleration?: number;
   gravity?: Partial<CosmosRaySimple> | number;
   metadata?: A;
   offsets?: (Partial<CosmosPointSimple> | number)[];
   objects?: CosmosObject[];
   parallax?: Partial<CosmosPointSimple> | number;
   priority?: number;
   spin?: number;
   velocity?: Partial<CosmosPointSimple> | number;
}

export interface CosmosRendererLayer {
   active: boolean;
   container: Container;
   modifiers: CosmosRendererLayerModifier[];
   objects: CosmosObject[];
}

export interface CosmosSizedObjectProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   size?: Partial<CosmosPointSimple> | number;
}

export interface CosmosStyle {
   blend: BLEND_MODES;
   border: number;
   fill: string;
   font: string;
   stroke: string;
   tint: number;
}

export interface CosmosRendererProperties<A extends string = string> extends CosmosBaseProperties {
   active?: boolean;
   freecam?: boolean;
   layers?: { [x in A]: CosmosRendererLayerModifier[] };
   size?: Partial<CosmosPointSimple> | number;
   shake?: number;
   timer?: CosmosTimer;
   wrapper?: HTMLElement | string | null;
   zoom?: number;
}

export class CosmosBase<A extends CosmosBaseEvents = CosmosBaseEvents>
   extends CosmosEventHost<A>
   implements CosmosPointSimple, Partial<CosmosStyle>
{
   alpha: CosmosValue;
   blend: BLEND_MODES | undefined;
   border: number | undefined;
   readonly container = new Container();
   fill: string | undefined;
   font: string | undefined;
   position: CosmosPoint;
   rotation: CosmosValue;
   scale: CosmosPoint;
   stroke: string | undefined;
   tint: number | undefined;
   get area () {
      return this.container.filterArea as Rectangle | null;
   }
   set area (value) {
      this.container.filterArea = value as Rectangle;
   }
   get filters () {
      return this.container.filters;
   }
   set filters (value) {
      this.container.filters = value;
   }
   get x () {
      return this.position.x;
   }
   set x (value) {
      this.position.x = value;
   }
   get y () {
      return this.position.y;
   }
   set y (value) {
      this.position.y = value;
   }
   constructor ({
      alpha = 1,
      area = null,
      blend = void 0,
      border = void 0,
      fill = void 0,
      filters = null,
      font = void 0,
      position = 0,
      rotation = 0,
      scale = 1,
      stroke = void 0,
      tint = void 0
   }: CosmosBaseProperties = {}) {
      super();
      this.alpha = new CosmosValue(alpha);
      this.area = area;
      this.blend = blend;
      this.border = border;
      this.fill = fill;
      this.filters = filters;
      this.font = font;
      if (typeof position === 'number') {
         this.position = new CosmosPoint(position ?? 0);
      } else {
         this.position = new CosmosPoint(position?.x ?? 0, position?.y ?? 0);
      }
      this.rotation = new CosmosValue(rotation);
      if (typeof scale === 'number') {
         this.scale = new CosmosPoint(scale ?? 1);
      } else {
         this.scale = new CosmosPoint(scale?.x ?? 1, scale?.y ?? 1);
      }
      this.stroke = stroke;
      this.tint = tint;
   }
}

export class CosmosObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosBase<A> {
   private $object = {
      subcontainer: new Container(),
      dirty: false,
      objects: new Proxy([] as CosmosObject[], {
         set: (target, key: `${number}`, value) => {
            this.$object.dirty = true;
            target[key] = value;
            return true;
         },
         deleteProperty: (target, key: `${number}`) => {
            this.$object.dirty = true;
            delete target[key];
            return true;
         }
      }),
      offsets: new Proxy([] as CosmosPoint[], {
         get: (target, key: `${number}`) => {
            return (target[key] ??= new CosmosPoint());
         }
      })
   };
   acceleration: CosmosValue;
   gravity: CosmosRay;
   metadata: B;
   parallax: CosmosPoint;
   priority: CosmosValue;
   spin: CosmosValue;
   velocity: CosmosPoint;
   get objects () {
      return this.$object.objects;
   }
   set objects (value) {
      this.$object.objects.splice(0, this.$object.objects.length);
      this.$object.objects.push(...value);
      this.$object.dirty = true;
   }
   get offsets () {
      return this.$object.offsets;
   }
   set offsets (value) {
      this.$object.offsets.splice(0, this.$object.offsets.length);
      this.$object.offsets.push(...value);
   }
   constructor (properties: CosmosObjectProperties<B> = {}) {
      super(properties);
      this.$object.subcontainer.sortableChildren = true;
      (({
         acceleration = 1,
         gravity = 0,
         offsets = [],
         metadata = {} as B,
         objects = [],
         parallax = 0,
         priority = 0,
         spin = 0,
         velocity = 0
      }: CosmosObjectProperties<B>) => {
         this.acceleration = new CosmosValue(acceleration);
         if (typeof gravity === 'number') {
            this.gravity = new CosmosRay(gravity ?? 0);
         } else {
            this.gravity = new CosmosRay(gravity?.angle ?? 0, gravity?.extent ?? 0);
         }
         this.metadata = metadata;
         this.offsets = offsets.map(offset => {
            if (typeof offset === 'number') {
               return new CosmosPoint(offset ?? 0);
            } else {
               return new CosmosPoint(offset?.x ?? 0, offset?.y ?? 0);
            }
         });
         this.objects = objects;
         if (typeof parallax === 'number') {
            this.parallax = new CosmosPoint(parallax ?? 0);
         } else {
            this.parallax = new CosmosPoint(parallax?.x ?? 0, parallax?.y ?? 0);
         }
         this.priority = new CosmosValue(priority);
         this.spin = new CosmosValue(spin);
         if (typeof velocity === 'number') {
            this.velocity = new CosmosPoint(velocity ?? 0);
         } else {
            this.velocity = new CosmosPoint(velocity?.x ?? 0, velocity?.y ?? 0);
         }
      })(properties);
      this.container.addChild(this.$object.subcontainer);
   }
   attach (...objects: CosmosObject[]) {
      for (const object of objects) {
         this.objects.includes(object) || this.objects.push(object);
      }
      return this;
   }
   detach (...objects: CosmosObject[]) {
      for (const object of objects) {
         this.objects.includes(object) && this.objects.splice(this.objects.indexOf(object), 1);
      }
      return this;
   }
   draw (style: CosmosStyle) {}
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      if (this.$object.dirty) {
         this.$object.subcontainer.removeChildren();
         for (const object of this.objects) {
            this.$object.subcontainer.addChild(object.container);
         }
         this.$object.dirty = false;
      }
      if (this.gravity.extent !== 0) {
         this.velocity.set(this.velocity.endpoint(this.gravity.angle, this.gravity.extent));
      }
      if (this.acceleration.value !== 1) {
         const modifier = this.acceleration.value;
         this.velocity.set(this.velocity.multiply(modifier));
         this.spin.value *= modifier;
      }
      if (this.spin.value !== 0) {
         this.rotation.value += this.spin.value;
      }
      if (this.velocity.x !== 0 || this.velocity.y !== 0) {
         this.position.set(this.position.add(this.velocity));
      }
      this.fire('tick');
      const offset = this.position.value();
      for (const suboffset of this.offsets) {
         offset.x += suboffset.x;
         offset.y += suboffset.y;
      }
      this.container.alpha = this.alpha.value;
      this.container.angle = this.rotation.value;
      this.container.position.set(offset.x + this.parallax.x * camera.x, offset.y + this.parallax.y * camera.y);
      this.container.scale.set(this.scale.x, this.scale.y);
      const substyle = {
         blend: this.blend ?? style.blend,
         border: this.border ?? style.border,
         fill: this.fill ?? style.fill,
         font: this.font ?? style.font,
         stroke: this.stroke ?? style.stroke,
         tint: this.tint ?? style.tint
      };
      this.draw(substyle);
      for (const object of this.objects) {
         object.tick(camera, scale, substyle);
      }
      this.fire('render');
   }
   update (index: number) {
      index === this.container.zIndex || (this.container.zIndex = index);
      for (const object of this.objects) {
         object.update(object.priority.value);
      }
   }
}

export class CosmosAnchoredObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosObject<A, B> {
   anchor: CosmosPoint;
   constructor (properties: CosmosAnchoredObjectProperties<B> = {}) {
      super(properties);
      if (typeof properties.anchor === 'number') {
         this.anchor = new CosmosPoint(properties.anchor ?? -1);
      } else {
         this.anchor = new CosmosPoint(properties.anchor?.x ?? -1, properties.anchor?.y ?? -1);
      }
   }
   cast (position: CosmosPointSimple) {
      const size = this.compute();
      if (size.x !== 0 || size.y !== 0) {
         this.anchor.set(
            size
               .multiply(this.anchor)
               .subtract(this.position.multiply(2))
               .add(new CosmosPoint(position).multiply(2))
               .divide(size)
         );
      }
      this.position.set(position.x, position.y);
   }
   compute () {
      return new CosmosPoint();
   }
}

export class CosmosSizedObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   size: CosmosPoint;
   constructor (properties: CosmosSizedObjectProperties<B> = {}) {
      super(properties);
      if (typeof properties.size === 'number') {
         this.size = new CosmosPoint(properties.size ?? 0);
      } else {
         this.size = new CosmosPoint(properties.size?.x ?? 0, properties.size?.y ?? 0);
      }
   }
   compute () {
      return this.size.clone();
   }
}

export class CosmosHitbox<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSizedObject<A, B> {
   private $hitbox = {
      previous: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] as [number, number, number, number, number, number, number, number, number],
      vertices: [
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 },
         { x: 0, y: 0 }
      ] as [CosmosPoint, CosmosPoint, CosmosPoint, CosmosPoint]
   };
   calculate ([ position, rotation, scale ]: CosmosTransform) {
      let update = false;
      if (this.anchor.x !== this.$hitbox.previous[0]) {
         this.$hitbox.previous[0] = this.anchor.x;
         update = true;
      }
      if (this.anchor.y !== this.$hitbox.previous[1]) {
         this.$hitbox.previous[1] = this.anchor.y;
         update = true;
      }
      if (this.size.x !== this.$hitbox.previous[2]) {
         this.$hitbox.previous[2] = this.size.x;
         update = true;
      }
      if (this.size.y !== this.$hitbox.previous[3]) {
         this.$hitbox.previous[3] = this.size.y;
         update = true;
      }
      if (position.x !== this.$hitbox.previous[4]) {
         this.$hitbox.previous[4] = position.x;
         update = true;
      }
      if (position.y !== this.$hitbox.previous[5]) {
         this.$hitbox.previous[5] = position.y;
         update = true;
      }
      if (rotation !== this.$hitbox.previous[6]) {
         this.$hitbox.previous[6] = rotation;
         update = true;
      }
      if (scale.x !== this.$hitbox.previous[7]) {
         this.$hitbox.previous[7] = scale.x;
         update = true;
      }
      if (scale.y !== this.$hitbox.previous[8]) {
         this.$hitbox.previous[8] = scale.y;
         update = true;
      }
      if (update) {
         const size = this.size.multiply(scale);
         const half = size.divide(2);
         const base = position.subtract(half.add(half.multiply(this.anchor)));
         const offset = rotation + 180;
         const corner2 = base.endpoint(0, size.x);
         const corner3 = corner2.endpoint(90, size.y);
         const corner4 = corner3.endpoint(180, size.x);
         this.$hitbox.vertices[0] = position
            .endpoint(position.angleFrom(base) + offset, position.extentOf(base))
            .round(1e6);
         this.$hitbox.vertices[1] = position
            .endpoint(position.angleFrom(corner2) + offset, position.extentOf(corner2))
            .round(1e6);
         this.$hitbox.vertices[2] = position
            .endpoint(position.angleFrom(corner3) + offset, position.extentOf(corner3))
            .round(1e6);
         this.$hitbox.vertices[3] = position
            .endpoint(position.angleFrom(corner4) + offset, position.extentOf(corner4))
            .round(1e6);
      }
   }
   detect (hitbox: CosmosHitbox, [ min1, max1 ] = hitbox.region()) {
      const [ min2, max2 ] = this.region();
      if ((hitbox.size.x === 0 || hitbox.size.y === 0) && (this.size.x === 0 || this.size.y === 0)) {
         if (CosmosMath.intersection(min1, max1, min2, max2)) {
            return true;
         }
      } else if (min1.x < max2.x && min2.x < max1.x && min1.y < max2.y && min2.y < max1.y) {
         const vertices1 = hitbox.vertices();
         const vertices2 = this.vertices();
         if (
            (vertices1[0].x === vertices1[1].x || vertices1[0].y === vertices1[1].y) &&
            (vertices2[0].x === vertices2[1].x || vertices2[0].y === vertices2[1].y)
         ) {
            return true;
         } else {
            for (const [ a1, a2 ] of [
               [ vertices1[0], vertices1[1] ],
               [ vertices1[1], vertices1[2] ],
               [ vertices1[2], vertices1[3] ],
               [ vertices1[3], vertices1[0] ]
            ]) {
               for (const [ b1, b2 ] of [
                  [ vertices2[0], vertices2[1] ],
                  [ vertices2[1], vertices2[2] ],
                  [ vertices2[2], vertices2[3] ],
                  [ vertices2[3], vertices2[0] ]
               ]) {
                  if (CosmosMath.intersection(a1, a2, b1, b2)) {
                     return true;
                  }
               }
            }
         }
      }
      return false;
   }
   region (): CosmosRegion {
      const { x: x1, y: y1 } = this.$hitbox.vertices[0];
      const { x: x2, y: y2 } = this.$hitbox.vertices[1];
      const { x: x3, y: y3 } = this.$hitbox.vertices[2];
      const { x: x4, y: y4 } = this.$hitbox.vertices[3];
      return [
         { x: Math.min(x1, x2, x3, x4), y: Math.min(y1, y2, y3, y4) },
         { x: Math.max(x1, x2, x3, x4), y: Math.max(y1, y2, y3, y4) }
      ];
   }
   vertices () {
      return this.$hitbox.vertices;
   }
}

export class CosmosRenderer<
   A extends string = string,
   B extends CosmosBaseEvents = CosmosBaseEvents
> extends CosmosBase<B> {
   static style = {
      blend: BLEND_MODES.NORMAL,
      border: 1,
      fill: 'transparent',
      font: '10px monospace',
      stroke: 'transparent',
      tint: 0xffffff
   };
   private $renderer = { active: false, alpha: 1, delta: 0 };
   application = null as any as Application;
   freecam: boolean;
   layers: { [x in A]: CosmosRendererLayer };
   region: CosmosRegion = [ new CosmosPoint(-Infinity), new CosmosPoint(Infinity) ];
   shake: CosmosValue;
   size: CosmosPoint;
   timer: CosmosTimer;
   wrapper: HTMLElement | null;
   zoom: CosmosValue;
   get active () {
      return this.$renderer.active;
   }
   set active (value) {
      if (value !== this.$renderer.active) {
         if (value) {
            this.application.start();
            this.timer.start();
         } else {
            this.application.stop();
            this.timer.stop();
         }
         this.$renderer.active = value;
      }
   }
   get canvas () {
      return this.application.view as HTMLCanvasElement;
   }
   constructor (properties: CosmosRendererProperties<A> = {}) {
      super(properties);
      (({
         active = true,
         freecam = false,
         layers = {} as { [x in A]: CosmosRendererLayerModifier[] },
         size = 1,
         shake = 0,
         timer = new CosmosTimer(),
         wrapper = null,
         zoom = 1
      }: CosmosRendererProperties<A>) => {
         this.freecam = freecam;
         this.layers = Object.fromEntries(
            Object.entries(layers).map(([ key, modifiers ]) => {
               const container = new Container();
               container.sortableChildren = true;
               return [ key, { active: true, container, modifiers, objects: [] } ];
            })
         ) as any;
         this.size = new CosmosPoint(size);
         this.shake = new CosmosValue(shake);
         this.timer = timer;
         this.wrapper = typeof wrapper === 'string' ? (document.querySelector(wrapper) as HTMLElement) : wrapper;
         this.zoom = new CosmosValue(zoom);
         for (const key in this.layers) {
            this.container.addChild(this.layers[key].container);
         }
         this.container.pivot.set(this.size.x / 2, this.size.y / 2);
         this.container.position.set(this.size.x / 2, this.size.y / 2);
         const application = this.application;
         if (application) {
            const canvas = this.canvas;
            this.on('render').then(() => {
               canvas.remove();
               application.stage = new Container();
               application.destroy();
            });
         }
         this.application = new Application({
            antialias: false,
            autoStart: this.active,
            backgroundAlpha: 0,
            height: this.size.y,
            width: this.size.x
         });
         this.application.stage = this.container;
         this.canvas.style.imageRendering = 'pixelated';
         this.wrapper?.appendChild(this.canvas);
         this.active = active;
      })(properties);
      this.timer.on('tick', delta => {
         if (1 <= (this.$renderer.delta += delta / (100 / 3))) {
            this.tick();
            this.$renderer.delta = 0;
         }
      });
   }
   attach (key: A, ...objects: CosmosObject[]) {
      const layer = this.layers[key];
      const vertical = layer.modifiers.includes('vertical');
      for (const object of objects) {
         layer.objects.includes(object) || layer.objects.push(object);
         object.update(object.priority.value || (vertical ? object.position.y : 0));
      }
   }
   calculate(source: A | CosmosObject[], filter?: CosmosProvider<boolean, [CosmosHitbox]>): CosmosHitbox[];
   calculate(
      source: A | CosmosObject[],
      filter?: CosmosProvider<boolean, [CosmosHitbox]>,
      transform?: CosmosTransform,
      camera?: CosmosPointSimple,
      sublist?: CosmosHitbox[]
   ): void;
   calculate (
      source: A | CosmosObject[],
      filter: CosmosProvider<boolean, [CosmosHitbox]> = true,
      transform: CosmosTransform = [ new CosmosPoint(), 0, new CosmosPoint(1) ],
      camera: CosmosPointSimple = this.freecam ? this.position : this.position.clamp(...this.region),
      sublist?: CosmosHitbox[]
   ) {
      const list = sublist ?? ([] as CosmosHitbox[]);
      const objects = typeof source === 'string' ? this.layers[source].objects : source;
      for (const object of objects) {
         const subtransform = CosmosMath.transform(transform, object, camera);
         if (object instanceof CosmosHitbox && CosmosUtils.provide(filter, object)) {
            list.push(object);
            object.calculate(subtransform);
         }
         this.calculate(object.objects, filter, subtransform, camera, list);
      }
      if (!sublist) {
         return list;
      }
   }
   clear (key: A) {
      const layer = this.layers[key];
      layer.objects.splice(0, layer.objects.length);
   }
   detach (key: A, ...objects: CosmosObject[]) {
      const layer = this.layers[key];
      for (const object of objects) {
         layer.objects.includes(object) && layer.objects.splice(layer.objects.indexOf(object), 1);
      }
   }
   detect (key: A | void, source: CosmosHitbox, ...targets: CosmosHitbox[]) {
      typeof key === 'string' && this.calculate(key, hitbox => hitbox === source);
      const region = source.region();
      return targets.filter(target => target.detect(source, region));
   }
   async pause (time: number) {
      let elapsed = 0;
      const duration = Math.round(time * 0.03);
      while (elapsed++ < duration) {
         await this.on('tick');
      }
   }
   projection (position: CosmosPointSimple) {
      return this.size
         .divide(this.scale.multiply(2))
         .subtract(this.freecam ? this.position : this.position.clamp(...this.region))
         .add(position);
   }
   tick () {
      this.fire('tick');
      const shake = { x: 0, y: 0 };
      const style = {
         blend: this.blend ?? CosmosRenderer.style.blend,
         border: this.border ?? CosmosRenderer.style.border,
         fill: this.fill ?? CosmosRenderer.style.fill,
         font: this.font ?? CosmosRenderer.style.font,
         stroke: this.stroke ?? CosmosRenderer.style.stroke,
         tint: this.tint ?? CosmosRenderer.style.tint
      };
      const camera = this.freecam ? this.position : this.position.clamp(...this.region);
      const subsize = this.size.divide(this.scale);
      const center = subsize.divide(2);
      if (this.shake.value !== 0) {
         shake.x = this.shake.value * (Math.random() - 0.5) * 2;
         shake.y = this.shake.value * (Math.random() - 0.5) * 2;
      }
      const alpha = Math.min(Math.max(this.alpha.value, 0), 1);
      if (alpha !== this.$renderer.alpha) {
         this.$renderer.alpha = alpha;
         if (alpha < 1) {
            this.canvas.style.filter = `brightness(${alpha})`;
         } else {
            this.canvas.style.filter = '';
         }
      }
      for (const key in this.layers) {
         const layer = this.layers[key];
         if (layer.active) {
            const fixed = layer.modifiers.includes('fixed');
            const vertical = layer.modifiers.includes('vertical');
            const zoom = fixed ? 1 : this.zoom.value;
            const subcamera = camera.add(subsize.subtract(subsize.divide(zoom)).divide(2));
            const scale = this.scale.multiply(zoom);
            layer.container.angle = fixed ? 0 : this.rotation.value;
            layer.container.filterArea = new Rectangle(0, 0, this.size.x, this.size.y);
            layer.container.position.set(
               (fixed ? 0 : (center.x - subcamera.x) * scale.x) + shake.x * scale.x,
               (fixed ? 0 : (center.y - subcamera.y) * scale.y) + shake.y * scale.y
            );
            layer.container.scale.set(scale.x, scale.y);
            layer.container.removeChildren();
            for (const object of layer.objects.slice()) {
               object.tick(camera, scale, style);
               object.update(object.priority.value || (vertical ? object.position.y : 0));
               layer.container.addChild(object.container);
            }
         }
      }
      this.fire('render');
   }
}
