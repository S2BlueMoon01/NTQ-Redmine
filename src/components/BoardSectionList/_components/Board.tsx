import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Block } from "~/types/utils.type";
import BlockItem from "./BlockItem";

interface BoardProps {
  boardId: string;
  blocks: Block[];
}

const Board: React.FC<BoardProps> = ({ boardId, blocks }) => {
  const renderBlocks = () => {
    return blocks.map((block, index) => (
      <Draggable key={block.id} draggableId={block.id} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <BlockItem block={block} />
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-full flex flex-col gap-4 p-4 rounded-md border-dashed border border-gray-200"
        >
          {renderBlocks()}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
