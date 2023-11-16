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
  UPDATE_TIMER: "UPDATE_TIMER",
  PLAY_AUDIO: "PLAY_AUDIO",
  CHANGE_VOLUME: "CHANGE_VOLUME",
  CHANGE_MUSIC: "CHANGE_MUSIC",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  TOGGLE_AUTO_BREAK: "TOGGLE_AUTO_BREAK",
  TOGGLE_AUTO_POMO: "TOGGLE_AUTO_POMO",
  SKIP_TO_BREAK: "SKIP_TO_BREAK",
  SKIP_TO_POMO: "SKIP_TO_POMO",
  ACTIVE_SESSION: "ACTIVE_SESSION",
  INACTIVE_SESSION: "INACTIVE_SESSION",
  GET_USER_POMO_DATA: "GET_USER_POMO_DATA",
};

const auth = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
};

export {
  pomodoroReducerActions,
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
