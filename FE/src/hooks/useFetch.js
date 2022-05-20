import { useEffect, useState } from "react";
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      setData(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);
  return { data, loading, error, refetch: fetchData };
};
export default useFetch;
