from playwright.sync_api import sync_playwright
import json
with sync_playwright() as pw:
  b=pw.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.route('**/*',lambda r: r.abort() if not r.request.url.startswith('file:') else r.continue_())
  pg.goto('file:///home/claude/v53/out_fresh53.html');pg.wait_for_timeout(1000)
  r=pg.evaluate("""()=>{var o=[];setTheme(7);o.push('NL '+NL+' BOSS '+BOSS);var miss={};
    for(var k=0;k<NL;k++){var run=genRun(LESSONS[k]);var tk=run.filter(s=>s.task);o.push('L'+(k+1)+' steps '+run.length+' tasks '+tk.length+' ['+tk.map(s=>s.task).join(',')+'] gain '+lessonGain(4,k));
      run.forEach(s=>{['say','k'].forEach(f=>{if(s[f]&&typeof s[f]==='string'&&!canSay(s[f]))miss[s[f]]=1});if(s.task==='build'&&s.say&&!canSay(s.say))miss[s.say]=1;if(s.ps)s.ps.forEach(p=>{if(!canSay(p[0]))miss[p[0]]=1});
        if(!s.task&&s.t){var m=s.t.match(/data-say="([^"]+)"/g)||[];m.forEach(x=>{var v=x.slice(10,-1);if(!canSay(v))miss[v]=1})}})}
    LIVE.home.forEach(p=>{if(!canSay(p[0]))miss[p[0]]=1});PAIRS1.home.forEach(p=>{if(!canSay(p[0]))miss[p[0]]=1});
    o.push('MISSING '+JSON.stringify(Object.keys(miss)));return o.join('\\n')}""")
  print(r);print('errs',errs);b.close()
