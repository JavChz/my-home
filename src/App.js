import "./App.css";

import { ListPages } from "./ListPages";
import { Modal } from "./Modal";
import { useState } from "react";
import { WidgetExchangeRate } from "./WidgetExchangeRate";
import { AppProvider } from "./AppContext";

function App() {
  const [isModal, setIsModal] = useState(false);
  const changeIsModal = (form) => {
    modalProps = { ...modalProps, form };
    setIsModal(!isModal);
  };
  let modalProps = { isModal, changeIsModal };
  return (
    <AppProvider>
      <div className="App">
        <section className="ListPages">
          <ListPages />
        </section>
        <section className="Frame">
          <WidgetExchangeRate />

          <button onClick={changeIsModal} className="Button">
            Agregar Nuevo Sitio
          </button>
        </section>
      </div>
      <Modal {...modalProps} />
    </AppProvider>
  );
}

export default App;
