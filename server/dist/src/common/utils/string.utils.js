"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = removeAccents;
function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase();
}
//# sourceMappingURL=string.utils.js.map