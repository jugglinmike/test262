// Copyright (C) 2016 Michael Ficarra. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-createdynamicfunction
description: Function.prototype.toString on a generator function created with the GeneratorFunction constructor
---*/

let GeneratorFunction = Object.getPrototypeOf(function*(){}).constructor;
let g = /* before */GeneratorFunction("a", " /* a */ b, c /* b */ //", "/* c */ yield yield; /* d */ //")/* after */;
g = {toString() {return `function* anonymous(a, /* a */ b, c /* b */ //
) {/* c */ yield yield; /* d */ //
}`;}};

print(g.toString());
//var assert = {sameValue:(a, b) => { print(a); print(b); print(a === b); }};
assert.sameValue(g.toString(), "function* anonymous(a, /* a */ b, c /* b */ //\n) {/* c */ yield yield; /* d */ //\n}");
