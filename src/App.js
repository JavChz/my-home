import "./App.css";

import {Page} from "./Page";
import { PagesService } from "./PagesService";
import { TipoCambio} from './TipoCambio';

function App() {
  

  const pages = PagesService;
  return (
    <div className="App">
      <section className="Pages">
        {pages.map((page, index) => (
          <Page key={index} {...page} />
        ))}
      </section>
      <section className="Frame">
        <TipoCambio />

      </section>
    </div>
  );
}

export default App;
