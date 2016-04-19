// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-catchclauseevaluation
description: Retainment of existing variable environment for `catch` parameter
flags: [noStrict]
---*/

var probeBefore, probeInside;

try {
  var x = 1;
  probeBefore = function() { return x; };
  throw [];
} catch ([_ = (eval('var x = 2;'), probeInside = function() { return x; })]) {}

assert.sameValue(probeBefore(), 2, 'reference preceeding CatchClause');
assert.sameValue(probeInside(), 2, 'reference within CatchClause');
assert.sameValue(x, 2, 'reference following catchClause');
