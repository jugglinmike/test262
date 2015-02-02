#!/usr/bin/env bash

function help() {
  cat <<HELP
Usage: import-v8.sh [SRC] [DEST]
Translate the V8 unit tests in the SRC directory into a Test262-compatable
format and place them in the DEST directory.
HELP
}

if [[ "$1" == "-h" || "$1" == "--help" ]]; then help; exit; fi
if [[ "$1" == "" || "$2" == "" ]]; then help; exit 1; fi

if [ ! -d "$1" ]; then
	echo "No such directory: $1";
	exit 1;
fi

if [ -d "$2" ]; then
	echo "Directory already exists: $2";
	exit 1;
fi

cp -r $1 $2

for file in $(find $2 -type f); do
	sed -i "1s;^;/*---\n includes: [v8-mjsunit.js]\n ---*/\n;" $file
done
