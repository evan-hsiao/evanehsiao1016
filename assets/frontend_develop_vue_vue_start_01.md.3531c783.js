import{_ as s,o as a,c as n,a as e}from"./app.5bb4edff.js";const C=JSON.parse('{"title":"Vue 基礎 Part 2.","description":"","frontmatter":{},"headers":[{"level":2,"title":"reactive VS ref","slug":"reactive-vs-ref","link":"#reactive-vs-ref","children":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"frontend_develop/vue/vue_start_01.md","lastUpdated":null}'),l={name:"frontend_develop/vue/vue_start_01.md"},o=e(`<h1 id="vue-基礎-part-2" tabindex="-1">Vue 基礎 Part 2. <a class="header-anchor" href="#vue-基礎-part-2" aria-hidden="true">#</a></h1><h2 id="reactive-vs-ref" tabindex="-1"><em>reactive</em> VS <em>ref</em> <a class="header-anchor" href="#reactive-vs-ref" aria-hidden="true">#</a></h2><p>這是在Data取用資料的兩大響應式作法，如果回推 Javascript 原始語法來說，前者像是 Proxy( )，後者像 getter( )、setter( ) 用法，處理資料方式會有所不同，編寫也會不同。網路上有許多介紹及解釋，就自行參考。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// ref用法</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data_A</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">i&#39;m data</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data_A1</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">i use ref</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data_A2</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">123</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> user</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">computed</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">name:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,info:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_A1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,age:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_A2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>取用<code>ref</code>內的資料就多加<code>.value</code>即可。</p></div><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// reactive用法</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> data_B</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">reactive</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">i&#39;m array</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">info</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">i use reactive</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">456</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> user2</span><span style="color:#89DDFF;">=**</span><span style="color:#A6ACCD;">computed</span><span style="color:#89DDFF;">**</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">()</span><span style="color:#C792EA;">=&gt;</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">name:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,info:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">,age:</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">data_B</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age</span><span style="color:#89DDFF;">}\`</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>在陣列 ( array ) 多半使用 <code>reactive</code>較方便，而其他情況下或猶豫時，則 <code>ref</code>一路到底。</p></div><hr><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://vuejsdevelopers.com/2022/06/01/ref-vs-reactive/" target="_blank" rel="noreferrer">Ref vs Reactive</a></li><li><a href="https://medium.com/i-am-mike/vue-3-ref-%E8%B7%9F-reactive-%E6%88%91%E8%A9%B2%E6%80%8E%E9%BA%BC%E9%81%B8-2fb6b6735a3c" target="_blank" rel="noreferrer">ref 跟 reactive 我該怎麼選!?</a></li><li><a href="https://ithelp.ithome.com.tw/articles/10278236" target="_blank" rel="noreferrer">Vue3 ref &amp; reactive 小練習</a></li><li><a href="https://dev.to/diseyi/ref-vs-reactive-how-vue-3-declares-reactive-data-ebf" target="_blank" rel="noreferrer">Ref vs Reactive - How Vue 3 Declares Reactive Data</a></li></ul>`,10),p=[o];function t(r,c,D,y,i,F){return a(),n("div",null,p)}const d=s(l,[["render",t]]);export{C as __pageData,d as default};
