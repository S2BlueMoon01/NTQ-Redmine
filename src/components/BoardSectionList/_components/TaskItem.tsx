import React from "react";
import { Task } from "~/types/utils.type";

type TaskItemProps = {
  task: Task;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return <div className="bg-white p-4 rounded shadow select-none">{task.title}</div>;
};

export default TaskItem;
