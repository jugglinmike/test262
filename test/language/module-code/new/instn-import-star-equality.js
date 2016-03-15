// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: A single namespace is created for each module
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    12. For each ImportEntry Record in in module.[[ImportEntries]], do
        a. Let importedModule be ? HostResolveImportedModule(module,
           in.[[ModuleRequest]]).
        b. If in.[[ImportName]] is "*", then
           i. Let namespace be ? GetModuleNamespace(importedModule).
           ii. Perform ! envRec.CreateImmutableBinding(in.[[LocalName]], true).
           iii. Call envRec.InitializeBinding(in.[[LocalName]], namespace).
    [...]

    15.2.1.18 Runtime Semantics: GetModuleNamespace

    1. Assert: module is an instance of a concrete subclass of Module Record.
    2. Let namespace be module.[[Namespace]].
    3. If namespace is undefined, then
       [...]
    4. Return namespace.
flags: [module]
---*/

import * as self1 from './instn-import-star-equality.js';
import * as self2 from './instn-import-star-equality.js';
import * as other from './instn-import-star-equality-empty_.js';

assert.sameValue(self1, self2);
assert.notSameValue(self1, other);
