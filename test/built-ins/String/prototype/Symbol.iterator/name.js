// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 21.1.3.27
description: >
    The `name` property of this function is "[Symbol.iterator]".

    ES6 Section 17: Unless otherwise specified, the name property of a built-in
    Function object, if it exists, has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
includes: [propertyHelper.js]
features: [Symbol.iterator]
---*/

var fn = ''[Symbol.iterator];

assert.sameValue(fn.name, '[Symbol.iterator]');

verifyNotEnumerable(fn, 'name');
verifyNotWritable(fn, 'name');
verifyConfigurable(fn, 'name');
