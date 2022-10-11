import { writable } from 'svelte/store'

class UIState {
  constructor() {
    this.online = navigator.onLine
  }
}
const uiStore = writable(new UIState())
const setOnline = (/** @type {boolean} */ online) => {
  uiStore.update((state) => {
    state.online = online
    return state
  })
}
const turnOn = () => setOnline(true)
const turnOff = () => setOnline(false)
window.addEventListener('online', turnOn, false)
window.addEventListener('offline', turnOff, false)

export { uiStore }
