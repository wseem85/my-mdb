import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { BiLogoRedux } from "react-icons/bi";
import { SiReactrouter } from "react-icons/si";
import { SiAxios } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white px-2 md:px-6  lg:px-10 py-4  ">
      <div className="grid md:grid-cols-[2fr_1fr] lg:grid-cols-[7fr_3fr_2fr] gap-4 ">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold tracking-wide text-active">
            Description
          </h4>
          <p className="relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
            {" "}
            An App to Search Movies and Tv Shows , showing detailed information
            about each single Movie or Tv Show, Including Rating scores from
            different platforms like <span className="text-active">IMDB </span>,
            <span className="text-active"> TMDB </span>,
            <span className="text-active">Rotten Tomatoes</span>, and{" "}
            <span className="text-active">Metacritic </span>.
            <br />
            Adding Movies or TV Shows to Watch List or Watched List ,Giving them
            Your <span className="text-active">own Rating </span> and much more
            ...
          </p>
          <p className="relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
            This App also shows
            <span className="text-active"> Popular Movies </span>And Tv Shows in
            addition to<span className="text-active"> Top Rated </span>
            Movies and Tv Shows{" "}
          </p>
          <p className="relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
            This App Collect Information about Movies and Tv Shows from both{" "}
            <span className="text-active">TMDB API</span> and{" "}
            <span className="text-active">OMDB API</span>.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold tracking-wide text-active">
            Technologies{" "}
          </h4>
          <ul>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              {" "}
              <span>React js</span>
              <FaReact />
            </li>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>React Router</span>
              <SiReactrouter />
            </li>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>Redux/Redux Tollkit</span>
              <BiLogoRedux />
            </li>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>Tailwindcss</span>
              <RiTailwindCssFill />
            </li>

            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>axios</span>
              <SiAxios />
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold tracking-wide text-active">
            Developer
          </h4>
          <ul>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>Name :</span>
              <span> Wseem Kharma</span>
            </li>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <span>Linkedin </span>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/wseem-kharma-b82373265?utm_source=share&utm_campaign=share_via&utm_content=profile"
              >
                <FaLinkedin />
              </a>
            </li>
            <li className="flex items-center gap-2 relative ps-3 before:absolute before:content-['']  before:left-[-3px] before:top-[8px] before:w-2 before:h-2 before:bg-white before:rounded-full">
              <>Phone/Whatsapp</>
              <span>+963994875398</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
