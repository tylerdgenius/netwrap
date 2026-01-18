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
