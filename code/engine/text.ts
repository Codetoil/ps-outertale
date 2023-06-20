import { BitmapFont, Container, Sprite, TextMetrics, TextStyle, Texture } from 'pixi.js';
import { CosmosDaemon } from './audio';
import { CosmosEventHost, CosmosTimer } from './core';
import { CosmosBitmap, CosmosColor, CosmosImage } from './image';
import { CosmosArea, CosmosMath, CosmosPoint, CosmosPointSimple } from './numerics';
import {
   CosmosAnchoredObject,
   CosmosAnchoredObjectProperties,
   CosmosBaseEvents,
   CosmosMetadata,
   CosmosRenderer,
   CosmosStyle
} from './renderer';
import { CosmosKeyed, CosmosUtils } from './utils';

export type CosmosFont = { glyphs: { [x in string]: CosmosGlyph }; shift: CosmosPointSimple; size: number };

export type CosmosFontData = {
   name: string;
   glyphs: CosmosGlyphData[];
   shift: CosmosPointSimple;
   size: number;
};

export type CosmosGlyph = { margin: number; metrics: CosmosArea; texture: Texture };
export type CosmosGlyphData = { area: CosmosArea; code: string; margin: number; metrics: CosmosArea };

export interface CosmosTextProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   charset?: string;
   content?: string;
   phase?: number;
   plain?: boolean;
   spacing?: Partial<CosmosPointSimple> | number;
}

export class CosmosText<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   private $text = {
      anchor: { x: -1, y: -1 },
      subcontainer: new Container(),
      charset: '',
      content: '',
      dirty: false,
      plain: false,
      spacing: { x: 0, y: 0 },
      style: Object.assign({}, CosmosRenderer.style),
      visible: false
   };
   static charset = '/0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   charset: string;
   content: string;
   phase: number;
   plain: boolean;
   spacing: CosmosPointSimple;
   constructor (properties: CosmosTextProperties<B> = {}) {
      super(properties);
      (({
         charset = CosmosText.charset,
         content = '',
         phase = 0,
         plain = false,
         spacing = 0
      }: CosmosTextProperties<B> = {}) => {
         this.charset = charset;
         this.content = content;
         this.phase = phase;
         this.plain = plain;
         this.spacing = new CosmosPoint(spacing).value();
      })(properties);
   }
   compute () {
      const [ fontSize, fontName ] = this.$text.style.font.split('px ');
      const font = CosmosFont.storage[fontName];
      if (font) {
         const fontScale = +fontSize / font.size;
         const lines = this.content
            .replace(/§(.*?)§/g, '')
            .split('\n')
            .map(section => {
               if (section.length > 0) {
                  return (
                     CosmosFont.metrics(fontName, section, fontScale).x +
                     this.spacing.x * Math.max(section.length - 1, 0)
                  );
               } else {
                  return 0;
               }
            });
         const metrics = CosmosFont.metrics(fontName, this.charset, fontScale);
         return new CosmosPoint(Math.max(...lines), metrics.y + (metrics.y + this.spacing.y) * (lines.length - 1));
      } else {
         return new CosmosPoint();
      }
   }
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      this.phase++;
      super.tick(camera, scale, style);
   }
   draw (style: CosmosStyle) {
      if (this.container.alpha > 0) {
         if (!this.$text.visible) {
            this.$text.visible = true;
            this.container.addChildAt(this.$text.subcontainer, 0);
         }
         let update = false;
         if (this.anchor.x !== this.$text.anchor.x) {
            update = true;
            this.$text.anchor.x = this.anchor.x;
         }
         if (this.anchor.y !== this.$text.anchor.y) {
            update = true;
            this.$text.anchor.y = this.anchor.y;
         }
         if (this.charset !== this.$text.charset) {
            update = true;
            this.$text.charset = this.charset;
         }
         if (this.content !== this.$text.content) {
            update = true;
            this.$text.content = this.content;
         }
         if (this.plain !== this.$text.plain) {
            update = true;
            this.$text.plain = this.plain;
         }
         if (this.spacing.x !== this.$text.spacing.x) {
            update = true;
            this.$text.spacing.x = this.spacing.x;
         }
         if (this.spacing.y !== this.$text.spacing.y) {
            update = true;
            this.$text.spacing.y = this.spacing.y;
         }
         if (style.blend !== this.$text.style.blend) {
            update = true;
            this.$text.style.blend = style.blend;
         }
         if (style.border !== this.$text.style.border) {
            update = true;
            this.$text.style.border = style.border;
         }
         if (style.fill !== this.$text.style.fill) {
            update = true;
            this.$text.style.fill = style.fill;
         }
         if (style.font !== this.$text.style.font) {
            update = true;
            this.$text.style.font = style.font;
         }
         if (style.stroke !== this.$text.style.stroke) {
            update = true;
            this.$text.style.stroke = style.stroke;
         }
         if (style.tint !== this.$text.style.tint) {
            update = true;
            this.$text.style.tint = style.tint;
         }
         if (this.$text.dirty) {
            update = true;
            this.$text.dirty = false;
         }
         if (update) {
            let index = 0;
            let mystify = '';
            const blend = style.blend;
            const offset = { x: 0, y: 0 };
            const phase = this.phase / CosmosMath.FRAME;
            const random = { x: 0, y: 0 };
            const state = Object.assign({}, style);
            const swirl = { p: 0, r: 0, s: 0 };
            const [ fontSize, fontName ] = style.font.split('px ');
            const font = CosmosFont.storage[fontName];
            if (font) {
               const fontScale = +fontSize / font.size;
               const metrics = CosmosFont.metrics(fontName, this.charset, fontScale);
               const half = this.compute().divide(2);
               const base = new CosmosPoint(this.container.position.x, this.container.position.y).subtract(
                  half.add(half.multiply(this.anchor))
               );
               this.$text.subcontainer.removeChildren();
               while (index < this.content.length) {
                  let char = this.content[index++];
                  if (char === '\n') {
                     offset.x = 0;
                     offset.y += metrics.y + this.spacing.y;
                  } else if (!this.plain && char === '§') {
                     const code = this.content.slice(index, this.content.indexOf('§', index));
                     const [ key, value ] = code.split(':');
                     index += code.length + 1;
                     switch (key) {
                        case 'fill':
                           state.fill = value;
                           break;
                        case 'offset':
                           const [ offsetX, offsetY ] = value.split(',').map(value => +value);
                           offset.x = offsetX || 0;
                           offset.y = offsetY || 0;
                           break;
                        case 'random':
                           const [ randomX, randomY ] = value.split(',').map(value => +value);
                           random.x = randomX || 0;
                           random.y = randomY || 0;
                           break;
                        case 'stroke':
                           const strokeColor = CosmosImage.utils.color.of(value);
                           state.border = strokeColor[3] > 0 ? state.border : 0;
                           state.stroke = value;
                           break;
                        case 'swirl':
                           const [ swirlR, swirlS, swirlP ] = value.split(',').map(value => +value);
                           swirl.r = swirlR || 0;
                           swirl.s = swirlS || 0;
                           swirl.p = swirlP || 0;
                           break;
                        case 'mystify':
                           mystify = value;
                           mystify === '' || (this.$text.dirty = true);
                           break;
                     }
                     if (random.x > 0 || random.y > 0 || (swirl.s > 0 && swirl.r > 0)) {
                        this.$text.dirty = true;
                     }
                  } else {
                     let x = base.x - state.border / 2 + offset.x;
                     let y = base.y - state.border / 2 + offset.y;
                     if (random.x > 0) {
                        x += random.x * (Math.random() - 0.5);
                     }
                     if (random.y > 0) {
                        y += random.y * (Math.random() - 0.5);
                     }
                     if (swirl.s > 0 && swirl.r > 0) {
                        const endpoint = new CosmosPoint(x, y).endpoint(
                           ((phase * 360 * swirl.s) % 360) + index * (360 / swirl.p),
                           swirl.r
                        );
                        x = endpoint.x;
                        y = endpoint.y;
                     }
                     if (font) {
                        mystify === '' || (char = (x => x[Math.floor(Math.random() * x.length)])(mystify.split('')));
                        const info = font.glyphs[char.charCodeAt(0)];
                        if (info) {
                           const fill = CosmosImage.utils.color.of(state.fill);
                           const sprite = new Sprite(info.texture);
                           sprite.alpha = 1;
                           sprite.position.set(
                              x + info.metrics.x - this.container.position.x + font.shift.x,
                              y + info.metrics.y - this.container.position.y + font.shift.y
                           );
                           sprite.scale.set(fontScale);
                           sprite.blendMode = blend;
                           sprite.tint = CosmosBitmap.color2hex(fill);
                           this.$text.subcontainer.addChild(sprite);
                        }
                        offset.x += CosmosFont.metrics(fontName, char, fontScale).x + this.spacing.x;
                     }
                  }
               }
            } else {
               this.$text.dirty = true;
            }
         }
      } else if (this.$text.visible) {
         this.$text.visible = false;
         this.container.removeChildAt(0);
      }
   }
}

export interface CosmosTyperProperties {
   interval?: number;
   magic?: string;
   sounds?: CosmosDaemon[];
   threshold?: number;
   timer?: CosmosTimer;
   variables?: CosmosKeyed;
}

export class CosmosTyper extends CosmosEventHost<
   { [x in 'char' | 'code' | 'header' | 'text']: [string] } & { [x in 'empty' | 'idle' | 'read' | 'skip']: [] }
> {
   private $typer = { lines: [] as string[], ready: true, skip: true };
   content = '';
   interval: number;
   magic: string;
   mode: 'empty' | 'idle' | 'read' | 'skip' = 'empty';
   sounds: CosmosDaemon[] = [];
   threshold: number;
   timer: CosmosTimer;
   variables: CosmosKeyed;
   constructor ({
      interval = 50,
      magic = '',
      sounds = [],
      threshold = 0,
      timer = new CosmosTimer(),
      variables = {}
   }: CosmosTyperProperties = {}) {
      super();
      this.interval = interval;
      this.magic = magic;
      this.sounds = sounds;
      this.threshold = threshold;
      this.timer = timer;
      this.variables = variables;
   }
   emit (content: string) {
      this.content = content;
      if (
         this.$typer.ready &&
         this.sounds.length > 0 &&
         this.mode === 'read' &&
         content.length > 0 &&
         !content[content.length - 1].match(/[\s\µ]/)
      ) {
         const instance = this.sounds[Math.floor(Math.random() * this.sounds.length)].instance(this.timer);
         if (this.threshold > 0) {
            const threshold = this.threshold;
            this.$typer.ready = false;
            this.timer.pause(instance.daemon.audio.value!.duration * 1000 * threshold).then(() => {
               this.$typer.ready = true;
            });
         }
      }
      this.fire('text', content);
   }
   read (force?: boolean) {
      if (force) {
         switch (this.mode) {
            case 'read':
               this.skip(true);
            case 'skip':
               this.on('idle')
                  .then(() => this.timer.pause())
                  .then(() => this.read());
         }
      } else if (this.mode === 'idle') {
         this.fire('read');
      }
   }
   skip (force?: boolean) {
      (this.$typer.skip || force) && this.mode === 'read' && ((this.mode = 'skip'), this.fire('skip'));
   }
   async text (...lines: string[]) {
      if (this.mode === 'empty') {
         this.fire('read');
         for (let line of lines
            .map(line => {
               for (const [ key, value ] of Object.entries(this.variables)) {
                  line = line.split(`$(${key})`).join(value);
               }
               if (line[0] === '<') {
                  const plain = line[1] === '#';
                  const segments = line.slice(plain ? 2 : 1).split('>');
                  line = CosmosUtils.format(segments.slice(1).join('>'), +segments[0], plain);
               }
               return line.trim();
            })
            .filter(line => line.length > 0)) {
            this.mode = 'read';
            let aurd = false;
            let index = 0;
            let advance = false;
            while (advance === false && index < line.length) {
               const char = line[index++];
               const skip = (this.mode as string) === 'skip';
               if (char === '{') {
                  const code = line.slice(index, line.indexOf('}', index));
                  const data = code.slice(1);
                  index += code.length + 1;
                  this.fire('code', code);
                  switch (code[0]) {
                     case '~':
                        line = line.slice(0, index) + this.magic + line.slice(index);
                        break;
                     case '!':
                        skip || this.skip(code[1] === '!');
                        break;
                     case '@':
                        this.$typer.lines.push(`§${data}§`);
                        break;
                     case '#':
                        this.fire('header', data);
                        break;
                     case '$':
                        this.$typer.lines.push(data);
                        break;
                     case '%':
                        if (data.length > 0) {
                           aurd = true;
                           this.timer.pause(Number(data) * this.interval).then(() => {
                              aurd && this.fire('read');
                           });
                        } else {
                           advance = true;
                        }
                        break;
                     case '^':
                        skip || (await Promise.race([ this.on('skip'), this.timer.pause(Number(data) * this.interval) ]));
                        break;
                     case '&':
                        this.$typer.lines.push(String.fromCharCode(parseInt(data, 16)));
                        break;
                     case '*':
                        this.$typer.skip = false;
                        break;
                  }
               } else {
                  this.fire('char', char);
                  skip || (await Promise.race([ this.on('skip'), this.timer.pause(this.interval) ]));
                  this.$typer.lines.push(char);
                  skip || this.emit(this.$typer.lines.join(''));
               }
            }
            (this.mode as string) === 'skip' && this.emit(this.$typer.lines.join(''));
            this.fire('idle');
            this.mode = 'idle';
            this.$typer.lines = [];
            this.$typer.skip = true;
            advance || (await this.on('read'));
            aurd = false;
         }
         this.emit('');
         this.fire('empty');
         this.mode = 'empty';
      } else {
         switch (this.mode) {
            case 'read':
               this.skip(true);
            case 'skip':
               await this.on('idle');
               await this.timer.pause();
            case 'idle':
               this.read();
               await this.timer.pause();
               await this.text(...lines);
         }
      }
   }
}

export const CosmosFont = {
   async create (
      name: string,
      size: number,
      shift: CosmosPointSimple,
      chars: string,
      resolution: number,
      cols = 10,
      preprocessor = (code: string, colors: CosmosColor[][]) => colors
   ) {
      const style = new TextStyle({ fontFamily: name, fontSize: size, fill: 'white', padding: 20 });
      const font = BitmapFont.from(name, style, {
         chars,
         resolution,
         textureHeight: resolution * 100,
         textureWidth: resolution * 100
      });
      const entries = chars
         .split('')
         .map(char => char.charCodeAt(0).toString())
         .map(code => {
            const value = font.chars[code];
            return [ code, value ] as [typeof code, typeof value];
         });
      const [ page, info ] = CosmosBitmap.merge(
         entries.map(entry => preprocessor(entry[0], CosmosBitmap.texture2colors(entry[1].texture))),
         cols
      );
      const data: CosmosFontData = {
         name,
         glyphs: await Promise.all(
            entries.map(async ([ code, char ], index): Promise<CosmosGlyphData> => {
               const submetrics = TextMetrics.measureText(String.fromCharCode(+code), style);
               return {
                  area: info[index],
                  code,
                  margin: char.xAdvance ?? 0,
                  metrics: {
                     height: submetrics.height,
                     width: submetrics.width,
                     x: char.xOffset ?? 0,
                     y: char.yOffset ?? 0
                  }
               };
            })
         ),
         shift,
         size
      };
      font.destroy();
      return { data, source: await CosmosBitmap.colors2base(page) };
   },
   async import (source: string, { name, glyphs, shift, size }: CosmosFontData) {
      const page = await CosmosBitmap.base2colors(source);
      return {
         name,
         font: {
            glyphs: Object.fromEntries(
               await Promise.all(
                  glyphs.map(async ({ area, code, margin, metrics }, index) => {
                     return [
                        code,
                        { margin, metrics, texture: CosmosBitmap.colors2texture(CosmosBitmap.split(page, [ area ])[0]) }
                     ] as [string, CosmosGlyph];
                  })
               )
            ),
            shift,
            size
         }
      };
   },
   async load (fonts: string[], time = 300) {
      const elements = fonts.map(name => {
         const element = document.createElement('div');
         element.style.fontFamily = name;
         element.style.opacity = '0';
         element.textContent = 'x';
         document.body.appendChild(element);
         return element;
      });
      await new Promise(resolve => setTimeout(resolve, time));
      for (const element of elements) {
         element.remove();
      }
   },
   metrics (name: string, content: string, scale: number) {
      if (name in CosmosFont.storage) {
         let x = 0;
         let y = 0;
         let index = 0;
         const font = CosmosFont.storage[name];
         while (index < content.length) {
            const info = font.glyphs[content.charCodeAt(index++)];
            if (info) {
               x += (info.metrics.x + info.metrics.width + info.margin) / 2;
               y = Math.max(y, info.metrics.y + info.metrics.height);
            }
         }
         return new CosmosPoint(x, y).multiply(scale);
      } else {
         return new CosmosPoint();
      }
   },
   register (name: string, font: CosmosFont) {
      CosmosFont.storage[name] = font;
   },
   storage: {} as { [x in string]: CosmosFont },
   unregister (name: string) {
      delete CosmosFont.storage[name];
   }
};
