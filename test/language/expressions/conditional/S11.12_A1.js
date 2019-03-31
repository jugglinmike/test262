// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between LogicalORExpression and "?" or
    between "?" and AssignmentExpression or between AssignmentExpression and
    ":" or between ":" and AssignmentExpression are allowed
es5id: 11.12_A1
---*/

assert.sameValue(false	?	true	:	true, true, '#1: (false\\u0009?\\u0009true\\u0009:\\u0009true) === true');

assert.sameValue(false?true:true, true, '#2: (false\\u000B?\\u000Btrue\\u000B:\\u000Btrue) === true');

assert.sameValue(false?true:true, true, '#3: (false\\u000C?\\u000Ctrue\\u000C:\\u000Ctrue) === true');

assert.sameValue(false ? true : true, true, '#4: (false\\u0020?\\u0020true\\u0020:\\u0020true) === true');

assert.sameValue(false ? true : true, true, '#5: (false\\u00A0?\\u00A0true\\u00A0:\\u00A0true) === true');

assert.sameValue(false
?
true
:
true, true, '#6: (false\\u000A?\\u000Atrue\\u000A:\\u000Atrue) === true');

assert.sameValue(false?true:true, true, '#7: (false\\u000D?\\u000Dtrue\\u000D:\\u000Dtrue) === true');

assert.sameValue(false ? true : true, true, '#8: (false\\u2028?\\u2028true\\u2028:\\u2028true) === true');

assert.sameValue(false ? true : true, true, '#9: (false\\u2029?\\u2029true\\u2029:\\u2029true) === true');

assert.sameValue(false	  
  ?	  
  true	  
  :	  
  true, true, '#10: (false\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029?\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029:\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true) === true');
