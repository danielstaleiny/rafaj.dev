'use strict'

module.exports = (str) => {
  return str.replace(/(^\w+:|^)\/\//, '')
}
