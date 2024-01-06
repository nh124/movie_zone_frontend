const ScoreCircle = ({
  percentage,
  type,
}: {
  percentage: number;
  type: string;
}) => {
  const convertedScore = 64 - 64 * (percentage / 100);
  const ScoreCircleColorSelector = {
    Banner: "text-blue-200",
    Poster: "text-green-400",
    movie_display: "text-blue-200",
  };
  return (
    <div className="w-fit h-full flex justify-start items-center relative">
      <svg
        className={`h-full w-full ${ScoreCircleColorSelector[type]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeLinecap="round"
        transform="rotate(-90)"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke-width="3"
          stroke-dasharray="64"
          stroke-dashoffset="0"
        ></circle>
        <circle
          className="opacity-75"
          cx="12"
          cy="12"
          r="10"
          stroke-width="3"
          stroke-dasharray="64"
          stroke-dashoffset={convertedScore}
        ></circle>
      </svg>
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        ${type === "movie_display" ? "text-lg" : "text-xs"}
        ${ScoreCircleColorSelector[type]}
        `}
      >
        {percentage}%
      </span>
    </div>
  );
};

export default ScoreCircle;
