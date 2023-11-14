import { customFocusLevel, sounds } from "../data";
import { pomodoroReducerActions } from "../utils/constants";

export const INITIAL_POMODORO_STATE = {
  // keep track of the setting change
  // pomodoro should call the value and change it.
  chosen: {
    data: customFocusLevel.choices[1].name,
    newTimer: {
      pomodoro: customFocusLevel.choices[1].pomodoro,
      break: customFocusLevel.choices[1].break,
      longBreak: customFocusLevel.choices[1].longBreak,
    },
  },

  // Sets up what named music to play
  chosenMusic: "bell",

  // Sets up the audio to be played when timer ends
  audio: new Audio(sounds["bell"]),

  // controls alarm volume
  volume: 10,

  // controls mute and unmute of volume
  mute: false,

  // controls auto start pomodoro
  autoPomo: false,

  // controls auto start break
  autoBreak: false,
  longRelaxInterval: 4,
  changeToBreak: 0,
  changeToPomo: 0,
  showSetting: false,
  timerActive: false,
};

export const pomodoroReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_POMO_DATA":
      return action.payload;
    case pomodoroReducerActions.TOGGLE_SETTING:
      return {
        ...state,
        showSetting: !state.showSetting,
      };
    case pomodoroReducerActions.UPDATE_TIMER:
      return {
        ...state,
        chosen: action.payload,
      };
    case pomodoroReducerActions.PLAY_AUDIO:
      return {
        ...state,
        audio: action.payload.audio,
        chosenMusic: action.payload.music,
      };
    case pomodoroReducerActions.CHANGE_VOLUME:
      return {
        ...state,
        volume: action.payload,
      };
    case pomodoroReducerActions.CHANGE_MUSIC:
      return {
        ...state,
        mute: false,
        chosenMusic: action.payload,
      };
    case pomodoroReducerActions.TOGGLE_MUTE:
      return {
        ...state,
        mute: !state.mute,
      };
    case pomodoroReducerActions.TOGGLE_AUTO_BREAK:
      return {
        ...state,
        autoBreak: !state.autoBreak,
      };
    case pomodoroReducerActions.TOGGLE_AUTO_POMO:
      return {
        ...state,
        autoPomo: !state.autoPomo,
      };
    case pomodoroReducerActions.SKIP_TO_BREAK:
      return {
        ...state,
        changeToBreak: state.changeToBreak + 1,
      };
    case pomodoroReducerActions.SKIP_TO_POMO:
      return {
        ...state,
        changeToPomo: state.changeToPomo + 1,
      };

    case pomodoroReducerActions.INACTIVE_SESSION:
      return {
        ...state,
        timerActive: false,
      };
    case pomodoroReducerActions.ACTIVE_SESSION:
      return {
        ...state,
        timerActive: true,
      };
    default:
      return state;
  }
};
