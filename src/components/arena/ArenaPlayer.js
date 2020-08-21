import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import { Context } from "../../context";
import { GiRevolt } from "react-icons/gi";
import { FaUserShield } from "react-icons/fa";
import { BiRun } from "react-icons/bi";

const ArenaPlayer = () => {
  const context = useContext(Context);
  const {
    icon,
    name,
    health,
    energy,
    strength,
    defence,
    speed,
  } = context.player[0];

  return (
    <div>
      <div className={arenaStyle.arenaPlayerWrapper}>
        <div className={arenaStyle.arenaPlayerContent}>
          <img
            className={arenaStyle.arenaPlayerImage}
            src={icon}
            alt="avatar"
          />
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
          <div className={arenaStyle.arenaPlayerStats}>
            <label htmlFor="fist">
              <GiRevolt id="fist" size={30} />
              {strength}
            </label>
            <label htmlFor="shield">
              <FaUserShield id="shield" size={30} />
              {defence}
            </label>
            <label htmlFor="speed">
              <BiRun id="speed" size={30} />
              {speed}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaPlayer;
