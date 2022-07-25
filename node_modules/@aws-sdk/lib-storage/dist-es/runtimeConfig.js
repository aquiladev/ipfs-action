import { __assign } from "tslib";
import { lstatSync } from "fs";
import { ClientSharedValues } from "./runtimeConfig.shared";
export var ClientDefaultValues = __assign(__assign({}, ClientSharedValues), { runtime: "node", lstatSync: lstatSync });
