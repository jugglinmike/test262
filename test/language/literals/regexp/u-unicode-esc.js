// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Out-of-range value of hexadecimal digits in UnicodeEscapeSequence
es6id: 21.2.2.10
info: >
    21.2.2.10 CharacterEscape

    The production RegExpUnicodeEscapeSequence :: u{ HexDigits } evaluates as
    follows:

        1. Return the character whose code is the MV of HexDigits.
---*/

assert(/\u{1}/u.test('\u0001'));
assert.sameValue(/\u{1}/u.test('u'), false);
assert(/\u{0000000042}/u.test('B'));
