#!/usr/bin/env python3
"""Встроить тетрис-разминку в игру: python3 embed.py main_in.html warm.html main_out.html
Заменяет «Спасаем слова» на мягкий тетрис Темы 1 (раз в день, после урока «Буквы с характером»)."""
import sys,json,os
src,warm,out=sys.argv[1:4]
s=open(src,encoding='utf-8').read();w=open(warm,encoding='utf-8').read()
combos=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'tetris','combos.json'),encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    c=s.count(a);assert c==n,(c,a[:70]);s=s.replace(a,b)
for _a,_b in [('облако стёрло сцепки между вагонами. И между словами тоже!','облако стёрло связи между вагонами. И между словами тоже!'),('Облако стёрло сцепки','Облако стёрло связи'),('главный сцепщик вокзала','главный по связям'),('сцепки соединяют слова','связи соединяют слова')]:
    s=s.replace(_a,_b)
rep("var CURV='v185';","var CURV='v204';")
# v197: русская реплика Айны звучит при появлении облачка, казахские примеры — после неё
rep("bub.innerHTML=html;svg.classList.add('talk');sBloop();","bub.innerHTML=html;svg.classList.add('talk');sBloop();try{if(ruFind(html).length){bub.dataset.ru=html;ruSay(html)}}catch(e){}")
rep("(function nx(i){if(i>=au.length||my!==run)return;","ruAfter(function(){(function nx(i){if(i>=au.length||my!==run)return;")
rep("})(0); /* v116: все примеры по очереди */","})(0)}); /* v116: все примеры по очереди; v197: после русской реплики */")
rep("if(na)ms=Math.max(ms,1200+na*1700);","if(na)ms=Math.max(ms,1200+na*1700);try{ms+=ruLeft()}catch(e){}")
rep("Жми на ⚡ — починим!","Жми на облачко над домиком — починим!") # v198
# v201: полоска урока — сплошная, плавно наполняется (вместо отрезков)
rep("""var x='<i id="bar" style="display:none"></i>';for(var j=0;j<n;j++)x+='<b class="'+(j<k?'ok':(j===k&&cur>0&&!done&&si>0?'now':''))+'"></b>';h.innerHTML=x}""",
    """var pc=done?100:Math.round(k/n*100),f=h.querySelector('.pfill');if(!f){h.innerHTML='<i id="bar" style="display:none"></i><span class="ptrack"><span class="pfill"></span></span>';f=h.querySelector('.pfill');void f.offsetWidth}f.style.width=pc+'%'}""")
rep(".seg b.ok{background:#4caf50}",".seg b.ok{background:#4caf50}.seg .ptrack{flex:1;display:block;height:10px;border-radius:99px;background:#eadfc6;overflow:hidden}.seg .pfill{display:block;height:100%;width:0;border-radius:99px;background:#4caf50;transition:width .6s ease}.seg.fin .pfill{animation:segf .6s 2}")
rep("tries=0;ctl().innerHTML='';var my=run;","if(s.joke)msg+='<p class=\"joke\">'+s.joke+'</p>';tries=0;ctl().innerHTML='';var my=run;") # v202: шутка Айны после любого задания
# v204: в парах не резать цельные слова, похожие на «слово + хвостик»
rep("function ppLego(t){var w=t.split(' '),last=w.pop(),pre=w.length?'<span class=\"ppre\">'+w.join(' ')+' </span>':'';","var PPNO=['дәптер','сәбіз','қарбыз','досың'];function ppLego(t){var w=t.split(' '),last=w.pop(),pre=w.length?'<span class=\"ppre\">'+w.join(' ')+' </span>':'';if(PPNO.indexOf(last.toLowerCase())>=0)return pre+'<span class=\"plg\"><span class=\"pr\">'+last+'</span></span>';")
# ===== v194: ТЗ пункты 2–5 (первый день ребёнка) =====
# 2) вступление 5 экранов → 3: s0 = падение + прозвища, s2 = город, s3 = город + энергия + «Полетели»
rep("""if(s===0)h='<div class="iav fall">'+AINA('dizzy',120)+'</div><div class="ibub">Бзз-з-з… 😵 Ой! Где я?</div><button class="go" data-a="inext">Дальше</button>';""",
    """if(s===0)h='<div class="iav fall">'+AINA('look',110)+'</div><div class="ibub">Бзз-з… 😵 Ой! Сәлем, я — <b>Айна</b>, робот. Кажется, я упала и <b>всё забыла</b>… Как тебя называть?</div><div class="iopts">'+TITLES.map(function(t){return '<button class="opt" data-a="ititle" data-v="'+t+'">'+t+'</button>'}).join('')+'</div>';""")
rep("""else if(s===3)h='<div class="iav">'+AINA('wow',120)+'</div><div class="ibub"><b>'+esc(st.city_name)+'!</b> Вспомнила — это наш город! Но над ним повисло <b>облако забвения</b> ☁️ Все забыли казахские слова, и город заснул…</div><button class="go" data-a="inext">Дальше</button>';""",
    """else if(s===3)h='<div class="iav">'+AINA('star',120)+'</div><div class="ibub"><b>'+esc(st.city_name)+'!</b> Это наш город. Над ним повисло <b>облако забвения</b> ☁️ — все забыли казахские слова. Каждое слово, которое ты выучишь, — <b>энергия ⚡</b> для города. Поможешь?</div><button class="go" data-a="iend">Полетели! ☁️</button>';""")
rep("if(r&&(s===4||s===0))","if(r&&(s===3||s===0))")
# 3) урок 1.1: до первого задания 1 экран
import re as _re
_i=s.index("intro:[\n  {s:'look',t:'<p>Облако забвения стёрло");_j=s.index("{s:'look',t:'<p><b>Синий или розовый?</b>",_i)
_train=s[s.index("{s:'wow',t:'<p>Смотри, какой поезд",_i):s.index("{s:'wink',t:'<p>Я ведь робот-зеркало",_i)]
assert _train.count('Смотри, какой поезд собирается из одного слова')==1 and 'Запоминать пока не надо 😄 Начнём с одного хвостика.' in _train
_train=_train.replace("<p>Смотри, какой поезд собирается из одного слова: 🚂</p>","<p>Ты уже собираешь казахские фразы! 🎉 Смотри, какой поезд ты скоро сможешь собрать 🚂</p>").replace("Запоминать пока не надо 😄 Начнём с одного хвостика.","Запоминать не надо — просто полюбуйся 😄").rstrip().rstrip(',')
_k=s.index("}],\n  mix:",_j)
_blue=s[_j:_k+1]
s=s[:_i]+"intro:[\n  {s:'happy',t:'<p>Казахский язык — это <b>конструктор</b> 🧱: слово + <b>хвостик</b>. Смотри:</p>'+exP('Мен','Айна','мын','Мен Айнамын — я Айна! 👋')+'<p>Теперь ты!</p>'},\n  "+_blue+",\n  "+_train+s[_k+1:]
rep("return [I[0],I[1],I[2],I[3],I[4],I[5],h1Name(hd[0]),I[6],I[7],h1Name(sf[0]),h1NameB(rest[0]),{task:'name'}]}},",
    "return [I[0],h1Name(hd[0]),I[1],h1Name(sf[0]),h1NameB(rest[0]),I[2],{task:'name'}]}},")
rep("end:'Я вспомнила первый хвостик — <b>«это я»</b>! Спасибо, %T%!'","end:'Я вспомнила первый хвостик — <b>«это я»</b>! Я ведь робот-зеркало 🪞 и показываю самого главного человека — тебя, %T%! 😎'")
# 4) обещание в конце первого дня (только если завтра правда будет тетрис)
rep("""'<div class="egain">⚡ +'+CGAIN+' энергии Айне</div>""","""'<div class="egain">⚡ +'+CGAIN+' энергии Айне</div>'+(function(){try{var D=SD();if(D.first===TODAY()&&!D.prom&&tetAvail().length){D.prom=1;save();return '<p class="endsay">🎮 Завтра покажу тебе игру! Приходи — Айна будет ждать.</p>'}return ''}catch(e){return ''}})()+'""")
# 5) экран разминки: короче и без «нельзя покидать город»
_a=s.index("if(n<=0){f='wow';t='Сәлем,");_b=s.index("var cloud=",_a)
s=s[:_a]+"""if(n<=0){f='happy';t='Сәлем, <b>'+nm+'</b>! 👋 Ночью облако забвения подкралось к городу. Разминка на 1 минуту — и спасём его! 🎮'}
  else if(n===1){f='shy';t='Ой, <b>'+nm+'</b>, тебя вчера не было! ☁️ Облако вернулось. Давай быстро спасём город — 1 минута! 🎮'}
  else{f='happy';t='Ура, <b>'+nm+'</b>, ты вернулся! 🎉 Облако накрыло город, но мы его быстро спасём — 1 минута! 🎮'}
  """+s[_b:]
# v193: шаг «Напиши имя» не считается заданием (иначе за урок без ошибок только 2 звезды)
rep("function nameFlow(nm,remembered){ctl().innerHTML='';var add=[];","function nameFlow(nm,remembered){ctl().innerHTML='';var add=[];if(!remembered)nTasks--;")
# озвучка kk23 (1081 слово: kk21 + Связи + Темы 5–6)
_K=json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','k30.json'),encoding='utf-8'))
_i=s.index('SNDW={');_j=s.index('}',_i);s=s[:_i]+'SNDW='+json.dumps(_K,ensure_ascii=False,separators=(',',':'))+s[_j+1:]
assert s.count("'kk22.mp3'")>=1;s=s.replace("'kk22.mp3'","'kk30.mp3'") # v195: та же озвучка, сжата до 32 кбит/с (4,7 МБ)
# тексты
rep("var WARM={title:'Спасаем слова',sub:'3 задания из пройденного'","var WARM={title:'Разминка',sub:'1 минута'")
rep("Давай вместе? Всего 3 задания!","Давай вместе? Всего 1 минута!")
rep("Давай сначала разминку — всего 3 задания!","Давай сначала разминку — всего 1 минута!")
rep("Давай вместе — 3 задания!","Давай вместе — 1 минута!")
rep("Сначала разминка — 3 задания.","Сначала разминка — 1 минута.")
rep('<span class="wic">🧠</span><span class="wtx"><b>Спасаем слова</b><small>3 задания из пройденного</small>','<span class="wic">🎮</span><span class="wtx"><b>Разминка</b><small>1 минута — и в город</small>')
rep("' · слова спасены ✓'","' · разминка ✓'")
rep("Эти уроки чаще попадают в ежедневное повторение «Спасаем слова».","Эти уроки чаще попадают в ежедневную разминку.")
rep("Каждый день начинается со «Спасаем слова» — 3 коротких задания на повторение того, что уже пройдено.","Каждый день начинается с разминки — 1 минута игры на повторение того, что уже пройдено.")
rep("pl.innerHTML='🧠 Спасаем слова<small>3 задания</small>'","pl.innerHTML='🎮 Разминка<small>1 минута</small>'")
rep("Спаси их — 🧠 Спасаем слова!","Спаси их — 🎮 разминка!")
rep("Только ты можешь его разбудить 🧠'","Только ты можешь его разбудить 🎮'")
rep('data-a="warm">🧠 Спасти слова!</button>','data-a="warm">🎮 Разминка!</button>',2)
assert 'Спасаем слова' not in s and 'Спасти слова' not in s
# какие слова Темы 1 ребёнок видел в заданиях
rep("var s=L.run[si];if(L.warm&&s._th!=null&&s._th!==THX)setTheme(s._th);","var s=L.run[si];if(!L.warm&&THX===0&&s&&s.r)seen1(s.r);if(L.warm&&s._th!=null&&s._th!==THX)setTheme(s._th);")
js=r"""
/* v187: разминка — мягкий тетрис Темы 1 вместо «Спасаем слова» (исходник tools/tetris-warm) */
var TETHTML=__TETHTML__;
var TETCOMBOS=__COMBOS__;
var T1P={0:['Мен'],2:['Сен','Сіз'],3:['Ол','Біз'],4:['Сендер','Сіздер','Олар']}; /* v198: Тема 1 — 5 уроков */
var T1CODE={'Мен':'men','Сен':'sen','Сіз':'siz','Ол':'ol','Біз':'biz','Сендер':'sender','Сіздер':'sizder','Олар':'olar'};
function t1Ready(){return thDone(0)} /* разминка — после всей Темы 1 */
warmNeeded=function(){var d=SD();return !!d.first&&d.first!==TODAY()&&d.warm!==TODAY()&&tetAvail().length>0}; /* v194: разминка, как только есть тетрис (Тема 1 — после 2 уроков) */
function seen1(w){w=String(w||'').toLowerCase();if(!w)return;if(!st.seen1)st.seen1=[];if(st.seen1.indexOf(w)<0)st.seen1.push(w)}
function tetCfg1(dl){dl=dl||[0,1,2,3,4,5,6,7,8];var early=dl.indexOf(1)<0,pr=[],seen=st.seen1||[],combos={};
  Object.keys(T1P).forEach(function(k){if(dl.indexOf(+k)>=0)pr=pr.concat(T1P[k])});
  pr.forEach(function(p){var code=T1CODE[p],ok=(TETCOMBOS[p]||[]).filter(function(x){return h1ok(x[0],code)&&H1W.some(function(v){return v[0]===x[0]})&&canSay(p+' '+x[0]+(tailOf(x[0],code)||''))}),
    sn=ok.filter(function(x){return seen.indexOf(x[0])>=0});if(early){var E1=['бала','оқушы','суретші','спортшы','биші','әнші'];ok=ok.filter(function(x){return E1.indexOf(x[0])>=0});sn=[]} /* v194: до урока «Буквы с характером» — только слова уроков 1–2 */if(sn.length>=4)ok=sn;if(ok.length)combos[p]=ok});
  return combos}
__THEMES__
var T1K={'Мен':0,'Сен':2,'Сіз':2,'Ол':3,'Біз':3,'Сендер':4,'Сіздер':4,'Олар':4};
function tetCfg(TH){var items=tetItems(TH.slot);if(TH.slot===0)items.forEach(function(x){x.k=T1K[x.a]});
  var d=SD(),prio=[],seenP={};
  (d.terr||[]).forEach(function(k){var a=String(k).split('|');if(+a[0]===TH.slot&&items.some(function(x){return x.full===a[1]}))prio.push(a[1])});
  (d.errs||[]).forEach(function(e){if(e.th!==TH.slot)return;var c=items.filter(function(x){return x.k===e.k||(TH.slot===0&&e.k===2&&x.a==='Мен')});if(c.length)prio.push(b2one(c).full)});
  prio=prio.filter(function(f){if(seenP[f])return false;seenP[f]=1;return true}).slice(0,8);
  return {th:TH.slot,title:TH.name,ico:TH.ico,items:items,tails:tetTails(items),prio:prio,name:String(st.name||T()||''),coins0:st.coins}}
function tetFrame(T){var cfg=tetCfg(T);window.TETCFG=cfg;window.TETCUR=T;
  try{if(MUS&&!MUS.paused)MUS.pause()}catch(e){}
  var o=document.getElementById('tetov');if(o)o.remove();o=document.createElement('iframe');o.id='tetov';o.title='Разминка';
  o.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;border:0;z-index:9999;background:#bfe6ff';o.srcdoc=TETHTML;document.body.appendChild(o)}
function tetOpen(){try{stopTown()}catch(e){}try{CBUSY=false}catch(e){}var w=document.getElementById('wtoast');if(w)w.remove();
  if(window.TETPICK){tetChooser();return}
  var T=tetPickTheme();if(!T){var d=SD();d.warm=TODAY();save();WENTRY=1;showCity();return}tetFrame(T)}
function tetChooser(){var av=tetAvail(),o=document.getElementById('tetch');if(o)o.remove();o=document.createElement('div');o.id='tetch';
  o.style.cssText='position:fixed;inset:0;z-index:9998;background:#bfe6ffee;display:flex;align-items:center;justify-content:center;padding:16px';
  o.innerHTML='<div style="background:#fffaf0;border-radius:24px;padding:18px 16px;max-width:360px;width:100%;text-align:center;box-shadow:0 8px 24px #0003"><h3 style="margin:0 0 4px;font:800 22px Rubik,Arial">🧪 Тест: какой тетрис?</h3><p style="margin:0 0 12px;color:#5d7483;font-weight:700">В игре тема выбирается сама — чаще та, где больше ошибок</p>'+
    TETTH.map(function(T){var ok=av.some(function(x){return x.slot===T.slot});return '<button data-tt="'+T.slot+'" '+(ok?'':'disabled')+' style="display:block;width:100%;margin:6px 0;padding:12px;border:0;border-radius:16px;font:800 17px Rubik,Arial;background:'+(ok?'#2fb67a':'#ccc')+';color:#fff">'+T.ico+' Тема '+T.n+' · '+T.name+'</button>'}).join('')+
    '<button data-tt="r" style="display:block;width:100%;margin:6px 0;padding:10px;border:0;border-radius:16px;font:800 15px Rubik,Arial;background:#fff;color:#14222c;box-shadow:inset 0 0 0 2px #e3d3ad">🎲 Как в игре (по ошибкам)</button></div>';
  document.body.appendChild(o);o.onclick=function(e){var b=e.target.closest('[data-tt]');if(!b||b.disabled)return;o.remove();var v=b.dataset.tt,T=v==='r'?tetPickTheme():TETTH.filter(function(x){return String(x.slot)===v})[0];if(T)tetFrame(T)}}
window.tetDone=function(r){r=r||{};var o=document.getElementById('tetov');var d=SD(),okk=r.ok||[],sl=window.TETCUR?TETCUR.slot:0,K=function(f){return sl+'|'+f};
  d.terr=(d.terr||[]).filter(function(k){return okk.map(K).indexOf(k)<0});(r.err||[]).forEach(function(f){var k=K(f);if(d.terr.indexOf(k)<0)d.terr.push(k)});while(d.terr.length>16)d.terr.shift();
  if(!(r.err||[]).length&&(r.n||0)>=5)d.errs=(d.errs||[]).filter(function(x){return x.th!==sl});d.tlast=sl;CGAIN=0;d.woke=sleepLevel()>0;d.warm=TODAY();d.grew=markActive();d.party=TODAY();st.coins+=(+r.earn||0);save();WENTRY=1;
  setTimeout(function(){if(o)o.remove()},60);showCity();setCoins()};
warmEntry=tetOpen;startWarm=tetOpen;
/* v193 (тест): после Проверки темы сразу её тетрис, потом назад к экрану «В город — строить!» */
if(typeof finish==='function'){var _tetFin=finish;finish=function(){var b=!!(L&&L.boss&&!L.warm),sl=THX;_tetFin.apply(this,arguments);
  if(!window.TETAFTER||!b)return;try{if(!ctl().querySelector('[data-a="city"]'))return;var T=TETTH.filter(function(x){return x.slot===sl})[0];if(!T)return;var it=tetItems(sl);if(it.length<4||tetTails(it).length<3)return;
    window.TETFROMBOSS=1;setTimeout(function(){tetFrame(T)},1600)}catch(e){}}}
var _tetDone0=window.tetDone;window.tetDone=function(r){if(!window.TETFROMBOSS)return _tetDone0(r);window.TETFROMBOSS=0;r=r||{};
  var o=document.getElementById('tetov'),d=SD(),okk=r.ok||[],sl=window.TETCUR?TETCUR.slot:0,K=function(f){return sl+'|'+f};
  d.terr=(d.terr||[]).filter(function(k){return okk.map(K).indexOf(k)<0});(r.err||[]).forEach(function(f){var k=K(f);if(d.terr.indexOf(k)<0)d.terr.push(k)});while(d.terr.length>16)d.terr.shift();
  d.tlast=sl;st.coins+=(+r.earn||0);save();setTimeout(function(){if(o)o.remove()},60);try{setCoins()}catch(e){}};
"""
hj=json.dumps(w,ensure_ascii=False).replace('</','<\\/').replace('\u2028','\\u2028').replace('\u2029','\\u2029')
SP=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','split5.js'),encoding='utf-8').read()
m1=SP.index('/* ---------- книжки и карточки ---------- */');m2=SP.index('/* ---------- перенос прогресса')
SP_MAIN=SP[:m1]+SP[m2:];SP_BOOK=SP[m1:m2]
KD=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','kaidan.js'),encoding='utf-8').read()
KB=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','kaidan_book.js'),encoding='utf-8').read()
SP_BOOK=SP_BOOK+'\n'+KB
SV=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','svyazi3.js'),encoding='utf-8').read()
SVB=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','svyazi3_book.js'),encoding='utf-8').read()
SP_BOOK=SP_BOOK+'\n'+SVB
RS=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','rest3.js'),encoding='utf-8').read()
RSB=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','rest3_book.js'),encoding='utf-8').read()
SP_BOOK=SP_BOOK+'\n'+RSB
SP_BOOK=SP_BOOK+'\n'+open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','tz6.js'),encoding='utf-8').read() # v196: ТЗ 6–12, 14
SP_BOOK=SP_BOOK+'\n'+open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','t1b_book.js'),encoding='utf-8').read() # v198
SP_BOOK=SP_BOOK+'\n'+open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','tz7.js'),encoding='utf-8').read() # v199: короче тексты
SP_BOOK=SP_BOOK+'\n'+open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','tz8.js'),encoding='utf-8').read()+'\n'+open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','day13_late.js'),encoding='utf-8').read() # v202
# v197: русская озвучка Айны (ТЗ 16, этап 1)
_RU=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'ru')
_RM=json.load(open(os.path.join(_RU,'ru2.json'),encoding='utf-8'));_RM={k:[v[0],v[1],v[2]] for k,v in _RM.items()}
SP_BOOK=SP_BOOK+'\n'+open(os.path.join(_RU,'ru.js'),encoding='utf-8').read().replace('__RUMAP__',json.dumps(_RM,ensure_ascii=False))
T1B=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','t1b.js'),encoding='utf-8').read() # v198: Тема 1 и Базар по стандарту
D13=open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','day13.js'),encoding='utf-8').read() # v202: Тема 13 «Менің күнім»
js=SP_MAIN+KD+SV+RS+T1B+D13+js
js=js.replace('__THEMES__',open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'themes.js'),encoding='utf-8').read()).replace('__TETHTML__',hj).replace('__COMBOS__',combos.strip())
anchor='window.__c.showCity=showCity;showCity();'
assert s.count(anchor)==1
s=s.replace(anchor,js+anchor)
last=s.rfind('</script>');s=s[:last]+'\n'+SP_BOOK+'\n'+s[last:]
open(out,'w',encoding='utf-8').write(s)
print('ok',len(s))
