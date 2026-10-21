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
  const options = new Intl.DateTimeFormat('en', { calendar, year: 'numeric' }).resolvedOptions();

  assert.sameValue('day' in options, false, calendar + ': day');
  assert.sameValue('month' in options, false, calendar + ': month');
  assert(
    ['2-digit', 'numeric'].indexOf(options.year) > -1,
    calendar + ': year (got "' + options.year + '")'
  );
}

