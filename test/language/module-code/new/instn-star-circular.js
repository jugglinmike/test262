// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description:
    Circular "star" imports do not trigger infinite recursion during name
    enumeration.
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    12. For each ImportEntry Record in in module.[[ImportEntries]], do
        a. Let importedModule be ? HostResolveImportedModule(module,
           in.[[ModuleRequest]]).
        b. If in.[[ImportName]] is "*", then
           i. Let namespace be ? GetModuleNamespace(importedModule).
    [...]

    15.2.1.18 Runtime Semantics: GetModuleNamespace

    [...]
    3. If namespace is undefined, then
       a. Let exportedNames be ? module.GetExportedNames(« »).
       [...]

    15.2.1.16.2 GetExportedNames

    1. Let module be this Source Text Module Record.
    2. If exportStarSet contains module, then
       a. Assert: We've reached the starting point of an import * circularity.
       b. Return a new empty List.
flags: [module]
---*/

import * as ns from './instn-star-circular-a_.js';

assert('fromA' in ns, 'entry for binding from "a"');
assert('fromB' in ns, 'entry for binding from "b"');
