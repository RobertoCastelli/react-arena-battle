import React, { useContext } from "react";
import ChampionAvatar from "./ChampionAvatar";
import { champions } from "../data";
import { Context } from "../context";

const ChampionList = () => {
  const context = useContext(Context);

  return (
    <div>
      <ul>
        {champions.map((champ) => {
          return (
            <li key={champ.name}>
              <ChampionAvatar
                name={champ.name}
                src={champ.icon}
                onClick={() => context.openModal(champ.name)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChampionList;
