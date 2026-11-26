import numpy as np,cv2
from PIL import Image
a=np.asarray(Image.open('full_kick.png')).copy();H,W=a.shape[:2]
r,g,b,al=[a[...,i].astype(int) for i in range(4)]
yy,xx=np.mgrid[0:H,0:W]
blue=(b>r+40)&(b>g+15)
leg=(al>0)&(xx>=548)&(yy>=745)&~blue
# remove small blue-edge stragglers: keep largest component
n,lab=cv2.connectedComponents(leg.astype(np.uint8));sz=[(lab==i).sum() for i in range(1,n)];big=1+int(np.argmax(sz));leg=lab==big
HIP=np.array([480,830]);K=np.array([652,858]);d=np.array([0.942,0.335])
dd=((xx-K[0])*d[0]+(yy-K[1])*d[1])
shin=leg&(dd>-14)
thigh=leg&(dd<12)
def save(mask,name,base=None):
  o=np.zeros_like(a);o[mask]=a[mask];Image.fromarray(o).save(name)
body=a.copy();body[leg,3]=0
# fill shorts gap: inpaint pixels just inside hip area that are now transparent but surrounded by shorts
gap=(leg)&(xx<640)&(yy<960)&(((xx-HIP[0])**2+(yy-HIP[1])**2)<140**2)
bl=blue&(al>0)&(xx>400)&(xx<600)&(yy>760)&(yy<950);col=np.median(a[bl][:,:3],axis=0).astype(np.uint8)
inside=gap&(xx<590)&(yy<930)
body[inside,:3]=col;body[inside,3]=255
Image.fromarray(body).save('k_body.png');save(thigh,'k_thigh.png');save(shin,'k_shin.png')
# preview composite at windup / strike
def comp(t_ang,s_ang,fn):
  can=Image.new('RGBA',(W+300,H+100),(90,160,80,255));off=(100,50)
  th=Image.open('k_thigh.png');sh=Image.open('k_shin.png')
  sh2=sh.rotate(-s_ang,center=tuple(K),resample=Image.BICUBIC)
  leg=Image.alpha_composite(th,sh2) if False else th.copy();leg.alpha_composite(sh2)
  leg=leg.rotate(-t_ang,center=tuple(HIP),resample=Image.BICUBIC)
  can.alpha_composite(leg,off);can.alpha_composite(Image.open('k_body.png'),off)
  can.convert('RGB').resize(((W+300)//3,(H+100)//3)).save(fn)
comp(0,0,'/tmp/p0.png');comp(42,40,'/tmp/p1.png');comp(-8,0,'/tmp/p2.png');comp(28,22,'/tmp/p3.png')
im=Image.new('RGB',(4*((W+300)//3),(H+100)//3))
for i,f in enumerate(['/tmp/p3.png','/tmp/p1.png','/tmp/p2.png','/tmp/p0.png']):im.paste(Image.open(f),(i*((W+300)//3),0))
im.save('/tmp/poses.png')
print(thigh.sum(),shin.sum())
