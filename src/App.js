import "./App.css";

import { ListPages } from "./ListPages";
import { AddForm } from "./AddForm";
import { WidgetExchangeRate } from "./WidgetExchangeRate";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <section className="ListPages">
          <ListPages />
        </section>
        <section className="Frame">
          <WidgetExchangeRate />
          <div className="Widget">
          <div className="Widget__title">
            Agrega nuevo sitio
            </div>
            <div className="Widget__body">
            <AddForm />
            </div>
          </div>
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
