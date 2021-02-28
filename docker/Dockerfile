FROM node:14

LABEL maintainer="YOSHIMURA Hikaru<yyu@mental.poker>"

WORKDIR /workdir

RUN npm init --yes \
    && npm install -g zenn-cli@latest \
    && npx zenn init

