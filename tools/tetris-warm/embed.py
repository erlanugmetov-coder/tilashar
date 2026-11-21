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
rep("var CURV='v185';","var CURV='v186';")
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
/* v186: разминка — мягкий тетрис Темы 1 вместо «Спасаем слова» (исходник tools/tetris-warm) */
var TETHTML=__TETHTML__;
var TETCOMBOS=__COMBOS__;
var T1P={1:['Мен'],3:['Сен'],4:['Сіз'],5:['Ол','Біз'],6:['Сендер','Сіздер','Олар']};
var T1CODE={'Мен':'men','Сен':'sen','Сіз':'siz','Ол':'ol','Біз':'biz','Сендер':'sender','Сіздер':'sizder','Олар':'olar'};
function t1Ready(){try{return doneList(0).indexOf(2)>=0}catch(e){return false}}
warmNeeded=function(){var d=SD();return t1Ready()&&!!d.first&&d.first!==TODAY()&&d.warm!==TODAY()};
function seen1(w){w=String(w||'').toLowerCase();if(!w)return;if(!st.seen1)st.seen1=[];if(st.seen1.indexOf(w)<0)st.seen1.push(w)}
function tetCfg(){var dl=doneList(0),pr=[],seen=st.seen1||[],combos={};
  Object.keys(T1P).forEach(function(k){if(dl.indexOf(+k)>=0)pr=pr.concat(T1P[k])});
  pr.forEach(function(p){var code=T1CODE[p],ok=(TETCOMBOS[p]||[]).filter(function(x){return h1ok(x[0],code)&&H1W.some(function(v){return v[0]===x[0]})&&canSay(p+' '+x[0]+(tailOf(x[0],code)||''))}),
    sn=ok.filter(function(x){return seen.indexOf(x[0])>=0});if(sn.length>=4)ok=sn;if(ok.length)combos[p]=ok});
  var d=SD(),prio=[],has=function(p,w){return combos[p]&&combos[p].some(function(x){return x[0]===w})};
  (d.terr||[]).forEach(function(k){var a=String(k).split('|');if(has(a[0],a[1]))prio.push(a)});
  (d.errs||[]).forEach(function(e){if(e.th!==0)return;var ps=e.k===2?['Мен']:(T1P[e.k]||[]);ps.forEach(function(p){if(combos[p])prio.push([p,b2one(combos[p])[0]])})});
  var seenP={};prio=prio.filter(function(x){var k=x[0]+'|'+x[1];if(seenP[k])return false;seenP[k]=1;return true});
  return {combos:combos,prio:prio.slice(0,8),name:String(st.name||T()||''),coins0:st.coins}}
function tetOpen(){try{stopTown()}catch(e){}try{CBUSY=false}catch(e){}var w=document.getElementById('wtoast');if(w)w.remove();
  var cfg=tetCfg();if(!Object.keys(cfg.combos).length){var d=SD();d.warm=TODAY();save();WENTRY=1;showCity();return}window.TETCFG=cfg;
  try{if(MUS&&!MUS.paused)MUS.pause()}catch(e){}
  var o=document.getElementById('tetov');if(o)o.remove();o=document.createElement('iframe');o.id='tetov';o.title='Разминка';
  o.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;border:0;z-index:9999;background:#bfe6ff';o.srcdoc=TETHTML;document.body.appendChild(o)}
window.tetDone=function(r){r=r||{};var o=document.getElementById('tetov');var d=SD(),okk=r.ok||[];
  d.terr=(d.terr||[]).filter(function(k){return okk.indexOf(k)<0});(r.err||[]).forEach(function(k){if(d.terr.indexOf(k)<0)d.terr.push(k)});while(d.terr.length>12)d.terr.shift();
  CGAIN=0;d.woke=sleepLevel()>0;d.warm=TODAY();d.grew=markActive();d.party=TODAY();st.coins+=(+r.earn||0);save();WENTRY=1;
  setTimeout(function(){if(o)o.remove()},60);showCity();setCoins()};
warmEntry=tetOpen;startWarm=tetOpen;
"""
hj=json.dumps(w,ensure_ascii=False).replace('</','<\\/').replace('\u2028','\\u2028').replace('\u2029','\\u2029')
js=js.replace('__TETHTML__',hj).replace('__COMBOS__',combos.strip())
anchor='window.__c.showCity=showCity;showCity();'
assert s.count(anchor)==1
s=s.replace(anchor,js+anchor)
open(out,'w',encoding='utf-8').write(s)
print('ok',len(s))
