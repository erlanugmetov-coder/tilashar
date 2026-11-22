import re,json,os,math
from PIL import Image
s=open('/home/claude/b206/main206.html',encoding='utf8').read()
tasks={t[0]:dict(id=t[0],nm=t[1],b=t[5]) for t in re.findall(r"\{id:'(\w+)',name:'([^']*)',cost:(\d+),x:(\d+),y:(\d+),(?:req:[^,]*,)?b:'(\w+)'",s)}
L=open('/home/claude/w/tools/art/art_layer.js').read()
Mi=L.find('var M={');Me=L.find('};',Mi)
M={k:v for k,v in re.findall(r"(\w+):\['([\w]*)'",L[Mi:Me])}
ROLE=dict(re.findall(r"(\w+):'(\w+)'",L[L.find('ROLE={'):L.find('};',L.find('ROLE={'))]))
EXTRA={'uyfix':'house','mektep':'school','aurukhana':'hosp','stadion':'yard_court','fontan':'fount','studia':'studio','sakhna':'stage','fence':'fence','bench':'bench',
 'flag':'flag','kflag':'flag','dump':'bush_flowers','dry':'tree1','pit':'flowers'}
def img(b):
    if b in EXTRA: return EXTRA[b]
    v=M.get(b)
    if v=='orig': return 'flag'
    return v
BIG=185;MED=120;SM=62
W={'house':195,'house2':185,'school':195,'hosp':195,'studio':180,'stage':180,'library':175,'post':170,'chai':175,'duken':165,'green':170,'yurt':160,'yyurt':160,
'ycar':175,'ywheel':185,'ytir':160,'ymagic':150,'ygate':175,'zgate':175,'bgate':175,'pgate':175,'mgate':175,'mschool':200,'mcanteen':175,'mpool':175,'kshop':170,'kbakery':170,
'kstad':215,'ktaxi':165,'kgym':175,'hhome1':175,'hhome2':175,'hhome3':175,'hgarden':160,'vkassa':170,'vcafe':170,'vwait':175,'vtrain':200,'bshay':175,'pmusic':165,'pcafe':175,
'pdance':170,'pwall':160,'ptrack':195,'pbike':170,'yice':125,'ytoys':140,'ytramp':135,'yswing':135,'play':160,'pond':175,'yard_court':200,
'balma':125,'bnan':125,'bfruit':125,'bveg':125,'bkurt':125,'bbauyr':125,'bkymyz':125,'bsamo':95,'hswing':125,'hcat':85,'pbooks':125,'vbags':115,'mcross':70,'busstop':105,'bus_side':150,'vboard':95,
'lights':85,'flowers':55,'flowers_big':80,'fount':120,'drink_fount':32,'bench':68,'lamp':24,'vlamp':26,'vclock':34,'flag':44,'yvata':58,'yballs':58,'ykassa':64,'yhorse':64,'mbike':75,
'tree1':94,'tree2':94,'tree_birch':85,'tree_poplar':43,'tree_apple':90,'tree_karagach':100,'bush_flowers':55,'fence':95,'library':175}
for z in ['zbears','zcamels','zlions','zeleph','zmonk','zbirds','zfish','zbutter','ztigers','zcarou']: W[z]=160
RW={'kid_boy':26,'kid_girl':26,'doctor':29,'artist':29,'star':29,'man_taqiya':29,'guest':29,'apa':29,'ata':29,'aga':29,'teacher':29,'seller':29,'baker':29,'cook':29,'cashier':29,'taxi_driver':29,'guard':29,'magician':29,'sport_boy':29,'sport_girl':29}
BLK=[ # id, name, theme, col,row, task ids
('aina','Айнаның үйі',1,0,0,None),
('yarmarka','Ярмарка',2,1,0,[k for k in tasks if k.startswith('y') and k not in('yclear','yplaza','ypath')]),
('sayabaq','Саябақ',3,2,0,[k for k in tasks if k.startswith('p') and k not in('pclear','park','pit','post','play','pond')]),
('uyler','Үйлер',4,3,0,[k for k in tasks if k.startswith('h') and k not in('hclear','hpath','house','house2','hosp')]),
('mektep','Мектеп',5,3,1,['mgate','mschool','mbus','mcanteen','mcross','mpool','mflag']),
('kitaphana','Кітапхана',6,2,1,['mlib','mflowers','mbike','mbench','mlamp']),
('stadion','Стадион',7,1,1,['kshop','kbakery','kstad','kfount','ktaxi','kgym','kbench','kflag']),
('vokzal','Вокзал',8,0,1,['vkassa','vbags','vlamp','vclock','vwait','vtrain','vflag']),
('poshta','Пошта',9,0,2,['post','vkiosk','vbench']),
('avtobeket','Автобекет',10,1,2,['vbus','bus','vcafe']),
('zoo','Зоопарк',11,2,2,[k for k in tasks if k.startswith('z') and k!='zclear']),
('bazar','Базар',12,3,2,[k for k in tasks if k.startswith('b') and k not in('bclear','bench','bridge','bus')]),
('kun','Күн алаңы',13,3,3,[k for k in tasks if k.startswith('d') and k not in('dry','dump','duken')]),
('koshe','Көше',14,2,3,['flag','pit','lamp','house2','library','chai','duken']),
('ozen','Өзен жағасы',15,1,3,['alley','dry','play','pond','yurt','dump','orchard','green']),
('spare','Запас',16,0,3,[]),
]
O=56;B=720;CX=O+B/2;CY=O+B/2;PW=22
names=set();blocks=[]
def asp(n):
    p='/home/claude/w/art/map/'+n+'.webp'
    im=Image.open(p).convert('RGBA');im=im.crop(im.getbbox());return im.height/im.width
ASP=json.load(open('/home/claude/editor/asp.json'))
def A(n):
    if n not in ASP: ASP[n]=round(asp(n),4)
    return ASP[n]
FOUNTS={'fount','drink_fount'}
for bid,nm,th,c,r,tl in BLK:
    if tl is None: blocks.append(dict(id=bid,nm=nm,th=th,c=c,r=r,items=None));continue
    objs=[];plaza=None;res=[]
    for k in tl:
        t=tasks[k];b=t['b']
        if k=='alley': objs+= [dict(n='tree_poplar',t=k if i==0 else None) for i in range(4)];continue
        if k=='orchard': objs+= [dict(n='tree_apple',t=k if i==0 else None) for i in range(3)];continue
        n=img(b)
        if not n: continue
        o=dict(n=n,t=k)
        if n in FOUNTS and plaza is None: plaza=o;continue
        objs.append(o)
        if b in ROLE and len(res)<4: res.append(dict(n=ROLE[b]))
    for o in objs+res+([plaza] if plaza else []): A(o['n']);names.add(o['n'])
    # sizing & packing into 4 quadrants
    qx=[(O+14,CX-PW-14),(CX+PW+14,O+B-14)];qy=[(O+14,CY-PW-14),(CY+PW+14,O+B-14)]
    Q=[(qx[0],qy[0]),(qx[1],qy[0]),(qx[0],qy[1]),(qx[1],qy[1])]
    scale=1.0
    for attempt in range(12):
        items=[];ok=True
        big=sorted(objs,key=lambda o:-W.get(o['n'],100))
        quads=[[] for _ in Q]
        load=[0]*4
        for o in big:
            w=W.get(o['n'],100)*scale;h=w*A(o['n'])
            q=load.index(min(load));quads[q].append((o,w,h));load[q]+=w*h
        for o in res:
            w=RW.get(o['n'],28);q=load.index(min(load));quads[q].append((o,w,w*A(o['n'])));load[q]+=w*w*A(o['n'])*0.3
        for qi,(xr,yr) in enumerate(Q):
            x=xr[0];y=yr[0];rowh=0;row=[]
            rows=[];cur=[];curw=0
            for (o,w,h) in quads[qi]:
                if curw+w>(xr[1]-xr[0])+1 and cur: rows.append(cur);cur=[];curw=0
                cur.append((o,w,h));curw+=w+10
            if cur: rows.append(cur)
            tot=sum(max(h for _,_,h in rw) for rw in rows)+10*(len(rows)-1)
            if tot>(yr[1]-yr[0]): ok=False;break
            gap=((yr[1]-yr[0])-tot)/(len(rows)+1) if rows else 0
            yy=yr[0]
            for rw in rows:
                rh=max(h for _,_,h in rw);yy+=gap+rh
                tw=sum(w for _,w,_ in rw);sp=((xr[1]-xr[0])-tw)/(len(rw)+1)
                xx=xr[0]
                for (o,w,h) in rw:
                    xx+=sp;it=dict(n=o['n'],x=round(xx+w/2),b=round(yy),w=round(w),f=0)
                    if o.get('t'):it['t']=o['t']
                    items.append(it);xx+=w
                yy+=10
        if ok: break
        scale*=0.92
    if plaza:
        w=W.get(plaza['n'],110)*max(scale,.8);it=dict(n=plaza['n'],x=round(CX),b=round(CY+w*A(plaza['n'])*0.42),w=round(w),f=0,t=plaza['t']);items.append(it)
    blocks.append(dict(id=bid,nm=nm,th=th,c=c,r=r,items=items,scale=round(scale,2)))
    print(bid,len(items),round(scale,2))
json.dump(blocks,open('blocks.json','w'),ensure_ascii=False)
json.dump(ASP,open('/home/claude/editor/asp.json','w'))
json.dump(sorted(names),open('names.json','w'))
