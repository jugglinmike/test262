// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-switch-statement-runtime-semantics-evaluation
description: Retainment of existing variable environment
info: |
    1. Let exprRef be the result of evaluating Expression.
    2. Let switchValue be ? GetValue(exprRef).
    3. Let oldEnv be the running execution context's LexicalEnvironment.
    4. Let blockEnv be NewDeclarativeEnvironment(oldEnv).
    5. Perform BlockDeclarationInstantiation(CaseBlock, blockEnv).
    6. Set the running execution context's LexicalEnvironment to blockEnv.
    7. Let R be the result of performing CaseBlockEvaluation of CaseBlock with
      argument switchValue.
    [...]
flags: [noStrict]
---*/

var probeX;

switch (eval('var x = 1;'), probeX = function() { return x; }) {
  default:
    var x = 2;
}

assert.sameValue(probeX(), 2);
assert.sameValue(x, 2);

var probeY;

switch (eval('var y = 1;'), probeY = function() { return y; }) {
  case eval('var y = 2;'):
}

assert.sameValue(probeY(), 2);
assert.sameValue(y, 2);
