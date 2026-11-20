import re, json, html
W = '/home/claude/work/'
src = open(W + 'rel181_main.html', encoding='utf-8').read()   # чистая v181, книжку v182 собираем заново

DISP2SLOT = {1: 0, 2: 1, 3: 4, 4: 7, 5: 5, 6: 6, 7: 2, 8: 3}
# какой урок (0-based) открывает блоки 1..6 книжки; 'B' = вся тема пройдена
REQ = {1: [0, 0, 2, 6, 2, 8], 2: [0, 1, 2, 4, 2, 6], 3: [0, 1, 2, 3, 2, 5], 4: [0, 0, 1, 3, 1, 5],
       5: [0, 1, 2, 3, 3, 5], 6: [0, 0, 1, 2, 1, 4], 7: [0, 0, 1, 2, 0, 4], 8: [0, 2, 3, 4, 5, 7]}
SEC = {0: ('слово + хвостик = фраза', 'Мен оқушымын', 'я ученик'),
       1: ('Кім? и Қандай? — хвостик один и тот же', 'Мен батылмын', 'я смелый'),
       4: ('действие + соединитель + хвостик', 'Мен барамын', 'я пойду'),
       7: ('хвостик показывает хозяина', 'Менің досым', 'мой друг'),
       5: ('➡️ -ға / -ге — куда, 📍 -да / -де — где', 'Мен мектепке барамын', 'я пойду в школу'),
       6: ('⬅️ -дан / -ден — откуда', 'Мен үйден келемін', 'я прихожу из дома'),
       2: ('хвостик «много»: -лар, -дар, -тар', 'аюлар', 'медведи'),
       3: ('после числа — без «много»', 'бес алма', 'пять яблок')}

def book_inner(path):
    s = open(path, encoding='utf-8').read()
    b = s[s.index('<div class="book">') + len('<div class="book">'):s.index('<div class="btns">')]
    return b.strip()

KEEP = {'lego', 'QR', 'QH', 'QS', 'QY', 'spk'}

def legotext(l):
    return ''.join(re.findall(r'>([^<>]+)</span>', l))

def convert(inner, disp):
    b = re.sub(r'<span class="cap">.*?</span></span>', '', inner, flags=re.S)       # игра сама подписывает кубики
    b = re.sub(r'<span class="lw">(<span class="lego">.*?</span></span>)', r'\1', b, flags=re.S)
    # озвучка: фраза после «=»
    b = re.sub(r'<span class="ph">([^<]+)</span> <span class="spk">', lambda m: f'<span class="ph" data-rbsay="{m.group(1)}">{m.group(1)}</span> <span class="spk">', b)
    # строки «вся семья»
    def frs(m):
        row = m.group(0)
        p = re.search(r'<span class="p">([^<]+)<small>', row).group(1)
        lg = re.findall(r'<span class="lego">(.*?)</span></span>', row, flags=re.S)
        words = ''.join(legotext(x + '</span>') for x in lg)
        say = (p + ' ' + words).strip()
        return row.replace('<div class="fr">', f'<div class="fr" data-rbsay="{html.escape(say)}">', 1)
    b = re.sub(r'<div class="fr">.*?</div>', frs, b, flags=re.S)
    b = re.sub(r'<div class="yes">([^<✅]+?)( ✅)', lambda m: f'<div class="yes" data-rbsay="{m.group(1).strip()}">{m.group(1)}{m.group(2)}', b)
    # блоки: требование урока
    req = REQ[disp]
    cnt = [0]
    def blk(m):
        i = cnt[0]; cnt[0] += 1
        return f'<div class="blk {m.group(1)}" data-rbl="{req[i]}">'
    b = re.sub(r'<div class="blk (b\d)">', blk, b)
    assert cnt[0] == 6, (disp, cnt)
    # кубики
    def fixlego(m):
        t = m.group(0)
        for a, z in (('r', 'QR'), ('h', 'QH'), ('s', 'QS'), ('y', 'QY')):
            t = t.replace(f'<span class="{a}">', f'<span class="{z}">')
        return t
    b = re.sub(r'<span class="lego">.*?</span></span>', fixlego, b, flags=re.S)
    b = re.sub(r'class="([^"]*)"', lambda m: 'class="' + ' '.join(t if t in KEEP else 'rb-' + t for t in m.group(1).split()) + '"', b)
    b = b.replace('class="QR"', 'class="r"').replace('class="QH"', 'class="t h"').replace('class="QS"', 'class="t s"').replace('class="QY"', 'class="t y"')
    return b

# Тема 1 — образец; темы 2–8 — черновики
inner = {1: book_inner(W + 'sample_rule1.html')}
for d in range(2, 9):
    inner[d] = book_inner(W + f'rule{d}.html')
RB = {}
for d, h in inner.items():
    RB[DISP2SLOT[d]] = convert(h, d)

# CSS
css = open(W + 'rule_css.css', encoding='utf-8').read() + '.ch small b{display:inline;font:inherit;font-weight:800;color:var(--ink);margin:0}'
out = []
for sel, dec in re.findall(r'([^{}]+)\{([^}]*)\}', css):
    sel = sel.strip()
    if sel.startswith((':root', '*', 'body')) or '.lego' in sel:
        continue
    sel = re.sub(r'\.([a-zA-Z][\w-]*)', lambda m: '.' + (m.group(1) if m.group(1) in KEEP else 'rb-' + m.group(1)), sel)
    out.append(','.join('.rbk ' + x.strip() for x in sel.split(',')) + '{' + dec + '}')
CSS = ('.rbk{--ink:#14222c;--muted:#5d7483;--card:#fffaf0;--line:#e9dcc0;--aina:#ff8a3d;--hard:#2f6fd6;--soft:#e05a9c;--display:"Rubik",Arial,sans-serif;--body:"Nunito",Arial,sans-serif;font:600 15px/1.45 var(--body);color:var(--ink);text-align:left}'
       + ''.join(out) +
       '.rbk *{min-width:0;max-width:100%}.rbk .rb-two{grid-template-columns:repeat(auto-fit,minmax(min(150px,100%),1fr))}.rbk .rb-trap{grid-template-columns:repeat(auto-fit,minmax(min(140px,100%),1fr))}.rbk .rb-arrows{grid-template-columns:repeat(auto-fit,minmax(min(92px,100%),1fr))}.rbk .rb-nums{grid-template-columns:repeat(auto-fit,minmax(52px,1fr))}.rbk .rb-fr{display:flex;flex-wrap:wrap;align-items:center;gap:4px 10px}.rbk .rb-fr .rb-p{min-width:78px}.rbk .rb-ch{grid-template-columns:32px minmax(0,1fr) auto}.rbk .rb-ch small{overflow-wrap:anywhere}.rbk .rb-eq{flex-wrap:wrap}.rbk table{table-layout:auto;word-break:break-word}.rbk th,.rbk td{padding:5px 3px}.rbk h1,.rbk h2{overflow-wrap:anywhere}.rbk .lego{flex-wrap:wrap}.rbk .lgwrap{max-width:100%}'
       + '.rbk .rb-book{background:none;box-shadow:none;padding:0}.rbk .rb-b7{background:#fff8d6}.rbk .rb-b7 .rb-n{background:#e0a800}.rbk .srow{margin:6px 0}'
       '.rbk [data-rbsay]{cursor:pointer}.rbk .saying{box-shadow:0 0 0 3px #ffc58f}.lego .t.y{background:#ffd200;color:#5a4300}'
       '.rbk .rb-lock{opacity:.55}.rbk .rb-lock h2{margin:0}.rbk .rb-lockt{font:800 13px var(--body);color:var(--muted);margin-top:4px}'
       '.thc .rbbtn{display:inline-grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#fff3e3;font-size:22px;margin-left:6px;box-shadow:0 2px 0 #e9cfae;vertical-align:middle}'
       '.rbmap{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;margin:14px 0 4px;padding:14px 12px;border:0;border-radius:18px;background:linear-gradient(160deg,#ffb26b,#ff8a3d);color:#fff;font:800 18px "Rubik",Arial,sans-serif;box-shadow:0 5px 0 #d96a1f;cursor:pointer}'
       '.rbmap span{font-size:26px}.rbwin{text-align:center}.rbwin h3{font:800 26px/1.1 "Rubik",Arial,sans-serif;margin:8px 0 4px}'
       '.rbwin .rbsec{background:#e6f1fb;border-radius:16px;padding:12px;margin:12px 0;color:#0c447c;font:800 15px/1.4 "Nunito",Arial,sans-serif}'
       '.rbwin .rbsec b{display:block;font:800 22px "Rubik",Arial,sans-serif;color:#14222c;margin-top:6px}.rbwin .rbsec small{display:block;color:#5d7483;font-size:13px}')

JS = '''
/* ===================== v183: Книжка правил 📖 для всех тем ===================== */
var RBCSS=%s,RB=%s,RBSEC=%s;
(function(){try{var c=document.createElement('style');c.textContent=RBCSS;document.head.appendChild(c)}catch(e){}})();
function rbDone(slot,k){var s0=THX;try{setTheme(slot);return isDone(k)}catch(e){return false}finally{setTheme(s0)}}
function rbFull(slot){try{return themeDone(slot)}catch(e){return false}}
(function(){var _sc=sumCard;sumCard=function(fromMe,th){th=th||0;if(!RB[th])return _sc.apply(this,arguments);
  SUMTH=th;var o=document.getElementById('sumov');if(o)o.remove();var D=SUMD[th],P=D.p(),full=rbFull(th);
  var d=document.createElement('div');d.className='sumov';d.id='sumov';
  d.innerHTML='<div class="sumc rbk">'+RB[th]+(full?'<div class="rb-blk rb-b7"><h2><span class="rb-n">7</span>💬 Что ты теперь умеешь сказать</h2>'+
    P.map(function(p,i){return '<div class="srow" data-sumi="'+i+'"><span class="spk">🔊</span><div><b class="kk">'+p[0]+'</b><small>'+p[1]+'</small></div></div>'}).join('')+'</div>':'')+
    '<div class="sbtns"><button class="sl" data-a="sumplay">🔊 Послушать</button><button class="sg" data-a="'+(fromMe?'sumclose':'city')+'">'+(fromMe?'Понятно':'В город →')+'</button></div></div>';
  if(!full)d.querySelectorAll('.rb-blk[data-rbl]').forEach(function(b){var l=+b.dataset.rbl;if(rbDone(th,l))return;var h=b.querySelector('h2');b.className+=' rb-lock';b.innerHTML=(h?h.outerHTML:'')+'<div class="rb-lockt">🔒 Откроется после урока '+(l+1)+'</div>'});
  document.body.appendChild(d);
  if(full)setTimeout(function(){sumSay(P,0)},600);
  else{var f=d.querySelector('.rb-blk:not(.rb-lock) [data-rbsay]');if(f)setTimeout(function(){f.classList.add('saying');say(f.dataset.rbsay,function(){f.classList.remove('saying')})},600)}}})();
function rbWin(th){var o=document.getElementById('sumov');if(o)o.remove();var D=SUMD[th],S=RBSEC[th]||['','',''],nm=st.name?esc(st.name)+', ':'';
  var d=document.createElement('div');d.className='sumov';d.id='sumov';
  d.innerHTML='<div class="sumc rbwin">'+AINA('laugh',90,true).replace('class="rbt','class="rbt dance')+'<span class="sbadge">'+D.b+'</span><h3>🏆 Тема пройдена!</h3>'+
    '<div class="rbsec">Главный секрет: '+S[0]+'<b data-rbsay="'+S[1]+'">'+S[1]+' 🔊</b><small>'+S[2]+'</small></div>'+
    '<p style="margin:0 0 10px;font-weight:700">'+nm+'всё правило темы — в книжке 📖</p>'+
    '<div class="sbtns"><button class="sl" data-a="rbook" data-v="'+th+'">📖 Открыть книжку</button><button class="sg" data-a="city">В город →</button></div></div>';
  document.body.appendChild(d);var b=d.querySelector('[data-rbsay]');setTimeout(function(){if(b&&canSay(S[1])){b.classList.add('saying');say(S[1],function(){b.classList.remove('saying')})}},700)}
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-rbsay],[data-a=rbook]');if(!t)return;
  if(t.dataset.a==='rbook'){e.stopPropagation();e.preventDefault();sumCard(true,+t.dataset.v);return}
  if(t.closest('.rbk,.rbwin')){e.stopPropagation();t.classList.add('saying');say(t.dataset.rbsay,function(){t.classList.remove('saying')})}},true);
(function(){var _ts=themesScreen;themesScreen=function(){_ts.apply(this,arguments);try{document.querySelectorAll('.thc[data-a=theme]').forEach(function(b){var i=+b.dataset.v,s=themeState(i);
  if(RB[i]&&(s==='done'||s==='open')){var x=b.querySelector('.ths');if(x&&!b.querySelector('.rbbtn'))x.insertAdjacentHTML('beforeend','<span class="rbbtn" data-a="rbook" data-v="'+i+'" title="Книжка правил">📖</span>')}})}catch(e){}}})();
(function(){var _m=map;map=function(){_m.apply(this,arguments);try{if(!RB[THX])return;document.querySelectorAll('[data-a=summe]').forEach(function(x){if(!x.closest('#cpanel'))x.remove()});
  var lg=document.querySelector('.legend');var h='<button class="rbmap" data-a="rbook" data-v="'+THX+'"><span>📖</span>Книжка правил этой темы</button>';
  if(lg)lg.outerHTML=h;else{var p=document.querySelector('.path');if(p)p.insertAdjacentHTML('afterend',h)}}catch(e){}}})();
''' % (json.dumps(CSS, ensure_ascii=False).replace('</', '<\\/'),
       json.dumps(RB, ensure_ascii=False).replace('</', '<\\/'),
       json.dumps({k: list(v) for k, v in SEC.items()}, ensure_ascii=False).replace('</', '<\\/'))

s = src
old = "sumCard(!!document.querySelector('.cityscr'),th)"
assert s.count(old) == 1
s = s.replace(old, "rbWin(th)")
end = s.rindex('</script>')
s = s[:end] + JS + s[end:]
assert s.count("CURV='v181'") == 1
s = s.replace("CURV='v181'", "CURV='v184'")
open(W + 'main184.html', 'w', encoding='utf-8').write(s)
print('ok', {k: len(v) for k, v in RB.items()})
