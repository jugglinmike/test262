// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-catchclauseevaluation
description: Creation of new lexical environment for `catch` parameter
---*/

var probe;

try {
  var x = 'outside';
  
  throw ['inside'];
} catch ([x, _ = probe = function() { return x; }]) {}

assert.sameValue(x, 'outside');
assert.sameValue(probe(), 'inside');
