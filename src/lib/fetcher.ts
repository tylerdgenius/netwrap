import { useFetcherProps } from "../types";
import utils from "../utils";
import FetcherCore from "./fetcherCore";

const fetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>
): {
  trigger: (triggerData?: RequestType | undefined) => Promise<{
    message: string;
    payload: any;
    status?: boolean;
  }>;
  data: ResponsePayloadType | null;
  error: ErrorResponseType | unknown;
  onLoadingChange: (listener: (isLoading: boolean) => void) => void;
  invalidateCache: () => void;
} => {
  const instance = new FetcherCore<RequestType, ResponsePayloadType, ErrorResponseType>(
    props,
    { logger: utils.logger, responseHandler: utils.responseHandler }
  );

  return instance;
};

export default fetcher;
