"""Validate the published MB-800 artifact using only the Python standard library."""
import sys
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids = [], []
        self.h1 = self.main = self.shell = 0
        self.feed(text)
    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if 'id' in attrs: self.ids.append(attrs['id'])
        self.h1 += tag == 'h1'
        self.main += tag == 'main'
        self.shell += tag == 'script' and attrs.get('data-skunkworks-global-nav') == 'v10'
        for key in ('href', 'src'):
            if attrs.get(key): self.links.append(attrs[key])

root = Path(sys.argv[1]).resolve()
files = sorted(root.rglob('*.html'))
assert len(files) == 28, f'Expected overview, setup and 26 labs, got {len(files)}'
pages = {p: Page(p.read_text(encoding='utf-8')) for p in files}
errors = []
for file, page in pages.items():
    if (page.h1, page.main, page.shell) != (1, 1, 1): errors.append(f'{file}: missing/duplicate heading, main or shell')
    if len(page.ids) != len(set(page.ids)): errors.append(f'{file}: duplicate IDs')
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc: continue
        target = (file.parent / unquote(url.path)).resolve() if url.path else file
        if target.is_dir(): target /= 'index.html'
        if not target.is_relative_to(root): errors.append(f'{file}: link escapes course: {href}')
        elif not target.exists(): errors.append(f'{file}: missing {href}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{file}: missing anchor {href}')
assert not errors, '\n'.join(errors)
print(f'Validated {len(files)} pages: local links, anchors, single H1/main and Academy shell.')
