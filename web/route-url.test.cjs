const test = require('node:test');
const assert = require('node:assert/strict');
const routeUrl = require('./route-url.cjs');
test('preserves ordinary nested lab routes', () => {
  assert.equal(routeUrl('Instructions/Labs/Lab01_Create_company.html'), 'Instructions/Labs/Lab01_Create_company.html');
});
test('encodes filename markup, quotes, fragments and spaces without losing the original path', () => {
  const raw = `Instructions/Labs/Lab99_"'><img src=x>&# test.html`;
  const encoded = routeUrl(raw);
  assert.equal(decodeURIComponent(encoded), raw);
  assert.doesNotMatch(encoded, /["'<> &#]/);
});
