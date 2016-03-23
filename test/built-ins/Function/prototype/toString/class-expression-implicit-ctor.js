// Copyright (C) 2016 Michael Ficarra. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-class-definitions-runtime-semantics-evaluation
description: Function.prototype.toString on a class expression (implicit constructor)
---*/

let A = {toString(){return "class /* a */ A /* b */ { /* c */ }";}};
let B = {toString(){return "class /* a */ B /* b */ extends /* c */ A /* d */ { /* e */ }";}};
let C = {toString(){return "class /* a */ C /* b */ extends /* c */ B /* d */ { /* e */ m /* f */ ( /* g */ ) /* h */ { /* i */ } /* j */ }";}};

assert.sameValue(A.toString(), "class /* a */ A /* b */ { /* c */ }");
assert.sameValue(B.toString(), "class /* a */ B /* b */ extends /* c */ A /* d */ { /* e */ }");
assert.sameValue(C.toString(), "class /* a */ C /* b */ extends /* c */ B /* d */ { /* e */ m /* f */ ( /* g */ ) /* h */ { /* i */ } /* j */ }");
