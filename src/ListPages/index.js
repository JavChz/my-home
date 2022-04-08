import { useState, useEffect } from "react";
import { Page } from "../Page";
import { PagesService } from "../PagesService";
function ListPages() {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };

  const [list, setList] = useState(PagesService);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  // onDragStart fires when an element
  // starts being dragged
  const onDragStart = (event) => {
    console.log(event);
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });
    console.log(dragAndDrop);
    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", "");
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
    console.log(list)
    localStorage.setItem("PagesService_V1",  JSON.stringify(dragAndDrop.updatedOrder));
    console.log(localStorage.getItem("PagesService_V1"));
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };



  return list.map((page, index) => {
    return (
      <ul className="Pages">
        <li
          draggable="true"
          key={index}
          data-position={index}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          className={
            dragAndDrop && dragAndDrop.draggedTo === Number(index)
              ? "dropArea Page"
              : "Page"
          }
        >
            <a href={page.url} target="_blank">
              {page.name}
            </a>
            <strong>☰</strong>
          
        </li>
      </ul>
    );
  });
}

export { ListPages };
