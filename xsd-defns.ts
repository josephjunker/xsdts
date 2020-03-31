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
  annotation?: Annotation;
  contents: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  id?: ID;
  name: NCName;
  anyAttributes?: Map<string, string>;
}

class TopLevelElement {
  annotation?: Annotation;
  elementType?: LocalSimpleType | LocalComplexType;
  alternatives: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id?: ID;
  type?: QName;
  substitutionGroup: Array<QName>;
  default?: string;
  fixed?: string;
  nillable?: boolean;
  abstract?: boolean;
  final?: "#all" | "extension" | "restriction";
  block?: "#all" | "extension" | "restriction" | "substitution";
  name: NCName;
  anyAttributes?: Map<string, string>;
}

class TopLevelSimpleType {
  annotation?: Annotation;
  refinement: GlobalRestriction | List | Union;
  id?: ID;
  final: "#all" | Array<"list" | "union" | "restriction" | "extension">;
  name?: NCName;
  anyAttributes?: Map<string, string>;
}

class Notation {
  annotation?: Annotation;
  id?: ID;
  name: NCName;
  public?: publicIdentifier;
  system?: anyURI;
  anyAttributes?: Map<string, string>;
}

class TopLevelComplexType {
  annotation?: Annotation;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
}

class InlineComplexContent {
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  attributes: Array<LocalAttribute | AttributeGroupRef>;
  assert?: Assertion;
  anyAttributes?: Map<string, string>;
}

class ChoiceExplicitGroup {
  contents: ExplicitGroup;
}

class SequenceExplicitGroup {
  contents: ExplicitGroup;
}

class ExplicitGroup {
  annotation?: Annotation;
  contents: Array<
    | LocalElement
    | GroupRef
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | GlobalAny
  >;
  id?: ID;
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
}

class GroupRef {
  annotation?: Annotation;
  id: ID;
  minOccurs?: number;
  maxOccurs?: number | "unbounded";
  ref: QName;
  anyAttributes?: Map<string, string>;
}

class GlobalAll {
  annotation?: Annotation;
  contents: Array<LocalElement | GlobalAny | LocalGroup>;
  id?: ID;
  minOccurs: 0 | 1;
  maxOccurs: 0 | 1;
  anyAttributes?: Map<string, string>;
}

class LocalElement {
  annotation?: Annotation;
  elementType?: LocalSimpleType | LocalComplexType;
  alternatives: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id?: ID;
  name?: NCName;
  ref?: QName;
  type?: QName;
  minOccurs?: number;
  maxOccurs?: number;
  default?: string;
  fixed?: string;
  nillable?: boolean;
  block?: "#all" | Array<"extension" | "restriction" | "substitution">;
  form?: "qualified" | "unqualified";
  targetNamespace?: anyURI;
  anyAttributes?: Map<string, string>;
}

class Alternative {
  annotation?: Annotation;
  contents?: LocalSimpleType | LocalComplexType;
  id?: ID | undefined;
  test?: string;
  type?: QName;
  xpathDefaultNamespace: xpathDefaultNamespace;
  anyAttributes?: Map<string, string>;
}

class LocalComplexType {
  annotation?: Annotation;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
  id?: ID;
  mixed?: boolean;
  defaultAttributesApply?: boolean;
  anyAttributes?: Map<string, string>;
}

class ComplexContent {
  annotation?: Annotation;
  contents: ComplexRestriction | ComplexExtension;
  id?: ID;
  mixed?: boolean;
  anyAttributes?: Map<string, string>;
}

class ComplexRestriction {
  annotation?: Annotation;
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  id?: ID;
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
}

class ComplexExtension {
  annotation?: Annotation;
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  attributes: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert: Array<Assertion>;
  id?: ID;
  base: QName;
}

class SimpleContent {
  annotation?: Annotation;
  contents: SimpleRestriction | SimpleExtension;
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class SimpleRestriction {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  minExclusive?: Facet<string>;
  minInclusive?: Facet<string>;
  maxExclusive?: Facet<string>;
  maxInclusive?: Facet<string>;
  totalDigits?: Facet<number>;
  fractionDigits?: Facet<number>;
  length?: Facet<number>;
  minLength?: Facet<number>;
  maxLength?: Facet<number>;
  enumeration?: Facet<string>;
  whiteSpace?: Facet<string>;
  pattern?: Facet<string>;
  assertion?: Assertion;
  explicitTimezone?: Facet<boolean>;
  anyElements?: Array<AnyElement>;
  attributes?: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert?: Array<Assertion>;
  id?: ID;
  base?: QName;
  anyAttributes?: Map<string, string>;
}

class AnyAttribute {
  annotation?: Annotation;
  id?: ID;
  namespace?: "##any" | "##other" | "##targetNamespace" | "##local";
  notNamespace?: Array<anyURI | "##targetNamespace" | "##local">; // length >= 1
  processContents?: "skip" | "lax" | "strict";
  notQName?: Array<QName | "##defined">;
  anyAttributes?: Map<string, string>;
}

class SimpleExtension {
  annotation?: Annotation;
  contents: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert: Array<Assertion>;
  id?: ID;
  base?: QName;
  anyAttributes?: Map<string, string>;
}

class Unique {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  anyAttributes?: Map<string, string>;
}

class SelectorAndFields {
  selector: Selector;
  fields: Array<Field>; // Must contain at least one item
}

class Selector {
  annotation?: Annotation;
  id?: ID;
  xpath: string;
  xpathDefaultNamespace?:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local";
  anyAttributes?: Map<string, string>;
}

class Field {
  annotation?: Annotation;
  id?: ID;
  xpath: string;
  xpathDefaultNamespace?:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local";
  anyAttributes?: Map<string, string>;
}

class Key {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  anyAttributes?: Map<string, string>;
}

class KeyRef {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  refer?: QName;
  anyAttributes?: Map<string, string>;
}

class LocalAttribute {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  id?: ID;
  name?: NCName;
  ref?: QName;
  type?: QName;
  use?: "prohibited" | "optional" | "required";
  default?: string;
  fixed?: string;
  form?: "qualified" | "unqualified";
  targetNamespace?: anyURI;
  inheritable?: boolean;
  anyAttributes?: Map<string, string>;
}

class AttributeGroupRef {
  annotation?: Annotation;
  id?: ID;
  ref: QName;
  anyAttributes?: Map<string, string>;
}

class OpenContent {
  annotation?: Annotation;
  any?: Wildcard;
  id?: ID;
  mode?: "interleave" | "suffix";
  anyAttributes?: Map<string, string>;
}

class Include {
  annotation?: Annotation;
  id?: ID;
  schemaLocation: anyURI;
  anyAttributes?: Map<string, string>;
}

class Import {
  annotation?: Annotation;
  id?: ID;
  namespace?: anyURI;
  schemaLocation?: anyURI;
  anyAttributes?: Map<string, string>;
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
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class NamedGroup {
  annotation?: Annotation;
  contents: LocalAll | ChoiceSimpleExplicitGroup | SequenceSimpleExplicitGroup;
  id?: ID;
  name: NCName;
  anyAttributes?: Map<string, string>;
}

class ChoiceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
}

class SequenceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
}

class SimpleExplicitGroup {
  annotation?: Annotation | undefined;
  contents?: Array<
    | LocalElement
    | GroupRef
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | GlobalAny
  >;
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class LocalAll {
  annotation?: Annotation;
  choices: Array<LocalElement | GlobalAny | LocalGroup>;
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class GlobalAny {
  annotation?: Annotation;
  id?: ID;
  namespace?:
    | "##any"
    | "##other"
    | Array<anyURI | "##targetNamespace" | "##local">;
  notNamespace?: Array<anyURI | "##targetNamespace" | "##local">;
  processContents?: "skip" | "lax" | "strict";
  notQName?: QName | "##defined" | "##definedSibling";
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
}

class LocalGroup {
  annotation?: Annotation;
  id?: ID;
  ref: QName;
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
}

class Override {
  annotation?: Annotation;
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
  id?: ID;
  schemaLocation: anyURI;
  anyAttributes?: Map<string, string>;
}

class Wildcard {
  annotation?: Annotation;
  id?: ID;
  namespace?:
    | "##any"
    | "##other"
    | Array<anyURI | "##targetNamespace" | "##local">;
  notNamespace?: Array<anyURI | "##targetNamespace" | "##local">;
  processContents?: "skip" | "lax" | "strict";
  anyAttributes?: Map<string, string>;
}

class TopLevelAttribute {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  id?: ID;
  type?: QName;
  default?: string;
  fixed?: string;
  name?: NCName;
  inheritable?: boolean;
  anyAttributes?: Map<string, string>;
}

class Annotation {
  appinfo: Array<Appinfo>;
  documentation: Array<Documentation>;
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class Appinfo {
  anyElements?: Array<string | AnyElement>;
  source?: anyURI;
  anyAttributes?: Map<string, string>;
}

class Documentation {
  source?: anyURI;
  lang?: language;
  anyAttributes?: Map<string, string>;
  anyElements?: Array<AnyElement>;
}

class LocalSimpleType {
  annotation?: Annotation;
  refinement: GlobalRestriction | List | Union;
  id?: ID;
  anyAttributes?: Map<string, string>;
}

class Facet<T> {
  id?: ID;
  anyAttributes?: Map<string, string>;
  value: T;
  fixed?: boolean;
}

class GlobalRestriction {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  minExclusive?: Facet<string>;
  minInclusive?: Facet<string>;
  maxExclusive?: Facet<string>;
  maxInclusive?: Facet<string>;
  totalDigits?: Facet<number>;
  fractionDigits?: Facet<number>;
  length?: Facet<number>;
  minLength?: Facet<number>;
  maxLength?: Facet<number>;
  enumeration?: Facet<string>;
  whiteSpace?: Facet<string>;
  pattern?: Facet<string>;
  assertion?: Assertion;
  explicitTimezone?: Facet<boolean>;
  anyElement?: Array<AnyElement>; // namespace ##other
  id?: ID;
  base?: QName;
  anyAttributes?: Map<string, string>;
}

class Assertion {
  annotation?: Annotation;
  id?: ID;
  test?: string;
  xpathDefaultNamespace?: xpathDefaultNamespace;
  anyAttributes?: Map<string, string>;
}

class List {
  annotation?: Annotation;
  contents?: LocalSimpleType;
  id?: ID;
  itemType?: QName;
  anyAttributes?: Map<string, string>;
}

class Union {
  annotation?: Annotation;
  contents?: Array<LocalSimpleType>;
  id?: ID;
  memberTypes?: Array<QName>;
  anyAttributes?: Map<string, string>;
}

// Elements from other namespaces that may be intermingled into a schema
// These are left unprocessed as a raw element representation
class AnyElement {
  name: string;
  namespace: string;
  attributes: Map<string, string>;
  elements: Array<string | AnyElement>;
}
