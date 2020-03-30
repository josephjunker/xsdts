type ID = string;
type NCName = string;
type QName = string;
type anyURI = string;
type language = string;
type token = string;
type xpathDefaultNamespace = anyURI | token;
type publicIdentifier = string;

class Schema {
  preamble: Array<Include | Import | Redefine | Override | Annotation>;
  annotations: Array<Annotation>;
  defaultOpenContent: OpenContent | undefined;
  contents: Array<
    | TopLevelSimpleType
    | TopLevelComplexType
    | NamedGroup
    | NamedAttributeGroup
    | TopLevelElement
    | TopLevelAttribute
    | Notation
    | Annotation
  >;
}

class NamedAttributeGroup {
  annotation: Annotation | undefined;
  contents: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration: AnyAttribute | undefined;
  id: ID | undefined;
  name: NCName;
  anyAttributes: Map<string, string>;
}

class TopLevelElement {
  annotation: Annotation | undefined;
  elementType: LocalSimpleType | LocalComplexType | undefined;
  alternatives: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id: ID | undefined;
  type: QName | undefined;
  substitutionGroup: Array<QName>;
  default: string | undefined;
  fixed: string | undefined;
  nillable: boolean | undefined;
  abstract: boolean | undefined;
  final: "#all" | "extension" | "restriction" | undefined;
  block: "#all" | "extension" | "restriction" | "substitution" | undefined;
  name: NCName;
  anyAttributes: Map<string, string>;
}

class TopLevelSimpleType {
  annotation: Annotation | undefined;
  refinement: GlobalRestriction | List | Union;
  id: ID | undefined;
  final: "#all" | Array<"list" | "union" | "restriction" | "extension">;
  name: NCName | undefined;
  anyAttributes: Map<string, string>;
}

class Notation {
  annotation: Annotation | undefined;
  id: ID | undefined;
  name: NCName;
  public: publicIdentifier | undefined;
  system: anyURI | undefined;
  anyAttributes: Map<string, string>;
}

class TopLevelComplexType {
  annotation: Annotation | undefined;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
}

class InlineComplexContent {
  openContent: OpenContent | undefined;
  contents:
    | GroupRef
    | GlobalAll
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | undefined;
  attributes: Array<LocalAttribute | AttributeGroupRef>;
  assert: Assertion | undefined;
  anyAttributes: Map<string, string>;
}

class ChoiceExplicitGroup {
  contents: ExplicitGroup;
}

class SequenceExplicitGroup {
  contents: ExplicitGroup;
}

class ExplicitGroup {
  annotation: Annotation | undefined;
  contents: Array<
    | LocalElement
    | GroupRef
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | GlobalAny
  >;
  id: ID | undefined;
  minOccurs: number | undefined;
  maxOccurs: number | undefined;
  anyAttributes: Map<string, string>;
}

class GroupRef {
  annotation: Annotation | undefined;
  id: ID | undefined;
  minOccurs: number | undefined;
  maxOccurs: number | undefined | "unbounded";
  ref: QName;
  anyAttributes: Map<string, string>;
}

class GlobalAll {
  annotation: Annotation | undefined;
  contents: Array<LocalElement | GlobalAny | LocalGroup>;
  id: ID | undefined;
  minOccurs: 0 | 1;
  maxOccurs: 0 | 1;
  anyAttributes: Map<string, string>;
}

class LocalElement {
  annotation: Annotation | undefined;
  elementType: LocalSimpleType | LocalComplexType | undefined;
  alternatives: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id: ID | undefined;
  name: NCName | undefined;
  ref: QName | undefined;
  type: QName | undefined;
  minOccurs: number | undefined;
  maxOccurs: number | undefined;
  default: string | undefined;
  fixed: string | undefined;
  nillable: boolean | undefined;
  block:
    | "#all"
    | Array<"extension" | "restriction" | "substitution">
    | undefined;
  form: "qualified" | "unqualified";
  targetNamespace: anyURI | undefined;
  anyAttributes: Map<string, string>;
}

class Alternative {
  annotation: Annotation | undefined;
  contents: LocalSimpleType | LocalComplexType | undefined;
  id: ID | undefined;
  test: string | undefined;
  type: QName | undefined;
  xpathDefaultNamespace: xpathDefaultNamespace;
  anyAttributes: Map<string, string>;
}

class LocalComplexType {
  annotation: Annotation | undefined;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
  id: ID | undefined;
  mixed: boolean | undefined;
  defaultAttributesApply: boolean | undefined;
  anyAttributes: Map<string, string>;
}

class ComplexContent {
  annotation: Annotation | undefined;
  contents: ComplexRestriction | ComplexExtension;
  id: ID | undefined;
  mixed: boolean | undefined;
  anyAttributes: Map<string, string>;
}

class ComplexRestriction {
  annotation: Annotation | undefined;
  openContent: OpenContent | undefined;
  contents:
    | GroupRef
    | GlobalAll
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | undefined;
  id: ID | undefined;
  minOccurs: number | undefined;
  maxOccurs: number | undefined;
  anyAttributes: Map<string, string>;
}

class ComplexExtension {
  annotation: Annotation | undefined;
  openContent: OpenContent | undefined;
  contents:
    | GroupRef
    | GlobalAll
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | undefined;
  attributes: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration: AnyAttribute | undefined;
  assert: Array<Assertion>;
  id: ID | undefined;
  base: QName;
}

class SimpleContent {
  annotation: Annotation | undefined;
  contents: SimpleRestriction | SimpleExtension;
  id: ID | undefined;
  anyAttributes: Map<string, string>;
}

class SimpleRestriction {
  annotation: Annotation | undefined;
  simpleType: LocalSimpleType | undefined;
  minExclusive: Facet<string>;
  minInclusive: Facet<string>;
  maxExclusive: Facet<string>;
  maxInclusive: Facet<string>;
  totalDigits: Facet<number>;
  fractionDigits: Facet<number>;
  length: Facet<number>;
  minLength: Facet<number>;
  maxLength: Facet<number>;
  enumeration: Facet<string>;
  whiteSpace: Facet<string>;
  pattern: Facet<string>;
  assertion: Assertion;
  explicitTimezone: Facet<boolean>;
  anyElements: Array<AnyElement>;
  attributes: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration: AnyAttribute | undefined;
  assert: Array<Assertion>;
  id: ID | undefined;
  base: QName | undefined;
  anyAttributes: Map<string, string>;
}

class AnyAttribute {
  annotation: Annotation | undefined;
  id: ID | undefined;
  namespace: "##any" | "##other" | "##targetNamespace" | "##local" | undefined;
  notNamespace: Array<anyURI | "##targetNamespace" | "##local"> | undefined; // length >= 1
  processContents: "skip" | "lax" | "strict" | undefined;
  notQName: Array<QName | "##defined"> | undefined;
  anyAttributes: Map<string, string>;
}

class SimpleExtension {
  annotation: Annotation | undefined;
  contents: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration: AnyAttribute | undefined;
  assert: Array<Assertion>;
  id: ID | undefined;
  base: QName | undefined;
  anyAttributes: Map<string, string>;
}

class Unique {
  annotation: Annotation | undefined;
  selectorAndFields: SelectorAndFields | undefined;
  id: ID | undefined;
  name: NCName | undefined;
  ref: QName | undefined;
  anyAttributes: Map<string, string>;
}

class SelectorAndFields {
  selector: Selector;
  fields: Array<Field>; // Must contain at least one item
}

class Selector {
  annotation: Annotation | undefined;
  id: ID | undefined;
  xpath: string;
  xpathDefaultNamespace:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local"
    | undefined;
  anyAttributes: Map<string, string>;
}

class Field {
  annotation: Annotation | undefined;
  id: ID | undefined;
  xpath: string;
  xpathDefaultNamespace:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local"
    | undefined;
  anyAttributes: Map<string, string>;
}

class Key {
  annotation: Annotation | undefined;
  selectorAndFields: SelectorAndFields | undefined;
  id: ID | undefined;
  name: NCName | undefined;
  ref: QName | undefined;
  anyAttributes: Map<string, string>;
}

class KeyRef {
  annotation: Annotation | undefined;
  selectorAndFields: SelectorAndFields | undefined;
  id: ID | undefined;
  name: NCName | undefined;
  ref: QName | undefined;
  refer: QName | undefined;
  anyAttributes: Map<string, string>;
}

class LocalAttribute {
  annotation: Annotation | undefined;
  simpleType: LocalSimpleType | undefined;
  id: ID | undefined;
  name: NCName | undefined;
  ref: QName | undefined;
  type: QName | undefined;
  use: "prohibited" | "optional" | "required" | undefined;
  default: string | undefined;
  fixed: string | undefined;
  form: "qualified" | "unqualified" | undefined;
  targetNamespace: anyURI | undefined;
  inheritable: boolean | undefined;
  anyAttributes: Map<string, string>;
}

class AttributeGroupRef {
  annotation: Annotation | undefined;
  id: ID | undefined;
  ref: QName;
  anyAttributes: Map<string, string>;
}

class OpenContent {
  annotation: Annotation | undefined;
  any: Wildcard | undefined;
  id: ID | undefined;
  mode: "interleave" | "suffix" | undefined;
  anyAttribute: Map<string, string>;
}

class Include {
  annotation: Annotation | undefined;
  id: ID | undefined;
  schemaLocation: anyURI;
  anyAttribute: Map<string, string>;
}

class Import {
  annotation: Annotation | undefined;
  id: ID | undefined;
  namespace: anyURI | undefined;
  schemaLocation: anyURI | undefined;
  anyAttributes: Map<string, string>;
}

class Redefine {
  contents: Array<
    | Annotation
    | TopLevelSimpleType
    | TopLevelComplexType
    | NamedGroup
    | NamedAttributeGroup
  >;
  schemaLocation: anyURI;
  id: ID | undefined;
  anyAttributes: Map<string, string>;
}

class NamedGroup {
  annotation: Annotation | undefined;
  contents: LocalAll | ChoiceSimpleExplicitGroup | SequenceSimpleExplicitGroup;
  id: ID | undefined;
  name: NCName;
  anyAttributes: Map<string, string>;
}

class ChoiceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
}

class SequenceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
}

class LocalAll {
  annotation: Annotation | undefined;
  choices: Array<LocalElement | GlobalAny | LocalGroup>;
  id: ID | undefined;
  anyAttributes: Map<string, string>;
}

class GlobalAny {
  annotation: Annotation | undefined;
  id: ID | undefined;
  namespace:
    | "##any"
    | "##other"
    | Array<anyURI | "##targetNamespace" | "##local">;
  notNamespace: Array<anyURI | "##targetNamespace" | "##local">;
  processContents: "skip" | "lax" | "strict" | undefined;
  notQName: QName | "##defined" | "##definedSibling" | undefined;
  minOccurs: number | undefined;
  maxOccurs: number | undefined;
  anyAttributes: Map<string, string>;
}

class LocalGroup {
  annotation: Annotation | undefined;
  id: ID | undefined;
  ref: QName;
  minOccurs: number | undefined;
  maxOccurs: number | undefined;
  anyAttributes: Map<string, string>;
}

class Override {
  annotation: Annotation | undefined;
  contents: Array<
    | TopLevelSimpleType
    | TopLevelComplexType
    | NamedGroup
    | NamedAttributeGroup
    | TopLevelElement
    | TopLevelAttribute
    | Notation
    | Annotation
  >;
  id: ID | undefined;
  schemaLocation: anyURI;
  anyAttributes: Map<string, string>;
}

class Wildcard {
  annotation: Annotation | undefined;
  id: ID | undefined;
  namespace:
    | "##any"
    | "##other"
    | Array<anyURI | "##targetNamespace" | "##local">;
  notNamespace: Array<anyURI | "##targetNamespace" | "##local">;
  processContents: "skip" | "lax" | "strict" | undefined;
  anyAttributes: Map<string, string>;
}

class TopLevelAttribute {
  annotation: Annotation | undefined;
  simpleType: LocalSimpleType | undefined;
  id: ID | undefined;
  type: QName | undefined;
  default: string | undefined;
  fixed: string | undefined;
  name: NCName | undefined;
  inheritable: boolean | undefined;
  anyAttributes: Map<string, string>;
}

class Annotation {
  appinfo: Array<Appinfo>;
  documentation: Array<Documentation>;
  id: ID | undefined;
  anyAttributes: Map<string, string>;
}

class Appinfo {
  anyElements: Array<string | AnyElement>;
  source: anyURI | undefined;
  anyAttribute: Map<string, string>;
}

class Documentation {
  source: anyURI | undefined;
  lang: language | undefined;
  anyAttributes: Map<string, string>;
  anyElements: Array<any>;
}

class LocalSimpleType {
  annotation: Annotation | undefined;
  refinement: GlobalRestriction | List | Union;
  id: ID | undefined;
  anyAttributes: Map<string, string>;
}

class Facet<T> {
  id: ID | undefined;
  anyAttributes: Map<string, string>;
  value: T;
  fixed: boolean | undefined;
}

class GlobalRestriction {
  annotation: Annotation | undefined;
  simpleType: LocalSimpleType | undefined;
  minExclusive: Facet<string>;
  minInclusive: Facet<string>;
  maxExclusive: Facet<string>;
  maxInclusive: Facet<string>;
  totalDigits: Facet<number>;
  fractionDigits: Facet<number>;
  length: Facet<number>;
  minLength: Facet<number>;
  maxLength: Facet<number>;
  enumeration: Facet<string>;
  whiteSpace: Facet<string>;
  pattern: Facet<string>;
  assertion: Assertion;
  explicitTimezone: Facet<boolean>;
  anyElement: Array<AnyElement>; // namespace ##other
  id: ID | undefined;
  base: QName | undefined;
  anyAttributes: Map<string, string>;
}

class Assertion {
  annotation: Annotation | undefined;
  id: ID | undefined;
  test: string;
  xpathDefaultNamespace: xpathDefaultNamespace;
  anyAttributes: Map<string, string>;
}

class List {
  contents: Annotation | LocalSimpleType;
  id: ID | undefined;
  itemType: QName | undefined;
  anyAttributes: Map<string, string>;
}

class Union {
  contents: Annotation | Array<LocalSimpleType>;
  id: ID | undefined;
  memberTypes: Array<QName> | undefined;
  anyAttributes: Map<string, string>;
}

// Elements from other namespaces that may be intermingled into a schema
// These are left unprocessed as a raw element representation
class AnyElement {
  name: string;
  namespace: string;
  attributes: Map<string, string>;
  elements: Array<string | AnyElement>;
}
