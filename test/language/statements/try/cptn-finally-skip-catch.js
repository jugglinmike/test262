// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.15.8
description: >
    Completion value from `finally` clause of a try..catch..finally statement
    (when `catch` block is not executed)
info: >
    TryStatement : try Block Catch Finally

    1. Let B be the result of evaluating Block.
    2. If B.[[type]] is throw, then
       [...]
    3. Else B.[[type]] is not throw, let C be B.
    4. Let F be the result of evaluating Finally.
    5. If F.[[type]] is normal, let F be C.
    6. If F.[[type]] is return, or F.[[type]] is throw, return Completion(F).
    7. If F.[[value]] is not empty, return NormalCompletion(F.[[value]]).
    8. Return Completion{[[type]]: F.[[type]], [[value]]: undefined,
       [[target]]: F.[[target]]}.
---*/

assert.sameValue(eval('1; try { } catch (err) { } finally { }'), undefined);
assert.sameValue(eval('1; try { 2; } catch (err) { 3; } finally { }'), 2);
assert.sameValue(
  eval('1; try { } catch (err) { 2; } finally { 3; }'), undefined
);
assert.sameValue(eval('1; try { 2; } catch (err) { 3; } finally { 4; }'), 2);
