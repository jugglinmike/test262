// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between RelationalExpression and "<" or
    between "<" and ShiftExpression are allowed
es5id: 11.8.1_A1
---*/

assert.sameValue(0	<	1, true, '#1: (0\\u0009<\\u00091) === true');

assert.sameValue(0<1, true, '#2: (0\\u000B<\\u000B1) === true');  

assert.sameValue(0<1, true, '#3: (0\\u000C<\\u000C1) === true');

assert.sameValue(0 < 1, true, '#4: (0\\u0020<\\u00201) === true');

assert.sameValue(0 < 1, true, '#5: (0\\u00A0<\\u00A01) === true');

assert.sameValue(0
<
1, true, '#6: (0\\u000A<\\u000A1) === true');  

assert.sameValue(0<1, true, '#7: (0\\u000D<\\u000D1) === true');

assert.sameValue(0 < 1, true, '#8: (0\\u2028<\\u20281) === true');

assert.sameValue(0 < 1, true, '#9: (0\\u2029<\\u20291) === true');

assert.sameValue(0	  
  <	  
  1, true, '#10: (0\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029<\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === true');
