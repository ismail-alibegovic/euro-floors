import cv2,numpy as np
im=cv2.imread('dl/viz-room-src.jpg'); H,W=im.shape[:2]; k=W/1400
def P(pts): return (np.array(pts,np.float32)*k).astype(np.int32)
room=[(0,840),(0,800),(78,655),(84,642),(215,640),(232,628),(400,640),(545,618),(590,614),(700,600),(770,586),(862,585),(940,618),(1040,648),(1120,672),(1200,697),(1290,722),(1318,738),(1400,752),(1400,933),(0,933)]
objs={
'sofa':[(212,560),(400,560),(402,632),(505,650),(512,820),(487,858),(484,892),(440,907),(395,904),(372,888),(370,862),(278,880),(258,872),(246,832),(226,762),(210,700)],
'rug':[(440,640),(652,620),(957,752),(950,762),(525,903),(505,892),(470,660)],
'back':[(572,540),(705,535),(710,606),(662,621),(578,620)],
'chair1':[(659,590),(700,550),(782,555),(787,572),(749,600),(750,612),(722,632),(664,622)],
'c1l1':[(662,615),(671,615),(671,652),(663,652)],'c1l2':[(709,620),(721,620),(721,673),(708,673)],'c1l3':[(730,625),(739,625),(739,646),(731,646)],
'stool':[(748,612),(812,612),(813,682),(800,693),(760,692),(750,672)],
'chair2':[(788,612),(792,603),(828,603),(834,592),(856,568),(937,582),(940,620),(926,662),(862,676),(788,656)],
'c2l1':[(786,650),(798,650),(798,699),(786,699)],'c2l2':[(862,640),(879,640),(878,728),(863,728)],'c2l3':[(916,640),(928,640),(927,705),(917,705)],
'pot':[(1197,640),(1263,640),(1263,722),(1246,736),(1214,736),(1197,724)],
}
roomm=np.zeros((H,W),np.uint8); cv2.fillPoly(roomm,[P(room)],1)
objm=np.zeros((H,W),np.uint8)
for v in objs.values(): cv2.fillPoly(objm,[P(v)],1)
K=lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*r+1,2*r+1))
hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV).astype(np.float32)
sat=hsv[...,1]/255; val=hsv[...,2]/255
band=cv2.dilate(roomm,K(16)) & (1-cv2.erode(roomm,K(16)))
wallish=((sat<0.10)&(val>0.80)).astype(np.uint8)
m=cv2.dilate(roomm,K(6)) & (1-objm)
m[(band>0)&(wallish>0)]=0
# also kill object-like pixels (white/grey/dark) touching object polys
oband=cv2.dilate(objm,K(8))&(1-objm)
notfloor=((sat<0.12)|(val<0.35)).astype(np.uint8)
m[(oband>0)&(notfloor>0)]=0
m=cv2.morphologyEx(m,cv2.MORPH_OPEN,K(2))
cv2.imwrite('floor_mask.png',m*255)
ov=im.copy(); ov[m>0]=(ov[m>0]*0.35+np.array([255,0,255])*0.65)
cv2.imwrite('ov2.jpg',cv2.resize(ov,(1400,933)))
for name,(x0,y0,x1,y1) in {'a':(620,540,960,760),'b':(0,580,560,933),'c':(900,560,1400,800)}.items():
    c=ov[int(y0*k):int(y1*k),int(x0*k):int(x1*k)]
    cv2.imwrite(f'ovz_{name}.jpg',c)
print(m.mean())
