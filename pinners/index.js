import make from "./maker.js";

import ipfs from "./ipfs.js";
import pinata from "./pinata.js";
import infura from "./infura.js";
import filebase from "./filebase.js";

export default {
  ipfs: make(ipfs),
  pinata: make(pinata),
  infura: make(infura),
  filebase: make(filebase)
};
