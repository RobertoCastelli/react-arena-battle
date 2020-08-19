import React from "react";
import modalStyle from "./modal.module.css";
import pageDefaultStyle from "./pageDefault.module.css";
import { Link } from "react-router-dom";

const PageDefault = (props) => {
  return (
    <div className={pageDefaultStyle.pageDefaultWrapper}>
      <h3>ERROR 404</h3>
      <p>page not fount at: {props.location.pathname}</p>
      <Link to="/">
        <button className={modalStyle.modalBtnCancel}>HOME</button>
      </Link>
    </div>
  );
};

export default PageDefault;
