_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[6],{"9ucp":function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return t("BdxU")}])},BdxU:function(e,n,t){"use strict";t.r(n);var r=t("jg1C"),o=t("jvFD"),c=t.n(o);n.default=function(){return Object(r.jsx)("div",{className:"error",children:Object(r.jsxs)("div",{className:"error-container",children:[Object(r.jsx)("h1",{className:"error-title",children:"\ud83d\ude3f \u30da\u30fc\u30b8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f"}),Object(r.jsx)(c.a,{href:"/",passHref:!0,children:Object(r.jsx)("a",{className:"error-link",children:"\u30c8\u30c3\u30d7\u3078\u623b\u308b"})})]})})}},HOTy:function(e,n,t){"use strict";var r=t("x3oR"),o=t("Y3ZS");n.__esModule=!0,n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!i,o=(0,c.useRef)(),u=(0,c.useState)(!1),l=r(u,2),f=l[0],d=l[1],p=(0,c.useCallback)((function(e){o.current&&(o.current(),o.current=void 0),t||f||e&&e.tagName&&(o.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=s.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return s.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,c=r.observer,a=r.elements;return a.set(e,n),c.observe(e),function(){a.delete(e),c.unobserve(e),0===a.size&&(c.disconnect(),s.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:n}))}),[t,n,f]);return(0,c.useEffect)((function(){i||f||(0,a.default)((function(){return d(!0)}))}),[f]),[p,f]};var c=t("ERkP"),a=o(t("ZeW2")),i="undefined"!==typeof IntersectionObserver;var s=new Map},KeDb:function(e,n,t){"use strict";var r=t("x3oR"),o=t("pONU");n.__esModule=!0,n.default=void 0;var c=o(t("ERkP")),a=t("L9lV"),i=t("7xIC"),s=t("HOTy"),u={};function l(e,n,t,r){if(e&&(0,a.isLocalURL)(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;u[n+"%"+t+(o?"%"+o:"")]=!0}}var f=function(e){var n=!1!==e.prefetch,t=(0,i.useRouter)(),o=t&&t.pathname||"/",f=c.default.useMemo((function(){var n=(0,a.resolveHref)(o,e.href,!0),t=r(n,2),c=t[0],i=t[1];return{href:c,as:e.as?(0,a.resolveHref)(o,e.as):i||c}}),[o,e.href,e.as]),d=f.href,p=f.as,v=e.children,h=e.replace,b=e.shallow,y=e.scroll,E=e.locale;"string"===typeof v&&(v=c.default.createElement("a",null,v));var _=c.Children.only(v),m=_&&"object"===typeof _&&_.ref,w=(0,s.useIntersection)({rootMargin:"200px"}),g=r(w,2),j=g[0],x=g[1],L=c.default.useCallback((function(e){j(e),m&&("function"===typeof m?m(e):"object"===typeof m&&(m.current=e))}),[m,j]);(0,c.useEffect)((function(){var e=x&&n&&(0,a.isLocalURL)(d),r="undefined"!==typeof E?E:t&&t.locale,o=u[d+"%"+p+(r?"%"+r:"")];e&&!o&&l(t,d,p,{locale:r})}),[p,d,x,E,n,t]);var M={ref:L,onClick:function(e){_.props&&"function"===typeof _.props.onClick&&_.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,c,i,s){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,a.isLocalURL)(t))&&(e.preventDefault(),null==i&&(i=r.indexOf("#")<0),n[o?"replace":"push"](t,r,{shallow:c,locale:s,scroll:i}).then((function(e){e&&i&&document.body.focus()})))}(e,t,d,p,h,b,y,E)},onMouseEnter:function(e){(0,a.isLocalURL)(d)&&(_.props&&"function"===typeof _.props.onMouseEnter&&_.props.onMouseEnter(e),l(t,d,p,{priority:!0}))}};if(e.passHref||"a"===_.type&&!("href"in _.props)){var N="undefined"!==typeof E?E:t&&t.locale,O=(0,a.getDomainLocale)(p,N,t&&t.locales,t&&t.domainLocales);M.href=O||(0,a.addBasePath)((0,a.addLocale)(p,N,t&&t.defaultLocale))}return c.default.cloneElement(_,M)};n.default=f},jvFD:function(e,n,t){e.exports=t("KeDb")}},[["9ucp",0,2,1]]]);