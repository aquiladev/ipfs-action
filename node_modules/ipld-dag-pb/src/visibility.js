'use strict'

/**
 * Make certain getters enumnerable
 *
 * This can be used to add additional getters that are enumerable and hence
 * show up on an `Object.keys()` call.
 *
 * @param {Object} object - The object it should be applied to
 * @param {Array.<String>} fields - The fields that should be made enumnerable
 */
const addEnumerableGetters = (object, fields) => {
  for (const field of fields) {
    let prop
    let proto = object
    // Walk up the proottype chain until a property with the given name is
    // found
    while (prop === undefined) {
      proto = Object.getPrototypeOf(proto)
      if (proto === null) {
        throw new Error(`no getter named '${field}' found`)
      }
      prop = Object.getOwnPropertyDescriptor(proto, field)
    }

    // There is a property with the correct name, but it's not a getter
    if (prop.get === undefined) {
      throw new Error(`no getter named '${field}' found`)
    }
    Object.defineProperty(object, field, {
      enumerable: true,
      get: prop.get
    })
  }
}

/**
 * Makes all properties with a leading underscore non-enumerable.
 *
 * @param {Object} object - The object it should be applied to
 */
const hidePrivateFields = (object) => {
  for (const key in object) {
    if (key[0] === '_') {
      Object.defineProperty(object, key, { enumerable: false })
    }
  }
}

module.exports = {
  addEnumerableGetters,
  hidePrivateFields
}
