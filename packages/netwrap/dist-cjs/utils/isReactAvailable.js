"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isReactAvailable = () => {
    try {
        require.resolve("react");
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.default = isReactAvailable;
