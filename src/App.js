
import './App.css';
import Page from './Page';

function App() {
  const pages = [
    {name: "Platzi", url: "https://platzi.com"},
    {name: "Crehana", url: "https://crehana.com"},
    {name: "Notion", url: "https://notion.so"},
    {name: "Clockify", url: "https://clockify.me"},
  ]
  return (
    <div className="App">
      <section className='Pages'>
        {pages.map((page, index) => <Page key={index} {...page} />)}
      </section>
      <section className='Frame'>
        <iframe src='https://mainichi.me/' width={400} height={700} crossorigin></iframe>
      </section>
    </div>
  );
}

export default App;
