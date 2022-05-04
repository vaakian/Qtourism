export const delayedPromise = (promise, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      promise().then(resolve)
    }, delay)
  })
}

export const hashColor = (str) => {
  const strCodeSum = str.split('').reduce((sum, char) => {
    return sum + char.charCodeAt(0)
  }, 0)
  return [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'orange',
    'cyan',
    'pink',
    'violet',
    'indigo',
    'amber',
  ][strCodeSum % 10]
}

// 解析url参数
export const parseUrlParams = (url) => {
  const params = {}
  const urlParams = url.split('?')[1]
  if (!urlParams) {
    return params
  }
  const paramsArr = urlParams.split('&')
  paramsArr.forEach((param) => {
    const paramArr = param.split('=')
    params[paramArr[0]] = decodeURIComponent(paramArr[1])
  })
  return params
}


// 节流

export const throttle = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}