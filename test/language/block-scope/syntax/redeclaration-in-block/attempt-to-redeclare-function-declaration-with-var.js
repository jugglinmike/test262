// Copyright (C) 2011 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.3
description: >
    redeclaration within block:
    attempt to redeclare function declaration with var
negative:
  phase: early
  type: SyntaxError
---*/

throw "Test262: This statement should not be evaluated.";
{ function f() {} var f; }
