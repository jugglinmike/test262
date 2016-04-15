// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-prepareforordinarycall
description: Disposal of variable environment for the function body
info: |
    [...]
    8. Let localEnv be NewFunctionEnvironment(F, newTarget).
    9. Set the LexicalEnvironment of calleeContext to localEnv.
    10. Set the VariableEnvironment of calleeContext to localEnv.
    [...]
---*/

var probe;

(function() {
  var x = 'inside';
  probe = function() { return x; };
}());

var x = 'outside';

assert.sameValue(probe(), 'inside');
assert.sameValue(x, 'outside');
