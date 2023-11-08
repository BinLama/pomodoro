import { BsArrowClockwise, BsFillAlarmFill, BsTrashFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { BiSolidTimeFive } from "react-icons/bi";
import {
  BEGINNER,
  CUSTOM,
  EXTENDED,
  MEDIUM,
  STANDARD,
} from "./utils/constants";

export const taskSetting = [
  { id: uuidv4(), icon: <BsTrashFill />, text: "Clear finished tasks" },
  { id: uuidv4(), icon: <AiFillCheckCircle />, text: "Mark all tasks" },
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
        { type: "pomodoro", min: 1, max: 60, value: 15 },
        { type: "break", min: 1, max: 60, value: 15 },
        { type: "long break", min: 1, max: 60, value: 15 },
      ],
    },
  ],
};
