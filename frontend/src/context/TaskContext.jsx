import { createContext, useState, useRef, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { mergeArrays } from "../utils/utilityFunc";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { INITIAL_TASKS_STATE, tasksReducer } from "../reducers/taskReducers";
import { tasksActions } from "../utils/constants";
export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  // const [hidden, setHidden] = useState(false);

  // showing add modal
  const [showAddModal, setShowAddModal] = useState(false);

  const { setItem, getItem } = useLocalStorage("taskContext");
  const initialTasks = getItem() || INITIAL_TASKS_STATE;

  const [state, dispatch] = useReducer(tasksReducer, initialTasks);
  const [tasks, setTasks] = useState(initialTasks);

  // focus when modal is open
  const addTaskRef = useRef(null);

  useEffect(() => {
    // initial get task
    const getTasks = () => {
      if (user) {
        // get data from database
      }
    };
    getTasks();
  }, [user]);

  useEffect(() => {
    // this is for when user is not logged, when logged in
    // make request from the function
    if (!user) {
      console.log("tasks", state);
      setItem(state);
    }
  }, [state]);

  // CRUD for tasks
  // create (should be a dictionary)
  const createTask = (newTask) => {
    if (!user) {
      const id = uuid();
      const task = { ...newTask, id };

      console.log(task);
      dispatch({ type: tasksActions.CREATE_TASK, payload: task });
      // setItem
      // setTasks((prevTasks) => [...prevTasks, task].sort((a) => a.completed));
      console.log("TASK CREATED");
    }
  };

  // update
  const updateTask = (id, updatedValue) => {
    if (!user) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: { id, updatedValue },
      });
      console.log("TASK UPDATED");
    }
  };

  // delete
  const deleteTask = (id) => {
    if (!user) {
      dispatch({ type: tasksActions.DELETE_TASK, payload: { _id: id } });
      // const newTaskList = tasks.filter((task) => task.id !== id);
      // setTasks(newTaskList);
      console.log("TASK DELETED");
    }
  };

  const focus = () => {
    addTaskRef.current.focus();
  };

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

  const markAllTasks = () => {
    if (!user) {
      dispatch({ type: tasksActions.MARK_ALL_TASKS });

      // const newTaskList = tasks.map((task) => {
      //   if (!task.completed) {
      //     return { ...task, completed: true };
      //   }
      //   return task;
      // });

      // setTasks(newTaskList);
      console.log("Marked all tasks");
    }
  };

  const unMarkAllTasks = () => {
    if (!user) {
      dispatch({ type: tasksActions.UNMARK_ALL_TASKS });
      // const newTaskList = tasks.map((task) => {
      //   if (task.completed) {
      //     return { ...task, completed: false };
      //   }
      //   return task;
      // });
      console.log("unmarked all tasks");
      // setTasks(newTaskList);
    }
  };

  const clearAllTasks = () => {
    if (!user) {
      const confirm = window.confirm("Do you want to remove all  tasks?");

      if (!confirm) return;

      dispatch({ type: tasksActions.DELETE_ALL_TASKS });
      console.log("delete all tasks");
    }
  };

  // show or hide complete task toggle
  const toggleHidden = () => {
    if (!user) {
      dispatch({ type: tasksActions.TOGGLE_HIDDEN });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,
        dispatch,
        createTask,
        updateTask,
        deleteTask,
        openAddModal,
        addTaskRef,
        closeAddModal,
        showAddModal,
        // task functions
        markAllTasks,
        unMarkAllTasks,
        clearAllTasks,
        toggleHidden,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
