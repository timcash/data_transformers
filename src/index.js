// ==============================================
//
//                    IMPORTS
//
// ==============================================
const R = require('ramda')
const assert = require('assert')

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
//               OUR SAMPLE DATA
//
// ==============================================

let input = [{
  'id': 'notes',
  'displayName': 'Test Feature',
  'description': 'A really great test feature',
  'isAvailableForOptIn': false,
  'isEnabledForUser': true,
  'canToggle': true
}, {
  'id': 'mentor',
  'displayName': 'Test Feature',
  'description': 'A really great test feature',
  'isAvailableForOptIn': true,
  'isEnabledForUser': false,
  'canToggle': true
}]

let output = {
  notes: {
    feature: 'notes', enabled: true, optin: false
  },
  mentor: {
    feature: 'mentor', enabled: false, optin: true
  }
}

// ==============================================
//
//              DECLARATIVE STYLE
//
// ==============================================

// Forced to break the problem down

// move key value pairs from one object to the other
// with different key names
const swapper = ( from_key, to_key ) =>
  pipe(pick(from_key), values, zipObj(to_key))

// convert a record like {name:tim, age:35}
// to a record like {tim:{name:tim, age:35}
const keyer = ( key_field ) =>
  obj => set(obj[key_field], obj, {})

// combine swapper and keyer together
const swapAndKey = ( from_key, to_key, key_field ) =>
  pipe(map(swapper( from_key, to_key )), map(keyer(key_field)))

// supply the from and to
const myDataTransformer = swapAndKey(
  ['id', 'isEnabledForUser', 'isAvailableForOptIn'],
  ['feature', 'enabled', 'optin'],
  'feature'
)

// only here do we actually do any work
const t1 = mergeAll(myDataTransformer(input))

if(equals(t1, output)) console.log('declarative they are equal')
console.log(t1)

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


// only here do we actually do any work
const t2 = imperativeTranformer1(input)

if(equals(t2, output)) console.log('imperative they are equal')
console.log(t2)

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

// only here do we actually do any work
const t3 = imperativeTranformer2(input,
  ['id', 'isEnabledForUser', 'isAvailableForOptIn'],
  ['feature', 'enabled', 'optin'],
  'feature'
)

if(equals(t3, output)) console.log('imperative they are equal 2')
console.log(t3)
