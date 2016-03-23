// Copyright (C) 2016 Michael Ficarra. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-runtime-semantics-definemethod
description: Function.prototype.toString on a method (object)
---*/

let f = {toString(){return "f /* a */ ( /* b */ ) /* c */ { /* d */ }";}};
let g = {toString(){return '[ /* a */ "g" /* b */ ] /* c */ ( /* d */ ) /* e */ { /* f */ }';}};

assert.sameValue(f.toString(), "f /* a */ ( /* b */ ) /* c */ { /* d */ }");
assert.sameValue(g.toString(), "[ /* a */ \"g\" /* b */ ] /* c */ ( /* d */ ) /* e */ { /* f */ }");
