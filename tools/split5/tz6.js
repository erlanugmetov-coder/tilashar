/* v196: ТЗ пункты 6–12, 14 — короче вступления уроков. Задания не меняются (кроме порядка, где сказано в ТЗ).
   tzRe(урок, {номер экрана: новый экран | null — убрать}, после) — берём старый mix, заменяем/убираем экраны. */
(function(){
function exOf(t){var i=t.indexOf('<div class="ex"');return i<0?'':t.slice(i)}
function tzRe(L,map,post){if(!L||!L.mix||L._tz)return;L._tz=1;var old=L.mix,I0=L.intro.slice();
  L.mix=function(){var r=old.call({intro:I0}),out=[];r.forEach(function(x){var i=I0.indexOf(x);if(i<0){out.push(x);return}if(!(i in map))out.push(x);else if(map[i])out.push(map[i])});return post?post(out):out}}
function findTask(a,f){for(var i=0;i<a.length;i++)if(a[i]&&a[i].task&&f(a[i]))return i;return -1}
try{
/* 6. Парк, урок 1 «Мен барамын»: 7 экранов до задания → 2 */
var P=TL[4][0],PI=P.intro;
tzRe(P,{0:{s:'dizzy',t:'<p>Ой… облако забвения добралось до парка! ☁️ Все замерли, как статуи 🗿 — оно стёрло слова «делать». Мен… тұр… Ой, не могу встать! 😅</p>'},1:null,2:null,3:null,
  4:{s:'happy',t:'<p>Помнишь хвостик -мын? Он умеет ещё и <b>делать</b>! 💪 Только нужен соединитель — как переходник для зарядки 🔌:</p>'+exOf(PI[4].t)},5:null,6:null,
  7:{s:'look',t:'<p>Заметил? Слово мягкое — соединитель <b>е</b>, хвостик розовый:</p>'+exOf(PI[7].t)},
  8:{s:'wow',t:'<p>А про друга -мын → -сың, соединитель остаётся:</p>'+exOf(PI[8].t)+'<p>Подожди меня! 🏃‍♀️💨</p>'},9:null},
  function(a){var j=findTask(a,function(x){return x.say==='Мен тұрамын'});if(j>=0)a[j]=Object.assign({},a[j],{yes:'<b>Мен тұрамын</b> — тұр + а + мын. Встаю… медленно. Очень медленно 🐢😴'});return a});

/* 8. Зоопарк, урок 1 «Аюлар»: 5 экранов → 1 (+1 задание) */
var Z=TL[2][0],ZI=Z.intro;
tzRe(Z,{0:{s:'dizzy',t:'<p>Облако стёрло у меня слово «много» 😱 Вижу одного медведя… а их много! Один — <b>аю</b>, много — <b>аю + лар</b> 🐻🐻🐻</p>'+exOf(ZI[2].t)},1:null,2:null,
  3:{s:'look',t:'<p>В русском слово меняется: яблоко → яблоки. А в казахском слово целое — просто цепляем деталь «много» 🧱</p>'},
  4:null,5:{s:'laugh',t:'<p>Ежи — <b>кірпілер</b> 🦔 Хотела погладить — теперь знаю, почему колючки 😅 Мягкое слово → розовый <b>-лер</b>:</p>'+exOf(ZI[4].t)}},
  function(a){var ip=findTask(a,function(x){return x.task==='pairs'});if(ip>0){var pr=a.splice(ip,1)[0];a.splice(1,0,pr)} /* пары — сразу после первого экрана */
    var ie=findTask(a,function(x){return x.task!=='pairs'});var extra=null;try{extra=p3End(p3V('қасқыр'),0)}catch(e){}
    if(extra){var ic=-1;for(var i=0;i<a.length;i++)if(a[i]&&!a[i].task&&/кірпілер/.test(a[i].t||''))ic=i;if(ic>0)a.splice(ic,0,extra)}return a});

/* 7. Зоопарк, урок 5 «Біз аюлармыз»: 6 экранов → 1 */
var Z5=TL[2][4],Z5I=Z5.intro;
tzRe(Z5,{0:{s:'wow',t:'<p>В зоопарке праздник масок! 🎭 Ко мне идут медведи и рычат: «<b>Біз аюлармыз!</b>» — «Мы медведи!» Два хвостика подряд: <b>лар</b> — много, <b>мыз</b> — это мы.</p>'+exOf(Z5I[2].t)+exOf(Z5I[3].t)},1:null,2:null,3:null,4:null,
  5:{s:'look',t:Z5I[5].t.replace('<p>Вся семья — на одном слове:</p>','<p>Мен аюмын?! Нет-нет, я Айна! 😅 Вся семья — на одном слове:</p>')}},
  function(a){var it=findTask(a,function(x){return x.say==='Біз жолбарыстармыз'});if(it>1){var t=a.splice(it,1)[0];a.splice(1,0,t)}return a}); /* «Мы тигры» — сразу после первого экрана */

/* 9. Какой я, урок 1 «Мен ақылдымын»: 4 экрана → 2 */
var K=TL[1][0],KI=K.intro;
tzRe(K,{0:{s:'wow',t:'<p>Мы вспомнили, <b>КТО</b> ты. Теперь — <b>КАКОЙ</b> ты. Спойлер: крутой 😏 Облако стёрло слова-признаки — поможешь?</p>'},1:null,
  2:{s:'happy',t:'<p>Хвостик тот же, что в «кто я»! 🪞</p>'+exOf(KI[2].t)+exOf(KI[3].t)},3:null,
  4:{s:'wink',t:'<p>Слово мягкое → мягкий хвостик, тоже знакомый:</p>'+exP('Мен','күшті','мін','Мен күштімін — я сильный / сильная 💪')}});

/* 10. Куда?, урок 1 «Үйге барамын»: 4 экрана → 1 */
var U=TL[5][0],UI=U.intro;
tzRe(U,{0:{s:'dizzy',t:'<p>Мен барамын! Иду, иду… Стоп, а <b>куда</b>? 🤔 Нужна стрелка ➡️ — хвостик «куда»:</p>'+exOf(UI[2].t)},1:null,2:null,3:null,
  4:{s:'laugh',t:'<p><span class="kk" data-say="Мен далаға барамын">Мен дала<b>ға</b> барамын</span> — я иду на улицу. Мама сразу: «А шапка?» 🧢😅 А тебя спросят: <span class="kk" data-say="Қайда барасың?">Қайда барасың?</span> — Куда идёшь? 🗺️</p>'},5:null},
  function(a){var j=findTask(a,function(x){return x.say==='Мен қалаға барамын'});if(j>=0)a[j]=Object.assign({},a[j],{yes:'<b>қалаға</b> — қала твёрдое → -ға. Твёрдое → -ға, мягкое → -ге — совсем как -мын / -мін! 😎'});return a});

/* 11. Где?, урок 5 «Куда или где?»: 4 экрана → 1 */
var G=TL[9][4],GI=G.intro;
tzRe(G,{0:{s:'laugh',t:'<p>Я перепутала! Сказала: «Мен мектеп<b>те</b> барамын». Учитель: «Ты ходишь кругами по коридору?» 🔄😂 Секрет: хвостик места всё рассказывает 👀</p>'+exOf(GI[2].t)},1:null,2:null,3:null});

/* 12. Плотные экраны (Базар) — короче, без новых экранов */
var B4=TL[3][4];if(B4&&B4.intro[1])B4.intro[1]={s:B4.intro[1].s,t:'<p>Отвечаем так:</p>'+exOf(B4.intro[1].t).replace(/<p>[\s\S]*$/,'')+'<p><b>жаста</b> — «в возрасте», от <b>жас</b> (молодой — у кого мало лет 😉). А дальше — наш хвостик «кто»! 👋</p>'};
var B5=TL[3][5];if(B5&&B5.intro[1])B5.intro[1]={s:B5.intro[1].s,t:B5.intro[1].t.replace('<p>Вас двое — это уже команда. Вас семеро — это уже очередь в столовую. 😅</p>','<p>Семеро — это уже очередь в столовую 😅</p>')};
var S6=TL[0][6];if(S6&&S6.intro[1])S6.intro[1]={s:S6.intro[1].s,t:S6.intro[1].t.replace('<b>Сіздер</b> — вы (вежливо), когда взрослых несколько. Хвостик — как вежливый <b>-сыз</b>, только длиннее: <b>-сыздар / -сіздер</b>.','<b>Сіздер</b> — вежливо, когда взрослых несколько: <b>-сыздар / -сіздер</b>.')};
}catch(e){try{console.log('tz6',e)}catch(_){}}

/* 14. Обучение: касание закрытой постройки — сразу к уроку, без окна «Скоро откроется» */
['showNeed','yLockCard','zLockCard','lockCard'].forEach(function(n){try{var f=window[n];if(typeof f!=='function')return;var w=function(){var r=f.apply(this,arguments);try{if(tutOn()){var g=document.querySelector('#cneed .cgo');if(g)setTimeout(function(){var o=document.getElementById('cneed');if(o&&o.contains(g))g.click()},30)}}catch(e){}return r};window[n]=w;eval(n+'=w')}catch(e){}});
})();
