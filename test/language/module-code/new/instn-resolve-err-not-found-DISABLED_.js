// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Modules specifiers that cannot be resolved produce a SyntaxError
esid: sec-moduledeclarationinstantiation
info: |
    This is a Test262-specific extension of the ECMAScript specification. It is
    necessary to express expectations for host behavior at various stages of
    module execution.
negative: SyntaxError
flags: [module]
---*/

import './specifier-for-non-existent-module.js';
