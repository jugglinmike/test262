// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between "typeof" and UnaryExpression are
    allowed
es5id: 11.4.3_A1
es6id: 12.5.6.1
---*/

var x = 0;

assert.sameValue(
  typeof	x,
  "number",
  '#1: typeof\\u0009x; x === "number".'
);

assert.sameValue(
  typeofx,
  "number",
  '#2: typeof\\u000Bx; x === "number".'
);

assert.sameValue(
  typeofx,
  "number",
  '#3: typeof\\u000Cx; x === "number".'
);

assert.sameValue(
  typeof x,
  "number",
  '#4: typeof\\u0020x; x === "number".'
);

assert.sameValue(
  typeof x,
  "number",
  '#5: typeof\\u00A0x; x === "number".'
);

assert.sameValue(
  typeof
x,
  "number",
  '#6: typeof\\u000Ax; x === "number".'
);

assert.sameValue(
  typeofx,
  "number",
  '#7: typeof\\u000Dx; x === "number".'
);

assert.sameValue(
  typeof x,
  "number",
  '#8: typeof\\u2028x; x === "number".'
);

assert.sameValue(
  typeof x,
  "number",
  '#9: typeof\\u2029x; x === "number".'
);

assert.sameValue(
  typeof	  
  x,
  "number",
  '#10: typeof\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029x; x === "number".'
);

assert.sameValue(
  typeof(0),
  "number",
  'applied with grouping operator enclosing operand'
);
