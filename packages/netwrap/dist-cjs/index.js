"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateDataCall = exports.responseHandler = exports.logger = exports.isReactAvailable = exports.calledFunction = exports.fetcher = void 0;
const lib_1 = __importDefault(require("./lib"));
const utils_1 = __importDefault(require("./utils"));
exports.fetcher = lib_1.default.fetcher;
exports.calledFunction = utils_1.default.calledFunction, exports.isReactAvailable = utils_1.default.isReactAvailable, exports.logger = utils_1.default.logger, exports.responseHandler = utils_1.default.responseHandler, exports.simulateDataCall = utils_1.default.simulateDataCall;
__exportStar(require("./types"), exports);
