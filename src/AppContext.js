import React, {useState} from "react";


const AppContext = React.createContext();

function AppProvider(props) {
  const [modal, setModal] = useState(false);
  return <AppContext.Provider value={{modal}}>{props.children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
