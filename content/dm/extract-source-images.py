"""Dependency-free recovery of embedded raster images (not a page renderer).
PyMuPDF was unavailable in both isolated Python installations. The supplied PDFs
use 8-bit FlateDecode images, so this preserves their exact original pixels.
Run from project root: python -I content/dm/extract-source-images.py
"""
from pathlib import Path
import re
import struct
import zlib

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT.parent / 'Sem 1 Term 1/Discrete Math/Last Exam Papers'
OUT = ROOT / 'public/dm/source-images'
OUT.mkdir(parents=True, exist_ok=True)
DATES = ['03-03-2023', '26-02-2023', '18-02-2023', '07-10-2023', '15-10-2023']

def chunk(tag, data):
    return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data))

for paper, date in enumerate(DATES, 1):
    pdf = next(SOURCE.glob(f'*{date}.pdf'))
    objects = {int(m[1]): m[2] for m in re.finditer(rb'(\d+)\s+\d+\s+obj\b(.*?)endobj', pdf.read_bytes(), re.S)}
    images = {}
    for oid, obj in objects.items():
        if not re.search(rb'/Subtype\s*/Image\b', obj):
            continue
        head, raw = re.split(rb'stream\r?\n', obj, maxsplit=1)
        raw = re.split(rb'\r?\nendstream', raw)[0]
        w, h = [int(re.search(rb'/' + key + rb'\s+(\d+)', head)[1]) for key in [b'Width', b'Height']]
        channels = 3 if b'/DeviceRGB' in head else 1
        if b'/FlateDecode' not in head:
            raise ValueError((paper, oid, 'unsupported filter'))
        data = zlib.decompress(raw)
        assert len(data) == w * h * channels, (paper, oid, len(data), w, h, channels)
        mask = re.search(rb'/SMask\s+(\d+)\s+0\s+R', head)
        images[oid] = (w, h, channels, data, int(mask[1]) if mask else None)
    for oid, (w, h, channels, data, mask) in images.items():
        if channels == 1:
            continue
        if mask:
            alpha = images[mask][3]
            data = bytes(round(v * alpha[i // 3] / 255 + 255 - alpha[i // 3]) for i, v in enumerate(data))
        scanlines = b''.join(b'\0' + data[y*w*3:(y+1)*w*3] for y in range(h))
        png = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(scanlines)) + chunk(b'IEND', b'')
        dest = OUT / f'paper{paper}-image{oid}.png'
        dest.write_bytes(png)
        print(dest.relative_to(ROOT), w, h)
