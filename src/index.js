// @flow

const FL = {
  contramap: 'fantasy-land/contramap',
  promap: 'fantasy-land/promap'
}

// ---

// https://github.com/fantasyland/fantasy-land#contravariant

export type Contravariant<-A> = {
  contramap<B>(fn: B => A): Contravariant<B>
}

export interface IContravariant<-A> {
  contramap<B>(fn: B => A): IContravariant<B>
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
    return new Op(bb => this.f(fn(bb)))
  }

  // $FlowFixMe
  [FL.contramap] = this.contramap
}

// ---
// ---

// https://github.com/fantasyland/fantasy-land#profunctor

export type Profunctor<-B, +C> = {
  promap<A, D>(fn1: A => B, fn2: C => D): Profunctor<A, D>
}

export interface IProfunctor<-B, +C> {
  promap<A, D>(fn1: A => B, fn2: C => D): IProfunctor<A, D>
}

// ---

export class Arrow<-B, +C> implements IProfunctor<B, C> {
  +f: B => C

  constructor(f: B => C) { this.f = f }

  getArrow(): B => C { return this.f }

  promap<A, D>(fn1: A => B, fn2: C => D): Arrow<A, D> {
    return new Arrow(a => fn2(this.f(fn1(a))) )
  }

  lmap<A>(fn1: A => B): Arrow<A, C> {
    return this.promap(fn1, x => x)
  }

  rmap<D>(fn2: C => D): Arrow<B, D> {
    return this.promap(x => x, fn2)
  }

  // $FlowFixMe
  [FL.promap] = this.promap
}
