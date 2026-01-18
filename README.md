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

### fetcher (non-React)

```ts
import { fetcher } from "netwrap";

const { trigger, onLoadingChange } = fetcher({
  queryFn: async () => {
    const res = await fetch("https://api.example.com/data");
    return res.json();
  },
});

onLoadingChange((isLoading) => {
  console.log("Loading:", isLoading);
});

const result = await trigger();
console.log(result.status, result.payload);
```

### useFetcher (React)

```tsx
import { useFetcher } from "netwrap";

function Users() {
  const { trigger, data, error, isLoading, invalidateCache } = useFetcher<
    void,
    { id: number; name: string }[],
    { message: string }
  >({
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });

  return (
    <div>
      <button onClick={() => trigger()} disabled={isLoading}>
        Load
      </button>
      <button onClick={() => invalidateCache()} disabled={isLoading}>
        Clear cache
      </button>
      {error && <p>Failed</p>}
      {data && data.map((u) => <div key={u.id}>{u.name}</div>)}
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
- `onLoadingChange(listener)`: subscribe to loading state changes

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
- `onStartQuery`: called before the request begins
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
