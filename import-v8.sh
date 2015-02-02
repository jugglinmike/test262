#!/usr/bin/env bash

function help() {
  cat <<HELP
Usage: import-v8.sh [SRC] [DEST]
Translate the V8 unit tests in the SRC directory into a Test262-compatable
format and place them in the DEST directory.
HELP
}

read -r -d '' FRONTMATTER <<FRONTMATTER
/*---
 includes: [v8-mjsunit.js]
 ---*/
FRONTMATTER

if [[ "$1" == "-h" || "$1" == "--help" ]]; then help; exit; fi
if [[ "$1" == "" || "$2" == "" ]]; then help; exit 1; fi

for file in $(find $1 -type f); do
	echo "$FRONTMATTER" | cat - $file > $2${file#$1}
done
