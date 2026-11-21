#!/usr/bin/env python3
"""Тестовая ссылка (все темы пройдены, разминка при каждом открытии):
python3 make_test_warm.py main186.html test185_index.html out.html — сид берётся из прошлой тестовой ссылки."""
import sys
main,old,out=sys.argv[1:4]
m='window.__c.showCity=showCity;showCity();'
b=open(old,encoding='utf-8').read();i=b.index(m);seed=b[b.rfind('(function(){',0,i):i]
seed=seed.replace('[0,1,4,7,5,6,8,2,3].forEach','[0,1,4,7,5,9,6,8,10,11,2,3].forEach')
seed=seed.replace("warmNeeded=function(){return false}; /* тест: без замка «Спасаем слова» */","try{window.TETAFTER=1;if(!cst().intro)cst().intro=1;save()}catch(e){} /* тест: тетрис после Проверки каждой темы */\n")
s=open(main,encoding='utf-8').read().replace('tilashar-aina2-v3','tilashar-testall-v1')
assert s.count(m)==1 and 'TETAFTER' in seed
open(out,'w',encoding='utf-8').write(s.replace(m,seed+m))
