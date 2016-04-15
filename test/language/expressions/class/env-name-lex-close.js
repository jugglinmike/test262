// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-classdefinitionevaluation
description: Disposal of lexical environment for class "name"
info: |
    [...]
    22. Set the running execution context's LexicalEnvironment to lex.
    [...]
---*/

var C = 'outside';

var cls = (class C {
  method() {
    return C;
  }
});

assert.sameValue(cls.prototype.method(), cls, 'from instance method');
assert.sameValue(C, 'outside');
