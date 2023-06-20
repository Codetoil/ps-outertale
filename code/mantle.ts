import { AdvancedBloomFilter, CRTFilter, GlitchFilter, GrayscaleFilter } from 'pixi-filters';
import { BLEND_MODES, Filter, Graphics, Rectangle, isMobile } from 'pixi.js';
import assets, { effectSetup } from './assets';
import {
   OutertaleBox,
   OutertaleBypassAnimation,
   OutertaleChoice,
   OutertaleGroup,
   OutertaleLayerKey,
   OutertaleMap,
   OutertaleOpponent,
   OutertaleRoom,
   OutertaleRoomDecorator,
   OutertaleShop,
   OutertaleStat,
   OutertaleTurnState,
   OutertaleVolatile,
   OutertaleWeapon
} from './classes';
import content, { inventories } from './content';
import {
   atlas,
   audio,
   backend,
   events,
   exit,
   game,
   image,
   items,
   keys,
   launch,
   maps,
   param,
   random,
   reload,
   renderer,
   rooms,
   speech,
   timer,
   typer
} from './core';
import { CosmosAtlas, CosmosNavigator } from './engine/atlas';
import { CosmosDaemon, CosmosInstance } from './engine/audio';
import { CosmosAsset, CosmosCache, CosmosInventory, CosmosRegistry, CosmosTimer } from './engine/core';
import {
   CosmosCharacter,
   CosmosCharacterPreset,
   CosmosCharacterProperties,
   CosmosEntity,
   CosmosPlayer
} from './engine/entity';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosBitmap,
   CosmosColor,
   CosmosImage,
   CosmosSprite,
   CosmosSpriteProperties
} from './engine/image';
import { CosmosKeyboardInput } from './engine/input';
import { CosmosMath, CosmosPoint, CosmosPointSimple, CosmosValue } from './engine/numerics';
import {
   CosmosBaseEvents,
   CosmosHitbox,
   CosmosObject,
   CosmosRegion,
   CosmosRenderer,
   CosmosSizedObjectProperties
} from './engine/renderer';
import { CosmosRectangle } from './engine/shapes';
import { CosmosText, CosmosTextProperties, CosmosTyper } from './engine/text';
import { CosmosBasic, CosmosDirection, CosmosKeyed, CosmosNot, CosmosProvider, CosmosUtils } from './engine/utils';
import save from './save';
import text from './text';

export const deathContext = new AudioContext();
export const deathTimer = new CosmosTimer();
export const deathToggle = deathContext.createGain();

export function deathRouter (input: GainNode, context: AudioContext) {
   input.connect(deathToggle).connect(context.destination);
}

const perfectTint = 0xffecbf;

export const battler = {
   /** in battle screen */
   active: false,
   /** nomore act keys! */
   acts: new CosmosRegistry<string, string>(''),
   // add opponent to battler
   add (opponent: OutertaleOpponent, position: CosmosPointSimple) {
      const volatile = {
         alive: true,
         container: new CosmosObject({ position }) as CosmosObject & {
            objects: CosmosSprite[];
         },
         dead: false,
         flirted: false,
         opponent,
         hp: opponent.hp,
         sparable: opponent.sparable || false,
         vars: {}
      };
      volatile.container.attach(opponent.sprite(volatile));
      battler.volatile.push(volatile);
      battler.overlay.attach(volatile.container);
      return battler.volatile.length - 1;
   },
   // only the active volatile states
   get alive () {
      return battler.volatile.filter(value => value.alive);
   },
   // alpha of battler menus
   alpha: new CosmosValue(1),
   /** whether the assist option is present */
   assist: false,
   // garbo func
   async attack (
      volatile: OutertaleVolatile,
      {
         // item to use
         item = save.data.s.weapon,
         // attack power
         power = 0,
         // operation to use
         operation = 'calculate' as 'add' | 'multiply' | 'calculate' | 'none'
      },
      noEffects = false,
      noVictory = false,
      noArc = false
   ) {
      const info = volatile.opponent;

      // damage calculation
      const startHP = volatile.hp;
      switch (operation) {
         case 'calculate':
            volatile.hp -= battler.calculate(volatile, power, item);
            break;
         case 'add':
            volatile.hp += power;
            break;
         case 'multiply':
            volatile.hp *= power;
            break;
      }

      // normalize hp
      const trueDamage = startHP - volatile.hp;
      volatile.hp < 0 && (volatile.hp = 0);

      // sprite calculation
      const next = info.goodbye?.(volatile) || volatile.container.objects[0];
      const half = new CosmosPoint((next.metadata.size as CosmosPointSimple) || next.compute()).divide(2);
      const base = volatile.container.position.add(next.position.subtract(half.add(half.multiply(next.anchor))));
      const prev = volatile.container.objects[0];

      // damage indicator
      const barsize = Math.max(half.x * next.scale.x * 2, 60) * 1.25;
      const healthbar = new CosmosRectangle({
         anchor: 0,
         position: base.add(half.x, -7).clamp({ x: -Infinity, y: 25 }, { x: Infinity, y: 215 }),
         stroke: 'black',
         fill: '#404040',
         size: { y: 7.5, x: barsize },
         border: 0.5
      });
      const healthbarFill = new CosmosRectangle({
         anchor: { y: 0 },
         position: { x: barsize / -2 + 0.25 },
         fill: '#0f0',
         stroke: 'transparent',
         size: { y: 7, x: Math.ceil((barsize - 0.5) * (startHP / info.hp)) }
      });
      const dmgtext = Math.round(info.ghost ? 0 : trueDamage).toString();
      const indicator = new CosmosHitbox({
         position: { x: (dmgtext.length * 14 + (dmgtext.length - 1)) / -2 },
         objects: dmgtext.split('').map((value, index) => {
            const anim = new CosmosAnimation({
               anchor: { y: 1 },
               scale: 0.5,
               position: { x: index * 15, y: -3.875 - 0.5 },
               resources: content.ibuIndicator,
               tint: 0xff0000
            });
            anim.index = +value;
            return anim;
         })
      });
      healthbar.attach(healthbarFill, indicator);

      // strike animations
      volatile.container.objects[0] = next;
      renderer.attach('menu', healthbar);
      indicator.position.modulate(timer, 850, { y: -20 }, { y: -20 }, { y: 2 }).then(() => {
         indicator.position.modulate(timer, 100, {}, { y: 0 });
      });
      healthbarFill.size.modulate(timer, 400, { x: Math.ceil((barsize - 0.5) * (volatile.hp / info.hp) * 2) / 2 });

      // strike sfx
      if (info.ghost) {
         await timer.pause(1000);
      } else {
         const dramatic = info.dramatic && volatile.hp === 0;
         assets.sounds.strike.instance(timer);
         info.hurt && timer.pause(250).then(() => info.hurt!.instance(timer));
         if (!noArc) {
            if (battler.weapons.of(item).arc) {
               const victims = battler.alive.filter(vola => vola.opponent.metadata.arc && vola !== volatile);
               for (const [ index, volatile ] of victims.entries()) {
                  const damig = Math.min(
                     battler.calculate(volatile, power / 2 / (victims.length + 1)),
                     volatile.hp - 1
                  );
                  timer.pause(133.333 + index * (100 / 3)).then(() => {
                     battler.attack(volatile, { operation: 'add', power: -damig }, true, true, true);
                  });
               }
            }
         }
         let index = dramatic ? 15 : 30;
         const origin = next.position.x;
         while (index-- > 0) {
            if (index > 0) {
               next.position.x =
                  origin + Math.floor(index / 3) * (Math.floor((index % 4) / 2) * 2 - 1) * (dramatic ? 2 : 1);
            } else {
               next.position.x = origin;
            }
            dramatic ? await timer.pause(200) : await renderer.on('tick');
         }
      }

      // end animations
      renderer.detach('menu', healthbar);

      // death check
      if (volatile.hp === 0) {
         // de-activate opponent
         volatile.alive = false;

         // your EXP increased, punk
         battler.exp += info.exp;

         // vaporization animation
         noEffects || (await battler.vaporize(next));

         // end battle?
         if (battler.alive.length === 0) {
            noVictory || events.fire('victory');
         }
         return true;
      } else {
         volatile.container.objects[0] = prev;
         return false;
      }
   },
   /** damage multiplier for next attack */
   attackMultiplier: 1,
   // "fall" into battles
   async battlefall (player: CosmosPlayer, target = null as CosmosPointSimple | null) {
      target ??= battler.buttons[0].position.add(8, 11);
      let index = 0;
      const overlay = new CosmosRectangle({
         fill: 'black',
         size: 1000,
         priority: 999,
         metadata: { fade: false },
         anchor: 0
      }).on('tick', function () {
         this.metadata.fade || this.position.set(new CosmosPoint(game.camera).clamp(...renderer.region));
      });
      renderer.detach('main', player);
      renderer.attach('above', overlay, player);
      player.priority.value = 1000;
      battler.SOUL.alpha.value = 1;
      const posTicker = () => {
         battler.SOUL.position = renderer.projection(player.position.subtract(0, 15));
      };
      battler.SOUL.on('tick', posTicker);
      while (index++ < 3) {
         assets.sounds.noise.instance(timer);
         if (index < 3) {
            await timer.pause(70);
            battler.SOUL.alpha.value = 0;
            await timer.pause(70);
            battler.SOUL.alpha.value = 1;
         }
      }
      renderer.detach('above', player);
      player.priority.value = 0;
      assets.sounds.battlefall.instance(timer);
      battler.SOUL.off('tick', posTicker);
      await battler.SOUL.position.modulate(timer, 600, target);
      events.on('battle').then(() => {
         renderer.detach('above', overlay);
         overlay.objects = [];
         overlay.position.set(160, 120);
         renderer.attach('menu', overlay);
         overlay.metadata.fade = true;
         overlay.alpha.modulate(timer, 600, 0).then(() => {
            renderer.detach('menu', overlay);
         });
         renderer.attach('main', player);
      });
   },
   box: new OutertaleBox({
      objects: [
         (() => {
            const object = new CosmosObject().on('tick', function () {
               if (!this.filters && battler.clipFilter.value) {
                  this.filters = [ battler.clipFilter.value ];
               }
               if (battler.line.active) {
                  if (this.objects.length > 0) {
                     battler.line.offset = (battler.line.offset + battler.line.loop + 20) % 20;
                  } else {
                     this.objects = CosmosUtils.populate(8, index =>
                        new CosmosRectangle({ anchor: 0, size: { y: 0.5 }, fill: '#800080' }).on('tick', function () {
                           if (battler.line.amount > index) {
                              this.alpha.value = 1;
                              this.size.x = battler.line.width;
                              this.position.y = battler.box.size.y / -2 + battler.line.offset + index * 20 - 0.5;
                           } else {
                              this.alpha.value = 0;
                           }
                        })
                     );
                  }
               } else if (this.objects.length > 0) {
                  this.objects = [];
               }
            });
            object.container.filterArea = renderer.area!;
            return object;
         })(),
         (() => {
            const object = new CosmosObject().on('tick', function () {
               if (!this.filters && battler.clipFilter.value) {
                  this.filters = [ battler.clipFilter.value ];
               }
               this.position.set(battler.box.position.multiply(-1));
            });
            object.container.filterArea = renderer.area!;
            return object;
         })(),
         new CosmosObject().on('tick', function () {
            this.position.set(battler.box.position.multiply(-1));
            if (battler.line.active && battler.line.sticky) {
               battler.SOUL.x += battler.box.x - battler.line.pos.x;
               battler.line.pos.x = battler.box.x;
            }
         })
      ]
   }).on('tick', function () {
      if (this.metadata.alpha === void 0) {
         this.alpha.value = battler.alpha.value;
      } else {
         this.alpha.value = this.metadata.alpha as number;
      }
      const truePosition = this.position.multiply(2);
      if (battler.clipFilter.value) {
         battler.clipFilter.value.uniforms.minX = truePosition.x - this.size.x;
         battler.clipFilter.value.uniforms.medX = truePosition.x;
         battler.clipFilter.value.uniforms.maxX = truePosition.x + this.size.x;
         battler.clipFilter.value.uniforms.minY = truePosition.y - this.size.y;
         battler.clipFilter.value.uniforms.medY = truePosition.y;
         battler.clipFilter.value.uniforms.maxY = truePosition.y + this.size.y;
         battler.clipFilter.value.uniforms.rads = Math.PI - (((this.rotation.value + 90) % 360) * Math.PI) / 180;
      }
   }),
   btext: {
      async victory () {
         const love = battler.love();
         await typer.text(text.b_victory1);
         love && (await typer.text(text.b_victory2));
      },
      async death () {
         await battler.deathTyper.text(
            ...[ text.b_death1, text.b_death2, text.b_death3, text.b_death4, text.b_death5 ][
               Math.floor(random.next() * 5)
            ]
         );
      },
      escape () {
         game.text =
            battler.exp > 0 || battler.g > 0
               ? text.b_flee5.replace('$(x)', battler.exp.toString()).replace('$(y)', battler.g.toString())
               : [ text.b_flee1, text.b_flee1, text.b_flee2, text.b_flee3 ][Math.round(random.next() * 20)] ||
                 text.b_flee4;
      }
   },
   bubbles: {
      dummy: new CosmosSprite({
         frames: [ content.ibuBubbleDummy ],
         scale: 0.5,
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: 20, y: 5 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(2 * 0.9),
               spacing: { y: 0.4, x: -2.5 }
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
            })
         ]
      }),
      napstablook: new CosmosSprite({
         frames: [ content.ibuBubbleDummy ],
         scale: { x: 0.6, y: 0.6 },
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: 18, y: 6.5 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint((1 / 0.6) * 0.9),
               spacing: { y: 0.4, x: -2.5 }
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
            })
         ]
      }),
      napstablook2: new CosmosSprite({
         frames: [ content.ibuBubbleDummy ],
         scale: { x: -0.6, y: -0.6 },
         anchor: { x: 1, y: 1 },
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: -7, y: -8 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint((1 / -0.6) * 0.9),
               spacing: { y: 0.4, x: -2.5 }
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
            })
         ]
      }),
      sans: new CosmosSprite({
         frames: [ content.ibuBubbleTwinkly ],
         scale: { x: -0.25, y: -0.25 },
         anchor: { x: 1 },
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: -35, y: 62.5 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(-3.5 * 0.9)
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
            })
         ]
      }),
      twinkly: new CosmosSprite({
         frames: [ content.ibuBubbleTwinkly ],
         scale: 0.5,
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: 40, y: 4.5 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(2 * 0.9)
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
               switch (speech.state.font2?.split(' ')[1]) {
                  case 'Papyrus':
                     this.spacing.x = -0.25;
                     this.spacing.y = 0;
                     this.position.y = 6;
                     break;
                  case 'ComicSans':
                     this.spacing.x = 0;
                     this.spacing.y = 2.5;
                     this.position.y = 6.5;
                     break;
                  default:
                     this.spacing.x = -2.5;
                     this.spacing.y = 0.4;
                     this.position.y = 4.5;
                     break;
               }
            })
         ]
      }),
      twinkly2: new CosmosSprite({
         frames: [ content.ibuBubbleTwinkly ],
         scale: { x: -0.5, y: 0.5 },
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: 220, y: 4.5 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(2 * 0.9).multiply(-1, 1)
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
               this.spacing.x = -2.5;
               this.spacing.y = 0.4;
            })
         ]
      }),
      mtt: new CosmosSprite({
         anchor: { x: 0 },
         frames: [ content.ibuBubbleMTT ],
         scale: 0.5,
         objects: [
            new CosmosText({
               fill: 'black',
               position: { x: -75, y: 20 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(2 * 0.9)
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
               this.spacing.x = -2.5;
               this.spacing.y = 0.4;
            })
         ]
      }),
      mttphone: new CosmosSprite({
         anchor: { x: 0, y: 1 },
         frames: [ content.ibuBubbleShock ],
         scale: 0.5,
         objects: [
            new CosmosText({
               fill: 'white',
               position: { x: -89, y: -142 },
               stroke: 'transparent',
               priority: 1,
               scale: new CosmosPoint(2 * 0.9)
            }).on('tick', function () {
               this.font = speech.state.font2;
               this.content = game.text;
               this.spacing.x = -2.5;
               this.spacing.y = 0.4;
            })
         ]
      })
   },
   get bullied () {
      return battler.hurt.filter(volatile => !volatile.sparable && volatile.opponent.bullyable);
   },
   buttons: [
      new CosmosAnimation({
         metadata: { button: 'fight' },
         scale: 0.5,
         position: { x: 32 / 2, y: 432 / 2 },
         resources: content.ibuFight
      }),
      new CosmosAnimation({
         scale: 0.5,
         metadata: { button: 'act' },
         position: { x: 185 / 2, y: 432 / 2 },
         resources: content.ibuAct
      }),
      new CosmosAnimation({
         scale: 0.5,
         metadata: { button: 'item' },
         position: { x: 345 / 2, y: 432 / 2 },
         resources: content.ibuItem
      }),
      new CosmosAnimation({
         scale: 0.5,
         metadata: { button: 'mercy' },
         position: { x: 500 / 2, y: 432 / 2 },
         resources: content.ibuMercy
      })
   ],
   calculate (volatile: OutertaleVolatile, power: number, item = save.data.s.weapon) {
      return (
         (Math.round(
            Math.max(calcAT() + items.of(item).value - volatile.opponent.df, 0) *
               (power * (power < 0.98 ? 2 : battler.weapons.of(item).crit))
         ) *
            battler.attackMultiplier) /
         battler.stat.monsterdef.compute()
      );
   },
   cleanup () {
      for (const [ holder, object ] of battler.garbage.splice(0, battler.garbage.length)) {
         if (typeof holder === 'string') {
            renderer.detach(holder, object);
         } else {
            holder.objects.splice(holder.objects.indexOf(object));
         }
      }
   },
   // boxclip filter
   clipFilter: { value: null as Filter | null },
   // deal damage to SOUL
   damage (
      sprite: CosmosSprite,
      damage: number,
      modifier = null as number | null,
      inv = true,
      bullet = new CosmosHitbox(),
      papyrus = false,
      override = false
   ) {
      modifier ??= battler.modifier;
      if (override || save.data.n.hp > 0) {
         // get final damage
         const finalDamage = damage * modifier * battler.damageMultiplier;
         // increment hit counter
         save.data.n.hits++;
         // reduce HP
         save.data.n.hp = Math.max(save.data.n.hp - Math.max(Math.round(finalDamage), 0), 0);
         // play sound effect
         assets.sounds.hurt.instance(timer);
         // screen shake
         shake(2, 300);
         // trigger event
         events.fire('hurt', bullet, finalDamage);
         // trigger death event if applicable, else check if bullet is standard
         if (!papyrus && save.data.n.hp === 0) {
            timer.pause().then(() => {
               events.fire('defeat');
            });
         } else if (inv && !battler.invulnerable) {
            // correct for death bypass
            save.data.n.hp = Math.max(1, save.data.n.hp);
            // enable inv
            battler.invulnerable = true;
            // set inv time
            battler.time = timer.value;
            // begin animation
            (sprite as OutertaleBypassAnimation).actuallyEnable();
            // wait cooldown
            CosmosUtils.chain<void, Promise<void>>(void 0, async (value, next) => {
               await renderer.on('tick');
               timer.value - battler.time < battler.stat.invulnerability.compute() && (await next());
            }).then(() => {
               // disable inv
               battler.invulnerable = false;
               // end animation
               (sprite as OutertaleBypassAnimation).actuallyDisable().actuallyReset();
            });
         }
      }
   },
   /** damage multiplier for next bullets */
   damageMultiplier: 1,
   // deadeye target
   deadeye: new CosmosSprite({ anchor: 0, position: 160, frames: [ content.ibuDeadeye ] }),
   // deadeye target properties
   deadeyeScale: { x: 273 / 194, y: 57 / 47 },
   // put it in battle (even better idea)
   deathText: '',
   // time
   deathTimer,
   // dialoguer for death screen (very good idea)
   deathTyper: new CosmosTyper({
      timer: deathTimer,
      interval: 65,
      sounds: [
         new CosmosDaemon(content.avAsgore, {
            context: deathContext,
            gain: 0.55,
            rate: 1.05,
            router: deathRouter
         })
      ]
   }).on('text', content => {
      battler.deathText = content;
   }),
   // death screen
   async defeat () {
      const deathAssets = new CosmosInventory(
         content.asShatter,
         content.avAsgore,
         content.ibuDefeat,
         content.ibuShatter
      );
      const queue1 = deathAssets.load();
      const queue2 = save.flag.b.option_music ? void 0 : content.amGameover.load();
      await timer.pause(100);
      save.flag.n.deaths++;
      audio.context.suspend();
      timer.stop();
      renderer.container.alpha = 0;
      const deathRenderer = new CosmosRenderer({
         alpha: 1,
         wrapper: '#wrapper',
         layers: { main: [ 'fixed' ] },
         size: { x: 640, y: 480 },
         scale: 2,
         timer: deathTimer
      });
      deathTimer.start();
      const position = battler.SOUL.position.clone();
      const breakSOUL = new CosmosSprite({
         anchor: 0,
         frames: [ content.ibuBreak ],
         position,
         scale: 0.5
      });
      deathRenderer.attach('main', breakSOUL);
      deathToggle.gain.value = (1 - save.flag.n.option_sfx) * (save.flag.b.option_sfx ? 0 : 1);
      new CosmosDaemon(content.asBreak, { context: deathContext, router: deathRouter }).instance(deathTimer);
      await Promise.all([ queue1, deathTimer.pause(1250) ]);
      deathRenderer.detach('main', breakSOUL);
      const shards = CosmosUtils.populate(6, index =>
         new CosmosAnimation({
            active: true,
            anchor: 0,
            resources: content.ibuShatter,
            position: position.add(index * 2 - (index < 3 ? 7 : 3), (index % 3) * 3),
            scale: 0.5
         }).on(
            'tick',
            (() => {
               let gravity = 0;
               const direction = random.next() * 360;
               return async function () {
                  this.position = this.position.endpoint(direction, 3.5).add(0, (gravity += 0.1));
                  if (this.position.y > 250) {
                     deathRenderer.detach('main', this);
                  }
               };
            })()
         )
      );
      deathRenderer.attach('main', ...shards);
      new CosmosDaemon(content.asShatter, { context: deathContext, router: deathRouter }).instance(deathTimer);
      await Promise.all([ queue2, deathTimer.pause(650) ]);
      let gameover = null as null | CosmosInstance;
      if (!save.flag.b.option_music) {
         gameover = new CosmosDaemon(content.amGameover, { context: deathContext, loop: true, gain: 0.5 }).instance(
            deathTimer
         );
         gameover.gain.value *= 1 - save.flag.n.option_music;
         gameover.gain.value /= 4;
         gameover.gain.modulate(deathTimer, 300, (gameover.gain.value *= 4));
      }
      const defeat = new CosmosSprite({
         alpha: 0,
         frames: [ content.ibuDefeat ],
         position: { x: 114 / 2, y: 36 / 2 },
         scale: 0.5
      });
      deathRenderer.attach('main', defeat);
      defeat.alpha.modulate(deathTimer, 1250, 1);
      await deathTimer.pause(650);
      const backEnd = new CosmosText({
         fill: 'white',
         position: { x: 160 / 2, y: 324 / 2 },
         stroke: 'transparent',
         priority: Number.MAX_SAFE_INTEGER,
         font: '16px DeterminationMono',
         spacing: { x: 1, y: 5 }
      }).on('tick', function () {
         this.content = battler.deathText;
      });
      deathRenderer.attach('main', backEnd);
      battler.deathTyper.variables.name = validName() ? save.data.s.name : text.g_mystery2;
      keys.interactKey.on('down', () => battler.deathTyper.read());
      keys.specialKey.on('down', () => battler.deathTyper.skip());
      await battler.btext.death();
      deathRenderer.detach('main', backEnd);
      await Promise.all([
         gameover?.gain.modulate(deathTimer, 1250, 0).then(() => {
            gameover!.stop();
            content.amGameover.unload();
         }),
         defeat.alpha.modulate(deathTimer, 1250, 0).then(() => deathAssets.unload())
      ]);
      await deathTimer.pause(1000);
      await reload(true);
   },
   async encounter (
      player: CosmosPlayer,
      group: OutertaleGroup,
      notify = true,
      persistmusic = false,
      target = null as CosmosPointSimple | null
   ) {
      battler.encounter_state.movement = game.movement;
      game.movement = false;
      const loader = battler.load(group);
      const restoreLevel = game.music?.gain.value ?? 0;
      persistmusic || (game.music && game.music.gain.modulate(timer, 0, 0));
      if (notify) {
         assets.sounds.notify.instance(timer);
         const lv = calcLV();
         const notifier = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibuNotify
         }).on('tick', function () {
            this.position.set(renderer.projection(player.position.subtract(0, 32)));
         });
         notifier.index = lv > 18 ? 2 : lv > 8 ? 1 : 0;
         renderer.attach('menu', notifier);
         await timer.pause(850 + random.next() * 300);
         renderer.detach('menu', notifier);
      }
      await Promise.all([ loader, battler.battlefall(player, target) ]);
      const OGreverb = audio.musicReverb.value;
      const OGfilter = audio.musicFilter.value;
      audio.musicReverb.value = 0;
      audio.musicFilter.value = 0;
      await battler.start(group);
      game.movement = battler.encounter_state.movement;
      audio.musicReverb.value = OGreverb;
      audio.musicFilter.value = OGfilter;
      persistmusic || (game.music && game.music.gain.modulate(timer, 300, restoreLevel));
      battler.unload(group);
   },
   encounter_state: { movement: false },
   // accrued exp in battle
   exp: 0,
   // fight mode
   async fight () {
      battler.deadeye.alpha.modulate(timer, 0, 1);
      battler.deadeye.scale.set(battler.deadeyeScale);
      battler.deadeye.scale.modulate(timer, 0, battler.deadeyeScale);
      renderer.attach('menu', battler.deadeye);
      battler.SOUL.alpha.value = 0;
      battler.refocus();
      const weapon = battler.weapons.of(save.data.s.weapon);
      let hit = false;
      let score = 0;
      let targetbar = 0;
      let timedelay = 0;
      await Promise.all(
         CosmosUtils.populate(weapon.targets, async index => {
            let delay: number;
            const random3 = random.clone();
            switch (weapon.mode) {
               case 'simple':
               case 'volley':
                  delay = 0;
                  break;
               case 'multiple':
                  delay = timedelay;
                  timedelay += CosmosMath.remap(random3.next(), 250, 350);
                  break;
            }
            await timer.pause(delay);
            let miss = true;
            let critted = false;
            let canHit = true;
            const hitbar = new CosmosRectangle({
               fill: '#000',
               stroke: '#fff',
               anchor: 0,
               size: { x: (8 + 1.5) / 2, y: (124 + 1.5) / 2 },
               border: 1.5,
               position: { x: spanBase + (weapon.off ?? 0), y: 160 },
               velocity: { x: (save.data.s.armor === 'visor' ? 4.5 : 6) * weapon.speed }
            });
            renderer.attach('menu', hitbar);
            await Promise.race([
               timer
                  .when(() => index === targetbar)
                  .then(() => keys.interactKey.on('down'))
                  .then(() => {
                     if (canHit) {
                        hit = true;
                        miss = false;
                        const diff = Math.abs(hitbar.position.x - spanBase - spanRange);
                        critted = diff <= spanMin;
                        score += 1 - (critted ? 0 : Math.min(diff, spanRange) / spanRange);
                        hitbar.velocity.x = 0;
                        if (critted) {
                           hitbar.position.x = spanBase + spanRange;
                        }
                     }
                  }),
               timer.when(() => spanRange * 2 <= hitbar.position.x - spanBase)
            ]);
            canHit = false;
            targetbar++;
            if (miss) {
               renderer.detach('menu', hitbar);
            } else {
               timer.pause(350).then(() => {
                  oops();
               });
               events.fire('swing');
               let active = true;
               switch (weapon.mode) {
                  case 'simple':
                  case 'volley':
                     (async () => {
                        let state = false;
                        while (active) {
                           if ((state = !state)) {
                              hitbar.fill = '#fff';
                              hitbar.stroke = '#000';
                           } else {
                              hitbar.fill = '#000';
                              hitbar.stroke = '#fff';
                           }
                           await timer.pause(150);
                        }
                     })();
                     break;
                  case 'multiple':
                     if (critted) {
                        let state = false;
                        hitbar.on('tick', () => {
                           if ((state = !state)) {
                              hitbar.fill = hitbar.stroke = [ '#f0f', '#ff0', '#0ff' ][Math.floor(Math.random() * 3)];
                           }
                        });
                     } else {
                        hitbar.fill = hitbar.stroke = '#fff';
                     }
                     Promise.all([
                        hitbar.alpha.modulate(timer, 500, 0, 0),
                        hitbar.scale.modulate(timer, 500, { x: 2, y: 2 }, { x: 2, y: 2 })
                     ]).then(() => {
                        battler.attackMultiplier = 1;
                        active = false;
                     });
                     break;
               }

               // sprite calculation
               const vola = battler.target!;
               const container = vola.container;
               const next = vola.opponent.goodbye?.(vola) || container.objects[0];
               const half = new CosmosPoint((next.metadata.size as CosmosPointSimple) || next.compute()).divide(2);
               const base = container.position.add(next.position.subtract(half.add(half.multiply(next.anchor))));

               // handle weapon modes
               if (weapon.mode === 'simple') {
                  assets.sounds.swing.instance(timer);
                  renderer.attach(
                     'menu',
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 0 },
                        scale: 0.5,
                        position: base.add(half.x, -2.5),
                        resources: content.ibuSwing
                     }).on('tick', function () {
                        if (this.index === 5 && this.step === this.duration - 1) {
                           renderer.detach('menu', this);
                           battler.attackMultiplier = 1;
                           active = false;
                        }
                     })
                  );
               } else if (weapon.mode === 'volley') {
                  let punches = 0;
                  let expired = false;
                  let resolved = 0;
                  const deadcenter = base.add(half);
                  const listener = () => {
                     if (!expired && punches < 4) {
                        const huge = ++punches === 4;
                        const random3 = random.clone();
                        renderer.attach(
                           'menu',
                           new CosmosAnimation({
                              active: true,
                              anchor: 0,
                              scale: 0.5,
                              position: deadcenter.add(
                                 huge ? 0 : half.multiply(random3.next() * 2, random3.next() * 2).subtract(half)
                              ),
                              resources: huge ? content.ibuFist2 : content.ibuFist1
                           }).on(
                              'tick',
                              (() => {
                                 let selfresolve = false;
                                 return function () {
                                    this.position = this.position.add(random3.next() * 2 - 1, random3.next() * 2 - 1);
                                    if (!selfresolve && this.index === (huge ? 3 : 2)) {
                                       resolved++;
                                       selfresolve = true;
                                    } else if (this.index === 4 && this.step === this.duration - 1) {
                                       renderer.detach('menu', this);
                                    }
                                 };
                              })()
                           )
                        );
                        huge ? assets.sounds.punch2.instance(timer) : assets.sounds.punch1.instance(timer);
                        if (huge) {
                           shake(2, 600);
                        }
                     }
                  };
                  listener();
                  keys.interactKey.on('down', listener);
                  Promise.race([ timer.pause(1000), timer.when(() => punches === 4) ]).then(async () => {
                     expired = true;
                     keys.interactKey.off('down', listener);
                     await timer.when(() => resolved === punches);
                     battler.attackMultiplier = punches / 4;
                     active = false;
                  });
               } else if (weapon.mode === 'multiple') {
                  if (critted) {
                     assets.sounds.crit.instance(timer);
                  } else {
                     assets.sounds.multitarget.instance(timer);
                  }
                  if (index === weapon.targets - 1) {
                     await timer.pause(350);
                     const huge = score / weapon.targets > 0.5;
                     const perfect = 0.98 <= score / weapon.targets;
                     const deadcenter = base.add(half);
                     if (save.data.s.weapon === 'boots') {
                        perfect && assets.sounds.saber3.instance(timer);
                        const random3 = random.clone();
                        renderer.attach(
                           'menu',
                           new CosmosAnimation({
                              active: true,
                              anchor: 0,
                              scale: 0.5,
                              tint: perfect ? perfectTint : void 0,
                              position: deadcenter.add(
                                 huge ? 0 : half.multiply(random3.next() * 2, random3.next() * 2).subtract(half)
                              ),
                              resources: huge ? content.ibuBoot2 : content.ibuBoot1
                           }).on(
                              'tick',
                              (() => {
                                 let selfresolve = false;
                                 return function () {
                                    this.position = this.position.add(random3.next() * 2 - 1, random3.next() * 2 - 1);
                                    if (!selfresolve && this.index === (huge ? 3 : 2)) {
                                       selfresolve = true;
                                    } else if (this.index === 4 && this.step === this.duration - 1) {
                                       renderer.detach('menu', this);
                                    }
                                 };
                              })()
                           )
                        );
                        assets.sounds.punch2.instance(timer).gain.value *= huge ? 1 : 0.5;
                        if (huge) {
                           shake(2, 600);
                        }
                     } else if (save.data.s.weapon === 'padd') {
                        perfect && assets.sounds.saber3.instance(timer);
                        const nottie = new CosmosSprite({
                           anchor: 0,
                           position: deadcenter,
                           tint: perfect ? perfectTint : void 0,
                           frames: [ content.ibuNotebook ]
                        });
                        renderer.attach('menu', nottie);
                        assets.sounds.bookspin.instance(timer);
                        await nottie.scale.modulate(timer, 200, nottie.scale.value(), { x: -1 }, { x: -1 });
                        await nottie.scale.modulate(timer, 200, nottie.scale.value(), { x: 1 }, { x: 1 });
                        renderer.detach('menu', nottie);
                        const sploder = new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           position: deadcenter,
                           tint: perfect ? perfectTint : void 0,
                           resources: content.ibuStar
                        });
                        renderer.attach('menu', sploder);
                        assets.sounds.punch2.instance(timer);
                        Promise.all([
                           sploder.alpha.modulate(timer, 400, 0, 0),
                           sploder.scale.modulate(timer, 400, { x: 2, y: 2 }, { x: 2, y: 2 })
                        ]).then(() => {
                           renderer.detach('menu', sploder);
                        });
                        await timer.pause(200);
                     } else if (save.data.s.weapon === 'tablaphone') {
                        perfect && assets.sounds.saber3.instance(timer);
                        const spindir = random3.next() < 0.5 ? 1 : -1;
                        const sploder = new CosmosAnimation({
                           alpha: 0,
                           active: true,
                           anchor: 0,
                           tint: perfect ? perfectTint : void 0,
                           position: deadcenter,
                           resources: content.ibuFrypan1,
                           spin: spindir * 2,
                           acceleration: 1.1,
                           scale: 1 / 2
                        });
                        renderer.attach('menu', sploder);
                        assets.sounds.frypan.instance(timer);
                        Promise.all([
                           sploder.alpha.modulate(timer, 400, 1, 0),
                           sploder.scale.modulate(timer, 400, 2, 1 / 2)
                        ]).then(() => {
                           renderer.detach('menu', sploder);
                        });
                        await timer.pause(200);
                        const dist = new CosmosValue();
                        const objs = new CosmosObject({
                           objects: CosmosUtils.populate(7, index => {
                              const ayo = (index / 7) * 360 - 90;
                              return new CosmosSprite({
                                 anchor: 0,
                                 scale: 1 / 2,
                                 tint: perfect ? perfectTint : void 0,
                                 frames: [ content.ibuFrypan2 ],
                                 spin: spindir * 10,
                                 acceleration: 0.98
                              }).on('tick', function () {
                                 this.position = deadcenter.endpoint(ayo, dist.value);
                              });
                           })
                        });
                        renderer.attach('menu', objs);
                        dist.modulate(timer, 600, 30, 30);
                        objs.alpha.modulate(timer, 600, 1, 0).then(() => {
                           renderer.detach('menu', objs);
                        });
                     } else if (save.data.s.weapon === 'laser') {
                        perfect && assets.sounds.saber3.instance(timer);
                        const spindir = random3.next() < 0.5 ? 1 : -1;
                        const singstar = new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           tint: perfect ? perfectTint : void 0,
                           position: deadcenter,
                           resources: content.ibuGunshot1,
                           scale: 1
                        });
                        renderer.attach('menu', singstar);
                        await timer.pause(100);
                        assets.sounds.gunshot.instance(timer);
                        await timer.pause(100);
                        renderer.detach('menu', singstar);
                        let objsRot = 0;
                        const dist = new CosmosValue();
                        const objsScale = new CosmosValue(1 / 2);
                        const objs = new CosmosObject({
                           objects: CosmosUtils.populate(7, index => {
                              const ayo = (index / 7) * 360 - 90;
                              return new CosmosAnimation({
                                 active: true,
                                 anchor: 0,
                                 tint: perfect ? perfectTint : void 0,
                                 resources: content.ibuGunshot1,
                                 spin: spindir * 5,
                                 rotation: 360 - (ayo + 90)
                              }).on('tick', function () {
                                 this.position = deadcenter.endpoint(objsRot + ayo, dist.value);
                                 this.scale.set(objsScale.value);
                              });
                           })
                        }).on('tick', function () {
                           objsRot += 20;
                        });
                        renderer.attach('menu', objs);
                        dist.modulate(timer, 600, 45, 45, 45, 0);
                        const circler = () =>
                           new CosmosSprite({
                              frames: [ content.ibuGunshot2 ],
                              anchor: 0,
                              position: deadcenter,
                              tint: perfect ? perfectTint : void 0,
                              metadata: { size: 0 }
                           }).on('tick', function () {
                              this.metadata.size < 1 && (this.metadata.size += 0.1);
                              this.scale.set((dist.value / 20) * this.metadata.size);
                           });
                        objs.objects.unshift(circler());
                        await timer.pause(150);
                        objs.objects.unshift(circler());
                        await timer.pause(150);
                        objsScale.modulate(timer, 300, 1 / 4);
                        objs.alpha.modulate(timer, 300, 1, 0).then(() => {
                           renderer.detach('menu', objs);
                        });
                     }
                  }
               }
               await timer.when(() => !active);
               renderer.detach('menu', hitbar);
            }
         })
      );
      await timer.pause(350);
      Promise.all([
         battler.deadeye.alpha.modulate(timer, 500, 0, 0, 0),
         battler.deadeye.scale.modulate(timer, 500, battler.deadeyeScale, battler.deadeyeScale, {
            x: 0,
            y: battler.deadeyeScale.y
         })
      ]).then(() => {
         renderer.detach('menu', battler.deadeye);
      });
      atlas.switch(null);
      atlas.detach(renderer, 'menu', 'battlerAdvancedText');

      if (hit) {
         events.fire('choice', { type: 'fight', score: score / weapon.targets });
      } else {
         events.fire('choice', { type: 'fake' });
      }
   },
   /** whether the flee option is present */
   flee: true,
   // accrued gold in battle
   g: 0,
   // garbage sprites (to be detached upon battle end)
   garbage: [] as [OutertaleLayerKey | CosmosObject, CosmosObject][],
   /** battler grid backdrop */
   get grid () {
      return battler.gridder.frames[0] ?? null;
   },
   set grid (value) {
      battler.gridder.frames[0] = value;
   },
   gridder: new CosmosSprite({
      position: { x: 15 / 2, y: 9 / 2 },
      scale: 0.5
   }).on('tick', function () {
      this.frames = [ battler.grid ];
   }),
   async human (...lines: string[]) {
      if (save.data.n.hp > 0) {
         const simple = atlas.target === 'battlerSimple';
         atlas.switch('battlerAdvancedText');
         atlas.attach(renderer, 'menu', 'battlerAdvancedText');
         await typer.text(...lines);
         atlas.switch(simple ? 'battlerSimple' : null);
      }
   },
   get hurt () {
      return battler.alive.filter(
         volatile => volatile.hp < Math.min(volatile.opponent.hp, battler.calculate(volatile, 1))
      );
   },
   async idle1 (target: number) {
      for (const index of battler.indexes) {
         if (index < target) {
            const volatile = battler.volatile[index];
            volatile.alive && (await volatile.opponent.handler?.({ type: 'none' }, index, volatile));
         }
      }
   },
   async idle2 (target: number) {
      for (const index of battler.indexes) {
         if (index > target) {
            const volatile = battler.volatile[index];
            volatile.alive && (await volatile.opponent.handler?.({ type: 'none' }, index, volatile));
         }
      }
   },
   // only the active indexes
   get indexes () {
      const list = [] as number[];
      let i = 0;
      while (i < battler.volatile.length) {
         if (battler.volatile[i].alive) {
            list.push(i);
         }
         i++;
      }
      return list;
   },
   get involna () {
      let base = 1500;
      if (save.data.s.armor === 'goggles') {
         base += 900;
      }
      if (save.data.s.weapon === 'padd') {
         base += 600;
      }
      return base;
   },
   // invulnerable
   invulnerable: false,
   // load battler assets
   async load (group: OutertaleGroup) {
      return Promise.all([
         group.assets?.load(),
         ...[ ...new Set(group.opponents.map(opponent => opponent[0])) ].map(opponent => opponent.assets.load())
      ]);
   },
   // purple soul mode lines
   line: {
      active: false,
      get amount () {
         return Math.floor(battler.box.size.y / 20);
      },
      offset: 13.5,
      loop: 0,
      sticky: true,
      swap: 0,
      width: 100,
      pos: { x: 0, y: 0 },
      maxY: null as number | null,
      minY: null as number | null,
      reset () {
         battler.line.active = false;
         battler.line.offset = 13.5;
         battler.line.loop = 0;
         battler.line.sticky = true;
         battler.line.swap = 0;
         battler.line.width = 100;
         battler.line.pos.x = 0;
         battler.line.pos.y = 0;
         battler.line.maxY = null;
         battler.line.minY = null;
      }
   },
   // gain love
   love () {
      const lv = calcLV();
      save.data.n.g += battler.g;
      save.data.n.exp += battler.exp;
      if (calcLV() > lv) {
         assets.sounds.love.instance(timer);
         return true;
      } else {
         return false;
      }
   },
   get modifier () {
      return (
         CosmosMath.remap(calcDF() + items.of(save.data.s.armor).value, 1, 1 / 5, 10, 35) *
         battler.stat.monsteratk.compute()
      );
   },
   // monstertext
   async monster (cutscene: boolean, position: CosmosPointSimple, bubble: CosmosSprite, ...lines: string[]) {
      if (save.data.n.hp > 0) {
         const container = new CosmosObject({ position, objects: [ bubble ] });
         cutscene || atlas.switch('dialoguerBase');
         renderer.attach('menu', container);
         typer.magic = '{#p/monster}{@swirl:0.35,1.4,13.5}';
         await typer.text(...lines);
         cutscene || atlas.switch(null);
         renderer.detach('menu', container);
      }
   },
   // current music
   music: null as null | CosmosInstance,
   opponentHandler<A extends CosmosKeyed> ({
      bubble = [ { x: 0, y: 0 }, new CosmosSprite() ] as CosmosProvider<[CosmosPointSimple, CosmosSprite], [CosmosPoint]>,
      defaultTalk = [] as CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>,
      defaultStatus = [] as CosmosProvider<string[] | string[][], [OutertaleTurnState<A>]>,
      vars = {} as A,
      prechoice = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      prefight = (state: OutertaleTurnState<A>, power: number): Promise<void> | void => {},
      fight = ({ volatile }: OutertaleTurnState<A>, power: number) =>
         battler.attack(volatile, volatile.sparable ? { power: 0, operation: 'multiply' } : { power }),
      postfight = (state: OutertaleTurnState<A>, power: number): Promise<void> | void => {},
      fake = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      preact = (state: OutertaleTurnState<A>, act: string): Promise<void> | void => {},
      act = {} as Partial<CosmosKeyed<(state: OutertaleTurnState<A>) => Promise<void> | void, string>>,
      kill = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      postact = (state: OutertaleTurnState<A>, act: string): Promise<void> | void => {},
      preitem = (state: OutertaleTurnState<A>, item: string): Promise<void> | void => {},
      item = {} as Partial<CosmosKeyed<(state: OutertaleTurnState<A>) => Promise<void> | void, string>>,
      postitem = (state: OutertaleTurnState<A>, item: string): Promise<void> | void => {},
      spare = (state: OutertaleTurnState<A>): Promise<void> | void => void battler.spare(),
      flee = (state: OutertaleTurnState<A>): Promise<boolean> | boolean => {
         events.fire('escape');
         return true;
      },
      assist = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      postchoice = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      pretalk = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      posttalk = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      prestatus = (state: OutertaleTurnState<A>): Promise<void> | void => {},
      poststatus = (state: OutertaleTurnState<A>): Promise<void> | void => {}
   } = {}): OutertaleOpponent['handler'] {
      return async function handler (choice, target, volatile) {
         const opponent = volatile.opponent;
         if (volatile.vars[''] === void 0) {
            volatile.vars[''] = { reward: false, hp: volatile.hp };
            Object.assign(volatile.vars, vars);
         }
         const state: OutertaleTurnState<A> = {
            choice,
            target,
            volatile,
            opponent,
            talk: defaultTalk || [],
            status: defaultStatus || [],
            hurt: false,
            dead: false,
            pacify: false,
            vars: volatile.vars as OutertaleTurnState<A>['vars'],
            async dialogue (cutscene: boolean, ...lines: string[]) {
               await battler.monster(
                  cutscene,
                  ...CosmosUtils.provide(bubble, volatile.container.position.clone()),
                  ...lines
               );
            }
         };
         const sparing = battler.sparing(choice);
         if (choice.type !== 'none') {
            await prechoice(state);
            switch (choice.type) {
               case 'fight':
                  await prefight(state, choice.score);
                  if (await fight(state, choice.score)) {
                     await kill(state);
                     battler.g += (state.opponent.g ?? 0) * 2;
                     state.dead = true;
                  } else {
                     state.hurt = true;
                  }
                  await postfight(state, choice.score);
                  break;
               case 'fake':
                  await fake(state);
                  break;
               case 'act':
                  await preact(state, choice.act);
                  await act[choice.act]?.(state);
                  await postact(state, choice.act);
                  break;
               case 'item':
                  await preitem(state, choice.item);
                  await item[choice.item]?.(state);
                  await postitem(state, choice.item);
                  break;
               case 'spare':
                  await spare(state);
                  break;
               case 'flee':
                  if (await flee(state)) {
                     return;
                  }
                  break;
               case 'assist':
                  await assist(state);
                  break;
            }
            if (state.pacify) {
               volatile.sparable = true;
               if (!state.vars[''].reward && volatile.hp === state.vars[''].hp) {
                  state.vars[''].reward = true;
                  battler.g += opponent.g ?? 0;
               }
            }
            await postchoice(state);
            sparing || (await battler.idle1(target));
         }
         if (volatile.alive && !sparing) {
            await pretalk(state);
            const talk = CosmosUtils.provide(state.talk, state);
            if (talk.length > 0) {
               await state.dialogue(
                  false,
                  ...(typeof talk[0] === 'string'
                     ? (talk as string[])
                     : (talk as string[][])[Math.floor(random.next() * talk.length)])
               );
            }
            await posttalk(state);
         }
         if (choice.type !== 'none') {
            sparing || (await battler.idle2(target));
            if (volatile.alive) {
               await prestatus(state);
               const status = CosmosUtils.provide(state.status, state);
               if (status.length > 0) {
                  battler.status =
                     typeof status[0] === 'string'
                        ? (status as string[])
                        : (status as string[][])[Math.floor(random.next() * status.length)];
               }
               await poststatus(state);
            }
            if (state.pacify) {
               volatile.sparable = true;
               if (!state.vars[''].reward && volatile.hp === state.vars[''].hp) {
                  state.vars[''].reward = true;
                  battler.g += opponent.g ?? 0;
               }
            }
         }
         battler.alive.length === 0 && battler.music?.stop();
      };
   },
   // keys of active opponents
   get opponents () {
      return battler.alive.map(value => value.opponent);
   },
   // "over the battle box" display layer
   overlay: new CosmosObject(),
   rand (limit: number, compute = false) {
      return Math.floor((compute ? random.compute() : random.next()) * limit);
   },
   // fixes active battler button
   refocus () {
      const selection = atlas.target === 'battlerAdvanced' && atlas.navigators.of('battlerAdvanced').selection();
      for (const button of battler.buttons) {
         if (button.metadata.button === selection) {
            button.index = 1;
            battler.SOUL.position = button.position.add(8, 11);
         } else {
            button.index = 0;
         }
      }
   },
   // resets the battle box
   reset () {
      battler.box.x = 160;
      battler.box.y = 160;
      battler.box.size.x = 282.5;
      battler.box.size.y = 65;
   },
   // re-enter main screen
   async resume (script?: () => Promise<void>) {
      if (save.data.n.hp > 0) {
         if (script) {
            game.movement = true;
            await script();
            game.movement = false;
         }
         battler.SOUL.velocity.y = 0;
         atlas.switch('battlerAdvanced');
         atlas.attach(renderer, 'menu', 'battlerAdvancedText');
         for (const stat of [
            battler.stat.speed,
            battler.stat.monsteratk,
            battler.stat.monsterdef,
            battler.stat.invulnerability
         ]) {
            stat.elapse();
         }
         events.fire('resume');
         await renderer.on('tick');
         battler.SOUL.alpha.value = 1;
      }
   },
   async sequence (count: number, generator: (promises: Promise<void>[], index: number) => Promise<void>) {
      let index = 0;
      const promises = [] as Promise<void>[];
      while (index < count) {
         await generator(promises, index++);
      }
      await Promise.all(promises);
   },
   shadow: new CosmosSprite({
      alpha: 0,
      scale: 1.5,
      anchor: 0,
      metadata: {
         cooldown: 0,
         jumptimer: 100,
         tinyColor: CosmosBitmap.color2hex(CosmosImage.utils.color.of('#808080'))
      },
      frames: [ content.ibuCyanReticle ]
   }).on('tick', function () {
      if (this.metadata.cooldown > timer.value) {
         this.tint = this.metadata.tinyColor;
      } else {
         this.tint = void 0;
      }
   }),
   // simple screen
   async simple (script: () => Promise<void>) {
      battler.flee = false;
      battler.assist = false;
      battler.exp = 0;
      battler.g = 0;
      battler.grid = null;
      battler.music = null;
      battler.volatile = [];
      let done = false;
      battler.stat.speed.value = 2;
      battler.stat.monsteratk.value = 1;
      battler.stat.monsterdef.value = 1;
      battler.stat.invulnerability.value = battler.involna;
      for (const stat of [
         battler.stat.speed,
         battler.stat.monsteratk,
         battler.stat.monsterdef,
         battler.stat.invulnerability
      ]) {
         stat.modifiers = [];
      }
      battler.box.size.x = 77.5;
      battler.box.size.y = 65;
      battler.box.x = 160;
      battler.box.y = 160;
      battler.active = true;
      script();
      battler.alpha.value = 1;
      atlas.switch('battlerSimple');
      renderer.alpha.modulate(timer, 300, 1);
      events.fire('battle');
      await Promise.race([
         events.on('exit').then(() => {
            done = true;
         }),
         events.on('defeat').then(async () => {
            if (!done) {
               done = true;
               await battler.defeat();
            }
         })
      ]);
      done = true;
      await renderer.alpha.modulate(timer, 300, 0);
      atlas.switch(null);
      battler.SOUL.alpha.value = 0;
      battler.cleanup();
      battler.active = false;
      await Promise.all(events.fire('battle-exit'));
      renderer.alpha.modulate(timer, 300, 1);
   },
   SOUL: (() => {
      const sprite = new OutertaleBypassAnimation({
         anchor: 0,
         objects: [ new CosmosHitbox({ anchor: 0, size: 8 }) ],
         scale: 0.5,
         resources: content.ibuSOUL
      });
      return new CosmosEntity({
         area: renderer.area,
         face: 'down',
         alpha: 0,
         metadata: {
            color: 'red' as 'red' | 'blue' | 'cyan' | 'green' | 'purple' | 'orange' | 'yellow',
            collision: true,
            cyanMover: false,
            cyanLeap: false,
            shota: false,
            shotb: false
         },
         anchor: 0,
         priority: 1000,
         size: 8,
         step: 0.25,
         gravity: { angle: 90 },
         sprites: { up: sprite, down: sprite, left: sprite, right: sprite }
      }).on('tick', function () {
         const cyanmover = game.movement && this.alpha.value > 0;
         if (cyanmover) {
            if (this.metadata.color === 'cyan' && !this.metadata.cyanMover) {
               this.metadata.cyanMover = true;
               battler.shadow.position.set(this);
               renderer.attach('menu', battler.shadow);
               battler.shadow.scale.modulate(timer, 300, 0.5);
               battler.shadow.alpha.modulate(timer, 300, 1);
            }
         } else if (this.metadata.cyanMover) {
            this.metadata.cyanMover = false;
            Promise.all([
               battler.shadow.scale.modulate(timer, 300, 1.5),
               battler.shadow.alpha.modulate(timer, 300, 0)
            ]).then(() => {
               renderer.detach('menu', battler.shadow);
            });
         }
         // only calculate while visible and alive
         if (battler.active && this.alpha.value > 0 && save.data.n.hp > 0) {
            // set SOUL color
            switch (this.metadata.color) {
               case 'blue':
                  sprite.resources = content.ibuBlueSOUL;
                  break;
               case 'purple':
                  sprite.resources = content.ibuPurpleSOUL;
                  break;
               case 'green':
                  sprite.resources = content.ibuGreenSOUL;
                  break;
               case 'cyan':
                  sprite.resources = content.ibuCyanSOUL;
                  break;
               case 'yellow':
                  sprite.resources = content.ibuYellowSOUL;
                  break;
               case 'orange':
                  sprite.resources = content.ibuOrangeSOUL;
                  break;
               default:
                  sprite.resources = content.ibuSOUL;
            }
            // restrict SOUL to box if movement is enabled
            if (game.movement) {
               const movetarget = this.metadata.color === 'cyan' ? battler.shadow : this;
               // get base position
               const position = movetarget.position.value();
               // get box bounds
               const minX =
                  battler.box.x +
                  battler.box.objects[0].position.x +
                  ((this.metadata.color === 'purple' ? battler.line.width : battler.box.size.x) / -2 + 4);
               const maxX =
                  battler.box.x +
                  battler.box.objects[0].position.x +
                  ((this.metadata.color === 'purple' ? battler.line.width : battler.box.size.x) / 2 - 4);
               const minY = battler.box.y + battler.box.size.y / -2 + 4;
               const maxY = battler.box.y + battler.box.size.y / 2 - 4;
               // clamp stored position to box bounds
               position.x < minX && (position.x = minX);
               position.x > maxX && (position.x = maxX);
               position.y < minY && (position.y = minY);
               position.y > maxY && (position.y = maxY);
               // apply stored position
               movetarget.position.set(position);
               // check for movement capabilities
               if (game.input && !this.metadata.cyanLeap) {
                  // get speed state
                  const rate =
                     (battler.stat.speed.compute() / (keys.specialKey.active() ? 2 : 1)) *
                     (this.metadata.color === 'cyan' ? 2 : this.metadata.color === 'orange' ? 0.75 : 1);
                  // get directional state
                  const up = keys.upKey.active();
                  const left = keys.leftKey.active();
                  const right = keys.rightKey.active();
                  const down = keys.downKey.active();
                  // check for horizontal input
                  const horizontal = (left || right) && !(left && right);
                  if (horizontal && this.metadata.color !== 'green') {
                     movetarget.position.x += rate * (left ? -1 : 1);
                  }
                  // check for vertical input
                  const vertical = (up || down) && !(up && down);
                  // handle SOUL modes
                  switch (this.metadata.color) {
                     case 'blue':
                        if (up && this.position.y === maxY) {
                           this.velocity.y = -3;
                        } else if (!up && this.velocity.y <= -0.5) {
                           this.velocity.y = -0.5;
                        }
                        if (this.velocity.y <= -2) {
                           this.velocity.y += 0.1;
                        } else if (this.velocity.y <= -0.5) {
                           this.velocity.y += 0.25;
                        } else if (this.velocity.y <= 0.25) {
                           this.velocity.y += 0.1;
                        } else if (this.velocity.y < 4) {
                           this.velocity.y += 0.3;
                        }
                        break;
                     case 'purple':
                        if (battler.line.active) {
                           const startY = battler.line.pos.y;
                           battler.line.pos.y += battler.line.loop + battler.line.swap * (20 / 3);
                           this.position.y = battler.box.y - battler.box.size.y / 2 + battler.line.pos.y;
                           if (battler.line.loop > 0 && this.position.y > (battler.line.maxY ?? maxY)) {
                              battler.invulnerable && (battler.time = timer.value);
                              battler.damage(sprite, 6);
                              battler.line.swap = -1;
                           } else if (battler.line.loop < 0 && this.position.y < (battler.line.minY ?? minY)) {
                              battler.invulnerable && (battler.time = timer.value);
                              battler.damage(sprite, 6);
                              battler.line.swap = 1;
                           } else if (battler.line.swap !== 0) {
                              let index = 0;
                              while (index < battler.line.amount) {
                                 const target = battler.line.offset + index++ * 20;
                                 const dist = Math.abs(target - battler.line.pos.y);
                                 if (dist <= 3.5) {
                                    if (Math.abs(target - startY) > dist) {
                                       battler.line.pos.y = target;
                                       battler.line.swap = 0;
                                    }
                                    break;
                                 }
                              }
                           }
                           break;
                        }
                     default:
                        if (vertical && this.metadata.color !== 'green') {
                           movetarget.position.y += rate * (up ? -1 : 1);
                        }
                  }
               }
               // clamp actual position to box bounds
               movetarget.position.x < minX && (movetarget.position.x = minX);
               movetarget.position.x > maxX && (movetarget.position.x = maxX);
               movetarget.position.y < minY && (movetarget.position.y = minY);
               movetarget.position.y > maxY && (movetarget.position.y = maxY);
               // calculate new hitbox
               this.calculate(renderer);
               // get movement state
               const moved =
                  position.x !== this.position.x ||
                  position.y !== this.position.y ||
                  (this.metadata.color === 'blue' && this.position.y < maxY);
               // get damage modifier
               const modifier = battler.modifier;
               // check for colliding bullets
               if (this.metadata.collision && !this.metadata.cyanLeap) {
                  for (const bullet of renderer.detect(
                     this as CosmosHitbox,
                     ...renderer.calculate('menu', hitbox => hitbox.metadata.bullet === true)
                  )) {
                     const {
                        metadata: { color = 'white', damage = 0, detach = null, papyrus = false, type = 0 }
                     } = bullet;
                     // validate metadata
                     if (typeof damage === 'number' && typeof type === 'number') {
                        // heal player on green bullet touch, else hurt
                        if (color === 'green' || color === 'yellow') {
                           // remove bullet if applicable
                           typeof detach === 'string' && renderer.detach(detach as OutertaleLayerKey, bullet);
                           // increase HP
                           heal(damage, color === 'green');
                           // trigger event
                           events.fire('heal', bullet, damage);
                        } else if (color === 'blue' ? moved : color === 'orange' ? !moved : color === 'white') {
                           // check for inv state
                           if (!battler.invulnerable || type > 1) {
                              // remove bullet if applicable
                              typeof detach === 'string' && renderer.detach(detach as OutertaleLayerKey, bullet);
                              // do the damage
                              battler.damage(sprite, damage, modifier, type % 2 === 0, bullet, !!papyrus);
                           }
                        }
                     }
                  }
               }
            } else {
               const navigator = atlas.navigator()!;
               switch (atlas.target) {
                  case 'battlerAdvancedAct': {
                     battler.SOUL.x = 32 + navigator.position.y * 130 + 4;
                     battler.SOUL.y = 139 + navigator.position.x * 16 + 4;
                     break;
                  }
                  case 'battlerAdvancedItem': {
                     battler.SOUL.x = 32 + (navigator.position.y % 2) * 130 + 4;
                     battler.SOUL.y = 139 + 4;
                     break;
                  }
                  case 'battlerAdvancedMercy':
                  case 'battlerAdvancedTarget': {
                     battler.SOUL.x = 32 + navigator.position.x * 130 + 4;
                     battler.SOUL.y = 139 + navigator.position.y * 16 + 4;
                     break;
                  }
               }
            }
         }
      });
   })(),
   // spare enemies
   spare (target = -1, noEffects?: boolean, noVictory?: boolean) {
      if (target === -1) {
         let result = false;
         const gain = assets.sounds.goodbye.gain;
         for (const index of battler.indexes) {
            if (battler.spare(index, noEffects, noVictory)) {
               result = true;
               assets.sounds.goodbye.gain = 0;
            }
         }
         assets.sounds.goodbye.gain = gain;
         return result;
      } else {
         const volatile = battler.volatile[target];
         if (volatile.sparable || battler.bullied.includes(volatile)) {
            // bully if true
            volatile.sparable || volatile.opponent.bully();

            // de-activate opponent
            volatile.alive = false;

            // spare animation
            if (!noEffects) {
               assets.sounds.goodbye.instance(timer);
               volatile.container.objects[0] = (volatile.opponent.goodbye || volatile.opponent.sprite)(volatile);
               volatile.container.alpha.value = 0.5;
            }

            // end battle?
            if (battler.alive.length === 0) {
               noVictory || events.fire('victory');
            }
            return true;
         } else {
            return false;
         }
      }
   },
   // will spare
   sparing (choice: OutertaleChoice) {
      return (
         choice.type === 'spare' &&
         battler.alive.filter(volatile => volatile.sparable).length + battler.bullied.length > 0
      );
   },
   // start battle mode
   async start (group: OutertaleGroup) {
      async function handler (choice: OutertaleChoice) {
         let target = 0;
         for (const [ index, { alive } ] of battler.volatile.entries()) {
            if (alive) {
               target = index;
               break;
            }
         }
         if (![ 'spare', 'item', 'flee', 'assist' ].includes(choice.type)) {
            const selection = atlas.navigators.of('battlerAdvancedTarget').selection() as number;
            if (typeof selection === 'number') {
               target = selection;
            }
         }
         const volatile = battler.volatile[target];
         await volatile.opponent.handler?.(choice, target, volatile);
         group.handler?.(choice, target, volatile);
      }
      battler.flee = true;
      battler.assist = false;
      battler.exp = 0;
      battler.g = 0;
      battler.grid = null;
      battler.music = null;
      battler.volatile = [];
      let done = false;
      for (const [ opponent, position ] of group.opponents) {
         battler.add(opponent, position);
      }
      battler.reset();
      atlas.navigators.of('battlerAdvanced').position = { x: 0, y: 0 };
      battler.active = true;
      events.on('choice', handler);
      battler.flee = group.flee;
      battler.grid = group.grid;
      battler.music = group.music?.instance(timer) ?? null;
      battler.status = group.status;
      if (group.init()) {
         battler.alpha.value = 1;
         atlas.switch('battlerAdvanced');
         atlas.attach(renderer, 'menu', 'battlerAdvanced', 'battlerAdvancedText');
         events.fire('resume');
      } else {
         battler.buttons[0].index = 0;
         atlas.attach(renderer, 'menu', 'battlerAdvanced');
      }
      renderer.layers.base.active = false;
      renderer.layers.below.active = false;
      renderer.layers.main.active = false;
      renderer.layers.above.active = false;
      events.fire('battle');
      await Promise.race([
         events.on('exit').then(() => {
            done = true;
         }),
         events.on('escape').then(async () => {
            if (!done) {
               done = true;
               atlas.attach(renderer, 'menu', 'battlerAdvancedText');
               battler.btext.escape();
               battler.love();
               battler.SOUL.alpha.value = 0;
               const GTFO = new CosmosAnimation({
                  active: true,
                  anchor: { x: 1 },
                  scale: 0.5,
                  velocity: { x: -2.1 },
                  position: battler.SOUL.position.add(4, -4).value(),
                  resources: content.ibuRun
               });
               assets.sounds.run.instance(timer);
               renderer.attach('menu', GTFO);
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  await renderer.on('tick');
                  if (GTFO.position.x <= 0) {
                     renderer.detach('menu', GTFO);
                  } else {
                     await next();
                  }
               });
            }
         }),
         events.on('victory').then(async () => {
            if (!done) {
               done = true;
               atlas.switch('battlerAdvancedText');
               atlas.attach(renderer, 'menu', 'battlerAdvancedText');
               typer.variables.x = battler.exp.toString();
               typer.variables.y = battler.g.toString();
               await battler.btext.victory();
            }
         }),
         events.on('defeat').then(async () => {
            if (!done) {
               done = true;
               await battler.defeat();
            }
         })
      ]);
      atlas.switch(null);
      battler.SOUL.alpha.value = 0;
      (battler.SOUL.sprite as CosmosAnimation).resources = content.ibuSOUL;
      battler.SOUL.metadata.color = 'red';
      events.off('choice', handler);
      await renderer.alpha.modulate(timer, 300, 0);
      battler.overlay.objects.splice(0, battler.overlay.objects.length);
      atlas.detach(renderer, 'menu', 'battlerAdvanced', 'battlerAdvancedText');
      renderer.layers.base.active = true;
      renderer.layers.below.active = true;
      renderer.layers.main.active = true;
      renderer.layers.above.active = true;
      battler.cleanup();
      battler.active = false;
      await Promise.all(events.fire('battle-exit'));
      renderer.alpha.modulate(timer, 300, 1);
   },
   // battle stats
   stat: {
      // invulnerability ms duration
      invulnerability: new OutertaleStat(1500),
      // speed in pixels/frame
      speed: new OutertaleStat(2),
      // monster defense multiplier
      monsterdef: new OutertaleStat(1),
      // monster attack multiplier
      monsteratk: new OutertaleStat(1)
   },
   // current status text
   status: [] as string[],
   get target () {
      return battler.volatile[atlas.navigators.of('battlerAdvancedTarget').selection()] as OutertaleVolatile | void;
   },
   // invulnerability start time
   time: 0,
   async unload (group: OutertaleGroup) {
      return Promise.all([
         group.assets?.unload(),
         ...[ ...new Set(group.opponents.map(opponent => opponent[0])) ].map(opponent => opponent.assets.unload())
      ]);
   },
   // "in the box" bullet layer
   get bullets () {
      return battler.box.objects[1];
   },
   // vapor effect
   async vaporize (
      sprite: CosmosSprite,
      {
         rate = 2,
         sound = true,
         spread = 1,
         filter = (color: CosmosColor) => color[0] === 255 && color[1] === 255 && color[2] === 255,
         handler = null as ((increment: number) => void) | null
      } = {}
   ) {
      const data = sprite.read();
      if (data && data.length > 0) {
         sound && assets.sounds.goodbye.instance(timer);
         let y = 0;
         const random3 = random.clone();
         const increment = rate / sprite.scale.y;
         const half = new CosmosPoint(data.length, data[0].length).divide(2);
         const origin = sprite.position.clone();
         const base = new CosmosPoint().subtract(half.add(half.multiply(sprite.anchor)));
         while (y < data[0].length) {
            let x = 0;
            while (x < data.length) {
               const xb = x;
               x += 1 / sprite.scale.x;
               const color = data[xb][y];
               if (color[3] > 0 && filter(color)) {
                  let size = 1;
                  while (size < spread && x < data.length) {
                     const after = data[Math.floor(x)][y];
                     if (
                        after[0] === color[0] &&
                        after[1] === color[1] &&
                        after[2] === color[2] &&
                        after[3] === color[3]
                     ) {
                        x += 1 / sprite.scale.x;
                        size++;
                     } else {
                        break;
                     }
                  }
                  if (size > 0) {
                     let pos = new CosmosPoint(base.x + xb, base.y + y);
                     let stage = 0;
                     const graphics = new Graphics();
                     graphics.scale.set(1 / sprite.scale.x, 1 / sprite.scale.y);
                     sprite.container.addChildAt(graphics, 0);
                     let speed = random3.next() * 3 + 0.5;
                     const direction = -90 + (random3.next() - 0.5) * 2 * 25;
                     const particle =
                        size > 1
                           ? 0
                           : CosmosMath.weigh(
                                [
                                   [ 0, 8 ],
                                   [ 1, 1 ],
                                   [ 2, 1 ]
                                ],
                                random3.next()
                             )!;
                     const lifetime = [ 12, 15, 18 ][particle];
                     const baseline = [ 1, 0.85, 0.7 ][particle];
                     const ticker = () => {
                        if (stage++ === lifetime) {
                           renderer.off('tick', ticker);
                           sprite.container.removeChild(graphics);
                        } else {
                           pos = pos.endpoint(direction, speed);
                           const finalpos = pos.subtract(sprite.position).add(origin);
                           graphics.position.set(finalpos.x, finalpos.y);
                           const al = 1 - stage / lifetime;
                           graphics.clear().beginFill(CosmosBitmap.color2hex(color), al * baseline);
                           if (al <= 0.6 && al > 0.3) {
                              speed /= 2;
                           }
                           switch (particle) {
                              case 0:
                                 graphics.drawRect(0, 0, size, 1);
                                 break;
                              case 1:
                                 if (al > 0.6) {
                                    graphics.drawRect(0, 0, 1, 1);
                                 } else if (al > 0.3) {
                                    graphics
                                       .drawRect(0, -1, 1, 1)
                                       .drawRect(-1, 0, 1, 1)
                                       .drawRect(1, 0, 1, 1)
                                       .drawRect(0, 1, 1, 1);
                                 } else if (al > 0.15) {
                                    graphics
                                       .drawRect(0, -2, 1, 2)
                                       .drawRect(-2, 0, 2, 1)
                                       .drawRect(1, 0, 2, 1)
                                       .drawRect(0, 1, 1, 2);
                                 } else {
                                    graphics
                                       .drawRect(0, -2, 1, 1)
                                       .drawRect(-2, 0, 1, 1)
                                       .drawRect(2, 0, 1, 1)
                                       .drawRect(0, 2, 1, 1);
                                 }
                                 break;
                              case 2:
                                 if (al > 0.6) {
                                    graphics.drawRect(0, 0, 1, 1);
                                 } else if (al > 0.3) {
                                    graphics
                                       .drawRect(-1, -1, 1, 1)
                                       .drawRect(1, -1, 1, 1)
                                       .drawRect(-1, 1, 1, 1)
                                       .drawRect(1, 1, 1, 1);
                                 } else if (al > 0.15) {
                                    graphics
                                       .drawRect(-1, -1, 1, 1)
                                       .drawRect(1, -1, 1, 1)
                                       .drawRect(-1, 1, 1, 1)
                                       .drawRect(1, 1, 1, 1)
                                       .drawRect(-2, -2, 1, 1)
                                       .drawRect(2, -2, 1, 1)
                                       .drawRect(-2, 2, 1, 1)
                                       .drawRect(2, 2, 1, 1);
                                 } else {
                                    graphics
                                       .drawRect(-2, -2, 1, 1)
                                       .drawRect(2, -2, 1, 1)
                                       .drawRect(-2, 2, 1, 1)
                                       .drawRect(2, 2, 1, 1);
                                 }
                                 break;
                           }
                           graphics.endFill();
                        }
                     };
                     renderer.on('tick', ticker);
                  }
               }
            }
            await renderer.on('render');
            y += increment;
            sprite.position.y += ((sprite.anchor.y - 1) / -2) * rate;
            if (sprite instanceof CosmosAnimation) {
               sprite.subcrop.top += increment;
            } else {
               sprite.crop.top += increment;
            }
            handler?.(increment);
         }
      }
   },
   // currently active opponents in the battle
   volatile: [] as OutertaleVolatile[],
   // weapon types
   weapons: new CosmosRegistry<string, OutertaleWeapon>({ arc: false, targets: 1, mode: 'simple', speed: 1, crit: 2 })
};

/** choicer (seperate from battle choice system) */
export const choicer = {
   /** rows available in choicer */
   type: 0,
   /** spacing from the left edge to the left choicer options */
   marginA: 0,
   /** spacing from the center to the right choicer options */
   marginB: 0,
   /** position (row of text where the choicer appears) */
   navigator: null as string | null,
   /** result (what the player selects) */
   result: 0,
   /** create choicer */
   create (
      header: string,
      margin1: number,
      margin2: number,
      ...options: [string, string] | [string, string, string, string] | [string, string, string, string, string, string]
   ) {
      const marginA = Math.ceil(
         margin1 < 0
            ? (16 - options.map(option => option.length).reduce((a, b) => a + b, 0) / options.length) / 2
            : margin1
      );
      const marginB = Math.ceil(
         margin2 < 0
            ? (16 - options.map(option => option.length).reduce((a, b) => a + b, 0) / options.length) / 2
            : margin2
      );
      const segments = [] as string[];
      for (const [ index, option ] of options.entries()) {
         const margin = [ marginA, marginB ][index % 2];
         segments.push(
            `${CosmosUtils.populate(margin, () => 'µ').join('')}${option}${CosmosUtils.populate(
               16 - margin - option.length,
               () => 'µ'
            ).join('')}`
         );
      }
      if (options.length === 2) {
         return `<99>{#p/human}${header}\n{!}${header.includes('\n') ? '' : '\n'}${segments[0]}${
            segments[1]
         }{#c/0/${marginA}/${marginB}}`;
      } else if (options.length === 4) {
         return `<99>{#p/human}${header}\n{!}${segments[0]}${segments[1]}\n${segments[2]}${segments[3]}{#c/1/${marginA}/${marginB}}`;
      } else {
         return `<99>{#p/human}{!}${segments[0]}${segments[1]}\n${segments[2]}${segments[3]}\n${segments[4]}${segments[5]}{#c/2/${marginA}/${marginB}}`;
      }
   }
};

export const controller = new CosmosObject({
   alpha: 0.25,
   fill: '#000',
   stroke: '#fff',
   border: 1.5,
   font: '24px CryptOfTomorrow',
   objects: [
      new CosmosSprite({
         alpha: 0.5,
         anchor: 0,
         scale: 0.5,
         metadata: { key: 'c', target: 'menuKey' },
         frames: [ content.ieButtonC ]
      }).on('tick', function () {
         this.position = new CosmosPoint(save.flag.b.option_right ? { x: 107.5, y: 198.5 } : { x: 292.5, y: 161.5 });
      }),
      new CosmosSprite({
         alpha: 0.5,
         anchor: 0,
         scale: 0.5,
         metadata: { key: 'x', target: 'specialKey' },
         frames: [ content.ieButtonX ]
      }).on('tick', function () {
         this.position = new CosmosPoint(save.flag.b.option_right ? { x: 67.5, y: 180 } : { x: 252.5, y: 180 });
      }),
      new CosmosSprite({
         alpha: 0.5,
         anchor: 0,
         scale: 0.5,
         metadata: { key: 'z', target: 'interactKey' },
         frames: [ content.ieButtonZ ]
      }).on('tick', function () {
         this.position = new CosmosPoint(save.flag.b.option_right ? { x: 27.5, y: 161.5 } : { x: 212.5, y: 198.5 });
      }),
      new CosmosSprite({
         alpha: 0.5,
         anchor: 0,
         scale: 0.5,
         metadata: { key: 'm', positions: {} },
         frames: [ content.ieButtonM ],
         objects: [
            new CosmosRectangle({
               anchor: 0,
               size: { x: 48, y: 48 },
               fill: '#fff',
               stroke: 'transparent'
            })
         ]
      }).on(
         'tick',
         (() => {
            const inputs = {
               upKey: { angle: 90, active: false },
               leftKey: { angle: 0, active: false },
               downKey: { angle: 270, active: false },
               rightKey: { angle: 180, active: false }
            };
            const offset = 115 / 2;
            return function () {
               this.position = new CosmosPoint(save.flag.b.option_right ? { x: 275, y: 180 } : { x: 45, y: 180 });
               const position =
                  Object.values(this.metadata.positions as CosmosKeyed<CosmosPointSimple>).slice(-1)[0] ||
                  this.position.value();
               const direction = (this.position.angleFrom(position) + 360) % 360;
               const distance = this.position.extentOf(position);
               for (const input in inputs) {
                  const info = inputs[input as keyof typeof inputs];
                  const active =
                     distance > 8 &&
                     (input === 'leftKey'
                        ? direction > 360 - offset || direction < info.angle + offset
                        : direction > info.angle - offset && direction < info.angle + offset);
                  if (info.active && !active) {
                     info.active = false;
                     const key = keys[input as keyof typeof inputs];
                     key.force = false;
                  } else if (!info.active && active) {
                     info.active = true;
                     const key = keys[input as keyof typeof inputs];
                     key.force = true;
                  }
               }
               this.objects[0].position.set(
                  position
                     ? {
                          x: Math.min(Math.max((position.x - this.position.x) * 2, -44), 44),
                          y: Math.min(Math.max((position.y - this.position.y) * 2, -44), 44)
                       }
                     : { x: 0, y: 0 }
               );
            };
         })()
      )
   ],
   priority: Number.MAX_SAFE_INTEGER
}).on('tick', function () {
   this.alpha.value = isMobile.any ? 1 : 0;
});

export const controls = (controller.objects as CosmosSprite[]).map(object => {
   const size = object.metadata.key === 'm' ? new CosmosPoint(72) : new CosmosPoint(37);
   const half = size.divide(2);
   const diff = half.add(half.multiply(object.anchor));
   return {
      active: false,
      get base () {
         return object.position.subtract(diff);
      },
      object,
      get positions () {
         return (object.metadata.positions as CosmosKeyed<CosmosPointSimple>) || void 0;
      },
      size,
      target: object.metadata.target as keyof typeof keys | void,
      touches: [] as number[]
   };
});

export const dialoguer = {
   display: false,
   objects () {
      let face = null as CosmosSprite | null;
      return [
         new CosmosObject({ blend: BLEND_MODES.ADD, position: { x: 34.5, y: 35 } }).on('tick', function () {
            if (dialoguer.display) {
               this.alpha.value = 1;
               this.objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
               if (face !== speech.state.face) {
                  face = speech.state.face;
                  typer.mode === 'idle' || (game.text = '');
               }
            } else {
               this.alpha.value = 0;
               this.objects = [];
            }
         }),
         menuText(0, 22 - 4, () => game.text).on('tick', function () {
            if (dialoguer.display) {
               this.alpha.value = 1;
               this.position.x = speech.state.face ? 69 : 11;
               switch (speech.state.font1.split(' ')[1]) {
                  case 'Papyrus':
                     this.spacing.x = -0.375;
                     this.spacing.y = 2;
                     this.position.y = 6;
                     break;
                  default:
                     this.spacing.x = 0;
                     this.spacing.y = 5;
                     this.position.y = 9;
                     break;
               }
            } else {
               this.alpha.value = 0;
            }
         })
      ];
   }
};

export const dialogueSession = { active: false, movement: false, state: false };

export const expLevels = [
   10, 30, 70, 120, 200, 300, 500, 800, 1200, 1700, 2500, 3500, 5000, 7000, 10000, 15000, 25000, 50000, 99999
];

// front end state
export const frontEnder = {
   // sfx test function (settings menu)
   testSFX (music: boolean) {
      frontEnder.updateOptions();
      (music ? assets.sounds.menuMusic : assets.sounds.menu).instance(timer);
   },
   // will do true reset
   trueReset: false,
   // current story panel index
   index: 1,
   // story panel music
   introMusic: null as CosmosInstance | null,
   // impact noise
   impactNoise: null as null | CosmosInstance,
   // menu music
   menuMusic: null as null | CosmosInstance,
   /** correct menu music to play */
   get menuMusicResource () {
      if (save.data.n.exp > 0 || save.data.n.plot < 14) {
         return { asset: content.amMenu0, daemon: assets.music.menu0 };
      } else if (save.data.n.plot < 31) {
         return { asset: content.amMenu1, daemon: assets.music.menu1 };
      } else if (save.data.n.plot < 48) {
         return { asset: content.amMenu2, daemon: assets.music.menu2 };
      } else if (save.data.n.plot < 68) {
         return { asset: content.amMenu3, daemon: assets.music.menu3 };
      } else {
         return { asset: content.amMenu4, daemon: assets.music.menu4 };
      }
   },
   name: {
      // blacklisted names
      blacklist: [ 'alphys', 'asgore', 'asriel', 'hapsta', 'sans', 'toriel', 'twinkl', 'twinky', 'twnkly', 'undyne' ],
      // amount of shake to display on name
      shake: new CosmosValue(),
      // currently entered name
      value: ''
   },
   createBackground () {
      return new CosmosSprite({ alpha: 0.25, frames: [ content.ieSplashBackground ] });
   },
   updateOptions () {
      audio.soundToggle.gain.value = (1 - save.flag.n.option_sfx) * (save.flag.b.option_sfx ? 0 : 1);
      audio.musicToggle.gain.value = (1 - save.flag.n.option_music) * (save.flag.b.option_music ? 0 : 1);
   }
};

export const hashes = new CosmosCache((name: string) => {
   let pos = 0;
   let hash1 = 0xdeadbeef ^ 432;
   let hash2 = 0x41c6ce57 ^ 432;
   while (pos < name.length) {
      const code = name.charCodeAt(pos++);
      hash1 = Math.imul(hash1 ^ code, 2654435761);
      hash2 = Math.imul(hash2 ^ code, 1597334677);
   }
   hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
   hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);
   return 4294967296 * (2097151 & hash2) + (hash1 >>> 0);
});

export const mobile = {
   /** mobile mode assets */
   assets: new CosmosInventory(content.ieButtonC, content.ieButtonM, content.ieButtonX, content.ieButtonZ),
   /** renderer canvas bounds (for mobile touch position calculation) */
   bounds: { x: 0, y: 0 }
};

export const mobileLoader = isMobile.any && mobile.assets.load().then(() => renderer.attach('menu', controller));

export const pager = {
   /** pager storage */
   storage: [] as CosmosValue[],
   /** create pager */
   create<A extends any[]> (type: 'sequence' | 'random' | 'limit', ...pages: CosmosProvider<string[], A>[]) {
      if (type === 'random') {
         return (...args: A) => CosmosUtils.provide(pages[Math.floor(random.next() * pages.length)], ...args);
      } else {
         const index = new CosmosValue();
         return (...args: A) => {
            pager.storage.includes(index) || pager.storage.push(index);
            return CosmosUtils.provide(
               type === 'limit'
                  ? pages[Math.min(index.value++, pages.length - 1)]
                  : pages[index.value++ % pages.length],
               ...args
            );
         };
      }
   }
};

export const phone = new CosmosRegistry<
   string,
   {
      display: () => boolean;
      trigger: () => Promise<void> | void;
      priority?: CosmosProvider<number>;
      name: CosmosProvider<string>;
   }
>({ display: () => false, trigger: () => {}, name: '' });

export const player = new CosmosPlayer({ anchor: { x: 0, y: 1 }, extent: { x: 5, y: 20 }, size: { x: 20, y: 3 } });

export const portraits = new CosmosRegistry<string, CosmosSprite>(new CosmosSprite());

export const quitText = new CosmosText({
   alpha: 0,
   position: { x: 5, y: 5 },
   fill: 'white',
   font: '10px DiaryOfAn8BitMage',
   metadata: { state: 1 },
   priority: Infinity,
   stroke: 'transparent'
}).on('tick', function () {
   this.content = text[`x_quitText${quitText.metadata.state as 1 | 2 | 3}`];
});

// save menu state
export const saver = {
   async display () {
      game.movement = false;
      heal();
      const lines = [] as string[];
      if (world.population === 0) {
         lines.push(world.bullied ? text.m_save7 : text.m_save5);
      } else if (world.genocide || ((world.trueKills > 9 || save.data.n.bully > 9) && world.population < 6)) {
         lines.push(world.bullied ? text.m_save6 : text.m_save4);
         typer.variables.x = world.population.toString();
      } else {
         lines.push(...CosmosUtils.provide(saver.locations.of(game.room).text));
      }
      if (lines.length > 0) {
         atlas.switch('dialoguerBottom');
         await typer.text(...lines);
      }
      game.interact && atlas.switch('save');
   },
   load () {
      const item = save.manager.getItem(save.namespace);
      if (item) {
         try {
            save.state = CosmosUtils.parse(item);
         } catch {}
      }
   },
   locations: new CosmosRegistry<string, { name: string; text: CosmosProvider<string[]> }>({ name: '', text: [] }),
   protected: [ '', ':b:option_right', ':b:option_music', ':b:option_sfx', ':n:option_music', ':n:option_sfx' ],
   reset (trueReset?: boolean, oversave = true, clearTimelines = false) {
      save.state = {};
      oversave && saver.save();
      if (trueReset) {
         for (const key of CosmosUtils.populate(save.manager.length, index => save.manager.key(index))) {
            if (key?.startsWith(save.namespace) && !saver.protected.includes(key.slice(save.namespace.length))) {
               save.manager.removeItem(key);
            } else if (clearTimelines && key?.startsWith('TIMELINES')) {
               save.manager.removeItem(key);
            }
         }
      }
   },
   save () {
      save.manager.setItem(save.namespace, CosmosUtils.serialize(save.state));
   },
   savedTime: -Infinity,
   transfer (target: Storage) {
      if (save.manager !== target) {
         for (const key of CosmosUtils.populate(save.manager.length, index => save.manager.key(index)) as string[]) {
            target.setItem(key, save.manager.getItem(key)!);
         }
         save.manager = target;
      }
   },
   yellow: false
};

// shop state
export const shopper = {
   get index () {
      return atlas.navigators.of('shop').position.y;
   },
   get listIndex () {
      return atlas.navigators.of('shopList').position.y;
   },
   async open (shop: OutertaleShop, face: CosmosDirection, x: number, y: number, keeper = world.population > 0) {
      const movementValue = game.movement;
      game.movement = false;
      shopper.value = shop;
      await Promise.all([ game.music?.gain.modulate(timer, 300, 0), renderer.alpha.modulate(timer, 300, 0) ]);
      const display = new CosmosObject({ priority: -1000, objects: [ shopper.value.background ] });
      (keeper || shopper.value.persist) && display.attach(shopper.value.keeper);
      renderer.attach('menu', display);
      atlas.switch('shop');
      const music = shopper.value.music?.instance(timer, { store: true });
      if (music) {
         music.rate.value *= shopper.value.persist ? 1 : world.rate(music.daemon);
         music.gain.value /= 4;
         music.gain.modulate(timer, 300, music.gain.value * 4);
      }
      renderer.alpha.modulate(timer, 300, 1);
      await timer.when(() => !atlas.target);
      player.face = face;
      player.position.set(x, y);
      renderer.detach('menu', display);
      shopper.value = null;
      game.movement = movementValue;
      game.music?.gain.modulate(timer, 300, world.level);
   },
   async text (...lines: string[]) {
      const prev = atlas.target;
      atlas.switch('shopText');
      await typer.text(...lines);
      atlas.switch(prev);
   },
   value: null as OutertaleShop | null
};

export const sidebarrer = {
   // current dim box
   dimbox: 'dimboxA' as 'dimboxA' | 'dimboxB',
   get item () {
      return save.storage.inventory.of(atlas.navigators.of('sidebarItem').position.y)!;
   },
   get use () {
      return [ 'consumable', 'special' ].includes(items.of(sidebarrer.item).type);
   },
   async openSettings () {
      game.movement = false;
      const OG = assets.sounds.select.gain;
      assets.sounds.select.gain = 0;
      const background = new CosmosRectangle({ fill: 'black', size: { x: 320, y: 240 } });
      renderer.attach('menu', background);
      atlas.switch('frontEndSettings');
      await atlas.navigators.of('frontEndSettings').on('to');
      renderer.detach('menu', background);
      assets.sounds.select.gain = OG;
      game.movement = true;
   }
};

// attack span
export const spanMin = 3;
export const spanBase = 22;
export const spanRange = 138;

export const teleporter = { hot: false, movement: false, timer: false };

export const world = {
   /** ambient pitch level for game music */
   get ambiance () {
      return world.rate(game.room);
   },
   bully () {
      if (world.population > 0) {
         save.data.n.bully++;
         switch (game.room[0]) {
            case 'w':
               save.data.n.bully_wastelands++;
               break;
            case 's':
               save.data.n.bully_starton++;
               break;
            case 'f':
               save.data.n.bully_foundry++;
               break;
            case 'a':
               save.data.n.bully_aerialis++;
               break;
         }
         if (world.population === 0) {
            game.music && (game.music.rate.value = rooms.of(game.room).score.rate * world.ambiance);
         }
      }
   },
   get bullied () {
      switch (game.room[0]) {
         case 'w':
            return (
               save.data.n.bully_wastelands >
               (save.data.n.plot < 16 ? save.data.n.kills : save.data.n.kills_wastelands) / 3
            );
         case 's':
            return save.data.n.bully_starton > save.data.n.kills_starton / 3;
         case 'f':
            return save.data.n.bully_foundry > save.data.n.kills_foundry / 3;
         case 'a':
            return save.data.n.bully_aerialis > save.data.n.kills_aerialis / 3;
         default:
            return false;
      }
   },
   /** any active cutscene spanning multiple rooms */
   cutscene () {
      return (
         world.cutscene_override ||
         [ 16, 16.1, 17, 38, 47.2, ...(save.data.n.bad_lizard < 2 ? [ 64 ] : [ 64.1 ]) ].includes(save.data.n.plot)
      );
   },
   /** force cutscene mode */
   cutscene_override: false,
   /** true if all dogs except lesser dog is dead */
   get dead_dog () {
      return (
         save.data.n.state_starton_doggo === 2 &&
         save.data.n.state_starton_dogs === 2 &&
         save.data.n.state_starton_greatdog === 2
      );
   },
   /** true if papyrus or sans is dead */
   get dead_skeleton () {
      return save.data.n.state_starton_papyrus === 1 || world.genocide;
   },
   /** true if monster kid should be spawned */
   get monty () {
      return (
         (save.data.n.plot > 37.2 && save.data.n.plot < 42) ||
         (world.genocide && save.data.n.plot > 42.1 && save.data.n.plot < 48)
      );
   },
   /** whether monsters have been flirted with */
   get flirt () {
      return [
         save.data.n.state_wastelands_dummy === 6, // dummy
         save.data.n.state_wastelands_napstablook === 1, // napstablook
         save.data.b.cell_flirt, // toriel
         save.data.b.flirt_froggit,
         save.data.b.flirt_whimsun,
         save.data.b.flirt_moldsmal,
         save.data.b.flirt_loox,
         save.data.b.flirt_migosp,
         save.data.b.flirt_mushy,

         save.data.b.flirt_doggo,
         save.data.b.flirt_lesserdog,
         save.data.b.flirt_dogamy,
         save.data.b.flirt_dogaressa,
         save.data.b.flirt_greatdog,
         save.data.b.flirt_papyrus,
         save.data.b.flirt_stardrake,
         save.data.b.flirt_spacetop,
         save.data.b.flirt_jerry,

         save.data.b.flirt_mouse,
         save.data.b.flirt_moldbygg,
         save.data.b.flirt_woshua,
         save.data.b.flirt_radtile,
         save.data.b.flirt_shyren,
         save.data.b.flirt_doge,
         save.data.b.flirt_muffet,
         save.data.b.flirt_maddummy,
         save.data.b.flirt_undyne,

         save.data.b.flirt_mettaton,
         save.data.b.flirt_perigee,
         save.data.b.flirt_pyrope,
         save.data.b.flirt_tsundere,
         save.data.b.flirt_rg03,
         save.data.b.flirt_rg04,
         save.data.b.flirt_glyde,

         save.data.b.flirt_madjick,
         save.data.b.flirt_knightknight,
         save.data.b.flirt_froggitex,
         save.data.b.flirt_astigmatism,
         save.data.b.flirt_mushketeer,
         save.data.b.flirt_whimsalot
      ].filter(item => item).length;
   },
   /** current room defualt music gain */
   gain (room: string) {
      if (world.phish) {
         return 0.45;
      } else {
         const score = rooms.of(room).score;
         return Math.min(Math.max((audio.music.get(score.music!)?.gain ?? 0) * (score.gain ?? 0) * (1 / 0.6), 0), 1);
      }
   },
   /** genocide route calculator */
   get genocide () {
      if (save.data.b.genocide) {
         if (save.data.n.plot < 14) {
            return true;
         } else {
            return save.data.n.state_wastelands_toriel === 2;
         }
      }
      return false;
   },
   /** true if goatbro should be spawned */
   get azzie () {
      return (
         world.genocide &&
         save.data.n.plot > 16.1 &&
         (save.data.n.plot < 28 || save.data.n.plot > 30.1) &&
         (save.data.n.plot < 38.1 || save.data.n.plot > 42.1)
      );
   },
   /** kill script */
   kill () {
      if (world.population > 0) {
         save.data.n.kills++;
         switch (game.room[0]) {
            case 's':
               save.data.n.kills_starton++;
               break;
            case 'f':
               save.data.n.kills_foundry++;
               break;
            case 'a':
               save.data.n.kills_aerialis++;
               break;
         }
         if (world.population === 0) {
            save.data.n.plot < 8.1 && !world.bullied && (save.data.b.genocide = true);
            game.music && (game.music.rate.value = rooms.of(game.room).score.rate * world.ambiance);
         }
      }
   },
   get level () {
      return world.gain(game.room);
   },
   /** undyne chaser is active */
   get phish () {
      return save.data.n.plot === 47.2;
   },
   /** local monster population */
   get population () {
      switch (game.room[0]) {
         case 'w':
            return (
               16 -
               (save.data.n.plot < 16 ? save.data.n.kills : save.data.n.kills_wastelands) -
               save.data.n.bully_wastelands
            );
         case 's':
            return 12 - save.data.n.kills_starton - save.data.n.bully_starton;
         case 'f':
            return 9 - save.data.n.kills_foundry - save.data.n.bully_foundry;
         case 'a':
            return 7 - save.data.n.kills_aerialis - save.data.n.bully_aerialis;
         default:
            return 1;
      }
   },
   rate (music = '' as string | CosmosDaemon) {
      typeof music === 'string' && (music = audio.music.of(rooms.of(music).score.music!));
      if (
         world.population > 0 ||
         [
            assets.music.generator,
            assets.music.muscle,
            assets.music.temmie,
            assets.music.temShop,
            assets.music.drone,
            assets.music.youscreweduppal
         ].includes(music)
      ) {
         return music?.rate ?? 1;
      } else {
         return (music?.rate ?? 1) * (world.bullied ? 0.8 : 0.5);
      }
   },
   /** if napsta isnt happy with u */
   get sad_ghost () {
      return [ 2, 4 ].includes(save.data.n.state_wastelands_napstablook);
   },
   /** player tracker */
   /*
   tracker: {
      //player position history, ordered by most recent
      history: [] as { face: CosmosDirection; position: CosmosPointSimple; time: number }[],
      // interpolate time to position
      interpolate (time: number) {
         for (const [ index, min ] of game.tracker.history.entries()) {
            if (min.time === time) {
               return min;
            } else if (min.time < time) {
               const vec = new CosmosPoint(min.position);
               const max = game.tracker.history[index - 1] || {
                  face: player.face,
                  position: player.position.value(),
                  time: game.tracker.time
               };
               const phase = CosmosMath.remap(time, 0, 1, min.time, max.time);
               return {
                  face: phase < 0.5 ? min.face : max.face,
                  position: vec.endpoint(vec.angleFrom(max.position), vec.extentOf(max.position) * phase),
                  time
               };
            }
         }
      },
      time: 0
   },
   */
   /** true kill counter */
   get trueKills () {
      return (
         save.data.n.kills +
         save.data.n.corekills +
         (save.data.n.state_wastelands_toriel === 2 ? 1 : 0) +
         (world.genocide && save.data.n.plot > 16.1 ? 1 : 0) +
         (save.data.n.state_starton_doggo === 2 ? 1 : 0) +
         (save.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
         (save.data.n.state_starton_dogs === 2 ? 2 : 0) +
         (save.data.n.state_starton_greatdog === 2 ? 1 : 0) +
         (save.data.n.state_starton_papyrus === 1 ? 1 : 0) +
         (save.data.n.state_foundry_doge === 1 ? 1 : 0) +
         (save.data.n.state_foundry_muffet === 1 ? 1 : 0) +
         (save.data.n.state_foundry_maddummy === 1 ? 1 : 0) +
         (save.data.n.state_foundry_undyne > 0 ? 1 : 0) +
         (save.data.n.state_aerialis_royalguards > 0 ? 2 : 0) +
         (save.data.b.killed_glyde ? 1 : 0) +
         (save.data.b.killed_madjick ? 1 : 0) +
         (save.data.b.killed_knightknight ? 1 : 0) +
         (save.data.n.plot > 67 && !save.data.b.spared_mushketeer ? 1 : 0) +
         (world.genocide && save.data.n.plot > 67.1 ? 1 : 0)
      );
   }
};

export function activate (source: CosmosHitbox, filter: (hitbox: CosmosHitbox) => boolean, interact = false) {
   source.calculate(renderer);
   for (const key of [ 'below', 'main' ]) {
      for (const { metadata } of renderer.detect(source, ...renderer.calculate(key as OutertaleLayerKey, filter))) {
         if (typeof metadata.name === 'string') {
            interact && random.next();
            events.fire('script', metadata.name, ...(metadata.args as string[]));
         }
      }
   }
}

export function backSprite (map: OutertaleMap, name: string) {
   const handler = {
      priority: -Infinity,
      listener (this: CosmosSprite) {
         const {
            area: { x, y, width, height },
            offset
         } = map.value![`r:${name}`];
         this.crop.top = y;
         this.crop.left = x;
         this.crop.right = -x - width;
         this.crop.bottom = -y - height;
         this.position.set(offset);
         this.off('tick', handler);
      }
   };
   return new CosmosSprite({ frames: [ map.image ] }).on('tick', handler);
}

export function calcAT () {
   return (calcLV() || 1) * 2 + 8;
}

export function calcDF () {
   return Math.round(CosmosMath.remap(calcLV() || 1, 10, 15, 1, 20));
}

export function calcHP () {
   const lv = calcLV() || 1;
   if (lv === 20) {
      return 99;
   } else {
      return lv * 4 + 16;
   }
}

export function calcLV () {
   let lv = 0;
   for (const expLevel of expLevels) {
      if (expLevel > save.data.n.exp) {
         break;
      }
      lv++;
   }
   return lv + (save.data.b.oops ? 1 : 0);
}

export function calcNX () {
   const value = expLevels[calcLV() - (save.data.b.oops ? 1 : 0)];
   return value ? value - save.data.n.exp : null;
}

/** quick character */
export function character (
   key: string,
   preset: CosmosCharacterPreset,
   position: CosmosPointSimple,
   face: CosmosDirection,
   override = {} as CosmosNot<CosmosCharacterProperties, 'preset' | 'position'>
) {
   const instance = new CosmosCharacter(Object.assign({ preset, key, position }, override));
   instance.face = face;
   renderer.attach('main', instance);
   return instance;
}

export function colormix (c1: number, c2: number, v: number) {
   const [ r1, g1, b1, a1 ] = CosmosBitmap.hex2color(c1);
   const [ r2, g2, b2, a2 ] = CosmosBitmap.hex2color(c2);
   return CosmosBitmap.color2hex([
      CosmosMath.remap(v, r1, r2),
      CosmosMath.remap(v, g1, g2),
      CosmosMath.remap(v, b1, b2),
      CosmosMath.remap(v, a1, a2)
   ]);
}

export function displayTime (value: number) {
   const seconds = value / 30;
   return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')}`;
}

export function distanceGravity (v: number, d: number) {
   if (d === 0) {
      return 0;
   } else {
      return v ** 2 / (v + d * 2);
   }
}

/** all loaded characters */
export function fetchCharacters () {
   return renderer.layers.main.objects.filter(object => object instanceof CosmosCharacter) as CosmosCharacter[];
}

/** smart dialogue system */
export async function dialogue (nav: string, ...lines: string[]) {
   if (lines.length > 0) {
      dialogueSession.active = true;
      if (!dialogueSession.state) {
         dialogueSession.state = true;
         dialogueSession.movement = game.movement;
         dialogueSession.movement && (game.movement = false);
      }
      const trueNavigator =
         nav === 'auto'
            ? (game.camera?.position.subtract(game.camera.position.clamp(...renderer.region)).y || 0) > 0
               ? 'dialoguerTop'
               : 'dialoguerBottom'
            : nav;
      atlas.target === trueNavigator || atlas.switch(trueNavigator);
      await typer.text(...lines);
      dialogueSession.active = false;
      timer.post().then(() => {
         if (!dialogueSession.active) {
            atlas.switch(null);
            dialogueSession.movement && (game.movement = true);
            dialogueSession.state = false;
         }
      });
   }
}

export function easyRoom (name: string, map: OutertaleMap, decorator: OutertaleRoomDecorator) {
   const extras: CosmosAsset[] = [];
   rooms.register(
      name,
      new OutertaleRoom({
         decorator,
         face: decorator.face as CosmosDirection,
         layers: Object.fromEntries(
            Object.entries(decorator.layers ?? {}).map(([ layer, objects = [] ]) => [
               layer,
               [
                  ...(layer === decorator.background ? [ backSprite(map, name) ] : []),
                  ...(layer in (decorator.mixins ?? {}) ? [ backSprite(maps.of(decorator.mixins![layer]!), name) ] : []),
                  ...objects.map(decorator => {
                     const {
                        attachments = [],
                        barriers = [],
                        filters = [],
                        interacts = [],
                        position,
                        rotation,
                        tags = [],
                        triggers = []
                     } = decorator;
                     return new CosmosObject({
                        filters: filters.map(filter => image.filters.of(filter)),
                        metadata: { class: 'object', decorator, tags: tags.slice() },
                        position,
                        rotation,
                        objects: [
                           ...attachments.map(decorator => {
                              const {
                                 anchor,
                                 auto = false,
                                 filters = [],
                                 frames = [],
                                 position,
                                 resources,
                                 rotation,
                                 steps: duration,
                                 type
                              } = decorator;
                              if (type === 'sprite') {
                                 return new CosmosSprite({
                                    anchor,
                                    active: auto,
                                    filters: filters.map(filter => image.filters.of(filter)),
                                    frames: frames.map(frame => {
                                       const extra = content[frame as keyof typeof content] as CosmosImage;
                                       extras.push(extra);
                                       return extra;
                                    }),
                                    metadata: { class: 'attachment', decorator },
                                    position,
                                    rotation,
                                    duration
                                 });
                              } else {
                                 const extra = content[resources as keyof typeof content] as CosmosAnimationResources;
                                 extras.push(extra);
                                 return new CosmosAnimation({
                                    anchor,
                                    active: auto,
                                    filters: filters.map(filter => image.filters.of(filter)),
                                    metadata: { class: 'attachment', decorator },
                                    resources: extra,
                                    position,
                                    rotation
                                 });
                              }
                           }),
                           ...barriers.map(decorator => {
                              const { anchor, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: { barrier: true, class: 'barrier', decorator },
                                 position,
                                 rotation,
                                 size
                              });
                           }),
                           ...interacts.map(decorator => {
                              const { anchor, args = [], name, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: {
                                    args: args.slice(),
                                    class: 'interact',
                                    decorator,
                                    interact: true,
                                    name
                                 },
                                 position,
                                 rotation,
                                 size
                              });
                           }),
                           ...triggers.map(decorator => {
                              const { anchor, args = [], name, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: { args, class: 'trigger', decorator, name, trigger: true },
                                 position,
                                 rotation,
                                 size
                              });
                           })
                        ]
                     });
                  })
               ]
            ])
         ),
         metadata: decorator.metadata,
         neighbors: decorator.neighbors?.slice(),
         preload: new CosmosInventory(
            ...([
               ...[ ...new Set([ map, ...Object.values(decorator.mixins ?? {}).map(key => maps.of(key!)) ]) ],
               ...extras,
               ...(decorator.preload ?? []).map(
                  asset => content[asset as keyof typeof content] || inventories[asset as keyof typeof inventories]
               )
            ].filter(asset => asset instanceof CosmosAsset) as CosmosAsset[])
         ),
         region: decorator.region?.slice() as CosmosRegion | [],
         score: decorator.score,
         spawn: decorator.spawn
      })
   );
}

export function fader (properties: CosmosSizedObjectProperties = {}, layer: OutertaleLayerKey | null = 'menu') {
   const object = new CosmosRectangle(Object.assign({ alpha: 0, fill: '#000', size: { x: 320, y: 240 } }, properties));
   layer && renderer.attach(layer, object);
   return object;
}

/** listen for specific header */
export function header (target: string) {
   return new Promise<void>(resolve => {
      const listener = (header: string) => {
         if (header === target) {
            resolve();
            typer.off('header', listener);
         }
      };
      typer.on('header', listener);
   });
}

export function heal (amount = Infinity, sfx = true) {
   if (amount < 0) {
      sfx && audio.sounds.of('hurt').instance(timer);
      save.data.n.hp = Math.max(save.data.n.hp + amount, 0);
      if (save.data.n.hp === 0) {
         battler.active || battler.SOUL.position.set(renderer.projection(player.position.subtract(0, 15)));
         battler.defeat();
      }
   } else {
      sfx && audio.sounds.of('heal').instance(timer);
      save.data.n.hp = Math.max(save.data.n.hp, Math.min(save.data.n.hp + amount, calcHP()));
   }
}

/** get a single instance */
export function instance (layer: OutertaleLayerKey, tag: string) {
   return instances(layer, tag).next().value;
}

/** get instances */
export function * instances (layer: OutertaleLayerKey, tag: string) {
   for (const object of renderer.layers[layer].objects.slice()) {
      const tags = object.metadata.tags;
      if (tags instanceof Array && tags.includes(tag)) {
         yield {
            destroy: () => renderer.detach(layer, object),
            talk: async (
               tag: string,
               provider: (top: CosmosObject) => CosmosSprite,
               navigator: string,
               ...lines: string[]
            ) => {
               const anim = provider(object);
               const listener = (header: string) => {
                  if (header === `npc/${tag}`) {
                     speech.targets.add(anim);
                  } else if (header === 'npc') {
                     speech.targets.delete(anim);
                  }
               };
               typer.on('header', listener);
               await dialogue(navigator, ...lines);
               typer.off('header', listener);
               speech.targets.delete(anim);
            },
            tags,
            object
         };
      }
   }
}

/** isolate an object */
export function isolate (self: CosmosObject, room?: string) {
   room ??= game.room;
   let state = true;
   const barrier = self.metadata.barrier;
   const interact = self.metadata.interact;
   const trigger = self.metadata.trigger;
   const listener = () => {
      if (state && game.room !== room) {
         state = false;
         self.alpha.value = 0;
         barrier && (self.metadata.barrier = false);
         interact && (self.metadata.interact = false);
         trigger && (self.metadata.trigger = false);
      } else if (!state && game.room === room) {
         state = true;
         self.alpha.value = 1;
         barrier && (self.metadata.barrier = true);
         interact && (self.metadata.interact = true);
         trigger && (self.metadata.trigger = true);
      }
   };
   self.on('tick', listener);
   return listener;
}

/** isolate multiple objects */
export function isolates (selves: CosmosObject[], room?: string) {
   return selves.map(self => isolate(self, room));
}

export function keepActive (this: CosmosSprite) {
   this.active = true;
}

export function menuText (
   x: number,
   y: number,
   c: CosmosProvider<string>,
   properties: CosmosTextProperties = {},
   white?: boolean
) {
   return new CosmosText(
      Object.assign(
         { fill: white === false ? void 0 : 'white', position: { x: x / 2, y: y / 2 }, stroke: 'transparent' },
         properties
      )
   ).on('tick', function () {
      this.content = CosmosUtils.provide(c);
   });
}

export function menuBox (
   x: number,
   y: number,
   w: number,
   h: number,
   b: number,
   properties: CosmosSizedObjectProperties = {}
) {
   const post = new CosmosPoint(b).add(x, y);
   const crop = { top: post.y, left: post.x, right: -post.x - w, bottom: -post.y - h };
   return new CosmosRectangle({
      fill: 'white',
      position: { x: x / 2, y: y / 2 },
      size: { x: w / 2 + b, y: h / 2 + b },
      stroke: 'transparent',
      objects: [
         new CosmosRectangle({ fill: 'black', position: b / 2, size: { x: w / 2, y: h / 2 } }),
         new CosmosObject({
            alpha: 0.5,
            position: b / 2,
            scale: 0.5,
            objects: [
               new CosmosAnimation({ subcrop: crop, resources: content.ibGrey }).on('tick', function () {
                  if (game.active) {
                     const source = renderer.layers.base.objects[0] as CosmosAnimation;
                     this.alpha.value = source.alpha.value;
                     this.index = source.index;
                  }
               }),
               new CosmosAnimation({ alpha: 0.05, subcrop: crop, resources: content.ibGalaxy }),
               new CosmosAnimation({ alpha: 0.02, subcrop: crop, resources: content.ibBlue }).on('tick', function () {
                  if (game.active) {
                     this.index = (renderer.layers.base.objects[2] as CosmosAnimation).index;
                  }
               }),
               new CosmosSprite({ crop }).on('tick', function () {
                  if (game.active) {
                     const source = renderer.layers.base.objects[3] as CosmosSprite;
                     this.index = source.index;
                     this.frames = source.frames;
                  }
               })
            ]
         }),
         new CosmosObject(Object.assign({ fill: 'black', position: { x: b / 2, y: b / 2 } }, properties))
      ]
   });
}

export function menuFilter (nav: string, navX: CosmosProvider<CosmosBasic>, navY?: CosmosProvider<number>) {
   if (atlas.target === nav) {
      const navigator = atlas.navigator();
      if (navigator) {
         const navYv = CosmosUtils.provide(navY);
         if (typeof navYv === 'number') {
            if (navigator.position.x === CosmosUtils.provide(navX) && navigator.position.y === navYv) {
               return true;
            }
         } else if (navigator.selection() === CosmosUtils.provide(navX)) {
            return true;
         }
      }
   }
}

export function menuSOUL (
   x: number,
   y: number,
   nav: string,
   navX: CosmosProvider<CosmosBasic>,
   navY?: CosmosProvider<number>
) {
   return new CosmosSprite({
      frames: [ content.ieSOUL ],
      position: { x: x / 2, y: y / 2 },
      priority: 1
   }).on('tick', function () {
      this.alpha.value = menuFilter(nav, navX, navY) ? 1 : 0;
   });
}

/** quick notifier */
export async function notifier (entity: CosmosEntity, time: number, hy = entity.sprite.compute().y) {
   const anim = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      resources: content.ibuNotify
   }).on('tick', function () {
      this.position.set(renderer.projection(entity.position.subtract(0, hy + 3)));
   });
   renderer.attach('menu', anim);
   await timer.pause(time);
   renderer.detach('menu', anim);
}

/** oops */
export function oops () {
   if (!save.data.b.oops) {
      save.data.b.oops = true;
      new CosmosDaemon(content.asOops, {
         context: audio.context,
         gain: 0.2,
         router: audio.soundRouter
      }).instance(timer);
   }
}

/** resume music */
export function resume ({ gain = 1, rate = 1, fade = true }) {
   game.music?.stop();
   const score = rooms.of(game.room).score;
   const daemon = typeof score.music === 'string' ? audio.music.of(score.music) : null;
   game.music = daemon?.instance(timer) ?? null;
   audio.musicFilter.value = score.filter;
   if (game.music) {
      game.music.gain.value = 0;
      game.music.gain.modulate(timer, fade ? 300 : 0, gain);
      game.music.rate.value = score.rate * rate;
   }
   audio.musicReverb.value = score.reverb;
}

/** saw mapper */
export function sawWaver (time: number, period: number, from: number, to: number, phase = 0) {
   return CosmosMath.linear((((timer.value - time) % period) / period + phase) % 1, from, to, from);
}

/** sine mapper */
export function sineWaver (time: number, period: number, from: number, to: number, phase = 0) {
   return CosmosMath.remap(CosmosMath.wave(((timer.value - time + phase * period) % period) / period), from, to);
}

/** sprite echo */
export function shadow (
   sprite: CosmosSprite,
   ticker: (self: CosmosSprite) => boolean,
   properties: CosmosSpriteProperties = {}
) {
   const { promise, resolve } = CosmosUtils.hyperpromise();
   return {
      object: new CosmosSprite(
         Object.assign(
            {
               alpha: sprite.alpha.value,
               anchor: sprite.anchor,
               crop: sprite.crop,
               parallax: sprite.parallax,
               position: sprite.position,
               priority: sprite.priority.value,
               rotation: sprite.rotation.value,
               scale: sprite.scale,
               frames: [ sprite.frames[sprite.index] ]
            },
            properties
         )
      ).on('tick', function () {
         ticker(this) && resolve();
      }),
      promise
   };
}

/** quicker shadow func */
export function quickshadow (
   spr: CosmosSprite,
   position: Partial<CosmosPointSimple> | number,
   parent = 'menu' as OutertaleLayerKey | CosmosObject,
   alpha = 0.6,
   alphaDecay = 1.5,
   alphaThreshold = 0.2
) {
   const e = shadow(
      spr,
      s => {
         s.alpha.value /= alphaDecay;
         if (s.alpha.value < alphaThreshold) {
            return true;
         } else {
            return false;
         }
      },
      { position, alpha }
   );
   timer.post().then(() => {
      typeof parent === 'string' ? renderer.attach(parent, e.object) : parent.attach(e.object);
      e.promise.then(() => {
         typeof parent === 'string' ? renderer.detach(parent, e.object) : parent.detach(e.object);
      });
   });
   return e.object;
}

export async function saveSelector () {
   const y = 97.5;
   const baseColor = '#808080';
   const highlightColor = '#ffffff';
   const resources = new CosmosInventory(
      content.ieSplashBackground,
      content.im_,
      maps.of('_'),
      content.amRedacted,
      content.asMenu,
      content.asSelect
   );
   const audios = {
      redacted: new CosmosDaemon(content.amRedacted, {
         context: audio.context,
         loop: true,
         gain: 1,
         rate: 0.1,
         router: effectSetup(audio.musicReverb, (i, o) => i.connect(o.destination))
      }),
      menu: new CosmosDaemon(content.asMenu, { context: audio.context, gain: 0.5 }),
      select: new CosmosDaemon(content.asSelect, { context: audio.context, gain: 0.5 })
   };
   const timelines = {
      get bisect () {
         return saveAtlas.navigators.of('timeline').selection() === 'bisect';
      },
      name: '',
      list: CosmosUtils.parse(save.manager.getItem('TIMELINES') || '[]') as [number, string][],
      get selection () {
         return saveAtlas.navigators.of('timelines').selection();
      },
      delete () {
         const namespace = timelines.namespace();
         save.manager.removeItem(namespace);
         for (const key of CosmosUtils.populate(save.manager.length, index => save.manager.key(index))) {
            key?.startsWith(namespace) && save.manager.removeItem(key);
         }
         timelines.list.splice(timelines.selection, 1);
         timelines.save();
      },
      namespace (index?: number) {
         return `TIMELINES~${index ?? timelines.list[timelines.selection][0]}`;
      },
      rename () {
         if (timelines.name) {
            if (timelines.selection === -1 || timelines.bisect) {
               let index = 0;
               const indices = timelines.list.map(value => value[0]);
               while (indices.includes(index)) {
                  index++;
               }
               timelines.list.push([ index, timelines.name ]);
               if (timelines.bisect) {
                  const namespace1 = timelines.namespace();
                  const namespace2 = timelines.namespace(index);
                  for (const key of CosmosUtils.populate(save.manager.length, index => save.manager.key(index))) {
                     key?.startsWith(namespace1) &&
                        save.manager.setItem(
                           namespace2 + key.slice(namespace1.length),
                           save.manager.getItem(key) ?? ''
                        );
                  }
               }
               timelines.save();
               return 'timeline';
            } else {
               timelines.list[timelines.selection][1] = timelines.name;
               timelines.save();
               return 'timelines';
            }
         }
      },
      save () {
         save.manager.setItem('TIMELINES', CosmosUtils.serialize(timelines.list));
      }
   };
   const crt = new CRTFilter({
      curvature: 0,
      lineContrast: 0.15,
      lineWidth: 5,
      noise: 0.15,
      noiseSize: 1.5,
      vignetting: 0.1,
      vignettingAlpha: 0.25,
      vignettingBlur: 0.75
   });
   const glitch = new GlitchFilter({ slices: 100, offset: 5 });
   const saveRenderer = new CosmosRenderer({
      active: false,
      area: new Rectangle(0, 0, 640, 480),
      alpha: 0,
      wrapper: '#wrapper',
      layers: { below: [], main: [], menu: [] },
      size: { x: 640, y: 480 },
      scale: 2,
      position: { x: 160, y: 120 },
      filters: [ crt ]
   });
   const room = new CosmosObject({
      area: saveRenderer.area,
      metadata: { fx: -Infinity },
      objects: [ rooms.of('_').layers.below![0] ],
      filters: [ new GrayscaleFilter() ]
   }).on('tick', function () {
      if (this.metadata.fx > saveRenderer.timer.value - 200) {
         this.filters!.length < 2 && this.filters!.push(glitch);
         glitch.refresh();
      } else {
         this.filters!.length > 1 && this.filters!.pop();
      }
   });
   const next = new CosmosNavigator();
   const saveAtlas: CosmosAtlas<string> = new CosmosAtlas<string>({
      next,
      main: new CosmosNavigator<string>({
         grid: [ [ 'next', 'timelines' ] ],
         objects: [
            new CosmosRectangle({
               position: { x: 160, y },
               anchor: 0,
               size: { x: 280, y: 50 },
               objects: [
                  new CosmosText({
                     font: '16px DeterminationMono',
                     anchor: 0,
                     content: text.t_main
                  })
               ]
            }).on('tick', function () {
               if (saveAtlas.target === 'main' && saveAtlas.navigator()?.selection() === 'next') {
                  this.stroke = this.objects[0].fill = highlightColor;
               } else {
                  this.stroke = this.objects[0].fill = baseColor;
               }
            }),
            new CosmosRectangle({
               position: { x: 160, y: y + 55 },
               anchor: 0,
               size: { x: 200, y: 40 },
               objects: [
                  new CosmosText({
                     font: '16px DeterminationMono',
                     anchor: 0,
                     content: text.t_timelines
                  }).on('tick', function () {
                     this.alpha.value = saveAtlas.target === 'main' ? 1 : 0;
                  })
               ]
            }).on('tick', function () {
               if (saveAtlas.target === 'rename') {
                  this.stroke = highlightColor;
                  this.objects[0].fill = baseColor;
               } else if (saveAtlas.target === 'main' && saveAtlas.navigator()?.selection() === 'timelines') {
                  this.stroke = this.objects[0].fill = highlightColor;
               } else {
                  this.stroke = this.objects[0].fill = baseColor;
               }
            })
         ],
         next (self) {
            return self.selection();
         }
      }).on('change', function () {
         audios.menu.instance(saveRenderer.timer);
      }),
      timelines: new CosmosNavigator<string>({
         grid () {
            return [ [ ...timelines.list.keys(), -1 ] ];
         },
         flip: true,
         prev: 'main',
         next (self) {
            if (self.selection() === -1) {
               if (isMobile.any) {
                  timelines.name = (prompt(text.t_placeholder, '') ?? '').slice(0, 16);
                  timelines.rename();
               } else {
                  return 'rename';
               }
            } else {
               return 'timeline';
            }
         },
         objects: [
            new CosmosText({
               position: { x: 160 },
               anchor: 0,
               font: '16px DeterminationMono'
            }).on('tick', function () {
               if (saveAtlas.target === 'rename') {
                  this.y = y + 55;
                  this.content = timelines.name || text.t_placeholder;
               } else if (saveAtlas.target === 'delete') {
                  this.y = y + 47.5;
                  this.content = text.t_confirm;
               } else if (timelines.selection === -1) {
                  this.y = y + 55;
                  this.content = text.t_create;
               } else {
                  this.y = y + 47.5;
                  this.content = timelines.list[timelines.selection][1];
               }
               if (saveAtlas.target === 'rename') {
                  this.fill = timelines.name ? highlightColor : baseColor;
               } else if (saveAtlas.target === 'delete' || saveAtlas.target === 'timelines') {
                  this.fill = highlightColor;
               } else {
                  this.fill = baseColor;
               }
            }),
            new CosmosText({
               position: { x: 100, y: y + 62.5 },
               anchor: 0,
               font: '9px CryptOfTomorrow',
               content: text.t_launch
            }).on('tick', function () {
               if (
                  (saveAtlas.target === 'timelines' && saveAtlas.navigator()?.selection() === -1) ||
                  saveAtlas.target === 'rename' ||
                  saveAtlas.target === 'delete'
               ) {
                  this.alpha.value = 0;
               } else {
                  this.alpha.value = 1;
                  if (saveAtlas.target === 'timeline' && saveAtlas.navigator()?.selection() === 'next') {
                     this.fill = highlightColor;
                  } else {
                     this.fill = baseColor;
                  }
               }
            }),
            new CosmosText({
               position: { x: 140, y: y + 62.5 },
               anchor: 0,
               font: '9px CryptOfTomorrow',
               content: text.t_rename
            }).on('tick', function () {
               if (
                  (saveAtlas.target === 'timelines' && saveAtlas.navigator()?.selection() === -1) ||
                  saveAtlas.target === 'rename' ||
                  saveAtlas.target === 'delete'
               ) {
                  this.alpha.value = 0;
               } else {
                  this.alpha.value = 1;
                  if (saveAtlas.target === 'timeline' && saveAtlas.navigator()?.selection() === 'rename') {
                     this.fill = highlightColor;
                  } else {
                     this.fill = baseColor;
                  }
               }
            }),
            new CosmosText({
               position: { x: 180, y: y + 62.5 },
               anchor: 0,
               font: '9px CryptOfTomorrow',
               content: text.t_bisect
            }).on('tick', function () {
               if (
                  (saveAtlas.target === 'timelines' && saveAtlas.navigator()?.selection() === -1) ||
                  saveAtlas.target === 'rename' ||
                  saveAtlas.target === 'delete'
               ) {
                  this.alpha.value = 0;
               } else {
                  this.alpha.value = 1;
                  if (saveAtlas.target === 'timeline' && saveAtlas.navigator()?.selection() === 'bisect') {
                     this.fill = highlightColor;
                  } else {
                     this.fill = baseColor;
                  }
               }
            }),
            new CosmosText({
               position: { x: 220, y: y + 62.5 },
               anchor: 0,
               font: '9px CryptOfTomorrow',
               content: text.t_delete
            }).on('tick', function () {
               if (
                  (saveAtlas.target === 'timelines' && saveAtlas.navigator()?.selection() === -1) ||
                  saveAtlas.target === 'rename' ||
                  saveAtlas.target === 'delete'
               ) {
                  this.alpha.value = 0;
               } else {
                  this.alpha.value = 1;
                  if (saveAtlas.target === 'timeline' && saveAtlas.navigator()?.selection() === 'delete') {
                     this.fill = highlightColor;
                  } else {
                     this.fill = baseColor;
                  }
               }
            }),
            new CosmosText({
               position: { x: 70, y: y + 55 },
               anchor: 0,
               font: '16px DeterminationMono',
               content: '<'
            }).on('tick', function () {
               if (saveAtlas.target === 'timelines') {
                  this.alpha.value = 1;
                  if (saveAtlas.navigator()?.position.y === 0) {
                     this.fill = baseColor;
                  } else {
                     this.fill = highlightColor;
                  }
               } else {
                  this.alpha.value = 0;
               }
            }),
            new CosmosText({
               position: { x: 250, y: y + 55 },
               anchor: 0,
               font: '16px DeterminationMono',
               content: '>'
            }).on('tick', function () {
               if (saveAtlas.target === 'timelines') {
                  this.alpha.value = 1;
                  if (timelines.selection === -1) {
                     this.fill = baseColor;
                  } else {
                     this.fill = highlightColor;
                  }
               } else {
                  this.alpha.value = 0;
               }
            })
         ]
      })
         .on('change', function () {
            audios.menu.instance(saveRenderer.timer);
         })
         .on('from', function (target) {
            select();
            target === 'main' && saveAtlas.attach(saveRenderer, 'main', 'timelines');
         })
         .on('to', function (target) {
            target === 'main' && saveAtlas.detach(saveRenderer, 'main', 'timelines');
         }),
      timeline: new CosmosNavigator<string>({
         grid: [ [ 'next', 'rename', 'bisect', 'delete' ] ],
         flip: true,
         prev: 'timelines',
         next (self) {
            const selection = self.selection();
            const selectionTarget = selection === 'bisect' ? 'rename' : selection;
            if (selectionTarget === 'rename' && isMobile.any) {
               timelines.name = (
                  prompt(text.t_placeholder, selection === 'bisect' ? '' : timelines.list[timelines.selection][1]) ?? ''
               ).slice(0, 16);
               timelines.rename();
            } else {
               return selectionTarget;
            }
         }
      })
         .on('change', function () {
            audios.menu.instance(saveRenderer.timer);
         })
         .on('from', function (target) {
            target === 'timelines' && select();
            this.position = { x: 0, y: 0 };
         }),
      rename: new CosmosNavigator<string>({
         prev () {
            return timelines.selection === -1 ? 'timelines' : 'timeline';
         },
         next () {
            return timelines.rename();
         }
      })
         .on('from', function () {
            select();
            timelines.name =
               timelines.selection === -1 || timelines.bisect ? '' : timelines.list[timelines.selection][1];
            addEventListener('keydown', keydownListener);
         })
         .on('to', function () {
            removeEventListener('keydown', keydownListener);
         }),
      delete: new CosmosNavigator<string>({
         grid: [ [ 'no', 'yes' ] ],
         flip: true,
         objects: [
            new CosmosText({
               position: { x: 130, y: y + 62.5 },
               anchor: 0,
               font: '12px CryptOfTomorrow',
               content: text.g_no
            }).on('tick', function () {
               if (saveAtlas.target === 'delete' && saveAtlas.navigator()?.selection() === 'no') {
                  this.fill = highlightColor;
               } else {
                  this.fill = baseColor;
               }
            }),
            new CosmosText({
               position: { x: 190, y: y + 62.5 },
               anchor: 0,
               font: '12px CryptOfTomorrow',
               content: text.g_yes
            }).on('tick', function () {
               if (saveAtlas.target === 'delete' && saveAtlas.navigator()?.selection() === 'yes') {
                  this.fill = highlightColor;
               } else {
                  this.fill = baseColor;
               }
            })
         ],
         next (self) {
            if (self.selection() === 'yes') {
               timelines.delete();
               return 'timelines';
            } else {
               return 'timeline';
            }
         },
         prev: 'timeline'
      })
         .on('change', function () {
            audios.menu.instance(saveRenderer.timer);
         })
         .on('from', function () {
            select();
            this.position = { x: 0, y: 0 };
            saveAtlas.attach(saveRenderer, 'main', 'delete');
         })
         .on('to', function () {
            saveAtlas.detach(saveRenderer, 'main', 'delete');
         })
   });
   function select () {
      audios.select.instance(saveRenderer.timer);
      room.metadata.fx = saveRenderer.timer.value;
   }
   function keyListener (this: CosmosKeyboardInput) {
      switch (this) {
         case keys.downKey:
            saveAtlas.seek('down');
            break;
         case keys.leftKey:
            saveAtlas.seek('left');
            break;
         case keys.rightKey:
            saveAtlas.seek('right');
            break;
         case keys.upKey:
            saveAtlas.seek('up');
            break;
         case keys.interactKey:
            saveAtlas.target === 'rename' || saveAtlas.next();
            break;
         case keys.specialKey:
            saveAtlas.target === 'rename' || saveAtlas.prev();
            break;
      }
   }
   function keydownListener (event: KeyboardEvent) {
      if (saveAtlas.target === 'rename') {
         if (event.key.length === 1) {
            timelines.name.length < 21 && (timelines.name += event.key);
         } else {
            switch (event.key) {
               case 'Backspace':
                  timelines.name.length > 0 && (timelines.name = timelines.name.slice(0, -1));
                  break;
               case 'Enter':
                  saveAtlas.next();
                  break;
               case 'Escape':
                  saveAtlas.prev();
                  break;
            }
         }
      }
   }
   audio.musicReverb.value = 1;
   saveRenderer.on('tick', function () {
      crt.time += 0.5;
      isMobile.any &&
         (mobile.bounds = (renderer.application.renderer.view as HTMLCanvasElement).getBoundingClientRect());
   });
   await Promise.all([ isMobile.any ? mobileLoader : void 0, resources.load() ]);
   saveRenderer.active = true;
   saveRenderer.attach(
      'below',
      new CosmosSprite({ frames: [ content.ieSplashBackground ], priority: -2 }),
      new CosmosRectangle({
         size: { x: 320, y: 240 },
         border: 20,
         stroke: '#000000'
      }),
      room
   );
   isMobile.any && saveRenderer.attach('menu', controller);
   saveAtlas.switch('main');
   saveAtlas.attach(saveRenderer, 'main', 'main');
   saveRenderer.alpha.modulate(saveRenderer.timer, 200, 1);
   const music = audios.redacted.instance(saveRenderer.timer);
   music.gain.value /= 10;
   music.gain.modulate(saveRenderer.timer, 200, music.gain.value * 10);
   for (const key of Object.values(keys)) {
      key.on('down', keyListener);
   }
   if ((await next.on('from'))[0] === 'timeline') {
      param('namespace', (save.namespace = timelines.namespace()));
      save.state = {};
      saver.load();
      launch.intro = false;
      if (hashes.of(timelines.list[timelines.selection][1].toLowerCase()) === 670987361852517) {
         timelines.delete();
         saver.transfer(sessionStorage);
         save.data.s.room = game.room = '_';
         game.menu = false;
      }
   } else {
      param('namespace', 'OUTERTALE');
   }
   for (const key of Object.values(keys)) {
      key.off('down', keyListener);
   }
   music.stop();
   saveRenderer.canvas.remove();
   saveRenderer.active = false;
   resources.unload();
   audio.musicReverb.value = 0;
}

/** quick screen-shake */
export async function shake (value: number, runoff: number, hold = 0, ...points: number[]) {
   await renderer.shake.modulate(timer, 0, value);
   await timer.pause(hold);
   await renderer.shake.modulate(timer, runoff, ...points, 0);
}

/** trivia provider */
export async function trivia (...lines: string[]) {
   game.movement = false;
   atlas.switch(
      (game.camera?.position.subtract(game.camera.position.clamp(...renderer.region)).y || 0) > 0
         ? 'dialoguerTop'
         : 'dialoguerBottom'
   );
   await typer.text(...lines);
   atlas.switch(null);
   game.movement = true;
}

/** quick talker filter */
export function talkFilter (index = 0) {
   return (top: CosmosObject) =>
      top.objects.filter(object => object instanceof CosmosAnimation)[index] as CosmosAnimation;
}

/** room teleporter */
export async function teleport (
   dest: string,
   face: CosmosDirection,
   x: number,
   y: number,
   {
      fade = true,
      fast = false,
      gain = 1 as CosmosProvider<number, [string]>,
      rate = 1 as CosmosProvider<number, [string]>,
      cutscene = false as CosmosProvider<boolean, [string]>
   }
) {
   // clear pagers
   for (const instance of pager.storage.splice(0, pager.storage.length)) {
      instance.value = 0;
   }

   // fire preteleport event
   events.fire('teleport-start', game.room, dest);

   // store movement state
   teleporter.movement = game.movement;
   teleporter.timer = game.timer;

   // check cooldown
   if (!fast) {
      if (teleporter.hot) {
         return;
      } else {
         teleporter.hot = true;
      }
      game.movement = false;
   }

   // get next room
   const next = rooms.of(dest);

   // get room music options
   const score = next.score;

   // get previous room
   const prev = rooms.of(game.room);

   // set music options
   if (!fast) {
      const time = renderer.alpha.value * 300;
      if (!CosmosUtils.provide(cutscene, dest)) {
         // check if old and new music is the same
         if (score.music === prev.score.music) {
            // transition values
            audio.musicFilter.modulate(timer, fade ? time + 300 : 0, score.filter);
            game.music?.gain.modulate(timer, fade ? time + 300 : 0, CosmosUtils.provide(gain, dest));
            game.music?.rate.modulate(timer, fade ? time : 0, score.rate * CosmosUtils.provide(rate, dest));
            audio.musicReverb.modulate(timer, fade ? time + 300 : 0, score.reverb);
         } else {
            // fade out old music
            game.music?.gain.modulate(timer, fade ? time : 0, 0);
         }
      }

      // begin & wait for fade out
      await renderer.alpha.modulate(timer, fade ? time : 0, 0);
      await renderer.on('render');
   }

   // pause timer during room load
   game.timer = false;

   // remove old objects
   for (const key in prev.layers) {
      renderer.detach(key as keyof typeof prev.layers, ...(prev.layers[key as keyof typeof prev.layers] ?? []));
   }

   // load all needed assets
   await next.preload.load();

   // add new objects
   for (const key in next.layers) {
      renderer.attach(key as keyof typeof next.layers, ...(next.layers[key as keyof typeof next.layers] ?? []));
   }

   // load new preloads
   for (const neighbor of next.neighbors.map(neighbor => rooms.of(neighbor))) {
      neighbor.preload.load();
   }

   // unload old preloads (not including assets in new preload set)
   const safezone = [ next, ...next.neighbors.map(neighbor => rooms.of(neighbor)) ];
   for (const neighbor of [ prev, ...prev.neighbors.map(neighbor => rooms.of(neighbor)) ]) {
      safezone.includes(neighbor) || neighbor.preload.unload();
   }

   // store previous key for event
   const prevkey = game.room;

   // set room
   game.room = dest;
   events.fire('teleport-update', face, { x, y });

   // wait for listeners to update
   await renderer.on('tick');
   await renderer.on('render');

   // fire teleport event; set new room
   events.fire('teleport', prevkey, dest);

   // update camera bounds
   renderer.region[0].x = next.region[0]?.x ?? renderer.region[0].x;
   renderer.region[0].y = next.region[0]?.y ?? renderer.region[0].y;
   renderer.region[1].x = next.region[1]?.x ?? renderer.region[1].x;
   renderer.region[1].y = next.region[1]?.y ?? renderer.region[1].y;

   // resume timer
   game.timer = teleporter.timer;
   game.movement = teleporter.movement;

   if (!fast) {
      // disable menu upon end (avoids sus)
      game.menu = false;

      // begin fade in
      renderer.alpha.modulate(timer, fade ? 300 : 0, 1);

      // wait for more listeners to update (again)
      renderer.on('tick').then(async () => {
         await renderer.on('render');
         teleporter.hot = false;
         game.menu = true;
      });

      // start new music if applicable
      if (!CosmosUtils.provide(cutscene, dest) && (score.music !== prev.score.music || (score.music && !game.music))) {
         resume({ gain: CosmosUtils.provide(gain, dest), rate: CosmosUtils.provide(rate, dest) });
      }
   }
}

export function temporary<X extends CosmosObject> (
   object: X,
   parent: OutertaleLayerKey | CosmosObject,
   callback = () => {}
) {
   typeof parent === 'string' ? renderer.attach(parent, object) : parent.attach(object);
   events.on('teleport').then(() => {
      typeof parent === 'string'
         ? renderer.detach(parent, object)
         : parent.objects.splice(parent.objects.indexOf(object), 1);
      callback();
   });
   return object;
}

export function ultraPosition (room: string) {
   const roomValue = rooms.of(room);
   let face: CosmosDirection = 'down';
   let position = roomValue.decorator?.spawn;
   if (!position) {
      const script = [ ...rooms.values() ]
         .map(x => x.decorator ?? {})
         .map(x => Object.values(x.layers ?? {}))
         .flat(2)
         .map(x => x?.triggers ?? [])
         .flat(1)
         .filter(x => x.name === 'teleport' && x.args!.includes(room))[0];
      if (script) {
         face = script.args![1] as CosmosDirection;
         position = { x: +script.args![2], y: +script.args![3] };
      } else {
         position = {
            x: ((roomValue.region?.[0]?.x ?? 0) + (roomValue.region?.[1]?.x ?? 0)) / 2,
            y: ((roomValue.region?.[0]?.y ?? 0) + (roomValue.region?.[1]?.y ?? 0)) / 2
         };
      }
   }
   return { face, position };
}

/** item handling */
export async function use (key: string, index: number) {
   const item = items.of(key);
   switch (item.type) {
      case 'armor':
      case 'weapon':
         save.storage.inventory.remove(index);
         save.storage.inventory.add(save.data.s[item.type] || (item.type === 'armor' ? 'spacesuit' : 'spanner'));
         save.data.s[item.type] = key;
         break;
      case 'consumable': {
         save.storage.inventory.remove(index);
         heal(item.value, false);
         break;
      }
   }
   await Promise.all(events.fire('use', key));
}

export function validName () {
   return save.data.s.name !== '' && save.flag.n.hash !== 0 && save.flag.n.hash === hashes.of(save.data.s.name);
}

atlas.navigators.register({
   battlerSimple: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip(),
      objects: [
         new CosmosRectangle({ fill: 'black', size: { x: 340, y: 260 }, anchor: 0, position: { x: 160, y: 120 } }),
         new CosmosObject({
            objects: [
               new CosmosText({
                  position: { x: 200 / 2, y: 403 / 2 - 0.5 },
                  fill: '#fff',
                  stroke: 'transparent',
                  font: '12px MarsNeedsCunnilingus'
               }).on('tick', function () {
                  this.content = `${text.g_lv} ${calcLV()}`;
               }),
               new CosmosObject({
                  fill: '#fff',
                  stroke: 'transparent',
                  position: { x: 274 / 2, y: 400 / 2 },
                  objects: [
                     new CosmosSprite({
                        frames: [ content.ibuHP ],
                        position: { y: 2.5 },
                        scale: 0.5
                     }),
                     new CosmosRectangle({ fill: '#f00', position: { x: 18 }, size: { y: 10.5 } }).on(
                        'tick',
                        function () {
                           this.size.x = calcHP() * 0.6 + 0.5;
                        }
                     ),
                     new CosmosRectangle({ fill: '#ff0', position: { x: 18 }, size: { y: 10.5 } }).on(
                        'tick',
                        function () {
                           this.size.x = (save.data.n.hp === Infinity ? calcHP() : save.data.n.hp) * 0.6 + 0.5;
                        }
                     ),
                     new CosmosText({
                        position: { y: 1 },
                        font: '12px MarsNeedsCunnilingus'
                     }).on('tick', function () {
                        const max = calcHP();
                        this.content = `${(save.data.n.hp === Infinity ? text.g_inf : save.data.n.hp)
                           .toString()
                           .padStart(2, '0')} / ${max}`;
                        this.position.x =
                           Math.max(max, save.data.n.hp === Infinity ? calcHP() : save.data.n.hp) * 0.6 + 28;
                     })
                  ]
               })
            ]
         }).on('tick', function () {
            this.alpha.value = battler.alpha.value;
         }),
         battler.box
      ]
   })
      .on('from', from => {
         [ 'battlerAdvancedText', 'dialoguerBase' ].includes(from!) || atlas.attach(renderer, 'menu', 'battlerSimple');
      })
      .on('to', to => {
         [ 'battlerAdvancedText', 'dialoguerBase' ].includes(to!) || atlas.detach(renderer, 'menu', 'battlerSimple');
      }),
   battlerAdvanced: new CosmosNavigator({
      next (self) {
         assets.sounds.select.instance(timer);
         switch (self.selection()) {
            case 'item':
               return save.storage.inventory.size > 0 ? 'battlerAdvancedItem' : void 0;
            case 'mercy':
               return 'battlerAdvancedMercy';
            default:
               return 'battlerAdvancedTarget';
         }
      },
      prev: () => void typer.skip(),
      flip: true,
      grid: () => [ battler.buttons.map(button => button.metadata.button as string) ],
      objects: [
         new CosmosRectangle({ fill: 'black', size: { x: 340, y: 260 }, anchor: 0, position: { x: 160, y: 120 } }),
         new CosmosObject({
            objects: [
               battler.gridder,
               new CosmosObject({
                  fill: '#fff',
                  stroke: 'transparent',
                  position: { x: 30 / 2, y: 403 / 2 },
                  objects: [
                     new CosmosText({
                        position: { y: -0.5 },
                        font: '12px MarsNeedsCunnilingus'
                     }).on('tick', function () {
                        this.content = `${validName() ? save.data.s.name : text.g_mystery1}`;
                     }),
                     new CosmosText({
                        position: { x: 117, y: -0.5 },
                        font: '12px MarsNeedsCunnilingus'
                     }).on('tick', function () {
                        this.x = 13.5 + (validName() ? save.data.s.name.length : 6) * 7.5;
                        this.content = `${text.g_lv} ${calcLV()}`;
                     })
                  ]
               }),
               new CosmosObject({
                  position: { x: 244 / 2, y: 400 / 2 },
                  fill: '#fff',
                  stroke: 'transparent',
                  objects: [
                     new CosmosSprite({
                        frames: [ content.ibuHP ],
                        position: { y: 2.5 },
                        scale: 0.5
                     }),
                     new CosmosRectangle({ fill: '#f00', position: { x: 15.5 }, size: { y: 10.5 } }).on(
                        'tick',
                        function () {
                           this.size.x = calcHP() * 0.6 + 0.5;
                        }
                     ),
                     new CosmosRectangle({ fill: '#ff0', position: { x: 15.5 }, size: { y: 10.5 } }).on(
                        'tick',
                        function () {
                           this.size.x = (save.data.n.hp === Infinity ? calcHP() : save.data.n.hp) * 0.6 + 0.5;
                        }
                     ),
                     new CosmosRectangle({ position: { x: 15.5 }, size: { y: 10.5 } }).on('tick', function () {
                        this.size.x = 0;
                        if (atlas.target === 'battlerAdvancedItem' && save.data.n.hp < Infinity) {
                           const item = items.of(
                              save.storage.inventory.of(
                                 atlas.navigators.of('battlerAdvancedItem').selection() as number
                              )!
                           );
                           if (item && item.type === 'consumable') {
                              this.fill = item.value < 0 ? '#f00' : '#0f0';
                              this.position.x =
                                 15.5 + ((save.data.n.hp === Infinity ? calcHP() : save.data.n.hp) * 0.6 + 0.5);
                              this.size.x =
                                 ((item.value < 0
                                    ? Math.max(save.data.n.hp + item.value, 0)
                                    : Math.max(save.data.n.hp, Math.min(save.data.n.hp + item.value, calcHP()))) -
                                    save.data.n.hp) *
                                 0.6;
                           }
                        }
                     }),
                     new CosmosText({
                        position: { y: 1 },
                        font: '12px MarsNeedsCunnilingus'
                     }).on('tick', function () {
                        const max = calcHP();
                        this.content = `${(save.data.n.hp === Infinity ? text.g_inf : save.data.n.hp)
                           .toString()
                           .padStart(2, '0')} / ${max}`;
                        this.position.x =
                           Math.max(max, save.data.n.hp === Infinity ? calcHP() : save.data.n.hp) * 0.6 + 23;
                     })
                  ]
               }),
               new CosmosObject().on('tick', function () {
                  this.objects.length === battler.buttons.length || (this.objects = battler.buttons);
               })
            ]
         }).on('tick', function () {
            this.alpha.value = battler.alpha.value;
         }),
         battler.overlay,
         battler.box
      ]
   })
      .on('from', () => {
         typer.text(...battler.status);
         timer.post().then(() => battler.refocus());
      })
      .on('to', async () => {
         typer.skip();
         await timer.post();
         game.text = '';
      })
      .on('change', () => {
         battler.refocus();
      }),
   battlerAdvancedTarget: new CosmosNavigator({
      grid () {
         const grid = [] as number[][];
         const list = battler.indexes;
         if (list.length > 0) {
            grid.push(list.slice(0, 3));
            if (list.length > 3) {
               grid.push(list.slice(3, 6));
            }
         }
         return grid;
      },
      next () {
         if (atlas.navigators.of('battlerAdvanced').selection() === 'act') {
            return 'battlerAdvancedAct';
         } else {
            events.fire('select', 'fight');
            battler.fight();
            return null;
         }
      },
      prev: 'battlerAdvanced',
      objects: [
         new CosmosObject({
            font: '16px DeterminationMono',
            objects: [
               ...CosmosUtils.populate(3, index =>
                  menuText(
                     100 + Math.floor(index / 3) * 256,
                     278 + Math.floor(index % 3) * 32 - 4,
                     () =>
                        battler.alive.length > index ? CosmosUtils.provide(battler.alive[index].opponent.name) : '',
                     {
                        objects: [
                           new CosmosRectangle({
                              position: { x: 77, y: 3 },
                              fill: '#f00',
                              size: { x: 101 / 2, y: 17 / 2 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: '#0f0',
                                    size: { y: 17 / 2 }
                                 }).on('tick', function () {
                                    if (
                                       atlas.navigators.of('battlerAdvanced').selection() === 'fight' &&
                                       battler.alive.length > index
                                    ) {
                                       const volatile = battler.alive[index];
                                       this.size.x = Math.ceil((101 / 2) * (volatile.hp / volatile.opponent.hp));
                                    }
                                 })
                              ]
                           }).on('tick', function () {
                              if (
                                 atlas.navigators.of('battlerAdvanced').selection() === 'fight' &&
                                 battler.alive.length > index
                              ) {
                                 this.alpha.value = 1;
                                 this.position.x = Math.min(
                                    45 +
                                       8 *
                                          Math.max(
                                             ...battler.alive.map(
                                                volatile => CosmosUtils.provide(volatile.opponent.name).length
                                             )
                                          ),
                                    186
                                 );
                              } else {
                                 this.alpha.value = 0;
                              }
                           })
                        ]
                     }
                  ).on('tick', function () {
                     this.fill = battler.alive[index]?.sparable
                        ? '#ffff00'
                        : battler.alive[index]?.flirted
                        ? '#d4bbff'
                        : battler.bullied.includes(battler.alive[index])
                        ? '#3f00ff'
                        : '#ffffff';
                  })
               ),
               ...CosmosUtils.populate(
                  6,
                  index =>
                     new CosmosRectangle({
                        position: { x: 32 + index * 130 + 99 }
                     })
               )
            ]
         })
      ]
   }),
   battlerAdvancedAct: new CosmosNavigator({
      flip: true,
      grid: () => {
         const grid = [] as string[][];
         const acts = CosmosUtils.provide(battler.target!.opponent.acts).map(value => value[0]);
         if (acts.length > 0) {
            grid.push([ ...acts.slice(0, 2) ]);
            if (acts.length > 2) {
               grid.push([ ...acts.slice(2, 4) ]);
               if (acts.length > 4) {
                  grid.push([ ...acts.slice(4, 6) ]);
               }
            }
         }
         return grid;
      },
      next (self) {
         battler.SOUL.alpha.value = 0;
         battler.refocus();
         const act = self.selection();
         const volatile = battler.target!;
         for (const [ key, text ] of CosmosUtils.provide(volatile.opponent.acts)) {
            if (act === key) {
               events.fire('select', 'act', act);
               atlas.switch('battlerAdvancedText');
               typer.text(...CosmosUtils.provide(text, volatile)).then(() => {
                  atlas.switch(null);
                  events.fire('choice', { type: 'act', act });
               });
               break;
            }
         }
      },
      prev: 'battlerAdvancedTarget',
      objects: [
         new CosmosObject({
            font: '16px DeterminationMono',
            objects: CosmosUtils.populate(6, index =>
               menuText(100 + Math.floor(index % 2) * 256, 278 + Math.floor(index / 2) * 32 - 4, () => {
                  const acts = CosmosUtils.provide(battler.target!.opponent.acts);
                  if (acts.length > index) {
                     const act = acts[index];
                     const colortext = CosmosUtils.provide(act[2], battler.target!);
                     return `${colortext ? `§fill:${colortext}§` : ''}${battler.acts.of(act[0])}`;
                  } else {
                     return '';
                  }
               })
            )
         })
      ]
   }),
   battlerAdvancedItem: new CosmosNavigator({
      flip: true,
      grid: () => [ [ ...save.storage.inventory.contents.keys() ] ],
      next (self) {
         const index = self.selection() as number;
         const key = save.storage.inventory.of(index)!;
         const item = items.of(key);
         battler.SOUL.alpha.value = 0;
         battler.refocus();
         events.fire('select', 'item', key);
         atlas.switch('battlerAdvancedText');
         typer.text(...CosmosUtils.provide(item.text.use)).then(async () => {
            await use(key, index);
            if (item.type === 'consumable') {
               await typer.text(save.data.n.hp < calcHP() ? text.b_heal2 : text.b_heal1);
            }
            atlas.switch(null);
            events.fire('choice', { type: 'item', item: key });
         });
      },
      objects: [
         new CosmosObject({
            font: '16px DeterminationMono',
            objects: [
               ...CosmosUtils.populate(2, index =>
                  menuText(100 + Math.floor(index % 2) * 256, 278 - 4, () => {
                     const key = save.storage.inventory.of(
                        Math.floor(atlas.navigators.of('battlerAdvancedItem').position.y / 2) * 2 + index
                     );
                     if (key) {
                        return `* ${items.of(key).text.battle.name}`;
                     } else {
                        return '';
                     }
                  })
               ),
               menuText(
                  76,
                  310 - 4,
                  () => {
                     const key = save.storage.inventory.of(atlas.navigators.of('battlerAdvancedItem').position.y);
                     if (key) {
                        return CosmosUtils.format(CosmosUtils.provide(items.of(key).text.battle.description), 32, true);
                     } else {
                        return '';
                     }
                  },
                  { spacing: { y: 2 }, fill: '#808080' }
               )
            ]
         }),
         new CosmosObject({ position: { y: 187 }, fill: '#fff' }).on('tick', function () {
            const len = save.storage.inventory.contents.length;
            if (this.metadata.len !== len) {
               this.metadata.len = len;
               const dots = Math.ceil(len / 2);
               if (dots < 2) {
                  this.objects = [];
               } else {
                  const dotSize = 10;
                  const totalWidth = dots * dotSize;
                  const origin = 160 - totalWidth / 2 + dotSize / 2;
                  this.objects = CosmosUtils.populate(dots, index =>
                     new CosmosRectangle({
                        anchor: 0,
                        position: { x: origin + index * dotSize },
                        size: 4
                     }).on('tick', function () {
                        if (index === Math.floor(atlas.navigators.of('battlerAdvancedItem').selection() / 2)) {
                           this.alpha.value = 1;
                        } else {
                           this.alpha.value = 0.5;
                        }
                     })
                  );
               }
            }
         })
      ],
      prev: 'battlerAdvanced'
   }),
   battlerAdvancedMercy: new CosmosNavigator({
      grid: () => [
         [ 'spare', ...(battler.flee ? [ 'flee' ] : []), ...(battler.assist && !save.data.b.oops ? [ 'assist' ] : []) ]
      ],
      next (self) {
         battler.SOUL.alpha.value = 0;
         battler.refocus();
         atlas.switch(null);
         atlas.detach(renderer, 'menu', 'battlerAdvancedText');
         const selection = self.selection() as 'spare' | 'flee' | 'assist';
         events.fire('select', selection);
         events.fire('choice', { type: selection });
      },
      prev: 'battlerAdvanced',
      objects: [
         new CosmosObject({
            font: '16px DeterminationMono',
            objects: ([ 'spare', 'flee', 'assist' ] as ['spare', 'flee', 'assist']).map((key, index) =>
               menuText(100, 278 + Math.floor(index) * 32 - 4, () => {
                  return CosmosUtils.provide(atlas.navigators.of('battlerAdvancedMercy').grid)[0].length > index
                     ? text[`b_mercy_${index < 1 || battler.flee ? key : 'assist'}`]
                     : '';
               }).on('tick', function () {
                  if (CosmosUtils.provide(atlas.navigators.of('battlerAdvancedMercy').grid)[0].length > index) {
                     switch (index < 1 || battler.flee ? key : 'assist') {
                        case 'spare':
                           if (battler.alive.filter(volatile => volatile.sparable).length > 0) {
                              this.fill = '#ffff00';
                           } else if (battler.bullied.length > 0) {
                              this.fill = '#3f00ff';
                           } else {
                              this.fill = '#ffffff';
                           }
                           break;
                        case 'assist':
                           this.fill = '#ffff00';
                           break;
                     }
                  } else {
                     this.fill = '#ffffff';
                  }
               })
            )
         })
      ]
   }),
   battlerAdvancedText: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip(),
      objects: [
         menuText(52, 278 - 4, () => game.text, {
            font: '16px DeterminationMono',
            spacing: { y: 2 },
            priority: 1
         })
      ]
   }).on('to', () => {
      atlas.detach(renderer, 'menu', 'battlerAdvancedText');
   }),
   choicer: new CosmosNavigator({
      flip: true,
      grid: () => CosmosUtils.populate(choicer.type + 1, index => [ index * 2, index * 2 + 1 ]),
      next: self => {
         choicer.result = self.selection() as number;
         choicer.navigator === void 0 || atlas.switch(choicer.navigator);
         atlas.detach(renderer, 'menu', 'choicer');
         typer.read();
      },
      objects: [
         ...CosmosUtils.populate(6, index => {
            return menuSOUL(0, 0, 'choicer', index).on('tick', function () {
               const row = Math.floor(index / 2) + (2 - choicer.type);
               if (row < 3) {
                  this.position.set(
                     19 +
                        (index % 2 === 0 ? choicer.marginA : choicer.marginB + 16) * 8 -
                        (choicer.navigator === 'battlerAdvancedText' ? 4 : 0),
                     choicer.navigator === 'battlerAdvancedText'
                        ? 139 + row * 16
                        : (choicer.navigator === 'dialoguerTop' ? 19 : 174) + row * 19
                  );
               }
            });
         })
      ]
   }).on('from', function () {
      this.position = { x: 0, y: 0 };
   }),
   dialoguerBase: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip()
   }),
   dialoguerBottom: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip(),
      objects: [
         menuBox(32, 320, 566, 140, 6, {
            objects: dialoguer.objects()
         }).on('tick', function () {
            this.font = speech.state.font1;
         })
      ]
   }),
   dialoguerTop: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip(),
      objects: [
         menuBox(32, 10, 566, 140, 6, {
            objects: dialoguer.objects()
         }).on('tick', function () {
            this.font = speech.state.font1;
         })
      ]
   }),
   frontEnd: new CosmosNavigator<string>({
      next: 'frontEndLanding',
      objects: [
         new CosmosAnimation({
            alpha: 0,
            position: { x: 122 / 2, y: 62 / 2 },
            resources: content.ieStory
         }).on('tick', function () {
            this.index = frontEnder.index - 1;
         }),
         menuText(120, 328 - 4, () => game.text, { font: '16px DeterminationMono', spacing: { x: 1, y: 5 } })
      ]
   }).on('from', async function () {
      const panel = this.objects[0] as CosmosAnimation;
      atlas.attach(renderer, 'menu', 'frontEnd');
      frontEnder.updateOptions();
      frontEnder.introMusic = assets.music.story.instance(timer);
      await timer.pause();
      while (atlas.target === 'frontEnd') {
         panel.alpha.modulate(timer, 500, 1);
         typer.text(
            ...[
               text.m_story1,
               text.m_story2,
               text.m_story3,
               text.m_story4,
               text.m_story5,
               text.m_story6,
               text.m_story7,
               text.m_story8,
               text.m_story9,
               text.m_story10,
               text.m_story11
            ][frontEnder.index - 1].map(text => `{#p/story}{#i/50}${CosmosUtils.format(text, 24, true)}`)
         );
         await typer.on('idle');
         await timer.pause(2000);
         if (atlas.target !== 'frontEnd') {
            break;
         }
         if (frontEnder.index === 11) {
            // TODO: pan panel upwards
            atlas.switch('frontEndLanding');
         }
         await panel.alpha.modulate(timer, 500, 0);
         if (atlas.target !== 'frontEnd') {
            break;
         }
         frontEnder.index++;
         await timer.pause();
      }
   }),
   frontEndLanding: new CosmosNavigator<string>({
      next: () => (save.data.s.name ? 'frontEndLoad' : 'frontEndStart'),
      objects: [
         frontEnder.createBackground(),
         new CosmosSprite({
            frames: [ content.ieSplashForeground ]
         }),
         menuText(240, 360 - 2, () => text.g_landing1, {
            alpha: 0,
            fill: '#808080',
            font: '8px CryptOfTomorrow'
         })
      ]
   })
      .on('from', async function () {
         game.input = false;
         const text = this.objects[2];
         text.alpha.value = 0;
         typer.skip();
         await timer.pause(1);
         game.text = '';
         await Promise.all([
            frontEnder.introMusic!.gain.modulate(timer, 1000, 0),
            atlas.navigators.of('frontEnd').objects[0].alpha.modulate(timer, 1000, 0, 0, 0)
         ]);
         game.input = true;
         frontEnder.introMusic!.stop();
         frontEnder.impactNoise = assets.sounds.impact.instance(timer);
         atlas.detach(renderer, 'menu', 'frontEnd');
         atlas.attach(renderer, 'menu', 'frontEndLanding');
         await timer.pause(3e3);
         text.alpha.value = 1;
         await timer.pause(16e3);
         if (atlas.target === 'frontEndLanding') {
            frontEnder.index = 1;
            atlas.switch('frontEnd');
         } else {
            content.amStory.unload();
            content.ieStory.unload();
         }
      })
      .on('to', () => {
         atlas.detach(renderer, 'menu', 'frontEndLanding');
      }),
   frontEndLoad: new CosmosNavigator({
      flip: true,
      grid: () => [
         [ 'continue', save.flag.b.true_reset ? 'trueReset' : 'reset' ],
         [ 'settings', 'settings' ]
      ],
      next (self) {
         switch (self.selection()) {
            case 'continue':
               frontEnder.menuMusic!.stop();
               events.fire('spawn');
               break;
            case 'reset':
               return 'frontEndNameConfirm';
            case 'trueReset':
               frontEnder.trueReset = true;
               return 'frontEndName';
            case 'settings':
               return 'frontEndSettings';
         }
      },
      objects: [
         frontEnder.createBackground(),
         new CosmosObject({
            font: '16px DeterminationSans',
            objects: [
               menuText(140, 132 - 4, () => (validName() ? save.data.s.name : text.g_mystery1)),
               menuText(280, 132 - 4, () => `${text.g_lv} ${calcLV()}`),
               menuText(498, 132 - 4, () => displayTime(save.data.n.time), {
                  anchor: { x: 1 }
               }),
               menuText(140, 168 - 4, () => saver.locations.of(save.data.s.room).name || ''),
               menuText(
                  170,
                  218 - 4,
                  () => `§fill:${menuFilter('frontEndLoad', 'continue') ? '#ff0' : '#fff'}§${text.m_load1}`
               ),
               menuText(
                  390,
                  218 - 4,
                  () => `§fill:${menuFilter('frontEndLoad', 'reset') ? '#ff0' : '#fff'}§${text.m_load2}`
               ),
               menuText(
                  264,
                  258 - 4,
                  () => `§fill:${menuFilter('frontEndLoad', 'settings') ? '#ff0' : '#fff'}§${text.g_settings}`
               ),
               menuText(
                  212,
                  298 - 4,
                  () => `§fill:${menuFilter('frontEndLoad', 'trueReset') ? '#ff0' : '#fff'}§${text.m_load3}`
               ).on('tick', function () {
                  this.alpha.value = save.flag.b.true_reset ? 1 : 0;
               }),
               menuText(320, 464 - 2, () => text.n_footer, {
                  anchor: { x: 0 },
                  fill: '#808080',
                  font: '8px CryptOfTomorrow'
               })
            ]
         })
      ]
   }),
   frontEndName: new CosmosNavigator({
      flip: true,
      grid: [ ...text.m_name5, [ 'quit', 'backspace', 'done' ] ],
      next (self) {
         const selection = self.selection() as string;
         switch (selection) {
            case 'quit':
               frontEnder.name.value = '';
               if (frontEnder.trueReset) {
                  frontEnder.trueReset = false;
                  return 'frontEndLoad';
               } else {
                  return 'frontEndStart';
               }
            case 'backspace':
               frontEnder.name.value.length > 0 && (frontEnder.name.value = frontEnder.name.value.slice(0, -1));
               break;
            case 'done':
               if (frontEnder.name.value.length > 0) {
                  return 'frontEndNameConfirm';
               } else {
                  break;
               }
            default:
               if (frontEnder.name.value.length < 6) {
                  frontEnder.name.value += selection;
               } else {
                  frontEnder.name.value = frontEnder.name.value.slice(0, 5) + selection;
               }
         }
      },
      prev () {
         frontEnder.name.value = '';
         if (frontEnder.trueReset) {
            frontEnder.trueReset = false;
            return 'frontEndLoad';
         } else {
            return 'frontEndStart';
         }
      },
      objects: [
         frontEnder.createBackground(),
         new CosmosObject({
            font: '16px DeterminationSans',
            objects: [
               menuText(168, 68 - 4, () => text.m_name1),
               menuText(280, 118 - 4, () => frontEnder.name.value),
               ...text.m_name5.flat().map((letter, index) => {
                  const { x, y } = text.m_name6(index);
                  return menuText(
                     x,
                     y - 4,
                     () =>
                        `§offset:0.5,0.5§§random:1,1§§fill:${
                           menuFilter('frontEndName', letter) ? '#ff0' : '#fff'
                        }§${letter}`
                  );
               }),
               menuText(
                  120,
                  408 - 4,
                  () => `§fill:${menuFilter('frontEndName', 'quit') ? '#ff0' : '#fff'}§${text.m_name2}`
               ),
               menuText(
                  240,
                  408 - 4,
                  () => `§fill:${menuFilter('frontEndName', 'backspace') ? '#ff0' : '#fff'}§${text.m_name3}`
               ),
               menuText(
                  440,
                  408 - 4,
                  () => `§fill:${menuFilter('frontEndName', 'done') ? '#ff0' : '#fff'}§${text.m_name4}`
               )
            ]
         })
      ]
   }),
   frontEndNameConfirm: new CosmosNavigator<string>({
      flip: true,
      grid: () => [ frontEnder.name.blacklist.includes(frontEnder.name.value.toLowerCase()) ? [ 'no' ] : [ 'no', 'yes' ] ],
      next (self) {
         if (self.selection() === 'no') {
            return save.data.s.name ? 'frontEndLoad' : 'frontEndName';
         } else {
            frontEnder.menuMusic!.stop();
            game.input = false;
            const sound = assets.sounds.cymbal.instance(timer);
            const fader = atlas.navigators.of('frontEndNameConfirm').objects[2];
            fader.alpha.value = 0;
            fader.alpha.modulate(timer, 5000, 1).then(() => {
               sound.stop();
               content.asCymbal.unload();

               // clear data
               const name = save.data.s.name;
               if (frontEnder.trueReset) {
                  saver.reset(true, false);
                  save.data.s.name = frontEnder.name.value;
                  save.flag.n.hash = hashes.of(frontEnder.name.value);
                  frontEnder.name.value = '';
                  events.fire('reset');
               } else if (name) {
                  const room = save.data.s.room;
                  saver.reset(false, false);
                  save.data.s.name = name;
                  save.data.s.room = room;
                  events.fire('reset');
               } else {
                  save.data.s.name = frontEnder.name.value;
                  save.flag.n.hash = hashes.of(frontEnder.name.value);
                  frontEnder.name.value = '';
               }
               save.data.s.room = game.room = 'w_start';
               name || saver.save();

               // do the teleport
               events.fire('spawn');
            });
         }
      },
      prev: () => (save.data.s.name && !frontEnder.trueReset ? 'frontEndLoad' : 'frontEndName'),
      objects: [
         frontEnder.createBackground(),
         new CosmosObject({
            font: '16px DeterminationSans',
            objects: [
               menuText(180, 68 - 4, () => {
                  if (save.data.s.name && !frontEnder.trueReset) {
                     return text.m_confirm2;
                  } else {
                     const lower = frontEnder.name.value.toLowerCase();
                     if (lower in text.m_confirm4) {
                        return CosmosUtils.format(text.m_confirm4[lower as keyof typeof text.m_confirm4], 24, true);
                     } else if (new Set(lower.split('')).size === 1) {
                        return text.m_confirm4.aaaaaa;
                     } else {
                        return text.m_confirm1;
                     }
                  }
               }),
               new CosmosObject({
                  objects: [
                     menuText(0, 0, () =>
                        save.data.s.name && !frontEnder.trueReset ? save.data.s.name : frontEnder.name.value
                     ).on('tick', function () {
                        this.position.x = Math.random() / 2;
                        this.position.y = Math.random() / 2;
                        this.rotation.value = (Math.random() - 0.5) * frontEnder.name.shake.value;
                     })
                  ]
               }),
               menuText(
                  146,
                  408 - 4,
                  () =>
                     `§fill:${menuFilter('frontEndNameConfirm', 'no') ? '#ff0' : '#fff'}§${
                        frontEnder.name.blacklist.includes(frontEnder.name.value.toLowerCase())
                           ? text.m_confirm3
                           : text.g_no
                     }`
               ),
               menuText(
                  460,
                  408 - 4,
                  () =>
                     `§fill:${menuFilter('frontEndNameConfirm', 'yes') ? '#ff0' : '#fff'}§${
                        frontEnder.name.blacklist.includes(frontEnder.name.value.toLowerCase()) ? '' : text.g_yes
                     }`
               )
            ]
         }),
         new CosmosRectangle({
            alpha: 0,
            fill: 'white',
            stroke: 'transparent',
            size: { x: 320, y: 240 }
         })
      ]
   }).on('from', function () {
      const name = this.objects[1].objects[1];
      name.scale.x = 1;
      name.scale.y = 1;
      name.position.x = 140;
      name.position.y = 55;
      frontEnder.name.shake.value = 0;
      name.scale.modulate(timer, 4000, { x: 3.4, y: 3.4 });
      name.position.modulate(timer, 4000, { x: 100, y: 115 });
      frontEnder.name.shake.modulate(timer, 4000, 2);
   }),
   frontEndSettings: new CosmosNavigator<string>({
      grid: () => [ [ 'exit', 'sfx', 'music', ...(isMobile.any ? [ 'right' ] : []) ] ],
      next (self) {
         const selection = self.selection() as string;
         switch (selection) {
            case 'exit':
               if (game.active) {
                  frontEnder.menuMusic?.stop();
                  return null;
               } else {
                  frontEnder.menuMusic!.gain.value = 0.5;
                  return save.data.s.name ? 'frontEndLoad' : 'frontEndStart';
               }
            case 'sfx':
            case 'music':
               save.flag.b[`option_${selection}`] = !save.flag.b[`option_${selection}`];
               frontEnder.testSFX(selection === 'music');
               break;
            case 'right':
               save.flag.b.option_right = !save.flag.b.option_right;
               break;
         }
      },
      prev () {
         if (game.active) {
            return null;
         } else {
            frontEnder.menuMusic!.gain.value = 0.5;
            return save.data.s.name ? 'frontEndLoad' : 'frontEndStart';
         }
      },
      objects: [
         frontEnder.createBackground(),
         new CosmosObject({
            font: '16px DeterminationSans',
            objects: [
               // 60px base indent, +28px for each line (2 lines would have 88 px indent)
               menuText(208, 36 - 4, () => text.m_settings1, {
                  font: '32px DeterminationSans'
               }),
               menuText(
                  40,
                  88 - 4,
                  () => `§fill:${menuFilter('frontEndSettings', 'exit') ? '#ff0' : '#fff'}§${text.m_settings2}`
               ),
               menuText(
                  40,
                  148 - 4,
                  () => `§fill:${menuFilter('frontEndSettings', 'sfx') ? '#ff0' : '#fff'}§${text.m_settings3}`
               ),
               menuText(184, 148 - 4, () => {
                  return `§fill:${menuFilter('frontEndSettings', 'sfx') ? '#ff0' : '#fff'}§${
                     save.flag.b.option_sfx ? text.g_disabled : text.g_percent
                  }`.replace('$(x)', Math.round((1 - save.flag.n.option_sfx) * 100).toString());
               }),
               menuText(
                  40,
                  208 - 4,
                  () => `§fill:${menuFilter('frontEndSettings', 'music') ? '#ff0' : '#fff'}§${text.m_settings4}`
               ),
               menuText(184, 208 - 4, () => {
                  return `§fill:${menuFilter('frontEndSettings', 'music') ? '#ff0' : '#fff'}§${
                     save.flag.b.option_music ? text.g_disabled : text.g_percent
                  }`.replace('$(x)', Math.round((1 - save.flag.n.option_music) * 100).toString());
               }),
               menuText(
                  40,
                  268 - 4,
                  () => `§fill:${menuFilter('frontEndSettings', 'right') ? '#ff0' : '#fff'}§${text.m_settings5}`
               ).on('tick', function () {
                  this.alpha.value = isMobile.any ? 1 : 0;
               }),
               menuText(
                  184,
                  268 - 4,
                  () =>
                     `§fill:${menuFilter('frontEndSettings', 'right') ? '#ff0' : '#fff'}§${
                        save.flag.b.option_right ? text.m_settings5_right : text.m_settings5_left
                     }`
               ).on('tick', function () {
                  this.alpha.value = isMobile.any ? 1 : 0;
               })
            ]
         })
      ]
   }).on('from', async function () {
      this.position = { x: 0, y: 0 };
   }),
   frontEndStart: new CosmosNavigator({
      grid: [ [ 'begin', 'settings' ] ],
      next: self => (self.selection() === 'begin' ? 'frontEndName' : 'frontEndSettings'),
      objects: [
         frontEnder.createBackground(),
         new CosmosObject({
            fill: '#c0c0c0',
            font: '16px DeterminationSans',
            objects: [
               menuText(176, 48 - 4, () => text.m_start1[0], {}, false),
               menuText(170, 108 - 4, () => text.m_start1[1], {}, false),
               menuText(170, 144 - 4, () => text.m_start1[2], {}, false),
               menuText(170, 180 - 4, () => text.m_start1[3], {}, false),
               menuText(170, 216 - 4, () => text.m_start1[4], {}, false),
               menuText(170, 252 - 4, () => text.m_start1[5], {}, false),
               menuText(170, 288 - 4, () => text.m_start1[6], {}, false),
               menuText(
                  170,
                  352 - 4,
                  () => `§fill:${menuFilter('frontEndStart', 'begin') ? '#ff0' : '#fff'}§${text.m_start2}`
               ),
               menuText(
                  170,
                  392 - 4,
                  () => `§fill:${menuFilter('frontEndStart', 'settings') ? '#ff0' : '#fff'}§${text.g_settings}`
               ),
               menuText(320, 464 - 2, () => text.n_footer, {
                  anchor: { x: 0 },
                  fill: '#808080',
                  font: '8px CryptOfTomorrow'
               })
            ]
         })
      ]
   }),
   save: new CosmosNavigator({
      flip: true,
      grid: () => [ saver.yellow ? [ 'done', 'done' ] : [ 'save', 'return' ] ],
      next (self) {
         if (self.selection() === 'save') {
            saver.yellow = true;
            saver.savedTime = save.data.n.time;
            save.data.n.base1 = random.value;
            save.data.s.room = game.room;
            saver.save();
            assets.sounds.save.instance(timer);
         } else {
            return null;
         }
      },
      prev: null,
      objects: [
         menuBox(108, 118, 412, 162, 6, {
            font: '16px DeterminationSans',
            objects: [
               new CosmosObject({
                  objects: [
                     menuText(26, 24 - 4, () => (validName() ? save.data.s.name : text.g_mystery1), {}, false),
                     menuText(158, 24 - 4, () => `${text.g_lv} ${calcLV()}`, {}, false),
                     menuText(
                        384,
                        24 - 4,
                        () => displayTime(saver.yellow ? saver.savedTime : save.data.n.time),
                        { anchor: { x: 1 } },
                        false
                     ),
                     menuText(26, 64 - 4, () => saver.locations.of(save.data.s.room).name || '', {}, false),
                     menuSOUL(28, 124, 'save', 'save'),
                     menuText(56, 124 - 4, () => (saver.yellow ? text.m_save3 : text.m_save1), {}, false),
                     menuSOUL(208, 124, 'save', 'return'),
                     menuText(236, 124 - 4, () => (saver.yellow ? '' : text.m_save2), {}, false)
                  ]
               }).on('tick', function () {
                  this.fill = saver.yellow ? '#ff0' : '#fff';
               })
            ]
         })
      ]
   })
      .on('to', () => {
         saver.yellow = false;
         game.movement = true;
      })
      .on('from', function () {
         this.position = { x: 0, y: 0 };
      }),
   shop: new CosmosNavigator({
      grid: () => [ CosmosUtils.populate(CosmosUtils.provide(shopper.value!.size), index => index) ],
      next: () => void shopper.value!.handler(),
      prev: () => void typer.skip(),
      objects: [
         menuBox(420, 78 + 162, 206, 154, 8, {
            metadata: {
               mode: 0
            },
            font: '16px DeterminationSans',
            objects: [
               menuText(30, 20 - 4, () => CosmosUtils.provide(shopper.value!.tooltip) || '', {
                  spacing: { y: 3 }
               })
            ]
         }).on('tick', function () {
            this.metadata.mode ??= 0;
            const tooltip = CosmosUtils.provide(shopper.value!.tooltip);
            if (this.metadata.mode === 0 && tooltip !== null) {
               this.metadata.mode = 1;
               this.position.modulate(
                  timer,
                  500 * ((this.position.y - 39) / 120),
                  { x: 210, y: 39 },
                  { x: 210, y: 39 }
               );
            } else if (this.metadata.mode === 1 && tooltip === null) {
               this.metadata.mode = 0;
               this.position.modulate(
                  timer,
                  500 * (1 - (this.position.y - 39) / 120),
                  { x: 210, y: 120 },
                  { x: 210, y: 120 }
               );
            }
            const diff = (this.position.y - 120) * 2;
            for (const object of this.objects[1].objects as CosmosSprite[]) {
               if (object instanceof CosmosAnimation) {
                  object.subcrop.top = 248 + diff;
                  object.subcrop.bottom = -402 + diff;
               } else {
                  object.crop.top = 248 + diff;
                  object.crop.bottom = -402 + diff;
               }
            }
         }),
         menuBox(-2, 240, 414, 226, 8, {
            font: '16px DeterminationSans',
            objects: [
               menuText(34, 20 - 4, () => game.text, {
                  font: '16px DeterminationMono',
                  spacing: { y: 5 }
               }).on('tick', function () {
                  this.alpha.value = atlas.target === 'shop' ? 1 : 0;
               }),
               ...CosmosUtils.populate(10, index => {
                  const row = Math.floor(index / 2);
                  if (index % 2) {
                     return new CosmosSprite({
                        frames: [ content.ieSOUL ],
                        position: { x: 24 / 2, y: (20 + row * 40) / 2 }
                     }).on('tick', function () {
                        this.alpha.value = menuFilter(
                           'shopList',
                           0,
                           row +
                              Math.min(
                                 Math.max(atlas.navigators.of('shopList').position.y - 2, 0),
                                 Math.max(CosmosUtils.provide(shopper.value!.size) - 5, 0)
                              )
                        )
                           ? 1
                           : 0;
                     });
                  } else {
                     return menuText(
                        54,
                        20 + row * 40 - 4,
                        () =>
                           CosmosUtils.provide(shopper.value!.options)[
                              row +
                                 Math.min(
                                    Math.max(atlas.navigators.of('shopList').position.y - 2, 0),
                                    Math.max(CosmosUtils.provide(shopper.value!.size) - 5, 0)
                                 )
                           ] || ''
                     ).on('tick', function () {
                        this.alpha.value = [ 'shopList', 'shopPurchase' ].includes(atlas.target!) ? 1 : 0;
                     });
                  }
               })
            ]
         }),
         menuBox(420, 240, 206, 226, 8, {
            font: '16px DeterminationSans',
            objects: [
               menuText(30, 20 - 4, () => game.text, {
                  font: '16px DeterminationMono',
                  spacing: { y: 5 }
               }).on('tick', function () {
                  this.alpha.value = atlas.target === 'shopList' ? 1 : 0;
               }),
               menuText(32, 180 - 4, () => `${save.data.n.g === Infinity ? text.g_inf : save.data.n.g}${text.g_g}`),
               menuText(132, 180 - 4, () => `${save.storage.inventory.size}/8`),
               ...CosmosUtils.populate(10, index => {
                  const row = Math.floor(index / 2);
                  if (index % 2) {
                     return menuSOUL(22, 20 + row * 40, 'shop', 0, row);
                  } else {
                     return menuText(
                        52,
                        20 + row * 40 - 4,
                        () => CosmosUtils.provide(shopper.value!.options)[row] || ''
                     ).on('tick', function () {
                        this.alpha.value = atlas.target === 'shop' ? 1 : 0;
                     });
                  }
               })
            ]
         })
      ]
   })
      .on('from', async from => {
         game.text = '';
         from === null && atlas.attach(renderer, 'menu', 'shop');
         await timer.pause(1);
         typer.text(CosmosUtils.provide(shopper.value!.status));
      })
      .on('to', () => {
         game.text = '';
         typer.skip();
      }),
   shopList: new CosmosNavigator({
      grid: () => [ CosmosUtils.populate(CosmosUtils.provide(shopper.value!.size), index => index) ],
      next: () => void shopper.value!.handler(),
      prev: 'shop'
   })
      .on('from', async () => {
         game.text = '';
         await timer.pause(1);
         typer.text(CosmosUtils.provide(shopper.value!.status));
      })
      .on('to', () => {
         game.text = '';
         typer.skip();
      }),
   shopText: new CosmosNavigator({
      next: () => void typer.read(),
      prev: () => void typer.skip(),
      objects: [
         menuBox(-2, 240, 628, 226, 8, {
            objects: [
               menuText(54, 20 - 4, () => game.text, {
                  font: '16px DeterminationMono',
                  spacing: { y: 5 }
               })
            ]
         })
      ]
   }).on('to', to => {
      typer.skip();
      if (to === null) {
         atlas.detach(renderer, 'menu', 'shop');
         shopper.value!.vars = {};
      }
   }),
   shopPurchase: new CosmosNavigator({
      grid: [ [ 0, 1 ] ],
      next (self) {
         return shopper.value!.purchase(self.selection() === 0) ? void 0 : 'shopList';
      },
      prev () {
         return shopper.value!.purchase(false) ? void 0 : 'shopList';
      },
      objects: [
         new CosmosObject({
            font: '16px DeterminationSans',
            objects: [
               menuText(
                  460,
                  268 - 4,
                  () =>
                     CosmosUtils.provide(shopper.value!.prompt).replace(
                        '$(x)',
                        CosmosUtils.provide(shopper.value!.price).toString()
                     ),
                  { spacing: { y: 2 } }
               ),
               menuSOUL(450, 348, 'shopPurchase', 0, 0),
               menuText(480, 348 - 4, text.g_yes),
               menuSOUL(450, 378, 'shopPurchase', 0, 1),
               menuText(480, 378 - 4, text.g_no)
            ]
         })
      ]
   }),

   sidebar: new CosmosNavigator({
      grid: () => [ [ 'item', 'stat', 'cell' ] ],
      next (self) {
         switch (self.selection()) {
            case 'item':
               if (save.storage.inventory.size > 0) {
                  return 'sidebarItem';
               } else {
                  break;
               }
            case 'stat':
               return 'sidebarStat';
            case 'cell':
               if (save.data.n.plot < 3) {
                  atlas.detach(renderer, 'menu', 'sidebar');
                  sidebarrer.openSettings();
                  break;
               } else {
                  return 'sidebarCell';
               }
         }
      },
      prev: null,
      objects: [
         menuBox(32, 52, 130, 98, 6, {
            font: '8px CryptOfTomorrow',
            objects: [
               menuText(8, 10 - 4, () => (validName() ? save.data.s.name : text.g_mystery1), {
                  font: '16px DeterminationSans'
               }),
               menuText(8, 42 - 2, () => text.g_lv),
               menuText(8, 60 - 2, () => text.g_hp),
               menuText(8, 78 - 2, () => text.g_g),
               menuText(44, 42 - 2, () => calcLV().toString()),
               menuText(44, 60 - 2, () => `${save.data.n.hp === Infinity ? text.g_inf : save.data.n.hp}/${calcHP()}`),
               menuText(44, 78 - 2, () => (save.data.n.g === Infinity ? text.g_inf : save.data.n.g).toString())
            ]
         }),
         menuBox(32, 168, 130, 136, 6, {
            font: '16px DeterminationSans',
            objects: [
               menuSOUL(18, 22, 'sidebar', 'item'),
               menuSOUL(18, 58, 'sidebar', 'stat'),
               menuSOUL(18, 94, 'sidebar', 'cell'),
               menuText(
                  46,
                  22 - 4,
                  () => `${save.storage.inventory.size > 0 ? '' : '§fill:#808080§'}${text.m_sidebar1}`
               ),
               menuText(46, 58 - 4, () => text.m_sidebar2),
               menuText(46, 94 - 4, () => (save.data.n.plot < 3 ? text.m_sidebar4 : text.m_sidebar3))
            ]
         })
      ]
   })
      .on('from', key => {
         switch (key) {
            case null:
               atlas.attach(renderer, 'menu', 'sidebar');
               assets.sounds.menu.instance(timer);
               break;
            case 'sidebarItem':
            case 'sidebarStat':
            case 'sidebarCell':
               atlas.detach(renderer, 'menu', key);
               break;
         }
      })
      .on('to', key => {
         switch (key) {
            case null:
               atlas.detach(renderer, 'menu', 'sidebar');
               game.movement = true;
               break;
            case 'sidebarItem':
            case 'sidebarStat':
            case 'sidebarCell':
               atlas.attach(renderer, 'menu', key);
               break;
         }
      }),
   sidebarItem: new CosmosNavigator({
      grid: () => [ [ ...save.storage.inventory.contents.keys() ] ],
      next: 'sidebarItemOption',
      prev: 'sidebar',
      objects: [
         menuBox(188, 52, 334, 350, 6, {
            font: '16px DeterminationSans',
            objects: [
               ...CosmosUtils.populate(16, index => {
                  const row = Math.floor(index / 2);
                  if (index % 2) {
                     return menuSOUL(14, 30 + row * 32, 'sidebarItem', 0, row);
                  } else {
                     return menuText(38, 30 + row * 32 - 4, () => {
                        const key = save.storage.inventory.of(row);
                        if (key) {
                           return CosmosUtils.provide(items.of(key).text.name);
                        } else {
                           return '';
                        }
                     });
                  }
               }),
               menuSOUL(14, 310, 'sidebarItemOption', 0, 0),
               menuSOUL(110, 310, 'sidebarItemOption', 0, 1).on('tick', function () {
                  this.offsets[0].x = sidebarrer.use ? 0 : 7;
               }),
               menuSOUL(224, 310, 'sidebarItemOption', 0, 2),
               menuText(38, 310 - 4, () => (sidebarrer.use ? text.m_item1 : text.m_item2)),
               menuText(134, 310 - 4, () => text.m_item3, { offsets: [ {} ] }).on('tick', function () {
                  this.offsets[0].x = sidebarrer.use ? 0 : 7;
               }),
               menuText(248, 310 - 4, () => text.m_item4)
            ]
         })
      ]
   }),
   sidebarItemOption: new CosmosNavigator<string>({
      flip: true,
      grid: [ [ 'use', 'info', 'drop' ] ],
      next (self) {
         const key = sidebarrer.item;
         const selection = self.selection() as 'use' | 'info' | 'drop';
         atlas.switch('dialoguerBottom');
         typer.text(...CosmosUtils.provide(items.of(key).text[selection])).then(async () => {
            if (selection === 'use') {
               await use(key, atlas.navigators.of('sidebarItem').position.y);
            } else if (selection === 'drop') {
               save.storage.inventory.remove(atlas.navigators.of('sidebarItem').position.y);
            }
            atlas.switch(null);
            atlas.detach(renderer, 'menu', 'sidebar');
            selection === 'drop' && (await Promise.all(events.fire('drop', key)));
            game.movement = true;
         });
         assets.sounds.equip.instance(timer);
      },
      prev: 'sidebarItem'
   }).on('to', key => {
      key === 'dialoguerBottom' && atlas.detach(renderer, 'menu', 'sidebarItem');
   }),
   sidebarStat: new CosmosNavigator({
      prev: 'sidebar',
      objects: [
         menuBox(188, 52, 334, 406, 6, {
            font: '16px DeterminationSans',
            objects: [
               menuText(22, 34 - 4, () => `"${validName() ? save.data.s.name : text.g_mystery1}"`),
               menuText(22, 94 - 4, () => `${text.g_lv} \xa0\xa0\xa0${calcLV()}`),
               menuText(
                  22,
                  126 - 4,
                  () =>
                     `${text.g_hp} \xa0\xa0\xa0${
                        save.data.n.hp === Infinity ? text.g_inf : save.data.n.hp
                     } / ${calcHP()}`
               ),
               menuText(
                  22,
                  190 - 4,
                  () => `${text.m_stat1} \xa0\xa0\xa0${calcAT() - 10} (${items.of(save.data.s.weapon).value})`
               ),
               menuText(
                  22,
                  222 - 4,
                  () => `${text.m_stat2} \xa0\xa0\xa0${calcDF() - 10} (${items.of(save.data.s.armor).value})`
               ),
               menuText(22, 282 - 4, () => `${text.m_stat3}: ${items.of(save.data.s.weapon).text.name}`),
               menuText(22, 314 - 4, () => `${text.m_stat4}: ${items.of(save.data.s.armor).text.name}`),
               menuText(
                  22,
                  354 - 4,
                  () => `${text.m_stat5}: ${save.data.n.g === Infinity ? text.g_inf : save.data.n.g}`
               ),
               menuText(190, 354 - 4, () =>
                  world.trueKills > 9 || save.data.n.bully > 9
                     ? save.data.n.bully > world.trueKills / 3
                        ? `${text.m_stat11}: ${save.data.n.bully}`
                        : `${text.m_stat9}: ${world.trueKills}`
                     : ''
               ).on('tick', function () {
                  this.fill = save.data.n.bully > world.trueKills / 3 ? '#3f00ff' : '#ff0000';
               }),
               menuText(
                  190,
                  190 - 4,
                  () => `${text.m_stat6}: ${save.data.n.exp === Infinity ? text.g_inf : save.data.n.exp}`
               ),
               menuText(190, 222 - 4, () => `${text.m_stat7}: ${calcNX() ?? text.m_stat10}`),
               menuText(190, 34 - 4, () => (validName() ? '' : text.m_stat8), {
                  spacing: { y: 3 }
               })
            ]
         })
      ]
   }),
   sidebarCell: new CosmosNavigator<string>({
      grid () {
         if (atlas.target === null) {
            return [ [ 0 ] ];
         } else {
            return [
               [
                  ...[ ...phone.entries() ]
                     .filter(entry => entry[1].display())
                     .sort((a, b) => CosmosUtils.provide(a[1].priority ?? 0) - CosmosUtils.provide(b[1].priority ?? 0))
                     .map(entry => entry[0]),
                  null
               ]
            ];
         }
      },
      next: self => {
         const selection = self.selection();
         if (selection === null) {
            sidebarrer.openSettings();
         } else if (typeof selection === 'number') {
            sidebarrer.dimbox = [ 'dimboxA', 'dimboxB' ][selection] as 'dimboxA' | 'dimboxB';
            return 'sidebarCellBox';
         } else {
            phone.of(selection).trigger();
         }
      },
      prev: 'sidebar',
      objects: [
         menuBox(188, 52, 334, 270, 6, { font: '16px DeterminationSans' }).on('tick', function () {
            const list = CosmosUtils.provide(atlas.navigators.of('sidebarCell').grid)[0].slice(0, -1) as string[];
            this.objects[2].objects = [
               ...CosmosUtils.populate(list.length * 2, index => {
                  const row = Math.floor(index / 2);
                  if (index % 2) {
                     return menuSOUL(14, 30 + row * 32, 'sidebarCell', 0, row);
                  } else {
                     return menuText(38, 30 + row * 32 - 4, () => {
                        return CosmosUtils.provide(phone.of(list[row]).name);
                     });
                  }
               }),
               menuSOUL(14, 30 + 6 * 32, 'sidebarCell', 0, list.length),
               menuText(38, 30 + 6 * 32 - 4, () => {
                  return text.g_settings;
               })
            ];
         })
      ]
   })
      .on('to', key => {
         if (key !== 'sidebar') {
            key === 'sidebarCellBox' || key === 'sidebarCellPms' || assets.sounds.select.instance(timer);
            atlas.detach(
               renderer,
               'menu',
               'sidebarCell',
               ...((key === 'dialoguerBottom' ? [] : [ 'sidebar' ]) as string[])
            );
         }
      })
      .on('from', key => {
         if (key === 'sidebar') {
            atlas.navigators.of('sidebarCell').position = { x: 0, y: 0 };
         }
      }),
   sidebarCellBox: new CosmosNavigator({
      next (self) {
         const dimbox = save.storage[sidebarrer.dimbox];
         const source = [ save.storage.inventory, dimbox ][self.position.x];
         const item = source.of(self.position.y);
         if (item && [ dimbox, save.storage.inventory ][self.position.x].add(item)) {
            source.remove(self.position.y);
         }
      },
      prev: null,
      grid: () => [ CosmosUtils.populate(8, index => `i${index}`), CosmosUtils.populate(10, index => `b${index}`) ],
      objects: [
         menuBox(16, 16, 598, 438, 6, {
            font: '16px DeterminationSans',
            objects: [
               menuText(82 + 5.5, 16 - 4, () => text.m_box1),
               menuText(426 + 2.5, 16 - 4, () => text.m_box2),
               menuText(178 + 5, 392 - 4, () => text.m_box3)
            ]
         }),
         ...CosmosUtils.populate(54, index => {
            const x = Math.floor(index / 3);
            const y = x < 8 ? x : x - 8;
            switch (index % 3) {
               case 0:
                  return menuSOUL(x < 8 ? 40 : 342, 80 + y * 32, 'sidebarCellBox', x < 8 ? 0 : 1, y);
               case 1:
                  return menuText(
                     x < 8 ? 68 : 370,
                     80 - 4 + y * 32,
                     () => {
                        const container = x < 8 ? save.storage.inventory : save.storage[sidebarrer.dimbox];
                        if (container.size > y) {
                           return CosmosUtils.provide(items.of(container.of(y)!).text.name);
                        } else {
                           return '';
                        }
                     },
                     { font: '16px DeterminationSans' }
                  );
               default:
                  return new CosmosRectangle({
                     alpha: 0,
                     fill: '#f00',
                     position: { x: (x < 8 ? 78 : 380) / 2, y: (90 + y * 32) / 2 },
                     size: { x: 180 / 2, y: 1 / 2 }
                  }).on('tick', function () {
                     this.alpha.value =
                        (x < 8 ? save.storage.inventory : save.storage[sidebarrer.dimbox]).size > y ? 0 : 1;
                  });
            }
         }),
         new CosmosRectangle({ fill: '#fff', position: { x: 320 / 2, y: 92 / 2 }, size: { x: 1 / 2, y: 300 / 2 } }),
         new CosmosRectangle({ fill: '#fff', position: { x: 322 / 2, y: 92 / 2 }, size: { x: 1 / 2, y: 300 / 2 } })
      ]
   })
      .on('from', function () {
         assets.sounds.dimbox.instance(timer);
         this.position = { x: 0, y: 0 };
      })
      .on('to', () => (game.movement = true))
});

// basic attach/detach
for (const key of [
   'battlerAdvancedTarget',
   'battlerAdvancedAct',
   'battlerAdvancedItem',
   'battlerAdvancedMercy',
   'dialoguerBottom',
   'dialoguerTop',
   'frontEndLoad',
   'frontEndName',
   'frontEndNameConfirm',
   'frontEndSettings',
   'frontEndStart',
   'save',
   'shopText',
   'shopPurchase',
   'sidebarCellBox'
] as string[]) {
   atlas.navigators
      .of(key)
      .on('from', () => atlas.attach(renderer, 'menu', key))
      .on('to', () => atlas.detach(renderer, 'menu', key));
}

// menu navigation sounds
for (const key of [
   'battlerAdvanced',
   'battlerAdvancedTarget',
   'battlerAdvancedAct',
   'battlerAdvancedItem',
   'battlerAdvancedMercy',
   'choicer',
   'save',
   'shop',
   'shopList',
   'sidebar',
   'sidebarItem',
   'sidebarItemOption',
   'sidebarCell'
]) {
   atlas.navigators.of(key).on('change', () => assets.sounds.menu.instance(timer));
}

// positional reset on navigate from, select on navigate to
for (const [ nav1, nav2 ] of [
   [ 'battlerAdvancedTarget', 'battlerAdvanced' ],
   [ 'battlerAdvancedAct', 'battlerAdvancedTarget' ],
   [ 'battlerAdvancedItem', 'battlerAdvanced' ],
   [ 'battlerAdvancedMercy', 'battlerAdvanced' ],
   [ 'shop', null ],
   [ 'shopList', 'shop' ],
   [ 'sidebar', null ],
   [ 'sidebarItem', 'sidebar' ],
   [ 'sidebarItemOption', 'sidebarItem' ]
] as [string, string | null][]) {
   atlas.navigators.of(nav1).on('from', from => {
      from === nav2 && (atlas.navigators.of(nav1).position = { x: 0, y: 0 });
   });
   atlas.navigators.of(nav1).on('to', to => {
      to !== nav2 && assets.sounds.select.instance(timer);
   });
}

// ghostface fix
for (const key of [ 'dialoguerBottom', 'dialoguerTop' ]) {
   atlas.navigators.of(key).on('from', async function () {
      dialoguer.display = false;
      await Promise.race([ events.on('talk'), typer.on('skip') ]);
      this.objects[0].objects[2].objects[0].objects = [ ...(speech.state.face ? [ speech.state.face ] : []) ];
      dialoguer.display = true;
   });
}

events.on('modded', async () => {
   await mobileLoader;
});

events.on('shut', () => {
   speech.state.face?.reset();
   for (const speaker of speech.targets) {
      speaker.reset();
   }
});

events.on('swipe', (identifier, position) => {
   for (const button of controls) {
      button.positions && identifier in button.positions && (button.positions[identifier] = position);
   }
});

events.on('talk', () => {
   speech.state.face?.enable();
   for (const speaker of speech.targets) {
      speaker.enable();
   }
});

events.on('teleport-update', (direction, position) => {
   player.position.set(position);
   player.face = direction;
   player.metadata.tpface = direction;
});

events.on('touch', (identifier, position) => {
   for (const button of controls) {
      if (
         position &&
         position.x > button.base.x &&
         position.x < button.base.x + button.size.x &&
         position.y > button.base.y &&
         position.y < button.base.y + button.size.y
      ) {
         button.touches.includes(identifier) || button.touches.push(identifier);
         button.positions && (button.positions[identifier] = position);
      } else {
         button.touches.includes(identifier) && button.touches.splice(button.touches.indexOf(identifier), 1);
         button.positions && delete button.positions[identifier];
      }
      if (button.touches.length > 0 && !button.active) {
         button.active = true;
         button.object.alpha.value = 0.75;
         if (button.target) {
            const key = keys[button.target];
            key.force = true;
         }
      } else if (button.touches.length === 0 && button.active) {
         button.active = false;
         button.object.alpha.value = 0.5;
         if (button.target) {
            const key = keys[button.target];
            key.force = false;
         }
      }
   }
});

events.on('use', {
   priority: -Number.MAX_SAFE_INTEGER,
   listener (key) {
      const item = items.of(key);
      if (item.type === 'consumable') {
         audio.sounds.of('heal').instance(timer);
         typer.variables.x = item.value.toString();
      }
   }
});

keys.downKey.on('down', () => {
   if (
      game.input &&
      battler.active &&
      game.movement &&
      battler.SOUL.metadata.color === 'purple' &&
      battler.line.swap === 0 &&
      battler.line.pos.y < battler.line.offset + (battler.line.amount - 1) * 20
   ) {
      battler.line.swap = 1;
   }
});

keys.interactKey.on('down', () => {
   if (game.input && game.movement && !battler.active && !game.noclip && game.interact) {
      game.interact = false;
      renderer.on('tick').then(() => {
         activate(
            player.objects[1] as CosmosHitbox,
            hitbox => !!(hitbox.metadata.interact && hitbox.metadata.name),
            true
         );
      });
      timer.pause(50).then(() => {
         game.interact = true;
      });
   } else if (
      game.input &&
      battler.active &&
      game.movement &&
      battler.SOUL.metadata.color === 'cyan' &&
      battler.SOUL.alpha.value > 0 &&
      timer.value > battler.shadow.metadata.cooldown &&
      (battler.shadow.position.x !== battler.SOUL.x || battler.shadow.position.y !== battler.SOUL.y)
   ) {
      events.fire('leap');
      const leaper = new CosmosAnimation({
         anchor: 0,
         scale: 0.5,
         resources: content.ibuCyanSOUL,
         position: battler.SOUL
      }).on('tick', function () {
         const { object, promise } = shadow(this, self => (self.alpha.value *= 0.9) < 0.2, {
            position: this,
            alpha: 0.4
         });
         timer.post().then(() => renderer.attach('menu', object));
         promise.then(() => renderer.detach('menu', object));
      });
      battler.SOUL.sprite.alpha.value = 0;
      battler.SOUL.position.set(battler.shadow);
      renderer.attach('menu', leaper);
      assets.sounds.arrow.instance(timer);
      battler.SOUL.metadata.cyanLeap = true;
      leaper.position.modulate(timer, 100, battler.shadow).then(() => {
         battler.SOUL.metadata.cyanLeap = false;
         renderer.detach('menu', leaper);
         battler.SOUL.sprite.alpha.value = 1;
      });
      battler.shadow.metadata.cooldown = timer.value + battler.shadow.metadata.jumptimer;
   } else if (
      game.input &&
      battler.active &&
      game.movement &&
      battler.SOUL.metadata.color === 'yellow' &&
      battler.SOUL.alpha.value > 0 &&
      !battler.SOUL.metadata.shota
   ) {
      battler.SOUL.metadata.shota = true;
      assets.sounds.heartshot.instance(timer);
      renderer.attach(
         'menu',
         new CosmosHitbox({
            anchor: { x: 0, y: -0.75 },
            velocity: { y: -8 },
            position: battler.SOUL,
            size: { x: 2, y: 20 },
            scale: 0.5,
            priority: battler.SOUL.priority.value + 1,
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0 },
                  resources: content.ibuYellowShot
               }).on('tick', function () {
                  this.index === 5 && this.disable();
               })
            ]
         }).on('tick', function () {
            if (this.y < 0) {
               renderer.detach('menu', this);
            } else {
               for (const object of renderer.detect(this, ...renderer.calculate('menu', o => o.metadata.shootable))) {
                  object.metadata.absorb && assets.sounds.swallow.instance(timer);
                  (object as CosmosHitbox<CosmosBaseEvents & { shot: [number, number] }>).fire('shot', 0, 0);
                  renderer.detach('menu', this);
                  break;
               }
            }
         })
      );
      timer.pause(100).then(() => {
         battler.SOUL.metadata.shota = false;
      });
   } else if (atlas.target === 'dialoguerBase' && game.movement) {
      atlas.next();
   } else if (
      game.input &&
      battler.active &&
      game.movement &&
      battler.SOUL.metadata.color === 'orange' &&
      battler.SOUL.alpha.value > 0 &&
      !battler.SOUL.metadata.shotb
   ) {
      battler.SOUL.metadata.shotb = true;
      assets.sounds.boom.instance(timer).rate.value = 2;
      shake(2, 500);
      renderer.attach(
         'menu',
         new CosmosObject({
            position: battler.SOUL,
            priority: 999.999,
            metadata: { graphics: null as Graphics | null, ticks: 3 },
            filters: [ new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 0.3, quality: 1 }) ]
         }).on('tick', function () {
            const t = this.metadata.ticks++;
            if (t < 15) {
               const r = t * 4;
               (this.metadata.graphics ??= this.container.addChild(new Graphics()))
                  .clear()
                  .beginFill(0xffffff, 1 - t / 10)
                  .drawCircle(0, 0, r)
                  .endFill()
                  .beginHole()
                  .drawCircle(0, 0, r - 2)
                  .endHole();
               for (const object of renderer.calculate('menu', o => o.metadata.shootable)) {
                  // @ts-expect-error
                  const p = { x: object.$hitbox.previous[4], y: object.$hitbox.previous[5] };
                  const e = this.position.extentOf(p);
                  if (r - e > -4) {
                     (object as CosmosHitbox<CosmosBaseEvents & { shot: [number, number] }>).fire(
                        'shot',
                        this.position.angleTo(p),
                        e
                     );
                  }
               }
            } else {
               renderer.detach('menu', this);
            }
         })
      );
      const bloomer = new AdvancedBloomFilter({ threshold: 0, bloomScale: 1, quality: 5 });
      battler.SOUL.filters = [ bloomer ];
      const bloomerTicker = () => {
         bloomer.bloomScale -= 1 / 15;
         if (bloomer.bloomScale <= 0) {
            battler.SOUL.off('render', bloomerTicker);
            battler.SOUL.filters?.splice(battler.SOUL.filters.indexOf(bloomer), 1);
            battler.SOUL.metadata.shotb = false;
         }
      };
      battler.SOUL.on('render', bloomerTicker);
   }
});

keys.leftKey.on('down', () => {
   if (atlas.target === 'frontEndSettings') {
      const selection = atlas.navigators.of('frontEndSettings').selection() as string;
      const snd = selection === 'sfx' || selection === 'music';
      if (snd /* || selection === 'trans' */) {
         save.flag.n[`option_${selection}`] = Math.min(Math.max(0, (save.flag.n[`option_${selection}`] += 0.05)), 1);
         snd && frontEnder.testSFX(selection === 'music');
      }
   }
});

keys.menuKey.on('down', async () => {
   if (game.input && game.movement && !battler.active && game.menu) {
      switch (atlas.target) {
         case null:
            game.movement = false;
            atlas.switch('sidebar');
            break;
         case 'sidebar':
            atlas.switch(null);
            break;
      }
   }
});

keys.quitKey.on('down', async () => {
   if (atlas.target?.includes('editor')) {
      atlas.prev();
   } else {
      let active = true;
      renderer.attach('menu', quitText);
      keys.quitKey.on('up').then(() => {
         active = false;
         quitText.metadata.state = 1;
         quitText.alpha.modulate(timer, quitText.alpha.value * 300, 0).then(() => {
            renderer.detach('menu', quitText);
         });
      });
      await quitText.alpha.modulate(timer, 300, 1);
      while (active && quitText.metadata.state < 3) {
         quitText.metadata.state = (quitText.metadata.state as number) + 1;
         await timer.pause(300);
      }
      if (active) {
         exit();
         await new Promise(() => {});
      }
   }
});

keys.rightKey.on('down', () => {
   if (atlas.target === 'frontEndSettings') {
      const selection = atlas.navigators.of('frontEndSettings').selection() as string;
      const snd = selection === 'sfx' || selection === 'music';
      if (snd /* || selection === 'trans' */) {
         save.flag.n[`option_${selection}`] = Math.min(Math.max(0, (save.flag.n[`option_${selection}`] -= 0.05)), 1);
         snd && frontEnder.testSFX(selection === 'music');
      }
   }
});

keys.specialKey.on('down', () => {
   if (atlas.target === 'dialoguerBase' && game.movement) {
      atlas.prev();
   }
});

keys.upKey.on('down', () => {
   if (
      game.input &&
      battler.active &&
      game.movement &&
      battler.SOUL.metadata.color === 'purple' &&
      battler.line.swap === 0 &&
      battler.line.offset + 20 <= battler.line.pos.y
   ) {
      battler.line.swap = -1;
   }
});

renderer.on('tick', () => {
   game.timer && save.data.n.time++;
   frontEnder.updateOptions();
   isMobile.any && (mobile.bounds = (renderer.application.renderer.view as HTMLCanvasElement).getBoundingClientRect());
   if (keys.menuKey.active() && game.interact && game.input && (!game.movement || battler.active)) {
      switch (atlas.target) {
         case 'dialoguerBase':
         case 'dialoguerBottom':
         case 'dialoguerTop':
         case 'shopText':
         case 'battlerSimple':
         case 'battlerAdvancedText':
            typer.read();
            typer.skip();
            break;
      }
   }

   if (!player.puppet) {
      if (!keys.altKey.active() && game.input && !battler.active && game.movement) {
         const up = keys.upKey.active();
         const left = keys.leftKey.active();
         const right = keys.rightKey.active();
         const down = keys.downKey.active();
         const base = player.position.value();
         const mSpeed = (game.developer && keys.specialKey.active() ? 2 : 1) * ((player.metadata.speed as number) ?? 1);
         const mVector = new CosmosPoint(
            left ? -3 : right ? 3 : 0,
            player.metadata.reverse ? (down ? 3 : up ? -3 : 0) : up ? -3 : down ? 3 : 0
         ).multiply(mSpeed);
         while (true) {
            const mStep = mVector.clamp(-3, 3);
            player.move(
               mStep,
               renderer,
               [ 'below', 'main' ],
               game.noclip ? false : hitbox => hitbox.metadata.barrier === true
            );
            mVector.set(mVector.subtract(mStep));
            if (mVector.x === 0 && mVector.y === 0) {
               break;
            }
         }
         if (player.metadata.reverse) {
            if (down) {
               player.face = 'up';
               mSpeed === 0 || player.sprite.enable();
            } else if (up) {
               player.face = 'down';
               mSpeed === 0 || player.sprite.enable();
            } else if (left) {
               player.face = 'right';
               mSpeed === 0 || player.sprite.enable();
            } else if (right) {
               player.face = 'left';
               mSpeed === 0 || player.sprite.enable();
            }
         }
         if (mSpeed === 0) {
            if (up) {
               player.face = player.metadata.reverse ? 'down' : 'up';
            } else if (down) {
               player.face = player.metadata.reverse ? 'up' : 'down';
            } else if (left) {
               player.face = player.metadata.reverse ? 'right' : 'left';
            } else if (right) {
               player.face = player.metadata.reverse ? 'left' : 'right';
            }
         } else if (up && down && player.y === base.y) {
            if (player.metadata.reverse) {
               player.y -= 1;
            } else {
               player.y += 1;
            }
            player.face = 'down';
         }
         if (!game.noclip) {
            let tick = true;
            if (player.x !== base.x || player.y !== base.y) {
               save.data.n.steps++;
               if (events.fire('step').includes(true)) {
                  tick = false;
               }
            }
            if (tick) {
               activate(player, hitbox => !!(hitbox.metadata.trigger && hitbox.metadata.name));
               events.fire('tick');
            }
         }
      } else {
         player.move({ x: 0, y: 0 }, renderer);
      }
   }
});

typer.on('empty', () => {
   for (const instance of fetchCharacters()) {
      instance.talk = false;
      for (const sprite of Object.values(instance.preset.talk)) {
         speech.targets.delete(sprite);
      }
   }
});

typer.on('header', header => {
   const [ key, delimiter, ...args ] = header.split('');
   if (delimiter === '/') {
      const value = args.join('');
      switch (key) {
         case 'c':
            const [ type, mA, mB ] = value.split('/').map(subvalue => +subvalue);
            choicer.marginA = mA;
            choicer.marginB = mB;
            choicer.navigator = atlas.target;
            choicer.result = 0;
            choicer.type = type;
            atlas.target = 'choicer';
            atlas.attach(renderer, 'menu', 'choicer');
            atlas.navigators.of('choicer').position = { x: 0, y: 0 };
            break;
         case 'e':
            const [ identifier, emote ] = value.split('/');
            identifier in speech.emoters && (speech.emoters[identifier].index = +emote);
            break;
         case 'f':
            speech.state.face = speech.state.preset.faces[+value];
            break;
         case 'g':
            speech.state.face = portraits.of(value);
            break;
         case 'i':
            typer.interval = +value;
            break;
         case 'k':
            shopper.value!.preset(...value.split('/').map(subvalue => +subvalue));
            break;
         case 'p':
            const preset = (speech.state.preset = speech.presets.of(value));
            speech.state.face = preset.faces[0];
            typer.interval = preset.interval;
            typer.threshold = preset.threshold ?? 0;
            typer.sounds = preset.voices[0] ?? [];
            game.text = '';
            for (const instance of fetchCharacters()) {
               if (instance.key === value) {
                  instance.talk = true;
                  for (const sprite of Object.values(instance.preset.talk)) {
                     speech.targets.add(sprite);
                  }
               } else {
                  instance.talk = false;
                  for (const sprite of Object.values(instance.preset.talk)) {
                     speech.targets.delete(sprite);
                  }
               }
            }
            break;
         case 's':
            audio.sounds.of(value).instance(timer);
            break;
         case 'v':
            typer.sounds = speech.state.preset.voices[+value] ?? [];
            break;
      }
   }
});

typer.on('idle', () => void events.fire('shut'));

typer.on('text', content => {
   game.text = content;
   if (typer.mode === 'read' && content.length > 0) {
      if (content[content.length - 1].match(/[\.\!\?]/)) {
         events.fire('shut');
      } else {
         events.fire('talk');
      }
   }
});

addEventListener('blur', () => {
   for (const key of Object.values(keys)) {
      key.reset();
   }
});

addEventListener('touchend', event => {
   event.preventDefault();
   for (const touch of CosmosUtils.populate(event.changedTouches.length, index => event.changedTouches.item(index))) {
      touch && events.fire('touch', touch.identifier);
   }
});

addEventListener('touchcancel', event => {
   event.preventDefault();
   for (const touch of CosmosUtils.populate(event.changedTouches.length, index => event.changedTouches.item(index))) {
      touch && events.fire('touch', touch.identifier);
   }
});

addEventListener('touchmove', event => {
   event.preventDefault();
   for (const touch of CosmosUtils.populate(event.changedTouches.length, index => event.changedTouches.item(index))) {
      touch &&
         events.fire(
            'swipe',
            touch.identifier,
            new CosmosPoint(touch.clientX, touch.clientY)
               .subtract(mobile.bounds)
               .divide(game.ratio)
               .divide(renderer.scale)
         );
   }
});

addEventListener('touchstart', event => {
   event.preventDefault();
   for (const touch of CosmosUtils.populate(event.changedTouches.length, index => event.changedTouches.item(index))) {
      touch &&
         events.fire(
            'touch',
            touch.identifier,
            new CosmosPoint(touch.clientX, touch.clientY)
               .subtract(mobile.bounds)
               .divide(game.ratio)
               .divide(renderer.scale)
         );
   }
});

CosmosUtils.status(`LOAD MODULE: MANTLE (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
