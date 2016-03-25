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
    [...]
    5. Return the value currently bound to N in envRec.
includes: [fnGlobalObject.js]
flags: [module]
---*/

import {
    varBinding, fnBinding, genBinding, letBinding, constBinding, classBinding
  } from './eval-get-bndng-indirect-initialized_.js';

assert.sameValue(varBinding, 1);
assert.sameValue(fnBinding(), 2);
assert.sameValue(genBinding().next().value, 3);
assert.sameValue(letBinding, 4);
assert.sameValue(constBinding, 5);
assert.sameValue(new classBinding().valueOf(), 6);

// This function is exposed on the global scope (instead of as an exported
// binding) in order to avoid possible false positives from assuming correct
// behavior of the semantics under test.
fnGlobalObject().test262update();

assert.sameValue(varBinding, 7);
assert.sameValue(fnBinding, 8);
assert.sameValue(genBinding, 9);
assert.sameValue(letBinding, 10);
assert.sameValue(classBinding, 11);
