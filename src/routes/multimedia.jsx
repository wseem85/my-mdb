import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import getMultimedia from "../services/apiMultimedia";
import withScrollToTop from "../ui/withScrollToTop";
import { BACKDROPBASEURL } from "../utils/variables";
import RatingBox from "../ui/ratingbox";
import { FaAward } from "react-icons/fa";
import CastBox from "../ui/castBox";
import { extractRatingInfo } from "../utils/helpers";
import SeasonBox from "../ui/seasonBox";
import { CiBookmarkMinus, CiLocationArrow1 } from "react-icons/ci";
import { MdStarRate } from "react-icons/md";
import IconButton from "../ui/iconButton";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";

import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchList,
  removeFromWatchedList,
  removeFromWatchList,
} from "../features/lists/listsSlice";
import { useEffect, useState } from "react";
import RatingModal from "../ui/ratingModal";
import Loading from "../ui/loading";
import { BiArrowBack } from "react-icons/bi";
import StarRating from "../ui/starRating";

export async function loader({ params }) {
  const { result, multimediaError } = await getMultimedia(
    params.id,
    params.type
  );

  return { result, multimediaError };
}
function MultimediapageComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState("");
  const watchedList = useSelector((store) => store.lists.watchedList);
  const { type, id } = useParams();
  const [userRating, setUserRating] = useState(
    watchedList?.find((item) => item.id === id)?.userRating
  );
  const navigate = useNavigate();
  const [ModalOpen, setModalOpen] = useState(false);
  const { result, multimediaError } = useLoaderData();

  const dispatch = useDispatch();
  const watchList = useSelector((store) => store.lists.watchList);
  const isWatch = watchList?.find((item) => item.id === id);
  const isWatched = watchedList?.find((item) => item.id === id);

  const {
    cast,
    directors,
    genres,
    awards,
    runtime,
    homepage,

    numepisods,
    numseasons,
    overview,
    poster,
    backPoster,
    ratings,
    seasons,

    title,
    year,
    writers,
    rated,
  } = result || {};

  function handleClickWatch() {
    if (isWatch) {
      dispatch(removeFromWatchList(id));
    } else {
      dispatch(addToWatchList({ id, title, poster, year, genres }));
    }
  }
  function handleClickWatched() {
    if (!isWatched) {
      setModalOpen(true);
    } else {
      dispatch(removeFromWatchedList(id));
      setUserRating("");
    }
  }
  function handleRate() {
    setModalOpen(true);
  }

  useEffect(
    function () {
      if (result) setIsLoading(false);
    },
    [result]
  );
  if (isLoading) return <Loading />;
  if (multimediaError)
    return (
      <div className="flex min-h-[calc(100vh-64px] flex-col gap-4 items-center justify-center">
        <h3 className="text-center text-red-400 text-xl">
          Sorry , Un unexpected Error happens While Loading {type.toUpperCase()}{" "}
          !:thinking:
        </h3>
        <p className="text-gray-600 text-center">{multimediaError}</p>
        <IconButton icon={<BiArrowBack />} text="Go Back" type="outlined" />
      </div>
    );
  return (
    <div>
      {ModalOpen && (
        <RatingModal
          setUserRating={setUserRating}
          userRating={userRating}
          setModalOpen={setModalOpen}
          rating={rating}
          multimedia={{ id, title, poster, year, genres }}
        >
          <StarRating rating={+rating} setRating={setRating} />
        </RatingModal>
      )}
      <div className="space-y-2">
        <IconButton
          handler={() => navigate(-1)}
          type="outlined"
          color="primary"
          text="Go Back"
          icon={<BiArrowBack />}
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-3xl font-bold ">{title}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-1 xs:gap-4 flex-col text-sm font-light sm:flex-row">
                <div className="flex gap-2 items-center ">
                  <span>{year}</span>
                </div>
                <div className="relative z-0 before:content-none sm:before:content-[''] before:w-[3px] before:h-[70%] before:absolute before:bg-gray-500 before:left-[-8px]">
                  {genres?.map((genre) => (
                    <span key={genre.id}>
                      {genre.name}
                      {genres.at(genres.length - 1).id === genre.id
                        ? "."
                        : ", "}
                    </span>
                  ))}
                </div>
                <div className="relative sm:before:content-[''] before:w-[3px] before:content-none before:h-[70%] before:absolute before:bg-gray-500 before:left-[-8px]">
                  {type === "movie"
                    ? `${runtime} mins`
                    : `${numseasons} Seasons && ${numepisods} Episods`}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-secondary p-1">
                  <span className="text-white text-center font-bold  inline-block w-full ">
                    {rated}
                  </span>
                </div>
                <p>{extractRatingInfo(rated)}</p>
              </div>
              <div className="flex flex-col xs:flex-row flex-wrap gap-3">
                {ratings?.map((rating) => (
                  <RatingBox ratingObj={rating} key={rating.Source} />
                ))}
                <div
                  className={`flex gap-2 ${
                    userRating
                      ? " w-[150px] items-center  border border-1 rounded-lg  px-3 py-1.5 shadow-sm"
                      : ""
                  }`}
                >
                  {userRating && (
                    <span className="font-semibold">Your Rating </span>
                  )}

                  {!userRating ? (
                    <IconButton
                      handler={handleRate}
                      icon={<MdStarRate />}
                      text="Rate"
                    />
                  ) : (
                    <span
                      className={`  w-6  h-6 font-bold flex justify-center items-center rounded-full bg-primary text-white outline outline-5 outline-primary border-2 border-grey-500 `}
                    >
                      {userRating}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {awards && awards !== "N/A" && (
              <div className="flex gap-1 mt-3 items-center">
                <div className=" bg-primary p-1 rounded-full">
                  <FaAward className="text-white w-4 h-4 " />
                </div>

                <p className="text-md font-semibold tracking-wide uppercase">
                  {awards}
                </p>
              </div>
            )}
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-6">
              {!isWatched && (
                <div className="">
                  {!isWatch ? (
                    <IconButton
                      handler={handleClickWatch}
                      icon={<CiBookmarkPlus />}
                      text="Add To Watch"
                    />
                  ) : (
                    <IconButton
                      handler={handleClickWatch}
                      icon={<CiBookmarkMinus />}
                      text="Remove From Watch"
                    />
                  )}
                </div>
              )}
              <div className="">
                {!isWatched ? (
                  <IconButton
                    handler={handleClickWatched}
                    icon={<CiBookmarkCheck />}
                    text="Mark As Watched"
                  />
                ) : (
                  <IconButton
                    handler={handleClickWatched}
                    icon={<CiBookmarkMinus />}
                    text="Remove From Watched"
                  />
                )}
              </div>
            </div>
          </div>
          <img
            className="w-full rounded-lg "
            src={`${BACKDROPBASEURL}/${backPoster}`}
          />
          <div className=" flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Overview</h3>
            <div className="">{overview}</div>
          </div>
          <div className=" flex flex-col gap-1">
            <h3 className="text-lg font-semibold">Top Cast</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 ">
              {cast?.map((item) => (
                <CastBox key={item.id} item={item} />
              ))}
            </div>
          </div>
          {writers?.length !== 0 && (
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Creator
                <span className="text-light text-sm font-normal">(s)</span>
              </h3>
              <div className="">
                {writers.map((writer) => {
                  if (writer !== "N/A")
                    return (
                      <span className="pr-2" key={writer}>
                        {writer}{" "}
                        {writers.at(writers.length - 1) === writer ? "." : ","}
                      </span>
                    );
                  else return "";
                })}
              </div>
            </div>
          )}
          {directors?.length !== 0 && (
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Director
                <span className="text-light text-sm font-normal">(s)</span>
              </h3>
              <div className="">
                {directors?.map((director) => {
                  if (director !== "N/A")
                    return (
                      <span className="pr-2" key={director}>
                        {director}{" "}
                        {directors.at(directors.length - 1).id === director.id
                          ? "."
                          : ","}
                      </span>
                    );
                  else return "";
                })}
              </div>
            </div>
          )}
          {seasons && (
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Seasons</h3>
              <div className="flex flex-col gap-4">
                {seasons.map((season) => {
                  if (season.season_number !== 0 && season.air_date !== null)
                    return <SeasonBox season={season} key={season.id} />;
                })}
              </div>
            </div>
          )}
          {homepage && (
            <div className=" flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Website</h3>
              <a
                target="_blank"
                className="flex items-center gap-1 w-fit rounded-sm px-3 py-2 border border-1 text-white hover:bg-primary transition-all tracking-wider uppercase border-gray-300 bg-transparentPrimary"
                href={`${homepage}`}
              >
                Visit <CiLocationArrow1 />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const MultimediaPage = withScrollToTop(MultimediapageComponent);
export default MultimediaPage;
// 06220027394
// 2569228
// 9884
//766745
// 06220027367
