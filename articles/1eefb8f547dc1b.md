---
title: "Rustで型レベルプログラミング"
emoji: "🆎"
type: "tech"
topics: ["rust", "関数型プログラミング"]
published: true
---

# はじめに

通常のプログラムは実行時（ランタイム）に`1 + 1`など様々な計算を行う。一方でコンパイラーを持つ言語では、コンパイラーの型検査やジェネリクスなどの機構を利用して、コンパイル時にも計算を行うことができる。このようなプログラミングを、コンパイル時に検査・推論される“型”[^type]に注目して**型レベルプログラミング**と呼ばれる。
ランタイムの計算の中にはたとえば`while(1);`のような簡単な計算で無限ループといった停止しない状況に陥いることがある。コンパイル時にできる計算でこのように無限ループに陥いってコンパイルが停止しなくなってしまったら、プログラムを実行することなく自明なエラー（型があってないとか、Rustであれば`free`するタイミングが自明でないなど）を検出しようというモチベーションが崩壊してしまう。したがってコンパイル時にできる計算とはランタイムに比べて非常に限定された計算しか許可されておらず、そうすることでコンパイルが停止しなくなったり異常に長い時間が生じてしまうというようなランタイムと区別がつきにくくなる状況を防いでいる。
この記事ではRustを使って、このような限定された型レベルプログラミングをやってみる例を紹介する。記事で紹介するプログラムの全体は下記のGitHubリポジトリーで公開している。

- https://github.com/y-yu/rust-type-level-programming-introduction

この記事を読んで改善するところなどがあれば、気軽にコメントで教えてほしい。

[^type]: プログラム言語にある型には、この記事で主に利用するようなプログラムの安全性を実行前（コンパイル時）に検証するという目的の他に、ランタイム時に「データ構造はメモリをどのように・どれくらい確保するか」といった効率化のような目的の、少なくとも2つが含まれていると筆者は考えている。この記事ではあまり後者の性質に注目しないが、筆者は後者の性質も前者の性質と同じくらい意義があると考えている。


# 型レベルブール値

通常のブール値といえば`bool`型で値は`true`/`false`となっているが、型レベル値とは型の時点で`true`/`false`の区別ができなくてはならない。したがってRustプリミティブの`bool`は型の時点では`true`/`false`を区別できないため、型レベルプログラミングには使えない。

## 型レベルで区別されるブール値`TTrue`/`TFalse`

次のように型で区別できる構造体`TTrue`/`TFalse`を定義する。

```rust
#[derive(Default, Debug)]
pub struct TTrue;

#[derive(Default, Debug)]
pub struct TFalse;
```

これらはこの時点で型としては全く関係ない2つの構造体である。これを次のトレイト`TBool`[^default]とそれの`impl`を定義する。

```rust
pub trait TBool: Default {
    fn as_bool(&self) -> bool;
}

impl TBool for TTrue {
    fn as_bool(&self) -> bool {
        true
    }
}
impl TBool for TFalse {
    fn as_bool(&self) -> bool {
        false
    }
}
```

[^default]: `TBool`が`Defalut`を要請しているのは必須でないが、このあとのデバッグを便利にするために付けておいてある。

トレイト`TBool`はメソッド`as_bool(&self) -> bool`を要請していて、これによって型レベルブーリアンをランタイムの値に変換したくなったときに便利になる。
ここまでの時点では何が便利なのか分からないかもしれないが、とりあえずこれで型ブーリアンを作ることができた。

## 型レベルAND演算

ブーリアンの演算として有名なものといえばANDであると思う。ANDは2つのブール値を引数にして次の表[^lhs_rhs]のような1出力をする論理演算である。

| LHS     | RHS     | Output  |
|---------|---------|---------|
| `true`  | `true`  | `true` |
| `true`  | `false` | `false` |
| `false` | `true`  | `false` |
| `false` | `false` | `false` |


[^lhs_rhs]: _LHS_ とは _Left Hand Side_ のことで、同様に _RHS_ は _Right Hand Side_ のことである。この略記は型パラメーター名としてこの記事でもしばしば利用する。

このようなAND演算を型レベルで行ってみる。まずはANDに対応するトレイト`TAnd`を定義する。

```rust
pub trait TAnd<RHS: TBool> {
    type Output: TBool;
}
```

あとはこれの`impl`を`TTrue`/`TFalse`について作ってやればよい。これは次のように場合分けすると考えやすい。

1. 左辺（= `Self`）が`TFalse`の場合、結果は常に`TFalse`なので
    ```rust
    impl<RHS: TBool> TAnd<RHS> for TFalse {
        type Output = TFalse;
    }
    ```
2. 左辺が`TTrue`の場合は`Output = RHS`なので
    ```rust
    impl<RHS: TBool> TAnd<RHS> for TTrue {
        type Output = RHS;
    }
    ```

これを全部定義したら、型レベルの計算でどんな値が生成されたか、次のように試してみる。

```rust
#[test]
#[allow(non_snake_case)]
fn 型レベルのAND演算の結果が正しい() {
    assert!(<TTrue as TAnd<TTrue>>::Output::default().as_bool());
    assert!(! <TTrue as TAnd<TFalse>>::Output::default().as_bool());
    assert!(! <TFalse as TAnd<TTrue>>::Output::default().as_bool());
    assert!(! <TFalse as TAnd<TFalse>>::Output::default().as_bool());
}
```

このコードはたとえば`<TTrue as TAnd<TTrue>>::Output`が型`TTrue`になることがコンパイル時に確定しており、ランタイムに`<TTrue as TAnd<TTrue>>::Output`が何になるか？というのを計算しているわけではないことが重要である。ランタイムに行われることは`TTrue::default()`で実際の値がインスタンシエイトされて表示されるのみであり、この記事で定義してきた`TAnd`の計算はランタイムの時点では終了している。

## 型レベルOR演算

`TAnd`と同じように`TOr`も次のように定義することができる。

```rust
pub trait TOr<RHS: TBool> {
    type Output: TBool;
}

impl<RHS: TBool> TOr<RHS> for TFalse {
    type Output = RHS;
}
impl<RHS: TBool> TOr<RHS> for TTrue {
    type Output = TTrue;
}
```

```rust
#[test]
#[allow(non_snake_case)]
fn 型レベルのOR演算の結果が正しい() {
    assert!(<TTrue as TOr<TTrue>>::Output::default().as_bool());
    assert!(<TTrue as TOr<TFalse>>::Output::default().as_bool());
    assert!(<TFalse as TOr<TTrue>>::Output::default().as_bool());
    assert!(! <TFalse as TOr<TFalse>>::Output::default().as_bool());
}
```

このOR演算は後で利用する。

# 型レベル自然数

ここまでで型レベルのブール値が作れた。ブール値は`true`/`false`の2種類しか元（要素）が存在しないが、一方で自然数は$0$から[^nat_in_zero]無限に考えることができる。このように元の数が限定されていないような構造を型レベルで表現する[^compiler_limit]。

[^compiler_limit]: 実際にはRustのコンパイラーがコンパイル時の型の再帰数に制限をかけているため、無限というわけにはいかない。

## 型レベル自然数と型パラメーターを取る型

まずは次のようなトレイト`TNat`[^nat]を作成する。

[^nat_in_zero]: ここでは自然数に$0$を含むものとする。

[^nat]: _Nat_ とは _Natural_ の略であり自然数を意図している。

```rust
pub trait TNat: Default {
    type IsZero: TBool;
    fn as_int(&self) -> i32;
}
```

`TNat`ではさっそく先ほど作った`TBool`をassociated type`IsZero`として使っている。これによって型レベル自然数が$0$かどうか？を型レベルで判定することができる。
そして次のような2つの構造体`TZero`/`TSucc`[^successor]を定義する。

```rust
#[derive(Default, Debug)]
pub struct TZero;

#[derive(Default, Debug)]
pub struct TSucc<N: TNat>(N);
```

[^successor]: _Succ_ は _Successor_ の略で「その次」みたいな意味となる。

`TZero`は数字の$0$に対応しており、`TFalse`や`TTrue`と同じようにフィールドのない構造体となるが、一方で`TSucc`は1つの型パラメーター`N: TNat`を取る。`TSucc`は「`N`を1つ進める（= $1 + N$）」というような意味になる。例としていくつかの自然数を表現すると次のようになる。

| 自然数 | 型レベル表現 | 
|:-------:|------------|
| $0$   | `TZero`    |
| $1$   | `TSucc<TZero>` |
| $2$   | `TSucc<TSucc<TZero>>`  |
| $5$   | `TSucc<TSucc<TSucc<TSucc<TSucc<TZero>>>>>` |

実際上のプログラムでも`Option<T>`や`Result<A, E>`のように型パラメーターを取る型[^type_constructor]は便利に利用されているが、`TSucc<TSucc<TSucc<TSucc<TSucc<TZero>>>>>`のように何重にも入れ子になっているのは珍しいと思う。型レベルで自然数$N$を作るときには、この`TSucc`を$N$重に入れ子にすることで達成するという仕組みになる。
さて`TZero`/`TSucc`に対して`TNat`の`impl`を次のように作る必要がある。

[^type_constructor]: `TSucc<N>`のように型パラメーターを取る型を、型を取らない`i32`や`TZero`のような型と区別して“型コンストラクター”と呼ぶこともある。

```rust
impl TNat for TZero {
    type IsZero = TTrue;

    fn as_int(&self) -> i32 {
        0
    }
}

impl<N: TNat> TNat for TSucc<N> {
    type IsZero = TFalse;

    fn as_int(&self) -> i32 {
        N::default().as_int() + 1
    }
}
```

`TZero`のケースは自明だとして、`TSucc<N>`のケースについて少し考えてみる。`TSucc<N>`とは$1 + N$と同じ意味となるので、型`N`な値の`.as_int`で`i32`な（型レベルではなくてランタイムの）値を取り出してそれに`+1`すればOKとなる。

そして、このあと色々使うので、次のように型レベル自然数をまとめて作っておく。

```rust
pub type TOne = TSucc<TZero>;
pub type TTwo = TSucc<TOne>;
pub type TThree = TSucc<TTwo>;
pub type TFour = TSucc<TThree>;
pub type TFive = TSucc<TFour>;
pub type TSix = TSucc<TFive>;
pub type TSeven = TSucc<TSix>;
pub type TEight = TSucc<TSeven>;
```

## 型レベル加算

`TBool`で型レベルな値を作ったあとには型レベルのAND演算である`TAnd`を作成したのと同じように、まずは型レベル自然数`TNat`の足し算であるトレイト`TAdd`を作っていく。

```rust
pub trait TAdd<RHS: TNat>: TNat {
    type Output: TNat;
}
```

トレイトの内容は`TAnd`や`TOr`とほぼ変わらず、右辺の型レベル自然数となる`RHS: TNat`を受けとり、左辺（= `Self`）との加算結果が`Output`になる形となる。また`TAnd`のときは簡単のためにやらなかったが、自然数と自然数を足し算した結果も自然数であろうから`TAdd: TNat`とする。
そして`impl`は次のようになる。

```rust
impl<RHS: TNat> TAdd<RHS> for TZero {
    type Output = RHS;
}

impl<RHS: TNat, N: TAdd<RHS>> TAdd<RHS> for TSucc<N> {
    type Output = TSucc<<N as TAdd<RHS>>::Output>;
}
```

これは次のように場合わけできる。

1. `Self`が`TZero`のケースの場合、$0 + RHS = RHS$より`Output = RHS`とすればよい
2. `Self`が`TSucc<N>`の場合
    - `N: TAdd<RHS>`より$N + RHS = \left< N\; \texttt{as}\; \texttt{TAdd}\left<RHS\right> \right>\texttt{::Output}$となる
    - これを前提に$\texttt{TSucc}\left<N\right> + RHS$の結果は$\texttt{TSucc}\left<\left< N\; \texttt{as}\; \texttt{TAdd}\left<RHS\right> \right>\texttt{::Output}\right>$となる

これは数学的帰納法の証明に似ている。（1）が帰納法のベースステップで、少々複雑な（2）は$N + RHS = k$と仮定して$(N + 1) + RHS = 1 + k = 1 + (N + RHS)$という帰納ステップのように考えられなくもない。
次のようなテストを書いて確かめられる。

```rust
#[test]
fn 型レベルの加算の結果が正しい() {
    assert_eq!(
        0, <TZero as TAdd<TZero>>::Output::default().as_int()
    );
    assert_eq!(
        1, <TZero as TAdd<TOne>>::Output::default().as_int()
    );
    assert_eq!(
        2, <TOne as TAdd<TOne>>::Output::default().as_int()
    );
    type TTwo = <TOne as TAdd<TOne>>::Output;
    type TFive = <<TTwo as TAdd<TTwo>>::Output as TAdd<TOne>>::Output;
    assert_eq!(
        10, <TFive as TAdd<TFive>>::Output::default().as_int()
    );
}
```

## 型レベル自然数の同値

足し算ができたので、次は型レベル自然数の同値を実装する。自然数の同値にはいくつかの定義があると思われるが、ここでは2つの自然数$n, m$があったときに$n - m = m - n = 0$であれば同値という作戦でいくことにする。ここでは便宜上で`-`という引き算の記号を利用したが、たとえば$5 - 6 = -1$のようにマイナス記号の右辺が左辺より大きいと答えが自然数から逸脱してしまう。ここではあくまで同値に使えればOKという実用上の理由から$n > m$において$m - n$は一律で$0$にしてしまうという定義でいくことにする。

### 自然数の減算（？）

まずはこのような自然数の引き算を行う`TSub`を次のように定義する。

```rust
pub trait TSub<RHS: TNat>: TNat {
    type Output: TNat;
    type IsZero: TBool;
}
```

このあとの等価を作るときに備えて、associated type`IsZero`定義しておく。
そして`impl`が衝突しないように注意して定義していく。

1. 右辺が`TZero`の場合`Output = LHS`
    ```rust
    impl<LHS: TNat> TSub<TZero> for LHS {
        type Output = LHS;
        type IsZero = <LHS as TNat>::IsZero;
    }
    ```
2. 左辺が`TZero`だが右辺が`TZero`より大きい`TSucc<N>`（= $1 + N$）場合、上記の実用上の理由（？）により`Output = TZero`とする
    ```rust
    impl<N: TNat> TSub<TSucc<N>> for TZero {
        type Output = TZero;
        type IsZero = TTrue;
    }
    ```
3. その他の場合、右辺・左辺から1つずつ数を減らしていく
    ```rust
    impl<N: TNat, M: TSub<N>> TSub<TSucc<N>> for TSucc<M> {
        type Output = <M as TSub<N>>::Output;
        type IsZero = <<M as TSub<N>>::Output as TNat>::IsZero;
    }
    ```

結果は次のように確かめられる。

```rust
#[test]
fn 型レベルの減算の結果が正しい() {
    // 1 - 1
    assert_eq!(
        0, <TOne as TSub<TOne>>::Output::default().as_int()
    );
    // 6 - 5
    assert_eq!(
        1, <TSix as TSub<TFive>>::Output::default().as_int()
    );
}
```

### 型レベル自然数の同値判定: `TEqual`

これで次のようなトレイト`TEqual`を定義できる。

```rust
pub trait TEqual<RHS: TNat> {
    type Output: TBool;
}
```

これの`impl`はさきほど作った`TSub`と`TAnd`を使うことで達成できる。

```rust
impl<N: TNat, M: TNat, Out1: TBool, Out2: TBool> TEqual<N> for M
where
    N: TSub<M, IsZero = Out1>,
    M: TSub<N, IsZero = Out2>,
    Out1: TAnd<Out2>
{
    type Output = <Out1 as TAnd<Out2>>::Output;
}
```

これは大量に型パラメーターがあって複雑だが、型パラメーターを次のように分類すると理解しやすいかもしれない（？）。

1. トレイトの型パラメーターとして用いられている型パラメーター`N`, `M`
2. トレイトのassociated typeへの代入として用いられている型パラメーター`Out1`, `Out2`

（1）のような型パラメーターは普段いわゆるジェネリクスという名前で使われるようにトレイト制約を満す範囲で任意の型であることを示していて、つまりは$\forall.\texttt{N}, \texttt{M}$のような意味となる。一方でassociated typeの代入用の型である`Out1`,`Out2`は$\exists.\texttt{Out1}, \texttt{Out2}$というようなイメージとなる。
この`TEqual`をいくつかの例で試してみると次のように上手く動作する。

```rust
#[test]
fn 型レベルの等価の結果が正しい() {
    assert!(<TZero as TEqual<TZero>>::Output::default().as_bool());
    assert!(!<TOne as TEqual<TZero>>::Output::default().as_bool());
    assert!(<TEight as TEqual<<TFive as TAdd<TThree>>::Output>>::Output::default().as_bool());
}
```

# 型レベルリスト

`TSucc<N: TNat>`のような再帰的な型を作ることで、自然数のような元の数が限定されないような構造も型レベルで表現できることが分かった。この`TSucc`では型パラメーターとして取る型`N`が`TNat`に限定されていたが、これとは別に任意の型も受け取れるようにしてみようというのが次のような`HList`[^hlist][^not_default]である。

```rust
pub trait HList { }

#[derive(Default, Debug)]
pub struct HNil;
#[derive(Debug)]
pub struct HCons<H, L: HList>(H, L);

impl HList for HNil { }
impl<H, L: HList> HList for HCons<H, L> { }
```

[^hlist]: `HList`とは _Heterogeneous List_ のことである。

[^not_default]: `HCons`が任意の型を取る関係で`HCons: Default`とすることは難しいため`HList`からも`Default`を外した。

`HNil`は`TZero`と変わらないが、`HCons`は自らである`L: HList`の他に任意の型`H`もあわせて持つようになっている。これによってタプルのように任意の型の値を何個でも持てるようになった。

```rust
#[test]
fn いろいろな型を入れることができる() {
    let _: HCons<TThree, HCons<TTwo, HCons<TOne, HCons<TZero, HNil>>>> =
        HCons(TThree::default(), HCons(TTwo::default(), HCons(TOne::default(), HCons(TZero::default(), HNil::default()))));
}
```

## `HList`に含まれる型レベル自然数を検索

さて、ここまでの型レベルプログラミングを駆使して`HList`に対する型レベル要素検索を作っていく。型レベル要素検索とは型レベルリストに狙ったデータが入っていれば`TTrue`となり、入っていなければ`TFalse`となるような演算である。トレイト`TContains`は次のようになる。

```rust
trait TContains<N: TNat>: HList {
    type Output: TBool;
}
```

`TContains<N: TNat>`は`Self: HList`から`N: TNat`を検索する。`HList`にはどのような型を入れてもいいわけだが、実装上の都合[^type_level_equal]で検索対象となる型レベルデータ`N`は`TNat`に限定する。
`TContains<N: TNat>`は`Self: HList`に型レベル自然数`N`が含まれていれば`Output = TTrue`となり、そうでなければ`TFalse`となる。

[^type_level_equal]: `TNat`に対して定義した型レベルのイコールである`TEqual`のようなものが任意の型の間で定義できない。検索には型レベルの等価判定が必要なので、ここでは`TNat`に限定した。

型レベルかどうかはともかくとして、リストに要素が含まれるかどうか？を検査するためには、`TEqual`のように次のような場合分けが必要となる。

1. リストが空の場合は含まれない
2. リストが空ではない場合、
    1. 先頭の要素が検索対象と等しい場合、リストの残りに関係なく含まれる
    2. そうでない場合、リストから先頭を取り除いた残りの結果を利用する

（1）のケースは自明なので、（2）について考える。`N: TEqual<M>`のときは$N - M = M - N = 0$のような計算で`TAnd`を利用したが、今回はリストの先頭かあるいは残りのいずれか含まれていればOKなので`TOr`を利用すればよい。したがって次のようになる。

1. `Self`が`HNil`の場合は常に`Output = TFalse`
    ```rust
    impl<N: TNat> TContains<N> for HNil {
        type Output = TFalse;
    }
    ```
2. `Self`が`HCons<H, L>`の場合、先頭の等価チェック結果と先頭以外の`TContains`結果のORを取る
    ```rust
    impl<
        E: TNat,
        H: TNat,
        L: HList,
        Out1: TBool,
        Out2: TBool
    > TContains<E> for HCons<H, L>
    where
        E: TEqual<H, Output = Out1>,
        L: TContains<E, Output = Out2>,
        Out1: TOr<Out2>
    {
        type Output = <Out1 as TOr<Out2>>::Output;
    }
    ```

次のようにいくつかのテストで正しく結果を返すことができる。

```rust
#[test]
#[allow(non_snake_case)]
fn TContainsのテスト() {
    type OneTwoThree = HCons<TOne, HCons<TTwo, HCons<TThree, HNil>>>;

    assert!(
        <OneTwoThree as TContains<TOne>>::Output::default().as_bool()
    );
    assert!(
        ! <OneTwoThree as TContains<TZero>>::Output::default().as_bool()
    );
}
```

# まとめ

Rustはこのように（実際のプロダクトで利用するかはともかく）型レベルプログラミングを楽しむことができる。この記事ではマクロを利用しなくてもいいように巧妙に例を選んだつもりだが、実際このような型レベルでかつ役に立つプログラムを作ろうとすると、マクロの利用は避けられないかもしれない。
個人的な考えとしてマクロは便利な反面でシンタックスを創造してしまう側面もあり、できることならRustコンパイラーが持つコード生成の仕組みを最大限に利用したい。

# 謝辞

この記事を書くにあって、[@yasuo_ozu](https://twitter.com/yasuo_ozu)さんにRustの型レベルプログラミングについて「どこまでをマクロなしで達成できるか？」という点について詳しく教えていただいた。`impl`を定義する時にassociated typeに代入するものと型パラメーターとして与えるものの差など重要な知見を頂けたことに感謝したい。
