import SingleTask from "./SingleTask";
import { useRef, useState } from "react";
import TaskModal from "./TaskModal";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";
import { useTaskContext } from "../../../hooks/useTasks";
import { tasksActions } from "../../../utils/constants";

const Tasks = () => {
  const {
    tasks,
    dispatch,
    createTask,
    openAddModal,
    closeAddModal,
    showAddModal,
    hidden,
  } = useTaskContext();

  /* SHOW AND HIDE FUNCTIONALITY END */

  /* DRAG AND DROP FUNCTIONALITY */
  const dragTaskRef = useRef(null);
  const dragOverItemRef = useRef(null);

  // handle drag sorting
  const handleDragStart = (e, index) => {
    dragTaskRef.current = index;
    // dispatch({ type: tasksActions.SET_TASKS, payload: tasks }); // Make sure to create a new array to trigger a re-render
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    if (dragTaskRef.current !== null) {
      dragOverItemRef.current = index;

      if (
        dragOverItemRef.current !== null &&
        dragOverItemRef.current !== dragTaskRef.current
      ) {
        let _tasks = [...tasks];
        const dragItemContent = _tasks.splice(dragTaskRef.current, 1)[0];
        _tasks.splice(dragOverItemRef.current, 0, dragItemContent);

        dragTaskRef.current = dragOverItemRef.current;
        // dispatch({ type: tasksActions.SET_TASKS, payload: _tasks });
      }
    }
  };

  const handleDragEnd = () => {
    if (dragTaskRef.current !== null && dragOverItemRef.current !== null) {
      let _tasks = [...tasks];

      // remove and save the dragged item
      const dragItemContent = _tasks.splice(dragTaskRef.current, 1)[0];

      // switch the position
      _tasks.splice(dragOverItemRef.current, 0, dragItemContent);

      console.log(dragItemContent.id);
      dragTaskRef.current = null;
      dragOverItemRef.current = null;
      console.log(_tasks);

      // dispatch({ type: tasksActions.SET_TASKS, payload: _tasks });

      // TODO connect to server here.
    }
  };

  /* DRAG AND DROP FUNCTIONALITY END*/

  return (
    <div className="tasks">
      <TaskTitle />
      <div className="underline"></div>

      <div className="tasks__list">
        {/* a single task */}
        <div className="tasks__list__task">
          {tasks.map((task, index) => {
            if ((hidden && !task.completed) || !hidden) {
              return (
                <SingleTask
                  key={task.id}
                  task={task}
                  onDragStart={handleDragStart}
                  onDragEnter={handleDragEnter}
                  onDragEnd={handleDragEnd}
                  index={index}
                />
              );
            }
          })}
        </div>

        {/* modal for task CRUD */}
        {showAddModal && (
          <div className="task__modal">
            <TaskModal
              newTask={true}
              close={closeAddModal}
              createTask={createTask}
            />
          </div>
        )}

        <AddTask openAddModal={openAddModal} />
      </div>
    </div>
  );
};
export default Tasks;
