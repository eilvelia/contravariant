// @flow

import {
  type Contravariant,
  type IContravariant,
  Predicate,
  Comparison,
  defaultComparison,
  Equivalence,
  defaultEquivalence,
  Op,
  Arrow,
} from '../src'

describe('Predicate', () => {
  /*::
  const _isEven: Predicate<number> = new Predicate(x => x % 2 === 0)
  const _isEvenStr = _isEven.contramap(parseInt)
  const _pred: string => boolean = _isEvenStr.getPredicate()
  const _bool: boolean = _pred('2')
  // $ExpectError
  _pred(2)
  // $ExpectError
  _isEven.getPredicate()('2')
  _isEven.getPredicate()(2)
  ;(_isEven: Contravariant<number>)
  ;(_isEven: IContravariant<number>)
  // $ExpectError
  ;(_isEven: IContravariant<string>)
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

  test('fantasy-land', () => {
    const p = new Predicate(_ => true)
    // $FlowFixMe
    expect(p['fantasy-land/contramap']).toBe(p.contramap)
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

describe('Arrow', () => {
  /*::
  const _arrow1 = new Arrow(x => x.toString())
  const _arrow2 = _arrow1.promap(x => x + 2, str => str + 'abc')
  const _arrow3 = _arrow2.promap(x => x * 3, str => str + 'def')
  const _arrow4 = _arrow3.promap((x: string) => parseInt(x), str => str + 'def')
  const _fn = _arrow4.getArrow()
  const _result = _fn('3')
  ;(_arrow1: Arrow<number, string>)
  ;(_arrow2: Arrow<number, string>)
  ;(_arrow3: Arrow<number, string>)
  ;(_arrow4: Arrow<string, string>)
  ;(_fn: string => string)
  ;(_result: string)
  // $ExpectError
  ;(_result: number)
  */

  test('basic', () => {
    const arrow1 = new Arrow((x: number): string => x.toString())

    const arrow2 = arrow1.promap(x => x + 2, str => str + 'abc')
    const arrow3 = arrow2.promap(x => x * 3, str => str + 'def')

    const fn = arrow3.getArrow()

    const result = fn(3)

    expect(result).toBe('11abcdef')
  })

  test('identity', () => {
    const p1 = new Arrow((x: number) => x.toString())
    const p2 = p1.promap(a => a, b => b)

    const f1 = p1.getArrow()
    const f2 = p2.getArrow()

    expect(f1(2)).toBe(f2(2))
    expect(f1(5)).toBe(f2(5))
    expect(f1(6)).toBe('6')
    expect(f2(6)).toBe('6')
    const rand = Math.random()
    expect(f1(rand)).toBe(f2(rand))
  })

  test('composition', () => {
    const f = x => x + 2
    const g = x => x * 3
    const i = str => str + 'abc'
    const h = str => str + 'def'

    const p = new Arrow((x: number) => x.toString())

    const p1 = p.promap(a => f(g(a)), b => h(i(b)))
    const p2 = p.promap(f, i).promap(g, h)

    const f1 = p1.getArrow()
    const f2 = p2.getArrow()

    expect(f1(3)).toBe(f2(3))
    expect(f1(0)).toBe(f2(0))
    expect(f1(5)).toBe(f2(5))
    const rand = Math.random()
    expect(f1(rand)).toBe(f2(rand))
  })

  test('fantasy-land', () => {
    const p = new Arrow(_ => true)
    // $FlowFixMe
    expect(p['fantasy-land/promap']).toBe(p.promap)
  })
})
