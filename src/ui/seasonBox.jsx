import { POSTERBASEURLMD } from "../utils/variables";
import PropTypes from "prop-types";
export default function SeasonBox({ season }) {
  const {
    air_date,
    episode_count,
    name,
    overview,

    poster_path,
  } = season;
  return (
    <div className="flex flex-col border-b border-b-1 border-gray-200 shadow-sm pb-2">
      <div className="flex gap-4  ">
        <div className="flex justify-center ">
          <img
            className="w-16  rounded-lg object-cover"
            src={`${POSTERBASEURLMD}${poster_path}`}
          />
        </div>
        <div className=" flex flex-col gap-1 ">
          <div className="flex text-[1rem] flex-col   gap-1">
            <h4>{name}</h4>
            <p>{new Date(air_date).getFullYear()}</p>
            <p>{episode_count} Episods</p>
          </div>
        </div>
      </div>
      <p className="text-sm p-2">{overview}</p>
    </div>
  );
}

SeasonBox.propTypes = {
  season: PropTypes.object,
};
