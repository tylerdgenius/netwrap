import { useFetcherProps } from "../types";
declare const fetcher: <RequestType = any, ResponsePayloadType = any, ErrorResponseType = unknown>(props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>) => {
    trigger: (triggerData?: RequestType | undefined) => Promise<{
        message: string;
        payload: any;
        status?: boolean;
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
export default fetcher;
//# sourceMappingURL=fetcher.d.ts.map