// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between ShiftExpression and ">>" or
    between ">>" and AdditiveExpression are allowed
es5id: 11.7.2_A1
---*/

assert.sameValue(-4	>>	1, -2, '#1: -4\\u0009>>\\u00091 === -2');

assert.sameValue(-4>>1, -2, '#2: -4\\u000B>>\\u000B1 === -2');  

assert.sameValue(-4>>1, -2, '#3: -4\\u000C>>\\u000C1 === -2');

assert.sameValue(-4 >> 1, -2, '#4: -4\\u0020>>\\u00201 === -2');

assert.sameValue(-4 >> 1, -2, '#5: -4\\u00A0>>\\u00A01 === -2');

assert.sameValue(-4
>>
1, -2, '#6: -4\\u000A>>\\u000A1 === -2');  

assert.sameValue(-4>>1, -2, '#7: -4\\u000D>>\\u000D1 === -2');

assert.sameValue(-4 >> 1, -2, '#8: -4\\u2028>>\\u20281 === -2');

assert.sameValue(-4 >> 1, -2, '#9: -4\\u2029>>\\u20291 === -2');

assert.sameValue(-4	  
  >>	  
  1, -2, '#10: -4\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029>>\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291 === -2');
