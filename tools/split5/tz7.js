/* v199: ТЗ «короче уроки (текст)» — режем болтовню вокруг примеров, задания не трогаем.
   «Законы конструктора» — из уроков в начало Проверки темы. Правки — по готовому списку экранов урока (после всех прошлых правок). */
(function(){
function D(h){var d=document.createElement('div');d.innerHTML=h||'';return d}
function exOnly(t){var d=D(t);return [].map.call(d.querySelectorAll('.ex'),function(e){return e.outerHTML}).join('')}
function exDrop(t,auto){var d=D(t);[].forEach.call(d.querySelectorAll('.ex'),function(e){if(e.getAttribute('data-auto')===auto)e.remove()});return d.innerHTML}
function only(t,sel){var d=D(t),e=d.querySelector(sel);if(!e)return t;[].forEach.call(e.querySelectorAll('.laws'),function(x){x.remove()});return e.outerHTML}
function noLaws(t){var d=D(t);[].forEach.call(d.querySelectorAll('.laws'),function(x){x.remove()});return d.innerHTML}
function tx(L,fn){if(!L||!L.mix||L._tz7)return;L._tz7=1;var old=L.mix;L.mix=function(){var a=old.apply(this,arguments).slice();try{a=fn(a)||a}catch(e){try{console.log('tz7',L.title,e)}catch(_){}}return a.filter(Boolean)}}
function S(a,re){for(var i=0;i<a.length;i++)if(a[i]&&!a[i].task&&re.test(a[i].t||''))return i;return -1}
function T(a,f){for(var i=0;i<a.length;i++)if(a[i]&&a[i].task&&f(a[i]))return i;return -1}
function set(a,re,f){var i=S(a,re);if(i<0)return -1;var x=a[i];var r=f(x.t,x);a[i]=r==null?null:(typeof r==='string'?{s:x.s,t:r}:r);return i}
function addYes(a,f,txt){var i=T(a,f);if(i>=0)a[i]=Object.assign({},a[i],{yes:(a[i].yes||'')+' '+txt})}
function byTitle(sl,re){var r=null;(TL[sl]||[]).forEach(function(L){if(re.test(L.title||''))r=L});return r}
try{
/* ---------- Тема 1 «Кто я» ---------- */
tx(TL[0][0],function(a){
  set(a,/Никогда не меняется/,function(){return null});
  set(a,/Ты ученик\. А в чём ты сильный/,function(t){return t.replace('Ты ученик. А в чём ты сильный? Каждый в школе в чём-то лучший:','А ещё ты можешь быть…')})});
tx(TL[0][1],function(a){
  set(a,/из ушей пошёл дым/,function(){return null});
  set(a,/у каждой буквы свой/,function(t){return {s:'dizzy',t:'<p>Я сказала «Мен досмын» — и из ушей пошёл дым 💨🤖 Оказывается, у букв есть характер: <b>спокойные</b> 😌, <b>шептуны</b> 🤫 и <b>жужжалки</b> 🐝. Со спокойными всё как раньше:</p>'+exOnly(t)}});
  set(a,/Шептун «к» подходит/,function(t){return exDrop(t,'Мен қонақпын')});
  set(a,/Все три характера/,function(){return null})});
tx(TL[0][2],function(a){
  set(a,/но это позже/,function(t){return '<p><b>Сен</b> — «ты» для своих: друга, брата, одноклассника 👋</p>'+exOnly(t)});
  set(a,/можно даже пропустить/,function(t){return t.replace(/\s*Поэтому «Мен» можно даже пропустить:\s*<span[^>]*>Оқушымын!<\/span>/,'')});
  set(a,/Помнишь бабушку, которая подняла бровь/,function(){return null});
  set(a,/вежливое слово для обращения/,function(t){return {s:'look',t:'<p>Однажды я сказала бабушке «Сен…» — она подняла бровь 🤨 Взрослым говорят <b>Сіз</b> — вежливо: учителю, врачу, незнакомому взрослому 🙇</p>'+exOnly(exDrop(t,'Сіз дәрігерсіз'))}});
  set(a,/не меняется никогда/,function(t){return '<p>Хвостик <b>-сыз / -сіз</b> не меняется никогда — ни шептуны, ни жужжалки ему не страшны 😎</p>'+exOnly(t)})});
tx(TL[0][4],function(a){
  set(a,/а там 25 человек/,function(){return null});
  set(a,/Когда говоришь всему классу/,function(t){return {s:'wow',t:'<p>В классе 25 человек 😳 Каждому «Сен» — до вечера не управишься! Всем сразу — <b>Сендер</b>:</p>'+exOnly(t)}});
  set(a,/взрослых несколько/,function(t){return exDrop(t,'Сіздер тәрбиешісіздер')});
  var it=set(a,/class="kfam2"/,function(t){return only(t,'.kfam2')});
  if(it>=0){var tb=a[it],ib=T(a,function(x){return x.task==='build'});if(ib>it){a.splice(it,1);ib=T(a,function(x){return x.task==='build'});a.splice(ib+1,0,tb)}}});
var B0=TL[0][TL[0].length-1];if(B0&&B0.boss&&B0.intro&&!B0._laws){B0._laws=1;B0.intro=[{s:'look',t:'<p>Перед проверкой вспомним законы:</p>'+LAWS1}].concat(B0.intro);B0.steps=B0.intro}

/* ---------- Тема 2 «Какой я» ---------- */
tx(byTitle(1,/жақсы баламын/),function(a){
  var i1=S(a,/соединим их в одну фразу/),i2=S(a,/Ещё пример:/);
  if(i1>=0){a[i1]={s:'wow',t:'<p>Соединим в одну фразу! Признак — перед словом, хвостик — один, в конце 🚂</p>'+exOnly(a[i1].t)+(i2>=0?exOnly(a[i2].t).replace(' Особенно у доски. 🤓',''):'')};if(i2>=0)a[i2]=null}
  set(a,/признак не меняется — как скала/,function(){return '<p>Признак не меняется 🗿 Хвостик один, как у кота. Два хвостика — это монстр 👾</p>'})});
tx(byTitle(1,/батылсың/),function(a){
  var i1=S(a,/И целой фразой/),i2=S(a,/Спроси друга, какой он/),i3=S(a,/Про того, кого рядом нет/);
  if(i1>=0){var dl=i2>=0?(D(a[i2].t).querySelector('.dlg')||{outerHTML:''}).outerHTML:'';
    a[i1]={s:'look',t:'<p>Целой фразой — хвостик в конце 🚂</p>'+exOnly(a[i1].t)+(dl?'<p>Спроси друга:</p>'+dl:'')+(i3>=0?'<p>А про того, кого нет рядом, — без хвостика:</p>'+exOnly(a[i3].t):'')};
    if(i2>=0)a[i2]=null;if(i3>=0)a[i3]=null}
  set(a,/В русском «добрый \/ добрая» меняется/,function(t){return t.replace(/<p>В русском «добрый \/ добрая» меняется[\s\S]*?<\/p>/,'<p><b>Мейірімді</b> — всегда мейірімді. Удобно! 😌</p>')})});
tx(byTitle(1,/^Біз, Сіз, Сендер/),function(a){
  set(a,/А теперь фокус/,function(t){return only(t,'.kfam2')});
  set(a,/Старые знакомые/,function(){return '<p>Ол и Олар — без хвостика. Старые знакомые! 👋</p>'})});
(TL[1]||[]).forEach(function(L){if(L.boss)return;tx(L,function(a){var i=S(a,/class="laws"/);if(i>=0){var t=noLaws(a[i].t);a[i]=D(t).textContent.trim()?{s:a[i].s,t:t}:null}})});
var B1=TL[1][TL[1].length-1];if(B1&&B1.boss&&B1.intro&&!B1._laws){B1._laws=1;B1.intro=[{s:'look',t:'<p>Перед проверкой вспомним законы:</p>'+LAWS2}].concat(B1.intro);B1.steps=B1.intro}

/* ---------- Базар ---------- */
tx(byTitle(3,/^Сен неше жастасың/),function(a){
  set(a,/тоғызқұмалақ/,function(){return null});
  addYes(a,function(x){return x.task==='pairs'&&/тоғыз/.test(JSON.stringify(x.ps||''))},'Тоғыз — как в игре <b>тоғызқұмалақ</b>, «девять шариков» ⚫');
  var ia=S(a,/Гүлнар апа/),ib=S(a,/Отвечаем так/);
  if(ia>=0&&ib>=0){a[ia]={s:'happy',t:'<p>Весёлая <b>Гүлнар апа</b> угощает тебя яблоком и спрашивает:</p>'+exOnly(a[ia].t)+'<p>Отвечаем: число + <b>жаста</b> + хвостик «кто»:</p>'+exOnly(a[ib].t)+'<p><b>Балам</b> — так ласково говорят детям 😊</p>'};a[ib]=null}});
tx(byTitle(3,/^Біз төртеуміз/),function(a){
  set(a,/особыми числами/,function(t){return t.replace(/<div class="exs">[\s\S]*?<\/div>/,'<div class="exs">екі → <b>екеу</b> — двое<br>үш → <b>үшеу</b> — трое<br>төрт → <b>төртеу</b> — четверо<br>бес → <b>бесеу</b> — пятеро</div>')});
  addYes(a,function(x){return /үшеу/.test(x.q||'')&&!/Образец/.test(x.q||'')},'А ещё: <b>алтау</b> — шестеро, <b>жетеу</b> — семеро.');
  set(a,/снова хвостик «кто»/,function(t){return t.replace(/<p><b>екеу, үшеу[\s\S]*?<\/p>/,'<p><b>Алтау</b> — твёрдый, хвостик синий. Всегда не как все 😄</p>')})});
tx(byTitle(3,/^Неше\?/),function(a){
  set(a,/Покупатель на базаре/,function(){return null});
  set(a,/А теперь секрет/,function(t){return {s:'wow',t:'<p><b>Неше?</b> — сколько? После числа слово не меняется:</p>'+exOnly(t)}});
  set(a,/Порядок как у признака/,function(){return null});
  set(a,/с ними то же правило/,function(t){return t.replace(/(<p>А это <b>овощи<\/b>[\s\S]*?<\/p>)<p>[\s\S]*?<\/p>/,'$1<p>🥕 <span class="kk" data-say="сәбіз">сәбіз</span> — морковь · 🍅 <span class="kk" data-say="қызанақ">қызанақ</span> — помидор · 🥔 <span class="kk" data-say="картоп">картоп</span> — картошка</p>')})});

/* ---------- Откуда: «Біз қонақтан қайтамыз» ---------- */
tx(byTitle(6,/қонақтан қайтамыз/),function(a){
  set(a,/три банки варенья/,function(){return null});
  addYes(a,function(x){return x.say==='Біз қонақтан қайтамыз'},'Бабушка дала с собой три банки варенья. И пирожки. Машина еле едет! 🍯🚗😄');
  set(a,/Школьный секрет: стрелка «откуда»/,function(){return {s:'star',t:'<p>🏫 Стрелка «откуда» — падеж <b>Шығыс</b> 🚪. Три навигатора: <b>Барыс</b>, <b>Жатыс</b>, <b>Шығыс</b> 🧭</p>'}})});

/* ---------- Мой / твой: «Біздің мектебіміз» ---------- */
tx(byTitle(7,/мектебіміз/),function(a){
  set(a,/если школа общая/,function(){return null});
  set(a,/Вся семья на одном слове/,function(t){var d=D(t);[].forEach.call(d.querySelectorAll('.kfrow'),function(r){var b=(r.querySelector('b')||{}).textContent||'';if(['Менің','Сенің','Оның','Біздің'].indexOf(b.trim())<0)r.remove()});return d.innerHTML});
  set(a,/Он думает, что это мы/,function(){return null});
  addYes(a,function(x){return x.task==='pairs'},'Біздің мысығымыз… Он думает, что это мы — его люди 🐱👑')});
}catch(e){try{console.log('tz7',e)}catch(_){}}
})();
