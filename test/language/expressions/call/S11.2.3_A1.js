// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between MemberExpression and Arguments
    are allowed
es5id: 11.2.3_A1
---*/

assert.sameValue(Number	(), 0, '#1: Number\\u0009() === 0');

assert.sameValue(Number(), 0, '#2: Number\\u000B() === 0');  

assert.sameValue(Number(), 0, '#3: Number\\u000C() === 0');

assert.sameValue(Number (), 0, '#4: Number\\u0020 === 0');

assert.sameValue(Number (), 0, '#5: Number\\u00A0() === 0');

assert.sameValue(Number
(), 0, '#6: Number\\u000A() === 0');  

assert.sameValue(Number(), 0, '#7: Number\\u000D() === 0');

assert.sameValue(Number (), 0, '#8: Number\\u2028() === 0');

assert.sameValue(Number (), 0, '#9: Number\\u2029() === 0');

assert.sameValue(Number	  
  (), 0, '#10: Number\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029() === 0');
