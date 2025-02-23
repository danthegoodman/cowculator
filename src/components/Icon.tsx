import { useMemo } from "react";

interface Props {
  hrid: string;
}

const foragingActionExceptions = [
  "asteroid_belt",
  "olympus_mons",
  "silly_cow_valley",
  "burble_beach",
  "misty_forest",
  "shimmering_lake",
  "farmland",
];

export default function Icon({ hrid }: Props) {
  const imgUrl = useMemo(() => {
    const split = hrid.split("/");
    const name = split[split.length - 1];
    const type = split[1];
    if (type === "actions") {
      if (
        hrid.includes("/foraging/") &&
        !foragingActionExceptions.includes(name)
      ) {
        return `/cowculator/items_sprite.b09638bf.svg#${name}`;
      }
      return `/cowculator/actions_sprite.8d5ceb4a.svg#${name}`;
    } else if (type === "items") {
      return `/cowculator/items_sprite.b09638bf.svg#${name}`;
    } else {
      return `/cowculator/combat_monsters_sprite.395438a8.svg#${name}`;
    }
  }, [hrid]);

  return (
    <svg width="30px" height="30px">
      <use href={imgUrl} />
    </svg>
  );
}
