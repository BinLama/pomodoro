import { createContext, useState, useRef, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { mergeArrays } from "../utils/utilityFunc";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { INITIAL_TASKS_STATE, tasksReducer } from "../reducers/taskReducers";
import { tasksActions } from "../utils/constants";

import {
  createSingleTask,
  deleteSingleTask,
  getAllTasks,
  updateSingleTask,
} from "../api/api-tasks";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const { username } = useAuthContext();

  // const [hidden, setHidden] = useState(false);

  // showing add modal
  const [showAddModal, setShowAddModal] = useState(false);

  const { setItem, getItem } = useLocalStorage("taskContext");
  const initialTasks = username
    ? INITIAL_TASKS_STATE
    : getItem() || INITIAL_TASKS_STATE;
  const [state, dispatch] = useReducer(tasksReducer, initialTasks);

  // focus when modal is open
  const addTaskRef = useRef(null);

  /**
   * Get tasks when user is logged in
   */
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // getting all tasks
    const getTasks = async () => {
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

  /**
   * Storing tasks to local storage when not logged in.
   */
  useEffect(() => {
    if (!username) {
      console.log("tasks", state);
      setItem(state);
    }
  }, [state]);

  // CRUD for tasks
  /**
   * Create task
   * @param {object} newTask information required to create tasks, such as: title and note
   *
   */
  const createTask = async (newTask) => {
    if (!username) {
      const id = uuid();

      /* create position */
      let position = 100;
      if (state.tasks.length >= 1) {
        let maxPosition = 100;
        for (const task of state.tasks) {
          if (task.position > maxPosition) {
            maxPosition = task.position;
          }
          position = maxPosition + 100;
        }
      }

      const task = { ...newTask, id, position, completed: false };

      dispatch({ type: tasksActions.CREATE_TASK, payload: task });
      console.log("task created (localStorage)");
      return;
    }

    if (username) {
      const task = await createSingleTask(newTask);

      dispatch({ type: tasksActions.CREATE_TASK, payload: task });
      console.log("task created");
    }
  };

  // update
  const updateTask = async (id, updatedValue) => {
    if (!username) {
      dispatch({
        type: tasksActions.UPDATE_TASK,
        payload: { id, updatedValue },
      });
      console.log("TASK UPDATED");
      return;
    }

    if (username) {
      const task = await updateSingleTask({ taskId: id }, updatedValue);

      if (task) {
        dispatch({
          type: tasksActions.UPDATE_TASK,
          payload: { id: task.id, updatedValue: task },
        });
      }
    }
  };

  // delete
  const deleteTask = async (id) => {
    if (!username) {
      dispatch({ type: tasksActions.DELETE_TASK, payload: { id } });
      console.log("TASK DELETED");
      return;
    }

    if (username) {
      const task = await deleteSingleTask({ taskId: id });

      if (task) {
        dispatch({
          type: tasksActions.DELETE_TASK,
          payload: { id },
        });
      }
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

  const markAllTasks = async () => {
    if (!username) {
      dispatch({ type: tasksActions.MARK_ALL_TASKS });
      console.log("Marked all tasks");
    }

    if (username) {
      for (const task of state.tasks) {
        console.log(task);
        if (task.completed === false) {
          await updateSingleTask({ taskId: task.id }, { completed: true });
        }
      }

      dispatch({ type: tasksActions.MARK_ALL_TASKS });
    }
  };

  const unMarkAllTasks = async () => {
    if (!username) {
      dispatch({ type: tasksActions.UNMARK_ALL_TASKS });
      console.log("unmarked all tasks");
    }

    if (username) {
      for (const task of state.tasks) {
        console.log(task);
        if (task.completed === true) {
          await updateSingleTask({ taskId: task.id }, { completed: false });
        }
      }

      dispatch({ type: tasksActions.UNMARK_ALL_TASKS });
    }
  };

  const clearAllTasks = async () => {
    if (!username) {
      const confirm = window.confirm("Do you want to remove all  tasks?");

      if (!confirm) return;

      dispatch({ type: tasksActions.DELETE_ALL_TASKS });
      console.log("delete all tasks");
    }

    if (username) {
      for (const task of state.tasks) {
        await deleteSingleTask({ taskId: task.id });
      }

      dispatch({ type: tasksActions.DELETE_ALL_TASKS });
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
