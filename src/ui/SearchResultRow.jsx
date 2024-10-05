import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { genreIdToText } from "../utils/helpers";
import { MdLiveTv } from "react-icons/md";
import { IoMdFilm } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";

import { IconContext } from "react-icons";
import { POSTERBASEURLSM } from "../utils/variables";
import { useSelector } from "react-redux";
import { PiStarThin } from "react-icons/pi";

export default function SearchResultRow({ multimedia }) {
  const watchList = useSelector((store) => store.lists.watchList);
  const watchedList = useSelector((store) => store.lists.watchedList);
  const isWatch = watchList.find((el) => +el.id === multimedia.id);
  const isWatched = watchedList.find((el) => +el.id === multimedia.id);
  const userRating = isWatched?.userRating;
  const {
    id,
    type,
    name,
    original_name,
    title,
    genre_ids,
    first_air_date,
    poster_path: poster,
    vote_average,
    vote_count,
    release_date,
  } = multimedia;

  return (
    <div
      className={`  bg-white relative pb-6 shadow-md border-l-4 ${
        type === "movie" ? " border-primary" : " border-secondary"
      } `}
    >
      <div className="max-w-full  grid  gap-2 ">
        <div className=" ">
          <Link to={`multimedia/${type}/${id}`}>
            <h3
              className={`pl-2 cursor-pointer text-lg text-white  ${
                type === "movie" ? " bg-primary" : " bg-secondary"
              }`}
            >
              {name || original_name || title}
            </h3>
          </Link>
        </div>

        <div className=" pl-2  flex">
          {poster ? (
            <Link to={`multimedia/${type}/${id}`}>
              <img
                className="h-36 cursor-pointer object-cover "
                src={`${POSTERBASEURLSM}${poster}`}
                alt={`Poster of ${name}`}
              />
            </Link>
          ) : (
            <div className="flex pr-3 justify-start items-center">
              No Avalaible Poster
            </div>
          )}
          {(isWatch || isWatched) && (
            <div className="absolute flex items-center gap-1 px-2 bottom-0 right-0  bg-transparentPrimary text-white ">
              {isWatched ? `Watched ${userRating}` : "Watch"}{" "}
              {isWatched && <PiStarThin />}
            </div>
          )}
          <div className="ml-3">
            <div className={`flex flex-col    gap-1  p-1`}>
              <div className="flex gap-1  items-center">
                <IconContext.Provider
                  value={{
                    color:
                      multimedia.type === "movie" ? "primary" : "secondary",
                  }}
                >
                  {type === "movie" ? (
                    <IoMdFilm className="w-6 text-primary h-6 " />
                  ) : (
                    <MdLiveTv className="w-6 text-secondary h-6 " />
                  )}
                </IconContext.Provider>
                <span className="text-xs font-bold">
                  {type === "movie" ? "MOVIE" : "TV"}
                </span>{" "}
              </div>
              <div className="flex flex-wrap gap-1">
                {genre_ids?.map((genreId) => (
                  <span className="text-sm xs:text-base" key={genreId}>
                    {genreIdToText(genreId, type)}
                  </span>
                ))}
              </div>
              <p className="">
                {type === "movie"
                  ? new Date(release_date).getFullYear()
                  : new Date(first_air_date).getFullYear()}
              </p>
            </div>
            <div
              className={`flex  flex-col w-fit  justify-center gap-1 rounded p-1`}
            >
              <div className="flex items-center gap-[2px]">
                <MdStarRate />
                <span>{vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-[2px]">
                <MdOutlineNumbers />
                <span> {vote_count} votes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchResultRow.propTypes = {
  multimedia: PropTypes.object,
};
