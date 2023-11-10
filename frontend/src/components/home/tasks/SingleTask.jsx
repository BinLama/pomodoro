import { AiOutlineCheck } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useTaskContext } from "../../../hooks/useTasks";

const SingleTask = ({ task }) => {
  const { title, note, id, completed } = task;
  const [edit, setEdit] = useState(false);

  const { updateTask } = useTaskContext();

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
                onClick={() => {
                  updateTask(id, { completed: !completed });
                }}
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
          <TaskModal close={closeEdit} title={title} note={note} id={id} />
        </div>
      )}
    </div>
  );
};
export default SingleTask;