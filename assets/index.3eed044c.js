var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,l=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,n=(e,n)=>{for(var i in n||(n={}))r.call(n,i)&&l(e,i,n[i]);if(t)for(var i of t(n))a.call(n,i)&&l(e,i,n[i]);return e};import{q as i,R as o,r as s,u as c,a as m,W as d,t as u,b as p}from"./vendor.d44df2d1.js";let g;const h={},E=e=>o.createElement(_,{className:"error-message"},o.createElement("div",{className:"error-message__inner"},o.createElement("img",{src:"https://twemoji.maxcdn.com/2/svg/1f63f.svg",alt:"",width:90,height:90,className:"error-message__icon"}),o.createElement("div",{className:"error-message__text"},e.message||"エラーが発生しました"))),_=i.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .error-message__inner {
    transform: translateY(-25%);
    padding: 1rem;
  }
  .error-message__icon {
    display: block;
    margin: 0 auto;
  }
  .error-message__text {
    margin-top: 1.7rem;
    text-align: center;
    font-weight: 700;
    font-size: 1.4rem;
  }
`;class v extends o.Component{constructor(){super(...arguments),this.state={error:null}}componentDidCatch(e){const t=s.isLocationNotFoundError(e)?"NotFound":"Unknown";this.setState({error:t})}render(){if(null===this.state.error)return this.props.children;const e="NotFound"===this.state.error?"ページが見つかりませんでした":"原因不明のエラーが発生しました";return o.createElement(E,{message:e})}}const b=e=>{var t;return"rawHtml"in e?(null==(t=e.rawHtml)?void 0:t.length)?o.createElement("div",{className:"znc",dangerouslySetInnerHTML:{__html:e.rawHtml}}):o.createElement(f,null,"本文を入力してください"):o.createElement("div",{className:"znc"},e.children)},f=i.div`
  text-align: center;
  font-size: 1.1rem;
  color: var(--c-gray);
`,y=i.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 1.8rem;
  @media (max-width: 468px) {
    padding: 0 1rem;
  }
`;async function x(e){const t=await fetch(e);if(!t.ok){const e=new Error("An error occurred while fetching the data."),r=await t.json();throw e.message=r.message,e}return t.json()}function k(e,t){return c(e,x,t)}function w(e){m.exports.useEffect((()=>{e&&(document.title=e)}),[e])}const N=()=>{const{data:e}=k("/api/cli-version",{revalidateOnFocus:!1,revalidateOnReconnect:!1});return e?!1===e.updateAvailable?null:o.createElement(C,{className:"update-notification-bar"},o.createElement(y,null,o.createElement("div",{className:"update-notification-bar__inner"},o.createElement("div",{className:"update-notification-bar__icon"},"!"),o.createElement("div",{className:"update-notification-bar__text"},"新しいバージョンがリリースされています。",o.createElement("code",null,"npm install zenn-cli@latest"),"で更新してください")))):null},$=d`
  from {
   opacity: 0;
   transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,C=i.div`
  .update-notification-bar__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 1.3rem;
    padding: 0.9rem;
    background: var(--c-primary-bg);
    color: #364757;
    border-radius: 10px;
    animation: ${$} 0.3s ease;
  }

  .update-notification-bar__icon {
    margin-right: 8px;
    content: '!';
    font-weight: 700;
    width: 20px;
    line-height: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    background: var(--c-primary);
    color: #fff;
    font-size: 12px;
  }
  .update-notification-bar__text {
    flex: 1;
    font-size: 14px;
    code {
      display: inline-flex;
      margin: 0 0.2em;
      padding: 0.1em 0.6em;
      font-size: 0.9em;
      background: #cfe6f9;
      border-radius: 5px;
    }
  }
`,z=()=>{const{data:e}=k("/api/local-info"),t=null==e?void 0:e.hasInit;return w("Zenn Editor"),o.createElement(o.Fragment,null,o.createElement(N,null),o.createElement(y,null,o.createElement(F,{className:"home"},o.createElement("h1",{className:"home__title"},o.createElement("img",{src:"/logo.svg",alt:"Zenn Editor",width:300,height:35})),o.createElement("div",{className:"home__content"},o.createElement(b,null,!0===t||void 0===t?o.createElement(o.Fragment,null,o.createElement("h3",null,"📝 記事の作成"),o.createElement("pre",null,o.createElement("code",null,"$ npx zenn"," ",o.createElement("span",{className:"token function"},"new:article"),o.createElement("div",{className:"token comment"},"# 記事のURLの一部となるslugを指定して作成することもできます。",o.createElement("br",null),"$ npx zenn new:article --slug my-awesome-article"))),o.createElement("h3",null,"📘 本の作成"),o.createElement("pre",null,o.createElement("code",null,"$ npx zenn"," ",o.createElement("span",{className:"token function"},"new:book"),o.createElement("div",{className:"token comment"},"# 本のURLの一部となるslugを指定して作成することもできます。",o.createElement("br",null),"$ npx zenn new:book --slug my-awesome-book")))):o.createElement(o.Fragment,null,o.createElement("h3",null,"🔧 セットアップが必要です"),o.createElement("p",null,"まだ",o.createElement("code",null,"articles"),"ディレクトリが作成されていません。以下のコマンドを実行してセットアップを行ってください。"),o.createElement("pre",null,o.createElement("code",null,"$ npx zenn ",o.createElement("span",{className:"token function"},"init"))))),o.createElement("div",{className:"home__learn-more"},o.createElement("div",{className:"home__learn-more-title"},"詳しい使い方はCLIリファレンスをご覧ください"),o.createElement(Ie,{to:"guide",className:"home__link-cli-guide"},"CLIリファレンスを開く"))))))},F=i.article`
  .home__title {
    padding: 2.5rem 0;
    text-align: center;
    border-bottom: solid 1px var(--c-gray-border);
  }
  .home__content {
    padding: 2.5rem 0;
  }
  .home__learn-more {
    margin-top: 3rem;
    padding: 1.8rem 2rem 2.5rem;
    background: var(--c-gray-bg);
    border-radius: 10px;
    text-align: center;
  }
  .home__learn-more-title {
    color: var(--c-gray);
  }
  .home__link-cli-guide {
    margin-top: 1rem;
    display: inline-flex;
    padding: 0.6em 1.5em;
    background: var(--c-primary);
    color: #fff;
    border-radius: 0.45em;
    border: solid 1px rgba(92, 147, 187, 0.15);
    font-size: 0.95rem;
    font-weight: 600;
  }
`,M=e=>o.createElement(V,{style:{margin:e.margin}}),A=d`
  to {
    transform: rotate(360deg);
  }
`,j=d`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,V=i.div`
  display: table;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border: 4px solid var(--c-primary);
  border-radius: 50%;
  border-top-color: var(--c-primary-bg);
  animation: ${A} 0.8s linear infinite, ${j} 0.7s;
`,S=({hash:e})=>{const{data:t,error:r}=k("/api/cli-guide",{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:2}),a=null==t?void 0:t.html;return w("CLIリファレンス"),m.exports.useEffect((()=>{if(!e||!a)return;const t=document.getElementById(e);t?(t.scrollIntoView(),window.scrollBy(0,-30)):console.error(`Couldn't find elements with id="${e}"`)}),[a,e]),r?o.createElement("div",null,r.message):a?o.createElement(o.Fragment,null,o.createElement(y,null,o.createElement(O,{className:"guide"},o.createElement("h1",{className:"guide__title"},"Zenn CLI Reference"),o.createElement("div",{className:"guide__content"},o.createElement(b,{rawHtml:a}))))):o.createElement(M,{margin:"5rem auto"})},O=i.div`
  padding: 3rem 0;
  font-size: 0.94rem;
  .guide__title {
    font-size: 2.4rem;
  }
  .guide__content {
    padding: 1.5rem 0;
  }
`;function R(e){return"string"==typeof e&&e.length>0}const L={isCritical:!0,getMessage:({slug:e})=>function(e){return`slugの値（${e}）が不正です。小文字の半角英数字（a-z0-9）、ハイフン（-）、アンダースコア（_）の12〜50字の組み合わせにしてください`}(e),isValid:({slug:e})=>function(e){return!!e&&/^[0-9a-z\-_]{12,50}$/.test(e)}(e)},I={isCritical:!0,getMessage:()=>"title（タイトル）を文字列で入力してください",isValid:({title:e})=>R(e)},P={isCritical:!0,getMessage:()=>"タイトルは60字以内にしてください",isValid:({title:e})=>!R(e)||e.length<=60},U={isCritical:!0,getMessage:()=>'published（公開設定）を true か false で指定してください（クオテーション " で囲まないでください）',isValid:({published:e})=>"boolean"==typeof e},B={isCritical:!0,detailUrl:"https://zenn.dev/tech-or-idea",detailUrlText:"詳細を開く",getMessage:()=>"type（記事のタイプ）に tech もしくは idea を指定してください。技術記事の場合は tech を指定してください",isValid:({type:e})=>!!e&&("tech"===e||"idea"===e)},H={detailUrl:"https://getemoji.com",detailUrlText:"絵文字を探す",getMessage:()=>"アイキャッチとなる emoji（絵文字）を指定してください",isValid:({emoji:e})=>R(e)},T={isCritical:!0,getMessage:()=>"絵文字（emoji）を1つだけ指定してください",isValid:({emoji:e})=>{if(!R(e))return!0;const t=u(),r=e.match(t);return!(!r||!r[0]||r[1])}},K={isCritical:!0,getMessage:()=>'topics（記事に関連する言語や技術）を配列で指定してください。例）["react", "javascript"]',isValid:({topics:e})=>!!Array.isArray(e)&&e.length>0},D={isCritical:!0,getMessage:()=>"topicsは最大5つまで指定できます",isValid:({topics:e})=>!Array.isArray(e)||e.length<=5},q={isCritical:!0,getMessage:()=>"topicsは全て文字列で指定してください",isValid:({topics:e})=>!Array.isArray(e)||e.every((e=>"string"==typeof e&&e.length>0))},W={getMessage:()=>"topicsに記号やスペースを使用することはできません。例えばC++は「cpp」、C#は「csharp」と記載してください",isValid:({topics:e})=>{if(!Array.isArray(e))return!0;return!e.some((e=>"string"==typeof e&&e.match(/[ -/:-@[-`{-~]/g)))}},Z={getMessage:()=>"tagsではなくtopicsを使ってください",isValid:e=>{var t,r;return!(null==(t=e.tags)?void 0:t.length)&&!(null==(r=e.tag)?void 0:r.length)}},Y={isCritical:!0,getMessage:()=>"summary（本の説明）の記載は必須です",isValid:({summary:e})=>"string"==typeof e&&e.length>0},J={isCritical:!0,getMessage:()=>'price（本の価格）を半角数字で指定してください（クオテーション " で囲まないでください）',isValid:({price:e})=>"number"==typeof e},G={isCritical:!0,getMessage:()=>"price（本の価格）を有料にする場合、200〜5000の間で指定してください",isValid:({price:e})=>"number"!=typeof e||(0===e||e>=200&&e<=5e3)},Q={isCritical:!0,getMessage:()=>"price（本の価格）は100円単位で指定してください",isValid:({price:e})=>"number"!=typeof e||e%100==0},X={getMessage:({slug:e})=>`本のカバー画像（cover.pngもしくはcover.jpg）を「/books/${e}」ディレクトリに配置してください`,isValid:({coverDataUrl:e})=>"string"==typeof e},ee={isCritical:!0,getMessage:e=>"カバー画像のサイズは1MB以内にしてください。現在のサイズ: "+(e.coverFilesize?`${Math.ceil(e.coverFilesize/1e3)}KB`:"取得できませんでした"),isValid:({coverDataUrl:e,coverFilesize:t})=>"string"!=typeof e||"number"==typeof t&&t<=1e6};function te(e,t){return t&&e?Math.round(t/e*10)/10:null}const re={getMessage:e=>{const t=te(e.coverWidth,e.coverHeight);return"カバー画像の「幅 : 高さ」の比率は「1 : 1.4」にすることをおすすめします（最終的に幅500px・高さ700pxにリサイズされます）。"+(t?`現在の比率は「1 : ${t}」です`:"")},isValid:({coverDataUrl:e,coverHeight:t,coverWidth:r})=>{if("string"!=typeof e)return!0;const a=te(r,t);return"number"==typeof a&&1.4===a}},ae={isCritical:!0,getMessage:()=>"config.yamlの chapters の指定に誤りがあります",detailUrl:"https://zenn.dev/zenn/articles/zenn-cli-guide#%F0%9F%93%84-config.yaml",isValid:({specifiedChapterSlugs:e})=>void 0===e||Array.isArray(e)&&e.every((e=>"string"==typeof e))},le={isCritical:!0,getMessage:()=>"chapters に指定する文字列には拡張子（.md）を含めないでください。ファイル名が example.md であれば example とのみ記載してください",detailUrl:"https://zenn.dev/zenn/articles/zenn-cli-guide#%F0%9F%93%84-config.yaml",isValid:({specifiedChapterSlugs:e})=>{if(!Array.isArray(e))return!0;return!e.some((e=>"string"==typeof e&&e.match(/\.md$/)))}},ne={isCritical:!0,getMessage:({slug:e})=>function(e){return`チャプターのslugの値（${e}）が不正です。小文字の半角英数字（a-z0-9）、ハイフン（-）、アンダースコア（_）の1〜50字の組み合わせにしてください`}(e),isValid:({slug:e})=>function(e){return!!e&&(/^[0-9a-z\-_]{1,50}$/.test(e)||/^[0-9]+.[0-9a-z\-_]{1,50}$/.test(e))}(e)},ie={isCritical:!0,getMessage:()=>"free（無料公開設定）には true もしくは falseのみを指定してください",isValid:({free:e})=>void 0===e||"boolean"==typeof e};function oe(e,t){return t.reduce(((t,r)=>(r.isValid(e)||t.push({isCritical:!0===r.isCritical,message:r.getMessage(e),detailUrl:r.detailUrl,detailUrlText:r.detailUrlText}),t)),[])}const se=({topics:e})=>o.createElement(ce,{className:"topic-list"},e.map(((e,t)=>o.createElement("span",{className:"topic-list__item",key:`topic-${t}`},e)))),ce=i.div`
  margin-top: -${"3px"};
  .topic-list__item {
    display: inline-flex;
    color: var(--c-gray);
    font-size: 0.9em;
    border: solid 1px var(--c-gray-border);
    background: #fff;
    padding: 0.1em 0.4em;
    border-radius: 5px;
    margin: ${"3px"} 6px ${"3px"} 0;
  }
`,me=e=>o.createElement(de,{className:"property-row"},o.createElement("div",{className:"property-row__title"},e.title),o.createElement("div",{className:"property-row__content"},e.children)),de=i.div`
  display: flex;
  font-size: 0.92rem;
  color: var(--c-gray);
  & + .property-row {
    margin-top: 0.5rem;
  }
  .property-row__title {
    font-weight: 700;
    width: 140px;
  }
  .property-row__content {
    flex: 1;
  }
`,ue=({message:e,isCritical:t,detailUrl:r,detailUrlText:a})=>o.createElement(pe,{className:"validation-error-row "+(t?"validation-error-row--critical":"")},o.createElement("span",{className:"validation-error-row__icon"},o.createElement("img",{src:"/icons/error-exclamation.svg",width:12,height:12,alt:"エラー"})),o.createElement("div",{className:"validation-error-row__message"},e,"string"==typeof r&&o.createElement("a",{className:"validation-error-row__link",href:r,target:"_blank",rel:"nofollow noreferrer"},a||"詳細を見る",o.createElement("img",{src:"/icons/open.svg",width:12,height:12,alt:"別タブで開く"})))),pe=i.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.5rem;
  .validation-error-row__icon {
    margin-top: 2px;
    content: '!';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: ${"#ff9715"};
    color: #fff;
    border-radius: 50%;
  }
  .validation-error-row__message {
    flex: 1;
    color: var(--c-gray);
    font-size: 14px;
    margin-left: 7px;
  }
  .validation-error-row__link {
    margin-left: 6px;
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: var(--c-gray-border);
  }
  &.validation-error-row--critical {
    .validation-error-row__message {
      /* color: var(--c-error); */
    }
    .validation-error-row__icon {
      background: var(--c-error);
    }
  }
`,ge=({validationErrors:e})=>{const{criticalErrors:t,warnings:r}=m.exports.useMemo((()=>e.reduce(((e,t)=>(e[t.isCritical?"criticalErrors":"warnings"].push(t),e)),{criticalErrors:[],warnings:[]})),[e]);return e.length?o.createElement(he,{className:"validation-error"},t.length>0&&o.createElement("div",{className:"validation-error__critical"},o.createElement("div",{className:"validation-error__title validation-error__title--critical"},t.length,"件のエラーがあります"),t.map(((e,t)=>o.createElement(ue,n({key:`validation-error-${t}`},e))))),r.length>0&&o.createElement("div",{className:"validation-error__warnings"},o.createElement("div",{className:"validation-error__title"},r.length,"件の修正をおすすめします"),r.map(((e,t)=>o.createElement(ue,n({key:`validation-error-${t}`},e)))))):null},he=i.div`
  padding: 1.2rem 1.4rem 1.3rem;
  background: #fff;
  border-radius: 10px;
  .validation-error__title {
    font-size: 0.95rem;
    color: ${"#ff9715"};
    font-weight: 700;
  }
  .validation-error__title--critical {
    color: var(--c-error);
  }
  .validation-error__critical + .validation-error__warnings {
    margin-top: 1.2rem;
  }
`,Ee=({article:e})=>{const t=m.exports.useMemo((()=>(e=>oe(e,[L,I,P,U,B,T,H,K,Z,W,D,q]))(e)),[e]);return o.createElement(_e,null,o.createElement(y,null,"string"==typeof e.emoji&&o.createElement("div",{className:"article-header__emoji"},e.emoji),o.createElement("h1",{className:"article-header__title"},e.title||"titleを指定してください"),o.createElement("div",{className:"article-header__properties"},o.createElement(me,{title:"slug"},e.slug),o.createElement(me,{title:"published"},"boolean"==typeof e.published?o.createElement(o.Fragment,null,e.published?"true（公開）":"false（下書き）"):"true もしくは false を指定してください"),o.createElement(me,{title:"type"},"tech"===e.type?"tech（技術記事）":o.createElement(o.Fragment,null,"idea"===e.type?"idea（アイデア）":"tech もしくは idea を指定してください")),o.createElement(me,{title:"topics"},Array.isArray(e.topics)&&e.topics.length?o.createElement(se,{topics:e.topics}):"指定が必要です")),!!t.length&&o.createElement("div",{className:"article-header__validation-errors"},o.createElement(ge,{validationErrors:t}))))},_e=i.header`
  padding: 3.3rem 0;
  background: var(--c-gray-bg);
  .article-header__emoji {
    margin-top: -0.5em;
    font-size: 56px;
    color: #000;
  }
  .article-header__title {
    font-size: 1.9rem;
  }
  .article-header__properties {
    margin-top: 1rem;
  }
  .article-header__validation-errors {
    margin-top: 1.4rem;
  }
`,ve=m.exports.createContext({reloadedAt:0}),be=e=>{const[t,r]=m.exports.useState(0);return m.exports.useEffect((()=>{const e=new WebSocket(`ws://${window.location.host}`);return e.onmessage=()=>{r((new Date).getTime())},()=>{console.log("Disconnecting socket..."),e.close()}}),[]),o.createElement(ve.Provider,{value:{reloadedAt:t}},e.children)};function fe(e){const{reloadedAt:t}=m.exports.useContext(ve);m.exports.useEffect((()=>{0!==t&&e()}),[t])}const ye=({slug:e})=>{const{data:t,error:r,isValidating:a,mutate:l}=k(`/api/articles/${e}`,{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3}),n=null==t?void 0:t.article;return w(`${(null==n?void 0:n.title)||e}のプレビュー`),fe((()=>{l()})),n?o.createElement(o.Fragment,null,o.createElement(Ee,{article:n}),o.createElement(y,null,o.createElement(xe,{className:"article-show"},o.createElement("div",{className:"article-show__content"},o.createElement(b,{rawHtml:n.bodyHtml||""}))))):a?o.createElement(M,{margin:"5rem auto"}):o.createElement(E,{message:null==r?void 0:r.message})},xe=i.div`
  .article-show__content {
    padding: 3rem 0 18rem;
  }
`,ke=({book:e})=>{const t=m.exports.useMemo((()=>(e=>oe(e,[L,I,P,U,K,Z,W,D,q,Y,J,G,Q,X,ee,re,ae,le]))(e)),[e]);return o.createElement(we,null,o.createElement(y,null,o.createElement("div",{className:"book-header__hero"},o.createElement("div",{className:"book-header__cover"},o.createElement("img",{src:e.coverDataUrl||"/images/book-cover.png",className:"book-header__cover-img",alt:"カバー画像のプレビュー",width:"160",height:"224"})),o.createElement("h1",{className:"book-header__title"},e.title||"titleを指定してください")),o.createElement("div",{className:"book-header__properties"},o.createElement(me,{title:"slug"},e.slug),o.createElement(me,{title:"published"},"boolean"==typeof e.published?o.createElement(o.Fragment,null,e.published?"true（公開）":"false（下書き）"):"true もしくは false を指定してください"),o.createElement(me,{title:"price"},"number"==typeof e.price?e.price:"半角数字で指定してください"),o.createElement(me,{title:"topics"},Array.isArray(e.topics)&&e.topics.length?o.createElement(se,{topics:e.topics}):"指定が必要です"),o.createElement(me,{title:"summary"},o.createElement("div",{className:"book-header__summary"},e.summary||"指定が必要です"))),!!t.length&&o.createElement("div",{className:"book-header__validation-errors"},o.createElement(ge,{validationErrors:t}))))},we=i.header`
  padding: 3.3rem 0;
  background: var(--c-gray-bg);
  .book-header__hero {
    display: flex;
    align-items: center;
  }
  .book-header__cover-img {
    background: #fff;
    object-fit: cover;
    box-shadow: 0 9px 20px -9px rgba(0, 27, 68, 0.52),
      0 0 3px rgba(0, 21, 60, 0.1);
    border-radius: 5px;
  }
  .book-header__title {
    flex: 1;
    margin-top: -1em;
    margin-left: 1.2em;
    font-size: 1.8rem;
  }
  .book-header__properties {
    margin-top: 1.5rem;
  }
  .book-header__summary {
    white-space: pre-line;
  }
  .book-header__validation-errors {
    margin-top: 1.4rem;
  }
  @media (max-width: 768px) {
    .book-header__hero {
      display: block;
    }
    .book-header__cover {
      text-align: center;
    }
    .book-header__title {
      margin: 1.7rem 0 0;
      font-size: 1.5rem;
    }
  }
`,Ne=({bookSlug:e,chapters:t,showListNumber:r})=>{const a=r?"ol":"ul";return o.createElement($e,{className:"book-chapter-list"},o.createElement(a,null,t.map((t=>o.createElement("li",{key:`book-chapter-${t.filename}`,className:"book-chapter-list__li"},o.createElement(He,{bookSlug:e,chapterFilename:t.filename,className:"book-chapter-list__link"},t.title||"無題",o.createElement("span",{className:"book-chapter-list__slug"},"（",t.slug||t.filename,"）")))))))},$e=i.div`
  color: var(--c-gray);
  font-weight: 700;
  ul,
  ol {
    margin-left: 1.4em;
    padding-left: 0.2em;
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  .book-chapter-list__li {
    margin: 0.3rem 0;
  }
  .book-chapter-list__link {
    color: var(--c-primary-darker);
    font-weight: normal;
    &:hover {
      text-decoration: underline;
    }
  }
  .book-chapter-list__slug {
    font-size: 0.8em;
    opacity: 0.7;
    text-decoration: none;
  }
`,Ce=({slug:e})=>{const{data:t,error:r,isValidating:a,mutate:l}=k(`/api/books/${e}`,{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3}),n=null==t?void 0:t.book;w(`${(null==n?void 0:n.title)||e}のプレビュー`);const{data:i,error:s,isValidating:c,mutate:d}=k(`/api/books/${e}/chapters`,{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3});fe((()=>{l(),d()}));const u=null==i?void 0:i.chapters,{withPositionChapters:p,withoutPositionChapters:g}=m.exports.useMemo((()=>u?u.reduce(((e,t)=>(e["number"==typeof t.position?"withPositionChapters":"withoutPositionChapters"].push(t),e)),{withPositionChapters:[],withoutPositionChapters:[]}):{withPositionChapters:[],withoutPositionChapters:[]}),[u]);return n?o.createElement(o.Fragment,null,o.createElement(ke,{book:n}),o.createElement(y,null,o.createElement(ze,{className:"book-show"},o.createElement("h2",{className:"book-show__chapters-title"},"Chapters"),c?o.createElement(M,null):o.createElement(o.Fragment,null,s?o.createElement(E,{message:null==s?void 0:s.message}):o.createElement("div",null,!!(null==p?void 0:p.length)&&o.createElement("div",{className:"book-show__chapters"},o.createElement(Ne,{bookSlug:n.slug,chapters:p,showListNumber:!0})),!!(null==g?void 0:g.length)&&o.createElement("div",{className:"book-show__excluded-chapters"},o.createElement("p",{className:"book-chapters__note"},"以下のチャプターはzenn.devへのデプロイ対象に含まれません。本に含めるチャプターの",o.createElement("a",{href:"https://zenn.dev/zenn/articles/what-is-slug",rel:"noopener noreferrer",target:"_blank"},"スラッグ"),"を",o.createElement("code",null,"config.yaml"),"に指定するか、全てのチャプターのファイル名を",o.createElement("code",null,"チャプター番号.スラッグ.md"),"の形式にしてください。",o.createElement("a",{href:"https://zenn.dev/zenn/articles/zenn-cli-guide#%F0%9F%93%84-%E5%90%84%E3%83%81%E3%83%A3%E3%83%97%E3%82%BF%E3%83%BC%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%EF%BC%88%E2%97%AF%E2%97%AF.md%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},"詳しい説明を開く",o.createElement("img",{src:"/icons/open.svg",width:12,height:12,alt:"別タブで開く"}))),o.createElement("div",{className:"book-show__chapters"},o.createElement(Ne,{bookSlug:n.slug,chapters:g,showListNumber:!1})))))))):a?o.createElement(M,{margin:"5rem auto"}):o.createElement(E,{message:null==r?void 0:r.message})},ze=i.div`
  padding: 3rem 0 6rem;

  .book-show__chapters-title {
    font-size: 2rem;
  }
  .book-show__chapters {
    margin-top: 1rem;
    line-height: 1.5;
  }
  .book-show__excluded-chapters {
    margin-top: 2.5rem;
    padding: 1.3rem;
    border: solid 1px var(--c-gray-border);
    border-radius: 10px;
    color: var(--c-gray);
    font-size: 0.95rem;
  }
  .book-chapters__note {
    line-height: 1.8;
    code {
      line-height: 1.2;
      display: inline-flex;
      margin: 0 0.2em;
      padding: 0.2em 0.5em;
      font-size: 0.88em;
      background: var(--c-gray-bg);
      border-radius: 5px;
    }
    a {
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-color: var(--c-gray-border);
    }
  }
`,Fe=({chapter:e,book:t})=>{const r=m.exports.useMemo((()=>(e=>oe(e,[ne,I,P,ie]))(e)),[e]);return o.createElement(Me,null,o.createElement("div",{className:"chapter-header__book"},o.createElement(Be,{slug:t.slug,className:"chapter-header__book-link"},o.createElement("img",{src:"/icons/back.svg",className:"book-header__book-back",alt:"チャプター一覧へ戻る",width:"12",height:"12"}),o.createElement("span",{className:"chapter-header__book-title"},t.title))),o.createElement("div",{className:"chapter-header__main"},o.createElement(y,null,o.createElement("h1",{className:"chapter-header__title"},e.title||"titleを指定してください"),o.createElement("div",{className:"chapter-header__properties"},o.createElement(me,{title:"slug"},e.slug),o.createElement(me,{title:"free"},0===t.price?"本の価格が¥0であるためチャプターは無料公開されます":o.createElement(o.Fragment,null,e.free?"true（無料公開）":"false（購入者のみ閲覧可）"))),!!r.length&&o.createElement("div",{className:"chapter-header__validation-errors"},o.createElement(ge,{validationErrors:r})))))},Me=i.header`
  background: var(--c-gray-bg);
  .chapter-header__book {
    background: rgba(158, 186, 203, 0.3);
    padding: 0.6rem 1rem;
  }
  .chapter-header__book-link {
    display: flex;
    align-items: center;
  }

  .chapter-header__book-title {
    margin-left: 5px;
    flex: 1;
    font-size: 13.5px;
    font-weight: 700;
    color: var(--c-gray);
    &:hover {
      color: var(--c-body);
    }
  }
  .chapter-header__main {
    padding: 2.2rem 0 2.8rem;
  }
  .chapter-header__title {
    font-size: 1.8rem;
  }
  .chapter-header__properties {
    margin-top: 1rem;
  }
  .chapter-header__validation-errors {
    margin-top: 1.4rem;
  }
`,Ae=({bookSlug:e,chapterFilename:t})=>{const{data:r,error:a,isValidating:l,mutate:n}=k(`/api/books/${e}`,{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3}),i=null==r?void 0:r.book,{data:s,error:c,isValidating:m,mutate:d}=k(`/api/books/${e}/chapters/${t}`,{revalidateOnFocus:!1,revalidateOnReconnect:!1,errorRetryCount:3}),u=null==s?void 0:s.chapter;return w(`${(null==u?void 0:u.title)||t}のプレビュー`),fe((()=>{n(),d()})),i?u?o.createElement(o.Fragment,null,o.createElement(Fe,{book:i,chapter:u}),o.createElement(y,null,o.createElement(je,{className:"book-show"},o.createElement("div",{className:"chapter-show__content"},o.createElement(b,{rawHtml:u.bodyHtml||""}))))):m?o.createElement(M,{margin:"5rem auto"}):o.createElement(E,{message:(null==c?void 0:c.message)||`チャプター ${t} のデータを取得できませんでした`}):l?o.createElement(M,{margin:"5rem auto"}):o.createElement(E,{message:(null==a?void 0:a.message)||`本 ${e} のデータを取得できませんでした`})},je=i.div`
  .chapter-show__content {
    padding: 3rem 0 10rem;
  }
`;const Ve=s.Path().any("slug",{action:({slug:e})=>o.createElement(ye,{slug:e})}),Se=s.Path().any("slug",{action:({slug:e})=>o.createElement(Ce,{slug:e})}),Oe=Se.anyRoute.attach(s.Path()).any("chapter_filename",{action:({slug:e,chapter_filename:t})=>{return o.createElement(Ae,{bookSlug:e,chapterFilename:(r=t,unescape(r).replace(/%2E/g,"."))});var r}}),Re=s.SingleHash("hash",{optional:!0}).attach(s.Path()).exact({action:()=>o.createElement(z,null)}).route("guide",(e=>e.action((({hash:e})=>o.createElement(S,{hash:e}))))).route("articles",(e=>e.attach(Ve))).route("books",(e=>e.attach(Oe))),Le=()=>s.useRoutes(Re),Ie=e=>{const t=s.useLocation(),r=m.exports.useMemo((()=>t.pathname===`/${e.to}`&&(!e.hash||t.hash===`#${e.hash}`)),[t]);return o.createElement(s.Link,{route:Re._[e.to],match:{hash:e.hash},className:r?`active ${e.className}`:e.className},e.children)},Pe=e=>{const t=s.useLocation(),r=m.exports.useMemo((()=>t.key===Re.exactRoute.key),[t]);return o.createElement(s.Link,{route:Re.exactRoute,className:r?`active ${e.className}`:e.className},e.children)},Ue=e=>{const t=s.useLocation(),r=m.exports.useMemo((()=>t.pathname===`/articles/${e.slug}`),[t]);return o.createElement(s.Link,{route:Ve.anyRoute,match:{slug:e.slug},className:r?`active ${e.className}`:e.className},e.children)},Be=e=>{const t=s.useLocation(),r=m.exports.useMemo((()=>t.pathname===`/books/${e.slug}`),[t]);return o.createElement(s.Link,{route:Se.anyRoute,match:{slug:e.slug},className:r?`active ${e.className}`:e.className},e.children)},He=e=>{const t=s.useLocation(),r=(a=e.chapterFilename,escape(a.replace(/\./g,"%2E")));var a;const l=m.exports.useMemo((()=>t.pathname===`/books/${e.bookSlug}/${r}`),[t]);return o.createElement(s.Link,{route:Oe.anyRoute,match:{slug:e.bookSlug,chapter_filename:r},className:l?`active ${e.className}`:e.className},e.children)};function Te({cacheKey:e,defaultValue:t}){const r=m.exports.useMemo((()=>{const r=function(e){const t=localStorage.getItem(e);if(!t)return null;const r=JSON.parse(t);if("object"!=typeof r||null===r)return function(e){localStorage.removeItem(e)}(e),null;return r.value}(e);return null===r?t:typeof r!=typeof t?(console.log(`Persisted value type(${typeof r}) is invalid. It must be ${typeof t}`),localStorage.removeItem(e),t):r}),[]),[a,l]=m.exports.useState(r);return[a,function(t){l(t),function(e,t){const r={value:t},a=JSON.stringify(r);localStorage.setItem(e,a)}(e,t)}]}const Ke=e=>o.createElement(De,{className:"list-item-inner"},"string"==typeof e.emoji&&o.createElement("span",{className:"list-item-inner__emoji"},e.emoji),"string"==typeof e.iconImgSrc&&o.createElement("img",{src:e.iconImgSrc,width:18,height:18,alt:"",className:"list-item-inner__icon"}),!!e.label&&o.createElement("span",{className:"list-item-inner__label"},e.label),o.createElement("div",{className:"list-item-inner__title",title:e.title},e.title,!0===e.showNewTabIcon&&o.createElement("img",{src:"/icons/open.svg",width:12,height:12,alt:"外部リンクを開く",className:"list-item-inner__icon-open"}))),De=i.div`
  display: flex;
  align-items: center;

  .list-item-inner__emoji {
    margin-right: 7px;
  }
  .list-item-inner__icon {
    margin-right: 5px;
  }
  .list-item-inner__label {
    display: inline-block;
    padding: 1px 3px;
    margin-right: 4px;
    border: solid 1px var(--c-gray-border);
    color: var(--c-gray);
    font-size: 11px;
    border-radius: 4px;
    background: #fff;
    line-height: 1.3;
  }
  .list-item-inner__title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .list-item-inner__icon-open {
    margin: 0 2px;
    vertical-align: -0.15em;
  }
`,qe=e=>{const t=`toggle-${e.uniqueKey}`,r=`toggle-${e.uniqueKey}-open`,[a,l]=Te({cacheKey:r,defaultValue:e.defaultOpen});return o.createElement(We,{className:"directory"},o.createElement("button",{className:"directory__button",type:"button",role:"tab","aria-controls":t,"aria-expanded":a,"aria-label":"フォルダーを開く",onClick:()=>l(!a)},o.createElement("img",{src:"/icons/sidebar-item-arrow.svg",alt:"",width:12,height:12,className:"directory__icon-arrow "+(a?"rotated":"")}),o.createElement(Ke,{title:e.title,label:e.label,iconImgSrc:"/icons/"+(a?"folder-open.svg":"folder-close.svg")})),o.createElement("div",{className:"directory__children",role:"tabpanel","aria-hidden":!a,id:t},a?e.children:null))},We=i.div`
  .directory__button {
    position: relative;
    padding: 5px 0 5px 15px;
    display: block;
    width: 100%;
    color: var(--c-gray);
    text-align: left;
    &:hover {
      color: var(--c-body);
    }
  }
  .directory__icon-arrow {
    position: absolute;
    top: 7px;
    left: -2px;
    &.rotated {
      top: 10px;
      transform: rotate(90deg);
    }
  }

  .directory__children {
    padding-left: 15px;
  }
`,Ze=({article:e})=>o.createElement(Ue,{slug:e.slug},o.createElement(Ke,{title:e.title||e.slug,label:e.published?void 0:"下書き",emoji:e.emoji||"📄"})),Ye=({bookSlug:e,chapter:t,chapterNumber:r})=>{const a="number"==typeof r;return o.createElement(He,{bookSlug:e,chapterFilename:t.filename},o.createElement(Ke,{label:a?void 0:"除外",title:`${a?`${r}. `:""}${t.title||t.slug}`}))},Je=({bookSlug:e})=>{const{data:t,mutate:r}=k(`/api/books/${e}/chapters`,{revalidateOnFocus:!1}),a=null==t?void 0:t.chapters;return fe((()=>{r()})),o.createElement("ul",null,o.createElement("li",null,o.createElement(Be,{slug:e},o.createElement(Ke,{title:"設定",emoji:"📘"}))),!!(null==a?void 0:a.length)&&o.createElement(o.Fragment,null,null==a?void 0:a.map(((t,r)=>o.createElement("li",{key:`dir-book-${e}-${t.slug}`},o.createElement(Ye,{bookSlug:e,chapter:t,chapterNumber:"number"==typeof t.position?r+1:void 0}))))))},Ge=({book:e})=>o.createElement(qe,{title:e.title||e.slug,uniqueKey:`dir-book-${e.slug}`,defaultOpen:!1,label:e.published?void 0:"下書き"},o.createElement(Je,{bookSlug:e.slug})),Qe=()=>{const{data:e,mutate:t}=k("/api/articles",{revalidateOnFocus:!1,errorRetryCount:3}),r=null==e?void 0:e.articles;return fe((()=>{t()})),o.createElement(qe,{title:"articles",uniqueKey:"dir-articles",defaultOpen:!0},o.createElement("ul",null,!!(null==r?void 0:r.length)&&o.createElement("li",null,r.map((e=>o.createElement(Ze,{key:`item-article-${e.slug}`,article:e}))))))},Xe=()=>{const{data:e,mutate:t}=k("/api/books",{revalidateOnFocus:!1}),r=null==e?void 0:e.books;return fe((()=>{t()})),o.createElement(qe,{title:"books",uniqueKey:"dir-books",defaultOpen:!0},!!(null==r?void 0:r.length)&&o.createElement("ul",null,null==r?void 0:r.map((e=>o.createElement(Ge,{key:`item-book-${e.slug}`,book:e})))))},et=()=>{const[e,t]=Te({cacheKey:"fold-sidebar",defaultValue:!1});return o.createElement(tt,{"aria-expanded":!e,className:"sidebar"},o.createElement("button",{className:"sidebar__btn-fold",onClick:()=>t(!e),"aria-label":e?"メニューを開く":"折りたたむ"},o.createElement("img",{src:"/icons/"+(e?"sidebar-open.svg":"sidebar-fold.svg"),alt:"",width:16,height:16})),o.createElement("div",{className:"sidebar__inner","aria-hidden":e},o.createElement("header",{className:"sidebar__header"},o.createElement(Pe,null,o.createElement("img",{src:"/logo.svg",alt:"Zenn Editor",width:150,height:20,className:"site-logo"}))),o.createElement("div",{className:"sidebar__items"},o.createElement(Qe,null),o.createElement(Xe,null),o.createElement("ul",{className:"sidebar__static-links"},o.createElement("li",null,o.createElement(Ie,{to:"guide",hash:"cli-%E3%81%A7%E8%A8%98%E4%BA%8B%EF%BC%88article%EF%BC%89%E3%82%92%E7%AE%A1%E7%90%86%E3%81%99%E3%82%8B"},o.createElement(Ke,{title:"記事の作成ガイド",emoji:"📝"}))),o.createElement("li",null,o.createElement(Ie,{to:"guide",hash:"cli-%E3%81%A7%E6%9C%AC%EF%BC%88book%EF%BC%89%E3%82%92%E7%AE%A1%E7%90%86%E3%81%99%E3%82%8B"},o.createElement(Ke,{title:"本の作成ガイド",emoji:"📚"}))),o.createElement("li",null,o.createElement("a",{href:"https://zenn.dev/zenn/articles/markdown-guide",target:"_blank",rel:"noopener noreferrer"},o.createElement(Ke,{title:"マークダウン記法",emoji:"🖋️ ",showNewTabIcon:!0}))),o.createElement("li",null,o.createElement("a",{href:"https://zenn.dev/dashboard/uploader",target:"_blank",rel:"noopener noreferrer"},o.createElement(Ke,{title:"画像のアップロード",emoji:"📷",showNewTabIcon:!0})))))))},tt=i.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: solid 1px var(--c-gray-border);
  padding: 15px;
  width: 46px;
  &[aria-expanded='true'] {
    width: 350px;
  }
  .sidebar__btn-fold {
    position: absolute;
    top: 10px;
    right: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    background: var(--c-gray-bg);
    border-radius: 5px;
  }

  .sidebar__inner {
    &[aria-hidden='true'] {
      display: none;
    }
  }
  .sidebar__header {
    img {
      display: block;
    }
  }
  .sidebar__items {
    margin: 10px 0;
    display: block;
    font-size: 13.5px;
    a {
      margin: 2px 0;
      padding: 2px 0;
      display: block;
      color: var(--c-gray);
      &:hover {
        color: var(--c-body);
      }
      &.active {
        position: relative;
        color: var(--c-primary-darker);
        &:before {
          content: '';
          position: absolute;
          background: var(--c-primary-bg);
          top: 0;
          bottom: 0;
          left: -5px;
          right: -5px;
          z-index: -1;
          border-radius: 4px;
        }
      }
    }
  }
  .sidebar__static-links {
    margin-top: 8px;
  }
`,rt=({children:e})=>o.createElement(at,{className:"layout"},o.createElement("aside",{className:"layout__sidebar"},o.createElement(et,null)),o.createElement("main",{className:"layout__main"},e)),at=i.div`
  display: flex;
  .layout__main {
    flex: 1;
  }
`;const lt=()=>{const e=s.useLocation();return m.exports.useEffect((()=>{e.hash||window.scrollTo(0,0)}),[e]),null},nt=()=>(m.exports.useEffect((()=>{!function(e,t){if(!t)return e();if(void 0===g){const e=document.createElement("link").relList;g=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}Promise.all(t.map((e=>{if(e in h)return;h[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const a=document.createElement("link");return a.rel=t?"stylesheet":g,t||(a.as="script",a.crossOrigin=""),a.href=e,document.head.appendChild(a),t?new Promise(((e,t)=>{a.addEventListener("load",e),a.addEventListener("error",t)})):void 0}))).then((()=>e()))}((()=>import("./index.4bc388ce.js")),void 0)}),[]),o.createElement(v,null,o.createElement(be,null,o.createElement(s.RoconRoot,null,o.createElement(lt,null),o.createElement(rt,null,o.createElement(Le,null))))));p.render(o.createElement(nt,null),document.getElementById("root"));
