// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between EqualityExpression and "!==" or
    between "!==" and RelationalExpression are allowed
es5id: 11.9.5_A1
---*/

assert.sameValue(1	!==	1, false, '#1: 1\\u0009!==\\u00091');

assert.sameValue(1!==1, false, '#2: 1\\u000B!==\\u000B1');  

assert.sameValue(1!==1, false, '#3: 1\\u000C!==\\u000C1');

assert.sameValue(1 !== 1, false, '#4: 1\\u0020!==\\u00201');

assert.sameValue(1 !== 1, false, '#5: 1\\u00A0!==\\u00A01');

assert.sameValue(1
!==
1, false, '#6: 1\\u000A!==\\u000A1');  

assert.sameValue(1!==1, false, '#7: 1\\u000D!==\\u000D1');

assert.sameValue(1 !== 1, false, '#8: 1\\u2028!==\\u20281');

assert.sameValue(1 !== 1, false, '#9: 1\\u2029!==\\u20291');

assert.sameValue(1	  
  !==	  
  1, false, '#10: 1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029!==\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291');
