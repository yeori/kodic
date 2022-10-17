import Dexie from 'dexie'

const db = new Dexie('dictdb')

db.version(1).stores({
  words: 'seq,word,',
})
export default class Dao {}
