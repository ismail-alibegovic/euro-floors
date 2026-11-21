import numpy as np,cv2,sys,json
rng0=np.random.default_rng(7)
im=cv2.imread('dl/viz-room-src.jpg'); H,W=im.shape[:2]
alpha=np.load('floor_alpha.npy').astype(np.float32)
k=W/1400
YH=433*k; VPX=298*k; CX=W/2; F=1000*k; HC=1.5
bx,bz=VPX-CX,F; nb=np.hypot(bx,bz); bx,bz=bx/nb,bz/nb; px,pz=bz,-bx

def srgb2lin(c): c=c/255.0; return np.where(c<=0.04045,c/12.92,((c+0.055)/1.055)**2.4)
def lin2srgb(c): c=np.clip(c,0,1); return np.where(c<=0.0031308,c*12.92,1.055*c**(1/2.4)-0.055)*255

# ---------- shading from original floor ----------
lin=srgb2lin(im[...,::-1].astype(np.float32))
Lum=(lin*[0.2126,0.7152,0.0722]).sum(-1)
mm=(alpha>0.5).astype(np.float32)
sig=14
num=cv2.GaussianBlur(Lum*mm,(0,0),sig); den=cv2.GaussianBlur(mm,(0,0),sig)+1e-6
Lb=num/den
med=np.median(Lb[mm>0])
S=(Lb/med).astype(np.float32)
# small-scale contact shadows: ratio of fine blur to coarse where darker
num2=cv2.GaussianBlur(Lum*mm,(0,0),3); den2=cv2.GaussianBlur(mm,(0,0),3)+1e-6
fine=num2/den2/ (Lb+1e-6)
ao=np.clip(fine,0.6,1.0)   # only darkening keeps contact shadows, drops bright plank grain
S=S*np.where(ao<0.93,ao/0.93,1.0)

# ---------- textures ----------
def load_tex(path,rotate=False,crop=None):
    t=cv2.imread(path)[...,::-1].astype(np.float32)
    if rotate: t=np.ascontiguousarray(np.rot90(t))
    if crop: y0,y1,x0,x1=crop; t=t[y0:y1,x0:x1]
    tl=srgb2lin(t)
    base=cv2.GaussianBlur(tl,(0,0),max(t.shape[:2])/10)
    R=tl/(base+1e-4)                 # flat-field ratio, mean ~1
    lum=(R*[0.2126,0.7152,0.0722]).sum(-1,keepdims=True)
    return R,lum
def pyramid(img,levels=7):
    p=[img.astype(np.float32)]
    for _ in range(levels-1): p.append(cv2.pyrDown(p[-1]))
    return p

MATS={
 'svijetli-hrast':dict(src='dl/tex-light-oak.jpg',rot=True,boards=None,w=0.19,L=(1.2,1.9),s=900,rgb=(214,190,160),con=0.85,var=0.05,pattern='plank'),
 'prirodni-hrast':dict(src='dl/tex-natural-oak.jpg',rot=False,boards=[(8,392),(408,792),(808,1192),(1208,1592)],w=0.18,L=(1.1,1.8),s=1050,rgb=(178,138,100),con=1.0,var=0.06,pattern='plank'),
 'tamni-orah':dict(src='dl/tex-walnut.jpg',rot=False,boards=None,w=0.16,L=(1.0,1.6),s=1100,rgb=(92,62,44),con=1.15,var=0.07,pattern='plank'),
 'riblja-kost':dict(src='dl/tex-natural-oak.jpg',rot=False,boards=[(8,392),(408,792),(808,1192),(1208,1592)],w=0.09,L=0.54,s=1500,rgb=(172,133,94),con=1.0,var=0.08,pattern='herringbone'),
 'rustikalni-hrast':dict(src='dl/tex-rustic.jpg',rot=False,boards=[(6,580),(600,1040),(1060,1594)],w=0.22,L=(1.4,2.2),s=1350,rgb=(168,128,90),con=0.95,var=0.08,pattern='plank'),
 'bambus':dict(src='dl/tex-bamboo.jpg',rot=True,boards=None,w=0.096,L=(0.9,0.96),s=1300,rgb=(206,172,124),con=0.55,var=0.05,pattern='plank'),
}

def hash2(a,b,salt):
    x=(a.astype(np.int64)*73856093) ^ (b.astype(np.int64)*19349663) ^ (salt*83492791)
    x=(x ^ (x>>13))*1274126177
    x=x ^ (x>>16)
    return (x & 0xFFFFFF).astype(np.float64)/0xFFFFFF

def plank_lookup(a,c,m,salt):
    """returns plank id parts, u (along), v (across), Lp, w"""
    w=m['w']
    if m['pattern']=='plank':
        row=np.floor(c/w)
        Lmin,Lmax=m['L']; Lr=Lmin+(Lmax-Lmin)*hash2(row,row*0+3,salt)
        off=hash2(row,row*0+5,salt)*Lr
        aa=a+off; idx=np.floor(aa/Lr)
        u=aa-idx*Lr; v=c-row*w
        return row,idx,u,v,Lr,np.zeros_like(u)
    # herringbone: rotate 45deg so spine follows b
    Lp=m['L']; r2=np.sqrt(0.5)
    x=(a+c)*r2; y=(c-a)*r2
    det=w*Lp*2
    fi=(Lp*x - Lp*y)/det; fj=(w*x + w*y)/det
    I0=np.floor(fi); J0=np.floor(fj)
    out_i=np.full_like(x,np.nan); out_j=np.zeros_like(x); u=np.zeros_like(x); v=np.zeros_like(x); typ=np.zeros_like(x)
    n=int(round(Lp/w))
    for di in range(-n-2,3):
        for dj in range(-2,3):
            i=I0+di; j=J0+dj
            ox=i*w+j*Lp; oy=-i*w+j*Lp
            hx=(x>=ox)&(x<ox+Lp)&(y>=oy)&(y<oy+w)
            vx=(x>=ox+Lp)&(x<ox+Lp+w)&(y>=oy)&(y<oy+Lp)
            sel=hx&np.isnan(out_i)
            out_i[sel]=i[sel]; out_j[sel]=j[sel]; u[sel]=(x-ox)[sel]; v[sel]=(y-oy)[sel]; typ[sel]=0
            sel=vx&np.isnan(out_i)
            out_i[sel]=i[sel]; out_j[sel]=j[sel]; u[sel]=(y-oy)[sel]; v[sel]=(x-ox-Lp)[sel]; typ[sel]=1
    out_i=np.nan_to_num(out_i)
    return out_i*2+typ,out_j,u,v,np.full_like(u,Lp),typ

def remap_level(img,sx,sy,interp=cv2.INTER_LINEAR):
    N=sx.size; C=4096; R=(N+C-1)//C; pad=R*C-N
    mx=np.concatenate([sx,np.zeros(pad)]).reshape(R,C).astype(np.float32)
    my=np.concatenate([sy,np.zeros(pad)]).reshape(R,C).astype(np.float32)
    o=cv2.remap(img,mx,my,interp,borderMode=cv2.BORDER_REFLECT_101)
    return o.reshape(R*C,-1)[:N]

def render(name,m,SX=2,SY=5):
    R,_=load_tex(m['src'],m['rot'])
    th,tw=R.shape[:2]
    pyr=pyramid(R)
    boards=m['boards'] or [(4,tw-4)]
    salt=abs(hash(name))%100000
    ys,xs=np.nonzero(alpha>0.003)
    acc=np.zeros((ys.size,3)); 
    s=m['s']; w=m['w']
    for sy_ in range(SY):
        for sx_ in range(SX):
            x=xs+(sx_+0.5)/SX; y=ys+(sy_+0.5)/SY
            d=np.maximum(y-YH,2.0)
            X=(x-CX)*HC/d; Z=F*HC/d
            a=X*bx+Z*bz; c=X*px+Z*pz
            fx=HC/d/SX; fy=F*HC/d**2/SY       # metres per subsample
            idA,idB,u,v,Lp,typ=plank_lookup(a,c,m,salt)
            h1=hash2(idA,idB,salt+11); h2=hash2(idA,idB,salt+23); h3=hash2(idA,idB,salt+37); h4=hash2(idA,idB,salt+41)
            bi=np.minimum((h1*len(boards)).astype(int),len(boards)-1)
            b0=np.array([b[0] for b in boards])[bi]; b1=np.array([b[1] for b in boards])[bi]
            span=np.maximum(b1-b0-w*s,0)
            srcx=b0+h2*span+v*s
            srcy=h3*th*1.0+u*s
            fp=np.sqrt(fx*fy)*s
            lod=np.clip(np.log2(np.maximum(fp,1e-3))+0.3,0,len(pyr)-1.001)
            l0=np.floor(lod).astype(int); t=(lod-l0)[:,None]
            col=np.zeros((x.size,3))
            for L in np.unique(l0):
                sel=l0==L
                sc=2.0**L
                c0=remap_level(pyr[L],srcx[sel]/sc,srcy[sel]/sc)
                c1=remap_level(pyr[L+1],srcx[sel]/(sc*2),srcy[sel]/(sc*2))
                col[sel]=c0*(1-t[sel])+c1*t[sel]
            # per-plank tone
            tone=1+m['var']*(h4*2-1)*1.7
            col=np.power(np.maximum(col,1e-4),m['con'])*tone[:,None]
            # seams (box-filtered)
            fpm=np.minimum(fx,fy)
            hw=0.0008
            dv=np.minimum(v,w-v); du=np.minimum(u,Lp-u)
            cov_v=np.clip((hw+fpm*0.5-dv)/np.maximum(fpm,1e-5),0,1)*np.minimum(1,2*hw/np.maximum(fpm,1e-5))
            cov_u=np.clip((hw+fpm*0.5-du)/np.maximum(fpm,1e-5),0,1)*np.minimum(1,2*hw/np.maximum(fpm,1e-5))
            seam=1-0.55*np.maximum(cov_v,cov_u)
            # micro bevel shading near long edge
            col=col*seam[:,None]
            acc+=col
    acc/=SX*SY
    target=srgb2lin(np.array(m['rgb'],np.float32))
    albedo=acc*target[None,:]
    shade=S[ys,xs][:,None]
    newlin=albedo*shade
    out=lin.copy()
    a_=alpha[ys,xs][:,None]
    out[ys,xs]=lin[ys,xs]*(1-a_)+newlin*a_
    return lin2srgb(out)[...,::-1].astype(np.uint8)

if __name__=='__main__':
    names=sys.argv[1:] or list(MATS)
    for n in names:
        o=render(n,MATS[n])
        cv2.imwrite(f'out_{n}.jpg',o,[cv2.IMWRITE_JPEG_QUALITY,90])
        print('done',n)
