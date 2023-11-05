import { useEffect, useState, useRef } from "react";
import { BsTrashFill } from "react-icons/bs";
import { SCROLLHEIGHT } from "../../utils/constants";

const TaskModal = ({ close, title = "", note = "", showDelete = true }) => {
  const [pomoTask, setPomoTask] = useState({
    title: title,
    note: note,
  });

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

  return (
    <div className="tasks__list__modal">
      <div className="tasks__list__modal-title">
        <input
          type="text"
          placeholder="What are you working on?"
          value={pomoTask.title}
          onChange={(e) => {
            setPomoTask((oldTask) => {
              const title = e.target.value;
              return { ...oldTask, title };
            });
          }}
        />
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
        {showDelete && (
          <button type="button" className="btn delete">
            <BsTrashFill />
          </button>
        )}
        <div className="">
          <button type="button" className="btn cancel" onClick={close}>
            Cancel
          </button>
          <button type="button" className="btn save">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskModal;
