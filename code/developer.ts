import fileDialog from 'file-dialog';
import objectInspect from 'object-inspect';
import { OutlineFilter } from 'pixi-filters';
import { Filter, Graphics } from 'pixi.js';
import { sources as aerialisSources } from './aerialis/bootstrap';
import { sources as citadelSources } from './citadel/bootstrap';
import citadelGroups from './citadel/groups';
import aerialisGroups from './aerialis/groups';
import {
   OutertaleChildAnimationDecorator,
   OutertaleChildBarrierDecorator,
   OutertaleChildObject,
   OutertaleChildScriptDecorator,
   OutertaleEditorContainer,
   OutertaleGroup,
   OutertaleLayerKey,
   OutertaleParentObject,
   OutertaleParentObjectDecorator,
   OutertaleSpriteDecorator
} from './classes';
import { sources as commonSources } from './common/bootstrap';
import commonGroups from './common/groups';
import content, { inventories } from './content';
import {
   atlas,
   audio,
   backend,
   events,
   game,
   image,
   keys,
   param,
   random,
   reload,
   renderer,
   rooms,
   timer,
   typer
} from './core';
import { CosmosNavigator } from './engine/atlas';
import { CosmosCharacter, CosmosEntity, CosmosPlayer } from './engine/entity';
import { CosmosAnimation, CosmosBitmap, CosmosImage, CosmosSprite } from './engine/image';
import { CosmosMath, CosmosPoint, CosmosValue } from './engine/numerics';
import {
   CosmosAnchoredObject,
   CosmosBase,
   CosmosBaseEvents,
   CosmosHitbox,
   CosmosObject,
   CosmosRenderer,
   CosmosRendererLayer,
   CosmosTransform
} from './engine/renderer';
import { CosmosRectangle } from './engine/shapes';
import { CosmosText } from './engine/text';
import { CosmosKeyed, CosmosUtils } from './engine/utils';
import { sources as foundrySources } from './foundry/bootstrap';
import foundryGroups from './foundry/groups';
import { battler, calcHP, heal, player, resume, saver, teleport, ultraPosition, world } from './mantle';
import { sources as outlandsSources } from './outlands/bootstrap';
import outlandsGroups from './outlands/groups';
import save, { OutertaleDataString } from './save';
import { sources as startonSources } from './starton/bootstrap';
import startonGroups from './starton/groups';
import text from './text';

export class OutertaleDeveloperHitbox extends CosmosHitbox<CosmosBaseEvents & { click: []; wheel: [1 | -1] }> {}

export const zoomFactor = 2 ** (1 / 4);

export const speedValues = [
   1 / 30 / 60 / 60,
   1 / 30 / 60,
   1 / 30,
   1 / 10,
   1 / 6,
   1 / 5,
   1 / 4,
   1 / 3,
   1 / 2,
   0.8,
   0.9,
   1,
   1.3,
   1.6,
   2,
   3,
   4,
   5,
   6,
   CosmosMath.FRAME / 5,
   10,
   CosmosMath.FRAME,
   CosmosMath.FRAME * 10
];

export const pallete = {
   c0: '#000000cf',
   c1: '#1010103f',
   c2: '#2020207f',
   c3: '#3030303f',
   c4: '#4040407f',
   c7: '#7f7f7f',
   ca: '#afafaf',
   cf: '#ffffff'
};

export function editorProperty (property: string) {
   if (atlas.target === 'editorObject' || property !== editor.property) {
      return '§fill:#fff§';
   } else if (atlas.target === 'editorProperty') {
      return '§fill:#0ff§';
   } else {
      return '§fill:#ff0§';
   }
}

export function editorValue (property: string, index: number) {
   if (atlas.target === 'editorValue' && property === editor.property) {
      if (index === editor.index) {
         return '§fill:#f00§';
      } else {
         return '§fill:#ff0§';
      }
   } else {
      return editorProperty(property);
   }
}

export function historianInfo<A extends string, B extends CosmosKeyed> (domain: A, store: B, ...exclude: string[]) {
   return Object.keys(store)
      .filter(key => !exclude.includes(key))
      .sort((info1, info2) => (info1 < info2 ? -1 : info1 > info2 ? 1 : 0))
      .map(key => ({ key, domain })) as { domain: A; key: keyof B & string }[];
}

export function decreaseSpeed () {
   const index = speedValues.indexOf(timer.speed.value);
   if (index > 0) {
      timer.speed.value = speedValues[index - 1];
   }
}

export function increaseSpeed () {
   const index = speedValues.indexOf(timer.speed.value);
   if (index < speedValues.length - 1) {
      timer.speed.value = speedValues[index + 1];
   }
}

export function prevRoom () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      const i = godhome.rooms.indexOf(godhome.room);
      if (i === -1) {
         godhome.room = game.room;
      } else if (i === 0) {
         godhome.room = godhome.rooms[godhome.rooms.length - 1];
      } else {
         godhome.room = godhome.rooms[i - 1];
      }
   }
}

export function nextRoom () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      godhome.room = godhome.rooms[(godhome.rooms.indexOf(godhome.room) + 1) % godhome.rooms.length];
   }
}

export function prevGroup () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      const i = godhome.groups.indexOf(godhome.group);
      if (i === -1) {
         godhome.group = godhome.groups[0];
      } else if (i === 0) {
         godhome.group = godhome.groups[godhome.groups.length - 1];
      } else {
         godhome.group = godhome.groups[i - 1];
      }
   }
}

export function nextGroup () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      godhome.group = godhome.groups[(godhome.groups.indexOf(godhome.group) + 1) % godhome.groups.length];
   }
}

export function prevContainer () {
   storage.container =
      storage.container === 'inventory' ? 'dimboxB' : storage.container === 'dimboxB' ? 'dimboxA' : 'inventory';
   storage.disable();
}

export function nextContainer () {
   storage.container =
      storage.container === 'inventory' ? 'dimboxA' : storage.container === 'dimboxA' ? 'dimboxB' : 'inventory';
   storage.disable();
}

export const editor = {
   active: false,
   associations: new Map<OutertaleParentObject | OutertaleChildObject, CosmosRectangle>(),
   box (parent: OutertaleParentObject, child?: OutertaleChildObject) {
      if (child) {
         editor.associations.has(child) ||
            editor.associations.set(
               child,
               new CosmosRectangle({
                  alpha: 1,
                  fill: { attachment: '#ffffff3f', barrier: '#ff00003f', interact: '#00ff003f', trigger: '#0000ff3f' }[
                     child.metadata.class
                  ],
                  metadata: {
                     display: false,
                     graphics: new Graphics()
                  },
                  stroke: {
                     attachment: '#ffffffdf',
                     barrier: '#ff0000df',
                     interact: '#00ff00df',
                     trigger: '#0000ffdf'
                  }[child.metadata.class]
               }).on('tick', function () {
                  this.alpha.value = editor.target?.object === child ? 1 : 0.6;
                  this.anchor.set(child.anchor);
                  this.position.set(parent.position.add(child));
                  this.size.set(child.compute());
                  this.rotation.value = child.rotation.value;
                  if (editor.target?.object === child) {
                     const graphics = this.metadata.graphics.clear().lineStyle({
                        width: 1.5,
                        color: { attachment: 0xffffff, barrier: 0xff3f3f, interact: 0x3fff3f, trigger: 0x3f3fff }[
                           child.metadata.class
                        ],
                        alpha: 0x6f / 0xff
                     });
                     const size = child.compute();
                     const half = new CosmosPoint(size?.x || 0, size?.y || 0).divide(2);
                     const diff = half.add(half.multiply(child.anchor));
                     for (const [ dx, dy ] of [
                        [ 0, 0 ],
                        [ size?.x ?? 0, 0 ],
                        [ 0, size?.y ?? 0 ],
                        [ size?.x ?? 0, size?.y ?? 0 ]
                     ]) {
                        graphics
                           .beginFill()
                           .moveTo(dx - diff.x, dy - diff.y)
                           .lineTo(0, 0)
                           .endFill();
                     }
                     graphics.beginFill().arc(0, 0, 1.5, 0, 360).endFill();
                     if (!this.metadata.display) {
                        this.metadata.display = true;
                        this.container.addChild(graphics);
                     }
                  } else if (this.metadata.display) {
                     this.metadata.display = false;
                     this.container.removeChild(this.metadata.graphics);
                  }
               })
            );
         return editor.associations.get(child)!;
      } else {
         editor.associations.has(parent) ||
            editor.associations.set(
               parent,
               new CosmosRectangle().on('tick', function () {
                  this.alpha.value = editor.target?.object === parent ? 1 : 0.6;
                  this.position = (renderer.freecam ? renderer.position : renderer.position.clamp(...renderer.region))
                     .multiply(-renderer.zoom.value)
                     .add(160, 120);
                  this.rotation.value = parent.rotation.value;
                  this.scale.set(renderer.zoom.value);
               })
            );
         return editor.associations.get(parent)!;
      }
   },
   containers: [] as OutertaleEditorContainer[],
   depth: -1,
   disable () {
      renderer.layers.below.objects[0].tint = 0xffffff;
      editor.active = false;
      atlas.switch(null);
      editor.wrapper.objects.splice(0, editor.wrapper.objects.length);
      game.movement = true;
      editor.containers = [];
      editor.depth = -1;
      editor.pos.x = 0;
      editor.pos.y = 0;
      panel.renderer.detach('main', editor.wrapper, editor.text);
   },
   editTime: Infinity,
   enable () {
      renderer.layers.below.objects[0].tint = 0x7f7f7f;
      editor.active = true;
      game.movement = false;
      editor.generate();
      atlas.navigators.of('editorProperty').position = { x: 0, y: 0 };
      atlas.switch('editorProperty');
      panel.renderer.attach('main', editor.wrapper, editor.text);
   },
   get index () {
      return atlas.navigators.of('editorValue').position.x;
   },
   set index (value) {
      atlas.navigators.of('editorValue').position.x = value;
   },
   input: false,
   generate () {
      editor.wrapper.objects.splice(0, editor.wrapper.objects.length);
      editor.containers = (
         editor.layers
            .flatMap(key => renderer.layers[key].objects)
            .filter(object => object.metadata.class === 'object') as OutertaleParentObject[]
      ).map(parent => {
         const box = editor.box(parent);
         const container = {
            box,
            children: [] as {
               box: CosmosRectangle;
               object: OutertaleChildObject;
               parent: OutertaleEditorContainer;
            }[],
            object: parent
         };
         box.objects.splice(0, box.objects.length);
         box.attach(
            ...parent.objects.map((child: OutertaleChildObject) => {
               const box = editor.box(parent, child);
               container.children.push({ box, object: child, parent: container });
               return box;
            })
         );
         editor.wrapper.attach(box);
         return container;
      });
   },
   get group () {
      const property = editor.property;
      for (const key in editor.groups) {
         if (editor.groups[key as keyof typeof editor.groups].includes(property)) {
            return key;
         }
      }
   },
   groups: {
      array: [ 'tags', 'frames', 'args', 'preload', 'neighbors', 'filters' ],
      boolean: [ 'auto' ],
      number: [ 'steps', 'gain', 'reverb', 'filter', 'rate', 'rotation' ],
      string: [ 'resources', 'name', 'music' ],
      vector: [ 'position', 'anchor', 'size', 'region-min', 'region-max', 'spawn' ]
   },
   layers: [ 'below', 'main', 'above' ] as OutertaleLayerKey[],
   get parent () {
      return editor.containers[editor.pos.x];
   },
   pos: { x: 0, y: 0 },
   get property () {
      return atlas.navigators.of('editorProperty').selection() as string;
   },
   get room () {
      return rooms.of(game.room).decorator ?? {};
   },
   get target () {
      if (editor.depth === -1) {
         return null;
      } else if (editor.depth > 0) {
         return editor.parent.children[editor.pos.y];
      } else if (editor.containers.length > 0) {
         return editor.parent;
      } else {
         return null;
      }
   },
   async save () {
      const room = game.room;
      const saver = (editor.savers[room] = panel.timer.value);
      await panel.timer.pause(1000);
      if (editor.savers[room] === saver && backend.available) {
         const content = CosmosUtils.serialize(rooms.of(room).decorator);
         if (content) {
            await backend.file.writeRoom(room, content);
         }
      }
   },
   savers: {} as CosmosKeyed<number>,
   text: new CosmosRectangle({
      position: { x: 5, y: 480 - 5 },
      anchor: { y: 1 },
      fill: '#0007',
      font: '10px DiaryOfAn8BitMage',
      priority: Infinity,
      scale: 2,
      objects: [
         new CosmosText({
            anchor: { y: 1 },
            fill: 'white',
            position: { x: 5, y: -5 },
            spacing: { x: -0.5 }
         }).on('tick', function () {
            this.alpha.value = editor.active ? 1 : 0;
            if (editor.active) {
               if (editor.depth === -1) {
                  this.content = `${text.d_editor.status.modifying} - ${text.d_editor.type.room}\n---\n${editorProperty(
                     'preload'
                  )}> ${text.d_editor.property.preload}: [${CosmosUtils.format(
                     (editor.room.preload || [])
                        .map((arg, index) => `${editorValue('preload', index)}"${arg}"${editorProperty('preload')}`)
                        .join(', '),
                     120,
                     true
                  )}]\n${editorProperty('background')}> ${text.d_editor.property.background}: "${
                     editor.room.background
                  }"\n${editorProperty('neighbors')}> ${text.d_editor.property.neighbors}: [${(
                     editor.room.neighbors || []
                  )
                     .map((arg, index) => `${editorValue('neighbors', index)}"${arg}"${editorProperty('neighbors')}`)
                     .join(', ')}]\n${editorProperty('region-min')}> ${text.d_editor.property.regionMin}: ${
                     editor.room.region?.[0].x ?? 0
                  }x ${editor.room.region?.[0].y ?? 0}y\n${editorProperty('region-max')}> ${
                     text.d_editor.property.regionMax
                  }: ${editor.room.region?.[1].x ?? 0}x ${editor.room.region?.[1].y ?? 0}y\n${editorProperty(
                     'spawn'
                  )}> ${text.d_editor.property.spawn}: ${editor.room.spawn?.x ?? 0}x ${
                     editor.room.spawn?.y ?? 0
                  }y\n${editorProperty('music')}> ${text.d_editor.property.music}: "${
                     editor.room.score?.music ?? ''
                  }"\n${editorProperty('gain')}> ${text.d_editor.property.gain}: ${
                     editor.room.score?.gain ?? 1
                  }\n${editorProperty('reverb')}> ${text.d_editor.property.reverb}: ${
                     editor.room.score?.reverb ?? 0
                  }\n${editorProperty('filter')}> ${text.d_editor.property.filter}: ${
                     editor.room.score?.filter ?? 0
                  }\n${editorProperty('rate')}> ${text.d_editor.property.rate}: ${
                     editor.room.score?.rate ?? 1
                  }\n${editorProperty('objects')}> ${text.d_editor.property.objects}: [${editor.containers.length}]`;
               } else if (atlas.target === 'editorAdd') {
                  this.content = `${text.d_editor.status.creating} - ${
                     editor.depth > 0 ? text.d_editor.type.subObject : text.d_editor.type.object
                  }\n§fill:#ff0§> ${editor.depth > 0 ? text.d_editor.property.type : text.d_editor.property.layer}: ${
                     (editor.depth > 0 ? editor.types : editor.layers)[atlas.navigators.of('editorAdd').position.y]
                  }`;
               } else {
                  const target = editor.target;
                  if (target) {
                     const object = target.object;
                     const meta = object.metadata;
                     this.content = `${
                        atlas.target === 'editorObject'
                           ? text.d_editor.status.selecting
                           : text.d_editor.status.modifying
                     } - ${meta.class}\n---\n${editorProperty('position')}> ${text.d_editor.property.position}: ${
                        meta.decorator.position?.x ?? 0
                     }x ${meta.decorator.position?.y ?? 0}y\n${
                        meta.class === 'object'
                           ? `${editorProperty('filters')}> ${text.d_editor.property.filters}: [${(
                                meta.decorator.filters || []
                             )
                                .map(
                                   (frame, index) =>
                                      `${editorValue('filters', index)}"${frame}"${editorProperty('filters')}`
                                )
                                .join(', ')}]\n${editorProperty('tags')}> ${text.d_editor.property.tags}: [${(
                                meta.decorator.tags || []
                             )
                                .map((tag, index) => `${editorValue('tags', index)}"${tag}"${editorProperty('tags')}`)
                                .join(', ')}]\n${editorProperty('objects')}> ${text.d_editor.property.objects}: [${
                                object.objects.length
                             }]`
                           : `${editorProperty('anchor')}> ${text.d_editor.property.anchor}: ${
                                meta.decorator.anchor?.x ?? -1
                             }x ${meta.decorator.anchor?.y ?? -1}y\n${
                                meta.class === 'attachment'
                                   ? `${editorProperty('auto')}> ${text.d_editor.property.auto}: ${
                                        meta.decorator.auto || false
                                     }\n${editorProperty('filters')}> ${text.d_editor.property.filters}: [${(
                                        meta.decorator.filters || []
                                     )
                                        .map(
                                           (frame, index) =>
                                              `${editorValue('filters', index)}"${frame}"${editorProperty('filters')}`
                                        )
                                        .join(', ')}]\n${
                                        meta.decorator.type === 'sprite'
                                           ? `${editorProperty('frames')}> ${text.d_editor.property.frames}: [${(
                                                meta.decorator.frames || []
                                             )
                                                .map(
                                                   (frame, index) =>
                                                      `${editorValue('frames', index)}"${frame}"${editorProperty(
                                                         'frames'
                                                      )}`
                                                )
                                                .join(', ')}]\n${editorProperty('steps')}> ${
                                                text.d_editor.property.steps
                                             }: ${meta.decorator.steps || 0}`
                                           : `${editorProperty('resources')}> ${text.d_editor.property.resources}: "${
                                                meta.decorator.resources || ''
                                             }"`
                                     }`
                                   : `${editorProperty('size')}> ${text.d_editor.property.size}: ${
                                        meta.decorator.size?.x ?? 0
                                     }x ${meta.decorator.size?.y ?? 0}y${
                                        meta.class === 'barrier'
                                           ? ''
                                           : `\n${editorProperty('name')}> ${text.d_editor.property.name}: "${
                                                meta.decorator.name || ''
                                             }"\n${editorProperty('args')}> ${text.d_editor.property.args}: [${(
                                                meta.decorator.args || []
                                             )
                                                .map(
                                                   (arg, index) =>
                                                      `${editorValue('args', index)}"${arg}"${editorProperty('args')}`
                                                )
                                                .join(', ')}]`
                                     }`
                             }`
                     }\n${editorProperty('rotation')}> ${text.d_editor.property.rotation}: ${
                        meta.decorator.rotation ?? 0
                     }\n${editorProperty('delete')}> ${text.d_editor.delete}`;
                  }
               }
            }
         })
      ]
   }).on('tick', function () {
      this.size.set((this.objects[0] as CosmosText).compute().add(5, 7.5));
   }),
   types: [ 'animation', 'sprite', 'barrier', 'interact', 'trigger' ],
   wrapper: new CosmosObject({ priority: -1, scale: 2 })
};

export const godhome = {
   room: '',
   rooms: [ commonSources, outlandsSources, startonSources, foundrySources, aerialisSources, citadelSources ]
      .flatMap(sources => Object.keys(sources))
      .filter(key => key !== '_'),
   group: [ 'nobody', commonGroups.nobody ] as [string, OutertaleGroup],
   groups: [ commonGroups, outlandsGroups, startonGroups, foundryGroups, aerialisGroups, citadelGroups ]
      .flatMap(groups => Object.entries(groups))
      .sort((group1, group2) => (group1[0] < group2[0] ? -1 : group1[0] > group2[0] ? 1 : 0)),
   menu: null as string | null,
   menus: [ null, ...atlas.navigators.keys() ]
};

export const historian = {
   page: 0,
   input: false,
   domain: null as string | null,
   index: null as number | null,
   numericValue: null as string | null,
   restoreInput: false,
   info: {
      dataBoolean: historianInfo('dataBoolean', save.data.b),
      dataNumber: historianInfo('dataNumber', save.data.n),
      dataString: historianInfo('dataString', save.data.s),
      flagBoolean: historianInfo('flagBoolean', save.flag.b),
      flagNumber: historianInfo('flagNumber', save.flag.n, 'hash'),
      flagString: historianInfo('flagString', save.flag.s)
   },
   get entries () {
      return historian.domain ? historian.info[historian.domain as keyof typeof historian.info] : [];
   },
   get pages () {
      return Math.max(Math.ceil(historian.entries.length / 8), 1);
   },
   clearIndex () {
      if (historian.index !== null) {
         historian.index = null;
         historian.clearInput();
      }
   },
   clearInput () {
      if (historian.input) {
         historian.input = false;
         historian.numericValue = null;
         game.input = historian.restoreInput;
         historian.restoreInput = false;
      }
   }
};

export const inspector = {
   index: null as number | null,
   switches: {
      base: false,
      below: false,
      main: false,
      above: false,
      menu: false,
      hitbox: false,
      sprite: false,
      text: false
   },
   hitboxGraphics: new Graphics(),
   hitboxTint: 0,
   target: null as { objects: CosmosObject[] } | null,
   rootNode: [
      renderer.layers.base,
      renderer.layers.below,
      renderer.layers.main,
      renderer.layers.above,
      renderer.layers.menu
   ] as { objects: CosmosObject[] }[],
   path: [] as number[],
   resolvePath () {
      let step = 0;
      let node = inspector.rootNode;
      while (step < inspector.path.length) {
         const pos = inspector.path[step];
         if (node.length > pos) {
            node = node[pos].objects;
            step++;
         } else {
            inspector.path.splice(step, inspector.path.length - step);
            break;
         }
      }
      return node;
   },
   reportText: new CosmosText({
      fill: pallete.cf,
      position: { x: 5, y: 5 },
      font: '8px DeterminationMono',
      plain: true,
      metadata: { __debug__: true },
      priority: Infinity,
      scale: 2
   }),
   // TODO: move these strings into text file
   generateReport (target: CosmosRendererLayer | CosmosObject, index: number) {
      const lines = [ `${target.constructor.name} (${[ ...inspector.path, index ].join('.')})` ];
      target.objects.length > 0 && lines.push(`Objects: [${target.objects.length}]`);
      if (target instanceof CosmosObject) {
         const metadata = objectInspect(target.metadata, { quoteStyle: 'double', indent: 3, depth: 1 });
         target.acceleration.value !== 0 && lines.push(`Acceleration: ${target.acceleration.value}`);
         if (target instanceof CosmosSprite) {
            lines.push(`Active: ${target.active ? 'True' : 'False'}`);
         }
         target.alpha.value !== 1 && lines.push(`Alpha: ${target.alpha.value}`);
         if (target instanceof CosmosAnchoredObject) {
            if (target.anchor.x !== -1 || target.anchor.y !== -1) {
               lines.push(`Anchor: {${target.anchor.x}, ${target.anchor.y}}`);
            }
         }
         target.blend !== void 0 && lines.push(`Blend: "${target.blend}"`);
         target.border !== void 0 && lines.push(`Border: ${target.border}`);
         if (target instanceof CosmosText) {
            target.charset !== CosmosText.charset && lines.push(`Charset: ${target.charset}`);
         }
         if (target instanceof CosmosSprite || target instanceof CosmosText) {
            const size = target.compute();
            if (size.x !== 0 || size.y !== 0) {
               lines.push(`Compute(): {${size.x}, ${size.y}}`);
            }
         }
         if (target instanceof CosmosText) {
            if (target !== inspector.reportText && target.content !== '') {
               const sublines = target.content.split('\n').map(line => `| ${line.slice(0, 128)}`);
               if (sublines.length > 4) {
                  lines.push(`Content:\n${sublines.slice(0, 3).join('\n')}\n...`);
               } else {
                  lines.push(`Content:\n${sublines.join('\n')}`);
               }
            }
         }
         if (target instanceof CosmosSprite) {
            if (
               target.crop.bottom !== 0 ||
               target.crop.left !== 0 ||
               target.crop.right !== 0 ||
               target.crop.top !== 0
            ) {
               lines.push(
                  `Crop: /${target.crop.top}, ${target.crop.right}, ${target.crop.bottom}, ${target.crop.left}/`
               );
            }
            lines.push(`Duration: ${target.duration}`);
         }
         if (target instanceof CosmosPlayer) {
            if (target.extent.x !== 0 || target.extent.y !== 0) {
               lines.push(`Extent: {${target.extent.x}, ${target.extent.y}}`);
            }
         }
         if (target instanceof CosmosEntity) {
            lines.push(`Face: ${{ down: 'Down', left: 'Left', right: 'Right', up: 'Up' }[target.face]}`);
         }
         target.fill !== void 0 && lines.push(`Fill: "${target.fill}"`);
         target.font !== void 0 && lines.push(`Font: "${target.font}"`);
         if (target instanceof CosmosSprite && !(target instanceof CosmosAnimation)) {
            if (target.frames.length > 0) {
               const sublines = target.frames.map(frame => (frame ? `  @${frame.source.slice(0, 128)}` : '  (none)'));
               if (sublines.length > 4) {
                  lines.push(`Frames: [\n${sublines.slice(0, 3).join('\n')}\n  ...\n]`);
               } else {
                  lines.push(`Frames: [\n${sublines.join('\n')}\n]`);
               }
            }
         }
         if (target.gravity.x !== 0 || target.gravity.y !== 0) {
            lines.push(`Gravity: {${target.gravity.x}, ${target.gravity.y}}`);
         }
         if (target instanceof CosmosSprite) {
            target.reverse && lines.push(`Reverse: true`);
            lines.push(`Index: ${target.index}`);
         }
         if (target instanceof CosmosCharacter) {
            lines.push(`Key: ${target.key}`);
         }
         metadata === '{}' || lines.push(`Metadata: ${metadata}`);
         if (target.parallax.x !== 0 || target.parallax.y !== 0) {
            lines.push(`Parallax: {${target.parallax.x}, ${target.parallax.y}}`);
         }
         lines.push(`Position: {${target.position.x}, ${target.position.y}}`);
         target.priority.value !== 0 && lines.push(`Priority: ${target.priority.value}`);
         if (target instanceof CosmosAnimation) {
            if (target.resources !== null) {
               lines.push(`Resources: ${target.resources.source.replace(/\.png\n.*/, '.ase')}`);
            }
         }
         target.rotation.value !== 0 && lines.push(`Rotation: ${target.rotation.value}`);
         if (target.scale.x !== 1 || target.scale.y !== 1) {
            lines.push(`Scale: {${target.scale.x}, ${target.scale.y}}`);
         }
         if (target instanceof CosmosHitbox || target instanceof CosmosRectangle) {
            if (target.size.x !== 0 || target.size.y !== 0) {
               lines.push(`Size: {${target.size.x}, ${target.size.y}}`);
            }
         }
         if (target instanceof CosmosText) {
            if (target.spacing.x !== 0 || target.spacing.y !== 0) {
               lines.push(`Spacing: {${target.spacing.x}, ${target.spacing.y}}`);
            }
         }
         target.spin.value !== 0 && lines.push(`Spin: ${target.spin.value}`);
         if (target instanceof CosmosEntity) {
            lines.push(
               `Sprites: /${target.sprites.up.constructor.name}, ${target.sprites.right.constructor.name}, ${target.sprites.down.constructor.name}, ${target.sprites.left.constructor.name}/`
            );
            target.step !== 1 && lines.push(`Step: ${target.step}`);
         }
         if (target instanceof CosmosSprite) {
            lines.push(`Step: ${target.step}`);
         }
         target.stroke !== void 0 && lines.push(`Stroke: "${target.stroke}"`);
         if (target instanceof CosmosAnimation) {
            if (
               target.subcrop.bottom !== 0 ||
               target.subcrop.left !== 0 ||
               target.subcrop.right !== 0 ||
               target.subcrop.top !== 0
            ) {
               lines.push(
                  `Subcrop: /${target.subcrop.top}, ${target.subcrop.right}, ${target.subcrop.bottom}, ${target.subcrop.left}/`
               );
            }
         }
         if (target instanceof CosmosCharacter) {
            lines.push(`Talk: ${target.talk ? 'True' : 'False'}`);
         }
         target.tint !== void 0 && lines.push(`Tint: ${target.tint}`);
         if (target.velocity.x !== 0 || target.velocity.y !== 0) {
            lines.push(`Velocity: {${target.velocity.x}, ${target.velocity.y}}`);
         }
      } else {
         lines.push(`Active: ${target.active ? 'True' : 'False'}`);
         if (target.modifiers.length > 0) {
            lines.push(
               `Modifiers: ${target.modifiers
                  .map(modifier => ({ fixed: 'Fixed', vertical: 'Vertical' }[modifier]))
                  .join(', ')}`
            );
         }
      }
      return lines.join('\n');
   }
};

export const logician = {
   error: void 0 as any,
   errored: false,
   scroll: 0,
   tab: 0,
   viteError: Symbol('ViteError'),
   inspect (value: any) {
      return objectInspect(value, { depth: value instanceof CosmosBase ? 1 : 4, quoteStyle: 'single', indent: 3 });
   },
   process (value: string) {
      const lines = value.split('\n');
      logician.scroll = Math.min(logician.scroll, Math.max(lines.length - 1, 0));
      return lines
         .slice(logician.scroll, logician.scroll + 21)
         .map(ln => ln.slice(0, 33))
         .join('\n');
   },
   suspend (error: any) {
      if (error !== logician.viteError) {
         if (!logician.errored) {
            logician.errored = true;
            timer.stop();
            audio.context.suspend();
            if (!game.developer) {
               panel.userError = true;
               panel.start();
            }
            logician.tab = panel.tab.value;
            panel.tab.switch(panel.tab.objects.length - 1);
         }
         logician.error = error?.stack ?? error;
      }
   },
   resume () {
      if (logician.errored) {
         logician.errored = false;
         timer.start();
         audio.context.resume();
         if (panel.userError) {
            panel.stop();
            panel.userError = false;
         }
         panel.tab.switch(logician.tab);
      }
   }
};

export const storage = {
   index: -1,
   container: Object.keys(save.storage)[0] as keyof typeof save.storage,
   restoreInput: false,
   disable () {
      if (storage.index > -1) {
         storage.index = -1;
         game.input = storage.restoreInput;
         storage.restoreInput = false;
      }
   }
};

export const panel = {
   dragger: { state: false, origin: { x: 0, y: 0 }, offset: { x: 0, y: 0 } },
   // TODO: add panels for battler.volatile state display and atlas state display
   object: new CosmosRectangle({
      size: { x: 320, y: 480 },
      fill: 'transparent',
      offsets: [ { x: 640 } ],
      objects: [
         new CosmosHitbox(),
         new CosmosObject({ position: { y: 40 } }),
         new CosmosObject({
            objects: CosmosUtils.populate(5, index =>
               new OutertaleDeveloperHitbox({
                  size: { x: 80, y: 20 },
                  position: { x: (index % 4) * 80, y: Math.floor(index / 4) * 20 },
                  objects: [
                     new CosmosRectangle({
                        size: { x: 80, y: 20 },
                        position: { x: 1 },
                        objects: [
                           new CosmosText({
                              anchor: 0,
                              position: { x: 40, y: 10 + 0.5 },
                              content: [
                                 text.d_control.tab,
                                 text.d_godhome.tab,
                                 text.d_savemod.tab,
                                 text.d_inspect.tab,
                                 text.d_storage.tab
                              ][index],
                              font: '18px DeterminationMono'
                           })
                        ]
                     })
                  ]
               })
                  .on('tick', function () {
                     this.alpha.value = logician.errored ? 0 : 1;
                     this.objects[0].fill = this.metadata.active ? pallete.c3 : 'transparent';
                     this.objects[0].objects[0].fill = this.metadata.active ? pallete.cf : pallete.c7;
                  })
                  .on('click', function () {
                     logician.errored || panel.tab.switch(index);
                  })
            )
         }),
         new CosmosRectangle({
            anchor: { x: 0 },
            fill: pallete.c3,
            position: { x: 160 },
            size: { x: 320, y: 40 },
            objects: [
               new CosmosText({
                  anchor: { x: 0 },
                  content: text.d_console.blurb,
                  fill: pallete.cf,
                  font: '20px DeterminationMono',
                  position: { y: 3 }
               })
            ]
         }).on('tick', function () {
            this.alpha.value = logician.errored ? 1 : 0;
         })
      ]
   }),
   renderer: new CosmosRenderer({
      active: false,
      wrapper: '#wrapper',
      layers: { main: [ 'fixed' ] },
      size: { x: 960, y: 480 }
   }),
   serializeSAVE () {
      return CosmosUtils.serialize(
         CosmosUtils.populate(save.manager.length, index => save.manager.key(index)!).map(key => [
            key,
            save.manager.getItem(key)
         ])
      );
   },
   start () {
      param('panel', '');
      game.developer = true;
      backend.toggle.panel(true);
      panel.renderer.active = true;
      game.resize();
   },
   stop () {
      param('panel');
      historian.clearIndex();
      historian.clearInput();
      backend.toggle.panel(false);
      panel.renderer.active = false;
      game.developer = false;
      game.resize();
   },
   tab: {
      objects: [
         new CosmosObject({
            objects: [
               ...CosmosUtils.populate(
                  2,
                  index1 =>
                     new CosmosRectangle({
                        fill: 'transparent',
                        stroke: pallete.cf,
                        anchor: { x: 0 },
                        size: { x: 130, y: 46 + 10 * 29 },
                        position: { x: 85 + index1 * 150, y: 7 },
                        objects: [
                           new CosmosText({
                              fill: pallete.cf,
                              font: '24px MarsNeedsCunnilingus',
                              content: text.d_control.headers[index1],
                              anchor: { x: 0 },
                              position: { y: 9 },
                              objects: CosmosUtils.populate([ 10, 10 ][index1], index2 =>
                                 new OutertaleDeveloperHitbox({
                                    anchor: { x: 0 },
                                    position: { y: 27 + index2 * 29 },
                                    size: { x: 105, y: 25 },
                                    metadata: { lastClick: -Infinity },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: pallete.c2,
                                          font: '18px DeterminationMono',
                                          stroke: 'transparent',
                                          anchor: { x: 0 },
                                          size: { x: 105, y: 25 },
                                          objects: [
                                             new CosmosText({
                                                fill: pallete.cf,
                                                anchor: 0,
                                                position: { y: 12.5 },
                                                content: text.d_control.items[index1][index2]
                                             })
                                          ]
                                       })
                                    ]
                                 })
                                    .on('tick', function () {
                                       let active = false;
                                       const recentlyClicked = panel.timer.value - this.metadata.lastClick < 80;
                                       if (index1 === 0) {
                                          switch (index2) {
                                             case 0:
                                             case 1:
                                             case 7:
                                             case 8:
                                                active = recentlyClicked;
                                                break;
                                             case 2:
                                                active = save.data.n.g === Infinity;
                                                break;
                                             case 3:
                                                active = game.interact;
                                                break;
                                             case 4:
                                                active = game.input;
                                                break;
                                             case 5:
                                                active = game.movement;
                                                break;
                                             case 6:
                                                active = game.noclip;
                                                break;
                                             case 9:
                                                active = renderer.freecam;
                                                break;
                                          }
                                       } else {
                                          switch (index2) {
                                             case 0:
                                                active = battler.assist;
                                                break;
                                             case 1:
                                             case 2:
                                             case 3:
                                             case 4:
                                             case 7:
                                             case 8:
                                             case 9:
                                                active = recentlyClicked;
                                                break;
                                             case 5:
                                                active = battler.flee;
                                                break;
                                             case 6:
                                                active = save.data.n.hp === Infinity;
                                                break;
                                          }
                                       }
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    })
                                    .on('click', function () {
                                       this.metadata.lastClick = panel.timer.value;
                                       if (index1 === 0) {
                                          switch (index2) {
                                             case 0:
                                                battler.music?.stop();
                                                resume({ gain: world.level, rate: world.ambiance });
                                                break;
                                             case 1: {
                                                const { face, position } = ultraPosition(game.room);
                                                player.face = face;
                                                player.position.set(position);
                                                game.camera = player;
                                                break;
                                             }
                                             case 2:
                                                if (save.data.n.g === Infinity) {
                                                   save.data.n.g = this.metadata.g ?? 432;
                                                } else {
                                                   this.metadata.g = save.data.n.g;
                                                   save.data.n.g = Infinity;
                                                }
                                                break;
                                             case 3:
                                                game.interact = !game.interact;
                                                break;
                                             case 4:
                                                game.input = !game.input;
                                                break;
                                             case 5:
                                                game.movement = !game.movement;
                                                break;
                                             case 6:
                                                game.noclip = !game.noclip;
                                                break;
                                             case 7:
                                                game.movement = false;
                                                heal();
                                                atlas.switch('save');
                                                break;
                                             case 8:
                                                typer.text('').then(() => (typer.mode = 'empty'));
                                                break;
                                             case 9:
                                                (renderer.freecam = !renderer.freecam) || (renderer.zoom.value = 1);
                                                break;
                                          }
                                       } else {
                                          switch (index2) {
                                             case 0:
                                                battler.assist = !battler.assist;
                                                break;
                                             case 1:
                                                battler.bullets.objects = [];
                                                break;
                                             case 2:
                                                battler.music?.stop();
                                                events.fire('exit');
                                                break;
                                             case 3:
                                                battler.reset();
                                                break;
                                             case 4:
                                                game.movement = false;
                                                battler.resume();
                                                break;
                                             case 5:
                                                battler.flee = !battler.flee;
                                                break;
                                             case 6:
                                                if (save.data.n.hp === Infinity) {
                                                   save.data.n.hp = this.metadata.hp ?? calcHP();
                                                } else {
                                                   this.metadata.hp = save.data.n.hp;
                                                   save.data.n.hp = Infinity;
                                                }
                                                break;
                                             case 7:
                                                for (const volatile of battler.volatile) {
                                                   volatile.sparable = true;
                                                }
                                                break;
                                             case 8:
                                                save.data.n.hp = 0;
                                                battler.damage(
                                                   battler.SOUL.sprite,
                                                   0,
                                                   void 0,
                                                   void 0,
                                                   void 0,
                                                   void 0,
                                                   true
                                                );
                                                break;
                                             case 9:
                                                for (const volatile of battler.volatile) {
                                                   volatile.hp = 0;
                                                }
                                                break;
                                          }
                                       }
                                    })
                              )
                           })
                        ]
                     })
               ),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_control.p_speed.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    font: '18px DeterminationMono',
                                    stroke: 'transparent',
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          fill: pallete.ca,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: [ text.d_control.p_speed.prev, '', text.d_control.p_speed.next ][index]
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content = timer.speed.value
                                       .toString()
                                       .slice(0, 13);
                                 } else {
                                    const active = panel.timer.value - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.timer.value;
                                 switch (index) {
                                    case 0:
                                       decreaseSpeed();
                                       break;
                                    case 1:
                                       timer.speed.value = 1;
                                       break;
                                    case 2:
                                       increaseSpeed();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    decreaseSpeed();
                                 } else {
                                    increaseSpeed();
                                 }
                              })
                        )
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 109 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_godhome.p_teleport.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(3, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { x: -112.5 + index * 112.5, y: 27 },
                                 size: { x: 120, y: 25 },
                                 metadata: { lastClick: -Infinity },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: pallete.c1,
                                       font: '18px DeterminationMono',
                                       stroke: 'transparent',
                                       anchor: { x: 0 },
                                       size: { x: 30, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             fill: pallete.ca,
                                             anchor: 0,
                                             position: { y: 12.5 },
                                             content: [ '<', '', '>' ][index]
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    if (index === 1) {
                                       (this.objects[0].objects[0] as CosmosText).content = godhome.room;
                                    } else {
                                       const active = panel.timer.value - this.metadata.lastClick < 80;
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.timer.value;
                                    switch (index) {
                                       case 0:
                                          prevRoom();
                                          break;
                                       case 1:
                                          godhome.room = game.active ? game.room : save.data.s.room;
                                          break;
                                       case 2:
                                          nextRoom();
                                          break;
                                    }
                                    game.active || (save.data.s.room = godhome.room);
                                 })
                                 .on('wheel', function (dir) {
                                    if (dir === 1) {
                                       nextRoom();
                                    } else {
                                       prevRoom();
                                    }
                                    game.active || (save.data.s.room = godhome.room);
                                 })
                           ),
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { y: 56 },
                              size: { x: 255, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c2,
                                    font: '18px DeterminationMono',
                                    stroke: 'transparent',
                                    anchor: { x: 0 },
                                    size: { x: 255, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          fill: pallete.cf,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: text.d_godhome.p_teleport.action
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 const active = panel.timer.value - this.metadata.lastClick < 80;
                                 this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                 this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.timer.value;
                                 const { face, position } = ultraPosition(godhome.room);
                                 renderer.alpha.value = 0;
                                 teleport(godhome.room, face, position.x, position.y, { fast: true }).then(() => {
                                    renderer.alpha.value = 1;
                                    resume({ gain: world.level, rate: world.ambiance });
                                 });
                              })
                        ]
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 109 },
                  position: { x: 160, y: 123 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_godhome.p_encounter.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(3, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { x: -112.5 + index * 112.5, y: 27 },
                                 size: { x: 120, y: 25 },
                                 metadata: { lastClick: -Infinity },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: pallete.c1,
                                       font: '18px DeterminationMono',
                                       stroke: 'transparent',
                                       anchor: { x: 0 },
                                       size: { x: 30, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             fill: pallete.ca,
                                             anchor: 0,
                                             position: { y: 12.5 },
                                             content: [ '<', '', '>' ][index]
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    if (index === 1) {
                                       (this.objects[0].objects[0] as CosmosText).content = godhome.group[0];
                                    } else {
                                       const active = panel.timer.value - this.metadata.lastClick < 80;
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.timer.value;
                                    switch (index) {
                                       case 0:
                                          prevGroup();
                                          break;
                                       case 2:
                                          nextGroup();
                                          break;
                                    }
                                 })
                                 .on('wheel', function (dir) {
                                    if (dir === 1) {
                                       nextGroup();
                                    } else {
                                       prevGroup();
                                    }
                                 })
                           ),
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { y: 56 },
                              size: { x: 255, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c2,
                                    font: '18px DeterminationMono',
                                    stroke: 'transparent',
                                    anchor: { x: 0 },
                                    size: { x: 255, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          fill: pallete.cf,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: text.d_godhome.p_encounter.action
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 const active = panel.timer.value - this.metadata.lastClick < 80;
                                 this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                 this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.timer.value;
                                 battler.encounter(player, godhome.group[1], false);
                              })
                        ]
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_savemod.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(10, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { y: 27 + index * 29 },
                                 size: { x: 255, y: 25 },
                                 metadata: {
                                    saveEntry: true,
                                    index,
                                    lastClick: -Infinity,
                                    focus: false,
                                    title: '',
                                    edituh: false
                                 },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: index < 9 ? pallete.c2 : pallete.c0,
                                       font: '18px DeterminationMono',
                                       stroke: index < 9 ? 'transparent' : pallete.cf,
                                       anchor: { x: 0 },
                                       size: { x: 255, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             fill: pallete.cf,
                                             stroke: 'transparent',
                                             anchor: 0,
                                             position: { y: 12.5 }
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    let content = '';
                                    let active = panel.timer.value - this.metadata.lastClick < 80;
                                    if (index < 9) {
                                       if (historian.domain !== null) {
                                          if (index === 0) {
                                             content = 'Back';
                                          } else {
                                             const infoIndex = historian.page * 8 + (index - 1);
                                             if (infoIndex < historian.entries.length) {
                                                content = historian.entries[infoIndex].key;
                                                if (infoIndex === historian.index) {
                                                   active = true;
                                                }
                                             }
                                          }
                                       } else if (index < 6) {
                                          content = text.d_savemod.domains[index];
                                       }
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    } else {
                                       if (historian.index !== null) {
                                          const entry = historian.entries[historian.index];
                                          switch (entry.domain) {
                                             case 'dataBoolean':
                                                content = `${save.data.b[entry.key]}`;
                                                break;
                                             case 'dataNumber':
                                                content = `${historian.numericValue ?? save.data.n[entry.key]}`;
                                                break;
                                             case 'dataString':
                                                content = `"${save.data.s[entry.key]}"`;
                                                break;
                                             case 'flagBoolean':
                                                content = `${save.flag.b[entry.key]}`;
                                                break;
                                             case 'flagNumber':
                                                content = `${historian.numericValue ?? save.flag.n[entry.key]}`;
                                                break;
                                             case 'flagString':
                                                content = `"${save.flag.s[entry.key]}"`;
                                                break;
                                          }
                                       }
                                       index === 9 && historian.input && (active = true);
                                       this.objects[0].fill = active ? pallete.c2 : pallete.c0;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    }
                                    (this.objects[0].objects[0] as CosmosText).content = content;
                                    if (content.length > 0) {
                                       this.alpha.value = 1;
                                    } else {
                                       this.alpha.value = 0;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.timer.value;
                                    if (index < 9) {
                                       if (historian.domain !== null) {
                                          if (index === 0) {
                                             historian.clearIndex();
                                             historian.page = 0;
                                             historian.domain = null;
                                          } else {
                                             const infoIndex = historian.page * 8 + (index - 1);
                                             if (infoIndex < historian.entries.length) {
                                                if (historian.index === infoIndex) {
                                                   historian.clearIndex();
                                                } else {
                                                   historian.index = infoIndex;
                                                   historian.clearInput();
                                                }
                                             }
                                          }
                                       } else if (index < 6) {
                                          historian.domain = [
                                             'dataBoolean',
                                             'dataNumber',
                                             'dataString',
                                             'flagBoolean',
                                             'flagNumber',
                                             'flagString'
                                          ][index];
                                       }
                                    } else if (historian.index !== null) {
                                       const infoEntry = historian.entries[historian.index];
                                       if (infoEntry.domain === 'dataBoolean') {
                                          save.data.b[infoEntry.key] = !save.data.b[infoEntry.key];
                                       } else if (infoEntry.domain === 'flagBoolean') {
                                          save.flag.b[infoEntry.key] = !save.flag.b[infoEntry.key];
                                       } else if (historian.input) {
                                          historian.clearInput();
                                       } else {
                                          historian.input = true;
                                          historian.restoreInput = game.input;
                                          game.input = false;
                                       }
                                    }
                                 })
                           )
                        ]
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_savemod.p_page.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    font: '18px DeterminationMono',
                                    stroke: 'transparent',
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          fill: pallete.ca,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: [ text.d_savemod.p_page.prev, '', text.d_savemod.p_page.next ][index]
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content = historian.page.toString();
                                 } else {
                                    const active = panel.timer.value - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.timer.value;
                                 switch (index) {
                                    case 0:
                                       --historian.page === -1 && (historian.page = historian.pages - 1);
                                       historian.clearIndex();
                                       break;
                                    case 1:
                                       historian.page = 0;
                                       break;
                                    case 2:
                                       ++historian.page === historian.pages && (historian.page = 0);
                                       historian.clearIndex();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    ++historian.page === historian.pages && (historian.page = 0);
                                    historian.clearIndex();
                                 } else {
                                    --historian.page === -1 && (historian.page = historian.pages - 1);
                                    historian.clearIndex();
                                 }
                              })
                        )
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               ...CosmosUtils.populate(
                  2,
                  index1 =>
                     new CosmosRectangle({
                        fill: 'transparent',
                        stroke: pallete.cf,
                        anchor: { x: 0 },
                        size: { x: 130, y: 46 + 5 * 29 },
                        position: { x: 85 + index1 * 150, y: 7 },
                        objects: [
                           new CosmosText({
                              fill: pallete.cf,
                              font: '24px MarsNeedsCunnilingus',
                              content: text.d_inspect.headers[index1],
                              anchor: { x: 0 },
                              position: { y: 9 },
                              objects: CosmosUtils.populate([ 5, 3 ][index1], index2 => {
                                 const switchKey = [
                                    [ 'base', 'below', 'main', 'above', 'menu' ],
                                    [ 'hitbox', 'sprite', 'text' ]
                                 ][index1][index2] as keyof typeof inspector.switches;
                                 return new OutertaleDeveloperHitbox({
                                    anchor: { x: 0 },
                                    position: { y: 27 + index2 * 29 },
                                    size: { x: 105, y: 25 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: pallete.c2,
                                          font: '18px DeterminationMono',
                                          stroke: 'transparent',
                                          anchor: { x: 0 },
                                          size: { x: 105, y: 25 },
                                          objects: [
                                             new CosmosText({
                                                fill: pallete.cf,
                                                anchor: 0,
                                                position: { y: 12.5 },
                                                content: text.d_inspect.switches[index1][index2]
                                             })
                                          ]
                                       })
                                    ]
                                 })
                                    .on('tick', function () {
                                       const active = inspector.switches[switchKey];
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                    })
                                    .on('click', function () {
                                       inspector.switches[switchKey] = !inspector.switches[switchKey];
                                    });
                              })
                           })
                        ]
                     })
               ),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 225 },
                  position: { x: 160, y: 205 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_inspect.p_explorer.header,
                        anchor: { x: 0 },
                        position: { y: 9 }
                     })
                  ]
               })
            ]
         }).on('tick', async function () {
            inspector.target = null;
            const base = inspector.resolvePath();
            if (inspector.index !== null) {
               if (inspector.index < base.length) {
                  inspector.target = base[inspector.index];
                  inspector.reportText.content = inspector.generateReport(
                     inspector.target as CosmosRendererLayer | CosmosObject,
                     inspector.index!
                  );
               } else {
                  inspector.index = null;
               }
            }
            panel.renderer[inspector.target ? 'attach' : 'detach']('main', inspector.reportText);
            this.objects[2].objects[0].objects = [ ...(inspector.path.length > 0 ? [ null ] : []), ...base ].map(
               (target, index) =>
                  new OutertaleDeveloperHitbox({
                     anchor: { x: 0 },
                     position: {
                        x: inspector.path.length > 0 ? -101.5 + (index % 8) * 29 : 0,
                        y: 32 + (inspector.path.length > 0 ? Math.floor(index / 8) : index) * 29
                     },
                     size: { x: inspector.path.length > 0 ? 25 : 232, y: 25 },
                     objects: [
                        new CosmosRectangle({
                           fill: pallete.c2,
                           font: '18px DeterminationMono',
                           stroke: 'transparent',
                           anchor: { x: 0 },
                           size: { x: inspector.path.length > 0 ? 25 : 232, y: 25 },
                           objects: [
                              new CosmosText({
                                 fill: pallete.cf,
                                 anchor: 0,
                                 position: { y: 12.5 },
                                 content: target
                                    ? 'modifiers' in target
                                       ? text.d_inspect.p_explorer.layers[index]
                                       : target instanceof CosmosAnimation
                                       ? text.d_inspect.p_explorer.letters.animation
                                       : target instanceof CosmosCharacter
                                       ? text.d_inspect.p_explorer.letters.character
                                       : target instanceof CosmosPlayer
                                       ? text.d_inspect.p_explorer.letters.player
                                       : target instanceof CosmosEntity
                                       ? text.d_inspect.p_explorer.letters.entity
                                       : target instanceof CosmosHitbox
                                       ? text.d_inspect.p_explorer.letters.hitbox
                                       : target instanceof CosmosSprite
                                       ? text.d_inspect.p_explorer.letters.sprite
                                       : target instanceof CosmosText
                                       ? text.d_inspect.p_explorer.letters.text
                                       : text.d_inspect.p_explorer.letters.object
                                    : '^'
                              })
                           ]
                        })
                     ]
                  })
                     .on('tick', function () {
                        const active = inspector.index === index - (inspector.path.length > 0 ? 1 : 0);
                        this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                        this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                     })
                     .on('click', function () {
                        const alterIndex = index - (inspector.path.length > 0 ? 1 : 0);
                        if (alterIndex === -1) {
                           void inspector.path.pop();
                           inspector.index = null;
                        } else {
                           if (inspector.index === alterIndex) {
                              inspector.path.push(alterIndex);
                              inspector.index = null;
                           } else {
                              inspector.index = alterIndex;
                           }
                        }
                     })
            );
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_storage.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(10, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { y: 27 + index * 29 },
                                 size: { x: 255, y: 25 },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: pallete.c0,
                                       font: '18px DeterminationMono',
                                       stroke: pallete.cf,
                                       anchor: { x: 0 },
                                       size: { x: 255, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             fill: pallete.cf,
                                             stroke: 'transparent',
                                             anchor: 0,
                                             position: { y: 12.5 }
                                          }).on('tick', function () {
                                             this.content = save.storage[storage.container].of(index) ?? '';
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    const container = save.storage[storage.container];
                                    if (index <= Math.min(container.size, container.capacity - 1)) {
                                       this.alpha.value = 1;
                                       this.objects[0].fill = storage.index === index ? pallete.c2 : pallete.c0;
                                       this.objects[0].objects[0].fill =
                                          storage.index === index ? pallete.cf : pallete.c7;
                                    } else {
                                       this.alpha.value = 0;
                                    }
                                 })
                                 .on('click', function () {
                                    const container = save.storage[storage.container];
                                    if (index <= Math.min(container.size, container.capacity - 1)) {
                                       if (storage.index === index) {
                                          storage.disable();
                                       } else {
                                          storage.index = index;
                                          storage.restoreInput = game.input;
                                          game.input = false;
                                       }
                                    }
                                 })
                           )
                        ]
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        content: text.d_storage.p_container.header,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    font: '18px DeterminationMono',
                                    stroke: 'transparent',
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          fill: pallete.ca,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: [
                                             text.d_storage.p_container.prev,
                                             '',
                                             text.d_storage.p_container.next
                                          ][index]
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content =
                                       text.d_storage.display[storage.container];
                                 } else {
                                    const active = panel.timer.value - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.cf : pallete.c7;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.timer.value;
                                 switch (index) {
                                    case 0:
                                       prevContainer();
                                       break;
                                    case 1:
                                       if (storage.container !== 'inventory') {
                                          storage.container = 'inventory';
                                          storage.disable();
                                       }
                                       break;
                                    case 2:
                                       nextContainer();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    nextContainer();
                                 } else {
                                    prevContainer();
                                 }
                              })
                        )
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        anchor: { x: 0 },
                        position: { y: 9 },
                        content: text.d_console.header,
                        objects: [
                           new CosmosText({
                              alpha: 0.7,
                              font: '16px DeterminationMono',
                              stroke: 'transparent',
                              plain: true,
                              position: { x: -130, y: 25 },
                              filters: [ new OutlineFilter(2, 0x000000, 0, 1) ]
                           }).on('tick', function () {
                              this.fill = logician.errored ? '#ff7f7f' : pallete.cf;
                              if (typeof logician.error === 'string') {
                                 let line = 2;
                                 let content = '> ';
                                 for (const char of logician.error) {
                                    if (char === '\n') {
                                       line = 2;
                                       content += '\n> ';
                                    } else if (line++ === 33) {
                                       line = 1;
                                       content += `\n${char}`;
                                    } else {
                                       content += char;
                                    }
                                 }
                                 this.content = logician.process(content);
                              } else {
                                 this.content = logician.process(logician.inspect(logician.error));
                              }
                           })
                        ]
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: 'transparent',
                  stroke: pallete.cf,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.cf,
                        font: '24px MarsNeedsCunnilingus',
                        anchor: { x: 0 },
                        position: { y: 9 },
                        content: text.d_console.p_resume.header,
                        objects: [
                           new CosmosRectangle({
                              font: '18px DeterminationMono',
                              stroke: 'transparent',
                              anchor: { x: 0 },
                              size: { x: 255, y: 25 },
                              position: { y: 30 },
                              fill: pallete.c2,
                              objects: [
                                 new CosmosText({
                                    fill: pallete.c7,
                                    stroke: 'transparent',
                                    anchor: 0,
                                    position: { y: 12.5 }
                                 }).on('tick', function () {
                                    this.content = text.d_console.p_resume.resume;
                                 }),
                                 new OutertaleDeveloperHitbox({ anchor: { x: 0 }, size: { x: 255, y: 25 } }).on(
                                    'click',
                                    function () {
                                       logician.resume();
                                    }
                                 )
                              ]
                           })
                        ]
                     })
                  ]
               })
            ]
         })
      ],
      switch (tab: number) {
         historian.clearIndex();
         historian.clearInput();
         storage.disable();
         for (const [ index, object ] of panel.object.objects[2].objects.entries()) {
            object.metadata.active = index === tab;
         }
         panel.object.objects[1].objects = [ panel.tab.objects[tab] ];
      },
      get value () {
         return panel.tab.objects.indexOf(panel.object.objects[1].objects[0]);
      }
   },
   get timer () {
      return panel.renderer.timer;
   },
   userError: false
};

atlas.navigators.register({
   editorAdd: new CosmosNavigator({
      flip: true,
      grid: () => [ editor.depth > 0 ? editor.types : editor.layers ],
      next (self) {
         const selection = self.selection() as string;
         if (editor.depth > 0) {
            let object: CosmosObject;
            const parent = editor.parent.object;
            switch (selection) {
               case 'animation': {
                  const decorator = { type: 'animation' } as OutertaleChildAnimationDecorator;
                  object = new CosmosAnimation({ metadata: { class: 'attachment', decorator } });
                  (parent.metadata.decorator.attachments ??= []).push(decorator);
                  break;
               }
               case 'sprite': {
                  const decorator = { type: 'sprite' } as OutertaleSpriteDecorator;
                  object = new CosmosSprite({ metadata: { class: 'attachment', decorator } });
                  (parent.metadata.decorator.attachments ??= []).push(decorator);
                  break;
               }
               case 'barrier': {
                  const decorator = {} as OutertaleChildBarrierDecorator;
                  object = new CosmosHitbox({ metadata: { barrier: true, class: 'barrier', decorator } });
                  (parent.metadata.decorator.barriers ??= []).push(decorator);
                  break;
               }
               default: {
                  const decorator = {} as OutertaleChildScriptDecorator;
                  object = new CosmosHitbox({
                     metadata: { [selection]: true, args: [], class: selection, decorator, name: '' }
                  });
                  (parent.metadata.decorator[`${selection as 'interact' | 'trigger'}s`] ??= []).push(decorator);
                  break;
               }
            }
            parent.attach(object);
            editor.generate();
            editor.save();
            for (const [ index, child ] of editor.parent.children.entries()) {
               if (child.object === object) {
                  editor.pos.y = index;
                  break;
               }
            }
         } else {
            const decorator = {} as OutertaleParentObjectDecorator;
            const object = new CosmosObject({ metadata: { class: 'object', decorator, tags: [] as string[] } });
            ((rooms.of(game.room).decorator!.layers ??= {})[selection as OutertaleLayerKey] ??= []).push(decorator);
            renderer.attach(selection as OutertaleLayerKey, object);
            const room = game.room;
            events.on('teleport', (from, to) => {
               if (from === room) {
                  renderer.detach(selection as OutertaleLayerKey, object);
               } else if (to === room) {
                  renderer.attach(selection as OutertaleLayerKey, object);
               }
            });
            editor.generate();
            editor.save();
            for (const [ index, parent ] of editor.containers.entries()) {
               if (parent.object === object) {
                  editor.pos.x = index;
                  break;
               }
            }
         }
         atlas.navigators.of('editorProperty').position = { x: 0, y: 0 };
         return 'editorProperty';
      },
      prev () {
         if (editor.depth > 0) {
            editor.parent.children.length === 0 && (editor.depth = 0);
            return 'editorObject';
         } else if (editor.containers.length > 0) {
            return 'editorObject';
         } else {
            editor.depth = -1;
            atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
               atlas.navigators.of('editorProperty').grid
            )[0].indexOf('objects');
            return 'editorProperty';
         }
      }
   }).on('from', function () {
      this.position = { x: 0, y: 0 };
   }),
   editorObject: new CosmosNavigator<string>({
      flip: true,
      grid () {
         if (editor.depth > 0) {
            return [ [ ...editor.parent.children.keys() ] ];
         } else {
            return [ [ ...editor.containers.keys() ] ];
         }
      },
      next () {
         atlas.navigators.of('editorProperty').position.y = 0;
         return 'editorProperty';
      },
      prev () {
         editor.depth--;
         atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
            atlas.navigators.of('editorProperty').grid
         )[0].indexOf('objects');
         return 'editorProperty';
      }
   }).on('change', function () {
      if (editor.depth > 0) {
         editor.pos.y = this.position.y;
      } else {
         editor.pos.x = this.position.y;
      }
   }),
   editorProperty: new CosmosNavigator({
      grid () {
         if (editor.depth === -1) {
            return [
               [
                  'preload',
                  'background',
                  'neighbors',
                  'region-min',
                  'region-max',
                  'spawn',
                  'music',
                  'gain',
                  'reverb',
                  'filter',
                  'rate',
                  'objects'
               ]
            ];
         } else {
            const meta = editor.target!.object.metadata;
            switch (meta.class) {
               case 'attachment':
                  if (meta.decorator.type === 'sprite') {
                     return [ [ 'position', 'anchor', 'auto', 'filters', 'frames', 'steps', 'rotation', 'delete' ] ];
                  } else {
                     return [ [ 'position', 'anchor', 'auto', 'filters', 'resources', 'rotation', 'delete' ] ];
                  }
               case 'barrier':
                  return [ [ 'position', 'anchor', 'size', 'rotation', 'delete' ] ];
               case 'interact':
               case 'trigger':
                  return [ [ 'position', 'anchor', 'size', 'name', 'args', 'rotation', 'delete' ] ];
               case 'object':
                  return [ [ 'position', 'filters', 'tags', 'objects', 'rotation', 'delete' ] ];
            }
         }
      },
      next (self) {
         const property = self.selection();
         if (property === 'objects') {
            if (editor.depth === -1) {
               editor.depth = 0;
               editor.pos.x = 0;
               return editor.containers.length > 0 ? 'editorObject' : 'editorAdd';
            } else {
               const target = editor.target as OutertaleEditorContainer;
               editor.depth = 1;
               editor.pos.y = 0;
               return target.children.length > 0 ? 'editorObject' : 'editorAdd';
            }
         } else if (property === 'delete') {
            const target = editor.target!;
            if (target.object.metadata.class === 'object') {
               for (const layer of editor.layers) {
                  if (renderer.layers[layer].objects.includes(target.object)) {
                     renderer.detach(layer, target.object);
                     const list = rooms.of(game.room).decorator!.layers![layer]!;
                     list.splice(list.indexOf(target.object.metadata.decorator as any), 1);
                     break;
                  }
               }
               editor.generate();
               editor.save();
               if (editor.containers.length > 0) {
                  editor.pos.x = Math.min(editor.pos.x, editor.containers.length - 1);
                  return 'editorObject';
               } else {
                  editor.depth = -1;
                  atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
                     atlas.navigators.of('editorProperty').grid
                  )[0].indexOf('objects');
                  return 'editorProperty';
               }
            } else {
               const parent = editor.parent;
               parent.object.objects.splice(parent.object.objects.indexOf(target.object), 1);
               const collection = parent.object.metadata.decorator;
               for (const key in collection) {
                  if (key !== 'tags' && key !== 'position') {
                     const list = collection[key as keyof typeof collection] as (
                        | OutertaleChildAnimationDecorator
                        | OutertaleSpriteDecorator
                        | OutertaleChildBarrierDecorator
                        | OutertaleChildScriptDecorator
                     )[];
                     if (list.includes(target.object.metadata.decorator)) {
                        list.splice(list.indexOf(target.object.metadata.decorator as any), 1);
                        break;
                     }
                  }
               }
               editor.generate();
               editor.save();
               for (const [ index, other ] of editor.containers.entries()) {
                  if (other.object === parent.object) {
                     editor.pos.x = index;
                     break;
                  }
               }
               if (parent.children.length > 0) {
                  editor.pos.y = Math.min(editor.pos.y, parent.children.length - 1);
                  return 'editorObject';
               } else {
                  editor.depth = 0;
                  atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
                     atlas.navigators.of('editorProperty').grid
                  )[0].indexOf('objects');
                  return 'editorProperty';
               }
            }
         } else {
            switch (editor.group) {
               case 'array':
               case 'boolean':
                  editor.index = 0;
                  atlas.navigators.of('editorValue').position.y = 0;
                  break;
               case 'number':
                  editor.index = 1;
                  atlas.navigators.of('editorValue').position.y = 0;
                  break;
               case 'vector':
                  editor.index = 1;
                  atlas.navigators.of('editorValue').position.y = 1;
                  break;
            }
            editor.editTime = panel.timer.value + 50;
            if (editor.group === 'array' || editor.group === 'string') {
               editor.input = game.input;
               game.input = false;
            }
            return 'editorValue';
         }
      },
      prev () {
         if (editor.depth === -1) {
            editor.disable();
         } else {
            return 'editorObject';
         }
      }
   }),
   editorValue: new CosmosNavigator<string>({
      grid () {
         switch (editor.group) {
            case 'array':
               if (editor.depth === -1) {
                  return [ ...(editor.room[editor.property as 'preload' | 'neighbors'] || []).keys() ].map(value => [
                     value
                  ]);
               } else {
                  //@ts-expect-error
                  return [ ...editor.target.object.metadata[editor.property].keys() ].map(value => [ value ]);
               }
            case 'boolean':
               return [ [ 0 ], [ 1 ] ];
            case 'number':
               return [ [ 0 ], [ 1 ], [ 2 ] ];
            case 'vector':
               return [
                  [ 0, 1, 2 ],
                  [ 3, 4, 5 ],
                  [ 6, 7, 8 ]
               ];
            default:
               return [ [] ];
         }
      },
      prev: 'editorProperty'
   })
      .on('change', () => {
         if (editor.depth === -1) {
            const room = editor.room;
            const position = atlas.navigators.of('editorValue').position;
            const property = editor.property;
            switch (editor.group) {
               case 'number': {
                  const rate = property === 'rate';
                  if (position.x === 0) {
                     (room.score ??= {})[property as 'gain' | 'reverb' | 'filter' | 'rate'] = Math.min(
                        Math.max(
                           (room.score[property as 'gain' | 'reverb' | 'filter' | 'rate'] ??= [ 'gain', 'rate' ].includes(
                              property
                           )
                              ? 1
                              : 0) - (keys.interactKey.active() ? 0.01 : 0.2),
                           0
                        ),
                        rate ? Infinity : 1
                     );
                     position.x = 1;
                  } else if (position.x === 2) {
                     (room.score ??= {})[property as 'gain' | 'reverb' | 'filter' | 'rate'] = Math.min(
                        Math.max(
                           (room.score[property as 'gain' | 'reverb' | 'filter' | 'rate'] ??= [ 'gain', 'rate' ].includes(
                              property
                           )
                              ? 1
                              : 0) + (keys.interactKey.active() ? 0.01 : 0.2),
                           0
                        ),
                        rate ? Infinity : 1
                     );
                     position.x = 1;
                  }
                  editor.save();
                  break;
               }
               case 'vector': {
                  const amount = keys.interactKey.active() ? 20 : 1;
                  if (position.x === 0) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).x -= amount;
                     position.x = 1;
                  } else if (position.x === 2) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).x += amount;
                     position.x = 1;
                  } else if (position.y === 0) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).y -= amount;
                     position.y = 1;
                  } else if (position.y === 2) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).y += amount;
                     position.y = 1;
                  }
                  if (property === 'spawn') {
                     const spawn = rooms.of(game.room).spawn;
                     spawn.x = room.spawn?.x;
                     spawn.y = room.spawn?.y;
                  } else {
                     rooms.of(game.room).region = [
                        { x: room.region![0].x, y: room.region![0].y },
                        { x: room.region![1].x, y: room.region![1].y }
                     ];
                     renderer.region = [
                        { x: room.region![0].x, y: room.region![0].y },
                        { x: room.region![1].x, y: room.region![1].y }
                     ];
                  }
                  editor.save();
                  break;
               }
            }
         } else {
            const object = editor.target!.object as any;
            const position = atlas.navigators.of('editorValue').position;
            const property = editor.property;
            switch (editor.group) {
               case 'boolean': {
                  (object.metadata.decorator[property] = object[property] = !object[property])
                     ? object.enable()
                     : object.reset();
                  editor.save();
                  break;
               }
               case 'number': {
                  const prop = object[property];
                  const amount = keys.interactKey.active() ? 15 : 1;
                  if (position.x === 0) {
                     if (prop instanceof CosmosValue) {
                        prop.value -= amount;
                     } else {
                        object[property] -= amount;
                     }
                     position.x = 1;
                  } else if (position.x === 2) {
                     if (prop instanceof CosmosValue) {
                        prop.value += amount;
                     } else {
                        object[property] += amount;
                     }
                     position.x = 1;
                  }
                  object.metadata.decorator[property] = prop instanceof CosmosValue ? prop.value : object[property];
                  editor.save();
                  break;
               }
               case 'vector': {
                  const anchor = property === 'anchor';
                  const amount = (keys.interactKey.active() ? (anchor ? 0.05 : 20) : 1) * (anchor ? -1 : 1);
                  if (position.x === 0) {
                     object[property].x -= amount;
                     position.x = 1;
                  } else if (position.x === 2) {
                     object[property].x += amount;
                     position.x = 1;
                  } else if (position.y === 0) {
                     object[property].y -= amount;
                     position.y = 1;
                  } else if (position.y === 2) {
                     object[property].y += amount;
                     position.y = 1;
                  }
                  object.metadata.decorator[property] = object[property].value();
                  editor.save();
                  break;
               }
            }
         }
      })
      .on('to', () => {
         if (editor.input) {
            game.input = true;
            editor.input = false;
         }
      })
});

inspector.hitboxGraphics.scale.set(2, 2);
panel.renderer.attach('main', panel.object);
panel.tab.switch(0);

events.on('modded', () => {
   new URLSearchParams(location.search).has('panel') && panel.start();
   godhome.room = save.data.s.room;
});

keys.backspaceKey.on('down', () => {
   if (!panel.userError) {
      keys.altKey.active() && keys.shiftKey.active() && (game.developer ? panel.stop() : panel.start());
      logician.resume();
   }
});

keys.downKey.on('down', key => {
   if (editor.input && key === 'ArrowDown') {
      const property = editor.property;
      if (editor.group === 'array') {
         if (editor.depth === -1) {
            const array = editor.room[property as 'preload' | 'neighbors'];
            if (array?.length ?? 0 > 0) {
               array?.splice(editor.index, 1);
               editor.index = Math.min(Math.max(editor.index, 0), (array?.length ?? 0) - 1);
            }
         } else {
            const object = editor.target!.object as CosmosObject;
            const meta = object.metadata as any;
            if (meta.decorator[property]?.length ?? 0 > 0) {
               if (property === 'filters') {
                  object.container.filters?.splice(editor.index, 1);
               } else {
                  meta[property].splice(editor.index, 1);
               }
               meta.decorator[property].splice(editor.index, 1);
               if (property === 'filters') {
                  editor.index = Math.min(Math.max(editor.index, 0), (object.container.filters?.length ?? 1) - 1);
               } else {
                  editor.index = Math.min(Math.max(editor.index, 0), meta[property].length - 1);
               }
            }
         }
      }
   }
});

keys.editorKey.on('down', () => {
   game.developer && game.input && !editor.input && (editor.active ? editor.disable() : editor.enable());
});

keys.openKey.on('down', async () => {
   if (keys.altKey.active()) {
      if (!backend.available) {
         const files = await fileDialog();
         if (files.length > 0) {
            try {
               const entries = CosmosUtils.parse(await files.item(0)!.text()) as [string, string][];
               const data = entries.find(entry => entry[0] === save.namespace)?.[1] ?? '{}';
               const strings: Partial<OutertaleDataString> = CosmosUtils.parse(data).s ?? {};
               if (
                  confirm(
                     `${text.d_prompt_open}\n${strings.name || text.g_unknown} @ ${
                        saver.locations.of(strings.room || 'w_start').name
                     }`
                  )
               ) {
                  saver.reset(true, false, true);
                  for (const [ key, value ] of entries) {
                     saver.protected.includes(key.slice(save.namespace.length)) || save.manager.setItem(key, value);
                  }
                  save.manager.setItem(save.namespace, data);
                  reload();
               }
            } catch {
               alert('That SAVE file could not be parsed.');
            }
         }
      } else if (game.developer) {
         const data = keys.shiftKey.active() ? '[]' : await backend.dialog.open();
         if (data) {
            await backend.file.writeSave(data);
            reload(!save.data.s.name);
         }
      }
   }
});

keys.saveKey.on('down', async () => {
   if (keys.altKey.active()) {
      if (!backend.available) {
         const data = save.manager.getItem(save.namespace) ?? '{}';
         const strings: Partial<OutertaleDataString> = CosmosUtils.parse(data).s ?? {};
         if (
            confirm(
               `${text.d_prompt_save}\n${strings.name || text.g_unknown} @ ${
                  saver.locations.of(strings.room || 'w_start').name
               }`
            )
         ) {
            const link = document.createElement('a');
            link.download = 'universe.json';
            link.href = `data:text/json,${panel.serializeSAVE()}`;
            link.click();
         }
      } else if (game.developer) {
         typeof random === 'object' && (save.data.n.base1 = random.value);
         save.data.s.room = game.room;
         saver.save();
         backend.dialog.save(panel.serializeSAVE());
      }
   }
});

keys.upKey.on('down', key => {
   if (editor.input) {
      if (key === 'ArrowUp') {
         const property = editor.property;
         if (editor.group === 'array') {
            if (editor.depth === -1) {
               const room = editor.room;
               (room[property as 'preload' | 'neighbors'] ??= []).push('');
            } else {
               const object = editor.target!.object as any;
               if (property === 'filters') {
                  (object.container.filters ??= []).push(new Filter());
               } else if (property === 'frames') {
                  object.frames.push(null);
               } else {
                  object.metadata[property].push('');
               }
               (object.metadata.decorator[property] ??= []).push('');
            }
         }
      }
   } else if (editor.active && atlas.target === 'editorObject') {
      atlas.switch('editorAdd');
   }
});

panel.renderer.on('tick', function () {
   panel.renderer.layers.main.container.removeChild(inspector.hitboxGraphics);
});

panel.renderer.on('render', function () {
   panel.renderer.layers.main.container.addChild(inspector.hitboxGraphics);
   inspector.hitboxGraphics.clear();
   const camera = renderer.freecam ? renderer.position : renderer.position.clamp(...renderer.region);
   for (const [ key, layer ] of Object.entries(renderer.layers)) {
      const zoom = layer.modifiers.includes('fixed') ? 1 : renderer.zoom.value;
      CosmosUtils.chain(
         [
            false,
            [
               new CosmosPoint(layer.modifiers.includes('fixed') ? 0 : camera.multiply(-zoom).add(160, 120)),
               0,
               new CosmosPoint(zoom)
            ],
            layer.objects
         ] as [boolean, CosmosTransform, CosmosObject[]],
         ([ wasActive, transform, objects ], next) => {
            for (const object of objects) {
               const active = wasActive || object === inspector.target;
               const [ position, rotation, scale ] = CosmosMath.transform(transform, object, camera, zoom);
               if (object instanceof CosmosAnchoredObject && (active || inspector.switches[key as OutertaleLayerKey])) {
                  draw: {
                     let style: { alpha: number; color: number; width: number };
                     if (active) {
                        style = {
                           alpha: 1,
                           color: CosmosBitmap.color2hex(
                              CosmosImage.utils.color.of(`hsl(${inspector.hitboxTint},100%,50%)`)
                           ),
                           width: 1
                        };
                     } else if (object instanceof CosmosHitbox && inspector.switches.hitbox) {
                        style = { alpha: 0.75, color: 0xffffff, width: 1 };
                     } else if (object instanceof CosmosSprite && inspector.switches.sprite) {
                        style = { alpha: 0.5, color: 0xffffff, width: 1 };
                     } else if (object instanceof CosmosText && inspector.switches.text) {
                        style = { alpha: 0.25, color: 0xffffff, width: 1 };
                     } else {
                        break draw;
                     }
                     const size = object.compute().multiply(scale);
                     const half = size.divide(2);
                     const base = position.subtract(half.add(half.multiply(object.anchor)));
                     if (object.offsets.length > 0) {
                        base.set(base.subtract(object.offsets.reduce((prev, curr) => prev.add(curr))));
                     }
                     const shift = rotation + 180;
                     const corner2 = base.endpoint(0, size.x);
                     const corner3 = corner2.endpoint(90, size.y);
                     const corner4 = corner3.endpoint(180, size.x);
                     const points = [
                        position.endpoint(position.angleFrom(base) + shift, position.extentOf(base)),
                        position.endpoint(position.angleFrom(corner2) + shift, position.extentOf(corner2)),
                        position.endpoint(position.angleFrom(corner3) + shift, position.extentOf(corner3)),
                        position.endpoint(position.angleFrom(corner4) + shift, position.extentOf(corner4))
                     ];
                     inspector.hitboxGraphics.moveTo(points[3].x, points[3].y);
                     inspector.hitboxGraphics.lineStyle({ alpha: 0.125, color: 0xffffff, width: 1 });
                     for (const { x, y } of object.offsets) {
                        for (const point of points) {
                           inspector.hitboxGraphics.lineTo(point.x, point.y);
                        }
                        for (const point of points) {
                           inspector.hitboxGraphics.moveTo(point.x, point.y);
                           point.set(point.add(x, y));
                           inspector.hitboxGraphics.lineTo(point.x, point.y);
                        }
                     }
                     inspector.hitboxGraphics.lineStyle(style);
                     for (const point of points) {
                        inspector.hitboxGraphics.lineTo(point.x, point.y);
                     }
                  }
               }
               next([ active, [ position, rotation, scale ], object.objects ]);
            }
         }
      );
   }
   if (renderer.freecam) {
      const base = camera.multiply(-renderer.zoom.value).add(160, 120);
      inspector.hitboxGraphics
         .beginFill(0xff00ff, 1 / 16)
         .drawRect(
            base.x + (renderer.region[0].x - 160) * renderer.zoom.value,
            base.y + (renderer.region[0].y - 120) * renderer.zoom.value,
            (renderer.region[1].x - renderer.region[0].x + 320) * renderer.zoom.value,
            (renderer.region[1].y - renderer.region[0].y + 240) * renderer.zoom.value
         )
         .endFill();
      inspector.hitboxGraphics.lineStyle({
         alpha: 0.5,
         color: 0xff00ff,
         width: 1
      });
      const p1 = base.add(
         game.camera.position
            .clamp(...renderer.region)
            .subtract(160, 120)
            .multiply(renderer.zoom.value)
      );
      const p2 = p1.add(new CosmosPoint(320, 240).multiply(renderer.zoom.value));
      inspector.hitboxGraphics.moveTo(p1.x, p1.y);
      inspector.hitboxGraphics.lineTo(p2.x, p1.y);
      inspector.hitboxGraphics.lineTo(p2.x, p2.y);
      inspector.hitboxGraphics.lineTo(p1.x, p2.y);
      inspector.hitboxGraphics.lineTo(p1.x, p1.y);
   }
   if (++inspector.hitboxTint === 360) {
      inspector.hitboxTint = 0;
   }
});

panel.renderer.wrapper!.addEventListener('click', event => {
   const target = panel.object.objects[0];
   target.position.set(event.offsetX - 640, event.offsetY);
   for (const hitbox of panel.renderer.detect(
      target as CosmosHitbox,
      ...panel.renderer.calculate('main', hbox => hbox instanceof OutertaleDeveloperHitbox)
   )) {
      (hitbox as OutertaleDeveloperHitbox).fire('click');
   }
});

panel.renderer.wrapper!.addEventListener(
   'wheel',
   event => {
      const direction = event.deltaY < 0 ? -1 : 1;
      const target = panel.object.objects[0];
      target.position.set(event.offsetX - 640, event.offsetY);
      for (const hitbox of panel.renderer.detect(
         target as CosmosHitbox,
         ...panel.renderer.calculate('main', hbox => hbox instanceof OutertaleDeveloperHitbox)
      )) {
         (hitbox as OutertaleDeveloperHitbox).fire('wheel', direction);
      }
   },
   { passive: true }
);

panel.renderer.wrapper!.addEventListener('mousedown', event => {
   if (!panel.dragger.state) {
      if (renderer.freecam) {
         panel.dragger.origin.x = renderer.x;
         panel.dragger.origin.y = renderer.y;
      } else if (inspector.path.length > 0 && inspector.target instanceof CosmosObject) {
         panel.dragger.origin.x = inspector.target.x;
         panel.dragger.origin.y = inspector.target.y;
      } else {
         return;
      }
      panel.dragger.state = true;
      panel.dragger.offset.x = event.offsetX;
      panel.dragger.offset.y = event.offsetY;
   }
});

panel.renderer.wrapper!.addEventListener('mousemove', event => {
   if (panel.dragger.state) {
      if (renderer.freecam) {
         const zoom = renderer.scale.multiply(renderer.zoom.value);
         renderer.position.set(
            panel.dragger.origin.x + (panel.dragger.offset.x - event.offsetX) / zoom.x,
            panel.dragger.origin.y + (panel.dragger.offset.y - event.offsetY) / zoom.y
         );
      } else if (inspector.path.length > 0 && inspector.target instanceof CosmosObject) {
         inspector.target.position.set(
            panel.dragger.origin.x + (event.offsetX - panel.dragger.offset.x) / 2,
            panel.dragger.origin.y + (event.offsetY - panel.dragger.offset.y) / 2
         );
      }
   }
});

panel.renderer.wrapper!.addEventListener('mouseup', () => {
   panel.dragger.state = false;
});

panel.renderer.wrapper!.addEventListener(
   'wheel',
   event => {
      if (renderer.freecam) {
         if (event.deltaY < 0) {
            renderer.zoom.value *= zoomFactor;
         } else {
            renderer.zoom.value /= zoomFactor;
         }
      }
   },
   { passive: true }
);

addEventListener('error', event => {
   logician.suspend(event.error);
});

addEventListener('keydown', event => {
   if (editor.input && editor.editTime <= panel.timer.value) {
      let value = '';
      const property = editor.property;
      if (editor.depth === -1) {
         const room = editor.room;
         switch (editor.group) {
            case 'array':
               if (room[property as 'preload' | 'neighbors']?.length ?? 0 > 0) {
                  value = room[property as 'preload' | 'neighbors']![editor.index];
               } else {
                  return;
               }
               break;
            case 'string':
               value = room.score?.music ?? '';
               break;
            default:
               return;
         }
      } else {
         const object = editor.target!.object as any;
         switch (editor.group) {
            case 'array':
               if (object.metadata.decorator[property]?.length ?? 0 > 0) {
                  value = object.metadata.decorator[property][editor.index];
               } else {
                  return;
               }
               break;
            case 'string':
               value = object.metadata.decorator[property] || '';
               break;
            default:
               return;
         }
      }
      if (event.key === 'Backspace') {
         value = value.slice(0, -1);
      } else if (event.key.length === 1) {
         value += event.key;
      } else if (event.key === 'Enter') {
         atlas.prev();
      }
      if (editor.depth === -1) {
         const room = editor.room;
         switch (editor.group) {
            case 'array':
               room[property as 'preload' | 'neighbors']![editor.index] = value;
               editor.save();
               if (value in content) {
                  const resource = content[value as keyof typeof content];
                  resource.load();
               } else if (value in inventories) {
                  const resource = inventories[value as keyof typeof inventories];
                  resource.load();
               }
               break;
            case 'string':
               (room.score ??= {}).music = value;
               editor.save();
               break;
         }
      } else {
         const object = editor.target!.object as any;
         switch (editor.group) {
            case 'array':
               if (property === 'filters') {
                  if (image.filters.has(value)) {
                     object.container.filters[editor.index] = image.filters.get(value);
                  }
               } else if (property === 'frames') {
                  if (value in content) {
                     const frame = content[value as keyof typeof content];
                     if (!frame.source.includes('\n')) {
                        frame.load().then(() => {
                           object.frames[editor.index] = frame;
                        });
                     }
                  }
               } else {
                  object.metadata[property][editor.index] = value;
               }
               object.metadata.decorator[property][editor.index] = value;
               editor.save();
               break;
            case 'string':
               if (property === 'resources') {
                  if (value in content) {
                     const resources = content[value as keyof typeof content];
                     if (resources.source.includes('\n')) {
                        resources.load().then(() => {
                           object.resources = resources;
                        });
                     }
                  }
               } else {
                  object.metadata.name = value;
               }
               object.metadata.decorator[property] = value;
               editor.save();
               break;
         }
      }
   } else if (historian.input && historian.index !== null) {
      let value = '';
      let numeric = false;
      const infoEntry = historian.entries[historian.index];
      switch (infoEntry.domain) {
         case 'dataNumber':
            value = `${historian.numericValue ?? save.data.n[infoEntry.key]}`;
            numeric = true;
            break;
         case 'dataString':
            value = save.data.s[infoEntry.key];
            break;
         case 'flagNumber':
            value = `${historian.numericValue ?? save.flag.n[infoEntry.key]}`;
            numeric = true;
            break;
         case 'flagString':
            value = save.flag.s[infoEntry.key];
            break;
      }
      if (event.key === 'Backspace') {
         if (numeric) {
            if ([ 'NaN', 'Infinity', '-Infinity', '0', '-0' ].includes(value)) {
               value = '0';
            } else {
               value = value.slice(0, -1);
               if (value === '-') {
                  value = '-0';
               } else if (value === '') {
                  value = '0';
               }
            }
         } else {
            value = value.slice(0, -1);
         }
      } else if (event.key.length === 1) {
         if (numeric) {
            if ('0123456789'.includes(event.key)) {
               if (!value.includes('Infinity') && !value.includes('NaN')) {
                  if (value === '0') {
                     value = event.key;
                  } else if (value === '-0') {
                     value = `-${event.key}`;
                  } else {
                     value += event.key;
                     if (+value === Infinity) {
                        value = 'Infinity';
                     } else if (+value === -Infinity) {
                        value = '-Infinity';
                     } else if (+value <= 1 && -1 <= +value && value.length > 20) {
                        const negative = value[0] === '-';
                        value = `${+value}`;
                        if (negative && value[0] !== '-') {
                           value = `-${value}`;
                        }
                     }
                  }
               }
            } else if (event.key === '-') {
               if (value[0] === '-') {
                  value = value.slice(1);
               } else {
                  value = `-${value}`;
               }
            } else if (event.key === '.') {
               if (!value.includes('.') && !value.includes('Infinity')) {
                  value += '.';
               }
            } else if (event.key === 'i') {
               if (+value === 0) {
                  if (value[0] === '-') {
                     value = '-Infinity';
                  } else {
                     value = 'Infinity';
                  }
               } else {
                  value = `${+value * Infinity}`;
               }
            }
         } else {
            value += event.key;
         }
      } else if (event.key === 'Enter') {
         historian.clearInput();
      }
      numeric && (historian.numericValue = value);
      switch (infoEntry.domain) {
         case 'dataNumber':
            (save.data.n as any)[infoEntry.key] = +value;
            switch (infoEntry.key) {
               case 'base1':
                  typeof random === 'object' && (random.value = +value);
                  break;
            }
            break;
         case 'flagNumber':
            (save.flag.n as any)[infoEntry.key] = +value;
            break;
         case 'dataString':
            (save.data.s as any)[infoEntry.key] = value;
            break;
         case 'flagString':
            save.flag.s[infoEntry.key] = value;
            break;
      }
   } else if (storage.index > -1) {
      const container = save.storage[storage.container];
      let value = container.of(storage.index) ?? '';
      if (event.key === 'Backspace') {
         value = value.slice(0, -1);
      } else if (event.key.length === 1) {
         value += event.key;
      } else if (event.key === 'Enter') {
         storage.disable();
         return;
      }
      if (value) {
         container.of(storage.index) ? container.set(storage.index, value) : container.add(value);
      } else {
         container.remove(storage.index);
         storage.index === Math.min(container.size, container.capacity - 1) || storage.disable();
      }
   }
});

addEventListener('unhandledrejection', event => {
   logician.suspend(event.reason);
});

keys.noclipKey
   .on('down', () => game.developer && game.input && !editor.input && (game.noclip = true))
   .on('up', () => game.developer && game.input && !editor.input && (game.noclip = false));

keys.freecamKey
   .on('down', () => game.developer && game.input && !editor.input && (renderer.freecam = true))
   .on('up', () => {
      if (game.developer && game.input && !editor.input) {
         renderer.freecam = false;
         renderer.zoom.value = 1;
      }
   });

CosmosUtils.status(`LOAD MODULE: DEVELOPER (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
