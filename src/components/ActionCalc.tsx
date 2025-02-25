import { Flex, Grid, NumberInput, Table, Tooltip } from "@mantine/core";
import { ActionDetail, Cost } from "../models/Client";
import { Fragment, useEffect, useState } from "react";
import { getFriendlyIntString } from "../helpers/Formatting";
import Icon from "./Icon";
import { useData } from "../context/DataContext.ts";
import { TeaSelector } from "./input/TeaSelector.tsx";

interface Props {
  action: ActionDetail;
  fromRaw: boolean;
}

export default function ActionCalc({ action, fromRaw = false }: Props) {
  const [priceOverrides, setPriceOverrides] = useState<{
    [key: string]: number | "";
  }>({});
  const [teas, setTeas] = useState<string[]>([]);
  const data = useData();

  useEffect(() => {
    setTeas([]);
  }, [action]);

  if (!action.outputItems) return <Fragment />;

  const hasArtisan = teas.some((x) => x === "/items/artisan_tea");
  const wisdomTeaBonus = teas.some((x) => x === "/items/wisdom_tea") ? 1.12 : 1;
  const gourmetBonus = teas.some((x) => x === "/items/gourmet_tea") ? 1.12 : 1;

  const outputItem = {
    ...data.itemDetails[action.outputItems[0].itemHrid],
    count: action.outputItems[0].count,
  };

  if (!action.inputItems) {
    return <Fragment />;
  }

  let inputs: Cost[] = action.inputItems.slice();
  let upgradeHrid = action.upgradeItemHrid;
  const actions = [action];

  while (fromRaw && upgradeHrid) {
    const newItem = upgradeHrid.split("/").pop();
    if (!newItem) break;
    const newActionHrid = action.hrid
      .split("/")
      .slice(0, -1)
      .concat([newItem])
      .join("/");
    const newAction = data.actionDetails[newActionHrid];
    if (newAction.inputItems) {
      inputs = inputs.concat(newAction.inputItems);
      actions.push(newAction);
    }

    upgradeHrid = newAction.upgradeItemHrid;
  }

  const totalExp = actions.reduce(
    (acc, val) => acc + val.experienceGain.value * wisdomTeaBonus,
    0
  );

  const totalSeconds = actions.reduce(
    (acc, val) => acc + val.baseTimeCost / 1000000000,
    0
  );

  const rowData = inputs.map((x) => {
    return {
      ...data.itemDetails[x.itemHrid],
      count: hasArtisan ? x.count * 0.9 : x.count,
    };
  });

  if (upgradeHrid) {
    rowData.push({
      ...data.itemDetails[upgradeHrid],
      count: 1,
    });
  }

  const askTotal = rowData.reduce((acc, val) => {
    if (val.hrid === "/items/coin") return acc + val.count;
    if (val.ask == null) return acc;
    return acc + (val.ask ?? 0) * val.count;
  }, 0);

  const bidTotal = rowData.reduce((acc, val) => {
    if (val.hrid === "/items/coin") return acc + val.count;
    return acc + Math.max(val.bid ?? -1, val.sellPrice) * val.count;
  }, 0);

  const vendorTotal = rowData.reduce(
    (acc, val) => acc + val.sellPrice * val.count,
    0
  );

  const getApproxValue = (hrid: string): number => {
    if (hrid === "/items/coin") return 1;

    if (priceOverrides[hrid]) return +priceOverrides[hrid];

    const item = data.itemDetails[hrid];

    if (item.ask == null || item.bid == null) {
      return item.ask ?? item.bid ?? item.sellPrice;
    } else {
      return +((item.ask + item.bid) / 2).toFixed(0);
    }
  };

  const overrideTotal = rowData.reduce(
    (acc, val) => acc + getApproxValue(val.hrid) * val.count,
    0
  );

  const outputCount = outputItem.count * gourmetBonus;
  const outputCost = getApproxValue(outputItem.hrid);

  const rows = rowData.map((x, i) => {
    if (x.hrid === "/items/coin") {
      return (
        <tr key={x.hrid + i}>
          <td>
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
              gap="xs"
            >
              <Icon hrid={x.hrid} /> {x.name}
            </Flex>
          </td>
          <td>{x.count}</td>
          <td colSpan={4} />
        </tr>
      );
    }

    return (
      <tr key={x.hrid + i}>
        <td>
          <Flex
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
            gap="xs"
          >
            <Icon hrid={x.hrid} /> {x.name}
          </Flex>
        </td>
        <td>{x.count.toFixed(2)}</td>
        <td>{getFriendlyIntString(x.ask)}</td>
        <td>{getFriendlyIntString(x.bid)}</td>
        <td>{getFriendlyIntString(x.sellPrice)}</td>
        <td>
          <NumberInput
            hideControls
            value={priceOverrides[x.hrid]}
            placeholder={getFriendlyIntString(getApproxValue(x.hrid))}
            onChange={(y) =>
              setPriceOverrides({
                ...priceOverrides,
                [x.hrid]: y,
              })
            }
          />
        </td>
      </tr>
    );
  });

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
    >
      <Tooltip
        label="Tea costs are not yet included in cost calculations."
        withArrow
      >
        <TeaSelector type={action.type} teas={teas} onTeasChange={setTeas}/>
      </Tooltip>
      <Grid>
        <Grid.Col span={10}>
          <Table
            verticalSpacing="xs"
            striped
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>
              <tr>
                <th>Item</th>
                <th>Count</th>
                <th>Ask</th>
                <th>Bid</th>
                <th>Vendor</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <th colSpan={2}>Total</th>
                <td>{getFriendlyIntString(askTotal)}</td>
                <td>{getFriendlyIntString(bidTotal)}</td>
                <td>{getFriendlyIntString(vendorTotal)}</td>
                <td>{getFriendlyIntString(overrideTotal)}</td>
              </tr>
              <tr>
                <th>
                  <Flex
                    justify="flex-start"
                    align="center"
                    direction="row"
                    wrap="wrap"
                    gap="xs"
                  >
                    <Icon hrid={outputItem.hrid} /> {outputItem.name}
                  </Flex>
                </th>
                <td>{outputCount.toFixed(2)}</td>
                <td>{getFriendlyIntString(outputItem.ask)}</td>
                <td>{getFriendlyIntString(outputItem.bid)}</td>
                <td>{getFriendlyIntString(outputItem.sellPrice)}</td>
                <td>
                  <NumberInput
                    hideControls
                    value={priceOverrides[outputItem.hrid]}
                    placeholder={getFriendlyIntString(outputCost)}
                    onChange={(y) =>
                      setPriceOverrides({
                        ...priceOverrides,
                        [outputItem.hrid]: y,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>Total</th>
                <td>{getFriendlyIntString((outputItem.ask ?? -1) * outputCount)}</td>
                <td>{getFriendlyIntString((outputItem.bid ?? -1) * outputCount)}</td>
                <td>
                  {getFriendlyIntString(outputItem.sellPrice * outputCount)}
                </td>
                <td>{getFriendlyIntString(outputCost * outputCount)}</td>
              </tr>
            </tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span="auto">
          <div>xp: {totalExp.toFixed(2)}</div>
          <div>time: {totalSeconds} seconds</div>
          <div>
            xp/h: {getFriendlyIntString((totalExp / totalSeconds) * 3600)}
          </div>
        </Grid.Col>
      </Grid>
    </Flex>
  );
}
