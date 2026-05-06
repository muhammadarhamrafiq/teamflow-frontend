import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

const Comments = () => {
  return (
    <div className="mx-4 md:mx-8 mt-2 md:mt-4 mb-4">
      <h2 className="text-lg font-bold leading-tight tracking-tight capitalize">
        Coments
      </h2>
      <CreateComment />
      <CommentList />
    </div>
  );
};

export default Comments;
