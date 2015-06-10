// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 10.4.3-1-28-s
description: >
    Strict Mode - checking 'this' (FunctionExpression defined within a
    FunctionDeclaration inside strict mode)
flags: [onlyStrict]
includes: [runTestCase.js]
---*/

function testcase() {
"use strict";
function f1() {
    var f = function () {
        return typeof this;
    }
    return (f()==="undefined") && ((typeof this)==="undefined");
}
return f1();
}
runTestCase(testcase);
