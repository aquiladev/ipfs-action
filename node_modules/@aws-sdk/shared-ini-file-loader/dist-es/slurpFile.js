import { promises as fsPromises } from "fs";
var readFile = fsPromises.readFile;
var filePromisesHash = {};
export var slurpFile = function (path) {
    if (!filePromisesHash[path]) {
        filePromisesHash[path] = readFile(path, "utf8");
    }
    return filePromisesHash[path];
};
