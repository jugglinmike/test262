// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Behavior when error is thrown while type coercing `length` property of
    result
es6id: 21.2.5.8
info: >
    [...]
    13. Repeat, while done is false
        a. Let result be RegExpExec(rx, S).
        [...]
    16. Repeat, for each result in results,
        a. Let nCaptures be ToLength(Get(result, "length")).
        b. ReturnIfAbrupt(nCaptures).
features: [Symbol.match]
---*/

var r = /./;
var poisonedLength = {
  length: {
    valueOf: function() {
      throw new Test262Error();
    }
  }
};
r.exec = function() {
  return poisonedLength;
};

assert.throws(Test262Error, function() {
  r[Symbol.replace]('a', 'b');
});
