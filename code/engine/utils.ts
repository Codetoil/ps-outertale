export type CosmosDefined<A> = Exclude<A, null | undefined | void>;
export type CosmosDirection = 'down' | 'left' | 'right' | 'up';
export type CosmosFace = 'bottom' | 'left' | 'right' | 'top';
export type CosmosKeyed<A = any, B extends string = any> = { [x in B]: A };
export type CosmosNot<A, B extends string> = { [x in Exclude<keyof CosmosDefined<A>, B>]?: CosmosDefined<A>[x] };
export type CosmosProvider<A, B extends any[] = []> = A | ((...args: B) => A);
export type CosmosResult<A> = A extends () => Promise<infer B> ? B : never;

export type CosmosBasic =
   | { [k: string | number]: CosmosBasic }
   | CosmosBasic[]
   | string
   | number
   | boolean
   | null
   | undefined
   | void;

export class CosmosModule<A, B extends any[]> {
   name: string;
   script: (...args: B) => Promise<A>;
   promise = null as Promise<A> | null;
   constructor (name: string, script: (...args: B) => Promise<A>) {
      this.name = name;
      this.script = script;
   }
   import (...args: B) {
      CosmosUtils.status(`IMPORT MODULE: ${this.name}`, { color: '#07f' });
      return (this.promise ??= new Promise<A>(async resolve => {
         resolve(await this.script(...args));
         CosmosUtils.status(`MODULE INITIALIZED: ${this.name}`, { color: '#0f0' });
      }));
   }
}

export const CosmosUtils = {
   chain<A, B> (input: A, handler: (input: A, loop: (input: A) => B) => B) {
      const loop = (input: A) => handler(input, loop);
      return loop(input);
   },
   format (text: string, length = Infinity, plain = false) {
      let output = '';
      const raw = CosmosUtils.raw(text);
      const indent = raw[0] === '*';
      if (raw.length > length) {
         let braces = false;
         for (const char of text) {
            output += char;
            switch (char) {
               case '{':
                  braces = true;
                  break;
               case '}':
                  braces = false;
                  break;
               default:
                  if (!braces) {
                     const lines = output.split('\n');
                     const ender = lines[lines.length - 1];
                     if (CosmosUtils.raw(ender).length > length) {
                        const words = ender.split(' ');
                        output = `${lines.slice(0, -1).join('\n')}${lines.length > 1 ? '\n' : ''}${words
                           .slice(0, -1)
                           .join(' ')}\n${indent ? '  ' : ''}${words[words.length - 1]}`;
                     }
                  }
            }
         }
      } else {
         output = text;
      }
      if (plain) {
         return output.replace(/µ/g, ' ');
      } else {
         return output
            .replace(/\- /g, '-{^2} ')
            .replace(/\-\n/g, '-{^2}\n')
            .replace(/\, /g, ',{^3} ')
            .replace(/\,\n/g, ',{^3}\n')
            .replace(/\~ /g, '~{^4} ')
            .replace(/\~\n/g, '~{^4}\n')
            .replace(/\. /g, '.{^5} ')
            .replace(/\.\n/g, '.{^5}\n')
            .replace(/\? /g, '?{^5} ')
            .replace(/\?\n/g, '?{^5}\n')
            .replace(/\! /g, '!{^5} ')
            .replace(/\!\n/g, '!{^5}\n')
            .replace(/\: /g, ':{^5} ')
            .replace(/\:\n/g, ':{^5}\n')
            .replace(/\n\*/g, '{^5}\n*')
            .replace(/µ/g, ' ');
      }
   },
   hyperpromise<A = void> () {
      let hyperresolve: (value: A | PromiseLike<A>) => void;
      const promise = new Promise<A>(resolve => {
         hyperresolve = resolve;
      });
      return { promise, resolve: hyperresolve! };
   },
   import<A = any> (source: string) {
      return fetch(source).then(value => value.json()) as Promise<A>;
   },
   parse<A = any> (text: string): A {
      return JSON.parse(text, (key, value) => {
         if (value === '\x00') {
            return Infinity;
         } else if (value === '\x01') {
            return -Infinity;
         } else if (value === '\x02') {
            return NaN;
         } else {
            return value;
         }
      });
   },
   populate: ((size: number, provider: any) => {
      let index = 0;
      const array: any[] = [];
      while (index < size) {
         array.push(CosmosUtils.provide(provider, index++));
      }
      return array;
   }) as {
      <A extends (index: number) => unknown>(size: number, provider: A): ReturnType<A>[];
      <A>(size: number, provider: A): A[];
   },
   provide<A extends CosmosProvider<unknown, unknown[]>> (
      provider: A,
      ...args: A extends CosmosProvider<infer _, infer C> ? C : never
   ): A extends CosmosProvider<infer B, any[]> ? B : never {
      return typeof provider === 'function' ? provider(...args) : provider;
   },
   raw (text: string) {
      return text.replace(/{[^}]*}|[\[\]]/g, '');
   },
   serialize (value: any) {
      return JSON.stringify(value, (key, value) => {
         if (value === Infinity) {
            return '\x00';
         } else if (value === -Infinity) {
            return '\x01';
         } else if (typeof value === 'number' && value !== value) {
            return '\x02';
         } else {
            return value;
         }
      });
   },
   status (
      text: string,
      {
         backgroundColor = '#000',
         color = '#fff',
         fontFamily = 'monospace',
         fontSize = '16px',
         fontStyle = 'italic',
         fontWeight = 'bold',
         padding = '4px 8px'
      } = {}
   ) {
      console.log(
         `%c${text}`,
         `background-color:${backgroundColor};color:${color};font-family:${fontFamily};font-size:${fontSize};font-style:${fontStyle};font-weight:${fontWeight};padding:${padding};`
      );
   }
};
