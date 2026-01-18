"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils"));
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (!this.events[event])
            return;
        this.events[event] = this.events[event].filter((l) => l !== listener);
    }
    emit(event, ...args) {
        if (!this.events[event])
            return;
        this.events[event].forEach((listener) => listener(...args));
    }
}
class FetcherCore {
    constructor(props, options) {
        var _a;
        this.props = props;
        this.options = options;
        this.mainData = null;
        this.mainError = null;
        this.isLoading = false;
        this.cache = { hasCache: false, data: null };
        this.emitter = new EventEmitter();
        this.responseHandler = (_a = options === null || options === void 0 ? void 0 : options.responseHandler) !== null && _a !== void 0 ? _a : utils_1.default.responseHandler;
        this.onLoadingChange = this.onLoadingChange.bind(this);
        this.offLoadingChange = this.offLoadingChange.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.offDataChange = this.offDataChange.bind(this);
        this.onErrorChange = this.onErrorChange.bind(this);
        this.offErrorChange = this.offErrorChange.bind(this);
        this.invalidateCache = this.invalidateCache.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    updateProps(nextProps) {
        this.props = nextProps;
    }
    get data() {
        return this.mainData;
    }
    get error() {
        return this.mainError;
    }
    get loading() {
        return this.isLoading;
    }
    onLoadingChange(listener) {
        this.emitter.on("isLoading", listener);
    }
    offLoadingChange(listener) {
        this.emitter.off("isLoading", listener);
    }
    onDataChange(listener) {
        this.emitter.on("data", listener);
    }
    offDataChange(listener) {
        this.emitter.off("data", listener);
    }
    onErrorChange(listener) {
        this.emitter.on("error", listener);
    }
    offErrorChange(listener) {
        this.emitter.off("error", listener);
    }
    invalidateCache() {
        this.cache = { hasCache: false, data: null };
        this.setData(null);
    }
    async trigger(triggerData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (this.cache.hasCache) {
            const cachedData = this.cache.data;
            this.setData(cachedData);
            return this.responseHandler({
                message: "Returned cached response",
                payload: cachedData,
            });
        }
        this.setLoading(true);
        (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.logger) === null || _b === void 0 ? void 0 : _b.call(_a, "Fetching...");
        const hijackedData = await ((_d = (_c = this.props) === null || _c === void 0 ? void 0 : _c.onStartQuery) === null || _d === void 0 ? void 0 : _d.call(_c, triggerData));
        const finalTriggerData = hijackedData !== undefined ? hijackedData : triggerData;
        try {
            const data = await this.props.queryFn(finalTriggerData);
            (_f = (_e = this.props) === null || _e === void 0 ? void 0 : _e.onSuccess) === null || _f === void 0 ? void 0 : _f.call(_e, data);
            this.setData(data);
            this.cache = { hasCache: true, data: data };
            return this.responseHandler({
                message: "Successfully made request",
                payload: data,
            });
        }
        catch (error) {
            (_h = (_g = this.props) === null || _g === void 0 ? void 0 : _g.onError) === null || _h === void 0 ? void 0 : _h.call(_g, error);
            this.setError(error);
            return {
                status: false,
                message: "Unable to make request",
                payload: null,
            };
        }
        finally {
            (_k = (_j = this.props) === null || _j === void 0 ? void 0 : _j.onFinal) === null || _k === void 0 ? void 0 : _k.call(_j);
            this.setLoading(false);
        }
    }
    setLoading(isLoading) {
        this.isLoading = isLoading;
        this.emitter.emit("isLoading", isLoading);
    }
    setData(data) {
        this.mainData = data;
        this.emitter.emit("data", data);
    }
    setError(error) {
        this.mainError = error;
        this.emitter.emit("error", error);
    }
}
exports.default = FetcherCore;
