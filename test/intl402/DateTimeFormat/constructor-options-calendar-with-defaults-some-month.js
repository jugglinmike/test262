// Copyright (C) 2026 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-intl.datetimeformat
description: TODO
info: TODO
includes: [testIntl.js]
locale: [en]
---*/

for (const calendar of allCalendars()) {
  const options = new Intl.DateTimeFormat('en', { calendar, month: 'numeric' }).resolvedOptions();

  assert.sameValue('day' in options, false, calendar + ': day');
  assert(
    ['2-digit', 'numeric', 'narrow', 'short', 'long'].indexOf(options.month) > -1,
    calendar + ': month (got "' + options.month + '")'
  );
  assert.sameValue('year' in options, false, calendar + ': year');
}

