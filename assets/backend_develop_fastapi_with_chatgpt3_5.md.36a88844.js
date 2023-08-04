import{_ as s,o as a,c as n,a as l}from"./app.ab2e6989.js";const C=JSON.parse('{"title":"FastAPI with ChatGPT in Linebot","description":"","frontmatter":{},"headers":[{"level":2,"title":"安裝要求","slug":"安裝要求","link":"#安裝要求","children":[]},{"level":2,"title":"引入套件","slug":"引入套件","link":"#引入套件","children":[]},{"level":2,"title":"密碼區","slug":"密碼區","link":"#密碼區","children":[]},{"level":2,"title":"對話空白框","slug":"對話空白框","link":"#對話空白框","children":[]},{"level":2,"title":"設定ChatGPT回應","slug":"設定chatgpt回應","link":"#設定chatgpt回應","children":[]},{"level":2,"title":"設定FastAPI","slug":"設定fastapi","link":"#設定fastapi","children":[]},{"level":2,"title":"導入對話到路由!","slug":"導入對話到路由","link":"#導入對話到路由","children":[]},{"level":2,"title":"送到LineBot上","slug":"送到linebot上","link":"#送到linebot上","children":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"backend_develop/fastapi/with_chatgpt3_5.md","lastUpdated":1683292222000}'),p={name:"backend_develop/fastapi/with_chatgpt3_5.md"},o=l(`<h1 id="fastapi-with-chatgpt-in-linebot" tabindex="-1">FastAPI with ChatGPT in Linebot <a class="header-anchor" href="#fastapi-with-chatgpt-in-linebot" aria-hidden="true">#</a></h1><h2 id="安裝要求" tabindex="-1">安裝要求 <a class="header-anchor" href="#安裝要求" aria-hidden="true">#</a></h2><ul><li>FastAPI、Uvicorn</li><li>openai</li><li>linebot</li></ul><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">pip install fastapi uvicorn openai line</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">bot</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">sdk</span></span>
<span class="line"></span></code></pre></div><h2 id="引入套件" tabindex="-1">引入套件 <a class="header-anchor" href="#引入套件" aria-hidden="true">#</a></h2><p>引入已安裝的需求套件</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> logging</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> uvicorn</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> fastapi </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> FastAPI</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Request</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> HTTPException</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> linebot </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> LineBotApi</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> WebhookHandler</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> linebot</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">exceptions </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> InvalidSignatureError</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> linebot</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">models </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> MessageEvent</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> TextMessage</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> TextSendMessage</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> openai</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> os</span></span>
<span class="line"></span></code></pre></div><h2 id="密碼區" tabindex="-1">密碼區 <a class="header-anchor" href="#密碼區" aria-hidden="true">#</a></h2><p>前提先到 openai、linebot 建立 <code>token (api key)</code></p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#A6ACCD;">openai</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">api_key</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> os</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getenv</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">OPENAI_API_KEY</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">line_bot_api </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">LineBotApi</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">os</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getenv</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">LINE_CHANNEL_ACCESS_TOKEN</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">handler </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WebhookHandler</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">os</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getenv</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">LINE_CHANNEL_SECRET</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">))</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><h2 id="對話空白框" tabindex="-1">對話空白框 <a class="header-anchor" href="#對話空白框" aria-hidden="true">#</a></h2><p>先建立空白對話區塊</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#A6ACCD;">conversation </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span></span>
<span class="line"></span></code></pre></div><h2 id="設定chatgpt回應" tabindex="-1">設定ChatGPT回應 <a class="header-anchor" href="#設定chatgpt回應" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ChatGPT</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">__init__</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;font-style:italic;">self</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        self</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">messages</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> conversation</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;"># 指定gpt3.5模組</span></span>
<span class="line"><span style="color:#A6ACCD;">        self</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">model</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> os</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getenv</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">OPENAI_MODEL</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">default</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gpt-3.5-turbo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 定義回饋內容</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_response</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;font-style:italic;">self</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">user_input</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">        conversation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">append</span><span style="color:#89DDFF;">({</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">role</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">user</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> user_input</span><span style="color:#89DDFF;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        response </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> openai</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">ChatCompletion</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#82AAFF;">	            </span><span style="color:#A6ACCD;font-style:italic;">model</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">model</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">                </span><span style="color:#A6ACCD;font-style:italic;">messages</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;">self</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">messages</span></span>
<span class="line"><span style="color:#82AAFF;">                </span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">        conversation</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">append</span><span style="color:#89DDFF;">({</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">role</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">assistant</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> response</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">choices</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">]})</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">AI回答內容：</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">response</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">choices</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">].</span><span style="color:#82AAFF;">strip</span><span style="color:#89DDFF;">())</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> response</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">choices</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">][</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">].</span><span style="color:#82AAFF;">strip</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">chatgpt </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ChatGPT</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span></code></pre></div><h2 id="設定fastapi" tabindex="-1">設定FastAPI <a class="header-anchor" href="#設定fastapi" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">FastAPI</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">hello</span><span style="color:#89DDFF;">():</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">首頁看一下!</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><h2 id="導入對話到路由" tabindex="-1">導入對話到路由! <a class="header-anchor" href="#導入對話到路由" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/callback</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">request</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Request</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    signature </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> request</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">headers</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">X-Line-Signature</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    body </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#A6ACCD;"> request</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">body</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        handler</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handle</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">body</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">decode</span><span style="color:#89DDFF;">(),</span><span style="color:#82AAFF;"> signature</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">except</span><span style="color:#A6ACCD;"> InvalidSignatureError</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HTTPException</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">status_code</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">detail</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Missing Parameters</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">OK</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h2 id="送到linebot上" tabindex="-1">送到LineBot上 <a class="header-anchor" href="#送到linebot上" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">handler</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">MessageEvent</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">message</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">TextMessage</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">handling_message</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">event</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">isinstance</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> TextMessage</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span></span>
<span class="line"><span style="color:#A6ACCD;">        user_message </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> event</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">message</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">text</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;"># 放入chatgpt回應內容</span></span>
<span class="line"><span style="color:#A6ACCD;">        reply_msg </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> chatgpt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get_response</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">user_message</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;"># </span></span>
<span class="line"><span style="color:#A6ACCD;">        line_bot_api</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">reply_message</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">event</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">reply_token</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> TextSendMessage</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">text</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">reply_msg</span><span style="color:#89DDFF;">))</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> __name__</span><span style="color:#89DDFF;">==</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">__main__</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">    uvicorn</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">()</span></span>
<span class="line"></span></code></pre></div><hr><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://github.com/pyfbsdk59/FastAPI-ChatGPT3.5-linebot-Railway" target="_blank" rel="noreferrer">FastAPI-ChatGPT3.5-linebot-Railway</a></li><li><a href="https://platform.openai.com/docs/libraries" target="_blank" rel="noreferrer">OpenAI Doc</a></li><li><a href="https://github.com/line/line-bot-sdk-python" target="_blank" rel="noreferrer">Linebot SDK Github</a></li></ul>`,25),e=[o];function t(c,r,F,D,y,i){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};
