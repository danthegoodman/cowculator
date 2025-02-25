import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { ActionType, TeaDetail } from "./src/models/Client";

main();

function main() {
  const dataFile = "init-client-data.json";
  if (!existsSync(dataFile)) {
    console.error(`Missing ${dataFile}. Follow the instructions in the README`);
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(dataFile, "utf8"));
  const result = pick(
    data,
    "gameVersion",
    "levelExperienceTable",
    "enhancementLevelSuccessRateTable"
  );

  result.teas = getTeas(data);

  result.actionCategoryDetails = mapValues(data.actionCategoryDetailMap, (v) =>
    pick(v, "hrid", "name", "sortIndex")
  );

  result.actionDetails = mapValues(data.actionDetailMap, (v) =>
    pick(
      v,
      "baseTimeCost",
      "category",
      "dropTable",
      "experienceGain",
      "function",
      "hrid",
      "inputItems",
      "levelRequirement",
      "name",
      "outputItems",
      "rareDropTable",
      "sortIndex",
      "type",
      "upgradeItemHrid"
    )
  );
  result.itemDetails = mapValues(data.itemDetailMap, (v) => {
    const it = pick(
      v,
      "enhancementCosts",
      "hrid",
      "itemLevel",
      "name",
      "protectionItemHrids",
      "sellPrice",
      "sortIndex"
    );
    it.itemLevel ??= 0;
    return it;
  });
  result.combatMonsterDetails = mapValues(data.combatMonsterDetailMap, (v) =>
    pick(v, "hrid", "name", "dropTable", "rareDropTable")
  );
  writeFileSync("src/assets/client-data.json", JSON.stringify(result, null, 2));
}

function getTeas(data: any): TeaDetail[] {
  let items: any[] = Object.values(data.itemDetailMap);
  items = items.filter((it) => it.consumableDetail);
  items.sort((a, b) => a.sortIndex - b.sortIndex);

  const drinks: TeaDetail[] = items.map((it) => {
    const forActions = Object.keys(it.consumableDetail.usableInActionTypeMap);
    const buffs: any[] = it.consumableDetail.buffs ?? [];
    return {
      itemHrid: it.hrid,
      forActions: forActions as ActionType[],
      isSkillTea: buffs.some((b) => b.typeHrid.endsWith("_level")),
      buffs: buffs.map((b) => ({
        typeHrid: b.typeHrid,
        boost: b.flatBoost,
        levelBonus: b.flatBoostLevelBonus,
        duration: b.duration,
      })),
    };
  });
  return drinks.filter(it=> !it.forActions.includes('/action_types/combat'))
}

function pick(obj: any, ...keys: string[]) {
  if (!obj) return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(([k, _]) => keys.includes(k))
  );
}

function mapValues(obj: any, fn: (v: any, k: string) => any) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}
