// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    (Work in progress)
es6id: 14.3.1
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
