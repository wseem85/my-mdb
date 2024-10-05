import { NavLink, useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import { animated } from "@react-spring/web";
const links = [
  { text: "Home", path: "/" },
  { text: "Watch", path: "/watch" },
  { text: "Watched", path: "/watched" },
];
export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const [openMenu, setOpenMenu] = useState(false);
  // open state to trigger the animation on mount , unmount
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeLink = location.pathname;
  // console.log(location.pathname);
  const navRef = useRef(null); // Ref for DOM element

  const handleCloseMenu = () => {
    setOpen(false); // Trigger closing animation
    setTimeout(() => {
      setOpenMenu(false);
    }, 290);
  };
  const handleOpenMenu = () => {
    setOpen(true);

    setOpenMenu(true);
  };
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(function () {
    function handleClick(e) {
      if (navRef?.current && !navRef.current.contains(e.target)) {
        setOpen(false);
        setTimeout(() => {
          setOpenMenu(false);
        }, 290);
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <header className=" sticky top-0 bg-primary text-white z-10 min-h-16  flex justify-between items-center px-2 md:px-6  lg:px-10 before:content-[''] before:absolute before:bottom-0 before:w-screen before:bg-gray-300 before:h-[1px]  before:left-[-8px] sm:before:left-[-1rem] md:before:left-[-2.5rem] lg:before:left-[-3.5rem] ">
      <p className="tracking-widest font-bold text-lg">MY📀MDB</p>
      <nav>
        {width < 640 && (
          <>
            <button
              className="bg-transparent border-none outline-none"
              onClick={handleOpenMenu}
            >
              <IoMdMenu
                style={{
                  width: "1.7rem",
                  height: "1.7rem",
                  fontWeight: "bold",
                }}
              />
            </button>
            {openMenu && (
              <div
                className={`bg-modal absolute top-0 left-0 w-screen min-h-screen ${
                  open ? "animate-fadeIn" : "animate-fadeOut"
                }`}
              >
                <animated.ul
                  ref={navRef}
                  className={`flex  flex-col min-h-52 divide-y  divide-slate-200  py-16 items-center bg-primary shadow-md shadow-primary absolute z-1300 top-0 left-0 w-screen  ${
                    open ? "animate-slide" : "animate-slideOut"
                  }`}
                >
                  {links.map((link) => (
                    <li key={link.text} className="w-full text-center py-4  ">
                      <NavLink
                        to={link.path}
                        className={`inline-block w-full h-full uppercase tracking-wider font-semibold ${
                          activeLink === link.path ? "text-active" : ""
                        }`}
                        onClick={handleCloseMenu}
                      >
                        {" "}
                        {link.text}
                      </NavLink>
                    </li>
                  ))}
                  <button
                    className="absolute border-none outline-none top-4 right-4"
                    onClick={handleCloseMenu}
                  >
                    <IoMdClose
                      style={{
                        width: "1.7rem",
                        height: "1.7rem",
                        fontWeight: "bold",
                      }}
                    />
                  </button>
                </animated.ul>
              </div>
            )}
          </>
        )}
        {width >= 640 && (
          <ul className="flex gap-4 ">
            {links.map((link) => (
              <li key={link.text}>
                <NavLink
                  to={link.path}
                  className={`inline-block uppercase tracking-wider font-semibold ${
                    activeLink === link.path ? "text-active" : ""
                  }`}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
