import React from "react";
import ChampionAvatar from "./ChampionAvatar";
import { champions } from "../data";
import { Link } from "react-router-dom";

const ChampionList = () => {
  return (
    <div>
      <ul>
        {champions.map((champ) => {
          return (
            <li key={champ.name}>
              <Link to="/modal">
                <ChampionAvatar name={champ.name} src={champ.icon} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChampionList;
