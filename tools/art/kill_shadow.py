import sys,numpy as np
from scipy import ndimage
from PIL import Image
def kill(src,dst):
    a=np.asarray(Image.open(src).convert('RGBA')).copy();rgb=a[...,:3].astype(int);a[a[...,3]<110,3]=0;al=a[...,3]
    mn=rgb.min(2);mx=rgb.max(2);sat=mx-mn;r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    cand=(al>0)&(sat<48)&(mn>150)&(b>=r-4)
    lab,k=ndimage.label(cand)
    border=ndimage.binary_dilation(al==0,iterations=2)
    for i in range(1,k+1):
        mm=lab==i;s=mm.sum()
        if s<25: continue
        if (border&mm).sum()<max(6,0.03*s): continue
        pass
        a[mm,3]=0
    al=a[...,3]
    # erode thin leftovers: light pixels now adjacent to transparency, repeat 2 times
    for _ in range(3):
        bd=ndimage.binary_dilation(a[...,3]==0,iterations=1)
        t=bd&(a[...,3]>0)&(sat<48)&(mn>170)&(b>=r-4)
        a[t,3]=0
    Image.fromarray(a).save(dst,quality=90,method=4)
if __name__=='__main__': kill(sys.argv[1],sys.argv[2])
