// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-generator-function-definitions-runtime-semantics-evaluation
description: >
    Creation of new variable environment for the BindingIdentifier
    parameter
info: |
    [...]
    2. Let scope be the running execution context's LexicalEnvironment.
    3. Let funcEnv be NewDeclarativeEnvironment(scope).
    4. Let envRec be funcEnv's EnvironmentRecord.
    5. Let name be StringValue of BindingIdentifier.
    6. Perform envRec.CreateImmutableBinding(name, false).
    7. Let closure be GeneratorFunctionCreate(Normal, FormalParameters,
       GeneratorBody, funcEnv, strict).
    [...]
---*/

var g = 'outside';
var probeBefore = function() { return g; };
var probeParam;

var func = function* g(_ = probeParam = function() { return g; }) {
  return 'inside';
};

func().next();

assert.sameValue(probeBefore(), 'outside');
assert.sameValue(probeParam(), func);
