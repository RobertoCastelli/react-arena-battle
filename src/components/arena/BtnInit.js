import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";

const BtnActions = () => {
  const context = useContext(Context);

  return (
    <div>
      <Title title="Choose your next action" />
      <div className={arenaStyle.arenaButtons}>
        <button className={arenaStyle.arenaBtnConfirm}>SUMMON DEMON</button>
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
