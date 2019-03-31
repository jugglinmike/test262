// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between "void" and UnaryExpression are
    allowed
es5id: 11.4.2_A1
---*/

assert.sameValue(void	0, undefined, '#1: void\\u00090 === undefined');

assert.sameValue(void0, undefined, '#2: void\\u000B0 === undefined');  

assert.sameValue(void0, undefined, '#3: void\\u000C0 === undefined');

assert.sameValue(void 0, undefined, '#4: void\\u00200 === undefined');

assert.sameValue(void 0, undefined, '#5: void\\u00A00 === undefined');

assert.sameValue(void
0, undefined, '#6: void\\u000A0 === undefined');  

assert.sameValue(void0, undefined, '#7: void\\u000D0 === undefined');

assert.sameValue(void 0, undefined, '#8: void\\u20280 === undefined');

assert.sameValue(void 0, undefined, '#9: void\\u20290 === undefined');

assert.sameValue(void	  
  0, undefined, '#10: void\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20290 === undefined');
