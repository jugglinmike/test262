// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.7.2.6
description: >
    Completion value when iteration completes due to a `break` statement
info: >
    IterationStatement : do Statement while ( Expression ) ;

    1. Let V = undefined.
    2. Repeat
       a. Let stmt be the result of evaluating Statement.
       b. If LoopContinues(stmt, labelSet) is false, return
          Completion(UpdateEmpty(stmt, V)).
---*/

assert.sameValue(eval('1; do { break; } while (false)'), undefined);
assert.sameValue(eval('1; do { 2; break; } while (false)'), 2);
