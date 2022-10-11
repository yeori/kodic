import { writable } from 'svelte/store'
import api from '../service/api'
import util from '../service/util'

class SearchGroup {
  /**
   * @param {any[]} definitions  raw data received from backend server
   */
  constructor(definitions) {
    this.definitions = definitions
  }
  cateName(definition) {
    const { category } = definition
    const cate = categories.find((elem) => elem.code === category)
    return cate?.name
  }
  get word() {
    return this.definitions[0].word
  }

  toText() {
    const first = this.definitions[0]
    const title = first.word + (first.hanja ? `(${first.hanja})` : '')
    const lines = [title]
    this.definitions.forEach((def, idx) => {
      let desc = ''
      if (def.category > 0) {
        desc += `[${def.cateName}] `
      }
      desc += def.definition
      lines.push(`${idx + 1}. ${desc}`)
    })
    return lines.join('\n')
  }
}
class SearchItem {
  /**
   * @param {string} word
   * @param {SearchGroup[]} groups
   */
  constructor(word, groups = []) {
    this.word = word
    this.groups = groups
    this.pending = true
  }
  setGroups(groups) {
    this.groups = groups
    this.pending = false
  }
}
class WordDefinition {
  /**
   * @param {string} searchWord
   * @param {Object} def
   */
  constructor(searchWord, def) {
    this.searchWord = searchWord
    this.seq = null
    this.targetCode = null
    this.groupCode = null
    this.order = null
    this.word = null
    this.definition = null
    this.hanja = null
    this.wordUnit = null
    this.wordType = null
    this.pos = null
    this.senseType = null
    this.region = null
    this.category = null
    this.origin = null
    this.relation = null
    this.dialect = null
    util.copyProps(def, this)
  }
  get cateName() {
    const cate = categories.find((elem) => elem.code === this.category)
    return cate?.name
  }
  toText() {
    let value = this.word
    if (this.hanja) {
      value += `(${this.hanja})`
    }
    value += '\n'
    if (this.category > 0) {
      value += `[${this.cateName}]`
    }
    value += ` ${this.definition}`
    return value
  }
}
class SearchState {
  constructor() {
    this.items = []
  }
  /**
   * @param {SearchItem} searchItem
   */
  addSearchItem(searchItem) {
    this.items.push(searchItem)
  }
}

const searchState = writable(new SearchState())
const currentSearch = writable(null)
let categories

const searchWord = (/** @type {string} */ word) => {
  const searchItem = new SearchItem(word)
  currentSearch.set(searchItem)
  api.kodict.word(word).then((res) => {
    const definitions = res.defnitions.map(
      (def) => new WordDefinition(word, def)
    )
    // 1. build data structure
    const groups = util.partition.toObj(
      definitions,
      (item) => `${item.groupCode}`
    )
    const searchGroups = Object.values(groups).map(
      (definitions) => new SearchGroup(definitions)
    )
    // 2. update state
    currentSearch.update((item) => {
      item.setGroups(searchGroups)
      return item
    })
    searchState.update((state) => {
      state.addSearchItem(searchItem)
      return state
    })
  })
}

const fetchCategories = () => {
  api.kodict.cate().then((res) => {
    categories = util.readOnly(res.cates)
  })
}
fetchCategories()
export { searchState, currentSearch, WordDefinition }
export default {
  searchWord,
}
