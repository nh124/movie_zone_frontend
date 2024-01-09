import { MdDeleteOutline } from "react-icons/md";
import CommentManager from "../API/CommentManager";

const DeleteComment = ({
  commentId,
  storedToken,
  setGetCommentsStatus,
}: {
  commentId: number;
  storedToken: string | undefined;
  setGetCommentsStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { deleteComment } = CommentManager();

  const onClick = () => {
    deleteComment(commentId, storedToken)
      .then((response) => {
        setGetCommentsStatus(true);
        console.log(response);
      })
      .catch((error) => {
        setGetCommentsStatus(true);
        console.log(error);
      });
  };
  return (
    <button className="hover:scale-110 duration-300" onClick={() => onClick()}>
      <MdDeleteOutline size={25} />
    </button>
  );
};

export default DeleteComment;
