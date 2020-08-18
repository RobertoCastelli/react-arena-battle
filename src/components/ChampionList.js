import React from "react";
import ChampionAvatar from "./ChampionAvatar";
import { champions } from "../data";

const ChampionList = () => {
  return (
    <div>
      <ul>
        {champions.map((champ) => {
          return (
            <li key={champ.name}>
              <ChampionAvatar name={champ.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChampionList;
