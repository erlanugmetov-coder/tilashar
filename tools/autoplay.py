from playwright.sync_api import sync_playwright
import sys
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/out_fresh53.html');pg.wait_for_timeout(1000)
  for k in [int(a) for a in sys.argv[1:]]:
    pg.evaluate("k=>{['sumov','cintro','cneed','fbov'].forEach(i=>{var o=document.getElementById(i);if(o)o.remove()});setTheme(7);start(k)}",k);pg.wait_for_timeout(1200)
    log=[];wrong=0
    for it in range(70):
      r=pg.evaluate("""()=>{var c=document.getElementById('ctl');if(!c)return 'noctl';
        if(c.querySelector('.final'))return 'FINAL';
        var s=run[si];
        var pp=[...c.querySelectorAll('[data-a=pp][data-k]')].filter(x=>!x.disabled&&!x.classList.contains('done')&&!x.classList.contains('ok'));
        if(pp.length){var l=pp[0];l.click();var rr=[...c.querySelectorAll('[data-a=pp][data-r]')].find(x=>x.dataset.r===l.dataset.k);if(rr)rr.click();return 'pp'}
        var pk0=c.querySelector('[data-a=peek][data-v="0"]'),sp=c.querySelector('[data-a=sendpick]');if(pk0&&sp){if(sp.disabled){pk0.click();return 'peek'}sp.click();return 'sendpick'}
        var an=[...c.querySelectorAll('[data-a=ans]')];
        if(an.length&&s&&s.o){var t=an.find(x=>x.dataset.v===String(s.a))||an.find(x=>x.dataset.v===s.o[s.a]);if(t){t.click();return 'ans:'+(s.o[s.a])}return 'ans?'}
        if(c.querySelector('[data-a=cube]')&&B&&B.s){var want=B.s.c,ln=B.line.map(i=>B.all[i].t);var okp=ln.every((x,j)=>x===want[j]);if(!okp){var u=c.querySelector('[data-a=unc]');if(u)u.click();return 'unc'}
          if(ln.length===want.length){var sb=c.querySelector('[data-a=sendb]');if(sb)sb.click();return 'build:'+want.join('|')}
          var tk=want[ln.length],i=B.all.findIndex((x,j)=>x.t===tk&&B.line.indexOf(j)<0);var cb=c.querySelector('[data-a=cube][data-v="'+i+'"]');if(cb){var b0=B.line.length;cb.click();return 'cube b='+busy+' '+b0+'>'+B.line.length+' tk='+tk+' i='+i}return 'cube?'}
        var bt=[...c.querySelectorAll('button')].find(x=>!x.disabled&&['ppn','peek','mute'].indexOf(x.dataset.a)<0);if(bt){bt.click();return 'btn:'+(bt.dataset.a||bt.textContent.slice(0,15))}
        return 'idle'}""")
      if r=='FINAL':break
      log.append(r);pg.wait_for_timeout(700 if r.startswith('btn') else 1300)
    st=pg.evaluate("document.querySelector('#ctl .final')?document.querySelector('#ctl .final').innerText.slice(0,160):'NO FINAL'")
    print('L',k+1,len(log),pg.evaluate("document.querySelector('#ctl .final')?'FINAL OK':'NO FINAL'"))
    pg.screenshot(path='/tmp/rvs/zp%d.png'%k)
  print('ERRS',errs);b.close()
