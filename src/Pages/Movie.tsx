import { useParams } from "react-router-dom";
import { PageLayout } from "../Components/pageLayout";
import { useEffect, useState } from "react";
import ParseMovieDetails from "../Rawfiles/ParseMovieDetails";
import VideoPlayer from "../Components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../Redux/MovieStatusTabReducer";
import { setEnd, setStart } from "../Redux/GridSizeIndexReducer";
import {
  setDiscoveryMoviePageIndex,
  setTrendingMoviePageIndex,
  setUpcomingMoviePageIndex,
} from "../Redux/MovieIndexReducer";
import UserLogin from "../Components/UserLogin";
import SplashScreen from "../Components/SplashScreen";
import MovieDetails from "../Components/MovieDetails";
import MovieComments from "../Components/MovieComments";
import GetMovieDetails from "../API_PARSER/GetMovieDetails";
import { IoMdClose } from "react-icons/io";
import { setNotificationStatus } from "../Redux/NotificationReducer";
import MoreDetailsCard from "../Components/MoreDetailsCard";
import ImageEnlarge from "../Components/ImageEnlarge";
import Footer from "../Components/Footer";
const Movie = () => {
  const { movieId } = useParams();
  type VideoType = {
    video: {
      key: string;
    }[];
  };
  const getMovieID = (movieId: string | undefined) => {
    if (movieId === undefined) return 0;
    const movieIDInt = parseInt(movieId, 10);
    return movieIDInt;
  };
  const movie_id = getMovieID(movieId);
  const query_videos = GetMovieDetails(movie_id.toString(), "videos");
  const query_socials = GetMovieDetails(movie_id.toString(), "socials");

  const [playTrailers, setPlayTrailers] = useState(false);
  const [showLogin, setShowLoading] = useState(false);
  const [video, setVideo] = useState<VideoType>({ video: [] });
  const [socials, setSocials] = useState({});
  const { length } = useSelector((state: any) => state.GridSize);
  const { notificationStatus } = useSelector(
    (state: any) => state.Notification
  );
  const dispatch = useDispatch();
  const [selectedPersonID, setSelectedPersonID] = useState("");
  const [showPeopleDetails, setShowPeopleDetails] = useState(false);
  const [showCastList, setShowCastList] = useState(false);
  const [SelectedImageArray, setSelectedImageArray] = useState([]);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    if (SelectedImageArray.length > 0) setShowImages(true);
  }, [SelectedImageArray, setSelectedImageArray, showImages]);

  useEffect(() => {
    if (notificationStatus) {
      setTimeout(() => {
        dispatch(setNotificationStatus(false));
      }, 2000);
    }
  }, [dispatch, notificationStatus]);

  useEffect(() => {
    const parsedVideo = ParseMovieDetails(query_videos, "videos");
    setVideo(parsedVideo);
    setSocials(query_socials);
    dispatch(setTab("Trending"));
    dispatch(setStart(0));
    dispatch(setEnd(length));
    dispatch(setUpcomingMoviePageIndex(1));
    dispatch(setTrendingMoviePageIndex(1));
    dispatch(setDiscoveryMoviePageIndex(1));
  }, [query_videos, dispatch, length, query_socials]);

  const VideoPlayers = () => {
    return (
      <div
        className={`w-full h-screen bg-black/70 absolute top-0 left-0 z-30 ${
          playTrailers ? "flex" : "hidden"
        }`}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-[30%] md:top-[10%] left-1/2 transform -translate-x-1/2">
            <VideoPlayer
              videoId={video?.video?.length > 0 ? video?.video[0]?.key : ""}
              setPlayTrailers={setPlayTrailers}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full relative ${
        showPeopleDetails || playTrailers || showImages || showCastList
          ? "h-screen"
          : "h-fit"
      } overflow-hidden`}
    >
      <ImageEnlarge
        setSelectedImageArray={setSelectedImageArray}
        SelectedImageArray={SelectedImageArray}
        showImages={showImages}
        setShowImages={setShowImages}
      />
      <PageLayout showLogin={showLogin} setShowLoading={setShowLoading}>
        <button
          className={`w-[250px] sm:w-[340px] h-[50px] mt-[4%] flex items-center bg-[#283747] px-3 rounded-md fixed top-0 right-0 gap-3 text-gray-400 z-50 duration-300 ${
            notificationStatus ? "translate-x-0 " : "translate-x-[100%]"
          } `}
        >
          <div className="w-fit h-fit rounded-full border-[3px] border-red-600">
            <IoMdClose size={30} color="red" />
          </div>
          <span className="sm:text-sm text-xs">
            Please sign in to perform this action.
          </span>
          <div className="w-[20px] h-[20px]">
            <IoMdClose size={20} color="gray" />
          </div>
        </button>

        <VideoPlayers />
        <MoreDetailsCard
          personID={parseInt(selectedPersonID, 10)}
          showPeopleDetails={showPeopleDetails}
          setShowPeopleDetails={setShowPeopleDetails}
          setSelectedPersonID={setSelectedPersonID}
        />
        <UserLogin showLogin={showLogin} setShowLoading={setShowLoading} />
        <SplashScreen movieId={movie_id} setPlayTrailers={setPlayTrailers} />
        <MovieDetails
          movieId={movieId}
          socials={socials}
          setSelectedPersonID={setSelectedPersonID}
          setShowCastList={setShowCastList}
          setShowPeopleDetails={setShowPeopleDetails}
          setSelectedImageArray={setSelectedImageArray}
        />
        <MovieComments movieId={movie_id} />
        <Footer />
      </PageLayout>
    </div>
  );
};

export default Movie;
