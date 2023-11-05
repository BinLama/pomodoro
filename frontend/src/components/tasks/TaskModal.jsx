import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const TaskModal = ({ close, title = "", note = "" }) => {
  const [pomoTask, setPomoTask] = useState({
    title: title,
    notes: note,
  });

  const [notes, setNotes] = useState(false);

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
          className={
            notes
              ? "tasks__list__modal-textarea notes"
              : "tasks__list__modal-textarea"
          }
          value={pomoTask.notes}
          onChange={(e) => {
            setPomoTask((oldTask) => {
              return { ...oldTask, notes: e.target.value };
            });
          }}
          placeholder="Some notes..."
        ></textarea>
        <button
          type="button"
          onClick={() =>
            setNotes((oldNote) => {
              return !oldNote;
            })
          }
          className="btn"
        >
          {notes ? (
            <>
              <AiOutlinePlus /> Add Notes
            </>
          ) : (
            <>
              <AiOutlinePlus /> Remove Notes
            </>
          )}
        </button>
      </div>
      <div className="tasks__list__commit">
        <button type="button" className="btn delete">
          Delete
        </button>
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
