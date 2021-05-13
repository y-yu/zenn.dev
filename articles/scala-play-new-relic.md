---
title: "Scala + Play on HerokuなWebアプリにNew Relicを導入"
emoji: "📈"
type: "tech"
topics: ["scala", "playframework", "newrelic", "heroku"]
published: true
---

# はじめに

[Heroku](https://www.heroku.com/)の無料（Hobby）範囲内で[New Relic](https://newrelic.com/)を無料で利用することができる。New Relicはアプリケーションのモニタリングツールであり、メモリ量やGCのことや外部APIアクセスのレスポンスタイムなど様々なデータをモニターすることができる。下記のようにグラフィカルな表示もしてくれる。

- ![](https://storage.googleapis.com/zenn-user-upload/bj6lp9yck5kdimaywa4bl9eoxxri)
- ![](https://storage.googleapis.com/zenn-user-upload/mi2nwn2b7kdwbue90c0kfzphv0gi)

[New Relicの公式のドキュメント](https://docs.newrelic.com/docs/agents/java-agent/installation/include-java-agent-jvm-argument/#Installing_on_Play)にはJARファイルをいったんZIP展開したうえで、そこにYAMLファイルを設置して再びJARに戻すといった手順が紹介されているが、実はそのようなことをしなくても`build.sbt`などへの記述 + 環境変数の追加だけで導入することができる。この記事ではHerokuを前提にNew Relicをどのように導入するかについて解説する。
この記事で紹介したコードを利用したプログラムが下記のリポジトリーに設置されている。

- https://github.com/y-yu/kindle-clock

# 1. New Relicの情報を入手

New Relicのコンソールにある`+ Add more data`ボタンをクリックして、いくつかある種類の中からとりあえず`App monitoring`にある`Java`を選んでおく。

- ![](https://storage.googleapis.com/zenn-user-upload/zcl8nd7u7m3h6lqlybqeetpwyvz0)
- ![](https://storage.googleapis.com/zenn-user-upload/nc0nsj6l1yzoflt9dy82e9q9idid)

そのあと色々入力していくと、下記のようにNew Relicのライセンス情報をダウンロードできるようになる。この内容を後の設定で利用するため`newrelic.yml`をダウンロードしておく。

![](https://storage.googleapis.com/zenn-user-upload/886p1lioqbywhr3e11igrhmazgic)

# 2. `build.sbt`と`project/plugins.sbt`の設定

まず`project/plugins.sbt`に下記のように[sbt-javaagent](https://github.com/sbt/sbt-javaagent)のプラグインを追加する[^sbt-heroku]。


```scala:project/plugins.sbt
addSbtPlugin("com.heroku" % "sbt-heroku" % "2.1.4")

addSbtPlugin("com.lightbend.sbt" % "sbt-javaagent" % "0.1.6")
```

[^sbt-heroku]: この記事がHerokuを前提としているため、デプロイには[sbt-heroku](https://github.com/heroku/sbt-heroku)を利用しているということで進めている。筆者はこのようにしたが、おそらく必ずしも`sbt-heroku`を利用する必要はないと思われる。

そのうえで、`build.sbt`にNew Relicのエージェントを起動する設定を追加する[^play-scala]。

```scala:build.sbt
lazy val root = project
  .in(file("."))
  .settings(
    javaAgents += "com.newrelic.agent.java" % "newrelic-agent" % "6.5.0"
  )
  .enablePlugins(PlayScala, JavaAgent, JavaAppPackaging)
```

[^play-scala]: ここでも記事の前提としてPlayframeworkを利用しているので、`enablePlugins`でこれをONにしている。

このように`settings`に`newrelic-agent`を追加を追加すればOKである。

# 3. Herokuの環境変数を追加

これですでにScala + PlayのWebアプリケーションはNew Relicエージェントが起動する状態ではあるが、ライセンス情報などが設定されていないため、起動させると必要な情報がないとなって即落ちてしまう。そこで手順（1）で入手した`newrelic.yml`の冒頭は次のようになっている。

```yaml:newrelic.yml
common: &default_settings

  # ============================== LICENSE KEY ===============================
  # You must specify the license key associated with your New Relic
  # account. For example, if your license key is 12345 use this:
  # license_key: '12345'
  # The key binds your Agent's data to your account in the New Relic service.
  license_key: XXXXXXXXXXXXXXXXXXXXXXXXXX

  # Agent Enabled
  # Use this setting to disable the agent instead of removing it from the startup command.
  # Default is true.
  agent_enabled: true

  # Set the name of your application as you'd like it show up in New Relic.
  # If enable_auto_app_naming is false, the agent reports all data to this application.
  # Otherwise, the agent reports only background tasks (transactions for non-web applications)
  # to this application. To report data to more than one application
  # (useful for rollup reporting), separate the application names with ";".
  # For example, to report data to "My Application" and "My Application 2" use this:
  # app_name: My Application;My Application 2
  # This setting is required. Up to 3 different application names can be specified.
  # The first application name must be unique.
  app_name: kindle-clock
```

重要なのはこの中の`common.license_key`と`common.app_name`の2つである。この2つを次のようにHerokuの環境変数に設定する。

- `NEW_RELIC_APP_NAME` …… `common.app_name`
- `NEW_RELIC_LICENSE_KEY` …… `common.license_key`

![](https://storage.googleapis.com/zenn-user-upload/i07qddcp6fexnxwjbrh8kexcy67j)

ちなみにこれらの環境変数を読み込む設定はNew Relicエージェントに元々搭載されているので、こちらで何か実装する必要はない。

# 4. Herokuへのデプロイ

ここまで行えばあとは`sbt-heroku`を利用していれば簡単である。下記のコマンドを実行すればよい。

```console
$ sbt stage deployHeroku
```

# まとめ

このように`sbt-javaagent`を利用すればJAR（ZIPファイル）を展開してYAMLファイルを注入するといった、ややダーティーな方法を回避しつつScala + PlayなWebアプリでNew Relicを利用することができる。この方法であれば、たとえば[Scala Steward](https://github.com/scala-steward-org/scala-steward)による自動ライブラリーアップデートPull Request作成機能の恩恵を受けやすいと考えられる。

