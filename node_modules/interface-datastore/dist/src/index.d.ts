export type Datastore = import('./types').Datastore;
export type Batch = import('./types').Batch;
export type Options = import('interface-store').Options;
export type Query = import('./types').Query;
export type QueryFilter = import('./types').QueryFilter;
export type QueryOrder = import('./types').QueryOrder;
export type KeyQuery = import('./types').KeyQuery;
export type KeyQueryFilter = import('./types').KeyQueryFilter;
export type KeyQueryOrder = import('./types').KeyQueryOrder;
export type Pair = import('./types').Pair;
import Key = require("./key");
import MemoryDatastore = require("./memory");
import utils = require("./utils");
import Errors = require("./errors");
import Adapter = require("./adapter");
export { Key, MemoryDatastore, utils, Errors, Adapter };
//# sourceMappingURL=index.d.ts.map