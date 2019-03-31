// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between MemberExpression or
    CallExpression and "." and between "." and Identifier are allowed
es5id: 11.2.1_A1.1
---*/

assert.sameValue(Number	.	POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#1: Number\\u0009.\\u0009POSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#2: Number\\u000B.\\u000BPOSITIVE_INFINITY === Number.POSITIVE_INFINITY');  

assert.sameValue(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#3: Number\\u000C.\\u000CPOSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number . POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#4: Number\\u0020.\\u0020POSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number . POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#5: Number\\u00A0.\\u00A0POSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number
.
POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#6: Number\\u000A.\\u000APOSITIVE_INFINITY === Number.POSITIVE_INFINITY');  

assert.sameValue(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#7: Number\\u000D.\\u000DPOSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number . POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#8: Number\\u2028.\\u2028POSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number . POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#9: Number\\u2029.\\u2029POSITIVE_INFINITY === Number.POSITIVE_INFINITY');

assert.sameValue(Number	  
  .	  
  POSITIVE_INFINITY, Number.POSITIVE_INFINITY, '#10: Number\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029.\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029POSITIVE_INFINITY === Number.POSITIVE_INFINITY');
