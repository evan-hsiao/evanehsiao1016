import{_ as s,o as a,c as l,a as n}from"./app.45fb3b71.js";const p="/assets/add.dc11e609.png",o="/assets/add_select_id.b2cee2a3.png",e="/assets/fastapi_del_id.c19329c3.png",u=JSON.parse('{"title":"與資料庫對話 ( 範例 CRUD ) II","description":"","frontmatter":{},"headers":[{"level":2,"title":"Create 創建 (POST)","slug":"create-創建-post","link":"#create-創建-post","children":[]},{"level":2,"title":"Update 更新 (PUT)(PATCH)","slug":"update-更新-put-patch","link":"#update-更新-put-patch","children":[]},{"level":2,"title":"Delete 刪除 (DELETE)","slug":"delete-刪除-delete","link":"#delete-刪除-delete","children":[]}],"relativePath":"backend_develop/fastapi/example_crud_1.md","lastUpdated":1683624027000}'),t={name:"backend_develop/fastapi/example_crud_1.md"},c=n(`<h1 id="與資料庫對話-範例-crud-ii" tabindex="-1">與資料庫對話 ( 範例 CRUD ) II <a class="header-anchor" href="#與資料庫對話-範例-crud-ii" aria-hidden="true">#</a></h1><h2 id="create-創建-post" tabindex="-1">Create 創建 (POST) <a class="header-anchor" href="#create-創建-post" aria-hidden="true">#</a></h2><p>增加1筆 <code>item</code> 的方法。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-XLtso" id="tab-BD16btY" checked="checked"><label for="tab-BD16btY">crud.py</label><input type="radio" name="group-XLtso" id="tab-2w_MxVg"><label for="tab-2w_MxVg">schema.py</label><input type="radio" name="group-XLtso" id="tab-UsD7vpl"><label for="tab-UsD7vpl">main.py</label></div><div class="blocks"><div class="language-py active"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">add_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> Session</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">addItem</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">schema</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">create_item</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    item </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> model</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">UserCreate</span><span style="color:#89DDFF;">(</span></span>
<span class="line"><span style="color:#82AAFF;">        </span><span style="color:#A6ACCD;font-style:italic;">email</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">addItem</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">email</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#82AAFF;">        </span><span style="color:#A6ACCD;font-style:italic;">password</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">addItem</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">password</span></span>
<span class="line"><span style="color:#82AAFF;">    </span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">item</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">commit</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">refresh</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">item</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> item</span></span>
<span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> pydantic </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> BaseModel</span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserBase</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">BaseModel</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">email</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">str</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UserCreate</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">UserBsae</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#FFCB6B;">password</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">str</span></span>
<span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">post</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/path</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">status_code</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">201</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">create_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">sc_item</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">schema</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">UserCreate</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">Session</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_db</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 先確認是否重複</span></span>
<span class="line"><span style="color:#A6ACCD;">    add_data_</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">crud</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">check_email</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">db</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">email</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">sc_item</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">email</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> add_data</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">raise</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">HTTPExcption</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">status_code</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">404</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">detail</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">資料庫已建檔</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> crud</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">db</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">addItem</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">sc_item</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div></div></div><p>如果要在 <code>item</code> 裡加入第二層的方法:</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-8WP7X" id="tab-n0lELPi" checked="checked"><label for="tab-n0lELPi">crud.py</label><input type="radio" name="group-8WP7X" id="tab-Q5z72Nl"><label for="tab-Q5z72Nl">schema.py</label><input type="radio" name="group-8WP7X" id="tab-Ms6wKsE"><label for="tab-Ms6wKsE">main.py</label></div><div class="blocks"><div class="language-py active"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"></span></code></pre></div></div></div><p><img src="`+p+'" alt="add_single"><img src="'+o+`" alt="selsec_single"></p><div class="tip custom-block"><p class="custom-block-title">總結:</p><ol><li>def 定義 create 函式操作時需與 schema 物件類別(class)的欄位互相配合。</li><li>需增加函式確認避免資料重複。</li><li>承2. 增加判斷式的後續返回動作。</li></ol></div><h2 id="update-更新-put-patch" tabindex="-1">Update 更新 (PUT)(PATCH) <a class="header-anchor" href="#update-更新-put-patch" aria-hidden="true">#</a></h2><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">put</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/path/</span><span style="color:#F78C6C;">{id}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">update_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">payload</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">schema</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">schema</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">Session</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_db</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">    query_db</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">query</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">models</span><span style="color:#89DDFF;">.)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">update item</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>def update_item(所選的id , 定義操作.操作方法, 資料庫): 資料表=選擇資料表(資料表名稱).篩選(資料表內的id==所選的id)</p></div><h2 id="delete-刪除-delete" tabindex="-1">Delete 刪除 (DELETE) <a class="header-anchor" href="#delete-刪除-delete" aria-hidden="true">#</a></h2><p>刪除階段可暫時不需要再使用<code>response_mode</code>。</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-Bxad_" id="tab-SfVXJaT" checked="checked"><label for="tab-SfVXJaT">合併</label><input type="radio" name="group-Bxad_" id="tab-JydVH4x"><label for="tab-JydVH4x">crud</label><input type="radio" name="group-Bxad_" id="tab-ltSzyjS"><label for="tab-ltSzyjS">router</label></div><div class="blocks"><div class="language-py active"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">delete</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/path/</span><span style="color:#F78C6C;">{id}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">del_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">int</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">Session</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_db</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">    select_id</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">query</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">models</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">Item</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">filter</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">models</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">Item</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">==</span><span style="color:#82AAFF;">id</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">first</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> select</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">delete</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">select_id</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">commit</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        db</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">close</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">已刪除 item!!</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mssage</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;找不到id:</span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">id</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">資料&quot;</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">del_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">Session</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">int</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    select_id</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">query</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">models</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">Item</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">filter</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">models</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">Item</span><span style="color:#89DDFF;">.</span><span style="color:#F07178;">id</span><span style="color:#89DDFF;">==</span><span style="color:#82AAFF;">id</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">first</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">delete</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">select_id</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">commit</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    db</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">close</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">已刪除 item!!</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span></code></pre></div><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">delete</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/path/</span><span style="color:#F78C6C;">{id}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">def</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">delete_item</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">item_id</span><span style="color:#89DDFF;">:</span><span style="color:#FFCB6B;">int</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">db</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">Session</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">Depends</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">get_db</span><span style="color:#89DDFF;">)):</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;font-style:italic;"># 先使用id來找看看資料是否存在</span></span>
<span class="line"><span style="color:#A6ACCD;">    find_Item</span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;">crud</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">read_one</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">db</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">item_id</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> find_Item</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> crud</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">del_item</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">db</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">id</span><span style="color:#89DDFF;">=</span><span style="color:#82AAFF;">item_id</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">else</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">mssage</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;找不到id:</span><span style="color:#F78C6C;">{</span><span style="color:#A6ACCD;">item_id</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">資料&quot;</span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></div></div><p><img src="`+e+'" alt="del_id"></p><div class="tip custom-block"><p class="custom-block-title">刪除方法的總結:</p><ol><li>先挑出要刪除的 id。</li><li>判斷 id 是否還存在資料庫內。</li><li>回饋判斷後的結果: 刪除 或 找不到id。</li></ol></div>',16),r=[c];function F(y,D,i,A,d,C){return a(),l("div",null,r)}const b=s(t,[["render",F]]);export{u as __pageData,b as default};
