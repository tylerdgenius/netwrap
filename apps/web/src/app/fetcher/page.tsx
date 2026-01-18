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
