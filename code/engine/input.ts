import { CosmosEventHost } from './core';

export class CosmosKeyboardInput extends CosmosEventHost<{ down: [string | null]; up: [string | null] }> {
   private $input = { codes: [] as string[], force: false };
   get force () {
      return this.$input.force;
   }
   set force (value) {
      if (value !== this.$input.force) {
         this.$input.force = value;
         if (value) {
            this.fire('down', null);
         } else {
            this.fire('up', null);
         }
      }
   }
   constructor (target: HTMLElement | null, ...codes: string[]) {
      super();
      ((target ?? window) as HTMLElement).addEventListener('keyup', ({ code }) => {
         if (codes.includes(code) && this.$input.codes.includes(code)) {
            this.$input.codes.splice(this.$input.codes.indexOf(code));
            this.fire('up', code);
         }
      });
      ((target ?? window) as HTMLElement).addEventListener('keydown', ({ code }) => {
         if (codes.includes(code) && !this.$input.codes.includes(code)) {
            this.$input.codes.push(code);
            this.fire('down', code);
         }
      });
   }
   active () {
      return this.force || this.$input.codes.length > 0;
   }
   reset () {
      this.$input.codes = [];
   }
}
