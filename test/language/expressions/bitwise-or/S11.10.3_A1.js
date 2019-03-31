// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between BitwiseORExpression and "|" or
    between "|" and BitwiseXORExpression are allowed
es5id: 11.10.3_A1
---*/

assert.sameValue(0	|	1, 1, '#1: (0\\u0009|\\u00091) === 1');

assert.sameValue(0|1, 1, '#2: (0\\u000B|\\u000B1) === 1');  

assert.sameValue(0|1, 1, '#3: (0\\u000C|\\u000C1) === 1');

assert.sameValue(0 | 1, 1, '#4: (0\\u0020|\\u00201) === 1');

assert.sameValue(0 | 1, 1, '#5: (0\\u00A0|\\u00A01) === 1');

assert.sameValue(0
|
1, 1, '#6: (0\\u000A|\\u000A1) === 1');  

assert.sameValue(0|1, 1, '#7: (0\\u000D|\\u000D1) === 1');

assert.sameValue(0 | 1, 1, '#8: (0\\u2028|\\u20281) === 1');

assert.sameValue(0 | 1, 1, '#9: (0\\u2029|\\u20291) === 1');


assert.sameValue(0	  
  |	  
  1, 1, '#10: (0\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029|\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === 1');
