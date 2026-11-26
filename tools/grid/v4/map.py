import json,re,subprocess
VMAP={
'stadion':'b1','ytramp':'b1','ptrack':'b1','kstad':'b1','hhome2':'b1','vbags':'b1','ycar':'b1','zbears':'b1','zmonk':'b1','ztigers':'b1','mpool':'b1',
'mektep':'b2','mbus':'b2','ytoys':'b2','ytir':'b2','zlions':'b2','zfish':'b2',
'pbooks':'g1','mlib':'g1','hcat':'g1','vtrain':'g1','ystage':'g1','yice':'g1','yvata':'g1','zcamels':'g1','zbutter':'g1','kgym':'g1',
'yswing':'g2','zeleph':'g2','zbirds':'g2','zcarou':'g2',
'sakhna':'w1','pdance':'w1','bfruit':'w1','kshop':'w1',
'studia':'w2','aurukhana':'w2','vkassa':'w2','bkurt':'w2',
'mgate':'w3','yyurt':'w3',
'sayabaq':'m1','bnan':'m1','ywheel':'m1','vcafe':'m1',
'fontan':'m2','bgate':'m2','pgate':'m2','ktaxi':'m2','hbench':'m2','bveg':'m2',
'ymagic':'m3','zgate':'m3',
'pbench':'o1','hhome1':'o1',
'balma':'o2',
'mbench':'a1','hgarden':'a1','vbench':'a1','kbakery':'a1',
'bshay':'a2','pcafe':'a2',
}
h=open('main.html',encoding='utf8').read()
js=r'''const h=require("fs").readFileSync("main.html","utf8");const re=/(\w+):\{nm:/g;let m,o2={};
while((m=re.exec(h))){let s=h.indexOf("{",m.index);let d=0,e=s;for(;e<h.length;e++){if(h[e]=="{")d++;else if(h[e]=="}"){d--;if(!d)break;}}let o;try{eval("o="+h.slice(s,e+1))}catch(x){continue}o2[m[1]]=o}
console.log(JSON.stringify(o2))'''
C=json.loads(subprocess.check_output(['node','-e',js]))
miss=[k for k in C if k not in VMAP and C[k].get('lines')];print('missing',miss)
per={}
for k,o in C.items():
  if k not in VMAP: continue
  for l in o['lines']:
    t=l[0]
    if t=='…':continue
    per.setdefault(VMAP[k],[])
    if t not in per[VMAP[k]]: per[VMAP[k]].append(t)
# nurlan copy in aina = sayabaq m1 already
json.dump({'VMAP':VMAP,'per':per},open('v4/plan.json','w'),ensure_ascii=False,indent=1)
tot=0
for v,L in sorted(per.items()):
  tot+=len(L);print(v,len(L),sum(len(x) for x in L),' / '.join(L))
print('total',tot)
