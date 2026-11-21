import numpy as np,cv2
exec(open('mask.py').read().split("roomm=np.zeros")[0])  # loads im,P,objs,k
H,W=im.shape[:2]
p=np.load('probs_floor.npy').astype(np.float32)
g=cv2.ximgproc.guidedFilter(im, p, 10, 1e-3)
g=cv2.ximgproc.guidedFilter(im, np.clip(g,0,1), 4, 4e-4)
m=np.clip((g-0.5)*4+0.5,0,1)  # sharpen
hard=np.zeros((H,W),np.uint8)
for n in ('chair1','chair2','stool','c1l1','c1l2','c1l3','c2l1','c2l2','c2l3'):
    cv2.fillPoly(hard,[P(objs[n])],1)
hard=cv2.dilate(hard,np.ones((3,3),np.uint8))
m[hard>0]=0
# feather 1px
m=cv2.GaussianBlur(m,(0,0),0.8)
np.save('floor_alpha.npy',m.astype(np.float16))
cv2.imwrite('floor_alpha.png',(m*255).astype(np.uint8))
ov=im.astype(np.float32); mag=np.array([255,0,255],np.float32)
ov=ov*(1-0.65*m[...,None])+mag*0.65*m[...,None]
ov=ov.astype(np.uint8)
cv2.imwrite('ov4.jpg',cv2.resize(ov,(1400,933)))
for name,(x0,y0,x1,y1) in {'a':(620,540,960,760),'b':(0,580,560,933),'c':(900,560,1400,800)}.items():
    cv2.imwrite(f'ovz4_{name}.jpg',ov[int(y0*k):int(y1*k),int(x0*k):int(x1*k)])
print(m.mean())
# --- patch: back floor strip behind sofa / around back chairs ---
force=np.zeros((H,W),np.uint8)
cv2.fillPoly(force,[P([(330,626),(400,640),(545,617),(600,611),(700,597),(772,584),(862,583),(945,617),(960,700),(950,745),(860,735),(760,700),(700,690),(600,650),(520,655),(400,665),(330,655)])],1)
excl=np.zeros((H,W),np.uint8)
cv2.fillPoly(excl,[P([(458,612),(625,600),(625,662),(458,662)])],1)
for n in ('rug','chair1','chair2','stool','back','c1l1','c1l2','c1l3','c2l1','c2l2','c2l3'): cv2.fillPoly(excl,[P(objs[n])],1)
excl=cv2.dilate(excl,np.ones((5,5),np.uint8))
hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(np.float32)
hh,ss,vv=hsv[...,0],hsv[...,1]/255,hsv[...,2]/255
floorish=((hh>=5)&(hh<=26)&(ss>0.07)&(vv>0.45)).astype(np.float32)
floorish=cv2.morphologyEx(floorish,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
floorish=cv2.morphologyEx(floorish,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
add=(force>0)&(excl==0)
m2=np.load('floor_alpha.npy').astype(np.float32)
m2[add]=np.maximum(m2[add],cv2.GaussianBlur(floorish,(0,0),0.8)[add])
np.save('floor_alpha.npy',m2.astype(np.float16))
print('patched',m2.mean())
