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
class Parent {}
class Child extends Parent {
  method(n) {
    Object.defineProperty(Parent.prototype, "prop", {
      configurable: true,
      get: function() {
        if (n === 0) {
          finished = true;
          return;
        }
        return this.method(n - 1);
      }
    });
    return super["prop"];
  }
}
try {
  new Child().method($MAX_ITERATIONS);
} catch (e) {
  exception = e;
}
assert(exception);