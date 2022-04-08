import { useState, useEffect } from "react";
import { PagesService } from "../PagesService";
import "./ListPages.css";
function ListPages() {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };

  const [list, setList] = useState(PagesService.get());
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [addition, setAddition] = useState({});
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

    SaveChanges(dragAndDrop.updatedOrder);
  };
  function SaveChanges(list){
    PagesService.set(list);
    setList(list);
  }
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };
  useEffect(() => { 
    console.log(addition)
  }, [addition, list]);
  const changeHandler = (event) =>{
    const { name, value } = event.target;
    setAddition({ ...addition, [name]: value })
  }
  const onSubmit = (event)=> { 
    event.preventDefault();
    setList([...list, addition]);
  }
  const clearAll = () => {
    SaveChanges([]);
  }
  return (
    <ul className="Pages">
      {list.map((page, index) => {
        return (
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
        );
      })}
      <form onSubmit={onSubmit}>
        <input type="text" onChange={changeHandler} placeholder="Page name" name="name" />
        <input type="text" onChange={changeHandler} placeholder="Url" name="url" />
        <input type="submit" value="Add" />
      </form>
      <button onClick={clearAll}>Clear All</button>
    </ul>
  );
}

export { ListPages };
