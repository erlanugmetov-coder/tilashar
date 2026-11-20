THM[8]={h:'Тема 7 · Связи — чей? что? с кем?',ok:'Тема пройдена! Сцепки вернулись — слова снова держатся вместе. 🚂',todo:'Облако стёрло сцепки: чемоданы без хозяев, поезд разъехался. Верни падежи связи — и получи ⚡ для района Вокзал.',boss:'Проверка: чей, что и с кем.',
 win:'Вокзал ожил! 🎉',winp:'Чемоданы нашли хозяев, поезд сцеплен! А ты, %T%, — главный сцепщик вокзала! 🚂',papa:'Спросите ребёнка: «Бұл кімнің?», «Кіммен барасың?» — пусть ответит по-казахски.'};
THEMES[8]=['Связи — чей? что? с кем?','Айнаның досы · кітапты · доспен','Вокзал'];
/* порядок: Связи — седьмая, Зоопарк и Базар сдвигаются на 8 и 9 */
THM[2].h='Тема 8 · Көп — много';THM[3].h='Тема 9 · Сандар — числа';
(function(){
  var _st=setTheme;setTheme=function(n){if(!TL||TL.length<8)_st(7);if(TL.length<9)TL.push(LESSONS9);_st(n)};
  var _dn=DN;DN=function(){if(THX===8){st.d9=st.d9||[];return st.d9}return _dn()};
  var _ad=anyDone;anyDone=function(){return _ad()||(st.d9||[]).length>0};
  doneList=function(th){var sv=THX;setTheme(th);var n=NL,src=[st.done,st.d2,st.d3,st.d4,st.d5,st.d6,st.d7,st.d8,st.d9][th]||[];setTheme(sv);return src.filter(function(k){return k>=0&&k<n})};
  var _to=themeOpen;themeOpen=function(i){var s=themeState(i);if(i===8&&s!=='lock'){setTheme(8);map();return}_to(i)};
})();
lessonGain=function(th,k){var f=['cl','lv','zl','bl','pl','ml','kl','hl','vl'][th]||'cl',g=0;CTASK.forEach(function(t){if(t[f]===k||(k===0&&t[f]===-1))g+=t.cost||0});if(th===0&&k===0)g-=1;return Math.max(1,g)};
ORD=[0,1,4,7,5,6,8,2,3];
thStarted=function(i){return ([st.done,st.d2,st.d3,st.d4,st.d5,st.d6,st.d7,st.d8,st.d9][i]||[]).length>0};
themeState=function(i){if(i>=9)return themeDone(ORD[ORD.length-1])?'next':'lock';if(themeDone(i))return 'done';var p=ORD.indexOf(i);if(p<=0)return 'open';return (themeDone(ORD[p-1])||thStarted(i))?'open':'lock'};
zArea=function(){return (st.d3||[]).indexOf(0)>=0||themeDone(8)};
/* ---------- район «Вокзал» — справа внизу, под улицей Үйлер ---------- */
var VX=2180,VTOP=2380;
function d9(){return st.d9||[]}
function vDone(k){return d9().indexOf(k)>=0}
function vArea(){return d9().indexOf(0)>=0||themeDone(6)}
CTASK.push(
 {id:'vclear',name:'Расчистить перрон',cost:2,x:2280,y:2470,b:'vclear',vl:-1,coins:5},
 {id:'vrail',name:'Проложить рельсы',cost:3,x:2580,y:2500,b:'vrail',vl:-1},
 {id:'vkassa',name:'Касса вокзала',cost:4,x:2340,y:2700,b:'vkassa',vl:0},
 {id:'vbags',name:'Камера для чемоданов',cost:4,x:2640,y:2700,b:'vbags',vl:0},
 {id:'vlamp',name:'Фонари на перроне',cost:3,x:2880,y:2710,b:'vlamp',vl:1},
 {id:'vclock',name:'Часы вокзала',cost:4,x:2360,y:2930,b:'vclock',vl:1},
 {id:'vcafe',name:'Кафе вокзала',cost:4,x:2650,y:2940,b:'vcafe',vl:2},
 {id:'vwait',name:'Зал ожидания',cost:4,x:2890,y:2950,b:'vwait',vl:2},
 {id:'vtrain',name:'Поезд',cost:4,x:2420,y:3170,b:'vtrain',vl:3},
 {id:'vbus',name:'Автобус',cost:3,x:2760,y:3170,b:'vbus',vl:3},
 {id:'vbench',name:'Скамейки и табло',cost:3,x:2900,y:3360,b:'vbench',vl:4}
);
Object.assign(OBOX,{vclear:[50,50,20,20],vrail:[160,160,20,15],vkassa:[85,85,140,15],vbags:[70,70,70,15],vlamp:[90,90,110,10],vclock:[40,40,130,10],vcafe:[85,85,140,15],vwait:[85,85,140,15],vtrain:[150,150,80,15],vbus:[80,80,70,15],vbench:[80,80,40,15]});
Object.assign(RESULT,{vclear:'Перрон чистый! 🧹',vrail:'Рельсы на месте! 🛤️',vkassa:'Касса открыта! Бұл кімнің? 🎫',vbags:'Чемоданы нашли хозяев! Айнаның чемоданы 🧳',vlamp:'Фонари на перроне! 💡',vclock:'Часы пошли! 🕰️',vcafe:'Кафе! Мен нанды жеймін ☕',vwait:'Зал ожидания! 🪑',vtrain:'Поезд сцеплен! 🚂🔗',vbus:'Автобус приехал! Автобуспен! 🚌',vbench:'Скамейки и табло! 🪑'});
Object.assign(CMAN,{
 vkassa:{nm:'Кассир',th:9,girl:1,lines:[['Сәлем!','привет',-1],['Бұл кімнің?','чьё это?',0]],shirt:'#2f6fd6',dx:110,dy:20,v:'w'},
 vbags:{nm:'Арман',th:9,hat:'cap',lines:[['Сәлем!','привет',-1],['Айнаның досы!','друг Айны!',0]],shirt:'#ff8a3d',dx:-100,dy:20,v:'kb'},
 vcafe:{nm:'Аспаз',th:9,lines:[['Сәлем, балам!','привет, балам — так ласково говорят детям',-1],['Мен нанды жеймін','я ем хлеб',2]],shirt:'#e2574c',dx:-100,dy:20,v:'m'},
 vtrain:{nm:'Дана',th:9,girl:1,hat:'bow',lines:[['Сәлем!','привет',-1],['Мен әжемен барамын!','я еду с бабушкой',3]],shirt:'#8e5bd6',dx:-120,dy:20,v:'kg'},
 vbench:{nm:'Ата',th:9,hat:'taqiya',lines:[['Сәлем, балам!','привет, балам — так ласково говорят детям',-1],['Кімді күтесің?','кого ждёшь?',4]],shirt:'#a0703c',dx:-110,dy:10,v:'a'}
});
(function(){var _r=rlines;rlines=function(m){if(m.th===9)return m.lines.filter(function(l){return l[2]<0||vDone(l[2])});return _r(m)}})();
(function(){var _lo=lessonOpen;lessonOpen=function(t){if(t.vl!=null)return vArea()&&(t.vl<0||vDone(t.vl));return _lo(t)}})();
(function(){var _cn=cNextLv;cNextLv=function(f){if(f==='vl'&&!vArea())return null;return _cn(f)}})();
(function(){var _lt=lockTitle;lockTitle=function(f,k){if(f==='vl'){var tt=LESSONS9[k]?LESSONS9[k].title:'следующий урок';return tt.split(' — ')[0]}return _lt(f,k)}})();
(function(){var _cr=crevealPts;crevealPts=function(){var p=_cr();if(vArea()){p.push({x:2300,y:2480,r:240});CTASK.forEach(function(t){if(t.vl!=null)p.push({x:t.x,y:t.y,r:170})})}
  if(cst().vfest)[[2300,2550],[2600,2550],[2880,2550],[2350,2850],[2650,2850],[2880,2850],[2420,3150],[2760,3150],[2900,3330]].forEach(function(q){p.push({x:q[0],y:q[1],r:300})});return p}})();
(function(){var _b=bubblesHTML;bubblesHTML=function(){var h=_b(),n=cNextLv('vl');if(n==null)return h;CTASK.forEach(function(t){if(t.vl!==n||cdone(t.id)||!cvisible(t.x,t.y,40))return;
  h+='<button class="cbub lock" data-a="ctask" data-v="'+t.id+'" style="left:'+t.x+'px;top:'+(t.y-48)+'px">🔒 Урок '+(n+1)+'<small>'+t.name+'</small></button>'});return h}})();
(function(){var _dt=doTask;doTask=function(id){var t=CTASK.filter(function(x){return x.id===id})[0];if(t&&t.vl!=null&&!cdone(id)&&!lessonOpen(t)){lockCard(t,'vl');return}_dt(id)}})();
function vTasks(){return CTASK.filter(function(t){return t.vl!=null})}
function vAllDone(){return vTasks().every(function(t){return cdone(t.id)})}
(function(){var _d=cityDoneMsg;cityDoneMsg=function(){
   if(vArea()){if(vAllDone()&&!zArea())return 'Вокзал готов! 🎉 Скоро откроем следующий район — Зоопарк.';if(!anyAvail()){var m=waitMsgFor('vl');if(m)return m}}
   else if(typeof kArea==='function'&&kArea()&&typeof kAllDone==='function'&&kAllDone())return 'Район Стадион готов! 🎉 Скоро откроем следующий район — Вокзал.';
   return _d()};
 var _h=cityHint;cityHint=function(){if(vArea()&&!anyAvail()){var m=waitMsgFor('vl');if(m)return m}return _h()}})();
BGTREES.push([2230,2400,1],[2960,2420,2],[2230,3420,0],[2960,3460,3],[2600,3420,2]);
function vrailf(x,y){var s='';[-10,10].forEach(function(d){s+='<rect x="'+(x-180)+'" y="'+(y+d-3)+'" width="360" height="6" rx="3" fill="#7d8b93"/>'});for(var i=-170;i<=170;i+=30)s+='<rect x="'+(x+i-4)+'" y="'+(y-16)+'" width="8" height="32" rx="2" fill="#8a5a2b"/>';return s}
function vbagsf(x,y){var s=sh(x,y+6,64,9),c=['#e2574c','#2f6fd6','#ffd200','#3fae4a','#8e5bd6'];[[-44,0,34,40],[-6,0,30,48],[30,0,36,36],[-26,-40,30,30],[12,-44,28,34]].forEach(function(b,i){s+='<rect x="'+(x+b[0])+'" y="'+(y+b[1]-b[3])+'" width="'+b[2]+'" height="'+b[3]+'" rx="6" fill="'+c[i]+'" stroke="#14222c" stroke-opacity=".25" stroke-width="2"/><rect x="'+(x+b[0]+b[2]/2-6)+'" y="'+(y+b[1]-b[3]-6)+'" width="12" height="7" rx="3" fill="none" stroke="#5d6d74" stroke-width="3"/>'});return s}
function vclockf(x,y){return sh(x,y+4,26,6)+'<rect x="'+(x-5)+'" y="'+(y-110)+'" width="10" height="114" fill="#5d6d74"/><circle cx="'+x+'" cy="'+(y-124)+'" r="26" fill="#fff" stroke="#14222c" stroke-width="4"/><path d="M'+x+' '+(y-124)+' v-16 M'+x+' '+(y-124)+' h12" stroke="#14222c" stroke-width="4" stroke-linecap="round"/>'}
function vtrainf(x,y){var s=sh(x,y+8,150,12);[[-140,'#e2574c'],[-48,'#2f6fd6'],[44,'#3fae4a']].forEach(function(c,i){s+='<rect x="'+(x+c[0])+'" y="'+(y-70)+'" width="'+(i===0?96:86)+'" height="66" rx="10" fill="'+c[1]+'"/><rect x="'+(x+c[0]+12)+'" y="'+(y-60)+'" width="24" height="20" rx="4" fill="#e8f4f1"/><rect x="'+(x+c[0]+44)+'" y="'+(y-60)+'" width="24" height="20" rx="4" fill="#e8f4f1"/><circle cx="'+(x+c[0]+20)+'" cy="'+(y)+'" r="10" fill="#14222c"/><circle cx="'+(x+c[0]+66)+'" cy="'+(y)+'" r="10" fill="#14222c"/>'});
  s+='<rect x="'+(x-146)+'" y="'+(y-96)+'" width="30" height="30" rx="4" fill="#5d6d74"/><rect x="'+(x-50)+'" y="'+(y-40)+'" width="6" height="8" fill="#ffd200"/><rect x="'+(x+38)+'" y="'+(y-40)+'" width="10" height="8" fill="#ffd200"/>';return s}
function vbusf(x,y){return sh(x,y+8,80,10)+'<rect x="'+(x-80)+'" y="'+(y-62)+'" width="160" height="58" rx="12" fill="#ffd200"/><rect x="'+(x-68)+'" y="'+(y-52)+'" width="110" height="22" rx="5" fill="#e8f4f1"/><rect x="'+(x+50)+'" y="'+(y-52)+'" width="22" height="40" rx="4" fill="#e8f4f1"/><circle cx="'+(x-48)+'" cy="'+(y-2)+'" r="11" fill="#14222c"/><circle cx="'+(x+48)+'" cy="'+(y-2)+'" r="11" fill="#14222c"/>'}
function vboardf(x,y){return '<rect x="'+(x-4)+'" y="'+(y-120)+'" width="8" height="120" fill="#5d6d74"/><rect x="'+(x-60)+'" y="'+(y-150)+'" width="120" height="42" rx="6" fill="#14222c"/><text x="'+x+'" y="'+(y-123)+'" text-anchor="middle" font-size="18" font-weight="800" fill="#ffd200" font-family="Rubik,Arial">🚂 12:30</text>'}
(function(){var _vb=vbuild;vbuild=function(t){var x=t.x,y=t.y;switch(t.b){
  case 'vclear':return vbush(x-34,y+8,'#3fae4a')+vbush(x+36,y+4,'#ffd76a');case 'vrail':return vrailf(x,y);
  case 'vkassa':return vhouse(x-85,y-70,170,130,'#8ec5f0','#2f78c9',{rh:46,rows:2,cols:3})+'<rect x="'+(x-30)+'" y="'+(y+18)+'" width="60" height="26" rx="4" fill="#ffd200"/>';
  case 'vbags':return vbagsf(x,y);case 'vlamp':return hlampf(x,y);case 'vclock':return vclockf(x,y);
  case 'vcafe':return vhouse(x-85,y-70,170,130,'#ffb26b','#d96a1f',{rh:46,rows:2,cols:3})+'<rect x="'+(x-14)+'" y="'+(y+22)+'" width="28" height="38" rx="4" fill="#8a5a2b"/>';
  case 'vwait':return vhouse(x-85,y-70,170,130,'#c9b6f0','#7a5af5',{rh:46,rows:2,cols:3})+'<rect x="'+(x-14)+'" y="'+(y+22)+'" width="28" height="38" rx="4" fill="#8a5a2b"/>';
  case 'vtrain':return vtrainf(x,y);case 'vbus':return vbusf(x,y);case 'vbench':return vbench(x-50,y)+vbench(x+50,y)+vboardf(x+120,y)}return _vb(t)};
 var _vf=vbefore;vbefore=function(t){var x=t.x,y=t.y;switch(t.b){
  case 'vclear':return vdebris(x-24,y)+vdebris(x+26,y+6);case 'vrail':return vweeds(x-150,y-30,300,50);
  case 'vkassa':case 'vbags':case 'vlamp':case 'vclock':case 'vcafe':case 'vwait':case 'vtrain':case 'vbus':case 'vbench':return vweeds(x-75,y-60,150,80)}return _vf(t)};
})();
function inVok(){var c=cst();return (c.ax||0)>VX&&(c.ay||0)>VTOP}
function vokGo(){var c=cst(),s=freeSpot(2300,2560);c.ax=s.x;c.ay=s.y;save()}
(function(){['inPark','inYarm','inZoo','inSchool','inShop','inHome'].forEach(function(n){if(typeof window[n]==='function'){var f=window[n];window[n]=function(){return !inVok()&&f.apply(this,arguments)}}});
  if(typeof inBaz==='function'){var _ib=inBaz;inBaz=function(){return !inVok()&&_ib()}}
  var _zn=zoneName;zoneName=function(){return inVok()?'Вокзал':_zn()}})();
(function(){var _nz=nbZone;nbZone=function(){try{if(inVok())return [8,'vl','🚂']}catch(e){}return _nz()};var _nc=nbZonesCount;nbZonesCount=function(){var n=_nc();try{if(vArea())n++}catch(e){}return n}})();
function vFest(){var c=cst(),w=document.getElementById('cworld');if(!w)return;c.vfest=1;save();CBUSY=true;YARRIVING=1;camTo(2600,2850,1200);
  setTimeout(function(){cityRender();updateClouds(true);sWinBig();yBalloons(w);[[2340,2700],[2640,2700],[2650,2940],[2420,3170],[2900,3360]].forEach(function(p,i){setTimeout(function(){fxBurst(p[0],p[1],16,pick(['🎆','🎇','✨','🎉']))},i*350)});
    ainaMood('laugh');ainaSay('<b>Вокзал ашылды!</b> 🎉 Чемоданы нашли хозяев, поезд сцеплен: Айнаның досы, кітапты оқимын, доспен барамын! 🚂',8000)},1300);setTimeout(function(){CBUSY=false;YARRIVING=0},9000)}
(function(){var _dt=doTask;doTask=function(id){var t=CTASK.filter(function(x){return x.id===id})[0];_dt(id);if(t&&t.vl!=null)setTimeout(function(){if(cdone(id)&&vAllDone()&&!cst().vfest)vFest()},3600)}})();
function vokArrive(g){var w=document.getElementById('cworld');if(!w)return;CBUSY=true;YARRIVING=1;
  var cov=document.createElement('div');cov.className='ycov';var h='';[[2280,2470],[2500,2470],[2720,2470],[2930,2480],[2320,2700],[2560,2700],[2800,2700],[2330,2940],[2580,2940],[2830,2950],[2380,3170],[2630,3170],[2880,3180],[2880,3360]].forEach(function(p,i){h+='<i class="'+(p[0]<2600?'l':'r')+'" style="left:'+(p[0]-120)+'px;top:'+(p[1]-90)+'px;animation-delay:'+(i%5)*.05+'s"></i>'});
  cov.innerHTML=h;w.appendChild(cov);var c0=cst(),a0=document.getElementById('caina');if(a0){a0.style.left=c0.ax+'px';a0.style.top=c0.ay+'px';a0.style.zIndex=Math.round(c0.ay)}camTo(c0.ax,c0.ay-60,600);
  setTimeout(function(){ainaMood('wow');ainaSay('🚂 Слышишь? Ту-тууу! Это вокзал. Только поезд стоит: облако стёрло сцепки между вагонами. И между словами тоже!',3200)},500);
  setTimeout(function(){camTo(2550,2600,1900)},2700);
  setTimeout(function(){sWhoosh();cov.classList.add('part');setTimeout(function(){cov.remove()},1500)},4700);
  setTimeout(function(){vokGo();var c=cst(),a=document.getElementById('caina');if(a){a.style.left=c.ax+'px';a.style.top=c.ay+'px';a.style.zIndex=Math.round(c.ay)}
    sWinBig();yBalloons(w);fxBurst(2300,2480,18,'🎉');fxBurst(c.ax,c.ay-30,10,'✨');if(g)fxText(c.ax,c.ay-90,'+'+g+' ⚡');var zb=document.querySelector('.czone');if(zb)zb.remove();yZoneBtn();nbProgRefresh()},5300);
  setTimeout(function(){ainaMood('laugh');ainaSay('<b>Вокзал</b>! 🚂 Чемоданы без хозяев, никто не знает, чьё что… Поможешь сцепить? Жми на задания ⚡',7000)},6200);
  setTimeout(function(){CBUSY=false;YARRIVING=0;try{nextTarget()}catch(e){}chapterCard(8)},9400)}
(function(){var _sc=showCity;showCity=function(o){o=o||{};var c=cst(),first=vArea()&&!c.varr&&!window.NOARRIVE;
  if(first){c.varr=1;save();var g=o.gain;_sc({});if(document.querySelector('.cityscr'))vokArrive(g);return}
  if(vArea()&&o.gain&&THX===8)vokGo();_sc(o)}})();
CHTXT[8]=['🚂','Облако стёрло сцепки — чемоданы без хозяев, поезд разъехался! Вернём падежи связи: Айнаның досы, кітапты оқимын, доспен.','Сначала расчисти перрон и проложи рельсы, а потом — урок!'];
(function(){var _ap=arrivalPending;arrivalPending=function(){return _ap()||(vArea()&&!cst().varr)};
 var _h=homeAfterParty;homeAfterParty=function(){if(!document.querySelector('.cityscr')||CBUSY)return;if(arrivalPending()){showCity({});return}
  if(curTheme()===8&&vArea()&&!inVok()){vokGo();ainaSay('Бежим на вокзал! 🚂',3000);var c=cst(),a=document.getElementById('caina');if(a){a.style.left=c.ax+'px';a.style.top=c.ay+'px';a.style.zIndex=Math.round(c.ay)}camTo(c.ax,c.ay-60,1500);
   var zb=document.querySelector('.czone');if(zb){zb.remove();yZoneBtn()}var n=document.querySelector('.cname');if(n)n.textContent=(st.city_name||'Мой город')+' · Вокзал';nbProgRefresh();return}_h()}})();
(function(){var _ts=themesScreen;themesScreen=function(){_ts.apply(this,arguments);try{var n=document.querySelector('.note');if(n)n.textContent='Готовы Темы 1–9. Следующие Айна ещё готовит.'}catch(e){}}})();
