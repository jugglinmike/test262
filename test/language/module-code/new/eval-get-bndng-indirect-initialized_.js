// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

export var varBinding = 1;
export function fnBinding() { return 2; }
export function* genBinding() { return 3; }
export let letBinding = 4;
export const constBinding = 5;
export class classBinding { valueOf() { return 6; } };

Function('return this;')().test262update = function() {
  varBinding = 7;
  fnBinding = 8;
  genBinding = 9;
  letBinding = 10;
  classBinding = 11;
};
