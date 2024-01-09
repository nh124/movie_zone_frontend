import ScoreCircle from "./ScoreCircle";
import { useNavigate } from "react-router-dom";

type movieType = {
  vote_average: number;
  id: number;
  poster_image_url: string;
  title: string;
  ratingAvg: number;
};
const Poster = ({ movie }: { movie: movieType }) => {
  const ratingAvg = Math.round(movie?.vote_average);
  const navigate = useNavigate();
  return (
    <button
      className="w-full h-full relative justify-between hover:scale-105 duration-300 ease-in-out rounded-md overflow-hidden shadow-lg animate-fadeAnimation"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={movie?.poster_image_url}
        className="w-full h-full object-cover absolute z-0"
        alt=""
      />
      <div className="w-full h-full z-10 relative flex justify-between flex-col">
        <div className="w-full py-5 px-3 flex justify-end">
          <div className="w-[40%] max-w-[60px] rounded-full bg-gray-800/90 px-1 py-1">
            <ScoreCircle percentage={ratingAvg * 10} type="Poster" />
          </div>
        </div>
        <div className="w-full h-fit px-2 py-1 relative z-10 text-white font-bold bg-black/50 text-sm sm:text-base">
          <span>{movie?.title}</span>
        </div>
      </div>
    </button>
  );
};

export default Poster;
