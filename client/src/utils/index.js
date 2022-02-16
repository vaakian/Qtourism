export const delaiedPromise = (promise, delay) => {
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