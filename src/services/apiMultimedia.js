import axios from "axios";
import { omdbKEY } from "../utils/variables";
import { KEY } from "../utils/variables";
export default async function getMultimedia(id, type) {
  let result;

  try {
    if (type === "movie") {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&include_adult=false&append_to_response=credits,release_dates`,
        {
          params: {
            videos: true,
            credits: true,
          },
        }
      );

      const { data: tmdbData } = res;

      const imdbId = tmdbData.imdb_id;

      const omdbRes = await axios.get(
        `https://www.omdbapi.com/?apikey=${omdbKEY}&i=${imdbId}`
      );

      const { data: omdbData } = omdbRes;

      const ratingArr = [
        ...omdbData.Ratings,

        { Source: "TMDB", Value: `${tmdbData.vote_average}` },
      ];
      const finalRatingArr = ratingArr.filter((item) => item.Value !== "N/A");
      const directors = tmdbData.credits.crew
        .filter(
          (el) =>
            el.job === "Director" || el.known_for_department === "Directing"
        )
        .map((el) => el.name);
      const writers = tmdbData.credits.crew
        .filter(
          (el) =>
            el.job === "Writer" ||
            el.job === "Story" ||
            el.job === "Editor" ||
            el.known_for_department === "Writing"
        )
        .map((el) => el.name);

      const uniqWriters = Array.from(new Set(writers));
      const uniqDirectors = Array.from(new Set(directors));
      const rated =
        tmdbData.release_dates.results
          .find((el) => el.iso_3166_1 === "US")
          ?.release_dates.find((el) => el.certification !== "")
          ?.certification || "Unknown";

      const movie = {
        awards: omdbData.Awards,
        id,

        directors: uniqDirectors,
        writers: uniqWriters,
        cast: tmdbData.credits.cast.slice(0, 6),

        genres: tmdbData.genres,
        languages: tmdbData.spoken_languages,

        rated: rated,
        ratings: finalRatingArr,
        runtime: tmdbData.runtime,
        title: tmdbData.title,
        overview: tmdbData.overview,

        year: tmdbData.release_date.slice(0, 4),
        homepage: tmdbData.homepage,

        poster: tmdbData.poster_path,
        backPoster: tmdbData.backdrop_path,
        mtdbrating: tmdbData.vote_average,
        mtdbvotes: tmdbData.vote_count,
        type: "movie",
      };
      result = movie;
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&include_adult=false&append_to_response=seasons,credits,content_ratings,season/1,season/2,season/3,season/4,season/5,season/6,season/7,season/8,season/9,season/10,season/11,season/12,season/13`,
        {
          params: {
            videos: true,
            credits: true,
          },
        }
      );

      const { data: tmdbData } = res;

      const { seasons } = tmdbData;

      const omdbRes = await axios.get(
        `http://www.omdbapi.com/?apikey=${omdbKEY}&t=${tmdbData.name}`
      );
      const { data: omdbData } = omdbRes;

      const ratingArr = [
        ...omdbData.Ratings,

        { Source: "TMDB", Value: `${tmdbData.vote_average}` },
      ];
      const finalRatingArr = ratingArr.filter((item) => item.Value !== "N/A");
      const directors = tmdbData.credits.crew
        .filter(
          (el) =>
            el.job === "Director" || el.known_for_department === "Directing"
        )
        .map((el) => el.name);
      const writers = tmdbData.credits.crew
        .filter(
          (el) =>
            el.job === "Writer" ||
            el.job === "Story" ||
            el.job === "Editor" ||
            el.known_for_department === "Writing"
        )
        .map((el) => el.name);

      const uniqWriters = Array.from(new Set(writers));
      const uniqDirectors = Array.from(new Set(directors));
      const rated =
        tmdbData.content_ratings?.results?.find((el) => el.iso_3166_1 === "US")
          ?.rating || "Unknown";

      const series = {
        awards: omdbData.Awards,
        id,

        cast: tmdbData.credits.cast.slice(0, 6),

        genres: tmdbData.genres,
        languages: tmdbData.spoken_languages,
        metascore: omdbData.Metascore,
        rated,
        ratings: finalRatingArr,
        directors: uniqDirectors,
        writers: uniqWriters,
        seasons,
        status: tmdbData.status,
        title: tmdbData.name,
        overview: tmdbData.overview,

        year: omdbData.Year,
        homepage: tmdbData.homepage,

        poster: tmdbData.poster_path,
        backPoster: tmdbData.backdrop_path,
        mtdbrating: tmdbData.vote_average,
        mtdbvotes: tmdbData.vote_count,
        numseasons: tmdbData.number_of_seasons,
        numepisods: tmdbData.number_of_episodes,
        type: "series",
      };

      result = series;
    }
  } catch (err) {
    const multimediaError = err.message;
    return { multimediaError };
  }
  return { result };
}
