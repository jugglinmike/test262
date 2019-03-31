// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between RelationalExpression and ">" or
    ">" and ShiftExpression are allowed
es5id: 11.8.2_A1
---*/

assert.sameValue(0	>	1, false, '#1: 0\\u0009>\\u00091) === false');

assert.sameValue(0>1, false, '#2: 0\\u000B>\\u000B1) === false');  

assert.sameValue(0>1, false, '#3: (0\\u000C>\\u000C1) === false');

assert.sameValue(0 > 1, false, '#4: (0\\u0020>\\u00201) === false');

assert.sameValue(0 > 1, false, '#5: (0\\u00A0>\\u00A01) === false');

assert.sameValue(0
>
1, false, '#6: (0\\u000A>\\u000A1) === false');  

assert.sameValue(0>1, false, '#7: (0\\u000D>\\u000D1) === false');

assert.sameValue(0 > 1, false, '#8: (0\\u2028>\\u20281) === false');

assert.sameValue(0 > 1, false, '#9: (0\\u2029>\\u20291) === false');

assert.sameValue(1	  
  >=	  
  1, true, '#10: (1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029>=\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === true');
