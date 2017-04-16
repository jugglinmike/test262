#!/usr/bin/env python
# Copyright (C) 2017 Mike Pennisi. All rights reserved.
# This code is governed by the BSD license found in the LICENSE file.

import argparse
import inspect
import re
import sys
import yaml

from lib.checks.frontmatter import CheckFrontmatter
from lib.eprint import eprint

parser = argparse.ArgumentParser(description='Test262 linting tool')
parser.add_argument('files',
        nargs='*',
        help='files to lint')

checks = [CheckFrontmatter()]

def parse_frontmatter(src):
    match = re.search(r'/\*---(.*)---\*/', src, re.DOTALL)
    if not match:
        return None

    try:
        return yaml.load(match.group(1))
    except (yaml.scanner.ScannerError, yaml.parser.ParserError):
        return None

if __name__ == '__main__':
    args = parser.parse_args()
    errors = []
    failed_checks = set([])

    for file_name in args.files:
        with open(file_name, 'r') as f:
            content = f.read()
        meta = parse_frontmatter(content)
        for check in checks:
            error = check.run(file_name, meta, content)

            if error is not None:
                failed_checks.add(check)
                errors.append((file_name, check, error))

    error_count = len(errors)
    s = 's' if error_count != 1 else ''

    print '%s error%s found.' % (error_count, s)

    if error_count == 0:
        sys.exit(0)

    for error in errors:
        eprint('%s: %s - %s' % (error[0], error[1].ID, error[2]))

    eprint('')
    eprint('## Check Descriptions')

    for failed_check in failed_checks:
        eprint('%s - %s' % (failed_check.ID, failed_check.__doc__))

    sys.exit(1)
