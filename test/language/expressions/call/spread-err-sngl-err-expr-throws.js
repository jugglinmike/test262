// This file was procedurally generated from the following sources:
// - src/cases/spread/sngl-err-expr-throws.hashes
// - src/cases/spread/error/call-expr.hashes
/*---
description: Spread operator applied to the only argument when evaluation throws (CallExpression)
es6id: 12.3.4.1
info: >
    12.3.6.1 Runtime Semantics: ArgumentListEvaluation
    
    ArgumentList : ... AssignmentExpression
    
    1. Let list be an empty List.
    2. Let spreadRef be the result of evaluating AssignmentExpression.
    3. Let spreadObj be GetValue(spreadRef).
    4. Let iterator be GetIterator(spreadObj).
    5. ReturnIfAbrupt(iterator).

    CallExpression : MemberExpression Arguments
    
    [...]
    9. Return EvaluateDirectCall(func, thisValue, Arguments, tailCall).
    
    12.3.4.3 Runtime Semantics: EvaluateDirectCall
    
    1. Let argList be ArgumentListEvaluation(arguments).
    [...]
    6. Let result be Call(func, thisValue, argList).
    [...]
---*/


assert.throws(Test262Error, function() {
  (function() {}(...function*() { throw new Test262Error(); }()));
});
