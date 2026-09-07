// Encode each path segment for use in an HTML URL without altering file paths.
module.exports = route => route.split('/').map(segment =>
  encodeURIComponent(segment).replace(/[!'()*]/g, char =>
    '%' + char.charCodeAt(0).toString(16).toUpperCase())
).join('/');
