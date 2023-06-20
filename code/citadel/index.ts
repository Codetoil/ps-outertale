import './bootstrap';

import { events, game } from '../core';
import { CosmosKeyed, CosmosUtils } from '../engine/utils';
import { trivia } from '../mantle';
import { sources } from './bootstrap';
import text from './text';

export type CitadelRoomKey = keyof typeof sources;

export type DefinedRoomStates = {};

export type RoomStates = {
   [k in CitadelRoomKey]: k extends keyof DefinedRoomStates ? Partial<DefinedRoomStates[k]> : {};
};

export const states = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed>>
};

export const area = {
   tick () {},
   scripts: {
      bed () {
         // asriel's bed
      },
      fireplace () {
         // crawl in
      },
      fridge () {
         // asgore fridge
      },
      home () {
         // arrive at asgore house
      },
      exit () {
         // go to barrier or exit
      }
   } as Partial<CosmosKeyed<(roomState: any, scriptState: any, ...args: string[]) => any>>,
   tickers: {} as { [k in CitadelRoomKey]?: (roomState: RoomStates[k], ...args: string[]) => any },
   teleports: {} as { [k in CitadelRoomKey]?: (roomState: RoomStates[k], from: string) => any }
};

export const script = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (states.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      area.tickers[game.room as CitadelRoomKey]?.(roomState);
   } else {
      area.scripts[subscript]?.(roomState, (states.scripts[subscript] ??= {}), ...args);
   }
};

events.on('script', (name, ...args) => {
   switch (name) {
      case 'citadel':
         script(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'c') {
            trivia(...CosmosUtils.provide(text.a_citadel.trivia[args[0] as keyof typeof text.a_citadel.trivia]));
         }
         break;
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'c' && script('tick');
});

events.on('teleport', (from, to) => {
   const roomState = (states.rooms[to] ??= {});
   area.teleports[to as CitadelRoomKey]?.(roomState, from);
});

CosmosUtils.status(`LOAD MODULE: CITADEL AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
