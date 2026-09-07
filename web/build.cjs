// Builds portable HTML from the existing lab Markdown without changing the Jekyll sources.
const fs = require('node:fs');
const path = require('node:path');
const MarkdownIt = require('markdown-it');
const YAML = require('yaml');
const routeUrl = require('./route-url.cjs');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'site');
const base = 'https://microsoft.skunkworksacademy.com/MB-800/';
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const md = new MarkdownIt({html:false, linkify:true});
const defaultLink = md.renderer.rules.link_open || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options));
md.renderer.rules.link_open = (tokens, i, options, env, self) => {
  const href = tokens[i].attrGet('href');
  if (href && !/^(?:[a-z]+:|\/\/|#)/i.test(href)) tokens[i].attrSet('href', href.replace(/\.md(?=$|#)/i, '.html'));
  return defaultLink(tokens, i, options, env, self);
};
// The surrounding page owns H1; keep source headings below it.
for (const rule of ['heading_open', 'heading_close']) {
  md.renderer.rules[rule] = (tokens, i, options, env, self) => {
    if (tokens[i].tag === 'h1') tokens[i].tag = 'h2';
    return self.renderToken(tokens, i, options);
  };
}
function read(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return {meta: match ? YAML.parse(match[1]) : {}, body: match ? raw.slice(match[0].length) : raw};
}
const labsDir = path.join(root, 'Instructions', 'Labs');
const labs = fs.readdirSync(labsDir).filter(n => /^Lab\d.*\.md$/.test(n)).sort().map(name => {
  const {meta, body} = read(path.join(labsDir, name));
  if (!meta.lab?.title) throw new Error(`Missing lab title: ${name}`);
  return {...meta.lab, body, route:`Instructions/Labs/${name.replace(/\.md$/, '.html')}`};
});
function page(title, description, route, content, prefix = '') {
  return `<!doctype html>
<html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)} | Skunkworks Academy</title><meta name="description" content="${escape(description)}">
<link rel="canonical" href="${base}${routeUrl(route)}"><meta name="theme-color" content="#0b1220">
<meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${base}${routeUrl(route)}">
<link rel="stylesheet" href="${prefix}assets/microsoft-hub.css"><link rel="stylesheet" href="${prefix}assets/course.css">
<script defer src="https://skunkworksacademy.com/assets/academy-navigation.js?v=2026.08.23.1" data-skunkworks-global-nav="v10"></script>
</head><body><a class="skip-link" href="#main">Skip to content</a>
<nav class="shell course-nav" aria-label="Course navigation"><a href="https://microsoft.skunkworksacademy.com/#catalog">Microsoft catalog</a><a href="${prefix}index.html">MB-800 overview</a><a href="${prefix}index.html#labs">Lab directory</a></nav>
<main id="main" data-swa-contrast="preserve">${content}</main>
<footer class="site-footer"><div class="shell"><strong>Skunkworks Academy · Microsoft learning</strong><p>Lab materials from the Skunkworks Academy MB-800 repository. Microsoft product names and trademarks belong to Microsoft.</p><a href="${prefix}LICENSE">Content license</a> · <a href="https://github.com/skunkworks-academy/MB-800-Business-Central-Functional-Consultant">Course source</a></div></footer></body></html>\n`;
}
function write(route, html) { const target = path.join(out, route); fs.mkdirSync(path.dirname(target), {recursive:true}); fs.writeFileSync(target, html); }
if (path.dirname(out) !== root || path.basename(out) !== 'site') throw new Error('Unsafe output directory');
fs.rmSync(out, {recursive:true, force:true});
fs.mkdirSync(out, {recursive:true});
fs.cpSync(path.join(root, 'Instructions'), path.join(out, 'Instructions'), {recursive:true, filter: source => !source.endsWith('.md')});
fs.mkdirSync(path.join(out, 'assets'), {recursive:true});
for (const name of ['microsoft-hub.css','course.css']) fs.copyFileSync(path.join(__dirname, name), path.join(out, 'assets', name));
fs.copyFileSync(path.join(root, 'LICENSE'), path.join(out, 'LICENSE'));
const cards = labs.map(lab => `<li><span class="catalog-type">${escape(lab.duration || 'Hands-on lab')}</span><h3><a href="${routeUrl(lab.route)}">${escape(lab.title)}</a></h3><p>${escape(lab.module)}</p></li>`).join('\n');
let homepage = fs.readFileSync(path.join(__dirname, 'overview.html'), 'utf8').replace('<!-- LABS -->', cards).replaceAll('{{LAB_COUNT}}', String(labs.length));
write('index.html', page('MB-800: Business Central Functional Consultant', 'Learn to configure Dynamics 365 Business Central with practical labs covering company setup, finance, purchasing, sales, inventory and Copilot.', '', homepage));
labs.forEach((lab, i) => {
  const previous = labs[i-1], next = labs[i+1];
  const pagination = `<nav class="course-pagination" aria-label="Lab sequence">${previous ? `<a href="${routeUrl(path.posix.basename(previous.route))}">← ${escape(previous.title)}</a>` : '<a href="../../index.html#labs">Back to lab directory</a>'}${next ? `<a href="${routeUrl(path.posix.basename(next.route))}">${escape(next.title)} →</a>` : '<a href="../../index.html#labs">Return to course overview →</a>'}</nav>`;
  write(lab.route, page(lab.title, lab.module, lab.route, `<section class="shell course-section"><p class="eyebrow">MB-800 · ${escape(lab.duration || 'Hands-on lab')}</p><h1>${escape(lab.title)}</h1><p>${escape(lab.module)}</p>${pagination}<article class="lab-body" aria-label="Lab instructions">${md.render(lab.body)}</article>${pagination.replace('aria-label="Lab sequence"', 'aria-label="Continue learning"')}</section>`, '../../'));
});
const setup = read(path.join(root, 'Instructions', 'Lab00_Lab_Setup.md'));
write('Instructions/Lab00_Lab_Setup.html', page('Lab setup guide', 'Prepare your Business Central classroom environment.', 'Instructions/Lab00_Lab_Setup.html', `<section class="shell course-section"><h1>Lab setup guide</h1><article class="lab-body">${md.render(setup.body)}</article><p><a href="../index.html#labs">Continue to the labs →</a></p></section>`, '../'));
console.log(`Built MB-800 overview, setup guide and ${labs.length} HTML labs in site/`);
