// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-prepareforordinarycall
description: >
    Creation of new variable environment for the function parameters and body
    (as disinct from that for the function's BindingIdentifier)
info: |
    [...]
    8. Let localEnv be NewFunctionEnvironment(F, newTarget).
    9. Set the LexicalEnvironment of calleeContext to localEnv.
    10. Set the VariableEnvironment of calleeContext to localEnv.
    [...]
flags: [noStrict]
---*/

var name = 'outside';
var probe1 = function() { return name; };
var probe2;

var func = function name(
    // The initializer is intentionally omitted from the following
    // VariableStatement in order to demonstrate that a new binding is created
    // (and not simply re-used from the FunctionExpression's
    // BindingIdentifier).
    _ = (eval('var name;'), probe2 = function() { return name; })
  ) {
};

func();

assert.sameValue(probe1(), 'outside');
assert.sameValue(probe2(), undefined);
