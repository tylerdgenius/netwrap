import { fetcher } from "netwrap";
import styles from "./page.module.css";

export default async function Home() {
  const api = fetcher<void, { id: number; title: string }>({
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      return res.json();
    },
  });

  api.onLoadingChange((data) => {
    console.log("Loading changed:", data);
  })

  api.onDataChange((data) => {
    console.log("Data changed:", data);
  });

  await api.trigger();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>netwrap Next.js test</h1>
        <div className={styles.ctas}>
          <button
            className={styles.primary}
            // onClick={() => api.trigger()}
            disabled={api.isLoading}
          >
            {api.isLoading ? "Loading..." : "Fetch data"}
          </button>
          <button
            className={styles.secondary}
            // onClick={() => api.invalidateCache()}
            disabled={api.isLoading}
          >
            Clear cache
          </button>
        </div>
        <div className={styles.intro}>
          {api.error ? <p>Request failed.</p> : null}
          {api.data && (
            <p>
              #{api.data.id} - {api.data.title}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
