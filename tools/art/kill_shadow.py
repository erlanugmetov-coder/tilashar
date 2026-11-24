import sys,numpy as np
from scipy import ndimage
from PIL import Image
def kill(src,dst):
    a=np.asarray(Image.open(src).convert('RGBA')).copy();rgb=a[...,:3].astype(int);al=a[...,3]
    # 1) remove our earlier semi-transparent shadow fill
    old=(rgb[...,0]==40)&(rgb[...,1]==60)&(rgb[...,2]==20)&(al<=60)
    a[old,3]=0;al=a[...,3]
    # 2) remaining grey shadow: low saturation, mid-light, touching transparency, lower part
    mn=rgb.min(2);sat=rgb.max(2)-mn
    cand=(sat<32)&(mn>100)&(mn<246)&(al>0)
    lab,k=ndimage.label(cand)
    border=ndimage.binary_dilation(al==0,iterations=2);H=a.shape[0]
    n=0
    for i in range(1,k+1):
        mm=lab==i;s=mm.sum()
        if s<30: continue
        touch=(border&mm).sum()
        if touch< max(8,0.04*s): continue
        ys=np.nonzero(mm)[0]
        if ys.mean()<H*0.45: continue
        # smooth (shadow) not detailed: low std
        if rgb[mm].std()>22: continue
        a[mm,3]=0;n+=s
    # also soft semi-transparent grey fringe
    fr=(a[...,3]>0)&(a[...,3]<200)&(sat<25)&(mn>90)
    a[fr,3]=0
    Image.fromarray(a).save(dst,quality=90,method=6)
    return n
if __name__=='__main__':
    print(kill(sys.argv[1],sys.argv[2]))
