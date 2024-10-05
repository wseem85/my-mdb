import axios from "axios";

const KEY = "bc71e42b11c8ca538074aceb52e8b7e7";
const apiSearchMoviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}`;
const apiSearchSeriesUrl = `https://api.themoviedb.org/3/search/tv?api_key=${KEY}`;

export default async function searchMultiMedia(query) {
  let moviesResults = [];
  let seriesResults = [];
  let results;
  try {
    const moviesRes = await axios.get(apiSearchMoviesUrl, {
      params: {
        query: query,
        include_adult: false,
      },
    });

    const { results: movies } = moviesRes.data;
    for (const movie of movies) moviesResults.push({ ...movie, type: "movie" });
    const seriesRes = await axios.get(apiSearchSeriesUrl, {
      params: {
        query: query,
        include_adult: false,
      },
    });
    const { results: serieses } = seriesRes.data;
    for (const series of serieses)
      seriesResults.push({ ...series, type: "tv series" });
  } catch (err) {
    return err;
  } finally {
    results = [...moviesResults, ...seriesResults].sort(
      (a, b) => b.vote_count - a.vote_count
    );
  }
  return results;
}
