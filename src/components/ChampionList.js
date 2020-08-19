import React from "react";
import ChampionAvatar from "./ChampionAvatar";
import { champions } from "../data";

const ChampionList = () => {
  const handleModal = () => {
    console.log("ciao");
  };
  return (
    <div>
      <ul>
        {champions.map((champ) => {
          return (
            <li key={champ.name}>
              <ChampionAvatar
                name={champ.name}
                src={champ.icon}
                onClick={handleModal}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChampionList;
