import { useEffect, useState, useRef, forwardRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { SCROLLHEIGHT } from "../../utils/constants";
import { useTaskContext } from "../../hooks/useTasks";

const TaskModal = forwardRef(
  ({ id, close, title = "", note = "", newTask = false }, ref) => {
    const { createTask, updateTask, deleteTask } = useTaskContext();

    const [pomoTask, setPomoTask] = useState({
      title: title,
      note: note,
    });
    const [invalid, setInvalid] = useState(false);
    // for auto increasing textarea
    const textareaRef = useRef(null);

    useEffect(() => {
      // reset height - important to shrink on delete
      textareaRef.current.style.height = `${SCROLLHEIGHT}px`;

      // set height
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        SCROLLHEIGHT
      )}px`;
    }, [pomoTask.note]);

    // validating and trimming inputs
    const validInput = () => {
      const title = pomoTask.title.trim();
      if (title.length <= 0) {
        console.log("INVALID");
        return false;
      }
      setPomoTask({ ...pomoTask, title });
      return true;
    };

    const saveBtnClick = () => {
      const valid = validInput();
      setInvalid(!valid);

      if (!valid) return;
      createTask(pomoTask);
      setPomoTask({
        title: "",
        note: "",
      });
      close();
    };

    const updateBtnClick = () => {
      const valid = validInput();
      setInvalid(!valid);

      if (!valid) return;
      updateTask(id, pomoTask);
      close();
    };

    return (
      <div className="tasks__list__modal">
        <div className="tasks__list__modal-title">
          <input
            className={invalid && "is__error"}
            type="text"
            placeholder="What are you working on?"
            value={pomoTask.title}
            onChange={(e) => {
              setPomoTask((oldTask) => {
                const title = e.target.value;
                return { ...oldTask, title };
              });
            }}
            ref={ref}
          />
          {/* TODO: format the notValid things */}
          {invalid && (
            <span className="error">Please provide title for your task.</span>
          )}
        </div>
        <div className="tasks__list__modal-notes">
          <textarea
            className="tasks__list__modal-textarea"
            value={pomoTask.note}
            onChange={(e) => {
              setPomoTask((oldTask) => {
                return { ...oldTask, note: e.target.value };
              });
            }}
            ref={textareaRef}
            placeholder="Some notes..."
          ></textarea>
        </div>
        <div className="tasks__list__modal-buttons">
          {!newTask && (
            <button
              type="button"
              className="btn delete"
              onClick={() => {
                deleteTask(id);
              }}
            >
              <BsTrashFill />
            </button>
          )}
          <div className="">
            <button type="button" className="btn cancel" onClick={close}>
              Cancel
            </button>

            {newTask ? (
              <button type="button" className="btn save" onClick={saveBtnClick}>
                Add
              </button>
            ) : (
              <button
                type="button"
                className="btn save"
                onClick={updateBtnClick}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
export default TaskModal;
