import { useMemo, useState } from "react";
import {
  Flex,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Tooltip,
  Text,
} from "@mantine/core";
import { useData } from "../context/DataContext.ts";
import EnhancingCalc from "./EnhancingCalc";
import { Skill, getTeaBonuses } from "../helpers/CommonFunctions";

export default function Enhancing() {
  const skill = Skill.Enhancing;
  const data = useData();
  const [item, setItem] = useState<string | null>(null);
  const [level, setLevel] = useState<number | "">(1);
  const [toolBonus, setToolBonus] = useState<number | "">(0);
  const [gearSpeed, setGearSpeed] = useState<number | "">(0);
  const [teas, setTeas] = useState<string[]>([]);
  const [target, setTarget] = useState<number>(1);

  const availableTeas = useMemo(
    () =>
      Object.values(data.itemDetails)
        .filter(
          (x) =>
            x.consumableDetail.usableInActionTypeMap?.["/action_types/enhancing"]
        )
        .map((x) => ({
          label: x.name,
          value: x.hrid,
        })),
    [data.itemDetails]
  );

  const { teaError, levelTeaBonus } = getTeaBonuses(teas, skill);

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
          onChange={setLevel}
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
          onChange={setToolBonus}
          label="Tool Bonus"
          className="md"
          withAsterisk
          hideControls
          precision={2}
          formatter={(value) => `${value}%`}
        />
        <NumberInput
          value={gearSpeed}
          onChange={setGearSpeed}
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
          <MultiSelect
            clearable
            data={availableTeas}
            value={teas}
            onChange={setTeas}
            label="Teas"
            maxSelectedValues={3}
            error={teaError}
          />
        </Tooltip>
      </Group>
      <Group>
        <Select
          searchable
          size="lg"
          value={item}
          onChange={setItem}
          data={itemOptions}
          label="Select an item"
          placeholder="Pick one"
        />
        <NumberInput
          value={target}
          onChange={(value) => setTarget(value || 1)}
          label="Target Level"
          className="md"
          withAsterisk
          min={1}
          max={20}
        />
      </Group>
      {item && (
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
