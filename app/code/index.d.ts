import './common';
import './types.d';
import './outlands';
import './starton';
import './foundry';
import './aerialis';
export type OutertaleMod = (mod: string, api: typeof import('./api')) => any;
