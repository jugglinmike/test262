// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between "new" and NewExpression are
    allowed
es5id: 11.2.2_A1.1
---*/

assert.sameValue(new	Number == 0, true, '#1: new\\u0009Number == 0');

assert.sameValue(newNumber == 0, true, '#2: new\\u000BNumber == 0');  

assert.sameValue(newNumber == 0, true, '#3: new\\u000CNumber == 0');

assert.sameValue(new Number == 0, true, '#4: new\\u0020Number == 0');

assert.sameValue(new Number == 0, true, '#5: new\\u00A0Number == 0');

assert.sameValue(new
Number == 0, true, '#6: new\\u000ANumber == 0');  

assert.sameValue(newNumber == 0, true, '#7: new\\u000DNumber == 0');

assert.sameValue(new Number == 0, true, '#8: new\\u2028Number == 0');

assert.sameValue(new Number == 0, true, '#9: new\\u2029Number == 0');

assert.sameValue(new	  
  Number == 0, true, '#10: new\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029Number == 0');
