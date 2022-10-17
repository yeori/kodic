const props = ['APP_MODE', 'BACKEND_HOST']

const env = {}
// console.log('[APP MODE]', import.meta.env[appMode])
props.forEach((prop) => {
  const key = `VITE_${prop}`
  env[prop] = import.meta.env[key]
})

export default env
