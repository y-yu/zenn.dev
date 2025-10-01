FROM node:lts-alpine

RUN apk add --no-cache --update git tini
RUN npm install -g --unsafe-perm zenn-cli@latest

WORKDIR /work
ENTRYPOINT ["npx", "zenn"]
CMD ["preview"]