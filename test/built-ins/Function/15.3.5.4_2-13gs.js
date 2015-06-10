// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.3.5.4_2-13gs
description: >
    Strict mode - checking access to non-strict function caller from
    strict function (indirect eval used within strict mode)
negative: TypeError
flags: [onlyStrict]
---*/

var my_eval = eval;
my_eval("gNonStrict();");


function gNonStrict() {
    return gNonStrict.caller;
}
