import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import ArenaImage from "./ArenaImage";
import ArenaPlayer from "./ArenaPlayer";
import ArenaScore from "./ArenaScore";
import ArenaEnemy from "./ArenaEnemy";
import { Context } from "../../context";
import BtnActions from "./BtnActions";
import BtnInit from "./BtnInit";

const Arena = () => {
  const context = useContext(Context);

  return (
    <div>
      <div className={arenaStyle.arenaWrapper}>
        <div className={arenaStyle.arenaContent}>
          <BtnActions />
          {/* <BtnInit /> */}
          <ArenaImage />
          <div className={arenaStyle.arenaDisplay}>
            <ArenaPlayer />
            <ArenaScore />
            <ArenaEnemy />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
