import { BaseTexture, Extract, Graphics, Renderer, Sprite, Texture } from 'pixi.js';
import { CosmosAsset, CosmosCache, CosmosData, CosmosInventory } from './core';
import { CosmosArea, CosmosDimensions, CosmosPoint, CosmosPointSimple } from './numerics';
import {
   CosmosAnchoredObject,
   CosmosAnchoredObjectProperties,
   CosmosBaseEvents,
   CosmosMetadata,
   CosmosStyle
} from './renderer';
import { CosmosFace, CosmosNot, CosmosUtils } from './utils';

export type CosmosColor = [number, number, number, number];
export type CosmosCrop = { [x in CosmosFace]: number };
export type CosmosPixelShader = (color: CosmosColor, position: CosmosPointSimple, pixels: Uint8Array) => CosmosColor;

export type CosmosAnimationInfo = {
   frames: {
      duration: number;
      frame: {
         x: number;
         y: number;
         w: number;
         h: number;
      };
      spriteSourceSize: {
         x: number;
         y: number;
      };
   }[];
   meta: {
      frameTags: {
         name: string;
         from: number;
         to: number;
      }[];
   };
};

export class CosmosImage extends CosmosAsset<Texture> {
   private static $image = { extract: null as Extract | null };
   static cache = new CosmosCache(async (key: string) => {
      const texture = BaseTexture.from(key);
      await texture.resource.load();
      return new Texture(texture);
   });
   static default = new Texture(new BaseTexture());
   static get extract () {
      return (this.$image.extract ??= new Extract(new Renderer({ antialias: false, backgroundAlpha: 0 })));
   }
   static utils = {
      area (source: CosmosDimensions, crop: CosmosCrop): CosmosArea {
         const x = (crop.left < 0 ? source.width : 0) + crop.left;
         const y = (crop.top < 0 ? source.height : 0) + crop.top;
         return {
            height: (crop.bottom < 0 ? 0 : source.height) - crop.bottom - y,
            width: (crop.right < 0 ? 0 : source.width) - crop.right - x,
            x,
            y
         };
      },
      // TODO: use a proper CSS color parser
      color: new CosmosCache<string, CosmosColor>(key => {
         const element = document.createElement('x');
         element.style.color = key;
         document.body.appendChild(element);
         const color = getComputedStyle(element)
            .color.split('(')[1]
            .slice(0, -1)
            .split(', ')
            .map(value => +value);
         element.remove();
         color.length === 3 && color.push(1);
         return color as CosmosColor;
      }),
      crop (area: CosmosArea): CosmosCrop {
         return { bottom: area.height - area.y, left: area.x, right: area.width - area.x, top: area.y };
      },
      synthesize (colors: CosmosColor[][]) {
         return createImageBitmap(new ImageData(new Uint8ClampedArray(colors.flat(2)), colors.length));
      }
   };
   shader: CosmosPixelShader | null;
   sprites = new Set<Sprite>();
   constructor (source: string, shader: CosmosPixelShader | null = null) {
      super(source);
      this.shader = shader;
   }
   async loader () {
      let texture = await CosmosImage.cache.of(this.source);
      if (this.shader) {
         const pixels = CosmosBitmap.texture2pixels(texture);
         let x = 0;
         let y = 0;
         while (y < texture.height) {
            while (x < texture.width) {
               const z = (x + y * texture.width) * 4;
               const color = this.shader([ pixels[z], pixels[z + 1], pixels[z + 2], pixels[z + 3] ], { x, y }, pixels);
               pixels[z] = color[0];
               pixels[z + 1] = color[1];
               pixels[z + 2] = color[2];
               pixels[z + 3] = color[3];
               x++;
            }
            x = 0;
            y++;
         }
         texture = CosmosBitmap.pixels2texture(pixels, texture);
      }
      for (const sprite of this.sprites) {
         sprite.texture = texture;
      }
      return texture;
   }
   unloader () {
      for (const sprite of this.sprites) {
         sprite.texture = CosmosImage.default;
      }
   }
}

export interface CosmosSpriteProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   active?: boolean;
   crop?: Partial<CosmosCrop>;
   duration?: number;
   frames?: (CosmosImage | null)[];
   index?: number;
   reverse?: boolean;
   step?: number;
}

export class CosmosSprite<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   private $sprite = { image: null as CosmosImage | null, visible: false };
   active = false;
   crop: CosmosCrop;
   duration: number;
   frames: (CosmosImage | null)[];
   readonly graphics = new Graphics();
   index: number;
   reverse: boolean;
   readonly sprite = new Sprite();
   step: number;
   constructor (properties: CosmosSpriteProperties<B> = {}) {
      super(properties);
      (({
         active = false,
         crop: { bottom = 0, left = 0, right = 0, top = 0 } = {},
         duration = 1,
         frames = [],
         index = 0,
         reverse = false,
         step = 0
      }: CosmosSpriteProperties<B> = {}) => {
         this.active = active;
         this.crop = { bottom, left, right, top };
         this.duration = duration;
         this.frames = frames;
         this.index = index;
         this.reverse = reverse;
         this.step = step;
      })(properties);
   }
   advance () {
      if (this.active && this.duration <= ++this.step) {
         this.step = 0;
         this.index += this.reverse ? -1 : 1;
         if (this.index < 0) {
            this.index = this.frames.length - 1;
         } else if (this.frames.length <= this.index) {
            this.index = 0;
         }
      }
   }
   compute () {
      const image = this.frames.at(this.index % this.frames.length);
      if (image?.value) {
         const area = CosmosImage.utils.area(image.value, this.crop);
         return new CosmosPoint(area.width, area.height);
      } else {
         return super.compute();
      }
   }
   disable () {
      this.active = false;
      return this;
   }
   draw (style: CosmosStyle) {
      if (this.alpha.value > 0) {
         const graphics = this.graphics;
         const sprite = this.sprite;
         if (!this.$sprite.visible) {
            this.container.addChildAt(graphics, 0);
            this.container.addChildAt(sprite, 1);
            this.$sprite.visible = true;
         }
         const prev = this.$sprite.image;
         const next = this.frames.at(this.index % this.frames.length) ?? null;
         if (prev !== next) {
            prev?.sprites.delete(sprite);
            next?.sprites.add(sprite);
            if (next?.value) {
               sprite.texture = next.value;
            } else {
               sprite.texture = CosmosImage.default;
            }
            this.$sprite.image = next;
         }
         if (sprite.texture.baseTexture) {
            const a = (this.anchor.x + 1) / 2;
            const b = (this.anchor.y + 1) / 2;
            const { x, y, width, height } = CosmosImage.utils.area(sprite.texture, this.crop);
            graphics.pivot.set(width * a, height * b);
            graphics.clear().beginFill(0xff0000, 1).drawRect(0, 0, width, height).endFill();
            sprite.anchor.set((x + width * a) / sprite.texture.width, (y + height * b) / sprite.texture.height);
            sprite.blendMode = style.blend;
            sprite.mask = graphics;
            sprite.tint = style.tint;
         }
      } else if (this.$sprite.visible) {
         this.container.removeChildAt(1);
         this.container.removeChildAt(0);
         this.$sprite.visible = false;
      }
   }
   enable (duration = this.duration) {
      this.active = true;
      this.duration = duration;
      return this;
   }
   read (): CosmosColor[][] {
      const image = this.frames.at(this.index % this.frames.length);
      if (image?.value) {
         return CosmosBitmap.texture2colors(image.value, this.crop);
      } else {
         return [ [] ];
      }
   }
   reset () {
      this.active = false;
      this.index = 0;
      this.step = 0;
      return this;
   }
   tick (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      this.advance();
      super.tick(camera, scale, style);
   }
}

export class CosmosAnimationResources extends CosmosInventory<[CosmosImage, CosmosData<CosmosAnimationInfo>]> {
   image: CosmosImage;
   data: CosmosData<CosmosAnimationInfo>;
   constructor (image: CosmosImage, data: CosmosData<CosmosAnimationInfo>) {
      super(image, data);
      this.image = image;
      this.data = data;
   }
}

export type CosmosAnimationProperties<A extends CosmosMetadata = CosmosMetadata> = CosmosNot<
   CosmosSpriteProperties<A>,
   'crop' | 'frames'
> & {
   extrapolate?: boolean;
   resources?: CosmosAnimationResources | null;
   subcrop?: Partial<CosmosCrop>;
};

export class CosmosAnimation<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSprite<A, B> {
   private $animation = { resources: null as CosmosAnimationResources | null };
   extrapolate: boolean;
   resources: CosmosAnimationResources | null;
   subcrop: CosmosCrop;
   constructor (properties: CosmosAnimationProperties<B> = {}) {
      super(properties);
      (({
         extrapolate = true,
         resources,
         subcrop: { bottom = 0, left = 0, right = 0, top = 0 } = {}
      }: CosmosAnimationProperties<B> = {}) => {
         this.extrapolate = extrapolate;
         this.resources = resources ?? null;
         this.subcrop = { bottom, left, right, top };
      })(properties);
   }
   draw (style: CosmosStyle) {
      this.populate();
      if (this.resources?.value) {
         const data = this.resources.data.value;
         if (data) {
            const info = data.frames[this.index];
            if (info) {
               const { duration, frame } = info;
               const { x, y, width, height } = CosmosImage.utils.area(
                  { height: frame.h, width: frame.w },
                  this.subcrop
               );
               this.crop.bottom = -(frame.y + y + height);
               this.crop.left = frame.x + x;
               this.crop.right = -(frame.x + x + width);
               this.crop.top = frame.y + y;
               this.extrapolate && (this.duration = Math.round(duration / (1000 / 30)));
            }
         }
      }
      super.draw(style);
   }
   populate () {
      if (this.$animation.resources !== this.resources) {
         this.resources?.value &&
            (this.frames = CosmosUtils.populate(this.resources!.data.value!.frames.length, this.resources!.image));
         this.$animation.resources = this.resources;
      }
   }
   use (resources: CosmosAnimationResources | null) {
      this.resources = resources;
      if (this.active) {
         this.reset().enable();
      } else {
         this.reset();
      }
      return this;
   }
}

export const CosmosBitmap = {
   async base2texture (base: string) {
      return await CosmosImage.cache.of(base);
   },
   async base2pixels (base: string) {
      return CosmosBitmap.texture2pixels(await CosmosBitmap.base2texture(base));
   },
   async base2colors (base: string) {
      return CosmosBitmap.texture2colors(await CosmosBitmap.base2texture(base));
   },
   color2hex (color: CosmosColor) {
      return parseInt(
         color
            .slice(0, 3)
            .map(value => Math.round(value).toString(16).padStart(2, '0'))
            .join(''),
         16
      );
   },
   async colors2base (colors: CosmosColor[][], crop?: CosmosCrop) {
      return await CosmosBitmap.texture2base(CosmosBitmap.colors2texture(colors, crop));
   },
   colors2pixels (colors: CosmosColor[][], crop: CosmosCrop = { bottom: 0, left: 0, right: 0, top: 0 }) {
      let x = 0;
      let y = 0;
      const area = CosmosImage.utils.area({ width: colors.length, height: colors[0]?.length ?? 0 }, crop);
      if (area.width > 0 && area.height > 0) {
         const pixels = new Uint8Array(area.width * area.height * 4);
         while (y < area.height) {
            while (x < area.width) {
               const z = Math.floor(area.x + x + (area.y + y) * area.width) * 4;
               const color = colors[x][y];
               pixels[z] = color[0];
               pixels[z + 1] = color[1];
               pixels[z + 2] = color[2];
               pixels[z + 3] = color[3];
               x++;
            }
            x = 0;
            y++;
         }
         return pixels;
      } else {
         return new Uint8Array();
      }
   },
   colors2texture (colors: CosmosColor[][], crop?: CosmosCrop) {
      return CosmosBitmap.pixels2texture(CosmosBitmap.colors2pixels(colors, crop), {
         width: colors.length,
         height: colors[0]?.length ?? 0
      });
   },
   hex2color (hex: number) {
      const string = hex.toString(16).padStart(6, '0');
      return CosmosUtils.populate(4, index =>
         index < 3 ? parseInt(string.slice(index * 2, index * 2 + 2), 16) : 255
      ) as CosmosColor;
   },
   merge (items: CosmosColor[][][], cols = Math.round(Math.sqrt(items.length))): [CosmosColor[][], CosmosArea[]] {
      const blockWidth = Math.max(...items.map(item => item.length));
      const blockHeight = Math.max(...items.map(item => item[0]?.length ?? 0));
      if (blockWidth > 0 && blockHeight > 0) {
         const pageWidth = blockWidth * cols;
         const pageHeight = blockHeight * Math.ceil(items.length / cols);
         const page = CosmosUtils.populate(pageWidth, () =>
            CosmosUtils.populate(pageHeight, () => [ 0, 0, 0, 0 ] as CosmosColor)
         );
         const info = CosmosUtils.populate(items.length, () => ({ x: 0, y: 0, width: 0, height: 0 } as CosmosArea));
         for (const [ index, item ] of items.entries()) {
            const itemWidth = item.length;
            const itemHeight = item[0]?.length ?? 0;
            if (itemWidth > 0 && itemHeight > 0) {
               const offsetX = (index % cols) * blockWidth;
               const offsetY = Math.floor(index / cols) * blockHeight;
               for (const [ x, subitem ] of item.entries()) {
                  const subpage = page[offsetX + x];
                  for (const [ y, color ] of subitem.entries()) {
                     subpage[offsetY + y] = color.slice() as CosmosColor;
                  }
               }
               info[index] = { x: offsetX, y: offsetY, width: itemWidth, height: itemHeight };
            }
         }
         return [ page, info ];
      } else {
         return [ [], [] ];
      }
   },
   split (page: CosmosColor[][], info: CosmosArea[]): CosmosColor[][][] {
      return info.map(area =>
         page.slice(area.x, area.x + area.width).map(subpage => subpage.slice(area.y, area.y + area.height))
      );
   },
   async pixels2base (pixels: Uint8Array, dimensions: CosmosDimensions) {
      return await CosmosBitmap.texture2base(CosmosBitmap.pixels2texture(pixels, dimensions));
   },
   pixels2colors (
      pixels: Uint8Array,
      dimensions: CosmosDimensions,
      crop: CosmosCrop = { bottom: 0, left: 0, right: 0, top: 0 }
   ) {
      const area = CosmosImage.utils.area(dimensions, crop);
      if (area.width > 0 && area.height > 0) {
         const colors: CosmosColor[][] = [];
         let x = 0;
         let y = 0;
         while (x < area.width) {
            const subcolors = (colors[x] = [] as CosmosColor[]);
            while (y < area.height) {
               const z = Math.floor(area.x + x + (area.y + y) * dimensions.width) * 4;
               subcolors.push([ pixels[z], pixels[z + 1], pixels[z + 2], pixels[z + 3] ]);
               y++;
            }
            y = 0;
            x++;
         }
         return colors;
      } else {
         return [] as CosmosColor[][];
      }
   },
   pixels2texture (pixels: Uint8Array, dimensions: CosmosDimensions) {
      return Texture.fromBuffer(pixels, dimensions.width, dimensions.height);
   },
   async texture2base (texture: Texture) {
      const sprite = Sprite.from(texture);
      const base = await CosmosImage.extract.base64(sprite, 'image/png', 1);
      sprite.destroy();
      return base;
   },
   texture2colors (texture: Texture, crop?: CosmosCrop) {
      return CosmosBitmap.pixels2colors(CosmosBitmap.texture2pixels(texture), texture, crop);
   },
   texture2pixels (texture: Texture) {
      const sprite = Sprite.from(texture);
      const pixels = CosmosImage.extract.pixels(sprite);
      sprite.destroy();
      return pixels;
   }
};
