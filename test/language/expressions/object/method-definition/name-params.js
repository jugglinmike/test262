// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Function defined as methods honor their declared formal parameters.
es6id: 14.3.8
---*/

var value1 = {};
var value2 = {};
var value3 = {};
var callCount = 0;
var obj = {
  method(a, b, c) {
    assert.sameValue(a, value1);
    assert.sameValue(b, value2);
    assert.sameValue(c, value3);
    callCount += 1;
  }
};

obj.method(value1, value2, value3);
assert.sameValue(callCount, 1);
