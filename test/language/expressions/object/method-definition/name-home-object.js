// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The HomeObject of Functions defined as methods is the Object prototype.
es6id: 14.3.8
features: [super]
---*/

try {
  Object.prototype.attr = {};
  var obj = { attr: null, method() { return super.attr; } };
  assert.sameValue(obj.method(), Object.prototype.attr);
} finally {
  delete Object.prototype.attr;
}
