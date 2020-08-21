import React, { useContext } from "react";
import ChampionAvatar from "./ChampionAvatar";
import { champions } from "../data";
import { Context } from "../context";
import Title from "./Title";

const ChampionList = () => {
  const context = useContext(Context);

  return (
    <div>
      <Title title="Choose your Champion" />
      <ul>
        {champions.map((champ) => {
          return (
            <li key={champ.name}>
              <ChampionAvatar
                name={champ.name}
                src={champ.icon}
                onClick={() => {
                  context.openModal(champ.name);
                  context.setSelectedPlayer(champ.name);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChampionList;
