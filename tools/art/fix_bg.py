import sys,numpy as np
from scipy import ndimage
from PIL import Image
def fix(src,dst,white=True,shadow=True):
    a=np.asarray(Image.open(src).convert('RGBA')).copy();rgb=a[...,:3].astype(int);al=a[...,3]
    mn=rgb.min(2);sat=rgb.max(2)-rgb.min(2)
    light=(mn>150)&(sat<26)&(al>0)
    lab,k=ndimage.label(light);sz=ndimage.sum(light,lab,range(1,k+1))
    border=ndimage.binary_dilation(al==0,iterations=2);H=a.shape[0]
    reg=np.zeros(light.shape,bool)
    for i,s in enumerate(sz):
        if s<40: continue
        mm=lab==i+1
        if (border&mm).any() and np.nonzero(mm)[0].mean()>H*0.4: reg|=mm
        elif white and rgb[mm].mean()>236 and s>60: reg|=mm
    b=a.copy()
    if white:
        t=reg&(mn>236);b[t,3]=0
        if shadow: s2=reg&~t
        else: s2=np.zeros_like(reg)
    else: s2=reg&(mn<=246)
    if shadow:
        b[s2,0]=40;b[s2,1]=60;b[s2,2]=20;b[s2,3]=45
    Image.fromarray(b).save(dst,quality=90,method=4)
if __name__=='__main__':
    fix(sys.argv[1],sys.argv[2],sys.argv[3]=='1',sys.argv[4]=='1')
