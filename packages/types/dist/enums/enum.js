"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressType = exports.SortOrder = exports.ShirtSize = exports.ProductType = void 0;
var ProductType;
(function (ProductType) {
    ProductType["CLOTHING"] = "CLOTHING";
    ProductType["SHOES"] = "SHOES";
})(ProductType || (exports.ProductType = ProductType = {}));
;
var ShirtSize;
(function (ShirtSize) {
    ShirtSize["XS"] = "XS";
    ShirtSize["S"] = "S";
    ShirtSize["M"] = "M";
    ShirtSize["L"] = "L";
    ShirtSize["XL"] = "XL";
    ShirtSize["XXL"] = "XXL";
    ShirtSize["XXXL"] = "XXXL";
})(ShirtSize || (exports.ShirtSize = ShirtSize = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var AddressType;
(function (AddressType) {
    AddressType["SHIPPING"] = "SHIPPING";
    AddressType["BILLING"] = "BILLING";
})(AddressType || (exports.AddressType = AddressType = {}));
