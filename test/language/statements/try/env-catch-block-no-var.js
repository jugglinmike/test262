// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-catchclauseevaluation
description: Retainment of existing variable environment for `catch` block
info: |
    [...]
    8. Let B be the result of evaluating Block.
    [...]
features: [let]
---*/

var probe;
var x = 1;

try {
  throw null;
} catch (_) {
  var x = 2;
  probe = function() { return x; };
}

assert.sameValue(x, 2);
assert.sameValue(probe(), 2);
