/* v197: русская озвучка реплик Айны (ТЗ п. 16, этап 1). Спрайт ru1.mp3, карта RUM: ключ → [начало, длина, кусок текста для поиска, текст].
   ruSay(текст) ищет в тексте экрана куски из карты и проигрывает их по очереди; казахские примеры ждут конца (ruAfter).
   🔊 выключает и русскую озвучку. Тап по облачку Айны — повтор. */
var RUM=__RUMAP__,RUBUF=null,RUP=null,RUSRC=[],RUEND=0,RUQ=[],RUT0=0,RUDUR=0;
function ruLeft(){return RUT0?Math.max(0,RUT0+RUDUR*1000+400-Date.now()):0} /* сколько ещё говорит Айна — пауза на чтение ждёт */
function ruNorm(t){var d=document.createElement('div');d.innerHTML=String(t||'');return (d.textContent||'').toLowerCase().replace(/ё/g,'е').match(/[a-zа-яәғқңөұүһі0-9]+/g)||[]}
function ruLoad(){if(RUP)return RUP;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)()}catch(e){return Promise.resolve(null)}
  RUP=fetch('ru1.mp3').then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()}).then(function(b){return new Promise(function(res,rej){AC.decodeAudioData(b,res,rej)})}).then(function(b){RUBUF=b;return b}).catch(function(){RUP=null;return null});return RUP}
function ruFind(t){if(/^@/.test(t))return RUM[t.slice(1)]?[t.slice(1)]:[];var w=' '+ruNorm(t).join(' ')+' ',hit=[];
  Object.keys(RUM).forEach(function(k){if(RUM[k][2].charAt(0)==='@')return;var m=' '+ruNorm(RUM[k][2]).join(' ');var i=w.indexOf(m.trim()?m.trim():'\u0000');if(i>=0)hit.push([i,k])});
  hit.sort(function(a,b){return a[0]-b[0]});return hit.map(function(x){return x[1]})}
function ruStop(){RUSRC.forEach(function(s){try{s.stop()}catch(e){}});RUSRC=[];RUEND=0;RUQ=[];RUT0=0} /* прервали — очередь прошлого облачка не нужна */
function ruBusy(){return RUEND&&AC&&AC.currentTime<RUEND}
function ruAfter(fn){if(!ruBusy()){fn();return}RUQ.push(fn)}
function ruSay(t,done){var ks=ruFind(t);if(!ks.length||st.mute){done&&done();return false}ruStop();RUT0=Date.now();RUDUR=ks.reduce(function(a,k){return a+RUM[k][1]+.25},0);
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume()}catch(e){done&&done();return false}
  RUEND=AC.currentTime+30; /* пока грузится — казахские примеры ждут */
  ruLoad().then(function(buf){if(!buf){ruStop();done&&done();return}var at=AC.currentTime+.05;
    ks.forEach(function(k){var c=RUM[k],s=AC.createBufferSource();s.buffer=buf;s.connect(AC.destination);s.start(at,c[0],c[1]);RUSRC.push(s);at+=c[1]+.25});
    RUEND=at;var my=RUSRC.slice();setTimeout(function(){if(RUSRC.length&&RUSRC[0]===my[0]){RUSRC=[];RUEND=0;var q=RUQ;RUQ=[];q.forEach(function(f){try{f()}catch(e){}})}done&&done()},Math.max(0,(at-AC.currentTime)*1000))});return true}
/* казахская речь важнее: если ребёнок ответил раньше, Айна замолкает по-русски */
(function(){var _sy=say;say=function(t,d){if(ruBusy()&&canSay(t))ruStop();return _sy.apply(this,arguments)}})();
/* вступление */
(function(){if(typeof introShow!=='function')return;var _is=introShow;introShow=function(){_is.apply(this,arguments);try{var b=document.querySelector('#cintro .ibub');if(b){b.dataset.ru=b.innerHTML;ruSay(b.innerHTML)}}catch(e){}}})();
/* реплики Айны в городе */
(function(){if(typeof ainaSay!=='function')return;var _as=ainaSay;ainaSay=function(h){var r=_as.apply(this,arguments);try{if(ruFind(h).length)ruSay(h)}catch(e){}return r}})();
/* финал урока: конец урока + обещание */
(function(){if(typeof finish!=='function')return;var _f=finish;finish=function(){var r=_f.apply(this,arguments);try{var f=document.querySelector('#ctl .final');if(f){var h=[].map.call(f.querySelectorAll('.endsay'),function(e){return e.innerHTML}).join(' ');if(h){f.dataset.ru=h;setTimeout(function(){ruSay(h)},700)}}}catch(e){}return r}})();
/* экран тетриса: «Сәлем! Сегодня — тема …» */
(function(){if(typeof tetFrame!=='function')return;var _tf=tetFrame;tetFrame=function(T){var r=_tf.apply(this,arguments);try{var k='@w'+(T.n-1);setTimeout(function(){var o=document.getElementById('tetov');if(o)ruSay(k)},1100)}catch(e){}return r}})();
/* тетрис закрылся или урок ушёл дальше — русская реплика не мешает */
(function(){var _td=window.tetDone;if(typeof _td==='function')window.tetDone=function(){ruStop();return _td.apply(this,arguments)}})();
/* тап по облачку — повтор */
document.addEventListener('click',function(e){try{var b=e.target.closest('.bubble[data-ru],#cintro .ibub[data-ru],.final[data-ru]');if(!b||b.querySelector('.cur'))return;if(e.target.closest('button,[data-say],[data-auto],.lego,.kk'))return;ruSay(b.dataset.ru)}catch(_){}},true);
