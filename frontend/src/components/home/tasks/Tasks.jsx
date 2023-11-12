import SingleTask from "./SingleTask";
import { useEffect, useRef } from "react";
import TaskModal from "./TaskModal";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";
import { useTaskContext } from "../../../hooks/useTasks";

const Tasks = () => {
  const {
    tasks,
    setTasks,
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

  const dragTaskRef = useRef(null);
  const dragOverItemRef = useRef(null);

  // handle drag sorting
  const handleDragStart = (e, index) => {
    dragTaskRef.current = index;
    setTasks([...tasks]); // Make sure to create a new array to trigger a re-render
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

        setTasks(_tasks);
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

      dragTaskRef.current = null;
      dragOverItemRef.current = null;

      setTasks(() => _tasks);
    }
  };

  // // handle drag sorting
  // const handleDragSort = () => {
  //   if (dragTaskRef.current !== null && dragOverItemRef.current !== null) {
  //     let _tasks = [...tasks];

  //     // remove and save the dragged item
  //     const dragItemContent = _tasks.splice(dragTaskRef.current, 1)[0];

  //     // switch the position
  //     _tasks.splice(dragOverItemRef.current, 0, dragItemContent);

  //     dragTaskRef.current = null;
  //     dragOverItemRef.current = null;

  //     setTasks(() => _tasks);
  //   }
  // };

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
          {tasks.map((task, index) => {
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
