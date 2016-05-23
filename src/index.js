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
const filter = R.filter
const map = R.map
const pick = R.pick
const values = R.values
const zipObj = R.zipObj
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
//             IMPERATIVE STYLE 1
//
// ==============================================

function imperativeTranformer1 (input) {

}

// ==============================================
//
//              IMPERATIVE STYLE 2
//
// ==============================================

function imperativeTranformer2 (input, from_keys, to_keys, index_key) {

}

// ==============================================
//
//              DECLARATIVE STYLE
//
// ==============================================

// move key value pairs from one object to the other
// {isFeatureEnabled: false, color: red} => {enabled: false, colour: red}
const swapper = ( from_keys, to_keys ) => {}

// "key" a record
// {name:tim, age:35} => {tim:{name:tim, age:35}
const keyer = ( index_key ) => {}

// combine swapper and keyer together then merge them
const declarativeTransformer = ( from_keys, to_keys, index_key ) => {}

module.exports = {
  imperativeTranformer1,
  imperativeTranformer2,
  declarativeTransformer
}
