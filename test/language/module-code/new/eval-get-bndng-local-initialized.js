// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: References to local initialized bindings resolve successfully
esid: sec-moduleevaluation
info: |
    8.1.1.5.1 GetBindingValue (N, S)

    [...]
    3. If the binding for N is an indirect binding, then
       [...]
    5. Return the value currently bound to N in envRec.
flags: [module]
---*/

var varBinding = 1;
assert.sameValue(varBinding, 1);

varBinding = 2;
assert.sameValue(varBinding, 2);

function fnBinding() { return 3; }
assert.sameValue(fnBinding(), 3);

fnBinding = 4;
assert.sameValue(fnBinding, 4);

function* genBinding() { return 5; }
assert.sameValue(genBinding().next().value, 5);

genBinding = 6;
assert.sameValue(genBinding, 6);

let letBinding = 7;
assert.sameValue(letBinding, 7);

letBinding = 8;
assert.sameValue(letBinding, 8);

const constBinding = 9;
assert.sameValue(constBinding, 9);

class classBinding { valueOf() { return 10; } }
assert.sameValue(new classBinding().valueOf(), 10);

classBinding = 11;
assert.sameValue(classBinding, 11);
