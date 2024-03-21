export default class CardData {
  name: string = "";
  rarity: string = "Common";
  faction: string = "Flame Legion";
  arrows: string[] = [];
  soul: number = 1;
  attack: number = 1;
  health: number = 1;
  armor: number = 0;
  image: string = "./../images/frames/Card_Blank.png";
  scale: number = 1;
  offsetX: number = 0;
  offsetY: number = 0;
  text: string = "";
  hideUI: boolean = false;
}

export const rarities = ["Common", "Rare", "Epic", "Legendary"];
export const factions = [
  "Flame Legion",
  "Tidal Nether",
  "Planet Guardian",
  "Cyclone Fury",
  "Divine Grace",
  "Shadow Realm",
  "Mercenary",
];
export const arrows = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
export const textSprites = [
  "Attack",
  "Health",
  "Armor",
  "Mana",
  "Quest",
  "Reward",
];
export const textKeywords = [
  "Aura",
  "Awaken",
  "Backstab",
  "Banish",
  "Berserk",
  "Chain ()",
  "Dark Matter",
  "Dark Power",
  "Freeze",
  "Frozen",
  "Last Wish",
  "Linked",
  "Link",
  "Lock",
  "Move",
  "Piercing ()",
  "Reset",
  "Silenced",
  "Silence",
  "Stealth",
  "Summon",
  "Summoned",
  "Taunt",
  "Untargetable",
];
export const scales = ["0.25", "0.5", "1", "1.5", "2"];

export function factionConv(faction: string) {
  const factionConvertName = [
    "Flame Legion",
    "Tidal Nether",
    "Planet Guardian",
    "Cyclone Fury",
    "Divine Grace",
    "Shadow Realm",
    "Mercenary",
  ];
  const factionConvertType = [
    "Fire",
    "Water",
    "Earth",
    "Air",
    "Holy",
    "Dark",
    "None",
  ];
  return factionConvertType[factionConvertName.indexOf(faction)];
}

export function arrowConv(arrowString: string[]) {
  let arrowNew: boolean[] = [];
  arrows.forEach((arrow) => {
    arrowNew.push(arrowString.indexOf(arrow) != -1);
  });
  return arrowNew;
}
