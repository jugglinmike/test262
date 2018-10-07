// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    White Space and Line Terminator between LeftHandSideExpression and "@="
    or between "@=" and AssignmentExpression are allowed
es5id: 11.13.2_A1_T7
esid: sec-assignment-operators
description: Checking by using eval, check operator is x >>= y
---*/

var x;

x = 1;
assert.sameValue(x\u0009>>=\u00091, 0);

x = 1;
assert.sameValue(x\u000B>>=\u000B1, 0);

x = 1;
assert.sameValue(x\u000C>>=\u000C1, 0);

x = 1;
assert.sameValue(x\u0020>>=\u00201, 0);

x = 1;
assert.sameValue(x\u00A0>>=\u00A01, 0);

x = 1;
assert.sameValue(x\u000A>>=\u000A1, 0);

x = 1;
assert.sameValue(x\u000D>>=\u000D1, 0);

x = 1;
assert.sameValue(x\u2028>>=\u20281, 0);

x = 1;
assert.sameValue(x\u2029>>=\u20291, 0);

x = 1;
assert.sameValue(x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291, 0);
