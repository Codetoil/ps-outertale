/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//    ::::::::   ::::::::   ::::::::  ::::::::::::  ::::::::   ::::::::    //
//   :+:    :+: :+:    :+: :+:        :+:  ::  :+: :+:    :+: :+:          //
//   +:+        +:+    +:+ +:+        +:+  ::  +:+ +:+    +:+ +:+          //
//   +#+        +#+    +#+  #++::++#  +#+  ++  +#+ +#+    +#+  #++::++#    //
//   +#+        +#+    +#+        +#+ +#+  ++  +#+ +#+    +#+        +#+   //
//   #+#    #+# #+#    #+#        #+# #+#      #+# #+#    #+#        #+#   //
//    ########   ########   ########  ###      ###  ########   ########    //
//                                                                         //
//// highly optimizated /////////////////////////////////////////////////////

export * from './atlas';
export * from './audio';
export * from './core';
export * from './entity';
export * from './image';
export * from './input';
export * from './numerics';
export * from './renderer';
export * from './shapes';
export * from './text';
export * from './utils';

import { BaseTexture, SCALE_MODES, settings } from 'pixi.js';

settings.RESOLUTION = 1;
settings.ROUND_PIXELS = true;
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
