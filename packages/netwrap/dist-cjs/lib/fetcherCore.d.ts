import { HandlerProps, ResponseHandler, useFetcherProps } from "../types";
declare class FetcherCore<RequestType = any, ResponsePayloadType = any, ErrorResponseType = unknown> {
    private props;
    private options?;
    private mainData;
    private mainError;
    private isLoading;
    private cache;
    private emitter;
    private responseHandler;
    constructor(props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>, options?: {
        logger?: import("../types").Logger | undefined;
        responseHandler?: ResponseHandler | undefined;
    } | undefined);
    updateProps(nextProps: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>): void;
    get data(): ResponsePayloadType | null;
    get error(): unknown;
    get loading(): boolean;
    onLoadingChange(listener: (isLoading: boolean) => void): void;
    offLoadingChange(listener: (isLoading: boolean) => void): void;
    onDataChange(listener: (data: ResponsePayloadType | null) => void): void;
    offDataChange(listener: (data: ResponsePayloadType | null) => void): void;
    onErrorChange(listener: (error: ErrorResponseType | unknown) => void): void;
    offErrorChange(listener: (error: ErrorResponseType | unknown) => void): void;
    invalidateCache(): void;
    trigger(triggerData?: RequestType): Promise<HandlerProps>;
    private setLoading;
    private setData;
    private setError;
}
export default FetcherCore;
//# sourceMappingURL=fetcherCore.d.ts.map