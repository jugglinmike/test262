// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 21.2.5.9
description: The `lastIndex` value is restored following match execution
info: >
    [...]
    11. Let status be Set(rx, "lastIndex", previousLastIndex, true).
    [...]
features: [Symbol.search]
---*/

var re = /./;
re.lastIndex = 86;

re[Symbol.search]();

assert.sameValue(re.lastIndex, 86);
