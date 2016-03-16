#!/usr/bin/env python
from __future__ import print_function

import argparse
import os, sys

from lib.expander import Expander
from lib.test import Test

def print_test(test):
    print('/**')
    print(' * ----------------------------------------------------------------')
    print(' * ' + test['name'])
    print(' * ----------------------------------------------------------------')
    print(' */')
    print(test['source'])
    print('\n')

def write_test(prefix, test):
    location = os.path.join(prefix, test['name'])
    path = os.path.dirname(location)
    if not os.path.exists(path):
        os.makedirs(path)
    with open(location, 'w') as handle:
        handle.write(test['source'])

def find_cases(location):
    # When a file is specified, return the file name and its containing
    # directory
    if os.path.isfile(location):
        return location, [os.path.dirname(location)]

    # When a directory is specified, if that directory contains a sub-directory
    # names "default" interpret it as a "case directory"
    if (os.path.isdir(os.path.join(location, 'default'))):
        return None, [location]
    else:
        return None, map(
            lambda x: os.path.join(args.cases, x), os.listdir(args.cases))

def clean(args):
    for (subdir,_,fileNames) in os.walk(args.directory):
        for fileName in map(lambda x: os.path.join(subdir, x), fileNames):
            test = Test(fileName)
            if test.is_generated():
                print('Deleting file "' + fileName + '"...')
                os.remove(fileName)

def create(args):
    caseFile, caseDirs = find_cases(args.cases)

    for caseDir in caseDirs:
        exp = Expander(caseDir)
        for test in exp.expand('utf-8', caseFile):
            if args.no_clobber:
                other_file = os.path.join(args.no_clobber, test['name'])
                if os.path.isfile(other_file):
                    print('ERROR: Refusing to overwrite ' + other_file)
                    exit(1)

            if args.out:
                write_test(args.out, test)
            else:
                print_test(test)

parser = argparse.ArgumentParser(description='Test262 test generator tool')
subparsers = parser.add_subparsers()

create_parser = subparsers.add_parser('create', help='''Generate test material''')
create_parser.add_argument('-o', '--out', help='''The directory to write the
    compiled tests. If unspecified, tests will be written to standard out.''')
create_parser.add_argument('-n', '--no-clobber', help='''Do not produce test if a
    corresponding file exists within this directory.''')
create_parser.add_argument('cases', help='''Test cases to generate. May be a file or a
    directory.''')
create_parser.set_defaults(func=create)

clean_parser = subparsers.add_parser(
    'clean',
    help='''Remove previously-generated files''')
clean_parser.add_argument('directory', help='''Remove any generated tests from
    this directory''')
clean_parser.set_defaults(func=clean)

args = parser.parse_args()
args.func(args)
