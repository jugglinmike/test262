// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.2.1.1
description: Returns error produced by interpreting length property as a length
info: >
    [...]
    12. Let len be ToLength(Get(arrayLike, "length")).
    13. ReturnIfAbrupt(len).
features: [TypedArray, Symbol.toPrimitive]
---*/

var TypedArray = Object.getPrototypeOf(Int8Array);
var arrayLike = { length: {} };

arrayLike.length[Symbol.toPrimitive] = function() {
  throw new Test262Error();
};

assert.throws(Test262Error, function() {
  TypedArray.from(arrayLike);
});
