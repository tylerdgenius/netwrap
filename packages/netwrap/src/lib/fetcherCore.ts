import utils from "../utils";
import { HandlerProps, ResponseHandler, useFetcherProps } from "../types";

class EventEmitter {
  private events: { [key: string]: Function[] } = {};

  on(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Function) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => listener(...args));
  }
}

class FetcherCore<
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown,
> {
  private mainData: ResponsePayloadType | null = null;
  private mainError: ErrorResponseType | unknown = null;
  private isLoading = false;
  private cache = { hasCache: false, data: null as ResponsePayloadType | null };
  private emitter = new EventEmitter();
  private responseHandler: ResponseHandler;

  constructor(
    private props: useFetcherProps<
      RequestType,
      ResponsePayloadType,
      ErrorResponseType
    >,
    private options?: {
      logger?: typeof utils.logger;
      responseHandler?: ResponseHandler;
    },
  ) {
    this.responseHandler = options?.responseHandler ?? utils.responseHandler;
  }

  updateProps(
    nextProps: useFetcherProps<
      RequestType,
      ResponsePayloadType,
      ErrorResponseType
    >,
  ) {
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

  onLoadingChange(listener: (isLoading: boolean) => void) {
    this.emitter.on("isLoading", listener);
  }

  offLoadingChange(listener: (isLoading: boolean) => void) {
    this.emitter.off("isLoading", listener);
  }

  onDataChange(listener: (data: ResponsePayloadType | null) => void) {
    this.emitter.on("data", listener);
  }

  offDataChange(listener: (data: ResponsePayloadType | null) => void) {
    this.emitter.off("data", listener);
  }

  onErrorChange(listener: (error: ErrorResponseType | unknown) => void) {
    this.emitter.on("error", listener);
  }

  offErrorChange(listener: (error: ErrorResponseType | unknown) => void) {
    this.emitter.off("error", listener);
  }

  invalidateCache() {
    this.cache = { hasCache: false, data: null };
    this.setData(null);
  }

  async trigger(triggerData?: RequestType): Promise<HandlerProps> {
    if (this.cache.hasCache) {
      const cachedData = this.cache.data;
      this.setData(cachedData);
      return this.responseHandler({
        message: "Returned cached response",
        payload: cachedData,
      });
    }

    this.setLoading(true);
    this.options?.logger?.("Fetching...");
    const hijackedData = await this.props?.onStartQuery?.(triggerData);
    const finalTriggerData =
      hijackedData !== undefined ? hijackedData : triggerData;

    try {
      const data = await this.props.queryFn(finalTriggerData);
      this.props?.onSuccess?.(data as ResponsePayloadType);
      this.setData(data as ResponsePayloadType);
      this.cache = { hasCache: true, data: data as ResponsePayloadType };

      return this.responseHandler({
        message: "Successfully made request",
        payload: data,
      });
    } catch (error: unknown) {
      this.props?.onError?.(error as ErrorResponseType);
      this.setError(error);
      return {
        status: false,
        message: "Unable to make request",
        payload: null,
      };
    } finally {
      this.props?.onFinal?.();
      this.setLoading(false);
    }
  }

  private setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.emitter.emit("isLoading", isLoading);
  }

  private setData(data: ResponsePayloadType | null) {
    this.mainData = data;
    this.emitter.emit("data", data);
  }

  private setError(error: ErrorResponseType | unknown) {
    this.mainError = error;
    this.emitter.emit("error", error);
  }
}

export default FetcherCore;
