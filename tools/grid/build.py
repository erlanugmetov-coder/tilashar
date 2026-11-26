import json,sys
src,dst=sys.argv[1],sys.argv[2]
key=sys.argv[3] if len(sys.argv)>3 else 'tilashar-grid-v1'
s=open(src,encoding='utf8').read()
L=[json.loads(l) for l in open('/home/claude/w/layouts.jsonl')]
asp=json.load(open('/home/claude/w/asp.json'))
g=open('/home/claude/w/grid.js',encoding='utf8').read().replace('__LAYOUTS__',json.dumps(L,ensure_ascii=False,separators=(',',':'))).replace('__ASP__',json.dumps(asp,separators=(',',':'))).replace('__VV__',json.dumps(json.load(open('/home/claude/w/v4/plan.json'))['VMAP'])).replace('__RS4__',json.dumps(json.load(open('/home/claude/w/v4/rsnd4.json')),ensure_ascii=False,separators=(',',':')))
tm=open('/home/claude/w/testmenu.js',encoding='utf8').read().replace('__KEY__',key)
m='window.__c.showCity=showCity;showCity();'
i=s.rfind(m)
s=s[:i]+g+'\n'+tm+'\n'+s[i:]
s=s.replace("CURV='v205'","CURV='v213'")
s=s.replace('sayR(m.v,L[0])','sayR(m.vv||m.v,L[0])')
assert s.count('ZMIN=.55')==1
s=s.replace('ZMIN=.55','ZMIN=.25')
n0=s.count("var r=downEl&&downEl.closest&&downEl.closest('.resident');");assert n0==1,n0
s=s.replace("var r=downEl&&downEl.closest&&downEl.closest('.resident');","var r=(downEl&&downEl.closest&&downEl.closest('.resident'))||(window.resAt&&window.resAt(e));")
assert s.count('tilashar-aina2-v3')>0
s=s.replace('tilashar-aina2-v3',key)
open(dst,'w',encoding='utf8').write(s)
print('ok',len(s))
