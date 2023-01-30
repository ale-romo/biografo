import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
      (
        async () => {
          try {
            setLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
          } catch (error : any) {
            setError(error);
            console.log("error", error);
          } finally {
            setLoading(false);
          }
        }
      )();
  }, [url]);
    return { data, error, loading };
  };
