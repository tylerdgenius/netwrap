"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calledFunction = () => {
    var _a;
    const error = new Error();
    const stackTraceLines = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n");
    // The first line of the stack trace (index 0) will be the error message,
    // so we need to find the second line (index 1) which represents the caller.
    if (stackTraceLines && stackTraceLines.length > 1) {
        return stackTraceLines[1].trim();
    }
    else {
        return "";
    }
};
exports.default = calledFunction;
