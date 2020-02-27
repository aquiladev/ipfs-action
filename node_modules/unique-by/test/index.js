'use strict';
var test = require('tape');

var uniqueBy = require('../');

var foo = {key: 'foo', name: 'foo'};
var bar = {key: 'bar', name: 'bar'};
var baz = {key: 'foo', name: 'baz'};
var original = [foo, bar, baz];
var expected = [foo, bar];

test('by function', function t(assert) {
  var actual = uniqueBy(original, function getKey(value) {
    return value.key;
  });
  assert.deepLooseEqual(actual, expected);
  assert.end();
});

test('by string', function t(assert) {
  var actual = uniqueBy(original, 'key');
  assert.deepLooseEqual(actual, expected);
  assert.end();
});
