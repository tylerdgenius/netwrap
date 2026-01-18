declare const _default: {
    useFetcher: <RequestType = any, ResponsePayloadType = any, ErrorResponseType = unknown>(props: import("..").useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>) => {
        trigger: (triggerData?: RequestType | undefined) => Promise<import("..").HandlerProps>;
        data: ResponsePayloadType | null;
        error: unknown;
        isLoading: boolean;
        invalidateCache: () => void;
    };
    useConsole: () => {
        log: import("..").Logger;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map