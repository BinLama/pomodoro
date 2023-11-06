import { IoAddCircle } from "react-icons/io5";
import SingleTask from "./SingleTask";
import { useEffect, useRef, useState } from "react";
import TaskModal from "./TaskModal";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";
import { v4 as uuid } from "uuid";
import { useTaskContext } from "../../hooks/useTasks";

const Tasks = () => {
  const {
    tasks,
    createTask,
    getTasks,
    addTaskRef,
    openAddModal,
    closeAddModal,
    showAddModal,
  } = useTaskContext();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="tasks">
      <TaskTitle />
      <div className="underline"></div>
      {/* create an add task button */}
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
        {showAddModal && (
          <div className="task__modal">
            <TaskModal
              newTask={true}
              close={closeAddModal}
              createTask={createTask}
              ref={addTaskRef}
            />
          </div>
        )}

        <AddTask openAddModal={openAddModal} />
      </div>
    </div>
  );
};
export default Tasks;
