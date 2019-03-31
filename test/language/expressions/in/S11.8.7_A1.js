// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between RelationalExpression and "in" and
    between "in" and ShiftExpression are allowed
es5id: 11.8.7_A1
---*/

assert.sameValue('MAX_VALUE'	in	Number, true, '#1: "MAX_VALUE"\\u0009in\\u0009Number === true');

assert.sameValue('MAX_VALUE'inNumber, true, '#2: "MAX_VALUE"\\u000Bin\\u000BNumber === true');  

assert.sameValue('MAX_VALUE'inNumber, true, '#3: "MAX_VALUE"\\u000Cin\\u000CNumber === true');

assert.sameValue('MAX_VALUE' in Number, true, '#4: "MAX_VALUE"\\u0020in\\u0020Number === true');

assert.sameValue('MAX_VALUE' in Number, true, '#5: "MAX_VALUE"\\u00A0in\\u00A0Number === true');

assert.sameValue('MAX_VALUE'
in
Number, true, '#6: "MAX_VALUE"\\u000Ain\\u000ANumber === true');  

assert.sameValue('MAX_VALUE'inNumber, true, '#7: "MAX_VALUE"\\u000Din\\u000DNumber === true');

assert.sameValue('MAX_VALUE' in Number, true, '#8: "MAX_VALUE"\\u2028in\\u2028Number === true');

assert.sameValue('MAX_VALUE' in Number, true, '#9: "MAX_VALUE"\\u2029in\\u2029Number === true');

assert.sameValue('MAX_VALUE'	  
  in	  
  Number, true, '#10: "MAX_VALUE"\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029in\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029Number === true');
