import asyncio,json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page(viewport={'width':1000,'height':1000})
    await pg.goto('http://localhost:8765/index.html');await pg.evaluate("localStorage.setItem('tilashar-grid-seed','12')");await pg.reload();await pg.wait_for_timeout(7000)
    await pg.add_style_tag(content='*{animation-play-state:paused!important;animation:none!important} .ctip,.tipb,#cpanel,.mvo{display:none!important}')
    ids=await pg.evaluate("[...document.querySelectorAll('svg.res')].map(s=>s.dataset.r)")
    out=[]
    for r in ids:
      info=await pg.evaluate('''(r)=>{var s=document.querySelector('svg.res[data-r="'+r+'"]');var L=parseFloat(s.style.left),T=parseFloat(s.style.top);CAM.z=1;CAM.x=-L+400;CAM.y=-T+400;camApply();var q=Object.keys(GRIDQ).find(k=>L>=GRIDQ[k].x-60&&L<GRIDQ[k].x+832&&T>=GRIDQ[k].y-150&&T<GRIDQ[k].y+832);var bb=s.querySelector('image')||s.querySelector('g');var rc=bb.getBoundingClientRect();return {q:q,x:rc.x,y:rc.y,w:rc.width,h:rc.height}}''',r)
      await pg.wait_for_timeout(150)
      clip={'x':max(0,info['x']),'y':max(0,info['y']),'width':max(2,info['w']),'height':max(2,info['h'])}
      a=await pg.screenshot(clip=clip)
      await pg.evaluate('''(r)=>{document.querySelectorAll('.spr').forEach(e=>{if(e.dataset.r!==r)e.style.visibility='hidden'})}''',r)
      bimg=await pg.screenshot(clip=clip)
      await pg.evaluate('''(r)=>{var s=document.querySelector('svg.res[data-r="'+r+'"]');s.style.visibility='hidden'}''',r)
      c=await pg.screenshot(clip=clip)
      await pg.evaluate('''()=>{document.querySelectorAll('.spr').forEach(e=>e.style.visibility='')}''')
      out.append([r,info['q']]);open('/tmp/occ/%s_a.png'%r,'wb').write(a);open('/tmp/occ/%s_b.png'%r,'wb').write(bimg);open('/tmp/occ/%s_c.png'%r,'wb').write(c)
    json.dump(out,open('/tmp/occ/list.json','w'));await b.close()
asyncio.run(main())
