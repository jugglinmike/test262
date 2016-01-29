// This file was procedurally generated from the following sources:
// - src/cases/spread/mult-err-expr-throws.hashes
// - src/cases/spread/error/member-expr.hashes
/*---
description: Spread operator following other arguments when evaluation throws (`new` operator)
es6id: 12.3.3.1
info: >
    MemberExpression : new MemberExpression Arguments
    
    1. Return EvaluateNew(MemberExpression, Arguments).
    
    12.3.3.1.1 Runtime Semantics: EvaluateNew
    
    6. If arguments is empty, let argList be an empty List.
    7. Else,
       a. Let argList be ArgumentListEvaluation of arguments.
       [...]

    12.3.6.1 Runtime Semantics: ArgumentListEvaluation
    
    ArgumentList : ArgumentList , ... AssignmentExpression
    
    1. Let precedingArgs be the result of evaluating ArgumentList.
    2. Let spreadRef be the result of evaluating AssignmentExpression.
    3. Let iterator be GetIterator(GetValue(spreadRef) ).
    4. ReturnIfAbrupt(iterator).
---*/


assert.throws(Test262Error, function() {
  new function() {}(0, ...function*() { throw new Test262Error(); }());
});
