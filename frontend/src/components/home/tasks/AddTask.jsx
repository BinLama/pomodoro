import { IoAddCircle } from "react-icons/io5";

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
          <IoAddCircle /> Add Task
        </button>
      </div>
    </>
  );
};
export default AddTask;
