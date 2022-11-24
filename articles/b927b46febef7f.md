---
title: "RenderでScala + PlayなWebアプリを動かす"
emoji: "🔚"
type: "tech"
topics: ["render", "scala", "playframework", "docker"]
published: true
---

# はじめに

Herokuの無料プランが2022年11月28日で終了する。Herokuの代替サービスとして[Render](https://render.com)がいくつかの記事で紹介された。しかし今のところRenderでScala + Play製のWebアプリケーションを動作させたという記事が（英語含めて）あまり見当たらないため、筆者の運用しているScala + Playなアプリケーションである[Kindle時計サーバー](https://github.com/y-yu/kindle-clock)を例に紹介する。

# Blueprintの準備

HerokuのようにGUIをポチポチやって環境変数などを登録するやり方とは別に_Blueprint_ というものがある。この記事ではBlueprintを前提とするため、まずはこれを解説する。

## Blueprintとは？

Blueprintとは`render.yaml`と`Dockerfile`をGitHubリポジトリーに設置してRenderに登録することで、Renderがそのリポジトリへのコミットに反応してYAMLの設定を元に自動でアプリをデプロイしておいてくれる仕組みである。上記のKindle時計サーバーはRedisを利用しているが、たとえば他にもデータベースなどミドルウェアに依存している場合はそれらの構成を1つの`render.yaml`で管理することができるため、GUIに比べて便利である。GitHubリポジトリーはprivateでもOKとなっている。

## `Dockerfile`

まず`Dockerfile`について説明する。自分のアプリケーションでは次のような`Dockerfile`を用いている。

```dockerfile:Dockerfile
# syntax=docker/dockerfile:1
FROM eclipse-temurin:17 as builder
RUN apt-get update && \
    apt-get install -y git bash
ENV GIT_BRANCH=master
ADD https://api.github.com/repos/y-yu/kindle-clock/git/refs/heads/$GIT_BRANCH version.json
RUN git clone -b $GIT_BRANCH https://github.com/y-yu/kindle-clock.git && \
    cd kindle-clock && \
    ./sbt "primary/dist"

FROM eclipse-temurin:17-jre-alpine
EXPOSE 80
RUN mkdir /app
COPY --from=builder /kindle-clock/module/primary/target/universal/primary-0.1.zip /app
RUN apk add --no-cache unzip && \
    cd /app && \
    unzip ./primary-0.1.zip && \
    apk del unzip
RUN apk add --no-cache bash
WORKDIR /app/primary-0.1
CMD ./bin/primary -Dhttp.port=80
```

前半がGitHubからKindle時計を`git clone`してきて`sbt dist`でビルドする部分であり、後半はサーバーを起動させるメインのDockerイメージを構成する部分である。Renderのドキュメントにはっきりとそう書いてあるわけではないが、いろいろ試したところ次のような部分が重要と考えられる。

- `EXPOSE`でポートを指定すればそこでリッスンできるらしい
    - ただし[特定のポート](https://render.com/docs/free#other-limitations)をリッスンすることができない
- `ENTRYPOINT`ではなく`CMD`でサーバーを起動しないとデプロイ失敗になる
    - これは筆者がDockerをよくわかっていないことに起因していると思われる……😇
- RenderのDockerビルドにはキャッシュが効く。しかし`y-yu/kindle-server.git`に更新があればキャッシュを使わないでほしいので、[StackOverflow](https://stackoverflow.com/questions/36996046/how-to-prevent-dockerfile-caching-git-clone/39278224#39278224)を参考にしてこのように`ADD`で`version.json`を出力させることでGitHubリポジトリーに差分があればキャッシュを使わないようにしている


## `render.yaml`

次は先ほどつくった`Dockerfile`を使って全体のサービスを構成するための設定である`render.yaml`を執筆する。Kindle時計サーバーはRedisに依存するので次のようになる。

```yaml:render.yaml
services:
  - type: web
    name: kindle-clock
    env: docker
    dockerfilePath: Dockerfile
    plan: free
    numInstances: 1
    envVars:
      - key: JAVA_OPTS
        value: -Xmx400m -XX:+UseSerialGC -XX:+PrintGCDetails -XX:+PrintGCDateStamps
      - key: OPEN_WEATHER_MAP_APP_ID
        value: *********
      - key: OPEN_WEATHER_MAP_ID
        value: *********
      - key: APPLICATION_SECRET
        value: *********
      - key: AUTH_TOKEN
        value: *********
      - key: AWAIR_OAUTH_TOKEN
        value: *********
      - key: NATURE_REMO_OAUTH_TOKEN
        value: *********
      - key: SWITCHBOT_OAUTH_TOKEN
        value: *********
      - key: REDIS_URL
        fromService:
          name: redis-kindle-clock
          type: redis
          property: connectionString
  - type: redis
    name: redis-kindle-clock
    plan: free
    maxmemoryPolicy: allkeys-lru
    ipAllowList: []
```

このようにRedisなどのサービスを1つのYAML設定に押し込むことができて便利である。あまり注意することはないが次のようなことがある。

- [Herokuからのマイグレーション](https://render.com/docs/migrate-from-heroku)を行った場合、Redisのプランが有料である`plan: starter`になっているので、無料で使う場合は`free`にしておく必要がある

これらが終わったらこの2つのファイルをGitHubのリポジトリに`git push`すればOKとなる。

# Blueprintの作成

[https://dashboard.render.com/blueprints](https://dashboard.render.com/blueprintsl)から`New Blueprint Instance`ボタンを押すと下記の画像のような画面になる。

![](https://storage.googleapis.com/zenn-user-upload/06c5afb560ab-20221121.png)

あとはここから先ほど作成したGitHubリポジトリーを選択すればOKとなる。あとは`git push`するたびに自動でデプロイなどが実行される。

# 自動デプロイ

RenderにはデプロイをKickするためのURLが用意されているので、これをGitHub Actionsで叩けばよい。

![](https://storage.googleapis.com/zenn-user-upload/79cbd180ab81-20221123.png)

このURLをGitHubのシークレットにたとえば`RENDER_DEPLOY_URL`などと登録しておき、下記のようなGitHub Actionsを登録すればOKとなる。

```yaml:.github/workflows/deploy_render.yaml
name: Deploy to Render
on:
  workflow_dispatch:
  push:
    branches:
      - master
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Render
        run: curl -sSfL ${{ secrets.RENDER_DEPLOY_URL }}
```

# まとめ

Scala + Play製のアプリケーションをRenderで動かす方法について解説した。Herokuの無料プランが終わってしまって引っ越し先を検討している方の参考になればいいと思う。