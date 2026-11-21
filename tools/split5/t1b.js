/* ===================== v198: Тема 1 «Кто я» (7 → 5 уроков) и Тема 12 «Базар» (6 → 5, начинается с «сколько мне лет») — стандарт 5 + Живые + Проверка (решение Ерлана 21.11) =====================
   Новые уроки собраны из старых: экраны и задания те же, только порядок и выбор. Старые массивы — в window.T1B_OLD0 / T1B_OLD3 (их правит tz6.js). */
(function(){
 var R=function(n){var a=[];for(var i=0;i<=n;i++)a.push(i);return a};
 var mk=function(o,src){var L={title:o.title,sub:o.sub,end:o.end,papa:o.papa,intro:[],mix:function(){var out=[];src().forEach(function(x){if(x)out.push(x)});return out}};L.steps=L.intro;return L};
 /* ---------- ТЕМА 1 (слот 0) ---------- */
 var A=TL[0],O1=A.slice();window.T1B_OLD0=O1;
 var a0=O1[0],a1=O1[1],a3=O1[3],a4=O1[4];
 var m0=mk({title:'Мен …мын — я и моё имя',sub:'Знакомимся · хвостик «это я»',end:a0.end,papa:a0.papa},function(){var X=a0.mix.call(a0),Y=a1.mix.call(a1);
   return [X[0],X[1],X[2],X[3],X[6], Y[1],Y[2],Y[3],Y[4],Y[6],Y[7],Y[8], X[5]]});
 var m2=mk({title:'Сен кімсің? · Сіз — вежливо',sub:'ты и вы: -сың / -сыз',end:a4.end,papa:a3.papa},function(){var S=a3.mix.call(a3),Z=a4.mix.call(a4);
   return [S[0],S[1],S[2],S[3],S[4],S[5], Z[0],Z[1],Z[2],Z[3],Z[4],Z[6],Z[8]]});
 A.splice(0,A.length,m0,O1[2],m2,O1[5],O1[6],O1[7],O1[8]);
 /* ---------- ТЕМА 12 «Базар» (слот 3) ---------- */
 var B=TL[3],O3=B.slice();window.T1B_OLD3=O3;
 var b0=O3[0],b1=O3[1],b4=O3[4],b5=O3[5];
 var ageScr={s:'wink',t:'<p>А теперь — про тебя! Возраст: число + <b>жаста</b> + наш хвостик «кто»:</p>'+exk('Мен бес жаста<b>мын</b>','мне 5 лет','Мен бес жастамын')+'<p><b>жаста</b> — «в возрасте», от <b>жас</b> — молодой 😉</p>'};
 var ageTail={task:'tail',p:'men',mid:'төрт',r:'жаста',ru:'мне 4 года',model:'Мен бес '+lego('жаста','мын')+' — мне 5 лет',why:'Как в образце: <b>Мен төрт жастамын</b>. Число меняется, хвостик — тот же.'};
 var n0=mk({title:'Мен бес жастамын — сколько мне лет?',sub:'числа 1–5 и возраст',end:b0.end,papa:b0.papa},function(){var X=b0.mix.call(b0);
   return [X[0],X[1],X[2],X[3],X[4],X[5],X[6],X[7],X[8], ageScr, ageTail]});
 var n1=mk({title:'Сен неше жастасың? — сколько тебе лет?',sub:'числа 6–10 · Сен и Сіз',end:b4.end,papa:b4.papa},function(){var X=b1.mix.call(b1),Y=b4.mix.call(b4);
   return [X[1],X[2],X[4],X[5], Y[0],Y[1],Y[2],Y[3],Y[4],Y[5], X[6], Y[6],Y[8]]});
 b5.title='Біз төртеуміз — сколько нас?';
 B.splice(0,B.length,n0,n1,b5,O3[2],O3[3],O3[6],O3[7]);
 /* ---------- постройки: номера уроков ---------- */
 var CM={'-1':-1,0:0,1:0,2:1,3:2,4:2,5:3,6:4,7:5,8:6},BM={0:0,1:1,2:3,3:4,4:1,5:2,6:5,7:6};
 CTASK.forEach(function(t){if(t.cl!=null&&CM[t.cl]!=null)t.cl=CM[t.cl];if(t.bl!=null&&BM[t.bl]!=null)t.bl=BM[t.bl]});
 /* ---------- перенос прогресса ---------- */
 if(!st.m198){
  var mp=function(o,map,fullK){if(!o||!o.length)return o;if(fullK.some(function(k){return o.indexOf(k)>=0}))return R(8);var a=[];o.forEach(function(k){(map[k]||[]).forEach(function(v){if(a.indexOf(v)<0)a.push(v)})});return a};
  st.done=mp(st.done,{0:[0],1:[0],2:[1],3:[2],4:[2],5:[3],6:[4],7:[5]},[8,10]);
  st.d4=mp(st.d4,{0:[0],1:[1],2:[3],3:[4],4:[1],5:[2],6:[5]},[7,9]);
  if(st.cur&&(st.cur.th===0||st.cur.th===3))st.cur=null;try{var d=SD();d.errs=(d.errs||[]).filter(function(e){return e.th!==0&&e.th!==3})}catch(e){}
  st.m198=1;save()}
})();
