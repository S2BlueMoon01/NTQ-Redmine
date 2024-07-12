import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, UniqueIdentifier, DragEndEvent } from "@dnd-kit/core";

interface DraggableItemProps {
  id: UniqueIdentifier;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-blue-500 text-white rounded">
      Draggable {id}
    </div>
  );
};

interface DroppableAreaProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
}

const DroppableArea: React.FC<DroppableAreaProps> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "lightgreen" : "lightgray",
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 rounded">
      {children}
    </div>
  );
};

const DragAndDropContainer: React.FC = () => {
  const [items, setItems] = useState<UniqueIdentifier[]>(["1", "2", "3"]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, active.id);

      setItems(newItems);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DroppableArea id="droppable">
        {items.map((id) => (
          <DraggableItem key={id.toString()} id={id} />
        ))}
      </DroppableArea>
    </DndContext>
  );
};

export default DragAndDropContainer;
