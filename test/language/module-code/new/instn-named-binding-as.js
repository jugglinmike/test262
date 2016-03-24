// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Immutable binding is created for "named" import
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    12. For each ImportEntry Record in in module.[[ImportEntries]], do
        a. Let importedModule be ? HostResolveImportedModule(module,
           in.[[ModuleRequest]]).
        b. If in.[[ImportName]] is "*", then
           [...]
        c. Else,
           i. Let resolution be ?
              importedModule.ResolveExport(in.[[ImportName]], « », « »).
           ii. If resolution is null or resolution is "ambiguous", throw a
               SyntaxError exception.
           iii. Call envRec.CreateImportBinding(in.[[LocalName]],
                resolution.[[Module]], resolution.[[BindingName]]).
    [...]
flags: [module]
---*/

assert.sameValue(y, 1, 'binding is initialized prior to module evaluation');

assert.throws(TypeError, function() {
  y = null;
}, 'binding rejects assignment');

assert.sameValue(y, 1, 'binding value is immutable');

import { x as y } from './instn-named-binding-as_.js';

// Taken together, the following two assertions demonstrate that there is no
// entry in the environment record for ImportName:
assert.throws(ReferenceError, function() {
  x;
}, 'a binding is not created and initialized for ImportName');
assert.sameValue(
  typeof x,
  'undefined',
  'a binding is not created and left uninitialized for ImportName'
);
