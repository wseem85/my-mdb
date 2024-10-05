import { useEffect, useState } from "react";
import searchMultiMedia from "../services/apiMultimediaSearch";

export function useMultimedisSearch(query) {
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchResults() {
        try {
          setIsLoading(true);
          const results = await searchMultiMedia(query);
          setSearchResults(results);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setSearchResults([]);

        setError("");

        return;
      }
      setSearchResults([]);

      fetchResults();
    },
    [query]
  );
  return { searchResults, isLoading, error };
}
