import { BsThreeDotsVertical } from "react-icons/bs";
import { taskSetting } from "../../../data";
import SingleTaskSetting from "./SingleTaskTitleSetting";
import { useState } from "react";

const TaskTitle = () => {
  // showing setting when clicked
  const [displaySetting, setDisplaySetting] = useState(false);
  // closing setting
  const openAndCloseSetting = () => {
    setDisplaySetting(!displaySetting);
  };

  return (
    <div className="tasks__title">
      <h1>Tasks</h1>
      <div className="tasks__title__button">
        <button className="btn" onClick={openAndCloseSetting}>
          <BsThreeDotsVertical />
        </button>
        {displaySetting && (
          <div className="tasks__title__setting">
            {taskSetting.map((task) => {
              console.log(task);
              const { id } = task;
              return <SingleTaskSetting task={task} key={id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskTitle;
