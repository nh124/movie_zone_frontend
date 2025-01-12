import { useEffect, useState } from "react";
import ParseMovieDetails from "../Rawfiles/ParseMovieDetails";
import GetMovieDetails from "../API_PARSER/GetMovieDetails";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaFacebook, FaImdb, FaInstagram, FaTwitter } from "react-icons/fa";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import Gallery from "./Gallery";

const CreditDetails = ({
  credits,
  setShowCastList,
  setPersonDetails,
  showFullCast,
  setShowFullCast,
}: {
  credits: any;
  setPersonDetails: any;
  setShowCastList: any;
  showFullCast: boolean;
  setShowFullCast: any;
}) => {
  if (showFullCast) setShowCastList(true);
  const closeFullCastView = () => {
    setShowFullCast(false);
    setShowCastList(false);
  };
  return (
    <>
      {showFullCast === true && (
        <div className="text-gray-300 absolute top-0 left-0 w-[100%] h-screen bg-black/70 z-30 flex justify-center items-center">
          <div className="w-fit h-1/2 px-3 py-3 bg-gradient-to-t from-[#2e4156] rounded-lg shadow-lg flex flex-col gap-3 border border-[#2e4156] relative">
            <button
              className="absolute top-[-15px] right-[-15px] p-2 rounded-full bg-[#2e4156] hover:scale-105 duration-300"
              onClick={() => closeFullCastView()}
            >
              <IoMdClose size={20} color="#a4b5c9" />
            </button>

            <div className="flex flex-col overflow-y-auto h-fit gap-5 items-center px-2 py-4">
              {credits.cast?.map((cast: any) => (
                <button
                  className="flex-shrink-0 flex w-[300px] h-[170px] bg-[#283747] rounded-md overflow-hidden shadow-md hover:scale-105 duration-300"
                  key={cast?.id}
                  onClick={() => {
                    setPersonDetails(cast?.profileImage, cast?.id.toString());
                    closeFullCastView();
                  }}
                >
                  <div className="w-full h-full">
                    <img
                      src={cast?.profileImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-full px-2 py-2 text-sm flex flex-col justify-center">
                    <span className="font-bold">{cast?.name}</span>
                    <span className="italic">{cast?.character}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const MovieDetails = ({
  movieId,
  socials,
  setSelectedImageURL,
  setSelectedPersonID,
  setShowPeopleDetails,
  setSelectedImageArray,
  setShowCastList,
}: {
  movieId: string | undefined;
  socials: any;
  setSelectedImageURL: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPersonID: React.Dispatch<React.SetStateAction<string>>;
  setShowPeopleDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCastList: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImageArray: any;
}) => {
  const [expandReadMore, setExpandReadMore] = useState(true);
  const [showFullCast, setShowFullCast] = useState(false);
  const [details, setDetails] = useState({
    originalTitle: "",
    title: "",
    overView: "",
    homePage: "",
    revenue: "",
    status: "",
    spoken_languages: [
      {
        id: 0,
        english_name: "",
        name: "",
      },
    ],
  });
  const [credits, setCredits] = useState({
    cast: [
      {
        id: 0,
        profileImage: "",
        name: "",
        character: "",
      },
    ],
  });
  const query_details = GetMovieDetails(movieId, "details");
  const query_credits = GetMovieDetails(movieId, "credits");
  const query_images = GetMovieDetails(movieId, "images");
  const [imageType, setImageType] = useState("Backdrops");
  const [images, setImages] = useState({});

  useEffect(() => {
    const parsedDetails = ParseMovieDetails(query_details, "details");
    const parsedCredit = ParseMovieDetails(query_credits, "credits");
    const parsedImages = ParseMovieDetails(query_images, "images");
    setDetails(parsedDetails);
    setCredits(parsedCredit);
    setImages(parsedImages);
  }, [query_details, query_credits, query_images]);

  const setPersonDetails = (imageURL: string, personID: string) => {
    setSelectedImageURL(imageURL);
    setSelectedPersonID(personID);
    setShowPeopleDetails(true);
  };
  const imageTypes = ["Backdrops", "Posters"];
  return (
    <div className="w-full h-auto flex flex-col md:flex-row gap-3">
      <CreditDetails
        credits={credits}
        setPersonDetails={setPersonDetails}
        setShowCastList={setShowCastList}
        showFullCast={showFullCast}
        setShowFullCast={setShowFullCast}
      />
      <div className="md:w-[70%] w-full flex flex-col gap-3 pl-[4%]">
        <div className=" flex text-gray-300">
          <div
            className={`w-full sm:h-auto py-3 bg-gradient-to-t from-[#2e4156] rounded-lg shadow-lg ${
              !expandReadMore ? "h-auto" : "h-[200px]"
            } overflow-hidden relative`}
          >
            <div
              className={`w-full h-[50%] absolute bottom-0 bg-gradient-to-t from-[#283747] ${
                !expandReadMore ? "hidden" : "flex"
              } justify-center items-end md:hidden`}
            >
              <button
                className="bg-gradient-to-t from-[#283747] w-full py-3 flex justify-center font-bold text-gray-400"
                onClick={() => setExpandReadMore(!expandReadMore)}
              >
                <span>Read More</span>
              </button>
            </div>
            <div className="px-3">
              <div>{details?.overView}</div>
              <button
                className="text-gray-400 font-semibold flex md:hidden"
                onClick={() => setExpandReadMore(!expandReadMore)}
              >
                show less
              </button>
            </div>
          </div>
        </div>

        <div className="flex  text-gray-300">
          <div className="w-full h-auto px-3 py-3 bg-gradient-to-t from-[#2e4156] rounded-lg shadow-lg flex flex-col gap-3">
            <span className="font-semibold">Top Cast</span>
            <div className="flex flex-row overflow-x-auto h-fit overflow-y-hidden gap-5 items-center px-2 py-4">
              {credits.cast?.slice(0, 10).map((cast) => (
                <button
                  className="flex-shrink-0 w-[120px] h-[170px] bg-[#283747] rounded-md overflow-hidden shadow-md hover:scale-105 duration-300"
                  key={cast?.id}
                  onClick={() =>
                    setPersonDetails(cast?.profileImage, cast?.id.toString())
                  }
                >
                  <div className="w-full h-[70%]">
                    <img
                      src={cast?.profileImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full h-full px-2 py-2 text-sm flex flex-col">
                    <span className="font-bold">{cast?.name}</span>
                    <span className="italic">{cast?.character}</span>
                  </div>
                </button>
              ))}
              <button
                className="font-semibold flex flex-col items-center w-fit"
                onClick={() => setShowFullCast(true)}
              >
                <div>
                  <IoArrowForwardOutline size={30} />
                </div>
                <span>View More</span>
              </button>
            </div>
          </div>
        </div>
        <Gallery
          imageTypes={imageTypes}
          imageType={imageType}
          setImageType={setImageType}
          images={images}
          setSelectedImageArray={setSelectedImageArray}
        />
      </div>
      <div className="w-full h-[400px] px-3 py-[2%] flex flex-col gap-4">
        <div className="w-fit sm:w-fit h-auto flex flex-row item-center justify-between py-3 gap-2 flex-wrap">
          <button
            className="w-[50px] h-[50px] rounded-full justify-center items-center flex shadow-xl hover:scale-105 duration-300 border border-gray-700"
            onClick={() =>
              window.open(
                import.meta.env.VITE_IMDP_URL + socials.imdb_id,
                "_blank"
              )
            }
          >
            <FaImdb icon={faImdb} size="35px" color="orange" />
          </button>
          <button
            className="w-[50px] h-[50px] rounded-full justify-center items-center flex shadow-xl hover:scale-105 duration-300 border border-gray-700"
            onClick={() =>
              window.open(
                import.meta.env.VITE_FACEBOOK_URL + socials.facebook_id,
                "_blank"
              )
            }
          >
            <FaFacebook icon={faImdb} size="35px" color="rgb(7,102,255)" />
          </button>
          <button
            className="w-[50px] h-[50px] rounded-full justify-center items-center flex shadow-xl hover:scale-105 duration-300 border border-gray-700"
            onClick={() =>
              window.open(
                import.meta.env.VITE_TWITTER_URL + socials.twitter_id,
                "_blank"
              )
            }
          >
            <FaTwitter icon={faImdb} size="35px" color="rgb(7,102,255)" />
          </button>
          <button
            className="w-[50px] h-[50px] rounded-full justify-center items-center flex shadow-xl hover:scale-105 duration-300 border border-gray-700"
            onClick={() =>
              window.open(
                import.meta.env.VITE_INSTAGRAM_URL + socials.instagram_id,
                "_blank"
              )
            }
          >
            <FaInstagram icon={faImdb} size="35px" color="orange" />
          </button>
        </div>
        {details?.originalTitle !== null &&
          details?.title !== details?.originalTitle && (
            <div className="flex flex-col">
              <span className="font-semibold text-gray-400 text-lg">
                Original Title
              </span>
              <span className="text-base text-gray-400">
                {details?.originalTitle}
              </span>
            </div>
          )}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-lg">Status</span>
          <span className="text-base text-gray-400">{details?.status}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-lg">Homepage</span>
          <a
            href={details?.homePage}
            className="text-base text-gray-400 underline"
          >
            Visit the Homepage
          </a>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-lg">Revenue</span>
          <span className="text-base text-gray-400">
            ${details?.revenue.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-gray-400 text-lg">
            Spoken Languages
          </span>
          {details?.spoken_languages?.map((language) => (
            <span
              key={language?.id}
              className="text-base text-gray-400 flex flex-row gap-2"
            >
              <div>{language?.english_name}</div>
              {language?.english_name !== language?.name && (
                <div>{language?.name}</div>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
