import "./App.css";

import { ListPages } from "./ListPages";
import { TipoCambio } from "./TipoCambio";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <section className="Pages">
          <ListPages />
        </section>
        <section className="Frame">
          <TipoCambio />
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
