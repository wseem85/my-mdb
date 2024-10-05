import { useDispatch, useSelector } from "react-redux";
import Loading from "../ui/loading";
import { POSTERBASEURLSM } from "../utils/variables";
import IconButton from "../ui/iconButton";
import { IoMdRemove } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { IoMdHome } from "react-icons/io";

import { removeFromWatchList } from "../features/lists/listsSlice";
import { useEffect, useState } from "react";
import RatingModal from "../ui/ratingModal";
import { useNavigate } from "react-router-dom";
import StarRating from "../ui/starRating";

export default function WatchList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchList = useSelector((store) => store.lists.watchList);
  const [rating, setRating] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [currentMultimedia, setCurrentMultimedia] = useState({});
  useEffect(() => scrollTo({ top: 0 }), []);
  if (!watchList) return <Loading />;

  return (
    <div className="space-y-6 min-h-screen ">
      {modalOpen && (
        <RatingModal
          rating={rating}
          setUserRating={setUserRating}
          userRating={userRating}
          setModalOpen={setModalOpen}
          multimedia={currentMultimedia}
        >
          <StarRating rating={+rating} setRating={setRating} />
        </RatingModal>
      )}
      <h3 className="text-center font-bold text-lg">Watch List</h3>
      <p className="text-center text-light text-lg tracking-widest">
        Movies and TV Shows You planed to Watch
      </p>
      {watchList?.length === 0 && (
        <div className="flex flex-col gap-5 justify-center">
          <p className="text-center  text-lg ">
            You did not add any thing to this list
            <br />
            Start by Browsing Movies and Tv Shows
          </p>
          <div className=" m-auto">
            <IconButton
              text="Browse"
              icon={<IoMdHome />}
              handler={() => navigate("/")}
            />
          </div>
        </div>
      )}
      {watchList && watchList.length !== 0 && (
        <ul className=" grid sm:grid-cols-2  xl:grid-cols-3 gap-6">
          {watchList.map((multimedia) => (
            <li
              className="flex  gap-8 bg-white p-3 shadow-md "
              key={multimedia.id}
            >
              <img
                className="max-h-28"
                src={`${POSTERBASEURLSM}${multimedia.poster}`}
              />
              <div className=" flex flex-col gap-6 ">
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-lg tracking-wider">
                    {multimedia.title}
                  </h4>
                  <span>{multimedia.year}</span>
                  <span className="text-red-500"></span>
                  <span className="text-green-500"></span>
                </div>
                <div className="flex flex-row gap-2   ">
                  <IconButton
                    handler={() => dispatch(removeFromWatchList(multimedia.id))}
                    align="icon-first"
                    text="Remove"
                    color="red-500"
                    icon={<IoMdRemove />}
                    size="small"
                    type="outlined"
                  />
                  <IconButton
                    handler={() => {
                      setCurrentMultimedia(multimedia);
                      setModalOpen(true);
                    }}
                    align="icon-first"
                    text="Watched"
                    color="green-500"
                    icon={<IoMdCheckmark />}
                    size="small"
                    type="outlined"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
