const R = require('ramda')
const assert = require('assert')

const log = (text) => {
  console.log(text)
}

log('starting...')

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

const set = (k, v, hmap) => {
    hmap[k] = v
    return hmap
}
const objectSwapper = (from, to) => R.pipe(R.pick(from), R.values, R.zipObj(to))
const extractKey = (agg, n) => set(n[key], n, agg)
const arrayToKeyed = (key, arr) => R.reduce(extractKey, {}, arr)
const swapAndKey = (from, to, input_obj) => {
  const swapper = objectSwapper(from, to)
  const swapped = R.map(swapper, input)
  return arrayToKeyed('feature', swapped)
}
const k1 = swapAndKey(
  ['id','isEnabledForUser','isAvailableForOptIn'],
  ['feature', 'enabled', 'optin'],
  input
)

assert.deepEqual(k1, output)
log(JSON.stringify(input, true, 4))
log(JSON.stringify(output, true, 4))
