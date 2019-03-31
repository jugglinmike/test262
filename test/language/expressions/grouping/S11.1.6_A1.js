// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: White Space and Line Terminator inside "grouping" operator are allowed
es5id: 11.1.6_A1
description: >
    Inserting WhiteSpaces and LineTerminators into grouping operator.
---*/

assert.sameValue((	1	), 1, '#1: (\\u00091\\u0009) === 1');

assert.sameValue((1), 1, '#2: (\\u000B1\\u000B) === 1');  

assert.sameValue((1), 1, '#3: (\\u000C1\\u000C) === 1');

assert.sameValue(( 1 ), 1, '#4: (\\u00201\\u0020 === 1');

assert.sameValue(( 1 ), 1, '#5: (\\u00A01\\u00A0) === 1');

assert.sameValue((
1
), 1, '#6: (\\u000A1\\u000A) === 1');  

assert.sameValue((1), 1, '#7: (\\u000D1\\u000D) === 1');

assert.sameValue(( 1 ), 1, '#8: (\\u20281\\u2028) === 1');

assert.sameValue(( 1 ), 1, '#9: (\\u20291\\u2029) === 1');

assert.sameValue((	  
  1	  
  ), 1, '#10: (\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029) === 1');
