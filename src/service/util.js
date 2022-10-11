const partition = {
  toObj: (
    /** @type {any[]} */ arr,
    /** @type {(elem: any) => String} */ keyResolver
  ) => {
    const container = {}
    arr.forEach((elem) => {
      const key = keyResolver(elem)
      if (!container[key]) {
        container[key] = []
      }
      container[key].push(elem)
    })
    return container
  },
}

const readOnly = (/** @type {any[]} */ arr) => {
  return new Proxy(arr, {
    get: (obj, index) => obj[index],
    set: () => false,
  })
}
const copyProps = (src, dst) => {
  Object.entries(src).forEach(([k, v]) => {
    dst[k] = v
  })
}
export default { partition, readOnly, copyProps }
