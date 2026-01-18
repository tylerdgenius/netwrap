# netwrap

Lightweight request helpers with a React hook and a plain fetcher.

## Installation

```bash
npm install netwrap
```

```bash
yarn add netwrap
```

```bash
pnpm add netwrap
```

## Peer Dependencies

- `react` (only required when using `useFetcher`)

## Usage

### Entry points

- `netwrap`: server-safe utilities and `fetcher`
- `netwrap/client`: React hooks (client components only)

### Warnings and deprecations

- `useFetcher` must be imported from `netwrap/client` and used only in client components.
- Client-component usage of `fetcher` is deprecated and will be removed in the next version. Use `useFetcher` instead.
- `fetcher` is not reactive; do not destructure `data` or `error` if you expect live updates.

### useFetcher (React client component)

```tsx
"use client";

import { useFetcher } from "netwrap/client";
import { useState } from "react";

export default function ClientPage() {
  const [log, setLog] = useState<string[]>([]);
  const { trigger, data, error, isLoading, invalidateCache } = useFetcher<
    void,
    { id: number; title: string }
  >({
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
    onStartQuery: () => setLog((prev) => ["start", ...prev]),
    onSuccess: () => setLog((prev) => ["success", ...prev]),
    onError: () => setLog((prev) => ["error", ...prev]),
    onFinal: () => setLog((prev) => ["final", ...prev]),
  });

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h1>Client useFetcher test</h1>
      <p>Click to trigger a client-side fetch and watch state updates.</p>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <button onClick={() => trigger()} disabled={isLoading}>
          {isLoading ? "Loading..." : "Fetch data"}
        </button>
        <button onClick={() => invalidateCache()} disabled={isLoading}>
          Clear cache
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Status: {isLoading ? "loading" : "idle"}</div>
        {error ? <div style={{ color: "crimson" }}>Error</div> : null}
        {data ? (
          <div>
            Result: #{data.id} - {data.title}
          </div>
        ) : (
          <div>No data yet</div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>Event log</strong>
        <ul>
          {log.slice(0, 6).map((item, idx) => (
            <li key={`${item}-${idx}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### fetcher (client component, deprecated)

```tsx
"use client";

import { fetcher } from "netwrap";
import { useState } from "react";

export default function ClientFetcherPage() {
  const [log, setLog] = useState<string[]>([]);
  const [api] = useState(() =>
    fetcher<void, { id: number; title: string }>({
      queryFn: async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        return res.json();
      },
      onStartQuery: () => setLog((prev) => ["start", ...prev]),
      onSuccess: () => setLog((prev) => ["success", ...prev]),
      onError: () => setLog((prev) => ["error", ...prev]),
      onFinal: () => setLog((prev) => ["final", ...prev]),
    }),
  );

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h1>Client fetcher test</h1>
      <p>Using fetcher in a client component with a stable instance.</p>

      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <button onClick={() => api.trigger()} disabled={api.isLoading}>
          {api.isLoading ? "Loading..." : "Fetch data"}
        </button>
        <button onClick={() => api.invalidateCache()} disabled={api.isLoading}>
          Clear cache
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <div>Status: {api.isLoading ? "loading" : "idle"}</div>
        {api.error ? <div style={{ color: "crimson" }}>Error</div> : null}
        {api.data ? (
          <div>
            Result: #{api.data.id} - {api.data.title}
          </div>
        ) : (
          <div>No data yet</div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>Event log</strong>
        <ul>
          {log.slice(0, 6).map((item, idx) => (
            <li key={`${item}-${idx}`}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## API

### fetcher(options)

Returns:
- `trigger(triggerData?)`: executes the request
- `data`: last response data (if successful)
- `error`: last error (if any)
- `isLoading`: loading state
- `getData()`: get the latest data without subscribing
- `getError()`: get the latest error without subscribing
- `getIsLoading()`: get the latest loading state without subscribing
- `onLoadingChange(listener)`: subscribe to loading state changes
- `onDataChange(listener)`: subscribe to data changes
- `onErrorChange(listener)`: subscribe to error changes
- `invalidateCache()`: clears cached response data

Note: `fetcher` is not reactive. Avoid destructuring `data` or `error` from it if you expect live updates; access them from the returned object (`api.data`) or use the change listeners.

### useFetcher(options)

Returns:
- `trigger(triggerData?)`: executes the request
- `data`: last response data (if successful)
- `error`: last error (if any)
- `isLoading`: loading state
- `invalidateCache()`: clears cached response data

### Options

Both `fetcher` and `useFetcher` accept:
- `queryFn` (required): async function that performs the request
- `onStartQuery`: called before the request begins; return a value to override `trigger` data (sync or async)
- `onSuccess`: called with the response data
- `onError`: called with the error
- `onFinal`: called when the request completes (success or error)

## Examples

### Request with parameters

```ts
const { trigger } = fetcher({
  queryFn: async (id: number) => {
    const res = await fetch(`/api/items/${id}`);
    return res.json();
  },
});

await trigger(123);
```

### Cache behavior (fetcher)

```ts
const { trigger, invalidateCache } = fetcher({
  queryFn: async () => {
    const res = await fetch("/api/value");
    return res.json();
  },
});

await trigger(); // fetches
await trigger(); // returns cached response
invalidateCache();
await trigger(); // fetches again
```

### Cache behavior (useFetcher)

```ts
const { trigger, invalidateCache } = useFetcher({
  queryFn: async () => {
    const res = await fetch("/api/value");
    return res.json();
  },
});

await trigger(); // fetches
await trigger(); // returns cached response
invalidateCache();
await trigger(); // fetches again
```

## Contributing

1. Fork and clone the repo.
2. Install dependencies with `npm install`.
3. Run tests with `npm test`.
4. Open a PR with a clear description of the change.

## License

MIT
