import{_ as s,o as a,c as l,a as n}from"./app.45fb3b71.js";const C=JSON.parse('{"title":"結合多個SQL資料庫內的表單","description":"","frontmatter":{},"headers":[{"level":3,"title":"參考","slug":"參考","link":"#參考","children":[]}],"relativePath":"backend_develop/fastapi/sql_join.md","lastUpdated":1683292222000}'),o={name:"backend_develop/fastapi/sql_join.md"},p=n(`<h1 id="結合多個sql資料庫內的表單" tabindex="-1">結合多個SQL資料庫內的表單 <a class="header-anchor" href="#結合多個sql資料庫內的表單" aria-hidden="true">#</a></h1><p>如何將同個資料庫內的各個資料表相關連結串啟成為自己想要的資訊，這時候會用到 <code>relationship</code>。</p><p>大概解釋一下用法 : <code>A欄位 = relationship (&quot;B表單&quot;,back_populates=&quot;B欄位&quot;)</code>。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight has-highlighted-lines" tabindex="0"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> sqlalchemy </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> Boolean</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Column</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> ForeignKey</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> Integer</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> String</span></span>
<span class="line highlighted"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> sqlalchemy</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">orm </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> relationship</span></span>
<span class="line"></span></code></pre></div><p>當有2個資料表，有共同欄位串聯時。</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TABLE_A</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Base</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    __tablename__</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">table a</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    items </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">owner</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TABLE_B</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Base</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">     __tablename__</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">table b</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line"><span style="color:#A6ACCD;">    owner </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">items</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>多個資料表時呢 ? 下方做個範例 :</p><div class="language-py"><button title="Copy Code" class="copy"></button><span class="lang">py</span><pre class="shiki material-theme-palenight has-highlighted-lines" tabindex="0"><code><span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TABLE_A</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Base</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    __tablename__ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">table_a</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    item_same </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_same</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    item_A_1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_B</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_B_1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TABLE_B</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Base</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    __tablename__ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">table_b</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    item_same </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_C</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_same</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    item_B_1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_C</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_C_1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TABLE_C</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">Base</span><span style="color:#89DDFF;">):</span></span>
<span class="line"><span style="color:#A6ACCD;">    __tablename__ </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">table_c</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ...</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    item_same </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_same</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    item_C_1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">relationship</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">TABLE_A</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">back_populates</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">item_A_1</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>這裡敘述三張表單都有相同欄位 <code>item_same</code>，從 TABLE_A -&gt; TABLE_B -&gt; TABLE_C 串聯。</p><h3 id="參考" tabindex="-1">參考 <a class="header-anchor" href="#參考" aria-hidden="true">#</a></h3><ul><li><a href="https://community.snowflake.com/s/article/How-to-Join-2-tables-using-SQL-Alchemy" target="_blank" rel="noreferrer">How to: Join 2 tables using SQL Alchemy without using SQL statements</a></li><li><a href="https://bitestreams.com/blog/fastapi_sqlalchemy/" target="_blank" rel="noreferrer">10 Tips for adding SQLAlchemy to FastAPI</a></li><li><a href="https://docs.sqlalchemy.org/en/14/orm/loading_relationships.html" target="_blank" rel="noreferrer">sqlalchemy - Relationship Loading Techniques</a></li><li><a href="https://fastapi.tiangolo.com/tutorial/sql-databases/?h=relationships#create-the-relationships" target="_blank" rel="noreferrer">Fastapi - Sqlalchemy</a></li><li><a href="https://sqlmodel.tiangolo.com/tutorial/fastapi/multiple-models/" target="_blank" rel="noreferrer">Multiple Models with FastAPI</a></li><li><a href="https://mergeboard.com/blog/6-multitenancy-fastapi-sqlalchemy-postgresql/" target="_blank" rel="noreferrer">Multitenancy with FastAPI, SQLAlchemy and PostgreSQL</a></li></ul>`,11),e=[p];function t(c,r,D,F,y,i){return a(),l("div",null,e)}const _=s(o,[["render",t]]);export{C as __pageData,_ as default};
