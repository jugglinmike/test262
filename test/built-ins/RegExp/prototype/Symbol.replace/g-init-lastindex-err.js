// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
     Behavior when error is thrown while initializing `lastIndex` property for
     "global" instances
es6id: 21.2.5.8
info: >
    21.2.5.8 RegExp.prototype [ @@replace ] ( string, replaceValue )

    [...]
    10. If global is true, then
        [...]
        c. Let setStatus be Set(rx, "lastIndex", 0, true).
        d. ReturnIfAbrupt(setStatus).
features: [Symbol.replace]
---*/

var r = /./g;

Object.defineProperty(r, 'lastIndex', { writable: false });

// Explicitly assert the method's presence to avoid false positives (i.e.
// TypeErrors thrown by invoking an undefined reference).
assert.sameValue(typeof r[Symbol.replace], 'function');

assert.throws(TypeError, function() {
  r[Symbol.replace]('aa', 'x');
});
