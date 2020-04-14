export class NonEmptyArray<A> {
  first: A;
  rest: Array<A>;
  constructor(first: A, rest: Array<A>) {
    this.first = first;
    this.rest = rest;
  }
}
