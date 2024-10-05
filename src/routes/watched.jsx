import { useSelector } from "react-redux";
import IconButton from "../ui/iconButton";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { POSTERBASEURLSM } from "../utils/variables";
import { useEffect } from "react";
import Loading from "../ui/loading";

export default function WatchedList() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchedList = useSelector((store) => store.lists.watchedList);
  useEffect(() => scrollTo({ top: 0 }), []);
  if (!watchedList) return <Loading />;
  return (
    <div className="space-y-6 min-h-screen ">
      <h3 className="text-center font-bold text-lg">Watched List</h3>
      <p className="text-center text-light text-lg tracking-widest">
        Movies and TV Shows You have watched
      </p>
      {watchedList?.length === 0 && (
        <div className="flex flex-col gap-5 justify-center">
          <p className="text-center  text-lg ">
            You did not add any thing to this list
            <br />
            Start by Browsing Movies and Tv Shows
          </p>
          <div className="w-16 m-auto">
            <IconButton
              text="Browse"
              icon={<IoMdHome />}
              handler={() => navigate("/")}
            />
          </div>
        </div>
      )}
      {watchedList && watchedList.length !== 0 && (
        <ul className=" grid sm:grid-cols-2  xl:grid-cols-3 gap-6">
          {watchedList.map((multimedia) => (
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
                  <div className="flex gap-3 items-center">
                    {" "}
                    <span>Your rating </span>{" "}
                    <span
                      className={`  w-6  h-6 font-bold flex justify-center items-center rounded-full bg-secondary text-white outline outline-5 outline-secondary border-2 border-grey-500 `}
                    >
                      {multimedia.userRating}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
