import React from "react";
import modalStyle from "./modal.module.css";

const Modal = (props) => {
  return (
    <div className={modalStyle.modalWrapper}>
      <div className={modalStyle.modalContent}>
        <div className={modalStyle.modalBody}>
          <img src="https://via.placeholder.com/100" alt="champion-img" />
          <h3>name: {props.name}</h3>
          <p>race: {props.race}</p>
          <p>class: {props.classe}</p>
          <p>description: {props.description}</p>
        </div>
        <div className={modalStyle.modalButtons}>
          <button className={modalStyle.modalBtnConfirm}>CONFIRM</button>
          <button className={modalStyle.modalBtnCancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
