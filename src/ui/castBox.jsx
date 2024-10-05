import { PROFILEBASEURL } from "../utils/variables";
import PropTypes from "prop-types";
export default function CastBox({ item }) {
  return (
    <div className="flex items-center gap-1 ">
      <div className=" flex justify-center items-center rounded-lg bg-white border p-2 border-1 border-gray-200">
        <img
          className="inline-block w-full object-cover rounded-lg"
          src={`${PROFILEBASEURL}${item.profile_path}`}
        />
      </div>
      <div className="flex flex-col">
        <p className="">{item.name || item.original_name}</p>
        <p className="font-light text-sm">{item.character}</p>
      </div>
    </div>
  );
}

CastBox.propTypes = {
  item: PropTypes.object,
};
