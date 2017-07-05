const request = (url) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.onload = () => {
      return resolve()
    }
    xhr.onerror = () => {
      return reject()
    }
    xhr.send(null)
  })

  return promise
}

export default request
