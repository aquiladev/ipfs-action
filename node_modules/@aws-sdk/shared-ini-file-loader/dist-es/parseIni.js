import { __read, __values } from "tslib";
var profileNameBlockList = ["__proto__", "profile __proto__"];
export var parseIni = function (iniData) {
    var e_1, _a;
    var map = {};
    var currentSection;
    try {
        for (var _b = __values(iniData.split(/\r?\n/)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var line = _c.value;
            line = line.split(/(^|\s)[;#]/)[0].trim();
            var isSection = line[0] === "[" && line[line.length - 1] === "]";
            if (isSection) {
                currentSection = line.substring(1, line.length - 1);
                if (profileNameBlockList.includes(currentSection)) {
                    throw new Error("Found invalid profile name \"".concat(currentSection, "\""));
                }
            }
            else if (currentSection) {
                var indexOfEqualsSign = line.indexOf("=");
                var start = 0;
                var end = line.length - 1;
                var isAssignment = indexOfEqualsSign !== -1 && indexOfEqualsSign !== start && indexOfEqualsSign !== end;
                if (isAssignment) {
                    var _d = __read([
                        line.substring(0, indexOfEqualsSign).trim(),
                        line.substring(indexOfEqualsSign + 1).trim(),
                    ], 2), name_1 = _d[0], value = _d[1];
                    map[currentSection] = map[currentSection] || {};
                    map[currentSection][name_1] = value;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return map;
};
