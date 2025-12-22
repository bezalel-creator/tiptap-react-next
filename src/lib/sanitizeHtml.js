import DOMPurify from 'dompurify'

export function sanitize(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'u', 'h1', 'h2', 'span'],
    ALLOWED_ATTR: ['style'],
  })
}
