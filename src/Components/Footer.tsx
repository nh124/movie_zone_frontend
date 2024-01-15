import logo from "../assets/logo.png";
import tmdb from "../assets/tmdb.svg";
import avater from "../assets/spider-man-png.png";
import { MdBugReport } from "react-icons/md";
import { FcCollaboration } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-fit bg-[#3f597e] relative py-[10%] px-[5%]">
      <div className="w-full h-[100%] bg-gradient-to-b from-[#283747] absolute top-0 z-10 left-0"></div>
      <div className="w-[60%] h-full absolute top-0 right-0 overflow-hidden">
        <img className="w-full h-full object-cover" src={avater} alt="" />
      </div>
      <div className="relative z-20 p-3 w-full h-full flex flex-col justify-center">
        <div className="w-full h-[50%] flex flex-col gap-3">
          <button
            className="flex flex-row items-center w-fit text-xl sm:text-3xl font-bold text-cyan-50 z-10 "
            onClick={() => {
              navigate("/");
              window.location.reload();
            }}
          >
            <div className="sm:w-[100px] w-[56px] px-3 py-3">
              <img
                className="w-full h-full object-cover"
                src={logo}
                alt="logo"
              />
            </div>
            <span>MovieZone</span>
          </button>
          <div className="flex flex-col lg:w-[50%] font-bold text-gray-400 gap-3 w-full md:w-[70%]">
            <span>
              We welcome your feedback! If you come across any issues or would
              like to explore collaboration opportunities, please feel free to
              reach out.
            </span>
            <div className="flex fle-row gap-3">
              <button className="px-2 py-2 border border-red-400 flex flex-row justify-start font-semibold items-center gap-2 text-gray-400 hover:scale-105 duration-300 rounded-full shadow-lg">
                <MdBugReport size={40} color="red" />
              </button>
              <button className="px-2 py-2 border border-blue-300 flex flex-row justify-start font-semibold items-center gap-2 hover:scale-105 duration-300 rounded-full">
                <FcCollaboration size={40} />
              </button>
              <button className="px-2 py-2 border border-gray-400 flex flex-row justify-start font-semibold items-center gap-2 hover:scale-105 duration-300 rounded-full">
                <FaGithub size={40} />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[70%] lg:w-[50%] font-bold text-gray-400 gap-3">
            <span>
              A special thanks to TMDB for providing the incredible resources
              that made this project possible.
            </span>
            <div className="flex fle-row gap-3">
              <button className="px-2 py-2 flex flex-row justify-start font-semibold items-center gap-2  text-gray-700 hover:scale-105 duration-300 rounded-full">
                <img className="w-[200px]" src={tmdb} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
