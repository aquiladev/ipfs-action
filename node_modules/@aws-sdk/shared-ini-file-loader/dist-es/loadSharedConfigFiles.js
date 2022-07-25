import { __awaiter, __generator } from "tslib";
import { getConfigFilepath } from "./getConfigFilepath";
import { getCredentialsFilepath } from "./getCredentialsFilepath";
import { getProfileData } from "./getProfileData";
import { parseIni } from "./parseIni";
import { slurpFile } from "./slurpFile";
var swallowError = function () { return ({}); };
export var loadSharedConfigFiles = function (init) {
    if (init === void 0) { init = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, filepath, _b, configFilepath, parsedFiles;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = init.filepath, filepath = _a === void 0 ? getCredentialsFilepath() : _a, _b = init.configFilepath, configFilepath = _b === void 0 ? getConfigFilepath() : _b;
                    return [4, Promise.all([
                            slurpFile(configFilepath).then(parseIni).then(getProfileData).catch(swallowError),
                            slurpFile(filepath).then(parseIni).catch(swallowError),
                        ])];
                case 1:
                    parsedFiles = _c.sent();
                    return [2, {
                            configFile: parsedFiles[0],
                            credentialsFile: parsedFiles[1],
                        }];
            }
        });
    });
};
