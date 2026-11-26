import json,subprocess,re,os
idx=json.load(open('idx.json'));os.makedirs('nrm',exist_ok=True)
def st(f):
  o=subprocess.run(['ffmpeg','-i',f,'-af','astats=metadata=0','-f','null','-'],capture_output=True,text=True).stderr
  rms=float(re.findall(r'RMS level dB: ([-\d.]+)',o)[-1]);pk=float(re.findall(r'Peak level dB: ([-\d.]+)',o)[-1]);return rms,pk
T=-19.0;res={}
for k,f in idx.items():
  r,p=st(f);g=T-r
  g=min(g,-1.0-p+6)  # limiter below handles rest
  out='nrm/'+os.path.basename(f)
  subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f,'-af','volume=%.2fdB,alimiter=limit=0.89:attack=2:release=40'%g,out],check=True)
  r2,p2=st(out);res[k]=(round(r,1),round(r2,1),round(p2,1))
v=[x[1] for x in res.values()];print('rms after min/max',min(v),max(v))
byv={}
for k,x in res.items(): byv.setdefault(k.split('|')[0],[]).append(x[1])
for a,b in sorted(byv.items()): print(a,round(sum(b)/len(b),1))
