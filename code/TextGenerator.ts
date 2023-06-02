import { fonts } from './core';
import {
   CosmosBitmap,
   CosmosColor,
   CosmosFont,
   CosmosFontData,
   CosmosImage,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosRectangle,
   CosmosRenderer,
   CosmosSprite,
   CosmosUtils
} from './engine';

import fontInformation from '../assets/fonts.json';

const fs = require('fs') as typeof import('fs');
const chars = ` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ ÇÖÜæçöüĞğİıŞşΔЖШЩУФЯЫжшщуфяы`;
const fontGen = [
   { name: 'ComicSans', size: 16, shift: { x: 0, y: 0 }, resolution: 1 },
   { name: 'CryptOfTomorrow', size: 8, shift: { x: 0.5, y: 1.5 }, resolution: 1 },
   { name: 'DeterminationMono', size: 16, shift: { x: -0.5, y: 0.5 }, resolution: 1 },
   { name: 'DeterminationSans', size: 16, shift: { x: 0.5, y: 0.5 }, resolution: 1 },
   { name: 'DiaryOfAn8BitMage', size: 20, shift: { x: 0, y: 0 }, resolution: 32 },
   { name: 'DotumChe', size: 18, shift: { x: 0, y: 0 }, resolution: 64 },
   { name: 'MarsNeedsCunnilingus', size: 24, shift: { x: 0.5, y: 1 }, resolution: 1 },
   { name: 'Papyrus', size: 16, shift: { x: 0, y: 0 }, resolution: 128 }
];

const renderer = new CosmosRenderer({
   wrapper: 'container',
   layers: { main: [ 'fixed' ] },
   size: { x: 640, y: 480 }
});

renderer.attach('main', new CosmosRectangle({ size: renderer.size, fill: '#000044' }));

const interactKey = new CosmosKeyboardInput(null, 'KeyZ', 'Enter', 'Numpad1');

(async () => {
   CosmosUtils.status('PRELOADING...');
   await CosmosFont.load(fontGen.map(font => font.name));
   CosmosUtils.status('RESTORING...');
   const list: CosmosKeyed<CosmosFontData> = {};
   const repl: CosmosKeyed<CosmosColor[][]> = {};
   try {
      for (const data of fontInformation) {
         try {
            const colors = await CosmosBitmap.base2colors(fonts[data.name as keyof typeof fonts]);
            for (const glyph of data.glyphs) {
               let red = false;
               const subcolors = CosmosBitmap.split(colors, [ glyph.area ])[0];
               for (const color of subcolors.flat()) {
                  if (color[0] === 255 && color[1] === 0 && color[2] === 0) {
                     red = true;
                     break;
                  }
               }
               red || (repl[`${data.name}:${glyph.code}`] = subcolors);
            }
            list[data.name] = data;
         } catch {
            //
         }
      }
   } catch {
      //
   }
   for (const { name, size, shift, resolution } of fontGen) {
      CosmosUtils.status(`GENERATING: ${name} (${size})`);
      const { data, source } = await CosmosFont.create(name, size, shift, chars, resolution, 10, (code, colors) => {
         return repl[`${name}:${code}`] || colors;
      });
      CosmosUtils.status(`MERGING: ${name} (${size})`);
      const path = `fonts/${name}.png`;
      list[data.name] = data;
      CosmosUtils.status(`PREVIEWING: ${name} (${size})`);
      const image = new CosmosImage(source);
      const sprite = new CosmosSprite({ anchor: 0, position: { x: 320, y: 240 }, scale: 2, frames: [ image ] });
      await image.load();
      renderer.attach('main', sprite);
      await interactKey.on('down');
      await interactKey.on('up');
      renderer.detach('main', sprite);
      CosmosUtils.status(`WRITING: ${name} (${size})`);
      fs.writeFileSync(`../assets/${path}`, Buffer.from(source.replace(/^data:image\/\w+;base64,/, ''), 'base64'));
      await renderer.timer.pause(500);
   }
   fs.writeFileSync('../assets/fonts.json', JSON.stringify(Object.values(list)));
   window.close();
})();
