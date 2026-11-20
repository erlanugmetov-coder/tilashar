#!/usr/bin/env python3
"""Сборка тестовой ссылки: python3 make_test.py main.html out_test.html
Берёт index.html главного артефакта, меняет ключ хранилища и вставляет сид (Темы 1-3 пройдены)."""
import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src).read().replace('tilashar-aina2-v3','tilashar-test4-v1')
seed="(function(){try{if(st.t4seed)return;function rg(n){var a=[];for(var i=0;i<n;i++)a.push(i);a.push(n+1);return a}\n[0,1,4].forEach(function(th){setTheme(th)});st.done=rg(TL[0].length);st.d2=rg(TL[1].length);st.d3=[];st.d4=[];st.d5=rg(TL[4].length);st.d6=[];st.d7=[];st.d8=[];st.name=st.name||'Ерлан';st.coins=Math.max(st.coins||0,30);\nst.c2={done:CTASK.filter(function(t){return t.cl!=null||t.lv!=null||t.pl!=null}).map(function(t){return t.id}),gifts:[],up:{},roof:'#ff8a3d',tut:9,yarr:1,parr:1,pfest:1};st.energy=6;\nvar s=SD();s.first='2000-01-01';s.warm=TODAY();st.sum1=st.sum2=st.sum5=1;st.fbAsk=2;st.chAsk=2;st.m158=1;st.t4seed=1;save();\nif((localStorage.getItem('tilashar-test4-v1')||'').indexOf('t4seed')>=0){window.NOARRIVE=1;location.reload()}}catch(e){console.log('seed',e)}})();\n"
m='window.__c.showCity=showCity;showCity();'
assert s.count(m)==1
open(dst,'w').write(s.replace(m,seed+m))
