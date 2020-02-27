'use strict';

module.exports = uniqueBy;

function uniqueBy(arr, getValue) {
  var unique = [];
  var found = {};

  if (typeof getValue !== 'function') {
    var key = getValue;
    getValue = function defaultGetValue(obj) {
      return obj[key];
    };
  }

  arr.forEach(function addUniques(obj) {
    var value = getValue(obj);
    if (!found[value]) {
      found[value] = true;
      unique.push(obj);
    }
  });

  return unique;
}
