import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import { Context } from "../../context";

const ArenaScore = () => {
  const context = useContext(Context);
  const { score, level, playerLog, enemyLog } = context;

  return (
    <div>
      <div className={arenaStyle.arenaScoreWrapper}>
        <dialog>{score}</dialog>
        <div className={arenaStyle.arenaScoreLevel}>
          <h4>LEVEL</h4>
          <div id="arenaScoreNumber" className={arenaStyle.arenaScoreNumber}>
            {level}
          </div>
        </div>
        <div className={arenaStyle.arenaScoreInfo}>
          <h4>INFO</h4>
          <p id="arenaScoreInfoText">Summon a Demon</p>
        </div>
        <div className={arenaStyle.arenaScoreLogs}>
          <h4>LOGS</h4>
          <div>{playerLog}</div>
          <div>{enemyLog}</div>
        </div>
      </div>
    </div>
  );
};

export default ArenaScore;
