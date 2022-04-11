import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import "./AddForm.css";
function AddForm(props) {
  let defaultForm
  if (!props) {
    defaultForm = { name: "", url: "" };
  }
  defaultForm = props;
  const { SaveChanges, list } = useContext(AppContext);
  const [addition, setAddition] = useState(defaultForm);
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setAddition({ ...addition, [name]: value });
  };
  const onSubmit = (event) => {
    setAddition({ url: "", name: "" });
    event.preventDefault();
    SaveChanges([...list, addition]);
  };
  return (
    <form onSubmit={onSubmit} className="AddForm">
      <input
        name="name"
        onChange={changeHandler}
        placeholder="Sitio"
        type="text"
        value={addition.name}
      />
      <input
        name="url"
        onChange={changeHandler}
        placeholder="url"
        type="text"
        value={addition.url}
      />
      <input type="submit" value="Agregar" className="Button"/>
    </form>
  );
}

export { AddForm };
