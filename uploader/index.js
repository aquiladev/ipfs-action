const ipfsUploader = require('./ipfs');

const services = {
  ipfs: ipfsUploader
}

function validate({ path, service }) {
  if (!path) {
    throw new Error('Path is empty');
  }

  if (!Object.keys(services).find(key => key === service)) {
    throw new Error('Service is not supported');
  }
}

function upload(options) {
  validate(options);

  const service = services[options.service];
  service.validate(options);
  return service.upload(options);
}

module.exports = {
  upload
}