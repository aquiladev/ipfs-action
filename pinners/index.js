const make = require('./maker');

module.exports = {
  ipfs: make(require('./ipfs')),
  pinata: make(require('./pinata')),
  infura: make(require('./infura')),
}