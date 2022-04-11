import { useContext } from "react";
import { AddForm } from "../AddForm";
import { AppContext } from "../AppContext";
import "./Modal.css";
function Modal() {
	const { isModal, setIsModal } = useContext(AppContext);
  let isVisible = "Modal " + (isModal ? " isVisible" : "isHidden");
  return (
    <div className={isVisible}>
      <div className="Modal__exit" onClick={()=>setIsModal(false)}></div>
      <div className="Modal__form">
        <AddForm  />
      </div>
    </div>
  );
}

export { Modal };
