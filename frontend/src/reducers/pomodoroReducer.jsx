import { customFocusLevel, sounds } from "../data";
import { pomodoroReducerActions } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

// Initial pomodoro state with default values
export const INITIAL_POMODORO_STATE = {
  id: uuidv4(),
  // keep track of the setting change
  // pomodoro should call the value and change it.
  chosen: {
    data: customFocusLevel.choices[1].name,
    newTimer: {
      pomodoro: customFocusLevel.choices[1].pomodoro,
      shortBreak: customFocusLevel.choices[1].shortBreak,
      longBreak: customFocusLevel.choices[1].longBreak,
    },
  },

  sliderData: {
    customStudyTime: customFocusLevel.choices[5].slider[0].value,
    customRelaxTime: customFocusLevel.choices[5].slider[1].value,
    customLongRelaxTime: customFocusLevel.choices[5].slider[2].value,
  },

  // Sets up what named music to play
  studyStartSound: "bell",

  // music to play when resting
  restStartSound: "digital_alarm",

  // Sets up the audio to be played when study timer ends
  audio: new Audio(sounds["bell"]),

  // for when rest starts
  restAudio: new Audio(sounds["digital_alarm"]),
  // controls alarm volume
  volume: 20,

  // controls mute and unmute of volume
  mute: false,

  // controls auto start pomodoro
  autoPomo: false,

  // controls auto start break
  autoBreak: false,
  longRelaxInterval: 4,
  maxSession: 10,
  changeToBreak: 0,
  changeToPomo: 0,
  timerActive: false,
  showSetting: false,
  showLogin: false,
};

export const pomodoroReducer = (state, action) => {
  switch (action.type) {
    case pomodoroReducerActions.GET_USER_POMO_DATA:
      const music = new Audio(sounds[action.payload.studyStartSound]);
      music.volume = action.payload.volume / 100;
      return {
        ...action.payload,
        audio: music,
      };
    case pomodoroReducerActions.TOGGLE_SETTING:
      return {
        ...state,
        showSetting: !state.showSetting,
      };
    case pomodoroReducerActions.TOGGLE_LOGIN:
      return {
        ...state,
        showLogin: !state.showLogin,
      };
    case pomodoroReducerActions.HIDE_SETTING:
      console.log("hide setting");
      return {
        ...state,
        showSetting: false,
      };
    case pomodoroReducerActions.SHOW_SETTING:
      console.log("show setting");
      return {
        ...state,
        showSetting: true,
      };
    case pomodoroReducerActions.UPDATE_TIMER:
      return {
        ...state,
        chosen: action.payload,
      };
    case pomodoroReducerActions.SET_SLIDER_DATA:
      return {
        ...state,
        sliderData: {
          ...state.sliderData,
          [action.payload.name]: action.payload.value,
        },
      };
    case pomodoroReducerActions.SET_SESSION_DATA:
      return {
        ...state,
        maxSession: action.payload.value,
      };
    case pomodoroReducerActions.PLAY_AUDIO:
      return {
        ...state,
        audio: action.payload.audio,
        studyStartSound: action.payload.music,
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
        studyStartSound: action.payload,
      };
    case pomodoroReducerActions.TOGGLE_MUTE:
      return {
        ...state,
        mute: !state.mute,
      };
    case pomodoroReducerActions.TOGGLE_AUTOBREAK:
      return {
        ...state,
        autoBreak: !state.autoBreak,
      };
    case pomodoroReducerActions.TOGGLE_AUTO_POMO:
      return {
        ...state,
        autoPomo: !state.autoPomo,
      };
    case pomodoroReducerActions.TOGGLE_AUTO_POMO_SUCCESS:
      return {
        ...state,
        autoPomo: action.payload.autoPomo,
      };

    case pomodoroReducerActions.TOGGLE_AUTOBREAK_SUCCESS:
      return {
        ...state,
        autoBreak: action.payload.autoBreak,
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
