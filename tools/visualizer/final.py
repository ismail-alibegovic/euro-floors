import numpy as np,cv2,os
import render as R
out='final'; os.makedirs(out,exist_ok=True)
Y0=300
src=cv2.imread('dl/viz-room-src.jpg')[Y0:]
cv2.imwrite(f'{out}/room-original.jpg',src,[cv2.IMWRITE_JPEG_QUALITY,84])
def swatch(name,m,size=640,metres=0.75):
    t=np.linspace(0,metres,size*2,endpoint=False)+metres/size/4
    A,C=np.meshgrid(t,t)
    # rotate so planks run vertically -> a along y
    a=C.ravel()*1.0; c=A.ravel()*1.0
    Rr,_=R.load_tex(m['src'],m['rot']); pyr=R.pyramid(Rr); th,tw=Rr.shape[:2]
    boards=m['boards'] or [(4,tw-4)]; salt=abs(hash(name))%100000; s=m['s']; w=m['w']
    idA,idB,u,v,Lp,typ=R.plank_lookup(a+3.1,c+1.7,m,salt)
    h1=R.hash2(idA,idB,salt+11); h2=R.hash2(idA,idB,salt+23); h3=R.hash2(idA,idB,salt+37); h4=R.hash2(idA,idB,salt+41)
    bi=np.minimum((h1*len(boards)).astype(int),len(boards)-1)
    b0=np.array([b[0] for b in boards])[bi]; b1=np.array([b[1] for b in boards])[bi]
    srcx=b0+h2*np.maximum(b1-b0-w*s,0)+v*s; srcy=h3*th+u*s
    fp=metres/(size*2)*s; L=int(np.clip(np.floor(np.log2(max(fp,1e-3))),0,5))
    col=R.remap_level(pyr[L],srcx/2**L,srcy/2**L)
    tone=1+m['var']*(h4*2-1)*1.7
    col=np.power(np.maximum(col,1e-4),m['con'])*tone[:,None]
    dv=np.minimum(v,w-v); du=np.minimum(u,Lp-u); fpm=metres/(size*2)
    seam=1-0.5*((np.minimum(dv,du))<0.0009+fpm*0.5)
    col=col*seam[:,None]*R.srgb2lin(np.array(m['rgb'],np.float32))[None]
    img=R.lin2srgb(col.reshape(size*2,size*2,3)*1.0)[...,::-1].astype(np.uint8)
    return cv2.resize(img,(size,size),interpolation=cv2.INTER_AREA)
for n,m in R.MATS.items():
    o=R.render(n,m)[Y0:]
    cv2.imwrite(f'{out}/room-{n}.jpg',o,[cv2.IMWRITE_JPEG_QUALITY,84])
    cv2.imwrite(f'{out}/swatch-{n}.jpg',swatch(n,m),[cv2.IMWRITE_JPEG_QUALITY,86])
    print(n)
# floor-mask preview for docs
a=(np.load('floor_alpha.npy').astype(np.float32)[Y0:]*255).astype(np.uint8)
cv2.imwrite(f'{out}/floor-mask.png',a)
