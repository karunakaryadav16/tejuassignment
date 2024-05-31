import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ITEM';

const Item = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ padding: '8px', border: '1px solid gray', marginBottom: '4px' }}>
      {item}
    </div>
  );
};

const SortableList = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {items.map((item, index) => (
          <Item key={item} item={item} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
};

export default SortableList;
