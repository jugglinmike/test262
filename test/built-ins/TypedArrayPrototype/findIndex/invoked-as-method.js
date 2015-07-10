// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.11
description: Requires a [[TypedArrayName]] internal slot.
info: >
    This function is not generic. ValidateTypedArray is applied to the this
    value prior to evaluating the algorithm. If its result is an abrupt
    completion that exception is thrown instead of evaluating the algorithm.
features: [TypedArray]
---*/

var TypedArrayPrototype = Object.getPrototypeOf(Int8Array).prototype;

assert.sameValue(typeof TypedArrayPrototype.findIndex, 'function');

assert.throws(TypeError, function() {
  TypedArrayPrototype.findIndex();
});
