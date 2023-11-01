import { AiOutlineCheck } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const SingleTask = ({ task }) => {
  const { title, note } = task;
  return (
    <div className="task">
      <div className="task__info">
        <div className="task__completion">
          <AiOutlineCheck />
        </div>
        <p>{title}</p>
        <button className="task__edit">
          <BsThreeDotsVertical />
        </button>
      </div>
      <div className="task__note">
        <p>{note}</p>
      </div>
    </div>
  );
};
export default SingleTask;
