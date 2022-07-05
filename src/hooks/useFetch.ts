import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      setIsPending(true);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (e) {
        const error = e as Error;
        if (error.name === "AbortError") return;
        setError(error);
      }
      setIsPending(false);
    })();

    return () => controller.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
