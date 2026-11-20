from pathlib import Path
import json
from pypdf import PdfReader
root=Path(r'Y:\bits-assignments\Bits_res')
out=root/'study-app/public/wp';out.mkdir(parents=True,exist_ok=True)
meta=[]
for p in sorted((root/'Sem 1 Term 1/Writing Practice/Last Sem Exam Papers').glob('*.pdf')):
 d=PdfReader(p)
 print(p.name)
 for i,page in enumerate(d.pages):
  for img in page.images:
   im=img.image
   if im.width<120 or im.height<80:continue
   name=f'chart-{len(meta)+1}.png'; im.save(out/name)
   meta.append({'pdf':p.name,'page':i+1,'image':'/wp/'+name,'width':im.width,'height':im.height,'extraction':'pypdf offline fallback; PyMuPDF unavailable'})
   print(name,i+1,im.width,im.height)
(out/'sources.json').write_text(json.dumps(meta,indent=2),encoding='utf-8')
