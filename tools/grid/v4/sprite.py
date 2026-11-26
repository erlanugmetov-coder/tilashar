import json,subprocess,wave,os
idx=json.load(open('idx.json'))
sr=44100;gap=int(0.3*sr);pos=0;R={};frames=[]
import array
for k,f in idx.items():
  w=wave.open('nrm/'+os.path.basename(f));n=w.getnframes();d=w.readframes(n);w.close()
  R[k]=[round(pos/sr,3),round(n/sr,3)];frames.append(d);frames.append(b'\x00\x00'*gap);pos+=n+gap
o=wave.open('/tmp/rv4.wav','w');o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(b''.join(frames));o.close()
subprocess.run(['ffmpeg','-y','-loglevel','error','-i','/tmp/rv4.wav','-af','volume=-0.8dB','-c:a','libmp3lame','-b:a','96k','-ac','1','rv4.mp3'],check=True)
json.dump(R,open('rsnd4.json','w'),ensure_ascii=False)
print(len(R),round(pos/sr,1),'s',os.path.getsize('rv4.mp3'))
