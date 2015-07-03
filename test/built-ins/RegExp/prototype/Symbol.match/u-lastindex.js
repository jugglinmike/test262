// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: lastIndex is advanced according to width of astral symbols
es6id: 21.2.5.6
info: >
    21.2.5.6 RegExp.prototype [ @@match ] ( string )

    [...]
    8. Else global is true,
       a. Let fullUnicode be ToBoolean(Get(rx, "unicode")).
       [...]
       g. Repeat,
          [...]
          iv. Else result is not null,
              [...]
              5. If matchStr is the empty String, then
                 [...]
                 c. Let nextIndex be AdvanceStringIndex(S, thisIndex,
                    fullUnicode).
                 d. Let setStatus be Set(rx, "lastIndex", nextIndex, true).
features: [Symbol.match]
---*/

var r = /^|/ug;
r[Symbol.match]('𝌆');
assert.sameValue(r.lastIndex, 2);
