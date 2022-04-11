import { AddForm } from "../AddForm";

import "./Modal.css";
function Modal({ isModal, changeIsModal, form }) {
  let isVisible = "Modal " + (isModal ? " isVisible" : "isHidden");
  return (
    <div className={isVisible}>
      <div className="Modal__exit" onClick={changeIsModal}></div>
      <div className="Modal__form">
        <AddForm form={form} />
      </div>
    </div>
  );
}

export { Modal };
