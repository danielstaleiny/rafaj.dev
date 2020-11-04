const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const filePath = 'util/tailwind-cheatsheet.org'
const config = require('../src/_data/tailwind.js')

try {
  fs.writeFileSync(filePath, '', { flag: 'w+' }) // clear the file
} catch (e) {
  console.log(e)
}

function h1(txt) {
  return `* ${txt}`
}

function h2(txt) {
  return `** ${txt}`
}

function genClass(key) {
  return `${key}`
}

function capFirst(st) {
  return st.charAt(0).toUpperCase() + st.slice(1)
}

const txt = Object.keys(config.cheatsheet).map((key) => {
  const head = h1(key)
  const res1 = Object.keys(config.cheatsheet[key]).map((key2) => {
    const subhead = h2(capFirst(key2))
    const variant = !!config.cheatsheet[key][key2].variant
      ? config.cheatsheet[key][key2].variant
          .map((v) => {
            return config.variants[v]
          })
          .join(' ')
      : ''

    if (!config.cheatsheet[key][key2].isAllowed) return ''
    // #+BEGIN_COMMENT comment 2 #+END_COMMENT
    const tip = !!config.cheatsheet[key][key2].tip
      ? `${config.cheatsheet[key][key2].tip}`
      : ''
    // const desc = ''
    const desc = !!config.cheatsheet[key][key2].desc
      ? ` - ${config.cheatsheet[key][key2].desc}\n`
      : ''

    // With values
    // return `${subhead} ${variant} ${tip}\n${desc}  ${config.cheatsheet[key][key2].value.map(obj=>{return `${Object.keys(obj).map(key3=>{return `${key3}: ${obj[key3]}`})}`}).join('\n  ')}`

    // Without values
    return `${subhead} ${variant} ${tip}\n${desc}  ${config.cheatsheet[key][
      key2
    ].value
      .map((obj) => {
        return `${Object.keys(obj).map(genClass)}`
      })
      .join('\n  ')}`
  })

  return `${head}\n${res1.join('\n')}`
})

writeFile(filePath, txt.join('\n'), { flag: 'a+' }).catch(console.log)
