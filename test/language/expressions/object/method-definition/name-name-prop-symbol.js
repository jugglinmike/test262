/*---
description: >
    Functions defined as methods are assigned a `name` property according to
    the string value of their property name.
es6id: 14.3.8
includes: [propertyHelper.js]
features: [Symbol]
---*/

var name = Symbol('method');
var method = { [name]() {} }[name];

assert.sameValue(method.name, '[method]');
verifyNotEnumerable(method, 'name');
verifyNotWritable(method, 'name');
verifyConfigurable(method, 'name');
