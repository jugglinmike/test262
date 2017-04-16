#!/bin/bash

if [ $TRAVIS_PULL_REQUEST != "false" ]; then
  target=$TRAVIS_BRANCH
else
  target='HEAD~'
fi

files=$(git diff --diff-filter ACMR --name-only $target -- test/)

./tools/lint/lint.py --whitelist lint.whitelist $files
