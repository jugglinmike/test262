// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-switch-statement-runtime-semantics-evaluation
description: Disposal of lexical environment
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
features: [let]
flags: [noStrict]
---*/

var probeX, probeY;

switch (null) {
  default:
    let x = 'xInside';
    probeX = function() { return x; };
}

assert.sameValue(probeX(), 'xInside');
assert.throws(ReferenceError, function() {
  x;
});

switch (null) {
  case null:
    let y = 'yInside';
    probeY = function() { return y; };
}

assert.sameValue(probeY(), 'yInside');
assert.throws(ReferenceError, function() {
  y;
});
