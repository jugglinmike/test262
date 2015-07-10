// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.2.1.1
description: Returns error produced by accessing @@iterator
info: >
    [...]
    6. Let usingIterator be GetMethod(items, @@iterator).
    7. ReturnIfAbrupt(usingIterator).
features: [TypedArray, Symbol.iterator]
---*/

var TypedArray = Object.getPrototypeOf(Int8Array);
var iter = {};
Object.defineProperty(iter, Symbol.iterator, {
  get: function() {
    throw new Test262Error();
  }
});

assert.throws(Test262Error, function() {
  TypedArray.from(iter);
});
