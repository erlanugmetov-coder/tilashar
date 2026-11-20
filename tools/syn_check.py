#!/usr/bin/env python3
"""Проверка: близкие по смыслу слова не стоят вариантами в одном задании (и не лишняя деталь в «Собери»)."""
import sys,json
from playwright.sync_api import sync_playwright
G=[['ақылды','зерек','тапқыр','умн','сообразит','находчив'],['жылдам','шапшаң','быстр','шустр'],['күшті','мықты','сильн','крепк'],
   ['көңілді','қуанышты','весёл','радост'],['сабырлы','шыдамды','спокойн','терпелив']]
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page();pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/out_fresh53.html');pg.wait_for_timeout(600)
  res=pg.evaluate("""(G)=>{var tx=h=>{var d=document.createElement('div');d.innerHTML=String(h);return d.textContent.toLowerCase()};var out=[];
   for(var th=0;th<4;th++){setTheme(th);for(var li=0;li<LESSONS.length;li++){for(var k=0;k<(li==LESSONS.length-1?30:6);k++){var r=genRun(LESSONS[li]);r.forEach(s=>{if(!s.task)return;
     var sets=[];if(s.o)sets.push(s.o.map(tx));if(s.c)sets.push(s.c.concat(s.x||[]).map(tx));
     sets.forEach(op=>{G.forEach(g=>{var kz=g.filter(w=>/[әіңғүұқөһ]|[а-я]+ды$|[а-я]+ті$|[а-я]+ам$/.test(w)&&!/[ё]/.test(w));
       var found=new Set();op.forEach(o=>{g.forEach((w,wi)=>{if(o.indexOf(w)>=0)found.add(wi%Math.ceil(g.length/2)===wi?wi:wi)})});
       var hitW=g.filter(w=>op.some(o=>o.indexOf(w)>=0));var half=g.length/2;var kzH=hitW.filter(w=>g.indexOf(w)<half),ruH=hitW.filter(w=>g.indexOf(w)>=half);
       if(kzH.length>1||ruH.length>1)out.push('Т'+(th+1)+' У'+(li+1)+' ['+s.task+'] '+tx(s.q||'').slice(0,70)+' | '+op.join(' / '))})})})}}}
   return [...new Set(out)]}""",G)
  b.close()
for r in res: print(r)
print('ЧИСТО' if not res else 'НАЙДЕНО: %d'%len(res))
