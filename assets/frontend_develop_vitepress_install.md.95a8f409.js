import{_ as s,o as a,c as e,a as n}from"./app.45fb3b71.js";const l="/assets/first_page.bb9fd746.png",C=JSON.parse('{"title":"Vitepress安裝與設置","description":"","frontmatter":{},"headers":[{"level":2,"title":"建立專案資料夾","slug":"建立專案資料夾","link":"#建立專案資料夾","children":[]},{"level":2,"title":"初始化","slug":"初始化","link":"#初始化","children":[]},{"level":2,"title":"開始安裝","slug":"開始安裝","link":"#開始安裝","children":[]},{"level":2,"title":"Vitepress部屬","slug":"vitepress部屬","link":"#vitepress部屬","children":[]},{"level":2,"title":"執行","slug":"執行","link":"#執行","children":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"frontend_develop/vitepress/install.md","lastUpdated":1683292222000}'),p={name:"frontend_develop/vitepress/install.md"},t=n(`<h1 id="vitepress安裝與設置" tabindex="-1">Vitepress安裝與設置 <a class="header-anchor" href="#vitepress安裝與設置" aria-hidden="true">#</a></h1><p><a href="https://vitepress.vuejs.org/guide/getting-started" target="_blank" rel="noreferrer">官方安裝步驟</a></p><h2 id="建立專案資料夾" tabindex="-1">建立專案資料夾 <a class="header-anchor" href="#建立專案資料夾" aria-hidden="true">#</a></h2><p>設定專案資料夾<code>first_vitepress</code></p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">mkdir first_vitepress</span></span>
<span class="line"><span style="color:#A6ACCD;">cd firest_press</span></span>
<span class="line"></span></code></pre></div><h2 id="初始化" tabindex="-1">初始化 <a class="header-anchor" href="#初始化" aria-hidden="true">#</a></h2><p>node專案初始化設置 ( 導出<code>package.json</code> )</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">init</span></span>
<span class="line"></span></code></pre></div><h2 id="開始安裝" tabindex="-1">開始安裝 <a class="header-anchor" href="#開始安裝" aria-hidden="true">#</a></h2><p>官方安裝指令</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm install </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">D vitepress vue</span></span>
<span class="line"></span></code></pre></div><h2 id="vitepress部屬" tabindex="-1">Vitepress部屬 <a class="header-anchor" href="#vitepress部屬" aria-hidden="true">#</a></h2><p>官方指定必需建立的資料夾<code>docs</code>及<code>index.md</code>，如下方架構 :</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ docs</span></span>
<span class="line"><span style="color:#A6ACCD;">│  └─ index.md</span></span>
<span class="line"><span style="color:#A6ACCD;">|─ node_modules</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ package.json</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>基本上所有頁面大多都會建立在<code>/docs</code>資料夾內。</p></div><p>修改<code>package.json</code></p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// package.json</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">scripts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">docs:dev</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress dev docs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">docs:build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress build docs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">docs:preview</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">vitepress preview docs</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="執行" tabindex="-1">執行 <a class="header-anchor" href="#執行" aria-hidden="true">#</a></h2><p>就這樣，安裝完成，可以執行看看</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm run docs:dev</span></span>
<span class="line"></span></code></pre></div><p><img src="`+l+'" alt="首次執行後的介面"><em>這是首次執行後的畫面，右上方還可切換夜間模式</em></p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>基本上執行後，會自動會在<code>/docs</code>資料夾內產出<code>/.vitepress</code>。</p></div><hr><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><p><a href="/">回首頁</a></p><ul><li><a href="https://www.youtube.com/watch?v=SDIPTjotXgI" target="_blank" rel="noreferrer">Complete Vitepress Tutorial in Hindi || Stephen SIMON</a></li><li><a href="https://www.youtube.com/watch?v=GXr8FOssWqM" target="_blank" rel="noreferrer">Deep Dive into VitePress | Kia King Ishii | ViteConf 2022</a></li></ul>',26),o=[t];function c(i,r,d,h,D,y){return a(),e("div",null,o)}const F=s(p,[["render",c]]);export{C as __pageData,F as default};
