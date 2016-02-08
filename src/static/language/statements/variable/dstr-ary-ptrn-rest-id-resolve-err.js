// Copyright (C) Copyright 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Abrupt completion during identifier resolution (`var` statement)
es6id: 13.3.2.4
info: >
    VariableDeclaration : BindingPattern Initializer

    1. Let rhs be the result of evaluating Initializer.
    2. Let rval be GetValue(rhs).
    3. ReturnIfAbrupt(rval).
    4. Return the result of performing BindingInitialization for
       BindingPattern passing rval and undefined as arguments.

    13.3.3.6 Runtime Semantics: IteratorBindingInitialization

    BindingRestElement : ... BindingIdentifier

    1. Let lhs be ResolveBinding(StringValue of BindingIdentifier,
       environment).
    2. ReturnIfAbrupt(lhs).

    8.3.1 ResolveBinding ( name, [env] )

    [...]
    4. Return GetIdentifierReference(env, name, strict ).

    8.1.2.1 GetIdentifierReference (lex, name, strict)

    [...]
    2. Let envRec be lex’s EnvironmentRecord.
    3. Let exists be envRec.HasBinding(name).
    4. ReturnIfAbrupt(exists).

    8.1.1.2.1 HasBinding(N)

    [...]
    2. Let bindings be the binding object for envRec.
    [...]
    7. Let unscopables be Get(bindings, @@unscopables).
    8. ReturnIfAbrupt(unscopables).
flags: [noStrict]
features: [Symbol.unscopables]
---*/

var objEnvRec = { x: true };
Object.defineProperty(objEnvRec, Symbol.unscopables, {
  get: function() {
    throw new Test262Error();
  }
});

assert.throws(Test262Error, function() {
  with (objEnvRec) {
    var [...x] = [];
  }
});
