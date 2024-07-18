import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { Task } from "~/types/utils.type";

interface BoardProps {
  boardId: string;
  boardTitle: string;
  tasks: Task[];
}

const Board: React.FC<BoardProps> = ({ boardId, boardTitle, tasks }) => (
  <Droppable droppableId={boardId}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} className="w-full p-4 rounded-md shadow-md border-dashed border border-gray-200">
        <h2 className="select-none text-lg font-semibold mb-4">{boardTitle}</h2>
        {tasks &&
          tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <TaskItem task={task} />
                </div>
              )}
            </Draggable>
          ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default Board;
