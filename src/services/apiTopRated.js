import axios from "axios";
import { KEY } from "../utils/variables";

export async function getTopRated() {
  try {
    const movies = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=500&api_key=${KEY}`
    );

    const topRatedMovies = movies.data.results.map((el) => ({
      ...el,
      type: "movie",
    }));

    const serieses1 = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=2000&api_key=${KEY}`
    );
    const topRatedTv1 = serieses1.data.results.map((el) => ({
      ...el,
      type: "tv series",
    }));
    const serieses2 = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2&sort_by=vote_average.desc&vote_count.gte=2000&api_key=${KEY}`
    );
    const topRatedTv2 = serieses2.data.results.map((el) => ({
      ...el,
      type: "tv series",
    }));
    const serieses3 = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=3&sort_by=vote_average.desc&vote_count.gte=2000&api_key=${KEY}`
    );
    const topRatedTv3 = serieses3.data.results.map((el) => ({
      ...el,
      type: "tv series",
    }));
    const topRatedTv = [...topRatedTv1, ...topRatedTv2, ...topRatedTv3]
      .filter((item) => {
        if (
          !(
            (item.original_language === "ja" && item.vote_count < 5000) ||
            (item.original_language === "ko" && item.vote_count < 5000) ||
            item.vote_count < 1000
          )
        )
          return item;
      })
      .sort((a, b) => b.vote_average - a.vote_average);
    return { topRatedMovies, topRatedTv };
  } catch (err) {
    console.error(err);
    const topRatedError = err.message;
    return { topRatedError };
  }
}
