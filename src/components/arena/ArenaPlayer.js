import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import { Context } from "../../context";
import { GiBiceps } from "react-icons/gi";
import { GiLegArmor } from "react-icons/gi";
import { GiBlackKnightHelm } from "react-icons/gi";
const classNames = require("classnames");

const ArenaPlayer = () => {
  const context = useContext(Context);
  const {
    avatar,
    icon,
    name,
    health,
    energy,
    strength,
    defence,
    speed,
  } = context.player[0];
  const { playerMoved, playerAppeared } = context;

  return (
    <div>
      <div className={arenaStyle.arenaPlayerWrapper}>
        <div className={arenaStyle.arenaPlayerContent}>
          <img
            className={classNames(
              `${arenaStyle.arenaPlayerAvatar}`,
              !playerAppeared && `${arenaStyle.arenaPlayerAppear}`,
              playerMoved && `${arenaStyle.arenaPlayerMove}`
            )}
            src={avatar}
            alt="avatar"
          />
          <img className={arenaStyle.arenaPlayerImage} src={icon} alt="icon" />
          <h3>{name}</h3>
          <progress
            className={arenaStyle.arenaPlayerHealth}
            value={health}
            data-label={health}
            max="100"
          ></progress>
          <progress
            className={arenaStyle.arenaPlayerEnergy}
            value={energy}
            data-label={energy}
            max="100"
          ></progress>
        </div>
        <div className={arenaStyle.arenaPlayerStats}>
          <label htmlFor="fist">
            <GiBiceps id="fist" size={30} />
            {strength}
          </label>
          <label htmlFor="shield">
            <GiBlackKnightHelm id="shield" size={30} />
            {defence}
          </label>
          <label htmlFor="speed">
            <GiLegArmor id="speed" size={30} />
            {speed}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ArenaPlayer;
