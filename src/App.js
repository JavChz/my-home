import "./App.css";

import { ListPages} from './ListPages';
import { TipoCambio} from './TipoCambio';

function App() {

  return (
    <div className="App">
      <section className="Pages">
        <ListPages />
      </section>
      <section className="Frame">
        <TipoCambio />

      </section>
    </div>
  );
}

export default App;
