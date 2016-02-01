// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Expression is not a candidate for tail-call optimization.
id: static-semantics-hasproductionintailposition
flags: [noStrict]
features: [tail-call-optimization]
includes: [tco-helper.js]
---*/

var o = {};
var exception;
try {
  with (o) {
    (function() {
      "use strict";
      var oneless;
      Object.defineProperty(o, "prop", {
        get: function() {
          f(oneless);
        }
      });
      function f(n) {
        if (n === 0) {
          finished = true;
          return;
        }
        oneless = n - 1;
        return prop;
      }
      f(100000);
    }());
  }
} catch (e) {
  exception = e
}
assert(exception);