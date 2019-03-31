// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between LogicalANDExpression and "&&" or
    between "&&" and BitwiseORExpression are allowed
es5id: 11.11.1_A1
---*/

assert.sameValue(true	&&	true, true, '#1: (true\\u0009&&\\u0009true) === true');

assert.sameValue(true&&true, true, '#2: (true\\u000B&&\\u000Btrue) === true');  

assert.sameValue(true&&true, true, '#3: (true\\u000C&&\\u000Ctrue) === true');

assert.sameValue(true && true, true, '#4: (true\\u0020&&\\u0020true) === true');

assert.sameValue(true && true, true, '#5: (true\\u00A0&&\\u00A0true) === true');

assert.sameValue(true
&&
true, true, '#6: (true\\u000A&&\\u000Atrue) === true');  

assert.sameValue(true&&true, true, '#7: (true\\u000D&&\\u000Dtrue) === true');

assert.sameValue(true && true, true, '#8: (true\\u2028&&\\u2028true) === true');

assert.sameValue(true && true, true, '#9: (true\\u2029&&\\u2029true) === true');


assert.sameValue(true	  
  &&	  
  true, true, '#10: (true\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029&&\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true) === true');
