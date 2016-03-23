// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    References to local uninitialized bindings produce ReferenceErrors
esid: sec-moduleevaluation
info: |
    8.1.1.5.1 GetBindingValue (N, S)

    [...]
    3. If the binding for N is an indirect binding, then
       [...]
    4. If the binding for N in envRec is an uninitialized binding, throw a
       ReferenceError exception.
flags: [module]
---*/

function getLet() {
  letBinding;
}

assert.throws(ReferenceError, getLet, '`let` binding');
let letBinding;
getLet();

function getConst() {
  constBinding;
}

assert.throws(ReferenceError, getConst, '`const` binding');
const constBinding = null;
getConst();

function getClass() {
  classBinding;
}

assert.throws(ReferenceError, getClass, '`class` binding');
class classBinding {}
getClass();
