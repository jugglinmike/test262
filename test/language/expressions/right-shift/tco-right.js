// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Expression is not a candidate for tail-call optimization.
id: static-semantics-hasproductionintailposition
flags: [onlyStrict]
features: [tail-call-optimization]
includes: [tco-helper.js]
---*/

var exception;
try {
  (function f(n) {
    if (n === 0) {
      return;
    }
    return 0 >> f(n - 1);
  }($MAX_ITERATIONS));
} catch (e) {
  exception = e;
}
assert(exception);
