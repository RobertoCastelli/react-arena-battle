import React, { useContext } from "react";
import modalStyle from "./modal.module.css";
import { Context } from "../context";
import { Link } from "react-router-dom";

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
            <ul>
              <li>
                <b>race:</b> {race}
              </li>
              <li>
                <b>class:</b> {classe}
              </li>
              <li>
                <b>skill:</b> {description}
              </li>
            </ul>
          </div>
          <div className={modalStyle.modalButtons}>
            <Link to="/arena">
              <button
                onClick={() => context.closeModal()}
                className={modalStyle.modalBtnConfirm}
              >
                SELECT
              </button>
            </Link>
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
