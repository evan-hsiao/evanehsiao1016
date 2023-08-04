import{_ as a,o as e,c as t,a as s}from"./app.ab2e6989.js";const m=JSON.parse('{"title":"Fastapi安裝配置","description":"","frontmatter":{},"headers":[{"level":2,"title":"建構虛擬環境","slug":"建構虛擬環境","link":"#建構虛擬環境","children":[]},{"level":2,"title":"安裝","slug":"安裝","link":"#安裝","children":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"backend_develop/fastapi/install.md","lastUpdated":1683292222000}'),n={name:"backend_develop/fastapi/install.md"},l=s(`<h1 id="fastapi安裝配置" tabindex="-1">Fastapi安裝配置 <a class="header-anchor" href="#fastapi安裝配置" aria-hidden="true">#</a></h1><p>FastAPI是Python的一個很快速建立後端API框架，以基本操作性質來講，我覺得跟Javascript的Express相似，都能夠快速產生API。</p><p>我會盡量以官方英文文檔作為導讀，不建議中文(zh)文檔(因為翻譯到讓我更看不懂)，真要看中文建議直接google翻譯整篇還比較看得懂。</p><h2 id="建構虛擬環境" tabindex="-1">建構虛擬環境 <a class="header-anchor" href="#建構虛擬環境" aria-hidden="true">#</a></h2><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">py </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">m venv myvenv</span></span>
<span class="line"><span style="color:#A6ACCD;">cd myvenv</span></span>
<span class="line"><span style="color:#A6ACCD;">myvenv/Scripts/activate</span></span>
<span class="line"></span></code></pre></div><h2 id="安裝" tabindex="-1">安裝 <a class="header-anchor" href="#安裝" aria-hidden="true">#</a></h2><p>FastAPI採用<code>Uvicorn</code>做Server端，官方則使用<code>Sqlalchemy</code>與資料庫對映(ORM物件關係對映)，感覺Python的框架使用ORM語言對映資料庫比較盛行，當然初步還是要學過SQL，才會比較好看得懂到底在寫什麼。</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">pip install fastapi uvicorn sqlalchemy</span></span>
<span class="line"></span></code></pre></div><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://medium.com/@YDyachenko/fastapi-clean-architecture-4c961b512213" target="_blank" rel="noreferrer">FastAPI Clean Architecture</a></li><li><a href="https://medium.com/geekculture/how-to-handle-bigger-projects-with-fastapi-94ffac1efec8" target="_blank" rel="noreferrer">How to handle bigger projects with FastAPI</a></li><li><a href="https://levelup.gitconnected.com/building-a-website-starter-with-fastapi-92d077092864" target="_blank" rel="noreferrer">使用 FastAPI 構建 Website Starter</a></li><li><a href="https://fastapitutorial.com/" target="_blank" rel="noreferrer">FASTAPITUTORIAL</a></li></ul>`,10),i=[l];function r(c,p,o,d,h,_){return e(),t("div",null,i)}const u=a(n,[["render",r]]);export{m as __pageData,u as default};
