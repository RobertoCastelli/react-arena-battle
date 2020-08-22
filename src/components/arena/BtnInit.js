import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";
import { GiBullyMinion } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";

const BtnActions = () => {
  const context = useContext(Context);
  const { setSelectedEnemy, btnDisabled, showRules, restartGame } = context;

  return (
    <div>
      <Title title="Choose your next action" />
      <div className={arenaStyle.arenaButtons}>
        <button
          onClick={setSelectedEnemy}
          className={arenaStyle.arenaBtnConfirm}
          disabled={btnDisabled}
        >
          <GiBullyMinion size={30} />
        </button>
        <button className={arenaStyle.arenaBtnCancel} onClick={restartGame}>
          <VscDebugRestart size={30} />
        </button>
        <button className={arenaStyle.arenaBtnCancel} onClick={showRules}>
          <GiBookCover size={30} />
        </button>
      </div>
    </div>
  );
};

export default BtnActions;
