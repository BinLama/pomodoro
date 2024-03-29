import { IoIosAddCircleOutline } from "react-icons/io";

const AddTask = ({ openAddModal }) => {
  return (
    <>
      {/* add task */}
      <div className="tasks__list-addtask">
        <button
          type="button"
          className="btn"
          onClick={() => {
            openAddModal();
          }}
        >
          <IoIosAddCircleOutline /> <p>Add Task</p>
        </button>
      </div>
    </>
  );
};
export default AddTask;
