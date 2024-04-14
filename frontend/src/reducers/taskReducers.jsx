import { tasksActions } from "../utils/constants";

export const INITIAL_TASKS_STATE = {
  hidden: false,
  showSetting: false,
  tasks: [],
};

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case tasksActions.CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload].sort((a) => a.completed),
      };
    case tasksActions.SET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case tasksActions.UPDATE_TASK:
      const newTaskList = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload.updatedValue };
        }
        return task;
      });
      return {
        ...state,
        tasks: newTaskList.sort((a) => a.completed),
      };
    case tasksActions.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks
          .filter((task) => task.id !== action.payload._id)
          .sort((a) => a.completed),
      };
    case tasksActions.TOGGLE_SETTING:
      return {
        ...state,
        showSetting: !state.showSetting,
      };
    case tasksActions.TOGGLE_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case tasksActions.DELETE_ALL_TASKS:
      return {
        hidden: false,
        tasks: [],
      };
    case tasksActions.MARK_ALL_TASKS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (!task.completed) {
            return { ...task, completed: true };
          }
          return task;
        }),
      };
    case tasksActions.UNMARK_ALL_TASKS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.completed) {
            return { ...task, completed: false };
          }
          return task;
        }),
      };
  }
};
