// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The initial value of the @@iterator property is the same function object as
    the initial value of the `values` property.

    The method should exist on the Array prototype, and it should be writable
    and configurable, but not enumerable.
includes: [propertyHelper.js]
es6id: 23.2.3.11
features: [Symbol.iterator]
---*/

assert.sameValue(Set.prototype[Symbol.iterator], Set.prototype.values);

verifyNotEnumerable(Set.prototype, Symbol.iterator);
verifyWritable(Set.prototype, Symbol.iterator);
verifyConfigurable(Set.prototype, Symbol.iterator);
