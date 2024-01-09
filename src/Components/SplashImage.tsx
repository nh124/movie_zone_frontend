import { useEffect, useState } from "react";
import { GoDot, GoDotFill } from "react-icons/go";
import ParseSplashImageData from "../API_PARSER/ParseSplashImageData";
import ScoreCircle from "./ScoreCircle";
import DateConverter from "../Rawfiles/DateConverter";
import { useNavigate } from "react-router-dom";
const SplashImage = () => {
  const splashImageData = ParseSplashImageData();
  // const convertRating = (rating, stars) => {
  //   return Math.round((rating / 10) * stars);
  // };

  const [textLimit, setTextLimit] = useState(100);
  const [bannerIndex, setBannerIndex] = useState(0);
  const ratingAvg = Math.round(splashImageData[bannerIndex]?.vote_average);
  const navigate = useNavigate();
  // const rating = Math.round(ratingAvg)
  // const starsArray = Array.from({ length: 5 }, (_, index) => {
  //   const fillStar = index < rating;
  //   return (
  //     <svg key={index} viewBox="0 0 100 100" width="100%" height="100%">
  //       <polygon
  //         points="50,10 61.8,35.5 90.1,35.5 67.2,54.5 78.9,80 50,65 21.1,80 32.8,54.5 9.9,35.5 38.2,35.5"
  //         fill={fillStar ? "gold" : "transparent"}
  //         stroke="white"
  //         strokeWidth={fillStar ? "0" : "3"}
  //       />
  //     </svg>
  //   );
  // });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerIndex((prevIndex) =>
        prevIndex + 1 >= splashImageData?.length ? 0 : prevIndex + 1
      );
    }, 10000);
    return () => clearInterval(intervalId);
  }, [splashImageData]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) setTextLimit(100);
      if (window.innerWidth < 1200 && window.innerWidth > 500)
        setTextLimit(120);
      if (window.innerWidth > 1200) setTextLimit(150);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <div className="w-full h-[300px] overflow-hidden relative flex flex-row sm:h-[400px] duration-300 rounded-lg">
      <div className="lg:relative absolute z-20 sm:w-[75%] w-[100%] text-white flex flex-col items-start justify-end py-6 sm:py-0 sm:justify-center px-6 h-full sm:px-10 duration-300 ease-in-out rounded-lg">
        <span className="lg:text-5xl md:text-4xl text-xl font-bold">
          {splashImageData[bannerIndex]?.title}
        </span>

        <div className="sm:flex flex-row px-1 w-[100%] h-[50px] gap-3 items-center hidden">
          <ScoreCircle percentage={ratingAvg * 10} type="Banner" />
          <span>
            {DateConverter(splashImageData[bannerIndex]?.release_date)}
          </span>
        </div>
        <div className="sm:flex flex-row gap-3 flex-wrap w-full py-3 hidden">
          {splashImageData[bannerIndex]?.genre?.map((genre, index) => (
            <span
              key={index}
              className="bg-gray-700/70 sm:px-2 px-3 py-1 rounded-lg text-sm sm:text-base"
            >
              {genre}
            </span>
          ))}
        </div>

        <span className="text-sm">
          {splashImageData[bannerIndex]?.overview?.length > textLimit && (
            <span>
              {splashImageData[bannerIndex].overview.substring(0, textLimit) +
                "..."}
            </span>
          )}
        </span>
        <div className="px-0 py-2">
          <button
            className="px-2 py-2  rounded-md hover:bg-blue-800 duration-300 border-2
           border-gray-400 text-gray-400 relative group"
          >
            <span
              className="relative z-10 text-gray-400 group-hover:text-gray-800 font-bold duration-300"
              onClick={() =>
                navigate(`/movie/${splashImageData[bannerIndex].id}`)
              }
            >
              Learn More
            </span>
            <div className="w-0 duration-300 group-hover:w-full h-full absolute top-0 bg-gray-400 left-0 z-0"></div>
          </button>
        </div>
        <div className="absolute bottom-5 flex flex-row right-5 sm:left-10">
          {Array.from({ length: splashImageData?.length }).map(
            (_, arrayIndex) => (
              <div key={arrayIndex}>
                {bannerIndex === arrayIndex ? (
                  <button onClick={() => setBannerIndex(arrayIndex)}>
                    <GoDotFill />
                  </button>
                ) : (
                  <button onClick={() => setBannerIndex(arrayIndex)}>
                    <GoDot />
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="lg:w-[70%] w-[100%] h-[100%] relative duration-500 rounded-lg"
        style={{
          backgroundImage: `url(${splashImageData[bannerIndex]?.backdrop_image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className="relative">i</div> */}
        <div className="w-full h-full bg-gradient-to-r from-black/90 absolute z-10 lg:hidden"></div>
      </div>
    </div>
  );
};

export default SplashImage;
