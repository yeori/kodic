import axios from 'axios'
// import env from "@/service/env";
// import store from "@/store";

let errorCallback = (_) => {}
const host = 'http://localhost:8899'
axios.defaults.baseURL = `${host}/kodict/api`

axios.interceptors.request.use((config) => {
  // const token = store.state.user.jwt;
  config.headers['Cache-Control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  config.headers['Expires'] = '0'
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config
})
axios.interceptors.response.use(
  (res) => res,
  (e) => {
    return Promise.reject(e)
  }
)

function onError(e) {
  let res = null
  if (e.response) {
    res = e.response && e.response.data
    res = res || { cause: '' }
    res.success = false
    res.status = e.response.status
    res._error = e
  } else {
    res = {
      success: false,
      cause: e.message,
      status: 599,
    }
  }
  errorCallback(res)
  throw res
}

function onSuccess(res) {
  res.data.status = res.status
  return res.data
}
function parseArgs() {
  if (arguments.length < 1) {
    throw new Error('...(url, [args]) required')
  }

  const args = []
  for (let i = 0; i < arguments.length; i++) {
    args[i] = arguments[i]
  }
  return {
    args,
  }
}

function GET() {
  let param = parseArgs(...arguments)
  if (param.args.length === 2) {
    param.args[1] = { params: param.args[1] }
  }
  return (
    axios
      // @ts-ignore
      .get(...param.args)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err))
  )
}
function POST() {
  const param = parseArgs(...arguments)
  return (
    axios
      // @ts-ignore
      .post(...param.args)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err))
  )
}
function UPLOAD(url, formData) {
  return axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => onSuccess(res))
    .catch((err) => onError(err))
}
function PUT() {
  const param = parseArgs(...arguments)
  return (
    axios
      // @ts-ignore
      .put(...param.args)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err))
  )
}
function DELETE() {
  const param = parseArgs(...arguments)
  if (param.args.length === 2) {
    param.args[1] = { data: param.args[1] }
  }
  return (
    axios
      // @ts-ignore
      .delete(...param.args)
      .then((res) => onSuccess(res))
      .catch((err) => onError(err))
  )
}

const setErrorCallback = (callback) => {
  errorCallback = callback
}
export { GET, PUT, POST, DELETE, UPLOAD, onError, onSuccess }

export default {
  setErrorCallback,
}
