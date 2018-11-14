# contravariant

[![npm](https://img.shields.io/npm/v/contravariant.svg)](https://www.npmjs.com/package/contravariant)
[![Build Status](https://travis-ci.org/Bannerets/contravariant.svg?branch=master)](https://travis-ci.org/Bannerets/contravariant)

Contravariant functors in JavaScript with [Flow](https://flow.org/).

Mainly inspired by haskell [contravariant](https://hackage.haskell.org/package/contravariant).

See [src/index.js](src/index.js).

## API

`interface IContravariant<-A>`

- `contramap<B>(fn: B => A): Contravariant<B>`

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

---

`class Equivalence<-A>`

- `constructor(f: (A, A) => boolean)`
- `getEquivalence(): (A, A) => boolean`
- `contramap<B>(fn: B => A): Equivalence<B>`

---

`class Op<+A, -B>`

- `constructor(f: B => A)`
- `getOp(): B => A`
- `contramap<BB>(fn: BB => B): Op<A, BB>`

## See also

- https://hackage.haskell.org/package/contravariant-1.5/docs/Data-Functor-Contravariant.html
- https://github.com/fantasyland/fantasy-land#contravariant
- https://gist.github.com/Bannerets/07a71802e3468d252924091a65ac2b3c
- https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/profunctors
