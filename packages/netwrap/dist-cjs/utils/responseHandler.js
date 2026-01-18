"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandler = ({ status = true, message, payload, }) => ({
    message,
    payload,
    status,
});
exports.default = responseHandler;
