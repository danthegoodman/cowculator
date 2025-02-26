import { useMemo } from "react";
import { Flex, Group, NumberInput, Select, Text, Tooltip } from "@mantine/core";
import { useData } from "../context/DataContext.ts";
import EnhancingCalc from "./EnhancingCalc";
import { getTeaBonuses, Skill } from "../helpers/CommonFunctions";
import { ActionType } from "../models/Client.ts";
import { TeaSelector } from "./input/TeaSelector.tsx";
import { useSkillSettings } from "../store/Settings.ts";

export default function Enhancing() {
  const skill = Skill.Enhancing;
  const data = useData();
  const { settings, set } = useSkillSettings("enhancing");
  const { item, level, toolBonus, gearSpeed, teas, target } = settings;

  const type: ActionType = "/action_types/enhancing";

  const { levelTeaBonus } = getTeaBonuses(teas, skill);

  const items = useMemo(
    () =>
      Object.values(data.itemDetails)
        .filter((x) => x.enhancementCosts)
        .sort((a, b) => {
          if (a.sortIndex < b.sortIndex) return -1;
          if (a.sortIndex > b.sortIndex) return 1;
          return 0;
        }),
    [data.itemDetails]
  );

  const itemOptions = useMemo(
    () =>
      items.map((x) => ({
        value: x.hrid,
        label: x.name,
      })),
    [items]
  );

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Group>
        <NumberInput
          value={level}
          onChange={(value) => set({ level: value || 1 })}
          label="Level"
          className="sm"
          min={0}
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
          formatter={(value) => `${value}%`}
        />
        <NumberInput
          value={gearSpeed}
          onChange={(value) => set({ gearSpeed: value || 0 })}
          label="Gear Speed"
          className="md"
          withAsterisk
          hideControls
          precision={2}
          formatter={(value) => `${value}%`}
        />
        <Tooltip
          label="Tea costs are not yet included in cost calculations."
          withArrow
        >
          <TeaSelector
            type={type}
            teas={teas}
            onTeasChange={(value) => set({ teas: value })}
          />
        </Tooltip>
      </Group>
      <Group>
        <Select
          searchable
          size="lg"
          value={item}
          onChange={(value) => set({ item: value })}
          data={itemOptions}
          label="Select an item"
          placeholder="Pick one"
        />
        <NumberInput
          value={target}
          onChange={(value) => set({ target: value || 1 })}
          label="Target Level"
          className="md"
          withAsterisk
          min={1}
          max={20}
        />
      </Group>
      {item && data.itemDetails[item] && (
        <EnhancingCalc
          item={data.itemDetails[item]}
          baseLevel={level || 1}
          toolPercent={toolBonus || 0}
          gearSpeed={gearSpeed || 0}
          target={target}
          teas={teas}
        />
      )}
    </Flex>
  );
}
