// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between RelationalExpression and "<=" or
    between "<=" and ShiftExpression are allowed
es5id: 11.8.3_A1
---*/

assert.sameValue(1	<=	1, true, '#1: (1\\u0009<=\\u00091) === true');

assert.sameValue(1<=1, true, '#2: (1\\u000B<=\\u000B1) === true');  

assert.sameValue(1<=1, true, '#3: (1\\u000C<=\\u000C1) === true');

assert.sameValue(1 <= 1, true, '#4: (1\\u0020<=\\u00201) === true');

assert.sameValue(1 <= 1, true, '#5: (1\\u00A0<=\\u00A01) === true');

assert.sameValue(1
<=
1, true, '#6: (1\\u000A<=\\u000A1) === true');  

assert.sameValue(1<=1, true, '#7: (1\\u000D<=\\u000D1) === true');

assert.sameValue(1 <= 1, true, '#8: (1\\u2028<=\\u20281) === true');

assert.sameValue(1 <= 1, true, '#9: (1\\u2029<=\\u20291) === true');

assert.sameValue(1	  
  >	  
  0, true, '#10: (1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029>\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20290) === true');
