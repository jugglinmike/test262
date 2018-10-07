// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between LeftHandSideExpression and "@="
    or between "@=" and AssignmentExpression are allowed
es5id: 11.13.2_A1_T4
esid: sec-assignment-operators
description: Checking by using eval, check operator is x += y
---*/

var x;

x = -1;
assert.sameValue(x\u0009+=\u0009-1, -2);

x = -1;
assert.sameValue(x\u000B+=\u000B-1, -2);

x = -1;
assert.sameValue(x\u000C+=\u000C-1, -2);

x = -1;
assert.sameValue(x\u0020+=\u0020-1, -2);

x = -1;
assert.sameValue(x\u00A0+=\u00A0-1, -2);

x = -1;
assert.sameValue(x\u000A+=\u000A-1, -2);

x = -1;
assert.sameValue(x\u000D+=\u000D-1, -2);

x = -1;
assert.sameValue(x\u2028+=\u2028-1, -2);

x = -1;
assert.sameValue(x\u2029+=\u2029-1, -2);

x = -1;
assert.sameValue(x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029+=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029-1, -2);
