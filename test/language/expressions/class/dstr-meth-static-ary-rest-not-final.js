// This file was procedurally generated from the following sources:
// - src/cases/dstr-binding/ary-rest-not-final.hashes
// - src/cases/dstr-binding/default/cls-expr-meth-static.hashes
/*---
description: Rest element followed by an invalid element (static class expression method)
es6id: 14.5.16
negative: SyntaxError
info: >
    13.3.3 Destructuring Binding Patterns
    ArrayBindingPattern[Yield] :
        [ Elisionopt BindingRestElement[?Yield]opt ]
        [ BindingElementList[?Yield] ]
        [ BindingElementList[?Yield] , Elisionopt BindingRestElement[?Yield]opt ]

    ClassExpression : class BindingIdentifieropt ClassTail
    
    1. If BindingIdentifieropt is not present, let className be undefined.
    2. Else, let className be StringValue of BindingIdentifier.
    3. Let value be the result of ClassDefinitionEvaluation of ClassTail
       with argument className.
    [...]
    
    14.5.14 Runtime Semantics: ClassDefinitionEvaluation
    
    21. For each ClassElement m in order from methods
        a. If IsStatic of m is false, then
        b. Else,
           Let status be the result of performing PropertyDefinitionEvaluation for
           m with arguments F and false.
    [...]
    
    14.3.8 Runtime Semantics: DefineMethod
    
    MethodDefinition : PropertyName ( StrictFormalParameters ) { FunctionBody }
    
    [...]
    6. Let closure be FunctionCreate(kind, StrictFormalParameters, FunctionBody,
       scope, strict). If functionPrototype was passed as a parameter then pass its
       value as the functionPrototype optional argument of FunctionCreate.
    [...]
    
    9.2.1 [[Call]] ( thisArgument, argumentsList)
    
    [...]
    7. Let result be OrdinaryCallEvaluateBody(F, argumentsList).
    [...]
    
    9.2.1.3 OrdinaryCallEvaluateBody ( F, argumentsList )
    
    1. Let status be FunctionDeclarationInstantiation(F, argumentsList).
    [...]
    
    9.2.12 FunctionDeclarationInstantiation(func, argumentsList)
    
    [...]
    23. Let iteratorRecord be Record {[[iterator]]:
        CreateListIterator(argumentsList), [[done]]: false}.
    24. If hasDuplicates is true, then
        [...]
    25. Else,
        b. Let formalStatus be IteratorBindingInitialization for formals with
           iteratorRecord and env as arguments.
    [...]
---*/


var callCount = 0;
var C = class {
  static method([...x, y]) {
    
    callCount = callCount + 1;
  }
};

C.method([1, 2, 3]);
assert.sameValue(callCount, 1);
