import{_ as s,o as a,c as n,a as l}from"./app.5bb4edff.js";const A=JSON.parse('{"title":"CORS ( Cross-Origin Resource Sharing )","description":"","frontmatter":{},"headers":[{"level":2,"title":"參考","slug":"參考","link":"#參考","children":[]}],"relativePath":"backend_develop/fastapi/cors.md","lastUpdated":null}'),o={name:"backend_develop/fastapi/cors.md"},e=l(`<h1 id="cors-cross-origin-resource-sharing" tabindex="-1">CORS ( Cross-Origin Resource Sharing ) <a class="header-anchor" href="#cors-cross-origin-resource-sharing" aria-hidden="true">#</a></h1><p><code>CORS 跨域資源公用</code>，是要提供給前端連接使用</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 使用Middleware模組</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> fastapi</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">middleware</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">cors </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> CORSMiddleware</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 設定開放的網域</span></span>
<span class="line"><span style="color:#A6ACCD;">origins </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost.tiangolo.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://localhost.tiangolo.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">http://localhost:8080</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 啟動模組設定跨網域連結</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add_middleware</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#82AAFF;">    CORSMiddleware</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#A6ACCD;font-style:italic;">allow_origins</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">origins</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#A6ACCD;font-style:italic;">allow_credentials</span><span style="color:#89DDFF;">=True,</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#A6ACCD;font-style:italic;">allow_methods</span><span style="color:#89DDFF;">=[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#A6ACCD;font-style:italic;">allow_headers</span><span style="color:#89DDFF;">=[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><hr><h2 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h2><ul><li><a href="https://fastapi.tiangolo.com/tutorial/cors/" target="_blank" rel="noreferrer">Fastapi CORS</a></li><li><a href="https://medium.com/@sangeeth123sj/how-to-create-a-web-app-using-fastapi-vuejs-and-mongodb-for-generating-and-showcasing-images-193ccdb20091" target="_blank" rel="noreferrer">How to Create a web app using FastAPI, Vuejs and MongoDB for generating and showcasing images generated by Stability AI API.</a></li></ul>`,6),p=[e];function t(r,c,i,D,F,y){return a(),n("div",null,p)}const C=s(o,[["render",t]]);export{A as __pageData,C as default};
