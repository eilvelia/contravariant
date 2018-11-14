// @flow

const FL = {
  contramap: 'fantasy-land/contramap',
  profunctor: 'fantasy-land/profunctor'
}

// ---

// https://github.com/fantasyland/fantasy-land#contravariant

export type Contravariant<-A> = {
  contramap<B>(fn: B => A): Contravariant<B>
}

export interface IContravariant<-A> {
  contramap<B>(fn: B => A): Contravariant<B>
}

// ---

export type PredFn<-A> = A => boolean

export class Predicate<-A> implements IContravariant<A> {
  +f: PredFn<A>

  constructor(f: PredFn<A>) { this.f = f }

  getPredicate(): PredFn<A> { return this.f }

  contramap<B>(fn: B => A): Predicate<B> {
    return new Predicate(x => this.f(fn(x)))
  }

  // $FlowFixMe
  [FL.contramap] = this.contramap
}

// ---

export type CompFn<-A> = (A, A) => number

export class Comparison<-A> implements IContravariant<A> {
  +f: CompFn<A>

  constructor(f: CompFn<A>) { this.f = f }

  getComparison(): CompFn<A> { return this.f }

  contramap<B>(fn: B => A): Comparison<B> {
    return new Comparison((a, b) => this.f(fn(a), fn(b)))
  }

  // $FlowFixMe
  [FL.contramap] = this.contramap
}

/** Default comparison for numbers. */
export function defaultComparison(): Comparison<number> {
  return new Comparison((a, b) => a - b)
}

// ---

export type EqFn<-A> = (A, A) => boolean

export class Equivalence<-A> implements IContravariant<A> {
  +f: EqFn<A>

  constructor(f: EqFn<A>) { this.f = f }

  getEquivalence(): EqFn<A> { return this.f }

  contramap<B>(fn: B => A): Equivalence<B> {
    return new Equivalence((a, b) => this.f(fn(a), fn(b)))
  }

  // $FlowFixMe
  [FL.contramap] = this.contramap
}

/** Check for equivalence with `===`. */
export function defaultEquivalence<A>(): Equivalence<A> {
  return new Equivalence((a, b) => a === b)
}

// ---

export class Op<+A, -B> implements IContravariant<B> {
  +f: B => A

  constructor(f: B => A) { this.f = f }

  getOp(): B => A { return this.f }

  contramap<BB>(fn: BB => B): Op<A, BB> {
    return new Op(b => this.f(fn(b)))
  }

  // $FlowFixMe
  [FL.contramap] = this.contramap
}

// ---
// ---

// https://github.com/fantasyland/fantasy-land#profunctor

export type Profunctor<-B, +C> = {
  dimap<A, D>(fn1: A => B, fn2: C => D): Profunctor<A, D>
}

export interface IProfunctor<-B, +C> {
  dimap<A, D>(fn1: A => B, fn2: C => D): Profunctor<A, D>
}
