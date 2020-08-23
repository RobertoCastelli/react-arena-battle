import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";
import { GiPointySword } from "react-icons/gi";
import { GiSurroundedShield } from "react-icons/gi";
import { GiArmBandage } from "react-icons/gi";
import { GiAchillesHeel } from "react-icons/gi";
import { GiBookCover } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";

const BtnActions = () => {
  const context = useContext(Context);
  const {
    enemy,
    player,
    showRules,
    restartGame,
    playerAttackSequence,
    playerLastResort,
    activePlayerShield,
    playerRest,
  } = context;
  return (
    <div>
      <Title title="Action panel" />
      <div className={arenaStyle.arenaButtons}>
        <button
          className={arenaStyle.arenaBtnConfirm}
          onClick={() => playerAttackSequence(enemy, player[0])}
        >
          <GiPointySword size={30} />
        </button>
        <button
          className={arenaStyle.arenaBtnConfirm}
          onClick={() => activePlayerShield(enemy, player[0])}
        >
          <GiSurroundedShield size={30} />
        </button>
        <button
          className={arenaStyle.arenaBtnConfirm}
          onClick={() => playerRest(enemy, player[0])}
        >
          <GiArmBandage size={30} />
        </button>
        <button
          className={arenaStyle.arenaBtnConfirm}
          onClick={() => playerLastResort(enemy, player[0])}
        >
          <GiAchillesHeel size={30} />
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
