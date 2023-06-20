import { CosmosTimer } from './core';
import { CosmosObject, CosmosTransform } from './renderer';
import { CosmosDirection, CosmosProvider, CosmosUtils } from './utils';

export type CosmosArea = CosmosPointSimple & CosmosDimensions;

export interface CosmosDimensions {
   height: number;
   width: number;
}

export interface CosmosPointSimple {
   x: number;
   y: number;
}

export interface CosmosRaySimple {
   angle: number;
   extent: number;
}

export interface CosmosValueSimple {
   value: number;
}

export class CosmosPoint implements CosmosPointSimple, CosmosRaySimple {
   private $point = { x: 0, y: 0 };
   get angle () {
      return this.angleFrom(0);
   }
   set angle (value) {
      this.set(new CosmosRay(value, this.extent));
   }
   get extent () {
      return this.extentOf(0);
   }
   set extent (value) {
      this.set(new CosmosRay(this.angle, value));
   }
   get x () {
      return this.$point.x;
   }
   set x (value) {
      this.$point.x = value;
   }
   get y () {
      return this.$point.y;
   }
   set y (value) {
      this.$point.y = value;
   }
   constructor();
   constructor(a: number, b: number);
   constructor(a: Partial<CosmosPointSimple> | number);
   constructor (a: Partial<CosmosPointSimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         a === 0 || (this.x = a);
         b === 0 || (this.y = b);
      } else {
         (a.x ?? 0) === 0 || (this.x = a.x ?? 0);
         (a.y ?? 0) === 0 || (this.y = a.y ?? 0);
      }
   }
   abs () {
      return new CosmosPoint(Math.abs(this.x), Math.abs(this.y));
   }
   add(a: number, b: number): CosmosPoint;
   add(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   add (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x + a, this.y + b);
      } else {
         return this.add(a.x ?? 0, a.y ?? 0);
      }
   }
   angleFrom(a: number, b: number): number;
   angleFrom(a: Partial<CosmosPointSimple> | number): number;
   angleFrom (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         if (this.y === b) {
            if (this.x < a) {
               return 180;
            } else {
               return 0;
            }
         } else if (this.x === a) {
            if (this.y < b) {
               return 270;
            } else {
               return 90;
            }
         } else {
            return (Math.atan2(this.y - b, this.x - a) * (180 / Math.PI)) % 360;
         }
      } else {
         return this.angleFrom(a.x ?? 0, a.y ?? 0);
      }
   }
   angleTo(a: number, b: number): number;
   angleTo(a: Partial<CosmosPointSimple> | number): number;
   angleTo (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return this.angleFrom(a, b) + 180;
      } else {
         return this.angleTo(a.x ?? 0, a.y ?? 0);
      }
   }
   ceil(): CosmosPoint;
   ceil(a: number, b: number): CosmosPoint;
   ceil(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   ceil (a: Partial<CosmosPointSimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.ceil(this.x * a) / a, Math.ceil(this.y * b) / b);
      } else if (a) {
         return this.ceil(a.x ?? 0, a.y ?? 0);
      }
   }
   clamp (min: Partial<CosmosPointSimple> | number, max: Partial<CosmosPointSimple> | number) {
      return new CosmosPoint(
         Math.min(
            Math.max(this.x, typeof min === 'number' ? min : min.x ?? -Infinity),
            typeof max === 'number' ? max : max.x ?? Infinity
         ),
         Math.min(
            Math.max(this.y, typeof min === 'number' ? min : min.y ?? -Infinity),
            typeof max === 'number' ? max : max.y ?? Infinity
         )
      );
   }
   clone () {
      return new CosmosPoint(this);
   }
   divide(a: number, b: number): CosmosPoint;
   divide(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   divide (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x / a, this.y / b);
      } else {
         return this.divide(a.x ?? 0, a.y ?? 0);
      }
   }
   endpoint(a: number, b: number): CosmosPoint;
   endpoint(a: { angle?: number; extent?: number } | number): CosmosPoint;
   endpoint (a: { angle?: number; extent?: number } | number, b = a as number) {
      if (typeof a === 'number') {
         if (b === 0) {
            return this.clone();
         } else {
            const trueAngle = (a % 360) + 360;
            switch (trueAngle) {
               case 0:
               case 360:
                  return this.add(b, 0);
               case 90:
               case 450:
                  return this.add(0, b);
               case 180:
               case 540:
                  return this.add(-b, 0);
               case 270:
               case 630:
                  return this.add(0, -b);
               default:
                  const rads = ((trueAngle + 90) * Math.PI) / 180;
                  return new CosmosPoint(this.x + b * Math.sin(rads), this.y - b * Math.cos(rads));
            }
         }
      } else {
         return this.endpoint(a.angle ?? 0, a.extent ?? 0);
      }
   }
   extentOf(a: number, b: number): number;
   extentOf(a: Partial<CosmosPointSimple> | number): number;
   extentOf (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         if (this.y === b) {
            return Math.abs(a - this.x);
         } else if (this.x === a) {
            return Math.abs(b - this.y);
         } else {
            return Math.sqrt((a - this.x) ** 2 + (b - this.y) ** 2);
         }
      } else {
         return this.extentOf(a.x ?? 0, a.y ?? 0);
      }
   }
   floor(): CosmosPoint;
   floor(a: number, b: number): CosmosPoint;
   floor(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   floor (a: Partial<CosmosPointSimple> | number = 1, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.floor(this.x * a) / a, Math.floor(this.y * b) / b);
      } else if (a) {
         return this.floor(a.x ?? 0, a.y ?? 0);
      }
   }
   modulate(timer: CosmosTimer, duration: number, ...points: (Partial<CosmosPointSimple> | number)[]): Promise<void>;
   modulate(
      timer: CosmosTimer,
      interpolator: (value: number, ...points: number[]) => number,
      duration: number,
      ...points: (Partial<CosmosPointSimple> | number)[]
   ): Promise<void>;
   modulate (
      timer: CosmosTimer,
      interpolator: number | ((value: number, ...points: number[]) => number),
      duration: number,
      ...points: (Partial<CosmosPointSimple> | number)[]
   ) {
      if (typeof interpolator === 'function') {
         let active = true;
         timer.tasks.get(this)?.();
         timer.tasks.set(this, () => (active = false));
         const base = this.value();
         const origin = timer.value;
         const subpointsX = points.map(point => (typeof point === 'number' ? point : point.x ?? base.x));
         const subpointsY = points.map(point => (typeof point === 'number' ? point : point.y ?? base.y));
         return timer.when(() => {
            if (active) {
               const elapsed = timer.value - origin;
               if (elapsed < duration) {
                  this.set(
                     interpolator(elapsed / duration, base.x, ...subpointsX),
                     interpolator(elapsed / duration, base.y, ...subpointsY)
                  );
                  return false;
               } else {
                  timer.tasks.delete(this);
                  this.set(interpolator(1, base.x, ...subpointsX), interpolator(1, base.y, ...subpointsY));
               }
            }
            return true;
         });
      } else {
         return this.modulate(timer, CosmosMath.bezier, interpolator, duration, ...points);
      }
   }
   multiply(a: number, b: number): CosmosPoint;
   multiply(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   multiply (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x * a, this.y * b);
      } else {
         return this.multiply(a.x ?? 0, a.y ?? 0);
      }
   }
   round(): CosmosPoint;
   round(a: number, b: number): CosmosPoint;
   round(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   round (a: Partial<CosmosPointSimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.round(this.x * a) / a, Math.round(this.y * b) / b);
      } else if (a) {
         return this.round(a.x ?? 0, a.y ?? 0);
      }
   }
   set(a: number, b: number): CosmosPoint;
   set(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   set (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         this.x = a;
         this.y = b;
         return this;
      } else {
         return this.set(a.x ?? 0, a.y ?? 0);
      }
   }
   shift (angle: number, extent = 0, origin: Partial<CosmosPointSimple> | number = 0): CosmosPoint {
      if (angle % 360 === 0 && extent === 0) {
         return this.clone();
      } else if (origin instanceof CosmosPoint) {
         return origin.endpoint(origin.angleTo(this) + angle, origin.extentOf(this) + extent);
      } else {
         return this.shift(angle, extent, new CosmosPoint(origin));
      }
   }
   async step (timer: CosmosTimer, speed: number, ...targets: (Partial<CosmosPointSimple> | number)[]) {
      for (const target of targets) {
         if (typeof target === 'number') {
            await this.modulate(timer, (this.extentOf(target) / speed) * CosmosMath.FRAME, target);
         } else {
            await this.modulate(
               timer,
               (this.extentOf(target.x ?? this.x, target.y ?? this.y) / speed) * CosmosMath.FRAME,
               target
            );
         }
      }
   }
   step_legacy(timer: CosmosTimer, speed: number, target: Partial<CosmosPointSimple> | number): Promise<void>;
   step_legacy(
      timer: CosmosTimer,
      interpolator: (value: number, ...points: number[]) => number,
      speed: number,
      target: Partial<CosmosPointSimple> | number
   ): Promise<void>;
   step_legacy (
      timer: CosmosTimer,
      interpolator: number | ((value: number, ...points: number[]) => number),
      speed: number,
      target?: Partial<CosmosPointSimple> | number
   ) {
      if (typeof interpolator === 'function') {
         return this.modulate(timer, interpolator, (this.extentOf(target!) / (speed * 30)) * 1000, target!);
      } else {
         return this.step_legacy(timer, CosmosMath.linear, interpolator, speed);
      }
   }
   subtract(a: number, b: number): CosmosPoint;
   subtract(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   subtract (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x - a, this.y - b);
      } else {
         return this.subtract(a.x ?? 0, a.y ?? 0);
      }
   }
   value () {
      return { x: this.x, y: this.y };
   }
}

export class CosmosPointLinked extends CosmosPoint {
   target: CosmosPointSimple;
   get x () {
      return this.target.x;
   }
   set x (value) {
      this.target.x = value;
   }
   get y () {
      return this.target.y;
   }
   set y (value) {
      this.target.y = value;
   }
   constructor (target: CosmosPointSimple) {
      super();
      this.target = target;
   }
}

export class CosmosRay implements CosmosPointSimple, CosmosRaySimple {
   private $ray = { angle: 0, extent: 0 };
   get angle () {
      return this.$ray.angle;
   }
   set angle (value) {
      this.$ray.angle = value;
   }
   get extent () {
      return this.$ray.extent;
   }
   set extent (value) {
      this.$ray.extent = value;
   }
   get x () {
      return new CosmosPoint().endpoint(this.angle, this.extent).x;
   }
   set x (value) {
      this.set(new CosmosPoint(value, this.y));
   }
   get y () {
      return new CosmosPoint().endpoint(this.angle, this.extent).y;
   }
   set y (value) {
      this.set(new CosmosPoint(this.x, value));
   }
   constructor();
   constructor(a: number, b: number);
   constructor(a: Partial<CosmosRaySimple> | number);
   constructor (a: Partial<CosmosRaySimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         this.angle = a;
         this.extent = b;
      } else {
         this.angle = a.angle ?? 0;
         this.extent = a.extent ?? 0;
      }
   }
   abs () {
      return new CosmosRay(Math.abs(this.angle), Math.abs(this.extent));
   }
   add(a: number, b: number): CosmosRay;
   add(a: Partial<CosmosRaySimple> | number): CosmosRay;
   add (a: Partial<CosmosRaySimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(this.angle + a, this.extent + b);
      } else {
         return this.add(a.angle ?? 0, a.extent ?? 0);
      }
   }
   ceil(): CosmosRay;
   ceil(a: number, b: number): CosmosRay;
   ceil(a: Partial<CosmosRaySimple> | number): CosmosRay;
   ceil (a: Partial<CosmosRaySimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(Math.ceil(this.angle * a) / a, Math.ceil(this.extent * b) / b);
      } else if (a) {
         return this.ceil(a.angle ?? 0, a.extent ?? 0);
      }
   }
   clamp (min: Partial<CosmosRaySimple> | number, max: Partial<CosmosRaySimple> | number) {
      return new CosmosRay(
         Math.min(
            Math.max(this.angle, typeof min === 'number' ? min : min.angle ?? -Infinity),
            typeof max === 'number' ? max : max.angle ?? Infinity
         ),
         Math.min(
            Math.max(this.extent, typeof min === 'number' ? min : min.extent ?? -Infinity),
            typeof max === 'number' ? max : max.extent ?? Infinity
         )
      );
   }
   clone () {
      return new CosmosRay(this);
   }
   divide(a: number, b: number): CosmosRay;
   divide(a: Partial<CosmosRaySimple> | number): CosmosRay;
   divide (a: Partial<CosmosRaySimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(this.angle / a, this.extent / b);
      } else {
         return this.divide(a.angle ?? 0, a.extent ?? 0);
      }
   }
   floor(): CosmosRay;
   floor(a: number, b: number): CosmosRay;
   floor(a: Partial<CosmosRaySimple> | number): CosmosRay;
   floor (a: Partial<CosmosRaySimple> | number = 1, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(Math.floor(this.angle * a) / a, Math.floor(this.extent * b) / b);
      } else if (a) {
         return this.floor(a.angle ?? 0, a.extent ?? 0);
      }
   }
   modulate(timer: CosmosTimer, duration: number, ...points: (Partial<CosmosRaySimple> | number)[]): Promise<void>;
   modulate(
      timer: CosmosTimer,
      interpolator: (value: number, ...points: number[]) => number,
      duration: number,
      ...points: (Partial<CosmosRaySimple> | number)[]
   ): Promise<void>;
   modulate (
      timer: CosmosTimer,
      interpolator: number | ((value: number, ...points: number[]) => number),
      duration: number,
      ...points: (Partial<CosmosRaySimple> | number)[]
   ) {
      if (typeof interpolator === 'function') {
         let active = true;
         timer.tasks.get(this)?.();
         timer.tasks.set(this, () => (active = false));
         const base = this.value();
         const origin = timer.value;
         const subpointsX = points.map(point => (typeof point === 'number' ? point : point.angle ?? base.angle));
         const subpointsY = points.map(point => (typeof point === 'number' ? point : point.extent ?? base.extent));
         return timer.when(() => {
            if (active) {
               const elapsed = timer.value - origin;
               if (elapsed < duration) {
                  this.set(
                     interpolator(elapsed / duration, base.angle, ...subpointsX),
                     interpolator(elapsed / duration, base.extent, ...subpointsY)
                  );
                  return false;
               } else {
                  timer.tasks.delete(this);
                  this.set(interpolator(1, base.angle, ...subpointsX), interpolator(1, base.extent, ...subpointsY));
               }
            }
            return true;
         });
      } else {
         return this.modulate(timer, CosmosMath.bezier, interpolator, duration, ...points);
      }
   }
   multiply(a: number, b: number): CosmosRay;
   multiply(a: Partial<CosmosRaySimple> | number): CosmosRay;
   multiply (a: Partial<CosmosRaySimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(this.angle * a, this.extent * b);
      } else {
         return this.multiply(a.angle ?? 0, a.extent ?? 0);
      }
   }
   round(): CosmosRay;
   round(a: number, b: number): CosmosRay;
   round(a: Partial<CosmosRaySimple> | number): CosmosRay;
   round (a: Partial<CosmosRaySimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(Math.round(this.angle * a) / a, Math.round(this.extent * b) / b);
      } else if (a) {
         return this.round(a.angle ?? 0, a.extent ?? 0);
      }
   }
   set(a: number, b: number): CosmosRay;
   set(a: Partial<CosmosRaySimple> | number): CosmosRay;
   set (a: Partial<CosmosRaySimple> | number, b = a as number) {
      if (typeof a === 'number') {
         this.angle = a;
         this.extent = b;
         return this;
      } else {
         return this.set(a.angle ?? 0, a.extent ?? 0);
      }
   }
   subtract(a: number, b: number): CosmosRay;
   subtract(a: Partial<CosmosRaySimple> | number): CosmosRay;
   subtract (a: Partial<CosmosRaySimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosRay(this.angle - a, this.extent - b);
      } else {
         return this.subtract(a.angle ?? 0, a.extent ?? 0);
      }
   }
   value () {
      return { angle: this.angle, extent: this.extent };
   }
}

export class CosmosRayLinked extends CosmosRay {
   target: CosmosRaySimple;
   get angle () {
      return this.target.angle;
   }
   set angle (value) {
      this.target.angle = value;
   }
   get extent () {
      return this.target.extent;
   }
   set extent (value) {
      this.target.extent = value;
   }
   constructor (target: CosmosRaySimple) {
      super();
      this.target = target;
   }
}

export class CosmosValue implements CosmosValueSimple {
   private $value = { value: 0 };
   get value () {
      return this.$value.value;
   }
   set value (value) {
      this.$value.value = value;
   }
   constructor (value: CosmosValueSimple | number = 0) {
      if (typeof value === 'number') {
         value === 0 || (this.value = value);
      } else {
         value.value === 0 || (this.value = value.value);
      }
   }
   modulate(timer: CosmosTimer, duration: number, ...points: number[]): Promise<void>;
   modulate(
      timer: CosmosTimer,
      interpolator: (value: number, ...points: number[]) => number,
      duration: number,
      ...points: number[]
   ): Promise<void>;
   modulate (
      timer: CosmosTimer,
      interpolator: number | ((value: number, ...points: number[]) => number),
      duration: number,
      ...points: number[]
   ) {
      if (typeof interpolator === 'function') {
         let active = true;
         timer.tasks.get(this)?.();
         timer.tasks.set(this, () => (active = false));
         const base = this.value;
         const origin = timer.value;
         return timer.when(() => {
            if (active) {
               const elapsed = timer.value - origin;
               if (elapsed < duration) {
                  this.value = interpolator(elapsed / duration, base, ...points);
                  return false;
               } else {
                  timer.tasks.delete(this);
                  this.value = points.length > 0 ? points[points.length - 1] : base;
               }
            }
            return true;
         });
      } else {
         return this.modulate(timer, CosmosMath.bezier, interpolator, duration, ...points);
      }
   }
   set (a: CosmosValueSimple | number): CosmosValue {
      if (typeof a === 'number') {
         this.value = a;
         return this;
      } else {
         return this.set(a.value);
      }
   }
   async step (timer: CosmosTimer, speed: number, ...targets: number[]) {
      for (const target of targets) {
         await this.modulate(timer, (Math.abs(target - this.value) / speed) * CosmosMath.FRAME, target);
      }
   }
}

export class CosmosValueRandom extends CosmosValue {
   clone () {
      return new CosmosValueRandom(this);
   }
   compute () {
      let z = this.value;
      z ^= z >>> 16;
      z = Math.imul(z, 0x21f0aaad);
      z ^= z >>> 15;
      z = Math.imul(z, 0x735a2d97);
      z ^= z >>> 15;
      return (z >>> 0) / 4294967296;
   }
   next (threshold = 0) {
      const prev = this.compute();
      let next = prev;
      while (Math.abs(prev - next) <= Math.min(Math.max(threshold, 0), 0.5)) {
         this.value = (this.value + 0x9e3779b9) | 0;
         next = this.compute();
      }
      return next;
   }
}

export class CosmosValueLinked extends CosmosValue {
   target: CosmosValueSimple;
   get value () {
      return this.target.value;
   }
   set value (value) {
      this.target.value = value;
   }
   constructor (target: CosmosValueSimple) {
      super();
      this.target = target;
   }
}

export const CosmosMath = {
   FRAME: 100 / 3,
   bezier (value: number, ...points: number[]): number {
      if (points.length === 0) {
         return value;
      } else {
         while (points.length > 1) {
            let index = 0;
            while (index < points.length - 1) {
               points[index] = points[index] * (1 - value) + points[index + 1] * value;
               index++;
            }
            points.pop();
         }
         return points[0];
      }
   },
   cardinal (angle: number): CosmosDirection {
      const trueAngle = angle % 360;
      if (trueAngle < -315 || trueAngle > 315) {
         return 'right';
      } else if (trueAngle <= -225) {
         return 'down';
      } else if (trueAngle < -135) {
         return 'left';
      } else if (trueAngle <= -45) {
         return 'up';
      } else if (trueAngle < 45) {
         return 'right';
      } else if (trueAngle <= 135) {
         return 'down';
      } else if (trueAngle < 225) {
         return 'left';
      } else {
         return 'up';
      }
   },
   intersection (a1: CosmosPointSimple, a2: CosmosPointSimple, b1: CosmosPointSimple, b2: CosmosPointSimple) {
      return (
         CosmosMath.rotation(a1, b1, b2) !== CosmosMath.rotation(a2, b1, b2) &&
         CosmosMath.rotation(a1, a2, b1) !== CosmosMath.rotation(a1, a2, b2)
      );
   },
   rotation (a1: CosmosPointSimple, a2: CosmosPointSimple, a3: CosmosPointSimple) {
      return (a3.y - a1.y) * (a2.x - a1.x) > (a2.y - a1.y) * (a3.x - a1.x);
   },
   linear (value: number, ...points: number[]) {
      if (points.length === 0) {
         return value;
      } else if (points.length === 1) {
         return points[0];
      } else if (value <= 0) {
         return CosmosMath.remap(value, points[0], points[1]);
      } else if (1 <= value) {
         return CosmosMath.remap(value, points[points.length - 2], points[points.length - 1]);
      } else {
         const supervalue = value * (points.length - 1);
         const index = Math.floor(supervalue);
         return CosmosMath.remap(supervalue % 1, points[index], points[index + 1]);
      }
   },
   remap (value: number, min2: number, max2: number, min1 = 0, max1 = 1) {
      return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
   },
   transform (transform: CosmosTransform, object: CosmosObject, camera = { x: 0, y: 0 }, zoom = 1): CosmosTransform {
      const offset = object.position.value();
      for (const suboffset of object.offsets) {
         offset.x += suboffset.x;
         offset.y += suboffset.y;
      }
      return [
         transform[0]
            .add(offset.x * zoom, offset.y * zoom)
            .shift(transform[1], 0, transform[0])
            .add(object.parallax.multiply(camera)),
         transform[1] + object.rotation.value,
         transform[2].multiply(object.scale)
      ];
   },
   wave (value: number) {
      return Math.sin(((value + 0.5) * 2 - 1) * Math.PI) / 2 + 0.5;
   },
   weigh<A> (input: CosmosProvider<[A, number][]>, modifier = Math.random()) {
      const weights = CosmosUtils.provide(input);
      let total = 0;
      for (const entry of weights) {
         total += entry[1];
      }
      const value = modifier * total;
      for (const entry of weights) {
         if (value > (total -= entry[1])) {
            return entry[0];
         }
      }
   }
};
