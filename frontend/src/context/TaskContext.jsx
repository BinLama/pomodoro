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

      /* create position */
      let position = 100;
      if (state.tasks.length >= 1) {
        let maxPosition = 100;
        for (const task of state.tasks) {
          console.log("GOT HERE", task.position);
          if (task.position > maxPosition) {
            maxPosition = task.position;
          }
          position = maxPosition + 100;
        }
      }

      const task = { ...newTask, id, position };

      dispatch({ type: tasksActions.CREATE_TASK, payload: task });
      console.log("TASK CREATED not logged in");
      return;
    }

    // if (user) {

    // }
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
      console.log("Marked all tasks");
    }
  };

  const unMarkAllTasks = () => {
    if (!user) {
      dispatch({ type: tasksActions.UNMARK_ALL_TASKS });
      console.log("unmarked all tasks");
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
