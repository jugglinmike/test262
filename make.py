#!/usr/bin/env python

import os, shutil, subprocess, sys

OUT_DIR = os.environ.get('OUT_DIR') or 'out'
SRC_DIR = os.environ.get('SRC_DIR') or 'src'
PUBLISH_DIR = os.environ.get('PLUBLISH_DIR') or 'test'
UPSTREAM = os.environ.get('UPSTREAM') or 'git@github.com:tc39/test262.git'
MAINTAINER = os.environ.get('MAINTAINER') or 'goyakin@microsoft.com'

CASE_DIR = os.path.join(SRC_DIR, 'cases')
STATIC_DIR = os.path.join(SRC_DIR, 'static')

def shell(*args):
    sp = subprocess.Popen(list(args), stdout=subprocess.PIPE)
    cmd_str = ' '.join(args)

    print '> ' + cmd_str

    for line in iter(sp.stdout.readline, ''):
        print line

    sp.communicate()

    if sp.returncode == 1:
        raise Exception('Command failed: ' + cmd_str)

targets = dict()
def target(*deps):
    def other(orig):
        def wrapped():
            print 'Running target: ' + orig.__name__

            for dep in deps:
                targets[dep]()
            return orig()
        wrapped.__name__ = orig.__name__
        targets[orig.__name__] = wrapped
        return wrapped
    return other

@target('build_static', 'build_cases')
def build():
    pass

@target()
def build_static():
    shutil.copytree(STATIC_DIR, OUT_DIR)

@target()
def build_cases():
    shell(sys.executable, 'tools/generation/compile.py',
          '--no-clobber', STATIC_DIR,
          '--out', OUT_DIR,
          CASE_DIR)

@target()
def clean():
    shutil.rmtree(OUT_DIR, ignore_errors=True)
    shutil.rmtree(OUT_DIR + '.tmp', ignore_errors=True)

@target('clean', 'build')
def deploy():
    shutil.move(OUT_DIR, OUT_DIR + '.tmp')
    shell('git', 'checkout', 'master')
    shutil.rmtree(PUBLISH_DIR)
    shutil.move(OUT_DIR + '.tmp', OUT_DIR)
    shell('git', 'add', '--all', PUBLISH_DIR)
    shell('git', 'commit', '--message', '"Re-build from source"')
    shell('git', 'push', UPSTREAM, 'master')
    shell('git', 'checkout', '-')
