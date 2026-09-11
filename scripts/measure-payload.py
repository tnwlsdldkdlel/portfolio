"""첫 화면 전송량을 재서 content/profile.ts 의 colophon 과 맞춘다.

    npm run build && npx next start -p 4400
    python scripts/measure-payload.py

HTML + 그 HTML 이 참조하는 청크 + 웹폰트를 brotli(q11)로 압축해 더한다.
next start 는 gzip 만 주므로 압축은 이쪽에서 한다 — 배포 CDN 기준(brotli)에 맞추기 위해서다.
"""

import glob
import os
import re
import urllib.request

import brotli

BASE = "http://localhost:4400"


def fetch(path: str) -> bytes:
    req = urllib.request.Request(BASE + path, headers={"Accept-Encoding": "identity"})
    return urllib.request.urlopen(req).read()


def kb(data: bytes) -> float:
    return len(brotli.compress(data, quality=11)) / 1024


html = fetch("/")
assets = sorted(set(re.findall(r"/_next/static/[A-Za-z0-9_\-/.]+\.(?:js|css)", html.decode())))

html_kb = kb(html)
css_kb = sum(kb(fetch(p)) for p in assets if p.endswith(".css"))
js_kb = sum(kb(fetch(p)) for p in assets if p.endswith(".js"))
font_kb = sum(os.path.getsize(f) for f in glob.glob("public/fonts/*.woff2")) / 1024

print(f"HTML  {html_kb:6.1f}KB")
print(f"CSS   {css_kb:6.1f}KB")
print(f"JS    {js_kb:6.1f}KB  ({sum(1 for a in assets if a.endswith('.js'))} chunks)")
print(f"FONT  {font_kb:6.1f}KB")
print(f"TOTAL {html_kb + css_kb + js_kb + font_kb:6.1f}KB")
