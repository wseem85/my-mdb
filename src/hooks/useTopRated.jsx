import { useEffect, useState } from "react";

import { getTopRated } from "../services/apiTopRated";
export function useTopRated() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [error, setError] = useState("");
  const [isLoadingTopRated, setIsLoadinngTopRated] = useState(false);
  useEffect(function () {
    async function fetchTrending() {
      try {
        setIsLoadinngTopRated(true);
        const data = await getTopRated();

        setTopRatedMovies(data.topRatedMovies);
        setTopRatedTv(data.topRatedTv);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoadinngTopRated(false);
      }
    }
    fetchTrending();
  }, []);
  return { topRatedMovies, topRatedTv, error, isLoadingTopRated };
}
