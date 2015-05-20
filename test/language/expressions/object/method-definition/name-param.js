// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    (Work in progress)
es6id: 14.3.1
flags: [noStrict]
includes: [propertyHelper.js]
---*/

// ## 14.3.1 Static Semantics: Early Errors
//
// MethodDefinition : PropertyName ( StrictFormalParameters ) { FunctionBody }
//
// - It is a Syntax Error if any element of the BoundNames of
//   StrictFormalParameters also occurs in the LexicallyDeclaredNames of
//   FunctionBody.

// ## 14.3.9 Runtime Semantics: PropertyDefinitionEvaluation
//
// MethodDefinition : PropertyName ( StrictFormalParameters ) { FunctionBody }
//
//   1. Let methodDef be DefineMethod of MethodDefinition with argument object.
//   2. ReturnIfAbrupt(methodDef).
//   3. Perform SetFunctionName(methodDef.[[closure]], methodDef.[[key]]).
//   4. Let desc be the Property Descriptor{[[Value]]: methodDef.[[closure]],
//      [[Writable]]: true, [[Enumerable]]: enumerable, [[Configurable]]:
//      true}.
//   5. Return DefinePropertyOrThrow(object, methodDef.[[key]], desc).
//

// step 1

  // ## 14.3.8 Runtime Semantics: DefineMethod
  // ...
  // 5. If functionPrototype was passed as a parameter, let kind be Normal;
  //    otherwise let kind be Method.

var obj = { method() {} };
assert.throws(TypeError, function() {
  new obj.method();
});

  // 6. Let closure be FunctionCreate(kind, StrictFormalParameters,
  //    FunctionBody, scope, strict). If functionPrototype was passed as a
  //    parameter then pass its value as the functionPrototype optional
  //    argument of FunctionCreate.
  // ...


    // ## 9.2.3 FunctionAllocate (functionPrototype, strict [,functionKind] )
    // ...
    // 6. Let F be a newly created ECMAScript function object with the internal
    //    slots listed in Table 27. All of those internal slots are initialized
    //    to undefined.

var value = {};
var callCount = 0;
var obj = {
  method(param) {
    assert.sameValue(param, value);
    callCount += 1;
  }
};
obj.method(value);
assert.sameValue(callCount, 1);

var obj = { method() {} };
assert.sameValue(Object.getPrototypeOf(obj.method), Function.prototype);

    // ## 9.2.4 FunctionInitialize (F, kind, ParameterList, Body, Scope)
    // ...
    // 3. Let status be DefinePropertyOrThrow(F, "length",
    //   PropertyDescriptor{[[Value]]: len, [[Writable]]: false,
    //   [[Enumerable]]: false, [[Configurable]]: true}).

// includes: [propertyHelper.js]
var method = { method(a, b, c) {} }.method;
assert.sameValue(method.length, 3);
verifyNotEnumerable(method, 'length');
verifyNotWritable(method, 'length');
verifyConfigurable(method, 'length');

    // 10. Else if Strict is true, set the [[ThisMode]] internal slot of F to
    //     strict.

// flags: [noStrict]
var method = { method() { 'use strict'; return this; } }.method;
assert.sameValue(method(), undefined);

    // 11. Else set the [[ThisMode]] internal slot of F to global.

// flags: [noStrict]
var global = (function() { return this; }());
var method = { method() { return this; } }.method;
assert.sameValue(method(), global);

  // 7. Perform MakeMethod(closure, object).
// Should this use Object.setPrototypeOf instead?
try {
  Object.prototype.attr = {};
  var obj = { attr: null, method() { return super.attr; } };
  assert.sameValue(obj.method(), Object.prototype.attr);
} finally {
  delete Object.prototype.attr;
}

// step 2
assert.throws(Test262Error, function() {
  ({ [(function() { throw new Test262Error(); }())]() {} });
});

// step 3
// includes: [propertyHelper.js]
var method = { method() {} }.method;
assert.sameValue(method.name, 'method');
verifyNotEnumerable(method, 'name');
verifyNotWritable(method, 'name');
verifyConfigurable(method, 'name');

// steps 4 & 5 (I don't think it's possible to get it to throw here)
// includes: [propertyHelper.js]
var obj = { method() {} };
verifyEnumerable(obj, 'method');
verifyWritable(obj, 'method');
verifyConfigurable(obj, 'method');

// ## 14.4.1 Static Semantics: Early Errors
//
// GeneratorMethod : * PropertyName ( StrictFormalParameters ) { GeneratorBody }
//
// - It is a Syntax Error if HasDirectSuper of GeneratorMethod is true .
// - It is a Syntax Error if any element of the BoundNames of
//   StrictFormalParameters also occurs in the LexicallyDeclaredNames of
//   GeneratorBody.

// ## 14.4.13 Runtime Semantics: PropertyDefinitionEvaluation
//
// GeneratorMethod : * PropertyName ( StrictFormalParameters ) { GeneratorBody }
//
//   1. Let propKey be the result of evaluating PropertyName.
//   2. ReturnIfAbrupt(propKey).
//   3. If the function code for this GeneratorMethod is strict mode code, let
//      strict be true. Otherwise let strict be false.
//   4. Let scope be the running execution context’s LexicalEnvironment.
//   5. Let closure be GeneratorFunctionCreate(Method, StrictFormalParameters,
//      GeneratorBody, scope, strict).
//   6. Perform MakeMethod(closure, object).
//   7. Let prototype be ObjectCreate(%GeneratorPrototype%).
//   8. Perform MakeConstructor(closure, true, prototype).
//   9. Perform SetFunctionName(closure, propKey).
//   10. Let desc be the Property Descriptor{[[Value]]: closure, [[Writable]]:
//       true, [[Enumerable]]: enumerable, [[Configurable]]: true}.
//   11. Return DefinePropertyOrThrow(object, propKey, desc).
