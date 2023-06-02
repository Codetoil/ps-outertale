import * as PATHFINDING from 'pathfinding';
import { sources as aerialisSources } from './aerialis/bootstrap';
import aerialisGroups from './aerialis/groups';
import aerialisOpponents from './aerialis/opponents';
import aerialisPatterns from './aerialis/patterns';
import aerialisText from './aerialis/text';
import assets from './assets';
import { sources as commonSources } from './common/bootstrap';
import commonGroups from './common/groups';
import commonOpponents from './common/opponents';
import commonPatterns from './common/patterns';
import commonText from './common/text';
import content, { inventories } from './content';
import { CosmosUtils } from './engine';
import { sources as foundrySources } from './foundry/bootstrap';
import foundryGroups from './foundry/groups';
import foundryOpponents from './foundry/opponents';
import foundryPatterns from './foundry/patterns';
import foundryText from './foundry/text';
import { sources as outlandsSources } from './outlands/bootstrap';
import outlandsGroups from './outlands/groups';
import outlandsOpponents from './outlands/opponents';
import outlandsPatterns from './outlands/patterns';
import outlandsText from './outlands/text';
import save from './save';
import { sources as startonSources } from './starton/bootstrap';
import startonGroups from './starton/groups';
import startonOpponents from './starton/opponents';
import startonPatterns from './starton/patterns';
import startonText from './starton/text';
import baseText from './text';

export * from 'pixi-filters';
export * as PIXI from 'pixi.js';
export * as aerialis from './aerialis';
export * from './classes';
export * as common from './common';
export * from './core';
export * from './engine';
export * as foundry from './foundry';
export * from './mantle';
export * as outlands from './outlands';
export * as starton from './starton';
export { PATHFINDING, assets, content, inventories, save };

export const groups = Object.assign(
   {},
   commonGroups,
   outlandsGroups,
   startonGroups,
   foundryGroups,
   aerialisGroups
) as typeof commonGroups & typeof outlandsGroups & typeof startonGroups & typeof foundryGroups & typeof aerialisGroups;

export const opponents = Object.assign(
   {},
   commonOpponents,
   outlandsOpponents,
   startonOpponents,
   foundryOpponents,
   aerialisOpponents
) as typeof commonOpponents &
   typeof outlandsOpponents &
   typeof startonOpponents &
   typeof foundryOpponents &
   typeof aerialisOpponents;

export const patterns = Object.assign(
   {},
   commonPatterns,
   outlandsPatterns,
   startonPatterns,
   foundryPatterns,
   aerialisPatterns
) as typeof commonPatterns &
   typeof outlandsPatterns &
   typeof startonPatterns &
   typeof foundryPatterns &
   typeof aerialisPatterns;

export const sources = Object.assign(
   {},
   commonSources,
   outlandsSources,
   startonSources,
   foundrySources,
   aerialisSources
) as typeof commonSources &
   typeof outlandsSources &
   typeof startonSources &
   typeof foundrySources &
   typeof aerialisSources;

export const text = Object.assign(
   {},
   baseText,
   commonText,
   outlandsText,
   startonText,
   foundryText,
   aerialisText
) as typeof baseText &
   typeof commonText &
   typeof outlandsText &
   typeof startonText &
   typeof foundryText &
   typeof aerialisText;

CosmosUtils.status(`LOAD MODULE: GLOBAL (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
