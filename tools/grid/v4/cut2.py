import json,subprocess
idx=json.load(open('idx.json'))
B={'nb2':('b2',['Сәлем!','Мен Айдармын!','Мен оқушымын!','Жаңа ойыншық!','Үлкен доп! Қызыл доп!','Мен көңілдімін!','Сен тапқырсың!','Жарайсың!','Арыстандар күшті!','Үйректер кішкентай!','Мен мектепке барамын!','Біз оқушымыз!','Біз доспыз!']),
 'g3':('g3',['Сәлем!','Түйелер биік!','Барыстар әдемі!','Жүр, саябаққа!','Пілдер үлкен!']),
 'g4':('g4',['Сәлем!','Құстар әдемі!','Ақ аюлар күшті!','Мен көңілдімін!','Керемет!','Тәтті балмұздақ!','Мен мейірімдімін!','Қалайсың?'])}
for k in [k for k in idx if k.startswith('b2|')]: del idx[k]
for src,(v,L) in B.items():
  W=[w for w in json.load(open('words/%s.json'%src))['words'] if w.get('type')=='word']
  n=0;segs=[]
  for t in L:
    c=len(t.split());ws=W[n:n+c];n+=c;segs.append((ws[0]['start'],ws[-1]['end']))
  assert n==len(W),(src,n,len(W))
  for i,(a,b) in enumerate(segs):
    pa=segs[i-1][1] if i else 0;nb=segs[i+1][0] if i+1<len(segs) else b+0.5
    a2=max(pa+0.02,a-0.07,0);b2=min(nb-0.03,b+0.15);out='seg/%s_n%02d.wav'%(v,i)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','%.3f'%a2,'-t','%.3f'%(b2-a2),'-i','raw/%s.mp3'%src,'-af','afade=t=in:d=0.015,afade=t=out:st=%f:d=0.04'%max(0,b2-a2-0.04),'-ac','1','-ar','44100',out],check=True)
    idx['%s|%s'%(v,L[i])]=out
json.dump(idx,open('idx.json','w'),ensure_ascii=False)
p=json.load(open('plan.json'));p['VMAP'].update({'zcamels':'g3','zbutter':'g3','kgym':'g3','zeleph':'g3','zbirds':'g4','zcarou':'g4','yvata':'g4','yice':'g4'});json.dump(p,open('plan.json','w'),ensure_ascii=False,indent=1)
print(len(idx))
