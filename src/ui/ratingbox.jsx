import PropTypes from "prop-types";

export default function RatingBox({ ratingObj }) {
  if (
    ratingObj.Source === "Internet Movie Database" ||
    ratingObj.Source === "TMDB"
  )
    return (
      <div className="flex h-[45px] w-[130px] justify-between items-center gap-2 border border-1 rounded-lg  px-3 py-1.5 shadow-sm">
        <img
          className="w-12"
          src={`/${ratingObj.Source === "TMDB" ? "tmdb.svg" : "imdb.svg"}`}
        />
        <span className="font-bold">{ratingObj.Value.slice(0, 3)}</span>
      </div>
    );
  if (ratingObj.Source === "Rotten Tomatoes")
    return (
      <div className="flex h-[45px] w-[130px]  gap-2 items-center border border-1 rounded-lg justify-between  px-3 py-1.5 shadow-sm">
        <img className="w-16" src="/rottenTomatoes.svg" />
        <span className="font-bold">{ratingObj.Value}</span>
      </div>
    );
  if (ratingObj.Source === "Metacritic")
    return (
      <div className="flex h-[45px] w-[130px]  gap-2 items-center border border-1 rounded-lg justify-between  px-3 py-1.5 shadow-sm">
        <img className="w-12" src="/metascore.svg" />
        <span className="font-bold">{ratingObj.Value.slice(0, 2)}%</span>
      </div>
    );
  return null;
}

RatingBox.propTypes = {
  ratingObj: PropTypes.object,
};
