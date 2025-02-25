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
