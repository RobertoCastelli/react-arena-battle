import React from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";

const BtnActions = () => {
  const context = useContext(Context);

  return (
    <div>
      <Title title="Action panel" />
      <div className={arenaStyle.arenaButtons}>
        <button className={arenaStyle.arenaBtnConfirm}>ATTACK DEMON</button>
        <button className={arenaStyle.arenaBtnConfirm}>DEFENCE STANCE</button>
        <button className={arenaStyle.arenaBtnConfirm}>REST STANCE</button>
        <button className={arenaStyle.arenaBtnConfirm}>LAST RESORT</button>
        <button
          className={arenaStyle.arenaBtnCancel}
          onClick={context.restartGame}
        >
          RESTART GAME
        </button>
        <button
          className={arenaStyle.arenaBtnConfirm}
          onClick={context.showRules}
        >
          GAME RULES
        </button>
      </div>
    </div>
  );
};

export default BtnActions;
