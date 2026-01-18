export declare const fetcher: <RequestType = any, ResponsePayloadType = any, ErrorResponseType = unknown>(props: import("./types").useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>) => {
    trigger: (triggerData?: RequestType | undefined) => Promise<{
        message: string;
        payload: any;
        status?: boolean | undefined;
    }>;
    data: ResponsePayloadType | null;
    error: unknown;
    isLoading: boolean;
    getData: () => ResponsePayloadType | null;
    getError: () => unknown;
    getIsLoading: () => boolean;
    onLoadingChange: (listener: (isLoading: boolean) => void) => void;
    onDataChange: (listener: (data: ResponsePayloadType | null) => void) => void;
    onErrorChange: (listener: (error: unknown) => void) => void;
    invalidateCache: () => void;
};
export declare const calledFunction: () => string, isReactAvailable: () => boolean, logger: import("./types").Logger, responseHandler: import("./types").ResponseHandler, simulateDataCall: (delayInMilliseconds: number, mockData: any) => Promise<any>;
export * from "./types";
//# sourceMappingURL=index.d.ts.map