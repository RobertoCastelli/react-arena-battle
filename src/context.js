import React, { useState, createContext } from "react";
import { champions, enemies, sounds } from "./data";
import useSound from "use-sound";

export const Context = createContext();

const ContextProvider = (props) => {
  //--> GLOBAL STATE
  const [modalState, setModalState] = useState(false);
  const [modal, setModal] = useState(champions);
  const [player, setPlayer] = useState(champions);
  const [playerHP, setPlayerHP] = useState(0);
  const [playerEN, setPlayerEN] = useState(0);
  const [playerDEF, setPlayerDEF] = useState(0);
  const [playerDefended, setPlayerDefended] = useState(false);
  const [playerMoved, setPlayerMoved] = useState(false);
  const [playerAppeared, setPlayerAppeared] = useState(false);
  const [playerLog, setPlayerLog] = useState("...");
  const [enemy, setEnemy] = useState(enemies[0]);
  const [enemyHP, setEnemyHP] = useState(0);
  const [enemyEN, setEnemyEN] = useState(0);
  const [enemyMoved, setEnemyMoved] = useState(false);
  const [enemyAppeared, setEnemyAppeared] = useState(false);
  const [enemyLog, setEnemyLog] = useState("...");
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);

  //--> SOUNDS
  const [playPunch] = useSound(sounds[0].punch);
  const [playSlap] = useSound(sounds[0].slap);
  const [playLastResort] = useSound(sounds[0].special);
  const [playShield] = useSound(sounds[0].sword);
  const [playSummon] = useSound(sounds[0].monsterdraw);
  const [playRest] = useSound(sounds[0].throwknife);
  const [playFight] = useSound(sounds[0].fight, { volume: 0.05 });

  //--> GET SELECTED PLAYER FROM ARRAY
  const getPlayer = (champName) => {
    const champion = champions.filter((champ) => champ.name === champName);
    return champion;
  };

  //--> SETS SELECTED PLAYER IN THE ARENA
  const setSelectedPlayer = (champName) => {
    playFight();
    const champion = getPlayer(champName);
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
    // RESET ANIMATION
    setEnemyAppeared(false);
    // PLAY SOUND
    playSummon();
    // GET AND SET ENEMY
    const enemy = getEnemy();
    setEnemy(enemy);
    // SET ACTIONS BUTTONS
    setShowActionButtons(true);
    // INJECT TEXT
    setInfoText("Choose an action");
  };

  //--> PLAYER ATTACK EFFECT
  const playerAttack = (enemy, player) => {
    // ANIMATION SEQUENCE
    setPlayerMoved(true);
    setPlayerAppeared(true);
    setEnemyMoved(false);
    // PLAY SOUND
    playPunch();
    // CALCULATE DAMAGE
    let damage = damageCalculation(player, enemy);
    // CONSUME ENEMY HEALTH
    setEnemyHP((enemy.health -= damage));
    // CONSUME PLAYER ENERGY
    setPlayerEN((player.energy -= damage));
    // RESET SHIELD AVAILABLE AGAIN
    deactivatePlayerShield(player);
    // SHOW LOGS TEXT
    switch (hitChanceModifier) {
      case 0:
        // MISS LOG
        setPlayerLog(`${player.name} MISSES!`);
        break;
      case 1:
        // NORMAL LOG
        setPlayerLog(`${player.name} hits for: ${damage}`);
        break;
      case 2:
        // CRIT LOG
        setPlayerLog(`${player.name} CRITS! for: ${damage}`);
        break;
      default:
        // DEFAUTL LOG
        setPlayerLog(`${player.name} is WEAK!`);
        break;
    }
  };

  //--> ENEMY ATTACK EFFECT
  const enemyAttack = (enemy, player) => {
    // ANIMATION SEQUENCE
    setEnemyMoved(true);
    setEnemyAppeared(true);
    setPlayerMoved(false);
    // PLAY SOUND
    playSlap();
    // CALCULATE DAMAGE
    let damage = damageCalculation(enemy, player);
    // CONSUME PLAYER HEALTH
    setPlayerHP((player.health -= damage));
    // CONSUME ENEMY ENERGY
    setEnemyEN((enemy.energy -= damage));
    // SHOW LOGS TEXT
    switch (hitChanceModifier) {
      case 0:
        // MISS LOG
        setEnemyLog(`${enemy.name} MISSES!`);
        break;
      case 1:
        // NORMAL LOG
        setEnemyLog(`${enemy.name} hits for: ${damage}`);
        break;
      case 2:
        // CRIT LOG
        setEnemyLog(`${enemy.name} CRITS! for: ${damage}`);
        break;
      default:
        // DEFAUTL LOG
        setEnemyLog(`${enemy.name} is WEAK!`);
        break;
    }
  };

  //--> PLAYER ATTACK SEQUENCE
  const playerAttackSequence = (enemy, player) => {
    playerAttack(enemy, player);
    checkDeath(enemy, player);
    checkEnergyLessThanZero(enemy, player);
    // IF ENEMY STILL ALIVE --> ENEMY ATTACK
    enemy.alive === true &&
      delay(1500).then(() => enemyAttackSequence(enemy, player));
  };

  //--> ENEMY ATTACK SEQUENCE
  const enemyAttackSequence = (enemy, player) => {
    enemyAttack(enemy, player);
    checkDeath(enemy, player);
    checkEnergyLessThanZero(enemy, player);
  };

  // **************
  // ACTION BUTTONS
  // --------------
  //--> PLAYER LASTRESORT SEQUENCE (ACHILLES HEEL)
  const playerLastResort = (enemy, player) => {
    playLastResort();
    diceRoll(1, 6) <= 3 // <-<< Edit this to change death sentence
      ? setPlayerHP((player.health = 0))
      : setEnemyHP((enemy.health = 0));
    checkDeath(enemy, player);
    deactivatePlayerShield(player);
  };

  //--> PLAYER SHIELD SEQUENCE
  const activePlayerShield = (enemy, player) => {
    playShield();
    if (!playerDefended) {
      setPlayerDEF((player.defence += 1000)); // <-<< Edit this to change DEFENCE modifier
      setPlayerDefended(true);
      setInfoText(`${player.name} in defence stance`);
      delay(1500).then(() => enemyAttackSequence(enemy, player));
    }
  };

  //--> RESET SHIELD SEQUENCE
  const deactivatePlayerShield = (player) => {
    if (playerDefended) {
      setPlayerDefended(false);
      setPlayerDEF((player.defence -= 1000)); // <-<< Change this to reset DEFENCE modifier
    }
  };

  //--> PLAYER REST STANCE
  const playerRest = (enemy, player) => {
    playRest();
    const rest = diceRoll(10, 50);
    setPlayerHP((player.health += rest));
    setPlayerEN((player.energy += rest));
    setPlayerDEF((player.defence -= 30)); // FIXME: <-<< It doesn't reset after the turn ends
    checkDefenceLessThanZero(player);
    deactivatePlayerShield(player);
    setInfoText(`${player.name} heals for: ${rest}`);
    delay(1500).then(() => enemyAttackSequence(enemy, player));
  };
  // ******************
  // END ACTION BUTTONS
  // ------------------

  //--> SPAWN NEXT ENEMY
  const enemyDefaultSpawn = () => {
    // GET ALIVE ENEMIES
    const aliveEnemies = enemies.filter((enemy) => enemy.alive === true);
    const aliveEnemiesLength = aliveEnemies.length;
    // IF THERE ARE STILL ENEMIES --> SPAWN ENEMY
    if (aliveEnemiesLength !== 0) {
      setInfoText("Summon a Demon");
      setEnemy(enemies[0]);
      setShowActionButtons(false);
    } else {
      // IF NO MORE ENEMIES --> PLAYER WIN --> SHOW SCORE
      playerWinSequence();
    }
  };

  // --> CHECK INITIATIVE
  // const checkInitiative = () => {
  //   let playerSpeed = player.speed + diceRoll(1, 20);
  //   let enemySpeed = enemy.speed + diceRoll(1, 20);
  //   console.log(`initiative player:${playerSpeed} enemy:${enemySpeed}`);
  //   if (playerSpeed > enemySpeed) {
  //     setInfoText("You move first");
  //   } else {
  //     setInfoText("Enemy moves first");
  //     enemyAttackSequence(enemy, player);
  //   }
  // };

  //--> DAMAGE CALCULATION
  const damageCalculation = (attacker, defender) => {
    let strength = attacker.strength + diceRoll(0, 10);
    let defence = defender.defence + diceRoll(0, 10);
    let defenceMod = strength * (defence / 100);
    // DAMAGE CALC WITH STRENGTH, DEFENCE & ENERGY MODIFIER
    let baseDamage = Math.floor((strength - defenceMod) * energyMod(attacker));
    console.log(`baseDMG: ${baseDamage}`); // <-<< Delete this
    // DO NOT ACCEPT NEGATIVE VALUES
    return baseDamage <= 0
      ? (baseDamage = 0)
      : baseDamage * hitChanceMod(attacker);
  };

  //--> ENERGY MODIFIER
  let energyModifier;
  const energyMod = (attacker) => {
    let energy = attacker.energy;
    if (energy >= 60) {
      energyModifier = 1;
    } else if (energy >= 5 && energy <= 59) {
      energyModifier = 0.5;
    } else {
      energyModifier = 0;
    }
    console.log(`energyMod: ${energyModifier}`); // <-<< Delete this
    return energyModifier;
  };

  //--> SPEED MODIFIER
  let speedModifier;
  const speedMod = (attacker) => {
    if (attacker.speed >= 80) {
      speedModifier = 4;
    } else if (attacker.speed >= 60 && attacker.speed <= 79) {
      speedModifier = 2;
    } else {
      speedModifier = 0;
    }
    console.log(`speedMod: ${speedModifier}`); // <-<< Delete this
    return speedModifier;
  };

  //--> HIT CHANCE MODIFIER
  let hitChanceModifier;
  const hitChanceMod = (attacker) => {
    // HIT CHANCE BASED ON PLAYER/ENEMY SPEED
    let hitChance = diceRoll(0, 20) + speedMod(attacker);
    switch (hitChance) {
      // MISS
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        hitChanceModifier = 0;
        break;
      // CRITICAL
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
        hitChanceModifier = 2;
        break;
      // NORMAL
      default:
        hitChanceModifier = 1;
        break;
    }
    console.log(`hitchance: ${hitChanceModifier}`); // <-<< Delete this
    return hitChanceModifier;
  };

  //--> CHECK DEATH SEQUENCE
  const checkDeath = (enemy, player) => {
    // IF ENEMY HEALTH = 0
    if (enemy.health <= 0) {
      getLevel();
      setEnemyHP((enemy.health = 0));
      setInfoText(`${player.name} slays ${enemy.name}`);
      setEnemyAlive(enemy, false);
      // AFTER ENEMY DEATH --> SPAWN NEXT ENEMY
      delay(2000).then(() => enemyDefaultSpawn());
      // IF PLAYER HEALTH = 0
    } else if (player.health <= 0) {
      getLevel();
      setPlayerHP((player.health = 0));
      setInfoText(`${enemy.name} slays ${player.name}`);
      // SET PLAYER DEATH SEQUENCE
      playerDeathSequence();
    } else {
      // DISPLAY DEFAULT TEXT ON SCORE SCREEN IF NOONE DEAD
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

  //--> SHOW ARENA LEVEL & SCORE BASED ON DEAD ENEMIES
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

  //--> NO NEGATIVE DEFENCE NUMBERS
  const checkDefenceLessThanZero = (player) =>
    player.defence <= 0 && setPlayerDEF((player.defence = 0));

  //--> SET ENEMY STATE: ALIVE OR DEAD
  const setEnemyAlive = (enemy, status) => (enemy.alive = status);

  //--> OPEN CHAMPION MODAL CARD
  const openModal = (champName) => {
    const champion = getPlayer(champName);
    setModal(champion);
    setModalState(true);
  };

  //--> CLOSE CHAMPION MODAL CARD
  const closeModal = () => setModalState(false);

  //--> SHOW RULES
  const showRules = () =>
    alert(
      "SUMMON A DEMON: survive all 10 levels, with one life only at disposition. \n\nDEFENCE: decreasing your damage income, but you won't be able to attack in this turn. \n\nHEAL: restore your energy and health, but your defences will drasticly lower and you won't be able to attack in this turn. \n\nLAST RESORT: one shot your enemy, or be one shotted. \n\n[NdRoberto]"
    );

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
        playerMoved,
        setPlayerMoved,
        playerAppeared,
        setPlayerAppeared,

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
        enemyMoved,
        setEnemyMoved,
        enemyAppeared,
        setEnemyAppeared,

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
