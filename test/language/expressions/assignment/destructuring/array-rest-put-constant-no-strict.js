// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The assignment target should obey `const` semantics outside of strict mode.
es6id: 12.14.5.3
features: [const]
flags: [noStrict]
---*/

var value = [1];
const c = null;
var result;

result = [ ...c ] = value;

assert.sameValue(result, value);
assert.sameValue(c, null);
