import React, { forwardRef, useImperativeHandle, act } from "react";
import { createRoot, Root } from "react-dom/client";
import { fetcher, useFetcher } from "../src";
import type { useFetcherProps } from "../src/types";

type HookHandle = {
  trigger: (data?: any) => Promise<any>;
  invalidateCache: () => void;
  getSnapshot: () => {
    data: any;
    error: any;
    isLoading: boolean;
  };
};

const HookHarness = forwardRef<
  HookHandle,
  {
    options: useFetcherProps<any, any, any>;
  }
>(({ options }, ref) => {
  const hook = useFetcher<any, any, any>(options);

  useImperativeHandle(ref, () => ({
    trigger: hook.trigger,
    invalidateCache: hook.invalidateCache,
    getSnapshot: () => ({
      data: hook.data,
      error: hook.error,
      isLoading: hook.isLoading,
    }),
  }));

  return null;
});

describe("fetcher", () => {
  it("returns data and caches until invalidated", async () => {
    const queryFn = jest.fn(async () => ({ ok: true }));
    const client = fetcher({ queryFn });

    const first = await client.trigger();
    const second = await client.trigger();

    expect(first.status).toBe(true);
    expect(first.payload).toEqual({ ok: true });
    expect(second.message).toBe("Returned cached response");
    expect(queryFn).toHaveBeenCalledTimes(1);

    client.invalidateCache();
    const third = await client.trigger();
    expect(third.message).toBe("Successfully made request");
    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  it("allows onStartQuery to hijack request data (sync and async)", async () => {
    const queryFn = jest.fn(async (value?: number) => (value ?? 0) * 2);
    const client = fetcher({
      queryFn,
      onStartQuery: (value) => (value ?? 0) + 1,
    });

    await client.trigger(2);
    expect(queryFn).toHaveBeenCalledWith(3);

    const asyncClient = fetcher({
      queryFn,
      onStartQuery: async (value?: number) => (value ?? 0) + 5,
    });

    await asyncClient.trigger(1);
    expect(queryFn).toHaveBeenCalledWith(6);
  });

  it("reports errors and keeps status false", async () => {
    const error = new Error("boom");
    const queryFn = jest.fn(async () => {
      throw error;
    });

    const client = fetcher({ queryFn });
    const result = await client.trigger();

    expect(result.status).toBe(false);
    expect(result.payload).toBeNull();
    expect(client.error).toBe(error);
  });

  it("emits loading changes", async () => {
    const queryFn = jest.fn(async () => "ok");
    const client = fetcher({ queryFn });
    const loadingStates: boolean[] = [];

    client.onLoadingChange((isLoading) => loadingStates.push(isLoading));
    await client.trigger();

    expect(loadingStates).toEqual([true, false]);
  });
});

describe("useFetcher", () => {
  let root: Root;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("returns data and caches until invalidated", async () => {
    const queryFn = jest.fn(async () => ({ ok: true }));
    const ref = React.createRef<HookHandle>();

    act(() => {
      root.render(<HookHarness ref={ref} options={{ queryFn }} />);
    });

    await act(async () => {
      await ref.current?.trigger();
    });

    expect(ref.current?.getSnapshot().data).toEqual({ ok: true });
    expect(queryFn).toHaveBeenCalledTimes(1);

    await act(async () => {
      await ref.current?.trigger();
    });

    expect(queryFn).toHaveBeenCalledTimes(1);

    act(() => {
      ref.current?.invalidateCache();
    });

    await act(async () => {
      await ref.current?.trigger();
    });

    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  it("allows onStartQuery to hijack request data", async () => {
    const queryFn = jest.fn(async (value?: number) => value ?? 0);
    const ref = React.createRef<HookHandle>();

    act(() => {
      root.render(
        <HookHarness
          ref={ref}
          options={{
            queryFn,
            onStartQuery: (value?: number) => (value ?? 0) + 10,
          }}
        />
      );
    });

    await act(async () => {
      await ref.current?.trigger(5);
    });

    expect(queryFn).toHaveBeenCalledWith(15);
  });

  it("tracks loading state", async () => {
    const queryFn = jest.fn(async () => "ok");
    const ref = React.createRef<HookHandle>();

    act(() => {
      root.render(<HookHarness ref={ref} options={{ queryFn }} />);
    });

    expect(ref.current?.getSnapshot().isLoading).toBe(false);

    await act(async () => {
      const promise = ref.current?.trigger();
      await Promise.resolve();
      expect(ref.current?.getSnapshot().isLoading).toBe(true);
      await promise;
    });

    expect(ref.current?.getSnapshot().isLoading).toBe(false);
  });
});
