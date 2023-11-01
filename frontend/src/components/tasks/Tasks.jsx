import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAddCircle } from "react-icons/io5";
import SingleTaskSetting from "./SingleTaskTitleSetting";
import SingleTask from "./SingleTask";
import { taskSetting } from "../../data";
import { useState } from "react";
import TaskModal from "./TaskModal";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "task1", note: "task1 note" },
    { id: 2, title: "In Progress", note: "task2 note" },
    { id: 3, title: "Done", note: "task3 note" },
  ]);

  const createTask = () => {};

  return (
    <div className="tasks">
      <div className="tasks__title">
        <h1>Tasks</h1>
        <div className="task__title__button">
          <button>
            <BsThreeDotsVertical />
          </button>
          <div className="tasks__title__setting">
            {taskSetting.map((task) => {
              console.log(task);
              const { id } = task;
              return <SingleTaskSetting task={task} key={id} />;
            })}
          </div>
          <div className="underline"></div>
        </div>
      </div>
      {/* creat an add task button */}
      {/* add new task here and make them dragable */}
      {/* move the add task buttom below */}
      <div className="tasks__list">
        {/* a single task */}
        <div className="tasks__list__task">
          {tasks.map((task) => {
            return <SingleTask key={task.id} task={task} />;
          })}
        </div>
        {/* modal for task CRUD */}
        <TaskModal />
        {/* add task */}
        <div className="tasks__list-addtask">
          <button type="button">
            <IoAddCircle /> Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
