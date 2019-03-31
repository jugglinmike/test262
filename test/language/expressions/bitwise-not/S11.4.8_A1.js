// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between "~" and UnaryExpression are
    allowed
es5id: 11.4.8_A1
---*/

assert.sameValue(~	0, -1, '#0: ~\\u00090 === -1');

assert.sameValue(~0, -1, '#2: ~\\u000B0 === -1');  

assert.sameValue(~0, -1, '#3: ~\\u000C0 === -1');

assert.sameValue(~ 0, -1, '#4: ~\\u0020 === -1');

assert.sameValue(~ 0, -1, '#5: ~\\u00A00 === -1');

assert.sameValue(~
0, -1, '#6: ~\\u000A0 === -1');  

assert.sameValue(~0, -1, '#7: ~\\u000D0 === -1');

assert.sameValue(~ 0, -1, '#8: ~\\u20280 === -1');

assert.sameValue(~ 0, -1, '#9: ~\\u20290 === -1');

assert.sameValue(~	  
  0, -1, '#10: ~\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20290 === -1');
