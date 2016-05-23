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
const zip = R.zip
const zipObj = R.zipObj
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

// the goal is to turn a data structure that looks like input
// into a structure that looks like expected using both
// imperative and declarative styles

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
//                   IMPERATIVE
//
// ==============================================

test.skip('Imperative swapper', t => {
  // write a function called swapper that takes and return a record
  // with the keys swapped out

  t.deepEqual(swapper({foo: 'bar'}) , {baz: 'bar'})
})

test.skip('Imperative keyer', t => {
  // write a function called keyer that takes a record and returns
  // a new record with a key set to the value of the whole record

  t.deepEqual(keyer({id: '42', foo: 'bar'}) , {'42':{id: '42', baz: 'bar'}})
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

test.skip('curry', t => {
  // create a function called add that takes one argument and
  // returns another function that takes one argument and returns
  // the two numbers added together


  let add2 = add(2)
  t.deepEqual(add2(2), 4)
})

test.skip('map', t => {
  // create a function called mapper that multiplies each element by 2
  // and returns a new list, should not modify the input list
  // use the Ramda map function supplied above


  t.deepEqual(
    mapper( [1, 2, 3] ),
    [2, 4, 6]
  )
  t.deepEqual(data, [1, 2, 3])
})

test.skip('filter', t => {
  // create a function called filterer that only return elements < 2
  // and returns a new list, should not modify the input list
  // use the Ramda filter function supplied above


  t.deepEqual(
    filterer( [1, 2, 3] ),
    [1]
  )
  t.deepEqual(data, [1, 2, 3])
})

test.skip('reduce', t => {
  // create a function called reducerer that sums a list of elements
  // and returns a single number, should not modify the input list
  // use the Ramda reduce function supplied above


  t.deepEqual(
    reducerer( [1, 2, 3] ),
    6
  )
  t.deepEqual(data, [1, 2, 3])
})

test.skip('values', t => {
  // create a function called justvalues and use the values function


  t.deepEqual(
    justvalues( {first:1, second: 2, third: 3} ),
    [1, 2, 3]
  )
})

test.skip('pick', t => {
  // create a function called picker use the pick function


  t.deepEqual(
    picker( {first:1, second: 2, third: 3} ),
    {first: 1, third: 3}
  )
})

test.skip('pluck', t => {
  // create a function called plucker use the pluck function


  t.deepEqual(
    plucker( [{f1: 1, f2: 3}, {f1: 1, f2: 2}, {f1: 1, f2: 4}] ),
    [3, 2, 4]
  )
})

test.skip('zip', t => {
  // create a function called zipper1 and use the zip function


  t.deepEqual(
    zipper1( ['first', 'second', 'third'], [1, 2, 3]),
    [['first', 1], ['second', 2], ['third', 3]]
  )
})

test.skip('zipObj', t => {
  // create a function called zipper2 and use the zipObj function


  t.deepEqual(
    zipper2( ['first', 'second', 'third'], [1, 2, 3] ),
    {first:1, second: 2, third: 3}
  )
})

test.skip('pipe', t => {
  // use the pipe function to double a list of numbers then
  // filter out the numbers > 5, call the function data_pipeline


  t.deepEqual(
    data_pipeline([1, 2, 3]),
    [2, 4]
  )
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
