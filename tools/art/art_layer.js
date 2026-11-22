/* ===================== v206: новая графика карты — картинки art/*.webp (чат №4) =====================
   Логика игры не меняется: подменяем только то, ЧЕМ рисуется. Вставлять ПЕРЕД window.__c.showCity=showCity;showCity(); */
(function(){
var AP='art/',SZ=__SZ__,PH=380,ASPH='#9a9ea3',CURB='#e7d6a8',GRASS='#99bc65',GRASS2='#8fb35b';
function f1(v){return (Math.round(v*10)/10)}
function im(n,cx,bottom,w,h,ex){var s=SZ[n];if(!s)return '';if(!h)h=w*s[1]/s[0];if(!w)w=h*s[0]/s[1];
  return '<image href="'+AP+n+'.webp" x="'+f1(cx-w/2)+'" y="'+f1(bottom-h)+'" width="'+f1(w)+'" height="'+f1(h)+'" preserveAspectRatio="xMidYMax meet"'+(ex||'')+'/>'}
window.ARTIM=im;
function hsh(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
/* картинка по габаритам постройки (OBOX: влево, вправо, вверх, вниз) */
function fit(n,t,o){o=o||{};var b=OBOX[t.b]||[60,60,60,40],s=SZ[n];if(!s)return null;
  var w,h;if(o.byH){h=(b[2]+b[3])*(o.f||1);w=h*s[0]/s[1]}else{w=(b[0]+b[1])*(o.f||1.15);h=w*s[1]/s[0];var mh=(b[2]+b[3])*(o.hf||1.5);if(h>mh){h=mh;w=h*s[0]/s[1]}}
  var cx=t.x+(b[1]-b[0])/2+(o.dx||0),bot=t.y+b[3]*(o.by!=null?o.by:.8)+(o.dy||0);
  return {svg:im(n,cx,bot,w,h,o.ex),top:bot-h,cx:cx,bot:bot,w:w,h:h}}
/* вывески и таблички со старого рисунка переносим над новой картинкой */
function tags(orig,r){var out='',m=orig.match(/<g class="sign" data-b="([^"]+)"[^>]*><rect[^>]*stroke="([^"]+)"/);
  if(m)out+=vsign(r.cx,r.top-14,m[1],m[2]);
  orig.replace(/<rect x="[^"]*" y="[^"]*" width="[^"]*" height="18" rx="5" fill="#fffaf0" stroke="([^"]+)" stroke-width="2"\/><text[^>]*>([^<]*)<\/text>/g,function(_,c,tx){out+=vlabel(r.cx,r.top-6,tx,c)});
  return out}
function recol(s){return s.replace(/#f0d9a8/gi,ASPH).replace(/#dcc08a/gi,CURB).replace(/#fff6e6/gi,'#ffffff')}
/* что чем рисуем: [готово, до стройки, настройки] */
var GREY=' style="filter:grayscale(1) brightness(.85)"';
var M={
 uyfix:['house','house_broken'],house2:['house2','house2_broken'],mektep:['school','plot'],aurukhana:['hosp','plot'],stadion:['stad','plot',{f:1.05,by:.9}],
 fontan:['fount','fount',{f:1.25,beforeEx:GREY}],studia:['studio','plot'],sakhna:['stage','plot'],fence:['fence','fence_broken',{f:1}],bench:['bench','bench_broken',{f:.8,by:.9}],
 flag:['flag','plot_s',{byH:1,f:.95}],lamp:['lamp','lamp_broken',{byH:1,f:1.05}],library:['library','plot'],post:['post','plot'],busstop:['busstop','busstop_broken',{f:1.2}],
 chai:['chai','plot'],play:['play','plot'],pond:['pond','pond_dirty',{f:1.1,by:.7}],yurt:['yurt','plot'],bridge:['bridge','bridge_broken',{f:1.5,by:.6}],
 green:['green','plot'],duken:['duken','plot'],dry:['tree1','dry',{f:1.2}],pit:['flowers','pit',{f:1.2}],dump:['bush_flowers','dump',{f:1}],
 ygate:['ygate','plot'],ytoys:['ytoys','plot'],ycar:['ycar','plot'],yice:['yice','plot'],ylights:['lights','plot_s',{f:.9,by:.5}],ylights2:['lights','plot_s',{f:.9,by:.5}],
 yflowers:['flowers','plot_s',{f:.9}],yyurt:['yyurt','plot'],ystage:['stage','plot'],ytramp:['ytramp','plot'],yswing:['yswing','plot',{f:1}],ywheel:['ywheel','plot',{f:1.15,hf:1.25}],
 ykassa:['ykassa','plot_s',{f:1.5}],yvata:['yvata','plot_s',{f:1.6}],yballs:['yballs','plot_s',{f:1.5}],yfount:['fount','plot_s',{f:1.1}],yhorse:['yhorse','plot_s',{f:1.1}],
 ybigfl:['flowers_big','plot_s',{f:1}],ytir:['ytir','plot'],ymagic:['ymagic','plot'],
 zgate:['zgate','plot'],zbears:['zbears','pen_empty'],zcamels:['zcamels','pen_empty'],zlions:['zlions','pen_empty'],zeleph:['zeleph','pen_empty'],zmonk:['zmonk','pen_empty'],
 zbirds:['zbirds','pen_empty'],zfish:['zfish','pen_empty'],zbutter:['zbutter','pen_empty'],ztigers:['ztigers','pen_empty'],zcarou:['zcarou','pen_empty'],zfount:['fount','plot_s',{f:1.2}],
 bgate:['bgate','plot'],balma:['balma','stall_empty',{f:.95}],bnan:['bnan','stall_empty',{f:.95}],bfruit:['bfruit','stall_empty',{f:.95}],bveg:['bveg','stall_empty',{f:.95}],
 bkurt:['bkurt','stall_empty',{f:.95}],bbauyr:['bbauyr','stall_empty',{f:.95}],bkymyz:['bkymyz','stall_empty',{f:.95}],bshay:['bshay','plot'],bsamo:['bsamo','plot_s',{f:1}],
 pgate:['pgate','plot'],ptrack:['ptrack','plot',{f:1,by:.7}],ptramp:['ytramp','plot'],pbooks:['pbooks','plot'],pmusic:['pmusic','plot'],pcafe:['pcafe','plot'],pfount:['drink_fount','plot_s',{byH:1,f:.9}],
 pwall:['pwall','plot'],pdance:['pdance','plot',{f:1}],pbike:['pbike','plot',{f:1}],pbench:['bench','plot_s',{f:.8}],pwheel:['ywheel','plot',{f:1.15,hf:1.25}],
 mgate:['mgate','plot'],mschool:['mschool','plot',{f:1.05}],mbus:['busstop','plot_s',{f:1.1}],mcanteen:['mcanteen','plot'],mcross:['mcross','plot_s',{byH:1,f:.9}],mlib:['library','plot'],
 mpool:['mpool','plot',{f:1}],mflowers:['flowers','plot_s',{f:.9}],mbike:['mbike','plot_s',{f:1}],mbench:['bench','plot_s',{f:.8}],mlamp:['vlamp','plot_s',{byH:1,f:.95}],
 kshop:['kshop','plot'],kbakery:['kbakery','plot'],kstad:['kstad','plot',{f:1,by:.9}],kfount:['fount','plot_s',{f:1.6}],ktaxi:['ktaxi','plot'],kgym:['kgym','plot'],kbench:['bench','plot_s',{f:.8}],
 kflag:['flag','plot_s',{byH:1,f:.95}],
 hhome1:['hhome1','plot'],hhome2:['hhome2','plot'],hhome3:['hhome3','plot'],hgarden:['hgarden','plot'],hswing:['hswing','plot'],hcat:['hcat','plot_s',{f:1.3}],hplay:['play','plot'],
 hlamp:['vlamp','plot_s',{byH:1,f:.95}],hbench:['bench','plot_s',{f:.8}],
 vkassa:['vkassa','plot'],vbags:['vbags','plot'],vlamp:['vlamp','plot_s',{byH:1,f:.95}],vclock:['vclock','plot_s',{byH:1,f:.95}],vcafe:['vcafe','plot'],vwait:['vwait','plot'],
 vtrain:['vtrain','plot',{f:1}],vbus:['bus_side','plot',{f:1}],vbench:['vboard','plot_s',{f:.9}]
};
['yclear','zclear','bclear','pclear','mclear','kclear','hclear','vclear'].forEach(function(k){M[k]=['','debris',{f:1.4}]});
M.yplaza=['keep','debris',{f:1.2}];
function plotFor(t){var b=OBOX[t.b]||[60,60,60,40],w=b[0]+b[1],h=hsh(t.id)%6;if(w<=110)return h===0?'plot_shovel':'plot_s';if(w<=190)return h===0?'plot_bricks':h===1?'plot_cones':'plot_m';return 'plot_l'}
/* составные: парк, аллея, сад, мусор, бревно */
function many(list){return list.join('')}
var _vb=vbuild,_vf=vbefore;
vbuild=function(t){var e=M[t.b],orig=_vb(t);
  if(t.b==='clean')return t.id==='log'?'':many([im('bush_flowers',t.x-18,t.y+12,0,30),im('bush',t.x+22,t.y+10,0,26)]);
  if(t.b==='sayabaq')return many([im('tree1',t.x-45,t.y+8,0,95),im('tree2',t.x+40,t.y-10,0,105),im('bush_flowers',t.x-38,t.y+52,0,30),im('bench',t.x+28,t.y+44,52,0),im('tree_karagach',t.x+12,t.y+60,0,70)])+tags(orig,{cx:t.x,top:t.y-110});
  if(t.b==='alley'){var s='';for(var i=0;i<5;i++)s+=im('tree_poplar',t.x-90+i*45,t.y+12,0,100);return s}
  if(t.b==='orchard'){var o='';[[-70,-10],[0,-14],[70,-10],[-35,24],[35,24]].forEach(function(p){o+=im('tree_apple',t.x+p[0],t.y+p[1]+20,0,80)});return o}
  if(t.b==='dump')return many([im('bush_flowers',t.x-20,t.y+12,0,30),im('flowers',t.x+26,t.y+14,46,0)]);
  if(t.b==='kroad'||t.b==='hpath'||t.b==='vrail'||t.b==='ypath')return recol(orig);
  if(!e)return orig;if(e[0]==='keep')return recol(orig);if(e[0]==='')return '';
  var r=fit(e[0],t,e[2]);if(!r)return orig;return r.svg+tags(orig,r)};
vbefore=function(t){var e=M[t.b],orig=_vf(t);
  if(t.b==='clean')return t.id==='log'?im('log',t.x,t.y+14,80,0):im('trash',t.x,t.y+14,74,0);
  if(t.b==='alley'||t.b==='orchard'){var s='';for(var i=0;i<4;i++)s+=im('sapling',t.x-75+i*50,t.y+12,0,40);return s}
  if(t.b==='sayabaq')return fit('plot_l',t,{f:1,by:.6}).svg;
  if(t.b==='kroad'||t.b==='hpath'||t.b==='vrail'||t.b==='ypath')return recol(orig);
  if(!e)return orig;var n=e[1],o=e[2]||{};
  if(n==='plot')n=plotFor(t);
  if(n==='debris')n=['debris1','debris2','debris3'][hsh(t.id)%3];
  var oo=n===e[0]?{f:o.f,by:o.by,byH:o.byH,ex:o.beforeEx}:/^plot|^pen|^stall/.test(n)?{f:/^pen|^stall/.test(n)?.95:1,by:.6}:{f:o.f||1,by:o.by,byH:o.byH};
  var r=fit(n,t,oo);return r?r.svg+tags(orig,r):orig};
/* деревья, кусты, клумбы и прочие мелочи — везде, где их рисует старый код */
vtree=function(x,y,s){return im('tree1',x,y+10,0,100*(s||1))};
vfir=function(x,y,s){return im('tree2',x,y+10,0,108*(s||1))};
vbirch=function(x,y,s){return im('tree_birch',x,y+10,0,105*(s||1))};
vpoplar=function(x,y,s){return im('tree_poplar',x,y+10,0,115*(s||1))};
vapple=function(x,y,s){return im('tree_apple',x,y+10,0,92*(s||1))};
vkaragach=function(x,y,s){return im('tree_karagach',x,y+10,0,88*(s||1))};
vbush=function(x,y,c){return im(c?'bush_flowers':'bush',x,y+8,0,26)};
vbed=function(x,y){return im('flowers',x,y+14,58,0)};
vsunflower=function(x,y){return im('sunflower',x,y+6,0,50)};
vlampD=function(x,y){return im('lamp',x,y+4,0,64)};
vswingD=function(x,y){return im('hswing',x,y+8,0,56)};
vbench=function(x,y){return im('bench',x,y+14,58,0)};
vyurt=function(x,y){return im('yurt',x,y+14,0,80)};
vsaplings=function(x,y,grown,apples){var s='';for(var i=0;i<5;i++){var px=x-80+i*40,py=y+(i%2)*14;s+=grown?(apples?im('tree_apple',px,py+8,0,72):vtreeK(px,py,i,.8)):im('sapling',px,py+6,0,38)}return s};
vmyhome=function(x,y){var nm=(st.name||'').toUpperCase().slice(0,10);return im('house',x,y+10,0,92)+(nm?vlabel(x,y-90,esc(nm),'#d94c86'):'')};
vuyD=function(x,y){return im('hhome1',x,y+10,0,74)};
vshopD=function(x,y,c1,c2,lab){return im('kshop',x,y+8,0,72)+vlabel(x,y-70,lab,c2)};
vkiosk=function(x,y){return im('yice',x,y+8,0,74)};
/* машины (нужные файлы: 'car_side','car2_side','taxi_side','truck_side','car_front','car2_front','taxi_front','truck_front') */
function carPick(col,kind){if(kind==='taxi'||col==='#ffd200')return 'taxi';if(kind==='truck')return 'truck';if(col&&/^#(e2574c|c0392b|ff8a3d|e05a9c)/i.test(col))return 'car2';return 'car'}
carSide=function(col,kind){var n=carPick(col,kind)+'_side';return '<svg width="58" height="34" viewBox="0 0 58 34">'+im(n,29,33,56,0)+'</svg>'};
carFront=function(col){var n=carPick(col)+'_front';if(!SZ[n])n='car_front';return '<svg width="36" height="40" viewBox="0 0 36 40">'+im(n,18,39,34,0)+'</svg>'};
parkedSVG=function(P){P=P||PARKED;var s='';P.forEach(function(p){if(!cdone(p[0]))return;var x=p[1],y=p[2],k=p[3];
  s+=k==='bus'?im('bus_side',x,y+16,96,0):k==='amb'?im('truck_side',x,y+14,74,0):k==='van'?im('truck_side',x,y+14,72,0):im(carPick(p[4])+'_side',x,y+10,62,0)});return s};
/* жители: каждому — свой персонаж */
var ROLE={mektep:'kid_boy',aurukhana:'doctor',stadion:'sport_boy',studia:'artist',sakhna:'star',sayabaq:'man_taqiya',fontan:'guest',library:'kid_girl',chai:'ata',play:'kid_boy',yurt:'apa',
 duken:'seller',ytoys:'man_taqiya',yice:'kid_girl',ycar:'kid_boy',yyurt:'apa',ystage:'star',ytramp:'sport_boy',yswing:'kid_girl',ywheel:'aga',yvata:'kid_girl',ytir:'kid_boy',ymagic:'magician',
 zgate:'guard',zbears:'man_taqiya',zcamels:'kid_girl',zlions:'sport_boy',zeleph:'star',zmonk:'kid_boy',zbirds:'kid_girl',zfish:'guest',zbutter:'sport_girl',ztigers:'aga',zcarou:'kid_girl',
 bgate:'guard',balma:'apa',bnan:'baker',bfruit:'seller',bveg:'aga',bkurt:'seller',bshay:'ata',pgate:'guard',ptrack:'sport_boy',pbooks:'kid_girl',pcafe:'cook',pdance:'star',pbench:'apa',
 mgate:'teacher',mbus:'kid_boy',mlib:'kid_girl',mpool:'sport_boy',mbench:'ata',kshop:'seller',kbakery:'baker',kstad:'sport_boy',ktaxi:'taxi_driver',kgym:'sport_girl',
 hhome1:'apa',hhome2:'kid_boy',hgarden:'ata',hcat:'kid_girl',hbench:'aga',vkassa:'cashier',vbags:'kid_boy',vcafe:'cook',vtrain:'kid_girl',vbench:'ata'};
var RESPOS={};
vperson=function(x,y,shirt,hair,girl,hat){var n=RESPOS[x+','+y]||(girl?'kid_girl':'kid_boy');return im(n,x,y+4,0,62)};
var _sp=spritesHTML;
spritesHTML=function(){RESPOS={};CTASK.forEach(function(t){var m=CMAN[t.b];if(m&&ROLE[t.b])RESPOS[(t.x+m.dx)+','+(t.y+m.dy)]=ROLE[t.b]});
  return _sp().replace(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="4" height="46" fill="#33505e"\/><circle[^>]*fill="#ffd76a"\/>/g,function(_,x,y){return im('lamp',+x+2,+y+48,0,64)})};
/* облака забвения — картинки вместо белых шаров */
var CLI=['cloud1','cloud2','cloud3'].map(function(n){var i=new Image();i.onload=function(){try{clDraw()}catch(e){}};i.src=AP+n+'.webp';return i});
var _cld=clDraw;
clDraw=function(){if(!CLI.every(function(i){return i.complete&&i.naturalWidth}))return _cld();var cv=document.getElementById('clcv');if(!cv)return;var S=.5,O=200,W=Math.ceil((CW+2*O)*S),H=Math.ceil((CH+2*O)*S);
  if(cv.width!==W||cv.height!==H){cv.width=W;cv.height=H}cv.style.width=(CW+2*O)+'px';cv.style.height=(CH+2*O)+'px';cv.style.left=(-O)+'px';cv.style.top=(-O)+'px';
  var g=cv.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,W,H);g.setTransform(S,0,0,S,O*S,O*S);
  CLP.forEach(function(p){if(p.dead||p.y<230)return;var img=CLI[p.i%3],w=196,h=w*img.naturalHeight/img.naturalWidth;g.drawImage(img,p.x+10-w/2,p.y+5-h/2,w,h)})};
/* земля: трава в тон картинкам, асфальт с разметкой; дорога под горами */
var _gsch=groundSched;
groundSched=function(g){g=recol(g).replace(/#8fd16a/gi,GRASS).replace(/#82c45e/gi,GRASS2).replace(/#ead39a/gi,'#ddd6c3');
  var r='<rect x="0" y="0" width="'+CW+'" height="46" fill="'+ASPH+'"/><rect x="0" y="0" width="'+CW+'" height="4" fill="'+CURB+'"/><rect x="0" y="46" width="'+CW+'" height="4" fill="'+CURB+'"/>';
  for(var x=10;x<CW;x+=48)r+='<rect x="'+x+'" y="21" width="24" height="4" rx="2" fill="#ffffff"/>';
  return _gsch(g.replace(/<\/svg>\s*$/,r+'</svg>'))};
/* горы сверху: выше них камера не уходит */
function pano(){var w=document.getElementById('cworld');if(!w)return;var d=document.getElementById('cpano');
  if(!d){d=document.createElement('div');d.id='cpano';w.insertBefore(d,w.firstChild)}
  d.style.cssText='position:absolute;left:0;top:-'+PH+'px;width:'+CW+'px;height:'+(PH+4)+'px;background:url('+AP+'panorama_strip.webp) 0 0/100% 100% no-repeat;pointer-events:none;z-index:0'}
var _cr=cityRender;cityRender=function(){var r=_cr.apply(this,arguments);pano();return r};
camApply=function(){var w=document.getElementById('cworld'),v=document.getElementById('cview');if(!w||!v)return;pano();
  var pts=crevealPts(),minx=Infinity,maxx=-Infinity,miny=Infinity,maxy=-Infinity;pts.forEach(function(p){minx=Math.min(minx,p.x-p.r);maxx=Math.max(maxx,p.x+p.r);miny=Math.min(miny,p.y-p.r);maxy=Math.max(maxy,p.y+p.r)});
  var vw=v.clientWidth,vh=v.clientHeight,Z=CAM.z||1;minx=Math.max(0,minx-40);maxx=Math.min(CW,maxx+40);miny=Math.max(0,miny-80);maxy=Math.min(CH,maxy+120);
  var top=miny<700;if(top)miny=-PH;
  var lo=-(maxx*Z-vw),hi=-minx*Z;if(lo>hi){var m=(lo+hi)/2;lo=hi=m}CAM.x=Math.max(lo,Math.min(hi,CAM.x));
  lo=-(maxy*Z-vh)-90;hi=-miny*Z+(top?0:110);if(lo>hi){m=(lo+hi)/2;lo=hi=m}CAM.y=Math.max(lo,Math.min(hi,CAM.y));
  w.style.transformOrigin='0 0';w.style.transform='translate('+CAM.x+'px,'+CAM.y+'px) scale('+Z+')'};
/* стили: исчезающее облачко — тоже картинкой; картинки не перехватывают касания у вывесок */
var css=document.createElement('style');
css.textContent='.cl,.cl.alt{background:url('+AP+'cloud1.webp) center/contain no-repeat!important}.cl:before,.cl:after{display:none!important}.spr{overflow:visible}.spr image{image-rendering:auto}';
document.head.appendChild(css);
})();
