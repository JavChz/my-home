import "./Page.css";

function Page({ name, url }) {
  return (
    <li className="Page">
      <a href={url} target="_blank">
        {name}
      </a>
    </li>
  );
}
export default Page;
