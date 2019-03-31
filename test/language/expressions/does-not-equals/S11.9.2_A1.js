// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between EqualityExpression and "!=" or
    between "!=" and RelationalExpression are allowed
es5id: 11.9.2_A1
---*/

assert.sameValue(true	!=	1, false, '#1: (true\\u0009!=\\u00091) === false');

assert.sameValue(true!=1, false, '#2: (true\\u000B!=\\u000B1) === false');  

assert.sameValue(true!=1, false, '#3: (true\\u000C!=\\u000C1) === false');

assert.sameValue(true != 1, false, '#4: (true\\u0020!=\\u00201) === false');

assert.sameValue(true != 1, false, '#5: (true\\u00A0!=\\u00A01) === false');

assert.sameValue(true
!=
1, false, '#6: (true\\u000A!=\\u000A1) === false');  

assert.sameValue(true!=1, false, '#7: (true\\u000D!=\\u000D1) === false');

assert.sameValue(true != 1, false, '#8: (true\\u2028!=\\u20281) === false');

assert.sameValue(true != 1, false, '#9: (true\\u2029!=\\u20291) === false');

assert.sameValue(true	  
  !=	  
  1, false, '#10: (true\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029!=\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === false');
