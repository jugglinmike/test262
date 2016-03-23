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
    4. If the binding for N in envRec is an uninitialized binding, throw a
       ReferenceError exception.
    5. Return the value currently bound to N in envRec. 
includes: [fnGlobalObject.js]
flags: [module]
---*/

import {
    letBinding1 as letBinding2,
    constBinding1 as constBinding2,
    classBinding1 as classBinding2
  } from './eval-get-bndng-indirect-uninitialized.js';

function getLet() {
  letBinding2;
}

assert.throws(ReferenceError, getLet);
export let letBinding1;
getLet();

function getConst() {
  constBinding1;
}

assert.throws(ReferenceError, getConst);
export const constBinding1 = null;
getConst();

function getClass() {
  classBinding2;
}

assert.throws(ReferenceError, getClass);
export class classBinding1 {}
getClass();
