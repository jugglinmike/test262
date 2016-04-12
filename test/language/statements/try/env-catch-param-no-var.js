// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-catchclauseevaluation
description: Retainment of existing variable environment for `catch` parameter
flags: [noStrict]
---*/

var probe;

try {
  var x = 1;
  throw [];
} catch ([_ = (eval('var x = 2;'), probe = function() { return x; })]) {}

assert.sameValue(x, 2);
assert.sameValue(probe(), 2);
