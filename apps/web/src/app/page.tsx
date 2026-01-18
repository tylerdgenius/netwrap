"use client";

import { useFetcher } from "netwrap";
import styles from "./page.module.css";

export default function Home() {
  const { trigger, data, error, isLoading, invalidateCache } = useFetcher<
    void,
    { id: number; title: string }
  >({
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>netwrap Next.js test</h1>
        <div className={styles.ctas}>
          <button
            className={styles.primary}
            onClick={() => trigger()}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Fetch data"}
          </button>
          <button
            className={styles.secondary}
            onClick={() => invalidateCache()}
            disabled={isLoading}
          >
            Clear cache
          </button>
        </div>
        <div className={styles.intro}>
          {error && <p>Request failed.</p>}
          {data && (
            <p>
              #{data.id} - {data.title}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
