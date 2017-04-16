#!/usr/bin/env python
# Copyright (C) 2017 Mike Pennisi. All rights reserved.
# This code is governed by the BSD license found in the LICENSE file.

import argparse
import inspect

import lib.checks as checks
from lib.check import Check

parser = argparse.ArgumentParser(description='Test262 linting tool')
parser.add_argument('files',
        nargs='*',
        help='files to lint')

for _, check in checks.__dict__.iteritems():
    if not inspect.isclass(check) or not issubclass(check, Check):
        continue
    print check

if __name__ == '__main__':
    args = parser.parse_args()
    for file_name in args.files:
        with open(file_name, 'r') as f:
            pass
