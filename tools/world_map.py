from playwright.sync_api import sync_playwright
import sys
f=sys.argv[1] if len(sys.argv)>1 else 'out_fresh53.html'
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':1640})
  pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/'+f);pg.wait_for_timeout(1200)
  pg.evaluate("""()=>{window.NOARRIVE=1;function rg(n){var a=[];for(var i=0;i<n;i++)a.push(i);a.push(n+1);return a}
   [0,1,2,3,4,5,6,7].forEach(function(th){setTheme(th)});
   st.done=rg(TL[0].length);st.d2=rg(TL[1].length);st.d3=rg(TL[2].length);st.d4=rg(TL[3].length);st.d5=rg(TL[4].length);st.d6=rg(TL[5].length);st.d7=rg(TL[6].length);st.d8=rg(TL[7].length);
   var c=cst();c.tut=9;c.yarr=c.zarr=c.barr=c.parr=c.marr=c.karr=c.harr=1;c.pfest=1;c.done=CTASK.map(t=>t.id);SD().warm=TODAY();SD().first='2000-01-01';st.sum1=st.sum2=1;st.fbAsk=2;st.chAsk=2;save();showCity({})}""")
  pg.wait_for_timeout(2500)
  pg.evaluate("""()=>{document.querySelectorAll('.ycov,.cloud,.cclouds,#cclouds').forEach(e=>e.remove());var w=document.getElementById('cworld');w.style.transform='scale(0.36)';w.style.transformOrigin='0 0';w.style.left='0';w.style.top='0';w.style.position='absolute';
   var p=w.parentNode;p.style.overflow='visible';document.body.style.overflow='visible'}""")
  pg.wait_for_timeout(800)
  pg.screenshot(path='/tmp/rvs/world.png',clip={'x':0,'y':0,'width':1080,'height':1610})
  print(pg.evaluate("()=>[CW,CH]"))
  b.close()
