// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Replacement pattern does not match final code points
es6id: 21.2.5.8
info: >
    [...]
    18. Return the String formed by concatenating the code units of
        accumulatedResult with the substring of S consisting of the code units
        from nextSourcePosition (inclusive) up through the final code unit of S
        (inclusive).
features: [Symbol.replace]
---*/

assert.sameValue(/abc/[Symbol.replace]('abcd', 'X'), 'Xd');
assert.sameValue(/bc/[Symbol.replace]('abcd', 'X'), 'aXd');
assert.sameValue(/c/[Symbol.replace]('abcd', 'X'), 'abXd');
