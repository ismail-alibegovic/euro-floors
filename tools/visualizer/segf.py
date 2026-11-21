import torch,numpy as np,cv2
from transformers import SegformerForSemanticSegmentation, SegformerImageProcessor
name='nvidia/segformer-b5-finetuned-ade-640-640'
proc=SegformerImageProcessor.from_pretrained(name); model=SegformerForSemanticSegmentation.from_pretrained(name).eval()
im=cv2.imread('dl/viz-room-src.jpg')[...,::-1]; H,W=im.shape[:2]
id2l=model.config.id2label
acc=None
for scale in (1024,1536):
    h=int(H*scale/W)
    x=cv2.resize(im,(scale,h),interpolation=cv2.INTER_AREA)
    # sliding window 640
    logits=np.zeros((150,h,scale),np.float32); cnt=np.zeros((h,scale),np.float32)
    S=640; st=426
    ys=list(range(0,max(h-S,0)+1,st)); xs=list(range(0,max(scale-S,0)+1,st))
    if ys[-1]+S<h: ys.append(h-S)
    if xs[-1]+S<scale: xs.append(scale-S)
    for yy in ys:
        for xx in xs:
            c=x[yy:yy+S,xx:xx+S]
            inp=proc(images=c,return_tensors='pt',do_resize=False)
            with torch.no_grad(): o=model(**inp).logits
            o=torch.nn.functional.interpolate(o,size=c.shape[:2],mode='bilinear',align_corners=False)[0].numpy()
            logits[:,yy:yy+S,xx:xx+S]+=o; cnt[yy:yy+S,xx:xx+S]+=1
    logits/=cnt
    up=np.stack([cv2.resize(l,(W,H),interpolation=cv2.INTER_LINEAR) for l in logits])
    p=np.exp(up-up.max(0)); p/=p.sum(0)
    acc=p if acc is None else acc+p
acc/=2
np.save('probs_floor.npy',acc[3].astype(np.float16))
lab=acc.argmax(0)
u,c=np.unique(lab,return_counts=True)
for a,b in sorted(zip(c,u))[::-1][:15]: print(id2l[int(b)],a/lab.size)
np.save('labels.npy',lab.astype(np.uint8))
