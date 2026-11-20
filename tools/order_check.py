from playwright.sync_api import sync_playwright
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/out_fresh53.html');pg.wait_for_timeout(1000)
  S="()=>[ORD.map(themeState).join(','),'cur='+curTheme(),'h='+hArea(),'m='+mArea(),'k='+kArea(),'z='+zArea()].join(' ')"
  pg.evaluate("""()=>{window.NOARRIVE=1;function rg(n){var a=[];for(var i=0;i<n;i++)a.push(i);a.push(n+1);return a}[0,1,2,3,4,5,6,7].forEach(setTheme);
    st.done=rg(TL[0].length);st.d2=rg(TL[1].length);st.d3=[];st.d4=[];st.d5=rg(TL[4].length);st.d6=[];st.d7=[];st.d8=[];var c=cst();c.tut=9;c.yarr=1;c.parr=1;c.pfest=1;c.harr=0;c.marr=0;c.karr=0;c.zarr=0;c.barr=0;
    c.done=CTASK.filter(t=>t.cl!=null||t.lv!=null||t.pl!=null).map(t=>t.id);SD().warm=TODAY();SD().first='2000-01-01';st.sum1=st.sum2=st.sum5=1;st.fbAsk=2;st.chAsk=2;save()}""")
  print('после парка:',pg.evaluate(S))
  pg.reload();pg.wait_for_timeout(11000);pg.screenshot(path='/tmp/rvs/h1.png')
  print('прилёт:',pg.evaluate("()=>[zoneName(),cst().harr,curTheme(),document.querySelector('.nbprog')&&document.querySelector('.nbprog').innerText]"))
  pg.evaluate("()=>{st.d8=[0,1,2,3,4,5,7];save()}");print('после Менің:',pg.evaluate(S))
  pg.evaluate("()=>{st.d8=[];st.d6=[0,1,2,3,4,5,7];st.d7=[0,1,2,3,4,6];save()}");print('как у Алтая:',pg.evaluate(S))
  pg.evaluate("()=>{document.querySelectorAll('.chcard,.chov,#cchap').forEach(e=>e.remove());themesScreen()}");pg.wait_for_timeout(500);pg.screenshot(path='/tmp/rvs/h2.png',full_page=True)
  print('errs',errs);b.close()
