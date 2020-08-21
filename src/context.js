import React, { useState, createContext } from "react";
import { champions, enemies } from "./data";

export const Context = createContext();

const ContextProvider = (props) => {
  //--> GLOBAL STATE
  const [modalState, setModalState] = useState(false);
  const [modal, setModal] = useState(champions);
  const [player, setPlayer] = useState(champions);
  const [enemy, setEnemy] = useState(enemies);

  //--> GET SELECTED CHAMPION OBJECT
  const getChampion = (champName) => {
    const champion = champions.filter((champ) => champ.name === champName);
    return champion;
  };

  //--> SETS CHAMPION IN THE ARENA
  const setSelectedPlayer = (champName) => {
    const champion = getChampion(champName);
    setPlayer(champion);
  };

  const getEnemy = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.status === "alive");
    const aliveEnemiesLength = aliveEnemies.length;
    const randomEnemyIndex = diceRoll(0, aliveEnemiesLength);
    const mob = aliveEnemies[randomEnemyIndex];
    return mob;
  };

  const setSelectedEnemy = () => {
    const mob = getEnemy();
    setEnemy(mob);
  };

  //--> DICE ROLL
  const diceRoll = (min, max) => Math.floor(Math.random * (max - min) + min);

  //--> OPEN CHAMPION MODAL CARD
  const openModal = (champName) => {
    const champion = getChampion(champName);
    setModal(champion);
    setModalState(true);
  };

  //--> CLOSE CHAMPION MODAL CARD
  const closeModal = () => setModalState(false);

  //--> SHOW RULES
  const showRules = () => alert("Survive all 10 levels, with one life only");

  //--> RESTART GAME
  const restartGame = () =>
    window.confirm("You are going to restart the game") &&
    (window.location.href = "/");

  //--> RENDER
  return (
    <Context.Provider
      value={{
        player,
        setPlayer,
        setSelectedPlayer,
        enemy,
        setEnemy,
        setSelectedEnemy,

        modal,
        setModal,
        modalState,
        setModalState,
        openModal,
        closeModal,

        showRules,
        restartGame,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
