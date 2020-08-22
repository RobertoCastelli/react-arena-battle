import React, { useState, createContext } from "react";
import { champions, enemies } from "./data";

export const Context = createContext();

const ContextProvider = (props) => {
  //--> GLOBAL STATE
  const [modalState, setModalState] = useState(false);
  const [modal, setModal] = useState(champions);
  const [player, setPlayer] = useState(champions);
  const [playerHP, setPlayerHP] = useState(0);
  const [playerEN, setPlayerEN] = useState(0);
  const [enemy, setEnemy] = useState(enemies[0]);
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyEN, setEnemyEN] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);

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

  //--> GET SELECTED ENEMY OBJECT FROM ALIVE ARRAY
  const getEnemy = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.status === "alive");
    const aliveEnemiesLength = aliveEnemies.length;
    const randomEnemyIndex = diceRoll(0, aliveEnemiesLength);
    const enemy = aliveEnemies[randomEnemyIndex];
    return enemy;
  };

  //--> SETS ENEMY IN THE ARENA
  const setSelectedEnemy = () => {
    const enemy = getEnemy();
    setEnemy(enemy);
    setShowActionButtons(true);
    setInfoText("Choose an action");
  };

  //--> PLAYER ATTACK SEQUENCE
  const playerAttackSequence = (enemy, player) => {
    playerAttack(enemy, player);
    delay(2000).then(() => enemyAttack(enemy, player));
  };

  //--> (+) DAMAGE TO ENEMY
  //--> (-) ENERGY TO PLAYER
  const playerAttack = (enemy, player) => {
    //TODO:
    setEnemyHP((enemy.health -= 10));
    setPlayerEN((player.energy -= 10));
  };

  //--> (+) DAMAGE TO PLAYER
  //--> (-) ENERGY TO ENEMY
  const enemyAttack = (enemy, player) => {
    //TODO:
    setEnemyEN((enemy.energy -= 10));
    setPlayerHP((player.health -= 10));
  };

  //--> OPEN CHAMPION MODAL CARD
  const openModal = (champName) => {
    const champion = getChampion(champName);
    setModal(champion);
    setModalState(true);
  };

  //--> CLOSE CHAMPION MODAL CARD
  const closeModal = () => setModalState(false);

  //--> SHOW RULES
  const showRules = () =>
    alert("Survive all 10 levels, with one life only at disposition");

  //--> SHOW INFO TEXT
  const setInfoText = (message) =>
    (document.querySelector(".arenaScoreInfoText").innerHTML = message);

  //--> RESTART GAME
  const restartGame = () =>
    window.confirm("You are going to restart the game") &&
    (window.location.href = "/");

  //--> DELAY
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //--> DICE ROLL
  const diceRoll = (min, max) => Math.floor(Math.random() * (max - min) + min);

  //--> RENDER
  return (
    <Context.Provider
      value={{
        player,
        setPlayer,
        playerHP,
        setPlayerHP,
        playerEN,
        setPlayerEN,
        setSelectedPlayer,
        playerAttackSequence,

        enemy,
        setEnemy,
        enemyHP,
        setEnemyHP,
        enemyEN,
        setEnemyEN,
        setSelectedEnemy,

        showActionButtons,
        setShowActionButtons,

        modal,
        setModal,
        modalState,
        setModalState,
        openModal,
        closeModal,

        diceRoll,
        showRules,
        restartGame,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
