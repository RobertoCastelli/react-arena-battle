import React from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";

const BtnActions = () => {
  return (
    <div>
      <Title title="Choose your move" />
      <div className={arenaStyle.arenaButtons}>
        <button className={arenaStyle.arenaBtnConfirm}>SUMMON DEMON</button>
        <button className={arenaStyle.arenaBtnCancel}>RESTART GAME</button>
        <button className={arenaStyle.arenaBtnConfirm}>GAME RULES</button>
      </div>
    </div>
  );
};

export default BtnActions;
