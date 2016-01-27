// This file was procedurally generated from the following sources:
// - src/cases/spread/sngl-err-expr-throws.hashes
// - src/cases/spread/error/super-call.hashes
/*---
description: Spread operator applied to the only argument when evaluation throws (SuperCall)
es6id: 12.3.5.1
info: >
    12.3.6.1 Runtime Semantics: ArgumentListEvaluation
    
    ArgumentList : ... AssignmentExpression
    
    1. Let list be an empty List.
    2. Let spreadRef be the result of evaluating AssignmentExpression.
    3. Let spreadObj be GetValue(spreadRef).
    4. Let iterator be GetIterator(spreadObj).
    5. ReturnIfAbrupt(iterator).

    SuperCall : super Arguments
    
    1. Let newTarget be GetNewTarget().
    2. If newTarget is undefined, throw a ReferenceError exception.
    3. Let func be GetSuperConstructor().
    4. ReturnIfAbrupt(func).
    5. Let argList be ArgumentListEvaluation of Arguments.
    [...]
---*/


class Test262ParentClass {
  constructor() {}
}

class Test262ChildClass extends Test262ParentClass {
  constructor() {
    super(...function*() { throw new Test262Error(); }());
  }
}

assert.throws(Test262Error, function() {
  new Test262ChildClass();
});
