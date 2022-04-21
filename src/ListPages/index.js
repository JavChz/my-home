import { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import "./ListPages.css";
function ListPages() {
  const { list, setList, saveChanges, setModalForm, setIsModal, setIsEdit, deleteItem } =
    useContext(AppContext);
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });
    // Note: this is only for Firefox.
    event.dataTransfer.setData("text/html", "");
  };
  const onDragOver = (event) => {
    event.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
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
    saveChanges(dragAndDrop.updatedOrder);
  };
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const editPage = (index) => {
    setModalForm({ ...list[index], id: index });
    setIsEdit(true);
    setIsModal(true);
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
            <a href={page.url}>{page.name}</a>

            <button
              onClick={() => deleteItem(index)}
              className="Pages__buton--delete"
            >
              ✖
            </button>
            <button
              onClick={() => editPage(index)}
              className="Pages__buton--edit"
            >
              ✎
            </button>
            <button className="Pages__buton--move">☰</button>
          </li>
        );
      })}
    </ul>
  );
}

export { ListPages };
