// This file was procedurally generated from the following sources:
// - src/cases/spread/sngl-iter.hashes
// - src/cases/spread/default/call-expr.hashes
/*---
description: Spread operator applied to the only argument with a valid iterator (CallExpression)
es6id: 12.3.4.1
features: [Symbol.iterator]

info: >
    12.3.6.1 Runtime Semantics: ArgumentListEvaluation
    
    ArgumentList : ... AssignmentExpression
    
    1. Let list be an empty List.
    2. Let spreadRef be the result of evaluating AssignmentExpression.
    3. Let spreadObj be GetValue(spreadRef).
    4. Let iterator be GetIterator(spreadObj).
    5. ReturnIfAbrupt(iterator).
    6. Repeat
       a. Let next be IteratorStep(iterator).
       b. ReturnIfAbrupt(next).
       c. If next is false, return list.
       d. Let nextArg be IteratorValue(next).
       e. ReturnIfAbrupt(nextArg).
       f. Append nextArg as the last element of list.

    CallExpression : MemberExpression Arguments
    
    [...]
    9. Return EvaluateDirectCall(func, thisValue, Arguments, tailCall).
    
    12.3.4.3 Runtime Semantics: EvaluateDirectCall
    
    1. Let argList be ArgumentListEvaluation(arguments).
    [...]
    6. Let result be Call(func, thisValue, argList).
    [...]
---*/
var iter = {};
iter[Symbol.iterator] = function() {
  var callCount = 0;
  return {
    next: function() {
      callCount += 1;
      return { done: callCount === 3, value: callCount };
    }
  };
};


var callCount = 0;

(function() {
  assert.sameValue(arguments.length, 2);
  assert.sameValue(arguments[0], 1);
  assert.sameValue(arguments[1], 2);
  callCount += 1;
}(...iter));

assert.sameValue(callCount, 1);
