import utils from "../utils";
import { useFetcherProps } from "../types";
import FetcherCore from "./fetcherCore";

const fetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown,
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>,
): {
  trigger: (triggerData?: RequestType | undefined) => Promise<{
    message: string;
    payload: any;
    status?: boolean;
  }>;
  data: ResponsePayloadType | null;
  error: ErrorResponseType | unknown;
  isLoading: boolean;
  getData: () => ResponsePayloadType | null;
  getError: () => ErrorResponseType | unknown;
  getIsLoading: () => boolean;
  onLoadingChange: (listener: (isLoading: boolean) => void) => void;
  onDataChange: (listener: (data: ResponsePayloadType | null) => void) => void;
  onErrorChange: (
    listener: (error: ErrorResponseType | unknown) => void,
  ) => void;
  invalidateCache: () => void;
} => {
  const instance = new FetcherCore<
    RequestType,
    ResponsePayloadType,
    ErrorResponseType
  >(props, { logger: utils.logger, responseHandler: utils.responseHandler });

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

export default fetcher;
