"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetcherCore_1 = __importDefault(require("../lib/fetcherCore"));
const react_1 = require("react");
const useFetcher = (props) => {
    const instanceRef = (0, react_1.useRef)(null);
    if (!instanceRef.current) {
        instanceRef.current = new fetcherCore_1.default(props);
    }
    const instance = instanceRef.current;
    const [mainData, setData] = (0, react_1.useState)(instance.data);
    const [mainError, setError] = (0, react_1.useState)(instance.error);
    const [isLoading, setIsLoading] = (0, react_1.useState)(instance.loading);
    (0, react_1.useEffect)(() => {
        instance.updateProps(props);
    }, [instance, props]);
    (0, react_1.useEffect)(() => {
        const handleLoading = (loading) => setIsLoading(loading);
        const handleData = (data) => setData(data);
        const handleError = (error) => setError(error);
        instance.onLoadingChange(handleLoading);
        instance.onDataChange(handleData);
        instance.onErrorChange(handleError);
        return () => {
            instance.offLoadingChange(handleLoading);
            instance.offDataChange(handleData);
            instance.offErrorChange(handleError);
        };
    }, [instance]);
    return {
        trigger: instance.trigger.bind(instance),
        data: mainData,
        error: mainError,
        isLoading,
        invalidateCache: instance.invalidateCache.bind(instance),
    };
};
exports.default = useFetcher;
