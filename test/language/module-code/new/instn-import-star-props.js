// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    Module namespace object reports properties for exported bindings of all
    dependencies.
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
       [...]
       d. Let namespace be ModuleNamespaceCreate(module, unambiguousNames).
flags: [module]
---*/

import * as ns from './instn-import-star-props-1_.js';

assert.sameValue(
  'direct' in ns, true, 'export declared by dependency directly'
);
assert.sameValue(
  'both' in ns,
  true,
  'export declared by direct dependency and nested dependency'
);
assert.sameValue(
  'nested' in ns, true, 'export declared through nested dependency (via "*")'
);
