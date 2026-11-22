"""Встроить новую графику карты в index.html Тілашара.
usage: python3 build_art.py in.html out.html bundle_dir
 - кладёт в bundle_dir/art/*.webp (до 340 px) только нужные картинки + panorama_strip.webp
 - вставляет tools/art/art_layer.js перед `window.__c.showCity=showCity;showCity();`
Картинки-источники: art/map/*.webp (600 px) и art/panorama_strip.webp (корень репозитория)."""
import sys, os, re, json
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src, out, bundle = sys.argv[1], sys.argv[2], sys.argv[3]
layer = open(os.path.join(ROOT, 'tools/art/art_layer.js'), encoding='utf-8').read()
names = set(re.findall(r"'([a-z0-9_]+)'", layer))
mapdir = os.path.join(ROOT, 'art/map')
avail = {f[:-5] for f in os.listdir(mapdir) if f.endswith('.webp')}
used = sorted(n for n in names if n in avail)
os.makedirs(os.path.join(bundle, 'art'), exist_ok=True)
SZ = {}
for n in used:
    dst = os.path.join(bundle, 'art', n + '.webp')
    if os.path.exists(dst) and os.path.getmtime(dst) > os.path.getmtime(os.path.join(mapdir, n + '.webp')):
        SZ[n] = list(Image.open(dst).size); continue
    im = Image.open(os.path.join(mapdir, n + '.webp'))
    im.thumbnail((340, 340), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=82, method=4)
    SZ[n] = list(im.size)
pano = Image.open(os.path.join(ROOT, 'art/panorama_strip.webp'))
pd = os.path.join(bundle, 'art', 'panorama_strip.webp')
if not os.path.exists(pd): pano.save(pd, 'WEBP', quality=84, method=4)
layer = layer.replace('__SZ__', json.dumps(SZ, separators=(',', ':')))
html = open(src, encoding='utf-8').read()
anchor = 'window.__c.showCity=showCity;showCity();'
assert html.count(anchor) == 1, 'anchor not found once'
html = html.replace(anchor, layer + '\n' + anchor)
open(out, 'w', encoding='utf-8').write(html)
tot = sum(os.path.getsize(os.path.join(bundle, 'art', f)) for f in os.listdir(os.path.join(bundle, 'art')))
print('images', len(used) + 1, 'KB', tot // 1024, 'missing', sorted(n for n in names if n not in avail and len(n) > 3)[:40])
