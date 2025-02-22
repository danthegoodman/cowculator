export interface ClientData {
  gameVersion: string;
  enhancementLevelSuccessRateTable: number[];
  levelExperienceTable: number[];

  actionCategoryDetails: Record<string, ActionCategoryDetail>;
  actionDetails: Record<string, ActionDetail>;
  combatMonsterDetails: Record<string, CombatMonsterDetail>;
  itemDetails: Record<string, ItemDetail>;
}

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

export enum ActionType {
  Alchemy = "/action_types/alchemy",
  Brewing = "/action_types/brewing",
  Cheesesmithing = "/action_types/cheesesmithing",
  Combat = "/action_types/combat",
  Cooking = "/action_types/cooking",
  Crafting = "/action_types/crafting",
  Enhancing = "/action_types/enhancing",
  Foraging = "/action_types/foraging",
  Milking = "/action_types/milking",
  Tailoring = "/action_types/tailoring",
  Woodcutting = "/action_types/woodcutting",
}

export interface CombatMonsterDetail {
  hrid: string;
  name: string;
  dropTable: DropTable[] | null;
  rareDropTable: DropTable[] | null;
}

export interface ItemDetail {
  consumableDetail: ConsumableDetail;
  enhancementCosts?: Cost[];
  hrid: string;
  itemLevel: number;
  name: string;
  protectionItemHrids?: string[];
  sellPrice: number;
  sortIndex: number;
}

export interface ConsumableDetail {
  usableInActionTypeMap?: Partial<Record<ActionType, boolean>>;
}
