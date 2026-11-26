import asyncio,json,sys,io
import numpy as np
from PIL import Image
from playwright.async_api import async_playwright
IDS=sys.argv[1].split(',')
C=[(0,0)]+[(dx,dy) for r in (25,45,70,95) for dx,dy in [(-r,0),(r,0),(0,r),(-r,r),(r,r),(0,-r),(-r,-r),(r,-r)]]
def img(b):return np.asarray(Image.open(io.BytesIO(b)).convert('RGB')).astype(int)
async def occ(pg,r):
  info=await pg.evaluate('''(r)=>{var s=document.querySelector('svg.res[data-r="'+r+'"]');var L=parseFloat(s.style.left),T=parseFloat(s.style.top);CAM.z=1;CAM.x=-L+400;CAM.y=-T+400;camApply();var bb=s.querySelector('image')||s.querySelector('g');var rc=bb.getBoundingClientRect();return {x:rc.x,y:rc.y,w:rc.width,h:rc.height}}''',r)
  await pg.wait_for_timeout(120)
  clip={'x':max(0,info['x']),'y':max(0,info['y']),'width':max(2,info['w']),'height':max(2,info['h'])}
  A=img(await pg.screenshot(clip=clip))
  await pg.evaluate('''(r)=>{document.querySelectorAll('.spr').forEach(e=>{if(e.dataset.r!==r)e.style.visibility='hidden'})}''',r)
  B=img(await pg.screenshot(clip=clip))
  await pg.evaluate('''(r)=>{document.querySelector('svg.res[data-r="'+r+'"]').style.visibility='hidden'}''',r)
  Cc=img(await pg.screenshot(clip=clip))
  await pg.evaluate('''()=>{document.querySelectorAll('.spr').forEach(e=>e.style.visibility='')}''')
  m=np.abs(B-Cc).sum(2)>40
  if m.sum()==0:return 1
  return ((np.abs(A-B).sum(2)>40)&m).sum()/m.sum()
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':1000,'height':1000})
    await pg.goto('http://localhost:8765/index.html');await pg.evaluate("localStorage.setItem('tilashar-grid-seed','12')");await pg.reload();await pg.wait_for_timeout(7000)
    await pg.add_style_tag(content='*{animation:none!important} .ctip,.tipb,#cpanel,.mvo{display:none!important}')
    res={}
    for r in IDS:
      best=None
      for dx,dy in C:
        await pg.evaluate('([r,a,b])=>__rmove(r,a,b)',[r,dx,dy]);await pg.add_style_tag(content='*{animation:none!important}')
        o=await occ(pg,r)
        if best is None or o<best[0]:best=(o,dx,dy)
        if o<0.04:break
      await pg.evaluate('([r,a,b])=>__rmove(r,a,b)',[r,best[1],best[2]])
      res[r]=[best[1],best[2]];print(r,round(best[0],2),best[1:],flush=True)
    print(json.dumps(res));await b.close()
asyncio.run(main())
