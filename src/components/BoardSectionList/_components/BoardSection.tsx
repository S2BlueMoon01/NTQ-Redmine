import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";
import TaskItem from "./TaskItem";
import { Task } from "~/types/utils.type";

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const BoardSection = ({ id, title, tasks }: BoardSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="w-full p-4 rounded-md shadow-md border-dashed border border-gray-200">
      <h2 className="select-none text-lg font-semibold mb-4">{title}</h2>
      <SortableContext id={id} items={tasks} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default BoardSection;
