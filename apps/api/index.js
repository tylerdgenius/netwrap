const { fetcher } = require("netwrap");

const client = fetcher({
  queryFn: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    return res.json();
  },
});

client.trigger().then((result) => {
  console.log("API test result:", result);
});
