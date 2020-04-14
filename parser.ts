// Parse a libxmljs data structure into our data structures

import * as xsd from "./classes";
import type { Element, Attribute } from "libxmljs";

class ParseError {}
class ParseResult<T, U> {
  parsed: T;
  remnants: U;
  constructor(parsed: T, remnants: U) {
    this.parsed = parsed;
    this.remnants = remnants;
  }
}

type Parser<T, U> = (input: U) => ParseError | ParseResult<T, U>;