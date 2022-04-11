import { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import "./AddForm.css";
function AddForm() {
  const { modalForm, isEdit, setIsModal } = useContext(AppContext);

  const [editing, setEditing] = useState(modalForm);
  const { SaveChanges, list } = useContext(AppContext);

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
      SaveChanges(newList);
      setIsModal(false);
    } else {
      setEditing({ url: "", name: "" });
      SaveChanges([...list, editing]);
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
