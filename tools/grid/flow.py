import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
    pg.goto('file:///home/claude/w/out/index.html');pg.wait_for_timeout(1500)
    pg.evaluate("localStorage.setItem('tilashar-grid-seed','0')");pg.reload();pg.wait_for_timeout(3000)
    pg.evaluate("document.querySelectorAll('.ctip,.cneed').forEach(e=>e.remove());CBUSY=false;st.energy=20;save();doTask('house')");pg.wait_for_timeout(4000)
    pg.evaluate("CBUSY=false;doTask('trash')");pg.wait_for_timeout(4000)
    pg.screenshot(path='/home/claude/w/t/f1.png')
    print(pg.evaluate("[cst().done.join(','),st.coins,st.energy,document.querySelectorAll('.cbub').length]"))
    # lesson open
    pg.evaluate("CBUSY=false;document.querySelector('#cplay').click()");pg.wait_for_timeout(2500)
    print(pg.evaluate("document.body.innerText.slice(0,160)").replace('\n',' | '))
    pg.screenshot(path='/home/claude/w/t/f2.png')
    # new player
    pg.evaluate("localStorage.clear()");pg.reload();pg.wait_for_timeout(3000)
    print('NEW:',pg.evaluate("document.body.innerText.slice(0,160)").replace('\n',' | '))
    print('errs',errs[:6])
    b.close()
