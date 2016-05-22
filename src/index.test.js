// ==============================================
//
//                    IMPORTS
//
// ==============================================

let test = require('ava')
let Transformer = require('./index')
//let Transformer = require('./cheater')
const R = require('ramda')

// ==============================================
//
//                    SETUP
//
// ==============================================

const pipe = R.pipe
const map = R.map
const filter = R.filter
const reduce = R.reduce
const pick = R.pick
const values = R.values
const zipObj = R.zipObj
const equals = R.equals
const mergeAll = R.mergeAll

const set = (k, v, hmap) => {
  hmap[k] = v
  return hmap
}

// ==============================================
//
//                  FAKE DATA
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

let expected = {
  notes: {
    feature: 'notes', enabled: true, optin: false
  },
  mentor: {
    feature: 'mentor', enabled: false, optin: true
  }
}

// ==============================================
//
//                   TESTS
//
// ==============================================

test.skip('Imperative swapper', t => {
  // write a function called swapper that takes and return a record

  t.deepEqual(swapper({foo: 'bar'}) , {baz: 'bar'})
})

test.skip('Imperative keyer', t => {
  // write a function called keyer that takes and return a record: {record}

  t.deepEqual(keyer({id: '42', foo: 'bar'}) , {'42':{baz: 'bar'}})
})

test.skip('Imperative 1', t => {
  let r1 = Transformer.imperativeTranformer1(input)
  t.deepEqual(r1, expected)
})

test.skip('Imperative 2', t => {
  const r1 = Transformer.imperativeTranformer2(input,
    ['id', 'isEnabledForUser', 'isAvailableForOptIn'],
    ['feature', 'enabled', 'optin'],
    'feature'
  )
  t.deepEqual(r1, expected)
})


// ==============================================
//
//                 DECLARATIVE
//
// ==============================================

test.skip('Declarative map', t => {
  // create a function called mapper that multiplies each element by 2
  // and returns a new list, should not modify the input list
  // use the Ramda map function supplied above

  let data = [1, 2, 3]
  let data_x2 = mapper(data)
  t.deepEqual(data_x2, [2, 4, 6])
  t.deepEqual(data, [1, 2, 3])
})

test.skip('Declarative filter', t => {
  // create a function called filterer that only return elements < 2
  // and returns a new list, should not modify the input list
  // use the Ramda filter function supplied above

  let data = [1, 2, 3]
  let data_lessthan2 = filterer(data)
  t.deepEqual(data_lessthan2, [1])
  t.deepEqual(data, [1, 2, 3])
})

test.skip('Declarative reduce', t => {
  // create a function called reducerer that sums a list of elements
  // and returns a new list, should not modify the input list
  // use the Ramda reduce function supplied above

  let data = [1, 2, 3]
  let data_lessthan2 = filterer(data)
  t.deepEqual(data_lessthan2, [1])
  t.deepEqual(data, [1, 2, 3])
})

test.skip('Declarative 1', t => {
  const f = Transformer.declarativeTransformer(
    ['id', 'isEnabledForUser', 'isAvailableForOptIn'],
    ['feature', 'enabled', 'optin'],
    'feature'
  )
  let r1 = f(input)
  t.deepEqual(r1, expected)
})
