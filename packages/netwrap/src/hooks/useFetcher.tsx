"use client";

import FetcherCore from "../lib/fetcherCore";
import { useFetcherProps } from "../types";

import { useEffect, useRef, useState } from "react";

const useFetcher = <
  RequestType = any,
  ResponsePayloadType = any,
  ErrorResponseType = unknown,
>(
  props: useFetcherProps<RequestType, ResponsePayloadType, ErrorResponseType>,
) => {
  const instanceRef =
    useRef<FetcherCore<RequestType, ResponsePayloadType, ErrorResponseType>>(
      null,
    );

  if (!instanceRef.current) {
    instanceRef.current = new FetcherCore(props);
  }

  const instance = instanceRef.current;

  const [mainData, setData] = useState<ResponsePayloadType | null>(
    instance.data,
  );
  const [mainError, setError] = useState<ErrorResponseType | unknown>(
    instance.error,
  );
  const [isLoading, setIsLoading] = useState(instance.loading);

  useEffect(() => {
    instance.updateProps(props);
  }, [instance, props]);

  useEffect(() => {
    const handleLoading = (loading: boolean) => setIsLoading(loading);
    const handleData = (data: ResponsePayloadType | null) => setData(data);
    const handleError = (error: ErrorResponseType | unknown) => setError(error);

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

export default useFetcher;
