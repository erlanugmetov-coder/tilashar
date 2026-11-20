import json,subprocess,numpy as np,wave
SR=22050
def load(f):
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-af','asetrate=44100*1.07,aresample=22050,atempo=1/1.07','-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
def loadw(f):
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
B=json.load(open('/home/claude/work/vok_batches.json'))
base=loadw('k21.wav');m=json.load(open('k21.json'))
out=[base];pos=len(base)/SR;gap=np.zeros(int(SR*.3),np.float32)
for f,W in [('n46.mp3',B[0]),('n47.mp3',B[1])]:
    x=load(f);segs=json.load(open(f+'.segs.json'));assert len(segs)==len(W)
    for w,(a,b) in zip(W,segs):
        a=max(0,a-0.04);b=b+0.06
        s=x[int(a*SR):int(b*SR)].copy()
        r=np.sqrt(np.mean(s**2))+1e-9;s*=0.12/r;s=np.clip(s,-0.99,0.99)
        fd=int(.03*SR);s[:fd]*=np.linspace(0,1,fd);s[-fd:]*=np.linspace(1,0,fd)
        out.append(gap);pos+=len(gap)/SR
        m[w]=[round(pos,3),round(len(s)/SR,3)];out.append(s);pos+=len(s)/SR
y=np.concatenate(out)
with wave.open('k22.wav','wb') as wv:
    wv.setnchannels(1);wv.setsampwidth(2);wv.setframerate(SR);wv.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes())
json.dump(m,open('k22.json','w'),ensure_ascii=False)
print(len(m),round(pos,1))
