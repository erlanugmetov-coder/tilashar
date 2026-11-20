from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/out_fresh53.html');pg.wait_for_timeout(1000)
  pg.evaluate("()=>{['sumov','cintro','cneed','fbov'].forEach(i=>{var o=document.getElementById(i);if(o)o.remove()});[0,1,2,3,4,5,6].forEach(setTheme);st.d6=[0,1,2,3,4,5,7];st.d7=[0,1,2,3,4,6];st.name='Ерлан';save();setTheme(5);map()}")
  pg.wait_for_timeout(500);pg.screenshot(path='/tmp/rvs/c0.png')
  pg.click('button[data-a=summe]');pg.wait_for_timeout(900)
  pg.evaluate("()=>{var s=document.querySelector('.ssec');if(s)s.scrollIntoView()}");pg.wait_for_timeout(400);pg.screenshot(path='/tmp/rvs/c4.png')
  pg.evaluate("()=>{['sumov'].forEach(i=>{var o=document.getElementById(i);if(o)o.remove()});sumCard(true,6)}");pg.wait_for_timeout(900)
  pg.evaluate("()=>{var s=[...document.querySelectorAll('.ssec')].pop();if(s)s.scrollIntoView()}");pg.wait_for_timeout(400);pg.screenshot(path='/tmp/rvs/c5.png')
  print(errs);b.close()
