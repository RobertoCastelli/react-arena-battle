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
  const [playerDEF, setPlayerDEF] = useState(0);
  const [playerDefended, setPlayerDefended] = useState(false);
  const [enemy, setEnemy] = useState(enemies[0]);
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyEN, setEnemyEN] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [playerLog, setPlayerLog] = useState("...");
  const [enemyLog, setEnemyLog] = useState("...");

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
    checkDeath(enemy, player);
    checkEnergyLessThanZero(enemy, player);
    enemy.alive === true &&
      delay(1000).then(() => enemyAttackSequence(enemy, player));
  };

  //--> ENEMY ATTACK SEQUENCE
  const enemyAttackSequence = (enemy, player) => {
    enemyAttack(enemy, player);
    checkDeath(enemy, player);
    checkEnergyLessThanZero(enemy, player);
  };

  //--> PLAYER ATTACK EFFECT
  const playerAttack = (enemy, player) => {
    const damage = diceRoll(0, 70);
    //--> CONSUME ENEMY HEALTH
    setEnemyHP((enemy.health -= damage));
    //--> CONSUME PLAYER ENERGY
    setPlayerEN((player.energy -= damage));
    //--> SET SHIELD AVAILABLE AGAIN
    deactivatePlayerShield(player);
    //--> SHOW LOGS TEXT
    setPlayerLog(`${player.name} hits for: ${damage}`);
  };

  //--> ENEMY ATTACK EFFECT
  const enemyAttack = (enemy, player) => {
    const damage = diceRoll(0, 70);
    //--> CONSUME PLAYER HEALTH
    setPlayerHP((player.health -= damage));
    //--> CONSUME ENEMY ENERGY
    setEnemyEN((enemy.energy -= damage));
    //--> SHOW LOGS TEXT
    setEnemyLog(`${enemy.name} hits for: ${damage}`);
  };

  //--> PLAYER LASTRESORT SEQUENCE (ACHILLES HEEL) FIXME: if players dies score is +1, should be +0
  const playerLastResort = (enemy, player) => {
    diceRoll(1, 6) <= 1 // <-<< EDIT THIS
      ? setPlayerHP((player.health = 0))
      : setEnemyHP((enemy.health = 0));
    checkDeath(enemy, player);
    deactivatePlayerShield(player);
  };

  //--> PLAYER SHIELD SEQUENCE FIXME:
  const activePlayerShield = (enemy, player) => {
    if (!playerDefended) {
      setPlayerDEF((player.defence += 1000));
      setPlayerDefended(true);
      setInfoText(`${player.name} in defence stance`);
      delay(1500).then(() => enemyAttackSequence(enemy, player));
    }
  };

  //--> RESET SHIELD SEQUENCE FIXME:
  const deactivatePlayerShield = (player) => {
    if (playerDefended) {
      setPlayerDefended(false);
      setPlayerDEF((player.defence -= 1000));
    }
  };

  //--> PLAYER REST STANCE FIXME:
  const playerRest = (enemy, player) => {
    const rest = diceRoll(10, 50);
    setPlayerHP((player.health += rest));
    setPlayerEN((player.energy += rest));
    setPlayerDEF((player.defence -= 30));
    deactivatePlayerShield(player);
    setInfoText(`${player.name} heals for: ${rest}`);
    delay(1500).then(() => enemyAttackSequence(enemy, player));
  };

  //--> SPAWN NEXT ENEMY FIXME:
  const enemyDefaultSpawn = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
    const aliveEnemiesLength = aliveEnemies.length;
    if (aliveEnemiesLength !== 0) {
      setInfoText("Summon a Demon");
      setEnemy(enemies[0]);
      setShowActionButtons(false);
    } else {
      //--> IF NO MORE ENEMIES --> PLAYER WIN --> SHOW SCORE
      playerWinSequence();
    }
  };

  //--> CHECK DEATH SEQUENCE
  const checkDeath = (enemy, player) => {
    if (enemy.health <= 0) {
      getLevel();
      setEnemyHP((enemy.health = 0));
      setInfoText(`${player.name} slays ${enemy.name}`);
      setEnemyAlive(enemy, false);
      //--> AFTER ENEMY DEATH --> SPAWN NEXT ENEMY
      delay(2000).then(() => enemyDefaultSpawn());
    } else if (player.health <= 0) {
      getLevel();
      setPlayerHP((player.health = 0));
      setInfoText(`${enemy.name} slays ${player.name}`);
      //--> SET PLAYER DEATH SEQUENCE
      playerDeathSequence();
    } else {
      //--> DISPLAY DEFAULT TEXT ON SCORE SCREEN
      setInfoText("Keep Fighting");
    }
  };

  //--> PLAYER WIN SEQUENCE TODO: add a better mode
  const playerWinSequence = () => {
    setInfoText("You WIN!");
    delay(1500).then(() => document.querySelector("dialog").showModal());
    delay(4000).then(() => (window.location.href = "/"));
  };

  //--> PLAYER DEATH SEQUENCE TODO: add a better ending
  const playerDeathSequence = () => {
    setInfoText("You are dead");
    delay(1500).then(() => document.querySelector("dialog").showModal());
    delay(4000).then(() => (window.location.href = "/"));
  };

  //--> SHOW ARENA LEVEL & SCORE
  const getLevel = () => {
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
    const level = enemies.length - aliveEnemies.length;
    //TODO: add a better score calculation
    setScore(`Your SCORE is: ${level}`);
    setLevel(level);
  };

  //--> NO NEGATIVE ENERGY NUMBERS
  const checkEnergyLessThanZero = (enemy, player) => {
    if (enemy.energy <= 0) {
      setEnemyEN((enemy.energy = 0));
    } else if (player.energy <= 0) {
      setPlayerEN((player.energy = 0));
    }
  };

  //--> SET ENEMY STATE: ALIVE OR DEAD
  const setEnemyAlive = (enemy, status) => (enemy.alive = status);

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
        playerDEF,
        setPlayerDEF,
        playerLog,
        setPlayerLog,

        playerRest,
        setSelectedPlayer,
        playerAttackSequence,
        playerLastResort,
        activePlayerShield,

        enemy,
        setEnemy,
        enemyHP,
        setEnemyHP,
        enemyEN,
        setEnemyEN,
        enemyLog,
        setEnemyLog,
        setSelectedEnemy,

        modal,
        setModal,
        modalState,
        setModalState,
        openModal,
        closeModal,
        score,
        level,

        showActionButtons,
        setShowActionButtons,

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
