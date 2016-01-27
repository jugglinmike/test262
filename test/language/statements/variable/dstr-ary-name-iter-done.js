// This file was procedurally generated from the following sources:
// - src/cases/dstr-binding/ary-name-iter-done.hashes
// - src/cases/dstr-binding/default/var-stmt.hashes
/*---
description: SingleNameBinding when value iteration was completed previously (`var` statement)
es6id: 13.3.2.4
info: >
    13.3.3.6 Runtime Semantics: IteratorBindingInitialization
    
    SingleNameBinding : BindingIdentifier Initializeropt
    
    [...]
    4. If iteratorRecord.[[done]] is false, then
       [...]
    5. If iteratorRecord.[[done]] is true, let v be undefined.
    [...]
    8. Return InitializeReferencedBinding(lhs, v).

    VariableDeclaration : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let rval be GetValue(rhs).
    3. ReturnIfAbrupt(rval).
    4. Return the result of performing BindingInitialization for
       BindingPattern passing rval and undefined as arguments.
---*/


var [_, x] = [];

assert.sameValue(x, undefined);
