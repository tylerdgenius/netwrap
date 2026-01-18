"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simulateDataCall = (delayInMilliseconds, mockData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData);
        }, delayInMilliseconds);
    });
};
exports.default = simulateDataCall;
