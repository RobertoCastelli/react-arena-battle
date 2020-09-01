import barbarian from "./images/barbarian.jpg";
import mage from "./images/mage.jpg";
import thief from "./images/thief.jpg";
import alchemist from "./images/alchemist.jpg";
import knight from "./images/knight.jpg";

import mageGif from "./images/mage.gif";
import barbarianGif from "./images/barbarian.gif";
import thiefGif from "./images/thief.gif";
import alchemistGif from "./images/alchemist.gif";
import knightGif from "./images/knight.gif";

import ignoto from "./images/ignoto.jpg";
import ignotoGif from "./images/ignoto.gif";
import renekaj from "./images/renekaj.jpg";
import renekajGif from "./images/renekaj.gif";
import feticcio from "./images/feticcio.jpg";
import feticcioGif from "./images/feticcio.gif";

import attack from "./sounds/attack.mp3";
import fight from "./sounds/fight.mp3";
import monsterdraw from "./sounds/monsterdraw.mp3";
import punch from "./sounds/punch.mp3";
import punch1 from "./sounds/punch1.mp3";
import punch2 from "./sounds/punch2.mp3";
import punches from "./sounds/punches.mp3";
import slap from "./sounds/slap.mp3";
import special from "./sounds/special.mp3";
import sword from "./sounds/sword.mp3";
import sword1 from "./sounds/sword1.mp3";
import swordraw from "./sounds/swordraw.mp3";
import throwknife from "./sounds/throwknife.mp3";

export const champions = [
  {
    icon: barbarian,
    avatar: barbarianGif,
    name: "Doss",
    race: "human",
    classe: "barbarian",
    health: 100,
    energy: 70,
    strength: 80,
    defence: 65,
    speed: 40,
    description: "high health",
  },
  {
    icon: mage,
    avatar: mageGif,
    name: "Waltz",
    race: "human",
    classe: "mage",
    health: 65,
    energy: 80,
    strength: 100,
    defence: 55,
    speed: 70,
    description: "high damage",
  },
  {
    icon: knight,
    avatar: knightGif,
    name: "Polish",
    race: "human",
    classe: "knight",
    health: 80,
    energy: 80,
    strength: 60,
    defence: 95,
    speed: 40,
    description: "high defence",
  },
  {
    icon: thief,
    avatar: thiefGif,
    name: "Robbo",
    race: "human",
    classe: "thief",
    health: 65,
    energy: 80,
    strength: 70,
    defence: 50,
    speed: 100,
    description: "high speed",
  },
  {
    icon: alchemist,
    avatar: alchemistGif,
    name: "Erika",
    race: "human",
    classe: "alchemist",
    health: 65,
    energy: 100,
    strength: 70,
    defence: 70,
    speed: 80,
    description: "high energy",
  },
];

export const sounds = [
  {
    attack,
    fight,
    monsterdraw,
    punch,
    punch1,
    punch2,
    punches,
    slap,
    special,
    sword,
    sword1,
    swordraw,
    throwknife,
  },
];

export const enemies = [
  {
    icon: ignoto,
    avatar: ignotoGif,
    name: "???",
    energy: "???",
    health: "???",
    strength: "???",
    defence: "???",
    speed: "???",
    alive: false,
  },
  {
    icon: renekaj,
    avatar: renekajGif,
    name: "Renekaj",
    energy: 100,
    health: 80,
    strength: 60,
    defence: 50,
    speed: 60,
    alive: true,
  },
  {
    icon: feticcio,
    avatar: feticcioGif,
    name: "Feticcio",
    energy: 100,
    health: 100,
    strength: 90,
    defence: 60,
    speed: 80,
    alive: true,
  },
];

// const mobs = [
//   {
//     icon: "./images/mobs/skeletor.jpg",
//     avatar: "./images/mobs/skeletor.gif",
//     name: "Skeletor",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/nidalkaj.jpg",
//     avatar: "./images/mobs/nidalkaj.gif",
//     name: "Nidalkaj",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/feticcio.jpg",
//     avatar: "./images/mobs/feticcio.gif",
//     name: "Feticcio",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/zedaj.jpg",
//     avatar: "./images/mobs/zedaj.gif",
//     name: "Zedaj",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/skeletor.jpg",
//     avatar: "./images/mobs/drake.gif",
//     name: "Drake",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/malakaj.jpg",
//     avatar: "./images/mobs/malakaj.gif",
//     name: "Malakaj",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/skeletor.jpg",
//     avatar: "./images/mobs/hyena.gif",
//     name: "Hyena",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/skeletor.jpg",
//     avatar: "./images/mobs/abraxas.gif",
//     name: "Abraxas",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
//   {
//     icon: "./images/mobs/skeletor.jpg",
//     avatar: "./images/mobs/knight.gif",
//     name: "knight",
//     type: "enemy",
//     health: diceRoll(50, 100),
//     energy: diceRoll(50, 100),
//     strength: diceRoll(50, 100),
//     defence: diceRoll(30, 80),
//     speed: diceRoll(50, 100),
//     alive: true,
//   },
// ];
