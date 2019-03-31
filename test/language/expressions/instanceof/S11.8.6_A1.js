// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between RelationalExpression and
    "instanceof" and between "instanceof" and ShiftExpression are allowed
es5id: 11.8.6_A1
---*/

assert.sameValue({}	instanceof	Object, true, '#1: ({})\\u0009instanceof\\u0009Object === true');

assert.sameValue({}instanceofObject, true, '#2: ({})\\u000Binstanceof\\u000BObject === true');  

assert.sameValue({}instanceofObject, true, '#3: ({})\\u000Cinstanceof\\u000CObject === true');

assert.sameValue({} instanceof Object, true, '#4: ({})\\u0020instanceof\\u0020Object === true');

assert.sameValue({} instanceof Object, true, '#5: ({})\\u00A0instanceof\\u00A0Object === true');

assert.sameValue({}
instanceof
Object, true, '#6: ({})\\u000Ainstanceof\\u000AObject === true');  

assert.sameValue({}instanceofObject, true, '#7: ({})\\u000Dinstanceof\\u000DObject === true');

assert.sameValue({} instanceof Object, true, '#8: ({})\\u2028instanceof\\u2028Object === true');

assert.sameValue({} instanceof Object, true, '#9: ({})\\u2029instanceof\\u2029Object === true');

assert.sameValue({}	  
  instanceof	  
  Object, true, '#10: ({})\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029instanceof\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029Object === true');
