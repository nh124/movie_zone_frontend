import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import CalculateAspectRatio from "../Rawfiles/CalculateAspectRatio";
import { useState } from "react";

const VideoPlayer = ({
  videos,
  setPlayTrailers,
}: {
  videos: any;
  setPlayTrailers: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const calculateAspectRatio = CalculateAspectRatio();
  const { width, height } = calculateAspectRatio;
  const [currentVideo, setCurrentVideo] = useState(videos[0]?.key);
  const opts = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className="flex w-full h-full relative flex-col">
      <button
        className="absolute top-3 right-3"
        onClick={() => setPlayTrailers(false)}
      >
        <IoClose size={30} color="gray" />
      </button>
      <YouTube videoId={currentVideo} opts={opts} />
      <div
        className="overflow-x-auto gap-3 flex flex-row p-4 bg-slate-900"
        style={{
          width: `${width}px`,
          height: "200px",
        }}
      >
        {videos.map((video: any) => (
          <button
            className="min-w-[300px] max-w-full h-full flex flex-col gap-1"
            key={video?.id}
            onClick={() => setCurrentVideo(video?.key)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
              alt={video.name}
              className="w-full h-[90%] object-cover rounded-md"
            />
            <span className="font-bold text-gray-400">{video.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
