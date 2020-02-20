'use strict';

function createError(err, code, props) {
    var key;

    if (!(err instanceof Error)) {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (typeof code === 'object') {
        props = code;
    } else if (code != null) {
        err.code = code;
    }

    if (props) {
        for (key in props) {
            err[key] = props[key];
        }
    }

    return err;
}

module.exports = createError;
