// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between MultiplicativeExpression and "/"
    or between "/" and UnaryExpression are allowed
es5id: 11.5.2_A1
---*/

assert.sameValue(1	/	1, 1, '#1: 1\\u0009/\\u00091 === 1');

assert.sameValue(1/1, 1, '#2: 1\\u000B/\\u000B1 === 1');  

assert.sameValue(1/1, 1, '#3: 1\\u000C/\\u000C1 === 1');

assert.sameValue(1 / 1, 1, '#4: 1\\u0020/\\u00201 === 1');

assert.sameValue(1 / 1, 1, '#5: 1\\u00A0/\\u00A01 === 1');

assert.sameValue(1
/
1, 1, '#6: 1\\u000A/\\u000A1 === 1');  

assert.sameValue(1/1, 1, '#7: 1\\u000D/\\u000D1 === 1');

assert.sameValue(1 / 1, 1, '#8: 1\\u2028/\\u20281 === 1');

assert.sameValue(1 / 1, 1, '#9: 1\\u2029/\\u20291 === 1');

assert.sameValue(1	  
  /	  
  1, 1, '#10: 1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029/\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291 === 1');
