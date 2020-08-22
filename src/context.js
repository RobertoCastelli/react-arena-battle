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
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
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
    checkHealth(enemy, player);
    checkEnergy(enemy, player);
    enemy.alive !== false &&
      delay(1000).then(() => enemyAttackSequence(enemy, player));
  };

  //--> ENEMY ATTACK SEQUENCE
  const enemyAttackSequence = (enemy, player) => {
    enemyAttack(enemy, player);
    checkHealth(enemy, player);
    checkEnergy(enemy, player);
  };

  //--> (+) DAMAGE TO ENEMY
  //--> (-) ENERGY TO PLAYER
  const playerAttack = (enemy, player) => {
    setEnemyHP((enemy.health -= 40));
    setPlayerEN((player.energy -= 10));
  };

  //--> (+) DAMAGE TO PLAYER
  //--> (-) ENERGY TO ENEMY
  const enemyAttack = (enemy, player) => {
    setPlayerHP((player.health -= 10));
    setEnemyEN((enemy.energy -= 10));
  };

  //--> CHECK NEGATIVE EN NUMBERS
  const checkEnergy = (enemy, player) => {
    if (enemy.energy <= 0) {
      setEnemyEN((enemy.energy = 0));
    } else if (player.energy <= 0) {
      setPlayerEN((player.energy = 0));
    }
  };

  //--> CHANGE ENEMY STATE: ALIVE/DEAD
  const setEnemyAlive = (enemy, status) => (enemy.alive = status);

  //--> CHECK NEGATIVE HP NUMBERS
  //--> SHOW TEXT IF DEAD
  const checkHealth = (enemy, player) => {
    if (enemy.health <= 0) {
      setEnemyHP((enemy.health = 0));
      setInfoText(`${player.name} slays ${enemy.name}`);
      setShowActionButtons(false);
      setEnemyAlive(enemy, false);
      delay(1500).then(() => setInfoText("Summon a Demon"));
    } else if (player.health <= 0) {
      setPlayerHP((player.health = 0));
      setInfoText(`${enemy.name} slays ${player.name}`);
    } else {
      setInfoText("Keep Fighting");
    }
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

        btnDisabled,
        setBtnDisabled,

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
