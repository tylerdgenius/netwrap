import { useFetcherProps } from "../types";
declare const useFetcher: <RequestType = any, ResponsePayloadType = any, ErrorResponseType = unknown>(props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>) => {
    trigger: (triggerData?: RequestType | undefined) => Promise<import("../types").HandlerProps>;
    data: ResponsePayloadType | null;
    error: unknown;
    isLoading: boolean;
    invalidateCache: () => void;
};
export default useFetcher;
//# sourceMappingURL=useFetcher.d.ts.map