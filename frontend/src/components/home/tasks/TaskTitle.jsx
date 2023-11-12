import { BsThreeDotsVertical } from "react-icons/bs";
import { taskSetting } from "../../../data";
import { useTaskContext } from "../../../hooks/useTasks";

const TaskTitle = ({ displaySetting, openAndCloseSetting }) => {
  const { markAllTasks, toggleHidden, hidden, clearAllTasks, unMarkAllTasks } =
    useTaskContext();

  // toggle hide and show items

  return (
    <div className="tasks__title">
      <h1>Tasks</h1>
      <div
        className="tasks__title__button"
        style={{ zIndex: displaySetting ? 2 : 0 }}
      >
        <button className="btn" onClick={openAndCloseSetting}>
          <BsThreeDotsVertical />
        </button>
        {displaySetting && (
          <div className="tasks__title__setting">
            <div className="tasks__title__setting-div" onClick={toggleHidden}>
              {!hidden ? (
                <div>
                  {taskSetting[0].icon} <p>{taskSetting[0].text}</p>
                </div>
              ) : (
                <div>
                  {taskSetting[1].icon} <p>{taskSetting[1].text}</p>
                </div>
              )}
            </div>
            <div className="tasks__title__setting-div" onClick={markAllTasks}>
              <div>
                {taskSetting[2].icon} <p>{taskSetting[2].text}</p>
              </div>
            </div>
            <div className="tasks__title__setting-div" onClick={unMarkAllTasks}>
              <div>
                {taskSetting[3].icon} <p>{taskSetting[3].text}</p>
              </div>
            </div>
            <div className="tasks__title__setting-div" onClick={clearAllTasks}>
              <div className="priority"></div>
              <div>
                {taskSetting[taskSetting.length - 1].icon}{" "}
                <p>{taskSetting[taskSetting.length - 1].text}</p>
              </div>
            </div>
            {/* {taskSetting.map((task) => {
              console.log(task);
              const { id } = task;
              return <SingleTaskSetting task={task} key={id} />;
            })} */}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskTitle;
