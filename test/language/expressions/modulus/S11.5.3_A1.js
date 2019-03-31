// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between MultiplicativeExpression and "%"
    or between "%" and UnaryExpression are allowed
es5id: 11.5.3_A1
---*/

assert.sameValue(1	%	1, 0, '#1: 1\\u0009%\\u00091 === 0');

assert.sameValue(1%1, 0, '#2: 1\\u000B%\\u000B1 === 0');  

assert.sameValue(1%1, 0, '#3: 1\\u000C%\\u000C1 === 0');

assert.sameValue(1 % 1, 0, '#4: 1\\u0020%\\u00201 === 0');

assert.sameValue(1 % 1, 0, '#5: 1\\u00A0%\\u00A01 === 0');

assert.sameValue(1
%
1, 0, '#6: 1\\u000A%\\u000A1 === 0');  

assert.sameValue(1%1, 0, '#7: 1\\u000D%\\u000D1 === 0');

assert.sameValue(1 % 1, 0, '#8: 1\\u2028%\\u20281 === 0');

assert.sameValue(1 % 1, 0, '#9: 1\\u2029%\\u20291 === 0');

assert.sameValue(1	  
  %	  
  1, 0, '#10: 1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029%\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291 === 0');
