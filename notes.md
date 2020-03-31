This library does not use `null`, but rather uses `undefined` anywhere that data may be optional. "Nullable" in this document means that something may be equal to `undefined`.

I've changed a number of names. For example, since there are multiple distinct elements named `simpleType`, I've broken them into `LocalSimpleType` and `TopLevelSimpleType`.

There are places where the same type may occur with different element names as siblings of one another, and I've created wrapper classes for the purpose of expressing tagged unions in these cases. Examples include `ChoiceSimpleExplicitGroup` and `SequenceSimpleExplicitGroup`.

The guiding principle of this library is to encode the structure of an XSD document while not passing judgement on its contents. Many things are left as strings, because the consumer of an XSD is the one responsible for assigning semantics to these values.
