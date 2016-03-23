// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

var varBinding1 = 1;
function fnBinding1() { return 2; }
function* genBinding1() { return 3; }
let letBinding1 = 4;
const constBinding1 = 5;
class classBinding1 { valueOf() { return 6; } };

export {
    varBinding1 as varName,
    fnBinding1 as fnName,
    genBinding1 as genName,
    letBinding1 as letName,
    constBinding1 as constName,
    classBinding1 as className
  };

Function('return this;')().test262update = function() {
  varBinding1 = 7;
  fnBinding1 = 8;
  genBinding1 = 9;
  letBinding1 = 10;
  classBinding1 = 11;
};
