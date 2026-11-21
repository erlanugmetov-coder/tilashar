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
rep("var CURV='v185';","var CURV='v193';")
# озвучка kk23 (1081 слово: kk21 + Связи + Темы 5–6)
_K=json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'split5','k27.json'),encoding='utf-8'))
_i=s.index('SNDW={');_j=s.index('}',_i);s=s[:_i]+'SNDW='+json.dumps(_K,ensure_ascii=False,separators=(',',':'))+s[_j+1:]
assert s.count("'kk22.mp3'")>=1;s=s.replace("'kk22.mp3'","'kk27.mp3'")
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
var T1P={1:['Мен'],3:['Сен'],4:['Сіз'],5:['Ол','Біз'],6:['Сендер','Сіздер','Олар']};
var T1CODE={'Мен':'men','Сен':'sen','Сіз':'siz','Ол':'ol','Біз':'biz','Сендер':'sender','Сіздер':'sizder','Олар':'olar'};
function t1Ready(){return thDone(0)} /* разминка — после всей Темы 1 */
warmNeeded=function(){var d=SD();return t1Ready()&&!!d.first&&d.first!==TODAY()&&d.warm!==TODAY()};
function seen1(w){w=String(w||'').toLowerCase();if(!w)return;if(!st.seen1)st.seen1=[];if(st.seen1.indexOf(w)<0)st.seen1.push(w)}
function tetCfg1(){var dl=[0,1,2,3,4,5,6,7,8],pr=[],seen=st.seen1||[],combos={};
  Object.keys(T1P).forEach(function(k){if(dl.indexOf(+k)>=0)pr=pr.concat(T1P[k])});
  pr.forEach(function(p){var code=T1CODE[p],ok=(TETCOMBOS[p]||[]).filter(function(x){return h1ok(x[0],code)&&H1W.some(function(v){return v[0]===x[0]})&&canSay(p+' '+x[0]+(tailOf(x[0],code)||''))}),
    sn=ok.filter(function(x){return seen.indexOf(x[0])>=0});if(sn.length>=4)ok=sn;if(ok.length)combos[p]=ok});
  return combos}
__THEMES__
var T1K={'Мен':1,'Сен':3,'Сіз':4,'Ол':5,'Біз':5,'Сендер':6,'Сіздер':6,'Олар':6};
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
js=SP_MAIN+KD+SV+RS+js
js=js.replace('__THEMES__',open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'themes.js'),encoding='utf-8').read()).replace('__TETHTML__',hj).replace('__COMBOS__',combos.strip())
anchor='window.__c.showCity=showCity;showCity();'
assert s.count(anchor)==1
s=s.replace(anchor,js+anchor)
last=s.rfind('</script>');s=s[:last]+'\n'+SP_BOOK+'\n'+s[last:]
open(out,'w',encoding='utf-8').write(s)
print('ok',len(s))
