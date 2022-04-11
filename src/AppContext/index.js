import React, { useState } from "react";
import { PagesService } from "../PagesService";

const AppContext = React.createContext();

function AppProvider(props) {
  const [list, setList] = useState(PagesService.get());
  const SaveChanges = (list) => {
    PagesService.set(list);
    setList(list);
  };
  // Modal and Form
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [modalForm, setModalForm] = useState({name: "", url: ""});

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        SaveChanges,
        isModal,
        setIsModal,
        modalForm,
        isEdit,
        setIsEdit,
        setModalForm,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
