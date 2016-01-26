#!/usr/bin/env python
import argparse
import os
import codecs

import find_files
from expander import Expander

def print_test(test):
    print '/**'
    print ' * ----------------------------------------------------------------'
    print ' * ' + test['name']
    print ' * ----------------------------------------------------------------'
    print ' */'
    print test['source']
    print '\n'

def write_test(prefix, test):
    location = os.path.join(prefix, test['name'])
    path = os.path.dirname(location)
    if not os.path.exists(path):
        os.makedirs(path)
    with codecs.open(location, 'w', 'utf-8') as handle:
        handle.write(test['source'])

parser = argparse.ArgumentParser(description="foobar")
parser.add_argument('-o', '--out', help='''The directory to write the
    compiled tests. If unspecified, tests will be written to standard out.''')
parser.add_argument('cases', help='''Test cases to generate. May be a file or a
    directory.''')
args = parser.parse_args()

caseFile = None
if os.path.isdir(args.cases):
    cases = find_files.cases(args.cases)
    if (os.path.isdir(os.path.join(args.cases, 'default'))):
        caseDirs = [args.cases]
    else:
        caseDirs = map(
            lambda x: os.path.join(args.cases, x), os.listdir(args.cases))
else:
    caseFile = args.cases
    caseDirs = [os.path.dirname(caseFile)]

for caseDir in caseDirs:
    exp = Expander(caseDir)
    for tests in exp.expand(caseFile):
      for test in tests:
       for t in test:
        if args.out:
            write_test(args.out, t)
        else:
            print_test(t)
