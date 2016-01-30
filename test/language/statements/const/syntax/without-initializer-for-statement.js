// Copyright (C) 2011 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.1
description: >
    const declarations without initialisers in statement positions: 
    for ( ;;) Statement
negative:
  phase: early
  type: SyntaxError
---*/
for (;false;) const x;
