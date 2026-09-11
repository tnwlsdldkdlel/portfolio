"""Pretendard를 이 사이트에 실제로 쓰인 글리프만 남겨 서브셋한다.

    pip install fonttools brotli
    python scripts/subset-fonts.py

원본은 .fonts-src/ 에 두고(없으면 자동으로 내려받는다) 결과만 public/fonts/ 에 커밋한다.
문구를 크게 고쳤다면 다시 돌려야 한다 — 빠뜨린 글자는 fallback 서체로 그려진다.
"""

import glob
import io
import os
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont

CDN = "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff2"
WEIGHTS = [("Regular", "400"), ("Bold", "700")]
SRC_DIR = ".fonts-src"
OUT_DIR = "public/fonts"

# 히어로 인사말 한 줄에만 쓰는 라틴 디스플레이 — 쓰는 글자만 남긴다.
DISPLAY_URL = (
    "https://cdn.jsdelivr.net/npm/@fontsource/shrikhand/files/"
    "shrikhand-latin-400-normal.woff2"
)
DISPLAY_TEXT = "Hello!"

# 소스 전체를 훑는다 — 코드 식별자까지 들어오지만 라틴이라 비용이 거의 없다.
SOURCES = ("content/*.ts", "app/**/*.tsx", "app/**/*.ts", "components/*.tsx")

# 동적으로 만들어지는 문자열(연도, 번호 등) 대비 상시 포함분
ALWAYS = (
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\·—–…→←↗×✓©®™°%‰"
)


def collect_chars() -> str:
    chars = set(ALWAYS)
    for pattern in SOURCES:
        for path in glob.glob(pattern, recursive=True):
            chars |= set(io.open(path, encoding="utf-8").read())
    return "".join(sorted(c for c in chars if ord(c) >= 0x20))


def ensure_source(name: str) -> str:
    os.makedirs(SRC_DIR, exist_ok=True)
    path = f"{SRC_DIR}/Pretendard-{name}.woff2"
    if not os.path.exists(path):
        urllib.request.urlretrieve(f"{CDN}/Pretendard-{name}.woff2", path)
    return path


def shrink(src: str, out: str, text: str) -> tuple[int, int]:
    font = TTFont(src)
    options = subset.Options()
    options.layout_features = ["*"]
    options.flavor = "woff2"
    options.hinting = False
    options.notdef_outline = True
    options.name_IDs = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(out)
    return os.path.getsize(src), os.path.getsize(out)


def main() -> None:
    text = collect_chars()
    os.makedirs(OUT_DIR, exist_ok=True)
    before = after = 0

    for name, weight in WEIGHTS:
        src = ensure_source(name)
        out = f"{OUT_DIR}/Pretendard-{weight}.woff2"
        b, a = shrink(src, out, text)
        before, after = before + b, after + a
        print(f"{out}: {b / 1024:.1f}KB -> {a / 1024:.1f}KB")

    display_src = f"{SRC_DIR}/Shrikhand.woff2"
    if not os.path.exists(display_src):
        urllib.request.urlretrieve(DISPLAY_URL, display_src)
    b, a = shrink(display_src, f"{OUT_DIR}/Display-400.woff2", DISPLAY_TEXT)
    before, after = before + b, after + a
    print(f"{OUT_DIR}/Display-400.woff2: {b / 1024:.1f}KB -> {a / 1024:.1f}KB")

    print(f"글리프 {len(text)}자")
    print(
        f"합계 {before / 1024:.1f}KB -> {after / 1024:.1f}KB "
        f"({100 * (1 - after / before):.1f}% 감소)"
    )


if __name__ == "__main__":
    main()
