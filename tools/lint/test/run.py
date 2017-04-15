#!/usr/bin/env python
# Copyright (C) 2017 Mike Pennisi. All rights reserved.
# This code is governed by the BSD license found in the LICENSE file.

import shutil, subprocess, sys, os, unittest, tempfile

testDir = os.path.dirname(os.path.relpath(__file__))
OUT_DIR = os.path.join(testDir, 'out')
ex = os.path.join(testDir, '..', 'lint.py')

class TestGeneration(unittest.TestCase):
    maxDiff = None

    def fixture(self, name, content):
        fspath = os.path.join(OUT_DIR, name)
        with open(fspath, 'w') as f:
            f.write(content)
        return fspath

    def lint(self, args):
        args[:0] = [ex]
        sp = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = sp.communicate()
        return dict(stdout=stdout, stderr=stderr, returncode=sp.returncode)

    def setUp(self):
        os.mkdir(OUT_DIR)

    def tearDown(self):
        shutil.rmtree(OUT_DIR, ignore_errors=True)

    def test_no_file(self):
        result = self.lint(['non-existent-file.js'])
        self.assertNotEqual(result["returncode"], 0)

    def test_normal(self):
        fspath = self.fixture('foobar', 'some text')
        result = self.lint([fspath])

if __name__ == '__main__':
    unittest.main()
