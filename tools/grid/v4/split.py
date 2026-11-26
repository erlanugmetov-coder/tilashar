import json,subprocess,re,sys,os
P=json.load(open('plan.json'))['per']
os.makedirs('seg',exist_ok=True)
def sil(f):
  o=subprocess.run(['ffmpeg','-i',f,'-af','silencedetect=n=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
  s=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)];e=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
  d=float(re.search(r'Duration: (\d+):(\d+):([\d.]+)',o).groups()[2])+60*float(re.search(r'Duration: (\d+):(\d+):([\d.]+)',o).groups()[1])
  return list(zip(s,e)),d
res={}
for v in sys.argv[1:]:
  L=P[v];g,d=sil('raw/%s.mp3'%v)
  inner=[x for x in g if x[0]>0.05 and x[1]<d-0.05]
  cuts=sorted(sorted(inner,key=lambda x:x[1]-x[0],reverse=True)[:len(L)-1])
  ok=len(cuts)==len(L)-1
  bounds=[0]+[ (a+b)/2 for a,b in cuts]+[d]
  segs=[]
  for i,t in enumerate(L):
    a,b=bounds[i],bounds[i+1];segs.append((round(a,2),round(b-a,2)))
  gaps=[round(b-a,2) for a,b in cuts]
  nxt=sorted([round(x[1]-x[0],2) for x in inner],reverse=True)[len(L)-1:len(L)+1]
  print(v,len(L),'ok' if ok else 'FEW', 'minCutGap',min(gaps) if gaps else '-', 'nextGaps',nxt)
  for (a,du),t in zip(segs,L): print('   %5.2f %4.2f %s'%(a,du,t))
  res[v]=segs
json.dump(res,open('segs_%s.json'%'_'.join(sys.argv[1:]),'w'))
