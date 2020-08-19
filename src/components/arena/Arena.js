import React from "react";
import modalStyle from "../../components/modal.module.css";
import arenaStyle from "./arena.module.css";
import ArenaImage from "./ArenaImage";
import ArenaPlayer from "./ArenaPlayer";
import ArenaScore from "./ArenaScore";
import ArenaEnemy from "./ArenaEnemy";

const Arena = () => {
  return (
    <div>
      <div className={arenaStyle.arenaWrapper}>
        <div className={arenaStyle.arenaContent}>
          <div className={arenaStyle.arenaActions}>
            <button className={modalStyle.modalBtnConfirm}>ACTION</button>
            <button className={modalStyle.modalBtnConfirm}>ACTION</button>
            <button className={modalStyle.modalBtnConfirm}>ACTION</button>
            <button className={modalStyle.modalBtnConfirm}>ACTION</button>
            <button className={modalStyle.modalBtnCancel}>ACTION</button>
            <button className={modalStyle.modalBtnConfirm}>ACTION</button>
          </div>
          <ArenaImage />
          <div className={arenaStyle.arenaDisplay}>
            <ArenaPlayer />
            <ArenaScore />
            <ArenaEnemy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
