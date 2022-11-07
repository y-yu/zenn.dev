---
title: "RustのGATsでモナドを作れるか？"
emoji: "📦"
type: "tech"
topics: ["rust", "関数型プログラミング"]
published: true
---

# はじめに

Rust 1.65で _GATs (Generic associated types)_[^gats_naming] が追加された。これは次のようにassociated type（型メンバー）が型パラメーターを取ることできるものとなっている。

```rust
trait Monad {
    type This<B>;
}
```

このように型を取る型を記述できるようになったときに思いつくものとして「モナド」がある。モナドの具体的な定義や性質はいったん放置するとして、任意の型`A`について、たとえば`List<A>`や`Option<A>`がモナドとなる。したがって次のようにトレイト`Monad`を定義すれば`Option`などを次のようにモナドへ適合させることができるのではないかと思うだろう。

```rust
impl<A> Monad for Option<A> {
    type This<B> = Option<B>
}
```

この記事では実際に上記の`Monad`のようなトレイトを実際の`Option`などに適用してどの程度うまくいくのかを伸べる。なお、この記事を読むにあたってモナドや関数型言語などの知識はほぼ必要なく、HaskellやScalaなど他の言語にあるものとしてモナドを選んだだけである。
この記事に記載されている完全なソースコードは下記のGitHubリポジトリーから入手できる。

- https://github.com/y-yu/rust-gats-monad

[^gats_naming]: 似た名前のものにHaskellなどに存在する _GADTs (Generalized algebraic datatypes)_ がある。GATsとGADTsはあまり関係がないとは思うが、個人的にはGADTsをリスペクトして（？）GATsの“G″は“Generalized″にしてもよかったかもしれないと思う。

# TL; DR

- GATsではモナドなどが必要とする高階多相を模倣することは**できない**（or 難しい🤔）
- 少なくともGATsでそのまま作れるといった簡単な感じではなさそう

# トレイト`Monad`の定義

トレイト`Monad`は次のように定義される。

```rust:monad.rs
pub trait Monad {
    type A;
    type This<A>: Monad;

    fn pure_m<B>(b: B) -> This<B>;

    fn flat_map<B, F>(self, f: F) -> Self::This<B>
    where
        F: FnMut(Self::A) -> Self::This<B>;
}
```

たとえばこれの`Option`の`impl`は次のように定義できる。

```rust:data/option.rs
impl<A> Monad for Option<A> {
    type A = A;
    type This<B> = Option<B>;

    fn pure_m<B>(t: B) -> Option<B> {
        Some(t)
    }

    fn flat_map<B, F>(self, mut f: F) -> Option<B>
    where
        F: FnMut(A) -> Option<B>
    {
        self.and_then(f)
    }
}
```

このように一見すると上手くいっているように見える。

# `Monad`から`Applicative`の導出

ここで`Monad`とは別に`Applictaive`という次のトレイトを考えてみる。

```rust:applicative.rs
pub trait Applicative {
    type A;
    type This<B>: Applicative;

    fn pure_a<B>(t: B) -> Self::This<B>;

    fn map2<B, C, F>(self, mb: Self::This<B>, f: F) -> Self::This<C>
    where
        F: FnMut(Self::A, B) -> C;
}
```

さきほど作ったトレイト`Monad`と今回のトレイト`Applicative`について、この違いは「コールバック」という観点で考えると分かりやすいかもしれない。

![](https://storage.googleapis.com/zenn-user-upload/7e893de2ca28-20221106.png)
*`Monad`と`Applicative`の`f`（コールバック）への引数の関係*

このように`Monad`の`flat_map`は`self`の値をコールバックである`f`に渡しているのに対して、`Applicative`の`map2`は別の`This<B>`を引っ張ってきてそれと`self`の値を一気に`f`で処理している。このとき`mb: This<B>`の構築に型`A`の値は一切関与しないことが重要である。つまり`Monad`の`flat_map`には「`A`の値が得られば`f`を実行する」という逐次的な性質があり、一方で`Applicative`の`map2`は「`self`と`mb`を独立した順で処理して、この2つが得られ次第`f`を実行する」という順不同な性質を表現していると考えられる。
さて、どうしてあえて`Applicative`を出してきたかというと、`Monad`は順が固定されているのに対して、`Applicative`は順がない（= 適当な順でやってもいい）ので、`Monad`なものは常に`Applicative`と言えそうである。したがって`impl<M: Monad> Applicative for M`の定義を目指す。

```rust:monad.rs
impl<M: Monad> Applicative for M {
    type A = <M as Monad>::A;
    type This<B> = <M as Monad>::This<B>;

    fn pure_a<B>(t: B) -> Self::This<B> {
        <M as Monad>::pure_m(t)
    }

    fn map2<B, C, F>(self, mb: Self::This<B>, f: F) -> Self::This<C>
    where
        F: FnMut(Self::A, B) -> C
    {
        self.flat_map(|a: Self::A| {
            mb.flat_map(|b: B| {
                M::pure_m(f(a, b))
            })
        })
    }
}
```

このように`Monad`であることを前提に`Applicative`を作りだせそうではあるが、実これはコンパイルが通らず次のようなエラーとなってしまう。

```
  --> src/monad.rs:28:13
   |
15 |   impl<M: Monad> Applicative for M {
   |        - this type parameter
...
28 | /             mb.flat_map(|b: B| {
29 | |                 M::pure_m(f(a, b))
30 | |             })
   | |______________^ expected type parameter `M`, found associated type
   |
   = note: expected associated type `<M as Monad>::This<_>`
              found associated type `<<M as Monad>::This<B> as Monad>::This<_>`
```

ようするに`flat_map`したあとの型が`self`の型と一致しているかが定かではないためこのようにコンパイルエラーとなってしまってうまくいかない。
今`mb.flat_map`の返り値の型は`mb: <M as Monad>::This<B>`の`flat_map`なので`<<M as Monad>::This<B> as Monad>::This<C>`を求めることになる。ところが`M::pure_m(f(a, b))`の型は`<M as Monad>::This<C>`であるため型エラーとなってしまっている。

```rust
mb.flat_map(|b: B| -> <<M as Monad>::This<B> as Monad>::This<C> {
    M::pure_m(f(a, b)) // -> <M :: Monad>::This<C>
})
```

複雑なassociated typeが多くなってきたので、下記の表で整理する。

| 型                                          | 意味                                                      | 
| ------------------------------------------- | --------------------------------------------------------- | 
| `<M as Monad>::This<B>`                     | `mb`の型                                                  | 
| `<M as Monad>::This<C>`                     | `self.flat_map<C, _>`の返り値、または`M::pure_m<C>`の返り値 | 
| `<<M as Monad>::This<B> as Monad>::This<C>` | `mb.flat_map<C, _>`の返り値                               | 

そして、`M: Monad`が`Applicative`を`impl`するためには任意の型`B`,`C`において下の型の等価が必要とされている。

```rust
<<M as Monad>::This<B> as Monad>::This<C> == <M :: Monad>::This<C>
```

しかし実はこの`Monad`トレイトは下記のような穴があり、次のような変な`impl`を作ることができてしまう。

```rust
impl<A> Monad<A> for Option<A> {
    type A = A;
    type This<B> = Result<A, Error>; // 😇 😇 😇 😇 
}
```

したがって少なくとも`Monad`トレイト制約では`flat_map`後の`This`が同一かどうかを確定させられないため、Rustコンパイラーはこのような`Monad`から`Applictaive`導出を許可してくれない。

# 余談

このページ👇では早々にGATsでモナド（記事では`Functor`）のような高階多相型（Higer-kinded types）の模倣はできないことを指摘している[^jackh726]。

- https://jackh726.github.io/rust/2022/05/04/a-shiny-future-with-gats.html

[^jackh726]: そして、このような👇文法を提案していたりもする。
    ```rust
    trait Monad where Self<A> {
        fn flat_map<F, B>(self, f: F) -> Self<B>
        where
            F: FnOnce(A) -> Self<B>;
    }
    ```

# まとめ

Rust 1.65のGATsのニュースでこれはモナドなどをつくっていけるかと思ったが、少なくともこの路線で簡単に作れるということはないようだ。筆者はかつてモナドは万能な副作用の抽象化方法だと思っていたが、RustやSwiftなどを書くようになった今はプログラム言語に高階多相を要求するのが大きな障壁となるとも思っている。
