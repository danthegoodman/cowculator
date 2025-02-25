import { MultiSelect } from "@mantine/core";
import { useData } from "../../context/DataContext.ts";
import { ActionType, ItemHrid } from "../../models/Client";

interface Props {
  type: ActionType;
  teas: ItemHrid[];
  onTeasChange: (teas: ItemHrid[]) => void;
}

export function TeaSelector(props: Props) {
  const data = useData();
  const actionTeas = data.teas.filter((t) => t.forActions.includes(props.type));

  let availableTeas = actionTeas;
  const hasSkillTeaSelected = actionTeas.some(
    (t) => props.teas.includes(t.itemHrid) && t.isSkillTea
  );
  if (hasSkillTeaSelected) {
    availableTeas = availableTeas.filter(
      (t) => props.teas.includes(t.itemHrid) || !t.isSkillTea
    );
  }

  return (
    <MultiSelect
      data={availableTeas.map((t) => ({
        value: t.itemHrid,
        label: data.itemDetails[t.itemHrid].name,
      }))}
      value={props.teas}
      onChange={props.onTeasChange}
      label="Teas"
      maxSelectedValues={3}
      clearable
    />
  );
}
