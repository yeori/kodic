const wlabels = {
  100: 'Thin',
  200: 'Extra-light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi-Bold',
  700: 'Bold',
  800: 'Extra-Bold',
  900: 'Black',
}
class FontSpec {
  /**
   * @param {string} name
   * @param {string} type
   * @param {number[]} weights
   */
  constructor(name, type, weights) {
    this.name = name
    this.type = type
    this.weights = weights
  }
}
const fonts = [
  new FontSpec('Noto Sans KR', 'serif', [100, 300, 400, 500, 700, 900]),
  new FontSpec('Nanum Gothic Coding', 'monospace', [400, 700]),
  new FontSpec('Nanum Pen Script', 'cursive', [400]),
]
const template = {
  tag: '<link href="https://fonts.googleapis.com/css2?family={name}&display=swap" rel="stylesheet">',
  option: '<option value="{idx}">{text}</option>',
}

const repl = (...args) => {
  let t = template[args[0]]
  for (let i = 1; i < args.length; i += 2) {
    t = t.replace(args[i], args[i + 1])
  }
  return t
}

const loadFont = (/** @type {FontSpec} */ font) => {
  const weights = font.weights || []
  let w = weights.join(';')
  w = w && ':wght@' + w
  let fontFace = font.name.replaceAll(' ', '+')
  fontFace = fontFace + w
  // const link = repl('tag', '{name}', fontFace)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${fontFace}&display=swap`
  return new Promise((ok) => {
    link.onload = (e) => {
      ok()
    }
    document.head.appendChild(link)
  })
}
