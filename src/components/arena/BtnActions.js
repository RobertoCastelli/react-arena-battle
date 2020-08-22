import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import Title from "../Title";
import { Context } from "../../context";
import { GiPointySword } from "react-icons/gi";
import { GiSurroundedShield } from "react-icons/gi";
import { GiArmBandage } from "react-icons/gi";
import { GiAchillesHeel } from "react-icons/gi";
import { FaRegFlag } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { VscDebugRestart } from "react-icons/vsc";

const BtnActions = () => {
  const context = useContext(Context);
  const { enemy, player } = context;
  return (
    <div>
      <Title title="Action panel" />
      <div className={arenaStyle.arenaButtons}>
        <button
          onClick={() => context.playerAttackSequence(enemy, player[0])}
          className={arenaStyle.arenaBtnConfirm}
        >
          <GiPointySword size={30} />
        </button>
        <button className={arenaStyle.arenaBtnConfirm}>
          <GiSurroundedShield size={30} />
        </button>
        <button className={arenaStyle.arenaBtnConfirm}>
          <GiArmBandage size={30} />
        </button>
        <button className={arenaStyle.arenaBtnConfirm}>
          <GiAchillesHeel size={30} />
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
