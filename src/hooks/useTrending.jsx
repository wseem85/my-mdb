import { useEffect, useState } from "react";
import { getTrendingData } from "../services/apiPopularNow";
export function useTrending() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState("");
  const [isLoadingTrending, setIsLoadingTrending] = useState(false);
  useEffect(function () {
    async function fetchTrending() {
      try {
        setIsLoadingTrending(true);
        const { trendingData } = await getTrendingData();

        setTrending(trendingData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadingTrending(false);
      }
    }
    fetchTrending();
  }, []);
  return { trending, error, isLoadingTrending };
}
