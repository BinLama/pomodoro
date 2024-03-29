// Pomodoro status
const SHORTBREAK = "shortBreak";
const POMODORO = "pomodoro";
const LONGBREAK = "longBreak";

// TODO change to 60
const SECONDS = 3;

// Task modal notes auto height change
const SCROLLHEIGHT = 50;

// Setting
const CUSTOM = "custom";
const BEGINNER = "beginner";
const STANDARD = "standard";
const MEDIUM = "medium";
const EXTENDED = "extended";

// Action Type
const CREATE = "create";
const UPDATE = "update";
const DELETE = "delete";

const pomodoroReducerActions = {
  TOGGLE_SETTING: "TOGGLE_SETTING",
  HIDE_SETTING: "HIDE_SETTING",
  UPDATE_TIMER: "UPDATE_TIMER",
  PLAY_AUDIO: "PLAY_AUDIO",
  CHANGE_VOLUME: "CHANGE_VOLUME",
  CHANGE_MUSIC: "CHANGE_MUSIC",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  TOGGLE_autoBreak: "TOGGLE_autoBreak",
  TOGGLE_AUTO_POMO: "TOGGLE_AUTO_POMO",
  SKIP_TO_BREAK: "SKIP_TO_BREAK",
  SKIP_TO_POMO: "SKIP_TO_POMO",
  ACTIVE_SESSION: "ACTIVE_SESSION",
  INACTIVE_SESSION: "INACTIVE_SESSION",
  GET_USER_POMO_DATA: "GET_USER_POMO_DATA",
  TOGGLE_AUTO_POMO_SUCCESS: "TOGGLE_AUTO_POMO_SUCCESS",
  TOGGLE_autoBreak_SUCCESS: "TOGGLE_autoBreak_SUCCESS",
};

const tasksActions = {
  SET_TASKS: "SET_TASKS",
  CREATE_TASK: "CREATE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_HIDDEN: "TOGGLE_HIDDEN",
  DELETE_ALL_TASKS: "DELETE_ALL_TASKS",
  MARK_ALL_TASKS: "MARK_ALL_TASKS",
  UNMARK_ALL_TASKS: "UNMARK_ALL_TASKS",
};

const auth = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
};

export {
  pomodoroReducerActions,
  tasksActions,
  SHORTBREAK,
  LONGBREAK,
  POMODORO,
  SCROLLHEIGHT,
  CUSTOM,
  BEGINNER,
  STANDARD,
  MEDIUM,
  EXTENDED,
  CREATE,
  UPDATE,
  DELETE,
  SECONDS,
  auth,
};
