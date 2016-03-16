#!/usr/bin/env python

import os, shutil, subprocess, sys

OUT_DIR = os.environ.get('OUT_DIR') or 'test'
SRC_DIR = os.environ.get('SRC_DIR') or 'src'
PUBLISH_DIR = os.environ.get('PLUBLISH_DIR') or 'test'
UPSTREAM = os.environ.get('UPSTREAM') or 'git@github.com:tc39/test262.git'

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
def build_cases():
    shell(sys.executable, 'tools/generation/generator.py',
          '--out', OUT_DIR,
          SRC_DIR)

@target()
def clean():
    shell(sys.executable, 'tools/generation/generator.py', 'clean', OUT_DIR)

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

if len(sys.argv) == 1:
    targets['build']()

for target in sys.argv[1:]:
    if not target in targets:
        sys.stderr.write('No target named: "' + target + '".\n' +
            'Available targets: ' + ', '.join(list(targets)) + '\n')
        sys.exit(1)
    targets[target]()
