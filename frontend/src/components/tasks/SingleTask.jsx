import { AiOutlineCheck } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskModal from "./TaskModal";
import { useState } from "react";

const SingleTask = ({ task }) => {
  const { title, note } = task;

  const [edit, setEdit] = useState(false);
  const [completed, setCompleted] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
  };

  return (
    <div className={completed ? "task fade" : "task"}>
      {!edit && (
        <div className="task__show">
          <div className="task__info">
            <div className="task__detail">
              <div
                className={completed ? "task__mark completed" : "task__mark"}
                onClick={() => setCompleted((prev) => !prev)}
              >
                <AiOutlineCheck />
              </div>
              <div className="task__title">
                <p>{title}</p>
              </div>
              <button className="task__edit-button btn" onClick={showEdit}>
                <BsThreeDotsVertical />
              </button>
            </div>
          </div>
          {note && (
            <div className="task__note">
              <p>{note}</p>
            </div>
          )}
        </div>
      )}
      {edit && (
        <div className="task__edit">
          <TaskModal close={closeEdit} title={title} note={note} />
        </div>
      )}
    </div>
  );
};
export default SingleTask;
