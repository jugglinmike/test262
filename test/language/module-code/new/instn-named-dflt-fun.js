// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    A mutable bindings is created and initialized in the lexical environment
    record prior to execution for "anonymous" function declarations
esid: sec-moduledeclarationinstantiation
info: |
    [...]
    17. For each element d in lexDeclarations do
        a. For each element dn of the BoundNames of d do
           i. If IsConstantDeclaration of d is true, then
              [...]
           ii. Else,
               1. Perform ! envRec.CreateMutableBinding(dn, false).
           iii. If d is a GeneratorDeclaration production or a
                FunctionDeclaration production, then
                1. Let fo be the result of performing InstantiateFunctionObject
                   for d with argument env.
                2. Call envRec.InitializeBinding(dn, fo).
    [...]

    14.1 Function Definitions

    Syntax

    FunctionDeclaration[Yield, Default] :

        function BindingIdentifier[?Yield] ( FormalParameters ) { FunctionBody }
        [+Default] function ( FormalParameters ) { FunctionBody }
flags: [module]
---*/

assert.sameValue(fn(), 23, 'function value is hoisted');

import fn from './instn-lex-dflt-fun.js';
export default function() { return 23; };
