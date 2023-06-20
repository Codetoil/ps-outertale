import { CosmosMath, CosmosValue } from './numerics';
import { CosmosBasic, CosmosKeyed, CosmosUtils } from './utils';

export type CosmosTimerEvents = { tick: [number] };

export class CosmosAsset<A = any> {
   private $asset = { owners: [] as CosmosAsset[], promise: null as Promise<A> | null, value: null as A | null };
   source: string;
   constructor (source: string) {
      this.source = source;
   }
   get value () {
      if (this.$asset.value === null) {
         throw new Error(`Asset not loaded.\n\tsource: ${this.source.split('\n').join('\n\tsource: ')}`);
      } else {
         return this.$asset.value;
      }
   }
   async load (owner: CosmosAsset = this) {
      this.$asset.owners.includes(owner) || this.$asset.owners.push(owner);
      const promise = (this.$asset.promise ??= this.loader());
      await promise.then(value => {
         this.$asset.promise === promise && (this.$asset.value = value);
      });
   }
   async loader () {
      return void 0 as A;
   }
   unload (owner: CosmosAsset = this) {
      this.$asset.owners.includes(owner) && this.$asset.owners.splice(this.$asset.owners.indexOf(owner), 1);
      if (this.$asset.owners.length === 0) {
         this.$asset.value = this.$asset.promise = null;
         this.unloader();
      }
   }
   unloader () {}
}

export class CosmosCache<A, B> extends Map<A, B> {
   compute: (key: A) => B;
   constructor (compute: (key: A) => B) {
      super();
      this.compute = compute;
   }
   of (key: A) {
      this.has(key) || this.set(key, this.compute(key));
      return this.get(key)!;
   }
}

export class CosmosStringData<A extends string = string> extends CosmosAsset<A> {
   async loader () {
      return fetch(this.source).then(response => response.text()) as Promise<A>;
   }
}

export class CosmosData<A extends CosmosBasic = CosmosBasic> extends CosmosAsset<A> {
   async loader () {
      return CosmosUtils.import<A>(this.source);
   }
}

export type CosmosEventHandler<A extends any, B extends any[] = any> =
   | CosmosEventListener<A, B>
   | { listener: CosmosEventListener<A, B>; priority: number };

export type CosmosEventListener<A extends any, B extends any[]> = (this: A, ...data: B) => any;

export class CosmosEventHost<A extends { [x in string]: any[] } = {}> {
   events: { [x in keyof A]?: { handlers: CosmosEventHandler<any, A[x]>[]; priorities: number } } = {};
   fire<B extends keyof A> (name: B, ...data: A[B]) {
      const event = this.events[name];
      if (event) {
         return event.handlers.slice().map(handler => {
            return (typeof handler === 'function' ? handler : handler.listener).call(this, ...data);
         });
      } else {
         return [];
      }
   }
   off<B extends keyof A> (name: B, handler: CosmosEventHandler<this, A[B]>) {
      const event = this.events[name];
      if (event) {
         const index = event.handlers.indexOf(handler);
         if (index > -1) {
            event.handlers.splice(index, 1);
            if (typeof handler === 'object' && handler.priority !== 0) {
               event.priorities--;
            }
         }
      }
      return this;
   }
   on<B extends keyof A>(name: B): Promise<A[B]>;
   on<B extends keyof A>(name: B, priority: number): Promise<A[B]>;
   on<B extends keyof A>(name: B, listener: CosmosEventHandler<this, A[B]>): this;
   on<B extends keyof A> (name: B, a2: number | CosmosEventHandler<this, A[B]> = 0) {
      if (typeof a2 === 'number') {
         return new Promise(resolve => {
            const singleton = {
               listener: (...data: A[B]) => {
                  this.off(name, singleton);
                  resolve(data);
               },
               priority: a2
            };
            this.on(name, singleton);
         });
      } else {
         const event = (this.events[name] ??= { handlers: [] as CosmosEventHandler<this, A[B]>[], priorities: 0 });
         event.handlers.push(a2);
         if (typeof a2 === 'object' && a2.priority !== 0) {
            event.priorities++;
         }
         if (event.priorities > 0) {
            event.handlers.sort(
               (handler1, handler2) =>
                  (typeof handler1 === 'function' ? 0 : handler1.priority) -
                  (typeof handler2 === 'function' ? 0 : handler2.priority)
            );
         }
         return this;
      }
   }
   /** @deprecated */
   on_legacy<B extends keyof A> (name: B, provider: (host: this) => CosmosEventHandler<this, A[B]>) {
      return this.on(name, provider(this));
   }
}

export class CosmosInventory<A extends CosmosAsset[] = CosmosAsset[]> extends CosmosAsset<A> {
   assets: A;
   constructor (...assets: A) {
      super(assets.map(asset => asset.source).join('\n'));
      this.assets = assets;
   }
   async loader () {
      await Promise.all(this.assets.map(asset => asset.load(this)));
      return this.assets;
   }
   unloader () {
      for (const asset of this.assets) {
         asset.unload(this);
      }
   }
}

export class CosmosRegistry<A extends string, B> extends Map<A, B> {
   placeholder: B;
   constructor (placeholder: B) {
      super();
      this.placeholder = placeholder;
   }
   of (key: A) {
      return this.has(key) ? this.get(key)! : this.placeholder;
   }
   register<C extends B>(key: A, value: C): C;
   register<C extends B>(properties: CosmosKeyed<C, A>): this;
   register<C extends B> (a1: A | CosmosKeyed<C, A>, value?: C) {
      if (typeof a1 === 'string') {
         this.set(a1, value!);
         return value!;
      } else {
         for (const key in a1) {
            this.set(key, a1[key]);
         }
         return this;
      }
   }
}

export class CosmosTimer<A extends CosmosTimerEvents = CosmosTimerEvents> extends CosmosEventHost<A> {
   private $timer = { now: 0, task: null as ReturnType<typeof setInterval> | null };
   posts: (() => void)[] = [];
   speed = new CosmosValue(1);
   tasks = new Map<any, () => void>();
   value = 0;
   whens: { condition: () => boolean; resolve: () => void }[] = [];
   async pause (duration = 0) {
      if (duration === Infinity) {
         return new Promise<void>(() => {});
      } else {
         const time = this.value + duration;
         return this.when(() => time <= this.value);
      }
   }
   post () {
      return new Promise<void>(resolve => this.posts.push(resolve));
   }
   start (value = 0) {
      this.value = value;
      if (this.$timer.task === null) {
         this.$timer.now = performance.now();
         this.$timer.task = setInterval(() => {
            let speed = this.speed.value;
            const now = performance.now();
            const diff = (now - this.$timer.now);
            while (speed > 0) {
               const delta = diff * Math.min(speed, CosmosMath.FRAME / 5);
               this.value += delta;
               for (const when of this.whens) {
                  if (when.condition()) {
                     this.whens.splice(this.whens.indexOf(when), 1);
                     when.resolve();
                  }
               }
               this.fire('tick', delta);
               for (const post of this.posts.splice(0, this.posts.length)) {
                  post();
               }
               this.$timer.now = now;
               speed -= CosmosMath.FRAME / 5;
            }
         }, 5);
      }
   }
   stop () {
      if (this.$timer.task !== null) {
         clearInterval(this.$timer.task);
         this.$timer.task = null;
      }
   }
   when (condition: () => boolean) {
      const { promise, resolve } = CosmosUtils.hyperpromise();
      this.whens.push({ condition, resolve });
      return promise;
   }
}
