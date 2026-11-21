#!/usr/bin/env python3
"""Мягкий тетрис-разминка для встраивания в игру (iframe srcdoc).
Собирается из tools/demo-konec-temy/src.html: python3 build_warm.py out.html
Данные берёт у родителя: parent.TETCFG={combos,prio,name,coins0}, голос — parent.say(), итог — parent.tetDone(r)."""
import sys,os,re
T=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
r=lambda p:open(os.path.join(T,p),encoding='utf-8').read()
s=r('demo-konec-temy/src.html')
def rep(a,b,cnt=1):
    global s
    n=s.count(a)
    assert n>=1,('нет',a[:80])
    s=s.replace(a,b) if cnt==0 else s.replace(a,b,cnt)
def cut(start,end):
    global s
    i=s.index(start);j=s.index(end,i)
    s=s[:i]+s[j:]
# --- экраны демо: урок, праздник, город — убрать
cut('<div class="scr" id="d_lesson">','<div class="scr off" id="d_morn">')
rep('<div class="scr off" id="d_morn">','<div class="scr" id="d_morn">')
rep('<h1>Сәлем! <span class="wave">👋</span></h1>','<h1 id="m_hi">Сәлем! <span class="wave">👋</span></h1>')
rep('<div class="cph"><span class="cp"><b>Мен</b> оқушы<i>?</i></span></div>','<div class="cph" id="m_ex"></div>')
rep('<button class="go" id="d_city2">В город →</button>','<button class="go" id="d_city2">В город →</button><div class="hintt">Нажми на фразу — услышишь 🔊</div>')
rep('<title>Тілашар · конец темы (демо)</title>','<title>Тілашар · разминка</title>')
rep('<button class="rb" id="back" aria-label="Назад">←</button>','<button class="rb" id="back" aria-label="Назад" style="display:none">←</button>')
rep('</style>','.hintt{font:700 12px Nunito;color:#7a8b95;margin-top:8px}.got div{cursor:pointer}\n</style>')
# --- данные от игры
rep('const COMBOS=__COMBOS__;','const P=window.parent,CFG=(P&&P.TETCFG)||{};const COMBOS=CFG.combos||{"Мен":[["оқушы","ученик"]]};const PRIO=(CFG.prio||[]).slice(),ERR=new Set(),OKS=new Set();')
rep("const PRONS=['Мен','Сен','Біз','Сіз','Ол','Сендер','Сіздер','Олар'];","const PRONS=['Мен','Сен','Біз','Сіз','Ол','Сендер','Сіздер','Олар'].filter(p=>COMBOS[p]&&COMBOS[p].length);")
rep("let COINS=parseInt(lg('tilashar-coins-v2','10'),10);if(isNaN(COINS))COINS=10;let SOUND=lg('tilashar-tet-snd','1')==='1';",
    "let COINS=0;let SOUND=!(P&&P.st&&P.st.mute);")
# голос — через игру (тот же kk22 и та же карта слов)
i=s.index('const SND=__SND__;');j=s.index('/* ---------- состояние')
s=s[:i]+"""function loadVoice(){}
function sayPhrase(list){return new Promise(res=>{let fin=false;const ok=()=>{if(fin)return;fin=true;try{if(MGAIN&&AC)MGAIN.gain.setTargetAtTime(.32,AC.currentTime,.2)}catch(e){}res()};
 try{if(!SOUND||!P||!P.say){setTimeout(ok,200);return}if(MGAIN&&AC)MGAIN.gain.setTargetAtTime(.1,AC.currentTime,.05);P.say(list.join(' '),ok);setTimeout(ok,4000)}catch(e){ok()}})}
"""+s[j:]
# фразы: сначала те, где ошибался
rep("function mkPhrase(){let ps=PRONS;let p=pick(ps);if(p===lastP)p=pick(ps);lastP=p;const [w,ru]=pick(COMBOS[p]);",
    "function mkPhrase(){let p,w,ru;const live=PRIO.filter(x=>COMBOS[x[0]]&&COMBOS[x[0]].some(c=>c[0]===x[1]));if(live.length&&Math.random()<.5){const x=live[0];PRIO.splice(PRIO.indexOf(x),1);p=x[0];w=x[1];ru=COMBOS[p].find(c=>c[0]===w)[1]}else{let ps=PRONS;p=pick(ps);if(p===lastP)p=pick(ps);[w,ru]=pick(COMBOS[p])}lastP=p;")
# ошибки/верные — для следующей разминки
rep("mist++;combo=0;hud();tipAt(b,why(b,x.t));","mist++;b.err=1;ERR.add(b.p+'|'+b.wd);combo=0;hud();tipAt(b,why(b,x.t));")
rep("combo++;maxCombo=Math.max(maxCombo,combo);","if(!b.err)OKS.add(b.p+'|'+b.wd);combo++;maxCombo=Math.max(maxCombo,combo);")
# монеты в шапке — монеты города
rep("$('cm').textContent=combo;$('coins').textContent=COINS;","$('cm').textContent=combo;$('coins').textContent=(CFG.coins0||0)+got.length;")
# звук — общий с игрой
rep("$('snd').onclick=()=>{SOUND=!SOUND;ls('tilashar-tet-snd',SOUND?1:0);","$('snd').onclick=()=>{SOUND=!SOUND;try{P.st.mute=!SOUND;P.save()}catch(e){}")
# сценарий демо (урок → праздник → город) убрать, оставить утро и итог
i=s.index("const CELE=");j=s.index("$('d_go').onclick")
s=s[:i]+s[j:]
rep("$('d_go').onclick=()=>{show(null);start()};","""const NM=String(CFG.name||'').replace(/[<>&"]/g,'');$('m_hi').innerHTML='Сәлем'+(NM?', '+NM:'')+'! <span class="wave">👋</span>';
{const p0=PRONS.includes('Мен')?'Мен':PRONS[0],w0=(COMBOS[p0].find(c=>c[0]==='оқушы')||COMBOS[p0][0])[0];$('m_ex').innerHTML=`<span class="cp"><b>${p0}</b> ${w0}<i>?</i></span>`}
setTimeout(()=>sayPhrase(['сәлем']),400);
$('d_go').onclick=()=>{ac();show(null);start()};""")
rep("function demoEnd(){const n=got.length;show('d_done');confetti('conf2');SFX.win();COINS+=n+5;ls('tilashar-coins-v2',COINS);hud();",
    "let EARN=0;function demoEnd(){const n=got.length;EARN=n+5;show('d_done');confetti('conf2');SFX.win();")
rep("$('d_got').innerHTML=got.length?got.map(([a,b])=>`<div><span class=\"kk\">${a}</span> — ${b}</div>`).join(''):'<div>В следующий раз получится ещё больше 💪</div>';",
    "$('d_got').innerHTML=got.length?got.map(([a,b],i)=>`<div data-i=\"${i}\"><span class=\"kk\">${a}</span> 🔊 — ${b}</div>`).join(''):'<div>В следующий раз получится ещё больше 💪</div>';$('d_got').querySelectorAll('[data-i]').forEach(e=>e.onclick=()=>sayPhrase([got[+e.dataset.i][0]]));")
rep("$('d_coin').textContent=`+${n+5} 🪙`}","$('d_coin').textContent=`+${EARN} 🪙`}")
rep("$('d_city2').onclick=()=>toCity(false);","let SENT=0;$('d_city2').onclick=()=>{if(SENT)return;SENT=1;stopMusic(.2);try{P.tetDone({n:got.length,earn:EARN,err:[...ERR],ok:[...OKS],got:got.slice()})}catch(e){}};")
# ---------- v187: любая тема (данные — от игры: CFG.items, CFG.tails, подсказка P.tetWhy) ----------
rep("background:url(city.jpg) center top/cover;filter:blur(6px) brightness(1.05);opacity:.9","background:linear-gradient(180deg,#bfe6ff,#dff3ff 30%,#a6dc7e 55%,#8fd16a)")
rep('const COMBOS=CFG.combos||{"Мен":[["оқушы","ученик"]]};','const ITEMS=(CFG.items&&CFG.items.length)?CFG.items:[{a:"Мен",w:"оқушы",need:"мын",m:"оқушымын",ru:"я ученик",full:"Мен оқушымын"}],TAILS=(CFG.tails||["мын"]).slice(),SH=Math.min(4,TAILS.length);')
rep("const PRONS=['Мен','Сен','Біз','Сіз','Ол','Сендер','Сіздер','Олар'].filter(p=>COMBOS[p]&&COMBOS[p].length);","")
i=s.index("function mkPhrase(){");j=s.index("function el(b)")
s=s[:i]+"""let lastF='';function mkPhrase(){let it;const live=PRIO.filter(f=>ITEMS.some(x=>x.full===f));if(live.length&&Math.random()<.5){const f=live[0];PRIO.splice(PRIO.indexOf(f),1);it=ITEMS.find(x=>x.full===f)}
 else{let k=0;do{it=pick(ITEMS)}while((it.full===lastF||it.a&&it.a===lastP&&ITEMS.length>6&&Math.random()<.5)&&k++<8)}lastF=it.full;lastP=it.a;
 const cw=t=>Math.max(2,Math.min(4,Math.ceil((measure(t)+16)/cell)));const ac=it.a?2:0;let wc=cw(it.w),pc=it.post?cw(it.post):0;while(ac+wc+2+pc>COLS){if(pc>wc&&pc>2)pc--;else if(wc>2)wc--;else if(pc>2)pc--;else break}
 return {id:++BID,t:'ph',it,p:it.a,wd:it.w,post:it.post||'',ru:it.ru,wc,pc,ac,w_:ac+wc+2+pc,done:false}}
"""+s[j:]
rep('e.innerHTML=`<span class="p" style="${W(2)}">${b.p}</span><span class="w" style="${W(b.wc)}">${b.wd}</span><span class="q" style="${W(2)}">?</span>`;',
    'e.innerHTML=(b.ac?`<span class="p" style="${W(2)}">${b.p}</span>`:"")+`<span class="w" style="${W(b.wc)}">${b.wd}</span><span class="q" style="${W(2)}">?</span>`+(b.pc?`<span class="w" style="${W(b.pc)}">${b.post}</span>`:"");')
rep("function needOf(b){return tailOf(b.p,b.wd)||NONE}","function needOf(b){return b.it.need||NONE}")
rep("function tailsAll(){const s=new Set();PRONS.forEach(p=>COMBOS[p].forEach(([w])=>s.add(tailOf(p,w)||NONE)));return [...s]}","function tailsAll(){return TAILS.map(t=>t||NONE)}")
rep("function fillShelf(){const need=[...new Set(phrases().slice(0,4).map(needOf))];while(shelf.length<4)shelf.push(null);","function fillShelf(){const need=[...new Set(phrases().slice(0,SH).map(needOf))];while(shelf.length<SH)shelf.push(null);")
rep("for(let i=0;i<4;i++)if(!shelf[i]){","for(let i=0;i<SH;i++)if(!shelf[i]){")
i=s.index("function why(b,t){");j=s.index("function bubble(")
s=s[:i]+"function why(b,t){let r='';try{r=P.tetWhy(CFG.th,b.it,t)}catch(e){}return r||'Почти! 🌀'}\nfunction hintOf(b){return ''}\n"+s[j:]
rep("ERR.add(b.p+'|'+b.wd);","ERR.add(b.it.full);")
rep("const wsp=b.el.querySelector('.w');q.remove();wsp.className='m';wsp.style.width=((b.wc+2)*cell-2)+'px';wsp.innerHTML=x.t===NONE?b.wd:`${b.wd}<i class=\"${isSoft(x.t)?'s':'h'}\">${x.t}</i>`;",
    "const wsp=b.el.querySelector('.w');q.remove();wsp.className='m';wsp.style.width=((b.wc+2)*cell-2)+'px';const MM=b.it.m||b.wd;wsp.innerHTML=x.t===NONE?b.wd:`${MM.slice(0,MM.length-x.t.length)}<i class=\"${isSoft(x.t)?'s':'h'}\">${x.t}</i>`;")
rep("if(!b.err)OKS.add(b.p+'|'+b.wd);","if(!b.err)OKS.add(b.it.full);")
rep("sayPhrase([b.p,b.wd+(x.t===NONE?'':x.t)]);","sayPhrase([b.it.full]);")
rep("const full=`${b.p} ${b.wd}${x.t===NONE?'':x.t}`,tr=`${PRU[b.p]} ${b.ru}`;","const full=b.it.full,tr=b.it.ru;")
rep("{const p0=PRONS.includes('Мен')?'Мен':PRONS[0],w0=(COMBOS[p0].find(c=>c[0]==='оқушы')||COMBOS[p0][0])[0];$('m_ex').innerHTML=`<span class=\"cp\"><b>${p0}</b> ${w0}<i>?</i></span>`}",
    "{const e0=ITEMS[0];$('m_ex').innerHTML=`<span class=\"cp\">${e0.a?`<b>${e0.a}</b> `:''}${e0.w}<i>?</i>${e0.post?' '+e0.post:''}</span>`;if(CFG.title)$('m_sub').innerHTML=`Сегодня — <b>${CFG.title}</b> ${CFG.ico||''}<br>1 минута — и в город! 🪙`}")
rep('<div class="csub">Разминка на 1 минуту — и в город! 🪙</div>','<div class="csub" id="m_sub">Разминка на 1 минуту — и в город! 🪙</div>')
assert 'COMBOS' not in s and 'PRONS' not in s, [l for l in s.split('\n') if 'COMBOS' in l or 'PRONS' in l][:3]
# картинки
t=r('tetris/trees.txt').split('\n')
s=s.replace('__TREE0__',t[0].replace('<svg ','<svg width="100%" height="100%" ')).replace('__TREE1__',t[1].replace('<svg ','<svg width="100%" height="100%" '))
s=s.replace('<div class="cbot">__ROBOT__</div>','<div class="cbot">'+r('demo-konec-temy/robot_happy.svg')+'</div>')
s=s.replace('__ROBOT__',r('tetris/robot.svg'))
assert '__' not in re.sub(r'window\.__\w+|__ct','',s), re.findall(r'.{30}__.{30}',s)[:5]
assert 'cele(' not in s and 'toCity' not in s and 'd_lesson' not in s
open(sys.argv[1],'w',encoding='utf-8').write(s)
print('ok',len(s))
