// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-switch-statement-runtime-semantics-evaluation
description: Creation of new lexical environment
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

var probe1, probe2, probe3, probe4;

switch (probe1 = function() { x; }) {
  default:
    probe2 = function() { return x; };
    let x = 'xInside';
}

assert.throws(ReferenceError, probe1);
assert.sameValue(probe2(), 'xInside');

switch (probe3 = function() { y; }, undefined) {
  case undefined:
    probe4 = function() { return y; };
    let y = 'yInside';
}

assert.throws(ReferenceError, probe3);
assert.sameValue(probe4(), 'yInside');
