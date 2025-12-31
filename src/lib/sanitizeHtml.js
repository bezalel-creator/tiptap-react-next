import DOMPurify from 'dompurify'

export function sanitize(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'b', 'strong',
      'i', 'em',
      'u',
      's', 'strike',
      'h1', 'h2', 'h3',
      'span',
      'mark',
      'ul',
'ol',
'li',


    ],
    ALLOWED_ATTR: ['style'],
    ALLOWED_CSS_PROPERTIES: [
      'color',
      'background-color',
      'font-weight',
      'font-style',
      'text-decoration',
    ],
  })
}
