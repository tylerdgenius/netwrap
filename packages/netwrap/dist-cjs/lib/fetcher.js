"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
const fetcherCore_1 = __importDefault(require("./fetcherCore"));
const fetcher = (props) => {
    const instance = new fetcherCore_1.default(props, { logger: utils_1.default.logger, responseHandler: utils_1.default.responseHandler });
    return {
        trigger: instance.trigger,
        invalidateCache: instance.invalidateCache,
        onLoadingChange: instance.onLoadingChange,
        onDataChange: instance.onDataChange,
        onErrorChange: instance.onErrorChange,
        getData: () => instance.data,
        getError: () => instance.error,
        getIsLoading: () => instance.loading,
        get data() {
            return instance.data;
        },
        get error() {
            return instance.error;
        },
        get isLoading() {
            return instance.loading;
        },
    };
};
exports.default = fetcher;
