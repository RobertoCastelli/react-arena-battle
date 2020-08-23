import React, { useState, createContext } from "react";
import { champions, enemies } from "./data";

export const Context = createContext();

const ContextProvider = (props) => {
  //--> GLOBAL USE STATE
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
  const [score, setScore] = useState(0);

  //--> GET SELECTED CHAMPION
  const getChampion = (champName) => {
    const champion = champions.filter((champ) => champ.name === champName);
    return champion;
  };

  //--> SETS SELECTED CHAMPION IN THE ARENA
  const setSelectedPlayer = (champName) => {
    const champion = getChampion(champName);
    setPlayer(champion);
  };

  //--> GET RANDOM ENEMY FROM ALIVE POOL
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

  //--> PLAYER ATTACK EFFECT
  const playerAttack = (enemy, player) => {
    //--> CONSUME ENEMY HEALTH
    setEnemyHP((enemy.health -= 50));
    //--> CONSUME PLAYER ENERGY
    setPlayerEN((player.energy -= 10));
  };

  //--> ENEMY ATTACK EFFECT
  const enemyAttack = (enemy, player) => {
    //--> CONSUME PLAYER HEALTH
    setPlayerHP((player.health -= 10));
    //--> CONSUME ENEMY ENERGY
    setEnemyEN((enemy.energy -= 10));
  };

  //--> NO NEGATIVE ENERGY NUMBERS
  const checkEnergy = (enemy, player) => {
    if (enemy.energy <= 0) {
      setEnemyEN((enemy.energy = 0));
    } else if (player.energy <= 0) {
      setPlayerEN((player.energy = 0));
    }
  };

  //--> SET ENEMY STATE: ALIVE OR DEAD
  const setEnemyAlive = (enemy, status) => (enemy.alive = status);

  //--> SPAWN NEXT ENEMY
  const enemyDefaultSpawn = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
    const aliveEnemiesLength = aliveEnemies.length;
    if (aliveEnemiesLength !== 0) {
      setInfoText("Summon a Demon");
      setEnemy(enemies[0]);
      setShowActionButtons(false);
    } else {
      //--> IF NO MORE ENEMIES --> PLAYER WIN
      setInfoText("You WIN!"); //TODO: add a function sequence
      delay(1500).then(document.querySelector("dialog").showModal());
    }
  };

  const playerDeathSequence = () => {
    delay(1500).then(() => setInfoText("You are dead")); //TODO: add a better ending
    delay(2500).then(() => restartGame());
  };

  //--> CHECK HEALTH SEQUENCE
  const checkHealth = (enemy, player) => {
    if (enemy.health <= 0) {
      getLevel();
      setEnemyHP((enemy.health = 0));
      setInfoText(`${player.name} slays ${enemy.name}`);
      setEnemyAlive(enemy, false);
      //--> SET ENEMY DEATH SEQUENCE
      delay(1500).then(() => enemyDefaultSpawn());
    } else if (player.health <= 0) {
      setPlayerHP((player.health = 0));
      setInfoText(`${enemy.name} slays ${player.name}`);
      //--> SET PLAYER DEATH SEQUENCE
      delay(1500).then(() => playerDeathSequence());
    } else {
      //--> DISPLAY DEFAULT TEXT ON SCORE SCREEN
      setInfoText("Keep Fighting");
    }
  };

  //--> SHOW ARENA LEVEL SCORE
  const getLevel = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
    const level = enemies.length - aliveEnemies.length;
    document.querySelector("#arenaScoreNumber").innerHTML = level;
    setScore(`You have reaced arena level: ${level} `);
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
    (document.querySelector("#arenaScoreInfoText").innerHTML = message);

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
        score,

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
