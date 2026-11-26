import sys
from playwright.sync_api import sync_playwright
seed=sys.argv[1]; name=sys.argv[2]; sc=float(sys.argv[3]) if len(sys.argv)>3 else 0.5
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':int(sys.argv[4]) if len(sys.argv)>4 else 1700,'height':int(sys.argv[5]) if len(sys.argv)>5 else 1450})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    fails=[];pg.on('requestfailed',lambda r:fails.append(r.url[-60:]))
    pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
    pg.goto('file:///home/claude/w/out/index.html');pg.wait_for_timeout(1200)
    pg.evaluate("localStorage.setItem('tilashar-grid-seed','%s')"%seed);pg.reload();pg.wait_for_timeout(3500)
    pg.evaluate("""(function(){try{SD().best=7;cityRender()}catch(e){};document.querySelectorAll('.cneed,.ctip,.tmb,.chud,.cbot,.cname,.czone2,.cpin').forEach(e=>e.style.display='none');CBUSY=false;
      var w=document.getElementById('cworld');CAM.z=%s;w.style.transform='translate(0px,0px) scale(%s)';w.style.transformOrigin='0 0';})()"""%(sc,sc))
    pg.wait_for_timeout(2500)
    pg.screenshot(path='/home/claude/w/t/'+name+'.png')
    print('errs',errs[:5]);print('fails',sorted(set(fails))[:20])
    b.close()
