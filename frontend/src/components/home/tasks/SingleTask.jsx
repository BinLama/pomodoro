import { AiOutlineCheck } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskModal from "./TaskModal";
import { useState } from "react";
import { useTaskContext } from "../../../hooks/useTasks";

const SingleTask = ({ task, onDragStart, onDragEnter, onDragEnd, index }) => {
  const { title, note, id, completed } = task;
  const [edit, setEdit] = useState(false);

  const [moving, setMoving] = useState(false);
  const { updateTask } = useTaskContext();

  const showEdit = () => {
    setEdit(true);
  };

  const closeEdit = () => {
    setEdit(false);
  };

  return (
    <div
      className={completed ? "task fade" : "task"}
      draggable={!edit}
      style={{
        cursor: !edit ? "move" : "auto",
        opacity: moving ? 0.5 : 1,
        backgroundColor: moving ? "rgba(203,213,225, 0.5)" : "",
      }}
      onDragStart={(e) => {
        onDragStart(e, index);
        setMoving(true);
      }}
      onDragEnter={(e) => {
        onDragEnter(e, index);
      }}
      onDragEnd={() => {
        onDragEnd();
        setMoving(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
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
