// ==============================================
//
//                    IMPORTS
//
// ==============================================
const R = require('ramda')

// ==============================================
//
//                    SETUP
//
// ==============================================
const pipe = R.pipe
const reduce = R.reduce
const map = R.map
const pick = R.pick
const values = R.values
const zipObj = R.zipObj
const equals = R.equals
const mergeAll = R.mergeAll

const set = (k, v, hmap) => {
  hmap[k] = v
  return hmap
}

const log = (text) => {
  console.log(text)
}

// ==============================================
//
//              DECLARATIVE STYLE
//
// ==============================================

// move key value pairs from one object to the other
// with different key names
const swapper = ( from_key, to_key ) =>
  pipe(pick(from_key), values, zipObj(to_key))

// convert a record like {name:tim, age:35}
// to a record like {tim:{name:tim, age:35}
const keyer = ( key_field ) =>
  obj => set(obj[key_field], obj, {})

// combine swapper and keyer together
const declarativeTransformer = ( from_key, to_key, key_field ) =>
  pipe(map(swapper( from_key, to_key )), map(keyer(key_field)), mergeAll)

// ==============================================
//
//             IMPERATIVE STYLE 1
//
// ==============================================

function imperativeTranformer1 (input) {

  let swapped = []
  for(let i = 0; i < input.length; i++) {
    let n1 = input[i]
    let n2 = {
      feature: n1.id,
      enabled: n1.isEnabledForUser,
      optin: n1.isAvailableForOptIn
    }
    swapped.push(n2)
  }

  let keyed = {}
  for(let i = 0; i < input.length; i++) {
    let n1 = swapped[i]
    keyed[n1.feature] = n1
  }

  return keyed
}

// ==============================================
//
//              IMPERATIVE STYLE 2
//
// ==============================================

function imperativeTranformer2 (input, from, to, key) {
  let keyed = {}
  for(let i = 0; i < input.length; i++) {
    let n1 = input[i]
    let n2 = {}
    for(let j = 0; j < from.length; j++) {
      n2[to[j]] = n1[from[j]]
    }
    keyed[n2[key]] = n2
  }
  return keyed
}

module.exports = {
  imperativeTranformer1,
  imperativeTranformer2,
  declarativeTransformer
}
