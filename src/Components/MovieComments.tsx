import { useEffect, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoPersonSharp } from "react-icons/io5";
import GetUser from "../Hooks/GetUser";
import UserInformationManager from "../API/UserInformationManager";
import CommentManager from "../API/CommentManager";
import EditCommentFunc from "./EditComment";
import DeleteComment from "./DeleteComment";
import { setNotificationStatus } from "../Redux/NotificationReducer";
import { useDispatch } from "react-redux";
import { FormEvent } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const MovieComments = ({ movieId }: { movieId: number }) => {
  const { get_user, setExpiredToken } = UserInformationManager();
  const storedTokenObject = localStorage.getItem("token");

  type TokenInfo = {
    storedToken: string | undefined;
    tokenExpired: boolean | undefined;
  };
  const getToken = (): TokenInfo => {
    if (storedTokenObject === null) {
      return {
        storedToken: undefined,
        tokenExpired: undefined,
      };
    }
    const storedTokenJson = JSON.parse(storedTokenObject);
    const storedToken = storedTokenJson?.token;
    const tokenExpired = storedTokenJson?.expired;
    return { storedToken, tokenExpired };
  };
  const { storedToken, tokenExpired } = getToken();

  const getUser = () => {
    if (storedToken === undefined || tokenExpired === undefined) return;
    const user = GetUser(storedToken, get_user, tokenExpired, setExpiredToken);
    return user;
  };

  const user = getUser();

  type commentsType = {
    id: 0;
    comment: "";
    date: "";
    dislike: 0;
    like: 0;
    movieId: 0;
    name: "";
  };
  type commentsEngagementType = {
    id: 0;
    disLike: 0;
    like: 0;
  };
  const [comments, setComments] = useState<commentsType[]>([]);
  const [commentEngagements, setCommentEngagements] = useState<
    commentsEngagementType[]
  >([]);
  const [textareaHeight, setTextareaHeight] = useState("50px");
  const [text, setText] = useState({ movieId: 0, comment: "" });
  const [sendCommentStatus, setSendCommentStatus] = useState(false);
  const [getCommentsStatus, setGetCommentsStatus] = useState(false);
  const [expandComments, setExpandComments] = useState(false);
  const dispatch = useDispatch();
  const [updateCommentStatus, setUpdateCommentStatus] = useState({
    id: 0,
    status: false,
  });
  const { addComment, getComment, updateLike, updateDisLike } =
    CommentManager();
  const getTime = (time: string) => {
    const currentTime = new Date();
    const newTime = new Date(time);
    const timeElapsed = currentTime.getTime() - newTime.getTime();
    const seconds = Math.floor(timeElapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (hours < 1 && minutes < 1) return `a few seconds ago`;
    if (hours <= 0 && minutes > 0) return `${minutes} minutes ago`;
    if (hours > 0 && hours < 24) return `${hours} hours ago`;
    if (hours >= 24 && days > 0) return `${days} days ago`;
    if (days > 30 && months > 0) return `${months} months ago`;
    if (months > 12 && years > 0) return `${years} years ago`;
  };
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const containerRef = commentsContainerRef.current;
      if (
        expandComments &&
        containerRef &&
        !containerRef.contains(event.target as Node)
      ) {
        containerRef.scrollTop = 0;
        setExpandComments((prev) => !prev);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expandComments]);

  const updateCommentEngagement = (
    engagementType: "like" | "disLike",
    commentId: number
  ) => {
    if (!storedToken) return;
    // Update the backend
    if (engagementType === "like") {
      updateLike(commentId, storedToken);
    } else if (engagementType === "disLike") {
      updateDisLike(commentId, storedToken);
    }
    setCommentEngagements((prevEngagements) =>
      prevEngagements.map((engagement) =>
        engagement.id === commentId
          ? {
              ...engagement,
              [engagementType]: engagement[engagementType] + 1,
            }
          : engagement
      )
    );
  };
  useEffect(() => {
    setGetCommentsStatus(true);
  }, []);
  useEffect(() => {
    if (getCommentsStatus === false) return;
    getComment(movieId)
      .then((response) => {
        const comments = response.comments;
        setComments(comments);
        const commentEngagement = comments
          .map((comment: any) => ({
            id: comment.id,
            like: comment.like,
            disLike: comment.dislike,
          }))
          .reverse();
        setCommentEngagements(commentEngagement);
        setGetCommentsStatus(false);
      })
      .catch(() => {
        setGetCommentsStatus(false);
      });
  }, [getComment, movieId, getCommentsStatus]);

  useEffect(() => {
    if (text.comment === "" || text.comment === null || !sendCommentStatus)
      return;

    addComment(text, storedToken)
      .then(() => {
        setExpandComments(true);
        setGetCommentsStatus(true);
        setSendCommentStatus(false);
      })
      .catch(() => {
        setSendCommentStatus(false);
      });
  }, [addComment, sendCommentStatus, text, storedToken]);

  const handleSubmit = (event: FormEvent) => {
    if (storedToken === undefined) {
      dispatch(setNotificationStatus(true));
    }
    event.preventDefault();
    if (text.comment === "") return;
    setSendCommentStatus(true);

    const commentJson = {
      id: 0,
      comment: text.comment,
      dislike: 0,
      email: "",
      name: user?.name,
      like: 0,
      movieId: movieId,
      date: "",
    };
    if (storedToken !== undefined) {
      setComments((comment: any) => {
        return [...comment, commentJson];
      });
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText({
      movieId: movieId,
      comment: e.target.value,
    });
  };
  return (
    <div className="w-full sm:w-full min-h-[200px] h-auto sm:pl-[4%] sm:pr-3 py-6 ">
      <div className="w-full sm:w-[90%] sm:px-3 px-1 py-1 flex flex-col gap-3">
        <span className="text-xl font-bold text-gray-400">
          Share your thoughts
        </span>

        <div className="flex flex-col gap-7">
          <form
            action=""
            className="w-full flex flex-row gap-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <textarea
              placeholder="Share your opinion"
              onChange={(e) => handleOnChange(e)}
              className="w-full bg-gray-500 text-white rounded-md min-h-[40px] py-3 px-3 resize-none"
              style={{
                height: textareaHeight,
                maxHeight: "150px",
                transition: "height 0.3s ease",
              }}
              onClick={() => setTextareaHeight("100px")}
              onFocus={() => setTextareaHeight("100px")}
              onBlur={() => setTextareaHeight("50px")}
              onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            ></textarea>
            <input
              type="submit"
              className="px-3 py-3 rounded-md bg-blue-500 text-gray-200 hover:cursor-pointer max-h-[50px]"
            />
          </form>
          {/* comment */}
          {comments.length > 0 && (
            <div
              ref={commentsContainerRef}
              className={`w-full h-auto min-h-[300px] max-h-[700px] flex flex-col rounded-lg bg-[#2e4156] shadow-lg py-[4%] px-[4%] gap-[3.75rem] text-gray-300 sm:text-base text-sm transition-height relative ${
                expandComments ? "overflow-auto" : "overflow-hidden"
              } `}
              style={{
                height: `${
                  expandComments ? (comments.length - 2) * 300 + 150 : 300
                }px`,
                transition: "height 0.3s ease",
              }}
            >
              {comments
                ?.slice()
                ?.reverse()
                ?.map((comment, index) => {
                  const engagement = commentEngagements.find(
                    (engagement) => engagement.id === comment.id
                  );
                  return (
                    <div
                      className="flex flex-row relative w-full h-fit gap-4 shadow-lg py-3"
                      key={comment?.id}
                    >
                      <div className="w-[50px] h-[50px] flex justify-center items-center rounded-lg bg-slate-800">
                        <IoPersonSharp size={30} color="gray" />
                      </div>
                      <div className="flex flex-col h-fit w-full gap-2 relative">
                        <EditCommentFunc
                          setGetCommentsStatus={setGetCommentsStatus}
                          storedToken={storedToken}
                          commentId={comment?.id}
                          updateCommentStatus={updateCommentStatus}
                          index={index}
                          setUpdateCommentStatus={setUpdateCommentStatus}
                        />
                        <div className="w-full flex flex-row justify-between items-center">
                          <div className="w-fit h-[50px] flex justify-center flex-col">
                            <button className="font-bold text-gray-300 text-lg w-fit">
                              {comment?.name}
                            </button>
                            <span>{getTime(comment?.date)}</span>
                          </div>
                          <div className="flex flex-row gap-3 px-3">
                            {comment?.name === user?.name && (
                              <button
                                className="hover:scale-110 duration-300"
                                onClick={() =>
                                  setUpdateCommentStatus({
                                    id: index,
                                    status: true,
                                  })
                                }
                              >
                                <AiFillEdit size={25} />
                              </button>
                            )}
                            {comment?.name === user?.name && (
                              <DeleteComment
                                commentId={comment?.id}
                                storedToken={storedToken}
                                setGetCommentsStatus={setGetCommentsStatus}
                              />
                            )}
                          </div>
                        </div>

                        <div className="w-full h-auto flex items-center py-1">
                          <span className="">{comment?.comment}</span>
                        </div>
                      </div>
                      <div className="w-fit h-auto absolute -bottom-7 -right-3 flex justify-end px-3 py-2 gap-4 rounded-md bg-slate-800 text-sm">
                        <button
                          className="hover:scale-110 duration-300 shadow-lg flex flex-row gap-2"
                          onClick={() =>
                            updateCommentEngagement("like", comment?.id)
                          }
                        >
                          <FaThumbsUp size={20} color="gray" />
                          {engagement?.like}
                        </button>
                        <button
                          className="hover:scale-110 duration-300 shadow-lg flex flex-row gap-2"
                          onClick={() =>
                            updateCommentEngagement("disLike", comment?.id)
                          }
                        >
                          <FaThumbsDown size={20} color="gray" />
                          {engagement?.disLike}
                        </button>
                      </div>{" "}
                    </div>
                  );
                })}
              <button
                className={`w-full h-[100px] bottom-0 left-0 bg-gradient-to-b to-[#283747]/90 from-[#2E4056]/90 flex justify-center items-end py-4 ${
                  expandComments ? "hidden" : "absolute"
                }`}
                onClick={() => setExpandComments(true)}
              >
                <span className="text-lg font-bold text-gray-500 animate-pulse">
                  Show More
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieComments;
