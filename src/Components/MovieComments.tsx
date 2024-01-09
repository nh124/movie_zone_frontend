import { useEffect, useState } from "react";
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
  const [comments, setComments] = useState([
    {
      id: 0,
      comment: "",
      date: "",
      dislike: 0,
      like: 0,
      movieId: 0,
      name: "",
    },
  ]);
  const [textareaHeight, setTextareaHeight] = useState("50px");
  const [text, setText] = useState({ movieId: 0, comment: "" });
  const [sendCommentStatus, setSendCommentStatus] = useState(false);
  const [getCommentsStatus, setGetCommentsStatus] = useState(false);
  const dispatch = useDispatch();
  const [updateCommentStatus, setUpdateCommentStatus] = useState({
    id: 0,
    status: false,
  });
  const { addComment, getComment } = CommentManager();
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
    if (hours > 0) return `${hours} hours ago`;
    if (hours > 24 && days > 0) return `${days} days ago`;
    if (days > 30 && months > 0) return `${months} months ago`;
    if (months > 12 && years > 0) return `${years} years ago`;
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
        setGetCommentsStatus(false);
      })
      .catch(() => {
        // console.log(error);
        setGetCommentsStatus(false);
      });
  }, [getComment, movieId, getCommentsStatus]);

  useEffect(() => {
    if (text.comment === "" || text.comment === null || !sendCommentStatus)
      return;

    addComment(text, storedToken)
      .then(() => {
        setGetCommentsStatus(true);
        setSendCommentStatus(false);
      })
      .catch((error) => {
        console.log(error);
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
    <div className="w-full sm:w-[70%] min-h-[400px] h-auto sm:pl-[4%] sm:pr-3 py-6">
      <div className="w-full sm:w-[90%] sm:px-3 px-1 py-1">
        <span className="text-xl font-bold text-gray-400">
          Share your thoughts
        </span>
        <div className="w-full h-[100px] flex flex-row justify-center items-center"></div>
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
          <div className="w-full h-auto flex flex-col rounded-lg bg-[#2e4156] shadow-lg py-[4%] px-[4%] gap-[3.75rem] text-gray-300 sm:text-base text-sm">
            {comments?.map((comment, index) => (
              <div
                className="flex flex-row relative w-full h-full gap-4 shadow-lg py-3"
                key={comment?.id}
              >
                <div className="w-[50px] h-[50px] flex justify-center items-center rounded-lg bg-slate-800">
                  <IoPersonSharp size={30} color="gray" />
                </div>

                <div className="flex flex-col h-auto w-full gap-2 relative">
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

                {/* <div className="w-fit h-auto absolute -bottom-7 -right-3 flex justify-end px-3 py-2 gap-4 rounded-md bg-slate-800 text-sm">
                  <button
                    className="hover:scale-110 duration-300 shadow-lg flex flex-row gap-2"
                    onClick={() => UpdateLike(comment?.id)}
                  >
                    <FaThumbsUp size={20} color="gray" />
                    {comment?.like}
                  </button>
                  <button
                    className="hover:scale-110 duration-300 shadow-lg flex flex-row gap-2"
                    onClick={() => UpdateDisLike(comment?.id)}
                  >
                    <FaThumbsDown size={20} color="gray" />
                    {comment?.dislike}
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieComments;
