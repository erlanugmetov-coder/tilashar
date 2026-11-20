import json,subprocess,numpy as np
SR=22050
def load(f):
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-af','asetrate=44100*1.07,aresample=22050,atempo=1/1.07','-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
def loadw(f):
    raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','1','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.int16).astype(np.float32)/32768
W1=['үйге','қалаға','далаға','бассейнге','ауылға','дүкенге','қайда','мектепке','саябаққа','стадионға','асханаға','үйде','отырмын','мектепте','саябақта','алматыда','бассейнде','қалада','дүкенде']
W2=['кітапханада','сыныпта','қайдасың','үйдемін','кел','келе','жатырмын','жатыс','шығыс','үйден','мектептен','саябақтан','дүкеннен','бассейннен','қайдан','қайдансың','алматыданмын','қаладан']
base=loadw('k20.wav');m=json.load(open('k20.json'))
out=[base];pos=len(base)/SR;gap=np.zeros(int(SR*.3),np.float32)
for f,W in [('n44.mp3','анам әжем атам досым үйім қаламым әкем кітабым добым құлағым аяғым жүрегім сөмкем анаң досың сенің әкең анасы досы інісі'.split()),('n45.mp3','әжесі анамыз мектебіміз үйіміз анаңыз сіздің әкеңіз әкесі оның айна менікі кімнің олардың досыңыз досымыз сендердің сіздердің дана әкеміз'.split())]:
    x=load(f);segs=json.load(open(f+'.segs.json'))
    # segs computed at 1.0 speed; pitch shift with atempo keeps duration
    for w,(a,b) in zip(W,segs):
        a=max(0,a-0.04);b=b+0.06
        s=x[int(a*SR):int(b*SR)].copy()
        r=np.sqrt(np.mean(s**2))+1e-9;s*=0.12/r;s=np.clip(s,-0.99,0.99)
        fd=int(.03*SR);s[:fd]*=np.linspace(0,1,fd);s[-fd:]*=np.linspace(1,0,fd)
        out.append(gap);pos+=len(gap)/SR
        m[w]=[round(pos,3),round(len(s)/SR,3)];out.append(s);pos+=len(s)/SR
y=np.concatenate(out)
import wave
with wave.open('k21.wav','wb') as wv:
    wv.setnchannels(1);wv.setsampwidth(2);wv.setframerate(SR);wv.writeframes((np.clip(y,-1,1)*32767).astype(np.int16).tobytes())
json.dump(m,open('k21.json','w'),ensure_ascii=False)
print(len(m),pos)
