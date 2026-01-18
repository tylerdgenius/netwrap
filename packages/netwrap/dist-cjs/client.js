"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConsole = exports.useFetcher = void 0;
var useFetcher_1 = require("./hooks/useFetcher");
Object.defineProperty(exports, "useFetcher", { enumerable: true, get: function () { return __importDefault(useFetcher_1).default; } });
var useConsole_1 = require("./hooks/useConsole");
Object.defineProperty(exports, "useConsole", { enumerable: true, get: function () { return __importDefault(useConsole_1).default; } });
