import { useEffect, useState, useRef, forwardRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { CREATE, SCROLLHEIGHT, UPDATE } from "../../../utils/constants";
import { useTaskContext } from "../../../hooks/useTasks";

// ref is used for focus on click
const TaskModal = forwardRef(
  ({ id, close, title = "", note = "", newTask = false }, ref) => {
    const { createTask, updateTask, deleteTask } = useTaskContext();

    const [pomoTask, setPomoTask] = useState({
      title: title,
      note: note,
    });

    const [invalid, setInvalid] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [changeCounter, setChangeCounter] = useState(0);

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
        return true;
      }
      console.log("VALID");
      return false;
    };

    useEffect(() => {
      if (!actionType) return;
      if (invalid) return;
      const title = pomoTask.title.trim();
      const note = pomoTask.note.trim();
      const newTask = { title, note };
      switch (actionType) {
        case CREATE:
          createTask(newTask);
          break;
        case UPDATE:
          updateTask(id, newTask);
          break;
        default:
          console.log("not a valid case");
      }
      setPomoTask({ title: "", note: "", position: -1 });
      close();
    }, [changeCounter]);

    const taskChanged = () => {
      const isInvalid = validInput();
      setInvalid(isInvalid);
      setChangeCounter((prev) => prev + 1);
    };

    return (
      <div className="tasks__list__modal">
        <div className="tasks__list__modal-title">
          <input
            className={invalid ? "is__error" : ""}
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
              <button
                type="button"
                className="btn save"
                onClick={() => {
                  setActionType(CREATE);
                  taskChanged();
                }}
              >
                Add
              </button>
            ) : (
              <button
                type="button"
                className="btn save"
                onClick={() => {
                  setActionType(UPDATE);
                  taskChanged();
                }}
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
