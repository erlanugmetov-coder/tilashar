import json,subprocess,os
idx=json.load(open('idx.json'));os.makedirs('segp',exist_ok=True)
# доп. сдвиг поверх уже нарезанного: дети выше и «меньше», женщины ниже
P2={'b1':(1.12,'shifted'),'b2':(1.12,'shifted'),'g1':(1.10,'shifted'),'g2':(1.14,'shifted'),'w1':(0.95,'preserved'),'w2':(0.93,'preserved'),'w3':(0.92,'preserved')}
out={}
for k,f in idx.items():
  v=k.split('|')[0];o='segp/'+os.path.basename(f)
  if v in P2:
    p,fm=P2[v];subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-af','rubberband=pitch=%s:formant=%s'%(p,fm),o],check=True)
  else: subprocess.run(['cp',f,o])
  out[k]=o
json.dump(out,open('idxp.json','w'),ensure_ascii=False);print(len(out))
