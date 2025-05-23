import { useEffect, useRef, useState } from "react";
import MovieManager from "../API/MovieManager";
import DateConverter from "../Rawfiles/DateConverter";
import { IoMdClose } from "react-icons/io";
const MoreDetailsCard = ({
  personID,
  setShowPeopleDetails,
  showPeopleDetails,
  setSelectedPersonID,
}: {
  personID: number;
  setShowPeopleDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showPeopleDetails: boolean;
  setSelectedPersonID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  type creditContributionType = {
    adult: boolean;
    backdrop_path: string;
    character: string;
    credit_id: string;
    genre_ids: Array<number>;
    id: number;
    order: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: false;
    vote_average: number;
    vote_count: number;
  };

  type PeopleDetailsType = {
    adult: boolean;
    also_known_as: Array<string>;
    biography: string;
    birthday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
  };
  type responseType = {
    cast: Array<creditContributionType>;
    crew: Array<creditContributionType>;
  };

  const { getPeopleDetails } = MovieManager();
  const [personDetails, setPersonDetails] = useState<PeopleDetailsType | null>(
    null
  );
  const [peopleCredit, setPeopleCredit] = useState<
    Array<creditContributionType>
  >([]);
  const [getPersonDetailsStatus, setPersonDetailsStatus] = useState(true);
  const imageBaseURL = import.meta.env.VITE_IMAGE_BASE_URL;
  const [expandBio, setExpandBio] = useState(false);
  const biographyRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (biographyRef.current) {
      biographyRef.current.scrollTop = 0;
    }
  }, [expandBio]);

  const sortCreditBasedOnScore = (credits: Array<creditContributionType>) => {
    const sortedCredit = [...credits].sort(
      (a, b) => b.popularity - a.popularity
    );
    const top5Movies = sortedCredit.slice(0, 10);
    return top5Movies;
  };

  useEffect(() => {
    if (!getPersonDetailsStatus) return;
    if (!personID) return;
    getPeopleDetails("details", personID)
      .then((response) => {
        setPersonDetails(response);
        setPersonDetailsStatus(false);
      })
      .catch(() => {});
  }, [getPeopleDetails, personID, getPersonDetailsStatus]);

  useEffect(() => {
    if (!getPersonDetailsStatus) return;
    if (!personID) return;
    getPeopleDetails("credit", personID)
      .then((response: responseType) => {
        const topCredits = sortCreditBasedOnScore(response?.cast);
        setPeopleCredit(topCredits);
        setPersonDetailsStatus(false);
      })
      .catch(() => {});
  }, [getPeopleDetails, personID, getPersonDetailsStatus]);

  const clearData = () => {
    setSelectedPersonID("");
    setShowPeopleDetails(false);
  };

  useEffect(() => {
    if (showPeopleDetails) setPersonDetailsStatus(true);
  }, [showPeopleDetails]);

  return (
    <div
      className={`w-full h-screen  top-0 left-0 z-30 animate-fadeAnimation ${
        showPeopleDetails ? "absolute" : "hidden"
      }`}
    >
      <div className="w-full h-full relative bg-black/70 z-30">
        <div
          className={`sm:w-[700px] sm:h-[700px] absolute bg-[#283747] sm:top-1/2 sm:transform sm:-translate-y-1/2 left-1/2 transform -translate-x-1/2 px-4 py-4 w-full h-screen top-0 duration-400`}
        >
          <button
            className="absolute left-0 top-0 p-2 bg-gray-700 hover:scale-105 duration-300 z-10 "
            onClick={() => clearData()}
          >
            <IoMdClose size="20" color="white" />
          </button>
          <div className="w-full h-full flex sm:flex-row relative flex-col gap-3 sm:gap-0 p-5 overflow-auto ">
            <div className="w-full h-fit sm:h-full flex flex-col items-center">
              <div className="w-full h-[250px] p-4 flex justify-center items-center">
                <div className="w-[220px] h-[220px] bg-slate-500 rounded-full overflow-hidden shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={imageBaseURL + personDetails?.profile_path}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-center text-gray-400">
                  {personDetails?.name}
                </span>
                <span className="text-lg text-center text-gray-400">
                  <span className="font-bold">Role:</span>{" "}
                  {personDetails?.known_for_department}
                </span>
                <span className="text-gray-400 italic text-center">
                  <span className="font-bold">Birthday:</span>{" "}
                  {DateConverter(personDetails?.birthday)}
                </span>
                <span className="text-gray-400 italic text-center">
                  <span className="font-bold"> Place of Birth:</span>{" "}
                  {personDetails?.place_of_birth}
                </span>
              </div>
              <div className="w-full  px-4 text-gray-400 font-bold pt-3 pb-0">
                <span>Biography</span>
              </div>
              <div
                style={{
                  height: `${expandBio ? "300" : "200"}px`,
                  overflowY: `${expandBio ? "auto" : "hidden"}`,
                  overflowX: "hidden",
                  transition: "height 0.3s ease",
                }}
                className={`w-full  text-gray-400 overflow-x-hidden relative transition-height  shadow-lg p-2 max-w-full sm:max-w-[260px]`}
                ref={biographyRef}
              >
                {personDetails?.biography}{" "}
                <span className="underline" onClick={() => setExpandBio(false)}>
                  Show Less
                </span>
                {!expandBio && (
                  <div
                    className="w-full h-[100px] bottom-0 bg-gradient-to-t from-[#283747] flex justify-center items-end py-2 font-bold text-gray-500 group absolute"
                    onClick={() => setExpandBio(true)}
                  >
                    <span className="opacity-0 group-hover:opacity-100 duration-300">
                      Show More
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-full p-5 sm:overflow-y-auto bg-gradient-to-t from-gray-700 rounded-md">
              <div className="w-full h-full">
                <div className="w-full">
                  <span className="text-lg font-bold text-gray-400">
                    Popular movies
                  </span>
                </div>

                {peopleCredit?.map((credit) => (
                  <button
                    onClick={() => {
                      const newUrl = `/movie/${credit?.id}`;
                      window.location.href = newUrl;
                    }}
                    className="w-full h-auto flex flex-row p-3 items-center gap-2 text-gray-400 font-bold"
                    key={credit?.id}
                  >
                    <div className="w-[50px] h-[50px] overflow-hidden shadow-lg rounded-lg">
                      <img
                        src={imageBaseURL + credit?.poster_path}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>{credit?.original_title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetailsCard;
