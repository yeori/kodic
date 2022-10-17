import { register } from 'register-service-worker'
import search from './store/search-store'
const fetchAppData = () => {
  // api.kodict.cate()
  search.fetchCategories()
}
  
const env = import.meta.env
if (env.PROD) {
  console.log('registering sw.js', env.BASE_URL)
  register(`/sw.js`, {
    ready: () => {
      console.log('[SW] ready')
      fetchAppData()
    },
  })
} else {
  fetchAppData()
}
