// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-functiondeclarationinstantiation
description: >
    Creation of new lexical environment for the function body (as disinct from
    that for the function's parameters and body)
info: |
    [...]
    26. If hasParameterExpressions is false, then
        [...]
    27. Else,
        a. NOTE A separate Environment Record is needed to ensure that closures
           created by expressions in the formal parameter list do not have
           visibility of declarations in the function body.
        b. Let varEnv be NewDeclarativeEnvironment(env).
        c. Let varEnvRec be varEnv's EnvironmentRecord.
        d. Set the VariableEnvironment of calleeContext to varEnv.
        e. Let instantiatedVarNames be a new empty List.
        [...]
features: [let]
---*/

var x = 'outside';
var probe1, probe2;

(function(_ = probe1 = function() { return x; }) {
  let x = 'inside';
  probe2 = function() { return x; };
}());

assert.sameValue(probe1(), 'outside');
assert.sameValue(probe2(), 'inside');
