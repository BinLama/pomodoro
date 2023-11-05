import { BsTrashFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

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
