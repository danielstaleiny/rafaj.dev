'use strict'

module.exports = (text) => {
  return JSON.parse(
    JSON.stringify(text)
      .replace(/\\n/gm, '</br>')
      .replace(/\\t/gm, '&nbsp;&nbsp;&nbsp;&nbsp;')
  )
}
