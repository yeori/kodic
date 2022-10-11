import { GET } from './request'
const kodict = {
  cate: () => GET('/categories'),
  word: (/** @type {string} */ word) => GET('/word', { word }),
}

export default { kodict }
