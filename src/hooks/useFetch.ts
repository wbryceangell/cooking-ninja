import { useEffect, useRef, useState } from "react";

const useFetch = <T>(input: RequestInfo | URL, init?: RequestInit) => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const _init = useRef(init).current;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const init = { ..._init, signal };

    (async () => {
      setIsPending(true);
      try {
        const response = await fetch(input, init);
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
  }, [input, _init]);

  return { data, isPending, error };
};

export default useFetch;
