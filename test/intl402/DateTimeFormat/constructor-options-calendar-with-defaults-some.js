// Copyright (C) 2026 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-intl.datetimeformat
description: TODO
info: TODO
locale: [en]
---*/

const availableCalendars = [
  "buddhist",
  "chinese",
  "coptic",
  "dangi",
  "ethioaa",
  "ethiopic",
  "gregory",
  "hebrew",
  "indian",
  "islamic-civil",
  "islamic-tbla",
  "islamic-umalqura",
  "iso8601",
  "japanese",
  "persian",
  "roc",
];

function assertIncludes(value, array, message) {
  assert(array.indexOf(value) > -1, message + ' (got "' + value + '")');
}

for (const calendar of availableCalendars) {
  {
    const optionsDay = new Intl.DateTimeFormat('en', { calendar, day: 'numeric' }).resolvedOptions();

    assertIncludes(optionsDay.day, ['2-digit', 'numeric'], calendar + ' with day');
    assert.sameValue('month' in optionsDay, false, calendar + ': month');
    assert.sameValue('year' in optionsDay, false, calendar + ': year');
  }

  {
    const optionsMonth = new Intl.DateTimeFormat('en', { calendar, month: 'numeric' }).resolvedOptions();

    assert.sameValue('day' in optionsMonth, false, calendar + ': day');
    assertIncludes(
      optionsMonth.month,
      ['2-digit', 'numeric', 'narrow', 'short', 'long'],
      calendar + ' with month'
    );
    assert.sameValue('year' in optionsMonth, false, calendar + ': year');
  }

  {
    const optionsYear = new Intl.DateTimeFormat('en', { calendar, year: 'numeric' }).resolvedOptions();

    assert.sameValue('day' in optionsYear, false, calendar + ': day');
    assert.sameValue('month' in optionsYear, false, calendar + ': month');
    assertIncludes(optionsYear.year, ['2-digit', 'numeric'], calendar + ' with year');
  }
}
