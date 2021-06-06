#!/bin/bash

set -x

sleep 2

if [ ! -d "./targets" ]; then
  mkdir -p targets/_next
fi

cp -r ./node_modules/zenn-cli/.next/static ./targets/_next/

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

cd ./targets
 
find . -name "*.html" -or -name "*.css" -or -name "*.js" |\
    xargs perl -i -pe 's/(?<!\.)\/(_next)/..\/$1/g'

# Update KaTeX version
find . -name "*.css" -or -name "*.js" |\
    xargs perl -i -pe 's/0\.12\.0/0.13.11/g'

exit 0
