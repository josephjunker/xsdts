import { Elem } from "./xml-tree";

type ID = string;
type NCName = string;
type QName = string;
type anyURI = string;
type language = string;
type token = string;
type xpathDefaultNamespace = anyURI | token;
type publicIdentifier = string;

export class Schema {
  preamble: Array<Include | Import | Redefine | Override | Annotation>;
  annotations: Array<Annotation>;
  defaultOpenContent?: OpenContent;
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
  constructor({
    preamble,
    annotations,
    defaultOpenContent,
    contents
  }: Pick<
    Schema,
    "preamble" | "annotations" | "defaultOpenContent" | "contents"
  >) {
    this.preamble = preamble;
    this.annotations = annotations;
    this.defaultOpenContent = defaultOpenContent;
    this.contents = contents;
  }
}

export class NamedAttributeGroup {
  annotation?: Annotation;
  contents: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  id?: ID;
  name: NCName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    anyAttributeDeclaration,
    id,
    name,
    anyAttributes
  }: Pick<
    NamedAttributeGroup,
    | "annotation"
    | "contents"
    | "anyAttributeDeclaration"
    | "id"
    | "name"
    | "anyAttributes"
  >) {
    this.annotation = annotation;
    this.contents = contents;
    this.anyAttributeDeclaration = anyAttributeDeclaration;
    this.id = id;
    this.name = name;
    this.anyAttributes = anyAttributes;
  }
}

export class TopLevelElement {
  annotation?: Annotation;
  elementType?: LocalSimpleType | LocalComplexType;
  alternatives: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id?: ID;
  type?: QName;
  substitutionGroup: Array<QName>;
  defaultValue?: string;
  fixed?: string;
  nillable?: boolean;
  abstract?: boolean;
  final?: "#all" | "extension" | "restriction";
  block?: "#all" | "extension" | "restriction" | "substitution";
  name: NCName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    elementType,
    alternatives,
    identityConstraint,
    id,
    type,
    substitutionGroup,
    defaultValue,
    fixed,
    nillable,
    abstract,
    final,
    block,
    name,
    anyAttributes
  }: Readonly<TopLevelElement>) {
    this.annotation = annotation;
    this.elementType = elementType;
    this.alternatives = alternatives;
    this.identityConstraint = identityConstraint;
    this.id = id;
    this.type = type;
    this.substitutionGroup = substitutionGroup;
    this.defaultValue = defaultValue;
    this.fixed = fixed;
    this.nillable = nillable;
    this.abstract = abstract;
    this.final = final;
    this.block = block;
    this.name = name;
    this.anyAttributes = anyAttributes;
  }
}

export class TopLevelSimpleType {
  annotation?: Annotation;
  refinement: GlobalRestriction | List | Union;
  id?: ID;
  final: "#all" | Array<"list" | "union" | "restriction" | "extension">;
  name?: NCName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    refinement,
    id,
    final,
    name,
    anyAttributes
  }: Readonly<TopLevelSimpleType>) {
    this.annotation = annotation;
    this.refinement = refinement;
    this.id = id;
    this.final = final;
    this.name = name;
    this.anyAttributes = anyAttributes;
  }
}

export class Notation {
  annotation?: Annotation;
  id?: ID;
  name: NCName;
  publicIdentifier?: publicIdentifier;
  system?: anyURI;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    name,
    publicIdentifier,
    system,
    anyAttributes
  }: Readonly<Notation>) {
    this.annotation = annotation;
    this.id = id;
    this.name = name;
    this.publicIdentifier = publicIdentifier;
    this.system = system;
    this.anyAttributes = anyAttributes;
  }
}

export class TopLevelComplexType {
  annotation?: Annotation;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
  constructor({ annotation, contents }: Readonly<TopLevelComplexType>) {
    this.annotation = annotation;
    this.contents = contents;
  }
}

export class InlineComplexContent {
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  attributes?: Array<LocalAttribute | AttributeGroupRef>;
  assert?: Assertion;
  anyAttributes?: Map<string, string>;
  constructor({
    openContent,
    contents,
    attributes,
    assert,
    anyAttributes
  }: Readonly<InlineComplexContent>) {
    this.openContent = openContent;
    this.contents = contents;
    this.attributes = attributes;
    this.assert = assert;
    this.anyAttributes = anyAttributes;
  }
}

export class ChoiceExplicitGroup {
  contents: ExplicitGroup;
  constructor({ contents }: Readonly<ChoiceExplicitGroup>) {
    this.contents = contents;
  }
}

export class SequenceExplicitGroup {
  contents: ExplicitGroup;
  constructor({ contents }: Readonly<SequenceExplicitGroup>) {
    this.contents = contents;
  }
}

export class ExplicitGroup {
  annotation?: Annotation;
  contents?: Array<
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
  constructor({
    annotation,
    contents,
    id,
    minOccurs,
    maxOccurs,
    anyAttributes
  }: Readonly<ExplicitGroup>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.anyAttributes = anyAttributes;
  }
}

export class GroupRef {
  annotation?: Annotation;
  id?: ID;
  minOccurs?: number;
  maxOccurs?: number | "unbounded";
  ref: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    minOccurs,
    maxOccurs,
    ref,
    anyAttributes
  }: Readonly<GroupRef>) {
    this.annotation = annotation;
    this.id = id;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.ref = ref;
    this.anyAttributes = anyAttributes;
  }
}

export class GlobalAll {
  annotation?: Annotation;
  contents: Array<LocalElement | GlobalAny | LocalGroup>;
  id?: ID;
  minOccurs: 0 | 1;
  maxOccurs: 0 | 1;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    minOccurs,
    maxOccurs,
    anyAttributes
  }: Readonly<GlobalAll>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.anyAttributes = anyAttributes;
  }
}

export class LocalElement {
  annotation?: Annotation;
  elementType?: LocalSimpleType | LocalComplexType;
  alternatives?: Array<Alternative>;
  identityConstraint: Array<Unique | Key | KeyRef>;
  id?: ID;
  name?: NCName;
  ref?: QName;
  type?: QName;
  minOccurs?: number;
  maxOccurs?: number;
  defaultValue?: string;
  fixed?: string;
  nillable?: boolean;
  block?: "#all" | Array<"extension" | "restriction" | "substitution">;
  form?: "qualified" | "unqualified";
  targetNamespace?: anyURI;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    elementType,
    alternatives,
    identityConstraint,
    id,
    name,
    ref,
    type,
    minOccurs,
    maxOccurs,
    defaultValue,
    fixed,
    nillable,
    block,
    form,
    targetNamespace,
    anyAttributes
  }: Readonly<LocalElement>) {
    this.annotation = annotation;
    this.elementType = elementType;
    this.alternatives = alternatives;
    this.identityConstraint = identityConstraint;
    this.id = id;
    this.name = name;
    this.ref = ref;
    this.type = type;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.defaultValue = defaultValue;
    this.fixed = fixed;
    this.nillable = nillable;
    this.block = block;
    this.form = form;
    this.targetNamespace = targetNamespace;
    this.anyAttributes = anyAttributes;
  }
}

export class Alternative {
  annotation?: Annotation;
  contents?: LocalSimpleType | LocalComplexType;
  id?: ID;
  test?: string;
  type?: QName;
  xpathDefaultNamespace?: xpathDefaultNamespace;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    test,
    type,
    xpathDefaultNamespace,
    anyAttributes
  }: Readonly<Alternative>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.test = test;
    this.type = type;
    this.xpathDefaultNamespace = xpathDefaultNamespace;
    this.anyAttributes = anyAttributes;
  }
}

export class LocalComplexType {
  annotation?: Annotation;
  contents: SimpleContent | ComplexContent | InlineComplexContent;
  id?: ID;
  mixed?: boolean;
  defaultAttributesApply?: boolean;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    mixed,
    defaultAttributesApply,
    anyAttributes
  }: Readonly<LocalComplexType>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.mixed = mixed;
    this.defaultAttributesApply = defaultAttributesApply;
    this.anyAttributes = anyAttributes;
  }
}

export class ComplexContent {
  annotation?: Annotation;
  contents: ComplexRestriction | ComplexExtension;
  id?: ID;
  mixed?: boolean;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    mixed,
    anyAttributes
  }: Readonly<ComplexContent>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.mixed = mixed;
    this.anyAttributes = anyAttributes;
  }
}

export class ComplexRestriction {
  annotation?: Annotation;
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  id?: ID;
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    openContent,
    contents,
    id,
    minOccurs,
    maxOccurs,
    anyAttributes
  }: Readonly<ComplexRestriction>) {
    this.annotation = annotation;
    this.openContent = openContent;
    this.contents = contents;
    this.id = id;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.anyAttributes = anyAttributes;
  }
}

export class ComplexExtension {
  annotation?: Annotation;
  openContent?: OpenContent;
  contents?: GroupRef | GlobalAll | ChoiceExplicitGroup | SequenceExplicitGroup;
  attributes?: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert?: Array<Assertion>;
  id?: ID;
  base: QName;
  constructor({
    annotation,
    openContent,
    contents,
    attributes,
    anyAttributeDeclaration,
    assert,
    id,
    base
  }: Readonly<ComplexExtension>) {
    this.annotation = annotation;
    this.openContent = openContent;
    this.contents = contents;
    this.attributes = attributes;
    this.anyAttributeDeclaration = anyAttributeDeclaration;
    this.assert = assert;
    this.id = id;
    this.base = base;
  }
}

export class SimpleContent {
  annotation?: Annotation;
  contents: SimpleRestriction | SimpleExtension;
  id?: ID;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    anyAttributes
  }: Readonly<SimpleContent>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class SimpleRestrictionContents {
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
  constructor({
    minExclusive,
    minInclusive,
    maxExclusive,
    maxInclusive,
    totalDigits,
    fractionDigits,
    length,
    minLength,
    maxLength,
    enumeration,
    whiteSpace,
    pattern,
    assertion,
    explicitTimezone
  }: Readonly<SimpleRestrictionContents>) {
    this.minExclusive = minExclusive;
    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
    this.maxInclusive = maxInclusive;
    this.totalDigits = totalDigits;
    this.fractionDigits = fractionDigits;
    this.length = length;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.enumeration = enumeration;
    this.whiteSpace = whiteSpace;
    this.pattern = pattern;
    this.assertion = assertion;
    this.explicitTimezone = explicitTimezone;
  }
}

export class SimpleRestriction {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  contents?: Array<SimpleRestrictionContents>;
  anyElements?: Array<Elem>;
  attributes?: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert?: Array<Assertion>;
  id?: ID;
  base: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    simpleType,
    anyElements,
    attributes,
    anyAttributeDeclaration,
    assert,
    id,
    base,
    anyAttributes
  }: Readonly<SimpleRestriction>) {
    this.annotation = annotation;
    this.simpleType = simpleType;
    this.anyElements = anyElements;
    this.attributes = attributes;
    this.anyAttributeDeclaration = anyAttributeDeclaration;
    this.assert = assert;
    this.id = id;
    this.base = base;
    this.anyAttributes = anyAttributes;
  }
}

export class AnyAttribute {
  annotation?: Annotation;
  id?: ID;
  namespace?: "##any" | "##other" | "##targetNamespace" | "##local";
  notNamespace?: Array<anyURI | "##targetNamespace" | "##local">; // length >= 1
  processContents?: "skip" | "lax" | "strict";
  notQName?: Array<QName | "##defined">;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    namespace,
    notNamespace,
    processContents,
    notQName,
    anyAttributes
  }: Readonly<AnyAttribute>) {
    this.annotation = annotation;
    this.id = id;
    this.namespace = namespace;
    this.notNamespace = notNamespace;
    this.processContents = processContents;
    this.notQName = notQName;
    this.anyAttributes = anyAttributes;
  }
}

export class SimpleExtension {
  annotation?: Annotation;
  contents?: Array<LocalAttribute | AttributeGroupRef>;
  anyAttributeDeclaration?: AnyAttribute;
  assert?: Array<Assertion>;
  id?: ID;
  base: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    anyAttributeDeclaration,
    assert,
    id,
    base,
    anyAttributes
  }: Readonly<SimpleExtension>) {
    this.annotation = annotation;
    this.contents = contents;
    this.anyAttributeDeclaration = anyAttributeDeclaration;
    this.assert = assert;
    this.id = id;
    this.base = base;
    this.anyAttributes = anyAttributes;
  }
}

export class Unique {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    selectorAndFields,
    id,
    name,
    ref,
    anyAttributes
  }: Readonly<Unique>) {
    this.annotation = annotation;
    this.selectorAndFields = selectorAndFields;
    this.id = id;
    this.name = name;
    this.ref = ref;
    this.anyAttributes = anyAttributes;
  }
}

export class SelectorAndFields {
  selector: Selector;
  fields: Array<Field>; // Must contain at least one item
  constructor({ selector, fields }: Readonly<SelectorAndFields>) {
    this.selector = selector;
    this.fields = fields;
  }
}

export class Selector {
  annotation?: Annotation;
  id?: ID;
  xpath: string;
  xpathDefaultNamespace?:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local";
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    xpath,
    xpathDefaultNamespace,
    anyAttributes
  }: Readonly<Selector>) {
    this.annotation = annotation;
    this.id = id;
    this.xpath = xpath;
    this.xpathDefaultNamespace = xpathDefaultNamespace;
    this.anyAttributes = anyAttributes;
  }
}

export class Field {
  annotation?: Annotation;
  id?: ID;
  xpath: string;
  xpathDefaultNamespace?:
    | anyURI
    | "##defaultNamespace"
    | "##targetNamespace"
    | "##local";
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    xpath,
    xpathDefaultNamespace,
    anyAttributes
  }: Readonly<Field>) {
    this.annotation = annotation;
    this.id = id;
    this.xpath = xpath;
    this.xpathDefaultNamespace = xpathDefaultNamespace;
    this.anyAttributes = anyAttributes;
  }
}

export class Key {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    selectorAndFields,
    id,
    name,
    ref,
    anyAttributes
  }: Readonly<Key>) {
    this.annotation = annotation;
    this.selectorAndFields = selectorAndFields;
    this.id = id;
    this.name = name;
    this.ref = ref;
    this.anyAttributes = anyAttributes;
  }
}

export class KeyRef {
  annotation?: Annotation;
  selectorAndFields?: SelectorAndFields;
  id?: ID;
  name?: NCName;
  ref?: QName;
  refer?: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    selectorAndFields,
    id,
    name,
    ref,
    refer,
    anyAttributes
  }: Readonly<KeyRef>) {
    this.annotation = annotation;
    this.selectorAndFields = selectorAndFields;
    this.id = id;
    this.name = name;
    this.ref = ref;
    this.refer = refer;
    this.anyAttributes = anyAttributes;
  }
}

export class LocalAttribute {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  id?: ID;
  name?: NCName;
  ref?: QName;
  type?: QName;
  use?: "prohibited" | "optional" | "required";
  defaultValue?: string;
  fixed?: string;
  form?: "qualified" | "unqualified";
  targetNamespace?: anyURI;
  inheritable?: boolean;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    simpleType,
    id,
    name,
    ref,
    type,
    use,
    defaultValue,
    fixed,
    form,
    targetNamespace,
    inheritable,
    anyAttributes
  }: Readonly<LocalAttribute>) {
    this.annotation = annotation;
    this.simpleType = simpleType;
    this.id = id;
    this.name = name;
    this.ref = ref;
    this.type = type;
    this.use = use;
    this.defaultValue = defaultValue;
    this.fixed = fixed;
    this.form = form;
    this.targetNamespace = targetNamespace;
    this.inheritable = inheritable;
    this.anyAttributes = anyAttributes;
  }
}

export class AttributeGroupRef {
  annotation?: Annotation;
  id?: ID;
  ref: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    ref,
    anyAttributes
  }: Readonly<AttributeGroupRef>) {
    this.annotation = annotation;
    this.id = id;
    this.ref = ref;
    this.anyAttributes = anyAttributes;
  }
}

export class OpenContent {
  annotation?: Annotation;
  any?: Wildcard;
  id?: ID;
  mode?: "interleave" | "suffix";
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    any,
    id,
    mode,
    anyAttributes
  }: Readonly<OpenContent>) {
    this.annotation = annotation;
    this.any = any;
    this.id = id;
    this.mode = mode;
    this.anyAttributes = anyAttributes;
  }
}

export class Include {
  annotation?: Annotation;
  id?: ID;
  schemaLocation: anyURI;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    schemaLocation,
    anyAttributes
  }: Readonly<Include>) {
    this.annotation = annotation;
    this.id = id;
    this.schemaLocation = schemaLocation;
    this.anyAttributes = anyAttributes;
  }
}

export class Import {
  annotation?: Annotation;
  id?: ID;
  namespace?: anyURI;
  schemaLocation?: anyURI;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    namespace,
    schemaLocation,
    anyAttributes
  }: Readonly<Import>) {
    this.annotation = annotation;
    this.id = id;
    this.namespace = namespace;
    this.schemaLocation = schemaLocation;
    this.anyAttributes = anyAttributes;
  }
}

export class Redefine {
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
  constructor({
    contents,
    schemaLocation,
    id,
    anyAttributes
  }: Readonly<Redefine>) {
    this.contents = contents;
    this.schemaLocation = schemaLocation;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class NamedGroup {
  annotation?: Annotation;
  contents: LocalAll | ChoiceSimpleExplicitGroup | SequenceSimpleExplicitGroup;
  id?: ID;
  name: NCName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    name,
    anyAttributes
  }: Readonly<NamedGroup>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.name = name;
    this.anyAttributes = anyAttributes;
  }
}

export class ChoiceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
  constructor({ contents }: Readonly<ChoiceSimpleExplicitGroup>) {
    this.contents = contents;
  }
}

export class SequenceSimpleExplicitGroup {
  contents: SimpleExplicitGroup;
  constructor({ contents }: Readonly<SequenceSimpleExplicitGroup>) {
    this.contents = contents;
  }
}

export class SimpleExplicitGroup {
  annotation?: Annotation;
  contents?: Array<
    | LocalElement
    | GroupRef
    | ChoiceExplicitGroup
    | SequenceExplicitGroup
    | GlobalAny
  >;
  id?: ID;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    anyAttributes
  }: Readonly<SimpleExplicitGroup>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class LocalAll {
  annotation?: Annotation;
  choices: Array<LocalElement | GlobalAny | LocalGroup>;
  id?: ID;
  anyAttributes?: Map<string, string>;
  constructor({ annotation, choices, id, anyAttributes }: Readonly<LocalAll>) {
    this.annotation = annotation;
    this.choices = choices;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class GlobalAny {
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
  constructor({
    annotation,
    id,
    namespace,
    notNamespace,
    processContents,
    notQName,
    minOccurs,
    maxOccurs,
    anyAttributes
  }: Readonly<GlobalAny>) {
    this.annotation = annotation;
    this.id = id;
    this.namespace = namespace;
    this.notNamespace = notNamespace;
    this.processContents = processContents;
    this.notQName = notQName;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.anyAttributes = anyAttributes;
  }
}

export class LocalGroup {
  annotation?: Annotation;
  id?: ID;
  ref: QName;
  minOccurs?: number;
  maxOccurs?: number;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    ref,
    minOccurs,
    maxOccurs,
    anyAttributes
  }: Readonly<LocalGroup>) {
    this.annotation = annotation;
    this.id = id;
    this.ref = ref;
    this.minOccurs = minOccurs;
    this.maxOccurs = maxOccurs;
    this.anyAttributes = anyAttributes;
  }
}

export class Override {
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
  constructor({
    annotation,
    contents,
    id,
    schemaLocation,
    anyAttributes
  }: Readonly<Override>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.schemaLocation = schemaLocation;
    this.anyAttributes = anyAttributes;
  }
}

export class Wildcard {
  annotation?: Annotation;
  id?: ID;
  namespace?:
    | "##any"
    | "##other"
    | Array<anyURI | "##targetNamespace" | "##local">;
  notNamespace?: Array<anyURI | "##targetNamespace" | "##local">;
  processContents?: "skip" | "lax" | "strict";
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    namespace,
    notNamespace,
    processContents,
    anyAttributes
  }: Readonly<Wildcard>) {
    this.annotation = annotation;
    this.id = id;
    this.namespace = namespace;
    this.notNamespace = notNamespace;
    this.processContents = processContents;
    this.anyAttributes = anyAttributes;
  }
}

export class TopLevelAttribute {
  annotation?: Annotation;
  simpleType?: LocalSimpleType;
  id?: ID;
  type?: QName;
  defaultValue?: string;
  fixed?: string;
  name?: NCName;
  inheritable?: boolean;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    simpleType,
    id,
    type,
    defaultValue,
    fixed,
    name,
    inheritable,
    anyAttributes
  }: Readonly<TopLevelAttribute>) {
    this.annotation = annotation;
    this.simpleType = simpleType;
    this.id = id;
    this.type = type;
    this.defaultValue = defaultValue;
    this.fixed = fixed;
    this.name = name;
    this.inheritable = inheritable;
    this.anyAttributes = anyAttributes;
  }
}

export class Annotation {
  appinfo: Array<Appinfo>;
  documentation: Array<Documentation>;
  id?: ID;
  anyAttributes?: Map<string, string>;
  constructor({
    appinfo,
    documentation,
    id,
    anyAttributes
  }: Readonly<Annotation>) {
    this.appinfo = appinfo;
    this.documentation = documentation;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class Appinfo {
  anyElements?: Array<string | Elem>;
  source?: anyURI;
  anyAttributes?: Map<string, string>;
  constructor({ anyElements, source, anyAttributes }: Readonly<Appinfo>) {
    this.anyElements = anyElements;
    this.source = source;
    this.anyAttributes = anyAttributes;
  }
}

export class Documentation {
  source?: anyURI;
  lang?: language;
  anyAttributes?: Map<string, string>;
  anyElements?: Array<Elem>;
  constructor({
    source,
    lang,
    anyAttributes,
    anyElements
  }: Readonly<Documentation>) {
    this.source = source;
    this.lang = lang;
    this.anyAttributes = anyAttributes;
    this.anyElements = anyElements;
  }
}

export class LocalSimpleType {
  annotation?: Annotation;
  refinement: GlobalRestriction | List | Union;
  id?: ID;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    refinement,
    id,
    anyAttributes
  }: Readonly<LocalSimpleType>) {
    this.annotation = annotation;
    this.refinement = refinement;
    this.id = id;
    this.anyAttributes = anyAttributes;
  }
}

export class Facet<T> {
  id?: ID;
  anyAttributes?: Map<string, string>;
  value: T;
  fixed?: boolean;
  constructor({ id, anyAttributes, value, fixed }: Readonly<Facet<T>>) {
    this.id = id;
    this.anyAttributes = anyAttributes;
    this.value = value;
    this.fixed = fixed;
  }
}

export class GlobalRestriction {
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
  anyElement?: Array<Elem>; // namespace ##other
  id?: ID;
  base?: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    simpleType,
    minExclusive,
    minInclusive,
    maxExclusive,
    maxInclusive,
    totalDigits,
    fractionDigits,
    length,
    minLength,
    maxLength,
    enumeration,
    whiteSpace,
    pattern,
    assertion,
    explicitTimezone,
    anyElement,
    id,
    base,
    anyAttributes
  }: Readonly<GlobalRestriction>) {
    this.annotation = annotation;
    this.simpleType = simpleType;
    this.minExclusive = minExclusive;
    this.minInclusive = minInclusive;
    this.maxExclusive = maxExclusive;
    this.maxInclusive = maxInclusive;
    this.totalDigits = totalDigits;
    this.fractionDigits = fractionDigits;
    this.length = length;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.enumeration = enumeration;
    this.whiteSpace = whiteSpace;
    this.pattern = pattern;
    this.assertion = assertion;
    this.explicitTimezone = explicitTimezone;
    this.anyElement = anyElement;
    this.id = id;
    this.base = base;
    this.anyAttributes = anyAttributes;
  }
}

export class Assertion {
  annotation?: Annotation;
  id?: ID;
  test?: string;
  xpathDefaultNamespace?: xpathDefaultNamespace;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    id,
    test,
    xpathDefaultNamespace,
    anyAttributes
  }: Readonly<Assertion>) {
    this.annotation = annotation;
    this.id = id;
    this.test = test;
    this.xpathDefaultNamespace = xpathDefaultNamespace;
    this.anyAttributes = anyAttributes;
  }
}

export class List {
  annotation?: Annotation;
  contents?: LocalSimpleType;
  id?: ID;
  itemType?: QName;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    itemType,
    anyAttributes
  }: Readonly<List>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.itemType = itemType;
    this.anyAttributes = anyAttributes;
  }
}

export class Union {
  annotation?: Annotation;
  contents?: Array<LocalSimpleType>;
  id?: ID;
  memberTypes?: Array<QName>;
  anyAttributes?: Map<string, string>;
  constructor({
    annotation,
    contents,
    id,
    memberTypes,
    anyAttributes
  }: Readonly<Union>) {
    this.annotation = annotation;
    this.contents = contents;
    this.id = id;
    this.memberTypes = memberTypes;
    this.anyAttributes = anyAttributes;
  }
}
