// This file was procedurally generated from the following sources:
// - src/cases/dstr-binding/ary-name-iter-done.hashes
// - src/cases/dstr-binding/default/const-stmt.hashes
/*---
description: SingleNameBinding when value iteration was completed previously (`const` statement)
es6id: 13.3.1.4
info: >
    LexicalBinding : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let value be GetValue(rhs).
    3. ReturnIfAbrupt(value).
    4. Let env be the running execution context's LexicalEnvironment.
    5. Return the result of performing BindingInitialization for BindingPattern
       using value and env as the arguments.

    13.3.3.6 Runtime Semantics: IteratorBindingInitialization
    
    SingleNameBinding : BindingIdentifier Initializeropt
    
    [...]
    4. If iteratorRecord.[[done]] is false, then
       [...]
    5. If iteratorRecord.[[done]] is true, let v be undefined.
    [...]
    8. Return InitializeReferencedBinding(lhs, v).
---*/


const [_, x] = [];

assert.sameValue(x, undefined);
