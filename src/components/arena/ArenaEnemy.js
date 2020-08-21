import React from "react";
import arenaStyle from "./arena.module.css";
import { GiRevolt } from "react-icons/gi";
import { FaUserShield } from "react-icons/fa";
import { BiRun } from "react-icons/bi";

const ArenaEnemy = () => {
  return (
    <div>
      <div className={arenaStyle.arenaEnemyWrapper}>
        <div className={arenaStyle.arenaEnemyContent}>
          <img
            className={arenaStyle.arenaEnemyImage}
            src="https://via.placeholder.com/100"
            alt="avatar"
          />
          <h3>NOME</h3>
          <progress
            className={arenaStyle.arenaEnemyHealth}
            value="10"
            data-label="10"
            max="100"
          ></progress>
          <progress
            className={arenaStyle.arenaEnemyEnergy}
            value="10"
            data-label="10"
            max="100"
          ></progress>
          <div className={arenaStyle.arenaEnemyStats}>
            <label htmlFor="fist">
              <GiRevolt id="fist" size={30} />
              10
            </label>
            <label htmlFor="shield">
              <FaUserShield id="shield" size={30} />
              10
            </label>
            <label htmlFor="speed">
              <BiRun id="speed" size={30} />
              10
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaEnemy;
