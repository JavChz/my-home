import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import "./AddForm.css";
function AddForm() {
  
  const { saveChanges, list, modalForm, isEdit, setIsModal } = useContext(AppContext);
  const [editing, setEditing] = useState(modalForm);

  useEffect(() => {
    setEditing(modalForm);
  }, [modalForm]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setEditing({ ...editing, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      let newList = list;
      newList[editing.id] = editing;
      delete newList[editing.id].id;
      saveChanges(newList);
      setIsModal(false);
    } else {
      setEditing({ url: "", name: "" });
      saveChanges([...list, editing]);
      setIsModal(false);
    }
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
      <input
        type="submit"
        value={isEdit ? "Editar" : "Agregar"}
        className="Button"
      />
    </form>
  );
}

export { AddForm };
