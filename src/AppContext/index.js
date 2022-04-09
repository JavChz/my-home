import React, { useState } from "react";
import { PagesService } from "../PagesService";

const AppContext = React.createContext();

function AppProvider(props) {
  const [modal, setModal] = useState(false);
  const [list, setList] = useState(PagesService.get());
  const SaveChanges = (list) => {
    PagesService.set(list);
    setList(list);
  };
  // form

  return (
    <AppContext.Provider
      value={{ list, setList, SaveChanges, modal, setModal }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
