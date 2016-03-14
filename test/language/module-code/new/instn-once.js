// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Module is instantiated exactly once
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    5. If module.[[Environment]] is not undefined, return
       NormalCompletion(empty).
    6. Let env be NewModuleEnvironment(realm.[[GlobalEnv]]).
    7. Set module.[[Environment]] to env.
    [...]
includes: [fnGlobalObject.js]
flags: [module]
---*/

import './instn-once.js';

var global = fnGlobalObject();

assert.sameValue(global.test262, undefined);
global.test262 = 262;
