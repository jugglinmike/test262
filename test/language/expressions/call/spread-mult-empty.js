// This file was procedurally generated from the following sources:
// - src/cases/spread/mult-empty.hashes
// - src/cases/spread/default/call-expr.hashes
/*---
description: Spread operator following other arguments when no iteration occurs (CallExpression)
es6id: 12.3.4.1
info: >
    12.3.6.1 Runtime Semantics: ArgumentListEvaluation
    
    ArgumentList : ArgumentList , ... AssignmentExpression
    
    1. Let precedingArgs be the result of evaluating ArgumentList.
    2. Let spreadRef be the result of evaluating AssignmentExpression.
    3. Let iterator be GetIterator(GetValue(spreadRef) ).
    4. ReturnIfAbrupt(iterator).
    5. Repeat
       a. Let next be IteratorStep(iterator).
       b. ReturnIfAbrupt(next).
       c. If next is false, return precedingArgs.

    CallExpression : MemberExpression Arguments
    
    [...]
    9. Return EvaluateDirectCall(func, thisValue, Arguments, tailCall).
    
    12.3.4.3 Runtime Semantics: EvaluateDirectCall
    
    1. Let argList be ArgumentListEvaluation(arguments).
    [...]
    6. Let result be Call(func, thisValue, argList).
    [...]
---*/


var callCount = 0;

(function() {
  assert.sameValue(arguments.length, 3);
  assert.sameValue(arguments[0], 1);
  assert.sameValue(arguments[1], 2);
  assert.sameValue(arguments[2], 3);
  callCount += 1;
}(1, 2, 3, ...[]));

assert.sameValue(callCount, 1);
