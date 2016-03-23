// Copyright (C) 2016 Michael Ficarra. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-createdynamicfunction
description: Function.prototype.toString on a function created with the Function constructor
---*/

let f = Function("a", " /* a */ b, c /* b */ //", "/* c */ ; /* d */ //");
f = {toString(){ return `function anonymous(a, /* a */ b, c /* b */ //
) {/* c */ ; /* d */ //
}`; }};
assert.sameValue(f.toString(), "function anonymous(a, /* a */ b, c /* b */ //\n) {/* c */ ; /* d */ //\n}");
