import React, { useContext } from "react";
import arenaStyle from "./arena.module.css";
import { GiBiceps } from "react-icons/gi";
import { GiLegArmor } from "react-icons/gi";
import { Context } from "../../context";
import { GiBlackKnightHelm } from "react-icons/gi";

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
            id="enemyAvatar"
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
        </div>
        <div className={arenaStyle.arenaEnemyStats}>
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

export default ArenaEnemy;
