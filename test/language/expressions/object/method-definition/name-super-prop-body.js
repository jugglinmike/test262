// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The body of a function declared as a method may contain SuperProperty
    expressions.
es6id: 12.2.5.1
---*/

var val = {};
var obj;

try {
  Object.prototype.Test262Attr = val;
  obj = {
    method() {
      return super.Test262Attr;
    }
  };

  assert.sameValue(obj.method(), val);
} finally {
  delete Object.prototype.Test262Attr;
}
