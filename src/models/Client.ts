export interface ClientData {
  gameVersion: string;
  enhancementLevelSuccessRateTable: number[];
  levelExperienceTable: number[];

  teas: TeaDetail[];

  actionCategoryDetails: Record<string, ActionCategoryDetail>;
  actionDetails: Record<string, ActionDetail>;
  combatMonsterDetails: Record<string, CombatMonsterDetail>;
  itemDetails: Record<string, ItemDetail>;
}

export type ItemHrid = string;
export type BuffTypeHrid = string;

export interface ActionCategoryDetail {
  hrid: string;
  name: string;
  sortIndex: number;
}

export interface ActionDetail {
  baseTimeCost: number;
  category: string;
  dropTable: DropTable[] | null;
  experienceGain: ExperienceGain;
  function: ActionFunction;
  hrid: string;
  inputItems: Cost[] | null;
  levelRequirement: LevelRequirement;
  name: string;
  outputItems: Cost[] | null;
  rareDropTable: DropTable[] | null;
  sortIndex: number;
  type: ActionType;
  upgradeItemHrid: string;
}

export interface DropTable {
  itemHrid: string;
  dropRate: number;
  minCount: number;
  maxCount: number;
  minEliteTier: number;
}

export interface ExperienceGain {
  skillHrid: string;
  value: number;
}

export enum ActionFunction {
  Combat = "/action_functions/combat",
  Enhancing = "/action_functions/enhancing",
  Gathering = "/action_functions/gathering",
  Production = "/action_functions/production",
}

export interface Cost {
  itemHrid: string;
  count: number;
}

export interface LevelRequirement {
  skillHrid: string;
  level: number;
}

export type ActionType =
  | "/action_types/alchemy"
  | "/action_types/brewing"
  | "/action_types/cheesesmithing"
  | "/action_types/combat"
  | "/action_types/cooking"
  | "/action_types/crafting"
  | "/action_types/enhancing"
  | "/action_types/foraging"
  | "/action_types/milking"
  | "/action_types/tailoring"
  | "/action_types/woodcutting"

export interface CombatMonsterDetail {
  hrid: string;
  name: string;
  dropTable: DropTable[] | null;
  rareDropTable: DropTable[] | null;
}

export interface ItemDetail {
  enhancementCosts?: Cost[];
  hrid: string;
  itemLevel: number;
  name: string;
  protectionItemHrids?: string[];
  sellPrice: number;
  sortIndex: number;
}

export interface TeaDetail {
  itemHrid: ItemHrid,
  forActions: ActionType[],
  isSkillTea: boolean,
  buffs: Buff[]
}

export interface Buff {
  typeHrid: BuffTypeHrid,
  boost: number,
  levelBonus: number,
  duration: number,
}
