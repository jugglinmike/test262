// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between "!" and UnaryExpression are
    allowed
es5id: 11.4.9_A1
---*/

assert.sameValue(!	true, false, '#true: !\\u0009true === false');

assert.sameValue(!true, false, '#2: !\\u000Btrue === false');  

assert.sameValue(!true, false, '#3: !\\u000Ctrue === false');

assert.sameValue(! true, false, '#4: !\\u0020 === false');

assert.sameValue(! true, false, '#5: !\\u00A0true === false');

assert.sameValue(!
true, false, '#6: !\\u000Atrue === false');  

assert.sameValue(!true, false, '#7: !\\u000Dtrue === false');

assert.sameValue(! true, false, '#8: !\\u2028true === false');

assert.sameValue(! true, false, '#9: !\\u2029true === false');

assert.sameValue(!	  
  true, false, '#10: !\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true === false');
