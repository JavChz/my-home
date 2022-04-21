import React, { useState } from "react";
import { PagesService } from "../PagesService";

const AppContext = React.createContext();

function AppProvider(props) {
  // List
  const [list, setList] = useState(PagesService.get());
  const [undo, setUndo] = useState({ name: "", url: "", id: 0 });
  const saveChanges = (list) => {
    PagesService.set(list);
    setList(list);
  };
  // List Manipulation
  const deleteItem = (index) => {
    setUndo(list[index]);
    const newList = list.filter((item, i) => i !== index);
    saveChanges(newList);
  };
  // Modal and Form
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalForm, setModalForm] = useState({ name: "", url: "", id: 0 });

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        saveChanges,
        isModal,
        setIsModal,
        modalForm,
        isEdit,
        setIsEdit,
        setModalForm,
        deleteItem,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
