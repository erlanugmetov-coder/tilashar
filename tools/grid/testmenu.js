/* ===================== тест города: кнопка 🧪 — быстро поставить прогресс ===================== */
(function(){
var KEY='__KEY__',SK='tilashar-grid-seed';
var ORDL=[0,1,4,7,5,9,6,8,10,11,2,3,12];
var QARR={yarmarka:'yarr',sayabaq:'parr',uyler:'harr',mektep:'marr',kitaphana:'garr',stadion:'karr',vokzal:'varr',poshta:'tarr',avtobeket:'xarr',zoo:'zarr',bazar:'barr'};
function rg(n){var a=[];for(var i=0;i<n;i++)a.push(i);a.push(n);a.push(n+1);return a}
var k=null;try{k=localStorage.getItem(SK)}catch(e){}
if(k!=null){try{localStorage.removeItem(SK)}catch(e){}k=+k;
  try{Object.keys(st).forEach(function(x){delete st[x]});Object.assign(st,{coins:0,done:[],mute:false,name:'',title:'',m37:1});
    for(var i=0;i<k&&i<ORDL.length;i++){setTheme(ORDL[i]);var d=DN();rg(NL).forEach(function(x){if(d.indexOf(x)<0)d.push(x)})}
    setTheme(ORDL[Math.min(k,ORDL.length-1)]);
    st.name='Ерлан';st.coins=60;st.energy=k?8:1;
    var c=cst();c.done=[];c.gifts=[];c.up={};c.tut=9;c.intro=1;
    CTASK.forEach(function(t){var q=GRIDQ[t.q];if(q&&q.th<=k&&lessonOpen(t))c.done.push(t.id)});
    Object.keys(QARR).forEach(function(q){if(GRIDQ[q].th<=k)c[QARR[q]]=1});
    if(k>=12)['yfest','pfest','hfest','mfest','kfest','vfest','zfest','bfest'].forEach(function(f){c[f]=1});
    var last='aina';Object.keys(GRIDQ).forEach(function(q){if(GRIDQ[q].th<=k&&GRIDQ[q].th>GRIDQ[last].th)last=q});
    var Q=GRIDQ[last];c.ax=Q.x+520;c.ay=Q.y+640;
    for(i=1;i<=13;i++)st['sum'+i]=1;st.fbAsk=2;st.chAsk=2;st.m158=1;var s=SD();s.first='2000-01-01';s.warm=TODAY();
    save()}catch(e){console.log('seed',e)}}
function seed(n){try{if(n<0){localStorage.removeItem(KEY)}else localStorage.setItem(SK,String(n))}catch(e){}location.reload()}
var css=document.createElement('style');
css.textContent='.tmb{position:fixed;left:8px;bottom:96px;z-index:9000;width:40px;height:40px;border-radius:50%;border:0;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.25);font-size:20px}'+
 '.tmp{position:fixed;inset:0;z-index:9001;background:rgba(20,34,44,.5);display:flex;align-items:center;justify-content:center}.tmp div{background:#fffaf0;border-radius:20px;padding:14px;width:min(320px,90vw);font:600 14px Rubik,sans-serif}'+
 '.tmp h3{margin:0 0 8px;font:800 17px Rubik,sans-serif}.tmp p{margin:0 0 10px;color:#5b6b76;font-size:12.5px}.tmp button{display:block;width:100%;margin:6px 0;border:0;border-radius:12px;padding:10px;background:#e9f5dc;font:700 14px Rubik,sans-serif;color:#14222c;text-align:left}.tmp button.x{background:#14222c;color:#fff;text-align:center}';
document.head.appendChild(css);
var b=document.createElement('button');b.className='tmb';b.textContent='🧪';b.setAttribute('aria-label','Тест');
b.addEventListener('click',function(e){e.stopPropagation();var o=document.createElement('div');o.className='tmp';
  o.innerHTML='<div><h3>🧪 Тест города</h3><p>Поставить прогресс и открыть игру заново. Уроки, монеты и задания работают как обычно.</p>'+
   '<button data-k="-1">👶 Новый игрок (с нуля)</button><button data-k="1">✅ Пройдена Тема 1 → прилёт на Ярмарку</button><button data-k="3">✅ Темы 1–3 → прилёт в Үйлер</button>'+
   '<button data-k="7">✅ Темы 1–7 → прилёт на Вокзал</button><button data-k="13">🏙 Всё пройдено и построено</button><button class="x">Закрыть</button></div>';
  o.addEventListener('click',function(ev){var t=ev.target.closest('button');if(!t){if(ev.target===o)o.remove();return}if(t.classList.contains('x')){o.remove();return}seed(+t.dataset.k)});
  document.body.appendChild(o)});
document.body.appendChild(b);
})();
