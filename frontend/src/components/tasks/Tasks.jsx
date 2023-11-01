import { BsThreeDotsVertical } from "react-icons/bs";
import SingleTask from "./SingleTaskTitleSetting";
import { taskSetting } from "../../data";

const Tasks = () => {
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
              return <SingleTask task={task} key={id} />;
            })}
          </div>
          <div className="underline"></div>
        </div>
      </div>
      {/* creat an add task button */}
      {/* add new task here and make them dragable */}
      {/* move the add task buttom below */}
    </div>
  );
};
export default Tasks;
