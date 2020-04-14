import { Document, Element, Attribute, Node } from "libxmljs";

export class Attr {
  name: string;
  value: string;
  namespacePrefix?: string;
  namespaceHref?: string;
  constructor(
    name: string,
    value: string,
    namespacePrefix?: string,
    namespaceHref?: string
  ) {
    this.name = name;
    this.value = value;
    this.namespacePrefix = namespacePrefix;
    this.namespaceHref = namespaceHref;
  }
}

export class AttrMap {
  private attributes: Array<Attr>;
  constructor(attributes: Array<Attr>) {
    this.attributes = attributes;
  }
  find(name: string, namespaceHref?: string): string | undefined {
    return this.attributes.find(
      x => x.name === name && x.namespaceHref === namespaceHref
    )?.value;
  }
}

export class Elem {
  name: string;
  namespace?: string;
  attributes: AttrMap;
  children: Array<Elem | string>;

  constructor(
    name: string,
    attributes: AttrMap,
    children: Array<Elem | string>
  ) {
    this.name = name;
    this.attributes = attributes;
    this.children = children;
  }
}

type NodeResolver<T> = {
  attribute: (a: Attribute) => T;
  element: (e: Element) => T;
  text: (e: string) => T;
  comment: (s: string) => T;
};

function resolveNode<T>(
  node: Node,
  { attribute, element, text, comment }: NodeResolver<T>
) {
  const type: string = node.type();

  // The `type` field tells us which subtype of Node we have, so
  // we do type coercions based on this
  if (type === "attribute") {
    const cast: Attribute = node as any;
    return attribute(cast);
  } else if (type === "element") {
    const cast: Element = node as any;
    return element(cast);
  } else if (type === "text") {
    const cast: Element = node as any;
    return text(cast.text());
  } else if (type === "comment") {
    // There is actually a `Comment` type, distinct from `Element`,
    // but this type is missing in our libdef and all we need is
    // the `text()` method anyway.
    const cast: Element = node as any;
    return comment(cast.text());
  } else {
    // node may be a DTD, processing instruction, or CDATA, none
    // of which I'm going to handle for now.
    throw new Error("Unsupported node type: " + type);
  }
}

export function convertDocument(raw: Document): Elem {
  function removeWhitespaceNodes(s: Elem | string) {
    return s instanceof Elem || s.trim() != "";
  }

  function recursive(raw: Element): Elem | string {
    return new Elem(
      raw.name(),
      convertAttributes(raw.attrs()),
      raw
        .childNodes()
        .map(child =>
          resolveNode(child, {
            attribute: function(a) {
              throw new Error(
                "TILT: an attribute should not be a child of an element"
              );
            },
            element: recursive,
            text: s => s,
            comment: s => ""
          })
        )
        .filter(removeWhitespaceNodes)
    );
  }

  const root = raw.root();
  if (root === null) throw new Error("Document must have a root node");

  const result = recursive(root);
  if (!(result instanceof Elem))
    throw new Error("TILT: root node must be an element");
  return result;
}

function convertAttributes(attrs: Array<Attribute>): AttrMap {
  const result = [];

  for (const attr of attrs) {
    const namespace = attr.namespace();
    result.push(
      new Attr(
        attr.name(),
        attr.value(),
        namespace ? namespace.prefix() : undefined,
        namespace ? namespace.href() : undefined
      )
    );
  }

  return new AttrMap(result);
}
