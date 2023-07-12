import { dataType, selectType, valType } from "@/types/types";


export const data : dataType[] = [
    {
      id:1,
      task_name: "coding alx task",
      status: "todo",
    },
    {
      id:2,
      task_name: "learning typescript",
      status: "ongoing",
    },
    {
      id:3,
      task_name: "learning typescript",
      status: "ongoing",
    },
  ];
  
export   const status: selectType[] = [
    { opt: "Todo", value: "todo" },
    { opt: "On going", value: "ongoing" },
    { opt: "Done", value: "done" },
  ];
  
export const values: valType = {
    task_name: "",
    status: "",
  };
  