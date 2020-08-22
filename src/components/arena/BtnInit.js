import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";
import { GiBullyMinion } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";

const BtnActions = () => {
  const context = useContext(Context);

  return (
    <div>
      <Title title="Choose your next action" />
      <div className={arenaStyle.arenaButtons}>
        <button
          onClick={context.setSelectedEnemy}
          className={arenaStyle.arenaBtnConfirm}
        >
          <GiBullyMinion size={30} />
        </button>
        <button
          className={arenaStyle.arenaBtnCancel}
          onClick={context.restartGame}
        >
          <VscDebugRestart size={30} />
        </button>
        <button
          className={arenaStyle.arenaBtnCancel}
          onClick={context.showRules}
        >
          <GiBookCover size={30} />
        </button>
      </div>
    </div>
  );
};

export default BtnActions;
