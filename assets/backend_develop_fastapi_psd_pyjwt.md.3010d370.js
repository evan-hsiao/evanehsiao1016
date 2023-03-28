import{_ as s,c as a,o as n,d as l}from"./app.5a2dc0fe.js";const A=JSON.parse('{"title":"驗證與加密(第二篇)","description":"","frontmatter":{},"headers":[{"level":2,"title":"環境需求","slug":"環境需求","link":"#環境需求","children":[]},{"level":2,"title":"先前預備","slug":"先前預備","link":"#先前預備","children":[]},{"level":2,"title":"開始編譯","slug":"開始編譯","link":"#開始編譯","children":[]},{"level":2,"title":"來個驗證","slug":"來個驗證","link":"#來個驗證","children":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"backend_develop/fastapi/psd_pyjwt.md","lastUpdated":null}'),p={name:"backend_develop/fastapi/psd_pyjwt.md"},o=l(`<h1 id="驗證與加密-第二篇" tabindex="-1">驗證與加密(第二篇) <a class="header-anchor" href="#驗證與加密-第二篇" aria-hidden="true">#</a></h1><p>這篇我參考網路教學所使用的PyJWT模組來製作認證。</p><h2 id="環境需求" tabindex="-1">環境需求 <a class="header-anchor" href="#環境需求" aria-hidden="true">#</a></h2><ul><li>pyjwt</li></ul><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">pip install pyjwt</span></span>
<span class="line"></span></code></pre></div><h2 id="先前預備" tabindex="-1">先前預備 <a class="header-anchor" href="#先前預備" aria-hidden="true">#</a></h2><p>進行加密的key code可以跟著第一篇使用openssl來創建亂數。</p><h2 id="開始編譯" tabindex="-1">開始編譯 <a class="header-anchor" href="#開始編譯" aria-hidden="true">#</a></h2><p>自建一組帳號與密碼，與第一篇一樣，通常是存放在資料庫中。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#A6ACCD;">fake_users_db </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">evanhsiao</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">password</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">123456abcdefg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>以下是自己編輯加密的key code。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> jwt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">SECRET_KEY </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">evanhsiaos123456789</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">ALGORITHM </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">HS256</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">ACCESS_TOKEN_EXPIRE_MINUTES </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">800</span></span>
<span class="line"></span></code></pre></div><p>一樣採用<code>BaseModel</code>驗證輸入格式</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> pydantic </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> BaseModel</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Loginclass</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BaseModel</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span></span>
<span class="line"><span style="color:#A6ACCD;">    password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span></span>
<span class="line"></span></code></pre></div><h2 id="來個驗證" tabindex="-1">來個驗證 <a class="header-anchor" href="#來個驗證" aria-hidden="true">#</a></h2><p>這裡加密採用FastAPI內建的<code>jsonable_encoder</code></p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> fastapi</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">encoders </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> jsonable_encoder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/login</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">login_user</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">login_item</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Loginclass</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 透過jsonable_encoder來驗證</span></span>
<span class="line"><span style="color:#A6ACCD;">    data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">jsonable_encoder</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">login_item</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 比對輸入內容</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> fake_users_db</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">and</span><span style="color:#A6ACCD;"> fake_users_db</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">password</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> data</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">password</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;"># 通過時顯示內容</span></span>
<span class="line"><span style="color:#A6ACCD;">        encoded_jwt </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> jwt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">encode</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">data</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SECRET_KEY</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">algorithm</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">ALGORITHM</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">token</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> encoded_jwt </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;"># 未通過顯示的內容</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Login failed</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>就這樣完成簡單的驗證效果，比官方少很多作法，不過安全性尚待確認，至少對於資料加密有一番認知，期待後面有其他知識吸收，可以再進化加密驗證方式。</p><hr><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://www.youtube.com/watch?v=5ZqoapBfgc0" target="_blank" rel="noreferrer">FastAPI login with PyJWT token authentication</a></li><li><a href="https://tutorial101.blogspot.com/2023/03/fastapi-login-with-pyjwt-token.html" target="_blank" rel="noreferrer">上方影片的網站文件</a></li><li><a href="https://pyjwt.readthedocs.io/en/stable/" target="_blank" rel="noreferrer">PyJWT</a></li></ul>`,21),e=[o];function t(c,r,D,y,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};
