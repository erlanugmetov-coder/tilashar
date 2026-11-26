import json,subprocess,re,os
P=json.load(open('plan.json'))['per']
PITCH={'b2':(1.07,'shifted'),'m1':(0.96,'preserved'),'m2':(1.03,'preserved'),'w2':(1.02,'preserved'),'w3':(0.98,'preserved'),'o2':(0.98,'preserved')}
os.makedirs('seg',exist_ok=True)
rep=[];idx={}
for v,L in P.items():
  W=[w for w in json.load(open('words/%s.json'%v))['words'] if w.get('type')=='word' and w['text'].strip() not in ('—','-')]
  k=0;segs=[]
  for t in L:
    n=len([x for x in t.split() if x not in ('—','-')])
    ws=W[k:k+n];k+=n
    segs.append([ws[0]['start'],ws[-1]['end'],' '.join(w['text'] for w in ws)])
  assert k==len(W),(v,k,len(W))
  for i,(a,b,txt) in enumerate(segs):
    pa=segs[i-1][1] if i else 0
    nb=segs[i+1][0] if i+1<len(segs) else b+0.5
    a2=max(pa+0.02,a-0.07, 0);b2=min(nb-0.03,b+0.15)
    out='seg/%s_%02d.wav'%(v,i)
    af='afade=t=in:d=0.015,afade=t=out:st=%f:d=0.04'%max(0,(b2-a2)-0.04)
    if v in PITCH:
      p,f=PITCH[v];af='rubberband=pitch=%s:formant=%s,'%(p,f)+af
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','%.3f'%a2,'-t','%.3f'%(b2-a2),'-i','raw/%s.mp3'%v,'-af',af,'-ac','1','-ar','44100',out],check=True)
    idx['%s|%s'%(v,L[i])]=out
    rep.append((v,L[i],txt,round(b2-a2,2)))
json.dump(idx,open('idx.json','w'),ensure_ascii=False)
for r in rep:
  ok='' if r[1].replace('.','').replace('…','')==r[2].replace('.','').replace('…','').replace(' — ',' ') else '  <<< '
  print(r[0],r[3],r[1],ok)
print(len(rep))
