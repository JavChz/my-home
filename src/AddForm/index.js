import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import "./AddForm.css";
function AddForm() {
  const { modalForm, isEdit, setIsEdit } = useContext(AppContext);

  const [editing, setEditing] = useState(modalForm);
  const { SaveChanges, list } = useContext(AppContext);
  
  useEffect(() => {
    setEditing(modalForm);
    console.log(editing)
  },[modalForm]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setEditing({ ...editing, [name]: value });
  };
  const onSubmit = (event) => {
    if (isEdit) {
      event.preventDefault();
      //SaveChanges([...list, editing]);
      
    }
    setEditing({ url: "", name: "" });
    event.preventDefault();
    SaveChanges([...list, editing]);
  };
  return (
    <form onSubmit={onSubmit} className="AddForm">
      <input
        name="name"
        onChange={changeHandler}
        placeholder="Sitio"
        type="text"
        value={editing.name}
      />
      <input
        name="url"
        onChange={changeHandler}
        placeholder="url"
        type="text"
        value={editing.url}
      />
      <input type="submit" value="Agregar" className="Button" />
    </form>
  );
}

export { AddForm };
