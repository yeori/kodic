import './assets/app.scss'
import App from './App.svelte'
import './service-worker-handler'

const app = new App({
  target: document.getElementById('app'),
})

export default app
