// This file was procedurally generated from the following sources:
// - src/cases/dstr-binding/ary-rest-not-final.hashes
// - src/cases/dstr-binding/default/let-stmt.hashes
/*---
description: Rest element followed by an invalid element (`let` statement)
es6id: 13.3.1.4
negative: SyntaxError
info: >
    13.3.3 Destructuring Binding Patterns
    ArrayBindingPattern[Yield] :
        [ Elisionopt BindingRestElement[?Yield]opt ]
        [ BindingElementList[?Yield] ]
        [ BindingElementList[?Yield] , Elisionopt BindingRestElement[?Yield]opt ]

    LexicalBinding : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let value be GetValue(rhs).
    3. ReturnIfAbrupt(value).
    4. Let env be the running execution context's LexicalEnvironment.
    5. Return the result of performing BindingInitialization for BindingPattern
       using value and env as the arguments.
---*/


let [...x, y] = [1, 2, 3];


