// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.1.3.30
description: >
    The initial value of the @@iterator property is the same function object as
    the initial value of the Array.prototype.values property.
features: [Symbol.iterator]
---*/

assert.sameValue(String.prototype[Symbol.iterator], String.prototype.values);

verifyNotEnumerable(Array.prototype, Symbol.iterator);
verifyWritable(Array.prototype, Symbol.iterator);
verifyConfigurable(Array.prototype, Symbol.iterator);
