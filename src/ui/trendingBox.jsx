import { useNavigate } from "react-router-dom";
import { genreIdToText } from "../utils/helpers";
import { POSTERBASEURLMD } from "../utils/variables";
import { FcRating } from "react-icons/fc";
import IconButton from "./iconButton";
import { CiLocationArrow1 } from "react-icons/ci";
import PropTypes from "prop-types";
export default function TrendingBox({ item }) {
  const navigate = useNavigate();
  const {
    media_type: type,
    id,

    name,
    title,

    original_name,
    poster_path,
    genre_ids,

    vote_average,
  } = item;
  return (
    <div className="flex p-2 gap-3 flex-col border border-1 border-gray-300 shadow-gray-400 bg-white shadow-md">
      <div className="">
        <img
          className=" w-full object-cover"
          src={`${POSTERBASEURLMD}${poster_path}`}
        />
      </div>
      <h4 className="text-lg font-semibold">
        {title || original_name || name}
      </h4>
      <p className="flex flex-wrap">
        {genre_ids.map((genre) => (
          <span className="pr-1" key={genre}>
            {genreIdToText(genre, type)},
          </span>
        ))}
      </p>
      <div className="flex justify-between items-center mt-auto">
        <p className="flex gap-1 font-bold items-center">
          <FcRating style={{ fontSize: "1.3rem" }} />
          {vote_average.toFixed(1)}
        </p>
        {/* <button
          onClick={() => navigate(`multimedia/${type}/${id}`)}
          className="bg-transparent  px-3 py-1 rounded-lg  outline-none border border-1 hover:bg-primary hover:text-white transition-colors border-primary flex justify-center items-center"
        >
          Visit
        </button> */}
        <IconButton
          bgColor="transparent"
          color="primary"
          handler={() => navigate(`multimedia/${type}/${id}`)}
          text="More"
          colorHover="white"
          icon={<CiLocationArrow1 />}
        />
      </div>
    </div>
  );
}

TrendingBox.propTypes = {
  item: PropTypes.object,
};
