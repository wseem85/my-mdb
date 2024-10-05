import { MdStarRate } from "react-icons/md";
import IconButton from "./iconButton";
import PropTypes from "prop-types";
import { MdOutlineClose } from "react-icons/md";

import {
  addToWatchedList,
  removeFromWatchList,
} from "../features/lists/listsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function RatingModal({
  children,
  rating,
  setModalOpen,
  setUserRating,

  multimedia,
}) {
  const { id, title } = multimedia;
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  function handleClick() {
    setUserRating(rating);
    console.log(rating);
    dispatch(addToWatchedList({ ...multimedia, userRating: rating }));
    dispatch(removeFromWatchList(id));
    setModalOpen(false);
  }
  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
          setModalOpen(false);
        }
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [setModalOpen]
  );
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-highTransparentPrimary flex items-center justify-center">
      <div
        ref={modalRef}
        className="flex relative justify-center flex-col gap-4 p-8 bg-gray-50 min-w-[80%] rounded-lg "
      >
        <button
          onClick={() => setModalOpen(false)}
          className=" absolute  top-3 right-3 border-none outline-none bg-transparent p-0"
        >
          <MdOutlineClose className="" />
        </button>
        <h3 className="text-center text-lg font-semibold">{title}</h3>
        {children}
        <div className="mt-8 flex justify-center text-center">
          <IconButton handler={handleClick} text="Rate" icon={<MdStarRate />} />
        </div>
      </div>
    </div>
  );
}

RatingModal.propTypes = {
  multimedia: PropTypes.object,
  rating: PropTypes.string,
  setModalOpen: PropTypes.func,
  setUserRating: PropTypes.func,
  children: PropTypes.element,
};
