import { BsArrowClockwise, BsFillAlarmFill, BsTrashFill } from "react-icons/bs";
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { BiSolidTimeFive } from "react-icons/bi";
import {
  BEGINNER,
  CUSTOM,
  EXTENDED,
  MEDIUM,
  STANDARD,
} from "./utils/constants";

import bell from "/sounds/bell.mp3";
import digital_alarm from "/sounds/digital_alarm.mp3";
import goofy_car_horn from "/sounds/goofy_car_horn.mp3";
import key_chimes from "/sounds/key_chimes.mp3";
import party_horn from "/sounds/party_horn.mp3";
import tom_and_jerry_scream from "/sounds/tom_and_jerry_scream.mp3";
import train_horn from "/sounds/train_horn.mp3";

export const taskSetting = [
  { id: uuidv4(), icon: <AiFillEyeInvisible />, text: "Hide completed tasks" },
  { id: uuidv4(), icon: <AiFillEye />, text: "Show hidden tasks" },
  { id: uuidv4(), icon: <AiFillCheckCircle />, text: "Mark all tasks" },
  {
    id: uuidv4(),
    icon: <MdOutlineRadioButtonUnchecked />,
    text: "Unmark all tasks",
  },
  {
    id: uuidv4(),
    icon: <BsTrashFill />,
    text: "Clear all tasks",
    priority: true,
  },
];

export const navigationCustomizationSetting = [
  {
    id: uuidv4(),
    icon: <BiSolidTimeFive />,
    note: "Focus level",
    type: "customFocus",
  },
  {
    id: uuidv4(),
    icon: <BsFillAlarmFill />,
    note: "Alarm",
    type: "customAlarm",
  },
  {
    id: uuidv4(),
    icon: <BsArrowClockwise />,
    note: "Auto start",
    type: "autoStart",
  },
];

export const customFocusLevel = {
  title: "Customize focus level",
  choices: [
    {
      id: uuidv4(),
      name: "TEST",
      pomodoro: 1,
      break: 1,
      longBreak: 1,
    },
    {
      id: uuidv4(),
      name: BEGINNER,
      pomodoro: 10,
      break: 5,
      longBreak: 10,
    },
    {
      id: uuidv4(),
      name: STANDARD,
      pomodoro: 25,
      break: 5,
      longBreak: 15,
    },
    ,
    {
      id: uuidv4(),
      name: MEDIUM,
      pomodoro: 40,
      break: 8,
      longBreak: 20,
    },
    {
      id: uuidv4(),
      name: EXTENDED,
      pomodoro: 60,
      break: 10,
      longBreak: 25,
    },
    {
      type: CUSTOM,
      customize: true,
      id: uuidv4(),
      name: CUSTOM,
      slider: [
        { type: "pomodoro", min: 1, max: 60, value: 12 },
        { type: "break", min: 1, max: 60, value: 13 },
        { type: "long break", min: 1, max: 60, value: 14 },
      ],
    },
  ],
};

export const customAlarm = {
  title: "Custom Alarm",
  choices: [
    { id: uuidv4(), name: "bell", music: "bell" },
    { id: uuidv4(), name: "digital alarm", music: "digital_alarm" },
    { id: uuidv4(), name: "goofy car horn", music: "goofy_car_horn" },
    { id: uuidv4(), name: "  key chimes", music: "key_chimes" },
    { id: uuidv4(), name: "party horn", music: "party_horn" },
    {
      id: uuidv4(),
      name: "t&j scream",
      music: "tom_and_jerry_scream",
    },
    { id: uuidv4(), name: "train horn", music: "train_horn" },
  ],
  volume: 50,
};

export const mapper = {
  "long break": "longBreak",
  break: "shortBreak",
  pomodoro: "pomodoro",
  volume: "volume",
};

export const sounds = {
  bell,
  digital_alarm,
  goofy_car_horn,
  key_chimes,
  party_horn,
  tom_and_jerry_scream,
  train_horn,
};
