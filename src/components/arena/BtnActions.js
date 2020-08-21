import React from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Link } from "react-router-dom";

const BtnActions = () => {
  return (
    <div>
      <Title title="Action panel" />
      <div className={arenaStyle.arenaButtons}>
        <button className={arenaStyle.arenaBtnConfirm}>ATTACK DEMON</button>
        <button className={arenaStyle.arenaBtnConfirm}>DEFENCE STANCE</button>
        <button className={arenaStyle.arenaBtnConfirm}>REST STANCE</button>
        <button className={arenaStyle.arenaBtnConfirm}>LAST RESORT</button>
        <Link to="/">
          <button className={arenaStyle.arenaBtnCancel}>RESTART GAME</button>
        </Link>
        <button className={arenaStyle.arenaBtnConfirm}>GAME RULES</button>
      </div>
    </div>
  );
};

export default BtnActions;
