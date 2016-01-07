// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.7
description: Completion value when expression is false with an `else` clause
info: >
    IfStatement : if ( Expression ) Statement else Statement

    4. If exprValue is true, then
       [...]
    5. Else,
       a. Let stmtCompletion be the result of evaluating the second Statement.
    6. ReturnIfAbrupt(stmtCompletion).
    7. If stmtCompletion.[[value]] is not empty, return stmtCompletion.
    8. Return NormalCompletion(undefined).
---*/

assert.sameValue(eval('1; if (false) { } else { }'), undefined);
assert.sameValue(eval('1; if (false) { 2; } else { 3; }'), 3);
