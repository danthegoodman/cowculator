import {
  Flex,
  Group,
  NativeSelect,
  NumberInput,
  Switch,
  Text,
} from "@mantine/core";
import Materials from "./Materials";
import { useData } from "../context/DataContext.ts";
import { useMemo, useState } from "react";
import { ActionSkill, getTeaBonuses } from "../helpers/CommonFunctions";
import { TeaSelector } from "./input/TeaSelector.tsx";
import { ActionType } from "../models/Client.ts";
import { useSkillSettings } from "../store/Settings.ts";

interface Props {
  skill: ActionSkill;
  showUpgradeToggle?: boolean;
}

export default function ActionCategorySelector({
  skill,
  showUpgradeToggle = true,
}: Props) {
  const data = useData();
  const { settings, set } = useSkillSettings(skill);
  const { fromRaw, gearEfficiency, level, targetLevel, teas, toolBonus, xp } =
    settings;
  const { levelTeaBonus } = getTeaBonuses(teas, skill);

  const type: ActionType = `/action_types/${skill}`;

  const options = useMemo(
    () =>
      Object.values(data.actionCategoryDetails)
        .filter((x) => x.hrid.startsWith(`/action_categories/${skill}`))
        .sort((a, b) => {
          if (a.sortIndex < b.sortIndex) return -1;
          if (a.sortIndex > b.sortIndex) return 1;
          return 0;
        })
        .map((x) => ({
          value: x.hrid,
          label: x.name,
        })),
    [skill, data.actionCategoryDetails]
  );

  const [category, setCategory] = useState(options[0].value);

  const effectiveLevel = (level || 1) + levelTeaBonus;

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Group>
        <NativeSelect
          label="Category"
          withAsterisk
          data={options}
          value={category}
          onChange={(event) => setCategory(event.currentTarget.value)}
        />
        {showUpgradeToggle && (
          <Switch
            onLabel="CRAFT UPGRADE ITEM"
            offLabel="BUY UPGRADE ITEM"
            size="xl"
            checked={fromRaw}
            onChange={(event) => set({ fromRaw: event.currentTarget.checked })}
          />
        )}
        <NumberInput
          value={level}
          onChange={(value) => set({ level: value || 1 })}
          label="Level"
          className="sm"
          min={1}
          max={200}
          withAsterisk
          hideControls
          rightSection={
            levelTeaBonus && (
              <>
                <Text c="#EE9A1D">+{levelTeaBonus}</Text>
              </>
            )
          }
        />
        <NumberInput
          value={toolBonus}
          onChange={(value) => set({ toolBonus: value || 0 })}
          label="Tool Bonus"
          className="md"
          withAsterisk
          hideControls
          precision={2}
          min={0}
          formatter={(value) => `${value}%`}
        />
        <NumberInput
          value={gearEfficiency}
          onChange={(value) => set({ gearEfficiency: value || 0 })}
          label="Gear Efficiency"
          className="md"
          withAsterisk
          hideControls
          precision={2}
          min={0}
          formatter={(value) => `${value}%`}
        />
        <TeaSelector
          type={type}
          teas={teas}
          onTeasChange={(value) => set({ teas: value })}
        />
        <NumberInput
          value={xp}
          onChange={(value) => set({ xp: value || 0 })}
          label="Experience"
          className="md"
          min={0}
          withAsterisk
          hideControls
        />
        <NumberInput
          value={targetLevel}
          onChange={(value) => set({ targetLevel: value || 1 })}
          label="Target Level"
          className="md"
          min={1}
          max={200}
          withAsterisk
          hideControls
        />
      </Group>
      {category && (
        <Materials
          actionCategory={category}
          effectiveLevel={effectiveLevel}
          xp={xp}
          targetLevel={targetLevel}
          toolBonus={toolBonus}
          gearEfficiency={gearEfficiency}
          fromRaw={fromRaw}
          teas={teas}
          skill={skill}
        />
      )}
    </Flex>
  );
}
