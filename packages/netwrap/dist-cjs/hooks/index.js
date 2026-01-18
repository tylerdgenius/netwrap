"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useConsole_1 = __importDefault(require("./useConsole"));
const useFetcher_1 = __importDefault(require("./useFetcher"));
exports.default = {
    useFetcher: useFetcher_1.default,
    useConsole: useConsole_1.default,
};
