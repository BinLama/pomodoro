import { useEffect, useState, useRef, forwardRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { CREATE, SCROLLHEIGHT, UPDATE } from "../../../utils/constants";
import { useTaskContext } from "../../../hooks/useTasks";

// ref is used for focus on click
const TaskModal = ({ id, close, title = "", note = "", newTask = false }) => {
  const { createTask, updateTask, deleteTask, addTaskRef } = useTaskContext();

  const [pomoTask, setPomoTask] = useState({
    title: title,
    note: note,
  });

  const [invalid, setInvalid] = useState(false);

  // for specific reducers
  const [actionType, setActionType] = useState(null);

  // for calling the reducers
  const [changeCounter, setChangeCounter] = useState(0);

  /**
   * auto increasing textarea
   */
  const textareaRef = useRef(null);
  const addBtnRef = useRef(null);

  useEffect(() => {
    // reset height - important to shrink on delete
    textareaRef.current.style.height = `${SCROLLHEIGHT}px`;

    // set height
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      SCROLLHEIGHT
    )}px`;
  }, [pomoTask.note]);

  /**
   * used to go to next input when enter is clicked
   */
  useEffect(() => {
    const handleClick = (e) => {
      if (e.keyCode === 13 || e.key === "enter") {
        const addBtn = addBtnRef.current;
        addBtn.click();
      }
    };

    const titleArea = addTaskRef.current;
    titleArea.addEventListener("keyup", handleClick);
    return () => {
      titleArea.removeEventListener("keyup", handleClick);
    };
  }, []);

  /**
   * validating and trimming inputs
   */
  const validInput = () => {
    const title = pomoTask.title.trim();
    if (title.length <= 0) {
      return true;
    }
    return false;
  };

  /**
   * calling specific reducers based on the action type
   */
  useEffect(() => {
    if (!actionType) return;
    if (invalid) return;
    const title = pomoTask.title.trim();
    const note = pomoTask.note.trim();
    const newTask = { title, note };

    // task update based on action type
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

    // resetting the task
    setPomoTask({ title: "", note: "", position: -1 });
    close();
  }, [changeCounter]);

  /**
   * taskchange calls data validation and reducers
   */
  const taskChanged = () => {
    const isInvalid = validInput();
    setInvalid(isInvalid);
    // change counter is used to call the useEffect
    // for updating or creating task
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
          ref={addTaskRef}
          autoFocus
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
        <div>
          {newTask ? (
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setActionType(CREATE);
                taskChanged();
              }}
              ref={addBtnRef}
            >
              Add
            </button>
          ) : (
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                setActionType(UPDATE);
                taskChanged();
              }}
              ref={addBtnRef}
            >
              Save
            </button>
          )}
          <button type="button" className="btn secondary" onClick={close}>
            Cancel
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default TaskModal;
