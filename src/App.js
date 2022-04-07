import "./App.css";
import Page from "./Page";
import { PagesService } from "./PagesService";

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
        <iframe
          src="https://mainichi.me/"
          width={400}
          height={700}
          crossorigin
        ></iframe>
      </section>
    </div>
  );
}

export default App;
