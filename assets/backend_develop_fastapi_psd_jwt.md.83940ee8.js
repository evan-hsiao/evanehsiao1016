import{_ as s,o as a,c as n,a as l}from"./app.5bb4edff.js";const i=JSON.parse('{"title":"驗證與加密(第一篇)","description":"","frontmatter":{},"headers":[{"level":2,"title":"環境需求","slug":"環境需求","link":"#環境需求","children":[]},{"level":2,"title":"先前預備","slug":"先前預備","link":"#先前預備","children":[]},{"level":2,"title":"開始編譯","slug":"開始編譯","link":"#開始編譯","children":[{"level":3,"title":"參考:","slug":"參考","link":"#參考","children":[]}]}],"relativePath":"backend_develop/fastapi/psd_jwt.md","lastUpdated":null}'),p={name:"backend_develop/fastapi/psd_jwt.md"},o=l(`<h1 id="驗證與加密-第一篇" tabindex="-1">驗證與加密(第一篇) <a class="header-anchor" href="#驗證與加密-第一篇" aria-hidden="true">#</a></h1><p>安全性驗證對前後端取用資料非常重要，第一篇會先導讀官方的方式。</p><h2 id="環境需求" tabindex="-1">環境需求 <a class="header-anchor" href="#環境需求" aria-hidden="true">#</a></h2><ul><li>python-jose 加密編碼</li><li>passlib</li></ul><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">pip install python</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">jose passlib</span></span>
<span class="line"></span></code></pre></div><h2 id="先前預備" tabindex="-1">先前預備 <a class="header-anchor" href="#先前預備" aria-hidden="true">#</a></h2><p>在加密前需要先取得一組密碼，官方使用openssl來亂數編譯一串hex 32格式的密碼。</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">openssl rand </span><span style="color:#89DDFF;">-</span><span style="color:#82AAFF;">hex</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">32</span></span>
<span class="line"></span></code></pre></div><p>會產出下方一串亂數。</p><div class="language-cmd"><button title="Copy Code" class="copy"></button><span class="lang">cmd</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> 09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7</span></span>
<span class="line"></span></code></pre></div><h2 id="開始編譯" tabindex="-1">開始編譯 <a class="header-anchor" href="#開始編譯" aria-hidden="true">#</a></h2><p>首先宣告一串假的帳號及密碼，通常這些是放在資料庫中。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#A6ACCD;">fake_users_db </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">johndoe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">username</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">johndoe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">full_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">John Doe</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">email</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">johndoe@example.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">hashed_password</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">disabled</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">False,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>在來將剛剛得到的一串亂數宣告，採取JWT HS256格式編譯。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> jose </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> JWTError</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> jwt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">SECRET_KEY </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">ALGORITHM </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">HS256</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">ACCESS_TOKEN_EXPIRE_MINUTES </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">30</span></span>
<span class="line"></span></code></pre></div><p>接著採<code>BaseModel</code>要驗證輸入的格式是否符合。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> pydantic </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> BaseModel</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Token</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BaseModel</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    access_token</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span></span>
<span class="line"><span style="color:#A6ACCD;">    token_type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BaseModel</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span></span>
<span class="line"><span style="color:#A6ACCD;">    email</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span></span>
<span class="line"><span style="color:#A6ACCD;">    full_name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span></span>
<span class="line"><span style="color:#A6ACCD;">    disabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bool</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None</span></span>
<span class="line"></span></code></pre></div><p>官方在此處使用OAutha2來處理加密。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> passlib</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">context </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> CryptContext</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> fastapi</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">security </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> OAuth2PasswordBearer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> OAuth2PasswordRequestForm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">pwd_context </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">CryptContext</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">schemes</span><span style="color:#89DDFF;">=[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bcrypt</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">deprecated</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">oauth2_scheme </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">OAuth2PasswordBearer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">tokenUrl</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">token</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>驗證完格式正確後，接續宣告一個函式來與內部帳密(fake_users_db)確認，此時會以編譯的方式進行。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_current_user</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">token</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Annotated</span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">oauth2_scheme</span><span style="color:#89DDFF;">)]):</span></span>
<span class="line"><span style="color:#A6ACCD;">    credentials_exception </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HTTPException</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#82AAFF;">        </span><span style="color:#A6ACCD;font-style:italic;">status_code</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">status</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">HTTP_401_UNAUTHORIZED</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">        </span><span style="color:#A6ACCD;font-style:italic;">detail</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Could not validate credentials</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">        </span><span style="color:#A6ACCD;font-style:italic;">headers</span><span style="color:#89DDFF;">={</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">WWW-Authenticate</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#82AAFF;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Bearer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        payload </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> jwt</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">decode</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">token</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SECRET_KEY</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">algorithms</span><span style="color:#89DDFF;">=[</span><span style="color:#82AAFF;">ALGORITHM</span><span style="color:#89DDFF;">])</span></span>
<span class="line"><span style="color:#A6ACCD;">        username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">str</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> payload</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sub</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> username </span><span style="color:#89DDFF;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None:</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> credentials_exception</span></span>
<span class="line"><span style="color:#A6ACCD;">        token_data </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TokenData</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">username</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">username</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">except</span><span style="color:#A6ACCD;"> JWTError</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> credentials_exception</span></span>
<span class="line"><span style="color:#A6ACCD;">    user </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_user</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">fake_users_db</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">username</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">token_data</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> user </span><span style="color:#89DDFF;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">None:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> credentials_exception</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> user</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get_current_active_user</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;font-style:italic;">current_user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Annotated</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">User</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_current_user</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> current_user</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">disabled</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HTTPException</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">status_code</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">400</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">detail</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Inactive user</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> current_user</span></span>
<span class="line"></span></code></pre></div><p>最後當然要放到路由上。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;"># main.py</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> typing </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Annotated</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/users/me/</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">response_model</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">User</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">async</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">read_users_me</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#A6ACCD;font-style:italic;">current_user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Annotated</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">User</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_current_active_user</span><span style="color:#89DDFF;">)]</span></span>
<span class="line"><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> current_user</span></span>
<span class="line"></span></code></pre></div><p>看完官方文件後，我有點頭暈了orz，下篇我使用網路教學的影片，來製作另一個比較容易理解的方式。</p><hr><h3 id="參考" tabindex="-1">參考: <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/?h=jwt" target="_blank" rel="noreferrer">官方</a></li></ul>`,27),e=[o];function t(c,r,D,y,F,A){return a(),n("div",null,e)}const d=s(p,[["render",t]]);export{i as __pageData,d as default};
