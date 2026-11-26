import json,subprocess
X=[('x1','b1','Мен ұшақта отырмын!',0.0,1.2),('x1','b2','Біз оқушымыз!',1.48,2.72),('x1','b2','Біз доспыз!',2.96,4.24),
('x2','g2','Мен оқушымын!',0.0,1.12),('x3','w1','Сәлем, балам!',0.0,1.04),('x4','o2','Мен қонақпын!',0.0,1.16),
('x5','a1','Біз тауға барамыз!',0.0,1.48),('x5','a1','Бұл кімнің?',1.62,2.4),('x6','a2','Мен қонақпын!',0.0,1.2),('x6','a2','Біз доспыз!',1.36,2.72)]
PITCH={'b2':(1.07,'shifted'),'o2':(0.98,'preserved')}
idx=json.load(open('idx.json'))
for i,(src,v,t,a,b) in enumerate(X):
  a2=max(0,a-0.05);b2=b+0.12;out='seg/%s_x%02d.wav'%(v,i)
  af='afade=t=in:d=0.015,afade=t=out:st=%f:d=0.04'%max(0,(b2-a2)-0.04)
  if v in PITCH:p,f=PITCH[v];af='rubberband=pitch=%s:formant=%s,'%(p,f)+af
  subprocess.run(['ffmpeg','-y','-loglevel','error','-ss','%.3f'%a2,'-t','%.3f'%(b2-a2),'-i','raw/%s.mp3'%src,'-af',af,'-ac','1','-ar','44100',out],check=True)
  idx['%s|%s'%(v,t)]=out
json.dump(idx,open('idx.json','w'),ensure_ascii=False)
p=json.load(open('plan.json'));p['VMAP'].update({'library':'g2','chai':'a2','play':'b2','yurt':'o2','duken':'w1'});json.dump(p,open('plan.json','w'),ensure_ascii=False,indent=1)
print(len(idx))
