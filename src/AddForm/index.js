import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

function AddForm() {
	const defaultForm = {name: "", url: ""}
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
    <form onSubmit={onSubmit}>
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
      <input type="submit" value="Add" className="Add__button" />
    </form>
  );
}

export { AddForm };
