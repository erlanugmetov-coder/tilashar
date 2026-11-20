from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
    errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
    pg.goto('file:///home/claude/v53/pubt/index.html');pg.wait_for_timeout(2500)
    print(pg.evaluate("document.body.innerText.slice(0,300)"))
    pg.screenshot(path='/tmp/rvs/tt.png');print(errs);b.close()
