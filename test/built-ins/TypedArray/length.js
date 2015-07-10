// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.2
description: length property of TypedArray
info: >
    TypedArray has a "length" property whose value is 3.

    ES6 section 17: Unless otherwise specified, the length property of a
    built-in Function object has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

var TypedArray = Object.getPrototypeOf(Int8Array);

assert.sameValue(TypedArray.length, 3);

verifyNotEnumerable(TypedArray, 'length');
verifyNotWritable(TypedArray, 'length');
verifyConfigurable(TypedArray, 'length');
