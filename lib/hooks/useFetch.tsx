import { useState, useEffect } from 'react'

export const useFetch = (url: string) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setResponse(json);
        } catch (error : any) {
          setError(error);
          console.log("error", error);
        }
      };

      const data = fetchData();
  }, [url]);



    return { response, error };
  };
