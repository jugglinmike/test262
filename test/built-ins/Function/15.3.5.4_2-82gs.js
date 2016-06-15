// Copyright (c) 2012 Ecma International.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 15.3.5.4_2-82gs
description: >
    Strict mode - checking access to strict function caller from
    non-strict function (non-strict function declaration called by
    strict Function.prototype.apply(someObject))
flags: [noStrict]
features: [caller]
---*/

function gNonStrict() {
    return gNonStrict.caller;
}
var caller = function() {
  "use strict";
  value = gNonStrict.apply({});
};
var value;

// In the event that the implementation chooses not to define an "own" property
// on the function object, the reference to "caller" will resolve to the
// ThrowTypeError function installed as a "set" accessor method on the
// FunctionPrototype object.
try {
  caller();
} catch (err) {}

assert.notSameValue(value, caller);
