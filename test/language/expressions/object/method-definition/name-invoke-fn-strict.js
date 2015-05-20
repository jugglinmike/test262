// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    In the presence of the "use strict" directive, functions defined as methods
    obey "strict" ThisMode semantics.
es6id: 14.3.8
flags: [noStrict]
---*/

var method = { method() { 'use strict'; return this; } }.method;

assert.sameValue(method(), undefined);
