export function configure<T>(fn: Fn<T>): Factory<T>;
export type Options = import("../types").Options;
export type Fn<T> = (client: Client, clientOptions: Options) => T;
export type Factory<T> = (clientOptions: Options) => T;
import { Client } from "./core.js";
//# sourceMappingURL=configure.d.ts.map