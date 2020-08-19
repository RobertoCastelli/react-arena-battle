import React, { useContext } from "react";
import modalStyle from "./modal.module.css";
import { Context } from "../context";

const Modal = () => {
  const context = useContext(Context);
  const { name, race, classe, icon, description } = context.modal[0];

  if (!context.modalState) {
    return null;
  } else {
    return (
      <div className={modalStyle.modalWrapper}>
        <div className={modalStyle.modalContent}>
          <div className={modalStyle.modalBody}>
            <img src={icon} alt="champion-img" />
            <h3>{name}</h3>
            <p>race: {race}</p>
            <p>class: {classe}</p>
            <p>skill: {description}</p>
          </div>
          <div className={modalStyle.modalButtons}>
            <button className={modalStyle.modalBtnConfirm}>CONFIRM</button>
            <button
              onClick={() => context.closeModal()}
              className={modalStyle.modalBtnCancel}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
