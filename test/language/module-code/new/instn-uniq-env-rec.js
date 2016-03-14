// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Modules have distinct environment records
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    6. Let env be NewModuleEnvironment(realm.[[GlobalEnv]]).
    7. Set module.[[Environment]] to env.
    [...]

    8.1.2.6 NewModuleEnvironment (E)

    1. Let env be a new Lexical Environment.
    [...]
flags: [module]
---*/

import './instn-uniq-env-rec-other_.js'
var first = 1;
let second = 2;
const third = 3;
class fourth {}
function fifth() { return 'fifth'; }
function* sixth() { return 'sixth'; }

assert.sameValue(first, 1);
assert.sameValue(second, 2);
assert.sameValue(third, 3);
assert.sameValue(typeof fourth, 'function', 'class declaration');
assert.sameValue(typeof fifth, 'function', 'function declaration');
assert.sameValue(fifth(), 'fifth');
assert.sameValue(typeof sixth, 'function', 'generator function declaration');
assert.sameValue(sixth().next().value, 'sixth');
