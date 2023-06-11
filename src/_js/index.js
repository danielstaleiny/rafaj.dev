function sink(type, data) {
  let handle
  if (type === 0) {
    const talkback = data //
    console.log('talkback is data')
    handle = setTimeout(() => talkback(2), 3000)
  }
  if (type === 1) {
    console.log('data ', data)
  }
  if (type === 2) {
    clearTimeout(handle)
  }
}

function source(type, sink) {
  if (type !== 0) {
    return
  }
  console.log('sink is now data')
  let handle = setInterval(() => {
    sink(1, null)
  }, 1000)
  const talkback = (t, d) => {
    if (t === 2) clearInterval(handle)
  }
  sink(0, talkback)
}

source(0, sink)
