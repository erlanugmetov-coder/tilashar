"""Render whole city of a Tilashar html: wmap.py file.html out.png [scale] [keep_clouds]"""
from playwright.sync_api import sync_playwright
import sys
f=sys.argv[1]; out=sys.argv[2]; sc=float(sys.argv[3]) if len(sys.argv)>3 else 0.36; keep=len(sys.argv)>4
with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--allow-file-access-from-files'])
  pg=b.new_page(viewport={'width':1100,'height':1700})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f);pg.wait_for_timeout(1500);pg.evaluate("()=>{var t=document.getElementById('tetov');if(t)t.remove()}")
  pg.evaluate("""()=>{window.NOARRIVE=1;function rg(n){var a=[];for(var i=0;i<n;i++)a.push(i);a.push(n+1);return a}
   for(var th=0;th<TL.length;th++){try{setTheme(th)}catch(e){} var k=th===0?'done':'d'+(th+1); st[k]=rg(TL[th].length)}
   var c=cst();c.tut=9;['yarr','zarr','barr','parr','marr','karr','harr','varr','darr'].forEach(k=>c[k]=1);c.pfest=1;c.done=CTASK.map(t=>t.id);SD().warm=TODAY();SD().first='2000-01-01';st.sum1=st.sum2=1;st.fbAsk=2;st.chAsk=2;save();showCity({})}""")
  pg.wait_for_timeout(3000)
  if not keep:
    pg.evaluate("()=>{document.querySelectorAll('.ycov,.cloud,.cclouds,#cclouds,#clcv').forEach(e=>e.remove())}")
  pg.evaluate("""(sc)=>{var w=document.getElementById('cworld');w.style.transform='scale('+sc+')';w.style.transformOrigin='0 0';w.style.left='0';w.style.top='0';w.style.position='absolute';
   var p=w.parentNode;p.style.overflow='visible';document.body.style.overflow='visible';document.querySelectorAll('.cmodal,.modal,.ov,#tetov,.ctip,.cnb,.chud').forEach(e=>e.remove())}""",sc)
  pg.wait_for_timeout(1200)
  W,H=pg.evaluate("()=>[CW,CH]")
  pg.set_viewport_size({'width':int(W*sc)+10,'height':int(H*sc)+10})
  pg.wait_for_timeout(600)
  pg.screenshot(path=out,clip={'x':0,'y':0,'width':int(W*sc),'height':int(H*sc)})
  print([W,H],'errors',errs[:5])
  b.close()
