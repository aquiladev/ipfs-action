import { from } from './hasher.js';
import { coerce } from '../bytes.js';
export const identity = from({
  name: 'identity',
  code: 0,
  encode: input => coerce(input)
});