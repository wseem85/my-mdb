import { POSTERBASEURLMD } from "../utils/variables";
import { MdOutlineStar, MdStar } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export default function TopRatedMultimediaBox({ movie }) {
  const watchList = useSelector((store) => store.lists.watchList);
  const watchedList = useSelector((store) => store.lists.watchedList);
  const isWatch = watchList?.find((el) => +el.id === movie.id);
  const isWatched = watchedList?.find((el) => +el.id === movie.id);

  const userRating = isWatched?.userRating;

  const {
    type,
    id,
    name,
    original_name,
    title,

    first_air_date,
    poster_path: poster,
    vote_average,

    release_date,
  } = movie;
  return (
    <Link className="" to={`multimedia/${type}/${id}`}>
      <div className="flex  gap-2   border-b border-b-1 xs:border-none pb-4">
        <img
          className=" w-1/4  h-full object-cover"
          src={`${POSTERBASEURLMD}${poster}`}
        />

        <div className=" ps-3  grow  flex flex-col gap-1">
          <h6 className=" font-semibold">{title || original_name || name}</h6>
          <p className="flex gap-1 items-center">
            <MdOutlineDateRange />
            {first_air_date
              ? new Date(first_air_date).getFullYear()
              : new Date(release_date).getFullYear()}
          </p>
          <div className="flex flex-col gap-1">
            <p className="flex gap-1 items-center font-semibold">
              {" "}
              <MdOutlineStar />
              {vote_average.toFixed(1)}
            </p>
            <div className="flex gap-2">
              {(isWatch || isWatched) && (
                <div
                  className={`text-sm ps-2 top-6 left-0 w-fit px-2 ${
                    isWatched ? "bg-secondary" : "bg-primary"
                  } text-white `}
                >
                  {isWatched ? (
                    <div className="flex gap-1 items-center">
                      <span>Watched</span>
                      <MdStar />
                      <span className="text-white">{userRating}</span>
                    </div>
                  ) : (
                    "Watch"
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

TopRatedMultimediaBox.propTypes = {
  movie: PropTypes.object,
};
