import { useState, ChangeEvent, FormEvent } from "react";
import CommentManager from "../API/CommentManager";

type updateCommentStatus = {
  id: number;
  status: boolean;
};
type setUpdateCommentStatus = React.Dispatch<
  React.SetStateAction<{
    id: number;
    status: boolean;
  }>
>;

type setGetCommentsStatus = React.Dispatch<React.SetStateAction<boolean>>;

const EditComment = ({
  updateCommentStatus,
  index,
  setUpdateCommentStatus,
  storedToken,
  commentId,
  setGetCommentsStatus,
}: {
  updateCommentStatus: updateCommentStatus;
  index: number;
  setUpdateCommentStatus: setUpdateCommentStatus;
  storedToken: string | undefined;
  commentId: number;
  setGetCommentsStatus: setGetCommentsStatus;
}) => {
  const { editComment } = CommentManager();
  const [updatedComment, setUpdatedComment] = useState({
    comment: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedComment({
      comment: e.target.value,
    });
    // console.log(e.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (storedToken === undefined) return;
    if (
      updatedComment.comment === undefined ||
      updatedComment.comment === null ||
      updatedComment.comment === ""
    )
      return;
    event.preventDefault();
    editComment(commentId, storedToken, updatedComment)
      .then((response) => {
        setGetCommentsStatus(true);
        setUpdateCommentStatus({
          id: 0,
          status: false,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={`${
        updateCommentStatus.status && updateCommentStatus.id === index
          ? "w-full"
          : "w-0"
      } h-full absolute top-0 left-0 bg-[#2e4156] py-1 overflow-hidden duration-300`}
    >
      <form className="flex flex-row gap-3 w-full" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          name=""
          id=""
          required
          className="w-full bg-gray-500 text-white rounded-md min-h-[40px] py-3 px-3 resize-none"
        />
        <input
          type="submit"
          value="Update"
          className="px-3 py-3 rounded-md bg-blue-500 text-gray-200 hover:cursor-pointer max-h-[50px]"
        />
        <input
          type="button"
          value="Cancel"
          className="px-3 py-3 rounded-md bg-red-500 text-gray-200 hover:cursor-pointer max-h-[50px]"
          onClick={() =>
            setUpdateCommentStatus({
              id: 0,
              status: false,
            })
          }
        />
      </form>
    </div>
  );
};

export default EditComment;
