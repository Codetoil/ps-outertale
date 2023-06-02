import { Graphics } from 'pixi.js';
import { CosmosBitmap, CosmosImage } from './image';
import { CosmosPoint } from './numerics';
import { CosmosBaseEvents, CosmosMetadata, CosmosSizedObject, CosmosStyle } from './renderer';

export class CosmosRectangle<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSizedObject<A, B> {
   $rectangle = { graphics: new Graphics(), visible: false };
   draw (style: CosmosStyle) {
      if (this.container.alpha > 0) {
         if (!this.$rectangle.visible) {
            this.$rectangle.visible = true;
            this.container.addChildAt(this.$rectangle.graphics, 0);
         }
         const graphics = this.$rectangle.graphics.clear();
         const fill = style.fill !== 'transparent';
         const stroke = style.stroke !== 'transparent';
         if (fill || stroke) {
            const half = this.size.divide(2);
            const origin = half.add(half.multiply(this.anchor));
            const base = new CosmosPoint(
               this.size.x < 0 ? origin.x + this.size.x : origin.x,
               this.size.y < 0 ? origin.y + this.size.y : origin.y
            );
            graphics.pivot.set(this.size.x * ((this.anchor.x + 1) / 2), this.size.y * ((this.anchor.y + 1) / 2));
            graphics.position.set(base.x - graphics.pivot.x, base.y - graphics.pivot.y);
            graphics.blendMode = style.blend;
            if (stroke) {
               const strokeColor = CosmosImage.utils.color.of(style.stroke);
               if (strokeColor[3] > 0) {
                  graphics.lineStyle({
                     alpha: strokeColor[3] * this.alpha.value,
                     color: CosmosBitmap.color2hex(strokeColor),
                     width: style.border
                  });
               }
            }
            if (fill) {
               const fillColor = CosmosImage.utils.color.of(style.fill);
               if (fillColor[3] > 0) {
                  graphics.beginFill(CosmosBitmap.color2hex(fillColor), fillColor[3] * this.alpha.value);
               } else {
                  graphics.beginFill(0, 0);
               }
            }
            graphics.drawRect(0, 0, Math.abs(this.size.x), Math.abs(this.size.y)).endFill();
            graphics.tint = style.tint;
         }
      } else if (this.$rectangle.visible) {
         this.$rectangle.visible = false;
         this.container.removeChildAt(0);
      }
   }
}
