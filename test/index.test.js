// @flow

import {
  Predicate,
  Comparison,
  Equivalence,
  defaultEquivalence,
  Op,
} from '../src'

describe('Predicate', () => {
  /*::
  const isEven: Predicate<number> = new Predicate(x => x % 2 === 0)
  const isEvenStr = isEven.contramap(parseInt)
  const pred: string => boolean = isEvenStr.getPredicate()
  const bool: boolean = pred('2')
  // $ExpectError
  pred(2)
  // $ExpectError
  isEven.getPredicate()('2')
  isEven.getPredicate()(2)
  */

  test('basic', () => {
    const isEven = new Predicate(x => x % 2 === 0)
    const isEvenStr = isEven.contramap(parseInt)
    const pred = isEvenStr.getPredicate()
    expect(pred('2')).toBe(true)
    expect(pred('3')).toBe(false)
    expect(pred('900')).toBe(true)
    const isEvenPred = isEven.getPredicate()
    expect(isEvenPred(90)).toBe(true)
    expect(isEvenPred(91)).toBe(false)
  })
})

describe('Equivalence', () => {
  /*::
  const _eq0: Equivalence<number> = defaultEquivalence()
  // $ExpectError
  const _eq1 = _eq0.contramap(a => a.trim())
  const _f = _eq1.getEquivalence()
  _f(2, 3)
  // $ExpectError
  ;(_eq0: Equivalence<string>)
  */

  test('basic', () => {
    const eq = defaultEquivalence()

    const eq2 = eq.contramap(a => a % 2)

    const t = eq2.getEquivalence()(4, 6)
    expect(t).toBe(true)

    const f = eq2.getEquivalence()(5, 6)
    expect(f).toBe(false)
  })

  test('custom EqFn', () => {
    const eq1 = new Equivalence((a, b) => (a + 3) === b)
    const eq2 = eq1.contramap(a => a % 2)

    const f1 = eq1.getEquivalence()
    const f2 = eq2.getEquivalence()

    expect(f1(1, 4)).toBe(true)
    expect(f1(4, 1)).toBe(false)
    expect(f1(4, 4)).toBe(false)

    expect(f2(1, 4)).toBe(false)
    expect(f2(4, 1)).toBe(false)
    expect(f2(4, 4)).toBe(false)
  })

  test('identity', () => {
    const eq1 = defaultEquivalence()
    const eq2 = eq1.contramap(a => a)

    const f1 = eq1.getEquivalence()
    const f2 = eq2.getEquivalence()

    expect(f1(24, 25)).toBe(f2(24, 25))
    expect(f1('str', 'str')).toBe(f2('str', 'str'))
    const rand = Math.random().toString()
    const rand2 = Math.random().toString()
    expect(f1(rand, rand2)).toBe(f2(rand, rand2))
  })

  test('composition', () => {
    const f = (x: number): string => x.toString()
    const g = (x: number): number => x + 2

    const u = defaultEquivalence()

    const eq1 = u.contramap(x => f(g(x)))
    const eq2 = u.contramap(f).contramap(g)

    const f1 = eq1.getEquivalence()
    const f2 = eq2.getEquivalence()

    expect(f1(52, 24)).toBe(f2(52, 24))
    expect(f1(80, 80)).toBe(f2(80, 80))
    const rand = Math.random()
    expect(f1(rand, rand)).toBe(f2(rand, rand))
  })
})
