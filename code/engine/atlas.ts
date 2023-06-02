import { CosmosEventHost, CosmosRegistry } from './core';
import { CosmosPointSimple } from './numerics';
import { CosmosObject, CosmosRenderer } from './renderer';
import { CosmosDirection, CosmosProvider, CosmosUtils } from './utils';

export class CosmosAtlas<A extends string = string> {
   navigators = new CosmosRegistry<string, CosmosNavigator<A>>(new CosmosNavigator<A>());
   target: A | null = null;
   constructor (map: { [x in A]: CosmosNavigator<A> } = {} as { [x in A]: CosmosNavigator<A> }) {
      this.navigators.register(map);
   }
   attach<B extends CosmosRenderer<any>> (
      renderer: B,
      layer: B extends CosmosRenderer<infer C> ? C : never,
      ...targets: A[]
   ) {
      for (const target of targets) {
         renderer.attach(layer, ...this.navigators.of(target).objects);
      }
   }
   detach<B extends CosmosRenderer<any>> (
      renderer: B,
      layer: B extends CosmosRenderer<infer C> ? C : never,
      ...targets: A[]
   ) {
      for (const target of targets) {
         renderer.detach(layer, ...this.navigators.of(target).objects);
      }
   }
   next () {
      const nav = this.navigator();
      if (nav) {
         const result = CosmosUtils.provide(nav.next, nav) as A | null | void;
         result === void 0 || this.switch(result);
      }
   }
   prev () {
      const nav = this.navigator();
      if (nav) {
         const result = CosmosUtils.provide(nav.prev, nav) as A | null | void;
         result === void 0 || this.switch(result);
      }
   }
   navigator () {
      return this.target === null ? null : this.navigators.of(this.target);
   }
   seek (direction: CosmosDirection) {
      const nav = this.navigator();
      if (nav) {
         const prev = nav.selection();
         const x = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
         const y = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
         const row = CosmosUtils.provide(nav.grid, nav);
         nav.position.x = Math.min(nav.position.x, row.length - 1) + (nav.flip ? y : x);
         if (nav.position.x < 0) {
            nav.position.x = row.length - 1;
         } else if (row.length <= nav.position.x) {
            nav.position.x = 0;
         }
         const column = row[nav.position.x] ?? [];
         nav.position.y = Math.min(nav.position.y, column.length - 1) + (nav.flip ? x : y);
         if (nav.position.y < 0) {
            nav.position.y = column.length - 1;
         } else if (column.length <= nav.position.y) {
            nav.position.y = 0;
         }
         const next = nav.selection();
         prev === next || nav.fire('change', prev, next);
      }
   }
   switch (target: A | null) {
      if (target !== void 0) {
         let next: CosmosNavigator<A> | null = null;
         if (typeof target === 'string') {
            next = this.navigators.of(target);
         }
         const nav = this.navigator();
         nav && nav.fire('to', target, nav);
         next && next.fire('from', this.target, nav);
         this.target = target;
      }
   }
}

export class CosmosNavigator<A extends string = string, B extends any = any> extends CosmosEventHost<
   { [x in 'from' | 'to']: [A | null | void, CosmosNavigator<A, B> | null] } & { change: [B, B] }
> {
   flip: boolean;
   grid: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
   next: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   objects: CosmosObject[];
   position: CosmosPointSimple;
   prev: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   constructor ({
      flip = false,
      grid = [],
      next = void 0,
      objects = [],
      position: { x = 0, y = 0 } = {},
      prev = void 0
   }: {
      flip?: boolean;
      grid?: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
      next?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
      objects?: CosmosObject[];
      position?: Partial<CosmosPointSimple>;
      prev?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   } = {}) {
      super();
      this.flip = flip;
      this.grid = grid;
      this.next = next;
      this.objects = objects;
      this.position = { x, y };
      this.prev = prev;
   }
   selection () {
      return (CosmosUtils.provide(this.grid)[this.position.x] ?? [])[this.position.y];
   }
}
