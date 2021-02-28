#!/bin/bash

set -x

sleep 2

if [ -d "./targets" ]; then
  rm -rf ./targets
fi

mkdir targets

wget -P ./targets http://localhost:8000/

for article in ./articles/*.md; do
  if [[ $article =~ articles/(.*)\.md ]]; then
    wget -p -H -E -nH -k -P ./targets "http://localhost:8000/articles/${BASH_REMATCH[1]}"
  fi
done

exit 0
