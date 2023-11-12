import { createContext, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // CRUD for tasks
  // create (should be a dictionary)
  const createTask = (newTask) => {
    const id = uuid();
    const task = { ...newTask, id };
    console.log(task);
    setTasks((oldTasks) => [...oldTasks, task]);
    console.log("TASK CREATED");
  };

  // read
  const getTasks = () => {
    // query the database to get the tasks
    // TODO: tasks should be received through local host or database.
    setTasks([
      { id: 1, title: "task1", note: "task1 note", completed: false },
      {
        id: 2,
        title:
          "very long title for my task so long that it will take over many spaces",
        note: "very long task note for my task so long that it will take many lines to even write this",
        completed: true,
      },
      { id: 3, title: "Done", note: "task3 note", completed: false },
      {
        id: 4,
        title: "12345678901234567 8901234567890",
        note: "",
        completed: false,
      },
    ]);
  };

  // update
  const updateTask = (id, updatedValue) => {
    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedValue };
      }
      return task;
    });

    console.log("TASK UPDATED");
    setTasks(newTaskList);
  };

  // delete
  const deleteTask = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
    console.log("TASK DELETED");
  };

  // focus when modal is open
  const addTaskRef = useRef(null);

  const focus = () => {
    addTaskRef.current.focus();
  };

  // showing add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // opening a modal
  const openAddModal = () => {
    setShowAddModal(true);
    if (addTaskRef.current) {
      focus();
    }
  };

  // closing a modal
  const closeAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
        openAddModal,
        addTaskRef,
        closeAddModal,
        showAddModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
