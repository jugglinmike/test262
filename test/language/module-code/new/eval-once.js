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

import {} from './eval-once.js';
import './eval-once.js';
import * as ns1 from './eval-once.js';
import dflt1 from './eval-once.js';
export {} from './eval-once.js';
import dflt2, {} from './eval-once.js';
export * from './eval-once.js';
import dflt3, * as ns from './eval-once.js';
export default null;

var global = fnGlobalObject();

assert.sameValue(global.test262, undefined, 'global property initially unset');

global.test262 = 262;

assert.sameValue(global.test262, 262, 'global property was defined');
