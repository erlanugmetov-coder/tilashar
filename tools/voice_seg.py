import sys,subprocess,numpy as np
f=sys.argv[1];n=int(sys.argv[2])
SR=22050
raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
x=np.frombuffer(raw,np.int16).astype(np.float32)/32768
hop=int(SR*.01);fr=len(x)//hop
e=np.array([np.sqrt(np.mean(x[i*hop:(i+1)*hop]**2)) for i in range(fr)])
def segs(th,minsil):
    act=e>th;out=[];i=0
    while i<fr:
        if act[i]:
            j=i
            while True:
                while j<fr and act[j]: j+=1
                k=j
                while k<fr and not act[k]: k+=1
                if k<fr and (k-j)<minsil: j=k;continue
                break
            out.append((i,j));i=j
        else:i+=1
    return [s for s in out if s[1]-s[0]>=5]
best=None
for th in [0.01,0.015,0.02,0.008,0.025,0.03,0.006]:
    for ms in [70,60,50,45,40,35,30,25,20]:
        s=segs(th,ms)
        if len(s)==n: best=(th,ms,s);break
    if best:break
if not best:
    for th in [0.01,0.02]:
        for ms in [15,20,30,40]:print('th',th,'ms',ms,len(segs(th,ms)))
    sys.exit(1)
th,ms,s=best;print('OK',th,ms,len(s))
import json;json.dump([[a*hop/SR,b*hop/SR] for a,b in s],open(f+'.segs.json','w'))
gaps=[(s[i+1][0]-s[i][1]) for i in range(len(s)-1)];lens=[b-a for a,b in s]
print('min gap',min(gaps),'max len',max(lens),'min len',min(lens))
