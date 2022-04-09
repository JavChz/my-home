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
    event.dataTransfer.setData("text/html", "");
  };
  const onDragOver = (event) => {
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
  const SaveChanges = (list) => {
    PagesService.set(list);
    setList(list);
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
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };
  useEffect(() => {
    console.log(addition);
  }, [addition, list]);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setAddition({ ...addition, [name]: value });
  };
  const onSubmit = (event) => {
    setAddition({ url: "", name: "" });
    event.preventDefault();
    SaveChanges([...list, addition]);
  };
  const clearAll = () => {
    SaveChanges([]);
  };
  const deletePage = (index) => {
    const newList = list.filter((item, i) => i !== index);
    SaveChanges(newList);
  };
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

            <button onClick={() => deletePage(index)}>✖</button>
            <button className="Pages__move">☰</button>
          </li>
        );
      })}
      <form onSubmit={onSubmit}>
        <input
          name="name"
          onChange={changeHandler}
          placeholder="Page name"
          type="text"
          value={addition.name}
        />
        <input
          name="url"
          onChange={changeHandler}
          placeholder="url"
          type="text"
          value={addition.url}
        />
        <input type="submit" value="Add" className="Add__button"/>
      </form>
      {/* <button onClick={clearAll}>Clear All</button> */}
    </ul>
  );
}

export { ListPages };
