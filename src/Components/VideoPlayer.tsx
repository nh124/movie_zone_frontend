import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import CalculateAspectRatio from "../Rawfiles/CalculateAspectRatio";
const VideoPlayer = ({
  videoId,
  setPlayTrailers,
}: {
  videoId: string;
  setPlayTrailers: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const calculateAspectRatio = CalculateAspectRatio();
  const { width, height } = calculateAspectRatio;
  const opts = {
    width: `${width}px`,
    height: `${height}px`,
    // playerVars: {
    //   autoplay: `${setPlayTrailers ? "1" : "0"}`,
    // },
  };
  return (
    <div className="w-full h-full relative">
      <button
        className="absolute top-3 right-3"
        onClick={() => setPlayTrailers(false)}
      >
        <IoClose size={30} color="gray" />
      </button>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;
