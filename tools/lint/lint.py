#!/usr/bin/env python
# Copyright (C) 2017 Mike Pennisi. All rights reserved.
# This code is governed by the BSD license found in the LICENSE file.

import argparse

parser = argparse.ArgumentParser(description='Test262 linting tool')
parser.add_argument('files',
        nargs='*',
        help='files to lint')

if __name__ == '__main__':
    args = parser.parse_args()
    for file_name in args.files:
        with open(file_name, 'r') as f:
            print f.read()
