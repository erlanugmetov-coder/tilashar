import sys
from playwright.sync_api import sync_playwright
f = sys.argv[1]
CHK = r"""()=>{const c=document.querySelector('#sumov .sumc');if(!c)return ['no card'];const R=c.getBoundingClientRect();const bad=[];
 c.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width===0)return;if(r.right>R.right-2||r.left<R.left+2){
   if(e.closest('.rb-lock'))return;bad.push((e.className||e.tagName)+': '+(e.textContent||'').trim().slice(0,30)+' ['+Math.round(r.left-R.left)+'..'+Math.round(r.right-R.left)+'/'+Math.round(R.width)+']')}});
 return bad.slice(0,6)}"""
with sync_playwright() as p:
    b = p.chromium.launch()
    tot = 0
    for w in [390, 330, 290, 260]:
        pg = b.new_page(viewport={'width': w, 'height': 900})
        pg.route('**/*', lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('file://' + f); pg.wait_for_timeout(1200)
        pg.evaluate("()=>{['cintro','cneed','fbov','sumov'].forEach(i=>{var o=document.getElementById(i);if(o)o.remove()});rbFull=function(){return true}}")
        for slot in [0, 1, 4, 7, 5, 6, 8, 2, 3]:
            pg.evaluate("t=>sumCard(true,t)", slot); pg.wait_for_timeout(700)
            bad = pg.evaluate(CHK)
            if bad: print(w, 'book', slot, bad); tot += 1
            pg.evaluate("t=>{document.getElementById('sumov').remove();rbWin(t)}", slot); pg.wait_for_timeout(300)
            bad = pg.evaluate(CHK)
            if bad: print(w, 'win', slot, bad); tot += 1
            pg.evaluate("()=>document.getElementById('sumov').remove()")
        if errs: print(w, 'ERR', errs)
        pg.close()
    print('PROBLEMS', tot)
    b.close()
