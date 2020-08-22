import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import { GiBiceps } from "react-icons/gi";
import { FaUserShield } from "react-icons/fa";
import { BiRun } from "react-icons/bi";
import { Context } from "../../context";

const ArenaEnemy = () => {
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
  } = context.enemy;

  return (
    <div>
      <div className={arenaStyle.arenaEnemyWrapper}>
        <div className={arenaStyle.arenaEnemyContent}>
          <img
            className={arenaStyle.arenaEnemyAvatar}
            src={avatar}
            alt="avatar"
          />
          <img className={arenaStyle.arenaEnemyImage} src={icon} alt="icon" />
          <h3>{name}</h3>
          <progress
            className={arenaStyle.arenaEnemyHealth}
            value={health}
            data-label={health}
            max="100"
          ></progress>
          <progress
            className={arenaStyle.arenaEnemyEnergy}
            value={energy}
            data-label={energy}
            max="100"
          ></progress>
          <div className={arenaStyle.arenaEnemyStats}>
            <label htmlFor="fist">
              <GiBiceps id="fist" size={30} />
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

export default ArenaEnemy;
