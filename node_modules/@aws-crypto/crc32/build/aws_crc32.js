"use strict";
// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsCrc32 = void 0;
var tslib_1 = require("tslib");
var util_1 = require("@aws-crypto/util");
var index_1 = require("./index");
var AwsCrc32 = /** @class */ (function () {
    function AwsCrc32() {
        this.crc32 = new index_1.Crc32();
    }
    AwsCrc32.prototype.update = function (toHash) {
        if ((0, util_1.isEmptyData)(toHash))
            return;
        this.crc32.update((0, util_1.convertToBuffer)(toHash));
    };
    AwsCrc32.prototype.digest = function () {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
            return (0, tslib_1.__generator)(this, function (_a) {
                return [2 /*return*/, (0, util_1.numToUint8)(this.crc32.digest())];
            });
        });
    };
    return AwsCrc32;
}());
exports.AwsCrc32 = AwsCrc32;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzX2NyYzMyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F3c19jcmMzMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsb0VBQW9FO0FBQ3BFLHNDQUFzQzs7OztBQUd0Qyx5Q0FBNEU7QUFDNUUsaUNBQWdDO0FBRWhDO0lBQUE7UUFDbUIsVUFBSyxHQUFHLElBQUksYUFBSyxFQUFFLENBQUM7SUFXdkMsQ0FBQztJQVRDLHlCQUFNLEdBQU4sVUFBTyxNQUFrQjtRQUN2QixJQUFJLElBQUEsa0JBQVcsRUFBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUEsc0JBQWUsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFSyx5QkFBTSxHQUFaOzs7Z0JBQ0Usc0JBQU8sSUFBQSxpQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBQzs7O0tBQ3hDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgQW1hem9uLmNvbSBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcblxuaW1wb3J0IHsgSGFzaCwgU291cmNlRGF0YSB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgY29udmVydFRvQnVmZmVyLCBpc0VtcHR5RGF0YSwgbnVtVG9VaW50OCB9IGZyb20gXCJAYXdzLWNyeXB0by91dGlsXCI7XG5pbXBvcnQgeyBDcmMzMiB9IGZyb20gXCIuL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBBd3NDcmMzMiBpbXBsZW1lbnRzIEhhc2gge1xuICBwcml2YXRlIHJlYWRvbmx5IGNyYzMyID0gbmV3IENyYzMyKCk7XG5cbiAgdXBkYXRlKHRvSGFzaDogU291cmNlRGF0YSkge1xuICAgIGlmIChpc0VtcHR5RGF0YSh0b0hhc2gpKSByZXR1cm47XG5cbiAgICB0aGlzLmNyYzMyLnVwZGF0ZShjb252ZXJ0VG9CdWZmZXIodG9IYXNoKSk7XG4gIH1cblxuICBhc3luYyBkaWdlc3QoKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gICAgcmV0dXJuIG51bVRvVWludDgodGhpcy5jcmMzMi5kaWdlc3QoKSk7XG4gIH1cbn1cbiJdfQ==