/* ===================== v212-тест: город-сетка 3×4 из редактора (чат №5) =====================
   Кварталы, постройки, деревья, жители и дорожки — из базы редактора (layouts/<id>).
   Логика уроков, прогресса и монет не меняется: задания (CTASK) остаются, меняются их места и рисунки.
   Вставлять ПОСЛЕ блока v206 (art_layer), ПЕРЕД window.__c.showCity=showCity;showCity(); */
(function(){
var GL=__LAYOUTS__,ASP=__ASP__,AP='art/',BV='?v=5';

/* голоса жителей v4: свой голос каждому, rv4.mp3 */
var VV=__VV__,RS4=__RS4__,RVP4=null;Object.keys(VV).forEach(function(k){if(CMAN[k])CMAN[k].vv=VV[k]});RSND=RS4;
loadRV=function(){if(RVP4)return RVP4;RVP4=fetch('rv4.mp3').then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()}).then(function(b){return new Promise(function(res,rej){AC.decodeAudioData(b,res,rej)})}).catch(function(){RVP4=null;return null});return RVP4};


/* футбол: Санжар бьёт (нога на шарнирах бедро+колено), Әли на воротах ловит */
var FB={kx:205,kb:668,kw:42,gx:290,gb:652,T:3,W0:1033,H0:1324,HIP:[480,830],KN:[652,858],TOE:[945,975],kxw:40};
FB.kx=205;FB.kw=42;FB.kb=668;FB.kx2=FB.gx;
function fbPts(A){var px=A.x+FB.kx,py=A.y+FB.kb,w=resW('fb_kick_body',FB.kw),s=w/FB.W0,X0=px-w/2,Y0=py-FB.H0*s,hx=X0+FB.HIP[0]*s,hy=Y0+FB.HIP[1]*s,tx=X0+FB.TOE[0]*s,ty=Y0+FB.TOE[1]*s,a=-8*Math.PI/180,
  F=[hx+(tx-hx)*Math.cos(a)-(ty-hy)*Math.sin(a),hy+(tx-hx)*Math.sin(a)+(ty-hy)*Math.cos(a)];
  var KW2=resW('fb_keep',FB.kw2),gs=KW2/997,gx=A.x+FB.gx,gb=A.y+FB.gb,G=[gx-KW2/2+300*gs,gb-1347*gs+600*gs];
  return {F:F,Fg:[F[0]+2,py-1],G:G}}
FB.kw2=40;
function ballSVG(x,y){y-=4;return '<ellipse cx="'+x+'" cy="'+(y+8)+'" rx="7" ry="2.2" fill="#000" opacity=".15"/><circle cx="'+x+'" cy="'+y+'" r="8" fill="#fff" stroke="#14222c" stroke-width="1.3"/><path d="M'+x+' '+(y-3.2)+'l3 2.2-1.2 3.4h-3.6l-1.2-3.4z" fill="#14222c"/><path d="M'+x+' '+(y-3.2)+'V'+(y-8)+'M'+(x+3)+' '+(y-1)+'l4.4-1.4M'+(x+1.8)+' '+(y+2.4)+'l2.6 3.6M'+(x-1.8)+' '+(y+2.4)+'l-2.6 3.6M'+(x-3)+' '+(y-1)+'l-4.4-1.4" stroke="#14222c" stroke-width="1.1"/>'}
/* все жители одного роста — по врачу */
function resW(n,w){var a=hgt(n,1);if(!a)return w;var T=hgt('doctor',27);return T/a}
function kickSVG(px,py,w){var s=w/FB.W0,X0=px-w/2,Y0=py-FB.H0*s,hx=f1(X0+FB.HIP[0]*s),hy=f1(Y0+FB.HIP[1]*s),kx=f1(X0+FB.KN[0]*s),ky=f1(Y0+FB.KN[1]*s),T=FB.T+'s',kt='0;.22;.3;.36;.55;1';
  var rv=function(a){return a.map(function(v){return v+' '}).join('').trim()};
  var th=[28,42,-8,-8,28,28].map(function(v){return v+' '+hx+' '+hy}).join(';'),sh=[22,40,0,0,22,22].map(function(v){return v+' '+kx+' '+ky}).join(';');
  return '<g>'+'<g>'+img('fb_kick_thigh',px,py,w,0)+'<g>'+img('fb_kick_shin',px,py,w,0)+'<animateTransform attributeName="transform" type="rotate" values="'+sh+'" keyTimes="'+kt+'" dur="'+T+'" repeatCount="indefinite"/></g><animateTransform attributeName="transform" type="rotate" values="'+th+'" keyTimes="'+kt+'" dur="'+T+'" repeatCount="indefinite"/></g>'+img('fb_kick_body',px,py,w,0)+'<animateTransform attributeName="transform" type="translate" values="0 0;-2 0;4 -1.5;5 0;4 0;4 0;1.5 -4;-1 0;0 0" keyTimes="0;.2;.3;.36;.5;.8;.86;.93;1" dur="'+T+'" repeatCount="indefinite"/></g>'}
/* нажатие по жителю, даже если сверху прозрачный край чужой картинки */
function resAt(e){if(!e||e.clientX==null)return null;var best=null,bd=1e9;document.querySelectorAll('#cview .resident > rect').forEach(function(r){var R=r.getBoundingClientRect();if(e.clientX>=R.left&&e.clientX<=R.right&&e.clientY>=R.top&&e.clientY<=R.bottom){var d=Math.hypot(e.clientX-(R.left+R.right)/2,e.clientY-(R.top+R.bottom)/2);if(d<bd){bd=d;best=r.parentNode}}});return best}
window.resAt=resAt;
/* второй футболист (stad2) */
var ST2=null;CMAN.stad2={nm:'Әли',vv:'b2',v:'kb',lines:[['Сәлем!','привет',0],['Мен көңілдімін!','я весёлый',0],['Жарайсың!','молодец!',0]],dx:0,dy:0};
(function(){var _rs=residentSay;residentSay=function(id,k){if(id!=='stad2')return _rs(id,k);var m=CMAN.stad2,w=RES.stad2||(RES.stad2={dx:0,dy:0,tx:0,ty:0,wait:1e9,k:0}),L=m.lines[w.k%m.lines.length];w.k++;
  var b=document.getElementById('crsay');if(!b||!ST2)return;b.innerHTML='<b>'+L[0]+'</b> <small>— '+L[1]+'</small>';b.style.left=cclampX(ST2[0])+'px';b.style.top=(ST2[1]-30)+'px';b.classList.remove('on');void b.offsetWidth;b.classList.add('on');
  var g=document.querySelector('.resident[data-r="stad2"] .rb');if(g){g.classList.remove('hop');void g.getBoundingClientRect();g.classList.add('hop')}
  clearTimeout(residentSay.t);residentSay.t=setTimeout(function(){b.classList.remove('on')},3000);if(!sayR('b2',L[0]))say(L[0])}})();
var Q=832,O=56,B=720,MG=60,RV=150;
var QS=[['aina',0,0,1],['yarmarka',1,0,2],['sayabaq',2,0,3],['uyler',3,0,4],['mektep',3,1,5],['kitaphana',2,1,6],['stadion',1,1,7],['vokzal',0,1,8],['poshta',0,2,9],['avtobeket',1,2,10],['zoo',2,2,11],['bazar',3,2,12]];
var QNM={aina:'Айнаның үйі',yarmarka:'Жәрмеңке',sayabaq:'Саябақ',uyler:'Үйлер',mektep:'Мектеп',kitaphana:'Кітапхана',stadion:'Стадион',vokzal:'Вокзал',poshta:'Пошта',avtobeket:'Автобекет',zoo:'Хайуанаттар бағы',bazar:'Базар'};
var QEM={aina:'🏠',yarmarka:'🎪',sayabaq:'🌳',uyler:'🏡',mektep:'🏫',kitaphana:'📚',stadion:'⚽',vokzal:'🚂',poshta:'✉️',avtobeket:'🚌',zoo:'🦁',bazar:'🍎'};
/* прогресс в нижней полоске: [слот темы, поле заданий, значок] */
var QZ={aina:[0,'cl','🏠'],yarmarka:[1,'lv','🎪'],sayabaq:[4,'pl','🌳'],uyler:[7,'hl','🏡'],mektep:[5,'ml','🏫'],kitaphana:[9,'gl','📚'],stadion:[6,'kl','⚽'],vokzal:[8,'vl','🚂'],poshta:[10,'tl','✉️'],avtobeket:[11,'xl','🚌'],zoo:[2,'zl','🦁'],bazar:[3,'bl','🍎']};
var QI={};function QX(c){return MG+c*(Q-O)}function QY(r){return r===0?MG:r===1?MG+Q+RV:MG+2*Q+RV-O}
QS.forEach(function(q){QI[q[0]]={id:q[0],c:q[1],r:q[2],th:q[3],x:QX(q[1]),y:QY(q[2])}});
CW=QX(3)+Q+MG;CH=QY(2)+Q+MG;
var RIVY0=QY(0)+Q,RIVY1=QY(1);
var LAY={};GL.forEach(function(l){LAY[l.id]=l});
window.GRIDQ=QI;
function qOpen(id){try{switch(id){case 'aina':return true;case 'yarmarka':return yArea();case 'sayabaq':return pArea();case 'uyler':return hArea();case 'mektep':return mArea();
  case 'kitaphana':return (st.d10||[]).length>0||themeDone(5);case 'stadion':return kArea();case 'vokzal':return vArea();case 'poshta':return (st.d11||[]).length>0||themeDone(8);
  case 'avtobeket':return (st.d12||[]).length>0||themeDone(10);case 'zoo':return zArea();case 'bazar':return bArea()}}catch(e){}return false}
window.qOpen=qOpen;
/* в каком квартале точка (вместе с его дорогами) */
function qAt(x,y){var best=null,bd=1e9;QS.forEach(function(q){var o=QI[q[0]];if(x>=o.x-4&&x<=o.x+Q+4&&y>=o.y-4&&y<=o.y+Q+4){var d=Math.hypot(x-o.x-Q/2,y-o.y-Q/2);if(d<bd){bd=d;best=o.id}}});return best}
window.qAt=qAt;
function qOpenAt(x,y){var ok=false;QS.forEach(function(q){var o=QI[q[0]];if(x>=o.x-4&&x<=o.x+Q+4&&y>=o.y-4&&y<=o.y+Q+4&&qOpen(o.id))ok=true});return ok}
function hgt(n,w){return w*(ASP[n]||1)}

/* ---------- задания: старые места → постройки из редактора ---------- */
var DROP={fence:1,park:1,house2:1,library:1,chai:1,alley:1,dry:1,play:1,pond:1,dump:1,bridge:1,orchard:1,green:1,duken:1,yplaza:1,ypath:1};
/* Тема 1 (7 уроков: 0–4, 5 «Живые фразы», 6 «Проверка») — задания на объектах квартала Айны */
var ANEW=[['lamp','Починить фонарь',1,0,'lamp',358,750],['a_lamp2','Починить фонарь',1,0,'lamp',471,750],['a_flow1','Посадить клумбу',1,0,'flowers',265,377],
 ['bench','Починить скамейку',1,1,'bench',290,516],['a_bench2','Починить скамейку',1,1,'bench',527,521],
 ['a_birch1','Посадить берёзу',1,2,'tree_birch',322,171],['a_flow2','Посадить клумбу',1,2,'flowers',587,375],
 ['a_tree1','Посадить дерево',2,3,'tree1',502,166],['a_tree2','Посадить дерево',2,3,'tree2',702,543],
 ['a_bush1','Посадить куст с цветами',1,4,'bush_flowers',488,580],['a_bush2','Посадить куст',1,4,'bush',733,756],
 ['a_tree3','Посадить дерево',2,5,'tree1',126,369],['a_birch2','Посадить берёзу',2,5,'tree_birch',721,351],
 ['a_tree4','Посадить дерево',2,6,'tree2',143,561],['a_flow3','Посадить клумбу',1,6,'flowers',610,497]];
/* на дорогах: мусор, бревно, яма; флаг у фонтана (локальные координаты квартала Айны) */
var AROAD={trash:[416,150],log:[190,418],pit:[560,806],flag:[228,468]};
/* «расчистить дорогу» каждого района — завал на дороге у входа в квартал */
var CLR={yclear:['yarmarka','L',0],zclear:['zoo','L',0],bclear:['bazar','L',0],pclear:['sayabaq','L',0],mclear:['mektep','T',0],kclear:['stadion','R',-1],kroad:['stadion','R',1],
 hclear:['uyler','L',-1],hpath:['uyler','L',1],vclear:['vokzal','R',-1],vrail:['vokzal','R',1]};
var TI={};
function tFind(id){return CTASK.filter(function(t){return t.id===id})[0]}
(function remap(){
  var aina=LAY.aina;
  ANEW.forEach(function(a){var it=aina.items.filter(function(i){return !i.t&&i.n===a[4]&&i.x===a[5]&&i.b===a[6]})[0];if(!it)return;it.t=a[0];
    var t=tFind(a[0]);if(!t){t={id:a[0],b:'ad_'+a[4]};CTASK.push(t)}t.name=a[1];t.cost=a[2];t.cl=a[3];delete t.req});
  /* задания, которых нет в редакторе и которые не переносим */
  for(var i=CTASK.length-1;i>=0;i--){var t=CTASK[i];if(DROP[t.id]||t.dl!=null)CTASK.splice(i,1)}
  /* почта и остановка (были в Теме 1) — теперь в своих кварталах и открываются с ними */
  var p=tFind('post');if(p){delete p.cl;p.tl=3}var b=tFind('bus');if(b){delete b.cl;b.xl=1}
  var y=tFind('yurt');if(y){delete y.cl;y.lv=4}
  /* предметы из редактора: где стоит задание */
  GL.forEach(function(L){var q=QI[L.id];if(!q)return;L.items.forEach(function(it){if(!it.t)return;var t=tFind(it.t);if(!t){delete it.t;return}
    var w=it.w,h=hgt(it.n,w);t.x=q.x+it.x;t.y=q.y+it.b;t.q=L.id;t.it=it;t.top=t.y-h;t.box={x1:t.x-w*.42,x2:t.x+w*.42,y1:t.y-Math.min(h*.55,140),y2:t.y+4};TI[t.id]=1})});
  var A=QI.aina;Object.keys(AROAD).forEach(function(id){var t=tFind(id);if(!t)return;t.x=A.x+AROAD[id][0];t.y=A.y+AROAD[id][1];t.q='aina';t.road=id!=='flag';t.top=t.y-(id==='flag'?130:40);
    t.box=id==='flag'?{x1:t.x-26,x2:t.x+26,y1:t.y-30,y2:t.y+20}:{x1:t.x-30,x2:t.x+30,y1:t.y-24,y2:t.y+16};TI[id]=1});
  var tf=tFind('trash'),tl=tFind('log'),tp=tFind('pit'),tg=tFind('flag');if(tf)tf.cl=-1;if(tl)tl.cl=-1;if(tp)tp.cl=0;if(tg)tg.cl=2;
  Object.keys(CLR).forEach(function(id){var t=tFind(id);if(!t)return;var c=CLR[id],q=QI[c[0]],lx,ly;
    if(c[1]==='L'){lx=28;ly=416+c[2]*130}else if(c[1]==='R'){lx=Q-28;ly=416+c[2]*130}else{lx=416+c[2]*130;ly=28}
    t.x=q.x+lx;t.y=q.y+ly+10;t.q=c[0];t.road=1;t.top=t.y-50;t.box={x1:t.x-34,x2:t.x+34,y1:t.y-26,y2:t.y+14};TI[id]=1});
  /* задания без места (на всякий случай) — убрать, чтобы не висели в старых координатах */
  for(i=CTASK.length-1;i>=0;i--)if(!TI[CTASK[i].id])CTASK.splice(i,1);
})();
var RN={a_lamp2:'Фонарь горит — светло! 💡',lamp:'Фонарь горит — светло! 💡',a_flow1:'Клумба цветёт! 🌷',a_flow2:'Клумба цветёт! 🌷',a_flow3:'Клумба цветёт! 🌷',bench:'Скамейка целая — есть где посидеть! 🪑',a_bench2:'Скамейка целая — есть где посидеть! 🪑',
 a_birch1:'Берёза выросла! 🌳',a_birch2:'Берёза выросла! 🌳',a_tree1:'Дерево выросло — тень и прохлада! 🌳',a_tree2:'Дерево выросло — тень и прохлада! 🌳',a_tree3:'Дерево выросло — тень и прохлада! 🌳',a_tree4:'Дерево выросло — тень и прохлада! 🌳',
 a_bush1:'Куст расцвёл! 🌺',a_bush2:'Куст посажен — зелено! 🌿'};
try{Object.keys(RN).forEach(function(k){RESULT[k]=RN[k]})}catch(e){}
/* жители: тот, кого Ерлан поставил рядом с постройкой, и говорит за неё */
var PERS={kid_b2:1,kid_b3:1,kid_b4:1,kid_b5:1,kid_g2:1,kid_g3:1,kid_g4:1,apa2:1,ata2:1,aga:1,apa:1,artist:1,ata:1,baker:1,cashier:1,cook:1,doctor:1,guard:1,guest:1,kid_boy:1,kid_girl:1,magician:1,man_taqiya:1,seller:1,sport_boy:1,sport_girl:1,taxi_driver:1,teacher:1};
var RBIND={},RVIRT=[];
/* кто каким голосом говорит → какие картинки людей ему подходят */
var VIMG={m:['aga','man_taqiya','guard','guest','baker','cook','taxi_driver','magician'],w:['teacher','seller','cashier','doctor'],g:['apa'],a:['ata'],kb:['kid_boy','sport_boy'],kg:['kid_girl','sport_girl','artist']};
var NOV={mektep:'kb',aurukhana:'w',stadion:'kb',studia:'kg',sakhna:'kg',fontan:'m',sayabaq:'m'};
var VDEF={m:'aga',w:'teacher',g:'apa',a:'ata',kb:'kid_boy',kg:'kid_girl'};
/* квартал Айны: жители у входов своих зданий (как в старом Центре) */
var ARES={school:['kid_boy',150,272,25],hosp:['doctor',716,240,27],stad:['fb_kick_body',205,668,42],fount:['guest',484,470,27],studio:['artist',642,352,28],stage:['star',624,666,30],a_bench2:['man_taqiya',572,530,27]};
(function(){var L=LAY.aina,q=QI.aina;var tb=tFind('a_bench2');if(tb&&CMAN.sayabaq){tb.b='nurlan';CMAN.nurlan=CMAN.sayabaq;CMAN.nurlan.v=CMAN.nurlan.v||'m'}
  Object.keys(ARES).forEach(function(id){var t=tFind(id),r=ARES[id];if(!t||!CMAN[t.b])return;L.items.push({n:r[0],x:r[1],b:r[2],w:r[3],f:0,res:id,z:id==='stad'?110:id==='stage'?90:id==='school'?130:8})});
  L.items=L.items.filter(function(it){return !(PERS[it.n]&&!it.t&&!it.res)});})();
/* Ярмарка: каждый житель у своей постройки, картинка по возрасту/полу (как в старом приложении) */
var YRES={ytoys:['kid_b3',232,198],ymagic:['magician',378,222],ycar:['kid_b2',700,392],ytir:['kid_b4',640,218],yyurt:['apa2',572,505],ywheel:['aga',312,522],yurt:['apa',228,509],yswing:['sport_girl',373,617],ytramp:['sport_boy',592,603],yvata:['kid_g4',236,752],yice:['kid_g2',772,750]};
(function(){var L=LAY.yarmarka;if(!L)return;
  L.items=L.items.filter(function(it){return !(PERS[it.n]&&!it.t&&!it.res)});
  L.items.forEach(function(it){if(it.t==='yfount'&&it.n==='ata'){it.n='drink_fount';it.w=40}if(it.t==='ystage'&&it.n==='star')it.selfres=1});
  Object.keys(YRES).forEach(function(id){var t=tFind(id),r=YRES[id];if(!t||!CMAN[t.b])return;L.items.push({n:r[0],x:r[1],b:r[2],w:26,f:0,res:id,z:8})});})();
(function bindRes(){Object.keys(NOV).forEach(function(b){if(CMAN[b]&&!CMAN[b].v)CMAN[b].v=NOV[b]});
  GL.forEach(function(L){var q=QI[L.id];if(!q)return;var used={};
  L.items.forEach(function(it,k){if(it.selfres){var ts=tFind(it.t);if(ts&&CMAN[ts.b]){used[k]=1;RBIND[L.id+':'+k]=ts.id;CMAN[ts.b].dx=q.x+it.x-ts.x;CMAN[ts.b].dy=q.y+it.b-ts.y;CMAN[ts.b].still=1;ts.rbound=1;ts.selfres=1}return}if(!it.res)return;var t=tFind(it.res);if(!t)return;used[k]=1;RBIND[L.id+':'+k]=t.id;var m=CMAN[t.b];m.dx=q.x+it.x-t.x;m.dy=q.y+it.b-t.y;m.still=1;t.rbound=1});
  CTASK.filter(function(t){return t.q===L.id&&t.it&&!t.rbound&&CMAN[t.b]&&!CMAN[t.b].aina}).forEach(function(t){var m=CMAN[t.b],ok=VIMG[m.v]||(m.girl?VIMG.kg:VIMG.kb),best=-1,bd=1e9;
    L.items.forEach(function(it,k){if(it.t||!PERS[it.n]||used[k]||ok.indexOf(it.n)<0)return;var d=Math.hypot(q.x+it.x-t.x,q.y+it.b-t.y);if(d<bd){bd=d;best=k}});
    if(best>=0&&bd<380){used[best]=1;var it=L.items[best];RBIND[L.id+':'+best]=t.id;m.dx=q.x+it.x-t.x;m.dy=q.y+it.b-t.y;m.still=1;return}
    /* подходящего человека рядом нет — ставим своего у постройки */
    var n=VDEF[m.v]||(m.girl?'kid_girl':'kid_boy'),w=26,px=t.x+Math.min(t.it.w/2+18,110),py=t.y+6;
    var vi={n:n,w:w,x:px-q.x,b:py-q.y,f:1};L.items.push(vi);var k2=L.items.length-1;RBIND[L.id+':'+k2]=t.id;m.dx=px-t.x;m.dy=py-t.y;m.still=1})})})();

/* ---------- рисование ---------- */
function f1(v){return Math.round(v*10)/10}
function img(n,cx,bot,w,f,ex){var h=hgt(n,w),x=cx-w/2,y=bot-h;return '<image href="'+AP+n+'.webp'+BV+'" x="'+f1(x)+'" y="'+f1(y)+'" width="'+f1(w)+'" height="'+f1(h)+'" preserveAspectRatio="none"'+(f?' transform="matrix(-1 0 0 1 '+f1(2*cx)+' 0)"':'')+(ex||'')+'/>'}
var COL={grass:['#99bc65','#86a957'],tile:['#ddd6c3','#c4bba3'],tile_grey:['#c9cbcc','#a9adb0'],tile_terra:['#d9a27e','#b9805c'],stones:['#d9d2bf','#b3aa92'],brick:['#c0634a','#9a4a35'],gravel:['#e3dccb','#c7bea8'],wood:['#c99a62','#9c7444'],rub_g:['#5fa35a','#467d42'],rub_r:['#c9574b','#9c3f35'],asph:['#7d8288','#62666b'],asph_l:['#7d8288','#62666b']};
function patDefs(){return '<defs><pattern id="p_brick" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" fill="#c0634a"/><path d="M0 6H24M12 0V6M0 6V12M24 6V12" stroke="#e8c9b0" stroke-width="1.5"/></pattern>'+
 '<pattern id="p_gravel" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#e3dccb"/><circle cx="3" cy="4" r="1.4" fill="#b9af97"/><circle cx="10" cy="9" r="1.2" fill="#a89f88"/><circle cx="7" cy="2" r=".9" fill="#cfc6b0"/><circle cx="12" cy="3" r="1" fill="#bdb49c"/><circle cx="4" cy="11" r="1.1" fill="#c3baa3"/></pattern>'+
 '<pattern id="p_wood" width="14" height="40" patternUnits="userSpaceOnUse"><rect width="14" height="40" fill="#c99a62"/><path d="M0 0V40M14 0V40" stroke="#8f683c" stroke-width="1.5"/><path d="M0 22H14" stroke="#a87b48" stroke-width="1"/></pattern>'+
 '<pattern id="p_tile" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#ddd6c3"/><path d="M0 0H16M0 0V16" stroke="#cbc2aa" stroke-width="1"/></pattern>'+
 '<pattern id="p_tile_grey" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#c9cbcc"/><path d="M0 0H16M0 0V16" stroke="#b2b5b8" stroke-width="1"/></pattern>'+
 '<pattern id="p_tile_terra" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#d9a27e"/><path d="M0 0H16M0 0V16" stroke="#c2896a" stroke-width="1"/></pattern></defs>'}
function fillOf(s){return s==='rub_g'||s==='rub_r'||s==='grass'||s==='asph'||s==='asph_l'?COL[s][0]:'url(#p_'+s+')'}
function stonesAlong(p,col){var s='',step=Math.max(18,p.w*.85),acc=step/2;
 for(var i=1;i<p.pts.length;i++){var a=p.pts[i-1],b=p.pts[i],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);if(!L)continue;var ang=(Math.atan2(dy,dx)*180/Math.PI+90).toFixed(0);
  while(acc<=L){var x=(a[0]+dx*acc/L).toFixed(1),y=(a[1]+dy*acc/L).toFixed(1),rw=(p.w*.42).toFixed(1),rh=(p.w*.30).toFixed(1),tr=' transform="rotate('+ang+' '+x+' '+y+')"';
   s+='<ellipse cx="'+x+'" cy="'+(+y+2)+'" rx="'+rw+'" ry="'+rh+'"'+tr+' fill="'+col[1]+'"/><ellipse cx="'+x+'" cy="'+y+'" rx="'+rw+'" ry="'+rh+'"'+tr+' fill="'+col[0]+'"/>';acc+=step}
  acc-=L}return s}
function pathSVG(p){var c=COL[p.st]||COL.tile;
 if(p.ell){var e=p.ell;if(p.st==='stones'){var s='';for(var k=0;k<14;k++){var a=k/14*2*Math.PI,x=(e[0]+Math.cos(a)*e[2]*.72).toFixed(1),y=(e[1]+Math.sin(a)*e[3]*.72).toFixed(1);s+='<ellipse cx="'+x+'" cy="'+(+y+2)+'" rx="15" ry="11" fill="'+c[1]+'"/><ellipse cx="'+x+'" cy="'+y+'" rx="15" ry="11" fill="'+c[0]+'"/>'}return s}
  return '<ellipse cx="'+e[0]+'" cy="'+(e[1]+3)+'" rx="'+e[2]+'" ry="'+e[3]+'" fill="'+c[1]+'"/><ellipse cx="'+e[0]+'" cy="'+e[1]+'" rx="'+e[2]+'" ry="'+e[3]+'" fill="'+fillOf(p.st)+'"/>'}
 if(p.st==='stones')return stonesAlong(p,c);
 var d='M'+p.pts.map(function(q){return q[0]+' '+q[1]}).join('L'),cap=p.pts.length===2?'butt':'round';
 return '<path d="'+d+'" fill="none" stroke="'+c[1]+'" stroke-width="'+(p.w+5)+'" stroke-linecap="'+cap+'" stroke-linejoin="round"/><path d="'+d+'" fill="none" stroke="'+fillOf(p.st)+'" stroke-width="'+p.w+'" stroke-linecap="'+cap+'" stroke-linejoin="round"/>'+(p.st==='asph_l'?'<path d="'+d+'" fill="none" stroke="#f4f1e6" stroke-width="3" stroke-dasharray="16 12" stroke-linejoin="round"/>':'')}
function railSVG(x0,y0,w,h){var g='<rect x="'+x0+'" y="'+y0+'" width="'+w+'" height="'+h+'" fill="#bdb39b"/>';
 for(var x=x0+4;x<x0+w;x+=16)g+='<rect x="'+x+'" y="'+(y0+h*0.18)+'" width="8" height="'+(h*0.64)+'" fill="#7a5a3a" rx="1"/>';
 return g+'<rect x="'+x0+'" y="'+(y0+h*0.3)+'" width="'+w+'" height="4" fill="#5d6570"/><rect x="'+x0+'" y="'+(y0+h*0.66)+'" width="'+w+'" height="4" fill="#5d6570"/>'}
var ROAD='#7f858c';
function quarterGround(L){var q=QI[L.id],g='<g transform="translate('+q.x+' '+q.y+')">';
 g+='<rect width="'+Q+'" height="'+Q+'" fill="'+ROAD+'"/><rect x="'+O+'" y="'+O+'" width="'+B+'" height="'+B+'" fill="#99bc65" stroke="#c9c2b0" stroke-width="5"/>';
 if(L.ground&&L.ground!=='grass')g+='<rect x="'+(O+3)+'" y="'+(O+3)+'" width="'+(B-6)+'" height="'+(B-6)+'" fill="'+fillOf(L.ground)+'"/>';
 if(L.bg)g+='<image href="'+L.bg+BV+'" x="'+O+'" y="'+O+'" width="'+B+'" height="'+B+'" preserveAspectRatio="none"/>';
 for(var x=0;x<Q;x+=40){if(q.r!==0)g+='';g+='<line x1="'+x+'" y1="28" x2="'+(x+20)+'" y2="28" stroke="#fff" stroke-width="3"/><line x1="'+x+'" y1="804" x2="'+(x+20)+'" y2="804" stroke="#fff" stroke-width="3"/><line x1="28" y1="'+x+'" x2="28" y2="'+(x+20)+'" stroke="#fff" stroke-width="3"/><line x1="804" y1="'+x+'" x2="804" y2="'+(x+20)+'" stroke="#fff" stroke-width="3"/>'}
 (L.paths||[]).forEach(function(p){g+=pathSVG(p)});
 return g+'</g>'}
groundSVG=function(){var s='<svg class="cworld" width="'+CW+'" height="'+CH+'" viewBox="0 0 '+CW+' '+CH+'">'+patDefs()+'<rect width="'+CW+'" height="'+CH+'" fill="#8fbf5c"/>';
  for(var i=0;i<140;i++)s+='<ellipse cx="'+((i*67)%CW)+'" cy="'+((i*131)%CH)+'" rx="'+(10+i%5*4)+'" ry="'+(5+i%3*2)+'" fill="#86b555" opacity=".7"/>';
  /* дорога по краю города */
  GL.forEach(function(L){if(QI[L.id])s+=quarterGround(L)});
  /* верхняя дорога уходит влево за край — перекрёсток, оттуда будут ехать машины */
  HROADS().forEach(function(ty){var tx=QX(0),tr=QX(3)+Q;
    [[0,tx],[tr,CW]].forEach(function(seg){var a=seg[0],b=seg[1];s+='<rect x="'+a+'" y="'+(ty-6)+'" width="'+(b-a)+'" height="'+(O+12)+'" fill="#e8dcc4"/>'});
    s+='<rect x="0" y="'+ty+'" width="'+(tx+O)+'" height="'+O+'" fill="'+ROAD+'"/><rect x="'+(tr-O)+'" y="'+ty+'" width="'+(CW-tr+O)+'" height="'+O+'" fill="'+ROAD+'"/>';
    for(var xx=-10;xx<tx-10;xx+=40)s+='<line x1="'+xx+'" y1="'+(ty+28)+'" x2="'+(xx+20)+'" y2="'+(ty+28)+'" stroke="#fff" stroke-width="3"/>';
    for(xx=tr+10;xx<CW;xx+=40)s+='<line x1="'+xx+'" y1="'+(ty+28)+'" x2="'+(xx+20)+'" y2="'+(ty+28)+'" stroke="#fff" stroke-width="3"/>'});
  /* речка между 1-м и 2-м рядом, мосты на дорогах */
  var y0=RIVY0,y1=RIVY1;s+='<rect x="0" y="'+y0+'" width="'+CW+'" height="'+(y1-y0)+'" fill="#a8c77a"/>';
  s+='<path d="M0 '+(y0+30)+' Q'+(CW*.25)+' '+(y0+14)+' '+(CW*.5)+' '+(y0+32)+' T'+CW+' '+(y0+26)+' V'+(y1-28)+' Q'+(CW*.75)+' '+(y1-12)+' '+(CW*.5)+' '+(y1-30)+' T0 '+(y1-24)+'Z" fill="#5fc3db" stroke="#c9b38a" stroke-width="6"/>';
  for(var k=0;k<40;k++)s+='<path d="M'+(30+k*85)+' '+(y0+60+(k%3)*18)+' q8 -5 16 0 t16 0" stroke="#bfe9f2" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  for(var c=0;c<=4;c++){var bx=c===0?QX(0):c===4?QX(3)+Q-O:QX(c);s+='<rect x="'+(bx-4)+'" y="'+(y0-4)+'" width="'+(O+8)+'" height="'+(y1-y0+8)+'" fill="#b9a37a"/><rect x="'+bx+'" y="'+(y0-4)+'" width="'+O+'" height="'+(y1-y0+8)+'" fill="'+ROAD+'"/>';
    for(var yy=y0+6;yy<y1-10;yy+=40)s+='<line x1="'+(bx+28)+'" y1="'+yy+'" x2="'+(bx+28)+'" y2="'+(yy+20)+'" stroke="#fff" stroke-width="3"/>';
    s+='<rect x="'+(bx-6)+'" y="'+(y0-4)+'" width="6" height="'+(y1-y0+8)+'" fill="#e8dcc4"/><rect x="'+(bx+O)+'" y="'+(y0-4)+'" width="6" height="'+(y1-y0+8)+'" fill="#e8dcc4"/>'}
  /* железная дорога между 2-м и 3-м рядом — через весь город */
  var ry=QY(2);s+=railSVG(0,ry,CW,O);
  return s+'</svg>'};

/* машины по горизонтальным дорогам: вправо — нижняя полоса, влево — верхняя */
var CARS=[['car_side',86],['car2_side',86],['taxi_side',86],['truck_side',112],['bus_side',120],['bus_white',134],['bus_yellow',134]];
function HROADS(){return [QY(0),QY(0)+Q-O,QY(1),QY(2)+Q-O]}

/* поезд: собран (vtrain+vbags) — приезжает справа, стоит у вокзала, уезжает влево */
var TRAIN=['loco_s','wagon_yellow','wagon_blue','wagon_tail'];
window.trainOn=function(){try{return cdone('vtrain')&&cdone('vbags')}catch(e){return false}}

/* речка: рыбак качается, лодка с детьми и парусник плывут, утки плывут; между мостами */

/* лёгкая анимация: маленькие блоки, двигает видеокарта (transform); при движении карты — пауза */
;(function(){var st=document.createElement('style');st.textContent=
'.mvo{position:absolute;will-change:transform;pointer-events:none;animation-timing-function:linear;animation-iteration-count:infinite}'+
'.mvo img{position:absolute;left:0;bottom:0;width:100%;height:auto;display:block}'+
'.mvo .fl{transform:scaleX(-1)}.mvo .sh{position:absolute;left:10%;right:10%;bottom:-3px;height:6px;border-radius:50%;background:rgba(0,0,0,.18)}'+
'.cview.mv .mvo,.cview.mv .mvo *{animation-play-state:paused!important}'+
'@keyframes mvx{from{transform:translate3d(0,0,0)}to{transform:translate3d(var(--dx),0,0)}}'+
'@keyframes mvf{0%{transform:translate3d(0,0,0);opacity:0}8%{opacity:1}92%{opacity:1}100%{transform:translate3d(var(--dx),0,0);opacity:0}}'+
'@keyframes bob{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-1.5px) rotate(1.5deg)}}'+
'@keyframes trn{0%,8%{transform:translate3d(var(--x),0,0);animation-timing-function:cubic-bezier(0,0,.35,1)}40%,58%{transform:translate3d(0,0,0);animation-timing-function:cubic-bezier(.65,0,1,1)}90%,100%{transform:translate3d(calc(-1*var(--x)),0,0)}}';
document.head.appendChild(st)})();
function mvImg(n,flip){return '<img src="'+AP+n+'.webp'+BV+'"'+(flip?' class="fl"':'')+' alt="">'}
window.carsHTML=function(){var h='',x1=CW+20;
  HROADS().forEach(function(y,ri){[1,-1].forEach(function(dir){
    var ly=dir>0?y+O-6:y+O/2-3,n=3,x0=-80,L=x1-x0+120;
    for(var i=0;i<n;i++){var c=CARS[(ri*5+i*3+(dir>0?0:2))%CARS.length],w=c[1],hh=w*(ASP[c[0]]||.48),sp=55+((ri*7+i*13+(dir>0?0:5))%5)*9,dur=(L/sp).toFixed(1),beg=-(dur*(i/n+(dir>0?0:.17))).toFixed(1);
      var xs=dir>0?x0-60-w/2:x1+60-w/2,dx=dir>0?L:-L;
      h+='<div class="mvo" style="left:'+f1(xs)+'px;top:'+f1(ly-hh)+'px;width:'+w+'px;height:'+f1(hh)+'px;z-index:'+Math.round(ly)+';--dx:'+dx+'px;animation-name:mvx;animation-duration:'+dur+'s;animation-delay:'+beg+'s"><div class="sh"></div>'+mvImg(c[0],dir<0)+'</div>'}})});
  return h};
window.trainHTML=function(){if(!trainOn())return '';var L=null;GL.forEach(function(l){if(l.id==='vokzal')L=l});var q=QI.vokzal;if(!L||!q)return '';
  var it=L.items.filter(function(i){return TRAIN.indexOf(i.n)>=0});if(!it.length)return '';
  var x0=1e9,x1=-1e9,yb=0,top=1e9;it.forEach(function(i){var h=hgt(i.n,i.w);x0=Math.min(x0,q.x+i.x-i.w/2);x1=Math.max(x1,q.x+i.x+i.w/2);yb=Math.max(yb,q.y+i.b);top=Math.min(top,q.y+i.b-h)});
  var parts='';it.forEach(function(i){var h=hgt(i.n,i.w);parts+='<img src="'+AP+i.n+'.webp'+BV+'"'+(i.f?' class="fl"':'')+' alt="" style="left:'+f1(q.x+i.x-i.w/2-x0)+'px;top:'+f1(q.y+i.b-h-top)+'px;bottom:auto;width:'+i.w+'px;height:'+f1(h)+'px">'});
  return '<div class="mvo" style="left:'+f1(x0)+'px;top:'+f1(top)+'px;width:'+f1(x1-x0)+'px;height:'+f1(yb-top)+'px;z-index:'+(yb+1)+';--x:'+(CW+200)+'px;animation-name:trn;animation-duration:36s">'+parts+'</div>'};
window.boatsHTML=function(){var h='',wl=RIVY0+(RIVY1-RIVY0)*.62,segs=[];
  for(var c=0;c<4;c++){var a=(c===0?QX(0):QX(c))+O+14,b=(c===3?QX(3)+Q-O:QX(c+1))-14;segs.push([a,b])}
  var one=function(n,w,x0,x1,dur,beg,flip,yo){var hh=hgt(n,w),y=wl+(yo||0),mv=x0!==x1;
    h+='<div class="mvo" style="left:'+f1(x0-w/2)+'px;top:'+f1(y-hh)+'px;width:'+w+'px;height:'+f1(hh)+'px;z-index:'+Math.round(y)+';--dx:'+f1(x1-x0)+'px;'+(mv?'animation-name:mvf;animation-duration:'+dur+'s;animation-delay:'+beg+'s':'')+'">'+
      '<div style="position:absolute;inset:0;animation:bob 3s ease-in-out infinite">'+mvImg(n,flip)+'</div></div>'};
  var s=segs;
  one('ducks',46,s[0][0]+20,s[0][1]-20,40,-6,0,-6);
  one('boat_fish',62,(s[1][0]+s[1][1])/2,(s[1][0]+s[1][1])/2,0,0,0,0);
  one('boat_kids',62,s[2][0]+30,s[2][1]-30,30,-11,0,4);
  one('boat_sail',52,s[3][1]-30,s[3][0]+30,34,-4,1,2);
  return h};

/* полоса деревьев вдоль шва с горами (над верхней дорогой) — разбавить */
window.treelineHTML=function(){var T=[['tree2',44],['tree2',52],['tree2',38],['tree2',48],['tree2',56],['tree2',42]],h='',x=-20,i=0,yb=QY(0)-8,top=yb-140;
  while(x<CW+40){var t=T[(i*7+3)%T.length],w=t[1]*1.35*(0.85+((i*37)%30)/100),b=yb-((i*13)%3)*6;h+=img(t[0],x,b,w,(i%3)===1);x+=w*0.55+((i*29)%24);i++}
  return '<svg class="spr" style="left:0;top:'+top+'px;width:'+CW+'px;height:'+(yb-top+4)+'px;z-index:6" viewBox="0 '+top+' '+CW+' '+(yb-top+4)+'">'+h+'</svg>'};

/* жители квартала Айны гуляют около своих зданий (CSS, легко); при движении карты — пауза */
var WALK={school:[-38,11,-1],hosp:[-42,13,-5],fount:[40,12,-3],studio:[30,10,-7],a_bench2:[36,14,-9]};
;(function(){var css='.walker{animation-timing-function:linear;animation-iteration-count:infinite;will-change:transform}.walker .rf{transform-box:fill-box;transform-origin:50% 100%;animation-iteration-count:infinite;animation-timing-function:steps(1,end)}.cview.mv .walker,.cview.mv .walker *{animation-play-state:paused!important}';
  Object.keys(WALK).forEach(function(id){var dx=WALK[id][0],k='',st=8,f='';
    var at=function(p,x,y){k+=p.toFixed(1)+'%{transform:translate('+x.toFixed(1)+'px,'+y+'px)}'};
    at(0,0,0);at(15,0,0);for(var i=1;i<=st;i++)at(15+25*i/st,dx*i/st,i%2?-1.5:0);at(55,dx,0);for(i=1;i<=st;i++)at(55+25*i/st,dx*(1-i/st),i%2?-1.5:0);at(100,0,0);
    var so=dx<0?1:-1,sb=-so,fk=function(p,v){return p+'%{transform:scaleX('+v+')}'};/* все картинки смотрят чуть влево: идёт вправо — зеркалим */
    css+='@keyframes wk_'+id+'{'+k+'}@keyframes wf_'+id+'{'+fk(0,1)+fk(14,so)+fk(54,sb)+fk(81,1)+fk(100,1)+'}';
    css+='svg.res[data-r="'+id+'"] .rf{animation-name:wf_'+id+';animation-duration:'+WALK[id][1]+'s;animation-delay:'+WALK[id][2]+'s}';
    css+='svg.res[data-r="'+id+'"]{animation-name:wk_'+id+';animation-duration:'+WALK[id][1]+'s;animation-delay:'+WALK[id][2]+'s}';
  });
  var s=document.createElement('style');s.textContent=css;document.head.appendChild(s)})();
/* старые слои (машины, облака, тени, птицы) в тесте не нужны */
cloudsHTML=function(){return ''};updateClouds=function(){};try{clDraw=function(){}}catch(e){}
carStart=function(){};birdStart=function(){};shadesHTML=function(){return ''};try{PARKED.length=0}catch(e){}try{BGTREES.length=0}catch(e){}
try{MONX=QI.aina.x+416;MONY=QI.aina.y+700}catch(e){}
/* клады — в квартале Айны */
try{CGIFT.length=0;[[95,455,6],[560,452,6],[770,470,8]].forEach(function(p,i){CGIFT.push({id:'g'+(i+1),x:QI.aina.x+p[0],y:QI.aina.y+p[1],c:p[2]})})}catch(e){}

function vsg(t){try{var S=SIGNS[t.b];if(!S||!t.it)return '';return vsign(t.x,t.top-24,t.b)}catch(e){return ''}}
function taskSVG(t){var done=cdone(t.id);
  if(t.road){if(done)return '';if(CLR[t.id]){var dn=['debris1','debris2','debris3'][(t.id.length+t.id.charCodeAt(0))%3],dw=86,dh=dw*({debris1:.632,debris2:.644,debris3:.671}[dn]);return '<image href="'+AP+dn+'.webp" x="'+f1(t.x-dw/2)+'" y="'+f1(t.y-dh+8)+'" width="'+dw+'" height="'+f1(dh)+'"/>'}return vbefore(t)}
  if(t.id==='flag')return done?vbuild(t):vbefore(t);
  var it=t.it,s=img(it.n,t.x,t.y,it.w,it.f);
  if(done)return s+vsg(t);
  var h=hgt(it.n,it.w);
  return '<g opacity=".38" style="filter:grayscale(1) brightness(1.15)">'+s+'</g>'+(it.w<110?'':'<rect x="'+f1(t.x-it.w/2)+'" y="'+f1(t.y-h)+'" width="'+f1(it.w)+'" height="'+f1(h)+'" rx="10" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" opacity=".9"/>')}
function boxOf(t){if(t.it){var w=t.it.w,h=hgt(t.it.n,w);return [t.x-w/2-30,t.y-h-60,w+60,h+80]}var b=OBOX[t.b]||[60,60,60,40];return [t.x-b[0]-60,t.y-b[2]-150,b[0]+b[1]+120,b[2]+b[3]+200]}
function zOf(L,it){return Math.round(QI[L.id].y+it.b+(it.z||0))}
spritesHTML=function(){var c=cst(),h='';
  GL.forEach(function(L){var q=QI[L.id];if(!q)return;L.items.forEach(function(it,k){if(it.t&&TI[it.t])return;if(RBIND[L.id+':'+k])return;if(it.need&&!cdone(it.need))return;
    var w=it.w,hh=hgt(it.n,w),x=q.x+it.x,b=q.y+it.b;h+=spr(zOf(L,it),[x-w/2-2,b-hh-2,w+4,hh+4],img(it.n,x,b,w,it.f))})});
  CTASK.forEach(function(t){if(t.selfres&&cdone(t.id))return;var bx=boxOf(t);h+=spr(t.road?t.y-30:(t.it?Math.round(t.y+(t.it.z||0)):t.y),bx,'<g class="obj'+(cdone(t.id)?' built':'')+'" data-t="'+t.id+'">'+taskSVG(t)+'</g>')});
  /* жители: свой человек из редактора; до постройки — просто стоит, после — говорит (💬) */
  GL.forEach(function(L){var q=QI[L.id];if(!q)return;L.items.forEach(function(it,k){var id=RBIND[L.id+':'+k];if(!id)return;var t=tFind(id);if(!t)return;if(t.selfres&&!cdone(t.id))return;var m=CMAN[t.b],w=resW(it.n,it.w),hh=hgt(it.n,w),px=q.x+it.x,py=q.y+it.b,on=cdone(t.id);
    RES[t.id]=RES[t.id]||{dx:0,dy:0,tx:0,ty:0,wait:1e9,k:0};
    h+='<svg class="spr res'+(on&&WALK[t.id]?' walker':'')+'" data-r="'+t.id+'" data-by="'+py+'" style="left:'+(px-w/2-20)+'px;top:'+(py-hh-40)+'px;width:'+(w+40)+'px;height:'+(hh+50)+'px;z-index:'+Math.round(py+(it.z||0))+'" viewBox="'+(px-w/2-20)+' '+(py-hh-40)+' '+(w+40)+' '+(hh+50)+'">'+
     (on?'<g class="resident" data-r="'+t.id+'">':'<g>')+'<g class="rb"><g class="rf">'+(t.id==='stad'?kickSVG(px,py,w):img(it.n,px,py,w,it.f))+'</g></g>'+(on&&rnew(t.id,m)?'<g class="rnew"><circle cx="'+(px+w/2)+'" cy="'+(py-hh-6)+'" r="12" fill="#fff" stroke="#ffd200" stroke-width="3"/><text x="'+(px+w/2)+'" y="'+(py-hh-1)+'" font-size="14" text-anchor="middle">💬</text></g>':'')+
     (on?'<rect x="'+(px-w/2-8)+'" y="'+(py-hh-8)+'" width="'+(w+16)+'" height="'+(hh+12)+'" fill="transparent"/>':'')+'</g></svg>'})});
  /* второй футболист — тоже житель, говорит своим голосом */
  try{if(cdone('stad')){var A2=QI.aina,sx=A2.x+FB.gx,sy=A2.y+FB.gb,sw=resW('fb_keep',FB.kw2),sh=hgt('fb_keep',sw);ST2=[sx,sy-sh];RES.stad2=RES.stad2||{dx:0,dy:0,tx:0,ty:0,wait:1e9,k:0};
    h+='<svg class="spr res" data-r="stad2" style="left:'+(sx-sw/2-20)+'px;top:'+(sy-sh-40)+'px;width:'+(sw+40)+'px;height:'+(sh+50)+'px;z-index:'+(sy+105)+'" viewBox="'+(sx-sw/2-20)+' '+(sy-sh-40)+' '+(sw+40)+' '+(sh+50)+'"><g class="resident" data-r="stad2"><g class="rb">'+'<g>'+img('fb_keep',sx,sy,sw,0)+'<animateTransform attributeName="transform" type="translate" values="0 0;0 0;-2.5 -1;0 0;0 0;2.5 -1;0 0;0 0" keyTimes="0;.48;.53;.6;.68;.72;.78;1" dur="'+FB.T+'s" repeatCount="indefinite"/></g>'+'</g><rect x="'+(sx-sw/2-8)+'" y="'+(sy-sh-8)+'" width="'+(sw+16)+'" height="'+(sh+12)+'" fill="transparent"/></g></svg>'}}catch(e){}
  /* стадион построен — два футболиста пасуют мяч */
  try{if(cdone('stad')){var A=QI.aina,P=fbPts(A),F=P.F,Fg=P.Fg,G=P.G;
    var vals=[Fg,Fg,F,[ (F[0]+G[0])/2,Math.min(F[1],G[1])-16],G,G,[(G[0]+Fg[0])/2,Fg[1]-10],Fg,Fg].map(function(p){return f1(p[0]-Fg[0])+' '+f1(p[1]-Fg[1])}).join(';');
    var x0=Math.min(F[0],Fg[0])-16,y0=Math.min(F[1],G[1])-40,x1=G[0]+16,y1=Fg[1]+12;
    h+='<svg class="spr" style="left:'+x0+'px;top:'+y0+'px;width:'+(x1-x0)+'px;height:'+(y1-y0)+'px;z-index:'+(Fg[1]+120)+'" viewBox="'+x0+' '+y0+' '+(x1-x0)+' '+(y1-y0)+'"><g>'+ballSVG(Fg[0],Fg[1]-4)+'<animateTransform attributeName="transform" type="translate" values="'+vals+'" keyTimes="0;.28;.3;.41;.52;.7;.81;.92;1" dur="'+FB.T+'s" repeatCount="indefinite"/></g></svg>'}}catch(e){}
  if(typeof decoSprites==='function')try{h+=decoSprites()}catch(e){}
  if(typeof monSprite==='function')try{var ms=monSprite(),K=.55;if(ms)h+=ms.replace(/left:[^;]+;top:[^;]+;width:180px;height:220px/,'left:'+f1(MONX-90*K)+'px;top:'+f1(MONY+20-220*K)+'px;width:'+f1(180*K)+'px;height:'+f1(220*K)+'px')}catch(e){}
  /* туман над закрытыми кварталами */
  QS.forEach(function(qq){var q=QI[qq[0]];if(qOpen(q.id))return;
    h+='<div class="qfog" style="left:'+(q.x+20)+'px;top:'+(q.y+20)+'px;width:'+(Q-40)+'px;height:'+(Q-40)+'px"><i></i><i></i><i></i><i></i><i></i><b>'+QEM[q.id]+'</b><span>'+QNM[q.id]+'</span><small>🔒 Тема '+q.th+'</small></div>'});
  return h};
/* туман — облачная пелена */
var css=document.createElement('style');
css.textContent='.qfog{position:absolute;z-index:3900;pointer-events:none;border-radius:60px;background:rgba(244,248,251,.86);box-shadow:0 0 60px 40px rgba(244,248,251,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-family:Rubik,sans-serif;color:#6b8193;overflow:visible}'+
 '.qfog i{position:absolute;width:300px;height:190px;border-radius:50%;background:radial-gradient(circle at 50% 45%,#fff 0 45%,rgba(255,255,255,.85) 58%,rgba(255,255,255,0) 72%)}'+
 '.qfog i:nth-child(1){left:-40px;top:-30px}.qfog i:nth-child(2){right:-40px;top:40px}.qfog i:nth-child(3){left:60px;bottom:-30px}.qfog i:nth-child(4){right:80px;bottom:60px}.qfog i:nth-child(5){left:250px;top:250px;width:340px}'+
 '.qfog b{position:relative;font-size:96px;opacity:.55;filter:grayscale(.5)}.qfog span{position:relative;font-size:46px;font-weight:800}.qfog small{position:relative;font-size:34px;font-weight:700;opacity:.8}'+
 '.czone2{position:absolute;right:10px;top:64px;z-index:30;border:0;border-radius:14px;padding:8px 12px;background:#fff;box-shadow:0 3px 0 rgba(0,0,0,.15);font:800 14px Rubik,sans-serif;color:#14222c}'+
 '.qmap{position:absolute;inset:0;z-index:60;background:rgba(20,34,44,.45);display:flex;align-items:center;justify-content:center}.qmap .qm{background:#fffaf0;border-radius:22px;padding:14px;width:min(360px,92vw);box-shadow:0 8px 30px rgba(0,0,0,.25)}'+
 '.qmap h3{margin:0 0 10px;font:800 18px Rubik,sans-serif;text-align:center;color:#14222c}.qmap .qg{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.qmap .qg .rv{grid-column:1/-1;height:8px;border-radius:4px;background:#5fc3db}.qmap .qg .rl{grid-column:1/-1;height:6px;border-radius:3px;background:repeating-linear-gradient(90deg,#7a5a3a 0 4px,#bdb39b 4px 10px)}'+
 '.qmap .qg button{border:0;border-radius:12px;padding:8px 2px;background:#e9f5dc;font:700 11px/1.2 Rubik,sans-serif;color:#14222c;display:flex;flex-direction:column;align-items:center;gap:2px;min-height:64px}.qmap .qg button b{font-size:22px}.qmap .qg button.off{background:#eceff1;color:#90a0ab}.qmap .qg button.off b{filter:grayscale(1);opacity:.5}.qmap .qg button.qcur{outline:3px solid #ff8a3d}'+
 '.qmap .qx{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:8px 18px;background:#14222c;color:#fff;font:800 14px Rubik,sans-serif}';
document.head.appendChild(css);

/* ---------- кто где, видимость, камера ---------- */
objRect=function(t){if(t.box)return t.box;var b=OBOX[t.b]||[60,60,60,40];return {x1:t.x-b[0],x2:t.x+b[1],y1:t.y-b[2],y2:t.y+b[3]}};
/* большие постройки-декор тоже не даём Айне загораживать */
var DECB=[];GL.forEach(function(L){var q=QI[L.id];if(!q)return;L.items.forEach(function(it){if(it.t||PERS[it.n]||it.w<90)return;var h=hgt(it.n,it.w);DECB.push({x1:q.x+it.x-it.w*.42,x2:q.x+it.x+it.w*.42,y1:q.y+it.b-Math.min(h*.5,120),y2:q.y+it.b+4})})});
/* дороги, по которым Айна не ходит: река и рельсы */
ROADS=[{x1:0,x2:CW,y1:RIVY0+20,y2:RIVY1-20},{x1:0,x2:CW,y1:QY(2)+4,y2:QY(2)+O-4}];
function hitB(a,b){return a.x1<b.x2&&a.x2>b.x1&&a.y1<b.y2&&a.y2>b.y1}
spotOK=function(x,y){var me={x1:x-22,x2:x+22,y1:y-62,y2:y};if(x<MG+30||x>CW-MG-30||y<MG+90||y>CH-MG-20)return false;
  if(ROADS.some(function(r){return hitB(me,r)}))return false;if(CTASK.some(function(t){return hitB(me,objRect(t))}))return false;if(DECB.some(function(r){return hitB(me,r)}))return false;
  return qOpenAt(x,y-30)};
spotFree=function(x,y){var me={x1:x-22,x2:x+22,y1:y-62,y2:y};if(x<MG+30||x>CW-MG-30||y<MG+90||y>CH-MG-20)return false;
  if(ROADS.some(function(r){return hitB(me,r)}))return false;return !CTASK.some(function(t){return hitB(me,objRect(t))})};
cvisible=function(x,y,pad){return qOpenAt(x,y)};
crevealPts=function(){var p=[];QS.forEach(function(qq){var q=QI[qq[0]];p.push({x:q.x+Q/2,y:q.y+Q/2,r:Q/2})});return p};
var PH=380;
function pano(){var w=document.getElementById('cworld');if(!w)return;var d=document.getElementById('cpano');
  if(!d){d=document.createElement('div');d.id='cpano';w.insertBefore(d,w.firstChild)}
  d.style.cssText='position:absolute;left:0;top:-'+PH+'px;width:'+CW+'px;height:'+(PH+4)+'px;background:url('+AP+'panorama_strip.webp) 0 0/auto 100% repeat-x;pointer-events:none;z-index:0'}
camApply=function(){var w=document.getElementById('cworld'),v=document.getElementById('cview');if(!w||!v)return;pano();
  var vw=v.clientWidth,vh=v.clientHeight,Z=CAM.z||1;
  var lo=-(CW*Z-vw),hi=0;if(lo>hi){var m=(lo+hi)/2;lo=hi=m}CAM.x=Math.max(lo,Math.min(hi,CAM.x));
  lo=-(CH*Z-vh)-90;hi=PH*Z;if(lo>hi){m=(lo+hi)/2;lo=hi=m}CAM.y=Math.max(lo,Math.min(hi,CAM.y));
  w.style.transformOrigin='0 0';w.style.transform='translate('+CAM.x+'px,'+CAM.y+'px) scale('+Z+')';
  try{var qc=qAt((vw/2-CAM.x)/Z,(vh/2-CAM.y)/Z);if(qc&&qc!==camApply.q){camApply.q=qc;var n=document.querySelector('.cname');if(n)n.textContent=(st.city_name||'Мой город')+' · '+QNM[qc]}}catch(e){}};
cityRender=function(){var w=document.getElementById('cworld');if(!w)return;
  w.querySelector('.csvg').innerHTML=groundSVG();var sp=document.getElementById('csprites');if(sp)sp.innerHTML=spritesHTML();try{calmAnims()}catch(e){}
  w.querySelector('.cbubs').innerHTML=bubblesHTML();fixBubs();cityHud();try{tutApply()}catch(e){}try{pinCount()}catch(e){}pano();
  try{var b=document.querySelector('.cbot.nb');if(b){var s=b.querySelector('.nbi[data-a=shop] small');if(s)s.textContent='🪙 '+st.coins}}catch(e){}};
/* пузырь «⚡ задание» — над картинкой постройки */
function fixBubs(){document.querySelectorAll('.cbubs [data-v]').forEach(function(el){var t=tFind(el.dataset.v);if(!t||t.top==null)return;el.style.left=t.x+'px';el.style.top=Math.round(t.top+(t.road?6:16))+'px'})}
window.gridFixBubs=fixBubs;


/* стройка: два строителя-картинки (каска, жилет, молоток), пыль, леса, стук */
buildShow=function(t){var w=document.getElementById('cworld');if(!w)return null;var d=document.createElement('div');d.className='cbuild';d.style.left=t.x+'px';d.style.top=(t.y+6)+'px';
  var bimg=function(x,f,dl){var h=72,w=h*275/340,x0=x-w*.655,ex=f1(x0+w*.484),ey=f1(-h+h*.463),im=function(n){return '<image href="'+AP+n+'.webp" x="'+f1(x0)+'" y="'+(-h)+'" width="'+f1(w)+'" height="'+h+'"/>'};
    return '<g'+(f?' transform="matrix(-1 0 0 1 '+f1(2*x)+' 0)"':'')+'>'+im('builder_base')+'<g>'+im('builder_arm')+'<animateTransform attributeName="transform" type="rotate" values="0 '+ex+' '+ey+';-40 '+ex+' '+ey+';0 '+ex+' '+ey+'" keyTimes="0;.3;1" dur=".56s" begin="'+dl+'s" repeatCount="indefinite"/></g></g>'};
  var puffs='';[[-40,-8,18],[38,-6,17],[-18,-30,20],[22,-34,19],[0,-12,22],[-50,-40,14],[50,-42,14],[0,-58,16]].forEach(function(p,i){puffs+='<circle class="pf" cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+'" fill="#f3e9d6" style="animation-delay:'+(i*.15)+'s"/>'});
  var sc='<g class="sc" stroke="#b07a43" stroke-width="3" fill="none" stroke-linecap="round"><path d="M-30 -4 V-80 M30 -4 V-80 M-34 -80 H34 M-30 -28 H30 M-30 -54 H30 M-30 -4 L30 -54 M-30 -54 L30 -80"/></g>';
  d.innerHTML='<svg viewBox="-95 -140 190 160">'+sc+puffs+'<g class="bl">'+bimg(-60,1,0)+'</g><g class="br">'+bimg(60,0,.28)+'</g></svg>';w.appendChild(d);
  var n=0,iv=setInterval(function(){n++;if(n>2)tone(n%2?190:240,.05,0,'square',.025)},280);
  return {done:function(){clearInterval(iv);d.classList.add('bye');setTimeout(function(){d.remove()},1400)},kill:function(){clearInterval(iv);d.remove()}}};

/* ---------- районы: где Айна, перелёты, прилёты ---------- */
function qOfAina(){var c=cst();return qAt(c.ax||0,c.ay||0)||'aina'}
function goQ(id){var c=cst(),q=QI[id];if(!q)return;var s=freeSpot(q.x+Q/2,q.y+Q/2+120);c.ax=s.x;c.ay=s.y;save()}
window.goQ=goQ;
centrGo=function(){goQ('aina')};yarmGo=function(){goQ('yarmarka')};zooGo=function(){goQ('zoo')};bazGo=function(){goQ('bazar')};parkGo=function(){goQ('sayabaq')};
schoolGo=function(){goQ('mektep')};shopGo=function(){goQ('stadion')};homeGo=function(){goQ('uyler')};vokGo=function(){goQ('vokzal')};
inYarm=function(){return qOfAina()==='yarmarka'};inZoo=function(){return qOfAina()==='zoo'};inBaz=function(){return qOfAina()==='bazar'};inPark=function(){return qOfAina()==='sayabaq'};
inSchool=function(){var q=qOfAina();return q==='mektep'||q==='kitaphana'};inShop=function(){return qOfAina()==='stadion'};inHome=function(){return qOfAina()==='uyler'};
inVok=function(){var q=qOfAina();return q==='vokzal'||q==='poshta'||q==='avtobeket'};try{inDay=function(){return false}}catch(e){}
zoneName=function(){return QNM[qOfAina()]};
nbZone=function(){var z=QZ[qOfAina()]||QZ.aina;return z};
nbZonesCount=function(){return QS.filter(function(q){return qOpen(q[0])}).length};
function flyTo(id){var c=cst(),a=document.getElementById('caina');goQ(id);c=cst();if(a){a.style.left=c.ax+'px';a.style.top=c.ay+'px';a.style.zIndex=Math.round(c.ay)}camTo(c.ax,c.ay-60,900);
  var n=document.querySelector('.cname');if(n)n.textContent=(st.city_name||'Мой город')+' · '+QNM[id];var zb=document.querySelector('.czone2');if(zb)zb.innerHTML=QEM[id]+' Кварталы';try{nbProgRefresh()}catch(e){}}
function qMap(){var scr=document.querySelector('.cityscr');if(!scr)return;var cur=qOfAina(),o=document.createElement('div');o.className='qmap';
  var row=function(r){return QS.filter(function(q){return q[2]===r}).sort(function(a,b){return a[1]-b[1]}).map(function(q){var on=qOpen(q[0]);return '<button class="'+(on?'':'off')+(q[0]===cur?' qcur':'')+'" data-q="'+q[0]+'"><b>'+QEM[q[0]]+'</b>'+QNM[q[0]]+(on?'':'<br>🔒 Тема '+q[3])+'</button>'}).join('')};
  o.innerHTML='<div class="qm"><h3>🗺 Город</h3><div class="qg">'+row(0)+'<div class="rv"></div>'+row(1)+'<div class="rl"></div>'+row(2)+'</div><button class="qx">Закрыть</button></div>';
  o.addEventListener('click',function(e){e.stopPropagation();var b=e.target.closest('button');if(!b){if(e.target===o)o.remove();return}if(b.classList.contains('qx')){o.remove();return}
    var id=b.dataset.q;if(!qOpen(id)){sNo();try{ainaSay('Этот квартал ещё в облаке ☁️ Он откроется с Темой '+QI[id].th+' 📚',3000)}catch(_){}o.remove();return}sTap();o.remove();flyTo(id)});
  scr.appendChild(o)}
window.qMap=qMap;
yZoneBtn=function(){var scr=document.querySelector('.cityscr');if(!scr)return;var old=scr.querySelectorAll('.czone,.czone2');old.forEach(function(e){e.remove()});
  var b=document.createElement('button');b.className='czone2';b.type='button';b.innerHTML=QEM[qOfAina()]+' Кварталы';
  b.addEventListener('click',function(e){e.stopPropagation();if(CBUSY)return;sTap();qMap()});scr.appendChild(b);
  var n=document.querySelector('.cname');if(n)n.textContent=(st.city_name||'Мой город')+' · '+zoneName()};
nbZones=function(){qMap()};
/* прилёт в новый квартал: облака над ним расходятся */
function qArrive(id,g,o){var w=document.getElementById('cworld');if(!w)return;CBUSY=true;YARRIVING=1;var q=QI[id];
  var cov=document.createElement('div');cov.className='ycov';var h='';for(var i=0;i<4;i++)for(var j=0;j<4;j++){var px=q.x+110+i*205,py=q.y+120+j*195;h+='<i class="'+(i<2?'l':'r')+'" style="left:'+(px-120)+'px;top:'+(py-90)+'px;animation-delay:'+((i+j)%5)*.05+'s"></i>'}
  cov.innerHTML=h;w.appendChild(cov);if(o.pre){o.pre();var c0=cst(),a0=document.getElementById('caina');if(a0){a0.style.left=c0.ax+'px';a0.style.top=c0.ay+'px';a0.style.zIndex=Math.round(c0.ay)}camTo(c0.ax,c0.ay-60,600)}
  var bb=w.querySelector('.cbubs');if(bb){bb.style.transition='opacity .6s';bb.style.opacity=0}
  setTimeout(function(){ainaMood('wow');ainaSay(o.s1,2900)},500);
  setTimeout(function(){camTo(q.x+Q/2,q.y+Q/2,1900)},2500);
  setTimeout(function(){sWhoosh();cov.classList.add('part');setTimeout(function(){var bb=w.querySelector('.cbubs');if(bb)bb.style.opacity=1},1200);setTimeout(function(){cov.remove()},1500)},4500);
  setTimeout(function(){goQ(id);var c=cst(),a=document.getElementById('caina');if(a){a.style.left=c.ax+'px';a.style.top=c.ay+'px';a.style.zIndex=Math.round(c.ay)}
    sWinBig();try{yBalloons(w)}catch(e){}fxBurst(q.x+Q/2,q.y+Q/2,18,'🎉');fxBurst(c.ax,c.ay-30,10,'✨');if(g)fxText(c.ax,c.ay-90,'+'+g+' ⚡');yZoneBtn();try{nbProgRefresh()}catch(e){}},5100);
  setTimeout(function(){ainaMood('laugh');ainaSay(o.s2,7000)},6000);
  setTimeout(function(){CBUSY=false;YARRIVING=0;try{nextTarget()}catch(e){}try{if(o.ch!=null&&CHTXT[o.ch])chapterCard(o.ch)}catch(e){}},9200)}
window.qArrive=qArrive;
yarmArrive=function(g){qArrive('yarmarka',g,{s1:'Ой! Смотри, рядом с моим домом что-то есть… 👀',s2:'<b>Жәрмеңке</b> — ярмарка! 🎪 Её засыпало облаком. Расчистим? Жми на задания ⚡',ch:1})};
parkArrive=function(g){qArrive('sayabaq',g,{pre:yarmGo,s1:'Ой! Слышишь? Справа от ярмарки кто-то кричит: «Жүр! Тез!» 🏃👀',s2:'<b>Саябақ</b> — парк! 🌳 Облако его заморозило: все замерли, как статуи. Расчистим? Жми на задания ⚡',ch:4})};
homeArrive=function(g){qArrive('uyler',g,{pre:parkGo,s1:'Слышишь? 🏠 Справа от парка кто-то спорит: «Это моё!» — «Нет, моё!» Облако перепутало все вещи… 🤔',s2:'<b>Үйлер</b> — улица домов! 🏠 Облако перепутало, где чьё. Вернём деталь «ЧЕЙ?» — жми на задания ⚡',ch:7})};
schoolArrive=function(g){qArrive('mektep',g,{pre:homeGo,s1:'Слышишь? 🔔 За речкой звенит школьный звонок! Но все стоят и не знают, куда идти… 🤔',s2:'<b>Мектеп</b> — школа! 🏫 Облако стёрло стрелки: никто не знает, куда идти. Расчистим? Жми на задания ⚡',ch:5})};
stadArrive=function(g){qArrive('stadion',g,{pre:schoolGo,s1:'Слышишь? ⚽ Недалеко от школы кто-то кричит: «Гол!» Но все потерялись и не могут вернуться домой… 🤔',s2:'<b>Стадион</b> и магазины! ⚽🛒 Облако спрятало стрелку «откуда» — никто не может вернуться домой. Расчистим? Жми на задания ⚡',ch:6})};
vokArrive=function(g){qArrive('vokzal',g,{pre:shopGo,s1:'🚂 Слышишь? Ту-тууу! Это вокзал. Только поезд стоит: облако стёрло сцепки между вагонами. И между словами тоже!',s2:'<b>Вокзал</b>! 🚂 Чемоданы без хозяев, никто не знает, чьё что… Поможешь сцепить? Жми на задания ⚡',ch:8})};
zooArrive=function(g){qArrive('zoo',g,{pre:function(){goQ('avtobeket')},s1:'Ой! Слышишь? Кто-то рычит за железной дорогой… 🦁👀',s2:'<b>Хайуанаттар бағы</b> — зоопарк! 🦁 Облако его засыпало, и все звери спрятались. Расчистим? Жми на задания ⚡',ch:2})};
bazArrive=function(g){qArrive('bazar',g,{pre:zooGo,s1:'Ой! Слышишь? Рядом с зоопарком кто-то кричит: «Алма! Нан!» 🍎👀',s2:'<b>Базар</b>! 🍎 Облако его засыпало, и продавцы забыли все числа. Расчистим? Жми на задания ⚡',ch:3})};
/* новые кварталы без своего прилёта раньше: Кітапхана, Пошта, Автобекет */
var NEWQ=[['kitaphana','garr','Слышишь? 📚 Рядом со школой кто-то шепчет: «Тише, тут читают…» Облако закрыло библиотеку!','<b>Кітапхана</b> — библиотека! 📚 Здесь учимся говорить «где»: үйде, мектепте. Жми на задания ⚡',schoolGo],
 ['poshta','tarr','Слышишь? ✉️ За рельсами кто-то ищет посылку: «Что? Кого?» Облако спрятало почту!','<b>Пошта</b> — почта! ✉️ Здесь учимся говорить «что? кого?». Жми на задания ⚡',vokGo],
 ['avtobeket','xarr','Слышишь? 🚌 Рядом с почтой гудит автобус: «С кем едешь?» Облако закрыло автовокзал!','<b>Автобекет</b> — автовокзал! 🚌 Здесь учимся говорить «с кем? чем?». Жми на задания ⚡',function(){goQ('poshta')}]];
(function(){var _sc=showCity;showCity=function(o){o=o||{};var c=cst();
  for(var i=0;i<NEWQ.length;i++){var n=NEWQ[i];if(qOpen(n[0])&&!c[n[1]]&&!window.NOARRIVE&&!arrivalPending()){c[n[1]]=1;save();var g=o.gain;_sc({});if(document.querySelector('.cityscr'))qArrive(n[0],g,{pre:n[4],s1:n[2],s2:n[3]});return}}
  _sc(o);try{yZoneBtn()}catch(e){}}})();
/* первый вход в новый тест: Айна стоит в своём квартале */
(function(){try{var c=cst();if(!qAt(c.ax||0,c.ay||0)||!qOpen(qAt(c.ax,c.ay))){c.ax=QI.aina.x+520;c.ay=QI.aina.y+640}}catch(e){}})();
ainaFix=function(c){var x=c.ax,y=c.ay;if(!x||!qAt(x,y)||!qOpen(qAt(x,y))){x=QI.aina.x+520;y=QI.aina.y+640}if(!spotOK(x,y)){var s=freeSpot(x,y);x=s.x;y=s.y}c.ax=x;c.ay=y};
})();
/* подключить машины/поезд/лодки к отрисовке (после определения spritesHTML) */
(function(){var _sp=spritesHTML;spritesHTML=function(){var b=_sp();if(window.trainOn&&trainOn())b=b.replace(/<image href="art\/(loco_s|wagon_yellow|wagon_blue|wagon_tail)\.webp\?v=5"[^>]*\/>/g,'');return b+(window.treelineHTML?treelineHTML():'')+(window.carsHTML?carsHTML():'')+(window.trainHTML?trainHTML():'')+(window.boatsHTML?boatsHTML():'')};var st=document.createElement('style');st.textContent='.ccars{display:none!important}';document.head.appendChild(st)})();
