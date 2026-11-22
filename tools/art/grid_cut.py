"""Cut a sprite sheet (objects on white, roughly in a grid) into transparent PNGs.
Each connected blob is assigned to the grid cell containing its centre of mass; all blobs of a cell form one object.
usage: grid_cut.py sheet.png outdir cols rows name1,name2,...  (reading order)"""
import sys, os
import numpy as np
from scipy import ndimage
from PIL import Image

src, out, cols, rows, names = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5].split(',')
os.makedirs(out, exist_ok=True)
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape
# near-white pixels connected to the border = background (light grey shadows count as background too)
light = (a.min(axis=2) > 222) & ((a.max(axis=2) - a.min(axis=2)) < 22)
lab, n = ndimage.label(light)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))
fg = ~bg
fg = ndimage.binary_opening(fg, iterations=1)
blab, bn = ndimage.label(fg)
sizes = ndimage.sum(fg, blab, range(1, bn + 1))
centers = ndimage.center_of_mass(fg, blab, range(1, bn + 1))
cell_of = {}
for i, (s, (cy, cx)) in enumerate(zip(sizes, centers), start=1):
    if s < 150:  # specks
        continue
    c = min(cols - 1, int(cx / (w / cols)))
    r = min(rows - 1, int(cy / (h / rows)))
    cell_of.setdefault(r * cols + c, []).append(i)
alpha_full = ndimage.gaussian_filter(fg.astype(np.float32), 0.7)
for idx, name in enumerate(names):
    ids = cell_of.get(idx, [])
    if not ids:
        print(name, 'EMPTY'); continue
    mask = np.isin(blab, ids)
    ys, xs = np.where(mask)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    m = ndimage.binary_dilation(mask[y0:y1, x0:x1], iterations=1)
    al = (np.clip(alpha_full[y0:y1, x0:x1], 0, 1) * m * 255).astype(np.uint8)
    rgba = np.dstack([np.asarray(im)[y0:y1, x0:x1], al])
    piece = Image.fromarray(rgba, 'RGBA')
    piece.save(os.path.join(out, name + '.png'))
    t = piece.copy(); t.thumbnail((360, 360)); t.save(os.path.join(out, name + '.webp'), 'WEBP', quality=85)
    print(name, piece.size, len(ids), 'blobs')
