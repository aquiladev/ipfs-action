'use strict';

const c = require('constants');

const out = `
'use strict';

module.exports = ${JSON.stringify(c, null, '    ').replace(/"/g, '\'')};
`;

console.log(out);
