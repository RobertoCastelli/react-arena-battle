import React from "react";
import arenaStyle from "./arena.module.css";

const ArenaScore = () => {
  return (
    <div>
      <div className={arenaStyle.arenaScoreWrapper}>
        <div className={arenaStyle.arenaScoreLevel}>
          <h3>ARENA LEVEL</h3>
          <div className={arenaStyle.arenaScoreNumber}>0</div>
        </div>
        <div className={arenaStyle.arenaScoreInfo}>
          <h3>ARENA INFO</h3>
          <p>prova testo</p>
        </div>
        <div className={arenaStyle.arenaScoreLogs}>
          <h3>COMBAT LOGS</h3>
          <div>player hit</div>
          <div>enemy hit</div>
        </div>
      </div>
    </div>
  );
};

export default ArenaScore;
