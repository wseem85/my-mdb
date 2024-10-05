import SearchResultRow from "../ui/SearchResultRow";
// import { useLoaderData } from "react-router-dom";
import TrendingBox from "../ui/trendingBox";
import TopRatedMultimediaBox from "../ui/topRatedMultimediaBox";
import { useMultimedisSearch } from "../hooks/useMultimediaSearch";
import { useEffect, useRef, useState } from "react";
import { MdArrowForwardIos, MdClose } from "react-icons/md";

import { animated } from "@react-spring/web";
import Loading1 from "../ui/loading1";
import { useTrending } from "../hooks/useTrending";
import { useTopRated } from "../hooks/useTopRated";

export default function Homepage() {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { searchResults, error, isLoading } = useMultimedisSearch(query);

  const {
    trending: trendingData,
    error: trendingError,
    isLoadingTrending,
  } = useTrending();
  const {
    topRatedMovies,
    topRatedTv,
    error: topRatedError,
    isLoadingTopRated,
  } = useTopRated();

  // open state to trigger the animation on mount , unmount
  const [open, setOpen] = useState(false);
  const navRef = useRef(null); // Ref for DOM element

  const handleCloseMenu = () => {
    setOpen(false); // Trigger closing animation
    setTimeout(() => {
      setSideMenuOpen(false);
    }, 290);
  };
  const handleOpenMenu = () => {
    setOpen(true);

    setSideMenuOpen(true);
  };
  useEffect(function () {
    function handleClick(e) {
      if (navRef?.current && !navRef.current.contains(e.target)) {
        setSideMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-y-8 ">
      {!sideMenuOpen && (
        <div className="fixed cursor-pointer z-30 top-[50%] left-[-0.5rem] translate-y-[-50%] text-white p-1">
          <button
            className="w-full p-3 h-full  bg-transparentSecondary"
            onClick={handleOpenMenu}
          >
            <MdArrowForwardIos />
          </button>
        </div>
      )}

      {sideMenuOpen && (
        <div className="fixed z-40  top-[64px] left-0  w-screen h-screen bg-[rgba(0,0,0,0.3)]">
          <animated.div
            ref={navRef}
            className={`relative flex h-[calc(100vh-64px)] flex-col  bg-white text-gray-800 shadow-lg  w-[200px] sm:w-[300px]  gap-4  p-4 ${
              open ? "animate-slide" : "animate-slideOut"
            }`}
          >
            <div className="flex w-full   items-center  justify-between">
              <h5 className="text-xl">Go To</h5>

              <button
                className="text-lg font-bold p-2"
                onClick={handleCloseMenu}
              >
                <MdClose className="font-bold text-lg" />
              </button>
            </div>

            <ul className="ms-2 flex flex-col gap-3">
              <li>
                <a
                  className=" text-lg tracking-wider"
                  role="button"
                  onClick={handleCloseMenu}
                  href="#trending"
                >
                  Trending
                </a>
              </li>
              <li>
                <a
                  className=" text-lg tracking-wider"
                  role="button"
                  onClick={handleCloseMenu}
                  href="#topRated"
                >
                  Top Rated
                </a>
              </li>
              <li>
                <a
                  className=" text-lg tracking-wider"
                  role="button"
                  onClick={handleCloseMenu}
                  href="#top"
                >
                  Search
                </a>
              </li>
            </ul>
          </animated.div>
        </div>
      )}
      <section id="search" className="space-y-8  border-b-2 pb-8 mb-8">
        <form className="flex gap-3 flex-col justify-center">
          <label htmlFor="search" className="text-center text-2xl ">
            Search Movies , Tv Series
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Name of Movie , Tv series "
            className="border rounded border-1 border-grey-500 outline-none py-3 px-2 focus:ring-1 focus:ring-lightBlue"
          />
        </form>
        <div>
          {query.length === 0 && (
            <p className="text-center">
              Start by
              <span className="text-darkblue uppercase font-semibold tracking-wide">
                {" "}
                Typing
              </span>{" "}
              Movie , or Tv Show Title{" "}
              <span className="text-darkblue uppercase font-semibold tracking-wide">
                Above{" "}
              </span>
            </p>
          )}
          {query.length > 0 && query.length < 3 && (
            <p className="text-center min-h-[48px]">
              Please type at least
              <span className="text-darkblue uppercase font-semibold tracking-wide">
                {" "}
                3 charachters
              </span>
            </p>
          )}
          <h3 className="text-center mb-2 text-3xl font-semibold">
            Search Results{" "}
          </h3>

          {isLoading ? (
            <Loading1 />
          ) : error ? (
            <p className="text-red text-center">Somthing Went wrong!</p>
          ) : searchResults?.length === 0 && query.length >= 3 ? (
            <p className=" text-center">
              There are <span className="text-amber-600"> No Results </span>
              matches Your query
            </p>
          ) : !error &&
            query.length >= 3 &&
            searchResults?.length &&
            !isLoading ? (
            <ul className=" mx-4 grid md:grid-cols-2 mt-6 xl:grid-cols-3 gap-6">
              {searchResults?.map((multimedia) => (
                <li key={multimedia.id} className="max-w-full">
                  <SearchResultRow multimedia={multimedia} />
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </section>
      <section id="trending" className="space-y-8   border-b-2 pb-8 mb-8">
        <h3 className="text-center text-3xl font-semibold">Popular Now </h3>
        {isLoadingTrending ? (
          <Loading1 />
        ) : !isLoadingTrending && !trendingError ? (
          <div className=" bg-gray-50 grid px-3 gap-3 md:gap-4 lg:gap-8 xs:grid-cols-2 md:grid-cols-3">
            {trendingData?.map((item) => (
              <TrendingBox key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center">
            <h3 className=" text-xl tracking-wide text-center text-red-400">
              Soory! Unexpected Error happens while trying to load Trending
              MOvies ,Tv Shows
            </h3>
            <p className=" text-gray-600 text-center">{trendingError}</p>
          </div>
        )}
      </section>
      <section id="topRated" className="space-y-8 px-2   border-b-2 pb-8 mb-8">
        <h3 className="text-center  text-3xl font-semibold">Top Rated</h3>
        {isLoadingTopRated ? (
          <Loading1 />
        ) : !isLoadingTopRated && !topRatedError ? (
          <div className="flex flex-col gap-4">
            <div className=" border-b-1 border-b-gray-400 pb-6">
              <h4 className=" my-4 text-center text-2xl font-semibold">
                Top Movies
              </h4>
              <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {topRatedMovies.map((movie) => (
                  <TopRatedMultimediaBox movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-center my-4 text-2xl font-semibold">
                Top Tv Shows
              </h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {topRatedTv.map((movie) => (
                  <TopRatedMultimediaBox movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 justify-center">
            <h3 className="text-xl tracking-wide text-center text-red-400">
              Sorry , An Unexpected Error happens while loading Top Rated Movies
              , Tv Shows
            </h3>
            <p className="text-gray-600 text-center">{topRatedError}</p>
          </div>
        )}
      </section>
    </div>
  );
}
