import { BsArrowClockwise, BsFillAlarmFill, BsTrashFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { BiSolidTimeFive } from "react-icons/bi";

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
  },
  {
    id: uuidv4(),
    icon: <BsFillAlarmFill />,
    note: "Alarm",
  },
  {
    id: uuidv4(),
    icon: <BsArrowClockwise />,
    note: "Auto start",
  },
];

export const customFocusLevel = {
  note: "Customize focus level",
  choices: [
    {
      id: uuidv4(),
      name: "Beginner",
      pomodoro: 10,
      break: 5,
      longBreak: 10,
    },
    {
      id: uuidv4(),
      name: "Standard",
      pomodoro: 25,
      break: 5,
      longBreak: 15,
    },
    ,
    {
      id: uuidv4(),
      name: "Medium",
      pomodoro: 40,
      break: 8,
      longBreak: 20,
    },
    {
      id: uuidv4(),
      name: "Extended",
      pomodoro: 60,
      break: 10,
      longBreak: 25,
    },
    {
      type: "custom",
      id: uuidv4(),
      name: "Custom",
      pomodoro: 15,
      break: 5,
      longBreak: 10,
    },
  ],
};
