import { createContext, useState, useRef, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { mergeArrays } from "../utils/utilityFunc";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { INITIAL_TASKS_STATE, tasksReducer } from "../reducers/taskReducers";
import { tasksActions } from "../utils/constants";

import { getAllTasks } from "../api/api-tasks";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { username } = useAuthContext();

  // const [hidden, setHidden] = useState(false);

  // showing add modal
  const [showAddModal, setShowAddModal] = useState(false);

  const { setItem, getItem } = useLocalStorage("taskContext");
  const initialTasks = getItem() || INITIAL_TASKS_STATE;
  const [state, dispatch] = useReducer(tasksReducer, initialTasks);

  // focus when modal is open
  const addTaskRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    // initial get task
    const getTasks = async () => {
      // get data from database
      const tasks = await getAllTasks(signal);

      if (tasks) {
        dispatch({ type: tasksActions.SET_TASKS, payload: tasks });
      }
    };

    if (username) {
      getTasks();
    }

    return () => {
      abortController.abort();
    };
  }, [username]);

  useEffect(() => {
    // used to keep track of tasks and settings when not logged in
    if (!username) {
      console.log("tasks", state);
      setItem(state);
    }
  }, [state]);

  // CRUD for tasks
  // create (should be a dictionary)
  const createTask = (newTask) => {
    if (!username) {
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

    if (username) {
      console.log("Got to create task");
    }
  };

  // update
  const updateTask = (id, updatedValue) => {
    if (!username) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: { id, updatedValue },
      });
      console.log("TASK UPDATED");
    }
  };

  // delete
  const deleteTask = (id) => {
    if (!username) {
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
    if (!username) {
      dispatch({ type: tasksActions.MARK_ALL_TASKS });
      console.log("Marked all tasks");
    }
  };

  const unMarkAllTasks = () => {
    if (!username) {
      dispatch({ type: tasksActions.UNMARK_ALL_TASKS });
      console.log("unmarked all tasks");
    }
  };

  const clearAllTasks = () => {
    if (!username) {
      const confirm = window.confirm("Do you want to remove all  tasks?");

      if (!confirm) return;

      dispatch({ type: tasksActions.DELETE_ALL_TASKS });
      console.log("delete all tasks");
    }
  };

  // show or hide complete task toggle
  const toggleHidden = () => {
    if (!username) {
      dispatch({ type: tasksActions.TOGGLE_HIDDEN });
    }
  };

  // show or hide task setting
  const toggleSetting = () => {
    dispatch({ type: tasksActions.TOGGLE_SETTING });
  };

  console.log("TASK", state);
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
        toggleSetting,
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
