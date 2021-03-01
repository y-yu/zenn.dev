#!/bin/bash

set -x

sleep 2

if [ ! -d "./targets" ]; then
  mkdir targets
fi

wget --mirror \
  --quiet --show-progress \
  --no-parent \
  --convert-links \
  --no-host-directories \
  --adjust-extension \
  --execute robots=off \
  --directory-prefix=./targets \
  http://localhost:8000/

for article in ./articles/*.md; do
  if [[ $article =~ articles/(.*)\.md ]]; then
    wget --mirror \
      --page-requisites \
      --quiet --show-progress \
      --no-parent \
      --convert-links \
      --no-host-directories \
      --adjust-extension \
      --execute robots=off \
      --directory-prefix=./targets \
      "http://localhost:8000/articles/${BASH_REMATCH[1]}"
  fi
done

exit 0
