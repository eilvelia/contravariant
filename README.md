# contravariant

[![npm](https://img.shields.io/npm/v/contravariant.svg)](https://www.npmjs.com/package/contravariant)
[![Build Status](https://travis-ci.org/Bannerets/contravariant.svg?branch=master)](https://travis-ci.org/Bannerets/contravariant)

Contravariant functors in JavaScript with [Flow](https://flow.org/).

Mainly inspired by haskell [contravariant](https://hackage.haskell.org/package/contravariant).

See [src/index.js](src/index.js) and [test/index.test.js](test/index.test.js).

## Installation

```console
$ npm install contravariant
```

## API

`interface IContravariant<-A>`

- `contramap<B>(fn: B => A): IContravariant<B>`

---

`class Predicate<-A>`

- `constructor(f: A => boolean)`
- `getPredicate(): A => boolean`
- `contramap<B>(fn: B => A): Predicate<B>`

---

`class Comparison<-A>`

- `constructor(f: (A, A) => number)`
- `getComparison(): (A, A) => number`
- `contramap<B>(fn: B => A): Comparison<B>`

`function defaultComparison(): Comparison<number>`

---

`class Equivalence<-A>`

- `constructor(f: (A, A) => boolean)`
- `getEquivalence(): (A, A) => boolean`
- `contramap<B>(fn: B => A): Equivalence<B>`

`function defaultEquivalence<A>(): Equivalence<A>`

---

`class Op<+A, -B>`

- `constructor(f: B => A)`
- `getOp(): B => A`
- `contramap<BB>(fn: BB => B): Op<A, BB>`

---

### Profunctors

`interface IProfunctor<-B, +C>`

- `promap<A, D>(fn1: A => B, fn2: C => D): IProfunctor<A, D>`

---

`class Arrow<-B, +C>`

- `constructor(f: B => C)`
- `getArrow(): B => C`
- `promap<A, D>(fn1: A => B, fn2: C => D): Arrow<A, D>`
- `lmap<A>(fn1: A => B): Arrow<A, C>`
- `rmap<D>(fn2: C => D): Arrow<B, D>`

## See also

- https://hackage.haskell.org/package/contravariant-1.5/docs/Data-Functor-Contravariant.html
- https://gist.github.com/Bannerets/07a71802e3468d252924091a65ac2b3c
- https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/profunctors
- https://www.fpcomplete.com/blog/2016/11/covariance-contravariance
- https://hackage.haskell.org/package/profunctors-5.3/docs/Data-Profunctor.html
- https://github.com/fantasyland/fantasy-land#contravariant
- https://github.com/fantasyland/fantasy-land#profunctor
