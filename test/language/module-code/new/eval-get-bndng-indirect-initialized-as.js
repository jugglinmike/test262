// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: References to indirect initialized bindings resolve successfully
esid: sec-moduleevaluation
info: |
    8.1.1.5.1 GetBindingValue (N, S)

    [...]
    3. If the binding for N is an indirect binding, then
       a. Let M and N2 be the indirection values provided when this binding for
          N was created.
       b. Let targetEnv be M.[[Environment]].
       c. If targetEnv is undefined, throw a ReferenceError exception.
       d. Let targetER be targetEnv's EnvironmentRecord.
       e. Return ? targetER.GetBindingValue(N2, S).
includes: [fnGlobalObject.js]
flags: [module]
---*/

import {
    varName as varBinding2,
    varName as varBinding3,
    fnName as fnBinding2,
    fnName as fnBinding3,
    genName as genBinding2,
    genName as genBinding3,
    letName as letBinding2,
    letName as letBinding3,
    constName as constBinding2,
    constName as constBinding3,
    className as classBinding2,
    className as classBinding3
  } from './eval-get-bndng-indirect-initialized-as_.js';

assert.sameValue(varBinding2, 1);
assert.sameValue(varBinding3, 1);
assert.sameValue(fnBinding2(), 2);
assert.sameValue(fnBinding3(), 2);
assert.sameValue(genBinding2().next().value, 3);
assert.sameValue(genBinding3().next().value, 3);
assert.sameValue(letBinding2, 4);
assert.sameValue(letBinding3, 4);
assert.sameValue(constBinding2, 5);
assert.sameValue(constBinding3, 5);
assert.sameValue(new classBinding2().valueOf(), 6);
assert.sameValue(new classBinding3().valueOf(), 6);

// This function is exposed on the global scope (instead of as an exported
// binding) in order to avoid possible false positives from assuming correct
// behavior of the semantics under test.
fnGlobalObject().test262update();

assert.sameValue(varBinding2, 7);
assert.sameValue(varBinding3, 7);
assert.sameValue(fnBinding2, 8);
assert.sameValue(fnBinding3, 8);
assert.sameValue(genBinding2, 9);
assert.sameValue(genBinding3, 9);
assert.sameValue(letBinding2, 10);
assert.sameValue(letBinding3, 10);
assert.sameValue(classBinding2, 11);
assert.sameValue(classBinding3, 11);
