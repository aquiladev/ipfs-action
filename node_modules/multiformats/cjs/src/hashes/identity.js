'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hasher = require('./hasher.js');
var bytes = require('../bytes.js');

const identity = hasher.from({
  name: 'identity',
  code: 0,
  encode: input => bytes.coerce(input)
});

exports.identity = identity;
