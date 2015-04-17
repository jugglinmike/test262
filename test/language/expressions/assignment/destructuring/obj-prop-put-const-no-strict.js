// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The assignment target should obey `const` semantics outside of strict mode.
es6id: 12.14.5.4
flags: [noStrict]
features: [const]
---*/

var value = { a: 2 };
var result;
const c = 1;

result = { a: c } = value;
assert.sameValue(result, value);
assert.sameValue(c, 1);
