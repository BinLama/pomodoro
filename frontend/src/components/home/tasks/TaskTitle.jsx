import { BsThreeDotsVertical } from "react-icons/bs";
import { taskSetting } from "../../../data";
import { useTaskContext } from "../../../hooks/useTasks";
import { usePomodoroContext } from "../../../hooks/usePomodoroContext";
import { useEffect, useRef } from "react";

const TaskTitle = () => {
  const {
    markAllTasks,
    toggleHidden,
    hidden,
    clearAllTasks,
    unMarkAllTasks,
    showSetting,
    toggleSetting,
  } = useTaskContext();

  const { showLogin } = usePomodoroContext();

  // auto hide task setting
  const taskSettingRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSetting &&
        taskSettingRef.current &&
        !taskSettingRef.current.contains(e.target)
      ) {
        toggleSetting();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSetting]);

  let zIndexCSS = {};

  if (showLogin) {
    zIndexCSS = {
      zIndex: -1,
    };
  }

  return (
    <div className="tasks__title">
      <h1>Tasks</h1>
      <div
        className="tasks__title__button"
        style={zIndexCSS}
        ref={taskSettingRef}
      >
        <button className="btn" onClick={toggleSetting}>
          <BsThreeDotsVertical />
        </button>
        {showSetting && (
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
