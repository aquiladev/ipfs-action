import * as Digest from './digest.js';
export const from = ({name, code, encode}) => new Hasher(name, code, encode);
export class Hasher {
  constructor(name, code, encode) {
    this.name = name;
    this.code = code;
    this.encode = encode;
  }
  async digest(input) {
    if (input instanceof Uint8Array) {
      const digest = await this.encode(input);
      return Digest.create(this.code, digest);
    } else {
      throw Error('Unknown type, must be binary type');
    }
  }
}