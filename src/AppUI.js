import { useContext } from "react";
import { ListPages } from "./ListPages";
import { Modal } from "./Modal";
import { AppContext } from "./AppContext";
import { WidgetExchangeRate } from "./WidgetExchangeRate";
function AppUI() {
  const { setIsModal } = useContext(AppContext);
  return (
    <>
      <div className="App">
        <section className="ListPages">
          <ListPages />
        </section>
        <section className="Frame">
          <WidgetExchangeRate />
          <button onClick={() => setIsModal(true)} className="Button">
            Agregar Nuevo Sitio
          </button>
        </section>
      </div>
      <Modal />
    </>
  );
}

export { AppUI };
